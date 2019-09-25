using BlueLotus.Gantt.ViewModel.Entity;
using BlueLotus.ItmMas.Model.Entity;
using BlueLotus.ObjMas.Model;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Runtime.Serialization.Json;
using System.Text;
using System.Web;

namespace BlueLotus.UI.ApiOperations
{
    public partial class ApiOperation
    {
        string prcsSchDetCmpnBaseUri = "api/PrcsSchDetCmpn/";
        
        public List<PrcsSchDetCmpn> PrcsSchDetCmpn_SelectWeb(string EnvironmentName, int CKy, int UsrKy, int ObjKy, string PrcsSchDetKy)
        {
            string actionUri = "PrcsSchDetCmpn_SelectWeb";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("ObjKy", ObjKy);
            paramDictionary.Add("PrcsSchDetKy", PrcsSchDetKy);

            List<PrcsSchDetCmpn> list = new List<PrcsSchDetCmpn>();
            list = RunApiOperation(
                prcsSchDetCmpnBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as List<PrcsSchDetCmpn>;

            return list;
        }

        public bool PrcsSchDetCmpn_InsertWeb(string EnvironmentName, int CKy, int UsrKy, int ObjKy, string itmCmpnModel)
        {
            string actionUri = "PrcsSchDetCmpn_InsertWeb";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("ObjKy", ObjKy);
            paramDictionary.Add("itmCmpnModel", itmCmpnModel);

            object list = new object();
            list = RunApiOperation(
                prcsSchDetCmpnBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as object;

            return Convert.ToBoolean(list);
        }

        public bool PrcsSchDetCmpn_UpdateWeb(string EnvironmentName, int CKy, int UsrKy, int ObjKy, string itmCmpnModel)
        {
            string actionUri = "PrcsSchDetCmpn_UpdateWeb";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("ObjKy", ObjKy);
            paramDictionary.Add("itmCmpnModel", itmCmpnModel);

            object list = new object();
            list = RunApiOperation(
                prcsSchDetCmpnBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as object;

            return Convert.ToBoolean(list);
        }

        public bool PrcsSchDetCmpn_DeleteWeb(string EnvironmentName, int CKy, int UsrKy, int ObjKy, string itmCmpnModel)
        {
            string actionUri = "PrcsSchDetCmpn_DeleteWeb";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("ObjKy", ObjKy);
            paramDictionary.Add("itmCmpnModel", itmCmpnModel);

            object list = new object();
            list = RunApiOperation(
                prcsSchDetCmpnBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as object;

            return Convert.ToBoolean(list);
        }
    }
}