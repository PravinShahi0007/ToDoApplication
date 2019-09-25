using BlueLotus.ItmMas.Model.Contract;
using BlueLotus.UI.ApiOperations;
using BlueLotus.UI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace BlueLotus.UI.Controllers
{
    public class ItmMasSelectController : Controller
    {
        //
        // GET: /ItmMasSelect/

        ApiOperation apiOpr = new ApiOperation();

        public ActionResult Index()
        {
            return View();
        }

        public JsonResult ItmMas_ItmNm_SS_WebColDetMulti(
            string ItmNm,
            string Dt,
            string FormObjKy,
            string ItmTypKy,
            string TrnTypKy,
            string PrjKy,
            string LocKy,
            string ConCd,
            string OurCd
            )
        {
            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;

            List<List<Object>> list = new List<List<Object>>();

            list = apiOpr.ItmMas_ItmNm_SS_WebColDetMulti(
                HTNSession.Environment,
                CKy,
                UsrKy,
                ItmNm,
                Dt,
                FormObjKy,
                ItmTypKy,
                TrnTypKy,
                PrjKy,
                LocKy,
             ConCd,
             OurCd
                );

            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult ItmMas_ItmNm_SS_WebMulti(
            string ItmNm,
            string Dt,
            string FormObjKy,
            string ItmTypKy,
            string TrnTypKy,
            string PrjKy,
            string LocKy,
            string ConCd,
            string OurCd
            )
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            List<List<Object>> list = apiOpr.ItmMas_ItmNm_SS_WebMulti(
                HTNSession.Environment,
                CKy,
                UsrKy,
                ItmNm,
                Dt,
                FormObjKy,
                ItmTypKy,
                TrnTypKy,
                PrjKy,
                LocKy,
             ConCd,
             OurCd
                );

            return Json(list, JsonRequestBehavior.AllowGet);
        }
    }
}
