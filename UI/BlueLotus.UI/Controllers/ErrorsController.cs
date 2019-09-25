using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace BlueLotus.UI.Controllers
{
    public class ErrorsController : Controller
    {   //
        // GET: /Errors/

        public ActionResult Index()
        {
            return View();
        }

        public ActionResult General(Exception exception)
        {
            return View("Http404");
            //var Data = new
            //{
            //    // obviously here you could include whatever information you want about the exception
            //    // for example if you have some custom exceptions you could test
            //    // the type of the actual exception and extract additional data
            //    // For the sake of simplicity let's suppose that we want to
            //    // send only the exception message to the client
            //    errorMessage = exception.Message.ToString()
            //};
            //return Json(Data, JsonRequestBehavior.AllowGet);
            //return Content("General failure", "text/plain");
        }

        public ActionResult Http404()
        {
           return View();
         // return Content("Not found", "text/plain");
        }

        public ActionResult Http403()
        {
            return Content("Forbidden", "text/plain");
        }

        public ActionResult InternalError()
        {
            return View();
        }

        public ActionResult UnAuthorised()
        {
            return View();
        }
    }
}
