
function LoadGridWithColumnProp(columnsFinal, gridNo) {

    if (gridNo == 1) {
        var dataSource = new kendo.data.DataSource({
            transport: {
                read: {
                    //url: urlItmTransferGetDetailByOrdKy,
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

                        });
                    }
                }
            },
            batch: true,
            sort: ({ field: "DisplayLiNo", dir: "desc" }),// "asc"
            pageSize: 10,
            schema: {
                model: {
                    id: "ItmTrnKy",
                    fields: //Relavent fields of the grid should be bind with following model items
                    {                        
                        FrmOrdDetKy: { editable: true, nullable: false, type: "number" },
                        ItmTrnKy: { editable: true, nullable: false, type: "number" },
                        FrmOrdDetCmpnKy: { editable: true, nullable: false, type: "number" },
                        LiNo: { editable: false, nullable: false, type: "number" },
                        DisplayLiNo: { editable: true, nullable: false, type: "number" }, 
                        ItmKy: { editable: false, nullable: false, type: "number" },
                        ItmNo: { editable: true, nullable: false, type: "string" },
                        ItmCd: { editable: false, nullable: false, type: "string" },
                        ItmNm: { editable: false, nullable: false, type: "string" },
                        Unit: { editable: true, nullable: false },
                        UnitKy: { editable: true, nullable: false, defaultValue: 1 },
                        Des: { editable: true, nullable: false, type: "string" },
                        POQty: { editable: true, nullable: false, type: "number" },
                        ReMnQty: { editable: true, nullable: false, type: "number" },
                        TrnQty: { editable: true, nullable: false },
                        TrnRate: { editable: true, nullable: false, type: "number" },
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
                        IsAct: { editable: true, nullable: false, type: "number", defaultValue: 1 },
                        PrcsDetKy: { editable: true, nullable: false, type: "number" },
                        PrcsID: { editable: true, nullable: false, type: "string" }
                    }
                }
            }
        });

        var id = ("#" + viewBag.OurCd);
        $(id).kendoGrid({
            dataSource: dataSource,
            autobind: true,

            navigatable: true,
            filterable: {
                mode: "row"
            },
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

        });
    }
}

function LoadGridView1() {

    var columnsDefine = [

       { field: "ItmTrnKy", title: "ItmTrnKy", width: "100px", hidden: true },
       { field: "FrmOrdDetKy", title: "FrmOrdDetKy", width: "100px", hidden: true },
       { field: "FrmOrdDetCmpnKy", title: "FrmOrdDetCmpnKy", width: "100px", hidden: true },
       { field: "LiNo", title: "Li No", width: "100px", hidden: true },
       {
           field: "DisplayLiNo", title: "Display LiNo", width: "100px",
           editor: function (container, options) {
               var model = options.model;
           }
       }, 
       { field: "ItmKy", title: "ItmKy", width: "100px", hidden: true },
       { field: "ItmNo", title: "Item No", width: "80px" },
       { field: "ItmCd", title: "Item Code", width: "350px" },
       { field: "ItmNm", title: "Item Name", width: "350px"},
       { field: "Unit", title: "Unit", width: "100px" },
       {
           field: "UnitKy", title: "Unit", width: "100px", hidden: true,
           editor: function (container, options) {
               var model = options.model;
           }
       },
       {
           field: "POQty", title: "POQty", width: "150px",
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
           //editor: function (container, options) {
           //    var model = options.model;
           //}
       },
       {
           field: "TrnRate", title: "Trn Rate", width: "150px", format: "{0:N2}",hidden:true,
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
           field: "SubTotal", title: "SubTotal", width: "150px", format: "{0:N2}", hidden: true,
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
           field: "VAT", title: "VAT %", width: "150px", hidden: false, format: "{0:N2}", hidden: true,
           editor: function (container, options) {
               var model = options.model;
           }
       },
       {
           field: "VatAmt", title: "VAT Amount", width: "150px", format: "{0:N2}", hidden: true,
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
           field: "NBT", title: "NBT %", width: "150px", hidden: false, format: "{0:N2}", hidden: true,
           editor: function (container, options) {
               var model = options.model;
           }
       },
       {
           field: "NBTAmt", title: "NBT Amount", width: "150px", hidden: false, format: "{0:N2}", hidden: true,
           editor: function (container, options) {
               var model = options.model;
           }
       },
       {
           field: "SVAT", title: "SVAT %", width: "150px", format: "{0:N2}", hidden: true,
           editor: function (container, options) {
               var model = options.model;
           }
       },
       {
           field: "PrcsDetKy", title: "PrcsDetKy", width: "150px", hidden:true,
           editor: function (container, options) {
               var model = options.model;
           }
       },

         {
             field: "PrcsID", title: "Task ID", width: "150px", hidden: false,//only for hovel
             editor: function (container, options) {
                 var model = options.model;
             }
         },
       {
           field: "SVatAmt", title: "SVAT Amount", width: "150px", format: "{0:N2}", hidden: true,
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
           field: "IsAct", title: "IsAct", width: "50px", hidden: true,
           editor: function (container, options) {
               var model = options.model
           }
       },
       {
           width: "60px",
           template: kendo.template($("#command-template").html())
       }
    ];

    var gridNo = 1;
    //old oblmas GridFunction 
    var columnsFinal = setGridColumnProp(columnsDefine, 'FormGrd', gridNo);
    //var columnsFinal = setColumnProp(columnsDefine, viewBag.ObjKy, '', 'FormGrd', gridNo);
}

function onDataBound(e)
{
    var id = ("#" + viewBag.OurCd);
    var grid1 = $(id).data("kendoGrid");   
    var dataSource = grid1.dataSource.data();  
    for (var i = 0; i < dataSource.length; i++) {
        if (dataSource[i].IsAct == 0)
        {
            grid1.tbody.find("[data-uid='" + dataSource[i].uid + "']").hide();
        }
    }
    ArrangeLiNo();
}

    