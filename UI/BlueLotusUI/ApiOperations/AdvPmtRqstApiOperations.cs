using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using BlueLotus.AdvPmtReqst.Model;

namespace BlueLotus.UI.ApiOperations
{
    public partial class ApiOperation
    {
        string AdvPmtRqstBaseUri = "api/AdvPmtRqst/";
        //
        // GET: /AdvPmtRqst/

        public List<AdvPmtModel.AdvPmtRqstHdrModel> AdvPmtRqstInsertUpdate(string EnvironmentName, int CKy, int UsrKy, string PrjKy, string BuKy, string VauDate, string newRecords, string updateRecords,string  ourCode, string concord, string ObjKy,string DocNu)
        {
            string actionUri = "AdvPmtRqstInsertUpdate";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("PrjKy", PrjKy);
            paramDictionary.Add("BuKy", BuKy);
            paramDictionary.Add("VauDate", VauDate);
            paramDictionary.Add("newRecords", newRecords);
            paramDictionary.Add("updateRecords", updateRecords);
            paramDictionary.Add("ourCode", ourCode);
            paramDictionary.Add("concord", concord);
            paramDictionary.Add("ObjKy", ObjKy);
            paramDictionary.Add("DocNu", DocNu);

            List<AdvPmtModel.AdvPmtRqstHdrModel> list = new List<AdvPmtModel.AdvPmtRqstHdrModel>();
            list = RunApiOperation(
                AdvPmtRqstBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as List<AdvPmtModel.AdvPmtRqstHdrModel>;
            return list;

        }


    }
}
