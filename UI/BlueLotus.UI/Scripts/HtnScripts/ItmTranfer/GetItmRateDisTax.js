
//GetRate
function GetRate() {

    return;

    var PrjKy = $("#HdrSec2_CmbFrmPrj_Cd").data('kendoComboBox').value();
    if (PrjKy == 0 || PrjKy == null) {
        var PrjKy = 1;
    }

    var LocKy = $("#HdrSec2_CmbFrmLoc_Cd").data('kendoComboBox').value();
    if (LocKy == 0 || LocKy == null) {
        var LocKy = 1;
    }

    var AccKy = $("#HdrSec2_CmbAcc_Cd").data('kendoComboBox').value();
    if (AccKy == 0 || AccKy == null) {
        var AccKy = 1;
    }

    var AdrKy = $("#HdrSec2_CmbAdr_Cd").data('kendoComboBox').value();
    if (AdrKy == 0 || AdrKy == null) {
        var AdrKy = 1;
    }

    var ItmKy = $("#HdrSec6_CmbItm_Cd").data("kendoComboBox").value();
    if (ItmKy == 0 || ItmKy == null || ItmKy == "?") {
        var ItmKy = 1;
    }

    $.ajax({
        url: urlCommon.GetItmRateDisTax,
        dataType: "json",
        type: "POST",
        data: JSON.stringify({
            ObjKy: LocKy,
            ItmKy: ItmKy,
            EftvDt: FormGlblData.TodayDate,
            LocKy: LocKy,
            TrnTypKy: FormGlblData.TrnTypKy,
            BUKy: 1,
            PrjKy: PrjKy,
            AdrKy: AdrKy,
            AccKy: AccKy

        }),
        contentType: 'application/json; charset=utf-8',
        success: function (getItmRateDisTaxList) {

            if (getItmRateDisTaxList.length = 1) {

                var TrnRate = getItmRateDisTaxList[0].TrnRate;
                if (TrnRate >= 0) {
                    $("#HdrSec7_InptRate_Val").data("kendoNumericTextBox").value(TrnRate);
                }
                else {
                    console.log("Item Rate not configured");
                    $("#HdrSec7_InptRate_Val").data("kendoNumericTextBox").value(0.0);
                }
            } else {
                alert("This Item have more than one rate");
            }
            //CLOSELoadingCommon();
            $("#HdrSec7_InptQty_Val").data("kendoNumericTextBox").focus();
        },
    });
}
