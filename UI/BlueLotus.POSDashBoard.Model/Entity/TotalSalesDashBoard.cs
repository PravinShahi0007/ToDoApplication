using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BlueLotus.POSDashBoard.Model.Entity
{
    public class TotalSalesDashBoard
    {
        public string FrmDtm { get; set; }
        public string ToDtm { get; set; }
        public int Amt { get; set; }
        public string ItmCd { get; set; }
    }
}
