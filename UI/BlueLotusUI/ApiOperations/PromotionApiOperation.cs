using BlueLotus.Promotion.Model.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BlueLotus.UI.ApiOperations
{
    public partial class ApiOperation
    {
        string PromoBaseUri = "api/Promotion/";

        internal List<PromotionModel> ItmMasOfrHdr_SelectWeb(string EnvironmentName, int CKy, int UsrKy)
        {
            string actionUri = "ItmMasOfrHdr_SelectWeb";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);

            List<PromotionModel> List = new List<PromotionModel>();
            List = RunApiOperation(
                PromoBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                List.GetType()) as List<PromotionModel>;

            return List;
        }

        internal bool InsertUpdateItmMasOfrHdr(string EnvironmentName, int CKy, int UsrKy, int ItmOfrKy, int ItmOfrTypKy, string ItmOfrCd, string ItmOfrNm, double BuyQty, double OfrQty, string FrmDt, string ToDt)
        {
            string actionUri = "InsertUpdateItmMasOfrHdr";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("ItmOfrKy", ItmOfrKy);
            paramDictionary.Add("ItmOfrTypKy", ItmOfrTypKy);
            paramDictionary.Add("ItmOfrCd", ItmOfrCd);
            paramDictionary.Add("ItmOfrNm", ItmOfrNm);
            paramDictionary.Add("FrmDt", FrmDt);
            paramDictionary.Add("ToDt", ToDt);
            paramDictionary.Add("BuyQty", BuyQty);
            paramDictionary.Add("OfrQty", OfrQty);

            bool res = new bool();
            object obj = RunApiOperation(
                PromoBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                res.GetType());
            res = Convert.ToBoolean(obj);
            return res;
        }

        internal List<PromotionDetModel> ItmMasOfrDet_SelectWeb(string EnvironmentName, int CKy, int UsrKy, int ItmOfrKy)
        {
            string actionUri = "ItmMasOfrDet_SelectWeb";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("ItmOfrKy", ItmOfrKy);

            List<PromotionDetModel> List = new List<PromotionDetModel>();
            List = RunApiOperation(
                PromoBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                List.GetType()) as List<PromotionDetModel>;

            return List;
        }

        internal bool ItmMasOfrDet_InsertUpdate(string EnvironmentName, int CKy, int UsrKy, string NewGridDetail)
        {
            string actionUri = "ItmMasOfrDet_InsertUpdate";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("NewGridDetail", NewGridDetail);

            bool res = new bool();
            object obj = RunApiOperation(
                PromoBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                res.GetType());
            res = Convert.ToBoolean(obj);
            return res;
        }

        internal bool ItmMasOfrDet_DeleteWeb(string EnvironmentName, int ItmOfrKy)
        {
            string actionUri = "ItmMasOfrDet_DeleteWeb";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("ItmOfrKy", ItmOfrKy);

            bool res = new bool();
            object obj = RunApiOperation(
                PromoBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                res.GetType());
            res = Convert.ToBoolean(obj);
            return res;
        }


    }
}