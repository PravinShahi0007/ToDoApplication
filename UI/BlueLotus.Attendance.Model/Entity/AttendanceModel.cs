using Riss.Devices;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BlueLotus.Attendance.Model.Entity
{
    public class AttendanceModel
    {
        public int AtnDetKy { get; set; }
        public int EmpKy { get; set; }
        public string EmpNo { get; set; }
        public string EmpNm { get; set; }
        public string InTime { get; set; }
        public string OutTime { get; set; }
        public bool isPrvDay { get; set; }
        public bool isNxtDay { get; set; }
        public bool Lunchork { get; set; }
        public bool NonWorkDay { get; set; }
        public string AtnDt { get; set; }
        public string TmStmp { get; set; }
        public int PrcsDetKy { get; set; }
        public int PrjKy { get; set; }
        public int BUKy { get; set; }

    }

    public class AttendanceInsertModel
    {
        public int AtnDetKy { get; set; }
        public string TmStmp { get; set; }
    }

    public class AttendenceDownloadModel
    {
        public int UsrKy { get; set; }
        public string ClkDt { get; set; }
    }

    public class UserInfoModel
    {
        public string UsrId { get; set; }
        public string UsrNm { get; set; }
        public string Pswd { get; set; }
        public int Privilege { get; set; }
        public string FaceId { get; set; }
        public int Length { get; set; }
        public bool isAct { get; set; }
    }

    public class DeviceCommEty
    {
        public DeviceCommEty() { }

        public DeviceConnection DeviceConnection { get; set; }

        public Device Device { get; set; }
    }

    public class Global
    {
        private Global() { }
        
        public const long DeviceBusy = 1;

        public const long DeviceIdle = 0;
    }

    public class MultiAtnModel
    {
        public int MulAtnDetKy { get; set; }
        public int AtnDetKy { get; set; }
        public int EmpKy { get; set; }
        public string InTime { get; set; }
        public string OutTime { get; set; }
        public bool isPrvDay { get; set; }
        public bool isNxtDay { get; set; }
        public string AtnDt { get; set; }
        public int PrcsDetKy { get; set; }
        public string TaskID { get; set; }
        public string TaskNm { get; set; }
        public int PrjKy { get; set; }
        public string PrjID { get; set; }
        public string PrjNm { get; set; }
        public int BUKy { get; set; }
        public int TTLMinute { get; set; }
        public string Des { get; set; }
        public int isAct { get; set; }
    }

    public class DeviceModel
    {
        public int DeviceKy { get; set; }
        public string DeviceID { get; set; }
        public string DeviceNm { get; set; }
        public string DeviceIP { get; set; }
        public int IMEI { get; set; }
        public string Model { get; set; }
        public string DevicePortNo { get; set; }

    }
}
