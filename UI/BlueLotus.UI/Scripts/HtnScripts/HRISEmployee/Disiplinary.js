$(document).ready(function () {
    var OurCode = "@(ViewBag.ObjCaptn)";
    LoadDropDown();
    //Load the tooltip //COmmo srcipt
    Tooltip();
    //Selecting the text//COmmo srcipt
    SelectText();
    LoadDatePicker();
    var todayDate = new Date();
    $("#date").data("kendoDatePicker").value(todayDate);
    //add savebutton
    //SelectHomeCurey();
    LoadDisiplinaryGrid();
    //$(window).keypress(function (event) {
    //    if (!(event.which == 115 && event.ctrlKey) && !(event.which == 19)) return true;
    //    //alert("Ctrl-S pressed");
    //    InsertToGrid();
    //    event.preventDefault();
    //    return false;
    //});

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

function LoadDatePicker() {
    $("#date").kendoDatePicker({
        format: "dd/MM/yyyy",
        min: new Date(31, 2, 1920)
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
    $("#cmbTypeofMisconduct").kendoComboBox({
        dataValueField: "CdKy",
        dataTextField: "CdNm",
        dataSource: GetCdMas_LookupWeb('TrnspTyp'),
        filter: "contains",
        suggest: true,
        placeholder: "Select a Misconduct"
    });
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

//Load Gid Details
function LoadDisiplinaryGrid() {
    var dataSource = new kendo.data.DataSource({
        batch: true,
        pageSize: 10,
        schema: {
            model: {
                id: "EmpKy",
                fields: //Relavent fields of the grid should be bind with following model items
                {
                    LiNo: { editable: false, nullable: false, type: "number" },
                    Date: { editable: true, nullable: false, type: "string" },
                    Misconduct: { editable: true, nullable: false, type: "string" },
                    MisconductKy: { editable: true, nullable: false, type: "number" },
                    Incident: { editable: true, nullable: false, type: "string" },
                    StepTaken: { editable: true, nullable: false, type: "string" },
                    FinalOutcome: { editable: true, nullable: false, type: "string" }
                }
            }
        },
    });
    $("#DisiplinaryGrid").kendoGrid({
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
                field: "Date",
                title: "Date",
                width: "50px",
            },
            {
                field: "Misconduct",
                title: "Misconduct",
                width: "50px",
            },
            {
                field: "MisconductKy",
                title: "MisconductKy",
                hidden: true,
                //width: "50px",
            },
            {
                field: "Incident",
                title: "Incident",
                width: "120px",
            },
            {
                field: "StepTaken",
                title: "StepTaken",
                width: "100px",

            },
            {
                field: "FinalOutcome",
                title: "FinalOutcome",
                width: "100px",
            },
        ]
    });
}


function InsertToGrid() {
    var grid = $("#DisiplinaryGrid").data("kendoGrid");
    var dataSource1 = grid.dataSource;
    var total = dataSource1.data().length;

    var Date = $('#date').val();
    var Misconduct = $("#cmbTypeofMisconduct").data("kendoComboBox").text();
    var MisconductKy = (!$("#cmbTypeofMisconduct").data("kendoComboBox").value()) ? 1 : $("#cmbTypeofMisconduct").data("kendoComboBox").value();
    var Incident = $('#incident').val();
    var StepTaken = $('#stepTaken').val();
    var FinalOutcome = $('#finalOutcome').val();


    grid.dataSource.insert(
        total,
        {
            LiNo: total + 1,
            Date: Date,
            Misconduct: Misconduct,
            MisconductKy: MisconductKy,
            Incident: Incident,
            StepTaken: StepTaken,
            FinalOutcome: FinalOutcome
        });

}



function SaveDetails(action) {

    var EmpNo = document.getElementById("EmpNo").value;
    var EmpNm = document.getElementById("EmpNm").value;
    var EmpKy = document.getElementById("EmpKy").value;


    var grid = $("#DisiplinaryGrid").data("kendoGrid");
    var dataSource = grid.dataSource;

    //records on current view / page   
    var recordsOnCurrentView = dataSource.view().length;
    //total records
    var totalRecords = dataSource.total();

    var grid = $("#DisiplinaryGrid").data("kendoGrid");
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
        url: urlInsertDisiplinaryDet,
        data: JSON.stringify({
            EmpData: kendo.stringify(newRecords),
            EmpHdr: JSON.stringify(newRecordsHdr)
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
    }
}

function ClearGriddetails() {
    var grid = $("#DisiplinaryGrid").data("kendoGrid");
    grid.dataSource.data([]);
}

function AfterFindEmp(EmpKy) {
    $.ajax({
        url: urlGetDisiplinaryDet,
        data: {
            EmpKy: EmpKy
        },
        dataType: "Json",
        type: "POST",
        success: function (data) {
            $("#DisiplinaryGrid").data("kendoGrid").dataSource.data(data);
        },
        error: function (e) {
            return false;
        }
    });
}
