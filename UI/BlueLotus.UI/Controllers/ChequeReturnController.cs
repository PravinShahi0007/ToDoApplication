using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using BlueLotus.ChequeReturn.Model;
using BlueLotus.UI.ApiOperations;
using BlueLotus.UI.Models;

namespace BlueLotus.UI.Controllers
{
    public class ChequeReturnController : Controller
    {
        //
        // GET: /ChequeReturn/
        ApiOperation apiOpr = new ApiOperation();
        public ActionResult ChequeReturn(string OurCd, string ObjCaptn, string ObjKy)
        {
            ViewBag.ObjCaptn = ObjCaptn;
            ViewBag.OurCd = OurCd;
            ViewBag.ObjKy = ObjKy;
            return View();
        }
        public JsonResult GetDetails(string JsonString,string ObjKy)
        {
            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;
            ChqueReturn ChqDetails = new ChqueReturn();
            ChqDetails = apiOpr.ChequeDetailReturn(HTNSession.Environment, CKy, UsrKy, JsonString, ObjKy);
            return Json(ChqDetails, JsonRequestBehavior.AllowGet);

        }

        public JsonResult InsertData(string Lino1, string Lino2, string ObjKy,string isUpdate,string trntypKy)
        {
            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;
            bool isupdate = isUpdate == "1";
            CheqSaveDetail SaveDetail = new CheqSaveDetail();
            SaveDetail = apiOpr.ChequeReturnInsert(HTNSession.Environment,  CKy,  UsrKy,  Lino1,  Lino2, isupdate,  trntypKy,  ObjKy);
            return Json(SaveDetail, JsonRequestBehavior.AllowGet);

        }

        public JsonResult SelectRecords(string TrnKy, string ObjKy)
        {
            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;
            List<ChqueReturn> SaveDetail = new List<ChqueReturn>();          
            SaveDetail = apiOpr.ChequeRetrunSelect(HTNSession.Environment, CKy, UsrKy, TrnKy, ObjKy);
            return Json(SaveDetail, JsonRequestBehavior.AllowGet);

        }

        public JsonResult UpdateData(string Lino1, string Lino2, string ObjKy, string isUpdate, string TrnKy){
            
            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;
            bool isupdate = isUpdate == "1";
            CheqSaveDetail SaveDetail = new CheqSaveDetail();
            SaveDetail = apiOpr.ChequeRetrunUpdate( CKy, UsrKy, ObjKy, Lino1, Lino2,  TrnKy,   HTNSession.Environment);
            return Json(SaveDetail, JsonRequestBehavior.AllowGet);

        }
    }
}
