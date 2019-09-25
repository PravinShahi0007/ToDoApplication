using BlueLotus.Prefix.Model.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;

namespace BlueLotus.UI.ApiOperations
{
    public partial class ApiOperation
    {
        string PrefixBaseUrl = "api/Prefix/";
        internal List<PrefixModel> GetPrefix(string Environment, int UsrKy, int CKy, int TrnTypKy, int GrpConKy)
        {
            string actionUri = "GetPrefix";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();
            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("TrnTypKy", TrnTypKy);
            paramDictionary.Add("GrpConKy", GrpConKy);

            List<PrefixModel> List = new List<PrefixModel>();
            List = RunApiOperation(
                PrefixBaseUrl,
                actionUri,
                Environment,
                paramDictionary,
                List.GetType()) as List<PrefixModel>;

            return List;
        }
        internal List<PrefixModel> InsertPrefix(string Environment, int UsrKy, int CKy, string HdrData, string GridData)
        {
            int NewRecordLength = 0;
            List<PrefixModel> List = new List<PrefixModel>();

            if (GridData != "[]" && GridData != "[null]" && GridData != "")
            {
                try
                {
                    PrefixModel[] NewPrefix = new JavaScriptSerializer().Deserialize<PrefixModel[]>(GridData);
                    NewRecordLength = NewPrefix.Length;

                    for (int i = 0; i < NewPrefix.Length; i++)
                    {
                        string actionUri = "InsertPrefix";
                        Dictionary<string, object> paramDictionary = new Dictionary<string, object>();
                        string NewmodelString = new JavaScriptSerializer().Serialize(NewPrefix[i]);

                        paramDictionary.Add("CKy", CKy);
                        paramDictionary.Add("UsrKy", UsrKy);
                        paramDictionary.Add("HdrData", HdrData);
                        paramDictionary.Add("GridData", NewmodelString);

                   
                        List = RunApiOperation(
                            PrefixBaseUrl,
                            actionUri,
                            Environment,
                            paramDictionary,
                            List.GetType()) as List<PrefixModel>;
                    }                    
                }       
                catch (Exception ex)
                {
                    throw;
                }
            }

            return List;


        }
        internal List<PrefixModel> DeletePrefix(string Environment, int UsrKy, int CKy, string lstNoPreFixKy)
        {
            string actionUri = "DeletePrefix";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();
            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("lstNoPreFixKy", lstNoPreFixKy);

            List<PrefixModel> List = new List<PrefixModel>();
            List = RunApiOperation(
                PrefixBaseUrl,
                actionUri,
                Environment,
                paramDictionary,
                List.GetType()) as List<PrefixModel>;

            return List;
        }
    }
}