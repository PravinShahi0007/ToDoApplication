using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Runtime.Serialization.Json;
using System.Text;
using System.Web;
using System.Web.Script.Serialization;

using BlueLotus.TransactionModel.Entity;
using BlueLotus.SplOrderModel.Entity;
using BlueLotus.ObjMas.Model;
using BlueLotus.ComboLoad.Model;

namespace BlueLotus.UI.ApiOperations
{
    public partial class ApiOperation
    {
        string transactionBaseUri = "api/Transaction/";

        public List<ValidateModel> ValidateTrnDt(string EnvironmentName, int CKy, string sOrddate, string OurCd, string ConCd, string PrjKy, string LocKy, int usrKy)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/Transaction/ValidateTrnDt?CKy=" + CKy + "&sOrddate=" + sOrddate + "&OurCd=" + OurCd + "&ConCd=" + ConCd + "&PrjKy=" + PrjKy + "&LocKy=" + LocKy + "&UsrKy=" + usrKy + "")).Result;

            List<ValidateModel> menuList = new List<ValidateModel>();
            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<ValidateModel>));
                List<ValidateModel> deserializeditems = new List<ValidateModel>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<ValidateModel>;
                menuList = deserializeditems;
            }
            return menuList;
        }

        public List<AccModel> GetCusAccountList(string EnvironmentName, int CKy, int UsrKy)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/Transaction/GetCusAccountList?CKy=" + CKy + "&UsrKy=" + UsrKy + "")).Result;

            List<AccModel> menuList = new List<AccModel>();
            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<AccModel>));
                List<AccModel> deserializeditems = new List<AccModel>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<AccModel>;
                menuList = deserializeditems;
            }
            return menuList;
        }

        public List<ItmMasCatModel> GetPmtList(string EnvironmentName, string ConCd, int CKy, int UsrKy)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/Transaction/GetPmtList?ConCd=" + ConCd + "&CKy=" + CKy + "&UsrKy=" + UsrKy + "")).Result;

            List<ItmMasCatModel> menuList = new List<ItmMasCatModel>();
            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<ItmMasCatModel>));
                List<ItmMasCatModel> deserializeditems = new List<ItmMasCatModel>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<ItmMasCatModel>;
                menuList = deserializeditems;
            }
            return menuList;
        }

        public List<CMSproject> GetProjectList(string EnvironmentName, int CKy, int UsrKy)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/Transaction/GetProjectList?CKy=" + CKy + "&UsrKy=" + UsrKy + "")).Result;

            List<CMSproject> menuList = new List<CMSproject>();
            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<CMSproject>));
                List<CMSproject> deserializeditems = new List<CMSproject>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<CMSproject>;
                menuList = deserializeditems;
            }
            return menuList;
        }

        public List<AdrModel> GetAdrByAcc(string EnvironmentName, int CKy, string AccKy, int UsrKy)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/Transaction/GetAdrByAcc?CKy=" + CKy + "&AccKy=" + AccKy + "&UsrKy=" + UsrKy + "")).Result;

            List<AdrModel> menuList = new List<AdrModel>();
            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<AdrModel>));
                List<AdrModel> deserializeditems = new List<AdrModel>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<AdrModel>;
                menuList = deserializeditems;
            }
            return menuList;
        }

        internal List<List<object>> GetAdrByAccAndUsr(string AccKy, string EnvironmentName)
        {
            string actionUri = "GetAdrByAccAndUsr";

            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("AccKy", AccKy);

            List<List<object>> list = new List<List<object>>();
            list = RunApiOperation(
                transactionBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as List<List<object>>;

            return list;
        }

        public List<ItmMasCatModel> GetCurrencyList(string EnvironmentName, int CKy, int UsrKy)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/Transaction/GetCurrencyList?CKy=" + CKy + "&UsrKy=" + UsrKy + "")).Result;

            List<ItmMasCatModel> menuList = new List<ItmMasCatModel>();
            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<ItmMasCatModel>));
                List<ItmMasCatModel> deserializeditems = new List<ItmMasCatModel>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<ItmMasCatModel>;
                menuList = deserializeditems;
            }
            return menuList;
        }

        public List<GRN> GetDisAmt(string EnvironmentName, int usrKy, string ConCd, string OurCd, int cky, string ItmKy, string AdrKy, string Pmt, string Dt)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/Transaction/GetDisAmt?usrKy=" + usrKy + "&ConCd=" + ConCd + "&OurCd=" + OurCd + "&cky=" + cky + "&ItmKy=" + ItmKy + "&AdrKy=" + AdrKy + "&Pmt=" + Pmt + "&Dt=" + Dt + "")).Result;

            List<GRN> menuList = new List<GRN>();
            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<GRN>));
                List<GRN> deserializeditems = new List<GRN>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<GRN>;
                menuList = deserializeditems;
            }
            return menuList;
        }

        public List<TaxNoModel> GetTaxAccount(string EnvironmentName, string AdrKy, int cky, int UsrKy)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/Transaction/GetTaxAccount?AdrKy=" + AdrKy + "&CKy=" + cky + "&UsrKy=" + UsrKy + "")).Result;

            List<TaxNoModel> menuList = new List<TaxNoModel>();
            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<TaxNoModel>));
                List<TaxNoModel> deserializeditems = new List<TaxNoModel>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<TaxNoModel>;
                menuList = deserializeditems;
            }
            return menuList;
        }

        public List<TaxNoModel> GetTaxTyp1Val(string EnvironmentName, string ItmKy, string Dt, int cky, int UsrKy)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/Transaction/GetTaxTyp1Val?ItmKy=" + ItmKy + "&Dt=" + Dt + "&CKy=" + cky + "&UsrKy=" + UsrKy + "")).Result;

            List<TaxNoModel> menuList = new List<TaxNoModel>();
            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<TaxNoModel>));
                List<TaxNoModel> deserializeditems = new List<TaxNoModel>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<TaxNoModel>;
                menuList = deserializeditems;
            }
            return menuList;
        }

        public List<CMSproject> GetToProjectList(string EnvironmentName, int CKy, int UsrKy)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/Transaction/GetToProjectList?CKy=" + CKy + "&UsrKy=" + UsrKy + "")).Result;

            List<CMSproject> menuList = new List<CMSproject>();
            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<CMSproject>));
                List<CMSproject> deserializeditems = new List<CMSproject>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<CMSproject>;
                menuList = deserializeditems;
            }
            return menuList;
        }

        public List<ItmMasCatModel> GetFromLocList(string EnvironmentName, int CKy, int UsrKy, string TrnTyp)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/Transaction/GetFromLocList?CKy=" + CKy + "&UsrKy=" + UsrKy + "&TrnTyp=" + TrnTyp + "")).Result;

            List<ItmMasCatModel> menuList = new List<ItmMasCatModel>();
            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<ItmMasCatModel>));
                List<ItmMasCatModel> deserializeditems = new List<ItmMasCatModel>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<ItmMasCatModel>;
                menuList = deserializeditems;
            }
            return menuList;
        }

        public List<ItmMasCatModel> GetToLocList(string EnvironmentName, int CKy, int UsrKy)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/Transaction/GetToLocList?CKy=" + CKy + "&UsrKy=" + UsrKy + "")).Result;

            List<ItmMasCatModel> menuList = new List<ItmMasCatModel>();
            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<ItmMasCatModel>));
                List<ItmMasCatModel> deserializeditems = new List<ItmMasCatModel>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<ItmMasCatModel>;
                menuList = deserializeditems;
            }
            return menuList;
        }

        public List<UnitModel> GetItemMultiUnits(string EnvironmentName, int ItmKy, int cky, int UsrKy)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/Transaction/GetItemMultiUnits?ItmKy=" + ItmKy + "&CKy=" + cky + "&UsrKy=" + UsrKy + "")).Result;

            List<UnitModel> menuList = new List<UnitModel>();
            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<UnitModel>));
                List<UnitModel> deserializeditems = new List<UnitModel>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<UnitModel>;
                menuList = deserializeditems;
            }
            return menuList;
        }

        public List<TaskModel> GetTaskList(string EnvironmentName, int PrjKy, int cky, int UsrKy)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/Transaction/GetTaskList?PrjKy=" + PrjKy + "&CKy=" + cky + "&UsrKy=" + UsrKy + "")).Result;

            List<TaskModel> menuList = new List<TaskModel>();
            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<TaskModel>));
                List<TaskModel> deserializeditems = new List<TaskModel>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<TaskModel>;
                menuList = deserializeditems;
            }
            return menuList;
        }

        public List<ItemForOrdtypModel> GetItmKyByAdress(string EnvironmentName, int AdrKy, int ObjKy, int cky, int UsrKy)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/Transaction/GetItmKyByAdress?AdrKy=" + AdrKy + "&ObjKy=" + ObjKy + "&CKy=" + cky + "&UsrKy=" + UsrKy + "")).Result;
            List<ItemForOrdtypModel> menuList = new List<ItemForOrdtypModel>();
            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<ItemForOrdtypModel>));
                List<ItemForOrdtypModel> deserializeditems = new List<ItemForOrdtypModel>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<ItemForOrdtypModel>;
                menuList = deserializeditems;
            }
            return menuList;
        }
        public List<ItmMasCatModel> GetAnlTyp(string EnvironmentName, int CKy, int UsrKy, string ConCd)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/Transaction/GetAnlTyp?CKy=" + CKy + "&UsrKy=" + UsrKy + "&ConCd=" + ConCd + "")).Result;

            List<ItmMasCatModel> menuList = new List<ItmMasCatModel>();
            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<ItmMasCatModel>));
                List<ItmMasCatModel> deserializeditems = new List<ItmMasCatModel>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<ItmMasCatModel>;
                menuList = deserializeditems;
            }
            return menuList;
        }

        public List<AdrModel> GetAddress(string EnvironmentName, int CKy, int UsrKy)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/Transaction/GetAddress?CKy=" + CKy + "&UsrKy=" + UsrKy + "")).Result;

            List<AdrModel> menuList = new List<AdrModel>();
            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<AdrModel>));
                List<AdrModel> deserializeditems = new List<AdrModel>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<AdrModel>;
                menuList = deserializeditems;
            }
            return menuList;
        }

        public List<ItmMasCatModel> GetDlvAdrList(string EnvironmentName, int CKy, int UsrKy)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/Transaction/GetDlvAdrList?CKy=" + CKy + "&UsrKy=" + UsrKy + "")).Result;

            List<ItmMasCatModel> menuList = new List<ItmMasCatModel>();
            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<ItmMasCatModel>));
                List<ItmMasCatModel> deserializeditems = new List<ItmMasCatModel>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<ItmMasCatModel>;
                menuList = deserializeditems;
            }
            return menuList;
        }

        public List<PrcsModel> GetTask(string EnvironmentName, int PrjKy, int cky, int UsrKy)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/Transaction/GetTask?PrjKy=" + PrjKy + "CKy=" + cky + "&UsrKy=" + UsrKy + "")).Result;

            List<PrcsModel> menuList = new List<PrcsModel>();
            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<PrcsModel>));
                List<PrcsModel> deserializeditems = new List<PrcsModel>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<PrcsModel>;
                menuList = deserializeditems;
            }
            return menuList;
        }

        public List<ItemForOrdtypModel> ItemsLookUpByOrdTyp(string EnvironmentName, int cky, string ConCd, string OurCd, int UsrKy)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/Transaction/ItemsLookUpByOrdTyp?CKy=" + cky + "&ConCd=" + ConCd + "&OurCd=" + OurCd + "&UsrKy=" + UsrKy + "")).Result;

            List<ItemForOrdtypModel> menuList = new List<ItemForOrdtypModel>();
            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<ItemForOrdtypModel>));
                List<ItemForOrdtypModel> deserializeditems = new List<ItemForOrdtypModel>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<ItemForOrdtypModel>;
                menuList = deserializeditems;
            }
            return menuList;
        }

        public List<ItemForOrdtypModel> ItemsLookUpByTrnTyp(string EnvironmentName, int CKy, string ConCd, string OurCd, int UsrKy)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/Transaction/ItemsLookUpByTrnTyp?CKy=" + CKy + "&ConCd=" + ConCd + "&OurCd=" + OurCd + "&UsrKy=" + UsrKy + "")).Result;

            List<ItemForOrdtypModel> menuList = new List<ItemForOrdtypModel>();
            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<ItemForOrdtypModel>));
                List<ItemForOrdtypModel> deserializeditems = new List<ItemForOrdtypModel>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<ItemForOrdtypModel>;
                menuList = deserializeditems;
            }
            return menuList;
        }
        public List<PrcsModel> GetTaskByOrdTyp(string EnvironmentName, int CKy, int UsrKy, long strPrjKy)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/Transaction/GetTaskByOrdTyp?CKy=" + CKy + "&UsrKy=" + UsrKy + "&strPrjKy=" + strPrjKy + "")).Result;

            List<PrcsModel> menuList = new List<PrcsModel>();
            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<PrcsModel>));
                List<PrcsModel> deserializeditems = new List<PrcsModel>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<PrcsModel>;
                menuList = deserializeditems;
            }
            return menuList;
        }

        public List<OrderHdrModel> GetOrdNo(string EnvironmentName, int CKy, string ordKy, int UsrKy)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/Transaction/GetOrdNo?CKy=" + CKy + "&ordKy=" + ordKy + "&UsrKy=" + UsrKy + "")).Result;

            List<OrderHdrModel> menuList = new List<OrderHdrModel>();
            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<OrderHdrModel>));
                List<OrderHdrModel> deserializeditems = new List<OrderHdrModel>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<OrderHdrModel>;
                menuList = deserializeditems;
            }
            return menuList;
        }

        public List<ItmMasCatModel> GetBUlist(string EnvironmentName, int CKy, int UsrKy)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/Transaction/GetBUlist?CKy=" + CKy + "&UsrKy=" + UsrKy + "")).Result;

            List<ItmMasCatModel> menuList = new List<ItmMasCatModel>();
            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<ItmMasCatModel>));
                List<ItmMasCatModel> deserializeditems = new List<ItmMasCatModel>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<ItmMasCatModel>;
                menuList = deserializeditems;
            }
            return menuList;
        }

        public List<AccModel> GetPurAcList(string EnvironmentName, int CKy, string ConCd, string OurCd, int UsrKy)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/Transaction/GetPurAcList?CKy=" + CKy + "&ConCd=" + ConCd + "&OurCd=" + OurCd + "&UsrKy=" + UsrKy + "")).Result;

            List<AccModel> menuList = new List<AccModel>();
            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<AccModel>));
                List<AccModel> deserializeditems = new List<AccModel>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<AccModel>;
                menuList = deserializeditems;
            }
            return menuList;
        }

        public List<OrderHdrModel> GetPurchesReq(string EnvironmentName, int CKy, string ordKy, int usrKy)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/Transaction/GetPurchesReq?CKy=" + CKy + "&ordKy=" + ordKy + "&UsrKy=" + usrKy + "")).Result;

            List<OrderHdrModel> menuList = new List<OrderHdrModel>();
            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<OrderHdrModel>));
                List<OrderHdrModel> deserializeditems = new List<OrderHdrModel>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<OrderHdrModel>;
                menuList = deserializeditems;
            }
            return menuList;
        }

        public List<AccModel> GetSuplist(string EnvironmentName, int CKy, int usrKy)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/Transaction/GetSuplist?CKy=" + CKy + "&UsrKy=" + usrKy + "")).Result;

            List<AccModel> menuList = new List<AccModel>();
            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<AccModel>));
                List<AccModel> deserializeditems = new List<AccModel>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<AccModel>;
                menuList = deserializeditems;
            }
            return menuList;
        }


        public List<AccModel> GetSuplistForGRN(string EnvironmentName, int CKy, int PrjKy, string ConCd, string OurCd, int usrKy)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/Transaction/GetSuplistForGRN?CKy=" + CKy + "&PrjKy=" + PrjKy + "&ConCd=" + ConCd + "&OurCd=" + OurCd + "&UsrKy=" + usrKy + "")).Result;

            List<AccModel> menuList = new List<AccModel>();
            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<AccModel>));
                List<AccModel> deserializeditems = new List<AccModel>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<AccModel>;
                menuList = deserializeditems;
            }
            return menuList;
        }

        public List<AccModel> GetAccountList(string EnvironmentName, int CKy, int usrKy)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/Transaction/GetAccountList?CKy=" + CKy + "&UsrKy=" + usrKy + "")).Result;

            List<AccModel> menuList = new List<AccModel>();
            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<AccModel>));
                List<AccModel> deserializeditems = new List<AccModel>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<AccModel>;
                menuList = deserializeditems;
            }
            return menuList;
        }

        public List<AdrModel> GetAddressList(string EnvironmentName, int CKy, int usrKy)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/Transaction/GetAddressList?CKy=" + CKy + "&UsrKy=" + usrKy + "")).Result;

            List<AdrModel> menuList = new List<AdrModel>();
            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<AdrModel>));
                List<AdrModel> deserializeditems = new List<AdrModel>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<AdrModel>;
                menuList = deserializeditems;
            }
            return menuList;
        }
        public List<AdrModel> GetAddressListByAcc(string EnvironmentName, int CKy, int usrKy)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/Transaction/GetAddressListByAcc?CKy=" + CKy + "&UsrKy=" + usrKy + "")).Result;

            List<AdrModel> menuList = new List<AdrModel>();
            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<AdrModel>));
                List<AdrModel> deserializeditems = new List<AdrModel>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<AdrModel>;
                menuList = deserializeditems;
            }
            return menuList;
        }
        public List<UnitModel> GetUnitbyItmky(string EnvironmentName, string ItmKy, int cky, int usrKy)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/Transaction/GetUnitbyItmky?CKy=" + cky + "&UsrKy=" + usrKy + "")).Result;

            List<UnitModel> menuList = new List<UnitModel>();
            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<UnitModel>));
                List<UnitModel> deserializeditems = new List<UnitModel>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<UnitModel>;
                menuList = deserializeditems;
            }
            return menuList;
        }
        public List<AdrModel> GetAdrKy(string EnvironmentName, string AccKy, int cky, int usrKy)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/Transaction/GetAdrKy?AccKy=" + "&CKy=" + cky + "&UsrKy=" + usrKy + "")).Result;

            List<AdrModel> menuList = new List<AdrModel>();
            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<AdrModel>));
                List<AdrModel> deserializeditems = new List<AdrModel>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<AdrModel>;
                menuList = deserializeditems;
            }
            return menuList;
        }
        public List<AccModel> GetAccKy(string EnvironmentName, string AdrKy, int cky, int usrKy)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/Transaction/GetAccKy?AdrKy=" + "&CKy=" + cky + "&UsrKy=" + usrKy + "")).Result;

            List<AccModel> menuList = new List<AccModel>();
            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<AccModel>));
                List<AccModel> deserializeditems = new List<AccModel>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<AccModel>;
                menuList = deserializeditems;
            }
            return menuList;
        }

        public List<OrderModel> GetDetailByOrdKy(string EnvironmentName, int CKy, int newKy, int usrKy)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/Transaction/GetDetailByOrdKy?CKy=" + CKy + "&newKy=" + newKy + "&UsrKy=" + usrKy + "")).Result;

            List<OrderModel> menuList = new List<OrderModel>();
            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<OrderModel>));
                List<OrderModel> deserializeditems = new List<OrderModel>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<OrderModel>;
                menuList = deserializeditems;
            }
            return menuList;
        }


        public List<OrderModel> GetDetailByFromTrnKy(string EnvironmentName, int CKy, string newKy, int usrKy)
        {

            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/Transaction/GetDetailByFromTrnKy?cky=" + CKy + "&newKy=" + newKy + "&UsrKy=" + usrKy + "")).Result;

            List<OrderModel> menuList = new List<OrderModel>();
            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<OrderModel>));
                List<OrderModel> deserializeditems = new List<OrderModel>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<OrderModel>;
                menuList = deserializeditems;
            }
            return menuList;
        }

        public List<OrderModel> GetDetailByToTrnKy(string EnvironmentName, int CKy, int newKy, int usrKy)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/Transaction/GetDetailByToTrnKy?CKy=" + CKy + "&UsrKy=" + usrKy + "")).Result;

            List<OrderModel> menuList = new List<OrderModel>();
            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<OrderModel>));
                List<OrderModel> deserializeditems = new List<OrderModel>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<OrderModel>;
                menuList = deserializeditems;
            }
            return menuList;
        }

        public List<TrnOutNo> GetTrnOutNo(string EnvironmentName, string FrmTrnKy, int cky, int usrKy)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/Transaction/GetTrnOutNo?FrmTrnKy=" + FrmTrnKy + "&cky=" + cky + "&UsrKy=" + usrKy + "")).Result;

            List<TrnOutNo> menuList = new List<TrnOutNo>();
            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<TrnOutNo>));
                List<TrnOutNo> deserializeditems = new List<TrnOutNo>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<TrnOutNo>;
                menuList = deserializeditems;
            }
            return menuList;
        }

        public List<TrnOutDetailModel> GetDetailsTrnOut(string EnvironmentName, int CKy, string TrnKy, int usrKy)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/Transaction/GetDetailsTrnOut?CKy=" + CKy + "&UsrKy=" + usrKy + "")).Result;

            List<TrnOutDetailModel> menuList = new List<TrnOutDetailModel>();
            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<TrnOutDetailModel>));
                List<TrnOutDetailModel> deserializeditems = new List<TrnOutDetailModel>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<TrnOutDetailModel>;
                menuList = deserializeditems;
            }
            return menuList;
        }

        public List<TrnOutHdrModel> GetTrnInFrmTrnOutData(string EnvironmentName, int CKy, string TrnKy, int usrKy)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/Transaction/GetTrnInFrmTrnOutData?CKy=" + CKy + "&UsrKy=" + usrKy + "")).Result;

            List<TrnOutHdrModel> menuList = new List<TrnOutHdrModel>();
            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<TrnOutHdrModel>));
                List<TrnOutHdrModel> deserializeditems = new List<TrnOutHdrModel>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<TrnOutHdrModel>;
                menuList = deserializeditems;
            }
            return menuList;
        }

        public List<TrnOutAndInData> GetTrnInAndOutData(string EnvironmentName, int CKy, string PrjKy, string LocKy, int usrKy)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/Transaction/GetTrnInAndOutData?CKy=" + CKy + "&UsrKy=" + usrKy + "")).Result;

            List<TrnOutAndInData> menuList = new List<TrnOutAndInData>();
            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<TrnOutAndInData>));
                List<TrnOutAndInData> deserializeditems = new List<TrnOutAndInData>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<TrnOutAndInData>;
                menuList = deserializeditems;
            }
            return menuList;
        }

        public List<OrderSearchModel> GetOrdSearch(string EnvironmentName, int CKy, int usrKy, string PrjKy, string SupKy, string FrmOrdNo, string ToOrdNo, string FrmDt, string ToDt, string DocNo, string ConCd, string OurCd, string DlryDt, string DlryNoKy)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/Transaction/GetOrdSearch?CKy=" + CKy + "&UsrKy=" + usrKy + "")).Result;

            List<OrderSearchModel> menuList = new List<OrderSearchModel>();
            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<OrderSearchModel>));
                List<OrderSearchModel> deserializeditems = new List<OrderSearchModel>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<OrderSearchModel>;
                menuList = deserializeditems;
            }
            return menuList;
        }

        public List<OrderSearchModel> GetOrdFind(string EnvironmentName, int CKy, int usrKy, string PrjKy, string SupKy, string FrmOrdNo, string ToOrdNo, string FrmDt, string ToDt, string DocNo, string ConCd, string OurCd)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/Transaction/GetOrdFind?CKy=" + CKy + "&UsrKy=" + usrKy + "")).Result;

            List<OrderSearchModel> menuList = new List<OrderSearchModel>();
            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<OrderSearchModel>));
                List<OrderSearchModel> deserializeditems = new List<OrderSearchModel>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<OrderSearchModel>;
                menuList = deserializeditems;
            }
            return menuList;
        }

        public List<GRN> GetGRNList(string EnvironmentName, int CKy, int usrKy, string PrjKy, string SupKy, string FrmOrdNo,
            string ToOrdNo, string FrmDt, string ToDt, string DocNo, string ConCd, string OurCd, string YurRef, string Prefix,
            string ObjKy, string AprStsKy, string ItmKy, string AdrKy, string LocKy, string isPrinted)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/Transaction/GetGRNList?CKy=" + CKy + "&UsrKy=" + usrKy + "&PrjKy=" + PrjKy + "&SupKy=" + SupKy + "&FrmOrdNo=" + FrmOrdNo + "&ToOrdNo=" + ToOrdNo + "&FrmDt=" + FrmDt + "&ToDt=" + ToDt + "&DocNo=" + DocNo + "&ConCd=" + ConCd + "&OurCd=" + OurCd + "&YurRef=" + YurRef + "&Prefix=" + Prefix + "&ObjKy=" + ObjKy + "&AprStsKy=" + AprStsKy + "&ItmKy=" + ItmKy + "&AdrKy=" + AdrKy + "&LocKy=" + LocKy + "&isPrinted=" + isPrinted + "")).Result;

            List<GRN> menuList = new List<GRN>();
            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<GRN>));
                List<GRN> deserializeditems = new List<GRN>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<GRN>;
                menuList = deserializeditems;
            }
            return menuList;
        }

        public List<GRN> ItmTransferFind(string EnvironmentName, int CKy, int UsrKy, string FrmDt, string ToDt, string DocNo, 
            string YurRef, string AprStsKy, string Prefix, string TrnNo, string AdrKy, string FrmLocKy, string ToLocKy, 
            string FrmPrjKy, string ToPrjKy, string isRecur, string isPrinted, string ConCd, string OurCd, string ObjKy)
        {
            List<GRN> ItemTransferFindList = new List<GRN>();

            string actionUri = "ItmTransferFind";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("FrmDt", FrmDt);
            paramDictionary.Add("ToDt", ToDt);
            paramDictionary.Add("DocNo", DocNo);
            paramDictionary.Add("YurRef", YurRef);
            paramDictionary.Add("AprStsKy", AprStsKy);
            paramDictionary.Add("Prefix", Prefix);
            paramDictionary.Add("TrnNo", TrnNo);
            paramDictionary.Add("AdrKy", AdrKy);
            paramDictionary.Add("FrmLocKy", FrmLocKy);
            paramDictionary.Add("ToLocKy", ToLocKy);
            paramDictionary.Add("FrmPrjKy", FrmPrjKy);
            paramDictionary.Add("ToPrjKy", ToPrjKy);
            paramDictionary.Add("isRecur", isRecur);
            paramDictionary.Add("isPrinted", isPrinted);
            paramDictionary.Add("ConCd", ConCd);
            paramDictionary.Add("OurCd", OurCd);
            paramDictionary.Add("ObjKy", ObjKy);

     ItemTransferFindList = RunApiOperation(
                tranCRUDBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                ItemTransferFindList.GetType()) as List<GRN>;

            return ItemTransferFindList;
        }

        public List<OrderSearchModel> GetOrdfrmPurReqSearch(string EnvironmentName, int CKy, int usrKy, string PrjKy, string SupKy, string ConCd, string OurCd)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/Transaction/GetOrdfrmPurReqSearch?CKy=" + CKy + "&UsrKy=" + usrKy + "")).Result;

            List<OrderSearchModel> menuList = new List<OrderSearchModel>();
            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<OrderSearchModel>));
                List<OrderSearchModel> deserializeditems = new List<OrderSearchModel>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<OrderSearchModel>;
                menuList = deserializeditems;
            }
            return menuList;
        }

        public List<ObjMasMdl> GetDefaultVal(string EnvironmentName, int CKy, int usrKy, string ObjKy)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/Transaction/GetDefaultVal?CKy=" + CKy + "&UsrKy=" + usrKy + "&ObjKy=" + ObjKy + "")).Result;

            List<ObjMasMdl> menuList = new List<ObjMasMdl>();
            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<ObjMasMdl>));
                List<ObjMasMdl> deserializeditems = new List<ObjMasMdl>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<ObjMasMdl>;
                menuList = deserializeditems;
            }
            return menuList;
        }

        public List<GRN> GetHdrPurOrdDetail(string EnvironmentName, int CKy, int usrKy, string ordKy, string ConCd, string OurCd)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/Transaction/GetHdrPurOrdDetail?CKy=" + CKy + "&UsrKy=" + usrKy + "")).Result;

            List<GRN> menuList = new List<GRN>();
            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<GRN>));
                List<GRN> deserializeditems = new List<GRN>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<GRN>;
                menuList = deserializeditems;
            }
            return menuList;
        }

        public List<OrderSearchModel> GetOrdfrmPurOrdSearch(string EnvironmentName, int CKy, int usrKy, string PrjKy, string SupKy, string ConCd, string OurCd, string FrmDt, string ToDt)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/Transaction/GetOrdfrmPurOrdSearch?cky=" + CKy + "&usrKy=" + usrKy + "&PrjKy=" + PrjKy + "&SupKy=" + SupKy + "&ConCd=" + ConCd + "&OurCd=" + OurCd + "&FrmDt=" + FrmDt + "&ToDt=" + ToDt + "")).Result;

            List<OrderSearchModel> menuList = new List<OrderSearchModel>();
            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<OrderSearchModel>));
                List<OrderSearchModel> deserializeditems = new List<OrderSearchModel>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<OrderSearchModel>;
                menuList = deserializeditems;
            }
            return menuList;
        }

        public List<OrderSearchModel> TrnTypPendingTrnTyp_SelectWeb(string EnvironmentName, int CKy, int usrKy, string PrjKy, string SupKy, string ConCd, string OurCd, string FrmDt, string ToDt, int TrnTypKy)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/Transaction/TrnTypPendingTrnTyp_SelectWeb?cky=" + CKy + "&usrKy=" + usrKy + "&PrjKy=" + PrjKy + "&SupKy=" + SupKy + "&ConCd=" + ConCd + "&OurCd=" + OurCd + "&FrmDt=" + FrmDt + "&ToDt=" + ToDt + "&TrnTypKy=" + TrnTypKy + "")).Result;

            List<OrderSearchModel> menuList = new List<OrderSearchModel>();
            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<OrderSearchModel>));
                List<OrderSearchModel> deserializeditems = new List<OrderSearchModel>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<OrderSearchModel>;
                menuList = deserializeditems;
            }
            return menuList;
        }

        public List<OrderSearchModel> TrnTypPendingTrnTypTrf_SelectWeb(string EnvironmentName, int CKy, int usrKy, string PrjKy, string SupKy, string ConCd, string OurCd, string FrmDt, string ToDt, int TrnTypKy)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/Transaction/TrnTypPendingTrnTypTrf_SelectWeb?cky=" + CKy + "&usrKy=" + usrKy + "&PrjKy=" + PrjKy + "&SupKy=" + SupKy + "&ConCd=" + ConCd + "&OurCd=" + OurCd + "&FrmDt=" + FrmDt + "&ToDt=" + ToDt + "&TrnTypKy=" + TrnTypKy + "")).Result;

            List<OrderSearchModel> menuList = new List<OrderSearchModel>();
            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<OrderSearchModel>));
                List<OrderSearchModel> deserializeditems = new List<OrderSearchModel>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<OrderSearchModel>;
                menuList = deserializeditems;
            }
            return menuList;
        }

        public List<OrderSearchModel> TrnTypPendingOrdTyp_SelectWeb(string EnvironmentName, int CKy, int usrKy, string PrjKy, string SupKy, string ConCd, string OurCd, string FrmDt, string ToDt, int ToOrdNo, int TrnTypKy)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/Transaction/TrnTypPendingOrdTyp_SelectWeb?cky=" + CKy + "&usrKy=" + usrKy + "&PrjKy=" + PrjKy + "&SupKy=" + SupKy + "&ConCd=" + ConCd + "&OurCd=" + OurCd + "&FrmDt=" + FrmDt + "&ToDt=" + ToDt + "&ToOrdNo=" + ToOrdNo + "&TrnTypKy=" + TrnTypKy + "")).Result;

            List<OrderSearchModel> menuList = new List<OrderSearchModel>();
            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<OrderSearchModel>));
                List<OrderSearchModel> deserializeditems = new List<OrderSearchModel>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<OrderSearchModel>;
                menuList = deserializeditems;
            }
            return menuList;
        }

        public List<OrderModel> GetHdrDetailFromPO(string EnvironmentName, int CKy, int usrKy, string ordKy, string ConCd, string OurCd)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/Transaction/GetHdrDetailFromPO?CKy=" + CKy + "&UsrKy=" + usrKy + "&ordKy=" + ordKy + "&ConCd=" + ConCd + "&OurCd=" + OurCd + "")).Result;

            List<OrderModel> menuList = new List<OrderModel>();
            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<OrderModel>));
                List<OrderModel> deserializeditems = new List<OrderModel>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<OrderModel>;
                menuList = deserializeditems;
            }
            return menuList;
        }

        public List<OrderModel> TrnTypPendingTrnTypDetails_SelectWeb(string EnvironmentName, int CKy, int usrKy, string ordKy, string ConCd, string OurCd)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/Transaction/TrnTypPendingTrnTypDetails_SelectWeb?CKy=" + CKy + "&UsrKy=" + usrKy + "&ordKy=" + ordKy + "&ConCd=" + ConCd + "&OurCd=" + OurCd + "")).Result;

            List<OrderModel> menuList = new List<OrderModel>();
            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<OrderModel>));
                List<OrderModel> deserializeditems = new List<OrderModel>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<OrderModel>;
                menuList = deserializeditems;
            }
            return menuList;
        }

        public List<OrderModel> TrnTypPendingOrdTypDetails_SelectWeb(string EnvironmentName, int CKy, int usrKy, string ordKy, string ConCd, string OurCd)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/Transaction/TrnTypPendingOrdTypDetails_SelectWeb?CKy=" + CKy + "&UsrKy=" + usrKy + "&ordKy=" + ordKy + "&ConCd=" + ConCd + "&OurCd=" + OurCd + "")).Result;

            List<OrderModel> menuList = new List<OrderModel>();
            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<OrderModel>));
                List<OrderModel> deserializeditems = new List<OrderModel>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<OrderModel>;
                menuList = deserializeditems;
            }
            return menuList;
        }

        public List<OrderModel> GetGridDetailFromPO(string EnvironmentName, int CKy, int usrKy, string ordKy, string ConCd, string OurCd)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/Transaction/GetGridDetailFromPO?CKy=" + CKy + "&UsrKy=" + usrKy + "&ordKy=" + ordKy + "&ConCd=" + ConCd + "&OurCd=" + OurCd + "")).Result;

            List<OrderModel> menuList = new List<OrderModel>();
            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<OrderModel>));
                List<OrderModel> deserializeditems = new List<OrderModel>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<OrderModel>;
                menuList = deserializeditems;
            }
            return menuList;
        }

        public List<OrderHdrModel> GetHdrDetail(string EnvironmentName, int CKy, string ordKy, int usrKy)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/Transaction/GetHdrDetail?CKy=" + CKy + "&UsrKy=" + usrKy + "")).Result;

            List<OrderHdrModel> menuList = new List<OrderHdrModel>();
            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<OrderHdrModel>));
                List<OrderHdrModel> deserializeditems = new List<OrderHdrModel>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<OrderHdrModel>;
                menuList = deserializeditems;
            }
            return menuList;
        }

        public List<OrderHdrModel> GetHdrPurtReqDetail(string EnvironmentName, int CKy, string ordKy, int usrKy)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/Transaction/GetHdrPurtReqDetail?CKy=" + CKy + "&UsrKy=" + usrKy + "")).Result;

            List<OrderHdrModel> menuList = new List<OrderHdrModel>();
            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<OrderHdrModel>));
                List<OrderHdrModel> deserializeditems = new List<OrderHdrModel>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<OrderHdrModel>;
                menuList = deserializeditems;
            }
            return menuList;
        }

        public List<OrderModel> GetGridDetail(string EnvironmentName, int CKy, string ordKy, int usrKy)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/Transaction/GetGridDetail?CKy=" + CKy + "&UsrKy=" + usrKy + "")).Result;

            List<OrderModel> menuList = new List<OrderModel>();
            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<OrderModel>));
                List<OrderModel> deserializeditems = new List<OrderModel>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<OrderModel>;
                menuList = deserializeditems;
            }
            return menuList;
        }

        public List<GRN> GetGridGRNDetail(string EnvironmentName, int CKy, string ordKy, int usrKy)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/Transaction/GetGridGRNDetail?CKy=" + CKy + "&UsrKy=" + usrKy + "")).Result;

            List<GRN> menuList = new List<GRN>();
            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<GRN>));
                List<GRN> deserializeditems = new List<GRN>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<GRN>;
                menuList = deserializeditems;
            }
            return menuList;
        }

        public List<GRN> GetGRNItemsDetail(string EnvironmentName, int CKy, string ordKy, int usrKy)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/Transaction/GetGRNItemsDetail?CKy=" + CKy + "&UsrKy=" + usrKy + "")).Result;

            List<GRN> menuList = new List<GRN>();
            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<GRN>));
                List<GRN> deserializeditems = new List<GRN>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<GRN>;
                menuList = deserializeditems;
            }
            return menuList;
        }

        public List<OrderModel> GetGridPurReqDetail(string EnvironmentName, int CKy, string ordKy, int usrKy)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/Transaction/GetGridPurReqDetail?CKy=" + CKy + "&UsrKy=" + usrKy + "")).Result;

            List<OrderModel> menuList = new List<OrderModel>();
            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<OrderModel>));
                List<OrderModel> deserializeditems = new List<OrderModel>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<OrderModel>;
                menuList = deserializeditems;
            }
            return menuList;
        }

        public List<OrderModel> GetGridPurchesreqDetail(string EnvironmentName, int CKy, string ordKy, int usrKy)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/Transaction/GetGridPurchesreqDetail?CKy=" + CKy + "&UsrKy=" + usrKy + "")).Result;

            List<OrderModel> menuList = new List<OrderModel>();
            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<OrderModel>));
                List<OrderModel> deserializeditems = new List<OrderModel>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<OrderModel>;
                menuList = deserializeditems;
            }
            return menuList;
        }

        public List<RateModel> GetRateAndDisAmt(string EnvironmentName, string LocKy, string ItmKy, string BUKy, string PrjKy, string AdrKy, string AccKy, string Dt, string ConCd, string OurCd, int cky, int usrKy)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/Transaction/GetRateAndDisAmt?CKy=" + cky + "&UsrKy=" + usrKy + "")).Result;

            List<RateModel> menuList = new List<RateModel>();
            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<RateModel>));
                List<RateModel> deserializeditems = new List<RateModel>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<RateModel>;
                menuList = deserializeditems;
            }
            return menuList;
        }

        public List<RateModel> GetRate(string EnvironmentName, string LocKy, string ItmKy, string BUKy, string PrjKy, string AdrKy, string AccKy, string Dt, string ControlConKy, int cky, int usrKy)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/Transaction/GetRate?CKy=" + cky + "&UsrKy=" + usrKy + "")).Result;

            List<RateModel> menuList = new List<RateModel>();
            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<RateModel>));
                List<RateModel> deserializeditems = new List<RateModel>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<RateModel>;
                menuList = deserializeditems;
            }
            return menuList;
        }

        public List<OrderSearchModel> GetPendingInvoiceSearch(string EnvironmentName, int CKy, int usrKy, string DlyDt, string DlyNm, string DocNo, string ConCd, string OurCd)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/Transaction/GetPendingInvoiceSearch?CKy=" + CKy + "&UsrKy=" + usrKy + "")).Result;

            List<OrderSearchModel> menuList = new List<OrderSearchModel>();
            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<OrderSearchModel>));
                List<OrderSearchModel> deserializeditems = new List<OrderSearchModel>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<OrderSearchModel>;
                menuList = deserializeditems;
            }
            return menuList;
        }

        public List<ItemForOrdtypModel> ItemsLookUpByItmCd(string EnvironmentName, int CKy, int ObjKy, string ConCd, string OurCd, string ItmCd, int usrKy, string AdrKy, string LocKy, string PrjKy, string Dt, int ItmKy)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/Transaction/ItemsLookUpByItmCd?CKy=" + CKy + "&ObjKy=" + ObjKy + "&ConCd=" + ConCd + "&OurCd=" + OurCd + "&ItmCd=" + ItmCd + "&UsrKy=" + usrKy + "&AdrKy=" + AdrKy + "&LocKy=" + LocKy + "&PrjKy=" + PrjKy + "&Dt=" + Dt + "&ItmKy=" + ItmKy + "")).Result;

            List<ItemForOrdtypModel> menuList = new List<ItemForOrdtypModel>();
            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<ItemForOrdtypModel>));
                List<ItemForOrdtypModel> deserializeditems = new List<ItemForOrdtypModel>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<ItemForOrdtypModel>;
                menuList = deserializeditems;
            }
            return menuList;
        }

        public List<ItemForOrdtypModel> PnsItemsLookUpByItmCd(string EnvironmentName, int CKy, string ConCd, string OurCd, string ItmCd, int usrKy, string AdrKy, string LocKy, string Dt)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/Transaction/PnsItemsLookUpByItmCd?CKy=" + CKy + "&ConCd=" + ConCd + "&OurCd=" + OurCd + "&ItmCd=" + ItmCd + "&UsrKy=" + usrKy + "&AdrKy=" + AdrKy + "&LocKy=" + LocKy + "&Dt=" + Dt + "")).Result;

            List<ItemForOrdtypModel> menuList = new List<ItemForOrdtypModel>();
            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<ItemForOrdtypModel>));
                List<ItemForOrdtypModel> deserializeditems = new List<ItemForOrdtypModel>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<ItemForOrdtypModel>;
                menuList = deserializeditems;
            }
            return menuList;
        }

        public List<ItemForOrdtypModel> ItmNm_SelectWeb(string EnvironmentName, int CKy, string ConCd, string OurCd, int usrKy)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/Transaction/ItmNm_SelectWeb?CKy=" + CKy + "&ConCd=" + ConCd + "&OurCd=" + OurCd + "&UsrKy=" + usrKy + "")).Result;

            List<ItemForOrdtypModel> menuList = new List<ItemForOrdtypModel>();
            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<ItemForOrdtypModel>));
                List<ItemForOrdtypModel> deserializeditems = new List<ItemForOrdtypModel>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<ItemForOrdtypModel>;
                menuList = deserializeditems;
            }
            return menuList;
        }

        public List<ItemForOrdtypModel> ItmCd_SelectWeb(string EnvironmentName, int CKy, string ConCd, string OurCd, int UsrKy)
        {
            string actionUri = "ItmCd_SelectWeb";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("ConCd", ConCd);
            paramDictionary.Add("OurCd", OurCd);
            paramDictionary.Add("UsrKy", UsrKy);

            List<ItemForOrdtypModel> list = new List<ItemForOrdtypModel>();
            list = RunApiOperation(
                transactionBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as List<ItemForOrdtypModel>;

            return list;
        }

        public List<GRN> GetHdrDetails(string EnvironmentName, int CKy, string SCBKy, int usrKy)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/Transaction/GetHdrDetails?CKy=" + CKy + "&UsrKy=" + usrKy + "")).Result;

            List<GRN> menuList = new List<GRN>();
            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<GRN>));
                List<GRN> deserializeditems = new List<GRN>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<GRN>;
                menuList = deserializeditems;
            }
            return menuList;
        }

        public List<GRN> GetDetDetail(string EnvironmentName, int CKy, int usrKy, string SCBKy)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/Transaction/GetDetDetail?CKy=" + CKy + "&UsrKy=" + usrKy + "")).Result;

            List<GRN> menuList = new List<GRN>();
            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<GRN>));
                List<GRN> deserializeditems = new List<GRN>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<GRN>;
                menuList = deserializeditems;
            }
            return menuList;
        }

        internal long GetRateForItem(string EnvironmentName, string LocKy, string ItemKy, int UsrKy)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/Transaction/GetRateForItem?LocKy=" + LocKy + "&ItemKy=" + ItemKy + "&UsrKy=" + UsrKy + "")).Result;
            long Key = 1;

            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                Key = Convert.ToInt32(jstr);
            }
            return Key;
        }

        //ItmTrnSer_SelectWeb
        internal List<ItmTrnSer_SelectWeb> ItmTrnSer_SelectWeb(string Environment, int CKy, int UsrKy, int ObjKy, int ItmTrnKy, int TrnTypKy, int ItmKy)
        {
            string actionUri = "ItmTrnSer_SelectWeb";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("TrnTypKy", TrnTypKy);
            paramDictionary.Add("ItmKy", ItmKy);
            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("ObjKy", ObjKy);
            paramDictionary.Add("ItmTrnKy", ItmTrnKy);

            List<ItmTrnSer_SelectWeb> List = new List<ItmTrnSer_SelectWeb>();
            List = RunApiOperation(
                tranCRUDBaseUri,
                actionUri,
                Environment,
                paramDictionary,
                List.GetType()) as List<ItmTrnSer_SelectWeb>;

            return List;
        }

        internal bool ItmTrnSer_InsertUpdateWeb(string EnvironmentName, int CKy, int UsrKy, int TrnKy, string SerNoListString, int TrnTypKy)
        {
            bool Reset = new bool();

            if (SerNoListString != "[]" && SerNoListString != "[null]" && SerNoListString != "")
            {
                try
                {
                    ItmTrnSer_SelectWeb[] task = new JavaScriptSerializer().Deserialize<ItmTrnSer_SelectWeb[]>(SerNoListString);

                    for (int i = 0; i < task.Length; i++)
                    {
                        string actionUri = "ItmTrnSer_InsertUpdateWeb";
                        Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

                        string modelString = new JavaScriptSerializer().Serialize(task[i]);

                        paramDictionary.Add("TrnTypKy", TrnTypKy);
                        paramDictionary.Add("SerNoListString", modelString);
                        paramDictionary.Add("TrnKy", TrnKy);
                        paramDictionary.Add("CKy", CKy);
                        paramDictionary.Add("UsrKy", UsrKy);

                        object obj = RunApiOperation(
                            tranCRUDBaseUri,
                            actionUri,
                            EnvironmentName,
                            paramDictionary,
                            Reset.GetType());

                        Reset = Convert.ToBoolean(obj);
                    }
                }
                catch (Exception ex)
                {
                    ;
                }
            }

            return Reset;
        }


        internal List<TrnHdrDocModel> TrnHdrDoc_SelectWeb(string EnvironmentName, int CKy, int UsrKy, int TrnKy)
        {
            List<TrnHdrDocModel> Reset = new List<TrnHdrDocModel>();

            string actionUri = "TrnHdrDoc_SelectWeb";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("TrnKy", TrnKy);
            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);

            Reset = RunApiOperation(
                tranCRUDBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                Reset.GetType()) as List<TrnHdrDocModel>;

            return Reset;
        }

        internal List<TrnHdrDocModel> TblRecDoc_SelectWeb(string EnvironmentName, int CKy, int UsrKy, int RecKy,string OurCd)
        {
            List<TrnHdrDocModel> Reset = new List<TrnHdrDocModel>();

            string actionUri = "TblRecDoc_SelectWeb";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("RecKy", RecKy);
            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("OurCd", OurCd);

            Reset = RunApiOperation(
                tranCRUDBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                Reset.GetType()) as List<TrnHdrDocModel>;

            return Reset;
        }

        internal bool DocMas_InsertWeb(string EnvironmentName, int CKy, int UsrKy, int RecKy, string FilePath, string FileNm, string TblNm, int DocKy,string OurCd)
        {
            bool Reset = new bool();

            string actionUri = "DocMas_InsertWeb";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("RecKy", RecKy);
            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("FilePath", FilePath);
            paramDictionary.Add("FileNm", FileNm);
            paramDictionary.Add("TblNm", TblNm);
            paramDictionary.Add("DocKy", DocKy);
            paramDictionary.Add("OurCd", OurCd);

            object obj = RunApiOperation(
                tranCRUDBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                Reset.GetType());

            Reset = Convert.ToBoolean(obj);

            return Reset;
        }


        internal bool TblRecDoc_DeleteWeb(string EnvironmentName, int CKy, int UsrKy, int RecKy, string TblNm, int DocKy)
        {
            bool Reset = new bool();

            string actionUri = "TblRecDoc_DeleteWeb";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("RecKy", RecKy);
            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("TblNm", TblNm);
            paramDictionary.Add("DocKy", DocKy);

            object obj = RunApiOperation(
                tranCRUDBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                Reset.GetType());

            Reset = Convert.ToBoolean(obj);

            return Reset;
        }


        public ItmDetails GetAvailableQty(string EnvironmentName, string itmKy, string frmPrjKy, string toPrjKy, string frmLockKy, string toLocKy, string trnTyp, string objKy, int cky, int usrKy)
        {
            ItmDetails GetAvailableQty = new ItmDetails();

            string actionUri = "GetAvailableQty";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();
            //string ItmKy, string FrmPrjKy, string ToPrjKy, string FrmLockKy, string ToLocKy, string TrnTyp, string ObjKy, int Cky, int UsrKy, string EnvironmentName
            paramDictionary.Add("ItmKy", itmKy);
            paramDictionary.Add("FrmPrjKy", frmPrjKy);
            paramDictionary.Add("ToPrjKy", toPrjKy);
            paramDictionary.Add("FrmLockKy", frmLockKy);
            paramDictionary.Add("ToLocKy", toPrjKy);
            paramDictionary.Add("TrnTyp", frmLockKy);
            paramDictionary.Add("ObjKy", toLocKy);
            paramDictionary.Add("Cky", cky);
            paramDictionary.Add("UsrKy", usrKy);

            GetAvailableQty = RunApiOperation(
                tranCRUDBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                GetAvailableQty.GetType()) as ItmDetails;

            return GetAvailableQty;
        }
    }

}