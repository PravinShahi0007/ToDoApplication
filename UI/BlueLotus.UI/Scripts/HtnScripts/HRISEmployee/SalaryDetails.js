$(document).ready(function () {
    var OurCode = "@(ViewBag.ObjCaptn)";
    LoadDropDown();
    Tooltip();
    SelectText();
    LoadDatePicker();
    var todayDate = new Date();
    $("#fromDate").data("kendoDatePicker").value(todayDate);
    LoadSalaryDetailsGrid();
    BrnSelect(1);
    $(document).keydown(function (e) {
        if (e.which === 32 && e.ctrlKey) {
            //alert('control + y');
            InsertToGrid();
        }
        else if (e.which === 90 && e.ctrlKey) {
            //alert('control + z');
            InsertToGrid();
        }
    });
});

function clearAll() {
    document.getElementById("amount").value = "";
    document.getElementById("HiddenBasicSalary").value = "";
    document.getElementById("Remark").value = "";
    document.getElementById("basicSalary").value = "";
    document.getElementById("Reimbursements").value = "";
   // document.getElementById("HiddenBasicSalary").value = "";
    document.getElementById("accountCode").value = "";

    $("#cmbAllowenceType").data("kendoComboBox").value("");
     $("#cmbBankName").data("kendoComboBox").value("");
    $("#cmbBrnName").data("kendoComboBox").value("");
    $("#SalaryDetailsGrid").data("kendoGrid").dataSource.data('');
    var todayDate = new Date();
    $("#fromDate").data("kendoDatePicker").value(todayDate);
}

function clearfunction() {
    document.getElementById("amount").value = "";
    //document.getElementById("HiddenBasicSalary").value = "";
    document.getElementById("Remark").value = "";
    //document.getElementById("basicSalary").value = "";
    //document.getElementById("HiddenBasicSalary").value = "";
    //document.getElementById("accountCode").value = "";

    $("#cmbAllowenceType").data("kendoComboBox").value("");
   // $("#cmbBankName").data("kendoComboBox").value("");
    //$("#cmbBrnName").data("kendoComboBox").value("");
    //$("#SalaryDetailsGrid").data("kendoGrid").dataSource.data('');
    var todayDate = new Date();
    $("#fromDate").data("kendoDatePicker").value(todayDate);
}

$("#SalaryDetailsGrid").dblclick(function () {
    var grid = $("#SalaryDetailsGrid").data().kendoGrid;
    var selectedItem = grid.dataItem(grid.select());

    var AllowenceType = selectedItem.AllowenceType;
    var AllowenceTypeKy = selectedItem.AllowenceTypeKy;
    var Allowance = selectedItem.Allowance;
    var FromDate = selectedItem.FromDate;

    $("#cmbAllowenceType").data("kendoComboBox").text(AllowenceType);
    $("#cmbAllowenceType").data("kendoComboBox").value(AllowenceTypeKy);
    $('#amount').val(Allowance);
    $('#fromDate').val(FromDate);

});

function clearGrid() {
    $("#SalaryDetailsGrid").data("kendoGrid").dataSource.data();
}

function AfterFindEmp(EmpKy) {
    clearAll();
    clearfunction();
    clearGrid();
    $.ajax({
        url: UrlGetEmpSalaryDet,
        data: {
            EmpKy: EmpKy
        },
        dataType: "Json",
        type: "POST",
        success: function (data) {
            $('#basicSalary').val(data[0].BasicAmount);
            $('#HiddenBasicSalary').val(data[0].BasicAmount);
            $('#BasicfromDate').val(data[0].BasicfromDate);
            $('#Reimbursements').val(data[0].Reimbursements);

            if (data[0].IsOTBata == 1) {
                $('#IsOTBata').attr('checked', true);
            }
            else {
                $('#IsOTBata').attr('checked', false);
            }
            if (data[0].IsBonus == 1) {
                $('#IsBonus').attr('checked', true);
            }
            else {
                $('#IsBonus').attr('checked', false);
            }
            var GridVal = [];
            for (var i = 0; i < data.length; i++) {
                if (data[i].AllowenceTypeKy > 1) {
                    GridVal.push(data[i]);
                } 
            }

            //if (data[0].LiNo > 0 || data[1].LiNo > 0)
            $("#SalaryDetailsGrid").data("kendoGrid").dataSource.data(GridVal);

            $('#accountCode').val(data[0].AccountCode);
            if (data[0].BankNameKy > 1)
            {
                $("#cmbBankName").data("kendoComboBox").value(data[0].BankNameKy);
                $("#cmbBankName").data("kendoComboBox").trigger("change");
                $("#cmbBrnName").data("kendoComboBox").value(data[0].BrnNameKy);
            }
        },
        error: function (e) {
            return false;
        }
    });
}

