using BlueLotus.ComboLoad.Model;
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
        string taskProgressBasUri = "api/TaskProgress/";

        internal List<PPrjKySubConAdrNm_SelectMob> PPrjKySubConAdrNm_SelectMob(string EnvironmentName, int CKy, int UsrKy, int ObjKy, int TrnTypKy, int PrjKy)
        {
            string actionUri = "PPrjKySubConAdrNm_SelectMob";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("ObjKy", ObjKy);
            paramDictionary.Add("TrnTypKy", TrnTypKy);
            paramDictionary.Add("PrjKy", PrjKy);

            List<PPrjKySubConAdrNm_SelectMob> list = new List<PPrjKySubConAdrNm_SelectMob>();
            list = RunApiOperation(
                taskProgressBasUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as List<PPrjKySubConAdrNm_SelectMob>;

            return list;
        }

        public List<SubConPrgrsItmTrn_SelectWeb> SubConPrgrsItmTrn_SelectWeb(string EnvironmentName, int CKy, int UsrKy, int ObjKy, int TrnKy, string TrnDt, int TrnTypKy, int PrjKy, int AdrKy, int FinItmKy)
        {
            string actionUri = "SubConPrgrsItmTrn_SelectWeb";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("ObjKy", ObjKy);
            paramDictionary.Add("TrnKy", TrnKy);
            paramDictionary.Add("TrnDt", TrnDt);
            paramDictionary.Add("TrnTypKy", TrnTypKy);
            paramDictionary.Add("PrjKy", PrjKy);
            paramDictionary.Add("AdrKy", AdrKy);
            paramDictionary.Add("FinItmKy", FinItmKy);

            //int TrnKy, string TrnDt, int TrnTypKy, int PrjKy, int AdrKy, int FinItmKy
            List<SubConPrgrsItmTrn_SelectWeb> list = new List<SubConPrgrsItmTrn_SelectWeb>();
            list = RunApiOperation(
                taskProgressBasUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as List<SubConPrgrsItmTrn_SelectWeb>;

            return list;
        }


        public List<PrcsDet_SelectWeb> PrcsDet_SelectWeb(string EnvironmentName, int CKy, int UsrKy, int ObjKy, int PrcsDetKy)
        {
            string actionUri = "PrcsDet_SelectWeb";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("ObjKy", ObjKy);
            paramDictionary.Add("PrcsDetKy", PrcsDetKy);
  
            List<PrcsDet_SelectWeb> list = new List<PrcsDet_SelectWeb>();
            list = RunApiOperation(
                taskProgressBasUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as List<PrcsDet_SelectWeb>;

            return list;
        }

        public bool InsertTaskProgress(string EnvironmentName, int CKy, int UsrKy, int ObjKy, int AccessLvlKy, string updatedOrders, string newOrders, string deletedOrders, string PrjKy, string AdrKy, string FrmLocKy, string AccKy, string BUKY, string Date, string ordKydata, string ConCd, string OurCd)
        {
            string actionUri = "InsertDetailGridInvoice";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("ObjKy", ObjKy);
            paramDictionary.Add("AccessLvlKy", AccessLvlKy);
            paramDictionary.Add("updatedOrders", updatedOrders);
            paramDictionary.Add("newOrders", newOrders);
            paramDictionary.Add("deletedOrders", deletedOrders);
            paramDictionary.Add("PrjKy", PrjKy);
            paramDictionary.Add("AdrKy", AdrKy);
            paramDictionary.Add("FrmLocKy", FrmLocKy);
            paramDictionary.Add("AccKy", AccKy);
            paramDictionary.Add("BUKY", BUKY);
            paramDictionary.Add("Date", Date);
            paramDictionary.Add("ordKydata", ordKydata);
            paramDictionary.Add("ConCd", ConCd);
            paramDictionary.Add("OurCd", OurCd);

            object list = new object();
            list = RunApiOperation(
                taskProgressBasUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as object;

            return true;
        }
    }
}