using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using BlueLotus.PaymentShedule.Model;
using BlueLotus.UI.ApiOperations;
using BlueLotus.UI.Models;
using BlueLotus.Payment.Model.Entity;

namespace BlueLotus.UI.Controllers
{
    public class PaymentSheduleController : Controller
    {
        //
        // GET: /PaymentShedule/
        ApiOperation apiOpr = new ApiOperation();
        public ActionResult PaymentShedule(string OurCd, string ObjCaptn, string ObjKy)
        {
            ViewBag.ObjCaptn = ObjCaptn;
            ViewBag.OurCd = OurCd;
            ViewBag.ObjKy = ObjKy;
            return View();
        }
        public JsonResult GetPaymentSheduleGrid(string AccKy,string Date,string ObjKy,string BUKy,string PrjKy)
        {
            var UsrKy = HTNSession.UsrKy;
            var CKy = HTNSession.CKy;
            var GetAccGrid = new List<PaymentSheduleGridModel>();
            GetAccGrid = apiOpr.PaymentSheduleGridSelect(HTNSession.Environment, CKy, UsrKy, ObjKy, AccKy, Date,  BUKy,  PrjKy);
            return Json(GetAccGrid, JsonRequestBehavior.AllowGet);
        }
        public JsonResult InsertPaymentShedule(int ObjKy,string GridArray)
        {
            var UserKy = HTNSession.UsrKy;
            var Cky = HTNSession.CKy;
            var EnvironmentName = HTNSession.Environment;
            var TrnKy = 1;
        
            bool Returnlist = apiOpr.InsertPaymentShedule(ObjKy, Cky, UserKy, TrnKy, EnvironmentName, GridArray);
            return Json(Returnlist, JsonRequestBehavior.AllowGet);

        }

        public JsonResult InsertIntoTrnHdr(int TrnTypKy,string TrnDt,int CrnKy,int PrjKy,int BUKy,string OurCd,string ObjKy)
        {
            var UserKy = HTNSession.UsrKy;
            var Cky = HTNSession.CKy;
            var EnvironmentName = HTNSession.Environment;
            string ConCord = "TrnTyp";
            List<PayMoTrnHdrDetails> TrnHdrDetails = new List<PayMoTrnHdrDetails>();
            TrnHdrDetails = apiOpr.InsertIntoTrnHdr(TrnTypKy, TrnDt, CrnKy, PrjKy, BUKy, OurCd, ObjKy, Cky, UserKy, ConCord, EnvironmentName);
            return Json(TrnHdrDetails, JsonRequestBehavior.AllowGet);
        }
        public JsonResult UpdateIntoTrnHdr(int TrnKy, string TrnDt, int CrnKy, int PrjKy, int BUKy, string OurCd, string ObjKy)
        {
            var UserKy = HTNSession.UsrKy;
            var Cky = HTNSession.CKy;
            var EnvironmentName = HTNSession.Environment;
            string ConCord = "TrnTyp";
            List<PayMoTrnHdrDetails> TrnHdrDetails = new List<PayMoTrnHdrDetails>();
            TrnHdrDetails = apiOpr.UpdateIntoTrnHdr(TrnKy, TrnDt, CrnKy, PrjKy, BUKy, OurCd, ObjKy, Cky, UserKy, ConCord, EnvironmentName);
            return Json(TrnHdrDetails, JsonRequestBehavior.AllowGet);
        }

        public JsonResult InsertGridIntoAccTrn(int TrnKy, string InsertGrid, string OurCd, int ObjKy, int CrnKy, int TrnTypKy, string EftvDt)
        {
            var UserKy = HTNSession.UsrKy;
            var Cky = HTNSession.CKy;
            var EnvironmentName = HTNSession.Environment;
            bool result = apiOpr.InsertGridIntoAccTrn(TrnKy, InsertGrid, OurCd, ObjKy, UserKy, Cky,CrnKy, TrnTypKy, EftvDt, EnvironmentName);
            return Json(result, JsonRequestBehavior.AllowGet);

        }
        
        public JsonResult UpdateGridIntoAccTrn(int TrnKy, string UpdateGrid, string OurCd, int ObjKy, int CrnKy, int TrnTypKy, string EftvDt)
        {
            var UserKy = HTNSession.UsrKy;
            var Cky = HTNSession.CKy;
            var EnvironmentName = HTNSession.Environment;
            bool result = apiOpr.UpdateGridIntoAccTrn(TrnKy, UpdateGrid, OurCd, ObjKy, UserKy, Cky, CrnKy, TrnTypKy, EftvDt, EnvironmentName);
            return Json(result, JsonRequestBehavior.AllowGet);

        }

        public JsonResult PaymentShedulePosting(int TrnKy, int ObjKy)
        {
            var UserKy = HTNSession.UsrKy;
            var Cky = HTNSession.CKy;
            var EnvironmentName = HTNSession.Environment;
            bool RetuningResult = apiOpr.PaymentShedulePosting(TrnKy, ObjKy, UserKy, Cky, EnvironmentName);
            return Json(RetuningResult, JsonRequestBehavior.AllowGet);
        }
    }
}
