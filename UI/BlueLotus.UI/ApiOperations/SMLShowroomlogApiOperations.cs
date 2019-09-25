using System;
using System.Collections.Generic;
using BlueLotus.ShowroomLog.Model.Entity;

namespace BlueLotus.UI.ApiOperations
{
    public partial class ApiOperation
    {
        private readonly string SMLShowroomLog_BaseURL = "api/SMLShowroomLog/";

        public List<ShowroomLogModel> PostSaveAction(string logDate, string logTime, string fname, string lname,
            string initials, string perEmail, string busEmail, string perTp, string busTp, string leadTypKy,
            string crnttVhl, string crnttVhlClr, string crnttVhlReg, string cusStatus, string salesPersonKy,
            string reson, string vhlIntMdlKy, string vhlIntSeriesKy, string actionKy, string custStatusKy,
            string comment, string nxtShdDate, string flwUpActionKy, string logtypKy, string objKy, int cKy, int usrKy, string AdrKy, UInt32 PrntKy,
            string environment)
        {
            var actionUri = "PostSaveAction";
            var paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("LogDate", logDate);
            paramDictionary.Add("LogTime", logTime);
            paramDictionary.Add("Fname", fname);
            paramDictionary.Add("Lname", lname);
            paramDictionary.Add("Initials", initials);
            paramDictionary.Add("PerEmail", perEmail);
            paramDictionary.Add("BusEmail", busEmail);
            paramDictionary.Add("PerTP", perTp);
            paramDictionary.Add("BusTP", busTp);
            paramDictionary.Add("LeadTypKy", leadTypKy);
            paramDictionary.Add("CrnttVhl", crnttVhl);
            paramDictionary.Add("CrnttVhlClr", crnttVhlClr);
            paramDictionary.Add("CrnttVhlReg", crnttVhlReg);
            paramDictionary.Add("cusStatus", cusStatus);
            paramDictionary.Add("SalesPersonKy", salesPersonKy);
            paramDictionary.Add("Reson", reson);
            paramDictionary.Add("VhlIntMdlKy", vhlIntMdlKy);
            paramDictionary.Add("VhlIntSeriesKy", vhlIntSeriesKy);
            paramDictionary.Add("ActionKy", actionKy);
            paramDictionary.Add("CustStatusKy", custStatusKy);
            paramDictionary.Add("Comment", comment);
            paramDictionary.Add("NxtShdDate", nxtShdDate);
            paramDictionary.Add("FlwUPActionKy", flwUpActionKy);
            paramDictionary.Add("logtypKy", logtypKy);
            paramDictionary.Add("objKy", objKy);
            paramDictionary.Add("cKy", cKy);
            paramDictionary.Add("usrKy", usrKy);
            paramDictionary.Add("AdrKy", AdrKy);
            paramDictionary.Add("PrntKy", PrntKy);
            var list = new List<ShowroomLogModel>();
            list = RunApiOperation(
                SMLShowroomLog_BaseURL,
                actionUri,
                environment,
                paramDictionary,
                list.GetType()) as List<ShowroomLogModel>;

            return list;
        }
        public List<ShowroomLogModel> PostUpdateAction(string logDate, string logTime, string fname, string lname, string initials, string perEmail, string busEmail, string perTp, string busTp, string leadTypKy, string crnttVhl, string crnttVhlClr, string crnttVhlReg, string cusStatus, string salesPersonKy, string reson, string vhlIntMdlKy, string vhlIntSeriesKy, string actionKy, string custStatusKy, string comment, string nxtShdDate, string flwUpActionKy, string logtypKy, string objKy, int cKy, int usrKy, string adrKy, string logDetKy, string environment)
        {
            var actionUri = "PostUpdateAction";
            var paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("LogDate", logDate);
            paramDictionary.Add("LogTime", logTime);
            paramDictionary.Add("Fname", fname);
            paramDictionary.Add("Lname", lname);
            paramDictionary.Add("Initials", initials);
            paramDictionary.Add("PerEmail", perEmail);
            paramDictionary.Add("BusEmail", busEmail);
            paramDictionary.Add("PerTP", perTp);
            paramDictionary.Add("BusTP", busTp);
            paramDictionary.Add("LeadTypKy", leadTypKy);
            paramDictionary.Add("CrnttVhl", crnttVhl);
            paramDictionary.Add("CrnttVhlClr", crnttVhlClr);
            paramDictionary.Add("CrnttVhlReg", crnttVhlReg);
            paramDictionary.Add("cusStatus", cusStatus);
            paramDictionary.Add("SalesPersonKy", salesPersonKy);
            paramDictionary.Add("Reson", reson);
            paramDictionary.Add("VhlIntMdlKy", vhlIntMdlKy);
            paramDictionary.Add("VhlIntSeriesKy", vhlIntSeriesKy);
            paramDictionary.Add("ActionKy", actionKy);
            paramDictionary.Add("CustStatusKy", custStatusKy);
            paramDictionary.Add("Comment", comment);
            paramDictionary.Add("NxtShdDate", nxtShdDate);
            paramDictionary.Add("FlwUPActionKy", flwUpActionKy);
            paramDictionary.Add("logtypKy", logtypKy);
            paramDictionary.Add("objKy", objKy);
            paramDictionary.Add("cKy", cKy);
            paramDictionary.Add("usrKy", usrKy);
            paramDictionary.Add("AdrKy", adrKy);
            paramDictionary.Add("logDetKy", logDetKy);

            var list = new List<ShowroomLogModel>();
            list = RunApiOperation(
                SMLShowroomLog_BaseURL,
                actionUri,
                environment,
                paramDictionary,
                list.GetType()) as List<ShowroomLogModel>;

            return list;
        }

