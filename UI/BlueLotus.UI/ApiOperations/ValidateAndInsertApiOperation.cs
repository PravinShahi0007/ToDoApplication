using BlueLotus.BOQImport.Entity;
using BlueLotus.Codes.Model.Entity;
using BlueLotus.Gantt.ViewModel.Entity;
using BlueLotus.ImportModel.Entity;
using BlueLotus.ViewModel.Entity;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Script.Serialization;

namespace BlueLotus.UI.ApiOperations
{
    public partial class ApiOperation
    {

        string validateAndInsertBaseUri = "api/ValidateAndInsert/";

        #region ValidateAndInsert

        internal UnitXml ValidateAndInsertUnitMas(string EnvironmentName, string UnitCd, int CKy, int UsrKy)
        {
            string actionUri = "ValidateAndInsertUnitMas";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("UnitCd", UnitCd);

            UnitXml list = new UnitXml();
            list = RunApiOperation(
                validateAndInsertBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as UnitXml;

            return list;
        }


        internal BankXml ValidateAndInsertBnkMas(string EnvironmentName, string BnkCd, int CKy, int UsrKy)
        {
            string actionUri = "ValidateAndInsertBnkMas";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("BnkCd", BnkCd);

            BankXml list = new BankXml();
            list = RunApiOperation(
                validateAndInsertBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as BankXml;

            return list;
        }

        internal BranchXml ValidateAndInsertBrnMas(string EnvironmentName, int BnkKy, string BrnCd, int CKy, int UsrKy)
        {
            string actionUri = "ValidateAndInsertBrnMas";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("BrnCd", BrnCd);
            paramDictionary.Add("BnkKy", BnkKy);

            BranchXml list = new BranchXml();
            list = RunApiOperation(
                validateAndInsertBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as BranchXml;

            return list;
        }

        internal bool ValidateAndInsertAdrMasCd(string EnvironmentName, int AdrKy, int BnkKy, int BrnKy, string MobileBusiness, 
            string MobilePersonal, string EmailBusiness, string EmailPersonal, int CKy, int UsrKy)
        {
            string actionUri = "ValidateAndInsertAdrMasCd";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("AdrKy", AdrKy);
            paramDictionary.Add("BnkKy", BnkKy);
            paramDictionary.Add("BrnKy", BrnKy);
            paramDictionary.Add("MobileBusiness", MobileBusiness);
            paramDictionary.Add("MobilePersonal", MobilePersonal);
            paramDictionary.Add("EmailBusiness", EmailBusiness);
            paramDictionary.Add("EmailPersonal", EmailPersonal);
            

            object list = new object();
            list = RunApiOperation(
                validateAndInsertBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as object;

            return Convert.ToBoolean(list);
        }

        internal bool ValidateAndInsertAccMasCdDt(string EnvironmentName, int AccKy ,string CrLimit, string CrPeriod, int CKy, int UsrKy)
        {
            string actionUri = "ValidateAndInsertAccMasCdDt";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("AccKy", AccKy);
            paramDictionary.Add("CrLimit", CrLimit);
            paramDictionary.Add("CrPeriod", CrPeriod);
            
            object list = new object();
            list = RunApiOperation(
                validateAndInsertBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as object;

            return Convert.ToBoolean(list);
        }


        internal bool ValidateAndInsertAdrMasDet(string EnvironmentName, int AdrKy, string Street, string City, int CKy, int UsrKy, int CountryKy = 1, int EletorateKy = 1, int ProvinceKy = 1)
        {
            string actionUri = "ValidateAndInsertAdrMasDet";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("AdrKy", AdrKy);
            paramDictionary.Add("Street", Street);
            paramDictionary.Add("City", City);
            paramDictionary.Add("CountryKy", CountryKy);
            paramDictionary.Add("EletorateKy", EletorateKy);
            paramDictionary.Add("ProvinceKy", ProvinceKy);


            object list = new object();
            list = RunApiOperation(
                validateAndInsertBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as object;

            return Convert.ToBoolean(list);
        }


        internal AccMas ValidateAndInsertAccMas(string EnvironmentName, string AccCode, string AccName, int AccTypKy, int CrnKy, int BUKy, int AccCat1Ky, int AccCat2Ky, 
            int BnkKy, int BrnKy, string BankAccNo, string VATNo, string SVATNo, int CKy, int UsrKy, int type = 1)
        {
            string actionUri = "ValidateAndInsertAccMas";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("AccCode", AccCode);
            paramDictionary.Add("AccName", AccName);
            paramDictionary.Add("AccTypKy", AccTypKy);
            paramDictionary.Add("BUKy", BUKy);
            paramDictionary.Add("CrnKy", CrnKy);
            paramDictionary.Add("AccCat2Ky", AccCat2Ky);
            paramDictionary.Add("AccCat1Ky", AccCat1Ky);
            paramDictionary.Add("BnkKy", BnkKy);
            paramDictionary.Add("BrnKy", BrnKy);
            paramDictionary.Add("BankAccNo", BankAccNo);
            paramDictionary.Add("VATNo", VATNo);
            paramDictionary.Add("SVATNo", SVATNo);
            paramDictionary.Add("type", type);

            AccMas list = new AccMas();
            list = RunApiOperation(
                validateAndInsertBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as AccMas;

            return list;
 
        }

        internal ItmEANXml ValidateAndInsertItmMasEAN(string EnvironmentName, int ItmKy, string EAN, int CKy, int UsrKy)
        {
            string actionUri = "ValidateAndInsertItmMasEAN";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("ItmKy", ItmKy);
            paramDictionary.Add("EAN", EAN);

            ItmEANXml list = new ItmEANXml();
            list = RunApiOperation(
                validateAndInsertBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as ItmEANXml;

            return list;
        }

        internal ItmTaxXml ValidateAndInsertItmTax(string EnvironmentName, int ItmKy, int ItmTypKy, double Value, int ItmTaxCatKy, string EftvDt, int CKy, int UsrKy)
        {
            string actionUri = "ValidateAndInsertItmTax";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("ItmKy", ItmKy);
            paramDictionary.Add("ItmTypKy", ItmTypKy);
            paramDictionary.Add("Value", Value);
            paramDictionary.Add("ItmTaxCatKy", ItmTaxCatKy);
            paramDictionary.Add("EftvDt", EftvDt);

            ItmTaxXml list = new ItmTaxXml();
            list = RunApiOperation(
                validateAndInsertBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as ItmTaxXml;

            return list;
        }


        internal ItmRateXml ValidateAndInsertItmRate(string EnvironmentName, int ItmKy, double SlsPri, double CosPri, int LocKy, string EftvDt, int CKy, int UsrKy)
        {
            string actionUri = "ValidateAndInsertItmRate";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("ItmKy", ItmKy);
            paramDictionary.Add("SlsPri", SlsPri);
            paramDictionary.Add("CosPri", CosPri);
            paramDictionary.Add("LocKy", LocKy);
            paramDictionary.Add("EftvDt", EftvDt);

            ItmRateXml list = new ItmRateXml();
            list = RunApiOperation(
                validateAndInsertBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as ItmRateXml;

            return list;
        }

        private AccTrn ValidateAndInsertAccTrn(string EnvironmentName, long TrnKy, long ContraAcctrnKy, long TrnTypKy, int PmtModeKy, int PrjKy, string ChequeDate, string ChequeNo, string Description,
            int AccKy, int AdrKy, double ClsBal, string DocNo, int BUKy, string Date, int LiNo, int CKy, int UsrKy)
        {
            string actionUri = "ValidateAndInsertAccTrn";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("AccKy", AccKy);
            paramDictionary.Add("ClsBal", ClsBal);
            paramDictionary.Add("DocNo", DocNo);
            paramDictionary.Add("Date", Date);
            paramDictionary.Add("LiNo", LiNo);
            paramDictionary.Add("BUKy", BUKy);
            paramDictionary.Add("AdrKy", AdrKy);
            paramDictionary.Add("TrnTypKy", TrnTypKy);
            paramDictionary.Add("PmtModeKy", PmtModeKy);
            paramDictionary.Add("PrjKy", PrjKy);
            paramDictionary.Add("ChequeDate", ChequeDate);
            paramDictionary.Add("ChequeNo", ChequeNo);
            paramDictionary.Add("Description", Description);
            paramDictionary.Add("TrnKy", TrnKy);
            paramDictionary.Add("ContraAcctrnKy", ContraAcctrnKy);

            AccTrn list = new AccTrn();
            list = RunApiOperation(
                validateAndInsertBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as AccTrn;

            return list;
        }

        internal bool ValidateAndInsertItmTrn(string EnvironmentName, long TrnTypKy, int ItmKy, int PrjKy, double Qty, int LocKy, int UnitKy, string Date, int LiNo, int CKy, int UsrKy, double Rate = 0, double TaxPer = 0, double TaxAmt = 0, int CusAdrKy = 1, int CusAccKy = 1, int SupAccKy = 1, int ContraAccObjKy = 1, int AccObjKy = 1, string TrnType = "", string DocNo = "", string Description = "")
        {
            string actionUri = "ValidateAndInsertItmTrn";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("ItmKy", ItmKy);
            paramDictionary.Add("PrjKy", PrjKy);
            paramDictionary.Add("Qty", Qty);
            paramDictionary.Add("LocKy", LocKy);
            paramDictionary.Add("Date", Date);
            paramDictionary.Add("LiNo", LiNo);
            paramDictionary.Add("UnitKy", UnitKy);
            paramDictionary.Add("TrnTypKy", TrnTypKy);
            paramDictionary.Add("Rate", Rate);
            paramDictionary.Add("TaxPer", TaxPer);
            paramDictionary.Add("TaxAmt", TaxAmt);
            paramDictionary.Add("CusAdrKy", CusAdrKy);
            paramDictionary.Add("CusAccKy", CusAccKy);
            paramDictionary.Add("SupAccKy", SupAccKy);
            paramDictionary.Add("ContraAccObjKy", ContraAccObjKy);
            paramDictionary.Add("AccObjKy", AccObjKy);
            paramDictionary.Add("TrnType", TrnType);
            paramDictionary.Add("DocNo", DocNo);
            paramDictionary.Add("Description", Description);
        

            object list = new object();
            list = RunApiOperation(
                validateAndInsertBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as object;

            return Convert.ToBoolean(list);
        }


        internal CdMasXml ValidateAndInsertCdMas(string EnvironmentName, string Code, string CdNm, string ConCd, int CKy, int UsrKy, double CdNo1 = 0, string OurCd = "")
        {
            string actionUri = "ValidateAndInsertCdMas";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("Code", Code);
            paramDictionary.Add("CdNm", CdNm);
            paramDictionary.Add("OurCd", OurCd);
            paramDictionary.Add("ConCd", ConCd);
            paramDictionary.Add("CdNo1", CdNo1);

            CdMasXml list = new CdMasXml();
            list = RunApiOperation(
                validateAndInsertBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as CdMasXml;

            return list;
        }

        internal ProjectXml ValidateAndInsertPrjHdr(string EnvironmentName, string ProjectId, string PrjNm, int CKy, int UsrKy)
        {
            string actionUri = "ValidateAndInsertPrjHdr";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("ProjectId", ProjectId);
            paramDictionary.Add("PrjNm", PrjNm);

            ProjectXml list = new ProjectXml();
            list = RunApiOperation(
                validateAndInsertBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as ProjectXml;

            return list;
        }


        internal bool ValidateAndInsertEmpMasCdDt(string EnvironmentName, int EmpKy, int AdrKy, int DesignationKy , int NatureofEmployementKy , 
            int EmpTypKy , int LocKy , int DepartmentKy, int EmpGrdKy, int CompanyKy, string BasicSalary, string DateofJoin, string EftvDate, int CKy, int UsrKy)
        {
            string actionUri = "ValidateAndInsertEmpMasCdDt";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("EmpKy", EmpKy);
            paramDictionary.Add("AdrKy", AdrKy);
            paramDictionary.Add("LocKy", LocKy);
            paramDictionary.Add("EftvDate", EftvDate);
            paramDictionary.Add("NatureofEmployementKy", NatureofEmployementKy);
            paramDictionary.Add("DesignationKy", DesignationKy);
            paramDictionary.Add("EmpTypKy", EmpTypKy);
            paramDictionary.Add("DepartmentKy", DepartmentKy);
            paramDictionary.Add("EmpGrdKy", EmpGrdKy);
            paramDictionary.Add("CompanyKy", CompanyKy);
            paramDictionary.Add("BasicSalary", BasicSalary);
            paramDictionary.Add("DateofJoin", DateofJoin);


            object list = new object();
            list = RunApiOperation(
                validateAndInsertBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as object;

            return Convert.ToBoolean(list);
        }


        internal bool ValidateAndInsertEmpRate(string EnvironmentName, int AdrKy, int ItmKy, int PriLocKy, string EftvDate, double Rate, int CKy, int UsrKy)
        {
            string actionUri = "ValidateAndInsertEmpRate";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("ItmKy", ItmKy);
            paramDictionary.Add("AdrKy", AdrKy);
            paramDictionary.Add("PriLocKy", PriLocKy);
            paramDictionary.Add("EftvDate", EftvDate);
            paramDictionary.Add("Rate", Rate);


            object list = new object();
            list = RunApiOperation(
                validateAndInsertBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as object;

            return Convert.ToBoolean(list);
        }



        internal EmpMas ValidateAndInsertEmpMas(string EnvironmentName, int EmpTypKy, int CountryKy, int NationalityKy , int GenderKy, int ReligionKy, int BloodGroupKy, int TitleKy, int CivilStatKy,
        string EmpNo, string EmpFullName , string DateofJoin , string NICNo , string EpfNo , string DateofBirth , string PassportNo , string NamewithInitial, string PassportExpDt, int CKy, int UsrKy)
        {
            string actionUri = "ValidateAndInsertEmpMas";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("EmpTypKy", EmpTypKy);
            paramDictionary.Add("CountryKy", CountryKy);
            paramDictionary.Add("NationalityKy", NationalityKy);
            paramDictionary.Add("EmpNm", EmpFullName);
            paramDictionary.Add("DateofJoin", DateofJoin);
            paramDictionary.Add("NIC", NICNo);
            paramDictionary.Add("EPFNo", EpfNo);
            paramDictionary.Add("DtBirth", DateofBirth);
            paramDictionary.Add("PassportNo", PassportNo);
            paramDictionary.Add("GenderKy", GenderKy);
            paramDictionary.Add("ReligionKy", ReligionKy);
            paramDictionary.Add("BloodGroupKy", BloodGroupKy);
            paramDictionary.Add("TitleKy", TitleKy);
            paramDictionary.Add("EmpNo", EmpNo);
            paramDictionary.Add("NameInInitials", NamewithInitial);
            paramDictionary.Add("PassportExpDt", PassportExpDt);
            paramDictionary.Add("CivilStatKy", CivilStatKy);


            EmpMas list = new EmpMas();
            list = RunApiOperation(
                validateAndInsertBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as EmpMas;

            return list;
        }


        internal ItmMasXml ValidateAndInsertItmMas(string EnvironmentName, string ItmCd, string ItmTyp, string ItmNm, int CKy, int UsrKy, int ItmTypKy = 0,
            int BrandKy = 0, int ModelKy = 0, int ItmCat1Ky = 0, int ItmCat2Ky = 0, int ItmCat3Ky = 0, int ItmCat4Ky = 0, int ItmCat5Ky = 0, int ItmCat6Ky = 0, int ItmCat7Ky = 0, int ItmCat8Ky = 0, int ItmCat9Ky = 0, int ItmCat10Ky = 0, int ItmCat11Ky = 0, int ItmCat12Ky = 0,
            int UnitKy = 0, double ReOrdLvl = 0, double ReOrdQty = 0, bool isAct = true, bool isAgeVarification = false, bool isAlwTrnRateChange = false)
        {
            string actionUri = "ValidateAndInsertItmMas";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("ItmCd", ItmCd);
            paramDictionary.Add("ItmTyp", ItmTyp);
            paramDictionary.Add("ItmNm", ItmNm);
            paramDictionary.Add("ItmTypKy", ItmTypKy);
            paramDictionary.Add("BrandKy", BrandKy);
            paramDictionary.Add("ModelKy", ModelKy);
            paramDictionary.Add("UnitKy", UnitKy);
            paramDictionary.Add("ItmCat1Ky", ItmCat1Ky);
            paramDictionary.Add("ItmCat2Ky", ItmCat2Ky);
            paramDictionary.Add("ItmCat3Ky", ItmCat3Ky);
            paramDictionary.Add("ItmCat4Ky", ItmCat4Ky);
            paramDictionary.Add("ItmCat5Ky", ItmCat5Ky);
            paramDictionary.Add("ItmCat6Ky", ItmCat6Ky);
            paramDictionary.Add("ItmCat7Ky", ItmCat7Ky);
            paramDictionary.Add("ItmCat8Ky", ItmCat8Ky);
            paramDictionary.Add("ItmCat9Ky", ItmCat9Ky);
            paramDictionary.Add("ItmCat10Ky", ItmCat10Ky);
            paramDictionary.Add("ItmCat11Ky", ItmCat11Ky);
            paramDictionary.Add("ItmCat12Ky", ItmCat12Ky);
            paramDictionary.Add("isAct", isAct);
            paramDictionary.Add("isAgeVarification", isAgeVarification);
            paramDictionary.Add("isAlwTrnRateChange", isAlwTrnRateChange);
            paramDictionary.Add("ReOrdLvl", ReOrdLvl);
            paramDictionary.Add("ReOrdQty", ReOrdQty);

            ItmMasXml list = new ItmMasXml();
            list = RunApiOperation(
                validateAndInsertBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as ItmMasXml;

            return list;
        }

        internal PrcsDetXml ValidateAndInsertPMTask(string EnvironmentName, int PrjKy, int PrcsSchKy,
            string TaskID, string TaskNm, string LiNo, string StDt, string ToDt, int IndentLvl,
            double Qty, double Rate, int TrnUnitKy, int CKy, int UsrKy)
        {
            string actionUri = "ValidateAndInsertPMTask";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("PrjKy", PrjKy);
            paramDictionary.Add("PrcsSchKy", PrcsSchKy);
            paramDictionary.Add("TaskID", TaskID);
            paramDictionary.Add("TaskNm", TaskNm);

            paramDictionary.Add("LiNo", LiNo);
            paramDictionary.Add("StDt", StDt);
            paramDictionary.Add("ToDt", ToDt);
            paramDictionary.Add("IndentLvl", IndentLvl);
            paramDictionary.Add("Qty", Qty);
            paramDictionary.Add("Rate", Rate);
            paramDictionary.Add("TrnUnitKy", TrnUnitKy);

            PrcsDetXml list = new PrcsDetXml();
            list = RunApiOperation(
                validateAndInsertBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as PrcsDetXml;

            return list;
        }

        internal PrcsSchDetCmpnXml ValidateAndInsertPMResource(string EnvironmentName, int PrcsSchDetKy, int PrcsDetKy,
           int FinItmKy, int ItmKy, int AdrKy, string LiNo, double Qty, double TrnQty, double Rate, double TrnRate, int TrnUnitKy, int CKy, int UsrKy)
        {
            string actionUri = "ValidateAndInsertPMResource";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("PrcsSchDetKy", PrcsSchDetKy);
            paramDictionary.Add("PrcsDetKy", PrcsDetKy);
            paramDictionary.Add("FinItmKy", FinItmKy);
            paramDictionary.Add("ItmKy", ItmKy);

            paramDictionary.Add("AdrKy", AdrKy);
            paramDictionary.Add("LiNo", LiNo);
            paramDictionary.Add("Qty", Qty);
            paramDictionary.Add("TrnQty", TrnQty);
            paramDictionary.Add("Rate", Rate);
            paramDictionary.Add("TrnRate", TrnRate);
            paramDictionary.Add("TrnUnitKy", TrnUnitKy);

            PrcsSchDetCmpnXml list = new PrcsSchDetCmpnXml();
            list = RunApiOperation(
                validateAndInsertBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as PrcsSchDetCmpnXml;

            return list;
        }

        internal bool ValidateAndInsertBOQ(string EnvironmentName, int UnitKy, int OrdTypKy,string TaskID,string TaskName,string OrdDt,
            string Rate,string Quantity, int LiNo, int OrdKy, int CKy, int UsrKy)
        {
            string actionUri = "ValidateAndInsertBOQ";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("UnitKy", UnitKy);
            paramDictionary.Add("OrdTypKy", OrdTypKy);
            paramDictionary.Add("TaskID", TaskID);
            paramDictionary.Add("TaskName", TaskName);
            paramDictionary.Add("OrdDt", OrdDt);
            paramDictionary.Add("Rate", Rate);
            paramDictionary.Add("Quantity", Quantity);
            paramDictionary.Add("LiNo", LiNo);
            paramDictionary.Add("OrdKy", OrdKy);

            bool list = new bool();
            object alist = RunApiOperation(
                validateAndInsertBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as object ;

            return Convert.ToBoolean(alist);
        }

        internal int ValidateAndInsertOrdHdr(string EnvironmentName, int OrdTypKy, string OrdDt, int CKy, int UsrKy)
        {
            string actionUri = "ValidateAndInsertOrdHdr";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("OrdTypKy", OrdTypKy);
            paramDictionary.Add("OrdDt", OrdDt);

            object list = new object();
            list = RunApiOperation(
                validateAndInsertBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as object;

            return Convert.ToInt32(list);
        }

        internal SerNoXml ValidateAndInsertSerNo(string EnvironmentName, int ItmKy, string SerNo, string EngineNo, string CusSerNo, int CKy, int UsrKy)
        {
            string actionUri = "ValidateAndInsertSerNo";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("ItmKy", ItmKy);
            paramDictionary.Add("SerNo", SerNo);
            paramDictionary.Add("EngineNo", EngineNo);
            paramDictionary.Add("CusSerNo", CusSerNo);
            

            SerNoXml list = new SerNoXml();
            list = RunApiOperation(
                validateAndInsertBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as SerNoXml;

            return list;
        }


        #endregion Import

    }
}
