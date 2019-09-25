
var EmpKy = 1;
var EntryDate = "";

function MonthlyAdditionEntry(EMPKY, Date) {

    if (EMPKY > 1)
        EmpKy = EMPKY;
    if (Date != "")
        EntryDate = Date;
    var AddColumn = [

            
            {
                field: "EmpCdDtKy", title: "EmpCdDtKy", width: "10px", hidden: true,
            },
            
             {
                 field: "EmpKyAdd", title: "EmpKy", width: "10px", hidden: true,
             },
                        {
                            field: "CdKyAdd", title: "CdKy", width: "10px", hidden: true,
                        },
                                    {
                                        field: "EmpNo", title: "Employee No", width: "10px", hidden: true,
                                    },
            {
                field: "EmpNm", title: "Employee Name", width: "10px", hidden: true,
            },
            {
                field: "AdditionType", title: "Addition Type", width: "10px",
            },
            {
                field: "AmountAdd", title: "Amount", width: "10px",
            },
            //hidden: true,
        {
            field: "EntryMonthAdd", title: " Entry Month", width: "10px",
        },

             

    ];

    var gridNo = 1;
    var FinalItmSettingsColumn = setColumnProp(AddColumn, viewBag.ObjKy, '', 'GridAddEntry', gridNo);
}

function LoadGridWithColumnProp(columnsFinal, gridNo) {

    if (gridNo == 1) {
        try {
            $('#MonthlyAdditionEntry').data().kendoGrid.destroy();
            $('#MonthlyAdditionEntry').empty();
        } catch (e) { }


        var dataSourceGrid = new kendo.data.DataSource({

            transport: {
                read: {
                    url: urlEmpMas.GetAddDedDetails, //'@Url.Action("LoadPriceRevision", "ItmPrfl")'
                    dataType: "json"
                },

                parameterMap: function (options, operation) {
                    //if (operation == "update" && options.models) {
                    //    return JSON.stringify({ 'listMe': options.models });
                    //}
                    //if (operation == "create" && options.models) {
                    //    return JSON.stringify({ 'listMe': options.models });
                    //}
                    if (operation == "read") {
                        return ({
                            'EmpKy': EmpKy,
                            'EntryDate': EntryDate,

                        });
                    }
                }
            },
            batch: true,
            pageSize: 10,
            schema: {
                model: {
                    id: "EmpCdDtKy",
                    fields: //Relavent fields of the grid should be bind with following model items
                    {
                        EmpKy: { editable: true, nullable: false, type: "number" },
                        EmpCdDtKy: { editable: true, nullable: false, type: "number" },
                        EmpNo: { editable: false, nullable: false, type: "string" },
                        EmpNm: { editable: false, nullable: false, type: "string" },
                        CdKy: { editable: true, nullable: false, type: "number" },
                        frmDt: { editable: true, nullable: false, type: "Date" },
                        EftDtm: { editable: true, nullable: false, type: "Date" },
                        CdNm: { editable: true, nullable: false, type: "string" },
                        Amt: { editable: true, nullable: false, type: "number" },

                    }
                }
            }
        });



        $("#MonthlyAdditionEntry").kendoGrid({
            dataSource: dataSourceGrid,
            autobind: true,
            resizable: true,
            navigatable: true,
            sortable: true,
            reorderable: true,
            //Scrollable: true,
            //save: function (data) {
            //    if (data.values.EftvDate == null) {
            //        var test = data.model.set("SlsPri", data.model.CosPri + ((data.values.Markup / 100) * data.model.CosPri));

            //    }
            //else if (data.values.EftvDate == null) {
            //    var test = data.model.set("SlsPri", data.values.CosPri + ((data.model.Markup / 100) * data.values.CosPri));
            //}

            //},
            columns: columnsFinal,
            selectable: "row",
            pageable: {
                refresh: true, pageSizes: [5, 10, 20, 50, 100, 150]
            },
            columnMenu: true,
            filterable: {
                mode: "row"
            },


            dataBinding: function () {
                record = (this.dataSource.page() - 1) * this.dataSource.pageSize();
            },
            //dataBound: GridOnDataBound,

            editable: true
        });
    }

}


