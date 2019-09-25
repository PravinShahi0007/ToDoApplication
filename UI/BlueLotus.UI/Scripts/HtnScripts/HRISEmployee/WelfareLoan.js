$(document).ready(function () {//alert(1);
    var OurCode = "@(ViewBag.ObjCaptn)";
    LoadDropDown();
    LoadDatePicker();
    //Load the tooltip //COmmo srcipt
    Tooltip();
    //Selecting the text//COmmo srcipt
    SelectText();
    var todayDate = new Date();
    $("#borrowedDate").data("kendoDatePicker").value(todayDate);
    $("#fromDate").data("kendoDatePicker").value(todayDate);
    $("#toDate").data("kendoDatePicker").value(todayDate);

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

    LoadWelfareDetailGrid();
});

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
    $("#cmbLoanType").kendoComboBox({
        dataValueField: "CdKy",
        dataTextField: "CdNm",
        dataSource: GetCdMas_LookupWeb('LoanTyp'),
        filter: "contains",
        suggest: true,
        placeholder: "Select a Loan Type"
    });
    //$("#cmbBankName").kendoComboBox({
    //    dataValueField: "BnkKy",
    //    dataTextField: "BnkNm",
    //    dataSource: GetBnkMas_LookupWeb(1),
    //    filter: "contains",
    //    change: function () {

    //        var validation = ComboValidations("cmbBankName");

    //        if (validation) {
    //            var BnkKy = $("#cmbBankName").data("kendoComboBox").value();
    //            //  $('#cmbBrnName').removeAttr('disabled');
    //            // $("#cmbBrnName").prop("disabled", false);
    //            BrnSelect(BnkKy);
    //        }
    //    },
    //    suggest: true,
    //    placeholder: "Select a Allowence Type"
    //});
    //$("#cmbBrnName").kendoComboBox({
    //    dataValueField: "BrnKy",
    //    dataTextField: "BrnNm",
    //    dataSource: GetBnkMas_LookupWeb(1),
    //    filter: "contains",
    //    suggest: true,
    //    placeholder: "Select a Allowence Type"
    //});
}

function LoadDatePicker() {

    $("#fromDate").kendoDatePicker({

        format: "dd/MM/yyyy",
        min: new Date(31, 2, 1920)
    });
    $("#toDate").kendoDatePicker({

        format: "dd/MM/yyyy",
        min: new Date(31, 2, 1920)
    });
    $("#borrowedDate").kendoDatePicker({

        format: "dd/MM/yyyy",
        min: new Date(31, 2, 1920)
    });

    $(".k-datepicker, .k-combobox, .k-numerictextbox,.k-input").css('width', "100%");

}


//function GetBnkMas_LookupWeb(brn) {
//    var dataSource = new kendo.data.DataSource(
//      {
//          transport: {
//              read: {
//                  url: urlHRISGetBnkMas_LookupWeb,
//                  data: { BnkKy: brn },
//                  dataType: "json"
//              }
//          }
//      });
//    return dataSource;
//}

function LoadWelfareDetailGrid() {
    // alert(0);
    var dataSource = new kendo.data.DataSource({
        batch: true,
        pageSize: 10,
        schema: {
            model: {
                id: "AccTrnKy",
                fields: //Relavent fields of the grid should be bind with following model items
                {
                    LiNo: { editable: false, nullable: false, type: "number" },
                    FromDate: { editable: true, nullable: false, type: "string" },
                    ToDate: { editable: true, nullable: false, type: "string" },
                    BorrowedDate: { editable: true, nullable: false, type: "string" },
                    LoanTypeKy: { editable: true, nullable: false, type: "number" },
                    LoanType: { editable: true, nullable: false, type: "string" },
                    LoanAmount: { editable: true, nullable: false, type: "string" },
                    InstallAmount: { editable: true, nullable: false, type: "string" },
                    NoOfInstall: { editable: true, nullable: false, type: "string" },
                    InerestRate: { editable: true, nullable: false, type: "string" },
                    InterestAmount: { editable: true, nullable: false, type: "string" },
                    TotalPayable: { editable: true, nullable: false, type: "string" },
                    PayBackPeriod: { editable: true, nullable: false, type: "string" }
                }
            }
        },
    });
    $("#welfareGrid").kendoGrid({
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
                width: "100px",
            },
            {
                field: "ToDate",
                title: "To Date",
                width: "100px",
            },
            {
                field: "BorrowedDate",
                title: "Borrowed Date",
                width: "100px",
            },
            {
                field: "LoanTypeKy",
                title: "Loan Type",
                //width: "120px",
                hidden:true,

            },
            {
                field: "LoanType",
                title: "Loan Type",
                width: "100px",
            },

            {
                field: "LoanAmount",
                title: "Loan Amount",
                width: "100px",
            },
            {
                field: "InstallAmount",
                title: "Install Amount",
                width: "120px",
            },
            {
                field: "NoOfInstall",
                title: "No Of Install",
                width: "100px",

            },
            {
                field: "InerestRate",
                title: "Inerest Rate",
                width: "120px",
            },
            {
                field: "InterestAmount",
                title: "Interest Amount",
                width: "120px",
            },
            {
                field: "TotalPayable",
                title: "Total Payable",
                width: "120px",
            },
            {
                field: "PayBackPeriod",
                title: "Pay Back Period",
                width: "120px",
            },
        ]
    });
}




