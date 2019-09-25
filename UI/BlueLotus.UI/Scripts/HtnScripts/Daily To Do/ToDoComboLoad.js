function LoadApproveCombo() {
    $("#HdrSec2_Cmb_AprStates_Val").kendoComboBox({
        dataTextField: "CdNm",
        dataValueField: "CdKy",
        dataSource: CdNm_SelectMob_Datasource('HdrSec2_Cmb_AprStates'),
        change: function (e) {
            var comboboxText = $("#HdrSec2_Cmb_AprStates_Val").data("kendoComboBox");
            var cmbValue = comboboxText.value();
            //if (isNaN('HdrSec2_Cmb_AprStates')) {
            //    alert("'" + cmbValue + "' is not a Valid input");
            //    comboboxText.value("");
            //}
            $("#HdrSec2_Cmb_AprStates_Val").data("kendoComboBox").value(cmbValue);
        },
        filter: "contains",
        suggest: true,
        placeholder: "Status"
    });
}



function LoadPrjCombo() {
    $("#HdrSec1_CmbPrj_Cd").kendoComboBox({
        dataValueField: "PrjKy",
        dataTextField: "PrjId",
        dataSource: PrjId_SelectMob_DataSource('HdrSec1_CmbPrj'),
        change: function (e) {

            var cmb = $("#HdrSec1_CmbPrj_Cd").data("kendoComboBox");
            var prjKy = cmb.value();      
                PrjKy = prjKy;
                if (prjKy != "") {
                    $("#HdrSec1_CmbPrj_Nm").data("kendoComboBox").value(prjKy);
                    LoadGrid();
                } else {
                    $("#HdrSec1_CmbPrj_Nm").data("kendoComboBox").value("");
                }          
        },
        filter: "contains",
        suggest: true,
        placeholder: "Select a Project..."
    });

    $("#HdrSec1_CmbPrj_Nm").kendoComboBox({
        dataValueField: "PrjKy",
        dataTextField: "PrjNm",
        dataSource: PrjNm_SelectMob_DataSource('HdrSec1_CmbPrj'),
        change: function (e) {
            var cmb = $("#HdrSec1_CmbPrj_Nm").data("kendoComboBox");
            var PrjKy = cmb.value();
            if (!ComboValidations("HdrSec1_CmbPrj_Nm"))
            {
                alert("'" + prjKy + "' is not a Valid input");
                cmb.value("");
            }

            else
            {
                if (PrjKy != "") {
                    $("#HdrSec1_CmbPrj_Cd").data("kendoComboBox").value(PrjKy);
                    LoadGrid();
                } else {
                    $("#HdrSec1_CmbPrj_Cd").data("kendoComboBox").value("");
                }
            }
         
        },
        filter: "contains",
        suggest: true,
        placeholder: "Select a Project..."
    });
}

function LoadResourceCombo() {
    $("#HdrSec1_CmbAdr_Cd").kendoComboBox({
        dataValueField: "AdrKy",
        dataTextField: "AdrID",
        dataSource: AdrID_SelectMob_DataSource('HdrSec1_CmbAdr'),
        change: function (e) {
            var cmb = $("#HdrSec1_CmbAdr_Cd").data("kendoComboBox");
            var AdrKy = cmb.value();
            if (!ComboValidations("HdrSec1_CmbAdr_Cd")) {
                alert("'" + prjKy + "' is not a Valid input");
                cmb.value("");
            }

            else
            {
                if (AdrKy != "") {
                    $("#HdrSec1_CmbAdr_Nm").data("kendoComboBox").value(AdrKy);

                } else {
                    $("#HdrSec1_CmbAdr_Nm").data("kendoComboBox").value("");
                }
            }
            
        },
        filter: "contains",
        suggest: true,
        placeholder: "Select Address..."
    });

    $("#HdrSec1_CmbAdr_Nm").kendoComboBox({
        dataValueField: "AdrKy",
        dataTextField: "AdrNm",
        dataSource: AdrNm_SelectMob_DataSource('HdrSec1_CmbAdr'),
        change: function (e) {
            var cmb = $("#HdrSec1_CmbAdr_Nm").data("kendoComboBox");
            var AdrKy = cmb.value();
            if (!ComboValidations("HdrSec1_CmbAdr_Nm")) {
                alert("'" + AdrKy + "' is not a Valid input");
                cmb.value("");
            }

            else {
                if (AdrKy != "") {
                    $("#HdrSec1_CmbAdr_cd").data("kendoComboBox").value(AdrKy);

                } else {
                    $("#HdrSec1_CmbAdr_cd").data("kendoComboBox").value("");
                }
            }
            
        },
        filter: "contains",
        suggest: true,
        placeholder: "Select Address..."
    });
}

