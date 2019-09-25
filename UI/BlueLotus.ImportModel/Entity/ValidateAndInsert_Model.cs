using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BlueLotus.ImportModel.Entity
{
    public class ItmMasXml
    {
        public int ItmKy { get; set; }
        public string ItmCd { get; set; }
        public string ItmNm { get; set; }
    }

    public class ItmEANXml
    {
        public int ItmEANKy { get; set; }
        public int ItmKy { get; set; }
        public string EAN { get; set; }
    }

    public class ItmTaxXml
    {
        public int ItmTaxKy { get; set; }
        public double Value { get; set; }
    }

    public class ItmRateXml
    {
        public int ItmRateKy { get; set; }
        public double Rate { get; set; }
        public int LocKy { get; set; }
    }  

    public class PrcsDetXml
    {
        public int PrcsDetKy { get; set; }
        public int PrcsSchDetKy { get; set; }
        public string TaskID { get; set; }
    }

    public class PrcsSchDetCmpnXml
    {
        public int PrcsSchDetCmpnKy { get; set; }
        public int PrcsSchDetKy { get; set; }
        public int PrcsDetKy { get; set; }
    }

    public class AccMas
    {
        public int AccKy { get; set; }
        public int AdrKy { get; set; }
        public string AccCd { get; set; }
    }

    public class ItmTrn
    {
        public int TrnKy { get; set; }
        public int ItmTrnKy { get; set; }
    }

    public class AccTrn
    {
        public long TrnKy { get; set; }
        public long AccTrnKy { get; set; }
    }

    public class AdrMasCd
    {
        public int AdrCdKy { get; set; }
    }


    public class EmpMas
    {
        public int EmpKy { get; set; }
        public string EmpNo { get; set; }
    }
}
