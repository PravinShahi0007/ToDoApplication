using BlueLotus.ComboLoad.Model;
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
        string hrBaseUri = "api/EmpMas/"; 
        string OTBaseUri = "api/OTEntry/";
        string LeaveBaseUri = "api/LeaveEntry/";
        string AddDedBaseUri = "api/MonthlyEntry/";

        internal List<EmpMasModel> GetTypeOth(int CKy, int UsrKy, string EnvironmentName)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName,"api/EmpMas/GetTypeOth?CKy=" + CKy + "&UsrKy=" + UsrKy + "")).Result;

            List<EmpMasModel> PrjNmList = new List<EmpMasModel>();
            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<EmpMasModel>));
                List<EmpMasModel> deserializeditems = new List<EmpMasModel>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<EmpMasModel>;
                PrjNmList = deserializeditems;
            }
            return PrjNmList;
        }

        internal List<EmpMasModel> GetCodeOth(int CKy, int UsrKy, string ControlConKy, string EnvironmentName)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/EmpMas/GetCodeOth?CKy=" + CKy + "&UsrKy=" + UsrKy + "&ControlConKy=" + ControlConKy + "")).Result;

            List<EmpMasModel> CodeList = new List<EmpMasModel>();
            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<EmpMasModel>));
                List<EmpMasModel> deserializeditems = new List<EmpMasModel>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<EmpMasModel>;
                CodeList = deserializeditems;
            }
            return CodeList;
        }

        internal List<EmpMasModel> GetCodeAD(int CKy, int UsrKy, string ConCd, string EnvironmentName)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName,"api/EmpMas/GetCodeAD?CKy=" + CKy + "&UsrKy=" + UsrKy + "&ConCd=" + ConCd + "")).Result;

            List<EmpMasModel> CodeLis = new List<EmpMasModel>();
            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<EmpMasModel>));
                List<EmpMasModel> deserializeditems = new List<EmpMasModel>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<EmpMasModel>;
                CodeLis = deserializeditems;
            }
            return CodeLis;
        }
        internal List<EmpMasModel> GetCountry(int CKy, int UsrKy, string EnvironmentName)
        {
            HttpResponseMessage Country = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/EmpMas/GetCountry?CKy=" + CKy + "&UsrKy=" + UsrKy + "")).Result;

            List<EmpMasModel> CodeLis = new List<EmpMasModel>();
            if (Country.IsSuccessStatusCode)
            {
                string jstr = Country.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<EmpMasModel>));
                List<EmpMasModel> deserializeditems = new List<EmpMasModel>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<EmpMasModel>;
                CodeLis = deserializeditems;
            }
            return CodeLis;
        }
       

        public long InsertEmp(int UsrKy, int CKy, string EmpNo, string EmpNm, string EPFNo, string NIC, DateTime BDate, string Sex,
            int Ethnic, int Religion, byte Img, int IsActive, string EnvironmentName, string Street, string City, string State, string ZipCode, string Country, string Mobile,
            string Tel1, string Tel2, string Fax, string Email, string EmpOthe, string EmpAdd, string EmpDed)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName,"api/EmpMas/InsertEmp?UsrKy=" + UsrKy + "&CKy=" + CKy + "&EmpNo=" + EmpNo + "&EmpNm=" + EmpNm + "&EPFNo=" + EPFNo + "&NIC=" + NIC +
                "&BDate=" + BDate + "&Sex=" + Sex + "&Ethnic=" + Ethnic + "&Religion=" + Religion + "&Img=" + Img +
                "&IsActive=" + IsActive + "&Street=" + Street + "&City=" + City + "&State=" + State + "&ZipCode=" + ZipCode + "&Country=" + Country + "&Mobile=" + Mobile + "&Tel1=" + Tel1 +
                "&Tel2=" + Tel2 + "&Fax=" + Fax + "&Email="
                + Email + "&EmpOthe=" + EmpOthe + "&EmpAdd=" + EmpAdd + "&EmpDed=" + EmpDed + "")).Result;

            long TrnKy = 0;
            if (response.IsSuccessStatusCode)
            {
                string TrnKyString = response.Content.ReadAsStringAsync().Result;
                TrnKy = Convert.ToInt64(TrnKyString);
            }
            return TrnKy;
        }

        internal long CheckEmployee(string EmpNo, int CKy, int UsrKy, string EnvironmentName)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/EmpMas/CheckEmployee?UsrKy=" + UsrKy + "&CKy=" + CKy + "&EmpNo=" + EmpNo + "")).Result;
            long Empkey = 0;
            if (response.IsSuccessStatusCode)
            {
                string TrnKyString = response.Content.ReadAsStringAsync().Result;
                Empkey = Convert.ToInt64(TrnKyString);
            }
            return Empkey; 
        
        
        }
        internal List<EmpMasModel> GetTypeAdd(int CKy, int UsrKy, string EnvironmentName)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName,"api/EmpMas/GetTypeAdd?CKy=" + CKy + "&UsrKy=" + UsrKy + "")).Result;

            List<EmpMasModel> TypeAdd = new List<EmpMasModel>();
            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<EmpMasModel>));
                List<EmpMasModel> deserializeditems = new List<EmpMasModel>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<EmpMasModel>;
                TypeAdd = deserializeditems;
            }
            return TypeAdd;
        }

        internal List<EmpDetails>EmpDetails(int CKy, int UsrKy, string EnvironmentName, string EmpKy)
        {
            string actionUri = "EmpDetails";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("EmpKy", EmpKy);
            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("EnvironmentName", EnvironmentName);

            List<EmpDetails> EmpDetails = new List<EmpDetails>();
            EmpDetails = RunApiOperation(
                hrBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                EmpDetails.GetType()) as List<EmpDetails>;

            return EmpDetails;
        }
        internal List<EmpDetails> GetAddrsDetails(int CKy, int UsrKy, string EnvironmentName, string EmpKy)
        {
            string actionUri = "AddrsDetails";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("EmpKy", EmpKy);
            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("EnvironmentName", EnvironmentName);

            List<EmpDetails> AddrsDetails = new List<EmpDetails>();
            AddrsDetails = RunApiOperation(
                hrBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                AddrsDetails.GetType()) as List<EmpDetails>;

            return AddrsDetails;
        }

        internal List<EmpMasModel> GetOtherDetails(int CKy, int UsrKy, string EnvironmentName, string EmpKy, string GrpConCd)
        {
            string actionUri = "OtherDetails";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("EmpKy", EmpKy);
            paramDictionary.Add("GrpConCd", GrpConCd);
            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("EnvironmentName", EnvironmentName);

            List<EmpMasModel> OtherDetails = new List<EmpMasModel>();
            OtherDetails = RunApiOperation(
                hrBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                OtherDetails.GetType()) as List<EmpMasModel>;

            return OtherDetails;
        }
        internal List<EmpDetails> GetEmployee(int CKy, int UsrKy, string EnvironmentName)
        {
            string actionUri = "GetEmployee";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("EnvironmentName", EnvironmentName);

            List<EmpDetails> EmpDetails = new List<EmpDetails>();
            EmpDetails = RunApiOperation(
                OTBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                EmpDetails.GetType()) as List<EmpDetails>;

            return EmpDetails;
        }
        internal long OTDETEntry(string OTEntry, int UsrKy, int CKy, string EnvironmentName)
        {

            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/OTEntry/OTDETEntry?UsrKy=" + UsrKy + "&CKy=" + CKy + "&OTEntry=" + OTEntry + "")).Result;
            long TrnKy = 0;
            if (response.IsSuccessStatusCode)
            {
                string TrnKyString = response.Content.ReadAsStringAsync().Result;
                TrnKy = Convert.ToInt64(TrnKyString);
            }
            return TrnKy;
        
        }
        internal long LeaveDETEntry(string LeaveEntitle, int UsrKy, int CKy, string OurCd, string EnvironmentName)
        {
            string actionUri = "LeaveDETEntry";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("LeaveEntitle", LeaveEntitle);
            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("OurCd", OurCd);
            paramDictionary.Add("EnvironmentName", EnvironmentName);


            object obj = new object();
            obj = RunApiOperation(
                LeaveBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                obj.GetType()) as object;

            return Convert.ToInt32(obj);
        }
            //HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/LeaveEntry/LeaveDETEntry?UsrKy=" + UsrKy + "&CKy=" + CKy + "&LeaveEntitle=" + LeaveEntitle + "")).Result;
            //long TrnKy = 0;
            //if (response.IsSuccessStatusCode)
            //{
            //    string TrnKyString = response.Content.ReadAsStringAsync().Result;
            //    TrnKy = Convert.ToInt64(TrnKyString);
            //}
            //return TrnKy;
        
        internal long checkleave(string EmpNo, string EmpKy, string FromD, string LeaveType, string CdKy, int UsrKy, int CKy, string EnvironmentName)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/LeaveEntry/checkleave?UsrKy=" + UsrKy + "&CKy=" + CKy + "&EmpNo=" +
                EmpNo + "&EmpKy=" + EmpKy + "&FromD=" + FromD + "&LeaveType=" + LeaveType + "&CdKy=" + CdKy + "")).Result;
            long key = 0;
            if (response.IsSuccessStatusCode)
            {
                string TrnKyString = response.Content.ReadAsStringAsync().Result;
                key = Convert.ToInt64(TrnKyString);
            }
            return key;
        }
        internal List<EmpMasCdDtModel> GetOTDetails(string EmpKy, int UsrKy, int CKy, string EnvironmentName)
        {
            string actionUri = "GetOTDetails";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("EmpKy", EmpKy);
            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("EnvironmentName", EnvironmentName);

            List<EmpMasCdDtModel> OTList = new List<EmpMasCdDtModel>();
            OTList = RunApiOperation(
                OTBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                OTList.GetType()) as List<EmpMasCdDtModel>;

            return OTList;
           
        }

        internal List<EmpDetails> GetLeaveDetails(string EmpKy, int UsrKy, int CKy, string EnvironmentName)
        {
            string actionUri = "GetLeaveDetails";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("EmpKy", EmpKy);
            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("EnvironmentName", EnvironmentName);

            List<EmpDetails> LeaveList = new List<EmpDetails>();
            LeaveList = RunApiOperation(
                LeaveBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                LeaveList.GetType()) as List<EmpDetails>;

            return LeaveList;
        }
        //internal List<EmpDetails> GetEmployee(int CKy, int UsrKy, string EnvironmentName)
        //{
        //    string actionUri = "GetEmployee";
        //    Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

        //    paramDictionary.Add("CKy", CKy);
        //    paramDictionary.Add("UsrKy", UsrKy);
        //    paramDictionary.Add("EnvironmentName", EnvironmentName);

        //    List<EmpDetails> EmpDetails = new List<EmpDetails>();
        //    EmpDetails = RunApiOperation(
        //        OTBaseUri,
        //        actionUri,
        //        EnvironmentName,
        //        paramDictionary,
        //        EmpDetails.GetType()) as List<EmpDetails>;

        //    return EmpDetails;
        //}
        //internal long OTDETEntry(string OTEntry, int UsrKy, int CKy, string EnvironmentName)
        //{

        //    HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/OTEntry/OTDETEntry?UsrKy=" + UsrKy + "&CKy=" + CKy + "&OTEntry=" + OTEntry + "")).Result;
        //    long TrnKy = 0;
        //    if (response.IsSuccessStatusCode)
        //    {
        //        string TrnKyString = response.Content.ReadAsStringAsync().Result;
        //        TrnKy = Convert.ToInt64(TrnKyString);
        //    }
        //    return TrnKy;
        
        //}

        internal long SaveAddDed(string newRecordsGridMonthlyAdditionEntry, string newRecordsGridMonthlyDeductionEntry, int UsrKy, int CKy, string EnvironmentName)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/MonthlyEntry/SaveAddDed?UsrKy=" + UsrKy + "&CKy=" + CKy +
                "&newRecordsGridMonthlyAdditionEntry=" + newRecordsGridMonthlyAdditionEntry + "&newRecordsGridMonthlyDeductionEntry=" + newRecordsGridMonthlyDeductionEntry + "")).Result;
            long TrnKy = 0;
            if (response.IsSuccessStatusCode)
            {
                string TrnKyString = response.Content.ReadAsStringAsync().Result;
                TrnKy = Convert.ToInt64(TrnKyString);
            }
            return TrnKy;
        }
        internal List<HRAlwModel> GetAddDedDetails(string EmpKy, string EntryDate, int UsrKy, int CKy, string EnvironmentName)
        {
            string actionUri = "GetAddDedDetails";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("EmpKy", EmpKy);
            paramDictionary.Add("EntryDate", EntryDate);
            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("EnvironmentName", EnvironmentName);

            List<HRAlwModel> AddDedList = new List<HRAlwModel>();
            AddDedList = RunApiOperation(
                AddDedBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                AddDedList.GetType()) as List<HRAlwModel>;

            return AddDedList;
        }


        internal long InsertOtherDetails(int CKy, int UsrKy, string EnvironmentName, string newRecords, string UpdtRecords)
        {
            string actionUri = "InsertOtherDetails";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("newRecords", newRecords);
            paramDictionary.Add("UpdtRecords", UpdtRecords);
            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("EnvironmentName", EnvironmentName);

            object obj = new object();
            obj = RunApiOperation(
                hrBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                obj.GetType()) as object;

            return Convert.ToInt64(obj);
        }
        internal List<LevTrnModel> LevTrn_SelectWeb(string EmpKy1, int UsrKy, int CKy,string OurCd, string EnvironmentName)
        {
            string actionUri = "LevTrn_SelectWeb";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("EmpKy", EmpKy1);
            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("OurCd", OurCd);
            paramDictionary.Add("EnvironmentName", EnvironmentName);

            List<LevTrnModel> LeaveList = new List<LevTrnModel>();
            
            LeaveList = RunApiOperation(
                LeaveBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                LeaveList.GetType()) as List<LevTrnModel>; 

            return LeaveList; 
        }

        internal List<LeaveBal> LeaveBal_SelectWeb(string EmpKy, int UsrKy, int CKy,string EnvironmentName)
        {
            string actionUri = "LeaveBal_SelectWeb";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("EmpKy", EmpKy);
            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("EnvironmentName", EnvironmentName);

            List<LeaveBal> LeaveList = new List<LeaveBal>();
      
            LeaveList = RunApiOperation(
                LeaveBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                LeaveList.GetType()) as List<LeaveBal>;

            return LeaveList;

        }

    }
}