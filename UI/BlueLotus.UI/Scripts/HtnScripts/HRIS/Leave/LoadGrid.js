function LoadLeaveDetailGrid() {
    // alert(0);
    var dataSource = new kendo.data.DataSource({
        batch: true,
        pageSize: 10,
        schema: {
            model: {
                id: "EmpKy",
                fields: //Relavent fields of the grid should be bind with following model items
                {
                    LevTrnKy: { editable: false, nullable: true, type: "number" },
                    LeaveFromDate: { editable: true, nullable: false, type: "string" },
                    LeaveToDate: { editable: true, nullable: false, type: "string" },
                    LeaveBalance: { editable: true, nullable: false, type: "number" },
                    LeaveTaken: { editable: true, nullable: false, type: "number" },
                    LeaveElagible: { editable: true, nullable: false, type: "number" },
                    LeaveType: { editable: true, nullable: false, type: "string" },
                    LeaveTypeKy: { editable: true, nullable: false, type: "number" },
                }
            }
        },
    });
    $("#LeaveInfoGrid").kendoGrid({
        dataSource: dataSource,
        sortable: true,
        autobind: true,
        navigatable: true,
        scrollable: true,
        pageSize: 10,
        pageable: true,
        //editable: true,
        selectable: "row",
        resizable: true,
        pageable: { refresh: true, pageSizes: [5, 10, 20, 50, 100] },

        columns: [
            {
                field: "LeaveType",
                title: "Leave Type",
                width: "100px",
            },
            {
                field: "LevTrnKy",
                title: "LevTrnKy",
               // width: "100px"
                hidden: true,
            },
            {
                field: "LeaveTypeKy",
                title: "LeaveType Ky",
                hidden: true,
            },
            {
                field: "LeaveElagible",
                title: "Elagible",
                width: "50px",
            },
            {
                field: "LeaveTaken",
                title: "Taken",
                width: "50px",
            },
            {
                field: "LeaveBalance",
                title: "Balance",
                width: "50px",
            },
            {
                field: "LeaveFromDate",
                title: "From Date",
                width: "50px",
            },
            {
                field: "LeaveToDate",
                title: "To Date",
                width: "50px",
            },
            //{ command: [{ name: "destroy" }], width: "20px" }
        ]
    });
}
