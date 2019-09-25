function LoadMultiUnitGrid() {
    try {
        $('#MultiUnitGrid').data().kendoGrid.destroy();
        $('#MultiUnitGrid').empty();
    } catch (e) { }

    var cusColumns = [
            { field: "ItmUnitKy", title: "ItmUnitKy", hidden: true, width: '100px'},
            { field: "ItmKy", title: "ItmKy", hidden: true, width: '100px'},
            {
                field: "BaseUnit", title: "BaseUnit", width: '100px',
                locked: true,
                lockable: false,
                editor: function (container, options) {
                    var model = options.model;
                    var cncod = model.ConCd;
                    $('<input id="BaseUnit" name="' + options.field + '"/>').appendTo(container).kendoComboBox({
                        dataSource: UnitMas_SelectMob_Datasource(),
                        change: function (e) {
                            combo = e.sender;
                            selectedItm = combo.select();
                            dataItem = combo.dataItem(selectedItm);
                            model.set("BaseUnitKy", dataItem.UnitKy);
                            model.set("BaseUnit", dataItem.Unit);
                        },
                        dataValueField: "UnitKy",
                        dataTextField: "Unit",
                        dataBound: function (e) {
                        }
                    });
                }
            },
            { field: "BaseUnitConvRate", title: "BaseUnitConvRate", width: '100px' ,
                locked: true,
        lockable: false},
            {
                field: "eq", title: " ", template: '<label>=</label>', width: '25px',
                locked: true,
                lockable: false
            },

            {
                field: "Unit", title: "Unit", width: '100px',
                locked: true,
                lockable: false,
                editor: function (container, options) {
                    var model = options.model;
                    var cncod = model.ConCd;
                    $('<input id="Unit" name="' + options.field + '"/>').appendTo(container).kendoComboBox({
                        dataSource: UnitMas_SelectMob_Datasource(),
                        change: function (e) {

                            combo = e.sender;
                            selectedItm = combo.select();
                            dataItem = combo.dataItem(selectedItm);

                            model.set("UnitKy", dataItem.UnitKy);
                            model.set("Unit", dataItem.Unit);
                        },
                        dataValueField: "UnitKy",
                        dataTextField: "Unit",
                        dataBound: function (e) {
                        }
                    });
                }
            },
            {
                field: "UnitConvRate",
                title: "UnitConvRate", width: '100px',
                locked: true,
                lockable: false
            },
            {
                field: "isBaseUnit", title: "isBaseUnit", width: '100px',
                template: '<input type="checkbox"  #= isBaseUnit? "checked=checked" : "" # class="isBaseUnit" ></input>'
            },
            {
                field: "isPurchaseUnit", title: "isPurchaseUnit", width: '100px',
                template: '<input type="checkbox"  #= isPurchaseUnit? "checked=checked" :  "" # class="isPurchaseUnit" ></input>'
            },
            {
                field: "isSalesUnit", title: "isSalesUnit", width: '100px',
                template: '<input type="checkbox"  #= isSalesUnit? "checked=checked" : "" # class="isSalesUnit" ></input>'
            },
            {
                field: "isInvUnit", title: "isInvUnit", width: '100px',
                template: '<input type="checkbox"  #= isInvUnit? "checked=checked" : "" # class="isInvUnit" ></input>'
            },
            {
                field: "isAct",
                title: "isAct", width: '100px',
                template: '<input type="checkbox"  #= isAct? "checked=checked" : "" # class="isAct" ></input>'
            },
            {
                field: "Des",
                title: "Des", width: '100px'
            },
            {
                field: "isPurFractionUnit", title: "isPurFractionUnit", width: '100px',
                template: '<input type="checkbox"  #= isPurFractionUnit? "checked=checked" : "" # class="isPurFractionUnit" ></input>'
            },
            {
                field: "PurBulkUnit", title: "PurBulkUnit", width: '100px',
                template: '<input type="checkbox"  #= PurBulkUnit? "checked=checked" : "" # class="PurBulkUnit" ></input>'
            },
            {
                field: "PurInnerUnit", title: "PurInnerUnit", width: '100px',
                template: '<input type="checkbox"  #= PurInnerUnit? "checked=checked" : "" # class="PurInnerUnit" ></input>'
            },
            {
                field: "PurLooseUnit", title: "PurLooseUnit", width: '100px',
                template: '<input type="checkbox"  #= PurLooseUnit? "checked=checked" : "" # class="PurLooseUnit" ></input>'
            },
           
            {
                field: "isInvFractionUnit", title: "isInvFractionUnit", width: '100px',
                template: '<input type="checkbox"  #= isInvFractionUnit? "checked=checked" : "" # class="isInvFractionUnit" ></input>'
            },
            {
                field: "InvBulkUnit", title: "InvBulkUnit", width: '100px',
                template: '<input type="checkbox"  #= InvBulkUnit? "checked=checked" : "" # class="InvBulkUnit" ></input>',
            },
            {
                field: "InvInnerUnit", title: "InvInnerUnit", width: '100px',
                template: '<input type="checkbox"  #= InvInnerUnit? "checked=checked" : "" # class="InvInnerUnit" ></input>',
            },
            {
                field: "InvLooseUnit", title: "InvLooseUnit", width: '100px',
                template: '<input type="checkbox"  #= InvLooseUnit? "checked=checked" : "" # class="InvLooseUnit" ></input>',
            },
            
            {
                field: "isSaleFractionUnit", title: "isSaleFractionUnit", width: '100px',
                template: '<input type="checkbox"  #= isSaleFractionUnit? "checked=checked" : "" # class="isSaleFractionUnit" ></input>'
            },
            {
                field: "SaleBulkUnit", title: "SaleBulkUnit", width: '100px',
                template: '<input type="checkbox"  #= SaleBulkUnit? "checked=checked" : "" # class="SaleBulkUnit" ></input>'
            },
            {
                field: "SaleInnerUnit", title: "SaleInnerUnit", width: '100px',
                template: '<input type="checkbox"  #= SaleInnerUnit? "checked=checked" : "" # class="SaleInnerUnit" ></input>'
            },
            {
                field: "SaleLooseUnit", title: "SaleLooseUnit", width: '100px',
                template: '<input type="checkbox"  #= SaleLooseUnit? "checked=checked" : "" # class="SaleLooseUnit" ></input>'
            },

            {
                field: "isDefaultPurUnit", title: "isDefaultPurUnit", width: '100px',
                template: '<input type="checkbox"  #= isDefaultPurUnit? "checked=checked" : "" # class="isDefaultPurUnit" ></input>'
            },
            {
                field: "isDefaultInvUnit", title: "isDefaultInvUnit", width: '100px',
                template: '<input type="checkbox"  #= isDefaultInvUnit? "checked=checked" : "" # class="isDefaultInvUnit" ></input>'
            },
            {
                field: "isDefaultSaleUnit", title: "isDefaultSaleUnit", width: '100px',
                template: '<input type="checkbox"  #= isDefaultSaleUnit? "checked=checked" : "" # class="isDefaultSaleUnit" ></input>'
            },
           
    ];

    var gridNo = 1;
    var FinalItmMasColumn = setColumnProp(cusColumns, viewBag.ObjKy, '', 'FormGrd', gridNo);
    
}

