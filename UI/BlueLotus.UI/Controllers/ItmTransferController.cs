
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
    public class ItmTransferController : Controller
    {
        ApiOperation apiOpr = new ApiOperation();

        //
        // GET: /Transaction/

        public ActionResult GRN(string ObjCaptn, int ObjKy, string OurCd, string OurCd2)
        {
            ViewBag.OurCd = OurCd;
            ViewBag.ObjKy = ObjKy;
            Session["ObjCaptn"] = ObjCaptn;

            return RedirectToAction("DetailInvoice", "Transaction", new { OurCd = OurCd, OurCd2 = OurCd2, ObjKy = ObjKy, ObjCaptn = ObjCaptn });
        }

        public ActionResult ItmTranfer(string OurCd, int ObjKy, string ObjCaptn, string OurCd2)
        {
            ViewBag.OurCd = OurCd;
            ViewBag.ObjKy = ObjKy;
            ViewBag.ObjCaptn = ObjCaptn;

            return RedirectToAction("ItmTranfer", "Transaction", new { OurCd = OurCd, OurCd2 = OurCd2, ObjKy = ObjKy, ObjCaptn = ObjCaptn });
        }

        public ActionResult PurchaseOrder(string OurCd, int ObjKy, string ObjCaptn, string OurCd2,int IniTrnKy = 1)
        {
            ViewBag.MyString = OurCd;
            ViewBag.ObjKy = ObjKy;
            ViewBag.ObjCaptn = ObjCaptn;

            return RedirectToAction("PurchaseOrder", "Order", new { OurCd = OurCd, OurCd2 = OurCd2, ObjKy = ObjKy, ObjCaptn = ObjCaptn, IniTrnKy= IniTrnKy });
        }

    }
}
