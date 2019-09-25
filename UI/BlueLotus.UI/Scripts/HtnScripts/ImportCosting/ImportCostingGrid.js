function GridDefaultColumns() {
    var columnsSetDefine = [
        {
            field: "TrnKy",
            title: "TrnKy3232",
            width: "100px",
            hidden: "true",
            editor: function (container, options) {
                var model = options.model;
            }

        },
        {
            field: "CdKy",
            title: "CdKy",
            width: "40px",
            hidden: "true",
            //locked: true,
            //lockable: false,
            attributes: { class: "ob-Center" },
            editor: function (container, options) {
                var model = options.model;
            }
        },
        {
            field: "Code",
            title: "Code",
            width: "100px",
            editor: function (container, options) {
                var model = options.model;
            }

        },
        {
            field: "CdNm",
            title: "CdNm",
            width: "100px",
            editor: function (container, options) {
                var model = options.model;
            }
            //locked: true,
            //lockable: false
        },
        {
            field: "Amt",
            title: "Amt",
            width: "150px",
            format: "{0:N2}",
            editor: function (container, options) {
                var model = options.model;
                //$('<input id="Amt" name="' + options.field + '" data-value-field="' + options.field + '" data-bind="value:' + options.field + '" data-format="' + options.format + '"/>').appendTo(container).kendoNumericTextBox({
                //    change: function (e) {
                //       // setTotaltoHdr();
                //    }
                //});
                $('<input data-bind="value:' + options.field + '"/>')
                    .appendTo(container)
                    .kendoNumericTextBox({
                        spinners: false,
                        decimals: 3,
                        min: 0,
                    });
            }
            //locked: true,
            //lockable: false
        },
        {
            field: "TrnCdKy",
            title: "TrnCdKy",
            width: "100px",
            hidden: "true",
            editor: function (container, options) {
                var model = options.model;
            }

        }


    ];


    var gridNo = 1;
   

    var columnsFinal = setColumnProp(columnsSetDefine, viewBag.ObjKy, '', 'FormGrd', gridNo);
}

function LoadGridWithColumnProp(columnsFinal, gridNo) {
    var dataSource = new kendo.data.DataSource({
        transport: {
            read: {
                url: UrlLoadGrid, // '@Url.Content("~/ManageAllAccount/GetAccGrid")',
                data: {
                    'TrnKy': FormGlblData.TrnKy,
                    'ObjKy': viewBag.ObjKy
                },
                dataType: "json",
                cache: false
            },

        },
        batch: true,
     //   sort: ({ field: "LiNo", dir: "desc" }),
        pageSize: 10,
        schema: {
            model: {
                id: "TrnCdKy",
                fields: //Relavent fields of the grid should be bind with following model items
                {
                    TrnKy: { editable: false, nullable: false, type: "number" },
                    CdKy: { editable: false, nullable: false, type: "number" },
                    Code: { editable: false, nullable: false, type: "string" },
                    CdNm: { editable: false, nullable: false, type: "string" },
                    Amt: { editable: true, nullable: false, type: "number" },
                    TrnCdKy: { editable: false, nullable: false, type: "number" }

                  
                }
            }
        }
    });

    $("#HdrGrd")
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
            pageSize: 5,
            pageable: true,
            selectable: "row",
            resizable: true,
            pageable: { refresh: true, pageSizes: [5, 10, 20, 50, 100] },
            columns: columnsFinal,

        });
}


function DetailDefaultColumns() {
    var columnsDefine = [
        {
            field: "ItmTrnKy",
            title: "ItmTrnKy",
            width: "100px",
            hidden: "true",
            editor: function (container, options) {
                var model = options.model;
            }

        },
        {
            field: "CdKy",
            title: "CdKy",
            width: "40px",
            hidden: "true",
            //locked: true,
            //lockable: false,
            attributes: { class: "ob-Center" },
            editor: function (container, options) {
                var model = options.model;
            }
        },
        {
            field: "Code",
            title: "Code",
            width: "100px",
            editor: function (container, options) {
                var model = options.model;
            }

        },
        {
            field: "CdNm",
            title: "CdNm",
            width: "100px",
            editor: function (container, options) {
                var model = options.model;
            }
            //locked: true,
            //lockable: false
        },
        {
            field: "Amt",
            title: "Amt",
            width: "150px",
            format: "{0:N2}",
            editor: function (container, options) {
                var model = options.model;
                $('<input data-bind="value:' + options.field + '"/>')
                    .appendTo(container)
                    .kendoNumericTextBox({
                        spinners: false,
                        decimals: 3,
                        min: 0
                    });
            }
            //locked: true,
            //lockable: false
        },
        {
            field: "ItmTrnCdKy",
            title: "ItmTrnCdKy",
            width: "100px",
            hidden: "true",
           // hidden: "true",
            editor: function (container, options) {
                var model = options.model;
            }

        }

    ];


    var gridNo = 3;
    var columnsFinal = setColumnProp(columnsDefine, viewBag.ObjKy, '', 'FormGrd', gridNo);
}

function LoadGridWithColumnPropThree(columnsFinal, gridNo) {

    var dataSource = new kendo.data.DataSource({
        //transport: {
        //    read: {
        //        url: UrlLoadGrid, // '@Url.Content("~/ManageAllAccount/GetAccGrid")',
        //        data: {
        //            'TrnKy': FormGlblData.TrnKy,
        //            'ObjKy': viewBag.ObjKy
        //        },
        //        dataType: "json",
        //        cache: false
        //    },

        //},
        batch: true,
        //   sort: ({ field: "LiNo", dir: "desc" }),
        pageSize: 10,
        schema: {
            model: {
                id: "ItmTrnKy",
                fields: //Relavent fields of the grid should be bind with following model items
                {
                    ItmTrnKy: { editable: false, nullable: false, type: "number" },
                    CdKy: { editable: true, nullable: false, type: "number" },
                    Code: { editable: true, nullable: false, type: "string" },
                    CdNm: { editable: true, nullable: false, type: "string" },
                    Amt: { editable: true, nullable: false, type: "number" },
                    ItmTrnCdKy: { editable: false, nullable: false, type: "number" },


                }
            }
        }
    });

    $("#DetailGrd")
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
            pageable: true,
            selectable: "row",
            resizable: true,
            pageable: { refresh: true, pageSizes: [5, 10, 20, 50, 100] },
            columns: columnsFinal,

        });
}