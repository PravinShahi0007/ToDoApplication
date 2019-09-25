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
    public class EVMController : Controller
    {
        //
        // GET: /EVM/
        ApiOperation apiOpr = new ApiOperation();
        public ActionResult EVMDashBoard(string OurCd, string OurCd2, int ObjKy, string ObjCaptn)
        {
            ViewBag.OurCd = OurCd;
            ViewBag.OurCd2 = OurCd2;
            ViewBag.ObjKy = ObjKy;
            ViewBag.ObjCaptn = ObjCaptn;
            return View("EVMDashBoard");
        }

        public JsonResult EVMDash(int Objky, int PrjKy)
        {
            if (PrjKy <= 0)
                PrjKy = 1;
            List <EVMDashboard> evm = new List<EVMDashboard>();
            evm = apiOpr.EVMDashBoard(Objky, PrjKy, HTNSession.UsrKy, HTNSession.CKy, HTNSession.Environment);
            return Json(evm, JsonRequestBehavior.AllowGet);
        }

    }
}
