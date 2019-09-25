
function GetRate() {

    return;

    var PrjKy = $("#HdrSec2_CmbPrj_Cd").data('kendoComboBox').value();
    if (PrjKy == 0 || PrjKy == null) {
        var PrjKy = 1;
    }

    var LocKy = $("#HdrSec2_CmbLoc_Cd").data('kendoComboBox').value();
    if (LocKy == 0 || LocKy == null) {
        var LocKy = 1;
    }

    var AccKy = $("#HdrSec2_CmbSupAcc_Cd").data('kendoComboBox').value();
    if (AccKy == 0 || AccKy == null) {
        var AccKy = 1;
    }

    //var ContractAccKy = $("#HdrSec2_CmbContractAcc_Cd").data('kendoComboBox').value();
    //if (ContractAccKy == 0 || ContractAccKy == null) {
    //    var ContractAccKy = 1;
    //}

    var AdrKy = $("#HdrSec2_CmbAdr_Cd").data('kendoComboBox').value();
    if (AdrKy == 0 || AdrKy == null) {
        var AdrKy = 1;
    }

    var ItmKy = $("#HdrSec5_CmbItm_Cd").data("kendoComboBox").value();
    if (ItmKy == 0 || ItmKy == null || ItmKy == "?") {
        var ItmKy = 1;
    }

    //if (ItmKy = "?")
    //    ItmKy = 1;


    //  Common/GetItmRateDisTax
    //  GetItmRateDisTax(ObjKy, ItmKy, EftvDt, LocKy, TrnTypKy, BUKy, PrjKy, AdrKy, AccKy)


    $.ajax({
        url: urlCommon.GetItmRateDisTax,
        dataType: "json",
        type: "POST",
        data: JSON.stringify({
            ObjKy: viewBag.ObjKy,
            ItmKy: ItmKy,
            EftvDt: FormGlblData.TodayDate,
            LocKy: LocKy,
            TrnTypKy: FormGlblData.OrdTypKy,
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
                    $("#HdrSec5_NmricRate_Val").data("kendoNumericTextBox").value(TrnRate);
                }
                else {
                    console.log("Item Rate not configured");
                    $("#HdrSec5_NmricRate_Val").data("kendoNumericTextBox").value(0.0);
                }
            } else {
                alert("This Item have more than one rate");
            }
        },
    });
}


function GetItmRelatedDet() {
    var AdrKy = $("#HdrSec2_CmbAdr_Cd").data('kendoComboBox').value();
    if (AdrKy == 0 || AdrKy == null) {
        var AdrKy = 1;
    }
    var FrmLocKy = $("#HdrSec2_CmbLoc_Cd").data('kendoComboBox').value();

    if (FrmLocKy == 0 || FrmLocKy == null) {
        var FrmLocKy = 1;
    }

    var PrjKy = 1;
    var Dt = $("#HdrSec1_DatPicDate_Val").val();

    var valueItmKy = 1;
    var value = $("#HdrSec5_CmbItm_Val").val();
    if (value.length <= 0) {
        if (FormGlblData.itmCdFrm == 'ItmNm') {
            value = 'ItmNm';//$("#HdrSec5_CmbItm_Nm").data('kendoComboBox').text();
            valueItmKy = $("#HdrSec5_CmbItm_Nm").data('kendoComboBox').value();
        } else {
            value = 'ItmCd';//$("#HdrSec5_CmbItm_Cd").data('kendoComboBox').text();
            valueItmKy = $("#HdrSec5_CmbItm_Cd").data('kendoComboBox').value();
        }
    }

    if (value != null && value != "" && value != undefined) {

        $.ajax({
            url: urlTransactionItemsLookUpByItmCd,
            dataType: "json",
            type: "POST",
            data: JSON.stringify({
                ObjKy: viewBag.ObjKy,
                ConCd: "TrnTyp",
                OurCd: viewBag.OurCd,
                ItmCd: value,
                AdrKy: AdrKy,
                LocKy: FrmLocKy,
                PrjKy: PrjKy,
                Dt: Dt,
                ItmKy: valueItmKy
            }),
            contentType: 'application/json; charset=utf-8',
            success: function (list) {

                if (list.length == 0 || list.length == null) {
                    alert("This Item Not Valid !");
                    $("#HdrSec5_CmbItm_Cd").data("kendoComboBox").input.focus();
                } else {
                    for (i = 0; i < list.length; i++) {
                        var itmcd = list[0].ItmCd;
                        var itmky = list[0].ItmKy;
                        var itmnm = list[0].ItmNm;
                        var Rate = list[0].Rate;
                        var UnitKy = list[0].UnitKy;
                        var Unit = list[0].Unit;
                        var DisPer = list[0].Disper;
                        var VAT = list[0].VAT;
                        var NBT = list[0].NBT;
                        var SVAT = list[0].SVAT;
                        var WHT = list[0].WHT;

                        $("#HdrSec5_NmricDisPer_Val").data("kendoNumericTextBox").value(DisPer);
                        $("#HdrSec5_NmricRate_Val").data("kendoNumericTextBox").value(Rate);
                        document.getElementById('HdrSec5_CmbItmLdd_Lbl').innerHTML = itmcd + " : " + itmnm;

                    }
                }
            },
            error: function (e) { }
        });
    }
    else {
        alert("Item Code Not Valid !");
        $("#HdrSec5_CmbItm_Cd").data("kendoComboBox").input.focus();
    }
}