using System;
using System.Web;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Runtime.Serialization.Json;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Web.Configuration;
using System.Web.Http;
using System.Web.Providers.Entities;
using NLog;
using BlueLotus.Codes.Model.Entity;
using System.Web.Script.Serialization;
using BlueLotus.ComboLoad.Model;
using Newtonsoft.Json;
using System.Diagnostics;

namespace BlueLotus.UI.ApiOperations
{
    public partial class CodesApiOperationV2
    {

        //Common Api Operation
        #region common
        private HttpClient httpClient;

        public CodesApiOperationV2()
        {
            httpClient = new HttpClient();
            httpClient.BaseAddress = new Uri(WebConfigurationManager.AppSettings["PathForCdMasAPI"]); //new Uri("http://localhost:49558");//WebConfigurationManager.AppSettings["PathForWebAPI"]);
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
                HttpResponseMessage response =await  httpClient.GetAsync(GetUriByDictionary(baseUri, actionUri, EnvironmentName, paramDictionary));
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
            catch(Exception er)
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


        string codesBasUri = "api/CdMas/";

        internal async Task<List<CdMas>> GetAllCodes(string EnvironmentName, int Cky, int UsrKy, int ObjKy, string ConCd)
        {
            string actionUri = "GetAllCodes";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", Cky);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("ConCd", ConCd);
            List<CdMas> GetAllCodeList = null;
            HttpResponseMessage response = await RunApiOperation(
             codesBasUri,
             actionUri,
             EnvironmentName,
             paramDictionary);
            GetAllCodeList = await response.Content.ReadAsAsync<List<CdMas>>();


            return GetAllCodeList;
        }
        internal async  Task<List<CdMas>> CdMasCdTypLookup(string EnvironmentName, int Cky, int UsrKy, int ObjKy, string TblNm)
        {

            string actionUri = "CdMasCdTypLookup";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", Cky);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("ObjKy", ObjKy);
            paramDictionary.Add("TblNm", TblNm);

            List<CdMas> GetAllCodeList = new List<CdMas>();
            //GetAllCodeList =await   RunApiOperation(
            //       codesBasUri,
            //    actionUri,
            //    EnvironmentName,
            //    paramDictionary,
            //    GetAllCodeList.GetType()) as List<CdMas>;

            return GetAllCodeList;
        }

        internal async Task<List<CdMas_LookupWebByConCd>> CdMas_LookupWebByConCd(string EnvironmentName, int CKy, int UsrKy, string ConCd)
        {
            string actionUri = "CdMas_LookupWebByConCd";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("ConCd", ConCd);

            List<CdMas_LookupWebByConCd> list = new List<CdMas_LookupWebByConCd>();
            //list =await   RunApiOperation(
            //    codesBasUri,
            //    actionUri,
            //    EnvironmentName,
            //    paramDictionary,
            //    list.GetType()) as List<CdMas_LookupWebByConCd>;

            return list;
        }

        internal async Task<List<Codes_SelectModel>> LoadGridView(string EnvironmentName, int Cky, int UsrKy, string GrpCdKy, string CdKy, string ConCdGrid)
        {
            string actionUri = "LoadGridView";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            // int Cky, int UsrKy, string ConCd, string CdKy, string GrpCdKy, string EnvironmentName
            paramDictionary.Add("Cky", Cky);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("ConCd", ConCdGrid);
            paramDictionary.Add("CdKy", CdKy);
            paramDictionary.Add("GrpCdKy", GrpCdKy);

            List<Codes_SelectModel> list = new List<Codes_SelectModel>();
            //list =await   RunApiOperation(
            //    codesBasUri,
            //    actionUri,
            //    EnvironmentName,
            //    paramDictionary,
            //    list.GetType()) as List<Codes_SelectModel>;

            return list;
        }

        internal async Task<bool> UpdateGridCodeToCodes(string EnvironmentName, string GridUpdateDetail, int CKy, int UsrKy)
        {
            string actionUri = "UpdateGrid";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("GridUpdateDetail", GridUpdateDetail);

            bool state = new bool();
            object obj = null;
                //RunApiOperation(
                //codesBasUri,
                //actionUri,
                //EnvironmentName,
                //paramDictionary,
                //state.GetType()) as object;

            return state = Convert.ToBoolean(obj);
        }

        internal async Task<List<string>> GetAllConCodes(string EnvironmentName, int cky, int UsrKy, int ObjKy)
        {
            string actionUri = "GetAllConCodes";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", cky);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("ObjKy", ObjKy);

            List<string> GetAllCodeList = new List<string>();
            //GetAllCodeList =await   RunApiOperation(
            //    codesBasUri,
            //    actionUri,
            //    EnvironmentName,
            //    paramDictionary,
            //    GetAllCodeList.GetType()) as List<string>;

            return GetAllCodeList;
        }

        internal async Task<bool> InsertUpdateCode(string EnvironmentName, string UpdatedCdMasRecords, string NewCdMasRecords, string ConCd, int CKy, int UsrKy)
        {
            int InsertFinished = 0;
            int UpdateFinished = 0;
            int NewRecordLength = 0;
            int UpdateRecordLength = 0;

            if (NewCdMasRecords != "[]" && NewCdMasRecords != "[null]" && NewCdMasRecords != "")
            {
                try
                {
                    CdMas[] NewCodes = new JavaScriptSerializer().Deserialize<CdMas[]>(NewCdMasRecords);
                    NewRecordLength = NewCodes.Length;

                    for (int i = 0; i < NewCodes.Length; i++)
                    {
                        string actionUri = "InsertCode";
                        Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

                        string NewmodelString = new JavaScriptSerializer().Serialize(NewCodes[i]);

                        paramDictionary.Add("UsrKy", UsrKy);
                        paramDictionary.Add("CKy", CKy);
                        paramDictionary.Add("ConCd", ConCd);
                        paramDictionary.Add("NewCodesRecords", NewmodelString);

                        bool Reset = new bool();
                        object obj = null;
                        //RunApiOperation(
                        //    codesBasUri,
                        //    actionUri,
                        //    EnvironmentName,
                        //    paramDictionary,
                        //    Reset.GetType());

                        Reset = Convert.ToBoolean(obj);
                        InsertFinished++;
                    }

                }
                catch (Exception ex)
                {
                    throw;
                }
            }

            if (UpdatedCdMasRecords != "[]" && UpdatedCdMasRecords != "[null]" && UpdatedCdMasRecords != "")
            {
                try
                {
                    CdMas[] UpdateCodes = new JavaScriptSerializer().Deserialize<CdMas[]>(UpdatedCdMasRecords);
                    UpdateRecordLength = UpdateCodes.Length;

                    for (int i = 0; i < UpdateCodes.Length; i++)
                    {
                        string actionUri = "UpdateCode";
                        Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

                        string UpdatemodelString = new JavaScriptSerializer().Serialize(UpdateCodes[i]);

                        paramDictionary.Add("UsrKy", UsrKy);
                        paramDictionary.Add("CKy", CKy);
                        paramDictionary.Add("ConCd", ConCd);
                        paramDictionary.Add("UpdatedCodesRecords", UpdatemodelString);

                        bool Reset = new bool();
                        object obj = null;
                        //RunApiOperation(
                        //    codesBasUri,
                        //    actionUri,
                        //    EnvironmentName,
                        //    paramDictionary,
                        //    Reset.GetType());

                        Reset = Convert.ToBoolean(obj);
                        UpdateFinished++;
                    }
                }
                catch (Exception ex)
                {
                    throw;
                }

            }
            if ((UpdatedCdMasRecords != "[]" && UpdatedCdMasRecords != "[null]" && UpdatedCdMasRecords != "") || (NewCdMasRecords != "[]" && NewCdMasRecords != "[null]" && NewCdMasRecords != ""))
            {
                if (InsertFinished == NewRecordLength && UpdateFinished == UpdateRecordLength)
                {
                    string actionUri = "InsertCdMasParent";
                    Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

                    paramDictionary.Add("UsrKy", UsrKy);
                    paramDictionary.Add("CKy", CKy);

                    object list = new object();
                    //list =  RunApiOperation(
                    //    codesBasUri,
                    //    actionUri,
                    //    EnvironmentName,
                    //    paramDictionary,
                    //    list.GetType()) as object;

                    return true;
                }
            }
            return true;
        }

        internal async Task<bool> DeleteCodes(string EnvironmentName, int CdKy, int UsrKy)
        {
            string actionUri = "DeleteCode";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("CdKy", CdKy);

            bool result = new bool();
            object obj = null;
            //RunApiOperation(
            //    codesBasUri,
            //    actionUri,
            //    EnvironmentName,
            //    paramDictionary,
            //    result.GetType()) as object;

            return result = Convert.ToBoolean(obj);
        }

        internal async Task<CdMas> GetCodeByCdKy(string EnvironmentName, int UsrKy, long CdKy)
        {
            string actionUri = "GetCodeByCdKy";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("CdKy", CdKy);

            CdMas list = new CdMas();
            //list =await   RunApiOperation(
            //    codesBasUri,
            //    actionUri,
            //    EnvironmentName,
            //    paramDictionary,
            //    list.GetType()) as CdMas;

            return list;
        }

        internal async Task<CdMas> GetCdMasByCdKy(string EnvironmentName, int cdky, int UsrKy)
        {
            string actionUri = "GetCdMasByCdKy";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CdKy", cdky);
            paramDictionary.Add("UsrKy", UsrKy);

            CdMas list = new CdMas();
            //list =await   RunApiOperation(
            //    codesBasUri,
            //    actionUri,
            //    EnvironmentName,
            //    paramDictionary,
            //    list.GetType()) as CdMas;

            return list;
        }

        internal async Task<long> GetCdKyByConCdAndOurCd(string EnvironmentName, int CKy, int UsrKy, int ObjKy, string ConCd, string OurCd)
        {

            string actionUri = "GetCdKyByConCdAndOurCd";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("ObjKy", ObjKy);
            paramDictionary.Add("ConCd", ConCd);
            paramDictionary.Add("OurCd", OurCd);

            object list = new object();
            list = null;
            HttpResponseMessage response = await RunApiOperation(
               codesBasUri,
               actionUri,
               EnvironmentName,
               paramDictionary);
            list = await response.Content.ReadAsAsync<long>();

            return Convert.ToInt64(list);
        }

        // still not using.....
        internal async Task<bool> CheckCdMasForExist(string EnvironmentName, int cky, int usrKy, string conCd, string code)
        {
            string actionUri = "CheckCdMasForExist";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", cky);
            paramDictionary.Add("UsrKy", usrKy);
            paramDictionary.Add("ConCd", conCd);
            paramDictionary.Add("Code", code);

            bool result = new bool();
            object obj = null;
            //RunApiOperation(
            //    codesBasUri,
            //    actionUri,
            //    EnvironmentName,
            //    paramDictionary,
            //    result.GetType()) as object;

            return result = Convert.ToBoolean(obj);
        }


        internal async Task<CdMas> GetCdMasBy_CdKy(string EnvironmentName, int CKy, int UsrKy, int ObjKy, int CdKy)
        {
            string actionUri = "GetCdMasBy_CdKy";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            // int Cky, int UsrKy, string ConCd, string CdKy, string GrpCdKy, string EnvironmentName
            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("ObjKy", ObjKy);
            paramDictionary.Add("CdKy", CdKy);

            CdMas list = new CdMas();
            HttpResponseMessage response = await RunApiOperation(
              codesBasUri,
              actionUri,
              EnvironmentName,
              paramDictionary);
            list = await response.Content.ReadAsAsync<CdMas>();

            return list;
        }

        internal async Task<List<CdMasdiagramModel>> CdMasdiagram(string EnvironmentName, int CKy, int UsrKy, string ConCd)
        {
            string actionUri = "CdMas_CdMasdiagram";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("ConCd", ConCd);

            List<CdMasdiagramModel> list = new List<CdMasdiagramModel>();
            //list =await   RunApiOperation(
            //    codesBasUri,
            //    actionUri,
            //    EnvironmentName,
            //    paramDictionary,
            //    list.GetType()) as List<CdMasdiagramModel>;

            return list;
        }


        internal async Task<List<Code_SelectMob>> Code_SelectMob(
          string EnvironmentName, int CKy, int UsrKy,
          int ObjKy, int TrnTypKy, int PreKy)
        {
            string actionUri = "Code_SelectMob";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("ObjKy", ObjKy);
            paramDictionary.Add("TrnTypKy", TrnTypKy);
            paramDictionary.Add("PreKy", PreKy);

            List<Code_SelectMob> list = null;
            HttpResponseMessage response = await RunApiOperation(
              codesBasUri,
              actionUri,
              EnvironmentName,
              paramDictionary);
            list = await response.Content.ReadAsAsync<List<Code_SelectMob>>();

            return list;
        }

        internal async Task<List<CdNm_SelectMob>> CdNm_SelectMob(
           string EnvironmentName, int CKy, int UsrKy,
           int ObjKy, int TrnTypKy, int PreKy)
        {
            string actionUri = "CdNm_SelectMob";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();
            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("ObjKy", ObjKy);
            paramDictionary.Add("TrnTypKy", TrnTypKy);
            paramDictionary.Add("PreKy", PreKy);

            List<CdNm_SelectMob> list = null;
            HttpResponseMessage response = await  RunApiOperation(
             codesBasUri,
             actionUri,
             EnvironmentName,
             paramDictionary);
             list = await response.Content.ReadAsAsync<List<CdNm_SelectMob>>();
            return list;
        }

        internal async Task<long> GetControlConKy(string EnvironmentName, string TblNm, string OurCd, int UsrKy, int CKy)
        {
            HttpResponseMessage response =await  httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/CdMas/GetControlConKy?TblNm=" + TblNm + "&OurCd=" + OurCd + "&UsrKy=" + UsrKy + "&CKy=" + CKy + ""));

            long TrnKy = 0;

            if (response.IsSuccessStatusCode)
            {
                string TrnKyString = response.Content.ReadAsStringAsync().Result;
                TrnKy = Convert.ToInt64(TrnKyString);

            }
            return TrnKy;
        }

      async internal Task<List<CdNm_SelectMob>> GetCat8ByCat7_SelectWeb(
          string EnvironmentName, int CKy, int UsrKy,
           int Cat7Ky)
        {
            string actionUri = "GetCat8ByCat7_SelectWeb";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("Cat7Ky", Cat7Ky);

            List<CdNm_SelectMob> list = new List<CdNm_SelectMob>();
            HttpResponseMessage response = await RunApiOperation(
             codesBasUri,
             actionUri,
             EnvironmentName,
             paramDictionary);
            list = await response.Content.ReadAsAsync<List<CdNm_SelectMob>>();

            return list;
        }



    }
}