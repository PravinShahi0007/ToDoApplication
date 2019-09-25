using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BlueLotus.UI.ApiOperations
{
    public partial class ApiOperation
    {
        string PayrollBaseUrl = "api/Payroll/";

        internal bool SalaryProcess(string Environment, int EmpKy, int SalGrpKy, int SalTypKy, string Date, int UsrKy, int CKy)
        {
            string actionUri = "SalaryProcess";

             string HdrDataString = "";
             string DetDataString = "";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();
            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("HdrDataString", HdrDataString);
            paramDictionary.Add("DetDataString", DetDataString
                );

            paramDictionary.Add("EmpKy", EmpKy);
            paramDictionary.Add("SalGrpKy", SalGrpKy);
            paramDictionary.Add("SalTypKy", SalTypKy);
            paramDictionary.Add("Date", Date);

            object list = new object();
            list = RunApiOperation(
                PayrollBaseUrl,
                actionUri,
                Environment,
                paramDictionary,
                list.GetType()) as object;

            return Convert.ToBoolean(list);// Convert.ToInt64(list);
        }

    }
}