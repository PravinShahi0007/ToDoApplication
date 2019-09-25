using BlueLotus.CdmasColCaption.Entity;
using BlueLotus.UI.ApiOperations;
using BlueLotus.UI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace BlueLotus.UI.Controllers
{
    public class CdmasColCaptionController : Controller
    {
        //
        // GET: /CdmasColCaption/

        ApiOperation operation = new ApiOperation();
        public ActionResult Index(string OurCd, string OurCd2, string ObjKy, string ObjCaptn)
        {
            ViewBag.OurCd2 = OurCd2;
            ViewBag.OurCd = OurCd;
            ViewBag.ObjKy = ObjKy;
            ViewBag.ObjCaptn = ObjCaptn;
            return View("CdmasColCaptionIndex");
        }

        public ActionResult CdMasColCaption_SelectWeb(string ConCd,int ObjKy)
        {
            List<CdmasColCaptionModel> colcaptnList = new List<CdmasColCaptionModel>();
            int cky = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;


            colcaptnList = operation.CdMasColCaption_SelectWeb(HTNSession.Environment, cky, UsrKy, ConCd, ObjKy);
            return Json(colcaptnList, JsonRequestBehavior.AllowGet);
        }

    }
}
