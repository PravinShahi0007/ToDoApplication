using BlueLotus.Gantt.ViewModel.Entity;
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
    public class PrcsSchDetCmpnController : Controller
    {
        ApiOperation Operation = new ApiOperation();
        
        //
        // GET: /PNS_Security/

        public ActionResult PrcsSchDetCmpn()
        {
            return View();
        }


        public JsonResult SavePrcsSchDetCmpn(string ObjKy, string updatedOrders, string deletedOrders, string newOrders)
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            try
            {
                Operation.PrcsSchDetCmpn_InsertWeb(HTNSession.Environment, CKy, UsrKy, Convert.ToInt32(ObjKy), newOrders);
                Operation.PrcsSchDetCmpn_UpdateWeb(HTNSession.Environment, CKy, UsrKy, Convert.ToInt32(ObjKy), updatedOrders);
                Operation.PrcsSchDetCmpn_DeleteWeb(HTNSession.Environment, CKy, UsrKy, Convert.ToInt32(ObjKy), deletedOrders);

                return Json("success", JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public JsonResult PrcsSchDetCmpn_SelectWeb(string ObjKy, string PrcsSchDetKy)
        {
            List<PrcsSchDetCmpn> listPrcsSchDetCmpnModel = new List<PrcsSchDetCmpn>();

            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;

            listPrcsSchDetCmpnModel = Operation.PrcsSchDetCmpn_SelectWeb(HTNSession.Environment, CKy, UsrKy, Convert.ToInt32(ObjKy), PrcsSchDetKy);

            return Json(listPrcsSchDetCmpnModel, JsonRequestBehavior.AllowGet);
        }
    }
}