using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using BlueLotus.UI.ApiOperations;
using BlueLotus.UI.Models;
using Budget.Model;

namespace BlueLotus.UI.Controllers
{
    public class BudgetController : Controller
    {
        ApiOperation apiOpr = new ApiOperation();
        //
        // GET: /Budget///

        public ActionResult AccBudeget(string OurCd, string ObjCaptn, string ObjKy)
        {
            ViewBag.ObjCaptn = ObjCaptn;
            ViewBag.OurCd = OurCd;
            ViewBag.ObjKy = ObjKy;
            return View();
        }
        public JsonResult GetAccBjtDetails(string JsonString, string ObjKy)
        {
            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;
            List<BudgetModelSet> BudgetSelect = new List<BudgetModelSet>();
            BudgetSelect = apiOpr.GetAccBjtDetails(HTNSession.Environment, CKy, UsrKy, JsonString, ObjKy);
            return Json(BudgetSelect, JsonRequestBehavior.AllowGet);

        }
        public JsonResult InsertUpdate(string InsertedRecord, string UpdatedRecord,string AccBgtTypKy, string ObjKy)
        {
            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;
            BudgetModelSet BudgetSelect = new BudgetModelSet();
            BudgetSelect = apiOpr.InsertUpdate(HTNSession.Environment, CKy, UsrKy, InsertedRecord, UpdatedRecord,ObjKy, AccBgtTypKy);
            return Json(BudgetSelect, JsonRequestBehavior.AllowGet);

        }
    }
}
