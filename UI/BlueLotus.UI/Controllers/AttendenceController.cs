using BlueLotus.Attendance.Model.Entity;
using BlueLotus.UI.ApiOperations;
using BlueLotus.UI.Models;
using Riss.Devices;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Configuration;
using System.Web.Mvc;

namespace BlueLotus.UI.Controllers
{
    public class AttendenceController : Controller
    {
        private DeviceConnection deviceConnection;
        private Riss.Devices.Device device;
        public DeviceCommEty deviceEty;
        public DeviceCommEty OBJ = new DeviceCommEty();

        //iFace 303 attendance
        //public zkemkeeper.CZKEMClass axCZKEM1 = new zkemkeeper.CZKEMClass();

#pragma warning disable CS0414 // The field 'AttendenceController.bIsConnected' is assigned but its value is never used
        private bool bIsConnected = false;//the boolean value identifies whether the device is connected
#pragma warning restore CS0414 // The field 'AttendenceController.bIsConnected' is assigned but its value is never used
#pragma warning disable CS0414 // The field 'AttendenceController.iMachineNumber' is assigned but its value is never used
        private int iMachineNumber = 1;//the serial number of the device.After connecting the device ,this value will be changed.
#pragma warning restore CS0414 // The field 'AttendenceController.iMachineNumber' is assigned but its value is never used


        ApiOperation apiOpr = new ApiOperation();

        //
        // GET: /Attendence/

        public ActionResult Index(string OurCd, string OurCd2, int ObjKy, string ObjCaptn)
        {
            ViewBag.OurCd = OurCd;
            ViewBag.OurCd2 = OurCd2;
            ViewBag.ObjKy = ObjKy;
            ViewBag.ObjCaptn = ObjCaptn;

            return View();
        }


        public ActionResult DailyAttendanceEntry(string OurCd, string OurCd2, int ObjKy, string ObjCaptn)
        {
            ViewBag.OurCd = OurCd;
            ViewBag.OurCd2 = OurCd2;
            ViewBag.ObjKy = ObjKy;
            ViewBag.ObjCaptn = ObjCaptn;

            return View("DailyAttendanceEntry");
        }

        public ActionResult MultiAttendanceEntry(string OurCd, string OurCd2, int ObjKy, string ObjCaptn)
        {
            ViewBag.OurCd = OurCd;
            ViewBag.OurCd2 = OurCd2;
            ViewBag.ObjKy = ObjKy;
            ViewBag.ObjCaptn = ObjCaptn;

            return View("MultiAttendanceEntry");
        }

        public ActionResult AttendenceDownload(string OurCd, string OurCd2, int ObjKy, string ObjCaptn)
        {
            ViewBag.OurCd = OurCd;
            ViewBag.OurCd2 = OurCd2;
            ViewBag.ObjKy = ObjKy;
            ViewBag.ObjCaptn = ObjCaptn;

            return View("AttendenceDownload");
        }

