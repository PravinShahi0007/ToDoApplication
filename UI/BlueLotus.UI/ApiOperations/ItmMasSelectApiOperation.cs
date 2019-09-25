using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BlueLotus.ComboLoad.Model;
using BlueLotus.ViewModel.Entity;

namespace BlueLotus.UI.ApiOperations
{
    public partial class ApiOperation
    {

        string itmMasSelectBaseUri = "api/ItmMasSelect/";

        internal List<List<object>> ItmMas_ItmNm_SS_WebColDetMulti(
            string EnvironmentName, 
            int CKy, 
            int UsrKy, 
            string ItmNm, 
            string Dt, 
            string FormObjKy, 
            string ItmTypKy, 
            string TrnTypKy, 
            string PrjKy, 
            string LocKy,
            string ConCd,
            string OurCd
            )
        {
            string actionUri = "ItmMas_ItmNm_SS_WebColDetMulti";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("ItmNm", ItmNm);
            paramDictionary.Add("Dt", Dt);
            paramDictionary.Add("FormObjKy", FormObjKy);
            paramDictionary.Add("ItmTypKy", ItmTypKy);
            paramDictionary.Add("TrnTypKy", TrnTypKy);
            paramDictionary.Add("PrjKy", PrjKy);
            paramDictionary.Add("LocKy", LocKy);
            paramDictionary.Add("ConCd", ConCd);
            paramDictionary.Add("OurCd", OurCd);

            List<List<object>> list = new List<List<object>>();
            list = RunApiOperation(
                itmMasSelectBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as List<List<object>>;

            return list;
        }

        
        internal List<List<object>> ItmMas_ItmNm_SS_WebMulti(
            string EnvironmentName,
            int CKy,
            int UsrKy,
            string ItmNm,
            string Dt,
            string FormObjKy,
            string ItmTypKy,
            string TrnTypKy,
            string PrjKy,
            string LocKy,
            string ConCd,
            string OurCd
            )
        {
            string actionUri = "ItmMas_ItmNm_SS_WebMulti";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("ItmNm", ItmNm);
            paramDictionary.Add("Dt", Dt);
            paramDictionary.Add("FormObjKy", FormObjKy);
            paramDictionary.Add("ItmTypKy", ItmTypKy);
            paramDictionary.Add("TrnTypKy", TrnTypKy);
            paramDictionary.Add("PrjKy", PrjKy);
            paramDictionary.Add("LocKy", LocKy);
            paramDictionary.Add("ConCd", ConCd);
            paramDictionary.Add("OurCd", OurCd);

            List<List<object>> list = new List<List<object>>();
            list = RunApiOperation(
                itmMasSelectBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as List<List<object>>;

            return list;
        }

        
    }
}
