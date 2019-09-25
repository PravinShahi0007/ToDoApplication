using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BlueLotus.SetOff.Model.Entity
{
    public class CusSupLookUp
    {
        public int AccKy { get; set; }
        public string AccNm { get; set; }
        public string AccCd { get; set; }
    }


    public class SetOffGridDetail
    {
        public int TrnKy { get; set; }
        public int TrnNo { get; set; }
        public int AccTrnKy { get; set; }
        public string TrnDt { get; set; }
        public string TrnTyp { get; set; }
        public string DocNo { get; set; }
        public string Des { get; set; }
        public string TrnAmt { get; set; }
        public string SetOffAmt { get; set; }
        public Double BalAmt { get; set; }
        public string ThsSetOfAmt { get; set; }
        public bool Select { get; set; }

        public bool Select1 { get; set; }
        public string Address { get; set; }

        public string Bu { get; set; }
        public string Ord { get; set; }
        public string Prj { get; set; }
        public string YrRef { get; set; }
        public string YrRefDt { get; set; }

        public string Balanceamount { get; set; }

        public string AccCd { get; set; }
        public string AccNm { get; set; }
        public string AdrNm { get; set; }
        public string AdrId { get; set; }
        public byte IsSetOff { get; set; }
        public int HdrKy { get; set; }


    }
}
