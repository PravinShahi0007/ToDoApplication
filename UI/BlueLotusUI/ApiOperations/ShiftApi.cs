using BlueLotus.Shift_Model.entity;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;

namespace BlueLotus.UI.ApiOperations
{
    public partial class ApiOperation
    {
        string ShiftBaseUri = "api/Shift/";

        internal int Shift_InsertUpdateWeb(int CKy, int UsrKy, int Cdky, string FrmTm, string ToTm, string GraceInTm, string GraceOutTm, string FstHlfDayToTm, string SecHlfDayFrmTm, string EarlyOTFrmTm, string LateOTFrmTm, string MinHrHfDay, string MinHrDay, int isToTmNxtDay, int isAtnDtInDtm, int Day, int ShiftAmt, int ShiftKy, string EnvironmentName)
        {

            string actionUri = "Shift_InsertUpdateWeb";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("Cdky", Cdky);
            paramDictionary.Add("FrmTm", FrmTm);
            paramDictionary.Add("ToTm", ToTm);
            paramDictionary.Add("GraceInTm", GraceInTm);
            paramDictionary.Add("GraceOutTm", GraceOutTm);
            paramDictionary.Add("FstHlfDayToTm", FstHlfDayToTm);
            paramDictionary.Add("SecHlfDayFrmTm", SecHlfDayFrmTm);
            paramDictionary.Add("EarlyOTFrmTm", EarlyOTFrmTm);
            paramDictionary.Add("LateOTFrmTm", LateOTFrmTm);
            paramDictionary.Add("MinHrHfDay", MinHrHfDay);
            paramDictionary.Add("MinHrDay", MinHrDay);
            paramDictionary.Add("isToTmNxtDay", isToTmNxtDay);
            paramDictionary.Add("isAtnDtInDtm", isAtnDtInDtm);
            paramDictionary.Add("Day", Day);
            paramDictionary.Add("ShiftAmt", ShiftAmt);
            paramDictionary.Add("ShiftKy", ShiftKy);

            object list = new object();
            list = RunApiOperation(
                ShiftBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as object;

            return Convert.ToInt32(list);
        }

        internal Shiftentry Shift_SelectWeb(int CKy, int UsrKy, int ShiftKy, string EnvironmentName)
        {

            string actionUri = "Shift_SelectWeb";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("ShiftKy", ShiftKy);

            Shiftentry list = new Shiftentry();
            list = RunApiOperation(
                ShiftBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as Shiftentry;

            return list;
        }
        internal List<ShiftGroup> ShiftGroup_Selectweb(int CKy, int UsrKy, int ShiftGrpKy, string EnvironmentName)
        {
            string actionUri = "ShiftGroup_Selectweb";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();


            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("ShiftGrpKy", ShiftGrpKy);

            List<ShiftGroup> list = new List<ShiftGroup>();
            list = RunApiOperation(
                ShiftBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as List<ShiftGroup>;

            return list;

        }

        internal bool ShiftGroup_InsertUpdateWeb(int CKy, int UsrKy, string GridShiftGroup, int ShiftGrpKy, string EnvironmentName)
        {

            bool rest = false;

            if (GridShiftGroup != "[]" && GridShiftGroup != "[null]" && GridShiftGroup != "")
            {
                try
                {
                    ShiftGroup[] NewCodes = JsonConvert.DeserializeObject<ShiftGroup[]>(GridShiftGroup);

                    for (int i = 0; i < NewCodes.Length; i++)
                    {
                        string actionUri = "ShiftGroup_InsertUpdateWeb";
                        Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

                        List<ShiftGroup> lst = new List<ShiftGroup>();
                        lst.Add(NewCodes[i]);
                        string NewmodelString = new JavaScriptSerializer().Serialize(lst);

                        paramDictionary.Add("CKy", CKy);
                        paramDictionary.Add("UsrKy", UsrKy);
                        paramDictionary.Add("ShiftGrpKy", ShiftGrpKy);
                        paramDictionary.Add("GridShiftGroup", NewmodelString);


                        object list = new object();
                        list = RunApiOperation(
                            ShiftBaseUri,
                            actionUri,
                            EnvironmentName,
                            paramDictionary,
                            rest.GetType()) as object;

                        rest = Convert.ToBoolean(list);
                    }

                }
                catch (Exception)
                {

                    throw;
                }
            }
            return rest;
        }
    }

}