$(function () {

    $("#btnload").click(function () {
        $.holdReady(true);
        $.ajax({
            type: "GET",
            dataType: 'json',
            async: false,
            timeout: 20000,
            data: {
                ItmCd: ($("#code").val()) ? $("#code").val() : 1,
                ItmNm: ($("#name").val()) ? $("#name").val() : 1,
                ItmTypKy: ($("#cmbItmTypCdAnlTab1").data("kendoComboBox").value()) ? $("#cmbItmTypCdAnlTab1").data("kendoComboBox").value() : 1,
                ItmCat1Ky: ($("#cmbItmCat1CdAnlTab1").data("kendoComboBox").value()) ? $("#cmbItmCat1CdAnlTab1").data("kendoComboBox").value() : 1,
                ItmCat2Ky: ($("#cmbItmCat2CdAnlTab1").data("kendoComboBox").value()) ? $("#cmbItmCat2CdAnlTab1").data("kendoComboBox").value() : 1,
                ItmCat3Ky: ($("#cmbItmCat3CdAnlTab1").data("kendoComboBox").value()) ? $("#cmbItmCat3CdAnlTab1").data("kendoComboBox").value() : 1
            },
            url: urlResourceForItmAloc_Select,//'/PMResource/TaskResourceDetails_Select',//'@Url.Action("ProjectResourceDetails_Select", "GanttChart")',
            converters:
            {
                "text json": function (data) {
                    return $.parseJSON(data, true
                    /*converts date strings to date objects*/
                    , true
                    /*converts ISO dates to local dates*/
                    );
                }
            },
            success: function (data) {
                //setTimeout(function () {
                var viewModelResourceForItmAloc_Select = kendo.observable({
                    srcResourceForItmAloc_Select: data//data//ProjectCostSchVarienceDly_DB_Data
                });
                kendo.bind($("#tGridResourceForItmAloc_Select"), viewModelResourceForItmAloc_Select);
                $.holdReady(false);

                try {
                    $('#tGridResourceForItmAloc_SelectChild').data().kendoGrid.destroy();
                    $('#tGridResourceForItmAloc_SelectChild').empty();
                    $('#divGrid').data().kendoGrid.destroy();
                    $('#divGrid').empty();
                } catch (exception) { }
            }
        });
    });

});

function loadBOQComponents_SelectWeb(tempPrjKy, PrcsDetKy, selectedRowData) {
    
    try {
        // Grid First Time Load Empty Grid.
        var viewModelResourceForItmAloc_Select = kendo.observable({
            srcResourceForItmAloc_Select: {}
        });
        kendo.bind($("#tGridResourceForItmAloc_Select"), viewModelResourceForItmAloc_Select);
        $('#tGridResourceForItmAloc_Select').data('kendoGrid').refresh();
    } catch (e) { }

    var gridBOQComponents_SelectWeb = new kendo.data.DataSource({
        transport: {
            read: {
                //data: { BOQDetKy: BOQDetKy },
                //url: urlBOQComponents_SelectWeb, //'/PMResource/TaskResourceDetails_Select',
                data: { PrjKy: tempPrjKy, PrcsDetKy: PrcsDetKy },
                url: urlProjectResourceDetails_Select,
                dataType: "json"
            }
        },
        batch: true,
        pageSize: 10,
        schema: {
            model: {
                id: "PrcsDetCmpn",
                fields: {
                    PrcsDetKy: {},
                    PrjKy: {},
                    TaskID: { editable: false },
                    ResCd: { editable: true, nullable: true, type: "string" },
                    ResNm: { editable: true, nullable: true, type: "string" },
                    ReqQty: {}, // editable: true, nullable: true, type: "number"
                    Unit: {},
                    Rate: {},
                }
            }
        }
    });

    $("#divGrid").kendoGrid({
        dataSource: gridBOQComponents_SelectWeb,
        navigatable: true,
        pageable: true,
        //filterable: { mode: 'row' },
        resizable: true,
        height: 300,
        dataBound: function () {
            $('#divGrid .k-grid-content').height(205);
        },
        columnMenu: true,
        reorderable: true,
        scrollable: true,
        selectable: 'multiple',
        //height: 550,
        toolbar: [
            {
                name: "Assign",
                text: "Assign Item",
                //imageClass: "myStyle",
                click: function (e) {
                    return false;
                }
            },
        {
            name: "AddResrcs",
            text: "Add new record",
            click: function (e) {
                return false;
            }
        },
        {
            name: "Save",
            text: "Save Changes",
            click: function (e) {
                return false;
            }
        },
        {
            name: "deleteSelectedow",
            text: "Delete",
            //imageClass: "myStyle",
            click: function (e) {
                return false;
            }
        },
        "cancel"
        ],        // "save",
        columns: [
            { field: "PrcsDetKy", hidden: 'true' },
            { field: "PrjKy", hidden: 'true' },
            { field: "TaskID", title: "TaskID" },
            "ResCd",
            { field: "ResNm", width: '200px' },
            "ReqQty",
            "Unit",
            "Rate",
        ],
        editable: true
    });

    $(".k-grid-Assign", "#divGrid").bind("click", function (ev) {
        AssignResrcs(tempPrjKy, PrcsDetKy, selectedRowData);
    });

    $(".k-grid-AddResrcs", "#divGrid").bind("click", function (ev) {
        AddResrcs(selectedRowData);
    });

    $(".k-grid-Save", "#divGrid").bind("click", function (ev) {
        sendDataSaveChangesPMRsrcDet();
    });

    $(".k-grid-deleteSelectedow", "#divGrid").bind("click", function (ev) {
        removeSelectedRow();
    });
}

