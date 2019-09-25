using BlueLotus.ObjMas.Model;
using BlueLotus.UI.ApiOperations;
using BlueLotus.UI.Models;
using BlueLotus.UI.Reports.Shared_Report;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;

namespace BlueLotus.UI.Controllers
{
    public class ReportController : Controller
    {
        //
        // GET: /Report/

        ApiOperation apiOpr = new ApiOperation();

        #region Get View

        public ActionResult Index(string OurCd, int ObjKy, string ObjCaptn, string ChildKy)
        {
            ViewBag.ObjCaptn = ObjCaptn;
            ViewBag.OurCd = OurCd;
            ViewBag.ObjKy = ObjKy;
            ViewBag.ChildKy = ChildKy;

            return View();
        }

        public ActionResult IndexForMobileFinancial(int cky,string cnm,int usrky,string username,string usrid,int adrky,string environment,string OurCd, int ObjKy, string ObjCaptn, string ChildKy)
        {
            
            ObjKy = 89865;
            HTNSession.CKy = cky;
            HTNSession.UsrKy = usrky;
            HTNSession.Environment = environment;
            HTNSession.CNm = cnm;
            HTNSession.UsrId = usrid;
            HTNSession.UserName = username;
            HTNSession.AdrKy = adrky;

            ViewBag.OurCd = OurCd;
            ViewBag.ObjKy = ObjKy;
            ViewBag.ChildKy = ChildKy;

            return View("IndexForMobile");
        }

        //IntegrityChecksGrid
        public ActionResult IntegrityChecksGrid()
        {
            string SPName = Session["SPName"].ToString();
            string SelectedIntegrityChecksObjKy = Session["SelectedIntegrityChecksObjKy"].ToString();
            string NeededIntegrityChecksParams = Session["NeededIntegrityChecksParams"].ToString();
            string NeededIntegrityChecksParamsFromObjMas = Session["NeededIntegrityChecksParamsFromObjMas"].ToString();

            ViewBag.SPName = SPName;
            ViewBag.SelectedIntegrityChecksObjKy = SelectedIntegrityChecksObjKy;
            ViewBag.NeededIntegrityChecksParams = NeededIntegrityChecksParams;
            ViewBag.NeededIntegrityChecksParamsFromObjMas = NeededIntegrityChecksParamsFromObjMas;

            return View("IntegrityChecksGrid");
        }

        public JsonResult SetParamsToSession(string SPName, string NeededReportParamsFromObjMas, string NeededReportParams, string SelectedReportObjKy)
        {
            string SelectedReportObjKyX = "SESSIONX_SELECTED_REPORT_OBJKY";
            //SelectedReportObjKy = Convert.ToInt32(SelectedReportObjKy) <= Int64.MaxValue * ((int)SelectedReportObjKyX[7]) ? SelectedReportObjKy.ToString() : "1278";
            Session["SPName"] = SPName;
            Session["NeededReportParamsFromObjMas"] = NeededReportParamsFromObjMas;
            Session["NeededReportParams"] = NeededReportParams;
            Session["SelectedReportObjKy"] = SelectedReportObjKy;

            return Json("Success", JsonRequestBehavior.AllowGet);
        }

        public ActionResult IntegrityChecks(string OurCd, int ObjKy, string ObjCaptn, string ChildKy)
        {
            ViewBag.ObjCaptn = ObjCaptn;
            ViewBag.OurCd = OurCd;
            ViewBag.ObjKy = ObjKy;
            ViewBag.ChildKy = ChildKy;
            return View("IntegrityChecks");
        }


        #endregion Get View

        #region ViewIntegrityChecks

        public JsonResult ViewIntegrityChecksColDetMulti(
            string SPName,
            string NeededReportParamsFromObjMas,
            string NeededReportParams,
            string SelectedReportObjKy)
        {
            ApiOperation apiOpr = new ApiOperation();

            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;

            List<List<Object>> list = new List<List<Object>>();

            list = apiOpr.ViewIntegrityChecksColDetMulti(
                    SPName,
                    HTNSession.Environment,
                    CKy.ToString(),
                    UsrKy.ToString(),
                    NeededReportParamsFromObjMas,
                    NeededReportParams,
                    SelectedReportObjKy
                );

            return Json(list, JsonRequestBehavior.AllowGet);
        }

        //SetIntegrityChecksToSession
        public JsonResult SetIntegrityChecksToSession(
            string SPName,
            string SelectedIntegrityChecksObjKy,
            string NeededIntegrityChecksParams,
            string NeededIntegrityChecksParamsFromObjMas)
        {
            string SelectedReportObjKyX = "SESSIONX_SELECTED_REPORT_OBJKY";
            //SelectedIntegrityChecksObjKy = Convert.ToInt32(SelectedIntegrityChecksObjKy) <= Int64.MaxValue * ((int)SelectedReportObjKyX[7]) ? SelectedIntegrityChecksObjKy.ToString() : "1278";
            Session["SPName"] = SPName;
            Session["SelectedIntegrityChecksObjKy"] = SelectedIntegrityChecksObjKy;
            Session["NeededIntegrityChecksParams"] = NeededIntegrityChecksParams;
            Session["NeededIntegrityChecksParamsFromObjMas"] = NeededIntegrityChecksParamsFromObjMas;

            return Json("Success", JsonRequestBehavior.AllowGet);
        }

        public JsonResult ViewIntegrityChecks(
            string SPName,
            string NeededReportParamsFromObjMas,
            string NeededReportParams,
            string SelectedReportObjKy)
        {
            ApiOperation apiOpr = new ApiOperation();

            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;

            List<List<Object>> list = new List<List<Object>>();

            list = apiOpr.ViewIntegrityChecks(
                    SPName,
                    HTNSession.Environment,
                    CKy.ToString(),
                    UsrKy.ToString(),
                    NeededReportParamsFromObjMas,
                    NeededReportParams,
                    SelectedReportObjKy
                );

            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult ReportComboLoad(string PrntKy, string ObjTyp, string ObjNm)
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;

            List<ObjMasModel> list = new List<ObjMasModel>();
            list = apiOpr.UsrObjPrp_SelectWeb(HTNSession.Environment, CKy, UsrKy, PrntKy, ObjTyp, ObjNm);

            var list1 = list.Where(o => o.isVisible == 1);
            return Json(list1, JsonRequestBehavior.AllowGet);
        }
        
        #endregion ViewIntegrityChecks
        
    }

    #region Get Combo Data

    //public JsonResult GetReportNm(int ObjKy)
    //{
    //    //int cky = HTNSession.CKy;
    //    //int UsrKy = HTNSession.UsrKy;
    //    //// int cky = HTNSession.CKy;
    //    List<ReportNmModel> list = new List<ReportNmModel>();
    //    //list = operation.GetReportNm(HTNSession.Environment, cky, UsrKy, ObjKy);
    //    return Json(list, JsonRequestBehavior.AllowGet);
    //}

    //ReportComboLoad

    #endregion Get Combo Data
}
