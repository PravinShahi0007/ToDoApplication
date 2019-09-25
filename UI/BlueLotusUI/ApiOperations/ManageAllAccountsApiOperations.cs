using BlueLotus.ManageAllAccounts.Model.Entity;
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
        string ManageAllAccountBaseUri = "api/ManageAllAccount/";

        public List<ManageAllAccountsModel> ManageAllAccountGrid(string EnvironmentName, int CKy, int UsrKy,string ObjKy, string PageNo, string PageSize, string AccCd,string ourCode, string AccNm)
        {
            string actionUri = "GridLoad";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("ObjKy", ObjKy);
            paramDictionary.Add("PageNo", PageNo);
            paramDictionary.Add("PageSize", PageSize);
            paramDictionary.Add("AccCd", AccCd);
            paramDictionary.Add("AccNm", AccNm); 
            paramDictionary.Add("ourcode", ourCode); 

            List<ManageAllAccountsModel> list = new List<ManageAllAccountsModel>();
            list = RunApiOperation(
                ManageAllAccountBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as List<ManageAllAccountsModel>;
            return list;
            //HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/ManageAllAccount/GridLoad?CKy=" + CKy + "&UsrKy=" + UsrKy + "&ObjKy=" + ObjKy + "&PageNo=" + PageNo + "&PageSize=" + PageSize)).Result;

            //List<ManageAllAccountsModel> GridLoad = new List<ManageAllAccountsModel>();
            //if (response.IsSuccessStatusCode)
            //{
            //    string jstr = response.Content.ReadAsStringAsync().Result;
            //    DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<ManageAllAccountsModel>));
            //    List<ManageAllAccountsModel> deserializeditems = new List<ManageAllAccountsModel>();
            //    MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
            //    DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
            //    deserializeditems = ser.ReadObject(ms) as List<ManageAllAccountsModel>;
            //    GridLoad = deserializeditems;
            //}
            //return GridLoad;
        }

        public List<ManageAllAccountsModel> AccTyps(string EnvironmentName, int CKy, int UsrKy)
        {
            string actionUri = "AccTyps";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("CKy", CKy);
            List<ManageAllAccountsModel> AccTyps = new List<ManageAllAccountsModel>();
            AccTyps = RunApiOperation(
                ManageAllAccountBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                AccTyps.GetType()) as List<ManageAllAccountsModel>;
            return AccTyps;
            //HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/ManageAllAccount/AccTyps?CKy=" + CKy + "&UsrKy=" + UsrKy + "")).Result;

            //List<ManageAllAccountsModel> AccTyps = new List<ManageAllAccountsModel>();
            //if (response.IsSuccessStatusCode)
            //{
            //    string jstr = response.Content.ReadAsStringAsync().Result;
            //    DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<ManageAllAccountsModel>));
            //    List<ManageAllAccountsModel> deserializeditems = new List<ManageAllAccountsModel>();
            //    MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
            //    DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
            //    deserializeditems = ser.ReadObject(ms) as List<ManageAllAccountsModel>;
            //    AccTyps = deserializeditems;
            //}
            //return AccTyps;
        }


        public List<ManageAllAccountsModel> CurrencyList(string EnvironmentName, int CKy, int UsrKy)
        {
            string actionUri = "CurrencyDrop";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("CKy", CKy);
            List<ManageAllAccountsModel> CurrencyDrop = new List<ManageAllAccountsModel>();
            CurrencyDrop = RunApiOperation(
                ManageAllAccountBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                CurrencyDrop.GetType()) as List<ManageAllAccountsModel>;
            return CurrencyDrop;
            //HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/ManageAllAccount/CurrencyDrop?CKy=" + CKy + "&UsrKy=" + UsrKy + "")).Result;

            //List<ManageAllAccountsModel> CurrencyDrop = new List<ManageAllAccountsModel>();
            //if (response.IsSuccessStatusCode)
            //{
            //    string jstr = response.Content.ReadAsStringAsync().Result;
            //    DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<ManageAllAccountsModel>));
            //    List<ManageAllAccountsModel> deserializeditems = new List<ManageAllAccountsModel>();
            //    MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
            //    DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
            //    deserializeditems = ser.ReadObject(ms) as List<ManageAllAccountsModel>;
            //    CurrencyDrop = deserializeditems;
            //}
            //return CurrencyDrop;
        }

        public List<ManageAllAccountsModel> BuList(string EnvironmentName, int CKy, int UsrKy)
        {
            string actionUri = "BuDrop";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("CKy", CKy);
            List<ManageAllAccountsModel> CurrencyDrop = new List<ManageAllAccountsModel>();
            CurrencyDrop = RunApiOperation(
                ManageAllAccountBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                CurrencyDrop.GetType()) as List<ManageAllAccountsModel>;
            return CurrencyDrop;

            //HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/ManageAllAccount/BuDrop?CKy=" + CKy + "&UsrKy=" + UsrKy + "")).Result;

            //List<ManageAllAccountsModel> BUDrop = new List<ManageAllAccountsModel>();
            //if (response.IsSuccessStatusCode)
            //{
            //    string jstr = response.Content.ReadAsStringAsync().Result;
            //    DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<ManageAllAccountsModel>));
            //    List<ManageAllAccountsModel> deserializeditems = new List<ManageAllAccountsModel>();
            //    MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
            //    DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
            //    deserializeditems = ser.ReadObject(ms) as List<ManageAllAccountsModel>;
            //    BUDrop = deserializeditems;
            //}
            //return BUDrop;
        }

        public List<ManageAllAccountsModel> ParentAccount(string EnvironmentName, int CKy, int UsrKy)
        {
            string actionUri = "PrntDrop";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("CKy", CKy);
            List<ManageAllAccountsModel> ParentAccList = new List<ManageAllAccountsModel>();
            ParentAccList = RunApiOperation(
                ManageAllAccountBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                ParentAccList.GetType()) as List<ManageAllAccountsModel>;
            return ParentAccList;
            //HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/ManageAllAccount/PrntDrop?CKy=" + CKy + "&UsrKy=" + UsrKy + "")).Result;

            //List<ManageAllAccountsModel> ParentAccList = new List<ManageAllAccountsModel>();
            //if (response.IsSuccessStatusCode)
            //{
            //    string jstr = response.Content.ReadAsStringAsync().Result;
            //    DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<ManageAllAccountsModel>));
            //    List<ManageAllAccountsModel> deserializeditems = new List<ManageAllAccountsModel>();
            //    MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
            //    DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
            //    deserializeditems = ser.ReadObject(ms) as List<ManageAllAccountsModel>;
            //    ParentAccList = deserializeditems;
            //}
            //return ParentAccList;
        }

        public List<ManageAllAccountsModel> AddressTyp(string EnvironmentName, int CKy, int UsrKy)
        {
            string actionUri = "MultiAddressTyp";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("CKy", CKy);
            List<ManageAllAccountsModel> AddressList = new List<ManageAllAccountsModel>();
            AddressList = RunApiOperation(
                ManageAllAccountBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                AddressList.GetType()) as List<ManageAllAccountsModel>;
            return AddressList;
            //HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/ManageAllAccount/MultiAddressTyp?CKy=" + CKy + "&UsrKy=" + UsrKy + "")).Result;

            //List<ManageAllAccountsModel> AddressList = new List<ManageAllAccountsModel>();
            //if (response.IsSuccessStatusCode)
            //{
            //    string jstr = response.Content.ReadAsStringAsync().Result;
            //    DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<ManageAllAccountsModel>));
            //    List<ManageAllAccountsModel> deserializeditems = new List<ManageAllAccountsModel>();
            //    MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
            //    DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
            //    deserializeditems = ser.ReadObject(ms) as List<ManageAllAccountsModel>;
            //    AddressList = deserializeditems;
            //}
            //return AddressList;
        }

        public List<ManageAllAccountsModel> AddressListPopUp(string EnvironmentName, int CKy, int UsrKy, string AccKy)
        {
            string actionUri = "AddressListGrid";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("AccKy", AccKy);
            List<ManageAllAccountsModel> AddressList = new List<ManageAllAccountsModel>();
            AddressList = RunApiOperation(
                ManageAllAccountBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                AddressList.GetType()) as List<ManageAllAccountsModel>;
            return AddressList;
            //HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/ManageAllAccount/AddressListGrid?CKy=" + CKy + "&UsrKy=" + UsrKy + "&AccKy=" + AccKy + "")).Result;

            //List<ManageAllAccountsModel> AddressListGrid = new List<ManageAllAccountsModel>();
            //if (response.IsSuccessStatusCode)
            //{
            //    string jstr = response.Content.ReadAsStringAsync().Result;
            //    DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<ManageAllAccountsModel>));
            //    List<ManageAllAccountsModel> deserializeditems = new List<ManageAllAccountsModel>();
            //    MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
            //    DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
            //    deserializeditems = ser.ReadObject(ms) as List<ManageAllAccountsModel>;
            //    AddressListGrid = deserializeditems;
            //}
            //return AddressListGrid;
        }

        public bool AddressUpdate(string EnvironmentName, int CKy, int UsrKy, string updateAdressmass, string AccKy)
        {
            string actionUri = "AddressUpdate";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();
            //HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/ToDoProject/InsertandUpdateProjects?UsrKy=" + UsrKy + "&CKy=" + CKy + "&PrjTyp=" + PrjTyp + "&updateAccmacc=" + updateAccmacc + "&newAccmacc=" + newAccmacc + "")).Result;
           // AddressUpdate? CKy = " + CKy + " & UsrKy = " + UsrKy + " & updateAdressmass = " + updateAdressmass + " & AccKy = " + AccKy + ""
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("updateAdressmass", updateAdressmass);
            paramDictionary.Add("AccKy", AccKy);
            bool Sucess = new bool();
            object obj = RunApiOperation(
                ManageAllAccountBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                Sucess.GetType());

            Sucess = Convert.ToBoolean(obj);

            return Sucess;
            //HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/ManageAllAccount/AddressUpdate?CKy=" + CKy + "&UsrKy=" + UsrKy + "&updateAdressmass=" + updateAdressmass + "&AccKy=" + AccKy + "")).Result;

            //bool Sucess = false;
            //if (response.IsSuccessStatusCode)
            //{
            //    string SucessStrng = response.Content.ReadAsStringAsync().Result;
            //    Sucess = Convert.ToBoolean(SucessStrng);
            //}
            //return Sucess;
        }

        public List<ManageAllAccountsModel> CreditsPop(string EnvironmentName, int CKy, int UsrKy, string AccKy)
        {
            string actionUri = "CreditsPopGrid";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("AccKy", AccKy);
           

            List<ManageAllAccountsModel> CreditsPopsListGrid = new List<ManageAllAccountsModel>();
            CreditsPopsListGrid = RunApiOperation(
                ManageAllAccountBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                CreditsPopsListGrid.GetType()) as List<ManageAllAccountsModel>;
            return CreditsPopsListGrid;
            //HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/ManageAllAccount/CreditsPopGrid?CKy=" + CKy + "&UsrKy=" + UsrKy + "&AccKy=" + AccKy + "")).Result;

            //List<ManageAllAccountsModel> CreditsPopsListGrid = new List<ManageAllAccountsModel>();
            //if (response.IsSuccessStatusCode)
            //{
            //    string jstr = response.Content.ReadAsStringAsync().Result;
            //    DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<ManageAllAccountsModel>));
            //    List<ManageAllAccountsModel> deserializeditems = new List<ManageAllAccountsModel>();
            //    MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
            //    DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
            //    deserializeditems = ser.ReadObject(ms) as List<ManageAllAccountsModel>;
            //    CreditsPopsListGrid = deserializeditems;
            //}
            //return CreditsPopsListGrid;
        }

        public bool CreditUpdate(string EnvironmentName, int CKy, int UsrKy, string updateAdressmass, string newCredit, string AccKy, string PrjKy, string BUKy)
        {
            string actionUri = "CreditUpdate";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("updateAdressmass", updateAdressmass);
            paramDictionary.Add("newCredit", newCredit); 
            paramDictionary.Add("AccKy", AccKy);
            paramDictionary.Add("PrjKy", PrjKy);
            paramDictionary.Add("BUKy", BUKy);
            bool Sucess = new bool();
            object obj = RunApiOperation(
                ManageAllAccountBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                Sucess.GetType());

            Sucess = Convert.ToBoolean(obj);

            return Sucess;
            //HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/ManageAllAccount/CreditUpdate?CKy=" + CKy + "&UsrKy=" + UsrKy + "&updateAdressmass=" + updateAdressmass + "&newCredit=" + newCredit + "&AccKy=" + AccKy + "")).Result;

            //bool Sucess = false;
            //if (response.IsSuccessStatusCode)
            //{
            //    string SucessStrng = response.Content.ReadAsStringAsync().Result;
            //    Sucess = Convert.ToBoolean(SucessStrng);
            //}
            //return Sucess;
        }

        public bool DeleteFromAllAcc(string EnvironmentName, int CKy, int UsrKy, string AccKy)
        {
            string actionUri = "DeleteFromAllAcc";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("AccKy", AccKy);
            bool Sucess = new bool();
            object obj = RunApiOperation(
                ManageAllAccountBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                Sucess.GetType());
            Sucess = Convert.ToBoolean(obj);
            return Sucess;
            //HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/ManageAllAccount/DeleteFromAllAcc?CKy=" + CKy + "&UsrKy=" + UsrKy + "&AccKy=" + AccKy + "")).Result;

            //bool Sucess = false;
            //if (response.IsSuccessStatusCode)
            //{
            //    string SucessStrng = response.Content.ReadAsStringAsync().Result;
            //    Sucess = Convert.ToBoolean(SucessStrng);
            //}
            //return Sucess;
        }

        //public bool AccMassInsertUpdate(string EnvironmentName, int CKy, int UsrKy, string newAccmacc, string updateAccmacc)
        //{
        //    string actionUri = "InsertUpdateAccMass";
        //    Dictionary<string, object> paramDictionary = new Dictionary<string, object>();
        //    paramDictionary.Add("UsrKy", UsrKy);
        //    paramDictionary.Add("CKy", CKy);
        //    paramDictionary.Add("newRows", newAccmacc);
        //    paramDictionary.Add("updateRows", updateAccmacc);
        //    bool Sucess = new bool();
        //    object obj = RunApiOperation(
        //        ManageAllAccountBaseUri,
        //        actionUri,
        //        EnvironmentName,
        //        paramDictionary,
        //        Sucess.GetType());
        //    Sucess = Convert.ToBoolean(obj);
        //    return Sucess;
        //    //HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/ManageAllAccount/InsertUpdateAccMass?CKy=" + CKy + "&UsrKy=" + UsrKy + "&newRows=" + newAccmacc + "&updateRows=" + updateAccmacc + "")).Result;

        //    //bool Sucess = false;
        //    //if (response.IsSuccessStatusCode)
        //    //{
        //    //    string SucessStrng = response.Content.ReadAsStringAsync().Result;
        //    //    Sucess = Convert.ToBoolean(SucessStrng);
        //    //}
        //    //return Sucess;
        //}
        public bool AccMassInsertUpdate(string EnvironmentName, int CKy, int UsrKy, string newAccmacc, string updateAccmacc)
        {
            bool SavedStatus = false;

            if (newAccmacc != "[]" && newAccmacc != "[null]" && newAccmacc != "")
            {
                try
                {
                    ManageAllAccountsModel[] NewRecords = new JavaScriptSerializer().Deserialize<ManageAllAccountsModel[]>(newAccmacc);
                    for (int i = 0; i < NewRecords.Length; i++)
                    {
                        string actionUri = "InsertUpdateAccMass";
                        Dictionary<string, object> paramDictionary = new Dictionary<string, object>();
                        string NewModelString = new JavaScriptSerializer().Serialize(NewRecords[i]);

                        paramDictionary.Add("UsrKy", UsrKy);
                        paramDictionary.Add("CKy", CKy);
                        paramDictionary.Add("newRows", NewModelString);
                        paramDictionary.Add("updateRows", "[]");
                        bool Sucess = new bool();
                        object obj = RunApiOperation(
                            ManageAllAccountBaseUri,
                            actionUri,
                            EnvironmentName,
                            paramDictionary,
                            Sucess.GetType());
                        SavedStatus = Convert.ToBoolean(obj);
                        if (!SavedStatus) return false;

                    }
                }
                catch (Exception ex)
                {
                    return false;
                }


            }
            if (updateAccmacc != "[]" && updateAccmacc != "[null]" && updateAccmacc != "")
            {
                try
                {
                    ManageAllAccountsModel[] UpdateRecords = new JavaScriptSerializer().Deserialize<ManageAllAccountsModel[]>(updateAccmacc);
                    for (int i = 0; i < UpdateRecords.Length; i++)
                    {
                        string actionUri = "InsertUpdateAccMass";
                        Dictionary<string, object> paramDictionary = new Dictionary<string, object>();
                        string UpdateRec = new JavaScriptSerializer().Serialize(UpdateRecords[i]);

                        paramDictionary.Add("UsrKy", UsrKy);
                        paramDictionary.Add("CKy", CKy);
                        paramDictionary.Add("newRows", "[]");
                        paramDictionary.Add("updateRows", UpdateRec);
                        bool Sucess = new bool();
                        object obj = RunApiOperation(
                            ManageAllAccountBaseUri,
                            actionUri,
                            EnvironmentName,
                            paramDictionary,
                            Sucess.GetType());
                        SavedStatus = Convert.ToBoolean(obj);
                        if (!SavedStatus) return false;

                    }
                }
                catch (Exception ex)
                {
                    return false;
                }


            }


            //string actionUri = "InsertUpdateAccMass";
            //Dictionary<string, object> paramDictionary = new Dictionary<string, object>();
            //paramDictionary.Add("UsrKy", UsrKy);
            //paramDictionary.Add("CKy", CKy);
            //paramDictionary.Add("newRows", newAccmacc);
            //paramDictionary.Add("updateRows", updateAccmacc);
            //bool Sucess = new bool();
            //object obj = RunApiOperation(
            //    ManageAllAccountBaseUri,
            //    actionUri,
            //    EnvironmentName,
            //    paramDictionary,
            //    Sucess.GetType());
            //Sucess = Convert.ToBoolean(obj);
            //return Sucess;


            //HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/ManageAllAccount/InsertUpdateAccMass?CKy=" + CKy + "&UsrKy=" + UsrKy + "&newRows=" + newAccmacc + "&updateRows=" + updateAccmacc + "")).Result;

            //bool Sucess = false;
            //if (response.IsSuccessStatusCode)
            //{
            //    string SucessStrng = response.Content.ReadAsStringAsync().Result;
            //    Sucess = Convert.ToBoolean(SucessStrng);
            //}
            return SavedStatus;
        }

        public List<ManageAllAccountsModel> GetHomeCuencyDetails(string EnvironmentName, int CKy, int UsrKy)
        {
            string actionUri = "GetHOmeCurrencyDtl";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("CKy", CKy);
          
            List<ManageAllAccountsModel> CreditsPopsListGrid = new List<ManageAllAccountsModel>();
            CreditsPopsListGrid = RunApiOperation(
                ManageAllAccountBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                CreditsPopsListGrid.GetType()) as List<ManageAllAccountsModel>;
            return CreditsPopsListGrid;
            //HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/ManageAllAccount/GetHOmeCurrencyDtl?CKy=" + CKy + "&UsrKy=" + UsrKy + "")).Result;

            //List<ManageAllAccountsModel> CurrencyDrop = new List<ManageAllAccountsModel>();
            //if (response.IsSuccessStatusCode)
            //{
            //    string jstr = response.Content.ReadAsStringAsync().Result;
            //    DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<ManageAllAccountsModel>));
            //    List<ManageAllAccountsModel> deserializeditems = new List<ManageAllAccountsModel>();
            //    MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
            //    DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
            //    deserializeditems = ser.ReadObject(ms) as List<ManageAllAccountsModel>;
            //    CurrencyDrop = deserializeditems;
            //}
            //return CurrencyDrop;
        }


        public bool BankDetailsInsertToChrtOfAcc(string environment, int cKy, int usrKy, string updateAccmaccBankDetais, string newAccmaccBankDetais, string accountCode, string accountName,string AccountKey)
        {
            string actionUri = "BankDetailsInsertToChrtOfAcc";
            //   ? CKy = " + cKy + " & UsrKy = " + usrKy + " & updateAccmaccBankDetais = " + updateAccmaccBankDetais + " & newAccmaccBankDetais = " + newAccmaccBankDetais + " & accountCode = " + accountCode + " & accountName = " + accountName + " & AccountKey = " + AccountKey)).Result;
            //accountCode = " + accountCode + " & accountName = " + accountName + " & AccountKey = " + AccountKey)).Result;
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();
            paramDictionary.Add("UsrKy", usrKy);
            paramDictionary.Add("CKy", cKy);
            paramDictionary.Add("updateAccmaccBankDetais", updateAccmaccBankDetais);
            paramDictionary.Add("newAccmaccBankDetais", newAccmaccBankDetais);
            paramDictionary.Add("accountCode", accountCode);
            paramDictionary.Add("accountName", accountName);
            paramDictionary.Add("AccountKey", AccountKey);

            bool Sucess = new bool();
            object obj = RunApiOperation(
                ManageAllAccountBaseUri,
                actionUri,
                environment,
                paramDictionary,
                Sucess.GetType());
            Sucess = Convert.ToBoolean(obj);
            return Sucess;
            //HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(environment, "api/ManageAllAccount/BankDetailsInsertToChrtOfAcc?CKy=" + cKy + "&UsrKy=" + usrKy + "&updateAccmaccBankDetais=" + updateAccmaccBankDetais + "&newAccmaccBankDetais=" + newAccmaccBankDetais + "&accountCode=" + accountCode + "&accountName=" + accountName + "&AccountKey=" + AccountKey)).Result;

            //bool Sucess = false;
            //if (response.IsSuccessStatusCode)
            //{
            //    string SucessStrng = response.Content.ReadAsStringAsync().Result;
            //    Sucess = Convert.ToBoolean(SucessStrng);
            //}
            //return Sucess;
        }

        public List<ManageAllAccountsBankDetailsModel> GetBankDetailstoAccMas(string environment, int cKy, int usrKy, string accKy)
        {
            ///GetBankDetailstoAccMas?CKy=" + cKy + "&UsrKy=" + usrKy + "&accKy=" + accKy)).Result;
            string actionUri = "GetBankDetailstoAccMas";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();
            paramDictionary.Add("UsrKy", usrKy);
            paramDictionary.Add("CKy", cKy);
            paramDictionary.Add("accKy", accKy);
            //
            List<ManageAllAccountsBankDetailsModel> CreditsPopsListGrid = new List<ManageAllAccountsBankDetailsModel>();
            CreditsPopsListGrid = RunApiOperation(
                ManageAllAccountBaseUri,
                actionUri,
                environment,
                paramDictionary,
                CreditsPopsListGrid.GetType()) as List<ManageAllAccountsBankDetailsModel>;
            return CreditsPopsListGrid;
            //HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(environment, "api/ManageAllAccount/GetBankDetailstoAccMas?CKy=" + cKy + "&UsrKy=" + usrKy + "&accKy=" + accKy)).Result;

            //List<ManageAllAccountsBankDetailsModel> CurrencyDrop = new List<ManageAllAccountsBankDetailsModel>();
            //if (response.IsSuccessStatusCode)
            //{
            //    string jstr = response.Content.ReadAsStringAsync().Result;
            //    DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<ManageAllAccountsBankDetailsModel>));
            //    List<ManageAllAccountsBankDetailsModel> deserializeditems = new List<ManageAllAccountsBankDetailsModel>();
            //    MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
            //    DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
            //    deserializeditems = ser.ReadObject(ms) as List<ManageAllAccountsBankDetailsModel>;
            //    CurrencyDrop = deserializeditems;
            //}
            //return CurrencyDrop;
        }
    }
}