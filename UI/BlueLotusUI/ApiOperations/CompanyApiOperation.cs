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
using Newtonsoft.Json;

namespace BlueLotus.UI.ApiOperations
{
    public partial class ApiOperation
    {
        string baseUri = "api/Company/";

        public List<Company> GetCompany_LookUpWeb(string EnvironmentName, int UsrKy)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/Company/GetCompany_LookUpWeb?UsrKy=" + UsrKy + "")).Result;

            List<Company> companyList = new List<Company>();
            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<Company>));
                List<Company> deserializeditems = new List<Company>();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as List<Company>;
                companyList = deserializeditems;
            }
            return companyList;
        }

        public Company GetLoggedCompany(string EnvironmentName, int CKy, int UsrKy)
        {
            HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/Company/GetLoggedCompany?CKy=" + CKy + "&UsrKy=" + UsrKy + "")).Result;

            Company companyList = new Company();
            if (response.IsSuccessStatusCode)
            {
                string jstr = response.Content.ReadAsStringAsync().Result;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(Company));
                Company deserializeditems = new Company();
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jstr));
                DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializeditems.GetType());
                deserializeditems = ser.ReadObject(ms) as Company;
                companyList = deserializeditems;
            }
            return companyList;
        }

        internal bool CmpnyInsert(string EnvironmentName, int CKy, int UsrKy, string CCd, string CNm, string Address, string Town, string City, string Country, string TP1, string TP2, string Email, int FrmCKy,int PrntCKy,int isBnkBrch)
        {
            string actionUri = "InsertDetails";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

           // paramDictionary.Add("FrmCKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("CCd", CCd);
            paramDictionary.Add("CNm", CNm);
            paramDictionary.Add("Address", Address);
            paramDictionary.Add("Town", Town);
            paramDictionary.Add("City", City);
            paramDictionary.Add("Country", Country);
            paramDictionary.Add("TP1", TP1);
            paramDictionary.Add("TP2", TP2);
            paramDictionary.Add("Email", Email);
            paramDictionary.Add("FrmCKy", FrmCKy);
            paramDictionary.Add("PrntCKy", PrntCKy);
            paramDictionary.Add("isBnkBrch", isBnkBrch);
           // paramDictionary.Add("EnvironmentName", EnvironmentName);

            bool Reset = new bool();
            object obj = RunApiOperation(
                baseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                Reset.GetType());

            Reset = Convert.ToBoolean(obj);

            return true;
        }

        internal bool CmpnyUpdate(string EnvironmentName, int cKy, int usrKy, string objKy, string code, string cname, string address, string town, string city, string country, string tel1, string tel2, string tel3, string fax, string email, string tax, string web, string moto, string fYSD, string tCD, string remark, string multiProject, string alert, string multiBU, string monthlyDepreciation, string multiLocation, string partNo, string multiCurrency, string isAct, string EPFRegNo)
        {
            string actionUri = "CmpnyUpdate";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            // paramDictionary.Add("FrmCKy", CKy);
            paramDictionary.Add("code" , code);
            paramDictionary.Add("cname" , cname);
            paramDictionary.Add("Address" , address);
            paramDictionary.Add("Town" , town);
            paramDictionary.Add("City" , city);
            paramDictionary.Add("country" , country);
            paramDictionary.Add("Tel1" , tel1);
            paramDictionary.Add("Tel2" , tel2);
            paramDictionary.Add("Tel3" , tel3);
            paramDictionary.Add("Fax" , fax);
            paramDictionary.Add("Email" , email);
            paramDictionary.Add("Tax" , tax);
            paramDictionary.Add("Web" , web);
            paramDictionary.Add("moto" , moto);
            paramDictionary.Add("FYSD" , fYSD);
            paramDictionary.Add("TCD" , tCD);
            paramDictionary.Add("Remark" , remark);
            paramDictionary.Add("MultiProject" , multiProject);
            paramDictionary.Add("Alert" , alert);
            paramDictionary.Add("MultiBU" , multiBU);
            paramDictionary.Add("MonthlyDepreciation" , monthlyDepreciation);
            paramDictionary.Add("MultiLocation" , multiLocation);
            paramDictionary.Add("PartNo" , partNo);
            paramDictionary.Add("MultiCurrency" , multiCurrency);
            paramDictionary.Add("isAct" , isAct); 
            paramDictionary.Add("EPFRegNo", EPFRegNo); 
            paramDictionary.Add("cKy", cKy);
            paramDictionary.Add("usrKy", usrKy);
            paramDictionary.Add("objKy", objKy);

            // paramDictionary.Add("EnvironmentName", EnvironmentName);

            bool Reset = new bool();
            object obj = RunApiOperation(
                baseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                Reset.GetType());

            Reset = Convert.ToBoolean(obj);

            return true;
        }

        internal List<CompanySelect> CmpDetEnt_Select(string EnvironmentName, int UsrKy, int CKy)
        {
            string actionUri = "CmpDetEnt_Select";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("CKy", CKy);

            List<CompanySelect> List = new List<CompanySelect>();
            List = RunApiOperation(
                baseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                List.GetType()) as List<CompanySelect>;

            return List;
        }

        internal List<CompanyMenu> GetCompanyMenuUsrObj_SelectWeb(string EnvironmentName, int UsrKy, int CKy)
        {
            string actionUri = "GetCompanyMenuUsrObj_SelectWeb";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();
            
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("CKy", CKy);
            
            List<CompanyMenu> List = new List<CompanyMenu>();
            List = RunApiOperation(
                baseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                List.GetType()) as List<CompanyMenu>;

            return List;
        }

        public bool UsrObj_InsertUpdateWeb(string EnvironmentName, string updateGrid, string newGrid, int CKy, int UsrKy)
        {
            int InsertFinished = 0;
            int UpdateFinished = 0;
            int NewRecordLength = 0;
            int UpdateRecordLength = 0;
            bool result = false;

            if (updateGrid != "[]" && updateGrid != "[null]" && updateGrid != "")
            {
                try
                {
                    CompanyMenu[] NewCodes = JsonConvert.DeserializeObject<CompanyMenu[]>(updateGrid);
                    //CompanyMenu[] NewCodes = new JavaScriptSerializer().Deserialize<CompanyMenu[]>(updateGrid);
                    NewRecordLength = NewCodes.Length;

                    for (int i = 0; i < NewCodes.Length; i++)
                    {

                        string actionUri = "UsrObj_InsertUpdateWeb";
                        Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

                        List<CompanyMenu> lst = new List<CompanyMenu>();
                        lst.Add(NewCodes[i]);
                        var NewmodelString = JsonConvert.SerializeObject(lst);
                        //string NewmodelString = new JavaScriptSerializer().Serialize(NewCodes[i]);

                        paramDictionary.Add("CKy", CKy);
                        paramDictionary.Add("UsrKy", UsrKy);
                        paramDictionary.Add("updateGrid", NewmodelString);
                        paramDictionary.Add("newGrid", newGrid);

                        bool Reset = new bool();
                        object obj = RunApiOperation(
                            baseUri,
                            actionUri,
                            EnvironmentName,
                            paramDictionary,
                            Reset.GetType());

                        Reset = Convert.ToBoolean(obj);
                        InsertFinished++;
                        result= true;
                    }
                    
                }
                catch (Exception ex)
                {

                    throw ex;
                    return result;
                }
                return result;
            }
            return result;
        }
    }
}