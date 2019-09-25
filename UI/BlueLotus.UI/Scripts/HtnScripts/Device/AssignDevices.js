
$(document).ready(function () {

    LoadAssignedDevicesGrid();


});
function LoadAssignedDevicesGrid() {
    dataSource = new kendo.data.DataSource({
        transport: {
            read: {
                url: urlGetAssignedDeviceDetails,

                dataType: "json"
            },
            parameterMap: function (options, operation) {
                if (operation !== "read") {

                    return ({});
                }

            }
        },
        batch: true,
        pageSize: 50,
        schema: {
            model: {
               // id: "UsrKy",
                fields: {
                    DeviceNm: { editable: false, nullable: false, type: "string" },
                    UsrNm: { editable: false, nullable: false, type: "string" },
                    IsAct: { type: "boolean" },
                    DeviceKy: { editable: true, nullable: false, type: "number" },
                    UsrKy: { editable: true, nullable: false, type: "number" }

                }
            }
        }
    });
    $("#AssignedDevicesGrid").kendoGrid({

        dataSource: dataSource,
        navigatable: true,
        selectable: "row",
        sortable: true,
        resizable: true,
        locked: true,

        //scrollable: false,
        //scrollable:false,
        pageable: true,
        height: 400,
        columns: [
             { field: "DeviceNm", title: "Device Name"},
             { field: "UsrNm", title: "User Name"},
             { field: "isAct", template: '<input type="checkbox" #= isAct ? "checked=checked" : "" # disabled="disabled" ></input>', title: "Is Active", lockable: "true" },
             { field: "DeviceKy", title: "DeviceKy", hidden: "true" },
             { field: "UsrKy", title: "UsrKy", hidden: "true" }
        ],

    });

}
function GetAllDevUsers() {

    var dataSource = new kendo.data.DataSource(
      {
          transport: {
              read: {
                  url: urlGetDevUsers,
                  dataType: "json"
              }
          }
      });
    return dataSource;
}
$(document).ready(function () {

    $("#cmbDevUsr").kendoComboBox({
        dataValueField: "UsrKy",
        dataTextField: "UsrNm",
        dataSource: GetAllDevUsers(),
        filter: "contains",
        suggest: true,
        placeholder: "Select a User ..."
    });
});
function GetAllDevices() {
    var dataSource = new kendo.data.DataSource(
      {
          transport: {
              read: {
                  url: urlGetAllDevices,
                  dataType: "json"
              }
          }
      });
    return dataSource;
}
$(document).ready(function () {

    $("#cmbDev").kendoComboBox({
        dataValueField: "DeviceKy",
        dataTextField: "DeviceNm",
        dataSource: GetAllDevices(),
        filter: "contains",
        suggest: true,
        placeholder: "Select a Device ..."
    });
});

function AllocateDevice()
{
    var cmbDevUsr = $("#cmbDevUsr").data("kendoComboBox");
    var DevUsr = cmbDevUsr.value();
    var cmbDev = $("#cmbDev").data("kendoComboBox");
    var Dev = cmbDev.value();
    if (DevUsr != null || Dev != null) {
        $.ajax({

            url: urlAssignDevice,
            data: { DevUsrKy: DevUsr, DeviceKy: Dev },
            type: "POST",
            error: function () {
                alert("Unable to process");
            },
            success: function (data) {
                if (data == true) {
                    $("#cmbDevUsr").data("kendoComboBox").value("");
                    $("#cmbDev").data("kendoComboBox").value("");
                    GetAllDevices();
                    GetAllDevUsers();
                    $('#AssignedDevicesGrid').data('kendoGrid').dataSource.read();
                }
            }
        })
    }
    else {
        alert("Invalid User or Device");
    }
}
function UnselectDevice() {
    var DeviceGrid = $("#AssignedDevicesGrid").data("kendoGrid");
    var rows = DeviceGrid.select();

    var selectedItem = DeviceGrid.dataItem(DeviceGrid.select());
    if (selectedItem != null || selectedItem != undefined) {
        var UsrKy = selectedItem.UsrKy;
        var DeviceKy = selectedItem.DeviceKy;
        $.ajax({
            url: urlUnselectDevice,
            data: { DevUsrKy: UsrKy, DeviceKy: DeviceKy },
            type: "POST",
            error: function () {
                alert("Unable to process");
            },
            success: function (data) {
                if (data == true) {
                    rows.each(function (index, row) {
                        var selectedItem = DeviceGrid.dataItem(row);
                        DeviceGrid.dataSource.remove(selectedItem);
                        alert("Device Cancellation Successful");
                    });
                }
            }
        })
    }
    else {
        alert("Please Select a Record to Remove");
    }
}