using BlueLotus.POSDashBoard.Model.Entity;
using BlueLotus.UI.ApiOperations;
using BlueLotus.UI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace BlueLotus.UI.Controllers.POSDashBoard
{
    public class PODashboardController : Controller
    {
        // GET: PODashboard
        ApiOperation apiOpr = new ApiOperation();
       public List<PODash> list = new List<PODash>();

        public ActionResult PODash(string OurCd, string OurCd2, int ObjKy, string ObjCaptn)
        {
            ViewBag.OurCd = OurCd;
            ViewBag.OurCd2 = OurCd2;
            ViewBag.ObjKy = ObjKy;
            ViewBag.ObjCaptn = ObjCaptn;
            return View("PODash");
        }

        public JsonResult GetDetails()
        {
            list = apiOpr.PoDashBoardList(HTNSession.CKy, HTNSession.Environment);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult SearchDetails(string SearchString)
        {
            list = apiOpr.PoDashBoardList(HTNSession.CKy, HTNSession.Environment);
            List<PODash> lst= list.Where(o => (o.PRJNM != null && o.PRJNM.ToLower().Contains(SearchString.ToLower()))).ToList();
            return Json(lst, JsonRequestBehavior.AllowGet);
        }
    }
}