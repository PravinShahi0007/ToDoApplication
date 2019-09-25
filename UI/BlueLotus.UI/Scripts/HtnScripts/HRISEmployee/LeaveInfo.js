var EmpKy = 1;
var Editing_LiNo = 0;
var gridSelectRowData = "";
var GridDeleteRowIndex = -1;

var FormGlblData = {
    FormObjData: null,
    AllDefalutValueObj: null,
    ItmTypKy: 1,
    TrnTypKy: 1,
    AccessLvlKy: 1,
    ConfiLvlKy: 1,
    LiNo: 1
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
    Tooltip();
    LoadDatePicker();  
    LoadLeaveInfoGrid(1);
    LoadLeaveGrid(1);
    SelectText();    
    clearfunction();
    SetDatepicker();
    

    $(document).keydown(function (e) {
        if (e.which === 32 && e.ctrlKey) {
            //alert('control + y');
            Add();
        }
        else if (e.which === 90 && e.ctrlKey) {
            //alert('control + z');
            Add();
        }
    });
}

function clearfunction() {
    
    $("#EmpNo").data("kendoComboBox").value("");
    $("#EmpNm").data("kendoComboBox").value("");
    var todayDate = new Date();
    $("#FromD").data("kendoDatePicker").value(todayDate);
    $("#ToD").data("kendoDatePicker").value(todayDate);
    $("#LeaveType").data("kendoComboBox").value("");
    //$("#EntitlesD").val("");
    $("#Taken").data("kendoNumericTextBox").value("");

    try {
        $('#LeaveInfoGrid').data().kendoGrid.destroy();
        $('#LeaveInfoGrid').empty();
    } catch (e) { }

    try {
        $('#LeaveGrid').data().kendoGrid.destroy();
        $('#LeaveGrid').empty();
    } catch (e) { }
    $('#HdrSec1_Chkbox_Isfirst_Val').prop('checked', false);
    $('#HdrSec1_Chkbox_IsSecond_Val').prop('checked', false);
}

function clearDetailPart() {
    var todayDate = new Date();
    $("#FromD").data("kendoDatePicker").value(todayDate);
    $("#ToD").data("kendoDatePicker").value(todayDate);
    $("#LeaveType").data("kendoComboBox").value("");
    //$("#EntitlesD").val("");
    $("#Taken").data("kendoNumericTextBox").value("");
    $('#HdrSec1_Chkbox_Isfirst_Val').prop('checked', false);
    $('#HdrSec1_Chkbox_IsSecond_Val').prop('checked', false);
}

function LoadDatePicker() {
    $("#FromD").kendoDatePicker({
        change: onChange,
        format: "dd/MM/yyyy",
        min: new Date(31, 2, 2010)
    });
    $("#ToD").kendoDatePicker({

        format: "dd/MM/yyyy",
        min: new Date(31, 2, 2010),
        change: onChange

    });

    $(".k-datepicker, .k-combobox, .k-numerictextbox,.k-input").css('width', "100%");

}

function onChange()
{
    //alert(2);
    var StratDate = $("#FromD").data("kendoDatePicker").value();
    var EndDate = $("#ToD").data("kendoDatePicker").value();

    ShowTaken(StratDate, EndDate);
}
    
$(function () {
    
    $("#FromD").kendoDatePicker({
        change: onChange
        
    });
})

$(function () {
        
        $("#ToD").kendoDatePicker({
            change: function (e) {
                alert(1);
                var StratDate = $("#FromD").data("kendoDatePicker").value();
                var EndDate = $("#ToD").data("kendoDatePicker").value();

                ShowTaken(StratDate, EndDate);
            },
            //close: onClose,
            //open: onOpen,
        });
    })


function SetDatepicker() {
    var todayDate = kendo.toString(kendo.parseDate(new Date()), 'dd/MM/yyyy');
    $("#FromD").data("kendoDatePicker").value(todayDate);
    $("#ToD").data("kendoDatePicker").value(todayDate);

    $("#FromD").data("kendoDatePicker").trigger("change");

}

