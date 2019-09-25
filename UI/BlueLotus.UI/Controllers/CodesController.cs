using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using BlueLotus.UI.ApiOperations;
using BlueLotus.Codes.Model.Entity;
using BlueLotus.UI.Models;

namespace BlueLotus.UI.Controllers
{
    public class CodesController : Controller
    {
        //
        // GET: /Codes/               
        //

        ApiOperation operation = new ApiOperation();

        enum prifix
        {
            CdID,
            CdNm,
            BUNm,
            BUCode,

        }
        public ActionResult Index(string OurCd, string OurCd2, string ObjKy, string ObjCaptn)
        {
            ViewBag.ObjCaptn = ObjCaptn;
            ViewBag.OurCd = OurCd;
            ViewBag.ObjKy = ObjKy;

            return View("Index");
        }

        public ActionResult GoToCodesTreeView(string OurCd, string OurCd2, string ObjKy, string ObjCaptn)
        {
            ViewBag.ObjCaptn = ObjCaptn;
            ViewBag.OurCd = OurCd;
            ViewBag.ObjKy = ObjKy;

            return View("GoToCodesTreeView");
        }

        public ActionResult CdMasDiagram(string OurCd, string OurCd2, string ObjKy, string ObjCaptn)
        {
            ViewBag.ObjCaptn = ObjCaptn;
            ViewBag.OurCd = OurCd;
            ViewBag.ObjKy = ObjKy;

            return View("CdMasDiagram");
        }

        public ActionResult CdMasCd(String ObjKy)
        {
            ViewBag.ObjKy = ObjKy;

            return View();
        }

