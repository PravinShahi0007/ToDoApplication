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
        internal List<AccModel> ContractAccCd_SelectMob(string EnvironmentName, int CKy, int UsrKy, string AccTyps)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/TransactionAcc/ContractAccCd_SelectMob?CKy=" + CKy + "&UsrKy=" + UsrKy + "&AccTyps=" + AccTyps + "")).Result;

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

        internal List<AccModel> ContractAccNm_SelectMob(string EnvironmentName, int CKy, int UsrKy, string AccTyps)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/TransactionAcc/ContractAccNm_SelectMob?CKy=" + CKy + "&UsrKy=" + UsrKy + "&AccTyps=" + AccTyps + "")).Result;

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

        internal List<AccModel> AccCd_SelectMob(string EnvironmentName, int CKy, int UsrKy, string AccTyps)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/TransactionAcc/AccCd_SelectMob?CKy=" + CKy + "&UsrKy=" + UsrKy + "&AccTyps=" + AccTyps + "")).Result;

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

        internal List<AccModel> AccNm_SelectMob(string EnvironmentName, int CKy, int UsrKy, string AccTyps)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/TransactionAcc/AccNm_SelectMob?CKy=" + CKy + "&UsrKy=" + UsrKy + "&AccTyps=" + AccTyps + "")).Result;

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

        public long CheckLockByTrnKy(string EnvironmentName, int CKy, int UsrKy, int TrnKy)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/TransactionAcc/CheckLockByTrnKy?CKy=" + CKy + "&UsrKy=" + UsrKy + "&TrnKy=" + TrnKy + "")).Result;
            long IsLocked = 0;

            if (response.IsSuccessStatusCode)
            {
                string TrnKyString = response.Content.ReadAsStringAsync().Result;
                IsLocked = Convert.ToInt32(TrnKyString);  
            }
            return IsLocked;
        }
    }
}