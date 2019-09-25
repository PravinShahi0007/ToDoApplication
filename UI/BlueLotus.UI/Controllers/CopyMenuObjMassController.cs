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
    public class CopyMenuObjMassController : Controller
    {
        ApiOperation apiOpr = new ApiOperation();
        public ActionResult MenuObjMas(string OurCd, string OurCd2, string ObjKy, string ObjCaptn)
        {
            ViewBag.OurCd2 = OurCd2;
            ViewBag.OurCd = OurCd;
            ViewBag.ObjKy = ObjKy;
            ViewBag.ObjCaptn = ObjCaptn;
            return View("MenuObjMas");
        }
        public JsonResult GetCompanylist()
        {
            int UsrKy =  HTNSession.UsrKy;
            string Environment = HTNSession.Environment;
            List<Company> list = new List<Company>();
            list = apiOpr.Company_Selectweb(UsrKy, Environment);
            return Json(list, JsonRequestBehavior.AllowGet);

        }
        public JsonResult GetUserlist(int CKy)
        {
            int UsrKy = HTNSession.UsrKy;
            string Environment = HTNSession.Environment;
            List<User> list = new List<User>();
            list = apiOpr.UserList(CKy, UsrKy, Environment);
            return Json(list, JsonRequestBehavior.AllowGet);
        }
    }
}