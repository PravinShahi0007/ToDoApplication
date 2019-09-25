using BlueLotus.ItemDiscount.Model.Entity;
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
        string ItmDiscountBaseUri = "api/ItmDiscount/";

        internal List<ItmDiscount_SalesModel> ItemsAD_SelectWeb(string Environment, int ObjKy, int Cky, int UsrKy, string OurCd, int ItmPriCatKy, int AdrPriCatKy, int PmtTrmKy, int PmtModeKy, int AdrKy, string Eftv)
        {
            string actionUri = "ItemsAD_SelectWeb";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();


            paramDictionary.Add("CKy", Cky);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("ObjKy", ObjKy);
            paramDictionary.Add("OurCd", OurCd);
            paramDictionary.Add("ItmPriCatKy", ItmPriCatKy);
            paramDictionary.Add("AdrPriCatKy", AdrPriCatKy);
            paramDictionary.Add("PmtTrmKy", PmtTrmKy);
            paramDictionary.Add("PmtModeKy", PmtModeKy);
            paramDictionary.Add("AdrKy", AdrKy);
            paramDictionary.Add("Eftv", Eftv);

            List<ItmDiscount_SalesModel> List = new List<ItmDiscount_SalesModel>();
            List = RunApiOperation(
                ItmDiscountBaseUri,
                actionUri,
                Environment,
                paramDictionary,
                List.GetType()) as List<ItmDiscount_SalesModel>;

            return List;
        }

        internal bool ItemsAD_InsertandUpdate(string Environment, int Cky, int UsrKy, int ObjKy, string OurCd, int AdrKy, string Eftv, string updateDiscount, string newDiscount)
        {            
            string actionUri = "ItemsAD_InsertandUpdate";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", Cky);
            paramDictionary.Add("UsrKy", UsrKy);            
            paramDictionary.Add("ObjKy", ObjKy);
            paramDictionary.Add("OurCd", OurCd);
            paramDictionary.Add("AdrKy", AdrKy);
            paramDictionary.Add("Eftv", Eftv);
            paramDictionary.Add("updateRecord", updateDiscount);
            paramDictionary.Add("newRecord", newDiscount);            

            object list = new object();
            list = RunApiOperation(
                ItmDiscountBaseUri,
                actionUri,
                Environment,
                paramDictionary,
                list.GetType()) as object;

            return true;
        }

        
        //internal List<ItemDiscount.Model.Entity.ItmDiscount_SalesModel> TrnTypKy(string EnvironmentName, string p, int CKy, int UsrKy)
        //{
        //    HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/ItemDiscount/CdMas_Lookup?CKy=" + CKy + "&UsrKy=" + UsrKy + "")).Result;

        //    List<ItmDiscount_SalesModel> AccTyps = new List<ItmDiscount_SalesModel>();
        //    if (response.IsSuccessStatusCode)
        //    {
        //        string jstr = response.Content.ReadAsStringAsync().Result;
        //        DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<ItmDiscount_SalesModel>));
        //        List<ItmDiscount_SalesModel> deserializeditems = new List<ItmDiscount_SalesModel>();
        //        MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
        //        DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
        //        deserializeditems = ser.ReadObject(ms) as List<ItmDiscount_SalesModel>;
        //       string  AdrCatKy = deserializeditems;
        //    }
        //    return AdrCatKy;
        //}

    }
}