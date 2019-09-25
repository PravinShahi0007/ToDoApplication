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
    public class PNS_DispatchController : Controller
    {
        ApiOperation Operation = new ApiOperation();

        //
        // GET: /PNS_Dispatch/

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

        public JsonResult LoadGridViewforPNSDispatch(string Date, string RecurDlvNoKy)
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            // int cky = HTNSession.CKy;
            List<PNS_Dispatch_SelectModel> list = new List<PNS_Dispatch_SelectModel>();
            list = Operation.LoadGridViewforPNSDispatch(HTNSession.Environment, CKy, UsrKy, Date, RecurDlvNoKy);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult LoadGridViewforPNSDispatchDrilled(string Date, string RecurDlvNoKy, int AccKyPass, int AdrKyPass)
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            RecurDlvNoKy = (RecurDlvNoKy == null ? "1" : RecurDlvNoKy);
            // int cky = HTNSession.CKy;
            List<PNS_Dispatch_SelectModel> list = new List<PNS_Dispatch_SelectModel>();
            list = Operation.LoadGridViewforPNSDispatchDrilled(HTNSession.Environment, UsrKy, Date, RecurDlvNoKy, AccKyPass, AdrKyPass);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Update_drilledVehNo(string TrnKy, string AdrKy)
        {
            int UsrKy = HTNSession.UsrKy;
            bool list = Operation.Update_drilledVehNo(HTNSession.Environment, UsrKy, TrnKy, AdrKy);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult UpdatePNS_Dispatch_PerantVehNoCmb(string AccKy, string AdrKy, string PreAdrKy, string Date, string RecurDlvNoKy)
        {
            if (RecurDlvNoKy== null)
            {
                RecurDlvNoKy = "1"; 
            }
            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;
            bool list = Operation.UpdatePNS_Dispatch_PerantVehNoCmb(HTNSession.Environment, CKy, UsrKy, AccKy, AdrKy, PreAdrKy, Date, RecurDlvNoKy);
            return Json(list, JsonRequestBehavior.AllowGet);
        }     

    }
}
