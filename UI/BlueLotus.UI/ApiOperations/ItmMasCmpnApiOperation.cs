using BlueLotus.ItmMas.Model.Entity;
using BlueLotus.ObjMas.Model;
using BlueLotus.TransactionModel.Entity;
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
        string itmMasCmpnBaseUri = "api/ItmCmpn/";
        
        public List<ItmCmpnModel> ItmCmpn_SelectWeb(string EnvironmentName, int CKy, int UsrKy, int ObjKy, string FinItmKy)
        {
            string actionUri = "ItmCmpn_SelectWeb";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("ObjKy", ObjKy);
            paramDictionary.Add("FinItmKy", FinItmKy);

            List<ItmCmpnModel> list = new List<ItmCmpnModel>();
            list = RunApiOperation(
                itmMasCmpnBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as List<ItmCmpnModel>;

            return list;
        }


        public List<ItemForOrdtypModel> RecepieGetRate(string EnvironmentName, int CKy, int ObjKy, string ConCd, string OurCd, string ItmCd, int UsrKy, int AdrKy, int LocKy, int PrjKy, string Dt, int ItmKy)
        {
            string actionUri = "RecepieGetRate";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("ObjKy", ObjKy);      
            paramDictionary.Add("ConCd", ConCd);
            paramDictionary.Add("OurCd", OurCd);
            paramDictionary.Add("ItmCd", ItmCd);
            paramDictionary.Add("AdrKy", AdrKy);
            paramDictionary.Add("LocKy", LocKy);
            paramDictionary.Add("PrjKy", PrjKy);
            paramDictionary.Add("Dt", Dt);
            paramDictionary.Add("ItmKy", ItmKy);

            List<ItemForOrdtypModel> list = new List<ItemForOrdtypModel>();
            list = RunApiOperation(
                itmMasCmpnBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as List<ItemForOrdtypModel>;

            return list;
        }


        public bool ItmCmpn_InsertWeb(string EnvironmentName, int CKy, int UsrKy, int ObjKy, string itmCmpnModel)
        {
            string actionUri = "ItmCmpn_InsertWeb";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("ObjKy", ObjKy);
            paramDictionary.Add("itmCmpnModel", itmCmpnModel);

            object list = new object();
            list = RunApiOperation(
                itmMasCmpnBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as object;

            return Convert.ToBoolean(list);
        }

        public bool ItmCmpn_UpdateWeb(string EnvironmentName, int CKy, int UsrKy, int ObjKy, string itmCmpnModel)
        {
            string actionUri = "ItmCmpn_UpdateWeb";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("ObjKy", ObjKy);
            paramDictionary.Add("itmCmpnModel", itmCmpnModel);

            object list = new object();
            list = RunApiOperation(
                itmMasCmpnBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as object;

            return Convert.ToBoolean(list);
        }

        public bool ItmCmpn_DeleteWeb(string EnvironmentName, int CKy, int UsrKy, int ObjKy, string itmCmpnModel)
        {
            string actionUri = "ItmCmpn_DeleteWeb";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("ObjKy", ObjKy);
            paramDictionary.Add("itmCmpnModel", itmCmpnModel);

            object list = new object();
            list = RunApiOperation(
                itmMasCmpnBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as object;

            return Convert.ToBoolean(list);
        }

        public bool ItmCmpn_PrntInsert(string EnvironmentName, int CKy, int UsrKy, int ObjKy)
        {
            string actionUri = "ItmCmpnPrnt_InsertWeb";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("ObjKy", ObjKy);

            object list = new object();
            list = RunApiOperation(
                itmMasCmpnBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as object;

            return Convert.ToBoolean(list);
        }

    }
}