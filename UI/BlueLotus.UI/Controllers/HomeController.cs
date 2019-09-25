using BlueLotus.UI.ApiOperations;
using BlueLotus.UI.App_Start;
using BlueLotus.UI.Models;
using BlueLotus.ViewModel.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace BlueLotus.UI.Controllers
{
    public class HomeController : Controller
    {
        //
        // GET: /Home/

        ApiOperation dbOpr = new ApiOperation();
        
        //[RequireHttps]
        [AuthFilter(Roles.Administrator, Roles.HtnUser, Roles.BL7User)]


        public ActionResult GoToProjects(string OurCd, string OurCd2, string ObjKy, string ObjCaptn)
        {
            return RedirectToAction("Index", "ToDoProject", new { OurCd = OurCd, OurCd2 = OurCd2, ObjKy = ObjKy, ObjCaptn = ObjCaptn });
        }

        public ActionResult Home()
        {
            string user = HttpContext.Request.QueryString.Get("uid");
            //string cky = HttpContext.Request.QueryString.Get("cky");
            int cky = HTNSession.CKy;

            if (user != null || HTNSession.UsrKy != null)
                return View("_MenuPartial");
            else
                return RedirectToAction("Index", "Login");
        }

        public ActionResult GoToCodes(string OurCd, string OurCd2, string ObjKy, string ObjCaptn)
        {
            //return RedirectToAction("Index", "Codes");
            return RedirectToAction("Index", "Codes", new { OurCd = OurCd, OurCd2 = OurCd2, ObjKy = ObjKy, ObjCaptn = ObjCaptn });
        }

        public ActionResult GoToCodesTreeView(string OurCd, string OurCd2, string ObjKy, string ObjCaptn)
        {
            //return RedirectToAction("Index", "Codes");
            return RedirectToAction("GoToCodesTreeView", "Codes", new { OurCd = OurCd, OurCd2 = OurCd2, ObjKy = ObjKy, ObjCaptn = ObjCaptn });
        }
    }
}
