$(document).ready(function () {//alert(0);
    var OurCode = "@(ViewBag.ObjCaptn)";
    LoadDropDown();
    //Load the tooltip //COmmo srcipt
    Tooltip();
    //Selecting the text//COmmo srcipt
    SelectText();
    LoadAcadamicDetailGrid();
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

function AfterFindEmp(EmpKy) {
    clearfunction();
    $.ajax({
        url: urlGetSL_AcadDet,
        data: {
            EmpKy: EmpKy
        },
        dataType: "Json",
        type: "POST",
        success: function (data) {
            $("#SLeaversGrid").data("kendoGrid").dataSource.data(data);
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
    $("#cmbGrade_college").kendoComboBox({
        dataValueField: "CdKy",
        dataTextField: "CdNm",
        dataSource: GetCdMas_LookupWeb('grade'),
        filter: "contains",
        suggest: true,
        placeholder: "Select a Grade"
    });

}



function LoadAcadamicDetailGrid() {
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
                    Year: { editable: true, nullable: false, type: "string" },
                    HiddenYear: { editable: true, nullable: false, type: "string" },
                    Institute: { editable: true, nullable: false, type: "string" },
                    Grade: { editable: true, nullable: false, type: "string" },
                    GradeKy: { editable: true, nullable: false, type: "number" },
                    Reason: { editable: true, nullable: false, type: "string" }
                }
            }
        },
    });
    //alert(1);
    $("#SLeaversGrid").kendoGrid({
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
                width: "50px",
            },
            {
                field: "HiddenYear",
                title: "Year",
                //width: "120px",
                hidden: true,
            },
            {
                field: "Institute",
                title: "Institute",
                width: "100px",
            },
            {
                field: "Grade",
                title: "Grade",
                width: "70px",

            },
            {
                field: "Gradey",
                title: "Grade Ky",
                // width: "120px",
                hidden: true,
            },
            {
                field: "Reason",
                title: "Reason",
                width: "120px",
            },
        ]
    });
}

function clearfunction() {
    document.getElementById("year_college").value = "";
    document.getElementById("institute_college").value = "";
    document.getElementById("reasonToLeave").value = "";

    $("#cmbGrade_college").data("kendoComboBox").value("");
}

function InsertToGrid() {
    var grid = $("#SLeaversGrid").data("kendoGrid");
    var dataSource1 = grid.dataSource;
    var total = dataSource1.data().length;

    var year_college = $('#year_college').val();
    var institute_college = $('#institute_college').val();
    var HiddenYear = $('#HiddenYear').val();
    var cmbGrade_college = $("#cmbGrade_college").data("kendoComboBox").text();
    var cmbGrade_collegeKy = $("#cmbGrade_college").data("kendoComboBox").value();
    var reasonToLeave = $('#reasonToLeave').val();

    grid.dataSource.insert(
        total,
        {
            LiNo: total + 1,
            Year: year_college,
            HiddenYear: HiddenYear,
            Institute: institute_college,
            Grade: cmbGrade_college,
            GradeKy: cmbGrade_collegeKy,
            Reason: reasonToLeave
        });
    clearfunction();
}

function SaveDetails(action) {
    var EmpNo = document.getElementById("EmpNo").value;
    var EmpNm = document.getElementById("EmpNm").value;
    var EmpKy = document.getElementById("EmpKy").value;


    var grid = $("#SLeaversGrid").data("kendoGrid");
    var dataSource = grid.dataSource;

    //records on current view / page   
    var recordsOnCurrentView = dataSource.view().length;
    //total records
    var totalRecords = dataSource.total();

    var grid = $("#SLeaversGrid").data("kendoGrid");
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
        url: urlInsertSL_AcadDet,
        data: JSON.stringify({
            EmpSLData: kendo.stringify(newRecords),
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
    var grid = $("#SLeaversGrid").data("kendoGrid");
    grid.dataSource.data([]);
}