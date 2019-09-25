using BlueLotus.ItmMas.Model.Entity;
using BlueLotus.UI.ApiOperations;
using BlueLotus.UI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace BlueLotus.UI.Controllers
{
    public class UnitMasEntryController : Controller
    {
        ApiOperation apiOpr = new ApiOperation();
        
        public ActionResult UnitMasEntry(string OurCd, string OurCd2, int ObjKy, string ObjCaptn)
        {
            ViewBag.OurCd = OurCd;
            ViewBag.OurCd2 = OurCd2;
            ViewBag.ObjKy = ObjKy;
            ViewBag.ObjCaptn = ObjCaptn;

            return View();
        }

        public JsonResult BaseUnit_Select(int ObjKy)
        {
            List<UnitMasEntryModel> listUnitMasEntry = new List<UnitMasEntryModel>();

            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;


            listUnitMasEntry = apiOpr.BaseUnit_Select(HTNSession.Environment, CKy, UsrKy, Convert.ToInt32(ObjKy));

            return Json(listUnitMasEntry, JsonRequestBehavior.AllowGet);
        }

        public JsonResult SaveUnitMasEntry(string ObjKy, string updated, string deleted, string insert)
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            try
            {
                apiOpr.UnitMas_InsertWeb(HTNSession.Environment, CKy, UsrKy, Convert.ToInt32(ObjKy), insert);
                apiOpr.UnitMas_UpdateWeb(HTNSession.Environment, CKy, UsrKy, Convert.ToInt32(ObjKy), updated);
                //apiOpr.UnitMas_DeleteWeb(HTNSession.Environment, CKy, UsrKy, Convert.ToInt32(ObjKy), deleted);

                return Json("success", JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                throw;
            }
        }
        public JsonResult UnitMas_SelectWeb(string ObjKy, string UnitKy)
        {
            List<UnitMasEntryModel> listUnitMasEntry = new List<UnitMasEntryModel>();

            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;


            listUnitMasEntry = apiOpr.UnitMas_SelectWeb(HTNSession.Environment, CKy, UsrKy, Convert.ToInt32(ObjKy), UnitKy);

            return Json(listUnitMasEntry, JsonRequestBehavior.AllowGet);
        }

 
    }
}
