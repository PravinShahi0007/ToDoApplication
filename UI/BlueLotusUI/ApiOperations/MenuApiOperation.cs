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
        string menuBaseUri = "api/Menu/";

        internal bool Date()
        {
            return DateTime.Now.Date <= Convert.ToDateTime(DateTime.Now.Date);
        }

        public List<MenuModel> GetAllMenu(string EnvironmentName, int CKy, int UsrKy)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/Menu/GetAllMenu?CKy=" + CKy + "&UsrKy=" + UsrKy + "")).Result;

            List<MenuModel> menuList = new List<MenuModel>();
            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<MenuModel>));
                List<MenuModel> deserializeditems = new List<MenuModel>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<MenuModel>;
                menuList = deserializeditems;
            }
            return menuList;
        }

        public List<POSFeatureModel> GetPOSMenuAccessV2Web(string EnvironmentName, int CKy, int UsrKy)
        {
            string actionUri = "GetPOSMenuAccessV2Web";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("CKy", CKy);

            List<POSFeatureModel> list = new List<POSFeatureModel>();
            list = RunApiOperation(
                menuBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as List<POSFeatureModel>;

            return list;
        }


        public List<MenuModel> GetSmartMenuModel(string EnvironmentName, int UsrKy, int CKy, string SearchQuery, string ColNm)
        {
            string actionUri = "GetSmartMenuModel";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("SearchQuery", SearchQuery);
            paramDictionary.Add("ColNm", ColNm);

            List<MenuModel> list = new List<MenuModel>();
            list = RunApiOperation(
                menuBaseUri, 
                actionUri, 
                EnvironmentName,
                paramDictionary, 
                list.GetType()) as List<MenuModel>;

            return list;
        }

        public bool UpdateSmartMenuModel(string EnvironmentName, List<MenuModel> model, int UsrKy)
        {
            string modelString = new JavaScriptSerializer().Serialize(model);
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/Menu/UpdateSmartMenuModel?UsrKy=" + UsrKy + "&model=" + modelString + "")).Result;

            bool result = false;
            if (response.IsSuccessStatusCode)
            {
                result = true;
            }
            return result;
        }

        public bool GetAdminDetails(string EnvironmentName, int UsrKy)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/Menu/GetAdminDetails?UsrKy=" + UsrKy + "")).Result;

            bool result = false;
            if (response.IsSuccessStatusCode)
            {
                result = true;
            }
            return result;
        }

        public bool MenuAuthorization(string EnvironmentName, int UsrKy, int CKy, int ObjKy)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/Menu/MenuAuthorization?UsrKy=" + UsrKy + "&CKy=" + CKy + "&ObjKy=" + ObjKy + "")).Result;

            bool result = false;
            if (response.IsSuccessStatusCode)
            {
                result = true;
            }
            return result;
        }
    }
}