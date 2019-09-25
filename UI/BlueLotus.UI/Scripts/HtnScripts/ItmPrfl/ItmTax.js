var ItmTypKy = 0;
var ControlConKy = 0;
var ItmTaxTypKy = 1;
var FormGlblData = {
    FormObjData: null,
    AllDefalutValueObj: null,
    ItmKy: 1,
    ItmTypKy: 1,
    ItmTaxTypKy: 1,
    AccessLvlKy: 1,
    ConfiLvlKy: 1,
}

$(document).ready(function () {

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
            FormGlblData.AllDefalutValueObj = Get_AllDefalutValue_Obj();
            DocReadyCus();
        }
    });
}

function DocReadyCus() {
    setTimeout(setHdrSectionPropFun, 2000);
    LoadCombo();
    LoadDatePickers();

    $('#HdrSec1_ChkboxApplyAll_Val').attr('checked', false);

    $("#GridWin").show();
    LoadGridView();

}

function LoadDatePickers() {
    $("#HdrSec1_DatPicRevDate_Val")
        .kendoDatePicker({
            format: "dd/MM/yyyy",
            min: new Date(31, 2, 2009)
        });

    var todayDate = new Date();
    $("#HdrSec1_DatPicRevDate_Val").data("kendoDatePicker").value(todayDate);
}

function LoadCombo() {

    $("#HdrSec1_CmbItmTyp_Cd").kendoComboBox({
        dataValueField: "CdKy",
        dataTextField: "CdNm",
        dataSource: CdNm_SelectMob_Datasource('HdrSec1_CmbItmTyp'),
        //change: function (e) { },
        filter: "contains",
        suggest: true,
        placeholder: "Select Item Type.."
    });

    $("#HdrSec1_CmbTaxTyp_Cd").kendoComboBox({
        dataValueField: "CdKy",
        dataTextField: "CdNm",
        dataSource: CdNm_SelectMob_Datasource('HdrSec1_CmbTaxTyp'),
        //change: function (e) { },
        filter: "contains",
        suggest: true,
        placeholder: "Select Tax Type.."
    });    

    $("#HdrSec1_CmbDept_Cd").kendoComboBox({
        dataValueField: "CdKy",
        dataTextField: "CdNm",
        dataSource: CdNm_SelectMob_Datasource('HdrSec1_CmbDept'),
        change: function (e) { GetCat8ByCat7_SelectWeb(); },
        filter: "contains",
        suggest: true,
        placeholder: "Select Department.."
    });

    $("#HdrSec1_CmbVat_Cd").kendoComboBox({
        dataValueField: "CdKy",
        dataTextField: "CdNm",
        dataSource: CdNm_SelectMob_Datasource('HdrSec1_CmbVat'),
        //change: function (e) { },
        filter: "contains",
        suggest: true,
        placeholder: "Select vat%.."
    });

    $("#HdrSec1_CmbCat_Cd").kendoComboBox({
        dataValueField: "CdKy",
        dataTextField: "CdNm",
        dataSource: CdNm_SelectMob_Datasource('HdrSec1_CmbCat'),
        change: function (e) {
        },
        filter: "contains",
        suggest: true,
        placeholder: "Select Category.."
    });

}

function setHdrSectionPropFun() {

    // ---------- Set ObjProperties
    setHdrSectionProp('', viewBag.ObjKy, '', 'HdrSec1');

    SetHandlingEnterKeyEvent('', viewBag.ObjKy);
    SetFirstFocusObj();
    $("#HdrSec1_CmbItmTyp_Cd").focus();
}

function CancelGridItem() {
    var grid = $("#ItmTaxGrid").data("kendoGrid");
    grid.cancelChanges();
    $('#HdrSec1_ChkboxApplyAll_Val').attr('checked', false);
}


$("#btnLoadItem").click(function () {

    LoadGridView();
    //$("#GridWin").show();
});

$('#HdrSec1_ChkboxApplyAll_Val').click(function () {
    if ($('#HdrSec1_ChkboxApplyAll_Val').attr('checked', true)) {
        var Vat = $("#HdrSec1_CmbVat_Cd").data('kendoComboBox').value();
        var txtVat = $('#HdrSec1_CmbVat_Cd ').data('kendoComboBox').text(); 
        var length = $('#ItmTaxGrid table tr[role=row]').length;
        for (var i = 1; i < length; i++) {
            $("#ItmTaxGrid").data("kendoGrid").dataSource.data()[i-1].CdKy = Vat;
            $($($('#ItmTaxGrid table tr[role=row]')[i]).find("td")[5]).text(txtVat);
            $("#ItmTaxGrid").data("kendoGrid").dataSource.data()[i - 1].dirty = true;
        }
        //$("#ItmTaxGrid").data("kendoGrid").dataSource.sync();
    }
    else
    {
    }
})

