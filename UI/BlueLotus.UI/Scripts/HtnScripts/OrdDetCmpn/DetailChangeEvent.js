
function setItmDetailbyEnterkyFromOrdDet() {

    var valueItmCd = $("#HdrSec1_CmbItm_Cd").data('kendoComboBox').text();

    var OrdDetKy = globalVariable.OrdDetKy;
    var finitmky = globalVariable.FinItmKy;

    var qty = $("#HdrSec1_NmricQty_Val").val();
    var reqqty = $("#HdrSec1_NmricReqQty_Val").val();
    var wstper = $("#HdrSec1_NmricWstPer_Val").val();
    var wstqty = $("#HdrSec1_NmricWstQty_Val").val();
    var usagper = $("#HdrSec1_NmricUsagPer_Val").val();
    var compfacper = $("#HdrSec1_NmricCompFacPer_Val").val();
    var trnqty = $("#HdrSec1_NmricTrnQty_Val").val();

    var anlqty = $("#HdrSec1_NmricAnlQty_Val").val();
    var convrate = $("#HdrSec1_NmricConvRate_Val").val();
    var trnrate = $("#HdrSec1_NmricTrnRate_Val").val();

    var stock = avlStock;
    
    var itmky = $("#HdrSec1_CmbItm_Cd").data('kendoComboBox').value();
    var itmcd = $("#HdrSec1_CmbItm_Cd").data('kendoComboBox').text();
    var trnunitky = $("#HdrSec1_CmbUnit_Cd").data('kendoComboBox').value();
    var unit = $("#HdrSec1_CmbUnit_Cd").data('kendoComboBox').text();
    

    if (valueItmCd != 0 || valueItmCd != null) {
        if (qty == 0 || qty == null || qty == undefined || qty == "") {
            alert("Qty cannot be null !");
            $("#HdrSec1_NmricQty_Val").data("kendoNumericTextBox").focus();
        } else {

            AddPropToChild_FrmOrdDetCmpn(
                                OrdDetKy,
                                finitmky,
                                itmky,
                                itmcd,
                                //itmnm,
                                qty,
                                wstper,
                                wstqty,
                                usagper,
                                compfacper,
                                trnqty,
                                trnunitky,
                                unit,
                                anlqty,
                                convrate,
                                trnrate,
                                stock
                            );
            
            //$.ajax({
            //    url: urlTransactionItemsLookUpByItmCd,
            //    dataType: "json",
            //    type: "POST",
            //    //data: JSON.stringify({
            //    //    ObjKy: 1,
            //    //    ConCd: "TrnTyp", OurCd: viewBag.OurCd, ItmCd: '235',
            //    //    AdrKy: 1,
            //    //    LocKy: 1,
            //    //    PrjKy: 1,
            //    //    Dt: $("#HdrSec1_DatPicDate_Val").val(),
            //    //    ItmKy: 1

            //    data: JSON.stringify({
            //        ObjKy: viewBag.ObjKy,
            //    OrdItemDet: JSON.stringify({
            //            ConCd: "TrnTyp",
            //            OurCd: viewBag.OurCd,
            //            ObjKy: 1,
            //            AdrKy: 1,
            //            LocKy: 1,
            //            PrjKy: 1,
            //            BUKy: 1,
            //            AccKy:1,
            //            ItmKy: ItemKy,
            //            Dt: $("#HdrSec1_DatPicDate_Val").val(),
            //        }),
            //    }),
            //    contentType: 'application/json; charset=utf-8',
            //    success: function (list) {

            //        if (list.length == 0 || list.length == null) {
            //            alert("This Item cannot added !");
            //            $("#HdrSec1_CmbItm_Cd").data("kendoComboBox").input.focus();
            //        } else {

            //            ClearDetailsFunction();

            //            $("#HdrSec1_CmbItm_Cd").data("kendoComboBox").input.focus();

            //            for (i = 0; i < list.length; i++) {
            //                var itmcd = list[0].ItmCd;
            //                var itmky = list[0].ItmKy;
            //                var itmnm = list[0].ItmNm;
            //                var trnunitky = list[0].UnitKy;
            //                var unit = list[0].Unit;

            //                AddPropToChild_FrmOrdDetCmpn(
            //                    OrdDetKy,
            //                    finitmky,
            //                    itmky,
            //                    itmcd,
            //                    itmnm,
            //                    qty,
            //                    wstper,
            //                    wstqty,
            //                    usagper,
            //                    compfacper,
            //                    trnqty,
            //                    trnunitky,
            //                    unit,
            //                    anlqty,
            //                    convrate,
            //                    trnrate,
            //                    stock
            //                );

            //            }
            //        }
            //    },
            //    error: function (e) { }
            //});
        }
    }
}


