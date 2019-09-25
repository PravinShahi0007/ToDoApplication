

function GetEANWindow(ItmKy, ItmCd, ItmNm) {
    
    $("#PopUpForEAN").show().kendoWindow({
        width: "1000px",
        height: "550px",
        modal: true,
        title: "EAN"
    });
    $("#PopUpForEAN").data("kendoWindow").center().open();
    
    document.getElementById("ItmKy").value = ItmKy;    
    document.getElementById("ItmCd").value = ItmCd;
    document.getElementById("ItmNm").value = ItmNm;
    LoadEANGrid();
}

function back() {
    $("#PopUpForEAN").data("kendoWindow").close();
}

function LoadEANGrid() {

    try {
        $('#PopUpgridForEAN').data().kendoGrid.destroy();
        $('#PopUpgridForEAN').empty();
    } catch (e) { }

    var ItmKy = $("#ItmKy").val();   
    var EANColumns = [
        { field: "ItmEANKy", title: "ItmEANKy", width: "100px", hidden:true },
        { field: "ItmKy", title: "ItmKy", width: "150px", hidden: true },
        { field: "EAN", title: "EAN", width: "150px", },
        {
            field: "isApr", title: "Is Aprove", width: "150px",
            template: '<input type="checkbox"  #= isApr? "checked=checked" : "" # class="PinChecked"></input>',
        },
    ];

    var EANgriddataSource = new kendo.data.DataSource({
        transport: {
            read: {
                url: URLReadEANGridView,
                dataType: "json",

            },

            parameterMap: function (options, operation) {
                if (operation == "read") {
                    return ({
                        'ItmKy': ItmKy,
                        'ObjKy': viewBag.ObjKy
                    })
                }
            }
        },
        batch: true,
        pageSize: 20,

        schema: {
            model: {
                id: "ItmEANKy",
                fields: //Relavent fields of the grid should be bind with following model items
                {
                    ItmEANKy: { editable: false, nullable: false, type: "number" },
                    ItmKy: { editable: false, nullable: false, validation: { required: true }, type: "number" },
                    EAN: { editable: true, nullable: false, type: "string" },
                    isApr: { editable: true, nullable: false, type: "boolean" },
                }
            }
        }
    });

    $("#PopUpgridForEAN").kendoGrid({
        dataSource: EANgriddataSource,
        autobind: true,
        height: "400px",
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
        columns: EANColumns,
        dataBound: GridOnDataBound,
        
        dataBinding: function () {
            record = (this.dataSource.page() - 1) * this.dataSource.pageSize();
        },
    });
}

//function onChangeAdminGrid(arg) {
    
//    var $grid = arg.sender; //grid ref
//    var $cell = $grid.select(); // selected td
   
//    var cell_index = $cell.index(); //cell index 0 based    
//    var gridColumns = $("#Main_ItmMasGrid").data("kendoGrid").columns;
//    if (gridColumns[cell_index] != undefined) {
        
//        alert(gridColumns[cell_index].field);
//        //kendoConsole.log("Selected: " + selected.length + " item(s), [" + selected.join(", ") + "]");
//    }
//}

function CancelGridItem() {
    $("#PopUpgridForEAN").data("kendoGrid").cancelChanges();
}

function insertItem() {
    $("#PopUpgridForEAN").data("kendoGrid").addRow();
}

function SaveEAN() {
    var ItmKy = $("#ItmKy").val();
    var grid = $("#PopUpgridForEAN").data("kendoGrid");
    var currentData = grid.dataSource.data();

    var EANupdatedRecords = [];
    var EANnewRecords = [];

    for (var i = 0; i < currentData.length; i++) {
        if (currentData[i].isNew()) {
            EANnewRecords.push(currentData[i].toJSON());
        } else if (currentData[i].dirty) {
            EANupdatedRecords.push(currentData[i].toJSON());
        }
    }

    var tempSAveChech = true;

    if (EANnewRecords.length != 0 || EANupdatedRecords.length != 0) {

        if (tempSAveChech) {
            //ajax for unsert update and delete
            $.ajax({
                url: URLInsertUpdateEANGridView,
                data: JSON.stringify({
                    ObjKy: viewBag.ObjKy,
                    EANUpdate : kendo.stringify(EANupdatedRecords),
                    EANNew : kendo.stringify(EANnewRecords),
                    ItmKy: ItmKy,
                }),
                contentType: "application/json; charset=utf-8",
                dataType: "Json",
                type: "POST",
                success: function (data) {

                    if (data == true) {
                        alert("Successfully Saved..!");
                        LoadEANGrid(); // update grid
                    } else {
                        alert("Record Not Saved");
                        LoadEANGrid(); // update grid
                    }
                },
                error: function (e) {
                    return false;
                }
            });
        }
    }
}

 
$('#PopUpgridForEAN').on('click', '.PinChecked', function () {
    var checked = $(this).is(':checked');
    var grid = $('#PopUpgridForEAN').data().kendoGrid;
    var dataItem = grid.dataItem($(this).closest('tr'));
    if (dataItem != undefined) {
        dataItem.set('isApr', checked);
    }
});



//var grid = $("#Main_ItmMasGrid").data("kendoGrid");
$('#Main_ItmMasGrid').on("click", function (e) {
    var grid = $("#Main_ItmMasGrid").data("kendoGrid");
    var cell = grid.select(); // selected td

        var cell_index = cell.index(); //cell index 0 based    
        var gridColumns = $("#Main_ItmMasGrid").data("kendoGrid").columns;
        if (gridColumns[cell_index] != undefined) {

            //alert(gridColumns[cell_index].field);
        }
});

//$("#Main_ItmMasGrid .k-header").mousedown(function (e) {  //your custom logic 
    
//        var preFiled = "";
//        var fieldname = $("#Main_ItmMasGrid").data("field");
//        if (preFiled != fieldname) {
//            e.preventDefault();
//            alert(fieldname);
            
//        }
    
//})
