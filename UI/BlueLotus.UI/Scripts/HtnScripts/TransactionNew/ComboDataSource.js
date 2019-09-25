var firstTime_Call_ItemComboKeyEventBind_Function = true;
function LoadCombo() {
    $("#HdrSec2_CmbPrj_Cd")
        .kendoComboBox({
            dataValueField: "PrjKy",
            dataTextField: "PrjId",
            dataSource: ProjectCd('HdrSec2_CmbPrj'),
            change: function (e) {
                var cmb = $("#HdrSec2_CmbPrj_Cd").data("kendoComboBox");
                var prjky = cmb.value();
                if (prjky != "") {
                    var validate = ComboValidations("HdrSec2_CmbPrj_Cd");
                    if (validate) {                      
                        $("#HdrSec2_CmbPrj_Cd").data("kendoComboBox").value(prjky);
                        FormGlblData.IsDetailRelatedHdrSectionChanged = true;
                        LoadTaskCombo(prjky);
                        setDefault();
                    } else {                        
                        $("#HdrSec2_CmbPrj_Cd").data("kendoComboBox").value(null);
                    }
                }
            },
            filter: "startswith",
            suggest: true,
            placeholder: "Select a From Project.."
        });


    $("#HdrSec2_CmbLoc_Cd").kendoComboBox({
        dataValueField: "CdKy",
        dataTextField: "Code",
        dataSource: Code_SelectMob_Datasource('HdrSec2_CmbLoc'),
        change: function (e) {
            var cmb = $("#HdrSec2_CmbLoc_Cd").data("kendoComboBox");
            var CdKy = cmb.value();
            if (CdKy != "") {
                var validate = ComboValidations("HdrSec2_CmbLoc_Cd");
                if (validate) {
                    // $("#HdrSec2_CmbLoc_Nm").data("kendoComboBox").value(CdKy);
                    $("#HdrSec2_CmbLoc_Cd").data("kendoComboBox").value(CdKy);

                    FormGlblData.IsDetailRelatedHdrSectionChanged = true;
                    setDefault();

                    LoadItemCombo();
                } else {
                    // $("#HdrSec2_CmbLoc_Nm").data("kendoComboBox").value(null);
                    $("#HdrSec2_CmbLoc_Cd").data("kendoComboBox").value(null);
                }
            }
        },
        filter: "startswith",
        suggest: true,
        placeholder: "Select a From Location.."
    });
    $("#HdrSec2_CmbContractAcc_Cd").kendoComboBox({
        dataValueField: "AccKy",
        dataTextField: "AccCd",
        dataSource: AccCdDatasource('HdrSec2_CmbContractAcc', 1),
        change: function (e) {
            var cmb = $("#HdrSec2_CmbContractAcc_Cd").data("kendoComboBox");
            var AccKy = cmb.value();
            if (AccKy != "") {
                var validate = ComboValidations("HdrSec2_CmbContractAcc_Cd");
                if (validate) {                    
                   
                    FormGlblData.IsDetailRelatedHdrSectionChanged = true;
                } else {
                    $("#HdrSec2_CmbContractAcc_Cd").data("kendoComboBox").value(null);                  
                }
            }
        },
        filter: "contains",
        suggest: true,
        placeholder: "Select a contract A/C ..."
    });

    $("#HdrSec2_CmbAcc_Cd").kendoComboBox({
        dataValueField: "AccKy",
        dataTextField: "AccCd",
        dataSource: AccCdDatasource('HdrSec2_CmbAcc', 1),
        change: function (e) {
            var cmb = $("#HdrSec2_CmbAcc_Cd").data("kendoComboBox");
            var AccKy = cmb.value();
            if (AccKy != "") {
                var validate = ComboValidations("HdrSec2_CmbAcc_Cd");
                if (validate) {
                  
                    FormGlblData.IsDetailRelatedHdrSectionChanged = true;
                    LoadAdrComboByAcc(AccKy);
                } else {
                    $("#HdrSec2_CmbAcc_Cd").data("kendoComboBox").value(null);
                   
                }
            }
        },
        filter: "startswith",
        suggest: true,
        placeholder: "Select a A/C ..."
    });
    $("#HdrSec2_CmbAdr_Cd").kendoComboBox({
        dataValueField: "AdrKy",
        dataTextField: "AdrID",
        dataSource:[],// Change Because this is Initially no data based On Accky Adr Load //AdrID_SelectMob_DataSourceWithTrnTyp('HdrSec2_CmbAdr', PreKy),//AdrByAccDatasource(AccKy),
        change: function (e) {
            var cmb = $("#HdrSec2_CmbAdr_Cd").data("kendoComboBox");
            var lbl = $("#HdrSec2_CmbAdr_Lbl").text();
            if (FormGlblData.isFirstTimeComboChange == 0) {
                var ReturnVal = ChangeItmRatesByHeaderChange(cmb.text(), lbl);
                if (ReturnVal == false) {
                    //
                }
            }
            var AdrKy = cmb.value();
            if (AdrKy != "") {
                var validate = ComboValidations("HdrSec2_CmbAdr_Cd");
                if (validate) {    
                    FormGlblData.IsDetailRelatedHdrSectionChanged = true;
                    setDefault();
                } else {
                    $("#HdrSec2_CmbAdr_Cd").data("kendoComboBox").value(null);
                    $("#HdrSec2_CmbAdr_Nm").data("kendoComboBox").value(null);
                }
            }
            if (FormGlblData.isFromFind == 1) FormGlblData.isFirstTimeComboChange = 0;
        },
        filter: "contains",
        suggest: true,
        placeholder: "Select a Address.."
    });


    $("#HdrSec2_CmbRepAdr_Cd").kendoComboBox({
        dataValueField: "AdrKy",
        dataTextField: "AdrID",
        dataSource: [],//AdrID_SelectMob_DataSourceWithTrnTyp('HdrSec2_CmbRepAdr', PreKy),//AdrByAccDatasource(AccKy),
        change: function (e) {
            var cmb = $("#HdrSec2_CmbRepAdr_Cd").data("kendoComboBox");
            var AdrKy = cmb.value();
            if (AdrKy != "") {
                var validate = ComboValidations("HdrSec2_CmbRepAdr_Cd");
                if (validate) {
                    //$("#HdrSec2_CmbRepAdr_Cd").data("kendoComboBox").value(AdrKy);
                    $("#HdrSec2_CmbRepAdr_Nm").data("kendoComboBox").value(AdrKy);
                    FormGlblData.IsDetailRelatedHdrSectionChanged = true;
                    setDefault();
                } else {
                    $("#HdrSec2_CmbRepAdr_Cd").data("kendoComboBox").value(null);
                    $("#HdrSec2_CmbRepAdr_Nm").data("kendoComboBox").value(null);
                }
            }
        },
        filter: "contains",
        suggest: true,
        placeholder: "Select Rep Address.."
    });

    $("#HdrSec3_CmbPmtTrms_Cd").kendoComboBox({
        dataValueField: "CdKy",
        dataTextField: "Code",
        dataSource: Code_SelectMob_Datasource('HdrSec3_CmbPmtTrms'),
        change: function (e) {
            var cmb = $("#HdrSec3_CmbPmtTrms_Cd").data("kendoComboBox");
            var PreKy = cmb.value();
            if (PreKy != "" && !isNaN(PreKy)) {
                var validate = ComboValidations("HdrSec3_CmbPmtTrms_Cd");
                if (validate) {
                    LoadAccComboLoad(PreKy);
                    LoadAdrCombo(PreKy);
                }
                else {
                    $("#HdrSec3_CmbPmtTrms_Cd").data("kendoComboBox").value(null);
                    $("#HdrSec3_CmbPmtTrms_Cd").data("kendoComboBox").trigger("change");
                }
            }
        },
        filter: "startswith",
        suggest: true,
        placeholder: "Select a Perment Terms.."
    });















    $("#HdrSec2_CmbContractAcc_Cd").parent().css('width', "100%");
    $("#HdrSec2_CmbAcc_Cd").parent().css('width', "100%");





    $("#HdrSec1_CmbOrdNo_Cd").kendoComboBox({
        dataValueField: "OrdKy",
        dataTextField: "OrdNo",
        dataSource: OrdNo_SelectMob_Datasource('HdrSec1_CmbOrdNo'),
        change: function (e) {
            var cmb = $("#HdrSec1_CmbOrdNo_Cd").data("kendoComboBox");
            var val = cmb.value();
            var validate = ComboValidations("HdrSec1_CmbOrdNo_Cd");
        },
        filter: "startswith",
        suggest: true,
        placeholder: "Select OrdNo"
    });

    var OrdKy = $("#HdrSec1_CmbOrdNo_Cd").val();
    if (OrdKy == null || OrdKy == "" || OrdKy == undefined) {
        OrdKy = 1;
    }
    $("#HdrSec5_CmbOrdItm_Cd").kendoComboBox({

        dataValueField: "OrdDetKy",
        dataTextField: "OrdItmNo",
        dataSource: OrdItmNo_SelectMob_Datasource('HdrSec1_CmbOrdNo', OrdKy),
        change: function (e) {
            var cmb = $("#HdrSec5_CmbOrdItm_Cd").data("kendoComboBox");
            var val = cmb.value();
            var validate = ComboValidations("HdrSec5_CmbOrdItm_Cd");
        },
        filter: "startswith",
        suggest: true,
        placeholder: "Select OrdItem No"
    });

    $("#HdrSec5_CmbAnaly_Cd").kendoComboBox({
        dataValueField: "CdKy",
        dataTextField: "Code",
        dataSource: Code_SelectMob_Datasource('HdrSec5_CmbAnaly'),// Anly3Datasource(),
        filter: "startswith",
        suggest: true,
        placeholder: "Select a Analysis..",
        change: function (e) {
            var cmb = $("#HdrSec5_CmbAnaly_Cd").data("kendoComboBox");
            var val = cmb.value();
            var validate = ComboValidations("HdrSec5_CmbAnaly_Cd");
        }
    });

    $("#HdrSec5_CmbAnaly_Cd").data("kendoComboBox").input.keypress(function (e) {
        var keycode = (e.keyCode ? e.keyCode : e.which);
        if (keycode == '13') {
            var LiNo = FormGlblData.Detail_Editing_LiNo;
            if (LiNo == 0 || LiNo == null || LiNo == undefined) {
                setItmDetailbyEnterky();
            } else {
                changeItemRalatedTotal();
            }
            event.preventDefault();
        }
    });


    //LoadAdrCombo(1);

    //$("#HdrSec2_CmbLoc_Nm").kendoComboBox({
    //    dataValueField: "CdKy",
    //    dataTextField: "CdNm",
    //    dataSource: CdNm_SelectMob_Datasource('HdrSec2_CmbLoc'),
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

    //                LoadItemCombo();
    //            } else {
    //                $("#HdrSec2_CmbLoc_Nm").data("kendoComboBox").value(null);
    //                $("#HdrSec2_CmbLoc_Cd").data("kendoComboBox").value(null);
    //            }
    //        }
    //    },
    //    filter: "startswith",
    //    suggest: true,
    //    placeholder: "Select a From Location.."
    //});

    //LoadItemCombo();
    //LoadAdrCombo(1);

    
    $("#HdrSec3_CmbCurrncy_Cd").kendoComboBox({
        dataValueField: "CdKy",
        dataTextField: "Code",
        dataSource: Code_SelectMob_Datasource('HdrSec3_CmbCurrncy'),
        change: function (e) {
            var validate = ComboValidations("HdrSec3_CmbCurrncy_Cd");
        },
        filter: "startswith",
        suggest: true,
        placeholder: "Select a Currency.."
    });

    $("#HdrSec1_CmbDeliNo_Cd").kendoComboBox({
        dataValueField: "CdKy",
        dataTextField: "Code",
        dataSource: Code_SelectMob_Datasource('HdrSec1_CmbDeliNo'),
        change: function (e) {
            var validate = ComboValidations("HdrSec1_CmbDeliNo_Cd");
        },
        filter: "contains",
        suggest: true,
        placeholder: "Select a Currency.."
    });



    //$("#HdrSec2_CmbPrj_Nm").kendoComboBox({
    //    dataValueField: "PrjKy",
    //    dataTextField: "PrjNm",
    //    dataSource: ProjectNm('HdrSec2_CmbPrj'),
    //    change: function (e) {
    //        var cmb = $("#HdrSec2_CmbPrj_Nm").data("kendoComboBox");
    //        var prjky = cmb.value();
    //        if (prjky != "") {
    //            var validate = ComboValidations("HdrSec2_CmbPrj_Nm");
    //            if (validate) {
    //                $("#HdrSec2_CmbPrj_Cd").data("kendoComboBox").value(prjky);
    //                $("#HdrSec2_CmbPrj_Nm").data("kendoComboBox").value(prjky);
    //                FormGlblData.IsDetailRelatedHdrSectionChanged = true;
    //                LoadTaskCombo(prjky);
    //                setDefault();
    //            } else {
    //                $("#HdrSec2_CmbPrj_Nm").data("kendoComboBox").value(null);
    //                $("#HdrSec2_CmbPrj_Cd").data("kendoComboBox").value(null);
    //            }
    //        }
    //    },
    //    filter: "startswith",
    //    suggest: true,
    //    placeholder: "Select a Project.."
    //});


    $("#HdrSec1_CmbDeliNo_Cd").parent().css('width', "100%");
    $("#HdrSec5_CmbItm_Cd").parent().css('width', "31%");
    $("#HdrSec5_CmbItm_Nm").parent().css('width', "58%");
    $("#HdrSec2_CmbPrj_Cd").parent().css('width', "40%");
    $("#cmbDeliTo").parent().css('width', "40%");
    $("#HdrSec3_CmbPmtTrms_Cd").parent().css('width', "100%");
    $("#HdrSec3_CmbCurrncy_Cd").parent().css('width', "100%");
    $("#cmbBUId").parent().css('width', "40%");
    $("#cmbBUCd").parent().css('width', "58%");
    $("#HdrSec2_CmbLoc_Cd").parent().css('width', "40%");
    $("#cmbToLocId").parent().css('width', "40%");
    $("#HdrSec2_CmbPrj_Nm").parent().css('width', "58%");
    $("#HdrSec2_CmbLoc_Nm").parent().css('width', "58%");
    $("#cmbToLocNm").parent().css('width', "58%");
    $("#HdrPOQty").css('width', "100%");
    $("#HdrSec5_NmricVatPer_Val").css('width', "100%");
    $("#HdrSec5_NmricVatAmt_Val").css('width', "100%");
    $("#HdrSec5_NmricSVatPer_Val").css('width', "100%");
    $("#HdrSec5_NmricSVatAmt_Val").css('width', "100%");
    $("#HdrSec5_NmricNbtPer_Val").css('width', "100%");
    $("#HdrSec5_NmricNbtAmt_Val").css('width', "100%");
    $("#HdrSec5_NmricWhtPer_Val").css('width', "100%");
    $("#HdrSec5_NmricWhtAmt_Val").css('width', "100%");
    $("#HdrSec5_CmbUnit_Cd").css('width', "100%");
    $("#HdrSec5_CmbAnaly_Cd").parent().css('width', "100%");
    $("#HdrSec5_CmbTask_Cd").css('width', "100%");
}




