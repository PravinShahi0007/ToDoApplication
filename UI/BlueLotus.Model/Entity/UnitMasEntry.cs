using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace BlueLotus.UI.ApiOperations
{

    public class UnitMasEntryModel
    {

        public int UnitKy { get; set; }
        public string Unit { get; set; }
        public string UnitTyp { get; set; }
        public int ConvRate { get; set; }
        public string Des { get; set; }
        public int? SKy { get; set; }
        public int BaseUnitKy { get; set; }
        public bool isDefault { get; set; }
        public bool isApr { get; set; }
        public bool isAct { get; set; }
        public bool isSI { get; set; }
        public bool isImp { get; set; }
        public bool isDefaultSI { get; set; }
        public bool isDefaultImp { get; set; }
        public bool isQty { get; set; }
        public bool isLength { get; set; }
        public bool isBreadth { get; set; }
        public bool isDepth { get; set; }
        public string BaseUnit { get; set; }
        public int BaseUnitConvRate { get; set; }

        //public string DepSlipFmt { get; set; }
        //public int? BnkKy { get; set; }
        //public string Prefix { get; set; }
        //public int Sky { get; set; }
        //public int OrgKy { get; set; }
        //public string ChkPrnFmt { get; set; }
        //public string Original_TmStmp { get; set; }
        //public bool? isAct { get; set; }

        //public BankEntryModel()
        //{
        //    BnkKy = 1;

        //}
    }

 

}
