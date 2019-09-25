var FormGlblData = {
    FormObjData: null,
    ItmKy: 1,
    ItmTypKy: 1,
    TrnTypKy: 1,
    AccessLvlKy: 1,
    ConfiLvlKy: 1,
}

$(document).ready(function () {
    //$.ajax({
    //    url: urlCodes.GetCdKyByConCdAndOurCd,
    //    dataType: "json",
    //    type: "POST",
    //    data: JSON.stringify({
    //        ObjKy: viewBag.ObjKy,
    //        ConCd: 'ItmTyp',
    //        OurCd: viewBag.OurCd
    //    }),
    //    contentType: 'application/json; charset=utf-8',
    //    success: function (ItmTypKy) {
    //        FormGlblData.ItmTypKy = ItmTypKy;
            GetFormObjData();
    //    }
    //});
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
            DocReadyCus();
        }
    });
}

function DocReadyCus() {
    setTimeout(setHdrSectionPropFun, 2000);
    var tabstrip = $("#tabstrip").kendoTabStrip().data("kendoTabStrip");
    tabstrip.select(0);




    //GetControlConKy();
    //GetControlCnKy();
    //LoadCombo();
    //GetItmTypKy();
    //var h = $("#option").height();
    //var height = ($(window).height()) - (50 + h);
    //$("#grid").height = "40px";
    //LoadDate();
    //Clear();
    //$("#HdrSec1_InptItmCd_Val").focus();
    //Keydown();
    //Disable();
    //LoadGridView(ItmTypKy);
    //LoadItmSettingsGrid();
    //LoadItmStockGrid();
    //LoadPriceGrid();
    //var someDate = new Date();
    //someDate.setDate(someDate.getDate() + 30); //number  of days to add, e.x. 15 days
    //var dateFormated = someDate.toISOString().substr(0, 10);
    //$('#RevsnDt').data("kendoDatePicker").value(dateFormated);
    //var itemgrid = $("#grid").data("kendoGrid");
    //$("#tabstrip").kendoTabStrip({
    //    itemgrid: focus(),
    // });
}


function setHdrSectionPropFun() {

    // ---------- Set ObjProperties
    setHdrSectionProp('', viewBag.ObjKy, '', 'HdrSec1');
    setHdrSectionProp('', viewBag.ObjKy, '', 'HdrSec2_Tab1');
    setHdrSectionProp('', viewBag.ObjKy, '', 'HdrSec2_Tab2');
    setHdrSectionProp('', viewBag.ObjKy, '', 'HdrSec2_Tab3');
    setHdrSectionProp('', viewBag.ObjKy, '', 'HdrSec2_Tab4');
    setHdrSectionProp('', viewBag.ObjKy, '', 'HdrSec2_Tab5');

    SetHandlingEnterKeyEvent('', viewBag.ObjKy);
    $("#HdrSec1_InptItmCd_Val").focus();
}


$(function () {
    $("#HdrSec1_FileImgLoad_Val").on("change", function () {
        var files = !!this.files ? this.files : [];
        if (!files.length || !window.FileReader) return; // no file selected, or no FileReader support

        if (/^image/.test(files[0].type)) { // only image file
            var reader = new FileReader(); // instance of the FileReader
            reader.readAsDataURL(files[0]); // read the local file

            reader.onloadend = function () { // set image data as background of div
                $("#imagePreview").css("background-image", "url(" + this.result + ")");
            }
        }
    });
});

function Disable() {
    $("#HdrSec1_InptItmNm_Val").prop("disabled", true);
    $("#HdrSec1_InptItmDisplayNm_Val").prop("disabled", true);
    //var ItmTyp = $("#HdrSec1_CmbTyp_Cd").data("kendoComboBox");
    //ItmTyp.enable(false);
    var Cat = $("#HdrSec1_CmbCat_Cd").data("kendoComboBox");
    Cat.enable(false);
    var Brand = $("#HdrSec1_CmbBrand_Cd").data("kendoComboBox");
    Brand.enable(false);
    var Vat = $("#HdrSec1_CmbVat_Cd").data("kendoComboBox");
    Vat.enable(false);
    var GrpInv = $("#HdrSec1_CmbGrpInv_Cd").data("kendoComboBox");

    GrpInv.enable(false);
    $("#HdrSec1_ChkboxAct_Val").prop("disabled", true);
    $("#HdrSec1_ChkboxAlwTrnRateChange_Val").prop("disabled", true);
    $("#HdrSec1_ChkboxAgeVarification_Val").prop("disabled", true);
}

function Edit() {
    $("#HdrSec1_InptItmNm_Val").prop("disabled", false);
    $("#HdrSec1_InptItmDisplayNm_Val").prop("disabled", false);
    //var ItmTyp = $("#HdrSec1_CmbTyp_Cd").data("kendoComboBox");
    //ItmTyp.enable();
    var Cat = $("#HdrSec1_CmbCat_Cd").data("kendoComboBox");
    Cat.enable();
    var Brand = $("#HdrSec1_CmbBrand_Cd").data("kendoComboBox");
    Brand.enable();
    var Vat = $("#HdrSec1_CmbVat_Cd").data("kendoComboBox");
    Vat.enable();
    var GrpInv = $("#HdrSec1_CmbGrpInv_Cd").data("kendoComboBox");
    GrpInv.enable();
    $("#HdrSec1_ChkboxAct_Val").prop("disabled", false);
    $("#HdrSec1_ChkboxAlwTrnRateChange_Val").prop("disabled", false);
    $("#HdrSec1_ChkboxAgeVarification_Val").prop("disabled", false);
}

function Find() {
    $filter = new Array();
    $x = $("#HdrSec1_InptItmCd_Val").val();
    $y = $("#HdrSec1_InptItmEAN_Val").val();
    if ($y != null || $x != null) {
        $filter.push({ field: "EAN", operator: "contains", value: $y });
        $filter.push({ field: "ItmCd", operator: "contains", value: $x });
    }

    $("#grid").data("kendoGrid").dataSource.filter($filter);
}


$(".btn-minimize").click(function () {
    if ($(this).html() == "-") {
        $(this).html("+");
        $("#toggle").show();
    }
    else {
        $(this).html("-");
        $("#toggle").hide();
    }
    $("#HdrPart").slideToggle();
});
