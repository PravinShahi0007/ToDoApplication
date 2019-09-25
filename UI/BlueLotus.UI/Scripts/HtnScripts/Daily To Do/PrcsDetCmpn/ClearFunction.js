
function ClearFunction_FromOrdDetCmpn() {

    globalVariable.OrdDetKy = 1;
    globalVariable.FinItmKy = 1;
    document.getElementById('HdrSec1_InptSeleItm').innerHTML = "";

    var id = ("#PrcsSchDetCmpnGrid");
    if ($(id).data("kendoGrid") != undefined) {
        $(id).data("kendoGrid").dataSource.filter(null);
        var grid = $(id).data("kendoGrid");
        grid.dataSource.data([]);
    }

    ClearDetailsFunction();
}

function ClearDetailsFunction() {
    try {
        $("#HdrSec1_CmbItm_Cd").data("kendoComboBox").value(null);
        $("#HdrSec1_CmbItm_Nm").data("kendoComboBox").value(null);
        $("#HdrSec1_CmbUnit_Cd").data("kendoComboBox").value(null);
    } catch (e) { }


    DeepClearDetailsFunction();
}

function DeepClearDetailsFunction() {
    try {
        $("#HdrSec1_NmricQty_Val").data("kendoNumericTextBox").value(0);
        $("#HdrSec1_NmricReqQty_Val").data("kendoNumericTextBox").value(0);
        $("#HdrSec1_NmricWstPer_Val").data("kendoNumericTextBox").value(0);
        $("#HdrSec1_NmricWstQty_Val").data("kendoNumericTextBox").value(0);
        $("#HdrSec1_NmricUsagPer_Val").data("kendoNumericTextBox").value(0);
        $("#HdrSec1_NmricTrnQty_Val").data("kendoNumericTextBox").value(0);
        $("#HdrSec1_NmricCompFacPer_Val").data("kendoNumericTextBox").value(0);
        $("#HdrSec1_NmricLiNo_Val").data("kendoNumericTextBox").value(0);

        $("#HdrSec1_NmricAnlQty_Val").data("kendoNumericTextBox").value(1);
        $("#HdrSec1_NmricConvRate_Val").data("kendoNumericTextBox").value(0);
        $("#HdrSec1_NmricTrnRate_Val").data("kendoNumericTextBox").value(0);
    }
    catch (e) { }


}