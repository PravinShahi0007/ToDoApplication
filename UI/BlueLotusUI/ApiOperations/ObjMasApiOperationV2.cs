using BlueLotus.ObjMas.Model;
using Newtonsoft.Json;
using NLog;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Runtime.Serialization.Json;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Web.Configuration;
using System.Web.Script.Serialization;

namespace BlueLotus.UI.ApiOperations
{
    public partial class ObjMasApiOperationV2
    {
        #region common
        private HttpClient httpClient;

        public ObjMasApiOperationV2()
        {
            httpClient = new HttpClient();
            httpClient.BaseAddress = new Uri(WebConfigurationManager.AppSettings["PathForObjMasAPI"]); //new Uri("http://localhost:49558");//WebConfigurationManager.AppSettings["PathForWebAPI"]);
            httpClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            httpClient.Timeout = TimeSpan.FromMinutes(10);
            httpClient.MaxResponseContentBufferSize = 2147483647;
        }

        public string GetUriWithEnvironment(string EnvironmentName, string requestUri)
        {
            return requestUri + "&EnvironmentName=" + EnvironmentName;
        }

        public static void WriteToLog(string LogMsg)
        {
            try
            {
                Logger logger = LogManager.GetCurrentClassLogger();
                using (StreamWriter w = File.AppendText(HttpContext.Current.Request.MapPath("..") + "\\Logs\\ErrorLog\\BLWEBExceptionLog.txt"))
                {
                    string userHostAddress = HttpContext.Current.Request.UserHostAddress;
                    string userHostName = HttpContext.Current.Request.UserHostName;

                    w.Write("\r\nLog Entry : ");
                    w.WriteLine("{0} {1} {2} {3}", userHostAddress, userHostName, DateTime.Now.ToLongTimeString(), DateTime.Now.ToLongDateString());
                    w.WriteLine("  :");
                    w.WriteLine("  :{0}", LogMsg);
                    w.WriteLine("-------------------------------");
                    logger.Error(LogMsg);
                }
            }
            catch (Exception ex) { }

            //using (StreamReader r = File.OpenText("log.txt"))
            //{
            //    DumpLog(r);
            //}
        }

        public async Task<HttpResponseMessage> RunApiOperation(string baseUri, string actionUri, string EnvironmentName, Dictionary<string, object> paramDictionary)
        {
            try
            {
                HttpResponseMessage response = await httpClient.GetAsync(GetUriByDictionary(baseUri, actionUri, EnvironmentName, paramDictionary));
                if (response.IsSuccessStatusCode)
                {
                    return response;
                }
                else
                {
                    //HttpError jstr = response.Content.ReadAsAsync<HttpError>().Result;
                    string jstr = response.Content.ReadAsStringAsync().Result;

                    if (response.Content != null)
                    {
                        //CustomHttpError list = new CustomHttpError();

                        //DataContractJsonSerializer ser = new DataContractJsonSerializer(list.GetType());
                        //DataContractJsonSerializer serializer = new DataContractJsonSerializer(list.GetType());
                        //MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));

                        //object obj = ser.ReadObject(ms);  
                        //list = obj as CustomHttpError;   

                        // do something with the content
                        string getPrmAndValue = string.Join(";", paramDictionary.Select(x => x.Key + "=" + x.Value).ToArray());
                        string SPandParaVal = "@'" + baseUri + " Related " + actionUri + "'" + getPrmAndValue;
                        WriteToLog(SPandParaVal + "ErrMsg : " + jstr);
                        throw new HttpException(jstr);
                    }
                    else
                    {
                        string getPrmAndValue1 = string.Join(";", paramDictionary.Select(x => x.Key + "=" + x.Value).ToArray());
                        string SPandParaVal1 = "@'" + baseUri + " Related " + actionUri + "'" + getPrmAndValue1;
                        WriteToLog(SPandParaVal1 + "ErrMsg : " + jstr);
                        throw new HttpException("content was of type " + (response.Content).GetType());
                    }
                }
            }
            catch (Exception er)
            {
                return null;
            }
        }

        public string GetUriByDictionary(string baseUri, string actionUri, string EnvironmentName, Dictionary<string, object> paramDictionary)
        {
            string uriAddr = baseUri + actionUri;
            if (paramDictionary != null)
            {
                uriAddr = uriAddr + "?";
                var first = paramDictionary.First();
                //uriAddr = uriAddr + first.Key + "=" + first.Value;

                if (first.Value != null && first.Value.GetType() == typeof(String))
                {
                    uriAddr = uriAddr + first.Key + "=" + HttpContext.Current.Server.UrlEncode(first.Value as String);
                }
                else
                {
                    uriAddr = uriAddr + first.Key + "=" + first.Value;
                }

                paramDictionary.Remove(paramDictionary.Keys.First());

                foreach (string key in paramDictionary.Keys)
                {
                    //uriAddr = uriAddr + "&" + key + "=" + paramDictionary[key];

                    if (paramDictionary[key] != null && paramDictionary[key].GetType() == typeof(String))
                    {
                        uriAddr = uriAddr + "&" + key + "=" + HttpContext.Current.Server.UrlEncode(paramDictionary[key] as String);
                    }
                    else
                    {
                        uriAddr = uriAddr + "&" + key + "=" + paramDictionary[key];
                    }

                }

                uriAddr = uriAddr + "&EnvironmentName=" + EnvironmentName;
            }

            return uriAddr;
        }
        #endregion


