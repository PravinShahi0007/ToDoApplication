using BlueLotus.UI.ApiOperations;
using BlueLotus.UI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using TransactionModel.Entity;

namespace BlueLotus.UI.Controllers
{
    public class EditButtonController : Controller
    {
        ApiOperation apiOpr = new ApiOperation();

        // GET: EditButton
        //Created a new Controller for Edit button Action since this is a new function 
        //Writing According to Solid Principal
        public JsonResult EditButtonlockValidation(int OrdKy,string TblNm)
        {
            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;
            string EnvironmentName = HTNSession.Environment;

            TransactionLockStatus result = apiOpr.EditButtonlockValidation(CKy, UsrKy, OrdKy, EnvironmentName,  TblNm);
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        public JsonResult EditButton_UnlockWeb(int OrdKy, string TblNm)
        {
            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;
            string EnvironmentName = HTNSession.Environment;

            bool result = apiOpr.OrdHdr_UnlockWeb(CKy, UsrKy, OrdKy, EnvironmentName,  TblNm);
            return Json(result, JsonRequestBehavior.AllowGet);
        }

    }
}