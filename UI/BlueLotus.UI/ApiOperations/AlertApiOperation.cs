using BlueLotus.Alert.Model.Entity;
using BlueLotus.BOQ.Model.Entity;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Runtime.Serialization.Json;
using System.Text;
using System.Web;

namespace BlueLotus.UI.ApiOperations
{
    public partial class ApiOperation
    {
        public List<AlertModel> getSMSLogDet(int UsrKy, int CKy, string Env)
        {
            HttpResponseMessage response = httpClient.GetAsync("api/Alert/getSMSLogDet?UsrKy=" + UsrKy + "&CKy=" + CKy + "&Env=" + Env + "").Result;

            List<AlertModel> list = new List<AlertModel>();
            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<AlertModel>));
                List<AlertModel> deserializeditems = new List<AlertModel>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<AlertModel>;
                list = deserializeditems;
            }
            return list;
        }
        public List<AlertModel> getMobileLogDet(int UsrKy, int CKy, string Env)
        {
            HttpResponseMessage response = httpClient.GetAsync("api/Alert/getMobileLogDet?UsrKy=" + UsrKy + "&CKy=" + CKy + "&Env=" + Env + "").Result;
            List<AlertModel> list = new List<AlertModel>();
            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<AlertModel>));
                List<AlertModel> deserializeditems = new List<AlertModel>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<AlertModel>;
                list = deserializeditems;
            }
            return list;
        }
        public List<AlertModel> getEmailLogDet(int UsrKy, int CKy, string Env)
        {
            HttpResponseMessage response = httpClient.GetAsync("api/Alert/getEmailLogDet?UsrKy=" + UsrKy + "&CKy=" + CKy + "&Env=" + Env + "").Result;

            List<AlertModel> list = new List<AlertModel>();
            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<AlertModel>));
                List<AlertModel> deserializeditems = new List<AlertModel>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<AlertModel>;
                list = deserializeditems;
            }
            return list;
        }
        //****
        public List<AlertModel> getPndSMSLogDet(int UsrKy, int CKy, string Env)
        {
            HttpResponseMessage response = httpClient.GetAsync("api/Alert/getPndSMSLogDet?UsrKy=" + UsrKy + "&CKy=" + CKy + "&Env=" + Env + "").Result;

            List<AlertModel> list = new List<AlertModel>();
            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<AlertModel>));
                List<AlertModel> deserializeditems = new List<AlertModel>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<AlertModel>;
                list = deserializeditems;
            }
            return list;
        }
        public List<AlertModel> getPndMobileLogDet(int UsrKy, int CKy, string Env)
        {
            HttpResponseMessage response = httpClient.GetAsync("api/Alert/getPndMobileLogDet?UsrKy=" + UsrKy + "&CKy=" + CKy + "&Env=" + Env + "").Result;
            List<AlertModel> list = new List<AlertModel>();
            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<AlertModel>));
                List<AlertModel> deserializeditems = new List<AlertModel>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<AlertModel>;
                list = deserializeditems;
            }
            return list;
        }
        public List<AlertModel> getPndEmailLogDet(int UsrKy, int CKy, string Env)
        {
            HttpResponseMessage response = httpClient.GetAsync("api/Alert/getPndEmailLogDet?UsrKy=" + UsrKy + "&CKy=" + CKy + "&Env=" + Env + "").Result;

            List<AlertModel> list = new List<AlertModel>();
            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<AlertModel>));
                List<AlertModel> deserializeditems = new List<AlertModel>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<AlertModel>;
                list = deserializeditems;
            }
            return list;
        }
        public List<AlertModel> getAlertStatus(int UsrKy, int CKy, string Env)
        {
            HttpResponseMessage response = httpClient.GetAsync("api/Alert/getAlertStatus?UsrKy=" + UsrKy + "&CKy=" + CKy + "&Env=" + Env + "").Result;

            List<AlertModel> list = new List<AlertModel>();
            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<AlertModel>));
                List<AlertModel> deserializeditems = new List<AlertModel>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<AlertModel>;
                list = deserializeditems;
            }
            return list;
        }
        public bool SetAlertStatus(int UsrKy, int CKy, string Env, int SMSStat, int EmailStat, int MobStat)
        {
            HttpResponseMessage response = httpClient.GetAsync("api/Alert/setAlertStatus?UsrKy=" + UsrKy + "&CKy=" + CKy + "&Env=" + Env + "&SMSStat=" + SMSStat + "&EmailStat=" + EmailStat + "&MobStat=" + MobStat + "").Result;
            bool result = false;
            if (response.IsSuccessStatusCode)
            {
                result = true;
            }
            return result;
        }
        public bool SendSampleSMS(int UsrKy, int CKy, string Env, string Mob, string Msg )
        {
            HttpResponseMessage response = httpClient.GetAsync("api/Alert/SendSampleSMS?UsrKy=" + UsrKy + "&CKy=" + CKy + "&Env=" + Env + "&Mob=" + Mob + "&Msg=" + Msg + "").Result;
            bool result = false;
            if (response.IsSuccessStatusCode)
            {
                result = true;
            }
            return result;
        }
    }
}