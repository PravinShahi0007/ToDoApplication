//objMsa function
var FormGlblData = {
    FormObjData: null,
    TrnTypKy: 1,
    PrjTypKy: 1,
    AccessLvlKy: 1,
    ConfiLvlKy: 1,
    TrnKy: 1,
    AllDefalutValueObj: null,
};

LoadGloabData();
LoadGrid();

//global variable
var prjky;
var PrcsDetKy;
//var AdrKy;
var TrnKy;
var arrayIndex;
var SelectArryIndex;
var todayDate = new Date();

//data picker code
$("#HdrSec1_DatPicDate_Val").kendoDatePicker({
    format: "dd/MM/yyyy",
    min: new Date(31, 2, 2009)

});
$('#HdrSec1_DatPicDate_Val').data("kendoDatePicker").value(todayDate);
//$("#HdrSec2_InpQty").kendoTimePicker({
    
//    format: "HH:mm"
//});

//Start the ObjMas
function LoadGloabData() {
    GetFormObjData();
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
            //FormGlblData.AllDefalutValueObj = Get_AllDefalutValue_Obj();
            //FormGlblData.AllValidationObj = Get_All_Validation_Obj();
            //FormGlblData.AllValidationObj = sortByKey(FormGlblData.AllValidationObj, "ValidationOrder");
            CusDocRedy();
        }
    });

}

function setHdrSectionPropFun() {

    // ---------- Set ObjProperties
    setHdrSectionProp("", viewBag.ObjKy, "", "HdrSec1");
    setHdrSectionProp("", viewBag.ObjKy, "", "HdrSec10");
    SetHandlingEnterKeyEvent("", viewBag.ObjKy);
    SetFirstFocusObj();
}

//Combo Load FUnction global start
function CusDocRedy() {
    Button_From_Dynamic("ButtonSec1");
    Button_From_Dynamic("ButtonSec2");
    //LoadGrid(); 
    LoadResCombo();
    LoadRecNmCombo();
    PrjComLoad();
    Loadtask();
}




function HdrDataNotNull() {

    var Date = $('#HdrSec1_DatPicDate_Val').val();//$("#HdrSec1_DatPicDate_Val").data("kendoDatePicker").value();
    var DocNo = $("#HdrSec1_InpDocNo_Val").val();
    var AdrKy = $("#HdrSec1_ComRes_Cd").data("kendoComboBox").value();
    var AdrNm = $("#HdrSec1_ComRes_Nm").data("kendoComboBox").text();
    if (Date.length == 0 && DocNo.length == 0 && AdrKy.length == 0 && AdrNm.length == 0 || Date.length == 0 || DocNo.length == 0 || AdrKy.length == 0 || AdrNm.length == 0) {

        return false;
    }
    else {
        return true;
    }
}

function DetPart() {
    var PrjKy = $("#HdrSec2_ComPro_Cd").data("kendoComboBox").value();
    var PrjId = $("#HdrSec2_ComPro_Cd").data("kendoComboBox").text();
    var PrjNm = $("#HdrSec2_ComPro_Nm").data("kendoComboBox").text();
    var PrcsDetKy = $("#HdrSec2_ComTsk_Cd").data("kendoComboBox").value();
    var TaskID = $("#HdrSec2_ComTsk_Cd").data("kendoComboBox").text();
    var TaskNm = $("#HdrSec2_ComTsk_Nm").data("kendoComboBox").text();
    var qut = $("#HdrSec2_InpQty").val();

    if (PrjKy.length == 0 && PrcsDetKy.length == 0 && qut.length == 0 || PrjKy.length == 0 || PrcsDetKy.length == 0 || qut.length == 0 || PrjKy.length == 0 && PrcsDetKy.length || PrcsDetKy.length == 0 && qut.length || PrjKy.length == 0 && qut.length == 0) {

        return false;
    }
    else {
        return true;
    }
}

