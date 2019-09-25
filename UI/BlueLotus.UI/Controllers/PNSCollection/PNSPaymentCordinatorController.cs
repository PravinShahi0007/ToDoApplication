using System;
using System.Collections.Generic;
using System.Web.Mvc;
using BlueLotus.PNSCollection.Model.PNSCordinatorCollection;
using BlueLotus.UI.ApiOperations;
using BlueLotus.UI.Models;

namespace BlueLotus.UI.Controllers.PNSCollection
{
    public class PNSPaymentCordinatorController : Controller
    {
        //
        // GET: /PNSPaymentCordinator/
        //

        ApiOperation apiOpr = new ApiOperation();

        public ActionResult PNSPaymentCordinator(string OurCd, string ObjCaptn)
        {
            ViewBag.OurCd = OurCd;
            ViewBag.MyPmtcd = OurCd;
            ViewBag.ObjCaptn = ObjCaptn;
            return View();
        }

        public JsonResult PnsOutLetLookup()
        {
            List<AccMassModel> OutLetList=new List<AccMassModel>();
            int cKy = HTNSession.CKy;
            int usrKy = HTNSession.UsrKy;
            OutLetList = apiOpr.PnsOutletList(cKy, usrKy, HTNSession.Environment);
            return Json(OutLetList, JsonRequestBehavior.AllowGet);
        }

        public JsonResult BankLookUp(string BuKy)
        {
            List<AccMassModel> BankList =new List<AccMassModel>();
            int Cky = HTNSession.CKy;
            int usrKy = HTNSession.UsrKy;
            BankList = apiOpr.PNSBankList(Cky, usrKy, BuKy, HTNSession.Environment);
            return Json(BankList, JsonRequestBehavior.AllowGet);
        }
        
        public JsonResult InsertDetail(string NewChq, string cash, string Docno, string outlt, string Dt2, string creditcrd, string GftVou, string Promo, string ConCord, string OurCode)
        {
         
            int Cky = HTNSession.CKy;
            int usrKy = HTNSession.UsrKy;
            List<AcctrnModel> InsertHdr=new List<AcctrnModel>();
            InsertHdr = apiOpr.PNSCordonatorCollection(Cky, usrKy,NewChq, cash, Docno, outlt, Dt2, creditcrd, GftVou, Promo, ConCord, OurCode ,HTNSession.Environment);
            return Json(InsertHdr, JsonRequestBehavior.AllowGet);
        }

    }
    

}