
var FormGlblData = {
    FormObjData: null,
    ItmTypKy: 1,
    AccessLvlKy: 1,
    ConfiLvlKy: 1,
    TrnKy: 1,
    RecKy: 1,
    TrnTypKy:1,
    TblNm: 'ItmMas',
    GridLoaded: 0

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
    setTimeout(setHdrSectionPropFun, 2000);

    $("#HdrSec1_CmbLoc_Cd").kendoComboBox({
        dataTextField: "Code",
        dataValueField: "CdKy",
        dataSource: Code_SelectMob_Datasource('ManufacturingLoc'),
        filter: "startswith",
        suggest: true,
        placeholder: "Select a Location.."
    });

    var h = $("#option").height();
    var PaginationControlH = $("#idPager").height() + 37;
    var height = ($(window).height()) - (150 + h + PaginationControlH);
    var width = ($(window).width());
    $("#Main_ItmMasGrid").height(height);
    $("#Main_ItmMasGrid").width(width);


    var d = document.getElementById('AlertBox');
    d.style.position = "absolute";
    d.style.left = width + 'px';
    d.style.visibility = "visible";

    setTimeout(function () {
        LoadMain_ItmMasGrid();
    }, 2600);
    DocReadyCusMulti();
    //ItmCmpnCusReady();
}

function setHdrSectionPropFun() {
    // ---------- Set ObjProperties
    setHdrSectionProp('', viewBag.ObjKy, '', 'HdrSec1');
    setHdrSectionProp('', viewBag.ObjKy, '', 'HdrSec2');
}

function deleteme(key) {
    var ItmKy = key;
    var answer = confirm("Confirm to InActive this record?");
    if (answer) {
        $.ajax({
            url: URLDeleteGridViewData,
            dataType: "json",
            type: "POST",
            data: {
                'key': ItmKy,
            },
            success: function (data) {
                //alert("SuccessFully Deleted!");
                var grid = $("#Main_ItmMasGrid").data("kendoGrid");
                grid.dataSource.read();
            },
            error: function (e) {
            }
        });
    }

}

$("#Main_ItmMasGrid").dblclick(function () {

    var grid = $("#Main_ItmMasGrid").data().kendoGrid;
    var selectedItem = grid.dataItem(grid.select());
    var ItmKy = selectedItem.ItmKy;
    FormGlblData.RecKy = selectedItem.ItmKy;
    var Unit = selectedItem.Unit;
    var ItmCd = selectedItem.ItmCd;
    if (ItmKy != "" || ItmKy != undefined || ItmKy != null) {
        SetSelectedItemToItemCombo(ItmKy, selectedItem.ItmNm, Unit, ItmCd);

        $("#MainDiv_ItmMasCmpnPartial").show().kendoWindow({
            width: "1000px",
            height: "550px",
            modal: true,
            title: "Item Component"
        });
        //$('#MainDiv_ItmMasCmpnPartial').data('kendoWindow').center().open();
        $("#MainDiv_ItmMasCmpnPartial").data("kendoWindow").maximize().open();

    } else {
        alert("Please Select Item");
    }

});


$("#Main_ItmMasGrid").on("keydown", function (event) {

    //alert(">>>e.which is :" + event.which + " and e.keyCode is:" + event.keyCode);
    if ((event.keyCode == 46) || (event.which == 46)) {
        var entityGrid = $("#Main_ItmMasGrid").data("kendoGrid");
        var selectedItem = entityGrid.dataItem(entityGrid.select());
        deleteme(selectedItem.ItmKy);
    }

});

function ComboValidations(cmbNm) {
    var cmb = $("#" + cmbNm + "").data("kendoComboBox");
    var dataItemval = cmb.dataItem();
    if (!dataItemval) {
        alert("'" + cmb.value() + "' is not a Valid input");
        $("#" + cmbNm + "").data("kendoComboBox").value("");
        return false;
    } else {
        return true;
    }
}

// Ctrl + S to Save
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
        CancelGridItemforItmMas();
    }
});