        public JsonResult CdMasCdTypLookup(int ObjKy, string TblNm)
        {
            int cky = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;

            List<CdMas> list = new List<CdMas>();
            list = operation.CdMasCdTypLookup(HTNSession.Environment, cky, UsrKy, ObjKy, TblNm);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult CdMas_LookupWebByConCd(string ConCd)
        {
            int cky = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            List<CdMas_LookupWebByConCd> list = new List<CdMas_LookupWebByConCd>();
            list = operation.CdMas_LookupWebByConCd(HTNSession.Environment, cky, UsrKy, ConCd);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult LoadGridView(int GrpCdKy, int CdKy, string ConCdGrid)
        {
            int cky = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            List<Codes_SelectModel> list = new List<Codes_SelectModel>();
            list = operation.LoadGridView(HTNSession.Environment, cky, UsrKy, GrpCdKy.ToString(), CdKy.ToString(), ConCdGrid);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public ActionResult UpdateGrid(String GridUpdateDetail)
        {
            bool result = false;
            //Operation = new ToDoOperation();
            int cky = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            result = operation.UpdateGridCodeToCodes(HTNSession.Environment, GridUpdateDetail, cky, UsrKy);

            return Json(result, JsonRequestBehavior.AllowGet);
        }


        public ActionResult GetAllCodes(int ObjKy, string ConCd)
        {
            List<CdMas> CodeList = new List<CdMas>();
            int cky = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;

            CodeList = operation.GetAllCodes(HTNSession.Environment, cky, UsrKy, ObjKy, ConCd);
            //if (CodeList != null)
            //{
            //    CodeList = CodeList.Where(a => a.Code != a.ConCd).ToList<CdMas>();
            //    foreach (CdMas obj in CodeList)
            //    {
            //        long val = Convert.ToInt64(obj.PrntKy);
            //        obj.prntNm = this.SetParntNm(val);
            //        int acclvlky = Convert.ToInt32(obj.AcsLvlKy);
            //        CdMas acl = this.GetCdMasByCdKy(acclvlky);
            //        obj.accLvlNm = acl.CdNm;
            //        int coflkey = Convert.ToInt32(obj.ConFinLvlKy);
            //        CdMas conlvl = this.GetCdMasByCdKy(coflkey);
            //        obj.conLvlNm = conlvl.CdNm;
            //    }
            //}
            return Json(CodeList, JsonRequestBehavior.AllowGet);
        }

        public ActionResult GetAllConCodes(string ObjKy)
        {
            int Cky = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            List<string> CodeList = new List<string>();
            CodeList = operation.GetAllConCodes(HTNSession.Environment, Cky, UsrKy, Convert.ToInt32(ObjKy));
            if (ObjKy.Equals("3462"))
            {
                var codelist=CodeList.Where(x => x.Equals("", StringComparison.InvariantCultureIgnoreCase) ||
              x.Equals("Prio", StringComparison.InvariantCultureIgnoreCase) ||
              x.Equals("AprSts", StringComparison.InvariantCultureIgnoreCase) ||
               x.Equals("PrcsTyp", StringComparison.InvariantCultureIgnoreCase));
                return Json(codelist, JsonRequestBehavior.AllowGet);
            }
            return Json(CodeList, JsonRequestBehavior.AllowGet);
        }

        //public ActionResult InsertCode(List<CdMas> list, string ConCd)
        //{
        //    bool process = false;
        //    int cky = HTNSession.CKy;
        //    int UsrKy = HTNSession.UsrKy;

        //    // Dont call each object from UI controller, Change the code to datalayer in API
        //    //foreach (CdMas model in list)
        //    //{
        //    process = operation.InsertCode(HTNSession.Environment, list, ConCd, cky, UsrKy);
        //    //}
        //    return Json(process, JsonRequestBehavior.AllowGet);
        //}

        public ActionResult InsertUpdateCode(string updateAccmacc, string newAccmacc, string ConCd, string IsPrntChng, string objKy)
        {

            bool process = false;
            int cky = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;

            // Dont call each object from UI controller, Change the code to datalayer in API
            //foreach (CdMas model in list)
            //{
            process = operation.InsertUpdateCode(HTNSession.Environment, updateAccmacc, newAccmacc, ConCd, cky, UsrKy, IsPrntChng, objKy);
            if (process)
            {
                HTNCache.ClearCacheItems(prifix.CdID.ToString(), "CKy:" + cky.ToString());
                HTNCache.ClearCacheItems(prifix.CdNm.ToString(), "CKy:" + cky.ToString());
                HTNCache.ClearCacheItems(prifix.BUCode.ToString(), "CKy:" + cky.ToString());
                HTNCache.ClearCacheItems(prifix.BUNm.ToString(), "CKy:" + cky.ToString());
            }
            //}
            return Json(process, JsonRequestBehavior.AllowGet);
        }


        //public ActionResult UpdateCode(List<CdMas> list)
        //{
        //    bool process = false;

        //    int UsrKy = HTNSession.UsrKy;

        //    //foreach (CdMas obj in list)
        //    //{
        //        //obj.TmStmp = operation.GetTimeStampByCdKy(obj.CdKy);
        //        //obj.TmStmpExt = operation.GetTimeStampExtByCdKy(obj.CdKy);
        //    process = operation.UpdateCode(HTNSession.Environment, list, UsrKy);
        //    //}
        //    return Json(process, JsonRequestBehavior.AllowGet);
        //}

        public ActionResult DeleteCode(int CdKy)
        {
            int UsrKy = HTNSession.UsrKy;
            //CdMas obj = new CdMas();
            //obj.CdKy = CdKy;
            //obj.TmStmp = operation.GetTimeStampByCdKy(CdKy);
            bool process = false;
            process = operation.DeleteCodes(HTNSession.Environment, CdKy, UsrKy);
            return Json(process, JsonRequestBehavior.AllowGet);
        }

        public ActionResult GetCodeByCdKy(long CdKy)
        {
            int UsrKy = HTNSession.UsrKy;
            CdMas CodeObj = new CdMas();
            CodeObj = operation.GetCodeByCdKy(HTNSession.Environment, UsrKy, CdKy);
            return Json(CodeObj, JsonRequestBehavior.AllowGet);
        }

        private ActionResult GetCdMasByCdKyGrid(int cdky)
        {
            CdMas obj = new CdMas();
            int UsrKy = HTNSession.UsrKy;
            obj = operation.GetCdMasByCdKy(HTNSession.Environment, cdky, UsrKy);
            return Json(obj, JsonRequestBehavior.AllowGet);
        }

        public CdMas GetCdMasByCdKy(int cdky)
        {

            int UsrKy = HTNSession.UsrKy;
            CdMas obj = new CdMas();
            obj = operation.GetCdMasByCdKy(HTNSession.Environment, cdky, UsrKy);
            return obj;
        }

        public string SetParntNm(long CdKy)
        {
            CdMas CodeObj = new CdMas();
            string name = "";
            int UsrKy = HTNSession.UsrKy;
            CodeObj = operation.GetCodeByCdKy(HTNSession.Environment, UsrKy, CdKy);
            if (CodeObj != null)
            {
                name = CodeObj.CdNm;
            }
            return name;
        }

        public long GetCdKyByConCdAndOurCd(int ObjKy, string ConCd, string OurCd)
        {
            int cky = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;

            long cdKy = operation.GetCdKyByConCdAndOurCd(HTNSession.Environment, cky, UsrKy, ObjKy, ConCd, OurCd);

            return cdKy;
        }
        //public byte[] 

        public ActionResult CheckCdMasForExist(string ConCd, string Code)
        {
            bool ststus = false;
            int Cky = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            List<CdMas> CodeList = new List<CdMas>();
            ststus = operation.CheckCdMasForExist(HTNSession.Environment, Cky, UsrKy, ConCd, Code);
            return Json(ststus, JsonRequestBehavior.AllowGet);
        }

        public ActionResult GetCdMasBy_CdKy(int ObjKy, int CdKy)
        {
            CdMas ststus = new CdMas();
            int Cky = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            ststus = operation.GetCdMasBy_CdKy(HTNSession.Environment, Cky, UsrKy, ObjKy, CdKy);
            return Json(ststus, JsonRequestBehavior.AllowGet);
        }

        public JsonResult CdMasdiagramData(string ConCd = "BU")
        {
            int cky = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            List<CdMasdiagramModel> list = new List<CdMasdiagramModel>();
            list = operation.CdMasdiagram(HTNSession.Environment, cky, UsrKy, ConCd);
            return Json(list, JsonRequestBehavior.AllowGet);
        }
    }
}

