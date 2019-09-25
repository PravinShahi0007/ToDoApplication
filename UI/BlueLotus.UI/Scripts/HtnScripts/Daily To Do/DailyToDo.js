var todayDate = new Date();
var dd = todayDate.getDate();
var mm = todayDate.getMonth() + 1;

var yyyy = todayDate.getFullYear();
if (dd < 10) {
    dd = '0' + dd
}
if (mm < 10) {
    mm = '0' + mm
}
var todayDate = dd + '/' + mm + '/' + yyyy;

var PrjKy = 1;
var LeadAdrKy = 1;
var CurAdrKy = 1;
var PrcsDetKy = 1;
var PrcsStpKy = 1;
var PrtyKy = 1;
var Editing_LiNo = 0;
var PrcsSeq = 1;
var StsKy = 1;
var PrcsObjKy = 1;


var globalVariable = {
    PrcsDetKy: 1,
    FinItmKy: 1,
    ItmKy: 1

}

var FormGlblData = {
    ObjKy: viewBag.ObjKy,
    FormObjData: null,
    AccessLvlKy: 1,
    ConfiLvlKy: 1,
    PrjTypKy: 1,
    isAct: 1,
    PrcsSeq: 1,
    AprStsKy: 1,
    FinItemKy: 1,
    PrKy: null,
    DetPrntKy: 1,
    DblClickedUID: null,
    RecKy: 1,
    TblNm: 'PrcsDet',
    TaskID: null,
    TrnTypKy: 1,
    IsCd06:true,
}


$(document).ready(function () {
    GetFormObjData();   
    $.ajax({
        url: urlCodes.GetCdKyByConCdAndOurCd,
        dataType: "json",
        type: "POST",
        data: JSON.stringify({
            ObjKy: viewBag.ObjKy,
            ConCd: 'OthTrnTyp',
            OurCd: 'todo'
        }),
        contentType: 'application/json; charset=utf-8',
        success: function (TrnTypKy) {

            FormGlblData.TrnTypKy = TrnTypKy;
            GetCdMasBy_CdKy(TrnTypKy);
        }
    });
    LoadGridFindView()
})
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
           // alert(CdMasModelData.isCd06)
            FormGlblData.IsCd06 = CdMasModelData.isCd06;
            GetFormObjData();
            
        }
    });
}



$(document.body)
    .keydown(function (e) {
        if (e.ctrlKey && e.keyCode == 70) {
            e.preventDefault();
            try {
                $("#FindFormHistory").data("kendoGrid").dataSource.filter(null);
                $("#FindFormHistory").data("kendoGrid").dataSource.data([]);
            } catch (e) {
                LoadGridFindView();
            }

            $("#FindHistory")
                .show()
                .kendoWindow({
                    width: "80%",
                    height: "75%",
                    modal: true,
                    title: "Task History"
                });

            $("#FindHistory").data("kendoWindow").center().open();           
        }
    });

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
            DocReadyCus();
        }
    });
}

//zxcdsds
function DocReadyCus() {
    
    setHdrSectionPropFun();
    LoadPrjCombo();
    LoadLeadAdrCombo();
    LoadCuractAdr();
    LoadResourceCombo();
    LoadItemCombo();
    LoadUnitCombo();
    LoadUnitComboPrcsDetCmpn();
    LoadPrtyCombo();
    Cancel();
    DatePickerLoad();
    LoadApproveCombo();
    //loadAutoCompleteGoToMenu();
    PrcsDetCat1();
    //setFocusDailyToDo();
    var todayDate = new Date();
    //$('#HdrSec2_InptDueDat').data("kendoDatePicker").value(todayDate);
    loadAutoCompleteGoToMenu($("#HdrSec2_AutoCompleteGoToMenu_Val").val(), 'ObjNm');
}
function DatePickerLoad() {
    $("#HdrSec2_DatStrtDat").kendoDatePicker({
        format: "dd/MM/yyyy"
        //min: new Date(31, 2, 2009),
    });

    $("#HdrSec2_InptDueDat").kendoDatePicker({
        format: "dd/MM/yyyy"
        //min: new Date(31, 2, 2009),
    });
}

