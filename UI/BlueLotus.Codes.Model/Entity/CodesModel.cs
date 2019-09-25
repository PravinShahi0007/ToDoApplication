using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BlueLotus.Codes.Model.Entity
{
    class CodesModel
    {

    }

    public class CdMas
    {
       
        public string Code { get; set; }
        public string CdNm { get; set; }
        public string TblNm { get; set; }
        public int GrpCdKy { get; set; }
        public int ControlConKy { get; set; }
        public string ControlConNm { get; set; }
        public int ObjKy { get; set; }
        public int CdKy { get; set; }
        public short CKy { get; set; }
        public string ConCd { get; set; }
        public string GrpConCd { get; set; }    

        public bool isAct { get; set; }
        public bool isApr { get; set; }
        public int AprStsKy { get; set; }
        public string OurCd { get; set; }
        public bool isAlwAcs { get; set; }
        public Nullable<bool> isAlwAdd { get; set; }
        public Nullable<bool> isAlwUpdate { get; set; }
        public Nullable<bool> isAlwDel { get; set; }
        public bool isAlwTrn { get; set; }
        public Nullable<int> PrntKy { get; set; }
        public int Prnt2Ky { get; set; }
        public Nullable<byte> Lvl { get; set; }
        public Nullable<float> SO { get; set; }
        public Nullable<bool> isLeaf { get; set; }
        public Nullable<bool> isPrnt { get; set; }
        public Nullable<bool> isRoot { get; set; }
        public Nullable<bool> isDefault { get; set; }
        public bool isSysRec { get; set; }
        public Nullable<int> AcsLvlKy { get; set; }
        public Nullable<int> ConFinLvlKy { get; set; }
        public string InsertDt { get; set; }
        public Nullable<short> Sky { get; set; }
        public byte[] TmStmp { get; set; }
        public int OrgKy { get; set; }
        public Nullable<double> Maint { get; set; }

        public string prntNm { get; set; }
        public string prnt2Nm { get; set; }
        public string accLvlNm { get; set; }
        public string conLvlNm { get; set; }
        public bool isCd01 { get; set; }
        public bool isCd02 { get; set; }
        public bool isCd03 { get; set; }
        public bool isCd04 { get; set; }
        public bool isCd05 { get; set; }
        public bool isCd06 { get; set; }
        public bool isCd07 { get; set; }
        public bool isCd08 { get; set; }
        public bool isCd09 { get; set; }
        public bool isCd10 { get; set; }
        public bool isCd11 { get; set; }
        public bool isCd12 { get; set; }
        public bool isCd13 { get; set; }
        public bool isCd14 { get; set; }
        public bool isCd15 { get; set; }
        public bool isCd16 { get; set; }
        public bool isCd17 { get; set; }
        public bool isCd18 { get; set; }
        public bool isCd19 { get; set; }
        public bool isCd20 { get; set; }
        public bool isCd21 { get; set; }
        public bool isCd22 { get; set; }
        public bool isCd23 { get; set; }
        public bool isCd24 { get; set; }
        public bool isCd25 { get; set; }
        public bool isCd26 { get; set; }
        public bool isCd27 { get; set; }
        public bool isCd28 { get; set; }
        public bool isCd29 { get; set; }
        public bool isCd30 { get; set; }
        public bool isCd31 { get; set; }
        public bool isCd32 { get; set; }
        public bool isCd33 { get; set; }
        public bool isCd34 { get; set; }
        public bool isCd35 { get; set; }
        public bool isCd36 { get; set; }
        public bool isCd37 { get; set; }
        public bool isCd38 { get; set; }
        public bool isCd39 { get; set; }
        public bool isCd40 { get; set; }
        public bool isCd41 { get; set; }
        public bool isCd42 { get; set; }
        public bool isCd43 { get; set; }
        public bool isCd44 { get; set; }
        public bool isCd45 { get; set; }
        public bool isCd46 { get; set; }
        public bool isCd47 { get; set; }
        public bool isCd48 { get; set; }
        public bool isCd49 { get; set; }
        public bool isCd50 { get; set; }
        public bool isCd51 { get; set; }
        public bool isCd52 { get; set; }
        public bool isCd53 { get; set; }
        public bool isCd54 { get; set; }
        public bool isCd55 { get; set; }
        public bool isCd56 { get; set; }
        public bool isCd57 { get; set; }
        public bool isCd58 { get; set; }
        public bool isCd59 { get; set; }
        public bool isCd60 { get; set; }
        public bool isCd61 { get; set; }
        public bool isCd62 { get; set; }
        public bool isCd63 { get; set; }
        public bool isCd64 { get; set; }
        public int CdInt1 { get; set; }
        public int CdInt2 { get; set; }
        public int CdInt3 { get; set; }
        public double CdNo1 { get; set; }
        public double CdNo2 { get; set; }
        public double CdNo3 { get; set; }
        public double CdNo4 { get; set; }
        public double CdNo5 { get; set; }
        public Nullable<int> CdRelCdKy { get; set; }
        public string CdRelConCd { get; set; }
        public string CdDt1 { get; set; }
        public string CdDt2 { get; set; }
        public string CdDt3 { get; set; }
        public string CdDt4 { get; set; }
        public string CdExtChr1 { get; set; }
        public string CdExtChr2 { get; set; }
        public string ConCd1 { get; set; }
        public string ConCd2 { get; set; }
        public Nullable<int> AccKy1 { get; set; }
        public Nullable<int> AccKy2 { get; set; }
        public bool isCd65 { get; set; }
        public bool isCd66 { get; set; }
        public bool isCd67 { get; set; }
        public bool isCd68 { get; set; }
        public bool isCd69 { get; set; }
        public bool isCd70 { get; set; }
        public bool isCd71 { get; set; }
        public bool isCd72 { get; set; }
        public bool isCd73 { get; set; }
        public bool isCd74 { get; set; }
        public bool isCd75 { get; set; }
        public bool isCd76 { get; set; }
        public bool isCd77 { get; set; }
        public bool isCd78 { get; set; }
        public bool isCd79 { get; set; }
        public bool isCd80 { get; set; }
        public bool isCd81 { get; set; }
        public bool isCd82 { get; set; }
        public bool isCd83 { get; set; }
        public bool isCd84 { get; set; }
        public bool isCd85 { get; set; }
        public bool isCd86 { get; set; }
        public bool isCd87 { get; set; }
        public bool isCd88 { get; set; }
        public bool isCd89 { get; set; }
        public bool isCd90 { get; set; }
        public byte[] TmStmpExt { get; set; }
        public Nullable<double> MaintExt { get; set; }

        public long PrjKy { get; set; }
        public int PrjPrefixKy { get; set; }
        public int PrjTypKy { get; set; }
        public string PrjTyp { get; set; }           
        public int PrjNo { get; set; }
        public string DocNo { get; set; }
        public string PrjNm { get; set; }
        public int ItmKy { get; set; }
        public string YurRef { get; set; }
        public string YurRefDt { get; set; }
        public long AccKy { get; set; }
        public long Adrky { get; set; }
        public string PrjDt { get; set; }
        public int PrjStsKy { get; set; }
        public string PrjStDt { get; set; }
        public string PlnStDt { get; set; }
        public string PlnFinDt { get; set; }
        public string ExpiryDt { get; set; }
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
        public string FinDt { get; set; }
        public int PrjSTypKy { get; set; }
        public int PrjCat1Ky { get; set; }
        public int PrjCat2Ky { get; set; }
        public int PrjCat3Ky { get; set; }
        public int PrjCat4Ky { get; set; }
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
        public string PermitDate { get; set; }
        public string DeedDate { get; set; }
        public int PrjCat5Ky { get; set; }
        public int PrjCat6Ky { get; set; }
        public int BnkKy { get; set; }
        public int BrnKy { get; set; }
        public float Distance { get; set; }
        public int DistanceUnitKy { get; set; }

        public string TrnMinDate { get; set; }
        public string TrnMaxDate { get; set; }

    }

    public class CdMas_LookupWebByConCd
    {
        public int CdKy { get; set; }
        public int GrpCdKy { get; set; }
        public string CdNm { get; set; }
        public string Code { get; set; }
        public string GrpConCd { get; set; }

    }

    public class Codes_SelectModel
    {
        public string CdNm { get; set; }
        public int CdKy { get; set; }
        public string CdMasCdTypKy { get; set; }
        public string Code { get; set; }
        public string ConCd { get; set; }

        public string ConCdGrid { get; set; }  
        public float Val { get; set; }
        public int RecKy { get; set; }
        public bool Checked { get; set; }
        public int LiNo { get; set; }
        public bool is1 { get; set; }
        public string Prefix { get; set; }

        public string GrpCdKy { get; set; }
        public int ControlConKy { get; set; }
    }

    public class BankEntry
    {

        public int ObjKy { get; set; }
        public string BnkCd { get; set; }
        public int isAct { get; set; }
        public int isApr { get; set; }
        public string DepSlipFmt { get; set; }
        public int BnkKy { get; set; }
        public string ChkPrnFmt { get; set; }
        public int OrgKy { get; set; }
        public string Prefix { get; set; }

    }

    public class BranchEntry
    {
        public int ObjKy { get; set; }
        public int BnkKy { get; set; }
        public string BrnCd { get; set; }
        public string BrnNm { get; set; }
        public int Sky { get; set; }
        public int OrgKy { get; set; }
        public int isAct { get; set; }
        public int isApr { get; set; }
        public string DepSlipFmt { get; set; }
        public string ChkPrnFmt { get; set; }

    }
    public class CdMasdiagramModel
    {
        public int CdKy { get; set; }
        public int PrntKy { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public List<CdMasdiagramModel> items { get; set; }

    }
}
