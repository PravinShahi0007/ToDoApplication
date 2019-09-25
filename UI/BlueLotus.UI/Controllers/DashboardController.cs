
using BlueLotus.ItmMas.Model.Entity;

using BlueLotus.UI.ApiOperations;
using BlueLotus.UI.Models;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace BlueLotus.UI.Controllers
{
    public class DashboardController : Controller
    {
        //
        // GET: /Dashboard/
        ApiOperation Operation = new ApiOperation();

        public ActionResult Dashboard(string OurCd = "Dashboard", string OurCd2 = "", int ObjKy = 1, string ObjCaptn = "Project Variance")
        {
            ViewBag.OurCd = OurCd;
            ViewBag.OurCd2 = OurCd2;
            ViewBag.ObjKy = ObjKy;
            ViewBag.ObjCaptn = ObjCaptn;
            return View("Dashboard");
        }

        public ActionResult DashboardMobile(string OurCd = "Dashboard", string OurCd2 = "", int ObjKy = 1, string ObjCaptn = "Project Variance")
        {
            ViewBag.OurCd = OurCd;
            ViewBag.OurCd2 = OurCd2;
            ViewBag.ObjKy = ObjKy;
            ViewBag.ObjCaptn = ObjCaptn;
            return View("DashboardMobile");
        }


        public ActionResult GetPrject_CurrentStatus(string Code1, string Code2, string Code3)
        {
            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;
            

            List<GetPrject_CurrentStatus> CrntStsModel = Operation.GetPrject_CurrentStatus(Code1, Code2, Code3, UsrKy, CKy, HTNSession.Environment);
            return Json(CrntStsModel, JsonRequestBehavior.AllowGet);
        }

        public ActionResult Prject_CurrentStatus(string currentstatus, string Code1, string Code2, string Code3)
        {
            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;


            List<GetPrject_CurrentStatus> CrntStsModel = Operation.Prject_CurrentStatus(currentstatus, Code1, Code2, Code3,UsrKy, CKy, HTNSession.Environment);
            return Json(CrntStsModel, JsonRequestBehavior.AllowGet);
        }

        public ActionResult Prject_CurrentStatusDetails(string currentstatus, string PrjTyp)
        {
            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;


            List<GetPrject_CurrentStatus> CrntStsModel = Operation.Prject_CurrentStatusDetails(currentstatus, PrjTyp,  UsrKy, CKy, HTNSession.Environment);
            return Json(CrntStsModel, JsonRequestBehavior.AllowGet);
        }

        
        public ActionResult PrjCurrentStatusTrdMrk()
        {
            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;
            string Environment = HTNSession.Environment;

            List<GetPrject_CurrentStatus> CrntStsModel = Operation.PrjCurrentStatusTrdMrk(UsrKy, Environment);
            return Json(CrntStsModel, JsonRequestBehavior.AllowGet);
        }



        //POS DASHBOARD
        public ActionResult SalesDashBoard(string OurCd = "SalesDashBoard", string OurCd2 = "", int ObjKy = 1, string ObjCaptn = "Project Variance")
        {
            ViewBag.OurCd = OurCd;
            ViewBag.OurCd2 = OurCd2;
            ViewBag.ObjKy = ObjKy;
            ViewBag.ObjCaptn = ObjCaptn;
            return View("SalesDashBoard");
        }


        public JsonResult GetSalesItem(string Fromdt, string Todt, int Locky)
        {
            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;

            DateTime From = DateTime.ParseExact(Fromdt, "dd/MM/yyyy hh:mm tt", CultureInfo.InvariantCulture);
            DateTime To = DateTime.ParseExact(Todt, "dd/MM/yyyy hh:mm tt", CultureInfo.InvariantCulture);

            List<SaleItem> SaleItem = Operation.GetSalesItem(From.ToString("dd/MMM/yyyy"), To.ToString("dd/MMM/yyyy"), Locky, UsrKy, CKy, HTNSession.Environment);
            return Json(SaleItem, JsonRequestBehavior.AllowGet);
        }


        public JsonResult GetRelatedSalesItem(int itmKy, string Fromdt, string Todt, int Locky)
        {
            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;


            DateTime From = DateTime.ParseExact(Fromdt, "dd/MM/yyyy hh:mm tt", CultureInfo.InvariantCulture);
            DateTime To = DateTime.ParseExact(Todt, "dd/MM/yyyy hh:mm tt", CultureInfo.InvariantCulture);

            List<RelatedSaleItem> RelatedSaleItem = Operation.GetRelatedSalesItem(itmKy, From.ToString("dd/MMM/yyyy"), To.ToString("dd/MMM/yyyy"), Locky, UsrKy, CKy, HTNSession.Environment);
            return Json(RelatedSaleItem, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetRelatedHourSalesItem(int itmKy, string Fromdt, string Todt, int Locky)
        {
            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;
            DateTime From = DateTime.ParseExact(Fromdt, "dd/MM/yyyy hh:mm tt", CultureInfo.InvariantCulture);
            DateTime To = DateTime.ParseExact(Todt, "dd/MM/yyyy hh:mm tt", CultureInfo.InvariantCulture);
            List<HourlySalesReport> HourlySalesReport = Operation.GetRelatedHourSalesItem(itmKy, From.ToString("dd/MMM/yyyy"), To.ToString("dd/MMM/yyyy"), Locky, UsrKy, CKy, HTNSession.Environment);
            foreach (HourlySalesReport hourSl in HourlySalesReport)
            {
                try
                {
                    string[] splitv = hourSl.Period.Split('-');

                    int ranger1 = Convert.ToInt32(splitv[0].Replace(":", "")) / 100;
                    int ranger2 = Convert.ToInt32(splitv[1].Replace(":", "")) / 100;
                    hourSl.Period = (ranger1 + 5).ToString() + ":00-" + (ranger2 + 5).ToString() + ":00";
                }
                catch
                {

                }

            }






            return Json(HourlySalesReport, JsonRequestBehavior.AllowGet);
        }



    }
}
