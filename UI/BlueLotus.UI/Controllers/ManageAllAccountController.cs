using System;
using System.Collections.Generic;
using System.Web.Mvc;
using System.Web.Script.Serialization;
using BlueLotus.ManageAllAccounts.Model.Entity;
using BlueLotus.UI.ApiOperations;
using BlueLotus.UI.Models;

namespace BlueLotus.UI.Controllers
{
    public class ManageAllAccountController : Controller
    {
        private readonly ApiOperation apiOpr = new ApiOperation();
        
        //
        // GET: /ManageAllAccount/

        public ActionResult ManageAllAccount(string OurCd, string ObjCaptn, string ObjKy)
        {
            ViewBag.ObjCaptn = ObjCaptn;
            ViewBag.OurCd = OurCd;
            ViewBag.ObjKy = ObjKy;

            return View();
        }


        public JsonResult GetAccGrid(string ObjKy,string PageNo, string PageSize, string AccCd,string ourCode, string AccNm)
        {
            var UsrKy = HTNSession.UsrKy;
            var CKy = HTNSession.CKy;
            var GetAccGrid = new List<ManageAllAccountsModel>();
            GetAccGrid = apiOpr.ManageAllAccountGrid(HTNSession.Environment, CKy, UsrKy, ObjKy, PageNo, PageSize, AccCd, ourCode,AccNm);
            return Json(GetAccGrid, JsonRequestBehavior.AllowGet);
        }

        public JsonResult AccTyps()
        {
            var UsrKy = HTNSession.UsrKy;
            var CKy = HTNSession.CKy;
            var AccTyps = new List<ManageAllAccountsModel>();
            AccTyps = apiOpr.AccTyps(HTNSession.Environment, CKy, UsrKy);
            return Json(AccTyps, JsonRequestBehavior.AllowGet);
        }

        public JsonResult CurrencyList()
        {
            var UsrKy = HTNSession.UsrKy;
            var CKy = HTNSession.CKy;
            var CurencyList = new List<ManageAllAccountsModel>();
            CurencyList = apiOpr.CurrencyList(HTNSession.Environment, CKy, UsrKy);
            return Json(CurencyList, JsonRequestBehavior.AllowGet);
        }

        public JsonResult BuList()
        {
            var UsrKy = HTNSession.UsrKy;
            var CKy = HTNSession.CKy;
            var BU = new List<ManageAllAccountsModel>();
            BU = apiOpr.BuList(HTNSession.Environment, CKy, UsrKy);
            return Json(BU, JsonRequestBehavior.AllowGet);
        }

        public JsonResult ParentAccount()
        {
            var UsrKy = HTNSession.UsrKy;
            var CKy = HTNSession.CKy;
            var BU = new List<ManageAllAccountsModel>();
            BU = apiOpr.ParentAccount(HTNSession.Environment, CKy, UsrKy);
            return Json(BU, JsonRequestBehavior.AllowGet);
        }

        public JsonResult AddressTyp()
        {
            var UsrKy = HTNSession.UsrKy;
            var CKy = HTNSession.CKy;
            var BU = new List<ManageAllAccountsModel>();
            BU = apiOpr.AddressTyp(HTNSession.Environment, CKy, UsrKy);
            return Json(BU, JsonRequestBehavior.AllowGet);
        }

        public JsonResult AddressListPopUp(string AccKy, string StartSize, string Size)
        {
            var UsrKy = HTNSession.UsrKy;
            var CKy = HTNSession.CKy;
            var AddressListPopUp = new List<ManageAllAccountsModel>();
            AddressListPopUp = apiOpr.AddressListPopUp(HTNSession.Environment, CKy, UsrKy, AccKy);
            if (AddressListPopUp.Count < Convert.ToInt32(Size))
            {
                Size = AddressListPopUp.Count.ToString();
            }
            List<ManageAllAccountsModel> Sublist = new List<ManageAllAccountsModel>();
            Sublist = AddressListPopUp.GetRange(Convert.ToInt32(StartSize), Convert.ToInt32(Size));
            Sublist[0].Lino = AddressListPopUp.Count;
            return Json(Sublist, JsonRequestBehavior.AllowGet);
        }

