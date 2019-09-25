
using BlueLotus.TransactionModel.Entity;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Net.Sockets;
using System.Net;
using System.Web.Configuration;
using System.Drawing.Printing;
using BlueLotus.UI.ApiOperations;

namespace BlueLotus.UI.Controllers
{
    public class InvoiceController : Controller
    {
        ApiOperation apiOpr = new ApiOperation();

        //
        // GET: /Transaction/
        //

        public ActionResult DetailInvoice(string ObjCaptn, int ObjKy, string OurCd)
        {
            ViewBag.OurCd = OurCd;
            ViewBag.ObjKy = ObjKy;
            ViewBag.ObjCaptn = ObjCaptn;

            return RedirectToAction("DetailInvoice", "Transaction", new { OurCd = OurCd, ObjKy = ObjKy, ObjCaptn = ObjCaptn });
        }
    }
}
