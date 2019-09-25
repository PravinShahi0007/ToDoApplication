using BlueLotus.Promotion.Model.Entity;
using BlueLotus.UI.ApiOperations;
using BlueLotus.UI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace BlueLotus.UI.Controllers
{
    public class PromotionController : Controller
    {
        //
        // GET: /Promotion/
        ApiOperation Operation = new ApiOperation();

        public ActionResult Index(string OurCd, string OurCd2, string ObjKy, string ObjCaptn)
        {
            ViewBag.OurCd2 = OurCd2;
            ViewBag.ObjKy = ObjKy;
            ViewBag.ObjCaptn = ObjCaptn;
            ViewBag.OurCd = OurCd;

            return View();
        }

        public JsonResult ItmMasOfrHdr_SelectWeb()
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            List<PromotionModel> list = new List<PromotionModel>();
            list = Operation.ItmMasOfrHdr_SelectWeb(HTNSession.Environment, CKy, UsrKy);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult InsertUpdateItmMasOfrHdr(int ItmOfrKy, int ItmOfrTypKy, string ItmOfrCd, string ItmOfrNm, double BuyQty, double OfrQty, string FrmDt, string ToDt)
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;

            bool res = Operation.InsertUpdateItmMasOfrHdr(HTNSession.Environment, CKy, UsrKy, ItmOfrKy, ItmOfrTypKy, ItmOfrCd, ItmOfrNm, BuyQty, OfrQty, FrmDt, ToDt);
            return Json(res, JsonRequestBehavior.AllowGet);
        }

        public JsonResult ItmMasOfrDet_SelectWeb(int ItmOfrKyPass)
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            List<PromotionDetModel> list = new List<PromotionDetModel>();
            list = Operation.ItmMasOfrDet_SelectWeb(HTNSession.Environment, CKy, UsrKy, ItmOfrKyPass);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult ItmMasOfrDet_InsertUpdate(string NewGridDetail)
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;

            bool res = Operation.ItmMasOfrDet_InsertUpdate(HTNSession.Environment, CKy, UsrKy, NewGridDetail);
            return Json(res, JsonRequestBehavior.AllowGet);
        }

        public JsonResult ItmMasOfrDet_DeleteWeb(string EnvironmentName, int ItmOfrKy)
        {

            bool res = Operation.ItmMasOfrDet_DeleteWeb(HTNSession.Environment, ItmOfrKy);
            return Json(res, JsonRequestBehavior.AllowGet);
        }


    }
}
