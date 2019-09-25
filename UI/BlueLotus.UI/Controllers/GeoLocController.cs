using BlueLotus.GeoLocation.Model.Entity;
using BlueLotus.UI.ApiOperations;
using BlueLotus.UI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace BlueLotus.UI.Controllers
{
    public class GeoLocController : Controller
    {
        ApiOperation apiOpr = new ApiOperation();
        //
        // GET: /GeoLoc/

        public ActionResult Index()
        {
            return View("GeoLocation");
        }
        public JsonResult GetGeoUsr()
        {
            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;
            string Env = HTNSession.Environment;
            List<GeoLocModel> list = new List<GeoLocModel>();
            list = apiOpr.GetGeoUsr(UsrKy, CKy, Env);
            return Json(list, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetGeoCoordinates(string GeoUsr, string FrmDt,string ToDt)
        {
            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;
            string Env = HTNSession.Environment;
            List<GeoLocModel> list = new List<GeoLocModel>();
            list = apiOpr.GetGeoCoordinates(UsrKy, CKy, Env, GeoUsr, FrmDt, ToDt);
            return Json(list, JsonRequestBehavior.AllowGet);
        } 

    }
}
