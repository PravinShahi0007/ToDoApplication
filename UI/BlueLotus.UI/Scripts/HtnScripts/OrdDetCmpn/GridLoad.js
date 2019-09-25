
var itmCmpnGridHeight = 300;

function LoadGridWithColumnPropItmCmpnGrid(columnsFinal, gridNo) {

    if (gridNo == "ItmCmpnGrid") {
        var dataSource = new kendo.data.DataSource({
            batch: true,
            sort: ({ field: "LiNo", dir: "desc" }),
            pageSize: 10,
            schema: {
                model: {
                    id: "OrdDetCmpnKy",
                    fields:
                    {
                        OrdDetCmpnKy: { editable: true, nullable: false, type: "number" },
                        OrdDetKy: { editable: true, nullable: false, type: "number" },
                        FinItmKy: { editable: false, nullable: false, type: "number" },
                        ItmKy: { editable: false, nullable: false, type: "number" },
                        LiNo: { editable: false, nullable: false, type: "number" },
                        ItmCd: { editable: false, nullable: false, type: "string" },
                        ItmNm: { editable: false, nullable: false, type: "string" },
                        Unit: { editable: false, nullable: false },
                        TrnUnitKy: { editable: true, nullable: false },
                        Qty: { editable: true, nullable: false, type: "number" },
                        ReqQty: { editable: true, nullable: false, type: "number" },
                        WstPer: { editable: true, nullable: false, type: "number" },
                        WstQty: { editable: true, nullable: false, type: "number" },
                        UsagPer: { editable: true, nullable: false, type: "number" },
                        TrnQty: { editable: true, nullable: false, type: "number" },
                        CompFacPer: { editable: true, nullable: false, type: "number" },
                        Des: { editable: true, nullable: false, type: "string" },
                        AnlQty: { editable: true, nullable: false, type: "number" },
                        ConvRate: { editable: true, nullable: false, type: "number" },
                        TrnRate: { editable: true, nullable: false, type: "number" },
                        LineTotal: { editable: true, nullable: false, type: "number" },
                        Stock: { editable: true, nullable: false, type: "number" }
                    }
                }
            }
        });

        $("#PrcsSchDetCmpnGrid").kendoGrid({
            height: itmCmpnGridHeight,
            dataSource: dataSource,
            autobind: true,
            navigatable: true,
            filterable: true,
            pageable: true,
            sortable: true,
            reorderable: true,
            columnMenu: true,
            selectable: "row",
            pageable: { refresh: false, pageSizes: [5, 10, 20, 50, 100] },
            columns: columnsFinal,
            resizable: true,
            dataBinding: function () {
                record = (this.dataSource.page() - 1) * this.dataSource.pageSize();
            },
            editable: true
        });

        GetGridDetailFrmItmCmpnDet(globalVariable.OrdDetKy, globalVariable.FinItmKy);
    }    
}