// Define fields for Grid
function LoadMain_ItmMasGrid() {
    try {
        $('#Main_ItmMasGrid').data().kendoGrid.destroy();
        $('#Main_ItmMasGrid').empty();
    } catch (e) { }

    var ItmMasColumn = [

        { field: "ItmKy", title: "Ref #", width: "100px", locked: true, lockable: false, },
        { field: "ItmCd", title: "Item Cd", width: "150px", },
        { field: "ItmNm", title: "Item Name", width: "150px", },
        { field: "SO", title: "Sort Order", width: "150px", },
      //{    field: "PartNo", title: "Part No", width: "100px" },
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

                        var validate = ComboValidations('cmbUnitKy');
                        if (!validate) {
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
            field: "ServiceUnit", title: "ServiceUnit", width: "100px",
            editor: function (container, options) {
                var model = options.model;
                $('<input id="cmbServceUntKy" name="' + options.field + '"/>').appendTo(container).kendoComboBox({
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

                        var cmb = $("#cmbServceUntKy").data("kendoComboBox");
                        var val = cmb.value();

                        var validate = ComboValidations('cmbServceUntKy');
                        if (!validate) {
                            model.set("ServiceUnitKy", 1);
                            model.set("ServiceUnit", "");
                        }
                        else {
                            model.set("ServiceUnitKy", dataItem.UnitKy);
                            model.set("ServiceUnit", dataItem.Unit);
                        }

                    },
                    dataValueField: "UnitKy",
                    dataTextField: "Unit",
                    dataBound: function (e) {
                    }
                });
            }
        },
        { field: "ServiceUnitKy", title: "ServiceUnitKy", width: "150px", hidden: true },
        { field: "UsageUnit", title: "UsageUnit", width: "150px", hidden: true },
        { field: "Units", title: "Units", width: "150px", hidden: true },
        { field: "BUKy", title: "Bu Key", width: "150px", hidden: true },
        {
            field: "BUNm", title: "BU Name", width: "120px",
            editor: function (container, options) {
                var model = options.model;
                $('<input id="BUNm" name="' + options.field + '"/>').appendTo(container).kendoComboBox({
                    dataSource: CdNm_SelectMob_Datasource('BUNm'),
                    change: function (e) {
                        combo = e.sender;
                        selectedItm = combo.select();
                        dataItem = combo.dataItem(selectedItm);
                        var validate = ComboValidations('BUNm');
                        if (validate) {
                            model.set("BUKy", dataItem.CdKy);
                            model.set("BUNm", dataItem.CdNm);
                            model.set("BUCd", dataItem.Code);
                        }
                        else {
                            model.set("BUKy", 1);
                            model.set("BUNm", "");
                            model.set("BUCd", "");
                        }
                    },
                    dataValueField: "CdKy",
                    dataTextField: "CdNm",
                    dataBound: function (e) {
                    }
                });
            }
        },
        {
            field: "BUCd", title: "BU Code", width: "120px",
            editor: function (container, options) {
                var model = options.model;
                $('<input id="BUCd" name="' + options.field + '"/>').appendTo(container).kendoComboBox({
                    dataSource: Code_SelectMob_Datasource('BUCd'),
                    change: function (e) {
                        combo = e.sender;
                        selectedItm = combo.select();
                        dataItem = combo.dataItem(selectedItm);
                        var validate = ComboValidations('BUCd');
                        if (validate) {
                            model.set("BUKy", dataItem.CdKy);
                            model.set("BUCd", dataItem.Code);
                            model.set("BUNm", dataItem.CdNm);
                        }
                        else {
                            model.set("BUKy", 1);
                            model.set("BUCd", "");
                            model.set("BUNm", "");
                        }
                    },
                    dataValueField: "CdKy",
                    dataTextField: "Code",
                    dataBound: function (e) {
                    }
                });
            }
        },
        { field: "AnlQty", title: "Analysis Qty", width: "120px" },
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

                        var validate = ComboValidations('cmbCat1Cd');
                        if (!validate) {
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

                        var validate = ComboValidations('cmbCat2Cd');
                        if (!validate) {
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

                        var validate = ComboValidations('cmbCat3Cd');
                        if (!validate) {
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

                        var validate = ComboValidations('cmbCat4Cd');
                        if (!validate) {
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

                        var validate = ComboValidations('cmbCat5Cd');
                        if (!validate) {
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

                        var validate = ComboValidations('cmbCat6Cd');
                        if (!validate) {
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

                        var validate = ComboValidations('cmbCat7Cd');
                        if (!validate) {
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

                        var validate = ComboValidations('cmbCat8Cd');
                        if (!validate) {
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

                        var validate = ComboValidations('cmbCat9Cd');
                        if (!validate) {
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

                        var validate = ComboValidations('cmbCat10Cd');
                        if (!validate) {
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

                        var validate = ComboValidations('cmbCat11Cd');
                        if (!validate) {
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

                        var validate = ComboValidations('cmbCat12Cd');
                        if (!validate) {
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

                  //===========================
        { field: "ReOrdLvl", title: "ReOrder Level", width: "150px", },
        { field: "ReOrdQty", title: "ReOrder Qty", width: "150px", },
                 //{
                 //     field: "Make", title: "Make", width: "150px",
                 //},
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
                        var validate = ComboValidations('modelCd');
                        if (validate) {
                            model.set("ModelKy", dataItem.CdKy);
                            model.set("modelCd", dataItem.Code);
                        }
                        else {
                            model.set("ModelKy", 1);
                            model.set("modelCd", "");
                        }
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
                        var validate = ComboValidations('brandCd');
                        if (validate) {
                            model.set("BrandKy", dataItem.CdKy);
                            model.set("brandCd", dataItem.Code);
                        }
                        else {
                            model.set("BrandKy", 1);
                            model.set("brandCd", "");
                        }
                    },
                    dataValueField: "CdKy",
                    dataTextField: "Code",
                    dataBound: function (e) {
                    }
                });
            }
        },
        { field: "AcsLvlKy", title: "AcsLvlKy", width: "150px", hidden: true },

        {
            field: "accLvlNm", title: "accLvlNm", width: "100px", attributes: { style: "text-align:center;" },
            editor: function (container, options) {
                var model = options.model;
                var cncod = model.ConCd;
                $('<input id="cmbAcsLvlKy" name="' + options.field + '"/>').appendTo(container).kendoComboBox({
                    dataSource: CdNm_SelectMob_Datasource('AcsLvlKy'),
                    //dataSource: ParentName(),
                    change: function (e) {

                        combo = e.sender;
                        selectedItm = combo.select();
                        dataItem = combo.dataItem(selectedItm);
                        var validate = ComboValidations('cmbAcsLvlKy');
                        if (validate) {
                            model.set("AcsLvlKy", dataItem.CdKy);
                            model.set("accLvlNm", dataItem.CdNm);
                        }
                        else {
                            model.set("AcsLvlKy", 1);
                            model.set("accLvlNm", "");
                        }
                    },
                    dataValueField: "CdKy",
                    dataTextField: "CdNm",
                    dataBound: function (e) {
                    }
                });
            }
        },


        {
            field: "isMain", title: "Is Main", width: "150px",
            template: '<input type="checkbox"  #= isMain? "checked=checked" : "" # class="isMainPinChecked"></input>',
            //template: '<input type="checkbox" #= isMain? "checked=checked" : "" # disabled="disabled" ></input>',
        },
        {
            field: "isAct", title: "Is Active", width: "150px",
            template: '<input type="checkbox"  #= isAct? "checked=checked" : "" # class="isActPinChecked"></input>',
        },
        {
            field: "isApr", title: "Is Aprove", width: "150px",
            template: '<input type="checkbox"  #= isApr? "checked=checked" : "" # class="isAprPinChecked"></input>',
        },
        { field: "Rem", title: "Rem", width: "150px", },
        { field: "NO1", title: "NO1", width: "150px", },
        { field: "PrntKy", title: "Prnt Key", width: "150px", },
        {
            field: "PrntItmCd", title: "Parant Code", width: "150px",
            editor: function (container, options) {
                var model = options.model;
                $('<input id="PrntItmCd" name="' + options.field + '"/>').appendTo(container).kendoComboBox({
                    dataSource: Code_SelectMob_Datasource('PrntItmCd'),
                    change: function (e) {
                        combo = e.sender;
                        selectedItm = combo.select();
                        dataItem = combo.dataItem(selectedItm);

                        var cmb = $("#PrntItmCd").data("kendoComboBox");
                        var val = cmb.value();
                        var validate = ComboValidations('PrntItmCd');
                        if (!validate) {
                            model.set("PrntKy", 1);
                            model.set("PrntItmCd", "");
                        } else {
                            model.set("PrntKy", dataItem.CdKy);
                            model.set("PrntItmCd", dataItem.Code);
                        }
                    },
                    dataValueField: "CdKy",
                    dataTextField: "Code"
                });
            }
        },
        {
            field: "PrntItmNm", title: "Parant Name", width: "150px",
            editor: function (container, options) {
                var model = options.model;
                $('<input id="PrntItmNm" name="' + options.field + '"/>').appendTo(container).kendoComboBox({
                    dataSource: CdNm_SelectMob_Datasource('PrntItmNm'),
                    change: function (e) {
                        combo = e.sender;
                        selectedItm = combo.select();
                        dataItem = combo.dataItem(selectedItm);

                        var cmb = $("#PrntItmNm").data("kendoComboBox");
                        var val = cmb.value();
                        var validate = ComboValidations('PrntItmNm');
                        if (!validate) {
                            model.set("PrntKy", 1);
                            model.set("PrntItmNm", "");
                        } else {
                            model.set("PrntKy", dataItem.CdKy);
                            model.set("PrntItmNm", dataItem.CdNm);
                        }
                    },
                    dataValueField: "CdKy",
                    dataTextField: "CdNm"
                });
            }
        },
        { field: "ItmAccCatKy", title: "ItmAccCatKy", width: "150px", },
        {
            field: "ItmAccCatCd", title: "ItmAccCatCd", width: "150px",
            editor: function (container, options) {
                var model = options.model;
                $('<input id="ItmAccCatCd" name="' + options.field + '"/>').appendTo(container).kendoComboBox({
                    dataSource: Code_SelectMob_Datasource('ItmAccCatCd'),
                    change: function (e) {
                        combo = e.sender;
                        selectedItm = combo.select();
                        dataItem = combo.dataItem(selectedItm);

                        var cmb = $("#ItmAccCatCd").data("kendoComboBox");
                        var val = cmb.value();
                        var validate = ComboValidations('ItmAccCatCd');
                        if (!validate) {
                            model.set("ItmAccCatKy", 1);
                            model.set("ItmAccCatCd", "");
                        } else {
                            model.set("ItmAccCatKy", dataItem.CdKy);
                            model.set("ItmAccCatCd", dataItem.Code);
                        }
                    },
                    dataValueField: "CdKy",
                    dataTextField: "Code"
                });
            }
        },
        {
            field: "ItmAccCatNm", title: "ItmAccCatNm", width: "150px",
            editor: function (container, options) {
                var model = options.model;
                $('<input id="ItmAccCatNm" name="' + options.field + '"/>').appendTo(container).kendoComboBox({
                    dataSource: CdNm_SelectMob_Datasource('ItmAccCatNm'),
                    change: function (e) {
                        combo = e.sender;
                        selectedItm = combo.select();
                        dataItem = combo.dataItem(selectedItm);

                        var cmb = $("#ItmAccCatNm").data("kendoComboBox");
                        var val = cmb.value();
                        var validate = ComboValidations('ItmAccCatNm');
                        if (!validate) {
                            model.set("ItmAccCatKy", 1);
                            model.set("ItmAccCatNm", "");
                        } else {
                            model.set("ItmAccCatKy", dataItem.CdKy);
                            model.set("ItmAccCatNm", dataItem.CdNm);
                        }
                    },
                    dataValueField: "CdKy",
                    dataTextField: "CdNm"
                });
            }
        },

        { field: "SlsPri", title: "Sales Price", width: "150px", },
        { field: "CosPri", title: "Cost Price", width: "150px", },
        {
            field: "isSubstitute", title: "isSubstitute", width: "150px",
            template: '<input type="checkbox"  #= isSubstitute? "checked=checked" : "" # class="isSubstitutePinChecked"></input>',
        },
        {
            field: "isSrlNo", title: "isSrlNo", width: "150px",
            template: '<input type="checkbox"  #= isSrlNo? "checked=checked" : "" # class="isSrlNoPinChecked"></input>',
        },
        { field: "SerNo", title: "Serial No", width: "150px", },
        { field: "ItmPriCatKy", title: "ItmPriCatKy", width: "150px", },
        {
            field: "PriCatCd", title: "Price Category Code", width: "150px",
            editor: function (container, options) {
                var model = options.model;
                $('<input id="PriCatCd" name="' + options.field + '"/>').appendTo(container).kendoComboBox({
                    dataSource: Code_SelectMob_Datasource('PriCatCd'),
                    change: function (e) {
                        combo = e.sender;
                        selectedItm = combo.select();
                        dataItem = combo.dataItem(selectedItm);

                        var cmb = $("#PriCatCd").data("kendoComboBox");
                        var val = cmb.value();
                        var validate = ComboValidations('PriCatCd');
                        if (!validate) {
                            model.set("ItmPriCatKy", 1);
                            model.set("PriCatCd", "");
                        } else {
                            model.set("ItmPriCatKy", dataItem.CdKy);
                            model.set("PriCatCd", dataItem.Code);
                        }
                    },
                    dataValueField: "CdKy",
                    dataTextField: "Code"
                });
            }
        },
        {
            field: "isAgeVarification", title: "isAgeVarification", width: "150px",
            template: '<input type="checkbox"  #= isAgeVarification? "checked=checked" : "" # class="isAgeVarificationPinChecked"></input>',
        },
        {
            field: "isAlwZeroPrice", title: "isAlwZeroPrice", width: "150px",
            template: '<input type="checkbox"  #= isAlwZeroPrice? "checked=checked" : "" # class="isAlwZeroPricePinChecked"></input>',
        },
        {
            field: "isAlwTrnRateChange", title: "isAlwTrnRateChange", width: "150px",
            template: '<input type="checkbox"  #= isAlwTrnRateChange? "checked=checked" : "" # class="isAlwTrnRateChangePinChecked"></input>',
        },
        {
            field: "isDiscontinued", title: "isDiscontinued", width: "150px",
            template: '<input type="checkbox"  #= isDiscontinued? "checked=checked" : "" # class="isDiscontinuedPinChecked"></input>',
        },
        {
            field: "isAlwTrn", title: "isAlwTrn", width: "150px",
            template: '<input type="checkbox"  #= isAlwTrn? "checked=checked" : "" # class="isAlwTrnPinChecked"></input>',
        },
        { field: "EAN", title: "EAN", width: "190px", },
        //{ field: "ProductionLoc", title: "Production Location", width: "190px", },
        { field: "ManufacturingLoc", title: "Manufacturing Location", width: "190px", },
        { field: "SupWrnty", title: "Supplier Warrenty", width: "190px", },
        { field: "CusWrnty", title: "Customer Warrenty", width: "190px", },
        {
            field: "isSysRec", title: "isSysRec", width: "150px",
            template: '<input type="checkbox"  #= isSysRec? "checked=checked" : "" # class="isSysRecPinChecked"></input>',
        },
         {
             field: "IsGeneric", title: "IsGeneric", width: "150px",
             template: '<input type="checkbox"  #= IsGeneric? "checked=checked" : "" # class="isIsGenericChecked"></input>',
         },
        {
            width: "50px",
            template: kendo.template($("#command-template").html())
        },


    ];
    var gridNo = 2;
    var FinalItmMasColumn = setColumnProp(ItmMasColumn, viewBag.ObjKy, '', 'FormGrd', gridNo);
    ItmCmpnCusReady();
}

//set Grid Model and Function
function LoadGridWithColumnPropTwo(columnsFinal, gridNo) {

    var ItmCd = $("#HdrSec1_InptItmCd_Val").val();
    var ItmNm = $("#HdrSec1_InptItmNm_Val").val();

    if (gridNo == 2) {
        try {
            $('#Main_ItmMasGrid').data().kendoGrid.destroy();
            $('#Main_ItmMasGrid').empty();
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
                            'PageNo': HTNPaginationCtrlData.PageNo,
                            'PageSize': HTNPaginationCtrlData.PageSize,
                            'ItmTypKy': FormGlblData.ItmTypKy,
                            'ObjKy': viewBag.ObjKy,
                            'ItmCd': ItmCd,
                            'ItmNm': ItmNm
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
                        SO: { editable: true, nullable: false, type: "number" },
                        PartNo: { editable: true, nullable: false },
                        Unit: { editable: true, nullable: false },
                        UnitKy: { editable: true, nullable: false },
                        UsageUnit: { editable: true, nullable: false },
                        UsageUnitKy: { editable: true, nullable: false },
                        Units: { editable: true, nullable: false },
                        ServiceUnitKy: { editable: true, nullable: false },
                        ServiceUnit: { editable: true, nullable: false },
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
                        ReOrdLvl: { editable: true, nullable: false, type: "number" },
                        ReOrdQty: { editable: true, nullable: false, type: "number" },
                        Make: { editable: false, nullable: false, type: "string" },
                        ModelKy: { editable: true, nullable: false, type: "number" },
                        modelCd: { editable: true, nullable: false },

                        isMain: { editable: true, nullable: false, type: "boolean" },
                        isAct: { editable: true, nullable: false, type: "boolean", defaultValue: true },
                        isApr: { editable: true, nullable: false, type: "boolean", defaultValue: true },
                        Rem: { editable: true, nullable: false, },
                        PrntKy: { editable: true, nullable: false, type: "number" },
                        PrntItmCd: { editable: true, nullable: false, },
                        PrntItmNm: { editable: true, nullable: false, },
                        ItmAccCatKy: { editable: true, nullable: false, type: "number" },
                        ItmAccCatCd: { editable: true, nullable: false, },
                        ItmAccCatNm: { editable: true, nullable: false, },
                        SlsPri: { editable: true, nullable: false, type: "number" },
                        NO1: { editable: true, nullable: false, type: "number" },
                        CosPri: { editable: true, nullable: false, type: "number" },
                        isSubstitute: { editable: true, nullable: false, type: "boolean" },
                        isSrlNo: { editable: true, nullable: false, type: "boolean" },
                        SerNo: { editable: true, nullable: false, type: "string" },
                        ItmPriCatKy: { editable: true, nullable: false, type: "number" },
                        isAgeVarification: { editable: true, nullable: false, type: "boolean" },
                        isAlwZeroPrice: { editable: true, nullable: false, type: "boolean" },
                        isAlwTrnRateChange: { editable: true, nullable: false, type: "boolean" },
                        isDiscontinued: { editable: true, nullable: false, type: "boolean" },
                        BrandKy: { editable: true, nullable: false, type: "number" },
                        brandCd: { editable: true, nullable: false },
                        AcsLvlKy: { editable: true, nullable: false, type: "number" },
                        AcsLvlNm: { editable: true, nullable: false, type: "number" },
                        BUKy: { editable: true, nullable: false, type: "number" },
                        BUNm: { editable: true, nullable: false },
                        BUCd: { editable: true, nullable: false },
                        EAN: { editable: true, nullable: false, type: "string" },
                        ProductionLoc: { editable: false, nullable: false, type: "string" },
                        ManufacturingLoc: { editable: true, nullable: false, },
                        isAlwTrn: { editable: true, nullable: false, type: "boolean" },
                        AnlQty: { editable: true, nullable: false, type: "number" },
                        SupWrnty: { editable: true, nullable: false, type: "number" },
                        CusWrnty: { editable: true, nullable: false, type: "number" },
                        isSysRec: { editable: true, nullable: false, type: "boolean" },
                        IsGeneric: { editable: true, nullable: false, type: "boolean" },

                        //Des: { editable: true, nullable: false, type: "string" },

                    }
                }
            }
        });

        $("#Main_ItmMasGrid").kendoGrid({
            dataSource: griddataSource,
            resizeable: true,
            autobind: true,
            navigatable: true,
            selectable: "row",
            editable: true,
            pageable: {
                refresh: true, pageSizes: [5, 10, 20, 50, 100, 150, 200, 300],
            },
            //toolbar: [{ name: "create", text: "Add new record" }, "save", "cancel"],
            columnMenu: true,

            filterable: {
                mode: "row"
            },
            reorderable: true,
            sortable: true,
            columns: columnsFinal,
            dataBound: GridOnDataBound,
            //change: onChangeAdminGrid,
            dataBinding: function () {
                record = (this.dataSource.page() - 1) * this.dataSource.pageSize();
            },
            edit: function (e) {
                var input = e.container.find(".k-input");
                var value = input.val();
                input.keyup(function () {
                    value = input.val();
                });
                $("[name='ItmCd']", e.container).blur(function () {
                    var grid = $("#Main_ItmMasGrid").data("kendoGrid");
                    var row = $(this).closest("tr");
                    var item = grid.dataItem(row);
                    CheckItmMasCodeExist(item.ItmCd, e.model);
                });
                //$("[name='ItmCd']", e.container).blur(function () {
                //    var id = ("#Main_ItmMasGrid");
                //    var grid = $(id).data().kendoGrid;
                //    var selectedItem = grid.dataItem(grid.select());
                //    var ItmCd = selectedItem.ItmCd;
                //    CheckItmMasCodeExist(ItmCd, e.model);
                //});

                //$("[name='ItmNm']", e.container).blur(function () {
                //    var id = ("#Main_ItmMasGrid");
                //    var grid = $(id).data().kendoGrid;
                //    var selectedItem = grid.dataItem(grid.select());
                //    var ItmNm = selectedItem.ItmNm;
                //    CheckItmMasItmNmExist(ItmNm, e.model);
                //});
                var input = e.container.find("input");
                input.select();
            }
        });

        //createFilterRow();
    }
    setTimeout(function () {
        $("#AlertBox").removeClass("Alert AlertAnim");
    }, 3000);
}

var id = ("#Main_ItmMasGrid");
$(id).on("click", ".k-grid-evenselect", function (e) {

    //var id = ("#" + viewBag.OurCd);
    var grid = $(id).data("kendoGrid");
    var selectedItem = grid.dataItem($(this).closest("tr"));
    FormGlblData.RecKy = selectedItem.ItmKy;

    AttachImage();

});

$("#HdrSec1_InptItmCd_Val").keypress(function (event) {

    var keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode == '13') {
        LoadMain_ItmMasGrid();
    }
});

$("#HdrSec1_InptItmNm_Val").keypress(function (event) {

    var keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode == '13') {
        LoadMain_ItmMasGrid();
    }

});


