using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BlueLotus.Gantt.ViewModel.Entity
{
    class Gantt
    {
    }

    public class ReportPPrntObjCd_Select
    {
        public int ObjKy { get; set; }
        public string ObjNm { get; set; }
        public string ObjCaptn { get; set; }
        public string ObjCd { get; set; }
    }

    public class PrjTaskModel
    {
        public int PrcsDetKy { get; set; }
        public int Lino { get; set; }
        public string PrcsID { get; set; }
        public string PrcsNm { get; set; }
        public string Unit { get; set; }
        public int UnitKy { get; set; }
        public Double Qty { get; set; }
    }

    public class PrjModel
    {
        public int PrjKy { get; set; }
        public int PrcsSchKy { get; set; }
        public int IsShowBaseLine { get; set; }
        public int ObjKy { get; set; }
        public string FrmDt { get; set; }
        public string ToDt { get; set; }
        public int FrmRow { get; set; }
        public int ToRow { get; set; }

        public string TaskId { get; set; }
        public string TaskFilter { get; set; }
        public int isCrtclTask { get; set; }
        public int IsShowPreviousNonComplted { get; set; }
    }

    public class ResourceDetails_Select
    {
        public int PrjKy { get; set; }
        public string ResourceID { get; set; }
        public string ResourceName { get; set; }
        public double SumQty { get; set; }
        public string Unit { get; set; }
        public double SumRate { get; set; }
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

    public class PrjSchHdr_Update
    {
        public int PrcsSchKy { get; set; }
        public string DocNo { get; set; }
        public string SchDt { get; set; }
        public string SchToDt { get; set; }
        public int CalTypKy { get; set; }
        public int isDefault { get; set; }
    }

    public class PrjSch_Insert
    {
        public int OrgPrcsSchKy { get; set; }
        public int PrjKy { get; set; }
        public string SchDt { get; set; }
        public string SchToDt { get; set; }
        public int PrjChartTypKy { get; set; }
        public int CalTypKy { get; set; }
        public int isDefault { get; set; }
        public string DocNo { get; set; }
    }

    public class TaskData
    {
        public int ID { get; set; }
        public double TrnQty { get; set; }
        public int TrnUnitKy { get; set; }
        public double Qty { get; set; }
        public int PrjKy { get; set; }
        public float Lino { get; set; }
        public int WrkHrs { get; set; }
        public int PlnWrkHrs { get; set; }
        public int WrkDays { get; set; }
        public int PrcsSchDetKy { get; set; }
        public int PrcsDetKy { get; set; }
        public int PrcsSchKy { get; set; }
        public int Original_PrcsSchDetKy { get; set; }
        public string PrcsID { get; set; }
        public string PrcsNm { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string StartTime { get; set; }
        public string PlannedStartTime { get; set; }
        public string PlannedEndTime { get; set; }
        public string ToDt { get; set; }
        public string Effort { get; set; }
        public double ProgressPercent { get; set; }
        public int IndentLevel { get; set; }
        public string PredecessorIndices { get; set; }
        public string EndTime { get; set; }
        public Double DlyPrgrsPer { get; set; }
        public int MasPlnSchDetKy { get; set; }
        public string TrnUnit { get; set; }
        public Double Rate { get; set; }
        public Double RateWMrkUp { get; set; }
    }

    public class MSImportStringData
    {
        /*
            "UID":"0",
            "IsNull":"0",
            "CreateDate":"2006-10-27T20:10:00",
            "OutlineNumber":"0",
            "OutlineLevel":"0",
            "Priority":"500",
            "Duration":"PT426H0M0S",
            "DurationFormat":"21",
            "Work":"PT0H0M0S",
            "ResumeValid":"0",
            "EffortDriven":"0",
            "Recurring":"0",
            "OverAllocated":"0",
            "Estimated":"0",
            "Milestone":"0",
            "Summary":"1",
            "Critical":"1",
            "IsSubproject":"0",
            "IsSubprojectReadOnly":"0",
            "ExternalTask":"0",
            "EarlyStart":"2014-11-10T08:00:00",
            "EarlyFinish":"2014-12-31T17:00:00",
            "LateStart":"2014-11-15T15:00:00",
            "LateFinish":"2014-12-31T17:00:00",
            "StartVariance":"0",
            "FinishVariance":"0",
            "WorkVariance":"0",
            "FreeSlack":"0",
            "TotalSlack":"0",
            "FixedCost":"0",
            "FixedCostAccrual":"3",
            "PercentComplete":"0",
            "PercentWorkComplete":"0",
            "Cost":"0",
            "OvertimeCost":"0",
            "OvertimeWork":"PT0H0M0S",
            "ActualDuration":"PT0H0M0S",
            "ActualCost":"0",
            "ActualOvertimeCost":"0",
            "ActualWork":"PT0H0M0S",
            "ActualOvertimeWork":"PT0H0M0S",
            "RegularWork":"PT0H0M0S",
            "RemainingDuration":"PT426H0M0S",
            "RemainingCost":"0",
            "RemainingWork":"PT0H0M0S",
            "RemainingOvertimeCost":"0",
            "RemainingOvertimeWork":"PT0H0M0S",
            "ACWP":"0","CV":"0",
            "ConstraintType":"0",
            "CalendarUID":"-1",
            "LevelAssignments":"1",
            "LevelingCanSplit":"1",
            "LevelingDelay":"0",
            "LevelingDelayFormat":"8",
            "PreLeveledStart":"1984-01-01T00:00:00",
            "PreLeveledFinish":"1984-01-01T00:00:00",
            "IgnoreResourceCalendar":"0",
            "HideBar":"0",
            "Rollup":"0",
            "BCWS":"0",
            "BCWP":"0",
            "PhysicalPercentComplete":"0",
            "EarnedValueMethod":"0",
            "IsPublished":"1",
            "CommitmentType":"0"
         */
        public int ID { get; set; }
        public string Name { get; set; }
        public int Type { get; set; }
        public int OutlineLevel { get; set; }
        public string Start { get; set; }
        public string Finish { get; set; }
        public String WBS { get; set; }

        //public double TrnQty { get; set; }
        //public int TrnUnitKy { get; set; }
        //public double Qty { get; set; }
        //public int PrjKy { get; set; }
        //public float Lino { get; set; }
        //public int WrkHrs { get; set; }
        //public int PlnWrkHrs { get; set; }
        //public int WrkDays { get; set; }
        //public int PrcsSchDetKy { get; set; }
        //public int PrcsDetKy { get; set; }
        //public int PrcsSchKy { get; set; }
        //public int Original_PrcsSchDetKy { get; set; }
        //public string PrcsID { get; set; }
        //public string PrcsNm { get; set; }
        //public string Description { get; set; }
        //public string PlannedEndTime { get; set; }
        //public string ToDt { get; set; }
        //public string Effort { get; set; }
        //public double ProgressPercent { get; set; }
        //public int IndentLevel { get; set; }
        //public string PredecessorIndices { get; set; }
        //public string EndTime { get; set; }
        //public Double DlyPrgrsPer { get; set; }
        //public int MasPlnSchDetKy { get; set; }
        //public string TrnUnit { get; set; }
        //public Double Rate { get; set; }
        //public Double RateWMrkUp { get; set; }

    }

    public class SelectProjectScheduleDetails
    {

        //PrcsSchDetKy	PrcsDetKy	PrcsSchKy	StDt	ToDt	WrkHrs	IndentLvl	PlnWrkHrs	Predecessors
        //    DlyPrgrsPer	BilPer	AprBilPer	isMileStone	WrkDays	Lino	PrjKy	PrcsID	PrcsNm	TrnQty	TrnUnitKy	ConvRate

        public int PrcsSchDetKy { get; set; }
        public int PrcsDetKy { get; set; }
        public int PrcsSchKy { get; set; }
        public int ItmKy { get; set; }
        public int MasPlnSchDetKy { get; set; }

        public int ID { get; set; }
        public string StartTime { get; set; }
        public string EndTime { get; set; }
        public string PlannedStartTime { get; set; }
        public string PlannedEndTime { get; set; }
        public Double ProgressPercent { get; set; }
        public string PredecessorIndices { get; set; }
        public string Name { get; set; }
        public Double Qty { get; set; }
        public Double DlyPrgrsQtyThisSch { get; set; }
        public Double TTLDlyPrgrsQty { get; set; }
        public string Description { get; set; }
        public string StDt { get; set; }
        public string ToDt { get; set; }
        public int WrkHrs { get; set; }
        public int IndentLevel { get; set; }
        public int PlnWrkHrs { get; set; }
        public string Predecessors { get; set; }
        public Double BilPer { get; set; }
        public int isMileStone { get; set; }
        public int WrkDays { get; set; }
        public int Lino { get; set; }
        public int PrjKy { get; set; }
        public string PrcsID { get; set; }
        public string PrcsNm { get; set; }
        public string ItmNm { get; set; }
        public string Unit { get; set; }
        public string ItmCd { get; set; }
        public string Des { get; set; }
        public Double TrnQty { get; set; }
        public int TrnUnitKy { get; set; }
        public int ConvRate { get; set; }
        public int IndentLvl { get; set; }
        public string BaseStDt { get; set; }
        public string BaseToDt { get; set; }
        public string BilPerEndDt { get; set; }
        public Double DlyPrgrsPer { get; set; }
        public string BilPerStDt { get; set; }
        public string ResourceName { get; set; }
        public string ResourceID { get; set; }
        public string Resources { get; set; }
        public int isHold { get; set; }
        public int TTLRow { get; set; }
        public string TrnUnit { get; set; }
        public Double Rate { get; set; }
        public Double RateWMrkUp { get; set; }
    }

    public class CalDate
    {
        public string CalDt { get; set; }
        public string MM { get; set; }
        public string YY { get; set; }
        public string DD { get; set; }
    }

    public class ProjectSchedule_find
    {
        public int PrcsSchKy { get; set; }
        public int PrjKy { get; set; }
        public string PrjID { get; set; }
        public string PrjNm { get; set; }
        public string AdrID { get; set; }
        public string AdrNm { get; set; }
        public string VerNo { get; set; }
        public int isDefault { get; set; }
        public string SchDt { get; set; }
        public string SchToDt { get; set; }
        public int SchNo { get; set; }
        public int CalTypKy { get; set; }
        public int PreFixKy { get; set; }
        public int OthTrnTypKy { get; set; }
        public string PrjChartTyp { get; set; }
        public string CalCode { get; set; }
        public string CalName { get; set; }
    }

    public class ProjectsHeader_InsertWeb
    {
        public string DocNo { get; set; }
        public int PrjNo { get; set; }
        public string PrjNm { get; set; }
        public int PrjTypKy { get; set; }
    }

    public class PrjMasPln_Select
    {
        public int PrcsSchDetKy { get; set; }
        public string TaskID { get; set; }
        public string TaskNm { get; set; }
        public string StDt { get; set; }
        public string ToDt { get; set; }
        public int IsLinked { get; set; }
    }

    public class Projects_Lookup
    {
        public int PrjKy { get; set; }
        public string PrjID { get; set; }
        public string PrjNm { get; set; }
        public string PrjTypCd { get; set; }
        public string PrjNo { get; set; }
    }

    public class BOQ_Lookup
    {
        public int BOQKy { get; set; }
        public string BOQNo { get; set; }
        public string DocNo { get; set; }
        public string BOQTitle { get; set; }
    }


    public class ProjectModelForGantt
    {
        public Int64 PrjKy { get; set; }
        public string DocNo { get; set; }
        public string PrjNm { get; set; }
        public string Code { get; set; }
        public int ID { get; set; }
    }

    public class CdMasForGantt
    {
        public int CdKy { get; set; }
        public string Code { get; set; }
        public string CdNm { get; set; }
        public short CKy { get; set; }
        public string ConCd { get; set; }
    }

    public class ProjectScheduleDetail_TaskIDValidation
    {
        public int PrcsDetKy { get; set; }
        public int PrjKy { get; set; }
        public string TaskID { get; set; }
        public string TaskNm { get; set; }
        public string VersionNo { get; set; }
        public string SchNo { get; set; }
    }
}
