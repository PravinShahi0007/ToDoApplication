using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using BlueLotus.UI.ApiOperations;

namespace BlueLotus.UI.Controllers
{
    public class EnterBillController : Controller
    {
        ApiOperation apiOperation = new ApiOperation();
        //
        // GET: /EnterBill/

        public ActionResult enterBill(string OurCd, string OurCd2, string ObjKy, string ObjCaptn)
        {
            ViewBag.OurCd2 = OurCd2;
            ViewBag.OurCd = OurCd;
            ViewBag.ObjKy = ObjKy;
            ViewBag.ObjCaptn = ObjCaptn;
            return View();
        }

    }
}
