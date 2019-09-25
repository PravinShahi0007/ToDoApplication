using BlueLotus.TransactionModel.Entity;
using BlueLotus.UI.ApiOperations;
using BlueLotus.UI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using TransactionModel.Entity;

namespace BlueLotus.UI.Controllers
{
    public class POSItmTransferController : Controller
    {
        //
        // GET: /POSItmTransfer/
        // 
        ApiOperation ApiOperation = new ApiOperation();

        public ActionResult Index(string OurCd, string OurCd2, int ObjKy, string ObjCaptn)
        {
            ViewBag.OurCd = OurCd;
            ViewBag.OurCd2 = OurCd2;
            ViewBag.ObjKy = ObjKy;
            ViewBag.ObjCaptn = ObjCaptn;
            return View(); 
            
        }
        public ActionResult ItmTransferIn(string OurCd, string OurCd2, int ObjKy, string ObjCaptn)
        {
            ViewBag.OurCd = OurCd;
            ViewBag.OurCd2 = OurCd2;
            ViewBag.ObjKy = ObjKy;
            ViewBag.ObjCaptn = ObjCaptn;
            return View("ItmTransferIn");
        }
        
        public JsonResult GetItemByCodeEAN(string ItemCode, string EAN)
        {
            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;
            string Environment = HTNSession.Environment;
            List<ItemTransferDataModel> ProfDet = new List<ItemTransferDataModel>();
            ProfDet = ApiOperation.GetItemByCodeEAN(Environment, UsrKy, CKy, ItemCode,EAN);
            return Json(ProfDet, JsonRequestBehavior.AllowGet);
        }

        public JsonResult InsertTrnOutDetail(string updatedOrders, string newOrders, string deletedOrders,
            string FrmLocKy, string ToLocKy, string Date, string OurCdFrm, string OurCdTo, string ConCd, int ObjKy, string IsRecurrence = "true", string IsRecurrenceFromFind = "0", int isApr = 1)
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            string Environment = HTNSession.Environment;
            long FrmTrn = ApiOperation.InsertTrnHdr(Environment, CKy, UsrKy, OurCdFrm, ConCd, Date, FrmLocKy,1, ObjKy);
            long ToTrn = ApiOperation.InsertTrnHdr(Environment, CKy, UsrKy, OurCdTo, ConCd, Date, ToLocKy, FrmTrn, ObjKy);

            string FrmTrnKy = FrmTrn.ToString();
            string ToTrnKy = ToTrn.ToString();
            bool Msg = ApiOperation.InsertTrnOutDetail(Environment, updatedOrders, newOrders, deletedOrders, "1", "1", Date, FrmLocKy, ToLocKy, FrmTrnKy, ToTrnKy, OurCdFrm, OurCdTo, 1, 1, ConCd, CKy, UsrKy, isApr, ObjKy);
            return Json("Success!");
        }
        public JsonResult GetItemTrnsferNo(string OurCd)
        {
            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;
            string Environment = HTNSession.Environment;
            string ProfDet = ApiOperation.GetItemTrnsferNo(Environment, UsrKy, OurCd, CKy);
            return Json(Convert.ToInt32(ProfDet), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetItemTrnsferDetails(string Date, string OurCd, int FromLocKy, int ToLocKy)
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            string Environment = HTNSession.Environment;
            List<ItemTransferDataModel> list = new List<ItemTransferDataModel>();
            if (OurCd == "TRFIN")
                FromLocKy = ToLocKy;

            list = ApiOperation.GetItemTrnsferDetails(Environment, CKy, UsrKy, Date, OurCd, FromLocKy);
            return Json(list, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetItemTrnsferItmDetails(string TrnKy)
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            string Environment = HTNSession.Environment;
            List<ItemTransferDataModel> list = new List<ItemTransferDataModel>();
            list = ApiOperation.GetItemTrnsferItmDetails(Environment, CKy, UsrKy, TrnKy);
            return Json(list, JsonRequestBehavior.AllowGet);
        }
        public JsonResult UpdateTransferStatus(string TrnKy,string ContraTrnKy, string ConCd, string OurCd, int ObjKy)
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            string Environment = HTNSession.Environment;
            List<ItemTransferDataModel> list = new List<ItemTransferDataModel>();
            list = ApiOperation.UpdateTransferStatus(Environment, CKy, UsrKy, TrnKy, ConCd, OurCd, ObjKy);
            list = ApiOperation.UpdateTransferStatus(Environment, CKy, UsrKy, ContraTrnKy, ConCd, OurCd, ObjKy);
            return Json(list, JsonRequestBehavior.AllowGet);
        }
    }
}