$("#HdrSec1_InptItmCd_Val").keypress(function (event) {

    var keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode == '13') {
        $filter = new Array();
        $x = $("#HdrSec1_InptItmCd_Val").val();
        //$y = $("#HdrSec1_InptItmEAN_Val").val();
        if ($x != null) {
            //$filter.push({ field: "EAN", operator: "contains", value: $y });
            $filter.push({ field: "ItmCd", operator: "contains", value: $x });
        }
        $("#ItmTaxGrid").data("kendoGrid").dataSource.filter($filter);
    }
})



function LoadGridView() {

    var ItmTaxcolumns = [
            {
                field: "ItmKy", title: "Ref #", width: "10px", hidden: true, attributes: { style: "text-align:center;" },
            },

            {
                field: "ItmCd", title: "ItemCode", width: "100px", attributes: { style: "text-align:center;" },
                filterable: {
                    cell: {
                        operator: "contains",
                        suggestionOperator: "contains"
                    }
                },
            },
        {
            field: "ItmNm", title: "Item Name", width: "180px", attributes: { style: "text-align:center;" },
            filterable: {
                cell: {
                    operator: "contains",
                    suggestionOperator: "contains"
                }
            },

        },

                {
                    field: "PreviousDate", title: "Previous Date", width: "100px", attributes: { style: "text-align:center;" },                   
                },

                {
                    field: "PreviousVat", title: "Previous Vat%", width: "100px", attributes: { style: "text-align:center;" },
                    template: '#= kendo.toString(PreviousVat, "n2")#',
                },
                {
                    field: "Vat", title: "Vat%", width: "100px", attributes: { style: "text-align:center;" },
                    
                    //headerTemplate: "<input type='checkbox' id='chkSelectAll' onclick='checkAll(this)'/>",
                    editor: function (container, options) {
                        var model = options.model;
                        $('<input id="Vat" name="' + options.field + '"/>').appendTo(container).kendoComboBox({
                            dataSource: CdNm_SelectMob_Datasource('Vat'),
                            change: function (e) {

                                combo = e.sender;
                                selectedItm = combo.select();
                                dataItem = combo.dataItem(selectedItm);

                                var cmb = $("#Vat").data("kendoComboBox");
                                var val = cmb.value();

                                if (isNaN(val)) {
                                    alert("'" + val + "' is not a Valid input");
                                    cmb.value("");
                                    model.set("CdKy", 1);
                                    model.set("Vat", "");
                                } else {
                                    model.set("CdKy", dataItem.CdKy);
                                    model.set("Vat", dataItem.CdNm);
                                }
                            },
                            dataValueField: "CdKy",
                            dataTextField: "CdNm"
                        });
                    }
                },               

    ];
    var gridNo = 1;
    var FinalItmColumn = setColumnProp(ItmTaxcolumns, viewBag.ObjKy, '', 'FrmGrd', gridNo)
}

