using BlueLotus.UI.ApiOperations;
using BlueLotus.UI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace BlueLotus.UI.Controllers
{
    public class AdminController : Controller
    {
        //
        // GET: /Admin/
         
        ApiOperation dbOpr = new ApiOperation();

        public static int UsrKy = 1;
        public static int cky = 1;
        public static string UsrNm;
        public static string cNm;

        public JsonResult ExtentServer()
        {
            if(HTNSession.UsrKy > 10)
            {
                return Json("SessionIn", JsonRequestBehavior.AllowGet);
            }
            else {
                return Json("SessionOut", JsonRequestBehavior.AllowGet);
            }
            //try
            //{
            //    int cky = HTNSession.CKy;
            //    int UsrKy = HTNSession.UsrKy;
            //    string Environment = HTNSession.Environment;

            //    return Json("SessionIn", JsonRequestBehavior.AllowGet);
            //}
            //catch
            //{
            //    HTNSession.User = null;
            //    HTNSession.Company = null;
            //    HTNSession.Environment = null;

            //    return Json("SessionOut", JsonRequestBehavior.AllowGet);
            //}
        }

        public JsonResult GetKy()
        {
            if (HTNSession.CKy > 10)
            {
                return Json(HTNSession.CKy, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(HTNSession.CKy, JsonRequestBehavior.AllowGet);
            }
        }
    }
}
