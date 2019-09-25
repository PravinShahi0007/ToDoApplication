//function GridIntDefaultColumnsds() {

//    var columnsIntDefine = [
//        {
//            field: "PartKy",
//            title: "PartKy",
//            width: "100px",
//            hidden: "true",
//            editor: function (container, options) {
//                var model = options.model;
//            }

//        },
//        {
//            field: "LiNo",
//            title: "LiNo",
//            width: "40px",
//            attributes: { class: "ob-Center" },
//            editor: function (container, options) {
//                var model = options.model;
//            }
//        },
//        {
//            field: "PartCode",
//            title: "Part Code",
//            width: "200px",
//            // hidden: "true",
//            editor: function (container, options) {
//                var model = options.model;
//            }

//        },
//        {
//            field: "PartName",
//            title: "Part Name",
//            width: "400px",
//            editor: function (container, options) {
//                var model = options.model;
//            }
//            //locked: true,
//            //lockable: false
//        },
//        {
//            field: "SubCategory",
//            title: "Sub Category",
//            width: "250px",
//            editor: function (container, options) {
//                var model = options.model;
//            }
//            //locked: true,
//            //lockable: false
//        },
//        {
//            field: "Price",
//            title: "Price",
//            width: "200px",
//            //hidden: "true",
//            editor: function (container, options) {
//                var model = options.model;
//            }

//        },
//        {
//            field: "Select",
//            title: "Select",
//            width: "150px",
//            editor: function (container, options) {
//                var model = options.model;
//            }
//        }

//    ];
//    var gridNo = 1;
//    var columnsIntFinal = setColumnProp(columnsIntDefine, viewBag.ObjKy, '', 'FormGrd', gridNo);
//}

function InteriorGrid() {

    var dataSource = new kendo.data.DataSource({
        transport: {
            read: {
                url: urlLoadGridDetai, // '@Url.Content("~/ManageAllAccount/GetAccGrid")',
                data: {
                    'ObjKy': viewBag.ObjKy,
                    'ItmCatOurCd': 'Interior',
                },
                dataType: "json"
            },

        },
        batch: true,
        sort: ({ field: "LiNo", dir: "desc" }),
        pageSize: 10,
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
                    Price: { editable: true, nullable: true, type: "string" },
                    Select: { editable: true, nullable: true, type: "boolean" },
                }
            }
        }
    });

    $("#Interior_Grd")
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
            //  dataBound: onDataBound,
            pageable: { refresh: true, pageSizes: [5, 10, 20, 50, 100] },
            columns: [
        {
            field: "PartKy",
            title: "PartKy",
            width: "100px",
            hidden: "true",
            editor: function (container, options) {
                var model = options.model;
            }

        },
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
            //hidden: "true",
            editor: function (container, options) {
                var model = options.model;
            }

        },
        {
            field: "Select",
            title: "Select",
            width: "150px",
            editor: function (container, options) {
                var model = options.model;
            }
        }

    ]

        });
}