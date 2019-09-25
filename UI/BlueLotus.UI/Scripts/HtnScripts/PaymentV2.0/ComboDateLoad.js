function LoadComboNumericDate() {
    LoadDate();
    LoadNumericTextBox();
    LoadCommonCombo();
    BranchLoad();
    OrderDet("1");
    LoadAccounts();
    LoadAddress();
    BuLOad();
    Project();
    Task("1");
}

function LoadDate() {
    $("#HdrSec1_DatVouDate_Val")
        .kendoDatePicker({
            format: "dd/MM/yyyy",
            min: new Date(31, 2, 2009),
            change: function() {
                var value = this.value();
                $("#HdrSec6_DatMADate_Val").data("kendoDatePicker").value(value);
                $("#HdrSec4_DatChqDate_Val").data("kendoDatePicker").min(value);


            }
        });
    $("#HdrSec1_DatVouRefDate_Val")
        .kendoDatePicker({
            format: "dd/MM/yyyy",
            min: new Date(31, 2, 2009)
        });
    $("#HdrSec4_DatChqDate_Val")
        .kendoDatePicker({
            format: "dd/MM/yyyy",
            min: new Date(31, 2, 2009)
        });
    $("#HdrSec6_DatMADate_Val")
        .kendoDatePicker({
            format: "dd/MM/yyyy",
            min: new Date(31, 2, 2009)
        });
    $("#HdrSec5_DatDueDate_Val")
        .kendoDatePicker({
            format: "dd/MM/yyyy",
            min: new Date(31, 2, 2009)
        });
    $("#HdrSec1_DatVouDate_Val").parent().css("width", "100%");
    $("#HdrSec1_DatVouRefDate_Val").parent().css("width", "100%");
    $("#HdrSec6_DatMADate_Val").parent().css("width", "100%");
    $("#HdrSec6_DatMADate_Val").closest("span.k-datepicker").width(70);
    $("#HdrSec5_DatDueDate_Val").closest("span.k-datepicker").width(135);
    //  $("#HdrSec6_DatMADate_Val").closest("span.k-datepicker").height(10);

    var todayDate = new Date();
    $("#HdrSec1_DatVouDate_Val").data("kendoDatePicker").value(todayDate);
    $("#HdrSec1_DatVouRefDate_Val").data("kendoDatePicker").value(todayDate);
    //$("#HdrSec6_DatMADate_Val").data("kendoDatePicker").value(todayDate);
    //$("#HdrSec4_DatChqDate_Val").data("kendoDatePicker").value(todayDate);
    $("#HdrSec1_DatVouDate_Val").data("kendoDatePicker").trigger("change");;
}

function LoadNumericTextBox() {

    $("#HdrSec5_NmricAmt_Val")
        .kendoNumericTextBox({
            decimals: 3,
            spinners: false,
            min: 0,
            change: function() {
            }
        });
    $("#HdrSec4_InptChqNO_Val")
        .kendoNumericTextBox({
            spinners: false,
            format: "#",
            min: 0,
            change: function() {
            }
        });
    $("#HdrSec2_InptTotAmt_Val")
        .kendoNumericTextBox({
            decimals: 3,
            spinners: false,
            min: 0,
            change: function() {
            }
        });
    $("#HdrSec1_InptTrnExRate_Val")
        .kendoNumericTextBox({
            decimals: 3,
            spinners: false,
            min: 0,
            change: function() {
            }
        });

}

