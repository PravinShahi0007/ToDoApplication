
function setItmDetailbyEnterky() {

    var PrjKy = $("#HdrSec1_CmbProject_Cd").data('kendoComboBox').value();
    if (PrjKy == 0 || PrjKy == null) {
        var PrjKy = 1;
    }
    var PrjId = $("#HdrSec1_CmbProject_Cd").data('kendoComboBox').text();
    var TaskKy = $("#HdrSec2_CmbTask_Cd").data('kendoComboBox').value();
    if (TaskKy == 0 || TaskKy == null) {
        var TaskKy = 1;
    }
    var TaskId = $("#HdrSec2_CmbTask_Cd").data('kendoComboBox').text();
    var AdrKy = $("#HdrSec2_CmbResource_Cd").data('kendoComboBox').value();
    if (AdrKy == 0 || AdrKy == null) {
        var AdrKy = 1;
    }
    var AdrId = $("#HdrSec2_CmbResource_Cd").data('kendoComboBox').text();
    var ResourceQty = $("#HdrSec2_NmricQty_Val").val();
    var EftvDate = $("#HdrSec1_DatPicDate_Val").val();
    var unitKy = $("#HdrSec2_CmbUnit_Cd").data('kendoComboBox').value();
    if (unitKy == 0 || unitKy == null || unitKy == undefined ) {
        var unitKy = 1;
    }
    var unit = $("#HdrSec2_CmbUnit_Cd").data('kendoComboBox').text();
    var itmky = FormGlblData.ItmKy;

    var id = ("#" + viewBag.OurCd);
    var child = $(id).data("kendoGrid");
    var dataSource = child.dataSource;
    var count = $(id).data().kendoGrid.dataSource.total();
    var rate = $("#HdrSec2_NmricRate_Val").data('kendoNumericTextBox').value();
    var lineNo = count + 1;

    dataSource.insert(count, {
        ItmTrnKy: 0,
        LiNo: lineNo,
        EftvDt: EftvDate,
        PrjKy: PrjKy,
        PrjId: PrjId,
        PrcsDetKy: TaskKy,
        PrcsID: TaskId,
        AdrKy: AdrKy,
        AdrId: AdrId,
        TrnQty: ResourceQty,
        UnitKy: unitKy,
        Unit: unit,
        ItmKy: itmky,
        isAct: 1,
        trnRate: rate

    });

    ClearAll();
    $("#HdrSec2_CmbTask_Cd").data("kendoComboBox").input.focus();
    //$("#HdrSec5_NmricQty_Val").data("kendoNumericTextBox").focus();
}

$("#" + viewBag.OurCd).bind("dblclick", DblClick);

function DblClick()
{
    var id = ("#" + viewBag.OurCd);
    var grid = $(id).data().kendoGrid;
    var selectedItem = grid.dataItem(grid.select());

        var LiNo = selectedItem.LiNo;
        var EftvDt = selectedItem.EftvDt;
        var ItmKy = selectedItem.ItmKy;
        var PrjKy = selectedItem.PrjKy;
        var TaskKy = selectedItem.PrcsDetKy;
        var AdrKy = selectedItem.AdrKy;
        var Qty = selectedItem.TrnQty;
        var UnitKy = selectedItem.UnitKy;
        var Rate = selectedItem.trnRate;
        TaskComboLoad(PrjKy);
        $("#HdrSec2_CmbTask_Cd").data('kendoComboBox').value(TaskKy);
        $("#HdrSec2_CmbTask_Nm").data('kendoComboBox').value(TaskKy);    
        $("#HdrSec2_CmbResource_Cd").data('kendoComboBox').value(AdrKy);
        $("#HdrSec2_CmbResource_Nm").data('kendoComboBox').value(AdrKy);
        LoadUnitCombo(ItmKy)
        
        $("#HdrSec2_NmricQty_Val").data('kendoNumericTextBox').value(Qty);
        $("#HdrSec2_NmricRate_Val").data('kendoNumericTextBox').value(Rate);
        $("#HdrSec2_NmricLiNo_Val").data('kendoNumericTextBox').value(LiNo);
        $("#HdrSec2_CmbUnit_Cd").data('kendoComboBox').value(UnitKy);

        FormGlblData.Detail_Editing_LiNo = LiNo;

}

function changeDetails() {

    var PrjKy = $("#HdrSec1_CmbProject_Cd").data('kendoComboBox').value();
    if (PrjKy == 0 || PrjKy == null) {
        var PrjKy = 1;
    }
    var PrjId = $("#HdrSec1_CmbProject_Cd").data('kendoComboBox').text();

    var TaskKy = $("#HdrSec2_CmbTask_Cd").data('kendoComboBox').value();
    if (TaskKy == 0 || TaskKy == null) {
        var TaskKy = 1;
    }
    var TaskId = $("#HdrSec2_CmbTask_Cd").data('kendoComboBox').text();

    var AdrKy = $("#HdrSec2_CmbResource_Cd").data('kendoComboBox').value();
    if (AdrKy == 0 || AdrKy == null) {
        var AdrKy = 1;
    }
    var AdrId = $("#HdrSec2_CmbResource_Cd").data('kendoComboBox').text();
    var ResourceQty = $("#HdrSec2_NmricQty_Val").val();
    var EftvDate = $("#HdrSec1_DatPicDate_Val").val();
    var unitKy = $("#HdrSec2_CmbUnit_Cd").data('kendoComboBox').value();
    if (unitKy == 0 || unitKy == null || unitKy == undefined) {
        var unitKy = 1;
    }
    var unit = $("#HdrSec2_CmbUnit_Cd").data('kendoComboBox').text();
    var itmky = FormGlblData.ItmKy;

    var id = ("#" + viewBag.OurCd);
    var LiNo = FormGlblData.Detail_Editing_LiNo;
    var LiNoForChange = LiNo;
    var firstItemData = $(id).data().kendoGrid.dataSource.data();
    var firstItem = firstItemData[LiNo - 1];//[count - LiNoForChange];
    
    firstItem.set("LiNo", LiNo);
    firstItem.set("EftvDt", EftvDate);
    firstItem.set("PrjKy", PrjKy);
    firstItem.set("PrjId", PrjId);
    firstItem.set("PrcsDetKy", TaskKy);
    firstItem.set("PrcsID", TaskId);
    firstItem.set("AdrKy", AdrKy);
    firstItem.set("AdrId", AdrId);
    firstItem.set("TrnQty", ResourceQty);
    firstItem.set("UnitKy", unitKy);
    firstItem.set("Unit", unit);
    firstItem.set("ItmKy", itmky);
    
    ClearAll();
    $("#HdrSec2_CmbTask_Cd").data("kendoComboBox").input.focus();

}
