using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BlueLotus.ItmMas.Model.Entity
{
    public class ItmMasCd_SelectWeb
    {
        public int ItmCdKy { get; set; }
        public long ItmKy { get; set; }
        public int ControlConKy { get; set; }
        public int CdKy { get; set; }
        public int LocKy { get; set; }
        public string LocCd { get; set; }
        public string LocNm { get; set; }
        public bool IsAct { get; set; }
        public int DefaultSupAdrKy { get; set; }
        public string SupNm { get; set; }
        public int SupAdrId { get; set; }
        public Nullable<System.DateTime> Dt { get; set; }
        public string dt { get; set; }
        public double Val { get; set; }
        public string OfrCode { get; set; }
        public int OrdUnitKy { get; set; }
        public string OrdUnit { get; set; }
        public int SaleUnitKy { get; set; }
        public string SalesUnit { get; set; }
        public int InventoryUnitKy { get; set; }
        public string InventoryUnit { get; set; }
        public double CosPri { get; set; }
        public double SlsPri { get; set; }
        public double SlsPri2 { get; set; }
        public float ReOrdLvl { get; set; }
        public float ReOrdQty { get; set; }
        public bool isAlwCosPriUpdt { get; set; }
        public bool isAlwTrnRateUpdt { get; set; }
        public bool isDiscontinued { get; set; }
        public bool isAlwTrnRateChange { get; set; }
        public bool isShowInWeb { get; set; }
        public float MinInvQty { get; set; }
        public float MaxInvQty { get; set; }
        public float MaxDisPer { get; set; }
        public double MinSlsPri { get; set; }
        public int LiNo { get; set; }
        public bool IsAlwTrn { get; set; }
        public bool isFixedSlsPrice { get; set; }

    }

    public class ItmMasItm
    {
        public int ItmMasItmKy { get; set; }
        public int ControlConKy { get; set; }
        public int GrpItmKy { get; set; }
        public int LiNo { get; set; }
        public int Val { get; set; }
        public bool IsAct { get; set; }
        public bool isDefault { get; set; }
        public bool isApr { get; set; }
        public int ItmKy { get; set; }
        public string ItmCd { get; set; }
        public string ItmNm { get; set; }
        public string ItmCat4 { get; set; }
        public string ItmTyp { get; set; }
    }

    
}
