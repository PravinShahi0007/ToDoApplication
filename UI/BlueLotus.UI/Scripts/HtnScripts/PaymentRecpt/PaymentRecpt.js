var todayDate = new Date();
var dd = todayDate.getDate();
var mm = todayDate.getMonth() + 1; //January is 0!

var yyyy = todayDate.getFullYear();
if (dd < 10) {
    dd = "0" + dd;
}
if (mm < 10) {
    mm = "0" + mm;
}
var todayDate = dd + "/" + mm + "/" + yyyy;

var FormGlblData = {
    FormObjData: null,
    TrnTypKy: 1,
    AccessLvlKy: 1,
    ConfiLvlKy: 1,
    TrnKy: 1,
    AllDefalutValueObj: null,
    GotItemRate: 0,
    TimeStamp: "",
    IsRecState: -1,
    TempLiNumber: -1,
    TempBU: -1,
    TempPrj: -1,
    ISNeworUpdateTranction: 1,
    isAllowSaveByBackDate: 1,
    FromFindDate: todayDate,
    FromTrnKy: 1,
    OurCode2: null,
    AprStsLock: null,
    AprStsLockMsg: "",
    isAlwAcs: null,
    isAlwAdd: null,
    isAlwUpdate: null,
    isAlwDel: null,
    isAlwApr: null,
    selectedIndex: 0,
    AdrDuplicateFill: 0,
    FormGridArray: [],
    FindFormGridArray : []

};


var CdMasModel = {
    IsTrnRateInclusiveTaxTyp1_VAT: 0, // IsTrnRateInclusiveTaxTyp1_VAT : isCd27
    TrnMinDate: "", // Back date Transaction Purpose
    TrnMaxDate: "" // Future Date Transaction Purpose
};

function GetCdMasBy_CdKy(CdKy) {
    $.ajax({
        url: urlCodes.GetCdMasBy_CdKy,
        dataType: "json",
        type: "POST",
        data: JSON.stringify({
            ObjKy: viewBag.ObjKy,
            CdKy: CdKy
        }),
        contentType: "application/json; charset=utf-8",
        success: function (CdMasModelData) {
            CdMasModel.IsTrnRateInclusiveTaxTyp1_VAT = CdMasModelData.isCd27;
            CdMasModel.TrnMinDate = CdMasModelData.TrnMinDate;
            CdMasModel.TrnMaxDate = CdMasModelData.TrnMaxDate;

            GetFormObjData();
            //Old ObjMas Dynamic Button Function
            //Button_From_Dynamic("ButtonSec1");
            //Button_From_Dynamic("ButtonSec2");
            //Button_From_Dynamic("ButtonSec3");
        }
    });
}


$(document).ready(function () {
    OPENLodingForm();
    GetUserPermission(); // Get UserPermission Properties from DB.
    $.ajax({
        url: urlCodes.GetCdKyByConCdAndOurCd,
        dataType: "json",
        type: "POST",
        data: JSON.stringify({
            ObjKy: viewBag.ObjKy,
            ConCd: "TrnTyp",
            OurCd: viewBag.OurCd
        }),
        contentType: "application/json; charset=utf-8",
        success: function (TrnTypKy) {
            FormGlblData.TrnTypKy = TrnTypKy;
            GetCdMasBy_CdKy(TrnTypKy);
        }
    });
});

function GetFormObjData() {

    $.ajax({
        url: urlUsrObjPrp_SelectAllLastChildWeb,
        dataType: "json",
        type: "POST",
        data: JSON.stringify({
            PrntKy: viewBag.ObjKy
        }),
        contentType: "application/json; charset=utf-8",
        success: function (HdrSectionFromDb) {

            FormGlblData.FormObjData = HdrSectionFromDb;
            //New ObjMas Function 
            HideTheProperty(FormGlblData.FormObjData);

            //Old ObjMas Function
            //FormGlblData.AllDefalutValueObj = Get_AllDefalutValue_Obj();
            //FormGlblData.AllValidationObj = Get_All_Validation_Obj();
            //FormGlblData.AllValidationObj = sortByKey(FormGlblData.AllValidationObj, "ValidationOrder");
            DocReadyCus();
        }
    });
}

function DocReadyCus() {
    if (FormGlblData.isAlwAcs == 0) {
        alert("You Don't Have Access Permission. We Are Redirecting To Home...");
        var url = "http://" + document.location.host + "/DevBL10/" + "Home" + "/" + "Home";
        window.location.href = url;
        return;
    }
    //Load datePickeres and set the default dates
    LoadDatePickers();
    //Load dropdowns List 
    LoadDropDown();
    //Set Defaults
    //Sethome currency and recipt multi chekbox
    SetDefaults();
    //LOad the hedder  level Combo load
    LoadHdrAccount();
    //Load the detail level Combo load
    LoadDetailCombo();
    //LoadDetailCombo();
    // PmtRcptGrid();
    //
    //Load detail BU part
    detailBULoad();
    ChangeSpan();
    showhideStmpDuty();
    // KeyPressEvent();

    //Old ObjMas Function
    //setTimeout(setHdrSectionPropFun, 2000);

    GridDefaultColumns();
    FindGridDefaultColumns();
    setTimeout(function () {
        CLOSELoadingForm();
        CheckUserPermission();
    },
        1000);
    // clearfunction();

    //New ObjMas Function For EnterEvent And Set DefaultValue 
    NextEnterKyEvent(FormGlblData.FormObjData);
    FormGlblData.AllDefalutValueObj = Get_AllDefalutValue_Obj();
    Set_AllDefalutValue_Obj();
    FormGlblData.AllValidationObj = Get_All_Validation_Obj();

    ClearHdrDetail();
    ClearDetail();
    //ClearGrid();

    //Temp Commenting For New ObjMas Function(Kirsh)
    //Clear_AllDefalutValue_Obj();
    if (viewBag.OurCd.toUpperCase() == "RECP" ||
        viewBag.OurCd.toUpperCase() == "ADVRECP" ||
        viewBag.OurCd.toUpperCase() == "RECPTMP") {
        document.getElementById("HdrSec2_Chkbox_multi_Val").checked = true;
    } else {
        document.getElementById("HdrSec2_Chkbox_multi_Val").checked = false;
    }
    $("#HdrSec12_Chkbox_isStamp_Val").prop("checked", false);

    SetTrnDate();
    SetFirstFocusObj();
    // $("#HdrSec1_InptDocNo_Val").focus();

    //Old ObjMas Function 
    //setTimeout(moreOptionControll, 15000);
}

function moreOptionControll() { //hide more option button when there's no options
    if (!$('#ButtonSec3').children().length > 0) {
        $('#ButtonSec1_More').hide();
    }
}

function showhideStmpDuty() {
    $.ajax({
        url: urlCheckIsStamp,
        dataType: "json",
        type: "POST",
        data: JSON.stringify({
            ObjKy: viewBag.ObjKy,
            OurCd: viewBag.OurCd
        }),
        contentType: "application/json; charset=utf-8",
        success: function (IsStmp) {
            if (!IsStmp) {
                document.getElementById("HdrSec12_Chkbox_isStamp").style.display = "none";
            }

        }
    });

}

$("#HdrSec2_Chkbox_multi_Val")
    .change(function () {
        $("#PmtRcprGrd").data("kendoGrid").dataSource.data([]);
        ClearAccountCombo();
        ChangeSpan();
        LoadHdrAccount();
        LoadDetailAccount();

    });

function LoadDatePickers() {
    $("#HdrSec1_DatVouDate_Val")
        .kendoDatePicker({
            format: "dd/MM/yyyy",
            min: new Date(31, 2, 2009),
            change: onVauDateChange
        });
    $("#HdrSec1_DatVouRefDate_Val")
        .kendoDatePicker({
            format: "dd/MM/yyyy",
            min: new Date(31, 2, 2009)
        });
    $("#HdrSec15_DatDueDate_Val")
        .kendoDatePicker({
            format: "dd/MM/yyyy",
            min: new Date(31, 2, 2009)
        });
    var todayDate = new Date();
    $("#HdrSec1_DatVouDate_Val").data("kendoDatePicker").value(todayDate);
    $("#HdrSec1_DatVouRefDate_Val").data("kendoDatePicker").value(todayDate);
}

