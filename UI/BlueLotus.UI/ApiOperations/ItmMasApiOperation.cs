using BlueLotus.ItmMas.Model.Entity;
using BlueLotus.ViewModel.Entity;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Runtime.Serialization.Json;
using System.Text;
using System.Web;
using System.Web.Script.Serialization;

namespace BlueLotus.UI.ApiOperations
{
    public partial class ApiOperation
    {
        string ItmMasBaseUri = "api/ItmMas/";

        public List<ItmMasCatModel> GetDept(string EnvironmentName, int cKy, string ConCd, int isAllAcsLvl, int UsrKy, int ObjKy)
        {
            string actionUri = "GetDept";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("ConCd", ConCd);
            paramDictionary.Add("isAllAcsLvl", isAllAcsLvl);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("ObjKy", ObjKy);
            paramDictionary.Add("CKy", cKy);

            List<ItmMasCatModel> menuList = new List<ItmMasCatModel>();
            menuList = RunApiOperation(
                ItmMasBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                menuList.GetType()) as List<ItmMasCatModel>;

            return menuList;
        }
        public List<ItmMasCatModel> GetItmTyp(string EnvironmentName, int cKy, string ConCd, int isAllAcsLvl, int UsrKy, int ObjKy)
        {
            string actionUri = "GetItmTyp";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", cKy);
            paramDictionary.Add("ConCd", ConCd);
            paramDictionary.Add("isAllAcsLvl", isAllAcsLvl);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("ObjKy", ObjKy);

            List<ItmMasCatModel> menuList = new List<ItmMasCatModel>();
            menuList = RunApiOperation(
                ItmMasBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                menuList.GetType()) as List<ItmMasCatModel>;

            return menuList;
        }
        public List<ItmMasCatModel> GetDisplayNm(string EnvironmentName, int cKy, string ConCd, int isAllAcsLvl, int UsrKy, int ObjKy)
        {
            string actionUri = "GetDisplayNm";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", cKy);
            paramDictionary.Add("ConCd", ConCd);
            paramDictionary.Add("isAllAcsLvl", isAllAcsLvl);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("ObjKy", ObjKy);

            List<ItmMasCatModel> menuList = new List<ItmMasCatModel>();
            menuList = RunApiOperation(
               ItmMasBaseUri,
               actionUri,
               EnvironmentName,
               paramDictionary,
               menuList.GetType()) as List<ItmMasCatModel>;

            return menuList;
        }
        public List<ItmMasCatModel> GetGrpInventory(string EnvironmentName, int cKy, string ConCd, int isAllAcsLvl, int UsrKy, int ObjKy)
        {
            string actionUri = "GetGrpInventory";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", cKy);
            paramDictionary.Add("ConCd", ConCd);
            paramDictionary.Add("isAllAcsLvl", isAllAcsLvl);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("ObjKy", ObjKy);

            List<ItmMasCatModel> menuList = new List<ItmMasCatModel>();
            menuList = RunApiOperation(
               ItmMasBaseUri,
               actionUri,
               EnvironmentName,
               paramDictionary,
               menuList.GetType()) as List<ItmMasCatModel>;

            return menuList;
        }
        public List<ItmMasCatModel> GetVat(string EnvironmentName, int cKy, string ConCd, int isAllAcsLvl, int UsrKy, int ObjKy)
        {
            string actionUri = "GetVat";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", cKy);
            paramDictionary.Add("ConCd", ConCd);
            paramDictionary.Add("isAllAcsLvl", isAllAcsLvl);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("ObjKy", ObjKy);

            List<ItmMasCatModel> menuList = new List<ItmMasCatModel>();
            menuList = RunApiOperation(
              ItmMasBaseUri,
              actionUri,
              EnvironmentName,
              paramDictionary,
              menuList.GetType()) as List<ItmMasCatModel>;

            return menuList;
        }

        public List<ItmMasCatModel> GetCategory(string EnvironmentName, int cKy, string ConCd, int isAllAcsLvl, int UsrKy)
        {
            string actionUri = "GetCategory";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", cKy);
            paramDictionary.Add("ConCd", ConCd);
            paramDictionary.Add("isAllAcsLvl", isAllAcsLvl);
            paramDictionary.Add("UsrKy", UsrKy);

            List<ItmMasCatModel> menuList = new List<ItmMasCatModel>();
            menuList = RunApiOperation(
              ItmMasBaseUri,
              actionUri,
              EnvironmentName,
              paramDictionary,
              menuList.GetType()) as List<ItmMasCatModel>;

            return menuList;
        }

        public List<ItmMasCatModel> GetBrand(string EnvironmentName, int cKy, string ConCd, int UsrKy)
        {
            string actionUri = "GetBrand";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", cKy);
            paramDictionary.Add("ConCd", ConCd);
            paramDictionary.Add("UsrKy", UsrKy);

            List<ItmMasCatModel> menuList = new List<ItmMasCatModel>();
            menuList = RunApiOperation(
            ItmMasBaseUri,
            actionUri,
            EnvironmentName,
            paramDictionary,
            menuList.GetType()) as List<ItmMasCatModel>;

            return menuList;
        }

        public List<ItmMasCatModel> GetItmTypKy(string EnvironmentName, int cky, string ConCd, string OurCd, int usrKy)
        {
            string actionUri = "GetItmTypKy";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("cky", cky);
            paramDictionary.Add("ConCd", ConCd);
            paramDictionary.Add("OurCd", OurCd);
            paramDictionary.Add("usrKy", usrKy);

            List<ItmMasCatModel> menuList = new List<ItmMasCatModel>();
            menuList = RunApiOperation(
            ItmMasBaseUri,
            actionUri,
            EnvironmentName,
            paramDictionary,
            menuList.GetType()) as List<ItmMasCatModel>;

            return menuList;
        }

