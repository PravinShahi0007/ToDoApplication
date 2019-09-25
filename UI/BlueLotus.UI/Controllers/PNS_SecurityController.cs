using BlueLotus.PNS_Security.Model.Entity;
using BlueLotus.UI.ApiOperations;
using BlueLotus.UI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace BlueLotus.UI.Controllers
{
    public class PNS_SecurityController : Controller
    {
        ApiOperation Operation = new ApiOperation();
        
        //
        // GET: /PNS_Security/

        public ActionResult Index(string ObjCaptn, int ObjKy, string OurCd)
        {
            ViewBag.OurCd = OurCd;
            ViewBag.ObjKy = ObjKy;
            ViewBag.ObjCaptn = ObjCaptn;
            return View();
        }

        public JsonResult DeliveryNoLookup()
        {
            int cky = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            // int cky = HTNSession.CKy;
            List<PNS_SecurityModel> list = new List<PNS_SecurityModel>();
            list = Operation.DeliveryNoLookup(HTNSession.Environment, cky, UsrKy);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult VehicleLookup(int ObjKy)
        {
            int cky = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            // int cky = HTNSession.CKy;
            List<VehicleLookup> list = new List<VehicleLookup>();
            list = Operation.VehicleLookup(HTNSession.Environment, cky, UsrKy, ObjKy);
            return Json(list, JsonRequestBehavior.AllowGet);
        }


        public JsonResult OutletLookup()
        {
            int cky = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            // int cky = HTNSession.CKy;
            List<PNS_Security_OutledModel> list = new List<PNS_Security_OutledModel>();
            list = Operation.OutletLookup(HTNSession.Environment, cky, UsrKy);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult LoadGridView(string Date, string TrnKy, string AccKy, string AdrKy)
        {
            int cky = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            // int cky = HTNSession.CKy;
            List<PNS_Security_SelectModel> list = new List<PNS_Security_SelectModel>();
            list = Operation.LoadGridView(HTNSession.Environment, cky, UsrKy, Date, TrnKy, AccKy, AdrKy);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        //=========== Update Grid View ============       
        public ActionResult UpdateGrid(string GridUpdateDetail)
        {
            bool result = false;
            //Operation = new ToDoOperation();
            int cky = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            result = Operation.UpdateGrid(HTNSession.Environment, GridUpdateDetail, cky, UsrKy);

            //if (todos != null)
            //{
            //    foreach (var model in todos)
            //    {
            //        
            //    }
            //}
            return Json(result, JsonRequestBehavior.AllowGet);
        }

    }
}
