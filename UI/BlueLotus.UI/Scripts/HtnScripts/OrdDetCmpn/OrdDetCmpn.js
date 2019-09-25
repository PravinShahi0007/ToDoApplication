
//$(document).ready(
function OrdDetCmpnDocLoad() {
    LoadItemCombo();//30/7/2018 - narmada
    loadNumericTextBox();
    //LoadUnitComboOrdDetCmpn(1);30/7/2018 - narmada
    LoadPrcsSchDetCmpnGrid();
    //ClearFunction_FromOrdDetCmpn();
    CallAllKeyDownHandlingForNumericBox();
    GetItemQtyComponent();
}

var isOrdDetCmpnDocLoad_Load = true;

//DblClick Event Handling  :Side Item Selection Grid
function SetSelectedItemToItemComboForOrdDetCmpn(OrdDetKy, ItmKy, ItmNm) {
    
    //alert(ItmNm);

    globalVariable.OrdDetKy = OrdDetKy;
    globalVariable.FinItmKy = ItmKy;

    //$("#HdrSec1_InptSeleItm").update(ItmNm);   //.innerHtml(ItmNm);

    //$("#HdrSec1_InptSeleItm").innerHTML = ItmNm;
    document.getElementById('HdrSec1_InptSeleItm').innerHTML = ItmNm;

    if (isOrdDetCmpnDocLoad_Load) {
        OrdDetCmpnDocLoad();
        isOrdDetCmpnDocLoad_Load = false;
    } else {
        GetGridDetailFrmItmCmpnDet(OrdDetKy, ItmKy);
    }

}
