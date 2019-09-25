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

    setHdrSectionPropFun();

    $("#HdrSec1_CmbProject_Nm").width(400);

    var todayDate = new Date();
    $('#HdrSec1_DatPicDate_Val').kendoDatePicker({
        format: "dd/MM/yyyy",
        //change: OnDateChange
    });
    $('#HdrSec1_DatPicDate_Val').data("kendoDatePicker").value(todayDate);
    $("#HdrSec1_LineNo_Val").data("kendoNumericTextBox").value(1);

    PrjComboLoad();
    LoadAdrCombo(1);
    LoadSubConComboLoad(1)
    //LoadSubConComboLoad(1);
    //TaskComboLoad(1, 1, 'HdrSec1_CmbTask');
    FindGridDefaultColumns();//find Form
    TodoGridDefaultColumns();
}


function OnDateChange() {
    date = $("#HdrSec1_DatPicDate_Val").val();


    var id = ("#" + viewBag.OurCd);
    var count = $(id).data().kendoGrid.dataSource.total();
    if (count != 0) {
        var data = $(id).data().kendoGrid.dataSource.data();
        for (var i = 0; i < data.length; i++) {
            data[i].set("EftvDt", date);
        }
    }
}


function ComClearFunction() {
    FormGlblData.TrnKy = 1;
    FormGlblData.PrjKy = 1;
    FormGlblData.TrnNo = "";
    FormGlblData.TmStmp = "";
    FormGlblData.itmTrnKy = 1;
    FormGlblData.LiNo = 1;
    var todayDate = new Date();
    $('#HdrSec1_DatPicDate_Val').data("kendoDatePicker").value(todayDate);
    $("#HdrSec1_NmricQty_Val").data('kendoNumericTextBox').value(1);
    $("#HdrSec1_NmricRate_Val").data('kendoNumericTextBox').value(0);
    $("#HdrSec1_NmricLiNo_Val").data('kendoNumericTextBox').value(1);
    $("#HdrSec1_CmbProject_Cd").data("kendoComboBox").value(null);
    $("#HdrSec1_CmbProject_Nm").data("kendoComboBox").value(null);
    $("#HdrSec1_CmbTask_Cd").data("kendoComboBox").value(null);
    $("#HdrSec1_CmbTask_Nm").data("kendoComboBox").value(null);
    $("#HdrSec1_CmbResource_Cd").data("kendoComboBox").value(null);
    $("#HdrSec1_CmbResource_Nm").data("kendoComboBox").value(null);
    try {
        $("#pager").data("kendoPager").dataSource.data([]);
    } catch (e) {

    }

}


function setHdrSectionPropFun() {

    // ---------- Set ObjProperties
    setHdrSectionProp('', viewBag.ObjKy, '', 'HdrSec1');
    //setHdrSectionProp('', viewBag.ObjKy, '', 'HdrSec2');

    SetHandlingEnterKeyEvent('', viewBag.ObjKy);

}


function PrjComboLoad() {

    $("#HdrSec1_CmbProject_Cd").kendoComboBox({
        dataValueField: "PrjKy",
        dataTextField: "PrjCd",
        dataSource: ProjectCd('HdrSec1_CmbProject'),
        change: function (e) {

            var cmb = $("#HdrSec1_CmbProject_Cd").data("kendoComboBox");
            var prjky = cmb.value();
            FormGlblData.PrjKy = prjky;

            if (prjky == "" || prjky == undefined || prjky == null) {
                alert(prjky + " is not valid Project");
                $("#HdrSec1_CmbProject_Cd").data("kendoComboBox").value(1);
                $("#HdrSec1_CmbProject_Cd").data("kendoComboBox").text("");
            }
            else {
                $("#HdrSec1_CmbProject_Nm").data("kendoComboBox").value(prjky);
                if (viewBag.OurCd == "PrjPrgrs") {
                    //Ut Asked to stop this funcion to simmpy fy the system 19/01/2018
                    //TaskComboLoad(PreKy, accKy, ObjNm)
                    TaskComboLoad(prjky, 1, 'HdrSec1_CmbTask');
                    LoadTaskLocationCombo();
                    // LoadTaskCombo(1, prjky);

                    //Update the concept to change the task combo to new givenSP
                    // LoadTaskCombo(1, prjky);
                }
                else {
                    TaskComboLoad(1, 1, 'HdrSec1_CmbTask');
                    LoadTaskLocationCombo();
                    //Ut Asked to stop this funcion to simmpy fy the system 19/01/2018
                    // LoadSubConComboLoad(prjky);
                    // TaskComboLoad(1); //sub con 
                }
            }

        },
        filter: "startswith",
        suggest: true,
        placeholder: "Project ID"
    });


    $("#HdrSec1_CmbProject_Nm").kendoComboBox({
        dataValueField: "PrjKy",
        dataTextField: "PrjNm",
        dataSource: ProjectNm('HdrSec1_CmbProject'),
        change: function (e) {

            var cmb = $("#HdrSec1_CmbProject_Nm").data("kendoComboBox");
            var prjky = cmb.value();
            FormGlblData.PrjKy = prjky;

            if (prjky == "" || prjky == undefined || prjky == null) {
                alert(prjky + " is not valid Project");
                $("#HdrSec1_CmbProject_Nm").data("kendoComboBox").value(1);
                $("#HdrSec1_CmbProject_Nm").data("kendoComboBox").text("");

            }
            else {
                $("#HdrSec1_CmbProject_Cd").data("kendoComboBox").value(prjky);
                if (viewBag.OurCd == "PrjPrgrs") {
                    //Ut Asked to stop this funcion to simmpy fy the system 19/01/2018
                    //TaskComboLoad(PreKy, accKy, ObjNm)
                    TaskComboLoad(prjky, 1, 'HdrSec1_CmbTask');
                    //LoadTaskCombo(1, prjky);
                }
                else {
                    //Ut Asked to stop this funcion to simmpy fy the system 19/01/2018
                    //LoadSubConComboLoad(prjky);
                    TaskComboLoad(1, 1, 'HdrSec1_CmbTask');
                    //LoadTaskCombo(1, prjky);
                }
            }

        },
        filter: "startswith",
        suggest: true,
        placeholder: "Project Name"
    });

}