function LoadItemCombo() {
    $("#HdrSec1_CmbItm_Cd").kendoComboBox({
        dataTextField: "ItmCd",
        dataValueField: "ItmKy",
        dataSource: ItmCd_SelectMob_Datasource('HdrSec1_CmbItm'),
        change: function (e) {
            var cmb = $("#HdrSec1_CmbItm_Cd").data("kendoComboBox");
            var ItmKy = cmb.value();
            if (ItmKy != "") {
                //$("#HdrSec1_CmbItm_Cd").data("kendoComboBox").value(ItmKy);
                $("#HdrSec1_CmbItm_Nm").data("kendoComboBox").value(ItmKy);
                

            } else {
               // $("#HdrSec1_CmbItm_Cd").data("kendoComboBox").value("");
                $("#HdrSec1_CmbItm_Nm").data("kendoComboBox").value("");

            }
        },
        filter: "contains",
        suggest: true,
        placeholder: "Select Item"
    });

    $("#HdrSec1_CmbItm_Nm").kendoComboBox({
        dataValueField: "ItmKy",
        dataTextField: "ItmNm",
        dataSource: ItmNm_SelectMob_Datasource('HdrSec1_CmbItm'),
        change: function (e) {
            var cmb = $("#HdrSec1_CmbItm_Nm").data("kendoComboBox");
            var ItmKy = cmb.value();
            if (ItmKy != "") {
                $("#HdrSec1_CmbItm_Cd").data("kendoComboBox").value(ItmKy);
                //$("#HdrSec1_CmbItm_Nm").data("kendoComboBox").value(ItmKy);

            } else {
                $("#HdrSec1_CmbItm_Cd").data("kendoComboBox").value("");
                //$("#HdrSec1_CmbItm_Nm").data("kendoComboBox").value("");

            }
        },
        filter: "contains",
        suggest: true,
        placeholder: "Select Item"
    });
}

function LoadLeadAdrCombo() {
    $("#HdrSec1_CmbLeadAdr_Cd").kendoComboBox({
        dataValueField: "AdrKy",
        dataTextField: "AdrID",
        dataSource: AdrID_SelectMob_DataSource('HdrSec1_CmbLeadAdr'),
        change: function (e) {
            var cmb = $("#HdrSec1_CmbLeadAdr_Cd").data("kendoComboBox");
            var LeadAdrKy = cmb.value();
            if (!ComboValidations("HdrSec1_CmbLeadAdr_Cd")) {
                alert("'" + LeadAdrKy + "' is not a Valid input");
                cmb.value("");
            }

            else {
                if (LeadAdrKy != "") {
                    $("#HdrSec1_CmbLeadAdr_Nm").data("kendoComboBox").value(LeadAdrKy);

                } else {
                    $("#HdrSec1_CmbLeadAdr_Nm").data("kendoComboBox").value("");

                }
            }
            
        },
        filter: "contains",
        suggest: true,
        placeholder: "Select a Lead Address..."
    });

    $("#HdrSec1_CmbLeadAdr_Nm").kendoComboBox({
        dataValueField: "AdrKy",
        dataTextField: "AdrNm",
        dataSource: AdrNm_SelectMob_DataSource('HdrSec1_CmbCurActByAdr'),
        change: function (e) {
            var cmb = $("#HdrSec1_CmbLeadAdr_Nm").data("kendoComboBox");
            var LeadAdrKy = cmb.value();
            if (!ComboValidations("HdrSec1_CmbLeadAdr_Nm")) {
                alert("'" + LeadAdrKy + "' is not a Valid input");
                cmb.value("");
            }

            else {
                if (LeadAdrKy != "") {
                    $("#HdrSec1_CmbLeadAdr_Cd").data("kendoComboBox").value(LeadAdrKy);

                } else {
                    $("#HdrSec1_CmbLeadAdr_Cd").data("kendoComboBox").value("");
                }
            }
            
        },
        filter: "contains",
        suggest: true,
        placeholder: "Select a Lead Address..."
    });
}

