
//$("#HdrSec1_NmricQty_Val").keydown(function (event) {
//    var keycode = (event.keyCode ? event.keyCode : event.which);
//    if (keycode == '13') {

//        if (globalVariable.FinItmKy > 1) {
//            $("#HdrSec1_CmbItm_Cd").data("kendoComboBox").input.focus();
//            var LiNo = $("#HdrSec1_NmricLiNo_Val").data("kendoNumericTextBox").value();
//            if (LiNo == 0 || LiNo == null || LiNo == undefined) {
//                setItmDetailbyEnterkyFromOrdDet();
//            } else {
//                var Qty = $("#HdrSec1_NmricQty_Val").data("kendoNumericTextBox").value();
//                changeItemRalatedTotalFromOrdDet();
//            }
//        }
//        else {
//            alert("Select the finish item first.");
//        }
//    }
//});


function CallAllKeyDownHandlingForNumericBox() {

    CmpnBldKeyDownHandlingForNumericBox("HdrSec1_NmricQty_Val");
    CmpnBldKeyDownHandlingForNumericBox("HdrSec1_NmricReqQty_Val");
    CmpnBldKeyDownHandlingForNumericBox("HdrSec1_NmricWstPer_Val");
    CmpnBldKeyDownHandlingForNumericBox("HdrSec1_NmricWstQty_Val");
    CmpnBldKeyDownHandlingForNumericBox("HdrSec1_NmricUsagPer_Val");
    CmpnBldKeyDownHandlingForNumericBox("HdrSec1_NmricTrnQty_Val");
    CmpnBldKeyDownHandlingForNumericBox("HdrSec1_NmricCompFacPer_Val");
}


function CmpnBldKeyDownHandlingForNumericBox(ObjNm) {

    // ObjNm = HdrSec1_NmricQty_Val

    $("#" + ObjNm).keydown(function (event) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {


            var AnlQty = $("#HdrSec1_NmricAnlQty_Val").data("kendoNumericTextBox").value();
            if (Number(AnlQty) < 1) {
                alert("Set AnlQty = 1");
                return;
            }


            if (globalVariable.OrdDetKy > 1) {
                $("#HdrSec1_CmbItm_Cd").data("kendoComboBox").input.focus();
                var LiNo = $("#HdrSec1_NmricLiNo_Val").data("kendoNumericTextBox").value();
                if (LiNo == 0 || LiNo == null || LiNo == undefined) {
                    setItmDetailbyEnterkyFromOrdDet();
                } else {
                    var objVal = $("#" + ObjNm).data("kendoNumericTextBox").value();
                    changeItemRalatedTotalFromOrdDet();
                }

                CalculationEventCmpnBld(ObjNm);
            }
            else {
                alert("Select the BOQDet item first.");
                var BOQ_Main_TabStrip = $("#BOQ_Main_TabStrip").kendoTabStrip().data("kendoTabStrip");
                BOQ_Main_TabStrip.select(0);
            }
        }
    });
}

function CalculationEventCmpnBld(ObjNm) {

    var Qty = $("#HdrSec1_NmricQty_Val").data("kendoNumericTextBox").value();
    var ReqQty = $("#HdrSec1_NmricReqQty_Val").data("kendoNumericTextBox").value();
    var WstPer = $("#HdrSec1_NmricWstPer_Val").data("kendoNumericTextBox").value();
    var WstQty = $("#HdrSec1_NmricWstQty_Val").data("kendoNumericTextBox").value();
    var UsagPer = $("#HdrSec1_NmricUsagPer_Val").data("kendoNumericTextBox").value();
    var TrnQty = $("#HdrSec1_NmricTrnQty_Val").data("kendoNumericTextBox").value();
    var CompFacPer = $("#HdrSec1_NmricCompFacPer_Val").data("kendoNumericTextBox").value();
    var LiNo = $("#HdrSec1_NmricLiNo_Val").data("kendoNumericTextBox").value();
    var AnlQty = $("#HdrSec1_NmricAnlQty_Val").data("kendoNumericTextBox").value();

    if (ObjNm == 'HdrSec1_NmricWstPer_Val') {

        if (Number(WstPer) > 100) {
            alert("WstPer > 100");
            return;
        }

        WstQty = Number(Qty) * (Number(WstPer) / 100);
        $("#HdrSec1_NmricWstQty_Val").data("kendoNumericTextBox").value(WstQty)
    } else if (ObjNm == 'HdrSec1_NmricWstQty_Val') {

        if (Number(WstQty) > Number(Qty)) {
            alert("WstQty > Qty");
            return;
        }

        WstPer = (Number(WstQty) * 100) / Number(Qty);
        $("#HdrSec1_NmricWstPer_Val").data("kendoNumericTextBox").value(WstPer)
    }

}