function CheckItmCdForExist(list, ItmTypKy) {
    var Itmcd = list.ItmCd;
    FormGlblData.ItmTypKy = ItmTypKy;
    $.ajax({
        url: URLCheckItmCdExist,
        data: { Itmcd: Itmcd, itmtypky: FormGlblData.ItmTypKy },
        dataType: "Json",
        type: "POST",
        success: function (data) {
            for (i = 0; i < data.length; i++) {
                FormGlblData.ItmTypKy = data[0].CdKy;
                LoadGridView(FormGlblData.ItmTypKy);
            }
        }
    });
}


function Save() {
    var grid = $("#Main_ItmMasGrid").data("kendoGrid");
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
            url: URLInsertUpdateGridView,
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
                    //AlertMsg();                    
                    LoadMain_ItmMasGrid(); // update grid
                } else {
                    alert("Record Not Saved");
                    LoadMain_ItmMasGrid(); // update grid
                }
            },
            error: function (e) {
                alert("Save Fail \n Or Data Alredy Exist");
                return false;
            }
        });

    } else {
        if (FormGlblDataForSerNo.SerialNumber_Array != 0) {
            SaveItmMasSerNo();
        }

    }
}


$('#Main_ItmMasGrid').on('click', '.isMainPinChecked', function () {
    var checked = $(this).is(':checked');
    var grid = $('#Main_ItmMasGrid').data().kendoGrid;
    var dataItem = grid.dataItem($(this).closest('tr'));
    if (dataItem != undefined) {
        dataItem.set('isMain', checked);
    }
});

