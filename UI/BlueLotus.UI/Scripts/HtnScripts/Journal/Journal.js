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
    TrnKy: -1,
    AllDefalutValueObj: null,
    TimeStamp: "",
    IsRecState: -1,
    ISNeworUpdateTranction: 1,
    isAllowSaveByBackDate: 1,
    FromFindDate: todayDate,
    isAlwAcs: null,
    isAlwAdd: null,
    isAlwUpdate: null,
    isAlwDel: null,
    isAlwApr: null,
    FormGridArray: [],
    FindFormGridArray: []
}

var CdMasModel = {
    IsTrnRateInclusiveTaxTyp1_VAT: 0,    // IsTrnRateInclusiveTaxTyp1_VAT : isCd27
    TrnMinDate: "", // Back date Transaction Purpose
    TrnMaxDate: ""  // Future Date Transaction Purpose
}

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
        success: function (CdMasModelData) {
            CdMasModel.IsTrnRateInclusiveTaxTyp1_VAT = CdMasModelData.isCd27;
            CdMasModel.TrnMinDate = CdMasModelData.TrnMinDate;
            CdMasModel.TrnMaxDate = CdMasModelData.TrnMaxDate;

            GetFormObjData();
            //Button_From_Dynamic('ButtonSec1');
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
//

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

            //New ObjMas Function 
            HideTheProperty(FormGlblData.FormObjData);

            //FormGlblData.AllDefalutValueObj = Get_AllDefalutValue_Obj();
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
    var OurCode = "@(ViewBag.ObjCaptn)";
    LoadDropDown();
    //Load the tooltip //COmmo srcipt
    Tooltip();
    //Selecting the text//COmmo srcipt
    SelectText();
    //add savebutton
    LoadDatePicker();
    var todayDate = new Date();
    $("#HdrSec1_DatVouDate_Val").data("kendoDatePicker").value(todayDate);
    $("#HdrSec2_DatYrRefDate_Val").data("kendoDatePicker").value(todayDate);
    $("#HdrSec1_DatVouDate_Val").data("kendoDatePicker").trigger("change");

    SetTrnDate();
    // LoadJournalGrid();
    //GridDoubleClick();
    SelectHomeCurey();
    //old ObjMas
    //setTimeout(setHdrSectionPropFun, 2000);
    GridDefaultColumns();
    setTimeout(function () {
        CLOSELoadingForm();
        CheckUserPermission();
    }, 1000);
    //New ObjMas Function For EnterEvent And Set DefaultValue 
    NextEnterKyEvent(FormGlblData.FormObjData);
    FormGlblData.AllDefalutValueObj = Get_AllDefalutValue_Obj();
    Set_AllDefalutValue_Obj();
    
};

function setHdrSectionPropFun() {

    // ---------- Set ObjProperties
    setHdrSectionProp("", viewBag.ObjKy, "", "HdrSec1");
    setHdrSectionProp("", viewBag.ObjKy, "", "HdrSec2");
    setHdrSectionProp("", viewBag.ObjKy, "", "HdrSec3");
    setHdrSectionProp("", viewBag.ObjKy, "", "HdrSec4");
    setHdrSectionProp("", viewBag.ObjKy, "", "HdrSec5");
    setHdrSectionProp("", viewBag.ObjKy, "", "HdrSec6");
    setHdrSectionProp("", viewBag.ObjKy, "", "HdrSec7");
    setHdrSectionProp("", viewBag.ObjKy, "", "HdrSec8");
    setHdrSectionProp("", viewBag.ObjKy, "", "HdrSec9");
    setHdrSectionProp("", viewBag.ObjKy, "", "HdrSec10");
    SetHandlingEnterKeyEvent('', viewBag.ObjKy);
    SetFirstFocusObj();
    // $("#HdrSec1_InptDocNo_Val").focus();
}

//calander vaucherDate
function LoadDatePicker() {
    $("#HdrSec1_DatVouDate_Val")
        .kendoDatePicker({
            format: "dd/MM/yyyy",
            min: new Date(31, 2, 2009),
            change: function () {
                var value = this.value();
                $("#HdrSec6_MADate_Cd").data("kendoDatePicker").value(value);

            }
        });
    $("#HdrSec2_DatYrRefDate_Val")
        .kendoDatePicker({
            format: "dd/MM/yyyy",
            min: new Date(31, 2, 2009)
        });
    $("#HdrSec6_MADate_Cd")
        .kendoDatePicker({
            format: "dd/MM/yyyy",
            min: new Date(31, 2, 2009),
            change: onMaDateChange
        });

    $("#currency")
        .kendoNumericTextBox({
            decimals: 3
        });

    $("#HdrSec5_NmricCrAmt_Val")
        .kendoNumericTextBox({
            decimals: 3,
            spinners: false,
            min: 0,
            change: function () {

                $("#HdrSec5_NmricDrAmt_Val").data("kendoNumericTextBox").value("");
            }
        });
    $("#HdrSec5_NmricDrAmt_Val")
        .kendoNumericTextBox({
            decimals: 3,
            spinners: false,
            min: 0,
            change: function () {
                $("#HdrSec5_NmricCrAmt_Val").data("kendoNumericTextBox").value("");
            }
        });

    $(".k-datepicker, .k-combobox, .k-numerictextbox,.k-input").css("width", "100%");
    //$("#HdrSec4_CmbAcc_Cd").parent().css("width", "40%");
    //$("#HdrSec4_CmbAcc_Nm").parent().css("width", "57%");
    //$("#HdrSec4_CmbPrj_Cd").parent().css("width", "40%");
    //$("#HdrSec4_CmbPrj_Nm").parent().css("width", "50%");
    //$("#HdrSec4_CmbBU_Cd").parent().css("width", "40%");
    //$("#HdrSec4_CmbBU_Nm").parent().css("width", "50%");
    //$("#HdrSec4_CmbTask_Cd").parent().css("width", "40%");
    //$("#HdrSec4_CmbTask_Nm").parent().css("width", "50%");
    ////$("#Anl2Nm").parent().css("width", "89.5%");
    //$("#HdrSec5_CmbAdress_Cd").parent().css("width", "89.5%");
    //$("#HdrSec7_CmbAnl1_Cd").parent().css("width", "40%");
    //$("#HdrSec7_CmbAnl1_Nm").parent().css("width", "50%");
    //$("#HdrSec7_CmbAnl2_Cd").parent().css("width", "40%");
    //$("#HdrSec7_CmbAnl2_Nm").parent().css("width", "50%");
    //$("#HdrSec8_CmbAnl3_Cd").parent().css("width", "40%");
    //$("#HdrSec8_CmbAnl3_Nm").parent().css("width", "50%");
    //$("#HdrSec8_CmbAnl4_Cd").parent().css("width", "40%");
    //$("#HdrSec8_CmbAnl4_Nm").parent().css("width", "50%");
    //$("#HdrSec9_CmbAnl5_Cd").parent().css("width", "40%");
    //$("#HdrSec9_CmbAnl5_Nm").parent().css("width", "50%");
    //$("#HdrSec9_CmbAnl6_Cd").parent().css("width", "40%");
    //$("#HdrSec9_CmbAnl6_Nm").parent().css("width", "50%");
    //$("#HdrSec5_CmbLC_Cd").parent().css("width", "89.5%");
    //$("#HdrSec5_CmbLoan_Cd").parent().css("width", "89.5%");
    //$("#HdrSec5_CmbOrderDet_Cd").parent().css("width", "89.5%");

    //$("#HdrSec6_MADate_Cd").css("height", "100%");
    // ComboKeyPress();

}


