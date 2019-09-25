using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BlueLotus.ItmMas.Model.Entity
{
    //public class ItmMasModel
    //{

    //}

    public class ResourceForTaskAloc_Select
    {
        public string ResCd { get; set; }
        public string ResNm { get; set; }
        public int LiNo { get; set; }
        //public double ReqQty { get; set; }
        public string Unit { get; set; }
        public int UnitKy { get; set; }
        //public double Rate { get; set; }
        //public int PrcsDetCmpnKy { get; set; }
        //public int ItmCat2Ky { get; set; }
        //public int ItmTypKy { get; set; }
        public int ItmKy { get; set; }
        //public int AdrPrefixKy { get; set; }
        //public int AdrKy { get; set; }
        public string ItmTypCd { get; set; }
    }

    public class ItemComponent
    {
        public int ItmCmpnDetKy { get; set; }
        public int ItmKy { get; set; }
        public string ResNm { get; set; }
        public string ResCd { get; set; }
        public int ItmCmpnKy { get; set; }
        public int LiNo { get; set; }
        public string ItmCmpnDetDes { get; set; }
        public double Qty { get; set; }
        public int WstPer { get; set; }
        public double WstQty { get; set; }
        public int UsagPer { get; set; }
        public double TrnQty { get; set; }
        public int UnitKy { get; set; }
        public string Unit { get; set; }
        public int CompFacPer { get; set; }
        public int ResReqSchTypKy { get; set; }
        public double FinQty { get; set; }


    }

    public class ConvRate
    {
        public double ConRate { get; set; }
        public int ItmUnitKy { get; set; }
        public int UnitKy { get; set; }
        public string Unit { get; set; }
        public string IsAct { get; set; }
    }

    public class ItemComponentHdr
    {
        public int ItmCmpnKy { get; set; }
        public DateTime EftvDt { get; set; }
        public int FinItmKy { get; set; }
        public Double FinQty { get; set; }
        public string ItmCmpnDes { get; set; }
        public int IsAct { get; set; }
    }

    public class ItmMasCatModel
    {
        public int CdKy { get; set; }
        public string Code { get; set; }
        public string CdNm { get; set; }
        public string ConCd { get; set; }
        public int CKy { get; set; }
        public int isDefault { get; set; }

    }

    
    public class CdMas
    {
        public int CdKy { get; set; }
        public string Code { get; set; }
        public string CdNm { get; set; }
        public short CKy { get; set; }
        public string ConCd { get; set; }
    }

    

    public class ItmMasModel
    {
        private int? _ServiceUnitKy { get; set; }
        public int? ServiceUnitKy
        {
            get { return _ServiceUnitKy; }
            set
            {
                if (value == null) _ServiceUnitKy = 1;
                else _ServiceUnitKy = value;
            }
        }
        public string ServiceUnit { get; set; }
        public bool IsGeneric { get; set; }
        public bool isSysRec { get; set; }
        public bool DeleteImage { get; set; }
        private long? itmKy;
        public long? ItmKy
        {
            get { return itmKy; }
            set
            {
                if (value == null) itmKy = 1;
                else itmKy = value;
            }
        }


        private int? itmTypKy;

        public int? ItmTypKy
        {
            get { return itmTypKy; }
            set
            {
                if (value == null) itmTypKy = 1;
                else itmTypKy = value;
            }
        }
        public string ItmCd { get; set; }
        public string ItmNm { get; set; }
        public string ItmDisplayNm { get; set; }
        public string PartNo { get; set; }
        public string Unit { get; set; }
        public string Units { get; set; }
        private int? unitKy;
        public int? UnitKy
        {
            get { return unitKy; }
            set
            {
                if (value == null) unitKy = 1;
                else unitKy = value;
            }
        }

        public string UsageUnit { get; set; }

        private int? usageUnitKy;
        public int? UsageUnitKy
        {
            get { return usageUnitKy; }
            set
            {
                if (value == null) usageUnitKy = 0;
                else usageUnitKy = value;
            }
        }
        private int? itmCat1Ky;
        public int? ItmCat1Ky
        {
            get { return itmCat1Ky; }
            set
            {
                if (value == null) itmCat1Ky = 1;
                else itmCat1Ky = value;
            }
        }

        private int? itmCat2Ky;
        public int? ItmCat2Ky
        {
            get { return itmCat2Ky; }
            set
            {
                if (value == null) itmCat2Ky = 1;
                else itmCat2Ky = value;
            }
        }
        private int? itmCat3Ky;
        public int? ItmCat3Ky
        {
            get { return itmCat3Ky; }
            set
            {
                if (value == null) itmCat3Ky = 1;
                else itmCat3Ky = value;
            }
        }
        private int? itmCat4Ky;
        public int? ItmCat4Ky
        {
            get { return itmCat4Ky; }
            set
            {
                if (value == null) itmCat4Ky = 1;
                else itmCat4Ky = value;
            }
        }
        private int? itmCat5Ky;
        public int? ItmCat5Ky
        {
            get { return itmCat5Ky; }
            set
            {
                if (value == null) itmCat5Ky = 1;
                else itmCat5Ky = value;
            }
        }
        private int? itmCat6Ky;
        public int? ItmCat6Ky
        {
            get { return itmCat6Ky; }
            set
            {
                if (value == null) itmCat6Ky = 1;
                else itmCat6Ky = value;
            }
        }
        private int? itmCat7Ky;
        public int? ItmCat7Ky
        {
            get { return itmCat7Ky; }
            set
            {
                if (value == null) itmCat7Ky = 1;
                else itmCat7Ky = value;
            }
        }
        private int? itmCat8Ky;
        public int? ItmCat8Ky
        {
            get { return itmCat8Ky; }
            set
            {
                if (value == null) itmCat8Ky = 1;
                else itmCat8Ky = value;
            }
        }
        private int? itmCat9Ky;
        public int? ItmCat9Ky
        {
            get { return itmCat9Ky; }
            set
            {
                if (value == null) itmCat9Ky = 1;
                else itmCat9Ky = value;
            }
        }
        private int? itmCat10Ky;
        public int? ItmCat10Ky
        {
            get { return itmCat10Ky; }
            set
            {
                if (value == null) itmCat10Ky = 1;
                else itmCat10Ky = value;
            }
        }
        private int? itmCat11Ky;
        public int? ItmCat11Ky
        {
            get { return itmCat11Ky; }
            set
            {
                if (value == null) itmCat11Ky = 1;
                else itmCat11Ky = value;
            }
        }
        private int? itmCat12Ky;
        public int? ItmCat12Ky
        {
            get { return itmCat12Ky; }
            set
            {
                if (value == null) itmCat12Ky = 1;
                else itmCat12Ky = value;
            }
        }
        public string Cat1Cd { get; set; }
        public string Cat2Cd { get; set; }
        public string Cat3Cd { get; set; }
        public string Cat4Cd { get; set; }
        public string Cat5Cd { get; set; }
        public string Cat6Cd { get; set; }
        public string Cat7Cd { get; set; }
        public string Cat8Cd { get; set; }
        public string Cat9Cd { get; set; }
        public string Cat10Cd { get; set; }
        public string Cat11Cd { get; set; }
        public string Cat12Cd { get; set; }

        private int? modelKy;
        public int? ModelKy
        {
            get { return modelKy; }
            set
            {
                if (value == null) modelKy = 1;
                else modelKy = value;
            }
        }
        public string modelCd { get; set; }
        public string Des { get; set; }
        public string Brand { get; set; }
        private int? brandKy;
        public int? BrandKy
        {
            get { return brandKy; }
            set
            {
                if (value == null) brandKy = 1;
                else brandKy = value;
            }
        }
        public string brandCd { get; set; }

        public int SupWrnty { get; set; }
        public int CusWrnty { get; set; }
        public int SupWrntyRead { get; set; }
        public int CusWrntyRead { get; set; }
        public string EngineNo { get; set; }

        private int? acsLvlKy;
        public int? AcsLvlKy
        {
            get { return acsLvlKy; }
            set
            {
                if (value == null) acsLvlKy = 1;
                else acsLvlKy = value;
            }
        }

        private float? reOrdLvl;
        public float? ReOrdLvl
        {
            get { return reOrdLvl; }
            set
            {
                if (value == null) reOrdLvl = 0;
                else reOrdLvl = value;
            }
        }

        private float? reOrdQty;
        public float? ReOrdQty
        {
            get { return reOrdQty; }
            set
            {
                if (value == null) reOrdQty = 0;
                else reOrdQty = value;
            }
        }
        public int SO { get; set; }
        public bool isDiscontinued { get; set; }
        public bool isAlwTrnRateChange { get; set; }
        public bool isAlwZeroPrice { get; set; }
        public bool isAgeVarification { get; set; }
        public float MinQty { get; set; }
        public float MaxQty { get; set; } 
        public bool isAct { get; set; }

        public bool isApr { get; set; }
        private int? bUKy;

        public int? BUKy
        {
            get { return bUKy; }
            set
            {
                if (value == null) bUKy = 1;
                else bUKy = value;
            }
        }

        public bool isMain { get; set; }
        private int? prntKy;
        public int? PrntKy
        {
            get { return prntKy; }
            set
            {
                if (value == null) prntKy = 1;
                else prntKy = value;
            }
        }

        public string Rem { get; set; }
        public string PrntItmCd { get; set; }
        public string PrntItmNm { get; set; }
        public string BUCd { get; set; }
        public string BUNm { get; set; }
        private int? itmAccCatKy;
        public int? ItmAccCatKy
        {
            get { return itmAccCatKy; }
            set
            {
                if (value == null) itmAccCatKy = 1;
                else itmAccCatKy = value;
            }
        }

        public string ItmAccCatCd { get; set; }
        public string ItmAccCatNm { get; set; }
        public int CosPri { get; set; }
        public int SlsPri { get; set; }
        public int NO1 { get; set; }
        
        public bool isSubstitute { get; set; }
        public bool isSrlNo { get; set; }
        public string SerNo { get; set; }

        public int SerNoKy { get; set; }
        private int? itmPriCatKy;
        public int? ItmPriCatKy
        {
            get { return itmPriCatKy; }
            set
            {
                if (value == null) itmPriCatKy = 1;
                else itmPriCatKy = value;
            }
        }
        public string PriCatCd { get; set; }
        public bool isPrnt { get; set; }
        public string EAN { get; set; }
        public string Vat { get; set; }
        public int ItmTaxCatKy { get; set; }

        private int? itmTaxKy;
        public int? ItmTaxKy
        {
            get { return itmTaxKy; }
            set
            {
                if (value == null) itmTaxKy = 0;
                else itmTaxKy = value;
            }
        }
        public string EftvDt { get; set; }
        public int ControlConKy { get; set; }
        public string ProductionLoc { get; set; }
        public string ManufacturingLoc { get; set; }
        public bool isAlwTrn { get; set; }
        public float AnlQty { get; set; }
        public string ItmTyp { get; set; }
        public string FileName { get; set; }
        public string Image { get; set; }
    }

    public class ItmMasEAN
    {
        public int ItmEANKy { get; set; }
        public int ItmKy { get; set; }
        public string EAN { get; set; }
        public Boolean isApr { get; set; }

        public ItmMasEAN()
        {
            ItmEANKy = 1;
            ItmKy = 1;
        }
    }
    public class PrntItmNmModel
    {
        public int PrntKy { get; set; }
        public string PrntItmCd { get; set; }
        public string PrntItmNm { get; set; }
         
    }

    public class ItmAccCatModel
    {
        public int ItmAccCatKy { get; set; }
        public string ItmAccCatCd { get; set; }
        public string ItmAccCatNm { get; set; }
        
    }

    public class ItmStock
    {
        public long ItmKy { get; set; }
        public int CurrentStock { get; set; }
        public int GrpStock { get; set; }
        public float ReOrdLvl { get; set; }
        public float ReOrdQty { get; set; }
        public int PendingPO { get; set; }
        public int LocKy { get; set; }
        public string LocNm { get; set; }
        

    }
    public class ItmPriceRevision
    {
        public long ItmKy { get; set; }
        public string EftvDate { get; set; }
        public float SlsPri { get; set; }
        public float CosPri { get; set; }
        public float PreviousCosPri { get; set; }
        public float PreviousSlsPri { get; set; }
        public float Markup { get; set; }
        public string PreviousDate { get; set; }
        public int LocKy { get; set; }
        public string LocNm { get; set; }
        public int ItmRateKy { get; set; }
        public int CosItmRateKy { get; set; }
        public bool isFixedSlsPri { get; set; }
        public int ControlConKy { get; set; }

    }

    
    public class ItmPriCatModel
    {
        public int ItmPriCatKy { get; set; }
        public string PriCatCd { get; set; }

    }

    public class UnitModel
    {
        public int UnitKy { get; set; }
        public string Unit { get; set; } 

    }

    public class ControlConKyModel
    { 
        public int ControlConKy { get; set; }
    }

    public class ItmCost
    {

        public int LiNo { get; set; }
        public int IsAct { get; set; }

        private int? taskKy;
        public int? TaskKy
        {
            get { return taskKy; }
            set
            {
                if (taskKy == 0 || value == null)
                    taskKy = 1;
                else
                    taskKy = value;
            }
        }

        public string TaskId { get; set; }
        public string TaskNm { get; set; }
        public int itmky;
        public int ItmKy
        {
            get { return itmky; }
            set
            {
                if (value == 0 || value == null)
                    itmky = 1;
                else
                    itmky = value;
            }
        }
        public int controlconky;
        public int ControlConKy
        {
            get { return controlconky; }
            set
            {
                if (value == 0 || value == null)
                    controlconky = 1;
                else
                    controlconky = value;
            }
        }
        public int ItmRateKy { get; set; }
        public double Rate { get; set; }
        private int locky;
        public int LocKy
        {
            get { return locky; }
            set
            {
                if (value == 0 || value == null)
                    locky = 1;
                else
                    locky = value;
            }
        }
        public int prjky;
        public int PrjKy
        {
            get { return prjky; }
            set
            {
                if (value == 0 || value == null)
                    prjky = 1;
                else
                    prjky = value;
            }
        }

        public int adrky;
        public int AdrKy
        {
            get { return adrky; }
            set
            {
                if (value == 0 || value == null)
                    adrky = 1;
                else
                    adrky = value;
            }
        }
        public string AdrNm { get; set; }
        public int OthTrnTypKy { get; set; }
        public string ItemCode { get; set; }
        public string ItemNm { get; set; }
        public string LocationCode { get; set; }

        public double? PreviousRate { get; set; }
        public string EftvDate { get; set; }

        public string ItemType { get; set; }
        public string Unit { get; set; }
        public int UnitKy { get; set; }
        public string PrjId { get; set; }
        public string BU { get; set; }
        public string AdrId { get; set; }
        public string AccCd { get; set; }

        public int accky;
        public int AccKy
        {
            get { return accky; }
            set
            {
                if (value == 0 || value == null)
                    accky = 1;
                else
                    accky = value;
            }
        }

        public int buky;
        public int BUky
        {
            get { return buky; }
            set
            {
                if (value == 0 || value == null)
                    buky = 1;
                else
                    buky = value;
            }
        }
        public bool isDisCont { get; set; }
        public string EAN { get; set; }
        public string PreviousDate { get; set; }
        public int cKy;
        public int CKy
        {
            get { return cKy; }
            set
            {
                if (value == 0 || value == null)
                    cKy = 1;
                else
                    cKy = value;
            }
        }






        public int CdKy { get; set; }
        public int OrdDetKy { get; set; }
        public int @ItmTrnKy { get; set; }


        
    }

    public class ProjectResourceDetails_Select
    {
        public int PrcsDetCmpnKy { get; set; }
        public int PrcsSchDetKy { get; set; }
        public int PrcsDetKy { get; set; }
        public int ItmTrnKy { get; set; }
        public int PrjKy { get; set; }
        public string TaskID { get; set; }
        public string TaskNm { get; set; }
        public string ResCd { get; set; }
        public string ResNm { get; set; }
        public double ReqQty { get; set; }
        public double Qty { get; set; }
        public string Unit { get; set; }
        public int UnitKy { get; set; }
        public double Rate { get; set; }
        public int ItmKy { get; set; }
        public int AdrKy { get; set; }
    }

    public class ProjectsHeaderModel
    {

        public long PrjKy { get; set; }
        public int PrjPrefixKy { get; set; }
        public int PrjTypKy { get; set; }
        public string PrjTyp { get; set; }
        public string OurCd { get; set; }
        public int PrjNo { get; set; }
        public string DocNo { get; set; }
        public string PrjNm { get; set; }
        public int ItmKy { get; set; }
        public string YurRef { get; set; }
        public Nullable<System.DateTime> YurRefDt { get; set; }
        public long AccKy { get; set; }
        public long Adrky { get; set; }
        public Nullable<System.DateTime> PrjDt { get; set; }
        public int PrjStsKy { get; set; }
        public byte isAct { get; set; }
        public byte isApr { get; set; }
        public int AcsLvlKy { get; set; }
        public int ConFinLvlKy { get; set; }

        public string accLvlNm { get; set; }
        public string conLvlNm { get; set; }

        public byte[] TmStmp { get; set; }
        public Nullable<System.DateTime> PrjStDt { get; set; }
        public Nullable<System.DateTime> PlnStDt { get; set; }
        public Nullable<System.DateTime> PlnFinDt { get; set; }
        public Nullable<System.DateTime> ExpiryDt { get; set; }
        public long RepAdrKy { get; set; }
        public int BUKy { get; set; }
        public int LocKy { get; set; }
        public float DisPer { get; set; }
        public decimal CtrtAmt { get; set; }
        public decimal ContegencyAmt { get; set; }
        public decimal LiqdRate { get; set; }
        public decimal Amt1 { get; set; }
        public decimal Amt2 { get; set; }
        public float MarPer { get; set; }
        public string Des { get; set; }
        public string Rem { get; set; }
        public float RetnPer { get; set; }
        public float MaxRetnPer { get; set; }
        public float RetnPeriod { get; set; }
        public float RetnDays { get; set; }
        public short PlnYY { get; set; }
        public short PlnMM { get; set; }
        public short PlnDD { get; set; }
        public short PmtLagDay { get; set; }
        public short FinancePer { get; set; }
        public short AdvPer { get; set; }
        public float AdvDedPer { get; set; }
        public int RetnPeriodUnitKy { get; set; }
        public decimal Guarantee { get; set; }
        public decimal CostAdvBond { get; set; }
        public decimal CostPerfBond { get; set; }
        public float Tax1 { get; set; }
        public float Tax2 { get; set; }
        public float Tax3 { get; set; }
        public Nullable<System.DateTime> FinDt { get; set; }
        public int PrjSTypKy { get; set; }
        public int PrjCat1Ky { get; set; }
        public int PrjCat2Ky { get; set; }
        public int PrjCat3Ky { get; set; }
        public int PrjCat4Ky { get; set; }
        public Nullable<long> PrntKy { get; set; }
        public float SO { get; set; }
        public short Acres { get; set; }
        public short Root { get; set; }
        public short Perch { get; set; }
        public long AdrKy2 { get; set; }
        public string North { get; set; }
        public string East { get; set; }
        public string West { get; set; }
        public string South { get; set; }
        public string PermitNo { get; set; }
        public string DeedNo { get; set; }
        public Nullable<System.DateTime> PermitDate { get; set; }
        public Nullable<System.DateTime> DeedDate { get; set; }
        public int PrjCat5Ky { get; set; }
        public int PrjCat6Ky { get; set; }
        public int BnkKy { get; set; }
        public int BrnKy { get; set; }
        public float Distance { get; set; }
        public int DistanceUnitKy { get; set; }

        public ProjectsHeaderModel()
        {
            this.PrjStsKy = 1;
            this.PrjPrefixKy = 1;
            this.AccKy = 1;
            this.Adrky = 1;
            this.ItmKy = 1;
            this.RepAdrKy = 1;
            this.BUKy = 1;
            this.LocKy = 1;
            this.RetnPeriodUnitKy = 1;
            this.PrjSTypKy = 1;
            this.PrjCat1Ky = 1;
            this.PrjCat2Ky = 1;
            this.PrjCat3Ky = 1;
            this.PrjCat4Ky = 1;
            this.PrntKy = 1;
            this.AdrKy2 = 1;
            this.PrjCat5Ky = 1;
            this.PrjCat6Ky = 1;
            this.BnkKy = 1;
            this.BrnKy = 1;
            this.AcsLvlKy = 889;
            this.ConFinLvlKy = 171;
        }
    }

    public class CMSprojectForItmMas
    {
        public int PrjKy { get; set; }
        public string PrjNm { get; set; }
        public string PrjID { get; set; }
        public string PrjtypCd { get; set; }
        public string PrjNo { get; set; }
    }

    public class ItmMasSerNo
    {
        public int ItmTrnKy { get; set; }
        public int SerNoKy { get; set; }
        public int LiNo { get; set; }
        public string SerNo { get; set; }
        public string SupExpryDt { get; set; }
        public int ItmKy { get; set; }
        public bool isAct { get; set; }

        //SupWrntyReading, CExpryDt, CWrntyReading, CSerNo, OriItmTrnKy, CurItmTrnKy
        public string SupWrntyReading { get; set; }
        public string CExpryDt { get; set; }
        public string CWrntyReading { get; set; }
        public string CSerNo { get; set; }
        public string EngineNo { get; set; }
        public string OriItmTrnKy { get; set; }
        public string CurItmTrnKy { get; set; }
        public int PrjKy { get; set; }
        public int PrjHdrSerNoKy { get; set; }
        public string VehicleNumber { get; set; }
    }

    public class Modifier
    {
        public int PrntItmKy { get; set; }
        public int ModifierItmKy { get; set; }
        public string ModifierItmCd { get; set; }
        public string ModifierItmNm { get; set; }
        public double Qty { get; set; }
        public double ModifierPrice { get; set; }
        public int POSModifierKy { get; set; }

    }


}
