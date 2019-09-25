function Refresh() {
    ChangePage('EmployeeSalaryIndex', 'HRIS');
}

function SaveEarningDet() {
    var grid = $("#SalaryDetailsGrid").data("kendoGrid");
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

    var SalBasicAmount = document.getElementById("basicSalary").value;
    SalBasicAmount = SalBasicAmount.replace(",", "");
    var HiddenBasicAmount = document.getElementById("HiddenBasicSalary").value;
    HiddenBasicAmount = HiddenBasicAmount.replace(",", "");
    var SalBasicfromDate = document.getElementById("BasicfromDate").value;
    var SalReimbursements = document.getElementById("Reimbursements").value;

    var SalBankNameKy = (!$("#cmbBankName").data("kendoComboBox").value()) ? 1 : $("#cmbBankName").data("kendoComboBox").value();
    var SalBrnNameKy = (!$("#cmbBrnName").data("kendoComboBox").value()) ? 1 : $("#cmbBrnName").data("kendoComboBox").value();
    var SalAccountCode = document.getElementById("accountCode").value;

    var SalIsOTBata = 0;
    if ($('#IsOTBata').is(":checked")) {
        SalIsOTBata = 1;
    } else {
        SalIsOTBata = 0;
    }
    var SalIsBonus = 0;
    if ($('#IsBonus').is(":checked")) {
        SalIsBonus = 1;
    } else {
        SalIsBonus = 0;
    }


    //var HdrDataString = JSON.stringify({
    //    EmpNo: empNo,
    //    EmpKy: EmpKy,
    //    EmpNm: empName
    //});

    var HdrDataString = {
        EmpNo: empNo,
        EmpKy: EmpKy,
        EmpNm: empName,

        SalBankName: "",//SalBankName,
        SalBankNameKy: SalBankNameKy,
        SalBrnName: "",//SalBrnName,
        SalBrnNameKy: SalBrnNameKy,
        SalAccountCode: SalAccountCode,
        SalBasicAmount: SalBasicAmount,
        HiddenBasicAmount:HiddenBasicAmount,
        SalReimbursements: SalReimbursements,
        SalIsOTBata: SalIsOTBata,
        SalIsBonus: SalIsBonus,
        SalBasicfromDate: SalBasicfromDate,

        //SalaryGrid: KendoGridData
    };

    $.ajax({
        url: UrlInsert.InsertSalaryDet,
        data: {
            HdrDataString: JSON.stringify(HdrDataString),
            DetDataString: JSON.stringify(GridData),
            //HdrDataString: HdrDataString,
            //DetDataString: DetDataString,
            //Form: 'SaveEarningDet'
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

function SavePhoneInternetDet() {
    var grid = $("#PhoneInternetGrid").data("kendoGrid");
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

    
    var HdrDataString = JSON.stringify({
        EmpNo: empNo,
        EmpKy: EmpKy,
        EmpNm: empName
    });

    var DetDataString = JSON.stringify({
        EmpNo: empNo,
        EmpKy: EmpKy,
        EmpNm: empName,
        
        PhoneGrid: KendoGridData
    });

    $.ajax({
        url: UrlInsert.InsertDet,
        data: {
            HdrDataString: HdrDataString,
            DetDataString: DetDataString,
            Form: 'SavePhoneInternetDet'
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
function SaveAssetDet() {//alert(0)
    var grid = $("#AssetGrid").data("kendoGrid");
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


    var HdrDataString = JSON.stringify({
        EmpNo: empNo,
        EmpKy: EmpKy,
        EmpNm: empName
    });

    var DetDataString = JSON.stringify({
        EmpNo: empNo,
        EmpKy: EmpKy,
        EmpNm: empName,

        AssetGrid: KendoGridData
    });

    $.ajax({
        url: UrlInsert.InsertDet,
        data: {
            HdrDataString: HdrDataString,
            DetDataString: DetDataString,
            Form: 'SaveAssetDet'
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


function DeleteEarningDet(EmpCdDtKy) {
    $.ajax({
        url: UrlDelete.DeleteEarningDet,
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