function LoadGridWithColumnProp(columnsFinal, gridNo) {

    var dataSource = new kendo.data.DataSource({
        batch: true,
        pageSize: 10,
        schema: {
            model: {
                id: "",
                fields:
                {
                    ItmUnitKy: { editable: true, nullable: false, hidden: true, type: "number", defaultValue: 1 },
                    eq: { editable: false, nullable: false, type: "string" },
                    ItmKy: { editable: true, nullable: false, type: "number" },
                    BaseUnitKy: { editable: true, nullable: false, type: "number", defaultValue: 1 },
                    BaseUnit: { editable: true, nullable: false, type: "string" },
                    BaseUnitConvRate: { editable: true, nullable: false, type: "string" },
                    UnitKy: { editable: true, nullable: false, type: "number", defaultValue: 1 },
                    Unit: { editable: true, nullable: false, type: "string" },
                    UnitConvRate: { editable: true, nullable: false, type: "string" },
                    isBaseUnit: { editable: true, nullable: false, type: "boolean", defaultValue: true },
                    isPurchaseUnit: { editable: true, nullable: false, hidden: true, type: "boolean" },
                    isSalesUnit: { editable: true, nullable: false, type: "boolean" },
                    isInvUnit: { editable: true, nullable: false, type: "boolean", defaultValue: true },
                    isAct: { editable: true, nullable: false, type: "boolean" },
                    Des: { editable: true, nullable: false, hidden: true, type: "string" },

                    isPurFractionUnit: { editable: true, nullable: false, hidden: true, type: "boolean" },
                    PurBulkUnit: { editable: true, nullable: false, hidden: true, type: "boolean" },
                    PurInnerUnit: { editable: true, nullable: false, hidden: true, type: "boolean" },
                    PurLooseUnit: { editable: true, nullable: false, hidden: true, type: "boolean" },
                    isInvFractionUnit: { editable: true, nullable: false, hidden: true, type: "boolean" },
                    InvBulkUnit: { editable: true, nullable: false, hidden: true, type: "boolean" },
                    InvInnerUnit: { editable: true, nullable: false, hidden: true, type: "boolean" },
                    InvLooseUnit: { editable: true, nullable: false, hidden: true, type: "boolean" },
                    isSaleFractionUnit: { editable: true, nullable: false, hidden: true, type: "boolean" },
                    SaleBulkUnit: { editable: true, nullable: false, hidden: true, type: "boolean" },
                    SaleInnerUnit: { editable: true, nullable: false, hidden: true, type: "boolean" },
                    SaleLooseUnit: { editable: true, nullable: false, hidden: true, type: "boolean" },

                    isDefaultPurUnit: { editable: true, nullable: false, hidden: false, type: "boolean" },
                    isDefaultInvUnit: { editable: true, nullable: false, hidden: false, type: "boolean" },
                    isDefaultSaleUnit: { editable: true, nullable: false, hidden: false, type: "boolean" },


                }
            }
        },
    });

    $("#MultiUnitGrid").kendoGrid({
        dataSource: dataSource,
        sortable: true,
        autobind: true,
        navigatable: true,
        columnMenu: true,
        editable: true,
        scrollable: true,
        edit: function (e) {
            try {
                if (e.model.isNew() == false) {
                    var Baseunit = $("#BaseUnit").data("kendoComboBox");
                    Baseunit.enable(false);
                }
            } catch (e) { }
        },
        //height: '250px',
        pageSize: 10,
        pageable: true,
        selectable: "row",
        resizable: true,
        lockable: true,
        dataBound: GridOnDataBoundMulti,
        pageable: { refresh: true, pageSizes: [5, 10, 20, 50, 100] },
        columns: columnsFinal
    });

}

