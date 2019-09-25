using BlueLotus.LoanTransaction_Model.Entity;
using BlueLotus.UI.ApiOperations;
using BlueLotus.UI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace BlueLotus.UI.Controllers
{
    public class LoanTransactionController : Controller
    {
        ApiOperation apiOpr = new ApiOperation();

        public ActionResult Index(string OurCd, string OurCd2, string ObjKy, string ObjCaptn)
        {
            ViewBag.OurCd2 = OurCd2;
            ViewBag.OurCd = OurCd;
            ViewBag.ObjKy = ObjKy;
            ViewBag.ObjCaptn = ObjCaptn;
            return View();
        }
        public ActionResult FindFrm(string OurCd, string OurCd2, string ObjKy, string ObjCaptn)
        {
            ViewBag.OurCd2 = OurCd2;
            ViewBag.OurCd = OurCd;
            ViewBag.ObjKy = ObjKy;
            ViewBag.ObjCaptn = ObjCaptn;
            return View();
        }
        public JsonResult EmpMasCdDt_InsertWeb(int EmpKy, string EftvDt, string GvnDt, string LoanType, int InstAmt, int LoanAmount, string BnkNm, string BrnNm, int AccNo, int NoOfInst, int TtlPay, int IntrRate, int IntrTyp, int IntrAmt)
        {
            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;
            string EnvironmentName = HTNSession.Environment;
            bool list = apiOpr.EmpMasCdDt_InsertWeb(UsrKy, CKy, EmpKy, EftvDt, GvnDt, LoanType, InstAmt, LoanAmount, BnkNm, BrnNm, AccNo, NoOfInst, TtlPay, IntrRate, IntrAmt, IntrTyp, EnvironmentName);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Loan_SearchSelectWeb(string EmpKy, string EftvDt, string LnTyp)
        {
            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;
            string EnvironmentName = HTNSession.Environment;
            List<LoanTranModel> list = new List<LoanTranModel>();
            list = apiOpr.Loan_SearchSelectWeb(CKy, UsrKy,Convert.ToInt32(EmpKy), EftvDt, LnTyp, EnvironmentName);
            return Json(list, JsonRequestBehavior.AllowGet);
        }
    }
}
