using BlueLotus.ItemDiscount.Model.Entity;
using BlueLotus.UI.ApiOperations;
using BlueLotus.UI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace BlueLotus.UI.Controllers
{
    public class ItemDiscountController : Controller
    {
        ApiOperation Operation = new ApiOperation();
        public ActionResult Index(string OurCd, string OurCd2, string ObjKy, string ObjCaptn)
        {
            ViewBag.OurCd2 = OurCd2;
            ViewBag.ObjKy = ObjKy;
            ViewBag.ObjCaptn = ObjCaptn;
            ViewBag.OurCd = OurCd;
            return View();
        }


        public ActionResult ItemsAD_SelectWeb(int ObjKy, string OurCd, int ItmPriCatKy, int AdrPriCatKy, int PmtTrmKy, int PmtModeKy, int AdrKy, string Eftv)
        {
            int Cky = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            List<ItmDiscount_SalesModel> List = new List<ItmDiscount_SalesModel>();
            List = Operation.ItemsAD_SelectWeb(HTNSession.Environment, ObjKy, Cky, UsrKy, OurCd, ItmPriCatKy, AdrPriCatKy, PmtTrmKy, PmtModeKy, AdrKy, Eftv);
            return Json(List, JsonRequestBehavior.AllowGet);
        }

        public JsonResult ItemsAD_InsertandUpdate(string ObjKy, string OurCd, string AdrKy, string Eftv, string updateDiscount, string newDiscount)
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            //bool process = false;
            var insertUpdate = Operation.ItemsAD_InsertandUpdate(HTNSession.Environment, CKy, UsrKy, Convert.ToInt32(ObjKy), OurCd, Convert.ToInt32(AdrKy), Eftv, updateDiscount, newDiscount);
            return Json(insertUpdate, JsonRequestBehavior.AllowGet);
        }



    }
}
