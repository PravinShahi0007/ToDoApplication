using BlueLotus.UI.ApiOperations;
using BlueLotus.UI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace BlueLotus.UI.Controllers
{
    public class ResourcesController : Controller
    {
        ApiOperation apiOpr = new ApiOperation();
        public ActionResult ResourcesUsage(string OurCd, string ObjCaptn, string ObjKy)
        {
          
            ViewBag.ObjCaptn = ObjCaptn;
            ViewBag.OurCd = OurCd;
            ViewBag.ObjKy = ObjKy;
            return View();
        }
        public JsonResult DeleteResUse(string trnky)
        {
            int usrKy = HTNSession.UsrKy;
            string Environtname = HTNSession.Environment;
            bool result = apiOpr.DeleteResources(Convert.ToInt32(trnky), usrKy, Environtname);
            if (result == true)
            {
                return Json("Successfully Delete", JsonRequestBehavior.AllowGet);
            }
            return Json("Error while your Deleting");

        }

    }
}
