using BlueLotus.PNS_Security.Model.Entity;
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
        string PNSSecurityBaseUri = "api/PNS_Security/"; 
        internal List<PNS_SecurityModel> DeliveryNoLookup(string EnvironmentName, int CKy, int UsrKy)
        {
            string actionUri = "DeliveryNoLookup";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);

            List<PNS_SecurityModel> PrjNmList = new List<PNS_SecurityModel>();
            PrjNmList = RunApiOperation(
            PNSSecurityBaseUri,
            actionUri,
            EnvironmentName,
            paramDictionary,
            PrjNmList.GetType()) as List<PNS_SecurityModel>;

            return PrjNmList;
        }

        internal List<VehicleLookup> VehicleLookup(string EnvironmentName, int CKy, int UsrKy, int ObjKy)
        {
            string actionUri = "VehicleLookup";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("ObjKy", ObjKy);

            List<VehicleLookup> PrjNmList = new List<VehicleLookup>();
            PrjNmList = RunApiOperation(
            PNSSecurityBaseUri,
            actionUri,
            EnvironmentName,
            paramDictionary,
            PrjNmList.GetType()) as List<VehicleLookup>;

            return PrjNmList;
        }


        internal List<PNS_Security_OutledModel> OutletLookup(string EnvironmentName, int CKy, int UsrKy)
        {
            string actionUri = "OutletLookup";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);

            List<PNS_Security_OutledModel> PrjNmList = new List<PNS_Security_OutledModel>();
            PrjNmList = RunApiOperation(
            PNSSecurityBaseUri,
            actionUri,
            EnvironmentName,
            paramDictionary,
            PrjNmList.GetType()) as List<PNS_Security_OutledModel>;

            return PrjNmList;
        }


        internal List<PNS_Security_SelectModel> LoadGridView(string EnvironmentName, int Cky, int UsrKy, string Date, string TrnKy, string AccKy, string AdrKy)
        {
            string actionUri = "LoadGridView";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", Cky);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("Date", Date);
            paramDictionary.Add("TrnKy", TrnKy);
            paramDictionary.Add("AccKy", AccKy);
            paramDictionary.Add("AdrKy", AdrKy);

            List<PNS_Security_SelectModel> PrjNmList = new List<PNS_Security_SelectModel>();
            PrjNmList = RunApiOperation(
            PNSSecurityBaseUri,
            actionUri,
            EnvironmentName,
            paramDictionary,
            PrjNmList.GetType()) as List<PNS_Security_SelectModel>;

            return PrjNmList;
        }

        internal bool UpdateGrid(string EnvironmentName, string GridUpdateDetail, int CKy, int UsrKy)
        {
            string actionUri = "UpdateGrid";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("GridUpdateDetail", GridUpdateDetail);

            bool Reset = new bool();
            object obj = RunApiOperation(
                PNSSecurityBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                Reset.GetType());

            Reset = Convert.ToBoolean(obj);

            return Reset;
        }
    }
}