using BlueLotus.ViewModel.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using BlueLotus.Codes.Model.Entity;
using Newtonsoft.Json;
using System.Web.Script.Serialization;

namespace BlueLotus.UI.ApiOperations
{
    public partial class ApiOperation
    {
        string systemUserBaseUri = "api/SystemUser/";

        internal List<GetUserControllersModel> GetUsersDetails(string EnvironmentName, int Cky, int UsrKy)
        {
            string actionUri = "GetUsersDetails";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();


            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("CKy", Cky);
            //paramDictionary.Add("IsActive", IsActive);


            List<GetUserControllersModel> List = new List<GetUserControllersModel>();
            List = RunApiOperation(
                systemUserBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                List.GetType()) as List<GetUserControllersModel>;

            return List;
        }

        internal List<GetUserControllersModel> GetPrevilageDetails(string EnvironmentName, int Cky, long UsrKy)
        {
            string actionUri = "GetPrevilageDetails";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();


            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("CKy", Cky);
            //paramDictionary.Add("IsActive", IsActive);


            List<GetUserControllersModel> List = new List<GetUserControllersModel>();
            List = RunApiOperation(
                systemUserBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                List.GetType()) as List<GetUserControllersModel>;

            return List;
        }

        internal bool UpdateUserPrevilages(string EnvironmentName, int UsrKy, int Cky, string updatedOrders)
        {

            int InsertFinished = 0;
            int UpdateFinished = 0;
            int NewRecordLength = 0;
            int UpdateRecordLength = 0;
            bool result = false;

            if (updatedOrders != "[]" && updatedOrders != "[null]" && updatedOrders != "")
            {
                try
                {
                    GetUserControllersModel[] NewCodes = JsonConvert.DeserializeObject<GetUserControllersModel[]>(updatedOrders);
                    //CompanyMenu[] NewCodes = new JavaScriptSerializer().Deserialize<CompanyMenu[]>(updateGrid);
                    NewRecordLength = NewCodes.Length;

                    for (int i = 0; i < NewCodes.Length; i++)
                    {

                        string actionUri = "UpdateUserPrevilages";
                        Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

                        List<GetUserControllersModel> lst = new List<GetUserControllersModel>();
                        lst.Add(NewCodes[i]);
                        var NewmodelString = JsonConvert.SerializeObject(lst);
                        //string NewmodelString = new JavaScriptSerializer().Serialize(NewCodes[i]);

                        paramDictionary.Add("CKy", Cky);
                        paramDictionary.Add("UsrKy", UsrKy);
                        paramDictionary.Add("updatedOrders", NewmodelString);

                        bool Reset = new bool();
                        object obj = RunApiOperation(
                            systemUserBaseUri,
                            actionUri,
                            EnvironmentName,
                            paramDictionary,
                            Reset.GetType());

                        Reset = Convert.ToBoolean(obj);
                        InsertFinished++;
                        result = true;
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

        internal bool MultiAproval_InsertUpdate(string EnvironmentName, int CKy, string serNoListString, int usrKy)
        {
            bool Reset = new bool();

            if (serNoListString != "[]" && serNoListString != "[null]" && serNoListString != "")
            {
                try
                { 
                    MultiApprovelModel[] multiApprovelModel = new JavaScriptSerializer().Deserialize<MultiApprovelModel[]>(serNoListString);

                    for (int i = 0; i < multiApprovelModel.Length; i++)
                    {
                        if(multiApprovelModel[i].ObjUsrCdKy < 11 && multiApprovelModel[i].IsSelect == true || multiApprovelModel[i].ObjUsrCdKy > 11 && multiApprovelModel[i].IsSelect == false)
                        {
                            string actionUri = "MultiAproval_InsertUpdate";
                            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

                            string modelString = new JavaScriptSerializer().Serialize(multiApprovelModel[i]);

                            paramDictionary.Add("SerNoListString", modelString);
                            paramDictionary.Add("CKy", CKy);
                            paramDictionary.Add("UsrKy", usrKy);


                            object obj = RunApiOperation(
                                systemUserBaseUri,
                                actionUri,
                                EnvironmentName,
                                paramDictionary,
                                Reset.GetType());

                            Reset = Convert.ToBoolean(obj);
                        }                        
                    }
                }
                catch (Exception ex)
                {

                }
            }

            return Reset;
        }

        internal bool UpdateUser(string EnvironmentName, string UsrKy, string UsrId, string LoginUsrID, string isAct, string BUKy)
        {
            string actionUri = "UpdateUser";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("UsrId", UsrId);
            paramDictionary.Add("LoginUsrID", LoginUsrID);
            paramDictionary.Add("isAct", isAct);
            paramDictionary.Add("BUKy", BUKy);


            bool Reset = new bool();
            object obj = RunApiOperation(
                systemUserBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                Reset.GetType());

            Reset = Convert.ToBoolean(obj);

            return Reset;
        }

        internal List<GetUserControllersModel> Load_BU(string EnvironmentName, int UsrKy, int CKy)
        {
            string actionUri = "Load_BU";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();


            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("CKy", CKy);
            //paramDictionary.Add("IsActive", IsActive);


            List<GetUserControllersModel> List = new List<GetUserControllersModel>();
            List = RunApiOperation(
                systemUserBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                List.GetType()) as List<GetUserControllersModel>;

            return List;
        }


        internal bool UpdateToDo(string EnvironmentName, int UsrKy, List<UsrObjPermissionModel> todos)
        {
            string actionUri = "UpdateToDo";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("todos", todos);
            


            bool Reset = new bool();
            object obj = RunApiOperation(
                systemUserBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                Reset.GetType());

            Reset = Convert.ToBoolean(obj);

            return Reset;
        }


        internal bool InsertToDo(string EnvironmentName, string updatedOrders, string newOrders, string concd, string ourCd, int CKy, int UsrKy, string TotwrkHrs)
        {
            string actionUri = "InsertToDo";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("updatedOrders", updatedOrders);
            paramDictionary.Add("newOrders", newOrders);
            paramDictionary.Add("concd", concd);
            paramDictionary.Add("ourCd", ourCd);
            paramDictionary.Add("TotwrkHrs", TotwrkHrs);



            bool Reset = new bool();
            object obj = RunApiOperation(
                systemUserBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                Reset.GetType());

            Reset = Convert.ToBoolean(obj);
            return Reset;
        }

        internal bool PasswordChange(string EnvironmentName, string UsrKy, string UsrId, string password, string retypepassword)
        {
            string actionUri = "PasswordChange";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("UsrId", UsrId);
            paramDictionary.Add("password", password);
            paramDictionary.Add("retypepassword", retypepassword);
            


            bool Reset = new bool();
            object obj = RunApiOperation(
                systemUserBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                Reset.GetType());

            Reset = Convert.ToBoolean(obj);
            return Reset;
        }

        internal bool Assign_Company_ForUser(string EnvironmentName, string GridUpdateDetail, string UsrKy)
        {
            string actionUri = "Assign_Company_ForUser";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("GridUpdateDetail", GridUpdateDetail);
            paramDictionary.Add("UsrKy", UsrKy);
            
            bool Reset = new bool();
            object obj = RunApiOperation(
                systemUserBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                Reset.GetType());

            Reset = Convert.ToBoolean(obj);
            return Reset;
        }

        internal bool CheckUser(string EnvironmentName, string UsrId, int UsrKy)
        {
            string actionUri = "CheckUser";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("UsrId", UsrId);
            paramDictionary.Add("UsrKy", UsrKy);

            bool Reset = new bool();
            object obj = RunApiOperation(
                systemUserBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                Reset.GetType());

            Reset = Convert.ToBoolean(obj);
            return Reset;
        }

        internal bool CopyUserObjPermission(string EnvironmentName, int UsrKy, int CKy, int FrmUsrKy, int ToUsrKy)
        {
            string actionUri = "CopyUserObjPermission";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("FrmUsrKy", FrmUsrKy);
            paramDictionary.Add("ToUsrKy", ToUsrKy);
            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);

            bool Reset = new bool();
            object obj = RunApiOperation(
                systemUserBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                Reset.GetType());

            Reset = Convert.ToBoolean(obj);

            return Reset;
        }

        internal List<AccessLevel> UsrMasAcsLvl_SelectWeb(string EnvironmentName, int UsrKy, int CKy, int AcsLvlUsrKy)
        {
            string actionUri = "UsrMasAcsLvl_SelectWeb";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("AcsLvlUsrKy", AcsLvlUsrKy);

            List<AccessLevel> List = new List<AccessLevel>();
            List = RunApiOperation(
                systemUserBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                List.GetType()) as List<AccessLevel>;

            return List;
        }

        internal bool UsrMasAcsLvl_InsertUpdateWeb(string EnvironmentName, int CKy, int UsrKy, string updateGrid, string newGrid, int AcsLvlUsrKy)
        {
            string actionUri = "UsrMasAcsLvl_InsertUpdateWeb";

            Dictionary<string, object> parameterDictionary = new Dictionary<string, object>();

            parameterDictionary.Add("CKy", CKy);
            parameterDictionary.Add("UsrKy", UsrKy);
            parameterDictionary.Add("updateGrid", updateGrid);
            parameterDictionary.Add("newGrid", newGrid);
            parameterDictionary.Add("AcsLvlUsrKy", AcsLvlUsrKy);

            bool Reset = new bool();
            object obj = RunApiOperation(
                systemUserBaseUri,
                actionUri,
                EnvironmentName,
                parameterDictionary,
                Reset.GetType());

            Reset = Convert.ToBoolean(obj);
            return Reset;
        }

        internal List<MultiApprovelModel> SelectMultiApproval(string EnvironmentName, int Cky, long usrky, string OurCd, string ObjKy, int EusrKy)
        {
            string actionUri = "SelectMultiApproval";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();


            paramDictionary.Add("UsrKy", usrky);
            paramDictionary.Add("CKy", Cky);
            paramDictionary.Add("OurCd", OurCd);
            paramDictionary.Add("ObjKy", ObjKy);
            paramDictionary.Add("EusrKy", EusrKy);




            List<MultiApprovelModel> List = new List<MultiApprovelModel>();
            List = RunApiOperation(
                systemUserBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                List.GetType()) as List<MultiApprovelModel>;

            return List;
        }

    }
}