function ItemComboKeyEventBind() {

    if (!firstTime_Call_ItemComboKeyEventBind_Function)
        return;

    firstTime_Call_ItemComboKeyEventBind_Function = false;

    $("#HdrSec5_CmbItm_Cd").data("kendoComboBox").input.keydown(function (event) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {
            FormGlblData.isItmCdFrmCmb = 0;
            FormGlblData.itmCdFrm = 'ItmCd';
            var comboboxText = $("#HdrSec5_CmbItm_Cd").data("kendoComboBox");
            var cmbText = comboboxText.text();

            if ((cmbText == "?") || (cmbText.slice(-1) == "?")) {
                OpenItemFindForm(cmbText);
            } else {
                $("#HdrSec5_NmricQty_Val").data("kendoNumericTextBox").focus();
                GetItmRelatedDet();
            }
            event.preventDefault();
        }
    });

    $("#HdrSec5_CmbItm_Cd").keydown(function (event) {
        event.preventDefault();
    });

    //$("#HdrSec5_CmbItm_Nm").data("kendoComboBox").input.keydown(function (event) {
    //    var keycode = (event.keyCode ? event.keyCode : event.which);
    //    if (keycode == '13') {
    //        FormGlblData.isItmCdFrmCmb = 0;
    //        FormGlblData.itmCdFrm = 'ItmNm';
    //        var comboboxText = $("#HdrSec5_CmbItm_Nm").data("kendoComboBox");
    //        var cmbText = comboboxText.text();

    //        if ((cmbText == "?") || (cmbText.slice(-1) == "?")) {
    //            OpenItemFindForm(cmbText);
    //        } else {
    //            $("#HdrSec5_NmricQty_Val").data("kendoNumericTextBox").focus();
    //            GetItmRelatedDet();
    //        }
    //        event.preventDefault();
    //    }
    //});

    //$("#HdrSec5_CmbItm_Nm").keydown(function (event) {
    //    event.preventDefault();
    //});

}

