using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace BlueLotus.UI.Controllers
{
    public class WebReportsController : Controller
    {
        //
        // GET: /WebReports/

        public ActionResult BalanceSheet()
        {
            return RedirectToAction("BalanceSheet", "Accounts_Reports");
        }

    }
}
