function SavePrefix() {

    var grid = $("#PrefixGrid").data("kendoGrid");
    var currentData = grid.dataSource.data();
    var newRecords = [];
    var TrnTypKy = (!$("#HdrSec1_CmbTransaction_Nm").data("kendoComboBox").value()) ? 1 : $("#HdrSec1_CmbTransaction_Nm").data("kendoComboBox").value();

    for (var i = 0; i < currentData.length; i++) {
            newRecords.push(currentData[i].toJSON());
    }
    var newRecordsHdr = {
        TrnTypKy: TrnTypKy
    }

    $.ajax({
        url: Url.InsertPrefix,
        data: JSON.stringify({
            GridData: kendo.stringify(newRecords),
            HdrData: JSON.stringify(newRecordsHdr)
        }),
        contentType: 'application/json; charset=utf-8',
        dataType: "Json",
        type: "POST",
        success: function (data) {
            alert('Saved Succesfuly..');
            GetPrefix()
        },
        error: function (e) {
            return false;
        }
    });
}

function DeletePrefix(LstNoPreFixKy) {
    $.ajax({
        url: UrlDelete.DeletePrefix,
        data: {
            LstNoPreFixKy: LstNoPreFixKy
        },
        contentType: 'application/json; charset=utf-8',
        dataType: "Json",
        success: function (data) {
            alert('Deleted Succesfuly..');
            GetPrefix();
        },
        error: function (e) {
            return false;
        }
    });
}

function DeleteFunction() {
    var grid = $("#PrefixGrid").data().kendoGrid;
    var selectedItem = grid.dataItem(grid.select());
    if (selectedItem == null) {
        alert('Please Select Something');
    }
    else {
        var LstNoPreFixKy = selectedItem.LstNoPreFixKy;
        var FamilyFirstName = selectedItem.FamilyFirstName;
        if (confirm("Do you want to Delete " + FamilyFirstName + "?") == true) {
            DeletePrefix(LstNoPreFixKy);
        }
    }
}