function SaveCmpn() {
    var GridDlytodo = $("#PrcsSchDetCmpnGrid").data("kendoGrid");
    var dataSource = GridDlytodo.dataSource;
    //records on current view / page   
    var recordsOnCurrentView = dataSource.view().length;
    //total records
    var totalRecords = dataSource.total();
    var currentData = GridDlytodo.dataSource.data();

    var updatedRecords = [];
    var newRecords = [];

    for (var i = 0; i < currentData.length; i++) {
        if (currentData[i].isNew && !currentData[i].PrcsDetCmpnKy) {
            newRecords.push(currentData[i].toJSON());
        } else if (currentData[i].dirty && currentData[i].PrcsDetCmpnKy > 10) {
            updatedRecords.push(currentData[i].toJSON());
        }
    }

    var tempSAveChech = true;
    if (newRecords.length != 0 || updatedRecords.length != 0) {
        if (tempSAveChech) {

            $.ajax({
                url: urlPrcsDetCmpn_InsertWeb,
                data: JSON.stringify({
                    PrcsDetCmpnDoupdate: kendo.stringify(updatedRecords),
                    PrcsDetCmpn: kendo.stringify(newRecords),
                    ObjKy: FormGlblData.ObjKy,
                    //PrcsDetKy: PrcsDetKy,
                }),
                contentType: 'application/json; charset=utf-8',
                dataType: "Json",
                type: "POST",
                success: function (data) {

                    if (data == true) {
                        alert("Successfully Saved..!");
                        clearLeaveFieldsPrcsDetCmpn();
                        LoadPrcsDetCmpnGrid();
                        
                    } else {
                        alert("Record Not Saved");
                        $('#PrcsSchDetCmpnGrid').kendoGrid('destroy').empty();
                        clearLeaveFieldsPrcsDetCmpn()
                        LoadPrcsDetCmpnGrid();
                    }
                },
                error: function (e) {
                    alert("Record Not Saved");
                    LoadPrcsDetCmpnGrid();
                    return false;
                }
            });
        }
    }
}

function clearLeaveFieldsPrcsDetCmpn() {
   
    $("#HdrSec1_CmbAdr_Cd").data('kendoComboBox').value('');
    $("#HdrSec1_CmbAdr_Nm").data('kendoComboBox').value('');
    $("#HdrSec1_NmricWstQty_Val").val('');
    $('#HdrSec1_NmricQty_Val').val('');
    $('#HdrSec1_NmricConvRate_Val').val('');
    $('#HdrSec1_NmricAnlQty_Val').val('');
    $('#HdrSec1_NmricDes_Val').val('');
    $('#HdrSec1_NmricUsagPer_Val').val('');
    $('#HdrSec1_NmricRate_Val').val('');
    $('#HdrSec1_NmricTrnRate_Val').val('');
    $('#HdrSec1_NmricCompFacPer_Val').val('');
    $('#HdrSec1_CmbItm_Cd').data('kendoComboBox').value('');
    $('#HdrSec1_CmbItm_Nm').data('kendoComboBox').value('');
    $("#HdrSec1_CmbUnit_Cd").data('kendoComboBox').value('');
}