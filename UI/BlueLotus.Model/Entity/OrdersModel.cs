using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BlueLotus.ViewModel.Entity
{

    public class SplSlsOrd
    {
        public int LiNo { get; set; }
        public int OrdDetKy { get; set; }
        public int FrmOrdDetKy { get; set; }
        public int OrdNo { get; set; }
        public string PrinterLoc { get; set; }
        public int ItmKy { get; set; }
        public string ItmCd { get; set; }
        public string ItmNm { get; set; }
        public string Unit { get; set; }
        public string Des { get; set; }
        public int AdrKy { get; set; }
        public int AccKy { get; set; }
        public int LocKy { get; set; }
        public int DlyAdrKy { get; set; }
        public int DlyTimeKy { get; set; }
        public int UnitKy { get; set; }
        public double TrnQty { get; set; }
        public double TrnRate { get; set; }
        public double SubTotal { get; set; }
        public Boolean isNot { get; set; }
        public Boolean isAct { get; set; }
        public Boolean isApr { get; set; }
        public Boolean isPrdNxtBatch { get; set; }
        public DateTime DlyDt { get; set; }
        public DateTime OrdDt { get; set; }
        public int DispatchTime { get; set; }
        public string DispatchTimeNm { get; set; }
        public string OrdAdrNm { get; set; }
        public int ProductionTime { get; set; }
        public DateTime CusTime { get; set; }
        public int DlyNo { get; set; }
        public string DlyNoNm { get; set; }
        public string DocNo { get; set; }
        public string OrdAccNm { get; set; }
        public string DlvAccNm { get; set; }
        public object OrdDate { get; set; }
        public object DlyDate { get; set; }
        public string ProdTime { get; set; }
        public string CustomTime { get; set; }
        public double DisPer { get; set; }
        public double DisAmt { get; set; }

    }

    public class SplSlsOrdHdr
    {
        public int OrdKy { get; set; }
        public int OrdTypKy { get; set; }
        public int OrdPrefixKy { get; set; }
        public int OrdNo { get; set; }
        public DateTime OrdDt { get; set; }
        public object OrdDtHdr { get; set; }
        public int AdrKy { get; set; }
        public int DlyAdrKy { get; set; }
        public int DlyNoKy { get; set; }

        public int DlyTimeKy { get; set; }
        public string DocNo { get; set; }
        public string Des { get; set; }
        public int DlyNo { get; set; }
        public double Total { get; set; }
        public int AdvAmt { get; set; }

        public DateTime DlyDate { get; set; }
        public object DlyDateHdr { get; set; }
        public int DispatchTime { get; set; }
        public double DisAmt { get; set; }
        public double DisPer { get; set; }

    }

    public class OrderModel
    {
        public int FromItmTrnKy { get; set; }
        public int ToItmTrnKy { get; set; }
        public int FromTrnKy { get; set; }
        public int FromPrjKy { get; set; }
        public int ToTrnKy { get; set; }
        public int ToPrjKy { get; set; }
        public int FrmOrdDetKy { get; set; }
        public int FrmOrdDetCmpnKy { get; set; }
        public int OrdDetKy { get; set; }
        public int OrdKy { get; set; }
        public int isAct { get; set; }
        public int isApr { get; set; }
        public int LocKy { get; set; }
        public int LocKy2 { get; set; }//to store from location in MR / PR 13/06/2018 Narmada
        public int BUKy { get; set; }
        public int AdrKy { get; set; }
        public int RepAdrKy { get; set; }
        public int AccAdrKy { get; set; }
        public string TrnNo { get; set; }

        public string PrefixTrnNo { get; set; }
        public string DocNo { get; set; }
        public string AdrId { get; set; }
        public string AdrNm { get; set; }
        public int AccKy { get; set; }
        public decimal LiNo { get; set; }
        public int ItmKy { get; set; }
        public int ItmTrnKy { get; set; }
        public double Qty { get; set; }
        public double BaseQty { get; set; }
        public double OrdrdQty { get; set; }
        public double TrnQty { get; set; }
        public int UnitKy { get; set; }
        public string Unit { get; set; }
        public double Rate { get; set; }
        public double TrnRate { get; set; }
        public double DisPer { get; set; }
        public double DisAmt { get; set; }
        public double TrnDisAmt { get; set; }
        public string ReqDt { get; set; }
        public string EftvDt { get; set; }
        public string OrdDt { get; set; }

        public int ItmPrpKy { get; set; }
        public int IsSetOff { get; set; }
        public int PrjKy { get; set; }
        public int Prj2Ky { get; set; }
        public int Prj3Ky { get; set; }
        public int Prj4Ky { get; set; }
        public int Prj5Ky { get; set; }
        public int LCKy { get; set; }
        public int LoanKy { get; set; }
        public int PrcsDetKy { get; set; }
        public string PrcsID { get; set; }
        public int PrcsDe2tKy { get; set; }
        public int PrcsDet3Ky { get; set; }
        public int PrcsDet4Ky { get; set; }
        public int PrcsDet5Ky { get; set; }
        public int LCDetKy { get; set; }
        public int LoanDetKy { get; set; }
        public int Anl1Ky { get; set; }
        public string Anl1Cd { get; set; }
        public string Anl2Cd { get; set; }
        public string Anl3Cd { get; set; }
        public int Anl2Ky { get; set; }
        public int Anl3Ky { get; set; }
        public int Anl4Ky { get; set; }
        public int Anl5Ky { get; set; }
        public int Anl6Ky { get; set; }
        public string ItmNm { get; set; }
        public string ItmCd { get; set; }
        public string ItmNo { get; set; }
        public string Rem { get; set; }
        public string DetRem { get; set; }
        public int LiNoRate { get; set; }
        public int LiNoCrnKy { get; set; }
        public int LiNoExRate { get; set; }
        public int LiNoDisAmt { get; set; }
        public string Des { get; set; }
        public string DetDes { get; set; }
        public int IsVirtItm { get; set; }
        public int Maint { get; set; }
        public double VatAmt { get; set; }
        public double WHTAmt { get; set; }
        public double NBTAmt { get; set; }

        public double Amt1 { get; set; }
        public int DlvAdrKy { get; set; }
        public int isRateInclTT1 { get; set; }
        public int AddAlwPer { get; set; }
        public int OrgRate { get; set; }


        // DOH,GOH,Profit,DisCost
        public double DOH { get; set; }
        public double GOH { get; set; }
        public double Profit { get; set; }


        public double VAT { get; set; }
        public double WHT { get; set; }
        public double NBT { get; set; }
        public double SVAT { get; set; }
        public double ItmTaxTyp5Per { get; set; }
        public double SVatAmt { get; set; }
        public string ItmTaxTyp5 { get; set; }
        public int AprPrtyKy { get; set; }
        public int AprStsKy { get; set; }
        public string YurRef { get; set; }
        public int isPrdNxtBatch { get; set; }
        public int isNot { get; set; }
        public int CusTimeKy { get; set; }
        public int ProdtimeKy { get; set; }
        public int ObjKy { get; set; }

        public double ReMnQty { get; set; }
        public double SubTotal { get; set; }
        public int DisplayLiNo { get; set; }

    }

    public class OrderNo
    {
        public string OrdNo { get; set; }
        public long OrdKy { get; set; }
    }

    public class OrderSearchModel
    {

        public int Lino { get; set; }
        public int OrdKy { get; set; }
        public string Prefix { get; set; }
        public string OrdNo { get; set; }
        public string OrdDt { get; set; }
        public string DocNo { get; set; }
        public string YurRef { get; set; }
        public string Des { get; set; }
        public string RepID { get; set; }
        public string AprSts { get; set; }
        public Boolean IsPrint { get; set; }
        public string DlryDt { get; set; }
        public string DlryNo { get; set; }
        public string SupAccCd { get; set; }
        public string Day { get; set; }
        public string AdrId { get; set; }
        public string AdrNm { get; set; }
    }

    public class OrderHdrModel
    {

        public int OrdKy { get; set; }
        public int OrdTypKy { get; set; }
        public int OrdPrefixKy { get; set; }
        public string OrdPrefixNo { get; set; }
        public int OrdNo { get; set; }
        public int PmtKy { get; set; }
        public int CurrencyKy { get; set; }
        public int ExtRate { get; set; }
        public string OrdDt { get; set; }
        public string DlryDt { get; set; }
        public int RecurDlvNoKy { get; set; }
        public int RecurOrdDyKy { get; set; }
        public int RecurOrdTimeKy { get; set; }
        public string DocNo { get; set; }
        public string YurRef { get; set; }
        public string Des { get; set; }
        public string Rem { get; set; }
        public string RepID { get; set; }
        public string AprSts { get; set; }
        public int Amt { get; set; }
        public int TrnAmt { get; set; }
        public int DisPer { get; set; }
        public int DisAmt { get; set; }
        public int LocKy { get; set; }
        public int LocKy2 { get; set; }
        public int key { get; set; }
        public string PRNo { get; set; }
        public int POrdNoKy { get; set; }
        public int RepAdrKy { get; set; }
        public int DistAdrKy { get; set; }
        public int PrntKy { get; set; }
        public int AdrKy { get; set; }
        public int AccKy { get; set; }
        public int PrjKy { get; set; }
        public int DlvAdrKy { get; set; }
        public int CusTimeKy { get; set; }
        public int OderModeKy { get; set; }
        public int DlvryModeKy { get; set; }

    }

    public class OrderFindModel
    {
        public string PrjKy { get; set; }
        public string SupKy { get; set; }
        public string FrmOrdNo { get; set; }
        public string ToOrdNo { get; set; }
        public string FrmDt { get; set; }
        public string ToDt { get; set; }
        public string DocNo { get; set; }
        public string ConCd { get; set; }
        public string OurCd { get; set; }
        public string DeliDt { get; set; }
        public int DayKy { get; set; }
    }
    public class AccOrderModel
    {
        public int AccKy { get; set; }
        public string AccCd { get; set; }
        public string AccNm { get; set; }
        public int isDefault { get; set; }

    }

    public class OrderProject
    {
        public int PrjKy { get; set; }
        public string PrjNm { get; set; }
        public string PrjID { get; set; }
        public string PrjtypCd { get; set; }
        public string PrjNo { get; set; }
    }

    public class ItmCatOrderModel
    {
        public int CdKy { get; set; }
        public string Code { get; set; }
        public string CdNm { get; set; }
        public string ConCd { get; set; }
        public int CKy { get; set; }
        public int isDefault { get; set; }

    }

    public class AdrOrderModel
    {
        public int AdrKy { get; set; }
        public string AdrID { get; set; }
        public string AdrNm { get; set; }
        public int AccKy { get; set; }
        public string AccCd { get; set; }
        public string AccNm { get; set; }

    }

    public class ItemForOrdtypModel
    {
        public int ItmKy { get; set; }
        public string ItmCd { get; set; }
        public string ItmNm { get; set; }
        public int UnitKy { get; set; }
        public string Unit { get; set; }
        public double Rate { get; set; }
        public double TrnRate { get; set; }

        public double Disper { get; set; }
        public double VAT { get; set; }
        public double NBT { get; set; }
        public double WHT { get; set; }
        public double SVAT { get; set; }
        public bool IsAct { get; set; }

    }

    public class ItemFindModel
    {
        public string ConCd { get; set; }
        public string OurCd { get; set; }
        public string ItmCd { get; set; }
        public string AdrKy { get; set; }
        public string LocKy { get; set; }
        public string PrjKy { get; set; }
        public string Dt { get; set; }

        public string BUKy { get; set; }
        public string AccKy { get; set; }
    }

    public class UnitModelForOrder
    {
        public int UnitKy { get; set; }
        public string Unit { get; set; }


    }

    public class TaskModelForOrder
    {
        public int TaskKy { get; set; }
        public string TaskId { get; set; }
        public string TaskNm { get; set; }
    }

    public class PurReqHdrModel
    {
        public string PrjKy { get; set; }
        public string AdrKy { get; set; }
        public string FrmLocKy { get; set; }
        public string BUKY { get; set; }
        public string AccKy { get; set; }
        public string Date { get; set; }
        public string DlyDate { get; set; }
        public string OurCd { get; set; }
        public string ConCd { get; set; }
        public string DocNo { get; set; }
        public string Yurref { get; set; }
        public string Des { get; set; }
        public string Rem { get; set; }
        public string ExRate { get; set; }
        public string Currency { get; set; }
        public string Pmt { get; set; }
        public string SubTotal { get; set; }
        public string Discount { get; set; }
        public string NBT { get; set; }
        public string Vat { get; set; }
        public string Wht { get; set; }
        public string Svat { get; set; }
        public string Total { get; set; }
        public string RecDayKy { get; set; }
        public string DlvNoKy { get; set; }
        public int DispachedTime { get; set; }
    }

    public class purReqUpdtHdrModel
    {
        public string PrjKy { get; set; }
        public string AdrKy { get; set; }
        public string FrmLocKy { get; set; }
        public string BUKY { get; set; }
        public string AccKy { get; set; }
        public string Date { get; set; }
        public string DlyDate { get; set; }
        public string OurCd { get; set; }
        public string ConCd { get; set; }
        public string DocNo { get; set; }
        public string Yurref { get; set; }
        public string YurRefDate { get; set; }
        public string ExRate { get; set; }
        public string Currency { get; set; }
        public string Pmt { get; set; }
        public string SlsACId { get; set; }
        public string Discount { get; set; }
        public string NBT { get; set; }
        public string Vat { get; set; }
        public string Wht { get; set; }
        public string Svat { get; set; }
        public string SubTotal { get; set; }
        public string Total { get; set; }
        public string OrdKySelect { get; set; }
        public string OrdTypKySelect { get; set; }
        public string OrdPrefixKySelect { get; set; }
        public string OrdNoSelect { get; set; }
        public string Des { get; set; }
        public string Rem { get; set; }
        public int DlvNoKy { get; set; }
        public int RecDayKy { get; set; }
        public int DispachedTime { get; set; }
    }

    public class purReqDetailModel
    {
        public string PrjKy { get; set; }
        public string AdrKy { get; set; }
        public string FrmLocKy { get; set; }
        public string AccKy { get; set; }
        public string BUKY { get; set; }
        public string Date { get; set; }
        public string OurCd { get; set; }
        public string ConCd { get; set; }
        public string DlyAdrKy { get; set; }
        public string ordKydata { get; set; }
        public string DlyTimeKy { get; set; }
        public string ProductionTime { get; set; }
        public string ObjKy { get; set; }
    }

    public class itemForChangeModel
    {
        public string ConCd { get; set; }
        public string OurCd { get; set; }
        public string ItmCd { get; set; }
        public string AdrKy { get; set; }
        public string LocKy { get; set; }
        public string PrjKy { get; set; }
        public string Date { get; set; }
        public string Lino { get; set; }
    }

    public class OrdDayModel
    {
        public int CdKy { get; set; }
        public string Code { get; set; }
        public string CdNm { get; set; }
        public string ConCd { get; set; }
    }

}
