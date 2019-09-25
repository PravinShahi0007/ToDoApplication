using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BlueLotus.ItmTax.Model.Entity
{
    public class ItmTax_SelectWeb
    {
        public long ItmKy { get; set; }
        public int ItmTypKy { get; set; }
        public int CdKy { get; set; }
        public string ItmCd { get; set; }
        public string ItmNm { get; set; }
        public long ItmTaxKy { get; set; }
        public int ItmTaxTypKy { get; set; }
        public string EftvDate { get; set; }
        public string PreviousDate { get; set; }
        public int ControlConKy { get; set; }
        public string Vat { get; set; }
        public int PreviousVat { get; set; }
        public string TimeStamp { get; set; }
                
        
    }
}
    