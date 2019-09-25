
using BlueLotus.TransactionModel.Entity;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Net.Sockets;
using System.Net;
using System.Web.Configuration;
using System.Drawing.Printing;
using BlueLotus.UI.ApiOperations;
using BlueLotus.UI.Models;
using System.IO;
using System.Net.Mail;
using Microsoft.Reporting.WebForms;
using System.Net.Mime;
using System.Configuration;
using BlueLotus.ComboLoad.Model;
using Telerik.Reporting.Processing;

namespace BlueLotus.UI.Controllers
{
    public class TransactionController : Controller
    {
        ApiOperation apiOpr = new ApiOperation();
        public static int UsrKy = 1;
        public static int cky = 1;
        public static string UsrNm;
        public static string cNm;
        //
        // GET: /Transaction/

        public ActionResult DetailInvoice(string OurCd, string OurCd2, int ObjKy, string ObjCaptn)
        {
            ViewBag.OurCd = OurCd;
            ViewBag.OurCd2 = OurCd2;
            ViewBag.ObjKy = ObjKy;
            ViewBag.ObjCaptn = ObjCaptn;

            return View("DetailInvoice");
        }
        public ActionResult DetailInvoice2(string OurCd, string OurCd2, int ObjKy, string ObjCaptn)
        {
            ViewBag.OurCd = OurCd;
            ViewBag.OurCd2 = OurCd2;
            ViewBag.ObjKy = ObjKy;
            ViewBag.ObjCaptn = ObjCaptn;

            return View("DetailInvoice2");
        }

        public ActionResult DetailInvoiceNew(string OurCd, string OurCd2, int ObjKy, string ObjCaptn)
        {
            ViewBag.OurCd = OurCd;
            ViewBag.OurCd2 = OurCd2;
            ViewBag.ObjKy = ObjKy;
            ViewBag.ObjCaptn = ObjCaptn;

            return View("DetailInvoiceNew");
        }

        public ActionResult Update_ItmQty(string OurCd, string OurCd2, int ObjKy, string ObjCaptn)
        {
            ViewBag.OurCd = OurCd;
            ViewBag.OurCd2 = OurCd2;
            ViewBag.ObjKy = ObjKy;
            ViewBag.ObjCaptn = ObjCaptn;

            return View("Update_ItmQty");
        }

        public ActionResult GRN(string OurCd, string OurCd2, int ObjKy, string ObjCaptn)
        {
            ViewBag.OurCd = OurCd;
            ViewBag.OurCd2 = OurCd2;
            ViewBag.ObjKy = ObjKy;
            ViewBag.ObjCaptn = ObjCaptn;

            return View("GRN");
        }

        public ActionResult ResourceUsage(string OurCd, string OurCd2, int ObjKy, string ObjCaptn)
        {
            ViewBag.OurCd = OurCd;
            ViewBag.OurCd2 = OurCd2;
            ViewBag.ObjKy = ObjKy;
            ViewBag.ObjCaptn = ObjCaptn;

            return View("Resource_Usage");
        }

        public ActionResult ItmTranfer(string OurCd, string OurCd2, int ObjKy, string ObjCaptn)
        {
            ViewBag.OurCd = OurCd;
            ViewBag.OurCd2 = OurCd2;
            ViewBag.ObjKy = ObjKy;
            ViewBag.ObjCaptn = ObjCaptn;

            return View("ItmTranfer");
        }

        public JsonResult LoadItemUpdateQtyGrid(int ObjKy, string OurCd, int TrnTypKy, int PrefixKy, int TrnNo)
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            List<UpdateItmQtyModel> UpdateItmQty = apiOpr.LoadItemUpdateQtyGrid(HTNSession.Environment, CKy, UsrKy, ObjKy, OurCd, TrnTypKy, PrefixKy, TrnNo);
            return Json(UpdateItmQty, JsonRequestBehavior.AllowGet);
        }

