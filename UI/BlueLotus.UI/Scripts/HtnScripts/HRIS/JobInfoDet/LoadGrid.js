function LoadMedicalClaimsGrid() {
    var dataSource = new kendo.data.DataSource({
        batch: true,
        pageSize: 10,
        schema: {
            model: {
                id: "EmpKy",
                fields: //Relavent fields of the grid should be bind with following model items
                {
                    EmpCdDtKy: { editable: false, nullable: true, type: "number"},
                    MedicalClaimsFromDate: { editable: true, nullable: false, type: "string" },
                    MedicalClaimsToDate: { editable: true, nullable: false, type: "string" },
                    ClaimDate: { editable: true, nullable: false, type: "string" },
                    MedicalType: { editable: true, nullable: false, type: "string" },
                    MedicalTypeKy: { editable: true, nullable: false, type: "number" },
                    MedicalClaimsAnnualLimit: { editable: true, nullable: false, type: "string" },
                    MedicalClaimsAmount: { editable: true, nullable: false, type: "string" },
                    MedicalClaimsBalance: { editable: true, nullable: false, type: "string" }
                }
            }
        },
    });
    $("#MedicalClaimsGrid").kendoGrid({
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
                hidden:true
            },
            {
                field: "MedicalClaimsFromDate",
                title: "From Date",
                width: "70px",
            },
            {
                field: "MedicalClaimsToDate",
                title: "To Date",
                width: "70px",
            },
            {
                field: "ClaimDate",
                title: "Claim Date",
                width: "70px",
            },
            {
                field: "MedicalType",
                title: "MedicalType",
                width: "100px",
            },
            {
                field: "MedicalTypeKy",
                title: "MedicalType Ky",
                hidden: true,
            },
            {
                field: "MedicalClaimsAnnualLimit",
                title: "Annual Limit",
                width: "100px",
            },
            {
                field: "MedicalClaimsAmount",
                title: "Amount",
                width: "100px",

            },
            {
                field: "MedicalClaimsBalance",
                title: "Balance",
                width: "100px",
            },
        ]
    });
}