        //public JsonResult AddressListPopUp(string AccKy)
        //{
        //    var UsrKy = HTNSession.UsrKy;
        //    var CKy = HTNSession.CKy;
        //    var AddressListPopUp = new List<ManageAllAccountsModel>();
        //    AddressListPopUp = apiOpr.AddressListPopUp(HTNSession.Environment, CKy, UsrKy, AccKy);
        //    return Json(AddressListPopUp, JsonRequestBehavior.AllowGet);
        //}

        public JsonResult UrlAddressUpdate(string updateAdressmass, string AccKy)
        {
            var UsrKy = HTNSession.UsrKy;
            var CKy = HTNSession.CKy;

            var AddressUpdate = apiOpr.AddressUpdate(HTNSession.Environment, CKy, UsrKy, updateAdressmass,
                AccKy);
            return Json(AddressUpdate, JsonRequestBehavior.AllowGet);
        }

        public JsonResult CreditsPop(string AccKy)
        {
            var UsrKy = HTNSession.UsrKy;
            var CKy = HTNSession.CKy;
            var CreditsPopGrid = new List<ManageAllAccountsModel>();
            CreditsPopGrid = apiOpr.CreditsPop(HTNSession.Environment, CKy, UsrKy, AccKy);
            return Json(CreditsPopGrid, JsonRequestBehavior.AllowGet);
        }

        public JsonResult CreditUpdate(string updateCredit, string newCredit, string AccKy, string PrjKy = "1", string BUKy = "1")
          {
            var UsrKy = HTNSession.UsrKy;
            var CKy = HTNSession.CKy;

            var CreditUpdate = apiOpr.CreditUpdate(HTNSession.Environment, CKy, UsrKy, updateCredit,
                newCredit, AccKy, PrjKy, BUKy);
            return Json(CreditUpdate, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Delete(string AccKy)
        {
            var UsrKy = HTNSession.UsrKy;
            var CKy = HTNSession.CKy;

            var DeleteRecord = apiOpr.DeleteFromAllAcc(HTNSession.Environment, CKy, UsrKy, AccKy);
            return Json(DeleteRecord, JsonRequestBehavior.AllowGet);
        }

        public JsonResult AccMassInsertUpdate(string updateAccmacc, string newAccmacc, string AccKy)
        {

            var UsrKy = HTNSession.UsrKy;
            var CKy = HTNSession.CKy;

            var AccMassInsertUpdate = apiOpr.AccMassInsertUpdate(HTNSession.Environment, CKy, UsrKy,
                newAccmacc, updateAccmacc);
            if (AccMassInsertUpdate)
            {
                HTNCache.ClearCacheItems("AccID", "CKy:" + CKy.ToString());
                HTNCache.ClearCacheItems("AccNm", "CKy:" + CKy.ToString());
            }
            return Json(AccMassInsertUpdate, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetHomeCuencyDetails()
        {
            var UsrKy = HTNSession.UsrKy;
            var CKy = HTNSession.CKy;
            var CurencyList = new List<ManageAllAccountsModel>();
            CurencyList = apiOpr.GetHomeCuencyDetails(HTNSession.Environment, CKy, UsrKy);
            return Json(CurencyList, JsonRequestBehavior.AllowGet);
        }

        public JsonResult BankDetailsInsert(string updateAccmacc,string newAccmacc,string AccountCode,string AccountName,string AccountKey)
        {
            var UsrKy = HTNSession.UsrKy;
            var CKy = HTNSession.CKy;
            bool BankDetailInsert = false;// = new List<ManageAllAccountsBankDetailsModel>();
            BankDetailInsert = apiOpr.BankDetailsInsertToChrtOfAcc(HTNSession.Environment, CKy, UsrKy, updateAccmacc,
                newAccmacc, AccountCode, AccountName, AccountKey);
            return Json(BankDetailInsert, JsonRequestBehavior.AllowGet);
        }

        public JsonResult BankDetailsSelect(string AccKy)
        {
            var UsrKy = HTNSession.UsrKy;
            var CKy = HTNSession.CKy;
            var GetAccGrid = new List<ManageAllAccountsBankDetailsModel>();
            GetAccGrid = apiOpr.GetBankDetailstoAccMas(HTNSession.Environment, CKy, UsrKy, AccKy);
            return Json(GetAccGrid, JsonRequestBehavior.AllowGet);
        }


    }
}
