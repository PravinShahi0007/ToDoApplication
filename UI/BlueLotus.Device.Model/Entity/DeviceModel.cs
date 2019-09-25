using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace BlueLotus.Device.Model.Entity
{
   public class DeviceModel
    {
        public int DeviceKy { get; set; }
        public int CKy { get; set; }
        public string DeviceIP { get; set; }
        public string DeviceNm { get; set; }
        public int IMEI { get; set; }
        public string DeviceID { get; set; }
        public int isAct { get; set; }
        public int isApr { get; set; }
        public string UsrNm { get; set; }
        public int UsrKy { get; set; }
    }
}
