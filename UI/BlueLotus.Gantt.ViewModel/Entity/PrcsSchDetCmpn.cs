using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BlueLotus.Gantt.ViewModel.Entity
{
    public class PrcsSchDetCmpn
    {

        public int PrcsSchDetCmpnKy { get; set; }
        public int PrcsSchDetKy { get; set; }
        public int PrcsDetKy { get; set; }
        public int LiNo { get; set; }
        public int FinItmKy { get; set; }
        public int ItmKy { get; set; }
        public double Qty { get; set; }
        public double ReqQty { get; set; }
        public double WstPer { get; set; }
        public double WstQty { get; set; }        
        public double Rate { get; set; }
        public double UsagPer { get; set; }
        public double TrnQty { get; set; }
        public int TrnUnitKy { get; set; }
        public string Unit { get; set; }
        public double CompFacPer { get; set; }
        public int AdrKy { get; set; }
        public string Des { get; set; }

        public double PlnQty { get; set; }
        public double AnlQty { get; set; }
        public double ConvRate { get; set; }
        public double TrnRate { get; set; }
        public int isFinItm { get; set; }
        public int isResource { get; set; }
        public int isSubCon { get; set; }
        public int isCusSup { get; set; }
        public double LineTotal { get; set; }
        public int ResReqSchTypKy { get; set; }
        public string ResReqSchTyp { get; set; }
        public int ItmPrpKy { get; set; }
        public string ItmPrp { get; set; }
        public int isPrnt { get; set; }
        public int isLead { get; set; }
        public string ItmCd { get; set; }
        public string ItmNm { get; set; }
    }
}
