$(function () {

    loadBOQComponents_SelectWeb(1);

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

var globalBOQDetKy = 1;

function loadBOQComponents_SelectWeb(BOQDetKy) {
    
    globalBOQDetKy = BOQDetKy;

    var gridBOQComponents_SelectWeb = new kendo.data.DataSource({
        transport: {
            read: {
                data: { BOQDetKy: BOQDetKy },
                url: urlBOQComponents_SelectWeb, //'/PMResource/TaskResourceDetails_Select',
                dataType: "json"
            }
        },
        batch: true,
        pageSize: 10,
        schema: {
            model: {
                id: "BOQDetCmpnKy",
                fields: {
                    BOQDetKy: {},
                    LinNo: {},
                    ItmKy: {},
                    FinItmKy: {},
                    FinQty: {},
                    Qty: {},
                    Rate: {},
                    LineTotal: {},
                    ReqQty: {},
                    ItmDes: {},
                    ItmTyp: {},
                    TrnRate: {},
                    TrnQty: {},
                    TrnUnitKy: {},
                    UsagPer: {},
                    Code: {},
                    Unit: {}
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
        "create",
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
            { field: "BOQDetCmpnKy", hidden: 'true' },
            { field: "BOQDetKy", hidden: 'true' },
            { field: "LiNo", title: "LiNo" },
            { field: "ItmKy", hidden: 'true' },
            { field: "FinItmKy", hidden: 'true' },
            "Code",
            { field: "ItmDes", width: '200px' },
            "ItmTyp",
            "Unit",
            "FinQty",
            "Qty",
            "Rate",
            "LineTotal",
            { field: "ReqQty", hidden: 'true' },
            { field: "TrnRate", hidden: 'true' },
            { field: "TrnQty", hidden: 'true' },
            { field: "TrnUnitKy", hidden: 'true' },
            "UsagPer"
            //{ field: "Discontinued", width: 120 }
        ],
        editable: true
    });

    $(".k-grid-Assign", "#divGrid").bind("click", function (ev) {
        AssignResrc();
    });

    $(".k-grid-Save", "#divGrid").bind("click", function (ev) {
        sendDataSaveChangesBoqDetCom();
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

function AssignResrc() {
    try {
        var child = $("#divGrid").data("kendoGrid");
        $.each($("#tGridResourceForItmAloc_Select").data("kendoGrid").tbody.find(".k-state-selected"), function (index, value) {
            var selectedDataItem = $("#tGridResourceForItmAloc_Select").data("kendoGrid").dataItem(value);;
            child.dataSource.add({
                ItmKy: selectedDataItem.ItmKy
                        , ItmDes: selectedDataItem.ResNm
                        , Unit: selectedDataItem.Unit
                        , Code: selectedDataItem.ResCd
                        , ItmTyp: selectedDataItem.ItmTypCd
                        , UsagPer: 1
                        , LiNo: 1
                        , FinQty: 1
                        , Qty: 1
                        , Rate: 1
                        , LineTotal: 1
                        , UsagPer: 1
                        , BOQDetKy: globalBOQDetKy
                //, Rate: selectedDataItem.Rate
                //, ReqQty: selectedDataItem.ReqQty
                //, PrcsDetKy: selectedDataItem.PrcsDetKy
            });           // this is the way to saveChanges
        });
    } catch (exception) {
        alert("Select Resource Detail Level ... 1")
    }
}

function sendDataSaveChangesBoqDetCom() {
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
        url: urlBOQDetComponent_SelectWeb_SaveChanges, //"/PMResource/sendDataSaveChanges",
        data: { boqDetKy: globalBOQDetKy, updatedOrders: kendo.stringify(updatedRecords), newOrders: kendo.stringify(newRecords), deletedOrders: kendo.stringify(deletedRecords) },
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