var LoadItemCombo_IsFire = true;
function LoadItemCombo() {
    LoadItemCombo_IsFire = false;

    $("#HdrSec5_CmbItm_Cd").kendoComboBox({
        dataTextField: "ItmCd",
        dataValueField: "ItmKy",
        dataSource: ItmCdDatasourceTest('HdrSec5_CmbItm'),
        change: function (e) {

            var comboboxText = $("#HdrSec5_CmbItm_Cd").data("kendoComboBox");
            var cmbText = comboboxText.text();
            var cmbValue = comboboxText.value();

            var ItmKy = cmbValue;
            var validate_ComboCode = false;
            var validate = false;

            validate = ComboValidations("HdrSec5_CmbItm_Cd");

            if (validate)
                validate_ComboCode = Validate_ComboCode("HdrSec5_CmbItm_Cd", "ItmCd");

            {
                if (validate && validate_ComboCode) {
                    $("#HdrSec5_CmbItm_Nm").data("kendoComboBox").value(null);
                    $("#HdrSec5_CmbItm_Val").val("");
                    document.getElementById('HdrSec5_CmbItmLdd_Lbl').innerHTML = '.....';

                    FormGlblData.Detail_Editing_LiNo = 0;

                    LoadUnitCombo(ItmKy);
                   // LoadTaskUnitCombo(ItmKy);
                    $("#HdrSec5_NmricQty_Val").data("kendoNumericTextBox").value('');
                    $("#HdrSec5_NmricRate_Val").data("kendoNumericTextBox").value(0);
                    $("#HdrSec5_NmricDisPer_Val").data("kendoNumericTextBox").value(0);
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
                    $("#HdrSec5_NmricSubTotal_Val").data("kendoNumericTextBox").value(0);
                    $("#HdrSec5_NmricCrossTotal_Val").data("kendoNumericTextBox").value(0);
                    $("#HdrSec5_NmricNetTotal_Val").data("kendoNumericTextBox").value(0);
                    $("#HdrSec5_CmbTask_Cd").data('kendoComboBox').value(null);
                    $("#HdrSec5_CmbUnit_Cd").data('kendoComboBox').value(null);
                    $("#HdrSec5_CmbItm_Nm").data('kendoComboBox').value(ItmKy);

                }
            }
        },
        filter: "startswith",
        suggest: true,
        placeholder: "Select a ItmCd.."
    });

    $("#HdrSec5_CmbItm_Nm").kendoComboBox({
        dataValueField: "ItmKy",
        dataTextField: "ItmNm",
        dataSource: ItmNmDatasourceTest('HdrSec5_CmbItm'),
        change: function (e) {

            var comboboxText = $("#HdrSec5_CmbItm_Nm").data("kendoComboBox");
            var cmbText = comboboxText.text();
            var cmbValue = comboboxText.value();

            var ItmKy = cmbValue;
            var validate_ComboCode = false;
            var validate = false;

            validate = ComboValidations("HdrSec5_CmbItm_Nm");

            if (validate)
                validate_ComboCode = Validate_ComboCode("HdrSec5_CmbItm_Nm", "ItmNm");

            {
                if (validate && validate_ComboCode) {
                    $("#HdrSec5_CmbItm_Cd").data("kendoComboBox").value(null);
                    $("#HdrSec5_CmbItm_Val").val("");
                    document.getElementById('HdrSec5_CmbItmLdd_Lbl').innerHTML = '.....';
                    FormGlblData.Detail_Editing_LiNo = 0;

                    LoadUnitCombo(ItmKy);
                    LoadTaskUnitCombo(ItmKy);
                    $("#HdrSec5_NmricQty_Val").data("kendoNumericTextBox").value('');
                    $("#HdrSec5_NmricRate_Val").data("kendoNumericTextBox").value(0);
                    $("#HdrSec5_NmricDisPer_Val").data("kendoNumericTextBox").value(0);
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
                    $("#HdrSec5_NmricSubTotal_Val").data("kendoNumericTextBox").value(0);
                    $("#HdrSec5_NmricCrossTotal_Val").data("kendoNumericTextBox").value(0);
                    $("#HdrSec5_NmricNetTotal_Val").data("kendoNumericTextBox").value(0);
                    $("#HdrSec5_CmbTask_Cd").data('kendoComboBox').value(null);
                    $("#HdrSec5_CmbUnit_Cd").data('kendoComboBox').value(null);
                    $("#HdrSec5_CmbItm_Cd").data('kendoComboBox').value(ItmKy);

                }
            }
        },
        filter: "startswith",
        suggest: true,
        placeholder: "Select a ItmNm.."
    });
    ItemComboKeyEventBind();
}