//Grid 
function LoadGrid() {

    $("#HdrSec2_Res_Gd").kendoGrid({

        columns: [
             {
                 title: "ItmTrnKy", field: "ItmTrnKy", hidden: true,
                 width: 50
             },
             {
                 title: "Date", field: "Date", hidden: true,
                   width: 50
             },
             {
                 title: "DocNo", field: "DocNo", hidden: true,
                 width: 50
             },
              {
                  title: "AdrKy", field: "AdrKy", hidden: true,
                  width: 100
              },

            {
                title: "PrjKy", field: "PrjKy", hidden: true,
                width: 50
            },
            {
                title: "LiNo", field: "LiNo",
                width: 50
            },
            {
                title: "Project Id", field: "PrjId",
                width: 150
            },
            {
                title: "Project Name", field: "PrjNm",
                width: 150
            },
           
            {
                title: "Adr id", field: "AdrId", hidden: true,
                width: 150
            },
            {
                title: "TskKy", field: "PrcsDetKy",hidden:true,
                width: 50
            },
            {
                title: "Task Code", field: "TaskID",
                width: 150
            },
            {
                title: "Task Name", field: "TaskNm",
                width: 150
            },
            {
                title: "Resource Qty", field: "TrnQty",
                width: 150
            },
            {
                title: "Task Qty", field: "TaskQty",
                width: 100, hidden: false,
            },
            {
                title: "isAct", field: "isAct", hidden: true,
                width: 50
            },




            { command: { text: "X", click: GridDeleteButtonIsClicked }, title: " ", width: "40px" }

        ],
        dataSource: {

        },
        pageSize: 20,
        pageable: true,
        resizable: true,
        height: "53vh",
        scrollable: true,
        columnMenu: true,
        filterable: {
            mode: "row"
        },
        pageable: { refresh: true, pageSizes: [5, 10, 20, 50, 100] },
        selectable: true, schema: {
            model: {
                id: "ItmTrnKy",
                fields: {
                    ItmTrnKy: { editable: true, nullable: true, type: "number" },
                    Date: { editable: true, nullable: true, type: "number" },
                    DocNo: { editable: true, nullable: true, type: "number" },
                    LiNo: { editable: false, nullable: false, type: "number" },
                    PrjKy: { editable: false, nullable: false, type: "number" },
                    PrjId: { editable: true, nullable: true, type: "number" },
                    PrjNm: { editable: true, nullable: true, type: "string" },
                    AdrKy: { editable: false, nullable: false, type: "number" },
                    AdrId: { editable: true, nullable: true, type: "number" },
                    PrcsDetKy: { editable: true, nullable: true, type: "number" },
                    TaskID: { editable: true, nullable: true, type: "number" },
                    TaskNm: { editable: true, nullable: false, type: "string" },
                    TaskQty: { editable: true, nullable: false, type: "number" },
                    isAct: { editable: true, nullable: false, type: "number" },

                }
            }
        }

    });

    //Grid Duble Click get the data from row
    $("#HdrSec2_Res_Gd").dblclick(function () {
        var gritrow = $("#HdrSec2_Res_Gd").data("kendoGrid");
        var selectedItem = gritrow.dataItem(gritrow.select());
        prjky = selectedItem.PrjKy;
        PrcsDetKy = selectedItem.PrcsDetKy;
        $('#HdrSec2_ComPro_Cd').data("kendoComboBox").value(prjky);
        $("#HdrSec2_ComPro_Nm").data("kendoComboBox").value(prjky);
        $('#HdrSec2_ComTsk_Nm').data("kendoComboBox").value(PrcsDetKy);
        $('#HdrSec2_ComTsk_Cd').data("kendoComboBox").value(PrcsDetKy);
        $("#HdrSec2_InpResQty_Val").val(selectedItem.TrnQty);
        $("#HdrSec2_InpQty").val(selectedItem.TaskQty);
        var grid = $("#HdrSec2_Res_Gd").data("kendoGrid");
        var index = grid.dataSource.indexOf(selectedItem);
        arrayIndex = index;

        //$("#HdrSec2_ComPro_Cd").val(selectedItem.PrjId);
        //$("#HdrSec2_ComPro_Nm").val(selectedItem.PrjNm);

        //var date = $("#HdrSec1_DatPicDate_Val").data("kendoDatePicker").value();


    });
}



