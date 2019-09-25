using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using BlueLotus.ViewModel.Entity;
using BlueLotus.UI.ApiOperations;
using BlueLotus.UI.Models;

namespace BlueLotus.UI.Controllers
{
   
    public class JournalController : Controller
    {
        //
        // GET: /Journal/
        ApiOperation apiOpr = new ApiOperation();
        
        public ActionResult Index(string OurCd, string ObjCaptn, string ObjKy, string OurCd2)
        {
            ViewBag.ObjCaptn = ObjCaptn;
            ViewBag.OurCd2 = OurCd2;
            ViewBag.OurCd = OurCd;
            ViewBag.ObjKy = ObjKy;
            
            return View("Journal");
        }
       
        //Curency Dropdown
        public JsonResult CurrencyDrop(string ObjKy)
        {
            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;


            List<Currency> CurencyDrop = new List<Currency>();
            CurencyDrop = apiOpr.CurencyDrop(HTNSession.Environment, CKy, UsrKy, ObjKy);

            return Json(CurencyDrop, JsonRequestBehavior.AllowGet);
           

        }

        //Analysis2 dropdown
        public JsonResult AnalysisNm(string AnlTyp, string ObjKy)
        {
            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;
            List<AnalysisModel> analysis = new List<AnalysisModel>();
            analysis = apiOpr.AnalysisNm(HTNSession.Environment, CKy, UsrKy, AnlTyp, ObjKy);
            return Json(analysis, JsonRequestBehavior.AllowGet);
        }

        //Analysis2Code dropdown
        public JsonResult AnalysisCd(string AnlTyp, string ObjKy)
        {
            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;
            List<AnalysisModel> analysis = new List<AnalysisModel>();
            analysis = apiOpr.AnalysisCd(HTNSession.Environment, CKy, UsrKy, AnlTyp, ObjKy);
            return Json(analysis, JsonRequestBehavior.AllowGet);
        }

        // Acccodde and name drop  
        public JsonResult Accdrop(string ObjKy)
        {
            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;

            List<AccountModel> AccDrop = new List<AccountModel>();
            AccDrop = apiOpr.AccDrop(HTNSession.Environment, CKy, UsrKy, ObjKy);

            return Json(AccDrop, JsonRequestBehavior.AllowGet);
        }


        //Account Name
        public JsonResult AccdropNM(string ObjKy)
        {
            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;

            List<AccountModel> AccDrop = new List<AccountModel>();
            AccDrop = apiOpr.AccDropNm(HTNSession.Environment, CKy, UsrKy, ObjKy);

            return Json(AccDrop, JsonRequestBehavior.AllowGet);
        }

        //Project 
        public JsonResult ProjectCode(string ObjKy)
        {
            
            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;

            List<ProjectModel> ProjectDrop = new List<ProjectModel>();
            ProjectDrop = apiOpr.ProjectCode(HTNSession.Environment, CKy, UsrKy, ObjKy);

            return Json(ProjectDrop, JsonRequestBehavior.AllowGet);
        }


        //Project Nm
        public JsonResult ProjectName(string ObjKy)
        {
            
            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;
            List<ProjectModel> ProjectDrop = new List<ProjectModel>();
            ProjectDrop = apiOpr.ProjectName(HTNSession.Environment, CKy, UsrKy, ObjKy);

            return Json(ProjectDrop, JsonRequestBehavior.AllowGet);
        }

        //Bu
        public JsonResult BUNMLookup(string ObjKy,string PreKy= "1")
        {
            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;

            List<BUModel> PettySettle = new List<BUModel>();
            string key = "BUNm" +"-"+ "ObjKy " + ObjKy.ToString() +":"+ PreKy + "-CKy:"+CKy;
            var BUNmlist = HTNCache.GetCachedObject(key);
            if (BUNmlist != null)
            {
                PettySettle = (List<BUModel>)BUNmlist;
            }
           else
            {
                PettySettle = apiOpr.BUNMLookup(HTNSession.Environment, CKy, UsrKy, ObjKy, PreKy);
                HTNCache.SetCachedObject(key, PettySettle, 3600);
            }
            

            return Json(PettySettle, JsonRequestBehavior.AllowGet);
        }

        public JsonResult BUCodeLookup(string ObjKy,string PreKy="1")
        {
            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;

            List<BUModel> PettySettle = new List<BUModel>();
            string key = "BUCode" +"-"+ "ObjKy " + ObjKy.ToString()+":"+ PreKy + "-CKy:"+ CKy;
            var BUlist = HTNCache.GetCachedObject(key);
            if (BUlist != null)
            {
                PettySettle = (List<BUModel>)BUlist;
                var countno = PettySettle.Count();
            }  
            else
            {
                PettySettle = apiOpr.BUCodeLookup(HTNSession.Environment, CKy, UsrKy, ObjKy, PreKy);
                HTNCache.SetCachedObject(key, PettySettle, 3600);
            }
            

            return Json(PettySettle, JsonRequestBehavior.AllowGet);
        }

        //Account Adress Id
        public JsonResult AccAdrId(string ObjKy,string PreKy)
        {
            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;

            List<AddressModel> AccAdrIdDrop = new List<AddressModel>();
            AccAdrIdDrop = apiOpr.AccAdrId(HTNSession.Environment, CKy, UsrKy, ObjKy, PreKy);

            return Json(AccAdrIdDrop, JsonRequestBehavior.AllowGet);
        }


