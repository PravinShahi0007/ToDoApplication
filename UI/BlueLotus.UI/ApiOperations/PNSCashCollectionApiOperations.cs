using BlueLotus.PNSCollection.Model.PNSCashier_Collection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web;

namespace BlueLotus.UI.ApiOperations
{
    public partial class ApiOperation
    {
        string PNSCashierCollection = "api/PNSCasherCollectionController/";
                                                                      
        public decimal UsrCashBalCashBalance(int cKy, int usrKy, string sBuKy, string depDate, string bankKy,string CordKy, string EnvironmentName)
        {
            string actionUri = "PNSUsrCashBal";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();
            paramDictionary.Add("UsrKy", usrKy);
            paramDictionary.Add("CKy", cKy);
            paramDictionary.Add("sBuKy", sBuKy);
            paramDictionary.Add("depDate", depDate);
            paramDictionary.Add("bankKy", bankKy);
            paramDictionary.Add("CordKy", CordKy);

            decimal CashBal = new decimal();
            object obj = RunApiOperation(
                PNSCashierCollection,
                actionUri,
                EnvironmentName,
                paramDictionary,
                CashBal.GetType());

            CashBal = Convert.ToDecimal(obj);

            return CashBal;

            //List<CashierCollectionModel> list = new List<CashierCollectionModel>();
            //list = RunApiOperation(
            //    PNSCashierCollection,
            //    actionUri,
            //    EnvironmentName,
            //    paramDictionary,
            //    list.GetType()) as List<CashierCollectionModel>;
            //return list;
        }
                                                      
        public List<CashierCollectionModel> PnsUsrChq(int CKy, int UsrKy,string SBuKy,string DepDate,string BankKy, string CordKy, string EnvironmentName)
        {
            string actionUri = "PnsUsrChq";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("sBuKy", SBuKy);
            paramDictionary.Add("depDate", DepDate);
            paramDictionary.Add("bankKy", BankKy);
            paramDictionary.Add("CordKy", CordKy);

            List<CashierCollectionModel> list = new List<CashierCollectionModel>();
            list = RunApiOperation(
                PNSCashierCollection,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as List<CashierCollectionModel>;
            return list;
        }

        public List<CashierCollectionModel> PNSCashierCollectionCashSave(int CKy, int UsrKy, string CordinatorName, string Cash, string ConCord, string OurCode,string  updatedRecords,string SBu, string EnvironmentName)
        {
            // HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/PNSCasherCollection/PNSCasherCashSave?CKy=" + CKy + "&UsrKy=" + UsrKy + "&CordinatorName=" + CordinatorName + "&Cash=" + Cash + "&OurCode=" + OurCode +"")).Result;
            string actionUri = "PNSCasherCashChqSave";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();
            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("CordinatorName", CordinatorName);
            paramDictionary.Add("Cash", Cash);
            paramDictionary.Add("ConCord", ConCord);
            paramDictionary.Add("OurCode", OurCode);
            paramDictionary.Add("updatedRecords", updatedRecords);
            paramDictionary.Add("SBu", SBu);

            
            List<CashierCollectionModel> list = new List<CashierCollectionModel>();
            list = RunApiOperation(
                PNSCashierCollection,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as List<CashierCollectionModel>;
            return list;
        }

        //public bool PNSCashierCollectionChqSave(string CordinatorKy, string trnKy, string ConCord, string OurCode, string updatedRecords, int UsrKy, int CKy, string EnvironmentName)
        //{
        //    HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/PNSCasherCollection/PNSCasherChqSave?CordinatorKy=" + CordinatorKy + "&trnKy=" + trnKy + "&ConCord=" + ConCord + "&OurCode=" + OurCode + "&updatedRecords=" + updatedRecords +"&UsrKy=" + UsrKy + "&CKy=" + CKy + "")).Result;
        //    bool sucess = false;
        //    if (response.IsSuccessStatusCode)
        //    {
        //        string Balance = response.Content.ReadAsStringAsync().Result;
        //        sucess = Convert.ToBoolean(Balance);

        //    }
        //    return sucess;
        //}

        public List<PNSCordinatormodel> PNSCordinatorName(int CKy, int UsrKy, string EnvironmentName)
        {
            string actionUri = "PNSCordinatorNameCombo";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("CKy", CKy);
            List<PNSCordinatormodel> list = new List<PNSCordinatormodel>();
            list = RunApiOperation(
                PNSCashierCollection,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as List<PNSCordinatormodel>;
            return list;
        }


    }
}