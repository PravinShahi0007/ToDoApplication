var FormGlblData = {
    FormObjData: null,
    TrnTypKy: 1,
    AccessLvlKy: 1,
    ConfiLvlKy: 1,
    TrnKy: 1,
    AllDefalutValueObj: null,
    GotItemRate: 0
};

LoadGloabData();
//CommonObjMas________________________________________
function LoadGloabData() {
    $.ajax({
        url: urlCodes.GetCdKyByConCdAndOurCd,
        dataType: "json",
        type: "POST",
        data: JSON.stringify({
            ObjKy: viewBag.ObjKy,
            ConCd: "LogTyp",
            OurCd: viewBag.OurCd
        }),
        contentType: "application/json; charset=utf-8",
        success: function(TrnTypKy) {
            FormGlblData.TrnTypKy = TrnTypKy;
            GetFormObjData();
        }
    });
}

function GetFormObjData() {
    $.ajax({
        url: urlUsrObjPrp_SelectAllLastChildWeb,
        dataType: "json",
        type: "POST",
        data: JSON.stringify({
            PrntKy: viewBag.ObjKy
        }),
        contentType: "application/json; charset=utf-8",
        success: function(HdrSectionFromDb) {
            FormGlblData.FormObjData = HdrSectionFromDb;
            FormGlblData.AllDefalutValueObj = Get_AllDefalutValue_Obj();
            FormGlblData.AllValidationObj = Get_All_Validation_Obj();
            FormGlblData.AllValidationObj = sortByKey(FormGlblData.AllValidationObj, "ValidationOrder");
            setHdrSectionPropFun();
            Button_From_Dynamic("ButtonSec1");
            DatePickerAndCombo();
            //Clear();
            //CLOSELoadingForm();
        }
    });
}

function setHdrSectionPropFun() {

    // ---------- Set ObjProperties
    setHdrSectionProp("", viewBag.ObjKy, "", "HdrSec1");
    SetHandlingEnterKeyEvent("", viewBag.ObjKy);
    SetFirstFocusObj();
}
//CommonCombondDatePickerLOad________________________________________
function DatePickerAndCombo() {
    $("#HdrSec1_DatPriSetDate_Val").kendoDatePicker({
        format: "dd/MM/yyyy",
        parseFormats: "yyyy/MM/dd",
        min: new Date(31, 2, 2009),
        change: function() {
            GetCurrencyRates();
        }
    });

    $("#HdrSec1_CmbVehicalInt_Cd").kendoComboBox({
        dataValueField: "CdKy",
        dataTextField: "CdNm",
        dataSource: CdmasName("HdrSec1_CmbVehicalInt"),
        change: function(e) {
            var cmb = $("#HdrSec1_CmbVehicalInt_Cd").data("kendoComboBox");
            var cmbVal = cmb.value();
            if (cmbVal != "") {
                var validate = ComboValidations("HdrSec1_CmbVehicalInt_Cd");
                if (validate) {
                    $("#HdrSec1_CmbVehicalInt_Cd").data("kendoComboBox").value(cmbVal);
                    if (cmbVal != 1) {
                        GridDefaultColumns();
                    }
                } else {
                    $("#HdrSec1_CmbVehicalInt_Cd").data("kendoComboBox").value("");
                }
            }
        },
        filter: "startswith",
        suggest: true,
        placeholder: "Select a Model"
    });

    $("#HdrSec1_NmricUSAmt_Val")
        .kendoNumericTextBox({
            decimals: 4,
            format: "{0:N4}",
            spinners: false,
            min: 0,
        });
    $("#HdrSec1_NmriczPndAmt_Val")
        .kendoNumericTextBox({
            decimals: 4,
            spinners: false,
            format: "{0:N4}",
            min: 0,
        });

    //Set Current Date from the client mechine Acually this should be from the server
    SetCurrentDate();

}
//Set Current Date from the client mechine Acually this should be from the server
function SetCurrentDate() {
    $.ajax({
        url: urlGetDateTime,
        contentType: "application/json; charset=utf-8",
        dataType: "Json",
        type: "POST",
        success: function(data) {
            $("#HdrSec1_DatPriSetDate_Val").data("kendoDatePicker").value(data[1]);

            GetCurrencyRates();
        },
        error: function(e) {
            iziToast.error({
                title: "Network Error",
                message: "Network Related Error Please Try Again",

            });
            return false;
        }
    });

}

