
var OrdKy1 = 1;

function LoadGridWithColumnProp(columnsFinal, gridNo) {

    if (gridNo == 1) {
        var dataSource = new kendo.data.DataSource({
            transport: {
                read: {
                    url: urlBOQOrdDet_SelectWeb,
                    dataType: "json"
                },
                update: {
                    url: urlUpdateToDoHome,
                    contentType: 'application/json; charset=utf-8',
                    dataType: "json",
                    type: "POST",
                    complete: function (e) {
                        alert("Updated successfully..!");
                        var grid = $("#grid").data("kendoGrid");
                        grid.dataSource.read();
                    }
                },
                destroy: {
                    url: urlUpdateToDov,
                    contentType: 'application/json; charset=utf-8',
                    dataType: "json",
                    type: "POST",
                    data: { isAct: 0 },
                    complete: function (e) {
                        var grid = $("#grid").data("kendoGrid");
                        grid.dataSource.read();
                    }
                },
                create: {
                    url: urlInsertToDoHome,
                    contentType: 'application/json; charset=utf-8',
                    dataType: "json",
                    type: "POST",
                    complete: function (e) {
                        alert("Saved successfully..!");
                        var grid = $("#grid").data("kendoGrid");
                        grid.dataSource.read();
                    }
                },
                parameterMap: function (options, operation) {
                    if (operation == "create" && options.models) {
                        return JSON.stringify({ 'todos': options.models }); // Parrameter name of the Controller Action method==> List<ToDoModel>todos
                    }
                    if (operation == "update" && options.models) {
                        return JSON.stringify({ 'todos': options.models }); // Parrameter name of the Controller Action method==> List<ToDoModel>todos

                    }
                    if (operation == "destroy" && options.models) {
                        return JSON.stringify({ 'todos': options.models }); // Parrameter name of the Controller Action method==> List<ToDoModel>todos

                    }
                    if (operation == "read") {
                        return ({
                            'ordKy': OrdKy1,
                            
                        });
                    }
                }
            },
            batch: true,
            sort: ({ field: "LiNo", dir: "asc" }),// "asc"
            pageSize: 10,
            schema: {
                model: {
                    id: "OrdDetKy",
                    fields: //Relavent fields of the grid should be bind with following model items
                    {
                        OrdDetKy: { editable: true, nullable: false, type: "number", defaultValue: 0 },
                        FrmOrdDetKy: { editable: true, nullable: false, type: "number" },
                        LiNo: { editable: true, nullable: false, type: "number" },
                        DisplayLiNo: { editable: true, nullable: false, type: "number" }, 
                        ItmKy: { editable: true, nullable: false, type: "number" },

                        ItmNo: { editable: true, nullable: false, type: "string" },
                        ItmCd: { editable: true, nullable: false, type: "string" },
                        ItmNm: { editable: true, nullable: false, type: "string" },
                        Unit: { editable: true, nullable: false },
                        UnitKy: { editable: true, nullable: false },
                        Des: { editable: true, nullable: false, type: "string" },
                        POQty: { editable: true, nullable: false, type: "number" },
                        ReMnQty: { editable: true, nullable: false, type: "number" },
                        TrnQty: { editable: true, nullable: false },
                        Rate: { editable: true, nullable: false, type: "number" },
                        TrnRate: { editable: true, nullable: false, type: "number" },

                        DOH: { editable: true, nullable: false, type: "number" },
                        GOH: { editable: true, nullable: false, type: "number" },
                        Profit: { editable: true, nullable: false, type: "number" },
                        
                        ReqDt: { editable: true, nullable: false, type: "string" },
                        SubTotal: { editable: true, nullable: false, type: "number" },
                        DisAmt: { editable: true, nullable: false, type: "number" },
                        DisPer: { editable: true, nullable: false, type: "number" },
                        VatAmt: { editable: true, nullable: false, type: "number" },
                        VAT: { editable: true, nullable: false, type: "number" },
                        WHT: { editable: true, nullable: false, type: "number" },
                        WHTAmt: { editable: true, nullable: false, type: "number" },
                        NBTAmt: { editable: true, nullable: false, type: "number" },
                        NBT: { editable: true, nullable: false, type: "number" },
                        SVatAmt: { editable: true, nullable: false, type: "number" },
                        SVAT: { editable: true, nullable: false, type: "number" },
                        Rem: { editable: true, nullable: false, type: "string" },
                        Anl3Ky: { editable: true, nullable: false, type: "number" },
                        Anl3Cd: { editable: true, nullable: false, type: "string" },
                        isAct: { editable: true, nullable: false, type: "number", defaultValue: 1 },
                    }
                }
            }
        });

        var id = ("#" + viewBag.OurCd);

        $(id).kendoGrid({
            dataSource: dataSource,
            autobind: true,

            navigatable: true,
            filterable: true,

            pageable: true,
            sortable: true,
            reorderable: true,
            columnMenu: true,

            selectable: "row",
            pageable: { refresh: true, pageSizes: [5, 10, 20, 50, 100] },

            columns: columnsFinal,

            resizable: true,
            dataBound: onDataBound,
            dataBinding: function () {
                record = (this.dataSource.page() - 1) * this.dataSource.pageSize();
            },

            editable: true,
            //success: onSuccess,

            edit: function (e) {

                var input = e.container.find(".k-input");
                var td = input.closest("td");
                var rowIndex = td.parent().index();
                var cellIndex = td.index();
                var AdrKy = $("#HdrSec2_CmbAdr_Cd").data('kendoComboBox').value();
                if (AdrKy == 0 || AdrKy == null) {
                    var AdrKy = 1;
                }
                var FrmLocKy = $("#HdrSec2_CmbLoc_Cd").data('kendoComboBox').value();

                if (FrmLocKy == 0 || FrmLocKy == null) {
                    var FrmLocKy = 1;
                }

                var PrjKy = 1;

                var Dt = $("#HdrSec1_DatPicDate_Val").val();
                input.on("keydown", function (event) {

                    if (event.keyCode == 13) {

                        if (cellIndex == 3) {

                            var input = e.container.find(".k-input");
                            var value = input.val();
                            if (value != 0 || value != null) {

                                $.ajax({
                                    url: urlPnsItemsLookUpByItmCd,
                                    dataType: "json",
                                    type: "POST",
                                    data: JSON.stringify({
                                        ConCd: "OrdTyp", OurCd: viewBag.OurCd, ItmCd: value,
                                        AdrKy: AdrKy,
                                        LocKy: FrmLocKy,
                                        PrjKy: PrjKy,
                                        Dat: Dt

                                    }),
                                    contentType: 'application/json; charset=utf-8',
                                    success: function (list) {


                                        if (list.length == 0 || list.length == null) {
                                            alert("Cannot find the item !");

                                        } else {

                                            for (i = 0; i < list.length; i++) {

                                                var itmcd = list[0].ItmCd;
                                                var itmky = list[0].ItmKy;
                                                var itmnm = list[0].ItmNm;
                                                var Rate = list[0].TrnRate;
                                                var UnitKy = list[0].UnitKy;
                                                var Unit = list[0].Unit;
                                                var DisPer = list[0].Disper;
                                                var VAT = list[0].VAT;
                                                var NBT = list[0].NBT;
                                                var SVAT = list[0].SVAT;
                                                var WHT = list[0].WHT;
                                                var input = e.container.find(".k-input");


                                                setProp(itmcd, itmky, itmnm, Unit, UnitKy, Rate, DisPer, VAT, NBT, SVAT, WHT, e.model);


                                                CreateNewGridRow();
                                                cellIndex = 6;

                                                var id = ("#" + viewBag.OurCd);
                                                var cellCloseT = $(id).data("kendoGrid").closeCell($(".k-grid-content").find("table").find("tbody").find("tr:eq(" + rowIndex + ")").find("td:eq(" + cellIndex + ")").parent());

                                                $(id).data("kendoGrid").editCell($(".k-grid-content").find("table").find("tbody").find("tr:eq(" + rowIndex + ")").find("td:eq(" + cellIndex + ")").next().focusin(cellCloseT));

                                                var grid = $(id).data("kendoGrid");
                                                grid.dataSource.read();
                                                var count = grid.dataSource.total();
                                                setRow(count, e.model);

                                            }
                                        }

                                    },
                                    error: function (e) {

                                    }

                                });


                            }

                        } else if (cellIndex == 4) {


                            CallItmNmWindow();
                            cellIndex = 2;
                            var id = ("#" + viewBag.OurCd);

                            var cellCloseT = $(id).data("kendoGrid").closeCell($(".k-grid-content").find("table").find("tbody").find("tr:eq(" + rowIndex + ")").find("td:eq(" + cellIndex + ")").parent());
                            $(id).data("kendoGrid").editCell($(".k-grid-content").find("table").find("tbody").find("tr:eq(" + rowIndex + ")").find("td:eq(" + cellIndex + ")").next().focusin(cellCloseT));


                        }
                        else if (cellIndex == 7) {

                            var qty = e.container.find(".k-input");
                            var qtyvalue = qty.val();
                            if (qtyvalue == "{0:N2}" || qtyvalue == null || qtyvalue == "" || qtyvalue == undefined || qtyvalue == 0.00) {

                                alert("Please Insert Qty");
                                cellIndex = 6;
                                var id = ("#" + viewBag.OurCd);
                                var cellCloseT = $(id).data("kendoGrid").closeCell($(".k-grid-content").find("table").find("tbody").find("tr:eq(" + rowIndex + ")").find("td:eq(" + cellIndex + ")").parent());
                                $(id).data("kendoGrid").editCell($(".k-grid-content").find("table").find("tbody").find("tr:eq(" + rowIndex + ")").find("td:eq(" + cellIndex + ")").next().focusin(cellCloseT));
                            } else {

                                rowIndex = rowIndex + 1;
                                cellIndex = 2;
                                var id = ("#" + viewBag.OurCd);
                                var cellCloseT = $(id).data("kendoGrid").closeCell($(".k-grid-content").find("table").find("tbody").find("tr:eq(" + rowIndex + ")").find("td:eq(" + cellIndex + ")").parent());
                                $(id).data("kendoGrid").editCell($(".k-grid-content").find("table").find("tbody").find("tr:eq(" + rowIndex + ")").find("td:eq(" + cellIndex + ")").next().focusin(cellCloseT));

                            }


                        }
                        else if (cellIndex == 5) {
                            alert();


                        }
                        return false;
                    }

                });

            },

        });
        var id = ("#" + viewBag.OurCd);
        var grid = $(id).data("kendoGrid");
        grid.table.kendoSortable({
            filter: ">tbody >tr",
            hint: function (element) { //customize the hint
                var table = $('<table style="width: 600px;" class="k-grid k-widget"></table>'),
                    hint;

                table.append(element.clone()); //append the dragged element
                table.css("opacity", 0.7);

                return table; //return the hint element
            },
            cursor: "move",
            placeholder: function (element) {
                return $('<tr colspan="4" class="placeholder"></tr>');
            },
            change: function (e) {
              
                 var id = ("#" + viewBag.OurCd);
                var grid = $(id).data("kendoGrid"),
                   oldIndex = e.oldIndex, // The old position
                   newIndex = e.newIndex, // The new position
                   data = grid.dataSource.data(),
                   dataItem = grid.dataSource.getByUid(e.item.data("uid")); // Retrieve the moved dataItem
                   dataItem.Dirty = true;
                    grid.dataSource.remove(dataItem);
                    grid.dataSource.insert(newIndex, dataItem);
                    ReIndexLino();
            }
        });


        
        
    }
    //OrdKy1 = 1;
}

