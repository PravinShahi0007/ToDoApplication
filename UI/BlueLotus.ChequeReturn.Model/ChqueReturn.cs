using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BlueLotus.ChequeReturn.Model
{
    public class ChqueReturn
    {
        public string Date { get; set; }
        public string BuNm { get; set; }
        public string AccKy { get; set; }

        public string PrjNm { get; set; }
        public string ChqNu { get; set; }

        public string Amount { get; set; }
        public string BankAccKy { get; set; }
        public string TrnNo { get; set; }
        public string LiNo { get; set; }
        public string TimeStamp { get; set; }
        public string AccTrnKy { get; set; }
        public string PmtDet { get; set; }
        public string OurCode { get; set; }

    }

    public class CheqSaveDetail
    {
        public decimal TrnKy { get; set; }
        public bool isUpdate { get; set; }

        public bool isSave { get; set; }

    }
}
