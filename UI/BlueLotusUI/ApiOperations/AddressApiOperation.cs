using System;
using System.Collections.Generic;
using System.IO;
using System.Runtime.Serialization.Json;
using System.Text;
using BlueLotus.ViewModel.Entity;

namespace BlueLotus.UI.ApiOperations
{
    public partial class ApiOperation
    {
        //
        // GET: /AddressApiOperation/
        private readonly string AdrBaseUri = "api/Address/";

        public List<AddressGridModel> GetAddressEntry(string EnvironmentName, int CKy, int UsrKy, string ObjKy,
            string PageNo, string PageSize, string AdrId, string AdrNm)
        {
            var response =
                httpClient.GetAsync(GetUriWithEnvironment(EnvironmentName,
                    "api/Address/GetAddressEntry?CKy=" + CKy + "&UsrKy=" + UsrKy + "&ObjKy=" + ObjKy + "&PageNo=" +
                    PageNo + "&PageSize=" + PageSize + "&AdrId=" + AdrId + "&AdrNm=" + AdrNm)).Result;

            var adrList = new List<AddressGridModel>();
            if (response.IsSuccessStatusCode)
            {
                var jstr = response.Content.ReadAsStringAsync().Result;
                var serializer = new DataContractJsonSerializer(typeof(List<AddressGridModel>));
                var deserializeditems = new List<AddressGridModel>();
                var ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                var ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<AddressGridModel>;
                adrList = deserializeditems;
            }
            return adrList;
        }

        public bool InsertAddressGrid(string EnvironmentName, int CKy, int UsrKy, string newAdr, string deletedAdr)
        {
            var response =
                httpClient.GetAsync(GetUriWithEnvironment(EnvironmentName,
                    "api/Address/InsertAddressGrid?CKy=" + CKy + "&UsrKy=" + UsrKy + "" + "&newAdr=" + newAdr + "" +
                    "&deletedAdr=" + deletedAdr + "")).Result;

            var msg = false;
            if (response.IsSuccessStatusCode)
            {
                var jstr = response.Content.ReadAsStringAsync().Result;
                var serializer = new DataContractJsonSerializer(typeof(bool));
                var deserializeditems = new bool();
                var ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                var ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = (bool) ser.ReadObject(ms);
                msg = deserializeditems;
            }
            return msg;
        }

        public bool UpdateAddressGrid(string EnvironmentName, int CKy, int UsrKy, string updatedAdr)
        {
            var actionUri = "UpdateAddressGrid";
            var paramDictionary = new Dictionary<string, object>();
            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("updatedAdr", updatedAdr);

            var Sucess = new bool();
            var obj = RunApiOperation(
                AdrBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                Sucess.GetType());

            Sucess = Convert.ToBoolean(obj);

            return Sucess;
        }


        public bool DeleteAddress(string EnvironmentName, int CKy, int UsrKy, long key)
        {
            var response =
                httpClient.GetAsync(GetUriWithEnvironment(EnvironmentName,
                    "api/Address/DeleteAddress?CKy=" + CKy + "&UsrKy=" + UsrKy + "" + "&key=" + key + "")).Result;

            var result = false;
            if (response.IsSuccessStatusCode)
            {
                var jstr = response.Content.ReadAsStringAsync().Result;
                var serializer = new DataContractJsonSerializer(typeof(bool));
                var deserializeditems = new bool();
                var ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                var ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = (bool) ser.ReadObject(ms);
                result = deserializeditems;
            }
            return result;
        }

        public List<AdrTypModel> GetAdressTyp(string EnvironmentName, int CKy, int UsrKy)
        {
            var response =
                httpClient.GetAsync(GetUriWithEnvironment(EnvironmentName,
                    "api/Address/GetAdressTyp?CKy=" + CKy + "&UsrKy=" + UsrKy + "")).Result;

            var adrTypList = new List<AdrTypModel>();
            if (response.IsSuccessStatusCode)
            {
                var jstr = response.Content.ReadAsStringAsync().Result;
                var serializer = new DataContractJsonSerializer(typeof(List<AdrTypModel>));
                var deserializeditems = new List<AdrTypModel>();
                var ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                var ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<AdrTypModel>;
                adrTypList = deserializeditems;
            }
            return adrTypList;
        }

        public bool UpdateAdressType(string EnvironmentName, int CKy, int UsrKy, int AdrKy, int AdrTypKy)
        {
            var response =
                httpClient.GetAsync(GetUriWithEnvironment(EnvironmentName,
                    "api/Address/UpdateAdressType?CKy=" + CKy + "&UsrKy=" + UsrKy + "&AdrKy=" + AdrKy + "&AdrTypKy=" +
                    AdrTypKy + "")).Result;

            var msg = false;
            if (response.IsSuccessStatusCode)
            {
                var jstr = response.Content.ReadAsStringAsync().Result;
                var serializer = new DataContractJsonSerializer(typeof(bool));
                var deserializeditems = new bool();
                var ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                var ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = (bool) ser.ReadObject(ms);
                msg = deserializeditems;
            }
            return msg;
        }

