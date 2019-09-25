using BlueLotus.BOQ.Model.Entity;
using BlueLotus.UI.ApiOperations;
using BlueLotus.UI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace BlueLotus.UI.Controllers
{
    public class CalendarController : Controller
    {
        ApiOperation apiOpr = new ApiOperation();
        
        //
        // GET: /Calendar/

        public ActionResult Index(string OurCd, string ObjCaptn)
        {
            ViewBag.ObjCaptn = ObjCaptn;
            ViewBag.OurCd = OurCd;

            return View();
        }
       
        public JsonResult GetCalTyp()
        {
            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;
            string Env = HTNSession.Environment;
            //string Env = "BL10Data";
            //int CKy = 11;
            //int UsrKy = 28;
            List<CalendarModel> list = new List<CalendarModel>();
            list = apiOpr.GetCalendarTypes(UsrKy,CKy, Env);
            return Json(list, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetHoliTyp()
        {
            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;
            string Env = HTNSession.Environment;
            //string Env = "BL10Data";
            //int CKy = 11;
            //int UsrKy = 28;
            List<CalendarModel> list = new List<CalendarModel>();
            list = apiOpr.GetHolidayTypes(UsrKy,CKy, Env);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult getHoliDet(int CalTypKy)
        {
            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;
            string Env = HTNSession.Environment;
            //string Env = "BL10Data";
            //int CKy = 11;
            //int UsrKy = 28;
            string FrmDt="1900/01/01";
            string ToDt="2050/12/31";
            int ObjKy = 1;
            List<CalendarModel> list = new List<CalendarModel>();
            list = apiOpr.GetHoliDet(CKy, CalTypKy, FrmDt, ToDt, UsrKy, ObjKy, Env);
            return Json(list, JsonRequestBehavior.AllowGet);
        }
        public JsonResult getSelectedHolidayTyp(string ComponentDt, int CalTypKy,string FrmDt,string ToDt)
        {
            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;
            string Env = HTNSession.Environment;
            //string Env = "BL10Data";
            //int CKy = 11;
            //int UsrKy = 28;
            int ObjKy = 1;
            List<CalendarModel> list = new List<CalendarModel>();
            list = apiOpr.getSelectedHolidayTyp(CKy, UsrKy, Env, ComponentDt, CalTypKy, FrmDt, ToDt,ObjKy);
            return Json(list, JsonRequestBehavior.AllowGet);
        }
        public ActionResult InsertHoliday(string CalDt,int CalTypKy, string ComponentDt, int HoliDayTypKy)
        {
            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;
            string Env = HTNSession.Environment;
            bool process = false;
            process = apiOpr.InsertHoliday(UsrKy, CalDt, CalTypKy, ComponentDt, HoliDayTypKy, CKy,Env);
            return Json(process, JsonRequestBehavior.AllowGet);
        }
        public ActionResult InsertMultipleHolidays(string HoliLot)
        {
            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;
            string Env = HTNSession.Environment;
            bool process = false;
            process = apiOpr.InsertMultipleHolidays(UsrKy, HoliLot,CKy,Env);
            return Json(process, JsonRequestBehavior.AllowGet);
        }

        public ActionResult RemoveHolidays(string HoliLot)
        {
            int usrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;
            string Env = HTNSession.Environment;
            bool process = false;
            process = apiOpr.RemoveHolidays(usrKy, HoliLot,CKy,Env);
            return Json(process, JsonRequestBehavior.AllowGet);
        }
    }
}