try{
var Baseunit = $("#BaseUnit").data("kendoComboBox");
Baseunit.enable(false);
}
catch(e){}


function UnitMas_SelectMob_Datasource() {
    var dataSource = new kendo.data.DataSource(
    {
        transport: {
            read: {
                url: UrlUnitMas_SelectMob_Datasource,
                data: {
                    ObjKy: 1,
                    TrnTypKy: 1,
                    PreKy: 1
                },
                dataType: "json"
            }
        }
    });
    return dataSource;
}

function GridOnDataBoundMulti(arg) {
    try {
        var Baseunit = $("#BaseUnit").data("kendoComboBox");
        Baseunit.enable(false);
    }
    catch (e) { }
}


$('#MultiUnitGrid').on('click', '.InvBulkUnit', function () {
    var checked = $(this).is(':checked');
    var grid = $('#MultiUnitGrid').data().kendoGrid;
    var dataItem = grid.dataItem($(this).closest('tr'));
    if (dataItem != undefined) {
        dataItem.set('InvBulkUnit ', checked);
    }
});
$('#MultiUnitGrid').on('click', '.InvInnerUnit', function () {
    var checked = $(this).is(':checked');
    var grid = $('#MultiUnitGrid').data().kendoGrid;
    var dataItem = grid.dataItem($(this).closest('tr'));
    if (dataItem != undefined) {
        dataItem.set('InvInnerUnit ', checked);
    }
});
$('#MultiUnitGrid').on('click', '.InvLooseUnit', function () {
    var checked = $(this).is(':checked');
    var grid = $('#MultiUnitGrid').data().kendoGrid;
    var dataItem = grid.dataItem($(this).closest('tr'));
    if (dataItem != undefined) {
        dataItem.set('InvLooseUnit ', checked);
    }
});