function setHdrSectionPropFun() {
    // ---------- Set ObjProperties
    var dsfds = viewBag.ObjKy;
    setHdrSectionProp("", viewBag.ObjKy, "", "HdrSec1");
    setHdrSectionProp("", viewBag.ObjKy, "", "HdrSec2");
    SetHandlingEnterKeyEvent('', viewBag.ObjKy);  
}
//function GetCdMasBy_CdKy(CdKy) {
//    $.ajax({
//        url: urlCodes.GetCdMasBy_CdKy,
//        dataType: "json",
//        type: "POST",
//        data: JSON.stringify({
//            ObjKy: viewBag.ObjKy,
//            CdKy: CdKy
//        }),
//        contentType: "application/json; charset=utf-8",
//        success: function () {                      
//            Button_From_Dynamic("ButtonSec1");           
//        }
//    });
//}
function LoadGrid() {
    var TaskNm = $('#HdrSec2_InptDesc_Val').val();

    if (TaskNm.trim().length != 0) {
        return;
    }
    else {
        PrjKy = $("#HdrSec1_CmbPrj_Cd").data('kendoComboBox').value();
        if (PrjKy == null || PrjKy == undefined || PrjKy == "") PrjKy = 1;
        LeadAdrKy = $("#HdrSec1_CmbLeadAdr_Cd").data('kendoComboBox').value();
        if (LeadAdrKy == null || LeadAdrKy == undefined || LeadAdrKy == "") LeadAdrKy = 1;
        CurAdrKy = $("#HdrSec1_CmbCurActByAdr_Cd").data('kendoComboBox').value();
        if (CurAdrKy == null || CurAdrKy == undefined || CurAdrKy == "") CurAdrKy = 1;

        //PrtyKy
        PrtyKy = $("#HdrSec2_CmbPrty_Cd").data('kendoComboBox').value();
        if (PrtyKy == null || PrtyKy == undefined || PrtyKy == "") PrtyKy = 1;

        PrcsObjKy = $("#HdrSec2_AutoCompleteGoToMenu_Val").data('kendoComboBox').value();
        if (PrcsObjKy == null || PrcsObjKy == undefined || PrcsObjKy == "") PrcsObjKy = 1;

        AprStsKy = $("#HdrSec2_Cmb_AprStates_Val").data('kendoComboBox').value();
        if (AprStsKy == null || AprStsKy == undefined || AprStsKy == "") AprStsKy = 1;

        
        PrcsDetCat1Ky = $("#HdrSec2_CmbPrcsDetCat1_Cd").data('kendoComboBox').value();
        if (PrcsDetCat1Ky == null || PrcsDetCat1Ky == undefined || PrcsDetCat1Ky == "") PrcsDetCat1Ky = 1;

        LoadDlytodogrid(PrjKy, LeadAdrKy, CurAdrKy, PrtyKy, PrcsObjKy, AprStsKy, PrcsDetCat1Ky);
    }
    
}



function ComboValidations(cmbNm) {
    var cmb = $("#" + cmbNm + "").data("kendoComboBox");
    var val = cmb.value();
    if (isNaN(val)) {
        alert("'" + val + "' is not a Valid input");
        $("#" + cmbNm + "").data('kendoComboBox').value("");
    }
}

var id = ("#Dlytodogrid");
$(id).on("click", ".k-grid-evenselect", function (e) {

    //var id = ("#" + viewBag.OurCd);
    var grid = $(id).data("kendoGrid");
    var selectedItem = grid.dataItem($(this).closest("tr"));
    FormGlblData.RecKy = selectedItem.PrcsDetKy;

    AttachImage();

});



function clearLeaveFields() {
    //$('#HdrSec1_CmbPrj_Cd').data('kendoComboBox').value('');
    //$("#HdrSec1_CmbPrj_Nm").data('kendoComboBox').value('');
    $('#HdrSec1_CmbLeadAdr_Cd').data('kendoComboBox').value('');
    $('#HdrSec1_CmbLeadAdr_Nm').data('kendoComboBox').value('');
    $('#HdrSec1_CmbCurActByAdr_Cd').data('kendoComboBox').value('');
    $('#HdrSec1_CmbCurActByAdr_Nm').data('kendoComboBox').value('');
    //$('#HdrSec2_CmbTask_cd').data('kendoComboBox').value('');
    $('#HdrSec2_NmricTask_Val').val('');
    $('#Unit_NmricQty_Val').data("kendoNumericTextBox").value('');
    $('#HdrSec2_CmbUnit_Cd').data('kendoComboBox').value('');
    $('#HdrSec2_CmbPrty_Cd').data('kendoComboBox').value('');
    $('#HdrSec2_CmbPrty_Nm').data('kendoComboBox').value('');
    $('#HdrSec2_InptDesc_Val').val('');
    $('#ComntPnl').val('');
    //$('#HdrSec2_Sequence_Val').data("kendoNumericTextBox").value('');
    $('#HdrSec2_Cmb_AprStates_Val').data("kendoComboBox").value('');
    $('#HdrSec2_InptDueDat').data("kendoDatePicker").value('');
    $("#HdrSec2_AutoCompleteGoToMenu_Val").data('kendoComboBox').value('');   
    $("#HdrSec2_CmbPrcsDetCat1_Cd").data('kendoComboBox').value('');
    Editing_LiNo = 0;
}

