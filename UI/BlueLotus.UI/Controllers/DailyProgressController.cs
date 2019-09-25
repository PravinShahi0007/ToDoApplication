using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using BlueLotus.ComboLoad.Model;
using BlueLotus.dailytodo.Entityy;
using BlueLotus.UI.ApiOperations;
using BlueLotus.UI.Models;

namespace BlueLotus.UI.Controllers
{
    public class DailyProgressController : Controller
    {
        //
        // GET: /DailyProgress/

        public ActionResult dailyprog(String ObjCaptn, String OurCd, String OurCd2, String ObjKy)
        {
            ViewBag.OurCd2 = OurCd2;
            ViewBag.OurCd = OurCd;
            ViewBag.ObjKy = ObjKy;
            ViewBag.ObjCaptn = ObjCaptn; 

            return View();
        }

        public ActionResult PrjPrgrsDaily(String ObjCaptn, String OurCd, String OurCd2, String ObjKy)
        {
            ViewBag.OurCd2 = OurCd2;
            ViewBag.OurCd = OurCd;
            ViewBag.ObjKy = ObjKy;
            ViewBag.ObjCaptn = ObjCaptn;

            return View("PrjPrgrsDaily");
        }

        public JsonResult PrjTaskLocMob(int ObjKy, int TrnTypKy, int PreKy, int PrjKy)
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            ApiOperation apiOpr = new ApiOperation();
            List<PrjTaskLocMob> list = new List<PrjTaskLocMob>();
            list = apiOpr.PrjTaskLocMob(HTNSession.Environment, CKy, UsrKy, ObjKy, TrnTypKy, PreKy, PrjKy);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult AdrKyToItm_SelectMob(int AdrKy)
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            ApiOperation apiOpr = new ApiOperation();
            List<AdrUnit> list = new List<AdrUnit>();
            list = apiOpr.AdrKyToItm_SelectMob(HTNSession.Environment, CKy, UsrKy, AdrKy);
            return Json(list, JsonRequestBehavior.AllowGet);
        }
        public JsonResult SubConPopUp(int refItmTrnKy)
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            ApiOperation apiOpr = new ApiOperation();
            List<ResDetailPop> list = new List<ResDetailPop>();
            list = apiOpr.SubConPopUp(HTNSession.Environment, CKy, UsrKy, refItmTrnKy);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public ActionResult ProjectProgresCost(String ObjCaptn, String OurCd, String OurCd2, String ObjKy)
        {
            ViewBag.OurCd2 = OurCd2;
            ViewBag.OurCd = OurCd;
            ViewBag.ObjKy = ObjKy;
            ViewBag.ObjCaptn = ObjCaptn;
            return View("");
        }
    }
}