$('#MultiUnitGrid').on('click', '.PurBulkUnit', function () {
    var checked = $(this).is(':checked');
    var grid = $('#MultiUnitGrid').data().kendoGrid;
    var dataItem = grid.dataItem($(this).closest('tr'));
    if (dataItem != undefined) {
        dataItem.set('PurBulkUnit ', checked);
    }
});
$('#MultiUnitGrid').on('click', '.PurInnerUnit', function () {
    var checked = $(this).is(':checked');
    var grid = $('#MultiUnitGrid').data().kendoGrid;
    var dataItem = grid.dataItem($(this).closest('tr'));
    if (dataItem != undefined) {
        dataItem.set('PurInnerUnit ', checked);
    }
});
$('#MultiUnitGrid').on('click', '.PurLooseUnit', function () {
    var checked = $(this).is(':checked');
    var grid = $('#MultiUnitGrid').data().kendoGrid;
    var dataItem = grid.dataItem($(this).closest('tr'));
    if (dataItem != undefined) {
        dataItem.set('PurLooseUnit ', checked);
    }
});

$('#MultiUnitGrid').on('click', '.SaleBulkUnit', function () {
    var checked = $(this).is(':checked');
    var grid = $('#MultiUnitGrid').data().kendoGrid;
    var dataItem = grid.dataItem($(this).closest('tr'));
    if (dataItem != undefined) {
        dataItem.set('SaleBulkUnit ', checked);
    }
});
$('#MultiUnitGrid').on('click', '.SaleInnerUnit', function () {
    var checked = $(this).is(':checked');
    var grid = $('#MultiUnitGrid').data().kendoGrid;
    var dataItem = grid.dataItem($(this).closest('tr'));
    if (dataItem != undefined) {
        dataItem.set('SaleInnerUnit ', checked);
    }
});
$('#MultiUnitGrid').on('click', '.SaleLooseUnit', function () {
    var checked = $(this).is(':checked');
    var grid = $('#MultiUnitGrid').data().kendoGrid;
    var dataItem = grid.dataItem($(this).closest('tr'));
    if (dataItem != undefined) {
        dataItem.set('SaleLooseUnit ', checked);
    }
});



$('#MultiUnitGrid').on('click', '.isBaseUnit', function () {
    var checked = $(this).is(':checked');
    var grid = $('#MultiUnitGrid').data().kendoGrid;
    var dataItem = grid.dataItem($(this).closest('tr'));
    if (dataItem != undefined) {
        dataItem.set('isBaseUnit ', checked);
    }
});

