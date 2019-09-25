using BlueLotus.ComboLoad.Model;

using BlueLotus.UI.ApiOperations;
using BlueLotus.UI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Threading.Tasks;

namespace BlueLotus.UI.Controllers
{
    public class ComboLoadController : Controller
    {
        //
        // GET: /ComboLoad/

        AsynApiOperations apiOpr = new AsynApiOperations();

        enum prefix
        {
            ItmID,
            ItmNm,
            PrjID,
            PrjNm,
            AccID,
            AccNm,
            AdrID,
            AdrNm,
            Code,
            CdNm,
            TskID,
            TskNm,
            AccNmTyp
        }
        public async Task<JsonResult> AccCd_SelectMob(int ObjKy, int TrnTypKy, int PreKy)
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            List<AccCd_SelectMob> list = new List<AccCd_SelectMob>();
            string key = prefix.AccID+"-"+ "ObjKy " + ObjKy.ToString() +":"+ TrnTypKy + PreKy +"-CKy:" +CKy;
            var AccIDlist = HTNCache.GetCachedObject(key);

            if (AccIDlist != null)
            {
                list = (List<AccCd_SelectMob>)AccIDlist;
            }
            else
            {
                list = await apiOpr.AccCd_SelectMob(HTNSession.Environment, CKy, UsrKy, ObjKy, TrnTypKy, PreKy);
                HTNCache.SetCachedObject(key, list, 3600);
            }
            var newlist = HTNCache.GetCacheItems();
            
            return Json(list, JsonRequestBehavior.AllowGet);
        }
        

