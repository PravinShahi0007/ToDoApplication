
function LoadGridWithColumnPropItmCmpnGrid(columnsFinal, gridNo) {

    if (gridNo == "ItmCmpnGrid") {
        var dataSource = new kendo.data.DataSource({
            batch: true,
            sort: ({ field: "LiNo", dir: "desc" }),
            pageSize: 10,
            schema: {
                model: {
                    id: "ItmCmpnKy",
                    fields:
                    {
                        ItmCmpnKy: { editable: true, nullable: false, type: "number" },
                        FinItmKy: { editable: false, nullable: false, type: "number" },
                        ItmKy: { editable: false, nullable: false, type: "number" },
                        LiNo: { editable: true, nullable: false, type: "number", },
                        ItmCd: { editable: false, nullable: false, type: "string", },
                        ItmNm: { editable: false, nullable: false, type: "string" },
                        Des: { editable: true, nullable: false, type: "string" },
                        Rate: { editable: true, nullable: false, type: "number" },
                        Unit: { editable: false, nullable: false },
                        TrnUnitKy: { editable: true, nullable: false },
                        ResReqSchTyp: { editable: false, nullable: false },
                        ResReqSchTypKy: { editable: true, nullable: false },
                        ItmPrp: { editable: false, nullable: false },
                        ItmPrpKy: { editable: true, nullable: false },
                        Qty: { editable: true, nullable: false, type: "number" },
                        ReqQty: { editable: true, nullable: false, type: "number" },
                        WstPer: { editable: true, nullable: false, type: "number" },
                        WstQty: { editable: true, nullable: false, type: "number" },
                        UsagPer: { editable: true, nullable: false, type: "number" },
                        TrnQty: { editable: true, nullable: false, type: "number" },
                        CompFacPer: { editable: true, nullable: false, type: "number" },
                        AnalQty: { editable: true, nullable: false, type: "number" }
                    }
                }
            }
        });

        $("#ItmCmpnGrid").kendoGrid({
            height: itmCmpnGridHeight,
            dataSource: dataSource,
            autobind: true,
            navigatable: true,
            filterable: true,
            pageable: true,
            sortable: true,
            height: 300,
            reorderable: true,
            columnMenu: true,
            selectable: "multiple", //"multiple cell", //"row",
            pageable: { refresh: false, pageSizes: [5, 10, 20, 50, 100] },
            columns: columnsFinal,
            resizable: true,
            dataBinding: function () {
                record = (this.dataSource.page() - 1) * this.dataSource.pageSize();
            },
            editable: true
        });
    }
}


function LoadItmCmpnGrid() {
    var columnsDefine = [

        { field: "ItmCmpnKy", title: "ItmCmpnKy", width: "100px", hidden: true },
        { field: "FinItmKy", title: "FinItmKy", width: "100px", hidden: true },
        { field: "ItmKy", title: "ItmKy", width: "100px", hidden: true },
        {
            field: "LiNo", title: "Li No", width: "100px", lockable: true, locked: true,
            editor: function (container, options) {
                var model = options.model;
            }
        },
        { field: "AnalQty", title: "Analysis Qty", width: "100px", format: '{0:n5}', hidden: true },
        { field: "ItmCd", title: "Item code", width: "150px", lockable: true, locked: true, },
        { field: "ItmNm", title: "Item Name", width: "350px" },

        {
            field: "Qty", title: "Qty", width: "150px",
            editor: function (container, options) {
                var model = options.model;
            }
        },
        { field: "Des", title: "Description", width: "350px" },
        {
            field: "Rate", title: "Unit Cost", width: "350px", format: '{0:n4}',
            editor: function (container, options) {
                var model = options.model;
            }
        },
        {
            field: "RateValue", title: "Value", width: "350px", format: '{0:n4}',
            editor: function (container, options) {
                var model = options.model;
            }
        },
        {
            field: "ReqQty", title: "ReqQty", width: "150px", hidden: true,
            format: '{0:n3}',
            editor: function (container, options) {
                var model = options.model;
            }
        },
        {
            field: "WstPer", title: "WstPer", width: "150px",
            editor: function (container, options) {
                var model = options.model;
            }
        },
        {
            field: "WstQty", title: "WstQty", width: "150px",
            editor: function (container, options) {
                var model = options.model;
            }
        },
        {
            field: "UsagPer", title: "UsagPer", width: "150px",
            editor: function (container, options) {
                var model = options.model;
            }
        },
        {
            field: "TrnQty", title: "TrnQty", width: "150px",
            editor: function (container, options) {
                var model = options.model;
            }
        },
        {
            field: "TrnUnitKy", title: "TrnUnitKy", width: "100px", hidden: true,
            editor: function (container, options) {
                var model = options.model;
            }
        },
        { field: "Unit", title: "Unit", width: "100px" },
        {
            field: "CompFacPer", title: "CompFacPer", width: "150px",
            editor: function (container, options) {
                var model = options.model;
            }
        },
        {
            field: "ResReqSchTypKy", title: "ResReqSchTypKy", width: "100px", hidden: true,
            editor: function (container, options) {
                var model = options.model;
            }
        },
        { field: "ResReqSchTyp", title: "ResReqSchTyp", width: "100px" },
        {
            field: "ItmPrpKy", title: "ItmPrpKy", width: "100px",
            editor: function (container, options) {
                var model = options.model;
            }
        },
        { field: "ItmPrp", title: "ItmPrp", width: "100px" },


    ];

    var gridNo = "ItmCmpnGrid";
    var columnsFinal = setColumnProp(columnsDefine, viewBag.ObjKy, '', 'ItmCmpnGrid', gridNo);

}

