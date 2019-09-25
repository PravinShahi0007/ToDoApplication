using BlueLotus.HRIS.Model.Entity;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Runtime.Serialization.Json;
using System.Text;
using System.Web;
using System.Web.Mvc;

namespace BlueLotus.UI.ApiOperations
{
    public partial class ApiOperation
    {
        public List<BankMas_LookupWebModel> GetBnkMas_LookupWeb(string EnvironmentName, int UsrKy, int CKy, int BnkKy)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/HRISEmployee/GetBnkMas_LookupWeb?CKy=" + CKy + "&UsrKy=" + UsrKy + "&BnkKy=" + BnkKy + "")).Result;

            List<BankMas_LookupWebModel> GenderList = new List<BankMas_LookupWebModel>();
            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<BankMas_LookupWebModel>));
                List<BankMas_LookupWebModel> deserializeditems = new List<BankMas_LookupWebModel>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<BankMas_LookupWebModel>;
                GenderList = deserializeditems;
            }
            return GenderList;
        }
        public List<CdMas_LookupWebModel> GetCdMas_LookupWeb(string EnvironmentName, int UsrKy, int CKy, string ConCd)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/HRISEmployee/GetCdMas_LookupWeb?CKy=" + CKy + "&UsrKy=" + UsrKy + "&ConCd=" + ConCd + "")).Result;

            List<CdMas_LookupWebModel> GenderList = new List<CdMas_LookupWebModel>();
            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<CdMas_LookupWebModel>));
                List<CdMas_LookupWebModel> deserializeditems = new List<CdMas_LookupWebModel>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<CdMas_LookupWebModel>;
                GenderList = deserializeditems;
            }
            return GenderList;
        }
        public List<EmpMasCdModel> GetEmpMasCdDet(string EnvironmentName, int UsrKy, int CKy)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/HRISEmployee/GetEmpMasCdDet?CKy=" + CKy + "&UsrKy=" + UsrKy + "")).Result;

            List<EmpMasCdModel> GenderList = new List<EmpMasCdModel>();
            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<EmpMasCdModel>));
                List<EmpMasCdModel> deserializeditems = new List<EmpMasCdModel>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<EmpMasCdModel>;
                GenderList = deserializeditems;
            }
            return GenderList;
        }
        public List<EmpMasCdModel> GetEmpMasCdDetAfterSelect(string EnvironmentName, int UsrKy, int CKy, string EmpKy)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/HRISEmployee/GetEmpMasCdDetAfterSelect?CKy=" + CKy + "&UsrKy=" + UsrKy + "&EmpKy=" + EmpKy + "")).Result;

            List<EmpMasCdModel> EmpMasCd_list = new List<EmpMasCdModel>();
            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<EmpMasCdModel>));
                List<EmpMasCdModel> deserializeditems = new List<EmpMasCdModel>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<EmpMasCdModel>;
                EmpMasCd_list = deserializeditems;
            }
            return EmpMasCd_list;
        }
        public List<EmpPersonalDataModel> GetEmpPersonalDet(string EnvironmentName, int UsrKy, int CKy, string EmpKy)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/HRISEmployee/GetEmpPersonalDet?CKy=" + CKy + "&UsrKy=" + UsrKy + "&EmpKy=" + EmpKy + "")).Result;

            List<EmpPersonalDataModel> GenderList = new List<EmpPersonalDataModel>();
            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<EmpPersonalDataModel>));
                List<EmpPersonalDataModel> deserializeditems = new List<EmpPersonalDataModel>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<EmpPersonalDataModel>;
                GenderList = deserializeditems;
            }
            return GenderList;
        }
        public List<EmpFmlyDataModel> GetEmpFamilyDet(string EnvironmentName, int UsrKy, int CKy, string EmpKy)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/HRISEmployee/GetEmpFamilyDet?CKy=" + CKy + "&UsrKy=" + UsrKy + "&EmpKy=" + EmpKy + "")).Result;

            List<EmpFmlyDataModel> SalaryDetList = new List<EmpFmlyDataModel>();
            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<EmpFmlyDataModel>));
                List<EmpFmlyDataModel> deserializeditems = new List<EmpFmlyDataModel>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<EmpFmlyDataModel>;
                SalaryDetList = deserializeditems;
            }
            return SalaryDetList;
        }
        public List<EmpSalaryDetDataModel> HRISGetSalaryDet(string EnvironmentName, int UsrKy, int CKy, string EmpKy)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/HRISEmployee/HRISGetSalaryDet?CKy=" + CKy + "&UsrKy=" + UsrKy + "&EmpKy=" + EmpKy + "")).Result;

            List<EmpSalaryDetDataModel> SalaryDetList = new List<EmpSalaryDetDataModel>();
            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<EmpSalaryDetDataModel>));
                List<EmpSalaryDetDataModel> deserializeditems = new List<EmpSalaryDetDataModel>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<EmpSalaryDetDataModel>;
                SalaryDetList = deserializeditems;
            }
            return SalaryDetList;
        }

        public List<EmpContactDetDataModel> GetEmpContactDet(string EnvironmentName, int UsrKy, int CKy, string EmpKy)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/HRISEmployee/GetEmpContactDet?CKy=" + CKy + "&UsrKy=" + UsrKy + "&EmpKy=" + EmpKy + "")).Result;

            List<EmpContactDetDataModel> EmpContactDetList = new List<EmpContactDetDataModel>();
            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<EmpContactDetDataModel>));
                List<EmpContactDetDataModel> deserializeditems = new List<EmpContactDetDataModel>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<EmpContactDetDataModel>;
                EmpContactDetList = deserializeditems;
            }
            return EmpContactDetList;
        }
        public List<EmpMasModel> GetEmpDet(string EnvironmentName, int UsrKy, int CKy)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/HRISEmployee/GetEmpDet?CKy=" + CKy + "&UsrKy=" + UsrKy + "")).Result;

            List<EmpMasModel> GenderList = new List<EmpMasModel>();
            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<EmpMasModel>));
                List<EmpMasModel> deserializeditems = new List<EmpMasModel>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<EmpMasModel>;
                GenderList = deserializeditems;
            }
            return GenderList;
        }
       public long HRISInsertHdr(string EnvironmentName, int CKy, int UsrKy, string ConCord, string empData)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/HRISEmployee/HRISInsertHdr?CKy=" + CKy  + "&UsrKy=" + UsrKy  +"&empData="+empData+ "")).Result;
            long TrnKy = 0;

            if (response.IsSuccessStatusCode)
            {
                string TrnKyString = response.Content.ReadAsStringAsync().Result;
                TrnKy = Convert.ToInt64(TrnKyString);

            }
            return TrnKy;
        }
        public long HRISInsertEmpMasCdDetails(string EnvironmentName, int CKy, int UsrKy, string ConCord, string empMasCdData)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/HRISEmployee/HRISInsertEmpMasCdDetails?CKy=" + CKy + "&UsrKy=" + UsrKy + "&ConCord=" + ConCord + "&empMasCdData=" + empMasCdData + "")).Result;
            long TrnKy = 0;

            if (response.IsSuccessStatusCode)
            {
                string TrnKyString = response.Content.ReadAsStringAsync().Result;
                TrnKy = Convert.ToInt64(TrnKyString);

            }
            return TrnKy;
        }
        //public long HRISInsertMembershipHdr(string EnvironmentName, int CKy, int UsrKy, string ConCord, string empMembershipData)
        //{
        //    HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/HRISEmployee/HRISInsertMembershipHdr?CKy=" + CKy + "&UsrKy=" + UsrKy + "&ConCord=" + ConCord + "&empData=" + empMembershipData + "")).Result;
        //    long TrnKy = 0;

        //    if (response.IsSuccessStatusCode)
        //    {
        //        string TrnKyString = response.Content.ReadAsStringAsync().Result;
        //        TrnKy = Convert.ToInt64(TrnKyString);

        //    }
        //    return TrnKy;
        //}
        public long HRISInsertBankHdr(string EnvironmentName, int CKy, int UsrKy, string ConCord, string empBankData)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/HRISEmployee/HRISInsertBankHdr?CKy=" + CKy + "&UsrKy=" + UsrKy + "&ConCord=" + ConCord + "&empData=" + empBankData + "")).Result;
            long TrnKy = 0;
            if (response.IsSuccessStatusCode)
            {
                string TrnKyString = response.Content.ReadAsStringAsync().Result;
                TrnKy = Convert.ToInt64(TrnKyString);

            }
            return TrnKy;
        }
        public long HRISInsertTrainingHdr(string EnvironmentName, int CKy, int UsrKy, string ConCord, string empTrainingData)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/HRISEmployee/HRISInsertTrainingHdr?CKy=" + CKy + "&UsrKy=" + UsrKy + "&ConCord=" + ConCord + "&empData=" + empTrainingData + "")).Result;
            long TrnKy = 0;
            if (response.IsSuccessStatusCode)
            {
                string TrnKyString = response.Content.ReadAsStringAsync().Result;
                TrnKy = Convert.ToInt64(TrnKyString);

            }
            return TrnKy;
        }
        public long HRISInsertProfHdr(string EnvironmentName, int CKy, int UsrKy, string ConCord, string empProfData)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/HRISEmployee/HRISInsertProfHdr?CKy=" + CKy + "&UsrKy=" + UsrKy + "&ConCord=" + ConCord + "&empData=" + empProfData + "")).Result;
            long TrnKy = 0;
            if (response.IsSuccessStatusCode)
            {
                string TrnKyString = response.Content.ReadAsStringAsync().Result;
                TrnKy = Convert.ToInt64(TrnKyString);

            }
            return TrnKy;
        }
        public long HRISInsert_SLeavers_AcaQul(string EnvironmentName, int CKy, int UsrKy, string ConCord, string empSLeavers_AcadData)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/HRISEmployee/HRISInsert_SLeavers_AcaQulHdr?CKy=" + CKy + "&UsrKy=" + UsrKy + "&ConCord=" + ConCord + "&empData=" + empSLeavers_AcadData + "")).Result;
            long TrnKy = 0;
            if (response.IsSuccessStatusCode)
            {
                string TrnKyString = response.Content.ReadAsStringAsync().Result;
                TrnKy = Convert.ToInt64(TrnKyString);

            }
            return TrnKy;
        }
        public long HRISInsert_Al_AcaQulHdr(string EnvironmentName, int CKy, int UsrKy, string ConCord, string empAl_AcadData)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/HRISEmployee/HRISInsert_Al_AcaQulHdr?CKy=" + CKy + "&UsrKy=" + UsrKy + "&ConCord=" + ConCord + "&empData=" + empAl_AcadData + "")).Result;
            long TrnKy = 0;
            if (response.IsSuccessStatusCode)
            {
                string TrnKyString = response.Content.ReadAsStringAsync().Result;
                TrnKy = Convert.ToInt64(TrnKyString);

            }
            return TrnKy;
        }
        public long HRISInsert_Ol_AcaQulHdr(string EnvironmentName, int CKy, int UsrKy, string ConCord, string empOl_AcadData)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/HRISEmployee/HRISInsert_Ol_AcaQulHdr?CKy=" + CKy + "&UsrKy=" + UsrKy + "&ConCord=" + ConCord + "&empData=" + empOl_AcadData + "")).Result;
            long TrnKy = 0;
            if (response.IsSuccessStatusCode)
            {
                string TrnKyString = response.Content.ReadAsStringAsync().Result;
                TrnKy = Convert.ToInt64(TrnKyString);

            }
            return TrnKy;
        }
        public long HRISInsertWelfareHdr(string EnvironmentName, int CKy, int UsrKy, string ConCord, string empWelfareData)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/HRISEmployee/HRISInsertWelfareHdr?CKy=" + CKy + "&UsrKy=" + UsrKy + "&ConCord=" + ConCord + "&empData=" + empWelfareData + "")).Result;
            long TrnKy = 0;
            if (response.IsSuccessStatusCode)
            {
                string TrnKyString = response.Content.ReadAsStringAsync().Result;
                TrnKy = Convert.ToInt64(TrnKyString);

            }
            return TrnKy;
        }
        public long HRISInsertContactHdr(string EnvironmentName, int CKy, int UsrKy , string empContactData, string empContactHdr)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/HRISEmployee/HRISInsertContactHdr?CKy=" + CKy + "&UsrKy=" + UsrKy + "&empContactData=" + empContactData + "&empContactHdr=" + empContactHdr + "")).Result;
            long TrnKy = 0;
            if (response.IsSuccessStatusCode)
            {
                string TrnKyString = response.Content.ReadAsStringAsync().Result;
                TrnKy = Convert.ToInt64(TrnKyString);

            }
            return TrnKy;
        }

        public long HRISInsertSalaryDet(string EnvironmentName, int CKy, int UsrKy, string empSalaryData, string empSalaryHdr)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/HRISEmployee/HRISInsertSalaryDet?CKy=" + CKy + "&UsrKy=" + UsrKy + "&empSalaryData=" + empSalaryData + "&empSalaryHdr=" + empSalaryHdr + "")).Result;
            long Key = 0;
            if (response.IsSuccessStatusCode)
            {
                string TrnKyString = response.Content.ReadAsStringAsync().Result;
                Key = Convert.ToInt64(TrnKyString);

            }
            return Key;
        }

        public long HRISInsertFmlyDet(string EnvironmentName, int CKy, int UsrKy, string EmpFamilyHdr, string EmpfmlyData)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/HRISEmployee/HRISInsertFmlyDet?CKy=" + CKy + "&UsrKy=" + UsrKy + "&EmpFamilyHdr=" + EmpFamilyHdr + "&EmpfmlyData=" + EmpfmlyData + "")).Result;
            long TrnKy = 0;

            if (response.IsSuccessStatusCode)
            {
                string TrnKyString = response.Content.ReadAsStringAsync().Result;
                TrnKy = Convert.ToInt64(TrnKyString);
            }
            return TrnKy;
        }
        public long HRISInsertJobDet(string EnvironmentName, int CKy, int UsrKy, string EmpJobHdr, string EmpJobDet)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/HRISEmployee/HRISInsertJobDet?CKy=" + CKy + "&UsrKy=" + UsrKy + "&EmpJobHdr=" + EmpJobHdr + "&EmpJobDet=" + EmpJobDet + "")).Result;
            long Key = 0;
            if (response.IsSuccessStatusCode)
            {
                string TrnKyString = response.Content.ReadAsStringAsync().Result;
                Key = Convert.ToInt64(TrnKyString);
            }
            return Key;
        }
        public List<EmpJobDataModel> HRISGetJobDet(string EnvironmentName, int UsrKy, int CKy, string EmpKy)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/HRISEmployee/HRISGetJobDet?CKy=" + CKy + "&UsrKy=" + UsrKy + "&EmpKy=" + EmpKy + "")).Result;

            List<EmpJobDataModel> SalaryDetList = new List<EmpJobDataModel>();
            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<EmpJobDataModel>));
                List<EmpJobDataModel> deserializeditems = new List<EmpJobDataModel>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<EmpJobDataModel>;
                SalaryDetList = deserializeditems;
            }
            return SalaryDetList;
        }

        public long HRISInsertProfDet(string EnvironmentName, int CKy, int UsrKy, string EmpHdr, string EmpProfDet)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/HRISEmployee/HRISInsertProfDet?CKy=" + CKy + "&UsrKy=" + UsrKy + "&EmpHdr=" + EmpHdr + "&EmpProfDet=" + EmpProfDet + "")).Result;
            long Key = 0;
            if (response.IsSuccessStatusCode)
            {
                string TrnKyString = response.Content.ReadAsStringAsync().Result;
                Key = Convert.ToInt64(TrnKyString);
            }
            return Key;
        }
        public List<EmpProfDatacModel> HRISGetProfDet(string EnvironmentName, int UsrKy, int CKy, string EmpKy)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/HRISEmployee/HRISGetProfDet?CKy=" + CKy + "&UsrKy=" + UsrKy + "&EmpKy=" + EmpKy + "")).Result;

            List<EmpProfDatacModel> ProfDetList = new List<EmpProfDatacModel>();
            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<EmpProfDatacModel>));
                List<EmpProfDatacModel> deserializeditems = new List<EmpProfDatacModel>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<EmpProfDatacModel>;
                ProfDetList = deserializeditems;
            }
            return ProfDetList;
        }

        public long HRISInsertTrainingDet(string EnvironmentName, int CKy, int UsrKy, string EmpHdr, string EmpTrainingDet)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/HRISEmployee/HRISInsertTrainingDet?CKy=" + CKy + "&UsrKy=" + UsrKy + "&EmpHdr=" + EmpHdr + "&EmpTrainingDet=" + EmpTrainingDet + "")).Result;
            long Key = 0;
            if (response.IsSuccessStatusCode)
            {
                string TrnKyString = response.Content.ReadAsStringAsync().Result;
                Key = Convert.ToInt64(TrnKyString);
            }
            return Key;
        }
        public List<EmpTrainingDataModel> HRISGetTrainingDet(string EnvironmentName, int UsrKy, int CKy, string EmpKy)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/HRISEmployee/HRISGetTrainingDet?CKy=" + CKy + "&UsrKy=" + UsrKy + "&EmpKy=" + EmpKy + "")).Result;

            List<EmpTrainingDataModel> ProfDetList = new List<EmpTrainingDataModel>();
            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<EmpTrainingDataModel>));
                List<EmpTrainingDataModel> deserializeditems = new List<EmpTrainingDataModel>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<EmpTrainingDataModel>;
                ProfDetList = deserializeditems;
            }
            return ProfDetList;
        }
        public long HRISInsertLeaveDet(string EnvironmentName, int CKy, int UsrKy, string EmpHdr, string EmpData)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/HRISEmployee/HRISInsertLeaveDet?CKy=" + CKy + "&UsrKy=" + UsrKy + "&EmpHdr=" + EmpHdr + "&EmpData=" + EmpData + "")).Result;
            long Key = 0;
            if (response.IsSuccessStatusCode)
            {
                string TrnKyString = response.Content.ReadAsStringAsync().Result;
                Key = Convert.ToInt64(TrnKyString);
            }
            return Key;
        }
        public List<EmpLeaveDataModel> HRISGetLeaveDet(string EnvironmentName, int UsrKy, int CKy, string EmpKy)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/HRISEmployee/HRISGetLeaveDet?CKy=" + CKy + "&UsrKy=" + UsrKy + "&EmpKy=" + EmpKy + "")).Result;

            List<EmpLeaveDataModel> ProfDetList = new List<EmpLeaveDataModel>();
            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<EmpLeaveDataModel>));
                List<EmpLeaveDataModel> deserializeditems = new List<EmpLeaveDataModel>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<EmpLeaveDataModel>;
                ProfDetList = deserializeditems;
            }
            return ProfDetList;
        }
        public long HRISInsertMembershipDet(string EnvironmentName, int CKy, int UsrKy, string EmpHdr, string EmpMembershipData)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/HRISEmployee/HRISInsertMembershipDet?CKy=" + CKy + "&UsrKy=" + UsrKy + "&EmpHdr=" + EmpHdr + "&EmpMembershipData=" + EmpMembershipData + "")).Result;
            long Key = 0;
            if (response.IsSuccessStatusCode)
            {
                string TrnKyString = response.Content.ReadAsStringAsync().Result;
                Key = Convert.ToInt64(TrnKyString);
            }
            return Key;
        }
        public List<EmpMembershipDataModel> HRISGetMembershipDet(string EnvironmentName, int UsrKy, int CKy, string EmpKy)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/HRISEmployee/HRISGetMembershipDet?CKy=" + CKy + "&UsrKy=" + UsrKy + "&EmpKy=" + EmpKy + "")).Result;

            List<EmpMembershipDataModel> ProfDetList = new List<EmpMembershipDataModel>();
            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<EmpMembershipDataModel>));
                List<EmpMembershipDataModel> deserializeditems = new List<EmpMembershipDataModel>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<EmpMembershipDataModel>;
                ProfDetList = deserializeditems;
            }
            return ProfDetList;
        }
        public long HRISInsertAl_AcadDet(string EnvironmentName, int CKy, int UsrKy, string EmpHdr, string EmpAlData)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/HRISEmployee/HRISInsertAl_AcadDet?CKy=" + CKy + "&UsrKy=" + UsrKy + "&EmpHdr=" + EmpHdr + "&EmpAlData=" + EmpAlData + "")).Result;
            long Key = 0;
            if (response.IsSuccessStatusCode)
            {
                string TrnKyString = response.Content.ReadAsStringAsync().Result;
                Key = Convert.ToInt64(TrnKyString);
            }
            return Key;
        }
        public List<EmpAlOl_AcadDataModel> HRISGetAl_AcadDet(string EnvironmentName, int UsrKy, int CKy, string EmpKy)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/HRISEmployee/HRISGetAl_AcadDet?CKy=" + CKy + "&UsrKy=" + UsrKy + "&EmpKy=" + EmpKy + "")).Result;

            List<EmpAlOl_AcadDataModel> ProfDetList = new List<EmpAlOl_AcadDataModel>();
            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<EmpAlOl_AcadDataModel>));
                List<EmpAlOl_AcadDataModel> deserializeditems = new List<EmpAlOl_AcadDataModel>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<EmpAlOl_AcadDataModel>;
                ProfDetList = deserializeditems;
            }
            return ProfDetList;
        }
        public long HRISInsertOl_AcadDet(string EnvironmentName, int CKy, int UsrKy, string EmpHdr, string EmpAlData)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/HRISEmployee/HRISInsertOl_AcadDet?CKy=" + CKy + "&UsrKy=" + UsrKy + "&EmpHdr=" + EmpHdr + "&EmpAlData=" + EmpAlData + "")).Result;
            long Key = 0;
            if (response.IsSuccessStatusCode)
            {
                string TrnKyString = response.Content.ReadAsStringAsync().Result;
                Key = Convert.ToInt64(TrnKyString);
            }
            return Key;
        }
        public List<EmpAlOl_AcadDataModel> HRISGetOl_AcadDet(string EnvironmentName, int UsrKy, int CKy, string EmpKy)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/HRISEmployee/HRISGetOl_AcadDet?CKy=" + CKy + "&UsrKy=" + UsrKy + "&EmpKy=" + EmpKy + "")).Result;

            List<EmpAlOl_AcadDataModel> ProfDetList = new List<EmpAlOl_AcadDataModel>();
            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<EmpAlOl_AcadDataModel>));
                List<EmpAlOl_AcadDataModel> deserializeditems = new List<EmpAlOl_AcadDataModel>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<EmpAlOl_AcadDataModel>;
                ProfDetList = deserializeditems;
            }
            return ProfDetList;
        }


        public long HRISInsertSL_AcadDet(string EnvironmentName, int CKy, int UsrKy, string EmpHdr, string EmpSLData)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/HRISEmployee/HRISInsertSL_AcadDet?CKy=" + CKy + "&UsrKy=" + UsrKy + "&EmpHdr=" + EmpHdr + "&EmpSLData=" + EmpSLData + "")).Result;
            long Key = 0;
            if (response.IsSuccessStatusCode)
            {
                string TrnKyString = response.Content.ReadAsStringAsync().Result;
                Key = Convert.ToInt64(TrnKyString);
            }
            return Key;
        }
        public List<EmpAlOl_AcadDataModel> HRISGetSL_AcadDet(string EnvironmentName, int UsrKy, int CKy, string EmpKy)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/HRISEmployee/HRISGetSL_AcadDet?CKy=" + CKy + "&UsrKy=" + UsrKy + "&EmpKy=" + EmpKy + "")).Result;

            List<EmpAlOl_AcadDataModel> ProfDetList = new List<EmpAlOl_AcadDataModel>();
            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<EmpAlOl_AcadDataModel>));
                List<EmpAlOl_AcadDataModel> deserializeditems = new List<EmpAlOl_AcadDataModel>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<EmpAlOl_AcadDataModel>;
                ProfDetList = deserializeditems;
            }
            return ProfDetList;
        }



        //public long HRISInsertBankDet(string EnvironmentName, int CKy, int UsrKy, string EmpHdr, string EmpBankData)
        //{
        //    HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/HRISEmployee/HRISInsertBankDet?CKy=" + CKy + "&UsrKy=" + UsrKy + "&EmpHdr=" + EmpHdr + "&EmpBankData=" + EmpBankData + "")).Result;
        //    long Key = 0;
        //    if (response.IsSuccessStatusCode)
        //    {
        //        string TrnKyString = response.Content.ReadAsStringAsync().Result;
        //        Key = Convert.ToInt64(TrnKyString);
        //    }
        //    return Key;
        //}
        //public List<EmpBankDataModel> HRISGetBankDet(string EnvironmentName, int UsrKy, int CKy, string EmpKy)
        //{
        //    HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/HRISEmployee/HRISGetBankDet?CKy=" + CKy + "&UsrKy=" + UsrKy + "&EmpKy=" + EmpKy + "")).Result;

        //    List<EmpBankDataModel> ProfDetList = new List<EmpBankDataModel>();
        //    if (response.IsSuccessStatusCode)
        //    {
        //        string jstr = response.Content.ReadAsStringAsync().Result;
        //        DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<EmpBankDataModel>));
        //        List<EmpBankDataModel> deserializeditems = new List<EmpBankDataModel>();
        //        MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
        //        DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
        //        deserializeditems = ser.ReadObject(ms) as List<EmpBankDataModel>;
        //        ProfDetList = deserializeditems;
        //    }
        //    return ProfDetList;
        //}
        public long HRISInsertVehicleDet(string EnvironmentName, int CKy, int UsrKy, string EmpHdr, string EmpData)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/HRISEmployee/HRISInsertVehicleDet?CKy=" + CKy + "&UsrKy=" + UsrKy + "&EmpHdr=" + EmpHdr + "&EmpData=" + EmpData + "")).Result;
            long Key = 0;
            if (response.IsSuccessStatusCode)
            {
                string TrnKyString = response.Content.ReadAsStringAsync().Result;
                Key = Convert.ToInt64(TrnKyString);
            }
            return Key;
        }
        public List<EmpVehicleDataModel> HRISGetVehicleDet(string EnvironmentName, int UsrKy, int CKy, string EmpKy)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/HRISEmployee/HRISGetVehicleDet?CKy=" + CKy + "&UsrKy=" + UsrKy + "&EmpKy=" + EmpKy + "")).Result;

            List<EmpVehicleDataModel> ProfDetList = new List<EmpVehicleDataModel>();
            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<EmpVehicleDataModel>));
                List<EmpVehicleDataModel> deserializeditems = new List<EmpVehicleDataModel>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<EmpVehicleDataModel>;
                ProfDetList = deserializeditems;
            }
            return ProfDetList;
        }


        public long HRISInsertWelfareLoanDet(string EnvironmentName, int CKy, int UsrKy, string EmpHdr, string EmpData)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/HRISEmployee/HRISInsertWelfareLoanDet?CKy=" + CKy + "&UsrKy=" + UsrKy + "&EmpHdr=" + EmpHdr + "&EmpData=" + EmpData + "")).Result;
            long Key = 0;
            if (response.IsSuccessStatusCode)
            {
                string TrnKyString = response.Content.ReadAsStringAsync().Result;
                Key = Convert.ToInt64(TrnKyString);
            }
            return Key;
        }
        public List<EmpWelfareLoanDatacModel> HRISGetWelfareLoanDet(string EnvironmentName, int UsrKy, int CKy, string EmpKy)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/HRISEmployee/HRISGetWelfareLoanDet?CKy=" + CKy + "&UsrKy=" + UsrKy + "&EmpKy=" + EmpKy + "")).Result;

            List<EmpWelfareLoanDatacModel> ProfDetList = new List<EmpWelfareLoanDatacModel>();
            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<EmpWelfareLoanDatacModel>));
                List<EmpWelfareLoanDatacModel> deserializeditems = new List<EmpWelfareLoanDatacModel>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<EmpWelfareLoanDatacModel>;
                ProfDetList = deserializeditems;
            }
            return ProfDetList;
        }
        public long HRISInsertFuneralDet(string EnvironmentName, int CKy, int UsrKy, string EmpHdr, string EmpData)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/HRISEmployee/HRISInsertFuneralDet?CKy=" + CKy + "&UsrKy=" + UsrKy + "&EmpHdr=" + EmpHdr + "&EmpData=" + EmpData + "")).Result;
            long Key = 0;
            if (response.IsSuccessStatusCode)
            {
                string TrnKyString = response.Content.ReadAsStringAsync().Result;
                Key = Convert.ToInt64(TrnKyString);
            }
            return Key;
        }
        public List<EmpFuneralDataModel> HRISGetFuneralDet(string EnvironmentName, int UsrKy, int CKy, string EmpKy)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/HRISEmployee/HRISGetFuneralDet?CKy=" + CKy + "&UsrKy=" + UsrKy + "&EmpKy=" + EmpKy + "")).Result;

            List<EmpFuneralDataModel> ProfDetList = new List<EmpFuneralDataModel>();
            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<EmpFuneralDataModel>));
                List<EmpFuneralDataModel> deserializeditems = new List<EmpFuneralDataModel>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<EmpFuneralDataModel>;
                ProfDetList = deserializeditems;
            }
            return ProfDetList;
        }


        public long HRISInsertMedicalClaimDet(string EnvironmentName, int CKy, int UsrKy, string EmpHdr, string EmpData)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/HRISEmployee/HRISInsertMedicalClaimDet?CKy=" + CKy + "&UsrKy=" + UsrKy + "&EmpHdr=" + EmpHdr + "&EmpData=" + EmpData + "")).Result;
            long Key = 0;
            if (response.IsSuccessStatusCode)
            {
                string TrnKyString = response.Content.ReadAsStringAsync().Result;
                Key = Convert.ToInt64(TrnKyString);
            }
            return Key;
        }
        public List<EmpMedicalClaimDataModel> HRISGetMedicalClaimDet(string EnvironmentName, int UsrKy, int CKy, string EmpKy)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/HRISEmployee/HRISGetMedicalClaimDet?CKy=" + CKy + "&UsrKy=" + UsrKy + "&EmpKy=" + EmpKy + "")).Result;

            List<EmpMedicalClaimDataModel> ProfDetList = new List<EmpMedicalClaimDataModel>();
            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<EmpMedicalClaimDataModel>));
                List<EmpMedicalClaimDataModel> deserializeditems = new List<EmpMedicalClaimDataModel>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<EmpMedicalClaimDataModel>;
                ProfDetList = deserializeditems;
            }
            return ProfDetList;
        }
        public long HRISInsertDisiplinaryDet(string EnvironmentName, int CKy, int UsrKy, string EmpHdr, string EmpData)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/HRISEmployee/HRISInsertDisiplinaryDet?CKy=" + CKy + "&UsrKy=" + UsrKy + "&EmpHdr=" + EmpHdr + "&EmpData=" + EmpData + "")).Result;
            long Key = 0;
            if (response.IsSuccessStatusCode)
            {
                string TrnKyString = response.Content.ReadAsStringAsync().Result;
                Key = Convert.ToInt64(TrnKyString);
            }
            return Key;
        }
        public List<EmpDisiplinaryDataModel> HRISGetDisiplinaryDet(string EnvironmentName, int UsrKy, int CKy, string EmpKy)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/HRISEmployee/HRISGetDisiplinaryDet?CKy=" + CKy + "&UsrKy=" + UsrKy + "&EmpKy=" + EmpKy + "")).Result;

            List<EmpDisiplinaryDataModel> ProfDetList = new List<EmpDisiplinaryDataModel>();
            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<EmpDisiplinaryDataModel>));
                List<EmpDisiplinaryDataModel> deserializeditems = new List<EmpDisiplinaryDataModel>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<EmpDisiplinaryDataModel>;
                ProfDetList = deserializeditems;
            }
            return ProfDetList;
        }




        public long HRISInsertAssetDet(string EnvironmentName, int CKy, int UsrKy, string EmpHdr, string EmpData)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/HRISEmployee/HRISInsertAssetDet?CKy=" + CKy + "&UsrKy=" + UsrKy + "&EmpHdr=" + EmpHdr + "&EmpData=" + EmpData + "")).Result;
            long Key = 0;
            if (response.IsSuccessStatusCode)
            {
                string TrnKyString = response.Content.ReadAsStringAsync().Result;
                Key = Convert.ToInt64(TrnKyString);
            }
            return Key;
        }
        public List<EmpAssetataModel> HRISGetAssetDet(string EnvironmentName, int UsrKy, int CKy, string EmpKy)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/HRISEmployee/HRISGetAssetDet?CKy=" + CKy + "&UsrKy=" + UsrKy + "&EmpKy=" + EmpKy + "")).Result;

            List<EmpAssetataModel> ProfDetList = new List<EmpAssetataModel>();
            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<EmpAssetataModel>));
                List<EmpAssetataModel> deserializeditems = new List<EmpAssetataModel>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<EmpAssetataModel>;
                ProfDetList = deserializeditems;
            }
            return ProfDetList;
        }
       
        
        public long HRISInsertPhoneInternetDet(string EnvironmentName, int CKy, int UsrKy, string EmpHdr, string EmpData)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/HRISEmployee/HRISInsertPhoneInternetDet?CKy=" + CKy + "&UsrKy=" + UsrKy + "&EmpHdr=" + EmpHdr + "&EmpData=" + EmpData + "")).Result;
            long Key = 0;
            if (response.IsSuccessStatusCode)
            {
                string TrnKyString = response.Content.ReadAsStringAsync().Result;
                Key = Convert.ToInt64(TrnKyString);
            }
            return Key;
        }
        public List<EmpPhoneDataModel> HRISGetPhoneInternetDet(string EnvironmentName, int UsrKy, int CKy, string EmpKy)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/HRISEmployee/HRISGetPhoneInternetDet?CKy=" + CKy + "&UsrKy=" + UsrKy + "&EmpKy=" + EmpKy + "")).Result;

            List<EmpPhoneDataModel> ProfDetList = new List<EmpPhoneDataModel>();
            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<EmpPhoneDataModel>));
                List<EmpPhoneDataModel> deserializeditems = new List<EmpPhoneDataModel>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<EmpPhoneDataModel>;
                ProfDetList = deserializeditems;
            }
            return ProfDetList;
        }



        public long HRISInsertAnnualPerDet(string EnvironmentName, int CKy, int UsrKy, string EmpHdr, string EmpData)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/HRISEmployee/HRISInsertAnnualPerDet?CKy=" + CKy + "&UsrKy=" + UsrKy + "&EmpHdr=" + EmpHdr + "&EmpData=" + EmpData + "")).Result;
            long Key = 0;
            if (response.IsSuccessStatusCode)
            {
                string TrnKyString = response.Content.ReadAsStringAsync().Result;
                Key = Convert.ToInt64(TrnKyString);
            }
            return Key;
        }
        public List<EmpPhoneDataModel> HRISGetAnnualPerDet(string EnvironmentName, int UsrKy, int CKy, string EmpKy)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/HRISEmployee/HRISGetAnnualPerDet?CKy=" + CKy + "&UsrKy=" + UsrKy + "&EmpKy=" + EmpKy + "")).Result;

            List<EmpPhoneDataModel> ProfDetList = new List<EmpPhoneDataModel>();
            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<EmpPhoneDataModel>));
                List<EmpPhoneDataModel> deserializeditems = new List<EmpPhoneDataModel>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<EmpPhoneDataModel>;
                ProfDetList = deserializeditems;
            }
            return ProfDetList;
        }

        public List<CompanyDataModel> HRISGetCompanyDet(string EnvironmentName, int UsrKy, int CKy, string CompanyKy)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/HRISEmployee/HRISGetCompanyDet?CKy=" + CKy + "&UsrKy=" + UsrKy + "&CompanyKy=" + CompanyKy + "")).Result;

            List<CompanyDataModel> ProfDetList = new List<CompanyDataModel>();
            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<CompanyDataModel>));
                List<CompanyDataModel> deserializeditems = new List<CompanyDataModel>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<CompanyDataModel>;
                ProfDetList = deserializeditems;
            }
            return ProfDetList;
        }
    }
}
