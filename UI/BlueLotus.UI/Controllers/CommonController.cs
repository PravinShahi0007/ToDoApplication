using BlueLotus.ComboLoad.Model;
using BlueLotus.UI.ApiOperations;
using BlueLotus.UI.Models;
using BlueLotus.ViewModel.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace BlueLotus.UI.Controllers
{
    public class CommonController : Controller
    {
        //
        // GET: /Common/

        ApiOperation apiOpr = new ApiOperation();

        public JsonResult GetItmRateDisTax(
            int ObjKy, int ItmKy, string EftvDt, int LocKy,
            int TrnTypKy, int BUKy, int PrjKy,
            int AdrKy, int AccKy)
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;

            List<GetItmRateDisTax> list = new List<GetItmRateDisTax>();
            list = apiOpr.GetItmRateDisTax(
                HTNSession.Environment, CKy, UsrKy, ObjKy,
                ItmKy, EftvDt, LocKy,
                TrnTypKy, BUKy, PrjKy,
                AdrKy, AccKy);

            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult AprStsNm_SelectWeb(string ObjKy, string CurAprStsKy, string TrnKy)
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;

            List<AprStsNm_SelectWeb> list = new List<AprStsNm_SelectWeb>();
            list = apiOpr.AprStsNm_SelectWeb(
                HTNSession.Environment, CKy, UsrKy, Convert.ToInt32(ObjKy), Convert.ToInt32(CurAprStsKy), Convert.ToInt32(TrnKy));

            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult IsAlwTrnUpdateApr_SelectWeb(string ObjKy, string AprStsKy, string TrnKy)
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;

            List<AprStsLockStatus> list = new List<AprStsLockStatus>();
            list = apiOpr.IsAlwTrnUpdateApr_SelectWeb(
                HTNSession.Environment, CKy, UsrKy, Convert.ToInt32(ObjKy), Convert.ToInt32(AprStsKy), Convert.ToInt32(TrnKy));

            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult TrnHdrApr_LatestState(int ObjKy, int TrnKy, string TblNm)
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;

            List<TrnHdrApr_LatestState> list = new List<TrnHdrApr_LatestState>();
            list = apiOpr.TrnHdrApr_LatestState(
                HTNSession.Environment, CKy, UsrKy, ObjKy, TrnKy, TblNm);

            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult TrnHdrApr_NextState(
            int ObjKy, int CurntAprStsKy, int TrnTypKy)
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;

            List<AprStsLockStatus> list = new List<AprStsLockStatus>();
            list = apiOpr.TrnHdrApr_NextState(
                HTNSession.Environment, CKy, UsrKy, ObjKy, CurntAprStsKy, TrnTypKy);

            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult TrnHdrApr_InsertWeb(
            int ObjKy, int TrnKy, int AprStsKy, int AprResnKy, int AprPrtyKy, string TblNm)
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;

            List<TrnHdrApr_InsertWeb> list = new List<TrnHdrApr_InsertWeb>();
            list = apiOpr.TrnHdrApr_InsertWeb(
                HTNSession.Environment, CKy, UsrKy, ObjKy, TrnKy, AprStsKy, AprResnKy, AprPrtyKy, TblNm);

            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult CdNm_SelectWeb(string ConCd)
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;

            List<CdNm_SelectWeb> list = new List<CdNm_SelectWeb>();
            list = apiOpr.CdNm_SelectWeb(HTNSession.Environment, CKy, UsrKy, ConCd);

            return Json(list, JsonRequestBehavior.AllowGet);
        }

        
    }
}