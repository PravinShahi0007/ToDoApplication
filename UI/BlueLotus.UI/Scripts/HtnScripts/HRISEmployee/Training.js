$(document).ready(function () {
    var OurCode = "@(ViewBag.ObjCaptn)";
    LoadDropDown();
    //Load the tooltip //COmmo srcipt
    Tooltip();
    //Selecting the text//COmmo srcipt
    SelectText();
    LoadTraininDetailGrid();
    LoadDatePicker();
    $("#BondHide").hide();
    $("#TrainingBond").change(function () {
        if ($('#TrainingBond').is(":checked")) {
            $("#BondHide").show();
        } else {
            $("#BondHide").hide();
        }
    });
    $(document).keydown(function (e) {
        if (e.which === 32 && e.ctrlKey) {
            //alert('control + y');
            InsertToGrid();
        }
        else if (e.which === 90 && e.ctrlKey) {
            //alert('control + z');
            InsertToGrid();
        }
    });
});

function clearfunction() {
    document.getElementById("programme").value = "";
    document.getElementById("trainingInstitute").value = "";
    document.getElementById("intructor").value = "";
    document.getElementById("duration").value = "";
    document.getElementById("trainingFree").value = "";
    document.getElementById("Amount").value = "";

    $("#cmbProgrammeType").data("kendoComboBox").value("");
    $("#cmbEvaluation").data("kendoComboBox").value("");

    $("#ToDate").data("kendoDatePicker").value("");
    $("#FromDate").data("kendoDatePicker").value("");
}

function LoadDatePicker() {

    $("#FromDate").kendoDatePicker({
        format: "dd/MM/yyyy",
        min: new Date(31, 2, 1920)
    });
    $("#ToDate").kendoDatePicker({
        format: "dd/MM/yyyy",
        min: new Date(31, 2, 2010)
    });
    $(".k-datepicker, .k-combobox, .k-numerictextbox,.k-input").css('width', "100%");
}

function AfterFindEmp(EmpKy) {
    clearfunction();
    $.ajax({
        url: UrlGetEmpTrainingDet,
        data: {
            EmpKy: EmpKy
        },
        dataType: "Json",
        type: "POST",
        success: function (data) {
            $("#TrainingDetailsGrid").data("kendoGrid").dataSource.data(data);
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
                    TrainingFree: { editable: true, nullable: false, type: "string" },
                    TrainingBond: { editable: true, nullable: false, type: "number" }
                }
            }
        },
    });
    $("#TrainingDetailsGrid").kendoGrid({
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
            },

            {
                field: "ProgrammeTypeKy",
                title: "Programme Type",
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
                hidden: true,

            },
            {
                field: "TrainingFree",
                title: "Training Free",
                width: "120px",
            },
            {
                field: "TrainingBond",
                title: "Bond",
                width: "50px",
            },
            {
                field: "Amount",
                title: "Amount",
                width: "50px",

            },
            {
                field: "FromDate",
                title: "From Date",
                width: "70px",
            },
            {
                field: "ToDate",
                title: "To Date",
                width: "70px",
            },
        ]
    });
}




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
    var TrainingBond = 0;
    if ($('#TrainingBond').is(":checked")) {
        TrainingBond = 1;
    } else {
        TrainingBond = 0;
    }

    var Amount = $('#Amount').val();
    var FromDate = $('#FromDate').val();
    var ToDate = $('#ToDate').val();

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
            TrainingFree: trainingFree,
            TrainingBond: TrainingBond,
            Amount: Amount,
            FromDate: FromDate,
            ToDate: ToDate
        });
    clearfunction();
}


function SaveDetails(action) {

    var EmpNo = document.getElementById("EmpNo").value;
    var EmpNm = document.getElementById("EmpNm").value;
    var EmpKy = document.getElementById("EmpKy").value;

    var grid = $("#TrainingDetailsGrid").data("kendoGrid");
    var dataSource = grid.dataSource;

    //records on current view / page   
    var recordsOnCurrentView = dataSource.view().length;
    //total records
    var totalRecords = dataSource.total();

    var grid = $("#TrainingDetailsGrid").data("kendoGrid");
    var currentData = grid.dataSource.data();
    var updatedRecords = [];
    var newRecords = [];

    for (var i = 0; i < currentData.length; i++) {
        if (currentData[i].isNew()) {
            newRecords.push(currentData[i].toJSON());
        } else if (currentData[i].Dirty == "Dirty" && currentData[i].AccTrnKy > 0) {
            updatedRecords.push(currentData[i].toJSON());
        }
    }

    var newRecordsHdr = {
        EmpKy: EmpKy,
        EmpNm: EmpNm,
        EmpNo: EmpNo
    }

    $.ajax({
        url: urlInsertTrainingDet,
        data: JSON.stringify({
            EmpHdr: JSON.stringify(newRecordsHdr),
            EmpTrainingDet: kendo.stringify(newRecords)
        }),
        contentType: 'application/json; charset=utf-8',
        dataType: "Json",
        type: "POST",
        success: function (data) {
            ClearGriddetails();
            alert('Saved Succesfuly..');
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