        public JsonResult InsertUpdateItemUpdateQtyGrid(int ObjKy, string OurCd, int TrnTyp, string updateRecords, string newRecords)
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            bool UpdateItmQty = apiOpr.InsertUpdateItemUpdateQtyGrid(HTNSession.Environment, CKy, UsrKy, ObjKy, OurCd, TrnTyp, updateRecords, newRecords);
            return Json(UpdateItmQty, JsonRequestBehavior.AllowGet);
        }

        public JsonResult ValidateTrnDt(string Date, string OurCd, string ConCd, string PrjKy, string LocKy)
        {
            int cky = HTNSession.CKy;
            int usrKy = HTNSession.UsrKy;
            List<ValidateModel> list = new List<ValidateModel>(); if (Date != null)
            {
                string[] afdate = Date.Split('/');
                string Dt = afdate.GetValue(0).ToString();
                string ddlfmonth = afdate.GetValue(1).ToString();
                string ddlfyear = afdate.GetValue(2).ToString();
                string sOrddate = ddlfyear + "/" + ddlfmonth + "/" + Dt;
                list = apiOpr.ValidateTrnDt(HTNSession.Environment, cky, sOrddate, OurCd, ConCd, PrjKy, LocKy, usrKy);
            }
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult InsertHdrInvoice(string strDate, string strAddressName, string OurCd, string ConCd)
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            try
            {
                long Key = apiOpr.InsertItemRecords(HTNSession.Environment, CKy, UsrKy, strDate, strAddressName, OurCd, ConCd);
                return Json(Key, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public JsonResult InsertDeatilHdrInvoice(int ObjKy, int ContraAccObjKy, int AccObjKy, string PrjKy, string AdrKy, string FrmLocKy, string BUKY, string AccKy, string Date, string OurCd, string ConCd, string DocNo, string Yurref, string ExRate, string Currency, string Pmt, string SlsACId, string Dsicount, string NBT, string Vat, string Wht, string Svat, string SubTotal, string Total, string DliNo, string Des, string Rem, string RepAdrKy, string OrdNoKy, string Amt1, string Amt2, string Amt3, string Amt4, string Amt5, string Amt6, string ComisPer, string RepComisPer, string IsRecurrence = "true", int isApr = 1, string FrmTrnKy="1")
        {                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
            int CKy = HTNSession.CKy;                                                                                                                                                                                                                                                                                                                                                                                                                                           
            int UsrKy = HTNSession.UsrKy;                                                                                                                                                                                                                                                                                                                                                                                                                                       
            TrnHdr_SelectModel trnHdr_SelectModel = apiOpr.InsertDeatilHdrInvoice(HTNSession.Environment, CKy, UsrKy, ObjKy, ContraAccObjKy, AccObjKy, PrjKy, AdrKy, FrmLocKy, BUKY, AccKy, Date, OurCd, ConCd, DocNo, Yurref, ExRate, Currency, Pmt, SlsACId, Dsicount, NBT, Vat, Wht, Svat, SubTotal, Total, DliNo, Des, Rem, Convert.ToInt32(RepAdrKy), Convert.ToInt32(OrdNoKy), Convert.ToInt32(Amt1), Convert.ToInt32(Amt2), Convert.ToInt32(Amt3), Convert.ToInt32(Amt4), Convert.ToInt32(Amt5), Convert.ToInt32(Amt6), Convert.ToInt32(ComisPer), Convert.ToInt32(RepComisPer), IsRecurrence, isApr, FrmTrnKy);                                                                      
            return Json(trnHdr_SelectModel, JsonRequestBehavior.AllowGet);                                                                                                                                                                                                                                                                                                                                                                                                      
        }


        public JsonResult InsertAccountsInvoice(string TrnKy, int ObjKy, string OurCd, string ConCd, string Dt, string Pmt, string Currency)
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;

            string succuss = apiOpr.InsertAccountsInvoice(HTNSession.Environment, TrnKy, ObjKy, OurCd, ConCd, Dt, Pmt, Currency, CKy, UsrKy);
            return Json(succuss, JsonRequestBehavior.AllowGet);
        }

        public JsonResult UpdateDeatilHdrInvoice(
            int ObjKy, int AccessLvlKy, int ConfiLvlKy, int ContraAccObjKy, int AccObjKy,
            string PrjKy, string AdrKy, string FrmLocKy, string BUKY, string AccKy,
            string Date, string OurCd, string ConCd, string DocNo, string Yurref,
            string YurRefDate, string ExRate, string Currency, string Pmt, string SlsACId,
            string Dsicount, string NBT, string Vat, string Wht, string Svat, string SubTotal,
            string Total, string DliNo, string Des, string Rem, string OrdKySelect, string OrdTypKySelect,
            string OrdPrefixKySelect, string OrdNoSelect, string TmStmp, string RepAdrKy, string OrdNoKy,
            string Amt1, string Amt2, string Amt3, string Amt4, string Amt5, string Amt6, string ComisPer, string RepComisPer, string IsRecurrence = "true", int isApr = 1)
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            TrnHdr_SelectModel trnHdr_SelectModel = apiOpr.UpdateDeatilHdrInvoice(
                HTNSession.Environment, CKy, UsrKy, ObjKy, AccessLvlKy, ConfiLvlKy, ContraAccObjKy,
                AccObjKy, PrjKy, AdrKy, FrmLocKy, BUKY, AccKy, Date, OurCd, ConCd, DocNo, Yurref,
                YurRefDate, ExRate, Currency, Pmt, SlsACId, Dsicount, NBT, Vat, Wht, Svat, SubTotal,
                Total, DliNo, Des, Rem, OrdKySelect, OrdTypKySelect, OrdPrefixKySelect, OrdNoSelect, TmStmp, Convert.ToInt32(RepAdrKy), Convert.ToInt32(OrdNoKy), Convert.ToInt32(Amt1), Convert.ToInt32(Amt2), Convert.ToInt32(Amt3), Convert.ToInt32(Amt4), Convert.ToInt32(Amt5), Convert.ToInt32(Amt6), Convert.ToInt32(ComisPer), Convert.ToInt32(RepComisPer), IsRecurrence, isApr);
            return Json(trnHdr_SelectModel, JsonRequestBehavior.AllowGet);
        }

        public JsonResult UpdateAccountsInvoice(string PrjKy, string AdrKy, string FrmLocKy, string BUKY, string AccKy, string Date, string DocNo, string Yurref, string ExRate, string Currency, string Pmt, string SlsACId, string Dsicount, string Tax, string ordKydata, string AccTrnKy)
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            try
            {
                bool success = apiOpr.UpdateAccountsInvoice(HTNSession.Environment, UsrKy, PrjKy, AdrKy, FrmLocKy, BUKY, AccKy, Date, DocNo, Yurref, ExRate, Currency, Pmt, SlsACId, Dsicount, Tax, ordKydata, AccTrnKy);
                return Json("success", JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public JsonResult InsertDetailGridInvoice(int AccessLvlKy, string updatedOrders, string newOrders, string deletedOrders, int ObjKy, string PrjKy, string AdrKy, string FrmLocKy, string AccKy, string BUKY, string Date, string ordKydata, string ConCd, string OurCd)
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            try
            {
                bool success = apiOpr.InsertDetailGridInvoice(HTNSession.Environment, CKy, UsrKy,ObjKy, Convert.ToInt32(AccessLvlKy), updatedOrders, newOrders, deletedOrders, PrjKy, AdrKy, FrmLocKy, AccKy, BUKY, Date, ordKydata, ConCd, OurCd);
                return Json(success, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public JsonResult GetCusAccountList()
        {
            int cky = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            List<AccModel> list = new List<AccModel>();
            list = apiOpr.GetCusAccountList(HTNSession.Environment, cky, UsrKy);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetPmtList(string ConCd)
        {
            int cky = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            List<ItmMasCatModel> list = new List<ItmMasCatModel>();
            list = apiOpr.GetPmtList(HTNSession.Environment, ConCd, cky, UsrKy);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetProjectList()
        {
            int cky = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            List<CMSproject> list = new List<CMSproject>();
            list = apiOpr.GetProjectList(HTNSession.Environment, cky, UsrKy);
            return Json(list, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetAdrByAcc(string AccKy)
        {

            int cky = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            List<AdrModel> list = new List<AdrModel>();
            list = apiOpr.GetAdrByAcc(HTNSession.Environment, cky, AccKy, UsrKy);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetAdrByAccAndUsr(string AccKy, string EnvironmentName)
        {
            List<List<Object>> list = new List<List<Object>>();

            list = apiOpr.GetAdrByAccAndUsr(AccKy, EnvironmentName);

            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetCurrencyList()
        {
            int cky = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            List<ItmMasCatModel> list = new List<ItmMasCatModel>();
            list = apiOpr.GetCurrencyList(HTNSession.Environment, cky, UsrKy);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult PrjPrgrsItmTrn_SelectWeb(string ordKy)
        {
            int cky = HTNSession.CKy;
            int usrKy = HTNSession.UsrKy;
            List<OrderModel> list = new List<OrderModel>();
            list = apiOpr.PrjPrgrsItmTrn_SelectWeb(HTNSession.Environment, ordKy, cky, usrKy);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetGridInvoiceDetail(string ordKy)
        {
            int cky = HTNSession.CKy;
            int usrKy = HTNSession.UsrKy;
            List<GRN> list = new List<GRN>();
            list = apiOpr.GetGridInvoiceDetail(HTNSession.Environment, ordKy, cky, usrKy);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetInvoiceItemsDetail(string TrnTypKy, string ordKy)
        {
            int cky = HTNSession.CKy;
            int usrKy = HTNSession.UsrKy;
            List<OrderModel> list = new List<OrderModel>();
            list = apiOpr.GetInvoiceItemsDetail(HTNSession.Environment, TrnTypKy, ordKy, cky, usrKy);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetInvoiceAccountsDetail(string ordKy)
        {
            int cky = HTNSession.CKy;
            int usrKy = HTNSession.UsrKy;
            List<GRN> list = new List<GRN>();
            list = apiOpr.GetInvoiceAccountsDetail(HTNSession.Environment, ordKy, cky, usrKy);
            return Json(list, JsonRequestBehavior.AllowGet);
        }


        public JsonResult GetDisAmt(string ConCd, string OurCd, string ItmKy, string AdrKy, string Pmt, string Dt)
        {
            int cky = HTNSession.CKy;
            int usrKy = HTNSession.UsrKy;
            List<GRN> list = new List<GRN>();
            list = apiOpr.GetDisAmt(HTNSession.Environment, usrKy, ConCd, OurCd, cky, ItmKy, AdrKy, Pmt, Dt);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetTaxAccount(string AdrKy)
        {
            int cky = HTNSession.CKy;
            int usrKy = HTNSession.UsrKy;
            List<TaxNoModel> list = new List<TaxNoModel>();
            list = apiOpr.GetTaxAccount(HTNSession.Environment, AdrKy, cky, usrKy);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetTaxTyp1Val(string ItmKy, string Dt)
        {
            int cky = HTNSession.CKy;
            int usrKy = HTNSession.UsrKy;
            List<TaxNoModel> list = new List<TaxNoModel>();
            list = apiOpr.GetTaxTyp1Val(HTNSession.Environment, ItmKy, Dt, cky, usrKy);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetToProjectList()
        {
            int cky = HTNSession.CKy;
            int usrKy = HTNSession.UsrKy;
            List<CMSproject> list = new List<CMSproject>();
            list = apiOpr.GetToProjectList(HTNSession.Environment, cky, usrKy);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetFromLocList(string TrnTyp)
        {
            int cky = HTNSession.CKy;
            int usrKy = HTNSession.UsrKy;
            List<ItmMasCatModel> list = new List<ItmMasCatModel>();
            list = apiOpr.GetFromLocList(HTNSession.Environment, cky, usrKy, TrnTyp);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetToLocList()
        {
            int cky = HTNSession.CKy;
            int usrKy = HTNSession.UsrKy;
            List<ItmMasCatModel> list = new List<ItmMasCatModel>();
            list = apiOpr.GetToLocList(HTNSession.Environment, cky, usrKy);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetItemMultiUnits(int ItmKy, string trnTypKy = "1")
        {
            int cky = HTNSession.CKy;
            int usrKy = HTNSession.UsrKy;
            List<UnitModel> list = new List<UnitModel>();
            list = apiOpr.GetItemMultiUnits(HTNSession.Environment, ItmKy, cky, usrKy, trnTypKy);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetTaskList(int PrjKy)
        {
            int cky = HTNSession.CKy;
            int usrKy = HTNSession.UsrKy;
            List<TaskModel> list = new List<TaskModel>();
            list = apiOpr.GetTaskList(HTNSession.Environment, PrjKy, cky, usrKy);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetItmKyByAdress(string AdrKy, string ObjKy)
        {
            int cky = HTNSession.CKy;
            int usrKy = HTNSession.UsrKy;
            List<ItemForOrdtypModel> list = new List<ItemForOrdtypModel>();
            list = apiOpr.GetItmKyByAdress(HTNSession.Environment, Convert.ToInt32(AdrKy), Convert.ToInt32(ObjKy), cky, usrKy);
            return Json(list, JsonRequestBehavior.AllowGet);
        }


        public JsonResult GetAnlTyp(string ConCd)
        {
            int cky = HTNSession.CKy;
            int usrKy = HTNSession.UsrKy;
            List<ItmMasCatModel> list = new List<ItmMasCatModel>();
            list = apiOpr.GetAnlTyp(HTNSession.Environment, cky, usrKy, ConCd);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetAddress()
        {
            int cky = HTNSession.CKy;
            int usrKy = HTNSession.UsrKy;
            List<AdrModel> list = new List<AdrModel>();
            list = apiOpr.GetAddress(HTNSession.Environment, cky, usrKy);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetDlvAdrList()
        {
            int cky = HTNSession.CKy;
            int usrKy = HTNSession.UsrKy;
            List<ItmMasCatModel> list = new List<ItmMasCatModel>();
            list = apiOpr.GetDlvAdrList(HTNSession.Environment, cky, usrKy);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetTask()
        {
            int cky = HTNSession.CKy;
            int usrKy = HTNSession.UsrKy;
            int PrjKy = Convert.ToInt32(Session["prjky"].ToString());
            List<PrcsModel> list = new List<PrcsModel>();
            list = apiOpr.GetTask(HTNSession.Environment, PrjKy, cky, usrKy);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult ItemsLookUpByOrdTyp(string ConCd, string OurCd)
        {

            int cky = HTNSession.CKy;
            int usrKy = HTNSession.UsrKy;
            List<ItemForOrdtypModel> list = new List<ItemForOrdtypModel>();
            list = apiOpr.ItemsLookUpByOrdTyp(HTNSession.Environment, cky, ConCd, OurCd, usrKy);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult ItemsLookUpByTrnTyp(string ConCd, string OurCd)
        {

            int cky = HTNSession.CKy;
            int usrKy = HTNSession.UsrKy;
            List<ItemForOrdtypModel> list = new List<ItemForOrdtypModel>();
            list = apiOpr.ItemsLookUpByTrnTyp(HTNSession.Environment, cky, ConCd, OurCd, usrKy);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetTaskByOrdTyp(long strPrjKy)
        {

            int cky = HTNSession.CKy;
            int usrKy = HTNSession.UsrKy;
            // int PrjKy = Convert.ToInt32(Session["PRJKY"].ToString());
            List<PrcsModel> list = new List<PrcsModel>();
            list = apiOpr.GetTaskByOrdTyp(HTNSession.Environment, cky, usrKy, strPrjKy);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult InsertHdr(string PrjKy, string AdrKy, string FrmLocKy, string Date, string Des, string Remarks, string SubTotal, string Dsicount, string NBT, string Tax, string Total, string OurCd, string ConCd, string DocNo)
        {
            int cky = HTNSession.CKy;
            int usrKy = HTNSession.UsrKy;
            long OrdKy = apiOpr.InsertIHdr(HTNSession.Environment, cky, usrKy, PrjKy, AdrKy, FrmLocKy, Date, Des, Remarks, SubTotal, Dsicount, NBT, Tax, Total, OurCd, ConCd, DocNo);
            //try
            //{
            //    if (OrdKy != null)
            //    {
            //        Session["ORDKY"] = OrdKy;
            //    }
            //    else
            //    {
            //        Session["ORDKY"] = 1;
            //    }
            //    return Json("success");
            //}
            //catch (Exception ex)
            //{
            //    throw;
            //}
            return Json(OrdKy, JsonRequestBehavior.AllowGet);

        }

        public JsonResult InsertHdrPurshesReq(string PrjKy, string AdrKy, string FrmLocKy, string BUKY, string AccKy, string Date, string OurCd, string ConCd, string DocNo, string Yurref, string ExRate, string Currency, string Pmt, string SubTotal, string Dsicount, string NBT, string Vat, string Wht, string Svat, string Total)
        {
            int cky = HTNSession.CKy;
            int usrKy = HTNSession.UsrKy;
            long OrdKy = apiOpr.InsertHdrPurshesReq(HTNSession.Environment, cky, usrKy, PrjKy, AdrKy, FrmLocKy, BUKY, AccKy, Date, OurCd, ConCd, DocNo, Yurref, ExRate, Currency, Pmt, SubTotal, Dsicount, NBT, Vat, Wht, Svat, Total);

            return Json(OrdKy, JsonRequestBehavior.AllowGet);
        }


        public JsonResult InsertHdrGRN(string PrjKy, string AdrKy, string FrmLocKy, string BUKY, string AccKy, string Date, string OurCd, string ConCd, string DocNo, string Yurref, string YurRefDate, string ExRate, string Currency, string Pmt, string SlsACId, string Dsicount, string NBT, string Vat, string Wht, string Svat, string SubTotal, string Total)
        {
            int cky = HTNSession.CKy;
            int usrKy = HTNSession.UsrKy;
            long OrdKy = apiOpr.InsertHdrGRN(HTNSession.Environment, cky, usrKy, PrjKy, AdrKy, FrmLocKy, BUKY, AccKy, Date, OurCd, ConCd, DocNo, Yurref, YurRefDate, ExRate, Currency, Pmt, SlsACId, Dsicount, NBT, Vat, Wht, Svat, SubTotal, Total);

            return Json(OrdKy, JsonRequestBehavior.AllowGet);
        }



        public JsonResult UpdateHdrGRN(string PrjKy, string AdrKy, string FrmLocKy, string BUKY, string AccKy, string Date, string OrdKySelect, string OrdTypKySelect, string OrdPrefixKySelect, string OrdNoSelect, string DocNo)
        {
            int cky = HTNSession.CKy;
            int usrKy = HTNSession.UsrKy;
            long OrdKy = apiOpr.UpdateHdrGRN(HTNSession.Environment, cky, usrKy, PrjKy, AdrKy, FrmLocKy, BUKY, AccKy, Date, OrdKySelect, OrdTypKySelect, OrdPrefixKySelect, OrdNoSelect, DocNo);

            return Json(OrdKy, JsonRequestBehavior.AllowGet);
        }

        public JsonResult InsertGRNGrid(string updatedOrders, string newOrders, string deletedOrders, string PrjKy, string AdrKy, string FrmLocKy, string AccKy, string BUKY, string Date, string ordKydata)
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            // int newKy =  Convert.ToInt32(Session["ORDKY"].ToString());
            bool Msg = apiOpr.InsertGRNGrid(HTNSession.Environment, CKy, UsrKy, updatedOrders, newOrders, deletedOrders, PrjKy, AdrKy, FrmLocKy, AccKy, BUKY, Date, ordKydata);
            return Json("Success!");
        }

        public JsonResult UpdateHdr(string PrjKy, string AdrKy, string FrmLocKy, string Date, string Des, string OrdKySelect, string OrdTypKySelect, string OrdPrefixKySelect, string OrdNoSelect, string Remarks, string SubTotal, string Dsicount, string NBT, string Tax, string Total, string DocNo)
        {
            int cky = HTNSession.CKy;
            int usrKy = HTNSession.UsrKy;
            bool Msg = apiOpr.UpdateHdr(HTNSession.Environment, cky, usrKy, PrjKy, AdrKy, FrmLocKy, Date, Des, OrdKySelect, OrdTypKySelect, OrdPrefixKySelect, OrdNoSelect, Remarks, SubTotal, Dsicount, NBT, Tax, Total, DocNo);
            //try
            //{
            //    if (OrdKy != null)
            //    {
            //        Session["ORDKY"] = OrdKy;
            //    }
            //    else
            //    {
            //        Session["ORDKY"] = 1;
            //    }
            //    return Json("success");
            //}
            //catch (Exception ex)
            //{
            //    throw;
            //}
            return Json(Msg, JsonRequestBehavior.AllowGet);
        }

        public JsonResult InsertDetail(string updatedOrders, string newOrders, string deletedOrders, string PrjKy, string AdrKy, string ToLocKy, string ordKydata)
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            // int newKy =  Convert.ToInt32(Session["ORDKY"].ToString());
            bool Msg = apiOpr.InsertDetail(HTNSession.Environment, CKy, UsrKy, updatedOrders, newOrders, deletedOrders, PrjKy, AdrKy, ToLocKy, ordKydata);
            return Json("Success!");
        }

        public JsonResult InsertPurchesReqDetail(string updatedOrders, string newOrders, string deletedOrders, string PrjKy, string AdrKy, string FrmLocKy, string AccKy, string BUKY, string Date, string ConCd, string OurCd, string DlyAdrKy, string ordKydata)
        {
            int cky = HTNSession.CKy;
            int usrKy = HTNSession.UsrKy;
            // int newKy =  Convert.ToInt32(Session["ORDKY"].ToString());
            bool Msg = apiOpr.InsertPurchesReqDetail(HTNSession.Environment, cky, usrKy, updatedOrders, newOrders, deletedOrders, PrjKy, AdrKy, FrmLocKy, AccKy, BUKY, Date, ConCd, OurCd, DlyAdrKy, ordKydata);
            return Json("Success!");
        }
        public JsonResult UpdateHdrPurshesReq(string PrjKy, string AdrKy, string FrmLocKy, string Date, string Des, string OrdKySelect, string OrdTypKySelect, string OrdPrefixKySelect, string OrdNoSelect, string Remarks, string SubTotal, string Dsicount, string NBT, string Tax, string Total, string DocNo)
        {
            int cky = HTNSession.CKy;
            int usrKy = HTNSession.UsrKy;
            bool Msg = apiOpr.UpdateHdrPurshesReq(HTNSession.Environment, cky, usrKy, PrjKy, AdrKy, FrmLocKy, Date, Des, OrdKySelect, OrdTypKySelect, OrdPrefixKySelect, OrdNoSelect, Remarks, SubTotal, Dsicount, NBT, Tax, Total, DocNo);
            //try
            //{
            //    if (OrdKy != null)
            //    {
            //        Session["ORDKY"] = OrdKy;
            //    }
            //    else
            //    {
            //        Session["ORDKY"] = 1;
            //    }
            //    return Json("success");
            //}
            //catch (Exception ex)
            //{
            //    throw;
            //}
            return Json(Msg, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetOrdNo(string ordKy)
        {
            int cky = HTNSession.CKy;
            int usrKy = HTNSession.UsrKy;
            //   int newKy = Convert.ToInt32(Session["ORDKY"].ToString());
            List<OrderHdrModel> list = new List<OrderHdrModel>();
            list = apiOpr.GetOrdNo(HTNSession.Environment, cky, ordKy, usrKy);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetBUlist()
        {
            int cky = HTNSession.CKy;
            int usrKy = HTNSession.UsrKy;
            //   int newKy = Convert.ToInt32(Session["ORDKY"].ToString());
            List<ItmMasCatModel> list = new List<ItmMasCatModel>();
            list = apiOpr.GetBUlist(HTNSession.Environment, cky, usrKy);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetPurAcList(string ConCd, string OurCd)
        {
            int cky = HTNSession.CKy;
            int usrKy = HTNSession.UsrKy;
            //   int newKy = Convert.ToInt32(Session["ORDKY"].ToString());
            List<AccModel> list = new List<AccModel>();
            list = apiOpr.GetPurAcList(HTNSession.Environment, cky, ConCd, OurCd, usrKy);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetPurchesReq(string ordKy)
        {
            int cky = HTNSession.CKy;
            int usrKy = HTNSession.UsrKy;
            //   int newKy = Convert.ToInt32(Session["ORDKY"].ToString());
            List<OrderHdrModel> list = new List<OrderHdrModel>();
            list = apiOpr.GetPurchesReq(HTNSession.Environment, cky, ordKy, usrKy);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetSuplist()
        {
            int cky = HTNSession.CKy;
            int usrKy = HTNSession.UsrKy;
            List<AccModel> list = new List<AccModel>();
            list = apiOpr.GetSuplist(HTNSession.Environment, cky, usrKy);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetSuplistForGRN(int PrjKy, string ConCd, string OurCd)
        {
            int cky = HTNSession.CKy;
            int usrKy = HTNSession.UsrKy;
            List<AccModel> list = new List<AccModel>();
            list = apiOpr.GetSuplistForGRN(HTNSession.Environment, cky, PrjKy, ConCd, OurCd, usrKy);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetAccountList()
        {
            int cky = HTNSession.CKy;
            int usrKy = HTNSession.UsrKy;
            List<AccModel> list = new List<AccModel>();
            list = apiOpr.GetAccountList(HTNSession.Environment, cky, usrKy);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        //public JsonResult GetSupAccountList()
        //{
        //    int cky = HTNSession.CKy;

        //    List<AccModel> list = new List<AccModel>();
        //    list = service.GetSupAccountList(cky);
        //    return Json(list, JsonRequestBehavior.AllowGet);
        //}
        public JsonResult GetAddressList()
        {
            int cky = HTNSession.CKy;
            int usrKy = HTNSession.UsrKy;
            List<AdrModel> list = new List<AdrModel>();
            list = apiOpr.GetAddressList(HTNSession.Environment, cky, usrKy);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetAddressListByAcc()
        {
            int cky = HTNSession.CKy;
            int usrKy = HTNSession.UsrKy;
            List<AdrModel> list = new List<AdrModel>();
            list = apiOpr.GetAddressListByAcc(HTNSession.Environment, cky, usrKy);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetUnitbyItmky(string ItmKy)
        {
            int cky = HTNSession.CKy;
            int usrKy = HTNSession.UsrKy;
            List<UnitModel> list = new List<UnitModel>();
            list = apiOpr.GetUnitbyItmky(HTNSession.Environment, ItmKy, cky, usrKy);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetAdrKy(string AccKy)
        {
            int cky = HTNSession.CKy;
            int usrKy = HTNSession.UsrKy;
            List<AdrModel> list = new List<AdrModel>();
            list = apiOpr.GetAdrKy(HTNSession.Environment, AccKy, cky, usrKy);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetAccKy(string AdrKy)
        {
            int cky = HTNSession.CKy;
            int usrKy = HTNSession.UsrKy;
            List<AccModel> list = new List<AccModel>();
            list = apiOpr.GetAccKy(HTNSession.Environment, AdrKy, cky, usrKy);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetDetailByOrdKy()
        {
            int cky = HTNSession.CKy;
            int newKy = Convert.ToInt32(Session["ORDKY"].ToString());
            int usrKy = HTNSession.UsrKy;

            List<OrderModel> list = new List<OrderModel>();
            list = apiOpr.GetDetailByOrdKy(HTNSession.Environment, cky, newKy, usrKy);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult sendPrjKy(long strPrjKy)
        {
            try
            {
                if (strPrjKy != null)
                {
                    Session["PRJKY"] = strPrjKy;
                }
                else
                {
                    Session["PRJKY"] = 1;
                }
                return Json("success");
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public JsonResult sendPrjKyForTrnOut(long strPrjKy)
        {
            try
            {
                if (strPrjKy != null)
                {
                    Session["prjky"] = strPrjKy;
                }
                else
                {
                    Session["prjky"] = 1;
                }
                return Json("success");
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public JsonResult InsertItmTransferOutHdr(string ObjKy, string FrmPrjKy, string ToPrjKy, string FrmLocKy, string ToLocKy, string FrmAdrKy, string ToAdrKy, string Date, string DocNo, string Des, string Rem, string AdrKy, string OurCdFrm, string OurCdTo, string ConCd, string Amt, string PmtKy, string CrnKy, string DisAmt, string ExRate, string Yurref, string IsRecurrence = "true", int isApr = 1)
        {
            //int cky = HTNSession.CKy;
            //int usrKy = HTNSession.UsrKy;

            //long Key = apiOpr.InsertItmTransferOutHdr(HTNSession.Environment, cky, usrKy, FrmPrjKy, ToPrjKy, FrmLocKy, ToLocKy, Date, DocNo, Des, Rem, AdrKy, OurCdFrm, OurCdTo, ConCd, Amt, PmtKy, CrnKy, DisAmt, ExRate, Yurref);
            //return Json(Key, JsonRequestBehavior.AllowGet);

            int cky = HTNSession.CKy;
            int usrKy = HTNSession.UsrKy;

            List<TrnModel> Trnlist = new List<TrnModel>();
            Trnlist = apiOpr.InsertItmTransferOutHdr(HTNSession.Environment, cky, usrKy, Convert.ToInt32(ObjKy), FrmPrjKy, ToPrjKy, FrmLocKy, ToLocKy, FrmAdrKy, ToAdrKy, Date, DocNo, Des, Rem, AdrKy, OurCdFrm, OurCdTo, ConCd, Amt, PmtKy, CrnKy, DisAmt, ExRate, Yurref, IsRecurrence, isApr);
            try
            {
                foreach (TrnModel obj in Trnlist)
                {
                    int FrmTrnKy = Convert.ToInt32(obj.FromTrnKy);
                    Session["FRMTRNKY"] = FrmTrnKy;
                }
            }
            catch (Exception ex)
            { }
            return Json(Trnlist, JsonRequestBehavior.AllowGet);
        }
        public JsonResult InsertItmTransferInHdr(string FrmPrjKy, string ToPrjKy, string FrmLocKy, string ToLocKy, string FrmAdrKy, string ToAdrKy, string Date, string DocNo, string Des, string Rem, string AdrKy, string OurCdFrm, string OurCdTo, string ConCd, string Amt, string PmtKy, string CrnKy, string DisAmt, string ExRate, string Yurref, int ObjKy = 1, string IsRecurrence = "true", string IsRecurrenceFromFind = "0", int isApr = 1)
        {
            //int cky = HTNSession.CKy;
            //int usrKy = HTNSession.UsrKy;

            //long Key = apiOpr.InsertItmTransferInHdr(HTNSession.Environment, cky, usrKy, FrmPrjKy, ToPrjKy, FrmLocKy, ToLocKy, Date, DocNo, Des, Rem, AdrKy, OurCdFrm, OurCdTo, ConCd, Amt, PmtKy, CrnKy, DisAmt, ExRate, Yurref, FrmTrnKy);

            //return Json(Key, JsonRequestBehavior.AllowGet);

            int cky = HTNSession.CKy;
            int usrKy = HTNSession.UsrKy;

            List<TrnModel> Trnlist = new List<TrnModel>();
            Trnlist = apiOpr.InsertItmTransferOutHdr(HTNSession.Environment, cky, usrKy, ObjKy, FrmPrjKy, ToPrjKy, FrmLocKy, ToLocKy, FrmAdrKy, ToAdrKy, Date, DocNo, Des, Rem, AdrKy, OurCdFrm, OurCdTo, ConCd, Amt, PmtKy, CrnKy, DisAmt, ExRate, Yurref, IsRecurrence, isApr);
            try
            {
                foreach (TrnModel obj in Trnlist)
                {
                    int FrmTrnKy = Convert.ToInt32(obj.FromTrnKy);
                    Session["TOTRNKY"] = FrmTrnKy;
                }
            }
            catch (Exception ex)
            { }
            return Json(Trnlist, JsonRequestBehavior.AllowGet);
        }

        public JsonResult UpdateItmTransferInHdr(string FrmPrjKy, string ToPrjKy, string FrmLocKy, string ToLocKy, string Date, string DocNo, string Des, string AdrKy, string OurCdFrm, string OurCdTo, string ConCd, string Amt, string TrnFrmNoSelect, string TrnFrmKySelect, string TrnFrmTypKySelect, string TrnFrmPefixKySelect, string TrnToKySelect, string TrnToTypKySelect, string TrnToPefixKySelect)
        {
            int cky = HTNSession.CKy;
            int usrKy = HTNSession.UsrKy;
            bool Msg = apiOpr.UpdateItmTransferInHdr(HTNSession.Environment, cky, usrKy, FrmPrjKy, ToPrjKy, FrmLocKy, ToLocKy, Date, DocNo, Des, AdrKy, Amt, TrnFrmNoSelect, TrnFrmKySelect, TrnFrmTypKySelect, TrnFrmPefixKySelect, TrnToKySelect, TrnToTypKySelect, TrnToPefixKySelect);

            return Json(Msg, JsonRequestBehavior.AllowGet);
        }

        public JsonResult UpdateItmTransferOutHdr(string FrmTrnKy, string ToTrnKy, string FrmTrnNo, string ToTrnNo, string FrmTrnPrefixKy, string ToTrnPrefixKy, string FrmTrntypKy, string ToTrntypKy, string FrmTmStmp, string ToTmStmp, string FrmPrjKy, string ToPrjKy, string FrmLocKy, string ToLocKy, string FrmAdrKy, string ToAdrKy, string Date, string DocNo, string Des, string Rem, string AdrKy, string OurCdFrm, string OurCdTo, string ConCd, string Amt, string PmtKy, string CrnKy, string DisAmt, string ExRate, string Yurref, string AcsLvlKy, string ConFinLvlKy, string ObjKy, string IsRecurrence, int isApr)
        {
            int cky = HTNSession.CKy;
            int usrKy = HTNSession.UsrKy;
            List<TrnModel> Key = apiOpr.UpdateItmTransferOutHdr(HTNSession.Environment, FrmTrnKy, ToTrnKy, FrmTrnNo, ToTrnNo, FrmTrnPrefixKy, ToTrnPrefixKy, FrmTrntypKy, ToTrntypKy, FrmTmStmp, ToTmStmp, cky, usrKy, FrmPrjKy, ToPrjKy, FrmLocKy, ToLocKy, FrmAdrKy, ToAdrKy, Date, DocNo, Des, Rem, AdrKy, OurCdFrm, OurCdTo, ConCd, Amt, PmtKy, CrnKy, DisAmt, ExRate, Yurref, Convert.ToInt32(AcsLvlKy), Convert.ToInt32(ConFinLvlKy), Convert.ToInt32(ObjKy), IsRecurrence, isApr);

            return Json(Key, JsonRequestBehavior.AllowGet);
        }

        public JsonResult InsertTrnOutDetail(string updatedOrders, string deletedOrders, string newOrders, string FrmPrjKy, string ToPrjKy, string Date, string FrmLocKy, string ToLocKy, string FrmTrnKy, string ToTrnKy, string OurCdFrm, string OurCdTo, string FrmAdrKy, string ToAdrKy, string ConCd, int isApr, string ObjKy)
        {
            int cky = HTNSession.CKy;
            int usrKy = HTNSession.UsrKy;
            bool Msg = apiOpr.InsertTrnOutDetail(HTNSession.Environment, updatedOrders, newOrders, deletedOrders, FrmPrjKy, ToPrjKy, Date, FrmLocKy, ToLocKy, FrmTrnKy, ToTrnKy, OurCdFrm, OurCdTo, Convert.ToInt32(FrmAdrKy), Convert.ToInt32(ToAdrKy), ConCd, cky, usrKy, isApr, Convert.ToInt32(ObjKy));
            return Json(Msg);
        }

        public JsonResult ItmTrnOut_FIFO_PTrnKyItmTrnToAccTrn(int FrmTrnKy, int ObjKy)
        {
            string fifoReslt = apiOpr.ItmTrnOut_FIFO_PTrnKyItmTrnToAccTrn(HTNSession.Environment, HTNSession.CKy, HTNSession.UsrKy, FrmTrnKy, ObjKy);
            return Json(fifoReslt);
        }

        public JsonResult InsertTrnInDetail(string updatedOrders, string newOrders, string deletedOrders, string FrmPrjKy, string ToPrjKy, string Date, string FrmLocKy, string ToLocKy, string FrmTrnKy, string ToTrnKy, string FromTrnNo)
        {
            int cky = HTNSession.CKy;
            int usrKy = HTNSession.UsrKy;
            bool Msg = apiOpr.InsertTrnInDetail(HTNSession.Environment, cky, usrKy, updatedOrders, newOrders, deletedOrders, FrmPrjKy, ToPrjKy, Date, FrmLocKy, ToLocKy, FrmTrnKy, ToTrnKy, FromTrnNo);
            return Json("Success!");
        }

        public JsonResult GetDetailByFromTrnKy(string FrmTrnKy)
        {
            int cky = HTNSession.CKy;
            int usrKy = HTNSession.UsrKy;

            List<OrderModel> list = new List<OrderModel>();
            list = apiOpr.GetDetailByFromTrnKy(HTNSession.Environment, cky, FrmTrnKy, usrKy);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetDetailByToTrnKy()
        {
            int cky = HTNSession.CKy;
            string newKy = Session["TOTRNKY"].ToString();
            int usrKy = HTNSession.UsrKy;

            List<OrderModel> list = new List<OrderModel>();
            list = apiOpr.GetDetailByFromTrnKy(HTNSession.Environment, cky, newKy, usrKy);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetTrnOutNo(string FrmTrnKy)
        {
            int cky = HTNSession.CKy;
            int usrKy = HTNSession.UsrKy;
            //int newKy = Convert.ToInt32(Session["FRMTRNKY"].ToString());
            List<TrnOutNo> list = new List<TrnOutNo>();
            list = apiOpr.GetTrnOutNo(HTNSession.Environment, FrmTrnKy, cky, usrKy);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetDetailsTrnOut(string TrnKy)
        {
            int cky = HTNSession.CKy;
            int usrKy = HTNSession.UsrKy;
            List<TrnOutDetailModel> list = new List<TrnOutDetailModel>();
            list = apiOpr.GetDetailsTrnOut(HTNSession.Environment, cky, TrnKy, usrKy);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetTrnInFrmTrnOutData(string TrnKy)
        {
            int cky = HTNSession.CKy;
            int usrKy = HTNSession.UsrKy;
            List<TrnOutHdrModel> list = new List<TrnOutHdrModel>();
            list = apiOpr.GetTrnInFrmTrnOutData(HTNSession.Environment, cky, TrnKy, usrKy);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetTrnInAndOutData(string PrjKy, string LocKy)
        {
            int cky = HTNSession.CKy;
            int usrKy = HTNSession.UsrKy;
            List<TrnOutAndInData> list = new List<TrnOutAndInData>();
            list = apiOpr.GetTrnInAndOutData(HTNSession.Environment, cky, PrjKy, LocKy, usrKy);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetOrdSearch(string PrjKy, string SupKy, string FrmOrdNo, string ToOrdNo, string FrmDt, string ToDt, string DocNo, string ConCd, string OurCd, string DlryDt, string DlryNoKy)
        {
            int cky = HTNSession.CKy;
            int usrKy = HTNSession.UsrKy;
            List<OrderSearchModel> list = new List<OrderSearchModel>();
            list = apiOpr.GetOrdSearch(HTNSession.Environment, cky, usrKy, PrjKy, SupKy, FrmOrdNo, ToOrdNo, FrmDt, ToDt, DocNo, ConCd, OurCd, DlryDt, DlryNoKy);
            return Json(list, JsonRequestBehavior.AllowGet);


        }

        public JsonResult GetOrdFind(string PrjKy, string SupKy, string FrmOrdNo, string ToOrdNo, string FrmDt, string ToDt, string DocNo, string ConCd, string OurCd)
        {
            int cky = HTNSession.CKy;
            int usrKy = HTNSession.UsrKy;
            List<OrderSearchModel> list = new List<OrderSearchModel>();
            list = apiOpr.GetOrdFind(HTNSession.Environment, cky, usrKy, PrjKy, SupKy, FrmOrdNo, ToOrdNo, FrmDt, ToDt, DocNo, ConCd, OurCd);
            return Json(list, JsonRequestBehavior.AllowGet);


        }

        public JsonResult GetGRNList(string PrjKy, string SupKy, string TrnNo, string isRecur, string FrmDt, string ToDt,
        string DocNo, string ConCd, string OurCd, string YurRef, string Prefix, string ObjKy, string AprStsKy, string ItmKy,
        string AdrKy, string LocKy, string isPrinted)
        {
            int cky = HTNSession.CKy;
            int usrKy = HTNSession.UsrKy;
            List<GRN> list = new List<GRN>();
            list = apiOpr.GetGRNList(HTNSession.Environment, cky, usrKy, PrjKy, SupKy, TrnNo, isRecur, FrmDt, ToDt, DocNo, ConCd,
                OurCd, YurRef, Prefix, ObjKy, AprStsKy, ItmKy, AdrKy, LocKy, isPrinted);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult ItmTransferFind(string FrmDt, string ToDt, string DocNo, string YurRef, string AprStsKy, string Prefix, 
        string TrnNo, string AdrKy, string FrmLocKy, string ToLocKy, string FrmPrjKy, string ToPrjKy, string isRecur, string isPrinted,
        string ConCd, string OurCd, string ObjKy)
        {
            int cky = HTNSession.CKy;
            int usrKy = HTNSession.UsrKy;
            List<GRN> list = new List<GRN>();
            list = apiOpr.ItmTransferFind(HTNSession.Environment, cky, usrKy, FrmDt, ToDt, DocNo, YurRef, AprStsKy, Prefix,
                   TrnNo, AdrKy, FrmLocKy, ToLocKy, FrmPrjKy, ToPrjKy, isRecur, isPrinted, ConCd, OurCd, ObjKy);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetOrdfrmPurReqSearch(string PrjKy, string SupKy, string ConCd, string OurCd)
        {
            int cky = HTNSession.CKy;
            int usrKy = HTNSession.UsrKy;
            List<OrderSearchModel> list = new List<OrderSearchModel>();
            list = apiOpr.GetOrdfrmPurReqSearch(HTNSession.Environment, cky, usrKy, PrjKy, SupKy, ConCd, OurCd);
            return Json(list, JsonRequestBehavior.AllowGet);


        }

        public JsonResult GetDefaultVal(string ObjKy)
        {
            int cky = HTNSession.CKy;
            int usrKy = HTNSession.UsrKy;
            List<ObjMasMdl> list = new List<ObjMasMdl>();
            list = apiOpr.GetDefaultVal(HTNSession.Environment, cky, usrKy, ObjKy);
            return Json(list, JsonRequestBehavior.AllowGet);
        }


        public JsonResult GetHdrPurOrdDetail(string ordKy, string ConCd, string OurCd)
        {
            int cky = HTNSession.CKy;
            int usrKy = HTNSession.UsrKy;
            List<GRN> list = new List<GRN>();
            list = apiOpr.GetHdrPurOrdDetail(HTNSession.Environment, cky, usrKy, ordKy, ConCd, OurCd);
            return Json(list, JsonRequestBehavior.AllowGet);
        }


        public JsonResult GetOrdfrmPurOrdSearch(string PrjKy, string SupKy, string ConCd, string OurCd, string FrmDt, string ToDt)
        {
            int cky = HTNSession.CKy;
            int usrKy = HTNSession.UsrKy;

            List<OrderSearchModel> list = new List<OrderSearchModel>();
            list = apiOpr.GetOrdfrmPurOrdSearch(HTNSession.Environment, cky, usrKy, PrjKy, SupKy, ConCd, OurCd, FrmDt, ToDt);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult TrnTypPendingTrnTyp_SelectWeb(string PrjKy, string SupKy, string ConCd, string OurCd, string FrmDt, string ToDt, string TrnTypKy)
        {
            int cky = HTNSession.CKy;
            int usrKy = HTNSession.UsrKy;

            List<OrderSearchModel> list = new List<OrderSearchModel>();
            list = apiOpr.TrnTypPendingTrnTyp_SelectWeb(HTNSession.Environment, cky, usrKy, PrjKy, SupKy, ConCd, OurCd, FrmDt, ToDt, Convert.ToInt32(TrnTypKy));
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult TrnTypPendingTrnTypTrf_SelectWeb(string PrjKy, string SupKy, string ConCd, string OurCd, string FrmDt, string ToDt, string TrnTypKy)
        {
            int cky = HTNSession.CKy;
            int usrKy = HTNSession.UsrKy;

            List<OrderSearchModel> list = new List<OrderSearchModel>();
            list = apiOpr.TrnTypPendingTrnTypTrf_SelectWeb(HTNSession.Environment, cky, usrKy, PrjKy, SupKy, ConCd, OurCd, FrmDt, ToDt, Convert.ToInt32(TrnTypKy));
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult TrnTypPendingOrdTyp_SelectWeb(string PrjKy, string SupKy, string ConCd, string OurCd, string FrmDt, string ToDt, string ToOrdNo, string TrnTypKy)
        {
            int cky = HTNSession.CKy;
            int usrKy = HTNSession.UsrKy;

            List<OrderSearchModel> list = new List<OrderSearchModel>();
            list = apiOpr.TrnTypPendingOrdTyp_SelectWeb(HTNSession.Environment, cky, usrKy, PrjKy, SupKy, ConCd, OurCd, FrmDt, ToDt, Convert.ToInt32(ToOrdNo), Convert.ToInt32(TrnTypKy));
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetHdrDetailFromPO(string ordKy, string ConCd, string OurCd)
        {
            int cky = HTNSession.CKy;
            int usrKy = HTNSession.UsrKy;
            List<OrderModel> list = new List<OrderModel>();
            list = apiOpr.GetHdrDetailFromPO(HTNSession.Environment, cky, usrKy, ordKy, ConCd, OurCd);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult TrnTypPendingTrnTypDetails_SelectWeb(string ordKy, string ConCd, string OurCd)
        {
            int cky = HTNSession.CKy;
            int usrKy = HTNSession.UsrKy;
            List<OrderModel> list = new List<OrderModel>();
            list = apiOpr.TrnTypPendingTrnTypDetails_SelectWeb(HTNSession.Environment, cky, usrKy, ordKy, ConCd, OurCd);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult TrnTypPendingOrdTypDetails_SelectWeb(string ordKy, string ConCd, string OurCd)
        {
            int cky = HTNSession.CKy;
            int usrKy = HTNSession.UsrKy;
            List<OrderModel> list = new List<OrderModel>();
            list = apiOpr.TrnTypPendingOrdTypDetails_SelectWeb(HTNSession.Environment, cky, usrKy, ordKy, ConCd, OurCd);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetGridDetailFromPO(string ordKy, string ConCd, string OurCd)
        {
            int cky = HTNSession.CKy;
            int usrKy = HTNSession.UsrKy;
            List<OrderModel> list = new List<OrderModel>();
            list = apiOpr.GetGridDetailFromPO(HTNSession.Environment, cky, usrKy, ordKy, ConCd, OurCd);
            return Json(list, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetHdrDetail(string ordKy)
        {
            int cky = HTNSession.CKy;
            int usrKy = HTNSession.UsrKy;
            List<OrderHdrModel> list = new List<OrderHdrModel>();
            list = apiOpr.GetHdrDetail(HTNSession.Environment, cky, ordKy, usrKy);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetHdrPurtReqDetail(string ordKy)
        {
            int cky = HTNSession.CKy;
            int usrKy = HTNSession.UsrKy;
            List<OrderHdrModel> list = new List<OrderHdrModel>();
            list = apiOpr.GetHdrPurtReqDetail(HTNSession.Environment, cky, ordKy, usrKy);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetGridDetail(string ordKy)
        {
            int cky = HTNSession.CKy;
            int usrKy = HTNSession.UsrKy;
            List<OrderModel> list = new List<OrderModel>();
            list = apiOpr.GetGridDetail(HTNSession.Environment, cky, ordKy, usrKy);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetGridGRNDetail(string ordKy)
        {
            int cky = HTNSession.CKy;
            int usrKy = HTNSession.UsrKy;
            List<GRN> list = new List<GRN>();
            list = apiOpr.GetGridGRNDetail(HTNSession.Environment, cky, ordKy, usrKy);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetGRNItemsDetail(string ordKy)
        {
            int cky = HTNSession.CKy;
            int usrKy = HTNSession.UsrKy;
            List<GRN> list = new List<GRN>();
            list = apiOpr.GetGRNItemsDetail(HTNSession.Environment, cky, ordKy, usrKy);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetGridPurReqDetail(string ordKy)
        {
            int cky = HTNSession.CKy;
            int usrKy = HTNSession.UsrKy;
            List<OrderModel> list = new List<OrderModel>();
            list = apiOpr.GetGridPurReqDetail(HTNSession.Environment, cky, ordKy, usrKy);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetGridPurchesreqDetail(string ordKy)
        {
            int cky = HTNSession.CKy;
            int usrKy = HTNSession.UsrKy;
            List<OrderModel> list = new List<OrderModel>();
            list = apiOpr.GetGridPurchesreqDetail(HTNSession.Environment, cky, ordKy, usrKy);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetRateAndDisAmt(string LocKy, string ItmKy, string BUKy, string PrjKy, string AdrKy, string AccKy, string Dt, string ConCd, string OurCd)
        {
            int cky = HTNSession.CKy;
            int usrKy = HTNSession.UsrKy;
            List<RateModel> list = new List<RateModel>();
            list = apiOpr.GetRateAndDisAmt(HTNSession.Environment, LocKy, ItmKy, BUKy, PrjKy, AdrKy, AccKy, Dt, ConCd, OurCd, cky, usrKy);
            return Json(list, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetRate(string LocKy, string ItmKy, string BUKy, string PrjKy, string AdrKy, string AccKy, string Dt, string ControlConKy)
        {
            int cky = HTNSession.CKy;
            int usrKy = HTNSession.UsrKy;

            List<RateModel> list = new List<RateModel>();
            list = apiOpr.GetRate(HTNSession.Environment, LocKy, ItmKy, BUKy, PrjKy, AdrKy, AccKy, Dt, ControlConKy, cky, usrKy);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetPendingInvoiceSearch(string DlyDt, string DlyNm, string DocNo, string ConCd, string OurCd)
        {
            int cky = HTNSession.CKy;
            int usrKy = HTNSession.UsrKy;
            List<OrderSearchModel> list = new List<OrderSearchModel>();
            list = apiOpr.GetPendingInvoiceSearch(HTNSession.Environment, cky, usrKy, DlyDt, DlyNm, DocNo, ConCd, OurCd);
            return Json(list, JsonRequestBehavior.AllowGet);
        }
        public JsonResult ItemsLookUpByItmCd(int ObjKy, string ConCd, string OurCd,
            string ItmCd, string AdrKy, string LocKy, string PrjKy, string Dt, int ItmKy)
        {

            int cky = HTNSession.CKy;
            int usrKy = HTNSession.UsrKy;
            List<ItemForOrdtypModel> list = new List<ItemForOrdtypModel>();
            list = apiOpr.ItemsLookUpByItmCd(HTNSession.Environment, cky, ObjKy, ConCd, OurCd, ItmCd, usrKy, AdrKy, LocKy, PrjKy, Dt, ItmKy);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult PnsItemsLookUpByItmCd(string ConCd, string OurCd, string ItmCd, string AdrKy, string LocKy, string Dt)
        {
            int cky = HTNSession.CKy;
            int usrKy = HTNSession.UsrKy;
            List<ItemForOrdtypModel> list = new List<ItemForOrdtypModel>();
            list = apiOpr.PnsItemsLookUpByItmCd(HTNSession.Environment, cky, ConCd, OurCd, ItmCd, usrKy, AdrKy, LocKy, Dt);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        //public JsonResult GetGRNPendingPO(string PrjKy,string SupKy,string ConCd, string OurCd)
        //{
        //    int cky = HTNSession.CKy;
        //    int usrKy = HTNSession.UsrKy;
        //    List<GRN> list = new List<GRN>();
        //    list = service.GetGRNPendingPO(HTNSession.Environment, cky, PrjKy, SupKy, ConCd, OurCd, usrKy);
        //    return Json(list, JsonRequestBehavior.AllowGet);
        //}

        public JsonResult ItmNm_SelectWeb(string ConCd, string OurCd)
        {
            int cky = HTNSession.CKy;
            int usrKy = HTNSession.UsrKy;
            List<ItemForOrdtypModel> list = new List<ItemForOrdtypModel>();
            list = apiOpr.ItmNm_SelectWeb(HTNSession.Environment, cky, ConCd, OurCd, usrKy);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult ItmCd_SelectWeb(string ConCd, string OurCd)
        {
            int cky = HTNSession.CKy;
            int usrKy = HTNSession.UsrKy;
            List<ItemForOrdtypModel> list = new List<ItemForOrdtypModel>();
            list = apiOpr.ItmCd_SelectWeb(HTNSession.Environment, cky, ConCd, OurCd, usrKy);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult InsertHdrStckBal(string Date, string OurCd, string ConCd, string DocNo, string Des)
        {
            int cky = HTNSession.CKy;
            int usrKy = HTNSession.UsrKy;
            long OrdKy = apiOpr.InsertHdrStckBal(HTNSession.Environment, cky, usrKy, Date, OurCd, ConCd, DocNo, Des);

            return Json(OrdKy, JsonRequestBehavior.AllowGet);
        }

        public JsonResult UpdateHdrStckBal(string Date, string StckBalKySelect, string StckBalTypKySelect, string StckBalPrefixKySelect, string StckBalNoSelect, string DocNo, string Des)
        {
            int cky = HTNSession.CKy;
            int usrKy = HTNSession.UsrKy;
            long OrdKy = apiOpr.UpdateHdrStckBal(HTNSession.Environment, cky, usrKy, Date, StckBalKySelect, StckBalTypKySelect, StckBalPrefixKySelect, StckBalNoSelect, DocNo, Des);

            return Json(OrdKy, JsonRequestBehavior.AllowGet);
        }

        public JsonResult InsertStckBalGrid(string updatedOrders, string newOrders, string deletedOrders, string PrjKy, string FrmLocKy, string BUKY, string SCBKy)
        {
            int cky = HTNSession.CKy;
            int usrKy = HTNSession.UsrKy;
            bool Msg = apiOpr.InsertStckBalGrid(HTNSession.Environment, cky, usrKy, updatedOrders, newOrders, deletedOrders, PrjKy, FrmLocKy, BUKY, SCBKy);
            return Json("Success!");
        }

        public JsonResult GetHdrDetails(string SCBKy)
        {
            int cky = HTNSession.CKy;
            int usrKy = HTNSession.UsrKy;
            List<GRN> list = new List<GRN>();
            list = apiOpr.GetHdrDetails(HTNSession.Environment, cky, SCBKy, usrKy);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetDetDetail(string SCBKy)
        {
            int cky = HTNSession.CKy;
            int usrKy = HTNSession.UsrKy;
            List<GRN> list = new List<GRN>();
            list = apiOpr.GetDetDetail(HTNSession.Environment, cky, usrKy, SCBKy);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult UpdatePrintedInvoce(string OrdKy, string isPrint, string ConCd, string OurCd, string DlyDt)
        {
            int cky = HTNSession.CKy;
            int usrKy = HTNSession.UsrKy;

            bool success = apiOpr.UpdatePrintedInvoce(HTNSession.Environment, cky, usrKy, OrdKy, isPrint, ConCd, OurCd, DlyDt);
            return Json(success, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetRateForItem(string LocKy, string ItemKy)
        {
            int usrKy = HTNSession.UsrKy;
            long trnRate = apiOpr.GetRateForItem(HTNSession.Environment, LocKy, ItemKy, usrKy);
            return Json(trnRate, JsonRequestBehavior.AllowGet);
        }


        public JsonResult ItmTrnSer_SelectWeb(int TrnTypKy, int ItmKy, int ObjKy, int ItmTrnKy)
        {
            int cky = HTNSession.CKy;
            int usrKy = HTNSession.UsrKy;
            List<ItmTrnSer_SelectWeb> list = new List<ItmTrnSer_SelectWeb>();
            list = apiOpr.ItmTrnSer_SelectWeb(HTNSession.Environment, cky, usrKy, ObjKy, ItmTrnKy, TrnTypKy, ItmKy);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult ItmTrnSer_InsertUpdateWeb(int TrnKy, int TrnTypKy, string SerNoListString)
        {
            int cky = HTNSession.CKy;
            int usrKy = HTNSession.UsrKy;
            bool success = apiOpr.ItmTrnSer_InsertUpdateWeb(HTNSession.Environment, cky, usrKy, TrnKy, SerNoListString, TrnTypKy);
            return Json(success, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetTaskList_Cd(int PrjKy)
        {
            int cky = HTNSession.CKy;
            int usrKy = HTNSession.UsrKy;
            List<TaskModel> list = new List<TaskModel>();
            list = apiOpr.GetTaskList(HTNSession.Environment, PrjKy, cky, usrKy);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetTaskList_Nm(int PrjKy)
        {
            int cky = HTNSession.CKy;
            int usrKy = HTNSession.UsrKy;
            List<TaskModel> list = new List<TaskModel>();
            list = apiOpr.GetTaskList(HTNSession.Environment, PrjKy, cky, usrKy);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult TrnHdrDoc_SelectWeb(int TrnKy)
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            List<TrnHdrDocModel> list = apiOpr.TrnHdrDoc_SelectWeb(HTNSession.Environment, CKy, UsrKy, TrnKy);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult TblRecDoc_SelectWeb(int RecKy,string OurCd="")
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            List<TrnHdrDocModel> list = apiOpr.TblRecDoc_SelectWeb(HTNSession.Environment, CKy, UsrKy, RecKy, OurCd);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult DocMas_InsertWeb(int RecKy, string FilePath, string FileNm, string TblNm, int DocKy,string OurCd="")
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            bool list = apiOpr.DocMas_InsertWeb(HTNSession.Environment, CKy, UsrKy, RecKy, FilePath, FileNm, TblNm, DocKy, OurCd);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult TblRecDoc_DeleteWeb(int RecKy, string TblNm, int DocKy)
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            bool list = apiOpr.TblRecDoc_DeleteWeb(HTNSession.Environment, CKy, UsrKy, RecKy, TblNm, DocKy);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult ItmCdItmTrnsfer_SelectWeb(string ConCd, string OurCd, string StartSize, string size)
        {
            int cky = HTNSession.CKy;
            int usrKy = HTNSession.UsrKy;
            List<ItemForOrdtypModel> list = new List<ItemForOrdtypModel>();
            list = apiOpr.ItmCd_SelectWeb(HTNSession.Environment, cky, ConCd, OurCd, usrKy);
            if (list.Count < Convert.ToInt32(size))
            {
                size = list.Count.ToString();
            }
            List<ItemForOrdtypModel> Sublist = new List<ItemForOrdtypModel>();
            Sublist = list.GetRange(Convert.ToInt32(StartSize), Convert.ToInt32(size));
            Sublist[0].Totalrec = list.Count;
            return Json(Sublist, JsonRequestBehavior.AllowGet);
        }

        public JsonResult ItmNmItmTrnsfer_SelectWeb(string ConCd, string OurCd, string StartSize, string size)
        {
            int cky = HTNSession.CKy;
            int usrKy = HTNSession.UsrKy;
            List<ItemForOrdtypModel> list = new List<ItemForOrdtypModel>();
            list = apiOpr.ItmNm_SelectWeb(HTNSession.Environment, cky, ConCd, OurCd, usrKy);
            if (list.Count < Convert.ToInt32(size))
            {
                size = list.Count.ToString();
            }
            List<ItemForOrdtypModel> Sublist = new List<ItemForOrdtypModel>();
            Sublist = list.GetRange(Convert.ToInt32(StartSize), Convert.ToInt32(size));
            Sublist[0].Totalrec = list.Count;
            return Json(Sublist, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetAvailableQty(string ItmKy, string FrmPrjKy, string ToPrjKy, string FrmLockKy, string ToLocKy, string TrnTyp, string ObjKy)
        {
            int cky = HTNSession.CKy;
            int usrKy = HTNSession.UsrKy;
            ItmDetails BrndAndQty = new ItmDetails();
            BrndAndQty = apiOpr.GetAvailableQty(HTNSession.Environment,  ItmKy, FrmPrjKy,  ToPrjKy,  FrmLockKy,  ToLocKy,  TrnTyp,  ObjKy, cky, usrKy);
            return Json(BrndAndQty, JsonRequestBehavior.AllowGet);
        }

        public JsonResult IsCd87(string ObjKy)
        {
            int cky = HTNSession.CKy;
            int usrKy = HTNSession.UsrKy;
            bool Result = apiOpr.IsCd87(ObjKy, cky, UsrKy, HTNSession.Environment);
            return Json(Result, JsonRequestBehavior.AllowGet);
        }

        public JsonResult AutoPostingToPR(string ObjKy, string FrmTrnKy, string FrmLocKy)
        {
            int cky = HTNSession.CKy;
            int usrKy = HTNSession.UsrKy;
            bool Result = apiOpr.AutoPostingToPR(FrmTrnKy, FrmLocKy, cky, ObjKy, usrKy, HTNSession.Environment);
            return Json(Result, JsonRequestBehavior.AllowGet);
        }

    }
}
