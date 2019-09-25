using BlueLotus.PNS_Security.Model.Entity;
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
        string PNS_DispatchBaseUri = "api/PNS_Dispatch/";

        internal List<PNS_Dispatch_SelectModel> LoadGridViewforPNSDispatch(string EnvironmentName, int CKy, int UsrKy, string Date, string RecurDlvNoKy)
        {
            string actionUri = "LoadGridViewforPNSDispatch";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("Date", Date);
            paramDictionary.Add("RecurDlvNoKy", RecurDlvNoKy);

            List<PNS_Dispatch_SelectModel> PrjNmList = new List<PNS_Dispatch_SelectModel>();
            PrjNmList = RunApiOperation(
            PNS_DispatchBaseUri,
            actionUri,
            EnvironmentName,
            paramDictionary,
            PrjNmList.GetType()) as List<PNS_Dispatch_SelectModel>;

            return PrjNmList;
        }


        internal List<PNS_Dispatch_SelectModel> LoadGridViewforPNSDispatchDrilled(string EnvironmentName, int UsrKy, string Date, string RecurDlvNoKy, int AccKy, int AdrKy)
        {
            string actionUri = "LoadGridViewforPNSDispatchDrilled";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("Date", Date);
            paramDictionary.Add("RecurDlvNoKy", RecurDlvNoKy);
            paramDictionary.Add("AccKy", AccKy);
            paramDictionary.Add("AdrKy", AdrKy);

            List<PNS_Dispatch_SelectModel> PrjNmList = new List<PNS_Dispatch_SelectModel>();
            PrjNmList = RunApiOperation(
            PNS_DispatchBaseUri,
            actionUri,
            EnvironmentName,
            paramDictionary,
            PrjNmList.GetType()) as List<PNS_Dispatch_SelectModel>;

            return PrjNmList;
        }

        internal bool Update_drilledVehNo(string EnvironmentName, int UsrKy, string TrnKy, string AdrKy)
        {
            string actionUri = "Update_drilledVehNo";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("TrnKy", TrnKy);
            paramDictionary.Add("AdrKy", AdrKy);



            bool Reset = new bool();
            object obj = RunApiOperation(
                PNS_DispatchBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                Reset.GetType());

            Reset = Convert.ToBoolean(obj);

            return Reset;
        }

        internal bool UpdatePNS_Dispatch_PerantVehNoCmb(string EnvironmentName, int CKy, int UsrKy, string AccKy, string AdrKy, string PreAdrKy, string Date, string RecurDlvNoKy)
        {
            string actionUri = "UpdatePNS_Dispatch_PerantVehNoCmb";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("AccKy", AccKy);
            paramDictionary.Add("AdrKy", AdrKy);
            paramDictionary.Add("PreAdrKy", PreAdrKy);
            paramDictionary.Add("Date", Date);
            paramDictionary.Add("RecurDlvNoKy", RecurDlvNoKy);


            bool Reset = new bool();
            object obj = RunApiOperation(
                PNS_DispatchBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                Reset.GetType());

            Reset = Convert.ToBoolean(obj);

            return Reset;
        }


    }
}