function LoadCombo() {

    LoadDlvDayCombo();
    LoadDlvNoCombo();
    LoadPrjCdCombo();
    LoadLocCdCombo();
    LoadFrmLocCdCombo();
    LoadAccComboLoad(1);
    LoadAdrCombo(1);
    LoadBUCombo();
    //LoadDlvToCombo();
    LoadPmtCombo();
    LoadCurCombo();
   // LoadItmCombo();
    LoadAnlyCombo();
    LoadUnitCombo(1);
    //LoadTaskCombo(1);
    LoadTaskCombo(1);
    // Spcl Ord Combo
    LoadOrdOutLet();
    LoadOrdOutLetAdr(1);
    LoadDeliNoTo(1);
    LoadProdTime();
    LoadProdDisptTime();
    LoadCustTime();

    LoadDlvNoCombo();
    LoadFindPOCombo();
    LoadOderModeCombo();
    LoadDlvryModeCombo();
   
    $("#HdrSec5_CmbItm_Cd").kendoComboBox({ //for viewing purposes only
        dataValueField: "ItmKy",
        dataTextField: "ItmCd",
        dataSource: [{ ItmKy: 1, ItmCd:""}],
        placeholder: "Select a ItmCd.."
    });

    //$("#HdrSec2_CmbDeliNoTo_Cd").parent().css('width', "40%");
    //$("#HdrSec2_CmbDeliNoTo_Nm").parent().css('width', "58%");

    //$("HdrSec1_CmbDay_Cd").parent().css('width', "40%");
    //$("HdrSec1_CmbDeliNo_Cd").css('width', "40%");
    //$("#HdrSec5_CmbItm_Cd").parent().css('width', "31%");
    //$("#HdrSec5_CmbItm_Nm").parent().css('width', "58%");
    //$("#HdrSec2_CmbPrj_Cd").parent().css('width', "40%");
    //$("#HdrSec3_CmbPmtTrms_Cd").parent().css('width', "100%");
    //$("#HdrSec3_CmbCurrncy_Cd").parent().css('width', "100%");
    //$("#HdrSec2_CmbLoc_Cd").parent().css('width', "40%");
    //$("#HdrSec2_CmbFrmLoc_Cd").parent().css('width', "40%");
    //$("#HdrSec2_CmbPrj_Nm").parent().css('width', "58%");
    //$("#HdrSec2_CmbLoc_Nm").parent().css('width', "58%");
    //$("#HdrSec2_CmbFrmLoc_Nm").parent().css('width', "58%");
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
//FindForm ComboLoad Start--------------------------------------------------
function LoadFindPOCombo() {
    $("#HdrSec16_Cmb_FF_Loc_Cd").kendoComboBox({
        dataValueField: "CdKy",
        dataTextField: "Code",
        dataSource: dataSrcCreateCodeCdMasLookUp('HdrSec16_Cmb_FF_Loc'),
        change: function (e) {
            var cmb = $("#HdrSec16_Cmb_FF_Loc_Cd").data("kendoComboBox");
            var CdKy = cmb.value();
            if (CdKy != "") {
                var validate = ComboValidations("HdrSec16_Cmb_FF_Loc_Cd");
                if (validate) {
                    $("#HdrSec16_Cmb_FF_Loc_Nm").data("kendoComboBox").value(CdKy);
                } else {
                    $("#HdrSec16_Cmb_FF_Loc_Nm").data("kendoComboBox").value("");
                    $("#HdrSec16_Cmb_FF_Loc_Cd").data("kendoComboBox").value("");
                }
            }
        },
        filter: "startswith",
        suggest: true,
        placeholder: "Location"
    });

    $("#HdrSec16_Cmb_FF_Loc_Nm").kendoComboBox({
        dataValueField: "CdKy",
        dataTextField: "CdNm",
        dataSource: dataSrcCreateCdNmCdMasLookUp('HdrSec16_Cmb_FF_Loc'),
        change: function (e) {
            var cmb = $("#HdrSec16_Cmb_FF_Loc_Nm").data("kendoComboBox");
            var CdKy = cmb.value();
            if (CdKy != "") {
                var validate = ComboValidations("HdrSec16_Cmb_FF_Loc_Nm");
                if (validate) {
                    $("#HdrSec16_Cmb_FF_Loc_Cd").data("kendoComboBox").value(CdKy);
                } else {
                    $("#HdrSec16_Cmb_FF_Loc_Cd").data("kendoComboBox").value("");
                    $("#HdrSec16_Cmb_FF_Loc_Nm").data("kendoComboBox").value("");
                }
            }
        },
        filter: "startswith",
        suggest: true,
        placeholder: "Location"
    });

    $("#HdrSec16_Cmb_FF_AprStatesAction_Nm")
       .kendoComboBox({
           dataTextField: "CdNm",
           dataValueField: "CdKy",
           dataSource: dataSrcCreateCdNmCdMasLookUp('HdrSec16_Cmb_FF_AprStatesAction'),
           change: function (e) {

               var comboboxText = $("#HdrSec16_Cmb_FF_AprStatesAction_Nm").data("kendoComboBox");
               var cmbValue = comboboxText.value();
               var validate = ComboValidations("HdrSec16_Cmb_FF_AprStatesAction_Nm");
           },
           filter: "contains",
           suggest: true,
           placeholder: "Approve Status"
       })

    $("#HdrSec16_Cmb_FF_TrnNo_Cd")
           .kendoComboBox({
               dataTextField: "Code",
               dataValueField: "CdKy",
               dataSource: dataSrcCreateCodeCdMasLookUp('HdrSec16_Cmb_FF_TrnNo'),
               change: function (e) {

                   var comboboxText = $("#HdrSec16_Cmb_FF_TrnNo_Cd").data("kendoComboBox");
                   var cmbValue = comboboxText.value();
                   var validate = ComboValidations("HdrSec16_Cmb_FF_TrnNo_Cd");
               },
               filter: "contains",
               suggest: true,
               placeholder: "Prefix"
           })
}
//FindForm ComboLoad End--------------------------------------------------
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
                    //$("#HdrSec2_CmbPrj_Nm").data("kendoComboBox").value(prjky);
                    FormGlblData.IsDetailRelatedHdrSectionChanged = true;
                    LoadTaskCombo(prjky);
                } else {
                    //$("#HdrSec2_CmbPrj_Nm").data("kendoComboBox").value("");
                }
            }
        },
        filter:"contains",
            
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
    //                $("#HdrSec2_CmbPrj_Nm").data("kendoComboBox").value(prjky);
    //                $("#HdrSec2_CmbPrj_Cd").data("kendoComboBox").value(prjky);

    //                FormGlblData.IsDetailRelatedHdrSectionChanged = true;
    //                LoadTaskCombo(prjky);
    //            } else {
    //                $("#HdrSec2_CmbPrj_Cd").data("kendoComboBox").value("");
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
                    FormGlblData.IsDetailRelatedHdrSectionChanged = true;
                    LoadItmCombo();
                } else {
                    $("#HdrSec2_CmbLoc_Cd").data("kendoComboBox").value("");
                }
            }
        },
        filter: "contains", 
            
        suggest: true,
        placeholder: "Select a Location.."
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
    //                FormGlblData.IsDetailRelatedHdrSectionChanged = true;
    //                LoadItmCombo();
    //            } else {
    //                $("#HdrSec2_CmbLoc_Cd").data("kendoComboBox").value("");
    //            }
    //        }
    //    },
    //    filter: "startswith",
    //    suggest: true,
    //    placeholder: "Select a Location.."
    //});
}



