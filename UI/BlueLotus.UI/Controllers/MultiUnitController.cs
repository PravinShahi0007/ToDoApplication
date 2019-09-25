using BlueLotus.ComboLoad.Model;
using BlueLotus.MultiUnit.Model.Entity;
using BlueLotus.UI.ApiOperations;
using BlueLotus.UI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace BlueLotus.UI.Controllers
{
    public class MultiUnitController : Controller
    {
        //
        // GET: /MultiUnit/
        ApiOperation ApiOperation = new ApiOperation();

        public ActionResult Index(string OurCd, string OurCd2, int ObjKy, string ObjCaptn)
        {
            ViewBag.OurCd = OurCd;
            ViewBag.OurCd2 = OurCd2;
            ViewBag.ObjKy = ObjKy;
            ViewBag.ObjCaptn = ObjCaptn;

            return View("MultiUnit");
        }
        public JsonResult GetItemUnitMasDet(string ItmKy)
        {
            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;
            string Environment = HTNSession.Environment;
            List<MultiUnitModel> ProfDet = new List<MultiUnitModel>();
            ProfDet = ApiOperation.GetItemUnitMasDet(Environment, UsrKy, CKy, ItmKy);
            return Json(ProfDet, JsonRequestBehavior.AllowGet);
        }
        public JsonResult InsertItemUnitMasDet(string ItmKy, string DetDataString)
        {
            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;
            string Environment = HTNSession.Environment;
            List<MultiUnitModel> ProfDet = new List<MultiUnitModel>();
            ProfDet = ApiOperation.InsertItemUnitMasDet(Environment, UsrKy, CKy, ItmKy, DetDataString);
            return Json(ProfDet, JsonRequestBehavior.AllowGet);
        }
    }
}
