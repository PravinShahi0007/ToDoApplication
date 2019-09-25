$(document).ready(function () {
    var OurCode = "@(ViewBag.ObjCaptn)";
    LoadDropDown();
    Tooltip();
    SelectText();
    LoadBasicDetailGrid();

    $(document).keydown(function (e) {
        if (e.which === 32 && e.ctrlKey) {
            InsertToGrid();
        }
        else if (e.which === 90 && e.ctrlKey) {
            InsertToGrid();
        }
    });
});

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
    $("#cmbMonth").kendoComboBox({
        dataValueField: "CdKy",
        dataTextField: "CdNm",
        dataSource: GetCdMas_LookupWeb('months'),
        filter: "contains",
        suggest: true,
        placeholder: "Select a month"
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
function LoadBasicDetailGrid() {
    var dataSource = new kendo.data.DataSource({
        batch: true,
        pageSize: 10,
        schema: {
            model: {
                id: "EmpKy",
                fields: //Relavent fields of the grid should be bind with following model items
                {
                    LiNo: { editable: false, nullable: false, type: "number" },
                    Year: { editable: true, nullable: false, type: "string" },
                    Month: { editable: true, nullable: false, type: "string" },
                    MonthKy: { editable: true, nullable: false, type: "number" },
                    ReviewSent: { editable: true, nullable: false, type: "string" },
                    ReviewReceived: { editable: true, nullable: false, type: "string" },
                    OverallGrade: { editable: true, nullable: false, type: "string" },
                    ReviewPerson: { editable: true, nullable: false, type: "string" },
                    FilePath: { editable: true, nullable: false, type: "string" }
                }
            }
        },
    });
    $("#AnnualPerformanceGrid").kendoGrid({
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
                field: "Year",
                title: "Year",
                width: "100px",
            },
            {
                field: "Month",
                title: "Month",
                width: "50px",
            },
            {
                field: "MonthKy",
                title: "Month",
                hidden: true,
                //width: "50px",
            },
            {
                field: "ReviewSent",
                title: "Review Sent",
                width: "120px",
            },
            {
                field: "ReviewReceived",
                title: "Review Received",
                width: "100px",

            },
            {
                field: "OverallGrade",
                title: "Overall Grade",
                width: "100px",
            },
            {
                field: "ReviewPerson",
                title: "Review Person",
                width: "100px",
            },
            {
                field: "FilePath",
                title: "FilePath",
                width: "100px",
            },
        ]
    });
}

function InsertToGrid() {

    var grid = $("#AnnualPerformanceGrid").data("kendoGrid");
    var dataSource1 = grid.dataSource;
    var total = dataSource1.data().length;
    //alert(0)
    var Year = $('#year').val();
    var Month = $("#cmbMonth").data("kendoComboBox").text();
    var MonthKy = (!$("#cmbMonth").data("kendoComboBox").value()) ? 1 : $("#cmbMonth").data("kendoComboBox").value();
    var ReviewSent = $('#reviewSent').val();
    var ReviewReceived = $('#reviewReceived').val();
    var OverallGrade = $('#overallGrade').val();
    var ReviewPerson = $('#reviewPerson').val();
    //var FilePath = $('#files').val();
    var FilePath = document.getElementById('files').files[0];
    //alert(1)


    grid.dataSource.insert(
        total,
        {
            LiNo: total + 1,
            Year: Year,
            Month: Month,
            MonthKy: MonthKy,
            ReviewSent: ReviewSent,
            ReviewReceived: ReviewReceived,
            OverallGrade: OverallGrade,
            ReviewPerson: ReviewPerson,
            FilePath: FilePath
        });
    //alert(2)
}


function SaveDetails(action) {

    var EmpNo = document.getElementById("EmpNo").value;
    var EmpNm = document.getElementById("EmpNm").value;
    var EmpKy = document.getElementById("EmpKy").value;


    var grid = $("#AnnualPerformanceGrid").data("kendoGrid");
    var dataSource = grid.dataSource;

    //records on current view / page   
    var recordsOnCurrentView = dataSource.view().length;
    //total records
    var totalRecords = dataSource.total();

    var grid = $("#AnnualPerformanceGrid").data("kendoGrid");
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
        url: urlInsertAnnualPerDet,
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
    var grid = $("#AnnualPerformanceGrid").data("kendoGrid");
    grid.dataSource.data([]);
}

function AfterFindEmp(EmpKy) {
    $.ajax({
        url: urlGetAnnualPerDet,
        data: {
            EmpKy: EmpKy
        },
        dataType: "Json",
        type: "POST",
        success: function (data) {
            $("#AnnualPerformanceGrid").data("kendoGrid").dataSource.data(data);
        },
        error: function (e) {
            return false;
        }
    });
}