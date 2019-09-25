using BlueLotus.Shift_Model.entity;
using BlueLotus.UI.ApiOperations;
using BlueLotus.UI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace BlueLotus.UI.Controllers
{
    public class ShiftController : Controller
    {
        ApiOperation apiOpr = new ApiOperation();

        //
        // GET: /Shift/

        public ActionResult Index(string OurCd, string OurCd2, string ObjKy, string ObjCaptn)
        {
            ViewBag.OurCd2 = OurCd2;
            ViewBag.OurCd = OurCd;
            ViewBag.ObjKy = ObjKy;
            ViewBag.ObjCaptn = ObjCaptn;
            return View("Index");
        }
        public ActionResult ShiftGroup(string OurCd, string OurCd2, string ObjKy, string ObjCaptn)
        {
            ViewBag.OurCd2 = OurCd2;
            ViewBag.OurCd = OurCd;
            ViewBag.ObjKy = ObjKy;
            ViewBag.ObjCaptn = ObjCaptn;
            return View("ShiftGroup");
        }
        public JsonResult Shift_InsertUpdateWeb(int Cdky,string FrmTm, string ToTm, string GraceInTm, string GraceOutTm, string FstHlfDayToTm,string SecHlfDayFrmTm,string EarlyOTFrmTm,string LateOTFrmTm,string MinHrHfDay,string MinHrDay,int isToTmNxtDay, int isAtnDtInDtm, int Day,int ShiftAmt,int ShiftKy)
        {
            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;
            string EnvironmentName = HTNSession.Environment;
            int list = apiOpr.Shift_InsertUpdateWeb(CKy, UsrKy, Cdky, FrmTm, ToTm, GraceInTm, GraceOutTm, FstHlfDayToTm, SecHlfDayFrmTm, EarlyOTFrmTm, LateOTFrmTm, MinHrHfDay, MinHrDay, isToTmNxtDay, isAtnDtInDtm, Day, ShiftAmt, ShiftKy, EnvironmentName);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Shift_SelectWeb( int ShiftKy)
        {
            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;
            string EnvironmentName = HTNSession.Environment;
            Shiftentry list = apiOpr.Shift_SelectWeb(CKy, UsrKy, ShiftKy, EnvironmentName);
            return Json(list, JsonRequestBehavior.AllowGet);
        }
        public JsonResult ShiftGroup_Selectweb(int ShiftGrpKy)
        {
            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;
            string EnvironmentName = HTNSession.Environment;

            List<ShiftGroup> list = new List<ShiftGroup>();
            list = apiOpr.ShiftGroup_Selectweb(CKy, UsrKy, ShiftGrpKy, EnvironmentName);
            return Json(list, JsonRequestBehavior.AllowGet);
        }
        public JsonResult ShiftGroup_InsertUpdateWeb( string GridShiftGroup, int ShiftGrpKy)
        {
            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;
            string EnvironmentName = HTNSession.Environment;
            bool  list = apiOpr.ShiftGroup_InsertUpdateWeb(CKy, UsrKy, GridShiftGroup, ShiftGrpKy, EnvironmentName);
            return Json(list, JsonRequestBehavior.AllowGet);
        }
    }
}
