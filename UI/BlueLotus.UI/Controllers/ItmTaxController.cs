using BlueLotus.ItmTax.Model.Entity;
using BlueLotus.UI.ApiOperations;
using BlueLotus.UI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace BlueLotus.UI.Controllers
{
    public class ItmTaxController : Controller
    {
        //
        // GET: /ItmTax/
        ApiOperation Operation = new ApiOperation();

        public ActionResult ItmTax(string OurCd, string OurCd2, string ObjKy, string ObjCaptn)
        {
            ViewBag.OurCd2 = OurCd2;
            ViewBag.ObjKy = ObjKy;
            ViewBag.ObjCaptn = ObjCaptn;
            ViewBag.OurCd = OurCd;

            return View("ItmTax");
        }

        public JsonResult GetAllItemTax(int ItmTypKy, int ItmTaxTypKy, int ObjKy, string EftvDate, int Cat8Ky, int Cat7Ky)
        {
            //ItmTypKy=123001&ItmTaxTypKy=123411&ObjKy=101459&EftvDate=30%2F08%2F2016

            //int CKy = HTNSession.CKy;

            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;
            List<ItmTax_SelectWeb> list = new List<ItmTax_SelectWeb>();
            list = Operation.GetAllItemTax(HTNSession.Environment, ItmTypKy, ItmTaxTypKy, EftvDate, UsrKy, CKy, ObjKy, Cat8Ky, Cat7Ky);

            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public ActionResult UpdateItmTax(string updateGrid, string newGrid, string ItmTypKy, string EftvDate, string ObjKy, int ItmTaxCatKy, string OurCd)
        {
            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;
            //int ObjKy = Convert.ToInt32(Session["ObjKy"]);

            var process = Operation.UpdateItmTax(HTNSession.Environment, updateGrid, newGrid, CKy, UsrKy, Convert.ToInt32(ObjKy), ItmTaxCatKy, Convert.ToInt32(ItmTypKy), EftvDate, OurCd);

            return Json(process, JsonRequestBehavior.AllowGet);
        }

    }
}
