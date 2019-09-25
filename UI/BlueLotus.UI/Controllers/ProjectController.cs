using BlueLotus.UI.ApiOperations;
using BlueLotus.UI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using BlueLots.Project.Model;
using Bluelotus.Project.Model;

namespace BlueLotus.UI.Controllers
{
    public class ProjectController : Controller
    {
        /// <summary>
        /// /
        /// </summary>
        // GET: /Project/
        ApiOperation apiOpr = new ApiOperation();
        public ActionResult Project_Entry(string OurCd, string ObjCaptn, string ObjKy)
        {
            ViewBag.ObjCaptn = ObjCaptn;
            ViewBag.OurCd = OurCd;
            ViewBag.ObjKy = ObjKy;
            return View();
        }

        public JsonResult DisplyData(String prjnm,String prjLoCd,String prjLoNm,string ObjKy)
        {
            int cKy = HTNSession.CKy;
            int usrKy = HTNSession.UsrKy;
            string Environtname = HTNSession.Environment;
            int prjname = int.Parse(prjnm);
            int ControlConKy = 1;
            apiOpr.InsertProjectLoc(ControlConKy, Convert.ToInt32(prjnm), prjLoCd, prjLoNm, ObjKy, Environtname, cKy, usrKy);
            //string mes = "Project Key is " +" "+ prjnm +" location code"+" " + prjLoCd +" "+ "location name" +" "+ prjLoNm +"ObjctKy is "+" "+ObjKy;
            return Json("Success",JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetPrjLocDetails(string prjKy)
        {
            int usrKy = HTNSession.UsrKy;
            string Environtname = HTNSession.Environment;
            if(prjKy != null)
            {
                List<ProjectModel> Projectlist = new List<ProjectModel>();
                Projectlist = apiOpr.SelectPjoLocCd(Convert.ToInt32(prjKy), usrKy, Environtname);
                return Json(Projectlist, JsonRequestBehavior.AllowGet);
            }
            return Json("Select The Project", JsonRequestBehavior.AllowGet);
            
        }

        public JsonResult GetAllPrjLocDetails()
        {
            int usrKy = HTNSession.UsrKy;
            string Environtname = HTNSession.Environment;
            List<ProjectModel> AllProjectlist = new List<ProjectModel>();
            AllProjectlist = apiOpr.GetAllPjoLocCd(usrKy, Environtname);
            return Json(AllProjectlist, JsonRequestBehavior.AllowGet);
        }

        public JsonResult EditPrjTaskLoc(string prjTaskLocky,string prjKy,string prjLoCd,string prjLoNm,string ObjKy)
        {
            int usrKy = HTNSession.UsrKy;
            string Environtname = HTNSession.Environment;
            int ControlConKy = 1;
                bool result = apiOpr.EditProjectTaskLoc(Convert.ToInt32(prjTaskLocky), ControlConKy, Convert.ToInt32(prjKy), prjLoCd, prjLoNm, usrKy, Environtname);
                if (result == true)
                {
                    return Json("Successfully Updated", JsonRequestBehavior.AllowGet);
                }
                return Json("Error while your updating");
        }

        public JsonResult DeletePrjTaskLoc(string prjTaskLocky)
        {
            int usrKy = HTNSession.UsrKy;
            string Environtname = HTNSession.Environment;
            bool result = apiOpr.DeleteProjectTaskLoc(Convert.ToInt32(prjTaskLocky), usrKy, Environtname);
            if (result == true)
            {
                return Json("Successfully Delete", JsonRequestBehavior.AllowGet);
            }
            return Json("Error while your Deleting");

        }

        public ActionResult ProjectVersionNumber(string OurCd, string ObjCaptn, string ObjKy)
        {
            ViewBag.ObjCaptn = ObjCaptn;
            ViewBag.OurCd = OurCd;
            ViewBag.ObjKy = ObjKy;
            return View();
        }

        public JsonResult ProjectVersionNumberInsert(string trnDate, string prjky, string trnTypKy, string isAct, string isApr, string verNo)
        {
            int usrKy = HTNSession.UsrKy;
            int cky = HTNSession.CKy;
            string Environtname = HTNSession.Environment;
            bool active = Convert.ToBoolean(isAct);
            bool approve = Convert.ToBoolean(isApr);
            bool result = apiOpr.ProjectVersionNumberInserttoAPI(trnDate,Convert.ToInt32(prjky),Convert.ToInt32(trnTypKy), active,approve, verNo, Environtname,cky, usrKy);
            if (result == true)
            {
                return Json("Successful", JsonRequestBehavior.AllowGet);
            }
            return Json("Unsuccessful");
        }

        public JsonResult ProjectVersionNumberFindFormResult(string frmDt,string toDt, string prefix, string trnno, string versionno, string AprStatKy, string prjky, string isAct, string isApr, string trnTypKy, string Objky)
        {
            int usrKy = HTNSession.UsrKy;
            int cky = HTNSession.CKy;
            string Environtname = HTNSession.Environment;
            List<VersionNoFF> result = apiOpr.ProjectVersionNumberFindFormLoadData(frmDt, toDt, prefix, trnno, versionno,AprStatKy, prjky, trnTypKy, isAct, isApr, Objky, Environtname, cky, usrKy);
            if (result.Count>0 && result!=null)
            {
                return Json(result);
            } 
            return Json("Unsuccessful");
        }

        public JsonResult ProjectVersionNumberHdrSelect(int PrcsSchKy)
        {
            int usrKy = HTNSession.UsrKy;
            int cky = HTNSession.CKy;
            string Environtname = HTNSession.Environment;
            List<VersionNoHdrDetail> result = apiOpr.ProjectVersionNumberHdrSelect(PrcsSchKy, Environtname, cky, usrKy);
            if (result.Count > 0 && result != null)
            {
                return Json(result);
            }
            return Json("Unsuccessful");
        }

        public JsonResult ProjectVersionNumberDetailSelect(int PrcsSchKy,int ObjKy)
        {
            int usrKy = HTNSession.UsrKy;
            int cky = HTNSession.CKy;
            string Environtname = HTNSession.Environment;
            List<VersionNoGridDetail> result = apiOpr.ProjectVersionNumberDetailSelect(PrcsSchKy, Environtname, cky, usrKy);
            if (result.Count > 0 && result != null)
            {
                return Json(result);
            }
            return Json("Unsuccessful");
        }

    }
}
