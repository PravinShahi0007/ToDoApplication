using BlueLotus.BOQImport.Entity;
using BlueLotus.ImportModel.Entity;
using BlueLotus.ItmMas.Model.Entity;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Runtime.Serialization.Json;
using System.Text;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.Configuration;
using System.Net.Http.Headers;
using NLog;
using System.Threading.Tasks;

namespace BlueLotus.UI.ApiOperations
{
    //public class CustomHttpError
    //{
    //    public string ExceptionMessage { get; set; }
    //    public string ExceptionType { get; set; }
    //    public string Message { get; set; }
    //    public string StackTrace { get; set; }
    //    public string InnerException { get; set; }
    //}

    //public partial class ItmPrfApiOperationV2
     public partial class ItmPrfApiOperationV2
    {
        //Common Api Operation
        #region common
        private HttpClient httpClient;
        //public ItmPrfApiOperationV2()
        public ItmPrfApiOperationV2()
        {
            httpClient = new HttpClient();
            httpClient.BaseAddress = new Uri(WebConfigurationManager.AppSettings["PathForItmPrfAPI"]); //new Uri("http://localhost:49558");//WebConfigurationManager.AppSettings["PathForWebAPI"]);
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


        #region ItemProfile

        string ItmPrflBaseUri = "api/ItmProfile/";






        internal async Task<bool> InsertPOS(string EnvironmentName, int CKy, int UsrKy, string updateGrid, string NewGridDetail)
        {
            bool rest = false;

            if (NewGridDetail != "[]" && NewGridDetail != "[null]" && NewGridDetail != "")
            {
                try
                {
                    //ItmMasModel[] NewCodes = new JavaScriptSerializer().Deserialize<ItmMasModel[]>(NewGridDetail);
                    ItmMasModel[] NewCodes = JsonConvert.DeserializeObject<ItmMasModel[]>(NewGridDetail);

                    for (int i = 0; i < NewCodes.Length; i++)
                    {
                        string actionUri = "InsertPOS";
                        Dictionary<string, object> paramDictionary = new Dictionary<string, object>();
                        List<ItmMasModel> lst = new List<ItmMasModel>();
                        lst.Add(NewCodes[i]);
                        string NewmodelString = new JavaScriptSerializer().Serialize(lst);

                        paramDictionary.Add("CKy", CKy);
                        paramDictionary.Add("UsrKy", UsrKy);
                        paramDictionary.Add("NewGridDetail", NewmodelString);
                        paramDictionary.Add("updateGrid", "[]");

                       
                        HttpResponseMessage response = await RunApiOperation(
                         ItmPrflBaseUri,
                         actionUri,
                         EnvironmentName,
                         paramDictionary);
                        rest = await response.Content.ReadAsAsync<bool>();
                       
                    }
                }
                catch (Exception)
                {

                    throw;
                }
            }

            if (updateGrid != "[]" && updateGrid != "[null]" && updateGrid != "")
            {
                try
                {
                    //ItmMasModel[] UpdateCodes = new JavaScriptSerializer().Deserialize<ItmMasModel[]>(updateGrid);
                    ItmMasModel[] UpdateCodes = JsonConvert.DeserializeObject<ItmMasModel[]>(updateGrid);
                    for (int i = 0; i < UpdateCodes.Length; i++)
                    {
                        string actionUri = "InsertPOS";
                        Dictionary<string, object> paramDictionary = new Dictionary<string, object>();
                        List<ItmMasModel> lst = new List<ItmMasModel>();
                        lst.Add(UpdateCodes[i]);
                        var NewmodelString = JsonConvert.SerializeObject(lst);

                        paramDictionary.Add("CKy", CKy);
                        paramDictionary.Add("UsrKy", UsrKy);
                        paramDictionary.Add("NewGridDetail", "[]");
                        paramDictionary.Add("updateGrid", NewmodelString);

                        HttpResponseMessage response = await RunApiOperation(
                        ItmPrflBaseUri,
                        actionUri,
                        EnvironmentName,
                        paramDictionary);
                        rest = await response.Content.ReadAsAsync<bool>();
                        
                    }
                }
                catch (Exception er)
                {

                    throw;
                }
            }
            return rest;
        }

        internal async  Task<bool> UpdatePOS(string EnvironmentName, int CKy, int UsrKy, string updateGrid, string NewGridDetail)
        {
            string actionUri = "UpdatePOS";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("NewGridDetail", NewGridDetail);
            paramDictionary.Add("updateGrid", updateGrid);

            bool res = new bool();

            HttpResponseMessage response = await RunApiOperation(
                       ItmPrflBaseUri,
                       actionUri,
                       EnvironmentName,
                       paramDictionary);
            res = await response.Content.ReadAsAsync<bool>();

           
            return res;

            //HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/ItmPrfl/Update?CKy=" + CKy + "&UsrKy=" + UsrKy + "&updateGrid=" + updateGrid + "&NewGridDetail=" + NewGridDetail + "")).Result;

            //bool result = false;
            //if (response.IsSuccessStatusCode)
            //{
            //    result = true;
            //}
            //return result;
        }

        internal async  Task<bool> UpdatePost(string EnvironmentName, int CKy, int UsrKy)
        {

            HttpResponseMessage response = await httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/ItmPrfl/UpdatePost?CKy=" + CKy + "&UsrKy=" + UsrKy + ""));

            bool result = false;
            if (response.IsSuccessStatusCode)
            {
                result = true;
            }
            return result;
        }

        internal async  Task<bool> InsertEAN(string EnvironmentName, int CKy, int UsrKy, int ObjKy, string EAN, long ItmKy)
        {

            HttpResponseMessage response =await  httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/ItmPrfl/InsertEAN?CKy=" + CKy + "&UsrKy=" + UsrKy + "&ObjKy=" + ObjKy + "&EAN=" + EAN + "&ItmKy=" + ItmKy + ""));

            bool result = false;
            if (response.IsSuccessStatusCode)
            {
                result = true;
            }
            return result;
        }

        internal async  Task<bool> UpdateEAN(string EnvironmentName, int CKy, int UsrKy, int ObjKy, string EAN, long ItmKy, int ItmEANKy)
        {

            HttpResponseMessage response =await  httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/ItmPrfl/UpdateEAN?CKy=" + CKy + "&UsrKy=" + UsrKy + "&ObjKy=" + ObjKy + "&EAN=" + EAN + "&ItmKy=" + ItmKy + "&ItmEANKy=" + ItmEANKy + ""));

            bool result = false;
            if (response.IsSuccessStatusCode)
            {
                result = true;
            }
            return result;
        }

        internal async  Task<List<ItmMasEAN>> SelectEAN(string EnvironmentName, int CKy, int UsrKy, long ItmKy)
        {
            HttpResponseMessage response =await  httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/ItmPrfl/SelectEAN?CKy=" + CKy + "&UsrKy=" + UsrKy + "&ItmKy=" + ItmKy + ""));

            List<ItmMasEAN> menuList = new List<ItmMasEAN>();
            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<ItmMasEAN>));
                List<ItmMasEAN> deserializeditems = new List<ItmMasEAN>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<ItmMasEAN>;
                menuList = deserializeditems;
            }
            return menuList;
        }

        internal async  Task<List<ItmPriceRevision>> LoadPriceRevision(string EnvironmentName, int ItmKy, int UsrKy, int CKy, int ObjKy)
        {
            string actionUri = "LoadPriceRevision";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();
            paramDictionary.Add("ItmKy", ItmKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("ObjKy", ObjKy);

            List<ItmPriceRevision> List = new List<ItmPriceRevision>();
            HttpResponseMessage response = await RunApiOperation(
                       ItmPrflBaseUri,
                       actionUri,
                       EnvironmentName,
                       paramDictionary);
            List = await response.Content.ReadAsAsync<List<ItmPriceRevision>>();           

            return List;
        }

        internal async Task<bool> InsertItmSettings(string EnvironmentName, string NewGridDetail, int CKy, int UsrKy, int ObjKy, int ControlConKy, long ItmKy)
        {

            HttpResponseMessage response =await  httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/ItmMas/InsertItmSettings?NewGridDetail=" + NewGridDetail + "&CKy=" + CKy + "&UsrKy=" + UsrKy + "&ObjKy=" + ObjKy + "&ControlConKy=" + ControlConKy + "&ItmKy=" + ItmKy + ""));

            bool result = false;
            if (response.IsSuccessStatusCode)
            {
                result = true;
            }
            return result;
        }

        internal async Task<List<ItmMasCd_SelectWeb>> GetItmSettings(string EnvironmentName, int CKy, int UsrKy, int ObjKy, int ItmTypKy, int ControlConKy, long ItmKy)
        {
            HttpResponseMessage response =await  httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/ItmMasCd/GetItmSettings?CKy=" + CKy + "&UsrKy=" + UsrKy + "&ObjKy=" + ObjKy + "&ItmTypKy=" + ItmTypKy + "&ControlConKy=" + ControlConKy + "&ItmKy=" + ItmKy + ""));

            List<ItmMasCd_SelectWeb> menuList = new List<ItmMasCd_SelectWeb>();
            if (response.IsSuccessStatusCode)
            {
                menuList = await response.Content.ReadAsAsync<List<ItmMasCd_SelectWeb>>();

                //string jstr = response.Content.ReadAsStringAsync().Result;
                //DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<ItmMasCd_SelectWeb>));
                //List<ItmMasCd_SelectWeb> deserializeditems = new List<ItmMasCd_SelectWeb>();
                //MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                //DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                //deserializeditems = ser.ReadObject(ms) as List<ItmMasCd_SelectWeb>;
                //menuList = deserializeditems;
            }
            return menuList;
        }

        internal async Task<bool> UpdateItmSettings(string EnvironmentName, string updateGrid, int CKy, int UsrKy, int ObjKy, int ControlConKy, long ItmKy)
        {
            HttpResponseMessage response =await  httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/ItmMasCd/UpdateItmSettings?updateGrid=" + updateGrid + "&CKy=" + CKy + "&UsrKy=" + UsrKy + "&ObjKy=" + ObjKy + "&ControlConKy=" + ControlConKy + "&ItmKy=" + ItmKy + ""));

            bool result = false;
            if (response.IsSuccessStatusCode)
            {
                result = true;
            }
            return result;
        }


        internal async Task<List<ItmStock>> LoadItmStock(string EnvironmentName, int ItmKy, int UsrKy, int CKy, int ObjKy)
        {
            string actionUri = "LoadItmStock";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();
            paramDictionary.Add("ItmKy", ItmKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("ObjKy", ObjKy);

            List<ItmStock> List = new List<ItmStock>();

            HttpResponseMessage response = await RunApiOperation(
                      ItmPrflBaseUri,
                      actionUri,
                      EnvironmentName,
                      paramDictionary);
            List = await response.Content.ReadAsAsync<List<ItmStock>>();

          

            return List;
        }

        internal async Task<List<Modifier>> LoadModifier(string EnvironmentName, int PrntItmKy)
        {
            string actionUri = "LoadModifier";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();
            paramDictionary.Add("PrntItmKy", PrntItmKy);

            List<Modifier> List = new List<Modifier>();

            HttpResponseMessage response = await RunApiOperation(
                      ItmPrflBaseUri,
                      actionUri,
                      EnvironmentName,
                      paramDictionary);
            List = await response.Content.ReadAsAsync<List<Modifier>>();
            
            return List;
        }



        public async Task<bool> UpdatePriceRevision(string EnvironmentName, int CKy, int UsrKy, int ObjKy, string updateGrid, string newGrid, int ControlConKy, int ItmKy)
        {
            string actionUri = "UpdatePriceRevision";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("ObjKy", ObjKy);
            paramDictionary.Add("updateGrid", updateGrid);
            paramDictionary.Add("newGrid", newGrid);
            paramDictionary.Add("ControlConKy", ControlConKy);
            paramDictionary.Add("ItmKy", ItmKy);

            bool list = new bool();

            HttpResponseMessage response = await RunApiOperation(
                    ItmPrflBaseUri,
                    actionUri,
                    EnvironmentName,
                    paramDictionary);
            list = await response.Content.ReadAsAsync<bool>();

           

            return Convert.ToBoolean(list);
        }

        public async Task<bool> POSModifier_InsertUpdate(string EnvironmentName,  string newGrid, int PrntItmKy)
        {
            string actionUri = "POSModifier_InsertUpdate";
            List<Modifier> modelObj = JsonConvert.DeserializeObject<List<Modifier>>(newGrid);
            foreach(Modifier moditm in modelObj)
            {
                moditm.PrntItmKy = PrntItmKy;

            }
           
            string NewmodelString = new JavaScriptSerializer().Serialize(modelObj);


            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();
            
           // paramDictionary.Add("PrntItmKy", PrntItmKy);
            paramDictionary.Add("newGrid", NewmodelString);

            bool list = new bool();

            HttpResponseMessage response = await RunApiOperation(
                    ItmPrflBaseUri,
                    actionUri,
                    EnvironmentName,
                    paramDictionary);
            list = await response.Content.ReadAsAsync<bool>();
            
            return Convert.ToBoolean(list);
        }

        public async Task<bool> POSModifier_Delete(string EnvironmentName,string ModifierItmKy)
        {
            string actionUri = "POSModifier_Delete";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("ModifierItmKy", ModifierItmKy);

            bool list = new bool();

            HttpResponseMessage response = await RunApiOperation(
                    ItmPrflBaseUri,
                    actionUri,
                    EnvironmentName,
                    paramDictionary);
            list = await response.Content.ReadAsAsync<bool>();

            return Convert.ToBoolean(list);
        }


        internal async Task<List<ItmMasCatModel>> ItmCat7Ky(string EnvironmentName, int cky, int UsrKy)
        {
            HttpResponseMessage response =await  httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/ItmPrfl/ItmCat7Ky?cky=" + cky + "&UsrKy=" + UsrKy + ""));

            List<ItmMasCatModel> menuList = new List<ItmMasCatModel>();
            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<ItmMasCatModel>));
                List<ItmMasCatModel> deserializeditems = new List<ItmMasCatModel>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<ItmMasCatModel>;
                menuList = deserializeditems;
            }
            return menuList;
        }
        internal async Task<List<ItmMasCatModel>> ItmCat8Ky(string EnvironmentName, int cky, int UsrKy)
        {
            HttpResponseMessage response =await  httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/ItmPrfl/ItmCat8Ky?cky=" + cky + "&UsrKy=" + UsrKy + ""));

            List<ItmMasCatModel> menuList = new List<ItmMasCatModel>();
            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<ItmMasCatModel>));
                List<ItmMasCatModel> deserializeditems = new List<ItmMasCatModel>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<ItmMasCatModel>;
                menuList = deserializeditems;
            }
            return menuList;
        }


        public async Task<List<ItmMasCatModel>> GetVat(string EnvironmentName, int cKy, string ConCd, int isAllAcsLvl, int UsrKy, int ObjKy)
        {
            string actionUri = "GetVat";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", cKy);
            paramDictionary.Add("ConCd", ConCd);
            paramDictionary.Add("isAllAcsLvl", isAllAcsLvl);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("ObjKy", ObjKy);

            List<ItmMasCatModel> menuList = new List<ItmMasCatModel>();
            HttpResponseMessage response = await RunApiOperation(
                  ItmPrflBaseUri,
                  actionUri,
                  EnvironmentName,
                  paramDictionary);
            menuList = await response.Content.ReadAsAsync<List<ItmMasCatModel>>();          

            return menuList;
        }

        public async Task<List<ItmMasCatModel>> GetItmTyp(string EnvironmentName, int cKy, string ConCd, int isAllAcsLvl, int UsrKy, int ObjKy)
        {
            string actionUri = "GetItmTyp";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", cKy);
            paramDictionary.Add("ConCd", ConCd);
            paramDictionary.Add("isAllAcsLvl", isAllAcsLvl);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("ObjKy", ObjKy);

            List<ItmMasCatModel> menuList = new List<ItmMasCatModel>();

            HttpResponseMessage response = await RunApiOperation(
                 ItmPrflBaseUri,
                 actionUri,
                 EnvironmentName,
                 paramDictionary);
            menuList = await response.Content.ReadAsAsync<List<ItmMasCatModel>>();

            return menuList;
        }

        public async Task<List<ItmMasCatModel>> GetDisplayNm(string EnvironmentName, int cKy, string ConCd, int isAllAcsLvl, int UsrKy, int ObjKy)
        {
            string actionUri = "GetDisplayNm";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", cKy);
            paramDictionary.Add("ConCd", ConCd);
            paramDictionary.Add("isAllAcsLvl", isAllAcsLvl);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("ObjKy", ObjKy);

            List<ItmMasCatModel> menuList = new List<ItmMasCatModel>();

            HttpResponseMessage response = await RunApiOperation(
              ItmPrflBaseUri,
              actionUri,
              EnvironmentName,
              paramDictionary);
            menuList = await response.Content.ReadAsAsync<List<ItmMasCatModel>>();           

            return menuList;
        }

        public async Task<List<ItmMasCatModel>> GetGrpInventory(string EnvironmentName, int cKy, string ConCd, int isAllAcsLvl, int UsrKy, int ObjKy)
        {
            string actionUri = "GetGrpInventory";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", cKy);
            paramDictionary.Add("ConCd", ConCd);
            paramDictionary.Add("isAllAcsLvl", isAllAcsLvl);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("ObjKy", ObjKy);

            List<ItmMasCatModel> menuList = new List<ItmMasCatModel>();

            HttpResponseMessage response = await RunApiOperation(
              ItmPrflBaseUri,
              actionUri,
              EnvironmentName,
              paramDictionary);
            menuList = await response.Content.ReadAsAsync<List<ItmMasCatModel>>();          

            return menuList;
        }

        public async Task<List<ItmMasCatModel>> GetDept(string EnvironmentName, int cKy, string ConCd, int isAllAcsLvl, int UsrKy, int ObjKy)
        {
            string actionUri = "GetDept";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("ConCd", ConCd);
            paramDictionary.Add("isAllAcsLvl", isAllAcsLvl);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("ObjKy", ObjKy);
            paramDictionary.Add("CKy", cKy);

            List<ItmMasCatModel> menuList = new List<ItmMasCatModel>();

            HttpResponseMessage response = await RunApiOperation(
            ItmPrflBaseUri,
            actionUri,
            EnvironmentName,
            paramDictionary);
            menuList = await response.Content.ReadAsAsync<List<ItmMasCatModel>>();


           

            return menuList;
        }

        public async  Task<List<ItmMasCatModel>> GetCategory(string EnvironmentName, int cKy, string ConCd, int isAllAcsLvl, int UsrKy)
        {
            string actionUri = "GetCategory";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", cKy);
            paramDictionary.Add("ConCd", ConCd);
            paramDictionary.Add("isAllAcsLvl", isAllAcsLvl);
            paramDictionary.Add("UsrKy", UsrKy);

            List<ItmMasCatModel> menuList = new List<ItmMasCatModel>();

            HttpResponseMessage response = await RunApiOperation(
           ItmPrflBaseUri,
           actionUri,
           EnvironmentName,
           paramDictionary);
            menuList = await response.Content.ReadAsAsync<List<ItmMasCatModel>>();


           

            return menuList;
        }

        internal async Task<List<ItmMasModel>> GetAllItems(string EnvironmentName, int OnlyisAct, int ItmTypKy, int Dept, int Cat, int usrKy, int CKy, int ObjKy, string ItmCd, string ItmNm, int PageNo, int PageSize)
        {
            string actionUri = "GetAllItems";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("ItmTypKy", ItmTypKy);
            paramDictionary.Add("OnlyisAct", OnlyisAct);
            paramDictionary.Add("Dept", Dept);
            paramDictionary.Add("Cat", Cat);
            paramDictionary.Add("usrKy", usrKy);
            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("ObjKy", ObjKy);
            paramDictionary.Add("ItmCd", ItmCd);
            paramDictionary.Add("ItmNm", ItmNm);
            paramDictionary.Add("PageNo", PageNo);
            paramDictionary.Add("PageSize", PageSize);

            List<ItmMasModel> menuList = new List<ItmMasModel>();

            HttpResponseMessage response = await RunApiOperation(
                 ItmPrflBaseUri,
                 actionUri,
                 EnvironmentName,
                 paramDictionary);
            menuList = await response.Content.ReadAsAsync<List<ItmMasModel>>();          

            return menuList;
        }

        


        //internal bool ItmMasExcelImportJsonData(string EnvironmentName, string MSImportStringData, int CKy, int UsrKy)
        //{
        //    // -- Define New List
        //    List<UnitXml> newUnitXml = new List<UnitXml>();
        //    List<ItmMasXml> newItmMasXml = new List<ItmMasXml>();
        //    List<ItmEANXml> newItmEANXml = new List<ItmEANXml>();
        //    List<ItmRateXml> newItmRateXml = new List<ItmRateXml>();
        //    List<ItemTypeXml> newItmTypXml = new List<ItemTypeXml>();
        //    List<SupplierXml> newSupplierXml = new List<SupplierXml>();
        //    List<ItmMasRateXml> newItmMasRateXml = new List<ItmMasRateXml>();
        //    List<ItemCat1Xml> newItmCat1Xml = new List<ItemCat1Xml>();
        //    List<ItemCat2Xml> newItmCat2Xml = new List<ItemCat2Xml>();
        //    List<ItemCat3Xml> newItmCat3Xml = new List<ItemCat3Xml>();
        //    List<ItemCat4Xml> newItmCat4Xml = new List<ItemCat4Xml>();
        //    List<ItemCat5Xml> newItmCat5Xml = new List<ItemCat5Xml>();
        //    List<ItemCat6Xml> newItmCat6Xml = new List<ItemCat6Xml>();
        //    List<ItemCat7Xml> newItmCat7Xml = new List<ItemCat7Xml>();
        //    List<ItemCat8Xml> newItmCat8Xml = new List<ItemCat8Xml>();
        //    List<ItemCat9Xml> newItmCat9Xml = new List<ItemCat9Xml>();
        //    List<ItemCat10Xml> newItmCat10Xml = new List<ItemCat10Xml>();
        //    List<ItemCat11Xml> newItmCat11Xml = new List<ItemCat11Xml>();
        //    List<ItemCat12Xml> newItmCat12Xml = new List<ItemCat12Xml>();
        //    List<LocationXml> newLocationXml = new List<LocationXml>();
        //    List<VATXml> newVatXml = new List<VATXml>();
        //    List<BrandXml> newBrandXml = new List<BrandXml>();
        //    List<ModelXml> newModelXml = new List<ModelXml>();
        //    List<ItmTaxXml> newItmTaxXml = new List<ItmTaxXml>();
        //    List<StockXml> newStockXml = new List<StockXml>();
        //    List<EANXml> newEANXml = new List<EANXml>();
        //    List<ProjectXml> newProjectXml = new List<ProjectXml>();
        //    List<SerNoXml> newSerNoXml = new List<SerNoXml>();
        //    // -- Define New List

        //    List<ItmMasExcel_ImportModel> listNew = new List<ItmMasExcel_ImportModel>();

        //    if (MSImportStringData != "[]" || MSImportStringData != "[null]" || MSImportStringData != "")
        //    {
        //        try
        //        {
        //            PMExcel_ImportModel task1 = new JavaScriptSerializer().Deserialize<PMExcel_ImportModel>(MSImportStringData);
        //            ItmMasExcel_ImportModel task = new JavaScriptSerializer().Deserialize<ItmMasExcel_ImportModel>(MSImportStringData);

        //            if (task1.UnitXml != null)
        //                foreach (UnitXml unitXml in task1.UnitXml)
        //                {
        //                    if (unitXml != null)
        //                    {
        //                        UnitXml unt = ValidateAndInsertUnitMas(EnvironmentName, unitXml.Unit, CKy, UsrKy);
        //                        newUnitXml.Add(unt);
        //                    }
        //                }

        //            if (task.ItemCat1Xml != null)
        //                foreach (ItemCat1Xml itmcat1Xml in task.ItemCat1Xml)
        //                {
        //                    if (itmcat1Xml != null)
        //                    {
        //                        ItemCat1Xml cat = new ItemCat1Xml();
        //                        CdMasXml ItmCat = ValidateAndInsertCdMas(EnvironmentName, itmcat1Xml.ItemCat1, itmcat1Xml.ItemCat1, "ItmCat1", CKy, UsrKy);
        //                        cat.CdKy = ItmCat.CdKy;
        //                        cat.ItemCat1 = ItmCat.Code;
        //                        cat.CdNm = ItmCat.CdNm;
        //                        cat.OurCd = ItmCat.OurCd;
        //                        newItmCat1Xml.Add(cat);
        //                    }
        //                }

        //            if (task.ItemCat2Xml != null)
        //                foreach (ItemCat2Xml itmcat2Xml in task.ItemCat2Xml)
        //                {
        //                    if (itmcat2Xml != null)
        //                    {
        //                        ItemCat2Xml cat = new ItemCat2Xml();
        //                        CdMasXml ItmCat = ValidateAndInsertCdMas(EnvironmentName, itmcat2Xml.ItemCat2, itmcat2Xml.ItemCat2, "ItmCat2", CKy, UsrKy);
        //                        cat.CdKy = ItmCat.CdKy;
        //                        cat.ItemCat2 = ItmCat.Code;
        //                        cat.CdNm = ItmCat.CdNm;
        //                        cat.OurCd = ItmCat.OurCd;
        //                        newItmCat2Xml.Add(cat);
        //                    }
        //                }

        //            if (task.ItemCat3Xml != null)
        //                foreach (ItemCat3Xml itmcat3Xml in task.ItemCat3Xml)
        //                {
        //                    if (itmcat3Xml != null)
        //                    {
        //                        ItemCat3Xml cat = new ItemCat3Xml();
        //                        CdMasXml ItmCat = ValidateAndInsertCdMas(EnvironmentName, itmcat3Xml.ItemCat3, itmcat3Xml.ItemCat3, "ItmCat3", CKy, UsrKy);
        //                        cat.CdKy = ItmCat.CdKy;
        //                        cat.ItemCat3 = ItmCat.Code;
        //                        cat.CdNm = ItmCat.CdNm;
        //                        cat.OurCd = ItmCat.OurCd;
        //                        newItmCat3Xml.Add(cat);
        //                    }
        //                }

        //            if (task.ItemCat4Xml != null)
        //                foreach (ItemCat4Xml itmcat4Xml in task.ItemCat4Xml)
        //                {
        //                    if (itmcat4Xml != null)
        //                    {
        //                        ItemCat4Xml cat = new ItemCat4Xml();
        //                        CdMasXml ItmCat = ValidateAndInsertCdMas(EnvironmentName, itmcat4Xml.ItemCat4, itmcat4Xml.ItemCat4, "ItmCat4", CKy, UsrKy);
        //                        cat.CdKy = ItmCat.CdKy;
        //                        cat.ItemCat4 = ItmCat.Code;
        //                        cat.CdNm = ItmCat.CdNm;
        //                        cat.OurCd = ItmCat.OurCd;
        //                        newItmCat4Xml.Add(cat);
        //                    }
        //                }

        //            if (task.ItemCat5Xml != null)
        //                foreach (ItemCat5Xml itmcat5Xml in task.ItemCat5Xml)
        //                {
        //                    if (itmcat5Xml != null)
        //                    {
        //                        ItemCat5Xml cat = new ItemCat5Xml();
        //                        CdMasXml ItmCat = ValidateAndInsertCdMas(EnvironmentName, itmcat5Xml.ItemCat5, itmcat5Xml.ItemCat5, "ItmCat5", CKy, UsrKy);
        //                        cat.CdKy = ItmCat.CdKy;
        //                        cat.ItemCat5 = ItmCat.Code;
        //                        cat.CdNm = ItmCat.CdNm;
        //                        cat.OurCd = ItmCat.OurCd;
        //                        newItmCat5Xml.Add(cat);
        //                    }
        //                }

        //            if (task.ItemCat6Xml != null)
        //                foreach (ItemCat6Xml itmcat6Xml in task.ItemCat6Xml)
        //                {
        //                    if (itmcat6Xml != null)
        //                    {
        //                        ItemCat6Xml cat = new ItemCat6Xml();
        //                        CdMasXml ItmCat = ValidateAndInsertCdMas(EnvironmentName, itmcat6Xml.ItemCat6, itmcat6Xml.ItemCat6, "ItmCat6", CKy, UsrKy);
        //                        cat.CdKy = ItmCat.CdKy;
        //                        cat.ItemCat6 = ItmCat.Code;
        //                        cat.CdNm = ItmCat.CdNm;
        //                        cat.OurCd = ItmCat.OurCd;
        //                        newItmCat6Xml.Add(cat);
        //                    }
        //                }

        //            if (task.ItemCat7Xml != null)
        //                foreach (ItemCat7Xml itmcat7Xml in task.ItemCat7Xml)
        //                {
        //                    if (itmcat7Xml != null)
        //                    {
        //                        ItemCat7Xml cat = new ItemCat7Xml();
        //                        CdMasXml ItmCat = ValidateAndInsertCdMas(EnvironmentName, itmcat7Xml.ItemCat7, itmcat7Xml.ItemCat7, "ItmCat7", CKy, UsrKy);
        //                        cat.CdKy = ItmCat.CdKy;
        //                        cat.ItemCat7 = ItmCat.Code;
        //                        cat.CdNm = ItmCat.CdNm;
        //                        cat.OurCd = ItmCat.OurCd;
        //                        newItmCat7Xml.Add(cat);
        //                    }
        //                }

        //            if (task.ItemCat8Xml != null)
        //                foreach (ItemCat8Xml itmcat8Xml in task.ItemCat8Xml)
        //                {
        //                    if (itmcat8Xml != null)
        //                    {
        //                        ItemCat8Xml cat = new ItemCat8Xml();
        //                        CdMasXml ItmCat = ValidateAndInsertCdMas(EnvironmentName, itmcat8Xml.ItemCat8, itmcat8Xml.ItemCat8, "ItmCat8", CKy, UsrKy);
        //                        cat.CdKy = ItmCat.CdKy;
        //                        cat.ItemCat8 = ItmCat.Code;
        //                        cat.CdNm = ItmCat.CdNm;
        //                        cat.OurCd = ItmCat.OurCd;
        //                        newItmCat8Xml.Add(cat);
        //                    }
        //                }

        //            if (task.ItemCat9Xml != null)
        //                foreach (ItemCat9Xml itmcat9Xml in task.ItemCat9Xml)
        //                {
        //                    if (itmcat9Xml != null)
        //                    {
        //                        ItemCat9Xml cat = new ItemCat9Xml();
        //                        CdMasXml ItmCat = ValidateAndInsertCdMas(EnvironmentName, itmcat9Xml.ItemCat9, itmcat9Xml.ItemCat9, "ItmCat9", CKy, UsrKy);
        //                        cat.CdKy = ItmCat.CdKy;
        //                        cat.ItemCat9 = ItmCat.Code;
        //                        cat.CdNm = ItmCat.CdNm;
        //                        cat.OurCd = ItmCat.OurCd;
        //                        newItmCat9Xml.Add(cat);
        //                    }
        //                }

        //            if (task.ItemCat10Xml != null)
        //                foreach (ItemCat10Xml itmcat10Xml in task.ItemCat10Xml)
        //                {
        //                    if (itmcat10Xml != null)
        //                    {
        //                        ItemCat10Xml cat = new ItemCat10Xml();
        //                        CdMasXml ItmCat = ValidateAndInsertCdMas(EnvironmentName, itmcat10Xml.ItemCat10, itmcat10Xml.ItemCat10, "ItmCat10", CKy, UsrKy);
        //                        cat.CdKy = ItmCat.CdKy;
        //                        cat.ItemCat10 = ItmCat.Code;
        //                        cat.CdNm = ItmCat.CdNm;
        //                        cat.OurCd = ItmCat.OurCd;
        //                        newItmCat10Xml.Add(cat);
        //                    }
        //                }

        //            if (task.ItemCat11Xml != null)
        //                foreach (ItemCat11Xml itmcat11Xml in task.ItemCat11Xml)
        //                {
        //                    if (itmcat11Xml != null)
        //                    {
        //                        ItemCat11Xml cat = new ItemCat11Xml();
        //                        CdMasXml ItmCat = ValidateAndInsertCdMas(EnvironmentName, itmcat11Xml.ItemCat11, itmcat11Xml.ItemCat11, "ItmCat11", CKy, UsrKy);
        //                        cat.CdKy = ItmCat.CdKy;
        //                        cat.ItemCat11 = ItmCat.Code;
        //                        cat.CdNm = ItmCat.CdNm;
        //                        cat.OurCd = ItmCat.OurCd;
        //                        newItmCat11Xml.Add(cat);
        //                    }
        //                }

        //            if (task.ItemCat12Xml != null)
        //                foreach (ItemCat12Xml itmcat12Xml in task.ItemCat12Xml)
        //                {
        //                    if (itmcat12Xml != null)
        //                    {
        //                        ItemCat12Xml cat = new ItemCat12Xml();
        //                        CdMasXml ItmCat = ValidateAndInsertCdMas(EnvironmentName, itmcat12Xml.ItemCat12, itmcat12Xml.ItemCat12, "ItmCat12", CKy, UsrKy);
        //                        cat.CdKy = ItmCat.CdKy;
        //                        cat.ItemCat12 = ItmCat.Code;
        //                        cat.CdNm = ItmCat.CdNm;
        //                        cat.OurCd = ItmCat.OurCd;
        //                        newItmCat12Xml.Add(cat);
        //                    }
        //                }

        //            if (task.ItemTypeXml != null)
        //                foreach (ItemTypeXml itmtypXml in task.ItemTypeXml)
        //                {
        //                    if (itmtypXml != null)
        //                    {
        //                        ItemTypeXml cat = new ItemTypeXml();
        //                        CdMasXml ItmCat = ValidateAndInsertCdMas(EnvironmentName, itmtypXml.ItemType, itmtypXml.ItemType, "ItmTyp", CKy, UsrKy);
        //                        cat.CdKy = ItmCat.CdKy;
        //                        cat.ItemType = ItmCat.Code;
        //                        cat.CdNm = ItmCat.CdNm;
        //                        cat.OurCd = ItmCat.OurCd;
        //                        newItmTypXml.Add(cat);
        //                    }
        //                }

        //            if (task.LocationXml != null)
        //                foreach (LocationXml locXml in task.LocationXml)
        //                {
        //                    if (locXml != null)
        //                    {
        //                        LocationXml cat = new LocationXml();
        //                        CdMasXml ItmCat = ValidateAndInsertCdMas(EnvironmentName, locXml.Location, locXml.Location, "loc", CKy, UsrKy);
        //                        cat.CdKy = ItmCat.CdKy;
        //                        cat.Location = ItmCat.Code;
        //                        cat.CdNm = ItmCat.CdNm;
        //                        cat.OurCd = ItmCat.OurCd;
        //                        newLocationXml.Add(cat);
        //                    }
        //                }

        //            if (task.BrandXml != null)
        //                foreach (BrandXml brandXml in task.BrandXml)
        //                {
        //                    if (brandXml != null)
        //                    {
        //                        BrandXml cat = new BrandXml();
        //                        CdMasXml ItmCat = ValidateAndInsertCdMas(EnvironmentName, brandXml.Brand, brandXml.Brand, "brand", CKy, UsrKy);
        //                        cat.CdKy = ItmCat.CdKy;
        //                        cat.Brand = ItmCat.Code;
        //                        cat.CdNm = ItmCat.CdNm;
        //                        cat.OurCd = ItmCat.OurCd;
        //                        newBrandXml.Add(cat);
        //                    }
        //                }

        //            if (task.ModelXml != null)
        //                foreach (ModelXml modelXml in task.ModelXml)
        //                {
        //                    if (modelXml != null)
        //                    {
        //                        ModelXml cat = new ModelXml();
        //                        CdMasXml ItmCat = ValidateAndInsertCdMas(EnvironmentName, modelXml.Model, modelXml.Model, "Model", CKy, UsrKy);
        //                        cat.CdKy = ItmCat.CdKy;
        //                        cat.Model = ItmCat.Code;
        //                        cat.CdNm = ItmCat.CdNm;
        //                        cat.OurCd = ItmCat.OurCd;
        //                        newModelXml.Add(cat);
        //                    }
        //                }

        //            if (task.VatXml != null)
        //                foreach (VATXml vatXml in task.VatXml)
        //                {
        //                    if (vatXml != null)
        //                    {
        //                        double CdNo1 = Convert.ToInt64(vatXml.VAT);
        //                        VATXml cat = new VATXml();
        //                        CdMasXml ItmCat = ValidateAndInsertCdMas(EnvironmentName, "Vat" + vatXml.VAT, "Vat " + vatXml.VAT + " %", "ItmTaxTyp1", CKy, UsrKy, CdNo1);
        //                        cat.CdKy = ItmCat.CdKy;
        //                        cat.Code = ItmCat.Code;
        //                        cat.CdNm = ItmCat.CdNm;
        //                        cat.OurCd = ItmCat.OurCd;
        //                        cat.VAT = vatXml.VAT;
        //                        newVatXml.Add(cat);
        //                    }
        //                }
        //            int LiNo = 1;

        //            if (task.IMItmMasXml != null)
        //                foreach (IMItmMasXml imitmmasXml in task.IMItmMasXml)
        //                {
        //                    int UnitKy = 1;
        //                    int ItmTypKy = 1;

        //                    int ItmCat1Ky = 1;
        //                    int ItmCat2Ky = 1;
        //                    int ItmCat3Ky = 1;
        //                    int ItmCat4Ky = 1;
        //                    int ItmCat5Ky = 1;
        //                    int ItmCat6Ky = 1;
        //                    int ItmCat7Ky = 1;
        //                    int ItmCat8Ky = 1;
        //                    int ItmCat9Ky = 1;
        //                    int ItmCat10Ky = 1;
        //                    int ItmCat11Ky = 1;
        //                    int ItmCat12Ky = 1;

        //                    int BrandKy = 1;
        //                    int ModelKy = 1;
        //                    int LocKy = 1;
        //                    int ItmTaxCatKy = 1;
        //                    long TrnTypKy = 0;
        //                    int PrjKy = 1;

        //                    if (imitmmasXml != null)
        //                    {
        //                        if (imitmmasXml.Unit != null)
        //                            UnitKy = newUnitXml.Count == 0 ? 1 : newUnitXml.Where(o => o.Unit.ToUpper() == imitmmasXml.Unit.ToUpper()).FirstOrDefault().UnitKy;
        //                        if (imitmmasXml.ItemType != null)
        //                            ItmTypKy = newItmTypXml.Count == 0 ? 1 : newItmTypXml.Where(o => o.ItemType.ToUpper() == imitmmasXml.ItemType.ToUpper()).FirstOrDefault().CdKy;

        //                        if (imitmmasXml.ItemCat1 != null)
        //                            ItmCat1Ky = newItmCat1Xml.Count == 0 ? 1 : newItmCat1Xml.Where(o => o.ItemCat1.ToUpper() == imitmmasXml.ItemCat1.ToUpper()).FirstOrDefault().CdKy;
        //                        if (imitmmasXml.ItemCat2 != null)
        //                            ItmCat2Ky = newItmCat2Xml.Count == 0 ? 1 : newItmCat2Xml.Where(o => o.ItemCat2.ToUpper() == imitmmasXml.ItemCat2.ToUpper()).FirstOrDefault().CdKy;
        //                        if (imitmmasXml.ItemCat3 != null)
        //                            ItmCat3Ky = newItmCat3Xml.Count == 0 ? 1 : newItmCat3Xml.Where(o => o.ItemCat3.ToUpper() == imitmmasXml.ItemCat3.ToUpper()).FirstOrDefault().CdKy;
        //                        if (imitmmasXml.ItemCat4 != null)
        //                            ItmCat4Ky = newItmCat4Xml.Count == 0 ? 1 : newItmCat4Xml.Where(o => o.ItemCat4.ToUpper() == imitmmasXml.ItemCat4.ToUpper()).FirstOrDefault().CdKy;
        //                        if (imitmmasXml.ItemCat5 != null)
        //                            ItmCat5Ky = newItmCat5Xml.Count == 0 ? 1 : newItmCat5Xml.Where(o => o.ItemCat5.ToUpper() == imitmmasXml.ItemCat5.ToUpper()).FirstOrDefault().CdKy;
        //                        if (imitmmasXml.ItemCat6 != null)
        //                            ItmCat6Ky = newItmCat6Xml.Count == 0 ? 1 : newItmCat6Xml.Where(o => o.ItemCat6.ToUpper() == imitmmasXml.ItemCat6.ToUpper()).FirstOrDefault().CdKy;
        //                        if (imitmmasXml.ItemCat7 != null)
        //                            ItmCat7Ky = newItmCat7Xml.Count == 0 ? 1 : newItmCat7Xml.Where(o => o.ItemCat7.ToUpper() == imitmmasXml.ItemCat7.ToUpper()).FirstOrDefault().CdKy;
        //                        if (imitmmasXml.ItemCat8 != null)
        //                            ItmCat8Ky = newItmCat8Xml.Count == 0 ? 1 : newItmCat8Xml.Where(o => o.ItemCat8.ToUpper() == imitmmasXml.ItemCat8.ToUpper()).FirstOrDefault().CdKy;
        //                        if (imitmmasXml.ItemCat9 != null)
        //                            ItmCat9Ky = newItmCat9Xml.Count == 0 ? 1 : newItmCat9Xml.Where(o => o.ItemCat9.ToUpper() == imitmmasXml.ItemCat9.ToUpper()).FirstOrDefault().CdKy;
        //                        if (imitmmasXml.ItemCat10 != null)
        //                            ItmCat10Ky = newItmCat10Xml.Count == 0 ? 1 : newItmCat10Xml.Where(o => o.ItemCat10.ToUpper() == imitmmasXml.ItemCat10.ToUpper()).FirstOrDefault().CdKy;
        //                        if (imitmmasXml.ItemCat11 != null)
        //                            ItmCat11Ky = newItmCat11Xml.Count == 0 ? 1 : newItmCat11Xml.Where(o => o.ItemCat11.ToUpper() == imitmmasXml.ItemCat11.ToUpper()).FirstOrDefault().CdKy;
        //                        if (imitmmasXml.ItemCat12 != null)
        //                            ItmCat12Ky = newItmCat12Xml.Count == 0 ? 1 : newItmCat12Xml.Where(o => o.ItemCat12.ToUpper() == imitmmasXml.ItemCat12.ToUpper()).FirstOrDefault().CdKy;

        //                        if (imitmmasXml.Brand != null)
        //                            BrandKy = newBrandXml.Count == 0 ? 1 : newBrandXml.Where(o => o.Brand.ToUpper() == imitmmasXml.Brand.ToUpper()).FirstOrDefault().CdKy;
        //                        if (imitmmasXml.Model != null)
        //                            try
        //                            {


        //                                ModelKy = newModelXml.Count == 0 ? 1 : newModelXml.Where(o => o.Model.ToUpper() == imitmmasXml.Model.ToUpper()).FirstOrDefault().CdKy;
        //                                //ModelKy = 1;// newModelXml.Count == 0 ? 1 : newModelXml.Where(o => o.Model.ToUpper() == imitmmasXml.Model.ToUpper()).FirstOrDefault().CdKy;
        //                            }
        //                            catch (Exception)
        //                            {
        //                                ModelKy = 1;

        //                            }
        //                        if (imitmmasXml.Location != null)
        //                            LocKy = newLocationXml.Count == 0 ? 1 : newLocationXml.Where(o => o.Location.ToUpper() == imitmmasXml.Location.ToUpper()).FirstOrDefault().CdKy;
        //                        if (imitmmasXml.Vat != null)
        //                            ItmTaxCatKy = newVatXml.Count == 0 ? 1 : newVatXml.Where(o => o.VAT.ToUpper() == imitmmasXml.Vat.ToUpper()).FirstOrDefault().CdKy;

        //                        ItmMasXml itm = ValidateAndInsertItmMas(EnvironmentName, imitmmasXml.ItmCd, imitmmasXml.ItemType, imitmmasXml.ItmNm, CKy, UsrKy, ItmTypKy,
        //     BrandKy, ModelKy, ItmCat1Ky, ItmCat2Ky, ItmCat3Ky, ItmCat4Ky, ItmCat5Ky, ItmCat6Ky, ItmCat7Ky, ItmCat8Ky, ItmCat9Ky, ItmCat10Ky, ItmCat11Ky, ItmCat12Ky,
        //     UnitKy, imitmmasXml.ReOrderLevel, imitmmasXml.ReOrderQty, imitmmasXml.Active, imitmmasXml.isAgeVarification, imitmmasXml.isAlwTrnRateChange);
        //                        newItmMasXml.Add(itm);

        //                        if (imitmmasXml.EAN != null)
        //                        {
        //                            ItmEANXml ean = ValidateAndInsertItmMasEAN(EnvironmentName, itm.ItmKy, imitmmasXml.EAN, CKy, UsrKy);
        //                            newItmEANXml.Add(ean);
        //                        }

        //                        //if (imitmmasXml.EftvDt == null)
        //                        //    imitmmasXml.EftvDt = DateTime.Today.Date.ToString();

        //                        if (imitmmasXml.SalesPrice != null || imitmmasXml.CostPrice != null)
        //                        {
        //                            ItmRateXml rate = ValidateAndInsertItmRate(EnvironmentName, itm.ItmKy, imitmmasXml.SalesPrice, imitmmasXml.CostPrice, LocKy, imitmmasXml.EftvDt, CKy, UsrKy);
        //                            newItmRateXml.Add(rate);
        //                        }

        //                        if (imitmmasXml.Vat != null)
        //                        {
        //                            ItmTaxXml tax = ValidateAndInsertItmTax(EnvironmentName, itm.ItmKy, ItmTypKy, Convert.ToInt64(imitmmasXml.Vat), ItmTaxCatKy, imitmmasXml.EftvDt, CKy, UsrKy);
        //                            newItmTaxXml.Add(tax);
        //                        }

        //                        if (imitmmasXml.Stock > 0)
        //                            ValidateAndInsertItmTrn(EnvironmentName, TrnTypKy, itm.ItmKy, PrjKy, imitmmasXml.Stock, LocKy, UnitKy, imitmmasXml.EftvDt, LiNo, CKy, UsrKy);


        //                        LiNo++;
        //                    }

        //                }

        //            if (task.SerNoXml != null)
        //                foreach (SerNoXml serNoXml in task.SerNoXml)
        //                {
        //                    if (serNoXml != null)
        //                    {
        //                        if (serNoXml.ItmCd != null && serNoXml.SerNo != null)
        //                        {
        //                            int ItmKy = newItmMasXml == null ? 1 : newItmMasXml.Where(o => o.ItmCd.ToUpper() == serNoXml.ItmCd.ToUpper()).FirstOrDefault().ItmKy;

        //                            SerNoXml unt = ValidateAndInsertSerNo(EnvironmentName, ItmKy, serNoXml.SerNo, serNoXml.EngineNo, serNoXml.CusSerNo, CKy, UsrKy);
        //                            newSerNoXml.Add(unt);
        //                        }
        //                    }
        //                }



        //        }
        //        catch (Exception ex)
        //        {
        //            throw new Exception(ex.Message.ToString());
        //        }
        //    }
        //    //else
        //    //{
        //    //    list = new System.Collections.Generic.List<SelectProjectScheduleDetails>();
        //    //}

        //    return true;
        //}

        //internal bool AccMasExcelImportJsonData(string EnvironmentName, string MSImportStringData, int CKy, int UsrKy)
        //{
        //    // -- Define New List

        //    List<AccCat1Xml> newAccCat1Xml = new List<AccCat1Xml>();
        //    List<AccCat2Xml> newAccCat2Xml = new List<AccCat2Xml>();
        //    List<AccMas> newAccMasXml = new List<AccMas>();
        //    List<AccTypeXml> newAccTypeXml = new List<AccTypeXml>();
        //    List<BankXml> newBankXml = new List<BankXml>();
        //    List<BranchXml> newBranchXml = new List<BranchXml>();
        //    List<CurrencyXml> newCurrencyXml = new List<CurrencyXml>();
        //    List<BusinessUnitXml> newBusinessUnitXml = new List<BusinessUnitXml>();
        //    List<TrnTypeXml> newTrnTypeXml = new List<TrnTypeXml>();
        //    List<PaymentModeXml> newPaymentModeXml = new List<PaymentModeXml>();
        //    List<ProjectXml> newProjectXml = new List<ProjectXml>();


        //    // -- Define New List

        //    List<AccMasExcel_ImportModel> listNew = new List<AccMasExcel_ImportModel>();

        //    if (MSImportStringData != "[]" || MSImportStringData != "[null]" || MSImportStringData != "")
        //    {
        //        try
        //        {
        //            AccMasExcel_ImportModel task = new JavaScriptSerializer().Deserialize<AccMasExcel_ImportModel>(MSImportStringData);
        //            ItmMasExcel_ImportModel task1 = new JavaScriptSerializer().Deserialize<ItmMasExcel_ImportModel>(MSImportStringData);



        //            if (task.AccCat1Xml != null)
        //                foreach (AccCat1Xml accCat1Xml in task.AccCat1Xml)
        //                {
        //                    if (accCat1Xml != null)
        //                    {
        //                        AccCat1Xml cat = new AccCat1Xml();
        //                        CdMasXml ItmCat = ValidateAndInsertCdMas(EnvironmentName, accCat1Xml.AccCat1, accCat1Xml.AccCat1, "AccCat1", CKy, UsrKy);
        //                        cat.CdKy = ItmCat.CdKy;
        //                        cat.AccCat1 = ItmCat.Code;

        //                        newAccCat1Xml.Add(cat);
        //                    }
        //                }

        //            if (task.AccCat2Xml != null)
        //                foreach (AccCat2Xml accCat2Xml in task.AccCat2Xml)
        //                {
        //                    if (accCat2Xml != null)
        //                    {
        //                        AccCat2Xml cat = new AccCat2Xml();
        //                        CdMasXml ItmCat = ValidateAndInsertCdMas(EnvironmentName, accCat2Xml.AccCat2, accCat2Xml.AccCat2, "AccCat2", CKy, UsrKy);
        //                        cat.CdKy = ItmCat.CdKy;
        //                        cat.AccCat2 = ItmCat.Code;

        //                        newAccCat2Xml.Add(cat);
        //                    }
        //                }


        //            if (task.AccTypeXml != null)
        //                foreach (AccTypeXml accTypeXml in task.AccTypeXml)
        //                {
        //                    if (accTypeXml != null)
        //                    {
        //                        AccTypeXml cat = new AccTypeXml();
        //                        CdMasXml ItmCat = ValidateAndInsertCdMas(EnvironmentName, accTypeXml.AccType, accTypeXml.AccType, "AccTyp", CKy, UsrKy);
        //                        cat.CdKy = ItmCat.CdKy;
        //                        cat.AccType = ItmCat.Code;

        //                        newAccTypeXml.Add(cat);
        //                    }
        //                }

        //            if (task.TrnTypeXml != null)
        //                foreach (TrnTypeXml trnTypeXml in task.TrnTypeXml)
        //                {
        //                    if (trnTypeXml != null)
        //                    {
        //                        TrnTypeXml cat = new TrnTypeXml();
        //                        CdMasXml ItmCat = ValidateAndInsertCdMas(EnvironmentName, trnTypeXml.TrnType, trnTypeXml.TrnType, "TrnTyp", CKy, UsrKy);
        //                        cat.CdKy = ItmCat.CdKy;
        //                        cat.TrnType = ItmCat.Code;

        //                        newTrnTypeXml.Add(cat);
        //                    }
        //                }

        //            if (task.PaymentModeXml != null)
        //                foreach (PaymentModeXml paymentModeXml in task.PaymentModeXml)
        //                {
        //                    if (paymentModeXml != null)
        //                    {
        //                        PaymentModeXml cat = new PaymentModeXml();
        //                        CdMasXml ItmCat = ValidateAndInsertCdMas(EnvironmentName, paymentModeXml.PaymentMode, paymentModeXml.PaymentMode, "PmtMode", CKy, UsrKy);
        //                        cat.CdKy = ItmCat.CdKy;
        //                        cat.PaymentMode = ItmCat.Code;

        //                        newPaymentModeXml.Add(cat);
        //                    }
        //                }

        //            if (task.BusinessUnitXml != null)
        //                foreach (BusinessUnitXml businessUnitXml in task.BusinessUnitXml)
        //                {
        //                    if (businessUnitXml != null)
        //                    {
        //                        BusinessUnitXml cat = new BusinessUnitXml();
        //                        CdMasXml ItmCat = ValidateAndInsertCdMas(EnvironmentName, businessUnitXml.BusinessUnit, businessUnitXml.BusinessUnit, "BU", CKy, UsrKy);
        //                        cat.CdKy = ItmCat.CdKy;
        //                        cat.BusinessUnit = ItmCat.Code;

        //                        newBusinessUnitXml.Add(cat);
        //                    }
        //                }

        //            if (task.CurrencyXml != null)
        //                foreach (CurrencyXml currencyXml in task.CurrencyXml)
        //                {
        //                    if (currencyXml != null)
        //                    {
        //                        CurrencyXml cat = new CurrencyXml();
        //                        CdMasXml ItmCat = ValidateAndInsertCdMas(EnvironmentName, currencyXml.Currency, currencyXml.Currency, "Crn", CKy, UsrKy);
        //                        cat.CdKy = ItmCat.CdKy;
        //                        cat.Currency = ItmCat.Code;

        //                        newCurrencyXml.Add(cat);
        //                    }
        //                }

        //            if (task.ProjectXml != null)
        //                foreach (ProjectXml projectXml in task.ProjectXml)
        //                {
        //                    if (projectXml != null)
        //                    {
        //                        ProjectXml cat = new ProjectXml();
        //                        ProjectXml ItmCat = ValidateAndInsertPrjHdr(EnvironmentName, projectXml.ProjectId, projectXml.ProjectId, CKy, UsrKy);
        //                        cat.PrjKy = ItmCat.PrjKy;
        //                        cat.ProjectId = ItmCat.ProjectId;

        //                        newProjectXml.Add(cat);
        //                    }
        //                }


        //            if (task.BankXml != null)
        //                foreach (BankXml bankXml in task.BankXml)
        //                {
        //                    if (bankXml != null)
        //                    {
        //                        BankXml bnk = ValidateAndInsertBnkMas(EnvironmentName, bankXml.Bank, CKy, UsrKy);

        //                        newBankXml.Add(bnk);
        //                    }
        //                }

        //            int LiNo = 1;
        //            long ContraAcctrnKy = 1;
        //            long TrnKy = 1;
        //            string DocNo = "";

        //            if (task.AccMasXml != null)
        //                foreach (AccMasXml accMasXml in task.AccMasXml)
        //                {
        //                    int BnkKy = 1;
        //                    int CrnKy = 1;
        //                    int BUKy = 1;
        //                    int AccTypKy = 1;
        //                    int AccCat1Ky = 1;
        //                    int AccCat2Ky = 1;
        //                    long TrnTypKy = 1;
        //                    int PmtModeKy = 1;
        //                    int PrjKy = 1;


        //                    if (accMasXml != null)
        //                    {
        //                        if (accMasXml.Bank != null)
        //                            BnkKy = newBankXml.Count == 0 ? 1 : newBankXml.Where(o => o.Bank.ToUpper() == accMasXml.Bank.ToUpper()).FirstOrDefault().BnkKy;
        //                        if (accMasXml.Currency != null)
        //                            CrnKy = newCurrencyXml.Count == 0 ? 1 : newCurrencyXml.Where(o => o.Currency.ToUpper() == accMasXml.Currency.ToUpper()).FirstOrDefault().CdKy;
        //                        if (accMasXml.BusinessUnit != null)
        //                            BUKy = newBusinessUnitXml.Count == 0 ? 1 : newBusinessUnitXml.Where(o => o.BusinessUnit.ToUpper() == accMasXml.BusinessUnit.ToUpper()).FirstOrDefault().CdKy;
        //                        if (accMasXml.AccType != null)
        //                            AccTypKy = newAccTypeXml.Count == 0 ? 1 : newAccTypeXml.Where(o => o.AccType.ToUpper() == accMasXml.AccType.ToUpper()).FirstOrDefault().CdKy;
        //                        if (accMasXml.AccCat1 != null)
        //                            AccCat1Ky = newAccCat1Xml.Count == 0 ? 1 : newAccCat1Xml.Where(o => o.AccCat1.ToUpper() == accMasXml.AccCat1.ToUpper()).FirstOrDefault().CdKy;
        //                        if (accMasXml.AccCat2 != null)
        //                            AccCat2Ky = newAccCat2Xml.Count == 0 ? 1 : newAccCat2Xml.Where(o => o.AccCat2.ToUpper() == accMasXml.AccCat2.ToUpper()).FirstOrDefault().CdKy;
        //                        if (accMasXml.TrnType != null)
        //                            TrnTypKy = newTrnTypeXml.Count == 0 ? 1 : newTrnTypeXml.Where(o => o.TrnType.ToUpper() == accMasXml.TrnType.ToUpper()).FirstOrDefault().CdKy;
        //                        if (accMasXml.PaymentMode != null)
        //                            PmtModeKy = newPaymentModeXml.Count == 0 ? 1 : newPaymentModeXml.Where(o => o.PaymentMode.ToUpper() == accMasXml.PaymentMode.ToUpper()).FirstOrDefault().CdKy;
        //                        if (accMasXml.ProjectId != null)
        //                            PrjKy = newProjectXml.Count == 0 ? 1 : newProjectXml.Where(o => o.ProjectId.ToUpper() == accMasXml.ProjectId.ToUpper()).FirstOrDefault().PrjKy;


        //                        BranchXml brn = new BranchXml();
        //                        AccMas acc = new AccMas();
        //                        AccTrn Trn = new AccTrn();

        //                        if (task.BranchXml != null)
        //                            foreach (BranchXml branchXml in task.BranchXml)
        //                            {
        //                                if (branchXml != null && accMasXml.Branch != null)
        //                                {

        //                                    brn = ValidateAndInsertBrnMas(EnvironmentName, BnkKy, accMasXml.Branch, CKy, UsrKy);

        //                                    newBranchXml.Add(brn);
        //                                    break;
        //                                }
        //                            }

        //                        if (accMasXml.BankAccNo != null || accMasXml.VATNo != null || accMasXml.SVATNo != null || accMasXml.AccCode != null || accMasXml.AccName != null)
        //                        {
        //                            acc = ValidateAndInsertAccMas(EnvironmentName, accMasXml.AccCode, accMasXml.AccName, AccTypKy, CrnKy, BUKy, AccCat1Ky, AccCat2Ky, BnkKy, brn.BrnKy, accMasXml.BankAccNo, accMasXml.VATNo, accMasXml.SVATNo, CKy, UsrKy);
        //                            newAccMasXml.Add(acc);
        //                        }

        //                        if (accMasXml.MobileBusiness != null || accMasXml.MobilePersonal != null || accMasXml.EmailBusiness != null || accMasXml.EmailPersonal != null)
        //                        {
        //                            ValidateAndInsertAdrMasCd(EnvironmentName, acc.AdrKy, BnkKy, brn.BrnKy, accMasXml.MobileBusiness, accMasXml.MobilePersonal, accMasXml.EmailBusiness, accMasXml.EmailPersonal, CKy, UsrKy);
        //                        }

        //                        if (accMasXml.CrLimit != null || accMasXml.CrPeriod != null)
        //                        {
        //                            ValidateAndInsertAccMasCdDt(EnvironmentName, acc.AccKy, accMasXml.CrLimit, accMasXml.CrPeriod, CKy, UsrKy);
        //                        }

        //                        if (accMasXml.Street != null || accMasXml.City != null)
        //                        {
        //                            ValidateAndInsertAdrMasDet(EnvironmentName, acc.AdrKy, accMasXml.Street, accMasXml.City, CKy, UsrKy);
        //                        }

        //                        if (accMasXml.ClsBal != null || accMasXml.DocNo != null)
        //                        {
        //                            //if (accMasXml.DocNo == DocNo && accMasXml.AccType == "Bank" && accMasXml.Description == null)
        //                            //{
        //                            //    LiNo = 1;
        //                            //    Trn = ValidateAndInsertAccTrn(EnvironmentName, TrnKy, ContraAcctrnKy, TrnTypKy, PmtModeKy, PrjKy, accMasXml.ChequeDate, accMasXml.ChequeNo, accMasXml.Description,
        //                            //        acc.AccKy, acc.AdrKy, accMasXml.ClsBal, accMasXml.DocNo, BUKy, accMasXml.Date, LiNo, CKy, UsrKy);

        //                            //}
        //                            //else 
        //                            if (accMasXml.DocNo == DocNo)
        //                            {
        //                                //LiNo = 1;
        //                                Trn = ValidateAndInsertAccTrn(EnvironmentName, TrnKy, ContraAcctrnKy, TrnTypKy, PmtModeKy, PrjKy, accMasXml.ChequeDate, accMasXml.ChequeNo, accMasXml.Description,
        //                                    acc.AccKy, acc.AdrKy, accMasXml.ClsBal, accMasXml.DocNo, BUKy, accMasXml.Date, LiNo, CKy, UsrKy);

        //                            }
        //                            else
        //                            {
        //                                LiNo = 1;
        //                                Trn = ValidateAndInsertAccTrn(EnvironmentName, 1, 1, TrnTypKy, PmtModeKy, PrjKy, accMasXml.ChequeDate, accMasXml.ChequeNo, accMasXml.Description,
        //                                    acc.AccKy, acc.AdrKy, accMasXml.ClsBal, accMasXml.DocNo, BUKy, accMasXml.Date, LiNo, CKy, UsrKy);

        //                                TrnKy = Trn.TrnKy;
        //                                ContraAcctrnKy = Trn.AccTrnKy;
        //                                DocNo = accMasXml.DocNo;

        //                            }
        //                        }

        //                        LiNo++;
        //                    }
        //                }

        //        }
        //        catch (Exception ex)
        //        {
        //            throw new Exception(ex.Message.ToString());
        //        }
        //    }
        //    //else
        //    //{
        //    //    list = new System.Collections.Generic.List<SelectProjectScheduleDetails>();
        //    //}

        //    return true;
        //}



        //internal bool ItmTrnImportJsonData(string EnvironmentName, string MSImportStringData, int CKy, int UsrKy)
        //{
        //    // -- Define New List
        //    List<UnitXml> newUnitXml = new List<UnitXml>();
        //    List<ItmTrn> newItmTrnXml = new List<ItmTrn>();
        //    List<CurrencyXml> newCurrencyXml = new List<CurrencyXml>();
        //    List<BusinessUnitXml> newBusinessUnitXml = new List<BusinessUnitXml>();
        //    List<TrnTypeXml> newTrnTypeXml = new List<TrnTypeXml>();
        //    List<ProjectXml> newProjectXml = new List<ProjectXml>();
        //    List<LocationXml> newLocationXml = new List<LocationXml>();
        //    List<ItmMasXml> newItmMasXml = new List<ItmMasXml>();
        //    List<AccMas> newAccMasXml = new List<AccMas>();

        //    // -- Define New List

        //    List<ItmTrn_ImportModel> listNew = new List<ItmTrn_ImportModel>();

        //    if (MSImportStringData != "[]" || MSImportStringData != "[null]" || MSImportStringData != "")
        //    {
        //        try
        //        {
        //            ItmTrn_ImportModel task = new JavaScriptSerializer().Deserialize<ItmTrn_ImportModel>(MSImportStringData);
        //            ItmMasExcel_ImportModel task2 = new JavaScriptSerializer().Deserialize<ItmMasExcel_ImportModel>(MSImportStringData);
        //            PMExcel_ImportModel task1 = new JavaScriptSerializer().Deserialize<PMExcel_ImportModel>(MSImportStringData);
        //            AccMasExcel_ImportModel task3 = new JavaScriptSerializer().Deserialize<AccMasExcel_ImportModel>(MSImportStringData);


        //            if (task1.UnitXml != null)
        //                foreach (UnitXml unitXml in task1.UnitXml)
        //                {
        //                    if (unitXml != null)
        //                    {
        //                        UnitXml unt = ValidateAndInsertUnitMas(EnvironmentName, unitXml.Unit, CKy, UsrKy);
        //                        newUnitXml.Add(unt);
        //                    }
        //                }

        //            if (task2.IMItmMasXml != null)
        //                foreach (IMItmMasXml imitmmasXml in task2.IMItmMasXml)
        //                {
        //                    if (imitmmasXml != null)
        //                    {
        //                        ItmMasXml itm = ValidateAndInsertItmMas(EnvironmentName, imitmmasXml.ItmCd, imitmmasXml.ItemType, "", CKy, UsrKy);
        //                        newItmMasXml.Add(itm);
        //                    }
        //                }

        //            if (task3.AccMasXml != null)
        //                foreach (AccMasXml accMasXml in task3.AccMasXml)
        //                {
        //                    if (accMasXml != null)
        //                    {
        //                        AccMas acc = ValidateAndInsertAccMas(EnvironmentName, accMasXml.AccCode, accMasXml.AccCode, 1, 1, 1, 1, 1, 1, 1, "", "", "", CKy, UsrKy);
        //                        newAccMasXml.Add(acc);
        //                    }
        //                }


        //            if (task.TrnTypeXml != null)
        //                foreach (TrnTypeXml trnTypeXml in task.TrnTypeXml)
        //                {
        //                    if (trnTypeXml != null)
        //                    {
        //                        TrnTypeXml cat = new TrnTypeXml();
        //                        CdMasXml ItmCat = ValidateAndInsertCdMas(EnvironmentName, trnTypeXml.TrnType, trnTypeXml.TrnType, "TrnTyp", CKy, UsrKy);
        //                        cat.CdKy = ItmCat.CdKy;
        //                        cat.TrnType = ItmCat.Code;

        //                        newTrnTypeXml.Add(cat);
        //                    }
        //                }


        //            if (task.BusinessUnitXml != null)
        //                foreach (BusinessUnitXml businessUnitXml in task.BusinessUnitXml)
        //                {
        //                    if (businessUnitXml != null)
        //                    {
        //                        BusinessUnitXml cat = new BusinessUnitXml();
        //                        CdMasXml ItmCat = ValidateAndInsertCdMas(EnvironmentName, businessUnitXml.BusinessUnit, businessUnitXml.BusinessUnit, "BU", CKy, UsrKy);
        //                        cat.CdKy = ItmCat.CdKy;
        //                        cat.BusinessUnit = ItmCat.Code;

        //                        newBusinessUnitXml.Add(cat);
        //                    }
        //                }

        //            if (task.LocationXml != null)
        //                foreach (LocationXml locXml in task.LocationXml)
        //                {
        //                    if (locXml != null)
        //                    {
        //                        LocationXml cat = new LocationXml();
        //                        CdMasXml ItmCat = ValidateAndInsertCdMas(EnvironmentName, locXml.Location, locXml.Location, "loc", CKy, UsrKy);
        //                        cat.CdKy = ItmCat.CdKy;
        //                        cat.Location = ItmCat.Code;

        //                        newLocationXml.Add(cat);
        //                    }
        //                }

        //            if (task.CurrencyXml != null)
        //                foreach (CurrencyXml currencyXml in task.CurrencyXml)
        //                {
        //                    if (currencyXml != null)
        //                    {
        //                        CurrencyXml cat = new CurrencyXml();
        //                        CdMasXml ItmCat = ValidateAndInsertCdMas(EnvironmentName, currencyXml.Currency, currencyXml.Currency, "Crn", CKy, UsrKy);
        //                        cat.CdKy = ItmCat.CdKy;
        //                        cat.Currency = ItmCat.Code;

        //                        newCurrencyXml.Add(cat);
        //                    }
        //                }

        //            if (task.ProjectXml != null)
        //                foreach (ProjectXml projectXml in task.ProjectXml)
        //                {
        //                    if (projectXml != null)
        //                    {
        //                        ProjectXml cat = new ProjectXml();
        //                        ProjectXml ItmCat = ValidateAndInsertPrjHdr(EnvironmentName, projectXml.ProjectId, projectXml.ProjectId, CKy, UsrKy);
        //                        cat.PrjKy = ItmCat.PrjKy;
        //                        cat.ProjectId = ItmCat.ProjectId;

        //                        newProjectXml.Add(cat);
        //                    }
        //                }


        //            int LiNo = 1;

        //            if (task.ItmTrnXml != null)
        //                foreach (ItmTrnXml itmTrnXml in task.ItmTrnXml)
        //                {
        //                    int CrnKy = 1;
        //                    int BUKy = 1;
        //                    long TrnTypKy = 1;
        //                    int PrjKy = 1;
        //                    int UnitKy = 1;
        //                    int LocKy = 1;
        //                    int ItmKy = 1;
        //                    int CusAdrKy = 1;
        //                    int CusAccKy = 1;
        //                    int SupAccKy = 1;
        //                    int ContraAccObjKy = 1;//115423;//115520;//101182; 
        //                    int AccObjKy = 1;//115403;//115500;//92754; 

        //                    if (itmTrnXml != null)
        //                    {
        //                        if (itmTrnXml.Unit != null)
        //                            UnitKy = newUnitXml.Count == 0 ? 1 : newUnitXml.Where(o => o.Unit.ToUpper() == itmTrnXml.Unit.ToUpper()).FirstOrDefault().UnitKy;
        //                        if (itmTrnXml.Currency != null)
        //                            CrnKy = newCurrencyXml.Count == 0 ? 1 : newCurrencyXml.Where(o => o.Currency.ToUpper() == itmTrnXml.Currency.ToUpper()).FirstOrDefault().CdKy;
        //                        if (itmTrnXml.BusinessUnit != null)
        //                            BUKy = newBusinessUnitXml.Count == 0 ? 1 : newBusinessUnitXml.Where(o => o.BusinessUnit.ToUpper() == itmTrnXml.BusinessUnit.ToUpper()).FirstOrDefault().CdKy;
        //                        if (itmTrnXml.TrnType != null)
        //                            TrnTypKy = newTrnTypeXml.Count == 0 ? 1 : newTrnTypeXml.Where(o => o.TrnType.ToUpper() == itmTrnXml.TrnType.ToUpper()).FirstOrDefault().CdKy;
        //                        if (itmTrnXml.Location != null)
        //                            LocKy = newLocationXml.Count == 0 ? 1 : newLocationXml.Where(o => o.Location.ToUpper() == itmTrnXml.Location.ToUpper()).FirstOrDefault().CdKy;
        //                        if (itmTrnXml.ProjectId != null)
        //                            PrjKy = newProjectXml.Count == 0 ? 1 : newProjectXml.Where(o => o.ProjectId.ToUpper() == itmTrnXml.ProjectId.ToUpper()).FirstOrDefault().PrjKy;
        //                        if (itmTrnXml.ItmCd != null)
        //                            ItmKy = newItmMasXml.Count == 0 ? 1 : newItmMasXml.Where(o => o.ItmCd.ToUpper() == itmTrnXml.ItmCd.ToUpper()).FirstOrDefault().ItmKy;
        //                        if (itmTrnXml.CusAcCode != null)
        //                            CusAdrKy = newAccMasXml.Count == 0 ? 1 : newAccMasXml.Where(o => o.AccCd.ToUpper() == itmTrnXml.CusAcCode.ToUpper()).FirstOrDefault().AdrKy;
        //                        if (itmTrnXml.CusAcCode != null)
        //                            CusAccKy = newAccMasXml.Count == 0 ? 1 : newAccMasXml.Where(o => o.AccCd.ToUpper() == itmTrnXml.CusAcCode.ToUpper()).FirstOrDefault().AccKy;
        //                        if (itmTrnXml.SaleAcCode != null)
        //                            SupAccKy = newAccMasXml.Count == 0 ? 1 : newAccMasXml.Where(o => o.AccCd.ToUpper() == itmTrnXml.SaleAcCode.ToUpper()).FirstOrDefault().AccKy;


        //                        ItmTrn Trn = new ItmTrn();

        //                        if (itmTrnXml.ItmCd != null)
        //                            ValidateAndInsertItmTrn(EnvironmentName, TrnTypKy, ItmKy, PrjKy, itmTrnXml.Qty, LocKy, UnitKy, itmTrnXml.Date, LiNo, CKy, UsrKy, itmTrnXml.Rate, itmTrnXml.TaxPer, itmTrnXml.TaxAmt, CusAdrKy, CusAccKy, SupAccKy, ContraAccObjKy, AccObjKy, itmTrnXml.TrnType, itmTrnXml.DocNo, itmTrnXml.Description);


        //                        LiNo++;
        //                    }
        //                }

        //        }
        //        catch (Exception ex)
        //        {
        //            throw new Exception(ex.Message.ToString());
        //        }
        //    }

        //    return true;
        //}


        //internal bool EmpMasExcelImportJsonData(string EnvironmentName, string MSImportStringData, int CKy, int UsrKy)
        //{
        //    // -- Define New List


        //    List<EmpTypeXml> newEmpTypeXml = new List<EmpTypeXml>();
        //    List<TitleXml> newTitleXml = new List<TitleXml>();
        //    List<BloodGroupXml> newBloodGroupXml = new List<BloodGroupXml>();
        //    List<ReligionXml> newReligionXml = new List<ReligionXml>();
        //    List<GenderXml> newGenderXml = new List<GenderXml>();
        //    List<NationalityXml> newNationalityXml = new List<NationalityXml>();
        //    List<CountryXml> newCountryXml = new List<CountryXml>();
        //    List<DesignationXml> newDesignationXml = new List<DesignationXml>();
        //    List<ElectorateXml> newElectorateXml = new List<ElectorateXml>();
        //    List<ProvinceXml> newProvinceXml = new List<ProvinceXml>();
        //    List<EmpLocationXml> newEmpLocationXml = new List<EmpLocationXml>();
        //    List<DepartmentXml> newDepartmentXml = new List<DepartmentXml>();
        //    List<NatureofEmployementXml> newNatureofEmployementXml = new List<NatureofEmployementXml>();
        //    List<MARITAL_STATUSXml> newMARITAL_STATUSXml = new List<MARITAL_STATUSXml>();
        //    List<EmpGradeXml> newEmpGradeXml = new List<EmpGradeXml>();

        //    List<EmpMas> newEmpMas = new List<EmpMas>();
        //    List<AccMas> newAccMas = new List<AccMas>();



        //    // -- Define New List

        //    List<EmpMasExcel_ImportModel> listNew = new List<EmpMasExcel_ImportModel>();

        //    if (MSImportStringData != "[]" || MSImportStringData != "[null]" || MSImportStringData != "")
        //    {
        //        try
        //        {
        //            AccMasExcel_ImportModel task2 = new JavaScriptSerializer().Deserialize<AccMasExcel_ImportModel>(MSImportStringData);
        //            EmpMasExcel_ImportModel task = new JavaScriptSerializer().Deserialize<EmpMasExcel_ImportModel>(MSImportStringData);



        //            if (task.EmpTypeXml != null)
        //                foreach (EmpTypeXml empTypeXml in task.EmpTypeXml)
        //                {

        //                    if (empTypeXml != null)
        //                    {
        //                        EmpTypeXml cat = new EmpTypeXml();
        //                        CdMasXml ItmCat = ValidateAndInsertCdMas(EnvironmentName, empTypeXml.EmpType, empTypeXml.EmpType, "emptyp", CKy, UsrKy);
        //                        cat.CdKy = ItmCat.CdKy;
        //                        cat.EmpType = ItmCat.Code;

        //                        newEmpTypeXml.Add(cat);
        //                    }
        //                }

        //            if (task.TitleXml != null)
        //                foreach (TitleXml titleXml in task.TitleXml)
        //                {
        //                    if (titleXml != null)
        //                    {
        //                        TitleXml cat = new TitleXml();
        //                        CdMasXml ItmCat = ValidateAndInsertCdMas(EnvironmentName, titleXml.Title, titleXml.Title, "title", CKy, UsrKy);
        //                        cat.CdKy = ItmCat.CdKy;
        //                        cat.Title = ItmCat.Code;

        //                        newTitleXml.Add(cat);
        //                    }
        //                }

        //            if (task.BloodGroupXml != null)
        //                foreach (BloodGroupXml bloodGroupXml in task.BloodGroupXml)
        //                {
        //                    if (bloodGroupXml != null)
        //                    {
        //                        BloodGroupXml cat = new BloodGroupXml();
        //                        CdMasXml ItmCat = ValidateAndInsertCdMas(EnvironmentName, bloodGroupXml.BloodGroup, bloodGroupXml.BloodGroup, "bloodgrp", CKy, UsrKy);
        //                        cat.CdKy = ItmCat.CdKy;
        //                        cat.BloodGroup = ItmCat.Code;

        //                        newBloodGroupXml.Add(cat);
        //                    }
        //                }

        //            if (task.ReligionXml != null)
        //                foreach (ReligionXml religionXml in task.ReligionXml)
        //                {
        //                    if (religionXml != null)
        //                    {
        //                        ReligionXml cat = new ReligionXml();
        //                        CdMasXml ItmCat = ValidateAndInsertCdMas(EnvironmentName, religionXml.Religion, religionXml.Religion, "Religion", CKy, UsrKy);
        //                        cat.CdKy = ItmCat.CdKy;
        //                        cat.Religion = ItmCat.Code;

        //                        newReligionXml.Add(cat);
        //                    }
        //                }

        //            if (task.GenderXml != null)
        //                foreach (GenderXml genderXml in task.GenderXml)
        //                {
        //                    if (genderXml != null)
        //                    {
        //                        GenderXml cat = new GenderXml();
        //                        CdMasXml ItmCat = ValidateAndInsertCdMas(EnvironmentName, genderXml.Gender, genderXml.Gender, "Gender", CKy, UsrKy);
        //                        cat.CdKy = ItmCat.CdKy;
        //                        cat.Gender = ItmCat.Code;

        //                        newGenderXml.Add(cat);
        //                    }
        //                }

        //            if (task.NationalityXml != null)
        //                foreach (NationalityXml nationalityXml in task.NationalityXml)
        //                {
        //                    if (nationalityXml != null)
        //                    {
        //                        NationalityXml cat = new NationalityXml();
        //                        CdMasXml ItmCat = ValidateAndInsertCdMas(EnvironmentName, nationalityXml.Nationality, nationalityXml.Nationality, "Nationality", CKy, UsrKy);
        //                        cat.CdKy = ItmCat.CdKy;
        //                        cat.Nationality = ItmCat.Code;

        //                        newNationalityXml.Add(cat);
        //                    }
        //                }

        //            if (task.CountryXml != null)
        //                foreach (CountryXml countryXml in task.CountryXml)
        //                {
        //                    if (countryXml != null)
        //                    {
        //                        CountryXml cat = new CountryXml();
        //                        CdMasXml ItmCat = ValidateAndInsertCdMas(EnvironmentName, countryXml.Country, countryXml.Country, "Country", CKy, UsrKy);
        //                        cat.CdKy = ItmCat.CdKy;
        //                        cat.Country = ItmCat.Code;

        //                        newCountryXml.Add(cat);
        //                    }
        //                }

        //            if (task.DesignationXml != null)
        //                foreach (DesignationXml designationXml in task.DesignationXml)
        //                {
        //                    if (designationXml != null)
        //                    {
        //                        DesignationXml cat = new DesignationXml();
        //                        CdMasXml ItmCat = ValidateAndInsertCdMas(EnvironmentName, designationXml.Designation, designationXml.Designation, "Desg", CKy, UsrKy);
        //                        cat.CdKy = ItmCat.CdKy;
        //                        cat.Designation = ItmCat.Code;

        //                        newDesignationXml.Add(cat);
        //                    }
        //                }

        //            if (task.ElectorateXml != null)
        //                foreach (ElectorateXml electorateXml in task.ElectorateXml)
        //                {
        //                    if (electorateXml != null)
        //                    {
        //                        ElectorateXml cat = new ElectorateXml();
        //                        CdMasXml ItmCat = ValidateAndInsertCdMas(EnvironmentName, electorateXml.Electorate, electorateXml.Electorate, "Electorate", CKy, UsrKy);
        //                        cat.CdKy = ItmCat.CdKy;
        //                        cat.Electorate = ItmCat.Code;

        //                        newElectorateXml.Add(cat);
        //                    }
        //                }

        //            if (task.ProvinceXml != null)
        //                foreach (ProvinceXml provinceXml in task.ProvinceXml)
        //                {
        //                    if (provinceXml != null)
        //                    {
        //                        ProvinceXml cat = new ProvinceXml();
        //                        CdMasXml ItmCat = ValidateAndInsertCdMas(EnvironmentName, provinceXml.Province, provinceXml.Province, "Province", CKy, UsrKy);
        //                        cat.CdKy = ItmCat.CdKy;
        //                        cat.Province = ItmCat.Code;

        //                        newProvinceXml.Add(cat);
        //                    }
        //                }

        //            if (task.EmpLocationXml != null)
        //                foreach (EmpLocationXml empLocationXml in task.EmpLocationXml)
        //                {
        //                    if (empLocationXml != null)
        //                    {
        //                        EmpLocationXml cat = new EmpLocationXml();
        //                        CdMasXml ItmCat = ValidateAndInsertCdMas(EnvironmentName, empLocationXml.Location, empLocationXml.Location, "loc", CKy, UsrKy);
        //                        cat.CdKy = ItmCat.CdKy;
        //                        cat.Location = ItmCat.Code;

        //                        newEmpLocationXml.Add(cat);
        //                    }
        //                }

        //            if (task.DepartmentXml != null)
        //                foreach (DepartmentXml departmentXml in task.DepartmentXml)
        //                {
        //                    if (departmentXml != null)
        //                    {
        //                        DepartmentXml cat = new DepartmentXml();
        //                        CdMasXml ItmCat = ValidateAndInsertCdMas(EnvironmentName, departmentXml.Department, departmentXml.Department, "Department", CKy, UsrKy);
        //                        cat.CdKy = ItmCat.CdKy;
        //                        cat.Department = ItmCat.Code;

        //                        newDepartmentXml.Add(cat);
        //                    }
        //                }

        //            if (task.DepartmentXml != null)
        //                foreach (DepartmentXml departmentXml in task.DepartmentXml)
        //                {
        //                    if (departmentXml != null)
        //                    {
        //                        //DepartmentXml cat = new DepartmentXml();
        //                        CdMasXml ItmCat = ValidateAndInsertCdMas(EnvironmentName, departmentXml.Department, departmentXml.Department, "BU", CKy, UsrKy);


        //                        //newDepartmentXml.Add(cat);
        //                    }
        //                }

        //            if (task.NatureofEmployementXml != null)
        //                foreach (NatureofEmployementXml natureofEmployementXml in task.NatureofEmployementXml)
        //                {
        //                    if (natureofEmployementXml != null)
        //                    {
        //                        NatureofEmployementXml cat = new NatureofEmployementXml();
        //                        CdMasXml ItmCat = ValidateAndInsertCdMas(EnvironmentName, natureofEmployementXml.NatureofEmployement, natureofEmployementXml.NatureofEmployement, "EmpSts", CKy, UsrKy);
        //                        cat.CdKy = ItmCat.CdKy;
        //                        cat.NatureofEmployement = ItmCat.Code;

        //                        newNatureofEmployementXml.Add(cat);
        //                    }
        //                }

        //            if (task.MARITAL_STATUSXml != null)
        //                foreach (MARITAL_STATUSXml mARITAL_STATUSXml in task.MARITAL_STATUSXml)
        //                {
        //                    if (mARITAL_STATUSXml != null)
        //                    {
        //                        MARITAL_STATUSXml cat = new MARITAL_STATUSXml();
        //                        CdMasXml ItmCat = ValidateAndInsertCdMas(EnvironmentName, mARITAL_STATUSXml.MARITAL_STATUS, mARITAL_STATUSXml.MARITAL_STATUS, "CvlSts", CKy, UsrKy);
        //                        cat.CdKy = ItmCat.CdKy;
        //                        cat.MARITAL_STATUS = ItmCat.Code;

        //                        newMARITAL_STATUSXml.Add(cat);
        //                    }
        //                }

        //            if (task.EmpGradeXml != null)
        //                foreach (EmpGradeXml empGradeXml in task.EmpGradeXml)
        //                {
        //                    if (empGradeXml != null)
        //                    {
        //                        EmpGradeXml cat = new EmpGradeXml();
        //                        CdMasXml ItmCat = ValidateAndInsertCdMas(EnvironmentName, empGradeXml.EmpGrade, empGradeXml.EmpGrade, "EmpGrade", CKy, UsrKy);
        //                        cat.CdKy = ItmCat.CdKy;
        //                        cat.EmpGrade = ItmCat.Code;

        //                        newEmpGradeXml.Add(cat);
        //                    }
        //                }



        //            if (task.EmpMasXml != null)
        //                foreach (EmpMasXml empMasXml in task.EmpMasXml)
        //                {
        //                    int EmpTypKy = 1;
        //                    int DesignationKy = 1;
        //                    int CountryKy = 1;
        //                    int NationalityKy = 1;
        //                    int GenderKy = 1;
        //                    int ReligionKy = 1;
        //                    int BloodGroupKy = 1;
        //                    int TitleKy = 1;
        //                    int EletorateKy = 1;
        //                    int ProvinceKy = 1;
        //                    int LocKy = 1;
        //                    int DepartmentKy = 1;
        //                    int CivilStatKy = 1;
        //                    int NatureofEmployementKy = 1;
        //                    int EmpGrdKy = 1;
        //                    int CompanyKy = 1;
        //                    int ItmKy = 1;
        //                    int PriLocKy = 1;



        //                    if (empMasXml != null)
        //                    {
        //                        if (empMasXml.EmpType != null)
        //                            EmpTypKy = newEmpTypeXml.Count == 0 ? 1 : newEmpTypeXml.Where(o => o.EmpType.ToUpper() == empMasXml.EmpType.ToUpper()).FirstOrDefault().CdKy;
        //                        if (empMasXml.Designation != null)
        //                            DesignationKy = newDesignationXml.Count == 0 ? 1 : newDesignationXml.Where(o => o.Designation.ToUpper() == empMasXml.Designation.ToUpper()).FirstOrDefault().CdKy;
        //                        if (empMasXml.Country != null)
        //                            CountryKy = newCountryXml.Count == 0 ? 1 : newCountryXml.Where(o => o.Country.ToUpper() == empMasXml.Country.ToUpper()).FirstOrDefault().CdKy;
        //                        if (empMasXml.Nationality != null)
        //                            NationalityKy = newNationalityXml.Count == 0 ? 1 : newNationalityXml.Where(o => o.Nationality.ToUpper() == empMasXml.Nationality.ToUpper()).FirstOrDefault().CdKy;
        //                        if (empMasXml.Gender != null)
        //                            GenderKy = newGenderXml.Count == 0 ? 1 : newGenderXml.Where(o => o.Gender.ToUpper() == empMasXml.Gender.ToUpper()).FirstOrDefault().CdKy;
        //                        if (empMasXml.Religion != null)
        //                            ReligionKy = newReligionXml.Count == 0 ? 1 : newReligionXml.Where(o => o.Religion.ToUpper() == empMasXml.Religion.ToUpper()).FirstOrDefault().CdKy;
        //                        if (empMasXml.BloodGroup != null)
        //                            BloodGroupKy = newBloodGroupXml.Count == 0 ? 1 : newBloodGroupXml.Where(o => o.BloodGroup.ToUpper() == empMasXml.BloodGroup.ToUpper()).FirstOrDefault().CdKy;
        //                        if (empMasXml.Title != null)
        //                            TitleKy = newTitleXml.Count == 0 ? 1 : newTitleXml.Where(o => o.Title.ToUpper() == empMasXml.Title.ToUpper()).FirstOrDefault().CdKy;
        //                        if (empMasXml.Electorate != null)
        //                            EletorateKy = newElectorateXml.Count == 0 ? 1 : newElectorateXml.Where(o => o.Electorate.ToUpper() == empMasXml.Electorate.ToUpper()).FirstOrDefault().CdKy;
        //                        if (empMasXml.Province != null)
        //                            ProvinceKy = newProvinceXml.Count == 0 ? 1 : newProvinceXml.Where(o => o.Province.ToUpper() == empMasXml.Province.ToUpper()).FirstOrDefault().CdKy;
        //                        if (empMasXml.Department != null)
        //                            DepartmentKy = newDepartmentXml.Count == 0 ? 1 : newDepartmentXml.Where(o => o.Department.ToUpper() == empMasXml.Department.ToUpper()).FirstOrDefault().CdKy;
        //                        if (empMasXml.Location != null)
        //                            LocKy = newEmpLocationXml.Count == 0 ? 1 : newEmpLocationXml.Where(o => o.Location.ToUpper() == empMasXml.Location.ToUpper()).FirstOrDefault().CdKy;
        //                        if (empMasXml.MARITAL_STATUS != null)
        //                            CivilStatKy = newMARITAL_STATUSXml.Count == 0 ? 1 : newMARITAL_STATUSXml.Where(o => o.MARITAL_STATUS.ToUpper() == empMasXml.MARITAL_STATUS.ToUpper()).FirstOrDefault().CdKy;
        //                        if (empMasXml.NatureofEmployement != null)
        //                            NatureofEmployementKy = newNatureofEmployementXml.Count == 0 ? 1 : newNatureofEmployementXml.Where(o => o.NatureofEmployement.ToUpper() == empMasXml.NatureofEmployement.ToUpper()).FirstOrDefault().CdKy;
        //                        if (empMasXml.EmpGrade != null)
        //                            EmpGrdKy = newEmpGradeXml.Count == 0 ? 1 : newEmpGradeXml.Where(o => o.EmpGrade.ToUpper() == empMasXml.EmpGrade.ToUpper()).FirstOrDefault().CdKy;


        //                        EmpMas emp = new EmpMas();
        //                        AccMas acc = new AccMas();


        //                        if ((empMasXml.EmpNo != null && empMasXml.EmpFullName != null && empMasXml.DateofJoin != null && empMasXml.NICNo != null) && (empMasXml.EpfNo != null || empMasXml.DateofBirth != null || empMasXml.PassportNo != null || empMasXml.NamewithInitial != null))
        //                        {
        //                            emp = ValidateAndInsertEmpMas(EnvironmentName, EmpTypKy, CountryKy, NationalityKy, GenderKy, ReligionKy, BloodGroupKy, TitleKy, CivilStatKy,
        //                                empMasXml.EmpNo, empMasXml.EmpFullName, empMasXml.DateofJoin, empMasXml.NICNo, empMasXml.EpfNo, empMasXml.DateofBirth, empMasXml.PassportNo, empMasXml.NamewithInitial, empMasXml.PassportExpDt, CKy, UsrKy);

        //                            newEmpMas.Add(emp);
        //                        }

        //                        if (emp != null)
        //                        {
        //                            if (empMasXml.EmpNo != null && empMasXml.EmpFullName != null)
        //                            {
        //                                acc = ValidateAndInsertAccMas(EnvironmentName, empMasXml.EmpFullName + empMasXml.EmpNo, empMasXml.EmpFullName, 1, 1, 1, 1, 1, 1, 1, "", "", "", CKy, UsrKy, emp.EmpKy);
        //                                newAccMas.Add(acc);
        //                            }

        //                            if (acc != null)
        //                            {
        //                                if (empMasXml.EmpPhoneNO != null || empMasXml.EmpHomePhoneNO != null || empMasXml.EmpOfficeEmail != null || empMasXml.EmpPersonnelEmail != null)
        //                                {
        //                                    ValidateAndInsertAdrMasCd(EnvironmentName, acc.AdrKy, 1, 1, empMasXml.EmpPhoneNO, empMasXml.EmpHomePhoneNO, empMasXml.EmpOfficeEmail, empMasXml.EmpPersonnelEmail, CKy, UsrKy);
        //                                }

        //                                if (empMasXml.Street != null || empMasXml.City != null)
        //                                {
        //                                    ValidateAndInsertAdrMasDet(EnvironmentName, acc.AdrKy, empMasXml.Street, empMasXml.City, CKy, UsrKy, CountryKy, EletorateKy, ProvinceKy);
        //                                }

        //                                //if (empMasXml.Street != null || empMasXml.City != null)
        //                                //{
        //                                //    ValidateAndInsertAdrMasDet(EnvironmentName, acc.AdrKy, empMasXml.Street, empMasXml.City, CKy, UsrKy, CountryKy, EletorateKy, ProvinceKy);
        //                                //}


        //                                if (empMasXml.BasicSalary != null || empMasXml.DateofJoin != null || DesignationKy > 1 || NatureofEmployementKy > 1 || EmpTypKy > 1 || LocKy > 1 || DepartmentKy > 1)
        //                                {
        //                                    ValidateAndInsertEmpMasCdDt(EnvironmentName, emp.EmpKy, acc.AdrKy, DesignationKy, NatureofEmployementKy, EmpTypKy, LocKy, DepartmentKy, EmpGrdKy, CompanyKy, empMasXml.BasicSalary, empMasXml.DateofJoin, empMasXml.EftvDate, CKy, UsrKy);

        //                                }

        //                                if (empMasXml.Rate != null)
        //                                {
        //                                    ValidateAndInsertEmpRate(EnvironmentName, acc.AdrKy, ItmKy, PriLocKy, empMasXml.EftvDate, empMasXml.Rate, CKy, UsrKy);
        //                                }

        //                            }
        //                        }

        //                    }
        //                }

        //        }

        //        catch (Exception ex)
        //        {
        //            throw new Exception(ex.Message.ToString());
        //        }
        //    }

        //    return true;
        //}


        //internal bool BOQExcelImportJsonData(string EnvironmentName, string MSImportStringData, int CKy, int UsrKy)
        //{
        //    // -- Define New List

        //    List<OrdTypXml> newOrdTypXml = new List<OrdTypXml>();
        //    List<ItmCdXml> newItmCdXml = new List<ItmCdXml>();
        //    List<UnitXml> newUnitXml = new List<UnitXml>();


        //    List<BOQXml> newBOQXml = new List<BOQXml>();
        //    //List<AccMas> newAccMas = new List<AccMas>();


        //    // -- Define New List

        //    List<BOQExcel_ImportModel> listNew = new List<BOQExcel_ImportModel>();

        //    if (MSImportStringData != "[]" || MSImportStringData != "[null]" || MSImportStringData != "")
        //    {
        //        try
        //        {
        //            PMExcel_ImportModel task1 = new JavaScriptSerializer().Deserialize<PMExcel_ImportModel>(MSImportStringData);
        //            //AccMasExcel_ImportModel task2 = new JavaScriptSerializer().Deserialize<AccMasExcel_ImportModel>(MSImportStringData);
        //            BOQExcel_ImportModel task = new JavaScriptSerializer().Deserialize<BOQExcel_ImportModel>(MSImportStringData);


        //            if (task1.UnitXml != null)
        //                foreach (UnitXml unitXml in task1.UnitXml)
        //                {
        //                    if (unitXml != null)
        //                    {
        //                        UnitXml unt = ValidateAndInsertUnitMas(EnvironmentName, unitXml.Unit, CKy, UsrKy);
        //                        newUnitXml.Add(unt);
        //                    }
        //                }

        //            if (task.OrdTypXml != null)
        //                foreach (OrdTypXml ordTypXml in task.OrdTypXml)
        //                {

        //                    if (ordTypXml != null)
        //                    {
        //                        OrdTypXml cat = new OrdTypXml();
        //                        CdMasXml ItmCat = ValidateAndInsertCdMas(EnvironmentName, ordTypXml.OrdTyp, ordTypXml.OrdTyp, "OrdTyp", CKy, UsrKy);
        //                        cat.CdKy = ItmCat.CdKy;
        //                        cat.OrdTyp = ItmCat.Code;

        //                        newOrdTypXml.Add(cat);
        //                    }
        //                }

        //            int LiNo = 1;
        //            int OrdKy = 1;

        //            if (task.BOQXml != null)
        //                foreach (BOQXml bOQXml in task.BOQXml)
        //                {
        //                    int OrdTypKy = 1;
        //                    int UnitKy = 1;

        //                    if (bOQXml != null)
        //                    {
        //                        if (bOQXml.Unit != null)
        //                            UnitKy = newUnitXml == null ? 1 : newUnitXml.Where(o => o.Unit.ToUpper() == bOQXml.Unit.ToUpper()).FirstOrDefault().UnitKy;

        //                        if (bOQXml.OrdTyp != null)
        //                            OrdTypKy = newOrdTypXml.Count == 0 ? 1 : newOrdTypXml.Where(o => o.OrdTyp.ToUpper() == bOQXml.OrdTyp.ToUpper()).FirstOrDefault().CdKy;


        //                        //BOQXml boq = new BOQXml();
        //                        //AccMas acc = new AccMas();

        //                        //foreach (BOQXml item in bOQXml)
        //                        //{

        //                        //}
        //                        if (LiNo == 1)
        //                            OrdKy = ValidateAndInsertOrdHdr(EnvironmentName, OrdTypKy, bOQXml.OrdDt, CKy, UsrKy);

        //                        bool res = ValidateAndInsertBOQ(EnvironmentName, UnitKy, OrdTypKy,
        //                            bOQXml.TaskID, bOQXml.TaskName, bOQXml.OrdDt, bOQXml.Rate, bOQXml.Quantity, LiNo, OrdKy, CKy, UsrKy);


        //                        LiNo++;

        //                    }


        //                }

        //        }

        //        catch (Exception ex)
        //        {
        //            throw new Exception(ex.Message.ToString());
        //        }
        //    }

        //    return true;
        //}

        internal async Task<long> GetControlConKyForItmRate(string EnvironmentName, string TblNm, string OurCd, int UsrKy, int CKy)
        {
            string actionUri = "GetControlConKy";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("TblNm", TblNm);
            paramDictionary.Add("OurCd", OurCd);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("CKy", CKy);

            long TrnKy = 0;
            long list = new long();

            HttpResponseMessage response = await RunApiOperation(
           ItmPrflBaseUri,
           actionUri,
           EnvironmentName,
           paramDictionary);
            list = await response.Content.ReadAsAsync<long>();          

            return TrnKy = Convert.ToInt64(list);
        }

        internal async Task<List<UnitModel>> GetUnit(string EnvironmentName, int UsrKy)
        {
            string actionUri = "GetUnit";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();
            paramDictionary.Add("UsrKy", UsrKy);
            List<UnitModel> menuList = new List<UnitModel>();

            HttpResponseMessage response = await RunApiOperation(
         ItmPrflBaseUri,
         actionUri,
         EnvironmentName,
         paramDictionary);
            menuList = await response.Content.ReadAsAsync<List<UnitModel>>();
          

            return menuList;
        }

        internal async Task<bool> CheckItmCdExist(string EnvironmentName, string ItmCd, string ItmTypKy, int UsrKy, int CKy)
        {
            string actionUri = "CheckItmCdExist";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("Itmcd", ItmCd);
            paramDictionary.Add("itmtypky", ItmTypKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("CKy", CKy);

            bool Result = new bool();
            bool list = new bool();

            HttpResponseMessage response = await RunApiOperation(
                ItmPrflBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary);
            list = await response.Content.ReadAsAsync<bool>();           

            return Result = Convert.ToBoolean(list);
        }


        #endregion
    }
}

//new Uri("http://localhost:49558/")

