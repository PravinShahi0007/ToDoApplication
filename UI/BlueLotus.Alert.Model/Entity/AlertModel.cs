using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace BlueLotus.Alert.Model.Entity
{
   public class AlertModel
    {
        public string Time { get; set; }
        public string Msg { get; set; }
        public string To { get; set; }
        public int EmailStat { get; set; }
        public int SMSStat { get; set; }
        public int MobileStat { get; set; }
        public string LstRnTm { get; set; }
    }
}
