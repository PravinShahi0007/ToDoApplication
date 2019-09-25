
var FormGlblDataForSerNo = {
    SerialNumber_Array: [],
    ItmKy: 1,
    ItmCd: "",
    ItmNm: "",
    OurCd: "",
    PrjKy:1
} 

function GetItmMasSerNoWindow(ItmKy, ItmCd, ItmNm, FieldTitle, FieldName, PrjKy) {
    if (PrjKy == null || PrjKy == "" || PrjKy == undefined) PrjKy = 1;
    FormGlblDataForSerNo.ItmKy = ItmKy;
    FormGlblDataForSerNo.ItmCd = ItmCd;
    FormGlblDataForSerNo.ItmNm = ItmNm;
    FormGlblDataForSerNo.PrjKy = PrjKy;

    $("#ItmMasSrlNoPartialView").show().kendoWindow({
        width: "1000px",
        height: "550px",
        modal: true,
        title: "Serial Numbers",

    });

    $("#ItmMasSrlNoPartialView").data("kendoWindow").center().open();
    document.getElementById('SrlNoPartialView_ItmLbl_Lbl').innerHTML = ItmCd + ' : ' + ItmNm;
    //alert(PrjKy);
    LoadSrlNo_Grid_WebViewColumn();
}

function SrlNoGridAdd() {
    var grid = $("#SrlNo_Grid_Web").data("kendoGrid").addRow();
}

function SrlNoGridCancel() {
    var grid = $("#SrlNo_Grid_Web").data("kendoGrid").cancelChanges();
}

function SrlNoPartialViewPopUpClose() {
    $('#ItmMasSrlNoPartialView').data('kendoWindow').close();
}

function SrlNoGridDone() {

    var gridData = $("#SrlNo_Grid_Web").data("kendoGrid").dataSource.data();
    for (var i = 0; i < gridData.length; i++) {
        //SupWrntyReading, CWrntyReading, CExpryDt

        FormGlblDataForSerNo.SerialNumber_Array.push({
            SerNoKy: gridData[i].SerNoKy,
            PrjHdrSerNoKy: gridData[i].PrjHdrSerNoKy,
            SerNo: gridData[i].SerNo,
            CSerNo: gridData[i].CSerNo,
            EngineNo: gridData[i].EngineNo,
            SupWrntyReading: gridData[i].SupWrntyReading,
            CWrntyReading: gridData[i].CWrntyReading,
            ItmKy: FormGlblDataForSerNo.ItmKy,
            SupExpryDt: gridData[i].SupExpryDt,
            CExpryDt: gridData[i].CExpryDt,
            VehicleNumber: gridData[i].VehicleNumber,
            isAct: (gridData[i].isAct == null || gridData[i].isAct == undefined || gridData[i].isAct == "" ? "false" : gridData[i].isAct),
            PrjKy: (FormGlblDataForSerNo.PrjKy == null || FormGlblDataForSerNo.PrjKy == undefined || FormGlblDataForSerNo.PrjKy == "" ? 1 : FormGlblDataForSerNo.PrjKy)
        });
    }

    SrlNoPartialViewPopUpClose();
}

function LoadSrlNo_Grid_WebViewColumn() {

    var ItemUpdateQty_GridColumns = [];
    var fields_ = {};

        ItemUpdateQty_GridColumns =
        [

            { field: "SerNoKy", title: "SerNoKy", width: "20px", hidden: true }, 
            { field: "PrjHdrSerNoKy", title: "PrjHdrSerNoKy", width: "20px", hidden: true }, 
            { field: "SerNo", title: "Serial No", width: "70px", hidden: false },
            { field: "CSerNo", title: "Cus Serial No", width: "70px", hidden: false },
            { field: "VehicleNumber", title: "Vehicle Number", width: "70px", hidden: false },
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
                format: "{0: dd/MM/yyyy}", hidden: false
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
                format: "{0: dd/MM/yyyy}", hidden: false
            },
            { field: "isAct", title: "IsAct", width: "70px", hidden: true},
            { field: "PrjKy", title: "PrjKy", width: "70px", hidden: true },
        ];

        fields_ = {
            SerNoKy: { editable: false, nullable: false, type: "number" }, 
            PrjHdrSerNoKy: { editable: false, nullable: false, type: "number" }, 
            SerNo: { editable: true, nullable: false },
            VehicleNumber: { editable: true, nullable: false},
            CSerNo: { editable: true, nullable: false },
            EngineNo: { editable: true, nullable: false },
            SupWrntyReading: { editable: true, nullable: false },
            CWrntyReading: { editable: true, nullable: false },
            SupExpryDt: { editable: true, nullable: true, type: "date" },
            CExpryDt: { editable: true, nullable: true, type: "date" },
            isAct: { editable: true, nullable: true, type: "boolean" },
            PrjKy: { editable: true, nullable: true },

        }

    try {
        $('#SrlNo_Grid_Web').data().kendoGrid.destroy();
        $('#SrlNo_Grid_Web').empty();
    } catch (e) { }

    var gridNo = 1;
    LoadSrlNo_Grid_WebWithColumnProp(ItemUpdateQty_GridColumns, gridNo, fields_);
}

function LoadSrlNo_Grid_WebWithColumnProp(columnsFinal, gridNo, fields_) {
    //isBoundCalledSerlNo = 0;
    if (gridNo == 1) {
        var griddataSource = new kendo.data.DataSource({
            transport: {
                read: {
                    url: urlItmMasSerNo_SelectWeb,
                    dataType: "json"
                },
                parameterMap: function (options, operation) {
                    if (operation == "read") {
                        return ({
                            'ItmKy': Number(FormGlblDataForSerNo.ItmKy),
                            'ObjKy': Number(viewBag.ObjKy),
                            'PrjKy': Number(FormGlblDataForSerNo.PrjKy),
                            'OurCd': viewBag.OurCd
                        });
                    }
                }
            },
            batch: true,
            pageSize: 20,
            schema: {
                model: {
                    id: "SerNoKy",
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
        //dataBound: onDataBoundSerialNo,
        resizable: true,
        pageable: { refresh: true, pageSizes: [5, 10, 20, 50, 100, 500, 1000] },
        columns: columnsFinal,
        editable: true
    });

}

function SaveItmMasSerNo() {
    if(FormGlblDataForSerNo.SerialNumber_Array == null || FormGlblDataForSerNo.SerialNumber_Array == [] || FormGlblDataForSerNo.SerialNumber_Array == "" || FormGlblDataForSerNo.SerialNumber_Array == "[]")
    return;
    $.ajax({
        url: urlItmMasSerNo_InsertUpdate,
        dataType: "json",
        type: "POST",
        data: JSON.stringify({
            SerNoListString: JSON.stringify(FormGlblDataForSerNo.SerialNumber_Array),
            OurCd: viewBag.OurCd
        }),
        contentType: 'application/json; charset=utf-8',
        success: function (data) {
            FormGlblDataForSerNo.SerialNumber_Array = [];
            alert("Serial Numbers Added Successfully!");
        }
    });
}