function LoadGridWithColumnProp(columnsFinal, gridNo) {

    var EftvDate = $("#HdrSec1_DatPicRevDate_Val").val();

    var ItmTypKy = $("#HdrSec1_CmbItmTyp_Cd").data('kendoComboBox').value();
    if (ItmTypKy == "") { ItmTypKy = 1; }
    var ItmTaxTypKy = $("#HdrSec1_CmbTaxTyp_Cd").data('kendoComboBox').value();
    if (ItmTaxTypKy == "") { ItmTaxTypKy = 1; }
    var Cat8Ky = $("#HdrSec1_CmbCat_Cd").data('kendoComboBox').value();
    if (Cat8Ky == "") { Cat8Ky = 1; }
    var Cat7Ky = $("#HdrSec1_CmbDept_Cd").data('kendoComboBox').value();
    if (Cat7Ky == "") { Cat7Ky = 1; }

    if (gridNo == 1) {
        try {
            $('#ItmTaxGrid').data().kendoGrid.destroy();
            $('#ItmTaxGrid').empty();
        } catch (e) { }

        var griddataSource = new kendo.data.DataSource({
            transport: {
                read: {
                    url: urlGetAllItemTax, // '@Url.Action("GetAllItemTax", "ItmTax")',
                    //contentType: 'application/json; charset=utf-8',
                    //data: {
                    //    ConCd: 'TRADING',
                    //    TypConCd: 'ItmTyp',
                    //    TypKy: ItmTypKy
                    //},
                    dataType: "json",
                    type: "POST",
                    //complete: function (data) { },
                },

                parameterMap: function (options, operation) {

                    if (operation == "read") {
                        return ({
                            'ItmTypKy': ItmTypKy,
                            'ItmTaxTypKy': ItmTaxTypKy,
                            'ObjKy': Number(viewBag.ObjKy),
                            'EftvDate': EftvDate,
                            'Cat8Ky': Cat8Ky,
                            'Cat7Ky': Cat7Ky,
                        })

                    }
                }

            },
            pageSize: 15,

            schema: {
                model: {
                    id: "ItmTaxKy",
                    fields: //Relavent fields of the grid should be bind with following model items
                    {
                        ItmKy: { editable: false, nullable: false, validation: { required: true }, type: "number" },
                        ItmCd: { editable: false, nullable: false, type: "string" },
                        ItmTypKy: { editable: false, nullable: false, type: "int" },
                        ItmTaxKy: { editable: false, nullable: false, type: "int" },
                        ItmTaxTypKy: { editable: false, nullable: false, type: "int" },
                        ItmNm: { editable: false, nullable: true, type: "string" },
                        EftvDate: { editable: false, nullable: false, type: "date" },
                        PreviousDate: { editable: false, nullable: false, type: "date" },
                        ControlConKy: { editable: false, nullable: false, type: "number" },
                        Vat: { editable: true, nullable: false, type: "number" },
                        PreviousVat: { editable: false, nullable: false, type: "number" },
                    }
                }
            }
        });


        $("#ItmTaxGrid").kendoGrid({
            dataSource: griddataSource,
            autobind: true,
            resizable: true,
            navigatable: true,
            sortable: true,
            reorderable: true,
            Scrollable: true,
            selectable: "row",
            pageable: {
                refresh: true, pageSizes: [5, 10, 20, 50, 100, 150]
            },
            columnMenu: true,
            //filterable:true,
            filterable: {
                mode: "row"
            },
            columns: columnsFinal,
            dataBinding: function () {
                record = (this.dataSource.page() - 1) * this.dataSource.pageSize();
            },

            editable: true
        });

    }
}

function Save() {
    var EftvDate = $("#HdrSec1_DatPicRevDate_Val").data("kendoDatePicker").value();
    var ItmTypKy = $("#HdrSec1_CmbItmTyp_Cd").data('kendoComboBox').value();
    if (ItmTypKy == null || ItmTypKy == "" || ItmTypKy == undefined) ItmTypKy = 0;

    var ItmTaxCatKy = $("#HdrSec1_CmbTaxTyp_Cd").data('kendoComboBox').value();
    if (ItmTaxCatKy == null || ItmTaxCatKy == "" || ItmTaxCatKy == undefined) ItmTaxCatKy = 0;


    var grid = $("#ItmTaxGrid").data("kendoGrid");

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
                url: urlUpdateItmTax, // '@Url.Content("~/ItmTax/UpdateItmTax")',
                data: JSON.stringify({
                    updateGrid: kendo.stringify(updatedRecords),
                    newGrid: kendo.stringify(newRecords),
                    ObjKy: viewBag.ObjKy,
                    ItmTypKy: ItmTypKy,
                    EftvDate: EftvDate,
                    ItmTaxCatKy: ItmTaxCatKy,
                    OurCd: viewBag.OurCd
                }),
                contentType: "application/json; charset=utf-8",
                dataType: "Json",
                type: "POST",
                success: function (data) {

                    if (data == true) {
                        alert("Successfully Saved..!");
                        $('#HdrSec1_ChkboxApplyAll_Val').attr('checked', false);
                        LoadGridView(); // update grid
                    } else {
                        alert("Record Not Saved");
                        LoadGridView(); // update grid
                    }
                },
                error: function (e) {
                    return false;
                }
            });
        }
    }
}

function GetCat8ByCat7_SelectWeb() {
    var Cat7Ky = $("#HdrSec1_CmbDept_Cd").data('kendoComboBox').value();

    $.ajax({
        url: urlGetCat8ByCat7_SelectWeb, //'@Url.Content("~/ComboLoad/GetCat8ByCat7_SelectWeb")',
        dataType: "json",
        type: "POST",
        data: JSON.stringify({
            Cat7Ky: Cat7Ky,
        }),

        contentType: 'application/json; charset=utf-8',
        success: function (data) {

            $("#HdrSec1_CmbCat_Cd").kendoComboBox({
                dataValueField: "CdKy",
                dataTextField: "CdNm",
                dataSource: data,
                //change: function (e) { },
                filter: "contains",
                suggest: true,
                placeholder: "Select Category.."

            });
        }

    });
}

