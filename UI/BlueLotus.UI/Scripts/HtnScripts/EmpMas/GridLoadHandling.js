
function LoadBAndi() {
    var dataSourceDed = new kendo.data.DataSource({
        batch: true,
        pageSize: 20,

        schema: {
            model: {
                id: "CdKy",
                fields: //Relavent fields of the grid should be bind with following model items
                {
                    CdKy: { editable: true, nullable: false, type: "number" },
                    frmDt: { editable: true, nullable: false, type: "Date" },
                    EftDtm: { editable: true, nullable: false, type: "Date" },
                    CdNm: { editable: true, nullable: false, type: "string" },
                    Amt: { editable: true, nullable: false, type: "number" },
                }
            }
        }
    });


    $("#GridEmpDed").kendoGrid({

        dataSource: dataSourceDed,
        autobind: true,
        width: 500,
        navigatable: true,
        filterable: true,
        pageable: true,
        sortable: true,
        reorderable: true,
        columnMenu: true,
        selectable: "row",
        pageable: { refresh: true, pageSizes: [20, 50, 100] },
        columns: [
             {
                 field: "TypeD", title: "Type", width: "10px",
             },
             {
                 field: "TypeDKy", title: "TypeDKy", width: "10px", hidden: true,
             },
            {
                field: "codeD", title: "Code", width: "10px",
            },
             {
                 field: "codeDKy", title: "codeDKy", width: "10px", hidden: true,
             },
            {
                field: "AmtDed", title: "Amt", width: "10px",
            },
            {
                field: "DateFD",
                title: "EftvDt",
                width: "10px",
            },
            {
                field: "DateTD",
                title: "ToDt",
                width: "10px",
            },

        ],
        resizable: true,
        dataBinding: function () {
            record = (this.dataSource.page() - 1) * this.dataSource.pageSize();
        },
        //   dataBound: GridOnDataBound,
        editable: false,
    });

    var dataSourceOthe = new kendo.data.DataSource({
        batch: true,
        pageSize: 20,

        schema: {
            model: {
                id: "CdKy",
                fields: //Relavent fields of the grid should be bind with following model items
                {
                    CdKy: { editable: true, nullable: false, type: "number" },
                    frmDt: { editable: true, nullable: false, type: "Date" },
                    EftDtm: { editable: true, nullable: false, type: "Date" },
                    CdNm: { editable: true, nullable: false, type: "string" },
                    Amt: { editable: true, nullable: false, type: "number" },
                }
            }
        }
    });

    $("#GridEmpOthe").kendoGrid({
        dataSource: dataSourceOthe,
        autobind: true,
        width: 500,
        navigatable: true,
        filterable: true,
        pageable: true,
        sortable: true,
        reorderable: true,
        columnMenu: true,
        selectable: "row",
        pageable: { refresh: true, pageSizes: [20, 50, 100] },
        columns: [
            {
                field: "Type", title: "Type", width: "10px",
            },
            {
                field: "TypeKy", title: "TypeKy", width: "10px", hidden: true,
            },
                    {
                        field: "code", title: "Code", width: "10px",
                    },
            {
                field: "codeKy", title: "codeKy", width: "10px", hidden: true,
            },
             {
                 field: "EDate", title: "EftvDt", width: "10px",
             },
            {
                field: "ToDate",
                title: "ToDt",
                width: "10px",
            },
        ],
        resizable: true,
        dataBinding: function () {
            record = (this.dataSource.page() - 1) * this.dataSource.pageSize();
        },
        //   dataBound: GridOnDataBound,
        editable: false,
    });

}

function LoadAlwGrid() {
    var dataSource = new kendo.data.DataSource({
        transport: {
            read: {
                dataType: "json"
            },
            update: {
                contentType: 'application/json; charset=utf-8',
                dataType: "json",
                type: "POST",
                complete: function (e) {

                    var grid = $("#gridAdd").data("kendoGrid");
                    grid.dataSource.read();
                }
            },
            destroy: {

                contentType: 'application/json; charset=utf-8',
                dataType: "json",
                type: "POST",
                data: { isAct: 0 },
                complete: function (e) {
                    var grid = $("#gridAdd").data("kendoGrid");
                    grid.dataSource.read();
                }
            },
            create: {

                contentType: 'application/json; charset=utf-8',
                dataType: "json",
                type: "POST",
                complete: function (e) {
                    alert("Saved successfully..!");
                    var grid = $("#gridAdd").data("kendoGrid");
                    grid.dataSource.read();
                }
            },
            parameterMap: function (options, operation) {
                if (operation == "create" && options.models) {
                    return JSON.stringify({ 'todos': options.models });
                }
                if (operation == "update" && options.models) {
                    return JSON.stringify({ 'todos': options.models });

                }
                if (operation == "destroy" && options.models) {
                    return JSON.stringify({ 'todos': options.models });

                }
                if (operation == "read") {
                    return ({


                    });
                }
            }
        },
        batch: true,
        pageSize: 20,

        schema: {
            model: {
                id: "CdKy",
                fields: //Relavent fields of the grid should be bind with following model items
                {
                    CdKy: { editable: true, nullable: false, type: "number" },
                    frmDt: { editable: true, nullable: false, type: "Date" },
                    EftDtm: { editable: true, nullable: false, type: "Date" },
                    CdNm: { editable: true, nullable: false, type: "string" },
                    Amt: { editable: true, nullable: false, type: "number" },
                }
            }
        }
    });


    $("#GridEmpAdd").kendoGrid({
        dataSource: dataSource,
        autobind: true,

        width: 500,
        navigatable: true,
        filterable: true,

        pageable: true,
        sortable: true,
        reorderable: true,
        columnMenu: true,

        selectable: "row",


        pageable: { refresh: true, pageSizes: [20, 50, 100] },

        columns: [
            {
                field: "TypeA", title: "Type", width: "10px",
            },
            {
                field: "TypeAKy", title: "TypeKy", width: "10px", hidden: true,
            },
            {
                field: "codeA", title: "Code", width: "10px",
            },
             {
                 field: "codeAKy", title: "CodeKy", width: "10px", hidden: true,
             },
            {
                field: "AmtAdd", title: "Amt", width: "10px",
            },
            {
                field: "DateFA",
                title: "EftvDt",
                width: "10px",
            },
            {
                field: "DateTA",
                title: "ToDt",
                width: "10px",
            },


        ],

        resizable: true,

        dataBinding: function () {
            record = (this.dataSource.page() - 1) * this.dataSource.pageSize();
        },

        //   dataBound: GridOnDataBound,
        editable: false,

    });
}