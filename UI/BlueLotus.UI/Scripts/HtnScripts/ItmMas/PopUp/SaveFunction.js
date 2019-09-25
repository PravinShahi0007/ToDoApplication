function SaveMultiUnitDet() {
    var grid = $("#MultiUnitGrid").data("kendoGrid");
    var currentData = grid.dataSource.data();
    var GridData = [];

    for (var i = 0; i < currentData.length; i++) {
        GridData.push(currentData[i].toJSON());
    }
    var KendoGridData = kendo.stringify(GridData);

    var ItmKy = $('#HdrSec1_InptItmKy_Val').val();
    if (ItmKy == null || ItmKy == "") {
        ItmKy = '1';
    }


    //var DetDataString = JSON.stringify(KendoGridData);

    $.ajax({
        url: urlMultiUnit.InsertItemUnitMasDet,
        data: JSON.stringify({
            ItmKy: ItmKy,
            DetDataString: KendoGridData
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "Json",
        type:"post",
        success: function (DBData) {
            //alert('Saved Succesfuly..');
            AlertMsg();
            setTimeout(function () {
                $("#AlertBox").removeClass("Alert AlertAnim");
            }, 4000);
            $("#MultiUnitGrid").data("kendoGrid").dataSource.data(DBData);
            

        },
        error: function (e) {
            return false;
        }
    });
}
function Refresh() {
    //ChangePage('EmployeeLeaveIndex', 'HRIS');
}

function AlertMsg() {
    try {
        $("#AlertBox").addClass("Alert AlertAnim");
    }
    catch (e) { }
}