function LoadSubConComboLoad(PreKy) {

    PreKy = Number(PreKy);

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
                    $("#HdrSec1_CmbSubCon_Nm").data("kendoComboBox").value(AccKy);
                    FormGlblData.IsDetailRelatedHdrSectionChanged = true;
                    if (viewBag.OurCd == "PrjPrgrs") {
                        //LoadTaskCombo(1, FormGlblData.PrjKy);
                    }
                    else {
                        // TaskComboLoad(PreKy, AccKy, 'HdrSec1_CmbTask');
                    }

                    //LoadAdrComboByAcc(AccKy);
                } else {
                    $("#HdrSec1_CmbSubCon_Cd").data("kendoComboBox").value(null);
                    $("#HdrSec1_CmbSubCon_Nm").data("kendoComboBox").value(null);
                }
            }
        },
        filter: "startswith",
        suggest: true,
        placeholder: "Select a Address ..."
    });
    $("#HdrSec1_CmbSubCon_Cd").parent().css('width', "40%");

    $("#HdrSec1_CmbSubCon_Nm").kendoComboBox({
        dataValueField: "AdrKy",
        dataTextField: "AdrNm",
        dataSource: AdrNm_SelectMob_DataSourceWithTrnTyp('HdrSec1_CmbSubCon', PreKy),
        change: function (e) {
            var cmb = $("#HdrSec1_CmbSubCon_Nm").data("kendoComboBox");
            var AccKy = cmb.value();
            if (AccKy != "") {
                var validate = ComboValidations("HdrSec1_CmbSubCon_Nm");
                if (validate) {
                    $("#HdrSec1_CmbSubCon_Nm").data("kendoComboBox").value(AccKy);
                    $("#HdrSec1_CmbSubCon_Cd").data("kendoComboBox").value(AccKy);
                    FormGlblData.IsDetailRelatedHdrSectionChanged = true;
                    //LoadAdrComboByAcc(AccKy);
                } else {
                    $("#HdrSec1_CmbSubCon_Nm").data("kendoComboBox").value(null);
                    $("#HdrSec1_CmbSubCon_Cd").data("kendoComboBox").value(null);
                    if (viewBag.OurCd == "PrjPrgrs") {
                        //LoadTaskCombo(1, FormGlblData.PrjKy);
                    }
                    else {
                        TaskComboLoad(PreKy, AccKy, 'HdrSec1_CmbTask');
                    }
                }
            }
        },
        filter: "startswith",
        suggest: true,
        placeholder: "Select a Address ..."
    });
    $("#HdrSec1_CmbSubCon_Nm").parent().css('width', "58%");


    $("#HdrSec1_CmbSubCon_Cd").data('kendoComboBox').input.keydown(function (event) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {
            //alert('d');
            $("#HdrSec5_CmbItm_Val").focus();
            event.preventDefault();
        }
    });

    $("#HdrSec1_CmbSubCon_Cd").keydown(function (event) {
        event.preventDefault();
    });

    $("#HdrSec1_CmbSubCon_Nm").data('kendoComboBox').input.keydown(function (event) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {
            //alert('d');
            $("#HdrSec5_CmbItm_Val").focus();
            event.preventDefault();
        }
    });

    $("#HdrSec1_CmbSubCon_Cd").keydown(function (event) {
        event.preventDefault();
    });
}

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


function AccNmDatasource(ObjNm, PreKy) {

    if (isNaN(PreKy))
        return [];

    var ObjKy = GetObjKy(ObjNm);
    var TrnTypKy = FormGlblData.TrnTypKy;
    var dataSource = new kendo.data.DataSource(
        {
            transport: {
                read: {
                    url: urlComboLoad.AccNm_SelectMob,
                    data: { ObjKy: ObjKy, TrnTypKy: TrnTypKy, PreKy: PreKy },
                    dataType: "json"
                }
            }
        });
    return dataSource;
}


//For subCon combo load of task
function TaskComboLoad(PreKy, accKy, ObjNm) {
    $("#HdrSec1_CmbTask_Cd").kendoComboBox({
        dataValueField: "PrcsDetKy",
        dataTextField: "TaskID",
        dataSource: TaskDatasource_Cd(PreKy, accKy, 'HdrSec1_CmbTask'),
        change: function (e) {
            var cmb = $("#HdrSec1_CmbTask_Cd").data("kendoComboBox");
            var TaskKy = cmb.value();
            if (TaskKy == "" || TaskKy == null || TaskKy == undefined) {
                // alert(TaskKy + " is not valid Task");
                $("#HdrSec1_CmbTask_Cd").data("kendoComboBox").value(1);
                $("#HdrSec1_CmbTask_Cd").data("kendoComboBox").text("");
            }
            else {
                $("#HdrSec1_CmbTask_Nm").data("kendoComboBox").value(TaskKy);
                var data = $("#HdrSec1_CmbTask_Nm").data("kendoComboBox").dataSource;
                for (var i = 0; i < data.length; i++) {
                    if (data[i].PrcsDetKy === TaskKy) {
                        // alert(data[i].Unit)
                    }
                }
                var selectedObject = $("#HdrSec1_CmbTask_Cd").data("kendoComboBox").dataItem($("#HdrSec1_CmbTask_Cd").data("kendoComboBox").select());
                // alert(selectedObject.Unit)
                $("#HdrSec1_CmbUnit_Val").html("" + selectedObject.Unit);
                selectedTrnUnitKy = Number(selectedObject.TrnUnitKy);
                LoadTaskLocationCombo()
            }
        },
        filter: "startswith",
        suggest: true,
        placeholder: "Task ID"
    });

    $("#HdrSec1_CmbTask_Nm").kendoComboBox({
        dataValueField: "PrcsDetKy",
        dataTextField: "TaskNm",
        dataSource: TaskDatasource_Nm(PreKy, accKy, 'HdrSec1_CmbTask'),
        change: function (e) {
            var cmb = $("#HdrSec1_CmbTask_Nm").data("kendoComboBox");
            var TaskKy = cmb.value();
            if (TaskKy == "" || TaskKy == null || TaskKy == undefined) {
                alert(TaskKy + " is not valid Task");
                $("#HdrSec1_CmbTask_Nm").data("kendoComboBox").value(1);
                $("#HdrSec1_CmbTask_Nm").data("kendoComboBox").text("");
            }
            else {
                $("#HdrSec1_CmbTask_Cd").data("kendoComboBox").value(TaskKy);
                var selectedObject = $("#HdrSec1_CmbTask_Nm").data("kendoComboBox").dataItem($("#HdrSec1_CmbTask_Nm").data("kendoComboBox").select());
                $("#HdrSec1_CmbUnit_Val").html("" + selectedObject.Unit);
                selectedTrnUnitKy = Number(selectedObject.TrnUnitKy);
                LoadTaskLocationCombo();
            }
        },
        filter: "startswith",
        suggest: true,
        placeholder: "Task Name"
    });


}


