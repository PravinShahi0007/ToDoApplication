function LoadCombo() {
    LoadDlvDayCombo();
    LoadDlvNoCombo();
    LoadPrjCdCombo();
    LoadLocCdCombo();
    LoadAccComboLoad(1);
    LoadAdrCombo(1);
    LoadDlvToCombo();
    LoadPmtCombo();
    LoadCurCombo();
    //LoadItmCombo();
    LoadAnlyCombo();
    //LoadUnitCombo(1);
    LoadTaskCombo(1);
    ParentOrderCombo(1);

    // Spcl Ord Combo
    LoadOrdOutLet();
    LoadOrdOutLetAdr(1);
    LoadDeliNoTo(1);
    LoadProdTime();
    LoadProdDisptTime();
    LoadCustTime();
    
    $("#HdrSec5_CmbItm_Cd").kendoComboBox({ //for viewing purposes only
        dataValueField: "ItmKy",
        dataTextField: "ItmCd",
        dataSource: [{ ItmKy: 1, ItmCd: " " }],
    });
    $("#HdrSec5_CmbUnit_Cd").kendoComboBox({ //for viewing purposes only
        dataValueField: "UnitKy",
        dataTextField: "Unit",
        dataSource: [{ UnitKy: 1, Unit: " " }],
    });

    //$("#HdrSec2_CmbDeliNoTo_Cd").parent().css('width', "40%");
    ////$("#HdrSec2_CmbDeliNoTo_Nm").parent().css('width', "58%");

    //$("HdrSec1_CmbDay_Cd").parent().css('width', "40%");
    //$("HdrSec1_CmbDeliNo_Cd").css('width', "40%");
    //$("#HdrSec5_CmbItm_Cd").parent().css('width', "31%");
    ////$("#HdrSec5_CmbItm_Nm").parent().css('width', "58%");
    //$("#HdrSec2_CmbPrj_Cd").parent().css('width', "40%");
    //$("#HdrSec3_CmbPmtTrms_Cd").parent().css('width', "100%");
    //$("#HdrSec3_CmbCurrncy_Cd").parent().css('width', "100%");
    //$("#HdrSec2_CmbLoc_Cd").parent().css('width', "40%");
    ////$("#HdrSec2_CmbPrj_Nm").parent().css('width', "58%");
    //$("#HdrSec2_CmbSupAcc_Cd").parent().css('width', "40%");
    ////$("#HdrSec2_CmbSupAcc_Nm").parent().css('width', "58%");
    ////$("#HdrSec2_CmbLoc_Nm").parent().css('width', "58%");
    //$("#HdrSec5_NmricVatPer_Val").css('width', "100%");
    //$("#HdrSec5_NmricVatAmt_Val").css('width', "100%");
    //$("#HdrSec5_NmricSVatPer_Val").css('width', "100%");
    //$("#HdrSec5_NmricSVatAmt_Val").css('width', "100%");
    //$("#HdrSec5_NmricNbtPer_Val").css('width', "100%");
    //$("#HdrSec5_NmricNbtAmt_Val").css('width', "100%");
    //$("#HdrSec5_NmricWhtPer_Val").css('width', "100%");
    //$("#HdrSec5_NmricWhtAmt_Val").css('width', "100%");
    //$("#HdrSec5_NmricPRQty_Val").css('width', "100%");
    //$("#HdrSec5_CmbUnit_Cd").parent().css('width', "100%");
    //$("#HdrSec5_CmbAnaly_Cd").parent().css('width', "100%");
    //$("#HdrSec5_CmbTask_Cd").parent().css('width', "100%");
    //$("#HdrSec5_NmricLiNo_Val").css('width', "100%");


    //$("#HdrSec3_CmbProdTime_Cd").parent().css('width', "100%");
    //$("#HdrSec3_CmbProdDisptTime_Cd").parent().css('width', "100%");
    //$("#HdrSec3_CmbCustTime_Cd").parent().css('width', "100%");
}

function ParentOrderCombo(prjky)
{
    $("#HdrSec1_CmbPOrdNo_Cd").kendoComboBox({
        dataValueField: "OrdKy",
        dataTextField: "OrdNo",
        dataSource: OrdNo_SelectMob_Datasource('HdrSec1_CmbPOrdNo', prjky),
        change: function (e) {
            var cmb = $("#HdrSec1_CmbPOrdNo_Cd").data("kendoComboBox");
            var val = cmb.value();

            if (isNaN(val)) {
                alert("'" + val + "' is not a Valid input");
                cmb.value("");
            }
        },
        filter: "startswith",
        suggest: true,
        placeholder: "Select OrdNo"
    });
}

function LoadDlvDayCombo() {
    $("#HdrSec1_CmbDay_Cd").kendoComboBox({
        dataValueField: "CdKy",
        dataTextField: "CdNm",
        dataSource: OrdDayDatasource(),
        change: function (e) {
            var cmb = $("#HdrSec1_CmbDay_Cd").data("kendoComboBox");
            var CdKy = cmb.value();
            if (CdKy != "") {
                var validate = ComboValidations("HdrSec1_CmbDay_Cd");
                if (validate) {
                    $("#HdrSec1_CmbDay_Cd").data("kendoComboBox").value(CdKy);
                    FormGlblData.IsDetailRelatedHdrSectionChanged = true;
                    setDefault();
                } else {
                    $("#HdrSec1_CmbDay_Cd").data("kendoComboBox").value("");
                }
            }
        },
        filter: "contains",
        suggest: true,
        placeholder: "Select a day.."
    });
}

function LoadDlvNoCombo() {
    $("#HdrSec1_CmbDeliNo_Cd").kendoComboBox({
        dataValueField: "CdKy",
        dataTextField: "Code",
        dataSource: DlvNoDatasource(),
        change: function (e) {
            var cmb = $("#HdrSec1_CmbDeliNo_Cd").data("kendoComboBox");
            var CdKy = cmb.value();
            if (CdKy != "") {
                var validate = ComboValidations("HdrSec1_CmbDeliNo_Cd");
                if (validate) {
                    $("#HdrSec1_CmbDeliNo_Cd").data("kendoComboBox").value(CdKy);
                    FormGlblData.IsDetailRelatedHdrSectionChanged = true;
                    setDefault();
                } else {
                    $("#HdrSec1_CmbDeliNo_Cd").data("kendoComboBox").value("");
                }
            }
        },
        filter: "contains",
        suggest: true,
        placeholder: "Select a dlv no.."
    });
}

