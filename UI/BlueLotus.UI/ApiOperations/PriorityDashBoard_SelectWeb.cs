using Bluelotus.DashBoardModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BlueLotus.UI.ApiOperations
{
    public partial class ApiOperation
    {
        string BaseURL = "api/DashBoard/";

        internal List<DashBoardModel> PriorityDashBoard_SelectWeb(string EnvironmentName, int Cky, int UsrKy, int PrjKy, int LeadAdrKy, int CurAdrKy, int ObjKy, int PrcsStpKy, int PrtyKy, int PrcsObjKy, int AprStsKy, int PrcsDetCat1Ky)
        {
            string actionUri = "PriorityDashBoard";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", Cky);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("PrjKy", PrjKy);
            paramDictionary.Add("LeadAdrKy", LeadAdrKy);
            paramDictionary.Add("CurAdrKy", CurAdrKy);
            paramDictionary.Add("ObjKy", ObjKy);
            paramDictionary.Add("PrcsStpKy", PrcsStpKy);
            paramDictionary.Add("PrtyKy", PrtyKy);
            paramDictionary.Add("PrcsObjKy", PrcsObjKy);
            paramDictionary.Add("AprStsKy", AprStsKy);
            paramDictionary.Add("PrcsDetCat1Ky", PrcsDetCat1Ky);

            List<DashBoardModel> TodoList = new List<DashBoardModel>();
            TodoList = RunApiOperation(
                BaseURL,
                actionUri,
                EnvironmentName,
                paramDictionary,
                TodoList.GetType()) as List<DashBoardModel>;
            return TodoList;
        }


        internal List<DashBoardModel> StatusDashBoard(string EnvironmentName, int Cky, int UsrKy, int PrjKy, int LeadAdrKy, int CurAdrKy, int ObjKy, int PrcsStpKy, int PrtyKy, int PrcsObjKy, int AprStsKy, int PrcsDetCat1Ky)
        {
            string actionUri = "StatusDashBoard";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", Cky);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("PrjKy", PrjKy);
            paramDictionary.Add("LeadAdrKy", LeadAdrKy);
            paramDictionary.Add("CurAdrKy", CurAdrKy);
            paramDictionary.Add("ObjKy", ObjKy);
            paramDictionary.Add("PrcsStpKy", PrcsStpKy);
            paramDictionary.Add("PrtyKy", PrtyKy);
            paramDictionary.Add("PrcsObjKy", PrcsObjKy);
            paramDictionary.Add("AprStsKy", AprStsKy);
            paramDictionary.Add("PrcsDetCat1Ky", PrcsDetCat1Ky);

            List<DashBoardModel> TodoList = new List<DashBoardModel>();
            TodoList = RunApiOperation(
                BaseURL,
                actionUri,
                EnvironmentName,
                paramDictionary,
                TodoList.GetType()) as List<DashBoardModel>;
            return TodoList;
        }

        internal List<DashBoardModel> PendingGraph(string EnvironmentName, int Cky, int UsrKy, int PrjKy, int LeadAdrKy, int CurAdrKy, int ObjKy, int PrcsStpKy, int PrtyKy, int PrcsObjKy, int AprStsKy, int PrcsDetCat1Ky)
        {
            string actionUri = "PendingGraph";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", Cky);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("PrjKy", PrjKy);
            paramDictionary.Add("LeadAdrKy", LeadAdrKy);
            paramDictionary.Add("CurAdrKy", CurAdrKy);
            paramDictionary.Add("ObjKy", ObjKy);
            paramDictionary.Add("PrcsStpKy", PrcsStpKy);
            paramDictionary.Add("PrtyKy", PrtyKy);
            paramDictionary.Add("PrcsObjKy", PrcsObjKy);
            paramDictionary.Add("AprStsKy", AprStsKy);
            paramDictionary.Add("PrcsDetCat1Ky", PrcsDetCat1Ky);

            List<DashBoardModel> TodoList = new List<DashBoardModel>();
            TodoList = RunApiOperation(
                BaseURL,
                actionUri,
                EnvironmentName,
                paramDictionary,
                TodoList.GetType()) as List<DashBoardModel>;
            return TodoList;
        }
    }
}