//function GridOnDataBound(arg) {

//    var grid = $("#grid").data("kendoGrid");


//    $(grid.tbody).on("click", "td", function (e) {

//        var row = $(this).closest("tr");
//        var rowIdx = $("tr", grid.tbody).index(row);
//        var colIdx = $("td", row).index(this);
//        if (colIdx == 6) {

//            $("#MultiUnitWin").show().kendoWindow({

//                width: "1000px",
//                height: "500px",
//                modal: true,
//                title: "Find",
//                //close: onClose1


//            });
//            var selectedItem = grid.dataItem(grid.select());
//            var ItmKy = selectedItem.ItmKy;
//            var UnitKy = selectedItem.UnitKy;

//            $("#MultiItmKy").val(ItmKy)
//            $("#MultiUnitKy").val(UnitKy)
//            // $('#MultiUnitWin').data('kendoWindow').center().open();


//        }

//    });
//}


function MonthlyDeductionEntry(EMPKY, Date) {

    if (EMPKY > 1)
        EmpKy = EMPKY;
    if (Date != "")
        EntryDate = Date;
    var DedtColumn = [


            {
                field: "EmpCdDtKy", title: "EmpCdDtKy", width: "10px", hidden: true,
            },

             {
                 field: "EmpKyDed", title: "EmpKy", width: "10px", hidden: true,
             },
                        {
                            field: "CdKyDed", title: "CdKy", width: "10px", hidden: true,
                        },
                                    {
                                        field: "EmpNo", title: "Employee No", width: "10px", hidden: true,
                                    },
            {
                field: "EmpNm", title: "Employee Name", width: "10px", hidden: true,
            },
            {
                field: "DeductionType", title: "Deduction Type", width: "10px",
            },
            {
                field: "AmountDed", title: "Amount", width: "10px",
            },
            //hidden: true,
        {
            field: "EntryMonthDed", title: " Entry Month", width: "10px",
        },
            //hidden: true,
        



    ];

    var gridNo = 2;
    var FinalItmSettingsColumn = setColumnProp(DedtColumn, viewBag.ObjKy, '', 'GridDedtEntry', gridNo);
}

function LoadGridWithColumnPropTwo(columnsFinal, gridNo) {
        
    if (gridNo == 2) {
        try {
            $('#MonthlyDeductionEntry').data().kendoGrid.destroy();
            $('#MonthlyDeductionEntry').empty();
        } catch (e) { }


        var dataSourceGrid = new kendo.data.DataSource({

            transport: {
                read: {
                    url: urlEmpMas.GetAddDedDetails, 
                    dataType: "json"
                },

                parameterMap: function (options, operation) {
                    //if (operation == "update" && options.models) {
                    //    return JSON.stringify({ 'listMe': options.models });
                    //}
                    //if (operation == "create" && options.models) {
                    //    return JSON.stringify({ 'listMe': options.models });
                    //}
                    if (operation == "read") {
                        return ({
                            'EmpKy': EmpKy,
                            'EntryDate': EntryDate,

                        });
                    }
                }
            },
            batch: true,
            pageSize: 10,
            schema: {
                model: {
                    id: "EmpCdDtKy",
                    fields: //Relavent fields of the grid should be bind with following model items
                    {
                        EmpKyDed: { editable: true, nullable: false, type: "number" },
                        EmpCdDtKy: { editable: true, nullable: false, type: "number" },
                        EmpNo: { editable: false, nullable: false, type: "string" },
                        EmpNm: { editable: false, nullable: false, type: "string" },
                        CdKyDed: { editable: true, nullable: false, type: "number" },
                        //frmDt: { editable: true, nullable: false, type: "Date" },
                        EntryMonthDed: { editable: true, nullable: false, type: "string" },
                        DeductionType: { editable: true, nullable: false, type: "string" },
                        AmountDed: { editable: true, nullable: false, type: "number" },

                    }
                }
            }
        });



        $("#MonthlyDeductionEntry").kendoGrid({
            dataSource: dataSourceGrid,
            autobind: true,
            resizable: true,
            navigatable: true,
            sortable: true,
            reorderable: true,
            //Scrollable: true,
            //save: function (data) {
            //    if (data.values.EftvDate == null) {
            //        var test = data.model.set("SlsPri", data.model.CosPri + ((data.values.Markup / 100) * data.model.CosPri));

            //    }
            //else if (data.values.EftvDate == null) {
            //    var test = data.model.set("SlsPri", data.values.CosPri + ((data.model.Markup / 100) * data.values.CosPri));
            //}

            //},
            columns: columnsFinal,
            selectable: "row",
            pageable: {
                refresh: true, pageSizes: [5, 10, 20, 50, 100, 150]
            },
            columnMenu: true,
            filterable: {
                mode: "row"
            },


            dataBinding: function () {
                record = (this.dataSource.page() - 1) * this.dataSource.pageSize();
            },
           // dataBound: GridOnDataBound,

            editable: true
        });
    }

}



