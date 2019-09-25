using BlueLotus.ComboLoad.Model;
using BlueLotus.ItmMas.Model.Entity;
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
        string ItmMasCdUri = "api/ItmMasCd/";

        internal List<ItmMasCd_SelectWeb> GetItmSettings(string EnvironmentName, int CKy, int UsrKy, int ObjKy, int ItmTypKy, int ControlConKy, long ItmKy)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/ItmMasCd/GetItmSettings?CKy=" + CKy + "&UsrKy=" + UsrKy + "&ObjKy=" + ObjKy + "&ItmTypKy=" + ItmTypKy + "&ControlConKy=" + ControlConKy + "&ItmKy=" + ItmKy + "")).Result;

            List<ItmMasCd_SelectWeb> menuList = new List<ItmMasCd_SelectWeb>();
            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<ItmMasCd_SelectWeb>));
                List<ItmMasCd_SelectWeb> deserializeditems = new List<ItmMasCd_SelectWeb>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<ItmMasCd_SelectWeb>;
                menuList = deserializeditems;
            }
            return menuList;
        }
        internal List<ItmMasCd_SelectWeb> ItmMasCd_SelectWeb(string EnvironmentName, int CKy, int UsrKy, int ObjKy, long ItmKy, string OurCd)
        {
            string actionUri = "ItmMasCd_SelectWeb";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("ObjKy", ObjKy);
            paramDictionary.Add("ItmKy", ItmKy);
            paramDictionary.Add("OurCd", OurCd);

            List<ItmMasCd_SelectWeb> List = new List<ItmMasCd_SelectWeb>();
            List = RunApiOperation(
                ItmMasCdUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                List.GetType()) as List<ItmMasCd_SelectWeb>;

            return List;
        }

        internal bool InsertItmSettings(string EnvironmentName, string NewGridDetail, int CKy, int UsrKy, int ObjKy, int ControlConKy, long ItmKy)
        {

            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/ItmMasCd/InsertItmSettings?NewGridDetail=" + NewGridDetail + "&CKy=" + CKy + "&UsrKy=" + UsrKy + "&ObjKy=" + ObjKy + "&ControlConKy=" + ControlConKy + "&ItmKy=" + ItmKy + "")).Result;

            bool result = false;
            if (response.IsSuccessStatusCode)
            {
                result = true;
            }
            return result;
        }

        internal bool UpdateItmSettings(string EnvironmentName, string updateGrid, int CKy, int UsrKy, int ObjKy, int ControlConKy, long ItmKy)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/ItmMasCd/UpdateItmSettings?updateGrid=" + updateGrid + "&CKy=" + CKy + "&UsrKy=" + UsrKy + "&ObjKy=" + ObjKy + "&ControlConKy=" + ControlConKy + "&ItmKy=" + ItmKy + "")).Result;

            bool result = false;
            if (response.IsSuccessStatusCode)
            {
                result = true;
            }
            return result;
        }

        internal bool ProdLoc_InsertUpdateWeb(string EnvironmentName, string productionManufacturing_Update, string ItmKy, int Cky, int UsrKy, string ObjKy)
        {
            string actionUri = "ProdLoc_InsertUpdateWeb";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("Cky", Cky); 
            paramDictionary.Add("updatedRec", productionManufacturing_Update);
            paramDictionary.Add("ItmKy", ItmKy);
            paramDictionary.Add("ObjKy", ObjKy);
            //paramDictionary.Add("newpassword", newpassword);


            bool Reset = new bool();
            object obj = RunApiOperation(
                ItmMasCdUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                Reset.GetType());

            Reset = Convert.ToBoolean(obj);

            return Reset;
        }

        internal List<ItmMasCd_SelectWeb> ProdLoc_SelectWeb(string EnvironmentName, int CKy, int UsrKy, int ObjKy, int ItmKy)
        {
            string actionUri = "ProdLoc_SelectWeb";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("ObjKy", ObjKy);
            paramDictionary.Add("ItmKy", ItmKy);

            List<ItmMasCd_SelectWeb> List = new List<ItmMasCd_SelectWeb>();
            List = RunApiOperation(
                ItmMasCdUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                List.GetType()) as List<ItmMasCd_SelectWeb>;

            return List;
        } 

        internal List<ItmCd_SelectMob> GrpItmCdByControlConRel_SelectWeb(string EnvironmentName, int CKy, int UsrKy, int ObjKy, int ControlConKy)
        {
            string actionUri = "GrpItmCdByControlConRel_SelectWeb";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("ObjKy", ObjKy);
            paramDictionary.Add("ControlConKy", ControlConKy);

            List<ItmCd_SelectMob> List = new List<ItmCd_SelectMob>();
            List = RunApiOperation(
                ItmMasCdUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                List.GetType()) as List<ItmCd_SelectMob>;

            return List;
        }

        internal List<ItmMasItm> ItmMasItmLoadGridView(string EnvironmentName, int CKy, int UsrKy, int ControlConKy, int GrpItmKy, int ObjKy)
        {
            string actionUri = "ItmMasItmLoadGridView";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("ObjKy", ObjKy);
            paramDictionary.Add("ControlConKy", ControlConKy);
            paramDictionary.Add("GrpItmKy", GrpItmKy);

            List<ItmMasItm> List = new List<ItmMasItm>();
            List = RunApiOperation(
                ItmMasCdUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                List.GetType()) as List<ItmMasItm>;

            return List;
        }

        internal bool InsertUpdateItmMasItm(string EnvironmentName, int CKy, int UsrKy, int ObjKy, string GridUpdateDetail)
        {
            string actionUri = "InsertUpdateItmMasItm";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("ObjKy", ObjKy);
            paramDictionary.Add("GridUpdateDetail", GridUpdateDetail);

            bool Reset = new bool();
            object obj = RunApiOperation(
                ItmMasCdUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                Reset.GetType());

            Reset = Convert.ToBoolean(obj);
            return Reset;
        }

    }
}