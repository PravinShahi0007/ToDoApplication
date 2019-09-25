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
        string Bank_BranchEntryBaseUri = "api/Bank_BranchEntry/";

        public List<BankEntryModel> BnkMas_SelectWeb(string EnvironmentName, int CKy, int UsrKy, int ObjKy)
        {
            string actionUri = "BnkMas_SelectWeb";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("ObjKy", ObjKy);


            List<BankEntryModel> list = new List<BankEntryModel>();
            list = RunApiOperation(
                Bank_BranchEntryBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as List<BankEntryModel>;

            return list;
        }

        public bool BnkMas_InsertWeb(string EnvironmentName, int CKy, int UsrKy, int ObjKy, string bankEntryDetails)
        {
            string actionUri = "BnkMas_InsertWeb";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("ObjKy", ObjKy);
            paramDictionary.Add("bankEntryDetails", bankEntryDetails);
          

            object list = new object();
            list = RunApiOperation(
                Bank_BranchEntryBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as object;

            return Convert.ToBoolean(list);
        }

        public bool BnkMas_UpdateWeb(string EnvironmentName, int CKy, int UsrKy, int ObjKy, string bankEntryDetails)
        {
            string actionUri = "BnkMas_UpdateWeb";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("ObjKy", ObjKy);
            paramDictionary.Add("bankEntryDetails", bankEntryDetails);

            object list = new object();
            list = RunApiOperation(
                Bank_BranchEntryBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as object;

            return Convert.ToBoolean(list);
        }
        public bool BnkMas_DeleteWeb(string EnvironmentName, int CKy, int UsrKy, int ObjKy, string bankEntryDetails)
        {
            string actionUri = "BnkMas_DeleteWeb";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("ObjKy", ObjKy);
            paramDictionary.Add("bankEntryDetails", bankEntryDetails);

            object list = new object();
            list = RunApiOperation(
                Bank_BranchEntryBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as object;

            return Convert.ToBoolean(list);
        }


        //Second Grid
        public List<BranchEntry> BrnMas_SelectWeb(string EnvironmentName, int CKy, int UsrKy, int ObjKy, int BnkKy)
        {
            string actionUri = "BrnMas_SelectWeb";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("ObjKy", ObjKy);
            paramDictionary.Add("BnkKy", BnkKy);


            List<BranchEntry> list = new List<BranchEntry>();
            list = RunApiOperation(
                Bank_BranchEntryBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as List<BranchEntry>;

            return list;
        }

        public bool BrnMas_InsertWeb(string EnvironmentName, int CKy, int UsrKy, int ObjKy, int BnkKy, string branchEntryDetails)
        {
            string actionUri = "BrnMas_InsertWeb";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("ObjKy", ObjKy);
            paramDictionary.Add("BnkKy", BnkKy);
            paramDictionary.Add("branchEntryDetails", branchEntryDetails);


            object list = new object();
            list = RunApiOperation(
                Bank_BranchEntryBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as object;

            return Convert.ToBoolean(list);
        }

        public bool BrnMas_UpdateWeb(string EnvironmentName, int CKy, int UsrKy, int ObjKy, int BnkKy, string branchEntryDetails)
        {
            string actionUri = "BrnMas_UpdateWeb";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("ObjKy", ObjKy);
            paramDictionary.Add("BnkKy", BnkKy);
            paramDictionary.Add("branchEntryDetails", branchEntryDetails);

            object list = new object();
            list = RunApiOperation(
                Bank_BranchEntryBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as object;

            return Convert.ToBoolean(list);
        }
        public bool BrnMas_DeleteWeb(string EnvironmentName, int CKy, int UsrKy, int ObjKy, int BnkKy, string branchEntryDetails)
        {
            string actionUri = "BrnMas_DeleteWeb";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("ObjKy", ObjKy);
            paramDictionary.Add("BnkKy", BnkKy);
            paramDictionary.Add("branchEntryDetails", branchEntryDetails);

            object list = new object();
            list = RunApiOperation(
                Bank_BranchEntryBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as object;

            return Convert.ToBoolean(list);
        }

    }
}