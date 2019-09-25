using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BlueLotus.ItmMas.Model.Contract
{
    public interface IItmMasCdModel
    {

    }

    public class ItmMasCd_SelectWeb
    {
        int ItmCdKy { get; set; }
        long ItmKy { get; set; }
        int ControlConKy { get; set; }
        int CdKy { get; set; }
        string LocNm { get; set; }
        int DefaultSupAdrKy { get; set; }
        string SupNm { get; set; }
        int SupAdrId { get; set; }
        Nullable<System.DateTime> Dt { get; set; }
        string dt { get; set; }
        double Val { get; set; }
        string OfrCode { get; set; }
        int OrdUnitKy { get; set; }
        string OrdUnit { get; set; }
        int SaleUnitKy { get; set; }
        string SalesUnit { get; set; }
        int InventoryUnitKy { get; set; }
        string InventoryUnit { get; set; }
        double CosPri { get; set; }
        double SlsPri { get; set; }
        double SlsPri2 { get; set; }
        float ReOrdLvl { get; set; }
        float ReOrdQty { get; set; }
        bool isAlwCosPriUpdt { get; set; }
        bool isAlwTrnRateUpdt { get; set; }
        bool isDiscontinued { get; set; }
        bool isAlwTrnRateChange { get; set; }
        bool isShowInWeb { get; set; }
        float MinInvQty { get; set; }
        float MaxInvQty { get; set; }
        float MaxDisPer { get; set; }
        double MinSlsPri { get; set; }
        int LiNo { get; set; }
        bool IsAlwTrn { get; set; }

    }
}
