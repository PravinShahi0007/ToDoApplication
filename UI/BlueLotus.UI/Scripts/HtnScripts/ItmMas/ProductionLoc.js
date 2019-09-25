
var proFormData = {
    ItmKy: 1,
    ItmCd: "",
    ItmNm: "",
    OurCd: ""
}

function GetProductionManufacturingLocWindow(ItmKy, ItmCd, ItmNm, FieldTitle, FieldName) {

    proFormData.ItmKy = ItmKy;
    proFormData.ItmCd = ItmCd;
    proFormData.ItmNm = ItmNm;
    if (FieldName == "ProductionLoc") proFormData.OurCd = "ItmMasCdProdLoc";
    if (FieldName == "ManufacturingLoc") proFormData.OurCd = "ItmMasCdManuLoc";

    $("#PopUpForProductionManufacturingLoc").show().kendoWindow({
        width: "1000px",
        height: "550px",
        modal: true,
        title: FieldTitle,

    });

    $("#PopUpForProductionManufacturingLoc").data("kendoWindow").center().open();
    document.getElementById("PopUpForProductionManufacturingLoc_wnd_title").innerHTML = FieldTitle;
    //document.getElementById("ItmKy").value = ItmKy;
    document.getElementById("ItmCdforProductionManufacturing").value = proFormData.ItmCd;
    document.getElementById("ItmNmforProductionManufacturing").value = proFormData.ItmNm;
    LoadProductionManufacturingGrid();
}

function LoadProductionLocGrid() {
    var CdKy = $("#HdrSec1_CmbLoc_Cd").data('kendoComboBox').value();
}

function CancelGridProductionLoc() { $("#PopUpgridForProductionManufacturingLoc").data("kendoGrid").cancelChanges(); }
function insertProductionLoc() { $("#PopUpgridForProductionManufacturingLoc").data("kendoGrid").addRow(); }

function LoadProductionManufacturingGrid() {

    try {
        $('#PopUpgridForProductionManufacturingLoc').data().kendoGrid.destroy();
        $('#PopUpgridForProductionManufacturingLoc').empty();
    } catch (e) { }

    var ProductionManufacturingColumns = [

    { field: "ItmCdKy", title: "ItmCdKy", width: "30px", hidden: true },
    { field: "LocKy", title: "Location Key", width: "30px", hidden: true },
    { field: "LocCd", title: "Location Code", width: "25px" },
    { field: "LocNm", title: "Location Name", width: "50px" },
    {
        field: "IsAct", title: "IsAct", width: "20px",
        template: '<input type="checkbox"  #= IsAct? "checked=checked" : "" # class="PinCheckedIsAct"></input>',
    },

    ];

    var ProductionManufacturinggriddataSource = new kendo.data.DataSource({
        transport: {
            read: {
                url: URLReadProductionManufacturingGridView,
                dataType: "json",

            },

            parameterMap: function (options, operation) {
                if (operation == "read") {
                    return ({
                        'ItmKy': proFormData.ItmKy,
                        'ObjKy': viewBag.ObjKy,
                    })
                }
            }
        },
        batch: true,
        pageSize: 20,

        schema: {
            model: {
                id: "ItmCdKy",
                fields: //Relavent fields of the grid should be bind with following model items
                {
                    ItmCdKy: { editable: false, nullable: false, },
                    LocKy: { editable: false, nullable: false, },
                    LocCd: { editable: false, nullable: false, },
                    LocNm: { editable: false, nullable: false, },
                    IsAct: { editable: true, nullable: false, type: "boolean" },
                }
            }
        }
    });

    $("#PopUpgridForProductionManufacturingLoc").kendoGrid({
        dataSource: ProductionManufacturinggriddataSource,
        autobind: true,
        height: "370px",
        reorderable: true,
        navigatable: true,
        selectable: "row",
        editable: true,
        pageable: {
            refresh: true, pageSizes: [5, 10, 20, 50, 100, 150, 200, 300],
        },
        //toolbar: [{ name: "create", text: "Add new record" }, "save", "cancel"],
        columnMenu: true,

        filterable: {
            mode: "row"
        },
        resizeable: true,
        reorderable: true,
        sortable: true,
        columns: ProductionManufacturingColumns,
        //dataBound: GridOnDataBound,

        dataBinding: function () {
            record = (this.dataSource.page() - 1) * this.dataSource.pageSize();
        },
    });
}

function UpdateProductionLoc(){
    var CdKy = $("#HdrSec1_CmbLoc_Cd").val();
    var grid = $("#PopUpgridForProductionManufacturingLoc").data("kendoGrid");
    var currentData = grid.dataSource.data();

    var ProductionManufacturing_updatedRecords = [];


    for (var i = 0; i < currentData.length; i++) {
        if (currentData[i].dirty) {
            ProductionManufacturing_updatedRecords.push(currentData[i].toJSON());
        }
    }


    if (ProductionManufacturing_updatedRecords.length != 0) {

        //ajax for unsert update and delete
        $.ajax({
            url: URLInsertUpdateProductionManufacturing,
            data: JSON.stringify({
                ProductionManufacturing_Update: kendo.stringify(ProductionManufacturing_updatedRecords),
                ItmKy: proFormData.ItmKy,
                ObjKy: viewBag.ObjKy,

            }),
            contentType: "application/json; charset=utf-8",
            dataType: "Json",
            type: "POST",
            success: function (data) {

                if (data == true) {
                    alert("Successfully Saved..!");
                    LoadProductionManufacturingGrid(); // update grid
                } else {
                    alert("Record Not Saved");
                    LoadProductionManufacturingGrid(); // update grid
                }
            },
            error: function (e) {
                return false;
            }
        });
    }
}

$('#PopUpgridForProductionManufacturingLoc').on('click', '.PinCheckedIsAct', function () {
    var checked = $(this).is(':checked');
    var grid = $('#PopUpgridForProductionManufacturingLoc').data().kendoGrid;
    var dataItem = grid.dataItem($(this).closest('tr'));
    if (dataItem != undefined) {
        dataItem.set('IsAct', checked);
    }
});