function LoadPrjCdCombo() {
    $("#HdrSec2_CmbPrj_Cd").kendoComboBox({
        dataValueField: "PrjKy",
        dataTextField: "PrjId",
        dataSource: GetPrjID_SelectMobDataSource('HdrSec2_CmbPrj'),
        change: function (e) {
            var cmb = $("#HdrSec2_CmbPrj_Cd").data("kendoComboBox");
            var prjky = cmb.value();
            if (prjky != "") {
                var validate = ComboValidations("HdrSec2_CmbPrj_Cd");
                if (validate) {
                    $("#HdrSec2_CmbPrj_Cd").data("kendoComboBox").value(prjky);
                    //$("#HdrSec2_CmbPrj_Nm").data("kendoComboBox").value(prjky);
                    ParentOrderCombo(prjky);
                    FormGlblData.IsDetailRelatedHdrSectionChanged = true;
                    setDefault();
                } else {
                    $("#HdrSec2_CmbPrj_Cd").data("kendoComboBox").value("");
                    //$("#HdrSec2_CmbPrj_Nm").data("kendoComboBox").value("");
                }
            }
        },
        filter: "contains",
        suggest: true,
        placeholder: "Select a From Project.."
    });

    //$("#HdrSec2_CmbPrj_Nm").kendoComboBox({
    //    dataValueField: "PrjKy",
    //    dataTextField: "PrjNm",
    //    dataSource: GetPrjNm_SelectMobDataSource('HdrSec2_CmbPrj'),
    //    change: function (e) {
    //        var cmb = $("#HdrSec2_CmbPrj_Nm").data("kendoComboBox");
    //        var prjky = cmb.value();
    //        if (prjky != "") {
    //            var validate = ComboValidations("HdrSec2_CmbPrj_Nm");
    //            if (validate) {
    //                $("#HdrSec2_CmbPrj_Cd").data("kendoComboBox").value(prjky);
    //                $("#HdrSec2_CmbPrj_Nm").data("kendoComboBox").value(prjky);
    //                ParentOrderCombo(prjky);
    //                FormGlblData.IsDetailRelatedHdrSectionChanged = true;
    //                setDefault();
    //            } else {
    //                $("#HdrSec2_CmbPrj_Nm").data("kendoComboBox").value("");
    //                $("#HdrSec2_CmbPrj_Cd").data("kendoComboBox").value("");
    //            }
    //        }
    //    },
    //    filter: "contains",
    //    suggest: true,
    //    placeholder: "Select a From Project.."
    //});
}

function LoadLocCdCombo() {
    $("#HdrSec2_CmbLoc_Cd").kendoComboBox({
        dataValueField: "CdKy",
        dataTextField: "Code",
        dataSource: dataSrcCreateCodeCdMasLookUp('HdrSec2_CmbLoc'),
        change: function (e) {
            var cmb = $("#HdrSec2_CmbLoc_Cd").data("kendoComboBox");
            var CdKy = cmb.value();
            if (CdKy != "") {
                var validate = ComboValidations("HdrSec2_CmbLoc_Cd");
                if (validate) {
                    //$("#HdrSec2_CmbLoc_Nm").data("kendoComboBox").value(CdKy);
                    $("#HdrSec2_CmbLoc_Cd").data("kendoComboBox").value(CdKy);
                    FormGlblData.IsDetailRelatedHdrSectionChanged = true;
                    setDefault();
                    LoadItmCombo();
                } else {
                    //$("#HdrSec2_CmbLoc_Nm").data("kendoComboBox").value("");
                    $("#HdrSec2_CmbLoc_Cd").data("kendoComboBox").value("");
                }
            }
        },
        filter: "contains",
        suggest: true,
        placeholder: "Select a From Location.."
    });

    //$("#HdrSec2_CmbLoc_Nm").kendoComboBox({
    //    dataValueField: "CdKy",
    //    dataTextField: "CdNm",
    //    dataSource: dataSrcCreateCdNmCdMasLookUp('HdrSec2_CmbLoc'),
    //    change: function (e) {
    //        var cmb = $("#HdrSec2_CmbLoc_Nm").data("kendoComboBox");
    //        var CdKy = cmb.value();
    //        if (CdKy != "") {
    //            var validate = ComboValidations("HdrSec2_CmbLoc_Nm");
    //            if (validate) {
    //                $("#HdrSec2_CmbLoc_Cd").data("kendoComboBox").value(CdKy);
    //                $("#HdrSec2_CmbLoc_Nm").data("kendoComboBox").value(CdKy);
    //                FormGlblData.IsDetailRelatedHdrSectionChanged = true;
    //                setDefault();
    //                LoadItmCombo();
    //            } else {
    //                $("#HdrSec2_CmbLoc_Nm").data("kendoComboBox").value("");
    //                $("#HdrSec2_CmbLoc_Cd").data("kendoComboBox").value("");
    //            }
    //        }
    //    },
    //    filter: "contains",
    //    suggest: true,
    //    placeholder: "Select a From Location.."
    //});
}

