

using BlueLotus.dailytodo.Entityy;
using BlueLotus.UI.ApiOperations;
using BlueLotus.UI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace BlueLotus.UI.Controllers
{
    public class DailyToDoController : Controller
    {
        //
        // GET: /DailyToDo/

        ApiOperation operation = new ApiOperation();

        public ActionResult DailyToDo(string OurCd, string OurCd2, string ObjKy, string ObjCaptn)
        {
            ViewBag.OurCd2 = OurCd2;
            ViewBag.OurCd = OurCd;
            ViewBag.ObjKy = 123105;
            ViewBag.ObjCaptn = ObjCaptn;
            return View("DailyToDo");
        }

        //new field added
        public ActionResult ToDoPrcsDet_SelectWeb(string PrjKy, string LeadAdrKy, string CurAdrKy, string ObjKy,string PrcsStpKy,string PrtyKy, string PrcsObjKy, string AprStsKy, string PrcsDetCat1Ky)
        {
            List<DailyToDoModel> TodoList = new List<DailyToDoModel>();
            int cky = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;


            TodoList = operation.ToDoPrcsDet_SelectWeb(HTNSession.Environment, cky, UsrKy,Convert.ToInt32(PrjKy),Convert.ToInt32(LeadAdrKy), Convert.ToInt32(CurAdrKy), Convert.ToInt32(ObjKy),Convert.ToInt32(PrcsStpKy),Convert.ToInt32(PrtyKy), Convert.ToInt32(PrcsObjKy), Convert.ToInt32(AprStsKy), Convert.ToInt32(PrcsDetCat1Ky));
            return Json(TodoList, JsonRequestBehavior.AllowGet);
        }

        //read all child record
        public ActionResult PrcsDetPrnt_SelectWeb(string PrjKy, string LeadAdrKy, string CurAdrKy, string ObjKy, string PrcsStpKy, string PrtyKy, int PrntPrcsDetKy)
        {
            List<DailyToDoModel> TodoList = new List<DailyToDoModel>();
            int cky = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;

            TodoList = operation.PrcsDetPrnt_SelectWeb(HTNSession.Environment, cky, UsrKy, Convert.ToInt32(PrjKy), Convert.ToInt32(LeadAdrKy), Convert.ToInt32(CurAdrKy), Convert.ToInt32(ObjKy), Convert.ToInt32(PrcsStpKy), Convert.ToInt32(PrtyKy), Convert.ToInt32(PrntPrcsDetKy));
            return Json(TodoList, JsonRequestBehavior.AllowGet);
        }



        public JsonResult ToDoPrcsDet_InsertWeb(string DlyToDoupdate, string DlyToDo, int ObjKy)
        {
            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;
            string EnvironmentName = HTNSession.Environment;
            bool list = operation.ToDoPrcsDet_InsertWeb(CKy, UsrKy, DlyToDoupdate, DlyToDo, ObjKy, EnvironmentName);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult ToDoPrcsDet_GetTaskID(int ObjKy, int PrjKy)
        {
            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;
            string EnvironmentName = HTNSession.Environment;
            string docNo = operation.ToDoPrcsDet_GetTaskID(CKy, ObjKy, UsrKy, PrjKy, EnvironmentName);
            return Json(docNo, JsonRequestBehavior.AllowGet);
        }

    }
}
