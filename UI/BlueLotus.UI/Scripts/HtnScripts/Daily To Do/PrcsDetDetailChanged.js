
var Editing_LiNoCmpn = 0;



function SaveUpdatePrcsDetCmpn() {
    var PrcsDetKy = globalVariable.PrcsDetKy;
    var FinItemKy = 1;
    InsertToCmpngrid();
}

function InsertToCmpngrid() {
    var grid = $("#PrcsSchDetCmpnGrid").data("kendoGrid");
    var dataSource1 = grid.dataSource;
    var total = dataSource1.data().length;

    var PrcsDetKy = globalVariable.PrcsDetKy;
    var FinItemKy = 1;
    var LineTotal = 1;
    var ResReqSchTypKy = 1;
    var ItmPrpKy = 1;
    var ItmKy = $('#HdrSec1_CmbItm_Cd').data('kendoComboBox').value();
    var AdrKy = $("#HdrSec1_CmbAdr_Cd").data('kendoComboBox').value();
    if (AdrKy == "" || AdrKy == undefined) { AdrKy = 1; }
    var Des = $("#HdrSec1_NmricDes_Val").val();
    var TrnUnitKy = $("#HdrSec1_CmbUnit_Cd").data('kendoComboBox').value();
    if (TrnUnitKy == "" || TrnUnitKy == undefined) { TrnUnitKy = 1 };

    var UsagPer = $('#HdrSec1_NmricUsagPer_Val').val();
    if (UsagPer == "" || UsagPer == undefined) { UsagPer = 1 };
    var AnlQty = $('#HdrSec1_NmricAnlQty_Val').val();
    if (AnlQty == "" || AnlQty == undefined) { AnlQty = 1; }
    var Rate = $('#HdrSec1_NmricRate_Val').val();
    if (Rate == "" || Rate == undefined) { Rate = 1; }
    var Qty = $('#HdrSec1_NmricQty_Val').val();
    if (Qty == "" || Qty == undefined) { Qty = 1; }
    var TrnQty = $('#HdrSec1_NmricTrnQty_Val').val();
    if (TrnQty == "" || TrnQty == undefined) { TrnQty = 1; }
    var ConvRate = $('#HdrSec1_NmricConvRate_Val').val();
    if (ConvRate == "" || ConvRate == undefined) { ConvRate = 1; }
    var WstPer = $('#HdrSec1_NmricWstPer_Val').val();
    if (WstPer == "" || WstPer == undefined) { WstPer = 1; }
    var CompFacPer = $('#HdrSec1_NmricCompFacPer_Val').val();
    if (CompFacPer == "" || CompFacPer == undefined) {CompFacPer = 1;}
    var TrnRate = $('#HdrSec1_NmricTrnRate_Val').val();
    if (TrnRate == "" || TrnRate == undefined) { TrnRate = 1; }   
    if (Editing_LiNoCmpn > 0) {

        LiNo = Editing_LiNoCmpn;
        var firstItemData = grid.dataSource.data();
        var firstItem = firstItemData[LiNo - 1];//[count - LiNoForChange];

        firstItem.set("PrcsDetKy", PrcsDetKy);
        firstItem.set("FinItemKy", FinItemKy);
        firstItem.set("LineTotal", LineTotal);
        firstItem.set("ResReqSchTypKy", ResReqSchTypKy);
        firstItem.set("ItmPrpKy", ItmPrpKy);
        firstItem.set("ItmKy", ItmKy);
        firstItem.set("AdrKy", AdrKy);
        firstItem.set("Des", Des);
        firstItem.set("TrnUnitKy", TrnUnitKy);
        firstItem.set("UsagPer", UsagPer);
        firstItem.set("AnlQty", AnlQty);
        firstItem.set("Rate", Rate);
        firstItem.set("Qty", Qty);
        firstItem.set("TrnQty", TrnQty);
        firstItem.set("ConvRate", ConvRate);
        firstItem.set("WstPer", WstPer);
        firstItem.set("CompFacPer", CompFacPer);
        firstItem.set("TrnRate", TrnRate);    
        firstItem.Dirty = "Dirty";
        Editing_LiNoCmpn = 0;
    }
    else
        grid.dataSource.insert(
           LiNo = total + 1,
            {                   
                    PrcsDetKy:PrcsDetKy,
                    FinItemKy: FinItemKy,
                    LineTotal: LineTotal,
                    ResReqSchTypKy: ResReqSchTypKy,
                    ItmPrpKy: ItmPrpKy,
                    ItmKy: ItmKy,
                    AdrKy: AdrKy,
                    Des: Des,
                    TrnUnitKy: TrnUnitKy,
                    UsagPer: UsagPer,
                    AnlQty: AnlQty,
                    Rate: Rate,
                    Qty: Qty,
                    TrnQty: TrnQty,
                    ConvRate: ConvRate,
                    WstPer: WstPer,
                    CompFacPer: CompFacPer,
                    TrnRate: TrnRate,
                    LiNo: LiNo,          
            });
    //grid.refresh();
    SaveCmpn();

}