//Load The Drop DownList
function LoadDropDown() {

    //Curency Dropdown
    $("#HdrSec2_CmbCurency_Cd")
        .kendoComboBox({
            dataValueField: "CdKy",
            dataTextField: "Code",
            dataSource: CurrencyCode("HdrSec2_CmbCurency"),
            change: function (e) {
                var cmb = $("#HdrSec2_CmbCurency_Cd").data("kendoComboBox");
                var Crnky = cmb.value();
                if (Crnky != "") {
                    var validate = ComboValidations("HdrSec2_CmbCurency_Cd");
                    if (validate) {
                        GetHdrExRate(Crnky);
                    } else {
                        $("#HdrSec2_CmbCurency_Cd").data("kendoComboBox").value("");
                    }
                }
            },
            filter: "startswith",
            suggest: true,
            placeholder: "Select a Curency"
        });

    //Curency Code Drop Bottom
    $("#HdrSec6_CmbAccCur_Cd")
        .kendoComboBox({
            dataValueField: "CdKy",
            dataTextField: "Code",
            dataSource: AccCurrencyCode("HdrSec6_CmbAccCur"),
            change: function (e) {
                var cmb = $("#HdrSec6_CmbAccCur_Cd").data("kendoComboBox");
                var Crnky = cmb.value();
                if (Crnky != "") {
                    var validate = ComboValidations("HdrSec6_CmbAccCur_Cd");
                    if (validate) {
                        SelectHomeCurey();
                    } else {
                        $("#HdrSec6_CmbAccCur_Cd").data("kendoComboBox").value("");
                    }
                }
            },
            filter: "startswith",
            suggest: true,
            placeholder: "Select a Curency"
        });

    //Accounts Code Drop Bottom
    $("#HdrSec4_CmbAcc_Cd")
        .kendoComboBox({
            dataValueField: "AccKy",
            dataTextField: "AccCd",
            dataSource: AccDoropCode("HdrSec4_CmbAcc"),
            change: function (e) {
                var cmb = $("#HdrSec4_CmbAcc_Cd").data("kendoComboBox");
                var AkkKy = cmb.value();
                if (AkkKy != "") {
                    var validate = ComboValidations("HdrSec4_CmbAcc_Cd");
                    if (validate) {
                        //$("#HdrSec4_CmbAcc_Nm").data("kendoComboBox").value(AkkKy);
                        GetJournalDetailByAccKy(AkkKy);
                    } else {
                        $("#HdrSec4_CmbAcc_Cd").data("kendoComboBox").value("");
                    }
                }
            },
            filter: "contains",
            suggest: true,
            placeholder: "Select an Account"
        });
    //Accounts Name Drop Bottom
    //$("#HdrSec4_CmbAcc_Nm")
    //    .kendoComboBox({
    //        dataValueField: "AccKy",
    //        dataTextField: "AccNM",
    //        dataSource: AccDoropName("HdrSec4_CmbAcc"),
    //        change: function (e) {
    //            var cmb = $("#HdrSec4_CmbAcc_Nm").data("kendoComboBox");
    //            var AkkKy = cmb.value();
    //            if (AkkKy != "") {
    //                var validate = ComboValidations("HdrSec4_CmbAcc_Nm");
    //                if (validate) {
    //                    $("#HdrSec4_CmbAcc_Cd").data("kendoComboBox").value(AkkKy);
    //                    GetJournalDetailByAccKy(AkkKy);
    //                } else {
    //                    $("#HdrSec4_CmbAcc_Nm").data("kendoComboBox").value("");
    //                }
    //            }
    //        },
    //        filter: "startswith",
    //        suggest: true,
    //        placeholder: "Select an Account"
    //    });

    //Project Code Drop Bottom
    $("#HdrSec4_CmbPrj_Cd")
        .kendoComboBox({
            dataValueField: "PrjKy",
            dataTextField: "PrjId",
            dataSource: ProjectCd("HdrSec4_CmbPrj"),
            change: function (e) {
                var cmb = $("#HdrSec4_CmbPrj_Cd").data("kendoComboBox");
                var PrjKy = cmb.value();
                if (PrjKy != "") {
                    var validate = ComboValidations("HdrSec4_CmbPrj_Cd");
                    if (validate) {
                        //$("#HdrSec4_CmbPrj_Nm").data("kendoComboBox").value(PrjKy);
                        TaskCombo2nd();
                    } else {
                        $("#HdrSec4_CmbPrj_Cd").data("kendoComboBox").value("");
                    }
                }

            },
            filter: "contains",
            suggest: true,
            placeholder: "Select a Project"
        });
    //Project Name Drop Bottom
    //$("#HdrSec4_CmbPrj_Nm")
    //    .kendoComboBox({
    //        dataValueField: "PrjKy",
    //        dataTextField: "PrjNm",
    //        dataSource: ProjectNm("HdrSec4_CmbPrj"),
    //        change: function (e) {
    //            var cmb = $("#HdrSec4_CmbPrj_Nm").data("kendoComboBox");
    //            var PrjKy = cmb.value();
    //            if (PrjKy != "") {
    //                var validate = ComboValidations("HdrSec4_CmbPrj_Nm");
    //                if (validate) {
    //                    $("#HdrSec4_CmbPrj_Cd").data("kendoComboBox").value(PrjKy);
    //                    TaskCombo2nd();
    //                } else {
    //                    $("#HdrSec4_CmbPrj_Nm").data("kendoComboBox").value("");
    //                }
    //            }
    //        },
    //        filter: "startswith",
    //        suggest: true,
    //        placeholder: "Select an Project"
    //    });

    //BU Code Drop Bottom
    $("#HdrSec4_CmbBU_Cd")
        .kendoComboBox({
            dataValueField: "CdKy",
            dataTextField: "Code",
            dataSource: BUCode("HdrSec4_CmbBU"),
            change: function (e) {
                var cmb = $("#HdrSec4_CmbBU_Cd").data("kendoComboBox");
                var BUKy = cmb.value();
                if (BUKy != "") {
                    var validate = ComboValidations("HdrSec4_CmbBU_Cd");
                    if (validate) {
                        //$("#HdrSec4_CmbBU_Nm").data("kendoComboBox").value(BUKy);
                    } else {
                        $("#HdrSec4_CmbBU_Cd").data("kendoComboBox").value("");
                    }
                }

            },
            filter: "contains",
            suggest: true,
            placeholder: "Select a BU"
        });
    //BU Name Drop Bottom
    //$("#HdrSec4_CmbBU_Nm")
    //    .kendoComboBox({
    //        dataValueField: "CdKy",
    //        dataTextField: "Name",
    //        dataSource: BUName("HdrSec4_CmbBU"),
    //        change: function (e) {
    //            var cmb = $("#HdrSec4_CmbBU_Nm").data("kendoComboBox");
    //            var BUKy = cmb.value();
    //            if (BUKy != "") {
    //                var validate = ComboValidations("HdrSec4_CmbBU_Nm");
    //                if (validate) {
    //                    $("#HdrSec4_CmbBU_Cd").data("kendoComboBox").value(BUKy);
    //                } else {
    //                    $("#HdrSec4_CmbBU_Nm").data("kendoComboBox").value("");
    //                }
    //            }
    //        },
    //        filter: "startswith",
    //        suggest: true,
    //        placeholder: "Select an BU"
    //    });

    //Task Code Drop Bottom
    $("#HdrSec4_CmbTask_Cd")
        .kendoComboBox({
            dataValueField: "PrsDetKy",
            dataTextField: "PrsDetCode",
            dataSource: urlGetTaskCodeJrnl("HdrSec4_CmbTask"),
            change: function (e) {
                var cmb = $("#HdrSec4_CmbTask_Cd").data("kendoComboBox");
                var PrDetKy = cmb.value();
                if (PrDetKy != "") {
                    var validate = ComboValidations("HdrSec4_CmbTask_Cd");
                    if (validate) {
                        $("#HdrSec4_CmbTask_Nm").data("kendoComboBox").value(PrDetKy);
                    } else {
                        $("#HdrSec4_CmbTask_Cd").data("kendoComboBox").value("");
                    }
                }
            },
            filter: "contains",
            suggest: true,
            placeholder: "Select a Task"
        });

    //Task Name Drop Bottom
    $("#HdrSec4_CmbTask_Nm")
        .kendoComboBox({
            dataValueField: "PrsDetKy",
            dataTextField: "PrsDetNM",
            dataSource: urlGetTaskNmJrnl("HdrSec4_CmbTask"),
            change: function (e) {
                var cmb = $("#HdrSec4_CmbTask_Nm").data("kendoComboBox");
                var PrDetKy = cmb.value();
                if (PrDetKy != "") {
                    var validate = ComboValidations("HdrSec4_CmbTask_Nm");
                    if (validate) {
                        $("#HdrSec4_CmbTask_Cd").data("kendoComboBox").value(PrDetKy);
                    } else {
                        $("#HdrSec4_CmbTask_Nm").data("kendoComboBox").value("");
                    }
                }
            },
            filter: "startswith",
            suggest: true,
            placeholder: "Select an Task"
        });

    //Address Name Drop Bottom
    $("#HdrSec5_CmbAdress_Cd")
        .kendoComboBox({
            dataValueField: "AdrKy",
            dataTextField: "AdrNM",
            dataSource: AddressName("HdrSec5_CmbAdress"),
            change: function (e) {
                var cmb = $("#HdrSec5_CmbAdress_Cd").data("kendoComboBox");
                var AdrKy = cmb.value();
                if (AdrKy != "") {
                    var validate = ComboValidations("HdrSec5_CmbAdress_Cd");
                    if (!validate) {
                        $("#HdrSec5_CmbAdress_Cd").data("kendoComboBox").value("");
                    }
                }
            },
            filter: "contains",
            suggest: true,
            placeholder: "Select an Address"
        });

    //Newly Added

    //LC1 
    $("#HdrSec5_CmbLC_Cd")
        .kendoComboBox({
            dataValueField: "CdKy",
            dataTextField: "Code",
            dataSource: CmbLC_Cd("HdrSec5_CmbLC"), ///LC_CD("HdrSec5_CmbLC"),
            change: function (e) {
                var cmb = $("#HdrSec5_CmbLC_Cd").data("kendoComboBox");
                var LoanKy = cmb.value();
                if (LoanKy != "") {
                    var validate = ComboValidations("HdrSec5_CmbLC_Cd");
                    if (!validate) {
                        $("#HdrSec5_CmbLC_Cd").data("kendoComboBox").value("");
                    }
                }
            },
            filter: "startswith",
            suggest: true,
            placeholder: "Select a LC"
        });

    //HdrSec5_CmbLoan_Cd Code Drop Bottom
    $("#HdrSec5_CmbLoan_Cd")
        .kendoComboBox({
            dataValueField: "CdKy",
            dataTextField: "Code",
            dataSource: CmbLoan_Cd("HdrSec5_CmbLoan"),// HdrSec5_CmbLoan_Cd(),
            change: function (e) {
                var cmb = $("#HdrSec5_CmbLoan_Cd").data("kendoComboBox");
                var LoanKy = cmb.value();
                if (LoanKy != "") {
                    var validate = ComboValidations("HdrSec5_CmbLoan_Cd");
                    if (!validate) {
                        $("#HdrSec5_CmbLoan_Cd").data("kendoComboBox").value("");
                    }
                }
            },
            filter: "startswith",
            suggest: true,
            placeholder: "Select a Loan"
        });

    //Order No
    //HdrSec6_CmbOrder_Cd Code Drop Bottom
    $("#HdrSec6_CmbOrderNO_Cd")
        .kendoComboBox({
            dataValueField: "OrdrKy",
            dataTextField: "OrdrCode",
            dataSource: GetOrderCode("HdrSec6_CmbOrderNO"),
            change: function (e) {
                var cmb = $("#HdrSec6_CmbOrderNO_Cd").data("kendoComboBox");
                var OrdrKy = cmb.value();
                if (OrdrKy != "") {
                    var validate = ComboValidations("HdrSec6_CmbOrderNO_Cd");
                    if (!validate) {
                        $("#HdrSec6_CmbOrderNO_Cd").data("kendoComboBox").value("");
                    }
                }

            },
            filter: "startswith",
            suggest: true,
            placeholder: "Select a Order"
        });

    //HdrSec5_CmbOrderDet_Cd Code Drop Bottom
    $("#HdrSec5_CmbOrderDet_Cd")
        .kendoComboBox({
            dataValueField: "OrdrKy",
            dataTextField: "OrdrCode",
            dataSource: GetOrderDetCode("HdrSec5_CmbOrderDet"),
            change: function (e) {
                var cmb = $("#HdrSec5_CmbOrderDet_Cd").data("kendoComboBox");
                var HdrSec5_CmbOrderDet_Cd = cmb.value();
                if (HdrSec5_CmbOrderDet_Cd != "") {
                    var validate = ComboValidations("HdrSec5_CmbOrderDet_Cd");
                    if (!validate) {
                        $("#HdrSec5_CmbOrderDet_Cd").data("kendoComboBox").value("");
                    }
                }

            },
            filter: "startswith",
            suggest: true,
            placeholder: "Select a OrdrDet"
        });

    $("#HdrSec6_CmbResAdr_Cd")
        .kendoComboBox({
            dataValueField: "AdrKy",
            dataTextField: "AdrCode",
            dataSource: AddressCode("HdrSec6_CmbResAdr"),
            change: function (e) {
                var cmb = $("#HdrSec6_CmbResAdr_Cd").data("kendoComboBox");
                var AdrKy = cmb.value();
                if (AdrKy != "") {
                    var validate = ComboValidations("HdrSec6_CmbResAdr_Cd");
                    if (!validate) {
                        $("#HdrSec6_CmbResAdr_Cd").data("kendoComboBox").value("");
                    }
                }
            },
            filter: "startswith",
            suggest: true,
            placeholder: "Select an Address"
        });

    //

    //1
    $("#HdrSec7_CmbAnl1_Nm")
        .kendoComboBox({
            dataValueField: "CdKy",
            dataTextField: "Name",
            dataSource: BUName("HdrSec7_CmbAnl1"),
            change: function (e) {
                var cmb = $("#HdrSec7_CmbAnl1_Nm").data("kendoComboBox");
                var Anlky = cmb.value();
                if (Anlky != "") {
                    var validate = ComboValidations("HdrSec7_CmbAnl1_Nm");
                    if (validate) {
                        $("#HdrSec7_CmbAnl1_Cd").data("kendoComboBox").value(Anlky);
                    } else {
                        $("#HdrSec7_CmbAnl1_Nm").data("kendoComboBox").value("");
                    }
                }
            },
            filter: "startswith",
            suggest: true,
            placeholder: "Select an Analysis 1"
        });

    $("#HdrSec7_CmbAnl1_Cd")
        .kendoComboBox({
            dataValueField: "CdKy",
            dataTextField: "Code",
            dataSource: BUCode("HdrSec7_CmbAnl1"),
            change: function (e) {
                var cmb = $("#HdrSec7_CmbAnl1_Cd").data("kendoComboBox");
                var Anlky = cmb.value();
                if (Anlky != "") {
                    var validate = ComboValidations("HdrSec7_CmbAnl1_Cd");
                    if (validate) {
                        $("#HdrSec7_CmbAnl1_Nm").data("kendoComboBox").value(Anlky);
                    } else {
                        $("#HdrSec7_CmbAnl1_Cd").data("kendoComboBox").value("");
                    }
                }
            },
            filter: "startswith",
            suggest: true,
            placeholder: "Select an Analysis 1"
        });

    //

    $("#HdrSec7_CmbAnl2_Nm")
        .kendoComboBox({
            dataValueField: "CdKy",
            dataTextField: "Name",
            dataSource: BUName("HdrSec7_CmbAnl2"),
            change: function (e) {
                var cmb = $("#HdrSec7_CmbAnl2_Nm").data("kendoComboBox");
                var Anlky = cmb.value();
                if (Anlky != "") {
                    var validate = ComboValidations("HdrSec7_CmbAnl2_Nm");
                    if (validate) {
                        $("#HdrSec7_CmbAnl2_Cd").data("kendoComboBox").value(Anlky);
                    } else {
                        $("#HdrSec7_CmbAnl2_Nm").data("kendoComboBox").value("");
                    }
                }
            },
            filter: "startswith",
            suggest: true,
            placeholder: "Select an Analysis 2"
        });

    $("#HdrSec7_CmbAnl2_Cd")
        .kendoComboBox({
            dataValueField: "CdKy",
            dataTextField: "Code",
            dataSource: BUCode("HdrSec7_CmbAnl2"),
            change: function (e) {
                var cmb = $("#HdrSec7_CmbAnl2_Cd").data("kendoComboBox");
                var Anlky = cmb.value();
                if (Anlky != "") {
                    var validate = ComboValidations("HdrSec7_CmbAnl2_Cd");
                    if (validate) {
                        $("#HdrSec7_CmbAnl2_Nm").data("kendoComboBox").value(Anlky);
                    } else {
                        $("#HdrSec7_CmbAnl2_Cd").data("kendoComboBox").value("");
                    }
                }
            },
            filter: "startswith",
            suggest: true,
            placeholder: "Select an Analysis 2"
        });
    //3
    $("#HdrSec8_CmbAnl3_Nm")
        .kendoComboBox({
            dataValueField: "CdKy",
            dataTextField: "Name",
            dataSource: BUName("HdrSec8_CmbAnl3"),
            change: function (e) {
                var cmb = $("#HdrSec8_CmbAnl3_Nm").data("kendoComboBox");
                var Anlky = cmb.value();
                if (Anlky != "") {
                    var validate = ComboValidations("HdrSec8_CmbAnl3_Nm");
                    if (validate) {
                        $("#HdrSec8_CmbAnl3_Cd").data("kendoComboBox").value(Anlky);
                    } else {
                        $("#HdrSec8_CmbAnl3_Nm").data("kendoComboBox").value("");
                    }
                }
            },
            filter: "startswith",
            suggest: true,
            placeholder: "Select an Analysis 3"
        });

    $("#HdrSec8_CmbAnl3_Cd")
        .kendoComboBox({
            dataValueField: "CdKy",
            dataTextField: "Code",
            dataSource: BUCode("HdrSec8_CmbAnl3"),
            change: function (e) {
                var cmb = $("#HdrSec8_CmbAnl3_Cd").data("kendoComboBox");
                var Anlky = cmb.value();
                if (Anlky != "") {
                    var validate = ComboValidations("HdrSec8_CmbAnl3_Cd");
                    if (validate) {
                        $("#HdrSec8_CmbAnl3_Nm").data("kendoComboBox").value(Anlky);
                    } else {
                        $("#HdrSec8_CmbAnl3_Cd").data("kendoComboBox").value("");
                    }
                }
            },
            filter: "startswith",
            suggest: true,
            placeholder: "Select an Analysis 3"
        });

    //
    //4
    $("#HdrSec8_CmbAnl4_Nm")
        .kendoComboBox({
            dataValueField: "CdKy",
            dataTextField: "Name",
            dataSource: BUName("HdrSec8_CmbAnl4"),
            change: function (e) {
                var cmb = $("#HdrSec8_CmbAnl4_Nm").data("kendoComboBox");
                var Anlky = cmb.value();
                if (Anlky != "") {
                    var validate = ComboValidations("HdrSec8_CmbAnl4_Nm");
                    if (validate) {
                        $("#HdrSec8_CmbAnl4_Cd").data("kendoComboBox").value(Anlky);
                    } else {
                        $("#HdrSec8_CmbAnl4_Nm").data("kendoComboBox").value("");
                    }
                }
            },
            filter: "startswith",
            suggest: true,
            placeholder: "Select an Analysis 4"
        });

    $("#HdrSec8_CmbAnl4_Cd")
        .kendoComboBox({
            dataValueField: "CdKy",
            dataTextField: "Code",
            dataSource: BUCode("HdrSec8_CmbAnl4"),
            change: function (e) {
                var cmb = $("#HdrSec8_CmbAnl4_Cd").data("kendoComboBox");
                var Anlky = cmb.value();
                if (Anlky != "") {
                    var validate = ComboValidations("HdrSec8_CmbAnl4_Cd");
                    if (validate) {
                        $("#HdrSec8_CmbAnl4_Nm").data("kendoComboBox").value(Anlky);
                    } else {
                        $("#HdrSec8_CmbAnl4_Cd").data("kendoComboBox").value("");
                    }
                }
            },
            filter: "startswith",
            suggest: true,
            placeholder: "Select an Analysis 4"
        });

    //
    //5
    $("#HdrSec9_CmbAnl5_Nm")
        .kendoComboBox({
            dataValueField: "CdKy",
            dataTextField: "Name",
            dataSource: BUName("HdrSec9_CmbAnl5"),
            change: function (e) {
                var cmb = $("#HdrSec9_CmbAnl5_Nm").data("kendoComboBox");
                var Anlky = cmb.value();
                if (Anlky != "") {
                    var validate = ComboValidations("HdrSec9_CmbAnl5_Nm");
                    if (validate) {
                        $("#HdrSec9_CmbAnl5_Cd").data("kendoComboBox").value(Anlky);
                    } else {
                        $("#HdrSec9_CmbAnl5_Nm").data("kendoComboBox").value("");
                    }
                }
            },
            filter: "startswith",
            suggest: true,
            placeholder: "Select an Analysis 5"
        });

    $("#HdrSec9_CmbAnl5_Cd")
        .kendoComboBox({
            dataValueField: "CdKy",
            dataTextField: "Code",
            dataSource: BUCode("HdrSec9_CmbAnl5"),
            change: function (e) {
                var cmb = $("#HdrSec9_CmbAnl5_Cd").data("kendoComboBox");
                var Anlky = cmb.value();
                if (Anlky != "") {
                    var validate = ComboValidations("HdrSec9_CmbAnl5_Cd");
                    if (validate) {
                        $("#HdrSec9_CmbAnl5_Nm").data("kendoComboBox").value(Anlky);
                    } else {
                        $("#HdrSec9_CmbAnl5_Cd").data("kendoComboBox").value("");
                    }
                }

            },
            filter: "startswith",
            suggest: true,
            placeholder: "Select an Analysis 5"
        });
    //
    //6
    $("#HdrSec9_CmbAnl6_Nm")
        .kendoComboBox({
            dataValueField: "CdKy",
            dataTextField: "Name",
            dataSource: BUName("HdrSec9_CmbAnl6"),
            change: function (e) {
                var cmb = $("#HdrSec9_CmbAnl6_Nm").data("kendoComboBox");
                var Anlky = cmb.value();
                if (Anlky != "") {
                    var validate = ComboValidations("HdrSec9_CmbAnl6_Nm");
                    if (validate) {
                        $("#HdrSec9_CmbAnl6_Cd").data("kendoComboBox").value(Anlky);
                    } else {
                        $("#HdrSec9_CmbAnl6_Nm").data("kendoComboBox").value("");
                    }
                }
            },
            filter: "startswith",
            suggest: true,
            placeholder: "Select an Analysis 6"
        });

    $("#HdrSec9_CmbAnl6_Cd")
        .kendoComboBox({
            dataValueField: "CdKy",
            dataTextField: "Code",
            dataSource: BUCode("HdrSec9_CmbAnl6"),
            change: function (e) {
                var cmb = $("#HdrSec9_CmbAnl6_Cd").data("kendoComboBox");
                var Anlky = cmb.value();
                if (Anlky != "") {
                    var validate = ComboValidations("HdrSec9_CmbAnl6_Cd");
                    if (validate) {
                        $("#HdrSec9_CmbAnl6_Nm").data("kendoComboBox").value(Anlky);
                    } else {
                        $("#HdrSec9_CmbAnl6_Cd").data("kendoComboBox").value("");
                    }
                }
            },
            filter: "startswith",
            suggest: true,
            placeholder: "Select an Analysis 6"
        });
    //

}
//Updated the combo validation funciton to validate user data by charith
function ComboValidations(cmbNm) {
    var cmb = $("#" + cmbNm + "").data("kendoComboBox");
    var dataItem = cmb.dataItem();
    if (!dataItem) {
        alert("'" + cmb.value() + "' is not a Valid input");
        $("#" + cmbNm + "").data("kendoComboBox").value("");
        return false;
    } else {

        return true;
    }
}


