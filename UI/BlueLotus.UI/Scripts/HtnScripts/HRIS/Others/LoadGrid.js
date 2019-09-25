function LoadAnnualPerformanceGrid() {
    var dataSource = new kendo.data.DataSource({
        batch: true,
        pageSize: 10,
        schema: {
            model: {
                id: "",
                fields:
                {
                    AnnualPerYear: { editable: true, nullable: false, type: "string" },
                    AnnualPerMonth: { editable: true, nullable: false, type: "string" },
                    AnnualPerMonthKy: { editable: true, nullable: false, type: "number" },
                    AnnualPerReviewSent: { editable: true, nullable: false, type: "string" },
                    AnnualPerReviewReceived: { editable: true, nullable: false, type: "string" },
                    AnnualPerOverallGrade: { editable: true, nullable: false, type: "string" },
                    AnnualPerReviewPerson: { editable: true, nullable: false, type: "string" },
                    AnnualPerFilePath: { editable: true, nullable: false, type: "string" }
                }
            }
        },
    });
    $("#AnnualPerformanceGrid").kendoGrid({
        dataSource: dataSource,
        sortable: true,
        autobind: true,
        navigatable: true,
        scrollable: true,
        pageSize: 10,
        pageable: true,
        selectable: "row",
        resizable: true,
        pageable: { refresh: true, pageSizes: [5, 10, 20, 50, 100] },

        columns: [
            {
                field: "AnnualPerYear",
                title: "Year",
                width: "100px",
            },
            {
                field: "AnnualPerMonth",
                title: "Month",
                width: "100px",
            },
            {
                field: "AnnualPerMonthKy",
                title: "AnnualPerMonthKy",
                hidden:true
            },
            {
                field: "AnnualPerReviewSent",
                title: "Review Sent",
                width: "120px",
            },
            {
                field: "AnnualPerReviewReceived",
                title: "Review Received",
                width: "100px",
            },
            {
                field: "AnnualPerOverallGrade",
                title: "Overall Grade",
                width: "100px",
            },
            {
                field: "AnnualPerReviewPerson",
                title: "Review Person",
                width: "100px",
            },
            {
                field: "AnnualPerFilePath",
                title: "AnnualPerFilePath",
                width: "100px",
            },
        ]
    });
}

function LoadTraininDetailGrid() {
    var dataSource = new kendo.data.DataSource({
        batch: true,
        pageSize: 10,
        schema: {
            model: {
                id: "",
                fields:
                {
                    LiNo: { editable: false, nullable: false, type: "number" },
                    EmpCdKy: { editable: true, nullable: false, type: "number" },
                    LiNo: { editable: true, nullable: false, type: "number" },
                    Programme: { editable: true, nullable: false, type: "string" },
                    TrainingInstitute: { editable: true, nullable: false, type: "string" },
                    Intructor: { editable: true, nullable: false, type: "string" },
                    Duration: { editable: true, nullable: false, type: "string" },
                    ProgrammeType: { editable: true, nullable: false, type: "int" },
                    ProgrammeTypeKy: { editable: true, nullable: false, type: "number" },
                    Evaluation: { editable: true, nullable: false, type: "string" },
                    EvaluationKy: { editable: true, nullable: false, type: "number" },
                    TrainingFree: { editable: true, nullable: false, type: "string" },
                    TrainingBond: { editable: true, nullable: false, type: "number" },
                    Amount: { editable: true, nullable: false, type: "string" },
                    TrainingFromDate: { editable: true, nullable: false, type: "string" },
                    TrainingToDate: { editable: true, nullable: false, type: "string" },
                }
            }
        },
    });
    $("#TrainingDetailsGrid").kendoGrid({
        dataSource: dataSource,
        sortable: true,
        autobind: true,
        navigatable: true,
        scrollable: true,
        pageSize: 10,
        pageable: true,
        selectable: "row",
        resizable: true,
        pageable: { refresh: true, pageSizes: [5, 10, 20, 50, 100] },
        columns: [
            {
                field: "LiNo",
                title: "LiNo",
                width: "40px",
                attributes: { class: "ob-Center" }
            },
            {
                field: "Programme",
                title: "Programme",
                width: "100px",
            },
            {
                field: "TrainingInstitute",
                title: "Training Institute",
                width: "100px",
            },
            {
                field: "Intructor",
                title: "Instructor",
                width: "120px",
            },
            {
                field: "Duration",
                title: "Duration",
                width: "120px",

            },
            {
                field: "ProgrammeType",
                title: "Programme Type",
                width: "100px",
            },

            {
                field: "ProgrammeTypeKy",
                title: "Programme Type",
                hidden: true,
            },
            {
                field: "Evaluation",
                title: "Evaluation",
                width: "120px",
            },
            {
                field: "EvaluationKy",
                title: "Evaluation",
                hidden: true,

            },
            {
                field: "TrainingFree",
                title: "Training Free",
                width: "120px",
            },
            {
                field: "TrainingBond",
                title: "Bond",
                width: "50px",
            },
            {
                field: "Amount",
                title: "Amount",
                width: "50px",

            },
            {
                field: "TrainingFromDate",
                title: "From Date",
                width: "70px",
            },
            {
                field: "TrainingToDate",
                title: "To Date",
                width: "70px",
            },
        ]
    });
}

function LoadMembershipDetailGrid() {
    // alert(0);
    var dataSource = new kendo.data.DataSource({
        batch: true,
        pageSize: 10,
        schema: {
            model: {
                id: "",
                fields: //Relavent fields of the grid should be bind with following model items
                {
                    LiNo: { editable: false, nullable: false, type: "number" },
                    EmpCdKy: { editable: false, nullable: true, type: "number" },
                    MembershipNo: { editable: true, nullable: false, type: "string" },
                    Organization: { editable: true, nullable: false, type: "string" },
                    Year: { editable: true, nullable: false, type: "string" },
                    MembershipType: { editable: true, nullable: false, type: "string" },
                    MembershipTypeKy: { editable: true, nullable: false, type: "int" },
                    EffectDate: { editable: true, nullable: false, type: "string" },
                    HiddenMembershipNo: { editable: true, nullable: false, type: "string" }
                }
            }
        },
    });
    $("#MembershipDetailGrid").kendoGrid({
        dataSource: dataSource,
        sortable: true,
        autobind: true,
        navigatable: true,
        scrollable: true,
        pageSize: 10,
        pageable: true,
        selectable: "row",
        resizable: true,
        pageable: { refresh: true, pageSizes: [5, 10, 20, 50, 100] },

        columns: [
            {
                field: "LiNo",
                title: "LiNo",
                width: "40px",
                attributes: { class: "ob-Center" }
            },
            {
                field: "MembershipNo",
                title: "Membership No",
                width: "100px",
            },
            {
                field: "HiddenMembershipNo",
                title: "hidden Membership No",
                //width: "100px",
                hidden: true,
            },
            {
                field: "Organization",
                title: "Organization",
                width: "50px",
            },
            {
                field: "Year",
                title: "Year",
                width: "120px",
            },
            {
                field: "MembershipType",
                title: "Membership Type",
                width: "120px",

            },
            {
                field: "MembershipTypeKy",
                title: "Membership Type",
                //width: "100px",
                hidden: true,

            },
            {
                field: "EffectDate",
                title: "Effect Date",
                width: "120px",
            },
        ]
    });
}
