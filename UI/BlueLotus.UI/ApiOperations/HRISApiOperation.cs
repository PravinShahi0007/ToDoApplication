using BlueLotus.HRIS.Model.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BlueLotus.UI.ApiOperations
{
    public partial class ApiOperation
    {
        string HRISBaseUrl = "api/HRIS/";

        internal List<HRISDataModel> InsertBasicDet(string Environment, int UsrKy, int CKy, string HdrDataString, string DetDataString)
        {
            string actionUri = "InsertBasicDet";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();
            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("HdrDataString", HdrDataString);
            paramDictionary.Add("DetDataString", DetDataString);

            List<HRISDataModel> List = new List<HRISDataModel>();
            List = RunApiOperation(
                HRISBaseUrl,
                actionUri,
                Environment,
                paramDictionary,
                List.GetType()) as List<HRISDataModel>;

            return List;
        }
        internal List<HRISPersonalDataModel> GetPersonalDet(string Environment, int UsrKy, int CKy, int EmpKy, string AppCustmPath)
        {
            string actionUri = "GetPersonalDet";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();
            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("EmpKy", EmpKy);
            paramDictionary.Add("AppCustmPath", AppCustmPath);

            List<HRISPersonalDataModel> List = new List<HRISPersonalDataModel>();
            List = RunApiOperation(
                HRISBaseUrl,
                actionUri,
                Environment,
                paramDictionary,
                List.GetType()) as List<HRISPersonalDataModel>;

            return List;
        }
        internal List<HRISOtherDataModel> InsertOtherMembershipDet(string Environment, int UsrKy, int CKy, string HdrDataString, string DetDataString)
        {
            string actionUri = "InsertOtherMembershipDet";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();
            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("HdrDataString", HdrDataString);
            paramDictionary.Add("DetDataString", DetDataString);

            List<HRISOtherDataModel> List = new List<HRISOtherDataModel>();
            List = RunApiOperation(
                HRISBaseUrl,
                actionUri,
                Environment,
                paramDictionary,
                List.GetType()) as List<HRISOtherDataModel>;

            return List;
        }
        
        internal List<HRISOtherDataModel> InsertOtherTrainingDet(string Environment, int UsrKy, int CKy, string HdrDataString, string DetDataString)
        {
            string actionUri = "InsertOtherTrainingDet";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();
            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("HdrDataString", HdrDataString);
            paramDictionary.Add("DetDataString", DetDataString);

            List<HRISOtherDataModel> List = new List<HRISOtherDataModel>();
            List = RunApiOperation(
                HRISBaseUrl,
                actionUri,
                Environment,
                paramDictionary,
                List.GetType()) as List<HRISOtherDataModel>;

            return List;
        }
        internal List<HRISOtherDataModel> GetOtherDet(string Environment, int UsrKy, int CKy, int EmpKy)
        {
            string actionUri = "GetOtherDet";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();
            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("EmpKy", EmpKy);

            List<HRISOtherDataModel> List = new List<HRISOtherDataModel>();
            List = RunApiOperation(
                HRISBaseUrl,
                actionUri,
                Environment,
                paramDictionary,
                List.GetType()) as List<HRISOtherDataModel>;

            return List;
        }
        internal List<HRISWelfareDataModel> InsertWelfareDet(string Environment, int UsrKy, int CKy, string HdrDataString, string DetDataString)
        {
            string actionUri = "InsertWelfareDet";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();
            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("HdrDataString", HdrDataString);
            paramDictionary.Add("DetDataString", DetDataString);

            List<HRISWelfareDataModel> List = new List<HRISWelfareDataModel>();
            List = RunApiOperation(
                HRISBaseUrl,
                actionUri,
                Environment,
                paramDictionary,
                List.GetType()) as List<HRISWelfareDataModel>;

            return List;
        }
        internal List<HRISSalaryDataModel> InsertSalaryDet(string Environment, int UsrKy, int CKy, string HdrDataString, string DetDataString)
        {
            string actionUri = "InsertSalaryDet";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();
            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("HdrDataString", HdrDataString);
            paramDictionary.Add("DetDataString", DetDataString);

            List<HRISSalaryDataModel> List = new List<HRISSalaryDataModel>();
            List = RunApiOperation(
                HRISBaseUrl,
                actionUri,
                Environment,
                paramDictionary,
                List.GetType()) as List<HRISSalaryDataModel>;

            return List;
        }
        internal List<HRISSalaryDataModel> GetSalaryDet(string Environment, int UsrKy, int CKy, int EmpKy)
        {
            string actionUri = "GetSalaryDet";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();
            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("EmpKy", EmpKy);

            List<HRISSalaryDataModel> List = new List<HRISSalaryDataModel>();
            List = RunApiOperation(
                HRISBaseUrl,
                actionUri,
                Environment,
                paramDictionary,
                List.GetType()) as List<HRISSalaryDataModel>;

            return List;
        }
        internal List<HRISWelfareDataModel> GetwelfareDet(string Environment, int UsrKy, int CKy, int EmpKy)
        {
            string actionUri = "GetwelfareDet";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();
            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("EmpKy", EmpKy);

            List<HRISWelfareDataModel> List = new List<HRISWelfareDataModel>();
            List = RunApiOperation(
                HRISBaseUrl,
                actionUri,
                Environment,
                paramDictionary,
                List.GetType()) as List<HRISWelfareDataModel>;

            return List;
        }
        internal List<HRISDataModel> GetBasicDet(string Environment, int UsrKy, int CKy, int EmpKy)
        {
            string actionUri = "GetBasicDet";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();
            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("EmpKy", EmpKy);

            List<HRISDataModel> List = new List<HRISDataModel>();
            List = RunApiOperation(
                HRISBaseUrl,
                actionUri,
                Environment,
                paramDictionary,
                List.GetType()) as List<HRISDataModel>;

            return List;
        }
        internal List<HRISDataModel> GetBasicDet_Sec(string Environment, int UsrKy, int CKy, int EmpKy)
        {
            string actionUri = "GetBasicDet_Sec";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();
            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("EmpKy", EmpKy);

            List<HRISDataModel> List = new List<HRISDataModel>();
            List = RunApiOperation(
                HRISBaseUrl,
                actionUri,
                Environment,
                paramDictionary,
                List.GetType()) as List<HRISDataModel>;

            return List;
        }
        internal List<HRISDataModel> InsertContactDet(string Environment, int UsrKy, int CKy, string HdrDataString, string DetDataString)
        {
            string actionUri = "InsertContactDet";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();
            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("HdrDataString", HdrDataString);
            paramDictionary.Add("DetDataString", DetDataString);

            List<HRISDataModel> List = new List<HRISDataModel>();
            List = RunApiOperation(
                HRISBaseUrl,
                actionUri,
                Environment,
                paramDictionary,
                List.GetType()) as List<HRISDataModel>;

            return List;
        }
        internal List<HRISDataModel> InsertAcadamicDet(string Environment, int UsrKy, int CKy, string HdrDataString, string DetDataString)
        {
            string actionUri = "InsertAcadamicDet";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();
            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("HdrDataString", HdrDataString);
            paramDictionary.Add("DetDataString", DetDataString);

            List<HRISDataModel> List = new List<HRISDataModel>();
            List = RunApiOperation(
                HRISBaseUrl,
                actionUri,
                Environment,
                paramDictionary,
                List.GetType()) as List<HRISDataModel>;

            return List;
        }
        internal List<HRISDataModel> InsertDet(string Environment, int UsrKy, int CKy, string HdrDataString, string DetDataString, string Form)
        {
            string actionUri = "InsertDet";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();
            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("HdrDataString", HdrDataString);
            paramDictionary.Add("DetDataString", DetDataString);
            paramDictionary.Add("Form", Form);

            List<HRISDataModel> List = new List<HRISDataModel>();
            List = RunApiOperation(
                HRISBaseUrl,
                actionUri,
                Environment,
                paramDictionary,
                List.GetType()) as List<HRISDataModel>;

            return List;
        }
        internal List<LeaveDataModel> InsertLeaveDet(string Environment, int UsrKy, int CKy, string HdrDataString, string DetDataString)
        {
            string actionUri = "InsertLeaveDet";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();
            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("HdrDataString", HdrDataString);
            paramDictionary.Add("DetDataString", DetDataString);

            List<LeaveDataModel> List = new List<LeaveDataModel>();
            List = RunApiOperation(
                HRISBaseUrl,
                actionUri,
                Environment,
                paramDictionary,
                List.GetType()) as List<LeaveDataModel>;

            return List;
        }
        internal List<MedicalClaimsModel> InsertMedicalClaimDet(string Environment, int UsrKy, int CKy, string HdrDataString, string DetDataString)
        {
            string actionUri = "InsertMedicalClaimDet";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();
            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("HdrDataString", HdrDataString);
            paramDictionary.Add("DetDataString", DetDataString);

            List<MedicalClaimsModel> List = new List<MedicalClaimsModel>();
            List = RunApiOperation(
                HRISBaseUrl,
                actionUri,
                Environment,
                paramDictionary,
                List.GetType()) as List<MedicalClaimsModel>;

            return List;
        }
        internal long DeleteEmpMasCd(string Environment, int UsrKy, int CKy, long EmpCdKy)
        {
            string actionUri = "DeleteEmpMasCd";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();
            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("EmpCdKy", EmpCdKy);

            object list = new object();
            list = RunApiOperation(
                HRISBaseUrl,
                actionUri,
                Environment,
                paramDictionary,
                list.GetType()) as object;

            return Convert.ToInt64(list);
        }
        internal long DeleteFamilyDet(string Environment, int UsrKy, int CKy, long AdrKy)
        {
            string actionUri = "DeleteFamilyDet";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();
            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("AdrKy", AdrKy);

            object list = new object();
            list = RunApiOperation(
                HRISBaseUrl,
                actionUri,
                Environment,
                paramDictionary,
                list.GetType()) as object;

            return Convert.ToInt64(list);
        }
        internal long DeleteMedicalClaimsDet(string Environment, int UsrKy, int CKy, long EmpCdDtKy)
        {
            string actionUri = "DeleteMedicalClaimsDet";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();
            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("EmpCdDtKy", EmpCdDtKy);

            object list = new object();
            list = RunApiOperation(
                HRISBaseUrl,
                actionUri,
                Environment,
                paramDictionary,
                list.GetType()) as object;

            return Convert.ToInt64(list);
        }
        internal long DeleteJobDet(string Environment, int UsrKy, int CKy, string EffectDt, long EmpKy)
        {
            string actionUri = "DeleteJobDet";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();
            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("EffectDt", EffectDt);
            paramDictionary.Add("EmpKy", EmpKy);

            object list = new object();
            list = RunApiOperation(
                HRISBaseUrl,
                actionUri,
                Environment,
                paramDictionary,
                list.GetType()) as object;

            return Convert.ToInt64(list);
        }
        internal long DeleteLeaveDet(string Environment, int UsrKy, int CKy, long LevTrnKy)
        {
            string actionUri = "DeleteLeaveDet";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();
            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("LevTrnKy", LevTrnKy);

            object list = new object();
            list = RunApiOperation(
                HRISBaseUrl,
                actionUri,
                Environment,
                paramDictionary,
                list.GetType()) as object;

            return Convert.ToInt64(list);
        }
        internal List<AnnualPerDataModel> InsertAnnualPerformanceDet(string Environment, int UsrKy, int CKy, string HdrDataString, string DetDataString)
        {
            string actionUri = "InsertAnnualPerformanceDet";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();
            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("HdrDataString", HdrDataString);
            paramDictionary.Add("DetDataString", DetDataString);

            List<AnnualPerDataModel> List = new List<AnnualPerDataModel>();
            List = RunApiOperation(
                HRISBaseUrl,
                actionUri,
                Environment,
                paramDictionary,
                List.GetType()) as List<AnnualPerDataModel>;

            return List;
        }
        internal List<AnnualPerDataModel> InsertAnnualPerDocDet(string Environment, int UsrKy, int CKy, string fileName)
        {
            string actionUri = "InsertAnnualPerDocDet";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();
            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("fileName", fileName);

            List<AnnualPerDataModel> List = new List<AnnualPerDataModel>();
            List = RunApiOperation(
                HRISBaseUrl,
                actionUri,
                Environment,
                paramDictionary,
                List.GetType()) as List<AnnualPerDataModel>;

            return List;
        }
    }
}