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
using BlueLotus.UI.ApiOperations;
using BlueLotus.ObjMas.Model;
using BlueLotus.ComboLoad.Model;

namespace BlueLotus.UI.ApiOperations
{
    public partial class ApiOperation
    {
        string JournalBaseUri = "api/Journal/";

        public List<Currency> CurencyDrop(string EnvironmentName, int CKy, int UsrKy, string ObjKy)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/Journal/GetCurencyDrop?CKy=" + CKy + "&UsrKy=" + UsrKy + "&ObjKy=" + ObjKy)).Result;

            List<Currency> curencyList = new List<Currency>();
            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<Currency>));
                List<Currency> deserializeditems = new List<Currency>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<Currency>;
                curencyList = deserializeditems;
            }
            return curencyList;
        }

        public List<AnalysisModel> AnalysisNm(string EnvironmentName, int CKy, int UsrKy, string AnlTyp, string ObjKy)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/Journal/GetAnalysisNm?CKy=" + CKy + "&UsrKy=" + UsrKy + "&AnlTyp=" + AnlTyp + "&ObjKy=" + ObjKy)).Result;

            List<AnalysisModel> Analysis2 = new List<AnalysisModel>();
            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<AnalysisModel>));
                List<AnalysisModel> deserializeditems = new List<AnalysisModel>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<AnalysisModel>;
                Analysis2 = deserializeditems;
            }
            return Analysis2;
        }

        public List<AnalysisModel> AnalysisCd(string EnvironmentName, int CKy, int UsrKy, string AnlTyp, string ObjKy)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/Journal/GetAnalysisCd?CKy=" + CKy + "&UsrKy=" + UsrKy + "&AnlTyp=" + AnlTyp + "&ObjKy=" + ObjKy)).Result;

            List<AnalysisModel> analysis2Cd = new List<AnalysisModel>();
            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<AnalysisModel>));
                List<AnalysisModel> deserializeditems = new List<AnalysisModel>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<AnalysisModel>;
                analysis2Cd = deserializeditems;
            }
            return analysis2Cd;
        }


        public List<AccountModel> AccDrop(string EnvironmentName, int CKy, int UsrKy, string ObjKy)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/Journal/GetAccDrop?CKy=" + CKy + "&UsrKy=" + UsrKy + "&ObjKy=" + ObjKy)).Result;

            List<AccountModel> AccDropCode = new List<AccountModel>();
            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<AccountModel>));
                List<AccountModel> deserializeditems = new List<AccountModel>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<AccountModel>;
                AccDropCode = deserializeditems;
            }
            return AccDropCode;
        }

        public List<AccountModel> AccDropNm(string EnvironmentName, int CKy, int UsrKy, string ObjKy)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/Journal/GetAccDropNm?CKy=" + CKy + "&UsrKy=" + UsrKy + "&ObjKy=" + ObjKy)).Result;

            List<AccountModel> AccDropNm = new List<AccountModel>();
            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<AccountModel>));
                List<AccountModel> deserializeditems = new List<AccountModel>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<AccountModel>;
                AccDropNm = deserializeditems;
            }
            return AccDropNm;
        }



        public List<ProjectModel> ProjectCode(string EnvironmentName, int CKy, int UsrKy, string ObjKy)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/Journal/GetProjectCode?CKy=" + CKy + "&UsrKy=" + UsrKy + "&ObjKy=" + ObjKy)).Result;

            List<ProjectModel> ProjectCode = new List<ProjectModel>();
            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<ProjectModel>));
                List<ProjectModel> deserializeditems = new List<ProjectModel>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<ProjectModel>;
                ProjectCode = deserializeditems;
            }
            return ProjectCode;
        }


        public List<ProjectModel> ProjectName(string EnvironmentName, int CKy, int UsrKy, string ObjKy)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/Journal/GetProjectName?CKy=" + CKy + "&UsrKy=" + UsrKy + "&ObjKy=" + ObjKy)).Result;

            List<ProjectModel> ProjectName = new List<ProjectModel>();
            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<ProjectModel>));
                List<ProjectModel> deserializeditems = new List<ProjectModel>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<ProjectModel>;
                ProjectName = deserializeditems;
            }
            return ProjectName;
        }


        public List<BUModel> BUNMLookup(string EnvironmentName, int CKy, int UsrKy, string ObjKy, string PreKy)
        {
            string actionUri = "GetBUNM";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();
            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("ObjKy", ObjKy);
            paramDictionary.Add("PreKy", PreKy);

            List<BUModel> list = new List<BUModel>();
            list = RunApiOperation(
                JournalBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as List<BUModel>;
            return list;
            //HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/Journal/GetBUNM?CKy=" + CKy + "&UsrKy=" + UsrKy + "&ObjKy=" + ObjKy)).Result;

            //List<BUModel> BUNMLookup = new List<BUModel>();
            //if (response.IsSuccessStatusCode)
            //{
            //    string jstr = response.Content.ReadAsStringAsync().Result;
            //    DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<BUModel>));
            //    List<BUModel> deserializeditems = new List<BUModel>();
            //    MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
            //    DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
            //    deserializeditems = ser.ReadObject(ms) as List<BUModel>;
            //    BUNMLookup = deserializeditems;
            //}
            //return BUNMLookup;
        }

        public List<BUModel> BUCodeLookup(string EnvironmentName, int CKy, int UsrKy, string ObjKy, string PreKy)
        {
            string actionUri = "GetBUCode";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();
            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("ObjKy", ObjKy);
            paramDictionary.Add("PreKy", PreKy);

            List<BUModel> list = new List<BUModel>();
            list = RunApiOperation(
                JournalBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as List<BUModel>;
            return list;
            //HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/Journal/GetBUCode?CKy=" + CKy + "&UsrKy=" + UsrKy + "&ObjKy=" + ObjKy)).Result;

            //List<BUModel> BUCodeLookup = new List<BUModel>();
            //if (response.IsSuccessStatusCode)
            //{
            //    string jstr = response.Content.ReadAsStringAsync().Result;
            //    DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<BUModel>));
            //    List<BUModel> deserializeditems = new List<BUModel>();
            //    MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
            //    DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
            //    deserializeditems = ser.ReadObject(ms) as List<BUModel>;
            //    BUCodeLookup = deserializeditems;
            //}
            //return BUCodeLookup;
        }

        public List<AddressModel> AccAdrId(string EnvironmentName, int CKy, int UsrKy, string ObjKy, string PreKy)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/Journal/GetAccAdrId?CKy=" + CKy + "&UsrKy=" + UsrKy + "&ObjKy=" + ObjKy + "&PreKy=" + PreKy)).Result;

            List<AddressModel> AccAdrIdDrop = new List<AddressModel>();
            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<AddressModel>));
                List<AddressModel> deserializeditems = new List<AddressModel>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<AddressModel>;
                AccAdrIdDrop = deserializeditems;
            }
            return AccAdrIdDrop;
        }

        public List<AddressModel> AccAdrName(string EnvironmentName, int CKy, int UsrKy, string ObjKy, string PreKy)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/Journal/GetAccAdrName?CKy=" + CKy + "&UsrKy=" + UsrKy + "&ObjKy=" + ObjKy + "&PreKy=" + PreKy)).Result;

            List<AddressModel> AccAdrNameDrop = new List<AddressModel>();
            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<AddressModel>));
                List<AddressModel> deserializeditems = new List<AddressModel>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<AddressModel>;
                AccAdrNameDrop = deserializeditems;
            }
            return AccAdrNameDrop;
        }

        public List<PrsDetModel> TaskCodeLookUp(string EnvironmentName, string Prjky, int CKy, int UsrKy, string ObjKy)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/Journal/GetTaskCodeLookUp?CKy=" + CKy + "&UsrKy=" + UsrKy + "&PrjKy=" + Prjky + "&ObjKy=" + ObjKy)).Result;

            List<PrsDetModel> TaskCodeLookUp = new List<PrsDetModel>();
            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<PrsDetModel>));
                List<PrsDetModel> deserializeditems = new List<PrsDetModel>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<PrsDetModel>;
                TaskCodeLookUp = deserializeditems;
            }
            return TaskCodeLookUp;
        }

        public List<PrsDetModel> TaskNameLookUp(string EnvironmentName, string Prjky, int CKy, int UsrKy, string ObjKy)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/Journal/GetTaskNameLookUp?CKy=" + CKy + "&UsrKy=" + UsrKy + "&PrjKy=" + Prjky + "&ObjKy=" + ObjKy)).Result;

            List<PrsDetModel> TaskNameLookUp = new List<PrsDetModel>();
            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<PrsDetModel>));
                List<PrsDetModel> deserializeditems = new List<PrsDetModel>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<PrsDetModel>;
                TaskNameLookUp = deserializeditems;
            }
            return TaskNameLookUp;
        }

        //GetAllDetail


        public List<AccDetailModel> GetAllJournalDetail(string EnvironmentName, string AccKy, string datepicker, int UsrKy)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/Journal/GetAllDetailByAccKy?AccKy=" + AccKy + "&datepicker=" + datepicker + "&UsrKy=" + UsrKy + "")).Result;

            List<AccDetailModel> AllDetail = new List<AccDetailModel>();
            if (response.IsSuccessStatusCode)
            {

                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<AccDetailModel>));
                List<AccDetailModel> deserializeditems = new List<AccDetailModel>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<AccDetailModel>;
                AllDetail = deserializeditems;
            }
            return AllDetail;
        }

        public List<AccDetailModel> GetAllpayeeNameDetail(string EnvironmentName, string AdrKy, string datepicker, int UsrKy)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/Journal/GetPayeeNameByAdrKy?AdrKy=" + AdrKy + "&datepicker=" + datepicker + "&UsrKy=" + UsrKy + "")).Result;

            List<AccDetailModel> AllDetail = new List<AccDetailModel>();
            if (response.IsSuccessStatusCode)
            {

                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<AccDetailModel>));
                List<AccDetailModel> deserializeditems = new List<AccDetailModel>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<AccDetailModel>;
                AllDetail = deserializeditems;
            }
            return AllDetail;
        }
        public long InsertHdr(string EnvironmentName, int isRecur, string VouDate, string DocNo, string UrRef, string cmbCrnKy, string Yourref_Date, string ExRateHrd, string PrjKy, string BUKy, string OurCd, int CKy, int UsrKy, string ConCord, string ObjKy)
        {
            string actionUri = "InsertHdr";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();
            paramDictionary.Add("isRecur", isRecur);
            paramDictionary.Add("VouDate", VouDate);
            paramDictionary.Add("DocNo", DocNo);
            paramDictionary.Add("UrRef", UrRef);
            paramDictionary.Add("cmbCrnKy", cmbCrnKy);
            paramDictionary.Add("Yourref_Date", Yourref_Date);
            paramDictionary.Add("ExRateHrd", ExRateHrd);
            paramDictionary.Add("PrjKy", PrjKy);
            paramDictionary.Add("BUKy", BUKy);
            paramDictionary.Add("OurCd", OurCd);
            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("ConCord", ConCord);
            paramDictionary.Add("ObjKy", ObjKy);

            
            long TrnKy = new long();
            object obj = RunApiOperation(
                JournalBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                TrnKy.GetType());

            TrnKy = Convert.ToInt32(obj);

            return TrnKy;

            //HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/Journal/InsertHdr?VouDate=" + VouDate + "&DocNo=" + DocNo + "&UrRef=" + UrRef + "&cmbCrnKy=" + cmbCrnKy + "&Yourref_Date=" + Yourref_Date + "&ExRateHrd=" + ExRateHrd + "&PrjKy=" + PrjKy + "&BUKy=" + BUKy + "&OurCd=" + OurCd + "&CKy=" + CKy + "&UsrKy=" + UsrKy + "&ConCord=" + ConCord + "")).Result;
            //long TrnKy=0;

            //if (response.IsSuccessStatusCode)
            //{
            //    string TrnKyString = response.Content.ReadAsStringAsync().Result;
            //    TrnKy = Convert.ToInt64(TrnKyString);

            //}
            //return TrnKy;
        }

        public bool InsertJournalDetail(string EnvironmentName, string trnKy, string VouDate, string NewGridDetail, string UpdatedGridDetail, int Cky, int UsrKy, string OurCd, string ConCord,string isRec)
        {
            int InsertFinished = 0;
            int UpdateFinished = 0;
            int NewRecordLength = 0;
            int UpdateRecordLength = 0;
            long ContraAccKey = 1;

            try
            {
                if (NewGridDetail != "[]" && NewGridDetail != "[null]" && NewGridDetail != "")
                {
                    JournalSave[] NewJournalEntry = new JavaScriptSerializer().Deserialize<JournalSave[]>(NewGridDetail);
                    NewRecordLength = NewJournalEntry.Length;

                    for (int i = 0; i < NewJournalEntry.Length; i++)
                    {
                        string actionUri = "InsertDetails";
                        Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

                        string NewJournalmodelString = new JavaScriptSerializer().Serialize(NewJournalEntry[i]);

                        paramDictionary.Add("trnKy", trnKy);
                        paramDictionary.Add("VouDate", VouDate);
                        paramDictionary.Add("NewGridDetail", NewJournalmodelString);
                        // paramDictionary.Add("UpdatedGridDetail", UpdatedGridDetail);
                        paramDictionary.Add("Cky", Cky);
                        paramDictionary.Add("UsrKy", UsrKy);
                        paramDictionary.Add("OurCd", OurCd);
                        paramDictionary.Add("ConCord", ConCord);
                        paramDictionary.Add("ContraAccKey", ContraAccKey);
                        paramDictionary.Add("ArrayLength", NewRecordLength);
                        paramDictionary.Add("CurrnetRecordAt", i);
                        paramDictionary.Add("isRec", isRec);

                        
                        long Sucess = new long();
                        object obj = RunApiOperation(
                            JournalBaseUri,
                            actionUri,
                            EnvironmentName,
                            paramDictionary,
                            Sucess.GetType());
                        Sucess = Convert.ToInt64(obj);
                        ContraAccKey = Sucess;
                        // return Sucess;
                        InsertFinished++;
                    }
                }
                if (UpdatedGridDetail != "[]" && UpdatedGridDetail != "[null]" && UpdatedGridDetail != "")
                {
                    JournalSave[] UpdateJournalEntry = new JavaScriptSerializer().Deserialize<JournalSave[]>(UpdatedGridDetail);
                    UpdateRecordLength = UpdateJournalEntry.Length;

                    for (int i = 0; i < UpdateJournalEntry.Length; i++)
                    {
                        string actionUri = "UpdateDetails";
                        Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

                        string UpdateJournalmodelString = new JavaScriptSerializer().Serialize(UpdateJournalEntry[i]);

                        paramDictionary.Add("trnKy", trnKy);
                        paramDictionary.Add("VouDate", VouDate);
                        paramDictionary.Add("UpdatedGridDetail", UpdateJournalmodelString);
                        // paramDictionary.Add("UpdatedGridDetail", UpdatedGridDetail);
                        paramDictionary.Add("Cky", Cky);
                        paramDictionary.Add("UsrKy", UsrKy);
                        paramDictionary.Add("OurCd", OurCd);
                        paramDictionary.Add("ConCord", ConCord);
                        paramDictionary.Add("ArrayLength", UpdateRecordLength);
                        paramDictionary.Add("CurrnetRecordAt", i);
                        paramDictionary.Add("isRec", isRec);

                        long Sucess = new long();
                        object obj = RunApiOperation(
                            JournalBaseUri,
                            actionUri,
                            EnvironmentName,
                            paramDictionary,
                            Sucess.GetType());
                        Sucess = Convert.ToInt64(obj);
                        // return Sucess;
                        UpdateFinished++;
                    }
                }

            }
            catch (Exception ex)
            {
                throw;
            }


            //string actionUri = "InsertDetails";
            //Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            //paramDictionary.Add("trnKy", trnKy);
            //paramDictionary.Add("VouDate", VouDate);
            //paramDictionary.Add("NewGridDetail", NewGridDetail);
            //paramDictionary.Add("UpdatedGridDetail", UpdatedGridDetail);
            //paramDictionary.Add("Cky", Cky);
            //paramDictionary.Add("UsrKy", UsrKy);
            //paramDictionary.Add("OurCd", OurCd);
            //paramDictionary.Add("ConCord", ConCord);
            //bool Sucess = new bool();
            //object obj = RunApiOperation(
            //    JournalBaseUri,
            //    actionUri,
            //    EnvironmentName,
            //    paramDictionary,
            //    Sucess.GetType());
            //Sucess = Convert.ToBoolean(obj);
            //return Sucess;

            //HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/Journal/InsertDetails?trnKy=" + trnKy + "&VouDate=" + VouDate + "&NewGridDetail=" + NewGridDetail + "&UpdatedGridDetail=" + UpdatedGridDetail + "&Cky=" + Cky + "&UsrKy=" + UsrKy + "&OurCd=" + OurCd + "&ConCord=" + ConCord + "")).Result;
            //bool Sucess = false;

            //if (response.IsSuccessStatusCode)
            //{
            //    string SucessStrng = response.Content.ReadAsStringAsync().Result;
            //    Sucess = Convert.ToBoolean(SucessStrng);

            //}
            //return Sucess;
            if (InsertFinished == NewRecordLength && UpdateFinished == UpdateRecordLength)
            {
                return true;

            }
            else
            {
                return false;

            }
        }

        public List<JournalFindModel> LoadGridFindView(string EnvironmentName, string FrmDt, string ToDt, string TrnNo, string AccKy, string PrjKy, string IsRec, string DocNo, string IsPrnt, string OurCode, int Prefix, int CKy, int UsrKy, string Adrky, string UrRef, string ApprKy, string BU)
        {


            string actionUri = "LoadGridFindView";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();
         
            paramDictionary.Add("FrmDt", FrmDt);
            paramDictionary.Add("ToDt", ToDt);
            paramDictionary.Add("TrnNo", TrnNo);
            paramDictionary.Add("AccKy", AccKy);
            paramDictionary.Add("PrjKy", PrjKy);
            paramDictionary.Add("IsRec", IsRec);
            paramDictionary.Add("DocNo", DocNo);
            paramDictionary.Add("IsPrnt", IsPrnt);
            paramDictionary.Add("OurCode", OurCode);
            paramDictionary.Add("Prefix", Prefix);
            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("AdrKy", Adrky);
            paramDictionary.Add("UrRef", UrRef);
            paramDictionary.Add("ApprKy", ApprKy);
            paramDictionary.Add("BU", BU);
            List<JournalFindModel> list = new List<JournalFindModel>();
            list = RunApiOperation(
                JournalBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as List<JournalFindModel>;
            return list;
            //HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/Journal/LoadGridFindView?FrmDt=" + FrmDt + "&ToDt=" + ToDt + "&TrnNo=" + TrnNo + "&AccKy=" + AccKy + "&PrjKy=" + PrjKy + "&IsRec=" + IsRec + "&DocNo=" + DocNo + "&IsPrnt=" + IsPrnt + "&OurCode=" + OurCode + "&Prefix=" + Prefix + "&CKy=" + CKy + "&UsrKy=" + UsrKy + "")).Result;

            //List<JournalFindModel> AllDetail = new List<JournalFindModel>();
            //if (response.IsSuccessStatusCode)
            //{

            //    string jstr = response.Content.ReadAsStringAsync().Result;
            //    DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<JournalFindModel>));
            //    List<JournalFindModel> deserializeditems = new List<JournalFindModel>();
            //    MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
            //    DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
            //    deserializeditems = ser.ReadObject(ms) as List<JournalFindModel>;
            //    AllDetail = deserializeditems;
            //}
            //return AllDetail;
        }


        public List<JournalDetailModel> GetHdrDetail(string EnvironmentName, string TrnKy, int CKy, int UsrKy)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/Journal/JournalHdrDetails?TrnKy=" + TrnKy + "&CKy=" + CKy + "&UsrKy=" + UsrKy + "")).Result;

            List<JournalDetailModel> AllDetail = new List<JournalDetailModel>();
            if (response.IsSuccessStatusCode)
            {

                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<JournalDetailModel>));
                List<JournalDetailModel> deserializeditems = new List<JournalDetailModel>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<JournalDetailModel>;
                AllDetail = deserializeditems;
            }
            return AllDetail;
        }

        public List<JournalDetailModel> GetGridDetail(string EnvironmentName, string TrnKy, int CKy, int UsrKy)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/Journal/JournalGridDetails?TrnKy=" + TrnKy + "&CKy=" + CKy + "&UsrKy=" + UsrKy + "")).Result;

            List<JournalDetailModel> AllDetail = new List<JournalDetailModel>();
            if (response.IsSuccessStatusCode)
            {

                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<JournalDetailModel>));
                List<JournalDetailModel> deserializeditems = new List<JournalDetailModel>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<JournalDetailModel>;
                AllDetail = deserializeditems;
            }
            return AllDetail;
        }

        public long GetHomeCurency(string EnvironmentName, int Cky, int UsrKy)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/Journal/GetHomeCurency?Cky=" + Cky + "&UsrKy=" + UsrKy + "")).Result;
            long CrnKy = 1;

            if (response.IsSuccessStatusCode)
            {
                string CrnKyString = response.Content.ReadAsStringAsync().Result;
                CrnKy = Convert.ToInt64(CrnKyString);

            }
            return CrnKy;
        }


        public double GetHomeCurencyEx(string EnvironmentName, string CurKy, string datepicker, int UsrKy)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/Journal/GetHomeCurencyEx?CurKy=" + CurKy + "&datepicker=" + datepicker + "&UsrKy=" + UsrKy + "")).Result;
            double ExRate = 1.00;

            if (response.IsSuccessStatusCode)
            {
                string ExRateString = response.Content.ReadAsStringAsync().Result;
                ExRate = Convert.ToDouble(ExRateString);


            }
            return ExRate;
        }

        public long JrnlUpdateHdr(string EnvironmentName, string TrnKy, int isRecur, string VouDate, string DocNo, string UrRef, string cmbCrnKy, string Yourref_Date, string ExRateHrd, string PrjKy, string BUKy, string OurCd, int CKy, int UsrKy, string ConCord, string VauNo, string TimeStamp,string MultiCredit,string ObjKy, string Rem, string des )
        {
            string actionUri = "UpdateHdr";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();
            paramDictionary.Add("isRecur", isRecur);
            paramDictionary.Add("VouDate", VouDate);
            paramDictionary.Add("DocNo", DocNo);
            paramDictionary.Add("UrRef", UrRef);
            paramDictionary.Add("cmbCrnKy", cmbCrnKy);
            paramDictionary.Add("Yourref_Date", Yourref_Date);
            paramDictionary.Add("ExRateHrd", ExRateHrd);
            paramDictionary.Add("PrjKy", PrjKy);
            paramDictionary.Add("BUKy", BUKy);
            paramDictionary.Add("OurCd", OurCd);
            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("ConCord", ConCord);
            paramDictionary.Add("TrnKy", TrnKy);
            paramDictionary.Add("VauNo", VauNo);
            paramDictionary.Add("TimeStamp", TimeStamp);
            paramDictionary.Add("MultiCredit", MultiCredit);
            paramDictionary.Add("ObjKy", ObjKy);
            paramDictionary.Add("Rem", Rem);
            paramDictionary.Add("des", des);

            
            long trnKy = new long();
            object obj = RunApiOperation(
                JournalBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                TrnKy.GetType());

            trnKy = Convert.ToInt32(obj);

            return trnKy;
            //HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/Journal/UpdateHdr?VouDate=" + VouDate + "&DocNo=" + DocNo + "&UrRef=" + UrRef + "&cmbCrnKy=" + cmbCrnKy + "&Yourref_Date=" + Yourref_Date + "&ExRateHrd=" + ExRateHrd + "&PrjKy=" + PrjKy + "&BUKy=" + BUKy + "&OurCd=" + OurCd + "&CKy=" + CKy + "&UsrKy=" + UsrKy + "&ConCord=" + ConCord + "&TrnKy=" + TrnKy + "&VauNo=" + VauNo + "&TimeStamp=" + TimeStamp)).Result;
            //long TempTrnKy = 0;

            //if (response.IsSuccessStatusCode)
            //{
            //    string TrnKyString = response.Content.ReadAsStringAsync().Result;
            //    TempTrnKy = Convert.ToInt64(TrnKyString);

            //}
            //return TempTrnKy;
        }
    }
}