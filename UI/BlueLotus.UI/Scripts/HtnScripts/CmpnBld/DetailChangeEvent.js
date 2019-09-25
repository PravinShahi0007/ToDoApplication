function setItmDetailbyEnterky() {

    var valueItmCd = $("#HdrSec1_CmbItm_Cd").data('kendoComboBox').text();
    var ItemKy = $("#HdrSec1_CmbItm_Cd").data('kendoComboBox').value();
    var LocKy = $("#HdrSec2_Loction_Cd").data('kendoComboBox').value();
    if (LocKy == null || LocKy == undefined || LocKy == "") {
        LocKy = 1;
    }
    var UnitKyInPut = $("#HdrSec1_CmbUnit_Cd").data('kendoComboBox').value();
    if(UnitKyInPut == "" || UnitKyInPut == null || UnitKyInPut == undefined)
    { 
        UnitKyInPut = 1
    }
    var UnitTextInPut = $("#HdrSec1_CmbUnit_Cd").data('kendoComboBox').text();

    var finitmky = globalVariable.FinItmKy;

    var qty = $("#HdrSec1_NmricQty_Val").val();
    var des = "";
    var reqqty = $("#HdrSec1_NmricReqQty_Val").val();
    var wstper = $("#HdrSec1_NmricWstPer_Val").val();
    var wstqty = $("#HdrSec1_NmricWstQty_Val").val();
    var usagper = $("#HdrSec1_NmricUsagPer_Val").val();
    if (usagper == 0) {
        usagper = 100;
    }
    var compfacper = $("#HdrSec1_NmricCompFacPer_Val").val();
    var trnqty = $("#HdrSec1_NmricTrnQty_Val").val();
    var resreqschtypky = 1; //$("#HdrSec1_NmricQty_Val").val();
    var resreqschtyp = ""; //$("#HdrSec1_NmricQty_Val").val();
    var itmprpky = 1; //$("#HdrSec1_NmricQty_Val").val();
    var itmprp = ""; //$("#HdrSec1_NmricQty_Val").val();
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
                    ObjKy: viewBag.ObjKy,
                    ConCd: "TrnTyp", OurCd: viewBag.OurCd, ItmCd: valueItmCd,
                    AdrKy: 1,
                    LocKy: LocKy,
                    PrjKy: 1,
                    Dt: globalVariable.TodayDate,
                    ItmKy: ItemKy

                }),
                contentType: 'application/json; charset=utf-8',
                success: function (list) {
                    debugger;
                    if (list.length == 0 || list.length == null) {
                        alert("This Item cannot added !");
                        $("#HdrSec1_CmbItm_Cd").data("kendoComboBox").input.focus();
                    } else {
                        $("#HdrSec1_CmbItm_Cd").data('kendoComboBox').value(null);
                        $("#HdrSec1_CmbItm_Nm").data('kendoComboBox').value(null);
                        $("#HdrSec1_NmricQty_Val").data("kendoNumericTextBox").value(null);
                        $("#HdrSec1_CmbItm_Cd").data("kendoComboBox").input.focus();
                        var AnalQty = $("#HdrSec1_NmricAnlQty_Val").data("kendoNumericTextBox").value();

                        for (i = 0; i < list.length; i++) {
                            var itmcd = list[0].ItmCd;
                            var itmky = list[0].ItmKy;
                            var itmnm = list[0].ItmNm;
                            var trnunitky = list[0].UnitKy;
                            var unit = list[0].Unit;
                            var rate = list[0].Rate;

                            if (UnitKyInPut != 1) {trnunitky = UnitKyInPut; unit = UnitTextInPut;}
                            AddPropToChild(
                                finitmky,
                                itmky,
                                itmcd,
                                itmnm,
                                des,
                                rate,
                                qty,
                                wstper,
                                wstqty,
                                usagper,
                                compfacper,
                                trnqty,
                                trnunitky,
                                unit,
                                resreqschtypky,
                                resreqschtyp,
                                itmprpky,
                                itmprp,
                                AnalQty
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
    finitmky,
    itmky,
    itmcd,
    itmnm,
    des,
    rate,
    qty,
    wstper,
    wstqty,
    usagper,
    compfacper,
    trnqty,
    trnunitky,
    unit,
    resreqschtypky,
    resreqschtyp,
    itmprpky,
    itmprp,
    AnalQty
) {

    var id = ("#ItmCmpnGrid");
    var child = $(id).data("kendoGrid");
    var dataSource = child.dataSource;


    var count = $(id).data().kendoGrid.dataSource.total();

    var lineNo = count + 1;

    dataSource.insert(count, {
        ItmCmpnKy: 0,
        FinItmKy: finitmky,
        ItmKy: itmky,
        LiNo: lineNo,
        ItmCd: itmcd,
        ItmNm: itmnm,
        Des: des,
        Qty: 0, //qty,
        ReqQty: qty / AnalQty, //globalVariable.ReqQty, (Accoring to the Sachithar's idea)
        WstPer: wstper,
        WstQty: wstqty,
        UsagPer: usagper,
        CompFacPer: compfacper,
        TrnQty: qty, //trnqty, (accoring to sir's idea User entered qty is TrnQty)
        TrnUnitKy: trnunitky,
        Unit: unit,
        ResReqSchTypKy: resreqschtypky,
        ResReqSchTyp: resreqschtyp,
        ItmPrpKy: itmprpky,
        ItmPrp: itmprp,
        AnalQty: AnalQty,
        //Rate: rate,
        //RateValue: (rate * qty)

    });
    ArrangeLiNo();
    //Calculatetotal();
}



//  Update Grid data
function changeItemRalatedTotal() {
    var LocKy = $("#HdrSec2_Loction_Cd").data('kendoComboBox').value();
    if (LocKy == null || LocKy == undefined || LocKy == "") {
        LocKy = 1;
    }
    var valueItmCd = $("#HdrSec1_CmbItm_Cd").data('kendoComboBox').text();
    var ItemKy = $("#HdrSec1_CmbItm_Cd").data('kendoComboBox').value();

    var qty = $("#HdrSec1_NmricQty_Val").val();
    var analQty = $("#HdrSec1_NmricAnlQty_Val").val();
    var des = "";
    var reqqty = $("#HdrSec1_NmricReqQty_Val").val();
    var wstper = $("#HdrSec1_NmricWstPer_Val").val();
    var wstqty = $("#HdrSec1_NmricWstQty_Val").val();
    var usagper = $("#HdrSec1_NmricUsagPer_Val").val();
    var compfacper = $("#HdrSec1_NmricCompFacPer_Val").val();
    var trnqty = $("#HdrSec1_NmricTrnQty_Val").val();
    var resreqschtypky = 1; //$("#HdrSec1_NmricQty_Val").val();
    var resreqschtyp = ""; //$("#HdrSec1_NmricQty_Val").val();
    var itmprpky = 1; //$("#HdrSec1_NmricQty_Val").val();
    var itmprp = ""; //$("#HdrSec1_NmricQty_Val").val();

    var id = ("#ItmCmpnGrid");

    var count = $(id).data().kendoGrid.dataSource.total();
    var LiNo = $("#HdrSec1_NmricLiNo_Val").val();

    var LiNoForChange = LiNo;

    //$.ajax({
    //    url: urlTransactionItemsLookUpByItmCd,
    //    dataType: "json",
    //    type: "POST",
    //    data: JSON.stringify({
    //        ObjKy: viewBag.ObjKy,
    //        ConCd: "TrnTyp", OurCd: viewBag.OurCd, ItmCd: valueItmCd,
    //        AdrKy: 1,
    //        LocKy: LocKy,
    //        PrjKy: 1,
    //        Dt: globalVariable.TodayDate,
    //        ItmKy: ItemKy

    //    }),
    //    contentType: 'application/json; charset=utf-8',
    //    success: function (list) {
    //        debugger;
    //        if (list.length == 0 || list.length == null) {
    //            alert("This Item cannot added !");
    //            $("#HdrSec1_CmbItm_Cd").data("kendoComboBox").input.focus();
    //        } else {
    //            $("#HdrSec1_CmbItm_Cd").data('kendoComboBox').value(null);
    //            $("#HdrSec1_CmbItm_Nm").data('kendoComboBox').value(null);
    //            $("#HdrSec1_NmricQty_Val").data("kendoNumericTextBox").value(null);
    //            $("#HdrSec1_CmbItm_Cd").data("kendoComboBox").input.focus();
    //            var AnalQty = $("#HdrSec1_NmricAnlQty_Val").data("kendoNumericTextBox").value();

    //            for (i = 0; i < list.length; i++) {
    //                var itmcd = list[0].ItmCd;
    //                var itmky = list[0].ItmKy;
    //                var itmnm = list[0].ItmNm;
    //                var trnunitky = list[0].UnitKy;
    //                var unit = list[0].Unit;
    //                var rate = list[0].Rate;

    var firstItemData = $(id).data().kendoGrid.dataSource.data();
    var firstItem = firstItemData[LiNo - 1];


    firstItem.set("Qty", qty);
    firstItem.set("AnalQty", analQty);
    firstItem.set("Des", des);
    firstItem.set("ReqQty", reqqty);
    firstItem.set("WstPer", wstper);
    firstItem.set("WstQty", wstqty);
    firstItem.set("UsagPer", usagper);
    firstItem.set("CompFacPer", compfacper)
    firstItem.set("TrnQty", trnqty);
    //firstItem.set("Rate", rate);
    //firstItem.set("RateValue", (rate * qty));

    //firstItem.set("TrnUnitKy", trnunitky);
    //firstItem.set("Unit", unit);
    //firstItem.set("ResReqSchTypKy", resreqschtypky);
    //firstItem.set("ResReqSchTyp", resreqschtyp);
    //firstItem.set("ItmPrpKy", itmprpky);
    //firstItem.set("ItmPrp", itmprp);


    //            }
    //        }
    //    },
    //    error: function (e) {
    //        alert("Oops! Can Not Get The Rate");
    //    }
    //});
}

function ShowRate() {
    var date = $("#HdrSec1Date_Val").val();
    var Loc = $("#HdrSec2_Loction_Cd").val();
    if (Loc == 0 || Loc == null || Loc == undefined) {
        Loc = 1;
    }

    $.ajax({
        url: urlRecepieGetRate,
        dataType: "json",
        type: "POST",
        data: JSON.stringify({
            ObjKy: viewBag.ObjKy,
            ConCd: "TrnTyp", OurCd: viewBag.OurCd, ItmCd: globalVariable.FinItmCode,
            AdrKy: 1,
            LocKy: Loc,
            PrjKy: 1,
            Dt: date,
            ItmKy: globalVariable.FinItmKy

        }),
        contentType: 'application/json; charset=utf-8',
        success: function (list) {
            for (var i = 0; i < list.length; i++) {
                var TtlCost = list[0].TtlCost;
                $("#HdrSec1_Rate_Val").data("kendoNumericTextBox").value(TtlCost);
                $("#HdrSec1_AnalCost_Val").data("kendoNumericTextBox").value(list[0].AnlCost);
                GetGridLevelRate(list);
            }
        },
        error: function (e) { }
    });
    //----------------------------------------------------------------------


}

function GetGridLevelRate(list) {
    var date = $("#HdrSec1Date_Val").val();
    var Loc = $("#HdrSec2_Loction_Cd").val();
    if (Loc == 0 || Loc == null || Loc == undefined) {
        Loc = 1;
    }
    var id = ("#ItmCmpnGrid");

    var dataSource = $(id).data("kendoGrid").dataSource.data();
    for (var i = 0; i < list.length; i++) {
        var listItmKy = list[i].ItmKy;
        for (var k = 0; k < dataSource.length; k++) {
            var datasrcItmKy = dataSource[k].ItmKy;
            if (listItmKy == datasrcItmKy) {
                var firstItem = dataSource[k];
                firstItem.set("Rate", list[k].CostPri);
                firstItem.set("RateValue", list[k].ReqRate);
            }
        }


    }

    //for (var k = 0; k < dataSource.length; k++) {
    //    var datasrcItmKy = dataSource[k].ItmKy;


    //    //var firstItem = dataSource[k];

    //    //firstItem.set("Rate", list[k].CostPri);
    //    //firstItem.set("RateValue", list[k].ReqRate);
    //    ////var ItmCdForRate = dataSource[k].ItmCd;
    //    ////var ItmKyForRate = dataSource[k].ItmKy;
    //    ////var QtyForRate = dataSource[k].Qty;
    //    ////GetRateFromLoop(id, k, Loc, date, ItmCdForRate, ItmKyForRate, QtyForRate);
    //}


}

function GetRateFromLoop(id, k, Loc, date, ItmCdForRate, ItmKyForRate, QtyForRate) {
    $.ajax({
        url: urlTransactionItemsLookUpByItmCd,
        dataType: "json",
        type: "POST",
        data: JSON.stringify({
            ObjKy: viewBag.ObjKy,
            ConCd: "TrnTyp", OurCd: viewBag.OurCd, ItmCd: ItmCdForRate,
            AdrKy: 1,
            LocKy: Loc,
            PrjKy: 1,
            Dt: date,
            ItmKy: ItmKyForRate

        }),
        contentType: 'application/json; charset=utf-8',
        success: function (list) {

            //for (j = 0; j < list.length; j++) {

            var itmcd = list[0].ItmCd;
            var itmky = list[0].ItmKy;
            var itmnm = list[0].ItmNm;
            var trnunitky = list[0].UnitKy;
            var unit = list[0].Unit;
            var rate = list[0].Rate;

            var firstItem = $(id).data().kendoGrid.dataSource.data()[k];

            firstItem.set("Rate", rate);
            firstItem.set("RateValue", (rate * QtyForRate));

            //}

        },
        error: function (e) {

        }
    });
    return;
}