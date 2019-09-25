using BlueLotus.UI.ApiOperations;
using System;
using System.Collections.Generic;
using System.Web.Mvc;
using BlueLotus.PNSCollection.Model.PNSCordinatorDeposti;
using BlueLotus.UI.Models;

namespace BlueLotus.UI.Controllers.PNSCollection
{
    public class PNSCordinatorDepositController : Controller
    {
        ApiOperation apiOpr = new ApiOperation();

        //
        // GET: /PNSCordinatorDeposit/
        //

        public ActionResult PNSCordinatorDeposit(string OurCd, string ObjCaptn)
        {
            ViewBag.MyPmtcd = OurCd;
            ViewBag.OurCd = OurCd;
            ViewBag.ObjCaptn = ObjCaptn;
            Session.Add("usrKy", HTNSession.UsrKy);

            return View();
        }

        public JsonResult BalanceInHand()
        {
            int usrKy = HTNSession.UsrKy;
            int cKy = HTNSession.CKy;
            decimal Balance = apiOpr.PNSCordinatorBalanceInHand(HTNSession.Environment, cKy, usrKy);
            return Json(Balance, JsonRequestBehavior.AllowGet);
        }

        public JsonResult NonRecBal()
        {
            int usrKy = HTNSession.UsrKy;
            int cKy = HTNSession.CKy;

            decimal NonRecBal = apiOpr.NonRecBalance(HTNSession.Environment, cKy, usrKy);
            return Json(NonRecBal, JsonRequestBehavior.AllowGet);
        }

        public JsonResult CashBalance(string SBuKy, string DepDate, string BankKy)
        {
            int usrKy = HTNSession.UsrKy;
            int cKy = HTNSession.CKy;
            decimal CashBalance = apiOpr.CashBalance(cKy, usrKy, SBuKy, DepDate, BankKy, HTNSession.Environment);
            return Json(CashBalance, JsonRequestBehavior.AllowGet);
        }

        public JsonResult CompanyLookup()
        {
            int usrKy = HTNSession.UsrKy;
            int cKy = HTNSession.CKy;

            List<BankModel> CompanyLookup = new List<BankModel>();
            CompanyLookup = apiOpr.PNSCompanyLookup(cKy, usrKy, HTNSession.Environment);
            return Json(CompanyLookup, JsonRequestBehavior.AllowGet);

        }

        public JsonResult BankLookup(string BuKy)
        {
            int usrKy = HTNSession.UsrKy;
            int cKy = HTNSession.CKy;

            List<AccountModel> BankLookup = new List<AccountModel>();
            BankLookup = apiOpr.BankLookup(cKy, usrKy, BuKy, HTNSession.Environment);
            return Json(BankLookup, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetChqueList(string SBuKy, string DepDate, string BankKy)
        {
            int usrKy = HTNSession.UsrKy;
            int cKy = HTNSession.CKy;

            List<PNSBanKChqueModel> BankLookup = new List<PNSBanKChqueModel>();
            BankLookup = apiOpr.GetPNSDepositChqueList(cKy, usrKy, SBuKy, DepDate, BankKy, HTNSession.Environment);
            return Json(BankLookup, JsonRequestBehavior.AllowGet);
        }

        public JsonResult DepositcashandCheque(string SBuKy, string DepDate, string BankKy, string CashAmt, string ConCord, string OurCode, string refNo, string InsertChq)
        {
            int usrKy = HTNSession.UsrKy;
            int cKy = HTNSession.CKy;

            List<DepositSaveDetails> SaveDetails = new List<DepositSaveDetails>();
            SaveDetails = apiOpr.DepositcashandCheque(cKy, usrKy, SBuKy, DepDate, BankKy, CashAmt, ConCord, OurCode, refNo, InsertChq, HTNSession.Environment);
            return Json(SaveDetails, JsonRequestBehavior.AllowGet);
        }
    }
}