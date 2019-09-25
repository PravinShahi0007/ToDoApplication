$("#HdrSec1_InptDesc_Val").keypress(function (event) {

    var keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode == "13") {
        //  addNewRowToGrid();

        if (FormGlblData.itmTrnKy > 1) {
            //updateProject();
        }
        else {
            Save();
        }


    }

})

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

function StartSavingFunction(Date, AdrKy, PrjKy, Tsk, AccKy, Des, UniKy, Qty, OrdKySelect, OrdTypKySelect, OrdNoSelect, strKy, Resky,CumCost, CumPur,CostAm,DocNo) {
    var TskLockKy = $("#HdrSec1_CmbTaskLoc_Cd").data("kendoComboBox").value();
    if (TskLockKy == null || TskLockKy == "") {
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
                        + "\"TrnQty\" : " + Qty + ","
                        + "\"TaskQty\" : " + CumCost + ","
                        + "\"TaskQtyPer\" : " + CumPur + ","
                        + "\"Amt1\" : " + CostAm + ","
                        + "\"Cd1Ky\" : " + strKy + ","
                        + "\"Cd2Ky\" : " + Resky + ","
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
                            + "\"TrnQty\" : " + Qty + ","
                            + "\"TaskQty\" : " + CumCost + ","
                            + "\"TaskQtyPer\" : " + CumPur + ","
                            + "\"Amt1\" : " + CostAm + ","
                            + "\"Cd1Ky\" : " + strKy + ","
                            + "\"Cd2Ky\" : " + Resky + ","
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
                            + "\"TrnQty\" : " + Qty + ","
                            + "\"TaskQty\" : " + CumCost + ","
                            + "\"TaskQtyPer\" : " + CumPur + ","
                            + "\"Amt1\" : " + CostAm + ","
                            + "\"Cd1Ky\" : " + strKy + ","
                            + "\"Cd2Ky\" : " + Resky + ","
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
                var TrnDt = data[0].TrnDt;
                $('#HdrSec1_DatPicDate_Val').val(TrnDt);

                try {
                    $("#HdrSec1_Adrky_Cd").data("kendoComboBox").value(data[0].RepAdrKy);
                    

                } catch (e) {

                }
                
            }
            GetGridDetailFrmFindResourceUsage(FormGlblData.TrnTypKy, FormGlblData.TrnKy);

        },
        error: function (e) {
            return false;
        }
    });

}

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

            for (i = 0; i < data.length; i++) {
                $("#DailyProgress").data("kendoGrid").dataSource.add({
                    LiNo: data[i].LiNo,
                    ItmTrnKy: data[i].ItmTrnKy,
                    PrjKy: 1,
                    ResLeadKy: data[i].RepAdrKy,
                    ResLeadID: data[i].RepAdrKy,
                    SubconAdrKy: data[i].AdrKy,
                    SubconAccCd: data[i].AdrId,
                    TaskKy: data[i].PrcsDetKy,
                    TaskID: data[i].PrcsID,
                    TaskUnitKy: data[i].UnitKy,
                    TaskUnit: data[i].Unit,
                    TaskQty: data[i].TrnQty,
                    Description: data[i].Des,
                    TskLockKy: data[i].TskLockKy,
                    TskLockCd: data[i].TskLockCd,
                    CumCost: data[i].TaskQty,
                    CumPct: data[i].TaskQtyPer,
                    CostAmt: data[i].Amt1,
                    StatusKy: data[i].Cd1Ky,
                    ReasonKy: data[i].Cd2Ky

                });

            }

            //try { $('#FindFormGRN').data('kendoWindow').close(); }
            //catch (e) { }

        },
        error: function (e) {
            return false;
        }
    });

}

function ClearAll() {

    FormGlblData.TrnKy = 1;
    FormGlblData.TrnNo = "";
    FormGlblData.TmStmp = "";

    $("#HdrSec1_CmbTrnno_Val").val(null);
    $('#HdrSec1_InptDesc_Val').val('');
    $("#HdrSec1_Adrky_Cd").data("kendoComboBox").value("");    
    $("#HdrSec1_CmbProject_Cd").data("kendoComboBox").value("");
    $("#HdrSec1_CmbTask_Cd").data("kendoComboBox").value("");
    $("#HdrSec1_CmbStatus_Cd").data("kendoComboBox").value("");
    $("#HdrSec1_CmbReason_Cd").data("kendoComboBox").value("");
    try {
        $("#HdrSec1_CmbSubCon_Cd").data("kendoComboBox").value("");
    } catch (e) {

    }
    $("#DailyProgress").data("kendoGrid").dataSource.data([]);
    $("#HdrSec1_CmbUnit_Val").html("");
    $("#HdrSec1_NmricQty_Val").val("");
    FormGlblData.Detail_Editing_LiNo = 0;
    FormGlblData.TrnKy = 1;
    $("#HdrSec1_CmbTaskLoc_Cd").data("kendoComboBox").value("");
    $("#HdrSec1_InpCumCost_Val").val("");
    $("#HdrSec1_InpCumPct_Val").val("");
    $("#HdrSec1_InpCostAm_Val").val("");
    $("#HdrSec1_InpDocNo_Val").val("");
}

function ClearDetail() {

    $("#HdrSec1_CmbSubCon_Cd").data("kendoComboBox").value("");
    $("#HdrSec1_CmbTask_Cd").data("kendoComboBox").value("");
    $("#HdrSec1_CmbUnit_Val").html("");
    $("#HdrSec1_NmricQty_Val").val("");
    $('#HdrSec1_InptDesc_Val').val('');
    $("#HdrSec1_InpDocNo_Val").val("");
    $("#HdrSec1_CmbTaskLoc_Cd").data("kendoComboBox").value("");
    $("#HdrSec1_CmbTaskLoc_Nm").data('kendoComboBox').text("");
    $("#HdrSec1_CmbStatus_Cd").data("kendoComboBox").value("");
    $("#HdrSec1_CmbReason_Cd").data("kendoComboBox").value("");
    $("#HdrSec1_InpCumCost_Val").val("");
    $("#HdrSec1_InpCumPct_Val").val("");
    $("#HdrSec1_InpCostAm_Val").val("");
    $("#HdrSec1_InpDocNo_Val").val("");
}


$(document.body).keydown(function (e) {
    if (e.ctrlKey && e.keyCode == 70) {
        e.preventDefault();
        LoadAfterOneMinuteFindInvoice();
        FindGridDefaultColumns();

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

//function LoadDailyProgress() {

//    var grid = $('#FindFormGridGRN').data().kendoGrid;
//    var selectedItem = grid.dataItem(grid.select());
//    FormGlblData.selectedIndex = grid.select().index();
//    var DataSource = $('#FindFormGridGRN').data('kendoGrid').dataSource.data();

//    //void 0 != $("#FindFormGridGRN").data("kendoPager").dataSource.data([]);
//    //var destinationgrid = $('#pager').data('kendoPager'); // DESTINATION Pager
//    //for (var i = 0; i < DataSource.length; i++) {
//    //    destinationgrid.dataSource.add(DataSource[i]);
//    //}
//    //destinationgrid.dataSource.page(FormGlblData.selectedIndex + 1);
//    //destinationgrid.refresh();
//    if (selectedItem != null) {
//        var TrnKy = selectedItem.TrnKy;
//        if (TrnKy != "" || TrnKy != undefined || TrnKy != null) {
//            FormGlblData.ISNeworUpdateTranction = 0;
//            GetHdrDetailDailyProgressFind(TrnKy);
//        } else {
//            alert("please Select Any Resources");
//        }
//    } else {
//        alert("please Select Any Resources");
//    }
//}