//for daily progress
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
        filter: "startswith",
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
        filter: "startswith",
        suggest: true,
        placeholder: "Task Location"
    });


}





$("#HdrSec1_NmricQty_Val").kendoNumericTextBox({
    min: 0.0000,
    decimals: 3,
    format: "n3",
    spinners: false
});


$("#HdrSec1_NumResQty_Val").kendoNumericTextBox({
    min: 0.0000,
    decimals: 3,
    format: "n3",
    spinners: false
});

$("#HdrSec1_LineNo_Val").kendoNumericTextBox({
    min: 1,
    spinners: false
});


function OnDateChange() {
    date = $("#HdrSec1_DatPicDate_Val").val();

    var id = ("#" + viewBag.OurCd);
    var count = $(id).data().kendoGrid.dataSource.total();
    if (count != 0) {
        var data = $(id).data().kendoGrid.dataSource.data();
        for (var i = 0; i < data.length; i++) {
            data[i].set("EftvDt", date);
        }
    }
}

//$("#HdrSec1_InptDesc_Val").keydown(function (event) {

//    var keycode = (event.keyCode ? event.keyCode : event.which);
//    if (keycode == '13') {
//        //$("#HdrSec1_NmricQty_Val").data("kendoNumericTextBox").focus();
//    }
//});

function updateProject() {
    if (FormGlblData.itmTrnKy > 1) {
        var Date = $("#HdrSec1_DatPicDate_Val").val();
        var LeadAdrKy = $("#HdrSec1_Adrky_Cd").data("kendoComboBox").value();
        if (LeadAdrKy == undefined || LeadAdrKy == null || LeadAdrKy == '') {
            LeadAdrKy = 1;
        }
        var PrjKy = $("#HdrSec1_CmbProject_Cd").data("kendoComboBox").value();
        if (PrjKy == undefined || PrjKy == null || PrjKy == '') {
            PrjKy = 1;
        }
        var Tsk = $("#HdrSec1_CmbTask_Cd").data("kendoComboBox").value();
        if (Tsk == undefined || Tsk == null || Tsk == '') {
            Tsk = 1;
        }
        var LinNo = $("#HdrSec1_LineNo_Val").data("kendoNumericTextBox").value();

        try {
            var AccKy = $("#HdrSec1_CmbSubCon_Cd").data("kendoComboBox").value();
            if (AccKy == undefined || AccKy == null || AccKy == '') {
                AccKy = 1;
            }
        } catch (e) {
            AccKy = 1;

        }

        var Des = $("#HdrSec1_InptDesc_Val").val();

        var QtyKy = $("#HdrSec1_NmricQty_Val").data("kendoNumericTextBox").value();


        var OrdKySelect = FormGlblData.TrnKy;
        var OrdTypKySelect = FormGlblData.TrnTypKy;
        var OrdNoSelect = FormGlblData.TrnNo;
        var UniKy = selectedTrnUnitKy;

        var OurCd = viewBag.OurCd;
        var ConCd = "TrnTyp";
        var DocNo = $("#HdrSec1_InpDocNo_Val").val();
        StartSavingFunction(Date,
            LeadAdrKy,
            PrjKy,
            Tsk,
            LinNo,
            AccKy,
            Des,
            UniKy,
            QtyKy,
            OrdKySelect,
            OrdTypKySelect,
            OrdNoSelect,
            DocNo);
    }
    else {
        alert("Select the Recode To Update");
    }
}

