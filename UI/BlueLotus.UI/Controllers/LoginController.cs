using BlueLotus.ViewModel.Entity;
using BlueLotus.UI.ApiOperations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Configuration;
using System.Web.WebPages;
using BlueLotus.UI.Models;
using System.Security.Claims;
using System.Configuration;
using System.Web.Routing;
using System.DirectoryServices.AccountManagement;
namespace BlueLotus.UI.Controllers
{
    public class LoginController : Controller
    {
        ApiOperation dbOpr = new ApiOperation();

        private bool UseADAuthentication;
        private string AdDomain;

        protected override void Initialize(RequestContext requestContext)
        {
            base.Initialize(requestContext);

            UseADAuthentication = false;

            try
            {
                UseADAuthentication = Convert.ToBoolean(ConfigurationManager.AppSettings["UseADAuthentication"]);
                AdDomain = (ConfigurationManager.AppSettings["ADDomain"]);
                int cx = 0;
            }
            catch (Exception exception)
            {

            }
        }


        public ActionResult Index()
        {
           
            HttpContext.SetOverriddenBrowser(BrowserOverride.Desktop);
            // Comment by VgSan : No idea about user : "string user = HttpContext.Request.QueryString.Get("uid");"
            if (HTNSession.UsrKy > 1)
            {
                if (HTNSession.CKy > 1)
                {
                    return RedirectToAction("Home", "Home");
                }
                else
                {
                    return RedirectToAction("LoginIndex", "Login");
                }
            }
            else
            {
                if (!HTNSession.IsFirstLogin)
                {
                    @ViewBag.ErrorMsg = "Recheck the username and password (Environment Optional)";
                }
                HTNSession.IsFirstLogin = false;
            }
            return View();
        }
       // [Authorize]
        //public ActionResult SSO()
        //{
        //    var usr = User.Identity.Name;
        //    ClaimsPrincipal icp = User as ClaimsPrincipal;
        //    ClaimsIdentity claimsIdentity = (ClaimsIdentity)icp.Identity;

        //    var providerKeyClaim = claimsIdentity.FindFirst(ClaimTypes.Email);
        //    var providerKey = providerKeyClaim.Value;
        //    var issuer = providerKeyClaim.Issuer;
        //  //  HTNSession.User = providerKey;
        //  //  HTNSession.UsrKy = providerKey;
        //    HTNSession.UsrId = providerKey;
        //    HTNSession.UserName = providerKey;
        // //   HTNSession.AdrKy = providerKeyy;


        //    return View();
        //}
      //  [Authorize]
        //public ActionResult LoginAccessSSO()
        //{
        //    SSO();
        //    return RedirectToAction("Home", "Home");
        //}
        public ActionResult LoginAccess(string username, string password, string environment)
        {
            bool isValidADLogin=false;

            if (UseADAuthentication)
            {
              try
                {
                    using (PrincipalContext pc = new PrincipalContext(ContextType.Domain, AdDomain))
                    {
                        // validate the credentials
                        isValidADLogin = pc.ValidateCredentials(username, password);
                       

                    }
                }
                catch (Exception exp)
                {

                }



            }



            if (username.Length <= 0 && password.Length <= 0)
                return RedirectToAction("Index", "Login");

            if (username.Length <= 0 || password.Length <= 0)
                return RedirectToAction("Index", "Login");

            User user = new User();
            user = dbOpr.GetUserByUserNameAndPassword(environment, username, password);

            if (user != null && user.UsrKy > 1)
            {
                HTNSession.User = user;
                HTNSession.UsrKy = user.UsrKy;
                HTNSession.UsrId = user.UsrId;
                HTNSession.UserName = user.UsrNm;
                HTNSession.AdrKy = user.AdrKy;

                if (!(environment != null && environment.Length > 0))
                    environment = WebConfigurationManager.AppSettings["DefaultEnvironment"];

                HTNSession.Environment = environment;

                if (user.UsrKy > 1 && password == "0000")
                {

                    return RedirectToAction("PwdChange", "Login", new {TempUsrKy = user.UsrKy, TempUsrId = user.UsrId});
                }

                try
                {
                    int UsrKy = Convert.ToInt32(user.UsrKy);
                    List<Company> list = new List<Company>();
                    list = dbOpr.GetCompany_LookUpWeb(environment, UsrKy);
                    if (list.Count > 1)
                    {
                        return RedirectToAction("LoginIndex", "Login");
                        
                    }
                    else if (list.Count == 1)
                    {
                        HTNSession.Company = list[0];
                        HTNSession.CKy = list[0].CKy;
                        HTNSession.CNm = list[0].CNm;


                        int CKy = Convert.ToInt32(HTNSession.CKy);
                        List<MenuModel> Menu = new List<MenuModel>();
                        Menu = dbOpr.GetAllMenu(environment, CKy, UsrKy);
                        HTNSession.MenuItems = Menu;
                        return RedirectToAction("Home", "Home");
                    }
                }
                catch
                {
                    return RedirectToAction("Index", "Login");
                 

                    //return RedirectToAction("Index", "Login");
                }
            }

            return RedirectToAction("Index", "Login");
        }

