using BlueLotus.Codes.Model.Entity;
using BlueLotus.SalaryDate.Model.Entity;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Runtime.Serialization.Json;
using System.Text;
using System.Web;
using System.Web.Script.Serialization;

namespace BlueLotus.UI.ApiOperations
{
    public partial class ApiOperation
    {
        string salaryDateBaseUri = "api/SalDatRng/";

        internal bool SalDtRng_Insert(int CKy, int UsrKy, string ObjKy, int SalPrcsGrpKy, int SalTypKy, string SalDt, string ActuSalDt, string FmDt, string ToDt, int fAprSal, string SalDtKy, string EnvironmentName)
        {
            string actionUri = "SalDtRng_Insert";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("ObjKy", ObjKy);
            paramDictionary.Add("SalPrcsGrpKy", SalPrcsGrpKy);
            paramDictionary.Add("SalTypKy", SalTypKy);
            paramDictionary.Add("SalDt", SalDt);
            paramDictionary.Add("ActuSalDt", ActuSalDt);
            paramDictionary.Add("FmDt", FmDt);
            paramDictionary.Add("ToDt", ToDt);
            paramDictionary.Add("fAprSal", fAprSal);
            paramDictionary.Add("SalDtKy", SalDtKy);

            object list = new object();
            list = RunApiOperation(
                salaryDateBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as object;

            return Convert.ToBoolean(list);
        }

        internal List<SalDtRng_Insert> LoadSalaryGridFindView(string EnvironmentName, int Cky, int UsrKy, string ObjKy, string SalDt, int SalPrcsGrpKy, int fAprSal)
        {
            string actionUri = "LoadSalaryGridFindView";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", Cky);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("ObjKy", ObjKy);
            paramDictionary.Add("SalPrcsGrpKy", SalPrcsGrpKy);
            paramDictionary.Add("SalDt", SalDt);
            paramDictionary.Add("fAprSal", fAprSal);

            List<SalDtRng_Insert> list = new List<SalDtRng_Insert>();
            list = RunApiOperation(
                salaryDateBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as List<SalDtRng_Insert>;

            return list;
        }

        internal List<SalDtRng_Insert> GetHdrDetailFromGrid(string EnvironmentName, int Cky, int UsrKy, string ObjKy, string SalDtKy)
        {
            string actionUri = "GetHdrDetailFromGrid";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", Cky);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("ObjKy", ObjKy);
            paramDictionary.Add("SalDtKy", SalDtKy);
          

            List<SalDtRng_Insert> list = new List<SalDtRng_Insert>();
            list = RunApiOperation(
                salaryDateBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as List<SalDtRng_Insert>;

            return list;
        }

    }
}