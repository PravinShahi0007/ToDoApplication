using BlueLotus.Gantt.ViewModel.Entity;
using BlueLotus.ItmMas.Model.Entity;
using BlueLotus.ObjMas.Model;
using BlueLotus.ViewModel.Entity;
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
        string OrdDetCmpnBaseUri = "api/OrdDetCmpn/";
        
        public List<OrdDetCmpnModel> OrdDetCmpn_SelectWeb(string EnvironmentName, int CKy, int UsrKy, int ObjKy, string OrdDetKy)
        {
            string actionUri = "OrdDetCmpn_SelectWeb";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("ObjKy", ObjKy);
            paramDictionary.Add("OrdDetKy", OrdDetKy);

            List<OrdDetCmpnModel> list = new List<OrdDetCmpnModel>();
            list = RunApiOperation(
                OrdDetCmpnBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as List<OrdDetCmpnModel>;

            return list;
        }

        public bool OrdDetCmpn_InsertWeb(string EnvironmentName, int CKy, int UsrKy, int ObjKy, string OrdDetCmpnModel)
        {
            string actionUri = "OrdDetCmpn_InsertWeb";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("ObjKy", ObjKy);
            paramDictionary.Add("OrdDetCmpnModel", OrdDetCmpnModel);

            object list = new object();
            list = RunApiOperation(
                OrdDetCmpnBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as object;

            return Convert.ToBoolean(list);
        }

        public bool OrdDetCmpn_UpdateWeb(string EnvironmentName, int CKy, int UsrKy, int ObjKy, string OrdDetCmpnModel)
        {
            string actionUri = "OrdDetCmpn_UpdateWeb";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("ObjKy", ObjKy);
            paramDictionary.Add("OrdDetCmpnModel", OrdDetCmpnModel);

            object list = new object();
            list = RunApiOperation(
                OrdDetCmpnBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as object;

            return Convert.ToBoolean(list);
        }

        public bool OrdDetCmpn_DeleteWeb(string EnvironmentName, int CKy, int UsrKy, int ObjKy, string OrdDetCmpnModel)
        {
            string actionUri = "OrdDetCmpn_DeleteWeb";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("ObjKy", ObjKy);
            paramDictionary.Add("OrdDetCmpnModel", OrdDetCmpnModel);

            object list = new object();
            list = RunApiOperation(
                OrdDetCmpnBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as object;

            return Convert.ToBoolean(list);
        }
    }
}