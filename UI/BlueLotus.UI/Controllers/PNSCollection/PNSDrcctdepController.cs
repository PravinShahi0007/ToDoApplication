using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace BlueLotus.UI.Controllers.PNSCollection
{
    public class PNSDrcctdepController : Controller
    {

        //
        // GET: /PNSDrcctdep/
        //

        public ActionResult DerectDeposit(string OurCd, string ObjCaptn, int ObjKy)
        {
            ViewBag.ObjKy = ObjKy;
            ViewBag.MyPmtcd = OurCd;
            ViewBag.ObjCaptn = ObjCaptn;
            ViewBag.OurCd = OurCd;

            return View();
        }

    }
}
