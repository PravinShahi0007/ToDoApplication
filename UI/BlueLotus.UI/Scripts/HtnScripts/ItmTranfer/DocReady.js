var todayDate = new Date();
var dd = todayDate.getDate();
var mm = todayDate.getMonth() + 1; //January is 0!

var yyyy = todayDate.getFullYear();
if (dd < 10) {
    dd = '0' + dd
}
if (mm < 10) {
    mm = '0' + mm
}
var todayDate = dd + '/' + mm + '/' + yyyy;


var FormGlblData = {
    FormObjData: null,
    TrnTypKy: 1,
    AccessLvlKy: 1,
    ConfiLvlKy: 1,
    TrnKy: 1,
    FrmTrnKy: 1,
    ToTrnKy: 1,
    TmStamp: 1,
    FrmTmStamp: 1,
    ToTmStamp: 1,
    AllDefalutValueObj: null,
    IsDetailRelatedHdrSectionChanged: false,
    TodayDate: todayDate,
    ISNeworUpdateTranction: 1,
    IsApr: 1,
    IsRecurrenceFromFind: 0,
    IsRecurrenceGetfromFind: 0,
    isSaveButtonClicked: 0,
    isAllowSaveByBackDate: 1,
    FromFindDate: todayDate,
    SerialNumber_Array: [],
    isAlwAcs: null,
    isAlwAdd: null,
    isAlwUpdate: null,
    isAlwDel: null,
    isAlwApr: null,
    selectedIndex: 0,
    FormTyp: "ItemTransfer",
    FrmLocKy:1
}

var CdMasModel = {
    IsTrnRateInclusiveTaxTyp1_VAT: 0,    // IsTrnRateInclusiveTaxTyp1_VAT : isCd27
    //IsAlwBackDatedTrn_Val: 0,                // IsAlwBackDatedTrn : iscd23
    //IsAlwFutureDatedTrn_Val: 0,               // IsAlwFutureDatedTrn : iscd24
    TrnMinDate: "", // Back date Transaction Purpose
    TrnMaxDate: ""  // Future Date Transaction Purpose


}

$(document).ready(function () {

    OPENLodingForm();
    GetUserPermission(); // Get UserPermission Properties from DB.
    var PrjKy = 1
    var ObjKy = (viewBag.ObjKy);

    $.ajax({
        url: GetCdKyByConCdAndOurCd,
        dataType: "json",
        type: "POST",
        data: JSON.stringify({
            ObjKy: viewBag.ObjKy,
            ConCd: 'TrnTyp',
            OurCd: viewBag.OurCd
        }),
        contentType: 'application/json; charset=utf-8',
        success: function (TrnTypKy) {
            FormGlblData.TrnTypKy = TrnTypKy;
            GetCdMasBy_CdKy(TrnTypKy);
        }
    });

});

function GetCdMasBy_CdKy(CdKy) {
    $.ajax({
        url: urlCodes.GetCdMasBy_CdKy,
        dataType: "json",
        type: "POST",
        data: JSON.stringify({
            ObjKy: viewBag.ObjKy,
            CdKy: CdKy
        }),
        contentType: 'application/json; charset=utf-8',
        success: function (CdMasModelReturn) {

            CdMasModel.IsTrnRateInclusiveTaxTyp1_VAT = CdMasModelReturn.isCd27;
            CdMasModel.IsAlwBackDatedTrn_Val = CdMasModelReturn.isCd23;
            CdMasModel.IsAlwFutureDatedTrn_Val = CdMasModelReturn.isCd24;

            CdMasModel.TrnMinDate = CdMasModelReturn.TrnMinDate;
            CdMasModel.TrnMaxDate = CdMasModelReturn.TrnMaxDate;

            GetFormObjData();
            Button_From_Dynamic('ButtonSec1');
            Button_From_Dynamic('ButtonSec2');
            Button_From_Dynamic('ButtonSec3');

        }
    });
}

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
            FormGlblData.AllValidationObj = Get_All_Validation_Obj();
            Define_And_Load_ObjMas_Form_Prop_Setting_Grid(HdrSectionFromDb);
            DocReadyCus();
        }
    });
}

