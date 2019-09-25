$(document).ready(function () {
    var OurCode = "@(ViewBag.ObjCaptn)";
    //LoadDropDown();
    //Load the tooltip //COmmo srcipt
    Tooltip();
    //Selecting the text//COmmo srcipt
    SelectText();

    LoadDatePicker();
    LoadTraininDetailGrid();

    var todayDate = new Date();
    $("#FromDate").data("kendoDatePicker").value(todayDate);
    $("#ToDate").data("kendoDatePicker").value(todayDate);

    //$(window).keypress(function (event) {
    //    if (!(event.which == 115 && event.ctrlKey) && !(event.which == 19)) return true;
    //   // InsertToGrid();
    //    event.preventDefault();
    //    return false;
    //});
    $(window).keypress(function (event) {
        if (!(event.which == 115 && event.ctrlKey) && !(event.which == 19)) return true;
        //alert("Ctrl-S pressed");
        InsertToGrid();
        event.preventDefault();
        return false;
    });
});


function clearfunction() {
    document.getElementById("amount").value = "";
    var todayDate = new Date();
    $("#fromDate").data("kendoDatePicker").value(todayDate);
    $("#cmbAllowenceType").data("kendoComboBox").value("");
}

function LoadDatePicker() {
    $("#FromDate").kendoDatePicker({

        format: "dd/MM/yyyy",
        min: new Date(31, 2, 2010)
    });
    $("#ToDate").kendoDatePicker({

        format: "dd/MM/yyyy",
        min: new Date(31, 2, 2010)
    });
    $(".k-datepicker, .k-combobox, .k-numerictextbox,.k-input").css('width', "100%");

}

