function LoadSalaryDetailsGrid() {
    var dataSource = new kendo.data.DataSource({
        batch: true,
        pageSize: 10,
        schema: {
            model: {
                id: "",
                fields: //Relavent fields of the grid should be bind with following model items
                {
                    EmpCdDtKy: { editable: false, nullable: true, type: "number" },
                    HiddenBasicAmount: { editable: true, nullable: false, type: "string" },
                    SalAllowenceType: { editable: true, nullable: false, type: "string" },
                    SalAllowenceTypeKy: { editable: true, nullable: false, type: "number" },
                    SalAllowance: { editable: true, nullable: false, type: "string" },
                    SalFromDate: { editable: true, nullable: false, type: "string" },
                    SalRemark: { editable: true, nullable: false, type: "string" }
                }
            }
        },
    });
    $("#SalaryDetailsGrid").kendoGrid({
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
                field: "SalAllowenceType",
                title: "Allowence Type",
                width: "100px",
            },
            {
                field: "SalAllowenceTypeKy",
                title: "Allowence Type",
                hidden: true,
            },
            {
                field: "HiddenBasicAmount",
                title: "HiddenBasicAmount",
                hidden: true,
            },
            {
                field: "SalAllowance",
                title: "Allowance",
                width: "120px",
            },
            {
                field: "SalFromDate",
                title: "From Date",
                width: "100px",
            },
            {
                field: "SalRemark",
                title: "Remark",
                width: "100px",
            },
        ]
    });
}

//Load Gid Details
function LoadAssetDetailGrid() {
    var dataSource = new kendo.data.DataSource({
        batch: true,
        pageSize: 10,
        schema: {
            model: {
                id: "",
                fields:
                {
                    EmpCdDtKy: { editable: false, nullable: true, type: "number" },
                    AssetFromDate: { editable: true, nullable: false, type: "string" },
                    AssetToDate: { editable: true, nullable: false, type: "string" },
                    AssetType: { editable: true, nullable: false, type: "string" },
                    AssetTypeKy: { editable: true, nullable: false, type: "number" },
                    AssetModel: { editable: true, nullable: false, type: "string" },
                    AssetInventoryNo: { editable: true, nullable: false, type: "string" },
                    AssetSerialNo: { editable: true, nullable: false, type: "string" }
                }
            }
        },
    });
    $("#AssetGrid").kendoGrid({
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
                field: "AssetFromDate",
                title: "From Date",
                width: "70px",
            },
            {
                field: "AssetToDate",
                title: "To Date",
                width: "70px",
            },
            {
                field: "AssetType",
                title: "Type",
                width: "50px",
                hidden:true
            },
            {
                field: "AssetTypeKy",
                title: "Type",
                hidden: true,
            },
            {
                field: "AssetModel",
                title: "Model",
                width: "120px",
            },
            {
                field: "AssetInventoryNo",
                title: "Inventory No",
                width: "100px",
            },
            {
                field: "AssetSerialNo",
                title: "Serial No",
                width: "100px",
            },
        ]
    });
}


function LoadPhoneInternetDetailGrid() {
    var dataSource = new kendo.data.DataSource({
        batch: true,
        pageSize: 10,
        schema: {
            model: {
                id: "EmpKy",
                fields: //Relavent fields of the grid should be bind with following model items
                {
                    EmpCdDtKy: { editable: false, nullable: true, type: "number" },
                    PhoneFromDate: { editable: true, nullable: false, type: "string" },
                    PhoneToDate: { editable: true, nullable: false, type: "string" },
                    PhoneModelNo: { editable: true, nullable: false, type: "string" },
                    PhoneSimNo: { editable: true, nullable: false, type: "string" },
                    PhoneMobileAllowance: { editable: true, nullable: false, type: "string" }
                }
            }
        },
    });
    $("#PhoneInternetGrid").kendoGrid({
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
                field: "PhoneFromDate",
                title: "From Date",
                width: "70px",
            },
            {
                field: "PhoneToDate",
                title: "To Date",
                width: "70px",
            },
            {
                field: "PhoneModelNo",
                title: "Model No",
                width: "100px",
            },
            {
                field: "PhoneSimNo",
                title: "Sim No",
                width: "120px",
            },
            {
                field: "PhoneMobileAllowance",
                title: "Mobile Allowance",
                width: "100px",
            },
        ]
    });
}
