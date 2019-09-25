using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BlueLotus.ViewModel.Entity
{
    public class Currency
    {
        public int CdKy { get; set; }
        public string Code { get; set; }
        public string CurNM { get; set; }


    }

    public class AccountModel
    {
        public int AccKy { get; set; }
        public string AccCode { get; set; }
        public string AccNM { get; set; }


    }

    public class ProjectModel
    {
        public int PrjKy { get; set; }
        public string PrjCd { get; set; }
        public string PrjNm { get; set; }


    }

    public class BUModel
    {
        public int CdKy { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }


    }

    public class AddressModel
    {
        public int AdrKy { get; set; }
        public string AdrCode { get; set; }
        public string AdrNM { get; set; }


    }


    public class PrsDetModel
    {
        public int PrsDetKy { get; set; }
        public string PrsDetCode { get; set; }
        public string PrsDetNM { get; set; }


    }

    public class AnalysisModel
    {
        public int AnalysisKy { get; set; }
        public string AnlCode { get; set; }
        public string AnlNm { get; set; }


    }

    public class AccDetailModel
    {
        public int AccKy { get; set; }
        public int AdrKy { get; set; }
        public string AdrNm { get; set; }

        public string AdrID { get; set; }
        public string CurncyCd { get; set; }
        public int CurncyKy { get; set; }

        public string CurncyNm { get; set; }
        public string Rate { get; set; }


    }


    public class Save
    {
        public int AccKy { get; set; }
        public int AdrKy { get; set; }
        public string AdrNm { get; set; }

        public string AdrID { get; set; }
        public string CurncyCd { get; set; }
        public int CurncyKy { get; set; }

        public string CurncyNm { get; set; }
        public string Rate { get; set; }


    }

    public class JournalFindModel
    {

        public string LiNo { get; set; }
        public string TrnKy { get; set; }
        public string Prefix { get; set; }
        public string SttrnNo { get; set; }
        public object TrnDt { get; set; }
        public string docno { get; set; }
        public string AdrID { get; set; }
        public string AdrNm { get; set; }
        public string PrjID { get; set; }
        public string PrjNm { get; set; }
        public int PrjKy { get; set; }
        public int AccKy { get; set; }
        public int AdrKy { get; set; }








    }


    public class JournalDetailModel
    {
        public int AdrKy { get; set; }
        public string AdrNm { get; set; }
        public int AccKy { get; set; }
        public string AccNm { get; set; }
        public string AccCd { get; set; }
        public string PrjNm { get; set; }
        public string BUCode { get; set; }
        public string ExRate { get; set; }
        public int CurncyKy { get; set; }
        public string CurncyCd { get; set; }

        public long TrnKy { get; set; }
        public long TrnTypKy { get; set; }
        public long TrnPreFixKy { get; set; }
        public string TrnNo { get; set; }
        public object DocNo { get; set; }
        public string YurRef { get; set; }
        public object TrnDt { get; set; }
        public string Description { get; set; }
        public long TrnCrnKy { get; set; }
        public string TrnExRate { get; set; }

        public bool isRec { get; set; }
        public int BuKy { get; set; }
        public int PrjKy { get; set; }

        public long AccTrnKy { get; set; }
        public string Ammount { get; set; }
        public string Analysys1Ky { get; set; }
        public string Analysys2Ky { get; set; }
        public string Analysys3Ky { get; set; }
        public string Analysys4Ky { get; set; }
        public string Analysys5Ky { get; set; }
        public string Analysys6Ky { get; set; }
        public string Analysys1Id { get; set; }
        public string Analysys1Nm { get; set; }
        public string Analysys2Id { get; set; }
        public string Analysys2Nm { get; set; }

        public string Analysys3Id { get; set; }
        public string Analysys3Nm { get; set; }

        public string Analysys4Id { get; set; }
        public string Analysys4Nm { get; set; }

        public string Analysys5Id { get; set; }
        public string Analysys5Nm { get; set; }
        public string Analysys6Id { get; set; }
        public string Analysys6Nm { get; set; }
        public int TaskKy { get; set; }
        public string TaskId { get; set; }
        public string TaskNm { get; set; }
        public string Dt2 { get; set; }
        public int Lino { get; set; }
        public string TimeStamp { get; set; }

        public string BanckKy { get; set; }
        public string BranchKy { get; set; }
        public long OrgPmtDetky { get; set; }
        public string LCKy { get; set; }
        public string LoanKy { get; set; }
        public string OrderKy { get; set; }
        public string OrdrDetKy { get; set; }

        public string ResAdrKy { get; set; }
        public string ResAdrCode { get; set; }
        public string LoanNo { get; set; }
        public string LCNo { get; set; }
        public string OrderNo { get; set; }
        public string OrdrDetNo { get; set; }
        public int IsAct { get; set; }

    }


    //public class JournalModel
    //{
    //    public int CdKy { get; set; }
    //    public string CdNm { get; set; }
    //    public string Code { get; set; }
    //    public int PrjKy { get; set; }

    //    public int Prj2Ky { get; set; }

    //    public int PrcsDetKy { get; set; }
    //    public string PrjID { get; set; }
    //    public string PrjNm { get; set; }
    //    public string BU { get; set; }
    //    public int AccKy { get; set; }
    //    public int AdrKy { get; set; }
    //    public string AccCd { get; set; }
    //    public string AccNm { get; set; }

    //    public string AdrID { get; set; }
    //    public string AdrNm { get; set; }

    //    public int LiNo { get; set; }

    //    public string AccCode { get; set; }

    //    //
    //    public string AccName { get; set; }
    //    public string AccAdrName { get; set; }
    //    public string Description { get; set; }
    //    public string AccCur { get; set; }
    //    public string ExRate { get; set; }
    //    public string DrAmt { get; set; }
    //    public string CrAmt { get; set; }

    //    public string Project { get; set; }

    //    public string ProjectNm { get; set; }
    //    public string TaskId { get; set; }
    //    public string TaskNm { get; set; }


    //    public string Analysys1 { get; set; }
    //    public string Analysys2 { get; set; }
    //    public string Analysys3 { get; set; }
    //    public string Analysys4 { get; set; }
    //    public string Analysys5 { get; set; }
    //    public string Analysys6 { get; set; }
    //    public string Dt2 { get; set; }
    //    public string Issue { get; set; }

    //    public string PrcsID { get; set; }

    //    public string PrcsNM { get; set; }
    //    public int ItmKy { get; set; }
    //    public string ItmNm { get; set; }

    //    public string CurncyCd { get; set; }
    //    public int CurncyKy { get; set; }
    //    public string CurncyNm { get; set; }
    //    public int AccCurKy { get; set; }

    //    public string Rate { get; set; }

    //    public object TrnDt { get; set; }

    //    public string DocNo { get; set; }

    //    public string AdrId { get; set; }
    //    public string Prefix { get; set; }

    //    public int TrnKy { get; set; }
    //    public int TrnNo { get; set; }
    //    public int TrnTypKy { get; set; }

    //    public string YurRef { get; set; }

    //    public int TrnCrnKy { get; set; }

    //    public string TrnExRate { get; set; }

    //    public string Ammount { get; set; }
    //    public string Id { get; set; }
    //    public int AccAdrKy { get; set; }
    //    public int BuKy { get; set; }

    //    public int TaskKy { get; set; }
    //    public int ProjectKy { get; set; }
    //    public int Analysys2Ky { get; set; }

    //    public long AccTrnKy { get; set; }

    //    public int TrnPreFixKy { get; set; }

    //    public string SttrnNo { get; set; }

    //    public bool isRec { get; set; }
    //}
    public class JournalSave
    {

        public string LiNo { get; set; }

        public string AccKy { get; set; }
        public string AccAdrKy { get; set; }

        public string Description { get; set; }

        public string AccCurKy { get; set; }

        public string ExRate { get; set; }
        public string DrAmtGrd { get; set; }

        public string CrAmtGrd { get; set; }

        public string BuKy { get; set; }

        public string TaskKy { get; set; }
        public string ProjectKy { get; set; }

        public string Analysys2Ky { get; set; }

        public string Dt2 { get; set; }

        public string AccTrnKy { get; set; }


        public string LCKy { get; set; }
        public string LoanKy { get; set; }
        public string OrderDetKy { get; set; }
        public string OrderNoKy { get; set; }
        public string ResAdrKy { get; set; }
        public string Analysys1Ky { get; set; }
        public string Analysys3Ky { get; set; }
        public string Analysys4Ky { get; set; }
        public string Analysys5Ky { get; set; }
        public string Analysys6Ky { get; set; }
        public int IsAct { get; set; }

    }
}