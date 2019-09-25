using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using BlueLotus.ViewModel.Entity;
using BlueLotus.UI.ApiOperations;
using BlueLotus.UI.Models;
using BlueLotus.TransactionModel.Entity;
using System.Web.Configuration;
using System.IO;

namespace BlueLotus.UI.Controllers
{
    public class AddressEntryController : Controller
    {
        //
        // GET: /Address/
        //

        ApiOperation apiOpr = new ApiOperation();
        
        public ActionResult AddressIndex(string OurCd, int ObjKy, string ObjCaptn)
        {
            ViewBag.MyString = OurCd;
            ViewBag.ObjKy = ObjKy;
            ViewBag.ObjCaptn = ObjCaptn;

            return View("AddressEntry");
        }
         public ActionResult AddEntryPop(string OurCd, int ObjKy, string ObjCaptn)
        {
            ViewBag.MyString = OurCd;
            ViewBag.ObjKy = ObjKy;
            ViewBag.ObjCaptn = ObjCaptn;

            return View("AddressEntrypopUp");

        }

        public JsonResult GetAddressEntry(string ObjKy, string PageNo, string PageSize, string AdrId, string AdrNm)
        {
            int cKy = HTNSession.CKy;
            int usrKy = HTNSession.UsrKy;

            List<AddressGridModel> list = new List<AddressGridModel>();
            list = apiOpr.GetAddressEntry(HTNSession.Environment, cKy, usrKy, ObjKy, PageNo, PageSize, AdrId, AdrNm);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult InsertAddressGrid(string newAdr, string deletedAdr)
        {

            int cKy = HTNSession.CKy;
            int usrKy = HTNSession.UsrKy;

            bool msg = apiOpr.InsertAddressGrid(HTNSession.Environment, cKy, usrKy, newAdr, deletedAdr);
            if (msg)
            {
                HTNCache.ClearCacheItems("AdrID", "CKy:" + cKy.ToString());
                HTNCache.ClearCacheItems("AdrNm", "CKy:" + cKy.ToString());
            }
            return Json(msg, JsonRequestBehavior.AllowGet);
        }

        public JsonResult UpdateAddressGrid(string updatedAdr)
        {
            int cKy = HTNSession.CKy;
            int usrKy = HTNSession.UsrKy;

            bool msg = apiOpr.UpdateAddressGrid(HTNSession.Environment, cKy, usrKy, updatedAdr);
            if (msg)
            {
                HTNCache.ClearCacheItems("AdrID", "CKy:" + cKy.ToString());
                HTNCache.ClearCacheItems("AdrNm", "CKy:" + cKy.ToString());
            }
            return Json(msg, JsonRequestBehavior.AllowGet);
        }

        public JsonResult DeleteAddress(long key)
        {
            int cKy = HTNSession.CKy;
            int usrKy = HTNSession.UsrKy;

            bool result = apiOpr.DeleteAddress(HTNSession.Environment, cKy, usrKy, key);
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetAdressTyp()
        {
            int cKy = HTNSession.CKy;
            int usrKy = HTNSession.UsrKy;

            List<AdrTypModel> AdrTypList = apiOpr.GetAdressTyp(HTNSession.Environment, cKy, usrKy);
            return Json(AdrTypList, JsonRequestBehavior.AllowGet);
        }
        
        public JsonResult UpdateAdressType(int AdrKy,int AdrTypKy)
        {
            int cKy = HTNSession.CKy;
            int usrKy = HTNSession.UsrKy;

            bool msg = apiOpr.UpdateAdressType(HTNSession.Environment, cKy, usrKy,AdrKy,AdrTypKy);
            return Json(msg, JsonRequestBehavior.AllowGet);
        }
        
        public JsonResult GetIsCompanyList()
        {
            int cKy = HTNSession.CKy;
            int usrKy = HTNSession.UsrKy;

            List<IsCompanyModel> isCmpList = apiOpr.GetIsCompanyList(HTNSession.Environment, cKy, usrKy);
            return Json(isCmpList, JsonRequestBehavior.AllowGet);
        }

        public JsonResult InsertOptAdrTyp(int AdrKy,string optArry,string optDelArry, string ObjKy)
        {
            int cKy = HTNSession.CKy;
            int usrKy = HTNSession.UsrKy;

            bool msg = apiOpr.InsertOptAdrTyp(HTNSession.Environment, cKy, usrKy,AdrKy, optArry,  optDelArry,  ObjKy);
            return Json(msg, JsonRequestBehavior.AllowGet);
        }
        public JsonResult CurrentAdrTyps(int AdrKy,string ObjKy)
        {
            int cKy = HTNSession.CKy;
            int usrKy = HTNSession.UsrKy;

            List<AdrMasCdModel> msg = apiOpr.CurrentAdrTyps(HTNSession.Environment, cKy, usrKy, AdrKy, ObjKy);
            return Json(msg, JsonRequestBehavior.AllowGet);
        }

        public JsonResult InsertConDetail(int AdrKy, string DetailsArray, string DetailsUpdateArray, string ObjKy)
        {
            int cKy = HTNSession.CKy;
            int usrKy = HTNSession.UsrKy;

            bool msg = apiOpr.InsertConDetail(HTNSession.Environment, cKy, usrKy, AdrKy, DetailsArray,  DetailsUpdateArray,ObjKy);
            return Json(msg, JsonRequestBehavior.AllowGet);
        }

        public JsonResult ItmAdr_InsertUpdateWeb(int AdrKy, int ItmKy,int ItmAdrKy)
        {
            int cKy = HTNSession.CKy;
            int usrKy = HTNSession.UsrKy;

            int insert = apiOpr.ItmAdr_InsertUpdateWeb(HTNSession.Environment, cKy, usrKy, AdrKy, ItmKy, ItmAdrKy);
            return Json(insert, JsonRequestBehavior.AllowGet);
        }


        public JsonResult ItmAdr_SelectWeb( int ItmKy)
        {
            int cKy = HTNSession.CKy;
            int usrKy = HTNSession.UsrKy;

            List<ItmModel> insert = apiOpr.ItmAdr_SelectWeb(HTNSession.Environment, cKy, usrKy,  ItmKy);
            return Json(insert, JsonRequestBehavior.AllowGet);
        }

        public ActionResult AddressMas(string OurCd, int ObjKy, string ObjCaptn)
        {
            ViewBag.MyString = OurCd;
            ViewBag.ObjKy = ObjKy;
            ViewBag.ObjCaptn = ObjCaptn;

            return View("AddressEntry");
        }
        public ActionResult InsertFileswithpath(IEnumerable<HttpPostedFileBase> Image)
        {
            bool isExsit = true;
            string res = "";
            string attachmentName = null;
            string stringImage = null;
            List<TrnHdrDocModel> lst = new List<TrnHdrDocModel>();
            foreach (string upload in Request.Files)
            {                
                string path = WebConfigurationManager.AppSettings[@"serverPath"];
                isExsit = Directory.Exists(path);                
                string filename = Path.GetFileName(Request.Files[upload].FileName);
                TrnHdrDocModel obj = new TrnHdrDocModel();
                string strFilePath = path + filename;
                obj.FileNm = filename;
                obj.FilePath = path;
                lst.Add(obj);
                if (isExsit)
                {
                    Request.Files[upload].SaveAs(Path.Combine(path, filename));
                    
                }
            }
            return Json(lst, JsonRequestBehavior.AllowGet);
        }
    }

}
