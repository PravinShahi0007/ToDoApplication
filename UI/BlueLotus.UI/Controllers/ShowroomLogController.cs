using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using BlueLotus.ComboLoad.Model;
using BlueLotus.ShowroomLog.Model.Entity;
using BlueLotus.UI.ApiOperations;
using BlueLotus.UI.Models;

namespace BlueLotus.UI.Controllers
{
    public class ShowroomLogController : Controller
    {
        //
        // GET: /ShowroomLog/
        ApiOperation apiOpr = new ApiOperation();

        public ActionResult ShowroomLog(string OurCd, string ObjCaptn, string ObjKy)
        {
            ViewBag.ObjCaptn = ObjCaptn;
            ViewBag.OurCd = OurCd;
            ViewBag.ObjKy = ObjKy;
            ViewBag.Time = DateTime.Now.ToString("HH:mm");
            DateTime dateTime = DateTime.UtcNow.Date;
            ViewBag.Date = dateTime.ToString("dd/MM/yyyy");

            return View("ShowroomLog");
        }
        //Save
        public JsonResult PostSaveAction(string LogDate, string LogTime, string Fname, string Lname, string Initials, string PerEmail, string BusEmail, string PerTP, string BusTP, string LeadTypKy, string CrnttVhl, string CrnttVhlClr, string CrnttVhlReg, string cusStatus, string SalesPersonKy, string Reson, string VhlIntMdlKy, string VhlIntSeriesKy, string ActionKy, string CustStatusKy, string Comment, string NxtShdDate, string FlwUPActionKy, string logtypKy,string AdrKy,  string objKy, UInt32 PrntKy = 1)
        {
            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;
            List<ShowroomLogModel> SaveActionResult = new List<ShowroomLogModel>();
            SaveActionResult = apiOpr.PostSaveAction(LogDate, LogTime, Fname, Lname, Initials, PerEmail, BusEmail, PerTP, BusTP, LeadTypKy, CrnttVhl, CrnttVhlClr, CrnttVhlReg, cusStatus, SalesPersonKy, Reson, VhlIntMdlKy, VhlIntSeriesKy, ActionKy, CustStatusKy, Comment, NxtShdDate, FlwUPActionKy, logtypKy, objKy, CKy, UsrKy, AdrKy, PrntKy, HTNSession.Environment);
            return Json(SaveActionResult, JsonRequestBehavior.AllowGet);

        }
        //Update

        public JsonResult PostUpdateAction(string LogDate, string LogTime, string Fname, string Lname, string Initials, string PerEmail, string BusEmail, string PerTP, string BusTP, string LeadTypKy, string CrnttVhl, string CrnttVhlClr, string CrnttVhlReg, string cusStatus, string SalesPersonKy, string Reson, string VhlIntMdlKy, string VhlIntSeriesKy, string ActionKy, string CustStatusKy, string Comment, string NxtShdDate, string FlwUPActionKy, string logtypKy, string AdrKy, string objKy,string LogDetKy)
        {
            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;
            List<ShowroomLogModel> SaveActionResult = new List<ShowroomLogModel>();
            SaveActionResult = apiOpr.PostUpdateAction(LogDate, LogTime, Fname, Lname, Initials, PerEmail, BusEmail, PerTP, BusTP, LeadTypKy, CrnttVhl, CrnttVhlClr, CrnttVhlReg, cusStatus, SalesPersonKy, Reson, VhlIntMdlKy, VhlIntSeriesKy, ActionKy, CustStatusKy, Comment, NxtShdDate, FlwUPActionKy, logtypKy, objKy, CKy, UsrKy, AdrKy, LogDetKy, HTNSession.Environment);
            return Json(SaveActionResult, JsonRequestBehavior.AllowGet);

        }
        //Set System Date And TIme
        public JsonResult ReturnDateTime()
        {
            string Time = DateTime.Now.ToString("HH:mm");
            DateTime dateTime = DateTime.UtcNow.Date;
            string Date = dateTime.ToString("dd/MM/yyyy");
            string[] DateTimeArray = new string[] { Time, Date };
            return Json(DateTimeArray, JsonRequestBehavior.AllowGet);

        }
        //FIndForm
        public JsonResult GetFindForm(string LogTypKy, string TrnNo, string FrmDt, string ToDt)
        {
            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;
            List<ShowroomLogFindModel> FindData = new List<ShowroomLogFindModel>();
            FindData = apiOpr.ShowroomLogFindForm(LogTypKy, TrnNo, FrmDt, ToDt, CKy, UsrKy, HTNSession.Environment);
            return Json(FindData, JsonRequestBehavior.AllowGet);
        }
        //Find Is Customer
        public JsonResult FindIsCurrentCust(string PrsnlMobNu, string OfcMobNu,string FName,string LName,string Initials,string ObjKy)
        {
           
            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;
            List<ShowroomLogModel> FindData = new List<ShowroomLogModel>();
            FindData = apiOpr.FindIsCurrentCust(PrsnlMobNu, OfcMobNu, FName, LName, Initials, ObjKy, CKy, UsrKy, HTNSession.Environment);
            return Json(FindData, JsonRequestBehavior.AllowGet);

        }
        //Get Log Detail Saved Record
        public JsonResult GetLogDetail(string logDetKy,string objKy)
        {
            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;
            List<ShowroomLogModel> FindData = new List<ShowroomLogModel>();
            FindData = apiOpr.GetLogDetail(logDetKy, CKy, UsrKy, objKy, HTNSession.Environment);
            return Json(FindData, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetFallowUpFindForm(string LogTypKy, string TrnNo, string FrmDt, string ToDt)
        {
            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;
            List<ShowroomLogFindModel> FindData = new List<ShowroomLogFindModel>();
            FindData = apiOpr.GetFallowUpFindForm(LogTypKy, TrnNo, FrmDt, ToDt, CKy, UsrKy, HTNSession.Environment);
            return Json(FindData, JsonRequestBehavior.AllowGet);
        }
        //public JsonResult ItmNm_SelectMob(string ObjKy, string TrnTypKy, string PreKy)
        //{
        //    int CKy = HTNSession.CKy;
        //    int UsrKy = HTNSession.UsrKy;

        //    List<ItmNm_SelectMob> list = new List<ItmNm_SelectMob>();
        //    list = apiOpr.ItmNm_SelectMob(HTNSession.Environment, CKy, UsrKy,Convert.ToInt32(ObjKy) , Convert.ToInt32(TrnTypKy), Convert.ToInt32(PreKy) );
        //    return Json(list, JsonRequestBehavior.AllowGet);
        //}

    }
}