        internal List<ItmMasModel> CheckItmCd(string EnvironmentName, int CKy, int UsrKy, string ItmCd)
        {
            string actionUri = "CheckItmCd";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("ItmCd", ItmCd);

            List<ItmMasModel> menuList = new List<ItmMasModel>();
            menuList = RunApiOperation(
            ItmMasBaseUri,
            actionUri,
            EnvironmentName,
            paramDictionary,
            menuList.GetType()) as List<ItmMasModel>;

            return menuList;
        }

        internal List<ItmMasModel> CheckItmNm(string EnvironmentName, int CKy, int UsrKy, string ItmNm)
        {
            string actionUri = "CheckItmNm";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("ItmNm", ItmNm);

            List<ItmMasModel> menuList = new List<ItmMasModel>();
            menuList = RunApiOperation(
            ItmMasBaseUri,
            actionUri,
            EnvironmentName,
            paramDictionary,
            menuList.GetType()) as List<ItmMasModel>;

            return menuList;
        }
        
        internal List<ItmMasModel> GetAllItems(string EnvironmentName, int OnlyisAct, int ItmTypKy, int Dept, int Cat, int usrKy, int CKy, int ObjKy, string ItmCd, string ItmNm, int PageNo , int PageSize )
        {
            string actionUri = "GetAllItems";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("ItmTypKy", ItmTypKy);
            paramDictionary.Add("OnlyisAct", OnlyisAct);
            paramDictionary.Add("Dept", Dept);
            paramDictionary.Add("Cat", Cat);
            paramDictionary.Add("usrKy", usrKy);
            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("ObjKy", ObjKy);
            paramDictionary.Add("ItmCd", ItmCd);
            paramDictionary.Add("ItmNm", ItmNm);
            paramDictionary.Add("PageNo", PageNo);
            paramDictionary.Add("PageSize", PageSize);

            List<ItmMasModel> menuList = new List<ItmMasModel>();
            menuList = RunApiOperation(
            ItmMasBaseUri,
            actionUri,
            EnvironmentName,
            paramDictionary,
            menuList.GetType()) as List<ItmMasModel>;

            return menuList;
        }

        internal List<ItmMasModel> GetAllNonCompanyItems(string EnvironmentName, int OnlyisAct, int ItmTypKy, int usrKy, int CKy, int ObjKy)
        {
            string actionUri = "GetAllNonCompanyItems";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("ItmTypKy", ItmTypKy);
            paramDictionary.Add("OnlyisAct", OnlyisAct);
            paramDictionary.Add("usrKy", usrKy);
            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("ObjKy", ObjKy);

            List<ItmMasModel> menuList = new List<ItmMasModel>();
            menuList = RunApiOperation(
            ItmMasBaseUri,
            actionUri,
            EnvironmentName,
            paramDictionary,
            menuList.GetType()) as List<ItmMasModel>;

            return menuList;
        }

        internal List<ResourceForTaskAloc_Select> ResourceForItmAloc_Select(string EnvironmentName, int CKy, int UsrKy, string ItmCd, string ItmNm, int ItmTypKy, int ItmCat1Ky, int ItmCat2Ky, int ItmCat3Ky)
        {
            string actionUri = "ResourceForItmAloc_Select";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("ItmCd", ItmCd);
            paramDictionary.Add("ItmNm", ItmNm);
            paramDictionary.Add("ItmTypKy", ItmTypKy);
            paramDictionary.Add("ItmCat1Ky", ItmCat1Ky);
            paramDictionary.Add("ItmCat2Ky", ItmCat2Ky);
            paramDictionary.Add("ItmCat3Ky", ItmCat3Ky);

            List<ResourceForTaskAloc_Select> menuList = new List<ResourceForTaskAloc_Select>();
            menuList = RunApiOperation(
            ItmMasBaseUri,
            actionUri,
            EnvironmentName,
            paramDictionary,
            menuList.GetType()) as List<ResourceForTaskAloc_Select>;

            return menuList;
        }

        internal List<ItemComponent> ItmCompnResource_Select(string EnvironmentName, int usrKy, int ItmKy)
        {
            string actionUri = "ItmCompnResource_Select";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("usrKy", usrKy);
            paramDictionary.Add("ItmKy", ItmKy);

            List<ItemComponent> menuList = new List<ItemComponent>();
            menuList = RunApiOperation(
            ItmMasBaseUri,
            actionUri,
            EnvironmentName,
            paramDictionary,
            menuList.GetType()) as List<ItemComponent>;

            return menuList;
        }

        internal List<ConvRate> GetChangeConRate(string EnvironmentName, string UnitKy, string ItmKy, int UsrKy)
        {
            string actionUri = "GetChangeConRate";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("UnitKy", UnitKy);
            paramDictionary.Add("ItmKy", ItmKy);
            paramDictionary.Add("UsrKy", UsrKy);

            List<ConvRate> menuList = new List<ConvRate>();
            menuList = RunApiOperation(
           ItmMasBaseUri,
           actionUri,
           EnvironmentName,
           paramDictionary,
           menuList.GetType()) as List<ConvRate>;

            return menuList;
        }

        internal List<ConvRate> GetItmUnit(string EnvironmentName, string ItmKy, int UsrKy)
        {
            string actionUri = "GetItmUnit";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("ItmKy", ItmKy);
            paramDictionary.Add("UsrKy", UsrKy);

            List<ConvRate> menuList = new List<ConvRate>();
            menuList = RunApiOperation(
           ItmMasBaseUri,
           actionUri,
           EnvironmentName,
           paramDictionary,
           menuList.GetType()) as List<ConvRate>;

            return menuList;
        }

