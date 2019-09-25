function SaveFuneralDet() {
    var grid = $("#WelfareFuneralGrd").data("kendoGrid");
    var currentData = grid.dataSource.data();
    var GridData = [];

    for (var i = 0; i < currentData.length; i++) {
        GridData.push(currentData[i].toJSON());
    }
    var KendoGridData = kendo.stringify(GridData);

    var empNo = $('#HdrSec1_InptEmpNo_Val').val();
    var EmpKy = $('#EmpKy').val();
    var empName = $('#HdrSec1_InptEmpNm_Val').val();
    if (EmpKy == null || EmpKy == "") {
        EmpKy = 1;
    }

    var HdrDataString = JSON.stringify({
        EmpNo: empNo,
        EmpKy: EmpKy,
        EmpNm: empName
    });

    var DetDataString = JSON.stringify({
        EmpNo: empNo,
        EmpKy: EmpKy,
        EmpNm: empName,

        FuneralGrid: KendoGridData
    });

    $.ajax({
        url: UrlInsert.InsertDet,
        data: {
            HdrDataString: HdrDataString,
            DetDataString: DetDataString,
            Form: 'SaveFuneralDet'
        },
        //contentType: 'application/json; charset=utf-8',
        dataType: "Json",
        success: function (data) {
            CLOSELoadingCommon();
            alert('Saved Succesfuly..');
            Refresh();

        },
        error: function (e) {
            return false;
        }
    });
}

function DeleteFuneralDet(EmpCdDtKy) {
    $.ajax({
        url: UrlDelete.DeleteFuneralDet,
        data: {
            EmpCdDtKy: EmpCdDtKy
        },
        contentType: 'application/json; charset=utf-8',
        dataType: "Json",
        success: function (data) {
            alert('Deleted Succesfuly..');
            Refresh();
        },
        error: function (e) {
            return false;
        }
    });
}

function SaveMedicalDet() {
    var grid = $("#WelfareFuneralGrd").data("kendoGrid");
    var currentData = grid.dataSource.data();
    var GridData = [];

    for (var i = 0; i < currentData.length; i++) {
        GridData.push(currentData[i].toJSON());
    }
    var KendoGridData = kendo.stringify(GridData);

    var empNo = $('#HdrSec1_InptEmpNo_Val').val();
    var EmpKy = $('#EmpKy').val();
    var empName = $('#HdrSec1_InptEmpNm_Val').val();
    if (EmpKy == null || EmpKy == "") {
        EmpKy = 1;
    }

    var HdrDataString = JSON.stringify({
        EmpNo: empNo,
        EmpKy: EmpKy,
        EmpNm: empName
    });

    var DetDataString = JSON.stringify({
        EmpNo: empNo,
        EmpKy: EmpKy,
        EmpNm: empName,

        FuneralGrid: KendoGridData
    });

    $.ajax({
        url: UrlInsert.InsertDet,
        data: {
            HdrDataString: HdrDataString,
            DetDataString: DetDataString,
            Form: 's'
        },
        //contentType: 'application/json; charset=utf-8',
        dataType: "Json",
        success: function (data) {
            CLOSELoadingCommon();
            alert('Saved Succesfuly..');
            Refresh();

        },
        error: function (e) {
            return false;
        }
    });
}

function SaveWelfareLoanDet() {
    var grid = $("#WelfareLoanGrid").data("kendoGrid");
    var currentData = grid.dataSource.data();
    var GridData = [];

    for (var i = 0; i < currentData.length; i++) {
        GridData.push(currentData[i].toJSON());
    }
    if (currentData.length > 0) {
        var KendoGridData = kendo.stringify(GridData);
    }
    else {
        var KendoGridData = null;
    }

    var empNo = $('#HdrSec1_InptEmpNo_Val').val();
    var EmpKy = $('#EmpKy').val();
    var empName = $('#HdrSec1_InptEmpNm_Val').val();
    if (EmpKy == null || EmpKy == "") {
        EmpKy = 1;
    }

    //var SalBankNameKy = (!$("#cmbBankName").data("kendoComboBox").value()) ? 1 : $("#cmbBankName").data("kendoComboBox").value();
    //var SalBrnNameKy = (!$("#cmbBrnName").data("kendoComboBox").value()) ? 1 : $("#cmbBrnName").data("kendoComboBox").value();
    //var SalAccountCode = document.getElementById("accountCode").value;


    var HdrDataString = {
        EmpNo: empNo,
        EmpKy: EmpKy,
        EmpNm: empName,

        //BrnNameKy: SalBrnNameKy,
        //AccountCode: SalAccountCode,
    };

    $.ajax({
        url: UrlInsert.InsertWelfareDet,
        data: {
            HdrDataString: JSON.stringify(HdrDataString),
            DetDataString: JSON.stringify(GridData),
        },
        contentType: 'application/json; charset=utf-8',
        dataType: "Json",
        success: function (data) {
            CLOSELoadingCommon();
            alert('Saved Succesfuly..');
            Refresh();

        },
        error: function (e) {
            return false;
        }
    });
}

function Refresh() {
    ChangePage('EmployeeWelfareIndex', 'HRIS');
}