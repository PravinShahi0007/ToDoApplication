using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BlueLotus.Codes.Model.Contract
{
    public interface IToDoProjectModel
    {
    }

    public interface ProjectsHeaderModel
    {
        bool isSysRec { get; set; }
        string Alias { get; set; }
        int SerNoKy { get; set; }
        string MeterReading { get; set; }
        string ItmCd { get; set; }
        string SerNo { get; set; }
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
        string AdrNm { get; set; }
        Nullable<System.DateTime> PrjDt { get; set; }
        int PrjStsKy { get; set; }
        string PrjStsCd { get; set; }
        string PrjStsNm { get; set; }
        byte isAct { get; set; }
        byte isApr { get; set; }
        int AcsLvlKy { get; set; }
        int ConFinLvlKy { get; set; }
        bool isPrnt { get; set; }
        bool isAlwTrn { get; set; }
        string accLvlNm { get; set; }
        string conLvlNm { get; set; }

        byte[] TmStmp { get; set; }
        string TimeStamp { get; set; }
        Nullable<System.DateTime> PrjStDt { get; set; }
        Nullable<System.DateTime> PlnStDt { get; set; }
        Nullable<System.DateTime> PlnFinDt { get; set; }
        Nullable<System.DateTime> ExpiryDt { get; set; }
        long RepAdrKy { get; set; }
        string RepAdrNm { get; set; }
        int BUKy { get; set; }
        string BUNm { get; set; }
        string BUCd { get; set; }
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
        int YurRepAdrKy { get; set; }
        string YurRepAdrNm { get; set; }
        int CalTypKy { get; set; }
        int ToChainage { get; set; }
        int StChainage { get; set; }

       
    }

    public interface GetAdrNmProjectModel
    {
        int AdrKy { get; set; }
        string AdrNm { get; set; }
        string AdrID { get; set; }
    }

    public class ProjectsFollowUp
    {
        int PrjCdKy { get; set; }
        int CdKy { get; set; }
        int PrjKy { get; set; }
        int ControlConKy { get; set; }
        int IsAct { get; set; }
        string Code { get; set; }
        string CdNm { get; set; }
        double No { get; set; }
        string ActDt { get; set; }
        string Des { get; set; }
        string RefNo { get; set; }
    }

}
