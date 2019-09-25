using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BlueLotus.PaymentShedule.Model
{
    public class PaymentSheduleGridModel
    {
        public int AccTrnKy { get; set; }
        public int TrnKy { get; set; }
        public string TrnDt { get; set; }
        public string AccKy { get; set; }
        public string AccAmt { get; set; }
        public double SetOffAccAmt { get; set; }
        public double ThisSetOffAmt { get; set; }
        private int adrky;

        public int? Adrky
        {
            get {
                return adrky;
            }
            set {
                if(value == null)
                {
                    value = 1;
                }
                else
                {
                    adrky = Convert.ToInt32(value);
                }
            }
        }

        public string AccCd { get; set; }
        public string AccNm { get; set; }
        public string TrnNo { get; set; }

        public string DocNo { get; set; }

        public int BUKy { get; set; }
        public int OrdKy { get; set; }
        //public int Prjky { get; set; }
        private int prjky;

        public int? Prjky
        {
            get {           
                return prjky;
            }
            set {
                if(value == null)
                {
                    value = 1;
                }
                else
                {
                    prjky = Convert.ToInt32(value);
                }
                    }
        }

        public string YurRef { get; set; }
        public string YurRefDt { get; set; }
        public int AccTypKy { get; set; }
        public string TrnPreFixCd { get; set; }
        public string TrnPreFixNm { get; set; }
        public string TrnTypCd { get; set; }

        public string TrnTypNm { get; set; }

        public string Des { get; set; }
        public string AdrID { get; set; }
        public string AdrNm { get; set; }
        public string BUCd { get; set; }
        public string PrjID { get; set; }

        public bool Iscash { get; set; }

        public bool isCross { get; set; }
        public bool NonNego { get; set; }
        public bool isAccPayee { get; set; }
        public string PayModeKy { get; set; }
        public int IsAct { get; set; }
    }

}
