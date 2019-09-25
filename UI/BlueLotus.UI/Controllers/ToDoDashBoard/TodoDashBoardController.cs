using Bluelotus.DashBoardModel;
using BlueLotus.UI.ApiOperations;
using BlueLotus.UI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace BlueLotus.UI.Controllers.ToDoDashBoard
{
    public class TodoDashBoardController : Controller
    {

        ApiOperation operation = new ApiOperation();
        // GET: TodoDashBoard
        public ActionResult Index(string OurCd, string ObjCaptn, string ObjKy)
        {
            ViewBag.ObjCaptn = ObjCaptn;
            ViewBag.OurCd = OurCd;
            ViewBag.ObjKy = 123105;
            return View();
        }
        public ActionResult PriorityDashBoard_SelectWeb(string PrjKy, string LeadAdrKy, string CurAdrKy, string ObjKy, string PrcsStpKy, string PrtyKy, string PrcsObjKy, string AprStsKy, string PrcsDetCat1Ky)
        {
            List<DashBoardModel> TodoList = new List<DashBoardModel>();
            int cky = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;

            TodoList = operation.PriorityDashBoard_SelectWeb(HTNSession.Environment, cky, UsrKy, Convert.ToInt32(PrjKy), Convert.ToInt32(LeadAdrKy), Convert.ToInt32(CurAdrKy), Convert.ToInt32(ObjKy), Convert.ToInt32(PrcsStpKy), Convert.ToInt32(PrtyKy), Convert.ToInt32(PrcsObjKy), Convert.ToInt32(AprStsKy), Convert.ToInt32(PrcsDetCat1Ky));
            return Json(TodoList, JsonRequestBehavior.AllowGet);
        }

        public ActionResult GetTaskPriority(string PrjKy, string LeadAdrKy, string CurAdrKy, string ObjKy, string PrcsStpKy, string PrtyKy, string PrcsObjKy, string AprStsKy, string PrcsDetCat1Ky,string categoryName)
        {
            List<DashBoardModel> TodoList = new List<DashBoardModel>();
            int cky = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;

            TodoList = operation.PriorityDashBoard_SelectWeb(HTNSession.Environment, cky, UsrKy, Convert.ToInt32(PrjKy), Convert.ToInt32(LeadAdrKy), Convert.ToInt32(CurAdrKy), Convert.ToInt32(ObjKy), Convert.ToInt32(PrcsStpKy), Convert.ToInt32(PrtyKy), Convert.ToInt32(PrcsObjKy), Convert.ToInt32(AprStsKy), Convert.ToInt32(PrcsDetCat1Ky));
            //var dsdffg = TodoList.Where(c => c.Status.Equals(categoryName, StringComparison.InvariantCultureIgnoreCase));
            //var sfsd = dsdffg.SelectMany(x => x.dailyToDos);
            var Dataset = TodoList.Where(c => c.Status.Equals(categoryName, StringComparison.InvariantCultureIgnoreCase)).SelectMany(y => y.dailyToDos).ToList();
            return Json(Dataset, JsonRequestBehavior.AllowGet);
        }

        public ActionResult StatusDashBoard(string PrjKy, string LeadAdrKy, string CurAdrKy, string ObjKy, string PrcsStpKy, string PrtyKy, string PrcsObjKy, string AprStsKy, string PrcsDetCat1Ky)
        {
            List<DashBoardModel> TodoList = new List<DashBoardModel>();
            int cky = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;

            TodoList = operation.StatusDashBoard(HTNSession.Environment, cky, UsrKy, Convert.ToInt32(PrjKy), Convert.ToInt32(LeadAdrKy), Convert.ToInt32(CurAdrKy), Convert.ToInt32(ObjKy), Convert.ToInt32(PrcsStpKy), Convert.ToInt32(PrtyKy), Convert.ToInt32(PrcsObjKy), Convert.ToInt32(AprStsKy), Convert.ToInt32(PrcsDetCat1Ky));
            return Json(TodoList, JsonRequestBehavior.AllowGet);
        }

        public ActionResult PendingDashBoard(string PrjKy, string LeadAdrKy, string CurAdrKy, string ObjKy, string PrcsStpKy, string PrtyKy, string PrcsObjKy, string AprStsKy, string PrcsDetCat1Ky)
        {
            List<DashBoardModel> TodoList = new List<DashBoardModel>();
            int cky = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;

            TodoList = operation.PendingGraph(HTNSession.Environment, cky, UsrKy, Convert.ToInt32(PrjKy), Convert.ToInt32(LeadAdrKy), Convert.ToInt32(CurAdrKy), Convert.ToInt32(ObjKy), Convert.ToInt32(PrcsStpKy), Convert.ToInt32(PrtyKy), Convert.ToInt32(PrcsObjKy), Convert.ToInt32(AprStsKy), Convert.ToInt32(PrcsDetCat1Ky));
            return Json(TodoList, JsonRequestBehavior.AllowGet);
        }
    }
}