function ChangeSpan() {

    var MultiCredit;
    if ($("#HdrSec2_Chkbox_multi_Val").is(":checked")) {
        MultiCredit = 1;

    } else {
        MultiCredit = 0;

    }


    if ((OurCode == "RECP" && MultiCredit == 1) ||
        (OurCode == "PMT" && MultiCredit == 1) ||
        (OurCode == "ADVPMT" && MultiCredit == 1) ||
        (OurCode == "ADVRECP" && MultiCredit == 1) ||
        (OurCode == "RecpTmp" && MultiCredit == 1)) {
        document.getElementById("HdrSec2_CmbHdrAcc_Lbl").innerHTML = "Debit To";
        document.getElementById("HdrSec4_CmbDtlAcc_Lbl").innerHTML = "Credit From";

    }
    if ((OurCode == "PMT" && MultiCredit == 0) ||
        (OurCode == "RECP" && MultiCredit == 0) ||
        (OurCode == "ADVPMT" && MultiCredit == 0) ||
        (OurCode == "ADVRECP" && MultiCredit == 0) ||
        (OurCode == "RecpTmp" && MultiCredit == 0)) {
        document.getElementById("HdrSec2_CmbHdrAcc_Lbl").innerHTML = "Credit From";
        document.getElementById("HdrSec4_CmbDtlAcc_Lbl").innerHTML = "Debit To";

    }

}

function onVauDateChange(e) {
    var VauDate = $("#HdrSec1_DatVouDate_Val").data("kendoDatePicker").value();

    if (viewBag.OurCd == "PMT") {
        // document.getElementById("HdrSec2_Chkbox_multi_Val").checked = true;
        $("#HdrSec5_DatChqDate_Val").data("kendoDatePicker").value(VauDate);
    }

}

//Sethome currency and recipt multi chekbox
function SetDefaults() {

    SelectHomeCurey();
    document.getElementById("HdrSec2_Chkbox_IsRec_Val").checked = false;
    document.getElementById("HdrSec2_Chkbox_multi_Val").checked = false;
    $("#HdrSec6_NmricAmt_Val")
        .kendoNumericTextBox({
            decimals: 3,
            spinners: false,
            min: 0,
        });
    $("#HdrSec7_DatMADate_Val")
        .kendoDatePicker({
            format: "dd/MM/yyyy",
            min: new Date(31, 2, 2009),
            change: onMaDateChange
        });
    $("#HdrSec5_DatChqDate_Val")
        .kendoDatePicker({
            format: "dd/MM/yyyy",
            min: new Date(31, 2, 2009)
        });
    $("#HdrSec7_DatMADate_Val").css("height", "100%");
    $("#HdrSec5_DatChqDate_Val").css("height", "100%");


    if (viewBag.OurCd == "RECP" || viewBag.OurCd == "ADVRECP") {
        document.getElementById("HdrSec2_Chkbox_multi_Val").checked = true;

    } else {
        document.getElementById("HdrSec2_Chkbox_multi_Val").checked = false;

    }

}

//$('#typetextbox').keypress(function (e) {
//    if (e.keyCode == 13) $('#submit').click();
//    alert();
//});
document.getElementById("HdrSec14_TxtArea_Des_Val")
    .addEventListener("keydown",
        function (event) {
            if (event.altKey && event.keyCode == 13) {
                var FocusedElement = document.activeElement.id;
                if (FocusedElement == "HdrSec14_TxtArea_Des_Val") {
                    var textarea = document.getElementById(FocusedElement);
                    textarea.value += "\n";
                    return
                }
                event.preventDefault();
            }
            if (event.keyCode == 13) {
                var TempDetailAccKy = $("#HdrSec4_CmbDtlAcc_Cd").data("kendoComboBox").value();
                var TempDetailAdrKy = $("#HdrSec4_CmbDtlAdr_Cd").data("kendoComboBox").value();
                var TempPmtModKy = $("#HdrSec5_CmbPayMode_Cd").data("kendoComboBox").value();
                var HdrSec6_NmricAmt_Val = $("#HdrSec6_NmricAmt_Val").data("kendoNumericTextBox").value();
                var TempDiscrption = $("#HdrSec14_TxtArea_Des_Val").val();
                //var isCross;
                //if ($("#HdrSec15_Chkbox_isCross_Val").is(":checked")) {
                //    isCross = 1;
                //} else {
                //    isCross = 0;
                //}
                //var isCash;
                //if ($("#HdrSec12_Chkbox_isCash_Val").is(":checked")) {
                //    isCash = 1;
                //} else {
                //    isCash = 0;
                //}
                //if (isCross == 0 && isCash == 0 && OurCode == "PMT") {
                //    alert("Select Is Cross or is Cash ");
                //    return
                //}
                var Lino = FormGlblData.TempLiNumber;
                if (Lino < 0)
                {
                    if ($("#PmtRcprGrd").data("kendoGrid").dataSource._data.length != 0) {
                        var data = $("#PmtRcprGrd").data("kendoGrid").dataSource._data;
                        var entercho = $("#HdrSec5_InptChqNO_Val").val();
                        var payeename = $("#HdrSec15_InpPayee_Val").val();
                        if (entercho.trim().length != 0) {
                            if (payeename.trim().length != 0) {
                                for (i = 0; i < data.length; i++) {

                                    if (data[i].ChqNo == entercho) {
                                        if (data[i].PayeeName != payeename) {
                                            alert("PayeeName And ChqNo combination  unique");
                                            ClearDetail();
                                            return;
                                        }
                                    }

                                }
                            }
                            else {
                                alert("Enter the Payee Name");
                                return;
                            }

                        }

                    }
                }
                else
                {
                    if ($("#PmtRcprGrd").data("kendoGrid").dataSource._data.length != 0)
                    {
                        var data = $("#PmtRcprGrd").data("kendoGrid").dataSource._data;
                        var entercho = $("#HdrSec5_InptChqNO_Val").val();
                        var payeename = $("#HdrSec15_InpPayee_Val").val();
                        if (entercho.trim().length != 0)
                        {
                            if (payeename.trim().length != 0)
                            {
                                for (i = 0; i < data.length; i++)
                                {
                                    var unchekLine = i + 1;
                                    if (unchekLine != Lino)
                                    {
                                        if (data[i].ChqNo == entercho)
                                        {
                                            if (data[i].PayeeName != payeename)
                                            {
                                                alert("PayeeName And ChqNo combination  unique");
                                                ClearDetail();
                                                return;
                                            }
                                        }
                                    }
                                }


                            }
                        }
                    }

                }
                
              
              

                if (!TempDetailAccKy || TempDetailAccKy == 1 || TempDetailAccKy == "") {
                    alert("Enter An Account");
                    $("#HdrSec4_CmbDtlAcc_Cd").data("kendoComboBox").input.focus();
                } else if (!TempDetailAdrKy || TempDetailAdrKy == 1 || TempDetailAdrKy == "") {
                    alert("Enter An Address");
                    $("#HdrSec4_CmbDtlAdr_Cd").data("kendoComboBox").input.focus();
                } else if ((!TempPmtModKy && OurCode != "EntExp") ||
                    (TempPmtModKy == 1 && OurCode != "EntExp") ||
                    (TempPmtModKy == "" && OurCode != "EntExp")) {
                    alert("Enter a Payment Method");

                    $("#HdrSec5_CmbPayMode_Cd").data("kendoComboBox").input.focus();
                } else if (!HdrSec6_NmricAmt_Val || HdrSec6_NmricAmt_Val == 0 || HdrSec6_NmricAmt_Val == "") {
                    alert("Enter an Amount");
                    $("#HdrSec6_NmricAmt_Val").data("kendoNumericTextBox").focus();

                } else if (TempDiscrption.length < 2) {
                    alert("Enter a Description");
                    document.getElementById["HdrSec14_TxtArea_Des_Val"].value = "";
                    $("#HdrSec14_TxtArea_Des_Val").focus();

                } else {
                    AddFistRowHdr();

                }
                event.preventDefault();
            }
        });