function LoadAccComboLoad(PreKy) {

    PreKy = Number(PreKy);

    $("#HdrSec2_CmbSupAcc_Cd").kendoComboBox({
        dataValueField: "AccKy",
        dataTextField: "AccCd",
        dataSource: AccCdDatasource('HdrSec2_CmbSupAcc', 1),
        change: function (e) {
            var cmb = $("#HdrSec2_CmbSupAcc_Cd").data("kendoComboBox");
            var AccKy = cmb.value();
            if (AccKy != "") {
                var validate = ComboValidations("HdrSec2_CmbSupAcc_Cd");
                if (validate) {
                    //$("#HdrSec2_CmbSupAcc_Nm").data("kendoComboBox").value(AccKy);
                    $("#HdrSec2_CmbSupAcc_Cd").data("kendoComboBox").value(AccKy);
                    FormGlblData.IsDetailRelatedHdrSectionChanged = true;
                    LoadAdrComboByAcc(AccKy);
                    setDefault();
                } else {
                    //$("#HdrSec2_CmbSupAcc_Nm").data("kendoComboBox").value("");
                    $("#HdrSec2_CmbSupAcc_Cd").data("kendoComboBox").value("");
                }
            }
        },
        filter: "contains",
        suggest: true,
        placeholder: "Select a Account.."
    });

    //$("#HdrSec2_CmbSupAcc_Nm").kendoComboBox({
    //    dataValueField: "AccKy",
    //    dataTextField: "AccNm",
    //    dataSource: AccNmDatasource('HdrSec2_CmbSupAcc', 1),
    //    change: function (e) {
    //        var cmb = $("#HdrSec2_CmbSupAcc_Nm").data("kendoComboBox");
    //        var AccKy = cmb.value();
    //        if (AccKy != "") {
    //            var validate = ComboValidations("HdrSec2_CmbSupAcc_Nm");
    //            if (validate) {
    //                $("#HdrSec2_CmbSupAcc_Nm").data("kendoComboBox").value(AccKy);
    //                $("#HdrSec2_CmbSupAcc_Cd").data("kendoComboBox").value(AccKy);
    //                FormGlblData.IsDetailRelatedHdrSectionChanged = true;
    //                GetAdrKyByAccKy(AccKy);
    //                setDefault();
    //            } else {
    //                $("#HdrSec2_CmbSupAcc_Nm").data("kendoComboBox").value("");
    //                $("#HdrSec2_CmbSupAcc_Cd").data("kendoComboBox").value("");
    //            }
    //        }
    //    },
    //    filter: "contains",
    //    suggest: true,
    //    placeholder: "Select a Account.."
    //});
}

function LoadDlvToCombo() { }

function LoadPmtCombo() {

    $("#HdrSec3_CmbPmtTrms_Cd").kendoComboBox({
        dataValueField: "CdKy",
        dataTextField: "Code",
        dataSource: dataSrcCreateCodeCdMasLookUp('HdrSec3_CmbPmtTrms'),
        change: function (e) {
            var cmb = $("#HdrSec3_CmbPmtTrms_Cd").data("kendoComboBox");
            var PreKy = cmb.value();
            if (PreKy != "") {
                var validate = ComboValidations("HdrSec3_CmbPmtTrms_Cd");
                if (validate) {
                    $("#HdrSec3_CmbPmtTrms_Cd").val(PreKy);
                    FormGlblData.IsDetailRelatedHdrSectionChanged = true;
                    LoadAccComboLoad(PreKy);
                    LoadAdrCombo(PreKy);
                }
                else {
                    $("#HdrSec3_CmbPmtTrms_Cd").data("kendoComboBox").value(null);
                }
            }
        },
        filter: "contains",
        suggest: true,
        placeholder: "Select a Pmt Trm.."
    });

}

function LoadCurCombo() {
    $("#HdrSec3_CmbCurrncy_Cd").kendoComboBox({
        dataValueField: "CdKy",
        dataTextField: "Code",
        dataSource: CurrencyDatasource(),
        change: function (e) {
            var cmb = $("#HdrSec3_CmbCurrncy_Cd").data("kendoComboBox");
            var cur = cmb.value();
            if (cur != "") {
                var validate = ComboValidations("HdrSec3_CmbCurrncy_Cd");
                if (validate) {
                    $("#HdrSec3_CmbCurrncy_Cd").data("kendoComboBox").value(cur);
                    $("#HdrSec3_CmbCurrncy_Cd").data("kendoComboBox").value(cur);
                    FormGlblData.IsDetailRelatedHdrSectionChanged = true;
                    //LoadGridView1(cur);
                } else {
                    $("#HdrSec3_CmbCurrncy_Cd").data("kendoComboBox").value("");
                    $("#HdrSec3_CmbCurrncy_Cd").data("kendoComboBox").value("");
                }
            }
        },
        filter: "contains",
        suggest: true,
        placeholder: "Select a Currency.."
    });   
}

function ClearDetFilelds()
{
    $("#HdrSec5_NmricQty_Val").data("kendoNumericTextBox").value(0);
    $("#HdrSec5_NmricRate_Val").data("kendoNumericTextBox").value(0);
    $("#HdrSec5_NmricTrnRate_Val").data("kendoNumericTextBox").value(0);
    $("#HdrSec5_NmricDisPer_Val").data("kendoNumericTextBox").value(0);
    $("#HdrSec5_NmricDOHPer_Val").data("kendoNumericTextBox").value(0);
    $("#HdrSec5_NmricGOHPer_Val").data("kendoNumericTextBox").value(0);
    $("#HdrSec5_NmricProfitPer_Val").data("kendoNumericTextBox").value(0);
    $("#HdrSec5_NmricDisAmt_Val").data("kendoNumericTextBox").value(0);
    $("#HdrSec5_NmricVatAmt_Val").data("kendoNumericTextBox").value(0);
    $("#HdrSec5_NmricVatPer_Val").data("kendoNumericTextBox").value(0);
    $("#HdrSec5_NmricVatAmt_Val").data("kendoNumericTextBox").value(0);
    $("#HdrSec5_NmricSVatPer_Val").data("kendoNumericTextBox").value(0);
    $("#HdrSec5_NmricSVatAmt_Val").data("kendoNumericTextBox").value(0);
    $("#HdrSec5_NmricNbtPer_Val").data("kendoNumericTextBox").value(0);
    $("#HdrSec5_NmricNbtAmt_Val").data("kendoNumericTextBox").value(0);
    $("#HdrSec5_NmricWhtPer_Val").data("kendoNumericTextBox").value(0);
    $("#HdrSec5_NmricWhtAmt_Val").data("kendoNumericTextBox").value(0);
    $("#HdrSec5_NmricLiNo_Val").data("kendoNumericTextBox").value(0);

    $("#HdrSec5_NmricSubTotal_Val").data("kendoNumericTextBox").value(0);
    $("#HdrSec5_CmbItm_Cd").data('kendoComboBox').value(null);
    //$("#HdrSec5_CmbItm_Nm").data('kendoComboBox').value(null);
    $("#HdrSec5_TxtBoxItmNo_Val").val(null);
    
    $("#HdrSec5_CmbTask_Cd").data('kendoComboBox').value(null);
    $("#HdrSec5_CmbUnit_Cd").data('kendoComboBox').value(null);
    $("#HdrSec5_TxtDes_Val").val(null);
    $("#HdrSec5_TxtRem_Val").val(null);
    $("#HdrSec5_CmbItmLdd_Lbl").text('');
}

