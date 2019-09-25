using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using BlueLotus.BankReconciliation.Model.Entity;
using BlueLotus.PaymentShedule.Model;
using BlueLotus.Payment.Model.Entity;
using System.Web.Script.Serialization;

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

        public bool InsertPaymentShedule(int ObjKy, int CKy, int UsrKy, int TrnKy, string EnvermentName, string GridArray)
        {
            string actionUri = "InsertPaymentShedule";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("ObjKy", ObjKy);
            paramDictionary.Add("TrnKy", TrnKy);
            paramDictionary.Add("GridArray", GridArray);

            bool Sucess = new bool();
            object obj = RunApiOperation(PaymentSheduleUri, actionUri, EnvermentName, paramDictionary, Sucess.GetType());
            Sucess = Convert.ToBoolean(obj);
            return Sucess;

        }

        public List<PayMoTrnHdrDetails> InsertIntoTrnHdr(int TrnTypKy, string TrnDt, int CrnKy, int PrjKy, int BUKy, string OurCd, string ObjKy, int CKy, int UsrKy, string ConCord, string EnvironmentName)
        {
            string actionUri = "InsertHdr";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();
            paramDictionary.Add("TrnTypKy", TrnTypKy);
            paramDictionary.Add("TrnDt", TrnDt);
            paramDictionary.Add("CrnKy", CrnKy);
            paramDictionary.Add("PrjKy", PrjKy);
            paramDictionary.Add("BUKy", BUKy);
            paramDictionary.Add("OurCd", OurCd);
            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("ConCord", ConCord);
            paramDictionary.Add("ObjKy", ObjKy);

            List<PayMoTrnHdrDetails> list = new List<PayMoTrnHdrDetails>();
            list = RunApiOperation(
                PaymentSheduleUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as List<PayMoTrnHdrDetails>;
            return list;
        }
        public List<PayMoTrnHdrDetails> UpdateIntoTrnHdr(int TrnKy, string TrnDt, int CrnKy, int PrjKy, int BUKy, string OurCd, string ObjKy, int CKy, int UsrKy, string ConCord, string EnvironmentName)
        {
            string actionUri = "UpdateHdr";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();
            paramDictionary.Add("TrnKy", TrnKy);
            paramDictionary.Add("TrnDt", TrnDt);
            paramDictionary.Add("CrnKy", CrnKy);
            paramDictionary.Add("PrjKy", PrjKy);
            paramDictionary.Add("BUKy", BUKy);
            paramDictionary.Add("OurCd", OurCd);
            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("ConCord", ConCord);
            paramDictionary.Add("ObjKy", ObjKy);

            List<PayMoTrnHdrDetails> list = new List<PayMoTrnHdrDetails>();
            list = RunApiOperation(
                PaymentSheduleUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as List<PayMoTrnHdrDetails>;
            return list;
        }
        public bool InsertGridIntoAccTrn(int TrnKy, string InsertGrid, string OurCd, int ObjKy, int UsrKy, int Cky, int CrnKy, int TrnTypKy, string EftvDt, string EnvironmentName)
        {
            int InsertFinished = 0;
            var NewRecordLength = 0;
            if (InsertGrid != "[]" && InsertGrid != "[null]" && InsertGrid != "")
            {
                PaymentSheduleGridModel[] NewInserGrid = new JavaScriptSerializer().Deserialize<PaymentSheduleGridModel[]>(InsertGrid);
                NewRecordLength = NewInserGrid.Length;



                for (int i = 0; i < NewInserGrid.Length; i++)
                {
                    var LiNo = i + 1;
                    string actionUri = "InsertGridIntoAccTrn";
                    Dictionary<string, object> paramDictionary = new Dictionary<string, object>();
                    string NewPaymentSheduleString = new JavaScriptSerializer().Serialize(NewInserGrid[i]);

                    paramDictionary.Add("TrnKy", TrnKy);
                    paramDictionary.Add("AccTrnGrid", NewPaymentSheduleString);
                    paramDictionary.Add("Cky", Cky);
                    paramDictionary.Add("UsrKy", UsrKy);
                    paramDictionary.Add("OurCd", OurCd);
                    paramDictionary.Add("ObjKy", ObjKy);
                    paramDictionary.Add("TrnCrnKy", CrnKy);
                    paramDictionary.Add("TrnTypKy", TrnTypKy);
                    paramDictionary.Add("LiNo", LiNo);
                    paramDictionary.Add("EftvDt", EftvDt);

                    long Sucess = new long();
                    object obj = RunApiOperation(
                        PaymentSheduleUri,
                        actionUri,
                        EnvironmentName,
                        paramDictionary,
                        Sucess.GetType());
                    Sucess = Convert.ToInt64(obj);
                    InsertFinished++;
                }
            }
            if (InsertFinished == NewRecordLength)
            {
                return true;

            }
            else
            {
                return false;

            }
        }




        public bool UpdateGridIntoAccTrn(int TrnKy, string UpdateGrid, string OurCd, int ObjKy, int UsrKy, int Cky, int CrnKy, int TrnTypKy, string EftvDt, string EnvironmentName)
        {
            int InsertFinished = 0;
            var NewRecordLength = 0;
            if (UpdateGrid != "[]" && UpdateGrid != "[null]" && UpdateGrid != "")
            {
                PaymentSheduleGridModel[] NewInserGrid = new JavaScriptSerializer().Deserialize<PaymentSheduleGridModel[]>(UpdateGrid);
                NewRecordLength = NewInserGrid.Length;



                for (int i = 0; i < NewInserGrid.Length; i++)
                {
                    var LiNo = i + 1;
                    string actionUri = "UpdateGridIntoAccTrn";
                    Dictionary<string, object> paramDictionary = new Dictionary<string, object>();
                    string NewPaymentSheduleString = new JavaScriptSerializer().Serialize(NewInserGrid[i]);

                    paramDictionary.Add("TrnKy", TrnKy);
                    paramDictionary.Add("AccTrnGrid", NewPaymentSheduleString);
                    paramDictionary.Add("Cky", Cky);
                    paramDictionary.Add("UsrKy", UsrKy);
                    paramDictionary.Add("OurCd", OurCd);
                    paramDictionary.Add("ObjKy", ObjKy);
                    paramDictionary.Add("TrnCrnKy", CrnKy);
                    paramDictionary.Add("TrnTypKy", TrnTypKy);
                    paramDictionary.Add("LiNo", LiNo);
                    paramDictionary.Add("EftvDt", EftvDt);

                    long Sucess = new long();
                    object obj = RunApiOperation(
                        PaymentSheduleUri,
                        actionUri,
                        EnvironmentName,
                        paramDictionary,
                        Sucess.GetType());
                    Sucess = Convert.ToInt64(obj);
                    InsertFinished++;
                }
            }
            if (InsertFinished == NewRecordLength)
            {
                return true;

            }
            else
            {
                return false;

            }
        }

        public bool PaymentShedulePosting(int TrnKy, int ObjKy,int  UserKy,int  Cky, string EnvironmentName)
        {
            string actionUri = "PaymentShedulePosting";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();
            paramDictionary.Add("TrnKy", TrnKy);
            paramDictionary.Add("CKy", Cky);
            paramDictionary.Add("UsrKy", UserKy);
            paramDictionary.Add("ObjKy", ObjKy);

            bool ApiOpRetun = new bool();
            object obj = RunApiOperation(PaymentSheduleUri,
                actionUri, EnvironmentName, paramDictionary,
                ApiOpRetun.GetType());
            ApiOpRetun = Convert.ToBoolean(obj);

            return ApiOpRetun;
        }

    }
}