        public async Task<JsonResult> AccNm_SelectMob(int ObjKy, int TrnTypKy, int PreKy)
        {

            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;

            List<AccNm_SelectMob> list = new List<AccNm_SelectMob>();
            string key = prefix.AccNm +"-"+ "ObjKy " + ObjKy.ToString() +":"+ TrnTypKy + PreKy + "-CKy:"+CKy;
            bool result = key.Contains(prefix.AccNm.ToString()) && key.Contains(CKy.ToString());
            var AccNmlist = HTNCache.GetCachedObject(key);
            if (AccNmlist != null)
            {
                list = (List<AccNm_SelectMob>)AccNmlist;
            }
            else
            {
                list = await apiOpr.AccNm_SelectMob(HTNSession.Environment, CKy, UsrKy, ObjKy, TrnTypKy, PreKy);
                HTNCache.SetCachedObject(key, list, 3600);
            }
           
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public async Task<JsonResult> AccNmTyp_SelectMob(int ObjKy, int TrnTypKy, int PreKy)
        {

            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;

            List<AccNmTyp_SelectMob> list = new List<AccNmTyp_SelectMob>();
            string key = prefix.AccNmTyp + "-" + "ObjKy " + ObjKy.ToString() + ":" + TrnTypKy + PreKy + "-CKy:" + CKy;
            bool result = key.Contains(prefix.AccNmTyp.ToString()) && key.Contains(CKy.ToString());
            var AccNmTyplist = HTNCache.GetCachedObject(key);
            if (AccNmTyplist != null)
            {
                list = (List<AccNmTyp_SelectMob>)AccNmTyplist;
            }
            else
            {
                list = await apiOpr.AccNmTyp_SelectMob(HTNSession.Environment, CKy, UsrKy, ObjKy, TrnTypKy, PreKy);
                HTNCache.SetCachedObject(key, list, 3600);
            }

            return Json(list, JsonRequestBehavior.AllowGet);
        }


        public async Task<JsonResult> AdrID_SelectMob(int ObjKy, int TrnTypKy, int PreKy)
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;

            string key = prefix.AdrID +"-"+ "ObjKy "+ObjKy.ToString() +":"+ TrnTypKy + PreKy + "-CKy:"+ CKy;
            List<AdrID_SelectMob> list = new List<AdrID_SelectMob>();
            var AdrIDList = HTNCache.GetCachedObject(key);
            if (AdrIDList != null)
            {
                list = (List<AdrID_SelectMob>)AdrIDList;
            }
            else
            {
                list = await apiOpr.AdrID_SelectMob(HTNSession.Environment, CKy, UsrKy, ObjKy, TrnTypKy, PreKy);
                HTNCache.SetCachedObject(key, list, 3600);
            }
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public async Task<JsonResult> AdrNm_SelectMob(int ObjKy, int TrnTypKy, int PreKy)
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;

            List<AdrNm_SelectMob> list = new List<AdrNm_SelectMob>();
            string key = prefix.AdrNm +"-"+ "ObjKy " + ObjKy.ToString()+":"+ TrnTypKy + PreKy + "-CKy:"+CKy;
            bool result = key.Contains(prefix.AdrNm.ToString()) && key.Contains(CKy.ToString());
            var AdrNmList = HTNCache.GetCachedObject(key);
            if(AdrNmList !=null)
            {
                list = (List<AdrNm_SelectMob>)AdrNmList;
            }
            else
            {
                list = await apiOpr.AdrNm_SelectMob(HTNSession.Environment, CKy, UsrKy, ObjKy, TrnTypKy, PreKy);
                HTNCache.SetCachedObject(key, list, 3600);
            }
            
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public async Task<JsonResult> ResoAdr_SelectWeb(string ObjKy, string TrnTypKy, string AdrTypKy, string PreKy)
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;

            List<ResoAdr_SelectWeb> list = new List<ResoAdr_SelectWeb>();
            list = await apiOpr.ResoAdr_SelectWeb(HTNSession.Environment, CKy, UsrKy, Convert.ToInt32(ObjKy), Convert.ToInt32(TrnTypKy), Convert.ToInt32(AdrTypKy), Convert.ToInt32(PreKy));
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public async Task<JsonResult> Code_SelectMob(string ObjKy, string TrnTypKy, string PreKy)
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            List<Code_SelectMob> list = new List<Code_SelectMob>();
            string key = prefix.Code +"-"+ "ObjKy " + ObjKy.ToString() +":"+ TrnTypKy + PreKy + "-CKy:"+CKy;
            var CodeList = HTNCache.GetCachedObject(key);
            if (CodeList != null)
            {
                list = (List<Code_SelectMob>)CodeList;
            }
            else
            {
                list = await apiOpr.Code_SelectMob(HTNSession.Environment, CKy, UsrKy, Convert.ToInt32(ObjKy), Convert.ToInt32(TrnTypKy), Convert.ToInt32(PreKy));
                HTNCache.SetCachedObject(key, list, 3600);
            }            
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public async Task<JsonResult> CdNm_SelectMob(string ObjKy, string TrnTypKy, string PreKy)
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;           
            List<CdNm_SelectMob> list = new List<CdNm_SelectMob>();
            string key = prefix.CdNm +"-"+ "ObjKy " + ObjKy.ToString() +":"+ TrnTypKy + PreKy + "-CKy:"+ CKy;
            var CdNmList = HTNCache.GetCachedObject(key);
            if (CdNmList != null)
            {
                list = (List<CdNm_SelectMob>)CdNmList;
            }
            else
            {
                list = await apiOpr.CdNm_SelectMob(HTNSession.Environment, CKy, UsrKy, Convert.ToInt32(ObjKy), Convert.ToInt32(TrnTypKy), Convert.ToInt32(PreKy));
                HTNCache.SetCachedObject(key, list, 3600);
            }           
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public async Task<JsonResult> ItmNm_SelectMob(int ObjKy, int TrnTypKy, int PreKy)
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;

            List<ItmNm_SelectMob> list = new List<ItmNm_SelectMob>();
            string key = prefix.ItmNm +"-"+ "ObjKy " + ObjKy.ToString() +":"+ TrnTypKy + PreKy + "-CKy:"+ CKy;
            var ItmNmList = HTNCache.GetCachedObject(key);
            if (ItmNmList != null)
            {
                list = (List<ItmNm_SelectMob>)ItmNmList;
            }
            else
            {
                list = await apiOpr.ItmNm_SelectMob(HTNSession.Environment, CKy, UsrKy, ObjKy, TrnTypKy, PreKy);
                HTNCache.SetCachedObject(key, list, 3600);
            }
            
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public async Task<JsonResult> ItmCd_SelectMob(int ObjKy, int TrnTypKy, int PreKy)
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;

            List<ItmCd_SelectMob> list = new List<ItmCd_SelectMob>();
            string key = prefix.ItmID +"-"+ "ObjKy " + ObjKy.ToString() +":"+ TrnTypKy + PreKy + "-CKy:"+ CKy;
            var ItmIDlist = HTNCache.GetCachedObject(key);
            if (ItmIDlist != null)
            {
                list = (List<ItmCd_SelectMob>)ItmIDlist;
            }
            else
            {
                list = await apiOpr.ItmCd_SelectMob(HTNSession.Environment, CKy, UsrKy, ObjKy, TrnTypKy, PreKy);
                HTNCache.SetCachedObject(key, list, 3600);
            }
            
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        //********Project Combo**********

        public async Task<JsonResult> PrjID_SelectMob(int ObjKy, int TrnTypKy, int PreKy)
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;

            List<PrjID_SelectMob> list = new List<PrjID_SelectMob>();
            string key = prefix.PrjID +"-"+ "ObjKy " + ObjKy.ToString() +":"+ TrnTypKy + PreKy + "-CKy:"+ CKy;
            var PrjIDlist = HTNCache.GetCachedObject(key);
            if(PrjIDlist!=null)
            {
                list = (List<PrjID_SelectMob>)PrjIDlist;
            }
            else
            {
                list = await apiOpr.PrjID_SelectMob(HTNSession.Environment, CKy, UsrKy, ObjKy, TrnTypKy, PreKy);
                HTNCache.SetCachedObject(key, list, 3600);
            }
            //HTNCache.ClearCacheItems("Acc");
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public async Task<JsonResult> PrjNm_SelectMob(int ObjKy, int TrnTypKy, int PreKy)
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;

            List<PrjNm_SelectMob> list = new List<PrjNm_SelectMob>();
            string key = prefix.PrjNm +"-"+ "ObjKy " + ObjKy.ToString() +":"+ TrnTypKy + PreKy + "-CKy:"+ CKy;
            var PrjNmList = HTNCache.GetCachedObject(key);
            if(PrjNmList!=null)
            {
                list = (List<PrjNm_SelectMob>)PrjNmList;
            }
            else
            {
                list = await apiOpr.PrjNm_SelectMob(HTNSession.Environment, CKy, UsrKy, ObjKy, TrnTypKy, PreKy);
                HTNCache.SetCachedObject(key, list, 3600);
            }
            
            return Json(list, JsonRequestBehavior.AllowGet);
            //Clear the Cache use this function  
            //HTNCache.ClearCacheItems("Prj");
        }

