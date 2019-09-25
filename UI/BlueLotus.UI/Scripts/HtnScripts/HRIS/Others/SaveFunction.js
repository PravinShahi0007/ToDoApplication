


function SaveAnnualPerformance() {
    var empNo = $('#HdrSec1_InptEmpNo_Val').val();
    var EmpKy = $('#EmpKy').val();
    var empName = $('#HdrSec1_InptEmpNm_Val').val();
    if (EmpKy == null || EmpKy == "") {
        EmpKy = 1;
    }


    var AnnualPerYear = $('#HdrSec4_InptAnnualPerYear_Val').val();
    var EmpCdDtKy = $('#HdrSec4_InptAnnualPerEmpCdDtKy_Val').val();
    var AnnualPerReviewSent = $('#HdrSec4_InptAnnualPerReviewSent_Val').val();
    var AnnualPerReviewReceived = $('#HdrSec4_InptAnnualPerReviewReceived_Val').val();
    var AnnualPerOverallGrade = $('#HdrSec5_InptAnnualPerOverallGrade_Val').val();
    var AnnualPerReviewPerson = $('#HdrSec5_InptAnnualPerReviewPerson_Val').val();

    var AnnualPerMonth = $("#HdrSec4_CmbAnnualPerMonth_Cd").data("kendoComboBox").text();
    var AnnualPerMonthKy = (!$("#HdrSec4_CmbAnnualPerMonth_Cd").data("kendoComboBox").value()) ? 1 : $("#HdrSec4_CmbAnnualPerMonth_Cd").data("kendoComboBox").value();

    var fileName = $('input[type=file]').val();

    var HdrDataString = {
        EmpNo: empNo,
        EmpKy: EmpKy,
        EmpNm: empName
    };

    var DetDataString = {
        EmpNo: empNo,
        EmpKy: EmpKy,
        EmpNm: empName,
        AnnualPerMonthKy: AnnualPerMonthKy,
        AnnualPerMonth:AnnualPerMonth,
        AnnualPerYear: AnnualPerYear,
        EmpCdDtKy:EmpCdDtKy,
        AnnualPerReviewSent: AnnualPerReviewSent,
        AnnualPerReviewReceived: AnnualPerReviewReceived,
        AnnualPerOverallGrade: AnnualPerOverallGrade,
        AnnualPerReviewPerson: AnnualPerReviewPerson,
        AnnualPerFilePath: fileName

        //LeaveGrid: GridData
    };
    var SaveAnnualPerDet = 'SaveAnnualPerDet';
    SaveFile();
    $.ajax({
        url: UrlInsert.InsertAnnualPerDet,
        data: {
            HdrDataString: JSON.stringify(HdrDataString),
            DetDataString: JSON.stringify(DetDataString),
            Form: SaveAnnualPerDet
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
function OpenFile() {

}
function Refresh() {
    ChangePage('EmployeeOtherIndex', 'HRIS');
}
function SaveFile() {
    InsertImgtoServer();
    //var fileName = $('input[type=file]').val();
    //$.ajax({
    //    url: UrlInsert.InsertAnnualPerDocDet,
    //    dataType: "json",
    //    type: "POST",
    //    data: JSON.stringify({
    //        fileName: fileName
    //    }),

    //    contentType: 'application/json; charset=utf-8',
    //    success: function (data) {

    //    },
    //    error: function (e) {
    //        return false;
    //    }
    //});
}


function InsertImgtoServer() {
    if (typeof FormData == "undefined") {
        var data = [];
        var opmlFile = document.getElementById('files').files[0];
        data.push('opmlFile', document.getElementById('HdrSec5_files').files[0]);
    }
    else {
        var data = new FormData();
        var opmlFile = document.getElementById('HdrSec5_files').files[0];
        data.append("opmlFile", document.getElementById('HdrSec5_files').files[0]);

        $.ajax({
            type: "POST",
            url: urlInsertFileswithpath,
            data: data,
            dataType: "html",
            contentType: false,
            processData: false,
            enctype: "multipart/form-data",
            success: function (result) {
                if (result != "false") {
                }
                else {
                }
            }
        })
    }
}


function SaveTrainingDet() {
    var grid = $("#TrainingDetailsGrid").data("kendoGrid");
    var currentData = grid.dataSource.data();
    var GridData = [];

    for (var i = 0; i < currentData.length; i++) {
        GridData.push(currentData[i].toJSON());
    }
    //for (var i = 0; i < currentData.length; i++) {
    //    GridData.push(currentData[i].toJSON());
    //}
    //var KendoGridData = kendo.stringify(GridData);

    var empNo = $('#HdrSec1_InptEmpNo_Val').val();
    var EmpKy = $('#EmpKy').val();
    var empName = $('#HdrSec1_InptEmpNm_Val').val();
    if (EmpKy == null || EmpKy == "") {
        EmpKy = 1;
    }
    var HdrDataString = {
        EmpNo: empNo,
        EmpKy: EmpKy,
        EmpNm: empName
    };

    var DetDataString = {
        EmpNo: empNo,
        EmpKy: EmpKy,
        EmpNm: empName,

        LeaveGrid: GridData
    };

    //var HdrDataString = JSON.stringify({
    //    EmpNo: empNo,
    //    EmpKy: EmpKy,
    //    EmpNm: empName
    //});

    //var DetDataString = JSON.stringify({
    //    EmpNo: empNo,
    //    EmpKy: EmpKy,
    //    EmpNm: empName,

    //    FuneralGrid: KendoGridData
    //});
    $.ajax({
        url: UrlInsert.InsertTrainingDet,
        data: {
            HdrDataString: JSON.stringify(HdrDataString),
            DetDataString: JSON.stringify(GridData),
            Form: ''
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

    //$.ajax({
    //    url: UrlInsert.InsertTrainingDet,
    //    data: {
    //        HdrDataString: HdrDataString,
    //        DetDataString: DetDataString,
    //        Form: 'SaveTrainingDet'
    //    },
    //    //contentType: 'application/json; charset=utf-8',
    //    dataType: "Json",
    //    success: function (data) {
    //        alert('Saved Succesfuly..');
    //        Refresh();

    //    },
    //    error: function (e) {
    //        return false;
    //    }
    //});
}

function SaveMembershipDet() {
    var grid = $("#MembershipDetailGrid").data("kendoGrid");
    var currentData = grid.dataSource.data();
    var GridData = [];

    for (var i = 0; i < currentData.length; i++) {
        GridData.push(currentData[i].toJSON());
    }

    var empNo = $('#HdrSec1_InptEmpNo_Val').val();
    var EmpKy = $('#EmpKy').val();
    var empName = $('#HdrSec1_InptEmpNm_Val').val();
    if (EmpKy == null || EmpKy == "") {
        EmpKy = 1;
    }
    var HdrDataString = {
        EmpNo: empNo,
        EmpKy: EmpKy,
        EmpNm: empName
    };

    var DetDataString = {
        EmpNo: empNo,
        EmpKy: EmpKy,
        EmpNm: empName,

        LeaveGrid: GridData
    };
    $.ajax({
        url: UrlInsert.InsertMembershipDet,
        data: {
            HdrDataString: JSON.stringify(HdrDataString),
            DetDataString: JSON.stringify(GridData),
            Form: ''
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


function DeleteTrainingDet(EmpCdKy) {
    $.ajax({
        url: UrlDelete.DeleteTrainingDet,
        data: {
            EmpCdKy: EmpCdKy
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