using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using BlueLotus.ViewModel.Entity;
using System.Net.Http;
using System.Web.Script.Serialization;
using System.Runtime.Serialization.Json;
using System.IO;
using System.Text;
using BlueLotus.ItmMas.Model.Entity;
using BlueLotus.Codes.Model.Entity;
using BlueLotus.ComboLoad.Model;
using BlueLotus.ItemDiscount.Model.Entity;

namespace BlueLotus.UI.ApiOperations
{
    public partial class ApiOperation
    {
        string OrderBaseUri = "api/Order/";
        public List<OrderSearchModel> GetOrdFind(string EnvironmentName, int CKy, int UsrKy, string modelString)
        {
            string actionUri = "GetOrdFind";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("ordModelString", modelString);

            List<OrderSearchModel> List = new List<OrderSearchModel>();
            List = RunApiOperation(
                OrderBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                List.GetType()) as List<OrderSearchModel>;

            return List;

        }


        public List<AccOrderModel> GetSuplistForOrder(string EnvironmentName, int CKy, int UsrKy)
        {
            string actionUri = "GetSuplistForOrder";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);

            List<AccOrderModel> List = new List<AccOrderModel>();
            List = RunApiOperation(
                OrderBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                List.GetType()) as List<AccOrderModel>;

            return List;

        }

        public List<OrderProject> GetPrjListForOrder(string EnvironmentName, int CKy, int UsrKy)
        {
            string actionUri = "GetPrjListForOrder";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);

            List<OrderProject> List = new List<OrderProject>();
            List = RunApiOperation(
                OrderBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                List.GetType()) as List<OrderProject>;

