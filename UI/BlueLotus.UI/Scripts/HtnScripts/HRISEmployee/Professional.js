$(document).ready(function () {
    var OurCode = "@(ViewBag.ObjCaptn)";
    LoadDropDown(); 
    LoadDatePicker();
    Tooltip();
    SelectText();
    var todayDate = new Date();
    $("#fromDate").data("kendoDatePicker").value(todayDate);

    LoadProfDetailGrid();

    //$(window).keypress(function (event) {
    //    if (!(event.which == 115 && event.ctrlKey) && !(event.which == 19)) return true;
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

function AfterFindEmp(EmpKy) {
    $.ajax({
        url: UrlGetEmpProfDet,
        data: {
            EmpKy: EmpKy
        },
        dataType: "Json",
        type: "POST",
        success: function (data) {
            $("#ProfDetGrid").data("kendoGrid").dataSource.data(data);
        },
        error: function (e) {
            // alert(0);
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
    $("#cmbGrade").kendoComboBox({
        dataValueField: "CdKy",
        dataTextField: "CdNm",
        dataSource: GetCdMas_LookupWeb('ProfeGrade'),
        filter: "contains",
        suggest: true,
        placeholder: "Select a Grade"
    });
    $("#cmbMedium").kendoComboBox({
        dataValueField: "CdKy",
        dataTextField: "CdNm",
        dataSource: GetCdMas_LookupWeb('Medium'),
        filter: "contains",
        suggest: true,
        placeholder: "Select a medium"
    });
}

function LoadDatePicker() {

    $("#fromDate").kendoDatePicker({

        format: "dd/MM/yyyy",
        min: new Date(31, 2, 1920)
    });

    $(".k-datepicker, .k-combobox, .k-numerictextbox,.k-input").css('width', "100%");

}



function LoadProfDetailGrid() {
    var dataSource = new kendo.data.DataSource({
        batch: true,
        pageSize: 10,
        schema: {
            model: {
                id: "EmpKy",
                fields: //Relavent fields of the grid should be bind with following model items
                {
                    LiNo: { editable: false, nullable: false, type: "number" },
                    FromDate: { editable: true, nullable: false, type: "string" },
                    Qualification: { editable: true, nullable: false, type: "string" },
                    Institute: { editable: true, nullable: false, type: "string" },
                    MediumKy: { editable: true, nullable: false, type: "number" },
                    Medium: { editable: true, nullable: false, type: "string" },
                    GradeKy: { editable: true, nullable: false, type: "number" },
                    Grade: { editable: true, nullable: false, type: "string" }
                }
            }
        },
    });
    $("#ProfDetGrid").kendoGrid({
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
                field: "FromDate",
                title: "From Date",
                width: "100px",
            },
            {
                field: "Qualification",
                title: "Qualification",
                width: "100px",
            },
            {
                field: "Institute",
                title: "Institute",
                width: "100px",
            },
            {
                field: "MediumKy",
                title: "Medium",
                //width: "120px",
                hidden: true,

            },
            {
                field: "Medium",
                title: "Medium",
                width: "100px",
            },
            {
                field: "GradeKy",
                title: "Grade",
                //width: "100px",
                hidden: true,
            },
            {
                field: "Grade",
                title: "Grade",
                width: "120px",
            },
        ]
    });
}




function InsertToGrid() {
    var grid = $("#ProfDetGrid").data("kendoGrid");
    var dataSource1 = grid.dataSource;
    var total = dataSource1.data().length;
    var fromDate = $('#fromDate').val();
    var qualification = $('#qualification').val();
    var institute = $('#institute').val();
    var Medium = $("#cmbMedium").data("kendoComboBox").text();
    var MediumKy = $("#cmbMedium").data("kendoComboBox").value();
    var Grade = $("#cmbGrade").data("kendoComboBox").text();
    var GradeKy = $("#cmbGrade").data("kendoComboBox").value();
    grid.dataSource.insert(
        total,
        {
            LiNo: total + 1,
            FromDate: fromDate,
            Qualification: qualification,
            Institute: institute,
            MediumKy: MediumKy,
            Medium: Medium,
            GradeKy: GradeKy,
            Grade: Grade
        });
}

function SaveDetails(action) {

    var EmpNo = document.getElementById("EmpNo").value;
    var EmpNm = document.getElementById("EmpNm").value;
    var EmpKy = document.getElementById("EmpKy").value;

    var grid = $("#ProfDetGrid").data("kendoGrid");
    var dataSource = grid.dataSource;

    //records on current view / page   
    var recordsOnCurrentView = dataSource.view().length;
    //total records
    var totalRecords = dataSource.total();

    var grid = $("#ProfDetGrid").data("kendoGrid");
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
        url: urlInsertProfDet,
        data: JSON.stringify({
            EmpHdr: JSON.stringify(newRecordsHdr),
            EmpProfDet: kendo.stringify(newRecords)
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
    var grid = $("#ProfDetGrid").data("kendoGrid");
    grid.dataSource.data([]);
}