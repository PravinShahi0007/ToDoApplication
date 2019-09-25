using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BlueLotus.ShowroomLog.Model.Entity
{
    public class ShowroomLogModel
    {

        public string AdrKy { get; set; }
        public string LogDate { get; set; }
        public string LogTime { get; set; }
        public string Fname { get; set; }
        public string Lname { get; set; }
        public string Initials { get; set; }
        public string PerEmail { get; set; }
        public string BusEmail { get; set; }
        public string PerTP { get; set; }
        public string BusTP { get; set; }
        public string LeadTypKy { get; set; }
        public string CrnttVhl { get; set; }
        public string CrnttVhlClr { get; set; }
        public string CrnttVhlReg { get; set; }
        public string cusStatus { get; set; }
        public string SalesPersonKy { get; set; }
        public string Reson { get; set; }
        public string VhlIntMdlKy { get; set; }
        public string VhlIntSeriesKy { get; set; }
        public string ActionKy { get; set; }
        public string CustStatusKy { get; set; }
        public string Comment { get; set; }
        public string NxtShdDate { get; set; }
        public string FlwUPActionKy { get; set; }
        public bool Result { get; set; }
        public UInt32 LogDetKy { get; set; }

        public bool IsDemoDriveLog { get; set; }
        public bool IsFeedBack { get; set; }
        public bool IsGatePass { get; set; }
    }

    public class ShowroomLogFindModel
    {
        public UInt32 LogDetKy { get; set; }

        public string Fname { get; set; }

        public string Lname { get; set; }
        public string Initials { get; set; }
        public string LogNo { get; set; }
        public string PersnalNumber { get; set; }

        public string OffcialNumber { get; set; }
        public string Reson { get; set; }

        public string FormName { get; set; }


    }

    public class DemoDrivingModel
    {
        public UInt32 adrKy { get; set; }

        public string Fname { get; set; }

        public string Lname { get; set; }
        public string Initials { get; set; }
        public string LogNo { get; set; }
        public string PersnalNumber { get; set; }

        public string OffcialNumber { get; set; }
        public string drivingDate { get; set; }

        public string intVehical { get; set; }
        public string slsPrsnKy { get; set; }
        public string comments { get; set; }
        public string nxtShdueDate { get; set; }

        public string flwUpAction { get; set; }
        public string demoLogYes { get; set; }
        public string feedbackYes { get; set; }
        public string gatePassYes { get; set; }
        public bool Result { get; set; }
        public bool IsDemoDriveLog { get; set; }
        public bool IsFeedBack { get; set; }
        public bool IsGatePass { get; set; }

    }

    public class SMLSaveModel
    {
        public bool Result { get; set; }
        public UInt32 LogDetKy { get; set; }


    }

    public class ProspectCallModel
    {
        public string LogDetKy { get; set; }
        public string AdrKy { get; set; }
        public string LogDate { get; set; }
        public string Fname { get; set; }
        public string Lname { get; set; }
        public string Initials { get; set; }
        public string PerEmail { get; set; }
        public string BusEmail { get; set; }
        public string PerTP { get; set; }
        public string BusTP { get; set; }
        public string Address { get; set; }
        public bool cusStatus { get; set; }
        public string CurrentVehical { get; set; }
        public string PlanDate { get; set; }
        public string ActionKy { get; set; }

        public string Summery { get; set; }
        public string NxtFlwKy { get; set; }
        public string Description { get; set; }
        public string NxtActDate { get; set; }


    }


    public class SMLQuatationModel
    {
        public UInt32 LogDetKy { get; set; }

        public string Fname { get; set; }

        public string Lname { get; set; }
        public string Initials { get; set; }
        public UInt32 PartKy { get; set; }
        public string LiNo { get; set; }

        public string PartCode { get; set; }
        public string PartName { get; set; }
        public string SubCategoryKy { get; set; }


        public string SubCategory { get; set; }
        public decimal Price { get; set; }

        public bool Select { get; set; }


    }

    public class SMLQuatationPriSetModel
    {
        public UInt32 LogDetKy { get; set; }

        public decimal Value { get; set; }

        public long? CdMasCdDtKy { get; set; }

        public long CdKy { get; set; }

        public string CdNm { get; set; }

        public long LiNo { get; set; }


        public long controlConKy { get; set; }
    }

    public class ExRateModel
    {
        public int CurKy { get; set; }

        public decimal Value { get; set; }

        public string Name { get; set; }
    }

    public class PrisetFndMode
    {
        public uint Lino { get; set; }
        public uint GrpCdKy { get; set; }
        public string Code { get; set; }

        public string CdNm { get; set; }

        public string EftvDt { get; set; }
    }

    public class SMLQuatationHdrModel
    {
        public long OrdHdrKy { get; set; }

        public long OrdNo { get; set; }
        public string DocNo { get; set; }
        public string Amount { get; set; }
        public UInt32 Lino { get; set; }

        public string QutDate { get; set; }

        public UInt32 MdlKy { get; set; }
        public UInt32 ClrKy { get; set; }
        public decimal ExRate { get; set; }
        public UInt32 AdrKy { get; set; }

        public string AdrNm { get; set; }
        public string AdrId { get; set; }
        public UInt32 RepAdrKy { get; set; }

    }
}
