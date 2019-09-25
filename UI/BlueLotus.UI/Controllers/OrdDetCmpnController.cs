using BlueLotus.Gantt.ViewModel.Entity;
using BlueLotus.PNS_Security.Model.Entity;
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
    public class OrdDetCmpnController : Controller
    {
        ApiOperation Operation = new ApiOperation();
        
        //
        // GET: /PNS_Security/

        public ActionResult OrdDetCmpn()
        {
            return View();
        }


        public JsonResult SaveOrdDetCmpn(string ObjKy, string updatedOrders, string deletedOrders, string newOrders)
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            try
            {
                Operation.OrdDetCmpn_InsertWeb(HTNSession.Environment, CKy, UsrKy, Convert.ToInt32(ObjKy), newOrders);
                Operation.OrdDetCmpn_UpdateWeb(HTNSession.Environment, CKy, UsrKy, Convert.ToInt32(ObjKy), updatedOrders);
                Operation.OrdDetCmpn_DeleteWeb(HTNSession.Environment, CKy, UsrKy, Convert.ToInt32(ObjKy), deletedOrders);

                return Json("success", JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public JsonResult OrdDetCmpn_SelectWeb(string ObjKy, string OrdDetKy)
        {
            List<OrdDetCmpnModel> listOrdDetCmpnModel = new List<OrdDetCmpnModel>();

            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;

            listOrdDetCmpnModel = Operation.OrdDetCmpn_SelectWeb(HTNSession.Environment, CKy, UsrKy, Convert.ToInt32(ObjKy), OrdDetKy);

            return Json(listOrdDetCmpnModel, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Multi_OrdDetCmpn_SelectWeb(string ObjKy, string OrdDetKys)
        {
            List<OrdDetCmpnModel> listOrdDetCmpnModel = new List<OrdDetCmpnModel>();

            int i = 1;

            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;

            int[] ia_OrdDetKys = OrdDetKys.Split(',').Select(n => Convert.ToInt32(n)).ToArray();

            foreach(int ia_OrdDetKy in ia_OrdDetKys)
            {
                List<OrdDetCmpnModel> temp_ListOrdDetCmpnModel = Operation.OrdDetCmpn_SelectWeb(HTNSession.Environment, CKy, UsrKy, Convert.ToInt32(ObjKy), ia_OrdDetKy.ToString());
                foreach(OrdDetCmpnModel tempOrdDet in temp_ListOrdDetCmpnModel)
                {
                    tempOrdDet.LiNo = i++;
                    listOrdDetCmpnModel.Add(tempOrdDet);
                }
            }

            //listOrdDetCmpnModel = Operation.OrdDetCmpn_SelectWeb(HTNSession.Environment, CKy, UsrKy, Convert.ToInt32(ObjKy), OrdDetKy);

            return Json(listOrdDetCmpnModel, JsonRequestBehavior.AllowGet);
        }
    }
}