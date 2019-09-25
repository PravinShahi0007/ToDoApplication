using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using BlueLotus.ShowroomLog.Model.Entity;

namespace BlueLotus.UI.ApiOperations
{

    public partial class ApiOperation
    {
        //
        // GET: /AddressApiOperation/
        private readonly string DemoDrivngBaseUri = "api/SmlDemoDrive/";

        public List<DemoDrivingModel> DemoDriveSaveAction(string objKy, string conCd, string ourCd, string adrKy, string drivingDate, string drvngTime, string intVehical, string slsPrsnKy, string comments, string nxtShdueDate, string flwUpAction, string demoLogYes, string feedbackYes, string gatePassYes, int cKy, int usrKy,string logtypKy, string Fname, string Lname, string Initials, string PerEmail, string BusEmail, string persnalTp, string OfceTp, string EnvironmentName)
        {
            string actionUri = "SaveDemoDrive";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();
            paramDictionary.Add("objKy", objKy);
            paramDictionary.Add("conCd", conCd);
            paramDictionary.Add("ourCd", ourCd);
            paramDictionary.Add("adrKy", adrKy);
            paramDictionary.Add("drivingDate", drivingDate);
            paramDictionary.Add("drvngTime", drvngTime);
            paramDictionary.Add("intVehical", intVehical);
            paramDictionary.Add("slsPrsnKy", slsPrsnKy);
            paramDictionary.Add("comments", comments);
            paramDictionary.Add("nxtShdueDate", nxtShdueDate);
            paramDictionary.Add("flwUpAction", flwUpAction);
            paramDictionary.Add("demoLogYes", demoLogYes);
            paramDictionary.Add("feedbackYes", feedbackYes);
            paramDictionary.Add("gatePassYes", gatePassYes);
            paramDictionary.Add("cKy", cKy);
            paramDictionary.Add("usrKy", usrKy);
            paramDictionary.Add("logtypKy", logtypKy);
            paramDictionary.Add("Fname", Fname);
            paramDictionary.Add("Lname", Lname);
            paramDictionary.Add("Initials", Initials);
            paramDictionary.Add("PerEmail", PerEmail);
            paramDictionary.Add("BusEmail", BusEmail);
            paramDictionary.Add("persnalTp", persnalTp);
            paramDictionary.Add("OfceTp", OfceTp);

            List<DemoDrivingModel> list = new List<DemoDrivingModel>();
            list = RunApiOperation(
                DemoDrivngBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as List<DemoDrivingModel>;
            return list;
        }

        public List<DemoDrivingModel> UpdateAction(string logKy, string objKy, string conCd, string ourCd, string adrKy, string drivingDate, string drvngTime, string intVehical, string slsPrsnKy, string comments, string nxtShdueDate, string flwUpAction, string demoLogYes, string feedbackYes, string gatePassYes, int cKy, int usrKy,string logtypKy, string Fname, string Lname, string Initials, string PerEmail, string BusEmail, string persnalTp, string OfceTp, string EnvironmentName)
        {
            string actionUri = "UpdateDemoDrive";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();
            paramDictionary.Add("logKy", logKy);
            paramDictionary.Add("objKy", objKy);
            paramDictionary.Add("conCd", conCd);
            paramDictionary.Add("ourCd", ourCd);
            paramDictionary.Add("adrKy", adrKy);
            paramDictionary.Add("drivingDate", drivingDate);
            paramDictionary.Add("drvngTime", drvngTime);
            paramDictionary.Add("intVehical", intVehical);
            paramDictionary.Add("slsPrsnKy", slsPrsnKy);
            paramDictionary.Add("comments", comments);
            paramDictionary.Add("nxtShdueDate", nxtShdueDate);
            paramDictionary.Add("flwUpAction", flwUpAction);
            paramDictionary.Add("demoLogYes", demoLogYes);
            paramDictionary.Add("feedbackYes", feedbackYes);
            paramDictionary.Add("gatePassYes", gatePassYes);
            paramDictionary.Add("cKy", cKy);
            paramDictionary.Add("usrKy", usrKy);
            paramDictionary.Add("logtypKy", logtypKy);
            paramDictionary.Add("Fname", Fname);
            paramDictionary.Add("Lname", Lname);
            paramDictionary.Add("Initials", Initials);
            paramDictionary.Add("PerEmail", PerEmail);
            paramDictionary.Add("BusEmail", BusEmail);
            paramDictionary.Add("persnalTp", persnalTp);
            paramDictionary.Add("OfceTp", OfceTp);

            List<DemoDrivingModel> list = new List<DemoDrivingModel>();
            list = RunApiOperation(
                DemoDrivngBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as List<DemoDrivingModel>;
            return list;
        }

        public List<ShowroomLogFindModel> DemoDriveLogFindForm(string logTypKy, string trnNo, string frmDt, string toDt, int cKy, int usrKy, string environment)
        {
            var actionUri = "DemoDriveLogFindForm";
            var paramDictionary = new Dictionary<string, object>();
            paramDictionary.Add("logTypKy", logTypKy);
            paramDictionary.Add("trnNo", trnNo);
            paramDictionary.Add("frmDt", frmDt);
            paramDictionary.Add("toDt", toDt);
            paramDictionary.Add("cKy", cKy);
            paramDictionary.Add("usrKy", usrKy);
            var list = new List<ShowroomLogFindModel>();
            list = RunApiOperation(
                DemoDrivngBaseUri,
                actionUri,
                environment,
                paramDictionary,
                list.GetType()) as List<ShowroomLogFindModel>;

            return list;
        }


        public List<ShowroomLogModel> GetDemoDriveDetail(string logDetKy, int cKy, int usrKy, string ObjKy, string environment)
        {
            var actionUri = "GetDemoDriveDetail";
            var paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("LogDetKy", logDetKy);
            paramDictionary.Add("Cky", cKy);
            paramDictionary.Add("UsrKy", usrKy);
            paramDictionary.Add("ObjKy", ObjKy);
            var list = new List<ShowroomLogModel>();
            list = RunApiOperation(
                DemoDrivngBaseUri,
                actionUri,
                environment,
                paramDictionary,
                list.GetType()) as List<ShowroomLogModel>;

            return list;
        }
    }
}