function Cancel() {
    $("#HdrSec1_CmbPrj_Cd").data('kendoComboBox').value(1);
    $("#HdrSec1_CmbPrj_Cd").data('kendoComboBox').text("");
    $("#HdrSec1_CmbPrj_Nm").data('kendoComboBox').value(1);
    $("#HdrSec1_CmbPrj_Nm").data('kendoComboBox').text("");
    $("#HdrSec1_CmbLeadAdr_Cd").data('kendoComboBox').value(1);
    $("#HdrSec1_CmbLeadAdr_Cd").data('kendoComboBox').text("");
    $("#HdrSec1_CmbLeadAdr_Nm").data('kendoComboBox').value(1);
    $("#HdrSec1_CmbLeadAdr_Nm").data('kendoComboBox').text("");
    $("#HdrSec1_CmbCurActByAdr_Cd").data('kendoComboBox').value(1);
    $("#HdrSec1_CmbCurActByAdr_Cd").data('kendoComboBox').text("");
    $("#HdrSec1_CmbCurActByAdr_Nm").data('kendoComboBox').value(1);
    $("#HdrSec1_CmbCurActByAdr_Nm").data('kendoComboBox').text("");
    $("#HdrSec2_CmbUnit_Cd").data('kendoComboBox').value(1);
    $("#HdrSec2_CmbUnit_Cd").data('kendoComboBox').text("");
    $("#HdrSec2_CmbPrty_Cd").data('kendoComboBox').value(1);
    $("#HdrSec2_CmbPrty_Cd").data('kendoComboBox').text("");
    $("#HdrSec2_CmbPrty_Nm").data('kendoComboBox').value(1);
    $("#HdrSec2_CmbPrty_Nm").data('kendoComboBox').text("");
    $("#Unit_NmricQty_Val").data("kendoNumericTextBox").value("");
    //$("#HdrSec2_AutoCompleteGoToMenu_Val").data('kendoComboBox').value(1);
    //$("#HdrSec2_AutoCompleteGoToMenu_Val").data('kendoComboBox').text("");
    //$("#HdrSec2_Sequence_Val").data("kendoNumericTextBox").value("");
    $("#HdrSec2_NmricTask_Val").val("");
    $("#HdrSec2_InptDesc_Val").val("");
    $('#HdrSec2_InptDueDat').val("");
    $('#ComntPnl').val("");

    try {
        $('#Dlytodogrid').data().kendoGrid.destroy();
        $('#Dlytodogrid').empty();
    } catch (e) { }
}


function SaveUpdate() {
           
        var PrjKy = $("#HdrSec1_CmbPrj_Cd").data('kendoComboBox').value();
        var LeadAdrKy = $("#HdrSec1_CmbLeadAdr_Cd").data('kendoComboBox').value();
        var CurAdrKy = $("#HdrSec1_CmbCurActByAdr_Cd").data('kendoComboBox').value();

        if (PrtyKy == null || PrjKy == undefined || PrjKy == "") PrtyKy == 1;
        var PrtyKy = $("#HdrSec2_CmbPrty_Cd").data('kendoComboBox').value();

        if (AprStsKy == null || AprStsKy == "" || AprStsKy == undefined) AprStsKy = 1;
        var AprStsKy = $('#HdrSec2_Cmb_AprStates_Val').data('kendoComboBox').value();

        if (PrjKy == 1 || PrjKy == null || PrjKy == undefined || PrjKy == "") {
            alert("Please Select Project!");
            return;
        }
        var UnitKy = $("#HdrSec2_CmbUnit_Cd").data('kendoComboBox').value();
        var Budjet = $('#Unit_NmricQty_Val').val();
        var Task = $('#HdrSec2_NmricTask_Val').val();
       
        var TaskNm = $('#HdrSec2_InptDesc_Val').val();
        //if (TaskNm.trim().length == 0) {
        //   // alert("Task Name Empty");
        //    return;
    //}

        var PrcsDetCat1 = $('#HdrSec2_CmbPrcsDetCat1_Cd').data('kendoComboBox').value();
        if (PrcsDetCat1 == "" || PrcsDetCat1 == undefined)
        {
            PrcsDetCat1 = 1;
        }

        
        var ObjKy = $('#HdrSec2_AutoCompleteGoToMenu_Val').data('kendoComboBox').value();
        if (ObjKy == "" || ObjKy == undefined) {
            ObjKy = 1;
        }
   
        var Des = $('#ComntPnl').val();
        //var ReqDt = $('#HdrSec2_InptDueDat').val();
        var PrntKy = FormGlblData.DetPrntKy;
        var PrcsSeq = FormGlblData.PrcsSeq;
        var isAct = FormGlblData.isAct;
        var isPrnt = 0;
        //getTaskID();
}

