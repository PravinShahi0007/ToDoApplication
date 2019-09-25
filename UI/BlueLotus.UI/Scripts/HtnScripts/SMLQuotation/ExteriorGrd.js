function GridLoadTemplate(GrdId, OurCode, ModelKy) {

    var dataSource = new kendo.data.DataSource({
        transport: {
            read: {
                url: urlLoadGridDetai, // '@Url.Content("~/ManageAllAccount/GetAccGrid")',
                data: {
                    'ObjKy': viewBag.ObjKy,
                    'ItmCatOurCd': OurCode,
                    'ModelKy': ModelKy
                },
                dataType: "json"
            },

        },
        batch: true,
        sort: ({ field: "LiNo", dir: "desc" }),
        pageSize: 20,
        schema: {
            model: {
                id: "PartKy",
                fields: //Relavent fields of the grid should be bind with following model items
                {
                    PartKy: { editable: false, nullable: false, type: "number" },
                    LiNo: { editable: true, nullable: false, type: "number" },
                    PartCode: { editable: true, nullable: false, type: "string" },
                    PartName: { editable: true, nullable: false, type: "string" },
                    SubCategory: { editable: true, nullable: false, type: "string" },
                    Price: { editable: true, nullable: true, type: "number" },
                    Select: { editable: true, nullable: true, type: "boolean" },
                    //LiNo2: { editable: true, nullable: false, type: "number"},
                }
            }
        }
    });

    $(GrdId)
        .kendoGrid({
            dataSource: dataSource,
            sortable: true,
            autobind: true,
            navigatable: true,
            editable: true,
            filterable: {
                mode: "row"
            },
            reorderable: true,
            scrollable: true,
            pageSize: 10,
            //   pageable: true,
            selectable: "row",
            resizable: true,
            //  dataBound: onDataBound,
            pageable: {
                refresh: true,
                pageSizes: [5, 10, 20, 50, 100]
            },
            columns: [
        {
            field: "PartKy",
            title: "PartKy",
            width: "100px",
            hidden: "true",
            editor: function (container, options) {
                var model = options.model;
            }

        },//LiNo2
        //{
        //    field: "LiNo2",
        //    title: "LiNo2",
        //    width: "40px",
        //    attributes: { class: "ob-Center" }
        //},
        {
            field: "LiNo",
            title: "LiNo",
            width: "40px",
            attributes: { class: "ob-Center" },
            editor: function (container, options) {
                var model = options.model;
            }
        },
        {
            field: "PartCode",
            title: "Part Code",
            width: "200px",
            // hidden: "true",
            editor: function (container, options) {
                var model = options.model;
            }

        },
        {
            field: "PartName",
            title: "Part Name",
            width: "400px",
            editor: function (container, options) {
                var model = options.model;
            }
            //locked: true,
            //lockable: false
        },
        {
            field: "SubCategory",
            title: "Sub Category",
            width: "250px",
            editor: function (container, options) {
                var model = options.model;
            }
            //locked: true,
            //lockable: false
        },
        {
            field: "Price",
            title: "Price",
            width: "200px",
            format: "{0:c2}",
            // format: "c0",
            // format: "c",
            //   format: "{0:N2}",
            decimals: 3,
            attributes: {
                style: "text-align: right"
            },
            //hidden: "true",
            editor: function (container, options) {
                var model = options.model;
            }

        },
        {
            template: '<input type="checkbox" #= Select ? \'checked="checked"\' : "" # class="chkbx" />',
            attributes: { style: "text-align:Center;" },
            // field: "Select",
            title: "Select",
            width: "150px",
            editor: function (container, options) {
                var model = options.model;
            }
        }

            ]

        });

    $("#Exterior_Grd .k-grid-content").on("change", "input", function (e) {
        var grid = $("#Exterior_Grd").data("kendoGrid");
        dataItem = grid.dataItem($(e.target).closest("tr"));
        if (dataItem == null) {
            return;
        }
        dataItem.set("Select", this.checked);
        if (dataItem.Select == true) {
            dataItem.set("Select", true);
            dataItem.dirty = true;
            SummeryGridLoad();
            //    TotalCalculation();
        } else {
            dataItem.set("Select", false);
            dataItem.dirty = true;
            SummeryGridLoad();
            //  TotalCalculation();
        }
        grid.refresh();
    });
    $("#Interior_Grd .k-grid-content").on("change", "input", function (e) {
        var grid = $("#Interior_Grd").data("kendoGrid");
        dataItem = grid.dataItem($(e.target).closest("tr"));
        if (dataItem == null) {
            return
        }
        dataItem.set("Select", this.checked);
        if (dataItem.Select == true) {
            dataItem.set("Select", true);
            dataItem.dirty = true;
            SummeryGridLoad();

            //TotalCalculation();
        } else {
            dataItem.set("Select", false);
            dataItem.dirty = true;
            SummeryGridLoad();

           // TotalCalculation();

        }
        grid.refresh();
    });
    $("#Technology_Grd .k-grid-content").on("change", "input", function (e) {
        var grid = $("#Technology_Grd").data("kendoGrid");
        dataItem = grid.dataItem($(e.target).closest("tr"));
        if (dataItem == null) {
            return
        }
        dataItem.set("Select", this.checked);
        if (dataItem.Select == true) {
            dataItem.set("Select", true);
            dataItem.dirty = true;
            SummeryGridLoad();

          //  TotalCalculation();
        } else {
            dataItem.set("Select", false);
            dataItem.dirty = true;
            SummeryGridLoad();

           // TotalCalculation();
        }
        grid.refresh();
    });
    $("#Accessories_Grd .k-grid-content").on("change", "input", function (e) {
        var grid = $("#Accessories_Grd").data("kendoGrid");
        dataItem = grid.dataItem($(e.target).closest("tr"));
        if (dataItem == null) {
            return
        }
        dataItem.set("Select", this.checked);
        if (dataItem.Select == true) {
            dataItem.set("Select", true);
            dataItem.dirty = true;
            SummeryGridLoad();

          //  TotalCalculation();
        } else {
            dataItem.set("Select", false);
            dataItem.dirty = true;
            SummeryGridLoad();

          //  TotalCalculation();
        }
        grid.refresh();
    });

    $("#Wheels_Grd .k-grid-content").on("change", "input", function (e) {
        var grid = $("#Wheels_Grd").data("kendoGrid");
        dataItem = grid.dataItem($(e.target).closest("tr"));
        if (dataItem == null) {
            return;
        }
        dataItem.set("Select", this.checked);
        if (dataItem.Select == true) {
            dataItem.set("Select", true);
            dataItem.dirty = true;
            SummeryGridLoad();

            //  TotalCalculation();
        } else {
            dataItem.set("Select", false);
            dataItem.dirty = true;
            SummeryGridLoad();

            //  TotalCalculation();
        }
        grid.refresh();
    });
}



