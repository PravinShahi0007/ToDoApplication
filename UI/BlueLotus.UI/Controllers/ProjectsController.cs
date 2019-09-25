using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace BlueLotus.UI.Controllers
{
    public class ProjectsController : Controller
    {
        //
        // GET: /Projects/

        public ActionResult AccLedPrevw(string ObjCaptn, int ObjKy)
        {
            return RedirectToAction("AccountsReportsIndex", "Accounts_Reports", new { ObjCaptn = ObjCaptn, ObjKy = ObjKy });
        }

    }
}