function LoadBUCombo() {
    $("#HdrSec2_CmbBU_Cd").kendoComboBox({
        dataValueField: "CdKy",
        dataTextField: "Code",
        dataSource: dataSrcCreateCodeCdMasLookUp('HdrSec2_CmbBU'),
        change: function (e) {
            var cmb = $("#HdrSec2_CmbBU_Cd").data("kendoComboBox");
            var CdKy = cmb.value();
            if (CdKy != "") {
                var validate = ComboValidations("HdrSec2_CmbBU_Cd");
                if (validate) {
                    //$("#HdrSec2_CmbBU_Nm").data("kendoComboBox").value(CdKy);                  
                } else {
                    //$("#HdrSec2_CmbBU_Nm").data("kendoComboBox").value("");
                }
            }
        },
        filter: "contains", 
            
        suggest: true,
        placeholder: "Select a BU.."
    });

    //$("#HdrSec2_CmbBU_Nm").kendoComboBox({
    //    dataValueField: "CdKy",
    //    dataTextField: "CdNm",
    //    dataSource: dataSrcCreateCdNmCdMasLookUp('HdrSec2_CmbBU'),
    //    change: function (e) {
    //        var cmb = $("#HdrSec2_CmbBU_Nm").data("kendoComboBox");
    //        var CdKy = cmb.value();
    //        if (CdKy != "") {
    //            var validate = ComboValidations("HdrSec2_CmbBU_Nm");
    //            if (validate) {
    //                $("#HdrSec2_CmbBU_Cd").data("kendoComboBox").value(CdKy);                   
    //            } else {
    //                $("#HdrSec2_CmbBU_Cd").data("kendoComboBox").value("");
    //            }
    //        }
    //    },
    //    filter: "startswith",
    //    suggest: true,
    //    placeholder: "Select a BU.."
    //});
}




