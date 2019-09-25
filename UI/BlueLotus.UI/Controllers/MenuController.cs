using BlueLotus.ViewModel.Entity;
using BlueLotus.UI.ApiOperations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using BlueLotus.UI.Models;

namespace BlueLotus.UI.Controllers
{
    public class MenuController : Controller
    {
        //
        // GET: /Menu/
        ApiOperation dbOpr = new ApiOperation();

        public ActionResult SalesDashboard(string OurCd = "Sales Dashboard", string OurCd2 = "", int ObjKy = 1, string ObjCaptn = "Sales Dashboard")
        {
            ViewBag.OurCd = OurCd;
            ViewBag.OurCd2 = OurCd2;
            ViewBag.ObjKy = ObjKy;
            ViewBag.ObjCaptn = ObjCaptn;
            return View("SalesDashboard");
        }

        public ActionResult SalesPrediction(string OurCd = "Sales Dashboard", string OurCd2 = "", int ObjKy = 1, string ObjCaptn = "Sales Prediction")
        {
            ViewBag.OurCd = OurCd;
            ViewBag.OurCd2 = OurCd2;
            ViewBag.ObjKy = ObjKy;
            ViewBag.ObjCaptn = ObjCaptn;
            return View("SalesPrediction");
        }

        public ActionResult MovinItem(string OurCd = "Sales Dashboard", string OurCd2 = "", int ObjKy = 1, string ObjCaptn = "Moving Item ")
        {
            ViewBag.OurCd = OurCd;
            ViewBag.OurCd2 = OurCd2;
            ViewBag.ObjKy = ObjKy;
            ViewBag.ObjCaptn = ObjCaptn;
            return View("MovinItem");
        }
        public ActionResult Dashboard(string OurCd= "Dashboard", string OurCd2="", int ObjKy=1, string ObjCaptn= "Sales")
        {
            ViewBag.OurCd = OurCd;
            ViewBag.OurCd2 = OurCd2;
            ViewBag.ObjKy = ObjKy;
            ViewBag.ObjCaptn = ObjCaptn;
            return View("Dashboard");
        }
        public ActionResult SmartSearch(string OurCd = "SmartSearch", string OurCd2 = "", int ObjKy = 1, string ObjCaptn = "Smart Search")
        {
            ViewBag.OurCd = OurCd;
            ViewBag.OurCd2 = OurCd2;
            ViewBag.ObjKy = ObjKy;
            ViewBag.ObjCaptn = ObjCaptn;
            return View("SmartSearch");
        }

        public JsonResult GetSmartMenuModel(string SearchQuery, string ColNm)
        {
            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;
            List<MenuModel> list = new List<MenuModel>();
            list = dbOpr.GetSmartMenuModel(HTNSession.Environment, UsrKy, CKy, SearchQuery, ColNm);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public ActionResult UpdateSmartMenuModel(List<MenuModel> todo)
        {
            bool result = false;
            if (todo != null)
            {
                int UsrKy = HTNSession.UsrKy;
                result = dbOpr.UpdateSmartMenuModel(HTNSession.Environment, todo, UsrKy);
            }
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        public ActionResult GetAdminDetails()
         {
            int UsrKy = HTNSession.UsrKy;  // 28
            bool list = dbOpr.GetAdminDetails(HTNSession.Environment, UsrKy);
            return Json(list, JsonRequestBehavior.AllowGet);
        }
    }
}