function LoadCombo() {

    $("#EmpNo").kendoComboBox({
        dataValueField: "EmpKy",
        dataTextField: "EmpNo",
        dataSource: {
            type: "POST",
            transport: {

                read: urlEmpMas.Employee_LookUp_Web,
            }
        },
        change: function (e) {
            var cmb = $("#EmpNo").data("kendoComboBox");
            var EmpNo = cmb.value();

            if (EmpNo != "") {
                var validate = ComboValidations("EmpNo");

                if (validate) {
                    $("#EmpNm").data("kendoComboBox").value(EmpNo);
                    LoadLeaveInfoGrid(EmpNo);
                    LoadLeaveGrid(EmpNo);
                } else {
                    $("#EmpNm").data("kendoComboBox").value("");

                }
            }


        },
        filter: "contains",
        suggest: true,
        placeholder: "Select a EmpNo.."


    });

    $("#EmpNm").width(200).kendoComboBox({

        dataValueField: "EmpKy",
        dataTextField: "EmpNm",

        dataSource: {
            type: "POST",
            transport: {

                read: urlEmpMas.Employee_LookUp_Web,
             }
            },

            change: function (e) {
                var cmb = $("#EmpNm").data("kendoComboBox");
                var EmpNm = cmb.value();

                if (EmpNm != "") {
                    var validate = ComboValidations("EmpNm");

                    if (validate) {
                        $("#EmpNo").data("kendoComboBox").value(EmpNm);
                        LoadLeaveInfoGrid(EmpNm);
                        LoadLeaveGrid(EmpNm);

                    } else {
                        $("#EmpNo").data("kendoComboBox").value("");

                    }
                }

            },
            filter: "contains",
            suggest: true,
            placeholder: "Select a Emp Name"
        
        });

    $("#LeaveType").width(200).kendoComboBox({
        dataValueField: "CdKy",
        dataTextField: "CdNm",
        dataSource: GetCdMas_LookupWeb('LevTyp'),
        change: function (e) {
            var type = $("#LeaveType").data("kendoComboBox").text();            
       },
        filter: "contains",
        suggest: true,
        placeholder: "Select Leave Type"
    });
    $("#Taken").width(200).kendoNumericTextBox({

        format: "#",
        decimals: 0,
        spinners: false
    }).value = 0;
}

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

function GetCdMas_LookupWeb(ConCd) {
    var dataSource = new kendo.data.DataSource(
      {
          transport: {
              read: {
                  url: urlHRISEmployeeGetCdMas_LookupWeb,
                  data: { ConCd: ConCd },
                  dataType: "json"
              }
          }
      });
    return dataSource;
}

function LoadLeaveInfoGrid() {
    var columns = [
             {
                 field: "LiNo",
                 title: "LiNo",
                 width: "30px",
                 attributes: { class: "ob-Center" }
             },
             {
                 field: "EmpKy", title: "EmpKy", width: "60px", hidden: false 
             },
             {
                 field: "EmpNo", title: "EmpNo", width: "50px"
             },
             {
                 field: "EmpNm", title: "EmpNm", width: "80px"
             },
             {
                 field: "LeaveType",
                 title: "Leave Type",
                 width: "50px",
                 editor: function (container, options) {
                     var model = options.model;
                 }
             },
             {
                 field: "LevTypKy",
                 title: "LeaveType Ky",
                 hidden: true,
             },
              {
                  field: "LevTrnKy", title: "LevTrnKy", width: "10px", hidden: true
              },
             //{
             //    field: "EntitlesD",
             //    title: "Entitle Days",
             //    width: "50px",
             //},
             {
                 field: "LevDays",
                 title: "Taken",
                 width: "50px",
                 editor: function (container, options) {
                     var model = options.model;
                 }
             },
             {
                 field: "FromD",
                 title: "From Date",
                 width: "50px",
                 format: "{0: dd/MM/yyyy}",
                 //editor: function (container, options) {
                 //    var model = options.model;
                 //}
             },
             {
                 field: "ToD",
                 title: "To Date",
                 width: "50px",
                 format: "{0: dd/MM/yyyy}",
                 //editor: function (container, options) {
                 //    var model = options.model;
                 //}
             },
             {
                  field: "is1stHfDy ", title: "IsFirst HalfDay", width: "90px", hidden: true   
             },
             {
                 field: " is2ndHfDy", title: "IsSecond HalfDay", width: "90px", hidden: true
             },
             {
                 field: " isAct", title: "isAct", width: "90px", hidden: true
             }
           
    ];

    var gridNo = 1;
    var FinalShiftSettingsColumn = setColumnProp(columns, viewBag.ObjKy, '', 'LeaveInfoGrid', gridNo);

}

