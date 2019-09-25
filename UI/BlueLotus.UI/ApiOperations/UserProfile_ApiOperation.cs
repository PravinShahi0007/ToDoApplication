using BlueLotus.ViewModel.Entity;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Runtime.Serialization.Json;
using System.Text;
using System.Web;

using BlueLotus.Payment.Model.Entity;

namespace BlueLotus.UI.ApiOperations
{
    public partial class ApiOperation
    {
        string userProfileBaseUri = "api/UserProfile/";

        internal List<GrpModel> Load_Grp(string EnvironmentName, int CKy, int UsrKy)
        {
            string actionUri = "Load_Grp";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("CKy", CKy);
            

            List<GrpModel> List = new List<GrpModel>();
            List = RunApiOperation(
                userProfileBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                List.GetType()) as List<GrpModel>;

            return List;
        }

        internal List<AdrsModel> GetAddressforUsrProfile(string EnvironmentName, int CKy, int UsrKy)
        {
            string actionUri = "GetAddressforUsrProfile";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("CKy", CKy);
            

            List<AdrsModel> List = new List<AdrsModel>();
            List = RunApiOperation(
                userProfileBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                List.GetType()) as List<AdrsModel>;

            return List;
        }

        internal string GetCompanyCode(string EnvironmentName, int CKy, int UsrKy)
        {
            string actionUri = "GetCompanyCode";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("CKy", CKy);


            String CCd = "";
            object obj = RunApiOperation(
                userProfileBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                CCd.GetType());

            CCd = Convert.ToString(obj);

            return CCd;
        }

        internal long SaveUsrProfile(string EnvironmentName, int CKy, string UsrId, string UsrNm, string GrpKy, string AdrKy, string IsAct, int UsrKy, string GridUpdateDetail)
        {
            string actionUri = "SaveUsrProfile";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrId", UsrId);
            paramDictionary.Add("UsrNm", UsrNm);
            paramDictionary.Add("GrpKy", GrpKy);
            paramDictionary.Add("AdrKy", AdrKy);
            paramDictionary.Add("IsAct", IsAct);
            paramDictionary.Add("GridUpdateDetail", GridUpdateDetail);
            

            long lng = new long();
            object obj = RunApiOperation(
                userProfileBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                lng.GetType());

            lng = Convert.ToInt64(obj);

            return lng;
        }

        internal bool ResetPwd(string EnvironmentName, string UsrKy, string UsrId)
        {
            string actionUri = "ResetPwd";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("UsrId", UsrId);
            

            bool Reset = new bool();
            object obj = RunApiOperation(
                userProfileBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                Reset.GetType());

            Reset = Convert.ToBoolean(obj);

            return Reset;
        }

        internal List<UsrFindModel> GetUsrDetailByUsrKy(string EnvironmentName, int UsrKy)
        {
            string actionUri = "GetUsrDetailByUsrKy";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("UsrKy", UsrKy);
            


            List<UsrFindModel> List = new List<UsrFindModel>();
            List = RunApiOperation(
                userProfileBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                List.GetType()) as List<UsrFindModel>;

            return List;
        }

        internal List<UsrFindModel> FindUsrGrid(string EnvironmentName, int CKy, int UsrKy, string IsActive, string isPOS)
        {
            string actionUri = "FindUsrGrid";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();
                       
            
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("IsActive", IsActive);
            paramDictionary.Add("isPOS", isPOS);

            List<UsrFindModel> List = new List<UsrFindModel>();
            List = RunApiOperation(
                userProfileBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                List.GetType()) as List<UsrFindModel>;

            return List;
        }

   
        internal bool CheckUserAndUpdate(string EnvironmentName, string UsrKy, string UsrId, string password, string newpassword)
        {
            string actionUri = "CheckUserAndUpdate";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("UsrId", UsrId);
            paramDictionary.Add("password", password);
            paramDictionary.Add("newpassword", newpassword);


            bool Reset = new bool();
            object obj = RunApiOperation(
                userProfileBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                Reset.GetType());

            Reset = Convert.ToBoolean(obj);

            return Reset;
        }


    }
}