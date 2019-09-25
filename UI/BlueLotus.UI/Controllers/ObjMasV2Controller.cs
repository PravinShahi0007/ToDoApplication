using BlueLotus.ObjMas.Model;
using BlueLotus.UI.ApiOperations;
using BlueLotus.UI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;

namespace BlueLotus.UI.Controllers
{
    public class ObjMasV2Controller : Controller
    {
        ObjMasApiOperationV2 apiOpr = new ObjMasApiOperationV2();

        //
        // GET: /ObjMas/

        public ActionResult Index()
        {
            return View();
        }

        //UsrObjPrp_UpdateWeb
        public async Task<JsonResult> UsrObjPrp_UpdateWeb(string updateObjMasStringList)
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            
            bool list =await  apiOpr.UsrObjPrp_UpdateWeb(HTNSession.Environment, CKy, UsrKy, updateObjMasStringList);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public async Task<JsonResult> UsrObjPrp_SelectWeb(string PrntKy, string ObjTyp, string ObjNm)
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;

            List<ObjMasModel> list = new List<ObjMasModel>();
            list =await  apiOpr.UsrObjPrp_SelectWeb(HTNSession.Environment, CKy, UsrKy, PrntKy, ObjTyp, ObjNm);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public async Task<JsonResult> UsrObjPrp_SelectDeepSearchWeb(string PrntKy, string ObjTyp, string ObjNm)
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;

            List<ObjMasModel> list = new List<ObjMasModel>();
            string key = "objMas" + PrntKy+ ObjTyp+ ObjNm;
            var itmList = HTNCache.GetCachedObject(key);
            if (itmList != null)
            {
                list = (List<ObjMasModel>)itmList;

            }
            else
            {
                list = await apiOpr.UsrObjPrp_SelectWeb(HTNSession.Environment, CKy, UsrKy, PrntKy, ObjTyp, ObjNm, true);
                HTNCache.SetCachedObject(key, list, 10000);
            }


            //foreach (ObjMasModel ob in list)
            //{
            //    if(ob.isFirstFocusObj == 1)
            //    {
            //        int x = 10;
            //    }
            //}

            return Json(list, JsonRequestBehavior.AllowGet);
        }
        [OutputCache(Duration = 10, VaryByParam = "none")]
        public async Task<JsonResult> UsrObjPrp_SelectAllLastChildWeb(string PrntKy)
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;

            List<ObjMasModel> list = new List<ObjMasModel>();
            //string key ="objMas"+ PrntKy;
            //var itmList = HTNCache.GetCachedObject(key);
            //if (itmList != null)
            //{
            //    list = (List<ObjMasModel>)itmList;

            //}
            //else
            //{
                list = await apiOpr.UsrObjPrp_SelectAllLastChildWeb(HTNSession.Environment, CKy, UsrKy, PrntKy);
            //    HTNCache.SetCachedObject(key, list, 500);
            //}
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public async Task<JsonResult> UsrObjChild_SelectByPrntandSubObjTypWeb(string PrntKy, string ObjTyp, string ObjNm)
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;

            List<ObjMasModel> list = new List<ObjMasModel>();
            list =await  apiOpr.UsrObjChild_SelectByPrntandSubObjTypWeb(HTNSession.Environment, CKy, UsrKy, PrntKy, ObjTyp, ObjNm);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        //UsrObjSec_SelectWeb
        public async Task<JsonResult> UsrObjSec_SelectWeb(string PrntKy, string ObjTyp, string ObjNm)
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;

            List<ObjMasModel> list = new List<ObjMasModel>();
            list =await  apiOpr.UsrObjSec_SelectWeb(HTNSession.Environment, CKy, UsrKy, PrntKy, ObjTyp, ObjNm);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public async Task<JsonResult> UsrObjPrp_SelectMulti(string ObjKy)
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            List<List<ObjMasModel>> list = new List<List<ObjMasModel>>();

            if (Convert.ToInt32(ObjKy) > 10)
                list =await  apiOpr.UsrObjPrp_SelectMulti(HTNSession.Environment, Convert.ToInt32(ObjKy), CKy, UsrKy);

            return Json(list, JsonRequestBehavior.AllowGet);
        }

    }
}