function LoadGridWithColumnProp(columnsFinal, gridNo) {

    var dataSource = new kendo.data.DataSource({
        transport: {
            read: {
                url: urlEmpMas.LevTrn_SelectWeb,
                dataType: "json"
            },

            parameterMap: function (options, operation) {

                if (operation == "read") {
                    return ({

                        'EmpKy': EmpKy,
                        'OurCd': viewBag.OurCd,
                    });
                }
            }
        },

   
        batch: true,
        pageSize: 10,
        schema: {
            model: {
                id: "LevTrnKy",
                fields: //Relavent fields of the grid should be bind with following model items
                {
                    EmpKy: { editable: true, nullable: false, type: "number" },
                    EmpNo: { editable: true, nullable: false, type: "number" },
                    EmpNm: { editable: true, nullable: false, type: "string" },
                    LiNo: { editable: true, nullable: false, type: "number" },
                    FromD: { editable: true, nullable: false, type: "date" },
                    ToD: { editable: true, nullable: false, type: "date" },
                    //Balance: { editable: true, nullable: false, type: "string" },
                    LevDays: { editable: true, nullable: false, type: "number" },
                    //EntitlesD: { editable: true, nullable: false, type: "number" },
                    LeaveType: { editable: true, nullable: false, type: "string" },
                    LevTypKy: { editable: true, nullable: false, type: "number" },
                    LevTrnKy: { editable: true, nullable: false, type: "number", defaultValue: 0 },
                    is1stHfDy: { editable: true, nullable: false, type: "number", defaultValue: 0 },
                    is2ndHfDy: { editable: true, nullable: false, type: "number", defaultValue: 0 },
                    isAct: { editable: true, nullable: false, type: "number" },
                }
            }
        },
    });

    $("#LeaveInfoGrid").kendoGrid({
        dataSource: dataSource,
        sortable: true,
        autobind: true,
        navigatable: true,
        scrollable: true,
        reorderable: true,
        pageable: true,

        columns: columnsFinal,
        selectable: "row",
        resizable: true,
        pageable: { refresh: true, pageSizes: [5, 10, 20, 50, 100] },
        columnMenu: true,
        filterable: false,
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
        },
        editable: false
       
    });
}

function CheckLeave()
{
    var grid = $("#LeaveGrid").data("kendoGrid");
    var LevDays = $("#Taken").data("kendoNumericTextBox").value();
    var LeaveType = $("#LeaveType").data("kendoComboBox").text();
    var LevTypKy = $("#LeaveType").data("kendoComboBox").value();
    var griddata = grid.dataSource.data();
    var hdrlvtypky = 1;
    var Balance = 0;

    for (var i = 0; i < griddata.length; i++) { 
        var levtypky1 = griddata[i].LevTypKy;
        if (LevTypKy == levtypky1) {
            hdrlvtypky = LevTypKy;
            Balance = griddata[i].Balance
        }

    }

    if (LeaveType == "No Pay") {
        AddtoGrid();
    }
    else {

        if (hdrlvtypky > 1) {
            if (LevDays <= Balance) {
                AddtoGrid();
            }
            else {
                alert("Invalid Taken");
                return;
            }
        } else {
            alert("Invalid LeaveType");

        }        
    }
}

function ShowTaken(StratDate,EndDate)
{

    var startDate = $("#FromD").data("kendoDatePicker").value();
    var endDate = $("#ToD").data("kendoDatePicker").value();

    var diff = Math.round((endDate - startDate) / 1000 / 60 / 60 / 24)+1; //Difference in days
    
    $("#Taken").data("kendoNumericTextBox").value(diff);

    ;
   

}

function Add() {
   
    if (document.getElementById("EmpNo").value != "") {

        if (document.getElementById("FromD").value != "") {
            if (document.getElementById("ToD").value != "") {
                if (document.getElementById("LeaveType").value != "") {
                    if (document.getElementById("Taken").value != "") {
                        if (Editing_LiNo > 0)
                        {
                            update();
                        }
                        else {
                            CheckLeave();
                        }
                       
                       
                    }
                    else {
                        alert("please Enter Taken");
                    }
                }

                else {
                    alert("please Enter Leave Type");
                }
            }

            else {
                alert("please Enter To Date");
            }
        }

        else {
            alert("please Enter From Date");
        }
    }

    else {
        alert("please Enter Emp No");
    }

}

