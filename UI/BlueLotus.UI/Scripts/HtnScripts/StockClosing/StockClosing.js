

var FormGlblData = {
    FormObjData: null,
    TrnTypKy: 1,
    AccessLvlKy: 1,
    ConfiLvlKy: 1,
    TrnKy: 1
}

$(document).ready(function () {

    var todayDate = new Date();
    //$('#RevsnDt').data("kendoDatePicker").value(todayDate);
    $("#ClosingStockGrid").hide();
    //var height = $(window).height() - 70;
    //var h2 = $("#filterCont").height();
    //$("#body").height(height);
    //$("#ClosingStockGrid").height(height - (35 + h2 + 40));

    GetFormObjData();

});

function GetFormObjData() {

    $.ajax({
        url: urlUsrObjPrp_SelectAllLastChildWeb,
        dataType: "json",
        type: "POST",
        data: JSON.stringify({
            PrntKy: viewBag.ObjKy
        }),
        contentType: 'application/json; charset=utf-8',
        success: function (HdrSectionFromDb) {

            FormGlblData.FormObjData = HdrSectionFromDb;
            DocReadyCus();
        }
    });
}


function DocReadyCus() {
    setTimeout(setHdrSectionPropFun, 2000);
    LoadCombo();
}

function setHdrSectionPropFun() {
    // ---------- Set ObjProperties
    setHdrSectionProp('', viewBag.ObjKy, '', 'HdrSec1');
}

$("#FrmDt").width(200).kendoDatePicker({

    format: "dd/MM/yyyy",
    min: new Date(2009, 2, 31)
});
$("#FrmDt").closest("span.k-datepicker").width(200);

$("#ToDt").width(200).kendoDatePicker({

    format: "dd/MM/yyyy",
    min: new Date(2009, 2, 31)
});
$("#ToDt").closest("span.k-datepicker").width(200);

var Now = new Date();
var dd = Now.getDate();
if (dd == 0) dd = 01;
var mm = Now.getMonth() + 1;
var yy = Now.getFullYear();
$("#FrmDt").val(dd + "/" + mm + "/" + yy);
$("#ToDt").val(dd + "/" + mm + "/" + yy);

function ShowGrid() {
    LoadGridViewColumn();
    $("#ClosingStockGrid").show();
}

function LoadCombo() {
    $("#HdrSec1_CmbOutlet_Cd").kendoComboBox({
        dataTextField: "AccCd",
        dataValueField: "AccKy",
        dataSource: AccCd_SelectMob_Datasource('HdrSec1_CmbOutlet'),
        change: function (e) {
            var cmb = $("#HdrSec1_CmbOutlet_Cd").data("kendoComboBox");
            var AccKyVal = cmb.value();
            if (AccKyVal != "" || AccKyVal != null || AccKyVal != undefined)
            {
                $("#HdrSec1_CmbOutlet_Nm").data("kendoComboBox").value(AccKyVal);
            }
            else {
                $("#HdrSec1_CmbOutlet_Nm").data("kendoComboBox").value(1);
            }
        },
        filter: "startswith",
        suggest: true,
        placeholder: "Select OutLet Code"
    });

    $("#HdrSec1_CmbOutlet_Nm").kendoComboBox({
        dataTextField: "AccNm",
        dataValueField: "AccKy",
        dataSource: AccNm_SelectMob_Datasource('HdrSec1_CmbOutlet'),
        change: function (e) {
            var cmb = $("#HdrSec1_CmbOutlet_Nm").data("kendoComboBox");
            var AccKyVal = cmb.value();
            if (AccKyVal != "" || AccKyVal != null || AccKyVal != undefined) {
                $("#HdrSec1_CmbOutlet_Cd").data("kendoComboBox").value(AccKyVal);
            }
            else {
                $("#HdrSec1_CmbOutlet_Cd").data("kendoComboBox").value(1);
            }
        },
        filter: "startswith",
        suggest: true,
        placeholder: "Select OutLet Name"
    });

}

function insertItem() {   //---------- Insert a row inside Grid view----
    var grid = $("#ClosingStockGrid").data("kendoGrid");
    grid.addRow();
}

function CancelGridItem() {
    var grid = $("#ClosingStockGrid").data("kendoGrid");
    grid.cancelChanges();
    //$("#grid").data("kendoGrid").cancelChanges();
}

