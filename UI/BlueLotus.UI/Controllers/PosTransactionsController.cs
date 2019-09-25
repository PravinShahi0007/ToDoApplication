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

    /// <summary>
    /// Pos Related Operations are performed here.
    /// </summary>
    public class PosTransactionsController : Controller
    {
        ApiOperation apiOpr = new ApiOperation();

        //
        // GET: /PosTransactions/

        /// <summary>
        ///  Private Action Hence No Access.
        /// </summary>
        /// <returns></returns>
        private ActionResult Index()
        {
            return View();
        }

       
        public ActionResult GoodRecivedNote(int? ObjectCode)
        {
            if (!ObjectCode.HasValue)
            {
                ObjectCode = 14590;
            }

            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;

            List<ObjMasModel> list = new List<ObjMasModel>();

            string key = "ObjMass" + "-" + "PrntKy " + ObjectCode.ToString() + "-" + "CKy:" + CKy.ToString() + "-" + UsrKy.ToString();
            var objList = HTNCache.GetCachedObject(key);



            if (objList != null)
            {
                list = (List<ObjMasModel>)objList;
            }

            if (objList == null)
            {
                list = apiOpr.UsrObjPrp_SelectAllLastChildWeb(HTNSession.Environment, CKy, UsrKy, ObjectCode.Value.ToString());
                HTNCache.SetCachedObject(key, list, 3600);
            }

			string json = Newtonsoft.Json.JsonConvert.SerializeObject(list);
            ViewBag.FormChildren = list;
            ViewBag.ObjectCode = ObjectCode;


            return View();

        }
        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        public ActionResult AddNewGRN()
        {
            int ObjectKey = 14590;

            return View();
        }

    }
}
