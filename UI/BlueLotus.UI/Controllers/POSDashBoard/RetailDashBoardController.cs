using BlueLotus.POSDashBoard.Model.Entity;
using BlueLotus.UI.ApiOperations;
using BlueLotus.UI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace BlueLotus.UI.Controllers.POSDashBoard
{
    public class RetailDashBoardController : Controller
    {
        //
        // GET: /RetailDashBoard/
        ApiOperation apiOpr = new ApiOperation();
        public ActionResult RetailDashBoard(string OurCd, string OurCd2, int ObjKy, string ObjCaptn)
        {
            ViewBag.OurCd = OurCd;
            ViewBag.OurCd2 = OurCd2;
            ViewBag.ObjKy = ObjKy;
            ViewBag.ObjCaptn = ObjCaptn;
            return View("RetailDashBoard");
        }
        public JsonResult CatergorywiseDashBoard( string LocKy, string FrmDtm,string ToDtm)
           {
            List<CatergorywiseDashBoard> list = new List<CatergorywiseDashBoard>();
            list = apiOpr.CatergorywiseDashBoard(HTNSession.CKy, HTNSession.UsrKy, LocKy, FrmDtm, ToDtm, HTNSession.Environment);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult SalesRevenueDashBoard(string LocKy, string FrmDtm, string ToDtm)
        {
            List<RevenueModel> list = new List<RevenueModel>();
            list = apiOpr.SalesRevenueDashBoard(HTNSession.UsrKy,HTNSession.CKy, LocKy, FrmDtm, ToDtm, HTNSession.Environment);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult TotalSalesDashBoard(string LocKy, string FrmDtm, string ToDtm)
        {
            List<TotalSalesDashBoard> list = new List<TotalSalesDashBoard>();
            list = apiOpr.TotalSalesDashBoard(HTNSession.UsrKy, LocKy, FrmDtm, ToDtm, HTNSession.Environment);
            return Json(list, JsonRequestBehavior.AllowGet);
        }
    }
}
