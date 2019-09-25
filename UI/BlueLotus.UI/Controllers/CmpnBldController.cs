using BlueLotus.ItmMas.Model.Entity;
using BlueLotus.TransactionModel.Entity;
using BlueLotus.UI.ApiOperations;
using BlueLotus.UI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace BlueLotus.UI.Controllers
{
    public class CmpnBldController : Controller
    {
        ApiOperation apiOpr = new ApiOperation();
        public static int UsrKy = 1;
        public static int cky = 1;
        public static string UsrNm;
        public static string cNm;
        //
        // GET: /ItmMasCmpn/

        public ActionResult ItmMasCmpn(string OurCd, string OurCd2, int ObjKy, string ObjCaptn)
        {
            ViewBag.OurCd = OurCd;
            ViewBag.OurCd2 = OurCd2;
            ViewBag.ObjKy = ObjKy;
            ViewBag.ObjCaptn = ObjCaptn;

            return View();
        }

        public JsonResult SaveItmCmpn(string ObjKy, string updatedOrders, string deletedOrders, string newOrders)
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            try
            {
                apiOpr.ItmCmpn_InsertWeb(HTNSession.Environment, CKy, UsrKy, Convert.ToInt32(ObjKy), newOrders);
                apiOpr.ItmCmpn_UpdateWeb(HTNSession.Environment, CKy, UsrKy, Convert.ToInt32(ObjKy), updatedOrders);
                apiOpr.ItmCmpn_DeleteWeb(HTNSession.Environment, CKy, UsrKy, Convert.ToInt32(ObjKy), deletedOrders);

                apiOpr.ItmCmpn_PrntInsert(HTNSession.Environment, CKy, UsrKy, Convert.ToInt32(ObjKy));

                return Json("success", JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public JsonResult ItmCmpn_SelectWeb(string ObjKy, string FinItmKy)
        {
            List<ItmCmpnModel> listItmCmpnModel = new List<ItmCmpnModel>();

            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;

            listItmCmpnModel = apiOpr.ItmCmpn_SelectWeb(HTNSession.Environment, CKy, UsrKy, Convert.ToInt32(ObjKy), FinItmKy);

            return Json(listItmCmpnModel, JsonRequestBehavior.AllowGet);
        }


        public JsonResult RecepieGetRate(int ObjKy, string ConCd, string OurCd,
            string ItmCd, string AdrKy, string LocKy, string PrjKy, string Dt, int ItmKy)
        {
            int cky = HTNSession.CKy;
            int usrKy = HTNSession.UsrKy;
            List<ItemForOrdtypModel> list = new List<ItemForOrdtypModel>();
            list = apiOpr.RecepieGetRate(HTNSession.Environment, cky, ObjKy, ConCd, OurCd, ItmCd, usrKy, Convert.ToInt32(AdrKy), Convert.ToInt32(LocKy), Convert.ToInt32(PrjKy), Dt, ItmKy);
            return Json(list, JsonRequestBehavior.AllowGet);
        }


    }
}
