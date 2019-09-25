
using BlueLotus.UI.ApiOperations;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Configuration;
using System.Web.Mvc;
using BlueLotus.Payment.Model.Entity;
using BlueLotus.UI.Models;

namespace BlueLotus.UI.Controllers
{

    public class PaymentController : Controller
    {
        //
        // GET: /Payment/
        ApiOperation apiOpr = new ApiOperation();
        //[OutputCache(Duration = 200000, VaryByParam = "OurCd;ObjCaptn;ObjKy")]
        public ActionResult Payment(string OurCd, string ObjCaptn, string ObjKy)
        {
            ViewBag.ObjCaptn = ObjCaptn;
            ViewBag.OurCd = OurCd;
            ViewBag.ObjKy = ObjKy;

            return View();
        }

        //Account Dropdown
        public JsonResult HdrAccCode(string MultiCredit,string OurCode, string ObjKy)
        {
            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;
            string ConCord = "TrnTyp";
            List<AccountModel> urlHdrAccCode = new List<AccountModel>();
            urlHdrAccCode = apiOpr.urlHdrAccCode(CKy, UsrKy, MultiCredit, ConCord, OurCode, ObjKy, HTNSession.Environment);
            return Json(urlHdrAccCode, JsonRequestBehavior.AllowGet);

        }

        //Account Dropdown
        public JsonResult HdrAccName(string MultiCredit,string OurCode, string ObjKy)
        {
            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;
            string ConCord = "TrnTyp";
            List<AccountModel> urlHdrAccName = new List<AccountModel>();
            urlHdrAccName = apiOpr.urlHdrAccName(CKy, UsrKy, MultiCredit, ConCord, OurCode, ObjKy, HTNSession.Environment);
            return Json(urlHdrAccName, JsonRequestBehavior.AllowGet);

        }

        //Detail level Account
        //Account Dropdown
        public JsonResult DtlAccCode(string MultiCredit, string OurCode, string ObjKy)
        {
            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;
            string ConCord = "TrnTyp";
            List<AccountModel> urlHdrAccCode = new List<AccountModel>();
            urlHdrAccCode = apiOpr.DtlAccCode(CKy, UsrKy, MultiCredit, ConCord, OurCode, ObjKy, HTNSession.Environment);
            return Json(urlHdrAccCode, JsonRequestBehavior.AllowGet);

        }

        //Account Dropdown
        public JsonResult DtlAccName(string MultiCredit, string OurCode, string ObjKy)
        {
            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;
            string ConCord = "TrnTyp";
            List<AccountModel> urlHdrAccName = new List<AccountModel>();
            urlHdrAccName = apiOpr.DtlAccName(CKy, UsrKy, MultiCredit, ConCord, OurCode, ObjKy, HTNSession.Environment);
            return Json(urlHdrAccName, JsonRequestBehavior.AllowGet);

        }

        public JsonResult Saving_Validate(string GridDataArray,int ObjKy,int TrnKy)
        {
            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;
            string Environtname = HTNSession.Environment;
            List<string> mes = new List<string>();
            mes = apiOpr.Saving_Validate(CKy, UsrKy, GridDataArray, ObjKy, TrnKy,Environtname);
            return Json(mes, JsonRequestBehavior.AllowGet);
        }




        public JsonResult PaymentMode(string ObjKy)
        {
            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;
        
            List<PayMode> urlHdrAccName = new List<PayMode>();
            urlHdrAccName = apiOpr.PaymentMode(CKy, UsrKy, ObjKy, HTNSession.Environment);
            return Json(urlHdrAccName, JsonRequestBehavior.AllowGet);

        }

        public JsonResult InsertHdr(string VouDate, string DocNo, string UrRef, string cmbCrnKy, string Yourref_Date, string ExRateHrd, string PrjKy, string BUKy, string OurCd, string IsRec,string MultiCredit, string ImageName="",string FrmTrnKy="1",string ObjKy="",string cmbAccKy="1", string rem="", string des = "")
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            string ConCord = "TrnTyp";
            List<PayMoTrnHdrDetails> TrnHdrDetails = new List<PayMoTrnHdrDetails>();
            TrnHdrDetails = apiOpr.InsertPaymentHdr(HTNSession.Environment, VouDate, DocNo, UrRef, cmbCrnKy, Yourref_Date, ExRateHrd, PrjKy, BUKy, OurCd, CKy, UsrKy, ConCord, IsRec,  ImageName, MultiCredit, FrmTrnKy, ObjKy, cmbAccKy, rem, des);
            return Json(TrnHdrDetails, JsonRequestBehavior.AllowGet);
        }

