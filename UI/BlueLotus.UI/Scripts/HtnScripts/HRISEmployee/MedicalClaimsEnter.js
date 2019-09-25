$(document).ready(function () {
    var OurCode = "@(ViewBag.ObjCaptn)";
    LoadDropDown();
    //Load the tooltip //COmmo srcipt
    Tooltip();
    //Selecting the text//COmmo srcipt
    SelectText();
    LoadDatePicker();
    var todayDate = new Date();
    $("#fromDate").data("kendoDatePicker").value(todayDate);
    $("#toDate").data("kendoDatePicker").value(todayDate);
    $("#claimDate").data("kendoDatePicker").value(todayDate);
    LoadMedicalClaimsGrid();

    //$(window).keypress(function (event) {
    //    if (!(event.which == 115 && event.ctrlKey) && !(event.which == 19)) return true;
    //    InsertToGrid();
    //    event.preventDefault();
    //    return false;
    //});

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
    $("#annualLimit, #amount").change(function () {
        var annual = $("#annualLimit").val();
        var amount = $("#amount").val();
        var balance = annual - amount;
        $("#balance").val(balance);
    });

});
//calander vaucherDate
function LoadDatePicker() {
    $("#fromDate").kendoDatePicker({

        format: "dd/MM/yyyy",
        min: new Date(31, 2, 2010)
    });
    $("#toDate").kendoDatePicker({

        format: "dd/MM/yyyy",
        min: new Date(31, 2, 1990)
    });
    $("#claimDate").kendoDatePicker({

        format: "dd/MM/yyyy",
        min: new Date(31, 2, 1990)
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
//Load The Drop DownList
function LoadDropDown() {
    $("#cmbMedicalType").kendoComboBox({
        dataValueField: "CdKy",
        dataTextField: "Code",
        dataSource: GetCdMas_LookupWeb('MedicalType'),
        filter: "contains",
        suggest: true,
        placeholder: "Select a Medical Type"
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
function LoadMedicalClaimsGrid() {
    var dataSource = new kendo.data.DataSource({
        batch: true,
        pageSize: 10,
        schema: {
            model: {
                id: "EmpKy",
                fields: //Relavent fields of the grid should be bind with following model items
                {
                    LiNo: { editable: false, nullable: false, type: "number" },
                    FromDate: { editable: true, nullable: false, type: "string" },
                    ToDate: { editable: true, nullable: false, type: "string" },
                    ClaimDate: { editable: true, nullable: false, type: "string" },
                    MedicalType: { editable: true, nullable: false, type: "string" },
                    MedicalTypeKy: { editable: true, nullable: false, type: "number" },
                    AnnualLimit: { editable: true, nullable: false, type: "string" },
                    Amount: { editable: true, nullable: false, type: "string" },
                    Balance: { editable: true, nullable: false, type: "string" }
                }
            }
        },
    });
    $("#MedicalClaimsGrid").kendoGrid({
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
                field: "FromDate",
                title: "From Date",
                width: "70px",
            },
            {
                field: "ToDate",
                title: "To Date",
                width: "70px",
            },
            {
                field: "ClaimDate",
                title: "Claim Date",
                width: "70px",
            },
            {
                field: "MedicalType",
                title: "MedicalType",
                width: "100px",
            },
            {
                field: "MedicalTypeKy",
                title: "MedicalType Ky",
                hidden: true,
            },
            {
                field: "AnnualLimit",
                title: "Annual Limit",
                width: "100px",
            },
            {
                field: "Amount",
                title: "Amount",
                width: "100px",

            },
            {
                field: "Balance",
                title: "Balance",
                width: "100px",
            },
        ]
    });
}
function InsertToGrid() {//alert(0)
    var grid = $("#MedicalClaimsGrid").data("kendoGrid");
    var dataSource1 = grid.dataSource;
    var total = dataSource1.data().length;


    var FromDate = $('#fromDate').val();
    var ToDate = $('#toDate').val();
    var ClaimDate = $('#claimDate').val();
    var MedicalType = $("#cmbMedicalType").data("kendoComboBox").text();
    var MedicalTypeKy = (!$("#cmbMedicalType").data("kendoComboBox").value()) ? 1 : $("#cmbMedicalType").data("kendoComboBox").value();
    var AnnualLimit = $('#annualLimit').val();
    var Amount = $('#amount').val();
    var Balance = $('#balance').val();

    grid.dataSource.insert(
        total,
        {
            LiNo: total + 1,
            FromDate: FromDate,
            ToDate: ToDate,
            ClaimDate: ClaimDate,
            MedicalType: MedicalType,
            MedicalTypeKy: MedicalTypeKy,
            AnnualLimit: AnnualLimit,
            Amount: Amount,
            Balance: Balance
        });
}


function SaveDetails(action) {
    var EmpNo = document.getElementById("EmpNo").value;
    var EmpNm = document.getElementById("EmpNm").value;
    var EmpKy = document.getElementById("EmpKy").value;


    var grid = $("#MedicalClaimsGrid").data("kendoGrid");
    var dataSource = grid.dataSource;

    //records on current view / page   
    var recordsOnCurrentView = dataSource.view().length;
    //total records
    var totalRecords = dataSource.total();

    var grid = $("#MedicalClaimsGrid").data("kendoGrid");
    var currentData = grid.dataSource.data();
    var updatedRecords = [];
    var newRecords = [];

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
        EmpNo: EmpNo
    }

    $.ajax({
        url: urlInsertMedicalClaimDet,
        data: JSON.stringify({
            EmpData: kendo.stringify(newRecords),
            EmpHdr: JSON.stringify(newRecordsHdr)
        }),
        contentType: 'application/json; charset=utf-8',
        dataType: "Json",
        type: "POST",
        success: function (data) {
            ClearGriddetails();
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
    var grid = $("#MedicalClaimsGrid").data("kendoGrid");
    grid.dataSource.data([]);
}

function AfterFindEmp(EmpKy) {
    $.ajax({
        url: urlGetMedicalClaimDet,
        data: {
            EmpKy: EmpKy
        },
        dataType: "Json",
        type: "POST",
        success: function (data) {
            $("#MedicalClaimsGrid").data("kendoGrid").dataSource.data(data);
        },
        error: function (e) {
            return false;
        }
    });
}