function LoadCuractAdr() {
    $("#HdrSec1_CmbCurActByAdr_Cd").kendoComboBox({
        dataValueField: "AdrKy",
        dataTextField: "AdrID",
        dataSource: AdrID_SelectMob_DataSource('HdrSec1_CmbCurActByAdr'),
        change: function (e) {
            var cmb = $("#HdrSec1_CmbCurActByAdr_Cd").data("kendoComboBox");
            var CurAdrKy = cmb.value();
            if (!ComboValidations("HdrSec1_CmbCurActByAdr_Cd")) {
                alert("'" + CurAdrKy + "' is not a Valid input");
                cmb.value("");
            }

            else {
                if (CurAdrKy != "") {
                    $("#HdrSec1_CmbCurActByAdr_Nm").data("kendoComboBox").value(CurAdrKy);

                } else {
                    $("#HdrSec1_CmbCurActByAdr_Nm").data("kendoComboBox").value("");
                }
            }
            
        },
        filter: "contains",
        suggest: true,
        placeholder: "Select a Current Address..."
    });

    $("#HdrSec1_CmbCurActByAdr_Nm").kendoComboBox({
        dataValueField: "AdrKy",
        dataTextField: "AdrNm",
        dataSource: AdrNm_SelectMob_DataSource('HdrSec1_CmbCurActByAdr'),
        change: function (e) {
            var cmb = $("#HdrSec1_CmbCurActByAdr_Nm").data("kendoComboBox");
            var CurAdrKy = cmb.value();
            if (!ComboValidations("HdrSec1_CmbCurActByAdr_Nm")) {
                alert("'" + CurAdrKy + "' is not a Valid input");
                cmb.value("");
            }

            else {
                if (CurAdrKy != "") {
                    $("#HdrSec1_CmbCurActByAdr_Cd").data("kendoComboBox").value(CurAdrKy);

                } else {
                    $("#HdrSec1_CmbCurActByAdr_Cd").data("kendoComboBox").value("");
                }
            }
            
        },
        filter: "contains",
        suggest: true,
        placeholder: "Select a Current Address..."
    });
}


function LoadUnitCombo() {
    $("#HdrSec2_CmbUnit_Cd").kendoComboBox({
        dataValueField: "UnitKy",
        dataTextField: "Unit",
        dataSource: UnitMas_SelectMob_DataSource('HdrSec2_CmbUnit'),
        change: function (e) {
        },
        filter: "contains",
        suggest: true,
        placeholder: "Select a Unit"
    });
}

function LoadUnitComboPrcsDetCmpn() {
    $("#HdrSec1_CmbUnit_Cd").kendoComboBox({
        dataValueField: "UnitKy",
        dataTextField: "Unit",
        dataSource: UnitMas_SelectMob_DataSource('HdrSec1_CmbUnit'),
        change: function (e) {
        },
        filter: "contains",
        suggest: true,
        placeholder: "Select a Unit"
    });
}


