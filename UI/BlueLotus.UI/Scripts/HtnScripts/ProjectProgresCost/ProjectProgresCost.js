var selectedTrnUnitKy = 1;

var todayDate = new Date();
var dd = todayDate.getDate();
var mm = todayDate.getMonth() + 1; // january is 0

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
    TrnNo: "",
    AccessLvlky: 1,
    ConfiLvlKy: 1,
    TrnKy: 1,
    ItmKy: 1,
    TodayDate: todayDate,
    TmStmp: "",
    IsDetailRelatedHdrSectionChanged: false,
    AllDefalutValueObj: null,
    GotItemRate: 0,
    IsNeworUpdateTransaction: 1,
    isSaveandNew: 0,
    isItmCdFrmCmb: 0,
    itmCdFrm: '',
    ItmCdWhenDblClick: '',
    Detail_Editing_LiNo: 0,
    TrnRate: 0,
    itmTrnKy: 0,
    PrjKy: 1,
    FormTyp: "TrnTyp",
    LiNo: 1,
    selectedIndex: 1

}

var CdMasModel = {
    IsTrnRateInclusiveTaxTyp1_Vat: 0,  // IsTrnRateInclusiveTaxTyp1_VAT : isCd27
    TrnMinDate: "",  ///Back date Transaction Purpose
    TrnMaxDate: ""  // Future Date Transaction Purpose
}
$(document).ready(function () {

    $.ajax({
        url: urlCodes.GetCdKyByConCdAndOurCd,
        dataType: "Json",
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
        dataType: "Json",
        type: "POST",
        data: JSON.stringify({
            ObjKy: viewBag.ObjKy,
            CdKy: CdKy
        }),

        contentType: 'application/json; charset=utf-8',
        success: function (CdMasModelData) {
            CdMasModel.IsTrnRateInclusiveTaxTyp1_Vat = CdMasModelData.isCd27;
            CdMasModel.TrnMinDate = CdMasModelData.TrnMinDate;
            CdMasModel.TrnMaxDate = CdMasModelData.TrnMaxDate;

            GetFormObjData();

            Button_From_Dynamic('ButtonSec2');
        }
    })
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
            FormGlblData.AllValidationObj = sortByKey(FormGlblData.AllValidationObj, 'ValidationOrder');

            DocReadyCus();
        }
    });

}

function DocReadyCus() {

    var todayDate = new Date();
    $('#HdrSec1_DatPicDate_Val').kendoDatePicker({
        format: "dd/MM/yyyy",

    });
    $('#HdrSec1_DatPicDate_Val').data("kendoDatePicker").value(todayDate);
    

    PrjComboLoad();
    LoadAdrCombo(1);
    LoadSubConComboLoad(1);
    StatusCombo();
    TaskComboLoad(1, 1, 'HdrSec1_CmbTask');
    LoadTaskLocationCombo();
    GridDefaultColumns();
    FindGridDefaultColumns();

}

function PrjComboLoad() {

    $("#HdrSec1_CmbProject_Cd").kendoComboBox({
        dataValueField: "PrjKy",
        dataTextField: "PrjId",
        dataSource: ProjectCd('HdrSec1_CmbProject'),
        change: function (e) {
            var cmb = $("#HdrSec1_CmbProject_Cd").data("kendoComboBox");
            var prjky = cmb.value();
            FormGlblData.PrjKy = prjky;
            TaskComboLoad(prjky, 1, 'HdrSec1_CmbTask');
        },
        filter: "contains",
        suggest: true,
        placeholder: "Project "
    });

}