//Qut Enter Keypress Event 
$("#HdrSec2_InpQty").keypress(function (e) {
    if (e.keyCode == 13) {
        if (arrayIndex >= 0) {
            var Resultlist = ComData();
            if (Resultlist.PrjKy.length == 0 && Resultlist.PrcsDetKy.length == 0 && Resultlist.qut.length == 0 || Resultlist.PrjKy.length == 0 || Resultlist.PrcsDetKy.length == 0 || Resultlist.qut.length == 0 || Resultlist.PrjKy.length == 0 && Resultlist.PrcsDetKy.length || Resultlist.PrcsDetKy.length == 0 && Resultlist.qut.length || Resultlist.PrjKy.length == 0 && Resultlist.qut.length == 0) {
                alert("Please Select the prject Code And Name,TasK Code And Name and Qut");
                return;
            }

            var RowUpdate = $("#HdrSec2_Res_Gd").data().kendoGrid.dataSource.data()[arrayIndex];
            RowUpdate.set("PrjKy", Resultlist.PrjKy);
            RowUpdate.set("PrjId", Resultlist.PrjId);
            RowUpdate.set("PrjNm", Resultlist.PrjNm);
            RowUpdate.set("AdrKy", Resultlist.AdrKy);
            RowUpdate.set("AdrId", Resultlist.AdrId);
            RowUpdate.set("PrcsDetKy", Resultlist.PrcsDetKy);
            RowUpdate.set("TaskID", Resultlist.TaskID);
            RowUpdate.set("TaskNm", Resultlist.PrcsDetKy);
            RowUpdate.set("TrnQty", Resultlist.TrnQty);
            RowUpdate.set("TaskQty", Resultlist.qut);

            SelectArryIndex = arrayIndex;
            arrayIndex = -1;
            clearDetailPart();
        }
        else {

            getDetails();
        }



    }
});

$('body').keydown(function (e) {
    if (e.ctrlKey && e.keyCode == 70) {
        e.preventDefault();

        $("#FindFormGRN").show().kendoWindow({
            width: "1000px",
            height: "550px",
            modal: true,
            title: "Find"
        });
        $('#FindFormGRN').data('kendoWindow').center().open();
        LoadAfterOneMinuteFindInvoice();
        FindGridDefaultColumns();



    }
});
function ComData() {
    var Date = $('#HdrSec1_DatPicDate_Val').val();
    var DocNo = $("#HdrSec1_InpDoc_No").val();
    var PrjKy = $("#HdrSec2_ComPro_Cd").data("kendoComboBox").value();
    var PrjId = $("#HdrSec2_ComPro_Cd").data("kendoComboBox").text();
    var PrjNm = $("#HdrSec2_ComPro_Nm").data("kendoComboBox").text();
    var PrcsDetKy = $("#HdrSec2_ComTsk_Cd").data("kendoComboBox").value();
    var TaskID = $("#HdrSec2_ComTsk_Cd").data("kendoComboBox").text();
    var TaskNm = $("#HdrSec2_ComTsk_Nm").data("kendoComboBox").text();
    var qut = $("#HdrSec2_InpQty").val();
    var AdrKy = $("#HdrSec1_ComRes_Cd").data("kendoComboBox").value();
    var AdrId = $("#HdrSec1_ComRes_Cd").data("kendoComboBox").text();
    var TrnQty = $("#HdrSec2_InpResQty_Val").val();

    var Result = {
        Date: Date,
        DocNo:DocNo,
        PrjKy: PrjKy,
        PrjId: PrjId,
        PrjNm: PrjNm,
        PrcsDetKy: PrcsDetKy,
        TaskID: TaskID,
        TaskNm: TaskNm,
        qut: qut,
        AdrKy: AdrKy,
        AdrId: AdrId,
        TrnQty:TrnQty
    }

    return Result;
}


