using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using BlueLotus.PNSCollection.Model.PNSCashier_Collection;
using BlueLotus.PNSCollection.Model.PNSCordinatorCollection;

namespace BlueLotus.UI.ApiOperations
{
    public partial class ApiOperation
    {
        string PNSCordinatorCollection = "api/PNSCordinatorCollection/";
        public List<AccMassModel> PnsOutletList(int cKy,int  usrKy,string EnvironmentName)
        {
            string actionUri = "PNSOutletLookup";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();
            paramDictionary.Add("UsrKy", usrKy);
            paramDictionary.Add("CKy", cKy);
            List<AccMassModel> list = new List<AccMassModel>();
            list = RunApiOperation(
                PNSCordinatorCollection,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as List<AccMassModel>;
            return list;
        }

        public List<AccMassModel> PNSBankList(int cky, int usrKy,string BuKy, string EnvironmentName)
        {
            string actionUri = "PNSBankLookUP";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();
            paramDictionary.Add("UsrKy", usrKy);
            paramDictionary.Add("CKy", cky);
            paramDictionary.Add("BuKy", BuKy);
            List<AccMassModel> list = new List<AccMassModel>();
            list = RunApiOperation(
                PNSCordinatorCollection,
                actionUri, 
                EnvironmentName,
                paramDictionary,
                list.GetType()) as List<AccMassModel>;
            return list;
        }

        public List<AcctrnModel> PNSCordonatorCollection(int cky, int usrKy, string newChq, string cash, string docno, string outlt, string dt2, string creditcrd, string gftVou, string promo, string conCord, string ourCode, string EnvironmentName)
        {
            string actionUri = "InsertDetails";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();
            paramDictionary.Add("UsrKy", usrKy);
            paramDictionary.Add("CKy", cky);
            paramDictionary.Add("newChq", newChq);
            paramDictionary.Add("cash", cash);
            paramDictionary.Add("docno", docno);
            paramDictionary.Add("outlt", outlt);
            paramDictionary.Add("dt2", dt2);
            paramDictionary.Add("creditcrd", creditcrd);
            paramDictionary.Add("gftVou", gftVou);
            paramDictionary.Add("promo", promo);
            paramDictionary.Add("conCord", conCord);
            paramDictionary.Add("ourCode", ourCode);

            List<AcctrnModel> list = new List<AcctrnModel>();
            list = RunApiOperation(
                PNSCordinatorCollection,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as List<AcctrnModel>;
            return list;
        }
    }
}