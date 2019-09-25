//function SaveUpdate() {

//    var PrjKy = $("#HdrSec1_CmbPrj_cd").data('kendoComboBox').value();
//    var LeadAdrKy = $("#HdrSec1_CmbLeadAdr_cd").data('kendoComboBox').value();
//    var CurAdrKy = $("#HdrSec1_CmbCurActByAdr_cd").data('kendoComboBox').value();
//    if (PrtyKy == null || PrjKy == undefined || PrjKy == "") PrtyKy == 1;
//    var PrtyKy = $("#HdrSec2_CmbPrty_cd").data('kendoComboBox').value();
//    if (AprStsKy == null || AprStsKy == "" || AprStsKy == undefined) AprStsKy == 1;
//    var AprStsKy = $('#HdrSec2_Cmb_AprStates_Val').data('kendoComboBox').value();

//    if (PrjKy == 1 || PrjKy == null || PrjKy == undefined || PrjKy == "") {
//        alert("Please Select Project!");
//        return;
//    }
//    var UnitKy = $("#HdrSec2_CmbUnit_Cd").data('kendoComboBox').value();
//    var Budjet = $('#Unit_NmricQty_Val').val();
//    var Task = $('#HdrSec2_NmricTask_Val').val();
//    var Des = $('#HdrSec2_InptDesc_Val').val();
//    var ReqDt = $('#HdrSec2_InptDueDat').val();
//    var PrcsSeq = FormGlblData.PrcsSeq;
//    var isAct = FormGlblData.isAct;

//    inserttogrid();
//}

//function inserttogrid() {

//    var grid = $("#Dlytodogrid").data("kendoGrid");
//    var dataSource1 = grid.dataSource;
//    var total = dataSource1.data().length;
//    var prjKy = $("#HdrSec1_CmbPrj_cd").data('kendoComboBox').value();
//    var Prj = $('#HdrSec1_CmbPrj_cd').data('kendoComboBox').text();
//    var Prjnm = $("#HdrSec1_CmbPrj_Nm").data('kendoComboBox').text();
//    var LedAdrKy = $("#HdrSec1_CmbLeadAdr_cd").data('kendoComboBox').value();
//    var LeadAdr = $('#HdrSec1_CmbLeadAdr_cd').data('kendoComboBox').text();
//    var LeadAdrNm = $('#HdrSec1_CmbLeadAdr_Nm').data('kendoComboBox').text();
//    var CurAdKy = $("#HdrSec1_CmbCurActByAdr_cd").data('kendoComboBox').value();
//    var CurAdr = $('#HdrSec1_CmbCurActByAdr_cd').data('kendoComboBox').text();
//    var CurAdrNm = $('#HdrSec1_CmbCurActByAdr_Nm').data('kendoComboBox').text();
//    var UnitKy = $("#HdrSec2_CmbUnit_Cd").data('kendoComboBox').value();
//    var Unit = $('#HdrSec2_CmbUnit_Cd').data('kendoComboBox').text();
//    var PrtyKy = $("#HdrSec2_CmbPrty_cd").data('kendoComboBox').value();
//    var Priority = $('#HdrSec2_CmbPrty_cd').data('kendoComboBox').text();
//    var PriorityNm = $('#HdrSec2_CmbPrty_Nm').data('kendoComboBox').text();
//    var Budjet = $('#Unit_NmricQty_Val').val();
//    var Task = $('#HdrSec2_NmricTask_Val').val();
//    var Des = $('#HdrSec2_InptDesc_Val').val();
//    var ReqDt = $('#HdrSec2_InptDueDat').val();
//    if (AprStsKy == null || AprStsKy == "" || AprStsKy == undefined) { AprStsKy = FormGlblData.AprStsKy; }
//    else { var AprStsKy = $('#HdrSec2_Cmb_AprStates_Val').data('kendoComboBox').value(); }
//    var AprSts = $('#HdrSec2_Cmb_AprStates_Val').data('kendoComboBox').text();
//    var isAct = 0;
//    if ($("#HdrSec2_Chkbox_Active_Val").is(":checked")) { isAct = 1; }

//    if (Editing_LiNo > 0) {

//        LiNo = Editing_LiNo;
//        var firstItemData = grid.dataSource.data();
//        var firstItem = firstItemData[LiNo - 1];//[count - LiNoForChange];
//        firstItem.set("LiNo", LiNo);
//        firstItem.set("PrjKy", prjKy);
//        firstItem.set("PrjID", Prj);
//        firstItem.set("PrjNm", Prjnm);
//        firstItem.set("LeadAdrKy", LedAdrKy);
//        firstItem.set("LeadAdrID", LeadAdr);
//        firstItem.set("LeadAdrNm", LeadAdrNm);
//        firstItem.set("CurAdrKy", CurAdKy);
//        firstItem.set("CurAdrID", CurAdr);
//        firstItem.set("CurAdrNm", CurAdrNm);
//        firstItem.set("UnitKy", UnitKy);
//        firstItem.set("TaskID", Task);
//        firstItem.set("TaskNm", Des);
//        firstItem.set("BudjetQty", Budjet);
//        firstItem.set("Unit", Unit);
//        firstItem.set("PrtyKy", PrtyKy);
//        firstItem.set("Priority", Priority);
//        firstItem.set("PriorityNm", PriorityNm);
//        firstItem.set("PrcsSeq", PrcsSeq);
//        firstItem.set("ReqDt", ReqDt);
//        //firstItem.set("AprSts", AprSts);
//        firstItem.set("AprStsKy", AprStsKy);
//        firstItem.set("AprSts", AprSts);
//        firstItem.set("isAct", isAct);
//        firstItem.Dirty = "Dirty";
//        Editing_LiNo = 0;
//    }
//    else
//        grid.dataSource.insert(
//           LiNo = total + 1,
//            {
//                LiNo: LiNo,
//                PrjKy: prjKy,
//                PrjID: Prj,
//                PrjNm: Prjnm,
//                LeadAdrKy: LedAdrKy,
//                LeadAdrID: LeadAdr,
//                LeadAdrNm: LeadAdrNm,
//                CurAdrKy: CurAdKy,
//                CurAdrID: CurAdr,
//                CurAdrNm: CurAdrNm,
//                UnitKy: UnitKy,
//                TaskID: Task,
//                TaskNm: Des,
//                BudjetQty: Budjet,
//                Unit: Unit,
//                PrtyKy: PrtyKy,
//                Priority: Priority,
//                PriorityNm: PriorityNm,
//                PrcsSeq: PrcsSeq,
//                ReqDt: ReqDt,
//                AprStsKy: AprStsKy,
//                AprSts: AprSts,
//                isAct: isAct,
//            });
//    Save();
//}