using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using BlueLots.ItemCosting.Model;
using BlueLotus.UI.ApiOperations;
using BlueLotus.UI.Models;

namespace BlueLotus.UI.Controllers
{
    public class ImortCostingController : Controller
    {
        //
        // GET: /ImortCosting/
        ApiOperation apiOpr = new ApiOperation();

        public ActionResult ImportCosting(string OurCd, string ObjCaptn, string ObjKy)
        {
            ViewBag.ObjCaptn = ObjCaptn;
            ViewBag.OurCd = OurCd;
            ViewBag.ObjKy = ObjKy;
            return View();
        }
        public JsonResult GetGridDetail(string TrnKy, string ObjKy)
        {
            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;
            List<ItemCosting> Gridata = new List<ItemCosting>();
            Gridata = apiOpr.GetGridDetail(HTNSession.Environment, CKy, UsrKy,  ObjKy, TrnKy);
            return Json(Gridata, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetDetailGridDetail(string ItmTrnKy, string ObjKy)
        {
            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;
            List<ItemCosting> Gridata = new List<ItemCosting>();
            Gridata = apiOpr.GetDetailGridDetail(HTNSession.Environment, CKy, UsrKy, ObjKy, ItmTrnKy);
            return Json(Gridata, JsonRequestBehavior.AllowGet);
        }
        public JsonResult SaveUpdate(string HdrDetails, string DetailGrid, string ObjKy)
        {
            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;
            bool Result = apiOpr.ItemCostingSaveUpdate(HTNSession.Environment, CKy, UsrKy, ObjKy, HdrDetails, DetailGrid);
            return Json(Result, JsonRequestBehavior.AllowGet);
        }
    }
}
