using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using BlueLotus.ShowroomLog.Model.Entity;
using BlueLotus.UI.ApiOperations;
using BlueLotus.UI.Models;

namespace BlueLotus.UI.Controllers
{
    public class SMLDemoDrivingLogController : Controller
    {
        ApiOperation apiOpr = new ApiOperation();
        //
        // GET: /SMLDemoDrivingLog/

        public ActionResult DemoDrvng(string OurCd, string ObjCaptn, string ObjKy)
        {
            
            ViewBag.ObjCaptn = ObjCaptn;
            ViewBag.OurCd = OurCd;
            ViewBag.ObjKy = ObjKy;
            ViewBag.Time = DateTime.Now.ToString("HH:mm");
            DateTime dateTime = DateTime.UtcNow.Date;
            ViewBag.Date = dateTime.ToString("dd/MM/yyyy");
            return View();
        }
        public JsonResult SaveAction(string ObjKy, string ConCd, string OurCd, string adrKy, string drivingDate, string drvngTime, string intVehical, string slsPrsnKy, string comments, string nxtShdueDate, string flwUpAction, string demoLogYes, string feedbackYes, string gatePassYes,string logtypKy, string Fname, string Lname, string Initials, string PerEmail, string BusEmail, string persnalTp, string OfceTp)
        {
            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;
            List<DemoDrivingModel> SaveActionResult = new List<DemoDrivingModel>();
            SaveActionResult = apiOpr.DemoDriveSaveAction(ObjKy, ConCd, OurCd, adrKy, drivingDate, drvngTime, intVehical, slsPrsnKy, comments, nxtShdueDate, flwUpAction, demoLogYes, feedbackYes, gatePassYes, CKy, UsrKy, logtypKy, Fname, Lname, Initials, PerEmail, BusEmail, persnalTp, OfceTp,  HTNSession.Environment);
            return Json(SaveActionResult, JsonRequestBehavior.AllowGet);
        }

        public JsonResult UpdateAction( string LogKy,string ObjKy, string ConCd, string OurCd, string adrKy, string drivingDate, string drvngTime, string intVehical, string slsPrsnKy, string comments, string nxtShdueDate, string flwUpAction, string demoLogYes, string feedbackYes, string gatePassYes,string logtypKy, string Fname, string Lname, string Initials, string PerEmail, string BusEmail, string persnalTp, string OfceTp)
        {
            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;
            List<DemoDrivingModel> SaveActionResult = new List<DemoDrivingModel>();
            SaveActionResult = apiOpr.UpdateAction(LogKy,ObjKy, ConCd, OurCd, adrKy, drivingDate, drvngTime, intVehical, slsPrsnKy, comments, nxtShdueDate, flwUpAction, demoLogYes, feedbackYes, gatePassYes, CKy, UsrKy, logtypKy, Fname, Lname, Initials, PerEmail, BusEmail, persnalTp, OfceTp, HTNSession.Environment);
            return Json(SaveActionResult, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetFindForm(string LogTypKy, string TrnNo, string FrmDt, string ToDt)
        {
            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;
            List<ShowroomLogFindModel> FindData = new List<ShowroomLogFindModel>();
            FindData = apiOpr.DemoDriveLogFindForm(LogTypKy, TrnNo, FrmDt, ToDt, CKy, UsrKy, HTNSession.Environment);
            return Json(FindData, JsonRequestBehavior.AllowGet);
        }
        public JsonResult DemoDriveDetail(string logDetKy, string objKy)
        {
            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;
            List<ShowroomLogModel> FindData = new List<ShowroomLogModel>();
            FindData = apiOpr.GetDemoDriveDetail(logDetKy, CKy, UsrKy, objKy, HTNSession.Environment);
            return Json(FindData, JsonRequestBehavior.AllowGet);
        }

    }
}
