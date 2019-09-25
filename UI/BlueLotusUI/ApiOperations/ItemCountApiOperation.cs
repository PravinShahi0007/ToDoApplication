using BlueLotus.ItmMas.Model.Entity;
using BlueLotus.StockClosing.Model.Entity;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Runtime.Serialization.Json;
using System.Text;
using System.Web;
using TransactionModel.Entity;

namespace BlueLotus.UI.ApiOperations
{
    public partial class ApiOperation
    {
        string ItmCountBaseUri = "api/ItemCount/";

        internal List<ItemCategoryModel> GetLocCategory(string EnvironmentName, int Cky, int UsrKy, string ConCd, string Date, long PrntLocKy)
        {
            string actionUri = "GetLocCategory";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();
            paramDictionary.Add("CKy", Cky);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("ConCd", ConCd);
            paramDictionary.Add("Date", Date);
            paramDictionary.Add("PrntLocKy", PrntLocKy);

            List<ItemCategoryModel> List = new List<ItemCategoryModel>();
            List = RunApiOperation(
                ItmCountBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                List.GetType()) as List<ItemCategoryModel>;

            return List;
        }
        internal List<LocLocationModel> CdMas_LookupWeb(string EnvironmentName, int CKy, int UsrKy, string ConCd)
        {
            string actionUri = "CdMas_LookupWeb";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();
            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("ConCd", ConCd);

            List<LocLocationModel> List = new List<LocLocationModel>();
            List = RunApiOperation(
                ItmCountBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                List.GetType()) as List<LocLocationModel>;

            return List;
        }

        internal List<ItemModel> GetCategoryItem(string EnvironmentName, int cky, int UsrKy, int CatKy, int PrntLocKy, string Date, string newRecordsHdr)
        {
            string actionUri = "GetCategoryItem";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();
            paramDictionary.Add("CKy", cky);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("CatKy", CatKy);
            paramDictionary.Add("PrntLocKy", PrntLocKy);
            paramDictionary.Add("Date", Date);
            paramDictionary.Add("newRecordsHdr", newRecordsHdr);

            List<ItemModel> List = new List<ItemModel>();
            List = RunApiOperation(
                ItmCountBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                List.GetType()) as List<ItemModel>;

            return List;
        }
        internal List<LocLocationModel> GetLocLocation(string EnvironmentName, int CKy, int UsrKy, int LocKy)
        {
            string actionUri = "GetLocLocation";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();
            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("LocKy", LocKy);

            List<LocLocationModel> List = new List<LocLocationModel>();
            List = RunApiOperation(
                ItmCountBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                List.GetType()) as List<LocLocationModel>;

            return List;
        }

        internal long VariencePost(string EnvironmentName, int CKy, int UsrKy, string NewData, string NewDataHdr)
        {
            string actionUri = "VariencePost";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();
            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("NewData", NewData);
            paramDictionary.Add("NewDataHdr", NewDataHdr);

            object List = new object();
            List = RunApiOperation(
                ItmCountBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                List.GetType()) as object;

            return Convert.ToInt64(List);
        }

        internal long InsertLocItm(string EnvironmentName, int CKy, int UsrKy, string NewData, string NewDataHdr)
        {
            string actionUri = "InsertLocItm";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();
            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("NewData", NewData);
            paramDictionary.Add("NewDataHdr", NewDataHdr);

            long lng = new long();
            object obj = RunApiOperation(
                ItmCountBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                lng.GetType());

            lng = Convert.ToInt64(obj);

            return lng;
        }

        internal List<StockClosingModel> ViewClosingStock(string Environment, int UsrKy, int Cky, int accKy, string frmDt, string toDt)
        {
            string actionUri = "PNSOLCBal_SelectWeb";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();


            paramDictionary.Add("CKy", Cky);
            paramDictionary.Add("UsrKy", UsrKy);
            //paramDictionary.Add("ObjKy", ObjKy);
            paramDictionary.Add("accKy", accKy);
            paramDictionary.Add("frmDt", frmDt);
            paramDictionary.Add("toDt", toDt);
            

            List<StockClosingModel> List = new List<StockClosingModel>();
            List = RunApiOperation(
                ItmCountBaseUri,
                actionUri,
                Environment,
                paramDictionary,
                List.GetType()) as List<StockClosingModel>;

            return List;
        }

        internal bool SaveClosingStock(string Environment, int Cky, int UsrKy, int ObjKy, string updateAccmacc, string newAccmacc, int accKy, string frmDt, string toDt)
        {
            string actionUri = "PNSOLCBal_InsertUpdateWeb";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", Cky);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("ObjKy", ObjKy);
            paramDictionary.Add("accKy", accKy);
            paramDictionary.Add("frmDt", frmDt);
            paramDictionary.Add("toDt", toDt);
            paramDictionary.Add("updateAccmacc", updateAccmacc);
            paramDictionary.Add("newAccmacc", newAccmacc);

            object list = new object();
            list = RunApiOperation(
                ItmCountBaseUri,
                actionUri,
                Environment,
                paramDictionary,
                list.GetType()) as object;

            return true;
        }


    }
}