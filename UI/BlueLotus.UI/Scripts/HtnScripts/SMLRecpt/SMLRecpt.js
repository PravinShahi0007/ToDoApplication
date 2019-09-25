var FormGlblData = {
    FormObjData: null,
    TrnTypKy: 1,
    AccessLvlKy: 1,
    ConfiLvlKy: 1,
    TrnKy: 1,
    AllDefalutValueObj: null,
    GotItemRate: 0
};
OPENLodingForm();
LoadGloabData();

function LoadComboAndDateTime() {
    LoadDateAndtimeNumber();
    LoadCombo();
}
$(document)
    .ready(function () {
        Button_From_Dynamic("ButtonSec1");
    });
function LoadDateAndtimeNumber() {
    $("#HdrSec1_DatVouDate_Val")
        .kendoDatePicker({
            format: "dd/MM/yyyy",
            parseFormats: "yyyy/MM/dd",
            value: viewBag.DateNow, //new Date(),
            min: new Date(31, 2, 2009),
            change: function() {

            }
        });

    $("#HdrSec1_NmricExRae_Val").kendoNumericTextBox({
        decimals: 2,
        spinners: false,
        min: 0,
        change: function() {

        }
    });
    $("#HdrSec1_NmricChqNumber_Val").kendoNumericTextBox({
        decimals: 2,
        spinners: false,
        min: 0,
        change: function() {

        }
    });
    $("#HdrSec1_DatChqDate_Val")
        .kendoDatePicker({
            format: "dd/MM/yyyy",
            parseFormats: "yyyy/MM/dd",
            value: viewBag.DateNow, //new Date(),
            min: new Date(31, 2, 2009),
            change: function() {

            }
        });
    $("#HdrSec1_NmricAmount_Val").kendoNumericTextBox({
        decimals: 2,
        spinners: false,
        min: 0,
        change: function() {

        }
    });
    $("#HdrSec1_NmricBalAmount_Val").kendoNumericTextBox({
        decimals: 2,
        spinners: false,
        min: 0,
        change: function() {

        }
    });
}

