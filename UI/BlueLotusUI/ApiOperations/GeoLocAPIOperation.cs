using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using BlueLotus.BOQ.Model.Entity;
using BlueLotus.GeoLocation.Model.Entity;
using System.Net.Http;
using System.Runtime.Serialization.Json;
using System.IO;
using System.Text;

namespace BlueLotus.UI.ApiOperations
{
    public partial class ApiOperation
    {

        public List<GeoLocModel> GetGeoUsr(int UsrKy, int CKy, string Env)
        {
            HttpResponseMessage response = httpClient.GetAsync("api/GeoLoc/GetGeoUsr?UsrKy=" + UsrKy + "&CKy=" + CKy + "&Env=" + Env + "").Result;

            List<GeoLocModel> list = new List<GeoLocModel>();
            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<GeoLocModel>));
                List<GeoLocModel> deserializeditems = new List<GeoLocModel>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<GeoLocModel>;
                list = deserializeditems;
            }
            return list;
        }
        public List<GeoLocModel> GetGeoCoordinates(int UsrKy, int CKy, string Env,string GeoUsr,string FrmDt,string ToDt)
        {
            HttpResponseMessage response = httpClient.GetAsync("api/GeoLoc/GetGeoCoordinates?UsrKy=" + UsrKy + "&CKy=" + CKy + "&Env=" + Env + "&GeoUsr=" + GeoUsr + "&FrmDt=" + FrmDt + "&ToDt=" + ToDt + "").Result;

            List<GeoLocModel> list = new List<GeoLocModel>();
            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<GeoLocModel>));
                List<GeoLocModel> deserializeditems = new List<GeoLocModel>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<GeoLocModel>;
                list = deserializeditems;
            }
            return list;
        }
    }
}
