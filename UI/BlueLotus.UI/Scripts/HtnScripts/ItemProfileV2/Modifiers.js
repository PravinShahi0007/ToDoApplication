var FormGlblData = {
    FormObjData: null,
    gridSelectRowData: "",
    GridDeleteRowIndex:-1
}


var OldItmCd = '';

function AddModifier() {

    var grid = $("#ModiGrid").data("kendoGrid");
    grid.addRow();
}

function LoadModifierGrid() {
    var ModifierColumns = [
         {
             field: "PrntItmKy", title: "PrntItmKy", width: "100px", hidden: true, attributes: { style: "text-align:center;" },
         },

           {
               field: "POSModifierKy", title: "POSModifierKy", width: "100px", hidden: true, attributes: { style: "text-align:center;" },
           },


        {
            field: "ModifierItmKy", title: "ModifierItmKy", width: "100px", hidden: true, attributes: { style: "text-align:center;" },
        },
        {
            field: "ModifierItmCd", title: "Item Code", width: "100px", attributes: { style: "text-align:center;" },
        },
        {
            field: "ModifierItmNm", title: "Item Name", width: "100px", attributes: { style: "text-align:center;" },
        },
        {
            field: "Qty", title: "Quantity", width: "100px", attributes: { style: "text-align:center;" },
        },
        {
            field: "ModifierPrice", title: "price", width: "100px", attributes: { style: "text-align:center;" },
        }
        ,
        
         {
             command: { name: 'del', click: showDetails }, title: " ", width: "40px"
         }

    ];

    var gridNo = 5;
    var FinalItmSettingsColumn = setColumnProp(ModifierColumns, viewBag.ObjKy, '', 'HdrSec2_Tab6_FormGrd', gridNo);
}

function LoadGridWithColumnPropFive(ModifierColumns, gridNo) {
    if (gridNo == 5) {
        try {
            $('#ModiGrid').data().kendoGrid.destroy();
            $('#ModiGrid').empty();
        } catch (e) { }

        var PrntItmKy = $("#ItmKy").val();

        var dataGridSource5 = new kendo.data.DataSource({
            transport: {
                read: {
                    url: urlModifier, //'@Url.Action("LoadModifier", "ItmPrfl")'
                    dataType: "json"
                },               

                parameterMap: function (options, operation) {                  
                if (operation == "read") {
                    return ({
                        'PrntItmKy': PrntItmKy
                    });
                }
        }

       },
            batch: true,
            pageSize: 12,
            schema: {
                model: {
                    fields: {
                        PrntItmKy: { editable: false, nullable: false, type: "number", hidden: true },
                        POSModifierKy: { editable: false, nullable: false, type: "number", hidden: true },
                        ModifierItmKy: { editable: false, nullable: false, type: "number", hidden: true },
                        ModifierItmCd: { editable: true, nullable: false, type: "string", hidden: false },
                        ModifierItmNm: { editable: false, nullable: false, type: "string", hidden: false },
                        Qty: { editable: true, nullable: false, type: "number", hidden: false },
                        ModifierPrice: { editable: false, nullable: false, type: "number", hidden: false }
                    }
                    //,
                    //command: { text: "X", click: GridDeleteButtonIsClicked, title: " ", width: "40px" }
                }
            }
        });

        $(".ModiGrid").kendoGrid({
            dataSource: dataGridSource5,
            autobind: true,
            resizable: true,
            navigatable: true,
            sortable: true,
            reorderable: true,
            //editable:true,
            columns: ModifierColumns,
            selectable: "row",
            pageable: {
                refresh: true, pageSizes: [5, 10, 20, 50, 100, 150]
            },
            filterable: true,

            dataBinding: function () {
                record = (this.dataSource.page() - 1) * this.dataSource.pageSize();
            },
            dataBound: GridOnDataBound,           

            change: function (e) {
                getItm();
                var $grid = e.sender; //grid ref
                var $cell = $grid.select(); // selected td
                var $row = $cell.closest('tr'); //selected tr
                var row_uid = $row.attr('data-uid'); //uid of selected row
                var cell_index = $cell.index(); //cell index 0 based
                var row_index = $row.index(); //row index 0 based
                GridDeleteRowIndex = $row.index();

                var row_data = $grid.dataItem($row); //selected row data;
                gridSelectRowData = $grid.dataItem($row).toJSON();
            },

            //destroy:function (e) {
            //    alert('s');
            //    GridDeleteButtonIsClicked();
            //    //dataType: "jsonp"
            //},

            editable: true
        });
    }
}

function SaveModifier() {

    var PrntItmKy = $("#ItmKy").val();
    var grid = $("#ModiGrid").data("kendoGrid");
    if (grid.dataSource.data != null) {
        var currentData = grid.dataSource.data();
        var newRecords = [];

        for (var i = 0; i < currentData.length; i++) {
            newRecords.push(currentData[i].toJSON());
        }

        $.ajax({
            url: urlModifier_Insert,
            dataType: "json",
            type: "POST",
            data: JSON.stringify({
                newGrid: kendo.stringify(newRecords),
                PrntItmKy: PrntItmKy
            }),
            contentType: 'application/json; charset=utf-8',
            success: function (Data) {
                if (Data == true) {
                    alert("Save Successfully!")
                    LoadModifierGrid();
                }
                else {
                    alert("Record Not Saved!")
                    LoadModifierGrid();
                }
            },
            error: function (e) {
                alert("Record Not Saved!");
                LoadModifierGrid();
                return false;
            }
        });

    }
}

