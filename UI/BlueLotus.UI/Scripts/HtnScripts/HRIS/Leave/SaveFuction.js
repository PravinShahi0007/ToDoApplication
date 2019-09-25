function DeleteLeaveDet(LevTrnKy) {
    $.ajax({
        url: UrlDelete.DeleteLeaveDet,
        data: {
            LevTrnKy: LevTrnKy
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
function Refresh() {
    ChangePage('EmployeeLeaveIndex', 'HRIS');
}

function SaveLeaveDet() {
    var grid = $("#LeaveInfoGrid").data("kendoGrid");
    var currentData = grid.dataSource.data();
    var GridData = [];

    for (var i = 0; i < currentData.length; i++) {
        GridData.push(currentData[i].toJSON());
    }
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
    var SaveLeaveDet = 'SaveLeaveDet';
    $.ajax({
        url: UrlInsert.InsertLeaveDet,
        data: {
            HdrDataString: JSON.stringify(HdrDataString),
            DetDataString: JSON.stringify(GridData),
            Form: SaveLeaveDet
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