using BlueLotus.Codes.Model.Entity;
using BlueLotus.ProjectCosting.Model.Entity;
//using BlueLotus.ProjectCosting.Model.Contract;
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

        //public List<TskModel> GetTask(string EnvironmentName, string Prjky, int cky, int UsrKy)
        //{
        //    HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/ProjectCosting/GetCurencyDrop?CKy=" + CKy + "&UsrKy=" + UsrKy + "")).Result;

        //    List<TskModel> curencyList = new List<TskModel>();
        //    if (response.IsSuccessStatusCode)
        //    {
        //        string jstr = response.Content.ReadAsStringAsync().Result;
        //        DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<TskModel>));
        //        List<TskModel> deserializeditems = new List<TskModel>();
        //        MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
        //        DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
        //        deserializeditems = ser.ReadObject(ms) as List<TskModel>;
        //        curencyList = deserializeditems;
        //    }
        //    return curencyList;
        //}


        internal List<TskModel> GetTask_PrjCosting(string EnvironmentName, int Prjky, int CKy, int UsrKy)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/ProjectCosting/GetTask_PrjCosting?Prjky=" + Prjky + "&CKy=" + CKy + "&UsrKy=" + UsrKy + "")).Result;

            List<TskModel> curencyList = new List<TskModel>();
            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<TskModel>));
                List<TskModel> deserializeditems = new List<TskModel>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<TskModel>;
                curencyList = deserializeditems;
            }
            return curencyList;
        }

        internal List<AccountModel> GetAccount_PrjCosting(string EnvironmentName, int CKy, int UsrKy)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/ProjectCosting/GetAccount_PrjCosting?CKy=" + CKy + "&UsrKy=" + UsrKy + "")).Result;

            List<AccountModel> curencyList = new List<AccountModel>();
            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<AccountModel>));
                List<AccountModel> deserializeditems = new List<AccountModel>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<AccountModel>;
                curencyList = deserializeditems;
            }
            return curencyList;
        }

        internal List<AccountModel> GetAccountCd_PrjCosting(string EnvironmentName, int CKy, int UsrKy)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/ProjectCosting/GetAccountCd_PrjCosting?CKy=" + CKy + "&UsrKy=" + UsrKy + "")).Result;

            List<AccountModel> curencyList = new List<AccountModel>();
            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<AccountModel>));
                List<AccountModel> deserializeditems = new List<AccountModel>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<AccountModel>;
                curencyList = deserializeditems;
            }
            return curencyList;
        }

        internal List<ComboDataModel> GetComboData_PrjCosting(string EnvironmentName, int CKy, int UsrKy, string ConCd)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/ProjectCosting/GetComboData_PrjCosting?CKy=" + CKy + "&UsrKy=" + UsrKy + "&ConCd=" + ConCd + "")).Result;

            List<ComboDataModel> curencyList = new List<ComboDataModel>();
            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<ComboDataModel>));
                List<ComboDataModel> deserializeditems = new List<ComboDataModel>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<ComboDataModel>;
                curencyList = deserializeditems;
            }
            return curencyList;
        }

        internal List<GetPrjModel> GetProject_PrjCosting(string EnvironmentName, int cky, int UsrKy)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/ProjectCosting/GetProject_PrjCosting?cky=" + cky + "&UsrKy=" + UsrKy + "")).Result;

            List<GetPrjModel> curencyList = new List<GetPrjModel>();
            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<GetPrjModel>));
                List<GetPrjModel> deserializeditems = new List<GetPrjModel>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<GetPrjModel>;
                curencyList = deserializeditems;
            }
            return curencyList;
        }

        internal List<AddrsModel> GetAddrs_PrjCosting(string EnvironmentName, int cky, int UsrKy)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/ProjectCosting/GetAddrs_PrjCosting?cky=" + cky + "&UsrKy=" + UsrKy + "")).Result;

            List<AddrsModel> curencyList = new List<AddrsModel>();
            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<AddrsModel>));
                List<AddrsModel> deserializeditems = new List<AddrsModel>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<AddrsModel>;
                curencyList = deserializeditems;
            }
            return curencyList;
        }

        internal List<ItmModel> GetItm_PrjCosting(string EnvironmentName, int cky, int UsrKy, int ItmTypKy)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/ProjectCosting/GetItm_PrjCosting?cky=" + cky + "&UsrKy=" + UsrKy + "&ItmTypKy=" + ItmTypKy + "")).Result;

            List<ItmModel> curencyList = new List<ItmModel>();
            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<ItmModel>));
                List<ItmModel> deserializeditems = new List<ItmModel>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<ItmModel>;
                curencyList = deserializeditems;
            }
            return curencyList;
        }

        internal List<OrdNoModel> GetOrdNo_PrjCosting(string EnvironmentName, int cky, int UsrKy)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/ProjectCosting/GetOrdNo_PrjCosting?cky=" + cky + "&UsrKy=" + UsrKy + "")).Result;

            List<OrdNoModel> curencyList = new List<OrdNoModel>();
            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<OrdNoModel>));
                List<OrdNoModel> deserializeditems = new List<OrdNoModel>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<OrdNoModel>;
                curencyList = deserializeditems;
            }
            return curencyList;
        }

        internal List<ItmTrnAnlModel> ItmTrnAnl_PrjCosting(string EnvironmentName, int CKy, string ToDt, string FrmDt, string TrnNoFrm, string TrnNoTo, string DocNo, string YurRef, string ItmTypKy, string ItmKy, string LocKy, string TrnTypKy, string AccKy, string PrefixKy, string PrjKy, string BUKy, string Anl1Ky, string Anl2Ky, string ItmCat1Ky, string ItmCat2Ky, string AdrKy)
        {


            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/ProjectCosting/ItmTrnAnl_PrjCosting??CKy=" + CKy + "&ToDt=" + ToDt + "&FrmDt=" + FrmDt + "&TrnNoFrm=" + TrnNoFrm + "&TrnNoTo=" + TrnNoTo + "&DocNo=" + DocNo + "&YurRef=" + YurRef + "&ItmTypKy=" + ItmTypKy + "&ItmKy=" + ItmKy + "&LocKy=" + LocKy + "&TrnTypKy=" + TrnTypKy + "&AccKy=" + AccKy + "&PrefixKy=" + PrefixKy + "&PrjKy=" + PrjKy + "&BUKy=" + BUKy + "&Anl1Ky=" + Anl1Ky + "&Anl2Ky=" + Anl2Ky + "&ItmCat1Ky=" + ItmCat1Ky + "&ItmCat2Ky=" + ItmCat2Ky + "&AdrKy=" + AdrKy + "")).Result;

            List<ItmTrnAnlModel> curencyList = new List<ItmTrnAnlModel>();
            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<ItmTrnAnlModel>));
                List<ItmTrnAnlModel> deserializeditems = new List<ItmTrnAnlModel>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<ItmTrnAnlModel>;
                curencyList = deserializeditems;
            }
            return curencyList;
        }

        internal List<OrdItmAnlModel> OrderItemAnlysis_PrjCosting(string EnvironmentName, int CKy, string ToDt, string FrmDt, string ItmTypKy, string ItmKy, string OrdTypKy, string LocKy, string AdrKy, string PrjKy, string BUKy, string ItmPriCatKy, string OrdPreFixKy, string Anl1Ky, string Anl2Ky, string ItmCat1Ky, string ItmCat2Ky)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/ProjectCosting/OrderItemAnlysis_PrjCosting?CKy=" + CKy + "&ToDt=" + ToDt + "&FrmDt=" + FrmDt+ "&ItmTypKy=" +ItmTypKy + "&ItmKy="+ItmKy+"&OrdTypKy=" + OrdTypKy + "&LocKy=" + LocKy + "&AdrKy="+AdrKy+"&PrjKy="+PrjKy+"&BUKy"+BUKy + "&ItmPriCatKy="+ItmPriCatKy + "&OrdPreFixKy=" + OrdPreFixKy + "&Anl1Ky=" + Anl1Ky + "&Anl2Ky=" + Anl2Ky + "&ItmCat1Ky=" + ItmCat1Ky + "&ItmCat2Ky=" + ItmCat2Ky + "")).Result;
            

            List<OrdItmAnlModel> curencyList = new List<OrdItmAnlModel>();
            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<OrdItmAnlModel>));
                List<OrdItmAnlModel> deserializeditems = new List<OrdItmAnlModel>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<OrdItmAnlModel>;
                curencyList = deserializeditems;
            }
            return curencyList;
        }

        internal List<object> ItmAnl_SelectColDet_PrjCosting(string EnvironmentName, int CKy, string ToDt, string FrmDt, string TrnNoFrm, string TrnNoTo, string DocNo, string YurRef, string ItmTypKy, string ItmKy, string LocKy, string TrnTypKy, string AccKy, string PrefixKy, string PrjKy, string BUKy, string Anl1Ky, string Anl2Ky, string ItmCat1Ky, string ItmCat2Ky, string AdrKy)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/ProjectCosting/ItmAnl_SelectColDet_PrjCosting?CKy=" + CKy + "&ToDt=" + ToDt + "&FrmDt=" + FrmDt + "&TrnNoFrm=" + TrnNoFrm + "&TrnNoTo=" + TrnNoTo + "&DocNo=" + DocNo + "&YurRef=" + YurRef + "&ItmTypKy=" + ItmTypKy + "&ItmKy=" + ItmKy + "&LocKy=" + LocKy + "&TrnTypKy=" + TrnTypKy + "&AccKy=" + AccKy + "&PrefixKy=" + PrefixKy + "&PrjKy=" + PrjKy + "&BUKy=" + BUKy + "&Anl1Ky=" + Anl1Ky + "&Anl2Ky=" + Anl2Ky + "&ItmCat1Ky=" + ItmCat1Ky + "&ItmCat2Ky=" + ItmCat2Ky + "&AdrKy=" + AdrKy + "")).Result;

            List<object> curencyList = new List<object>();
            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<object>));
                List<object> deserializeditems = new List<object>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<object>;
                curencyList = deserializeditems;
            }
            return curencyList;
        }

        internal List<object> ItmAnl_Select_PrjCosting(string EnvironmentName, int CKy, string ToDt, string FrmDt, string TrnNoFrm, string TrnNoTo, string DocNo, string YurRef, string ItmTypKy, string ItmKy, string LocKy, string TrnTypKy, string AccKy, string PrefixKy, string PrjKy, string BUKy, string Anl1Ky, string Anl2Ky, string ItmCat1Ky, string ItmCat2Ky, string AdrKy)
        {

            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/ProjectCosting/ItmAnl_Select_PrjCosting?CKy=" + CKy + "&ToDt=" + ToDt + "&FrmDt=" + FrmDt + "&TrnNoFrm=" + TrnNoFrm + "&TrnNoTo=" + TrnNoTo + "&DocNo=" + DocNo + "&YurRef=" + YurRef + "&ItmTypKy=" + ItmTypKy + "&ItmKy=" + ItmKy + "&LocKy=" + LocKy + "&TrnTypKy=" + TrnTypKy + "&AccKy=" + AccKy + "&PrefixKy=" + PrefixKy + "&PrjKy=" + PrjKy + "&BUKy=" + BUKy + "&Anl1Ky=" + Anl1Ky + "&Anl2Ky=" + Anl2Ky + "&ItmCat1Ky=" + ItmCat1Ky + "&ItmCat2Ky=" + ItmCat2Ky + "&AdrKy=" + AdrKy + "")).Result;

            List<object> curencyList = new List<object>();
            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<object>));
                List<object> deserializeditems = new List<object>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<object>;
                curencyList = deserializeditems;
            }
            return curencyList;
        }

        internal List<AccAnlModel> AccAnl_PrjCosting(string EnvironmentName, int CKy, string ToDt, string FrmDt, string TrnNoFrm, string TrnNoTo, string DocNo, string YurRef, string AccTypKy, string AccKy, string PrefixKy, string PrjKy, string BUKy, string Anl1Ky, string Anl2Ky)
        {

            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/ProjectCosting/AccAnl_PrjCosting?CKy=" + CKy + "&ToDt=" + ToDt + "&FrmDt=" + FrmDt + "&TrnNoFrm=" + TrnNoFrm + "&TrnNoTo=" + TrnNoTo + "&DocNo=" + DocNo + "&YurRef=" + YurRef + "&AccTypKy=" + AccTypKy + "&AccKy=" + AccKy + "&PrefixKy=" + PrefixKy + "&PrjKy=" + PrjKy + "&BUKy=" + BUKy + "&Anl1Ky=" + Anl1Ky + "&Anl2Ky=" + Anl2Ky + "")).Result;

            List<AccAnlModel> curencyList = new List<AccAnlModel>();
            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<AccAnlModel>));
                List<AccAnlModel> deserializeditems = new List<AccAnlModel>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<AccAnlModel>;
                curencyList = deserializeditems;
            }
            return curencyList;
        }

        internal List<object> AccAnl_SelectColDet_PrjCosting(string EnvironmentName, int CKy, string ToDt, string FrmDt, string TrnNoFrm, string TrnNoTo, string DocNo, string YurRef, string AccTypKy, string AccKy, string PrefixKy, string PrjKy, string BUKy, string Anl1Ky, string Anl2Ky)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/ProjectCosting/AccAnl_SelectColDet_PrjCosting?CKy=" + CKy + "&ToDt=" + ToDt + "&FrmDt=" + FrmDt + "&TrnNoFrm=" + TrnNoFrm + "&TrnNoTo=" + TrnNoTo + "&DocNo=" + DocNo + "&YurRef=" + YurRef + "&AccTypKy=" + AccTypKy + "&AccKy=" + AccKy + "&PrefixKy=" + PrefixKy + "&PrjKy=" + PrjKy + "&BUKy=" + BUKy + "&Anl1Ky=" + Anl1Ky + "&Anl2Ky=" + Anl2Ky + "")).Result;

            List<object> curencyList = new List<object>();
            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<object>));
                List<object> deserializeditems = new List<object>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<object>;
                curencyList = deserializeditems;
            }
            return curencyList;
        }

        internal List<object> AccAnl_Select_PrjCosting(string EnvironmentName, int CKy, string ToDt, string FrmDt, string TrnNoFrm, string TrnNoTo, string DocNo, string YurRef, string AccTypKy, string AccKy, string PrefixKy, string PrjKy, string BUKy, string Anl1Ky, string Anl2Ky)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/ProjectCosting/AccAnl_Select_PrjCosting?CKy=" + CKy + "&ToDt=" + ToDt + "&FrmDt=" + FrmDt + "&TrnNoFrm=" + TrnNoFrm + "&TrnNoTo=" + TrnNoTo + "&DocNo=" + DocNo + "&YurRef=" + YurRef + "&AccTypKy=" + AccTypKy + "&AccKy=" + AccKy + "&PrefixKy=" + PrefixKy + "&PrjKy=" + PrjKy + "&BUKy=" + BUKy + "&Anl1Ky=" + Anl1Ky + "&Anl2Ky=" + Anl2Ky + "")).Result;

            List<object> curencyList = new List<object>();
            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<object>));
                List<object> deserializeditems = new List<object>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<object>;
                curencyList = deserializeditems;
            }
            return curencyList;
        }

        internal List<object> OrdAnl_SelectColDet_PrjCosting(string EnvironmentName, int CKy, string ToDt, string FrmDt, string ItmTypKy, string ItmKy, string OrdTypKy, string LocKy, string AdrKy, string PrjKy, string BUKy, string ItmPriCatKy, string OrdPreFixKy, string Anl1Ky, string Anl2Ky, string ItmCat1Ky, string ItmCat2Ky)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/ProjectCosting/OrdAnl_SelectColDet_PrjCosting?CKy=" + CKy + "&ToDt=" + ToDt + "&FrmDt=" + FrmDt + "&ItmTypKy=" + ItmTypKy + "&ItmKy=" + ItmKy + "&OrdTypKy=" + OrdTypKy + "&LocKy=" + LocKy + "&AdrKy=" + AdrKy + "&PrjKy=" + PrjKy + "&BUKy=" + BUKy + "&ItmPriCatKy=" + ItmPriCatKy + "&OrdPreFixKy=" + OrdPreFixKy + "&Anl1Ky=" + Anl1Ky + "&Anl2Ky=" + Anl2Ky + "&ItmCat1Ky=" + ItmCat1Ky + "&ItmCat2Ky=" + ItmCat2Ky + "")).Result;

            List<object> curencyList = new List<object>();
            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<object>));
                List<object> deserializeditems = new List<object>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<object>;
                curencyList = deserializeditems;
            }
            return curencyList;
        }

        internal List<object> OrdAnl_Select_PrjCosting(string EnvironmentName, int CKy, string ToDt, string FrmDt, string ItmTypKy, string ItmKy, string OrdTypKy, string LocKy, string AdrKy, string PrjKy, string BUKy, string ItmPriCatKy, string OrdPreFixKy, string Anl1Ky, string Anl2Ky, string ItmCat1Ky, string ItmCat2Ky)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/ProjectCosting/OrdAnl_Select_PrjCosting?CKy=" + CKy + "&ToDt=" + ToDt + "&FrmDt=" + FrmDt + "&ItmTypKy=" + ItmTypKy + "&ItmKy=" + ItmKy + "&OrdTypKy=" + OrdTypKy + "&LocKy=" + LocKy + "&AdrKy=" + AdrKy + "&PrjKy=" + PrjKy + "&BUKy=" + BUKy + "&ItmPriCatKy=" + ItmPriCatKy + "&OrdPreFixKy=" + OrdPreFixKy + "&Anl1Ky=" + Anl1Ky + "&Anl2Ky=" + Anl2Ky + "&ItmCat1Ky=" + ItmCat1Ky + "&ItmCat2Ky=" + ItmCat2Ky + "")).Result;

            List<object> curencyList = new List<object>();
            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<object>));
                List<object> deserializeditems = new List<object>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<object>;
                curencyList = deserializeditems;
            }
            return curencyList;
        }

        internal List<object> GRNReg_SelectColDet_PrjCosting(string EnvironmentName, int CKy, int UsrKy, string ToDt, string FrmDt, string PrjKy, string DocNo)
        {

            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/ProjectCosting/GRNReg_SelectColDet_PrjCosting?CKy=" + CKy + "&UsrKy=" + UsrKy + "&ToDt=" + ToDt + "&FrmDt=" + FrmDt + "&PrjKy=" + PrjKy + "&DocNo=" + DocNo + "")).Result;

            List<object> curencyList = new List<object>();
            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<object>));
                List<object> deserializeditems = new List<object>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<object>;
                curencyList = deserializeditems;
            }
            return curencyList;
        }

        internal List<object> GRNReg_Select_PrjCosting(string EnvironmentName, int CKy, int UsrKy, string ToDt, string FrmDt, string PrjKy, string DocNo)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/ProjectCosting/GRNReg_Select_PrjCosting?CKy=" + CKy + "&UsrKy=" + UsrKy + "&ToDt=" + ToDt + "&FrmDt=" + FrmDt + "&PrjKy=" + PrjKy + "&DocNo=" + DocNo + "")).Result;

            List<object> curencyList = new List<object>();
            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<object>));
                List<object> deserializeditems = new List<object>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<object>;
                curencyList = deserializeditems;
            }
            return curencyList;
        }

        internal List<object> POReg_SelectColDet_PrjCosting(string EnvironmentName, int CKy, int UsrKy, string ToDt, string FrmDt, string PrjKy)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/ProjectCosting/POReg_SelectColDet_PrjCosting?CKy=" + CKy + "&UsrKy=" + UsrKy + "&ToDt=" + ToDt + "&FrmDt=" + FrmDt + "&PrjKy=" + PrjKy + "")).Result;

            List<object> curencyList = new List<object>();
            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<object>));
                List<object> deserializeditems = new List<object>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<object>;
                curencyList = deserializeditems;
            }
            return curencyList;
        }

        internal List<object> POReg_Select_PrjCosting(string EnvironmentName, int CKy, int UsrKy, string ToDt, string FrmDt, string PrjKy)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/ProjectCosting/POReg_Select_PrjCosting?CKy=" + CKy + "&UsrKy=" + UsrKy + "&ToDt=" + ToDt + "&FrmDt=" + FrmDt + "&PrjKy=" + PrjKy + "")).Result;

            List<object> curencyList = new List<object>();
            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<object>));
                List<object> deserializeditems = new List<object>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<object>;
                curencyList = deserializeditems;
            }
            return curencyList;
        }

        internal List<ReportModel> GetReport_PrjCosting(string EnvironmentName, int cky, int UsrKy)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/ProjectCosting/GetReport_PrjCosting?cky=" + cky + "&UsrKy=" + UsrKy + "")).Result;

            List<ReportModel> curencyList = new List<ReportModel>();
            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<ReportModel>));
                List<ReportModel> deserializeditems = new List<ReportModel>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<ReportModel>;
                curencyList = deserializeditems;
            }
            return curencyList;
        }

        internal List<object> OrdSummry_SelectColDet_PrjCosting(string EnvironmentName, int CKy, int UsrKy, string ToDt, string FrmDt, string OrdTypKy, string LocKy, string RecurDlvNoKy)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/ProjectCosting/OrdSummry_SelectColDet_PrjCosting?CKy=" + CKy + "&UsrKy=" + UsrKy + "&ToDt=" + ToDt + "&FrmDt=" + FrmDt + "&OrdTypKy=" + OrdTypKy + "&LocKy=" + LocKy + "&RecurDlvNoKy=" + RecurDlvNoKy + "")).Result;

            List<object> curencyList = new List<object>();
            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<object>));
                List<object> deserializeditems = new List<object>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<object>;
                curencyList = deserializeditems;
            }
            return curencyList;
        }

        internal List<object> OrdSummry_Select_PrjCosting(string EnvironmentName, int CKy, int UsrKy, string ToDt, string FrmDt, string OrdTypKy, string LocKy, string RecurDlvNoKy)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/ProjectCosting/OrdSummry_Select_PrjCosting?CKy=" + CKy + "&UsrKy=" + UsrKy + "&ToDt=" + ToDt + "&FrmDt=" + FrmDt + "&OrdTypKy=" + OrdTypKy + "&LocKy=" + LocKy + "&RecurDlvNoKy=" + RecurDlvNoKy + "")).Result;

            List<object> curencyList = new List<object>();
            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<object>));
                List<object> deserializeditems = new List<object>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<object>;
                curencyList = deserializeditems;
            }
            return curencyList;
        }

        internal List<DlvryNoModel> GetDlyNo_PrjCosting(string EnvironmentName, int CKy, int UsrKy)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/ProjectCosting/GetDlyNo_PrjCosting?CKy=" + CKy + "&UsrKy=" + UsrKy + "")).Result;

            List<DlvryNoModel> curencyList = new List<DlvryNoModel>();
            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<DlvryNoModel>));
                List<DlvryNoModel> deserializeditems = new List<DlvryNoModel>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<DlvryNoModel>;
                curencyList = deserializeditems;
            }
            return curencyList;
        }

        internal List<CdMas> GetAllCodes_PrjCosting(string EnvironmentName, int CKy, int UsrKy, string ConCd)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/ProjectCosting/GetAllCodes_PrjCosting?CKy=" + CKy + "&UsrKy=" + UsrKy + "&ConCd=" + ConCd + "")).Result;

            List<CdMas> curencyList = new List<CdMas>();
            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<CdMas>));
                List<CdMas> deserializeditems = new List<CdMas>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<CdMas>;
                curencyList = deserializeditems;
            }
            return curencyList;
        }

    }
}