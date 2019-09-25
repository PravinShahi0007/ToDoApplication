
var FormGlblData = {
    FormObjData: null,
    TrnTypKy: 1,
    AccessLvlKy: 1,
    ConfiLvlKy: 1,
    TrnKy: 1
}

$(document).ready(function () {

    //var todayDate = new Date();
    //$('#RevsnDt').data("kendoDatePicker").value(todayDate);
    //$("#GridWin").hide();
    //var height = $(window).height() - 70;
    //var h2 = $("#filterCont").height();
    //$("#body").height(height);
    //$("#grid").height(height - (35 + h2 + 40));
    //GetFormObjData();


    var PrjKy = 1

    $.ajax({
        url: GetCdKyByConCdAndOurCd,
        dataType: "json",
        type: "POST",
        data: JSON.stringify({
            ObjKy: viewBag.ObjKy,
            ConCd: 'TrnTyp',
            OurCd: viewBag.OurCd
        }),
        contentType: 'application/json; charset=utf-8',
        success: function (TrnTypKy) {
            FormGlblData.TrnTypKy = TrnTypKy;
            GetFormObjData();
        }
    });

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
    var h = $("#option").height();
    //var PaginationControlH = $("#idPager").height() + 37;
    //var height = ($(window).height()) - (70 + h + PaginationControlH);
    var height = ($(window).height()) - (10 + h);
    $("#ItemDiscountGrid").height(height);
    $("#ItemDiscountGrid").hide();
    setTimeout(setHdrSectionPropFun, 2000);
    LoadCombo();
    LoadDate();

}

function setHdrSectionPropFun() {
    // ---------- Set ObjProperties
    setHdrSectionProp('', viewBag.ObjKy, '', 'HdrSec1');
}

function insertItemDiscount() {
    var grid = $("#ItemDiscountGrid").data("kendoGrid").addRow();
}

function CancelItemDiscount() {
    var grid = $("#ItemDiscountGrid").data("kendoGrid").cancelChanges();
}


function LoadGridViewColumn() {
    try {
        $('#ItemDiscountGrid').data().kendoGrid.destroy();
        $('#ItemDiscountGrid').empty();
    } catch (e) { }

    var ItemDiscount_GridColumns =
        [

            { field: "ItmADKy", title: "ItmADKy", width: "70px", hidden: true },             
            { field: "PmtTrmKy", title: "Payment Term Key", width: "70px", hidden: true },
            {
                field: "PmtTrm", title: "Payment Term", width: "70px",
                editor: function (container, options) {
                    var model = options.model;
                    $('<input id="PmtTrm" value="' + options.field + '" name="' + options.field + '"/>').appendTo(container).kendoComboBox({
                        dataSource: Code_SelectMob_Datasource('PmtTrm'),
                        change: function (e) {
                            combo = e.sender;
                            selectedItm = combo.select();
                            dataItem = combo.dataItem(selectedItm);

                            var cmb = $("#PmtTrm").data("kendoComboBox");
                            var val = cmb.value();

                            if (isNaN(val)) {
                                alert("'" + val + "' is not a Valid input");
                                cmb.value("");
                                model.set("PmtTrmKy", 1);
                                model.set("PmtTrm", "");
                            }
                            else {
                                model.set("PmtTrmKy", dataItem.CdKy);
                                model.set("PmtTrm", dataItem.Code);
                            }


                        },
                        dataValueField: "CdKy",
                        dataTextField: "Code",
                        dataBound: function (e) {
                        }
                    });
                }
            },
            { field: "PmtModeKy", title: "PmtModeKy", width: "70px", hidden: true },
            {
                field: "PmtMode", title: "Payment Mode", width: "70px",
                editor: function (container, options) {
                    var model = options.model;
                    $('<input id="PmtMode" value="' + options.field + '" name="' + options.field + '"/>').appendTo(container).kendoComboBox({
                        dataSource: Code_SelectMob_Datasource('PmtMode'),
                        change: function (e) {
                            combo = e.sender;
                            selectedItm = combo.select();
                            dataItem = combo.dataItem(selectedItm);

                            var cmb = $("#PmtMode").data("kendoComboBox");
                            var val = cmb.value();

                            if (isNaN(val)) {
                                alert("'" + val + "' is not a Valid input");
                                cmb.value("");
                                model.set("PmtModeKy", 1);
                                model.set("PmtMode", "");
                            }
                            else {
                                model.set("PmtModeKy", dataItem.CdKy);
                                model.set("PmtMode", dataItem.Code);
                            }


                        },
                        dataValueField: "CdKy",
                        dataTextField: "Code",
                        dataBound: function (e) {
                        }
                    });
                }
            },
            { field: "ItmPriCatKy", title: "Item Discount", width: "70px" },
            {
                field: "ItmPriCat", title: "Item Price Category", width: "70px",
                editor: function (container, options) {
                    var model = options.model;
                    $('<input id="ItmPriCat" value="' + options.field + '" name="' + options.field + '"/>').appendTo(container).kendoComboBox({
                        dataSource: Code_SelectMob_Datasource('ItmPriCat'),
                        change: function (e) {
                            combo = e.sender;
                            selectedItm = combo.select();
                            dataItem = combo.dataItem(selectedItm);

                            var cmb = $("#ItmPriCat").data("kendoComboBox");
                            var val = cmb.value();

                            if (isNaN(val)) {
                                alert("'" + val + "' is not a Valid input");
                                cmb.value("");
                                model.set("ItmPriCatKy", 1);
                                model.set("ItmPriCat", "");
                            }
                            else {
                                model.set("ItmPriCatKy", dataItem.CdKy);
                                model.set("ItmPriCat", dataItem.Code);
                            }


                        },
                        dataValueField: "CdKy",
                        dataTextField: "Code",
                        dataBound: function (e) {
                        }
                    });
                }
            },
            { field: "AdrPriCatKy", title: "Address Discount", width: "70px" },
            {
                field: "AdrPriCat", title: "Address Price Category", width: "70px",
                editor: function (container, options) {
                    var model = options.model;
                    $('<input id="AdrPriCat" value="' + options.field + '" name="' + options.field + '"/>').appendTo(container).kendoComboBox({
                        dataSource: Code_SelectMob_Datasource('AdrPriCat'),
                        change: function (e) {
                            combo = e.sender;
                            selectedItm = combo.select();
                            dataItem = combo.dataItem(selectedItm);

                            var cmb = $("#AdrPriCat").data("kendoComboBox");
                            var val = cmb.value();

                            if (isNaN(val)) {
                                alert("'" + val + "' is not a Valid input");
                                cmb.value("");
                                model.set("AdrPriCatKy", 1);
                                model.set("AdrPriCat", "");
                            }
                            else {
                                model.set("AdrPriCatKy", dataItem.CdKy);
                                model.set("AdrPriCat", dataItem.Code);
                            }


                        },
                        dataValueField: "CdKy",
                        dataTextField: "Code",
                        dataBound: function (e) {
                        }
                    });
                }
            },
            { field: "PreDate", title: "Previous Date", width: "120px"},
            { field: "PreValue", title: "Pre Value (%)", width: "70px", template: '#= kendo.toString(PreValue, "n2")#', editable: false },
            { field: "Value", title: "% Value", width: "70px", template: '#= kendo.toString(Value, "n2")#' },
            { field: "EftvDt", title: "Effective Date", format: "{0:dd/MM/yyyy}", width: "50px" },
            { field: "TmStmp", title: "TmStmp", width: "70px", hidden: true },

                //{
                //    field: "isDet", title: "is Default", width: "70px",
                //    template: '<input type="checkbox"  #= isDet? "checked=checked" : "" # class="isDetPinChecked"></input>',
                //},

        ];
    var gridNo = 1;
    var FinalItmMasColumn = setColumnProp(ItemDiscount_GridColumns, viewBag.ObjKy, '', 'FormGrd', gridNo);
}

function LoadGridWithColumnProp(columnsFinal, gridNo) {

    var ItmPriCatKy = $('#HdrSec1_CmbItmPriCat_Cd').val();
    if (ItmPriCatKy == null || ItmPriCatKy == undefined || ItmPriCatKy == 0) ItmPriCatKy = 1
    var AdrPriCatKy = $('#HdrSec1_CmbAdrTyp_Cd').val();
    if (AdrPriCatKy == null || AdrPriCatKy == undefined || AdrPriCatKy == 0) AdrPriCatKy = 1
    var PmtTrmKy = $('#HdrSec1_CmbPmtTrm_Cd').val();
    if (PmtTrmKy == null || PmtTrmKy == undefined || PmtTrmKy == 0) PmtTrmKy = 1
    var PmtModeKy = $('#HdrSec1_CmbPmtMode_Cd').val();
    if (PmtModeKy == null || PmtModeKy == undefined || PmtModeKy == 0) PmtModeKy = 1
    var AdrKy = $('#HdrSec1_CmbAdr_Cd').val();
    if (AdrKy == null || AdrKy == undefined || AdrKy == 0) AdrKy = 1
    var Eftv = $('#EftvDt').val();

    if (gridNo == 1) {
        //alert(viewBag.ObjKy);
        // alert(FormGlblData.TrnTypKy);
        var griddataSource = new kendo.data.DataSource({
            transport: {
                read: {
                    url: URLLoadItemDiscountGrid,
                    dataType: "json"
                },

                parameterMap: function (options, operation) {

                    if (operation == "read") {
                        return ({
                            'ObjKy': Number(viewBag.ObjKy),
                            //'TrnTypKy': Number(FormGlblData.TrnTypKy),
                            'OurCd': viewBag.OurCd,
                            'ItmPriCatKy': Number(ItmPriCatKy),
                            'AdrPriCatKy': Number(AdrPriCatKy),
                            'PmtTrmKy': Number(PmtTrmKy),
                            'PmtModeKy': Number(PmtModeKy),
                            'AdrKy': Number(AdrKy),
                            'Eftv': Eftv
                            //ControlConKy getting from service....
                        });
                    }
                }
            },
            batch: true,
            pageSize: 20,
            schema: {
                model: {
                    id: "ItmADKy",
                    fields: //Relavent fields of the grid should be bind with following model items
                    {
                        ItmADKy: { editable: false, nullable: false, type: "number" },
                        EftvDt: { editable: false, nullable: false, type: "date", format: "{0:dd/MM/yyyy}" },
                        TmStmp: { editable: false, nullable: false, hidden: true },
                        Value: { editable: true, nullable: false, type: "number" },
                        PreValue: { editable: false, nullable: false, type: "number" },
                        PreDate: { editable: false, nullable: false, format: "{0:dd/MM/yyyy}"},
                        ItmPriCat: { editable: false, nullable: false },
                        ItmPriCatKy: { editable: false, nullable: false, type: "number", defaultValue: 1 },
                        AdrPriCat: { editable: false, nullable: false, defaultValue: "" },
                        AdrPriCatKy: { editable: false, nullable: false, type: "number", defaultValue: 1 },
                        PmtTrmKy: { editable: false, nullable: false, type: "number", defaultValue: 1 },
                        PmtTrm: { editable: false, nullable: false },
                        PmtModeKy: { editable: false, nullable: false, type: "number", defaultValue: 1 },
                        PmtMode: { editable: false, nullable: false }
                    }
                }
            }
        });

    }

    $("#ItemDiscountGrid").kendoGrid({
        dataSource: griddataSource,
        autobind: true,
        height: 500,
        navigatable: true,
        filterable: {
            mode: "row"
        },
        pageable: true,
        sortable: true,
        reorderable: true,
        //toolbar:[{name:"Create", text:"Add new record"},"Save", "Cancel"],
        columnMenu: true,
        selectable: "row",
        resizable: true,
        pageable: { refresh: true, pageSizes: [5, 10, 20, 50, 100, 500, 1000] },
        columns: columnsFinal,
        editable: true
    });
}

$('#ItemDiscountGrid').on('click', '.isDetPinChecked', function () {
    var checked = $(this).is(':checked');
    var grid = $('#ItemDiscountGrid').data().kendoGrid;
    var dataItem = grid.dataItem($(this).closest('tr'));
    if (dataItem != undefined) {
        dataItem.set('isDet', checked);
    }
});

function LoadCombo() {

    $("#HdrSec1_CmbPmtTrm_Cd").kendoComboBox({
        dataTextField: "Code",
        dataValueField: "CdKy",
        dataSource: Code_SelectMob_Datasource('HdrSec1_CmbPmtTrm'),
        filter: "startswith",
        change: function (e) {
            combo = e.sender;
            selectedItm = combo.select();
            dataItem = combo.dataItem(selectedItm);

            var cmb = $("#HdrSec1_CmbPmtTrm_Cd").data("kendoComboBox");
            var val = cmb.value();

            if (isNaN(val)) {
                alert("'" + val + "' is not a Valid input");
                cmb.value("");
            }
            else {
                var itmPriCatVal = $("#HdrSec1_CmbItmPriCat_Cd").val();
                if (itmPriCatVal == null || itmPriCatVal == undefined || itmPriCatVal == "" || itmPriCatVal == 1)
                    alert("Please Select \"Payment Term\"");
                else LoadGridViewColumn(); $("#ItemDiscountGrid").show();
            }
        },
        suggest: true,
        placeholder: "Select a Payment Term.."
    });

    $("#HdrSec1_CmbPmtMode_Cd").kendoComboBox({
        dataTextField: "Code",
        dataValueField: "CdKy",
        dataSource: Code_SelectMob_Datasource('HdrSec1_CmbPmtMode'),
        filter: "startswith",
        change: function (e) {
            combo = e.sender;
            selectedItm = combo.select();
            dataItem = combo.dataItem(selectedItm);

            var cmb = $("#HdrSec1_CmbPmtMode_Cd").data("kendoComboBox");
            var val = cmb.value();

            if (isNaN(val)) {
                alert("'" + val + "' is not a Valid input");
                cmb.value("");
            }
            else {
                var PmtMode = $("#HdrSec1_CmbItmPriCat_Cd").val();
                if (PmtMode == null || PmtMode == undefined || PmtMode == "" || PmtMode == 1)
                    alert("Please Select \"Payment Mode\"");
                else LoadGridViewColumn(); $("#ItemDiscountGrid").show();
            }
        },
        suggest: true,
        placeholder: "Select a Payment Mode.."
    });

    $("#HdrSec1_CmbAdr_Cd").kendoComboBox({
        dataTextField: "AdrNm",
        dataValueField: "AdrKy",
        dataSource: AdrNm_SelectMob_DataSource('HdrSec1_CmbAdr'),
        filter: "startswith",
        change: function (e) {
            combo = e.sender;
            selectedItm = combo.select();
            dataItem = combo.dataItem(selectedItm);

            var cmb = $("#HdrSec1_CmbAdr_Cd").data("kendoComboBox");
            var val = cmb.value();

            if (isNaN(val)) {
                alert("'" + val + "' is not a Valid input");
                cmb.value("");
            }
            else {
                var AdrVal = $("#HdrSec1_CmbItmPriCat_Cd").val();
                if (AdrVal == null || AdrVal == undefined || AdrVal == "" || AdrVal == 1)
                    alert("Please Select \"Address\"");
                else LoadGridViewColumn(); $("#ItemDiscountGrid").show();
            }
        },
        suggest: true,
        placeholder: "Select a Address.."
    });

    $("#HdrSec1_CmbItmPriCat_Cd").kendoComboBox({
        dataTextField: "Code",
        dataValueField: "CdKy",
        dataSource: Code_SelectMob_Datasource('HdrSec1_CmbItmPriCat'),
        filter: "startswith",
        change: function (e) {
            combo = e.sender;
            selectedItm = combo.select();
            dataItem = combo.dataItem(selectedItm);

            var cmb = $("#HdrSec1_CmbItmPriCat_Cd").data("kendoComboBox");
            var val = cmb.value();

            if (isNaN(val)) {
                alert("'" + val + "' is not a Valid input");
                cmb.value("");
            }
            else
                if (val == 1) alert("Please Select \"Item Price Category\"");
            else LoadGridViewColumn(); $("#ItemDiscountGrid").show();

        },
        suggest: true,
        placeholder: "Select a Item Price Category.."
    });
    
    $("#HdrSec1_CmbAdrTyp_Cd").kendoComboBox({
        
        dataTextField: "Code",
        dataValueField: "CdKy",
        dataSource: Code_SelectMob_Datasource('HdrSec1_CmbAdrTyp'),
        filter: "startswith",
        change: function (e) {
            combo = e.sender;
            selectedItm = combo.select();
            dataItem = combo.dataItem(selectedItm);

            var cmb = $("#HdrSec1_CmbAdrTyp_Cd").data("kendoComboBox");
            var val = cmb.value();

            if (isNaN(val)) {
                alert("'" + val + "' is not a Valid input");
                cmb.value("");
            }
            else
            {
                var itmPriCatVal = $("#HdrSec1_CmbItmPriCat_Cd").val();
                if (itmPriCatVal == null || itmPriCatVal == undefined || itmPriCatVal == "" || itmPriCatVal == 1)
                    alert("Please Select \"Item Price Category\"");
                else LoadGridViewColumn(); $("#ItemDiscountGrid").show();
                }

        },
        suggest: true,
        placeholder: "Select a Address Price Category .."
    });
}

function LoadDate() {
    $("#EftvDt")
    .kendoDatePicker({
        format: "dd/MM/yyyy",
        min: new Date(31, 2, 2009),
        change: EftvDateChange,
    });
    var todayDate = new Date();
    $('#EftvDt').data("kendoDatePicker").value(todayDate);

}

function EftvDateChange()
{
    LoadGridViewColumn();
}

function insertItemforItmDiscount() {   //---------- Insert a row inside Grid view----
    var grid = $("#ItemDiscountGrid").data("kendoGrid");
    grid.addRow();
}

function CancelGridItemforItmDiscount() {
    var grid = $("#ItemDiscountGrid").data("kendoGrid");
    grid.cancelChanges();
    //$("#grid").data("kendoGrid").cancelChanges();
}

//$(document.body).keydown(function (e) {
//    if (e.keyCode == 107 || (e.altKey && e.keyCode == 78)) {
//        e.preventDefault();
//        insertItemforItmDiscount();
//        //document.getElementById("FindFormGRN").style.overflow = "hidden";
//    }
//});

$(document.body).keydown(function (e) {
    if (e.ctrlKey && e.keyCode == 83) {
        e.preventDefault();
        Save();
    }
});

// Esc key to cancel
$(document.body).keydown(function (e) {
    if (e.keyCode == 27) {
        e.preventDefault();
        CancelGridItemforItmDiscount();
    }
});

$("#btnLoadItem").click(function () {
    var ItmPriCatKy = $('#HdrSec1_CmbItmPriCat_Cd').val();
    if (ItmPriCatKy == null || ItmPriCatKy == undefined || ItmPriCatKy == 0)
    {
        alert("Please Select Item Price Category");        
    }
    else {
        LoadGridViewColumn();
        $("#ItemDiscountGrid").show();
    }

});

function Save() {
    var grid = $("#ItemDiscountGrid").data("kendoGrid");
    var currentData = grid.dataSource.data();

    var updatedRecords = [];
    var newRecords = [];

    //var TrnTypKy = $('#HdrSec1_CmbTrnTyp_Cd').val();
    var ItmCatKy = $('#HdrSec1_CmbItmPriCat_Cd').val();
    if (ItmCatKy == null || ItmCatKy == undefined || ItmCatKy == "") ItmCatKy = 1;

    var AdrCatKy = $('#HdrSec1_CmbAdrTyp_Cd').val();
    if (AdrCatKy == null || AdrCatKy == undefined || AdrCatKy == "") AdrCatKy = 1;

    var AdrKy = $('#HdrSec1_CmbAdr_Cd').val();
    if (AdrKy == null || AdrKy == undefined || AdrKy == "") AdrKy = 1;

    var Eftv = $('#EftvDt').val();


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
            url: URLInsertUpdateItemDiscountGrid,
            data: JSON.stringify({
                ObjKy: viewBag.ObjKy,
                OurCd: viewBag.OurCd,
                AdrKy: AdrKy,
                Eftv: Eftv,
                updateDiscount: kendo.stringify(updatedRecords),
                newDiscount: kendo.stringify(newRecords)
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




//*************Grid combo load**************************

//editor: function (container, options) {
//    var model = options.model;
//    $('<input id="TrnTypKy" name="' + options.field + '"/>').appendTo(container).kendoComboBox({
//        dataSource:   ('TrnTypKy'), //Code_SelectMob_Datasource('TrnTypKy'),
//        change: function (e) {

//            combo = e.sender;
//            selectedItm = combo.select();
//            dataItem = combo.dataItem(selectedItm);

//            var cmb = $("#TrnTypKy").data("kendoComboBox");
//            var val = cmb.value();

//            if (isNaN(val)) {
//                alert("'" + val + "' is not a Valid input");
//                cmb.value("");
//                model.set("CdKy", 1);
//                model.set("TrnTypKy", "");
//            } else {
//                model.set("CdKy", dataItem.CdKy);
//                model.set("TrnTypKy", dataItem.Code);
//            }
//        },
//        dataValueField: "CdKy",
//        dataTextField: "Code"
//    });
//}

