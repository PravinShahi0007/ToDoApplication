using BlueLotus.ItmMas.Model.Entity;
using BlueLotus.UI.ApiOperations;
using BlueLotus.UI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;

using TransactionModel.Entity;

namespace BlueLotus.UI.Controllers
{
    public class ItemCountController : Controller
    {
        ApiOperation Operation = new ApiOperation();
        public static int UsrKy = 1;
        public static int cky = 1;
        public static string UsrNm;
        public static string cNm;


        public ActionResult Index(string OurCd, string OurCd2, int ObjKy, string ObjCaptn)
        {
            ViewBag.OurCd = OurCd;
            ViewBag.OurCd2 = OurCd2;
            ViewBag.ObjKy = ObjKy;
            ViewBag.ObjCaptn = ObjCaptn;

            return View();
        }

        public ActionResult CountSchedule()
        {            
            return View("CountSchedule");
        }

        public ActionResult GetLocCategory(string ConCd, string Date, long PrntLocKy)
        {
            int cky = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            List<ItemCategoryModel> list = new List<ItemCategoryModel>();
            list = Operation.GetLocCategory(HTNSession.Environment, cky, UsrKy, ConCd, Date, PrntLocKy);
            return Json(list, JsonRequestBehavior.AllowGet);
        }
        public ActionResult CdMas_LookupWeb(string ConCd)
        {
            int cky = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            List<LocLocationModel> list = new List<LocLocationModel>();
            list = Operation.CdMas_LookupWeb(HTNSession.Environment, cky, UsrKy, ConCd);
            return Json(list, JsonRequestBehavior.AllowGet);
        }
        public ActionResult GetCategoryItem(string newRecordsHdr, int CatKy, int PrntLocKy, string Date)
        {
            int cky = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            List<ItemModel> list = new List<ItemModel>();
            list = Operation.GetCategoryItem(HTNSession.Environment, cky, UsrKy, CatKy, PrntLocKy, Date, newRecordsHdr);
            return Json(list, JsonRequestBehavior.AllowGet);
        }
        public ActionResult GetLocLocation(int LocKy)
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            List<LocLocationModel> list = new List<LocLocationModel>();
            list = Operation.GetLocLocation(HTNSession.Environment, CKy, UsrKy, LocKy);
            return Json(list, JsonRequestBehavior.AllowGet);
        }
        public JsonResult InsertLocItm(string updatedData, string NewData, string NewDataHdr, bool BulkSave=false)
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            string EnvironmentName = HTNSession.Environment;

            ItemModel[] ItemModelObj = new JavaScriptSerializer().Deserialize<ItemModel[]>(NewData);
            ItemHdrModel ItemHdrModelObj = new JavaScriptSerializer().Deserialize<ItemHdrModel>(NewDataHdr);
            long Key = 1;
            if (BulkSave == false)
            {
                for (int i = 0; i < ItemModelObj.Length; i++)
                {
                    if (ItemHdrModelObj.ItmKy == ItemModelObj[i].ItmKy)
                    {
                        string NewmodelString = new JavaScriptSerializer().Serialize(ItemModelObj[i]);
                        Key = Operation.InsertLocItm(EnvironmentName, CKy, UsrKy, NewmodelString, NewDataHdr);
                    }
                }

            }
            if(BulkSave==true )
            {
                for (int i = 0; i < ItemModelObj.Length; i++)
                {
                   
                        string NewmodelString = new JavaScriptSerializer().Serialize(ItemModelObj[i]);
                        Key = Operation.InsertLocItm(EnvironmentName, CKy, UsrKy, NewmodelString, NewDataHdr);
                   
                }
            }
            return Json(Key, JsonRequestBehavior.AllowGet);
        }

        public ActionResult VariencePost(string updatedData, string NewData, string NewDataHdr)
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            string EnvironmentName = HTNSession.Environment;
            ItemModel[] ItemModelObj = new JavaScriptSerializer().Deserialize<ItemModel[]>(NewData);
            ItemHdrModel ItemHdrModelObj = new JavaScriptSerializer().Deserialize<ItemHdrModel>(NewDataHdr);

            long Key = 1;
            for (int i = 0; i < ItemModelObj.Length; i++)
            {
                ItemModelObj[i].Status = true;
                ItemModelObj[i].isQty = true;
                string NewmodelString = new JavaScriptSerializer().Serialize(ItemModelObj[i]);
                Key = Operation.VariencePost(EnvironmentName, CKy, UsrKy, NewmodelString, NewDataHdr);

            }
            //bool post = Operation.VariencePost(CKy, UsrKy, AsAtDt, CountDt, LocKy, EnvironmentName);
            return Json(Key, JsonRequestBehavior.AllowGet);
        }
        public JsonResult PostLocItm(string updatedData, string NewData, string NewDataHdr, bool BulkSave = false)
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            string EnvironmentName = HTNSession.Environment;

            ItemModel[] ItemModelObj = new JavaScriptSerializer().Deserialize<ItemModel[]>(NewData);
            ItemHdrModel ItemHdrModelObj = new JavaScriptSerializer().Deserialize<ItemHdrModel>(NewDataHdr);
            long Key = 1;
            if (BulkSave == false)
            {
                for (int i = 0; i < ItemModelObj.Length; i++)
                {
                    string NewmodelString = new JavaScriptSerializer().Serialize(ItemModelObj[i]);
                    Key = Operation.InsertLocItm(EnvironmentName, CKy, UsrKy, NewmodelString, NewDataHdr);
                }

            }
            if (BulkSave == true)
            {
                for (int i = 0; i < ItemModelObj.Length; i++)
                {
                    ItemModelObj[i].Status = true;
                    ItemModelObj[i].isQty = true;  
                    string NewmodelString = new JavaScriptSerializer().Serialize(ItemModelObj[i]);
                    Key = Operation.InsertLocItm(EnvironmentName, CKy, UsrKy, NewmodelString, NewDataHdr);

                }
            }
            return Json(Key, JsonRequestBehavior.AllowGet);
        }

    }
}
