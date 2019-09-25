
using BlueLotus.Payment.Model.Entity;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Runtime.Serialization.Json;
using System.Text;
using System.Web;
using System.Web.Script.Serialization;
using BlueLotus.ViewModel.Entity;
using AccountModel = BlueLotus.Payment.Model.Entity.AccountModel;
using Newtonsoft.Json;

namespace BlueLotus.UI.ApiOperations
{
    public partial class ApiOperation
    {
        string PaymentBaseUri = "api/Payment/";
        public List<AccountModel> urlHdrAccCode(int CKy, int UsrKy, string MultiCredit,string ConCord,string OurCode,string ObjKy,string EnvironmentName)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/Payment/HdrAccCode?CKy=" + CKy + "&UsrKy=" + UsrKy + "&MultiCredit=" + MultiCredit + "&ConCord=" + ConCord + "&OurCode=" + OurCode + "&ObjKy=" + ObjKy)).Result;
            

            List<AccountModel> HdrAccountList = new List<AccountModel>();
            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<AccountModel>));
                List<AccountModel> deserializeditems = new List<AccountModel>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<AccountModel>;
                HdrAccountList = deserializeditems;
            }
            return HdrAccountList;
        }

        public List<AccountModel> urlHdrAccName(int CKy, int UsrKy, string MultiCredit, string ConCord, string OurCode,string ObjKy,string EnvironmentName)
        {
            //HttpResponseMessage response = httpClient.GetAsync("api/Payment/HdrAccName?CKy=" + CKy + "&UsrKy=" + UsrKy + "&MultiCredit=" + MultiCredit + "&ConCord=" + ConCord + "&OurCode=" + OurCode + "").Result;
          
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/Payment/HdrAccName?CKy=" + CKy + "&UsrKy=" + UsrKy + "&MultiCredit=" + MultiCredit + "&ConCord=" + ConCord + "&OurCode=" + OurCode + "&ObjKy=" + ObjKy)).Result;

            List<AccountModel> HdrAccountNmList = new List<AccountModel>();
            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<AccountModel>));
                List<AccountModel> deserializeditems = new List<AccountModel>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<AccountModel>;
                HdrAccountNmList = deserializeditems;
            }
            return HdrAccountNmList;
        }


        public List<AccountModel> DtlAccCode(int CKy, int UsrKy, string MultiCredit, string ConCord, string OurCode,string ObjKy, string EnvironmentName)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/Payment/DtlAccCode?CKy=" + CKy + "&UsrKy=" + UsrKy + "&MultiCredit=" + MultiCredit + "&ConCord=" + ConCord + "&OurCode=" + OurCode +"&ObjKy=" + ObjKy)).Result;


            List<AccountModel> HdrAccountList = new List<AccountModel>();
            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<AccountModel>));
                List<AccountModel> deserializeditems = new List<AccountModel>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<AccountModel>;
                HdrAccountList = deserializeditems;
            }
            return HdrAccountList;
        }

        public List<AccountModel> DtlAccName(int CKy, int UsrKy, string MultiCredit, string ConCord, string OurCode,string ObjKy, string EnvironmentName)
        {
            //HttpResponseMessage response = httpClient.GetAsync("api/Payment/HdrAccName?CKy=" + CKy + "&UsrKy=" + UsrKy + "&MultiCredit=" + MultiCredit + "&ConCord=" + ConCord + "&OurCode=" + OurCode + "").Result;

            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/Payment/DtlAccName?CKy=" + CKy + "&UsrKy=" + UsrKy + "&MultiCredit=" + MultiCredit + "&ConCord=" + ConCord + "&OurCode=" + OurCode + "&ObjKy=" + ObjKy)).Result;

            List<AccountModel> HdrAccountNmList = new List<AccountModel>();
            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<AccountModel>));
                List<AccountModel> deserializeditems = new List<AccountModel>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<AccountModel>;
                HdrAccountNmList = deserializeditems;
            }
            return HdrAccountNmList;
        }

        public List<string> Saving_Validate(int CKy, int UsrKy, string GridDataArray, int ObjKy,int TrnKy, string EnvironmentName)
        {
            List<string> relist = new List<string>();
            if (GridDataArray != "[]" && GridDataArray != "[null]" && GridDataArray != "" && GridDataArray != null)
            {
                string actionUri = "Saving_Validate";

                PaymentGridModel[] NewCodes = JsonConvert.DeserializeObject<PaymentGridModel[]>(GridDataArray);

                object list = new object();
                for (int i = 0; i < NewCodes.Length; i++)
                {
                    Dictionary<string, object> paramDictionary = new Dictionary<string, object>();
                    List<PaymentGridModel> lst = new List<PaymentGridModel>();

                    lst.Add(NewCodes[i]);
                    string GridDataArray1 = new JavaScriptSerializer().Serialize(lst);

                    paramDictionary.Add("CKy", CKy);
                    paramDictionary.Add("UsrKy", UsrKy);
                    paramDictionary.Add("GridDataArray", GridDataArray1);
                    paramDictionary.Add("ObjKy", ObjKy);
                    paramDictionary.Add("TrnKy", TrnKy);

                    var Sucess = new object();

                    object obj = RunApiOperation(
                        PaymentBaseUri,
                        actionUri,
                        EnvironmentName,
                        paramDictionary,
                        Sucess.GetType());
                    // Console.WriteLine(obj.ToString());
                    if (obj.ToString().Length > 0)
                    {
                        relist.Add(obj.ToString());
                    }

                }
            }
            return relist;
        }
        public List<PayMode> PaymentMode(int CKy, int UsrKy,string ObjKy, string EnvironmentName)
        {
            //HttpResponseMessage response = httpClient.GetAsync("api/Payment/PaymentMode?CKy=" + CKy + "&UsrKy=" + UsrKy + "").Result;
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/Payment/PaymentMode?CKy=" + CKy + "&UsrKy=" + UsrKy + "&ObjKy=" + ObjKy)).Result;

            List<PayMode> PaymentModeList = new List<PayMode>();
            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<PayMode>));
                List<PayMode> deserializeditems = new List<PayMode>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<PayMode>;
                PaymentModeList = deserializeditems;
            }
            return PaymentModeList;
        }

        public List<PayMoTrnHdrDetails> InsertPaymentHdr(string EnvironmentName, string VouDate, string DocNo, string UrRef, string cmbCrnKy, string Yourref_Date, string ExRateHrd, string PrjKy, string BUKy, string OurCd, int CKy, int UsrKy, string ConCord,string IsRec, string ImageName,string MultiCredit,string FrmTrnKy,string ObjKy,string cmbAccKy, string Rem, string des)
        {
            string actionUri = "InsertHdr";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();
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
            paramDictionary.Add("IsRec", IsRec);
            paramDictionary.Add("ImageName", ImageName);
            paramDictionary.Add("MultiCredit", MultiCredit);//
            paramDictionary.Add("FrmTrnKy", FrmTrnKy);
            paramDictionary.Add("ObjKy", ObjKy);
            paramDictionary.Add("cmbAccKy", cmbAccKy);
            paramDictionary.Add("Rem", Rem);
            paramDictionary.Add("des", des);

            List<PayMoTrnHdrDetails> list = new List<PayMoTrnHdrDetails>();
            list = RunApiOperation(
                PaymentBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as List<PayMoTrnHdrDetails>;
            return list;

            ////  HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/Payment/InsertHdr?VouDate=" + VouDate + "&DocNo=" + DocNo + "&UrRef=" + UrRef + "&cmbCrnKy=" + cmbCrnKy + "&Yourref_Date=" + Yourref_Date + "&ExRateHrd=" + ExRateHrd + "&PrjKy=" + PrjKy + "&BUKy=" + BUKy + "&OurCd=" + OurCd + "&CKy=" + CKy + "&UsrKy=" + UsrKy + "&ConCord=" + ConCord + "&IsRec=" + IsRec + "")).Result;
            //List<PayMoTrnHdrDetails> TrnHdrDetail = new List<PayMoTrnHdrDetails>();
            //if (response.IsSuccessStatusCode)
            //{
            //    string jstr = response.Content.ReadAsStringAsync().Result;
            //    DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<PayMoTrnHdrDetails>));
            //    List<PayMoTrnHdrDetails> deserializeditems = new List<PayMoTrnHdrDetails>();
            //    MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
            //    DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
            //    deserializeditems = ser.ReadObject(ms) as List<PayMoTrnHdrDetails>;
            //    TrnHdrDetail = deserializeditems;
            //}
            //return TrnHdrDetail;
        }

        public bool InserPaymenttDetail(string EnvironmentName, string trnKy, string VouDate, string NewGridDetail, string UpdatedGridDetail, int Cky, int UsrKy,string OurCd,string MultiCredit,string IsRec, string AccLevlKy, string ConFinKy, string TrnCrnKy,string IsStampDuty,string ObjKy,string ExRateHrd)
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
                    PaymentGridModel[] NewJournalEntry = new JavaScriptSerializer().Deserialize<PaymentGridModel[]>(NewGridDetail);
                    NewRecordLength = NewJournalEntry.Length;

                    for (int i = 0; i < NewJournalEntry.Length; i++)
                    {
                        string actionUri = "InserPaymenttDetail";
                        Dictionary<string, object> paramDictionary = new Dictionary<string, object>();
                        string NewPaymentmodelString = new JavaScriptSerializer().Serialize(NewJournalEntry[i]);
                      
                        paramDictionary.Add("trnKy", trnKy);
                        paramDictionary.Add("VouDate", VouDate);
                        paramDictionary.Add("NewGridDetail", NewPaymentmodelString);
                       // paramDictionary.Add("UpdatedGridDetail", UpdatedGridDetail);
                        paramDictionary.Add("Cky", Cky);
                        paramDictionary.Add("UsrKy", UsrKy);
                        paramDictionary.Add("OurCd", OurCd);
                        paramDictionary.Add("MultiCredit", MultiCredit);
                        paramDictionary.Add("IsRec", IsRec);
                        paramDictionary.Add("AccLevlKy", AccLevlKy);
                        paramDictionary.Add("ConFinKy", ConFinKy);
                        paramDictionary.Add("TrnCrnKy", TrnCrnKy);
                        paramDictionary.Add("IsStampDuty", IsStampDuty);
                        paramDictionary.Add("ObjKy", ObjKy);
                        paramDictionary.Add("ExRateHrd", ExRateHrd);
                        paramDictionary.Add("ContraAccKey", ContraAccKey);
                        paramDictionary.Add("CurrnetRecordAt", i);
                        paramDictionary.Add("ArryLength", NewRecordLength);


                        long Sucess = new long();
                        object obj = RunApiOperation(
                            PaymentBaseUri,
                            actionUri,
                            EnvironmentName,
                            paramDictionary,
                            Sucess.GetType());
                        Sucess = Convert.ToInt64(obj);
                        ContraAccKey = Sucess;
                        InsertFinished++;
                    }
                }
                if (UpdatedGridDetail != "[]" && UpdatedGridDetail != "[null]" && UpdatedGridDetail != "")
                {
                    PaymentGridModel[] UpdateJournalEntry = new JavaScriptSerializer().Deserialize<PaymentGridModel[]>(UpdatedGridDetail);
                    UpdateRecordLength = UpdateJournalEntry.Length;

                    for (int i = 0; i < UpdateJournalEntry.Length; i++)
                    {
                        string actionUri = "UpdateDetails";
                        Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

                        string UpdatemodelString = new JavaScriptSerializer().Serialize(UpdateJournalEntry[i]);

                        paramDictionary.Add("trnKy", trnKy);
                        paramDictionary.Add("VouDate", VouDate);
                        //paramDictionary.Add("NewGridDetail", NewPaymentmodelString);
                        paramDictionary.Add("UpdatedGridDetail", UpdatemodelString);
                        paramDictionary.Add("Cky", Cky);
                        paramDictionary.Add("UsrKy", UsrKy);
                        paramDictionary.Add("OurCd", OurCd);
                        paramDictionary.Add("MultiCredit", MultiCredit);
                        paramDictionary.Add("IsRec", IsRec);
                        paramDictionary.Add("AccLevlKy", AccLevlKy);
                        paramDictionary.Add("ConFinKy", ConFinKy);
                        paramDictionary.Add("TrnCrnKy", TrnCrnKy);
                        paramDictionary.Add("IsStampDuty", IsStampDuty);
                        paramDictionary.Add("ObjKy", ObjKy);
                        paramDictionary.Add("ExRateHrd", ExRateHrd);
                        paramDictionary.Add("CurrnetRecordAt", i);
                        paramDictionary.Add("ArryLength", UpdateRecordLength);
                        long Sucess = new long();
                        object obj = RunApiOperation(
                            PaymentBaseUri,
                            actionUri,
                            EnvironmentName,
                            paramDictionary,
                            Sucess.GetType());
                        Sucess = Convert.ToInt64(obj);
                        UpdateFinished++;
                    }
                }
            }
            catch (Exception Ex)
            {
                            
                throw;
            }

            //string actionUri = "InserPaymenttDetail";
            //Dictionary<string, object> paramDictionary = new Dictionary<string, object>();
            //paramDictionary.Add("trnKy", trnKy);
            //paramDictionary.Add("VouDate", VouDate);
            //paramDictionary.Add("NewGridDetail", NewGridDetail);
            //paramDictionary.Add("UpdatedGridDetail", UpdatedGridDetail);
            //paramDictionary.Add("Cky", Cky);
            //paramDictionary.Add("UsrKy", UsrKy);
            //paramDictionary.Add("OurCd", OurCd);
            //paramDictionary.Add("MultiCredit", MultiCredit);
            //paramDictionary.Add("IsRec", IsRec);
            //paramDictionary.Add("AccLevlKy", AccLevlKy);
            //paramDictionary.Add("ConFinKy", ConFinKy);
            //paramDictionary.Add("TrnCrnKy", TrnCrnKy);
            //paramDictionary.Add("IsStampDuty", IsStampDuty);
            //paramDictionary.Add("ObjKy", ObjKy);
            //paramDictionary.Add("ExRateHrd", ExRateHrd);
            //bool Sucess = new bool();
            //object obj = RunApiOperation(
            //    PaymentBaseUri,
            //    actionUri,
            //    EnvironmentName,
            //    paramDictionary,
            //    Sucess.GetType());

            //Sucess = Convert.ToBoolean(obj);

            //return Sucess;
            //HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/Payment/InserPaymenttDetail?trnKy=" + trnKy + "&VouDate=" + VouDate + "&NewGridDetail=" + NewGridDetail + "&UpdatedGridDetail=" + UpdatedGridDetail + "&Cky=" + Cky + "&UsrKy=" + UsrKy + "&OurCd=" + OurCd + "&MultiCredit=" + MultiCredit + "&IsRec=" + IsRec + "&AccLevlKy=" + AccLevlKy + "&ConFinKy=" + ConFinKy + "&TrnCrnKy=" + TrnCrnKy + "&IsStampDuty=" + IsStampDuty + "&ObjKy=" + ObjKy)).Result;
            //bool Sucess = false;

            //if (response.IsSuccessStatusCode)
            //{
            //    string SucessStrng = response.Content.ReadAsStringAsync().Result;
            //    Sucess = Convert.ToBoolean(SucessStrng);

            //}
            if (InsertFinished == NewRecordLength && UpdateFinished == UpdateRecordLength)
            {
                return true;

            }
            else
            {
                return false;

            }
        }
        public List<PaymenthdrGridModel> GetPaymentHdrDetail(string EnvironmentName, string TrnKy, int CKy, int UsrKy)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/Payment/PaymenttHdrDetails?TrnKy=" + TrnKy + "&CKy=" + CKy + "&UsrKy=" + UsrKy + "")).Result;

            List<PaymenthdrGridModel> AllDetail = new List<PaymenthdrGridModel>();
            if (response.IsSuccessStatusCode)
            {

                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<PaymentGridModel>));
                List<PaymenthdrGridModel> deserializeditems = new List<PaymenthdrGridModel>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<PaymenthdrGridModel>;
                AllDetail = deserializeditems;
            }
            return AllDetail;
        }


        public List<PaymentGridModel> GetPaymentGridDetail(string EnvironmentName, string TrnKy, int CKy, int UsrKy,string ObjKy)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/Payment/GetPaymentGridDetails?TrnKy=" + TrnKy + "&CKy=" + CKy + "&UsrKy=" + UsrKy + "&ObjKy=" + ObjKy + "")).Result;

            List<PaymentGridModel> AllDetail = new List<PaymentGridModel>();
            if (response.IsSuccessStatusCode)
            {

                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<PaymentGridModel>));
                List<PaymentGridModel> deserializeditems = new List<PaymentGridModel>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<PaymentGridModel>;
                AllDetail = deserializeditems;
            }
            return AllDetail;
        }

        //2016/6/15
        public List<BankModel> BankName(int CKy, int UsrKy,string ObjKy, string EnvironmentName)
        {
            //HttpResponseMessage response = httpClient.GetAsync("api/Payment/HdrAccName?CKy=" + CKy + "&UsrKy=" + UsrKy + "&MultiCredit=" + MultiCredit + "&ConCord=" + ConCord + "&OurCode=" + OurCode + "").Result;

            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/Payment/BankName?CKy=" + CKy + "&UsrKy=" + UsrKy + "&ObjKy=" + ObjKy)).Result;

            List<BankModel> BankList = new List<BankModel>();
            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<BankModel>));
                List<BankModel> deserializeditems = new List<BankModel>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<BankModel>;
                BankList = deserializeditems;
            }
            return BankList;
        }

        public List<BracnhModel> BranchCode(int CKy, int UsrKy,string BankKy,string ObjKy, string EnvironmentName)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/Payment/BrachList?CKy=" + CKy + "&UsrKy=" + UsrKy + "&BankKy=" + BankKy + "&ObjKy=" + ObjKy)).Result;

            List<BracnhModel> BrachList = new List<BracnhModel>();
            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<BracnhModel>));
                List<BracnhModel> deserializeditems = new List<BracnhModel>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<BracnhModel>;
                BrachList = deserializeditems;
            }
            return BrachList;
        }

        public List<OurCodeModel> OurCodeFilter(int CKy, int UsrKy, string OurCode,string ObjKy, string EnvironmentName)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/Payment/OurCodeFilter?CKy=" + CKy + "&UsrKy=" + UsrKy + "&OurCode=" + OurCode+ "&ObjKy=" + ObjKy)).Result;

            List<OurCodeModel> OurCodeFilter = new List<OurCodeModel>();
            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<OurCodeModel>));
                List<OurCodeModel> deserializeditems = new List<OurCodeModel>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<OurCodeModel>;
                OurCodeFilter = deserializeditems;
            }
            return OurCodeFilter;
        }

        public List<OrdrModel> OdrKyCode(int CKy, int UsrKy,string ObjKy, string EnvironmentName)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/Payment/OdrKyCode?CKy=" + CKy + "&UsrKy=" + UsrKy + "&ObjKy=" + ObjKy)).Result;

            List<OrdrModel> OdrKyCodeList = new List<OrdrModel>();
            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<OrdrModel>));
                List<OrdrModel> deserializeditems = new List<OrdrModel>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<OrdrModel>;
                OdrKyCodeList = deserializeditems;
            }
            return OdrKyCodeList;
        }
        public List<OrdrModel> PaymentOdrCode(int CKy,int  UsrKy,string ObjKy, string BuKy, string PrjKy ,string EnvironmentName)
        {
            string actionUri = "OdrCode";
           
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();
            paramDictionary.Add("cKy", CKy);
            paramDictionary.Add("usrKy", UsrKy);
            paramDictionary.Add("ObjKy", ObjKy);
            paramDictionary.Add("BUKy", BuKy);
            paramDictionary.Add("PrjKy", PrjKy);

            List<OrdrModel> list = new List<OrdrModel>();
            list = RunApiOperation(
                PaymentBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as List<OrdrModel>;
            return list;
          
        }

        public List<OrdrModel> OdrDetCode(int CKy, int UsrKy, string OrdrKy,string ObjKy,string EnvironmentName)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/Payment/OdrDetCode?CKy=" + CKy + "&UsrKy=" + UsrKy + "&OrdrKy=" + OrdrKy + "&ObjKy=" + ObjKy)).Result;

            List<OrdrModel> OdrKyCodeList = new List<OrdrModel>();
            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<OrdrModel>));
                List<OrdrModel> deserializeditems = new List<OrdrModel>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<OrdrModel>;
                OdrKyCodeList = deserializeditems;
            }
            return OdrKyCodeList;
        }

        public bool PaymentIsStampShow(string EnvironmentName, int cKy, int usrKy, string objKy, string ourCd)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/Payment/PaymentIsStampShow?cKy=" + cKy + "&usrKy=" + usrKy + "&objKy=" + objKy + "&ourCd=" + ourCd )).Result;
            bool Sucess = false;

            if (response.IsSuccessStatusCode)
            {
                string SucessStrng = response.Content.ReadAsStringAsync().Result;
                Sucess = Convert.ToBoolean(SucessStrng);

            }
            return Sucess;
        }

        public bool IsCd13Status(string EnvironmentName, int cKy, int usrKy, string objKy, string OurCode, string TrnTyp)
        {
            string actionUri = "IsCd13Status";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();
            paramDictionary.Add("usrKy", usrKy);
            paramDictionary.Add("cKy", cKy);
            paramDictionary.Add("objKy", objKy);
            paramDictionary.Add("OurCode", OurCode);
            paramDictionary.Add("TrnTyp", TrnTyp);
            bool Sucess = new bool();
            object obj = RunApiOperation(
                PaymentBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                Sucess.GetType());
            Sucess = Convert.ToBoolean(obj);
            return Sucess;
          
        }

        public bool cdmasRec(string EnvironmentName, int cKy, int usrKy, string cdKy)
        {
            string actionUri = "CdmasRecIsChq";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();
            paramDictionary.Add("usrKy", usrKy);
            paramDictionary.Add("cKy", cKy);
            paramDictionary.Add("cdKy", cdKy);
            bool Sucess = new bool();
            object obj = RunApiOperation(
                PaymentBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                Sucess.GetType());
            Sucess = Convert.ToBoolean(obj);
            return Sucess;
        }
        public TBBalValidation IsTbBAl(string EnvironmentName, int cKy, int usrKy, string objKy, string trnKy)
        {
            string actionUri = "IsTbBAl";

            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();
            paramDictionary.Add("cKy", cKy);
            paramDictionary.Add("usrKy", usrKy);
            paramDictionary.Add("objKy", objKy);
            paramDictionary.Add("trnKy", trnKy);

            TBBalValidation Data = new TBBalValidation();
            Data = RunApiOperation(
                PaymentBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                Data.GetType()) as TBBalValidation;
            return Data;
        }

        public bool CheqNo_ValidationWeb(int CKy, int UsrKy ,int TrnKy, string EnvironmentName)
        {
            string actionUri = "Cheqno_validation";

            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();
            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("TrnKy", TrnKy);
            bool RetunVariable = new bool();
            object obj = RunApiOperation(
                PaymentBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                RetunVariable.GetType());
            RetunVariable = Convert.ToBoolean(obj);

            return RetunVariable;
        }
    }
}