function Save() {

   

    if (ValidateEntry()) {
        var Date = $("#HdrSec1_DatPicDate_Val").val();
        var LeadAdrKy = $("#HdrSec1_Adrky_Cd").data("kendoComboBox").value();
        if (LeadAdrKy == undefined || LeadAdrKy == null || LeadAdrKy == '') {
            LeadAdrKy = 1;
        }
        var PrjKy = $("#HdrSec1_CmbProject_Cd").data("kendoComboBox").value();
        if (PrjKy == undefined || PrjKy == null || PrjKy == '') {
            PrjKy = 1;
        }
        var Tsk = $("#HdrSec1_CmbTask_Cd").data("kendoComboBox").value();
        if (Tsk == undefined || Tsk == null || Tsk == '') {
            Tsk = 1;
        }
        var LinNo = $("#HdrSec1_LineNo_Val").data("kendoNumericTextBox").value();

        try {
            var AccKy = $("#HdrSec1_CmbSubCon_Cd").data("kendoComboBox").value();
            if (AccKy == undefined || AccKy == null || AccKy == '') {
                AccKy = 1;
            }
        } catch (e) {
            AccKy = 1;

        }

        var Des = $("#HdrSec1_InptDesc_Val").val();

        var QtyKy = $("#HdrSec1_NmricQty_Val").data("kendoNumericTextBox").value();


        var OrdKySelect = FormGlblData.TrnKy;
        var OrdTypKySelect = FormGlblData.TrnTypKy;
        var OrdNoSelect = FormGlblData.TrnNo;
        var UniKy = selectedTrnUnitKy;

        var OurCd = viewBag.OurCd;
        var ConCd = "TrnTyp";
        var DocNo = $("#HdrSec1_InpDocNo_Val").val();
        StartSavingFunction(Date,
            LeadAdrKy,
            PrjKy,
            Tsk,
            LinNo,
            AccKy,
            Des,
            UniKy,
            QtyKy,
            OrdKySelect,
            OrdTypKySelect,
            OrdNoSelect,
            DocNo);
    }
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
                    $("#HdrSec1_Adrky_Nm").data("kendoComboBox").value(AdrKy);
                    FormGlblData.IsDetailRelatedHdrSectionChanged = true;

                } else {
                    $("#HdrSec1_Adrky_Cd").data("kendoComboBox").value(null);
                    $("#HdrSec1_Adrky_Nm").data("kendoComboBox").value(null);
                }
            }
        },
        filter: "startswith",
        suggest: true,
        placeholder: "Select a Address ID.."
    });

    $("#HdrSec1_Adrky_Nm").kendoComboBox({
        dataValueField: "AdrKy",
        dataTextField: "AdrNm",
        dataSource: AdrNm_SelectMob_DataSourceWithTrnTyp('HdrSec1_Adrky', PreKy),
        change: function (e) {
            var cmb = $("#HdrSec1_Adrky_Nm").data("kendoComboBox");
            var AdrKy = cmb.value();
            if (AdrKy != "") {
                var validate = ComboValidations("HdrSec1_Adrky_Nm");
                if (validate) {
                    $("#HdrSec1_Adrky_Cd").data("kendoComboBox").value(AdrKy);
                    $("#HdrSec1_Adrky_Nm").data("kendoComboBox").value(AdrKy);
                    FormGlblData.IsDetailRelatedHdrSectionChanged = true;

                } else {
                    $("#HdrSec1_Adrky_Nm").data("kendoComboBox").value(null);
                    $("#HdrSec1_Adrky_Cd").data("kendoComboBox").value(null);
                }
            }
        },
        filter: "startswith",
        suggest: true,
        placeholder: "Select a Address.."
    });


    $("#HdrSec1_Adrky_Cd").parent().css('width', "20%");
    $("#HdrSec1_Adrky_Nm").parent().css('width', "40%");




    $("#HdrSec1_ResAdr_Cd").kendoComboBox({
        dataValueField: "AdrKy",
        dataTextField: "AdrID",
        dataSource: AdrID_SelectMob_DataSourceWithTrnTyp('HdrSec1_Adrky', PreKy),
        change: function (e) {
            var cmb = $("#HdrSec1_ResAdr_Cd").data("kendoComboBox");
            var AdrKy = cmb.value();
            if (AdrKy != "") {
                var validate = ComboValidations("HdrSec1_ResAdr_Cd");
                if (validate) {
                    $("#HdrSec1_ResAdr_Cd").data("kendoComboBox").value(AdrKy);
                    $("#HdrSec1_ResAdr_Nm").data("kendoComboBox").value(AdrKy);
                    GetResUnitKy(AdrKy);
                    //FormGlblData.IsDetailRelatedHdrSectionChanged = true;

                } else {
                    $("#HdrSec1_ResAdr_Cd").data("kendoComboBox").value(null);
                    $("#HdrSec1_ResAdr_Nm").data("kendoComboBox").value(null);
                }
            }
        },
        filter: "startswith",
        suggest: true,
        placeholder: "Select a Address ID.."
    });

    $("#HdrSec1_ResAdr_Nm").kendoComboBox({
        dataValueField: "AdrKy",
        dataTextField: "AdrNm",
        dataSource: AdrNm_SelectMob_DataSourceWithTrnTyp('HdrSec1_Adrky', PreKy),
        change: function (e) {
            var cmb = $("#HdrSec1_ResAdr_Nm").data("kendoComboBox");
            var AdrKy = cmb.value();
            if (AdrKy != "") {
                var validate = ComboValidations("HdrSec1_ResAdr_Nm");
                if (validate) {
                    $("#HdrSec1_ResAdr_Cd").data("kendoComboBox").value(AdrKy);
                    $("#HdrSec1_ResAdr_Nm").data("kendoComboBox").value(AdrKy);
                    GetResUnitKy(AdrKy);
                    // FormGlblData.IsDetailRelatedHdrSectionChanged = true;

                } else {
                    $("#HdrSec1_ResAdr_Nm").data("kendoComboBox").value(null);
                    $("#HdrSec1_ResAdr_Cd").data("kendoComboBox").value(null);
                }
            }
        },
        filter: "startswith",
        suggest: true,
        placeholder: "Select a Address.."
    });
    $("#HdrSec1_ResAdr_Cd").parent().css('width', "20%");
    $("#HdrSec1_ResAdr_Nm").parent().css('width', "40%");

}

function GetResUnitKy(AdrKy) {
    if (isNaN(AdrKy)) {
        AdrKy = 1;
    }
    $.ajax({
        url: urlAdrKyToItm_SelectMob,
        data: JSON.stringify({
            AdrKy: AdrKy,
        }),
        contentType: 'application/json; charset=utf-8',
        dataType: "Json",
        type: "POST",
        success: function (data) {
            PopUpFormGlblData.UnitKy = data[0].UnitKy;
        },
        error: function (e) {
            return false;
        }
    });

}