$('#Main_ItmMasGrid').on('click', '.isActPinChecked', function () {
    var checked = $(this).is(':checked');
    var grid = $('#Main_ItmMasGrid').data().kendoGrid;
    var dataItem = grid.dataItem($(this).closest('tr'));
    if (dataItem != undefined) {
        dataItem.set('isAct', checked);
    }
});

$('#Main_ItmMasGrid').on('click', '.isAprPinChecked', function () {
    var checked = $(this).is(':checked');
    var grid = $('#Main_ItmMasGrid').data().kendoGrid;
    var dataItem = grid.dataItem($(this).closest('tr'));
    if (dataItem != undefined) {
        dataItem.set('isApr', checked);
    }
});

$('#Main_ItmMasGrid').on('click', '.isSubstitutePinChecked', function () {
    var checked = $(this).is(':checked');
    var grid = $('#Main_ItmMasGrid').data().kendoGrid;
    var dataItem = grid.dataItem($(this).closest('tr'));
    if (dataItem != undefined) {
        dataItem.set('isSubstitute', checked);
    }
});

$('#Main_ItmMasGrid').on('click', '.isSrlNoPinChecked', function () {
    var checked = $(this).is(':checked');
    var grid = $('#Main_ItmMasGrid').data().kendoGrid;
    var dataItem = grid.dataItem($(this).closest('tr'));
    if (dataItem != undefined) {
        dataItem.set('isSrlNo', checked);
    }
});

