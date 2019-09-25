
$(document).ready(function () {
    LoadItemCombo();
    loadNumericTextBox();
    LoadUnitCombo(1);
    LoadPrcsSchDetCmpnGrid();
    ClearDetailsFunction();
    CallAllKeyDownHandlingForNumericBox();
});


//DblClick Event Handling  :Side Item Selection Grid
function SetSelectedItemToItemCombo(PrcsSchDetKy, PrcsDetKy, ItmKy, ItmNm) {

    //alert(ItmNm);

    globalVariable.PrcsSchDetKy = PrcsSchDetKy;
    globalVariable.PrcsDetKy = PrcsDetKy;
    globalVariable.FinItmKy = ItmKy;

    //$("#HdrSec1_InptSeleItm").update(ItmNm);   //.innerHtml(ItmNm);

    //$("#HdrSec1_InptSeleItm").innerHTML = ItmNm;
    document.getElementById('HdrSec1_InptSeleItm').innerHTML = ItmNm;

    GetGridDetailFrmItmCmpnDet(PrcsSchDetKy, PrcsDetKy, ItmKy);

}