//function MonthlyAdditionEntry() {

//    //$('#MonthlyAdditionEntry').data().kendoGrid.destroy();
//    //$('#MonthlyAdditionEntry').empty();

//    var dataSource = new kendo.data.DataSource({
//        transport: {
//            read: {
//                dataType: "json"
//            },
//            update: {
//                contentType: 'application/json; charset=utf-8',
//                dataType: "json",
//                type: "POST",
//                complete: function (e) {

//                    var grid = $("#gridAdd").data("kendoGrid");
//                    grid.dataSource.read();
//                }
//            },
//            destroy: {

//                contentType: 'application/json; charset=utf-8',
//                dataType: "json",
//                type: "POST",
//                data: { isAct: 0 },
//                complete: function (e) {
//                    var grid = $("#gridAdd").data("kendoGrid");
//                    grid.dataSource.read();
//                }
//            },
//            create: {

//                contentType: 'application/json; charset=utf-8',
//                dataType: "json",
//                type: "POST",
//                complete: function (e) {
//                    alert("Saved successfully..!");
//                    var grid = $("#gridAdd").data("kendoGrid");
//                    grid.dataSource.read();
//                }
//            },
//            parameterMap: function (options, operation) {
//                if (operation == "create" && options.models) {
//                    return JSON.stringify({ 'todos': options.models });
//                }
//                if (operation == "update" && options.models) {
//                    return JSON.stringify({ 'todos': options.models });

//                }
//                if (operation == "destroy" && options.models) {
//                    return JSON.stringify({ 'todos': options.models });

//                }
//                if (operation == "read") {
//                    return ({


//                    });
//                }
//            }
//        },
//        batch: true,
//        pageSize: 20,

//        schema: {
//            model: {
//                id: "CdKy2",
//                fields: //Relavent fields of the grid should be bind with following model items
//                {
//                    CdKy: { editable: true, nullable: false, type: "number" },
//                    frmDt: { editable: true, nullable: false, type: "Date" },
//                    EftDtm: { editable: true, nullable: false, type: "Date" },
//                    CdNm: { editable: true, nullable: false, type: "string" },
//                    Amt: { editable: true, nullable: false, type: "number" },
//                }
//            }
//        }
//    });


//    $("#MonthlyAdditionEntry").kendoGrid({
//        dataSource: dataSource,
//        autobind: true,

//        width: 500,
//        navigatable: true,
//        filterable: true,
//        //height:200,

//        pageable: true,
//        sortable: true,
//        reorderable: true,
//        columnMenu: true,

//        selectable: "row",


//        pageable: { refresh: true, pageSizes: [20, 50, 100] },

//        columns: [


//                {
//                    field: "EmpKyAdd", title: "EmpKy", width: "10px", hidden: true,
//                },
//                        {
//                            field: "CdKyAdd", title: "CdKy", width: "10px", hidden: true,
//                        },
//                                    {
//                                        field: "EmpNo", title: "Employee No", width: "10px", hidden: true,
//                                    },
//            {
//                field: "EmpNm", title: "Employee Name", width: "10px", hidden: true,
//            },
//            {
//                field: "AdditionType", title: "Addition Type", width: "10px",
//            },
//            {
//                field: "AmountAdd", title: "Amount", width: "10px",
//            },
//            //hidden: true,
//        {
//            field: "EntryMonthAdd", title: " Entry Month", width: "10px",
//        },
             