//function ComboValidations(cmbNm) {

//    var cmb = $("#" + cmbNm + "").data("kendoComboBox");
//    var val = cmb.value();
//    if (isNaN(val)) {
//        alert("'" + val + "' is not a Valid input");
//        $("#" + cmbNm + "").data("kendoComboBox").input.focus();
//        return false;
//    } else {
//        return true;
//    }
//}


function GetJournalDetailByAccKy(AccKy) {
    var datepicker = document.getElementById("HdrSec1_DatVouDate_Val").value;
    $.ajax({
        url: urlGetAllDetail,
        data: JSON.stringify({
            AccKy: AccKy,
            datepicker: datepicker,
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "Json",
        type: "POST",
        success: function (data) {
            for (i = 0; i < data.length; i++) {

                var AdrKy = data[0].AdrKy;
                var AdrID = data[0].AdrID;
                var AdrNm = data[0].AdrNm;
                var CurncyCd = data[0].CurncyCd;
                var CurncyKy = data[0].CurncyKy;
                var CurncyNm = data[0].CurncyNm;
                var Rate = data[0].Rate;

                $("#HdrSec6_CmbAccCur_Cd").data("kendoComboBox").value(CurncyKy);
                $("#HdrSec5_CmbAdress_Cd").data("kendoComboBox").value(AdrKy);
                $("#HdrSec6_InptAccEx_Cd").val(Rate);

            }

        },
        error: function (e) {
            return false;
        }
    });

}

function TaskCombo2nd() {

    $("#HdrSec4_CmbTask_Cd")
        .kendoComboBox({
            dataValueField: "PrcsDetKy",
            dataTextField: "TaskID",
            dataSource: urlGetTaskCodeJrnl("HdrSec4_CmbTask"),
            change: function (e) {
                var cmb = $("#HdrSec4_CmbTask_Cd").data("kendoComboBox");
                var PrDetKy = cmb.value();
                if (PrDetKy != "") {
                    var validate = ComboValidations("HdrSec4_CmbTask_Cd");
                    if (validate) {

                        $("#HdrSec4_CmbTask_Cd").data("kendoComboBox").value(PrDetKy);
                        //$("#HdrSec4_CmbTask_Nm").data("kendoComboBox").value(PrDetKy);

                    } else {

                        $("#HdrSec4_CmbTask_Cd").data("kendoComboBox").value("");
                        //$("#HdrSec4_CmbTask_Nm").data("kendoComboBox").value("");
                    }
                }

            },
            filter: "startswith",
            suggest: true,
            placeholder: "Select a Task"
        });
    //Task Name Drop Bottom
    $("#HdrSec4_CmbTask_Nm")
        .kendoComboBox({
            dataValueField: "PrsDetKy",
            dataTextField: "PrsDetNM",
            dataSource: urlGetTaskNmJrnl("HdrSec4_CmbTask"),
            change: function (e) {
                var cmb = $("#HdrSec4_CmbTask_Nm").data("kendoComboBox");
                var PrDetKy = cmb.value();
                if (PrDetKy != "") {
                    var validate = ComboValidations("HdrSec4_CmbTask_Nm");
                    if (validate) {

                        $("#HdrSec4_CmbTask_Cd").data("kendoComboBox").value(PrDetKy);
                        $("#HdrSec4_CmbTask_Nm").data("kendoComboBox").value(PrDetKy);

                    } else {

                        $("#HdrSec4_CmbTask_Cd").data("kendoComboBox").value("");
                        $("#HdrSec4_CmbTask_Nm").data("kendoComboBox").value("");
                    }
                }

            },
            filter: "startswith",
            suggest: true,
            placeholder: "Select an Task"
        });

}

function ComboKeyPress() {
    ////KeyPress Events
    $("#HdrSec5_NmricCrAmt_Val")
        .keypress(function (event) {

            var keycode = (event.keyCode ? event.keyCode : event.which);
            if (keycode == "13") {

                var HdrSec5_NmricCrAmt_Val = $("#HdrSec5_NmricCrAmt_Val").data("kendoNumericTextBox").value();
                if (!HdrSec5_NmricCrAmt_Val || HdrSec5_NmricCrAmt_Val == 0) {
                    $("#HdrSec5_NmricDrAmt_Val").data("kendoNumericTextBox").focus();
                }

            }
        });

    $("#HdrSec5_NmricDrAmt_Val")
        .keypress(function (event) {
            var keycode = (event.keyCode ? event.keyCode : event.which);
            if (keycode == "13") {
                var TempCrAmt = $("#HdrSec5_NmricCrAmt_Val").data("kendoNumericTextBox").value();
                var TempDrAmt = $("#HdrSec5_NmricDrAmt_Val").data("kendoNumericTextBox").value();
                if ((!TempDrAmt && !TempCrAmt) || (TempDrAmt == 0 && TempCrAmt == 0)) {
                    alert("Please select a amount");
                    $("#HdrSec5_NmricDrAmt_Val").data("kendoNumericTextBox").focus();
                }
            }
        });
}



//Clear All Details
function ClearAllDetailLevel() {

    $("#HdrSec4_CmbAcc_Cd").data("kendoComboBox").value("");
    //$("#HdrSec4_CmbAcc_Nm").data("kendoComboBox").value("");
    $("#HdrSec4_CmbPrj_Cd").data("kendoComboBox").value("");
    //$("#HdrSec4_CmbPrj_Nm").data("kendoComboBox").value("");
    $("#HdrSec4_CmbBU_Cd").data("kendoComboBox").value("");
    //$("#HdrSec4_CmbBU_Nm").data("kendoComboBox").value("");
    $("#HdrSec4_CmbTask_Cd").data("kendoComboBox").value("");
    //$("#HdrSec4_CmbTask_Nm").data("kendoComboBox").value("");
    $("#HdrSec5_CmbAdress_Cd").data("kendoComboBox").value("");
    $("#HdrSec6_CmbAccCur_Cd").data("kendoComboBox").value("");
    $("#HdrSec10_TxtArea_Des_Val").val("");
    //document.getElementById("HdrSec6_InptAccEx_Cd").value(ExRate);
    document.getElementById("HdrSec6_InptAccEx_Cd").value = "";
    $("#HdrSec5_NmricCrAmt_Val").data("kendoNumericTextBox").value("");
    $("#HdrSec5_NmricDrAmt_Val").data("kendoNumericTextBox").value("");
    $("#HdrSec6_MADate_Cd").data("kendoDatePicker").value("");
    $("#HdrSec6_MADate_Cd").data("kendoDatePicker").value("");
    document.getElementById("TempLiNumber").value = "";

    $("#HdrSec4_CmbAcc_Cd").data("kendoComboBox").input.focus();

    $("#HdrSec9_CmbAnl6_Cd").data("kendoComboBox").value("");
    //$("#HdrSec9_CmbAnl6_Nm").data("kendoComboBox").value("");
    $("#HdrSec9_CmbAnl5_Cd").data("kendoComboBox").value("");
    //$("#HdrSec9_CmbAnl5_Nm").data("kendoComboBox").value("");
    $("#HdrSec8_CmbAnl4_Cd").data("kendoComboBox").value("");
    //$("#HdrSec8_CmbAnl4_Nm").data("kendoComboBox").value("");
    //$("#HdrSec8_CmbAnl3_Nm").data("kendoComboBox").value("");
    $("#HdrSec8_CmbAnl3_Cd").data("kendoComboBox").value("");
    //$("#HdrSec7_CmbAnl2_Nm").data("kendoComboBox").value("");
    $("#HdrSec7_CmbAnl2_Cd").data("kendoComboBox").value("");
    //$("#HdrSec7_CmbAnl1_Nm").data("kendoComboBox").value("");
    $("#HdrSec7_CmbAnl1_Cd").data("kendoComboBox").value("");

    $("#HdrSec6_CmbResAdr_Cd").data("kendoComboBox").value("");
    $("#HdrSec6_CmbOrderNO_Cd").data("kendoComboBox").value("");
    $("#HdrSec5_CmbOrderDet_Cd").data("kendoComboBox").value("");
    $("#HdrSec5_CmbLoan_Cd").data("kendoComboBox").value("");
    $("#HdrSec5_CmbLC_Cd").data("kendoComboBox").value("");
}

var isDefaultCal_Called = false;

function DefaultCal() {
    isDefaultCal_Called = true; // begin
    ClearCalDetail();
}

function ClearCalDetail() {
    document.getElementById("TtlDebit").value = "";
    document.getElementById("TtlCrdt").value = "";
    document.getElementById("Difference").value = "";
    document.getElementById("TmpDebit").value = "";
    document.getElementById("TmpCrdt").value = "";
    document.getElementById("TmpDifference").value = "";

    CalDrTot();
}

//calculate the Total

function CalDrTot() {
    var grid = $("#JournalGrid").data("kendoGrid");
    var CurrehntdataSource = grid.dataSource.data();
    var newValue = 0;

    $.each(CurrehntdataSource,
        function (index, model) {
            if (model.get("IsAct") == 1) {
                newValue += model.get("DrAmtGrd");
            }

        });
    document.getElementById("TmpDebit").value = newValue;
    document.getElementById("TtlDebit").value = numberWithCommas(newValue);

    CalCrTot();
}

function CalCrTot() {
    var grid = $("#JournalGrid").data("kendoGrid");
    var CurrehntdataSource = grid.dataSource.data();
    var newValue = 0;

    $.each(CurrehntdataSource,
        function (index, model) {
            if (model.get("IsAct") == 1) {
                newValue += model.get("CrAmtGrd");
            }
        });

    document.getElementById("TmpCrdt").value = newValue;
    document.getElementById("TtlCrdt").value = numberWithCommas(newValue);

    calDifference();
}

function calDifference() {
    var Dif = 0;
    var Crttl = document.getElementById("TmpCrdt").value;
    var Drttl = document.getElementById("TmpDebit").value;
    Dif = Drttl - Crttl;
    Dif = Dif.toFixed(2);
    if (Dif < 0) {

        document.getElementById("TmpDifference").value = Dif;
        var TempDef = (Dif * -1);
        var TempTotal = numberWithCommas(TempDef);
        document.getElementById("Difference").value = "Cr " + TempTotal;

    } else {
        document.getElementById("TmpDifference").value = Dif;
        document.getElementById("Difference").value = numberWithCommas(Dif);

    }

    isDefaultCal_Called = false; //end
}

var FindFormJournal_IsOpen_IsFire = true;

$(document.body)
    .keydown(function (e) {

        if (e.ctrlKey && e.keyCode == 70) {

            if (FindFormJournal_IsOpen_IsFire) {
                FindFormJournal_IsOpen_IsFire = false;
                load_FindFormJournal_IsOpen();
            }

            $("#FindFormJournal")
                .show()
                .kendoWindow({
                    width: "1000px",
                    height: "600px",
                    modal: true,
                    title: "Find Form"
                });

            $("#FindFormJournal").data("kendoWindow").center().open();

        }
        //if (e.keyCode == 46) {

        //    DeleteRowByKey();
        //}
    });
$(function () {
    $("#FormGrd").keypress(function (e) {
        if (e.keyCode == 46) {
            DeleteRowByKey();
        }
    });
});

function ClearHdrDetails() {

    document.getElementById("HdrSec1_InptVouNo_Val").value = "";
    document.getElementById("HdrSec1_InptDocNo_Val").value = "";
    document.getElementById("HdrSec2_InptExRate_Val").value = "";
    document.getElementById("TtlDebit").value = "";
    document.getElementById("TmpDebit").value = "";
    document.getElementById("TtlCrdt").value = "";
    document.getElementById("TmpCrdt").value = "";
    document.getElementById("Difference").value = "";
    document.getElementById("TmpDifference").value = "";
    document.getElementById("HdrSec2_InptYrref_Val").value = "";
    $("#HdrSec2_CmbCurency_Cd").data("kendoComboBox").value("");
    var todayDate = new Date();
    $("#HdrSec1_DatVouDate_Val").data("kendoDatePicker").value(todayDate);
    $("#HdrSec2_DatYrRefDate_Val").data("kendoDatePicker").value(todayDate);
    $("#HdrSec2_ChkboxIsRec_Val").prop("checked", false);
    FormGlblData.TrnKy = -1;
    FormGlblData.TimeStamp = "";
    FormGlblData.IsRecState = -1;
}

function ClearGriddetails() {
    var grid = $("#JournalGrid").data("kendoGrid");
    grid.dataSource.data([]);

}

function clearfunction() {
    FormGlblData.ISNeworUpdateTranction = 1;
    FormGlblData.isAllowSaveByBackDate = 1;
    SetTrnDate();
    ClearHdrDetails();
    ClearGriddetails();
    SelectHomeCurey();
    Clear_AllDefalutValue_Obj();
    SetFirstFocusObj();
    ClearAllDetailLevel()
}

function SelectHomeCurey() {

    //var datepicker = document.getElementById("HdrSec1_DatVouDate_Val").value;
    $.ajax({
        url: urlGetHomeCurency,
        contentType: "application/json; charset=utf-8",
        dataType: "Json",
        type: "POST",
        success: function (data) {
            var CurKy = data;
            $("#HdrSec2_CmbCurency_Cd").data("kendoComboBox").value(CurKy);
            GetHdrExRate(CurKy);
        },
        error: function (e) {
            return false;
        }
    });

}

function GetHdrExRate(CurKy) {
    var datepicker = document.getElementById("HdrSec1_DatVouDate_Val").value;
    $.ajax({
        url: urlGetExRate,
        data: JSON.stringify({
            CurKy: CurKy,
            datepicker: datepicker,
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "Json",
        type: "POST",
        success: function (data) {
            var TrnExRate = parseFloat(data).toFixed(2);
            document.getElementById("HdrSec2_InptExRate_Val").value = TrnExRate;

        },
        error: function (e) {
            return false;
        }
    });
}

function JrnlUPdateHdr() {

    var HdrSec1_InptVouNo_Val = document.getElementById("HdrSec1_InptVouNo_Val").value;
    var HdrSec1_DatVouDate_Val = document.getElementById("HdrSec1_DatVouDate_Val").value;
    var HdrSec1_InptDocNo_Val = document.getElementById("HdrSec1_InptDocNo_Val").value;
    var HdrSec2_InptYrref_Val = document.getElementById("HdrSec2_InptYrref_Val").value;
    var TrnKy = FormGlblData.TrnKy;
    var cmbCrnKy = $("#HdrSec2_CmbCurency_Cd").data("kendoComboBox").value();
    if (!cmbCrnKy || cmbCrnKy == "") {
        cmbCrnKy = 1;
    }
    var HdrSec2_DatYrRefDate_Val = document.getElementById("HdrSec2_DatYrRefDate_Val").value;
    var HdrSec2_InptExRate_Val = document.getElementById("HdrSec2_InptExRate_Val").value;
    var PrjKy = $("#HdrSec4_CmbPrj_Cd").data("kendoComboBox").value();
    if (!PrjKy || PrjKy == "") {
        PrjKy = 1;
    }
    var BUKy = $("#HdrSec4_CmbBU_Cd").data("kendoComboBox").value();
    if (!BUKy || BUKy == "") {
        BUKy = 1;
    }
    var TimStamp = FormGlblData.TimeStamp;

    var CheckboxIsRecu = ($("#HdrSec2_ChkboxIsRec_Val").is(':checked')) ? 1 : 0;

    $.ajax({
        url: urlUpdateHdr,
        data: JSON.stringify({
            TrnKy: TrnKy,
            isRecur: CheckboxIsRecu,
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
            TimeStamp: TimStamp,
            ObjKy: viewBag.ObjKy
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "Json",
        type: "POST",
        success: function (data) {
            var trnKy = data;

            InsertGrid(trnKy, HdrSec1_DatVouDate_Val, "Update");
        },
        error: function (e) {
            return false;
        }
    });

}

function AnalysisCd(AnlTyp) {
    var dataSource = new kendo.data.DataSource(
    {
        transport: {
            read: {
                url: urlGetAnalysis,
                data: {
                    'AnlTyp': AnlTyp,
                },
                dataType: "json"
            }
        }

    });
    return dataSource;
}

function CmbLC_Cd(ObjNm) {

    var ObjVisible = GetObjVisible(ObjNm);
    if (ObjVisible == 0) {
        return [];
    }

    var ObjKy = GetObjKy(ObjNm);
    var dataSource = new kendo.data.DataSource(
    {
        transport: {
            read: {
                url: urlGetLoan,
                data: {
                    'OurCode': 'LC',
                    'ObjKy': ObjKy,
                },
                dataType: "json"
            }
        }

    });
    return dataSource;
}
//Loan 
function CmbLoan_Cd(ObjNm) {

    var ObjVisible = GetObjVisible(ObjNm);
    if (ObjVisible == 0) {
        return [];
    }

    var ObjKy = GetObjKy(ObjNm);
    var dataSource = new kendo.data.DataSource(
    {
        transport: {
            read: {
                url: urlGetLoan,
                data: {
                    'OurCode': 'Loan',
                    'ObjKy': ObjKy,
                },
                dataType: "json"
            }
        }

    });
    return dataSource;
}

function AnalysisCd(AnlTyp, ObjNm) {

    var ObjVisible = GetObjVisible(ObjNm);
    if (ObjVisible == 0) {
        return [];
    }

    var ObjKy = GetObjKy(ObjNm);

    var dataSource = new kendo.data.DataSource(
    {
        transport: {
            read: {
                url: urlGetAnalysisCd,
                data: {
                    'AnlTyp': AnlTyp,
                    'ObjKy': ObjKy
                },
                dataType: "json"
            }
        }

    });
    return dataSource;
}

function AnalysisNm(AnlTyp, ObjNm) {

    var ObjVisible = GetObjVisible(ObjNm);
    if (ObjVisible == 0) {
        return [];
    }

    var ObjKy = GetObjKy(ObjNm);

    var dataSource = new kendo.data.DataSource(
    {
        transport: {
            read: {
                url: urlGetAnalysisNm,
                data: {
                    'AnlTyp': AnlTyp,
                    'ObjKy': ObjKy
                },
                dataType: "json"
            }
        }

    });
    return dataSource;
}

function numberWithCommas(x) {
    x = parseFloat(x).toFixed(2);
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
}

var IsSaveUpdateCalled = false;

function SaveUpdate(action) {

    if (FormGlblData.isAllowSaveByBackDate == 0) {
        alert("Save Disabled Due to Back Dated Cofiguration!");
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
    }
    else if (TrnDateToUpdate > MaxDt) {
        alert("Transaction for future Date not Allowed!");
        return;
    }


    if (isDefaultCal_Called) {
        alert("Calculating Difference ...\n\nClick Save button again !!!");
        return;
    }

    if (IsSaveUpdateCalled)
        return;

    IsSaveUpdateCalled = true;
    $("#saveBtn").prop('disabled', false);

    if (action == "save" || action == "saveandnew") {
        if (FormGlblData.isAlwAdd == 0) { alert("Warning: You Don't Have Permission To Insert."); CLOSELoadingCommon(); return; }
        var gridData = $("#JournalGrid").data("kendoGrid").dataSource.data()
        var BUKy = gridData[0].BuKy; //$("#HdrSec4_CmbBU_Cd").data("kendoComboBox").value();
        if (!BUKy || BUKy == "" || BUKy == '1') {
            BUKy = 1;
            //This validation is only for PNS
            //alert("Please Enter a BU in line number 1");
            //return;
        }
        var TrnKy = FormGlblData.TrnKy;
        var hdnIsRecState = FormGlblData.IsRecState;
        var IsRec_Val = ($("#HdrSec2_ChkboxIsRec_Val").is(':checked')) ? 1 : 0;

        var ChkIsRecUpdtOrSave
        if (hdnIsRecState == IsRec_Val) {
            //if hidden Field IsRecValue and ChkBox Is Rec Val is Eqal then it have to update 
            ChkIsRecUpdtOrSave = 1
        } else {
            //if hidden Field IsRecValue and ChkBox Is Rec Val is different then it have to treat as a new record 
            ChkIsRecUpdtOrSave = 0
        }

        if (TrnKy > 0 && ChkIsRecUpdtOrSave) {
            var TmpDifference = document.getElementById("TmpDifference").value;
            if (TmpDifference != 0) {
                alert("Credit And Debit Difference must be 0");
                IsSaveUpdateCalled = false;
                $("#saveBtn").prop('disabled', true);
                return;
            }
            var result = confirm("Do you want to Update the record?");
            if (result == true) {
                if (FormGlblData.isAlwUpdate == 0) { alert("Warning: You Don't Have Permission To Update."); CLOSELoadingCommon(); return; }

                OPENLodingCommon('Updating ... !');
                JrnlUPdateHdr();
            }

        } else {
            var TmpDifference = document.getElementById("TmpDifference").value;
            if (TmpDifference != 0) {
                alert("Credit And Debit Difference must be 0");
                IsSaveUpdateCalled = false;
                $("#saveBtn").prop('disabled', true);
                return;
            }
            OPENLodingCommon('Saving ... !');
            SaveHedder(action);
        }

    }
    else if (action == "Update") {
        if (FormGlblData.isAlwUpdate == 0) { alert("Warning: You Don't Have Permission To Update."); CLOSELoadingCommon(); return; }

        var TrnKy = FormGlblData.TrnKy;

        if (TrnKy) {
            OPENLodingCommon('Updating ... !');
            JrnlUPdateHdr();
        } else {

            alert("Plase Selelect a Transaction First");
        }

    }

}

function SaveHedder(action) {
    var HdrSec1_DatVouDate_Val = document.getElementById("HdrSec1_DatVouDate_Val").value;

    // var HdrSec1_DatVouDate_Val = $("#HdrSec1_DatVouDate_Val").data("kendoDatePicker").value();
    var HdrSec1_InptDocNo_Val = document.getElementById("HdrSec1_InptDocNo_Val").value;

    var HdrSec2_InptYrref_Val = document.getElementById("HdrSec2_InptYrref_Val").value;
    var cmbCrnKy = $("#HdrSec2_CmbCurency_Cd").data("kendoComboBox").value();
    if (!cmbCrnKy || cmbCrnKy == "") {
        cmbCrnKy = 1;
    }
    var HdrSec2_DatYrRefDate_Val = document.getElementById("HdrSec2_DatYrRefDate_Val").value;

    //  var HdrSec2_DatYrRefDate_Val = $("#HdrSec2_DatYrRefDate_Val").data("kendoDatePicker").value();
    var HdrSec2_InptExRate_Val = document.getElementById("HdrSec2_InptExRate_Val").value;
    var PrjKy = $("#HdrSec4_CmbPrj_Cd").data("kendoComboBox").value();
    if (!PrjKy || PrjKy == "") {
        PrjKy = 1;
    }
    var gridData = $("#JournalGrid").data("kendoGrid").dataSource.data()
    var BUKy = gridData[0].BuKy; //$("#HdrSec4_CmbBU_Cd").data("kendoComboBox").value();
    if (!BUKy || BUKy == "" || BUKy == '1') {
        BUKy = 1;
    }
    //This is only for PNS Only 
    var TmpDifference = document.getElementById("TmpDifference").value;

    var CheckboxIsRecu = ($("#HdrSec2_ChkboxIsRec_Val").is(':checked')) ? 1 : 0;

    var grid = $("#JournalGrid").data("kendoGrid");
    var dataSource = grid.dataSource;

    //records on current data / page   
    var recordsOnCurrentView = dataSource.data().length;
    //total records
    var totalRecords = dataSource.total();

    if (true) {
        if (totalRecords >= 2) {
            if (TmpDifference == 0) {
                $.ajax({
                    url: urlSaveHdr,
                    data: JSON.stringify({
                        isRecur: CheckboxIsRecu,
                        VouDate: HdrSec1_DatVouDate_Val,
                        DocNo: HdrSec1_InptDocNo_Val,
                        UrRef: HdrSec2_InptYrref_Val,
                        cmbCrnKy: cmbCrnKy,
                        Yourref_Date: HdrSec2_DatYrRefDate_Val,
                        ExRateHrd: HdrSec2_InptExRate_Val,
                        PrjKy: PrjKy,
                        BUKy: BUKy,
                        OurCd: OurCode,
                        ObjKy: viewBag.ObjKy
                    }),
                    contentType: "application/json; charset=utf-8",
                    dataType: "Json",
                    type: "POST",
                    success: function (data) {
                        var trnKy = data;

                        InsertGrid(trnKy, HdrSec1_DatVouDate_Val, action);
                    },
                    error: function (e) {
                        return false;
                    }
                });

            } else {
                alert("Credit And Debit Difference must be 0");
                IsSaveUpdateCalled = false;
                $("#saveBtn").prop('disabled', true);
            }

        } else {
            alert("Please Enter Grid Details");
        }

    } else {

        alert("Please Enter a Document Number");

    }

}

function InsertGrid(trnKy, HdrSec1_DatVouDate_Val, action) {
    var grid = $("#JournalGrid").data("kendoGrid");
    var currentData = grid.dataSource.data();
    var updatedRecords = [];
    var newRecords = [];

    var OurCd = "JRNL";
    var hdnIsRecState = FormGlblData.IsRecState;
    var IsRec_Val = ($("#HdrSec2_ChkboxIsRec_Val").is(':checked')) ? 1 : 0;

    var ChkIsRecUpdtOrSave
    if (hdnIsRecState == IsRec_Val) {
        //if hidden Field IsRecValue and ChkBox Is Rec Val is Eqal then it have to update 
        ChkIsRecUpdtOrSave = 1
    } else {
        //if hidden Field IsRecValue and ChkBox Is Rec Val is different then it have to treat as a new record 
        ChkIsRecUpdtOrSave = 0
    }
    for (var i = 0; i < currentData.length; i++) {
        var rslt = false;
        var TrnKy = FormGlblData.TrnKy;


        if (currentData[i].isNew()) {
            //this record is new
            newRecords.push(currentData[i].toJSON());
        } else if (TrnKy > 0 && ChkIsRecUpdtOrSave == 0) {
            newRecords.push(currentData[i].toJSON());
        } else if (currentData[i].AccTrnKy > 0) {
            updatedRecords.push(currentData[i].toJSON());
        }
    }

    $.ajax({
        url: urlSaveDetail,
        data: JSON.stringify({
            trnKy: trnKy,
            VouDate: HdrSec1_DatVouDate_Val,
            NewGridDetail: kendo.stringify(newRecords),
            UpdatedGridDetail: kendo.stringify(updatedRecords),
            OurCd: OurCode,
            isRec: IsRec_Val,
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "Json",
        type: "POST",
        success: function (data) {

            if (data) {

                if (action == "save" || action == "saveandnew") {
                    CLOSELoadingCommon();
                  
                    IsTbOK(trnKy,"save");
                    ClearHdrDetails();
                    ClearGriddetails();
                    if (action == "save") {
                        GetHdrDetailGrnFrmFind(trnKy);
                    }

                } else if (action == "Update") {
                    CLOSELoadingCommon();
                    IsTbOK(trnKy, "update");
                    ClearHdrDetails();
                    ClearGriddetails();
                    GetHdrDetailGrnFrmFind(trnKy);
                }
            } else {
                CLOSELoadingCommon();
                alert("Please Try Again");
            }

            IsSaveUpdateCalled = false;
            $("#saveBtn").prop('disabled', true);
        },
        error: function (e) {
            IsSaveUpdateCalled = false;
            $("#saveBtn").prop('disabled', true);
            return false;
        }
    });
}

function CurrencyCode(ObjNm) {

    var ObjVisible = GetObjVisible(ObjNm);
    if (ObjVisible == 0) {
        return [];
    }

    var ObjKy = GetObjKy(ObjNm);
    var dataSource = new kendo.data.DataSource(
    {
        transport: {
            read: {
                url: urlGetCurrencyDrop,
                data: {
                    'ObjKy': ObjKy
                },
                dataType: "json"
            }
        }

    });
    return dataSource;
}

function AccCurrencyCode(ObjNm) {

    var ObjVisible = GetObjVisible(ObjNm);
    if (ObjVisible == 0) {
        return [];
    }

    var ObjKy = GetObjKy(ObjNm);
    var dataSource = new kendo.data.DataSource(
    {
        transport: {
            read: {
                url: urlGetCurrencyDrop,
                data: {
                    'ObjKy': ObjKy
                },
                dataType: "json"
            }
        }

    });
    return dataSource;
}

function AccDoropCode(ObjNm) {

    var ObjVisible = GetObjVisible(ObjNm);
    if (ObjVisible == 0) {
        return [];
    }

    var ObjKy = GetObjKy(ObjNm);
    var dataSource = new kendo.data.DataSource(
    {
        transport: {
            read: {
                url: urlGetAccDoropCode,
                data: {
                    'ObjKy': ObjKy,
                    TrnTypKy:1,
                    PreKy:1
                },
                dataType: "json"
            }
        }

    });
    return dataSource;
}

function AccDoropName(ObjNm) {

    var ObjVisible = GetObjVisible(ObjNm);
    if (ObjVisible == 0) {
        return [];
    }

    var ObjKy = GetObjKy(ObjNm);
    var dataSource = new kendo.data.DataSource(
    {
        transport: {
            read: {
                url: urlGetAccDoropNm,
                data: {
                    'ObjKy': ObjKy,
                    TrnTypKy: 1,
                    PreKy: 1
                },
                dataType: "json"
            }
        }

    });
    return dataSource;
}

function ProjectCd(ObjNm) {

    var ObjVisible = GetObjVisible(ObjNm);
    if (ObjVisible == 0) {
        return [];
    }

    var ObjKy = GetObjKy(ObjNm);
    var dataSource = new kendo.data.DataSource(
    {
        transport: {
            read: {
                url: urlGetProjectCode,
                data: {
                    'ObjKy': ObjKy,
                    TrnTypKy: 1,
                    PreKy: 1
                },
                dataType: "json"
            }
        }

    });
    return dataSource;
}

function ProjectNm(ObjNm) {

    var ObjVisible = GetObjVisible(ObjNm);
    if (ObjVisible == 0) {
        return [];
    }

    var ObjKy = GetObjKy(ObjNm);
    var dataSource = new kendo.data.DataSource(
    {
        transport: {
            read: {
                url: urlGetProjectNm,
                data: {
                    ObjKy: ObjKy,
                    TrnTypKy:1,
                    PreKy:1
                },
                dataType: "json"
            }
        }

    });
    return dataSource;
}

function BUCode(ObjNm) {

    var ObjVisible = GetObjVisible(ObjNm);
    if (ObjVisible == 0) {
        return [];
    }

    var ObjKy = GetObjKy(ObjNm);
    var dataSource = new kendo.data.DataSource(
    {
        transport: {
            read: {
                url: urlGetBUCode,
                data: {
                    'ObjKy': ObjKy,
                },
                dataType: "json"
            }
        }

    });
    return dataSource;
}

function BUName(ObjNm) {

    var ObjVisible = GetObjVisible(ObjNm);
    if (ObjVisible == 0) {
        return [];
    }

    var ObjKy = GetObjKy(ObjNm);
    var dataSource = new kendo.data.DataSource(
    {
        transport: {
            read: {
                url: urlGetBUNm,
                data: {
                    'ObjKy': ObjKy,

                },
                dataType: "json"
            }
        }

    });
    return dataSource;
}

function AddressCode(ObjNm) {

    var ObjVisible = GetObjVisible(ObjNm);
    if (ObjVisible == 0) {
        return [];
    }

    var ObjKy = GetObjKy(ObjNm);
    var dataSource = new kendo.data.DataSource(
    {
        transport: {
            read: {
                url: urlGetAddressNm,
                data: {
                    ObjKy: ObjKy,
                    'PreKy': "1"
                },
                dataType: "json"
            }
        }

    });
    return dataSource;
}

function AddressName(ObjNm) {

    var ObjVisible = GetObjVisible(ObjNm);
    if (ObjVisible == 0) {
        return [];
    }

    var ObjKy = GetObjKy(ObjNm);
    var dataSource = new kendo.data.DataSource(
    {
        transport: {
            read: {
                url: urlGetAddressNm,
                data: {
                    'ObjKy': ObjKy,
                    'PreKy': "1"
                },

                dataType: "json"
            }
        }

    });
    return dataSource;
}

function GetOrderCode(ObjNm) {

    var ObjVisible = GetObjVisible(ObjNm);
    if (ObjVisible == 0) {
        return [];
    }

    var ObjKy = GetObjKy(ObjNm);
    var dataSource = new kendo.data.DataSource(
    {
        transport: {
            read: {
                url: urlGetOrderNo,
                data: {
                    'ObjKy': ObjKy.toString(),
                },
                dataType: "json"
            }
        }

    });
    return dataSource;
}

function GetOrderDetCode(ObjNm) {

    var ObjVisible = GetObjVisible(ObjNm);
    if (ObjVisible == 0) {
        return [];
    }

    var ObjKy = GetObjKy(ObjNm);
    var dataSource = new kendo.data.DataSource(
    {
        transport: {
            read: {
                url: urlGetOrderDet,
                data: {
                    'ObjKy': ObjKy,
                    'OrdrKy': "1",
                },
                dataType: "json"
            }
        }

    });
    return dataSource;
}

function urlGetTaskNmJrnl(ObjNm) {

    var ObjVisible = GetObjVisible(ObjNm);
    if (ObjVisible == 0) {
        return [];
    }

    var ObjKy = GetObjKy(ObjNm);
    var cmbFmPrjId = document.getElementById("HdrSec4_CmbPrj_Cd").value;
    if (!cmbFmPrjId || cmbFmPrjId == "") {
        cmbFmPrjId = 1;
    }
    var dataSource = new kendo.data.DataSource(
    {
        transport: {
            read: {
                url: urlDetlGetTaskNm,
                data: {
                    
                    'ObjKy': ObjKy,
                    'PrjKy': cmbFmPrjId
                },
                dataType: "json"
            }
        }

    });
    return dataSource;
}

function urlGetTaskCodeJrnl(ObjNm) {

    var ObjVisible = GetObjVisible(ObjNm);
    if (ObjVisible == 0) {
        return [];
    }

    var ObjKy = GetObjKy(ObjNm);
    var cmbFmPrjId = document.getElementById("HdrSec4_CmbPrj_Cd").value;
    if (!cmbFmPrjId || cmbFmPrjId == "") {
        cmbFmPrjId = 1;
    }
    var dataSource = new kendo.data.DataSource(
    {
        transport: {
            read: {
                url: urlGetTaskCodeUrl,
                data: {
                    'PrjKy': cmbFmPrjId,
                    'ObjKy': ObjKy
                },
                dataType: "json"
            }
        }

    });
    return dataSource;
}


document.getElementById("HdrSec10_TxtArea_Des_Val")
    .addEventListener("keydown", function (event) {
        // event.preventDefault();
        if (event.keyCode == 13) {
            event.preventDefault();
            //insertItem();
            var TempCrAmt = $("#HdrSec5_NmricCrAmt_Val").data("kendoNumericTextBox").value();
            var TempDrAmt = $("#HdrSec5_NmricDrAmt_Val").data("kendoNumericTextBox").value();
            var TempAccCd = $("#HdrSec4_CmbAcc_Cd").data("kendoComboBox").value();
            var TempBUCd = $("#HdrSec4_CmbBU_Cd").data("kendoComboBox").value();

            var TempDiscrption = $("#HdrSec10_TxtArea_Des_Val").val();
            if (!TempAccCd || TempAccCd == 1) {
                alert("Select An Account");
                $("#HdrSec4_CmbAcc_Cd").data("kendoComboBox").input.focus();
                return;
            } else if (!TempCrAmt && !TempDrAmt) {
                alert("Enter An Amount");
                $("#HdrSec5_NmricDrAmt_Val").data("kendoNumericTextBox").focus();
                return;
            }
            else if (!TempDiscrption) {//|| TempDiscrption.length <= 1
                alert("Enter a Description");
                $("#HdrSec10_TxtArea_Des_Val").val("");
                $("#HdrSec10_TxtArea_Des_Val").focus();
                return;
            } else {
                var Lino = document.getElementById("TempLiNumber").value;

                if (!Lino || Lino == "") {
                    InsertToGrid();
                } else {
                    GridUpdateRow(Lino);
                }

                DefaultCal();
                ClearAllDetailLevel();

            }
        }
    });


function onMaDateChange(e) {
    var val = $('#HdrSec6_MADate_Cd').val();
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
    }
    else {
        dt.value(value);
    }
}

$("#HdrSec6_MADate_Cd").keydown(function (event) {
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode == '13') {
        var Current_Val = $('#HdrSec6_MADate_Cd').val();
        $('#HdrSec6_MADate_Cd').val(CheckDateforAutoMonthYear(Current_Val));
        event.preventDefault();
    }
});

function SetTrnDate() {
    if (FormGlblData.ISNeworUpdateTranction == 1) {

        $('#HdrSec1_DatVouDate_Val').kendoDatePicker({
            format: "dd/MM/yyyy",
            parseFormats: ["dd/MM/yyyy"],
            min: new Date(CdMasModel.TrnMinDate),
            max: new Date(CdMasModel.TrnMaxDate),
            change: onDateChange
        });

    }
    else {
        $('#HdrSec1_DatVouDate_Val').kendoDatePicker({
            format: "dd/MM/yyyy",
            parseFormats: ["dd/MM/yyyy"],
            //kendo.parseDate("2000/12/22", "yyyy/MM/dd");
        });

    }
}
function onDateChange(e) {
    var val = $('#HdrSec1_DatVouDate_Val').val();
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
    }
    else {
        dt.value(value);
    }
}

function BackDateFutureDateLock(DateVal) {
    var dt = ("#" + DateVal);
    var TrnDateToUpdate = FormGlblData.FromFindDate
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


function IsTbOK(TrnKy,status) {
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
                if (status == "update") {
                    alert("Update Successfully" + "\n" + data.TrnInfo + "\n" + data.Msg + "\n Total Numbers of lines" + data.LiNo + "\n");

                } else {
                    alert("Save Successfully" + "\n" + data.TrnInfo + "\n" + data.Msg + "\n Total Numbers of lines" + data.LiNo + "\n");
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