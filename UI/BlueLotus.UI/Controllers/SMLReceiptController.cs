using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace BlueLotus.UI.Controllers
{
    public class SMLReceiptController : Controller
    {
        //
        // GET: /SMLReceipt/

        public ActionResult SMLRecpt(string OurCd, string ObjCaptn, string ObjKy)
        {
            ViewBag.ObjCaptn = ObjCaptn;
            ViewBag.OurCd = OurCd;
            ViewBag.ObjKy = ObjKy;
            ViewBag.Time = RetrnDate();
            ViewBag.Date = RetrnnTime();
            return View();
        }
        public string RetrnDate() {
            return DateTime.Now.ToString("HH:mm");
        }
        public string RetrnnTime()
        {
            DateTime dateTime = DateTime.UtcNow.Date;           
            return dateTime.ToString("dd/MM/yyyy").Replace('-', '/');

        }
    }
}