        public JsonResult InsertDetail(string trnKy, string VouDate, string NewGridDetail, string UpdatedGridDetail,string OurCd,string MultiCredit,string IsRec,string AccLevlKy, string ConFinKy, string cmbCrnKy,string IsStampDuty,string ObjKy,string ExRateHrd)
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            //  bool Key = apiOpr.InserPaymenttDetail(HTNSession.Environment, trnKy, VouDate, NewGridDetail, UpdatedGridDetail, CKy, UsrKy, OurCd,  MultiCredit,  IsRec, AccLevlKy,ConFinKy,cmbCrnKy);
            bool Key = false;
            if (ExRateHrd == null)
            {
                ExRateHrd = "1";
            }
            //if (NewGridDetail.Length > 2 || UpdatedGridDetail.Length > 2)
            //{
                Key = apiOpr.InserPaymenttDetail(HTNSession.Environment, trnKy, VouDate, NewGridDetail,UpdatedGridDetail, CKy, UsrKy, OurCd, MultiCredit, IsRec, AccLevlKy, ConFinKy, cmbCrnKy, IsStampDuty, ObjKy, ExRateHrd);
            //}
            //else
            //{
            //    Key = true;

            //}
            return Json(Key, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetHdrDetail(string TrnKy)
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            List<PaymenthdrGridModel> list = new List<PaymenthdrGridModel>();
            list = apiOpr.GetPaymentHdrDetail(HTNSession.Environment, TrnKy, CKy, UsrKy);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetGridDetail(string TrnKy,string ObjKy)
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            List<PaymentGridModel> list = new List<PaymentGridModel>();
            list = apiOpr.GetPaymentGridDetail(HTNSession.Environment, TrnKy, CKy, UsrKy, ObjKy);
            return Json(list, JsonRequestBehavior.AllowGet);
        }
        //Finised Payment And Recipt
        //2016/6/15 Develop For U.T s requrement
        //Bank Dropdown
        public JsonResult BankName(string ObjKy)
        {
            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;
            List<BankModel> BankName = new List<BankModel>();
            BankName = apiOpr.BankName(CKy, UsrKy, ObjKy, HTNSession.Environment);
            return Json(BankName, JsonRequestBehavior.AllowGet);

        }

        public JsonResult BranchCode(string ObjKy,string BankKy)
        {
            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;
            List<BracnhModel> BranchCode = new List<BracnhModel>();
            BranchCode = apiOpr.BranchCode(CKy, UsrKy, BankKy, ObjKy, HTNSession.Environment);
            return Json(BranchCode, JsonRequestBehavior.AllowGet);

        }



        public JsonResult OurCodeFilter(string OurCode,string ObjKy)
        {
            var UsrKy = HTNSession.UsrKy;
            var CKy = HTNSession.CKy;
            var OurCodeFilter = new List<OurCodeModel>();
            OurCodeFilter = apiOpr.OurCodeFilter(CKy, UsrKy, OurCode, ObjKy, HTNSession.Environment);
            return Json(OurCodeFilter, JsonRequestBehavior.AllowGet);
        }

