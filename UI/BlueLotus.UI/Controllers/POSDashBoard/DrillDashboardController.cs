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
    public class DrillDashboardController : Controller
    {
        //
        // GET: /DrillDashboard/
        ApiOperation apiOpr = new ApiOperation();
        public ActionResult DrillDashBoard(string OurCd, string OurCd2, int ObjKy, string ObjCaptn)
        {
            ViewBag.OurCd = OurCd;
            ViewBag.OurCd2 = OurCd2;
            ViewBag.ObjKy = ObjKy;
            ViewBag.ObjCaptn = ObjCaptn;
            return View("DrillDashBoard");
        }

        public ActionResult DrillDashBoardDetails(string OurCd, string OurCd2, int ObjKy, string ObjCaptn,string PrjKy,string Date)
        {
            ViewBag.OurCd = OurCd;
            ViewBag.OurCd2 = OurCd2;
            ViewBag.ObjKy = ObjKy;
            ViewBag.ObjCaptn = ObjCaptn;
            ViewBag.PrjKy = PrjKy;
            ViewBag.Date = Date;
            return View("DrillDashBoardDetails");
        }

        List<SalesDrillDown> list;
        public JsonResult ProjectDashBoard(string Dt, int Objky)
        {
            list = new List<SalesDrillDown>();
            list = apiOpr.ProjectDrillDashBoard(Dt, Objky, HTNSession.UsrKy, HTNSession.CKy, HTNSession.Environment);
            return Json(list, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetDetailsOfGrid(string PrjKy, string Dt, string ObjKy)
        {
            list = new List<SalesDrillDown>();
            list = apiOpr.GetDetailsOfGrid(PrjKy,Dt, ObjKy, HTNSession.UsrKy, HTNSession.CKy, HTNSession.Environment);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        //public JsonResult GetItmDetails(int Itmky,string LocKy, string FrmDt, string ToDt)
        //{
        //    List<SalesDrillDown> list = new List<SalesDrillDown>();
        //    list = apiOpr.GetItmDetails(Itmky, LocKy, HTNSession.UsrKy, HTNSession.CKy,FrmDt,ToDt, HTNSession.Environment);
        //    return Json(list, JsonRequestBehavior.AllowGet);
        //}
    }
}
