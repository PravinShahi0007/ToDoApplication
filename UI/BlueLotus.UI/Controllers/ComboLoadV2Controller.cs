using BlueLotus.ComboLoad.Model;
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
    public class ComboLoadV2Controller : Controller
    {
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
        }
        public async Task<JsonResult> AccCd_SelectMob(int ObjKy, int TrnTypKy, int PreKy)
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            List<AccCd_SelectMob> list = new List<AccCd_SelectMob>();
            string key = prefix.AccID + "-" + "ObjKy " + ObjKy.ToString() + ":" + TrnTypKy + PreKy + "-CKy:" + CKy + "-" + UsrKy.ToString();
            var AccIDlist = HTNCache.GetCachedObject(key);

            if (AccIDlist != null)
            {
                list = (List<AccCd_SelectMob>)AccIDlist;
            }
            else
            {
                list = await apiOpr.AccCdNm_SelectMob(HTNSession.Environment, CKy, UsrKy, ObjKy, TrnTypKy, PreKy);
                HTNCache.SetCachedObject(key, list, 3600);
            }
            var newlist = HTNCache.GetCacheItems();

            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public async Task<JsonResult> AdrID_SelectMob(int ObjKy, int TrnTypKy, int PreKy)
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;

            string key = prefix.AdrID + "-" + "ObjKy " + ObjKy.ToString() + ":" + TrnTypKy + PreKy + "-CKy:" + CKy + "-" + UsrKy.ToString();
            List<AdrID_SelectMob> list = new List<AdrID_SelectMob>();
            var AdrIDList = HTNCache.GetCachedObject(key);
            if (AdrIDList != null)
            {
                list = (List<AdrID_SelectMob>)AdrIDList;
            }
            else
            {
                list = await apiOpr.AdrIDNm_SelectMob(HTNSession.Environment, CKy, UsrKy, ObjKy, TrnTypKy, PreKy);
                HTNCache.SetCachedObject(key, list, 3600);
            }
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public async Task<JsonResult> Code_SelectMob(string ObjKy, string TrnTypKy, string PreKy)
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            List<Code_SelectMob> list = new List<Code_SelectMob>();
            string key = prefix.Code + "-" + "ObjKy " + ObjKy.ToString() + ":" + TrnTypKy + PreKy + "-CKy:" + CKy + "-" + UsrKy.ToString();
            var CodeList = HTNCache.GetCachedObject(key);
            if (CodeList != null)
            {
                list = (List<Code_SelectMob>)CodeList;
            }
            else
            {
                list = await apiOpr.CodeIdNm_SelectMob(HTNSession.Environment, CKy, UsrKy, Convert.ToInt32(ObjKy), Convert.ToInt32(TrnTypKy), Convert.ToInt32(PreKy));
                HTNCache.SetCachedObject(key, list, 3600);
            }
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public async Task<JsonResult> ItmCd_SelectMob(int ObjKy, int TrnTypKy, int PreKy)
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;

            List<ItmCd_SelectMob> list = new List<ItmCd_SelectMob>();
            string key = prefix.ItmID + "-" + "ObjKy " + ObjKy.ToString() + ":" + TrnTypKy + PreKy + "-CKy:" + CKy + "-" + UsrKy.ToString();
            var ItmIDlist = HTNCache.GetCachedObject(key);
            if (ItmIDlist != null)
            {
                list = (List<ItmCd_SelectMob>)ItmIDlist;
            }
            else
            {
                list = await apiOpr.ItmCdNm_SelectMob(HTNSession.Environment, CKy, UsrKy, ObjKy, TrnTypKy, PreKy);
                HTNCache.SetCachedObject(key, list, 3600);
            }

            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public async Task<JsonResult> PrjID_SelectMob(int ObjKy, int TrnTypKy, int PreKy)
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;

            List<PrjID_SelectMob> list = new List<PrjID_SelectMob>();
            string key = prefix.PrjID + "-" + "ObjKy " + ObjKy.ToString() + ":" + TrnTypKy + PreKy + "-CKy:" + CKy + "-" + UsrKy.ToString();
            var PrjIDlist = HTNCache.GetCachedObject(key);
            if (PrjIDlist != null)
            {
                list = (List<PrjID_SelectMob>)PrjIDlist;
            }
            else
            {
                list = await apiOpr.PrjIDNm_SelectMob(HTNSession.Environment, CKy, UsrKy, ObjKy, TrnTypKy, PreKy);
                HTNCache.SetCachedObject(key, list, 3600);
            }
            //HTNCache.ClearCacheItems("Acc");
            return Json(list, JsonRequestBehavior.AllowGet);
        }
        public async Task<JsonResult> TaskID_SelectMob(int ObjKy, int PrjKy)
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;

            List<TaskID_SelectMob> list = new List<TaskID_SelectMob>();
            string key = prefix.TskID + "-" + "ObjKy " + ObjKy.ToString() + ObjKy + ":" + PrjKy + "-CKy:" + CKy + "-" + UsrKy.ToString();
            var TaskIDList = HTNCache.GetCachedObject(key);
            if (TaskIDList != null)
            {
                list = (List<TaskID_SelectMob>)TaskIDList;
            }
            else
            {
                list = await apiOpr.TaskIDNm_SelectMob(HTNSession.Environment, CKy, UsrKy, ObjKy, PrjKy);
                HTNCache.SetCachedObject(key, list, 3600);
            }

            return Json(list, JsonRequestBehavior.AllowGet);
        }
    }
}