function getTaskID() {
    var prjKy = $("#HdrSec1_CmbPrj_Cd").data('kendoComboBox').value();


    $.ajax({
        url: urlToDoPrcsDet_GetTaskID,
        data: JSON.stringify({

            PrjKy: prjKy,
            ObjKy: FormGlblData.ObjKy,
        }),
        success: function (data) {
            FormGlblData.TaskID = data;
            //inserttogrid();

            


        },
        contentType: 'application/json; charset=utf-8',
        dataType: "Json",
        type: "POST",
        error: function (e) {
            //alert()
            console.log("Something went wrong");
            return false;
        }
    });



}

function inserttogrid() {
    if (true) {

    }
    
    var grid = $("#Dlytodogrid").data("kendoGrid");
    var dataSource1 = grid.dataSource;
    var total = dataSource1.data().length;
    var prjKy = $("#HdrSec1_CmbPrj_Cd").data('kendoComboBox').value();
    var Prj = $('#HdrSec1_CmbPrj_Cd').data('kendoComboBox').text();
    var Prjnm = $("#HdrSec1_CmbPrj_Nm").data('kendoComboBox').text();
    
    var LedAdrKy = $("#HdrSec1_CmbLeadAdr_Cd").data('kendoComboBox').value();
    var LeadAdr = $('#HdrSec1_CmbLeadAdr_Cd').data('kendoComboBox').text();
    var LeadAdrNm = $('#HdrSec1_CmbLeadAdr_Nm').data('kendoComboBox').text();
    var CurAdKy = $("#HdrSec1_CmbCurActByAdr_Cd").data('kendoComboBox').value();
    var CurAdr = $('#HdrSec1_CmbCurActByAdr_Cd').data('kendoComboBox').text();
    var CurAdrNm = $('#HdrSec1_CmbCurActByAdr_Nm').data('kendoComboBox').text();
    var UnitKy = $("#HdrSec2_CmbUnit_Cd").data('kendoComboBox').value();
    var Unit = $('#HdrSec2_CmbUnit_Cd').data('kendoComboBox').text();

    var PrtyKy = $("#HdrSec2_CmbPrty_Cd").data('kendoComboBox').value();
    var Priority = $('#HdrSec2_CmbPrty_Cd').data('kendoComboBox').text();

    var PriorityNm = $('#HdrSec2_CmbPrty_Nm').data('kendoComboBox').text();
    var Budjet = $('#Unit_NmricQty_Val').val();
    var Task = $('#HdrSec2_NmricTask_Val').val();
    if (!FormGlblData.IsCd06) {
        if (Task == "" || Task == undefined || Task == null) {
            alert("Please Enter a Task ID ");
            return;
        }
    }
    
    //{ Task = FormGlblData.TaskID }

    
    
    var TaskNm = $('#HdrSec2_InptDesc_Val').val();
    var Des = $('#ComntPnl').val();
    var ReqDt = $('#HdrSec2_InptDueDat').val();
   
   
    var AprStsKy = $('#HdrSec2_Cmb_AprStates_Val').data('kendoComboBox').value();
    if (AprStsKy == "" || AprStsKy == undefined) {
        AprStsKy = 1;
    }
    var AprSts = $('#HdrSec2_Cmb_AprStates_Val').data('kendoComboBox').text();

    
    var PrcsDetCat1Ky = $('#HdrSec2_CmbPrcsDetCat1_Cd').data('kendoComboBox').value();
    if (PrcsDetCat1Ky == "" || PrcsDetCat1Ky == undefined) { PrcsDetCat1Ky = 1; }
    var PrcsObjKy = $('#HdrSec2_AutoCompleteGoToMenu_Val').data('kendoComboBox').value();
    if (PrcsObjKy == "" || PrcsObjKy == undefined) { PrcsObjKy = 1; }

    var isAct = 1;
    //var PrntKy = 1;
    var PrntKy = FormGlblData.DetPrntKy;
    var isPrnt = 0;
    //var PrcsDetKy = FormGlblData.PrcsDetKy;

    
    
    //if ($("#HdrSec2_Chkbox_Active_Val").is(":checked")) { isAct = 1; }

    if (Editing_LiNo > 0) {

        //LiNo = Editing_LiNo;
        //var firstItemData = grid.dataSource.data();
        //var firstItem = firstItemData[PrcsDetKy];//[count - LiNoForChange];
        var firstItem = grid.dataSource.getByUid(FormGlblData.DblClickedUID);

        firstItem.set("LiNo", Editing_LiNo);
        firstItem.set("PrjKy", prjKy);
        firstItem.set("PrjID", Prj);
        firstItem.set("PrjNm", Prjnm);
        firstItem.set("LeadAdrKy", LedAdrKy);
        firstItem.set("LeadAdrID", LeadAdr);
        firstItem.set("LeadAdrNm", LeadAdrNm);
        firstItem.set("CurAdrKy", CurAdKy);
        firstItem.set("CurAdrID", CurAdr);
        firstItem.set("CurAdrNm", CurAdrNm);
        firstItem.set("UnitKy", UnitKy);
        firstItem.set("TaskID", Task);
        firstItem.set("TaskNm", TaskNm);
        firstItem.set("Des", Des);
        firstItem.set("BudjetQty", Budjet);
        firstItem.set("Unit", Unit);
        firstItem.set("PrtyKy", PrtyKy);
        firstItem.set("Priority", Priority);
        firstItem.set("PriorityNm", PriorityNm);
        firstItem.set("PrcsSeq", PrcsSeq);
        firstItem.set("ReqDt", ReqDt);
        firstItem.set("AprStsKy", AprStsKy);
        //firstItem.set("AprSts", AprSts);
        firstItem.set("isAct", isAct);
        firstItem.set("PrntKy", PrntKy);
        firstItem.set("PrcsDetCat1Ky", PrcsDetCat1Ky);
        firstItem.set("PrcsObjKy", PrcsObjKy);
        firstItem.set("isPrnt", isPrnt);
        firstItem.Dirty = "Dirty";
        Editing_LiNo = 0;
    }
   
    else
        var newRow =  grid.dataSource.insert(
           LiNo = total + 1,
            {
                LiNo: LiNo,
                PrjKy: prjKy,
                PrjID: Prj,
                PrjNm: Prjnm,
                LeadAdrKy: LedAdrKy,
                LeadAdrID: LeadAdr,
                LeadAdrNm: LeadAdrNm,
                CurAdrKy: CurAdKy,
                CurAdrID: CurAdr,
                CurAdrNm: CurAdrNm,
                UnitKy: UnitKy,
                TaskID: Task,
                TaskNm: TaskNm,
                Des: Des,
                BudjetQty: Budjet,
                Unit: Unit,
                PrtyKy: PrtyKy,
                Priority: Priority,
                PriorityNm: PriorityNm,
                PrcsSeq: PrcsSeq,
                ReqDt: ReqDt,
                AprStsKy: AprStsKy,
                //AprSts: AprSts,
                isAct: isAct,
                PrntKy: PrntKy,
                PrcsDetCat1Ky: PrcsDetCat1Ky,
                PrcsObjKy: PrcsObjKy,
                isPrnt: isPrnt,
                
            });
    Save();


    //add color effect to newly added record
    //var grid = $("#Dlytodogrid").data("kendoGrid");
    //$(grid.tbody)
    //      .find("tr").removeClass("new-row") // Remove recent added tr's .new-row classes
    //      .filter('tr[data-uid="' + newRow.uid + '"]').addClass("new-row"); // Add class to the new row
}

