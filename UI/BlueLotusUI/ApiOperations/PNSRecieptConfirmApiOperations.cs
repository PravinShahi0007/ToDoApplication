using System;
using System.Collections.Generic;
using BlueLotus.PNSCollection.Model.PNSConfirmation;

namespace BlueLotus.UI.ApiOperations
{
    public partial class ApiOperation
    {
        private string PNSReciptConfirm = "api/PNSReciptConfirm/";

        public List<PNSReciptReconModel> PNSReciptConfirmLoad(int CKy, int UsrKy, string FromDate, string Todate,
            string CordinatorKy, string IsCash, string BankLookKy, string EnvironmentName)
        {
            var actionUri = "PNSReciptConfirmLoad";
            var paramDictionary = new Dictionary<string, object>();
            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("FromDate", FromDate);
            paramDictionary.Add("Todate", Todate);
            paramDictionary.Add("CordinatorKy", CordinatorKy);
            paramDictionary.Add("IsCash", IsCash);
            paramDictionary.Add("BankLookKy", BankLookKy);
            var list = new List<PNSReciptReconModel>();
            list = RunApiOperation(
                PNSReciptConfirm,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as List<PNSReciptReconModel>;
            return list;
        }

        public bool PNSCordiConfirmPayment(int cKy, int usrKy, string updatedRecords, string EnvironmentName)
        {
            var response =
                httpClient.GetAsync(GetUriWithEnvironment(EnvironmentName,
                    "api/PNSReciptConfirm/PNSCordiConfirmPayment?cKy=" + cKy + "&usrKy=" + usrKy + "&updatedRecords=" +
                    updatedRecords + "&EnvironmentName=" + EnvironmentName)).Result;
            var sucess = false;
            if (response.IsSuccessStatusCode)
            {
                var Balance = response.Content.ReadAsStringAsync().Result;
                sucess = Convert.ToBoolean(Balance);
            }
            return sucess;
        }
    }
}