using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace BlueLotus.UI.Controllers
{
    public class SmlVehicleDelivaryController : Controller
    {
        //
        // GET: /SmlVehicleDilivary/

        public ActionResult VehlcDlvry(string OurCd, string ObjCaptn, string ObjKy)
        {
           
            ViewBag.ObjCaptn = ObjCaptn;
            ViewBag.OurCd = OurCd;
            ViewBag.ObjKy = ObjKy;
            return View();
        }

    }
}
