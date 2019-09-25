using BlueLotus.ItmMas.Model.Entity;
using BlueLotus.UI.ApiOperations;
using BlueLotus.UI.Models;
using BlueLotus.ViewModel.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace BlueLotus.UI.Controllers
{
    public class ItmMasController : Controller
    {
        //
        // GET: /ItmMas/
        ApiOperation Operation = new ApiOperation();
        
        public ActionResult Index(string OurCd, string OurCd2, string ObjKy, string ObjCaptn)
        {
            ViewBag.OurCd2 = OurCd2;
            ViewBag.ObjKy = ObjKy;
            ViewBag.ObjCaptn = ObjCaptn;
            ViewBag.OurCd = OurCd;

            return View();
        }

        //=================================== Get Item Type Key
        public ActionResult GetItmTypKy(string ConCd, string OurCd)
        {
            int usrKy = HTNSession.UsrKy;
            int Cky = HTNSession.CKy;
            List<ItmMasCatModel> list = new List<ItmMasCatModel>();
            list = Operation.GetItmTypKy(HTNSession.Environment, Cky, ConCd, OurCd, usrKy);

            return Json(list, JsonRequestBehavior.AllowGet);
        }

        //====================================== Get All Items
        public JsonResult GetAllItems(int PageNo, int PageSize, int ObjKy, int ItmTypKy, string ItmCd, string ItmNm)
        {
            //int CKy = HTNSession.CKy;
            int usrKy = HTNSession.UsrKy;
            int Cky = HTNSession.CKy;
            int OnlyisAct = 1; //if 0 load all product if 1 load only active products

            List<ItmMasModel> list = new List<ItmMasModel>();
            list = Operation.GetAllItems(HTNSession.Environment,OnlyisAct, ItmTypKy, 1, 1, usrKy, Cky, ObjKy, ItmCd, ItmNm, PageNo, PageSize);

            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetAllNonCompanyItems(string ItmTypKy, string ObjKy)
        {
            //int CKy = HTNSession.CKy;
            int usrKy = HTNSession.UsrKy;
            int Cky = HTNSession.CKy;
            int OnlyisAct = 1; //if 0 load all product if 1 load only active products

            List<ItmMasModel> list = new List<ItmMasModel>();
            list = Operation.GetAllNonCompanyItems(HTNSession.Environment, OnlyisAct, Convert.ToInt32(ItmTypKy), usrKy, Cky, Convert.ToInt32(ObjKy));

            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetAllItemsWithDept(int ItmTypKy, int Dept, int Cat, int ObjKy, int PageNo, int PageSize)
        {
            //int CKy = HTNSession.CKy;
            int usrKy = HTNSession.UsrKy;
            int Cky = HTNSession.CKy;
            int OnlyisAct = 1; //if 0 load all product if 1 load only active products

            string ItmCd = ""; // please add these in javascript if nedded (-Lelimo)
            string ItmNm = ""; // please add these in javascript if nedded (-Lelimo)

            List<ItmMasModel> list = new List<ItmMasModel>();
            list = Operation.GetAllItems(HTNSession.Environment,OnlyisAct, ItmTypKy, Dept, Cat, usrKy, Cky, ObjKy, ItmCd, ItmNm, PageNo, PageSize);

            return Json(list, JsonRequestBehavior.AllowGet);
        }
        //===== copying from cloutTODO



        public ActionResult Trading(string OurCd, string OurCd2, string ObjKy, string ObjCaptn)
        {
            ViewBag.OurCd2 = OurCd2;
            ViewBag.ObjKy = ObjKy;
            ViewBag.ObjCaptn = ObjCaptn;
            ViewBag.OurCd = OurCd;

            return View("Trading");
        }

        public ActionResult ItemCost(string OurCd, string OurCd2, string ObjKy, string ObjCaptn)
        {
            ViewBag.OurCd2 = OurCd2;
            ViewBag.ObjKy = ObjKy;
            ViewBag.ObjCaptn = ObjCaptn;
            ViewBag.OurCd = OurCd;

            return View("ItemCostPrice");
        }


        public ActionResult SubConItemRate(string OurCd, string OurCd2, string ObjKy, string ObjCaptn)
        {
            ViewBag.OurCd2 = OurCd2;
            ViewBag.ObjKy = ObjKy;
            ViewBag.ObjCaptn = ObjCaptn;
            ViewBag.OurCd = OurCd;

            return View("SubConItemRate");
        }

        public ActionResult ItemSales(string OurCd, string OurCd2, string ObjKy, string ObjCaptn)
        {
            ViewBag.OurCd2 = OurCd2;
            ViewBag.ObjKy = ObjKy;
            ViewBag.ObjCaptn = ObjCaptn;
            ViewBag.OurCd = OurCd;

            return View("ItemSales");
        }


        public ActionResult Material(string OurCd, string OurCd2, string ObjKy, string ObjCaptn)
        {
            ViewBag.OurCd2 = OurCd2;
            ViewBag.ObjKy = ObjKy;
            ViewBag.ObjCaptn = ObjCaptn;
            ViewBag.OurCd = OurCd;

            return View("Material");
        }


        public ActionResult FixedAsset(string OurCd, string OurCd2, string ObjKy, string ObjCaptn)
        {
            ViewBag.OurCd2 = OurCd2;
            ViewBag.ObjKy = ObjKy;
            ViewBag.ObjCaptn = ObjCaptn;
            ViewBag.OurCd = OurCd;

            return View("FixedAsset");
        }

        public ActionResult ServiceItem(string OurCd, string OurCd2, string ObjKy, string ObjCaptn)
        {
            ViewBag.OurCd2 = OurCd2;
            ViewBag.ObjKy = ObjKy;
            ViewBag.ObjCaptn = ObjCaptn;
            ViewBag.OurCd = OurCd;

            return View("ServiceItem");
        }

        public ActionResult GetAnalysisGrid(string OurCd, string OurCd2, string ObjKy, string ObjCaptn)
        {
            ViewBag.OurCd2 = OurCd2;
            ViewBag.ObjKy = ObjKy;
            ViewBag.ObjCaptn = ObjCaptn;
            ViewBag.OurCd = OurCd;

            return View("AnalysisGrid");
        }

        public ActionResult NonCompanyItems(string OurCd, string OurCd2, string ObjKy, string ObjCaptn)
        {
            ViewBag.OurCd2 = OurCd2;
            ViewBag.ObjKy = ObjKy;
            ViewBag.ObjCaptn = ObjCaptn;
            ViewBag.OurCd = OurCd;

            return View("NonCompanyItems");
        }

        public ActionResult ResourceForItmAloc_Select(string ItmCd, string ItmNm, int ItmTypKy, int ItmCat1Ky, int ItmCat2Ky, int ItmCat3Ky)
        {
            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;
            List<ResourceForTaskAloc_Select> list = new List<ResourceForTaskAloc_Select>();
            list = Operation.ResourceForItmAloc_Select(HTNSession.Environment, CKy, UsrKy, ItmCd, ItmNm, ItmTypKy, ItmCat1Ky, ItmCat2Ky, ItmCat3Ky);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public ActionResult ItmCompnResource_Select(int ItmKy)
        {

            int usrKy = HTNSession.UsrKy;
            List<ItemComponent> list = new List<ItemComponent>();
            list = Operation.ItmCompnResource_Select(HTNSession.Environment, usrKy, ItmKy);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public ActionResult GetChangeConRate(string UnitKy, string ItmKy)
        {

            int UsrKy = HTNSession.UsrKy;
            List<ConvRate> list = new List<ConvRate>();
            list = Operation.GetChangeConRate(HTNSession.Environment, UnitKy, ItmKy, UsrKy);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public ActionResult GetItmUnit(string ItmKy)
        {

            int UsrKy = HTNSession.UsrKy;
            List<ConvRate> list = new List<ConvRate>();
            list = Operation.GetItmUnit(HTNSession.Environment, ItmKy, UsrKy);
            return Json(list, JsonRequestBehavior.AllowGet);
        }



        public ActionResult ItmCompnHdr_Select(int ItmKy)
        {
            int UsrKy = HTNSession.UsrKy;
            List<ItemComponentHdr> list = new List<ItemComponentHdr>();
            list = Operation.ItmCompnHdr_Select(HTNSession.Environment, ItmKy, UsrKy);

            return Json(list, JsonRequestBehavior.AllowGet);
        }



        public ActionResult ItmCat1Nm()
        {
            int cky = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            List<ItmMasCatModel> list = new List<ItmMasCatModel>();
            list = Operation.ItmCat1Nm(HTNSession.Environment, cky, UsrKy);
            return Json(list, JsonRequestBehavior.AllowGet);

        }

        public ActionResult ItmCat2Nm()
        {
            int cky = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            List<ItmMasCatModel> list = new List<ItmMasCatModel>();
            list = Operation.ItmCat2Nm(HTNSession.Environment, cky, UsrKy);
            return Json(list, JsonRequestBehavior.AllowGet);

        }

        public ActionResult ItmCat3Nm()
        {
            int cky = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            List<ItmMasCatModel> list = new List<ItmMasCatModel>();
            list = Operation.ItmCat3Nm(HTNSession.Environment, cky, UsrKy);
            return Json(list, JsonRequestBehavior.AllowGet);

        }

        public ActionResult ItmCat4Nm()
        {
            int cky = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            List<ItmMasCatModel> list = new List<ItmMasCatModel>();
            list = Operation.ItmCat4Nm(HTNSession.Environment, cky, UsrKy);
            return Json(list, JsonRequestBehavior.AllowGet);

        }

        public ActionResult ItmCat5Nm()
        {
            int cky = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            List<ItmMasCatModel> list = new List<ItmMasCatModel>();
            list = Operation.ItmCat5Nm(HTNSession.Environment, cky, UsrKy);
            return Json(list, JsonRequestBehavior.AllowGet);

        }

        public ActionResult ItmCat6Nm()
        {
            int cky = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            List<ItmMasCatModel> list = new List<ItmMasCatModel>();
            list = Operation.ItmCat6Nm(HTNSession.Environment, cky, UsrKy);
            return Json(list, JsonRequestBehavior.AllowGet);

        }
         //=========
        public ActionResult ItmCat7Nm()
        {
            int cky = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            List<ItmMasCatModel> list = new List<ItmMasCatModel>();
            list = Operation.ItmCat7Nm(HTNSession.Environment, cky, UsrKy);
            return Json(list, JsonRequestBehavior.AllowGet);

        }

        public ActionResult ItmCat8Nm()
        {
            int cky = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            List<ItmMasCatModel> list = new List<ItmMasCatModel>();
            list = Operation.ItmCat8Nm(HTNSession.Environment, cky, UsrKy);
            return Json(list, JsonRequestBehavior.AllowGet);

        }

        public ActionResult ItmCat9Nm()
        {
            int cky = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            List<ItmMasCatModel> list = new List<ItmMasCatModel>();
            list = Operation.ItmCat9Nm(HTNSession.Environment, cky, UsrKy);
            return Json(list, JsonRequestBehavior.AllowGet);

        }

        public ActionResult ItmCat10Nm()
        {
            int cky = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            List<ItmMasCatModel> list = new List<ItmMasCatModel>();
            list = Operation.ItmCat10Nm(HTNSession.Environment, cky, UsrKy);
            return Json(list, JsonRequestBehavior.AllowGet);

        }

        public ActionResult ItmCat11Nm()
        {
            int cky = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            List<ItmMasCatModel> list = new List<ItmMasCatModel>();
            list = Operation.ItmCat11Nm(HTNSession.Environment, cky, UsrKy);
            return Json(list, JsonRequestBehavior.AllowGet);

        }

        public ActionResult ItmCat12Nm()
        {
            int cky = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            List<ItmMasCatModel> list = new List<ItmMasCatModel>();
            list = Operation.ItmCat12Nm(HTNSession.Environment, cky, UsrKy);
            return Json(list, JsonRequestBehavior.AllowGet);

        }


        public ActionResult GetAllCodes(string ConCd)
        {
            int UsrKy = HTNSession.UsrKy;
            List<CdMas> CodeList = new List<CdMas>();
            int cky = HTNSession.CKy;
            CodeList = Operation.GetAllCodesFromGantt(HTNSession.Environment, ConCd, cky, UsrKy);
            return Json(CodeList, JsonRequestBehavior.AllowGet);
        }

        public CdMas GetCdMasByCdKy(int cdky)
        {
            int UsrKy = HTNSession.UsrKy;
            CdMas obj = new CdMas();
            obj = Operation.GetCdMasByCdKyforItmMass(HTNSession.Environment, cdky, UsrKy);
            return obj;
        }


        public ActionResult GetAnalysisByItmky(int ObjKy, int ItmTypKy, int Dept, int Cat)
        {
            int CKy = HTNSession.CKy;
            int usrKy = HTNSession.UsrKy;
            int Cky = HTNSession.CKy;
            int OnlyisAct = 1; //if 0 load all product if 1 load only active products

            string ItmCd = ""; // please add these in javascript if nedded (-Lelimo)
            string ItmNm = ""; // please add these in javascript if nedded (-Lelimo)

            int PageNo = 1;
            int PageSize = 1300;

            List<ItmMasModel> list = new List<ItmMasModel>();
            list = Operation.GetAllItems(HTNSession.Environment, OnlyisAct, ItmTypKy, Dept, Cat, usrKy, Cky, ObjKy, ItmCd, ItmNm, PageNo, PageSize);
            return Json(list, JsonRequestBehavior.AllowGet);

        }



        public ActionResult GetUnit()
        {
            int UsrKy = HTNSession.UsrKy;
            int cky = HTNSession.CKy;
            List<UnitModel> list = new List<UnitModel>();

            list = Operation.ItmMasUnit_SelectMobile(HTNSession.Environment, UsrKy, cky);//Operation.GetUnit(HTNSession.Environment, UsrKy);
            return Json(list, JsonRequestBehavior.AllowGet);

        }

        public ActionResult Insert(List<ItmMasModel> list, string ItmTypKy)
        {
            int UsrKy = HTNSession.UsrKy;

            bool process = false;
            if (list != null)
            {
                foreach (ItmMasModel model in list)
                {
                    int CKy = HTNSession.CKy;
                    model.ItmTypKy = Convert.ToInt32(ItmTypKy.ToString());


                    process = Operation.Insert(HTNSession.Environment, model, UsrKy);
                }
                return Json(process, JsonRequestBehavior.AllowGet);

            }
            else
            {
                return null;
            }


            
        }

        public ActionResult Update(List<ItmMasModel> list, string ItmTypKy)
        {
            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;
            bool process = false;

            foreach (ItmMasModel model in list)
            {
                model.ItmTypKy = Convert.ToInt32(ItmTypKy.ToString());
                process = Operation.Update(HTNSession.Environment, model, UsrKy);
            }
            return Json(process, JsonRequestBehavior.AllowGet);
        }

        public JsonResult DeleteItmMas(long key)
        {
            int UsrKy = HTNSession.UsrKy;
            bool result = false;

            ItmMasModel model = new ItmMasModel();
            model.ItmKy = key;
            result = Operation.DeleteItmMas(HTNSession.Environment, key, UsrKy);

            return Json(result, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetProjectListForItmMas()
        {
            int cky = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            List<CMSprojectForItmMas> list = new List<CMSprojectForItmMas>();
            list = Operation.GetProjectListForItmMas(HTNSession.Environment, cky, UsrKy);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public ActionResult InsertItemComponent(string updatedOrders, string newOrders, string deletedOrders, string FinQty, string ItmCmpnKy, string FinItmKy, String StartDate)
        {
            int UsrKy = HTNSession.UsrKy;

            string[] afdate = StartDate.Split('/');
            string Date = afdate.GetValue(0).ToString();
            string ddlfmonth = afdate.GetValue(1).ToString();
            string ddlfyear = afdate.GetValue(2).ToString();
            string sdate = ddlfmonth + "/" + Date + "/" + ddlfyear;


            DateTime dt = Convert.ToDateTime(sdate);



            bool Msg = Operation.InsertItemComponent(HTNSession.Environment, updatedOrders, newOrders, deletedOrders, FinQty, ItmCmpnKy, FinItmKy, dt, UsrKy);
            return Json("Success!");
        }


        public ActionResult InsertPrcsItemComponent(string updatedOrders, string newOrders, string deletedOrders)
        {


            //string[] afdate = StartDate.Split('/');
            //string Date = afdate.GetValue(0).ToString();
            //string ddlfmonth = afdate.GetValue(1).ToString();
            //string ddlfyear = afdate.GetValue(2).ToString();
            //string sdate = ddlfmonth + "/" + Date + "/" + ddlfyear;


            //DateTime dt = Convert.ToDateTime(sdate);

            int usrKy = HTNSession.UsrKy;

            bool Msg = Operation.InsertPrcsItemComponent(HTNSession.Environment, usrKy, updatedOrders, newOrders, deletedOrders);
            return Json("Success!");
        }

        public ActionResult InsertItmUnit(string updatedOrders, string newOrders, string deletedOrders, string ItmKy)
        {

            int usrKy = HTNSession.UsrKy;

            bool Msg = Operation.InsertItmUnit(HTNSession.Environment, usrKy, updatedOrders, newOrders, deletedOrders, ItmKy);
            return Json("Success!");
        }


        public ActionResult GetItmTyp()
        {
            int cky = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            List<ItmMasCatModel> list = new List<ItmMasCatModel>();
            list = Operation.GetItmTyp(HTNSession.Environment, cky, UsrKy);
            return Json(list, JsonRequestBehavior.AllowGet);

        }

        public ActionResult GetLocList()
        {
            int cky = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            List<ItmMasCatModel> list = new List<ItmMasCatModel>();
            list = Operation.GetLocList(HTNSession.Environment, cky, UsrKy);
            return Json(list, JsonRequestBehavior.AllowGet);

        }

        public ActionResult GetPusFmList()
        {
            int cky = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            List<ItmMasCatModel> list = new List<ItmMasCatModel>();
            list = Operation.GetPusFmList(HTNSession.Environment, cky, UsrKy);
            return Json(list, JsonRequestBehavior.AllowGet);

        }

        public ActionResult GetTrncList()
        {
            int cky = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            List<ItmMasCatModel> list = new List<ItmMasCatModel>();
            list = Operation.GetTrncList(HTNSession.Environment, cky, UsrKy);
            return Json(list, JsonRequestBehavior.AllowGet);

        }


        public ActionResult GetControlConKyForItmRate(string TblNm, string OurCd)
        {
            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;
            long list = Operation.GetControlConKyForItmRate(HTNSession.Environment, TblNm, OurCd, UsrKy, CKy);

            return Json(list, JsonRequestBehavior.AllowGet);

        }

        public ActionResult GetItmsforRate(int PageNo, int PageSize, int ItmtypKy, int PrjKy, int LocKy, int TrnTypKy, string RevsnDt, string OurCd, string AccKy="1" )
        {
            int cky = HTNSession.CKy;
            int usrKy = HTNSession.UsrKy;

            List<ItmCost> list = new List<ItmCost>();
            list = Operation.GetItmsforRate(HTNSession.Environment, cky, PageNo, PageSize, ItmtypKy, OurCd, PrjKy, LocKy, TrnTypKy, RevsnDt, usrKy,AccKy);
            return Json(list, JsonRequestBehavior.AllowGet);

        }

        public ActionResult GetSubConItemRate(string PrjKy, string AccKy, string RevsnDt, string OurCd)
        {
            int cky = HTNSession.CKy;
            int usrKy = HTNSession.UsrKy;

            List<ItmCost> list = new List<ItmCost>();
            list = Operation.GetSubConItemRate(HTNSession.Environment, cky, usrKy, Convert.ToInt32(PrjKy), Convert.ToInt32(AccKy), RevsnDt, OurCd);
            return Json(list, JsonRequestBehavior.AllowGet);

        }

        [HttpPost]
        public ActionResult UpdateItmsforRate(string ObjKy, string updateAccmacc, string newAccmacc, string OurCd, string LocKy, string PrjKy , string RevsnDt) //List<ItmCost> list
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            
            //bool process = false;
            var insertUpdate = Operation.UpdateItmsforRate(HTNSession.Environment, UsrKy, CKy, Convert.ToInt32(ObjKy), OurCd, LocKy,Convert.ToInt32(PrjKy), RevsnDt, updateAccmacc, newAccmacc);

            return Json(insertUpdate, JsonRequestBehavior.AllowGet);
        }

        public ActionResult UpdateSubConRate(string ObjKy, string updateAccmacc, string newAccmacc, string OurCd)
        {
            int CKy = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;

            //bool process = false;
            var insertUpdate = Operation.UpdateSubConRate(HTNSession.Environment, UsrKy, CKy, Convert.ToInt32(ObjKy), OurCd, updateAccmacc, newAccmacc);

            return Json(insertUpdate, JsonRequestBehavior.AllowGet);
        }

        public ActionResult InsertUpdateItmRate(string updatedOrders, string newOrders, string deletedOrders)
        {

            int usrKy = HTNSession.UsrKy;

            bool Msg = Operation.InsertUpdateItmRate(HTNSession.Environment, usrKy, updatedOrders, newOrders, deletedOrders);
            return Json("Success!");
        }

        public JsonResult ItmNm_SelectforItmRate(string ItmTypKy)
        {
            int cky = HTNSession.CKy;
            int usrKy = HTNSession.UsrKy;
            List<ItmMasModel> list = new List<ItmMasModel>();
            list = Operation.ItmNm_SelectforItmRate(HTNSession.Environment, cky, usrKy, Convert.ToInt32(ItmTypKy));
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult CheckItmCdExist(string ItmCd, string ItmTypKy)
        {
            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;

            bool list = Operation.CheckItmCdExist(HTNSession.Environment, ItmCd, ItmTypKy, UsrKy, CKy);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult BUNMLookupForItmMas()
        {
            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;

            List<BUModel> PettySettle = new List<BUModel>();
            PettySettle = Operation.BUNMLookupForItmMas(HTNSession.Environment, CKy, UsrKy);

            return Json(PettySettle, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetPrntItmCdCmb(int ObjKy)
        {
            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;
            

            int TrnTypKy = 1;
            int PreKy = 1;

            List<PrntItmNmModel> PettySettle = new List<PrntItmNmModel>();
            PettySettle = Operation.GetPrntItmCdCmb(HTNSession.Environment, CKy, UsrKy, ObjKy, TrnTypKy, PreKy);

            return Json(PettySettle, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetPrntItmNmCmb(int ObjKy)
        {
            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;
            

            int TrnTypKy = 1;
            int PreKy = 1;

            List<PrntItmNmModel> PettySettle = new List<PrntItmNmModel>();
            PettySettle = Operation.GetPrntItmNmCmb(HTNSession.Environment, CKy, UsrKy, ObjKy, TrnTypKy, PreKy);

            return Json(PettySettle, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetItmAccCatCdCmb(int ObjKy)
        {
            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;
            

            int TrnTypKy = 1;
            int PreKy = 1;

            List<ItmMasModel> PettySettle = new List<ItmMasModel>();
            PettySettle = Operation.GetItmAccCatCdCmb(HTNSession.Environment, CKy, UsrKy, ObjKy, TrnTypKy, PreKy);

            return Json(PettySettle, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetItmAccCatNmCmb(int ObjKy)
        {
            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;
            

            int TrnTypKy = 1;
            int PreKy = 1;

            List<ItmMasModel> PettySettle = new List<ItmMasModel>();
            PettySettle = Operation.GetItmAccCatNmCmb(HTNSession.Environment, CKy, UsrKy, ObjKy, TrnTypKy, PreKy);

            return Json(PettySettle, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetPriCatCdCmb(int ObjKy)
        {
            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;
            

            int TrnTypKy = 1;
            int PreKy = 1;

            List<ItmMasModel> PettySettle = new List<ItmMasModel>();
            PettySettle = Operation.GetPriCatCdCmb(HTNSession.Environment, CKy, UsrKy, ObjKy, TrnTypKy, PreKy);

            return Json(PettySettle, JsonRequestBehavior.AllowGet);
        }


        public JsonResult ItmMasEAN_SelectWeb(int ObjKy, int ItmKy)
        {
            //int CKy = HTNSession.CKy;
            int usrKy = HTNSession.UsrKy;
            int Cky = HTNSession.CKy;
            
            List<ItmMasEAN> list = new List<ItmMasEAN>();
            list = Operation.ItmMasEAN_SelectWeb(HTNSession.Environment, ItmKy, usrKy, Cky, ObjKy);

            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public ActionResult InsertUpdateEAN(int ObjKy, string EANUpdate, string EANNew, string ItmKy)
        {
            bool process = false;
            int Cky = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;
            

            // Dont call each object from UI controller, Change the code to datalayer in API
            //foreach (CdMas model in list)
            //{
            process = Operation.InsertUpdateEAN(HTNSession.Environment, EANUpdate, EANNew, ItmKy, Cky, UsrKy, ObjKy);
            //}
            return Json(process, JsonRequestBehavior.AllowGet);
        }


        public ActionResult InsertUpdateItems(string updateAccmacc, string newAccmacc, string ItmTypKy)
        {
            bool process = false;
            int cky = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;

            // Dont call each object from UI controller, Change the code to datalayer in API
            //foreach (CdMas model in list)
            //{
            process = Operation.InsertUpdateItems(HTNSession.Environment, updateAccmacc, newAccmacc, ItmTypKy, cky, UsrKy);

            if (process)
            {

                HTNCache.ClearCacheItems("ItmID", "CKy:" + cky.ToString());
                HTNCache.ClearCacheItems("ItmNm", "CKy:" + cky.ToString());
            }
            //}
            return Json(process, JsonRequestBehavior.AllowGet);
        }

        //#region for Return Methods
        //public ActionResult GetItmTypKy(string ConCd, string OurCd)
        //{
        //    int cky = HTNSession.CKy;
        //    int usrKy = HTNSession.UsrKy;
        //    List<ItmMasCatModel> list = new List<ItmMasCatModel>();
        //    list = dbOpr.GetItmTypKy(HTNSession.Environment, cky, ConCd, OurCd, usrKy);

        //    return Json(list, JsonRequestBehavior.AllowGet);
        //}
        //#endregion

        public JsonResult ItemMas_Prop_SelectWeb(int ObjKy, int ItmKy, int LocKy)
        {
            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;
            
            List<ItmMasModel> PettySettle = new List<ItmMasModel>();
            PettySettle = Operation.ItemMas_Prop_SelectWeb(HTNSession.Environment, CKy, UsrKy, ObjKy, ItmKy, LocKy);

            return Json(PettySettle, JsonRequestBehavior.AllowGet);
        }

        public ActionResult InsertUpdateNonCompanyItems(string updateAccmacc, string newAccmacc, string ItmTypKy)
        {
            bool process = false;
            int cky = HTNSession.CKy;
            int UsrKy = HTNSession.UsrKy;

            process = Operation.InsertUpdateNonCompanyItems(HTNSession.Environment, updateAccmacc, newAccmacc, ItmTypKy, cky, UsrKy);
            //}
            return Json(process, JsonRequestBehavior.AllowGet);
        }

        public JsonResult ItmMasSerNo_SelectWeb(int ItmKy, int ObjKy, int PrjKy = 1, string OurCd = "")
        {
            int cky = HTNSession.CKy;
            int usrKy = HTNSession.UsrKy;
            List<ItmMasSerNo> list = new List<ItmMasSerNo>();
            list = Operation.ItmMasSerNo_SelectWeb(HTNSession.Environment, cky, usrKy, ObjKy, ItmKy, PrjKy, OurCd);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult ItmMasSerNo_InsertUpdate(string SerNoListString, string OurCd = "")
        {
            int cky = HTNSession.CKy;
            int usrKy = HTNSession.UsrKy;            
            bool result = Operation.ItmMasSerNo_InsertUpdate(HTNSession.Environment, cky, usrKy, SerNoListString, OurCd);
            return Json(result, JsonRequestBehavior.AllowGet);
        }

    }
}
