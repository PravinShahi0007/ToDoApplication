using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BlueLotus.SubContract.Model
{
    public class SubContractBill
    {
        public int OPBalAmt;
        public int TrnKy { get; set; }

        public int AccTrnKy { get; set; }
        public string AccCd { get; set; }
        public string AccNm { get; set; }
        public double Amount { get; set; }
        public double PreCumAmt { get; set; }
        public double AsAtCumAmt { get; set; }
        public double ThisBillAmt { get; set; }
        public string AnlTyp2Nm { get; set; }
        public int AccKy { get; set; }
        public int AnlTyp2Ky { get; set; }
        public string Sign { get; set; }
        public string SO { get; set; }
        public int PrjKy { get; set; }
        public string PrjID { get; set; }
        public string PrjNm { get; set; }
        public string Des { get; set; }
        public int Lino { get; set; }

        private int adrKy;

        public int AdrKy
        {
            get { return adrKy; }
            set
            {
                adrKy = value == 0 ? 1 : value;
            }
        }
        public SubconTrnhdr Hdrderail { get; set; }
        public int DrAccKy { get; set; }
        public int CrAccKy { get; set; }
        public string OurCode { get; set; }
        public short IsRecBill { get; set; }
        public int MaterialAmt { get; set; }
        public decimal DrAmt { get; set; }
        public decimal CrAmt { get; set; }
        public int isCalc { get; set; }
    }

    public class SubconTrnhdr
    {
        public int TrnKy { get; set; }

        public string DocNo { get; set; }

        public string TrnNo { get; set; }
        public string TrnDt { get; set; }
        public int PrjKy { get; set; }
        public int AccKy { get; set; }
        public int AdrKy { get; set; }


    }
}