        //Account Adress NAme
        public JsonResult AccAdrName(string ObjKy, string PreKy)
        {
            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;

            List<AddressModel> AccAdrNameDrop = new List<AddressModel>();
            AccAdrNameDrop = apiOpr.AccAdrName(HTNSession.Environment, CKy, UsrKy, ObjKy, PreKy);

            return Json(AccAdrNameDrop, JsonRequestBehavior.AllowGet);
        }

        //Task Lookup
        public JsonResult TaskCodeLookUp(string PrjKy, string ObjKy)
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;

            List<PrsDetModel> TskDrop = new List<PrsDetModel>();

            TskDrop = apiOpr.TaskCodeLookUp(HTNSession.Environment, PrjKy, CKy, UsrKy, ObjKy);
            return Json(TskDrop, JsonRequestBehavior.AllowGet);
        }

        public JsonResult TaskNameLookUp(string PrjKy, string ObjKy)
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;

            List<PrsDetModel> TskDrop = new List<PrsDetModel>();
            TskDrop = apiOpr.TaskNameLookUp(HTNSession.Environment, PrjKy, CKy, UsrKy, ObjKy);
            return Json(TskDrop, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetAllJournalDetail(string AccKy, string datepicker)
        {
            int UsrKy = HTNSession.UsrKy;
            List<AccDetailModel> list = new List<AccDetailModel>();
            list = apiOpr.GetAllJournalDetail(HTNSession.Environment, AccKy, datepicker, UsrKy);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetPayeeNameDetail(string AdrKy, string datepicker)
        {
            int UsrKy = HTNSession.UsrKy;
            List<AccDetailModel> list = new List<AccDetailModel>();
            list = apiOpr.GetAllpayeeNameDetail(HTNSession.Environment, AdrKy, datepicker, UsrKy);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult InsertHdr(int isRecur, string VouDate, string DocNo, string UrRef, string cmbCrnKy, string Yourref_Date, string ExRateHrd, string PrjKy, string BUKy, string OurCd,string ObjKy)
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            string ConCord = "TrnTyp";
            long Key = apiOpr.InsertHdr(HTNSession.Environment, isRecur, VouDate, DocNo, UrRef, cmbCrnKy, Yourref_Date, ExRateHrd, PrjKy, BUKy, OurCd, CKy, UsrKy, ConCord,  ObjKy);
            return Json(Key, JsonRequestBehavior.AllowGet);
        }

        public JsonResult InsertDetail(string trnKy, string VouDate, string NewGridDetail, string UpdatedGridDetail, string OurCd,string isRec)
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            string ConCord = "TrnTyp";
            bool Key = apiOpr.InsertJournalDetail(HTNSession.Environment, trnKy, VouDate, NewGridDetail, UpdatedGridDetail, CKy, UsrKy, OurCd, ConCord, isRec);
            return Json(Key, JsonRequestBehavior.AllowGet);
        }

        public JsonResult LoadGridFindView(string FrmDt, string ToDt, string TrnNo, string AccKy, string PrjKy, string IsRec, string DocNo, string IsPrnt, string OurCode, string Prefix, string Adrky, string UrRef, string ApprKy, string BU)
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            List<JournalFindModel> list = new List<JournalFindModel>();
            list = apiOpr.LoadGridFindView(HTNSession.Environment, FrmDt, ToDt, TrnNo, AccKy, PrjKy, IsRec, DocNo, IsPrnt, OurCode, Convert.ToInt32(Prefix), CKy, UsrKy, Adrky, UrRef, ApprKy, BU);
            return Json(list, JsonRequestBehavior.AllowGet);
        }


        public JsonResult GetHdrDetail(string TrnKy)
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            List<JournalDetailModel> list = new List<JournalDetailModel>();
            list = apiOpr.GetHdrDetail(HTNSession.Environment, TrnKy, CKy, UsrKy);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetGridDetail(string TrnKy)
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            List<JournalDetailModel> list = new List<JournalDetailModel>();
            list = apiOpr.GetGridDetail(HTNSession.Environment, TrnKy, CKy, UsrKy);
            return Json(list, JsonRequestBehavior.AllowGet);
        }


        public JsonResult GetHomeCurency()
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            long Key = apiOpr.GetHomeCurency(HTNSession.Environment, CKy, UsrKy);
            return Json(Key, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetHomeCurencyEx(string CurKy, string datepicker)
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            double Key = apiOpr.GetHomeCurencyEx(HTNSession.Environment, CurKy, datepicker, UsrKy);
            return Json(Key, JsonRequestBehavior.AllowGet);
        }

        public JsonResult UpdateHdr(string TrnKy, int isRecur, string VouDate, string DocNo, string UrRef, string cmbCrnKy, string Yourref_Date, string ExRateHrd, string PrjKy, string BUKy, string OurCd, string VauNo,string TimeStamp,string MultiCredit="0",string ObjKy="1",string Rem="",string des="")
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            string ConCord = "TrnTyp";
            long Key = apiOpr.JrnlUpdateHdr(HTNSession.Environment, TrnKy, isRecur, VouDate, DocNo, UrRef, cmbCrnKy, Yourref_Date, ExRateHrd, PrjKy, BUKy, OurCd, CKy, UsrKy, ConCord, VauNo, TimeStamp, MultiCredit, ObjKy,  Rem ,  des );
            return Json(Key, JsonRequestBehavior.AllowGet);
        }
    }
}
