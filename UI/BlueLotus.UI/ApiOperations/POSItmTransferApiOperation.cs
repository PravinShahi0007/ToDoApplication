using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TransactionModel.Entity;

namespace BlueLotus.UI.ApiOperations
{
    public partial class ApiOperation
    {
        string ItmTransferBaseUri = "api/POSItmTransfer/";

        internal List<ItemTransferDataModel> GetItemByCodeEAN(string Environment, int UsrKy, int CKy, string ItmCode, string EAN)
        {
            string actionUri = "GetItemByCodeEAN";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();
            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("ItmCode", ItmCode);
            paramDictionary.Add("EAN", EAN);

            List<ItemTransferDataModel> List = new List<ItemTransferDataModel>();
            List = RunApiOperation(
                ItmTransferBaseUri,
                actionUri,
                Environment,
                paramDictionary,
                List.GetType()) as List<ItemTransferDataModel>;

            return List;
        }

        internal long InsertTrnHdr(string Environment, int CKy, int UsrKy, string OurCdFrm, string ConCd, string Date, string LocKy, long HdrTrfLnkKy, int ObjKy)
        {
            string actionUri = "InsertTrnHdr";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();
            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("OurCdFrm", OurCdFrm);
            paramDictionary.Add("ConCd", ConCd);
            paramDictionary.Add("Date", Date);
            paramDictionary.Add("LocKy", LocKy);
            paramDictionary.Add("HdrTrfLnkKy", HdrTrfLnkKy);
            paramDictionary.Add("IsApr", 1);
            paramDictionary.Add("ObjKy", ObjKy);
            


            long TrnKy = new long();
            object ret = RunApiOperation(
                ItmTransferBaseUri,
                actionUri,
                Environment,
                paramDictionary,
                TrnKy.GetType());


            TrnKy = Convert.ToInt64(ret);
            return TrnKy;
        }

        internal string GetItemTrnsferNo(string Environment, int UsrKy, string OurCd, int CKy)
        {
            string actionUri = "GetItemTrnsferNo";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();
            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("OurCd", OurCd);

            long TrnKy = new long();
            object ret = RunApiOperation(
                ItmTransferBaseUri,
                actionUri,
                Environment,
                paramDictionary,
                TrnKy.GetType());


            TrnKy = Convert.ToInt64(ret);
            return TrnKy.ToString();
        }

        internal List<ItemTransferDataModel> GetItemTrnsferDetails(string Environment, int CKy, int UsrKy, string Date, string OurCd, int FromLocKy)
        {
            string actionUri = "GetItemTrnsferDetails";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();
            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("Date", Date);
            paramDictionary.Add("OurCd", OurCd);
            paramDictionary.Add("FromLocKy", FromLocKy);

            List<ItemTransferDataModel> List = new List<ItemTransferDataModel>();
            List = RunApiOperation(
                ItmTransferBaseUri,
                actionUri,
                Environment,
                paramDictionary,
                List.GetType()) as List<ItemTransferDataModel>;

            return List;
        }
        internal  List<ItemTransferDataModel> GetItemTrnsferItmDetails(string Environment, int CKy, int UsrKy, string TrnKy)
        {
            string actionUri = "GetItemTrnsferItmDetails";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();
            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("TrnKy", TrnKy);

            List<ItemTransferDataModel> List = new List<ItemTransferDataModel>();
            List = RunApiOperation(
                ItmTransferBaseUri,
                actionUri,
                Environment,
                paramDictionary,
                List.GetType()) as List<ItemTransferDataModel>;

            return List;
        }
        internal List<ItemTransferDataModel> UpdateTransferStatus(string Environment, int CKy, int UsrKy, string TrnKy, string ConCd, string OurCd, int ObjKy)
        {
            string actionUri = "UpdateTransferStatus";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();
            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("TrnKy", TrnKy);
            paramDictionary.Add("ConCd", ConCd);
            paramDictionary.Add("OurCd", OurCd);
            paramDictionary.Add("ObjKy", ObjKy);

            List<ItemTransferDataModel> List = new List<ItemTransferDataModel>();
            List = RunApiOperation(
                ItmTransferBaseUri,
                actionUri,
                Environment,
                paramDictionary,
                List.GetType()) as List<ItemTransferDataModel>;

            return List;
        }
    }
}