$(document).ready(function () {//alert(0);
    var OurCode = "@(ViewBag.ObjCaptn)";
    LoadDropDown();
    LoadDatePicker();
    //Load the tooltip //COmmo srcipt
    Tooltip();
    //Selecting the text//COmmo srcipt
    SelectText();
    var todayDate = new Date();
    $("#dateOfBirth").data("kendoDatePicker").value(todayDate);
    LoadfamilyDetailGrid();

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
        url: UrlGetEmpFamilyDet,
        data: {
            EmpKy: EmpKy
        },
        dataType: "Json",
        type: "POST",
        success: function (data) {
            $("#familyDetailGrid").data("kendoGrid").dataSource.data(data);
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
    //alert(0);
    $("#cmbRelationship").kendoComboBox({
        dataValueField: "CdKy",
        dataTextField: "Code",
        dataSource: GetCdMas_LookupWeb('relationship'),
        filter: "contains",
        suggest: true,
        placeholder: "Select a Relationship"
    });
}

function LoadDatePicker() {

    $("#dateOfBirth").kendoDatePicker({

        format: "dd/MM/yyyy",
        min: new Date(31, 2, 1920)
    });

    $(".k-datepicker, .k-combobox, .k-numerictextbox,.k-input").css('width', "100%");

}

function LoadfamilyDetailGrid() {
    var dataSource = new kendo.data.DataSource({
        batch: true,
        pageSize: 10,
        schema: {
            model: {
                id: "EmpKy",
                fields: //Relavent fields of the grid should be bind with following model items
                {
                    LiNo: { editable: false, nullable: false, type: "number" },
                    firstName: { editable: true, nullable: false, type: "string" },
                    nicNo: { editable: true, nullable: false, type: "string" },
                    dateOfBirth: { editable: true, nullable: false, type: "string" },
                    Relationship: { editable: true, nullable: false, type: "string" },
                    RelationshipKy: { editable: true, nullable: false, type: "number" }
                }
            }
        },
    });
    $("#familyDetailGrid").kendoGrid({
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
                field: "firstName",
                title: "First Name",
                width: "100px",
            },
            {
                field: "nicNo",
                title: "NIC",
                width: "50px",
            },
            {
                field: "dateOfBirth",
                title: "Date of Birth",
                width: "120px",
            },
            {
                field: "Relationship",
                title: "Relationship",
                width: "100px",
                //hidden: true,
            },
            {
                field: "RelationshipKy",
                title: "Relationship",
                //width: "100px",
                hidden: true,
            },
        ]
    });
}



function InsertToGrid() {
    var grid = $("#familyDetailGrid").data("kendoGrid");
    var dataSource1 = grid.dataSource;
    var total = dataSource1.data().length;
    var firstName = $('#firstName').val(); 
    var nicNo = $('#nicNo').val();
    var dateOfBirth = $('#dateOfBirth').val();
    var Relationship = $("#cmbRelationship").data("kendoComboBox").text();
    var RelationshipKy = (!$("#cmbRelationship").data("kendoComboBox").value()) ? 1 : $("#cmbRelationship").data("kendoComboBox").value();


    grid.dataSource.insert(
        total,
        {
            LiNo: total + 1,
            firstName: firstName,
            nicNo: nicNo,
            dateOfBirth: dateOfBirth,
            Relationship: Relationship,
            RelationshipKy: RelationshipKy
        });
}

function SaveHedder(action) {

    var EmpNo = document.getElementById("EmpNo").value;
    var EmpNm = document.getElementById("EmpNm").value;
    var EmpKy = document.getElementById("EmpKy").value;

    var grid = $("#familyDetailGrid").data("kendoGrid");
    var dataSource = grid.dataSource;

    //records on current view / page   
    var recordsOnCurrentView = dataSource.view().length;
    //total records
    var totalRecords = dataSource.total();

    var grid = $("#familyDetailGrid").data("kendoGrid");
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

        url: urlInsertFmlyDet,
        data: JSON.stringify({
            EmpfmlyData: kendo.stringify(newRecords),
            EmpFamilyHdr: JSON.stringify(newRecordsHdr)
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
        SaveHedder(action);
    } else if (action == "Update") {
        alert('update');
    }
}


function ClearGriddetails() {
    var grid = $("#familyDetailGrid").data("kendoGrid");
    grid.dataSource.data([]);

}