using BlueLotus.UI.Models;
using BlueLotus.UI.ApiOperations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using BlueLotus.HRModel.Entity;

namespace BlueLotus.UI.Controllers
{
    public class LeaveEntitleController : Controller
    {
        //
        // GET: /LeaveEntitle/
        ApiOperation apiOperation = new ApiOperation();
        public ActionResult LeaveEntitle(string OurCd, string OurCd2, int ObjKy, string ObjCaptn)
        {
            ViewBag.OurCd = OurCd;
            ViewBag.OurCd2 = OurCd2;
            ViewBag.ObjKy = ObjKy;
            ViewBag.ObjCaptn = ObjCaptn;
            return View("LeaveEntitle");
        }
        public JsonResult LeaveDETEntry(string LeaveEnt, string OurCd)
        {
            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;

            long key = apiOperation.LeaveDETEntry(LeaveEnt, UsrKy, CKy, OurCd, HTNSession.Environment);
            return Json(key, JsonRequestBehavior.AllowGet);
        }

        public JsonResult checkleave(string EmpNo, string EmpKy, string FromD, string LeaveType, string CdKy)
        {
         
            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;

            long key = apiOperation.checkleave( EmpNo,  EmpKy,  FromD,  LeaveType,  CdKy, UsrKy, CKy, HTNSession.Environment);
            return Json(key, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetLeaveDetails(string EmpKy)
              {
                  int UsrKy = HTNSession.UsrKy;
                  int CKy = HTNSession.CKy;
                  List<EmpDetails> LeaveList = new List<EmpDetails>();
                  LeaveList = apiOperation.GetLeaveDetails(EmpKy, UsrKy, CKy, HTNSession.Environment);
                  return Json(LeaveList, JsonRequestBehavior.AllowGet);
              }
        public JsonResult LevTrn_SelectWeb(string EmpKy, string OurCd)
        {
            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;
            List<LevTrnModel> LeaveList = new List<LevTrnModel>();
            LeaveList = apiOperation.LevTrn_SelectWeb(EmpKy, UsrKy, CKy, OurCd, HTNSession.Environment);
            return Json(LeaveList, JsonRequestBehavior.AllowGet);
        }
        public JsonResult LeaveBal_SelectWeb(string EmpKy)
        {
            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;
            List<LeaveBal> LeaveList = new List<LeaveBal>();
            LeaveList = apiOperation.LeaveBal_SelectWeb(EmpKy, UsrKy, CKy, HTNSession.Environment);
            return Json(LeaveList, JsonRequestBehavior.AllowGet);
        }

    }
}
