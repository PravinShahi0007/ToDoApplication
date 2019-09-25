
function loadNumericTextBox() {
    $("#HdrSec1_NmricQty_Val").kendoNumericTextBox({
        min: 0,
        spinners: false
    });
    $("#HdrSec1_NmricWstPer_Val").kendoNumericTextBox({
        min: 0,
        spinners: false
    });
    $("#HdrSec1_NmricWstQty_Val").kendoNumericTextBox({
        min: 0,
        spinners : false
    });
    $("#HdrSec1_NmricUsagPer_Val").kendoNumericTextBox({
        min: 0,
        spinners: false
    });
    $("#HdrSec1_NmricTrnQty_Val").kendoNumericTextBox({
        min: 0,
        spinners: false
    });
    $("#HdrSec1_NmricCompFacPer_Val").kendoNumericTextBox({
        min: 0,
        spinners: false
    });
    $("#HdrSec1_NmricLiNo_Val").kendoNumericTextBox({
        min: 0,
        spinners: false
    });

    //HdrSec1_NmricReqQty_Val
    $("#HdrSec1_NmricReqQty_Val").kendoNumericTextBox({
        min: 0,
        spinners: false
    });

    $("#HdrSec1_NmricAnlQty_Val").kendoNumericTextBox({
        min: 1,
        spinners: false
    });
    $("#HdrSec1_NmricConvRate_Val").kendoNumericTextBox({
        min: 0,
        spinners: false
    });
    $("#HdrSec1_NmricTrnRate_Val").kendoNumericTextBox({
        min: 0,
        spinners: false
    });
    $("#HdrSec1_NmricAnlQty_Val").data("kendoNumericTextBox").value(1);
}


function isNumberOnlyTextField(evt) {
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode != 46 && charCode > 31
      && (charCode < 48 || charCode > 57))
        return false;
    return true;
}