function ComboValidations(cmbNm) {
    var cmb = $("#" + cmbNm + "").data("kendoComboBox");
    var dataItem = cmb.dataItem();
    if (!dataItem) {
        alert("'" + cmb.value() + "' is not a Valid input");
        $("#" + cmbNm + "").data("kendoComboBox").value("");
        $("#" + cmbNm + "").data("kendoComboBox").input.focus();
        return false;
    } else {
        return true;
    }
}

function Validate_ComboCode(ComboNm, ColNm) {

    return true;

    var isVald = false;

    var cmb = $("#" + ComboNm + "").data("kendoComboBox");
    var text = cmb.text();  
    var ds = cmb.dataSource;
    var len = ds._data.length;
    if (len > 0) {
        var i;
        for (i = 0; i < len; i++) {
            var val = ds._data[i][ColNm];
            //alert("Value : " + val);
            //values.push(val);
            if (val == text) {
                isVald = true;
            }
        }
    }

    if (isVald) {
        return true;
    } else {
        alert("'" + text + "' is not a Valid input");
        $("#" + ComboNm + "").data("kendoComboBox").input.focus();
        return false;
    }
}

function OpenItemFindForm(textForSSSerach) {

    //alert("OpenItemFindForm");

    var LocKy = $("#HdrSec2_CmbLoc_Cd").data('kendoComboBox').value();
    if (LocKy == 0 || LocKy == null) {
        var LocKy = 1;
    }
    var PrjKy = $("#HdrSec2_CmbPrj_Cd").data('kendoComboBox').value();
    if (PrjKy == 0 || PrjKy == null) {
        var PrjKy = 1;
    }

    var OrdTypKySelect = FormGlblData.TrnTypKy;

    ItemSelectionPopUpOpen(textForSSSerach, "", viewBag.ObjKy,
    1, OrdTypKySelect, PrjKy, LocKy, 'ItmTyp', 'RM');
}