function LoadItmCombo() {

    $("#HdrSec5_CmbItm_Cd").kendoComboBox({
        dataValueField: "ItmKy",
        dataTextField: "ItmCd",
        dataSource: ItmCdDatasource('HdrSec5_CmbItm'),
        change: function (e) {
            var comboboxText = $("#HdrSec5_CmbItm_Cd").data("kendoComboBox");
            var cmbText = comboboxText.text();
            var comboboxValue = $("#HdrSec5_CmbItm_Cd").data("kendoComboBox");
            var cmbValue = comboboxValue.value();
            if (cmbValue != 1)
            {
                GetItemQty();
                $("#HdrSec5_CmbItmLdd_Lbl").show();
            }

            else {
                $("#HdrSec5_CmbItmLdd_Lbl").hide();
            }
            
            if ((cmbText == "?") || (cmbText.slice(-1) == "?")) {
            } else {

                var ItmKy = cmbValue; //$("#HdrSec5_CmbItm_Cd").data("kendoComboBox").value();
                //if (ItmKy != "") {
                var validate = ComboValidations("HdrSec5_CmbItm_Cd");
                {
                    if (validate) {
                        $("#HdrSec5_CmbItm_Cd").data("kendoComboBox").value(ItmKy);
                        //$("#HdrSec5_CmbItm_Nm").data("kendoComboBox").value(ItmKy);
                        LoadUnitCombo(ItmKy);
                        //ClearDetFilelds();
                        
                    } else {
                        $("#HdrSec5_CmbItm_Cd").data("kendoComboBox").value("");
                        //$("#HdrSec5_CmbItm_Nm").data("kendoComboBox").value("");
                    }
                }
            }
        },
        filter: "contains",
        suggest: true,
        placeholder: "Select a ItmCd.."
    });

    //$("#HdrSec5_CmbItm_Nm").kendoComboBox({
    //    dataValueField: "ItmKy",
    //    dataTextField: "ItmNm",
    //    dataSource: ItmNmDatasource('HdrSec5_CmbItm'),
    //    change: function (e) {

    //        var comboboxText = $("#HdrSec5_CmbItm_Nm").data("kendoComboBox");
    //        var cmbText = comboboxText.text();
    //        var comboboxValue = $("#HdrSec5_CmbItm_Nm").data("kendoComboBox");
    //        var cmbValue = comboboxValue.value();

    //        if ((cmbText == "?") || (cmbText.slice(-1) == "?")) {
    //        } else {
    //            var ItmKy = cmbValue;
    //            //LoadUnitCombo(ItmKy);
    //            //if (ItmKy != "") { //06/07/2018 commented because itm key change when hit this function properly check the code
    //            var validate = ComboValidations("HdrSec5_CmbItm_Nm");
    //            {
    //                if (validate) {
    //                    $("#HdrSec5_CmbItm_Cd").data("kendoComboBox").value(ItmKy);
    //                    $("#HdrSec5_CmbItm_Nm").data("kendoComboBox").value(ItmKy);
    //                    LoadUnitCombo(ItmKy);
    //                    //ClearDetFilelds();
                        
    //                } else {
    //                    $("#HdrSec5_CmbItm_Cd").data("kendoComboBox").value("");
    //                    $("#HdrSec5_CmbItm_Nm").data("kendoComboBox").value("");
    //                }
    //            }
    //        }
    //    },
    //    filter: "startswith",
    //    suggest: true,
    //    placeholder: "Select a ItmNm.."
    //});

    $("#HdrSec5_CmbItm_Cd").data("kendoComboBox").input.keydown(function (e) {
        var keycode = (e.keyCode ? e.keyCode : e.which);
        if (keycode == '13') {

            var comboboxText = $("#HdrSec5_CmbItm_Cd").data("kendoComboBox");
            var cmbText = comboboxText.text();

            if ((cmbText == "?") || (cmbText.slice(-1) == "?")) {

                try {
                    var dropdownlist = $("#HdrSec5_CmbItm_Cd").data("kendoDropDownList");
                    dropdownlist.destroy();
                    dropdownlist.wrapper.remove();
                } catch (ex) { }

                try {
                    //var dropdownlist = $("#HdrSec5_CmbItm_Nm").data("kendoDropDownList");
                    dropdownlist.destroy();
                    dropdownlist.wrapper.remove();
                } catch (ex) { }

                LoadItmCombo();

                OpenItemFindForm(cmbText);
            } else {
                //$("#HdrSec5_NmricQty_Val").data("kendoNumericTextBox").focus();
                GetRate();
            }
        }
    });


    //$("#HdrSec5_CmbItm_Nm").data("kendoComboBox").input.keydown(function (e) {
    //    var keycode = (e.keyCode ? e.keyCode : e.which);
    //    if (keycode == '13') {

    //        var comboboxText = $("#HdrSec5_CmbItm_Nm").data("kendoComboBox");
    //        var cmbText = comboboxText.text();

    //        if ((cmbText == "?") || (cmbText.slice(-1) == "?")) {
    //            try {
    //                var dropdownlist = $("#HdrSec5_CmbItm_Cd").data("kendoDropDownList");
    //                dropdownlist.destroy();
    //                dropdownlist.wrapper.remove();
    //            } catch (ex) { }

    //            try {
    //                var dropdownlist = $("#HdrSec5_CmbItm_Nm").data("kendoDropDownList");
    //                dropdownlist.destroy();
    //                dropdownlist.wrapper.remove();
    //            } catch (ex) { }

    //            LoadItmCombo();

    //            OpenItemFindForm(cmbText);
    //        } else {
    //            $("#HdrSec5_NmricQty_Val").data("kendoNumericTextBox").focus();
    //            GetRate();
    //        }
    //    }
    //});

}

