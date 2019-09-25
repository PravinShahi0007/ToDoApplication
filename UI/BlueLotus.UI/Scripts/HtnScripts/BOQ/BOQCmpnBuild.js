
$(document).ready(function () {
    //$("#HdrSec1_InptSeleItm").hide();
    $("#ButtonSet").hide();
    document.getElementById("divSplitter").style.minHeight = "220px";
    document.getElementById("OrdDetCmpn_HdrSec2_Main").style.minHeight = "220px";

    itmCmpnGridHeight = 220;
    $('#ItmMasCmpnPartial_SS_Div').hide();
});

function LoadIngridents_FromBOQ() {
    //$("#grid").dblclick(function () {
    var grid = $("#grid").data().kendoGrid;
    var selectedItem = grid.dataItem(grid.select());
    var ItmKy = $("#ItmKy").val();
    var ItmNm = $("#HdrSec1_InptItmNm_Val").val();
    if (ItmKy != "" || ItmKy != undefined || ItmKy != null) {
        SetSelectedItemToItemCombo(ItmKy);
    } else {
        alert("Please Select Item");
    }
    // })
}