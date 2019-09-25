using BlueLotus.ComboLoad.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;

namespace BlueLotus.UI.ApiOperations
{
    public partial class AsynApiOperations
    {
    
        string comboLoadV2BaseUri = "api/ComboLoadV2/";

        public async Task<List<AccCd_SelectMob>> AccCdNm_SelectMob(string EnvironmentName, int CKy, int UsrKy, int ObjKy, int TrnTypKy, int PreKy)
        {
            string actionUri = "AccCdNm_SelectMob";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("ObjKy", ObjKy);
            paramDictionary.Add("TrnTypKy", TrnTypKy);
            paramDictionary.Add("PreKy", PreKy);

            List<AccCd_SelectMob> list = new List<AccCd_SelectMob>();
            HttpResponseMessage response = await RunApiOperation(
                      comboLoadV2BaseUri,
                      actionUri,
                      EnvironmentName,
                      paramDictionary);
            list = await response.Content.ReadAsAsync<List<AccCd_SelectMob>>();

            return list;
        }

        internal async Task<List<AdrID_SelectMob>> AdrIDNm_SelectMob(
            string EnvironmentName,
            int CKy, int UsrKy, int ObjKy, int TrnTypKy, int PreKy)
        {
            string actionUri = "AdrIDNm_SelectMob";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("ObjKy", ObjKy);
            paramDictionary.Add("TrnTypKy", TrnTypKy);
            paramDictionary.Add("PreKy", PreKy);

            List<AdrID_SelectMob> list = new List<AdrID_SelectMob>();
            HttpResponseMessage response = await RunApiOperation(
                 comboLoadV2BaseUri,
                 actionUri,
                 EnvironmentName,
                 paramDictionary);
            list = await response.Content.ReadAsAsync<List<AdrID_SelectMob>>();

            return list;
        }

        internal async Task<List<Code_SelectMob>> CodeIdNm_SelectMob(
         string EnvironmentName, int CKy, int UsrKy,
         int ObjKy, int TrnTypKy, int PreKy)
        {
            string actionUri = "CodeIDNm_SelectMob";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("ObjKy", ObjKy);
            paramDictionary.Add("TrnTypKy", TrnTypKy);
            paramDictionary.Add("PreKy", PreKy);

            List<Code_SelectMob> list = new List<Code_SelectMob>();
            HttpResponseMessage response = await RunApiOperation(
                         comboLoadV2BaseUri,
                         actionUri,
                         EnvironmentName,
                         paramDictionary);
            list = await response.Content.ReadAsAsync<List<Code_SelectMob>>();

            return list;
        }

        internal async Task<List<ItmCd_SelectMob>> ItmCdNm_SelectMob(
        string EnvironmentName, int CKy, int UsrKy,
         int ObjKy, int TrnTypKy, int PreKy)
        {
            string actionUri = "ItmCdNm_SelectMob";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("ObjKy", ObjKy);
            paramDictionary.Add("TrnTypKy", TrnTypKy);
            paramDictionary.Add("PreKy", PreKy);

            List<ItmCd_SelectMob> list = new List<ItmCd_SelectMob>();
            HttpResponseMessage response = await RunApiOperation(
                comboLoadV2BaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary);
            list = await response.Content.ReadAsAsync<List<ItmCd_SelectMob>>();

            return list;
        }

        internal async Task<List<PrjID_SelectMob>> PrjIDNm_SelectMob(string Environment, int CKy, int UsrKy, int ObjKy, int TrnTypKy, int PreKy)
        {
            string actionUri = "PrjIDNm_SelectMob";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("ObjKy", ObjKy);
            paramDictionary.Add("TrnTypKy", TrnTypKy);
            paramDictionary.Add("PreKy", PreKy);

            List<PrjID_SelectMob> list = new List<PrjID_SelectMob>();
            HttpResponseMessage response = await RunApiOperation(
                comboLoadV2BaseUri,
                actionUri,
                Environment,
                paramDictionary);
            list = await response.Content.ReadAsAsync<List<PrjID_SelectMob>>();

            return list;
        }

        internal async Task<List<TaskID_SelectMob>> TaskIDNm_SelectMob(string Environment, int CKy, int UsrKy, int ObjKy, int PrjKy)
        {
            string actionUri = "TaskIDNm_SelectMob";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("ObjKy", ObjKy);
            paramDictionary.Add("PrjKy", PrjKy);

            List<TaskID_SelectMob> list = new List<TaskID_SelectMob>();
            HttpResponseMessage response = await RunApiOperation(
                comboLoadV2BaseUri,
                actionUri,
                Environment,
                paramDictionary);
            list = await response.Content.ReadAsAsync<List<TaskID_SelectMob>>();

            return list;
        }
    }
}