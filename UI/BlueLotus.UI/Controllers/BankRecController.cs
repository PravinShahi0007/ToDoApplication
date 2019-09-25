using BlueLotus.UI.ApiOperations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using BlueLotus.BankReconciliation.Model.Entity;
using BlueLotus.UI.Models;

namespace BlueLotus.UI.Controllers
{
    public class BankRecController : Controller
    {
        //
        // GET: /BankRec/
        ApiOperation apiOpr = new ApiOperation();
        
        public ActionResult BankRec(string OurCd, string ObjCaptn, string ObjKy)
        {
            ViewBag.ObjCaptn = ObjCaptn;
            ViewBag.OurCd = OurCd;
            ViewBag.ObjKy = ObjKy;
            return View();
          
        }

        //Accounts Lookup
        public JsonResult BankAccCd()
        {            
            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;
            List<AccountsModel> AccLookupModelObj = new List<AccountsModel>();
            AccLookupModelObj = apiOpr.BankAccCd(HTNSession.Environment, CKy, UsrKy);
            return Json(AccLookupModelObj, JsonRequestBehavior.AllowGet);

        }

        //Accounts Lookup Nm
        public JsonResult BankAccNm()
        {
            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;
            List<AccountsModel> AccLookupModelObj = new List<AccountsModel>();
            AccLookupModelObj = apiOpr.BankAccNm(HTNSession.Environment, CKy, UsrKy);
            return Json(AccLookupModelObj, JsonRequestBehavior.AllowGet);

        }
        //GetLedgerBalance
        public JsonResult GetLedgerBalance(string AccKy, string ToDate)
        {
            string[] afdate = ToDate.Split('/');
            string Date = afdate.GetValue(0).ToString();
            string ddlfmonth = afdate.GetValue(1).ToString();
            string ddlfyear = afdate.GetValue(2).ToString();
            string Todate = ddlfyear + "/" + ddlfmonth + "/" + Date;

            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;
            decimal LegerBalance = apiOpr.LegerBalance(HTNSession.Environment, CKy, UsrKy, AccKy, Todate);
            return Json(LegerBalance, JsonRequestBehavior.AllowGet);

        }

        //Balance At
        public JsonResult BalanceAt(string AccKy, string ToDate)
        {
            string[] afdate = ToDate.Split('/');
            string Date = afdate.GetValue(0).ToString();
            string ddlfmonth = afdate.GetValue(1).ToString();
            string ddlfyear = afdate.GetValue(2).ToString();
            string Todate = ddlfyear + "/" + ddlfmonth + "/" + Date;

            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;
            decimal BalanceAt = apiOpr.BalanceAt(HTNSession.Environment, CKy, UsrKy, AccKy, Todate);
            return Json(BalanceAt, JsonRequestBehavior.AllowGet);

        }


        //Load the grid
        public JsonResult BankRecGridLoad(string AccKy, string ToDate, string FromDate, string PageNo, string PageSize)
        {
            string[] afdate = ToDate.Split('/');
            string Date = afdate.GetValue(0).ToString();
            string ddlfmonth = afdate.GetValue(1).ToString();
            string ddlfyear = afdate.GetValue(2).ToString();
            string Todate = ddlfyear + "/" + ddlfmonth + "/" + Date;
            string[] afdate1 = FromDate.Split('/');
            string Date1 = afdate1.GetValue(0).ToString();
            string ddlfmonth1 = afdate1.GetValue(1).ToString();
            string ddlfyear1 = afdate1.GetValue(2).ToString();
            string Frmdate = ddlfyear1 + "/" + ddlfmonth1 + "/" + Date1;
            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;
            List<BankRecModel> BankRecGridObj = new List<BankRecModel>();
            BankRecGridObj = apiOpr.BankRecGrid(HTNSession.Environment, CKy, UsrKy, Todate, Frmdate, AccKy,  PageNo,  PageSize);
            return Json(BankRecGridObj, JsonRequestBehavior.AllowGet);
        }
        public JsonResult UpdatedRecords(string UpdatedRecord)
        {
            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;
            bool Updaterecords = false;
            Updaterecords = apiOpr.UpdatedRecords(HTNSession.Environment, CKy, UsrKy, UpdatedRecord);
            return Json(Updaterecords, JsonRequestBehavior.AllowGet);
        }

        //Load the grid
        public JsonResult RecBalForMOnth(string AccKy, string ToDate, string FromDate)
        {
            //string[] afdate = ToDate.Split('/');
            //string Date = afdate.GetValue(0).ToString();
            //string ddlfmonth = afdate.GetValue(1).ToString();
            //string ddlfyear = afdate.GetValue(2).ToString();
            //string[] afdate1 = FromDate.Split('/');
            //string Date1 = afdate1.GetValue(0).ToString();
            //string ddlfmonth1 = afdate1.GetValue(1).ToString();
            //string ddlfyear1 = afdate1.GetValue(2).ToString();
            string Todate = DateFromatChange(ToDate);//ddlfyear + "/" + ddlfmonth + "/" + Date;
            string Frmdate = DateFromatChange(FromDate);//ddlfyear1 + "/" + ddlfmonth1 + "/" + Date1;
            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;
           
            decimal BalanceAt = apiOpr.RecBalForMOnth(AccKy, Todate, Frmdate, UsrKy, CKy, HTNSession.Environment);
            return Json(BalanceAt, JsonRequestBehavior.AllowGet);
        }

        public string DateFromatChange(string DatePara)
        {
            string[] afdate = DatePara.Split('/');
            string Date = afdate.GetValue(0).ToString();
            string ddlfmonth = afdate.GetValue(1).ToString();
            string ddlfyear = afdate.GetValue(2).ToString();
            string Formateddate = ddlfyear + "/" + ddlfmonth + "/" + Date;
            return Formateddate;
        }

        public JsonResult GetAllAccountBalances(string AccKy, string ToDate, string FromDate)
        {
           
            string Todate = DateFromatChange(ToDate);//ddlfyear + "/" + ddlfmonth + "/" + Date;
            string Frmdate = DateFromatChange(FromDate);//ddlfyear1 + "/" + ddlfmonth1 + "/" + Date1;
            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;

            List<BankRecBalance> GetAllBalances = new List<BankRecBalance>();
            GetAllBalances = apiOpr.GetAllAccountBalances(HTNSession.Environment, CKy, UsrKy, Todate, Frmdate, AccKy);
            return Json(GetAllBalances, JsonRequestBehavior.AllowGet);
        }

    }
}
