
function GetItmCmpnDetails(FinItmKy) {

    $.ajax({
        url: urlCmpnBld.ItmCmpn_SelectWeb,
        data: JSON.stringify({
            ObjKy: viewBag.ObjKy,
            FinItmKy: FinItmKy
        }),
        contentType: 'application/json; charset=utf-8',
        dataType: "Json",
        type: "POST",
        success: function (data) {

            var id = ("#ItmCmpnGrid");
            $(id).data("kendoGrid").dataSource.filter(null);
            var grid = $(id).data("kendoGrid");
            grid.dataSource.data([]);

            for (i = 0; i < data.length; i++) {

                $("#HdrSec1_NmricAnlQty_Val").data("kendoNumericTextBox").value(data[i].AnalQty);
                $('#HdrSec1_NmricAnlQty_Val').siblings('input:visible').focus();

                var id = ("#ItmCmpnGrid");
                $(id).data("kendoGrid").dataSource.add({

                    ItmCmpnKy: data[i].ItmCmpnKy,
                    FinItmKy: data[i].FinItmKy,
                    ItmKy: data[i].ItmKy,
                    LiNo: data[i].LiNo,
                    ItmCd: data[i].ItmCd,
                    ItmNm: data[i].ItmNm,
                    Des: data[i].Des,
                    Unit: data[i].Unit,
                    TrnUnitKy: data[i].TrnUnitKy,
                    ResReqSchTyp: data[i].ResReqSchTyp,
                    ResReqSchTypKy: data[i].ResReqSchTypKy,
                    ItmPrp: data[i].ItmPrp,
                    ItmPrpKy: data[i].ItmPrpKy,
                    Qty: data[i].Qty,
                    ReqQty: data[i].ReqQty,
                    WstPer: data[i].WstPer,
                    WstQty: data[i].WstQty,
                    UsagPer: data[i].UsagPer,
                    TrnQty: data[i].TrnQty,
                    CompFacPer: data[i].CompFacPer,
                    AnalQty: data[i].AnalQty
                });
            }
        },
        error: function (e) {
            $('#HdrSec1_NmricAnlQty_Val').siblings('input:visible').focus();
            return false;
        }

    });
}

function setItmDetailbyEnterky() {

    var valueItmCd = $("#HdrSec1_CmbItm_Cd").data('kendoComboBox').text();

    var prcsschdetky = globalVariable.PrcsSchDetKy;
    var prcsdetky = globalVariable.PrcsDetKy;
    var finitmky = globalVariable.FinItmKy;

    var qty = $("#HdrSec1_NmricQty_Val").val();
    var reqqty = $("#HdrSec1_NmricReqQty_Val").val();
    var wstper = $("#HdrSec1_NmricWstPer_Val").val();
    var wstqty = $("#HdrSec1_NmricWstQty_Val").val();
    var usagper = $("#HdrSec1_NmricUsagPer_Val").val();
    var compfacper = $("#HdrSec1_NmricCompFacPer_Val").val();
    var trnqty = $("#HdrSec1_NmricTrnQty_Val").val();

    var plnqty = $("#HdrSec1_NmricPlnQty_Val").val();
    var anlqty = $("#HdrSec1_NmricAnlQty_Val").val();
    var convrate = $("#HdrSec1_NmricConvRate_Val").val();
    var trnrate = $("#HdrSec1_NmricTrnRate_Val").val();

    if (valueItmCd != 0 || valueItmCd != null) {
        if (qty == 0 || qty == null || qty == undefined || qty == "") {
            alert("Qty cannot be null !");
            $("#HdrSec1_NmricQty_Val").data("kendoNumericTextBox").focus();
        } else {
            $.ajax({
                url: urlTransactionItemsLookUpByItmCd,
                dataType: "json",
                type: "POST",
                data: JSON.stringify({
                    ObjKy: 1,
                    ConCd: "TrnTyp", OurCd: viewBag.OurCd, ItmCd: valueItmCd,
                    AdrKy: 1,
                    LocKy: 1,
                    PrjKy: 1,
                    Dt: globalVariable.TodayDate,
                    ItmKy: 1
                }),
                contentType: 'application/json; charset=utf-8',
                success: function (list) {
                    if (list.length == 0 || list.length == null) {
                        alert("This Item cannot added !");
                        $("#HdrSec1_CmbItm_Cd").data("kendoComboBox").input.focus();
                    } else {   

                        var comboboxText = $("#HdrSec1_CmbUnit_Cd").data("kendoComboBox");
                        var cmbText = comboboxText.text();
                        var comboboxValue = $("#HdrSec1_CmbUnit_Cd").data("kendoComboBox");
                        var cmbValue = comboboxValue.value();

                        ClearDetailsFunction();

                        $("#HdrSec1_CmbItm_Cd").data("kendoComboBox").input.focus();

                        for (i = 0; i < list.length; i++) {
                            var itmcd = list[0].ItmCd;
                            var itmky = list[0].ItmKy;
                            var itmnm = list[0].ItmNm;

                            var trnunitky = list[0].UnitKy;
                            var unit = list[0].Unit;

                            if (parseInt(cmbValue) > 10) {
                                trnunitky = cmbValue;
                                unit = cmbText;
                            }

                            AddPropToChild(
                                prcsschdetky,
                                prcsdetky,
                                finitmky,
                                itmky,
                                itmcd,
                                itmnm,
                                qty,
                                reqqty,
                                wstper,
                                wstqty,
                                usagper,
                                compfacper,
                                trnqty,
                                trnunitky,
                                unit,
                                plnqty,
                                anlqty,
                                convrate,
                                trnrate
                            );

                        }
                    }
                },
                error: function (e) { }
            });
        }
    }
}


