using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Runtime.Serialization.Json;
using System.Text;
using System.Web;
using System.Web.Script.Serialization;

using BlueLotus.TransactionModel.Entity;
using BlueLotus.SplOrderModel.Entity;
using BlueLotus.ObjMas.Model;
using BlueLotus.ComboLoad.Model;
using BlueLotus.ViewModel.Entity;

namespace BlueLotus.UI.ApiOperations
{
    public partial class ApiOperation
    {
        string validationBaseUri = "api/Validation/";

        public bool AccCrLimit_Validate(
            string EnvironmentName, int CKy, int UsrKy, int ObjKy, string CurVal, string EftvDt, 
            int LocKy, int TrnTypKy, int BUKy, int PrjKy, int AdrKy, int AccKy)
        {
            string actionUri = "AccCrLimit_Validate";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("ObjKy", ObjKy);
            paramDictionary.Add("CurVal", CurVal);
            paramDictionary.Add("EftvDt", EftvDt);
            paramDictionary.Add("LocKy", LocKy);
            paramDictionary.Add("TrnTypKy", TrnTypKy);
            paramDictionary.Add("BUKy", BUKy);
            paramDictionary.Add("PrjKy", PrjKy);
            paramDictionary.Add("AdrKy", AdrKy);
            paramDictionary.Add("AccKy", AccKy);

            bool list = new bool();
            object listr = RunApiOperation(
                validationBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType());

            list = Convert.ToBoolean(listr);

            return list;
        }

    }
}