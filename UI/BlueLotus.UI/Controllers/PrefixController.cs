using BlueLotus.Prefix.Model.Entity;
using BlueLotus.UI.ApiOperations;
using BlueLotus.UI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace BlueLotus.UI.Controllers
{
    public class PrefixController : Controller
    {
        ApiOperation ApiOperation = new ApiOperation();
        public ActionResult Index(string OurCd, string OurCd2, int ObjKy, string ObjCaptn)
        {
            ViewBag.OurCd = OurCd;
            ViewBag.OurCd2 = OurCd2;
            ViewBag.ObjKy = ObjKy;
            ViewBag.ObjCaptn = ObjCaptn;

            return View("PrefixIndex");
        }
        public JsonResult GetPrefix(int TrnTypKy, int GrpConKy)
        {
            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;
            string Environment = HTNSession.Environment;
            List<PrefixModel> ProfDet = new List<PrefixModel>();
            ProfDet = ApiOperation.GetPrefix(Environment, UsrKy, CKy, TrnTypKy, GrpConKy);
            return Json(ProfDet, JsonRequestBehavior.AllowGet);
        }
        public JsonResult InsertPrefix(string GridData, string HdrData)
        {
            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;
            string Environment = HTNSession.Environment;
            List<PrefixModel> ProfDet = new List<PrefixModel>();
            ProfDet = ApiOperation.InsertPrefix(Environment, UsrKy, CKy, HdrData, GridData);
            return Json(ProfDet, JsonRequestBehavior.AllowGet);
        }
        public JsonResult DeletePrefix(string LstNoPreFixKy)
        {
            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;
            string Environment = HTNSession.Environment;
            List<PrefixModel> ProfDet = new List<PrefixModel>();
            ProfDet = ApiOperation.DeletePrefix(Environment, UsrKy, CKy, LstNoPreFixKy);
            return Json(ProfDet, JsonRequestBehavior.AllowGet);
        }
    }
}
