var EmpKy = 0;
//global data variable
var prjky = "";
var taskky = "";
var NewRow = false;

var gridRowIndex = -1;
var gridSelectRowData = "";
var GridDeleteRowIndex = -1;



var FormGlblData = {
    FormObjData: null,
    TrnTypKy: 1,
    AccessLvlKy: 1,
    ConfiLvlKy: 1,
    PrjTypKy: 1,
    TrnKy: 1,
    AllDefalutValueObj: null,

}


$(document).ready(function () {
    GetFormObjData();

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

function DocReadyCus() {
    LoadCombo();
    LoadDatePicker();
    PrjComLoad();
    Loadtask();


}
function DetPartLoadDatepicker() {
    var todayDate = new Date();
    $("#HdrSec2_DatAtdDate_Val").kendoDatePicker({
        format: "dd/MM/yyyy",
    });
    $('#HdrSec2_DatAtdDate_Val').data("kendoDatePicker").value(todayDate);
}


function LoadDatePicker() {
    var todayDate = new Date();

    $("#HdrSec1_DteFrmDate_Val").kendoDatePicker({
        format: "dd/MM/yyyy",
    });
    $('#HdrSec1_DteFrmDate_Val').data("kendoDatePicker").value(todayDate);

    $("#HdrSec1_ToDate_Val").kendoDatePicker({
        format: "dd/MM/yyyy",
    });
    $('#HdrSec1_ToDate_Val').data("kendoDatePicker").value(todayDate);
    DetPartLoadDatepicker();

}


function LoadCombo() {


    $("#HdrSec1_CmbEmpNo_cd").kendoComboBox({

        dataValueField: "EmpKy",
        dataTextField: "EmpNo",

        dataSource: {
            type: "POST",
            transport: {

                read: urlEmpMas.Employee_LookUp_Web

            }
        },
        change: function (e) {
            var cmb = $("#HdrSec1_CmbEmpNo_cd").data("kendoComboBox");
            var EmpNo = cmb.value();


            if (EmpNo != "") {
                var validate = ComboValidations("HdrSec1_CmbEmpNo_cd");

                if (validate) {
                    $("#HdrSec1_CmbEmpNm_Nm").data("kendoComboBox").value(EmpNo);


                } else {
                    $("#HdrSec1_CmbEmpNm_Nm").data("kendoComboBox").value("");

                }
            }

        },
        filter: "contains",
        suggest: true,
        placeholder: "Select Employee EmpNo"
    })


    $("#HdrSec1_CmbEmpNm_Nm").kendoComboBox({

        dataValueField: "EmpKy",
        dataTextField: "EmpNm",

        dataSource: {
            type: "POST",
            transport: {

                read: urlEmpMas.Employee_LookUp_Web

            }
        },
        change: function (e) {
            var cmb = $("#HdrSec1_CmbEmpNm_Nm").data("kendoComboBox");
            var EmpNm = cmb.value();


            if (EmpNm != "") {

                var validate = ComboValidations("HdrSec1_CmbEmpNm_Nm");

                if (validate) {
                    $("#HdrSec1_CmbEmpNo_cd").data("kendoComboBox").value(EmpNm);


                } else {
                    $("#HdrSec1_CmbEmpNo_cd").data("kendoComboBox").value("");

                }
            }

        },
        filter: "contains",
        suggest: true,
        placeholder: "Select Employee Name"
    })



    function ComboValidations(cmbNm) {

        var cmb = $("#" + cmbNm + "").data("kendoComboBox");
        var val = cmb.value();

        if (isNaN(val)) {
            alert("'" + val + "' is not a Valid input");
            $("#" + cmbNm + "").data('kendoComboBox').value("");
            return false;
        } else {
            return true;
        }
    }


}


$("#HdrSec2_InpinTm").kendoMaskedTextBox({
    mask: "00:00",
    format: "#",

});
$("#HdrSec2_InpoutTm").kendoMaskedTextBox({
    mask: "00:00",
    format: "#",

});

//$("#HdrSec2_InpinTm").kendoNumericTextBox({
//    value: 8,
//    min: 1,
//    max: 24,
//    format: "#",
//    decimals: 0
//});

function PrjComLoad() {
    $("#HdrSec2_CmbPrjId_Cd").kendoComboBox({
        dataValueField: "PrjKy",
        dataTextField: "PrjId",
        dataSource: PrjId_SelectMob_DataSource("HdrSec2_CmbPrjId_Cd"),

        change: function (e) {
            var PrjKy = $("#HdrSec2_CmbPrjId_Cd").data("kendoComboBox").value();
            prjky = $("#HdrSec2_CmbPrjId_Cd").data("kendoComboBox").value();
            $("#HdrSec2_CmbPrj_Nm").data("kendoComboBox").value(PrjKy);
            $('#HdrSec2_CmbTskId_Cd').data("kendoComboBox").value("");
            $('#HdrSec2_CmbTsk_Nm').data("kendoComboBox").value("");
            $('#HdrSec2_CmbTskId_Cd').data("kendoComboBox").setDataSource(TaskDatasource_Cd('HdrSec2_ComTsk', PrjKy));
            $('#HdrSec2_CmbTskId_Cd').data("kendoComboBox").refresh();

            $('#HdrSec2_CmbTsk_Nm').data("kendoComboBox").setDataSource(TaskDatasource_Nm('HdrSec2_CmbTsk_Nm', PrjKy));
            $('#HdrSec2_CmbTsk_Nm').data("kendoComboBox").refresh();
        },
        filter: "contains",
        suggest: true,
        placeholder: "Select a the Project"
    });
    LoadPrjName();

}

//load PrjNm Combo
function LoadPrjName() {
    $("#HdrSec2_CmbPrj_Nm").kendoComboBox({
        dataValueField: "PrjKy",
        dataTextField: "PrjNm",
        dataSource: PrjNm_SelectMob_DataSource("HdrSec2_CmbPrj_Nm"),
        change: function (e) {
            var PrjKy = $("#HdrSec2_CmbPrj_Nm").data("kendoComboBox").value();
            $("#HdrSec2_CmbPrjId_Cd").data("kendoComboBox").value(PrjKy);
            $('#HdrSec2_CmbTskId_Cd').data("kendoComboBox").value("");
            $('#HdrSec2_CmbTsk_Nm').data("kendoComboBox").value("");
            $('#HdrSec2_CmbTskId_Cd').data("kendoComboBox").setDataSource(TaskDatasource_Cd('HdrSec2_ComTsk', PrjKy));
            $('#HdrSec2_CmbTskId_Cd').data("kendoComboBox").refresh();
            $('#HdrSec2_CmbTsk_Nm').data("kendoComboBox").setDataSource(TaskDatasource_Nm('HdrSec2_CmbTsk_Nm', PrjKy));
            $('#HdrSec2_CmbTsk_Nm').data("kendoComboBox").refresh();
        },
        filter: "contains",
        suggest: true,
        placeholder: "Select the Project Name"
    });
}

//load TaskID Combo
function Loadtask() {
    $("#HdrSec2_CmbTskId_Cd").kendoComboBox({
        dataValueField: "PrcsDetKy",
        dataTextField: "TaskID",
        change: function (e) {
            var taskKy = $("#HdrSec2_CmbTskId_Cd").data("kendoComboBox").value();
            //var taskid = $("#HdrSec2_CmbTskId_Cd").data("kendoComboBox").text();
            //taskky = $("#HdrSec2_CmbTskId_Cd").data("kendoComboBox").value(taskKy);
            $("#HdrSec2_CmbTsk_Nm").data("kendoComboBox").value(taskKy);
            gridtskAndPrjLoad();
        },
    });
    $("#HdrSec2_CmbTsk_Nm").kendoComboBox({
        dataValueField: "PrcsDetKy",
        dataTextField: "TaskNm",
    });
}

//javaScrip Function to get the Task id Data
function TaskDatasource_Cd(ObjNm, PreKy) {
    var ObjKy = GetObjKy(ObjNm);
    var dataSource = new kendo.data.DataSource(
        {
            transport: {
                read: {
                    url: urlComboLoad.TaskID_SelectMob,
                    data: {
                        PrjKy: PreKy,
                        ObjKy: ObjKy

                    },
                    dataType: "json"
                }
            }
        });
    return dataSource;
}

//javaScrip Function to get the Task name Data
function TaskDatasource_Nm(ObjNm, PreKy) {
    var ObjKy = GetObjKy(ObjNm);
    var dataSource = new kendo.data.DataSource(
        {
            transport: {
                read: {
                    url: urlComboLoad.TaskNm_SelectMob,
                    data: {
                        PrjKy: PreKy,
                        ObjKy: ObjKy
                    },
                    dataType: "json"
                }
            }
        });
    return dataSource;
}

function gridtskAndPrjLoad() {
    if (NewRow == true) {
        var RowUpdate = $("#MultiAtnGrid").data().kendoGrid.dataSource.data()[0];
        RowUpdate.set("PrjKy", prjky);
        RowUpdate.set("PrcsDetKy", taskky);

    }

}



function CancelGridItem() {

    clearDetailpart();
    $("#HdrSec1_CmbEmpNo_cd").data("kendoComboBox").value("");
    $("#HdrSec1_CmbEmpNm_Nm").data("kendoComboBox").value("");
    LoadDatePicker();
    $("#MultiAtnGrid").data("kendoGrid").dataSource.data([]);
    EnableHader();
    var grid = $("#MultiAtnGrid").data("kendoGrid");
    grid.cancelChanges();


}

function AddRow() {
    //var Resultlist = GetCormenData();
    //if (Resultlist != undefined) {
    //    var Atdate = Resultlist.AtdDate.split("/");
    //    var day = Atdate[0];
    //    var mon = Atdate[1];
    //    var year = Atdate[2];
    //    var newdate = year + "/" + mon + "/" + day;
    //    var isAct = 1;
    //    var EmpKy = $("#HdrSec1_CmbEmpNo_cd").data('kendoComboBox').value();
    //    InsertToGrid(EmpKy, Resultlist.In_time, Resultlist.Out_time, newdate, Resultlist.PrjKy, Resultlist.PrcsDetKy, Resultlist.Description, isAct)
    //    clearDetailpart();


    //}


}



function LoadGrid() {

    var MultiAtncolumns = [
            {
                field: "MulAtnDetKy", title: "MulAtnDetKy", width: "10px", hidden: true, attributes: { style: "text-align:center;" },
            },
             {
                 field: "AtnDetKy", title: "AtnDetKy", width: "10px", hidden: true, attributes: { style: "text-align:center;" },
             },
             {
                 field: "EmpKy", title: "EmpKy", width: "10px", hidden: true, attributes: { style: "text-align:center;" },
             },

            {
                field: "AtnDt", title: "AtnDt", width: "60px", attributes: { style: "text-align:center;" },
                format: "{0: dd/MM/yyyy}",
            },
        {
            field: "InTime", title: "InTime", width: "40px", attributes: { style: "text-align:center;" },
            editor: function (container, options) {
                $('<input id="postalCodeEditMask" data-text-field="InTime" data-value-field="PostalCode" data-bind="value:' + options.field + '"/>')
                     .appendTo(container)
                     .kendoMaskedTextBox({
                         mask: "00:00",
                         value: options.model.InTime
                     });
            }

        },

                {
                    field: "OutTime", title: "OutTime", width: "40px", attributes: { style: "text-align:center;" },
                    editor: function (container, options) {
                        $('<input id="postalCodeEditMask" data-text-field="OutTime" data-value-field="PostalCode" data-bind="value:' + options.field + '"/>')
                             .appendTo(container)
                             .kendoMaskedTextBox({
                                 mask: "00:00",
                                 value: options.model.OutTime
                             });
                    }
                },
                {
                    title: "Project Ky",
                    field: "PrjKy",
                    width: "60px",
                    hidden: true,
                    attributes: { style: "text-align:center;" },

                    //editor: function (container, options) {
                    //    var model = options.model;
                    //    var input = $('<input id="PrjKy" name="PrjId">');

                    //    input.appendTo(container);
                    //    input.kendoComboBox({
                    //        dataTextField: "PrjId",
                    //        dataValueField: "PrjKy",
                    //        dataSource: PrjId_SelectMob_DataSource("HdrSec2_CmbPrjId"),
                    //        change: function (e) {
                    //            combo = e.sender;
                    //            selectedItm = combo.select();
                    //            dataItem = combo.dataItem(selectedItm);
                    //            //  var validate = ComboValidations("cmbBankName");

                    //            if (true) {
                    //                model.set("PrjKy", dataItem.PrjKy);
                    //                model.set("PrjId", dataItem.PrjId);
                    //            } else {
                    //                model.set("PrjKy", 1);
                    //                model.set("PrjId", "");
                    //            }


                    //            //if(gridRowIndex >= 0 )
                    //            //{
                    //            //    var RowUpdate = $("#MultiAtnGrid").data().kendoGrid.dataSource.data()[gridRowIndex];
                    //            //    //RowUpdate.set("PrjKy", );
                    //            //}
                    //        },

                    //    }).appendTo(container);
                    //}
                },
                {
                    field: "PrjID", title: "Project id", width: "80px", attributes: { style: "text-align:center;" },
                },
                 {
                     field: "PrjNm", title: "Project Nm", width: "100px", attributes: { style: "text-align:center;" },
                 },


                  {
                      title: "Task Ky",
                      field: "PrcsDetKy",
                      width: "60px",
                      hidden: true,
                      attributes: { style: "text-align:center;" },

                      //editor: function (container, options) {
                      //    var model = options.model;
                      //    var input = $('<input id="PrcsDetKy" name="TaskID">');

                      //    input.appendTo(container);
                      //    input.kendoComboBox({
                      //        dataTextField: "TaskID",
                      //        dataValueField: "PrcsDetKy",
                      //        dataSource: TaskDatasource_Cd('HdrSec2_ComTsk', model.PrjKy),
                      //        change: function (e) {
                      //            combo = e.sender;
                      //            selectedItm = combo.select();
                      //            dataItem = combo.dataItem(selectedItm);
                      //            //  var validate = ComboValidations("cmbBankName");

                      //            if (true) {
                      //                model.set("PrcsDetKy", dataItem.PrcsDetKy);
                      //            } else {
                      //                model.set("PrcsDetKy", 1);
                      //            }

                      //        },

                      //    }).appendTo(container);
                      //}
                  },
                  {
                      field: "TaskID", title: "Task ID", width: "80px", attributes: { style: "text-align:center;" },
                  },
                  {
                      field: "TaskNm", title: "Task Name", width: "150px", attributes: { style: "text-align:center;" },
                  },

                {
                    field: "TTLMinute", title: "TotMin", width: "50px", attributes: { style: "text-align:center;" },
                    editor: function (container, options) {
                        var model = options.model;
                    }//template: '#= kendo.toString(TotMin, "n2")#',
                },
                {
                    field: "Des", title: "Des", width: "150px", attributes: { style: "text-align:center;" },
                },
                {
                    field: "isAct", title: "IsAct", width: "50px", hidden: true, attributes: { style: "text-align:center;" },
                },


    ];
    var gridNo = 1;
    var FinalItmColumn = setColumnProp(MultiAtncolumns, viewBag.ObjKy, '', 'FrmGrd', gridNo)
    EnableHader();
}


function LoadGridWithColumnProp(columnsFinal, gridNo) {

    var FrmDt = $("#HdrSec1_DteFrmDate_Val").val();
    var ToDt = $("#HdrSec1_ToDate_Val").val();

    var EmpKy = $("#HdrSec1_CmbEmpNo_cd").data('kendoComboBox').value();
    if (EmpKy == "" || EmpKy == null || EmpKy == undefined || EmpKy == 1) {
        alert("Select Employee");
        return;
    }


    if (gridNo == 1) {
        try {
            $('#MultiAtnGrid').data().kendoGrid.destroy();
            $('#MultiAtnGrid').empty();
        } catch (e) { }

        var griddataSource = new kendo.data.DataSource({
            transport: {
                read: {
                    url: urlMultiAtnDet_SelectWeb, // '@Url.Action("Attendence", "MultiAtnDet_SelectWeb")',
                    //contentType: 'application/json; charset=utf-8',
                    //data: {
                    //    ConCd: 'TRADING',
                    //    TypConCd: 'ItmTyp',
                    //    TypKy: ItmTypKy
                    //},
                    dataType: "json",
                    type: "POST",
                    //complete: function (data) { },
                },

                parameterMap: function (options, operation) {

                    if (operation == "read") {
                        return ({
                            'FrmDt': FrmDt,
                            'ToDt': ToDt,
                            'EmpKy': EmpKy,
                            'ObjKy': viewBag.ObjKy,
                        })

                    }
                }

            },
            pageSize: 15,

            schema: {
                model: {
                    id: "MulAtnDetKy",
                    fields: //Relavent fields of the grid should be bind with following model items
                    {
                        MulAtnDetKy: { editable: true, nullable: false, type: "number", defaultValue: 0 },
                        AtnDetKy: { editable: true, nullable: false, type: "number", defaultValue: 0 },
                        EmpKy: { editable: true, nullable: false, type: "number", defaultValue: EmpKy },
                        InTime: { editable: true, nullable: true, type: "string" },
                        OutTime: { editable: true, nullable: true, type: "string" },
                        AtnDt: { editable: true, nullable: false, type: "date" },
                        PrjKy: { editable: true, nullable: false, type: "number" },
                        PrjId: { editable: true, nullable: false, type: "string" },
                        PrjNm: { editable: true, nullable: false, type: "string" },
                        PrcsDetKy: { editable: true, nullable: false, type: "number" },
                        TaskID: { editable: true, nullable: false, type: "string" },
                        TaskNm: { editable: true, nullable: false, type: "string" },
                        TTLMinute: { editable: true, nullable: false, type: "number" },
                        Des: { editable: true, nullable: false, type: "string" },
                        isAct: { editable: false, nullable: false, type: "number" },
                    }
                }
            }
        });


        $("#MultiAtnGrid").kendoGrid({
            dataSource: griddataSource,
            autobind: true,
            resizable: true,
            navigatable: true,
            sortable: true,
            reorderable: true,
            Scrollable: true,
            selectable: "row",
            pageable: {
                refresh: true, pageSizes: [5, 10, 20, 50, 100, 150]
            },
            columnMenu: true,
            filterable: {
                mode: "row"
            },
            columns: columnsFinal,
            dataBinding: function () {
                record = (this.dataSource.page() - 1) * this.dataSource.pageSize();
            },
            change: function (e) {
                var $grid = e.sender; //grid ref
                var $cell = $grid.select(); // selected td
                var $row = $cell.closest('tr'); //selected tr
                var row_uid = $row.attr('data-uid'); //uid of selected row
                var cell_index = $cell.index(); //cell index 0 based
                var row_index = $row.index(); //row index 0 based
                GridDeleteRowIndex = $row.index();

                var row_data = $grid.dataItem($row); //selected row data
                //alert(JSON.stringify(row_data));
                gridSelectRowData = $grid.dataItem($row).toJSON();
                //alert(JSON.stringify(gridSelectRowData));


            },

            editable: false
        });

    }
}


function LoadPrjCombo() {
    $("#HdrSec2_ComPrj_Id").kendoComboBox({
        dataValueField: "PrjKy",
        dataTextField: "PrjId",
        dataSource: PrjId_SelectMob_DataSource("HdrSec2_ComPrj_Id"),
        change: function (e) {
            //var cmb = $("#HdrSec1_ComProPj_Cd").data("kendoComboBox");
            //var CdKy = cmb.value();
            //var prjNudropdownlist = $("#HdrSec1_ComProPj_Cd").data("kendoComboBox");
            //var PrjKy = $("#HdrSec1_ComProPj_Cd").data("kendoComboBox").value();
            //if (PrjKy == "" || PrjKy == 1) {
            //    $("#HdrSec2_InpColumnGd").data("kendoGrid").dataSource.data([]);
            //    return;
            //}
            //LoadDataToGrid(PrjKy);

        },
        filter: "contains",
        suggest: true,
        placeholder: "Select a the Project"
    });
}



function Save() {
    var grid = $("#MultiAtnGrid").data("kendoGrid");

    var currentData = grid.dataSource.data();
    var updatedRecords = [];
    var newRecords = [];

    for (var i = 0; i < currentData.length; i++) {

        if (currentData[i].isNew()) {
            newRecords.push(currentData[i].toJSON());
        } else if (currentData[i].dirty) {
            updatedRecords.push(currentData[i].toJSON());
        }
    }

    if (newRecords.length != 0) {
        //ajax for unsert update and delete
        $.ajax({
            url: urlMultiAtnDet_InsertWeb, // '@Url.Content("~/ItmTax/MultiAtnDet_InsertWeb")',
            data: JSON.stringify({
                newGrid: kendo.stringify(newRecords),
                ObjKy: viewBag.ObjKy,
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "Json",
            type: "POST",
            success: function (data) {

                if (data == true) {
                    alert("Successfully Saved..!");
                    LoadGrid(); // update grid
                    NewRow = false;
                } else {
                    alert("Record Not Saved");
                    LoadGrid(); // update grid
                }
            },
            error: function (e) {
                alert("Record Not Saved");
                LoadGrid();
                return false;
            }
        });
    }
    else if (updatedRecords.length != 0) {

        $.ajax({
            url: urlMultiAtnDet_UpDateWeb, // '@Url.Content("~/ItmTax/MultiAtnDet_InsertWeb")',
            data: JSON.stringify({
                updateGrid: kendo.stringify(updatedRecords),
                ObjKy: viewBag.ObjKy,
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "Json",
            type: "POST",
            success: function (data) {

                if (data == true) {
                    alert("Successfully Saved..!");
                    LoadGrid(); // update grid

                } else {
                    alert("Record Not Saved");
                    LoadGrid(); // update grid
                }
            },
            error: function (e) {
                alert("Record Not Saved");
                LoadGrid();
                return false;
            }
        });

    }
    else {
        alert("Insert Date Into Grid");
        return;
    }



}

//Function To Check the 24 hours time Format 
function CheckTimeFormat(intime, outtime) {
    //Split The Time Into Hours and minutes
    var intm = intime.split(":");
    var otTm = outtime.split(":");
    var message;

    if (intm[0] > 24 && intm[1] > 60 || intime[0] > 24 || intime[0] > 60 || otTm[0] > 24 && otTm[1] > 60 || otTm[0] > 24 || otTm[1] > 60) {
        message = "Your Entered time format is wrong use (23:59)";
        return message;
    }
    else if (outtime <= intime) {
        message = " You Enter Out time is less the IN time ";
        return message;
    }
}

//Grid Duble Click get the data from row
$("#MultiAtnGrid").dblclick(function () {

    var gritrow = $("#MultiAtnGrid").data("kendoGrid");
    var selectedItem = gritrow.dataItem(gritrow.select());
    //MulAtnDetKy = selectedItem.MulAtnDetKy;
    AtnDetKy = selectedItem.AtnDetKy;
    EmpKy = selectedItem.EmpKy;

    var prjky = selectedItem.PrjKy;
    var PrcsDetKy = selectedItem.PrcsDetKy;

    var AtnDate = selectedItem.AtnDt;
    var inTm = selectedItem.InTime;
    var outTm = selectedItem.OutTime;



    $('#HdrSec2_CmbPrjId_Cd').data("kendoComboBox").value(prjky);
    $("#HdrSec2_CmbPrj_Nm").data("kendoComboBox").value(prjky);
    $('#HdrSec2_CmbTskId_Cd').data("kendoComboBox").value(PrcsDetKy);
    $('#HdrSec2_CmbTsk_Nm').data("kendoComboBox").value(PrcsDetKy);

    $("#HdrSec2_DatAtdDate_Val").data("kendoDatePicker").value(AtnDate);
    $("#HdrSec2_InpinTm").data("kendoMaskedTextBox").value(inTm);
    $("#HdrSec2_InpoutTm").data("kendoMaskedTextBox").value(outTm);
    $("#HdrSec2_InpDes").val(selectedItem.Des);


    //Selected Row Index 
    var grid = $("#MultiAtnGrid").data("kendoGrid");
    var index = grid.dataSource.indexOf(selectedItem);
    gridRowIndex = index;

});


function GetCormenData() {

    var prjky = $('#HdrSec2_CmbPrjId_Cd').data("kendoComboBox").value();
    var prcsDetky = $('#HdrSec2_CmbTskId_Cd').data("kendoComboBox").value();
    var AtnDate = $("#HdrSec2_DatAtdDate_Val").val();
    var inTm = $("#HdrSec2_InpinTm").data("kendoMaskedTextBox").value();
    var outTm = $("#HdrSec2_InpoutTm").data("kendoMaskedTextBox").value();
    var des = $("#HdrSec2_InpDes").val();
    var prjid = $('#HdrSec2_CmbPrjId_Cd').data("kendoComboBox").text();
    var prjNm = $('#HdrSec2_CmbPrj_Nm').data("kendoComboBox").text();
    var Taskid = $('#HdrSec2_CmbTskId_Cd').data("kendoComboBox").text();
    var TaskNm = $('#HdrSec2_CmbTsk_Nm').data("kendoComboBox").text();
    var chtime = "";
    chtime = CheckTimeFormat(inTm, outTm);
    if (prjky.length == 0 && prjky <= 0 || prjky.length <= 0 || prjky <= 0) {
        alert("Select The Project Id ");
        return;
    }
    else if (prcsDetky.length == 0 && prcsDetky <= 0 || prcsDetky.length <= 0 || prcsDetky <= 0) {
        alert("Select The Task Id ");
        return;
    }
    else if (chtime != "" && chtime != undefined && chtime != null) {
        alert(JSON.stringify(chtime));
        return;
    }
    else if (inTm.length == 0) {
        alert("Select The In Time ");
        return;
    }
    else if (outTm.length == 0) {
        alert("Select The Out Time ");
        return;
    }
    else if (AtnDate.length == 0) {
        alert("Select The Attendance Data ");
        return;
    }
    else if (des.length == 0) {
        alert("Enter The Description");
        return;
    }
    else {
        var CormenData = {
            PrjKy: prjky,
            PrcsDetKy: prcsDetky,
            PrjID: prjid,
            Prjnm: prjNm,
            TaskID: Taskid,
            TaskNm:TaskNm, 
            AtdDate: AtnDate,
            In_time: inTm,
            Out_time: outTm,
            Description: des,
        }
        return CormenData;

    }
}

function disableHader() {

    $("#HdrSec1_CmbEmpNo_cd").data("kendoComboBox").enable(false);
    $("#HdrSec1_CmbEmpNm_Nm").data("kendoComboBox").enable(false);
    $("#HdrSec1_DteFrmDate_Val").data("kendoDatePicker").enable(false);
    $("#HdrSec1_ToDate_Val").data("kendoDatePicker").enable(false);
}
function EnableHader() {

    $("#HdrSec1_CmbEmpNo_cd").data("kendoComboBox").enable();
    $("#HdrSec1_CmbEmpNm_Nm").data("kendoComboBox").enable();
    $("#HdrSec1_DteFrmDate_Val").data("kendoDatePicker").enable();
    $("#HdrSec1_ToDate_Val").data("kendoDatePicker").enable();
}



//Des TextBox Enter Key Press Event 
$("#HdrSec2_InpDes").keypress(function (e) {
    if (e.keyCode == 13) {
        disableHader();
        var Resultlist = GetCormenData();
        if (gridRowIndex >= 0) {

            if (Resultlist != undefined) {
                var RowUpdate = $("#MultiAtnGrid").data().kendoGrid.dataSource.data()[gridRowIndex];
                RowUpdate.set("PrjKy", Resultlist.PrjKy);
                RowUpdate.set("PrcsDetKy", Resultlist.PrcsDetKy);
                RowUpdate.set("InTime", Resultlist.In_time);
                RowUpdate.set("OutTime", Resultlist.Out_time);
                RowUpdate.set("PrjId", Resultlist.PrjID);
                RowUpdate.set("PrjNm", Resultlist.Prjnm);
                RowUpdate.set("TaskID", Resultlist.TaskID);
                RowUpdate.set("TaskNm", Resultlist.TaskNm);
                var Atdate = Resultlist.AtdDate.split("/");
                var day = Atdate[0];
                var mon = Atdate[1];
                var year = Atdate[2];
                var newdate = year + "/" + mon + "/" + day
                RowUpdate.set("AtnDt", newdate);
                RowUpdate.set("Des", Resultlist.Description);
                gridRowIndex = -1;
                clearDetailpart();


            }
        }
        else {
            if (Resultlist != undefined) {
                var Atdate = Resultlist.AtdDate.split("/");
                var day = Atdate[0];
                var mon = Atdate[1];
                var year = Atdate[2];
                var newdate = year + "/" + mon + "/" + day;
                var EmpKy = $("#HdrSec1_CmbEmpNo_cd").data('kendoComboBox').value();
                var isAct = 1;
                InsertToGrid(EmpKy, Resultlist.In_time, Resultlist.Out_time, newdate, Resultlist.PrjKy, Resultlist.PrcsDetKy, Resultlist.Description, isAct, Resultlist.PrjID, Resultlist.Prjnm, Resultlist.TaskID, Resultlist.TaskNm)
                clearDetailpart();


            }

        }



    }
});


//InTime TextBox Enter Key Press Event 
$("#HdrSec2_InpinTm").keypress(function (e) {
    if (e.keyCode == 13) {
        disableHader();
        var Resultlist = GetCormenData();
        if (gridRowIndex >= 0) {

            if (Resultlist != undefined) {
                var RowUpdate = $("#MultiAtnGrid").data().kendoGrid.dataSource.data()[gridRowIndex];
                RowUpdate.set("PrjKy", Resultlist.PrjKy);
                RowUpdate.set("PrcsDetKy", Resultlist.PrcsDetKy);
                RowUpdate.set("InTime", Resultlist.In_time);
                RowUpdate.set("OutTime", Resultlist.Out_time);
                RowUpdate.set("PrjId", Resultlist.PrjID);
                RowUpdate.set("PrjNm", Resultlist.Prjnm);
                RowUpdate.set("TaskID", Resultlist.TaskID);
                RowUpdate.set("TaskNm", Resultlist.TaskNm);
                var Atdate = Resultlist.AtdDate.split("/");
                var day = Atdate[0];
                var mon = Atdate[1];
                var year = Atdate[2];
                var newdate = year + "/" + mon + "/" + day
                RowUpdate.set("AtnDt", newdate);
                RowUpdate.set("Des", Resultlist.Description);
                gridRowIndex = -1;
                clearDetailpart();


            }
        }
        else {
            if (Resultlist != undefined) {
                var Atdate = Resultlist.AtdDate.split("/");
                var day = Atdate[0];
                var mon = Atdate[1];
                var year = Atdate[2];
                var newdate = year + "/" + mon + "/" + day;
                var EmpKy = $("#HdrSec1_CmbEmpNo_cd").data('kendoComboBox').value();
                var isAct = 1;
                InsertToGrid(EmpKy, Resultlist.In_time, Resultlist.Out_time, newdate, Resultlist.PrjKy, Resultlist.PrcsDetKy, Resultlist.Description, isAct, Resultlist.PrjID, Resultlist.Prjnm, Resultlist.TaskID, Resultlist.TaskNm)
                clearDetailpart();


            }

        }



    }
});

//OutTime TextBox Enter Key Press Event 
$("#HdrSec2_InpoutTm").keypress(function (e) {
    if (e.keyCode == 13) {
        disableHader();
        var Resultlist = GetCormenData();
        if (gridRowIndex >= 0) {

            if (Resultlist != undefined) {
                var RowUpdate = $("#MultiAtnGrid").data().kendoGrid.dataSource.data()[gridRowIndex];
                RowUpdate.set("PrjKy", Resultlist.PrjKy);
                RowUpdate.set("PrcsDetKy", Resultlist.PrcsDetKy);
                RowUpdate.set("InTime", Resultlist.In_time);
                RowUpdate.set("OutTime", Resultlist.Out_time);
                RowUpdate.set("PrjId", Resultlist.PrjID);
                RowUpdate.set("PrjNm", Resultlist.Prjnm);
                RowUpdate.set("TaskID", Resultlist.TaskID);
                RowUpdate.set("TaskNm", Resultlist.TaskNm);
                var Atdate = Resultlist.AtdDate.split("/");
                var day = Atdate[0];
                var mon = Atdate[1];
                var year = Atdate[2];
                var newdate = year + "/" + mon + "/" + day
                RowUpdate.set("AtnDt", newdate);
                RowUpdate.set("Des", Resultlist.Description);
                gridRowIndex = -1;
                clearDetailpart();


            }
        }
        else {
            if (Resultlist != undefined) {
                var Atdate = Resultlist.AtdDate.split("/");
                var day = Atdate[0];
                var mon = Atdate[1];
                var year = Atdate[2];
                var newdate = year + "/" + mon + "/" + day;
                var EmpKy = $("#HdrSec1_CmbEmpNo_cd").data('kendoComboBox').value();
                var isAct = 1;
                InsertToGrid(EmpKy, Resultlist.In_time, Resultlist.Out_time, newdate, Resultlist.PrjKy, Resultlist.PrcsDetKy, Resultlist.Description, isAct, Resultlist.PrjID, Resultlist.Prjnm, Resultlist.TaskID, Resultlist.TaskNm)
                clearDetailpart();


            }

        }



    }
});

function clearDetailpart() {
    $('#HdrSec2_CmbPrjId_Cd').data("kendoComboBox").value("");
    $('#HdrSec2_CmbTskId_Cd').data("kendoComboBox").value("");
    $('#HdrSec2_CmbTsk_Nm').data("kendoComboBox").value("");
    $('#HdrSec2_CmbPrj_Nm').data("kendoComboBox").value("");
    DetPartLoadDatepicker();
    $("#HdrSec2_InpinTm").data("kendoMaskedTextBox").value("");
    $("#HdrSec2_InpoutTm").data("kendoMaskedTextBox").value("");
    $("#HdrSec2_InpDes").val("");
}


//insert the data into grid
function InsertToGrid(EmpKy, InTime, OutTime, AtnDt, PrjKy, PrcsDetKy, Des, IsAct, PrjID, PrjNm, TaskID, TaskNm) {
    var grid = $("#MultiAtnGrid").data("kendoGrid");
    var dataSource1 = grid.dataSource;
    var total = dataSource1.data().length;

    grid.dataSource.insert(
        total,
        {
            EmpKy: EmpKy,
            InTime: InTime,
            OutTime: OutTime,
            Des: Des,
            AtnDt: AtnDt,
            PrjKy: PrjKy,
            PrcsDetKy: PrcsDetKy,
            isAct: IsAct,
            PrjID: PrjID,
            PrjNm: PrjNm,
            TaskID: TaskID,
            TaskNm: TaskNm

        }
    );


}

document.addEventListener("keydown", function (event) {
    if (event.key === "Delete") {
        if (GridDeleteRowIndex >= 0) {
            var answer = confirm("Are you sure you want to delete from the database?")
            if (answer) {
                gridSelectRowData.isAct = 0;
                //alert(JSON.stringify(gridSelectRowData));
                var updatedRecords = [];
                updatedRecords.push(gridSelectRowData);
                $.ajax({
                    url: urlMultiAtnDet_UpDateWeb,
                    data: JSON.stringify({
                        updateGrid: kendo.stringify(updatedRecords),
                        ObjKy: viewBag.ObjKy,
                    }),
                    contentType: "application/json; charset=utf-8",
                    dataType: "Json",
                    type: "POST",
                    success: function (data) {

                        if (data == true) {
                            alert("Successfully Delete..!");
                            LoadGrid();
                            gridSelectRowData = "";
                            GridDeleteRowIndex = -1;

                        } else {
                            alert("Record Not Deleted");
                            LoadGrid();
                        }
                    },
                    error: function (e) {
                        alert("Record Not Deleted");
                        LoadGrid();

                        return false;
                    }
                });
            }
        }

    }
    else if (event.key === "Enter") {

    }
});