function SetSelectedItemToItemCombo(ItmKy, ItmCd) {
    ItmKy = Number(ItmKy);

    if (ItmKy > 0) {
        $("#HdrSec5_CmbItm_Val").val(ItmCd);
        $("#HdrSec5_CmbItm_Val").focus();
    }
}

//Data Sources
function AccCdDatasource(ObjNm, PreKy) {
    if (isNaN(PreKy))
        return [];

    var ObjKy = GetObjKy(ObjNm);
    var TrnTypKy = FormGlblData.TrnTypKy;
    var dataSource = new kendo.data.DataSource(
        {
            transport: {
                read: {
                    url: urlComboLoad.AccCd_SelectMob,
                    data: { ObjKy: ObjKy, TrnTypKy: TrnTypKy, PreKy: PreKy },
                    dataType: "json"
                }
            }
        });
    return dataSource;
}



//____Project data source
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
                    'TrnTypKy': 1,
                    'PreKy': 1
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
                    ObjKy: ObjKy
                },
                dataType: "json"
            }
        }

    });
    return dataSource;
}

function AccountDatasource() {

    //var ObjVisible = GetObjVisible(ObjNm);
    //if (ObjVisible == 0) {
    //    return [];
    //}

    var dataSource = new kendo.data.DataSource(
      {
          transport: {
              read: {
                  url: urlTransactionGetCusAccountList,
                  dataType: "json"
              }
          }
      });
    return dataSource;
}

