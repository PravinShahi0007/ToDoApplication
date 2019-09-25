using BlueLotus.UI.ApiOperations;
using BlueLotus.UI.Models;
using BlueLotus.ViewModel.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace BlueLotus.UI.Controllers
{
     

    public class SystemUsersController : Controller
    {
        ApiOperation service = new ApiOperation();

        public static int UsrKy = 1;
        public static int cky = 1;
        public static string UsrNm;
        public static string cNm;

        //
        // GET: /SystemUsers/

        public ActionResult Index()
        {
            return View();
        }


        public ActionResult System_Users(string OurCd, string OurCd2, string ObjKy, string ObjCaptn)
        {
            ViewBag.ObjKy = ObjKy;
            ViewBag.ObjCaptn = ObjCaptn;
            ViewBag.OurCd = OurCd;
            return View("System_Users");
        }



        public ActionResult System_Users_Previlages()
        {
            return View("System_Users_Previlages");
        }


        public JsonResult GetUsersDetails()
        {
            int Cky = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            List<GetUserControllersModel> list = new List<GetUserControllersModel>();
            list = service.GetUsersDetails(HTNSession.Environment, Cky, UsrKy);
            return Json(list, JsonRequestBehavior.AllowGet);

        }

        public JsonResult GetPrevilageDetails(long UsrKy)
        {
            int Cky = HTNSession.CKy;
            List<GetUserControllersModel> list = new List<GetUserControllersModel>();
            list = service.GetPrevilageDetails(HTNSession.Environment, Cky, UsrKy);
            return Json(list, JsonRequestBehavior.AllowGet);

        }


        public JsonResult UpdateUserPrevilages(string updatedOrders, string newOrders)
        {
            int Cky = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            bool Msg = service.UpdateUserPrevilages(HTNSession.Environment, UsrKy, Cky, updatedOrders);
            return Json(Msg, JsonRequestBehavior.AllowGet);

        }

        public JsonResult MultiAproval_InsertUpdate(string SerNoListString)
        {
            int cky = HTNSession.CKy;
             int usrKy = HTNSession.UsrKy;
            bool result = service.MultiAproval_InsertUpdate(HTNSession.Environment, cky,SerNoListString ,usrKy);
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        public JsonResult UpdateUser(string UsrKy, string UsrId, string LoginUsrID, string isAct, string BUKy)
        {

            bool UpdateStatus = service.UpdateUser(HTNSession.Environment, UsrKy, UsrId, LoginUsrID, isAct, BUKy);
            return Json(UpdateStatus, JsonRequestBehavior.AllowGet);

        }


        public JsonResult Load_BU()
        {
            int cky = 11;
            int UsrKy = HTNSession.UsrKy;
            //HTNSession.CKy;
            List<GetUserControllersModel> list = new List<GetUserControllersModel>();
            list = service.Load_BU(HTNSession.Environment, UsrKy, cky);
            return Json(list, JsonRequestBehavior.AllowGet);
        }


        public ActionResult UpdateToDo(List<UsrObjPermissionModel> todos)
        {
            bool result = false;
            int UsrKy = HTNSession.UsrKy;
            //service = new ToDoService();
            result = service.UpdateToDo(HTNSession.Environment, UsrKy, todos);
            //if (todos != null)
            //{
            //    foreach (ToDoModel model in todos)
            //    {
            //        result = dbOpr.UpdateToDo(model);
            //    }
            //}
            return Json(result, JsonRequestBehavior.AllowGet);
        }


        public JsonResult InsertToDo(string updatedOrders, string newOrders, string TotwrkHrs)
        {
            bool result = false;
            int UsrKy = HTNSession.UsrKy;
            string aprusernm = Session["UserName"].ToString();
            int cky = HTNSession.CKy;
            string concd = "OthTrnTyp";
            string ourCd = "PRJSCH";
            //dbOpr = new ToDoService();
            result = service.InsertToDo(HTNSession.Environment, updatedOrders, newOrders, concd, ourCd, cky, UsrKy, TotwrkHrs);
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        public ActionResult CopyUserObjPermission(int FrmUsrKy, int ToUsrKy)
        {
            bool result = false;
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;

            result = service.CopyUserObjPermission(HTNSession.Environment, UsrKy, CKy, FrmUsrKy, ToUsrKy);
            
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        public JsonResult UsrMasAcsLvl_SelectWeb(int AcsLvlUsrKy)
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            List<AccessLevel> list = new List<AccessLevel>();
            list = service.UsrMasAcsLvl_SelectWeb(HTNSession.Environment, UsrKy, CKy, AcsLvlUsrKy);

            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public ActionResult UsrMasAcsLvl_InsertUpdateWeb(string updateGrid, string newGrid, int AcsLvlUsrKy)
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            bool res = false;
            res = service.UsrMasAcsLvl_InsertUpdateWeb(HTNSession.Environment, CKy, UsrKy, updateGrid, newGrid, AcsLvlUsrKy);

            return Json(res, JsonRequestBehavior.AllowGet);
        }

        public JsonResult SelectMultiApproval(string OurCd, string ObjKy ,long usrky)
        {
            int Cky = HTNSession.CKy;
            int EusrKy = HTNSession.UsrKy;
            List<MultiApprovelModel> list = new List<MultiApprovelModel>();
            list = service.SelectMultiApproval(HTNSession.Environment, Cky, usrky, OurCd, ObjKy, EusrKy);
            return Json(list, JsonRequestBehavior.AllowGet);

        }
    }
}