        //********Task Combo**********
        public async Task<JsonResult> TaskID_SelectMob(int ObjKy, int PrjKy)
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;

            List<TaskID_SelectMob> list = new List<TaskID_SelectMob>();
            string key = prefix.TskID +"-"+ "ObjKy "+ ObjKy.ToString() + ObjKy+":" + PrjKy + "-CKy:"+ CKy;
            var TaskIDList = HTNCache.GetCachedObject(key);
            if(TaskIDList!= null)
            {
                list = (List<TaskID_SelectMob>)TaskIDList;
            }
            else
            {
                list = await apiOpr.TaskID_SelectMob(HTNSession.Environment, CKy, UsrKy, ObjKy, PrjKy);
                HTNCache.SetCachedObject(key, list, 3600);
            } 
            
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public async Task<JsonResult> TaskNm_SelectMob(int ObjKy, int PrjKy)
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;

            List<TaskNm_SelectMob> list = new List<TaskNm_SelectMob>();
            string key = prefix.TskNm +"-"+ "ObjKy " + ObjKy.ToString() + ObjKy +":"+ PrjKy + "-CKy:"+ CKy;
            var TaskNmlist = HTNCache.GetCachedObject(key);
            if (TaskNmlist != null)
            {
                list = (List<TaskNm_SelectMob>)TaskNmlist;
            }
            else
            {
                list = await apiOpr.TaskNm_SelectMob(HTNSession.Environment, CKy, UsrKy, ObjKy, PrjKy);
                HTNCache.SetCachedObject(key, list, 3600);
            }
            
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        //*****************
        public async Task<JsonResult> UnitMas_SelectMob(int ObjKy, int TrnTypKy, int PreKy)
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;

            List<UnitMas_SelectMob> list = new List<UnitMas_SelectMob>();
            list = await apiOpr.UnitMas_SelectMob(HTNSession.Environment, CKy, UsrKy, ObjKy, TrnTypKy, PreKy);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public async Task<JsonResult> PrcsSchNo_SelectMob(int PrjKy)
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;

            List<PrcsSchNo_SelectMob> list = new List<PrcsSchNo_SelectMob>();
            list = await apiOpr.PrcsSchNo_SelectMob(HTNSession.Environment, CKy, UsrKy, PrjKy);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public async Task<JsonResult> GetCat8ByCat7_SelectWeb(int Cat7Ky)
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;