function AddtoGrid()
{
    var grid = $("#LeaveInfoGrid").data("kendoGrid");

    var LiNo = 1;

    var EmpNo = $("#EmpNo").data("kendoComboBox").text();
    var EmpNm = $("#EmpNm").data("kendoComboBox").text();
    var LeaveType = $("#LeaveType").data("kendoComboBox").text();
    var LevTypKy = $("#LeaveType").data("kendoComboBox").value();
    //var LevTrnKy = $("#LeaveType").data("kendoComboBox").value();
    var FromD = $('#FromD').val();
    var ToD = $('#ToD').val();
    var LevDays = $('#Taken').data("kendoNumericTextBox").value();

    //to check The From Date biget then Todate 
    var frmday = FromD.split("/");
    var Today = ToD.split("/");
    var firstDate = new Date(frmday[2], frmday[1], frmday[0]);
    var secondDate = new Date(Today[2],Today[1],Today[0]);

    if (new Date(secondDate).getTime() < firstDate.getTime()) {
        alert("The To Date must be Bigger or Equal to From date");
        return false;
    }

    //Haif day opction 
    var Isfirst = $('#HdrSec1_Chkbox_Isfirst_Val').is(':checked');
    var IsSecond = $('#HdrSec1_Chkbox_IsSecond_Val').is(':checked');
    var is1stHfDy =0;
    var is2ndHfDy =0;

    if (Isfirst == true && IsSecond == true)
    {
        alert("You Can't Select both IsFirst And IsSecond ");
        return;
    }

    if (Isfirst == true || IsSecond == true) {
        if (LevDays == 1) {
            if (Isfirst == true) {
                is1stHfDy = 1;
            }
            else if (IsSecond == true) {
                is2ndHfDy = 1;
            }
        }
        else {
            alert("You Can't get HalfDay. Set FromDay And ToDay Same");
            $('#HdrSec1_Chkbox_Isfirst_Val').prop('checked', false);
            $('#HdrSec1_Chkbox_IsSecond_Val').prop('checked', false);
            return;
        }
    }
    if (Editing_LiNo > 0) {

        LiNo = Editing_LiNo;

        var firstItemData = grid.dataSource.data();
        var firstItem = firstItemData[LiNo - 1];//[count - LiNoForChange];

        firstItem.set("LiNo", LiNo);
        firstItem.set("EmpNo", EmpNo);
        firstItem.set("EmpNm", EmpNm);
        firstItem.set("FromD", FromD);
        firstItem.set("ToD", ToD);
        firstItem.set("LeaveType", LeaveType);
        firstItem.set("LevDays", LevDays);
        firstItem.set("LevTypKy", LevTypKy);
        firstItem.set("is1stHfDy", is1stHfDy);
        firstItem.set("is2ndHfDy", is2ndHfDy);
        firstItem.set("isAct", 1);
        //firstItem.set("EmpKy", Emp);

        firstItem.Dirty = "Dirty";
        Editing_LiNo = 0;
    }
    else {
        var dataSource = grid.dataSource;
        var total = dataSource.data().length;

        grid.dataSource.insert(
   LiNo = total + 1,
   {
       LiNo: LiNo,
       EmpNo: EmpNo,
       EmpNm: EmpNm,
       EmpKy: EmpKy,
       FromD: FromD,
       ToD: ToD,
       LevDays: LevDays,
       LeaveType: LeaveType,
       LevTypKy: LevTypKy,
       LevTrnKy: 0,
       is1stHfDy: is1stHfDy,
       is2ndHfDy: is2ndHfDy,
       isAct: 1,

   });

    }
}


