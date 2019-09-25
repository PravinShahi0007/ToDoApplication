using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using BlueLotus.ViewModel.Entity;
using System.Net.Http;
using System.Runtime.Serialization.Json;
using System.IO;
using System.Text;
using System.Web.Script.Serialization;

namespace BlueLotus.UI.ApiOperations
{
    public partial class ApiOperation
    {
        public List<ToDoModel> GetAllToDo(List<ToDoModel> model,int CKy,int UsrKy)
        {
            string modelString = new JavaScriptSerializer().Serialize(model);
            HttpResponseMessage response = this.GetAsyncEnvironment(httpClient, EnvironmentName, "api/ToDo/GetAllToDo?CKy=" + CKy + "&UsrKy=" + UsrKy + "&model=" + modelString + "").Result;

            List<ToDoModel> ToDoList = new List<ToDoModel>();
            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<ToDoModel>));
                List<ToDoModel> deserializeditems = new List<ToDoModel>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<ToDoModel>;
                ToDoList = deserializeditems;
            }
            return ToDoList;
        }

        public long InsertToDo(int CKy, int UsrKy, string strDate, string strAddressName, string OurCd, string ConCd)
        {
            HttpResponseMessage response = this.GetAsyncEnvironment(httpClient, EnvironmentName, "api/Transaction/InsertItemRecords?CKy=" + CKy + "&UsrKy=" + UsrKy + "&strDate=" + strDate + "&strAddressName=" + strAddressName + "&OurCd=" + OurCd + "&ConCd=" + ConCd + "").Result;
            long Key = 1;

            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                Key = Convert.ToInt32(jstr);
            }
            return Key;
        }
    }
}