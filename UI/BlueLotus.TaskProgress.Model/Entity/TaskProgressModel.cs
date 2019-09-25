using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace BlueLotus.UI.ApiOperations
{
    public class ItmRateSubCunItmNm_SelectWeb
    {
        public string EftvDt { get; set; }
        public string Rate { get; set; }
        public int AdrKy { get; set; }
        public string ItmNm { get; set; }
        public int ItmKy { get; set; }
        public string ItmCd { get; set; }
        public string Unit { get; set; }
        public int PrjKy { get; set; }
    }
    public class SubConPrgrsItmTrn_SelectWeb
    {
        public string ItmCd { get; set; }
        public string ItmNm { get; set; }
        public int FinItmKy { get; set; }
        public string Unit { get; set; }
        public int Qty { get; set; }
        public int TrnKy { get; set; }
        public int TrnTypKy { get; set; }
        public int AdrKy { get; set; }
    }

    public class PPrjKySubConAdrNm_SelectMob
    {
        public int TrnKy { get; set; }
        public int TrnTypKy { get; set; }
        public int AdrKy { get; set; }
        public string AdrNm { get; set; }
        public int PrjKy { get; set; }
    }
    public class PrcsDet_SelectWeb
    {
        public int PrcsDetKy { get; set; }
        public string  PrcsID { get; set; }
        public string PrcsNm { get; set; }
        public int PrcsTypKy { get; set; }
        public string PrcsTypCd { get; set; }
        public string PrcsTypNm { get; set; }
        public string TrnUnitKy { get; set; }
        public string Unit { get; set; }

    }
}