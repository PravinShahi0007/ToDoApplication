function LoadFuneralDetailGrid() {
    var dataSource = new kendo.data.DataSource({
        batch: true,
        pageSize: 10,
        schema: {
            model: {
                id: "EmpKy",
                fields: //Relavent fields of the grid should be bind with following model items
                {
                    EmpCdDtKy: { editable: false, nullable: true, type: "number" },
                    FuneralDateofDesmise: { editable: true, nullable: false, type: "string" },
                    FuneralDescription: { editable: true, nullable: false, type: "string" },
                    FuneralDateofBirth: { editable: true, nullable: false, type: "string" },
                    FuneralNIC: { editable: true, nullable: false, type: "string" },
                    FuneralRelationship: { editable: true, nullable: false, type: "string" },
                    FuneralRelationshipKy: { editable: true, nullable: false, type: "number" },
                }
            }
        },
    });
    $("#WelfareFuneralGrd").kendoGrid({
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
                field: "EmpCdDtKy",
                title: "EmpCdDtKy",
                hidden: true
            },
            {
                field: "FuneralDateofDesmise",
                title: "Date of Desmise",
                width: "70px",
            },
            {
                field: "FuneralDescription",
                title: "Description",
                width: "100px",
            },
            {
                field: "FuneralDateofBirth",
                title: "Date of Birth",
                width: "70px",
            },
            {
                field: "FuneralNIC",
                title: "NIC",
                width: "70px",
            },
            {
                field: "FuneralRelationship",
                title: "Relationship",
                width: "70px",
            },
            {
                field: "FuneralRelationshipKy",
                title: "Relationship",
                hidden: true,
            },
        ]
    });
}



function LoadWelfareMedicalGrid() {
    var dataSource = new kendo.data.DataSource({
        batch: true,
        pageSize: 10,
        schema: {
            model: {
                id: "",
                fields:
                {

                    WelfareMedicalFromDate: { editable: true, nullable: false, type: "string" },
                    WelfareMedicalToDate: { editable: true, nullable: false, type: "string" },
                    WelfareMedicalMedicalType: { editable: true, nullable: false, type: "string" },
                    WelfareMedicalMedicalTypeKy: { editable: true, nullable: false, type: "number" },
                    WelfareMedicalAmount: { editable: true, nullable: false, type: "string" },
                    WelfareMedicalBalance: { editable: true, nullable: false, type: "string" },
                    WelfareMedicalAnnualLimit: { editable: true, nullable: false, type: "string" }
                }
            }
        },
    });
    $("#WelfareMedicalGrid").kendoGrid({
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
                field: "WelfareMedicalFromDate",
                title: "FromDate",
                width: "100px",
            },
            {
                field: "WelfareMedicalToDate",
                title: "To Date",
                width: "50px",
            },
            {
                field: "WelfareMedicalMedicalType",
                title: "Medical Type",
                width: "100px",
            },
            {
                field: "WelfareMedicalMedicalTypeKy",
                title: "MedicalType ",
                hidden: true,
            },
            {
                field: "WelfareMedicalAmount",
                title: "Amount",
                width: "80px",
            },
            {
                field: "WelfareMedicalBalance",
                title: "Balance",
                width: "70px",
            },
            {
                field: "WelfareMedicalAnnualLimit",
                title: "Annual Limit",
                width: "40px",
            },
        ]
    });
}

function LoadWelfareLoanDetailGrid() {
    // alert(0);
    var dataSource = new kendo.data.DataSource({
        batch: true,
        pageSize: 10,
        schema: {
            model: {
                id: "",
                fields: //Relavent fields of the grid should be bind with following model items
                {
                    EmpCdDtKy: { editable: false, nullable: true, type: "number" },
                    WelfareLoanFromDate: { editable: true, nullable: false, type: "string" },
                    WelfareLoanToDate: { editable: true, nullable: false, type: "string" },
                    WelfareLoanBorrowedDate: { editable: true, nullable: false, type: "string" },
                    WelfareLoanLoanTypeKy: { editable: true, nullable: false, type: "number" },
                    WelfareLoanLoanType: { editable: true, nullable: false, type: "string" },
                    WelfareLoanLoanAmount: { editable: true, nullable: false, type: "string" },
                    WelfareLoanInstallAmount: { editable: true, nullable: false, type: "string" },
                    WelfareLoanNoOfInstall: { editable: true, nullable: false, type: "string" },
                    WelfareLoanInerestRate: { editable: true, nullable: false, type: "string" },
                    WelfareLoanInterestAmount: { editable: true, nullable: false, type: "string" },
                    WelfareLoanTotalPayable: { editable: true, nullable: false, type: "string" },
                    WelfareLoanPayBackPeriod: { editable: true, nullable: false, type: "string" },
                    WelfareLoanBrnNameKy: { editable: true, nullable: false, type: "number" },
                    WelfareLoanAccountCode: { editable: true, nullable: false, type: "string" }
                }
            }
        },
    });
    $("#WelfareLoanGrid").kendoGrid({
        dataSource: dataSource,
        sortable: true,
        autobind: true,
        navigatable: true,
        scrollable: true,
        pageSize: 10,
        //height: '500px',
        pageable: true,
        selectable: "row",
        resizable: true,
        pageable: { refresh: true, pageSizes: [5, 10, 20, 50, 100] },

        columns: [
            {
                field: "EmpCdDtKy",
                title: "EmpCdDtKy",
                hidden: true
            },
            {
                field: "WelfareLoanFromDate",
                title: "From Date",
                width: "100px",
            },
            {
                field: "WelfareLoanToDate",
                title: "To Date",
                width: "100px",
            },
            {
                field: "WelfareLoanBorrowedDate",
                title: "Borrowed Date",
                width: "100px",
            },
            {
                field: "WelfareLoanLoanTypeKy",
                title: "Loan Type",
                //width: "120px",
                hidden: true,

            },
            {
                field: "WelfareLoanLoanType",
                title: "Loan Type",
                width: "100px",
            },

            {
                field: "WelfareLoanLoanAmount",
                title: "Loan Amount",
                width: "100px",
            },
            {
                field: "WelfareLoanInstallAmount",
                title: "Install Amount",
                width: "120px",
            },
            {
                field: "WelfareLoanNoOfInstall",
                title: "No Of Install",
                width: "100px",

            },
            {
                field: "WelfareLoanInerestRate",
                title: "Inerest Rate",
                width: "120px",
            },
            {
                field: "WelfareLoanInterestAmount",
                title: "Interest Amount",
                width: "120px",
            },
            {
                field: "WelfareLoanTotalPayable",
                title: "Total Payable",
                width: "120px",
            },
            {
                field: "WelfareLoanPayBackPeriod",
                title: "Pay Back Period",
                width: "120px",
            },
            {
                field: "WelfareLoanAccountCode",
                title: "Account",
                width: "120px",
            },
        ]
    });
}


