using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Runtime.Serialization.Json;
using System.Text;
using System.Web;
using BlueLotus.PNSCollection.Model.PNSCordinatorDeposti;

namespace BlueLotus.UI.ApiOperations
{
    public partial class ApiOperation
    {
        string PNSCordinatorDepositUri = "api/PNSCordinatorDeposit/";

        public decimal PNSCordinatorBalanceInHand(string EnvironmentName, int cKy, int usrKy)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/PNSCordinatorDeposit/PNSCordinatorBalanceInHand?cKy=" + cKy + "&usrKy=" + usrKy)).Result;
            decimal PNSCordinatorBalanceInHand = 0;
            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                PNSCordinatorBalanceInHand = Convert.ToDecimal(jstr);
            }
            return PNSCordinatorBalanceInHand;
        }

        public decimal NonRecBalance(string EnvironmentName, int cKy, int usrKy)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/PNSCordinatorDeposit/NonRecBalance?cKy=" + cKy + "&usrKy=" + usrKy)).Result;
            decimal NonRecBal = 0;
            if (response.IsSuccessStatusCode)
            {
                string Balance = response.Content.ReadAsStringAsync().Result;
                NonRecBal = Convert.ToDecimal(Balance);
            }
            return NonRecBal;
        }

        //int cKy, int usrKy, string SBuKy, string DepDate, string BankKy, string environmentName
        public decimal CashBalance(int cKy, int usrKy, string sBuKy, string depDate, string bankKy, string EnvironmentName)
        {
            //int cKy, int usrKy, string SBuKy, string DepDate, string BankKy, string environmentName
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/PNSCordinatorDeposit/CashBalance?cKy=" + cKy + "&usrKy=" + usrKy + "&SBuKy=" + sBuKy + "&DepDate=" + depDate + "&BankKy=" + bankKy)).Result;
            decimal CashBalance = 0;
            if (response.IsSuccessStatusCode)
            {
                string Balance = response.Content.ReadAsStringAsync().Result;
                CashBalance = Convert.ToDecimal(Balance);
            }
            return CashBalance;
        }

        public List<BankModel> PNSCompanyLookup(int CKy, int UsrKy, string EnvironmentName)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/PNSCordinatorDeposit/PNSCompanyLookup?CKy=" + CKy + "&UsrKy=" + UsrKy )).Result;
            List<BankModel> PNSCompanyList = new List<BankModel>();
            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<BankModel>));
                List<BankModel> deserializeditems = new List<BankModel>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<BankModel>;
                PNSCompanyList = deserializeditems;
            }
            return PNSCompanyList;
        }

        public List<AccountModel> BankLookup(int cKy, int usrKy, string buKy, string EnvironmentName)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/PNSCordinatorDeposit/BankLookup?CKy=" + cKy + "&UsrKy=" + usrKy + "&buKy=" + buKy)).Result;
            List<AccountModel> PNSBankLookupList = new List<AccountModel>();
            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<AccountModel>));
                List<AccountModel> deserializeditems = new List<AccountModel>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<AccountModel>;
                PNSBankLookupList = deserializeditems;
            }
            return PNSBankLookupList;
        }

 

        public List<PNSBanKChqueModel> GetPNSDepositChqueList(int cKy, int usrKy, string sBuKy, string depDate, string bankKy, string EnvironmentName)
        {
            string actionUri = "GetPNSDepositChqueList";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();
            paramDictionary.Add("cKy", cKy);
            paramDictionary.Add("usrKy", usrKy);
            paramDictionary.Add("sBuKy", sBuKy);
            paramDictionary.Add("depDate", depDate);
            paramDictionary.Add("bankKy", bankKy);

            List<PNSBanKChqueModel> list = new List<PNSBanKChqueModel>();
            list = RunApiOperation(
                PNSCordinatorDepositUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as List<PNSBanKChqueModel>;
            return list;
        }

        public List<DepositSaveDetails> DepositcashandCheque(int cKy, int usrKy, string sBuKy, string depDate, string bankKy, string cashAmt, string conCord, string ourCode, string refNo,string InsertChq, string EnvironmentName)
        {
            string actionUri = "PNSDepositcashandCheque";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();
            paramDictionary.Add("cKy", cKy);
            paramDictionary.Add("usrKy", usrKy);
            paramDictionary.Add("sBuKy", sBuKy);
            paramDictionary.Add("depDate", depDate);
            paramDictionary.Add("bankKy", bankKy);
            paramDictionary.Add("cashAmt", cashAmt);
            paramDictionary.Add("conCord", conCord);
            paramDictionary.Add("ourCode", ourCode);
            paramDictionary.Add("refNo", refNo); 
            paramDictionary.Add("InsertChq", InsertChq); 

            List<DepositSaveDetails> list = new List<DepositSaveDetails>();
            list = RunApiOperation(
                PNSCordinatorDepositUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as List<DepositSaveDetails>;
            return list;
        }
    }
}