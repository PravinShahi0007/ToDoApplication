using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using BlueLots.ItemCosting.Model;

namespace BlueLotus.UI.ApiOperations
{
    public partial class ApiOperation
    {
        string ItemCostingBaseUri = "api/ItemCosting/";
        internal List<ItemCosting> GetGridDetail(string EnvironmentName, int cKy, int usrKy, string objKy, string trnKy)
        {
            string actionUri = "GetHeader";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();
            paramDictionary.Add("Cky", cKy);
            paramDictionary.Add("UsrKy", usrKy);
            paramDictionary.Add("ObjKy", objKy);
            paramDictionary.Add("trnky", trnKy);

            List<ItemCosting> list = new List<ItemCosting>();
            list = RunApiOperation(
                ItemCostingBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as List<ItemCosting>;
            return list;
        }
       
        internal List<ItemCosting> GetDetailGridDetail(string EnvironmentName, int cKy, int usrKy, string objKy, string ItemTrnKy)
        {
            string actionUri = "GetDetailGrid";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();
            paramDictionary.Add("Cky", cKy);
            paramDictionary.Add("UsrKy", usrKy);
            paramDictionary.Add("ObjKy", objKy);
            paramDictionary.Add("ItemTrnKy", ItemTrnKy);

            List<ItemCosting> list = new List<ItemCosting>();
            list = RunApiOperation(
                ItemCostingBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as List<ItemCosting>;
            return list;
        }

        internal bool ItemCostingSaveUpdate(string EnvironmentName, int cKy, int usrKy, string objKy, string HdrDetails, string DetailGrid)
        {
            string actionUri = "ItemCostingSaveUpdate";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();
            paramDictionary.Add("Cky", cKy);
            paramDictionary.Add("UsrKy", usrKy);
            paramDictionary.Add("ObjKy", objKy);
            paramDictionary.Add("HdrDetails", HdrDetails);
            paramDictionary.Add("DetailGrid", DetailGrid);

            bool Sucess = new bool();
            object obj = RunApiOperation(
                ItemCostingBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                Sucess.GetType());
            Sucess = Convert.ToBoolean(obj);
            return Sucess;
            
        }
    }
}