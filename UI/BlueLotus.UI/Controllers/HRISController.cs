using BlueLotus.HRIS.Model.Entity;
using BlueLotus.UI.ApiOperations;
using BlueLotus.UI.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Configuration;
using System.Web.Mvc;

namespace BlueLotus.UI.Controllers
{
    public class HRISController : Controller
    {
        ApiOperation ApiOperation = new ApiOperation();
        public ActionResult EmployeeLeaveIndex(string OurCd, string OurCd2, int ObjKy, string ObjCaptn, int EmpKy = 1)
        {
            ViewBag.OurCd = OurCd;
            ViewBag.OurCd2 = OurCd2;
            ViewBag.ObjKy = ObjKy;
            ViewBag.ObjCaptn = ObjCaptn;
            ViewBag.EmpKy = EmpKy;

            return View("Leave/Index");
        }
        public ActionResult EmployeeOtherIndex(string OurCd, string OurCd2, int ObjKy, string ObjCaptn, string EmpKy)
        {
            ViewBag.OurCd = OurCd;
            ViewBag.OurCd2 = OurCd2;
            ViewBag.ObjKy = ObjKy;
            ViewBag.ObjCaptn = ObjCaptn;
            if (EmpKy == null || EmpKy.Equals(""))
            {
                ViewBag.EmpKy = 1;
            }
            else
            {
                ViewBag.EmpKy = EmpKy;
            }
            return View("Others/Index");
        }
        public ActionResult EmployeeWelfareIndex(string OurCd, string OurCd2, int ObjKy, string ObjCaptn, string EmpKy)
        {
            ViewBag.OurCd = OurCd;
            ViewBag.OurCd2 = OurCd2;
            ViewBag.ObjKy = ObjKy;
            ViewBag.ObjCaptn = ObjCaptn;
            if (EmpKy == null || EmpKy.Equals(""))
            {
                ViewBag.EmpKy = 1;
            }
            else
            {
                ViewBag.EmpKy = EmpKy;
            }
            return View("Welfare/Index");
        }
        public ActionResult Index(string OurCd, string OurCd2, int ObjKy, string ObjCaptn, string EmpKy)
        {
            ViewBag.OurCd = OurCd;
            ViewBag.OurCd2 = OurCd2;
            ViewBag.ObjKy = ObjKy;
            ViewBag.ObjCaptn = ObjCaptn;
            if (EmpKy == null || EmpKy.Equals(""))
            {
                ViewBag.EmpKy = 1;
            }
            else
            {
                ViewBag.EmpKy = EmpKy;
            }
            return View("Index");
        }
        public ActionResult EmployeeIndex(string OurCd, string OurCd2, int ObjKy, string ObjCaptn, string EmpKy)
        {
            ViewBag.OurCd = OurCd;
            ViewBag.OurCd2 = OurCd2;
            ViewBag.ObjKy = ObjKy;
            ViewBag.ObjCaptn = ObjCaptn;
            if (EmpKy == null || EmpKy.Equals(""))
            {
                ViewBag.EmpKy = 1;
            }
            else
            {
                ViewBag.EmpKy = EmpKy;
            }
            return View("Employee/PersonalDet/Index");
        }
        public ActionResult EmployeeJobIndex(string OurCd, string OurCd2, int ObjKy, string ObjCaptn, string EmpKy)
        {
            ViewBag.OurCd = OurCd;
            ViewBag.OurCd2 = OurCd2;
            ViewBag.ObjKy = ObjKy;
            ViewBag.ObjCaptn = ObjCaptn;
            if (EmpKy == null || EmpKy.Equals(""))
            {
                ViewBag.EmpKy = 1;
            }
            else
            {
                ViewBag.EmpKy = EmpKy;
            }
            return View("Employee/JobInfoDet/Index");
        }
        public ActionResult EmployeeSalaryIndex(string OurCd, string OurCd2, int ObjKy, string ObjCaptn, string EmpKy)
        {
            ViewBag.OurCd = OurCd;
            ViewBag.OurCd2 = OurCd2;
            ViewBag.ObjKy = ObjKy;
            ViewBag.ObjCaptn = ObjCaptn;
            if (EmpKy == null || EmpKy.Equals(""))
            {
                ViewBag.EmpKy = 1;
            }
            else
            {
                ViewBag.EmpKy = EmpKy;
            }
            return View("Employee/SalaryDet/Index");
        }
        public ActionResult PersonalIndex(string OurCd, string OurCd2, int ObjKy, string ObjCaptn, string EmpKy)
        {
            ViewBag.OurCd = OurCd;
            ViewBag.OurCd2 = OurCd2;
            ViewBag.ObjKy = ObjKy;
            ViewBag.ObjCaptn = ObjCaptn;
            if (EmpKy == null || EmpKy.Equals(""))
            {
                ViewBag.EmpKy = 1;
            }
            else
            {
                ViewBag.EmpKy = EmpKy;
            }
            return View("Employee/Index");
        }
        public ActionResult Contact(string OurCd, string OurCd2, int ObjKy, string ObjCaptn, string EmpKy)
        {
            ViewBag.OurCd = OurCd;
            ViewBag.OurCd2 = OurCd2;
            ViewBag.ObjKy = ObjKy;
            ViewBag.ObjCaptn = ObjCaptn;
            if (EmpKy == null || EmpKy.Equals(""))
            {
                ViewBag.EmpKy = 1;
            }
            else
            {
                ViewBag.EmpKy = EmpKy;
            }
            return View("ContactDet/ContactDet");
        }
        public ActionResult JobInfo(string OurCd, string OurCd2, int ObjKy, string ObjCaptn, string EmpKy)
        {
            ViewBag.OurCd = OurCd;
            ViewBag.OurCd2 = OurCd2;
            ViewBag.ObjKy = ObjKy;
            ViewBag.ObjCaptn = ObjCaptn;
            if (EmpKy == null || EmpKy.Equals(""))
            {
                ViewBag.EmpKy = 1;
            }
            else
            {
                ViewBag.EmpKy = EmpKy;
            }
            return View("JobInfo/JobInfoDet");
        }
        public JsonResult GetBasicDet(int EmpKy)
        {
            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;
            string Environment = HTNSession.Environment;
            List<HRISDataModel> ProfDet = new List<HRISDataModel>();
            List<HRISDataModel> ProfDet2 = new List<HRISDataModel>();
            ProfDet = ApiOperation.GetBasicDet(Environment, UsrKy, CKy, EmpKy);
            ProfDet2 = ApiOperation.GetBasicDet_Sec(Environment, UsrKy, CKy, EmpKy);

            if (ProfDet.Count > 0 && ProfDet2.Count > 0)
            {
                ProfDet[0].FuneralDet = ProfDet2[0].FuneralDet;
                ProfDet[0].PhoneDet = ProfDet2[0].PhoneDet;
                ProfDet[0].AssetDet = ProfDet2[0].AssetDet;
                ProfDet[0].LeaveDet = ProfDet2[0].LeaveDet;
            }

            return Json(ProfDet, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetSalaryDet(int EmpKy)
        {
            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;
            string Environment = HTNSession.Environment;
            List<HRISSalaryDataModel> ProfDet = new List<HRISSalaryDataModel>();
            ProfDet = ApiOperation.GetSalaryDet(Environment, UsrKy, CKy, EmpKy);
            return Json(ProfDet, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetwelfareDet(int EmpKy)
        {
            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;
            string Environment = HTNSession.Environment;
            List<HRISWelfareDataModel> ProfDet = new List<HRISWelfareDataModel>();
            ProfDet = ApiOperation.GetwelfareDet(Environment, UsrKy, CKy, EmpKy);
            return Json(ProfDet, JsonRequestBehavior.AllowGet);
        }
        public JsonResult InsertSalaryDet(string HdrDataString, string DetDataString)
        {
            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;
            string Environment = HTNSession.Environment;
            List<HRISSalaryDataModel> ProfDet = new List<HRISSalaryDataModel>();
            ProfDet = ApiOperation.InsertSalaryDet(Environment, UsrKy, CKy, HdrDataString, DetDataString);
            return Json(ProfDet, JsonRequestBehavior.AllowGet);
        }
        public JsonResult InsertWelfareDet(string HdrDataString, string DetDataString)
        {
            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;
            string Environment = HTNSession.Environment;
            List<HRISWelfareDataModel> ProfDet = new List<HRISWelfareDataModel>();
            ProfDet = ApiOperation.InsertWelfareDet(Environment, UsrKy, CKy, HdrDataString, DetDataString);
            return Json(ProfDet, JsonRequestBehavior.AllowGet);
        }
        public JsonResult InsertOtherTrainingDet(string HdrDataString, string DetDataString)
        {
            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;
            string Environment = HTNSession.Environment;
            List<HRISOtherDataModel> ProfDet = new List<HRISOtherDataModel>();
            ProfDet = ApiOperation.InsertOtherTrainingDet(Environment, UsrKy, CKy, HdrDataString, DetDataString);
            return Json(ProfDet, JsonRequestBehavior.AllowGet);
        }
        public JsonResult InsertOtherMembershipDet(string HdrDataString, string DetDataString)
        {
            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;
            string Environment = HTNSession.Environment;
            List<HRISOtherDataModel> ProfDet = new List<HRISOtherDataModel>();
            ProfDet = ApiOperation.InsertOtherMembershipDet(Environment, UsrKy, CKy, HdrDataString, DetDataString);
            return Json(ProfDet, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetOtherDet(int EmpKy)
        {
            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;
            string Environment = HTNSession.Environment;
            List<HRISOtherDataModel> ProfDet = new List<HRISOtherDataModel>();
            ProfDet = ApiOperation.GetOtherDet(Environment, UsrKy, CKy, EmpKy);
            return Json(ProfDet, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetPersonalDet(int EmpKy)
        {
            string AppCustmPath = WebConfigurationManager.AppSettings["AppCustmPath"];
            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;
            string Environment = HTNSession.Environment;
            List<HRISPersonalDataModel> ProfDet = new List<HRISPersonalDataModel>();
            ProfDet = ApiOperation.GetPersonalDet(Environment, UsrKy, CKy, EmpKy, AppCustmPath);
            return Json(ProfDet, JsonRequestBehavior.AllowGet);
        }
        public JsonResult InsertBasicDet(string HdrDataString, string DetDataString)
        {
            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;
            string Environment = HTNSession.Environment;
            List<HRISDataModel> ProfDet = new List<HRISDataModel>();
            ProfDet = ApiOperation.InsertBasicDet(Environment, UsrKy, CKy, HdrDataString, DetDataString);
            return Json(ProfDet, JsonRequestBehavior.AllowGet);
        }
        public JsonResult InsertContactDet(string HdrDataString, string DetDataString)
        {
            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;
            string Environment = HTNSession.Environment;
            List<HRISDataModel> ProfDet = new List<HRISDataModel>();
            ProfDet = ApiOperation.InsertContactDet(Environment, UsrKy, CKy, HdrDataString, DetDataString);
            return Json(ProfDet, JsonRequestBehavior.AllowGet);
        }
        public JsonResult InsertAcadamicDet(string HdrDataString, string DetDataString)
        {
            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;
            string Environment = HTNSession.Environment;
            List<HRISDataModel> ProfDet = new List<HRISDataModel>();
            ProfDet = ApiOperation.InsertAcadamicDet(Environment, UsrKy, CKy, HdrDataString, DetDataString);
            return Json(ProfDet, JsonRequestBehavior.AllowGet);
        }
        public JsonResult InsertDet(string HdrDataString, string DetDataString, string Form)
        {
            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;
            string Environment = HTNSession.Environment;
            List<HRISDataModel> ProfDet = new List<HRISDataModel>();
            ProfDet = ApiOperation.InsertDet(Environment, UsrKy, CKy, HdrDataString, DetDataString, Form);
            return Json(ProfDet, JsonRequestBehavior.AllowGet);
        }
        public JsonResult InsertLeaveDet(string HdrDataString, string DetDataString)
        {
            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;
            string Environment = HTNSession.Environment;
            List<LeaveDataModel> ProfDet = new List<LeaveDataModel>();
            ProfDet = ApiOperation.InsertLeaveDet(Environment, UsrKy, CKy, HdrDataString, DetDataString);
            return Json(ProfDet, JsonRequestBehavior.AllowGet);
        }
        public JsonResult InsertMedicalClaimDet(string HdrDataString, string DetDataString)
        {
            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;
            string Environment = HTNSession.Environment;
            List<MedicalClaimsModel> ProfDet = new List<MedicalClaimsModel>();
            ProfDet = ApiOperation.InsertMedicalClaimDet(Environment, UsrKy, CKy, HdrDataString, DetDataString);
            return Json(ProfDet, JsonRequestBehavior.AllowGet);
        }
        public JsonResult InsertAnnualPerformanceDet(string HdrDataString, string DetDataString)
        {
            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;
            string Environment = HTNSession.Environment;
            List<AnnualPerDataModel> ProfDet = new List<AnnualPerDataModel>();
            ProfDet = ApiOperation.InsertAnnualPerformanceDet(Environment, UsrKy, CKy, HdrDataString, DetDataString);
            return Json(ProfDet, JsonRequestBehavior.AllowGet);
        }
        public JsonResult DeleteFamilyDet(long AdrKy)
        {
            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;
            string Environment = HTNSession.Environment;
            long Key = ApiOperation.DeleteFamilyDet(Environment, UsrKy, CKy, AdrKy);
            return Json(Key, JsonRequestBehavior.AllowGet);
        }
        public JsonResult DeleteEmpMasCd(long EmpCdKy)
        {
            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;
            string Environment = HTNSession.Environment;
            long Key = ApiOperation.DeleteEmpMasCd(Environment, UsrKy, CKy, EmpCdKy);
            return Json(Key, JsonRequestBehavior.AllowGet);
        }
        public JsonResult DeleteMedicalClaimsDet(long EmpCdDtKy)
        {
            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;
            string Environment = HTNSession.Environment;
            long Key = ApiOperation.DeleteMedicalClaimsDet(Environment, UsrKy, CKy, EmpCdDtKy);
            return Json(Key, JsonRequestBehavior.AllowGet);
        }
        public JsonResult DeleteJobDet(string EffectDt, long EmpKy)
        {
            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;
            string Environment = HTNSession.Environment;
            long Key = ApiOperation.DeleteJobDet(Environment, UsrKy, CKy, EffectDt, EmpKy);
            return Json(Key, JsonRequestBehavior.AllowGet);
        }
        public JsonResult DeleteLeaveDet(long LevTrnKy)
        {
            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;
            string Environment = HTNSession.Environment;
            long Key = ApiOperation.DeleteLeaveDet(Environment, UsrKy, CKy, LevTrnKy);
            return Json(Key, JsonRequestBehavior.AllowGet);
        }//InsertEmpImgFilesWithPath

        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult InsertEmpImgFilesWithPath()
        {
            bool isExsit = true;
            string filename = "";
            string strFilePath = "";
            foreach (string upload in Request.Files)
            {
                string AppCustmPath = WebConfigurationManager.AppSettings["AppCustmPath"];
                isExsit = Directory.Exists(AppCustmPath + "HRISEmpImg\\");
                filename = Path.GetFileName(Request.Files[upload].FileName);
                string ServerPath = AppCustmPath + "HRISEmpImg\\";
                //strFilePath = ServerPath + filename;
                strFilePath = AppCustmPath + "HRISEmpImg\\" + filename;
                //filename.Replace("'\"'", "");
                if (System.IO.File.Exists(strFilePath))
                {
                    return Json(filename, JsonRequestBehavior.AllowGet);
                }
                else
                {
                    if (isExsit)
                    {
                        Request.Files[upload].SaveAs(Path.Combine(ServerPath, filename));
                    }
                }
            }
            return Json(filename, JsonRequestBehavior.AllowGet);
        }


        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult InsertFileswithpath()
        {
            bool isExsit = true;

            foreach (string upload in Request.Files)
            {
                string AppCustmPath = WebConfigurationManager.AppSettings["AppCustmPath"];
                isExsit = Directory.Exists(AppCustmPath + "HRISDoc\\");
                string filename = Path.GetFileName(Request.Files[upload].FileName);
                string ServerPath = @"\\DOTNETSERVER\wwwroot\DevBL10\HRISDoc\";
                string strFilePath = ServerPath + filename;

                if (System.IO.File.Exists(strFilePath))
                {
                    return Json(false, JsonRequestBehavior.AllowGet);
                }
                else
                {
                    if (isExsit)
                    {
                        Request.Files[upload].SaveAs(Path.Combine(ServerPath, filename));
                    }
                }
            }
            return Json(true, JsonRequestBehavior.AllowGet);
        }
        public JsonResult InsertAnnualPerDocDet(string fileName)
        {
            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;
            string Environment = HTNSession.Environment;
            List<AnnualPerDataModel> ProfDet = new List<AnnualPerDataModel>();
            ProfDet = ApiOperation.InsertAnnualPerDocDet(Environment, UsrKy, CKy, fileName);
            return Json(ProfDet, JsonRequestBehavior.AllowGet);
        }
    }
}
