using BlueLots.Project.Model;
using BlueLotus.UI.ApiOperations;
using BlueLotus.UI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace BlueLotus.UI.Controllers
{
    public class PrjAdressController : Controller
    {
        //
        // GET: /PrjAdress/
        ApiOperation operation = new ApiOperation();
        List<PrjAdr> list = new List<PrjAdr>();
        public ActionResult PrjAdr(string OurCd, string OurCd2, int ObjKy, string ObjCaptn)
        {
            ViewBag.OurCd = OurCd;
            ViewBag.OurCd2 = OurCd2;
            ViewBag.ObjKy = ObjKy;
            ViewBag.ObjCaptn = ObjCaptn;
            return View("PrjAdr");
        }

        public JsonResult PrjAdr_InsertWeb(int PrjKy, int AdrKy)
        {
            bool list = new bool();
            list = operation.PrjAdr_InsertWeb(PrjKy, AdrKy,HTNSession.Environment);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult PrjAdr_SelectWeb(string PrjKy, string AdrKy)
        {
            int CKy = HTNSession.CKy;
            string Environtname = HTNSession.Environment;
            List<PrjAdr> list = new List<PrjAdr>();
            list = operation.PrjAdr_SelectWeb(Convert.ToInt32(PrjKy), Convert.ToInt32(AdrKy), CKy, Environtname);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult PrjAdr_UpdateWeb(string PrjAdrKy ,string PrjKy , string AdrKy)
        {
            string Environtname = HTNSession.Environment;
            bool list = new bool();
            list = operation.PrjAdr_UpdateWeb(Convert.ToInt32(PrjAdrKy), Convert.ToInt32(PrjKy), Convert.ToInt32(AdrKy), Environtname);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

    }
}
