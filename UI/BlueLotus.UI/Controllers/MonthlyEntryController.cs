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
    public class MonthlyEntryController : Controller
    {
        ApiOperation apiOperation = new ApiOperation();
        //
        // GET: /MonthlyEntry/

        public ActionResult MonthlyEntry(string OurCd, string OurCd2, int ObjKy, string ObjCaptn)
        {
            ViewBag.OurCd = OurCd;
            ViewBag.OurCd2 = OurCd2;
            ViewBag.ObjKy = ObjKy;
            ViewBag.ObjCaptn = ObjCaptn;
            return View("MonthlyEntry");
        }

        public JsonResult SaveAddDed(string newRecordsGridMonthlyAdditionEntry, string newRecordsGridMonthlyDeductionEntry)
               {
                  int UsrKy = HTNSession.UsrKy;
                  int CKy = HTNSession.CKy;
                 
                  long key = apiOperation.SaveAddDed(newRecordsGridMonthlyAdditionEntry, newRecordsGridMonthlyDeductionEntry, UsrKy, CKy, HTNSession.Environment);
                  return Json(key, JsonRequestBehavior.AllowGet);
              }

        public JsonResult GetAddDedDetails(string EmpKy, string EntryDate)
        {

            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;
            List<HRAlwModel> AddDedList = new List<HRAlwModel>();
            AddDedList = apiOperation.GetAddDedDetails(EmpKy, EntryDate, UsrKy, CKy, HTNSession.Environment);
            return Json(AddDedList, JsonRequestBehavior.AllowGet);
              }
    }
}
