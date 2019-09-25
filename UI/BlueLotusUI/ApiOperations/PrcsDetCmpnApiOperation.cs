using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using BlueLotus.ViewModel.Entity;

namespace BlueLotus.UI.ApiOperations
{
    public partial class ApiOperation
    {
        string PrcsDetCmpnBaseUri = "api/PrcsDetCmpn/";

        public List<PrcsDetCmpnModel> PrcsDetCmpn_SelectWeb(string EnvironmentName, int CKy, int UsrKy, int ObjKy, int PrcsDetKy)
        {
            string actionUri = "PrcsDetCmpn_SelectWeb";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("ObjKy", ObjKy);
            paramDictionary.Add("PrcsDetKy", PrcsDetKy);

            List<PrcsDetCmpnModel> list = new List<PrcsDetCmpnModel>();
            list = RunApiOperation(
                PrcsDetCmpnBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as List<PrcsDetCmpnModel>;

            return list;
        }


        internal bool PrcsDetCmpn_InsertWeb(int CKy, int UsrKy, string PrcsDetCmpnDoupdate, string PrcsDetCmpn, int ObjKy, string EnvironmentName)
        {
         
            string actionUri = "PrcsDetCmpn_InsertWeb";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();
            //int CKy, int UsrKy, int ObjKy, string PrcsDetCmpnModel, string EnvironmentName
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("PrcsDetCmpnModel", PrcsDetCmpn);
          //  paramDictionary.Add("PrcsDetCmpn", PrcsDetCmpn);
            paramDictionary.Add("ObjKy", ObjKy);

            object list = new object();
            list = RunApiOperation(
                "api/PrcsDetCmpn/",
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as object;

            return true;

        }

        public bool PrcsDetCmpn_UpdateWeb(string EnvironmentName, int CKy, int UsrKy, int ObjKy, string PrcsDetCmpnModel)
        {
            string actionUri = "PrcsDetCmpn_UpdateWeb";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("ObjKy", ObjKy);
            paramDictionary.Add("PrcsDetCmpnModel", PrcsDetCmpnModel);

            object list = new object();
            list = RunApiOperation(
                PrcsDetCmpnBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as object;

            return Convert.ToBoolean(list);
        }

        public bool PrcsDetCmpn_DeleteWeb(string EnvironmentName, int CKy, int UsrKy, int ObjKy, string PrcsDetCmpnModel)
        {
            string actionUri = "PrcsDetCmpn_DeleteWeb";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("ObjKy", ObjKy);
            paramDictionary.Add("PrcsDetCmpnModel", PrcsDetCmpnModel);

            object list = new object();
            list = RunApiOperation(
                PrcsDetCmpnBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as object;

            return Convert.ToBoolean(list);
        }
    }
}