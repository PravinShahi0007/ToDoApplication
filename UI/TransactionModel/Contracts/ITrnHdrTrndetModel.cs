using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BlueLotus.TransactionModel.Contracts
{
    interface ITrnHdrTrndetModel
    {
        int FromItmTrnKy { get; set; }
        int ToItmTrnKy { get; set; }
        int FromTrnKy { get; set; }
        int FromPrjKy { get; set; }
        int ToTrnKy { get; set; }
        int ToPrjKy { get; set; }
        int OrdDetKy { get; set; }
        int OrdKy { get; set; }
        Nullable<int> isAct { get; set; }
        Nullable<int> isApr { get; set; }
        int LocKy { get; set; }
        int BUKy { get; set; }
        int AdrKy { get; set; }
        int AccAdrKy { get; set; }
        int TrnNo { get; set; }

        string PrefixTrnNo { get; set; }
        string DocNo { get; set; }
        string AdrId { get; set; }
        string AdrNm { get; set; }
        int AccKy { get; set; }
        int LiNo { get; set; }
        int ItmKy { get; set; }
        int ItmTrnKy { get; set; }
        double Qty { get; set; }
        double TrnQty { get; set; }
        int UnitKy { get; set; }
        string Unit { get; set; }
        double Rate { get; set; }
        double TrnRate { get; set; }
        double DisPer { get; set; }
        double DisAmt { get; set; }
        double TrnDisAmt { get; set; }
        object ReqDt { get; set; }
        DateTime EftvDt { get; set; }
        DateTime OrdDt { get; set; }

        int ItmPrpKy { get; set; }
        int IsSetOff { get; set; }
        int PrjKy { get; set; }
        int Prj2Ky { get; set; }
        int Prj3Ky { get; set; }
        int Prj4Ky { get; set; }
        int Prj5Ky { get; set; }
        int LCKy { get; set; }
        int LoanKy { get; set; }
        int PrcsDetKy { get; set; }
        string PrcsID { get; set; }
        int PrcsDe2tKy { get; set; }
        int PrcsDet3Ky { get; set; }
        int PrcsDet4Ky { get; set; }
        int PrcsDet5Ky { get; set; }
        int LCDetKy { get; set; }
        int LoanDetKy { get; set; }
        int Anl1Ky { get; set; }
        string Anl1Cd { get; set; }
        string Anl2Cd { get; set; }
        string Anl3Cd { get; set; }
        int Anl2Ky { get; set; }
        int Anl3Ky { get; set; }
        int Anl4Ky { get; set; }
        int Anl5Ky { get; set; }
        int Anl6Ky { get; set; }
        string ItmNm { get; set; }
        string ItmCd { get; set; }
        string Rem { get; set; }
        int LiNoRate { get; set; }
        int LiNoCrnKy { get; set; }
        int LiNoExRate { get; set; }
        int LiNoDisAmt { get; set; }
        string Des { get; set; }
        int IsVirtItm { get; set; }
        int Maint { get; set; }
        double VatAmt { get; set; }
        double WHTAmt { get; set; }
        double NBTAmt { get; set; }

        double Amt1 { get; set; }
        int DlvAdrKy { get; set; }
        int isRateInclTT1 { get; set; }
        int AddAlwPer { get; set; }
        int OrgRate { get; set; }
        double VAT { get; set; }
        double WHT { get; set; }
        double NBT { get; set; }
        double SVAT { get; set; }
        double ItmTaxTyp5Per { get; set; }
        double SVatAmt { get; set; }
        string ItmTaxTyp5 { get; set; }
        int AprPrtyKy { get; set; }
        int AprStsKy { get; set; }
    }
    interface IValidateModel
    {
         int CdKy { get; set; }
         string Message { get; set; }
         int IsValidate { get; set; }

    }
}
