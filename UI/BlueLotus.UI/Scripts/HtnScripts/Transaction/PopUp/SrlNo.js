
var isBoundCalledSerlNo = 0;
function onDataBoundSerialNo(arg) {

    if (isBoundCalledSerlNo == 0) {
        isBoundCalledSerlNo = 1
        AddAditionalSerialNumberListToGrid();
    }
}

//.........................................
function LoadSrlNo_Grid_WebViewColumn() {

    var ItemUpdateQty_GridColumns = [];
    var fields_ = {};

    if (viewBag.OurCd == 'SALE' || viewBag.OurCd == 'TRFOUT' || viewBag.OurCd == 'SVatSALE' || viewBag.OurCd == 'NonVatSALE') {

        $("#srlNoAddBtn").hide();

        ItemUpdateQty_GridColumns =
        [
            { field: "ItmTrnKy", title: "ItmTrnKy", width: "20px", hidden: true },
            { field: "SerNoKy", title: "SerNoKy", width: "20px", hidden: true },
            { field: "LiNo", title: "Line No", width: "70px", hidden: true },
            { field: "SerNo", title: "Serial No", width: "70px", hidden: false },
            { field: "VehicleNumber", title: "Vehicle Number", width: "70px", hidden: false },
            { field: "CSerNo", title: "Cus Serial No", width: "70px", hidden: false },
            { field: "EngineNo", title: "Engine No", width: "70px", hidden: false },
            { field: "BatchNo", title: "Batch No", width: "70px" },
            { field: "SupWrntyReading", title: "Sup Wrnty Reading", width: "70px", hidden: false },
            { field: "CWrntyReading", title: "C Wrnty Reading", width: "70px", hidden: false },
            {
                field: "SupExpryDt", title: "Supplier Expry Date", width: "150px",
                editor: function (container, options) {
                    var model = options.model;
                    $('<input id="SupExpryDtTxt" name="' + options.field + '" data-value-field="' + options.field + '" data-bind="value:' + options.field + '" data-format="' + options.format + '"/>').appendTo(container).kendoDatePicker({
                        change: function (e) {

                        }
                    });
                },
                format: "{0: MM-dd-yyyy}", hidden: false
            },
            {
                field: "CExpryDt", title: "Customer Expry Date", width: "150px",
                editor: function (container, options) {
                    var model = options.model;
                    $('<input id="CExpryDtTxt" name="' + options.field + '" data-value-field="' + options.field + '" data-bind="value:' + options.field + '" data-format="' + options.format + '"/>').appendTo(container).kendoDatePicker({
                        change: function (e) {

                        }
                    });
                },
                format: "{0: MM-dd-yyyy}", hidden: false
            },
            {
                field: "isAct", title: "isAct", width: "100px", attributes: { style: "text-align:center;" },
                template: '<input type="checkbox"  #= isAct? "checked=checked" : "" # class="isActSerialPinChecked"></input>',
            }
        ];

        fields_ = {
            ItmTrnKy: { editable: false, nullable: false, type: "number" },
            SerNoKy: { editable: false, nullable: false, type: "number" },
            VehicleNumber: { editable: true, nullable: false, type: "number" },
            SerNo: { editable: false, nullable: false },
            CSerNo: { editable: true, nullable: false },
            EngineNo: { editable: true, nullable: false },
            BatchNo: { editable: true, nullable: false },
            SupWrntyReading: { editable: false, nullable: false },
            CWrntyReading: { editable: true, nullable: false },
            LiNo: { editable: false, nullable: false, type: "number" },
            SupExpryDt: { editable: false, nullable: true, type: "date" },
            CExpryDt: { editable: true, nullable: true, type: "date" },
            isAct: { editable: true, nullable: false, type: "boolean", defaultValue: false }
        }
    } else if (viewBag.OurCd == 'GRN') {

        $("#srlNoAddBtn").show();

        ItemUpdateQty_GridColumns =
        [
            { field: "ItmTrnKy", title: "ItmTrnKy", width: "20px", hidden: true },
            { field: "SerNoKy", title: "SerNoKy", width: "20px", hidden: true },
            { field: "LiNo", title: "Line No", width: "70px", hidden: true },
            { field: "SerNo", title: "Serial No", width: "70px", hidden: false },
            { field: "VehicleNumber", title: "Vehicle Number", width: "70px", hidden: false },
            { field: "CSerNo", title: "Cus Serial No", width: "70px", hidden: false },
            { field: "BatchNo", title: "Batch No", width: "70px",hidden: false },
            { field: "EngineNo", title: "Engine No", width: "70px", hidden: false },
            { field: "SupWrntyReading", title: "Sup Wrnty Reading", width: "70px", hidden: false },
            { field: "CWrntyReading", title: "C Wrnty Reading", width: "70px", hidden: false },
            {
                field: "SupExpryDt", title: "Supplier Expry Date", width: "150px",
                editor: function (container, options) {
                    var model = options.model;
                    $('<input id="SupExpryDtTxt" name="' + options.field + '" data-value-field="' + options.field + '" data-bind="value:' + options.field + '" data-format="' + options.format + '"/>').appendTo(container).kendoDatePicker({
                        change: function (e) {

                        }
                    });
                },
                format: "{0: MM-dd-yyyy}", hidden: false
            },
            {
                field: "CExpryDt", title: "Customer Expry Date", width: "150px",
                editor: function (container, options) {
                    var model = options.model;
                    $('<input id="CExpryDtTxt" name="' + options.field + '" data-value-field="' + options.field + '" data-bind="value:' + options.field + '" data-format="' + options.format + '"/>').appendTo(container).kendoDatePicker({
                        change: function (e) {

                        }
                    });
                },
                format: "{0: MM-dd-yyyy}", hidden: false
            },
            {
                field: "isAct", title: "isAct", width: "100px", attributes: { style: "text-align:center;" }, hidden: true,
                template: '<input type="checkbox"  #= isAct? "checked=checked" : "" # class="isActSerialPinChecked"></input>',
            }
        ];

        fields_ = {
            ItmTrnKy: { editable: false, nullable: false, type: "number" },
            SerNoKy: { editable: false, nullable: false, type: "number" },
            SerNo: { editable: true, nullable: false },
            VehicleNumber: { editable: true, nullable: false, type: "number" },
            CSerNo: { editable: true, nullable: false },
            EngineNo: { editable: true, nullable: false },
            BatchNo: { editable: true, nullable: false},
            SupWrntyReading: { editable: true, nullable: false },
            CWrntyReading: { editable: true, nullable: false },
            LiNo: { editable: false, nullable: false, type: "number" },
            SupExpryDt: { editable: true, nullable: true, type: "date" },
            CExpryDt: { editable: true, nullable: true, type: "date" },
            isAct: { editable: false, nullable: false, type: "boolean", defaultValue: false }
        }
    }

    try {
        $('#SrlNo_Grid_Web').data().kendoGrid.destroy();
        $('#SrlNo_Grid_Web').empty();
    } catch (e) { }

    var gridNo = 1;
    LoadSrlNo_Grid_WebWithColumnProp(ItemUpdateQty_GridColumns, gridNo, fields_);
}

