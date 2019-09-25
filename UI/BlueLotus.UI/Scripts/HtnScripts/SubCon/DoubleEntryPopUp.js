//function LoadGridWithColumnPropThree(columnsFinal, gridNo) {

//    var dataSource = new kendo.data.DataSource({
//        transport: {
//            read: {
//                url: UrlDblEntry,
//                data: {
//                    trnKy: FormGlblData.TrnKy,
//                    ObjKy: viewBag.ObjKy,
//                },
//                dataType: "json",
//                cache: false
//            },
//        },
//        batch: true,
//        sort: ({ field: "LiNo", dir: "desc" }),
//        pageSize: 10,
//        schema: {
//            model: {
//                id: "AccTrnKy",
//                fields: //Relavent fields of the grid should be bind with following model items
//                {
//                    TrnKy: { editable: true, nullable: false, type: "number" },
//                    EftvDt: { editable: true, nullable: false, type: "string" },
//                    LiNo: { editable: true, nullable: false, type: "string" },
//                    AccCd: { editable: true, nullable: false, type: "string" },
//                    AccNm: { editable: true, nullable: false, type: "string" },
//                    DrAmt: { editable: true, nullable: true, type: "string" },
//                    CrAmt: { editable: true, nullable: true, type: "string" },
//                    AdrID: { editable: true, nullable: false, type: "string" },
//                    AdrNm: { editable: true, nullable: false, type: "string" },
//                    PrjID: { editable: true, nullable: false, type: "string" },
//                    AnlTyp2Nm: { editable: true, nullable: false, type: "string" }

//                }
//            }
//        }
//    });

//    $("#DoubleEntryGrid")
//        .kendoGrid({
//            dataSource: dataSource,
//            sortable: true,
//            autobind: true,
//            navigatable: true,
//            columnMenu: true,
//            editable: false,
//            filterable: {
//                mode: "row"
//            },
//            reorderable: true,
//            scrollable: true,
//            pageSize: 10,
//            pageable: true,
//            selectable: "row",
//            resizable: true,
//            dataBound: onDataBound,
//            pageable: { refresh: true, pageSizes: [5, 10, 20, 50, 100] },
//            columns: columnsFinal,

//        });
//}


//function DoubleColumns() {
//    var columnsDefine = [
//        {
//            field: "TrnKy",
//            title: "TrnKy",
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
//            //locked: true,
//            //lockable: false,
//            attributes: { class: "ob-Center" },
//            editor: function (container, options) {
//                var model = options.model;
//            }
//        },
//        {
//            field: "EftvDt",
//            title: "EftvDt",
//            width: "100px",
//            hidden: "true",
//            editor: function (container, options) {
//                var model = options.model;
//            }

//        },
//        {
//            field: "AccCd",
//            title: "AccCd",
//            width: "100px",
//            //hidden: "true",
//            editor: function (container, options) {
//                var model = options.model;
//            }

//        },
//        {
//            field: "AccNm",
//            title: "AccNm",
//            width: "120px",
//            editor: function (container, options) {
//                var model = options.model;
//            }
//        },
//        {
//            field: "DrAmt",
//            title: "DrAmt",
//            width: "70px",
//            editor: function (container, options) {
//                var model = options.model;
//            }
//        },
//        {
//            field: "CrAmt",
//            title: "CrAmt",
//            width: "70px",
//            editor: function (container, options) {
//                var model = options.model;
//            }
//        },
//        {
//            field: "AdrID",
//            title: "AdrID",
//            width: "70px",
//            editor: function (container, options) {
//                var model = options.model;
//            }
//        },

//        {
//            field: "AdrNm",
//            title: "AdrNm",
//            width: "70px",
//            hidden: "true",
//            editor: function (container, options) {
//                var model = options.model;
//            }
//        },
//        {
//            field: "PrjID",
//            title: "PrjID",
//            width: "70px",
//            editor: function (container, options) {
//                var model = options.model;
//            }
//        },
//        {
//            field: "AnlTyp2Nm",
//            title: "AnlTyp2Nm",
//            width: "70px",
//            editor: function (container, options) {
//                var model = options.model;
//            }
//        }

//    ];


//    var gridNo = 2;
//    var columnsFinal = setColumnProp(columnsDefine, viewBag.ObjKy, '', 'FindFormGridPayment', gridNo);
//}

