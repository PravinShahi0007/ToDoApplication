using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BlueLotus.ViewModel.Entity
{
    public class OrdDetCmpnModel
    {

        public int OrdDetCmpnKy { get; set; }
        public int OrdDetKy { get; set; }
        public int FinItmKy { get; set; }
        public int ItmKy { get; set; }
        public double LiNo { get; set; }
        public string Des { get; set; }
        public double Qty { get; set; }
        public double ReqQty { get; set; }
        public double WstPer { get; set; }
        public double UsagPer { get; set; }
        public double TrnQty { get; set; }
        public int TrnUnitKy { get; set; }
        public double CompFacPer { get; set; }
        public string ItmCd { get; set; }
        public string ItmNm { get; set; }
        public string Unit { get; set; }
        public double Rate { get; set; }
        public double AnlQty { get; set; }
        public double ConvRate { get; set; }
        public double TrnRate { get; set; }
        public double LineTotal { get; set; }
        public int ItmPrpKy { get; set; }
        public int ResReqSchTypKy { get; set; }
        public double DisPer { get; set; }
        public string ItmPrp { get; set; }
        public string ResReqSchTyp { get; set; }
        public string Stock { get; set; }
    }
}
