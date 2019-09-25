using BlueLotus.UI.ApiOperations;
using BlueLotus.UI.Models;
using BlueLotus.ViewModel.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace BlueLotus.UI.Controllers
{
    public class CompanyMenuController : Controller
    {
        ApiOperation Operation = new ApiOperation();

        //
        // GET: /CompanyMenu/

        public ActionResult Index(string OurCd, string OurCd2, string ObjKy, string ObjCaptn)
        {
            ViewBag.OurCd2 = OurCd2;
            ViewBag.ObjKy = ObjKy;
            ViewBag.ObjCaptn = ObjCaptn;
            ViewBag.OurCd = OurCd;

            return View();
        }

        public JsonResult GetCompanyMenuUsrObj_SelectWeb(int CKy)
        {
            int UsrKy = HTNSession.UsrKy;
            List<CompanyMenu> list = new List<CompanyMenu>();
            list = Operation.GetCompanyMenuUsrObj_SelectWeb(HTNSession.Environment, UsrKy, CKy);

            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public ActionResult UsrObj_InsertUpdateWeb(string updateGrid, string newGrid, int CKy)
        {
            int UsrKy = HTNSession.UsrKy;

            var process = Operation.UsrObj_InsertUpdateWeb(HTNSession.Environment, updateGrid, newGrid, CKy, UsrKy);

            return Json(process, JsonRequestBehavior.AllowGet);
        }

    }
}