//function KeyPressEvent() {
//$("#HdrSec14_TxtArea_Des_Val")
//    .keypress(function (event) {
//        event.preventDefault();
//        var keycode = (event.keyCode ? event.keyCode : event.which);
//        if (keycode == "13") {
//            var TempDetailAccKy = $("#HdrSec4_CmbDtlAcc_Cd").data("kendoComboBox").value();
//            var TempDetailAdrKy = $("#HdrSec4_CmbDtlAdr_Cd").data("kendoComboBox").value();
//            var TempPmtModKy = $("#HdrSec5_CmbPayMode_Cd").data("kendoComboBox").value();
//            var HdrSec6_NmricAmt_Val = $("#HdrSec6_NmricAmt_Val").data("kendoNumericTextBox").value();
//            var TempDiscrption = $("#HdrSec14_TxtArea_Des_Val").val();
//            //var isCross;
//            //if ($("#HdrSec15_Chkbox_isCross_Val").is(":checked")) {
//            //    isCross = 1;
//            //} else {
//            //    isCross = 0;
//            //}
//            //var isCash;
//            //if ($("#HdrSec12_Chkbox_isCash_Val").is(":checked")) {
//            //    isCash = 1;
//            //} else {
//            //    isCash = 0;
//            //}
//            //if (isCross == 0 && isCash == 0 && OurCode == "PMT") {
//            //    alert("Select Is Cross or is Cash ");
//            //    return
//            //}

//            if (!TempDetailAccKy || TempDetailAccKy == 1 || TempDetailAccKy == "") {
//                alert("Enter An Account");
//                $("#HdrSec4_CmbDtlAcc_Cd").data("kendoComboBox").input.focus();
//            } else if (!TempDetailAdrKy || TempDetailAdrKy == 1 || TempDetailAdrKy == "") {
//                alert("Enter An Address");
//                $("#HdrSec4_CmbDtlAdr_Cd").data("kendoComboBox").input.focus();
//            } else if ((!TempPmtModKy && OurCode != 'EntExp') || (TempPmtModKy == 1 && OurCode != 'EntExp') || (TempPmtModKy == "" && OurCode != 'EntExp')) {
//                alert("Enter a Payment Method");

//                $("#HdrSec5_CmbPayMode_Cd").data("kendoComboBox").input.focus();
//            } else if (!HdrSec6_NmricAmt_Val || HdrSec6_NmricAmt_Val == 0 || HdrSec6_NmricAmt_Val == "") {
//                alert("Enter an Amount");
//                $("#HdrSec6_NmricAmt_Val").data("kendoNumericTextBox").focus();

//            } else if (TempDiscrption.length < 2) {
//                alert("Enter a Description");
//                document.getElementById["HdrSec14_TxtArea_Des_Val"].value = "";
//                $("#HdrSec14_TxtArea_Des_Val").focus();

//            } else {
//                AddFistRowHdr();

//            }

//        }
//    });
//}


function CalTotal() {
    var grid = $("#PmtRcprGrd").data("kendoGrid");
    if (grid == undefined)
        return 0;
    var currentData = grid.dataSource.data();
    var newValue = 0;

    for (var i = 1; i < currentData.length; i++) {
        if (currentData[i].IsAct == 1) {
            var tempamt = parseFloat(currentData[i].Amount);
            newValue = newValue + tempamt;
        }
    }

    return newValue;
}


function clearfunction() {

    FormGlblData.ISNeworUpdateTranction = 1;
    FormGlblData.isAllowSaveByBackDate = 1;
    SetTrnDate();
    document.getElementById("mdul_Lbl_ObjCptn").innerHTML = "( Open )";
    document.getElementById("mdul_Lbl_ObjCptnMobile").innerHTML = "( Open )";
    $("#btnNxtStatesAction").hide();
    $("#cmbNxtStatesActions").data("kendoDropDownList").value(null);
    $("#HdrSec2_CmbHdrAcc_Cd").data("kendoComboBox").setDataSource(AccountCodeDatasource("HdrSec2_CmbHdrAcc"));
    //$("#HdrSec2_CmbHdrAcc_Nm").data("kendoComboBox").setDataSource(AccountDatasource("HdrSec2_CmbHdrAcc"));
    ClearHdrDetail();
    ClearDetail();
    ClearGrid();
    if (viewBag.OurCd == "RECP" || viewBag.OurCd == "ADVRECP") {
        document.getElementById("HdrSec2_Chkbox_multi_Val").checked = true;
    }
    else if(viewBag.OurCd == "RecpTmp")
    {
        document.getElementById("HdrSec2_Chkbox_multi_Val").checked = true;
    }
    else {
        document.getElementById("HdrSec2_Chkbox_multi_Val").checked = false;
    }
    Clear_AllDefalutValue_Obj();

    ChangeSpan();
    SetFirstFocusObj();
}

function ClearHdrDetail() {
    document.getElementById("HdrSec1_InptVouNo_Val").value = "";
    document.getElementById("HdrSec1_InptDocNo_Val").value = "";
    document.getElementById("HdrSec1_InptYurRef_Val").value = "";
    var todayDate = new Date();
    $("#HdrSec1_DatVouDate_Val").data("kendoDatePicker").value(todayDate);
    $("#HdrSec1_DatVouRefDate_Val").data("kendoDatePicker").value(todayDate);
    $("#HdrSec2_CmbPrj_Cd").data("kendoComboBox").value("");
    //$("#HdrSec2_CmbPrj_Nm").data("kendoComboBox").value("");
    $("#HdrSec2_CmbBU_Cd").data("kendoComboBox").value("");
    //$("#HdrSec2_CmbBU_Nm").data("kendoComboBox").value("");
    $("#HdrSec2_CmbHdrAcc_Cd").data("kendoComboBox").value("");
    //$("#HdrSec2_CmbHdrAcc_Nm").data("kendoComboBox").value("");
    $("#HdrSec2_CmbHdrAdr_Cd").data("kendoComboBox").value("");
    //$("#HdrSec2_CmbHdrAdr_Nm").data("kendoComboBox").value("");
    document.getElementById("HdrSec3_InptTotAmt_Val").value = "";
    document.getElementById("TmpTtlAmt").value = "";
    $("#HdrSec3_CmbTrnCurrncy_Cd").data("kendoComboBox").value("");
    $("#HdrSec3_CmbAccCurrncy_Cd").data("kendoComboBox").value("");
    document.getElementById("HdrSec3_InptTrnExRate_Val").value = "1.00";
    document.getElementById("HdrSec3_InptAccExRate_Val").value = "1.00";
    $("#HdrSec2_Chkbox_multi_Val").prop("checked", false);
    $("#HdrSec2_Chkbox_IsRec_Val").prop("checked", false);
    FormGlblData.TrnKy = -1;
    FormGlblData.TimeStamp = "";
    FormGlblData.IsRecState = -1;
    FormGlblData.TempLiNumber = -1;
    $("#HdrSec12_Chkbox_isStamp_Val").prop("checked", false);
    FormGlblData.selectedIndex = 0;
    try {
        $("#pager").data("kendoPager").dataSource.data([]);
    } catch (e) {

    }

}