        public JsonResult BL7ToBL10AtnClkDet_Insert()
        {
            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;
            string EnvironmentName = HTNSession.Environment;
            bool list = apiOpr.BL7ToBL10AtnClkDet_Insert(CKy, UsrKy, EnvironmentName);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult AtnClkDetToAtnDet_InsertWeb(string FrmDt, string ToDt)
        {
            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;
            string EnvironmentName = HTNSession.Environment;
            bool list = apiOpr.AtnClkDetToAtnDet_InsertWeb(CKy, UsrKy, FrmDt, ToDt, EnvironmentName);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Attendance_InsertUpdateweb(int AtnDetKy, int EmpKy, int PrjKy, int PrcsDetKy, int BUKy, string AtnDt, int isPrvDay, int isNxtDay, string InDtm, string OutDtm, string AddMin, string DedMin, string Desc)
        {
            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;
            string EnvironmentName = HTNSession.Environment;
            long list = apiOpr.Attendance_InsertUpdateweb(CKy, UsrKy, AtnDetKy, EmpKy, PrjKy, PrcsDetKy, BUKy, AtnDt, isPrvDay, isNxtDay, InDtm, OutDtm, AddMin, DedMin, Desc, EnvironmentName);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Attendance_SearchSelectweb(int EmpKy, string FrmDt, string ToDt)
        {
            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;
            string EnvironmentName = HTNSession.Environment;
            List<AttendanceModel> list = new List<AttendanceModel>();
            list = apiOpr.Attendance_SearchSelectweb(CKy, UsrKy, EmpKy, FrmDt, ToDt, EnvironmentName);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult MultiAtnDet_SelectWeb(int EmpKy, string FrmDt, string ToDt, string ObjKy)
        {
            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;
            string EnvironmentName = HTNSession.Environment;
            List<MultiAtnModel> list = new List<MultiAtnModel>();
            list = apiOpr.MultiAtnDet_SelectWeb(CKy, UsrKy, EmpKy, FrmDt, ToDt, Convert.ToInt32(ObjKy), EnvironmentName);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult MultiAtnDet_InsertWeb(string newGrid, string ObjKy)
        {
            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;
            string EnvironmentName = HTNSession.Environment;
            bool list = apiOpr.MultiAtnDet_InsertWeb(CKy, UsrKy, newGrid, Convert.ToInt32(ObjKy), EnvironmentName);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult MultiAtnDet_UpdateWeb(string updateGrid, string objKy)
        {
            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;
            int ObjKy = Convert.ToInt32(objKy);
            string EnvironmentName = HTNSession.Environment;
            bool list = apiOpr.MultiAtnDet_UpDateWeb(CKy, UsrKy, ObjKy, updateGrid, EnvironmentName);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Device_SelectWeb()
        {
            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;
            string EnvironmentName = HTNSession.Environment;
            List<DeviceModel> list = apiOpr.Device_SelectWeb(CKy, UsrKy, EnvironmentName);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        //public JsonResult ConnecttoDevice(int DN, string Model, int ConnectionModel, string IpAddress, int IpPort)
        //{
        //    int con = 0;
        //    device = new Riss.Devices.Device();
        //    device.CommunicationType = CommunicationType.Tcp;
        //    device.DN = DN;
        //    device.IpAddress = IpAddress;
        //    device.Model = Model;
        //    device.ConnectionModel = ConnectionModel;
        //    device.IpPort = IpPort;

        //    deviceConnection = DeviceConnection.CreateConnection(ref device);
        //    if (deviceConnection.Open() > 0)
        //    {
        //        con = 1;
        //        deviceEty = new DeviceCommEty();
        //        deviceEty.Device = device;
        //        deviceEty.DeviceConnection = deviceConnection;
        //        OBJ.Device = device;
        //        //string IP = deviceEty.Device.IpAddress;
        //    }

        //    return Json(con, JsonRequestBehavior.AllowGet);
        //}


        private List<DateTime> GetDateTimeList(string FrmDt, string ToDt)
        {
            List<DateTime> dtList = new List<DateTime>();
            DateTime dt1 = DateTime.ParseExact(FrmDt, "dd/MM/yyyy", null);
            DateTime dt2 = DateTime.ParseExact(ToDt, "dd/MM/yyyy", null);
            dtList.Add(dt1);
            dtList.Add(dt2);
            return dtList;
        }

        public JsonResult DownloadAttendence(int DN, string Model, int ConnectionModel, string IpAddress, int IpPort, string FrmDt, string ToDt)
        {
            int Result = 0;
            int Result1 = 0;

            int UsrKy = HTNSession.UsrKy;
            int CKy = HTNSession.CKy;
            //string EnvironmentName = HTNSession.Environment;
            string EnvironmentName = "";
            try
            {
                if (WebConfigurationManager.AppSettings["AttendenceInsertEnvNm"] != null && WebConfigurationManager.AppSettings["AttendenceInsertEnvNm"] != "")
                {
                    EnvironmentName = WebConfigurationManager.AppSettings["AttendenceInsertEnvNm"];
                }
                else
                {
                    EnvironmentName = HTNSession.Environment;
                }

            }
            catch (Exception)
            {

            }
            //string EnvironmentName = WebConfigurationManager.AppSettings["AttendenceInsertEnvNm"];

            device = new Riss.Devices.Device();
            device.CommunicationType = CommunicationType.Tcp;
            device.DN = DN;
            device.IpAddress = IpAddress;
            device.Model = Model;
            device.ConnectionModel = ConnectionModel;
            device.IpPort = IpPort;

            deviceConnection = DeviceConnection.CreateConnection(ref device);
            if (deviceConnection.Open() > 0)
            {
                Result1 = 1;
                deviceEty = new DeviceCommEty();
                deviceEty.Device = device;
                deviceEty.DeviceConnection = deviceConnection;

            }
            else
            {
                return Json(Result, JsonRequestBehavior.AllowGet);
            }

            object extraProperty = new object();
            object extraData = new object();
            extraData = Global.DeviceBusy;

            if (Result1 == 1)
            {
                try
                {
                    FrmDt = "01/01/2017";
                    ToDt = "31/12/2099";
                    List<DateTime> dtList = GetDateTimeList(FrmDt, ToDt);
                    bool result = deviceConnection.SetProperty(DeviceProperty.Enable, extraProperty, device, extraData);
                    extraProperty = false;
                    extraData = dtList;
                    result = deviceConnection.GetProperty(DeviceProperty.AttRecordsCount, extraProperty, ref device,
                        ref extraData);
                    if (false == result)
                    {
                        return Json(Result, JsonRequestBehavior.AllowGet);
                    }

                    int recordCount = (int)extraData;
                    if (0 == recordCount)
                    {
                        return Json(Result, JsonRequestBehavior.AllowGet);
                    }

                    List<bool> boolList = new List<bool>();
                    boolList.Add(false);
                    boolList.Add(false);
                    extraProperty = boolList;
                    extraData = dtList;
                    result = deviceConnection.GetProperty(DeviceProperty.AttRecords, extraProperty, ref device, ref extraData);
                    if (result)
                    {
                        List<Record> recordList = (List<Record>)extraData;


                        List<AttendenceDownloadModel> AtnDownloadLst = new List<AttendenceDownloadModel>();

                        foreach (Record item in recordList)
                        {
                            AttendenceDownloadModel obj = new AttendenceDownloadModel();
                            obj.UsrKy = Convert.ToInt32(item.DIN);
                            obj.ClkDt = item.Clock.ToString();
                            AtnDownloadLst.Add(obj);

                        }
                        var stringList = AtnDownloadLst.OfType<string>();
                        bool res = apiOpr.AtnClkDet_InsertWeb(CKy, UsrKy, AtnDownloadLst, EnvironmentName);
                        if (res)
                        {
                            //bool clear = deviceConnection.SetProperty(DeviceProperty.Enable, extraProperty, device, extraData);
                            bool clear = deviceConnection.SetProperty(DeviceProperty.AttRecords, extraProperty, device, extraData);
                            if (clear)
                            {

                                //lvw_GLogList.Items.Clear();
                                Result = 1;
                            }
                        }

                    }
                    else
                    {
                        return Json(Result, JsonRequestBehavior.AllowGet);
                    }
                }
#pragma warning disable CS0168 // The variable 'ex' is declared but never used
                catch (Exception ex)
#pragma warning restore CS0168 // The variable 'ex' is declared but never used
                {
                    return Json(Result, JsonRequestBehavior.AllowGet);
                }


                finally
                {
                    extraData = Global.DeviceIdle;
                    deviceConnection.SetProperty(DeviceProperty.Enable, extraProperty, device, extraData);
                    deviceConnection.Close();
                    device = null;
                    deviceConnection = null;
                    deviceEty = null;
                }
            }

            return Json(Result, JsonRequestBehavior.AllowGet);
        }


        //public JsonResult DownloadFaceAttendence(string IpAddress, int IpPort)
        //{
        //    int Result = 0;
        //    int Result1 = 0;

        //    int UsrKy = HTNSession.UsrKy;
        //    int CKy = HTNSession.CKy;
        //    string EnvironmentName = HTNSession.Environment;


        //    if (IpAddress == "" || IpPort == 0)
        //    {
        //        return Json(Result, JsonRequestBehavior.AllowGet);
        //    }


        //    bIsConnected = axCZKEM1.Connect_Net(IpAddress, IpPort);
        //    if (bIsConnected == true)
        //    {
        //        Result1 = 1;
        //        iMachineNumber = 1;//In fact,when you are using the tcp/ip communication,this parameter will be ignored,that is any integer will all right.Here we use 1.
        //        axCZKEM1.RegEvent(iMachineNumber, 65535);//Here you can register the realtime events that you want to be triggered(the parameters 65535 means registering all)
        //    }
        //    else
        //    {
        //        return Json(Result, JsonRequestBehavior.AllowGet);
        //    }

        //    if (Result1 == 1)
        //    {
        //        try
        //        {

        //            if (bIsConnected == false)
        //            {
        //                return Json(Result, JsonRequestBehavior.AllowGet);
        //            }

        //            int idwErrorCode = 0;

        //            string sdwEnrollNumber = "";
        //            int idwVerifyMode = 0;
        //            int idwInOutMode = 0;
        //            int idwYear = 0;
        //            int idwMonth = 0;
        //            int idwDay = 0;
        //            int idwHour = 0;
        //            int idwMinute = 0;
        //            int idwSecond = 0;
        //            int idwWorkcode = 0;


        //            axCZKEM1.EnableDevice(iMachineNumber, false);//disable the device
        //            List<AttendenceDownloadModel> AtnDownloadLst = new List<AttendenceDownloadModel>();


        //            if (axCZKEM1.ReadGeneralLogData(iMachineNumber))//read all the attendance records to the memory
        //            {
        //                while (axCZKEM1.SSR_GetGeneralLogData(iMachineNumber, out sdwEnrollNumber, out idwVerifyMode,
        //                            out idwInOutMode, out idwYear, out idwMonth, out idwDay, out idwHour, out idwMinute, out idwSecond, ref idwWorkcode))//get records from the memory
        //                {
        //                    AttendenceDownloadModel obj = new AttendenceDownloadModel();
        //                    obj.UsrKy = Convert.ToInt32(sdwEnrollNumber);
        //                    string Dt = idwYear.ToString() + "-" + idwMonth.ToString() + "-" + idwDay.ToString() + " " + idwHour.ToString() + ":" + idwMinute.ToString() + ":" + idwSecond.ToString();
        //                    obj.ClkDt = Dt;
        //                    AtnDownloadLst.Add(obj);

        //                }
        //                bool res = false;
        //                if (AtnDownloadLst != null && AtnDownloadLst.Count > 0)
        //                {
        //                    res = apiOpr.AtnClkDet_InsertWeb(CKy, UsrKy, AtnDownloadLst, EnvironmentName);
        //                }
        //                else
        //                {
        //                    Result = 1;
        //                }
        //                if (res)
        //                {

        //                    if (axCZKEM1.ClearGLog(iMachineNumber))
        //                    {
        //                        bool clear = axCZKEM1.RefreshData(iMachineNumber);//the data in the device should be refreshed
        //                        Result = 1;
        //                    }
        //                    else
        //                    {
        //                        Result = 1;
        //                    }
        //                }

        //            }

        //            else
        //            {
        //                axCZKEM1.GetLastError(ref idwErrorCode);

        //                if (idwErrorCode != 0)
        //                {
        //                    return Json(Result, JsonRequestBehavior.AllowGet);
        //                }
        //                else
        //                {
        //                    Result = 1;
        //                    return Json(Result, JsonRequestBehavior.AllowGet);
        //                }
        //            }


        //        }

        //        catch (Exception ex)
        //        {
        //            return Json(Result, JsonRequestBehavior.AllowGet);
        //        }


        //        finally
        //        {
        //            axCZKEM1.EnableDevice(iMachineNumber, true); //enable the device
        //            axCZKEM1.Disconnect(); //Disconnect the connection
        //        }
        //    }


        //    return Json(Result, JsonRequestBehavior.AllowGet);
        //}



    }
}
