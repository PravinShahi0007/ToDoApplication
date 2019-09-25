using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace BlueLotus.UI.Controllers
{

    /// <summary>
    ///  Base Controller for all controlles in the system.
    ///  This will handle all common functions required by controllers.
    /// </summary>
    public class BaseController : Controller
    {
        //
        // GET: /Base/

        private ActionResult Index()
        {
            return View();
        }

    }
}
