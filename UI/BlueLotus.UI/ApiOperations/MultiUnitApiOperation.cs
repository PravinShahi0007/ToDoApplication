using BlueLotus.MultiUnit.Model.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BlueLotus.UI.ApiOperations
{
    public partial class ApiOperation
    {
        string MultiUnitBaseUrl = "api/MultiUnit/";
        internal List<MultiUnitModel> GetItemUnitMasDet(string Environment, int UsrKy, int CKy, string ItmKy)
        {
            string actionUri = "GetItemUnitMasDet";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();
            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("ItmKy", ItmKy);

            List<MultiUnitModel> List = new List<MultiUnitModel>();
            List = RunApiOperation(
                MultiUnitBaseUrl,
                actionUri,
                Environment,
                paramDictionary,
                List.GetType()) as List<MultiUnitModel>;

            return List;
        }
        internal List<MultiUnitModel> InsertItemUnitMasDet(string Environment, int UsrKy, int CKy, string ItmKy, string DetDataString)
        {
            string actionUri = "InsertItemUnitMasDet";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();
            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("ItmKy", ItmKy);
            paramDictionary.Add("DetDataString", DetDataString);

            List<MultiUnitModel> List = new List<MultiUnitModel>();
            List = RunApiOperation(
                MultiUnitBaseUrl,
                actionUri,
                Environment,
                paramDictionary,
                List.GetType()) as List<MultiUnitModel>;

            return List;
        }
    }
}