        internal List<ItemComponentHdr> ItmCompnHdr_Select(string EnvironmentName, int ItmKy, int UsrKy)
        {
            string actionUri = "ItmCompnHdr_Select";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("ItmKy", ItmKy);
            paramDictionary.Add("UsrKy", UsrKy);

            List<ItemComponentHdr> menuList = new List<ItemComponentHdr>();
            menuList = RunApiOperation(
           ItmMasBaseUri,
           actionUri,
           EnvironmentName,
           paramDictionary,
           menuList.GetType()) as List<ItemComponentHdr>;

            return menuList;
        }

        internal List<ItmMasCatModel> ItmCat1Nm(string EnvironmentName, int cky, int UsrKy)
        {
            string actionUri = "ItmCat1Nm";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("cky", cky);
            paramDictionary.Add("UsrKy", UsrKy);

            List<ItmMasCatModel> menuList = new List<ItmMasCatModel>();
            menuList = RunApiOperation(
           ItmMasBaseUri,
           actionUri,
           EnvironmentName,
           paramDictionary,
           menuList.GetType()) as List<ItmMasCatModel>;

            return menuList;
        }

        internal List<ItmMasCatModel> ItmCat2Nm(string EnvironmentName, int cky, int UsrKy)
        {
            string actionUri = "ItmCat2Nm";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("cky", cky);
            paramDictionary.Add("UsrKy", UsrKy);

            List<ItmMasCatModel> menuList = new List<ItmMasCatModel>();
            menuList = RunApiOperation(
           ItmMasBaseUri,
           actionUri,
           EnvironmentName,
           paramDictionary,
           menuList.GetType()) as List<ItmMasCatModel>;

            return menuList;
        }

        internal List<ItmMasCatModel> ItmCat3Nm(string EnvironmentName, int cky, int UsrKy)
        {
            string actionUri = "ItmCat3Nm";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("cky", cky);
            paramDictionary.Add("UsrKy", UsrKy);

            List<ItmMasCatModel> menuList = new List<ItmMasCatModel>();
            menuList = RunApiOperation(
           ItmMasBaseUri,
           actionUri,
           EnvironmentName,
           paramDictionary,
           menuList.GetType()) as List<ItmMasCatModel>;

            return menuList;
        }

        internal List<ItmMasCatModel> ItmCat4Nm(string EnvironmentName, int cky, int UsrKy)
        {
            string actionUri = "ItmCat4Nm";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("cky", cky);
            paramDictionary.Add("UsrKy", UsrKy);

            List<ItmMasCatModel> menuList = new List<ItmMasCatModel>();
            menuList = RunApiOperation(
           ItmMasBaseUri,
           actionUri,
           EnvironmentName,
           paramDictionary,
           menuList.GetType()) as List<ItmMasCatModel>;

            return menuList;
        }

        internal List<ItmMasCatModel> ItmCat5Nm(string EnvironmentName, int cky, int UsrKy)
        {
            string actionUri = "ItmCat5Nm";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("cky", cky);
            paramDictionary.Add("UsrKy", UsrKy);

            List<ItmMasCatModel> menuList = new List<ItmMasCatModel>();
            menuList = RunApiOperation(
           ItmMasBaseUri,
           actionUri,
           EnvironmentName,
           paramDictionary,
           menuList.GetType()) as List<ItmMasCatModel>;

            return menuList;
        }

        internal List<ItmMasCatModel> ItmCat6Nm(string EnvironmentName, int cky, int UsrKy)
        {
            string actionUri = "ItmCat6Nm";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("cky", cky);
            paramDictionary.Add("UsrKy", UsrKy);

            List<ItmMasCatModel> menuList = new List<ItmMasCatModel>();
            menuList = RunApiOperation(
           ItmMasBaseUri,
           actionUri,
           EnvironmentName,
           paramDictionary,
           menuList.GetType()) as List<ItmMasCatModel>;

            return menuList;
        }

        internal List<ItmMasCatModel> ItmCat7Nm(string EnvironmentName, int cky, int UsrKy)
        {
            string actionUri = "ItmCat7Nm";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("cky", cky);
            paramDictionary.Add("UsrKy", UsrKy);

            List<ItmMasCatModel> menuList = new List<ItmMasCatModel>();
            menuList = RunApiOperation(
           ItmMasBaseUri,
           actionUri,
           EnvironmentName,
           paramDictionary,
           menuList.GetType()) as List<ItmMasCatModel>;

            return menuList;
        }

        internal List<ItmMasCatModel> ItmCat8Nm(string EnvironmentName, int cky, int UsrKy)
        {
            string actionUri = "ItmCat8Nm";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("cky", cky);
            paramDictionary.Add("UsrKy", UsrKy);

            List<ItmMasCatModel> menuList = new List<ItmMasCatModel>();
            menuList = RunApiOperation(
           ItmMasBaseUri,
           actionUri,
           EnvironmentName,
           paramDictionary,
           menuList.GetType()) as List<ItmMasCatModel>;

            return menuList;
        }

        internal List<ItmMasCatModel> ItmCat9Nm(string EnvironmentName, int cky, int UsrKy)
        {
            string actionUri = "ItmCat9Nm";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("cky", cky);
            paramDictionary.Add("UsrKy", UsrKy);

            List<ItmMasCatModel> menuList = new List<ItmMasCatModel>();
            menuList = RunApiOperation(
           ItmMasBaseUri,
           actionUri,
           EnvironmentName,
           paramDictionary,
           menuList.GetType()) as List<ItmMasCatModel>;

            return menuList;
        }

