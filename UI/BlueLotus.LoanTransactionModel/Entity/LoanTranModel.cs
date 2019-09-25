using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BlueLotus.LoanTransaction_Model.Entity
{
    public class LoanTranModel
    {
        public int Cdky { get; set; }
        public int EmpKy { get; set; }
        public int Empno { get; set; }
        public string EmpNm { get; set; }
        public string EftvDt { get; set; }
        public string GvnDt { get; set; }
        public string LoanType { get; set; }
        public int InstAmt { get; set; }
        public int LoanAmount { get; set; }
        public string BnkNm { get; set; }
        public string BrnNm { get; set; }
        public int AccNo { get; set; }
        public int NoOfInst { get; set; }
        public int TtlPay { get; set; }
        public int IntrRate { get; set; }
        public int IntrAmt { get; set; }
        public int IntrTyp { get; set; }
        public int BrnKy { get; set; }
        public int BnkKy { get; set; }
        public int IntrTypKy { get; set; }
        public int LnTypKy { get; set; }
        public string LnTyp { get; set; }
    }
}
