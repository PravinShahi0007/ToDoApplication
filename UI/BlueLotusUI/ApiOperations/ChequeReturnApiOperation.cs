using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using BlueLotus.ChequeReturn.Model;
using BlueLotus.UI.Models;
using BlueLotus.ViewModel.Entity;

namespace BlueLotus.UI.ApiOperations
{
    public partial class ApiOperation
    {

        private readonly string ChequeRtnBaseUri = "api/ChequeRtn/";

        public ChqueReturn ChequeDetailReturn(string EnvironmentName, int CKy, int UsrKy, string DataString,string ObjKy)
        {
            var actionUri = "ChequeDetailReturn";
            var paramDictionary = new Dictionary<string, object>();
            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("ObjKy", ObjKy);
            paramDictionary.Add("JsonString", DataString);
            ChqueReturn Data = new ChqueReturn();
            Data = RunApiOperation(
                ChequeRtnBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                Data.GetType()) as ChqueReturn;
            return Data;
        }

        public CheqSaveDetail ChequeReturnInsert(string EnvironmentName, int CKy, int UsrKy, string Lino1, string Lino2, bool isUpdate,string trntypKy,string objKy)
        {
       
            var actionUri = "ChequeInsert";
            var paramDictionary = new Dictionary<string, object>();
            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("ObjKy", objKy);
            paramDictionary.Add("Lino1", Lino1);
            paramDictionary.Add("Lino2", Lino2);
            paramDictionary.Add("trntypKy", trntypKy);

            CheqSaveDetail list = new CheqSaveDetail();
            list = RunApiOperation(
                ChequeRtnBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as CheqSaveDetail;
            return list;
        }

        public List<JournalFindModel> ChequeRetrunFind(string EnvironmentName, int CKy, int UsrKy,string TrnTypKy,string FrmDate,string ToDdate,string ObjKy)
        {
            var actionUri = "ChequeRtnFind";
            var paramDictionary = new Dictionary<string, object>();
            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("TrnTypKy", TrnTypKy);
            paramDictionary.Add("FrmDate", FrmDate);
            paramDictionary.Add("ToDdate", ToDdate);
            paramDictionary.Add("ObjKy", ObjKy);

            List<JournalFindModel> list = new List<JournalFindModel>();
            list = RunApiOperation(
                ChequeRtnBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as List<JournalFindModel>;
            return list;
        }

        public List<ChqueReturn> ChequeRetrunSelect(string EnvironmentName, int CKy, int UsrKy, string TrnKy,string ObjKy)
        {
            
            var actionUri = "ChequeRtnSelect";
            var paramDictionary = new Dictionary<string, object>();
            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("TrnKy", TrnKy);
            paramDictionary.Add("ObjKy", ObjKy);
            List<ChqueReturn> list = new List<ChqueReturn>();
            list = RunApiOperation(
                ChequeRtnBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as List<ChqueReturn>;
            return list;
        }
        public CheqSaveDetail ChequeRetrunUpdate(int CKy, int UsrKy, string ObjKy, string Lino1, string Lino2, string TrnKy, string EnvironmentName)
        {
            
            var actionUri = "ChequeUpdate";
            var paramDictionary = new Dictionary<string, object>();
            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("TrnKy", TrnKy);
            paramDictionary.Add("ObjKy", ObjKy);
            paramDictionary.Add("Lino1", Lino1);
            paramDictionary.Add("Lino2", Lino2);
            CheqSaveDetail Obj = new CheqSaveDetail();
            Obj = RunApiOperation(
                ChequeRtnBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                Obj.GetType()) as CheqSaveDetail;
            return Obj;
        }

    }
}