        internal List<ItmMasCatModel> ItmCat10Nm(string EnvironmentName, int cky, int UsrKy)
        {
            string actionUri = "ItmCat10Nm";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("cky", cky);
            paramDictionary.Add("UsrKy", UsrKy);

            List<ItmMasCatModel> menuList = new List<ItmMasCatModel>();
            menuList = RunApiOperation(
           ItmMasBaseUri,
           actionUri,
           EnvironmentName,
           paramDictionary,
           menuList.GetType()) as List<ItmMasCatModel>;

            return menuList;
        }

        internal List<ItmMasCatModel> ItmCat11Nm(string EnvironmentName, int cky, int UsrKy)
        {
            string actionUri = "ItmCat11Nm";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("cky", cky);
            paramDictionary.Add("UsrKy", UsrKy);

            List<ItmMasCatModel> menuList = new List<ItmMasCatModel>();
            menuList = RunApiOperation(
           ItmMasBaseUri,
           actionUri,
           EnvironmentName,
           paramDictionary,
           menuList.GetType()) as List<ItmMasCatModel>;

            return menuList;
        }

        internal List<ItmMasCatModel> ItmCat12Nm(string EnvironmentName, int cky, int UsrKy)
        {
            string actionUri = "ItmCat12Nm";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("cky", cky);
            paramDictionary.Add("UsrKy", UsrKy);

            List<ItmMasCatModel> menuList = new List<ItmMasCatModel>();
            menuList = RunApiOperation(
           ItmMasBaseUri,
           actionUri,
           EnvironmentName,
           paramDictionary,
           menuList.GetType()) as List<ItmMasCatModel>;

            return menuList;
        }

        internal List<UnitModel> GetUnit(string EnvironmentName, int UsrKy)
        {
            string actionUri = "GetUnit";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("UsrKy", UsrKy);

            List<UnitModel> menuList = new List<UnitModel>();
            menuList = RunApiOperation(
           ItmMasBaseUri,
           actionUri,
           EnvironmentName,
           paramDictionary,
           menuList.GetType()) as List<UnitModel>;

            return menuList;
        }

        
        internal List<UnitModel> ItmMasUnit_SelectMobile(string EnvironmentName, int UsrKy, int CKy,string ObjKy="1")
        {
            string actionUri = "ItmMasUnit_SelectMobile";
            //int CKy, int UsrKy, int ObjKy, string EnvironmentName
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("ObjKy", ObjKy);

            List<UnitModel> menuList = new List<UnitModel>();
            menuList = RunApiOperation(
           ItmMasBaseUri,
           actionUri,
           EnvironmentName,
           paramDictionary,
           menuList.GetType()) as List<UnitModel>;

            return menuList;
        }
        internal bool Insert(string EnvironmentName, ItmMasModel model, int UsrKy)
        {
            string actionUri = "Insert";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();
            string modelString = new JavaScriptSerializer().Serialize(model);

            paramDictionary.Add("modelString", modelString);
            paramDictionary.Add("UsrKy", UsrKy);

            bool Result = new bool();
            object list = new object();
            list = RunApiOperation(
                ItmMasBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                Result.GetType()) as object;

            return Result = Convert.ToBoolean(list);
        }

        internal bool Update(string EnvironmentName, ItmMasModel model, int UsrKy)
        {
            string actionUri = "Update";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();
            string modelString = new JavaScriptSerializer().Serialize(model);

            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("modelString", modelString);

            bool Result = new bool();
            object list = new object();
            list = RunApiOperation(
                ItmMasBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                Result.GetType()) as object;

            return Result = Convert.ToBoolean(list);
        }

        internal bool DeleteItmMas(string EnvironmentName, long key, int UsrKy)
        {
            string actionUri = "DeleteItmMas";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("key", key);
            paramDictionary.Add("UsrKy", UsrKy);

            bool Result = new bool();
            object list = new object();
            list = RunApiOperation(
                ItmMasBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                Result.GetType()) as object;

            return Result = Convert.ToBoolean(list);

        }

        internal bool InsertItemComponent(string EnvironmentName, string updatedOrders, string newOrders, string deletedOrders, string FinQty, string ItmCmpnKy, string FinItmKy, DateTime dt, int UsrKy)
        {
            string actionUri = "InsertItemComponent";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("updatedOrders", updatedOrders);
            paramDictionary.Add("newOrders", newOrders);
            paramDictionary.Add("deletedOrders", deletedOrders);
            paramDictionary.Add("FinQty", FinQty);
            paramDictionary.Add("ItmCmpnKy", ItmCmpnKy);
            paramDictionary.Add("FinItmKy", FinItmKy);
            paramDictionary.Add("dt", dt);
            paramDictionary.Add("UsrKy", UsrKy);

            bool Result = new bool();
            object list = new object();
            list = RunApiOperation(
                ItmMasBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                Result.GetType()) as object;

            return Result = Convert.ToBoolean(list);
        }

        internal bool InsertItmUnit(string EnvironmentName, int usrKy, string updatedOrders, string newOrders, string deletedOrders, string ItmKy)
        {
            string actionUri = "InsertItmUnit";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("usrKy", usrKy);
            paramDictionary.Add("updatedOrders", updatedOrders);
            paramDictionary.Add("newOrders", newOrders);
            paramDictionary.Add("deletedOrders", deletedOrders);
            paramDictionary.Add("ItmKy", ItmKy);

            bool Result = new bool();
            object list = new object();
            list = RunApiOperation(
                ItmMasBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                Result.GetType()) as object;

            return Result = Convert.ToBoolean(list);
        }

