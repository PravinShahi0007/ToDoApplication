using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BlueLotus.MultiUnit.Model.Entity
{
    public class MultiUnitModel
    {
        public int ItmUnitKy { get; set; }
        public bool isAct { get; set; }
        public string Des { get; set; }
        public bool isPurchaseUnit { get; set; }
        public bool isSalesUnit { get; set; }
        public bool isInvUnit { get; set; }
        public bool isBaseUnit { get; set; }
        public string ConvRate { get; set; }
        public int UnitKy { get; set; }
        public string Unit { get; set; }
        public int ItmKy { get; set; }

        public string BaseUnitConvRate { get; set; }
        public string UnitConvRate { get; set; }
        public int BaseUnitKy { get; set; }
        public string BaseUnit { get; set; }
        public bool isPurFractionUnit { get; set; }
        //public int PurBulkUnitKy { get; set; }
        public bool PurBulkUnit { get; set; }
        //public int PurInnerUnitKy { get; set; }
        public bool PurInnerUnit { get; set; }
        //public int PurLooseUnitKy { get; set; }
        public bool PurLooseUnit { get; set; }
        public bool isInvFractionUnit { get; set; }
        //public int InvBulkUnitKy { get; set; }
        public bool InvBulkUnit { get; set; }
        //public int InvInnerUnitKy { get; set; }
        public bool InvInnerUnit { get; set; }
        //public int InvLooseUnitKy { get; set; }
        public bool InvLooseUnit { get; set; }
        public bool isSaleFractionUnit { get; set; }
        //public int SaleBulkUnitKy { get; set; }
        public bool SaleBulkUnit { get; set; }
        //public int SaleInnerUnitKy { get; set; }
        public bool SaleInnerUnit { get; set; }
        //public int SaleLooseUnitKy { get; set; }
        public bool SaleLooseUnit { get; set; }
        public bool isDefaultPurUnit { get; set; }
        public bool isDefaultInvUnit { get; set; }
        public bool isDefaultSaleUnit { get; set; }
        public bool isServiceUnit { get; set; }
        public bool isDefaultServiceUnit1 { get; set; }
    }
}

