using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BlueLotus.SplOrderModel.Entity
{
    public class SplOrderModel
    {
    }
    public class PNSOrderSearchModel
    {

        public int Lino { get; set; }
        public int OrdKy { get; set; }
        public string Prefix { get; set; }
        public int OrdNo { get; set; }
        public string OrdDt { get; set; }
        public string DocNo { get; set; }
        public string YurRef { get; set; }
        public string Des { get; set; }
        public string RepID { get; set; }
        public string AprSts { get; set; }
        public Boolean IsPrint { get; set; }
        public string DlryDt { get; set; }
        public string DlryNo { get; set; }
    }

    public class SplAccDemo
    {

        public string AccNm { get; set; }
        public string OrdDay { get; set; }
        public int Cky { get; set; }
        public byte AccTypCode { get; set; }
        public string AccKy { get; set; }
        public int Code { get; set; }
        public int CdKy { get; set; }
        public DateTime? OrdDt { get; set; }
        public int Qty { get; set; }


        public string CdNm { get; set; }
        public string ConCd { get; set; }
        public int Adrky { get; set; }
        public int AdrID { get; set; }
        public string AdrNm { get; set; }
        public int ItmKy { get; set; }

        public string ItmCd { get; set; }

        public string ItmNm { get; set; }

        public string unit { get; set; }

    }

    public class SplAccDemoDetail
    {

        public string AccNm { get; set; }
        public int AccKy { get; set; }
        public string AccTypNm { get; set; }
        public string AccCd { get; set; }
        public string AccTypCode { get; set; }
        // public string Code { get; set; }

    }
    public class SplAdrDemoDetail
    {
        public int Adrky { get; set; }
        public int AdrID { get; set; }
        public string AdrNm { get; set; }


    }

    public class SplDlivDemoDetail
    {
        //public int Cky { get; set; }
        public int CdKy { get; set; }
        public string Code { get; set; }
        public string CdNm { get; set; }
        public string ConCd { get; set; }

    }

    public class UsrMasPrinter_Select
    {
        //UsrPrintKy, PrinterNm
        public int UsrPrintKy { get; set; }
        public string PrinterNm { get; set; }
    }

    public class SplLocWithPrinter
    {
        public int ProdLocKy { get; set; }
        public string ProdLocCd { get; set; }
        public string PrinterIP { get; set; }
        public string PrinterNm { get; set; }

    }
    public class SplOrdDemoDetail
    {

        public int ItmKy { get; set; }

        public string ItmCd { get; set; }

        public string ItmNm { get; set; }

        public string unit { get; set; }
    }

    public class SplOrdSelectDetail
    {

        public int ItmKy { get; set; }
        public int OrdKy { get; set; }
        public int AdrKy { get; set; }
        public int RecurDlvNoKy { get; set; }
        public int RecurOrdDyKy { get; set; }

        public string ItmCd { get; set; }

        public string ItmNm { get; set; }

        public string Unit { get; set; }
        public int Qty { get; set; }
        public int OrdNo { get; set; }
        public DateTime? OrdDt { get; set; }

    }

    public class PnsSplOrderModel
    {
        public int FromItmTrnKy { get; set; }
        public int ToItmTrnKy { get; set; }
        public int FromTrnKy { get; set; }
        public int FromPrjKy { get; set; }
        public int ToTrnKy { get; set; }
        public int ToPrjKy { get; set; }
        public int OrdDetKy { get; set; }
        public int OrdKy { get; set; }
        public int isAct { get; set; }
        public int isApr { get; set; }
        public int LocKy { get; set; }
        public int BUKy { get; set; }
        public int AdrKy { get; set; }
        public int AccAdrKy { get; set; }
        public int TrnNo { get; set; }

        public string PrefixTrnNo { get; set; }
        public string DocNo { get; set; }
        public string AdrId { get; set; }
        public string AdrNm { get; set; }
        public int AccKy { get; set; }
        public int LiNo { get; set; }
        public int ItmKy { get; set; }
        public int ItmTrnKy { get; set; }
        public double Qty { get; set; }
        public double TrnQty { get; set; }
        public int UnitKy { get; set; }
        public string Unit { get; set; }
        public double Rate { get; set; }
        public double TrnRate { get; set; }
        public double DisPer { get; set; }
        public double DisAmt { get; set; }
        public double TrnDisAmt { get; set; }
        public object ReqDt { get; set; }
        public DateTime EftvDt { get; set; }
        public DateTime OrdDt { get; set; }

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
        public string Rem { get; set; }
        public int LiNoRate { get; set; }
        public int LiNoCrnKy { get; set; }
        public int LiNoExRate { get; set; }
        public int LiNoDisAmt { get; set; }
        public string Des { get; set; }
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
        public double VAT { get; set; }
        public double WHT { get; set; }
        public double NBT { get; set; }
        public double SVAT { get; set; }
        public double ItmTaxTyp5Per { get; set; }
        public double SVatAmt { get; set; }
        public string ItmTaxTyp5 { get; set; }
        public int AprPrtyKy { get; set; }
        public int AprStsKy { get; set; }
    }

    public class SplOrderItmList
    {
        public int OrdKy { get; set; }
        public int OrdNo { get; set; }
    }

    public class SplSelectOrderItmList
    {
        public int ItmKy { get; set; }
        public string ItmCd { get; set; }
        public string ItmNm { get; set; }
        public string unit { get; set; }
        public int Qty { get; set; }
    }

    public class SplTaxNoModel
    {
        public string TaxNo { get; set; }
        public int TaxVal { get; set; }
    }

    public class SplSlsOrdHdr
    {
        public int OrdKy { get; set; }
        public int OrdTypKy { get; set; }
        public int OrdPrefixKy { get; set; }
        public int OrdNo { get; set; }
        public object OrdDt { get; set; }
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

        public object DlyDate { get; set; }
        public object DlyDateHdr { get; set; }
        public int DispatchTime { get; set; }
        public double DisAmt { get; set; }
        public double DisPer { get; set; }

    }

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
        public object DlyDt { get; set; }
        public object OrdDt { get; set; }
        public int DispatchTime { get; set; }
        public string DispatchTimeNm { get; set; }
        public string OrdAdrNm { get; set; }
        public int ProductionTime { get; set; }
        public object CusTime { get; set; }
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

    public class SplRateModel
    {
        public int ItmKy { get; set; }
        public string ItmNm { get; set; }
        public string ItmCd { get; set; }
        public int Rate { get; set; }
        public int DisAmt { get; set; }
        public int DisPer { get; set; }
    }
    public class SplItmMasCatModel
    {
        public int CdKy { get; set; }
        public string Code { get; set; }
        public string CdNm { get; set; }
        public string ConCd { get; set; }
        public int CKy { get; set; }
        public int isDefault { get; set; }

    }
    public class SplItemForOrdtypModel
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

        public int LiNo { get; set; }

    }

    public class SplGRN
    {
        public int Lino { get; set; }
        public int ItmTrnKy { get; set; }
        public int LiNo { get; set; }
        public int TrnKy { get; set; }
        public int TrnTypKy { get; set; }
        public string OrdDt { get; set; }
        public int PmtTrmKy { get; set; }
        public int TrnCrnKy { get; set; }
        public string TrnDt { get; set; }
        public string YurRef { get; set; }

        public int DisAmt { get; set; }
        public string ReqDt { get; set; }
        public int TrnNo { get; set; }
        public int TrnPreFixKy { get; set; }
        public string PrefixTrnNo { get; set; }
        public string DocNo { get; set; }
        public int TrnExRate { get; set; }
        public string Des { get; set; }
        public string Rem { get; set; }
        public double Rate { get; set; }
        public int LocKy { get; set; }
        public int PrjKy { get; set; }
        public string PrjId { get; set; }
        public string PrjNm { get; set; }
        public int BuKy { get; set; }
        public int AdrKy { get; set; }
        public string AdrId { get; set; }
        public int AccKy { get; set; }
        public int SlsAccKy { get; set; }
        public string ItmCd { get; set; }
        public string ItmNm { get; set; }
        public int ItmKy { get; set; }
        public string Unit { get; set; }
        public int UnitKy { get; set; }
        public double Qty { get; set; }
        public int PrcsDetKy { get; set; }
        public string PrcsID { get; set; }
        public int OrdDetKy { get; set; }
        public string Prefix { get; set; }
        public string AdrNm { get; set; }

        public double Dsicount { get; set; }
        public double NBT { get; set; }
        public double Vat { get; set; }
        public double Wht { get; set; }
        public double Svat { get; set; }
        public double SubTotal { get; set; }
        public double Total { get; set; }
        public double DisPer { get; set; }
        public string HdrDes { get; set; }
    }
    public class SplControlConKyModel
    {
        public int ControlConKy { get; set; }
    }
    public class SplAdrModel
    {
        public int AdrKy { get; set; }
        public string AdrID { get; set; }
        public string AdrNm { get; set; }
        public int AccKy { get; set; }
        public string AccCd { get; set; }
        public string AccNm { get; set; }

    }

    public class SplCdMas
    {
        public int CdKy { get; set; }
        public string Code { get; set; }
        public string CdNm { get; set; }
       
    }
}
