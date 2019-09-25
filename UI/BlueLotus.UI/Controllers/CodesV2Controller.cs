using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using BlueLotus.UI.ApiOperations;
using BlueLotus.Codes.Model.Entity;
using BlueLotus.UI.Models;
using System.Threading.Tasks;
using BlueLotus.ComboLoad.Model;

namespace BlueLotus.UI.Controllers
{
    public class CodesV2Controller : Controller
    {
        //
        // GET: /Codes/               
        //

        CodesApiOperationV2 operation = new CodesApiOperationV2();
        
        public async Task<ActionResult> Index(string OurCd, string OurCd2, string ObjKy, string ObjCaptn)
        {
            ViewBag.ObjCaptn = ObjCaptn;
            ViewBag.OurCd = OurCd;
            ViewBag.ObjKy = ObjKy;

            return View("Index");
        }

        public async Task<ActionResult> GoToCodesTreeView(string OurCd, string OurCd2, string ObjKy, string ObjCaptn)
        {
            ViewBag.ObjCaptn = ObjCaptn;
            ViewBag.OurCd = OurCd;
            ViewBag.ObjKy = ObjKy;

            return View("GoToCodesTreeView");
        }

        public async Task<ActionResult> CdMasDiagram(string OurCd, string OurCd2, string ObjKy, string ObjCaptn)
        {
            ViewBag.ObjCaptn = ObjCaptn;
            ViewBag.OurCd = OurCd;
            ViewBag.ObjKy = ObjKy;

            return View("CdMasDiagram");
        }

        public async Task<ActionResult> CdMasCd(String ObjKy)
        {
            ViewBag.ObjKy = ObjKy;

            return View();
        }