function Save() {
    var GridDlytodo = $("#Dlytodogrid").data("kendoGrid");
    var dataSource = GridDlytodo.dataSource;
    //records on current view / page   
    var recordsOnCurrentView = dataSource.view().length;
    //total records
    var totalRecords = dataSource.total();
    var currentData = GridDlytodo.dataSource.data();
    var updatedRecords = [];
    var newRecords = [];

    for (var i = 0; i < currentData.length; i++) {
        if (currentData[i].isNew && !currentData[i].PrcsDetKy) {
            newRecords.push(currentData[i].toJSON());
        } else if (currentData[i].dirty && currentData[i].PrcsDetKy > 10) {
            updatedRecords.push(currentData[i].toJSON());
        }
    }

    var tempSAveChech = true;
    if (newRecords.length != 0 || updatedRecords.length != 0) {
        if (tempSAveChech) {

            $.ajax({
                url: urlToDoPrcsDet_InsertWeb,
                data: JSON.stringify({
                    DlyToDoupdate: kendo.stringify(updatedRecords),
                    DlyToDo: kendo.stringify(newRecords),
                    ObjKy: FormGlblData.ObjKy,
                    //PrcsDetKy: PrcsDetKy,
                }),
                contentType: 'application/json; charset=utf-8',
                dataType: "Json",
                type: "POST",
                success: function (data) {

                    if (data == true) {
                        //alert("Successfully Saved..!");
                        clearLeaveFields();
                        LoadDlytodogrid(); 
                    } else {
                        alert("Record Not Saved");
                        $('#Dlytodogrid').kendoGrid('destroy').empty();
                        LoadDlytodogrid(); // update grid
                        clearLeaveFields();
                        
                    }
                },
                error: function (e) {
                    alert("Record Not Saved");
                    LoadDlytodogrid();
                    clearLeaveFields();
                    return false;
                }
            });
        }
    }
}

