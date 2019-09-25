
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
    TrnNo: "",
    AccessLvlKy: 1,
    ConfiLvlKy: 1,
    TrnKy: 1,
    ItmKy: 1,
    TodayDate: todayDate,
    TmStmp: "",
    IsDetailRelatedHdrSectionChanged: false,
    AllDefalutValueObj: null,
    GotItemRate: 0,
    ISNeworUpdateTranction: 1,
    isSaveandNew: 0,
    isItmCdFrmCmb: 0,
    itmCdFrm: '',
    ItmCdWhenDblClick: '',
    Detail_Editing_LiNo: 0,
    TrnRate: 0,
    //PriConLoc: 1
    WipLocatn: 1,
    FormTyp: "TrnTyp"


}

var CdMasModel = {
    IsTrnRateInclusiveTaxTyp1_VAT: 0,    // IsTrnRateInclusiveTaxTyp1_VAT : isCd27
    TrnMinDate: "", // Back date Transaction Purpose
    TrnMaxDate: ""  // Future Date Transaction Purpose
}


$(document).ready(function () {

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
            Button_From_Dynamic('ButtonSec1');
            Button_From_Dynamic('ButtonSec2');
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
        contentType: 'application/json; charset=utf-8',
        success: function (HdrSectionFromDb) {

            FormGlblData.FormObjData = HdrSectionFromDb;
            FormGlblData.AllDefalutValueObj = Get_AllDefalutValue_Obj();
            FormGlblData.AllValidationObj = Get_All_Validation_Obj();

            FormGlblData.AllValidationObj = sortByKey(FormGlblData.AllValidationObj, 'ValidationOrder');

            DocReadyCus();
            //Define_And_Load_ObjMas_Form_Prop_Setting_Grid(HdrSectionFromDb);
        }
    });
}

function DocReadyCus() {

    setHdrSectionPropFun();

    $("#HdrSec1_CmbProject_Nm").width(400);
    LoadGridView();
    var todayDate = new Date();
    $('#HdrSec1_DatPicDate_Val').kendoDatePicker({
        format: "dd/MM/yyyy",
        change: OnDateChange
    });
    $('#HdrSec1_DatPicDate_Val').data("kendoDatePicker").value(todayDate);

    PrjComboLoad();
    TaskComboLoad(1);
    LoadUnitCombo(1);
    AdrComboLoad(1);
    $("#HdrSec2_NmricQty_Val").data('kendoNumericTextBox').value(1);
    $("#HdrSec2_NmricLiNo_Val").data('kendoNumericTextBox').value(0);
    $("#HdrSec2_NmricRate_Val").data('kendoNumericTextBox').value(0);

    var TaskcmbCd = $("#HdrSec2_CmbTask_Cd").data("kendoComboBox");
    var TaskcmbNm = $("#HdrSec2_CmbTask_Nm").data("kendoComboBox");
    //TaskcmbCd.input.keydown(preventPost);
    //TaskcmbNm.input.keydown(preventPost);

    var ResourcecmbCd = $("#HdrSec2_CmbResource_Cd").data("kendoComboBox");
    var ResourcecmbNm = $("#HdrSec2_CmbResource_Nm").data("kendoComboBox");
    //ResourcecmbCd.input.keydown(preventPost);
    //ResourcecmbNm.input.keydown(preventPost);

    FindGridDefaultColumns();//find Form
}

function setHdrSectionPropFun() {

    // ---------- Set ObjProperties
    setHdrSectionProp('', viewBag.ObjKy, '', 'HdrSec1');
    setHdrSectionProp('', viewBag.ObjKy, '', 'HdrSec2');

    SetHandlingEnterKeyEvent('', viewBag.ObjKy);

}

