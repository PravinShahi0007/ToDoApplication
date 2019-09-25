using BlueLotus.UI.ApiOperations;
using BlueLotus.UI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using TransactionModel.Entity;

namespace BlueLotus.UI.Controllers
{
    public class TransactionAccController : Controller
    {
        ApiOperation apiOpr = new ApiOperation();

        //
        // GET: /TransactionAcc/

        public ActionResult Index()
        {
            return View();
        }

        public JsonResult ContractAccCd_SelectMob(string AccTyps)
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;

            List<AccModel> list = new List<AccModel>();
            list = apiOpr.ContractAccCd_SelectMob(HTNSession.Environment, CKy, UsrKy, AccTyps);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult ContractAccNm_SelectMob(string AccTyps)
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;

            List<AccModel> list = new List<AccModel>();
            list = apiOpr.ContractAccNm_SelectMob(HTNSession.Environment, CKy, UsrKy, AccTyps);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult AccCd_SelectMob(string AccTyps)
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;

            List<AccModel> list = new List<AccModel>();
            list = apiOpr.AccCd_SelectMob(HTNSession.Environment, CKy, UsrKy, AccTyps);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult AccNm_SelectMob(string AccTyps)
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;

            List<AccModel> list = new List<AccModel>();
            list = apiOpr.AccNm_SelectMob(HTNSession.Environment, CKy, UsrKy, AccTyps);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult CheckLockByTrnKy(int TrnKy)
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;

            long list = apiOpr.CheckLockByTrnKy(HTNSession.Environment, CKy, UsrKy, TrnKy);
            return Json(list, JsonRequestBehavior.AllowGet);
        }
    }
}
