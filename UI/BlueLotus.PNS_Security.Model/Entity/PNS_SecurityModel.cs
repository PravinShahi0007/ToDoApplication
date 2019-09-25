using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BlueLotus.PNS_Security.Model.Entity
{
 
    public class PNS_SecurityModel
    {
        public string Code { get; set; }
        public string CdNm { get; set; }
        public string ConCd { get; set; }
        public int CdKy { get; set; }
        public string OurCd { get; set; }
        public int isDefault { get; set; }

        public string BUCd { get; set; }
    }

    public class PNS_Security_SelectModel
    {
        public int TrnKy { get; set; }
        public string TrnDt { get; set; }
        public string Prefix { get; set; }
        public int TrnNo { get; set; }
        public string DlvryNo { get; set; }
        public string AccNm { get; set; }

        public string Checked { get; set; }
    }



    public class PNS_Dispatch_SelectModel
    {
        public int TrnKy { get; set; }
        public string TrnDt { get; set; }
        public string Prefix { get; set; }
        public int TrnNo { get; set; }
        public string DlvryNo { get; set; }   
        public int AccKy { get; set; }

        public string AccCd { get; set; }
        public string AccNm { get; set; }
        public int AdrKy2 { get; set; }
        public string AdrID { get; set; }
        public string AdrNm { get; set; }
        public string NickNm { get; set; }


    }


    public class PNS_Security_OutledModel
    {
        public int AccKy { get; set; }
        public string AccCd { get; set; }
        public string AccNm { get; set; }
        public string AccTypCd { get; set; }
        public string AccTypNm { get; set; }
        public string AccTypOurCd { get; set; }

        


    }

    public class VehicleLookup
    {
        public int AdrKy { get; set; }
        public string AdrID { get; set; }
    }



}