        public JsonResult OdrKyCode(string ObjKy)
        {
            var UsrKy = HTNSession.UsrKy;
            var CKy = HTNSession.CKy;
            var OdrKyCode = new List<OrdrModel>();
            OdrKyCode = apiOpr.OdrKyCode(CKy, UsrKy, ObjKy,HTNSession.Environment);
            return Json(OdrKyCode, JsonRequestBehavior.AllowGet);
        }
        public JsonResult OdrCode(string ObjKy,string BuKy,string PrjKy)
        {
            var UsrKy = HTNSession.UsrKy;
            var CKy = HTNSession.CKy;
            var OdrKyCode = new List<OrdrModel>();
            string key = "OdrCode"+"-" + "ObjKy " + ObjKy + BuKy + PrjKy + "-CKy:" + CKy;
            var OdrCodeList = HTNCache.GetCachedObject(key);
            if(OdrCodeList!=null)
            {
                OdrKyCode = (List<OrdrModel>)OdrCodeList;
            }
           else
            {
                OdrKyCode = apiOpr.PaymentOdrCode(CKy, UsrKy, ObjKy, BuKy, PrjKy, HTNSession.Environment);
                HTNCache.SetCachedObject(key, OdrKyCode, 3600);
            }
           
            return Json(OdrKyCode, JsonRequestBehavior.AllowGet);
        }
        public JsonResult OdrDetCode(string ObjKy,string OrdrKy="1")
        {
            var UsrKy = HTNSession.UsrKy;
            var CKy = HTNSession.CKy;
            var OdrDetCode = new List<OrdrModel>();
            OdrDetCode = apiOpr.OdrDetCode(CKy, UsrKy, OrdrKy, ObjKy, HTNSession.Environment);
            return Json(OdrDetCode, JsonRequestBehavior.AllowGet);
        }

        
        public JsonResult IsStampShow(string ObjKy,string OurCd)
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            bool IsStmp = apiOpr.PaymentIsStampShow(HTNSession.Environment,  CKy, UsrKy, ObjKy, OurCd);
            return Json(IsStmp, JsonRequestBehavior.AllowGet);
        }

        public JsonResult IsCd13Result(string OurCode, string TrnTyp,string objKy)
        {
            var UsrKy = HTNSession.UsrKy;
            var CKy = HTNSession.CKy;

            bool IsCd13Status = apiOpr.IsCd13Status(HTNSession.Environment, CKy, UsrKy, objKy, OurCode, TrnTyp);
            return Json(IsCd13Status, JsonRequestBehavior.AllowGet);
        }
        public ActionResult PaymentNew(string OurCd, string ObjCaptn, string ObjKy)
        {
            ViewBag.ObjCaptn = ObjCaptn;
            ViewBag.OurCd = OurCd;
            ViewBag.ObjKy = ObjKy;

            return View();
        }
        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult InsertEmpImgFilesWithPath()
        {
            bool isExsit = true;
            string filename = "";
            string strFilePath = "";
            foreach (string upload in Request.Files)
            {
                string AppCustmPath = WebConfigurationManager.AppSettings["AppCustmPath"];
                isExsit = Directory.Exists(AppCustmPath + "Images\\TrnHdrExtImg\\");
                filename = Path.GetFileName(Request.Files[upload].FileName);
                string ServerPath = AppCustmPath + "Images\\TrnHdrExtImg\\";
                strFilePath = AppCustmPath + "Images\\TrnHdrExtImg\\" + filename;
                if (System.IO.File.Exists(strFilePath))
                {
                    return Json(filename, JsonRequestBehavior.AllowGet);
                }
                else
                {
                    if (isExsit)
                    {
                        Request.Files[upload].SaveAs(Path.Combine(ServerPath, filename));
                    }
                }
            }
            return Json(filename, JsonRequestBehavior.AllowGet);
        }

        public JsonResult cdmasRec(string CdKy)
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            bool IsChq = apiOpr.cdmasRec(HTNSession.Environment, CKy, UsrKy, CdKy);
            return Json(IsChq, JsonRequestBehavior.AllowGet);
        }

        public JsonResult IsTbBAl(string ObjKy, string TrnKy)
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            TBBalValidation ValidateMsg = new TBBalValidation();
            ValidateMsg = apiOpr.IsTbBAl(HTNSession.Environment, CKy, UsrKy, ObjKy, TrnKy);
            return Json(ValidateMsg, JsonRequestBehavior.AllowGet);
        }
        public JsonResult CheqNo_ValidationWeb(int TrnKy)
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            string EnvironmentName =  HTNSession.Environment;
            bool IsChq = apiOpr.CheqNo_ValidationWeb(CKy, UsrKy, TrnKy, EnvironmentName);
            return Json(IsChq, JsonRequestBehavior.AllowGet);

        }
    }
}
