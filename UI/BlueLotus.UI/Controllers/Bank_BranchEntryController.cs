using BlueLotus.ItmMas.Model.Entity;
using BlueLotus.UI.ApiOperations;
using BlueLotus.UI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace BlueLotus.UI.Controllers
{
    public class Bank_BranchEntryController : Controller
    {
        ApiOperation apiOpr = new ApiOperation();
        
        public ActionResult Bank_BranchEntry(string OurCd, string OurCd2, int ObjKy, string ObjCaptn)
        {
            ViewBag.OurCd = OurCd;
            ViewBag.OurCd2 = OurCd2;
            ViewBag.ObjKy = ObjKy;
            ViewBag.ObjCaptn = ObjCaptn;

            return View();
        }


        //BankEntry Section
        public JsonResult SaveBankEntry(string ObjKy, string updatedBank, string deletedBank, string insertBank)
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            try
            {
                apiOpr.BnkMas_InsertWeb(HTNSession.Environment, CKy, UsrKy, Convert.ToInt32(ObjKy), insertBank);
                apiOpr.BnkMas_UpdateWeb(HTNSession.Environment, CKy, UsrKy, Convert.ToInt32(ObjKy), updatedBank);
                apiOpr.BnkMas_DeleteWeb(HTNSession.Environment, CKy, UsrKy, Convert.ToInt32(ObjKy), deletedBank);

                return Json("success", JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                throw;
            }
        }
        public JsonResult BnkMas_SelectWeb(string ObjKy)
        {
            List<BankEntryModel> listBankEntry = new List<BankEntryModel>();

            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            

            listBankEntry = apiOpr.BnkMas_SelectWeb(HTNSession.Environment, CKy, UsrKy, Convert.ToInt32(ObjKy));

            return Json(listBankEntry, JsonRequestBehavior.AllowGet);
        }

        //BranchEntry section
        public JsonResult SaveBranchEntry(string ObjKy, string BnkKy, string updatedBranch, string deletedBranch, string insertBranch)
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            try
            {
                apiOpr.BrnMas_InsertWeb(HTNSession.Environment, CKy, UsrKy, Convert.ToInt32(ObjKy), Convert.ToInt32(BnkKy), insertBranch);
                apiOpr.BrnMas_UpdateWeb(HTNSession.Environment, CKy, UsrKy, Convert.ToInt32(ObjKy),Convert.ToInt32(BnkKy), updatedBranch);
                apiOpr.BrnMas_DeleteWeb(HTNSession.Environment, CKy, UsrKy, Convert.ToInt32(ObjKy),Convert.ToInt32(BnkKy), deletedBranch);

                return Json("success", JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                throw;
            }
        }
        public JsonResult BrnMas_SelectWeb(string ObjKy, int BnkKy)
        {
            List<BranchEntry> listBranchEntry = new List<BranchEntry>();

            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            

            listBranchEntry = apiOpr.BrnMas_SelectWeb(HTNSession.Environment, CKy, UsrKy, Convert.ToInt32(ObjKy), Convert.ToInt32(BnkKy));

            return Json(listBranchEntry, JsonRequestBehavior.AllowGet);
        }
    }
}
