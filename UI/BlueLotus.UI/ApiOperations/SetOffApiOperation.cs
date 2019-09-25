using BlueLotus.SetOff.Model.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web;
using BlueLotus.ViewModel.Entity;

namespace BlueLotus.UI.ApiOperations
{
    public partial class ApiOperation
    {
        string SetOffBaseUri = "api/SetOff/";
        public List<CusSupLookUp> SetOffAccCode(int CKy, int UsrKy, string ObjKy, string EnvironmentName)
        {

            string actionUri = "AccCode";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();
            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("ObjKy", ObjKy);


            List<CusSupLookUp> list = new List<CusSupLookUp>();
            list = RunApiOperation(
                SetOffBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as List<CusSupLookUp>;
            return list;
        }
        public List<CusSupLookUp> SetOffAccName(int CKy, int UsrKy, string ObjKy, string EnvironmentName)
        {

            string actionUri = "AccName";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();
            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("ObjKy", ObjKy);


            List<CusSupLookUp> list = new List<CusSupLookUp>();
            list = RunApiOperation(
                SetOffBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as List<CusSupLookUp>;
            return list;
        }

        public List<SetOffGridDetail> CrGridLoad(int CKy, int UsrKy, string AccKy, string ObjKy, string EnvironmentName, string hdrsetOffKy)
        {

            string actionUri = "CrGrid";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();
            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("ObjKy", ObjKy);
            paramDictionary.Add("AccKy", AccKy);
            paramDictionary.Add("hdrsetOffKy", hdrsetOffKy);




            List<SetOffGridDetail> list = new List<SetOffGridDetail>();
            list = RunApiOperation(
                SetOffBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as List<SetOffGridDetail>;
            return list;
        }

        public List<SetOffGridDetail> DrGridLoad(int CKy, int UsrKy, string AccKy, string ObjKy, string EnvironmentName, string hdrsetOffKy)
        {

            string actionUri = "DrGrid";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();
            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("ObjKy", ObjKy);
            paramDictionary.Add("AccKy", AccKy);
            paramDictionary.Add("hdrsetOffKy", hdrsetOffKy);


            List<SetOffGridDetail> list = new List<SetOffGridDetail>();
            list = RunApiOperation(
                SetOffBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as List<SetOffGridDetail>;
            return list;
        }

        public long SetOffSave(int CKy, int UsrKy, string CrGridUpdate, string DrGridUpdate, string ConCord, string Code, string Date, string DocNo, string ObjKy,string HdrKy, string EnvironmentName)
        {
            string a = "";
            //HttpResponseMessage response = httpClient.GetAsync(this.GetUriWithEnvironment(EnvironmentName, "api/SetOff/SaveSetOff?CKy=" + CKy + "&UsrKy=" + UsrKy + "&CrGridUpdate=" + CrGridUpdate + "&DrGridUpdate=" + DrGridUpdate + "&ConCord=" + ConCord + "&Code=" + Code + "&Date=" + Date + "&DocNo=" + DocNo + "&ObjKy=" + ObjKy + "&HdrKy=" + HdrKy)).Result;
            //long AccSetOffKy = 0;

            //if (response.IsSuccessStatusCode)
            //{
            //    string SucessStrng = response.Content.ReadAsStringAsync().Result;
            //    AccSetOffKy = Convert.ToInt64(SucessStrng);

            //}


          //  return AccSetOffKy;
          //test
            string actionUri = "SaveSetOff";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();
            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("CrGridUpdate", CrGridUpdate);
            paramDictionary.Add("DrGridUpdate", DrGridUpdate);
            paramDictionary.Add("ConCord", ConCord);
            paramDictionary.Add("Code", Code);
            paramDictionary.Add("Date", Date);
            paramDictionary.Add("DocNo", DocNo);
            paramDictionary.Add("ObjKy", ObjKy);
            paramDictionary.Add("HdrKy", HdrKy);

            long Sucess = new long();
            object obj = RunApiOperation(
                SetOffBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                Sucess.GetType());
            Sucess = Convert.ToInt64(obj);

            return Sucess;
        }


        public List<JournalFindModel> LoadsetoffGridFindView(string EnvironmentName, string frmDt, string toDt, string trnNo, string docNo, int cKy, int usrKy, string accKy)
        {
            string actionUri = "FindForm";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();
            paramDictionary.Add("FrmDt", frmDt);
            paramDictionary.Add("ToDt", toDt);
            paramDictionary.Add("TrnNo", trnNo);
            paramDictionary.Add("DocNo", docNo);
            paramDictionary.Add("CKy", cKy);
            paramDictionary.Add("UsrKy", usrKy);
            paramDictionary.Add("AccKy", accKy);

            List<JournalFindModel> list = new List<JournalFindModel>();
            list = RunApiOperation(
                SetOffBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as List<JournalFindModel>;
            return list;
        }
    }
}//