/////////////////////// Enter Key Save Function /////////////////////
$(document).keypress(function (e) {
    
    var keycode = (e.keyCode ? e.keyCode : e.which);
    
    if (keycode == '13') {
        e.preventDefault();
        var TaskNm = $('#HdrSec2_InptDesc_Val').val()
        if (TaskNm.trim().length != 0) {
            //getTaskID();
            inserttogrid();
            //SaveUpdate();
            
        }
        else {
            SaveUpdatePrcsDetCmpn();
        }
        }
});
///////////////////////////End of Enter Key Save Function ///////////////////////


$(document).keydown(function (e) {
    var keycode = (e.keyCode ? e.keyCode : e.which);
    if (keycode == '46') {
        var index = $("#PrcsSchDetCmpnGrid").data("kendoGrid").select().index();
        if (index != null || index < 0) {
            return
        }
        
        
        var answer = confirm("Are you sure you want to delete from the database?");
        if (answer) {
            var grid = $("#Dlytodogrid").data("kendoGrid");
            var selectedItems = grid.dataItem(grid.select());
            selectedItems.set("IsAct", 0);
            SaveWhenDelete();
            grid.dataSource.remove(selectedItems);
            grid.dataSource.remove(0);// 0 is row index
            //ReIndexLino();
            //SaveUpdate();
            
        }
    }
});
//$("#Dlytodogrid").on("keydown", function (event) {
//    var keycode = (e.keyCode ? e.keyCode : e.which);
//    if (keycode == '46') {



//        var answer = confirm("Are you sure you want to delete from the database?");
//        if (answer) {
//            var grid = $("#Dlytodogrid").data("kendoGrid");
//            var selectedItems = grid.dataItem(grid.select());
//            selectedItems.set("IsAct", 0);
//            SaveWhenDelete();
//            grid.dataSource.remove(selectedItems);
//            grid.dataSource.remove(0);// 0 is row index
//            //ReIndexLino();
//            //SaveUpdate();

//        }
//    }
//});







//row delete saveupdate function
function SaveWhenDelete() {//apply when press delete key
    var GridDlytodo = $("#Dlytodogrid").data("kendoGrid");
    var dataSource = GridDlytodo.dataSource;
    //records on current view / page   
    var recordsOnCurrentView = dataSource.view().length;
    //total records
    var totalRecords = dataSource.total();
    var currentData = GridDlytodo.dataSource.data();
    var updatedRecords = [];
    var newRecords = [];

    for (var i = 0; i < currentData.length; i++) {
        if (currentData[i].isNew && !currentData[i].PrcsDetKy) {
            newRecords.push(currentData[i].toJSON());
        } else if (currentData[i].dirty && currentData[i].PrcsDetKy > 10) {
            updatedRecords.push(currentData[i].toJSON());
        }
    }

    var tempSAveChech = true;
    if (newRecords.length != 0 || updatedRecords.length != 0) {
        if (tempSAveChech) {

            $.ajax({
                url: urlToDoPrcsDet_InsertWeb,
                data: JSON.stringify({
                    DlyToDoupdate: kendo.stringify(updatedRecords),
                    DlyToDo: kendo.stringify(newRecords),
                    ObjKy: FormGlblData.ObjKy,
                    //PrcsDetKy: PrcsDetKy,
                }),
                success: function (e) {

                   
                },
                contentType: 'application/json; charset=utf-8',
                dataType: "Json",
                type: "POST",
                error: function (e) {
                    alert("Record Not Saved");
                    //LoadDlytodogrid();
                    //clearLeaveFields();
                    return false;
                }
            });
        }
    }
}


