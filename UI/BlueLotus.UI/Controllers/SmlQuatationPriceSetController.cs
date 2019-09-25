using BlueLotus.ShowroomLog.Model.Entity;
using BlueLotus.UI.ApiOperations;
using BlueLotus.UI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace BlueLotus.UI.Controllers
{
    public class SmlQuatationPriceSetController : Controller
    {
        //
        // GET: /QuatationPriceSet/

        ApiOperation apiOpr = new ApiOperation();
        public ActionResult QuatationPriceSet  (string OurCd, string ObjCaptn, string ObjKy)
        {
            ViewBag.ObjCaptn = ObjCaptn;
            ViewBag.OurCd = OurCd;
            ViewBag.ObjKy = ObjKy;
            return View();
        }
        public JsonResult QuatationConFigSelect(string Date, string ModelKy,string objKy)
        {
            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;
            List<SMLQuatationPriSetModel> GetData = new List<SMLQuatationPriSetModel>();
            GetData = apiOpr.QuatationConFigSelect(Date, ModelKy, CKy, UsrKy,  objKy, HTNSession.Environment);
            return Json(GetData, JsonRequestBehavior.AllowGet);
        }

        public JsonResult InsertUpdateGridDetail(string newGridDetail, string updatedGridDetail, string objKy, string GrpCdKy, string EftvDt)
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            string ConCord = "TrnTyp";
            bool Key = apiOpr.InsertQouteConfigDetail(HTNSession.Environment, newGridDetail, updatedGridDetail, objKy, CKy, UsrKy,  GrpCdKy,  EftvDt);
            return Json(Key, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetExRate(string objKy, string EftvDt)
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            List<ExRateModel> Key = apiOpr.SMLGetExRate(HTNSession.Environment, objKy, EftvDt, CKy, UsrKy);
            return Json(Key, JsonRequestBehavior.AllowGet);
        }
        //InsertUpdateExRate rate
        public JsonResult InsertUpdate(string objKy, string EftvDt,string dolerVal,string poundVal)
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            bool Key = apiOpr.SMLInsertUpdateExRate(HTNSession.Environment, objKy, EftvDt, CKy, UsrKy, dolerVal, poundVal);
            return Json(Key, JsonRequestBehavior.AllowGet);
        }

        public JsonResult getFindForm(string FrmDt, string ToDt, string GrpCdKy, string ObjKy)
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            List<PrisetFndMode> Key = apiOpr.getFindForm(HTNSession.Environment, ObjKy, CKy, UsrKy,  FrmDt,  ToDt,  GrpCdKy );
            return Json(Key, JsonRequestBehavior.AllowGet);
        }
    }
}
