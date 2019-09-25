using BlueLotus.LoanTransaction_Model.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BlueLotus.UI.ApiOperations
{
    public partial class ApiOperation
    {
        string BaseUri = "api/LoanTransaction/";
        internal bool EmpMasCdDt_InsertWeb(int CKy, int UsrKy, int EmpKy, string EftvDt, string GvnDt, string LoanType, int InstAmt, int LoanAmount,string BnkNm, string BrnNm, int AccNo, int NoOfInst, int TtlPay, int IntrRate,int IntrAmt,int IntrTyp,string EnvironmentName)
        {
            bool rest = false;

            string actionUri = "EmpMasCdDt_InsertWeb";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("EmpKy", EmpKy);
            paramDictionary.Add("EftvDt", EftvDt);
            paramDictionary.Add("GvnDt", GvnDt);
            paramDictionary.Add("LoanType", LoanType);
            paramDictionary.Add("InstAmt", InstAmt);
            paramDictionary.Add("LoanAmount", LoanAmount);
            paramDictionary.Add("BnkNm", BnkNm);
            paramDictionary.Add("BrnNm", BrnNm);
            paramDictionary.Add("AccNo", AccNo);
            paramDictionary.Add("NoOfInst", NoOfInst);
            paramDictionary.Add("TtlPay", TtlPay);
            paramDictionary.Add("IntrRate", IntrRate);
            paramDictionary.Add("IntrAmt", IntrAmt);
            paramDictionary.Add("IntrTyp", IntrTyp);

            object list = new object();
            list = RunApiOperation(
                BaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                rest.GetType()) as object;

            rest = Convert.ToBoolean(list);

            return rest;
        }

        internal List<LoanTranModel> Loan_SearchSelectWeb(int CKy, int UsrKy, int EmpKy, string EftvDt, string LnTyp, string EnvironmentName)
        {

            string actionUri = "Loan_SearchSelectWeb";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("EmpKy", EmpKy);
            paramDictionary.Add("EftvDt", EftvDt);
            paramDictionary.Add("LnTyp", LnTyp);

            List<LoanTranModel> list = new List<LoanTranModel>();
            list = RunApiOperation(
                BaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as List<LoanTranModel>;

            return list;
        }
    }
}