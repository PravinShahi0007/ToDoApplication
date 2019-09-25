using BlueLotus.ObjMas.Model;
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

namespace BlueLotus.UI.ApiOperations
{
    public partial class ApiOperation
    {
        string objMasBaseUri = "api/ObjMas/";

        //UsrObjPrp_UpdateWeb
        internal bool UsrObjPrp_UpdateWeb(string EnvironmentName, int CKy, int UsrKy, string updateObjMasStringList)
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
                
                object obj = RunApiOperation(
                    objMasBaseUri,
                    actionUri,
                    EnvironmentName,
                    paramDictionary,
                    Reset.GetType());

                Reset = Convert.ToBoolean(obj);
            }

            return Reset;
        }


        internal List<ObjMasModel> UsrObjPrp_SelectWeb(string EnvironmentName, int CKy, int UsrKy, string PrntKy, string ObjTyp, string ObjNm, bool isDeepSearch = false)
        {
            string actionUri = "UsrObjPrp_SelectWeb";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("PrntKy", PrntKy);
            paramDictionary.Add("ObjTyp", ObjTyp);
            paramDictionary.Add("ObjNm", ObjNm);
            paramDictionary.Add("isDeepSearch", isDeepSearch);

            List<ObjMasModel> list = new List<ObjMasModel>();
            list = RunApiOperation(
                objMasBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as List<ObjMasModel>;

            return list;
        }

        //
        internal List<ObjMasModel> UsrObjPrp_SelectAllLastChildWeb(string EnvironmentName, int CKy, int UsrKy, string PrntKy)
        {
            string actionUri = "UsrObjPrp_SelectAllLastChildWeb";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("PrntKy", PrntKy);

            List<ObjMasModel> list = new List<ObjMasModel>();
            list = RunApiOperation(
                objMasBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as List<ObjMasModel>;

            return list;
        }

        //
        internal List<ObjMasModel> UsrObjChild_SelectByPrntandSubObjTypWeb(string EnvironmentName, int CKy, int UsrKy, string PrntKy, string ObjTyp, string ObjNm)
        {
            string actionUri = "UsrObjChild_SelectByPrntandSubObjTypWeb";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("PrntKy", PrntKy);
            paramDictionary.Add("ObjTyp", ObjTyp);
            paramDictionary.Add("ObjNm", ObjNm);

            List<ObjMasModel> list = new List<ObjMasModel>();
            list = RunApiOperation(
                objMasBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as List<ObjMasModel>;

            return list;
        }

        internal List<ObjMasModel> UsrObjSec_SelectWeb(string EnvironmentName, int CKy, int UsrKy, string PrntKy, string ObjTyp, string ObjNm)
        {
            string actionUri = "UsrObjSec_SelectWeb";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("PrntKy", PrntKy);
            paramDictionary.Add("ObjTyp", ObjTyp);
            paramDictionary.Add("ObjNm", ObjNm);

            List<ObjMasModel> list = new List<ObjMasModel>();
            list = RunApiOperation(
                objMasBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as List<ObjMasModel>;

            return list;
        }

        public List<ObjMasModel> ObjMas_SelectWeb(string EnvironmentName, int UsrKy, int CKy, string ObjKy)
        {
            string actionUri = "ObjMas_SelectWeb";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("ObjKy", ObjKy);

            List<ObjMasModel> list = new List<ObjMasModel>();
            list = RunApiOperation(
                objMasBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as List<ObjMasModel>;

            return list;
        }

        public List<List<ObjMasModel>> UsrObjPrp_SelectMulti(string EnvironmentName, int ObjKy, int CKy, int UsrKy)
        {
            string actionUri = "UsrObjPrp_SelectMulti";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("ObjKy", ObjKy);
            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);

            List<List<ObjMasModel>> list = new List<List<ObjMasModel>>();
            list = RunApiOperation(
                objMasBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as List<List<ObjMasModel>>;

            return list;
        }
        //New ObjMas Api Operaction
        public List<ObjMasModel> GetAllRecodesFormUsrObjMas_SelectWeb(string Environment, int CKy, int UsrKy, int PrntKy)
        {
            string actionUri = "GetAllRecodesObjMas_SelectWeb";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("PrntKy", PrntKy);

            List<ObjMasModel> list = new List<ObjMasModel>();
            list = RunApiOperation(
                objMasBaseUri,
                actionUri,
                Environment,
                paramDictionary,
                list.GetType()) as List<ObjMasModel>;

            return list;
        }

    }
}