function AddPropToChild(
        prcsschdetky,
        prcsdetky,
        finitmky,
        itmky,
        itmcd,
        itmnm,
        qty,
        reqqty,
        wstper,
        wstqty,
        usagper,
        compfacper,
        trnqty,
        trnunitky,
        unit,
        plnqty,
        anlqty,
        convrate,
        trnrate
    ) {

    var id = ("#PrcsSchDetCmpnGrid");
    var child = $(id).data("kendoGrid");
    var dataSource = child.dataSource;

    var count = $(id).data().kendoGrid.dataSource.total();
    var lineNo = count + 1;

    dataSource.insert(count, {
        PrcsSchDetCmpnKy: 0,
        PrcsSchDetKy: prcsschdetky,
        PrcsDetKy: prcsdetky,
        FinItmKy: finitmky,
        ItmKy: itmky,
        LiNo: lineNo,
        ItmCd: itmcd,
        ItmNm: itmnm,
        Qty: qty,
        ReqQty: reqqty,
        WstPer: wstper,
        WstQty: wstqty,
        UsagPer: usagper,
        CompFacPer: compfacper,
        TrnQty: trnqty,
        TrnUnitKy: trnunitky,
        Unit: unit,
        PlnQty: plnqty,
        AnlQty: anlqty,
        ConvRate: convrate,
        TrnRate: trnrate
    });
    //Calculatetotal();
}



//  Update Grid data
function changeItemRalatedTotal() {

    var qty = $("#HdrSec1_NmricQty_Val").val();
    var reqqty = $("#HdrSec1_NmricReqQty_Val").val();
    var wstper = $("#HdrSec1_NmricWstPer_Val").val();
    var wstqty = $("#HdrSec1_NmricWstQty_Val").val();
    var usagper = $("#HdrSec1_NmricUsagPer_Val").val();
    var compfacper = $("#HdrSec1_NmricCompFacPer_Val").val();
    var trnqty = $("#HdrSec1_NmricTrnQty_Val").val();

    var plnqty = $("#HdrSec1_NmricPlnQty_Val").val();
    var anlqty = $("#HdrSec1_NmricAnlQty_Val").val();
    var convrate = $("#HdrSec1_NmricConvRate_Val").val();
    var trnrate = $("#HdrSec1_NmricTrnRate_Val").val();  

    var comboboxText = $("#HdrSec1_CmbUnit_Cd").data("kendoComboBox");
    var cmbText = comboboxText.text();
    var comboboxValue = $("#HdrSec1_CmbUnit_Cd").data("kendoComboBox");
    var cmbValue = comboboxValue.value();

    var id = ("#PrcsSchDetCmpnGrid");

    var count = $(id).data().kendoGrid.dataSource.total();
    var LiNo = $("#HdrSec1_NmricLiNo_Val").val();

    var LiNoForChange = LiNo;

    var firstItemData = $(id).data().kendoGrid.dataSource.data();
    var firstItem = firstItemData[LiNo - 1];


    firstItem.set("Qty", qty);
    firstItem.set("ReqQty", reqqty);
    firstItem.set("WstPer", wstper);
    firstItem.set("WstQty", wstqty);
    firstItem.set("UsagPer", usagper);
    firstItem.set("CompFacPer", compfacper)
    firstItem.set("TrnQty", trnqty);

    firstItem.set("PlnQty", plnqty);
    firstItem.set("AnlQty", anlqty);
    firstItem.set("ConvRate", convrate)
    firstItem.set("TrnRate", trnrate);

    if (parseInt(cmbValue) > 10) {
        firstItem.set("Unit", cmbText);   
        firstItem.set("TrnUnitKy", cmbValue);
    }
}