function removeSelectedRow() {
    $.each($("#divGrid").data("kendoGrid").tbody.find(".k-state-selected"), function (index, value) {
        $("#divGrid").data("kendoGrid").removeRow(value);
    });
}

function AddResrcs(selectedRowData) {
    try {
        var child = $("#divGrid").data("kendoGrid");
        child.dataSource.add({
            TaskID: selectedRowData.PrcsID
        });           // this is the way to saveChanges
    } catch (exception) {
        alert("Insert Err ... 1")
    }
}

function AssignResrcs(tempPrjKy, PrcsDetKy, selectedRowData) {
    try {
        var child = $("#divGrid").data("kendoGrid");
        $.each($("#tGridResourceForItmAloc_Select").data("kendoGrid").tbody.find(".k-state-selected"), function (index, value) {
            var selectedDataItem = $("#tGridResourceForItmAloc_Select").data("kendoGrid").dataItem(value);
            child.dataSource.add({
                PrcsDetKy: PrcsDetKy
                , PrjKy: tempPrjKy
                , TaskID: selectedRowData.PrcsID
                , ResCd: selectedDataItem.ResCd
                , ResNm: selectedDataItem.ResNm
                , ReqQty: selectedDataItem.ReqQty
                , Unit: selectedDataItem.Unit
                , Rate: selectedDataItem.Rate
            });           // this is the way to saveChanges
        });
    } catch (exception) {
        alert("Select Resource Detail Level ... 1")
    }
}

function sendDataSaveChangesPMRsrcDet() {
    var grid = $("#divGrid").data("kendoGrid");

    //get the new and the updated records
    var currentData = grid.dataSource.data();
    var updatedRecords = [];
    var newRecords = [];

    for (var i = 0; i < currentData.length; i++) {
        if (currentData[i].isNew()) {
            //this record is new
            newRecords.push(currentData[i].toJSON());
        } else if (currentData[i].dirty) {
            updatedRecords.push(currentData[i].toJSON());
        }
    }

    //this records are deleted
    var deletedRecords = [];
    for (var i = 0; i < grid.dataSource._destroyed.length; i++) {
        deletedRecords.push(grid.dataSource._destroyed[i].toJSON());
    }

    $.ajax({
        url: urlsendDataSaveChanges, //"/PMResource/sendDataSaveChanges",
        data: { updatedOrders: kendo.stringify(updatedRecords), deletedOrders: kendo.stringify(deletedRecords), newOrders: kendo.stringify(newRecords) },
        type: "POST",
        error: function () {
            //Handle the server errors using the approach from the previous example
        },
        success: function () {
            alert("update on server is completed");

            grid.dataSource._destroyed = [];
            //refresh the grid - optional
            grid.dataSource.read();
        }
    })
}