function LoadSrlNo_Grid_WebWithColumnProp(columnsFinal, gridNo, fields_) {
    isBoundCalledSerlNo = 0;
    if (gridNo == 1) {
        var griddataSource = new kendo.data.DataSource({
            transport: {
                read: {
                    url: urlTransaction.SerialNo.ItmTrnSer_SelectWeb,
                    dataType: "json"
                },
                parameterMap: function (options, operation) {
                    if (operation == "read") {
                        return ({
                            'TrnTypKy': Number(FormGlblData.TrnTypKy),
                            'ItmKy': Number(serNoUpdateItm.Ky),
                            'ObjKy': Number(viewBag.ObjKy),
                            'ItmTrnKy': Number(serNoUpdateItm.ItmTrnKy == undefined ? 0 : serNoUpdateItm.ItmTrnKy)
                        });
                    }
                }
            },
            batch: true,
            pageSize: 20,
            schema: {
                model: {
                    id: "ItmTrnKy",
                    fields: fields_
                }
            }
        });
    }

    $("#SrlNo_Grid_Web").kendoGrid({
        dataSource: griddataSource,
        autobind: true,
        height: 385,
        navigatable: true,
        filterable: {
            mode: "row"
        },
        pageable: true,
        sortable: true,
        reorderable: true,
        columnMenu: true,
        selectable: "row",
        dataBound: onDataBoundSerialNo,
        resizable: true,
        pageable: { refresh: true, pageSizes: [5, 10, 20, 50, 100, 500, 1000] },
        columns: columnsFinal,
        editable: true
    });

}

function AddAditionalSerialNumberListToGrid() {

    var isFirtLoadSerNoUpdate = 0;

    var grid = $("#SrlNo_Grid_Web").data("kendoGrid");
    var dataSource = grid.dataSource;

    if (FormGlblData.Detail_Editing_LiNo > 0) {

        for (var i = 0; i < FormGlblData.SerialNumber_Array.length; i++) {
            if (FormGlblData.SerialNumber_Array[i].LiNo == FormGlblData.Detail_Editing_LiNo) {

                if (isFirtLoadSerNoUpdate == 0) {
                    isFirtLoadSerNoUpdate = 1;
                    dataSource.data([]);
                }

                dataSource.add({
                    ItmTrnKy: FormGlblData.SerialNumber_Array[i].ItmTrnKy,
                    SerNoKy: FormGlblData.SerialNumber_Array[i].SerNoKy,
                    SerNo: FormGlblData.SerialNumber_Array[i].SerNo,
                    CSerNo: FormGlblData.SerialNumber_Array[i].CSerNo,
                    EngineNo: FormGlblData.SerialNumber_Array[i].EngineNo,
                    SupWrntyReading: FormGlblData.SerialNumber_Array[i].SupWrntyReading,
                    CWrntyReading: FormGlblData.SerialNumber_Array[i].CWrntyReading,
                    LiNo: FormGlblData.SerialNumber_Array[i].LiNo,
                    SupExpryDt: FormGlblData.SerialNumber_Array[i].SupExpryDt,
                    CExpryDt: FormGlblData.SerialNumber_Array[i].CExpryDt,
                    isAct: FormGlblData.SerialNumber_Array[i].isAct
                });
            }
        }
    }

}