            return List;
        }
        public List<OrderHdrModel> GetPurchesReqForFind(string EnvironmentName, int CKy, int UsrKy, string ordKy)
        {
            string actionUri = "GetPurchesReqForFind";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("OrdKy", ordKy);

            List<OrderHdrModel> List = new List<OrderHdrModel>();
            List = RunApiOperation(
                OrderBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                List.GetType()) as List<OrderHdrModel>;

            return List;

        }


        public List<OrderHdrModel> BOQOrdHdr_SelectWeb(string EnvironmentName, int CKy, int UsrKy, string ordKy)
        {
            string actionUri = "BOQOrdHdr_SelectWeb";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("OrdKy", ordKy);

            List<OrderHdrModel> List = new List<OrderHdrModel>();
            List = RunApiOperation(
                OrderBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                List.GetType()) as List<OrderHdrModel>;

            return List;

        }

        public List<OrderModel> GetPRDetailForFind(string EnvironmentName, int CKy, int UsrKy, string ordKy)
        {
            string actionUri = "GetPRDetailForFind";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("OrdKy", ordKy);

            List<OrderModel> List = new List<OrderModel>();
            List = RunApiOperation(
                OrderBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                List.GetType()) as List<OrderModel>;

            return List;

        }

        public List<OrderModel> BOQOrdDet_SelectWeb(string EnvironmentName, int CKy, int UsrKy, string ordKy)
        {
            string actionUri = "BOQOrdDet_SelectWeb";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("OrdKy", ordKy);

            List<OrderModel> List = new List<OrderModel>();
            List = RunApiOperation(
                OrderBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                List.GetType()) as List<OrderModel>;

            return List;

        }

        public List<ItmCatOrderModel> GetLocListForOrder(string EnvironmentName, int CKy, int UsrKy, string TrnTyp)
        {
            string actionUri = "GetLocListForOrder";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("TrnTyp", TrnTyp);

            List<ItmCatOrderModel> List = new List<ItmCatOrderModel>();
            List = RunApiOperation(
                OrderBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                List.GetType()) as List<ItmCatOrderModel>;

            return List;

        }
        public List<AccOrderModel> GetAccountListForOrder(string EnvironmentName, int CKy, int UsrKy, string AccTyp = "")
        {
            string actionUri = "GetAccountListForOrder";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("AccTyp", AccTyp);

            List<AccOrderModel> List = new List<AccOrderModel>();
            List = RunApiOperation(
                OrderBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                List.GetType()) as List<AccOrderModel>;

            return List;
        }



        public List<AdrOrderModel> GetAdrByAccForOrder(string EnvironmentName, int CKy, int UsrKy, string AccKy)
        {
            string actionUri = "GetAdrByAccForOrder";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("AccKy", AccKy);

            List<AdrOrderModel> List = new List<AdrOrderModel>();
            List = RunApiOperation(
                OrderBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                List.GetType()) as List<AdrOrderModel>;

            return List;
        }
        public List<AdrOrderModel> GetAdrForOrder(string EnvironmentName, int CKy, int UsrKy)
        {
            string actionUri = "GetAdrForOrder";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);

            List<AdrOrderModel> List = new List<AdrOrderModel>();
            List = RunApiOperation(
                OrderBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                List.GetType()) as List<AdrOrderModel>;

            return List;
        }


        public List<ItemForOrdtypModel> ItemForOrder(string EnvironmentName, int CKy, int ObjKy, int UsrKy, string OrdItemDet)
        {
            string actionUri = "ItemForOrder";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("ObjKy", ObjKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("OrdItemDet", OrdItemDet);

            List<ItemForOrdtypModel> List = new List<ItemForOrdtypModel>();
            List = RunApiOperation(
                OrderBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                List.GetType()) as List<ItemForOrdtypModel>;

            return List;
        }
        public List<ItemForOrdtypModel> ItmCdForOrder(string EnvironmentName, int CKy, int UsrKy, string ConCd, string OurCd = "")
        {
            string actionUri = "ItmCdForOrder";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("ConCd", ConCd);
            paramDictionary.Add("OurCd", OurCd);

            List<ItemForOrdtypModel> List = new List<ItemForOrdtypModel>();
            List = RunApiOperation(
                OrderBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                List.GetType()) as List<ItemForOrdtypModel>;

            return List;
        }
        public List<ItemForOrdtypModel> ItmNmForOrder(string EnvironmentName, int CKy, int UsrKy, string ConCd, string OurCd = "")
        {
            string actionUri = "ItmNmForOrder";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("ConCd", ConCd);
            paramDictionary.Add("OurCd", OurCd);

            List<ItemForOrdtypModel> List = new List<ItemForOrdtypModel>();
            List = RunApiOperation(
                OrderBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                List.GetType()) as List<ItemForOrdtypModel>;

            return List;
        }
        public List<ItmCatOrderModel> GetAnlTypForOrder(string EnvironmentName, int CKy, int UsrKy, string ConCd)
        {
            string actionUri = "GetAnlTypForOrder";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("ConCd", ConCd);

            List<ItmCatOrderModel> List = new List<ItmCatOrderModel>();
            List = RunApiOperation(
                OrderBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                List.GetType()) as List<ItmCatOrderModel>;

            return List;
        }
        public List<UnitModelForOrder> GetMultiUnitsForOrder(string EnvironmentName, int UsrKy, int ItmKy)
        {
            string actionUri = "GetMultiUnitsForOrder";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("ItmKy", ItmKy);

            List<UnitModelForOrder> List = new List<UnitModelForOrder>();
            List = RunApiOperation(
                OrderBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                List.GetType()) as List<UnitModelForOrder>;

            return List;
        }
        public List<TaskModelForOrder> GetTaskListForOrder(string EnvironmentName, int UsrKy, int PrjKy)
        {
            string actionUri = "GetTaskListForOrder";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("PrjKy", PrjKy);

            List<TaskModelForOrder> List = new List<TaskModelForOrder>();
            List = RunApiOperation(
                OrderBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                List.GetType()) as List<TaskModelForOrder>;

            return List;
        }

        public OrderNo InsertHdrPurchaseReq(string EnvironmentName, int CKy, int UsrKy, int ObjKy, string purReqHdr)
        {
            string actionUri = "InsertHdrPurchaseReq";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("ObjKy", ObjKy);
            paramDictionary.Add("purReqHdr", purReqHdr); 
            

             OrderNo List = new OrderNo();
            List = RunApiOperation(
                OrderBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                List.GetType()) as OrderNo;

            return List;
        }

        public List<ItmCatOrderModel> GetCurrencyListForOrder(string EnvironmentName, int CKy, int UsrKy)
        {
            string actionUri = "GetCurrencyListForOrder";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);

            List<ItmCatOrderModel> List = new List<ItmCatOrderModel>();
            List = RunApiOperation(
                OrderBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                List.GetType()) as List<ItmCatOrderModel>;

            return List;
        }

        public List<ItmCatOrderModel> GetPmtListForOrder(string EnvironmentName, int CKy, int UsrKy)
        {
            string actionUri = "GetPmtListForOrder";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);

            List<ItmCatOrderModel> List = new List<ItmCatOrderModel>();
            List = RunApiOperation(
                OrderBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                List.GetType()) as List<ItmCatOrderModel>;

            return List;
        }

        public bool UpdateHdrPurchaseReq(string EnvironmentName, int CKy, int UsrKy, int ObjKy, string purReqUpdtHdr)
        {
            string actionUri = "UpdateHdrPurchaseReq";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy); 
            paramDictionary.Add("ObjKy", ObjKy); 
            paramDictionary.Add("purReqUpdtHdr", purReqUpdtHdr);

            object list = new object();
            list = RunApiOperation(
                OrderBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as object;

            return true;
        }

        public List<AdrOrderModel> GetAddressForOrder(string EnvironmentName, int CKy, int UsrKy)
        {
            string actionUri = "GetAddressForOrder";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);

            List<AdrOrderModel> List = new List<AdrOrderModel>();
            List = RunApiOperation(
                OrderBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                List.GetType()) as List<AdrOrderModel>;

            return List;
        }

        public List<AccOrderModel> GetPurAcListForOrder(string EnvironmentName, int CKy, int UsrKy, string ConCd, string OurCd)
        {
            string actionUri = "GetPurAcListForOrder";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("ConCd", ConCd);
            paramDictionary.Add("OurCd", OurCd);

            List<AccOrderModel> List = new List<AccOrderModel>();
            List = RunApiOperation(
                OrderBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                List.GetType()) as List<AccOrderModel>;

            return List;
        }

        public List<AdrOrderModel> GetAdrKyForOrder(string EnvironmentName, int CKy, int UsrKy, string AccKy)
        {
            string actionUri = "GetAdrKyForOrder";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("AccKy", AccKy);

            List<AdrOrderModel> List = new List<AdrOrderModel>();
            List = RunApiOperation(
                OrderBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                List.GetType()) as List<AdrOrderModel>;

            return List;
        }


        public List<AccOrderModel> GetAccKyForOrder(string EnvironmentName, int UsrKy, string AdrKy)
        {
            string actionUri = "GetAccKyForOrder";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("AdrKy", AdrKy);

            List<AccOrderModel> List = new List<AccOrderModel>();
            List = RunApiOperation(
                OrderBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                List.GetType()) as List<AccOrderModel>;

            return List;
        }



        /// Insert Update Delete OrderDet Table //////////////////////////

        public bool InsertPurchesReqDetail(string EnvironmentName, int CKy, int UsrKy, string updatedOrders, string deletedOrders, string newOrders, string purReqDetail)
        {
            bool SaveStatus = false;
            if (deletedOrders != "[]" && deletedOrders != "[null]" && deletedOrders != "")
            {
                try
                {
                    OrderModel[] task = new JavaScriptSerializer().Deserialize<OrderModel[]>(deletedOrders);

                    for (int i = 0; i < task.Length; i++)
                    {
                        string actionUri = "InsertPurchesReqDetail";
                        Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

                        string modelString = new JavaScriptSerializer().Serialize(task[i]);

                        paramDictionary.Add("CKy", CKy);
                        paramDictionary.Add("UsrKy", UsrKy);
                        paramDictionary.Add("updatedOrders", "[]");
                        paramDictionary.Add("deletedOrders", deletedOrders);
                        paramDictionary.Add("newOrders", "[]");
                        paramDictionary.Add("purReqDetail", purReqDetail);

                        bool Reset = new bool();
                        object obj = RunApiOperation(
                            OrderBaseUri,
                            actionUri,
                            EnvironmentName,
                            paramDictionary,
                            Reset.GetType());

                        Reset = Convert.ToBoolean(obj);
                        SaveStatus = Reset;
                        if (!SaveStatus) return SaveStatus;
                    }
                }
                catch (Exception ex)
                {
                    return false;
                }
            }

            if (newOrders != "[]" && newOrders != "[null]" && newOrders != "")
            {
                try
                {
                    OrderModel[] task = new JavaScriptSerializer().Deserialize<OrderModel[]>(newOrders);

                    for (int i = 0; i < task.Length; i++)
                    {
                        string actionUri = "InsertPurchesReqDetail";
                        Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

                        string modelString = new JavaScriptSerializer().Serialize(task[i]);

                        paramDictionary.Add("CKy", CKy);
                        paramDictionary.Add("UsrKy", UsrKy);
                        paramDictionary.Add("updatedOrders", "[]");
                        paramDictionary.Add("deletedOrders", "[]");
                        paramDictionary.Add("newOrders", modelString);
                        paramDictionary.Add("purReqDetail", purReqDetail);

                        bool Reset = new bool();
                        object obj = RunApiOperation(
                            OrderBaseUri,
                            actionUri,
                            EnvironmentName,
                            paramDictionary,
                            Reset.GetType());

                        Reset = Convert.ToBoolean(obj);
                        SaveStatus = Reset;
                        if (!SaveStatus) return SaveStatus;
                    }
                }
                catch (Exception ex)
                {
                    return false;
                }
            }

            if (updatedOrders != "[]" || updatedOrders != "[null]" || updatedOrders != "")
            {
                try
                {
                    List<OrderModel> task = new JavaScriptSerializer().Deserialize<List<OrderModel>>(updatedOrders);

                    for (int i = 0; i < task.Count; i++)
                    {
                        string actionUri = "InsertPurchesReqDetail";
                        Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

                        string modelString = new JavaScriptSerializer().Serialize(task[i]);

                        paramDictionary.Add("CKy", CKy);
                        paramDictionary.Add("UsrKy", UsrKy);
                        paramDictionary.Add("updatedOrders", modelString);
                        paramDictionary.Add("deletedOrders", "[]");
                        paramDictionary.Add("newOrders", "[]");
                        paramDictionary.Add("purReqDetail", purReqDetail);

                        bool Reset = new bool();
                        object obj = RunApiOperation(
                            OrderBaseUri,
                            actionUri,
                            EnvironmentName,
                            paramDictionary,
                            Reset.GetType());

                        Reset = Convert.ToBoolean(obj);
                        SaveStatus = Reset;
                        if (!SaveStatus) return SaveStatus;
                    }
                }
                catch (Exception ex)
                {
                    return false;
                }
            }

            {
                purReqDetailModel purReqDetailObj = new JavaScriptSerializer().Deserialize<purReqDetailModel>(purReqDetail);

                //ReNumOrdDetLiNo_Update
                //ReNumOrdDetLiNo_Update(int OrdKy, int UsrKy, string EnvironmentName)
                string actionUri1 = "ReNumOrdDetLiNo_Update";
                Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

                paramDictionary.Add("OrdKy", purReqDetailObj.ordKydata);
                paramDictionary.Add("UsrKy", UsrKy);

                bool Reset1 = new bool();
                object obj = RunApiOperation(
                    OrderBaseUri,
                    actionUri1,
                    EnvironmentName,
                    paramDictionary,
                    Reset1.GetType());

                Reset1 = Convert.ToBoolean(obj);
            }

            return SaveStatus;
        }



        public List<OrderModel> GetPurchesReq(string EnvironmentName, int CKy, int UsrKy, string ordKy)
        {
            string actionUri = "GetPurchesReq";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("OrdKy", ordKy);

            List<OrderModel> List = new List<OrderModel>();
            List = RunApiOperation(
                OrderBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                List.GetType()) as List<OrderModel>;

            return List;
        }

        public List<ItemForOrdtypModel> PnsItemsLookUpByItmCd(string EnvironmentName, int CKy, int UsrKy, string itemForChange)
        {
            string actionUri = "GetPurchesReq";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("itemForChange", itemForChange);

            List<ItemForOrdtypModel> List = new List<ItemForOrdtypModel>();
            List = RunApiOperation(
                OrderBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                List.GetType()) as List<ItemForOrdtypModel>;

            return List;
        }

        public List<OrderSearchModel> GetfrmPurOrdSearch(string EnvironmentName, int CKy, int UsrKy, string PRFindDet)
        {
            string actionUri = "GetfrmPurOrdSearch";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("PRFindDet", PRFindDet);

            List<OrderSearchModel> List = new List<OrderSearchModel>();
            List = RunApiOperation(
                OrderBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                List.GetType()) as List<OrderSearchModel>;

            return List;
        }

        public List<OrderSearchModel> OrdTypPendingOrdTyp_SelectWeb(string EnvironmentName, int CKy, int UsrKy, string PRFindDet)
        {
            string actionUri = "OrdTypPendingOrdTyp_SelectWeb";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("PRFindDet", PRFindDet);

            List<OrderSearchModel> List = new List<OrderSearchModel>();
            List = RunApiOperation(
                OrderBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                List.GetType()) as List<OrderSearchModel>;

            return List;
        }

        public List<OrderModel> OrdTypPendingOrdTypDetails_SelectWeb(string EnvironmentName, int CKy, int UsrKy, string ordKy, string ConCd, string OurCd, string ObjKy)
        {
            string actionUri = "OrdTypPendingOrdTypDetails_SelectWeb";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("OrdKy", ordKy);
            paramDictionary.Add("ConCd", ConCd);
            paramDictionary.Add("OurCd", OurCd); 
            paramDictionary.Add("ObjKy", ObjKy); 

            List<OrderModel> List = new List<OrderModel>();
            List = RunApiOperation(
                OrderBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                List.GetType()) as List<OrderModel>;

            return List;
        }

        public List<OrderModel> GetHdrDetailFromPOForOrder(string EnvironmentName, int CKy, int UsrKy, string ordKy, string ConCd, string OurCd)
        {
            string actionUri = "GetHdrDetailFromPOForOrder";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("OrdKy", ordKy);
            paramDictionary.Add("ConCd", ConCd);
            paramDictionary.Add("OurCd", OurCd);

            List<OrderModel> List = new List<OrderModel>();
            List = RunApiOperation(
                OrderBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                List.GetType()) as List<OrderModel>;

            return List;
        }

        public List<OrderModel> GetGridDetailFromPOForOrder(string EnvironmentName, int CKy, int UsrKy, string ordKy, string ConCd, string OurCd)
        {
            string actionUri = "GetGridDetailFromPOForOrder";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("OrdKy", ordKy);
            paramDictionary.Add("ConCd", ConCd);
            paramDictionary.Add("OurCd", OurCd);

            List<OrderModel> List = new List<OrderModel>();
            List = RunApiOperation(
                OrderBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                List.GetType()) as List<OrderModel>;

            return List;
        }

        public List<OrdDayModel> GetOrdDayforPnS(string EnvironmentName, int CKy, int UsrKy)
        {
            string actionUri = "GetOrdDayforPnS";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);

            List<OrdDayModel> List = new List<OrdDayModel>();
            List = RunApiOperation(
                OrderBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                List.GetType()) as List<OrdDayModel>;

            return List;
        }

        public List<OrdDayModel> GetDlvNoforPnS(string EnvironmentName, int CKy, int UsrKy)
        {
            string actionUri = "GetDlvNoforPnS";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);

            List<OrdDayModel> List = new List<OrdDayModel>();
            List = RunApiOperation(
                OrderBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                List.GetType()) as List<OrdDayModel>;

            return List;
        }


    }
}