$('#Main_ItmMasGrid').on('click', '.isAgeVarificationPinChecked', function () {
    var checked = $(this).is(':checked');
    var grid = $('#Main_ItmMasGrid').data().kendoGrid;
    var dataItem = grid.dataItem($(this).closest('tr'));
    if (dataItem != undefined) {
        dataItem.set('isAgeVarification', checked);
    }
});

$('#Main_ItmMasGrid').on('click', '.isAlwZeroPricePinChecked', function () {
    var checked = $(this).is(':checked');
    var grid = $('#Main_ItmMasGrid').data().kendoGrid;
    var dataItem = grid.dataItem($(this).closest('tr'));
    if (dataItem != undefined) {
        dataItem.set('isAlwZeroPrice', checked);
    }
});

$('#Main_ItmMasGrid').on('click', '.isAlwTrnRateChangePinChecked', function () {
    var checked = $(this).is(':checked');
    var grid = $('#Main_ItmMasGrid').data().kendoGrid;
    var dataItem = grid.dataItem($(this).closest('tr'));
    if (dataItem != undefined) {
        dataItem.set('isAlwTrnRateChange', checked);
    }
});

$('#Main_ItmMasGrid').on('click', '.isDiscontinuedPinChecked', function () {
    var checked = $(this).is(':checked');
    var grid = $('#Main_ItmMasGrid').data().kendoGrid;
    var dataItem = grid.dataItem($(this).closest('tr'));
    if (dataItem != undefined) {
        dataItem.set('isDiscontinued', checked);
    }
});

