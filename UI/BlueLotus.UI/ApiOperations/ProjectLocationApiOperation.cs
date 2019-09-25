using BlueLots.Project.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BlueLotus.UI.ApiOperations
{
    public partial class ApiOperation
    {
        //Api controller name PrjTskLoc
        private readonly string ProjectLocUri = "api/PrjTskLoc/";
        public bool InsertProjectLoc(int ControlConKy, int PrjKy,string PrjLocCd,string PrjLocNm, string ObjKy, string EnvironmentName, int CKy, int UsrKy)
        {
            //api Function or Action name = PrjTskLocInsert
            var actionUri = "PrjTskLocInsert";
            var paramDictionary = new Dictionary<string, object>();
            paramDictionary.Add("ControlConKy", ControlConKy);
            paramDictionary.Add("PrjKy", PrjKy);
            paramDictionary.Add("PrjTaskLocCd", PrjLocCd);
            paramDictionary.Add("PrjTaskLocNm", PrjLocNm);
            paramDictionary.Add("ObjKy", ObjKy);
            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
        //
            var Sucess = new bool();
            var obj = RunApiOperation(
                ProjectLocUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                Sucess.GetType());

            Sucess = Convert.ToBoolean(obj);

            return Sucess;
        }

        public List<ProjectModel> SelectPjoLocCd(int prjKy,int usrKy, string EnvironmentName)
        {
            var actionUri = "SelectPrjTskLoc";
            var paramDictionary = new Dictionary<string, object>();
            paramDictionary.Add("PrjKy", prjKy);
            paramDictionary.Add("UsrKy", usrKy);
            List<ProjectModel> Sucess = new List<ProjectModel>();
            Sucess = RunApiOperation(
                ProjectLocUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                Sucess.GetType()) as List<ProjectModel>;
            //Sucess.ToList();
            //Sucess = Convert.ToBoolean(obj);

            return Sucess;
        }

        public List<ProjectModel> GetAllPjoLocCd(int usrKy, string EnvironmentName)
        {
            var actionUri = "GetAllPrjTskLoc";
            var paramDictionary = new Dictionary<string, object>();
            paramDictionary.Add("UsrKy", usrKy);
            List<ProjectModel> Sucess = new List<ProjectModel>();
            Sucess = RunApiOperation(
                ProjectLocUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                Sucess.GetType()) as List<ProjectModel>;
            return Sucess;
        }

        public bool EditProjectTaskLoc(int prjTaskLocKy ,int ControlConKy, int PrjKy, string PrjLocCd, string PrjLocNm, int UsrKy,string EnvironmentName)
        {
            //api Function or Action name = PrjTskLocInsert
            var actionUri = "PrjTskLocEdit";
            var paramDictionary = new Dictionary<string, object>();
            paramDictionary.Add("PrjTaskLocKy", prjTaskLocKy);
            paramDictionary.Add("ControlConKy", ControlConKy);
            paramDictionary.Add("PrjKy", PrjKy);
            paramDictionary.Add("PrjTaskLocCd", PrjLocCd);
            paramDictionary.Add("PrjTaskLocNm", PrjLocNm);
            paramDictionary.Add("UsrKy", UsrKy);

            var Sucess = new bool();
            var obj = RunApiOperation(
                ProjectLocUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                Sucess.GetType());

            Sucess = Convert.ToBoolean(obj);

            return Sucess;
        }

        public bool DeleteProjectTaskLoc(int prjTaskLocKy, int UsrKy, string EnvironmentName)
        {
            {
                //api Function or Action name = PrjTskLocInsert
                var actionUri = "PrjTskLocDelete";
                var paramDictionary = new Dictionary<string, object>();
                paramDictionary.Add("PrjTaskLocKy", prjTaskLocKy);
                paramDictionary.Add("UsrKy", UsrKy);

                var Sucess = new bool();
                var obj = RunApiOperation(
                    ProjectLocUri,
                    actionUri,
                    EnvironmentName,
                    paramDictionary,
                    Sucess.GetType());

                Sucess = Convert.ToBoolean(obj);
                return Sucess;
            }
        }
    }
}