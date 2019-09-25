using BlueLotus.HRModel.Entity;
using BlueLotus.UI.ApiOperations;
using BlueLotus.UI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace BlueLotus.UI.Controllers
{
    public class OTEntryController : Controller
    {
        ApiOperation apiOperation = new ApiOperation();
        //
        // GET: /OTEntry/

        public ActionResult OTEntry(string OurCd, string OurCd2, int ObjKy, string ObjCaptn)
        {
            ViewBag.OurCd = OurCd;
            ViewBag.OurCd2 = OurCd2;
            ViewBag.ObjKy = ObjKy;
            ViewBag.ObjCaptn = ObjCaptn;
            return View("OTEntry");
        }
        
              public JsonResult GetEmployee()
        {
            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;
            List<EmpDetails> Employee = new List<EmpDetails>();
            Employee = apiOperation.GetEmployee(CKy, UsrKy, HTNSession.Environment);
            return Json(Employee, JsonRequestBehavior.AllowGet);

        }

              public JsonResult OTDETEntry(string OTEntry)
              {
                  int UsrKy = HTNSession.UsrKy;
                  int CKy = HTNSession.CKy;
                  long key = apiOperation.OTDETEntry(OTEntry, UsrKy, CKy, HTNSession.Environment);
                  return Json(key, JsonRequestBehavior.AllowGet);
              }

              public JsonResult GetOTDetails(string EmpKy)
              {
                  int UsrKy = HTNSession.UsrKy;
                  int CKy = HTNSession.CKy;
                  List<EmpMasCdDtModel> OTList = new List<EmpMasCdDtModel>();
                  OTList = apiOperation.GetOTDetails(EmpKy, UsrKy, CKy, HTNSession.Environment);
                  return Json(OTList, JsonRequestBehavior.AllowGet);
              }

    }
}
