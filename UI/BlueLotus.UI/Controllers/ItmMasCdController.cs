using BlueLotus.ComboLoad.Model;
using BlueLotus.ItmMas.Model.Entity;
using BlueLotus.UI.ApiOperations;
using BlueLotus.UI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace BlueLotus.UI.Controllers
{
    public class ItmMasCdController : Controller
    {
        //
        // GET: /ItmMasCd/
        ApiOperation Operation = new ApiOperation();


        public ActionResult ItmMasCd(string OurCd, string OurCd2, string ObjKy, string ObjCaptn)
        {
            ViewBag.OurCd2 = OurCd2;
            ViewBag.ObjKy = ObjKy;
            ViewBag.ObjCaptn = ObjCaptn;
            ViewBag.OurCd = OurCd;
            return View();
        }

        public ActionResult GetItmSettings(int ItmTypKy, int ControlConKy, long ItmKy, int ObjKy)
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            //int ObjKy = Convert.ToInt32(Session["ObjKy"]);
            List<ItmMasCd_SelectWeb> list = new List<ItmMasCd_SelectWeb>();
            list = Operation.GetItmSettings(HTNSession.Environment, CKy, UsrKy, ObjKy, ItmTypKy, ControlConKy, ItmKy);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public ActionResult ItmMasCd_SelectWeb(long ItmKy, int ObjKy, string OurCd)
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            //int ObjKy = Convert.ToInt32(Session["ObjKy"]);
            List<ItmMasCd_SelectWeb> list = new List<ItmMasCd_SelectWeb>();
            list = Operation.ItmMasCd_SelectWeb(HTNSession.Environment, CKy, UsrKy, ObjKy, ItmKy, OurCd);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public ActionResult InsertItmSettings(string NewGridDetail, int ControlConKy, long ItmKy, int ObjKy)
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            //int ObjKy = Convert.ToInt32(Session["ObjKy"]);

            var process = Operation.InsertItmSettings(HTNSession.Environment, NewGridDetail, CKy, UsrKy, ObjKy, ControlConKy, ItmKy);

            return Json(process, JsonRequestBehavior.AllowGet);

        }

        public ActionResult UpdateItmSettings(string updateGrid, int ControlConKy, long ItmKy, int ObjKy)
        {
            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;
            //int ObjKy = Convert.ToInt32(Session["ObjKy"]);

            var process = Operation.UpdateItmSettings(HTNSession.Environment, updateGrid, CKy, UsrKy, ObjKy, ControlConKy, ItmKy);

            return Json(process, JsonRequestBehavior.AllowGet);
        }

        public ActionResult ProdLoc_InsertUpdateWeb(string ProductionManufacturing_Update, string ItmKy, string ObjKy)
        {
            bool process = false;
            int cky = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            process = Operation.ProdLoc_InsertUpdateWeb(HTNSession.Environment, ProductionManufacturing_Update, ItmKy, cky, UsrKy, ObjKy);

            return Json(process, JsonRequestBehavior.AllowGet);
        }

        public ActionResult ProdLoc_SelectWeb(int ObjKy, int ItmKy)
        {
            List<ItmMasCd_SelectWeb> List = new List<ItmMasCd_SelectWeb>();
            List = Operation.ProdLoc_SelectWeb(HTNSession.Environment, HTNSession.CKy, HTNSession.UsrKy, ObjKy, ItmKy);
            return Json(List, JsonRequestBehavior.AllowGet);

        }

        //--- This is not ItmmasCd  codes its ItmMasItm --------
        public ActionResult GrpItmCdByControlConRel_SelectWeb(string ControlConKy, string ObjKy)
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            //int ObjKy = Convert.ToInt32(Session["ObjKy"]);
            List<ItmCd_SelectMob> list = new List<ItmCd_SelectMob>();
            list = Operation.GrpItmCdByControlConRel_SelectWeb(HTNSession.Environment, CKy, UsrKy, Convert.ToInt32(ObjKy), Convert.ToInt32(ControlConKy));
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public ActionResult ItmMasItmLoadGridView(string ControlConKy, string GrpItmKy, string ObjKy)
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            //int ObjKy = Convert.ToInt32(Session["ObjKy"]);
            List<ItmMasItm> list = new List<ItmMasItm>();
            list = Operation.ItmMasItmLoadGridView(HTNSession.Environment, CKy, UsrKy, Convert.ToInt32(ControlConKy), Convert.ToInt32(GrpItmKy), Convert.ToInt32(ObjKy));
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public ActionResult InsertUpdateItmMasItm(string ObjKy, string GridUpdateDetail)
        {
            bool process = false;
            int cky = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            process = Operation.InsertUpdateItmMasItm(HTNSession.Environment, cky, UsrKy, Convert.ToInt32(ObjKy), GridUpdateDetail);

            return Json(process, JsonRequestBehavior.AllowGet);
        }

    }
}