function LoadCombo() {
    $("#HdrSec1_CmbTrnCrn_Cd")
        .kendoComboBox({
            dataValueField: "CdKy",
            dataTextField: "Code",
            dataSource: Code("HdrSec1_CmbTrnCrn"),
            change: function(e) {
                var cmb = $("#HdrSec1_CmbTrnCrn_Cd").data("kendoComboBox");
                var cmbVal = cmb.value();
                if (cmbVal != "") {
                    var validate = ComboValidations("HdrSec1_CmbTrnCrn_Cd");
                    if (validate) {
                        $("#HdrSec1_CmbTrnCrn_Cd").data("kendoComboBox").value(cmbVal);
                    } else {
                        $("#HdrSec1_CmbTrnCrn_Cd").data("kendoComboBox").value("");
                    }
                }
            },
            filter: "startswith",
            suggest: true,
            placeholder: "Select a Currency Type"
        });


    $("#HdrSec1_CmbVehical_Cd")
        .kendoComboBox({
            dataValueField: "CdKy",
            dataTextField: "CdNm",
            dataSource: CdmasName("HdrSec1_CmbVehical"),
            change: function(e) {
                var cmb = $("#HdrSec1_CmbVehical_Cd").data("kendoComboBox");
                var cmbVal = cmb.value();
                if (cmbVal != "") {
                    var validate = ComboValidations("HdrSec1_CmbVehical_Cd");
                    if (validate) {
                        $("#HdrSec1_CmbVehical_Cd").data("kendoComboBox").value(cmbVal);
                    } else {
                        $("#HdrSec1_CmbVehical_Cd").data("kendoComboBox").value("");
                    }
                }
            },
            filter: "startswith",
            suggest: true,
            placeholder: "Select a Model"
        });

    $("#HdrSec1_CmbVehicalSers_Cd")
        .kendoComboBox({
            dataValueField: "CdKy",
            dataTextField: "CdNm",
            dataSource: CdmasName("HdrSec1_CmbVehicalSers"),
            change: function(e) {
                var cmb = $("#HdrSec1_CmbVehicalSers_Cd").data("kendoComboBox");
                var cmbVal = cmb.value();
                if (cmbVal != "") {
                    var validate = ComboValidations("HdrSec1_CmbVehicalSers_Cd");
                    if (validate) {
                        $("#HdrSec1_CmbVehicalSers_Cd").data("kendoComboBox").value(cmbVal);
                    } else {
                        $("#HdrSec1_CmbVehicalSers_Cd").data("kendoComboBox").value("");
                    }
                }
            },
            filter: "startswith",
            suggest: true,
            placeholder: "Select a Series"
        });

    //Accounts Code Drop Bottom
    $("#HdrSec1_CmbCrdAcc_Cd")
        .kendoComboBox({
            dataValueField: "AccKy",
            dataTextField: "AccCode",
            dataSource: AccDoropCode("HdrSec1_CmbCrdAcc"),
            change: function(e) {
                var cmb = $("#HdrSec1_CmbCrdAcc_Cd").data("kendoComboBox");
                var AkkKy = cmb.value();
                if (AkkKy != "") {
                    var validate = ComboValidations("HdrSec4_CmbAcc_Cd");
                    if (validate) {

                        $("#HdrSec1_CmbCrdAcc_Cd").data("kendoComboBox").value(AkkKy);
                        $("#HdrSec1_CmbCrdAcc_Nm").data("kendoComboBox").value(AkkKy);
                        // GetJournalDetailByAccKy(AkkKy);

                    } else {

                        $("#HdrSec1_CmbCrdAcc_Cd").data("kendoComboBox").value("");
                        $("#HdrSec1_CmbCrdAcc_Nm").data("kendoComboBox").value("");

                    }
                }

            },
            filter: "startswith",
            suggest: true,
            placeholder: "Select an Account"
        });
    //Accounts Name Drop Bottom
    $("#HdrSec1_CmbCrdAcc_Nm")
        .kendoComboBox({
            dataValueField: "AccKy",
            dataTextField: "AccNM",
            dataSource: AccDoropName("HdrSec1_CmbCrdAcc"),
            //    {
            //    type: "POST",
            //    transport: {
            //        read: urlGetAccDoropNm //readcontroler and action
            //    }
            //},
            change: function(e) {
                var cmb = $("#HdrSec1_CmbCrdAcc_Nm").data("kendoComboBox");
                var AkkKy = cmb.value();
                if (AkkKy != "") {
                    var validate = ComboValidations("HdrSec1_CmbCrdAcc");
                    if (validate) {

                        $("#HdrSec1_CmbCrdAcc_Cd").data("kendoComboBox").value(AkkKy);
                        $("#HdrSec1_CmbCrdAcc_Nm").data("kendoComboBox").value(AkkKy);
                        // GetJournalDetailByAccKy(AkkKy);

                    } else {

                        $("#HdrSec1_CmbCrdAcc_Cd").data("kendoComboBox").value("");
                        $("#HdrSec1_CmbCrdAcc_Nm").data("kendoComboBox").value("");

                    }
                }

            },
            filter: "startswith",
            suggest: true,
            placeholder: "Select an Account"
        });


    //Accounts Code Drop Bottom
    $("#HdrSec1_CmbDrdAcc_Cd")
        .kendoComboBox({
            dataValueField: "AccKy",
            dataTextField: "AccCode",
            dataSource: AccDoropCode("HdrSec1_CmbDrdAcc"),
            change: function(e) {
                var cmb = $("#HdrSec1_CmbDrdAcc_Cd").data("kendoComboBox");
                var AkkKy = cmb.value();
                if (AkkKy != "") {
                    var validate = ComboValidations("HdrSec1_CmbDrdAcc_Cd");
                    if (validate) {

                        $("#HdrSec1_CmbDrdAcc_Cd").data("kendoComboBox").value(AkkKy);
                        $("#HdrSec1_CmbDrdAcc_Nm").data("kendoComboBox").value(AkkKy);
                        // GetJournalDetailByAccKy(AkkKy);

                    } else {

                        $("#HdrSec1_CmbDrdAcc_Cd").data("kendoComboBox").value("");
                        $("#HdrSec1_CmbDrdAcc_Nm").data("kendoComboBox").value("");

                    }
                }

            },
            filter: "startswith",
            suggest: true,
            placeholder: "Select an Account"
        });
    //Accounts Name Drop Bottom
    $("#HdrSec1_CmbDrdAcc_Nm")
        .kendoComboBox({
            dataValueField: "AccKy",
            dataTextField: "AccNM",
            dataSource: AccDoropName("HdrSec1_CmbDrdAcc"),
            //    {
            //    type: "POST",
            //    transport: {
            //        read: urlGetAccDoropNm //readcontroler and action
            //    }
            //},
            change: function(e) {
                var cmb = $("#HdrSec1_CmbDrdAcc_Nm").data("kendoComboBox");
                var AkkKy = cmb.value();
                if (AkkKy != "") {
                    var validate = ComboValidations("HdrSec1_CmbCrdAcc");
                    if (validate) {

                        $("#HdrSec1_CmbDrdAcc_Cd").data("kendoComboBox").value(AkkKy);
                        $("#HdrSec1_CmbDrdAcc_Nm").data("kendoComboBox").value(AkkKy);
                        // GetJournalDetailByAccKy(AkkKy);

                    } else {

                        $("#HdrSec1_CmbDrdAcc_Cd").data("kendoComboBox").value("");
                        $("#HdrSec1_CmbDrdAcc_Nm").data("kendoComboBox").value("");

                    }
                }

            },
            filter: "startswith",
            suggest: true,
            placeholder: "Select an Account"
        });

    //Payment Method Name Drop Bottom
    $("#HdrSec1_CmbPayMthd_Cd")
        .kendoComboBox({
            dataValueField: "CdKy",
            dataTextField: "CdNm",
            dataSource: urlGetPaymentCode("HdrSec1_CmbPayMthd"),
            change: function(e) {
                var cmb = $("#HdrSec1_CmbPayMthd_Cd").data("kendoComboBox");
                var Anlky = cmb.value();
                if (Anlky != "") {
                    var validate = ComboValidations("HdrSec1_CmbPayMthd_Cd");
                    if (validate) {
                        $("#HdrSec1_CmbPayMthd_Cd").data("kendoComboBox").value(Anlky);
                        var isCash = $("#HdrSec1_CmbPayMthd_Cd").data("kendoComboBox").text();
                        if (isCash == "Cash") {
                            $("#ValidationFade").slideUp();
                        } else {
                            $("#ValidationFade").slideDown();
                        }
                    } else {

                        $("#HdrSec1_CmbPayMthd_Cd").data("kendoComboBox").value("");
                    }
                }

            },
            filter: "startswith",
            suggest: true,
            placeholder: "Select a Payment Mode"
        });
}

