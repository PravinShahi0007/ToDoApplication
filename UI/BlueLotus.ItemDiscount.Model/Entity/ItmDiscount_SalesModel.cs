using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BlueLotus.ItemDiscount.Model.Entity
{
    public class ItmDiscount_SalesModel
    {
        private int? itmADKy;
        public int? ItmADKy
        {
            get { return itmADKy; }
            set {
                if (value == null || value == 0) itmADKy = 1;
                else itmADKy = value;
            }
        }

        private int? controlConKy;
        public int? ControlConKy
        {
            get { return controlConKy; }
            set {
                if (value == null || value == 0) controlConKy = 1;
                else controlConKy = value;
            }
        }

        public int TrnTypKy { get; set; }
        public bool isDet { get; set; }
        public int ItmKy { get; set; }
        public int ItmPriCatKy { get; set; }
        public string ItmPriCat { get; set; }
        public int ItmTypKy { get; set; }
        public int AdrKy { get; set; }
        public int AdrPriCatKy { get; set; }
        public string AdrPriCat { get; set; }
        public int PmtTrmKy { get; set; }
        public int PmtModeKy { get; set; }
        public string PmtTrm { get; set; }
        public string PmtMode { get; set; }
        public string EftvDt { get; set; }
        public string PreDate { get; set; }
        public double Qty { get; set; }
        public double LineAmt { get; set; }
        public double TrnAmt { get; set; }
        public double Value { get; set; }
        public double PreValue { get; set; }
        public string TmStmp { get; set; }


    }
}
