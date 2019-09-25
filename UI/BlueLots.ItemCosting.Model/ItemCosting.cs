using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BlueLots.ItemCosting.Model
{
    public class ItemCosting
    {
        public int TrnKy { get; set; }
        public int CdKy { get; set; }
        public string Code { get; set; }
        public string CdNm { get; set; }
        public double Amt { get; set; }

        public int TrnCdKy { get; set; }
        public int ItmTrnKy { get; set; }
        public int ItmTrnCdKy { get; set; }


    }
}
