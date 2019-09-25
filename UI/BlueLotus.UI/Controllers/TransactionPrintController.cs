using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace BlueLotus.UI.Controllers
{
    public class TransactionPrintController : Controller
    {
        //
        // GET: /TransactionPrint/

        public ActionResult Index()
        {
            return View();
        }

        public JsonResult PrintGRN(int OrdKy, string RptTitle)
        {
            if (OrdKy != null)
            {
                Session["OrdKyForDetailsInvoice"] = OrdKy;
            }
            Session["RptTitleForDetailsInvoice"] = RptTitle;

            return Json("Success", JsonRequestBehavior.AllowGet);
        }
    }
}