function ClearDetail() {

    $("#HdrSec4_CmbDtlAcc_Cd").data("kendoComboBox").value("");
    //$("#HdrSec4_CmbDtlAcc_Nm").data("kendoComboBox").value("");

    $("#HdrSec4_CmbDtlAdr_Cd").data("kendoComboBox").value("");
    //for (var objMasData = FormGlblData.FormObjData, c = 0; c < objMasData.length; c++) {
    //    if (objMasData[c].ObjNm == "HdrSec4_CmbDtlAdr_Cd") {
    //        if (objMasData[c].ContraAutoFill != 1) {
    //            $("#HdrSec4_CmbDtlAdr_Cd").data("kendoComboBox").value("");
    //            $("#HdrSec4_CmbDtlAdr_Nm").data("kendoComboBox").value("");
    //        }
    //    }
    //    else if (objMasData[c].ObjNm == "HdrSec4_CmbDtlPrj_Cd") {
    //        if (objMasData[c].ContraAutoFill != 1) {
    //            $("#HdrSec4_CmbDtlPrj_Cd").data("kendoComboBox").value("");
    //            $("#HdrSec4_CmbDtlPrj_Nm").data("kendoComboBox").value("");
    //        }
    //    }
    //}
    //$("#HdrSec4_CmbDtlAdr_Nm").data("kendoComboBox").value("");
    $("#HdrSec4_CmbTsk_Cd").data("kendoComboBox").value("");
    //$("#HdrSec4_CmbTsk_Nm").data("kendoComboBox").value("");
    $("#HdrSec8_CmbAnl1_Cd").data("kendoComboBox").value("");
    //$("#HdrSec8_CmbAnl1_Nm").data("kendoComboBox").value("");
    $("#HdrSec8_CmbAnl2_Cd").data("kendoComboBox").value("");
    //$("#HdrSec8_CmbAnl2_Nm").data("kendoComboBox").value("");
    $("#HdrSec9_CmbAnl3_Cd").data("kendoComboBox").value("");
    //$("#HdrSec9_CmbAnl3_Nm").data("kendoComboBox").value("");
    $("#HdrSec9_CmbAnl4_Cd").data("kendoComboBox").value("");
    //$("#HdrSec9_CmbAnl4_Nm").data("kendoComboBox").value("");
    $("#HdrSec10_CmbAnl5_Cd").data("kendoComboBox").value("");
    //$("#HdrSec10_CmbAnl5_Nm").data("kendoComboBox").value("");
    $("#HdrSec10_CmbAnl6_Cd").data("kendoComboBox").value("");
    //$("#HdrSec10_CmbAnl6_Nm").data("kendoComboBox").value("");
    $("#HdrSec5_CmbPayMode_Cd").data("kendoComboBox").value("");
    document.getElementById("HdrSec5_InptChqNO_Val").value = "";

    $("#HdrSec5_DatChqDate_Val").data("kendoDatePicker").value("");
    $("#HdrSec12_Chkbox_isCash_Val").prop("checked", false);
    document.getElementById("HdrSec6_NmricAmt_Val").value = "";
    //document.getElementById("BankCode").value = "";
    //document.getElementById("BrnchCode").value = "";
    $("#HdrSec11_Chkbox_isAccPaye_Val").prop("checked", false);
    $("#HdrSec7_CmbCurCode_Val").data("kendoComboBox").value("");
    document.getElementById("HdrSec7_InptCurExRate_Cd").value = "";
    $("#HdrSec7_DatMADate_Val").data("kendoDatePicker").value("");
    document.getElementById("HdrSec14_TxtArea_Des_Val").value = "";
    FormGlblData.TempLiNumber = -1;
    $("#HdrSec6_NmricAmt_Val").data("kendoNumericTextBox").value("");
    $("#HdrSec4_CmbLC_Cd").data("kendoComboBox").value("");
    $("#HdrSec5_CmbLoan_Cd").data("kendoComboBox").value("");
    $("#HdrSec6_CmbOrder_Cd").data("kendoComboBox").value("");
    $("#HdrSec7_CmbOrderDet_Cd").data("kendoComboBox").value("");
    $("#HdrSec6_CmbBank_Cd").data("kendoComboBox").value("");
    $("#HdrSec6_CmbBranch_Cd").data("kendoComboBox").value("");
    $("#HdrSec13_CmbResAdr_Cd").data("kendoComboBox").value("");
    $("#HdrSec4_CmbDtlBU_Cd").data("kendoComboBox").value("");
    //$("#HdrSec4_CmbDtlBU_Nm").data("kendoComboBox").value("");
    $("#HdrSec4_CmbDtlPrj_Cd").data("kendoComboBox").value("");
    //$("#HdrSec4_CmbDtlPrj_Nm").data("kendoComboBox").value("");
    $("#HdrSec15_DatDueDate_Val").data("kendoDatePicker").value("");
    document.getElementById("HdrSec15_InpPayee_Val").value = "";
    $("#HdrSec11_ChkboxNagotiable_Val").prop("checked", false);
    document.getElementById("HdrSec15_InptDetDocNo_Val").value = "";
    $("#HdrSec15_Chkbox_isCross_Val").prop("checked", false);
    document.getElementById("HdrSec13_InptDetYurRefr_Val").value = "";
    document.getElementById("HdrSec7_InptRemark_Val").value = "";
    document.getElementById("HdrSec7_InptDesc_Val").value = "";

}


function ClearDetailWithOutPrjBU() {

    $("#HdrSec4_CmbDtlAcc_Cd").data("kendoComboBox").value("");
    //$("#HdrSec4_CmbDtlAcc_Nm").data("kendoComboBox").value("");

    //for (var objMasData = FormGlblData.FormObjData, c = 0; c < objMasData.length; c++) {
    //    if (objMasData[c].ObjNm == "HdrSec4_CmbDtlAdr_Cd") {
    //        if (objMasData[c].ContraAutoFill != 1) {
    //            $("#HdrSec4_CmbDtlAdr_Cd").data("kendoComboBox").value("");
    //            $("#HdrSec4_CmbDtlAdr_Nm").data("kendoComboBox").value("");
    //        }
    //    }
    //    else if (objMasData[c].ObjNm == "HdrSec4_CmbDtlPrj_Cd") {
    //        if (objMasData[c].ContraAutoFill != 1) {
    //            $("#HdrSec4_CmbDtlPrj_Cd").data("kendoComboBox").value("");
    //            $("#HdrSec4_CmbDtlPrj_Nm").data("kendoComboBox").value("");
    //        }
    //    }
    //}


    var AdrContraAutoFill = GetTheContraAutoFillOnOROff('HdrSec4_CmbDtlAdr');
    if (AdrContraAutoFill != 1) {
        $("#HdrSec4_CmbDtlAdr_Cd").data("kendoComboBox").value("");
        //$("#HdrSec4_CmbDtlAdr_Nm").data("kendoComboBox").value("");
    }

    var PrjContraAutoFill = GetTheContraAutoFillOnOROff('HdrSec4_CmbDtlPrj');
    if (PrjContraAutoFill != 1) {
        $("#HdrSec4_CmbDtlPrj_Cd").data("kendoComboBox").value("");
        //$("#HdrSec4_CmbDtlPrj_Nm").data("kendoComboBox").value("");
    }
    //$("#HdrSec4_CmbDtlAdr_Cd").data("kendoComboBox").value("");
    //$("#HdrSec4_CmbDtlAdr_Nm").data("kendoComboBox").value("");
    $("#HdrSec4_CmbTsk_Cd").data("kendoComboBox").value("");
    //$("#HdrSec4_CmbTsk_Nm").data("kendoComboBox").value("");
    $("#HdrSec4_CmbDtlBU_Cd").data("kendoComboBox").value("");
    //$("#HdrSec4_CmbDtlBU_Nm").data("kendoComboBox").value("");
    $("#HdrSec8_CmbAnl1_Cd").data("kendoComboBox").value("");
   // $("#HdrSec8_CmbAnl1_Nm").data("kendoComboBox").value("");
    $("#HdrSec8_CmbAnl2_Cd").data("kendoComboBox").value("");
    //$("#HdrSec8_CmbAnl2_Nm").data("kendoComboBox").value("");
    $("#HdrSec9_CmbAnl3_Cd").data("kendoComboBox").value("");
    //$("#HdrSec9_CmbAnl3_Nm").data("kendoComboBox").value("");
    $("#HdrSec9_CmbAnl4_Cd").data("kendoComboBox").value("");
    //$("#HdrSec9_CmbAnl4_Nm").data("kendoComboBox").value("");
    $("#HdrSec10_CmbAnl5_Cd").data("kendoComboBox").value("");
    //$("#HdrSec10_CmbAnl5_Nm").data("kendoComboBox").value("");
    $("#HdrSec10_CmbAnl6_Cd").data("kendoComboBox").value("");
    //$("#HdrSec10_CmbAnl6_Nm").data("kendoComboBox").value("");
    $("#HdrSec5_CmbPayMode_Cd").data("kendoComboBox").value("");
    document.getElementById("HdrSec5_InptChqNO_Val").value = "";

    $("#HdrSec5_DatChqDate_Val").data("kendoDatePicker").value("");
    
    document.getElementById("HdrSec6_NmricAmt_Val").value = "";
    //document.getElementById("BankCode").value = "";
    //document.getElementById("BrnchCode").value = "";
    $("#HdrSec7_CmbCurCode_Val").data("kendoComboBox").value("");
    document.getElementById("HdrSec7_InptCurExRate_Cd").value = "";
    $("#HdrSec7_DatMADate_Val").data("kendoDatePicker").value("");
    document.getElementById("HdrSec14_TxtArea_Des_Val").value = "";
    FormGlblData.TempLiNumber = -1;
    $("#HdrSec6_NmricAmt_Val").data("kendoNumericTextBox").value("");
    $("#HdrSec4_CmbLC_Cd").data("kendoComboBox").value("");
    $("#HdrSec5_CmbLoan_Cd").data("kendoComboBox").value("");
    $("#HdrSec6_CmbOrder_Cd").data("kendoComboBox").value("");
    $("#HdrSec7_CmbOrderDet_Cd").data("kendoComboBox").value("");
    $("#HdrSec6_CmbBank_Cd").data("kendoComboBox").value("");
    $("#HdrSec6_CmbBranch_Cd").data("kendoComboBox").value("");
    $("#HdrSec13_CmbResAdr_Cd").data("kendoComboBox").value("");
    
    
    $("#HdrSec15_DatDueDate_Val").data("kendoDatePicker").value("");
    document.getElementById("HdrSec15_InpPayee_Val").value = "";

    document.getElementById("HdrSec15_InptDetDocNo_Val").value = "";
    
    document.getElementById("HdrSec13_InptDetYurRefr_Val").value = "";
    document.getElementById("HdrSec7_InptRemark_Val").value = "";
    document.getElementById("HdrSec7_InptDesc_Val").value = "";

}

