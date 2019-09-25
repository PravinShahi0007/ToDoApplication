using BlueLotus.Alert.Model.Entity;
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
    public class AlertController : Controller
    {
        ApiOperation apiOpr = new ApiOperation();
        
        //
        // GET: /Alert/

        public ActionResult Index(string OurCd, string ObjCaptn)
        {
            ViewBag.ObjCaptn = ObjCaptn;
            ViewBag.OurCd = OurCd;

            return View();
        }
        public JsonResult getSMSLogDet()
        {
            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;
            string Env = HTNSession.Environment;
            List<AlertModel> list = new List<AlertModel>();
            list = apiOpr.getSMSLogDet(UsrKy, CKy, Env);
            return Json(list, JsonRequestBehavior.AllowGet);
        }
        public JsonResult getEmailLogDet()
        {
            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;
            string Env = HTNSession.Environment;
            List<AlertModel> list = new List<AlertModel>();
            list = apiOpr.getEmailLogDet(UsrKy, CKy, Env);
            return Json(list, JsonRequestBehavior.AllowGet);
        }
        public JsonResult getMobileLogDet()
        {
            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;
            string Env = HTNSession.Environment;
            List<AlertModel> list = new List<AlertModel>();
            list = apiOpr.getPndMobileLogDet(UsrKy, CKy, Env);
            return Json(list, JsonRequestBehavior.AllowGet);
        }
        public JsonResult getPndSMSLogDet()
        {
            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;
            string Env = HTNSession.Environment;
            List<AlertModel> list = new List<AlertModel>();
            list = apiOpr.getPndSMSLogDet(UsrKy, CKy, Env);
            return Json(list, JsonRequestBehavior.AllowGet);
        }
        public JsonResult getPndEmailLogDet()
        {
            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;
            string Env = HTNSession.Environment;
            List<AlertModel> list = new List<AlertModel>();
            list = apiOpr.getPndEmailLogDet(UsrKy, CKy, Env);
            return Json(list, JsonRequestBehavior.AllowGet);
        }
        public JsonResult getPndMobileLogDet()
        {
            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;
            string Env = HTNSession.Environment;
            List<AlertModel> list = new List<AlertModel>();
            list = apiOpr.getPndMobileLogDet(UsrKy, CKy, Env);
            return Json(list, JsonRequestBehavior.AllowGet);
        }
        public JsonResult getAlertStatus()
        {
            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;
            string Env = HTNSession.Environment;
            List<AlertModel> list = new List<AlertModel>();
            list = apiOpr.getAlertStatus(UsrKy, CKy, Env);
            return Json(list, JsonRequestBehavior.AllowGet);
        }
        public JsonResult SetAlertStatus(int SMSStat,int EmailStat,int MobStat)
        {
            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;
            string Env = HTNSession.Environment;
            bool Status = apiOpr.SetAlertStatus(UsrKy, CKy, Env,SMSStat,EmailStat,MobStat);
            return Json(Status, JsonRequestBehavior.AllowGet);
        }
        public JsonResult SendSampleSMS(string Mob, string Msg)
        {
            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;
            string Env = HTNSession.Environment;
            bool Status = apiOpr.SendSampleSMS(UsrKy, CKy, Env, Mob, Msg);
            return Json(Status, JsonRequestBehavior.AllowGet);
        }
    }
}