function LoadDatePicker() {
    $("#fromDate").kendoDatePicker({

        format: "dd/MM/yyyy",
        min: new Date(31, 2, 2010)
    });
    $("#BasicfromDate").kendoDatePicker({

        format: "dd/MM/yyyy",
        min: new Date(31, 2, 2010)
    });
    $(".k-datepicker, .k-combobox, .k-numerictextbox,.k-input").css('width', "100%");

}

function GetCdMas_LookupWeb(ConCd) {
    var dataSource = new kendo.data.DataSource(
      {
          transport: {
              read: {
                  url: urlHRISEmployeeGetCdMas_LookupWeb,
                  data: { ConCd: ConCd },
                  dataType: "json"
              }
          }
      });
    return dataSource;
}

function GetBnkMas_LookupWeb(brn) {
    var dataSource = new kendo.data.DataSource(
      {
          transport: {
              read: {
                  url: urlHRISGetBnkMas_LookupWeb,
                  data : { BnkKy : brn },
                  dataType: "json"
              }
          }
      });
    return dataSource;
}

//Load The Drop DownList
function LoadDropDown() {
    $("#cmbAllowenceType").kendoComboBox({
        dataValueField: "CdKy",
        dataTextField: "CdNm",
        dataSource: GetCdMas_LookupWeb('Alw'),
        filter: "contains",
        suggest: true,
        placeholder: "Select a Allowence Type"
    });
    $("#cmbBankName").kendoComboBox({
        dataValueField: "BnkKy",
        dataTextField: "BnkNm",
        dataSource: GetBnkMas_LookupWeb(1),
        filter: "contains",
        change: function () {

            var validation = ComboValidations("cmbBankName");

            if (validation) {
                var BnkKy = $("#cmbBankName").data("kendoComboBox").value();
                BrnSelect(BnkKy);
            }
        },
        suggest: true,
        placeholder: "Select a Allowence Type"
    });
    $("#cmbBrnName").kendoComboBox({
        dataValueField: "BrnKy",
        dataTextField: "BrnNm",
        dataSource: GetBnkMas_LookupWeb(1),
        filter: "contains",
        suggest: true,
        placeholder: "Select a Allowence Type"
    });
}

