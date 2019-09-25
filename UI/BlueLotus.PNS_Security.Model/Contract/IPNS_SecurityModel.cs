using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BlueLotus.PNS_Security.Model.Contract
{
    interface IPNS_SecurityModel
    {
    }

    public class PNS_SecurityModel
    {
        string Code { get; set; }
        string CdNm { get; set; }
        string ConCd { get; set; }
        int CdKy { get; set; }
        string OurCd { get; set; }
        int isDefault { get; set; }

        string BUCd { get; set; }
    }

    public class PNS_Security_SelectModel
    {
        int TrnKy { get; set; }
        string TrnDt { get; set; }
        string Prefix { get; set; }
        int TrnNo { get; set; }
        string DlvryNo { get; set; }
        string AccNm { get; set; }

        string Checked { get; set; }
    }

    public class PNS_Security_OutledModel
    {
        int AccKy { get; set; }
        string AccCd { get; set; }
        string AccNm { get; set; }
        string AccTypCd { get; set; }
        string AccTypNm { get; set; }
        string AccTypOurCd { get; set; }


    }
}
