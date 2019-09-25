using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using BlueLotus.BOQ.Model.Entity;

namespace BlueLotus.UI.ApiOperations
{
    public partial class ApiOperation
    {
        //
        // GET: /BOQApiOperation/
        string BOQBaseUri = "api/BOQ/";
        public List<BOQClient_Lookup> BOQClient_Lookup(string EnvironmentName, int CKy, int UsrKy)
        {
            string actionUri = "BOQClient_Lookup";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("CKy", CKy);

            List<BOQClient_Lookup> list = new List<BOQClient_Lookup>();
            list = RunApiOperation(
                BOQBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as List<BOQClient_Lookup>;

            return list;
        }

        public List<OfflineAprAdr_Lookup> OfflineAprAdr_Lookup(string EnvironmentName, int CKy, int UsrKy, string Dt)
        {
            string actionUri = "OfflineAprAdr_Lookup";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("Dt", Dt);

            List<OfflineAprAdr_Lookup> list = new List<OfflineAprAdr_Lookup>();
            list = RunApiOperation(
                BOQBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as List<OfflineAprAdr_Lookup>;

            return list;
        }

        public List<CdMas_OurCdLookup> CdMas_OurCdLookup(string EnvironmentName, int CKy, int UsrKy, string ConCd)
        {
            string actionUri = "CdMas_OurCdLookup";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("ConCd", ConCd);

            List<CdMas_OurCdLookup> list = new List<CdMas_OurCdLookup>();
            list = RunApiOperation(
                BOQBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as List<CdMas_OurCdLookup>;

            return list;
        }



    }
}