$("#btnIndent").on("click", function () {
    
    var grid = $("#Dlytodogrid").data("kendoGrid");
    var selectedItems = grid.dataItem(grid.select());

    var selectedIndex = grid.select().index();
    var PrevRowIdx = selectedIndex - 1;
    //Getting grid items
    var items = grid.dataSource.data();
    
    if (PrevRowIdx >= 0) {
        var parent = items[PrevRowIdx];
        FormGlblData.DetPrntKy = parent.PrcsDetKy;
        selectedItems.set("PrntKy", FormGlblData.DetPrntKy);
        selectedItems.set("isPrnt", 1);
        SaveUpdate();
        

    }
    else {
        alert("You Have Selected the  First Row");
    }
});

$("#btnOutdent").on("click", function () {

    var grid = $("#ChildGrid").data("kendoGrid");
    var selectedItems = grid.dataItem(grid.select());
    var items = grid.dataSource.data();
        selectedItems.set("PrntKy", 1);
        SaveUpdate();
        ReIndexLino();
        //SaveUpdate();
  
   

});
///////////////// End Of Indent OutDent Function //////////////////////////////

//insert child record
$("#after").on("click", function () {

    var prjKy = $("#HdrSec1_CmbPrj_Cd").data('kendoComboBox').value();
    var Prj = $('#HdrSec1_CmbPrj_Cd').data('kendoComboBox').text();
    var Prjnm = $("#HdrSec1_CmbPrj_Nm").data('kendoComboBox').text();
    var LedAdrKy = $("#HdrSec1_CmbLeadAdr_Cd").data('kendoComboBox').value();
    var LeadAdr = $('#HdrSec1_CmbLeadAdr_Cd').data('kendoComboBox').text();
    var LeadAdrNm = $('#HdrSec1_CmbLeadAdr_Nm').data('kendoComboBox').text();
    var CurAdKy = $("#HdrSec1_CmbCurActByAdr_Cd").data('kendoComboBox').value();
    var CurAdr = $('#HdrSec1_CmbCurActByAdr_Cd').data('kendoComboBox').text();
    var CurAdrNm = $('#HdrSec1_CmbCurActByAdr_Nm').data('kendoComboBox').text();
    var UnitKy = $("#HdrSec2_CmbUnit_Cd").data('kendoComboBox').value();
    var Unit = $('#HdrSec2_CmbUnit_Cd').data('kendoComboBox').text();
    var PrtyKy = $("#HdrSec2_CmbPrty_Cd").data('kendoComboBox').value();
    var Priority = $('#HdrSec2_CmbPrty_Cd').data('kendoComboBox').text();
    var PriorityNm = $('#HdrSec2_CmbPrty_Nm').data('kendoComboBox').text();
    var Budjet = $('#Unit_NmricQty_Val').val();
    var Task = $('#HdrSec2_NmricTask_Val').val();
    var TaskNm = $('#HdrSec2_InptDesc_Val').val();
    var Des = $('#ComntPnl').val();
    var ReqDt = $('#HdrSec2_InptDueDat').val();
  
    var AprStsKy = $('#HdrSec2_Cmb_AprStates_Val').data('kendoComboBox').value();
    if (AprStsKy == "" || AprStsKy == undefined) { AprStsKy = 1; }

    var PrcsDetCat1Ky = $('#HdrSec2_CmbPrcsDetCat1_Cd').data('kendoComboBox').value();
    if (PrcsDetCat1Ky == "" || PrcsDetCat1Ky == undefined) { PrcsDetCat1Ky = 1; }
    var PrcsObjKy = $('#HdrSec2_AutoCompleteGoToMenu_Val').data('kendoComboBox').value();
    if (PrcsObjKy == "" || PrcsObjKy == undefined) { PrcsObjKy = 1; }
    var isAct = 1;
    var PrntKy = 1;
    var isPrnt = 1;

    

    var grid = $("#Dlytodogrid").data("kendoGrid");
    // Get selected item
    var sel = grid.select();
    var sel_idx = sel.index();
    // Get the item
    var item = grid.dataItem(sel);
    // Get the index in the DataSource (not in current page of the grid)
    var idx = grid.dataSource.indexOf(item);
    
    grid.dataSource.insert(idx + 1, {

        LiNo: idx + 1,
        PrjKy: prjKy,
        PrjID: Prj,
        PrjNm: Prjnm,
        LeadAdrKy: LedAdrKy,
        LeadAdrID: LeadAdr,
        LeadAdrNm: LeadAdrNm,
        CurAdrKy: CurAdKy,
        CurAdrID: CurAdr,
        CurAdrNm: CurAdrNm,
        UnitKy: UnitKy,
        TaskID: Task,
        TaskNm: TaskNm,
        Des: Des,
        BudjetQty: Budjet,
        Unit: Unit,
        PrtyKy: PrtyKy,
        Priority: Priority,
        PriorityNm: PriorityNm,
        PrcsSeq: PrcsSeq,
        ReqDt: ReqDt,
        AprStsKy: AprStsKy,
        //AprSts: AprSts,
        isAct: isAct,
        PrntKy: PrntKy,
        PrcsDetCat1Ky: PrcsDetCat1Ky,
        PrcsObjKy: PrcsObjKy,
        isPrnt: isPrnt,
    });
    //grid.editRow($("#grid tr:eq(" + (sel_idx + 2) + ")"));

    ReIndexLino();
    Save();
});