function AddPropToChild_FrmOrdDetCmpn(
        OrdDetKy,
        finitmky,
        itmky,
        itmcd,
        //itmnm,
        qty,
        wstper,
        wstqty,
        usagper,
        compfacper,
        trnqty,
        trnunitky,
        unit,
        anlqty,
        convrate,
        trnrate,
        stock
    ) {

    var id = ("#PrcsSchDetCmpnGrid");
    var child = $(id).data("kendoGrid");
    var dataSource = child.dataSource;

    var count = $(id).data().kendoGrid.dataSource.total();
    var lineNo = count + 1;

    dataSource.insert(count, {
        OrdDetCmpnKy: 0,
        OrdDetKy: OrdDetKy,
        FinItmKy: finitmky,
        ItmKy: itmky,
        LiNo: lineNo,
        ItmCd: itmcd,
        //ItmNm: itmnm,
        Qty: qty,
        ReqQty: globalVariable.ReqQty,
        WstPer: wstper,
        WstQty: wstqty,
        UsagPer: usagper,
        CompFacPer: compfacper,
        TrnQty: qty,
        TrnUnitKy: trnunitky,
        Unit: unit,
        AnlQty: anlqty,
        ConvRate: convrate,
        TrnRate: trnrate,
        LineTotal: (qty * trnrate),
        Stock:stock
    });

    //CalculateLineSubTotal();
}



//  Update Grid data
function changeItemRalatedTotalFromOrdDet() {

    var qty = $("#HdrSec1_NmricQty_Val").val();
    var reqqty = $("#HdrSec1_NmricReqQty_Val").val();
    var wstper = $("#HdrSec1_NmricWstPer_Val").val();
    var wstqty = $("#HdrSec1_NmricWstQty_Val").val();
    var usagper = $("#HdrSec1_NmricUsagPer_Val").val();
    var compfacper = $("#HdrSec1_NmricCompFacPer_Val").val();
    var trnqty = $("#HdrSec1_NmricTrnQty_Val").val();

    var anlqty = $("#HdrSec1_NmricAnlQty_Val").val();
    var convrate = $("#HdrSec1_NmricConvRate_Val").val();
    var trnrate = $("#HdrSec1_NmricTrnRate_Val").val();

    var id = ("#PrcsSchDetCmpnGrid");

    var count = $(id).data().kendoGrid.dataSource.total();
    var LiNo = $("#HdrSec1_NmricLiNo_Val").val();

    var LiNoForChange = LiNo;

    var firstItemData = $(id).data().kendoGrid.dataSource.data();
    var firstItem = firstItemData[LiNo - 1];
    stock = avlStock;

    firstItem.set("Qty", qty);
    firstItem.set("ReqQty", reqqty);
    firstItem.set("WstPer", wstper);
    firstItem.set("WstQty", wstqty);
    firstItem.set("UsagPer", usagper);
    firstItem.set("CompFacPer", compfacper)
    firstItem.set("TrnQty", qty);//trnqty

    firstItem.set("AnlQty", anlqty);
    firstItem.set("ConvRate", convrate)
    firstItem.set("TrnRate", trnrate);
    firstItem.set("LineTotal", (qty * trnrate));
    firstItem.set("Stock", stock);

    //firstItem.set("TrnUnitKy", trnunitky);
    //firstItem.set("Unit", unit);;

    //CalculateLineSubTotal();
}

//get avalable qty