function LoadAdrCombo(PreKy) {

    PreKy = Number(PreKy);

    $("#HdrSec1_Adrky_Cd").kendoComboBox({
        dataValueField: "AdrKy",
        dataTextField: "AdrID",
        dataSource: AdrID_SelectMob_DataSourceWithTrnTyp('HdrSec1_Adrky', PreKy),
        change: function (e) {
            var cmb = $("#HdrSec1_Adrky_Cd").data("kendoComboBox");
            var AdrKy = cmb.value();
            if (AdrKy != "") {
                var validate = ComboValidations("HdrSec1_Adrky_Cd");
                if (validate) {
                    $("#HdrSec1_Adrky_Cd").data("kendoComboBox").value(AdrKy);
                    FormGlblData.IsDetailRelatedHdrSectionChanged = true;

                } else {
                    $("#HdrSec1_Adrky_Cd").data("kendoComboBox").value(null);
                }
            }
        },
        filter: "contains",
        suggest: true,
        placeholder: "Select a Address ID.."
    });

    $("#HdrSec1_Adrky_Cd").parent().css('width', "20%");

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

function AdrID_SelectMob_DataSourceWithTrnTyp(ObjNm, PreKy) {
    var ObjKy = GetObjKy(ObjNm);

    var dataSource = new kendo.data.DataSource(
        {
            transport: {
                read: {
                    url: urlComboLoad.AdrID_SelectMob,
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

function LoadSubConComboLoad(PreKy) {

    $("#HdrSec1_CmbSubCon_Cd").kendoComboBox({
        dataValueField: "AdrKy",
        dataTextField: "AdrID",
        dataSource: AdrID_SelectMob_DataSourceWithTrnTyp('HdrSec1_CmbSubCon', PreKy),
        change: function (e) {
            var cmb = $("#HdrSec1_CmbSubCon_Cd").data("kendoComboBox");
            var AccKy = cmb.value();
            if (AccKy != "") {
                var validate = ComboValidations("HdrSec1_CmbSubCon_Cd");
                if (validate) {
                    $("#HdrSec1_CmbSubCon_Cd").data("kendoComboBox").value(AccKy);
                    
                    FormGlblData.IsDetailRelatedHdrSectionChanged = true;
 
                } else {
                    $("#HdrSec1_CmbSubCon_Cd").data("kendoComboBox").value(null);
                    
                }
            }
        },
        filter: "contains",
        suggest: true,
        placeholder: "Select a Address ..."
    });
    $("#HdrSec1_CmbSubCon_Cd").parent().css('width', "40%");
}

function TaskComboLoad(PreKy, accKy, ObjNm) {
    $("#HdrSec1_CmbTask_Cd").kendoComboBox({
        dataValueField: "PrcsDetKy",
        dataTextField: "TaskID",
        dataSource: TaskDatasource_Cd(PreKy, 'HdrSec1_CmbTask'),
        change: function (e) {
            var cmb = $("#HdrSec1_CmbTask_Cd").data("kendoComboBox");
            var TaskKy = cmb.value();
            if (TaskKy == "" || TaskKy == null || TaskKy == undefined) {
                // alert(TaskKy + " is not valid Task");
                $("#HdrSec1_CmbTask_Cd").data("kendoComboBox").value(1);
                $("#HdrSec1_CmbTask_Cd").data("kendoComboBox").text("");
            }
            else {
 
                LoadTaskLocationCombo()
            }
        },
        filter: "contains",
        suggest: true,
        placeholder: "Task ID"
    });
}


function TaskDatasource_Cd(PreKy, ObjNm) {
    var ObjKy = GetObjKy(ObjNm);
    var dataSource = new kendo.data.DataSource(
        {
            transport: {
                read: {
                    url: urlComboLoad.SubConTaskId_SelectMob,
                    data: {
                        ObjKy: ObjKy,
                        PrjKy: PreKy,


                    },
                    dataType: "json"
                }
            }
        });
    return dataSource;
}


function LoadTaskLocationCombo() {

    $("#HdrSec1_CmbTaskLoc_Cd").kendoComboBox({
        dataValueField: "PrjTaskLocKy",
        dataTextField: "PrjTaskLocCd",
        dataSource: TaskAll_Datasource(),
        change: function (e) {
            var cmb = $("#HdrSec1_CmbTaskLoc_Cd").data("kendoComboBox");
            var TaskKy = cmb.value();
            if (TaskKy == "" || TaskKy == null || TaskKy == undefined) {
                // alert(TaskKy + " is not valid Task");
                $("#HdrSec1_CmbTaskLoc_Cd").data("kendoComboBox").value(1);
                $("#HdrSec1_CmbTaskLoc_Cd").data("kendoComboBox").text("");
            }
            else {
                $("#HdrSec1_CmbTaskLoc_Nm").data("kendoComboBox").value(TaskKy);

            }
        },
        filter: "contains",
        suggest: true,
        placeholder: "Task Location"
    });

    $("#HdrSec1_CmbTaskLoc_Nm").kendoComboBox({
        dataValueField: "PrjTaskLocKy",
        dataTextField: "PrjTaskLocNm",
        dataSource: TaskAll_Datasource(),
        change: function (e) {
            var cmb = $("#HdrSec1_CmbTaskLoc_Nm").data("kendoComboBox");
            var TaskKy = cmb.value();
            if (TaskKy == "" || TaskKy == null || TaskKy == undefined) {
                alert(TaskKy + " is not valid Task");
                $("#HdrSec1_CmbTaskLoc_Nm").data("kendoComboBox").value(1);
                $("#HdrSec1_CmbTaskLoc_Nm").data("kendoComboBox").text("");
            }
            else {
                $("#HdrSec1_CmbTaskLoc_Cd").data("kendoComboBox").value(TaskKy);
            }
        },
        filter: "contains",
        suggest: true,
        placeholder: "Task Location"
    });


}
function TaskAll_Datasource() {
    var ObjKy = GetObjKy("HdrSec1_CmbTaskLoc");
    var TrnTypKy = FormGlblData.TrnTypKy;
    var PrjKy = $("#HdrSec1_CmbProject_Cd").data("kendoComboBox").value();
    if (!PrjKy) {
        PrjKy = 1;
    }
    var dataSource = new kendo.data.DataSource(
        {
            transport: {
                read: {
                    url: urlComboLoad.PrjTaskLocMob,
                    data: {
                        ObjKy: ObjKy,
                        PrjKy: PrjKy,
                        PreKy: 1,
                        TrnTypKy: TrnTypKy
                    },
                    dataType: "json"
                }
            }
        });
    return dataSource;
}

function StatusCombo() {
    $("#HdrSec1_CmbStatus_Cd").kendoComboBox({
        dataValueField: "CdKy",
        dataTextField: "Code",
        dataSource: CurrencyCode('HdrSec1_CmbStatus'),
        change: function (e) {
           
        },
        filter: "contains",
        suggest: true,
        placeholder: "Select the Status"
    });

    $("#HdrSec1_CmbReason_Cd").kendoComboBox({
        dataValueField: "CdKy",
        dataTextField: "Code",
        dataSource: CurrencyCode('HdrSec1_CmbReason'),
        change: function (e) {

        },
        filter: "contains",
        suggest: true,
        placeholder: "Select the Reason"
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
                url: urlComboLoad.Code_SelectMob,
                data: {
                    'ObjKy': ObjKy,
                    TrnTypKy: FormGlblData.TrnTypKy,
                    PreKy:1
                },
                dataType: "json"
            }
        }

    });
    return dataSource;
}