function LoadAnlyCombo() {
    $("#HdrSec5_CmbAnaly_Cd").kendoComboBox({
        dataValueField: "CdKy",
        dataTextField: "Code",
        dataSource: Anly3Datasource(),
        filter: "startswith",
        suggest: true,
        placeholder: "Select a Analysis.."
    });
    $("#HdrSec5_CmbAnaly_Cd").data("kendoComboBox").input.keypress(function (e) {

        var keycode = (e.keyCode ? e.keyCode : e.which);
        if (keycode == '13') {
            var LiNo = $("#HdrSec5_NmricLiNo_Val").data("kendoNumericTextBox").value();
            if (LiNo == 0 || LiNo == null || LiNo == undefined) {
                setItmDetailbyEnterky();

            } else {

                changeItemRalatedTotal();

            }
        }
    });

}

function LoadTaskCombo(PrjKy) {
    $("#HdrSec5_CmbTask_Cd").kendoComboBox({
        dataValueField: "TaskKy",
        dataTextField: "TaskId",
        dataSource: TaskDatasource(PrjKy),
        change: function (e) {
        },
        filter: "contains",
        suggest: true,
        placeholder: "Select a Task.."
    });


    $("#HdrSec5_CmbTask_Cd").data("kendoComboBox").input.keypress(function (e) {

        var keycode = (e.keyCode ? e.keyCode : e.which);
        if (keycode == '13') {
            var LiNo = $("#HdrSec5_NmricLiNo_Val").data("kendoNumericTextBox").value();
            if (LiNo == 0 || LiNo == null || LiNo == undefined) {
                setItmDetailbyEnterky();

            } else {

                changeItemRalatedTotal();

            }
        }
    });
}


function LoadUnitCombo(ItmKy) {

    $("#HdrSec5_CmbUnit_Cd").kendoComboBox({
        dataValueField: "UnitKy",
        dataTextField: "Unit",
        index:0,
        dataSource: UnitDatasource(ItmKy),
        change: function (e) {
            
        },
        filter: "contains",
        suggest: true,
        placeholder: "Select a Unit.."
    });

    //var combobox = $("#HdrSec5_CmbUnit_Cd").data("kendoComboBox")    
    //var data = combobox.dataSource.data();
    
    //if (data.length >= 1) {
    //    $("#HdrSec5_CmbUnit_Cd").data("kendoComboBox").value(data[0].UnitKy);
    //}
    
    var combobox = $("#HdrSec5_CmbUnit_Cd").data("kendoComboBox");
    var selectedIndex = combobox.select();
    

    $("#HdrSec5_CmbUnit_Cd").data("kendoComboBox").input.keypress(function (e) {
        var keycode = (e.keyCode ? e.keyCode : e.which);
        if (keycode == '13') {
            var LiNo = $("#HdrSec5_NmricLiNo_Val").data("kendoNumericTextBox").value();
            if (LiNo == 0 || LiNo == null || LiNo == undefined) {
                setItmDetailbyEnterky();
            } else {
                changeItemRalatedTotal();
            }
        }
    });
    
}







function LoadAdrComboByAcc(AccKy) {
    AdrByAccDatasource(AccKy);
}

function LoadAdrCombo(PreKy) {

    PreKy = Number(PreKy);

    $("#HdrSec2_CmbAdr_Cd").kendoComboBox({
        dataValueField: "AdrKy",
        dataTextField: "AdrID",
        dataSource: AdrID_SelectMob_DataSourceWithTrnTyp('HdrSec2_CmbAdr', PreKy),//AdrByAccDatasource(AccKy),
        change: function (e) {
            var cmb = $("#HdrSec2_CmbAdr_Cd").data("kendoComboBox");
            var AdrKy = cmb.value();
            if (AdrKy != "") {
                var validate = ComboValidations("HdrSec2_CmbAdr_Cd");
                if (validate) {
                    $("#HdrSec2_CmbAdr_Cd").data("kendoComboBox").value(AdrKy);
                    //$("#HdrSec2_CmbAdr_Nm").data("kendoComboBox").value(AdrKy);
                    FormGlblData.IsDetailRelatedHdrSectionChanged = true;
                    setDefault();
                } else {
                    $("#HdrSec2_CmbAdr_Cd").data("kendoComboBox").value(null);
                    //$("#HdrSec2_CmbAdr_Nm").data("kendoComboBox").value(null);
                }
            }
        },
        filter: "contains",
        suggest: true,
        placeholder: "Select a Address.."
    });

    //$("#HdrSec2_CmbAdr_Nm").kendoComboBox({
    //    dataValueField: "AdrKy",
    //    dataTextField: "AdrNm",
    //    dataSource: AdrNm_SelectMob_DataSourceWithTrnTyp('HdrSec2_CmbAdr', PreKy),//AdrByAccDatasource(AccKy),
    //    change: function (e) {
    //        var cmb = $("#HdrSec2_CmbAdr_Nm").data("kendoComboBox");
    //        var AdrKy = cmb.value();
    //        if (AdrKy != "") {
    //            var validate = ComboValidations("HdrSec2_CmbAdr_Nm");
    //            if (validate) {
    //                $("#HdrSec2_CmbAdr_Cd").data("kendoComboBox").value(AdrKy);
    //                $("#HdrSec2_CmbAdr_Nm").data("kendoComboBox").value(AdrKy);
    //                FormGlblData.IsDetailRelatedHdrSectionChanged = true;
    //                setDefault();
    //            } else {
    //                $("#HdrSec2_CmbAdr_Nm").data("kendoComboBox").value(null);
    //                $("#HdrSec2_CmbAdr_Cd").data("kendoComboBox").value(null);
    //            }
    //        }
    //    },
    //    filter: "contains",
    //    suggest: true,
    //    placeholder: "Select a Address.."
    //});

    $("#HdrSec2_CmbRepAdr_Cd").kendoComboBox({
        dataValueField: "AdrKy",
        dataTextField: "AdrID",
        dataSource: AdrID_SelectMob_DataSourceWithTrnTyp('HdrSec2_CmbRepAdr', PreKy),//AdrByAccDatasource(AccKy),
        change: function (e) {
            var cmb = $("#HdrSec2_CmbRepAdr_Cd").data("kendoComboBox");
            var AdrKy = cmb.value();
            if (AdrKy != "") {
                var validate = ComboValidations("HdrSec2_CmbRepAdr_Cd");
                if (validate) {
                    $("#HdrSec2_CmbRepAdr_Cd").data("kendoComboBox").value(AdrKy);
                   // $("#HdrSec2_CmbRepAdr_Nm").data("kendoComboBox").value(AdrKy);
                    FormGlblData.IsDetailRelatedHdrSectionChanged = true;
                    setDefault();
                } else {
                    $("#HdrSec2_CmbRepAdr_Cd").data("kendoComboBox").value(null);
                    //$("#HdrSec2_CmbRepAdr_Nm").data("kendoComboBox").value(null);
                }
            }
        },
        filter: "contains",
        suggest: true,
        placeholder: "Select a Address.."
    });

    //$("#HdrSec2_CmbRepAdr_Nm").kendoComboBox({
    //    dataValueField: "AdrKy",
    //    dataTextField: "AdrNm",
    //    dataSource: AdrNm_SelectMob_DataSourceWithTrnTyp('HdrSec2_CmbRepAdr', PreKy),//AdrByAccDatasource(AccKy),
    //    change: function (e) {
    //        var cmb = $("#HdrSec2_CmbRepAdr_Nm").data("kendoComboBox");
    //        var AdrKy = cmb.value();
    //        if (AdrKy != "") {
    //            var validate = ComboValidations("HdrSec2_CmbRepAdr_Nm");
    //            if (validate) {
    //                $("#HdrSec2_CmbRepAdr_Cd").data("kendoComboBox").value(AdrKy);
    //                $("#HdrSec2_CmbRepAdr_Nm").data("kendoComboBox").value(AdrKy);
    //                FormGlblData.IsDetailRelatedHdrSectionChanged = true;
    //                setDefault();
    //            } else {
    //                $("#HdrSec2_CmbRepAdr_Nm").data("kendoComboBox").value(null);
    //                $("#HdrSec2_CmbRepAdr_Cd").data("kendoComboBox").value(null);
    //            }
    //        }
    //    },
    //    filter: "startswith",
    //    suggest: true,
    //    placeholder: "Select a Address.."
    //});

    $("#HdrSec2_CmbAdr_Cd").parent().css('width', "40%");
    //$("#HdrSec2_CmbAdr_Nm").parent().css('width', "58%"); 
    $("#HdrSec2_CmbRepAdr_Cd").parent().css('width', "40%");
    //$("#HdrSec2_CmbRepAdr_Nm").parent().css('width', "58%");
}


