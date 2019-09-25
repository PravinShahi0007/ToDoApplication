using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BlueLotus.ItmMas.Model.Entity
{
    public class ItmCmpnModel
    {
        //  
        //  ItmCmpnKy
        //  FinItmKy 
        //  ItmKy 
        //  LiNo 
        //  Des
        //  Qty 
        //  ReqQty
        //  WstPer
        //  WstQty 
        //  UsagPer 
        //  TrnQty 
        //  TrnUnitKy 
        //  CompFacPer 
        //  ResReqSchTypKy 
        //  ItmPrpKy


        public int ItmCmpnKy { get; set; }
        public int FinItmKy { get; set; }
        public int ItmKy { get; set; }
        public string ItmCd { get; set; }
        public string ItmNm { get; set; }
        public int LiNo { get; set; }
        public string Des { get; set; }
        public double Qty { get; set; }
        public double AnalQty { get; set; }
        public double ReqQty { get; set; }
        public double WstPer { get; set; }
        public double WstQty { get; set; }
        public double UsagPer { get; set; }
        public double TrnQty { get; set; }
        public int TrnUnitKy { get; set; }
        public string Unit { get; set; }
        public double CompFacPer { get; set; }
        public int ResReqSchTypKy { get; set; }
        public string ResReqSchTyp { get; set; }
        public int ItmPrpKy { get; set; }
        public string ItmPrp { get; set; }
    }
}
