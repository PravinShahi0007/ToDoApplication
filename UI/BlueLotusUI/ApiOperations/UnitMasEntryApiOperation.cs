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
        string UnitMasEntryBaseUri = "api/UnitMasEntry/";

        public List<UnitMasEntryModel> UnitMas_SelectWeb(string EnvironmentName, int CKy, int UsrKy, int ObjKy, string UnitKy)
        {
            string actionUri = "UnitMas_SelectWeb";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("ObjKy", ObjKy);
            paramDictionary.Add("UnitKy", UnitKy);

            List<UnitMasEntryModel> list = new List<UnitMasEntryModel>();
            list = RunApiOperation(
                UnitMasEntryBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as List<UnitMasEntryModel>;

            return list;
        }

        public bool UnitMas_InsertWeb(string EnvironmentName, int CKy, int UsrKy, int ObjKy, string UnitMasEntryDetails)
        {
            string actionUri = "UnitMas_InsertWeb";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("ObjKy", ObjKy);
            paramDictionary.Add("UnitMasEntryDetails", UnitMasEntryDetails);
          

            object list = new object();
            list = RunApiOperation(
                UnitMasEntryBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as object;

            return Convert.ToBoolean(list);
        }

        public bool UnitMas_UpdateWeb(string EnvironmentName, int CKy, int UsrKy, int ObjKy, string UnitMasEntryDetails)
        {
            string actionUri = "UnitMas_UpdateWeb";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("ObjKy", ObjKy);
            paramDictionary.Add("UnitMasEntryDetails", UnitMasEntryDetails);

            object list = new object();
            list = RunApiOperation(
                UnitMasEntryBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as object;

            return Convert.ToBoolean(list);
        }

        public List<UnitMasEntryModel> BaseUnit_Select(string EnvironmentName, int CKy, int UsrKy, int ObjKy)
        {
            string actionUri = "BaseUnit_Select";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("ObjKy", ObjKy);


            List<UnitMasEntryModel> list = new List<UnitMasEntryModel>();
            list = RunApiOperation(
                UnitMasEntryBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as List<UnitMasEntryModel>;

            return list;
        }

        //public bool BnkMas_DeleteWeb(string EnvironmentName, int CKy, int UsrKy, int ObjKy, string bankEntryDetails)
        //{
        //    string actionUri = "BnkMas_DeleteWeb";
        //    Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

        //    paramDictionary.Add("CKy", CKy);
        //    paramDictionary.Add("UsrKy", UsrKy);
        //    paramDictionary.Add("ObjKy", ObjKy);
        //    paramDictionary.Add("bankEntryDetails", bankEntryDetails);

        //    object list = new object();
        //    list = RunApiOperation(
        //        Bank_BranchEntryBaseUri,
        //        actionUri,
        //        EnvironmentName,
        //        paramDictionary,
        //        list.GetType()) as object;

        //    return Convert.ToBoolean(list);
        //}


    }
}