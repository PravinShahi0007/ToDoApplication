
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

    
    //$("#HdrSec1_CmbEmpNo_Cd").data("kendoComboBox").value("");
    //$("#HdrSec1_CmbEmpNm_Cd").data("kendoComboBox").value("");
    //$("#HdrSec1_CmbOTTyp_Cd").data("kendoComboBox").value("");
    ////$("#EntryMonth").data("kendoDatePicker").value("");
    //document.getElementById("HdrSec1_InptOTHrs_Val").value = "";
    //$("#GridOTEntry").data('kendoGrid').dataSource.data([]);
    //$("#OT").closest(".k-widget").hide();
    ////$("#OT").data("kendoComboBox").hi;

    ////$("#EntryMonth").kendoDatePicker({

    ////    format: "dd/MM/yyyy",
    ////    min: new Date(31, 2, 2009)
    ////});

    //clearfunction();
    LoadDatePickers();
    LoadCombo();
    $("#OT").closest(".k-widget").hide();
    LoadOTGrid(1);

    $("#HdrSec1_InptOTHrs_Val").kendoNumericTextBox({
        min: 0,
        maxlength: 5,
        decimals: 2,
        format: "#",
        spinners: false,
    });
    
    $("#HdrSec1_InptOTHrs_Val").attr('maxlength', '5');
    
    setTimeout(function () {
        $('#HdrSec1_InptOTHrs_Val').siblings('input:visible').focus();
    }, 200);
   
    $(document).keydown(function (e) {

        if (e.which === 90 && e.ctrlKey) {
            Add();
        }
    });

}

function setHdrSectionPropFun() {

    // ---------- Set ObjProperties
    setHdrSectionProp('', viewBag.ObjKy, '', 'HdrSec1');

    SetHandlingEnterKeyEvent('', viewBag.ObjKy);
    SetFirstFocusObj();
}


//$(document).ready(function () {
   
//    LoadCombo();
//    //LoadOTGrid();
//    $("#HdrSec1_CmbEmpNo_Cd").data("kendoComboBox").value("");
//    $("#HdrSec1_CmbEmpNm_Cd").data("kendoComboBox").value("");
//    $("#HdrSec1_CmbOTTyp_Cd").data("kendoComboBox").value("");
//    //$("#EntryMonth").data("kendoDatePicker").value("");
//    document.getElementById("HdrSec1_InptOTHrs_Val").value = "";
//    $("#GridOTEntry").data('kendoGrid').dataSource.data([]);
//    $("#OT").closest(".k-widget").hide();
//    //$("#OT").data("kendoComboBox").hi;

//    //$("#EntryMonth").kendoDatePicker({

//    //    format: "dd/MM/yyyy",
//    //    min: new Date(31, 2, 2009)
//    //});

//    LoadDatePickers();

//});


function LoadDatePickers() {
    $("#HdrSec1_DatPicEntMonth_Val")
        .kendoDatePicker({
            format: "dd/MM/yyyy",
            min: new Date(31, 2, 2009)
        });

    var todayDate = new Date();
    $("#HdrSec1_DatPicEntMonth_Val").data("kendoDatePicker").value(todayDate);
}