        internal List<ItmMasCatModel> GetItmTyp(string EnvironmentName, int cky, int UsrKy)
        {
            string actionUri = "GetItmTyp";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("cky", cky);
            paramDictionary.Add("UsrKy", UsrKy);

            List<ItmMasCatModel> menuList = new List<ItmMasCatModel>();
            menuList = RunApiOperation(
           ItmMasBaseUri,
           actionUri,
           EnvironmentName,
           paramDictionary,
           menuList.GetType()) as List<ItmMasCatModel>;

            return menuList;
        }

        internal List<ItmMasCatModel> GetLocList(string EnvironmentName, int cky, int UsrKy)
        {
            string actionUri = "GetLocList";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("cky", cky);
            paramDictionary.Add("UsrKy", UsrKy);

            List<ItmMasCatModel> menuList = new List<ItmMasCatModel>();
            menuList = RunApiOperation(
           ItmMasBaseUri,
           actionUri,
           EnvironmentName,
           paramDictionary,
           menuList.GetType()) as List<ItmMasCatModel>;

            return menuList;
        }

        internal List<ItmMasCatModel> GetPusFmList(string EnvironmentName, int cky, int UsrKy)
        {
            string actionUri = "GetPusFmList";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("cky", cky);
            paramDictionary.Add("UsrKy", UsrKy);

            List<ItmMasCatModel> menuList = new List<ItmMasCatModel>();
            menuList = RunApiOperation(
           ItmMasBaseUri,
           actionUri,
           EnvironmentName,
           paramDictionary,
           menuList.GetType()) as List<ItmMasCatModel>;

            return menuList;
        }

        internal List<ItmMasCatModel> GetTrncList(string EnvironmentName, int cky, int UsrKy)
        {
            string actionUri = "GetTrncList";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("cky", cky);
            paramDictionary.Add("UsrKy", UsrKy);

            List<ItmMasCatModel> menuList = new List<ItmMasCatModel>();
            menuList = RunApiOperation(
           ItmMasBaseUri,
           actionUri,
           EnvironmentName,
           paramDictionary,
           menuList.GetType()) as List<ItmMasCatModel>;

            return menuList;
        }

