var FormGlblData = {
    FormObjData: null,
    TrnTypKy: 1,
    PrjTypKy: 1,
    AccessLvlKy: 1,
    ConfiLvlKy: 1,
    TrnKy: 1,
    AllDefalutValueObj: null,
    FormGridArray: [],
    FindFormGridArray: [],

};
LoadGloabData();
var prjTaskLocKy;
var prjKy;
function LoadGloabData() {
    $.ajax({
        url: urlCodes.GetCdKyByConCdAndOurCd,
        dataType: "json",
        type: "POST",
        data: JSON.stringify({
            ObjKy: viewBag.ObjKy,
            ConCd: "OthTrnTyp",
            OurCd: viewBag.OurCd
        }),
        contentType: "application/json; charset=utf-8",
        success: function (TrnTypKy) {
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
        success: function (HdrSectionFromDb) {
            FormGlblData.FormObjData = HdrSectionFromDb;
            setHdrSectionPropFun();           
            CusDocRedy();
        }
    });

}

function CusDocRedy() {
    Button_From_Dynamic("ButtonSec1");
    Button_From_Dynamic("ButtonSec2");
    LoadPrjCombo();
   // LoadTrnTyp();
    LoadDatePickers();
    LoadPrefix();
    GridDefaultColumns();
    FindGridDefaultColumns();
}


function setHdrSectionPropFun() {

    // ---------- Set ObjProperties
    setHdrSectionProp("", viewBag.ObjKy, "", "HdrSec1");
    setHdrSectionProp("", viewBag.ObjKy, "", "HdrSec2");
    setHdrSectionProp("", viewBag.ObjKy, "", "HdrSec16");
    SetHandlingEnterKeyEvent("", viewBag.ObjKy);
    SetFirstFocusObj();
}


function LoadPrefix() {
    $("#HdrSec16_Cmb_FF_TrnNo_Cd")
        .kendoComboBox({
            dataValueField: "CdKy",
            dataTextField: "Code",
            dataSource: CDMasLoad('HdrSec16_Cmb_FF_TrnNo'),
            change: function (e) {
                var cmb = $("#HdrSec16_Cmb_FF_TrnNo_Cd").data("kendoComboBox");
                var val = cmb.value();

                if (isNaN(val)) {
                    alert("'" + val + "' is not a Valid input");
                    cmb.value("");
                }
            },
            filter: "startswith",
            suggest: true,
            placeholder: "Prefix"
        })
}

function CDMasLoad(ObjNm) {
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
                    url: urlComboLoad.Code_SelectMob,
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

function LoadPrjCombo() {
    
    $("#HdrSec2_CmbPrj_Cd").kendoComboBox({
        dataValueField: "PrjKy",
        dataTextField: "PrjId",
        dataSource: PrjId_SelectMob_DataSource("HdrSec2_CmbPrj"),
        change: function (e) {
         
        },
        filter: "contains",
        suggest: true,
        placeholder: "Select a Project"
    });

    $("#HdrSec16_Cmb_FF_Prj_Cd")
        .kendoComboBox({
            dataValueField: "PrjKy",
            dataTextField: "PrjId",
            dataSource: ProjectCd('HdrSec16_Cmb_FF_Prj'),
            change: function (e) {
                var cmb = $("#HdrSec16_Cmb_FF_Prj_Cd").data("kendoComboBox");
                var PrjKy = cmb.value();
                if (PrjKy != "") {
                    var validate = ComboValidations("HdrSec16_Cmb_FF_Prj_Cd");
                    if (validate) {
                        $("#HdrSec16_Cmb_FF_Prj_Cd").data("kendoComboBox").value(PrjKy);
                    } else {

                        $("#HdrSec16_Cmb_FF_Prj_Cd").data("kendoComboBox").value("");
                    }
                }
            },
            filter: "contains",
            suggest: true,
            placeholder: "Project"
        })
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
                    url: urlComboLoad.PrjID_SelectMob,
                    data: {
                        'ObjKy': ObjKy,
                        'TrnTypKy': FormGlblData.TrnTypKy,
                        'PreKy': "1"
                    },
                    dataType: "json"
                }
            }

        });
    return dataSource;
}

function LoadTrnTyp() {
    
    $("#HdrSec2_CmbTrnTyp_Cd").kendoComboBox({
        dataValueField: "CdKy",
        dataTextField: "Code",
        dataSource: Code_SelectMob_Datasource("HdrSec2_CmbTrnTyp"),
        change: function (e) {
            
        },
        filter: "contains",
        suggest: true,
        placeholder: "Select a Transaction Type"
    });
}

function LoadDatePickers() {
    $("#HdrSec2_DatVouDate_Val")
        .kendoDatePicker({
            format: "dd/MM/yyyy",
            min: new Date(31, 2, 2009),
            change: function (e) {
               
            },
        });
    var todayDate = new Date();
    $("#HdrSec2_DatVouDate_Val").data("kendoDatePicker").value(todayDate);
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
            
            $("#FindFormVersionNo")
                .show()
                .kendoWindow({
                    width: "80%",
                    height: "75%",
                    modal: true,
                    title: "Find Form"
                });

            $("#FindFormVersionNo").data("kendoWindow").center().open();

        }
    });