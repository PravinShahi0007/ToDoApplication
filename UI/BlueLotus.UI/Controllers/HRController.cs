


using BlueLotus.HRIS.Model.Entity;
using BlueLotus.UI.ApiOperations;
using BlueLotus.UI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace BlueLotus.UI.Controllers
{
    public class HRController : Controller
    {
        //
        // GET: /HR/

        ApiOperation apiOpr = new ApiOperation();
        
               public JsonResult HRFind()
        {
      
            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;
            List<EmpMasModel> GenderDrop = new List<EmpMasModel>();
            GenderDrop = apiOpr.GetEmpDet(HTNSession.Environment, UsrKy, CKy);

            return Json(GenderDrop, JsonRequestBehavior.AllowGet);
        }

    }
}
