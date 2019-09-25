using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using BlueLotus.BankReconciliation.Model.Entity;
using BlueLotus.PaymentShedule.Model;

//using BlueLotus.PaymentShedule.Model;

namespace BlueLotus.UI.ApiOperations
{
    public partial class ApiOperation
    {
        string PaymentSheduleUri = "api/PaymentShedule/";
        public List<PaymentSheduleGridModel> PaymentSheduleGridSelect(string EnvironmentName, int CKy, int UsrKy, string ObjKy, string AccKy, string Date, string BUKy, string PrjKy)
        {           
            string actionUri = "PaymentSheduleGridSlect";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("ObjKy", ObjKy);
            paramDictionary.Add("AccKy", AccKy);
            paramDictionary.Add("Date", Date);
            paramDictionary.Add("BUKy", BUKy);
            paramDictionary.Add("PrjKy", PrjKy);

            List<PaymentSheduleGridModel> list = new List<PaymentSheduleGridModel>();
            list = RunApiOperation(
                PaymentSheduleUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as List<PaymentSheduleGridModel>;
            return list;
        }

    }
}