function DocReadyCus() {
    if (FormGlblData.isAlwAcs == 0) {
        alert("You Don't Have Access Permission. We Are Redirecting To Home...");
        var url = "http://" + document.location.host + "/BL10-PNS/" + "Home" + "/" + "Home";
        window.location.href = url;
        return;
    }
    setFocus();
    //setHdrSectionPropFun();

    LoadCombo();
    //LoadGridView1(PrjKy);
    Load_ItmTransferGrid();
    var todayDate = new Date();
    $('#HdrSec1_DatPicDate_Val').data("kendoDatePicker").value(todayDate);
    SetTrnDate();    

    $("#HdrSec1_InptTrnNo_FrmTrnKy_Val").hide();
    $("#HdrSec1_InptTrnNo_ToTrnKy_Val").hide();
    $("#HdrSec1_InptTrnNo_FrmTrnNo_Val").hide();
    $("#HdrSec1_InptTrnNo_ToTrnNo_Val").hide();
    $("#HdrSec1_InptTrnNo_FrmTrnPrefixKy_Val").hide();
    $("#HdrSec1_InptTrnNo_ToTrnPrefixKy_Val").hide();
    $("#HdrSec1_InptTrnNo_FrmTrnTypKy_Val").hide();
    $("#HdrSec1_InptTrnNo_ToTrnTypKy_Val").hide();
    $("#HdrSec1_InptTrnNo_FrmTmStmp_Val").hide();
    $("#HdrSec1_InptTrnNo_ToTmStmp_Val").hide();
    LoadAdrComboByAcc(1)
    CreateNewGridRow();
    setHeight();
    $("#HdrSec3_InptExRate_Val").data('kendoNumericTextBox').value(1);

    LoadNumericBox();
    LoadUnitCombo(1)
    LoadTaskCombo(1);
    setDefault();
    DisableFeature();
    FindGridDefaultColumns();//FindForm FindGRN
    Initialize_Pager("TrnKy");
    setTimeout(setHdrSectionPropFun, 2000);
    setTimeout(function () {
        CLOSELoadingForm();

        //$("#HdrSec1_InptDocNo_Val").focus();
        //-- Set Foucs event based on ObjMas and UsrObj
        SetFirstFocusObj();
        CheckUserPermission();
        setTimeout(moreOptionControll, 15000);
    }, 3000);
}

function moreOptionControll() { //hide more option button when there's no options
    if (!$('#ButtonSec3').children().length > 0) {
        $('#ButtonSec1_More').hide();
    }
}

function SetTrnDate() {
    if (FormGlblData.ISNeworUpdateTranction == 1) {

        $('#HdrSec1_DatPicDate_Val').kendoDatePicker({
            format: "dd/MM/yyyy",
            parseFormats: ["dd/MM/yyyy"],
            min: new Date(CdMasModel.TrnMinDate),
            max: new Date(CdMasModel.TrnMaxDate),
            change: onDateChange
        });

    }
    else {
        $('#HdrSec1_DatPicDate_Val').kendoDatePicker({
            format: "dd/MM/yyyy",
            
        });

    }

}

function setHdrSectionPropFun() {

    // ---------- Set ObjProperties
    setHdrSectionProp('', viewBag.ObjKy, '', 'HdrSec1');
    setHdrSectionProp('', viewBag.ObjKy, '', 'HdrSec2');
    setHdrSectionProp('', viewBag.ObjKy, '', 'HdrSec3');
    setHdrSectionProp('', viewBag.ObjKy, '', 'HdrSec4');
    setHdrSectionProp('', viewBag.ObjKy, '', 'HdrSec5');
    setHdrSectionProp('', viewBag.ObjKy, '', 'HdrSec6');
    setHdrSectionProp('', viewBag.ObjKy, '', 'HdrSec7');
    setHdrSectionProp('', viewBag.ObjKy, '', 'HdrSec8');
    setHdrSectionProp('', viewBag.ObjKy, '', 'HdrSec9');
    setHdrSectionProp('', viewBag.ObjKy, '', 'HdrSec10');

    SetHandlingEnterKeyEvent('', viewBag.ObjKy);

    //$("#HdrSec1_InptDocNo_Val").focus();
    //-- Set Foucs event based on ObjMas and UsrObj
    SetFirstFocusObj();
    HideSectnFrmtGrp();
}


function setHeight() {
    var height = $(window).height();
    //var hfilterCont = $("#filterCont").height();
    var hButtonSet = $("#ButtonSet").height();
    var hHdrPart = $("#HdrPart").height();
    var hChildHdrpart = $("#ChildHdrpart").height();
    //$("#body").height(height);
    var id = ("#" + viewBag.OurCd);
    var gridElement = $(id);
    var dataArea = gridElement.find(".k-grid-content");
    dataArea.height(height - (405 + hButtonSet + hHdrPart + hChildHdrpart));
}

function DisableFeature() {
    var cmbPmt = $("#HdrSec3_CmbPmtTerm_Cd").data("kendoComboBox");
    //cmbPmt.enable(false);
    var cmbCurrency = $("#cmbCurrency").data("kendoComboBox");
    //cmbCurrency.enable(false);
}

function isNumberOnlyTextField(evt) {
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode != 46 && charCode > 31
      && (charCode < 48 || charCode > 57))
        return false;
    return true;
}

function setDefault() {
    var ourcd = viewBag.OurCd;
    if (ourcd == "ItmTrnOut") {
        var myComboBox = $('#HdrSec3_CmbPmtTerm_Cd').data('kendoComboBox');
        myComboBox.text("Credit");
        //  myComboBox.trigger("select");
        //$("#cmbCurrency").data("kendoComboBox").value(178);
        var CurrancyComboBox = $('#cmbCurrency').data('kendoComboBox');
        CurrancyComboBox.text("LKR");
    }
}

function CreateNewGridRow() {

}