function SaveDetails(action) {
   
    var grid = $("#LeaveInfoGrid").data("kendoGrid");
    var dataSource = grid.dataSource;

    //records on current view / page   
    var recordsOnCurrentView = dataSource.view().length;
    //total records
    var totalRecords = dataSource.total();

    //var grid = $("#LeaveInfoGrid").data("kendoGrid");
    var currentData = grid.dataSource.data();
    var updatedRecords = [];
    var newRecordsLeaveEntry = [];


    for (var i = 0; i < currentData.length; i++) {
        if (currentData[i].isNew()) {
            newRecordsLeaveEntry.push(currentData[i].toJSON());
        } else if (currentData[i].dirty) {
            updatedRecords.push(currentData[i].toJSON());
        }
    }
    var tempSAveChech = true;

    if (newRecordsLeaveEntry.length != 0) {
            $.ajax({
                url: urlEmpMas.LeaveEntitle,
                data: JSON.stringify({

                    LeaveEnt: kendo.stringify(newRecordsLeaveEntry),
                    OurCd: viewBag.OurCd
                    //EmpDed:x
                }),
                contentType: 'application/json; charset=utf-8',
                dataType: "Json",
                type: "POST",
                success: function (data) {
                    if (data > 1) {
                        alert("Successfully Saved..!");
                        LoadLeaveInfoGrid(); // update grid
                        LoadLeaveGrid();
                    } else {
                        alert("Record Not Saved");
                        LoadLeaveInfoGrid(); // update grid
                        LoadLeaveGrid();
                    }
                },
                error: function (e) {
                    alert("Record Not Saved");
                    LoadLeaveInfoGrid();
                    LoadLeaveGrid();
                    return false;
                }
            });
        
    }
    else if(updatedRecords.length != 0)
    {
        //this For loop update the From Date and toDate 
        //previous devloper Set the default time zone so when your going to update it will reduce date by one day 

        for (var i = 0; i < updatedRecords.length; i++) {
            var fromdate = updatedRecords[i].FromD;
            var datastring = fromdate.getDate();
            fromdate.setDate(datastring + 1);
            updatedRecords[i].FromD = fromdate;

            var Todate = updatedRecords[i].ToD;
            var todatestring = Todate.getDate();
            Todate.setDate(todatestring + 1);
            updatedRecords[i].ToD = Todate;
        }

        $.ajax({
            url: urlEmpMas.LeaveEntitle,
            data: JSON.stringify({

                LeaveEnt: kendo.stringify(updatedRecords),
                OurCd: viewBag.OurCd
                //EmpDed:x
            }),
            contentType: 'application/json; charset=utf-8',
            dataType: "Json",
            type: "POST",
            success: function (data) {
                if (data > 1) {
                    alert("Successfully Saved..!");
                    LoadLeaveInfoGrid(); // update grid
                    LoadLeaveGrid();
                } else {
                    alert("Record Not Saved");
                    LoadLeaveInfoGrid(); // update grid
                    LoadLeaveGrid();
                }
            },
            error: function (e) {
                alert("Record Not Saved");
                LoadLeaveInfoGrid();
                LoadLeaveGrid();
                return false;
            }
        });
    }
}

$("#LeaveInfoGrid").bind("dblclick", DblClick);

function DblClick() {
    var id = ("#LeaveInfoGrid");
    var grid = $(id).data().kendoGrid;
    var selectedItem = grid.dataItem(grid.select());

    var LiNo = selectedItem.LiNo;
    var EmpNo = selectedItem.EmpNo;
    var EmpNm = selectedItem.EmpNm;
   
    var FromD = selectedItem.FromD;
    var ToD = selectedItem.ToD;

    //formating Date Into YY/MM/DD format 

    var NewFromdate = FromD.getDate() + "/" + (FromD.getMonth() + 1) + "/" + FromD.getFullYear();
    var NewTodate = ToD.getDate() + "/" + (ToD.getMonth() + 1) + "/" + ToD.getFullYear();
    var LeaveType = selectedItem.LevTypKy;
    var Taken = selectedItem.LevDays;
    var is1halfDay = selectedItem.is1stHfDy;
    var is2halfDay = selectedItem.is2ndHfDy;

    console.log(EmpNo)

    //LoadCombo()

    $("#EmpNo").data("kendoComboBox").value(EmpNo);
    $("#EmpNm").data("kendoComboBox").value(EmpNm);
    $("#FromD").data("kendoDatePicker").value(NewFromdate);
    $("#ToD").data("kendoDatePicker").value(NewTodate);
    $("#LeaveType").data("kendoComboBox").value(LeaveType);
    $("#Taken").data("kendoNumericTextBox").value(Taken);


    //Set the value for 1Half Day 
    if (is1halfDay == 1)
    {
        $('#HdrSec1_Chkbox_Isfirst_Val').prop('checked', true);
    }
    else {
        $('#HdrSec1_Chkbox_Isfirst_Val').prop('checked', false);
    }
    //Set the value for 2Half Day 
    if (is2halfDay == 1) {
        $('#HdrSec1_Chkbox_IsSecond_Val').prop('checked', true);
    } else {
        $('#HdrSec1_Chkbox_IsSecond_Val').prop('checked', false);
    }
    Editing_LiNo = LiNo;

}

function SaveUpdate(action) {
    if (action == "save" || action == "saveandnew") {
        SaveDetails(action);
    }
}

//function ClearGriddetails() {
//    var grid = $("#LeaveInfoGrid").data("kendoGrid");
//    grid.dataSource.data([]);
//}