function ClearGrid() {
    var grid = $("#PmtRcprGrd").data("kendoGrid");
    if (grid == undefined)
        return;
    grid.dataSource.data([]);

}

function SaveUpdate(action) {

    if (FormGlblData.isAllowSaveByBackDate == 0) {
        alert("Save Disabled Due to Cofiguration!");
        return;
    }

    var TrnDateToUpdate = $("#HdrSec1_DatVouDate_Val").val();
    var TrnDateTemp = TrnDateToUpdate.match(/\d+/g),
        TrnDday = TrnDateTemp[0].substring(), // get only two digits
        TrnDmonth = TrnDateTemp[1],
        TrnDyear = TrnDateTemp[2];

    var MindatePart = CdMasModel.TrnMinDate.match(/\d+/g),
        Minyear = MindatePart[0].substring(), // get only two digits
        Minmonth = MindatePart[1],
        Minday = MindatePart[2];
    //  var MinDt = Minday + '/' + Minmonth + '/' + Minyear;

    var MaxdatePart = CdMasModel.TrnMaxDate.match(/\d+/g),
        Maxyear = MaxdatePart[0].substring(), // get only two digits
        Maxmonth = MaxdatePart[1],
        Maxday = MaxdatePart[2];
    //   var MaxDt = Maxday + '/' + Maxmonth + '/' + Maxyear;

    var TrnDateToUpdate = new Date(TrnDyear, TrnDmonth - 1, TrnDday, 0, 00, 00);
    var MinDt = new Date(Minyear, Minmonth - 1, Minday, 0, 00, 00);
    var MaxDt = new Date(Maxyear, Maxmonth - 1, Maxday, 0, 00, 00);


    if (TrnDateToUpdate < MinDt) {
        alert("Back Dated Transaction not Allowed!");
        return;
    } else if (TrnDateToUpdate > MaxDt) {
        alert("Transaction for future Date not Allowed!");
        return;
    }

    var grid = $("#PmtRcprGrd").data("kendoGrid");
    var newrecode = [];
    var updaterecode = [];
    var validationArray = [];
    var currentData = grid.dataSource.data();
    var TrnKy  =0;
    for (var i = 0; i < currentData.length; i++) {
        if (currentData[i].isNew()) {
            var chqnolen = currentData[i].ChqNo;
            if (chqnolen !== undefined && chqnolen.length > 1)
            {
                TrnKy  =0;
                validationArray.push(currentData[i].toJSON());
            }
            
        }
        else if (currentData[i].dirty) {
            var datepicker = document.getElementById("HdrSec1_DatVouDate_Val").value;
            if (currentData[i].ChqNo != null) {
                var chqnolen = currentData[i].ChqNo;
                if (chqnolen !== undefined && chqnolen.length > 1)
                {
                    TrnKy  =FormGlblData.TrnKy;
                    validationArray.push(currentData[i].toJSON());
                }
                
            }
        }
    }

    if (validationArray.length >0) {

        $.ajax({
            url: urlChqSaveVal,
            data: JSON.stringify({
                GridDataArray: kendo.stringify(validationArray),
                'ObjKy': viewBag.ObjKy,
                TrnKy: TrnKy

            }),
            contentType: "application/json; charset=utf-8",
            dataType: "Json",
            type: "POST",
            success: function (data) {

                if (data.length > 0) {
                    if (confirm(data + " " +"\nPressed Ok to Continue")) {
                        AfterCheqNumberValidation(action);
                    }
                    else {
                        return;
                    }
                }
                else {
                    AfterCheqNumberValidation(action);
                }
            }
        });

    }
    else {
        if (action == "save" || action == "saveandnew") {

            if (FormGlblData.isAlwAdd == 0) {
                alert("Warning: You Don't Have Permission To Insert.");
                CLOSELoadingCommon();
                return;
            }
            var validationMsg = Save_FinalValidation();
            if (validationMsg.length > 1) {
                alert(validationMsg);
                return;
            }
            var grid = $("#PmtRcprGrd").data("kendoGrid");
            var dataSource = grid.dataSource;
            //records on current data / page   
            var recordsOnCurrentView = dataSource.data().length;
            //total records
            var totalRecords = dataSource.total();
            if (totalRecords < 2) {
                alert("Please Enter At least two Records");
                return;
            }

            var TrnKy = FormGlblData.TrnKy;
            var hdnIsRecState = FormGlblData.IsRecState;

            var IsRec_Val;
            if ($("#HdrSec2_Chkbox_IsRec_Val").is(":checked")) {
                IsRec_Val = 1;
            } else {
                IsRec_Val = 0;
            }
            var ChkIsRecUpdtOrSave;
            if (hdnIsRecState == IsRec_Val) {
                //if hidden Field IsRecValue and ChkBox Is Rec Val is Eqal then it have to update 
                ChkIsRecUpdtOrSave = 1;
            } else {
                //if hidden Field IsRecValue and ChkBox Is Rec Val is different then it have to treat as a new record 
                ChkIsRecUpdtOrSave = 0;
            }

            if (TrnKy > 0 && ChkIsRecUpdtOrSave == 1) {
                var result = confirm("Do you want to Update the record?");
                if (result == true) {
                    if (FormGlblData.isAlwUpdate == 0) {
                        alert("Warning: You Don't Have Permission To Update.");
                        CLOSELoadingCommon();
                        return;
                    }
                    OPENLodingCommon("Updating ... !");
                    UpdatePaymentHedder();
                }

            } else {
                OPENLodingCommon("Saving ... !");
                SaveHedder(action);
            }


        } else if (action == "Update") {



            if (FormGlblData.isAlwUpdate == 0) {
                alert("Warning: You Don't Have Permission To Update.");
                CLOSELoadingCommon();
                return;
            }
            var TrnKy = FormGlblData.TrnKy;

            if (TrnKy) {
                OPENLodingCommon("Updating ... !");
                UpdatePaymentHedder();
            } else {

                alert("Plase Selelect a Transaction First");
            }

        }
    }

  

}

