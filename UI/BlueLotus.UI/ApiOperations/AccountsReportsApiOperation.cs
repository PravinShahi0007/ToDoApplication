using BlueLotus.AccountsReports.Model.Entity;
using BlueLotus.HRModel.Entity;
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
        
        internal List<ReportNmModel> GetReportNm(string EnvironmentName, int CKy, int UsrKy, int ObjKy)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/AccountsReports/GetReportNm?CKy=" + CKy + "&UsrKy=" + UsrKy + "&ObjKy=" + ObjKy + "")).Result;

            List<ReportNmModel> ReportNmList = new List<ReportNmModel>();
            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<ReportNmModel>));
                List<ReportNmModel> deserializeditems = new List<ReportNmModel>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<ReportNmModel>;
                ReportNmList = deserializeditems;
            }
            return ReportNmList;
        }
        
        internal List<GetTrnTypModel> GetTrnTyp(string EnvironmentName, int CKy, int UsrKy)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/AccountsReports/GetTrnTyp?CKy=" + CKy + "")).Result;

            List<GetTrnTypModel> AdrNmList = new List<GetTrnTypModel>();
            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<GetTrnTypModel>));
                List<GetTrnTypModel> deserializeditems = new List<GetTrnTypModel>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<GetTrnTypModel>;
                AdrNmList = deserializeditems;
            }
            return AdrNmList;
        }

        internal List<GetAnlTypModel> GetAnlTyp(string EnvironmentName, int CKy, int UsrKy)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/AccountsReports/GetTrnTyp?CKy=" + CKy + "&UsrKy=" + UsrKy + "")).Result;

            List<GetAnlTypModel> AdrNmList = new List<GetAnlTypModel>();
            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<GetAnlTypModel>));
                List<GetAnlTypModel> deserializeditems = new List<GetAnlTypModel>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<GetAnlTypModel>;
                AdrNmList = deserializeditems;
            }
            return AdrNmList;
        }

    }
 }