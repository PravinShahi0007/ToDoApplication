using BlueLotus.UI.ApiOperations;
using BlueLotus.UI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace BlueLotus.UI.Controllers
{
    public class ValidationController : Controller
    {
        //
        // GET: /Validation/

        ApiOperation apiOpr = new ApiOperation();

        public ActionResult Index()
        {
            return View();
        }

        public JsonResult AccCrLimit_Validate(
            int ObjKy, string CurVal, string EftvDt, int LocKy,
            int TrnTypKy, int BUKy, int PrjKy,
            int AdrKy, int AccKy)
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;

            bool list = apiOpr.AccCrLimit_Validate(
                HTNSession.Environment, CKy, UsrKy, ObjKy,
                CurVal, EftvDt, LocKy,
                TrnTypKy, BUKy, PrjKy,
                AdrKy, AccKy);

            return Json(list, JsonRequestBehavior.AllowGet);
        }

    }
}
