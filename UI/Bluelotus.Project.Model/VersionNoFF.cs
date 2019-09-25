using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bluelotus.Project.Model
{
    public class VersionNoFF
    {
        public int PrcsSchky { get; set; }
        public string Prefix { get; set; }
        public string AdrID { get; set; }
        public string AdrNm { get; set; }
        public int PrjKy { get; set; }
        public string PrjID { get; set; }
        public string PrjNm { get; set; }
        public string VersionNo { get; set; }
    }

    public class VersionNoHdrDetail
    {
        public int PrcsSchky { get; set; }
        public string PreFixKy { get; set; }
        public string AdrID { get; set; }
        public string AdrNm { get; set; }
        public int PrjKy { get; set; }
        public string PrjID { get; set; }
        public string PrjNm { get; set; }
        public string VerNo { get; set; }
        public string SchDt { get; set; }
    }

    public class VersionNoGridDetail
    {
       
    }
}