        public async Task<JsonResult> CdMasCdTypLookup(int ObjKy, string TblNm)
        {
            int cky = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            
            List<CdMas> list = new List<CdMas>();
            list =await  operation.CdMasCdTypLookup(HTNSession.Environment, cky, UsrKy, ObjKy, TblNm);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public async Task<JsonResult> CdMas_LookupWebByConCd(string ConCd)
        {
            int cky = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            List<CdMas_LookupWebByConCd> list = new List<CdMas_LookupWebByConCd>();
            list =await  operation.CdMas_LookupWebByConCd(HTNSession.Environment, cky, UsrKy, ConCd);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public async Task<JsonResult> LoadGridView(int GrpCdKy, int CdKy, string ConCdGrid)
        {
            int cky = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            List<Codes_SelectModel> list = new List<Codes_SelectModel>();
            list =await  operation.LoadGridView(HTNSession.Environment, cky, UsrKy, GrpCdKy.ToString(), CdKy.ToString(), ConCdGrid);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public async Task<ActionResult> UpdateGrid(String GridUpdateDetail)
        {
            bool result = false;
            //Operation = new ToDoOperation();
            int cky = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            result =await  operation.UpdateGridCodeToCodes(HTNSession.Environment, GridUpdateDetail, cky, UsrKy);

            return Json(result, JsonRequestBehavior.AllowGet);
        }


        public async Task<ActionResult> GetAllCodes(int ObjKy, string ConCd)
        {
            List<CdMas> CodeList = new List<CdMas>();
            int cky = HTNSession.CKy; 
            int UsrKy = HTNSession.UsrKy;
            
            CodeList =await  operation.GetAllCodes(HTNSession.Environment, cky, UsrKy, ObjKy, ConCd);
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

        public async Task<ActionResult> GetAllConCodes(string ObjKy)
        {
            int Cky = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            List<string> CodeList = new List<string>();
            CodeList =await  operation.GetAllConCodes(HTNSession.Environment, Cky, UsrKy, Convert.ToInt32(ObjKy));
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

        public async Task<ActionResult> InsertUpdateCode(string updateAccmacc, string newAccmacc, string ConCd)
        {
            bool process = false;
            int cky = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;

            // Dont call each object from UI controller, Change the code to datalayer in API
            //foreach (CdMas model in list)
            //{
            process =await  operation.InsertUpdateCode(HTNSession.Environment, updateAccmacc, newAccmacc, ConCd, cky, UsrKy);
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

        public async Task<ActionResult> DeleteCode(int CdKy)
        {
            int UsrKy = HTNSession.UsrKy;
            //CdMas obj = new CdMas();
            //obj.CdKy = CdKy;
            //obj.TmStmp = operation.GetTimeStampByCdKy(CdKy);
            bool process = false;
            process =await  operation.DeleteCodes(HTNSession.Environment, CdKy, UsrKy);
            return Json(process, JsonRequestBehavior.AllowGet);
        }

        public async Task<ActionResult> GetCodeByCdKy(long CdKy)
        {
            int UsrKy = HTNSession.UsrKy;
            CdMas CodeObj = new CdMas();
            CodeObj =await  operation.GetCodeByCdKy(HTNSession.Environment, UsrKy, CdKy);
            return Json(CodeObj, JsonRequestBehavior.AllowGet);
        }

        private async Task<ActionResult> GetCdMasByCdKyGrid(int cdky)
        {
            CdMas obj = new CdMas();
            int UsrKy = HTNSession.UsrKy;
            obj =await  operation.GetCdMasByCdKy(HTNSession.Environment, cdky, UsrKy);
            return Json(obj, JsonRequestBehavior.AllowGet);
        }

        public async Task<CdMas> GetCdMasByCdKy(int cdky)
        {

            int UsrKy = HTNSession.UsrKy;
            CdMas obj = new CdMas();
            obj =await  operation.GetCdMasByCdKy(HTNSession.Environment, cdky, UsrKy);
            return obj;
        }

        public async Task<string> SetParntNm(long CdKy)
        {
            CdMas CodeObj = new CdMas();
            string name = "";
            int UsrKy = HTNSession.UsrKy;
            CodeObj =await  operation.GetCodeByCdKy(HTNSession.Environment, UsrKy, CdKy);
            if (CodeObj != null)
            {
                name = CodeObj.CdNm;
            }
            return name;
        }

        public async Task<long> GetCdKyByConCdAndOurCd(int ObjKy, string ConCd, string OurCd)
        {
            int cky = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;

            long cdKy =await  operation.GetCdKyByConCdAndOurCd(HTNSession.Environment, cky, UsrKy, ObjKy, ConCd, OurCd);
            
            return cdKy;
        }
        //public byte[] 

        public async Task<ActionResult> CheckCdMasForExist(string ConCd, string Code)
        {
            bool ststus = false;
            int Cky = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            List<CdMas> CodeList = new List<CdMas>();
            ststus =await  operation.CheckCdMasForExist(HTNSession.Environment, Cky, UsrKy, ConCd, Code);
            return Json(ststus, JsonRequestBehavior.AllowGet);
        }

        public async Task<ActionResult> GetCdMasBy_CdKy(int ObjKy, int CdKy)
        {
            CdMas ststus = new CdMas();
            int Cky = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            ststus = await  operation.GetCdMasBy_CdKy(HTNSession.Environment, Cky, UsrKy, ObjKy, CdKy);
            return Json(ststus, JsonRequestBehavior.AllowGet);
        }

        public async Task<JsonResult> CdMasdiagramData(string ConCd="BU")
        {
            int cky = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            List<CdMasdiagramModel> list = new List<CdMasdiagramModel>();
            list =await  operation.CdMasdiagram(HTNSession.Environment, cky, UsrKy, ConCd);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public async Task<JsonResult> Code_SelectMob(int ObjKy, int TrnTypKy, int PreKy)
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;

            List<Code_SelectMob> list = new List<Code_SelectMob>();
            list =await operation.Code_SelectMob(HTNSession.Environment, CKy, UsrKy, ObjKy, TrnTypKy, PreKy);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

       
        public async Task<JsonResult> CdNm_SelectMob(int ObjKy, int TrnTypKy, int PreKy)
        {
            string key = ObjKy.ToString() + TrnTypKy.ToString() + PreKy.ToString() ;
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
           // List<CdNm_SelectMob> list = new List<CdNm_SelectMob>();
            var list = HTNCache.GetCachedObject(key);
            if (list != null)
            {
                list = (List<CdNm_SelectMob>)list;

            }
            else
            {
                list = await operation.CdNm_SelectMob(HTNSession.Environment, CKy, UsrKy, ObjKy, TrnTypKy, PreKy);
                HTNCache.SetCachedObject(key, list, 10000);
            }
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public async Task<ActionResult> GetControlConKy(string TblNm, string OurCd)
        {
            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;
            long list =await operation.GetControlConKy(HTNSession.Environment, TblNm, OurCd, UsrKy, CKy);

            return Json(list, JsonRequestBehavior.AllowGet);

        }

        public async Task<JsonResult> GetCat8ByCat7_SelectWeb(int Cat7Ky)
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;

            List<CdNm_SelectMob> list = new List<CdNm_SelectMob>();
            list =await operation.GetCat8ByCat7_SelectWeb(HTNSession.Environment, CKy, UsrKy, Cat7Ky);
            return Json(list, JsonRequestBehavior.AllowGet);
        }




    }
}

