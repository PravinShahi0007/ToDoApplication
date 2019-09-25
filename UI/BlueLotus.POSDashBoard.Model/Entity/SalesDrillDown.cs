using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BlueLotus.POSDashBoard.Model.Entity
{
   public class SalesDrillDown
    {
        public string Type { get; set; }
        public string PrjKy { get; set; }
        public string PrjNm { get; set; }
        public string CurrentStatus { get; set; }
        public string ExpiryDt { get; set; }
        public string PrjID { get; set; }
        public string PrjSts { get; set; }
        public string OwnerID { get; set; }
        public string OwnerName { get; set; }
        public string IssuerID { get; set; }
        public string IsserName { get; set; }
    }
}