function LoadPrcsSchDetCmpnGrid() {
    var columnsDefine = [

        { field: "OrdDetKy", title: "OrdDetKy", width: "100px", hidden: true },
        { field: "FinItmKy", title: "FinItmKy", width: "100px", hidden: true },
        { field: "ItmKy", title: "ItmKy", width: "100px", hidden: true },
        { field: "LiNo", title: "Li No", width: "100px" },
        { field: "ItmCd", title: "Item code", width: "150px" },
        //{ field: "ItmNm", title: "Item Name", width: "350px" },
        { field: "Des", title: "Description", width: "350px" },
        {
            field: "TrnQty", title: "TrnQty", width: "150px",
            editor: function (container, options) {
                var model = options.model;
            }
        },

        {
            field: "Qty", title: "Qty", width: "150px", hidden:true,
            editor: function (container, options) {
                var model = options.model;
            }
        },

        {
            field: "Stock", title: "Avalable Stock", width: "150px", hidden: false,
            editor: function (container, options) {
                var model = options.model;
            }
        },

        {
            field: "ReqQty", title: "ReqQty", width: "150px", hidden: true,
            editor: function (container, options) {
                var model = options.model;
            }
        },
        {
            field: "WstPer", title: "WstPer", width: "150px", hidden: true,
            editor: function (container, options) {
                var model = options.model;
            }
        },
        {
            field: "WstQty", title: "WstQty", width: "150px", hidden: true,
            editor: function (container, options) {
                var model = options.model;
            }
        },
        {
            field: "UsagPer", title: "UsagPer", width: "150px", hidden: true,
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
            field: "CompFacPer", title: "CompFacPer", width: "150px", hidden: true,
            editor: function (container, options) {
                var model = options.model;
            }
        },

        {
            field: "AnlQty", title: "AnlQty", width: "150px",
            editor: function (container, options) {
                var model = options.model;
            }
        },
        {
            field: "ConvRate", title: "ConvRate", width: "150px", hidden: true,
            editor: function (container, options) {
                var model = options.model;
            }
        },
        {
            field: "TrnRate", title: "TrnRate", width: "150px", hidden: true,
            editor: function (container, options) {
                var model = options.model;
            }
        },
        //LineTotal
        {
            field: "LineTotal", title: "LineTotal", width: "150px", hidden: true,
            editor: function (container, options) {
                var model = options.model;
            }
        }
    ];

    var gridNo = "ItmCmpnGrid";
    var columnsFinal = setColumnProp(columnsDefine, viewBag.ObjKy, '', 'FormGrd', gridNo);

}



dblclickCreationOrdDetCmpn = function (e) {

    var id = ("#PrcsSchDetCmpnGrid");
    var grid = $(id).data().kendoGrid;
    var selectedItem = grid.dataItem(grid.select());

    if (selectedItem != "" && selectedItem != undefined && selectedItem != null) {
        var ItmKy = selectedItem.ItmKy;
        if (ItmKy != "" && ItmKy != undefined && ItmKy != null && ItmKy != "?") {

            LoadUnitCombo(ItmKy);
            GetItemQtyComponent();
            var LiNo = selectedItem.LiNo;
            var ItmCd = selectedItem.ItmCd;
            var ItmNm = selectedItem.ItmNm;
            var Qty = selectedItem.TrnQty;//qty
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

            var AnlQty = selectedItem.AnlQty;
            var ConvRate = selectedItem.ConvRate;
            var TrnRate = selectedItem.TrnRate;
            var LineTotal = selectedItem.LineTotal;
            

            $("#HdrSec1_NmricReqQty_Val").data("kendoNumericTextBox").value(ReqQty);
            $("#HdrSec1_NmricAnlQty_Val").data("kendoNumericTextBox").value(AnlQty);
            $("#HdrSec1_NmricConvRate_Val").data("kendoNumericTextBox").value(ConvRate);
            $("#HdrSec1_NmricTrnRate_Val").data("kendoNumericTextBox").value(TrnRate);
            $("#HdrSec1_NmricWstPer_Val").data("kendoNumericTextBox").value(WstPer);
            $("#HdrSec1_NmricWstQty_Val").data("kendoNumericTextBox").value(WstQty);
            $("#HdrSec1_NmricUsagPer_Val").data("kendoNumericTextBox").value(UsagPer);
            $("#HdrSec1_NmricTrnQty_Val").data("kendoNumericTextBox").value(TrnQty);
            $("#HdrSec1_NmricCompFacPer_Val").data("kendoNumericTextBox").value(CompFacPer);

        };
    }
}

$("#PrcsSchDetCmpnGrid").bind("dblclick", dblclickCreationOrdDetCmpn);

$("#PrcsSchDetCmpnGrid").on("keydown", function (event) {

    //alert(">>>e.which is :" + event.which + " and e.keyCode is:" + event.keyCode);
    if ((event.keyCode == 46) || (event.which == 46)) {

        var strconfirm = confirm("Are you sure you want to delete?");
        if (strconfirm == true) {
            var index = $("#PrcsSchDetCmpnGrid").data("kendoGrid").select().index(),
            dataItem = $("#PrcsSchDetCmpnGrid").data("kendoGrid").dataSource.view()[index];
            $("#PrcsSchDetCmpnGrid").data("kendoGrid").dataSource.remove(dataItem);
        }
    }

});


