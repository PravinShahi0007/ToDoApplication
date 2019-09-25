$(document).ready(function () {
    var OurCode = "@(ViewBag.ObjCaptn)";
    LoadDropDown();
    //Load the tooltip //COmmo srcipt
    Tooltip();
    //Selecting the text//COmmo srcipt
    SelectText();
    LoadDatePicker();
    var todayDate = new Date();
    $("#fromDate").data("kendoDatePicker").value(todayDate);
    $("#toDate").data("kendoDatePicker").value(todayDate);
    LoadAssetDetailGrid();

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

    $("#toDate").kendoDatePicker({

        format: "dd/MM/yyyy",
        min: new Date(31, 2, 1920)
    });
    $("#fromDate").kendoDatePicker({

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
    $("#cmbType").kendoComboBox({
        dataValueField: "CdKy",
        dataTextField: "CdNm",
        dataSource: GetCdMas_LookupWeb('Type'),
        filter: "contains",
        suggest: true,
        placeholder: "Select a Type"
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
function LoadAssetDetailGrid() {
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
                    ToDate: { editable: true, nullable: false, type: "string" },
                    Type: { editable: true, nullable: false, type: "string" },
                    //AssetType: { editable: true, nullable: false, type: "string" },
                    TypeKy: { editable: true, nullable: false, type: "number" },
                    Model: { editable: true, nullable: false, type: "string" },
                    InventoryNo: { editable: true, nullable: false, type: "string" },
                    SerialNo: { editable: true, nullable: false, type: "string" }
                }
            }
        },
    });
    $("#AssetGrid").kendoGrid({
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
                width: "70px",
            },
            {
                field: "ToDate",
                title: "To Date",
                width: "70px",
            },
            //{
            //    field: "AssetType",
            //    title: "Type",
            //    width: "100px",
            //},
            {
                field: "Type",
                title: "Type",
                hidden: true,
                width: "50px",
            },
            {
                field: "TypeKy",
                title: "Type",
                hidden: true,
                //width: "50px",
            },
            {
                field: "Model",
                title: "Model",
                width: "120px",
            },
            {
                field: "InventoryNo",
                title: "Inventory No",
                width: "100px",
            },
            {
                field: "SerialNo",
                title: "Serial No",
                width: "100px",
            },
        ]
    });
}

function InsertToGrid() {
    var grid = $("#AssetGrid").data("kendoGrid");
    var dataSource1 = grid.dataSource;
    var total = dataSource1.data().length;

    var FromDate = $('#fromDate').val();
    var ToDate = $('#toDate').val();
    //var AssetType = $('#AssetTypeText').val();
    var Type = 'type';//$("#cmbType").data("kendoComboBox").text();
    var TypeKy = 1;// (!$("#cmbType").data("kendoComboBox").value()) ? 1 : $("#cmbType").data("kendoComboBox").value();
    var Model = $('#model').val();
    var InventoryNo = $('#inventoryNo').val();
    var SerialNo = $('#serialNo').val();


    grid.dataSource.insert(
        total,
        {
            LiNo: total + 1,
            FromDate: FromDate,
            ToDate: ToDate,
            //AssetType : AssetType,
            Type: Type,
            TypeKy: TypeKy,
            Model: Model,
            InventoryNo: InventoryNo,
            SerialNo: SerialNo
        });

}



function SaveDetails(action) {

    var EmpNo = document.getElementById("EmpNo").value;
    var EmpNm = document.getElementById("EmpNm").value;
    var EmpKy = document.getElementById("EmpKy").value;


    var grid = $("#AssetGrid").data("kendoGrid");
    var dataSource = grid.dataSource;

    //records on current view / page   
    var recordsOnCurrentView = dataSource.view().length;
    //total records
    var totalRecords = dataSource.total();

    var grid = $("#AssetGrid").data("kendoGrid");
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
        url: urlInsertAssetDet,
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
    var grid = $("#AssetGrid").data("kendoGrid");
    grid.dataSource.data([]);
}

function AfterFindEmp(EmpKy) {
    $.ajax({
        url: urlGetAssetDet,
        data: {
            EmpKy: EmpKy
        },
        dataType: "Json",
        type: "POST",
        success: function (data) {
            $("#AssetGrid").data("kendoGrid").dataSource.data(data);
        },
        error: function (e) {
            return false;
        }
    });
}