$("#exportExl").click(function (e) {
    var grid = $("#Dlytodogrid").data("kendoGrid");
    grid.saveAsExcel();
});



////////////////////////
//FInd Grid


function LoadGridFindView() {

    var dataSource = new kendo.data.DataSource({
        batch: true,
        pageSize: 10,
        schema: {
            model: {
                id: "TrnKy",
                fields: //Relavent fields of the grid should be bind with following model items
                {
                    IndexOrder: { editable: false, nullable: false, type: "number" },
                    ProjectName: { editable: true, nullable: false, type: "string" },
                    LeadAdress: { editable: true, nullable: false, type: "string" },
                    CurrentAddress: { editable: true, nullable: false, type: "string" },
                    Object: { editable: true, nullable: false, type: "date" },
                    Priority: { editable: true, nullable: false, type: "string" },
                    Status: { editable: true, nullable: true, type: "string" },
                    Type: { editable: true, nullable: true, type: "string" },
                    Task: { editable: true, nullable: false, type: "string" },
                    TaskNm: { editable: true, nullable: false, type: "string" },
                    Description: { editable: true, nullable: false, type: "string" },
                    ReqDate: { editable: true, nullable: false, type: "string" },
                    Qauntity: { editable: true, nullable: false, type: "string" },
                    Unit: { editable: true, nullable: false, type: "string" },
                    UpadatedUser: { editable: true, nullable: false, type: "string" },
                    UpadatedTime: { editable: true, nullable: false, type: "string" },
                }
            }
        }
    });

    $("#FindFormHistory").kendoGrid({
        dataSource: dataSource,
        autobind: true,
        navigatable: true,
        filterable: {
            mode: "row"
        },
        pageable: true,
        sortable: true,
        reorderable: true,
        columnMenu: true,
        selectable: "column",
        pageable: { refresh: true, pageSizes: [5, 10, 20, 50, 100] },
        columns: [
            {
                field: "IndexOrder", title: "IndexOrder", width: "50px",
            },
         {
                field: "Task", title: "Task", width: "100px",
            },

            {
                field: "TaskNm", title: "TaskNm", width: "250px",
            },
            {
                field: "Description", title: "Description", width: "100px",
            },
            {
                field: "ProjectName", title: "ProjectName", width: "100px", hidden: true,
            },
            {
                field: "LeadAdress", title: "LeadAdress", width: "50px",

            },
            {
                field: "CurrentAddress",
                title: "CurrentAddress",
                width: "100px",
            },



            {
                field: "Object", title: "Object", width: "100px",

            },
            {
                field: "Priority", title: "Priority", width: "100px",
            },

            {
                field: "Status", title: "Status", width: "100px",
            },
            {
                field: "Type", title: "Type", width: "100px",
            },           
            {
                field: "ReqDate", title: "ReqDate", width: "100px",
            },
            {
                field: "Qauntity", title: "Qauntity", width: "100px",
            },
            {
                field: "Unit", title: "Unit", width: "100px",
            },
            {
                field: "UpadatedUser", title: "Upadated User", width: "100px",
            },
            {
                field: "UpadatedTime", title: "Upadated Time", width: "100px",
            },
        
        ],

        resizable: true,

        dataBinding: function () {
            record = (this.dataSource.page() - 1) * this.dataSource.pageSize();
        },


        editable: false,
    });
}


function HindHistoryGrid() {
    var taskId = $('#HdrSec16_Inpt_FF_TaskId_Val').val();
    if (taskId == null) {
        alert("Please Insert a TaskId");
        return;
    }

    $.ajax({
        url: GetHistoryTaskInfo,
        data: JSON.stringify({
            taskId: taskId,
        }),
        contentType: 'application/json; charset=utf-8',
        dataType: "Json",
        type: "POST",
        success: function (data) {
            var ds = new kendo.data.DataSource({
                data: data
            });

            $("#FindFormHistory").data("kendoGrid").setDataSource(ds);
        },
        error: function (e) {
            return false;
        }
    });
}









