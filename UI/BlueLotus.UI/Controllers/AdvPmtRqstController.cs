using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using BlueLotus.AdvPmtReqst.Model;
using BlueLotus.UI.ApiOperations;
using BlueLotus.UI.Models;

namespace BlueLotus.UI.Controllers
{
    public class AdvPmtRqstController : Controller
    {
        //
        // GET: /AdvPmtRqst/
        ApiOperation apiOpr = new ApiOperation();
        public ActionResult AdvPmtRqstForm(string OurCd, string ObjCaptn, string ObjKy)
        {
            ViewBag.ObjCaptn = ObjCaptn;
            ViewBag.OurCd = OurCd;
            ViewBag.ObjKy = ObjKy;
            return View();
        }
        // 
        public JsonResult InsertUpdate(string PrjKy, string BuKy, string VauDate,string newRecords,string updateRecords,string ourCode,string ObjKy,string DocNu)
        {
            var UsrKy = HTNSession.UsrKy;
            var CKy = HTNSession.CKy;
            var concord = "trnTyp";
            List<AdvPmtModel.AdvPmtRqstHdrModel> AccMassInsertUpdate = new List<AdvPmtModel.AdvPmtRqstHdrModel>();
             AccMassInsertUpdate = apiOpr.AdvPmtRqstInsertUpdate(HTNSession.Environment, CKy, UsrKy,  PrjKy,  BuKy,  VauDate,  newRecords,  updateRecords, ourCode, concord, ObjKy, DocNu);
            return Json(AccMassInsertUpdate, JsonRequestBehavior.AllowGet);
        }

        //Te
    }
}
