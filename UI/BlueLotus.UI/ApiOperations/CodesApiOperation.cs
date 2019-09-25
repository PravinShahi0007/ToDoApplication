using BlueLotus.Codes.Model.Entity;
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
        string codesBasUri = "api/Codes/";

        internal List<CdMas> GetAllCodes(string EnvironmentName, int Cky, int UsrKy, int ObjKy, string ConCd)
        {
            string actionUri = "GetAllCodes";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", Cky);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("ConCd", ConCd);

            List<CdMas> GetAllCodeList = new List<CdMas>();
            GetAllCodeList = RunApiOperation(
                codesBasUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                GetAllCodeList.GetType()) as List<CdMas>;

            return GetAllCodeList;
        }
        internal List<CdMas> CdMasCdTypLookup(string EnvironmentName, int Cky, int UsrKy, int ObjKy, string TblNm)
        {

            string actionUri = "CdMasCdTypLookup";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", Cky);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("ObjKy", ObjKy);
            paramDictionary.Add("TblNm", TblNm);

            List<CdMas> GetAllCodeList = new List<CdMas>();
            GetAllCodeList = RunApiOperation(
                   codesBasUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                GetAllCodeList.GetType()) as List<CdMas>;

            return GetAllCodeList;
        }

        internal List<CdMas_LookupWebByConCd> CdMas_LookupWebByConCd(string EnvironmentName, int CKy, int UsrKy, string ConCd)
        {
            string actionUri = "CdMas_LookupWebByConCd";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("ConCd", ConCd);

            List<CdMas_LookupWebByConCd> list = new List<CdMas_LookupWebByConCd>();
            list = RunApiOperation(
                codesBasUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as List<CdMas_LookupWebByConCd>;

            return list;
        }

        internal List<Codes_SelectModel> LoadGridView(string EnvironmentName, int Cky, int UsrKy, string GrpCdKy, string CdKy, string ConCdGrid)
        {
            string actionUri = "LoadGridView";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            // int Cky, int UsrKy, string ConCd, string CdKy, string GrpCdKy, string EnvironmentName
            paramDictionary.Add("Cky", Cky);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("ConCd", ConCdGrid);
            paramDictionary.Add("CdKy", CdKy);
            paramDictionary.Add("GrpCdKy", GrpCdKy);

            List<Codes_SelectModel> list = new List<Codes_SelectModel>();
            list = RunApiOperation(
                codesBasUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as List<Codes_SelectModel>;

            return list;
        }

        internal bool UpdateGridCodeToCodes(string EnvironmentName, string GridUpdateDetail, int CKy, int UsrKy)
        {
            string actionUri = "UpdateGrid";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("GridUpdateDetail", GridUpdateDetail);

            bool state = new bool();
            object obj = RunApiOperation(
                codesBasUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                state.GetType()) as object;

            return state = Convert.ToBoolean(obj);
        }

        internal List<string> GetAllConCodes(string EnvironmentName, int cky, int UsrKy, int ObjKy)
        {
            string actionUri = "GetAllConCodes";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", cky);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("ObjKy", ObjKy);

            List<string> GetAllCodeList = new List<string>();
            GetAllCodeList = RunApiOperation(
                codesBasUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                GetAllCodeList.GetType()) as List<string>;

            return GetAllCodeList;
        }

        internal bool InsertUpdateCode(string EnvironmentName, string UpdatedCdMasRecords, string NewCdMasRecords, string ConCd, int CKy, int UsrKy,string IsPrntChng,string objKy)
        {
            int InsertFinished = 0;
            int UpdateFinished = 0;
            int NewRecordLength = 0;
            int UpdateRecordLength = 0;

            if (NewCdMasRecords != "[]" && NewCdMasRecords != "[null]" && NewCdMasRecords != "")
            {
                try
                {
                    CdMas[] NewCodes = new JavaScriptSerializer().Deserialize<CdMas[]>(NewCdMasRecords);
                    NewRecordLength = NewCodes.Length;

                    for (int i = 0; i < NewCodes.Length; i++)
                    {
                        string actionUri = "InsertCode";
                        Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

                        string NewmodelString = new JavaScriptSerializer().Serialize(NewCodes[i]);

                        paramDictionary.Add("UsrKy", UsrKy);
                        paramDictionary.Add("CKy", CKy);
                        paramDictionary.Add("ConCd", ConCd);
                        paramDictionary.Add("NewCodesRecords", NewmodelString);

                        bool Reset = new bool();
                        object obj = RunApiOperation(
                            codesBasUri,
                            actionUri,
                            EnvironmentName,
                            paramDictionary,
                            Reset.GetType());

                        Reset = Convert.ToBoolean(obj);
                        InsertFinished++;
                    }

                }
                catch (Exception ex)
                {
                    throw;
                }
            }

            if (UpdatedCdMasRecords != "[]" && UpdatedCdMasRecords != "[null]" && UpdatedCdMasRecords != "")
            {
                try
                {
                    CdMas[] UpdateCodes = new JavaScriptSerializer().Deserialize<CdMas[]>(UpdatedCdMasRecords);
                    UpdateRecordLength = UpdateCodes.Length;

                    for (int i = 0; i < UpdateCodes.Length; i++)
                    {
                        string actionUri = "UpdateCode";
                        Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

                        string UpdatemodelString = new JavaScriptSerializer().Serialize(UpdateCodes[i]);

                        paramDictionary.Add("UsrKy", UsrKy);
                        paramDictionary.Add("CKy", CKy);
                        paramDictionary.Add("ConCd", ConCd);
                        paramDictionary.Add("UpdatedCodesRecords", UpdatemodelString);

                        bool Reset = new bool();
                        object obj = RunApiOperation(
                            codesBasUri,
                            actionUri,
                            EnvironmentName,
                            paramDictionary,
                            Reset.GetType());

                        Reset = Convert.ToBoolean(obj);
                        UpdateFinished++;
                    }
                }
                catch (Exception ex)
                {
                    throw;
                }

            }
            if (IsPrntChng.Equals("1"))
            {
                if ((UpdatedCdMasRecords != "[]" && UpdatedCdMasRecords != "[null]" && UpdatedCdMasRecords != "") || (NewCdMasRecords != "[]" && NewCdMasRecords != "[null]" && NewCdMasRecords != ""))
                {
                    if (InsertFinished == NewRecordLength && UpdateFinished == UpdateRecordLength)
                    {
                        string actionUri = "InsertCdMasParent";
                        Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

                        paramDictionary.Add("UsrKy", UsrKy);
                        paramDictionary.Add("CKy", CKy);
                        paramDictionary.Add("ConCd", ConCd);
                        paramDictionary.Add("ObjKy", objKy);
                         
                        object list = new object();
                        list = RunApiOperation(
                            codesBasUri,
                            actionUri,
                            EnvironmentName,
                            paramDictionary,
                            list.GetType()) as object;

                        return true;
                    }
                }
            }
            
            return true;
        }

        internal bool DeleteCodes(string EnvironmentName, int CdKy, int UsrKy)
        {
            string actionUri = "DeleteCode";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("CdKy", CdKy);

            bool result = new bool();
            object obj = RunApiOperation(
                codesBasUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                result.GetType()) as object;

            return result = Convert.ToBoolean(obj);
        }

        internal CdMas GetCodeByCdKy(string EnvironmentName, int UsrKy, long CdKy)
        {
            string actionUri = "GetCodeByCdKy";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("CdKy", CdKy);

            CdMas list = new CdMas();
            list = RunApiOperation(
                codesBasUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as CdMas;

            return list;
        }

        internal CdMas GetCdMasByCdKy(string EnvironmentName, int cdky, int UsrKy)
        {
            string actionUri = "GetCdMasByCdKy";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CdKy", cdky);
            paramDictionary.Add("UsrKy", UsrKy);

            CdMas list = new CdMas();
            list = RunApiOperation(
                codesBasUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as CdMas;

            return list;
        }

        internal long GetCdKyByConCdAndOurCd(string EnvironmentName, int CKy, int UsrKy, int ObjKy, string ConCd, string OurCd)
        {

            string actionUri = "GetCdKyByConCdAndOurCd";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("ObjKy", ObjKy);
            paramDictionary.Add("ConCd", ConCd);
            paramDictionary.Add("OurCd", OurCd);

            object list = new object();
            list = RunApiOperation(
                codesBasUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as object;

            return Convert.ToInt64(list);
        }

        // still not using.....
        internal bool CheckCdMasForExist(string EnvironmentName, int cky, int usrKy, string conCd, string code)
        {
            string actionUri = "CheckCdMasForExist";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", cky);
            paramDictionary.Add("UsrKy", usrKy);
            paramDictionary.Add("ConCd", conCd);
            paramDictionary.Add("Code", code);

            bool result = new bool();
            object obj = RunApiOperation(
                codesBasUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                result.GetType()) as object;

            return result = Convert.ToBoolean(obj);
        }


        internal CdMas GetCdMasBy_CdKy(string EnvironmentName, int CKy, int UsrKy, int ObjKy, int CdKy)
        {
            string actionUri = "GetCdMasBy_CdKy";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            // int Cky, int UsrKy, string ConCd, string CdKy, string GrpCdKy, string EnvironmentName
            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("ObjKy", ObjKy);
            paramDictionary.Add("CdKy", CdKy);

            CdMas list = new CdMas();
            list = RunApiOperation(
                codesBasUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as CdMas;

            return list;
        }

        internal List<CdMasdiagramModel> CdMasdiagram(string EnvironmentName, int CKy, int UsrKy, string ConCd)
        {
            string actionUri = "CdMas_CdMasdiagram";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("ConCd", ConCd);

            List<CdMasdiagramModel> list = new List<CdMasdiagramModel>();
            list = RunApiOperation(
                codesBasUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as List<CdMasdiagramModel>;

            return list;
        }
    }
}