dblclickCreation = function (e) {

    var id = ("#ItmCmpnGrid");
    var grid = $(id).data().kendoGrid;
    var selectedItem = grid.dataItem(grid.select());

    if (selectedItem != "" && selectedItem != undefined && selectedItem != null) {
        var ItmKy = selectedItem.ItmKy;
        if (ItmKy != "" && ItmKy != undefined && ItmKy != null && ItmKy != "?") {

            LoadUnitCombo(ItmKy);
            var LiNo = selectedItem.LiNo;
            var ItmCd = selectedItem.ItmCd;
            var ItmNm = selectedItem.ItmNm;
            var Qty = selectedItem.Qty;
            var Unit = selectedItem.Unit;
            var UnitKy = selectedItem.UnitKy;

            $("#HdrSec1_CmbItm_Cd").data("kendoComboBox").value(ItmKy);
            $("#HdrSec1_CmbItm_Cd").data("kendoComboBox").trigger("change");

            if (UnitKy == undefined || UnitKy == "NaN" || UnitKy == null || UnitKy == NaN) {
                UnitKy == 1;
            }
            $("#HdrSec1_CmbUnit_Cd").data("kendoComboBox").value(UnitKy);

            $("#HdrSec1_NmricQty_Val").data("kendoNumericTextBox").value(Qty);
            $("#HdrSec1_NmricLiNo_Val").data("kendoNumericTextBox").value(LiNo);

            var ReqQty = selectedItem.ReqQty;
            var WstPer = selectedItem.WstPer;
            var WstQty = selectedItem.WstQty;
            var UsagPer = selectedItem.UsagPer;
            var TrnQty = selectedItem.TrnQty;
            var CompFacPer = selectedItem.CompFacPer;

            $("#HdrSec1_NmricReqQty_Val").data("kendoNumericTextBox").value(ReqQty);
            $("#HdrSec1_NmricWstPer_Val").data("kendoNumericTextBox").value(WstPer);
            $("#HdrSec1_NmricWstQty_Val").data("kendoNumericTextBox").value(WstQty);
            $("#HdrSec1_NmricUsagPer_Val").data("kendoNumericTextBox").value(UsagPer);
            $("#HdrSec1_NmricTrnQty_Val").data("kendoNumericTextBox").value(TrnQty);
            $("#HdrSec1_NmricCompFacPer_Val").data("kendoNumericTextBox").value(CompFacPer);

        };
    }
}

$("#ItmCmpnGrid").bind("dblclick", dblclickCreation);

$("#ItmCmpnGrid").on("keydown", function (event) {

    //alert(">>>e.which is :" + event.which + " and e.keyCode is:" + event.keyCode);
    if ((event.keyCode == 46) || (event.which == 46)) {

        var strconfirm = confirm("Are you sure you want to delete?");
        if (strconfirm == true) {
            var index = $("#ItmCmpnGrid").data("kendoGrid").select().index(),
                dataItem = $("#ItmCmpnGrid").data("kendoGrid").dataSource.view()[index];
            $("#ItmCmpnGrid").data("kendoGrid").dataSource.remove(dataItem);
        }
    }

});

function DeleteAllFromItmCmpn() {
    var strconfirm = confirm("Are you sure you want to delete Selected ?");
    if (strconfirm == true) {
        //var index = $("#ItmCmpnGrid").data("kendoGrid").select().index(),
        //dataItem = $("#ItmCmpnGrid").data("kendoGrid").dataSource.view()[index];
        //$("#ItmCmpnGrid").data("kendoGrid").dataSource.remove(dataItem);

        //var entityGrid = $("#ItmCmpnGrid").data("kendoGrid");
        //var rows = entityGrid.select();
        //rows.each(function (index, row) {
        //    var selectedItem = entityGrid.dataItem(row);
        //    // selectedItem has EntityVersionId and the rest of your model
        //    $("#ItmCmpnGrid").data("kendoGrid").dataSource.remove(selectedItem);
        //});

        //$('#ItmCmpnGrid').data("kendoGrid").select().each(function () {
        //    entityGrid.dataSource.remove(grid.dataItem($(this).closest("tr")));
        //});
        DeleteAll_SelectedRows('ItmCmpnGrid');
        ArrangeLiNo();
    }
}

DeleteAll_SelectedRows = function (gridName) {
    // identifying grid  
    var entityGrid = $("#" + gridName + "").data("kendoGrid");
    // finding all the selected rows  
    var rows = entityGrid.select();

    var wantToDelete = [];
    rows.each(function (index, row) {
        // reading each selected item  
        var selectedItem = entityGrid.dataItem(row);
        wantToDelete.push(selectedItem);
        // finally removing selected item from grid data source  
        //entityGrid.dataSource.remove(selectedItem);
    });

    for (i = 0; i < wantToDelete.length; i++) {
        //text += cars[i] + "<br>";
        entityGrid.dataSource.remove(wantToDelete[i]);
    }
}
function ArrangeLiNo() {
    var id = ("#ItmCmpnGrid");
    var count = $(id).data().kendoGrid.dataSource.total();
    var dataSourceforLino = $(id).data("kendoGrid").dataSource.data();
    for (var a = 0; a < count; a++) {
        var GridItem = dataSourceforLino[a];
        GridItem.set("LiNo", (a + 1));
    }
}