        public List<IsCompanyModel> GetIsCompanyList(string EnvironmentName, int CKy, int UsrKy)
        {
            var response =
                httpClient.GetAsync(GetUriWithEnvironment(EnvironmentName,
                    "api/Address/GetIsCompanyList?CKy=" + CKy + "&UsrKy=" + UsrKy + "")).Result;

            var isCmpList = new List<IsCompanyModel>();
            if (response.IsSuccessStatusCode)
            {
                var jstr = response.Content.ReadAsStringAsync().Result;
                var serializer = new DataContractJsonSerializer(typeof(List<IsCompanyModel>));
                var deserializeditems = new List<IsCompanyModel>();
                var ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                var ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<IsCompanyModel>;
                isCmpList = deserializeditems;
            }
            return isCmpList;
        }

        public bool InsertOptAdrTyp(string EnvironmentName, int CKy, int UsrKy, int AdrKy, string optArry,
            string optDelArry, string ObjKy)
        {
            var response =
                httpClient.GetAsync(GetUriWithEnvironment(EnvironmentName,
                    "api/Address/InsertOptAdrTyp?CKy=" + CKy + "&UsrKy=" + UsrKy + "" + "&AdrKy=" + AdrKy + "" +
                    "&optArry=" + optArry + "&ObjKy=" + ObjKy + "&optDelArry=" + optDelArry)).Result;

            var msg = false;
            if (response.IsSuccessStatusCode)
            {
                var jstr = response.Content.ReadAsStringAsync().Result;
                var serializer = new DataContractJsonSerializer(typeof(bool));
                var deserializeditems = new bool();
                var ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                var ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = (bool) ser.ReadObject(ms);
                msg = deserializeditems;
            }
            return msg;
        }

        public List<AdrMasCdModel> CurrentAdrTyps(string EnvironmentName, int CKy, int UsrKy, int AdrKy, string ObjKy)
        {
            var response =
                httpClient.GetAsync(GetUriWithEnvironment(EnvironmentName,
                    "api/Address/CurrentAdrTyps?CKy=" + CKy + "&UsrKy=" + UsrKy + "" + "&AdrKy=" + AdrKy + "&ObjKy=" +
                    ObjKy + "")).Result;

            var adrCdList = new List<AdrMasCdModel>();
            if (response.IsSuccessStatusCode)
            {
                var jstr = response.Content.ReadAsStringAsync().Result;
                var serializer = new DataContractJsonSerializer(typeof(bool));
                var deserializeditems = new List<AdrMasCdModel>();
                var ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                var ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<AdrMasCdModel>;
                adrCdList = deserializeditems;
            }
            return adrCdList;
        }

        public bool InsertConDetail(string EnvironmentName, int CKy, int UsrKy, int AdrKy, string DetailsArray,string DetailsUpdateArray,
            string ObjKy)
        {
            //HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/Address/InsertDetailsConactDetail?CKy=" + CKy + "&UsrKy=" + UsrKy + "" + "&AdrKy=" + AdrKy + "" + "&optArry=" + optArry + "&ObjKy=" + ObjKy + "&optDelArry=" + optDelArry)).Result;

            //bool msg = false;
            //if (response.IsSuccessStatusCode)
            //{
            //    string jstr = response.Content.ReadAsStringAsync().Result;
            //    DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(bool));
            //    bool deserializeditems = new bool();
            //    MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
            //    DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
            //    deserializeditems = (bool)ser.ReadObject(ms);
            //    msg = deserializeditems;
            //}
            //return msg;
            var actionUri = "InsertDetailsConactDetail";
            var paramDictionary = new Dictionary<string, object>();
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("AdrKy", AdrKy);
            paramDictionary.Add("DetailsArray", DetailsArray);
            paramDictionary.Add("ObjKy", ObjKy);
            paramDictionary.Add("DetailsUpdateArray", DetailsUpdateArray);

            
            var Sucess = new bool();
            var obj = RunApiOperation(
                AdrBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                Sucess.GetType());

            Sucess = Convert.ToBoolean(obj);

            return Sucess;
        }

        public int ItmAdr_InsertUpdateWeb(string EnvironmentName, int CKy, int UsrKy, int AdrKy, int ItmKy,int ItmAdrKy)
        {
            
            var actionUri = "ItmAdr_InsertUpdateWeb";
            var paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("AdrKy", AdrKy);
            paramDictionary.Add("ItmKy", ItmKy);
            paramDictionary.Add("ItmAdrKy", ItmAdrKy);
            

            object insert = new object();
            insert = RunApiOperation(
                AdrBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                insert.GetType()) as object;

            return Convert.ToInt32(insert);

        }

        public List<ItmModel> ItmAdr_SelectWeb(string EnvironmentName, int CKy, int UsrKy, int ItmKy)
        {
            var actionUri = "ItmAdr_SelectWeb";
            var paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("ItmKy", ItmKy);

            List<ItmModel> insert = new List<ItmModel>();
            insert = RunApiOperation(
                AdrBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                insert.GetType()) as List<ItmModel>;

            return insert;

        }
    }
}
