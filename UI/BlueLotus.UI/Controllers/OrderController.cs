using BlueLotus.SplOrderModel.Entity;
using BlueLotus.UI.ApiOperations;
using BlueLotus.UI.Models;
using BlueLotus.ViewModel.Entity;
using System;
using System.Collections.Generic;
using System.Drawing.Printing;
using System.Linq;
using System.Web;
using System.Web.Configuration;
using System.Web.Mvc;
using Telerik.Reporting.Processing;

namespace BlueLotus.UI.Controllers
{
    public class OrderController : Controller
    {
        //
        // GET: /Order/
        ApiOperation apiOpr = new ApiOperation();
        
        public ActionResult PurchaseOrder(string OurCd, int ObjKy, string ObjCaptn,int IniTrnKy=1)
        {
            ViewBag.OurCd = OurCd;
            ViewBag.ObjKy = ObjKy;
            ViewBag.ObjCaptn = ObjCaptn;
            ViewBag.IniTrnKy = IniTrnKy;

            return View("PurchaseOrder");
        }

        public ActionResult SplSlsOrd(string ObjCaptn, int ObjKy, string OurCd)
        {
            ViewBag.OurCd = OurCd;
            ViewBag.ObjKy = ObjKy;
            ViewBag.ObjCaptn = ObjCaptn;

            return RedirectToAction("SplSlsOrd", "SplOrder", new { OurCd = OurCd, ObjKy = ObjKy, ObjCaptn = ObjCaptn });

        }