function InsertToGrid() {
    var grid = $("#welfareGrid").data("kendoGrid");
    var dataSource1 = grid.dataSource;
    var total = dataSource1.data().length;
    var fromDate = $('#fromDate').val();
    var toDate = $('#toDate').val();
    var borrowedDate = $('#borrowedDate').val();
    var cmbLoanType = $("#cmbLoanType").data("kendoComboBox").text();
    var cmbLoanTypeKy = $("#cmbLoanType").data("kendoComboBox").value();
    var loanAmount = $('#loanAmount').val();
    var installAmount = $('#installAmount').val();
    var noofInstall = $('#noofInstall').val();
    var inerestRate = $('#inerestRate').val();
    var interestAmount = $('#interestAmount').val();
    var totalPayable = $('#totalPayable').val();
    var payBackPeriod = $('#payBackPeriod').val();
    grid.dataSource.insert(
        total,
        {
            LiNo: total + 1,
            FromDate: fromDate,
            ToDate: toDate,
            BorrowedDate: borrowedDate,
            LoanType: cmbLoanType,
            LoanTypeKy: cmbLoanTypeKy,
            LoanAmount: loanAmount,
            InstallAmount: installAmount,
            NoOfInstall: noofInstall,
            InerestRate: inerestRate,
            InterestAmount: interestAmount,
            TotalPayable: totalPayable,
            PayBackPeriod: payBackPeriod
        });
}

function SaveDetails(action) {
    var EmpNo = document.getElementById("EmpNo").value;
    var EmpNm = document.getElementById("EmpNm").value;
    var EmpKy = document.getElementById("EmpKy").value;


    var BankNameKy = (!$("#cmbBankName").data("kendoComboBox").value()) ? 1 : $("#cmbBankName").data("kendoComboBox").value();
    var BrnNameKy = (!$("#cmbBrnName").data("kendoComboBox").value()) ? 1 : $("#cmbBrnName").data("kendoComboBox").value();
    var AccountCode = document.getElementById("accountCode").value;


    var grid = $("#welfareGrid").data("kendoGrid");
    var dataSource = grid.dataSource;

    //records on current view / page   
    var recordsOnCurrentView = dataSource.view().length;
    //total records
    var totalRecords = dataSource.total();

    var grid = $("#welfareGrid").data("kendoGrid");
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
        EmpNo: EmpNo,
        BankNameKy: BankNameKy,
        BrnNameKy: BrnNameKy,
        AccountCode: AccountCode
    }

    $.ajax({
        url: urlInsertWelfareLoanDet,
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
    var grid = $("#welfareGrid").data("kendoGrid");
    grid.dataSource.data([]);
}

function AfterFindEmp(EmpKy) {
    $.ajax({
        url: urlGetwelfareLoanDet,
        data: {
            EmpKy: EmpKy
        },
        dataType: "Json",
        type: "POST",
        success: function (data) {
            $("#welfareGrid").data("kendoGrid").dataSource.data(data);
        },
        error: function (e) {
            return false;
        }
    });
}