function GetAdrKyByAccKy(AccKy) {
    $.ajax({
        url: urlGetAdrKyByAccKy,
        data: JSON.stringify({

            AccKy: AccKy,

        }),
        contentType: 'application/json; charset=utf-8',
        dataType: "Json",
        type: "POST",
        success: function (data) {
            for (i = 0; i < data.length; i++) {
                var AdrKy = data[0].AdrKy;
                $("#HdrSec2_CmbAdr_Cd").data("kendoComboBox").value(AdrKy);
                //$("#HdrSec2_CmbAdr_Nm").data("kendoComboBox").value(AdrKy);
            }

        },
        error: function (e) {
            return false;
        }
    });

}

function GetAccKyByAdrKy(AdrKy) {
    $.ajax({
        url: urlGetAccKyByAdrKy,
        data: JSON.stringify({

            AdrKy: AdrKy,

        }),
        contentType: 'application/json; charset=utf-8',
        dataType: "Json",
        type: "POST",
        success: function (data) {
            for (i = 0; i < data.length; i++) {
                var AccKy = data[0].AccKy;
                //$("#HdrSec2_CmbSupAcc_Nm").data("kendoComboBox").value(AccKy);
                $("#HdrSec2_CmbSupAcc_Cd").data("kendoComboBox").value(AccKy);
            }
        },
        error: function (e) {
            return false;
        }
    });

}


function AdrID_SelectMob_DataSourceWithTrnTyp(ObjNm, PreKy) {

    var ObjVisible = GetObjVisible(ObjNm);
    if (ObjVisible == 0) {
        return [];
    }

    if (isNaN(PreKy))
        return [];

    var ObjKy = GetObjKy(ObjNm);
    //alert(ObjKy);
    var dataSource = new kendo.data.DataSource(
    {
        transport: {
            read: {
                url: urlComboLoad.AdrID_SelectMob,//'/Home/GetProjectListByPrntKy',//'@Url.Content("~/Home/GetProjectListByPrntKy")',
                data: {
                    ObjKy: ObjKy,
                    TrnTypKy: FormGlblData.OrdTypKy,
                    PreKy: PreKy
                },
                dataType: "json"
            }
        }
    });
    return dataSource;
}

function AdrNm_SelectMob_DataSourceWithTrnTyp(ObjNm, PreKy) {

    var ObjVisible = GetObjVisible(ObjNm);
    if (ObjVisible == 0) {
        return [];
    }

    if (isNaN(PreKy))
        return [];

    var ObjKy = GetObjKy(ObjNm);
    var dataSource = new kendo.data.DataSource(
    {
        transport: {
            read: {
                url: urlComboLoad.AdrNm_SelectMob,//'/Home/GetProjectListByPrntKy',//'@Url.Content("~/Home/GetProjectListByPrntKy")',
                data: {
                    ObjKy: ObjKy,
                    TrnTypKy: FormGlblData.OrdTypKy,
                    PreKy: PreKy
                },
                dataType: "json"
            }
        }
    });
    return dataSource;
}


function OrdDayDatasource() {
    var dataSource = new kendo.data.DataSource(
      {
          transport: {
              read: {
                  url: urlGetOrdDay,
                  dataType: "json"
              }
          }

      });
    return dataSource;
}

function DlvNoDatasource() {
    var dataSource = new kendo.data.DataSource(
      {
          transport: {
              read: {
                  url: urlGetDeliNo,
                  dataType: "json"
              }
          }

      });
    return dataSource;
}

function ToLocDatasource() {
    var dataSource = new kendo.data.DataSource(
      {
          transport: {
              read: {
                  url: '@Url.Content("~/Order/GetLocListForOrder")',
                  data: "ItmTrn",
                  dataType: "json"
              }
          }

      });
    return dataSource;
}

function LocDatasource() {
    var dataSource = new kendo.data.DataSource(
      {
          transport: {
              read: {
                  url: urlGetLoc,
                  data: { TrnTyp: "ItmTrn" },
                  dataType: "json"
              }
          }

      });
    return dataSource;
}

function DlvToDatasource() {
    var dataSource = new kendo.data.DataSource(
      {
          transport: {
              read: {
                  url: '@Url.Content("~/Order/GetAddressForOrder")',
                  dataType: "json"
              }
          }

      });
    return dataSource;
}


