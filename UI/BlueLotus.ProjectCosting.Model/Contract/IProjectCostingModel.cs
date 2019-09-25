using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BlueLotus.ProjectCosting.Model.Contract
{
    public interface IProjectCostingModel
    {
        
    }

    public class TskModel
    {
        string PrcsID { get; set; }
        string PrcsNM { get; set; }
        int PrcsDetKy { get; set; }



    }

    public class ComboDataModel
    {
        string CdNm { get; set; }
        string Code { get; set; }
        int CdKy { get; set; }



    }



    public class AccountModel
    {

        string AccNm { get; set; }

        int AccKy { get; set; }


        string AccCd { get; set; }
    }



    public class AddrsModel
    {

        string AdrNm { get; set; }

        int AdrKy { get; set; }

    }

    public class ItmModel
    {

        string ItmNm { get; set; }

        int ItmKy { get; set; }


    }
    public class OrdNoModel
    {

        string OrdNo { get; set; }

        int OrdValue { get; set; }


    }



    public class GetPrjModel
    {
        int PrjKy { get; set; }
        string PrjNm { get; set; }
        string PrjID { get; set; }
    }
    public class AccAnlModel
    {

        object TrnDt { get; set; }
        string TrnTyp { get; set; }
        string YurRef { get; set; }
        string AccCd { get; set; }
        string AccNm { get; set; }
        int Amt { get; set; }

        string BUCd { get; set; }
        int TrnAmt { get; set; }
        int TrnExRate { get; set; }
        string TrnCrnCd { get; set; }
        string PrjNm { get; set; }

        string AdrNm { get; set; }
        string Des { get; set; }
        string Prefix { get; set; }
        string TrnNo { get; set; }
        string DocNo { get; set; }

        int DrAmt { get; set; }
        int CrAmt { get; set; }
        string AccTyp { get; set; }
        string Year { get; set; }
        object Dt2 { get; set; }
        object AprDt { get; set; }

        string EntUsr { get; set; }
        string AprUsr { get; set; }
        string ChqNo { get; set; }
        string ChqBrnCd { get; set; }
        string PmtMode { get; set; }









    }

    public class ItmTrnAnlModel
    {

        object TrnDt { get; set; }
        string TrnTyp { get; set; }

        string TrnNo { get; set; }
        string DocNo { get; set; }
        string YurRef { get; set; }
        string PrjNm { get; set; }
        string TrnExRate { get; set; }
        string TrnCrnCd { get; set; }
        string AdrNm { get; set; }
        string LocNm { get; set; }
        string BUNm { get; set; }
        string Issues { get; set; }
        string Qty { get; set; }
        string Unit { get; set; }
        int DisAmt { get; set; }
        string Anl1Cd { get; set; }
        string Anl2Cd { get; set; }
        string ItmTypcd { get; set; }
        string ItmCat1 { get; set; }
        string ItmCat2 { get; set; }
        int TrnAmt { get; set; }
        string PartNo { get; set; }
        string DetailDescription { get; set; }
        string HdrDescription { get; set; }
        int NetAmt { get; set; }
        string EndUsr { get; set; }
        string AprUsrId { get; set; }
        object EntDt { get; set; }
        string AdrCat1 { get; set; }
        string AdrCat2 { get; set; }


    }


    public class OrdItmAnlModel
    {

        string ItmCd { get; set; }
        string ItmNm { get; set; }


        string DocNo { get; set; }
        string YurRef { get; set; }
        string PrjNm { get; set; }
        string TrnExRate { get; set; }
        string TrnCrnCd { get; set; }
        string AdrNm { get; set; }
        string LocNm { get; set; }
        string BUNm { get; set; }
        string Issues { get; set; }
        string Qty { get; set; }
        string Unit { get; set; }
        int DisAmt { get; set; }

        int NetAmt { get; set; }


        string AdrCat1 { get; set; }
        string AdrCat2 { get; set; }

        object OrdDt { get; set; }
        string Des { get; set; }
        string Receipts { get; set; }
        string TrnRate { get; set; }
        string DisPer { get; set; }
        string OrdTyp { get; set; }
        string PrjID { get; set; }
        string OrdNo { get; set; }
        string PreFix { get; set; }
        string AccNm { get; set; }
        string RecurDlvNo { get; set; }

        string OrdCat1 { get; set; }
        string OrdCat2 { get; set; }
        string PmtTrm { get; set; }
        int Amt { get; set; }
        string VAT { get; set; }



    }

    public class ReportModel
    {

        string ObjNm { get; set; }

        int ObjKy { get; set; }


    }

    public class GetAllTrnTypModel
    {
        string CdNm { get; set; }
        string Code { get; set; }
        int CdKy { get; set; }



    }

    public class DlvryNoModel
    {

        string Code { get; set; }

        int CdKy { get; set; }


    }

}
