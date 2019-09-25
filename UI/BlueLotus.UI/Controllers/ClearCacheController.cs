using BlueLots.CacheClear.Model;
using BlueLotus.Attendance.Model.Entity;
using BlueLotus.UI.ApiOperations;
using BlueLotus.UI.Models;
using Riss.Devices;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Configuration;
using System.Web.Mvc;

namespace BlueLotus.UI.Controllers
{
    public class ClearCacheController : Controller
    {

        public ActionResult ClearCache(string OurCd, string OurCd2, string ObjKy, string ObjCaptn)
        {
            ViewBag.OurCd2 = OurCd2;
            ViewBag.OurCd = OurCd;
            ViewBag.ObjKy = ObjKy;
            ViewBag.ObjCaptn = ObjCaptn;
            return View("ClearCache");
        }

        public JsonResult GetCachelist()
        {
            var list = HTNCache.GetCacheItems();
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult ClearCachItem(string Key)
        {
           
            if(Key!=null)
            {
                HTNCache.ClearCacheItems(Key);
                return Json("success", JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json("Can't Clear", JsonRequestBehavior.AllowGet);
            }
           
        }
        public JsonResult ClearAllCachItem()
        {
            string Cky = HTNSession.CKy.ToString();
            HTNCache.ClearCacheItems(Cky);
            return Json("success", JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetLoginComanyDetails()
        {
            int cky = HTNSession.CKy;
            string CNm = HTNSession.CNm;

            List<string> LoginComanyDetails = new List<string>();
            LoginComanyDetails.Add(cky.ToString());
            LoginComanyDetails.Add(CNm);
            return Json(LoginComanyDetails, JsonRequestBehavior.AllowGet);
        }

        public JsonResult getAllrecodes()
        {
             var list = HTNCache.GetCacheItems();

            string[] prefixlist = new string[] { "ItmID", "ItmNm", "PrjID", "PrjNm", "AccID", "AccNm", "AdrID", "AdrNm", "Code", "CdNm", "TskID", "TskNm", "BUCode", "BUNm", "ObjMas", "ObjMasObjSec" };
            string CNm = HTNSession.CNm;
            string Cky = HTNSession.CKy.ToString();
            List<CacheClear> finaloutput = new List<CacheClear>();
            for (int i = 0; i < list.Count; i++)
            {
                var splitstr = list[i];
                var str = splitstr.Split('-');

                for (int j = 0; j < prefixlist.Length; j++)
                {
                    if(prefixlist[j] == str[0])
                    {
                        var checkobjky = str[1].Split(' ');
                        var ckey = str[2].Split(':');
                        if (checkobjky[0] == "ObjKy")
                        {
                            var gettheobjky = checkobjky[1].Split(':');
                            if (Cky == ckey[1])
                            {
                                finaloutput.Add(new CacheClear { Ky = splitstr ,ComNm = str[0] , Objky = gettheobjky[0],Cky = ckey[1],CNm = CNm });
                            }
                        }
                        else
                        {
                            var Checkprnky = checkobjky[1].Split(':');
                            if (Cky == ckey[1])
                            {
                                finaloutput.Add(new CacheClear { Ky = splitstr, ComNm = str[0], PrntKy = Checkprnky[0], Cky = ckey[1], CNm = CNm });
                            }
                        } 
                    }
                }
            }
            return Json(finaloutput, JsonRequestBehavior.AllowGet);
        }





    }
}
