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
    public class SMLWeekPlanController : Controller
    {
        ApiOperation apiOpr = new ApiOperation();

        //
        // GET: /SMLWeekPlan/

        public ActionResult ProspectPlan(string OurCd, string ObjCaptn, string ObjKy)
        {
            
            ViewBag.ObjCaptn = ObjCaptn;
            ViewBag.OurCd = OurCd;
            ViewBag.ObjKy = ObjKy;
            return View();
        }
        public JsonResult SaveAction(string ObjKy, string ConCd, string OurCd, string adrKy, string Fname, string Sname, string Intials, string PerNu, string OficeNu, string PerEmail, string OficeMail, string Address, string CurrentCust, string CrntVehi, string ActionKy, string CallSum, string FlwActKy, string Descriptin, string PlnDate, string NextDate,string LogTypKy)
        {
            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;
            List<SMLSaveModel> SaveActionResult = new List<SMLSaveModel>();
            SaveActionResult = apiOpr.SMLProspectSaveAction( ObjKy, ConCd, OurCd, adrKy, Fname, Sname, Intials, PerNu, OficeNu, PerEmail, OficeMail, Address, CurrentCust, CrntVehi, ActionKy, CallSum, FlwActKy, Descriptin, PlnDate, NextDate, UsrKy , CKy,  LogTypKy,HTNSession.Environment);
            return Json(SaveActionResult, JsonRequestBehavior.AllowGet);
        }
        public JsonResult UpdateAction(string LogDetKy, string ObjKy, string ConCd, string OurCd, string adrKy, string Fname, string Sname, string Intials, string PerNu, string OficeNu, string PerEmail, string OficeMail, string Address, string CurrentCust, string CrntVehi, string ActionKy, string CallSum, string FlwActKy, string Descriptin, string PlnDate, string NextDate, string LogTypKy)
        {
            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;
            List<SMLSaveModel> SaveActionResult = new List<SMLSaveModel>();
            SaveActionResult = apiOpr.SMLProspectUpdateAction(LogDetKy, ObjKy, ConCd, OurCd, adrKy, Fname, Sname, Intials, PerNu, OficeNu, PerEmail, OficeMail, Address, CurrentCust, CrntVehi, ActionKy, CallSum, FlwActKy, Descriptin, PlnDate, NextDate, UsrKy, CKy,  LogTypKy, HTNSession.Environment);
            return Json(SaveActionResult, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetFindForm(string LogTypKy, string TrnNo, string FrmDt, string ToDt)
        {
            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;
            List<ShowroomLogFindModel> FindData = new List<ShowroomLogFindModel>();
            FindData = apiOpr.SMLProspectFindForm(LogTypKy, TrnNo, FrmDt, ToDt, CKy, UsrKy, HTNSession.Environment);
            return Json(FindData, JsonRequestBehavior.AllowGet);
        }

        public JsonResult SelectAction(string logDetKy, string objKy)
        {
            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;
            List<ProspectCallModel> FindData = new List<ProspectCallModel>();
            FindData = apiOpr.SMLProspectDetail(logDetKy, CKy, UsrKy, objKy, HTNSession.Environment);
            return Json(FindData, JsonRequestBehavior.AllowGet);
        }
    }
}
