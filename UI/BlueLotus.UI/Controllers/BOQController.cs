using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using BlueLotus.UI.ApiOperations;
using BlueLotus.BOQ.Model.Entity;

namespace BlueLotus.UI.Controllers
{
    public class BOQController : Controller
    {
        //
        // GET: /Order/
        ApiOperation apiOpr = new ApiOperation();
        
        public ActionResult BOQ(string OurCd, string OurCd2, int ObjKy, string ObjCaptn)
        {
            ViewBag.OurCd = OurCd;
            ViewBag.OurCd2 = OurCd2;
            ViewBag.ObjKy = ObjKy;
            ViewBag.ObjCaptn = ObjCaptn;

            return View("BOQ");
        }
    }
}
