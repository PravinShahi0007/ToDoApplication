using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BlueLotus.StockClosing.Model.Entity
{
    public class StockClosingModel
    {

        private long? pnsolcBalKy;
        public long? PNSOLCBalKy
        {
            get { return pnsolcBalKy; }
            set
            {
                if (value == null) pnsolcBalKy = 1;
                else pnsolcBalKy = value;
            }
        }

        public int OutletKy { get; set; }
        public string OutletCd { get; set; }
        public string OutletNm { get; set; }
        public string FrmDt { get; set; }
        public string ToDt { get; set; }
        public string EftvDate { get; set; }
        public double Amt { get; set; }


    }
}
