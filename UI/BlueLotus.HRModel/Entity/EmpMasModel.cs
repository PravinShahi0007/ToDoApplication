using BlueLotus.HRModel.Contract;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BlueLotus.HRModel.Entity
{
    public class Emp : IEmp
    {
        public int EmpKy { get; set; }
        public string EmpNo { get; set; }
        public string EmpNm { get; set; }
        public int CKy { get; set; }
        public DateTime DtBirth { get; set; }
        public string EPFNo { get; set; }
        public string NIC { get; set; }
        public string Sex { get; set; }
        public bool isAct { get; set; }
    }

    public class EmpDetails : IEmpDetails
    {
        public int? MulAtnDetKy { get; set; }
        public int? EmpKy { get; set; }
        public string EmpNo { get; set; }
        public string EmpNm { get; set; }
      

        public string EPFNo { get; set; }

        public string NIC { get; set; }

        public string Sex { get; set; }

        public int? EthGrpKy { get; set; }

        public int? ReligionKy { get; set; }

        public int? isAct { get; set; }

        public string DtBirth { get; set; }
        public string Street { get; set; }

        public string City { get; set; }

        public string State { get; set; }

        public string ZipCd { get; set; }

        public string TelGen1 { get; set; }

        public string TelGen2 { get; set; }

        public string Fax { get; set; }

        public string Email { get; set; }

        public int? Country { get; set; }
        public string Type { get; set; }

        public string code { get; set; }
        public string EDate { get; set; }
        public string ToDate { get; set; }
      public  string codeA { get; set; }

       public string codeD { get; set; }

       public string TypeA { get; set; }

       public string TypeD { get; set; }

       public string DateFA { get; set; }

       public string DateFD { get; set; }

       public   string DateTA { get; set; }

       public   string DateTD { get; set; }
       public string OTAmt { get; set; }

       public int? OTRate { get; set; }

        public string OTTyp { get; set; }

        public string EntryMonth { get; set; }
       public string OTHOr { get; set; }
       public string LeaveType { get; set; }

       public string EntitlesD { get; set; }

       public string FromD { get; set; }

       public string ToD { get; set; }

       public string RequestD { get; set; }

       public string CdKyDed { get; set; }
     
       


       public string EmpKyDed { get; set; }

    

       public string AmountAdd { get; set; }

       public string EntryMonthAdd { get; set; }
       public string EntryMonthDed { get; set; }

       public string AmountDed { get; set; }



       public string EmpKyAdd { get; set; }

       public string CdKyAdd { get; set; }

       public string AdditionType { get; set; }
       public string DeductionType { get; set; }
       public int IsAdtoin { get; set; }
       

    }

    public class EmpMasModel : IEmpMasModel
    {
        public int LiNo { get; set; }
        public int ControlConKy { get; set; }
        public string ConNm { get; set; }
        public int CdKy { get; set; }
        public string CdNm { get; set; }
        public string ConCd { get; set; }
        public int EmpKy { get; set; }
        public int EmpCdDtKy { get; set; }
        public string EftDt { get; set; }
        public string ToDt { get; set; }
        public string EmpNo { get; set; }
        public string EmpNm { get; set; }



        public string EPFNo { get; set; }

        public string NIC { get; set; }

        public string Sex { get; set; }

        public int EthGrpKy { get; set; }

        public int ReligionKy { get; set; }

        public int isAct { get; set; }

        public string DtBirth { get; set; }

        public string Street { get; set; }

        public string City { get; set; }

        public string State { get; set; }

        public string ZipCd { get; set; }

        public string TelGen1 { get; set; }

        public string TelGen2 { get; set; }

        public string Fax { get; set; }

        public string Email { get; set; }

        public int Country { get; set; }
        public string EDate { get; set; }
        public string ToDate { get; set; }
        public string Type { get; set; }

        public string code { get; set; }

        public string codeA { get; set; }

        public string codeD { get; set; }

        public string TypeA { get; set; }

        public string TypeD { get; set; }

        public string DateFA { get; set; }

        public string DateFD { get; set; }

        public string DateTA { get; set; }

        public string DateTD { get; set; }

        public string LeaveType { get; set; }

        public string EntitlesD { get; set; }

        public string FromD { get; set; }

        public string ToD { get; set; }

        public string RequestD { get; set; }


    }


    public class EmpMasCdDtModel
    {
        public int EmpCdDtKy { get; set; }
        public int EmpKy { get; set; }
        public int CdKy { get; set; }

        public string OTAmt { get; set; }

        public int OTRate { get; set; }
        public string OTTyp { get; set; }

        public string EntryMonth { get; set; }

        public string OTHOr { get; set; }
        public string EmpNo { get; set; }

        public string EmpNm { get; set; }
    }


    public class HRAlwModel
    {
        public string CdKyDed { get; set; }
        public string FromD { get; set; }
        public string ToD { get; set; }
        public string RequestD { get; set; }


        public string EmpKyDed { get; set; }

        public string EntitlesD { get; set; }

        public string AmountAdd { get; set; }

        public string EntryMonthAdd { get; set; }
        public string EntryMonthDed { get; set; }

        public string AmountDed { get; set; }



        public string EmpKyAdd { get; set; }

        public string CdKyAdd { get; set; }

        public string AdditionType { get; set; }

        public string EmpKy { get; set; }

        public string CdKy { get; set; }

        public string DeductionType { get; set; }

        public int IsAdtoin { get; set; }
        //public int LevTrnKy { get; set; }
        //public int LeaveTypeKy { get; set; }
        //public string LeaveType { get; set; }
        //public int Balance { get; set; }
        //public int Taken { get; set; }

    }
    public class LevTrnModel
    {
        public int EmpKy { get; set; }

        public string EmpNo { get; set; }

        public string EmpNm { get; set; }
        public string LeaveType { get; set; }

        public string EntitlesD { get; set; }

        public string FromD { get; set; }

        public string ToD { get; set; }

        public string RequestD { get; set; }
        public int LevTrnKy { get; set; }
        public int LevTypKy { get; set; }
        public int LevDays { get; set; }
        public int LiNo { get; set; }
        public int Taken { get; set; }
        public int is1stHfDy { get; set; }
        public int is2ndHfDy { get; set; }
        public int isAct { get; set; }
        //
        //

    }
    public class LeaveBal
    {
        public int EmpKy { get; set; }
        public int LevTypKy { get; set; }
        public int Elagible { get; set; }
        public int Taken { get; set; }
        public int LevDays { get; set; }
        public int Balance { get; set; }
        public string LeaveType { get; set; }
    }

}
