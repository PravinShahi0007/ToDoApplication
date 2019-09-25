using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Runtime.Serialization.Json;
using System.Text;
using System.Web;
using System.Web.Script.Serialization;

using BlueLotus.TransactionModel.Entity;
using BlueLotus.SplOrderModel.Entity;
using BlueLotus.ObjMas.Model;
using BlueLotus.ComboLoad.Model;
using BlueLotus.dailytodo.Entityy;
using BlueLotus.ViewModel.Entity;

namespace BlueLotus.UI.ApiOperations
{
    public partial class ApiOperation
    {
        string commonBaseUri = "api/Common/";

        public List<GetItmRateDisTax> GetItmRateDisTax(
            string EnvironmentName, int CKy, int UsrKy, int ObjKy, int ItmKy, string EftvDt, 
            int LocKy, int TrnTypKy, int BUKy, int PrjKy, int AdrKy, int AccKy)
        {
            string actionUri = "GetItmRateDisTax";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("ObjKy", ObjKy);
            paramDictionary.Add("ItmKy", ItmKy);
            paramDictionary.Add("EftvDt", EftvDt);
            paramDictionary.Add("LocKy", LocKy);
            paramDictionary.Add("TrnTypKy", TrnTypKy);
            paramDictionary.Add("BUKy", BUKy);
            paramDictionary.Add("PrjKy", PrjKy);
            paramDictionary.Add("AdrKy", AdrKy);
            paramDictionary.Add("AccKy", AccKy);

            List<GetItmRateDisTax> list = new List<GetItmRateDisTax>();
            list = RunApiOperation(
                commonBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as List<GetItmRateDisTax>;

            return list;
        }

        public List<AprStsNm_SelectWeb> AprStsNm_SelectWeb(string EnvironmentName, int CKy, int UsrKy, int ObjKy, int CurAprStsKy, int TrnKy)
        {
            string actionUri = "AprStsNm_SelectWeb";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("ObjKy", ObjKy);
            paramDictionary.Add("CurAprStsKy", CurAprStsKy);
            paramDictionary.Add("TrnKy", TrnKy);

            List<AprStsNm_SelectWeb> list = new List<AprStsNm_SelectWeb>();
            list = RunApiOperation(
                commonBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as List<AprStsNm_SelectWeb>;

            return list;
        }

        public List<AprStsLockStatus> IsAlwTrnUpdateApr_SelectWeb(string EnvironmentName, int CKy, int UsrKy, int ObjKy, int AprStsKy, int TrnKy)
        {
            string actionUri = "IsAlwTrnUpdateApr_SelectWeb";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("ObjKy", ObjKy); 
            paramDictionary.Add("AprStsKy", AprStsKy); 
            paramDictionary.Add("TrnKy", TrnKy); 

            List<AprStsLockStatus> list = new List<AprStsLockStatus>();
            list = RunApiOperation(
                commonBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as List<AprStsLockStatus>;

            return list;
        }

        public List<TrnHdrApr_LatestState> TrnHdrApr_LatestState(string EnvironmentName, int CKy, int UsrKy, int ObjKy, int TrnKy, string TblNm)
        {
            string actionUri = "TrnHdrApr_LatestState";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("ObjKy", ObjKy);
            paramDictionary.Add("TrnKy", TrnKy); 
            paramDictionary.Add("TblNm", TblNm); 

            List<TrnHdrApr_LatestState> list = new List<TrnHdrApr_LatestState>();
            list = RunApiOperation(
                commonBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as List<TrnHdrApr_LatestState>;

            return list;
        }

        internal List<AprStsLockStatus> TrnHdrApr_NextState(string EnvironmentName, int CKy, int UsrKy, int ObjKy, int CurntAprStsKy, int TrnTypKy)
        {
            string actionUri = "TrnHdrApr_NextState";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("ObjKy", ObjKy);
            paramDictionary.Add("CurntAprStsKy", CurntAprStsKy);
            paramDictionary.Add("TrnTypKy", TrnTypKy);

            List<AprStsLockStatus> list = new List<AprStsLockStatus>();
            list = RunApiOperation(
                commonBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as List<AprStsLockStatus>;

            return list;
        }
        
        internal List<TrnHdrApr_InsertWeb> TrnHdrApr_InsertWeb(string EnvironmentName, int CKy, int UsrKy,
            int ObjKy, int TrnKy, int AprStsKy, int AprResnKy, int AprPrtyKy, string TblNm)
        {
            string actionUri = "TrnHdrApr_InsertWeb";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("ObjKy", ObjKy);
            paramDictionary.Add("TrnKy", TrnKy);
            paramDictionary.Add("AprStsKy", AprStsKy);
            paramDictionary.Add("AprResnKy", AprResnKy);
            paramDictionary.Add("AprPrtyKy", AprPrtyKy); 
            paramDictionary.Add("TblNm", TblNm); 

            List<TrnHdrApr_InsertWeb> list = new List<TrnHdrApr_InsertWeb>();
            list = RunApiOperation(
                commonBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as List<TrnHdrApr_InsertWeb>;

            return list;
        }

        internal List<Email> GetEmailData(string EnvironmentName, int Cky, int UsrKy, int ObjKy, int OrdKy)
        {
            string actionUri = "GetEmailData";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", Cky);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("ObjKy", ObjKy);
            paramDictionary.Add("OrdKy", OrdKy);
           
            List<Email> list = new List<Email>();
            list = RunApiOperation(
                commonBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as List<Email>;

            return list;
        }

        internal List<CdNm_SelectWeb> CdNm_SelectWeb(string EnvironmentName, int CKy, int UsrKy, string ConCd)
        {
            string actionUri = "CdNm_SelectWeb";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("ConCd", ConCd);

            List<CdNm_SelectWeb> list = new List<CdNm_SelectWeb>();
            list = RunApiOperation(
                commonBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as List<CdNm_SelectWeb>;

            return list;
        }

        public List<PrjTaskLocMob> PrjTaskLocMob(string EnvironmentName, int cKy, int usrKy, int objKy, int trnTypKy, int preKy,int PrjKy)
        {
            string actionUri = "PrjTaskLocMob";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", cKy);
            paramDictionary.Add("UsrKy", usrKy);
            paramDictionary.Add("ObjKy", objKy);
            paramDictionary.Add("TrnTypKy", trnTypKy);
            paramDictionary.Add("PreKy", preKy);
            paramDictionary.Add("PrjKy", PrjKy);

            List<PrjTaskLocMob> list = new List<PrjTaskLocMob>();
            list = RunApiOperation(
                commonBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as List<PrjTaskLocMob>;

            return list;
        }

        public List<AdrUnit> AdrKyToItm_SelectMob(string EnvironmentName, int CKy, int UsrKy, int AdrKy)
        {
            string baseURL = "api/DailyToDo/";
            string actionUri = "AdrKyToItm_SelectMob";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("AdrKy", AdrKy);

            List<AdrUnit> list = new List<AdrUnit>();
            list = RunApiOperation(
                baseURL,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as List<AdrUnit>;

            return list;
        }

        public List<ResDetailPop> SubConPopUp(string EnvironmentName, int CKy, int UsrKy, int refItmTrnKy)
        {
            string baseURL = "api/DailyToDo/";
            string actionUri = "ItmResPopUp";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("refItmTrnKy", refItmTrnKy);

            List<ResDetailPop> list = new List<ResDetailPop>();
            list = RunApiOperation(
                baseURL,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as List<ResDetailPop>;

            return list;
        }
    }
}