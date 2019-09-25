
var FormGlblData = {
    FormObjData: null,
    PrjTypKy: 1,
    AccessLvlKy: 1,
    ConfiLvlKy: 1,
    TrnKy: 1
}


$(document).ready(function () {
    
    var todayDate = new Date();
    $('#RevsnDt').data("kendoDatePicker").value(todayDate);
    $("#GridWin").hide();    
    var height = $(window).height() - 70;
    var h2 = $("#filterCont").height();
    $("#body").height(height);
    $("#grid").height(height - (35 + h2 + 40));

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


function DocReadyCus()
{
    setTimeout(setHdrSectionPropFun, 2000);
    LoadCombo();
}

function setHdrSectionPropFun()
{
    // ---------- Set ObjProperties
    setHdrSectionProp('', viewBag.ObjKy, '', 'HdrSec1');
}


jQuery.fn.center = function (parent)
{
    if (parent) {
        parent = this.parent();
    } else {
        parent = window;
    }
    this.css({
        "position": "absolute",
        "top": ((($(parent).height() - this.outerHeight()) / 2) + $(parent).scrollTop() + "px"),
        "left": ((($(parent).width() - this.outerWidth()) / 2) + $(parent).scrollLeft() + "px")
    });
    return this;
}

var ConrlConKy = 0;


$("#RevsnDt").width(200).kendoDatePicker({

    format: "dd/MM/yyyy",
    min: new Date(2009, 2, 31)
});
$("#RevsnDt").closest("span.k-datepicker").width(200);

$("#PresDt").width(200).kendoDatePicker({

    format: "dd/MM/yyyy",
    min: new Date(2009, 2, 31)
});
$("#PresDt").closest("span.k-datepicker").width(250);


function insertItem() {   //---------- Insert a row inside Grid view----
    var grid = $("#grid").data("kendoGrid");
    grid.addRow();
}

function CancelGridItem() {
    var grid = $("#grid").data("kendoGrid");
    grid.cancelChanges();
    //$("#grid").data("kendoGrid").cancelChanges();
}

//------------- Insert and Update Grid--------------
function Save() {
    var grid = $("#grid").data("kendoGrid");
    var LocKy = $("#HdrSec1_CmbLoc_Cd").val();
    if (LocKy == null || LocKy == undefined || LocKy == 0) {
        LocKy = 1;
    }
    var PrjKy = $("#HdrSec1_CmbPrj_Cd").val();
    if (PrjKy == null || PrjKy == undefined || PrjKy == 0) {
        PrjKy = 1;
    }
    var RevsnDt = $("#RevsnDt").val();
    var dt = RevsnDt.split("/");
    RevsnDt = dt[2] + "/" + dt[1] + "/" + dt[0];
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

    var tempSAveChech = true;

    if (newRecords.length != 0 || updatedRecords.length != 0) {

        if (tempSAveChech) {
            //ajax for unsert update and delete
            $.ajax({
                url: URLUpdateRate,
                data: JSON.stringify({
                    ObjKy: viewBag.ObjKy,
                    updateAccmacc: kendo.stringify(updatedRecords),
                    newAccmacc: kendo.stringify(newRecords),
                    OurCd: viewBag.OurCd,
                    LocKy: LocKy,
                    PrjKy: PrjKy,
                    RevsnDt: RevsnDt
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
}

function TrncDatasource() {
    var dataSource = new kendo.data.DataSource(
      {
          transport: {
              read: {
                  url: URLTrncDataSource,
                  dataType: "json"
              }
          }
      });
    return dataSource;
}

function PusFmDatasource() {
    var dataSource = new kendo.data.DataSource(
      {
          transport: {
              read: {
                  url: URLPusFmDatasource,
                  dataType: "json"
              }
          }
      });
    return dataSource;
}

function LocDatasource() {
    var dataSource = new kendo.data.DataSource(
      {
          transport: {
              read: {
                  url: URLLocDatasource,
                  dataType: "json"
              }
          }

      });
    return dataSource;
}

function ProjectDatasource() {
    var dataSource = new kendo.data.DataSource(
      {
          transport: {
              read: {
                  url: URLProjectDatasource,
                  dataType: "json"
              }
          }

      });
    return dataSource;
}

function ItmTypDatasource() {
    var dataSource = new kendo.data.DataSource(
      {
          transport: {
              read: {
                  url: URLItmTypDatasource,
                  dataType: "json"
              }
          }

      });
    return dataSource;
}

function LoadCombo() {
    $("#HdrSec1_CmbItmTyp_Cd").kendoComboBox({
        dataTextField: "Code",
        dataValueField: "CdKy",
        dataSource: Code_SelectMob_Datasource('HdrSec1_CmbItmTyp'),
        filter: "startswith",
        suggest: true,
        placeholder: "Select a project.."
    });

    $("#HdrSec1_CmbPrj_Cd").kendoComboBox({
        dataValueField: "PrjKy",
        dataTextField: "PrjId",
        dataSource: PrjId_SelectMob_DataSource('HdrSec1_CmbPrj'),
        filter: "startswith",
        suggest: true,
        hidden: true,
        placeholder: "Select a Project .."
    });

    $("#HdrSec1_CmbLoc_Cd").kendoComboBox({
        dataValueField: "CdKy",
        dataTextField: "Code",
        dataSource: Code_SelectMob_Datasource('HdrSec1_CmbLoc'),
        filter: "startswith",
        suggest: true,
        placeholder: "Select a Location .."
    });

    $("#cmbPusFm").kendoComboBox({
        dataValueField: "CKy",
        dataTextField: "Code",
        dataSource: PusFmDatasource(),
        filter: "startswith",
        suggest: true,
        placeholder: "Select a Purches Form.."
    });


    $("#cmbTrnTyp").kendoComboBox({
        dataValueField: "CdKy",
        dataTextField: "Code",
        dataSource: TrncDatasource(),
        filter: "startswith",
        suggest: true,
        placeholder: "Select a Trancstion Type.."
    });
    $("#HdrSec1_CmbAcc_Cd").kendoComboBox({
        dataValueField: "AccKy",
        dataTextField: "AccCd",
        dataSource: AccCd_SelectMob_Datasource('HdrSec1_CmbAcc'),
        filter: "startswith",
        suggest: true,
        placeholder: "Select a Location .."
    })

    $("#HdrSec1_CmbItmTyp_Cd").parent().css('width', "150px");
    $("#HdrSec1_CmbPrj_Cd").parent().css('width', "150px");
    $("#HdrSec1_CmbLoc_Cd").parent().css('width', "150px");
    $("#cmbPusFm").parent().css('width', "150px");
    $("#cmbTrnTyp").parent().css('width', "150px");
    $("#HdrSec1_CmbAcc_Cd").parent().css('width', "150px");
}


function ComboValidations(cmbNm) {

    var cmb = $("#" + cmbNm + "").data("kendoComboBox");
    var val = cmb.value();

    if (isNaN(val)) {
        alert("'" + val + "' is not a Valid input");
        $("#" + cmbNm + "").data('kendoComboBox').value("");
        return false;
    } else {
        return true;
    }
}

$("#btnLoadItem").click(function () {

    LoadGridViewColumn();
    $("#GridWin").show();

});

function DistroyGrid() {
    $("#grid").kendoGrid({
        dataSource: null
    });
}



$("#btnMsgs").click(function () {
    $("#menu").hide();
    $("#filterCont").hide();
    $("#messageBox").show();
    var height = $(window).height() - 70;//80 => 40px for header, 40px for footer
    var h1 = $("#messageBox").height() + 20;//20 for padding
    $("#grid").height(height - (h1 + 35));//buttons
    $(".k-grid-content").height((height - (h1)) - (26 + 65 + 34)); //26,65,34 grid colum header, grid tool bar, grid footer

});
$("#btnMenu").click(function () {
    $("#menu").show();
    $("#filterCont").hide();
    $("#messageBox").hide();
});

$("#btnMsgsExit").click(function () {
    $("#messageBox").toggle();
});
$("#btnMsgsExit2").click(function () {
    $("#messageBox").toggle();
});

$("#exit").click(function () {
    $("#menu").toggle();
});
$("#btnExitFilter").click(function () {
    $("#filterCont").toggle();
    var h2 = $("#filterCont").height();
    var height = $(window).height() - 70;
    $("#grid").height(height - 35);
    $(".k-grid-content").height((height) - (26 + 65 + 34));
    //alert((height + h2 + 20) - (26 + 65+35+80));
});

$("#btnFlt").click(function () {
    $("#menu").hide();
    $("#messageBox").hide();

    var height = $(window).height() - 70;
    var h2 = $("#filterCont").height();
    $("#body").height(height);
    var h1 = $("#body").height();
    //alert("body:"+h1+" filter:"+h2);
    var h = h1 - (35 + h2 + 20);
    $("#grid").height(h);
    $(".k-grid-content").height(h - (26 + 65));
});
$("#btnClearFilter").click(function () {
    $("#cmbPrjNm").data('kendoComboBox').value("");
    $("#cmbPrjId").data('kendoComboBox').value("");
    $("#cmbEmployee").data('kendoComboBox').value("");
    $("#cmbEmployeeAL").data('kendoComboBox').value("");
    $("#status").data('kendoComboBox').value("");
    $("#cmbPiority").data('kendoComboBox').value("");
    $("#toDotype").data('kendoComboBox').value("");
    $("#rcdDt").val("");
    $("#toDt").val("");
    $("#insrtDt").val("");
    $("#InsrtToDt").val("");
    $("#FrmNextActEnt").val("");
    $("#ToNextActEnt").val("");
    $('#grid').data().kendoGrid.destroy();
    $("#grid").empty();
});

function HideColumn(index) {
    var grid = $("#grid").data("kendoGrid");
    grid.hideColumn(index);
    $("#cbs" + index + "").attr('checked', false);
}

function ShowColumn(index) {
    var grid = $("#grid").data("kendoGrid");
    grid.showColumn(index);
    $("#cbh" + index + "").attr('checked', false);
}


//function GetControlCnKy() {
//    $.ajax({
//        url: URLGetControlCnKy,
//        data: JSON.stringify({
//            TblNm: "ItmRate", OurCd: "ItmSale"
//        }),
//    contentType: 'application/json; charset=utf-8',
//    dataType: "Json",
//    type: "POST",
//    success: function (data) {

//        for (i = 0; i < data.length; i++) {
//            ConrlConKy = data;
//            alert(ConrlConKy);
//            $("#GridWin").show();
//            //LoadGridView(75);
//        }
//        //LoadGridView(75);
//        LoadGridViewColumn(75);
//        $("#GridWin").show();
//    },
//    error: function (e) {
//        return false;
//    }
//});

//}

function ItmNm_SelectforItmRateDatasource() {
    var ItmTypKytemp = $("#HdrSec1_CmbItmTyp_Cd").val();

    var dataSource = new kendo.data.DataSource(
      {
          transport: {
              read: {
                  url: URLItmNm_SelectforItmRateDatasource,
                  data: {
                      ItmTypKy: ItmTypKytemp
                  },
                  dataType: "json"
              }
          }
      });
    return dataSource;
}

function deleteme(key) {
    var projKy = key;
    var answer = confirm("Confirm to delete this record");
    if (answer) {
        $.ajax({
            url: URLDeleteRate,
            dataType: "json",
            type: "POST",
            data: {
                'key': projKy,
            },
            success: function (data) {
                var grid = $("#grid").data("kendoGrid");
                grid.dataSource.read();
            },
            error: function (e) {

            }
        });
    }
}



$("#grid").on("keydown", function (event) {

    //alert(">>>e.which is :" + event.which + " and e.keyCode is:" + event.keyCode);
    if ((event.keyCode == 46) || (event.which == 46)) {
        var entityGrid = $("#grid").data("kendoGrid");
        var selectedItem = entityGrid.dataItem(entityGrid.select());
        deleteme(selectedItem.PrcsDetKy);
    }

});

$("#grid .k-grid-toolbar .k-grid-destroy").on("click", function (e) {
    alert("hi");
    e.preventDefault();
    //your logic
});


function LoadGridViewColumn()
{
    var ItmRateColumns = [

        { field: "ItmRateKy", title: "ItmRateKy", width: "70px", hidden: false },
                {
                    field: "PrjId", title: "PrjId", width: "100px", locked: true, hidden: false,
                    editor: function (container, options) {
                        var model = options.model;
                        $('<input id="PrjId" name="' + options.field + '"/>').appendTo(container).kendoComboBox({
                            dataSource: {
                                type: "POST",
                                transport: {
                                    read: URLGetPrjIDCmb,
                                }
                            },
                            change: function (e) {

                                combo = e.sender;
                                selectedItm = combo.select();
                                dataItem = combo.dataItem(selectedItm);

                                var cmb = $("#PrjId").data("kendoComboBox");
                                var val = cmb.value();

                                if (isNaN(val)) {
                                    alert("'" + val + "' is not a Valid input");
                                    cmb.value("");
                                    model.set("PrjId", "");
                                    model.set("PrjKy", 1);
                                } else {
                                    model.set("PrjId", dataItem.PrjID);
                                    model.set("PrjKy", dataItem.PrjKy);
                                }
                            },
                            dataValueField: "PrjKy",
                            dataTextField: "PrjID"
                        });
                    }
                },
                { field: "PrjKy", title: "PrjKy", width: "70px", hidden: true },
                { field: "ItmKy", title: "ItmKy", width: "70px", hidden: true }, // hidden: true },
                {
                    field: "ItemCode", title: "Item Code", width: "200px",
                    editor: function (container, options) {
                        var model = options.model;
                        //var ItmTypKytemp = $("#cmbItmTyp").val();
                        //alert(ItmtypKy + "  vv  " + ItmTypKytemp);
                        $('<input id="ItemCode" name="' + options.field + '"/>').appendTo(container).kendoComboBox({
                            dataSource: ItmNm_SelectforItmRateDatasource(),
                            change: function (e) {

                                combo = e.sender;
                                selectedItm = combo.select();
                                dataItem = combo.dataItem(selectedItm);

                                var cmb = $("#ItemCode").data("kendoComboBox");
                                var val = cmb.value();

                                if (isNaN(val)) {
                                    alert("'" + val + "' is not a Valid input");
                                    cmb.value("");
                                    model.set("ItemCode", "");
                                    model.set("ItmKy", 1);
                                } else {
                                    model.set("ItemCode", dataItem.ItmCd);
                                    model.set("ItmKy", dataItem.ItmKy);
                                    model.set("ItemNm", dataItem.ItmNm);
                                }
                            },
                            dataValueField: "ItmKy",
                            dataTextField: "ItmCd"
                        });
                    }
                },
                {
                    field: "ItemNm", title: "Item Name", width: "200px",
                    editor: function (container, options) {
                        var model = options.model;
                        $('<input id="ItemNm" name="' + options.field + '"/>').appendTo(container).kendoComboBox({
                            dataSource: ItmNm_SelectforItmRateDatasource(),
                            change: function (e) {

                                combo = e.sender;
                                selectedItm = combo.select();
                                dataItem = combo.dataItem(selectedItm);

                                var cmb = $("#ItemNm").data("kendoComboBox");
                                var val = cmb.value();

                                if (isNaN(val)) {
                                    alert("'" + val + "' is not a Valid input");
                                    cmb.value("");
                                    model.set("ItemNm", "");
                                    model.set("ItmKy", 1);
                                } else {
                                    model.set("ItemNm", dataItem.ItmNm);
                                    model.set("ItmKy", dataItem.ItmKy);
                                    model.set("ItemCode", dataItem.ItmCd);
                                }
                            },
                            dataValueField: "ItmKy",
                            dataTextField: "ItmNm"
                        });
                    }
                },
                { field: "UnitKy", title: "UnitKy", width: "70px", hidden: true },
                {
                    field: "Unit", title: "Unit", width: "70px",
                    editor: function (container, options) {
                        var model = options.model;
                        $('<input id="Unit" name="' + options.field + '"/>').appendTo(container).kendoComboBox({
                            dataSource: Code_SelectMob_Datasource('Unit'),
                            change: function (e) {

                                combo = e.sender;
                                selectedItm = combo.select();
                                dataItem = combo.dataItem(selectedItm);

                                var cmb = $("#LocationCode").data("kendoComboBox");
                                var val = cmb.value();

                                if (isNaN(val)) {
                                    alert("'" + val + "' is not a Valid input");
                                    cmb.value("");
                                    model.set("Unit", "");
                                    model.set("UnitKy", 1);
                                } else {
                                    model.set("Unit", dataItem.Code);
                                    model.set("UnitKy", dataItem.CdKy);
                                }
                            },
                            dataValueField: "CdKy",
                            dataTextField: "Code"
                        });
                    }
                },
                //{ field: "Unit", title: "Unit", width: "80px" },
                {
                    field: "LocationCode", title: "LocationCode", width: "80px",
                    editor: function (container, options) {
                        var model = options.model;
                        $('<input id="LocationCode" name="' + options.field + '"/>').appendTo(container).kendoComboBox({
                            dataSource: Code_SelectMob_Datasource('LocationCode'),
                            change: function (e) {

                                combo = e.sender;
                                selectedItm = combo.select();
                                dataItem = combo.dataItem(selectedItm);

                                var cmb = $("#LocationCode").data("kendoComboBox");
                                var val = cmb.value();

                                if (isNaN(val)) {
                                    alert("'" + val + "' is not a Valid input");
                                    cmb.value("");
                                    model.set("LocationCode", "");
                                    model.set("LocKy", 1);
                                } else {
                                    model.set("LocationCode", dataItem.Code);
                                    model.set("LocKy", dataItem.CdKy);
                                }
                            },
                            dataValueField: "CdKy",
                            dataTextField: "Code"
                        });
                    }
                },
    { field: "LocKy", title: "LocKy", width: "80px", hidden: true },
    {
        field: "Rate", title: "Rate", width: "60px",
        editor: function (container, options) {
            var model = options.model;

            $('<input data-bind="value:' + options.field + '"/>')
                .appendTo(container)
                .kendoNumericTextBox({
                    spinners: false,                    
                    decimals: 3,
                    min: 0,
                }).focus(function () {
                    var input = $(this);
                    setTimeout(function () {
                        input.select();
                    });
                });
        },
        attributes: { style: "background-color:rgb(192, 202, 219);" },
        //locked: true,
        //lockable: false
    },

    {
        field: "EftvDate", title: "Effective Date", width: "150px",
        editor: function (container, options) {
            var model = options.model;
            $('<input id="EftvDatetxt" name="' + options.field + '" data-value-field="' + options.field + '" data-bind="value:' + options.field + '" data-format="' + options.format + '"/>').appendTo(container).kendoDatePicker({
                change: function (e) {
                    // model.set("RedDt", e.sender._oldText);
                }
            });
        },
        format: "{0: dd/MM/yyyy}"
    },
    {
        field: "PreviousDate", title: "Previous Date", width: "150px",
        editor: function (container, options) {
            var model = options.model;
            $('<input id="PreviousDate" name="' + options.field + '" data-value-field="' + options.field + '" data-bind="value:' + options.field + '" data-format="' + options.format + '"/>').appendTo(container).kendoDatePicker({
                change: function (e) {
                    // model.set("RedDt", e.sender._oldText);
                }
            });
        },
        format: "{0: dd/MM/yyyy}"
    },
    { field: "PreviousRate", title: "Previous Rate", width: "150px", template: '#= kendo.toString(PreviousRate, "n2")#' },
    //{
    //    field: "isDisCont", title: "Is DisCont", width: "110px",
    //    template: '<input type="checkbox" #= isDisCont? "checked=checked" : "" # disabled="disabled" ></input>',
    //},
    { field: "EAN", title: "EAN", width: "100px", },
    { field: "ControlConKy", title: "ControlConKy", width: "110px", hidden: true, },
    { field: "OthTrnTypKy", title: "OthTrnTypKy", width: "100px", hidden: true },
    {
        field: "BU", title: "BU", width: "100px", hidden: false,
        editor: function (container, options) {
            var model = options.model;
            $('<input id="BU" name="' + options.field + '"/>').appendTo(container).kendoComboBox({
                dataSource: CdNm_SelectMob_Datasource('BU'),
                change: function (e) {

                    combo = e.sender;
                    selectedItm = combo.select();
                    dataItem = combo.dataItem(selectedItm);

                    var cmb = $("#BU").data("kendoComboBox");
                    var val = cmb.value();

                    if (isNaN(val)) {
                        alert("'" + val + "' is not a Valid input");
                        cmb.value("");
                        model.set("BU", "");
                        model.set("BUky", 1);
                    } else {
                        model.set("BU", dataItem.CdNm);
                        model.set("BUky", dataItem.CdKy);
                    }
                },
                dataValueField: "CdKy",
                dataTextField: "CdNm"
            });
        }
    },
    { field: "BUky", title: "BUky", width: "100px", hidden: true },
    {
        field: "AdrId", title: "AdrId", width: "100px", hidden: false,
        editor: function (container, options) {
            var model = options.model;
            $('<input id="AdrId" name="' + options.field + '"/>').appendTo(container).kendoComboBox({
                dataSource: AdrID_SelectMob_DataSource('AdrId'),
                change: function (e) {

                    combo = e.sender;
                    selectedItm = combo.select();
                    dataItem = combo.dataItem(selectedItm);

                    var cmb = $("#AdrId").data("kendoComboBox");
                    var val = cmb.value();

                    if (isNaN(val)) {
                        alert("'" + val + "' is not a Valid input");
                        cmb.value("");
                        model.set("AdrId", "");
                        model.set("AdrKy", 1);
                    } else {
                        model.set("AdrId", dataItem.AdrId);
                        model.set("AdrKy", dataItem.AdrKy);
                    }
                },
                dataValueField: "AdrKy",
                dataTextField: "AdrId"
            });
        }
    },
    { field: "AdrKy", title: "AdrKy", width: "100px", hidden: true },
    {
        field: "AccCd", title: "AccCd", width: "100px", hidden: false,
        editor: function (container, options) {
            var model = options.model;
            $('<input id="AccCd" name="' + options.field + '"/>').appendTo(container).kendoComboBox({
                dataSource: AccCd_SelectMob_Datasource('AccCd'),
                change: function (e) {

                    combo = e.sender;
                    selectedItm = combo.select();
                    dataItem = combo.dataItem(selectedItm);

                    var cmb = $("#AccCd").data("kendoComboBox");
                    var val = cmb.value();

                    if (isNaN(val)) {
                        alert("'" + val + "' is not a Valid input");
                        cmb.value("");
                        model.set("AccCd", "");
                        model.set("AccKy", 1);
                    } else {
                        model.set("AccCd", dataItem.AccCd);
                        model.set("AccKy", dataItem.AccKy);
                    }
                },
                dataValueField: "AccKy",
                dataTextField: "AccCd"
            });
        }
    },
    { field: "AccKy", title: "AccKy", width: "100px", hidden: true },
    { field: "ItemType", title: "Item Type", width: "100px", hidden: false },
    { field: "CKy", title: "CKy", width: "100px", hidden: true }

    ];    

    var gridNo = 1;    
    var FinalItmRateColumn = setColumnProp(ItmRateColumns, viewBag.ObjKy, '', 'FormGrd', gridNo);
}


function LoadGridWithColumnProp(columnsFinal, gridNo)
{
    if (gridNo == 1)
    {
        try {
            $('#grid').data().kendoGrid.destroy();
            $('#grid').empty();
        } catch (e) { }

        //var controlconky = GridData.ConrlConKy;
        var ItmtypKy = $("#HdrSec1_CmbItmTyp_Cd").val();
        if (ItmtypKy == "") { ItmtypKy = 1; }

        var PrjKy = $("#HdrSec1_CmbPrj_Cd").val();
        if (PrjKy == "") { PrjKy = 1; }

        var LocKy = $("#HdrSec1_CmbLoc_Cd").val();
        if (LocKy == "") { LocKy = 1; }

        var PursKy = $("#cmbPusFm").val();
        if (PursKy == "") { PursKy = 1; }

        var TrnTypKy = $("#cmbTrnTyp").val();
        if (TrnTypKy == "") { TrnTypKy = 1; }

        var PresDt = $("#PresDt").val();
        var RevsnDt = $("#RevsnDt").val();
        var AccKy = $("#HdrSec1_CmbAcc_Cd").val();
        if (AccKy == "") { AccKy = 1; }
        var dataSourceGrid = new kendo.data.DataSource({

            transport: {
                read: {
                    url: URLLoadGrid,
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
                            'PageNo': HTNPaginationCtrlData.PageNo,
                            'PageSize': HTNPaginationCtrlData.PageSize,
                            'ItmtypKy': ItmtypKy,
                            'PrjKy': PrjKy,
                            'LocKy': LocKy,
                            'PursKy': 1,
                            'TrnTypKy': 1,
                            'RevsnDt': RevsnDt,
                            'AccKy':AccKy,
                            'OurCd': viewBag.OurCd //GridData.ConrlConKy

                        });
                    }
                }
            },
            batch: true,
            pageSize: 15,
            schema: {
                model: {
                    id: "ItmRateKy ",
                    fields: //Relavent fields of the grid should be bind with following model items
                    {
                        ItmKy: { editable: false, nullable: false, type: "number" },
                        ItemCode: { editable: false, nullable: false, type: "string" },
                        ItemNm: { editable: false, nullable: false, validation: { required: true }, validation: { required: true }, type: "string" },

                        UnitKy: { editable: false, nullable: false, type: "string", hidden:true },
                        Unit: { editable: false, nullable: false, type: "string" },

                        LocationCode: { editable: false, nullable: false, type: "string" },
                        PreviousDate: { editable: false, nullable: true, type: "date" },
                        PreviousRate: { editable: false, nullable: false, type: "number" },
                        Rate: { editable: true, nullable: false, type: "number" },
                        ControlConKy: { editable: false, nullable: false, type: "number", },
                        EAN: { editable: false, nullable: false, type: "string" },
                        //ItmRateKy: { editable: true, nullable: false, type: "number" },
                        OthTrnTypKy: { editable: false, nullable: false, type: "number" },
                        LocKy: { editable: false, nullable: false, type: "number" },
                        EftvDate: { editable: false, nullable: false, type: "date" },
                        //TmStmp: { editable: true, nullable: false, type: "number" },
                        BUky: { editable: false, nullable: false, type: "number" },
                        AdrKy: { editable: false, nullable: false, type: "number" },
                        AccKy: { editable: false, nullable: false, type: "number" },
                        ItemType: { editable: false, nullable: false, },
                        PrjId: { editable: false, nullable: false, },
                        BU: { editable: false, nullable: false, },
                        AdrId: { editable: false, nullable: false, },
                        AccCd: { editable: false, nullable: false, },
                        CKy: { editable: false, nullable: false, type: "number" },
                        PrjKy: { editable: false, nullable: false, type: "number" },
                        //prjky



                    }
                }
            }
        });

        $("#grid").kendoGrid({
            dataSource: dataSourceGrid,
            //autobind: true,

            navigatable: true,
            filterable: {
                mode: "row"
            },
            groupable: true,
            pageable: true,
            sortable: true,
            reorderable: true,
            columnMenu: true,

            selectable: "row",
            pageable: { refresh: true, pageSizes: [5, 10, 20, 50, 100] },
            //toolbar: [{ name: "create", text: "Add new record" }, "save", "cancel"],

            columns: columnsFinal,

            resizable: true,

            editable: true
        });
    }
}


function setHdrSectionPropFun()
{
    setHdrSectionProp('', viewBag.ObjKy, '', 'HdrSec1');
}


