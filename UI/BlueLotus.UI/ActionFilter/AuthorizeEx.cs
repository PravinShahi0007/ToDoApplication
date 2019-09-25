using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Security.Cryptography;
using System.Text;
using System.IO;
using BlueLotus.UI.Utility;
using BlueLotus.ViewModel.Entity;
using BlueLotus.UI.ApiOperations;

namespace BlueLotus.UI.ActionFilter
{
    public class AuthorizeEx : ActionFilterAttribute, IActionFilter
    {

        ApiOperation apiOperation = new ApiOperation();

        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {

            base.OnActionExecuting(filterContext);


            if (filterContext.ActionDescriptor.GetCustomAttributes(typeof(AllowAnonymousEx), false).Any())
            {
                return;
            }
            else
            {
                CookieManager cookieManager = new CookieManager(filterContext.HttpContext, "SessionBackEndId");
                bool cd = cookieManager.isValidBackEndUserLogedin(apiOperation);
                if (!cd)
                {
                    filterContext.HttpContext.Response.Redirect("\\Login\\");
                }
                else
                {
                    int cX = 0;
                }

                // 
            }



        }
    }

    public class AllowAnonymousEx : ActionFilterAttribute, IActionFilter
    {
        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            base.OnActionExecuting(filterContext);



        }
    }



    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
    public sealed class NoCacheAttribute : ActionFilterAttribute
    {
        public override void OnResultExecuting(ResultExecutingContext filterContext)
        {

            base.OnResultExecuting(filterContext);
            filterContext.HttpContext.Response.Expires = -1;
            filterContext.HttpContext.Response.Cache.SetNoServerCaching();
            filterContext.HttpContext.Response.Cache.SetAllowResponseInBrowserHistory(false);
            filterContext.HttpContext.Response.CacheControl = "no-cache";
            filterContext.HttpContext.Response.Cache.SetNoStore();

        }
    }

    public static class CookieNaming
    {
        public static string AdrKy = "AdrKy";
        public static string UsrKy = "UsrKy";
        public static string UsrId = "UsrId";
        public static string UsrNm = "UserName";
        public static string Enviorment = "Environment";
        public static string Cky = "CKy";
        public static string CNm = "CNm";
        public static string Password = "Password";
    }
    public class CookieManager
    {

        private string cookieName = "";

        private HttpCookie _cookie;
        private HttpContextBase _context;



        public string CookieName
        {
            get; set;
        }

        public CookieManager(HttpContextBase contex, string cookieName)
        {
            this.cookieName = cookieName;
            _context = contex;
            if (contex.Request.Cookies[cookieName] != null)
            {
                _cookie = contex.Request.Cookies[cookieName];

            }
        }

        public bool isValidBackEndUserLogedin(ApiOperation operations)
        {
            if (_cookie != null)
            {
                try
                {
                    /* Lets Read the cookie and  try to dcrypt  data stored int the cookie
                     * Then Lets Load the User From Db and  authenticate....
                     */

                    string userId = StringCipher.Decrypt(_cookie.Values["UsrId"], AppSettings.EncKey);
                    string password = StringCipher.Decrypt(_cookie.Values["userAuthMeth"], AppSettings.EncKey);


                    //    User user = operations.GetUserByUserName(194,)
                    //   return user.AuthenticateUser(password);

                }
                catch (Exception exp)
                {
                    /// Something went wrong...
                    /// Lets Unset The Cookie;
                    UnsetCookie();

                    return false;
                }
            }


            return false;
        }

        public void UnsetCookie()
        {

            if (_cookie != null)
            {
                _cookie = new HttpCookie(cookieName);

                _cookie.Expires = DateTime.Now.AddDays(-2);
                _context.Response.Cookies.Add(_cookie);

            }
        }


        public void CreateCookieBackEndUser(User user, string rawpassw)
        {

            //AdrKy

            if (_cookie == null)
            {
                _cookie = new HttpCookie(cookieName);

                _cookie.Expires = DateTime.Now.AddDays(2);
                _cookie.Values.Add(StringCipher.Encrypt(CookieNaming.UsrId, AppSettings.EncKey), StringCipher.Encrypt(user.UsrId.ToString(), AppSettings.EncKey));
                _cookie.Values.Add(StringCipher.Encrypt(CookieNaming.Password, AppSettings.EncKey), StringCipher.Encrypt(rawpassw, AppSettings.EncKey));
                _cookie.Values.Add(StringCipher.Encrypt(CookieNaming.Cky, AppSettings.EncKey), StringCipher.Encrypt(user.CKy.ToString(), AppSettings.EncKey));
                _cookie.Values.Add(StringCipher.Encrypt(CookieNaming.AdrKy, AppSettings.EncKey), StringCipher.Encrypt(user.AdrKy.ToString(), AppSettings.EncKey));
            //    _cookie.Values.Add(StringCipher.Encrypt(CookieNaming.Enviorment, AppSettings.EncKey), StringCipher.Encrypt(, AppSettings.EncKey));



                _context.Response.Cookies.Add(_cookie);

            }




        }


    }


    public static class StringCipher
    {
        // This constant is used to determine the keysize of the encryption algorithm in bits.
        // We divide this by 8 within the code below to get the equivalent number of bytes.
        private const int Keysize = 256;

        // This constant determines the number of iterations for the password bytes generation function.
        private const int DerivationIterations = 1000;

        public static string Encrypt(string plainText, string passPhrase)
        {
            // Salt and IV is randomly generated each time, but is preprended to encrypted cipher text
            // so that the same Salt and IV values can be used when decrypting.  
            var saltStringBytes = Generate256BitsOfRandomEntropy();
            var ivStringBytes = Generate256BitsOfRandomEntropy();
            var plainTextBytes = Encoding.UTF8.GetBytes(plainText);
            using (var password = new Rfc2898DeriveBytes(passPhrase, saltStringBytes, DerivationIterations))
            {
                var keyBytes = password.GetBytes(Keysize / 8);
                using (var symmetricKey = new RijndaelManaged())
                {
                    symmetricKey.BlockSize = 256;
                    symmetricKey.Mode = CipherMode.CBC;
                    symmetricKey.Padding = PaddingMode.PKCS7;
                    using (var encryptor = symmetricKey.CreateEncryptor(keyBytes, ivStringBytes))
                    {
                        using (var memoryStream = new MemoryStream())
                        {
                            using (var cryptoStream = new CryptoStream(memoryStream, encryptor, CryptoStreamMode.Write))
                            {
                                cryptoStream.Write(plainTextBytes, 0, plainTextBytes.Length);
                                cryptoStream.FlushFinalBlock();
                                // Create the final bytes as a concatenation of the random salt bytes, the random iv bytes and the cipher bytes.
                                var cipherTextBytes = saltStringBytes;
                                cipherTextBytes = cipherTextBytes.Concat(ivStringBytes).ToArray();
                                cipherTextBytes = cipherTextBytes.Concat(memoryStream.ToArray()).ToArray();
                                memoryStream.Close();
                                cryptoStream.Close();
                                return Convert.ToBase64String(cipherTextBytes);
                            }
                        }
                    }
                }
            }
        }

        public static string Decrypt(string cipherText, string passPhrase)
        {
            // Get the complete stream of bytes that represent:
            // [32 bytes of Salt] + [32 bytes of IV] + [n bytes of CipherText]
            var cipherTextBytesWithSaltAndIv = Convert.FromBase64String(cipherText);
            // Get the saltbytes by extracting the first 32 bytes from the supplied cipherText bytes.
            var saltStringBytes = cipherTextBytesWithSaltAndIv.Take(Keysize / 8).ToArray();
            // Get the IV bytes by extracting the next 32 bytes from the supplied cipherText bytes.
            var ivStringBytes = cipherTextBytesWithSaltAndIv.Skip(Keysize / 8).Take(Keysize / 8).ToArray();
            // Get the actual cipher text bytes by removing the first 64 bytes from the cipherText string.
            var cipherTextBytes = cipherTextBytesWithSaltAndIv.Skip((Keysize / 8) * 2).Take(cipherTextBytesWithSaltAndIv.Length - ((Keysize / 8) * 2)).ToArray();

            using (var password = new Rfc2898DeriveBytes(passPhrase, saltStringBytes, DerivationIterations))
            {
                var keyBytes = password.GetBytes(Keysize / 8);
                using (var symmetricKey = new RijndaelManaged())
                {
                    symmetricKey.BlockSize = 256;
                    symmetricKey.Mode = CipherMode.CBC;
                    symmetricKey.Padding = PaddingMode.PKCS7;
                    using (var decryptor = symmetricKey.CreateDecryptor(keyBytes, ivStringBytes))
                    {
                        using (var memoryStream = new MemoryStream(cipherTextBytes))
                        {
                            using (var cryptoStream = new CryptoStream(memoryStream, decryptor, CryptoStreamMode.Read))
                            {
                                var plainTextBytes = new byte[cipherTextBytes.Length];
                                var decryptedByteCount = cryptoStream.Read(plainTextBytes, 0, plainTextBytes.Length);
                                memoryStream.Close();
                                cryptoStream.Close();
                                return Encoding.UTF8.GetString(plainTextBytes, 0, decryptedByteCount);
                            }
                        }
                    }
                }
            }
        }

        private static byte[] Generate256BitsOfRandomEntropy()
        {
            var randomBytes = new byte[32]; // 32 Bytes will give us 256 bits.
            using (var rngCsp = new RNGCryptoServiceProvider())
            {
                // Fill the array with cryptographically secure random bytes.
                rngCsp.GetBytes(randomBytes);
            }
            return randomBytes;
        }
    }
}