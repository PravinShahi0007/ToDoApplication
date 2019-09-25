using BlueLotus.BankReconciliation.Model.Entity;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Runtime.Serialization.Json;
using System.Text;
using System.Web;
using BlueLotus.UI.ApiOperations;

namespace BlueLotus.UI.ApiOperations
{
    public partial class ApiOperation
    {
        string BankrecBaseUri = "api/BankRec/";

        public List<AccountsModel> BankAccCd(string EnvironmentName, int CKy, int UsrKy)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/BankRec/BankAccCd?CKy=" + CKy + "&UsrKy=" + UsrKy + "")).Result;

            List<AccountsModel> AccountListCd = new List<AccountsModel>();
            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<AccountsModel>));
                List<AccountsModel> deserializeditems = new List<AccountsModel>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<AccountsModel>;
                AccountListCd = deserializeditems;
            }
            return AccountListCd;
        }

        public List<AccountsModel> BankAccNm(string EnvironmentName, int CKy, int UsrKy)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/BankRec/BankAccNm?CKy=" + CKy + "&UsrKy=" + UsrKy + "")).Result;

            List<AccountsModel> AccountListNm = new List<AccountsModel>();
            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<AccountsModel>));
                List<AccountsModel> deserializeditems = new List<AccountsModel>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<AccountsModel>;
                AccountListNm = deserializeditems;
            }
            return AccountListNm;
        }

        public List<BankRecModel> BankRecGrid(string EnvironmentName, int CKy, int UsrKy, string Todate, string Frmdate, string AccKy, string PageNo, string PageSize)
        {
            string actionUri = "LoadBankRecGrid";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("Todate", Todate);
            paramDictionary.Add("Frmdate", Frmdate);
            paramDictionary.Add("AccKy", AccKy);
            paramDictionary.Add("PageNo", PageNo);
            paramDictionary.Add("PageSize", PageSize);
            List<BankRecModel> list = new List<BankRecModel>();
            list = RunApiOperation(
                BankrecBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as List<BankRecModel>;
            return list;
        }

        public decimal LegerBalance(string EnvironmentName, int CKy, int UsrKy, string AccKy, string ToDatey)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/BankRec/GetLegerBalance?CKy=" + CKy + "&UsrKy=" + UsrKy + "&AccKy=" + AccKy + "&ToDatey=" + ToDatey + "")).Result;
            decimal LadgerBalance = 0;

            if (response.IsSuccessStatusCode)
            {
                string SucessStrng = response.Content.ReadAsStringAsync().Result;
                LadgerBalance = Convert.ToDecimal(SucessStrng);

            }
            return LadgerBalance;
        }


        public decimal BalanceAt(string EnvironmentName, int CKy, int UsrKy, string AccKy, string ToDatey)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/BankRec/BalanceAt?CKy=" + CKy + "&UsrKy=" + UsrKy + "&AccKy=" + AccKy + "&ToDatey=" + ToDatey + "")).Result;
            decimal LadgerBalance = 0;
            if (response.IsSuccessStatusCode)
            {
                string Balance = response.Content.ReadAsStringAsync().Result;
                LadgerBalance = Convert.ToDecimal(Balance);

            }
            return LadgerBalance;
        }

        public bool UpdatedRecords(string EnvironmentName, int CKy, int UsrKy, string UpdatedRecord)
        {
            string actionUri = "SendUpdatedRecords";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UpdatedRecord", UpdatedRecord);  
            bool Sucess = new bool();
            object obj = RunApiOperation(
                BankrecBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                Sucess.GetType());
            Sucess = Convert.ToBoolean(obj);
            return Sucess;
            //HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/BankRec/SendUpdatedRecords?CKy=" + CKy + "&UsrKy=" + UsrKy + "&UpdatedRecord=" + UpdatedRecord+ "")).Result;
            //bool Sucess = false;
            //if (response.IsSuccessStatusCode)
            //{
            //    string SucessStrng = response.Content.ReadAsStringAsync().Result;
            //    Sucess = Convert.ToBoolean(SucessStrng);

            //}
            //return Sucess;

        }
        public decimal RecBalForMOnth(string accKy, string todate, string frmdate, int usrKy, int cKy, string EnvironmentName)
        {
            string actionUri = "RecBalForMonth";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();
            paramDictionary.Add("accKy", accKy);
            paramDictionary.Add("todate", todate);
            paramDictionary.Add("frmdate", frmdate);
            paramDictionary.Add("usrKy", usrKy);
            paramDictionary.Add("cKy", cKy);
            decimal Sucess = new decimal();
            object obj = RunApiOperation(
                BankrecBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                Sucess.GetType());
            Sucess = Convert.ToDecimal(obj);
            return Sucess;
        }

        public List<BankRecBalance> GetAllAccountBalances(string EnvironmentName, int cKy, int usrKy, string todate, string frmdate, string accKy)
        {
            string actionUri = "GetAllAccountBalancesApi";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();
            paramDictionary.Add("UsrKy", usrKy);
            paramDictionary.Add("CKy", cKy);
            paramDictionary.Add("Todate", todate);
            paramDictionary.Add("Frmdate", frmdate);
            paramDictionary.Add("AccKy", accKy);;
            List<BankRecBalance> list = new List<BankRecBalance>();
            list = RunApiOperation(
                BankrecBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as List<BankRecBalance>;
            return list;
        }
    }
}