function LoadFrmLocCdCombo() {
    $("#HdrSec2_CmbFrmLoc_Cd").kendoComboBox({
        dataValueField: "CdKy",
        dataTextField: "Code",
        dataSource: dataSrcCreateCodeCdMasLookUp('HdrSec2_CmbLoc'),
        change: function (e) {
            var cmb = $("#HdrSec2_CmbFrmLoc_Cd").data("kendoComboBox");
            var CdKy = cmb.value();
            if (CdKy != "") {
                var validate = ComboValidations("HdrSec2_CmbFrmLoc_Cd");
                if (validate) {
                    //$("#HdrSec2_CmbFrmLoc_Nm").data("kendoComboBox").value(CdKy);
                    FormGlblData.IsDetailRelatedHdrSectionChanged = true;
                } else {
                    $("#HdrSec2_CmbFrmLoc_Cd").data("kendoComboBox").value("");
                }
            }
        },
        filter: //"contains", 
           GetFilterOpction('HdrSec2_CmbLoc'),
        suggest: true,
        placeholder: "Select a From Location.."
    });

    //$("#HdrSec2_CmbFrmLoc_Nm").kendoComboBox({
    //    dataValueField: "CdKy",
    //    dataTextField: "CdNm",
    //    dataSource: dataSrcCreateCdNmCdMasLookUp('HdrSec2_CmbLoc'),
    //    change: function (e) {
    //        var cmb = $("#HdrSec2_CmbFrmLoc_Nm").data("kendoComboBox");
    //        var CdKy = cmb.value();
    //        if (CdKy != "") {
    //            var validate = ComboValidations("HdrSec2_CmbFrmLoc_Nm");
    //            if (validate) {
    //                $("#HdrSec2_CmbFrmLoc_Cd").data("kendoComboBox").value(CdKy);
    //                FormGlblData.IsDetailRelatedHdrSectionChanged = true;
    //            } else {
    //                $("#HdrSec2_CmbFrmLoc_Cd").data("kendoComboBox").value("");
    //            }
    //        }
    //    },
    //    filter: "startswith",
    //    suggest: true,
    //    placeholder: "Select a From Location.."
    //});
}

function LoadAccComboLoad(PreKy) {

    PreKy = Number(PreKy);
    if (PreKy == "" || PreKy == null || PreKy == undefined) PreKy = 1;

    $("#HdrSec2_CmbSupAcc_Cd").kendoComboBox({
        dataValueField: "AccKy",
        dataTextField: "AccCd",
        dataSource: AccCdDatasource('HdrSec2_CmbSupAcc', PreKy),
        change: function (e) {
            var cmb = $("#HdrSec2_CmbSupAcc_Cd").data("kendoComboBox");
            var AccKy = cmb.value();
            if (AccKy != "") {
                var validate = ComboValidations("HdrSec2_CmbSupAcc_Cd");
                if (validate) {
                    //$("#HdrSec2_CmbSupAcc_Nm").data("kendoComboBox").value(AccKy);
                    //$("#HdrSec2_CmbSupAcc_Cd").data("kendoComboBox").value(AccKy);

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
    //    dataSource: AccNmDatasource('HdrSec2_CmbSupAcc', PreKy),
    //    change: function (e) {
    //        var cmb = $("#HdrSec2_CmbSupAcc_Nm").data("kendoComboBox");
    //        var AccKy = cmb.value();
    //        if (AccKy != "") {
    //            var validate = ComboValidations("HdrSec2_CmbSupAcc_Nm");
    //            if (validate) {
    //                //$("#HdrSec2_CmbSupAcc_Nm").data("kendoComboBox").value(AccKy);
    //                $("#HdrSec2_CmbSupAcc_Cd").data("kendoComboBox").value(AccKy);
    //                FormGlblData.IsDetailRelatedHdrSectionChanged = true;
    //                GetAdrKyByAccKy(AccKy);
    //                setDefault();
    //            } else {
    //                //$("#HdrSec2_CmbSupAcc_Nm").data("kendoComboBox").value("");
    //                $("#HdrSec2_CmbSupAcc_Cd").data("kendoComboBox").value("");
    //            }
    //        }
    //    },
    //    filter: "startswith",
    //    suggest: true,
    //    placeholder: "Select a Account.."
    //});

    $("#HdrSec2_CmbSupAcc_Cd").parent().css('width', "40%");
    //$("#HdrSec2_CmbSupAcc_Nm").parent().css('width', "58%");
}

function LoadDlvToCombo() {
    //$("#HdrSec3_CmbDeliTo_Nm").kendoComboBox({
    //    dataValueField: "AdrKy",
    //    dataTextField: "AdrNm",
    //    dataSource: DlvToDatasource(),
    //    filter: "contains",
    //    suggest: true,
    //    placeholder: "Select a Dlv To.."
    //});
}

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
                    //$("#HdrSec3_CmbPmtTrms_Cd").val(PreKy);
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
                    //$("#HdrSec3_CmbCurrncy_Cd").data("kendoComboBox").value(cur);
                    //$("#HdrSec3_CmbCurrncy_Cd").data("kendoComboBox").value(cur);
                    FormGlblData.IsDetailRelatedHdrSectionChanged = true;
                    //LoadGridView1(cur);
                } else {
                    //$("#HdrSec3_CmbCurrncy_Cd").data("kendoComboBox").value("");
                    $("#HdrSec3_CmbCurrncy_Cd").data("kendoComboBox").value("");
                }
            }
        },
        filter: "contains",
        suggest: true,
        placeholder: "Select a Currency.."
    });
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
    var FrmLcKy = $("#HdrSec2_CmbFrmLoc_Cd").data("kendoComboBox").value();
    if (!FrmLcKy || FrmLcKy == "") {
        FrmLcKy = 1;
    }
  
    $.ajax({
        url: urlGetAvilableQty,
        data: JSON.stringify({
            ItmKy: ItmKy,
            FrmPrjKy: FrmPrjKy,
            ToPrjKy: 1,
            FrmLockKy: FrmLcKy,
            ToLocKy: 1,
            TrnTyp:FormGlblData.OrdTypKy,
            ObjKy: viewBag.ObjKy,

        }),
        contentType: 'application/json; charset=utf-8',
        dataType: "Json",
        type: "POST",
        success: function (data) {
            if (data) {
                document.getElementById('HdrSec5_CmbItmLdd_Lbl').innerHTML = 'Brand : ' + data.ItmBrnd + '<br/>Avl.Qty : ' + data.Qty + '<br/>Bud.Qty : ' + data.AvlBudgetQty;
                
            }
  
        },
        error: function (e) {
            alert("Sorry, We Couldn't retrive the data !\nPlease Try Again!");
            return false;
        }
    });

}

