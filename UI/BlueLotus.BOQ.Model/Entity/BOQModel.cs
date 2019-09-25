using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BlueLotus.BOQ.Model.Entity
{
    public class BOQClient_Lookup
    {
        public int AdrKy { get; set; }
        public string AdrNm { get; set; }
        public string AdrID { get; set; }
    }

    public class OfflineAprAdr_Lookup
    {
        public int AdrKy { get; set; }
        public string Desg { get; set; }
        public string AdrNm { get; set; }
    }

    public class CdMas_OurCdLookup
    {
        public int CdKy { get; set; }
        public string Code { get; set; }
        public string CdNm { get; set; }
        public string OurCd { get; set; }
    }
}
