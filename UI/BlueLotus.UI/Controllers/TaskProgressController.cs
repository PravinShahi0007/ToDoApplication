using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using BlueLotus.UI.ApiOperations;
using BlueLotus.UI.Models;
using BlueLotus.ComboLoad.Model;

namespace BlueLotus.UI.Controllers
{
    public class TaskProgressController : Controller
    {
        
        ApiOperation operation = new ApiOperation();        

        public ActionResult TaskProgress(string OurCd, string OurCd2, string ObjKy, string ObjCaptn)
        {
            ViewBag.ObjCaptn = ObjCaptn;
            ViewBag.OurCd = OurCd;
            ViewBag.ObjKy = ObjKy;

            return View("TaskProgress");
        }

        public JsonResult PPrjKySubConAdrNm_SelectMob(int ObjKy, int TrnTypKy, int PrjKy)
        {
            List<PPrjKySubConAdrNm_SelectMob> list = new List<PPrjKySubConAdrNm_SelectMob>();
            list = operation.PPrjKySubConAdrNm_SelectMob(HTNSession.Environment, HTNSession.CKy, HTNSession.UsrKy, ObjKy, TrnTypKy, PrjKy);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult SubConPrgrsItmTrn_SelectWeb(int ObjKy, int TrnKy, string TrnDt, int TrnTypKy, int AdrKy, int FinItmKy, int PrjKy)
        {
            int cky = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            List<SubConPrgrsItmTrn_SelectWeb> list = new List<SubConPrgrsItmTrn_SelectWeb>();
            list = operation.SubConPrgrsItmTrn_SelectWeb(HTNSession.Environment, cky, UsrKy, ObjKy, TrnKy, TrnDt, TrnTypKy,  AdrKy, FinItmKy, PrjKy);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult PrcsDet_SelectWeb(int ObjKy, int PrcsDetKy)
        {
            int cky = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            List<PrcsDet_SelectWeb> list = new List<PrcsDet_SelectWeb>();
            list = operation.PrcsDet_SelectWeb(HTNSession.Environment, cky, UsrKy, ObjKy, PrcsDetKy);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult InsertTaskProgress(int AccessLvlKy, string updatedOrders, string newOrders, string deletedOrders, int ObjKy, string PrjKy, string AdrKy, string FrmLocKy, string AccKy, string BUKY, string Date, string ordKydata, string ConCd, string OurCd)
        {
            int CKy = HTNSession.CKy;
            int UsrKy = Convert.ToInt32(Session["usrky"].ToString());
            try
            {
                bool success = operation.InsertTaskProgress(HTNSession.Environment, CKy, UsrKy, ObjKy, AccessLvlKy, updatedOrders, newOrders, deletedOrders, PrjKy, AdrKy, FrmLocKy, AccKy, BUKY, Date, ordKydata, ConCd, OurCd);
                return Json("success", JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                throw;
            }
        }
    }
}

