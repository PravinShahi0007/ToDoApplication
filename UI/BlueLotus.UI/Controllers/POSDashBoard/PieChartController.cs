using BlueLotus.Alert.Model.Entity;
using BlueLotus.BOQ.Model.Entity;
using BlueLotus.POSDashBoard.Model.Entity;
using BlueLotus.UI.ApiOperations;
using BlueLotus.UI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace BlueLotus.UI.Controllers
{
    public class PieChartController : Controller
    {
        ApiOperation apiOpr = new ApiOperation();
        
        //
        // GET: /Alert/

        public ActionResult DashBoard(string OurCd, string OurCd2, int ObjKy, string ObjCaptn)
        {
            ViewBag.OurCd = OurCd;
            ViewBag.OurCd2 = OurCd2;
            ViewBag.ObjKy = ObjKy;
            ViewBag.ObjCaptn = ObjCaptn;

            return View("DashBoard");
        }
        public JsonResult DeptOrCatgryWiseSales_DashBrdWeb(int ObjKy, string LocKy, string Dt)
        {
            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;
            string Env = HTNSession.Environment;
            List<DeptOrCatgryWiseSales_DashBrdWeb> list = new List<DeptOrCatgryWiseSales_DashBrdWeb>();
            list = apiOpr.DeptOrCatgryWiseSales_DashBrdWeb(CKy, UsrKy, ObjKy, LocKy, Dt, Env);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult DeptWiseSales_DashBrdWeb(int ObjKy, string LocKy, string Dt)
        {
            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;
            string Env = HTNSession.Environment;
            List<DeptOrCatgryWiseSales_DashBrdWeb> list = new List<DeptOrCatgryWiseSales_DashBrdWeb>();
            list = apiOpr.DeptWiseSales_DashBrdWeb(CKy, UsrKy, ObjKy, LocKy, Dt, Env);
            return Json(list, JsonRequestBehavior.AllowGet);
        }
    }
}