$('#Main_ItmMasGrid').on('click', '.isAlwTrnPinChecked', function () {
    var checked = $(this).is(':checked');
    var grid = $('#Main_ItmMasGrid').data().kendoGrid;
    var dataItem = grid.dataItem($(this).closest('tr'));
    if (dataItem != undefined) {
        dataItem.set('isAlwTrn', checked);
    }
});

$('#Main_ItmMasGrid').on('click', '.isSysRecPinChecked', function () {
    var checked = $(this).is(':checked');
    var grid = $('#Main_ItmMasGrid').data().kendoGrid;
    var dataItem = grid.dataItem($(this).closest('tr'));
    if (dataItem != undefined) {
        dataItem.set('isSysRec', checked);
    }
});
$('#Main_ItmMasGrid').on('click', '.isIsGenericChecked', function () {
    var checked = $(this).is(':checked');
    var grid = $('#Main_ItmMasGrid').data().kendoGrid;
    var dataItem = grid.dataItem($(this).closest('tr'));
    if (dataItem != undefined) {
        dataItem.set('IsGeneric', checked);
    }
});

function CancelGridItemforItmMas() {
    $("#Main_ItmMasGrid").data("kendoGrid").cancelChanges();
}

function insertItemforItmMas() {
    var grid = $("#Main_ItmMasGrid").data("kendoGrid").addRow();
    try {
        isnewRec();
    } catch (e) {

    }
   
}

