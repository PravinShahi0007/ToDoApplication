using BlueLots.Project.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BlueLotus.UI.ApiOperations
{
   
    public partial class ApiOperation
    {
        string PrjBaseUri = "api/PrjAdr/";

        internal bool PrjAdr_InsertWeb(int PrjKy,int AdrKy,string EnvironmentName)
        {
            string actionUri = "PrjAdr_InsertWeb";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();
            paramDictionary.Add("PrjKy", PrjKy);
            paramDictionary.Add("AdrKy", AdrKy);
            
            object list = new object();
            list = RunApiOperation(
                PrjBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as object;

            return Convert.ToBoolean(list);
        }

        public List<PrjAdr> PrjAdr_SelectWeb(int PrjKy, int AdrKy, int CKy, string EnvironmentName)
        {
            string actionUri = "PrjAdr_SelectWeb";
            var paramDictionary = new Dictionary<string, object>();
            paramDictionary.Add("PrjKy", PrjKy);
            paramDictionary.Add("AdrKy", AdrKy);
            paramDictionary.Add("CKy", CKy);

            List<PrjAdr> list = new List<PrjAdr>();
            list = RunApiOperation(
                PrjBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as List<PrjAdr>;

            return list;
        }

        public bool PrjAdr_UpdateWeb(int PrjAdrKy,int PrjKy, int AdrKy,string EnvironmentName)
        {
            string actionUri = "PrjAdr_UpdateWeb";
            var paramDictionary = new Dictionary<string, object>();
            
            paramDictionary.Add("PrjAdrKy", PrjAdrKy);
            paramDictionary.Add("PrjKy", PrjKy);
            paramDictionary.Add("AdrKy", AdrKy);

            object list = new object();
            list = RunApiOperation(
                PrjBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as object;

            return Convert.ToBoolean(list);
        }

    }
}