function GetPrjID_SelectMobDataSource(ObjNm) {

    var ObjVisible = GetObjVisible(ObjNm);
    if (ObjVisible == 0) {
        return [];
    }

    var ObjKy = GetObjKy(ObjNm);
    //alert(ObjKy);
    var dataSource = new kendo.data.DataSource(
    {
        transport: {
            read: {
                url: urlComboLoad.PrjID_SelectMob,
                data: {
                    ObjKy: ObjKy,
                    TrnTypKy: FormGlblData.OrdTypKy,
                    PreKy: 1
                },
                dataType: "json"
            }
        }
    });
    return dataSource;
}

function GetPrjNm_SelectMobDataSource(ObjNm) {

    var ObjVisible = GetObjVisible(ObjNm);
    if (ObjVisible == 0) {
        return [];
    }

    var ObjKy = GetObjKy(ObjNm);
    var dataSource = new kendo.data.DataSource(
    {
        transport: {
            read: {
                url: urlComboLoad.PrjNm_SelectMob,
                data: {
                    ObjKy: ObjKy,
                    TrnTypKy: FormGlblData.OrdTypKy,
                    PreKy: 1
                },
                dataType: "json"
            }
        }
    });
    return dataSource;
}

//CdmasLookUpModelWeb
function dataSrcCreateCodeCdMasLookUp(ObjNm) {

    var ObjVisible = GetObjVisible(ObjNm);
    if (ObjVisible == 0) {
        return [];
    }

    var ObjKy = GetObjKy(ObjNm);
    var dataSource = new kendo.data.DataSource(
      {
          transport: {
              read: {
                  url: urlComboLoad.Code_SelectMob,
                  data: { ObjKy: ObjKy, TrnTypKy: FormGlblData.OrdTypKy, PreKy: 1 },
                  dataType: "json"
              }
          }
      });
    return dataSource;
}

function dataSrcCreateCdNmCdMasLookUp(ObjNm) {

    var ObjVisible = GetObjVisible(ObjNm);
    if (ObjVisible == 0) {
        return [];
    }

    var ObjKy = GetObjKy(ObjNm);
    var dataSource = new kendo.data.DataSource(
      {
          transport: {
              read: {
                  url: urlComboLoad.CdNm_SelectMob,
                  data: { ObjKy: ObjKy, TrnTypKy: FormGlblData.OrdTypKy, PreKy: 1 },
                  dataType: "json"
              }
          }
      });
    return dataSource;
}

function AccCdDatasource(ObjNm, PreKy) {

    var ObjVisible = GetObjVisible(ObjNm);
    if (ObjVisible == 0) {
        return [];
    }

    if (isNaN(PreKy))
        return [];

    var ObjKy = GetObjKy(ObjNm);
    var OrdTypKy = FormGlblData.OrdTypKy;
    var dataSource = new kendo.data.DataSource(
      {
          transport: {
              read: {
                  url: urlComboLoad.AccCd_SelectMob,
                  data: { ObjKy: ObjKy, TrnTypKy: OrdTypKy, PreKy: PreKy },
                  dataType: "json"
              }
          }
      });
    return dataSource;
}

function AccNmDatasource(ObjNm, PreKy) {

    var ObjVisible = GetObjVisible(ObjNm);
    if (ObjVisible == 0) {
        return [];
    }

    if (isNaN(PreKy))
        return [];

    var ObjKy = GetObjKy(ObjNm);
    var OrdTypKy = FormGlblData.OrdTypKy;
    var dataSource = new kendo.data.DataSource(
      {
          transport: {
              read: {
                  url: urlComboLoad.AccNm_SelectMob,
                  data: { ObjKy: ObjKy, TrnTypKy: OrdTypKy, PreKy: PreKy },
                  dataType: "json"
              }
          }
      });
    return dataSource;
}

function AccountDatasource() {

    var AccTypNm = "";
    if (OurCd == "PO" || OurCd == "PR" || OurCd == "PRCancl" || OurCd == "POCancl") {
        AccTypNm = "sup";
    }
    var dataSource = new kendo.data.DataSource(
      {
          transport: {
              read: {
                  url: urlGetAcc,
                  data: {
                      AccTyp: AccTypNm
                  },
                  dataType: "json"
              }
          }

      });
    return dataSource;
}

function PurAcDatasource() {
    var ConCd = "OrdTyp";
    var OurCd = '@(ViewBag.OurCd)';
    var dataSource = new kendo.data.DataSource(
      {
          transport: {
              read: {
                  url: '@Url.Content("~/Order/GetPurAcListForOrder")',
                  data: {
                      ConCd: "OrdTyp",
                      OurCd: '@(ViewBag.OurCd)'
                  },
                  dataType: "json"
              }
          }

      });
    return dataSource;
}

function PmtDatasource() {
    var ConCd = "PmtTrm";

    var dataSource = new kendo.data.DataSource(
      {
          transport: {
              read: {
                  url: '@Url.Content("~/Order/GetPmtListForOrder")',
                  data: {
                      ConCd: "PmtTrm",
                  },
                  dataType: "json"
              }
          }
      });
    return dataSource;
}

function CurrencyDatasource() {

    var dataSource = new kendo.data.DataSource(
      {
          transport: {
              read: {
                  url: urlGetCurrencyListForOrder,

                  dataType: "json"
              }
          }
      });
    return dataSource;
}

function AdrByAccDatasource(AccKy) {
    var data = new Array();
    $.ajax({
        url: urlGetAdrByAcc,
        dataType: "json",
        type: "POST",
        data: JSON.stringify({
            AccKy: AccKy,
        }),
        contentType: 'application/json; charset=utf-8',
        success: function (list) {
            if (list.length > 0) {
                for (i = 0; i < list.length; i++) {
                    var AdrKy = list[0].AdrKy;
                    $("#HdrSec2_CmbAdr_Cd").data("kendoComboBox").value(AdrKy);
                    //$("#HdrSec2_CmbAdr_Nm").data("kendoComboBox").value(AdrKy);
                }
            }
        },
        error: function (e) { }
    });
}