function BrnSelect(BnkKy) {
    $("#cmbBrnName").kendoComboBox({
        dataValueField: "BrnKy",
        dataTextField: "BrnNm",
        dataSource: GetBnkMas_LookupWeb(BnkKy),
        filter: "contains",
        suggest: true,
        placeholder: "Select a Bank"
    });
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

//Load Gid Details
function LoadSalaryDetailsGrid() {
    var dataSource = new kendo.data.DataSource({
        batch: true,
        pageSize: 10,
        schema: {
            model: {
                id: "EmpKy",
                fields: //Relavent fields of the grid should be bind with following model items
                {
                    LiNo: { editable: false, nullable: false, type: "number" },
                    AllowenceType: { editable: true, nullable: false, type: "string" },
                    AllowenceTypeKy: { editable: true, nullable: false, type: "number" },
                    Allowance: { editable: true, nullable: false, type: "string" },
                    FromDate: { editable: true, nullable: false, type: "string" }
                }
            }
        },
    });
    $("#SalaryDetailsGrid").kendoGrid({
        dataSource: dataSource,
        sortable: true,
        autobind: true,
        navigatable: true,
        scrollable: true,
        pageSize: 10,
        pageable: true,
        selectable: "row",
        resizable: true,
        pageable: { refresh: true, pageSizes: [5, 10, 20, 50, 100] },

        columns: [
            {
                field: "LiNo",
                title: "LiNo",
                width: "40px",
                attributes: { class: "ob-Center" }
            },
            {
                field: "AllowenceType",
                title: "Allowence Type",
                width: "100px",
            },
            {
                field: "AllowenceTypeKy",
                title: "Allowence Type",
                hidden: true,
            },
            {
                field: "HiddenBasicAmount",
                title: "HiddenBasicAmount",
                hidden: true,
            },
            {
                field: "Allowance",
                title: "Allowance",
                width: "120px",
            },
            {
                field: "FromDate",
                title: "From Date",
                width: "100px",
            },
            {
                field: "Remark",
                title: "Remark",
                width: "100px",
            },
        ]
    });
}

function InsertToGrid() {
    var grid = $("#SalaryDetailsGrid").data("kendoGrid");
    var dataSource1 = grid.dataSource;
    var total = dataSource1.data().length;
    var AllowenceType = $("#cmbAllowenceType").data("kendoComboBox").text();
    var AllowenceTypeKy = (!$("#cmbAllowenceType").data("kendoComboBox").value()) ? 1 : $("#cmbAllowenceType").data("kendoComboBox").value();
    var Allowance = $('#amount').val();
    var FromDate = $('#fromDate').val();
    var HiddenBasicAmount = $('#HiddenBasicSalary').val();
    var Remark = $('#Remark').val();
 
    grid.dataSource.insert(
        total,
        {
            LiNo: total + 1,
            AllowenceType: AllowenceType,
            AllowenceTypeKy: AllowenceTypeKy,
            Allowance: Allowance,
            FromDate: FromDate,
            HiddenBasicAmount: HiddenBasicAmount,
            Remark: Remark
        });
    clearfunction();
}

function SaveDetails(action) {
    var EmpNo = document.getElementById("EmpNo").value;
    var EmpNm = document.getElementById("EmpNm").value;
    var EmpKy = document.getElementById("EmpKy").value;


    var BasicAmount = document.getElementById("basicSalary").value;
    var HiddenBasicAmount = document.getElementById("HiddenBasicSalary").value;
    var BasicfromDate = document.getElementById("BasicfromDate").value;
    var Reimbursements = document.getElementById("Reimbursements").value;



    var BankNameKy = (!$("#cmbBankName").data("kendoComboBox").value()) ? 1 : $("#cmbBankName").data("kendoComboBox").value();
    var BrnNameKy = (!$("#cmbBrnName").data("kendoComboBox").value()) ? 1 : $("#cmbBrnName").data("kendoComboBox").value();
    var AccountCode = document.getElementById("accountCode").value;

    var grid = $("#SalaryDetailsGrid").data("kendoGrid");
    var dataSource = grid.dataSource;

    //records on current view / page   
    var recordsOnCurrentView = dataSource.view().length;
    //total records
    var totalRecords = dataSource.total();

    var grid = $("#SalaryDetailsGrid").data("kendoGrid");
    var currentData = grid.dataSource.data();
    var updatedRecords = [];
    var newRecords = [];

    var IsOTBata = 0;
    if ($('#IsOTBata').is(":checked")) {
        IsOTBata = 1;
    } else {
        IsOTBata = 0;
    }
    var IsBonus = 0;
    if ($('#IsBonus').is(":checked")) {
        IsBonus = 1;
    } else {
        IsBonus = 0;
    }
    //alert('IsOTBata: ' + IsOTBata);
    //alert('IsBonus: ' + IsBonus);
    for (var i = 0; i < currentData.length; i++) {
        if (currentData[i].isNew()) {
            newRecords.push(currentData[i].toJSON());
        } else if (currentData[i].Dirty == "Dirty" && currentData[i].AccTrnKy > 0) {
            updatedRecords.push(currentData[i].toJSON());
        }
    }

    var newRecordsHdr = {
        EmpKy: EmpKy,
        EmpNm: EmpNm,
        EmpNo: EmpNo,
        BasicAmount: BasicAmount,
        HiddenBasicAmount: HiddenBasicAmount,
        BankNameKy: BankNameKy,
        BrnNameKy: BrnNameKy,
        AccountCode: AccountCode,
        IsBonus: IsBonus,
        IsOTBata: IsOTBata,
        BasicfromDate: BasicfromDate,
        Reimbursements: Reimbursements
    }

    $.ajax({
        url: urlInsertSalaryDet,
        data: JSON.stringify({
            empSalaryData: kendo.stringify(newRecords),
            empSalaryHdr: JSON.stringify(newRecordsHdr)
        }),
        contentType: 'application/json; charset=utf-8',
        dataType: "Json",
        type: "POST",
        success: function (data) {
            //ClearGriddetails();
            alert('Saved Succesfuly..');
        },
        error: function (e) {
            return false;
        }
    });
}

function SaveUpdate(action) {
    if (action == "save" || action == "saveandnew") {
        SaveDetails(action);
    }
}

function ClearGriddetails() {
    var grid = $("#SalaryDetailsGrid").data("kendoGrid");
    grid.dataSource.data([]);
}