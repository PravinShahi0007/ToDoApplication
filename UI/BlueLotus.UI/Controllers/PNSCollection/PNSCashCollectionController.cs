using System;
using System.Collections.Generic;
using System.Web.Mvc;
using BlueLotus.PNSCollection.Model.PNSCashier_Collection;
using BlueLotus.UI.ApiOperations;
using BlueLotus.UI.Models;

namespace BlueLotus.UI.Controllers.PNSCollection
{
    public class PNSCashCollectionController : Controller
    {

        //
        // GET: /PNSCashCollection/
        private readonly ApiOperation apiOpr = new ApiOperation();

        public ActionResult CasherCollection(string OurCd, string ObjCaptn, int ObjKy)
        {
            ViewBag.ObjCaptn = ObjCaptn;
            ViewBag.OurCd = OurCd;
            ViewBag.ObjKy = ObjKy;

            return View();
        }

        public JsonResult UsrCashBalCashBalance(string SBuKy, string DepDate, string BankKy,string CordKy)
        {
            int usrKy = HTNSession.UsrKy;
            int cKy = HTNSession.CKy;
            decimal CashBalance = apiOpr.UsrCashBalCashBalance(cKy, usrKy, SBuKy, DepDate, BankKy, CordKy,HTNSession.Environment);
            return Json(CashBalance, JsonRequestBehavior.AllowGet);
        }


        //    (string CordKy)
        //{
        //    var UsrKy = HTNSession.UsrKy;
        //    var CKy = HTNSession.CKy;

        //    var UsrCashBalModelObj = new List<CashierCollectionModel>();
        //    UsrCashBalModelObj = apiOpr.PNSUsrCashBal(CKy, UsrKy, CordKy, HTNSession.Environment);
        //    return Json(UsrCashBalModelObj, JsonRequestBehavior.AllowGet);
        //}


        public JsonResult GetChqueList(string SBuKy, string DepDate, string BankKy, string CordKy){
           
            var UsrKy = HTNSession.UsrKy;
            var CKy = HTNSession.CKy;
            var UsrChqListObj = new List<CashierCollectionModel>();
            UsrChqListObj = apiOpr.PnsUsrChq(CKy, UsrKy, SBuKy, DepDate, BankKy,CordKy, HTNSession.Environment);
            return Json(UsrChqListObj, JsonRequestBehavior.AllowGet);

        }

        //    UsrChq(string CordKy)
        //{
        //    var UsrKy = HTNSession.UsrKy;
        //    var CKy = HTNSession.CKy;
        //    var UsrChqListObj = new List<CashierCollectionModel>();
        //    UsrChqListObj = apiOpr.PnsUsrChq(CKy, UsrKy, CordKy, HTNSession.Environment);
        //    return Json(UsrChqListObj, JsonRequestBehavior.AllowGet);
        //}

        //CashSave
        public JsonResult CashSave(string CordinatorName, string Cash, string ConCord, string OurCode, string updatedRecords,string SBu)
        {
            var UsrKy = HTNSession.UsrKy;
            var CKy = HTNSession.CKy;
            List<CashierCollectionModel> OutlettLookupModelObj = apiOpr.PNSCashierCollectionCashSave(CKy, UsrKy, CordinatorName, Cash, ConCord,OurCode, updatedRecords, SBu, HTNSession.Environment);

            return Json(OutlettLookupModelObj, JsonRequestBehavior.AllowGet);
        }

        

        public JsonResult CordinatorName()
        {
            var UsrKy = HTNSession.UsrKy;
            var CKy = HTNSession.CKy;
            var CordinatorList = new List<PNSCordinatormodel>();
            CordinatorList = apiOpr.PNSCordinatorName(CKy, UsrKy, HTNSession.Environment);
            return Json(CordinatorList, JsonRequestBehavior.AllowGet);
        }
    }
}