$(document).ready(function () {//alert(0);
    var OurCode = "@(ViewBag.ObjCaptn)";
    LoadDropDown();
    //Load the tooltip //COmmo srcipt
    Tooltip();
    //Selecting the text//COmmo srcipt
    SelectText();
    LoadDatePicker();
    var todayDate = new Date();
    $("#dateOfBirth").data("kendoDatePicker").value(todayDate);
    $("#dateOfDesmise").data("kendoDatePicker").value(todayDate);
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

function LoadDatePicker() {

    $("#dateOfDesmise").kendoDatePicker({

        format: "dd/MM/yyyy",
        min: new Date(31, 2, 1920)
    });
    $("#dateOfBirth").kendoDatePicker({

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
    $("#cmbRelationship").kendoComboBox({
        dataValueField: "CdKy",
        dataTextField: "CdNm",
        dataSource: GetCdMas_LookupWeb('Relationship'),
        filter: "contains",
        suggest: true,
        placeholder: "Select a Relationship"
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
                    DateofDesmise: { editable: true, nullable: false, type: "string" },
                    Description: { editable: true, nullable: false, type: "string" },
                    DateofBirth: { editable: true, nullable: false, type: "string" },
                    NIC: { editable: true, nullable: false, type: "string" },
                    Relationship: { editable: true, nullable: false, type: "string" },
                    RelationshipKy: { editable: true, nullable: false, type: "number" },
                }
            }
        },
    });
    $("#WelfareFuneralGrd").kendoGrid({
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
                field: "DateofDesmise",
                title: "Date of Desmise",
                width: "70px",
            },
            {
                field: "Description",
                title: "Description",
                width: "100px",
            },
            {
                field: "DateofBirth",
                title: "Date of Birth",
                width: "70px",
            },
            {
                field: "NIC",
                title: "NIC",
                width: "70px",
            },
            {
                field: "Relationship",
                title: "Relationship",
                width: "70px",
            },
            {
                field: "RelationshipKy",
                title: "Relationship",
                hidden: true,
            },
        ]
    });
}

function InsertToGrid() {

    var grid = $("#WelfareFuneralGrd").data("kendoGrid");
    var dataSource1 = grid.dataSource;
    var total = dataSource1.data().length;

    var DateofDesmise = $('#dateOfDesmise').val();
    var Description = $('#description').val();
    var DateofBirth = $('#dateOfBirth').val();
    var NIC = $('#nicNo').val();


    var Relationship = $("#cmbRelationship").data("kendoComboBox").text();
    var RelationshipKy = $("#cmbRelationship").data("kendoComboBox").value();



    grid.dataSource.insert(
        total,
        {
            LiNo: total + 1,
            DateofDesmise: DateofDesmise,
            Description: Description,
            DateofBirth: DateofBirth,
            NIC: NIC,
            Relationship: Relationship,
            RelationshipKy: RelationshipKy
        });

}



function SaveDetails(action) {
    var EmpNo = document.getElementById("EmpNo").value;
    var EmpNm = document.getElementById("EmpNm").value;
    var EmpKy = document.getElementById("EmpKy").value;


    var grid = $("#WelfareFuneralGrd").data("kendoGrid");
    var dataSource = grid.dataSource;

    //records on current view / page   
    var recordsOnCurrentView = dataSource.view().length;
    //total records
    var totalRecords = dataSource.total();

    var grid = $("#WelfareFuneralGrd").data("kendoGrid");
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
        url: urlInsertFuneralDet,
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
    var grid = $("#WelfareFuneralGrd").data("kendoGrid");
    grid.dataSource.data([]);
}

function AfterFindEmp(EmpKy) {
    $.ajax({
        url: urlGetFuneralDet,
        data: {
            EmpKy: EmpKy
        },
        dataType: "Json",
        type: "POST",
        success: function (data) {
            $("#WelfareFuneralGrd").data("kendoGrid").dataSource.data(data);
        },
        error: function (e) {
            return false;
        }
    });
}
