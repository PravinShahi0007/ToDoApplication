using Bluelotus.Project.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BlueLotus.UI.ApiOperations
{
    public partial class ApiOperation
    {
        private readonly string ProjectManagementUri = "api/ProjectManagement/";
        public bool ProjectVersionNumberInserttoAPI(string trnDate, int prjky, int trnTypKy, bool isAct, bool isApr, string verNo, string EnvironmentName, int CKy, int UsrKy)
        {
            
            var actionUri = "VersionNo";
            var paramDictionary = new Dictionary<string, object>();
            paramDictionary.Add("cky", CKy);
            paramDictionary.Add("trnDate", trnDate);
            paramDictionary.Add("prjky", prjky);
            paramDictionary.Add("trnTypKy", trnTypKy);
            paramDictionary.Add("isAct", isAct);
            paramDictionary.Add("isApr", isApr);
            paramDictionary.Add("verNo", verNo);
            paramDictionary.Add("usrKy", UsrKy);
            //
            var Sucess = new bool();
            var obj = RunApiOperation(
                ProjectManagementUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                Sucess.GetType());

            Sucess = Convert.ToBoolean(obj);

            return Sucess;
        }

        public List<VersionNoFF> ProjectVersionNumberFindFormLoadData(string frmDt, string toDt, string prefix , string trnno, string versionno, string AprStatKy, string prjky, string trnTypKy, string IsAct, string IsApr, string Objky,string Environtname, int cky,int usrKy)
        {
           
            var actionUri = "VersionNoFindForm";
            var paramDictionary = new Dictionary<string, object>();
            paramDictionary.Add("frmDt", frmDt);
            paramDictionary.Add("toDt", toDt);
            paramDictionary.Add("prefix", prefix);
            paramDictionary.Add("trnno", trnno);
            paramDictionary.Add("versionno", versionno);
            paramDictionary.Add("AprStatKy", AprStatKy);
            paramDictionary.Add("prjky", prjky);
            paramDictionary.Add("trnTypKy", trnTypKy);
            paramDictionary.Add("IsAct", IsAct);
            paramDictionary.Add("IsApr", IsApr);
            paramDictionary.Add("Objky", Objky);
            paramDictionary.Add("cky", cky);
            paramDictionary.Add("usrKy", usrKy);
            //
            List<VersionNoFF> List = new List<VersionNoFF>();
            var obj = RunApiOperation(
                ProjectManagementUri,
                actionUri,
                Environtname,
                paramDictionary,
                List.GetType());

            return (List<VersionNoFF>)obj;
        }

        public List<VersionNoHdrDetail> ProjectVersionNumberHdrSelect(int PrcsSchKy, string Environtname, int cky, int usrKy)
        {

            var actionUri = "VersionNoHdrDetail";
            var paramDictionary = new Dictionary<string, object>();            
            paramDictionary.Add("PrcsSchKy", PrcsSchKy);
            paramDictionary.Add("cky", cky);
            paramDictionary.Add("usrKy", usrKy);
            //
            List<VersionNoHdrDetail> List = new List<VersionNoHdrDetail>();
            var obj = RunApiOperation(
                ProjectManagementUri,
                actionUri,
                Environtname,
                paramDictionary,
                List.GetType());

            return (List<VersionNoHdrDetail>)obj;
        }

        public List<VersionNoGridDetail> ProjectVersionNumberDetailSelect(int PrcsSchKy, string Environtname, int cky, int usrKy)
        {

            var actionUri = "VersionNoGridDetail";
            var paramDictionary = new Dictionary<string, object>();
            paramDictionary.Add("PrcsSchKy", PrcsSchKy);
            paramDictionary.Add("cky", cky);
            paramDictionary.Add("usrKy", usrKy);
            //
            List<VersionNoGridDetail> List = new List<VersionNoGridDetail>();
            var obj = RunApiOperation(
                ProjectManagementUri,
                actionUri,
                Environtname,
                paramDictionary,
                List.GetType());

            return (List<VersionNoGridDetail>)obj;
        }
    }
}