$('#MultiUnitGrid').on('click', '.isPurchaseUnit', function () {
    var checked = $(this).is(':checked');
    var grid = $('#MultiUnitGrid').data().kendoGrid;
    var dataItem = grid.dataItem($(this).closest('tr'));
    if (dataItem != undefined) {
        dataItem.set('isPurchaseUnit ', checked);
    }
});
$('#MultiUnitGrid').on('click', '.isSalesUnit', function () {
    var checked = $(this).is(':checked');
    var grid = $('#MultiUnitGrid').data().kendoGrid;
    var dataItem = grid.dataItem($(this).closest('tr'));
    if (dataItem != undefined) {
        dataItem.set('isSalesUnit ', checked);
    }
});
$('#MultiUnitGrid').on('click', '.isInvUnit', function () {
    var checked = $(this).is(':checked');
    var grid = $('#MultiUnitGrid').data().kendoGrid;
    var dataItem = grid.dataItem($(this).closest('tr'));
    if (dataItem != undefined) {
        dataItem.set('isInvUnit ', checked);
    }
});
$('#MultiUnitGrid').on('click', '.isAct', function () {
    var checked = $(this).is(':checked');
    var grid = $('#MultiUnitGrid').data().kendoGrid;
    var dataItem = grid.dataItem($(this).closest('tr'));
    if (dataItem != undefined) {
        dataItem.set('isAct ', checked);
    }
});
$('#MultiUnitGrid').on('click', '.isPurFractionUnit', function () {
    var checked = $(this).is(':checked');
    var grid = $('#MultiUnitGrid').data().kendoGrid;
    var dataItem = grid.dataItem($(this).closest('tr'));
    if (dataItem != undefined) {
        dataItem.set('isPurFractionUnit ', checked);
    }
});
$('#MultiUnitGrid').on('click', '.isInvFractionUnit', function () {
    var checked = $(this).is(':checked');
    var grid = $('#MultiUnitGrid').data().kendoGrid;
    var dataItem = grid.dataItem($(this).closest('tr'));
    if (dataItem != undefined) {
        dataItem.set('isInvFractionUnit ', checked);
    }
});
$('#MultiUnitGrid').on('click', '.isSaleFractionUnit', function () {
    var checked = $(this).is(':checked');
    var grid = $('#MultiUnitGrid').data().kendoGrid;
    var dataItem = grid.dataItem($(this).closest('tr'));
    if (dataItem != undefined) {
        dataItem.set('isSaleFractionUnit ', checked);
    }
});

$('#MultiUnitGrid').on('click', '.isDefaultPurUnit', function () {
    var checked = $(this).is(':checked');
    var grid = $('#MultiUnitGrid').data().kendoGrid;
    var dataItem = grid.dataItem($(this).closest('tr'));
    if (dataItem != undefined) {
        dataItem.set('isDefaultPurUnit ', checked);
    }
});
$('#MultiUnitGrid').on('click', '.isDefaultInvUnit', function () {
    var checked = $(this).is(':checked');
    var grid = $('#MultiUnitGrid').data().kendoGrid;
    var dataItem = grid.dataItem($(this).closest('tr'));
    if (dataItem != undefined) {
        dataItem.set('isDefaultInvUnit ', checked);
    }
});
$('#MultiUnitGrid').on('click', '.isDefaultSaleUnit', function () {
    var checked = $(this).is(':checked');
    var grid = $('#MultiUnitGrid').data().kendoGrid;
    var dataItem = grid.dataItem($(this).closest('tr'));
    if (dataItem != undefined) {
        dataItem.set('isDefaultSaleUnit ', checked);
    }
});

function edit(e) {
    if (e.model.isNew() == false) {
        $("#BaseUnit").attr("readonly", true);
    }
}


function LoadMultiUnit(ItmKy, ItmCd, ItmNm) {

    $("#ItmMasmultiUnitPartialView").show().kendoWindow({
        width: "1000px",
        height: "550px",
        modal: true,
        title: "MultiUnit",

    });

    $("#ItmMasmultiUnitPartialView").data("kendoWindow").center().open();
    //ItmKy, ItmCd, ItmNm
    $("#HdrSec1_ItemMulti_Cd").data("kendoComboBox").value(ItmKy);
    $("#HdrSec1_ItemMulti_Nm").data("kendoComboBox").value(ItmKy);
    $("#HdrSec1_ItemMulti_Cd").data("kendoComboBox").trigger("change");
    $("#HdrSec1_ItemMulti_Cd").data("kendoComboBox").readonly(true);
    $("#HdrSec1_ItemMulti_Nm").data("kendoComboBox").readonly(true);

   // document.getElementById('SrlNoPartialView_ItmLbl_Lbl').innerHTML = ItmCd + ' : ' + ItmNm;

}