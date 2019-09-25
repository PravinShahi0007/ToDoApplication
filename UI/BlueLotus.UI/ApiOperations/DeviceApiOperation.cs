using BlueLotus.Device.Model.Entity;
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
        internal bool InsertDevice(int UsrKy,int CKy,string Env,string DeviceNm, string DeviceIP, string IMEINo,int isAct,int isApr)
        {
            HttpResponseMessage response = httpClient.GetAsync("api/Device/InsertDevice?UsrKy=" + UsrKy + "&CKy=" + CKy + "&Env=" + Env + "&DeviceNm=" + DeviceNm + "&DeviceIP=" + DeviceIP + "&IMEI=" + IMEINo + "&isAct=" + isAct + "&isApr=" + isApr + "").Result;

            bool result = false;
            if (response.IsSuccessStatusCode)
            {
                result = true;
            }
            return result;
        }
        public List<DeviceModel> GetAssignedDevices(int UsrKy,int CKy,string Env)
        {
            HttpResponseMessage response = httpClient.GetAsync("api/Device/GetAssignedDevices?UsrKy=" + UsrKy + "&CKy=" + CKy + "&Env=" + Env + "").Result;

            List<DeviceModel> companyList = new List<DeviceModel>();
            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<DeviceModel>));
                List<DeviceModel> deserializeditems = new List<DeviceModel>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<DeviceModel>;
                companyList = deserializeditems;
            }
            return companyList;
        }
        public List<DeviceModel> GetAllDevices(int UsrKy,int CKy,string Env)
        {
            HttpResponseMessage response = httpClient.GetAsync("api/Device/GetAllDevices?UsrKy=" + UsrKy + "&CKy=" + CKy + "&Env=" + Env + "").Result;

            List<DeviceModel> DevList = new List<DeviceModel>();
            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<DeviceModel>));
                List<DeviceModel> deserializeditems = new List<DeviceModel>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<DeviceModel>;
                DevList = deserializeditems;
            }
            return DevList;
        }
        public List<DeviceModel> GetDevUsers(int UsrKy,int CKy,string Env)
        {
            HttpResponseMessage response = httpClient.GetAsync("api/Device/GetDevUsers?UsrKy=" + UsrKy + "&CKy=" + CKy + "&Env=" + Env + "").Result;

            List<DeviceModel> DevUsrList = new List<DeviceModel>();
            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<DeviceModel>));
                List<DeviceModel> deserializeditems = new List<DeviceModel>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<DeviceModel>;
                DevUsrList = deserializeditems;
            }
            return DevUsrList;
        }
        internal bool AssignDevice(int UsrKy,int CKy,string Env,int DevUsrKy,int DeviceKy)
        {
            HttpResponseMessage response = httpClient.GetAsync("api/Device/AssignDevice?UsrKy=" + UsrKy + "&CKy=" + CKy + "&Env=" + Env + "&DevUsrKy=" + DevUsrKy + "&DeviceKy=" + DeviceKy + "").Result;

            bool result = false;
            if (response.IsSuccessStatusCode)
            {
                result = true;
            }
            return result;
        }
        internal bool UnselectDevice(int UsrKy,int CKy,string Env,int DevUsrKy, int DeviceKy)
        {    
            HttpResponseMessage response = httpClient.GetAsync("api/Device/UnselectDevice?UsrKy=" + UsrKy + "&CKy=" + CKy + "&Env=" + Env + "&DevUsrKy=" + DevUsrKy + "&DeviceKy=" + DeviceKy + "").Result;

            bool result = false;
            if (response.IsSuccessStatusCode)
            {
                result = true;
            }
            return result;
        }
    }
}