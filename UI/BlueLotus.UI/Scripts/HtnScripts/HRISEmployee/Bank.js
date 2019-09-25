$(document).ready(function () {//alert(0);
    var OurCode = "@(ViewBag.ObjCaptn)";
    //Load the tooltip //COmmo srcipt
    Tooltip();
    //Selecting the text//COmmo srcipt
    SelectText();
    LoadBankDetailGrid();

    $(window).keypress(function (event) {
        if (!(event.which == 115 && event.ctrlKey) && !(event.which == 19)) return true;
        InsertToGrid();
        event.preventDefault();
        return false;
    });
});


function LoadBankDetailGrid() {
    var dataSource = new kendo.data.DataSource({
        batch: true,
        pageSize: 10,
        schema: {
            model: {
                id: "EmpKy",
                fields: //Relavent fields of the grid should be bind with following model items
                {
                    LiNo: { editable: false, nullable: false, type: "number" },
                    BankName: { editable: true, nullable: false, type: "string" },
                    HiddenBankName: { editable: true, nullable: false, type: "string" },
                    BankBranchCode: { editable: true, nullable: false, type: "string" },
                    AccountNo: { editable: true, nullable: false, type: "string" }
                }
            }
        },
    });
    $("#BankDetailGrid").kendoGrid({
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
                field: "BankName",
                title: "Bank Name",
                width: "100px",
            },
            {
                field: "HiddenBankName",
                title: "Bank Name",
                //width: "100px",
                hidden: true,
            },
            {
                field: "BankBranchCode",
                title: "Bank Branch Code",
                width: "50px",
            },
            {
                field: "AccountNo",
                title: "Account Code",
                width: "120px",
            },
        ]
    });
}



function InsertToGrid() {
    var grid = $("#BankDetailGrid").data("kendoGrid");
    var dataSource1 = grid.dataSource;
    var total = dataSource1.data().length;
    var bankName = $('#bankName').val();
    var HiddenBankName = $('#HiddenbankName').val();
    var bankBranchCode = $('#bankBranchCode').val();
    var accountCode = $('#accountCode').val();
    grid.dataSource.insert(
        total,
        {
            LiNo: total + 1,
            BankName: bankName,
            HiddenBankName: HiddenBankName,
            BankBranchCode: bankBranchCode,
            AccountNo: accountCode
        });
}

function SaveDetails(action) {
    var EmpNo = document.getElementById("EmpNo").value;
    var EmpNm = document.getElementById("EmpNm").value;
    var EmpKy = document.getElementById("EmpKy").value;


    var grid = $("#BankDetailGrid").data("kendoGrid");
    var dataSource = grid.dataSource;

    //records on current view / page   
    var recordsOnCurrentView = dataSource.view().length;
    //total records
    var totalRecords = dataSource.total();

    var grid = $("#BankDetailGrid").data("kendoGrid");
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
        url: urlInsertBankDet,
        data: JSON.stringify({
            EmpBankData: kendo.stringify(newRecords),
            EmpHdr: JSON.stringify(newRecordsHdr)
        }),
        contentType: 'application/json; charset=utf-8',
        dataType: "Json",
        type: "POST",
        success: function (data) {
            ClearGriddetails();
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
    var grid = $("#BankDetailGrid").data("kendoGrid");
    grid.dataSource.data([]);
}

function AfterFindEmp(EmpKy) {
    $.ajax({
        url: urlGetBankDet,
        data: {
            EmpKy: EmpKy
        },
        dataType: "Json",
        type: "POST",
        success: function (data) {
            $("#BankDetailGrid").data("kendoGrid").dataSource.data(data);
        },
        error: function (e) {
            return false;
        }
    });
}
