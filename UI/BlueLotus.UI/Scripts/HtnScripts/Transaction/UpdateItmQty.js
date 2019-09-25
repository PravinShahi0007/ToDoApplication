
var FormGlblData = {
    FormObjData: null,
    AllDefalutValueObj: null,
    TrnTypKy: 1,
    AccessLvlKy: 1,
    ConfiLvlKy: 1,
    TrnKy: 1
}

$(document).ready(function () {

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
            FormGlblData.AllDefalutValueObj = Get_AllDefalutValue_Obj();
            DocReadyCus();
        }
    });
}
function DocReadyCus() {
    var h = $("#option").height();
    var height = ($(window).height()) - (10 + h);
    $("#UpdateItmQtyGrid").height(height);
    $("#UpdateItmQtyGrid").hide();
    $("#HdrSec2_NmricQty_Val").kendoNumericTextBox({ spinners: false });
    $("#HdrSec2_NmricLiNo_Val").kendoNumericTextBox({ min: 0, spinners: false });

    setTimeout(setHdrSectionPropFun, 100);
    LoadCombo();
    $("#HdrSec2").hide();
    Clear_AllDefalutValue_Obj();

}

function setHdrSectionPropFun() {
    setHdrSectionProp('', viewBag.ObjKy, '', 'HdrSec1');
    setHdrSectionProp('', viewBag.ObjKy, '', 'HdrSec2');
}

function insertItemDiscount() {
    var grid = $("#UpdateItmQtyGrid").data("kendoGrid").addRow();
}

function CancelItemDiscount() {
    $("#HdrSec2_NmricLiNo_Val").data("kendoNumericTextBox").value("");
    $("#HdrSec2_InptItem_Val").val("");
    $("#ItmNm").val("");
    $("#HdrSec2_NmricQty_Val").data("kendoNumericTextBox").value("");
    var grid = $("#UpdateItmQtyGrid").data("kendoGrid").cancelChanges();
}


function LoadGridViewColumn() {
    try {
        $('#UpdateItmQtyGrid').data().kendoGrid.destroy();
        $('#UpdateItmQtyGrid').empty();
    } catch (e) { }

    var ItemUpdateQty_GridColumns =
        [
            { field: "ItmTrnKy", title: "ItmTrnKy", width: "20px", hidden: true, attributes: { style: "text-align:center;" } },
            { field: "LiNo", title: "Line No", width: "70px", hidden: false, attributes: { style: "text-align:center;" } },
            { field: "ItmCd", title: "Item Code", width: "70px", hidden: false, attributes: { style: "text-align:center;" } },
            { field: "ItmNm", title: "Item Name", width: "70px", hidden: false, attributes: { style: "text-align:center;" } },
            { field: "Qty", title: "QTY (Now)", width: "70px", attributes: { style: "text-align:center;" } },
            { field: "NewQty", title: "QTY (New)", width: "70px", attributes: { style: "text-align:center;" } },
            { field: "TrnQty", title: "Trn QTY", width: "70px", hidden: true, attributes: { style: "text-align:center;" } },

        ];
    var gridNo = 1;
    var FinalItmMasColumn = setColumnProp(ItemUpdateQty_GridColumns, viewBag.ObjKy, '', 'FormGrd', gridNo);
}

