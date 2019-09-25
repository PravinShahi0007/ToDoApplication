function ClearFunction() {

    globalVariable.FinItmKy = 1;
    document.getElementById('HdrSec1_InptSeleItm').innerHTML = "";

    $("#HdrSec1_NmricQty_Val").data("kendoNumericTextBox").value(0);
    $("#HdrSec1_NmricAnlQty_Val").data("kendoNumericTextBox").value(0);
    $("#HdrSec1_NmricReqQty_Val").data("kendoNumericTextBox").value(0);
    $("#HdrSec1_NmricWstPer_Val").data("kendoNumericTextBox").value(0);
    $("#HdrSec1_NmricWstQty_Val").data("kendoNumericTextBox").value(0);
    $("#HdrSec1_NmricUsagPer_Val").data("kendoNumericTextBox").value(100);
    $("#HdrSec1_NmricTrnQty_Val").data("kendoNumericTextBox").value(0);
    $("#HdrSec1_NmricCompFacPer_Val").data("kendoNumericTextBox").value(0);
    $("#HdrSec1_NmricLiNo_Val").data("kendoNumericTextBox").value(0);

    $("#HdrSec1_CmbItm_Cd").data("kendoComboBox").value(null);
    $("#HdrSec1_CmbItm_Nm").data("kendoComboBox").value(null);
    $("#HdrSec1_CmbUnit_Cd").data("kendoComboBox").value(null);

    var id = ("#ItmCmpnGrid");
    if ($(id).data("kendoGrid") != undefined) {
        $(id).data("kendoGrid").dataSource.filter(null);
        var grid = $(id).data("kendoGrid");
        grid.dataSource.data([]);
    }
}

function ClearOnlyHeaderFieldsWithOutGrid() {
    globalVariable.FinItmKy = 1;
    document.getElementById('HdrSec1_InptSeleItm').innerHTML = "";

    $("#HdrSec1_NmricQty_Val").data("kendoNumericTextBox").value(0);
    $("#HdrSec1_NmricAnlQty_Val").data("kendoNumericTextBox").value(0);
    $("#HdrSec1_NmricReqQty_Val").data("kendoNumericTextBox").value(0);
    $("#HdrSec1_NmricWstPer_Val").data("kendoNumericTextBox").value(0);
    $("#HdrSec1_NmricWstQty_Val").data("kendoNumericTextBox").value(0);
    $("#HdrSec1_NmricUsagPer_Val").data("kendoNumericTextBox").value(100);
    $("#HdrSec1_NmricTrnQty_Val").data("kendoNumericTextBox").value(0);
    $("#HdrSec1_NmricCompFacPer_Val").data("kendoNumericTextBox").value(0);
    $("#HdrSec1_NmricLiNo_Val").data("kendoNumericTextBox").value(0);
    $("#HdrSec1_Rate_Val").data("kendoNumericTextBox").value(0);
    $("#HdrSec1_AnalCost_Val").data("kendoNumericTextBox").value(0);


    $("#HdrSec1_CmbItm_Cd").data("kendoComboBox").value(null);
    $("#HdrSec1_CmbItm_Nm").data("kendoComboBox").value(null);
    $("#HdrSec1_CmbUnit_Cd").data("kendoComboBox").value(null);
    $("#HdrSec2_Loction_Cd").data("kendoComboBox").value(null);
    $("#HdrSec2_Loction_Nm").data("kendoComboBox").value(null);


}