function LoadPrtyCombo() {
    $("#HdrSec2_CmbPrty_Cd").kendoComboBox({
        dataValueField: "CdKy",
        dataTextField: "Code",
        dataSource: Code_SelectMob_Datasource('HdrSec2_CmbPrty'),
        change: function (e) {
            var cmb = $("#HdrSec2_CmbPrty_Cd").data("kendoComboBox");
            var PrtyKy = cmb.value();

            if (PrtyKy != "") {
                $("#HdrSec2_CmbPrty_Nm").data("kendoComboBox").value(PrtyKy);

            } else {
                $("#HdrSec2_CmbPrty_Nm").data("kendoComboBox").value("");
            }
        },
        filter: "contains",
        suggest: true,
        placeholder: "Select Priority.."
    });

    $("#HdrSec2_CmbPrty_Nm").kendoComboBox({
        dataValueField: "CdKy",
        dataTextField: "CdNm",
        dataSource: CdNm_SelectMob_Datasource('HdrSec2_CmbPrty'),
        change: function (e) {
            var cmb = $("#HdrSec2_CmbPrty_Nm").data("kendoComboBox");
            var PrtyKy = cmb.value();

            if (PrtyKy != "") {
                $("#HdrSec2_CmbPrty_Cd").data("kendoComboBox").value(PrtyKy);
            }
            else {
                $("#HdrSec2_CmbPrty_Cd").data("kendoComboBox").value("");
            }
        },
        filter: "contains",
        suggest: true,
        placeholder: "Select Priority.."
    });
}

function PrcsDetCat1() {
    $("#HdrSec2_CmbPrcsDetCat1_Cd").kendoComboBox({
        dataValueField: "CdKy",
        dataTextField: "Code",
        dataSource: Code_SelectMob_Datasource('HdrSec2_PrcsDetCat1'),
        change: function (e) {
            var cmb = $("#HdrSec2_CmbPrcsDetCat1_Cd").data("kendoComboBox");
            var PrcsDetCat = cmb.value();
            if (!ComboValidations("HdrSec2_CmbPrcsDetCat1_Cd")) {
                alert("'" + PrcsDetCat + "' is not a Valid input");
                cmb.value("");
            }

            else {
                if (PrcsDetCat != "") {
                    $("#HdrSec2_CmbPrcsDetCat1_Cd").data("kendoComboBox").value(PrcsDetCat);
                }
                else {
                    $("#HdrSec2_CmbPrcsDetCat1_Cd").data("kendoComboBox").value("");
                }
            }
            
        },
        filter: "contains",
        suggest: true,
        placeholder: "Select Task.."
    });
    
}

function loadAutoCompleteGoToMenu() {
    $("#HdrSec2_AutoCompleteGoToMenu_Val").kendoComboBox({
        dataValueField: "ObjKy",
        dataTextField: "ObjCaptn",
        dataSource: MenuSearch_SelectWeb_Datasource(),
        change: function (e) {
            var cmb = $("#HdrSec2_AutoCompleteGoToMenu_Val").data("kendoComboBox");
            var Menu = cmb.value();            
            if (!ComboValidations("HdrSec2_AutoCompleteGoToMenu_Val")) {
                alert("'" + Menu + "' is not a Valid input");
                cmb.value("");
            }
            if (Menu != "") {
                $("#HdrSec2_AutoCompleteGoToMenu_Val").data("kendoComboBox").value(Menu);
            }
            else {
                $("#HdrSec2_AutoCompleteGoToMenu_Val").data("kendoComboBox").value("");
            }
        },
        filter: "contains",
        suggest: true,
        placeholder: "Select Option..."
    });

}


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

function MenuSearch_SelectWeb_Datasource() {
    var dataSource = new kendo.data.DataSource(
    {
        transport: {
            read: {
                url: urlComboLoad.MenuSearch_SelectWeb,
                //data: {
                //    'ObjKy': ObjKy,
                //    'TrnTypKy': 1,
                //    'PreKy': PreKy,
                //},
                dataType: "json"
            }
        }

    });
    return dataSource;
}



function Codes_SelectMob_Datasource(ObjNm) {
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
                url: urlGetCode,
                data: {
                    'ObjKy': ObjKy,
                    'TrnTypKy':1,
                    'PreKy': PreKy,
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
    var PreKy = 1;
    var dataSource = new kendo.data.DataSource(
    {
        transport: {
            read: {
                url: urlGetBUNm,
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

function UnitMas_SelectMob_DataSource(ObjNm) {
    var ObjKy = GetObjKy(ObjNm);
    var dataSource = new kendo.data.DataSource(
        {
            transport: {
                read: {
                    url: urlComboLoad.UnitMas_SelectMob,
                    data: {
                        ObjKy: ObjKy,
                        TrnTypKy: 1,
                        PreKy: 1
                    },
                    dataType: "json"
                }
            }
        });
    return dataSource;
}