        string objMasBaseUri = "api/ObjMas/";

        //UsrObjPrp_UpdateWeb
        internal async Task<bool> UsrObjPrp_UpdateWeb(string EnvironmentName, int CKy, int UsrKy, string updateObjMasStringList)
        {
            bool Reset = false;

            string actionUri = "UsrObjPrp_UpdateWeb";

            List<ObjMasModel> updateObjMasStringListString = JsonConvert.DeserializeObject<List<ObjMasModel>>(updateObjMasStringList);

            foreach (ObjMasModel updateObjMasString in updateObjMasStringListString)
            {
                Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

                string modelString = new JavaScriptSerializer().Serialize(updateObjMasString);

                paramDictionary.Add("CKy", CKy);
                paramDictionary.Add("UsrKy", UsrKy);
                paramDictionary.Add("updateObjMasString", modelString);

                object obj = null;
                //await  RunApiOperation(
                //    objMasBaseUri,
                //    actionUri,
                //    EnvironmentName,
                //    paramDictionary,
                //    Reset.GetType());

                Reset = Convert.ToBoolean(obj);
            }

            return Reset;
        }


        internal async Task<List<ObjMasModel>> UsrObjPrp_SelectWeb(string EnvironmentName, int CKy, int UsrKy, string PrntKy, string ObjTyp, string ObjNm, bool isDeepSearch = false)
        {
            string actionUri = "UsrObjPrp_SelectWeb";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("PrntKy", PrntKy);
            paramDictionary.Add("ObjTyp", ObjTyp);
            paramDictionary.Add("ObjNm", ObjNm);
            paramDictionary.Add("isDeepSearch", isDeepSearch);

            List<ObjMasModel> list = null;
            HttpResponseMessage response = await RunApiOperation(
             objMasBaseUri,
             actionUri,
             EnvironmentName,
             paramDictionary);
            list = await response.Content.ReadAsAsync<List<ObjMasModel>>();           

            return list;
        }

        //
        internal async Task<List<ObjMasModel>> UsrObjPrp_SelectAllLastChildWeb(string EnvironmentName, int CKy, int UsrKy, string PrntKy)
        {
            string actionUri = "UsrObjPrp_SelectAllLastChildWeb";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("PrntKy", PrntKy);

            List<ObjMasModel> list = new List<ObjMasModel>();
            HttpResponseMessage response = await RunApiOperation(
           objMasBaseUri,
           actionUri,
           EnvironmentName,
           paramDictionary);
            list = await response.Content.ReadAsAsync<List<ObjMasModel>>();

            return list;
        }

        //
        internal async Task<List<ObjMasModel>> UsrObjChild_SelectByPrntandSubObjTypWeb(string EnvironmentName, int CKy, int UsrKy, string PrntKy, string ObjTyp, string ObjNm)
        {
            string actionUri = "UsrObjChild_SelectByPrntandSubObjTypWeb";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("PrntKy", PrntKy);
            paramDictionary.Add("ObjTyp", ObjTyp);
            paramDictionary.Add("ObjNm", ObjNm);

            List<ObjMasModel> list = new List<ObjMasModel>();
            //list =await  RunApiOperation(
            //    objMasBaseUri,
            //    actionUri,
            //    EnvironmentName,
            //    paramDictionary,
            //    list.GetType()) as List<ObjMasModel>;

            return list;
        }

        internal async Task<List<ObjMasModel>> UsrObjSec_SelectWeb(string EnvironmentName, int CKy, int UsrKy, string PrntKy, string ObjTyp, string ObjNm)
        {
            string actionUri = "UsrObjSec_SelectWeb";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("PrntKy", PrntKy);
            paramDictionary.Add("ObjTyp", ObjTyp);
            paramDictionary.Add("ObjNm", ObjNm);

            List<ObjMasModel> list = new List<ObjMasModel>();
            //list =await  RunApiOperation(
            //    objMasBaseUri,
            //    actionUri,
            //    EnvironmentName,
            //    paramDictionary,
            //    list.GetType()) as List<ObjMasModel>;

            return list;
        }

        public async Task<List<ObjMasModel>> ObjMas_SelectWeb(string EnvironmentName, int UsrKy, int CKy, string ObjKy)
        {
            string actionUri = "ObjMas_SelectWeb";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("ObjKy", ObjKy);

            List<ObjMasModel> list = new List<ObjMasModel>();
            //list =await  RunApiOperation(
            //    objMasBaseUri,
            //    actionUri,
            //    EnvironmentName,
            //    paramDictionary,
            //    list.GetType()) as List<ObjMasModel>;

            return list;
        }

        public async Task<List<List<ObjMasModel>>> UsrObjPrp_SelectMulti(string EnvironmentName, int ObjKy, int CKy, int UsrKy)
        {
            string actionUri = "UsrObjPrp_SelectMulti";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("ObjKy", ObjKy);
            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);

            List<List<ObjMasModel>> list = null;
            HttpResponseMessage response = await RunApiOperation(
             objMasBaseUri,
             actionUri,
             EnvironmentName,
             paramDictionary);
            list = await response.Content.ReadAsAsync<List<List<ObjMasModel>>>();

            return list;
        }

    }
}