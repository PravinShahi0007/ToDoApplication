
var EmpKy = 1;
var FormGlblData = {
    FormObjData: null,
    AllDefalutValueObj: null,

    AccessLvlKy: 1,
    ConfiLvlKy: 1,
}

$(document).ready(function () {

    GetFormObjData();
});

function GetFormObjData() {

    $.ajax({
        url: urlUsrObjPrp_SelectAllLastChildWeb,
        dataType: "json",
        type: "POST",
        data: JSON.stringify({
            PrntKy: viewBag.ObjKy
        }),
        contentType: 'application/json; charset=utf-8',
        success: function (HdrSectionFromDb) {

            FormGlblData.FormObjData = HdrSectionFromDb;
            FormGlblData.AllDefalutValueObj = Get_AllDefalutValue_Obj();
            DocReadyCus();
        }
    });
}

function DocReadyCus() {

    LoadDatePickers1();

    LoadCombo();
    MonthlyAdditionEntry(1, "");
    MonthlyDeductionEntry(1, "");
    //clearDet();

    $(document).keydown(function (e) {

        if (e.which === 90 && e.ctrlKey) {
            Add();
        }
    });
    
    
    //$("#HdrSec1_InptOTHrs_Val").kendoNumericTextBox({
    //    min: 0,
    //    maxlength: 5,
    //    decimals: 2,
    //    format: "#",
    //    spinners: false,
    //});

    //$("#HdrSec1_InptOTHrs_Val").attr('maxlength', '5');

    //setTimeout(function () {
    //    $('#HdrSec1_InptOTHrs_Val').siblings('input:visible').focus();
    //}, 200);

    

}

function setHdrSectionPropFun() {

    // ---------- Set ObjProperties
    setHdrSectionProp('', viewBag.ObjKy, '', 'HdrSec1');

    SetHandlingEnterKeyEvent('', viewBag.ObjKy);
    SetFirstFocusObj();
}


function LoadDatePickers1() {
    $("#HdrSec2_DatPicDate_Val")
        .kendoDatePicker({
            format: "dd/MM/yyyy",
            min: new Date(31, 2, 2009)
        });

    var todayDate = new Date();
    $("#HdrSec2_DatPicDate_Val").data("kendoDatePicker").value(todayDate);
}

//$(document).ready(function () {

//    LoadCombo();

//    MonthlyAdditionEntry(1, "");
//    MonthlyDeductionEntry(1, "");
//    //clearDet();

//    $(document).keydown(function (e) {

//        if (e.which === 90 && e.ctrlKey) {
//            Add();
//        }
//    });

//    //LoadDatePickers();
//});