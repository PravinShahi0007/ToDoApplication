
function loadNumericTextBoxCmpn() {
    $("#HdrSec1_NmricQty_Val").kendoNumericTextBox({
        decimals: 4,
        min: 0,
        spinners: false,
        change: function (e) {
            ChangeFunc("HdrSec1_NmricQty_Val");
        }
    });

    $("#HdrSec1_Rate_Val").kendoNumericTextBox({
        decimals: 5,
        round: false,
        format: '{0:n5}',
        min: 0,
        spinners: false
    });

    $("#HdrSec1_AnalCost_Val").kendoNumericTextBox({
        decimals: 5,
        round: false,
        format: '{0:n5}',
        min: 0,
        spinners: false
    });

    $("#HdrSec1_NmricAnlQty_Val").kendoNumericTextBox({
        min: 0.001,
        decimals: 5,
        round: false,
        format: '{0:n5}',
        change: ChangeAnalQty,
        spinners: false
    });

    $("#HdrSec1_NmricWstPer_Val").kendoNumericTextBox({
        min: 0,
        spinners: false,
        change: function (e) {
            ChangeFunc("HdrSec1_NmricWstPer_Val");
        }

    });
    $("#HdrSec1_NmricWstQty_Val").kendoNumericTextBox({
        min: 0,
        spinners: false,
        change: function (e) { ChangeFunc("HdrSec1_NmricWstQty_Val"); }
    });
    $("#HdrSec1_NmricUsagPer_Val").kendoNumericTextBox({
        min: 0,
        spinners: false,
        //change: function (e) { ChangeFunc("HdrSec1_NmricUsagPer_Val"); }
    });
    $("#HdrSec1_NmricTrnQty_Val").kendoNumericTextBox({
        min: 0,
        spinners: false,
        change: function (e) { ChangeFunc("HdrSec1_NmricTrnQty_Val"); }
    });
    $("#HdrSec1_NmricCompFacPer_Val").kendoNumericTextBox({
        min: 0,
        spinners: false,
        change: function (e) { ChangeFunc("HdrSec1_NmricCompFacPer_Val"); }
    });
    $("#HdrSec1_NmricLiNo_Val").kendoNumericTextBox({
        min: 0,
        spinners: false,
    });

    //HdrSec1_NmricReqQty_Val
    $("#HdrSec1_NmricReqQty_Val").kendoNumericTextBox({
        min: 0,
        spinners: false,
        change: function (e) { ChangeFunc("HdrSec1_NmricReqQty_Val"); }
    });
    //$("#HdrSec1_Rate_Val").kendoNumericTextBox({ min: 0, spinners: false });
}


function isNumberOnlyTextField(evt) {
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode != 46 && charCode > 31
        && (charCode < 48 || charCode > 57))
        return false;
    return true;
}

function ChangeAnalQty() {
    var value = $("#HdrSec1_NmricAnlQty_Val").data("kendoNumericTextBox").value();
    if (value == null || value == undefined || value == "") {
        value = 1;
        $("#HdrSec1_NmricAnlQty_Val").data("kendoNumericTextBox").value(value);
    }
    var Grid = $("#ItmCmpnGrid").data("kendoGrid").dataSource.data();
    if (Grid.length != 0) {
        for (var item = 0; item < Grid.length; item++) {
            Grid[item].set("AnalQty", value);
        }
    }

}
function ChangeFunc(Id) {
    try {
        var ID = ("#" + Id);
        var Value = $(ID).data("kendoNumericTextBox").value();
        if (Value == null || Value == undefined || Value == "") {
            Value = 0;
            $(ID).data("kendoNumericTextBox").value(Value);
        }
    }
    catch (e) {

    }

}

