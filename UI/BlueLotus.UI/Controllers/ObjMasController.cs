using BlueLotus.ObjMas.Model;
using BlueLotus.UI.ApiOperations;
using BlueLotus.UI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace BlueLotus.UI.Controllers
{
    public class ObjMasController : Controller
    {
        ApiOperation apiOpr = new ApiOperation();

        //
        // GET: /ObjMas/

        public ActionResult Index()
        {
            return View();
        }

        //UsrObjPrp_UpdateWeb
        public JsonResult UsrObjPrp_UpdateWeb(string updateObjMasStringList)
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            
            bool list = apiOpr.UsrObjPrp_UpdateWeb(HTNSession.Environment, CKy, UsrKy, updateObjMasStringList);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult UsrObjPrp_SelectWeb(string PrntKy, string ObjTyp, string ObjNm)
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;

            List<ObjMasModel> list = new List<ObjMasModel>();
            list = apiOpr.UsrObjPrp_SelectWeb(HTNSession.Environment, CKy, UsrKy, PrntKy, ObjTyp, ObjNm);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        //cache this
        public JsonResult UsrObjPrp_SelectDeepSearchWeb(string PrntKy, string ObjTyp, string ObjNm)
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;

            List<ObjMasModel> list = new List<ObjMasModel>();


            string key = "ObjMas" + "-" + "PrntKy " + PrntKy.ToString() +":"+ ObjTyp + ObjNm+"-"+"Cky:"+ CKy.ToString()+"-"+ UsrKy.ToString();
            var objList = HTNCache.GetCachedObject(key);

            if (objList != null)
            {
                list = (List<ObjMasModel>)objList;
            }

            if (objList == null)
            {
                list = apiOpr.UsrObjPrp_SelectWeb(HTNSession.Environment, CKy, UsrKy, PrntKy, ObjTyp, ObjNm, true);
                HTNCache.SetCachedObject(key, list, 3600);
            }
           

            foreach (ObjMasModel ob in list)
            {
                if(ob.isFirstFocusObj == 1)
                {
                    int x = 10;
                }
            }

            return Json(list, JsonRequestBehavior.AllowGet);
        }
        //have to cache
        public JsonResult UsrObjPrp_SelectAllLastChildWeb(string PrntKy)
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;

            List<ObjMasModel> list = new List<ObjMasModel>();

            string key = "ObjMas" + "-" + "PrntKy " + PrntKy.ToString()+"-" + "CKy:" + CKy.ToString()+"-"+ UsrKy.ToString();
            var objList = HTNCache.GetCachedObject(key);

            if (objList != null)
            {
                list = (List<ObjMasModel>)objList;
            }

            if (objList == null)
            {
                list = apiOpr.UsrObjPrp_SelectAllLastChildWeb(HTNSession.Environment, CKy, UsrKy, PrntKy);
                HTNCache.SetCachedObject(key, list, 3600);
            }
          
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult UsrObjChild_SelectByPrntandSubObjTypWeb(string PrntKy, string ObjTyp, string ObjNm)
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;

            List<ObjMasModel> list = new List<ObjMasModel>();
            list = apiOpr.UsrObjChild_SelectByPrntandSubObjTypWeb(HTNSession.Environment, CKy, UsrKy, PrntKy, ObjTyp, ObjNm);
            return Json(list, JsonRequestBehavior.AllowGet);
        }


        //UsrObjSec_SelectWeb  have to cache
        public JsonResult UsrObjSec_SelectWeb(string PrntKy, string ObjTyp, string ObjNm)
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;

            List<ObjMasModel> list = new List<ObjMasModel>();

            string key = "ObjMasObjSec" + "-" + "PrntKy " + PrntKy.ToString()+":"+ ObjTyp + ObjNm+"-" + "Cky:" +CKy.ToString()+"-" + UsrKy.ToString();
            var objList = HTNCache.GetCachedObject(key);

            if (objList != null)
            {
                list = (List<ObjMasModel>)objList;
            }

            if (objList == null)
            {
                list = apiOpr.UsrObjSec_SelectWeb(HTNSession.Environment, CKy, UsrKy, PrntKy, ObjTyp, ObjNm);
                HTNCache.SetCachedObject(key, list, 3600);
            }




           
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult UsrObjPrp_SelectMulti(string ObjKy)
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            List<List<ObjMasModel>> list = new List<List<ObjMasModel>>();

            if (Convert.ToInt32(ObjKy) > 10)
                list = apiOpr.UsrObjPrp_SelectMulti(HTNSession.Environment, Convert.ToInt32(ObjKy), CKy, UsrKy);

            return Json(list, JsonRequestBehavior.AllowGet);
        }
        // New ObjMas Function 
        public JsonResult GetAllRecodesFormObjMas(int PrntKy)
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            List<ObjMasModel> list = new List<ObjMasModel>();
            list = apiOpr.GetAllRecodesFormUsrObjMas_SelectWeb(HTNSession.Environment, CKy, UsrKy, PrntKy);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

    }
}
