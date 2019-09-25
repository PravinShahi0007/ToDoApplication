using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using BlueLotus.ShowroomLog.Model.Entity;

namespace BlueLotus.UI.ApiOperations
{
    public partial class ApiOperation
    {   //
        // GET: /AddressApiOperation/
        private readonly string ProsPectPlanBaseUri = "api/ProspectPlan/";

        public List<SMLSaveModel> SMLProspectSaveAction(string objKy, string conCd, string ourCd, string adrKy, string fname, string sname, string intials, string perNu, string oficeNu, string perEmail, string oficeMail, string address, string currentCust, string crntVehi, string actionKy, string callSum, string flwActKy, string descriptin, string plnDate, string nextDate, int usrKy, int cKy, string LogTypKy, string EnvironmentName)
        {
            string actionUri = "SaveProsPectPlan";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();
            paramDictionary.Add("objKy", objKy);
            paramDictionary.Add("conCd", conCd);
            paramDictionary.Add("ourCd", ourCd);
            paramDictionary.Add("adrKy", adrKy);
            paramDictionary.Add("fname", fname);
            paramDictionary.Add("sname", sname);
            paramDictionary.Add("intials", intials);
            paramDictionary.Add("perNu", perNu);
            paramDictionary.Add("oficeNu", oficeNu);
            paramDictionary.Add("perEmail", perEmail);
            paramDictionary.Add("oficeMail", oficeMail);
            paramDictionary.Add("address", address);
            paramDictionary.Add("currentCust", currentCust);
            paramDictionary.Add("crntVehi", crntVehi);
            paramDictionary.Add("actionKy", actionKy);
            paramDictionary.Add("callSum", callSum);
            paramDictionary.Add("flwActKy", flwActKy);
            paramDictionary.Add("descriptin", descriptin);
            paramDictionary.Add("plnDate", plnDate);
            paramDictionary.Add("nextDate", nextDate);
            paramDictionary.Add("usrKy", usrKy);
            paramDictionary.Add("cKy", cKy);
            paramDictionary.Add("LogTypKy", LogTypKy);

            
            List<SMLSaveModel> list = new List<SMLSaveModel>();
            list = RunApiOperation(
                ProsPectPlanBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as List<SMLSaveModel>;
            return list;
        }

        public List<SMLSaveModel> SMLProspectUpdateAction(string logDetKy, string objKy, string conCd, string ourCd, string adrKy, string fname, string sname, string intials, string perNu, string oficeNu, string perEmail, string oficeMail, string address, string currentCust, string crntVehi, string actionKy, string callSum, string flwActKy, string descriptin, string plnDate, string nextDate, int usrKy, int cKy, string LogTypKy, string EnvironmentName)
        {
            string actionUri = "UpdateProsPectPlan";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();
            paramDictionary.Add("logDetKy", logDetKy);
            paramDictionary.Add("objKy", objKy);
            paramDictionary.Add("conCd", conCd);
            paramDictionary.Add("ourCd", ourCd);
            paramDictionary.Add("adrKy", adrKy);
            paramDictionary.Add("fname", fname);
            paramDictionary.Add("sname", sname);
            paramDictionary.Add("intials", intials);
            paramDictionary.Add("perNu", perNu);
            paramDictionary.Add("oficeNu", oficeNu);
            paramDictionary.Add("perEmail", perEmail);
            paramDictionary.Add("oficeMail", oficeMail);
            paramDictionary.Add("address", address);
            paramDictionary.Add("currentCust", currentCust);
            paramDictionary.Add("crntVehi", crntVehi);
            paramDictionary.Add("actionKy", actionKy);
            paramDictionary.Add("callSum", callSum);
            paramDictionary.Add("flwActKy", flwActKy);
            paramDictionary.Add("descriptin", descriptin);
            paramDictionary.Add("plnDate", plnDate);
            paramDictionary.Add("nextDate", nextDate);
            paramDictionary.Add("usrKy", usrKy);
            paramDictionary.Add("cKy", cKy);
            paramDictionary.Add("LogTypKy", LogTypKy);

            List<SMLSaveModel> list = new List<SMLSaveModel>();
            list = RunApiOperation(
                ProsPectPlanBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as List<SMLSaveModel>;
            return list;
        }

        public List<ShowroomLogFindModel> SMLProspectFindForm(string logTypKy, string trnNo, string frmDt, string toDt, int cKy, int usrKy, string EnvironmentName)
        {
            string actionUri = "FindProsPectPlan";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();
            paramDictionary.Add("logTypKy", logTypKy);
            paramDictionary.Add("trnNo", trnNo);
            paramDictionary.Add("frmDt", frmDt);
            paramDictionary.Add("toDt", toDt);
            paramDictionary.Add("cKy", cKy);
            paramDictionary.Add("usrKy", usrKy);

            List<ShowroomLogFindModel> list = new List<ShowroomLogFindModel>();
            list = RunApiOperation(
                ProsPectPlanBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as List<ShowroomLogFindModel>;
            return list;
        }

        public List<ProspectCallModel> SMLProspectDetail(string logDetKy, int cKy, int usrKy, string objKy, string EnvironmentName)
        {
            string actionUri = "SelectProsPectPlan";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();
            paramDictionary.Add("logDetKy", logDetKy);
            paramDictionary.Add("cKy", cKy);
            paramDictionary.Add("usrKy", usrKy);
            paramDictionary.Add("objKy", objKy);

            List<ProspectCallModel> list = new List<ProspectCallModel>();
            list = RunApiOperation(
                ProsPectPlanBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as List<ProspectCallModel>;
            return list;
        }
    }
}