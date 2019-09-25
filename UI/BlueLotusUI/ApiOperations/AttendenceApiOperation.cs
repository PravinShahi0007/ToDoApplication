using BlueLotus.Attendance.Model.Entity;
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
        string AttendenceBaseUri = "api/Attendence/";

        internal bool BL7ToBL10AtnClkDet_Insert(int CKy, int UsrKy, string EnvironmentName)
        {
            string actionUri = "BL7ToBL10AtnClkDet_Insert";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);


            object list = new object();
            list = RunApiOperation(
                AttendenceBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as object;

            return Convert.ToBoolean(list);
        }

        internal bool AtnClkDetToAtnDet_InsertWeb(int CKy, int UsrKy, string FrmDt, string ToDt, string EnvironmentName)
        {
            string actionUri = "AtnClkDetToAtnDet_InsertWeb";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("FrmDt", FrmDt);
            paramDictionary.Add("ToDt", ToDt);


            object list = new object();
            list = RunApiOperation(
                AttendenceBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as object;

            return Convert.ToBoolean(list);
        }

        internal long Attendance_InsertUpdateweb(int CKy, int UsrKy, int AtnDetKy, int EmpKy, int PrjKy, int PrcsDetKy, int BUKy, string AtnDt, int isPrvDay, int isNxtDay, string InDtm, string OutDtm, string AddMin, string DedMin, string Desc, string EnvironmentName)
        {
            string actionUri = "Attendance_InsertUpdateweb";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("AtnDetKy", AtnDetKy);
            paramDictionary.Add("EmpKy", EmpKy);
            paramDictionary.Add("PrjKy", PrjKy);
            paramDictionary.Add("PrcsDetKy", PrcsDetKy);
            paramDictionary.Add("BUKy", BUKy);
            paramDictionary.Add("AtnDt", AtnDt);
            paramDictionary.Add("isPrvDay", isPrvDay);
            paramDictionary.Add("isNxtDay", isNxtDay);
            paramDictionary.Add("InDtm", InDtm);
            paramDictionary.Add("OutDtm", OutDtm);
            paramDictionary.Add("AddMin", AddMin);
            paramDictionary.Add("DedMin", DedMin);
            paramDictionary.Add("Desc", Desc);


            object list = new object();
            list = RunApiOperation(
                AttendenceBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as object;

            return Convert.ToInt64(list);
        }

        internal List<AttendanceModel> Attendance_SearchSelectweb(int CKy, int UsrKy, int EmpKy, string FrmDt, string ToDt, string EnvironmentName)
        {
            string actionUri = "Attendance_SearchSelectweb";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("FrmDt", FrmDt);
            paramDictionary.Add("ToDt", ToDt);
            paramDictionary.Add("EmpKy", EmpKy);

            List<AttendanceModel> list = new List<AttendanceModel>();

            list = RunApiOperation(
                AttendenceBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as List<AttendanceModel>;

            return list;
        }


        internal List<MultiAtnModel> MultiAtnDet_SelectWeb(int CKy, int UsrKy, int EmpKy, string FrmDt, string ToDt, int ObjKy, string EnvironmentName)
        {
            string actionUri = "MultiAtnDet_SelectWeb";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);
            paramDictionary.Add("FrmDt", FrmDt);
            paramDictionary.Add("ToDt", ToDt);
            paramDictionary.Add("EmpKy", EmpKy);
            paramDictionary.Add("ObjKy", ObjKy);

            List<MultiAtnModel> list = new List<MultiAtnModel>();

            list = RunApiOperation(
                AttendenceBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as List<MultiAtnModel>;

            return list;
        }

        internal bool MultiAtnDet_InsertWeb(int CKy, int UsrKy, string newGrid, int ObjKy, string EnvironmentName)
        {


            bool rest = false;

            if (newGrid != "[]" && newGrid != "[null]" && newGrid != "")
            {
                try
                {
                    //ItmMasModel[] NewCodes = new JavaScriptSerializer().Deserialize<ItmMasModel[]>(NewGridDetail);
                    MultiAtnModel[] NewCodes = JsonConvert.DeserializeObject<MultiAtnModel[]>(newGrid);


                    object list = new object();
                    for (int i = 0; i < NewCodes.Length; i++)
                    {

                        string actionUri = "MultiAtnDet_InsertWeb";
                        Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

                        List<MultiAtnModel> lst = new List<MultiAtnModel>();
                        lst.Add(NewCodes[i]);
                        string NewmodelString = new JavaScriptSerializer().Serialize(lst);

                        paramDictionary.Add("CKy", CKy);
                        paramDictionary.Add("UsrKy", UsrKy);
                        paramDictionary.Add("ObjKy", ObjKy);
                        paramDictionary.Add("newGrid", NewmodelString);



                        list = RunApiOperation(
                            AttendenceBaseUri,
                            actionUri,
                            EnvironmentName,
                            paramDictionary,
                            rest.GetType()) as object;


                    }
                    return Convert.ToBoolean(list);
                }


                catch (Exception)
                {

                    throw;
                }
            }
            return rest;
        }


        internal bool MultiAtnDet_UpDateWeb(int CKy, int UsrKy, int objKy, string updateGrid, string EnvironmentName)
        {


            bool rest = false;

            if (updateGrid != "[]" && updateGrid != "[null]" && updateGrid != "")
            {
                try
                {
                    //ItmMasModel[] NewCodes = new JavaScriptSerializer().Deserialize<ItmMasModel[]>(NewGridDetail);
                    MultiAtnModel[] UpDateCodes = JsonConvert.DeserializeObject<MultiAtnModel[]>(updateGrid);

                    object list = new object();
#pragma warning disable CS0162 // Unreachable code detected
                    for (int i = 0; i < UpDateCodes.Length; i++)
#pragma warning restore CS0162 // Unreachable code detected
                    {

                        string actionUri = "MultiAtnDet_UpDateWeb";
                        Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

                        List<MultiAtnModel> lst = new List<MultiAtnModel>();
                        lst.Add(UpDateCodes[i]);
                        string NewmodelString = new JavaScriptSerializer().Serialize(lst);

                        paramDictionary.Add("CKy", CKy);
                        paramDictionary.Add("UsrKy", UsrKy);
                        paramDictionary.Add("ObjKy", objKy);
                        paramDictionary.Add("updateGrid", NewmodelString);



                        list = RunApiOperation(
                            AttendenceBaseUri,
                            actionUri,
                            EnvironmentName,
                            paramDictionary,
                            rest.GetType()) as object;



                    }
                    return Convert.ToBoolean(list);
                }


                catch (Exception ex)
                {

                    throw;
                }
            }
            return rest;
        }

        internal List<DeviceModel> Device_SelectWeb(int CKy, int UsrKy, string EnvironmentName)
        {
            string actionUri = "Device_SelectWeb";
            Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

            paramDictionary.Add("CKy", CKy);
            paramDictionary.Add("UsrKy", UsrKy);

            List<DeviceModel> list = new List<DeviceModel>();

            list = RunApiOperation(
                AttendenceBaseUri,
                actionUri,
                EnvironmentName,
                paramDictionary,
                list.GetType()) as List<DeviceModel>;

            return list;
        }

        internal bool AtnClkDet_InsertWeb(int CKy, int UsrKy, List<AttendenceDownloadModel> AtnDownloadLst, string EnvironmentName)
        {
            try
            {
                object list = new object();

                foreach (AttendenceDownloadModel item in AtnDownloadLst)
                {
                    string NewmodelString = new JavaScriptSerializer().Serialize(item);

                    string actionUri = "AtnClkDet_InsertWeb";
                    Dictionary<string, object> paramDictionary = new Dictionary<string, object>();

                    paramDictionary.Add("CKy", CKy);
                    paramDictionary.Add("UsrKy", UsrKy);
                    paramDictionary.Add("NewmodelString", NewmodelString);



                    list = RunApiOperation(
                        AttendenceBaseUri,
                        actionUri,
                        EnvironmentName,
                        paramDictionary,
                        list.GetType()) as object;
                }



                return Convert.ToBoolean(list);
            }
            catch (Exception ex)
            {

                throw ex;
            }


        }

    }
}