$(document).ready(function () {
    var OurCode = "@(ViewBag.ObjCaptn)";
    LoadDropDown();
    //Load the tooltip //COmmo srcipt
    Tooltip();
    //Selecting the text//COmmo srcipt
    SelectText();
    LoadAcadamicDetailGrid();

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
    $("#cmbSubject").kendoComboBox({
        dataValueField: "CdKy",
        dataTextField: "CdNm",
        dataSource: GetCdMas_LookupWeb('A/LSub'),
        filter: "contains",
        suggest: true,
        placeholder: "Select a Subject"
    });
    $("#cmbGrade").kendoComboBox({
        dataValueField: "CdKy",
        dataTextField: "CdNm",
        dataSource: GetCdMas_LookupWeb('grade'),
        filter: "contains",
        suggest: true,
        placeholder: "Select a Grade"
    });
}

function clearfunction() {
    document.getElementById("year").value = "";
    document.getElementById("institute").value = "";

    $("#cmbSubject").data("kendoComboBox").value("");
    $("#cmbGrade").data("kendoComboBox").value("");
}

function LoadAcadamicDetailGrid() {
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
                    Subject: { editable: true, nullable: false, type: "string" },
                    SubjectKy: { editable: true, nullable: false, type: "number" },
                    Grade: { editable: true, nullable: false, type: "string" },
                    GradeKy: { editable: true, nullable: false, type: "number" }
                }
            }
        },
    });

    $("#Al_AcadQualGrid").kendoGrid({
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
                width: "150px",
            },
            {
                field: "Subject",
                title: "Subject",
                //width: "120px",
                hidden: true,
            },
            {
                field: "SubjectKy",
                title: "Subject Ky",
                //width: "120px",
                hidden: true,
            },
            {
                field: "Grade",
                title: "Grade",
                width: "50px",

            },
            {
                field: "GradeKy",
                title: "Grade Ky",
                // width: "120px",
                hidden: true,
            },
        ]
    });
}



function InsertToGrid() {
    var grid = $("#Al_AcadQualGrid").data("kendoGrid");
    var dataSource1 = grid.dataSource;
    var total = dataSource1.data().length;
    var year_al = $('#year').val();
    var HiddenYear = $('#Hiddenyear').val();
    var institute_al = $('#institute').val();
    var cmbSubject_al = $("#cmbSubject").data("kendoComboBox").text();
    var cmbSubject_alKy = 1;//$("#cmbSubject").data("kendoComboBox").value();
    var cmbGrade_al = $("#cmbGrade").data("kendoComboBox").text();
    var cmbGrade_alKy = $("#cmbGrade").data("kendoComboBox").value();
    grid.dataSource.insert(
        total,
        {
            LiNo: total + 1,
            Year: year_al,
            HiddenYear: HiddenYear,
            Institute: institute_al,
            Subject: cmbSubject_al,
            SubjectKy: cmbSubject_alKy,
            Grade: cmbGrade_al,
            GradeKy: cmbGrade_alKy
        });
    clearfunction();
}


function SaveDetails(action) {
    var EmpNo = document.getElementById("EmpNo").value;
    var EmpNm = document.getElementById("EmpNm").value;
    var EmpKy = document.getElementById("EmpKy").value;


    var grid = $("#Al_AcadQualGrid").data("kendoGrid");
    var dataSource = grid.dataSource;

    //records on current view / page   
    var recordsOnCurrentView = dataSource.view().length;
    //total records
    var totalRecords = dataSource.total();

    var grid = $("#Al_AcadQualGrid").data("kendoGrid");
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
        url: urlInsertAl_AcadDet,
        data: JSON.stringify({
            EmpAlData: kendo.stringify(newRecords),
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
    var grid = $("#Al_AcadQualGrid").data("kendoGrid");
    grid.dataSource.data([]);
}

function AfterFindEmp(EmpKy) {
    clearfunction();
    $.ajax({
        url: urlGetAl_AcadDet,
        data: {
            EmpKy: EmpKy
        },
        dataType: "Json",
        type: "POST",
        success: function (data) {
            $("#Al_AcadQualGrid").data("kendoGrid").dataSource.data(data);
        },
        error: function (e) {
            return false;
        }
    });
}