            List<CdNm_SelectMob> list = new List<CdNm_SelectMob>();
            list = await apiOpr.GetCat8ByCat7_SelectWeb(HTNSession.Environment, CKy, UsrKy, Cat7Ky);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public async Task<JsonResult> SerNo_SelectMob(string ObjKy, string ItmKy)
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;

            List<SerNo_SelectMob> list = new List<SerNo_SelectMob>();
            list = await apiOpr.SerNo_SelectMob(HTNSession.Environment, CKy, UsrKy, Convert.ToInt32(ObjKy), Convert.ToInt32(ItmKy));
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        #region EmpMas Combo Data Load

        public async Task<JsonResult> EmpNo_SelectMob(int ObjKy)
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            List<EmpNo_SelectMob> list = await apiOpr.EmpNo_SelectMob(
                HTNSession.Environment,
                CKy,
                UsrKy,
                ObjKy.ToString()
                );

            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public async Task<JsonResult> EmpNm_SelectMob(int ObjKy)
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            List<EmpNm_SelectMob> list = await apiOpr.EmpNm_SelectMob(
                HTNSession.Environment,
                CKy,
                UsrKy,
                ObjKy.ToString()
                );

            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public async Task<JsonResult> OrdNo_SelectMob(string ObjKy, string TrnTypKy, string PreKy)
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;

            List<OrdNo_SelectMob> list = new List<OrdNo_SelectMob>();
            list = await apiOpr.OrdNo_SelectMob(HTNSession.Environment, CKy, UsrKy, Convert.ToInt32(ObjKy), Convert.ToInt32(TrnTypKy), Convert.ToInt32(PreKy));
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public async Task<JsonResult> OrdItmNo_SelectMob(string ObjKy, string TrnTypKy, string PreKy, string OrdKy)
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;

            List<OrdItmNo_SelectMob> list = new List<OrdItmNo_SelectMob>();
            list = await apiOpr.OrdItmNo_SelectMob(HTNSession.Environment, CKy, UsrKy, Convert.ToInt32(ObjKy), Convert.ToInt32(TrnTypKy), Convert.ToInt32(PreKy), Convert.ToInt32(OrdKy));
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        #endregion EmpMas Combo Data Load


        public async Task<JsonResult> PPrjKySubConAccCd_SelectMob(int ObjKy, int TrnTypKy, int PreKy)
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;

            List<AccCd_SelectMob> list = new List<AccCd_SelectMob>();
            list = await apiOpr.PPrjKySubConAccCd_SelectMob(HTNSession.Environment, CKy, UsrKy, ObjKy, TrnTypKy, PreKy);
            return Json(list, JsonRequestBehavior.AllowGet);
        }


        public async Task<JsonResult> PPrjKySubConAccNm_SelectMob(int ObjKy, int TrnTypKy, int PreKy)
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;

            List<AccNm_SelectMob> list = new List<AccNm_SelectMob>();
            list = await apiOpr.PPrjKySubConAccNm_SelectMob(HTNSession.Environment, CKy, UsrKy, ObjKy, TrnTypKy, PreKy);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public async Task<JsonResult> SubConTaskId_SelectMob(int PreKy, int accKy, int ObjKy)  
        {                                                                          
            int CKy = HTNSession.CKy;                                             
            int UsrKy = HTNSession.UsrKy;

            List<TaskID_SelectMob_NewId> list = new List<TaskID_SelectMob_NewId>();
            list = await apiOpr.SubConTaskId_SelectMob(HTNSession.Environment, CKy, UsrKy, PreKy, accKy, ObjKy);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

         public async Task<JsonResult> SubConTaskNm_SelectMob(int PreKy,  int accKy, int ObjKy)
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;

            List<TaskNm_SelectMob_NewNm> list = new List<TaskNm_SelectMob_NewNm>();
            list = await apiOpr.SubConTaskNm_SelectMob(HTNSession.Environment, CKy, UsrKy, PreKy, accKy, ObjKy);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public async Task<JsonResult> MenuSearch_SelectWeb() {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;

            List<MenuSearch_SelectModel> list = new List<MenuSearch_SelectModel>();
            list = await apiOpr.MenuSearch_SelectWeb(HTNSession.Environment, CKy, UsrKy);
            return Json(list, JsonRequestBehavior.AllowGet);
        }
    }



}


