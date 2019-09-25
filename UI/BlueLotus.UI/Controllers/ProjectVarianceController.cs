using BlueLotus.ItmMas.Model.Entity;
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
    public class ProjectVarianceController : Controller
    {
        //
        // GET: /ProjectVariance/
        ApiOperation apiOpr = new ApiOperation();
        public ActionResult ProjectVariance(string OurCd = "ProjectVariance", string OurCd2 = "", int ObjKy = 1, string ObjCaptn = "Project Variance")
        {
            ViewBag.OurCd = OurCd;
            ViewBag.OurCd2 = OurCd2;
            ViewBag.ObjKy = ObjKy;
            ViewBag.ObjCaptn = ObjCaptn;
            return View("ProjectVariance");
        }

        public JsonResult PVDashboard(int PrjKy,string FrmDt,string ToDt)
        {
            List<ProjectVarience> evm = new List<ProjectVarience>();
            evm = apiOpr.PrjDashboard(PrjKy, FrmDt, ToDt, HTNSession.CKy, HTNSession.Environment);
            return Json(evm, JsonRequestBehavior.AllowGet);
        }
        public ActionResult ProjectScheduleVariance(string OurCd, string OurCd2, string ObjKy, string ObjCaptn)
        {
            ViewBag.OurCd2 = OurCd2;
            ViewBag.OurCd = OurCd;
            ViewBag.ObjKy = ObjKy;
            ViewBag.ObjCaptn = ObjCaptn;
            return View("ProjectScheduleVariance");
        }

        public JsonResult GetGridData(int PrjKy,string frmdate,string todate,int ObjKy)
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            string EnviormentName = HTNSession.Environment;

            List<ProjectScheduleTS> RetunList = new List<ProjectScheduleTS>();
            RetunList = apiOpr.ProjectScheduleGetGridData(PrjKy, frmdate, todate, ObjKy, CKy, UsrKy, EnviormentName);
            return Json(RetunList, JsonRequestBehavior.AllowGet);
        }
    }
}
