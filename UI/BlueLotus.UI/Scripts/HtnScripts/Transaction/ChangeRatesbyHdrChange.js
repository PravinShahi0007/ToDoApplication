

function StopLoadingScreen() {

    if (FormGlblData.GridEditableRecordCount <= 0) CLOSELoadingCommon();
}

function CallForRate(GridLine) {
    var id = ("#" + viewBag.OurCd);
    var GridData = $(id).data().kendoGrid.dataSource.data();

    var AdrKy = $("#HdrSec2_CmbAdr_Cd").data('kendoComboBox').value();
    if (AdrKy == null || AdrKy == "" || AdrKy == undefined) AdrKy = 1;
    var FrmLocKy = $("#HdrSec2_CmbLoc_Cd").data('kendoComboBox').value();
    if (FrmLocKy == null || FrmLocKy == "" || FrmLocKy == undefined) FrmLocKy = 1;
    var Date = $("#HdrSec1_DatPicDate_Val").val();
    var PrjKy = 1;


    if (GridData[GridLine].IsAct == 1) {

        var GridItem = GridData[GridLine];
        var ItmCd = GridData[GridLine].ItmCd;
        var ItmKy = GridData[GridLine].ItmKy;
        var qty = GridData[GridLine].TrnQty;
        $.ajax({
            url: urlTransactionItemsLookUpByItmCd,
            dataType: "json",
            type: "POST",
            data: JSON.stringify({
                ObjKy: viewBag.ObjKy,
                ConCd: "TrnTyp",
                OurCd: viewBag.OurCd,
                ItmCd: ItmCd,
                AdrKy: AdrKy,
                LocKy: FrmLocKy,
                PrjKy: PrjKy,
                Dt: Date,
                ItmKy: ItmKy
            }),
            contentType: 'application/json; charset=utf-8',
            success: function (list) {

                for (i = 0; i < list.length; i++) {
                    var itmcd = list[0].ItmCd;
                    var itmky = list[0].ItmKy;
                    var itmnm = list[0].ItmNm;
                    var UnitKy = list[0].UnitKy;
                    var Unit = list[0].Unit;

                    var DisPer = list[0].Disper;
                    var VAT = list[0].VAT;
                    var NBT = list[0].NBT;
                    var SVAT = list[0].SVAT;
                    var WHT = list[0].WHT;
                    var Rate = list[0].Rate;
                    var SubTotal = (qty * Rate);
                    var Disamt = (DisPer / 100) * SubTotal;
                    var NBTamt = (NBT / (100 - NBT)) * (SubTotal - Disamt);
                    var VATamt = (VAT / (100 + VAT)) * (SubTotal - Disamt + NBTamt);
                    var WHTamt = (WHT / 100) * SubTotal;
                    var SVATamt = (SVAT / 100) * SubTotal;


                    GridItem.set("TrnRate", Rate);
                    GridItem.set("DisPer", DisPer);
                    GridItem.set("VAT", VAT);
                    GridItem.set("NBT", NBT);
                    GridItem.set("SVAT", SVAT);
                    GridItem.set("WHT", WHT);
                    GridItem.set("SubTotal", SubTotal);
                    GridItem.set("GrossTotal", (Number(SubTotal) - Number(Disamt)));
                    GridItem.set("NetTotal", (Number(SubTotal) - Number(Disamt) + Number(VATamt) + Number(WHTamt) + Number(NBTamt) + Number(SVATamt)));

                    GridItem.set("DisAmt", Disamt);
                    GridItem.set("VatAmt", VATamt);
                    GridItem.set("WHTAmt", WHTamt);
                    GridItem.set("NBTAmt", NBTamt);
                    GridItem.set("SVatAmt", SVATamt);
                    GridItem.set("Unit", Unit);
                    GridItem.set("UnitKy", UnitKy);
                    GridItem.set("ItmCd", itmcd);
                    GridItem.set("ItmNm", itmnm);
                    GridItem.set("ItmKy", itmky);

                }
                Calculatetotal();
                FormGlblData.GridEditableRecordCount = FormGlblData.GridEditableRecordCount - 1;
                StopLoadingScreen();

            },
            error: function (e) { }
        });
    }
    //if (GridLine == GridData.length-1)
    //{
    //    CLOSELoadingCommon();
    //}
}

function ChangeItmRatesByHeaderChange(Value, Label) {
    var TotalActiveRecord = 0;
    var id = ("#" + viewBag.OurCd);
    var GridData = $(id).data().kendoGrid.dataSource.data();

    for (var i = 0; i < GridData.length; i++) {
        if (GridData[i].IsAct == 1) {
            TotalActiveRecord++;
            FormGlblData.GridEditableRecordCount = FormGlblData.GridEditableRecordCount + 1;
        }
    }

    if (FormGlblData.isFirstTimeComboChange == 0 && TotalActiveRecord != 0) {
        var IsChangeRate = confirm("Do You Want to Change The Rates for \"" + Value + "\" " + Label + " ?");
        if (IsChangeRate) {
            OPENLodingCommon('Updating Values...!');
            var id = ("#" + viewBag.OurCd);
            var GridData = $(id).data().kendoGrid.dataSource.data();
            for (var i = 0; i < GridData.length; i++) {
                CallForRate(i);
            }
            return IsChangeRate;
        }
        else {
            return IsChangeRate;
        }
    }

}