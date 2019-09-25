using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BlueLotus.AdvPmtReqst.Model
{
    public class AdvPmtModel
    {
        public class AdvPmtRqstGridModel
        {
            public string Lino { get; set; }
            public string AccountKy { get; set; }
            public string AccCd { get; set; }
            public string AccNm { get; set; }
            public string AdrKy { get; set; }
            public string AdrCd { get; set; }
            public string AdrNm { get; set; }
            public string Discrption { get; set; }
            public string Amount { get; set; }


        }

        public class AdvPmtRqstHdrModel
        {
            public Int64 TrnKy { get; set; }
            public Int64 AccLevlKy { get; set; }
            public Int64 ConFinKy { get; set; }
            public bool succsess { get; set; }
        }
    }
}