var LoadItmCombo_IsFire_IsFirst = true;
function LoadItmCombo() {
    LoadItmCombo_IsFire_IsFirst = false;
    $("#HdrSec5_CmbItm_Cd").kendoComboBox({
        dataValueField: "ItmKy",
        dataTextField: "ItmCd",
        dataSource: ItmCdDatasource('HdrSec5_CmbItm'),
        change: function (e) {
            
            //var cmb = $("#HdrSec5_CmbItm_Cd").data("kendoComboBox");
            //var cmbText = cmb.text();

            var comboboxText = $("#HdrSec5_CmbItm_Cd").data("kendoComboBox");
            var cmbText = comboboxText.text();
            var comboboxValue = $("#HdrSec5_CmbItm_Cd").data("kendoComboBox");
            var cmbValue = comboboxValue.value();
            //GetItemQty();
            if ((cmbText == "?") || (cmbText.slice(-1) == "?")) {
               
                //$("#HdrSec5_CmbItm_Cd").data("kendoComboBox").value(null);
                //$("#HdrSec5_CmbItm_Cd").data("kendoComboBox").trigger("change");
                //OpenItemFindForm(cmbText);
            } else {

                var ItmKy = cmbValue; //$("#HdrSec5_CmbItm_Cd").data("kendoComboBox").value();
               // GetItemQty();
                //if (ItmKy != "") {
                var validate = ComboValidations("HdrSec5_CmbItm_Cd");
                {
                    if (validate) {

                        //$("#HdrSec5_CmbItm_Nm").data("kendoComboBox").value(ItmKy);
                        $("#HdrSec5_CmbItm_Val").val("");
                        //$("#HdrSec5_CmbItm_Nm").data("kendoComboBox").trigger("change");//28/06/2018 narmada
                        GetItemQty();

                        document.getElementById('HdrSec5_CmbItmLdd_Lbl').innerHTML = '.....';

                        LoadUnitCombo(ItmKy);
                       // $("#HdrSec5_CmbUnit_Cd").data("kendoComboBox").trigger("change");
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
                        $("#HdrSec5_NmricLiNo_Val").data("kendoNumericTextBox").value(0);
                        $("#HdrSec5_CmbTask_Cd").data('kendoComboBox').value(null);
                        $("#HdrSec5_CmbUnit_Cd").data('kendoComboBox').value(null);
                        $("#HdrSec5_TxtDes_Val").val(null);
                        $("#HdrSec5_TxtRem_Val").val(null);
                        $("#HdrSec5_TxtItmNo_Val").val(null);
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
    //        //var cmb = $("#HdrSec5_CmbItm_Nm").data("kendoComboBox");
    //        //var cmbText = cmb.text();

    //        var comboboxText = $("#HdrSec5_CmbItm_Nm").data("kendoComboBox");
    //        var cmbText = comboboxText.text();
    //        var comboboxValue = $("#HdrSec5_CmbItm_Nm").data("kendoComboBox");
    //        var cmbValue = comboboxValue.value();
    //        //var object = this.dataItem(this.select());
    //        GetItemQty();
    //        if ((cmbText == "?") || (cmbText.slice(-1) == "?")) {
    //            //$("#HdrSec5_CmbItm_Nm").data("kendoComboBox").value(null);
    //            //$("#HdrSec5_CmbItm_Nm").data("kendoComboBox").trigger("change");//28/06/2018 narmada
    //            //OpenItemFindForm(cmbText);
    //        } else {
    //            var ItmKy = cmbValue;
    //            //if (ItmKy != "") {
    //            //GetItemQty();
    //            var validate = ComboValidations("HdrSec5_CmbItm_Nm");
    //            {
    //                if (validate) {

    //                    $("#HdrSec5_CmbItm_Cd").data("kendoComboBox").value(ItmKy);
    //                    $("#HdrSec5_CmbItm_Val").val("");
    //                    GetItemQty();
    //                    document.getElementById('HdrSec5_CmbItmLdd_Lbl').innerHTML = '.....';
                        
    //                    LoadUnitCombo(ItmKy);

    //                    $("#HdrSec5_CmbUnit_Cd").data("kendoComboBox").trigger("change");
                        
    //                    $("#HdrSec5_NmricQty_Val").data("kendoNumericTextBox").value('');
    //                    $("#HdrSec5_NmricRate_Val").data("kendoNumericTextBox").value(0);
    //                    $("#HdrSec5_NmricDisPer_Val").data("kendoNumericTextBox").value(0);
    //                    $("#HdrSec5_NmricDisAmt_Val").data("kendoNumericTextBox").value(0);
    //                    $("#HdrSec5_NmricVatAmt_Val").data("kendoNumericTextBox").value(0);
    //                    $("#HdrSec5_NmricVatPer_Val").data("kendoNumericTextBox").value(0);
    //                    $("#HdrSec5_NmricVatAmt_Val").data("kendoNumericTextBox").value(0);
    //                    $("#HdrSec5_NmricSVatPer_Val").data("kendoNumericTextBox").value(0);
    //                    $("#HdrSec5_NmricSVatAmt_Val").data("kendoNumericTextBox").value(0);
    //                    $("#HdrSec5_NmricNbtPer_Val").data("kendoNumericTextBox").value(0);
    //                    $("#HdrSec5_NmricNbtAmt_Val").data("kendoNumericTextBox").value(0);
    //                    $("#HdrSec5_NmricWhtPer_Val").data("kendoNumericTextBox").value(0);
    //                    $("#HdrSec5_NmricWhtAmt_Val").data("kendoNumericTextBox").value(0);
    //                    $("#HdrSec5_NmricLiNo_Val").data("kendoNumericTextBox").value(0);
    //                    $("#HdrSec5_CmbTask_Cd").data('kendoComboBox').value(null);
    //                    $("#HdrSec5_CmbUnit_Cd").data('kendoComboBox').value(null);

    //                    $("#HdrSec5_TxtItmNo_Val").val(null);
    //                } else {
    //                    $("#HdrSec5_CmbItm_Cd").data("kendoComboBox").value("");
    //                    //$("#HdrSec5_CmbItm_Nm").data("kendoComboBox").value("");
    //                }
    //            }
    //        }
    //    },
    //    filter: "startswith",
    //    suggest: true,
    //    placeholder: "Select a ItmNm.."
    //});

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
                //GetRate();
                GetItmRelatedDet();
            }
            event.preventDefault();
        }
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
    //            // GetRate();
    //            GetItmRelatedDet();
    //        }
    //        event.preventDefault();
    //    }
    //});

    $("#HdrSec5_CmbItm_Cd").keydown(function (event) {
        event.preventDefault();
    });

    //$("#HdrSec5_CmbItm_Nm").keydown(function (event) {
    //    event.preventDefault();
    //});

    $("#HdrSec1_CmbPOrdNo_Cd").kendoComboBox({
        dataValueField: "OrdKy",
        dataTextField: "OrdNo",
        dataSource: OrdNo_SelectMob_Datasource('HdrSec1_CmbPOrdNo'),
        change: function (e) {
            var cmb = $("#HdrSec1_CmbPOrdNo_Cd").data("kendoComboBox");
            var val = cmb.value();
            var validate = ComboValidations("HdrSec1_CmbPOrdNo_Cd");
        },
        filter: "contains",
        suggest: true,
        placeholder: "Select OrdNo"
    });

}

function LoadAnlyCombo() {
    $("#HdrSec5_CmbAnaly_Cd").kendoComboBox({
        dataValueField: "CdKy",
        dataTextField: "Code",
        dataSource: Anly3Datasource(),
        change: function (e) {
            var validate = ComboValidations("HdrSec5_CmbAnaly_Cd");
        },
        filter: "contains",
        suggest: true,
        placeholder: "Select a Analysis.."
    });
    $("#HdrSec5_CmbAnaly_Cd").data("kendoComboBox").input.keypress(function (event) {

        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {
            var LiNo = $("#HdrSec5_NmricLiNo_Val").data("kendoNumericTextBox").value();
            if (LiNo == 0 || LiNo == null || LiNo == undefined) {
                setItmDetailbyEnterky();

            } else {

                changeItemRalatedTotal();

            }
            event.preventDefault();
        }
    });

}

function LoadTaskCombo(PrjKy) {
    $("#HdrSec5_CmbTask_Cd").kendoComboBox({
        dataValueField: "PrcsDetKy",
        dataTextField: "TaskID",
        dataSource: TaskDatasource('HdrSec5_CmbTask', PrjKy),
        change: function (e) {
            var validate = ComboValidations("HdrSec5_CmbTask_Cd");
        },
        filter: "contains", 
            
        suggest: true,
        placeholder: "Select a Task.."
    });


    $("#HdrSec5_CmbTask_Cd").data("kendoComboBox").input.keypress(function (event) {

        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {
            var LiNo = $("#HdrSec5_NmricLiNo_Val").data("kendoNumericTextBox").value();
            if (LiNo == 0 || LiNo == null || LiNo == undefined) {
                setItmDetailbyEnterky();
            } else {
                changeItemRalatedTotal();
            }
            event.preventDefault();
        }
    });
}
function makeKeyPressEvent(keyName, keyCode, charCode) {
    var event = new KeyboardEvent('keypress');
    Object.defineProperties(event, {
        charCode: { value: charCode },
        keyCode: { value: keyCode },
        keyIdentifier: { value: keyName },
        which: { value: keyCode }
    });
    return event;
}

function LoadUnitCombo(ItmKy) {

    $("#HdrSec5_CmbUnit_Cd").kendoComboBox({
        dataValueField: "UnitKy",
        dataTextField: "Unit",
        dataSource: UnitDatasource(ItmKy),
        index:0,
        change: function (e) {
            var validate = ComboValidations("HdrSec5_CmbUnit_Cd");
        },
        filter: "contains",
        suggest: true,
        placeholder: "Unit"
    });

    var combobox = $("#HdrSec5_CmbUnit_Cd").data("kendoComboBox");
    var selectedIndex = combobox.select();

    $("#HdrSec5_CmbUnit_Cd").data("kendoComboBox").input.keydown(function (event) {

        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {
            //$("#HdrSec5_NmricQty_Val").kendoNumericTextBox({ min: 0, spinners: false }).siblings("input:visible").focus();     
            //$('#HdrSec5_NmricQty_Val').keyup('13');
            var LiNo = $("#HdrSec5_NmricLiNo_Val").data("kendoNumericTextBox").value();
            if (LiNo == 0 || LiNo == null || LiNo == undefined) {
                setItmDetailbyEnterky();
                event.keyCode = '0';
            } else {
                changeItemRalatedTotal();
                event.keyCode = '0';
            }
            event.preventDefault();
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
                    //$("#HdrSec2_CmbAdr_Cd").data("kendoComboBox").value(AdrKy);
                    //$("#HdrSec2_CmbAdr_Nm").data("kendoComboBox").value(AdrKy);
                    FormGlblData.IsDetailRelatedHdrSectionChanged = true;
                    setDefault();
                } else {
                    //$("#HdrSec2_CmbAdr_Cd").data("kendoComboBox").value(null);
                    //$("#HdrSec2_CmbAdr_Nm").data("kendoComboBox").value(null);
                }
            }
        },
        filter: "startswith",
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
    //                //$("#HdrSec2_CmbAdr_Nm").data("kendoComboBox").value(AdrKy);
    //                FormGlblData.IsDetailRelatedHdrSectionChanged = true;
    //                setDefault();
    //            } else {
    //                //$("#HdrSec2_CmbAdr_Nm").data("kendoComboBox").value(null);
    //                $("#HdrSec2_CmbAdr_Cd").data("kendoComboBox").value(null);
    //            }
    //        }
    //    },
    //    filter: "startswith",
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
                    //$("#HdrSec2_CmbRepAdr_Cd").data("kendoComboBox").value(AdrKy);
                    //$("#HdrSec2_CmbRepAdr_Nm").data("kendoComboBox").value(AdrKy);
                    FormGlblData.IsDetailRelatedHdrSectionChanged = true;
                    setDefault();
                } else {
                    //$("#HdrSec2_CmbRepAdr_Cd").data("kendoComboBox").value(null);
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
    //                //$("#HdrSec2_CmbRepAdr_Nm").data("kendoComboBox").value(AdrKy);
    //                FormGlblData.IsDetailRelatedHdrSectionChanged = true;
    //                setDefault();
    //            } else {
    //                //$("#HdrSec2_CmbRepAdr_Nm").data("kendoComboBox").value(null);
    //                $("#HdrSec2_CmbRepAdr_Cd").data("kendoComboBox").value(null);
    //            }
    //        }
    //    },
    //    filter: "startswith",
    //    suggest: true,
    //    placeholder: "Select a Address.."
    //});

    $("#HdrSec2_CmbDistAdr_Cd").kendoComboBox({
        dataValueField: "AdrKy",
        dataTextField: "AdrID",
        dataSource: AdrID_SelectMob_DataSourceWithTrnTyp('HdrSec2_CmbDistAdr', PreKy),//AdrByAccDatasource(AccKy),
        change: function (e) {
            var cmb = $("#HdrSec2_CmbDistAdr_Cd").data("kendoComboBox");
            var DistAdrKy = cmb.value();
            if (DistAdrKy != "") {
                var validate = ComboValidations("HdrSec2_CmbDistAdr_Cd");
                if (validate) {
                    //$("#HdrSec2_CmbRepAdr_Cd").data("kendoComboBox").value(AdrKy);
                    //$("#HdrSec2_CmbDistAdr_Nm").data("kendoComboBox").value(DistAdrKy);
                    FormGlblData.IsDetailRelatedHdrSectionChanged = true;
                    setDefault();
                } else {
                    //$("#HdrSec2_CmbRepAdr_Cd").data("kendoComboBox").value(null);
                    //$("#HdrSec2_CmbDistAdr_Nm").data("kendoComboBox").value(null);
                }
            }
        },
        filter: "contains",
        suggest: true,
        placeholder: "Select a Address.."
    });

    //$("#HdrSec2_CmbDistAdr_Nm").kendoComboBox({
    //    dataValueField: "AdrKy",
    //    dataTextField: "AdrID",
    //    dataSource: AdrID_SelectMob_DataSourceWithTrnTyp('HdrSec2_CmbDistAdr', PreKy),//AdrByAccDatasource(AccKy),
    //    change: function (e) {
    //        var cmb = $("#HdrSec2_CmbDistAdr_Nm").data("kendoComboBox");
    //        var DistAdrKy = cmb.value();
    //        if (DistAdrKy != "") {
    //            var validate = ComboValidations("HdrSec2_CmbDistAdr_Nm");
    //            if (validate) {
    //                //$("#HdrSec2_CmbRepAdr_Cd").data("kendoComboBox").value(AdrKy);
    //                $("#HdrSec2_CmbDistAdr_Cd").data("kendoComboBox").value(DistAdrKy);
    //                FormGlblData.IsDetailRelatedHdrSectionChanged = true;
    //                setDefault();
    //            } else {
    //                //$("#HdrSec2_CmbRepAdr_Cd").data("kendoComboBox").value(null);
    //                $("#HdrSec2_CmbDistAdr_Cd").data("kendoComboBox").value(null);
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
    $("#HdrSec2_CmbDistAdr_Cd").parent().css('width', "40%");
    //$("#HdrSec2_CmbDistAdr_Nm").parent().css('width', "58%");
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
                url: urlGetAddressCd,
                data: {
                    ObjKy: ObjKy,
                    'PreKy': "1"
                },
                dataType: "json",
                cache: false
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



function ProjectCd(ObjNm) {
    //var ObjVisible = GetObjVisible(ObjNm);
    //if (ObjVisible == 0) {
    //    return [];
    //}
    //var ObjKy = GetObjKy(ObjNm);
    //var dataSource = new kendo.data.DataSource(
    //{
    //    transport: {
    //        read: {
    //            url: urlGetProjectCode,
    //            data: {
    //                'ObjKy': ObjKy
    //            },
    //            dataType: "json"
    //        }
    //    }

    //});
    //return dataSource;

    var ObjKy = GetObjKy(ObjNm);
   
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

//Details Account code
function DetailAccountCdload(ObjNm) {
    var ObjVisible = GetObjVisible(ObjNm);
    if (ObjVisible == 0) {
        return [];
    }
    var ObjKy = GetObjKy(ObjNm);
    var PreKy = 1;
    var dataSource = new kendo.data.DataSource(
    {
        transport: {
            read: {
                url: urlDetailAccCode,
                data: {
                    ObjKy: ObjKy
                },
                dataType: "json"
            }
        }

    });
    return dataSource;

}

function DetailAccountNmload(ObjNm) {
    var ObjVisible = GetObjVisible(ObjNm);
    if (ObjVisible == 0) {
        return [];
    }
    var ObjKy = GetObjKy(ObjNm);
    var PreKy = 1;

    var dataSource = new kendo.data.DataSource(
    {
        transport: {
            read: {
                url: urlGetAccDoropNm,
                data: {
                    ObjKy: ObjKy
                },
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
                //$("#HdrSec2_CmbAdr_Cd").data("kendoComboBox").value(null);
                //$("#HdrSec2_CmbAdr_Nm").data("kendoComboBox").value(null);
                for (i = 0; i < list.length; i++) {
                    var AdrKy = list[0].AdrKy;
                    //var AdrNm = list[0].AdrNm;
                    //var AdrID = list[0].AdrID;
                    $("#HdrSec2_CmbAdr_Cd").data("kendoComboBox").value(AdrKy);
                    //$("#HdrSec2_CmbAdr_Cd").data("kendoComboBox").text(AdrID);
                    //$("#HdrSec2_CmbAdr_Nm").data("kendoComboBox").value(AdrKy);
                    // $("#HdrSec2_CmbAdr_Nm").data("kendoComboBox").text(AdrNm);  


                    //as per the requirement, removeed by Ariram 5/22/2018
                    //$("#HdrSec2_CmbDeliNoTo_Cd").data("kendoComboBox").value(AdrKy);
                    //$("#HdrSec2_CmbDeliNoTo_Nm").data("kendoComboBox").value(AdrKy);

                }

            }

        },
        error: function (e) {

        }

    });
}

function ItmCdDatasource(ObjNm) {
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
                      OrdTypKy : FormGlblData.OrdTypKy
                  },
                  dataType: "json"
              }
          }
      });
    return dataSource;
}

function TaskDatasource(ObjNm, PrjKy) {
    var ObjKy = GetObjKy(ObjNm);
    var dataSource = new kendo.data.DataSource(
      {
          transport: {
              read: {
                  url: urlComboLoad.TaskID_SelectMob,
                  data: {
                      ObjKy: ObjKy,
                      PrjKy: PrjKy,

                  },
                  dataType: "json"
              }
          }
      });
    return dataSource;
}

function Anly3Datasource() {

    var dataSource = new kendo.data.DataSource(
      {
          transport: {
              read: {
                  url: urlGetAnlTypForOrder,
                  data: {
                      ConCd: "AnlTyp3"
                  },
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
        
        GetRate();
        $("#HdrSec5_NmricQty_Val").data("kendoNumericTextBox").focus();
    }
}

function LoadOderModeCombo() {
    $("#HdrSec2_CmbOrdMode_Cd").kendoComboBox({
        dataValueField: "CdKy",
        dataTextField: "Code",
        dataSource: dataSrcCreateCodeCdMasLookUp('HdrSec2_CmbOrdMod'),
        change: function (e) {
            var cmb = $("#HdrSec2_CmbOrdMode_Cd").data("kendoComboBox");
            var CdKy = cmb.value();
            if (CdKy != "") {
                var validate = ComboValidations("HdrSec2_CmbOrdMode_Cd");
                if (validate) {
                    $("#HdrSec2_CmbOrdMode_Nm").data("kendoComboBox").value(CdKy);                  
                } else {
                    $("#HdrSec2_CmbOrdMode_Cd").data("kendoComboBox").value("");
                }
            }
        },
        filter: "contains",
        suggest: true,
        placeholder: "Select a Order Mode.."
    });

    $("#HdrSec2_CmbOrdMode_Nm").kendoComboBox({
        dataValueField: "CdKy",
        dataTextField: "CdNm",
        dataSource: dataSrcCreateCdNmCdMasLookUp('HdrSec2_CmbOrdMode'),
        change: function (e) {
            var cmb = $("#HdrSec2_CmbOrdMode_Nm").data("kendoComboBox");
            var CdKy = cmb.value();
            if (CdKy != "") {
                var validate = ComboValidations("HdrSec2_CmbOrdMode_Nm");
                if (validate) {
                    $("#HdrSec2_CmbOrdMode_Cd").data("kendoComboBox").value(CdKy);                  
                } else {
                    $("#HdrSec2_CmbOrdMode_Cd").data("kendoComboBox").value("");
                }
            }
        },
        filter: "contains",
        suggest: true,
        placeholder: "Select a Order Mode...."
    });

}


function LoadDlvryModeCombo() {
    $("#HdrSec2_CmbDlvryMode_Cd").kendoComboBox({
        dataValueField: "CdKy",
        dataTextField: "Code",
        dataSource: dataSrcCreateCodeCdMasLookUp('HdrSec2_CmbDlvryMode'),
        change: function (e) {
            var cmb = $("#HdrSec2_CmbDlvryMode_Cd").data("kendoComboBox");
            var CdKy = cmb.value();
            if (CdKy != "") {
                var validate = ComboValidations("HdrSec2_CmbDlvryMode_Cd");
                if (validate) {
                    $("#HdrSec2_CmbDlvryMode_Nm").data("kendoComboBox").value(CdKy);
                   
                } else {
                    $("#HdrSec2_CmbDlvryMode_Cd").data("kendoComboBox").value("");
                }
            }
        },
        filter: "contains",
        suggest: true,
        placeholder: "Select a Delivery Mode.."
    });

    $("#HdrSec2_CmbDlvryMode_Nm").kendoComboBox({
        dataValueField: "CdKy",
        dataTextField: "CdNm",
        dataSource: dataSrcCreateCdNmCdMasLookUp('HdrSec2_CmbOrdMode'),
        change: function (e) {
            var cmb = $("#HdrSec2_CmbDlvryMode_Nm").data("kendoComboBox");
            var CdKy = cmb.value();
            if (CdKy != "") {
                var validate = ComboValidations("HdrSec2_CmbDlvryMode_Nm");
                if (validate) {
                    $("#HdrSec2_CmbDlvryMode_Cd").data("kendoComboBox").value(CdKy);                  
                } else {
                    $("#HdrSec2_CmbDlvryMode_Cd").data("kendoComboBox").value("");
                }
            }
        },
        filter: "contains",
        suggest: true,
        placeholder: "Select a Delivery Mode...."
    });

}