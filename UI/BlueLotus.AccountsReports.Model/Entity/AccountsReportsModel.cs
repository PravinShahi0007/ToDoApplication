using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BlueLotus.AccountsReports.Model.Entity
{
    public class AccountsReportsModel
    {

    }

    public class GetProjectModel
    {
        public int PrjKy { get; set; }
        public string PrjNm { get; set; }
        public string PrjID { get; set; }
    }

    public class ReportNmModel
    {
        public int ObjKy { get; set; }
        public string ObjNm { get; set; }
    }

    public class GetBuModel
    {
        public int CdKy { get; set; }
        public string Code { get; set; }
        public string CdNm { get; set; }
    }

    public class GetAdrModel
    {
        public int AdrKy { get; set; }
        public string AdrId { get; set; }
        public string AdrNm { get; set; }
    }

    public class GetAccTypModel
    {
        public int CdKy { get; set; }
        public string Code { get; set; }
        public string CdNm { get; set; }
    }

    public class CdmasLookUpModelWeb
    {
        public int CdKy { get; set; }
        public string Code { get; set; }
        public string CdNm { get; set; }
    }

    public class GetTrnTypModel
    {
        public int CdKy { get; set; }
        public string Code { get; set; }


    }

    public class GetAnlTypModel
    {
        public int CdKy { get; set; }
        public string Code { get; set; }


    }

    public class AccountModel
    {
        public string AccNm { get; set; }  
        public int AccKy { get; set; }
        public string AccCd { get; set; }
    }

    
    
}
