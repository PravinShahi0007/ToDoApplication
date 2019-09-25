using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BlueLotus.UI.ApiOperations
{
    public partial class ApiOperation
    {

        string reportSelectBaseUri = "api/Report/";

        internal List<List<object>> ViewIntegrityChecksColDetMulti(
                                    string SPName,
                                    string EnvironmentName,
                                    string CKy,
                                    string UsrKy,
                                    string NeededReportParamsFromObjMas,
                                    string NeededReportParams,
                                    string SelectedReportObjKy)
        {
            string actionUri = "ViewIntegrityChecksColDetMulti";

            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("SPName", SPName);
            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("NeededReportParamsFromObjMas", NeededReportParamsFromObjMas);
            paramDictionary.Add("NeededReportParams", NeededReportParams);
            paramDictionary.Add("SelectedReportObjKy", SelectedReportObjKy);

            List<List<object>> list = new List<List<object>>();
            list = RunApiOperation(
                reportSelectBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as List<List<object>>;

            return list;
        }


        internal List<List<object>> ViewIntegrityChecks(
                                    string SPName,
                                    string EnvironmentName,
                                    string CKy,
                                    string UsrKy,
                                    string NeededReportParamsFromObjMas,
                                    string NeededReportParams,
                                    string SelectedReportObjKy)
        {
            string actionUri = "ViewIntegrityChecks";

            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("SPName", SPName);
            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("NeededReportParamsFromObjMas", NeededReportParamsFromObjMas);
            paramDictionary.Add("NeededReportParams", NeededReportParams);
            paramDictionary.Add("SelectedReportObjKy", SelectedReportObjKy);

            List<List<object>> list = new List<List<object>>();
            list = RunApiOperation(
                reportSelectBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as List<List<object>>;

            return list;
        }
    }
}
