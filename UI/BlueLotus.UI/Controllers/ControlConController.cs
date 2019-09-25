using BlueLotus.UI.ApiOperations;
using BlueLotus.UI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace BlueLotus.UI.Controllers
{
    public class ControlConController : Controller
    {
        //
        // GET: /ControlCon/
        ApiOperation Operation = new ApiOperation();

        public ActionResult GetControlConKy(string TblNm, string OurCd)
        {
            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;
            long list = Operation.GetControlConKy(HTNSession.Environment, TblNm, OurCd, UsrKy, CKy);

            return Json(list, JsonRequestBehavior.AllowGet);

        }

    }
}
