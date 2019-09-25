using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using BlueLotus.SubContract.Model;

namespace BlueLotus.UI.ApiOperations
{
    public partial class ApiOperation
    {
        private readonly string SubConBaseUri = "api/SubCon/";

        public List<SubContractBill> SubConGrdLoad(string EnvironmentName, int CKy, int UsrKy, string TrnTypKy,
            string Trnky, string AccKy, string PrjKy, string ObjKy, string adrKy,string Dt)
        {
            var actionUri = "LoadGrid";
            var paramDictionary = new Dictionary<string, object>();
            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("TrnTypKy", TrnTypKy);
            paramDictionary.Add("Trnky", Trnky);
            paramDictionary.Add("AccKy", AccKy);
            paramDictionary.Add("PrjKy", PrjKy);
            paramDictionary.Add("ObjKy", ObjKy);
            paramDictionary.Add("adrKy", adrKy);
            paramDictionary.Add("Dt", Dt);

            
            var list = new List<SubContractBill>();
            list = RunApiOperation(
                SubConBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as List<SubContractBill>;
            return list;
        }

        public long SaveSubCon(string EnvironmentName, int cKy, int usrKy, string trnTypKy, string dataJasonString,
            string objKy, string TrnDt, string DocNo,string trnKy,string adrKy,string Accky)
        {
            var actionUri = "SaveSubCon";
            var paramDictionary = new Dictionary<string, object>();
            paramDictionary.Add("CKy", cKy);
            paramDictionary.Add("UsrKy", usrKy);
            paramDictionary.Add("TrnTypKy", trnTypKy);
            paramDictionary.Add("dataJasonString", dataJasonString);
            paramDictionary.Add("ObjKy", objKy);
            paramDictionary.Add("TrnDt", TrnDt);
            paramDictionary.Add("DocNo", DocNo);
            paramDictionary.Add("trnKy", trnKy);
            paramDictionary.Add("adrKy", adrKy);
            paramDictionary.Add("AccKy", Accky);
            var Sucess = new long();
            var obj = RunApiOperation(
                SubConBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                Sucess.GetType());
            Sucess = Convert.ToInt32(obj);
            return Sucess;
        }
     
        public List<SubContractBill> SubConDoubleEntry(string EnvironmentName, int cKy, int usrKy, string trnKy, string objKy)
        {
            var actionUri = "DblEntry";
            var paramDictionary = new Dictionary<string, object>();
            paramDictionary.Add("CKy", cKy);
            paramDictionary.Add("UsrKy", usrKy);
            paramDictionary.Add("ObjKy", objKy);
            paramDictionary.Add("Trnky", trnKy);
            var list = new List<SubContractBill>();
            list = RunApiOperation(
                SubConBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as List<SubContractBill>;
            return list;
        }
    }
}