function PrjComboLoad() {

    //$("#HdrSec1_CmbProj_Cd").kendoComboBox({
    //    dataValueField: "PrjKy",
    //    dataTextField: "PrjCd",
    //    dataSource: ProjectCd('HdrSec1_CmbProj'),

    //    filter: "startswith",
    //    suggest: true,
    //    placeholder: "Proj ID"
    //});

    $("#HdrSec1_CmbProject_Cd").kendoComboBox({
        dataValueField: "PrjKy",
        dataTextField: "PrjCd",
        dataSource: ProjectCd('HdrSec1_CmbProject'),
        change: function (e) {

            var id = ("#" + viewBag.OurCd);
            var count = $(id).data().kendoGrid.dataSource.total();
            if (count == 0) {

                var cmb = $("#HdrSec1_CmbProject_Cd").data("kendoComboBox");
                var prjky = cmb.value();
                if (prjky == "" || prjky == undefined || prjky == null) {
                    alert(prjky + " is not valid Project");
                    $("#HdrSec1_CmbProject_Cd").data("kendoComboBox").value(1);
                    $("#HdrSec1_CmbProject_Cd").data("kendoComboBox").text("");
                }
                else {
                    $("#HdrSec1_CmbProject_Nm").data("kendoComboBox").value(prjky);
                    //PrcLocatn(prjky);
                    WipLocatn(prjky);
                    TaskComboLoad(prjky);

                }
            }
            else {
                var r = confirm("Do you want to Add New?");
                if (r == true) {
                    
                    try {
                        $(id).data().kendoGrid.destroy();
                        $(id).empty();
                        LoadGridView();
                        ClearAll();
                        var cmb = $("#HdrSec1_CmbProject_Cd").data("kendoComboBox");
                        var prjky = cmb.value();
                        if (prjky == "" || prjky == undefined || prjky == null) {
                            alert(prjky + " is not valid Project");
                            $("#HdrSec1_CmbProject_Cd").data("kendoComboBox").value(1);
                            $("#HdrSec1_CmbProject_Cd").data("kendoComboBox").text("");
                        }
                        else {
                            $("#HdrSec1_CmbProject_Nm").data("kendoComboBox").value(prjky);
                            TaskComboLoad(prjky);
                        }
                      
                    } catch (e) { }
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

            var id = ("#" + viewBag.OurCd);
            var count = $(id).data().kendoGrid.dataSource.total();
            if (count == 0) {

                var cmb = $("#HdrSec1_CmbProject_Nm").data("kendoComboBox");
                var prjky = cmb.value();
                if (prjky == "" || prjky == undefined || prjky == null) {
                    alert(prjky + " is not valid Project");
                    $("#HdrSec1_CmbProject_Nm").data("kendoComboBox").value(1);
                    $("#HdrSec1_CmbProject_Nm").data("kendoComboBox").text("");
                }
                else {
                    $("#HdrSec1_CmbProject_Cd").data("kendoComboBox").value(prjky);
                    TaskComboLoad(prjky);
                }
            }
            else {

                var r = confirm("Do you want to Add New?");
                if (r == true) {
                    ClearAll();
                    try {
                        $(id).data().kendoGrid.destroy();
                        $(id).empty();
                        LoadGridView();
                        var cmb = $("#HdrSec1_CmbProject_Nm").data("kendoComboBox");
                        var prjky = cmb.value();
                        if (prjky == "" || prjky == undefined || prjky == null) {
                            alert(prjky + " is not valid Project");
                            $("#HdrSec1_CmbProject_Nm").data("kendoComboBox").value(1);
                            $("#HdrSec1_CmbProject_Nm").data("kendoComboBox").text("");
                        }
                        else {
                            $("#HdrSec1_CmbProject_Cd").data("kendoComboBox").value(prjky);
                            TaskComboLoad(prjky);
                        }

                    }
                    catch (e) { }
                }
                                
            }

        },
        filter: "startswith",
        suggest: true,
        placeholder: "Project Name"
    });


}

function TaskComboLoad(PrjKy) {
    $("#HdrSec2_CmbTask_Cd").kendoComboBox({
        dataValueField: "TaskKy",
        dataTextField: "TaskId",
        dataSource: TaskDatasource(PrjKy),
        change: function (e) {
            var cmb = $("#HdrSec2_CmbTask_Cd").data("kendoComboBox");
            var TaskKy = cmb.value();
            if (TaskKy == "" || TaskKy == null || TaskKy == undefined) {
                //alert(TaskKy + " is not valid Task");
                $("#HdrSec2_CmbTask_Cd").data("kendoComboBox").value(1);
                $("#HdrSec2_CmbTask_Cd").data("kendoComboBox").text("");
            }
            else {
                $("#HdrSec2_CmbTask_Nm").data("kendoComboBox").value(TaskKy);
            }
        },
        filter: "startswith",
        suggest: true,
        placeholder: "Task ID"
    });

    $("#HdrSec2_CmbTask_Nm").kendoComboBox({
        dataValueField: "TaskKy",
        dataTextField: "TaskNm",
        dataSource: TaskDatasource(PrjKy),
        change: function (e) {
            var cmb = $("#HdrSec2_CmbTask_Nm").data("kendoComboBox");
            var TaskKy = cmb.value();
            if (TaskKy == "" || TaskKy == null || TaskKy == undefined) {
                alert(TaskKy + " is not valid Task");
                $("#HdrSec2_CmbTask_Nm").data("kendoComboBox").value(1);
                $("#HdrSec2_CmbTask_Nm").data("kendoComboBox").text("");
            }
            else {
                $("#HdrSec2_CmbTask_Cd").data("kendoComboBox").value(TaskKy);
            }
        },
        filter: "startswith",
        suggest: true,
        placeholder: "Task Name"
    });

}

function LoadUnitCombo(ItmKy) {

    $("#HdrSec2_CmbUnit_Cd").kendoComboBox({
        dataValueField: "UnitKy",
        dataTextField: "Unit",
        dataSource: UnitDatasource(ItmKy),
        change: function (e) {
            //var cmb = $("#HdrSec5_CmbItm_Cd").data("kendoComboBox");
            //var ItmKy = cmb.value();
            //if (ItmKy != "") {
            //}
        },
        filter: "startswith",
        suggest: true,
        enable: false,
        placeholder: "Select a Unit"
    });
}

function AdrComboLoad(PreKy) {
    $("#HdrSec2_CmbResource_Cd").kendoComboBox({
        dataValueField: "AdrKy",
        dataTextField: "AdrID",
        dataSource: ResAdrID_SelectMob(PreKy),//AdrByAccDatasource(AccKy),
        change: function (e) {
            var cmb = $("#HdrSec2_CmbResource_Cd").data("kendoComboBox");
            var AdrKy = cmb.value();
            if (AdrKy == "" || AdrKy == null || AdrKy == undefined) {
                alert(AdrKy + " is not valid Address");
                $("#HdrSec2_CmbResource_Cd").data("kendoComboBox").value(1);
                $("#HdrSec2_CmbResource_Cd").data("kendoComboBox").text("");
            }
            else {
                $("#HdrSec2_CmbResource_Nm").data("kendoComboBox").value(AdrKy);

                //Het ItemKy from the datasource of kendocombo selected item
                var selectedObject = $("#HdrSec2_CmbResource_Cd").data("kendoComboBox").dataItem($("#HdrSec2_CmbResource_Cd").data("kendoComboBox").select());
                //$("#Unit_lbl_Cd").html("" + selectedObject.Unit);
                selectedItmKy = Number(selectedObject.ItmKy);
                if (selectedItmKy > 1) {
                    GetRateDisTax(selectedItmKy);
                    FormGlblData.ItmKy = selectedItmKy;
                    LoadUnitCombo(selectedItmKy);

                }
                else {
                    FormGlblData.ItmKy = 1;
                    LoadUnitCombo(1);
                    alert(AdrKy + " is not valid for Item");
                    $("#HdrSec2_CmbResource_Nm").data("kendoComboBox").value(1);
                    $("#HdrSec2_CmbResource_Nm").data("kendoComboBox").text("");
                    $("#HdrSec2_CmbResource_Cd").data("kendoComboBox").value(1);
                    $("#HdrSec2_CmbResource_Cd").data("kendoComboBox").text("");
                    $("#HdrSec2_CmbUnit_Cd").data("kendoComboBox").text("");
                    $("#HdrSec2_CmbUnit_Cd").data("kendoComboBox").value(1);
                }

                //$.ajax({
                //    url: urlGetItmKyByAdress, //"@Url.Content("~/Transaction/ValidateTrnDt")",
                //    data: JSON.stringify({
                //        AdrKy: AdrKy,
                //        ObjKy: viewBag.ObjKy
                //    }),
                //    contentType: 'application/json; charset=utf-8',
                //    dataType: "Json",
                //    type: "POST",
                //    success: function (dataList) {
                //        if (dataList[0].ItmKy > 1) {
                //            FormGlblData.ItmKy = dataList[0].ItmKy;
                //            $("#HdrSec2_CmbUnit_Cd").data("kendoComboBox").text("");
                //            $("#HdrSec2_CmbUnit_Cd").data("kendoComboBox").value(1);
                //            LoadUnitCombo(dataList[0].ItmKy);
                //            GetRateDisTax(dataList[0].ItmKy);
                //        }
                //        else {
                //            alert(AdrKy + " is not valid for Item");
                //            $("#HdrSec2_CmbResource_Nm").data("kendoComboBox").value(1);
                //            $("#HdrSec2_CmbResource_Nm").data("kendoComboBox").text("");
                //            $("#HdrSec2_CmbResource_Cd").data("kendoComboBox").value(1);
                //            $("#HdrSec2_CmbResource_Cd").data("kendoComboBox").text("");
                //            LoadUnitCombo(1);
                //            $("#HdrSec2_CmbUnit_Cd").data("kendoComboBox").text("");
                //            $("#HdrSec2_CmbUnit_Cd").data("kendoComboBox").value(1);
                            
                //        }
                //    },
                //    error: function (e) {

                //    }
                //});


            }
        },
        filter: "contains",
        suggest: true,
        placeholder: "Address ID"
    });



    $("#HdrSec2_CmbResource_Nm").kendoComboBox({
        dataValueField: "AdrKy",
        dataTextField: "AdrNm",
        dataSource: ResAdrID_SelectMob(PreKy),//AdrByAccDatasource(AccKy),
        change: function (e) {
            var cmb = $("#HdrSec2_CmbResource_Nm").data("kendoComboBox");
            var AdrKy = cmb.value();
            if (AdrKy == "" || AdrKy == null || AdrKy == undefined) {
                alert(AdrKy + " is not valid Address");
                $("#HdrSec2_CmbResource_Nm").data("kendoComboBox").value(1);
                $("#HdrSec2_CmbResource_Nm").data("kendoComboBox").text("");
            }
            else {
                $("#HdrSec2_CmbResource_Cd").data("kendoComboBox").value(AdrKy);

                //Het ItemKy from the datasource of kendocombo selected item
                var selectedObject = $("#HdrSec2_CmbResource_Nm").data("kendoComboBox").dataItem($("#HdrSec2_CmbResource_Nm").data("kendoComboBox").select());
                //$("#Unit_lbl_Cd").html("" + selectedObject.Unit);
                selectedItmKy = Number(selectedObject.ItmKy);
                if (selectedItmKy > 1) {
                    GetRateDisTax(selectedItmKy);
                    FormGlblData.ItmKy = selectedItmKy;
                    LoadUnitCombo(selectedItmKy);

                }
                else {
                    FormGlblData.ItmKy = 1;
                    LoadUnitCombo(1);
                    alert(AdrKy + " is not valid for Item");
                    $("#HdrSec2_CmbResource_Nm").data("kendoComboBox").value(1);
                    $("#HdrSec2_CmbResource_Nm").data("kendoComboBox").text("");
                    $("#HdrSec2_CmbResource_Cd").data("kendoComboBox").value(1);
                    $("#HdrSec2_CmbResource_Cd").data("kendoComboBox").text("");
                    $("#HdrSec2_CmbUnit_Cd").data("kendoComboBox").text("");
                    $("#HdrSec2_CmbUnit_Cd").data("kendoComboBox").value(1);
                }

                //alert(selectedItmKy);

                //Musthaq
                //$.ajax({
                //    url: urlGetItmKyByAdress, //"@Url.Content("~/Transaction/ValidateTrnDt")",
                //    data: JSON.stringify({
                //        AdrKy: AdrKy,
                //        ObjKy: viewBag.ObjKy
                //    }),
                //    contentType: 'application/json; charset=utf-8',
                //    dataType: "Json",
                //    type: "POST",
                //    success: function (dataList) {
                //        if (dataList[0].ItmKy > 1) {
                //            FormGlblData.ItmKy = dataList[0].ItmKy;
                //            $("#HdrSec2_CmbUnit_Cd").data("kendoComboBox").text("");
                //            $("#HdrSec2_CmbUnit_Cd").data("kendoComboBox").value(1);
                //            LoadUnitCombo(dataList[0].ItmKy);
                //        }
                //        else {
                //            alert(AdrKy + " is not valid for Item");
                //            $("#HdrSec2_CmbResource_Nm").data("kendoComboBox").value(1);
                //            $("#HdrSec2_CmbResource_Nm").data("kendoComboBox").text("");
                //            $("#HdrSec2_CmbResource_Cd").data("kendoComboBox").value(1);
                //            $("#HdrSec2_CmbResource_Cd").data("kendoComboBox").text("");
                //            LoadUnitCombo(1);
                //            $("#HdrSec2_CmbUnit_Cd").data("kendoComboBox").text("");
                //            $("#HdrSec2_CmbUnit_Cd").data("kendoComboBox").value(1);
                            
                //        }

                //    },
                //    error: function (e) {

                //    }
                //});

            }
        },
        filter: "contains",
        suggest: true,
        placeholder: "Address Name"
    });

}


$("#HdrSec2_NmricQty_Val").kendoNumericTextBox({
    min: 0.0000,
    decimals: 3,
    format: "n3",
    spinners: false
}).focus(function () {
    var input = $(this);
    setTimeout(function () {
        input.select();
    });
});
$("#HdrSec2_NmricRate_Val").kendoNumericTextBox({
    min: 0.0000,
    decimals: 0,
    format: "n2",
    spinners: false

}).focus(function () {
    var input = $(this);
    setTimeout(function () {
        input.select();
    });
});
$("#HdrSec2_NmricLiNo_Val").kendoNumericTextBox({
    min: 0.0000,
    spinners: false
});

function ClearAll() {

    //$("#HdrSec1_CmbProject_Cd").data("kendoComboBox").value(1);
    //$("#HdrSec1_CmbProject_Nm").data("kendoComboBox").value(1);
    $("#HdrSec2_CmbTask_Cd").data('kendoComboBox').value(1);
    $("#HdrSec2_CmbTask_Cd").data('kendoComboBox').text("");
    $("#HdrSec2_CmbTask_Nm").data('kendoComboBox').value(1);
    $("#HdrSec2_CmbTask_Nm").data('kendoComboBox').text("");
    $("#HdrSec2_CmbResource_Cd").data('kendoComboBox').value(1);
    $("#HdrSec2_CmbResource_Cd").data('kendoComboBox').text("");
    
    $("#HdrSec2_CmbResource_Nm").data('kendoComboBox').value(1);
    $("#HdrSec2_CmbResource_Nm").data('kendoComboBox').text("");
    $("#HdrSec2_CmbUnit_Cd").data('kendoComboBox').value(1);
    $("#HdrSec2_CmbUnit_Cd").data('kendoComboBox').text("");
    $("#HdrSec2_NmricQty_Val").data('kendoNumericTextBox').value(0);
    $("#HdrSec2_NmricRate_Val").data('kendoNumericTextBox').value(0);

    FormGlblData.Detail_Editing_LiNo = 0;
    //FormGlblData.TrnKy = 1;
   
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

function SaveResource() {
    var Date = $("#HdrSec1_DatPicDate_Val").val();
    var PrjKy = $("#HdrSec1_CmbProject_Cd").data("kendoComboBox").value();
    var AdrKy = $("#HdrSec2_CmbResource_Cd").data("kendoComboBox").value();
    var OrdKySelect = FormGlblData.TrnKy;
    var OrdTypKySelect = FormGlblData.TrnTypKy;
    var OrdNoSelect = FormGlblData.TrnNo;
    
    var OurCd = viewBag.OurCd;//"SALE";
    var ConCd = "TrnTyp";
    var id = ("#" + viewBag.OurCd);
    var grid = $(id).data("kendoGrid");
    var currentData = grid.dataSource.data();
    var updatedRecords = [];
    var newRecords = [];

    for (var i = 0; i < currentData.length; i++) {
        if (currentData[i].isNew() && currentData[i].PrcsDetKy > 0) {
            newRecords.push(currentData[i].toJSON());
        } else if (currentData[i].dirty && currentData[i].PrcsDetKy > 0) {
            updatedRecords.push(currentData[i].toJSON());
        }
        else if (FormGlblData.IsDetailRelatedHdrSectionChanged) {
            updatedRecords.push(currentData[i].toJSON());
        }
    }
    var deletedRecords = [];
    for (var i = 0; i < grid.dataSource._destroyed.length; i++) {
        deletedRecords.push(grid.dataSource._destroyed[i].toJSON());
    }

    $.ajax({
        url: urlTransactionValidateTrnDt, //"@Url.Content("~/Transaction/ValidateTrnDt")",
        data: JSON.stringify({
            Date: Date,
            OurCd: OurCd,
            ConCd: ConCd,
            PrjKy: PrjKy,           
            LocKy: 1

        }),
        contentType: 'application/json; charset=utf-8',
        dataType: "Json",
        type: "POST",
        success: function (dataList) {
            //OPENLodingCommon('Saving ... !');
            StartSavingFunction(
                    dataList,
                    PrjKy,
                    //FormGlblData.PriConLoc,
                    FormGlblData.WipLocatn,
                    AdrKy,
                    Date,
                    OurCd,
                    ConCd,
                    OrdKySelect,
                    OrdTypKySelect,
                    OrdNoSelect,
                    newRecords,
                    updatedRecords,
                    deletedRecords
                );
        },
        error: function (e) {
            return false;
        }
    });
}

function StartSavingFunction(
           dataList,
           PrjKy,
           //pricloc,
           Wiploc,
           AdrKy,          
           Date,
           OurCd,
           ConCd,
           OrdKySelect,
           OrdTypKySelect,
           OrdNoSelect,
           newRecords,
           updatedRecords,
           deletedRecords
    ) {

    for (i = 0; i < dataList.length; i++) {

        var validate = dataList[0].IsValidate;
        var message = dataList[0].Message;
        if (validate == 1) {
            if (OrdKySelect < 11){ 

                $.ajax({
                    url: urlTransactionInsertDeatilHdrInvoice, //"@Url.Content("~/Transaction/InsertDeatilHdrInvoice")",
                    data: JSON.stringify({
                        //, ObjKy, ContraAccObjKy, AccObjKy
                        ObjKy: viewBag.ObjKy,
                        ContraAccObjKy: 1,
                        AccObjKy: 1,
                        PrjKy: PrjKy,
                        AdrKy: AdrKy,                        
                        //FrmLocKy: pricloc,
                        FrmLocKy: Wiploc,
                        BUKY: 1,
                        AccKy: 1,
                        Date: Date,
                        OurCd: OurCd,
                        ConCd: ConCd,
                        DocNo: "",
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
                        Des: "",
                        Rem: "",
                        RepAdrKy: 1,
                        OrdNoKy: 1,
                        isApr: 7
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

                            InsertGrid(
                                    PrjKy,
                                    AdrKy,
                                    //pricloc,
                                    Wiploc,
                                    Date,
                                    OurCd,
                                    ConCd,
                                    newRecords,
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
                    url: urlTransactionUpdateDeatilHdrInvoice, //"@Url.Content("~/Transaction/UpdateDeatilHdrInvoice")",
                    data: JSON.stringify({
                        ObjKy: viewBag.ObjKy,
                        AccessLvlKy: FormGlblData.AccessLvlKy,
                        ConfiLvlKy: FormGlblData.ConfiLvlKy,
                        ContraAccObjKy: 1,
                        AccObjKy: 1,
                        PrjKy: PrjKy,
                        AdrKy: AdrKy,                        
                        //FrmLocKy: pricloc,
                        FrmLocKy: Wiploc,
                        BUKY: 1,
                        AccKy: 1,
                        Date: Date,
                        OurCd: OurCd,
                        ConCd: ConCd,
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
                        Des: "",
                        Rem: "",

                        OrdKySelect: OrdKySelect,
                        OrdTypKySelect: OrdTypKySelect,
                        OrdPrefixKySelect: 1,
                        OrdNoSelect: 0,
                        TmStmp: FormGlblData.TmStmp,
                        RepAdrKy: 1,
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

                            InsertGrid(
                                    PrjKy,
                                    AdrKy,
                                    //pricloc,
                                    Wiploc,
                                    Date,
                                    OurCd,
                                    ConCd,
                                    newRecords,
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
        } else {
            //CLOSELoadingCommon();
            alert(message);
        }
    }
}

function InsertGrid(
        PrjKy,
        AdrKy,
        //pricloc,
        Wiploc,
        Date,
        OurCd,
        ConCd,
        newRecords,
        updatedRecords,
        deletedRecords,
        isUpdate
    ) {

    var ordKydata = FormGlblData.TrnKy;

    $.ajax({
        url: urlTransactionInsertDetailGridInvoice, //"@Url.Content("~/Transaction/InsertDetailGridInvoice")",
        data: JSON.stringify({
            AccessLvlKy: FormGlblData.AccessLvlKy,
            updatedOrders: kendo.stringify(updatedRecords), deletedOrders: kendo.stringify(deletedRecords), newOrders: kendo.stringify(newRecords),
            ObjKy: viewBag.ObjKy,
            PrjKy: PrjKy,
            AdrKy: AdrKy,
            //FrmLocKy: pricloc,
            FrmLocKy: Wiploc,
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
            GetHdrDetailResourceUsageFind(ordKydata);
            alert("Success!");

            //if (IsWithPrint != 3) {
            //    //UpdateDetUI(FormGlblData.TrnKy);

            //}
            //GetInvoiceGridDetail(ordKydata);
            //LoadGridView();

            //CLOSELoadingCommon();

            //if (IsWithPrint == 1 || IsWithPrint == 3) {
            //    PrintSource();
            //}

            //if (isUpdate)
            //    alert("Successfully Updated ... !");
            //else
            //    alert("Successfully Saved ... !");

            //InsertAccounts(
            //    isUpdate,
            //        Date,
            //        Currency,
            //        Pmt
            //    );
        },
        error: function (e) {
            return false;
        }
    });
}


function ComClearFunction()
{
    FormGlblData.TrnKy = 1;
    FormGlblData.TrnNo = "";
    FormGlblData.TmStmp = "";

    $('#HdrSec1_DatPicDate_Val').data("kendoDatePicker").value(todayDate);
    $("#HdrSec2_NmricQty_Val").data('kendoNumericTextBox').value(1);
    $("#HdrSec2_NmricRate_Val").data('kendoNumericTextBox').value(0);
    $("#HdrSec2_NmricLiNo_Val").data('kendoNumericTextBox').value(0);
    $("#HdrSec1_CmbProject_Cd").data("kendoComboBox").value(1);
    $("#HdrSec1_CmbProject_Nm").data("kendoComboBox").value(1);
    $("#HdrSec2_CmbTask_Cd").data("kendoComboBox").value("");
    $("#HdrSec2_CmbTask_Nm").data("kendoComboBox").value(1);
    $("#HdrSec2_CmbResource_Cd").data("kendoComboBox").value("");
    $("#HdrSec2_CmbResource_Nm").data("kendoComboBox").value("");
    $("#HdrSec2_CmbUnit_Cd").data("kendoComboBox").value(1);
    $("#ResourceTrnNo").val(null);


    
    try {
        $("#" + viewBag.OurCd).data().kendoGrid.destroy();
        $("#" + viewBag.OurCd).empty();
        LoadGridView();
        var id = ("#" + viewBag.OurCd);
        $(id).data().kendoGrid.dataSource.data([]);
    } catch (e) { }
   
}

function Save(action) {
    SaveResource();
}

function SaveUpdate(action)
{
    if (action == "Save" || action == "saveandnew") {
        SaveResource();
        ComClearFunction();
    }
    
}

function Add()
{
    var PrjKy = $("#HdrSec1_CmbProject_Cd").data('kendoComboBox').value();
    var Resourcecmb = $("#HdrSec2_CmbResource_Cd").data('kendoComboBox').value();

    if (PrjKy == 1 || PrjKy == null || PrjKy == undefined || PrjKy == "") {
        alert("Please Select Project!");
        return;
    }
    if (Resourcecmb == 1 || Resourcecmb == null || Resourcecmb == undefined || Resourcecmb == "") {
        alert("Please select Resource!");
        return;
    }

    var LiNo = FormGlblData.Detail_Editing_LiNo;
    if (LiNo == 0 || LiNo == null || LiNo == undefined || LiNo == "") {
        setItmDetailbyEnterky();
    } else {
        changeDetails();
    }
    //event.preventDefault();
}

function LoadResourceUsage()
{
    //try { ComClearFunction(); }
    //catch (e) { }
   
    var grid = $('#FindFormGridGRN').data().kendoGrid;
    var selectedItem = grid.dataItem(grid.select());
    if (selectedItem != null) {
        var TrnKy = selectedItem.TrnKy;
        if (TrnKy != "" || TrnKy != undefined || TrnKy != null) {
            FormGlblData.TrnKy = selectedItem.TrnKy;
            FormGlblData.ISNeworUpdateTranction = 0;
            //SetTrnDate();
            GetHdrDetailResourceUsageFind(TrnKy);


        } else {
            alert("please Select Any Resources");
        }
    } else {
        alert("please Select Any Resources");
    }
}

function GetHdrDetailResourceUsageFind(TrnKy) {

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
                FormGlblData.TrnNo =  data[0].TrnNo;
                $("#ResourceTrnNo").val(data[0].TrnNo);
                var PrjKy = data[0].PrjKy;
                $("#HdrSec1_CmbProject_Cd").data("kendoComboBox").value(PrjKy);
                $("#HdrSec1_CmbProject_Nm").data("kendoComboBox").value(PrjKy);
                var TrnDt = data[0].TrnDt;
                $('#HdrSec1_DatPicDate_Val').val(TrnDt);               
                

                GetGridDetailFrmFindResourceUsage(FormGlblData.TrnTypKy, FormGlblData.TrnKy);

            }
        },
        error: function (e) {
            return false;
        }
    });

}

function GetGridDetailFrmFindResourceUsage(TrnTypKy, TrnKy) {

    $.ajax({
        url: urlFindInvoice.GetInvoiceItemsDetail,
        data: JSON.stringify({
            TrnTypKy: TrnTypKy,
            ordKy: TrnKy,
        }),
        contentType: 'application/json; charset=utf-8',
        dataType: "Json",
        type: "POST",
        success: function (data) {
            var id = ("#" + viewBag.OurCd);
            $(id).data("kendoGrid").dataSource.filter(null);
            var grid = $(id).data("kendoGrid");
            grid.dataSource.data([]);
            for (i = 0; i < data.length; i++) {

                var id = ("#" + viewBag.OurCd);
                $(id).data("kendoGrid").dataSource.add({
                    ItmTrnKy: data[i].ItmTrnKy,
                    LiNo: data[i].LiNo,
                    EftvDt: data[i].EftvDt,
                    ItmKy: data[i].ItmKy,
                    PrjId: data[i].PrjId,
                    PrjKy: data[0].PrjKy,
                    PrcsDetKy:data[i].PrcsDetKy,
                    PrcsID:data[i].PrcsID,
                    AdrKy: data[i].AdrKy,
                    AdrId:data[i].AdrId,
                    TrnQty:data[i].TrnQty,
                    UnitKy:data[i].UnitKy,
                    Unit: data[i].Unit,
                    trnRate: data[i].TrnRate,
                });
            }
            ClearAll();
            FormGlblData.TrnKy = TrnKy;
            try{$('#FindFormGRN').data('kendoWindow').close();}
            catch(e){}
            
        },
        error: function (e) {
            return false;
        }
    });

}

var id = ("#" + viewBag.OurCd);
$(id).on("click", ".k-grid-evenselect", function () {
    RemoveFromGrid(this);
});

$("#" + viewBag.OurCd).on("keydown", function (event) {
    if ((event.keyCode == 46) || (event.which == 46)) {
        RemoveFromGridByDelKey();
    }
});

function RemoveFromGrid(clickId) {
    //var answer = $(id).data("kendoGrid").removeRow($(this).closest("tr"));
    var id = ("#" + viewBag.OurCd);
    var grid = $(id).data("kendoGrid");
    var selectedItem = grid.dataItem($(clickId).closest("tr"));
    selectedItem.set("isAct", 0);
    var answer = grid.tbody.find($(clickId).closest("tr")).hide();
    grid.refresh();

}

function RemoveFromGridByDelKey() {
    var id = ("#" + viewBag.OurCd);
    var grid = $(id).data("kendoGrid");
    var selectedItem = grid.dataItem(grid.select());
    selectedItem.set("isAct", 0);
    var answer = grid.tbody.find(grid.select()).hide();
    grid.refresh();

}

function onDataBound(e) {
    var id = ("#" + viewBag.OurCd);
    var grid = $(id).data("kendoGrid");
    var dataSource = grid.dataSource.data();
    for (var i = 0; i < dataSource.length; i++) {
        if (dataSource[i].isAct == 0) {
            grid.tbody.find("[data-uid='" + dataSource[i].uid + "']").hide();
            //this.tbody.find("tr[data-uid='"+item.uid+"']").hide();
        }
    }
}

function ResAdrID_SelectMob(PreKy) {
    if (isNaN(PreKy))
        return []; 

    var dataSource = new kendo.data.DataSource(
    {
        transport: {
            read: {
                url: urlComboLoad.ResoAdr_SelectWeb,
                data: {
                    ObjKy: viewBag.ObjKy,
                    TrnTypKy: FormGlblData.TrnTypKy,
                    AdrTypKy: '1',
                    PreKy: PreKy
                },
                dataType: "json"
            }
        }
    });
    return dataSource;
}

function GetRateDisTax(ItmKy)
{
    var itmcd = $("#HdrSec2_CmbResource_Cd").data("kendoComboBox").text();
    var dt = $("#HdrSec1_DatPicDate_Val").val();
    var prjt = $("#HdrSec1_CmbProject_Cd").data("kendoComboBox").value();
    var adrKy = $("#HdrSec2_CmbResource_Nm").data("kendoComboBox").value();  //passing address key

    $.ajax({
        url: urlTransactionItemsLookUpByItmCd,
        dataType: "json",
        type: "POST",
        data: JSON.stringify({
            ObjKy: viewBag.ObjKy,
            ConCd: "TrnTyp", OurCd: viewBag.OurCd, ItmCd: itmcd,
            AdrKy: adrKy,
            //LocKy: FormGlblData.PriConLoc,
            LocKy: FormGlblData.WipLocatn,
            PrjKy: prjt,
            Dt: dt,
            ItmKy: ItmKy

        }),
        contentType: 'application/json; charset=utf-8',
        success: function (list) {
            
                for (i = 0; i < list.length; i++) {
                    var itmcd = list[0].ItmCd;
                    var itmky = list[0].ItmKy;
                    var itmnm = list[0].ItmNm;
                    var trnunitky = list[0].UnitKy;
                    var unit = list[0].Unit;
                    var rate = list[0].Rate; 
                    $("#HdrSec2_CmbUnit_Cd").data("kendoComboBox").value(trnunitky);
                    $("#HdrSec2_NmricRate_Val").data('kendoNumericTextBox').value(rate);
                    //FormGlblData.TrnRate = rate;


                }            
        },
        error: function (e) { }
    });
}

//function PrcLocatn(prjky) {
//    $.ajax({
//        url: urlGetProjectLocCode,
//        dataType: "json",
//        type: "POST",
//        data: JSON.stringify({
//            'ObjKy': 1,
//            'PrjTypKy': 1,
//            'PrjKy': prjky

//        }),
//        contentType: 'application/json; charset=utf-8',
//        success: function (dataListforLoc) {
//            FormGlblData.PriConLoc = (dataListforLoc[0].PriCtrlLocKy);
            
//        },
//    });

//}

function WipLocatn(prjky) {
    $.ajax({
        url: urlGetProjectLocCode,
        dataType: "json",
        type: "POST",
        data: JSON.stringify({
            'ObjKy': 1,
            'PrjTypKy': 1,
            'PrjKy': prjky

        }),
        contentType: 'application/json; charset=utf-8',
        success: function (dataListforLoc) {
            FormGlblData.WipLocatn = (dataListforLoc[0].WIPLocKy);

        },
    });

}
