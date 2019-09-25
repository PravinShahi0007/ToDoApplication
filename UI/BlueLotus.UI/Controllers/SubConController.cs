using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using BlueLotus.UI.ApiOperations;
using BlueLotus.UI.Models;
using BlueLotus.SubContract.Model;

namespace BlueLotus.UI.Controllers
{
    public class SubConController : Controller
    {
        //
        // GET: /SubCon/
        private readonly ApiOperation apiOpr = new ApiOperation();

        public ActionResult SubCon(string OurCd, string ObjCaptn, string ObjKy)
        {
            ViewBag.ObjCaptn = ObjCaptn;
            ViewBag.OurCd = OurCd;
            ViewBag.ObjKy = ObjKy;
            return View();
        }

        public JsonResult SubConGrdLoad(string TrnTypKy, string Trnky, string AccKy, string PrjKy, string ObjKy,
            string adrKy,string Dt)
        {
            var UsrKy = HTNSession.UsrKy;
            var CKy = HTNSession.CKy;
            var GridData = new List<SubContractBill>();
            GridData = apiOpr.SubConGrdLoad(HTNSession.Environment, CKy, UsrKy, TrnTypKy, Trnky, AccKy, PrjKy,
                ObjKy, adrKy, Dt);
            return Json(GridData, JsonRequestBehavior.AllowGet);
        }

        public JsonResult SaveSubCon(string TrnTypKy, string ObjKy, string DataJasonString, string TrnDt, string DocNo, string trnKy,string adrKy,string Accky)
        {
            var UsrKy = HTNSession.UsrKy;
            var CKy = HTNSession.CKy;
            var Retult = apiOpr.SaveSubCon(HTNSession.Environment, CKy, UsrKy, TrnTypKy, DataJasonString, ObjKy, TrnDt,
                DocNo, trnKy, adrKy, Accky);
            return Json(Retult, JsonRequestBehavior.AllowGet);
        }

        public JsonResult SubConDoubleEntry(string ObjKy, string trnKy)
        {
            var UsrKy = HTNSession.UsrKy;
            var CKy = HTNSession.CKy;
            var DblEntryData = new List<SubContractBill>();
            DblEntryData = apiOpr.SubConDoubleEntry(HTNSession.Environment, CKy, UsrKy, trnKy, ObjKy);
            return Json(DblEntryData, JsonRequestBehavior.AllowGet);
        }
    }
}