function SummeryGridLoad() {

    var dataSource = new kendo.data.DataSource({
        data: [
            { Catogory: "Exterior", Cost: CalculateTotalSelected('#Exterior_Grd') },
            { Catogory: "Interior", Cost: CalculateTotalSelected('#Interior_Grd') },
          { Catogory: "Technology", Cost: CalculateTotalSelected('#Technology_Grd') },
           { Catogory: "Accessories", Cost: CalculateTotalSelected('#Accessories_Grd') },
        { Catogory: "Wheels", Cost: CalculateTotalSelected('#Wheels_Grd') }
        ],
        batch: true,
        pageSize: 20,
        schema: {
            model: {
                id: "PartKy",
                fields: //Relavent fields of the grid should be bind with following model items
                {
                    Catogory: { editable: false, nullable: false, type: "string" },
                    Cost: { editable: false, nullable: false, type: "number" }
                }
            }
        }
    });

    $('#summary_Grd')
        .kendoGrid({
            dataSource: dataSource,
            autobind: true,
            navigatable: true,
            editable: false,
            pageSize: 10,
            selectable: "row",
            resizable: true,
            pageable: {
                refresh: true,
                pageSizes: [5, 10, 20, 50, 100]
            },
            //  detailInit: detailInit,
            dataBound: function () {
                this.expandRow(this.tbody.find("tr.k-master-row").first());
            },
            columns: [
                        {
                            field: "Catogory",
                            title: "Catogory",
                            width: "520px",
                            editor: function (container, options) {
                                var model = options.model;
                            }

                        },
                        {
                            field: "Cost",
                            title: "Cost",
                            width: "500px",
                            format: "{0:N2}",
                            decimals: 3,
                            attributes: {
                                style: "text-align: right"
                            },
                            editor: function (container, options) {
                                var model = options.model;
                            }
                        }


            ]

        });
    //function detailInit(e) {
    //    $("<div id='Child' />").appendTo(e.detailCell).kendoGrid({
    //        dataSource: {

    //            //type: "odata",
    //            //transport: {
    //            //    read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Orders"
    //            //},
    //            serverPaging: true,
    //            serverSorting: true,
    //            serverFiltering: true,
    //            pageSize: 10,
    //            filter: { field: "EmployeeID", operator: "eq", value: e.data.EmployeeID }
    //        },
    //        scrollable: false,
    //        sortable: true,
    //        pageable: true,
    //        columns: [
    //            {
    //                field: "PartKy",
    //                title: "PartKy",
    //                width: "100px",
    //                hidden: "true",
    //                editor: function (container, options) {
    //                    var model = options.model;
    //                }

    //            },
    //    {
    //        field: "LiNo",
    //        title: "LiNo",
    //        width: "40px",
    //        attributes: { class: "ob-Center" },
    //        editor: function (container, options) {
    //            var model = options.model;
    //        }
    //    },
    //    {
    //        field: "PartCode",
    //        title: "Part Code",
    //        width: "200px",
    //        // hidden: "true",
    //        editor: function (container, options) {
    //            var model = options.model;
    //        }

    //    },
    //    {
    //        field: "PartName",
    //        title: "Part Name",
    //        width: "400px",
    //        editor: function (container, options) {
    //            var model = options.model;
    //        }
    //        //locked: true,
    //        //lockable: false
    //    },
    //    {
    //        field: "SubCategory",
    //        title: "Sub Category",
    //        width: "250px",
    //        editor: function (container, options) {
    //            var model = options.model;
    //        }
    //        //locked: true,
    //        //lockable: false
    //    },
    //    {
    //        field: "Price",
    //        title: "Price",
    //        width: "200px",
    //        format: "{0:N2}",
    //        decimals: 3,
    //        attributes: {
    //            style: "text-align: right"
    //        },
    //        //hidden: "true",
    //        editor: function (container, options) {
    //            var model = options.model;
    //        }

    //    },
    //    {
    //        template: '<input type="checkbox" #= Select ? \'checked="checked"\' : "" # class="chkbx" />',
    //        attributes: { style: "text-align:Center;" },
    //        // field: "Select",
    //        title: "Select",
    //        width: "150px",
    //        editor: function (container, options) {
    //            var model = options.model;
    //        }
    //    }
    //        ]
    //    });
    //}


}

function CalculateTotalSelected(gridName) {
    var Caltotal = 0.00;
    var grid = $(gridName).data("kendoGrid");
    var currentData = grid.dataSource.data();
    for (var i = 0; i < currentData.length; i++) {
        if (currentData[i].Select) {
            Caltotal += currentData[i].Price;
        }
    }
    return Caltotal.toFixed(2);
}

function ExtractData(gridName) {
    var newRecords = [];
    var currentData = $(gridName).data("kendoGrid").dataSource.data();;
    for (var i = 0; i < currentData.length; i++) {
        if (currentData[i].Select) {
            newRecords.push(currentData[i].toJSON());
        }
    }
    grid2.setDataSource(new kendo.data.DataSource(ds2));
}

