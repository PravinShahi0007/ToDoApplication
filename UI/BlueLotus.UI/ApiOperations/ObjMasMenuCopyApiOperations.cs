using BlueLotus.ViewModel.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BlueLotus.UI.ApiOperations
{

    public partial class ApiOperation
    {
        string ObjMasMenuCopyBaseUri = "api/MenuCopy/";

        internal List<Company> Company_Selectweb(int UsrKy, string EnvironmentName)
        {
            string actionUri = "Company_List";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("UsrKy", UsrKy);

            //
            List<Company> list = new List<Company>();

            list = RunApiOperation(
                ObjMasMenuCopyBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as List<Company>;

            return list;
        }

        internal List<User> UserList(int CKy,int UsrKy, string EnvironmentName)
        {
            string actionUri = "User_List";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("EnvironmentName", EnvironmentName);

            List<User> list = new List<User>();

            list = RunApiOperation(
                ObjMasMenuCopyBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as List<User>;

            return list;
        }
    }
}