function Save() {
    var grid = $("#ClosingStockGrid").data("kendoGrid");
    var AccKy = $("#HdrSec1_CmbOutlet_Cd").val();
    if (AccKy == null || AccKy == undefined || AccKy == 0)
    { AccKy = 1; }
    var FromDate = $("#FrmDt").val();
    var ToDate = $("#ToDt").val();

    var currentData = grid.dataSource.data();
    var updatedRecords = [];
    var newRecords = [];

    for (var i = 0; i < currentData.length; i++) {
        if (currentData[i].isNew()) {
            newRecords.push(currentData[i].toJSON());
        } else if (currentData[i].dirty) {
            updatedRecords.push(currentData[i].toJSON());
        }
    }

    if (newRecords.length != 0 || updatedRecords.length != 0) {

        //ajax for unsert update and delete
        $.ajax({
            url: URLInsertUpdateClosingStock,
            data: JSON.stringify({
                ObjKy: viewBag.ObjKy,
                updateAccmacc: kendo.stringify(updatedRecords),
                newAccmacc: kendo.stringify(newRecords),
                AccKy: AccKy,
                FrmDt: FromDate,
                ToDt: ToDate
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "Json",
            type: "POST",
            success: function (data) {

                if (data == true) {
                    alert("Successfully Saved..!");
                    LoadGridViewColumn(); // update grid
                } else {
                    alert("Record Not Saved");
                    LoadGridViewColumn(); // update grid
                }
            },
            error: function (e) {
                return false;
            }
        });
    }
}

function LoadGridViewColumn() {
    var ItmRateColumns = [

        { field: "PNSOLCBalKy", title: "PNSOLCBalKy", width: "70px", hidden: true },
        { field: "OutletKy", title: "AccKy", width: "70px", hidden: true }, // hidden: true },
        {
            field: "OutletCd", title: "OutletCode Code", width: "200px",
            editor: function (container, options) {
                var model = options.model;
                //var ItmTypKytemp = $("#cmbItmTyp").val();
                //alert(ItmtypKy + "  vv  " + ItmTypKytemp);
                $('<input id="OutletCd" name="' + options.field + '"/>').appendTo(container).kendoComboBox({
                    dataSource: AccCd_SelectMob_Datasource('OutletCd'),
                    change: function (e) {

                        combo = e.sender;
                        selectedItm = combo.select();
                        dataItem = combo.dataItem(selectedItm);

                        var cmb = $("#OutletCd").data("kendoComboBox");
                        var val = cmb.value();

                        if (isNaN(val)) {
                            alert("'" + val + "' is not a Valid input");
                            cmb.value("");
                            model.set("OutletCd", "");
                            model.set("OutletKy", 1);
                        } else {
                            model.set("OutletCd", dataItem.AccCd);
                            model.set("OutletKy", dataItem.AccKy);
                            //model.set("OutletNm", dataItem.AccNm);
                        }
                    },
                    dataValueField: "AccKy",
                    dataTextField: "AccCd"
                });
            }
        },
                {
                    field: "OutletNm", title: "Outlet Name", width: "200px",
                    editor: function (container, options) {
                        var model = options.model;
                        $('<input id="OutletNm" name="' + options.field + '"/>').appendTo(container).kendoComboBox({
                            dataSource: AccNm_SelectMob_Datasource('OutletNm'),
                            change: function (e) {

                                combo = e.sender;
                                selectedItm = combo.select();
                                dataItem = combo.dataItem(selectedItm);

                                var cmb = $("#OutletNm").data("kendoComboBox");
                                var val = cmb.value();

                                if (isNaN(val)) {
                                    alert("'" + val + "' is not a Valid input");
                                    cmb.value("");
                                    model.set("OutletNm", "");
                                    model.set("OutletKy", 1);
                                } else {
                                    model.set("OutletNm", dataItem.AccNm);
                                    model.set("OutletKy", dataItem.AccKy);
                                    //model.set("AccNm", dataItem.AccNm);
                                }
                            },
                            dataValueField: "AccKy",
                            dataTextField: "AccNm"
                        });
                    }
                },
    {
        field: "EftvDate", title: "Effective Date", format: "{0:dd/MM/yyyy}", width: "150px",
        //editor: function (container, options) {
        //    var model = options.model;
        //    $('<input id="EftvDatetxt" name="' + options.field + '" data-value-field="' + options.field + '" data-bind="value:' + options.field + '" data-format="' + options.format + '"/>').appendTo(container).kendoDatePicker({
        //        change: function (e) {
        //            // model.set("RedDt", e.sender._oldText);
        //        }
        //    });
        //},
        //format: "{0: dd-MM-yyyy}"
    },

    { field: "Amt", title: "Amount", width: "150px", template: '#= kendo.toString(Amt, "n2")#' },


    ];

    var gridNo = 1;
    var FinalItmRateColumn = setColumnProp(ItmRateColumns, viewBag.ObjKy, '', 'FormGrd', gridNo);
}


function LoadGridWithColumnProp(columnsFinal, gridNo) {
    if (gridNo == 1) {
        try {
            $('#ClosingStockGrid').data().kendoGrid.destroy();
            $('#ClosingStockGrid').empty();
        } catch (e) { }

        var AccKy = $("#HdrSec1_CmbOutlet_Cd").val();
        if (AccKy == null || AccKy == "" || AccKy == undefined)
            AccKy = 1;
        var FrmDt = $("#FrmDt").val();
        var ToDt = $("#ToDt").val();

        var dataSourceGrid = new kendo.data.DataSource({

            transport: {
                read: {
                    url: URLLoadGrid,
                    dataType: "json"
                },

                parameterMap: function (options, operation) {
                    if (operation == "read") {
                        return ({
                            'AccKy': AccKy,
                            'FrmDt': FrmDt,
                            'ToDt': ToDt
                        });
                    }
                }
            },
            batch: true,
            pageSize: 15,
            schema: {
                model: {
                    id: "PNSOLCBalKy ",
                    fields: //Relavent fields of the grid should be bind with following model items
                    {
                        OutletKy: { editable: true, nullable: false, type: "number" },
                        OutletCd: { editable: true, nullable: false},
                        OutletNm: { editable: true, nullable: false },
                        Amt: { editable: true, nullable: false, type: "number" },                        
                        EftvDate: { editable: true, nullable: false, type: "date", format: "{0:dd/MM/yyyy}" },
                        
                    }
                }
            }
        });

        $("#ClosingStockGrid").kendoGrid({
            dataSource: dataSourceGrid,
            //autobind: true,

            navigatable: true,
            filterable: {
                mode: "row"
            },
            pageable: true,
            sortable: true,
            reorderable: true,
            columnMenu: true,

            selectable: "row",
            pageable: { refresh: true, pageSizes: [5, 10, 20, 50, 100] },
            columns: columnsFinal,
            resizable: true,
            editable: true
        });
    }
}