function ArrangeLiNo() {
    var id = ("#" + viewBag.OurCd);
    var DisLino = 1;
    //var count = $(id).data().kendoGrid.dataSource.total();
    var dataSourceforLino = $(id).data("kendoGrid").dataSource.data();
    for (var a = 0; a < dataSourceforLino.length; a++) {
        if (dataSourceforLino[a].isAct == 1) {
            dataSourceforLino[a].set("LiNo", DisLino);
            DisLino++;
        }
    }
}

function ReIndexLino() {
    var id = ("#" + viewBag.OurCd);
    var grid1 = $(id).data("kendoGrid");
    var firstItemData = grid1.dataSource.data();
    for (var i = 1; i < firstItemData.length; i++) {
        var FirstRow = $(id).data().kendoGrid.dataSource.data()[i];
        FirstRow.set("LiNo", i);
    }

    
}

function onSuccess(e) {
    
    Calculatetotal();
}


function LoadGridView1(PrjKy) {

    OrdKy1 = PrjKy;

    var columnsDefine = [

       { field: "OrdDetKy", title: "OrdDetKy", width: "100px", hidden: true },
       { field: "FrmOrdDetKy", title: "FrmOrdDetKy", width: "100px", hidden: true },
       {
           field: "LiNo", title: "LiNo", width: "30px",
           editor: function (container, options) {
               var model = options.model;
           }
       },
       {
           field: "DisplayLiNo", title: "Display LiNo", width: "20px", hidden: true,  //This is display lino no field
           editor: function (container, options) {
               var model = options.model;
           }
       }, 
       {
           field: "ItmNo", title: "Item No", width: "30px", editor: function (container, options) {
               var model = options.model;
           }
       },
       { field: "ItmKy", title: "ItmKy", width: "100px", hidden: true },
       {
           field: "ItmCd", title: "Item Code", width: "150px",
           editor: function (container, options) {
               var model = options.model;
           }
       },
      
       {
           field: "ItmNm", title: "Item Name", width: "350px",
           editor: function (container, options) {
               var model = options.model;
           }
       },
        {
            field: "Des", title: "Description", width: "350px",
            editor: function (container, options) {
                var model = options.model;
            }
        },
       {
           field: "Unit", title: "Unit", width: "100px",
           editor: function (container, options) {
               var model = options.model;
           }
       },
       {
           field: "UnitKy", title: "Unit", width: "100px", hidden: true,
           editor: function (container, options) {
               var model = options.model;
           }
       },
       {
           field: "POQty", title: "POQty", width: "150px", hidden:true,
           editor: function (container, options) {
               var model = options.model;
           }
       },
       //ReMnQty
       {
           field: "ReMnQty", title: "ReMnQty", width: "150px",
           editor: function (container, options) {
               var model = options.model;
           }
       },
       {
           field: "TrnQty", title: "Qty", width: "150px",
           editor: function (container, options) {
               var model = options.model;
           }
       },
       {
           field: "Rate", title: "Rate", width: "150px", format: "{0:N2}",
           editor: function (container, options) {
               var model = options.model;
           }
       },
       {
           field: "TrnRate", title: "Trn Rate", width: "150px", format: "{0:N2}",
           editor: function (container, options) {
               var model = options.model;
           }
       },

       {
           field: "DOH", title: "DOH %", width: "150px", format: "{0:N2}",hidden:true,
           editor: function (container, options) {
               var model = options.model;
           }
       },
       {
           field: "GOH", title: "GOH %", width: "150px", format: "{0:N2}", hidden: true,
           editor: function (container, options) {
               var model = options.model;
           }
       },
       {
           field: "Profit", title: "Profit %", width: "150px", format: "{0:N2}", hidden: true,
           editor: function (container, options) {
               var model = options.model;
           }
       },

       {
           field: "ReqDt", title: "Req Date", width: "150px",
           editor: function (container, options) {
               var model = options.model;
           }
       },
       {
           field: "SubTotal", title: "SubTotal", width: "150px", format: "{0:N2}",
           editor: function (container, options) {
               var model = options.model;
           }
       },
       {
           field: "DisPer", title: "Discount %", width: "150px", format: "{0:N2}",
           editor: function (container, options) {
               var model = options.model;
           }
       },
       {
           field: "DisAmt", title: "Discount", width: "150px", format: "{0:N2}",
           editor: function (container, options) {
               var model = options.model;
           }
       },
       {
           field: "VAT", title: "VAT %", width: "150px", hidden: false, format: "{0:N2}",
           editor: function (container, options) {
               var model = options.model;
           }
       },
       {
           field: "VatAmt", title: "VAT Amount", width: "150px", format: "{0:N2}",
           editor: function (container, options) {
               var model = options.model;
           }
       },
       {
           field: "WHT", title: "WHT %", width: "150px", hidden: false, format: "{0:N2}", hidden: true,
           editor: function (container, options) {
               var model = options.model;
           }
       },
       {
           field: "WHTAmt", title: "WHT Amount", width: "150px", format: "{0:N2}", hidden: true,
           editor: function (container, options) {
               var model = options.model;
           }
       },
       {
           field: "NBT", title: "NBT %", width: "150px", hidden: false, format: "{0:N2}",
           editor: function (container, options) {
               var model = options.model;
           }
       },
       {
           field: "NBTAmt", title: "NBT Amount", width: "150px", hidden: false, format: "{0:N2}",
           editor: function (container, options) {
               var model = options.model;
           }
       },
       {
           field: "SVAT", title: "SVAT %", width: "150px", format: "{0:N2}",
           editor: function (container, options) {
               var model = options.model;
           }
       },
       {
           field: "SVatAmt", title: "SVAT Amount", width: "150px", format: "{0:N2}",
           editor: function (container, options) {
               var model = options.model;
           }
       },
       
       {
           field: "Rem", title: "Remarks", width: "250px",
           editor: function (container, options) {
               var model = options.model;
           }
       },
       {
           field: "Anl3Ky", title: "IssuTo", width: "150px", hidden: true,
           editor: function (container, options) {
           }
       },
       {
           field: "Anl3Cd", title: "Analysis3", width: "150px",
           editor: function (container, options) {
           }
       },
       {
           field: "isAct", title: "IsAct", width: "50px", hidden: true,
           editor: function (container, options) {
               var model = options.model
           }
       }
       //{
       //    width: "60px",
       //    template: kendo.template($("#command-template").html())
       //}
    ];

    var gridNo = 1;
    //old objmas
    // var columnsFinal = setColumnProp(columnsDefine, viewBag.ObjKy, '', 'FormGrd', gridNo);
    var columnsFinal = setGridColumnProp(columnsDefine, 'FormGrd', gridNo);
}

function onDataBound(e) {
    var id = ("#" + viewBag.OurCd);
    var grid = $(id).data("kendoGrid");
    var dataSource = grid.dataSource.data();
    for (var i = 0; i < dataSource.length; i++) {
        if (dataSource[i].isAct == 0) {
            grid.tbody.find("[data-uid='" + dataSource[i].uid + "']").hide();
            
        }
    }
    
    //ArrangeLiNo();
    Calculatetotal();
}