using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace BlueLotus.GeoLocation.Model.Entity
{
    public class GeoLocModel
    {
        public int UsrKy { get; set; }
        public string UsrNm { get; set; }
        public double Lat { get; set; }
        public double Long { get; set; }
        public string LogDt { get; set; }
    }
}