        public JsonResult GetOrdFind(string ordFindDet)
        {
            int cKy = HTNSession.CKy;
            int usrKy = HTNSession.UsrKy;

            List<OrderSearchModel> list = new List<OrderSearchModel>();
            list = apiOpr.GetOrdFind(HTNSession.Environment, cKy, usrKy, ordFindDet);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetSuplistForOrder()
        {
            int cKy = HTNSession.CKy;
            int usrKy = HTNSession.UsrKy;

            List<AccOrderModel> list = new List<AccOrderModel>();
            list = apiOpr.GetSuplistForOrder(HTNSession.Environment, cKy, usrKy);

            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetPrjListForOrder()
        {
            int cKy = HTNSession.CKy;
            int usrKy = HTNSession.UsrKy;

            List<OrderProject> list = new List<OrderProject>();
            list = apiOpr.GetPrjListForOrder(HTNSession.Environment, cKy, usrKy);

            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetPurchesReqForFind(string ordKy)
        {
            int cKy = HTNSession.CKy;
            int usrKy = HTNSession.UsrKy;

            List<OrderHdrModel> list = new List<OrderHdrModel>();
            list = apiOpr.GetPurchesReqForFind(HTNSession.Environment, cKy, usrKy, ordKy);

            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult BOQOrdHdr_SelectWeb(string ordKy)
        {
            int cKy = HTNSession.CKy;
            int usrKy = HTNSession.UsrKy;

            List<OrderHdrModel> list = new List<OrderHdrModel>();
            list = apiOpr.BOQOrdHdr_SelectWeb(HTNSession.Environment, cKy, usrKy, ordKy);

            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetPRDetailForFind(string ordKy)
        {
            int cKy = HTNSession.CKy;
            int usrKy = HTNSession.UsrKy;

            List<OrderModel> list = new List<OrderModel>();
            list = apiOpr.GetPRDetailForFind(HTNSession.Environment, cKy, usrKy, ordKy);

            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult BOQOrdDet_SelectWeb(string ordKy)
        {
            int cKy = HTNSession.CKy;
            int usrKy = HTNSession.UsrKy;

            List<OrderModel> list = new List<OrderModel>();
            list = apiOpr.BOQOrdDet_SelectWeb(HTNSession.Environment, cKy, usrKy, ordKy);

            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetLocListForOrder(string TrnTyp)
        {
            int cKy = HTNSession.CKy;
            int usrKy = HTNSession.UsrKy;

            List<ItmCatOrderModel> list = new List<ItmCatOrderModel>();
            list = apiOpr.GetLocListForOrder(HTNSession.Environment, cKy, usrKy, TrnTyp);

            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetAccountListForOrder(string AccTyp = "")
        {
            int cky = HTNSession.CKy;
            int usrKy = HTNSession.UsrKy;

            List<AccOrderModel> list = new List<AccOrderModel>();
            list = apiOpr.GetAccountListForOrder(HTNSession.Environment, cky, usrKy, AccTyp);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetAdrByAccForOrder(string AccKy)
        {
            int cky = HTNSession.CKy;
            int usrKy = HTNSession.UsrKy;

            List<AdrOrderModel> list = new List<AdrOrderModel>();
            list = apiOpr.GetAdrByAccForOrder(HTNSession.Environment, cky, usrKy, AccKy);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetAdrForOrder()
        {
            int cky = HTNSession.CKy;
            int usrKy = HTNSession.UsrKy;

            List<AdrOrderModel> list = new List<AdrOrderModel>();
            list = apiOpr.GetAdrForOrder(HTNSession.Environment, cky, usrKy);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult ItemForOrder(int ObjKy, string OrdItemDet)
        {
            int cky = HTNSession.CKy;
            int usrKy = HTNSession.UsrKy;

            List<ItemForOrdtypModel> list = new List<ItemForOrdtypModel>();
            list = apiOpr.ItemForOrder(HTNSession.Environment, cky, ObjKy, usrKy, OrdItemDet);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetItmRateDisTax(int ObjKy, string OrdItemDet)
        {
            int cky = HTNSession.CKy;
            int usrKy = HTNSession.UsrKy;

            List<GetItmRateDisTax> list = new List<GetItmRateDisTax>();
            list = apiOpr.GetItmRateDisTax(HTNSession.Environment, cky, ObjKy, usrKy, OrdItemDet);
            return Json(list, JsonRequestBehavior.AllowGet);

        }

        public JsonResult ItmCdForOrder(string ConCd, string OurCd = "")
        {
            int cky = HTNSession.CKy;
            int usrKy = HTNSession.UsrKy;

            List<ItemForOrdtypModel> list = new List<ItemForOrdtypModel>();
            list = apiOpr.ItmCdForOrder(HTNSession.Environment, cky, usrKy, ConCd, OurCd);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult ItmNmForOrder(string ConCd, string OurCd = "")
        {
            int cky = HTNSession.CKy;
            int usrKy = HTNSession.UsrKy;

            List<ItemForOrdtypModel> list = new List<ItemForOrdtypModel>();
            list = apiOpr.ItmNmForOrder(HTNSession.Environment, cky, usrKy, ConCd, OurCd);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        

        public JsonResult GetAnlTypForOrder(string ConCd)
        {
            int cky = HTNSession.CKy;
            int usrKy = HTNSession.UsrKy;

            List<ItmCatOrderModel> list = new List<ItmCatOrderModel>();
            list = apiOpr.GetAnlTypForOrder(HTNSession.Environment, cky, usrKy, ConCd);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetMultiUnitsForOrder(int ItmKy,string OrdTypKy = "1")
        {
            int usrKy = HTNSession.UsrKy;
            List<UnitModelForOrder> list = new List<UnitModelForOrder>();
            list = apiOpr.GetMultiUnitsForOrder(HTNSession.Environment, usrKy, ItmKy, OrdTypKy,HTNSession.CKy);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetTaskListForOrder(int PrjKy)
        {
            int usrKy = HTNSession.UsrKy;

            List<TaskModelForOrder> list = new List<TaskModelForOrder>();
            list = apiOpr.GetTaskListForOrder(HTNSession.Environment, usrKy, PrjKy);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult InsertHdrPurchaseReq(string purReqHdr, string ObjKy)
        {
            int cky = HTNSession.CKy;
            int usrKy = HTNSession.UsrKy;

            OrderNo OrdKy = apiOpr.InsertHdrPurchaseReq(HTNSession.Environment,cky, usrKy, Convert.ToInt32(ObjKy), purReqHdr);
            HTNCache.ClearCacheItems("OdrCode", "CKy-" + cky.ToString());
            return Json(OrdKy, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetCurrencyListForOrder()
        {
            int cky = HTNSession.CKy;
            int usrKy = HTNSession.UsrKy;

            List<ItmCatOrderModel> list = new List<ItmCatOrderModel>();
            list = apiOpr.GetCurrencyListForOrder(HTNSession.Environment, cky, usrKy);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetPmtListForOrder()
        
        {
            int cky = HTNSession.CKy;
            int usrKy = HTNSession.UsrKy;

            List<ItmCatOrderModel> pmtObj = new List<ItmCatOrderModel>();
            pmtObj = apiOpr.GetPmtListForOrder(HTNSession.Environment, cky, usrKy);
            return Json(pmtObj, JsonRequestBehavior.AllowGet);
        }

        public JsonResult UpdateHdrPurchaseReq(string purReqUpdtHdr, string ObjKy)
        {
            int cky = HTNSession.CKy;
            int usrKy = HTNSession.UsrKy;

            bool msg = apiOpr.UpdateHdrPurchaseReq(HTNSession.Environment, cky, usrKy, Convert.ToInt32(ObjKy), purReqUpdtHdr);
            if (msg)
            {
                HTNCache.ClearCacheItems("OdrCode", "CKy-" + cky.ToString());
            }
            return Json(msg, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetAddressForOrder()
        {
            int cky = HTNSession.CKy;
            int usrKy = HTNSession.UsrKy;

            List<AdrOrderModel> list = new List<AdrOrderModel>();
            list = apiOpr.GetAddressForOrder(HTNSession.Environment, cky, usrKy);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetPurAcListForOrder(string ConCd, string OurCd)
        {
            int cKy = HTNSession.CKy;
            int usrKy = HTNSession.UsrKy;

            List<AccOrderModel> list = new List<AccOrderModel>();
            list = apiOpr.GetPurAcListForOrder(HTNSession.Environment, cKy, usrKy, ConCd, OurCd);

            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetAdrKyForOrder(string AccKy)
        {
            int cky = HTNSession.CKy;
            int usrKy = HTNSession.UsrKy;

            List<AdrOrderModel> list = new List<AdrOrderModel>();
            list = apiOpr.GetAdrKyForOrder(HTNSession.Environment, cky, usrKy, AccKy);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetAccKyForOrder(string AdrKy)
        {
            int usrKy = HTNSession.UsrKy;

            List<AccOrderModel> list = new List<AccOrderModel>();
            list = apiOpr.GetAccKyForOrder(HTNSession.Environment, usrKy, AdrKy);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult InsertPurchesReqDetail(string updatedOrders, string deletedOrders, string newOrders, string purReqDetail)
        {
            int cky = HTNSession.CKy;
            int usrKy = HTNSession.UsrKy;

            bool msg = apiOpr.InsertPurchesReqDetail(HTNSession.Environment, cky, usrKy, updatedOrders, deletedOrders, newOrders, purReqDetail);
            return Json(msg, JsonRequestBehavior.AllowGet);
        }

        //update drag n drop grid
       

        public JsonResult GetPurchesReq(string ordKy)
        {
            int cKy = HTNSession.CKy;
            int usrKy = HTNSession.UsrKy;

            List<OrderModel> list = new List<OrderModel>();
            list = apiOpr.GetPurchesReq(HTNSession.Environment, cKy, usrKy, ordKy);

            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult PnsItemsLookUpByItmCd(string itemForChange)
        {
            int cKy = HTNSession.CKy;
            int usrKy = HTNSession.UsrKy;

            List<ItemForOrdtypModel> list = new List<ItemForOrdtypModel>();
            list = apiOpr.PnsItemsLookUpByItmCd(HTNSession.Environment, cKy, usrKy, itemForChange);

            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult PrintOrder(int OrdKy, string RptTitle)
        {
            if (OrdKy != null)
            {
                Session["OrdKyForDetailsInvoice"] = OrdKy;
            }
            Session["RptTitleForDetailsInvoice"] = RptTitle;

            return Json("Success", JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetfrmPurOrdSearch(string PRFindDet)
        {
            int cKy = HTNSession.CKy;
            int usrKy = HTNSession.UsrKy;

            List<OrderSearchModel> list = new List<OrderSearchModel>();
            list = apiOpr.GetfrmPurOrdSearch(HTNSession.Environment, cKy, usrKy, PRFindDet);

            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult OrdTypPendingOrdTyp_SelectWeb(string PRFindDet)
        {
            int cKy = HTNSession.CKy;
            int usrKy = HTNSession.UsrKy;

            List<OrderSearchModel> list = new List<OrderSearchModel>();
            list = apiOpr.OrdTypPendingOrdTyp_SelectWeb(HTNSession.Environment, cKy, usrKy, PRFindDet);

            return Json(list, JsonRequestBehavior.AllowGet);
        }


        public JsonResult OrdTypPendingOrdTypDetails_SelectWeb(string ordKy, string ConCd, string OurCd, string ObjKy)
        {
            int cky = HTNSession.CKy;
            int usrKy = HTNSession.UsrKy;
            List<OrderModel> list = new List<OrderModel>();
            list = apiOpr.OrdTypPendingOrdTypDetails_SelectWeb(HTNSession.Environment, cky, usrKy, ordKy, ConCd, OurCd, ObjKy);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetHdrDetailFromPOForOrder(string ordKy, string ConCd, string OurCd)
        {
            int cky = HTNSession.CKy;
            int usrKy = HTNSession.UsrKy;
            List<OrderModel> list = new List<OrderModel>();
            list = apiOpr.GetHdrDetailFromPOForOrder(HTNSession.Environment, cky, usrKy, ordKy, ConCd, OurCd);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetGridDetailFromPOForOrder(string ordKy, string ConCd, string OurCd)
        {
            int cky = HTNSession.CKy;
            int usrKy = HTNSession.UsrKy;
            List<OrderModel> list = new List<OrderModel>();
            list = apiOpr.GetGridDetailFromPOForOrder(HTNSession.Environment, cky, usrKy, ordKy, ConCd, OurCd);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult PurchaseOrderPreview(string OrdKy)
        {
            Session["PurchaseOrderOrdKy"] = OrdKy;   
            return Json("Success", JsonRequestBehavior.AllowGet); 
        }

        public JsonResult PurchaseRequisitionPreview(string OrdKy)
        {
            Session["PurchaseRequisitionOrdKy"] = OrdKy;
            return Json("Success", JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetOrdDayforPnS()
        {
            int cky = HTNSession.CKy;
            int usrKy = HTNSession.UsrKy;

            List<OrdDayModel> list = new List<OrdDayModel>();

            list = apiOpr.GetOrdDayforPnS(HTNSession.Environment, cky, usrKy);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetDlvNoforPnS()
        {
            int cky = HTNSession.CKy;
            int usrKy = HTNSession.UsrKy;

            List<OrdDayModel> list = new List<OrdDayModel>();

            list = apiOpr.GetDlvNoforPnS(HTNSession.Environment, cky, usrKy);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        //Removed from the Order Controler to EditButtonController Since this is not related to this Class SOLID
        //public JsonResult ChkOrdEditValidation(int OrdKy)
        //{
        //    int UsrKy = HTNSession.UsrKy;
        //    int CKy = HTNSession.CKy;
        //    string EnvironmentName = HTNSession.Environment;

        //    bool result = apiOpr.ChkOrdEditValidation(CKy, UsrKy, OrdKy, EnvironmentName);
        //    return Json(result, JsonRequestBehavior.AllowGet);
        //}

        //public JsonResult OrdHdr_UnlockWeb(int OrdKy)
        //{
        //    int UsrKy = HTNSession.UsrKy;
        //    int CKy = HTNSession.CKy;
        //    string EnvironmentName = HTNSession.Environment;

        //    bool result = apiOpr.OrdHdr_UnlockWeb(CKy, UsrKy, OrdKy, EnvironmentName);
        //    return Json(result, JsonRequestBehavior.AllowGet);
        //}


    }
}