//        ],

//        resizable: true,

//        dataBinding: function () {
//            record = (this.dataSource.page() - 1) * this.dataSource.pageSize();
//        },

//        //   dataBound: GridOnDataBound,
//        editable: false,

//    });
//}

//function MonthlyDeductionEntry() {

//    //$('#MonthlyDeductionEntry').data().kendoGrid.destroy();
//    //$('#MonthlyDeductionEntry').empty();

//    var dataSource = new kendo.data.DataSource({
//        transport: {
//            read: {
//                dataType: "json"
//            },
//            update: {
//                contentType: 'application/json; charset=utf-8',
//                dataType: "json",
//                type: "POST",
//                complete: function (e) {

//                    var grid = $("#gridAdd").data("kendoGrid");
//                    grid.dataSource.read();
//                }
//            },
//            destroy: {

//                contentType: 'application/json; charset=utf-8',
//                dataType: "json",
//                type: "POST",
//                data: { isAct: 0 },
//                complete: function (e) {
//                    var grid = $("#gridAdd").data("kendoGrid");
//                    grid.dataSource.read();
//                }
//            },
//            create: {

//                contentType: 'application/json; charset=utf-8',
//                dataType: "json",
//                type: "POST",
//                complete: function (e) {
//                    alert("Saved successfully..!");
//                    var grid = $("#gridAdd").data("kendoGrid");
//                    grid.dataSource.read();
//                }
//            },
//            parameterMap: function (options, operation) {
//                if (operation == "create" && options.models) {
//                    return JSON.stringify({ 'todos': options.models });
//                }
//                if (operation == "update" && options.models) {
//                    return JSON.stringify({ 'todos': options.models });

//                }
//                if (operation == "destroy" && options.models) {
//                    return JSON.stringify({ 'todos': options.models });

//                }
//                if (operation == "read") {
//                    return ({


//                    });
//                }
//            }
//        },
//        batch: true,
//        pageSize: 20,

//        schema: {
//            model: {
//                id: "CdKy2",
//                fields: //Relavent fields of the grid should be bind with following model items
//                {
//                    CdKy: { editable: true, nullable: false, type: "number" },
//                    frmDt: { editable: true, nullable: false, type: "Date" },
//                    EftDtm: { editable: true, nullable: false, type: "Date" },
//                    CdNm: { editable: true, nullable: false, type: "string" },
//                    Amt: { editable: true, nullable: false, type: "number" },
//                }
//            }
//        }
//    });


//    $("#MonthlyDeductionEntry").kendoGrid({
//        dataSource: dataSource,
//        autobind: true,

//        width: 500,
//        navigatable: true,
//        filterable: true,
//        //height:200,

//        pageable: true,
//        sortable: true,
//        reorderable: true,
//        columnMenu: true,

//        selectable: "row",


//        pageable: { refresh: true, pageSizes: [20, 50, 100] },

//        columns: [


//                {
//                    field: "EmpKyDed", title: "EmpKy", width: "10px" ,hidden: true,
//                },
//                        {
//                            field: "CdKyDed", title: "CdKy", width: "10px", hidden: true,
//                        },
//                                    {
//                                        field: "EmpNo", title: "Employee No", width: "10px", hidden: true,
//                                    },
//            {
//                field: "EmpNm", title: "Employee Name", width: "10px", hidden: true,
//            },
//            {
//                field: "DeductionType", title: "Deduction Type", width: "10px",
//            },
//            {
//                field: "AmountDed", title: "Amount", width: "10px",
//            },
//            //hidden: true,
//        {
//            field: "EntryMonthDed", title: " Entry Month", width: "10px",
//        },




//        ],

//        resizable: true,

//        dataBinding: function () {
//            record = (this.dataSource.page() - 1) * this.dataSource.pageSize();
//        },

//        //   dataBound: GridOnDataBound,
//        editable: false,

//    });
//}