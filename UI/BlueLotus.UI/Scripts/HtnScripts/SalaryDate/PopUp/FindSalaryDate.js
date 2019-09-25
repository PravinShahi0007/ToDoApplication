
function DesDataSource() {
    var dataSource = new kendo.data.DataSource(
    {
        transport: {
            read: {
                url: urlFindSalary.GetDestList,
                dataType: "json"
            }
        }
    });
    return dataSource;
}

function CodeDatasource() {
    var dataSource = new kendo.data.DataSource(
    {
        transport: {
            read: {
                url: urlFindSalary.GetCodelist,
                dataType: "json"
            }
        }
    });
    return dataSource;
}

function LoadSalaryDateComboFindForm() {

    $("#HdrPart_CmbCode_Cd").kendoComboBox({
        dataValueField: "CdKy",
        dataTextField: "Code",
        dataSource: Code_SelectMob_Datasource('HdrPart_CmbCode_Cd'),
        change: function (e) {
            var comboboxValue = $("#HdrPart_CmbCode_Cd").data("kendoComboBox");
            var cmbValue = comboboxValue.value();
            validate = ComboValidations("HdrPart_CmbCode_Cd");

            if (validate) {
                $("#HdrPart_CmbDes_Cd").data("kendoComboBox").value(cmbValue);
            }
        },
        filter: "contains",
        suggest: true,
        placeholder: "Select a Code.."
    });

    $("#HdrPart_CmbDes_Cd").kendoComboBox({
        dataValueField: "CdKy",
        dataTextField: "CdNm",
        dataSource: CdNm_SelectMob_Datasource('HdrPart_CmbDes_Cd'),
        change: function (e) {
            var comboboxValue = $("#HdrPart_CmbDes_Cd").data("kendoComboBox");
            var cmbValue = comboboxValue.value();
            validate = ComboValidations("HdrPart_CmbDes_Cd");

            if (validate) {
                $("#HdrPart_CmbCode_Cd").data("kendoComboBox").value(cmbValue);
            }
        },
        filter: "contains",
        suggest: true,
        placeholder: "Select a From Description.."
    });
}


function ComboValidations(cmbNm) {
    var cmb = $("#" + cmbNm + "").data("kendoComboBox");
    var val = cmb.value();
    if (isNaN(val)) {
        alert("'" + val + "' is not a Valid input");
        $("#" + cmbNm + "").data("kendoComboBox").input.focus();
        return false;
    } else {
        return true;
    }
}


function LoadSalaryDataPickerFindForm() {
    $("#SalaryDt").width(140).kendoDatePicker({
        format: "dd/MM/yyyy",
        min: new Date(1990, 2, 31)
    });
    $("#SalaryDt").closest("span.k-datepicker").width(140);

}

function DocReadyCusFindForm() {
    var Now = new Date();
    var dd = Now.getDate() - 1;
    if (dd == 0) dd = 01;
    var mm = Now.getMonth() + 1;
    var yy = Now.getFullYear();
    $("#SalaryDt").val(dd + "/" + mm + "/" + yy);
    LoadSalaryDateComboFindForm();
    LoadSalaryDataPickerFindForm();
    LoadSalaryGridFindView();

    SearchSalary();

    $('#fAprSal').prop('checked', false);
}

function LoadSalaryGridFindView() {

    var dataSource = new kendo.data.DataSource({
        batch: true,
        pageSize: 10,
        schema: {
            model: {
                id: "SalDtKy",
                fields: //Relavent fields of the grid should be bind with following model items
                {
                    // Lino: { editable: false, nullable: false, type: "number" },
                    SalDtKy: { editable: true, nullable: false,},
                    SalDt: { editable: false, nullable: false, type: "date", format: "{0:dd/MM/yyyy}" },
                    SalPrcsGrpKy: { editable: false, nullable: false, },
                    SalPrcsGrpCd: { editable: false, nullable: false, },
                    SalPrcsGrpNm: { editable: false, nullable: false, },
                    fAprSal: { editable: false, nullable: false, type: "number" },
                }
            }
        }
    });

    $("#FindFormGridSalary").kendoGrid({
        dataSource: dataSource,
        autobind: true,
        navigatable: true,
        filterable: true,
        pageable: true,
        sortable: true,
        reorderable: true,
        columnMenu: true,
        selectable: "row",
        pageable: { refresh: true, pageSizes: [5, 10, 20, 50, 100] },
        columns: [
             //{ field: "Lino", title: "LiNo", width: "50px" },
               {
                   field: "SalDtKy", title: "SalDtKy", width: "50px"},
             { field: "SalPrcsGrpCd", title: "Sal Proc Grp Code", width: "50px" },
             { field: "SalPrcsGrpNm", title: "Salary Process Group", width: "50px" },
              { field: "SalPrcsGrpKy", title: "Salary Process", width: "50px" },
             {
                 field: "ActuSalDt", title: "EftDate", width: "100px", type: "date", format: "{0:dd/MM/yyyy}",
             },
             {
                 field: "SalDt", title: "ActuSalDt", width: "100px", type: "date", format: "{0:dd/MM/yyyy}",
             },

             {
                 field: "ToDt", title: "To Date", width: "100px", type: "date", format: "{0:dd/MM/yyyy}",
             },

             { field: "fAprSal", title: "Finalize Approval", width: "100px" },
             
        ],
        resizable: true,
        dataBinding: function () {
            record = (this.dataSource.page() - 1) * this.dataSource.pageSize();
        },
        editable: true,
        height: "360px"
    });
}