        public List<ShowroomLogFindModel> ShowroomLogFindForm(string logTypKy, string trnNo, string frmDt, string toDt, int cKy, int usrKy, string environment)
        {
            var actionUri = "ShowroomLogFindForm";
            var paramDictionary = new Dictionary<string, object>();
            paramDictionary.Add("logTypKy", logTypKy);
            paramDictionary.Add("trnNo", trnNo);
            paramDictionary.Add("frmDt", frmDt);
            paramDictionary.Add("toDt", toDt);
            paramDictionary.Add("cKy", cKy);
            paramDictionary.Add("usrKy", usrKy);
            var list = new List<ShowroomLogFindModel>();
            list = RunApiOperation(
                SMLShowroomLog_BaseURL,
                actionUri,
                environment,
                paramDictionary,
                list.GetType()) as List<ShowroomLogFindModel>;

            return list;
        }

        public List<ShowroomLogModel> FindIsCurrentCust(string prsnlMobNu, string ofcMobNu, string fName, string lName, string initials, string objKy, int cKy, int usrKy, string environment)
        {
            var actionUri = "FindIsCurrentCust";
            var paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("prsnlMobNu", prsnlMobNu);
            paramDictionary.Add("ofcMobNu", ofcMobNu);
            paramDictionary.Add("fName", fName);
            paramDictionary.Add("lName", lName);
            paramDictionary.Add("initials", initials);
            paramDictionary.Add("objKy", objKy);
            paramDictionary.Add("cKy", cKy);
            paramDictionary.Add("usrKy", usrKy);
            var list = new List<ShowroomLogModel>();
            list = RunApiOperation(
                SMLShowroomLog_BaseURL,
                actionUri,
                environment,
                paramDictionary,
                list.GetType()) as List<ShowroomLogModel>;

            return list;
        }

        public List<ShowroomLogModel> GetLogDetail(string logDetKy, int cKy, int usrKy, string ObjKy, string environment)
        {
            var actionUri = "GetLogDetail";
            var paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("LogDetKy", logDetKy);
            paramDictionary.Add("Cky", cKy);
            paramDictionary.Add("UsrKy", usrKy);
            paramDictionary.Add("ObjKy", ObjKy);
            var list = new List<ShowroomLogModel>();
            list = RunApiOperation(
                SMLShowroomLog_BaseURL,
                actionUri,
                environment,
                paramDictionary,
                list.GetType()) as List<ShowroomLogModel>;

            return list;
        }


        public List<ShowroomLogFindModel> GetFallowUpFindForm(string logTypKy, string trnNo, string frmDt, string toDt, int cKy, int usrKy, string environment)
        {
            var actionUri = "GetFallowUpFindForm";
            var paramDictionary = new Dictionary<string, object>();
            paramDictionary.Add("logTypKy", logTypKy);
            paramDictionary.Add("trnNo", trnNo);
            paramDictionary.Add("frmDt", frmDt);
            paramDictionary.Add("toDt", toDt);
            paramDictionary.Add("cKy", cKy);
            paramDictionary.Add("usrKy", usrKy);
            var list = new List<ShowroomLogFindModel>();
            list = RunApiOperation(
                SMLShowroomLog_BaseURL,
                actionUri,
                environment,
                paramDictionary,
                list.GetType()) as List<ShowroomLogFindModel>;

            return list;
        }
    }
}