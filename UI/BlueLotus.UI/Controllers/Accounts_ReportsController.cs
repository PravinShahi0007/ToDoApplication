using BlueLotus.AccountsReports.Model.Entity;
using BlueLotus.UI.ApiOperations;
using BlueLotus.UI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace BlueLotus.UI.Controllers
{
    public class Accounts_ReportsController : Controller
    {

        //
        // GET: /Accounts_Reports/
        ///

        ApiOperation operation = new ApiOperation();

        public ActionResult AccountsReportsIndex(string ObjCaptn, int ObjKy)
        {
            ViewBag.ObjCaptn = ObjCaptn;
            ViewBag.ObjKy = ObjKy;

            return View();
        }


        
        //================================================== Getting Report Name
        public JsonResult GetReportNm(int ObjKy)
        {
            int cky = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            // int cky = HTNSession.CKy;
            List<ReportNmModel> list = new List<ReportNmModel>();
            list = operation.GetReportNm(HTNSession.Environment, cky, UsrKy, ObjKy);
            return Json(list, JsonRequestBehavior.AllowGet);
        }
        
        //==================================
        public JsonResult GetTrnTyp()
        {
            int cky = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;

            // int cky = HTNSession.CKy;
            List<GetTrnTypModel> list = new List<GetTrnTypModel>();
            list = operation.GetTrnTyp(HTNSession.Environment, cky, UsrKy);
            return Json(list, JsonRequestBehavior.AllowGet);
        }




        //=================================
        public JsonResult GetAnlTyp()
        {
            int cky = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;

            // int cky = HTNSession.CKy;
            List<GetAnlTypModel> list = new List<GetAnlTypModel>();
            list = operation.GetAnlTyp(HTNSession.Environment, cky, UsrKy);
            return Json(list, JsonRequestBehavior.AllowGet);
        }




        //======================================
        public JsonResult SubConLedWithCr(string ToDt, string FrmDt, string PrjKy, string PrjNm, string AccKy, string AnlTyp, string TrnTyp)
        {

            if (ToDt != null)
            {

                string[] afdate = ToDt.Split('/');
                string Date = afdate.GetValue(0).ToString();
                string ddlfmonth = afdate.GetValue(1).ToString();
                string ddlfyear = afdate.GetValue(2).ToString();
                string tdate = ddlfyear + "/" + ddlfmonth + "/" + Date;
                Session["ToDtForSubPreview"] = tdate;
            }
            else
            {
                Session["ToDtForSubPreview"] = null;
            }
            if (FrmDt != null)
            {

                string[] afdate = FrmDt.Split('/');
                string Date = afdate.GetValue(0).ToString();
                string ddlfmonth = afdate.GetValue(1).ToString();
                string ddlfyear = afdate.GetValue(2).ToString();
                string fdate = ddlfyear + "/" + ddlfmonth + "/" + Date;
                Session["FrmDtForSubPreview"] = fdate;
            }
            else
            {
                Session["FrmDtForSubPreview"] = null;
            }
            if (PrjKy != null)
            {
                Session["PrjKyForSubPreview"] = PrjKy;
            }

            if (PrjNm != null)
            {
                Session["PrjNmForSubPreview"] = PrjNm;
            }
            if (AccKy != null)
            {
                Session["AccKyForSubPreview"] = AccKy;
            }
            if (AnlTyp != null)
            {
                Session["AnlTypForSubPreview"] = AnlTyp;
            }
            if (TrnTyp != null)
            {
                Session["TrnTypForSubPreview"] = TrnTyp;
            }
            return Json("Success", JsonRequestBehavior.AllowGet);


        }

        public JsonResult TrialBal_Report(string ToDt, string FrmDt, string PrjKy, string PrjNm, string BUKy, string PrjId, string BUCd, string BUNm)
        {


            if (ToDt != null)
            {

                string[] afdate = ToDt.Split('/');
                string Date = afdate.GetValue(0).ToString();
                string ddlfmonth = afdate.GetValue(1).ToString();
                string ddlfyear = afdate.GetValue(2).ToString();
                string tdate = ddlfyear + "/" + ddlfmonth + "/" + Date;
                Session["ToDtForTrialBalance"] = tdate;
            }
            else
            {
                Session["ToDtForTrialBalance"] = null;
            }
            if (FrmDt != null)
            {

                string[] afdate = FrmDt.Split('/');
                string Date = afdate.GetValue(0).ToString();
                string ddlfmonth = afdate.GetValue(1).ToString();
                string ddlfyear = afdate.GetValue(2).ToString();
                string fdate = ddlfyear + "/" + ddlfmonth + "/" + Date;
                Session["FrmDtForTrialBalance"] = fdate;
            }
            else
            {
                Session["FrmDtForTrialBalance"] = null;
            }
            if (PrjKy != null)
            {
                Session["PrjKyForTrialBalance"] = PrjKy;
            }

            if (PrjNm != null)
            {
                Session["PrjNmForTrialBalance"] = PrjNm;
            }
            if (BUKy != null)
            {
                Session["BUKyForTrialBalance"] = BUKy;
            }
            if (PrjId != null)
            {
                Session["PrjIdForTrialBalance"] = PrjId;
            }
            if (BUCd != null)
            {
                Session["BUCdForTrialBalance"] = BUCd;
            }
            if (BUNm != null)
            {
                Session["BUNmForTrialBalance"] = BUNm;
            }

            //int CKy = HTNSession.CKy;
            //string CNm = Session["CNm"].ToString();
            //int UsrKy = HTNSession.UsrKy;
            //string UsrId = Session["UsrId"].ToString();
            
            return Json("Success", JsonRequestBehavior.AllowGet);

        }

        //======================================
        public JsonResult AccLed(string ToDt, string FrmDt, string PrjKy, string AccKy, string AccCd, string AccNm, string AccTypKy, string AccTypCd, string AccTypNm, string BuKy, string AdrKy)
        {

            if (ToDt != null)
            {

                string[] afdate = ToDt.Split('/');
                string Date = afdate.GetValue(0).ToString();
                string ddlfmonth = afdate.GetValue(1).ToString();
                string ddlfyear = afdate.GetValue(2).ToString();
                string tdate = ddlfyear + "/" + ddlfmonth + "/" + Date;
                Session["ToDtForAccLed"] = tdate;
            }
            else
            {
                Session["ToDtForAccLed"] = null;
            }
            if (FrmDt != null)
            {

                string[] afdate = FrmDt.Split('/');
                string Date = afdate.GetValue(0).ToString();
                string ddlfmonth = afdate.GetValue(1).ToString();
                string ddlfyear = afdate.GetValue(2).ToString();
                string fdate = ddlfyear + "/" + ddlfmonth + "/" + Date;
                Session["FrmDtForAccLed"] = fdate;
            }
            else
            {
                Session["FrmDtForAccLed"] = null;
            }
            if (PrjKy != null)
            {
                Session["PrjKyForAccLed"] = PrjKy;
            }


            if (AccKy != null)
            {
                Session["AccKyForAccLed"] = AccKy;
            }
            if (AccCd != null)
            {
                Session["AccCdForAccLed"] = AccCd;
            }
            if (AccNm != null)
            {
                Session["AccNmForAccLed"] = AccNm;
            }

            if (AccTypKy != null)
            {
                Session["AccTypKyAccLed"] = AccTypKy;
            }
            if (AccTypCd != null)
            {
                Session["AccTypCdForAccLed"] = AccTypCd;
            }
            if (AccTypNm != null)
            {
                Session["AccTypNmForAccLed"] = AccTypNm;
            }
            if (BuKy != null)
            {
                Session["BuKyForAccLed"] = BuKy;
            }
            if (AdrKy != null)
            {
                Session["AdrKyForAccLed"] = AdrKy;
            }
            return Json("Success", JsonRequestBehavior.AllowGet);

        }

        //==============================================
        public JsonResult AccLedPrevwRprt(string ToDt, string FrmDt, string PrjKy, string AccKy, string RprtNm)
        {


            if (ToDt != null)
            {

                string[] afdate = ToDt.Split('/');
                string Date = afdate.GetValue(0).ToString();
                string ddlfmonth = afdate.GetValue(1).ToString();
                string ddlfyear = afdate.GetValue(2).ToString();
                string tdate = ddlfyear + "/" + ddlfmonth + "/" + Date;
                Session["ToDtForAccLedPrevw"] = tdate;
            }
            else
            {
                Session["ToDtForAccLedPrevw"] = null;
            }
            if (FrmDt != null)
            {

                string[] afdate = FrmDt.Split('/');
                string Date = afdate.GetValue(0).ToString();
                string ddlfmonth = afdate.GetValue(1).ToString();
                string ddlfyear = afdate.GetValue(2).ToString();
                string fdate = ddlfyear + "/" + ddlfmonth + "/" + Date;
                Session["FrmDtForAccLedPrevw"] = fdate;
            }
            else
            {
                Session["FrmDtForAccLedPrevw"] = null;
            }
            if (PrjKy != null)
            {
                Session["PrjKyForAccLedPrevw"] = PrjKy;
            }

            if (AccKy != null)
            {
                Session["AccKyForAccLedPrevw"] = AccKy;
            }
            if (RprtNm != null)
            {
                Session["reportname"] = RprtNm;

            }

            return Json("Success", JsonRequestBehavior.AllowGet);

        }

        
        public ActionResult BalanceSheet()
        {
            return View();
        }

        public JsonResult BalSht(string PToDt, string ToDt, string PrjKy, string BuKy, string BuCd, string BuNm, string isStk, string HideTrn)
        {
            if (PToDt != null)
            {
                string[] afdate = PToDt.Split('/');
                string Date = afdate.GetValue(0).ToString();
                string ddlfmonth = afdate.GetValue(1).ToString();
                string ddlfyear = afdate.GetValue(2).ToString();
                string tdate = ddlfyear + "/" + ddlfmonth + "/" + Date;
                Session["PToDt"] = tdate;
            }
            else
            {
                Session["PToDt"] = null;
            }
            if (ToDt != null)
            {
                string[] afdate = ToDt.Split('/');
                string Date = afdate.GetValue(0).ToString();
                string ddlfmonth = afdate.GetValue(1).ToString();
                string ddlfyear = afdate.GetValue(2).ToString();
                string tdate = ddlfyear + "/" + ddlfmonth + "/" + Date;
                Session["ToDt"] = tdate;
            }
            else
            {
                Session["ToDt"] = null;
            }
            Session["PrjKy"] = PrjKy;
            Session["BuKy"] = BuKy;
            Session["BuCd"] = BuCd;
            Session["BuNm"] = BuNm;
            Session["isStk"] = isStk;
            Session["HideTrn"] = HideTrn;
            return Json("Success", JsonRequestBehavior.AllowGet);

        }
    }
}