function AddressDatasource() {

    //var ObjVisible = GetObjVisible(ObjNm);
    //if (ObjVisible == 0) {
    //    return [];
    //}

    var dataSource = new kendo.data.DataSource(
      {
          transport: {
              read: {
                  url: urlTransactionGetAddressList,
                  dataType: "json"
              }
          }
      });
    return dataSource;
}

function BUDatasource() {

    //var ObjVisible = GetObjVisible(ObjNm);
    //if (ObjVisible == 0) {
    //    return [];
    //}

    var dataSource = new kendo.data.DataSource(
      {
          transport: {
              read: {
                  url: urlTransactionGetBUlist,
                  dataType: "json"
              }
          }
      });
    return dataSource;
}

function PurAcDatasource() {
    var ConCd = "TrnTyp";
    var OurCd = viewBag.OurCd;
    var dataSource = new kendo.data.DataSource(
      {
          transport: {
              read: {
                  url: urlTransactionGetPurAcList,
                  data: {
                      ConCd: "TrnTyp",
                      OurCd: viewBag.OurCd
                  },
                  dataType: "json"
              }
          }
      });
    return dataSource;
}

function CdMasLookUpDatasource(ConCd) {
    var OurCd = viewBag.OurCd;
    var dataSource = new kendo.data.DataSource(
      {
          transport: {
              read: {
                  url: urlCodesCdMas_LookupWebByConCd,
                  data: {
                      ConCd: ConCd
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
                  url: urlTransactionGetCurrencyList,
                  dataType: "json"
              }
          }
      });
    return dataSource;
}

function ItmCdDatasourceTest(ObjNm) {
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
                      TrnTypKy: FormGlblData.TrnTypKy,
                      PreKy: PreKy
                  },
                  dataType: "json"
              }
          }
      });
    return dataSource;
}

function ItmNmDatasourceTest(ObjNm) {
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
                      TrnTypKy: FormGlblData.TrnTypKy,
                      PreKy: PreKy
                  },
                  dataType: "json"
              }
          }
      });
    return dataSource;
}

function UnitDatasource(ItmKy) {
    if (ItmKy == "?")
        ItmKy = 1;
    var dataSource = new kendo.data.DataSource(
      {
          transport: {
              read: {
                  url: urlTransactionGetItemMultiUnits,
                  data: {
                      ItmKy: ItmKy,
                      TrnTypKy: FormGlblData.TrnTypKy

                  },
                  dataType: "json"
              }
          }
      });
    return dataSource;
}

function TaskDatasource(PrjKy) {
    var dataSource = new kendo.data.DataSource(
      {
          transport: {
              read: {
                  url: urlTransactionGetTaskList,
                  data: {
                      PrjKy: PrjKy
                  },
                  dataType: "json"
              }
          }
      });
    return dataSource;
}