function AfterFindEmp(EmpKy) {
    $.ajax({
        url: UrlGetEmpTrainingDet,
        data: {
            EmpKy: EmpKy
        },
        dataType: "Json",
        type: "POST",
        success: function (data) {
            //$("#TrainingDetailsGrid").data("kendoGrid").dataSource.data(data);
        },
        error: function (e) {
            return false;
        }
    });
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
//Load The Drop DownList
function LoadDropDown() {
    $("#cmbProgrammeType").kendoComboBox({
        dataValueField: "CdKy",
        dataTextField: "CdNm",
        dataSource: GetCdMas_LookupWeb('ProgrammeType'),
        filter: "contains",
        suggest: true,
        placeholder: "Select a Programme"
    });
    $("#cmbEvaluation").kendoComboBox({
        dataValueField: "CdKy",
        dataTextField: "CdNm",
        dataSource: GetCdMas_LookupWeb('Evaluation'),
        filter: "contains",
        suggest: true,
        placeholder: "Select a Evaluation"
    });

}





function LoadTraininDetailGrid() {
    // alert(0);
    var dataSource = new kendo.data.DataSource({
        batch: true,
        pageSize: 10,
        schema: {
            model: {
                id: "EmpKy",
                fields: //Relavent fields of the grid should be bind with following model items
                {
                    LiNo: { editable: false, nullable: false, type: "number" },
                    programme: { editable: true, nullable: false, type: "string" },
                    TrainingInstitute: { editable: true, nullable: false, type: "string" },
                    Intructor: { editable: true, nullable: false, type: "string" },
                    Duration: { editable: true, nullable: false, type: "string" },
                    ProgrammeType: { editable: true, nullable: false, type: "int" },
                    ProgrammeTypeKy: { editable: true, nullable: false, type: "number" },
                    Evaluation: { editable: true, nullable: false, type: "string" },
                    EvaluationKy: { editable: true, nullable: false, type: "number" },
                    TrainingFree: { editable: true, nullable: false, type: "string" }
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
        pageSize: 10,
        pageable: true,
        selectable: "row",
        resizable: true,
        pageable: { refresh: true, pageSizes: [5, 10, 20, 50, 100] },

        columns: [
            {
                field: "LiNo",
                title: "LiNo",
                width: "40px",
                attributes: { class: "ob-Center" }
            },
            {
                field: "Programme",
                title: "Programme",
                width: "100px",
            },
            {
                field: "TrainingInstitute",
                title: "Training Institute",
                width: "100px",
            },
            {
                field: "Intructor",
                title: "Instructor",
                width: "120px",
            },
            {
                field: "Duration",
                title: "Duration",
                width: "120px",

            },
            {
                field: "ProgrammeType",
                title: "Programme Type",
                width: "100px",
                //hidden: true,

            },

            {
                field: "ProgrammeTypeKy",
                title: "Programme Type",
                //width: "100px",
                hidden: true,
            },
            {
                field: "Evaluation",
                title: "Evaluation",
                width: "120px",
            },
            {
                field: "EvaluationKy",
                title: "Evaluation",
                //width: "100px",
                hidden: true,

            },
            {
                field: "TrainingFree",
                title: "Training Free",
                width: "120px",
            },
        ]
    });
}
$('input[type="text"]').change(function () {
    var id = $(this).attr('id');
    var res = id.split("_");
    chaneevent(res[0]);
});
function chaneevent(id) {
        var val = $("#"+id+"_Elagible").val();
        var val2 = $("#" + id + "_Taken").val();
        $("#" + id + "_Balance").val(val - val2);
}

//$("#AnnualTaken").change(function () {
//    var id = $('selector').attr('id');
//    var val = $("#AnnualElagible").val();
//    var val2 = $("#AnnualTaken").val();
//    $("#AnnualBalance").val(val - val2);
//});


function InsertToGrid() {
    var grid = $("#TrainingDetailsGrid").data("kendoGrid");
    var dataSource1 = grid.dataSource;
    var total = dataSource1.data().length;
    var programme = $('#programme').val();
    var trainingInstitute = $('#trainingInstitute').val();
    var intructor = $('#intructor').val();
    var duration = $('#duration').val();
    var cmbProgrammeType = $("#cmbProgrammeType").data("kendoComboBox").text();
    var cmbProgrammeTypeKy = $("#cmbProgrammeType").data("kendoComboBox").value();
    var cmbEvaluation = $("#cmbEvaluation").data("kendoComboBox").text();
    var cmbEvaluationKy = $("#cmbEvaluation").data("kendoComboBox").value();
    var trainingFree = $('#trainingFree').val();
    grid.dataSource.insert(
        total,
        {
            LiNo: total + 1,
            Programme: programme,
            TrainingInstitute: trainingInstitute,
            Intructor: intructor,
            Duration: duration,
            ProgrammeType: cmbProgrammeType,
            ProgrammeTypeKy: cmbProgrammeTypeKy,
            Evaluation: cmbEvaluation,
            EvaluationKy: cmbEvaluationKy,
            TrainingFree: trainingFree
        });
}


function SaveDetails(action) {
    //alert(0);

    var Annual_Elagible = document.getElementById("Annual_Elagible").value;
    var Medical_Elagible = document.getElementById("Medical_Elagible").value;
    var Casual_Elagible = document.getElementById("Casual_Elagible").value;
    var Maternity_Elagible = document.getElementById("Maternity_Elagible").value;
    var Duty_Elagible = document.getElementById("Duty_Elagible").value;
    var OverSea_Elagible = document.getElementById("OverSea_Elagible").value;

    var Annual_Taken = document.getElementById("Annual_Taken").value;
    var Medical_Taken = document.getElementById("Medical_Taken").value;
    var Casual_Taken = document.getElementById("Casual_Taken").value;
    var Maternity_Taken = document.getElementById("Maternity_Taken").value;
    var Duty_Taken = document.getElementById("Duty_Taken").value;
    var OverSea_Taken = document.getElementById("OverSea_Taken").value;


    var Annual_Balance = document.getElementById("Annual_Balance").value;
    var Medical_Balance = document.getElementById("Medical_Balance").value;
    var Casual_Balance = document.getElementById("Casual_Balance").value;
    var Maternity_Balance = document.getElementById("Maternity_Balance").value;
    var Duty_Balance = document.getElementById("Duty_Balance").value;
    var OverSea_Balance = document.getElementById("OverSea_Balance").value;


    //var grid = $("#TrainingDetailsGrid").data("kendoGrid");
    //var dataSource = grid.dataSource;

    ////records on current view / page   
    //var recordsOnCurrentView = dataSource.view().length;
    ////total records
    //var totalRecords = dataSource.total();

    //var grid = $("#TrainingDetailsGrid").data("kendoGrid");
    //var currentData = grid.dataSource.data();
    //var updatedRecords = [];
    //var newRecords = [];

    //for (var i = 0; i < currentData.length; i++) {
    //    if (currentData[i].isNew()) {
    //        newRecords.push(currentData[i].toJSON());
    //    } else if (currentData[i].Dirty == "Dirty" && currentData[i].AccTrnKy > 0) {
    //        updatedRecords.push(currentData[i].toJSON());
    //    }
    //}

    var EmpNo = document.getElementById("EmpNo").value;
    var EmpNm = document.getElementById("EmpNm").value;
    var EmpKy = document.getElementById("EmpKy").value;

    var newRecordsHdr = {
        EmpKy: EmpKy,
        EmpNm: EmpNm,
        EmpNo: EmpNo
    }
    var newRecord = {
        Annual : {
            Annual_Elagible: Annual_Elagible,
            Annual_Taken: Annual_Taken,
            Annual_Balance: Annual_Balance
        },
        Medical : {
            Medical_Elagible: Medical_Elagible,
            Medical_Taken: Medical_Taken,
            Medical_Balance: Medical_Balance
        },
        Casual : {
            Casual_Elagible: Casual_Elagible,
            Casual_Taken: Casual_Taken,
            Casual_Balance: Casual_Balance
        },
        Maternity : {
            Maternity_Elagible: Maternity_Elagible,
            Maternity_Taken: Maternity_Taken,
            Maternity_Balance: Maternity_Balance
        },
        Duty : {
            Duty_Elagible: Duty_Elagible,
            Duty_Taken: Duty_Taken,
            Duty_Balance: Duty_Balance
        },
        OverSea: {
            OverSea_Elagible: OverSea_Elagible,
            OverSea_Taken: OverSea_Taken,
            OverSea_Balance: OverSea_Balance
        }
    }

    $.ajax({
        url: urlInsertLeaveDet,
        data: JSON.stringify({
            EmpHdr: JSON.stringify(newRecordsHdr),
            EmpLeaveDet: JSON.stringify(newRecord)
        }),
        contentType: 'application/json; charset=utf-8',
        dataType: "Json",
        type: "POST",
        success: function (data) {
            ClearGriddetails();
        },
        error: function (e) {
            return false;
        }
    });
}
function SaveUpdate(action) {
    if (action == "save" || action == "saveandnew") {
        SaveDetails(action);
    } else if (action == "Update") {

    }
}

function ClearGriddetails() {
    var grid = $("#TrainingDetailsGrid").data("kendoGrid");
    grid.dataSource.data([]);
}