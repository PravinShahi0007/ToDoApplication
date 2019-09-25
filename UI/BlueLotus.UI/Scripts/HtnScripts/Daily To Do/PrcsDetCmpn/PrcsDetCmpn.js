

//$(document).ready(
function OrdDetCmpnDocLoad() {
    LoadItemCombo();
    LoadPrcsDetCmpnGrid();
    setFocusPrcsDetCmpn();
    //loadNumericTextBox();
    //LoadUnitComboOrdDetCmpn(1);
    
    //ClearFunction_FromOrdDetCmpn();
    //CallAllKeyDownHandlingForNumericBox();

    
}

var isOrdDetCmpnDocLoad_Load = true;

//DblClick Event Handling  :Side Item Selection Grid
function SetSelectedItemToItemComboForPrcsDetCmpn(PrcsDetKy, ItmKy) {

    //alert(ItmNm);

    globalVariable.PrcsDetKy = PrcsDetKy;
    globalVariable.FinItmKy = ItmKy;



    //$("#HdrSec1_InptSeleItm").update(ItmNm);   //.innerHtml(ItmNm);

    //$("#HdrSec1_InptSeleItm").innerHTML = ItmNm;



    //document.getElementById('HdrSec1_InptSeleItm').innerHTML = ItmNm;

    if (isOrdDetCmpnDocLoad_Load) {
        OrdDetCmpnDocLoad();
        isOrdDetCmpnDocLoad_Load = false;
    } else {
        //GetGridDetailFrmItmCmpnDet(OrdDetKy, ItmKy);
        //GetGridDetailFrmItmCmpnDet(OrdDetKy, ItmKy);


        //GetGridDetailFrmItmCmpnDet(PrcsDetKy);
    }

}


