

$("#Dlytodogrid").bind("dblclick", DblClickUpdate);

function DblClickUpdate() {


    var id = ("#Dlytodogrid");
    var gridforUID = $(id).data("kendoGrid");
    currentSelection = gridforUID.select();
    currentSelection.each(function () {
        FormGlblData.DblClickedUID = $(this).closest('tr').data('uid');
    })


    var id = ("#Dlytodogrid");
    var grid = $(id).data().kendoGrid;
    var selectedItem = grid.dataItem(grid.select());
    Editing_LiNo = selectedItem.LiNo;
    var CurAdrKy = selectedItem.CurAdrKy;
    var LeadAdrKy = selectedItem.LeadAdrKy;
    var PrjKy = selectedItem.PrjKy;
    var PrtyKy = selectedItem.PrtyKy;
    var Task = selectedItem.TaskID;
    var Qty = selectedItem.BudjetQty;
    var UnitKy = selectedItem.UnitKy;
    var TaskNm = selectedItem.TaskNm;
    var Des = selectedItem.Des;
    var PrcsSeq = selectedItem.PrcsSeq;
    var isact = selectedItem.isAct;
    var AprStsKy = selectedItem.AprStsKy;
    var ReqDt = selectedItem.ReqDt;
    FormGlblData.PrKy = selectedItem.PrcsDetKy;
    var PrcsDKy = selectedItem.PrcsDetKy;
    var PrcsDetCat1Ky = selectedItem.PrcsDetCat1Ky;
    var PrcsObjKy = selectedItem.PrcsObjKy;

    FormGlblData.PrcsDetKy = selectedItem.PrcsDetKy;

    FormGlblData.isAct = selectedItem.isAct;
    $("#HdrSec1_CmbPrj_Cd").data('kendoComboBox').value(PrjKy);
    $("#HdrSec1_CmbPrj_Nm").data('kendoComboBox').value(PrjKy);
    $("#HdrSec1_CmbLeadAdr_Cd").data('kendoComboBox').value(LeadAdrKy);
    $("#HdrSec1_CmbLeadAdr_Nm").data('kendoComboBox').value(LeadAdrKy);
    $("#HdrSec1_CmbCurActByAdr_Cd").data('kendoComboBox').value(CurAdrKy);
    $("#HdrSec1_CmbCurActByAdr_Nm").data('kendoComboBox').value(CurAdrKy);
    $("#HdrSec2_CmbUnit_Cd").data('kendoComboBox').value(UnitKy);
    $("#HdrSec2_CmbPrty_Cd").data('kendoComboBox').value(PrtyKy);
    $("#HdrSec2_CmbPrty_Nm").data('kendoComboBox').value(PrtyKy);
    $('#ComntPnl').val(Des);
    //$("#HdrSec2_Sequence_Val").data('kendoNumericTextBox').value(PrcsSeq);
    $("#Unit_NmricQty_Val").data('kendoNumericTextBox').value(Qty);
    $("#HdrSec2_NmricTask_Val").val(Task);
    $("#HdrSec2_InptDesc_Val").val(TaskNm);
    $('#HdrSec2_Chkbox_Active_Val').prop('checked', isact);
    $('#HdrSec2_Cmb_AprStates_Val').data('kendoComboBox').value(AprStsKy);
    $('#HdrSec2_InptDueDat').val(ReqDt);
    $('#PrcsDetKy').val(PrcsDKy);
    $('#HdrSec2_CmbPrcsDetCat1_Cd').data('kendoComboBox').value(PrcsDetCat1Ky);
    $('#HdrSec2_AutoCompleteGoToMenu_Val').data('kendoComboBox').value(PrcsObjKy);

}


