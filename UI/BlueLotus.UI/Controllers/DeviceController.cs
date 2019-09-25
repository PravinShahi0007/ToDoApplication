
using BlueLotus.Device.Model.Entity;
using BlueLotus.UI.ApiOperations;
using BlueLotus.UI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace BlueLotus.UI.Controllers
{
    public class DeviceController : Controller
    {
        ApiOperation ApiOpr = new ApiOperation();
        //
        // GET: /Device/

        public ActionResult Index(string OurCd, string ObjCaptn)
        {
            ViewBag.ObjCaptn = ObjCaptn;
            ViewBag.OurCd = OurCd;
            return View("AddDevice");
        }
        public ActionResult AssignToUser(string OurCd, string ObjCaptn)
        {
            ViewBag.ObjCaptn = ObjCaptn;
            ViewBag.OurCd = OurCd;
            return View("ManageAndAssignDevices");
        }
        public ActionResult InsertDevice(string DeviceNm, string DeviceIP, string IMEINo,int isAct,int isApr)
        {

            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;
            string Env = HTNSession.Environment;
            bool process = false;
            process = ApiOpr.InsertDevice(UsrKy,CKy,Env,DeviceNm, DeviceIP, IMEINo,isAct,isApr);
            return Json(process, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetAssignedDevices()
        {

            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;
            string Env = HTNSession.Environment;
            List<DeviceModel> list = new List<DeviceModel>();
            list = ApiOpr.GetAssignedDevices(UsrKy,CKy,Env);
            return Json(list, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetAllDevices()
        {

            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;
            string Env = HTNSession.Environment;
            List<DeviceModel> list = new List<DeviceModel>();
            list = ApiOpr.GetAllDevices(UsrKy,CKy,Env);
            return Json(list, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetDevUsers()
        {

            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;
            string Env = HTNSession.Environment;
            List<DeviceModel> list = new List<DeviceModel>();
            list = ApiOpr.GetDevUsers(UsrKy,CKy,Env);
            return Json(list, JsonRequestBehavior.AllowGet);
        }
        public ActionResult AssignDevice(int DevUsrKy,int DeviceKy)
        {

            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;
            string Env = HTNSession.Environment;
            bool process = false;
            process = ApiOpr.AssignDevice(UsrKy, CKy, Env,DevUsrKy, DeviceKy);
            return Json(process, JsonRequestBehavior.AllowGet);
        }
        public ActionResult UnselectDevice(int DevUsrKy, int DeviceKy)
        {

            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;
            string Env = HTNSession.Environment;
            bool process = false;
            process = ApiOpr.UnselectDevice(UsrKy, CKy, Env,DevUsrKy, DeviceKy);
            return Json(process, JsonRequestBehavior.AllowGet);
        }
    }
}
