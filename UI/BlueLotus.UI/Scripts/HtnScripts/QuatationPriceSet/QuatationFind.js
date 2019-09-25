function FindRecord() {
    $("#FindFormQuoteConfig").show().kendoWindow({
        width: "1000px",
        height: "600px",
        modal: true,
        title: "Find Form"
    });
    $("#FindFormQuoteConfig").data("kendoWindow").center().open();
    LoadFindLogDatePicker();

}

function LoadFindLogDatePicker() {
    $("#HdrSec2_DatFindFromDate_Val").kendoDatePicker({
        format: "dd/MM/yyyy",
        parseFormats: ["/yyyy/MM/dd"],
        min: new Date(31, 2, 2009),
        change: function () {
            var value = this.value();

        }
    });
    $("#HdrSec2_DatFindToDate_Val")
        .kendoDatePicker({
            format: "dd/MM/yyyy",
            parseFormats: ["/yyyy/MM/dd"],
            min: new Date(31, 2, 2009),
            change: function () {
                var value = this.value();

            }
        });


    $.ajax({
        url: urlGetDateTime,
        contentType: "application/json; charset=utf-8",
        dataType: "Json",
        type: "POST",
        success: function (data) {
            $("#HdrSec2_DatFindToDate_Val").data("kendoDatePicker").value(data[1]);
        },
        error: function (e) {
            iziToast.error({
                title: 'Network Error',
                message: 'Network Related Error Please Try Again',

            });
            return false;
        }
    });

    comboLoad();
}

function comboLoad() {
    $("#HdrSec2_CmbVehicalInt_Cd").kendoComboBox({
        dataValueField: "CdKy",
        dataTextField: "CdNm",
        dataSource: CdmasName("HdrSec1_CmbVehicalInt"),
        change: function (e) {
            var cmb = $("#HdrSec2_CmbVehicalInt_Cd").data("kendoComboBox");
            var cmbVal = cmb.value();
            if (cmbVal != "") {
                var validate = ComboValidations("HdrSec2_CmbVehicalInt_Cd");
                if (validate) {
                    $("#HdrSec2_CmbVehicalInt_Cd").data("kendoComboBox").value(cmbVal);
                } else {
                    $("#HdrSec2_CmbVehicalInt_Cd").data("kendoComboBox").value("");
                }
            }
        },
        filter: "startswith",
        suggest: true,
        placeholder: "Select a Model"
    });

}
function FindLoadGrid() {
    var dataSource = new kendo.data.DataSource({
        batch: true,
        pageSize: 10,
        schema: {
            model: {
                id: "LogDetKy",
                fields: //Relavent fields of the grid should be bind with following model items
                {
                    Lino: { editable: false, nullable: false, type: "number" },
                    GrpCdKy: { editable: true, nullable: false, type: "number" },
                    Code: { editable: true, nullable: false, type: "string" },
                    CdNm: { editable: true, nullable: false, type: "string" },
                    EftvDt: { editable: true, nullable: false, type: "string" }

                }
            }
        }
    });

    $("#FindFormGrid").kendoGrid({
        dataSource: dataSource,
        navigatable: true,
        filterable: {
            mode: "row"
        },
        pageable: true,
        sortable: true,
        reorderable: true,
        selectable: "column",
        pageable: { refresh: true, pageSizes: [5, 10, 20, 50, 100] },
        columns: [
            {
                field: "Lino", title: "LiNo", width: "50px",
                filterable: {
                    cell: {
                        showOperators: false,
                        operator: "startswith"
                    }
                }
            },

            {
                field: "GrpCdKy", title: "GrpCdKy", width: "100px", hidden: true,
            },
            {
                field: "Code", title: "Code", width: "50px",
                filterable: {
                    cell: {
                        showOperators: false,
                        operator: "startswith"
                    }
                }

            },
            {
                field: "CdNm",
                title: "CdNm",
                width: "100px",
                filterable: {
                    cell: {
                        showOperators: false,
                        operator: "startswith"
                    }
                }
            },


            {
                field: "EftvDt", title: "EftvDt", width: "100px",
                filterable: {
                    cell: {
                        showOperators: false,
                        operator: "startswith"
                    }
                }
            }
        ],
        resizable: true,
        dataBinding: function () {
            record = (this.dataSource.page() - 1) * this.dataSource.pageSize();
        },
        editable: false
    });
}