//Get althe data User Types or Selects
function getDetails() {
    var Resultlist = ComData();
    var PrjKy = Resultlist.PrjKy;

    var PrcsDetKy = Resultlist.PrcsDetKy;
    var qut = Resultlist.qut;


    if (Resultlist.PrjKy.length == 0 && Resultlist.PrcsDetKy.length == 0 && Resultlist.qut.length == 0 || Resultlist.PrjKy.length == 0 || Resultlist.PrcsDetKy.length == 0 || Resultlist.qut.length == 0 || PrjKy.length == 0 && PrcsDetKy.length || PrcsDetKy.length == 0 && qut.length || PrjKy.length == 0 && qut.length == 0) {
        alert("Please Select the prject Code And Name,TasK Code And Name and Qut");
        return;
    }

    InsertToGrid(Resultlist.DocNo, Resultlist.Date, PrjKy, Resultlist.PrjId, Resultlist.PrjNm, Resultlist.AdrKy, Resultlist.AdrId, PrcsDetKy, Resultlist.TaskID, Resultlist.TaskNm,Resultlist.TrnQty, qut, 1);
    $("#HdrSec2_InpQty").val("");
    $("#HdrSec2_ComPro_Cd").data("kendoComboBox").value("");
    $("#HdrSec2_ComPro_Nm").data("kendoComboBox").value("");
    $("#HdrSec2_ComTsk_Cd").data("kendoComboBox").value("");
    $("#HdrSec2_ComTsk_Nm").data("kendoComboBox").value("");
    $("#HdrSec2_InpResQty_Val").val("");

}

//insert the data into grid
function InsertToGrid(DocNo, Date,PrjKy, PrjId, PrjNm, AdrKy, AdrId, PrcsDetKy, TaskID, TaskNm,TrnQty, qut, isAct) {
    var grid = $("#HdrSec2_Res_Gd").data("kendoGrid");
    var dataSource1 = grid.dataSource;
    var total = dataSource1.data().length;

    grid.dataSource.insert(
        total,
        {
            DocNo: DocNo,
            Date:Date,
            PrjKy: PrjKy,
            PrjId: PrjId,
            PrjNm: PrjNm,
            AdrKy: AdrKy,
            AdrId: AdrId,
            PrcsDetKy: PrcsDetKy,
            TaskID: TaskID,
            TaskNm: TaskNm,
            TrnQty:TrnQty,
            TaskQty: qut,
            isAct: isAct
        }
    );


}
function GridDeleteButtonIsClicked(e) {
    e.preventDefault();
    var grid = $("#HdrSec2_Res_Gd").data("kendoGrid");
    var selectedItem = grid.dataItem($(this).closest("tr"));
    var dataItem = grid.dataItem($(e.currentTarget).closest("tr"));
    //alert(dataItem.ItmTrnKy)
    var Date = $('#HdrSec1_DatPicDate_Val').val();
    var prjky = $("#HdrSec2_ComPro_Cd").data("kendoComboBox").value();
    var AdrKy = $("#HdrSec1_ComRes_Cd").data("kendoComboBox").value();
    var answer = confirm("Are you sure you want to delete from the database?");
    dataItem.isAct = 0;
    if (answer) {
        
        if (!dataItem.ItmTrnKy)
        {
            grid.dataSource.remove(dataItem);
           
        }
        else {
            
            var NewRecord = [];
            var deletedRecords = [];
            var updatedRecords = [];
            updatedRecords.push(dataItem.toJSON());
            InsertGrid(
                1,
                AdrKy,
                Date,
                viewBag.OurCd,
                'ResUsgRes',
                NewRecord,
                updatedRecords,
                deletedRecords,
                true
            );
            ComClearFunction();
        }
       


    }
    

}

