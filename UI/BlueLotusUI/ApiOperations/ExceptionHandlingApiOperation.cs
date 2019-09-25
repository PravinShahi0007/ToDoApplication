using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Runtime.Serialization.Json;
using System.Text;
using System.Web;

namespace BlueLotus.UI.ApiOperations
{
    public partial class ApiOperation
    {    
        string exceptionHandlingBaseUri = "api/ExceptionHandling/";

        internal List<Object> IntegrirityCheck_IC_Select(string EnvironmentName, int CKy, int UsrKy)
        {
            string actionUri = "IntegrirityCheck_IC_Select";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("CKy", CKy);

            List<Object> list = RunApiOperation(exceptionHandlingBaseUri, actionUri, EnvironmentName, paramDictionary, typeof(List<Object>)) as List<Object>;
            return list;
        }
    }
}