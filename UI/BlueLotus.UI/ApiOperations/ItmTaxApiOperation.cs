using BlueLotus.ItmTax.Model.Entity;
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
        string ItmTaxBaseUri = "api/ItmTax/";

        internal List<ItmTax_SelectWeb> GetAllItemTax(string EnvironmentName, int ItmTypKy, int ItmTaxTypKy, string EftvDate, int UsrKy, int CKy, int ObjKy, int Cat8Ky, int Cat7Ky)
        {
            string actionUri = "GetAllItemTax";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();
            paramDictionary.Add("ItmTypKy", ItmTypKy);
            paramDictionary.Add("ItmTaxTypKy", ItmTaxTypKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("ObjKy", ObjKy);
            paramDictionary.Add("EftvDate", EftvDate);
            paramDictionary.Add("Cat8Ky", Cat8Ky);
            paramDictionary.Add("Cat7Ky", Cat7Ky);

            List<ItmTax_SelectWeb> List = new List<ItmTax_SelectWeb>();
            List = RunApiOperation(
                ItmTaxBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                List.GetType()) as List<ItmTax_SelectWeb>;

            return List;
        }

        public bool UpdateItmTax(string EnvironmentName, string updateGrid, string newGrid, int CKy, int UsrKy, int ObjKy, int ItmTaxCatKy, int ItmTypKy, string EftvDate, string OurCd)
        {
            string actionUri = "UpdateItmTax";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("ObjKy", ObjKy);
            paramDictionary.Add("updateGrid", updateGrid);
            paramDictionary.Add("newGrid", newGrid);
            paramDictionary.Add("ItmTypKy", ItmTypKy);
            paramDictionary.Add("EftvDate", EftvDate);
            paramDictionary.Add("ItmTaxCatKy", ItmTaxCatKy);
            paramDictionary.Add("OurCd", OurCd);

            object list = new object();
            list = RunApiOperation(
                ItmTaxBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as object;

            return Convert.ToBoolean(list);
        }
    }
}