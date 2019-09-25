
function LoadGridWithColumnProp(columnsFinal, gridNo) {

    if (gridNo == 1) {
        var dataSource = new kendo.data.DataSource({

            batch: true,
            sort: ({ field: "LiNo", dir: "desc" }),// "asc"
            pageSize: 10,
            schema: {
                model: {
                    id: "ItmTrnKy",
                    fields: //Relavent fields of the grid should be bind with following model items
                    {
                        ItmTrnKy: { editable: false, nullable: false, type: "number" },
                        LiNo: { editable: true, nullable: false, type: "number" },
                        trnRate: { editable: true, nullable: false, type: "number" },
                        EftvDt: { editable: true, nullable: false, type: "date", format: "{0:dd/MM/yyyy}" },
                        PrjId: { editable: true, nullable: false, type: "string" },
                        PrjKy: { editable: false, nullable: false, type: "number" },
                        PrcsDetKy: { editable: true, nullable: false, type: "number" },
                        PrcsID: { editable: true, nullable: false, type: "string" },
                        AdrKy: { editable: true, nullable: false, type: "number" },
                        AdrId: { editable: true, nullable: false, type: "string" },
                        TrnQty: { editable: true, nullable: false, type: "number" },
                        UnitKy: { editable: true, nullable: false, type: "number" },
                        Unit: { editable: true, nullable: false, type: "string" },
                        ItmKy: { editable: true, nullable: false, type: "number" },
                        isAct: { editable: true, nullable: false, },
                        //LocKy: { editable: false, nullable: false, type: "number" },
                    }
                }
            }
        });

        var id = ("#" + viewBag.OurCd);

        $(id).kendoGrid({
            dataSource: dataSource,
            autobind: true,
            height: "325px",
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
            dataBound: onDataBound,
            resizable: true,
            //dataBound: onDataBound,
            dataBinding: function () {
                record = (this.dataSource.page() - 1) * this.dataSource.pageSize();
            },

            editable: true,
            edit: function (e) {

            }

        });
    }
}



function LoadGridView() {

    var columnsDefine = [

        {
            field: "ItmTrnKy", title: "ItmTrnKy", width: "70px", hidden: true, editor: function (container, options) {
                var model = options.model; }
        },
        {
            field: "LiNo", title: "Li No", width: "50px", editor: function (container, options) {
                var model = options.model;  }
        },
        {
            field: "EftvDt", title: "EftvDt", width: "60px", format: "{0:dd/MM/yyyy}",
            editor: function (container, options) {
                var model = options.model;   }
        },
        {
            field: "PrjId", title: "PrjId", width: "70px", editor: function (container, options) {
                var model = options.model;  }
        },
        {
            field: "PrjKy", title: "PrjKy", width: "70px", hidden: true, editor: function (container, options) {
                var model = options.model; }
        },
        {
            field: "PrcsDetKy", title: "TaskKy", width: "70px", hidden: true, editor: function (container, options) {
                var model = options.model;   }
        },
        {
            field: "PrcsID", title: "TaskId", width: "50px", editor: function (container, options) {
                var model = options.model; }
        },
        {
            field: "AdrKy", title: "AdrKy", width: "70px", hidden: true, editor: function (container, options) {
                var model = options.model; }
        },
        {
            field: "AdrId", title: "AdrId", width: "40px", editor: function (container, options) {
                var model = options.model; }
        },
        {
            field: "TrnQty", title: "Qty", width: "50px", editor: function (container, options) {
                var model = options.model; }
        },
        {
            field: "trnRate", title: "Rate", width: "50px", editor: function (container, options) {
                var model = options.model;
            }
        },
        {
            field: "UnitKy", title: "Unit Key", width: "90px", hidden: true, editor: function (container, options) {
                var model = options.model; }
        },
        {
            field: "Unit", title: "Unit", width: "30px", editor: function (container, options) {
                var model = options.model; }
        },
        {
            field: "ItmKy", title: "ItmKy", width: "100px", hidden: true, editor: function (container, options) {
                var model = options.model; }
        },
        {
            field: "isAct", title: "IsAct", width: "50px", hidden: true, editor: function (container, options) {
                var model = options.model; }
        },
        //{
        //    field: "LocKy", title: "LocKy", width: "70px", hidden: true, editor: function (container, options) {
        //        var model = options.model;
        //    }
        //},
        {
            width: "50px",
            template: kendo.template($("#command-template").html())
        },
        
    ];

    var gridNo = 1;
    var columnsFinal = setColumnProp(columnsDefine, viewBag.ObjKy, '', 'FormGrd', gridNo);

}