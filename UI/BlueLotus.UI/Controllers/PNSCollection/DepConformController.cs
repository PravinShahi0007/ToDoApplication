using System;
using System.Collections.Generic;
using System.Web.Mvc;
using BlueLotus.PNSCollection.Model.PNSConfirmation;
using BlueLotus.UI.ApiOperations;
using BlueLotus.UI.Models;

namespace BlueLotus.UI.Controllers.PNSCollection
{
    public class DepConformController : Controller
    {
        private readonly ApiOperation apiOpr = new ApiOperation();
        
        //
        // GET: /DepConform/
        //public ActionResult Index(string OurCd, string ObjCaptn)
        //{
        //    if (Session == null)
        //        return RedirectToAction("Index", "Login");
        //    return View();//TEst
        //}

        public ActionResult LoadConScrn(string OurCd, string ObjCaptn)
        {
            ViewBag.MyPmtcd = OurCd;
            ViewBag.ObjCaptn = ObjCaptn;
            ViewBag.OurCd = OurCd;

            return View();
        }

        public JsonResult LoadGrid(string FromDate, string Todate, string Cordinator, string IsCash, string BankLookup)
        {
            var UsrKy = HTNSession.UsrKy;
            var CKy = HTNSession.CKy;
            var CordinatorNameLookupModelObj = new List<PNSReciptReconModel>();
            CordinatorNameLookupModelObj = apiOpr.PNSReciptConfirmLoad(CKy, UsrKy, FromDate, Todate, Cordinator, IsCash,
                BankLookup, HTNSession.Environment);
            return Json(CordinatorNameLookupModelObj, JsonRequestBehavior.AllowGet);
        }


        public JsonResult ConfirmPayment(string updatedRecords)
        {
            //List<PNSPaymentHedingSave> list = new List<PNSPaymentHedingSave>();
            var UsrKy = HTNSession.UsrKy;
            var CKy = HTNSession.CKy;
            var list = apiOpr.PNSCordiConfirmPayment(CKy, UsrKy, updatedRecords, HTNSession.Environment);
            return Json(list, JsonRequestBehavior.AllowGet);
        }
    }
}