function isnewRec() {
    var FirstRow = $("#Main_ItmMasGrid").data().kendoGrid.dataSource.data()[0];  
    FirstRow.set("isAlwTrn", true);
    $('#Main_ItmMasGrid').data('kendoGrid').refresh();
    var grid = $("#Main_ItmMasGrid").data("kendoGrid");
    var cell = $('#Main_ItmMasGrid').find('tbody tr:eq(0) td:eq(2)');
    grid.editCell(cell);
}

$(document.body).keydown(function (e) {
    if (e.keyCode == 107 || (e.altKey && e.keyCode == 78)) {
        e.preventDefault();
        insertItemforItmMas();
        //document.getElementById("FindFormGRN").style.overflow = "hidden";
    }
});

function CheckItmMasCodeExist(ItmCd, model) {
    var grid = $("#Main_ItmMasGrid").data("kendoGrid");
    var currentData = grid.dataSource.data();
    if (!ItmCd) {
        ItmCd = currentData[0].ItmCd;
    }
    var count = 0;
    for (var i = 0; i < currentData.length; i++) {
        if (currentData[i].ItmCd.toLowerCase() == ItmCd.toLowerCase()) {
            count += 1;
        }
    }

    if (count == 1) {
        return true;
    } else {
        alert("The Item Code \"" + ItmCd + "\" Already Exist! Please Change..");
        model.set("ItmCd", null);
    }
}