function LoadGridWithColumnProp(columnsFinal, gridNo) {

    var TrnTyp = $('#HdrSec1_CmbTrnTyp_Cd').val();
    if (TrnTyp == null || TrnTyp == undefined || TrnTyp == 0) TrnTyp = 1

    var Prefix = $('#HdrSec1_CmbPrefix_Cd').val();
    if (Prefix == null || Prefix == undefined || Prefix == 0) Prefix = 1

    var TrnNo = $('#TrnNo').val();
    var ItmCd = $('#HdrSec2_InptItem_Val').val();


    if (gridNo == 1) {
        var griddataSource = new kendo.data.DataSource({
            transport: {
                read: {
                    url: URLLoadItemUpdateQtyGrid,
                    dataType: "json"
                },

                parameterMap: function (options, operation) {

                    if (operation == "read") {
                        return ({
                            'ObjKy': Number(viewBag.ObjKy),
                            'OurCd': viewBag.OurCd,
                            'TrnTypKy': Number(TrnTyp),
                            'PrefixKy': Number(Prefix),
                            'TrnNo': Number(TrnNo)
                        });
                    }
                }
            },
            batch: true,
            pageSize: 20,
            schema: {
                model: {
                    id: "ItmTrnKy",
                    fields: //Relavent fields of the grid should be bind with following model items
                    {
                        ItmTrnKy: { editable: false, nullable: false, type: "number" },
                        LiNo: { editable: false, nullable: false, type: "number" },
                        ItmCd: { editable: false, nullable: false, type: "string" },
                        ItmNm: { editable: false, nullable: false, type: "string" },
                        Qty: { editable: false, nullable: false, type: "number" },
                        NewQty: { editable: true, nullable: true, type: "number" },
                        TrnQty: { editable: false, nullable: true, type: "number" }
                    }
                }
            }
        });

    }

    $("#UpdateItmQtyGrid").kendoGrid({
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
        resizable: true,
        pageable: { refresh: true, pageSizes: [5, 10, 20, 50, 100, 500, 1000] },
        columns: columnsFinal,
        editable: true
    });
}


function LoadCombo() {

    $("#HdrSec1_CmbTrnTyp_Cd").kendoComboBox({
        dataTextField: "Code",
        dataValueField: "CdKy",
        dataSource: Code_SelectMob_Datasource('HdrSec1_CmbTrnTyp'),
        filter: "startswith",
        change: function (e) {
            combo = e.sender;
            selectedItm = combo.select();
            dataItem = combo.dataItem(selectedItm);

            var cmb = $("#HdrSec1_CmbTrnTyp_Cd").data("kendoComboBox");
            var val = cmb.value();

            if (isNaN(val)) {
                alert("'" + val + "' is not a Valid input");
                cmb.value("");
            }

        },
        suggest: true,
        placeholder: "TrnType"
    });

    function Code_Selectweb() {
        var dataSource = new kendo.data.DataSource(
         {
             transport: {
                 read: {
                     url: URLLoadPrefix,
                     data: { ConCd: "PreFix" },
                     dataType: "json",

                 }
             }
         });
        return dataSource;
    }

    $("#HdrSec1_CmbPrefix_Cd").kendoComboBox({
        dataValueField: "CdKy",
        dataTextField: "Code",
        dataSource: Code_Selectweb(),
        change: function (e) {

            var cmb = $("#HdrSec1_CmbPrefix_Cd").data("kendoComboBox");
            var val = cmb.value();

            if (isNaN(val)) {
                alert("'" + val + "' is not a Valid input");
                cmb.value("");
            }
        },
        filter: "startswith",
        suggest: true,
        placeholder: "Prefix"
    });

}

function Load()
{
    $('#HdrSec2_InptItem_Val').val("");
    $("#HdrSec2_NmricQty_Val").data("kendoNumericTextBox").value("");

    var TrnTyp = $('#HdrSec1_CmbTrnTyp_Cd').val();
    var Prefix = $('#HdrSec1_CmbPrefix_Cd').val();
    var TrnNo = $('#TrnNo').val();

    if (TrnTyp == null || TrnTyp == undefined || TrnTyp == 0 || TrnTyp == "") {
        alert("Please Select Transaction Type");
    }
    else if (Prefix == null || Prefix == undefined || Prefix == 0 || Prefix == "") {
        alert("Please Select Prefix");
    }
    else if (TrnNo == null || TrnNo == undefined || TrnNo == 0 || TrnNo == "") {
        alert("Please Type Transaction No");
    }
    else {
        LoadGridViewColumn();
        $("#UpdateItmQtyGrid").show();
        $("#HdrSec2").show();

    }
}

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
    Load();
});