function DoubleColumns() {
    if (FormGlblData.TrnKy < 10) {
        alert("Please Select a Trnsaction First");
        return;
    }


    try {
        $("#DoubleEntryGrid").data("kendoGrid").dataSource.filter(null);
        $("#DoubleEntryGrid").data("kendoGrid").dataSource.data([]);
    } catch (e) {

    }

    $("#DoubleEntryDiv")
        .show()
        .kendoWindow({
            width: "80%",
          //  height: "75%",
            modal: true,
            title: "Double Entry"
        });

    $("#DoubleEntryDiv").data("kendoWindow").center().open();
    LoadDoubleEntryGrid();
}


function LoadDoubleEntryGrid() {
    var dataSource = new kendo.data.DataSource({
        transport: {
            read: {
                url: UrlDblEntry,
                data: {
                    trnKy: FormGlblData.TrnKy,
                    ObjKy: viewBag.ObjKy,
                },
                dataType: "json",
                cache: false
            },
        },
        batch: true,
        pageSize: 12,
        schema: {
            model: {
                id: "AdrTypKy",
                fields: {
                    TrnKy: { editable: true, nullable: false, type: "number" },
                    TrnDt: { editable: true, nullable: false, type: "string" },
                    Lino: { editable: true, nullable: false, type: "string" },
                    AccCd: { editable: true, nullable: false, type: "string" },
                    AccNm: { editable: true, nullable: false, type: "string" },
                    DrAmt: { editable: true, nullable: true, type: "string" },
                    CrAmt: { editable: true, nullable: true, type: "string" },
                    //AdrID: { editable: true, nullable: false, type: "string" },
                    //AdrNm: { editable: true, nullable: false, type: "string" },
                    PrjID: { editable: true, nullable: false, type: "string" },
                    AnlTyp2Nm: { editable: true, nullable: false, type: "string" }
                }
            }
        }
    });
    $("#DoubleEntryGrid")
        .kendoGrid({
            dataSource: dataSource,
            navigatable: true,
            autobind: true,
            sortable: true,
            reorderable: true,
            filterable: true,
            selectable: "row",
            columnMenu: true,
            resizable: true,
            pageable: true,
            editable: true,
            columns: [
                  {
                      field: "TrnKy",
                      title: "TrnKy",
                      width: "100px",
                      hidden: "true",
                      editor: function (container, options) {
                          var model = options.model;
                      }
                  },
        {
            field: "Lino",
            title: "LiNo",
            width: "40px",
            //locked: true,
            //lockable: false,
            attributes: { class: "ob-Center" },
            editor: function (container, options) {
                var model = options.model;
            }
        },
        {
            field: "TrnDt",
            title: "EftvDt",
            width: "100px",
            hidden: "true",
            editor: function (container, options) {
                var model = options.model;
            }

        },
        {
            field: "AccCd",
            title: "AccCd",
            width: "100px",
            //hidden: "true",
            editor: function (container, options) {
                var model = options.model;
            }

        },
        {
            field: "AccNm",
            title: "AccNm",
            width: "120px",
            editor: function (container, options) {
                var model = options.model;
            }
        },
        {
            field: "DrAmt",
            title: "DrAmt",
            width: "70px",
            editor: function (container, options) {
                var model = options.model;
            }
        },
        {
            field: "CrAmt",
            title: "CrAmt",
            width: "70px",
            editor: function (container, options) {
                var model = options.model;
            }
        },
        //{
        //    field: "AdrID",
        //    title: "AdrID",
        //    width: "70px",
        //    editor: function (container, options) {
        //        var model = options.model;
        //    }
        //},

        //{
        //    field: "AdrNm",
        //    title: "AdrNm",
        //    width: "70px",
        //    hidden: "true",
        //    editor: function (container, options) {
        //        var model = options.model;
        //    }
        //},
        {
            field: "PrjID",
            title: "PrjID",
            width: "70px",
            editor: function (container, options) {
                var model = options.model;
            }
        },
        {
            field: "AnlTyp2Nm",
            title: "AnlTyp2Nm",
            width: "70px",
            editor: function (container, options) {
                var model = options.model;
            }
        }
            ]
        });
}