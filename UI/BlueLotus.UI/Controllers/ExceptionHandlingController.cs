using BlueLotus.UI.ApiOperations;
using BlueLotus.UI.Models;
using System;
using System.Collections.Generic;
using System.Web.Mvc;

namespace BlueLotus.UI.Controllers
{
    public class ExceptionHandlingController : Controller
    {
        //
        // GET: /ExceptionHandling/
        ApiOperation apiOpr = new ApiOperation();
        
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult IntegrirityCheck_IC_Select()
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            List<Object> list = apiOpr.IntegrirityCheck_IC_Select(HTNSession.Environment, CKy, UsrKy);

            return Json(list, JsonRequestBehavior.AllowGet); 
        }

    }
}
