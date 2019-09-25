using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Budget.Model;

namespace BlueLotus.UI.ApiOperations
{
    public partial class ApiOperation
    {
        private readonly string BudgetBaseUri = "api/Budget/";


        public List<BudgetModelSet> GetAccBjtDetails(string EnvironmentName, int CKy, int UsrKy, string hdrData, string ObjKy)
        {

            var actionUri = "GetAccBudgetData";
            var paramDictionary = new Dictionary<string, object>();
            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("hdrData", hdrData);
            paramDictionary.Add("ObjKy", ObjKy);
            List<BudgetModelSet> list = new List<BudgetModelSet>();
            list = RunApiOperation(
                BudgetBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as List<BudgetModelSet>;
            return list;
        }

        public BudgetModelSet InsertUpdate(string EnvironmentName, int cKy, int usrKy, string insertedRecord, string updatedRecord, string objKy,string AccBgtTypKy)
        {
            var actionUri = "InsertUpdateAccBudgetData";
            var paramDictionary = new Dictionary<string, object>();
            paramDictionary.Add("CKy", cKy);
            paramDictionary.Add("UsrKy", usrKy);
            paramDictionary.Add("insertedRecord", insertedRecord);
            paramDictionary.Add("updatedRecord", updatedRecord);
            paramDictionary.Add("AccBgtTypKy", AccBgtTypKy);
            paramDictionary.Add("ObjKy", objKy);
            BudgetModelSet list = new BudgetModelSet();
            list = RunApiOperation(
                BudgetBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as BudgetModelSet;
            return list;
        }
    }
}