function Save() {
    var grid = $("#UpdateItmQtyGrid").data("kendoGrid");
    var TrnTypKy = $("#HdrSec1_CmbTrnTyp_Cd").val();
    if (TrnTypKy == null || TrnTypKy == "" || TrnTypKy == undefined) TrnTypKy = 1;
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

        $.ajax({
            url: URLInsertUpdateItemUpdateQtyGrid,
            data: JSON.stringify({
                ObjKy: viewBag.ObjKy,
                OurCd: viewBag.OurCd,
                TrnTyp: TrnTypKy,
                updateRecords: kendo.stringify(updatedRecords),
                newRecords: kendo.stringify(newRecords)
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "Json",
            type: "POST",
            success: function (data) {

                if (data == true) {
                    alert("Successfully Updated!");
                    LoadGridViewColumn(); // update grid
                    Clear_AllDefalutValue_Obj(); // calling Default ComboBox value set Function
                } else {
                    alert("Record Not Updated!");
                    LoadGridViewColumn(); // update grid
                    Clear_AllDefalutValue_Obj(); // calling Default ComboBox value set Function
                }
            },
            error: function (e) {
                return false;
            }
        });

    }
}

$("#HdrSec2_NmricQty_Val").keydown(function (event) {
    var NowonItmCd = $("#HdrSec2_InptItem_Val").val();
    var NowQty = $("#HdrSec2_NmricQty_Val").val();
    var Found = 0;
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode == '13') {
        var LiNo = $("#HdrSec2_NmricLiNo_Val").data("kendoNumericTextBox").value();
        if (LiNo == 0 || LiNo == null || LiNo == undefined || LiNo == "") {
            var Grid = $("#UpdateItmQtyGrid").data().kendoGrid.dataSource.data();
            for (var i = 0; i < Grid.length; i++) {
                if (Grid[i].ItmCd == NowonItmCd) {
                    Found = 1;
                    Grid[i].set("NewQty", NowQty);
                    Grid[i].set("TrnQty", NowQty);

                    $("#HdrSec2_NmricLiNo_Val").data("kendoNumericTextBox").value("");
                    $("#HdrSec2_InptItem_Val").val("");
                    $("#ItmNm").val("");
                    $("#HdrSec2_NmricQty_Val").data("kendoNumericTextBox").value("");
                    document.getElementById("HdrSec2_InptItem_Val").focus();
                }
            }
            if (Found == 0) {
                alert("Item not Found for " + NowonItmCd);
                document.getElementById("HdrSec2_InptItem_Val").focus();
            }
        }
        else {
            setItmDetailbyEnterky();
        }
        event.preventDefault();
    }
});

function setItmDetailbyEnterky() {
    var NewQty = $("#HdrSec2_NmricQty_Val").val();
    var LiNo = $("#HdrSec2_NmricLiNo_Val").val();

    var GridData = $("#UpdateItmQtyGrid").data().kendoGrid.dataSource.data();
    var GridItem = GridData[LiNo - 1];//[count - LiNoForChange];

    GridItem.set("NewQty", NewQty);
    GridItem.set("TrnQty", NewQty);

    $("#HdrSec2_NmricLiNo_Val").data("kendoNumericTextBox").value("");
    $("#HdrSec2_InptItem_Val").val("");
    $("#ItmNm").val("");
    $("#HdrSec2_NmricQty_Val").data("kendoNumericTextBox").value("");
    document.getElementById("HdrSec2_InptItem_Val").focus();

}

$("#UpdateItmQtyGrid").bind("dblclick", "tr.k-state-selected", function () {
    var grid = $("#UpdateItmQtyGrid").data().kendoGrid;
    var selectedItem = grid.dataItem(grid.select());
    var ItmTrnKy = selectedItem.ItmTrnKy;
    if ((ItmTrnKy != "" || ItmTrnKy != undefined || ItmTrnKy != null) && (ItmTrnKy != "?")) {

        var liNo = selectedItem.LiNo;
        var ItmCd = selectedItem.ItmCd;
        var ItmNm = selectedItem.ItmNm;
        var qty = selectedItem.Qty;

        $("#HdrSec2_NmricLiNo_Val").data("kendoNumericTextBox").value(liNo);
        $("#HdrSec2_InptItem_Val").val(ItmCd);
        $("#ItmNm").val(ItmNm);
        $("#HdrSec2_NmricQty_Val").data("kendoNumericTextBox").value(qty);
    };
});

$("#TrnNo").keydown(function (event) {
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode == '13') {
        Load();
        document.getElementById("HdrSec2_InptItem_Val").focus();
        event.preventDefault();
    }

});

$("#HdrSec2_InptItem_Val").keydown(function (event) {
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode == '13') {
        $('#HdrSec2_NmricQty_Val').siblings('input:visible').focus();
        event.preventDefault();
    }
});