function SaveHedder(action) {
    var HdrSec1_DatVouDate_Val = document.getElementById("HdrSec1_DatVouDate_Val").value;
    var HdrSec1_InptDocNo_Val = document.getElementById("HdrSec1_InptDocNo_Val").value;
    var HdrSec1_InptYurRef_Val = document.getElementById("HdrSec1_InptYurRef_Val").value;
    var cmbCrnKy = $("#HdrSec3_CmbTrnCurrncy_Cd").data("kendoComboBox").value();
    if (!cmbCrnKy || cmbCrnKy == "") {
        cmbCrnKy = 1;
    }
    var HdrSec1_DatVouRefDate_Val = document.getElementById("HdrSec1_DatVouRefDate_Val").value;
    var ExRateHrd = document.getElementById("HdrSec3_InptTrnExRate_Val").value;
    var PrjKy = $("#HdrSec2_CmbPrj_Cd").data("kendoComboBox").value();
    if (!PrjKy || PrjKy == "") {
        PrjKy = 1;
    }
    var BUKy = $("#HdrSec2_CmbBU_Cd").data("kendoComboBox").value();
    if (!BUKy || BUKy == "") {
        BUKy = 1;
    }

    var HdrSec2_Chkbox_IsRec_Val;
    if ($("#HdrSec2_Chkbox_IsRec_Val").is(":checked")) {
        HdrSec2_Chkbox_IsRec_Val = 1;
    } else {
        HdrSec2_Chkbox_IsRec_Val = 0;
    }

    var grid = $("#PmtRcprGrd").data("kendoGrid");
    var dataSource = grid.dataSource;
    //records on current data / page   
    var recordsOnCurrentView = dataSource.data().length;
    //total records
    var totalRecords = dataSource.total();
    var MultiCredit;
    if ($("#HdrSec2_Chkbox_multi_Val").is(":checked")) {
        MultiCredit = 1;
    } else {
        MultiCredit = 0;
    }
    var FrmTrnKy = FormGlblData.FromTrnKy;

    var cmbAccKy = $("#HdrSec2_CmbHdrAcc_Cd").data("kendoComboBox").value();
    if (!cmbAccKy) {
        alert("Please Select an Account");
    }
    var rem = $("#HdrSec7_InptRemark_Val").val();
    var des = $("#HdrSec7_InptDesc_Val").val();

    //var newrecode = [];
    //var updaterecode = [];
    //var currentData = grid.dataSource.data();

    //for (var i = 0; i < currentData.length; i++) {
    //    if (currentData[i].isNew()) {
    //        newrecode.push(currentData[i].toJSON());
    //    }
    //}
    //var validationMasage = false;
    //if (newrecode != null) {
    //    alert(JSON.stringify(newrecode));
    //    $.ajax({
    //        url: urlChqSaveVal,
    //        data: JSON.stringify({
    //            GridDataArray: kendo.stringify(newrecode),
    //            'ObjKy': viewBag.ObjKy

    //        }),
    //        contentType: "application/json; charset=utf-8",
    //        dataType: "Json",
    //        type: "POST",
    //        success: function (data) {
                
    //            if(data.length>0)
    //            {
    //                alert(data);
    //                CLOSELoadingCommon();
    //                validationMasage = false;
    //                return false;
    //            }
    //            else {
    //                validationMasage = true;
    //            }
    //        },
    //        error: function (e) {
    //            return false;
    //        }
    //    });
    //}
    if (totalRecords >= 2) {
        $.ajax({
            url: urlSaveHdr,
            data: JSON.stringify({
                isRecur: 0,
                VouDate: HdrSec1_DatVouDate_Val,
                DocNo: HdrSec1_InptDocNo_Val,
                UrRef: HdrSec1_InptYurRef_Val,
                cmbCrnKy: cmbCrnKy,
                Yourref_Date: HdrSec1_DatVouRefDate_Val,
                ExRateHrd: ExRateHrd,
                PrjKy: PrjKy,
                BUKy: BUKy,
                OurCd: OurCode,
                IsRec: HdrSec2_Chkbox_IsRec_Val,
                MultiCredit: MultiCredit,
                FrmTrnKy: FrmTrnKy,
                objky: viewBag.ObjKy,
                cmbAccKy: cmbAccKy,
                rem: rem,
                des: des

            }),
            contentType: "application/json; charset=utf-8",
            dataType: "Json",
            type: "POST",
            success: function (data) {
                var trnKy = data[0].TrnKy;
                var AccLevlKy = data[0].AccLevlKy;
                var ConFinKy = data[0].ConFinKy;

                InsertGrid(trnKy, HdrSec1_DatVouDate_Val, action, AccLevlKy, ConFinKy, cmbCrnKy);
            },
            error: function (e) {
                return false;
            }
        });

    } else {
        alert("Please Enter Grid Details");
        return;
    }
    //} else {
    //    alert("Please Enter a Document Number");
    //}
}

function InsertGrid(trnKy, HdrSec1_DatVouDate_Val, action, AccLevlKy, ConFinKy, cmbCrnKy) {
    var grid = $("#PmtRcprGrd").data("kendoGrid");
    var currentData = grid.dataSource.data();
    var updatedRecords = [];
    var newRecords = [];
    var MultiCredit;
    if ($("#HdrSec2_Chkbox_multi_Val").is(":checked")) {
        MultiCredit = 1;
    } else {
        MultiCredit = 0;
    }
    var HdrSec2_Chkbox_IsRec_Val;
    if ($("#HdrSec2_Chkbox_IsRec_Val").is(":checked")) {
        HdrSec2_Chkbox_IsRec_Val = 1;
    } else {
        HdrSec2_Chkbox_IsRec_Val = 0;
    }
    var TrnKy = FormGlblData.TrnKy;
    var hdnIsRecState = FormGlblData.IsRecState;
    var ChkIsRecUpdtOrSave;
    if (hdnIsRecState == HdrSec2_Chkbox_IsRec_Val) {
        //if hidden Field IsRecValue and ChkBox Is Rec Val is Eqal then it have to update 
        ChkIsRecUpdtOrSave = 1;
    } else {
        //if hidden Field IsRecValue and ChkBox Is Rec Val is different then it have to treat as a new record 
        ChkIsRecUpdtOrSave = 0;
    }
    for (var i = 0; i < currentData.length; i++) {
        if (currentData[i].isNew()) {
            //this record is new
            newRecords.push(currentData[i].toJSON());
        } else if (TrnKy > 0 && ChkIsRecUpdtOrSave == 0) {
            newRecords.push(currentData[i].toJSON());
        } else {
            updatedRecords.push(currentData[i].toJSON());
        }
    }
    var IsStampDuty;
    if ($("#HdrSec12_Chkbox_isStamp_Val").is(":checked")) {
        IsStampDuty = 1;
    } else {
        IsStampDuty = 0;
    }
    var ExRateHrd = document.getElementById("HdrSec3_InptTrnExRate_Val").value;


    $.ajax({
        url: urlInsertInsertDetail,
        data: JSON.stringify({
            trnKy: trnKy,
            VouDate: HdrSec1_DatVouDate_Val,
            NewGridDetail: kendo.stringify(newRecords),
            UpdatedGridDetail: kendo.stringify(updatedRecords),
            OurCd: OurCode,
            MultiCredit: MultiCredit,
            IsRec: HdrSec2_Chkbox_IsRec_Val,
            AccLevlKy: AccLevlKy,
            ConFinKy: ConFinKy,
            cmbCrnKy: cmbCrnKy,
            IsStampDuty: IsStampDuty,
            ObjKy: ObjKy,
            ExRateHrd: ExRateHrd

        }),
        contentType: "application/json; charset=utf-8",
        dataType: "Json",
        type: "POST",
        success: function (data) {
            if (data) {
                if (action == "save" || action == "saveandnew") {
                    CLOSELoadingCommon();
                    IsTbOK(trnKy, "save");
                    clearfunction();
                    SetTrnHdrApr_LatestState(trnKy, FormGlblData.TrnTypKy, "TrnHdr");
                    if (action == "save") {
                        GetpaymentHdrDetail(trnKy);
                        CdmsIsCd13();

                    }

                } else if (action == "Update") {
                    CLOSELoadingCommon();
                    IsTbOK(trnKy, "Update");
                    clearfunction();
                    SetTrnHdrApr_LatestState(trnKy, FormGlblData.TrnTypKy, "TrnHdr");
                    //ClearHdrDetails();
                    //ClearGriddetails();
                    //$(document).ready();
                    OpenFormByObjNm("ObjNm");
                    console.log(CdmsIsCd13());
                    CdmsIsCd13();
                    GetpaymentHdrDetail(trnKy);

                }
            } else {
                CLOSELoadingCommon();
                alert("Please Try Again");

            }

        },
        error: function (e) {
            return false;
        }
    });
}

