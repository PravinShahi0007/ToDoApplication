$(document).ready(function () {//alert(0);
    var OurCode = "@(ViewBag.ObjCaptn)";
    LoadDropDown(); //alert(32163);
    LoadDatePicker();
    //Load the tooltip //COmmo srcipt
    Tooltip();
    //Selecting the text//COmmo srcipt
    SelectText();
    var todayDate = new Date();
    $("#effectDate").data("kendoDatePicker").value(todayDate);

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
    LoadMembershipDetailGrid();

});

function AfterFindEmp(EmpKy) {
    $.ajax({
        url: urlGetMembershipDet,
        data: {
            EmpKy: EmpKy
        },
        dataType: "Json",
        type: "POST",
        success: function (data) {
            $("#MembershipDetailGrid").data("kendoGrid").dataSource.data(data);
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
    $("#cmbMembershipType").kendoComboBox({
        dataValueField: "CdKy",
        dataTextField: "Code",
        dataSource: GetCdMas_LookupWeb('MembershipType'),
        filter: "contains",
        suggest: true,
        placeholder: "Select a MembershipType"
    });
}

function LoadDatePicker() {

    $("#effectDate").kendoDatePicker({

        format: "dd/MM/yyyy",
        min: new Date(31, 2, 1920)
    });

    $(".k-datepicker, .k-combobox, .k-numerictextbox,.k-input").css('width', "100%");

}

function LoadMembershipDetailGrid() {
    // alert(0);
    var dataSource = new kendo.data.DataSource({
        batch: true,
        pageSize: 10,
        schema: {
            model: {
                id: "AccTrnKy",
                fields: //Relavent fields of the grid should be bind with following model items
                {
                    LiNo: { editable: false, nullable: false, type: "number" },
                    MembershipNo: { editable: true, nullable: false, type: "string" },
                    Organization: { editable: true, nullable: false, type: "string" },
                    Year: { editable: true, nullable: false, type: "string" },
                    MembershipType: { editable: true, nullable: false, type: "string" },
                    MembershipTypeKy: { editable: true, nullable: false, type: "int" },
                    EffectDate: { editable: true, nullable: false, type: "string" },
                    HiddenMembershipNo: { editable: true, nullable: false, type: "string" }
                }
            }
        },
    });
    $("#MembershipDetailGrid").kendoGrid({
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
                field: "MembershipNo",
                title: "Membership No",
                width: "100px",
            },
            {
                field: "HiddenMembershipNo",
                title: "hidden Membership No",
                //width: "100px",
                hidden: true,
            },
            {
                field: "Organization",
                title: "Organization",
                width: "50px",
            },
            {
                field: "Year",
                title: "Year",
                width: "120px",
            },
            {
                field: "MembershipType",
                title: "Membership Type",
                width: "120px",
                
            },
            {
                field: "MembershipTypeKy",
                title: "Membership Type",
                //width: "100px",
                hidden : true,

            },
            {
                field: "EffectDate",
                title: "Effect Date",
                width: "120px",
            },
        ]
    });
}




function InsertToGrid() {
    var grid = $("#MembershipDetailGrid").data("kendoGrid");
    var dataSource1 = grid.dataSource;
    var total = dataSource1.data().length;
    var membershipNo = $('#membershipNo').val();
    var HiddenmembershipNo = $('#HiddenmembershipNo').val();
    var organization = $('#organization').val();
    var year = $('#year').val();
    var cmbMembershipType = $("#cmbMembershipType").data("kendoComboBox").text();
    var cmbMembershipTypeKy = $("#cmbMembershipType").data("kendoComboBox").value();
    var effectDate = $('#effectDate').val();
    grid.dataSource.insert(
        total,
        {
            LiNo: total + 1,
            MembershipNo: membershipNo,
            HiddenMembershipNo: HiddenmembershipNo,
            Organization: organization,
            Year: year,
            MembershipType: cmbMembershipType,
            MembershipTypeKy: cmbMembershipTypeKy,
            EffectDate: effectDate
        });
}


function SaveDetails(action) {
    var EmpNo = document.getElementById("EmpNo").value;
    var EmpNm = document.getElementById("EmpNm").value;
    var EmpKy = document.getElementById("EmpKy").value;


    var grid = $("#MembershipDetailGrid").data("kendoGrid");
    var dataSource = grid.dataSource;

    //records on current view / page   
    var recordsOnCurrentView = dataSource.view().length;
    //total records
    var totalRecords = dataSource.total();

    var grid = $("#MembershipDetailGrid").data("kendoGrid");
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
        url: urlInsertMembershipDet,
        data: JSON.stringify({
            EmpMembershipData: kendo.stringify(newRecords),
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
    var grid = $("#MembershipDetailGrid").data("kendoGrid");
    grid.dataSource.data([]);
}