function Search() {
    // var FrmDt = $("#HdrSec2_DatFindFromDate_Val").val();
    var FrmDt = kendo.toString($("#HdrSec2_DatFindFromDate_Val").data("kendoDatePicker").value(), "yyyy/MM/dd");
    if (FrmDt == undefined || FrmDt == "" || FrmDt == null) {
        var FrmDt = "1900/01/01";
    }
    var ToDt = kendo.toString($("#HdrSec2_DatFindToDate_Val").data("kendoDatePicker").value(), "yyyy/MM/dd");

    //  var ToDt = $("#HdrSec2_DatFindToDate_Val").val();
    if (ToDt == undefined || ToDt == "" || ToDt == null) {
        var ToDt = "2078/01/01";//"1/1/2078";
    }
    var ModelKy = $("#HdrSec2_CmbVehicalInt_Cd").data("kendoComboBox").value();
    if (!ModelKy || ModelKy == "") {
        ModelKy = 1;
    }
    $.ajax({
        url: urlFindAction,
        data: JSON.stringify({
            FrmDt: FrmDt,
            ToDt: ToDt,
            GrpCdKy: ModelKy,
            ObjKy: viewBag.ObjKy,
        }),
        contentType: 'application/json; charset=utf-8',
        dataType: "Json",
        type: "POST",
        success: function (data) {
            FindLoadGrid();
            $('#FindFormGrid').data("kendoGrid").dataSource.filter(null);
            var grid = $("#FindFormGrid").data("kendoGrid");
            grid.dataSource.data([]);
            for (i = 0; i < data.length; i++) {
                $("#FindFormGrid").data("kendoGrid").dataSource.add({
                    Lino: data[i].Lino,
                    GrpCdKy: data[i].GrpCdKy,
                    Code: data[i].Code,
                    CdNm: data[i].CdNm,
                    EftvDt: data[i].EftvDt
                });
            }

        },
        error: function (e) {
            iziToast.error({
                title: 'Network Error',
                message: 'Network Related Error Please Try Again',

            });
            return false;
        }
    });

}

function ExitFindForm() {
    try {
        $("#FindFormGrid").data("kendoGrid").dataSource.data([]);

    } catch (e) {
    }

    $('#FindFormQuoteConfig').data('kendoWindow').close();
}

$("#FindFormGrid").on("dblclick", "tr.k-state-selected", function () {
    var grid = $('#FindFormGrid').data().kendoGrid;
    var selectedItem = grid.dataItem(grid.select());
    var GrpCdKy = selectedItem.GrpCdKy;
    var EftvDt = selectedItem.EftvDt;
    if (GrpCdKy != "" || GrpCdKy != undefined || GrpCdKy != null) {
        $("#HdrSec1_DatPriSetDate_Val").data("kendoDatePicker").value(EftvDt);
        $("#HdrSec1_CmbVehicalInt_Cd").data("kendoComboBox").value(GrpCdKy);
        GridDefaultColumns();
        GetCurrencyRates();
        ExitFindForm();
    } else {
        alert("please Select Any Record");
    }
});

function selected() {
    var grid = $('#FindFormGrid').data().kendoGrid;
    var selectedItem = grid.dataItem(grid.select());
    var GrpCdKy = selectedItem.GrpCdKy;
    var EftvDt = selectedItem.EftvDt;
    if (GrpCdKy != "" || GrpCdKy != undefined || GrpCdKy != null) {
        $("#HdrSec1_DatPriSetDate_Val").data("kendoDatePicker").value(EftvDt);
        $("#HdrSec1_CmbVehicalInt_Cd").data("kendoComboBox").value(GrpCdKy);
        GridDefaultColumns();
        GetCurrencyRates();
        ExitFindForm();
    } else {
        alert("please Select Any Record");
    }
}
