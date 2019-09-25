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
    public class ItmPrflSelectController : Controller
    {
        //
        // GET: /ItmPrflSelect/

        ApiOperation apiOpr = new ApiOperation();

        public ActionResult Index()
        {
            return View();
        }

        public JsonResult ItmPrfl_Category_SS_WebColDetMulti(
            string Category,
            string Dt,
            string FormObjKy,
            string ItmTypKy,
            string TrnTypKy,
            string PrjKy,
            string Dept
            )
        {
            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;

            List<List<Object>> list = new List<List<Object>>();

            list = apiOpr.ItmPrfl_Category_SS_WebColDetMulti(
                HTNSession.Environment,
                CKy,
                UsrKy,
                Category,
                Dt,
                FormObjKy,
                ItmTypKy,
                TrnTypKy,
                PrjKy,
                Dept
                );

            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult ItmPrfl_Category_SS_WebMulti(
            string Category,
            string Dt,
            string FormObjKy,
            string ItmTypKy,
            string TrnTypKy,
            string PrjKy,
            string Dept
            )
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            List<List<Object>> list = apiOpr.ItmPrfl_Category_SS_WebMulti(
                HTNSession.Environment,
                CKy,
                UsrKy,
                Category,
                Dt,
                FormObjKy,
                ItmTypKy,
                TrnTypKy,
                PrjKy,
                Dept
                );

            return Json(list, JsonRequestBehavior.AllowGet);
        }
    
    }
}