//________________________________________DataSource
//DateSources
function CdmasName(ObjNm) {
    var ObjKy = GetObjKy(ObjNm);
    var PreKy = 1;
    var dataSource = new kendo.data.DataSource(
        {
            transport: {
                read: {
                    url: urlGetCdMasName,
                    data: {
                        'ObjKy': ObjKy,
                        'TrnTypKy': "1",
                        'PreKy': PreKy,
                    },
                    dataType: "json"
                }
            }

        });
    return dataSource;
}
//Combo Validation
function ComboValidations(cmbNm) {

    var cmb = $("#" + cmbNm + "").data("kendoComboBox");
    var val = cmb.value();

    if (isNaN(val)) {
        alert("'" + val + "' is not a Valid input");
        $("#" + cmbNm + "").data("kendoComboBox").value("");
        return false;
    } else {
        return true;
    }
}

//Load theGrid Data
//Grid Configure
function LoadGridWithColumnProp(columnsFinal, gridNo) {
    var
        Date = document.getElementById("HdrSec1_DatPriSetDate_Val")
            .value; //$("#HdrSec1_DatPriSetDate_Val").data("kendoDatePicker").value();
    var vehKey = $("#HdrSec1_CmbVehicalInt_Cd").data("kendoComboBox").value();

    var dataSource = new kendo.data.DataSource({
        transport: {
            read: {
                url: urlSelectAction, // urlLoadGridDetaiurlLoadGridDetai, 
                data: {
                    'Date': Date,
                    'ModelKy': vehKey,
                    'objKy': viewBag.ObjKy
                },
                dataType: "json"
            },

        },
        batch: true,
        sort: ({ field: "LiNo", dir: "asc" }),
        // pageSize: 10,
        schema: {
            model: {
                id: "CdMasCdDtKy",
                fields: //Relavent fields of the grid should be bind with following model items
                {
                    CdKy: { editable: false, nullable: false, type: "number" },
                    CdMasCdDtKy: { editable: false, nullable: false, type: "number" },
                    LiNo: { editable: false, nullable: false, type: "number" },
                    CdNm: { editable: false, nullable: false, type: "string" },
                    Value: { editable: true, nullable: true, type: "number" },
                    controlConKy: { editable: false, nullable: false, type: "number" },
                }
            }
        }
    });

    $("#ConfigGrid")
        .kendoGrid({
            dataSource: dataSource,
            sortable: true,
            autobind: true,
            navigatable: true,
            editable: true,
            filterable: {
                mode: "row"
            },
            reorderable: true,
            scrollable: true,
            // pageSize: 20,
            pageable: true,
            selectable: "row",
            resizable: true,
            //  dataBound: onDataBound,
            pageable: { refresh: true, pageSizes: [5, 10, 20, 50, 100] },
            columns: columnsFinal,

        });
}

//Grid Default Column Set
function GridDefaultColumns() {

    var columnsDefine = [
        {
            field: "CdKy",
            title: "CdKy",
            width: "100px",
            hidden: "true",
            editor: function(container, options) {
                var model = options.model;
            }

        },
        {
            field: "CdMasCdDtKy",
            title: "CdMasCdDtKy",
            width: "100px",
            hidden: "true",
            editor: function(container, options) {
                var model = options.model;
            }

        },
        {
            field: "controlConKy",
            title: "controlConKy",
            width: "100px",
            hidden: "true",
            editor: function(container, options) {
                var model = options.model;
            }

        },
        {
            field: "LiNo",
            title: "LiNo",
            width: "40px",
            filterable: {
                cell: {
                    showOperators: false,
                    operator: "contains"
                }
            },
            attributes: { class: "ob-Center" },
            editor: function(container, options) {
                var model = options.model;
            }
        },
        {
            field: "CdNm",
            title: "Name",
            width: "400px",
            editor: function(container, options) {
                var model = options.model;
            }
         
        },
        {
            field: "Value",
            title: "Value",
            width: "200px",
            attributes: { style: "text-align:right;" },
            editor: ValueEditor,
            

        },
    ];
    var gridNo = 1;
    var columnsFinal = setColumnProp(columnsDefine, viewBag.ObjKy, "", "Maingrid", gridNo);
}

