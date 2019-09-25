using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TransactionModel.Entity;

namespace BlueLotus.UI.ApiOperations
{
    public partial class ApiOperation
    {
        string EditButtonBaseUri = "api/EditButton/";
        public TransactionLockStatus EditButtonlockValidation(int CKy, int UsrKy, int OrdKy, string EnvironmentName, string TblNm)
        {
            string actionUri = "IsTransactionLocked";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();
            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("OrdKy", OrdKy);
            paramDictionary.Add("TableNm", TblNm);

            TransactionLockStatus RetunResult = new TransactionLockStatus();
            RetunResult = RunApiOperation(
                  EditButtonBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                RetunResult.GetType()) as TransactionLockStatus;

            return RetunResult;
        }

        public bool OrdHdr_UnlockWeb(int CKy, int UsrKy, int OrdKy, string EnvironmentName, string TblNm)
        {
            string actionUri = "TransactionUnlock";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();
            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("OrdKy", OrdKy);
            paramDictionary.Add("TableNm", TblNm);
            bool Result = new bool();
            object RetunResult = new object();
            RetunResult = RunApiOperation(
                EditButtonBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                RetunResult.GetType());
            Result = Convert.ToBoolean(RetunResult);
            return Result;
        }
    }
}