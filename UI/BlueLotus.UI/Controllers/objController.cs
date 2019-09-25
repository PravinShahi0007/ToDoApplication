
using BlueLotus.ObjModel.Entity;
using BlueLotus.UI.ApiOperations;
using BlueLotus.UI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace BlueLotus.UI.Controllers
{
    public class objController : Controller
    {
        //
        // GET: /obj/

        ApiOperation operation = new ApiOperation();

        public ActionResult Index(string OurCd, string OurCd2, string ObjKy, string ObjCaptn)
        {
            ViewBag.OurCd2 = OurCd2;
            ViewBag.OurCd = OurCd;
            ViewBag.ObjKy = ObjKy;
            ViewBag.ObjCaptn = ObjCaptn;            
            return View("Index");
        }
                  //comboLoad
        public JsonResult ObjTyp_SelecttMob(int ObjKy)
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;

            List<ObjModels> list = new List<ObjModels>();
            list = operation.ObjTyp_SelecttMob(HTNSession.Environment, CKy, UsrKy, ObjKy);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        //objselect
        public ActionResult ObjMasObjTyp_SelectWeb(int ObjTypKy)
        {
            List<Objselect> ObjList = new List<Objselect>();
            int cky = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;


            ObjList = operation.ObjMasObjTyp_SelectWeb(HTNSession.Environment, cky, UsrKy, ObjTypKy);           
            return Json(ObjList, JsonRequestBehavior.AllowGet);
        }
        // objselect

        // Objmas Update
        public ActionResult ObjMasObjTyp_UpdateWeb( string GridUpdateDetail , int ObjKy)
        {
            bool result = false;
            
            int cky = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            result = operation.ObjMasObjTyp_UpdateWeb(HTNSession.Environment, GridUpdateDetail, ObjKy, cky, UsrKy);

            return Json(result, JsonRequestBehavior.AllowGet);
        }
    }
}
