
using BlueLotus.dailytodo.Entityy;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;

namespace BlueLotus.UI.ApiOperations
{
    public partial class ApiOperation
    {
        string baseuri = "api/DailyToDo/";

        internal List<DailyToDoModel> ToDoPrcsDet_SelectWeb(string EnvironmentName, int Cky, int UsrKy, int PrjKy, int LeadAdrKy, int CurAdrKy,int ObjKy,int PrcsStpKy,int PrtyKy, int PrcsObjKy, int AprStsKy, int PrcsDetCat1Ky)
        {
            string actionUri = "ToDoPrcsDet_SelectWeb";
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

            List<DailyToDoModel> TodoList = new List<DailyToDoModel>();
            TodoList = RunApiOperation(
                baseuri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                TodoList.GetType()) as List<DailyToDoModel>;

            return TodoList;
        }

        //internal bool ToDoPrcsDet_InsertWeb(int CKy, int UsrKy, string DlyToDoupdate, string DlyToDo, int ObjKy, string EnvironmentName)
        //{
        //    string actionUri = "ToDoPrcsDet_InsertWeb";
        //        Dictionary<string, object> paramDictionary = new Dictionary<string, object>();
        //        paramDictionary.Add("UsrKy", UsrKy);
        //        paramDictionary.Add("CKy", CKy);
        //        paramDictionary.Add("PrcsDetCmpnModel", DlyToDoupdate);
        //        paramDictionary.Add("DlyToDo", DlyToDo);
        //        paramDictionary.Add("ObjKy", ObjKy);

        //        object list = new object();
        //        list = RunApiOperation(
        //            baseuri,
        //            actionUri,
        //            EnvironmentName,
        //            paramDictionary,
        //            list.GetType()) as object;
        //        return true;
        //}

        internal bool ToDoPrcsDet_InsertWeb(int CKy, int UsrKy, string DlyToDoupdate, string DlyToDo, int ObjKy, string EnvironmentName)
        {

            string actionUri = "ToDoPrcsDet_InsertWeb";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("DlyToDoupdate", DlyToDoupdate);
            paramDictionary.Add("DlyToDo", DlyToDo);
            paramDictionary.Add("ObjKy", ObjKy);

            object list = new object();
            list = RunApiOperation(
                baseuri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as object;

            return true;

        }

        internal string ToDoPrcsDet_GetTaskID(int CKy, int ObjKy, int UsrKy, int PrjKy, string EnvironmentName)
        {

            string actionUri = "ToDoPrcsDet_GetTaskID";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("PrjKy", PrjKy);
            paramDictionary.Add("ObjKy", ObjKy);

            object list = new object();
            list = RunApiOperation(
                baseuri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as object;

            return list.ToString();
        }



        internal List<DailyToDoModel> PrcsDetPrnt_SelectWeb(string EnvironmentName, int Cky, int UsrKy, int PrjKy, int LeadAdrKy, int CurAdrKy, int ObjKy, int PrcsStpKy, int PrtyKy, int PrntPrcsDetKy)
        {
            string actionUri = "PrcsDetPrnt_SelectWeb";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", Cky);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("PrjKy", PrjKy);
            paramDictionary.Add("LeadAdrKy", LeadAdrKy);
            paramDictionary.Add("CurAdrKy", CurAdrKy);
            paramDictionary.Add("ObjKy", ObjKy);
            paramDictionary.Add("PrcsStpKy", PrcsStpKy);
            paramDictionary.Add("PrtyKy", PrtyKy);
            paramDictionary.Add("PrntPrcsDetKy", PrntPrcsDetKy);

            List<DailyToDoModel> List = new List<DailyToDoModel>();
            List = RunApiOperation(
                baseuri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                List.GetType()) as List<DailyToDoModel>;

            return List;
        }

    }
}