function ClearAccountCombo() {
    $("#HdrSec4_CmbDtlAcc_Cd").data("kendoComboBox").value("");
    //$("#HdrSec4_CmbDtlAcc_Nm").data("kendoComboBox").value("");
    $("#HdrSec4_CmbDtlAdr_Cd").data("kendoComboBox").value("");
    //$("#HdrSec4_CmbDtlAdr_Nm").data("kendoComboBox").value("");
    $("#HdrSec2_CmbHdrAcc_Cd").data("kendoComboBox").value("");
    //$("#HdrSec2_CmbHdrAcc_Nm").data("kendoComboBox").value("");
    $("#HdrSec2_CmbHdrAdr_Cd").data("kendoComboBox").value("");
    //$("#HdrSec2_CmbHdrAdr_Nm").data("kendoComboBox").value("");

}


$(document.body)
    .keydown(function (e) {
        if (e.ctrlKey && e.keyCode == 70) {
            e.preventDefault();
            try {
                $("#FindFormGrid").data("kendoGrid").dataSource.filter(null);
                $("#FindFormGrid").data("kendoGrid").dataSource.data([]);
            } catch (e) {

            }

            $("#FindFormPayment")
                .show()
                .kendoWindow({
                    width: "80%",
                    height: "75%",
                    modal: true,
                    title: "Find Form"
                });

            $("#FindFormPayment").data("kendoWindow").center().open();

            //ALT + ENTER 
            if (e.altKey && e.keyCode == 13) {
                var FocusedElement = document.activeElement.id;
                if (FocusedElement == "HdrSec7_InptDesc_Val" || FocusedElement == "HdrSec7_InptRemark_Val") {
                    var textarea = document.getElementById(FocusedElement);
                    textarea.value += "\n";
                }
                e.preventDefault();
            }
        }
    });


function UpdatePaymentHedder() {

    var HdrSec1_InptVouNo_Val = document.getElementById("HdrSec1_InptVouNo_Val").value;
    var HdrSec1_DatVouDate_Val = document.getElementById("HdrSec1_DatVouDate_Val").value;
    var HdrSec1_InptDocNo_Val = document.getElementById("HdrSec1_InptDocNo_Val").value;
    var HdrSec2_InptYrref_Val = document.getElementById("HdrSec1_InptYurRef_Val").value;
    var TrnKy = FormGlblData.TrnKy;
    var TimeStmp = FormGlblData.TimeStamp;
    var cmbCrnKy = $("#HdrSec3_CmbTrnCurrncy_Cd").data("kendoComboBox").value();
    if (!cmbCrnKy || cmbCrnKy == "") {
        cmbCrnKy = 1;
    }
    var HdrSec2_DatYrRefDate_Val = document.getElementById("HdrSec1_DatVouRefDate_Val").value;
    var HdrSec2_InptExRate_Val = document.getElementById("HdrSec3_InptTrnExRate_Val").value;

    var PrjKy = $("#HdrSec2_CmbPrj_Cd").data("kendoComboBox").value();
    if (!PrjKy || PrjKy == "") {
        PrjKy = 1;
    }
    var BUKy = $("#HdrSec2_CmbBU_Cd").data("kendoComboBox").value();
    if (!BUKy || BUKy == "") {
        BUKy = 1;
    }
    if ($("#HdrSec2_Chkbox_multi_Val").is(":checked")) {
        MultiCredit = 1;
    } else {
        MultiCredit = 0;
    }
    var rem = $("#HdrSec7_InptRemark_Val").val();
    var des = $("#HdrSec7_InptDesc_Val").val();
    $.ajax({
        url: urlUpdateHdr,
        data: JSON.stringify({
            TrnKy: TrnKy,
            isRecur: 0,
            VouDate: HdrSec1_DatVouDate_Val,
            DocNo: HdrSec1_InptDocNo_Val,
            UrRef: HdrSec2_InptYrref_Val,
            cmbCrnKy: cmbCrnKy,
            Yourref_Date: HdrSec2_DatYrRefDate_Val,
            ExRateHrd: HdrSec2_InptExRate_Val,
            PrjKy: PrjKy,
            BUKy: BUKy,
            OurCd: OurCode,
            VauNo: HdrSec1_InptVouNo_Val,
            TimeStamp: TimeStmp,
            MultiCredit: MultiCredit,
            rem: rem,
            des: des,
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "Json",
        type: "POST",
        success: function (data) {
            var trnKy = data;
            InsertGrid(trnKy, HdrSec1_DatVouDate_Val, "Update", "1", "1", cmbCrnKy);
            //InsertGrid(trnKy, HdrSec1_DatVouDate_Val, "Update");
        },
        error: function (e) {
            return false;
        }
    });

}

$("#HdrSec5_InptChqNO_Val").keydown(function (e) {

    // Allow: backspace, delete, tab, escape, enter and .
    if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
        // Allow: Ctrl+A
        (e.keyCode == 65 && e.ctrlKey === true) ||
        // Allow: Ctrl+C
        (e.keyCode == 67 && e.ctrlKey === true) ||
        // Allow: Ctrl+X
        (e.keyCode == 88 && e.ctrlKey === true) ||
        // Allow: home, end, left, right
        (e.keyCode >= 35 && e.keyCode <= 39)) {
        // let it happen, don't do anything
        return;
    }
    // Ensure that it is a number and stop the keypress
    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
        e.preventDefault();
    }
});


$("#HdrSec11_Chkbox_isAccPaye_Val").change(function () {
    var isAccPaye;
    if ($("#HdrSec11_Chkbox_isAccPaye_Val").is(":checked")) {
        isAccPaye = 1;
    } else {
        isAccPaye = 0;
    }
    if (isAccPaye == 1) {
        $("#HdrSec12_Chkbox_isCash_Val").prop("checked", false);
    }

});

$("#HdrSec12_Chkbox_isCash_Val").change(function () {
    var isCash_Val;
    if ($("#HdrSec12_Chkbox_isCash_Val").is(":checked")) {
        isCash_Val = 1;
    } else {
        isCash_Val = 0;
    }
    if (isCash_Val == 1) {
        $("#HdrSec11_Chkbox_isAccPaye_Val").prop("checked", false);
        // $("#HdrSec15_Chkbox_isCross_Val").prop("checked", false);

    }
    var NonNegoChq = 0;
    if ($("#HdrSec11_ChkboxNagotiable_Val").is(":checked")) {
        NonNegoChq = 1;
    }
    if (NonNegoChq == 1) {
        $("#HdrSec11_ChkboxNagotiable_Val").prop("checked", false);
    }

});

$("#HdrSec11_ChkboxNagotiable_Val").change(function () {
    if ($(this).is(":checked")) {
        $("#HdrSec12_Chkbox_isCash_Val").prop("checked", false);
    }
});
$("#HdrSec15_Chkbox_isCross_Val").change(function () {
    if ($(this).is(":checked")) {
        //    $("#HdrSec12_Chkbox_isCash_Val").prop("checked", false);
        $("#HdrSec11_Chkbox_isAccPaye_Val").prop("checked", false);

    }
});

