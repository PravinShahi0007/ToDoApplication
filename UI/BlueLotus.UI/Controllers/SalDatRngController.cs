using BlueLotus.Alert.Model.Entity;
using BlueLotus.BOQ.Model.Entity;
using BlueLotus.SalaryDate.Model.Entity;
using BlueLotus.UI.ApiOperations;
using BlueLotus.UI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace BlueLotus.UI.Controllers
{
    public class SalDatRngController : Controller
    {
        ApiOperation apiOpr = new ApiOperation();

        public ActionResult SalaryDate(string OurCd, string OurCd2, int ObjKy, string ObjCaptn)
        {
            ViewBag.OurCd = OurCd;
            ViewBag.OurCd2 = OurCd2;
            ViewBag.ObjKy = ObjKy;
            ViewBag.ObjCaptn = ObjCaptn;

            return View("SalaryDate");
        }
        public JsonResult SalDtRng_Insert(string ObjKy, int SalPrcsGrpKy, int SalTypKy, string SalDt, string ActuSalDt, string FmDt, string ToDt, int fAprSal, string SalDtKy)
        {
            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;
            string EnvironmentName = HTNSession.Environment;
            bool list = apiOpr.SalDtRng_Insert(CKy, UsrKy, ObjKy, SalPrcsGrpKy, SalTypKy, SalDt, ActuSalDt, FmDt, ToDt, fAprSal, SalDtKy, EnvironmentName);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult LoadSalaryGridFindView(string ObjKy, int SalPrcsGrpKy, string SalDt, int fAprSal)
        {
            int cky = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            List<SalDtRng_Insert> list = new List<SalDtRng_Insert>();
            list = apiOpr.LoadSalaryGridFindView(HTNSession.Environment, cky, UsrKy, ObjKy, SalDt, SalPrcsGrpKy, fAprSal);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetHdrDetailFromGrid(string ObjKy, string SalDtKy)
        {
            int cky = HTNSession.CKy;
            int usrKy = HTNSession.UsrKy;
            List<SalDtRng_Insert> list = new List<SalDtRng_Insert>();
            list = apiOpr.GetHdrDetailFromGrid(HTNSession.Environment, cky, usrKy, ObjKy, SalDtKy);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

    }
}