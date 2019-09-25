using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BlueLotus.PNSCollection.Model.PNSCashier_Collection
{
   public class CashierCollectionModel
    {
        public double? TotalCash { get; set; }
        public string PmtDocNo { get; set; }
        public string AccCd { get; set; }
        public string BUKy { get; set; }

        public string BnkKy { get; set; }

        public string bankNm { get; set; }

        public string ChqNO { get; set; }



        public string Amt { get; set; }


    }

    public class PNSCordinatormodel
    {
        public Int64 AccKy { get; set; }
        public string AccCd { get; set; }
        public string AccNm { get; set; }

    }
}