function CdmsIsCd13() {
    var OurCode = viewBag.OurCd;
    var TrnTyp = "TrnTyp";
    var objKy = viewBag.ObjKy;
    $.ajax({
        url: urlIsCd13Chek,
        data: JSON.stringify({
            OurCode: OurCode,
            TrnTyp: TrnTyp,
            objKy: objKy
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "Json",
        type: "POST",
        success: function (data) {
            console.log(data);
            if (data == true) {
                //Accually i dont like this method to Popup Set off form this way
                //  var Host = document.location.host;
                //var url = "http://" + Host + "/DevBL10/" + 'SetOff' + "/" + 'Index' + "?ObjCaptn=" + 'Set-offs' + "&OurCd=" + '' + "&OurCd2=" + '' + "&ObjKy=" + 82470 ;
                //window.open(url, '_self');

                //OpenFormByObjNm('Set-offs');
                LoadSetOffForm("Set-offs");
            } else {
                return false;
            }
        },
        error: function (e) {
            return false;
        }
    });
}

function DirectPrintSource() {

    formOrdKy = FormGlblData.TrnKy;
    var formObjCaption = viewBag.ObjCaptn;
    var formObjKy = viewBag.ObjKy;

    if (Number(formOrdKy) > 11) {
        // Calling from "<script src="~/Scripts/HtnScripts/Report/SourceDocumentPrint.js"></script>"
        DirectPrintSourceCommon(formOrdKy, formObjCaption, formObjKy, "1");
    } else {
        alert("Select the record.");
    }
}


function onMaDateChange(e) {
    var val = $("#HdrSec7_DatMADate_Val").val();
    if (val == null || val == undefined || val == "") {
        alert("Please Fill the Date");
        return;
    }
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

    if (ActualDate < minVal) {
        dt.value(dt.min());
    } else if (ActualDate > maxVal) {
        dt.value(dt.max());
    } else {
        dt.value(value);
    }
}

$("#HdrSec7_DatMADate_Val").keydown(function (event) {
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode == "13") {
        var Current_Val = $("#HdrSec7_DatMADate_Val").val();
        $("#HdrSec7_DatMADate_Val").val(CheckDateforAutoMonthYear(Current_Val));
        event.preventDefault();
        $("#HdrSec15_InptDetDocNo_Val").focus();
    }
});

function SetTrnDate() {
    if (FormGlblData.ISNeworUpdateTranction == 1) {

        $("#HdrSec1_DatVouDate_Val").kendoDatePicker({
            format: "dd/MM/yyyy",
            parseFormats: ["dd/MM/yyyy"],
            min: new Date(CdMasModel.TrnMinDate),
            max: new Date(CdMasModel.TrnMaxDate),
            change: onDateChange
        });

    } else {
        $("#HdrSec1_DatVouDate_Val").kendoDatePicker({
            format: "dd/MM/yyyy",
            parseFormats: ["dd/MM/yyyy"],
            //kendo.parseDate("2000/12/22", "yyyy/MM/dd");
        });

    }
}

function onDateChange(e) {
    var val = $("#HdrSec1_DatVouDate_Val").val();
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

    if (ActualDate < minVal) {
        dt.value(dt.min());
    } else if (ActualDate > maxVal) {
        dt.value(dt.max());
    } else {
        dt.value(value);
    }
}

function BackDateFutureDateLock(DateVal) {
    var dt = ("#" + DateVal);
    var TrnDateToUpdate = FormGlblData.FromFindDate;
    var TrnDateTemp = TrnDateToUpdate.match(/\d+/g),
        TrnDday = TrnDateTemp[0].substring(), // get only two digits
        TrnDmonth = TrnDateTemp[1],
        TrnDyear = TrnDateTemp[2];

    var MindatePart = CdMasModel.TrnMinDate.match(/\d+/g),
        Minyear = MindatePart[0].substring(), // get only two digits
        Minmonth = MindatePart[1],
        Minday = MindatePart[2];
    //  var MinDt = Minday + '/' + Minmonth + '/' + Minyear;

    var MaxdatePart = CdMasModel.TrnMaxDate.match(/\d+/g),
        Maxyear = MaxdatePart[0].substring(), // get only two digits
        Maxmonth = MaxdatePart[1],
        Maxday = MaxdatePart[2];
    //   var MaxDt = Maxday + '/' + Maxmonth + '/' + Maxyear;

    var TrnDateToUpdate = new Date(TrnDyear, TrnDmonth - 1, TrnDday, 0, 00, 00);
    var MinDt = new Date(Minyear, Minmonth - 1, Minday, 0, 00, 00);
    var MaxDt = new Date(Maxyear, Maxmonth - 1, Maxday, 0, 00, 00);

    if (TrnDateToUpdate < MinDt || TrnDateToUpdate > MaxDt) {
        FormGlblData.isAllowSaveByBackDate = 0;
    }
    //else if (TrnDateToUpdate > MaxDt) {
    //    alert("Transaction for future Date not Allowed!");
    //}
}


function LoadSetOffForm(ObjNm) {

    $.ajax({
        url: urlAutoCompleteGoToMenu,
        data: JSON.stringify({
            SearchQuery: $("#AutoCompleteGoToMenu").val(),
            ColNm: "ObjNm"

        }),
        contentType: "application/json; charset=utf-8",
        dataType: "Json",
        type: "POST",
        success: function (data) {
            for (var i = 0; i < data.length; i++) {
                if (data[i].ObjCaptn == ObjNm) { //'Set-offs'
                    OpenMenuByItem(data[i], 0, 1);
                }
            }

        },
        error: function (e) {
            return false;
        }
    });

}

function IsTbOK(TrnKy, Status) {
    $.ajax({
        url: urlIsTbOK,
        data: JSON.stringify({
            ObjKy: viewBag.ObjKy,//$("#AutoCompleteGoToMenu").val(),
            TrnKy: TrnKy

        }),
        contentType: "application/json; charset=utf-8",
        dataType: "Json",
        type: "POST",
        success: function (data) {
            if (data.isSuccess) {
                if (Status == "Update") {
                    alert("Update Successfully" + "\n" + data.TrnInfo + "\n" + data.Msg + "\n");
                } else {
                    alert("Save Successfully" + "\n" + data.TrnInfo + "\n" + data.Msg + "\n");
                }
            } else {
                alert("Please Rechek Your Transaction" + "\n" + data.TrnInfo + "\n" + data.Msg + "\n Total Numbers of lines" + data.LiNo + "\n");
               
            }

        },
        error: function (e) {
            return false;
        }
    });
}

function GetTheDuplicateFillOnOROff(ObjNm) {
    var retunobjData = 0;
    for (var objData = FormGlblData.FormObjData, c = 0; c < objData.length; c++)
    {
        if (objData[c].ObjNm == ObjNm) {
            retunobjData = objData[c].DuplicateFill;
        }
       
    }
    return retunobjData;         
}
function GetTheContraAutoFillOnOROff(ObjNm) {
    var retunobjData = 0;
    for (var objData = FormGlblData.FormObjData, c = 0; c < objData.length; c++) {
        if (objData[c].ObjNm == ObjNm) {
            retunobjData = objData[c].ContraAutoFill;
        }

    }
    return retunobjData;
}

function AfterCheqNumberValidation(action) {
    if (action == "save" || action == "saveandnew") {

        if (FormGlblData.isAlwAdd == 0) {
            alert("Warning: You Don't Have Permission To Insert.");
            CLOSELoadingCommon();
            return;
        }
        var validationMsg = Save_FinalValidation();
        if (validationMsg.length > 1) {
            alert(validationMsg);
            return;
        }
        var grid = $("#PmtRcprGrd").data("kendoGrid");
        var dataSource = grid.dataSource;
        //records on current data / page   
        var recordsOnCurrentView = dataSource.data().length;
        //total records
        var totalRecords = dataSource.total();
        if (totalRecords < 2) {
            alert("Please Enter At least two Records");
            return;
        }

        var TrnKy = FormGlblData.TrnKy;
        var hdnIsRecState = FormGlblData.IsRecState;

        var IsRec_Val;
        if ($("#HdrSec2_Chkbox_IsRec_Val").is(":checked")) {
            IsRec_Val = 1;
        } else {
            IsRec_Val = 0;
        }
        var ChkIsRecUpdtOrSave;
        if (hdnIsRecState == IsRec_Val) {
            //if hidden Field IsRecValue and ChkBox Is Rec Val is Eqal then it have to update 
            ChkIsRecUpdtOrSave = 1;
        } else {
            //if hidden Field IsRecValue and ChkBox Is Rec Val is different then it have to treat as a new record 
            ChkIsRecUpdtOrSave = 0;
        }

        if (TrnKy > 0 && ChkIsRecUpdtOrSave == 1) {
            var result = confirm("Do you want to Update the record?");
            if (result == true) {
                if (FormGlblData.isAlwUpdate == 0) {
                    alert("Warning: You Don't Have Permission To Update.");
                    CLOSELoadingCommon();
                    return;
                }
                OPENLodingCommon("Updating ... !");
                UpdatePaymentHedder();
            }

        } else {
            OPENLodingCommon("Saving ... !");
            SaveHedder(action);
        }


    }
    else if (action == "Update") {



        if (FormGlblData.isAlwUpdate == 0) {
            alert("Warning: You Don't Have Permission To Update.");
            CLOSELoadingCommon();
            return;
        }
        var TrnKy = FormGlblData.TrnKy;

        if (TrnKy) {
            OPENLodingCommon("Updating ... !");
            UpdatePaymentHedder();
        } else {

            alert("Plase Selelect a Transaction First");
        }

    }
}