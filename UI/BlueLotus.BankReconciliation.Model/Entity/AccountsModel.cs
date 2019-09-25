using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BlueLotus.BankReconciliation.Model.Entity
{
    public class AccountsModel
    {
        public Int64 AccKy { get; set; }
        public string AccCd { get; set; }
        public string AccNm { get; set; }
    }

    public class BankRecModel
    {
        public Int64 TrnKy { get; set; }
        public Int64 AccTrnKy { get; set; }
        public string TrnDt { get; set; }
        public string DRAmt { get; set; }
        public string CRAmt { get; set; }
        public bool isrecon { get; set; }
        public string RecDt { get; set; }
        public string TrnType { get; set; }
        public string Prefix { get; set; }
        public Int64 TrnNo { get; set; }
        public string ChqDt { get; set; }
        public string ChqNo { get; set; }
        public string Description { get; set; }
        public long AccTrnRelKy { get; set; }
    }

    public class BankRecBalance
    {
        public decimal LedBalance { get; set; }

        public decimal OpenBalance { get; set; }
        public decimal RecPeriodBalance { get; set; }
        public decimal Balance { get; set; }


        public string StLedBalance { get; set; }

        public string StOpenBalance { get; set; }
        public string StRecPeriodBalance { get; set; }

        public string StBalance { get; set; }



    }
}
