using BlueLotus.UI.ApiOperations;
using BlueLotus.UI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace BlueLotus.UI.Controllers
{
    public class PayrollController : Controller
    {
        ApiOperation ApiOperation = new ApiOperation();
        //
        // GET: /Payroll/

        public ActionResult Index(string OurCd, string OurCd2, string ObjKy, string ObjCaptn)
        {
            ViewBag.OurCd2 = OurCd2;
            ViewBag.OurCd = OurCd;
            ViewBag.ObjKy = ObjKy;
            ViewBag.ObjCaptn = ObjCaptn;
            ViewBag.ItmTyp = OurCd;

            return View("Index");
            
        }

        public JsonResult SalaryProcess(int EmpKy, int SalGrpKy, int SalTypKy, string Date)
        {
            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;
            string Environment = HTNSession.Environment;
            bool Key = ApiOperation.SalaryProcess(Environment, EmpKy, SalGrpKy, SalTypKy, Date, UsrKy, CKy);
            return Json(Key, JsonRequestBehavior.AllowGet);
        }
    }
}