function AdrNm_SelectMob_DataSourceWithTrnTyp(ObjNm, PreKy) {

    if (isNaN(PreKy))
        return [];

    var ObjKy = GetObjKy(ObjNm);
    var dataSource = new kendo.data.DataSource(
        {
            transport: {
                read: {
                    url: urlComboLoad.AdrNm_SelectMob,
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



function ClearAll() {

    FormGlblData.TrnKy = 1;
    FormGlblData.TrnNo = "";
    FormGlblData.TmStmp = "";

    $("#HdrSec1_CmbTrnno_Val").val(null);
    $('#HdrSec1_InptDesc_Val').val('');

    $("#HdrSec1_Adrky_Cd").data("kendoComboBox").value("");
    $("#HdrSec1_Adrky_Nm").data('kendoComboBox').text("");

    $("#HdrSec1_CmbProject_Cd").data("kendoComboBox").value("");
    $("#HdrSec1_CmbProject_Nm").data('kendoComboBox').text("");

    $("#HdrSec1_CmbTask_Cd").data("kendoComboBox").value("");
    $("#HdrSec1_CmbTask_Nm").data('kendoComboBox').text("");

    $("#HdrSec1_LineNo_Val").data("kendoNumericTextBox").value("1");

    try {
        $("#HdrSec1_CmbSubCon_Cd").data("kendoComboBox").value("");
        $("#HdrSec1_CmbSubCon_Nm").data('kendoComboBox').text("");

    } catch (e) {

    }
    $("#DailyProgress").data("kendoGrid").dataSource.data([]);

    $("#HdrSec1_CmbUnit_Val").html("");

    $("#HdrSec1_NmricQty_Val").data("kendoNumericTextBox").value("0");

    FormGlblData.Detail_Editing_LiNo = 0;
    FormGlblData.TrnKy = 1;
    $("#HdrSec1_CmbTaskLoc_Cd").data("kendoComboBox").value("");
    $("#HdrSec1_CmbTaskLoc_Nm").data('kendoComboBox').text("");
}

function ClearDetail() {

    $("#HdrSec1_CmbSubCon_Cd").data("kendoComboBox").value("");
    $("#HdrSec1_CmbSubCon_Nm").data('kendoComboBox').text("");
    $("#HdrSec1_CmbTask_Cd").data("kendoComboBox").value("");
    $("#HdrSec1_CmbTask_Nm").data('kendoComboBox').text("");
    $("#HdrSec1_CmbUnit_Val").html("");
    $("#HdrSec1_NmricQty_Val").data("kendoNumericTextBox").value("0");
    $('#HdrSec1_InptDesc_Val').val('');
    $("#HdrSec1_CmbTaskLoc_Cd").data("kendoComboBox").value("");
    $("#HdrSec1_CmbTaskLoc_Nm").data('kendoComboBox').text("");
}

function StartSavingFunction(
    Date,
    AdrKy,
    PrjKy,
    Tsk,
    LinNo,
    AccKy,
    Des,
    UniKy,
    QtyKy,
    OrdKySelect,
    OrdTypKySelect,
    OrdNoSelect,
    DocNo
) {
    var TskLockKy = $("#HdrSec1_CmbTaskLoc_Cd").data("kendoComboBox").value();
    if (TskLockKy == null||TskLockKy =="") {
        TskLockKy = 1;
    }
    if (OrdKySelect < 11) {

        $.ajax({
            url: urlTransactionInsertDeatilHdrInvoice,
            data: JSON.stringify({
                ObjKy: viewBag.ObjKy,
                ContraAccObjKy: 1,
                AccObjKy: 1,
                PrjKy: PrjKy,
                AdrKy: 1,
                FrmLocKy: 1,
                BUKY: 1,
                AccKy: 1,
                Date: Date,
                OurCd: viewBag.OurCd,
                ConCd: 'TrnTyp',
                DocNo: DocNo,
                Yurref: "",
                ExRate: "",
                Currency: "",
                Pmt: "",
                SlsACId: "",
                Dsicount: "0",
                NBT: "0",
                Vat: "0",
                Wht: "0",
                Svat: "0",
                SubTotal: "0",
                Total: "0",
                DliNo: "0",
                Des: Des,
                Rem: "",
                RepAdrKy: AdrKy,
                OrdNoKy: 1
            }),
            contentType: 'application/json; charset=utf-8',
            dataType: "Json",
            type: "POST",
            success: function (data) {
                if (data.TrnKy > 0) {

                    FormGlblData.AccessLvlKy = data.AcsLvlKy;
                    FormGlblData.ConfiLvlKy = data.ConFinLvlKy;
                    FormGlblData.TrnKy = data.TrnKy;
                    FormGlblData.TrnNo = data.PrefixTrnNo;
                    FormGlblData.TmStmp = data.TmStmp;

                    var updatedRecords = [];
                    var deletedRecords = [];
                    var NewRecord = [];
                    NewRecord = "[{\"EftvDt\" : " + "\"" + Date + "\"" + ","
                        + "\"PrjKy\" :  " + PrjKy + ","
                        + "\"PrcsDetKy\" : " + Tsk + ","
                        + "\"AdrKy\"  : " + AccKy + ","
                        + "\"AccKy\" : " + "1" + ","
                        //+ "\"AccKy\" : " + "1" + ","
                        + "\"UnitKy\" : " + UniKy + " ,"
                        + "\"TrnQty\" : " + QtyKy + ","
                        + "\"TaskQty\" : " + QtyKy + ","
                        + "\"TskLockKy\" : " + TskLockKy + ","
                        + "\"LiNo\" :  1,"
                        + "\"isAct\" :  1,"
                        + "\"Des\" : " + "\"" + Des + "\""
                        + "}]"

                    InsertGrid(
                        PrjKy,
                        AdrKy,
                        Date,
                        viewBag.OurCd,
                        'TrnTyp',
                        NewRecord,
                        updatedRecords,
                        deletedRecords,
                        false
                    );
                }
                else {
                    alert("Insert faild from Hdr.")
                }
            },
            error: function (e) {
                return false;
            }
        });


    } else {

        $.ajax({
            url: urlTransactionUpdateDeatilHdrInvoice,
            data: JSON.stringify({
                ObjKy: viewBag.ObjKy,
                AccessLvlKy: FormGlblData.AccessLvlKy,
                ConfiLvlKy: FormGlblData.ConfiLvlKy,
                ContraAccObjKy: 1,
                AccObjKy: 1,
                PrjKy: PrjKy,
                AdrKy: 1,
                FrmLocKy: 1,
                BUKY: 1,
                AccKy: AccKy,
                Date: Date,
                OurCd: viewBag.OurCd,
                ConCd: 'TrnTyp',
                DocNo: "",
                Yurref: "",
                YurRefDate: "",
                ExRate: "",
                Currency: "",
                Pmt: "",
                SlsACId: "",
                Dsicount: "0",
                NBT: "0",
                Vat: "0",
                Wht: "0",
                Svat: "0",
                SubTotal: "0",
                Total: "0",
                DliNo: "0",
                Des: Des,
                Rem: "",

                OrdKySelect: OrdKySelect,
                OrdTypKySelect: OrdTypKySelect,
                OrdPrefixKySelect: 1,
                OrdNoSelect: 0,
                TmStmp: FormGlblData.TmStmp,
                RepAdrKy: AdrKy,
                OrdNoKy: 1



            }),
            contentType: 'application/json; charset=utf-8',
            dataType: "Json",
            type: "POST",
            success: function (data) {
                if (data.TrnKy > 0) {

                    FormGlblData.AccessLvlKy = data.AcsLvlKy;
                    FormGlblData.ConfiLvlKy = data.ConFinLvlKy;
                    FormGlblData.TrnKy = data.TrnKy;

                    var NewRecord = [];
                    var deletedRecords = [];
                    var updatedRecords = [];
                    if (FormGlblData.itmTrnKy < 10) {
                        NewRecord = "[{\"EftvDt\" : " + "\"" + Date + "\"" + ","
                            + "\"PrjKy\" :  " + PrjKy + ","
                            + "\"PrcsDetKy\" : " + Tsk + ","
                            + "\"AdrKy\"  : " + AccKy + ","
                            + "\"AccKy\" : " + "1" + ","
                           // + "\"AccKy\" : " + "1" + ","
                            + "\"UnitKy\" : " + UniKy + " ,"
                            + "\"TrnQty\" : " + QtyKy + ","
                            + "\"TaskQty\" : " + QtyKy + ","
                            + "\"TskLockKy\" : " + TskLockKy + ","
                            + "\"LiNo\" :  1,"
                            + "\"isAct\" :  1,"
                            + "\"Des\" : " + "\"" + Des + "\""
                            + "}]"
                    } else {
                        updatedRecords = "[{\"EftvDt\" : " + "\"" + Date + "\"" + ","
                            + "\"PrjKy\" :  " + PrjKy + ","
                            + "\"PrcsDetKy\" : " + Tsk + ","
                            + "\"AdrKy\"  : " + AccKy + ","
                            + "\"AccKy\" : " + AccKy + ","
                            + "\"UnitKy\" : " + UniKy + " ,"
                            + "\"TrnQty\" : " + QtyKy + ","
                            + "\"TaskQty\" : " + QtyKy + ","
                            + "\"TskLockKy\" : " + TskLockKy + ","
                            + "\"ItmTrnKy\" : " + FormGlblData.itmTrnKy + ","
                            + "\"LiNo\" : " + FormGlblData.LiNo + ","
                            + "\"ItmKy\" :  1,"
                            + "\"isAct\" :  1,"
                            + "\"Des\" : " + "\"" + Des + "\""

                            + "}]"
                    }






                    InsertGrid(
                        PrjKy,
                        AdrKy,
                        Date,
                        viewBag.OurCd,
                        'TrnTyp',
                        NewRecord,
                        updatedRecords,
                        deletedRecords,
                        true
                    );
                }
                else {
                    alert("Update faild from Hdr.")
                }
            },
            error: function (e) {
                return false;
            }
        });
    }


}

function InsertGrid(
    PrjKy,
    AdrKy,
    Date,
    OurCd,
    ConCd,
    NewRecord,
    updatedRecords,
    deletedRecords,
    isUpdate
) {

    var ordKydata = FormGlblData.TrnKy;

    $.ajax({
        url: urlTransactionInsertDetailGridInvoice,
        data: JSON.stringify({
            AccessLvlKy: FormGlblData.AccessLvlKy,
            updatedOrders: updatedRecords, deletedOrders: kendo.stringify(deletedRecords), newOrders: NewRecord,
            ObjKy: viewBag.ObjKy,
            PrjKy: PrjKy,
            AdrKy: AdrKy,
            FrmLocKy: 1,
            AccKy: 1,
            BUKY: 1,
            Date: Date,
            OurCd: OurCd,
            ConCd: ConCd,
            ordKydata: ordKydata
        }),
        contentType: 'application/json; charset=utf-8',
        dataType: "Json",
        type: "POST",
        success: function (data) {



            var ordKydata = FormGlblData.TrnKy;
            GetHdrDetailDailyProgressFind(ordKydata);
            alert("Successfully saved!");
            ClearDetail();
            //  addNewRowToGrid();
        },
        error: function (e) {
            return false;
        }
    });
}




function GetHdrDetailDailyProgressFind(TrnKy) {

    $.ajax({
        url: urlFindInvoice.GetGridInvoiceDetail,
        data: JSON.stringify({

            ordKy: TrnKy,
        }),
        contentType: 'application/json; charset=utf-8',
        dataType: "Json",
        type: "POST",
        success: function (data) {

            for (i = 0; i < data.length; i++) {

                FormGlblData.AccessLvlKy = data[0].AcsLvlKy;
                FormGlblData.ConfiLvlKy = data[0].ConFinLvlKy;
                FormGlblData.TrnKy = data[0].TrnKy;
                FormGlblData.TmStmp = data[0].TmStmp;
                FormGlblData.TrnTypKy = data[0].TrnTypKy;
                FormGlblData.TrnNo = data[0].TrnNo;

                $("#HdrSec1_CmbTrnno_Val").val(data[0].TrnNo);

                var PrjKy = data[0].PrjKy;
                $("#HdrSec1_CmbProject_Cd").data("kendoComboBox").value(PrjKy);
                $("#HdrSec1_CmbProject_Nm").data("kendoComboBox").value(PrjKy);
                $("#HdrSec1_CmbProject_Nm").data("kendoComboBox").trigger("change");

                var TrnDt = data[0].TrnDt;
                $('#HdrSec1_DatPicDate_Val').val(TrnDt);

                try {
                    $("#HdrSec1_Adrky_Cd").data("kendoComboBox").value(data[0].RepAdrKy);
                    $("#HdrSec1_Adrky_Nm").data("kendoComboBox").value(data[0].RepAdrKy);

                } catch (e) {

                }
                //var AdrKy = data[0].AdrKy;
                //try {
                //    $("#HdrSec1_CmbSubCon_Cd").data("kendoComboBox").value(AdrKy);
                //    $("#HdrSec1_CmbSubCon_Nm").data("kendoComboBox").value(AdrKy);
                //    $("#HdrSec1_CmbSubCon_Nm").data("kendoComboBox").trigger("change");

                //} catch (e) {

                //}
            }
            GetGridDetailFrmFindResourceUsage(FormGlblData.TrnTypKy, FormGlblData.TrnKy);

        },
        error: function (e) {
            return false;
        }
    });

}

var LoadAfterOneMinuteFindInvoice_IsOpen_First = true;
$(document.body).keydown(function (e) {
    if (e.ctrlKey && e.keyCode == 70) {
        e.preventDefault();

        if (LoadAfterOneMinuteFindInvoice_IsOpen_First) {
            LoadAfterOneMinuteFindInvoice();
            LoadAfterOneMinuteFindInvoice_IsOpen_First = false;
        }

        $("#FindFormGRN").show().kendoWindow({
            width: "1000px",
            height: "550px",
            modal: true,
            title: "Find"
        });
        $('#FindFormGRN').data('kendoWindow').center().open();
        //$("#OrdNoTo").focus();
    }
});


function GetGridDetailFrmFindResourceUsage(TrnTypKy, TrnKy) {

    $.ajax({
        url: urlFindInvoice.GetPrjPrgrsItmTrn,
        data: JSON.stringify({
            TrnTypKy: TrnTypKy,
            ordKy: TrnKy,
        }),
        contentType: 'application/json; charset=utf-8',
        dataType: "Json",
        type: "POST",
        success: function (data) {
            var id = ("#" + viewBag.OurCd);
            // FormGlblData.itmTrnKy = data[0].ItmTrnKy;
            $("#DailyProgress").data('kendoGrid').dataSource.data([]);
            //$("#HdrSec1_CmbUnit_Val").html("" + data[0].Unit);

            //var OrdAdrKy = data[0].AdrKy;
            //$("#HdrSec1_Adrky_Cd").data("kendoComboBox").value(OrdAdrKy);
            //$("#HdrSec1_Adrky_Nm").data("kendoComboBox").value(OrdAdrKy);



            //$("#HdrSec1_InptDesc_Val").val(data[0].Des);

            //$("#HdrSec1_NmricQty_Val").data("kendoNumericTextBox").value(data[0].TrnQty);

            //var PrcsDetKy = data[0].PrcsDetKy

            //try {
            //    $("#HdrSec1_CmbTask_Cd").data("kendoComboBox").value(PrcsDetKy);
            //    $("#HdrSec1_CmbTask_Nm").data("kendoComboBox").value(PrcsDetKy);

            //} catch (e) {

            //}


            for (i = 0; i < data.length; i++) {
                $("#DailyProgress").data("kendoGrid").dataSource.add({
                    LiNo: data[i].LiNo,
                    ItmTrnKy: data[i].ItmTrnKy,
                    PrjKy: 1,
                    ResLeadKy: data[i].RepAdrKy,
                    ResLeadID: data[i].RepAdrKy,
                    ResLeadNm: data[i].RepAdrKy,
                    SubconAdrKy: data[i].AdrKy,
                    SubconAccCd: data[i].AdrId,
                    SubconAccNm: data[i].AdrId,
                    TaskKy: data[i].PrcsDetKy,
                    TaskID: data[i].PrcsID,
                    TaskNm: data[i].PrcsNm,
                    TaskUnitKy: data[i].UnitKy,
                    TaskUnit: data[i].Unit,
                    TaskQty: data[i].TrnQty,
                    Description: data[i].Des,
                    TskLockKy: data[i].TskLockKy,
                    TskLockCd: data[i].TskLockCd,


                });

            }

            try { $('#FindFormGRN').data('kendoWindow').close(); }
            catch (e) { }

        },
        error: function (e) {
            return false;
        }
    });

}

$("#DailyProgress").on("dblclick", "tr.k-state-selected", function () {
    var id = ("#DailyProgress");
    var grid = $(id).data().kendoGrid;
    var selectedItem = grid.dataItem(grid.select());

    FormGlblData.itmTrnKy = selectedItem.ItmTrnKy;
    FormGlblData.LiNo = selectedItem.LiNo;
    $("#HdrSec1_CmbSubCon_Cd").data("kendoComboBox").value(selectedItem.SubconAdrKy);
    $("#HdrSec1_CmbSubCon_Nm").data("kendoComboBox").value(selectedItem.SubconAdrKy);
    $("#HdrSec1_CmbTask_Cd").data("kendoComboBox").value(selectedItem.TaskKy);
    $("#HdrSec1_CmbTask_Nm").data("kendoComboBox").value(selectedItem.TaskKy);
    $("#HdrSec1_CmbTask_Nm").data("kendoComboBox").trigger("change");
    $("#HdrSec1_CmbTaskLoc_Cd").data("kendoComboBox").value(selectedItem.TskLockKy);
    $("#HdrSec1_CmbTaskLoc_Nm").data("kendoComboBox").value(selectedItem.TskLockCd);
    $('#HdrSec1_InptDesc_Val').val(selectedItem.Description);


    $("#HdrSec1_NmricQty_Val").data('kendoNumericTextBox').value(selectedItem.TaskQty);

});


function LoadDailyProgress() {

    var grid = $('#FindFormGridGRN').data().kendoGrid;
    var selectedItem = grid.dataItem(grid.select());
    FormGlblData.selectedIndex = grid.select().index();
    var DataSource = $('#FindFormGridGRN').data('kendoGrid').dataSource.data();
    $("#pager").data("kendoPager").dataSource.data([]);
    var destinationgrid = $('#pager').data('kendoPager'); // DESTINATION Pager
    for (var i = 0; i < DataSource.length; i++) {
        destinationgrid.dataSource.add(DataSource[i]);
    }
    destinationgrid.dataSource.page(FormGlblData.selectedIndex + 1);
    destinationgrid.refresh();
    if (selectedItem != null) {
        var TrnKy = selectedItem.TrnKy;
        if (TrnKy != "" || TrnKy != undefined || TrnKy != null) {
            FormGlblData.ISNeworUpdateTranction = 0;
            GetHdrDetailDailyProgressFind(TrnKy);
        } else {
            alert("please Select Any Resources");
        }
    } else {
        alert("please Select Any Resources");
    }
}

function SubConCdDatasource(ObjNm, PreKy) {

    if (isNaN(PreKy))
        return [];

    var ObjKy = GetObjKy(ObjNm);
    var TrnTypKy = FormGlblData.TrnTypKy;
    var dataSource = new kendo.data.DataSource(
        {
            transport: {
                read: {
                    url: urlComboLoad.PPrjKySubConAccCd_SelectMob,
                    data: { ObjKy: ObjKy, TrnTypKy: TrnTypKy, PreKy: PreKy },
                    dataType: "json"
                }
            }
        });
    return dataSource;
}

function SubConNMDatasource(ObjNm, PreKy) {

    if (isNaN(PreKy))
        return [];

    var ObjKy = GetObjKy(ObjNm);
    var TrnTypKy = FormGlblData.TrnTypKy;
    var dataSource = new kendo.data.DataSource(
        {
            transport: {
                read: {
                    url: urlComboLoad.PPrjKySubConAccNm_SelectMob,
                    data: { ObjKy: ObjKy, TrnTypKy: TrnTypKy, PreKy: PreKy },
                    dataType: "json"
                }
            }
        });
    return dataSource;
}


function TaskDatasource_Cd(PreKy, accKy, ObjNm) {
    var ObjKy = GetObjKy(ObjNm);
    var dataSource = new kendo.data.DataSource(
        {
            transport: {
                read: {
                    url: urlComboLoad.SubConTaskId_SelectMob,
                    data: {
                        PreKy: PreKy,
                        accKy: accKy,
                        ObjKy: ObjKy


                    },
                    dataType: "json"
                }
            }
        });
    return dataSource;
}

function TaskDatasource_Nm(PreKy, accKy, ObjNm) {
    var ObjKy = GetObjKy(ObjNm);
    var dataSource = new kendo.data.DataSource(
        {
            transport: {
                read: {
                    url: urlComboLoad.SubConTaskNm_SelectMob,
                    data: {
                        PreKy: PreKy,
                        accKy: accKy,
                        ObjKy: ObjKy
                    },
                    dataType: "json"
                }
            }
        });
    return dataSource;
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

function TaskId_Datasource(ObjKy, PrjKy) {
    //var ObjKy = GetObjKy(ObjNm);
    var dataSource = new kendo.data.DataSource(
        {
            transport: {
                read: {
                    url: urlComboLoad.TaskId_SelectMob,
                    data: {
                        ObjKy: ObjKy,
                        PrjKy: PrjKy

                    },
                    dataType: "json"
                }
            }
        });
    return dataSource;
}

function TaskNm_Datasource(ObjKy, PrjKy) {
    //var ObjKy = GetObjKy(ObjNm);
    var dataSource = new kendo.data.DataSource(
        {
            transport: {
                read: {
                    url: urlComboLoad.TaskNm_SelectMob,
                    data: {
                        ObjKy: ObjKy,
                        PrjKy: PrjKy
                    },
                    dataType: "json"
                }
            }
        });
    return dataSource;
}


function ValidateEntry() {
    var ItmTrnKy = FormGlblData.itmTrnKy;
    var isValidate = true;
    var LeadAdrKy = $("#HdrSec1_Adrky_Cd").data("kendoComboBox").value();
    var subconAddressKy = $("#HdrSec1_CmbSubCon_Cd").data("kendoComboBox").value();
    var PrjKy = $("#HdrSec1_CmbProject_Cd").data("kendoComboBox").value();
    var TaskKy = $("#HdrSec1_CmbTask_Cd").data("kendoComboBox").value();
    var GridData = $("#DailyProgress").data("kendoGrid").dataSource.data();
    if (ItmTrnKy > 10) {
        for (var i = 0; i < GridData.length; i++) {
            if (GridData[i].SubconAdrKy == subconAddressKy && GridData[i].TaskKy == TaskKy) {
                alert("You cannot have same Subcontractor and Task twise");
                isValidate = false;
            }
        }
    } else {
        var count = 0;
        for (var i = 0; i < GridData.length; i++) {
            if (GridData[i].SubconAdrKy == subconAddressKy && GridData[i].TaskKy == TaskKy) {
                count++;

            }
            if (count > 1) {
                alert("You cannot have same Subcontractor and Task twise");
                isValidate = false;
            }
        }
    }

    return isValidate;
}
var dataSource = new kendo.data.DataSource({
    data: [],
    pageSize: 1,
    schema: {
        model: {
            id: "TrnKy",
            fields: //Relavent fields of the grid should be bind with following model items
            {
                TrnKy: { editable: true, nullable: false, type: "number" },
            }
        }
    }
});

$("#pager").kendoPager({
    dataSource: dataSource,
    buttonCount: 1,
    pageSize: 1,
    messages: {
        previous: "Go to Next Transaction",
        next: "Go to Previous Transaction",
        last: "Go to First Transaction",
        first: "Go to Last Transaction",
        display: "{0} of {2} Transaction"


    }
});

dataSource.read();


//<!-- navigation script end -->

$(".k-icon.k-i-arrow-e").parent().click(function () {
    var PagerData = $('#pager').data('kendoPager').dataSource.data();
    if (PagerData.length == 0) {
        return;
    }
    // alert("1");
    var DataSource = $('#FindFormGridGRN').data('kendoGrid').dataSource.data();
    var getnett = FormGlblData.selectedIndex + 1;
    //alert(getnett)
    GetRecord(getnett);
    if (FormGlblData.selectedIndex < DataSource.length) {
        FormGlblData.selectedIndex = getnett;
    }
    //right Arrow
});

$(".k-icon.k-i-seek-e").parent().click(function () {
    var PagerData = $('#pager').data('kendoPager').dataSource.data();
    if (PagerData.length == 0) {
        return;
    }
    // alert("2");
    var DataSource = $('#FindFormGridGRN').data('kendoGrid').dataSource.data();
    var getnett = DataSource.length - 1;
    // alert(getnett)
    GetRecord(getnett);
    FormGlblData.selectedIndex = getnett;



    //Last was clicked


});

$(".k-icon.k-i-arrow-w").parent().click(function () {
    var PagerData = $('#pager').data('kendoPager').dataSource.data();
    if (PagerData.length == 0) {
        return;
    }
    // alert("3");
    var getnett = FormGlblData.selectedIndex - 1;
    GetRecord(getnett);
    // alert(getnett)
    if (getnett > 0) {
        FormGlblData.selectedIndex = getnett;

    }

    //  alert("Left was clicked.");

});

$(".k-icon.k-i-seek-w").parent().click(function () {
    var PagerData = $('#pager').data('kendoPager').dataSource.data();
    if (PagerData.length == 0) {
        return;
    }
    // alert("4");
    GetRecord(0);
    FormGlblData.selectedIndex = 0;
    // alert(FormGlblData.selectedIndex)

    // alert("First was clicked.");

});


function GetRecord(IndexNo) {
    // alert(IndexNo)
    //try {
    var DataSource = $('#FindFormGridGRN').data('kendoGrid').dataSource.data();
    if (DataSource == []) {
        alert("Please Select a Filtering criteria");
    } else {
        if (IndexNo >= DataSource.length) {
            return;
        }
        TrnKy = DataSource[IndexNo].TrnKy;
        //var ordKydata = FormGlblData.TrnKy;
        GetHdrDetailDailyProgressFind(TrnKy);
        //   GetpaymentHdrDetail(TrnKy);
        // alert(JSON.stringify(DataSource[0]));
    }
    //} catch (e) {
    //    alert("Network error,Please Reload the page");


    //}



}