function LoadNumericBox() {

    $("#HdrSec4_InptSubTot_Val").kendoNumericTextBox({
        min: 0,
        spinners: false
    });
    $("#HdrSec4_InptDisc_Val").kendoNumericTextBox({
        min: 0,
        spinners: false
    });
    $("#HdrSec4_InptVat_Val").kendoNumericTextBox({
        min: 0,
        spinners: false
    });
    $("#HdrSec4_InptWHT_Val").kendoNumericTextBox({
        min: 0,
        spinners: false
    });
    $("#HdrSec4_InptNBT_Val").kendoNumericTextBox({
        min: 0,
        spinners: false
    });
    $("#HdrSec4_InptSVAT_Val").kendoNumericTextBox({
        min: 0,
        spinners: false
    });
    $("#HdrSec4_InptTotal_Val").kendoNumericTextBox({
        min: 0,
        spinners: false
    });
    $("#HdrSec7_InptQty_Val").kendoNumericTextBox({
        min: 0,
        spinners: false,
        decimals: 3,
        format: "n3"
    });
    $("#HdrSec7_InptRate_Val").kendoNumericTextBox({
        min: 0,
        spinners: false
    });
    $("#HdrSec7_InptDis_Val").kendoNumericTextBox({
        min: 0,
        spinners: false
    });
    $("#HdrSec7_InptDisAmt_Val").kendoNumericTextBox({
        min: 0,
        spinners: false
    });
    $("#HdrSec8_InptVat_Val").kendoNumericTextBox({
        min: 0,
        spinners: false
    });
    $("#HdrSec8_InptVatAmt_Val").kendoNumericTextBox({
        min: 0,
        spinners: false
    });
    $("#HdrSec9_InptSVAT_Val").kendoNumericTextBox({
        min: 0,
        spinners: false
    });
    $("#HdrSec9_InptSVATAmt_Val").kendoNumericTextBox({
        min: 0,
        spinners: false
    });
    $("#HdrSec8_InptNBT_Val").kendoNumericTextBox({
        min: 0,
        spinners: false
    });
    $("#HdrSec8_InptNBTAmt_Val").kendoNumericTextBox({
        min: 0,
        spinners: false
    });
    $("#HdrSec9_InptWHT_Val").kendoNumericTextBox({
        min: 0,
        spinners: false
    });
    $("#HdrSec9_InptWHTAmt_Val").kendoNumericTextBox({
        min: 0,
        spinners: false
    });
    $("#HdrSec10_InptLiNo_Val").kendoNumericTextBox({
        min: 0,
        spinners: false
    });
    //$("#HdrSec4_InptSubTot_Val").kendoNumericTextBox({
    //    min: 0,
    //    spinners: false
    //});
    $("#HdrSec10_InptSubTot_Val").kendoNumericTextBox({
        min: 0,
        spinners: false
    });
}

$("#HdrSec1_DatPicDate_Val").width(150).kendoDatePicker({
    format: "dd/MM/yyyy",
    min: new Date(31, 2, 2009),
    change: function () {
        FormGlblData.IsDetailRelatedHdrSectionChanged = true;
    }
});
$("#HdrSec1_DatPicDate_Val").closest("span.k-datepicker").width('100%');

$("#YurRefDate").width(150).kendoDatePicker({
    format: "yyyy/MM/dd",
    min: new Date(2009, 2, 31)
});
$("#YurRefDate").closest("span.k-datepicker").width(150);

$("#HdrSec3_InptExRate_Val").kendoNumericTextBox({
    min: 0.0000,
    decimals: 0,
    format: "n4",
    spinners: false
});

function onDateChange(e) {
    var val = $('#HdrSec1_DatPicDate_Val').val();
    var dt = e.sender;
    var value = CheckDateforAutoMonthYear(val);
    var val1 = value.split("/");
    var val2 = val1[1] + "/" + val1[0] + "/" + val1[2];

    var ActualDate = new Date(val2);
    var minVal = new Date(dt.min());
    var maxVal = new Date(dt.max());

    if (value === null) {
        value = kendo.parseDate(dt.element.val(), dt.options.parseFormats);
    }

    if (ActualDate < minVal)
    {
        dt.value(dt.min());
    } else if (ActualDate > maxVal)
    {
        dt.value(dt.max());
    }
    else
    {
        dt.value(value);
    }
}

//function onDateChange(e) {
//    var datepicker = $("#HdrSec1_DatPicDate_Val").data("kendoDatePicker");
//    var min = datepicker.min();
//    console.log(min)
//    //var val = $('#HdrSec1_DatPicDate_Val').val();
//    //var dt = e.sender;
//    //var x = CheckDateforAutoMonthYear(val);
//    ////var value = EnteredDate;
//    //var value = dt.value(x);
//    //if (value === null) {
//    //    value = kendo.parseDate(dt.element.val(), dt.options.parseFormats);
//    //}

//    //if (value < dt.min()) {
//    //    dt.value(dt.min());
//    //} else if (value > dt.max()) {
//    //    dt.value(dt.max());
//    //}
//}