function SearchSalary() {

    var SalPrcsGrpKy = $("#HdrPart_CmbCode_Cd").data('kendoComboBox').value();
    if (SalPrcsGrpKy == undefined || SalPrcsGrpKy == "" || SalPrcsGrpKy == null) {
        var SalPrcsGrpKy = 1;
    }

    var SalDt = $("#SalaryDt").val();
    if (SalDt == undefined || SalDt == "" || SalDt == null) {
        var SalDt = "1/1/1900";
    }
    var Checkbox = ($("#fAprSal").is(':checked')) ? 1 : 0;


    $.ajax({
        url: urlFindSalary.LoadSalaryGridFindView,
        data: JSON.stringify({
            ObjKy: viewBag.ObjKy,
            SalPrcsGrpKy: SalPrcsGrpKy,
            SalDt: SalDt,
            fAprSal: Checkbox,

        }),
        contentType: 'application/json; charset=utf-8',
        dataType: "Json",
        type: "POST",
        success: function (data) {

            $('#FindFormGridSalary').data("kendoGrid").dataSource.filter(null);
            var grid = $("#FindFormGridSalary").data("kendoGrid");
            grid.dataSource.data([]);
            for (i = 0; i < data.length; i++) {
                $("#FindFormGridSalary").data("kendoGrid").dataSource.add({
                   // Lino: data[i].Lino,
                    SalPrcsGrpKy: data[i].SalPrcsGrpKy,
                    SalPrcsGrpNm: data[i].SalPrcsGrpNm,
                    SalPrcsGrpCd: data[i].SalPrcsGrpCd,
                    SalDt: data[i].SalDt,
                    fAprSal: data[i].fAprSal,
                    SalDtKy: data[i].SalDtKy,

                });
            }
        },
        error: function (e) {
            return false;
        }
    });

}


function Validate_ComboCode(ComboNm, ColNm) {

    var isVald = false;

    var cmb = $("#" + ComboNm + "").data("kendoComboBox");
    var text = cmb.text();

    var ds = cmb.dataSource;
    var len = ds._data.length;
    if (len > 0) {
        var i;
        for (i = 0; i < len; i++) {
            var val = ds._data[i][ColNm];
            //alert("Value : " + val);
            //values.push(val);
            if (val == text) {
                isVald = true;
            }
        }
    }

    if (isVald) {
        return true;
    } else {
        alert("'" + text + "' is not a Valid input");
        $("#" + ComboNm + "").data("kendoComboBox").input.focus();
        return false;
    }
}

function btnCalSalary() {
    $('#FindFormSalary').data('kendoWindow').close();
}

function Clear() {
    var grid = $("#FindFormGridSalary").data("kendoGrid");
    grid.dataSource.data([]);

    $("#HdrPart_CmbCode_Cd").data('kendoComboBox').value(null);
    $("#HdrPart_CmbDes_Cd").data('kendoComboBox').value(null);
   // $("#SalaryDt").val(null);
  //  $("#HdrPart_PayDate").val(null);
   // $("#HdrPart_ProDate").val(null);
   // $("#HdrPart_FrmDate").val(null);
   // $("#HdrPart_ToDate").val(null);
    $("#fAprSal").prop("checked", false);
}

$(".k-datepicker, .k-combobox, .k-numerictextbox,.k-input").css('width', "100%");

$('#FindFormGridSalary').dblclick(function () {
    LaodSelectedRecordFrmFindFrm();
});