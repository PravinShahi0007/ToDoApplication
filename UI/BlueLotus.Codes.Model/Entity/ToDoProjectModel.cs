using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BlueLotus.Codes.Model.Entity
{
    public class ToDoProjectModel
    {
    }
    public class ProjectsHeaderModel
    {
        public bool isSysRec { get; set; }
        public string Alias { get; set; }
        private int serNoKy;
        public string Status { get; set; }
        public string NiceClass { get; set; }
        public int SerNoKy
        {
            get { return serNoKy; }
            set
            {
                if (value == null || value == 0) serNoKy = 1;
                else serNoKy = value;
            }
        }

        public string MeterReading { get; set; }
        public string ItmCd { get; set; }
        public string SerNo { get; set; }
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
        public string YurRefDt { get; set; }
        public long AccKy { get; set; }
        public string AccNm { get; set; }
        public long Adrky { get; set; }
        public string AdrNm { get; set; }
        public string PrjDt { get; set; }
        public int PrjStsKy { get; set; }
        public string PrjStsCd { get; set; }
        public string PrjStsNm { get; set; }
        public bool isAct { get; set; }
        public bool isApr { get; set; }
        public int AcsLvlKy { get; set; }
        public int ConFinLvlKy { get; set; }
        public bool isPrnt { get; set; }
        public bool isAlwTrn { get; set; }

        public string accLvlNm { get; set; }
        public string conLvlNm { get; set; }

        //  public byte[] TmStmp { get; set; }
        public string TmStmp { get; set; }

        public string TimeStamp { get; set; }
        public string PrjStDt { get; set; }
        public string PlnStDt { get; set; }
        public string PlnFinDt { get; set; }
        public string ExpiryDt { get; set; }
        public long RepAdrKy { get; set; }
        public string RepAdrNm { get; set; }
        public int BUKy { get; set; }
        public string BUNm { get; set; }
        public string BUCd { get; set; }
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
        public int PrjCat5Ky { get; set; }
        public int PrjCat6Ky { get; set; }

        public string PrjCat1Nm { get; set; }
        public string PrjCat2Nm { get; set; }
        public string PrjCat3Nm { get; set; }
        public string PrjCat4Nm { get; set; }
        public string PrjCat5Nm { get; set; }
        public string PrjCat6Nm { get; set; }

        public long PrntKy { get; set; }
        public string PrntCd { get; set; }
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
        public string PermitDate { get; set; }
        public string DeedDate { get; set; }
        public int BnkKy { get; set; }
        public int BrnKy { get; set; }
        public float Distance { get; set; }
        public int DistanceUnitKy { get; set; }
        public int YurRepAdrKy { get; set; }
        public string YurRepAdrNm { get; set; }
        public int WIPLocKy { get; set; }
        public string WIPLocCd { get; set; }
        public int PriCtrlLocKy { get; set; }
        public string PriCtrlLocCd { get; set; }
        public int SiteStrLocKy { get; set; }
        public string SiteStrLocCd { get; set; }
        public int CalTypKy { get; set; }
        public int ToChainage { get; set; }
        public int StChainage { get; set; }

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

    public class GetAdrNmProjectModel
    {
        public int AdrKy { get; set; }
        public string AdrNm { get; set; }
        public string AdrID { get; set; }
    }

    public class ProjectsFollowUp
    {
        public int PrjCdKy { get; set; }
        public int CdKy { get; set; }
        public int PrjKy { get; set; }
        public int AdrKy { get; set; }
        public int ItmKy { get; set; }
        public int ControlConKy { get; set; }
        public int IsAct { get; set; }
        public string Code { get; set; }
        public string CdNm { get; set; }
        public double Amt { get; set; }
        public string ActDt { get; set; }
        public string Des { get; set; }
        public string RefNo { get; set; }
    }

    public class PrjIdCheck
    {
        public string PrjId { get; set; }
    }
    public class PrjCdModel
    {
        public int PrjCdKy { get; set; }
        public int CdKy { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public bool StatusSelected { get; set; }
       

    }


    public class PrjHdrAprModel
    {
        public int PrjHdrAprKy { get; set; }
        public int PrjKy { get; set; }
        public int AprStsKy { get; set; }
        public string AprDtm { get; set; }
        public string NxActtDt { get; set; }

        public string CdNm { get; set; }

    }
}
