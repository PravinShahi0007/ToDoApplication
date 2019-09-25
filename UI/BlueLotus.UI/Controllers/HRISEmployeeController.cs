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
    public class HRISEmployeeController : Controller
    {
        ApiOperation apiOpr = new ApiOperation();
        public ActionResult EmpDet(string OurCd, string OurCd2, int ObjKy, string ObjCaptn)
        {
            ViewBag.OurCd = OurCd;
            ViewBag.OurCd2 = OurCd2;
            ViewBag.ObjKy = ObjKy;
            ViewBag.ObjCaptn = ObjCaptn;
            return View("EmpDet/Index");
        }
        public ActionResult LeaveInfo(string OurCd, string OurCd2, int ObjKy, string ObjCaptn)
        {
            ViewBag.ObjCaptn = ObjCaptn;
            ViewBag.OurCd = OurCd;
            ViewBag.OurCd2 = OurCd2;
            ViewBag.ObjKy = ObjKy;

            return View("Leave/LeaveInfo");
        }
        
        public ActionResult Disiplinary(string OurCd, string ObjCaptn)
        {
            ViewBag.ObjCaptn = ObjCaptn;
            ViewBag.OurCd = OurCd;

            return View("Other/Disiplinary");
        }
        public ActionResult MedicalClaimsEnter(string OurCd, string ObjCaptn)
        {
            ViewBag.ObjCaptn = ObjCaptn;
            ViewBag.OurCd = OurCd;

            return View("Other/MedicalClaimsEnter");
        }

        public ActionResult FuelAllowence(string OurCd, string ObjCaptn)
        {
            ViewBag.ObjCaptn = ObjCaptn;
            ViewBag.OurCd = OurCd;

            return View("Other/FuelAllowence");
        }

        public ActionResult VehicleAllowence(string OurCd, string ObjCaptn)
        {
            ViewBag.ObjCaptn = ObjCaptn;
            ViewBag.OurCd = OurCd;

            return View("Other/VehicleAllowence");
        }

        public ActionResult Asset(string OurCd, string ObjCaptn)
        {
            ViewBag.ObjCaptn = ObjCaptn;
            ViewBag.OurCd = OurCd;

            return View("Other/Asset");
        }

        public ActionResult Phoneinternet(string OurCd, string ObjCaptn)
        {
            ViewBag.ObjCaptn = ObjCaptn;
            ViewBag.OurCd = OurCd;

            return View("Other/Phoneinternet");
        }

        public ActionResult Vehicle(string OurCd, string ObjCaptn)
        {
            ViewBag.ObjCaptn = ObjCaptn;
            ViewBag.OurCd = OurCd;

            return View("Other/Vehicle");
        }

        public ActionResult WelfareMedical(string OurCd, string ObjCaptn)
        {
            ViewBag.ObjCaptn = ObjCaptn;
            ViewBag.OurCd = OurCd;

            return View("Welfare/WelfareMedical");
        }

        public ActionResult AnnualPerfomance(string OurCd, string ObjCaptn)
        {
            ViewBag.ObjCaptn = ObjCaptn;
            ViewBag.OurCd = OurCd;

            return View("AnnualPerformance/AnnualPerformance");
        }

        public ActionResult Funeral(string OurCd, string ObjCaptn)
        {
            ViewBag.ObjCaptn = ObjCaptn;
            ViewBag.OurCd = OurCd;

            return View("Welfare/Funeral");
        }

        public ActionResult Index(string OurCd, string ObjCaptn)
        {
            ViewBag.ObjCaptn = ObjCaptn;
            ViewBag.OurCd = OurCd;

            return View("Basic/index");
        }
        public ActionResult BankDetails(string OurCd, string ObjCaptn)
        {
            ViewBag.ObjCaptn = ObjCaptn;
            ViewBag.OurCd = OurCd;

            return View("Bank/BankDetails");
        }
        public JsonResult HRISInsertHdr(string empData)
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            string ConCord = "TrnTyp";
            long Key = apiOpr.HRISInsertHdr(HTNSession.Environment, CKy, UsrKy, ConCord, empData);
            return Json(Key, JsonRequestBehavior.AllowGet);
        }


        //public JsonResult HRISInsertMembershipHdr(string empMembershipData)
        //{
        //    int CKy = HTNSession.CKy;
        //    int UsrKy = HTNSession.UsrKy;
        //    string ConCord = "TrnTyp";
        //    long Key = apiOpr.HRISInsertMembershipHdr(HTNSession.Environment, CKy, UsrKy, ConCord, empMembershipData);
        //    return Json(Key, JsonRequestBehavior.AllowGet);
        //}
        public JsonResult HRISInsertEmpMasCdDetails(string empMasCdData)
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            string ConCord = "TrnTyp";
            long Key = apiOpr.HRISInsertEmpMasCdDetails(HTNSession.Environment, CKy, UsrKy, ConCord, empMasCdData);
            return Json(Key, JsonRequestBehavior.AllowGet);
        }
        public JsonResult HRISInsertBankHdr(string empBankData)
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            string ConCord = "TrnTyp";
            long Key = apiOpr.HRISInsertBankHdr(HTNSession.Environment, CKy, UsrKy, ConCord, empBankData);
            return Json(Key, JsonRequestBehavior.AllowGet);
        }
        public JsonResult HRISInsertTrainingHdr(string empTrainingData)
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            string ConCord = "TrnTyp";
            long Key = apiOpr.HRISInsertTrainingHdr(HTNSession.Environment, CKy, UsrKy, ConCord, empTrainingData);
            return Json(Key, JsonRequestBehavior.AllowGet);
        }
        
        public JsonResult HRISInsertWelfareHdr(string empWelfareData)
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            string ConCord = "TrnTyp";
            long Key = apiOpr.HRISInsertWelfareHdr(HTNSession.Environment, CKy, UsrKy, ConCord, empWelfareData);
            return Json(Key, JsonRequestBehavior.AllowGet);
        }
       
        public JsonResult HRISInsert_Ol_AcaQulHdr(string empOl_AcadData)
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            string ConCord = "TrnTyp";
            long Key = apiOpr.HRISInsert_Ol_AcaQulHdr(HTNSession.Environment, CKy, UsrKy, ConCord, empOl_AcadData);
            return Json(Key, JsonRequestBehavior.AllowGet);
        }
        public JsonResult HRISInsert_SLeavers_AcaQul(string empSLeavers_AcadData)
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            string ConCord = "TrnTyp";
            long Key = apiOpr.HRISInsert_SLeavers_AcaQul(HTNSession.Environment, CKy, UsrKy, ConCord, empSLeavers_AcadData);
            return Json(Key, JsonRequestBehavior.AllowGet);
        }
        public JsonResult HRISInsertContactHdr(string empContactData, string empContactHdr)
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            long Key = apiOpr.HRISInsertContactHdr(HTNSession.Environment, CKy, UsrKy, empContactData, empContactHdr);
            return Json(Key, JsonRequestBehavior.AllowGet);
        }

        public JsonResult HRISInsertSalaryDet(string empSalaryData, string empSalaryHdr)
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            long Key = apiOpr.HRISInsertSalaryDet(HTNSession.Environment, CKy, UsrKy, empSalaryData, empSalaryHdr);
            return Json(Key, JsonRequestBehavior.AllowGet);
        }

        public JsonResult HRISInsertFmlyDet(string EmpfmlyData, string EmpFamilyHdr)
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            long Key = apiOpr.HRISInsertFmlyDet(HTNSession.Environment, CKy, UsrKy, EmpFamilyHdr, EmpfmlyData);
            return Json(Key, JsonRequestBehavior.AllowGet);
        }
        public JsonResult HRISInsertJobDet(string EmpJobHdr, string EmpJobDet)
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            long Key = apiOpr.HRISInsertJobDet(HTNSession.Environment, CKy, UsrKy, EmpJobHdr, EmpJobDet);
            return Json(Key, JsonRequestBehavior.AllowGet);
        }
        public ActionResult WelfareLoan(string OurCd, string ObjCaptn)
        {
            ViewBag.ObjCaptn = ObjCaptn;
            ViewBag.OurCd = OurCd;

            return View("Welfare/WelfareLoan");
        }
        public ActionResult Training(string OurCd, string ObjCaptn)
        {
            ViewBag.ObjCaptn = ObjCaptn;
            ViewBag.OurCd = OurCd;

            return View("Training/Training");
        }
        public ActionResult contact(string OurCd, string ObjCaptn)
        {
            ViewBag.ObjCaptn = ObjCaptn;
            ViewBag.OurCd = OurCd;

            return View("Contact/Contact");
        }
        public ActionResult Family(string OurCd, string ObjCaptn)
        {
            ViewBag.ObjCaptn = ObjCaptn;
            ViewBag.OurCd = OurCd;

            return View("Family/Family");
        }

        public ActionResult AlAcadamicQualification(string OurCd, string ObjCaptn)
        {
            ViewBag.ObjCaptn = ObjCaptn;
            ViewBag.OurCd = OurCd;

            return View("Acadamic/AlAcadamicQualification");
        }

        public ActionResult OlAcadamicQualification(string OurCd, string ObjCaptn)
        {
            ViewBag.ObjCaptn = ObjCaptn;
            ViewBag.OurCd = OurCd;

            return View("Acadamic/OlAcadamicQualification");
        }
        public ActionResult SchoolLeaversAcadamicQualification(string OurCd, string ObjCaptn)
        {
            ViewBag.ObjCaptn = ObjCaptn;
            ViewBag.OurCd = OurCd;

            return View("Acadamic/SchoolLeaversAcadamicQualification");
        }

        public ActionResult ProfessionalQualification(string OurCd, string ObjCaptn)
        {
            ViewBag.ObjCaptn = ObjCaptn;
            ViewBag.OurCd = OurCd;

            return View("Professional/ProfessionalQualification");
        }
        public ActionResult JobInformation(string OurCd, string ObjCaptn)
        {
            ViewBag.ObjCaptn = ObjCaptn;
            ViewBag.OurCd = OurCd;

            return View("Other/JobInformation");
        }

        public ActionResult SalaryDetails(string OurCd, string ObjCaptn)
        {
            ViewBag.ObjCaptn = ObjCaptn;
            ViewBag.OurCd = OurCd;

            return View("Salary/SalaryDetails");
        }

        public ActionResult Membership(string OurCd, string ObjCaptn)
        {
            ViewBag.ObjCaptn = ObjCaptn;
            ViewBag.OurCd = OurCd;

            return View("Membership/Membership");
        }
        public JsonResult GetBnkMas_LookupWeb(int BnkKy)
        {
            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;

            List<BankMas_LookupWebModel> GenderDrop = new List<BankMas_LookupWebModel>();
            GenderDrop = apiOpr.GetBnkMas_LookupWeb(HTNSession.Environment, UsrKy, CKy,BnkKy);

            return Json(GenderDrop, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetCdMas_LookupWeb(string ConCd)
        {
            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;

            List<CdMas_LookupWebModel> GenderDrop = new List<CdMas_LookupWebModel>();
            GenderDrop = apiOpr.GetCdMas_LookupWeb(HTNSession.Environment, UsrKy, CKy, ConCd);

            return Json(GenderDrop, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetEmpDet()
        {
            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;
            List<EmpMasModel> GenderDrop = new List<EmpMasModel>();
            GenderDrop = apiOpr.GetEmpDet(HTNSession.Environment, UsrKy, CKy);

            return Json(GenderDrop, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetEmpPersonalDet(string EmpKy)
        {
            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;
            List<EmpPersonalDataModel> GenderDrop = new List<EmpPersonalDataModel>();
            GenderDrop = apiOpr.GetEmpPersonalDet(HTNSession.Environment, UsrKy, CKy, EmpKy);

            return Json(GenderDrop, JsonRequestBehavior.AllowGet);
        }

        public JsonResult HRISGetSalaryDet(string EmpKy)
        {
            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;
            List<EmpSalaryDetDataModel> SalaryDet = new List<EmpSalaryDetDataModel>();
            SalaryDet = apiOpr.HRISGetSalaryDet(HTNSession.Environment, UsrKy, CKy, EmpKy);

            return Json(SalaryDet, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetEmpFamilyDet(string EmpKy)
        {
            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;
            List<EmpFmlyDataModel> FamilyDet = new List<EmpFmlyDataModel>();
            FamilyDet = apiOpr.GetEmpFamilyDet(HTNSession.Environment, UsrKy, CKy, EmpKy);

            return Json(FamilyDet, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetEmpContactDet(string EmpKy)
        {
            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;
            List<EmpContactDetDataModel> EmpContactDet = new List<EmpContactDetDataModel>();
            EmpContactDet = apiOpr.GetEmpContactDet(HTNSession.Environment, UsrKy, CKy, EmpKy);

            return Json(EmpContactDet, JsonRequestBehavior.AllowGet);
        }
        //public JsonResult GetEmpMasCdDet(string EmpKy)
        //{
        //    int UsrKy = HTNSession.UsrKy;
        //    int CKy = HTNSession.CKy;
        //    List<EmpMasCdModel> EmpCdDet = new List<EmpMasCdModel>();
        //    EmpCdDet = apiOpr.GetEmpMasCdDet(HTNSession.Environment, UsrKy, CKy, EmpKy);

        //    return Json(EmpCdDet, JsonRequestBehavior.AllowGet);
        //}
        public JsonResult GetEmpMasCdDet()
        {
            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;
            List<EmpMasCdModel> GetEmpMasCd = new List<EmpMasCdModel>();
            GetEmpMasCd = apiOpr.GetEmpMasCdDet(HTNSession.Environment, UsrKy, CKy);

            return Json(GetEmpMasCd, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetEmpMasCdDetAfterSelect(string EmpKy)
        {
            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;
            List<EmpMasCdModel> GetEmpMasCd = new List<EmpMasCdModel>();
            GetEmpMasCd = apiOpr.GetEmpMasCdDetAfterSelect(HTNSession.Environment, UsrKy, CKy, EmpKy);

            return Json(GetEmpMasCd, JsonRequestBehavior.AllowGet);
        }

        public JsonResult HRISGetJobDet(string EmpKy)
        {
            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;
            List<EmpJobDataModel> FamilyDet = new List<EmpJobDataModel>();
            FamilyDet = apiOpr.HRISGetJobDet(HTNSession.Environment, UsrKy, CKy, EmpKy);

            return Json(FamilyDet, JsonRequestBehavior.AllowGet);
        }
        //public JsonResult HRISInsertJobDet(string EmpJobHdr, string EmpJobDet)
        //{
        //    int CKy = HTNSession.CKy;
        //    int UsrKy = HTNSession.UsrKy;
        //    long Key = apiOpr.HRISInsertJobDet(HTNSession.Environment, CKy, UsrKy, EmpJobHdr, EmpJobDet);
        //    return Json(Key, JsonRequestBehavior.AllowGet);
        //}
        public JsonResult HRISInsertProfDet(string EmpHdr, string EmpProfDet)
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            long Key = apiOpr.HRISInsertProfDet(HTNSession.Environment, CKy, UsrKy, EmpHdr, EmpProfDet);
            return Json(Key, JsonRequestBehavior.AllowGet);
        }
        public JsonResult HRISGetProfDet(string EmpKy)
        {
            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;
            List<EmpProfDatacModel> ProfDet = new List<EmpProfDatacModel>();
            ProfDet = apiOpr.HRISGetProfDet(HTNSession.Environment, UsrKy, CKy, EmpKy);

            return Json(ProfDet, JsonRequestBehavior.AllowGet);
        }
        public JsonResult HRISInsertTrainingDet(string EmpHdr, string EmpTrainingDet)
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            long Key = apiOpr.HRISInsertTrainingDet(HTNSession.Environment, CKy, UsrKy, EmpHdr, EmpTrainingDet);
            return Json(Key, JsonRequestBehavior.AllowGet);
        }
        public JsonResult HRISGetTrainingDet(string EmpKy)
        {
            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;
            List<EmpTrainingDataModel> ProfDet = new List<EmpTrainingDataModel>();
            ProfDet = apiOpr.HRISGetTrainingDet(HTNSession.Environment, UsrKy, CKy, EmpKy);

            return Json(ProfDet, JsonRequestBehavior.AllowGet);
        }
        public JsonResult HRISInsertLeaveDet(string EmpHdr, string EmpData)
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            long Key = apiOpr.HRISInsertLeaveDet(HTNSession.Environment, CKy, UsrKy, EmpHdr, EmpData);
            return Json(Key, JsonRequestBehavior.AllowGet);
        }
        public JsonResult HRISGetLeaveDet(string EmpKy)
        {
            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;
            List<EmpLeaveDataModel> ProfDet = new List<EmpLeaveDataModel>();
            ProfDet = apiOpr.HRISGetLeaveDet(HTNSession.Environment, UsrKy, CKy, EmpKy);
            return Json(ProfDet, JsonRequestBehavior.AllowGet);
        }
        public JsonResult HRISInsertMembershipDet(string EmpHdr, string EmpMembershipData)
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            long Key = apiOpr.HRISInsertMembershipDet(HTNSession.Environment, CKy, UsrKy, EmpHdr, EmpMembershipData);
            return Json(Key, JsonRequestBehavior.AllowGet);
        }
        public JsonResult HRISGetMembershipDet(string EmpKy)
        {
            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;
            List<EmpMembershipDataModel> ProfDet = new List<EmpMembershipDataModel>();
            ProfDet = apiOpr.HRISGetMembershipDet(HTNSession.Environment, UsrKy, CKy, EmpKy);

            return Json(ProfDet, JsonRequestBehavior.AllowGet);
        }
        public JsonResult HRISInsertAl_AcadDet(string EmpHdr, string EmpAlData)
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            long Key = apiOpr.HRISInsertAl_AcadDet(HTNSession.Environment, CKy, UsrKy, EmpHdr, EmpAlData);
            return Json(Key, JsonRequestBehavior.AllowGet);
        }
        public JsonResult HRISGetAl_AcadDet(string EmpKy)
        {
            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;
            List<EmpAlOl_AcadDataModel> ProfDet = new List<EmpAlOl_AcadDataModel>();
            ProfDet = apiOpr.HRISGetAl_AcadDet(HTNSession.Environment, UsrKy, CKy, EmpKy);

            return Json(ProfDet, JsonRequestBehavior.AllowGet);
        }
        public JsonResult HRISInsertOl_AcadDet(string EmpHdr, string EmpAlData)
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            long Key = apiOpr.HRISInsertOl_AcadDet(HTNSession.Environment, CKy, UsrKy, EmpHdr, EmpAlData);
            return Json(Key, JsonRequestBehavior.AllowGet);
        }
        public JsonResult HRISGetOl_AcadDet(string EmpKy)
        {
            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;
            List<EmpAlOl_AcadDataModel> ProfDet = new List<EmpAlOl_AcadDataModel>();
            ProfDet = apiOpr.HRISGetOl_AcadDet(HTNSession.Environment, UsrKy, CKy, EmpKy);

            return Json(ProfDet, JsonRequestBehavior.AllowGet);
        }



        public JsonResult HRISInsertSL_AcadDet(string EmpHdr, string EmpSLData)
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            long Key = apiOpr.HRISInsertSL_AcadDet(HTNSession.Environment, CKy, UsrKy, EmpHdr, EmpSLData);
            return Json(Key, JsonRequestBehavior.AllowGet);
        }
        public JsonResult HRISGetSL_AcadDet(string EmpKy)
        {
            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;
            List<EmpAlOl_AcadDataModel> ProfDet = new List<EmpAlOl_AcadDataModel>();
            ProfDet = apiOpr.HRISGetSL_AcadDet(HTNSession.Environment, UsrKy, CKy, EmpKy);

            return Json(ProfDet, JsonRequestBehavior.AllowGet);
        }

        //public JsonResult HRISInsertBankDet(string EmpHdr, string EmpBankData)
        //{
        //    int CKy = HTNSession.CKy;
        //    int UsrKy = HTNSession.UsrKy;
        //    long Key = apiOpr.HRISInsertBankDet(HTNSession.Environment, CKy, UsrKy, EmpHdr, EmpBankData);
        //    return Json(Key, JsonRequestBehavior.AllowGet);
        //}
        //public JsonResult HRISGetBankDet(string EmpKy)
        //{
        //    int UsrKy = HTNSession.UsrKy;
        //    int CKy = HTNSession.CKy;
        //    List<EmpBankDataModel> ProfDet = new List<EmpBankDataModel>();
        //    ProfDet = apiOpr.HRISGetBankDet(HTNSession.Environment, UsrKy, CKy, EmpKy);

        //    return Json(ProfDet, JsonRequestBehavior.AllowGet);
        //}
        public JsonResult HRISInsertVehicleDet(string EmpHdr, string EmpData)
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            long Key = apiOpr.HRISInsertVehicleDet(HTNSession.Environment, CKy, UsrKy, EmpHdr, EmpData);
            return Json(Key, JsonRequestBehavior.AllowGet);
        }
        public JsonResult HRISGetVehicleDet(string EmpKy)
        {
            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;
            List<EmpVehicleDataModel> ProfDet = new List<EmpVehicleDataModel>();
            ProfDet = apiOpr.HRISGetVehicleDet(HTNSession.Environment, UsrKy, CKy, EmpKy);

            return Json(ProfDet, JsonRequestBehavior.AllowGet);
        }


        public JsonResult HRISInsertWelfareLoanDet(string EmpHdr, string EmpData)
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            long Key = apiOpr.HRISInsertWelfareLoanDet(HTNSession.Environment, CKy, UsrKy, EmpHdr, EmpData);
            return Json(Key, JsonRequestBehavior.AllowGet);
        }
        public JsonResult HRISGetWelfareLoanDet(string EmpKy)
        {
            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;
            List<EmpWelfareLoanDatacModel> ProfDet = new List<EmpWelfareLoanDatacModel>();
            ProfDet = apiOpr.HRISGetWelfareLoanDet(HTNSession.Environment, UsrKy, CKy, EmpKy);

            return Json(ProfDet, JsonRequestBehavior.AllowGet);
        }

        public JsonResult HRISInsertFuneralDet(string EmpHdr, string EmpData)
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            long Key = apiOpr.HRISInsertFuneralDet(HTNSession.Environment, CKy, UsrKy, EmpHdr, EmpData);
            return Json(Key, JsonRequestBehavior.AllowGet);
        }
        public JsonResult HRISGetFuneralDet(string EmpKy)
        {
            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;
            List<EmpFuneralDataModel> ProfDet = new List<EmpFuneralDataModel>();
            ProfDet = apiOpr.HRISGetFuneralDet(HTNSession.Environment, UsrKy, CKy, EmpKy);
            return Json(ProfDet, JsonRequestBehavior.AllowGet);
        }

        public JsonResult HRISInsertMedicalClaimDet(string EmpHdr, string EmpData)
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            long Key = apiOpr.HRISInsertMedicalClaimDet(HTNSession.Environment, CKy, UsrKy, EmpHdr, EmpData);
            return Json(Key, JsonRequestBehavior.AllowGet);
        }
        public JsonResult HRISGetMedicalClaimDet(string EmpKy)
        {
            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;
            List<EmpMedicalClaimDataModel> ProfDet = new List<EmpMedicalClaimDataModel>();
            ProfDet = apiOpr.HRISGetMedicalClaimDet(HTNSession.Environment, UsrKy, CKy, EmpKy);
            return Json(ProfDet, JsonRequestBehavior.AllowGet);
        }

        public JsonResult HRISInsertDisiplinaryDet(string EmpHdr, string EmpData)
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            long Key = apiOpr.HRISInsertDisiplinaryDet(HTNSession.Environment, CKy, UsrKy, EmpHdr, EmpData);
            return Json(Key, JsonRequestBehavior.AllowGet);
        }
        public JsonResult HRISGetDisiplinaryDet(string EmpKy)
        {
            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;
            List<EmpDisiplinaryDataModel> ProfDet = new List<EmpDisiplinaryDataModel>();
            ProfDet = apiOpr.HRISGetDisiplinaryDet(HTNSession.Environment, UsrKy, CKy, EmpKy);
            return Json(ProfDet, JsonRequestBehavior.AllowGet);
        }

        public JsonResult HRISInsertAssetDet(string EmpHdr, string EmpData)
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            long Key = apiOpr.HRISInsertAssetDet(HTNSession.Environment, CKy, UsrKy, EmpHdr, EmpData);
            return Json(Key, JsonRequestBehavior.AllowGet);
        }
        public JsonResult HRISGetAssetDet(string EmpKy)
        {
            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;
            List<EmpAssetataModel> ProfDet = new List<EmpAssetataModel>();
            ProfDet = apiOpr.HRISGetAssetDet(HTNSession.Environment, UsrKy, CKy, EmpKy);
            return Json(ProfDet, JsonRequestBehavior.AllowGet);
        }


        public JsonResult HRISInsertPhoneInternetDet(string EmpHdr, string EmpData)
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            long Key = apiOpr.HRISInsertPhoneInternetDet(HTNSession.Environment, CKy, UsrKy, EmpHdr, EmpData);
            return Json(Key, JsonRequestBehavior.AllowGet);
        }
        public JsonResult HRISGetPhoneInternetDet(string EmpKy)
        {
            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;
            List<EmpPhoneDataModel> ProfDet = new List<EmpPhoneDataModel>();
            ProfDet = apiOpr.HRISGetPhoneInternetDet(HTNSession.Environment, UsrKy, CKy, EmpKy);
            return Json(ProfDet, JsonRequestBehavior.AllowGet);
        }

        public JsonResult HRISInsertAnnualPerDet(string EmpHdr, string EmpData, HttpPostedFileBase File)
        {
            //if (File != null && File.ContentLength > 0)
            //{
            //    // extract only the filename
            //    var fileName = Path.GetFileName(File.FileName);
            //    // store the file inside ~/App_Data/uploads folder
            //    var path = Path.Combine(Server.MapPath("~/App_Data/uploads"), fileName);
            //    File.SaveAs(path);
            //}
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            long Key = 0; // apiOpr.HRISInsertAnnualPerDet(HTNSession.Environment, CKy, UsrKy, EmpHdr, EmpData);
            return Json(Key, JsonRequestBehavior.AllowGet);
        }
        public JsonResult HRISGetAnnualPerDet(string EmpKy)
        {
            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;
            List<EmpPhoneDataModel> ProfDet = new List<EmpPhoneDataModel>();
            ProfDet = apiOpr.HRISGetAnnualPerDet(HTNSession.Environment, UsrKy, CKy, EmpKy);
            return Json(ProfDet, JsonRequestBehavior.AllowGet);
        }

        public JsonResult HRISGetCompanyDet(string CompanyKy)
        {
            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;
            List<CompanyDataModel> ProfDet = new List<CompanyDataModel>();
            ProfDet = apiOpr.HRISGetCompanyDet(HTNSession.Environment, UsrKy, CKy, CompanyKy);
            return Json(ProfDet, JsonRequestBehavior.AllowGet);
        }
    }
}