function CheckItmMasItmNmExist(ItmNm, model) {
    var grid = $("#Main_ItmMasGrid").data("kendoGrid");
    var currentData = grid.dataSource.data();
    if (!ItmNm) {
        ItmNm = currentData[0].ItmNm;
    }
    var count = 0;
    for (var i = 0; i < currentData.length; i++) {
        if (currentData[i].ItmNm == ItmNm) {
            count += 1;
        }
    }

    if (count == 1) {
        return true;
    } else {
        alert("The Item Name \"" + ItmNm + "\" Already Exist! Please Change..");
        model.set("ItmNm", null);
    }
}

function AfterGridLoaded() {
    if (FormGlblData.GridLoaded == 0) {
        var grid = $("#Main_ItmMasGrid").data("kendoGrid");
        var Records = grid.dataSource.data(); Records.length > 0 && grid.select("tr:eq(0)");
        FormGlblData.GridLoaded = 1;
    }
}

function GridOnDataBound(arg) {

    //AfterGridLoaded();
    var grid = $("#Main_ItmMasGrid").data("kendoGrid");
    //var Records = grid.dataSource.data(); Records.length > 0 && grid.select("tr:eq(0)");
    $(grid.tbody)
        .on("click",
            "td",
            function (e) {

                var row = $(this).closest("tr");
                grid.select(row);
                var rowIdx = $("tr", grid.tbody).index(row);
                var colIdx = $("td", row).index(this);
                var FieldName = $("#Main_ItmMasGrid").data("kendoGrid").columns[colIdx].field;
                var FieldTitle = $("#Main_ItmMasGrid").data("kendoGrid").columns[colIdx].title;
               // alert(FieldTitle)

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
                if (FieldName == "Usage Unit" || FieldName =="UsageUnit") {
                    var selectedItem = grid.dataItem(grid.select());

                    var ItmKy = selectedItem.ItmKy;
                    var ItmCd = selectedItem.ItmCd;
                    var ItmNm = selectedItem.ItmNm;
                    LoadMultiUnit(ItmKy, ItmCd, ItmNm);
                }

                

            });
}
function AlertMsg() {
    try {
        $("#AlertBox").addClass("Alert AlertAnim");
    }
    catch (e) { }
}