using BlueLotus.StockClosing.Model.Entity;
using BlueLotus.UI.ApiOperations;
using BlueLotus.UI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace BlueLotus.UI.Controllers
{
    public class StockClosingController : Controller
    {
        //
        // GET: /StockClosing/
        ApiOperation Operation = new ApiOperation();
        public ActionResult Index(string OurCd, string OurCd2, string ObjKy, string ObjCaptn)
        {
            ViewBag.OurCd2 = OurCd2;
            ViewBag.ObjKy = ObjKy;
            ViewBag.ObjCaptn = ObjCaptn;
            ViewBag.OurCd = OurCd;

            return View();
        }

        public JsonResult ViewClosingStock(int AccKy, string FrmDt, string ToDt)
        {
            //int CKy = HTNSession.CKy;
            int usrKy = HTNSession.UsrKy;
            int Cky = HTNSession.CKy;

            List<StockClosingModel> list = new List<StockClosingModel>();
            list = Operation.ViewClosingStock(HTNSession.Environment, usrKy, Cky, AccKy, FrmDt, ToDt);

            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public ActionResult SaveClosingStock(int ObjKy, string updateAccmacc, string newAccmacc, int AccKy, string FrmDt, string ToDt)
        {
            bool process = false;
            int cky = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;

            process = Operation.SaveClosingStock(HTNSession.Environment, cky, UsrKy, ObjKy, updateAccmacc, newAccmacc, AccKy, FrmDt, ToDt);
            //}
            return Json(process, JsonRequestBehavior.AllowGet);
        }




    }
}
