using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BlueLotus.AccountsReports.Model.Contract
{
    interface IAccountsReportsModel
    {
    }

    interface GetProjectModel
    {
        int PrjKy { get; set; }
        string PrjNm { get; set; }
        string PrjID { get; set; }
    }

    interface ReportNmModel
    {
        int ObjKy { get; set; }
        string ObjNm { get; set; }
    }

    interface GetBuModel
    {
        int CdKy { get; set; }
        string Code { get; set; }
        string CdNm { get; set; }
    }

    interface GetAdrModel
    {
        int AdrKy { get; set; }
        string AdrId { get; set; }
        string AdrNm { get; set; }
    }

    interface GetAccTypModel
    {
        int CdKy { get; set; }
        string Code { get; set; }
        string CdNm { get; set; }
    }

    interface GetTrnTypModel
    {
        int CdKy { get; set; }
        string Code { get; set; }


    }

    interface GetAnlTypModel
    {
        int CdKy { get; set; }
        string Code { get; set; }


    }

    interface AccountModel
    {
        string AccNm { get; set; }
        int AccKy { get; set; }
        string AccCd { get; set; }
    }
}
