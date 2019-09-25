using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BlueLotus.ItmMas.Model.Contract
{
    public interface IItmMasModel
    {

    }

    public class ResourceForTaskAloc_Select
    {
        string ResCd { get; set; }
        string ResNm { get; set; }
        int LiNo { get; set; }
        //public double ReqQty { get; set; }
        string Unit { get; set; }
        int UnitKy { get; set; }
        //public double Rate { get; set; }
        //public int PrcsDetCmpnKy { get; set; }
        //public int ItmCat2Ky { get; set; }
        //public int ItmTypKy { get; set; }
        int ItmKy { get; set; }
        //public int AdrPrefixKy { get; set; }
        //public int AdrKy { get; set; }
        string ItmTypCd { get; set; }
    }

    public class ItemComponent
    {
        int ItmCmpnDetKy { get; set; }
        int ItmKy { get; set; }
        string ResNm { get; set; }
        string ResCd { get; set; }
        int ItmCmpnKy { get; set; }
        int LiNo { get; set; }
        string ItmCmpnDetDes { get; set; }
        double Qty { get; set; }
        int WstPer { get; set; }
        double WstQty { get; set; }
        int UsagPer { get; set; }
        double TrnQty { get; set; }
        int UnitKy { get; set; }
        string Unit { get; set; }
        int CompFacPer { get; set; }
        int ResReqSchTypKy { get; set; }
        double FinQty { get; set; }


    }

    public class ConvRate
    {
        double ConRate { get; set; }
        int ItmUnitKy { get; set; }
        int UnitKy { get; set; }
        string Unit { get; set; }
        string IsAct { get; set; }
    }

    public class ItemComponentHdr
    {
        int ItmCmpnKy { get; set; }
        DateTime EftvDt { get; set; }
        int FinItmKy { get; set; }
        Double FinQty { get; set; }
        string ItmCmpnDes { get; set; }
        int IsAct { get; set; }
    }

      public class ItmMasCatModel
    {
        int CdKy { get; set; }
        string Code { get; set; }
        string CdNm { get; set; }
        string ConCd { get; set; }
        int CKy { get; set; }
        int isDefault { get; set; }

    }

    public class CdMas
    {
        int CdKy { get; set; }
        string Code { get; set; }
        string CdNm { get; set; }
        short CKy { get; set; }
        string ConCd { get; set; }
    }

    public class ItmMasEAN
    {
        int ItmEANKy { get; set; }
        int ItmKy { get; set; }
        string EAN { get; set; }
        Boolean isApr { get; set; }

        public ItmMasEAN()
        {
            ItmEANKy = 1;
            ItmKy = 1;
        }
    }

    public class ItmMasModel
    {
        bool isSysRec { get; set; }
        long ItmKy { get; set; }
        int SO { get; set; }
        int ItmTypKy { get; set; }
        string ItmCd { get; set; }
        string ItmNm { get; set; }
        string ItmDisplayNm { get; set; }
        string PartNo { get; set; }
        string Unit { get; set; }
        string Units { get; set; }
        int UnitKy { get; set; }
        string UsageUnit { get; set; }
        int UsageUnitKy { get; set; }
        int ItmCat1Ky { get; set; }
        int ItmCat2Ky { get; set; }
        int ItmCat3Ky { get; set; }
        int ItmCat4Ky { get; set; }
        int ItmCat5Ky { get; set; }
        int ItmCat6Ky { get; set; }
        int ItmCat7Ky { get; set; }
        int ItmCat8Ky { get; set; }
        int ItmCat9Ky { get; set; }
        int ItmCat10Ky { get; set; }
        int ItmCat11Ky { get; set; }
        int ItmCat12Ky { get; set; }
        string Cat1Cd { get; set; }
        string Cat2Cd { get; set; }
        string Cat3Cd { get; set; }
        string Cat4Cd { get; set; }
        string Cat5Cd { get; set; }
        string Cat6Cd { get; set; }
        string Cat7Cd { get; set; }
        string Cat8Cd { get; set; }
        string Cat9Cd { get; set; }
        string Cat10Cd { get; set; }
        string Cat11Cd { get; set; }
        string Cat12Cd { get; set; }
        float ReOrdLvl { get; set; }
        float ReOrdQty { get; set; }
        int ModelKy { get; set; }
        string modelCd { get; set; }
        string Brand { get; set; }
        int BrandKy { get; set; }
        string brandCd { get; set; }
        int SupWrnty { get; set; }
        int CusWrnty { get; set; }
        int SupWrntyRead { get; set; }
        int CusWrntyRead { get; set; }
        string EngineNo { get; set; }
        int AcsLvlKy { get; set; }
        string Des { get; set; }
         bool isDiscontinued { get; set; }
         bool isAlwTrnRateChange { get; set; }
         bool isAlwZeroPrice { get; set; }
         bool isAgeVarification { get; set; }
         float MinQty { get; set; }
         float MaxQty { get; set; }
         bool isAct { get; set; }
         bool isApr { get; set; }
         int BUKy { get; set; }
         bool isMain { get; set; }
         int PrntKy { get; set; }
         string Rem { get; set; }
         string PrntItmCd { get; set; }
         string PrntItmNm { get; set; }
         string BUCd { get; set; }
         string BUNm { get; set; }
         int ItmAccCatKy { get; set; }
         string ItmAccCatCd { get; set; }
         string ItmAccCatNm { get; set; }
         int CosPri { get; set; }
         int SlsPri { get; set; }
         bool isSubstitute { get; set; }
         int isSrlNo { get; set; }
         string SerNo { get; set; }
         int ItmPriCatKy { get; set; }
         string PriCatCd { get; set; }
         bool isPrnt { get; set; }
         string EAN { get; set; }
         string ProductionLoc { get; set; }
         string ManufacturingLoc { get; set; }
         bool isAlwTrn { get; set; }
         float AnlQty { get; set; }

    }

    public class PrntItmNmModel
    {
        int PrntKy { get; set; }
        string PrntItmCd { get; set; }
        string PrntItmNm { get; set; }

    }

    public class ItmAccCatModel
    {
        int ItmAccCatKy { get; set; }
        string ItmAccCatCd { get; set; }
        string ItmAccCatNm { get; set; }

    }


    public class ItmPriCatModel
    {
        int ItmPriCatKy { get; set; }
        string PriCatCd { get; set; }

    }

    public class UnitModel
    {
       int UnitKy { get; set; }
       string Unit { get; set; } 
    }

    public class ControlConKyModel
    {
        int ControlConKy { get; set; }
    }

    public class ItmCost
    {  
        int LiNo { get; set; }
        int IsAct { get; set; }
        int TaskKy { get; set; }
        string TaskId { get; set; }
        string TaskNm { get; set; }
        int ItmKy { get; set; }
        int ControlConKy { get; set; }
        int ItmRateKy { get; set; }
        double Rate { get; set; }
        int LocKy { get; set; }
        int PrjKy { get; set; }
        int BuKy { get; set; }
        int AdrKy { get; set; }
        int OthTrnTypKy { get; set; }
        string ItemCode { get; set; }
        string ItemNm { get; set; }
        string LocationCode { get; set; }

        double PreviousRate { get; set; }
        string EftvDate { get; set; }

        string ItemType { get; set; }
        string Unit { get; set; }
        int UnitKy { get; set; }
        string PrjId { get; set; }
        string BU { get; set; }
        string AdrNm { get; set; }

        string AdrId { get; set; }
        string AccCd { get; set; }
        int AccKy { get; set; }
        int BUky { get; set; }
        bool isDisCont { get; set; }
        string EAN { get; set; }
        string PreviousDate { get; set; }
        int CKy { get; set; }
        int CdKy { get; set; }
        int OrdDetKy { get; set; }
        int @ItmTrnKy { get; set; }


    }

    public class ProjectResourceDetails_Select
    {
        int PrcsDetCmpnKy { get; set; }
        int PrcsSchDetKy { get; set; }
        int PrcsDetKy { get; set; }
        int ItmTrnKy { get; set; }
        int PrjKy { get; set; }
        string TaskID { get; set; }
        string TaskNm { get; set; }
        string ResCd { get; set; }
        string ResNm { get; set; }
        double ReqQty { get; set; }
        double Qty { get; set; }
        string Unit { get; set; }
        int UnitKy { get; set; }
        double Rate { get; set; }
        int ItmKy { get; set; }
        int AdrKy { get; set; }
    }


    public class ProjectsHeaderModel
    {

        long PrjKy { get; set; }
        int PrjPrefixKy { get; set; }
        int PrjTypKy { get; set; }
        string PrjTyp { get; set; }
        string OurCd { get; set; }
        int PrjNo { get; set; }
        string DocNo { get; set; }
        string PrjNm { get; set; }
        int ItmKy { get; set; }
        string YurRef { get; set; }
        Nullable<System.DateTime> YurRefDt { get; set; }
        long AccKy { get; set; }
        long Adrky { get; set; }
        Nullable<System.DateTime> PrjDt { get; set; }
        int PrjStsKy { get; set; }
        byte isAct { get; set; }
        byte isApr { get; set; }
        int AcsLvlKy { get; set; }
        int ConFinLvlKy { get; set; }

        string accLvlNm { get; set; }
        string conLvlNm { get; set; }

        byte[] TmStmp { get; set; }
        Nullable<System.DateTime> PrjStDt { get; set; }
        Nullable<System.DateTime> PlnStDt { get; set; }
        Nullable<System.DateTime> PlnFinDt { get; set; }
        Nullable<System.DateTime> ExpiryDt { get; set; }
        long RepAdrKy { get; set; }
        int BUKy { get; set; }
        int LocKy { get; set; }
        float DisPer { get; set; }
        decimal CtrtAmt { get; set; }
        decimal ContegencyAmt { get; set; }
        decimal LiqdRate { get; set; }
        decimal Amt1 { get; set; }
        decimal Amt2 { get; set; }
        float MarPer { get; set; }
        string Des { get; set; }
        string Rem { get; set; }
        float RetnPer { get; set; }
        float MaxRetnPer { get; set; }
        float RetnPeriod { get; set; }
        float RetnDays { get; set; }
        short PlnYY { get; set; }
        short PlnMM { get; set; }
        short PlnDD { get; set; }
        short PmtLagDay { get; set; }
        short FinancePer { get; set; }
        short AdvPer { get; set; }
        float AdvDedPer { get; set; }
        int RetnPeriodUnitKy { get; set; }
        decimal Guarantee { get; set; }
        decimal CostAdvBond { get; set; }
        decimal CostPerfBond { get; set; }
        float Tax1 { get; set; }
        float Tax2 { get; set; }
        float Tax3 { get; set; }
        Nullable<System.DateTime> FinDt { get; set; }
        int PrjSTypKy { get; set; }
        int PrjCat1Ky { get; set; }
        int PrjCat2Ky { get; set; }
        int PrjCat3Ky { get; set; }
        int PrjCat4Ky { get; set; }
        Nullable<long> PrntKy { get; set; }
        float SO { get; set; }
        short Acres { get; set; }
        short Root { get; set; }
        short Perch { get; set; }
        long AdrKy2 { get; set; }
        string North { get; set; }
        string East { get; set; }
        string West { get; set; }
        string South { get; set; }
        string PermitNo { get; set; }
        string DeedNo { get; set; }
        Nullable<System.DateTime> PermitDate { get; set; }
        Nullable<System.DateTime> DeedDate { get; set; }
        int PrjCat5Ky { get; set; }
        int PrjCat6Ky { get; set; }
        int BnkKy { get; set; }
        int BrnKy { get; set; }
        float Distance { get; set; }
        int DistanceUnitKy { get; set; }
    }

    public interface CMSprojectForItmMas
    {
        int PrjKy { get; set; }
        string PrjNm { get; set; }
        string PrjID { get; set; }
        string PrjtypCd { get; set; }
        string PrjNo { get; set; }
    }

}
