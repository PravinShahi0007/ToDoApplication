using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BlueLotus.TransactionModel.Entity
{
    public class TrnHdr_SelectModel
    {
        public int TrnKy { get; set; }
        public string TmStmp { get; set; }
        public string PrefixTrnNo { get; set; }
        public int AcsLvlKy { get; set; }
        public int ConFinLvlKy { get; set; }
    }

    public class ItmTrnSer_SelectWeb
    {
        public int ItmTrnKy { get; set; }
        public int SerNoKy { get; set; }
        public int LiNo { get; set; }
        public string SerNo { get; set; }
        public string VehicleNumber { get; set; }
        public string BatchNo { get; set; }
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
    }

    public class UpdateItmQtyModel
    {
        public int ItmTrnKy { get; set; }
        public double Qty { get; set; }
        public double NewQty { get; set; }
        public double TrnQty { get; set; }
        public string ItmCd { get; set; }
        public string ItmNm { get; set; }
        public int LiNo { get; set; }
    }

    public class TrnHdrTrnDetModel
    {
        public int FromItmTrnKy { get; set; }
        public int ToItmTrnKy { get; set; }
        public int FromTrnKy { get; set; }
        public int FromPrjKy { get; set; }
        public int ToTrnKy { get; set; }
        public int ToPrjKy { get; set; }
        public int OrdDetKy { get; set; }
        public int OrdKy { get; set; }
        public Nullable<int> isAct { get; set; }
        public Nullable<int> isApr { get; set; }
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

    public class ValidateModel
    {
        public int CdKy { get; set; }
        public string Message { get; set; }
        public int IsValidate { get; set; }

    }
    public class AccModel
    {
        public int AccKy { get; set; }
        public string AccCd { get; set; }
        public string AccNm { get; set; }
        public int isDefault { get; set; }

    }
    public class CMSproject
    {
        public int PrjKy { get; set; }
        public string PrjNm { get; set; }
        public string PrjID { get; set; }
        public string PrjtypCd { get; set; }
        public string PrjNo { get; set; }
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

    public class GRN
    {
        public int Lino { get; set; }
        public int ItmTrnKy { get; set; }
        public int LiNo { get; set; }
        public int TrnKy { get; set; }
        public int AcsLvlKy { get; set; }
        public int ConFinLvlKy { get; set; }
        public int TrnTypKy { get; set; }
        public string OrdDt { get; set; }
        public int PmtTrmKy { get; set; }
        public int TrnCrnKy { get; set; }
        public string TrnDt { get; set; }
        public string YurRef { get; set; }
        public string DeliNo { get; set; }

        public int DisAmt { get; set; }
        public string ReqDt { get; set; }
        public int TrnNo { get; set; }
        public int O_OrdKy { get; set; }
        public string O_OrdNo { get; set; }
        public string O_DocNo { get; set; }
        public int TrnPreFixKy { get; set; }
        public string PrefixTrnNo { get; set; }
        public string DocNo { get; set; }
        public int TrnExRate { get; set; }
        public string Des { get; set; }
        public string Rem { get; set; }
        public double Rate { get; set; }
        public int LocKy { get; set; }
        public int FrmLocKy { get; set; }
        public int ToLocKy { get; set; }
        public int PrjKy { get; set; }
        public int FrmPrjKy { get; set; }
        public int ToPrjKy { get; set; }
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
        public int RecurDlvNoKy { get; set; }
        public string TmStmp { get; set; }
        public int RepAdrKy { get; set; }
        public int OrdNoKy { get; set; }

        public double Amt1 { get; set; }
        public double Amt2 { get; set; }
        public double Amt3 { get; set; }
        public double Amt4 { get; set; }
        public double Amt5 { get; set; }
        public double Amt6 { get; set; }
        public double ComisPer { get; set; }
        public double RepComisPer { get; set; }

    }
    public class OrderModel
    {
        public double TaskQtyPer { get; set; }
        public int Cd1Ky { get; set; }
        public int Cd2Ky { get; set; }
        public string PrcsNm { get; set; }
        public int IsAlwMinusStk { get; set; }
        public int AvlStk { get; set; }
        private int preItmTrnKy;

        public int PreItmTrnKy
        {
            get { return preItmTrnKy; }
            set
            {
                if (value == 0)
                    preItmTrnKy = 1;
                else
                    preItmTrnKy = value;
            }
        }

        public int TskLockKy { get; set; }
        public string TskLockCd { get; set; }

        public long ItmTrnKy { get; set; }
        public long RefItmTrnKy { get; set; }

        public int ContraItmTrnKy { get; set; }

        public int LocKy2 { get; set; }
        public long ItmTrnTrfLnkKy { get; set; }
        public int FrmItmTrnKy { get; set; }
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
        public string YurRef { get; set; }
        public string YurRefDt { get; set; }
        public string AdrId { get; set; }
        public string AdrNm { get; set; }
        public int RepAdrKy { get; set; }
        public int AccKy { get; set; }
        public int LiNo { get; set; }
        public int ItmKy { get; set; }
        // public int ItmTrnKy { get; set; }
        public double Qty { get; set; }
        public double TrnQty { get; set; }
        public double OrdrdQty { get; set; }
        public double BaseQty { get; set; }
        public int UnitKy { get; set; }
        public string Unit { get; set; }
        private double? rate;

        public double? Rate
        {
            get { return rate; }
            set
            {
                if (value == null)
                    rate = 0;
                else
                    rate = value;
            }
        }

        public double? trnRate;
        public double? TrnRate
        {
            get { return trnRate; }
            set
            {
                if (value == null)
                    trnRate = 0;
                else
                    trnRate = value;
            }
        }

        private double? disPer;

        public double? DisPer
        {
            get { return disPer; }
            set
            {
                if (value == null)
                    disPer = 0;
                else
                    disPer = value;
            }
        }
        private double? disAmt;

        public double? DisAmt
        {
            get { return disAmt; }
            set
            {
                if (value == null)
                    disAmt = 0;
                else
                    disAmt = value;
            }
        }
        public double TrnDisAmt { get; set; }
        public string ReqDt { get; set; }
        public string EftvDt { get; set; }
        public string OrdDt { get; set; }

        public int ItmPrpKy { get; set; }
        public int IsSetOff { get; set; }
        public int PrjKy { get; set; }
        public string PrjId { get; set; }

        public String PrjNm { get; set; }
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
        public string DetRem { get; set; }
        public int LiNoRate { get; set; }
        public int LiNoCrnKy { get; set; }
        public int LiNoExRate { get; set; }
        public int LiNoDisAmt { get; set; }
        public string Des { get; set; }
        public string DetDes { get; set; }
        public int IsVirtItm { get; set; }
        public int Maint { get; set; }
        private double? vatAmt;

        public double? VatAmt
        {
            get { return vatAmt; }
            set
            {
                if (value == null)
                    vatAmt = 0;
                else
                    vatAmt = value;
            }
        }
        private double? wHTAmt;

        public double? WHTAmt
        {
            get { return wHTAmt; }
            set
            {
                if (value == null)
                    wHTAmt = 0;
                else
                    wHTAmt = value;
            }
        }
        public double NBTAmt { get; set; }

        public double Amt1 { get; set; }
        public int DlvAdrKy { get; set; }
        public int isRateInclTT1 { get; set; }
        public int AddAlwPer { get; set; }
        public int OrgRate { get; set; }
        private double? vAT;
        public double? VAT
        {
            get { return vAT; }
            set
            {
                if (value == null)
                    vAT = 0;
                else
                    vAT = value;
            }
        }

        private double? wHT;
        public double? WHT
        {
            get { return wHT; }
            set
            {
                if (value == null)
                    wHT = 0;
                else
                    wHT = value;
            }
        }

        private double? nBT;
        public double? NBT
        {
            get { return nBT; }
            set
            {
                if (value == null)
                    nBT = 0;
                else
                    nBT = value;
            }
        }

        private double? sVAT;
        public double? SVAT
        {
            get { return sVAT; }
            set
            {
                if (value == null)
                    sVAT = 0;
                else
                    sVAT = value;
            }
        }

        public double ItmTaxTyp5Per { get; set; }
        public double SVatAmt { get; set; }
        public string ItmTaxTyp5 { get; set; }
        public int AprPrtyKy { get; set; }
        public int AprStsKy { get; set; }
        public int CurrenKy { get; set; }
        public string Currence { get; set; }
        public int PmtKy { get; set; }
        public string Pmt { get; set; }

        public double? amt2;
        public double? Amt2
        {
            get { return amt2; }
            set
            {
                if (value == null)
                    amt2 = 0;
                else
                    amt2 = value;
            }
        }

        public double? amt3;
        public double? Amt3
        {
            get { return amt3; }
            set
            {
                if (value == null)
                    amt3 = 0;
                else
                    amt3 = value;
            }
        }

        public double? amt4;
        public double? Amt4
        {
            get { return amt4; }
            set
            {
                if (value == null)
                    amt4 = 0;
                else
                    amt4 = value;
            }
        }

        public double? amt5;
        public double? Amt5
        {
            get { return amt5; }
            set
            {
                if (value == null)
                    amt5 = 0;
                else
                    amt5 = value;
            }
        }

        public double? amt6;
        public double? Amt6
        {
            get { return amt6; }
            set
            {
                if (value == null)
                    amt6 = 0;
                else
                    amt6 = value;
            }
        }

        public double? taskQty;
        public double? TaskQty
        {
            get { return taskQty; }
            set
            {
                if (value == null)
                    taskQty = 0;
                else
                    taskQty = value;
            }
        }

        public int? taskUnitKy;
        public int? TaskUnitKy
        {
            get
            { return taskUnitKy; }
            set
            {
                if (value == null)
                    taskUnitKy = 1;
                else
                    taskUnitKy = value;
            }
        }
        public string TaskUnit { get; set; }
    }

    public class TaxNoModel
    {
        public string TaxNo { get; set; }
        public int TaxVal { get; set; }
    }

    public class UnitModel
    {
        public int UnitKy { get; set; }
        public string Unit { get; set; }


    }
    public class TaskModel
    {
        public int TaskKy { get; set; }
        public string TaskId { get; set; }
        public string TaskNm { get; set; }


    }
    public class AdrModel
    {
        public int AdrKy { get; set; }
        public string AdrID { get; set; }
        public string AdrNm { get; set; }
        public int AccKy { get; set; }
        public string AccCd { get; set; }
        public string AccNm { get; set; }

    }

    public class PrcsModel
    {
        public int PrcsDetKy { get; set; }
        public string PrcsID { get; set; }
        public string PrcsNm { get; set; }

    }

    public class ItemForOrdtypModel
    {
        public string ItmCd { get; set; }
        public int ItmKy { get; set; }
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
        public int isSrlNo { get; set; }
        //=================================
        public double TtlCost { get; set; }
        public double ReqRate { get; set; }
        public double CostPri { get; set; }
        public double AnlCost { get; set; }
        public double Totalrec { get; set; }


    }
    public class OrderHdrModel
    {

        public int OrdKy { get; set; }
        public int OrdTypKy { get; set; }
        public int OrdPrefixKy { get; set; }
        public int OrdPrefixNo { get; set; }
        public int OrdNo { get; set; }
        public int PmtKy { get; set; }
        public int CurrencyKy { get; set; }
        public int ExtRate { get; set; }
        public DateTime OrdDt { get; set; }
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
        public int LocKy2 { get; set; }
        public int key { get; set; }
    }

    public class TrnModel
    {
        public int FromTrnKy { get; set; }
        public int ToTrnKy { get; set; }
        public string TrnNo { get; set; }
        public int FrmTrnNo { get; set; }
        public int ToTrnNo { get; set; }
        public string StringFrmTmStmp { get; set; }
        public string StringToTmStmp { get; set; }
        public int AcsLvlKy { get; set; }
        public int ConfinLvlKy { get; set; }


    }
    public class TrnOutNo
    {
        public int TrnUnitKy { get; set; }
        public int TrnQty { get; set; }
        public int DlvToLocKy { get; set; }
        public int AdrKy { get; set; }

        public string PrefixTrnNo { get; set; }
        public int FromTrnNo { get; set; }
        public int ToTrnNo { get; set; }
        public int FromTrnTypKy { get; set; }
        public int ToTrnTypKy { get; set; }
        public int ToTrnPreFixKy { get; set; }
        public int FromTrnPreFixKy { get; set; }
        public string Prefix { get; set; }
        public int FromTrnKy { get; set; }
        public int ToTrnKy { get; set; }
        public int PrjKy { get; set; }
        public int FrmPrjKy { get; set; }
        public int ToPrjKy { get; set; }
        public string TrnDt { get; set; }
        public int ToLocKy { get; set; }
        public int FromLocKy { get; set; }
        public int ToAdrKy { get; set; }
        public int FrmAdrKy { get; set; }
        public int CdKy1 { get; set; }
        public string DocNo { get; set; }
        public string YurRef { get; set; }
        public string Des { get; set; }
        public string Rem { get; set; }
        public int Amt { get; set; }
        public string TmStamp { get; set; }
        public string ToTmStamp { get; set; }
        public string AcsLvlKy { get; set; }
        public string ConfinLvlKy { get; set; }
        public int isRecur { get; set; }
        public int isApr { get; set; }

    }
    public class TrnOutDetailModel
    {
        public int LiNo { get; set; }
        public int FromItmTrnKy { get; set; }
        public int FromTrnKy { get; set; }
        public int ToItmTrnKy { get; set; }
        public int ToTrnKy { get; set; }
        public double TrnQty { get; set; }
        public double TrnRate { get; set; }
        public int FromPrjKy { get; set; }
        public int ToPrjKy { get; set; }
        public string ItmNm { get; set; }
        public string ItmCd { get; set; }
        public int ItmKy { get; set; }
        public int Anl1Ky { get; set; }
        public string Anl1Cd { get; set; }
        public string Anl2Cd { get; set; }
        public string Anl3Cd { get; set; }
        public int Anl2Ky { get; set; }
        public int Anl3Ky { get; set; }
        public string Des { get; set; }
        public string Rem { get; set; }
        public int TrnUnitKy { get; set; }
        public string Unit { get; set; }
        public int UnitKy { get; set; }

        public int PrcsDetKy { get; set; }
        public string PrcsID { get; set; }
        public int AdrKy { get; set; }
        public string AdrNm { get; set; }


    }
    public class TrnOutHdrModel
    {
        public int FromTrnKy { get; set; }
        public int FromTrnTypKy { get; set; }
        public int FromTrnNo { get; set; }
        public string DocNo { get; set; }
        public DateTime TrnDt { get; set; }
        public string Des { get; set; }
        public int Amt { get; set; }
        public int ToLocKy { get; set; }
        public int FromLocKy { get; set; }
        public int PrjKy { get; set; }
        public int TrnUnitKy { get; set; }
        public int TrnQty { get; set; }
        public int DlvToLocKy { get; set; }
        public int AdrKy { get; set; }


    }
    public class TrnOutAndInData
    {
        public int TrnKy { get; set; }
        public int TrnNo { get; set; }
        public int TrnTypKy { get; set; }
        public string TrnTyp { get; set; }
        public DateTime TrnDt { get; set; }
        public string Prefix { get; set; }

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
    }

    public class RateModel
    {
        public int ItmKy { get; set; }
        public string ItmNm { get; set; }
        public string ItmCd { get; set; }
        public int Rate { get; set; }
        public int DisAmt { get; set; }
        public int DisPer { get; set; }
    }

    public class OrdSelectDetail
    {

        public int ItmKy { get; set; }
        public int OrdKy { get; set; }
        public int AdrKy { get; set; }
        public int RecurDlvNoKy { get; set; }
        public int RecurOrdDyKy { get; set; }

        public string ItmCd { get; set; }

        public string ItmNm { get; set; }

        public string Unit { get; set; }
        public Double Qty { get; set; }
        public int OrdNo { get; set; }
        public DateTime? OrdDt { get; set; }

    }
    public class ObjMasMdl
    {

        public int ObjKy { get; set; }
        public string Default { get; set; }
        public string ObjCd { get; set; }
        public string ObjNm { get; set; }
        public string ObjCaptn { get; set; }


    }


    public class TrnHdrDocModel
    {
        public string FileNm { get; set; }
        public string FilePath { get; set; }
        public string ImgBase64 { get; set; }
        public int DocKy { get; set; }
        public byte[] file_stream { get; set; }
    }

    public class ItmDetails
    {

        public int ItmKy { get; set; }
        public string ItmBrnd { get; set; }
        public decimal Qty { get; set; }
        public decimal AvlBudgetQty { get; set; }

    }
}