function LoadGloabData() {
    $.ajax({
        url: urlCodes.GetCdKyByConCdAndOurCd,
        dataType: "json",
        type: "POST",
        data: JSON.stringify({
            ObjKy: viewBag.ObjKy,
            ConCd: "LogTyp",
            OurCd: viewBag.OurCd
        }),
        contentType: "application/json; charset=utf-8",
        success: function(TrnTypKy) {
            FormGlblData.TrnTypKy = TrnTypKy;
            GetFormObjData();
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
        contentType: "application/json; charset=utf-8",
        success: function(HdrSectionFromDb) {
            FormGlblData.FormObjData = HdrSectionFromDb;
            FormGlblData.AllDefalutValueObj = Get_AllDefalutValue_Obj();
            FormGlblData.AllValidationObj = Get_All_Validation_Obj();
            FormGlblData.AllValidationObj = sortByKey(FormGlblData.AllValidationObj, "ValidationOrder");
            LoadComboAndDateTime();
            // Clear();
            setHdrSectionPropFun();
            CLOSELoadingForm();
        }
    });
}

function setHdrSectionPropFun() {

    // ---------- Set ObjProperties
    setHdrSectionProp("", viewBag.ObjKy, "", "HdrSec1");
    SetHandlingEnterKeyEvent("", viewBag.ObjKy);
    SetFirstFocusObj();

    // $("#HdrSec1_InptDocNo_Val").focus();
}


function Save() {
    //insave button

    var validationMsg = Save_FinalValidation();
    if (validationMsg.length > 1) {
        alert(validationMsg);
        return;
    }
}


//DateSources
function CdmasName(ObjNm) {
    var ObjKy = GetObjKy(ObjNm);
    var PreKy = 1;
    var dataSource = new kendo.data.DataSource(
    {
        transport: {
            read: {
                url: urlLink.urlGetCdMasName,
                data: {
                    'ObjKy': ObjKy,
                    'TrnTypKy': "1",
                    'PreKy': PreKy,
                },
                dataType: "json"
            }
        }

    });
    return dataSource;
}

function Code(ObjNm) {
    var ObjKy = GetObjKy(ObjNm);
    var PreKy = 1;
    var dataSource = new kendo.data.DataSource(
    {
        transport: {
            read: {
                url: urlLink.CodeSelect,
                data: {
                    'ObjKy': ObjKy,
                    'PreKy': PreKy,
                },
                dataType: "json"
            }
        }

    });
    return dataSource;
}

function AccDoropCode(ObjNm) {
    var ObjKy = GetObjKy(ObjNm);
    var dataSource = new kendo.data.DataSource(
    {
        transport: {
            read: {
                url: urlLink.urlGetAccDoropCode,
                data: {
                    'ObjKy': ObjKy
                },
                dataType: "json"
            }
        }

    });
    return dataSource;
}

function AccDoropName(ObjNm) {
    var ObjKy = GetObjKy(ObjNm);
    var dataSource = new kendo.data.DataSource(
    {
        transport: {
            read: {
                url: urlLink.urlGetAccDoropNm,
                data: {
                    'ObjKy': ObjKy
                },
                dataType: "json"
            }
        }

    });
    return dataSource;
}

function urlGetPaymentCode(ObjNm) {
    var ObjKy = GetObjKy(ObjNm);
    var dataSource = new kendo.data.DataSource(
    {
        transport: {
            read: {
                url: urlLink.PMTGetPaymentCode,
                data: {
                    'ObjKy': ObjKy,
                },
                dataType: "json"
            }
        }

    });
    return dataSource;

}

function ComboValidations(cmbNm) {

    var cmb = $("#" + cmbNm + "").data("kendoComboBox");
    var val = cmb.value();

    if (isNaN(val)) {
        alert("'" + val + "' is not a Valid input");
        $("#" + cmbNm + "").data("kendoComboBox").value("");
        return false;
    } else {
        return true;
    }
}