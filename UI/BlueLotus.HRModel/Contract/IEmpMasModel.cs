using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BlueLotus.HRModel.Contract
{
     interface IEmp
    {
          int EmpKy { get; set; }
          string EmpNo { get; set; }
          string EmpNm { get; set; }
          int CKy { get; set; }
          DateTime DtBirth { get; set; }
          string EPFNo { get; set; }
          string NIC { get; set; }
          string Sex { get; set; }
          bool isAct { get; set; }
    }

      interface IEmpDetails
    {
          int? MulAtnDetKy { get; set; }
          int? EmpKy { get; set; }
          string EmpNo { get; set; }
          string EmpNm { get; set; }
        

         string EPFNo { get; set; }

           string NIC { get; set; }

          string Sex { get; set; }

           int? EthGrpKy { get; set; }

           int? ReligionKy { get; set; }

       int? isAct { get; set; }

          string DtBirth { get; set; }
        string Street { get; set; }

        string City { get; set; }

           string State { get; set; }

          string ZipCd { get; set; }

          string TelGen1 { get; set; }

           string TelGen2 { get; set; }

          string Fax { get; set; }

          string Email { get; set; }

          int? Country { get; set; }
          string Type { get; set; }

         string code { get; set; }
          string EDate { get; set; }
           string ToDate { get; set; }
           string codeA { get; set; }

           string codeD { get; set; }

           string TypeA { get; set; }

           string TypeD { get; set; }

           string DateFA { get; set; }

           string DateFD { get; set; }

           string DateTA { get; set; }

           string DateTD { get; set; }
           string OTAmt { get; set; }

           int? OTRate { get; set; }

        string OTTyp { get; set; }

        string EntryMonth { get; set; }
          string OTHOr { get; set; }
           string LeaveType { get; set; }

         string EntitlesD { get; set; }

           string FromD { get; set; }

           string ToD { get; set; }

         string RequestD { get; set; }
         string CdKyDed { get; set; }

          


         string EmpKyDed { get; set; }

        

         string AmountAdd { get; set; }

          string EntryMonthAdd { get; set; }
        string EntryMonthDed { get; set; }

          string AmountDed { get; set; }



          string EmpKyAdd { get; set; }

          string CdKyAdd { get; set; }

          string AdditionType { get; set; }
           string DeductionType { get; set; }

          
    }

      interface IEmpMasModel
    {
          int ControlConKy { get; set; }
          string ConNm { get; set; }
          int CdKy { get; set; }
          string CdNm { get; set; }
          string ConCd { get; set; }
    }
}