        internal long GetControlConKyForItmRate(string EnvironmentName, string TblNm, string OurCd, int UsrKy, int CKy)
        {
            string actionUri = "GetControlConKy";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("TblNm", TblNm);
            paramDictionary.Add("OurCd", OurCd);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("CKy", CKy);

            long TrnKy = 0;
            object list = new object();
            list = RunApiOperation(
                ItmMasBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as object;

            return TrnKy = Convert.ToInt64(list);
        }

        internal List<ItmCost> GetItmsforRate(string EnvironmentName, int cky, int PageNo, int PageSize, int ItmtypKy, string OurCd, int PrjKy, int LocKy, int TrnTypKy, string RevsnDt, int usrKy,string AccKy="1")
        {
            string actionUri = "GetItmsforRate";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("cky", cky);
            paramDictionary.Add("PageNo", PageNo);
            paramDictionary.Add("PageSize", PageSize);
            paramDictionary.Add("ItmtypKy", ItmtypKy);
            paramDictionary.Add("OurCd", OurCd);
            paramDictionary.Add("PrjKy", PrjKy);
            paramDictionary.Add("LocKy", LocKy);
            paramDictionary.Add("TrnTypKy", TrnTypKy);
            paramDictionary.Add("RevsnDt", RevsnDt);
            paramDictionary.Add("usrKy", usrKy);
            paramDictionary.Add("AccKy", AccKy);

            
            List<ItmCost> menuList = new List<ItmCost>();
            menuList = RunApiOperation(
           ItmMasBaseUri,
           actionUri,
           EnvironmentName,
           paramDictionary,
           menuList.GetType()) as List<ItmCost>;

            return menuList;
        }

        internal List<ItmCost> GetSubConItemRate(string EnvironmentName, int cky, int usrKy, int prjKy, int accKy, string revsnDt, string ourCd)
        {
            string actionUri = "GetSubConItemRate";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("cky", cky);
            paramDictionary.Add("usrKy", usrKy);
            paramDictionary.Add("OurCd", ourCd);
            paramDictionary.Add("PrjKy", prjKy);
            paramDictionary.Add("AccKy", accKy);
            paramDictionary.Add("RevsnDt", revsnDt);
            

            List<ItmCost> menuList = new List<ItmCost>();
            menuList = RunApiOperation(
           ItmMasBaseUri,
           actionUri,
           EnvironmentName,
           paramDictionary,
           menuList.GetType()) as List<ItmCost>;

            return menuList;
        }

        internal bool UpdateItmsforRate(string EnvironmentName, int UsrKy, int CKy, int ObjKy, string OurCd, string LocKy, int PrjKy, string RevsnDt, string updateAccmacc, string newAccmacc)
        {
            string actionUri = "UpdateItmsforRate";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("ObjKy", ObjKy);
            paramDictionary.Add("OurCd", OurCd);
            paramDictionary.Add("LocKy", LocKy);
            paramDictionary.Add("PrjKy", PrjKy);
            paramDictionary.Add("RevsnDt", RevsnDt);
            paramDictionary.Add("updateAccmacc", updateAccmacc);
            paramDictionary.Add("newAccmacc", newAccmacc);

            bool Result = new bool();
            object list = new object();
            list = RunApiOperation(
                ItmMasBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                Result.GetType()) as object;

            return Result = Convert.ToBoolean(list);
        }

        internal bool UpdateSubConRate(string EnvironmentName, int UsrKy, int CKy, int ObjKy, string OurCd, string updateAccmacc, string newAccmacc)
        {
            string actionUri = "UpdateSubConRate";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("ObjKy", ObjKy);
            paramDictionary.Add("OurCd", OurCd);
            paramDictionary.Add("updatRecords", updateAccmacc);
            paramDictionary.Add("newRecords", newAccmacc);

            bool Result = new bool();
            object list = new object();
            list = RunApiOperation(
                ItmMasBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                Result.GetType()) as object;

            return Result = Convert.ToBoolean(list);
        }

        internal bool InsertUpdateItmRate(string EnvironmentName, int usrKy, string updatedOrders, string newOrders, string deletedOrders)
        {
            string actionUri = "InsertUpdateItmRate";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("usrKy", usrKy);
            paramDictionary.Add("updatedOrders", updatedOrders);
            paramDictionary.Add("newOrders", newOrders);
            paramDictionary.Add("deletedOrders", deletedOrders);

            bool Result = new bool();
            object list = new object();
            list = RunApiOperation(
                ItmMasBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                Result.GetType()) as object;

            return Result = Convert.ToBoolean(list);
        }

        internal bool InsertPrcsItemComponent(string EnvironmentName, int usrKy, string updatedOrders, string newOrders, string deletedOrders)
        {
            string actionUri = "InsertPrcsItemComponent";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("usrKy", usrKy);
            paramDictionary.Add("updatedOrders", updatedOrders);
            paramDictionary.Add("newOrders", newOrders);
            paramDictionary.Add("deletedOrders", deletedOrders);

            bool Result = new bool();
            object list = new object();
            list = RunApiOperation(
                ItmMasBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                Result.GetType()) as object;

            return Result = Convert.ToBoolean(list);
        }

        internal List<CdMas> GetAllCodesFromGantt(string EnvironmentName, string ConCd, int cky, int UsrKy)
        {
            string actionUri = "GetAllCodes";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("ConCd", ConCd);
            paramDictionary.Add("cky", cky);
            paramDictionary.Add("UsrKy", UsrKy);

            List<CdMas> menuList = new List<CdMas>();
            menuList = RunApiOperation(
           ItmMasBaseUri,
           actionUri,
           EnvironmentName,
           paramDictionary,
           menuList.GetType()) as List<CdMas>;

            return menuList;
        }

        internal CdMas GetCdMasByCdKyforItmMass(string EnvironmentName, int cdky, int UsrKy)
        {
            string actionUri = "GetCdMasByCdKyforItmMass";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("cdky", cdky);
            paramDictionary.Add("UsrKy", UsrKy);

            CdMas menuList = new CdMas();
            menuList = RunApiOperation(
           ItmMasBaseUri,
           actionUri,
           EnvironmentName,
           paramDictionary,
           menuList.GetType()) as CdMas;

            return menuList;
        }

        internal List<CMSprojectForItmMas> GetProjectListForItmMas(string EnvironmentName, int cky, int UsrKy)
        {
            string actionUri = "GetProjectListForItmMas";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("cky", cky);
            paramDictionary.Add("UsrKy", UsrKy);

            List<CMSprojectForItmMas> menuList = new List<CMSprojectForItmMas>();
            menuList = RunApiOperation(
           ItmMasBaseUri,
           actionUri,
           EnvironmentName,
           paramDictionary,
           menuList.GetType()) as List<CMSprojectForItmMas>;

            return menuList;
        }

        internal List<ItmMas.Model.Entity.ItmMasModel> ItmNm_SelectforItmRate(string EnvironmentName, int CKy, int UsrKy, int ItmTypKy)
        {
            string actionUri = "ItmNm_SelectforItmRate";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("ItmTypKy", ItmTypKy);

            List<ItmMasModel> menuList = new List<ItmMasModel>();
            menuList = RunApiOperation(
           ItmMasBaseUri,
           actionUri,
           EnvironmentName,
           paramDictionary,
           menuList.GetType()) as List<ItmMasModel>;

            return menuList;
        }

        internal bool CheckItmCdExist(string EnvironmentName, string ItmCd, string ItmTypKy, int UsrKy, int CKy)
        {
            string actionUri = "CheckItmCdExist";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("Itmcd", ItmCd);
            paramDictionary.Add("itmtypky", ItmTypKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("CKy", CKy);

            bool Result = new bool();
            object list = new object();
            list = RunApiOperation(
                ItmMasBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as object;

            return Result = Convert.ToBoolean(list);
        }

        internal List<BUModel> BUNMLookupForItmMas(string EnvironmentName, int CKy, int UsrKy)
        {
            string actionUri = "BUNMLookupForItmMas";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);

            List<BUModel> menuList = new List<BUModel>();
            menuList = RunApiOperation(
           ItmMasBaseUri,
           actionUri,
           EnvironmentName,
           paramDictionary,
           menuList.GetType()) as List<BUModel>;

            return menuList;
        }

        internal List<PrntItmNmModel> GetPrntItmCdCmb(string EnvironmentName, int cKy, int usrKy, int objKy, int trnTypKy, int preKy)
        {
            string actionUri = "GetPrntItmCdCmb";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();


            paramDictionary.Add("CKy", cKy);
            paramDictionary.Add("UsrKy", usrKy);
            paramDictionary.Add("ObjKy", objKy);
            paramDictionary.Add("TrnTypKy", trnTypKy);
            paramDictionary.Add("PreKy", preKy);
            //paramDictionary.Add("IsActive", IsActive);


            List<PrntItmNmModel> List = new List<PrntItmNmModel>();
            List = RunApiOperation(
                ItmMasBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                List.GetType()) as List<PrntItmNmModel>;

            return List;
        }

        internal List<PrntItmNmModel> GetPrntItmNmCmb(string EnvironmentName, int cKy, int usrKy, int objKy, int trnTypKy, int preKy)
        {
            string actionUri = "GetPrntItmNmCmb";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();


            paramDictionary.Add("CKy", cKy);
            paramDictionary.Add("UsrKy", usrKy);
            paramDictionary.Add("ObjKy", objKy);
            paramDictionary.Add("TrnTypKy", trnTypKy);
            paramDictionary.Add("PreKy", preKy);


            List<PrntItmNmModel> List = new List<PrntItmNmModel>();
            List = RunApiOperation(
                ItmMasBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                List.GetType()) as List<PrntItmNmModel>;

            return List;
        }

        internal List<ItmMasModel> GetItmAccCatCdCmb(string EnvironmentName, int cKy, int usrKy, int objKy, int trnTypKy, int preKy)
        {
            string actionUri = "GetItmAccCatCdCmb";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();


            paramDictionary.Add("CKy", cKy);
            paramDictionary.Add("UsrKy", usrKy);
            paramDictionary.Add("ObjKy", objKy);
            paramDictionary.Add("TrnTypKy", trnTypKy);
            paramDictionary.Add("PreKy", preKy);


            List<ItmMasModel> List = new List<ItmMasModel>();
            List = RunApiOperation(
                ItmMasBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                List.GetType()) as List<ItmMasModel>;

            return List;
        }

        internal List<ItmMasModel> GetItmAccCatNmCmb(string EnvironmentName, int cKy, int usrKy, int objKy, int trnTypKy, int preKy)
        {
            string actionUri = "GetItmAccCatNmCmb";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();


            paramDictionary.Add("CKy", cKy);
            paramDictionary.Add("UsrKy", usrKy);
            paramDictionary.Add("ObjKy", objKy);
            paramDictionary.Add("TrnTypKy", trnTypKy);
            paramDictionary.Add("PreKy", preKy);


            List<ItmMasModel> List = new List<ItmMasModel>();
            List = RunApiOperation(
                ItmMasBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                List.GetType()) as List<ItmMasModel>;

            return List;
        }

        internal List<ItmMasModel> GetPriCatCdCmb(string EnvironmentName, int CKy, int UsrKy, int ObjKy, int TrnTypKy, int PreKy)
        {
            string actionUri = "GetPriCatCdCmb";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();


            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("ObjKy", ObjKy);
            paramDictionary.Add("TrnTypKy", TrnTypKy);
            paramDictionary.Add("PreKy", PreKy);


            List<ItmMasModel> List = new List<ItmMasModel>();
            List = RunApiOperation(
                ItmMasBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                List.GetType()) as List<ItmMasModel>;

            return List;
        }

        internal List<ItmMasEAN> ItmMasEAN_SelectWeb(string EnvironmentName, int ItmKy, int UsrKy, int CKy, int ObjKy)
        {
            string actionUri = "ItmMasEAN_SelectWeb";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();


            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("ObjKy", ObjKy);
            paramDictionary.Add("ItmKy", ItmKy);



            List<ItmMasEAN> List = new List<ItmMasEAN>();
            List = RunApiOperation(
                ItmMasBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                List.GetType()) as List<ItmMasEAN>;

            return List;
        }

        internal bool InsertUpdateEAN(string EnvironmentName, string EANUpdate, string EANNew, string ItmKy, int Cky, int UsrKy, int ObjKy)
        {
            string actionUri = "InsertUpdateEAN";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("Cky", Cky);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("ObjKy", ObjKy);
            paramDictionary.Add("ItmKy", ItmKy);
            paramDictionary.Add("EANNew", EANNew);
            paramDictionary.Add("EANUpdate", EANUpdate);

            object list = new object();
            list = RunApiOperation(
                ItmMasBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as object;

            return true;
        }

        internal bool InsertUpdateItems(string EnvironmentName, string updateAccmacc, string newAccmacc, string itmTypKy, int CKy, int UsrKy)
        {
            if (newAccmacc != "[]" || newAccmacc != "[null]" || newAccmacc != "" || newAccmacc != null)
            {
                try
                {
                    ItmMasModel[] NewCodes = new JavaScriptSerializer().Deserialize<ItmMasModel[]>(newAccmacc);

                    for (int i = 0; i < NewCodes.Length; i++)
                    {
                        string actionUri = "InsertUpdateItems";
                        Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

                        string NewmodelString = new JavaScriptSerializer().Serialize(NewCodes[i]);

                        paramDictionary.Add("UsrKy", UsrKy);
                        paramDictionary.Add("CKy", CKy);
                        paramDictionary.Add("ItmTypKy", itmTypKy);
                        paramDictionary.Add("updateAccmacc", null);
                        paramDictionary.Add("newAccmacc", NewmodelString);

                        object list = new object();
                        list = RunApiOperation(
                            ItmMasBaseUri,
                            actionUri,
                            EnvironmentName,
                            paramDictionary,
                            list.GetType()) as object;
                    }
                }
                catch (Exception ex)
                {
                    throw;
                }
            }
            if (updateAccmacc != "[]" || updateAccmacc != "[null]" || updateAccmacc != "" || updateAccmacc != null)
            {
                try
                {
                    ItmMasModel[] UpdateCodes = new JavaScriptSerializer().Deserialize<ItmMasModel[]>(updateAccmacc);

                    for (int i = 0; i < UpdateCodes.Length; i++)
                    {
                        string actionUri = "InsertUpdateItems";
                        Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

                        string UpdatemodelString = new JavaScriptSerializer().Serialize(UpdateCodes[i]);

                        paramDictionary.Add("UsrKy", UsrKy);
                        paramDictionary.Add("CKy", CKy);
                        paramDictionary.Add("ItmTypKy", itmTypKy);
                        paramDictionary.Add("updateAccmacc", UpdatemodelString);
                        paramDictionary.Add("newAccmacc", null);

                        object list = new object();
                        list = RunApiOperation(
                            ItmMasBaseUri,
                            actionUri,
                            EnvironmentName,
                            paramDictionary,
                            list.GetType()) as object;
                    }
                }
                catch (Exception ex)
                {
                    throw;
                }
            }
            return true;

        }

        internal bool InsertUpdateNonCompanyItems(string EnvironmentName, string updateAccmacc, string newAccmacc, string ItmTypKy, int Cky, int UsrKy)
        {
            if (newAccmacc != "[]" || newAccmacc != "[null]" || newAccmacc != "" || newAccmacc != null)
            {
                try
                {
                    ItmMasModel[] NewCodes = new JavaScriptSerializer().Deserialize<ItmMasModel[]>(newAccmacc);

                    for (int i = 0; i < NewCodes.Length; i++)
                    {
                        string actionUri = "InsertNonCompanyItems";
                        Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

                        string NewmodelString = new JavaScriptSerializer().Serialize(NewCodes[i]);

                        paramDictionary.Add("UsrKy", UsrKy);
                        paramDictionary.Add("CKy", Cky);
                        paramDictionary.Add("ItmTypKy", ItmTypKy);
                        paramDictionary.Add("updateAccmacc", null);
                        paramDictionary.Add("newAccmacc", NewmodelString);

                        object list = new object();
                        list = RunApiOperation(
                            ItmMasBaseUri,
                            actionUri,
                            EnvironmentName,
                            paramDictionary,
                            list.GetType()) as object;
                    }
                }
                catch (Exception ex)
                {
                    throw;
                }
            }
            if (updateAccmacc != "[]" || updateAccmacc != "[null]" || updateAccmacc != "" || updateAccmacc != null)
            {
                try
                {
                    ItmMasModel[] UpdateCodes = new JavaScriptSerializer().Deserialize<ItmMasModel[]>(updateAccmacc);

                    for (int i = 0; i < UpdateCodes.Length; i++)
                    {
                        string actionUri = "UpdateNonCompanyItems";
                        Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

                        string UpdatemodelString = new JavaScriptSerializer().Serialize(UpdateCodes[i]);

                        paramDictionary.Add("UsrKy", UsrKy);
                        paramDictionary.Add("CKy", Cky);
                        paramDictionary.Add("ItmTypKy", ItmTypKy);
                        paramDictionary.Add("updateAccmacc", UpdatemodelString);
                        paramDictionary.Add("newAccmacc", null);

                        object list = new object();
                        list = RunApiOperation(
                            ItmMasBaseUri,
                            actionUri,
                            EnvironmentName,
                            paramDictionary,
                            list.GetType()) as object;
                    }
                }
                catch (Exception ex)
                {
                    throw;
                }
            }
            return true;

        }

        internal List<ItmMasModel> ItemMas_Prop_SelectWeb(string EnvironmentName, int CKy, int UsrKy, int ObjKy, int ItmKy, int LocKy)
        {
            string actionUri = "ItemMas_Prop_SelectWeb";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();


            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("ObjKy", ObjKy);
            paramDictionary.Add("ItmKy", ItmKy);
            paramDictionary.Add("LocKy", LocKy);


            List<ItmMasModel> List = new List<ItmMasModel>();
            List = RunApiOperation(
                ItmMasBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                List.GetType()) as List<ItmMasModel>;

            return List;
        } 

        internal List<ItmMasSerNo> ItmMasSerNo_SelectWeb(string EnvironmentName, int CKy, int UsrKy, int ObjKy, int ItmKy, int PrjKy, string OurCd)
        {
            string actionUri = "ItmMasSerNo_SelectWeb";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();


            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("ObjKy", ObjKy);
            paramDictionary.Add("ItmKy", ItmKy);
            paramDictionary.Add("PrjKy", PrjKy);
            paramDictionary.Add("OurCd", OurCd);

            List<ItmMasSerNo> List = new List<ItmMasSerNo>();
            List = RunApiOperation(
                ItmMasBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                List.GetType()) as List<ItmMasSerNo>;

            return List;
        }

        internal bool ItmMasSerNo_InsertUpdate(string EnvironmentName, int CKy, int UsrKy, string serNoListString, string OurCd)
        {
            bool Reset = new bool();

            if (serNoListString != "[]" && serNoListString != "[null]" && serNoListString != "")
            {
                try
                {
                    ItmMasSerNo[] ItmMasSerNoList = new JavaScriptSerializer().Deserialize<ItmMasSerNo[]>(serNoListString);

                    for (int i = 0; i < ItmMasSerNoList.Length; i++)
                    {
                        string actionUri = "ItmMasSerNo_InsertUpdate";
                        Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

                        string modelString = new JavaScriptSerializer().Serialize(ItmMasSerNoList[i]);

                        paramDictionary.Add("SerNoListString", modelString);
                        paramDictionary.Add("CKy", CKy);
                        paramDictionary.Add("UsrKy", UsrKy);
                        paramDictionary.Add("OurCd", OurCd);

                        object obj = RunApiOperation(
                            ItmMasBaseUri,
                            actionUri,
                            EnvironmentName,
                            paramDictionary,
                            Reset.GetType());

                        Reset = Convert.ToBoolean(obj);
                    }
                }
                catch (Exception ex)
                {
                    
                }
            }

            return Reset;
        }




    }

}