//save Button Click Event 
function ComSaveFunction() {

    var Date = $('#HdrSec1_DatPicDate_Val').val();
    var DocNo = $("#HdrSec1_InpDocNo_Val").val();
    var TmNo = $('#HdrSec1_InpTrnNo_Val').val();
    var AdrKy = $('#HdrSec1_ComRes_Cd').val();
    var hdrch = HdrDataNotNull();
    if (hdrch == false) {
        alert("Select The Header part");
        return;
    }
    else {
            var DataIngrid = $("#HdrSec2_Res_Gd").data("kendoGrid");
            var lengthOfData = DataIngrid.dataSource.data();
            if (lengthOfData.length == 0) {
                alert("Enter tha data into Grid");
                return;
            }
            else {
                if (TmNo.length == 0) {
                        $.ajax({
                            url: urlTransactionInsertDeatilHdrInvoice,
                            data: JSON.stringify({
                                ObjKy: viewBag.ObjKy,
                                ContraAccObjKy: 1,
                                AccObjKy: 1,
                                PrjKy: 1,
                                AdrKy: AdrKy,
                                FrmLocKy: 1,
                                BUKY: 1,
                                AccKy: 1,
                                Date: Date,
                                OurCd: viewBag.OurCd,
                                ConCd: 'ResUsgRes',
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
                                Des: "",
                                Rem: "",
                                RepAdrKy: 1,
                                OrdNoKy: 1
                            }),
                            contentType: 'application/json; charset=utf-8',
                            dataType: "Json",
                            type: "POST",
                            success: function (data) {
                                //alert("Successfully saved!");
                                if (data.TrnKy > 0) {

                                    FormGlblData.AccessLvlKy = data.AcsLvlKy;
                                    FormGlblData.ConfiLvlKy = data.ConFinLvlKy;
                                    FormGlblData.TrnKy = data.TrnKy;
                                    FormGlblData.TrnNo = data.PrefixTrnNo;
                                    FormGlblData.TmStmp = data.TmStmp;


                                    var grid = $("#HdrSec2_Res_Gd").data("kendoGrid");
                                    var currentData = grid.dataSource.data();
                                    var updatedRecords = [];
                                    var newRecords = [];
                                    var deletedRecords = [];

                                    for (var i = 0; i < currentData.length; i++) {
                                        if (!currentData[i].ItmTrnKy) {
                                            newRecords.push(currentData[i].toJSON());
                                        } else if (currentData[i].dirty) {
                                            updatedRecords.push(currentData[i].toJSON());
                                        }
                                    }
                                    InsertGrid(1, AdrKy, Date, viewBag.OurCd, 'ResUsgRes', newRecords, updatedRecords, deletedRecords, false)

                                }
                                else {
                                    alert("Insert faild from Hdr.")
                                }
                            },
                            error: function (e) {
                                return false;
                            }
                        });

                    

                }
                else {
                    
                    $.ajax({
                        url: urlTransactionUpdateDeatilHdrInvoice,
                        data: JSON.stringify({
                            ObjKy: viewBag.ObjKy,
                            AccessLvlKy: FormGlblData.AccessLvlKy,
                            ConfiLvlKy: FormGlblData.ConfiLvlKy,
                            ContraAccObjKy: 1,
                            AccObjKy: 1,
                            PrjKy: prjky,
                            AdrKy: AdrKy,
                            FrmLocKy: 1,
                            BUKY: 1,
                            AccKy: 1,
                            Date: Date,
                            OurCd: viewBag.OurCd,
                            ConCd: 'ResUsgRes',
                            DocNo: DocNo,
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

                            OrdKySelect: FormGlblData.TrnKy,
                            OrdTypKySelect: FormGlblData.TrnTypKy,
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
                            //alert(JSON.stringify(data))
                            if (data.TrnKy > 0) {

                                FormGlblData.AccessLvlKy = data.AcsLvlKy;
                                FormGlblData.ConfiLvlKy = data.ConFinLvlKy;
                                FormGlblData.TrnKy = data.TrnKy;

                                var grid = $("#HdrSec2_Res_Gd").data("kendoGrid");
                                var NewRecord = [];
                                var deletedRecords = [];
                                var updatedRecords = [];
                                var currentData = grid.dataSource.data();

                                for (var i = 0; i < currentData.length; i++) {
                                    if (!currentData[i].ItmTrnKy) {
                                        NewRecord.push(currentData[i].toJSON());
                                    } else {
                                        if (SelectArryIndex >= 0)
                                        {
                                            updatedRecords.push(currentData[SelectArryIndex].toJSON());
                                            SelectArryIndex = -1;
                                            i = currentData.length;
                                        }
                                        else {
                                            updatedRecords.push(currentData[i].toJSON());
                                        }
                                        
                                 
                                    }
                                }
                                
                                InsertGrid(
                                    prjky,
                                    AdrKy,
                                    Date,
                                    viewBag.OurCd,
                                    'ResUsgRes',
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


       
    }


}
function InsertGrid(PrjKy, AdrKy, Date, OurCd, ConCd, NewRecord, updatedRecords, deletedRecords, isUpdate) {
    var ordKydata = FormGlblData.TrnKy;
    $.ajax({
        url: urlTransactionInsertDetailGridInvoice,
        data: JSON.stringify({
            AccessLvlKy: FormGlblData.AccessLvlKy,
            updatedOrders: kendo.stringify(updatedRecords),
            deletedOrders: kendo.stringify(deletedRecords),
            newOrders: kendo.stringify(NewRecord),// ,
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
            alert("Successfully saved!");
            prjky = "";
            PrcsDetKy = "";
            AdrKy = "";

            
            if (FormGlblData.TrnKy > 10) {
                GetHdrDetailDailyProgressFind(FormGlblData.TrnKy)
            }

        },
        error: function (e) {
            alert("cant saved!");
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
        contentType: 'application/json;charset=utf-8',
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

                $("#HdrSec1_InpTrnNo_Val").val(data[0].TrnNo);
                $('#HdrSec1_InpTrnNo_Val').attr('readonly', 'readonly');
                $("#HdrSec1_InpDocNo_Val").val(data[0].DocNo);

                var TrnDt = data[0].TrnDt;
                $('#HdrSec1_DatPicDate_Val').val(TrnDt);

                try {
                    $("#HdrSec1_ComRes_Cd").data("kendoComboBox").value(data[0].AdrKy);
                    $("#HdrSec1_ComRes_Nm").data("kendoComboBox").value(data[0].AdrKy);

                } catch (e) {

                }
                GetGridDetailFrmFindResourceUsage(FormGlblData.TrnTypKy, FormGlblData.TrnKy);
            }
        },
        error: function (e) {
            return false;
        }
    });

}
//
//Grid Details
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
            
           
            clearDetailPart();
            $("#HdrSec2_Res_Gd").data('kendoGrid').dataSource.data([]);


            for (i = 0; i < data.length; i++) {
                $("#HdrSec2_Res_Gd").data("kendoGrid").dataSource.add({

                    ItmTrnKy: data[i].ItmTrnKy,
                    LiNo: data[i].LiNo,
                    PrjKy: data[i].PrjKy,
                    PrjId: data[i].PrjId,
                    PrjNm: data[i].PrjNm,
                    AdrKy: data[i].AdrKy,
                    AdrId: data[i].AdrId,
                    PrcsDetKy: data[i].PrcsDetKy,
                    TaskID: data[i].PrcsID,
                    TaskNm: data[i].PrcsNm,
                    TrnQty: data[i].TrnQty,
                    TaskQty:data[i].TaskQty,
                    isAct: data[i].isAct,


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


function ComClearFunction() {
    $("#HdrSec2_InpQty").val("");
    $("#HdrSec1_ComRes_Cd").data("kendoComboBox").value("");
    $("#HdrSec1_ComRes_Nm").data("kendoComboBox").value("");
    $("#HdrSec2_ComPro_Cd").data("kendoComboBox").value("");
    $("#HdrSec2_ComPro_Cd").data("kendoComboBox").value("");
    $("#HdrSec2_ComPro_Nm").data("kendoComboBox").value("");
    $("#HdrSec2_ComTsk_Cd").data("kendoComboBox").value("");
    $("#HdrSec2_ComTsk_Nm").data("kendoComboBox").value("");
    $('#HdrSec1_DatPicDate_Val').val("");
    $("#HdrSec1_InpDocNo_Val").val("");
    $("#HdrSec1_InpTrnNo_Val").val("");
    $("#HdrSec2_Res_Gd").data("kendoGrid").dataSource.data([]);
    prjky ="";
    PrcsDetKy ="";
    AdrKy ="";
    TrnKy ="";
    arrayIndex = -1;
    var todayDate = new Date();
    $('#HdrSec1_DatPicDate_Val').data("kendoDatePicker").value(todayDate);


}

function clearDetailPart() {
    $("#HdrSec2_InpQty").val("");
    $("#HdrSec2_InpResQty_Val").val("");
    $("#HdrSec2_ComPro_Cd").data("kendoComboBox").value("");
    $("#HdrSec2_ComPro_Nm").data("kendoComboBox").value("");
    $("#HdrSec2_ComTsk_Cd").data("kendoComboBox").value("");
    $("#HdrSec2_ComTsk_Nm").data("kendoComboBox").value("");
    $("#HdrSec2_CmbUnit_Cd").val("");
}