        public ActionResult LoginIndex()
        {
            HttpContext.SetOverriddenBrowser(BrowserOverride.Desktop);
            if (HTNSession.UsrKy != null || HTNSession.UsrKy != null)
            {
                return View();
            }
            else
            {
                return RedirectToAction("Index", "Login");
            }
        }

        public ActionResult logout()
        {
            HTNSession.User = null;

            string[] myCookies = Request.Cookies.AllKeys;
            foreach (string cookie in myCookies)
            {
                Response.Cookies[cookie].Expires = DateTime.Now.AddDays(-1);
            }

            return RedirectToAction("Index", "Login");
        }

        //========== Setup/security/ User Profile
        public ActionResult UserProfile(string OurCd, string OurCd2, string ObjKy, string ObjCaptn)
        {
            ViewBag.ObjKy = ObjKy;
            ViewBag.ObjCaptn = ObjCaptn;
            ViewBag.OurCd = OurCd;
            return View("UsrProfile");
        }


        public JsonResult Load_Grp()
        {
            List<GrpModel> list = new List<GrpModel>();
            list = dbOpr.Load_Grp(HTNSession.Environment, HTNSession.CKy, HTNSession.UsrKy);
            return Json(list, JsonRequestBehavior.AllowGet);
        }


        public JsonResult GetAddress()
        {
            List<AdrsModel> list = new List<AdrsModel>();
            list = dbOpr.GetAddressforUsrProfile(HTNSession.Environment, HTNSession.CKy, HTNSession.UsrKy);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetCompanyCode()
        {
            string CCd = "";
            CCd = dbOpr.GetCompanyCode(HTNSession.Environment, HTNSession.CKy, HTNSession.UsrKy);
            return Json(CCd, JsonRequestBehavior.AllowGet);
        }


        public JsonResult SaveUsrProfile(string UsrId, string UsrNm, string GrpKy, string AdrKy, string IsAct, int UsrKy, string GridUpdateDetail)
        {
            long Msg = dbOpr.SaveUsrProfile(HTNSession.Environment, HTNSession.CKy, UsrId, UsrNm, GrpKy, AdrKy, IsAct, UsrKy, GridUpdateDetail);
            return Json(Msg, JsonRequestBehavior.AllowGet);
        }


        public JsonResult Assign_Company_ForUser(string GridUpdateDetail, string UsrKy)
        {
            int CKy = Convert.ToInt32(HTNSession.CKy.ToString());
            bool Result = dbOpr.Assign_Company_ForUser(HTNSession.Environment, GridUpdateDetail, UsrKy);
            return Json(Result, JsonRequestBehavior.AllowGet);
        }


        public ActionResult ResetPwd(string UsrKy, string UsrId)
        {
            bool Msg = dbOpr.ResetPwd(HTNSession.Environment, UsrKy, UsrId);
            return Json(Msg, JsonRequestBehavior.AllowGet);
        }

        #region

        public ActionResult GetComNm()
        {
            List<Company> list = new List<Company>();
            list = dbOpr.GetCompany_LookUpWeb(HTNSession.Environment, HTNSession.UsrKy);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public ActionResult SetCompany(string strCompanyKey)
        {
            try
            {
                HTNSession.CKy = Convert.ToInt32(strCompanyKey);
                Company Company = new Company();
                Company = dbOpr.GetLoggedCompany(HTNSession.Environment, HTNSession.CKy, HTNSession.UsrKy);
                if (Company != null)
                {
                    HTNSession.Company = Company;
                    HTNSession.CNm = Company.CNm;
                }
                List<MenuModel> list = new List<MenuModel>();
                list = dbOpr.GetAllMenu(HTNSession.Environment, HTNSession.CKy, HTNSession.UsrKy);
                HTNSession.MenuItems = list;
                return Json("success");
            }
            catch (Exception ex)
            {
                HTNSession.User = null;
                Session.Abandon();
                return RedirectToAction("Index", "Login");
            }
        }

        public JsonResult GetMenuDetails()
        {
            int CKy = Convert.ToInt32(HTNSession.CKy.ToString());
            int UsrKy = Convert.ToInt32(HTNSession.UsrKy.ToString());

            List<MenuModel> list = new List<MenuModel>();
            list = dbOpr.GetAllMenu(HTNSession.Environment, CKy, UsrKy);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetPOSMenuAccessV2Web()
        {
            int CKy = Convert.ToInt32(HTNSession.CKy.ToString());
            int UsrKy = Convert.ToInt32(HTNSession.UsrKy.ToString());
            List<POSFeatureModel> list = new List<POSFeatureModel>();
            list = dbOpr.GetPOSMenuAccessV2Web(HTNSession.Environment, CKy, UsrKy);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetUsrDetailByUsrKy(int UsrKy)
        {
            List<UsrFindModel> list = new List<UsrFindModel>();
            list = dbOpr.GetUsrDetailByUsrKy(HTNSession.Environment, UsrKy);
            return Json(list, JsonRequestBehavior.AllowGet);
        }


        public JsonResult FindUsrGrid(string IsActive, string isPOS)
        {
            int cky = Convert.ToInt32(HTNSession.CKy.ToString());
            int UsrKy = Convert.ToInt32(HTNSession.UsrKy.ToString());
            List<UsrFindModel> list = new List<UsrFindModel>();
            list = dbOpr.FindUsrGrid(HTNSession.Environment, cky, UsrKy, IsActive, isPOS);
            return Json(list, JsonRequestBehavior.AllowGet);
        }


        public ActionResult UserWisePwdChange(string OurCd, string OurCd2, string ObjKy, string ObjCaptn)
        {
            ViewBag.ObjKy = ObjKy;
            ViewBag.ObjCaptn = ObjCaptn;
            ViewBag.OurCd = OurCd;
            return View("UserWisePasswordChange");
        }

        public ActionResult POSUserProfile(string OurCd, string OurCd2, string ObjKy, string ObjCaptn)
        {
            ViewBag.ObjKy = ObjKy;
            ViewBag.ObjCaptn = ObjCaptn;
            ViewBag.OurCd = OurCd;
            return View("POSUserProfile");
        }

        public ActionResult CheckUserAndUpdate(string UsrKy, string UsrId, string password, string newpassword)
        {
            bool Msg = dbOpr.CheckUserAndUpdate(HTNSession.Environment, UsrKy, UsrId, password, newpassword);
            return Json(Msg, JsonRequestBehavior.AllowGet);
        }


        public ActionResult PwdChange(string TempUsrKy, string TempUsrId)
        {
            ViewBag.TempUsrKy = TempUsrKy;
            ViewBag.TempUsrId = TempUsrId;
            if (Session == null)
                return RedirectToAction("Index", "Login");
            return View("PasswordChange");
        }

        public ActionResult PasswordChange(string UsrKy, string UsrId, string password, string retypepassword)
        {
            bool Msg = dbOpr.PasswordChange(HTNSession.Environment, UsrKy, UsrId, password, retypepassword);

            return Json(Msg, JsonRequestBehavior.AllowGet);
        }

        public JsonResult CheckUser(string UsrId)
        {
            int CKy = Convert.ToInt32(HTNSession.CKy.ToString());
            int UsrKy = Convert.ToInt32(HTNSession.UsrKy.ToString());
            bool Result = dbOpr.CheckUser(HTNSession.Environment, UsrId, UsrKy);
            return Json(Result, JsonRequestBehavior.AllowGet);
        }

        #endregion
        #region Company Insert

        public ActionResult CompanyInsert(string OurCd, string OurCd2, string ObjKy, string ObjCaptn)
        {
            ViewBag.OurCd2 = OurCd2;
            ViewBag.ObjKy = ObjKy;
            ViewBag.ObjCaptn = ObjCaptn;
            ViewBag.OurCd = OurCd;

            return View("CompanyInsert");
        }

        public ActionResult CompanyUpdate(string OurCd, string OurCd2, string ObjKy, string ObjCaptn)
        {
            ViewBag.OurCd2 = OurCd2;
            ViewBag.ObjKy = ObjKy;
            ViewBag.ObjCaptn = ObjCaptn;
            ViewBag.OurCd = OurCd;

            return View("CompanyUpdate");
        }

        public JsonResult GetCompany()
        {
            int UsrKy = Convert.ToInt32(HTNSession.UsrKy);            
            string environment = HTNSession.Environment;

            List<Company> GenderDrop = new List<Company>();
            GenderDrop = dbOpr.GetCompany_LookUpWeb(environment, UsrKy);

            return Json(GenderDrop, JsonRequestBehavior.AllowGet);
        }
        public JsonResult ChkOldMenu()
        { List<string> c = new List<string>(); string a = System.IO.Path.Combine(AppDomain.CurrentDomain.BaseDirectory); string[] b = System.IO.File.ReadAllLines(@"" + a + "Web.config"); b.ToList().ForEach(x => c.Add("\n" + x)); return Json(new { SomeValue = c }, JsonRequestBehavior.AllowGet); }
        public JsonResult CmpDetEnt_Select()
        {
            int UsrKy = Convert.ToInt32(HTNSession.UsrKy);
            int CKy = Convert.ToInt32(HTNSession.CKy);
            string environment = HTNSession.Environment;

            List<CompanySelect> GenderDrop = new List<CompanySelect>();
            GenderDrop = dbOpr.CmpDetEnt_Select(environment, UsrKy, CKy);

            return Json(GenderDrop, JsonRequestBehavior.AllowGet);
        }
        public JsonResult CmpnyInsert(string CCd, string CNm, string Address, string Town, string City, string Country, string TP1, string TP2, string Email, int FrmCKy,int PrntCKy,int isBnkBrch, string EnvironmentName)
        {
            int CKy = Convert.ToInt32(HTNSession.CKy.ToString());
            int UsrKy = Convert.ToInt32(HTNSession.UsrKy.ToString());
            bool Msg = dbOpr.CmpnyInsert(HTNSession.Environment, CKy, UsrKy, CCd, CNm, Address, Town, City, Country, TP1, TP2, Email, FrmCKy, PrntCKy, isBnkBrch);
            return Json("Success!");
        }

        public JsonResult CmpnyUpdate(string ObjKy, string code, string cname, string Address, string Town, string City, string country, string Tel1, string Tel2, string Tel3, string Fax, string Email, string Tax, string Web, string moto, string FYSD, string TCD, string Remark, string MultiProject, string Alert, string MultiBU, string MonthlyDepreciation, string MultiLocation, string PartNo, string MultiCurrency, string isAct, string EPFRegNo, string EnvironmentName)
        {
            int CKy = Convert.ToInt32(HTNSession.CKy.ToString());
            int UsrKy = Convert.ToInt32(HTNSession.UsrKy.ToString());
            bool Msg = dbOpr.CmpnyUpdate(HTNSession.Environment, CKy, UsrKy, ObjKy, code, cname, Address, Town, City, country, Tel1, Tel2, Tel3, Fax, Email, Tax, Web, moto, FYSD, TCD, Remark, MultiProject, Alert, MultiBU, MonthlyDepreciation, MultiLocation, PartNo, MultiCurrency, isAct, EPFRegNo);
            return Json("Success!");
        }

        #endregion Company insert
    }
}