function ItmCdDatasource(ObjNm) {

    var ObjVisible = GetObjVisible(ObjNm);
    if (ObjVisible == 0) {
        return [];
    }

    var ObjKy = GetObjKy(ObjNm);
    var cmb = $("#HdrSec2_CmbLoc_Cd").data("kendoComboBox").value();
    if (!cmb) {
        cmb = 1;
    }
    var PreKy = cmb;
    if (PreKy == "" || PreKy == null || PreKy == undefined) PreKy = 1;
    var dataSource = new kendo.data.DataSource(
      {
          transport: {
              read: {
                  url: urlComboLoad.ItmCd_SelectMob,
                  data: {
                      ObjKy: ObjKy,
                      TrnTypKy: FormGlblData.OrdTypKy,
                      PreKy: PreKy
                  },
                  dataType: "json"
              }
          }
      });
    return dataSource;
}

function ItmNmDatasource(ObjNm) {

    var ObjVisible = GetObjVisible(ObjNm);
    if (ObjVisible == 0) {
        return [];
    }

    var ObjKy = GetObjKy(ObjNm);
    var cmb = $("#HdrSec2_CmbLoc_Cd").data("kendoComboBox").value();
    if (!cmb) {
        cmb = 1;
    }
    var PreKy = cmb;
    if (PreKy == "" || PreKy == null || PreKy == undefined) PreKy = 1;
    var dataSource = new kendo.data.DataSource(
      {
          transport: {
              read: {
                  url: urlComboLoad.ItmNm_SelectMob,
                  data: {
                      ObjKy: ObjKy,
                      TrnTypKy: FormGlblData.OrdTypKy,
                      PreKy: PreKy
                  },
                  dataType: "json"
              }
          }
      });
    return dataSource;
}

function UnitDatasource(ItmKy) {

    var dataSource = new kendo.data.DataSource(
      {
          transport: {
              read: {
                  url: urlGetMultiUnitsForOrder,
                  data: {
                      ItmKy: ItmKy,

                  },
                  dataType: "json"
              }
          }
      });
    return dataSource;
}

function TaskDatasource(PrjKy) {

    return [];

    //var dataSource = new kendo.data.DataSource(
    //  {
    //      transport: {
    //          read: {
    //              url: urlGetTaskListForOrder,
    //              data: {
    //                  PrjKy: PrjKy,

    //              },
    //              dataType: "json"
    //          }
    //      }
    //  });
    //return dataSource;
}

function Anly3Datasource() {

    return [];

    //var dataSource = new kendo.data.DataSource(
    //  {
    //      transport: {
    //          read: {
    //              url: urlGetAnlTypForOrder,
    //              data: {
    //                  ConCd: "AnlTyp3"
    //              },
    //              dataType: "json"
    //          }
    //      }
    //  });
    //return dataSource;
}

function DlvToDatasource() {
    var dataSource = new kendo.data.DataSource(
      {
          transport: {
              read: {
                  url: urlGetAdrForOrder,
                  dataType: "json"
              }
          }

      });
    return dataSource;
}

function DefaultPmtTrm() {

    var dataSource = new kendo.data.DataSource(
      {
          transport: {
              read: {
                  url: urlGetDefaultPmtTrm,


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
        $("#" + cmbNm + "").data("kendoComboBox").input.focus();
        return false;
    } else {
        return true;
    }
}


function OpenItemFindForm(textForSSSerach) {

    var LocKy = $("#HdrSec2_CmbLoc_Cd").data('kendoComboBox').value();
    if (LocKy == 0 || LocKy == null) {
        var LocKy = 1;
    }
    var PrjKy = $("#HdrSec2_CmbPrj_Cd").data('kendoComboBox').value();
    if (PrjKy == 0 || PrjKy == null) {
        var PrjKy = 1;
    }

    var OrdTypKySelect = $("#OrdTypKy1").val();

    ItemSelectionPopUpOpen(textForSSSerach, "", viewBag.ObjKy,
    1, OrdTypKySelect, PrjKy, LocKy, 'ItmTyp', 'RM');
}


var viewBagObjKy = viewBag.ObjKy;

function SetSelectedItemToItemCombo(ItmKy) {

    ItmKy = Number(ItmKy);

    if (ItmKy > 0) {
        //$("#HdrSec5_CmbItm_Nm").data("kendoComboBox").value(null);
        $("#HdrSec5_CmbItm_Cd").data("kendoComboBox").value(null);
        //$("#HdrSec5_CmbItm_Nm").data("kendoComboBox").value(ItmKy);
        $("#HdrSec5_CmbItm_Cd").data("kendoComboBox").value(ItmKy);
        $("#HdrSec5_NmricQty_Val").data("kendoNumericTextBox").focus();
    }
}

function GetItemQty() {
    //if (viewBag.OurCd != "MatReq") {
    //    return;
    //}
    var ItmKy = $("#HdrSec5_CmbItm_Cd").data("kendoComboBox").value();
    if (!ItmKy || ItmKy == "") {
        return;
    }
    var FrmPrjKy = $("#HdrSec2_CmbPrj_Cd").data("kendoComboBox").value();
    if (!FrmPrjKy || FrmPrjKy == "") {
        FrmPrjKy = 1;
    }
    //var FrmLcKy = 1;
    var FrmLcKy = $("#HdrSec2_CmbLoc_Cd").data("kendoComboBox").value();
    if (!FrmLcKy || FrmLcKy == "" ) {
        FrmLcKy = 1;
    }

    $.ajax({
        url: urlGetAvilableQty,
        data: JSON.stringify({
            ItmKy: ItmKy,
            FrmPrjKy: FrmPrjKy,
            ToPrjKy: 1,
            FrmLockKy: 1,
            ToLocKy: 1,
            TrnTyp: FormGlblData.OrdTypKy,
            ObjKy: viewBag.ObjKy,

        }),
        contentType: 'application/json; charset=utf-8',
        dataType: "Json",
        type: "POST",
        success: function (data) {
            if (data) {
                document.getElementById('HdrSec5_CmbItmLdd_Lbl').innerHTML = 'Brand :- ' + data.ItmBrnd + 'Avl.Qty ' + data.Qty + 'Bud.Qty :- ' + data.AvlBudgetQty;

            }

        },
        error: function (e) {
            alert("Sorry, We Couldn't retrive the data !\nPlease Try Again!");
            return false;
        }
    });

}