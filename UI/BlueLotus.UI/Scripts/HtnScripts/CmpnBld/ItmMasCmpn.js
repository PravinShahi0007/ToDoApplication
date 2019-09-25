var itmCmpnGridHeight = 440;

//$(document).ready(function () {     
//});

function ItmCmpnCusReady() {
    loadNumericTextBoxCmpn();    
    LoadUnitCombo(1);
    LoadItmCmpnGrid();
    LoadItemComboCmpn();
    ClearFunction();
    CallAllKeyDownHandlingForNumericBox();


    $("#HdrSec1Loction_Cd").width(100);
    $("#HdrSec1Loction_Nm").width(250);
    //$("#HdrSec1_Rate_Val").width(110).kendoNumericTextBox({ spinners: false, format: '{0:n4}', decimals: 4, round: false, min: 0, });
    //$("#HdrSec1_AnalCost_Val").width(100).kendoNumericTextBox({ spinners: false, format: '{0:n4}', decimals: 4, round: false, min: 0, });
    $("#HdrSec1Date_Val").closest("span.k-datepicker").width(142);
}


//DblClick Event Handling  :Side Item Selection Grid
function SetSelectedItemToItemCombo(ItmKy, ItmNm, Unit, ItmCd) {
    // Clear All WithOut Grid Data
    //ClearOnlyHeaderFieldsWithOutGrid();

    //alert(ItmNm);
    globalVariable.FinItmKy = ItmKy;
    globalVariable.FinItmCode = ItmCd;
    //$("#HdrSec1_InptSeleItm").update(ItmNm);   //.innerHtml(ItmNm);
    //$("#HdrSec1_InptSeleItm").innerHTML = ItmNm;
    if (Unit == null || Unit == "" || Unit == undefined) {
        document.getElementById('HdrSec1_InptSeleItm').innerHTML = ItmNm;
    }
    else {
        document.getElementById('HdrSec1_InptSeleItm').innerHTML = ItmNm + " (" + Unit + ")";
    }

    GetGridDetailFrmItmCmpnDet(ItmKy);
    $("#HdrSec1_NmricQty_Val").data("kendoNumericTextBox").focus();
    $('#HdrSec1_NmricUsagPer_Val').data("kendoNumericTextBox").value(100.00);
}
