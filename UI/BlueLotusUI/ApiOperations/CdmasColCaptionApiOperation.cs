using BlueLotus.CdmasColCaption.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BlueLotus.UI.ApiOperations
{
    public partial class ApiOperation
    {
        string BaseURi = "api/CdmasColCaption/";

        internal List<CdmasColCaptionModel> CdMasColCaption_SelectWeb(string EnvironmentName, int Cky, int UsrKy, string ConCd,int ObjKy)
        {
            string actionUri = "CdMasColCaption_SelectWeb";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", Cky);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("ConCd", ConCd);
            paramDictionary.Add("ObjKy", ObjKy);

            List<CdmasColCaptionModel> colcaptnList = new List<CdmasColCaptionModel>();
            colcaptnList = RunApiOperation(
                BaseURi,
                actionUri,
                EnvironmentName,
                paramDictionary,
                colcaptnList.GetType()) as List<CdmasColCaptionModel>;

            return colcaptnList;
        }
    }
}