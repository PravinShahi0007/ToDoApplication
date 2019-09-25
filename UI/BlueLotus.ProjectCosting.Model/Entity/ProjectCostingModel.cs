using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BlueLotus.ProjectCosting.Model.Entity
{
    public class ProjectCostingModel
    {

    }

    public class TskModel
    {
        public string PrcsID { get; set; }
        public string PrcsNM { get; set; }
        public int PrcsDetKy { get; set; }



    }

    public class ComboDataModel
    {
        public string CdNm { get; set; }
        public string Code { get; set; }
        public int CdKy { get; set; }



    }
             
    public class AccountModel
    {

        public string AccNm { get; set; }

        public int AccKy { get; set; }


        public string AccCd { get; set; }
    }
                   
    public class AddrsModel
    {

        public string AdrNm { get; set; }

        public int AdrKy { get; set; }

    }

    public class ItmModel
    {

        public string ItmNm { get; set; }

        public int ItmKy { get; set; }


    }

    public class OrdNoModel
    {

        public string OrdNo { get; set; }

        public int OrdValue { get; set; }


    }  

    public class GetPrjModel
    {
        public int PrjKy { get; set; }
        public string PrjNm { get; set; }
        public string PrjID { get; set; }
    }

    public class AccAnlModel
    {

        public object TrnDt { get; set; }
        public string TrnTyp { get; set; }
        public string YurRef { get; set; }
        public string AccCd { get; set; }
        public string AccNm { get; set; }
        public int Amt { get; set; }

        public string BUCd { get; set; }
        public int TrnAmt { get; set; }
        public int TrnExRate { get; set; }
        public string TrnCrnCd { get; set; }
        public string PrjNm { get; set; }

        public string AdrNm { get; set; }
        public string Des { get; set; }
        public string Prefix { get; set; }
        public string TrnNo { get; set; }
        public string DocNo { get; set; }

        public int DrAmt { get; set; }
        public int CrAmt { get; set; }
        public string AccTyp { get; set; }
        public string Year { get; set; }
        public object Dt2 { get; set; }
        public object AprDt { get; set; }

        public string EntUsr { get; set; }
        public string AprUsr { get; set; }
        public string ChqNo { get; set; }
        public string ChqBrnCd { get; set; }
        public string PmtMode { get; set; }









    }

    public class ItmTrnAnlModel
    {

        public object TrnDt { get; set; }
        public string TrnTyp { get; set; }

        public string TrnNo { get; set; }
        public string DocNo { get; set; }
        public string YurRef { get; set; }
        public string PrjNm { get; set; }
        public string TrnExRate { get; set; }
        public string TrnCrnCd { get; set; }
        public string AdrNm { get; set; }
        public string LocNm { get; set; }
        public string BUNm { get; set; }
        public string Issues { get; set; }
        public string Qty { get; set; }
        public string Unit { get; set; }
        public int DisAmt { get; set; }
        public string Anl1Cd { get; set; }
        public string Anl2Cd { get; set; }
        public string ItmTypcd { get; set; }
        public string ItmCat1 { get; set; }
        public string ItmCat2 { get; set; }
        public int TrnAmt { get; set; }
        public string PartNo { get; set; }
        public string DetailDescription { get; set; }
        public string HdrDescription { get; set; }
        public int NetAmt { get; set; }
        public string EndUsr { get; set; }
        public string AprUsrId { get; set; }
        public object EntDt { get; set; }
        public string AdrCat1 { get; set; }
        public string AdrCat2 { get; set; }


    }


    public class OrdItmAnlModel
    {

        public string ItmCd { get; set; }
        public string ItmNm { get; set; }


        public string DocNo { get; set; }
        public string YurRef { get; set; }
        public string PrjNm { get; set; }
        public string TrnExRate { get; set; }
        public string TrnCrnCd { get; set; }
        public string AdrNm { get; set; }
        public string LocNm { get; set; }
        public string BUNm { get; set; }
        public string Issues { get; set; }
        public string Qty { get; set; }
        public string Unit { get; set; }
        public int DisAmt { get; set; }

        public int NetAmt { get; set; }


        public string AdrCat1 { get; set; }
        public string AdrCat2 { get; set; }

        public object OrdDt { get; set; }
        public string Des { get; set; }
        public string Receipts { get; set; }
        public string TrnRate { get; set; }
        public string DisPer { get; set; }
        public string OrdTyp { get; set; }
        public string PrjID { get; set; }
        public string OrdNo { get; set; }
        public string PreFix { get; set; }
        public string AccNm { get; set; }
        public string RecurDlvNo { get; set; }

        public string OrdCat1 { get; set; }
        public string OrdCat2 { get; set; }
        public string PmtTrm { get; set; }
        public int Amt { get; set; }
        public string VAT { get; set; }



    }

    public class ReportModel
    {

        public string ObjNm { get; set; }

        public int ObjKy { get; set; }


    }

    public class GetAllTrnTypModel
    {
        public string CdNm { get; set; }
        public string Code { get; set; }
        public int CdKy { get; set; }



    }

    public class DlvryNoModel
    {

        public string Code { get; set; }

        public int CdKy { get; set; }


    }


}