//Save And Update Function -- Curency Update also Included in this function
function SaveAndUpdate() {
    saveCurrencyRates();
    var VehKy = $("#HdrSec1_CmbVehicalInt_Cd").data("kendoComboBox").value();
    if (VehKy == 1 || VehKy == "" || !VehKy) {
        return;
    }
    saveAndUpdateGrid();
}
//Update Grid Details
function saveAndUpdateGrid() {

    var EftvDt = document.getElementById("HdrSec1_DatPriSetDate_Val").value; 
    var GrpCdKy = $("#HdrSec1_CmbVehicalInt_Cd").data("kendoComboBox").value();
    var grid = $("#ConfigGrid").data("kendoGrid").dataSource.data();
    var updatedRecords = [];
    var newRecords = [];
    for (var i = 0; i < grid.length; i++) {
        if (grid[i].dirty && grid[i].CdMasCdDtKy == 0) {
            newRecords.push(grid[i].toJSON());
        } else if (grid[i].dirty && grid[i].CdMasCdDtKy != 0) {
            updatedRecords.push(grid[i].toJSON());
        }
    }
    if (updatedRecords.length == 0 && newRecords.length == 0) {
        return;
    }

    //ajax for unsert update and delete
    $.ajax({
        url: urlSaveUpdateAction, 
        data: JSON.stringify({
            newGridDetail: kendo.stringify(newRecords),
            updatedGridDetail: kendo.stringify(updatedRecords),
            objKy: viewBag.ObjKy,
            EftvDt: EftvDt,
            GrpCdKy: GrpCdKy,

        }),
        contentType: "application/json; charset=utf-8",
        dataType: "Json",
        type: "POST",
        success: function(data) {

            if (data == true) {
                iziToast.success({
                    title: "Saved",
                    message: "Successfully Saved!",
                });


            } else {
                iziToast.error({
                    title: "Error",
                    message: "Please TryAgain",
                });

            }
            //reload the grid after savng
            GridDefaultColumns();

        },
        error: function(arg) {
            iziToast.error({
                title: "Network Error",
                message: "Network Related Error Please Try Again",

            });
            GridDefaultColumns();
            return false;
        }

    });

}
//This is use as an editor funciton to change the value inside the grid
function ValueEditor(container, options) {
    $('<input data-bind="value:' + options.field + '"/>')
        .appendTo(container)
        .kendoNumericTextBox({
            decimals: 4,
            format: "{0:n0}",
            spinners: false
        });
}

//Get and set Currency rates
function GetCurrencyRates() {
    var EftvDt = document.getElementById("HdrSec1_DatPriSetDate_Val").value;
    $.ajax({
        url: urlGetExRateAction, 
        data: JSON.stringify({
            objKy: viewBag.ObjKy,
            EftvDt: EftvDt
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "Json",
        type: "POST",
        success: function(data) {
            $("#HdrSec1_NmricUSAmt_Val").data("kendoNumericTextBox").value(data[0].Value);
            $("#HdrSec1_NmriczPndAmt_Val").data("kendoNumericTextBox").value(data[1].Value);

        },
        error: function(arg) {
            iziToast.error({
                title: "Network Error",
                message: "Network Related Error Please Try Again",

            });
            GridDefaultColumns();
            return false;
        }

    });

}
//Currency save funtion Update also the same 
function saveCurrencyRates() {
    var EftvDt = document.getElementById("HdrSec1_DatPriSetDate_Val").value;
    var dolerVal = $("#HdrSec1_NmricUSAmt_Val").data("kendoNumericTextBox").value();
    var poundVal = $("#HdrSec1_NmriczPndAmt_Val").data("kendoNumericTextBox").value();

    $.ajax({
        url: urlSaveUpdateExRateAction,
        data: JSON.stringify({
            dolerVal: dolerVal,
            poundVal: poundVal,
            objKy: viewBag.ObjKy,
            EftvDt: EftvDt
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "Json",
        type: "POST",
        success: function(data) {
            if (data == true) {
                iziToast.success({
                    title: "Saved",
                    message: "Currency Successfully Saved!",
                });


            } else {
                iziToast.error({
                    title: "Error",
                    message: "Currency Update fail TryAgain",
                });

            }
            GetCurrencyRates();
        },
        error: function(arg) {
            iziToast.error({
                title: "Network Error",
                message: "Network Related Error Please Try Again",

            });
            GetCurrencyRates();
            return false;
        }

    });

}

