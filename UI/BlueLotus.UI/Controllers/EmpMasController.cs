using BlueLotus.HRModel.Entity;
using BlueLotus.UI.ApiOperations;
using BlueLotus.UI.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace BlueLotus.UI.Controllers
{
    public class EmpMasController : Controller
    {
        //
        // GET: /EmpMas/

        ApiOperation apiOperation = new ApiOperation();

        //
        // GET: /EmpMas/

        public ActionResult Index(string OurCd, string OurCd2, string ObjKy, string ObjCaptn)
        {
            ViewBag.OurCd2 = OurCd2;
            ViewBag.OurCd = OurCd;
            ViewBag.ObjKy = ObjKy;
            ViewBag.ObjCaptn = ObjCaptn;

            return View();
        }

        public ActionResult EmpOtherDetails(string OurCd, string OurCd2, string ObjKy, string ObjCaptn)
        {
            ViewBag.OurCd2 = OurCd2;
            ViewBag.OurCd = OurCd;
            ViewBag.ObjKy = ObjKy;
            ViewBag.ObjCaptn = ObjCaptn;

            return View("EmpOtherDetails");
        }


        public JsonResult GetTypeOth()
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;

            List<EmpMasModel> GetType = new List<EmpMasModel>();
            GetType = apiOperation.GetTypeOth(CKy, UsrKy, HTNSession.Environment);

            return Json(GetType, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetTypeAdd()
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;

            List<EmpMasModel> GetType = new List<EmpMasModel>();
            GetType = apiOperation.GetTypeAdd(CKy, UsrKy, HTNSession.Environment);

            return Json(GetType, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetCodeOth(string ControlConKy)
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;

            List<EmpMasModel> GetCode = new List<EmpMasModel>();
            GetCode = apiOperation.GetCodeOth(CKy, UsrKy, ControlConKy, HTNSession.Environment);
            return Json(GetCode, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetCodeAD(string ConCd)
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;

            List<EmpMasModel> GetCode = new List<EmpMasModel>();
            GetCode = apiOperation.GetCodeAD(CKy, UsrKy, ConCd, HTNSession.Environment);
            return Json(GetCode, JsonRequestBehavior.AllowGet);
        }


        public JsonResult GetCountry()
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;

            List<EmpMasModel> Country = new List<EmpMasModel>();
            Country = apiOperation.GetCountry(CKy, UsrKy, HTNSession.Environment);

            return Json(Country, JsonRequestBehavior.AllowGet);
        }

        public JsonResult InsertEmployee(string EmpNo, string NIC, string EmployeeNm, string EPFNO, string GenderFM, string Religion, string Ethnic,
            string Date, string IsActive, string Street, string City, string State, string ZipCode, string Country, string Mobile,
            string Tel1, string Tel2, string Fax, string Email, string EmpOthe, string EmpAdd, string EmpDed)

        {
            byte Img;
            Img = 0;
            List<Emp> List = new List<Emp>();
            int CKy = HTNSession.CKy;
            if (Religion == "")
            {
                Religion = "1";
            }
            if (Ethnic == "")
            {
                Ethnic = "1";
            }
            //if(){

            //}
            DateTime BDate = System.DateTime.Now;
            if (Date != null)
            {
                string[] afdate = Date.Split('/');
                string Date1 = afdate.GetValue(0).ToString();
                string ddlfmonth = afdate.GetValue(1).ToString();
                string ddlfyear = afdate.GetValue(2).ToString();
                string sOrddate = ddlfyear + "/" + ddlfmonth + "/" + Date1;
                BDate = Convert.ToDateTime(sOrddate);
            }
            int UsrKy = HTNSession.UsrKy;
            long key = apiOperation.InsertEmp(UsrKy, CKy, EmpNo, EmployeeNm, EPFNO, NIC, BDate, GenderFM, Convert.ToInt32(Ethnic), Convert.ToInt32(Religion), Convert.ToByte(Img), Convert.ToInt32(IsActive), HTNSession.Environment, Street, City, State, ZipCode, Country, Mobile,
               Tel1, Tel2, Fax, Email, EmpOthe, EmpAdd, EmpDed);
            return Json(key, JsonRequestBehavior.AllowGet);
        }



        public JsonResult CheckEmployee(string EmpNo)
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            long Empkey = apiOperation.CheckEmployee(EmpNo, CKy, UsrKy, HTNSession.Environment);
            return Json(Empkey, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetEmpDetails(string EmpKy)

        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            List<EmpDetails> EmpDetails = new List<EmpDetails>();

            EmpDetails = apiOperation.EmpDetails(CKy, UsrKy, HTNSession.Environment, EmpKy);
            return Json(EmpDetails, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetAddrsDetails(string EmpKy)

        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            List<EmpDetails> AddrsDetails = new List<EmpDetails>();

            AddrsDetails = apiOperation.GetAddrsDetails(CKy, UsrKy, HTNSession.Environment, EmpKy);
            return Json(AddrsDetails, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetOtherDetails(string EmpKy, string GrpConCd)

        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            List<EmpMasModel> OtherDetails = new List<EmpMasModel>();

            OtherDetails = apiOperation.GetOtherDetails(CKy, UsrKy, HTNSession.Environment, EmpKy, GrpConCd);
            return Json(OtherDetails, JsonRequestBehavior.AllowGet);
        }

        public JsonResult InsertOtherDetails(string newRecords, string UpdtRecords)
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            List<EmpMasModel> OtherDetails = new List<EmpMasModel>();

            long Key = apiOperation.InsertOtherDetails(CKy, UsrKy, HTNSession.Environment, newRecords, UpdtRecords);
            return Json(Key, JsonRequestBehavior.AllowGet);
        }


    }
}