function AfterFindEmp(eempKy) {

    LoadLeaveInfoGrid(eempKy);
}
//upDate Function 
document.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        Add();
       
    }
    else if (event.key === "Delete") {
        if (GridDeleteRowIndex >= 0) {

            var grid = $("#LeaveInfoGrid").data("kendoGrid");
            var selectedItems = grid.dataItem(grid.select());
            selectedItems.set("IsAct", 0);
            alert(JSON.stringify(selectedItems));
            var updatedRecords = [];
            updatedRecords.push(selectedItems);
            DeleteButonAction(updatedRecords);
        }
    }
});

function update() {

    var grid = $("#LeaveInfoGrid").data("kendoGrid");
    var gridlineNo = Editing_LiNo - 1;
    var EmpNo = $("#EmpNo").data("kendoComboBox").text();
    var EmpNm = $("#EmpNm").data("kendoComboBox").text();
    var LeaveType = $("#LeaveType").data("kendoComboBox").text();
    var LevTypKy = $("#LeaveType").data("kendoComboBox").value();
    
    var FromD = $('#FromD').val();
    var ToD = $('#ToD').val();

    var LevDays = $('#Taken').data("kendoNumericTextBox").value();

     
    var frmday = FromD.split("/");
    var Today = ToD.split("/");
    var firstDate = new Date(frmday[2], frmday[1], frmday[0]);
    var secondDate = new Date(Today[2], Today[1], Today[0]);

    if (new Date(secondDate).getTime() < firstDate.getTime()) {
        alert("The To Date must be Bigger or Equal to From date");
        return false;
    }

    //Haif day opction 
    var Isfirst = $('#HdrSec1_Chkbox_Isfirst_Val').is(':checked');
    var IsSecond = $('#HdrSec1_Chkbox_IsSecond_Val').is(':checked');
    var is1stHfDy = 0;
    var is2ndHfDy = 0;

    if (Isfirst == true && IsSecond == true) {
        alert("You Can't Select both IsFirst And IsSecond ");
        return;
    }

    if (Isfirst == true || IsSecond == true) {
        if (LevDays == 1) {
            if (Isfirst == true) {
                is1stHfDy = 1;
            }
            else if (IsSecond == true) {
                is2ndHfDy = 1;
            }
        }
        else {
            alert("You Can't get HalfDay. Set FromDay And ToDay Same");
            $('#HdrSec1_Chkbox_Isfirst_Val').prop('checked', false);
            $('#HdrSec1_Chkbox_IsSecond_Val').prop('checked', false);
            return;
        }
    }
    var day = frmday[0];
    var mon = frmday[1];
    var year = frmday[2];
    var NewFromdate = year + "/" + mon + "/" + day;
    var Todays = Today[0];
    var Tomon = Today[1];
    var Toyear = Today[2];
    var NewTodate = Toyear + "/" + Tomon + "/" + Todays;

    var RowUpdate = $("#LeaveInfoGrid").data().kendoGrid.dataSource.data()[gridlineNo];
    RowUpdate.set("EmpNo", EmpNo);
    RowUpdate.set("EmpNm", EmpNm);
    RowUpdate.set("FromD", NewFromdate);
    RowUpdate.set("ToD", NewTodate);
    RowUpdate.set("LeaveType", LeaveType);
    //Update The Leave Type
    RowUpdate.set("LevTypKy", LevTypKy);
    RowUpdate.set("LevDays", LevDays);
    RowUpdate.set("is1stHfDy", is1stHfDy);
    RowUpdate.set("is2ndHfDy", is2ndHfDy);
    Editing_LiNo = 0;
}


function DeleteButonAction(updatedRecords) {
    $.ajax({
        url: urlEmpMas.LeaveEntitle,
        data: JSON.stringify({

            LeaveEnt: kendo.stringify(updatedRecords),
            OurCd: viewBag.OurCd
            //EmpDed:x
        }),
        contentType: 'application/json; charset=utf-8',
        dataType: "Json",
        type: "POST",
        success: function (data) {
            if (data > 1) {
                alert("Successfully Saved..!");
                LoadLeaveInfoGrid(); // update grid
                LoadLeaveGrid();
                GridDeleteRowIndex = -1;
            } else {
                alert("Record Not Saved");
                LoadLeaveInfoGrid(); // update grid
                LoadLeaveGrid();
                GridDeleteRowIndex = -1;
            }
        },
        error: function (e) {
            alert("Record Not Saved");
            LoadLeaveInfoGrid();
            LoadLeaveGrid();
            GridDeleteRowIndex = -1;
            return false;
        }
    });
}