document.addEventListener("keydown", function (event) {
    alert('');
    if (event.key === "Delete") {
        if (GridDeleteRowIndex >= 0) {
            var keyvalue = gridSelectRowData.POSModifierKy;
            alert(keyvalue);
            if (keyvalue.length != 0)
            {
                var answer = confirm("Are you sure you want to delete from the database?")
                if (answer) {
                    $.ajax({
                        url: urlModifier_Delete,
                        data: JSON.stringify({
                            ModifierItmKy: keyvalue
                        }),
                        contentType: "application/json; charset=utf-8",
                        dataType: "Json",
                        type: "POST",
                        success: function (data) {

                            if (data == true) {
                                alert("Successfully Delete..!");
                                LoadModifierGrid();
                                gridSelectRowData = "";
                                GridDeleteRowIndex = -1;

                            } else {
                                alert("Record Not Deleted");
                                LoadModifierGrid();
                            }
                        },
                        error: function (e) {
                            alert("Record Not Deleted");
                            LoadModifierGrid();

                            return false;
                        }
                    });
                }
            }

        }

    }
    else if (event.key === "Enter") {

    }
});

function getItm() {
    
    var grid = $("#ModiGrid").data("kendoGrid").dataSource.data()[0];
    var ItemCode = grid.ModifierItmCd;
    var EAN = "";

    if (ItemCode != '' & ItemCode != OldItmCd) {
        OldItmCd = ItemCode;
   
        $.ajax({
            url: GetItemByCodeEAN,
            data: {
                ItemCode: ItemCode,
                EAN: EAN
            },
            dataType: "Json",
            type: "POST",
            success: function (DBData) {
                var FinalData = [];
                var grid = $("#ModiGrid").data("kendoGrid");
                var CurrentData = grid.dataSource.data();
                var firstItem = CurrentData[0];
                var PrntItmKy = DBData[0].PrntItmKy;
                var ItmKy = DBData[0].ItmKy;
                var ItmCd = DBData[0].ItemCode;
                var ItmNm = DBData[0].ItemName;
                var Rate = DBData[0].Rate;
                var POSModifierKy = DBData[0].POSModifierKy;

                firstItem.ModifierItmNm = ItmNm;
                firstItem.ModifierItmKy = ItmKy;
               firstItem.PrntItmKy = PrntItmKy;
               firstItem.ModifierPrice = Rate;
               firstItem.POSModifierKy = POSModifierKy;
                $("#ModiGrid").data("kendoGrid").dataSource.data(CurrentData);

            },
            error: function (e) {
                return false;
            }
        });
    }
}


function GridDeleteButtonIsClicked(e) {
    e.preventDefault();
    

    var grid = $("#ModiGrid").data("kendoGrid").dataSource.data()[0];


    var selectedItem = grid.dataItem($(this).closest("tr"));
    var dataItem = grid.dataItem($(e.currentTarget).closest("tr"));
    //alert(dataItem.ItmTrnKy)

    var answer = confirm("Are you sure you want to delete from the database?");
    dataItem.isAct = 0;
    if (answer) {

        $.ajax({
            url: POSModifier_Delete, // '@Url.Content("~/Promotion/InsertUpdateItmMasOfrHdr")',
            dataType: "json",
            type: "POST",
            data: JSON.stringify({
                ModifierItmKy: dataItem.POSModifierKy
            }),

            contentType: 'application/json; charset=utf-8',
            success: function (data) {
                if (data == true) {
                    alert("Delete Successfully");
                    LoadModifierGrid(); // update grid

                } else {
                    alert("Record Not delete");
                    LoadModifierGrid(); // update grid
                }
            },
            error: function (e) {
                alert("Error");
                LoadModifierGrid();
                return false;
            }

        });
    }


}

function showDetails(e) {
            var dataItem = this.dataItem($(e.currentTarget).closest("tr"));   
            var keyvalue = dataItem.POSModifierKy;
           
            if (keyvalue.length != 0) {
                var answer = confirm("Are you sure you want to delete from the database?")
                if (answer) {
                    $.ajax({
                        url: urlModifier_Delete,
                        data: JSON.stringify({
                            ModifierItmKy: keyvalue
                        }),
                        contentType: "application/json; charset=utf-8",
                        dataType: "Json",
                        type: "POST",
                        success: function (data) {

                            if (data == true) {
                                alert("Successfully Delete..!");
                                LoadModifierGrid();
                                gridSelectRowData = "";
                       

                            } else {
                                alert("Record Not Deleted");
                                LoadModifierGrid();
                            }
                        },
                        error: function (e) {
                            alert("Record Not Deleted");
                            LoadModifierGrid();

                            return false;
                        }
                    });
                }
            

        

    }
    else if (event.key === "Enter") {

    }


}



