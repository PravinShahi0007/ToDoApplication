using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BlueLotus.PNSCollection.Model.PNSCordinatorDeposti
{
    public class AccountModel
    {
        public int AccKy { get; set; }
        public string AccCode { get; set; }

    }
    public class BankModel
    {
        public int CdKy { get; set; }
        public string Code { get; set; }

    }
    public class PNSBanKChqueModel
    {
        public double Amt { get; set; }

        public string ChqNo { get; set; }

        public double TrnKy { get; set; }

        public string bankNm { get; set; }
        public string BnkKy { get; set; }

    }

    public class DepositSaveDetails
    {
        public double TrKy { get; set; }

        public string TrnNo { get; set; }
        
    }
}
