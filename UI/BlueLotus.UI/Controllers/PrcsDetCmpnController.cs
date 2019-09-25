using BlueLotus.UI.ApiOperations;
using BlueLotus.UI.Models;
using BlueLotus.ViewModel.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace BlueLotus.UI.Controllers
{
    public class PrcsDetCmpnController : Controller
    {

        ApiOperation Operation = new ApiOperation();

        //public JsonResult SavePrcsDetCmpn(string ObjKy, string updatedOrders, string deletedOrders, string newOrders)
        //{
        //    int CKy = HTNSession.CKy;
        //    int UsrKy = HTNSession.UsrKy;
        //    try
        //    {
        //        Operation.PrcsDetCmpn_InsertWeb(HTNSession.Environment, CKy, UsrKy, Convert.ToInt32(ObjKy), newOrders);
        //        Operation.PrcsDetCmpn_UpdateWeb(HTNSession.Environment, CKy, UsrKy, Convert.ToInt32(ObjKy), updatedOrders);
        //        Operation.PrcsDetCmpn_DeleteWeb(HTNSession.Environment, CKy, UsrKy, Convert.ToInt32(ObjKy), deletedOrders);

        //        return Json("success", JsonRequestBehavior.AllowGet);
        //    }

        //    catch (Exception ex)

        //    {
        //        throw;
        //    }
        //}
        

        public JsonResult PrcsDetCmpn_SelectWeb(string ObjKy, int PrcsDetKy)
        {
            List<PrcsDetCmpnModel> listPrcsDetCmpnModel = new List<PrcsDetCmpnModel>();

            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;

            listPrcsDetCmpnModel = Operation.PrcsDetCmpn_SelectWeb(HTNSession.Environment, CKy, UsrKy, Convert.ToInt32(ObjKy), PrcsDetKy);

            return Json(listPrcsDetCmpnModel, JsonRequestBehavior.AllowGet);
        }

        public JsonResult PrcsDetCmpn_InsertWeb(string PrcsDetCmpnDoupdate, string PrcsDetCmpn, int ObjKy)
        {
            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;
            string EnvironmentName = HTNSession.Environment;
            bool list = Operation.PrcsDetCmpn_InsertWeb(CKy, UsrKy, PrcsDetCmpnDoupdate, PrcsDetCmpn, ObjKy, EnvironmentName);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

       


    }
}