function LoadCommonCombo() {
    $("#HdrSec1_CmbTrnCurrncy_Cd")
        .kendoComboBox({
            dataValueField: "CdKy",
            dataTextField: "Code",
            dataSource: CdMasCd("HdrSec1_CmbTrnCurrncy"),
            change: function(e) {
                var cmb = $("#HdrSec1_CmbTrnCurrncy_Cd").data("kendoComboBox");
                var Crnky = cmb.value();
                if (Crnky != "") {
                    var validate = ComboValidations("HdrSec1_CmbTrnCurrncy_Cd");
                    if (validate) {
                        $("#HdrSec1_CmbTrnCurrncy_Cd").data("kendoComboBox").value(Crnky);
                    } else {
                        $("#HdrSec1_CmbTrnCurrncy_Cd").data("kendoComboBox").value("");
                    }
                }

            },
            filter: "startswith",
            suggest: true,
            placeholder: "Select a Curency"
        });
    $("#HdrSec1_CmbTrnCurrncy_Cd").parent().css("width", "100%");
    //Analysis 01
    $("#HdrSec7_CmbAnl1_Nm")
        .kendoComboBox({
            dataValueField: "CdKy",
            dataTextField: "Name",
            dataSource: CdMasNm("HdrSec7_CmbAnl1"),
            change: function(e) {
                var cmb = $("#HdrSec7_CmbAnl1_Nm").data("kendoComboBox");
                var Anlky = cmb.value();
                if (Anlky != "") {
                    var validate = ComboValidations("HdrSec7_CmbAnl1_Nm");
                    if (validate) {
                        $("#HdrSec7_CmbAnl1_Cd").data("kendoComboBox").value(Anlky);
                        $("#HdrSec7_CmbAnl1_Nm").data("kendoComboBox").value(Anlky);
                    } else {
                        $("#HdrSec7_CmbAnl1_Cd").data("kendoComboBox").value("");
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
            dataSource: CdMasCd("HdrSec7_CmbAnl1"), //AnalysisCd(1, "HdrSec8_CmbAnl1"),
            change: function(e) {
                var cmb = $("#HdrSec7_CmbAnl1_Cd").data("kendoComboBox");
                var Anlky = cmb.value();
                if (Anlky != "") {
                    var validate = ComboValidations("HdrSec7_CmbAnl1_Cd");
                    if (validate) {
                        $("#HdrSec7_CmbAnl1_Cd").data("kendoComboBox").value(Anlky);
                        $("#HdrSec7_CmbAnl1_Nm").data("kendoComboBox").value(Anlky);

                    } else {

                        $("#HdrSec7_CmbAnl1_Cd").data("kendoComboBox").value("");
                        $("#HdrSec7_CmbAnl1_Nm").data("kendoComboBox").value("");
                    }
                }

            },
            filter: "startswith",
            suggest: true,
            placeholder: "Select an Analysis 1"
        });

    //Analysis 02
    $("#HdrSec7_CmbAnl2_Nm")
        .kendoComboBox({
            dataValueField: "CdKy",
            dataTextField: "Name",
            dataSource: CdMasNm("HdrSec7_CmbAnl2"),
            change: function(e) {
                var cmb = $("#HdrSec7_CmbAnl2_Nm").data("kendoComboBox");
                var Anlky = cmb.value();
                if (Anlky != "") {
                    var validate = ComboValidations("HdrSec7_CmbAnl2_Nm");
                    if (validate) {
                        $("#HdrSec7_CmbAnl2_Cd").data("kendoComboBox").value(Anlky);
                        $("#HdrSec7_CmbAnl2_Nm").data("kendoComboBox").value(Anlky);
                    } else {
                        $("#HdrSec7_CmbAnl2_Cd").data("kendoComboBox").value("");
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
            dataSource: CdMasCd("HdrSec7_CmbAnl2"), //AnalysisCd(1, "HdrSec8_CmbAnl1"),
            change: function(e) {
                var cmb = $("#HdrSec7_CmbAnl2_Cd").data("kendoComboBox");
                var Anlky = cmb.value();
                if (Anlky != "") {
                    var validate = ComboValidations("HdrSec7_CmbAnl2_Cd");
                    if (validate) {
                        $("#HdrSec7_CmbAnl2_Cd").data("kendoComboBox").value(Anlky);
                        $("#HdrSec7_CmbAnl2_Nm").data("kendoComboBox").value(Anlky);

                    } else {

                        $("#HdrSec7_CmbAnl2_Cd").data("kendoComboBox").value("");
                        $("#HdrSec7_CmbAnl2_Nm").data("kendoComboBox").value("");
                    }
                }

            },
            filter: "startswith",
            suggest: true,
            placeholder: "Select an Analysis 2"
        });

    //Analysis 03
    $("#HdrSec7_CmbAnl3_Nm")
        .kendoComboBox({
            dataValueField: "CdKy",
            dataTextField: "Name",
            dataSource: CdMasNm("HdrSec7_CmbAnl3"),
            change: function(e) {
                var cmb = $("#HdrSec7_CmbAnl3_Nm").data("kendoComboBox");
                var Anlky = cmb.value();
                if (Anlky != "") {
                    var validate = ComboValidations("HdrSec7_CmbAnl3_Nm");
                    if (validate) {
                        $("#HdrSec7_CmbAnl3_Cd").data("kendoComboBox").value(Anlky);
                        $("#HdrSec7_CmbAnl3_Nm").data("kendoComboBox").value(Anlky);
                    } else {
                        $("#HdrSec7_CmbAnl3_Cd").data("kendoComboBox").value("");
                        $("#HdrSec7_CmbAnl3_Nm").data("kendoComboBox").value("");
                    }
                }

            },
            filter: "startswith",
            suggest: true,
            placeholder: "Select an Analysis 3"
        });

    $("#HdrSec7_CmbAnl3_Cd")
        .kendoComboBox({
            dataValueField: "CdKy",
            dataTextField: "Code",
            dataSource: CdMasCd("HdrSec7_CmbAnl3"), //AnalysisCd(1, "HdrSec8_CmbAnl1"),
            change: function(e) {
                var cmb = $("#HdrSec7_CmbAnl3_Cd").data("kendoComboBox");
                var Anlky = cmb.value();
                if (Anlky != "") {
                    var validate = ComboValidations("HdrSec7_CmbAnl3_Cd");
                    if (validate) {
                        $("#HdrSec7_CmbAnl3_Cd").data("kendoComboBox").value(Anlky);
                        $("#HdrSec7_CmbAnl3_Nm").data("kendoComboBox").value(Anlky);

                    } else {

                        $("#HdrSec7_CmbAnl3_Cd").data("kendoComboBox").value("");
                        $("#HdrSec7_CmbAnl3_Nm").data("kendoComboBox").value("");
                    }
                }

            },
            filter: "startswith",
            suggest: true,
            placeholder: "Select an Analysis 3"
        });
    //Analysis 04
    $("#HdrSec7_CmbAnl4_Nm")
        .kendoComboBox({
            dataValueField: "CdKy",
            dataTextField: "Name",
            dataSource: CdMasNm("HdrSec7_CmbAnl4"),
            change: function(e) {
                var cmb = $("#HdrSec7_CmbAnl4_Nm").data("kendoComboBox");
                var Anlky = cmb.value();
                if (Anlky != "") {
                    var validate = ComboValidations("HdrSec7_CmbAnl4_Nm");
                    if (validate) {
                        $("#HdrSec7_CmbAnl4_Cd").data("kendoComboBox").value(Anlky);
                        $("#HdrSec7_CmbAnl4_Nm").data("kendoComboBox").value(Anlky);
                    } else {
                        $("#HdrSec7_CmbAnl4_Cd").data("kendoComboBox").value("");
                        $("#HdrSec7_CmbAnl4_Nm").data("kendoComboBox").value("");
                    }
                }

            },
            filter: "startswith",
            suggest: true,
            placeholder: "Select an Analysis 4"
        });

    $("#HdrSec7_CmbAnl4_Cd")
        .kendoComboBox({
            dataValueField: "CdKy",
            dataTextField: "Code",
            dataSource: CdMasCd("HdrSec7_CmbAnl4"), //AnalysisCd(1, "HdrSec8_CmbAnl1"),
            change: function(e) {
                var cmb = $("#HdrSec7_CmbAnl4_Cd").data("kendoComboBox");
                var Anlky = cmb.value();
                if (Anlky != "") {
                    var validate = ComboValidations("HdrSec7_CmbAnl4_Cd");
                    if (validate) {
                        $("#HdrSec7_CmbAnl4_Cd").data("kendoComboBox").value(Anlky);
                        $("#HdrSec7_CmbAnl4_Nm").data("kendoComboBox").value(Anlky);

                    } else {

                        $("#HdrSec7_CmbAnl4_Cd").data("kendoComboBox").value("");
                        $("#HdrSec7_CmbAnl4_Nm").data("kendoComboBox").value("");
                    }
                }

            },
            filter: "startswith",
            suggest: true,
            placeholder: "Select an Analysis 4"
        });
    //Analysis 05
    $("#HdrSec7_CmbAnl5_Nm")
        .kendoComboBox({
            dataValueField: "CdKy",
            dataTextField: "Name",
            dataSource: CdMasNm("HdrSec7_CmbAnl5"),
            change: function(e) {
                var cmb = $("#HdrSec7_CmbAnl5_Nm").data("kendoComboBox");
                var Anlky = cmb.value();
                if (Anlky != "") {
                    var validate = ComboValidations("HdrSec7_CmbAnl5_Nm");
                    if (validate) {
                        $("#HdrSec7_CmbAnl5_Cd").data("kendoComboBox").value(Anlky);
                        $("#HdrSec7_CmbAnl5_Nm").data("kendoComboBox").value(Anlky);
                    } else {
                        $("#HdrSec7_CmbAnl5_Cd").data("kendoComboBox").value("");
                        $("#HdrSec7_CmbAnl5_Nm").data("kendoComboBox").value("");
                    }
                }

            },
            filter: "startswith",
            suggest: true,
            placeholder: "Select an Analysis 5"
        });

    $("#HdrSec7_CmbAnl5_Cd")
        .kendoComboBox({
            dataValueField: "CdKy",
            dataTextField: "Code",
            dataSource: CdMasCd("HdrSec7_CmbAnl5"), //AnalysisCd(1, "HdrSec8_CmbAnl1"),
            change: function(e) {
                var cmb = $("#HdrSec7_CmbAnl5_Cd").data("kendoComboBox");
                var Anlky = cmb.value();
                if (Anlky != "") {
                    var validate = ComboValidations("HdrSec7_CmbAnl5_Cd");
                    if (validate) {
                        $("#HdrSec7_CmbAnl5_Cd").data("kendoComboBox").value(Anlky);
                        $("#HdrSec7_CmbAnl5_Nm").data("kendoComboBox").value(Anlky);

                    } else {

                        $("#HdrSec7_CmbAnl5_Cd").data("kendoComboBox").value("");
                        $("#HdrSec7_CmbAnl5_Nm").data("kendoComboBox").value("");
                    }
                }

            },
            filter: "startswith",
            suggest: true,
            placeholder: "Select an Analysis 5"
        });

    //Analysis 06
    $("#HdrSec7_CmbAnl6_Nm")
        .kendoComboBox({
            dataValueField: "CdKy",
            dataTextField: "Name",
            dataSource: CdMasNm("HdrSec7_CmbAnl6"),
            change: function(e) {
                var cmb = $("#HdrSec7_CmbAnl6_Nm").data("kendoComboBox");
                var Anlky = cmb.value();
                if (Anlky != "") {
                    var validate = ComboValidations("HdrSec7_CmbAnl6_Nm");
                    if (validate) {
                        $("#HdrSec7_CmbAnl6_Cd").data("kendoComboBox").value(Anlky);
                        $("#HdrSec7_CmbAnl6_Nm").data("kendoComboBox").value(Anlky);
                    } else {
                        $("#HdrSec7_CmbAnl6_Cd").data("kendoComboBox").value("");
                        $("#HdrSec7_CmbAnl6_Nm").data("kendoComboBox").value("");
                    }
                }

            },
            filter: "startswith",
            suggest: true,
            placeholder: "Select an Analysis 6"
        });

    $("#HdrSec7_CmbAnl6_Cd")
        .kendoComboBox({
            dataValueField: "CdKy",
            dataTextField: "Code",
            dataSource: CdMasCd("HdrSec7_CmbAnl6"), //AnalysisCd(1, "HdrSec8_CmbAnl1"),
            change: function(e) {
                var cmb = $("#HdrSec7_CmbAnl6_Cd").data("kendoComboBox");
                var Anlky = cmb.value();
                if (Anlky != "") {
                    var validate = ComboValidations("HdrSec7_CmbAnl6_Cd");
                    if (validate) {
                        $("#HdrSec7_CmbAnl6_Cd").data("kendoComboBox").value(Anlky);
                        $("#HdrSec7_CmbAnl6_Nm").data("kendoComboBox").value(Anlky);

                    } else {

                        $("#HdrSec7_CmbAnl6_Cd").data("kendoComboBox").value("");
                        $("#HdrSec7_CmbAnl6_Nm").data("kendoComboBox").value("");
                    }
                }

            },
            filter: "startswith",
            suggest: true,
            placeholder: "Select an Analysis 6"
        });
    //loan
    $("#HdrSec4_CmbLoan_Cd")
        .kendoComboBox({
            dataValueField: "CdKy",
            dataTextField: "Code",
            dataSource: CdMasCd("HdrSec4_CmbLoan"),
            change: function(e) {
                var cmb = $("#HdrSec4_CmbLoan_Cd").data("kendoComboBox");
                var Cdky = cmb.value();
                if (Cdky != "") {
                    var validate = ComboValidations("HdrSec4_CmbLoan_Cd");
                    if (validate) {
                        $("#HdrSec4_CmbLoan_Cd").data("kendoComboBox").value(Cdky);
                    } else {
                        $("#HdrSec4_CmbLoan_Cd").data("kendoComboBox").value("");
                    }
                }

            },
            filter: "startswith",
            suggest: true,
            placeholder: "Select Loan"
        });
    //LC
    $("#HdrSec4_CmbLC_Cd")
        .kendoComboBox({
            dataValueField: "CdKy",
            dataTextField: "Code",
            dataSource: CdMasCd("HdrSec4_CmbLC"),
            change: function(e) {
                var cmb = $("#HdrSec4_CmbLC_Cd").data("kendoComboBox");
                var Cdky = cmb.value();
                if (Cdky != "") {
                    var validate = ComboValidations("HdrSec4_CmbLC_Cd");
                    if (validate) {
                        $("#HdrSec4_CmbLC_Cd").data("kendoComboBox").value(Cdky);
                    } else {
                        $("#HdrSec4_CmbLC_Cd").data("kendoComboBox").value("");
                    }
                }

            },
            filter: "startswith",
            suggest: true,
            placeholder: "Select an LC"
        });

    $("#HdrSec4_CmbPayMode_Cd")
        .kendoComboBox({
            dataValueField: "CdKy",
            dataTextField: "CdNm",
            dataSource: PaymentCodeDc("HdrSec5_CmbPayMode"),
            change: function(e) {
                var cmb = $("#HdrSec4_CmbPayMode_Cd").data("kendoComboBox");
                var Anlky = cmb.value();
                CheqButtonDisaple();
                if (Anlky != "") {
                    var validate = ComboValidations("HdrSec4_CmbPayMode_Cd");
                    if (validate) {
                        $("#HdrSec4_CmbPayMode_Cd").data("kendoComboBox").value(Anlky);
                        $.ajax({
                            url: urlIsCheq,
                            dataType: "json",
                            type: "POST",
                            data: JSON.stringify({
                                CdKy: Anlky,
                            }),
                            contentType: "application/json; charset=utf-8",
                            success: function(Ischq) {
                                if (Ischq) {
                                    var Vaudate = $("#HdrSec1_DatVouDate_Val").data("kendoDatePicker").value();
                                    $("#HdrSec4_DatChqDate_Val").data("kendoDatePicker").value(Vaudate);
                                } else {
                                    $("#HdrSec4_DatChqDate_Val").data("kendoDatePicker").value("");
                                }

                            }
                        });
                    } else {
                        $("#HdrSec4_CmbPayMode_Cd").data("kendoComboBox").value("");
                    }
                }

            },
            filter: "startswith",
            suggest: true,
            placeholder: "Select a Payment Mode"
        });
    $("#HdrSec6_CmbCurCode_cd")
        .kendoComboBox({
            dataValueField: "CdKy",
            dataTextField: "Code",
            dataSource: CdMasCd("HdrSec1_CmbTrnCurrncy"),
            change: function(e) {
                var cmb = $("#HdrSec6_CmbCurCode_cd").data("kendoComboBox");
                var Crnky = cmb.value();
                if (Crnky != "") {
                    var validate = ComboValidations("HdrSec6_CmbCurCode_cd");
                    if (validate) {
                        $("#HdrSec6_CmbCurCode_cd").data("kendoComboBox").value(Crnky);
                    } else {
                        $("#HdrSec6_CmbCurCode_cd").data("kendoComboBox").value("");
                    }
                }

            },
            filter: "startswith",
            suggest: true,
            placeholder: "Select a Curency"
        });
    //Order
    $("#HdrSec5_CmbOrder_Cd")
        .kendoComboBox({
            dataValueField: "OrdrKy",
            dataTextField: "OrdrCode",
            dataSource: GetOrderCode("HdrSec5_CmbOrder"),
            change: function(e) {
                var cmb = $("#HdrSec5_CmbOrder_Cd").data("kendoComboBox");
                var OrdrKy = cmb.value();
                if (OrdrKy != "") {
                    var validate = ComboValidations("HdrSec5_CmbOrder_Cd");
                    if (validate) {
                        $("#HdrSec5_CmbOrder_Cd").data("kendoComboBox").value(OrdrKy);
                        OrderDet(OrdrKy);
                    } else {
                        $("#HdrSec5_CmbOrder_Cd").data("kendoComboBox").value("");
                    }
                }

            },
            filter: "startswith",
            suggest: true,
            placeholder: "Select a Order"
        });
    //res Adress
    //HdrSec13_CmbResAdr_Cd Name Drop Bottom
    $("#HdrSec5_CmbResAdr_Cd")
        .kendoComboBox({
            dataValueField: "AdrKy",
            dataTextField: "AdrCode",
            dataSource: AdressCd("HdrSec5_CmbResAdr"),
            change: function(e) {
                var cmb = $("#HdrSec5_CmbResAdr_Cd").data("kendoComboBox");
                var AdrKy = cmb.value();
                if (AdrKy != "") {
                    var validate = ComboValidations("HdrSec5_CmbResAdr_Cd");
                    if (validate) {
                        $("#HdrSec5_CmbResAdr_Cd").data("kendoComboBox").value(AdrKy);
                    } else {
                        $("#HdrSec5_CmbResAdr_Cd").data("kendoComboBox").value("");
                    }
                }

            },
            filter: "startswith",
            suggest: true,
            placeholder: "Select an Address"
        });
    $("#HdrSec5_CmbBank_Cd")
        .kendoComboBox({
            dataValueField: "BankKy",
            dataTextField: "BankCode",
            dataSource: BanckCodeMob("HdrSec5_CmbBank"),
            change: function(e) {
                var cmb = $("#HdrSec5_CmbBank_Cd").data("kendoComboBox");
                var BnkKy = cmb.value();
                if (BnkKy != "") {
                    var validate = ComboValidations("HdrSec5_CmbBank_Cd");
                    if (validate) {
                        $("#HdrSec5_CmbBank_Cd").data("kendoComboBox").value(BnkKy);
                        BranchLoad();
                    } else {
                        $("#HdrSec5_CmbBank_Cd").data("kendoComboBox").value("");

                    }
                }

            },
            filter: "startswith",
            suggest: true,
            placeholder: "Select a Bank"
        });
    $("#HdrSec7_CmbAnl1_Cd").parent().css("width", "43%");
    $("#HdrSec7_CmbAnl1_Nm").parent().css("width", "54%");
    $("#HdrSec7_CmbAnl2_Cd").parent().css("width", "43%");
    $("#HdrSec7_CmbAnl2_Nm").parent().css("width", "54%");
    $("#HdrSec7_CmbAnl3_Cd").parent().css("width", "43%");
    $("#HdrSec7_CmbAnl3_Nm").parent().css("width", "54%");
    $("#HdrSec7_CmbAnl4_Cd").parent().css("width", "43%");
    $("#HdrSec7_CmbAnl4_Nm").parent().css("width", "54%");
    $("#HdrSec7_CmbAnl5_Cd").parent().css("width", "43%");
    $("#HdrSec7_CmbAnl5_Nm").parent().css("width", "54%");
    $("#HdrSec7_CmbAnl6_Cd").parent().css("width", "43%");
    $("#HdrSec7_CmbAnl6_Nm").parent().css("width", "54%");
    $("#HdrSec6_CmbCurCode_cd").parent().css("width", "100%");


}

function BranchLoad() {
    $("#HdrSec5_CmbBranch_Cd")
        .kendoComboBox({
            dataValueField: "BrachKy",
            dataTextField: "BrachCode",
            dataSource: BranchCodeMob("HdrSec5_CmbBranch"),
            change: function(e) {
                var cmb = $("#HdrSec5_CmbBranch_Cd").data("kendoComboBox");
                var BranchKy = cmb.value();
                if (BranchKy != "") {
                    var validate = ComboValidations("HdrSec6_CmbBank_Cd");
                    if (validate) {
                        $("#HdrSec5_CmbBranch_Cd").data("kendoComboBox").value(BranchKy);
                    } else {
                        $("#HdrSec5_CmbBranch_Cd").data("kendoComboBox").value("");
                    }
                }

            },
            filter: "startswith",
            suggest: true,
            placeholder: "Select a Branch"
        });
}

function OrderDet(OrderKey) {
    $("#HdrSec6_CmbOrderDet_Cd")
        .kendoComboBox({
            dataValueField: "OrdrKy",
            dataTextField: "OrdrCode",
            dataSource: GetOrderDetCode("HdrSec6_CmbOrder", OrderKey),
            change: function(e) {
                var cmb = $("#HdrSec6_CmbOrderDet_Cd").data("kendoComboBox");
                var HdrSec6_CmbOrderDet_Cd = cmb.value();
                if (HdrSec6_CmbOrderDet_Cd != "") {
                    var validate = ComboValidations("HdrSec6_CmbOrderDet_Cd");
                    if (validate) {
                        $("#HdrSec6_CmbOrderDet_Cd").data("kendoComboBox").value(HdrSec6_CmbOrderDet_Cd);
                    } else {
                        $("#HdrSec6_CmbOrderDet_Cd").data("kendoComboBox").value("");
                    }
                }

            },
            filter: "startswith",
            suggest: true,
            placeholder: "Select a OrdrDet"
        });
    $("#HdrSec6_CmbOrderDet_Cd").parent().css("width", "100%");
}

function LoadAccounts() {
    //Account Dropdown id
    $("#HdrSec3_CmbAcc_Cd")
        .kendoComboBox({
            dataValueField: "AccKy",
            dataTextField: "AccCode",
            dataSource: AccountCodeDatasource("HdrSec3_CmbAcc"),
            change: function(e) {
                var cmb = $("#HdrSec3_CmbAcc_Cd").data("kendoComboBox");
                var AccKy = cmb.value();
                if (AccKy == 1 || AccKy == "") {
                    $("#HdrSec3_CmbAcc_Nm").data("kendoComboBox").value("");
                    $("#HdrSec3_CmbAcc_Cd").data("kendoComboBox").value("");
                    $("#HdrSec3_CmbAdr_Nm").data("kendoComboBox").value("");
                    $("#HdrSec3_CmbAdr_Cd").data("kendoComboBox").value("");
                    $("#HdrSec6_CmbCurCode_cd").data("kendoComboBox").value("");
                    document.getElementById("HdrSec6_InptCurExRate_Val").value = "1.000";
                }
                if (AccKy != "" && AccKy != 1) {
                    var validate = ComboValidations("HdrSec3_CmbAcc_Nm");
                    if (validate) {
                        $("#HdrSec3_CmbAcc_Nm").data("kendoComboBox").value(AccKy);
                        $("#HdrSec3_CmbAcc_Cd").data("kendoComboBox").value(AccKy);
                        GetAccountDetailByAccKy(AccKy);
                        GetAccountBankDetailByAccKy(AccKy);
                        //    detailBULoad();
                    } else {
                        $("#HdrSec3_CmbAcc_Nm").data("kendoComboBox").value("");
                        $("#HdrSec3_CmbAcc_Cd").data("kendoComboBox").value("");
                        $("#HdrSec3_CmbAdr_Nm").data("kendoComboBox").value("");
                        $("#HdrSec3_CmbAdr_Cd").data("kendoComboBox").value("");
                        $("#HdrSec6_CmbCurCode_cd").data("kendoComboBox").value("");
                        document.getElementById("HdrSec6_InptCurExRate_Val").value = "1.000";
                    }
                }


            },
            filter: "startswith",
            suggest: true,
            placeholder: "Select a Accounts.."
        });
    //Account Dropdown Name
    $("#HdrSec3_CmbAcc_Nm")
        .kendoComboBox({
            dataValueField: "AccKy",
            dataTextField: "AccNM",
            dataSource: AccountDatasource("HdrSec3_CmbAcc"),
            change: function(e) {
                var cmb = $("#HdrSec3_CmbAcc_Nm").data("kendoComboBox");
                var AccKy = cmb.value();
                if (AccKy == 1 || AccKy == "") {
                    $("#HdrSec3_CmbAcc_Nm").data("kendoComboBox").value("");
                    $("#HdrSec3_CmbAcc_Cd").data("kendoComboBox").value("");
                    $("#HdrSec3_CmbAdr_Nm").data("kendoComboBox").value("");
                    $("#HdrSec3_CmbAdr_Cd").data("kendoComboBox").value("");
                }
                if (AccKy != "" && AccKy != 1) {
                    var validate = ComboValidations("HdrSec3_CmbAcc_Nm");
                    if (validate) {
                        $("#HdrSec3_CmbAcc_Nm").data("kendoComboBox").value(AccKy);
                        $("#HdrSec3_CmbAcc_Cd").data("kendoComboBox").value(AccKy);
                        GetAccountDetailByAccKy(AccKy);
                        //    detailBULoad();
                    } else {
                        $("#HdrSec3_CmbAcc_Nm").data("kendoComboBox").value("");
                        $("#HdrSec3_CmbAcc_Cd").data("kendoComboBox").value("");
                        $("#HdrSec3_CmbAdr_Nm").data("kendoComboBox").value("");
                        $("#HdrSec3_CmbAdr_Cd").data("kendoComboBox").value("");
                    }
                }

            },
            filter: "startswith",
            suggest: true,
            placeholder: "Select a Accounts.."
        });

    $("#HdrSec3_CmbAcc_Cd").parent().css("width", "40%");
    $("#HdrSec3_CmbAcc_Nm").parent().css("width", "58%");
}

function LoadAddress() {
    //Address Name Drop Bottom
    $("#HdrSec3_CmbAdr_Cd")
        .kendoComboBox({
            dataValueField: "AdrKy",
            dataTextField: "AdrCode",
            dataSource: AddressCode("HdrSec3_CmbAdr"), // DetailAddressCode('HdrSec4_CmbDtlAdr'),
            change: function(e) {
                var cmb = $("#HdrSec3_CmbAdr_Cd").data("kendoComboBox");
                var AdrKy = cmb.value();
                if (AdrKy != "") {
                    var validate = ComboValidations("HdrSec3_CmbAdr_Cd");
                    if (validate) {

                        $("#HdrSec3_CmbAdr_Cd").data("kendoComboBox").value(AdrKy);
                        $("#HdrSec3_CmbAdr_Nm").data("kendoComboBox").value(AdrKy);

                    } else {
                        $("#HdrSec3_CmbAdr_Nm").data("kendoComboBox").value("");
                        $("#HdrSec3_CmbAdr_Cd").data("kendoComboBox").value("");
                    }
                }

            },
            filter: "startswith",
            suggest: true,
            placeholder: "Select an Address"
        });

    //Address Name Drop Bottom
    $("#HdrSec3_CmbAdr_Nm")
        .kendoComboBox({
            dataValueField: "AdrKy",
            dataTextField: "AdrNM",
            dataSource: AddressName("HdrSec3_CmbAdr"), //DetailAddressName('HdrSec4_CmbDtlAdr'),
            change: function(e) {
                var cmb = $("#HdrSec3_CmbAdr_Nm").data("kendoComboBox");
                var AdrKy = cmb.value();
                if (AdrKy != "") {
                    var validate = ComboValidations("HdrSec3_CmbAdr_Nm");
                    if (validate) {

                        $("#HdrSec3_CmbAdr_Nm").data("kendoComboBox").value(AdrKy);
                        $("#HdrSec3_CmbAdr_Cd").data("kendoComboBox").value(AdrKy);

                    } else {

                        $("#HdrSec3_CmbAdr_Nm").data("kendoComboBox").value("");
                        $("#HdrSec3_CmbAdr_Cd").data("kendoComboBox").value("");

                    }
                }

            },
            filter: "startswith",
            suggest: true,
            placeholder: "Select an Address"
        });
    $("#HdrSec3_CmbAdr_Cd").parent().css("width", "40%");
    $("#HdrSec3_CmbAdr_Nm").parent().css("width", "58%");
}

function BuLOad() {
    //BU Code Drop Bottom
    $("#HdrSec3_CmbBU_Cd")
        .kendoComboBox({
            dataValueField: "CdKy",
            dataTextField: "Code",
            dataSource: BUCode("HdrSec3_CmbBU"),
            change: function(e) {
                var cmb = $("#HdrSec3_CmbBU_Cd").data("kendoComboBox");
                var BUKy = cmb.value();
                if (BUKy != "") {
                    var validate = ComboValidations("HdrSec3_CmbBU_Cd");
                    if (validate) {

                        $("#HdrSec3_CmbBU_Cd").data("kendoComboBox").value(BUKy);
                        $("#HdrSec3_CmbBU_Nm").data("kendoComboBox").value(BUKy);
                        // detailBULoad();

                    } else {

                        $("#HdrSec3_CmbBU_Cd").data("kendoComboBox").value("");
                        $("#HdrSec3_CmbBU_Nm").data("kendoComboBox").value("");

                    }
                }

            },
            filter: "startswith",
            suggest: true,
            placeholder: "Select a BU"
        });
    //BU Name Drop Bottom
    $("#HdrSec3_CmbBU_Nm")
        .kendoComboBox({
            dataValueField: "CdKy",
            dataTextField: "Name",
            dataSource: BUName("HdrSec3_CmbBU"),
            change: function(e) {
                var cmb = $("#HdrSec3_CmbBU_Nm").data("kendoComboBox");
                var BUKy = cmb.value();
                if (BUKy != "") {
                    var validate = ComboValidations("HdrSec3_CmbBU_Nm");
                    if (validate) {

                        $("#HdrSec3_CmbBU_Cd").data("kendoComboBox").value(BUKy);
                        $("#HdrSec3_CmbBU_Nm").data("kendoComboBox").value(BUKy);
                        // detailBULoad();
                    } else {

                        $("#HdrSec3_CmbBU_Cd").data("kendoComboBox").value("");
                        $("#HdrSec3_CmbBU_Nm").data("kendoComboBox").value("");

                    }
                }

            },
            filter: "startswith",
            suggest: true,
            placeholder: "Select an BU"
        });
    $("#HdrSec3_CmbBU_Cd").parent().css("width", "40%");
    $("#HdrSec3_CmbBU_Nm").parent().css("width", "58%");
}

function Project() {
    //Project Code Drop Bottom
    $("#HdrSec3_CmbPrj_Cd")
        .kendoComboBox({
            dataValueField: "PrjKy",
            dataTextField: "PrjCd",
            dataSource: ProjectCd("HdrSec3_CmbPrj"),
            change: function(e) {
                var cmb = $("#HdrSec3_CmbPrj_Cd").data("kendoComboBox");
                var PrjKy = cmb.value();
                if (PrjKy != "") {
                    var validate = ComboValidations("HdrSec3_CmbPrj_Cd");
                    if (validate) {
                        $("#HdrSec3_CmbPrj_Cd").data("kendoComboBox").value(PrjKy);
                        $("#HdrSec3_CmbPrj_Nm").data("kendoComboBox").value(PrjKy);
                        Task(PrjKy);
                    } else {
                        $("#HdrSec3_CmbPrj_Cd").data("kendoComboBox").value("");
                        $("#HdrSec3_CmbPrj_Nm").data("kendoComboBox").value("");
                    }
                }

            },
            filter: "startswith",
            suggest: true,
            placeholder: "Select a Project"
        });
    //Project Name Drop Bottom
    $("#HdrSec3_CmbPrj_Nm")
        .kendoComboBox({
            dataValueField: "PrjKy",
            dataTextField: "PrjNm",
            dataSource: ProjectNm("HdrSec3_CmbPrj"),
            change: function(e) {
                var cmb = $("#HdrSec3_CmbPrj_Nm").data("kendoComboBox");
                var PrjKy = cmb.value();
                if (PrjKy != "") {
                    var validate = ComboValidations("HdrSec3_CmbPrj_Nm");
                    if (validate) {

                        $("#HdrSec3_CmbPrj_Cd").data("kendoComboBox").value(PrjKy);
                        $("#HdrSec3_CmbPrj_Nm").data("kendoComboBox").value(PrjKy);
                        //$("#HdrSec3_CmbTsk_Cd").data("kendoComboBox").value("");
                        //$("#HdrSec3_CmbTsk_Nm").data("kendoComboBox").value("");

                        Task(PrjKy);
                    } else {
                        $("#HdrSec3_CmbPrj_Cd").data("kendoComboBox").value("");
                        $("#HdrSec3_CmbPrj_Nm").data("kendoComboBox").value("");
                        $("#HdrSec3_CmbTsk_Cd").data("kendoComboBox").value("");
                        $("#HdrSec3_CmbTsk_Nm").data("kendoComboBox").value("");

                    }
                }

            },
            filter: "startswith",
            suggest: true,
            placeholder: "Select an Project"
        });

    $("#HdrSec3_CmbPrj_Cd").parent().css("width", "40%");
    $("#HdrSec3_CmbPrj_Nm").parent().css("width", "58%");
}

function Task(PrjKy) {
    //Task Code Drop Bottom
    $("#HdrSec3_CmbTsk_Cd")
        .kendoComboBox({
            dataValueField: "PrsDetKy",
            dataTextField: "PrsDetCode",
            dataSource: TaskCode("HdrSec3_CmbTsk", PrjKy),
            change: function(e) {
                var cmb = $("#HdrSec3_CmbTsk_Cd").data("kendoComboBox");
                var PrDetKy = cmb.value();
                if (PrDetKy != "") {
                    var validate = ComboValidations("HdrSec3_CmbTsk_Cd");
                    if (validate) {

                        $("#HdrSec3_CmbTsk_Cd").data("kendoComboBox").value(PrDetKy);
                        $("#HdrSec3_CmbTsk_Nm").data("kendoComboBox").value(PrDetKy);

                    } else {

                        $("#HdrSec3_CmbTsk_Cd").data("kendoComboBox").value("");
                        $("#HdrSec3_CmbTsk_Nm").data("kendoComboBox").value("");
                    }
                }

            },
            filter: "startswith",
            suggest: true,
            placeholder: "Select a Task"
        });
    //Task Name Drop Bottom
    $("#HdrSec3_CmbTsk_Nm")
        .kendoComboBox({
            dataValueField: "PrsDetKy",
            dataTextField: "PrsDetNM",
            dataSource: TaskNm("HdrSec3_CmbTsk", PrjKy),
            change: function(e) {
                var cmb = $("#HdrSec3_CmbTsk_Nm").data("kendoComboBox");
                var PrDetKy = cmb.value();
                if (PrDetKy != "") {
                    var validate = ComboValidations("HdrSec3_CmbTsk_Nm");
                    if (validate) {

                        $("#HdrSec3_CmbTsk_Cd").data("kendoComboBox").value(PrDetKy);
                        $("#HdrSec3_CmbTsk_Nm").data("kendoComboBox").value(PrDetKy);

                    } else {

                        $("#HdrSec3_CmbTsk_Cd").data("kendoComboBox").value("");
                        $("#HdrSec3_CmbTsk_Nm").data("kendoComboBox").value("");
                    }
                }

            },
            filter: "startswith",
            suggest: true,
            placeholder: "Select an Task"
        });

    $("#HdrSec3_CmbTsk_Cd").parent().css("width", "40%");
    $("#HdrSec3_CmbTsk_Nm").parent().css("width", "58%");
}

//Get Details By sending accountkey
function GetAccountBankDetailByAccKy(AccKy) {
    $.ajax({
        url: UrlBankDetailSelect,
        data: JSON.stringify({
            AccKy: AccKy,
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "Json",
        type: "POST",
        success: function(data) {
            if (data.length != 0) {
                var BranchKy = data[0].BranchKy;
                var BankKy = data[0].BankKy;
                $("#HdrSec5_CmbBank_Cd").data("kendoComboBox").value(BankKy);
                BranchLoad();
                $("#HdrSec5_CmbBranch_Cd").data("kendoComboBox").value(BranchKy);
            } else {
                $("#HdrSec5_CmbBranch_Cd").data("kendoComboBox").value("1");
                BranchLoad();
                $("#HdrSec5_CmbBranch_Cd").data("kendoComboBox").value("1");


            }

        },
        error: function(e) {
            return false;
        }
    });

}
//__________________________________________________________________________________________________________________________
//DataSource
//CdMas 

function CdMasCd(ObjNm) {
    var ObjKy = GetObjKy(ObjNm);
    var PreKy = 1;

    var dataSource = new kendo.data.DataSource(
        {
            transport: {
                read: {
                    url: urlGetCdMasCode,
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

function CdMasNm(ObjNm) {
    var ObjKy = GetObjKy(ObjNm);
    var PreKy = 1;

    var dataSource = new kendo.data.DataSource(
        {
            transport: {
                read: {
                    url: urlGetCdMasNm,
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

function GetOrderCode(ObjNm) {
    var ObjKy = GetObjKy(ObjNm);
    var dataSource = new kendo.data.DataSource(
        {
            transport: {
                read: {
                    url: urlGetOrderNo,
                    data: {
                        'ObjKy': ObjKy,
                    },
                    dataType: "json"
                }
            }

        });
    return dataSource;
}

function AdressCd(ObjNm) {
    var ObjKy = GetObjKy(ObjNm);
    var dataSource = new kendo.data.DataSource(
        {
            transport: {
                read: {
                    url: urlGetAddressCd,
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

function PaymentCodeDc(ObjNm) {
    var ObjKy = GetObjKy(ObjNm);
    var dataSource = new kendo.data.DataSource(
        {
            transport: {
                read: {
                    url: urlGetPaymentCode,
                    data: {
                        'ObjKy': ObjKy,
                    },
                    dataType: "json"
                }
            }

        });
    return dataSource;

}

//____Bank Code 
function BanckCodeMob(ObjNm) {
    var ObjKy = GetObjKy(ObjNm);

    var dataSource = new kendo.data.DataSource(
        {
            transport: {
                read: {
                    url: urlGetBankCode,
                    data: {
                        'ObjKy': ObjKy
                    },
                    dataType: "json"
                }
            }

        });
    return dataSource;
}

//____branch code 
function BranchCodeMob(ObjNm) {
    var ObjKy = GetObjKy(ObjNm);

    var BankKy = document.getElementById("HdrSec5_CmbBank_Cd").value;
    if (!BankKy || BankKy == null) {
        BankKy = 1;
    }
    var dataSource = new kendo.data.DataSource(
        {
            transport: {
                read: {
                    url: urlGetBranchode,
                    data: {
                        'ObjKy': ObjKy,
                        'BankKy': BankKy
                    },
                    dataType: "json"
                }
            }

        });
    return dataSource;
}

function GetOrderDetCode(ObjNm, OrderKey) {
    var ObjKy = GetObjKy(ObjNm);
    var dataSource = new kendo.data.DataSource(
        {
            transport: {
                read: {
                    url: urlGetOrderDet,
                    data: {
                        'ObjKy': ObjKy,
                        'OrdrKy': OrderKey,
                    },
                    dataType: "json"
                }
            }

        });
    return dataSource;
}

//____Account Data Soure
function AccountCodeDatasource(ObjNm) {
    var ObjKy = GetObjKy(ObjNm);
    var multiCredit;

    if ($("#HdrSec1_Chkbox_multi_Val").is(":checked")) {
        multiCredit = 1;
    } else {
        multiCredit = 0;
    }
    var preKey = 0;
    if ((multiCredit == 0 && FirstinsetDetail.LineNo == 1) || (multiCredit == 1 && FirstinsetDetail.LineNo == 2)) {
        preKey = 0;
    } else if ((multiCredit == 1 && FirstinsetDetail.LineNo === 1) ||
        (multiCredit == 0 && FirstinsetDetail.LineNo == 2)) {
        preKey = 1;
    }
    var dataSource = new kendo.data.DataSource(
        {
            transport: {
                read: {
                    url: urlAccCode,
                    data: {
                        'MultiCredit': preKey, //multiCredit,
                        'OurCode': viewBag.OurCd,
                        'ObjKy': ObjKy,
                    },
                    dataType: "json"
                }
            }

        });
    return dataSource;
}

//Hdr Accounts
function AccountDatasource(ObjNm) {

    var ObjKy = GetObjKy(ObjNm);

    var multiCredit;

    if ($("#HdrSec1_Chkbox_multi_Val").is(":checked")) {
        multiCredit = 1;
    } else {
        multiCredit = 0;
    }
    var preKey = 0;
    if ((multiCredit == 0 && FirstinsetDetail.LineNo == 1) || (multiCredit == 1 && FirstinsetDetail.LineNo == 2)) {
        preKey = 0;
    } else if ((multiCredit == 1 && FirstinsetDetail.LineNo == 1) ||
        (multiCredit == 0 && FirstinsetDetail.LineNo == 2)) {
        preKey = 1;
    }

    // var OurCodePara = OurCode;
    var dataSource = new kendo.data.DataSource(
        {
            transport: {
                read: {
                    url: urlAccNme,
                    data: {
                        'MultiCredit': preKey, //multiCredit,
                        'OurCode': viewBag.OurCd,
                        'ObjKy': ObjKy,

                    },
                    dataType: "json"
                }
            }

        });
    return dataSource;
}

//Adress Code Combo
function AddressCode(ObjNm) {
    var ObjKy = GetObjKy(ObjNm);
    var dataSource = new kendo.data.DataSource(
        {
            transport: {
                read: {
                    url: urlGetAddressCd,
                    data: {
                        'ObjKy': ObjKy,
                    },
                    dataType: "json"
                }
            }

        });
    return dataSource;

}

function AddressName(ObjNm) {
    var ObjKy = GetObjKy(ObjNm);

    var dataSource = new kendo.data.DataSource(
        {
            transport: {
                read: {
                    url: urlGetAddressNm,
                    data: {
                        'ObjKy': ObjKy,
                    },
                    dataType: "json"
                }
            }

        });
    return dataSource;

}

function BUCode(ObjNm) {
    var ObjKy = GetObjKy(ObjNm);
    var PreKy = FirstinsetDetail.BUKey; //"1"//("#HdrSec2_CmbBU_Cd").data("kendoComboBox").value();
    if (PreKy == "") {
        PreKy = 1;
    }

    var dataSource = new kendo.data.DataSource(
        {
            transport: {
                read: {
                    url: urlGetCdMasCode,
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

function BUName(ObjNm) {
    var ObjKy = GetObjKy(ObjNm);

    var PreKy = "1"; //("#HdrSec2_CmbBU_Cd").data("kendoComboBox").value();
    if (PreKy == "") {
        PreKy = 1;
    }

    var dataSource = new kendo.data.DataSource(
        {
            transport: {
                read: {
                    url: urlGetCdMasNm,
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

//____Project data source
function ProjectCd(ObjNm) {
    var ObjKy = GetObjKy(ObjNm);

    var dataSource = new kendo.data.DataSource(
        {
            transport: {
                read: {
                    url: urlGetProjectCode,
                    data: {
                        'ObjKy': ObjKy
                    },
                    dataType: "json"
                }
            }

        });
    return dataSource;
}

function ProjectNm(ObjNm) {
    var ObjKy = GetObjKy(ObjNm);

    var dataSource = new kendo.data.DataSource(
        {
            transport: {
                read: {
                    url: urlGetProjectNm,
                    data: {
                        ObjKy: ObjKy
                    },
                    dataType: "json"
                }
            }

        });
    return dataSource;
}


//____Task
function TaskCode(ObjNm, PrjKy) {
    var ObjKy = GetObjKy(ObjNm);
    //ObjKy = 1;
    //var cmbFmPrjId ="1" //document.getElementById("HdrSec2_CmbPrj_Cd").value;
    //if (!cmbFmPrjId) {
    //    cmbFmPrjId = 1;
    //}

    var dataSource = new kendo.data.DataSource(
        {
            transport: {
                read: {
                    url: urlDetlGetTaskCode,

                    data: {
                        'PrjKy': PrjKy,
                        'ObjKy': ObjKy,
                    },
                    dataType: "json"

                }
            }

        });
    return dataSource;
}

function TaskNm(ObjNm, PrjKy) {
    var ObjKy = GetObjKy(ObjNm);

    //var cmbFmPrjId = "1"//document.getElementById("HdrSec2_CmbPrj_Cd").value;
    //if (!cmbFmPrjId) {
    //    cmbFmPrjId = 1;
    //}

    var dataSource = new kendo.data.DataSource(
        {
            transport: {
                read: {
                    url: urlDetlGetTaskNm,
                    data: {
                        'PrjKy': PrjKy,
                        'ObjKy': ObjKy
                    },
                    dataType: "json"
                }
            }

        });
    return dataSource;
}

function setHdrSectionPropFun() {

    // ---------- Set ObjProperties
    setHdrSectionProp("", viewBag.ObjKy, "", "HdrSec1");
    setHdrSectionProp("", viewBag.ObjKy, "", "HdrSec2");
    setHdrSectionProp("", viewBag.ObjKy, "", "HdrSec3");
    setHdrSectionProp("", viewBag.ObjKy, "", "HdrSec4");
    setHdrSectionProp("", viewBag.ObjKy, "", "HdrSec5");
    setHdrSectionProp("", viewBag.ObjKy, "", "HdrSec6");
    setHdrSectionProp("", viewBag.ObjKy, "", "HdrSec7");


    SetHandlingEnterKeyEvent("", viewBag.ObjKy);
    SetFirstFocusObj();
    // $("#HdrSec1_InptDocNo_Val").focus();
}

//Combo validation funciton THis is a common funtion but this is not working correctly 
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

//Get Details By sending accountkey
function GetAccountDetailByAccKy(AccKy) {
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
        success: function(data) {
            for (i = 0; i < data.length; i++) {

                var AdrKy = data[0].AdrKy;
                var AdrID = data[0].AdrID;
                var AdrNm = data[0].AdrNm;
                var CurncyCd = data[0].CurncyCd;
                var CurncyKy = data[0].CurncyKy;
                var CurncyNm = data[0].CurncyNm;
                var Rate = data[0].Rate;

                $("#HdrSec3_CmbAdr_Cd").data("kendoComboBox").value(AdrKy);
                $("#HdrSec3_CmbAdr_Nm").data("kendoComboBox").value(AdrKy);
                $("#HdrSec6_CmbCurCode_cd").data("kendoComboBox").value(CurncyKy);
                $("#HdrSec6_InptCurExRate_Val").val(Rate);

            }

        },
        error: function(e) {
            return false;
        }
    });

}
//