
var FormGlblData = {
    FormObjData: null,
    ItmTypKy: 1,
    AccessLvlKy: 1,
    ConfiLvlKy: 1,
    TrnKy: 1
}


$(document).ready(function () {

    $.ajax({
        url: urlCodes.GetCdKyByConCdAndOurCd,
        dataType: "json",
        type: "POST",
        data: JSON.stringify({
            ObjKy: viewBag.ObjKy,
            ConCd: 'ItmTyp',
            OurCd: viewBag.OurCd
        }),
        contentType: 'application/json; charset=utf-8',
        success: function (ItmTypKy) {

            FormGlblData.ItmTypKy = ItmTypKy;
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
    var height = ($(window).height()) - (130 + h);
    $("#NonCompanyItemsGrid").height(height);

    Load_NonCompanyItemsGrid();

}

function Load_NonCompanyItemsGrid() {
    try {
        $('#NonCompanyItemsGrid').data().kendoGrid.destroy();
        $('#NonCompanyItemsGrid').empty();
    } catch (e) { }

    var ItmMasColumn = [

        { field: "ItmKy", title: "Ref #", width: "100px" },
        { field: "ItmCd", title: "Item Cd", width: "150px", },
        { field: "ItmNm", title: "Item Name", width: "150px", },
        {
            field: "Unit", title: "Unit", width: "100px",
            editor: function (container, options) {
                var model = options.model;
                $('<input id="cmbUnitKy" name="' + options.field + '"/>').appendTo(container).kendoComboBox({
                    dataSource: {
                        type: "POST",
                        transport: {
                            read: {
                                url: URLUnitCmbLoad,
                            }
                        }
                    },
                    change: function (e) {
                        combo = e.sender;
                        selectedItm = combo.select();
                        dataItem = combo.dataItem(selectedItm);

                        var cmb = $("#cmbUnitKy").data("kendoComboBox");
                        var val = cmb.value();

                        if (isNaN(val)) {
                            alert("'" + val + "' is not a Valid input");
                            cmb.value("");
                            model.set("UnitKy", 1);
                            model.set("Unit", "");
                        }
                        else {
                            model.set("UnitKy", dataItem.UnitKy);
                            model.set("Unit", dataItem.Unit);
                        }
                    },
                    dataValueField: "UnitKy",
                    dataTextField: "Unit",
                    dataBound: function (e) {
                    }
                });
            }
        },
        { field: "UnitKy", title: "UnitKy", width: "150px", hidden: true },
        {
            field: "Cat1Cd", title: "Item Cat1", width: "120px",
            editor: function (container, options) {
                var model = options.model;
                $('<input id="cmbCat1Cd" name="' + options.field + '"/>').appendTo(container).kendoComboBox({
                    dataSource: Code_SelectMob_Datasource('Cat1Cd'),
                    change: function (e) {
                        combo = e.sender;
                        selectedItm = combo.select();
                        dataItem = combo.dataItem(selectedItm);

                        var cmb = $("#cmbCat1Cd").data("kendoComboBox");
                        var val = cmb.value();

                        if (isNaN(val)) {
                            alert("'" + val + "' is not a Valid input");
                            cmb.value("");
                            model.set("ItmCat1Ky", 1);
                            model.set("Cat1Cd", "");
                        }
                        else {
                            model.set("ItmCat1Ky", dataItem.CdKy);
                            model.set("Cat1Cd", dataItem.Code);
                        }
                    },
                    dataValueField: "CdKy",
                    dataTextField: "Code",
                    dataBound: function (e) {
                    }
                });
            }
        },

        {
            field: "Cat2Cd", title: "Item Cat2", width: "120px",
            editor: function (container, options) {
                var model = options.model;
                $('<input id="cmbCat2Cd" name="' + options.field + '"/>').appendTo(container).kendoComboBox({
                    dataSource: Code_SelectMob_Datasource('Cat2Cd'),
                    change: function (e) {
                        combo = e.sender;
                        selectedItm = combo.select();
                        dataItem = combo.dataItem(selectedItm);

                        var cmb = $("#cmbCat2Cd").data("kendoComboBox");
                        var val = cmb.value();

                        if (isNaN(val)) {
                            alert("'" + val + "' is not a Valid input");
                            cmb.value("");
                            model.set("ItmCat2Ky", 1);
                            model.set("Cat2Cd", "");
                        }
                        else {
                            model.set("ItmCat2Ky", dataItem.CdKy);
                            model.set("Cat2Cd", dataItem.Code);
                        }
                    },
                    dataValueField: "CdKy",
                    dataTextField: "Code",
                    dataBound: function (e) {
                    }
                });
            }
        },

        {
            field: "Cat3Cd", title: "Item Cat3", width: "100px",
            editor: function (container, options) {
                var model = options.model;
                $('<input id="cmbCat3Cd" value="' + options.field + '" name="' + options.field + '"/>').appendTo(container).kendoComboBox({
                    dataSource: Code_SelectMob_Datasource('Cat3Cd'),
                    change: function (e) {
                        combo = e.sender;
                        selectedItm = combo.select();
                        dataItem = combo.dataItem(selectedItm);

                        var cmb = $("#cmbCat3Cd").data("kendoComboBox");
                        var val = cmb.value();

                        if (isNaN(val)) {
                            alert("'" + val + "' is not a Valid input");
                            cmb.value("");
                            model.set("ItmCat3Ky", 1);
                            model.set("Cat3Cd", "");
                        }
                        else {
                            model.set("ItmCat3Ky", dataItem.CdKy);
                            model.set("Cat3Cd", dataItem.Code);
                        }
                    },
                    dataValueField: "CdKy",
                    dataTextField: "Code",
                    dataBound: function (e) {
                    }
                });
            }
        },

        {
            field: "Cat4Cd", title: "Item Cat4", width: "100px",
            editor: function (container, options) {
                var model = options.model;

                $('<input id="cmbCat4Cd" name="' + options.field + '"/>').appendTo(container).kendoComboBox({
                    dataSource: Code_SelectMob_Datasource('Cat4Cd'),
                    change: function (e) {
                        combo = e.sender;
                        selectedItm = combo.select();
                        dataItem = combo.dataItem(selectedItm);

                        var cmb = $("#cmbCat4Cd").data("kendoComboBox");
                        var val = cmb.value();

                        if (isNaN(val)) {
                            alert("'" + val + "' is not a Valid input");
                            cmb.value("");
                            model.set("ItmCat4Ky", 1);
                            model.set("Cat4Cd", "");
                        }
                        else {
                            model.set("ItmCat4Ky", dataItem.CdKy);
                            model.set("Cat4Cd", dataItem.Code);
                        }
                    },
                    dataValueField: "CdKy",
                    dataTextField: "Code",
                    dataBound: function (e) {
                    }
                });
            }
        },
        {
            field: "Cat5Cd", title: "Item Cat5", width: "100px",
            editor: function (container, options) {
                var model = options.model;
                $('<input id="cmbCat5Cd" name="' + options.field + '"/>').appendTo(container).kendoComboBox({
                    dataSource: Code_SelectMob_Datasource('Cat5Cd'),
                    change: function (e) {

                        combo = e.sender;
                        selectedItm = combo.select();
                        dataItem = combo.dataItem(selectedItm);

                        var cmb = $("#cmbCat5Cd").data("kendoComboBox");
                        var val = cmb.value();

                        if (isNaN(val)) {
                            alert("'" + val + "' is not a Valid input");
                            cmb.value("");
                            model.set("ItmCat5Ky", 1);
                            model.set("Cat5Cd", "");
                        }
                        else {
                            model.set("ItmCat5Ky", dataItem.CdKy);
                            model.set("Cat5Cd", dataItem.Code);
                        }
                    },
                    dataValueField: "CdKy",
                    dataTextField: "Code",
                    dataBound: function (e) {
                    }
                });
            }
        },
        {
            field: "Cat6Cd",
            title: "Item Cat6",
            width: "100px",
            editor: function (container, options) {
                var model = options.model;

                $('<input id="cmbCat6Cd" name="' + options.field + '"/>').appendTo(container).kendoComboBox({
                    dataSource: Code_SelectMob_Datasource('Cat6Cd'),
                    change: function (e) {

                        combo = e.sender;
                        selectedItm = combo.select();
                        dataItem = combo.dataItem(selectedItm);

                        var cmb = $("#cmbCat6Cd").data("kendoComboBox");
                        var val = cmb.value();

                        if (isNaN(val)) {
                            alert("'" + val + "' is not a Valid input");
                            cmb.value("");
                            model.set("ItmCat6Ky", 1);
                            model.set("Cat6Cd", "");
                        }
                        else {
                            model.set("ItmCat6Ky", dataItem.CdKy);
                            model.set("Cat6Cd", dataItem.Code);
                        }
                    },
                    dataValueField: "CdKy",
                    dataTextField: "Code",
                    dataBound: function (e) {
                    }
                });
            }
        },

                  //======================
        {  //7
            field: "Cat7Cd",
            title: "Item Cat7",
            width: "100px",
            editor: function (container, options) {
                var model = options.model;

                $('<input id="cmbCat7Cd" name="' + options.field + '"/>').appendTo(container).kendoComboBox({
                    dataSource: Code_SelectMob_Datasource('Cat7Cd'),
                    change: function (e) {

                        combo = e.sender;
                        selectedItm = combo.select();
                        dataItem = combo.dataItem(selectedItm);

                        var cmb = $("#cmbCat7Cd").data("kendoComboBox");
                        var val = cmb.value();

                        if (isNaN(val)) {
                            alert("'" + val + "' is not a Valid input");
                            cmb.value("");
                            model.set("ItmCat7Ky", 1);
                            model.set("Cat7Cd", "");
                        }
                        else {
                            model.set("ItmCat7Ky", dataItem.CdKy);
                            model.set("Cat7Cd", dataItem.Code);
                        }
                    },
                    dataValueField: "CdKy",
                    dataTextField: "Code",
                    dataBound: function (e) {
                    }
                });
            }
        },

                   //8
        {
            field: "Cat8Cd",
            title: "Item Cat8",
            width: "100px",
            editor: function (container, options) {
                var model = options.model;

                $('<input id="cmbCat8Cd" name="' + options.field + '"/>').appendTo(container).kendoComboBox({
                    dataSource: Code_SelectMob_Datasource('Cat8Cd'),
                    change: function (e) {

                        combo = e.sender;
                        selectedItm = combo.select();
                        dataItem = combo.dataItem(selectedItm);

                        var cmb = $("#cmbCat8Cd").data("kendoComboBox");
                        var val = cmb.value();

                        if (isNaN(val)) {
                            alert("'" + val + "' is not a Valid input");
                            cmb.value("");
                            model.set("ItmCat8Ky", 1);
                            model.set("Cat8Cd", "");
                        }
                        else {
                            model.set("ItmCat8Ky", dataItem.CdKy);
                            model.set("Cat8Cd", dataItem.Code);
                        }
                    },
                    dataValueField: "CdKy",
                    dataTextField: "Code",
                    dataBound: function (e) {
                    }
                });
            }
        },
                   //9
        {
            field: "Cat9Cd",
            title: "Item Cat9",
            width: "100px",
            editor: function (container, options) {
                var model = options.model;

                $('<input id="cmbCat9Cd" name="' + options.field + '"/>').appendTo(container).kendoComboBox({
                    dataSource: Code_SelectMob_Datasource('Cat9Cd'),
                    change: function (e) {

                        combo = e.sender;
                        selectedItm = combo.select();
                        dataItem = combo.dataItem(selectedItm);

                        var cmb = $("#cmbCat9Cd").data("kendoComboBox");
                        var val = cmb.value();

                        if (isNaN(val)) {
                            alert("'" + val + "' is not a Valid input");
                            cmb.value("");
                            model.set("ItmCat9Ky", 1);
                            model.set("Cat9Cd", "");
                        }
                        else {
                            model.set("ItmCat9Ky", dataItem.CdKy);
                            model.set("Cat9Cd", dataItem.Code);
                        }
                    },
                    dataValueField: "CdKy",
                    dataTextField: "Code",
                    dataBound: function (e) {
                    }
                });
            }
        },
                   //10
        {
            field: "Cat10Cd",
            title: "Item Cat10",
            width: "100px",
            editor: function (container, options) {
                var model = options.model;

                $('<input id="cmbCat10Cd" name="' + options.field + '"/>').appendTo(container).kendoComboBox({
                    dataSource: Code_SelectMob_Datasource('Cat10Cd'),
                    change: function (e) {

                        combo = e.sender;
                        selectedItm = combo.select();
                        dataItem = combo.dataItem(selectedItm);

                        var cmb = $("#cmbCat10Cd").data("kendoComboBox");
                        var val = cmb.value();

                        if (isNaN(val)) {
                            alert("'" + val + "' is not a Valid input");
                            cmb.value("");
                            model.set("ItmCat10Ky", 1);
                            model.set("Cat10Cd", "");
                        }
                        else {
                            model.set("ItmCat10Ky", dataItem.CdKy);
                            model.set("Cat10Cd", dataItem.Code);
                        }
                    },
                    dataValueField: "CdKy",
                    dataTextField: "Code",
                    dataBound: function (e) {
                    }
                });
            }
        },

                   //11
        {
            field: "Cat11Cd",
            title: "Item Cat11",
            width: "100px",
            editor: function (container, options) {
                var model = options.model;

                $('<input id="cmbCat11Cd" name="' + options.field + '"/>').appendTo(container).kendoComboBox({
                    dataSource: Code_SelectMob_Datasource('Cat11Cd'),
                    change: function (e) {

                        combo = e.sender;
                        selectedItm = combo.select();
                        dataItem = combo.dataItem(selectedItm);

                        var cmb = $("#cmbCat11Cd").data("kendoComboBox");
                        var val = cmb.value();

                        if (isNaN(val)) {
                            alert("'" + val + "' is not a Valid input");
                            cmb.value("");
                            model.set("ItmCat11Ky", 1);
                            model.set("Cat11Cd", "");
                        }
                        else {
                            model.set("ItmCat11Ky", dataItem.CdKy);
                            model.set("Cat11Cd", dataItem.Code);
                        }
                    },
                    dataValueField: "CdKy",
                    dataTextField: "Code",
                    dataBound: function (e) {
                    }
                });
            }
        },

                   //12
        {
            field: "Cat12Cd",
            title: "Item Cat12",
            width: "100px",
            editor: function (container, options) {
                var model = options.model;

                $('<input id="cmbCat12Cd" name="' + options.field + '"/>').appendTo(container).kendoComboBox({
                    dataSource: Code_SelectMob_Datasource('Cat12Cd'),
                    change: function (e) {

                        combo = e.sender;
                        selectedItm = combo.select();
                        dataItem = combo.dataItem(selectedItm);

                        var cmb = $("#cmbCat12Cd").data("kendoComboBox");
                        var val = cmb.value();

                        if (isNaN(val)) {
                            alert("'" + val + "' is not a Valid input");
                            cmb.value("");
                            model.set("ItmCat12Ky", 1);
                            model.set("Cat12Cd", "");
                        }
                        else {
                            model.set("ItmCat12Ky", dataItem.CdKy);
                            model.set("Cat12Cd", dataItem.Code);
                        }

                    },
                    dataValueField: "CdKy",
                    dataTextField: "Code",
                    dataBound: function (e) {
                    }
                });
            }

        },
        { field: "ModelKy", title: "ModelKy", width: "150px", hidden: true },
        {
            field: "modelCd", title: "Model Code", width: "150px",
            editor: function (container, options) {
                var model = options.model;
                var cncod = model.ConCd;
                $('<input id="modelCd" name="' + options.field + '"/>').appendTo(container).kendoComboBox({
                    dataSource: Code_SelectMob_Datasource('modelCd'),
                    //dataSource: ParentName(),
                    change: function (e) {

                        combo = e.sender;
                        selectedItm = combo.select();
                        dataItem = combo.dataItem(selectedItm);

                        model.set("ModelKy", dataItem.CdKy);
                        model.set("modelCd", dataItem.Code);
                    },
                    dataValueField: "CdKy",
                    dataTextField: "Code",
                    dataBound: function (e) {
                    }
                });
            }
        },
        { field: "BrandKy", title: "BrandKy", width: "150px", hidden: true },
        {
            field: "brandCd", title: "Brand Code", width: "150px",
            editor: function (container, options) {
                var model = options.model;
                var cncod = model.ConCd;
                $('<input id="brandCd" name="' + options.field + '"/>').appendTo(container).kendoComboBox({
                    dataSource: Code_SelectMob_Datasource('brandCd'),
                    //dataSource: ParentName(),
                    change: function (e) {

                        combo = e.sender;
                        selectedItm = combo.select();
                        dataItem = combo.dataItem(selectedItm);
                        model.set("BrandKy", dataItem.CdKy);
                        model.set("brandCd", dataItem.Code);
                    },
                    dataValueField: "CdKy",
                    dataTextField: "Code",
                    dataBound: function (e) {
                    }
                });
            }
        },
        { field: "SerNo", title: "Serial No", width: "150px", },
        { field: "SerNoKy", title: "Serial Key", width: "150px" },
        { field: "SupWrnty", title: "Supplier Warrenty", width: "190px", },
        { field: "CusWrnty", title: "Customer Warrenty", width: "190px", },
        { field: "CusWrntyRead", title: "Customer Warrenty Reading", width: "190px", },
        { field: "SupWrntyRead", title: "Supplier Warrenty Reading", width: "190px", },
        { field: "EngineNo", title: "Engine No", width: "190px", },
        {
            field: "isAct", title: "Is Active", width: "150px",
            template: '<input type="checkbox"  #= isAct? "checked=checked" : "" # class="isActPinChecked"></input>',
        },
        {
            field: "isApr", title: "Is Aprove", width: "150px",
            template: '<input type="checkbox"  #= isApr? "checked=checked" : "" # class="isAprPinChecked"></input>',
        },

    ];
    var gridNo = 2;
    var FinalItmMasColumn = setColumnProp(ItmMasColumn, viewBag.ObjKy, '', 'FormGrd', gridNo);

}

function LoadGridWithColumnPropTwo(columnsFinal, gridNo) {

    if (gridNo == 2) {
        try {
            $('#NonCompanyItemsGrid').data().kendoGrid.destroy();
            $('#NonCompanyItemsGrid').empty();
        } catch (e) { }

        var griddataSource = new kendo.data.DataSource({
            transport: {
                read: {
                    url: URLReadGridView,
                    dataType: "json",
                    success: function (e) {
                        alert("Success!");
                    }

                },

                parameterMap: function (options, operation) {

                    if (operation == "read") {
                        return ({
                            'ItmTypKy': FormGlblData.ItmTypKy,
                            'ObjKy': viewBag.ObjKy,
                        })
                    }
                }
            },
            batch: true,
            pageSize: 20,

            schema: {
                model: {
                    id: "ItmKy",
                    fields: //Relavent fields of the grid should be bind with following model items
                    {
                        ItmKy: { editable: false, nullable: false, validation: { required: true }, type: "number" },
                        ItmCd: { editable: true, nullable: false, type: "string" },
                        ItmNm: { editable: true, nullable: false, type: "string" },
                        Unit: { editable: true, nullable: false },
                        UnitKy: { editable: true, nullable: false },
                        ItmCat1Ky: { editable: true, nullable: false, type: "number" },
                        ItmCat2Ky: { editable: true, nullable: false, type: "number" },
                        ItmCat3Ky: { editable: true, nullable: false, type: "number" },
                        ItmCat4Ky: { editable: true, nullable: false, type: "number" },
                        ItmCat5Ky: { editable: true, nullable: false, type: "number" },
                        ItmCat6Ky: { editable: true, nullable: false, type: "number" },
                        ItmCat7Ky: { editable: true, nullable: false, type: "number" },
                        ItmCat8Ky: { editable: true, nullable: false, type: "number" },
                        ItmCat9Ky: { editable: true, nullable: false, type: "number" },
                        ItmCat10Ky: { editable: true, nullable: false, type: "number" },
                        ItmCat11Ky: { editable: true, nullable: false, type: "number" },
                        ItmCat12Ky: { editable: true, nullable: false, type: "number" },
                        Cat1Cd: { editable: true, nullable: false, type: "string" },
                        Cat2Cd: { editable: true, nullable: false, type: "string" },
                        Cat3Cd: { editable: true, nullable: false, type: "string" },
                        Cat4Cd: { editable: true, nullable: false, type: "string" },
                        Cat5Cd: { editable: true, nullable: false, type: "string" },
                        Cat6Cd: { editable: true, nullable: false, type: "string" },
                        Cat7Cd: { editable: true, nullable: false, type: "string" },
                        Cat8Cd: { editable: true, nullable: false, type: "string" },
                        Cat9Cd: { editable: true, nullable: false, type: "string" },
                        Cat10Cd: { editable: true, nullable: false, type: "string" },
                        Cat11Cd: { editable: true, nullable: false, type: "string" },
                        Cat12Cd: { editable: true, nullable: false, type: "string" },
                        Make: { editable: false, nullable: false, type: "string" },
                        ModelKy: { editable: true, nullable: false, type: "number" },
                        modelCd: { editable: true, nullable: false },
                        isAct: { editable: true, nullable: false, type: "boolean", defaultValue: true },
                        isApr: { editable: true, nullable: false, type: "boolean", defaultValue: true },
                        SerNo: { editable: true, nullable: false, type: "number" },
                        BrandKy: { editable: true, nullable: false, type: "number" },
                        brandCd: { editable: true, nullable: false },
                        SupWrnty: { editable: true, nullable: false, type: "number" },
                        CusWrnty: { editable: true, nullable: false, type: "number" },
                        CusWrntyRead: { editable: true, nullable: false, type: "number" },
                        CusWrntyRead: { editable: true, nullable: false, type: "number" },
                        EngineNo: { editable: true, nullable: false, type: "string" },
                        SerNoKy: { editable: true, nullable: false, type: "number", defaultValue: "1" },

                    }
                }
            }
        });

        $("#NonCompanyItemsGrid").kendoGrid({
            dataSource: griddataSource,
            autobind: false,
            navigatable: true,
            scrollable: {
                virtual: true
            },
            selectable: "row",
            editable: true,
            pageable: {
                refresh: true, pageSizes: [5, 10, 20, 50, 100, 150, 200, 300],
            },
            columnMenu: true,

            filterable: {
                mode: "row"
            },
            resizeable: true,
            reorderable: true,
            sortable: true,
            columns: columnsFinal,
            dataBound: GridOnDataBound,
            //change: onChangeAdminGrid,
            dataBinding: function () {
                record = (this.dataSource.page() - 1) * this.dataSource.pageSize();
            },
        });

        //createFilterRow();
    }

}

$(document.body).keydown(function (e) {
    if (e.keyCode == 107 || (e.altKey && e.keyCode == 78)) {
        e.preventDefault();
        insertItemforItmMas();
        //document.getElementById("FindFormGRN").style.overflow = "hidden";
    }
});
function insertItemforItmMas() {
    var grid = $("#NonCompanyItemsGrid").data("kendoGrid").addRow();
}

function Save() {
    var grid = $("#NonCompanyItemsGrid").data("kendoGrid");
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
            url: URLInsertUpdateNonCompanyItemGrid,
            data: JSON.stringify({
                updateAccmacc: kendo.stringify(updatedRecords),
                newAccmacc: kendo.stringify(newRecords),
                ItmTypKy: FormGlblData.ItmTypKy
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "Json",
            type: "POST",
            success: function (data) {

                if (data == true) {
                    SaveItmMasSerNo();
                    alert("Successfully Saved..!");
                    Load_NonCompanyItemsGrid(); // update grid
                } else {
                    alert("Record Not Saved");
                    Load_NonCompanyItemsGrid(); // update grid
                }
            },
            error: function (e) {
                return false;
            }
        });
    }else{
        if (FormGlblDataForSerNo.SerialNumber_Array != 0) {
            SaveItmMasSerNo();
        }
    }

    
}

function GridOnDataBound(arg) {

    var grid = $("#Main_ItmMasGrid").data("kendoGrid");
    $(grid.tbody)
        .on("click",
            "td",
            function (e) {

                var row = $(this).closest("tr");
                var rowIdx = $("tr", grid.tbody).index(row);
                var colIdx = $("td", row).index(this);
                var FieldName = $("#Main_ItmMasGrid").data("kendoGrid").columns[colIdx].field;
                var FieldTitle = $("#Main_ItmMasGrid").data("kendoGrid").columns[colIdx].title;

                //Get EAN popup window while click on EAN column field in ItmMas Grid
                if (FieldName == "EAN") {
                    var selectedItem = grid.dataItem(grid.select());
                    ////   var Cky = selectedItem.CKy1;
                    var ItmKy = selectedItem.ItmKy;
                    var ItmCd = selectedItem.ItmCd;
                    var ItmNm = selectedItem.ItmNm;
                    GetEANWindow(ItmKy, ItmCd, ItmNm);

                }

                //Get ProductionLoc and ManufacturingLoc popup window while click on Production Location and Manufacturing Location column field in ItmMas Grid
                if (FieldName == "ProductionLoc" || FieldName == "ManufacturingLoc") {
                    var selectedItem = grid.dataItem(grid.select());

                    var ItmKy = selectedItem.ItmKy;
                    var ItmCd = selectedItem.ItmCd;
                    var ItmNm = selectedItem.ItmNm;
                    GetProductionManufacturingLocWindow(ItmKy, ItmCd, ItmNm, FieldTitle, FieldName);
                }

                if (FieldName == "SerNo") {
                    var selectedItem = grid.dataItem(grid.select());

                    var ItmKy = selectedItem.ItmKy;
                    var ItmCd = selectedItem.ItmCd;
                    var ItmNm = selectedItem.ItmNm;
                    GetItmMasSerNoWindow(ItmKy, ItmCd, ItmNm, FieldTitle, FieldName);
                }

            });
}