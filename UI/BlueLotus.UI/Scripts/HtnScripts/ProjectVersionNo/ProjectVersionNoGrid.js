function GridDefaultColumns() {
    var columnsDefine = [
        {
            field: "Lino",
            title: "Lino",
            width: "50px"
        },
        {
            field: "PrcsSchKy",
            title: "PrcsSchKy",
            width: "100px",
            hidden: "true"
        },
        {
            field: "Projects",
            title: "Projects",
            width: "100px"
        },
        {
            field: "VersionNo",
            title: "VersionNo",
            width: "100px"
        },
        {
            field: "IsAct",
            title: "IsAct",
            width: "100px"
        },
        {
            field: "IsApr",
            title: "IsApr",
            width: "100px"
        }
    ];
    var gridNo = 1;
    var columnsFinal = setColumnProp(columnsDefine, viewBag.ObjKy, "", "FormGrd", gridNo);
}

function FindGridDefaultColumns() {
    var columnsDefine = [
        {
            field: "PrcsSchKy",
            title: "PrcsSchKy",
            width: "100px",
            hidden: "true",
            editor: function (container, options) {
                var model = options.model;
            }
        },
        {
            field: "PreFix",
            title: "PreFix",
            width: "40px",
            //locked: true,
            //lockable: false,
            attributes: { class: "ob-Center" },
            editor: function (container, options) {
                var model = options.model;
            }
        },
        {
            field: "AdrId",
            title: "AdrId",
            width: "100px",
            editor: function (container, options) {
                var model = options.model;
            }

        },
        {
            field: "AdrNm",
            title: "AdrNm",
            width: "100px",
            hidden: "true",
            editor: function (container, options) {
                var model = options.model;
            }

        },
        {
            field: "PrjKy",
            title: "PrjKy",
            width: "120px",
            hidden: "true",
            editor: function (container, options) {
                var model = options.model;
            }
        },
        {
            field: "VersionNo",
            title: "VersionNo",
            width: "70px",
            editor: function (container, options) {
                var model = options.model;
            }
        },
        {
            field: "PrjId",
            title: "PrjId",
            width: "70px",
            editor: function (container, options) {
                var model = options.model;
            }
        },
        {
            field: "PrjNm",
            title: "PrjNm",
            width: "70px",
            editor: function (container, options) {
                var model = options.model;
            }
        },

    ];

    var gridNo = 2;

    //New ObjMas Function
    var columnsFinal = setGridColumnProp(columnsDefine, 'FindFormGridPayment', gridNo);
}

function LoadGridWithColumnProp(columnsFinal, gridNo) {

    var dataSource = new kendo.data.DataSource({
        batch: true,
        sort: ({ field: "LiNo", dir: "desc" }),
        pageSize: 10,
        schema: {
            model: {
                id: "PrcsSchKy",
                fields: //Relavent fields of the grid should be bind with following model items
                {
                    PrcsSchKy: { editable: false, nullable: false, type: "number" },
                    LiNo: { editable: true, nullable: false, type: "number" },                                                  
                    VersionNo: { editable: true, nullable: false, type: "string" },
                    PrjCd: { editable: true, nullable: false, type: "string" },                  
                    IsAct: { editable: true, nullable: false, type: "boolean" },
                    IsApr: { editable: true, nullable: false, type: "boolean" },
                }
            }
        }
    });

    $("#PmtRcprGrd")
        .kendoGrid({
            dataSource: dataSource,
            sortable: true,
            autobind: true,
            navigatable: true,
            //editable: true,   //commented to fix cell onclick text dissaper issue               
            filterable: {
                mode: "row"
            },
            reorderable: true,
            scrollable: true,
            pageSize: 10,
            pageable: true,
            selectable: "row",
            resizable: true,
            dataBound: onDataBound,
            pageable: { refresh: true, pageSizes: [5, 10, 20, 50, 100] },
            columns: columnsFinal,

        });
}

function LoadGridWithColumnPropTwo(columnsFinal, gridNo) {

    var dataSource = new kendo.data.DataSource({
        batch: true,
        //sort: { field: "LiNo", dir: "desc" },
        pageSize: 10,
        schema: {
            model: {
                id: "PrcsSchKy",
                fields: //Relavent fields of the grid should be bind with following model items
                {
                    PrcsSchKy: { editable: true, nullable: false, type: "number" },
                    Prefix: { editable: true, nullable: false, type: "string" },
                    VersionNo: { editable: true, nullable: false, type: "string" },
                    AdrId: { editable: true, nullable: true, type: "string" },
                    AdrNm: { editable: true, nullable: true, type: "string" },
                    PrjKy: { editable: true, nullable: false, type: "number" },
                    PrjId: { editable: true, nullable: false, type: "string" },
                    PrjNm: { editable: true, nullable: false, type: "string" },
                }
            }
        }
    });

    $("#FindFormGridPayment")
        .kendoGrid({
            dataSource: dataSource,
            sortable: true,
            autobind: true,
            navigatable: true,
            columnMenu: true,
            editable: false,
            filterable: {
                mode: "row"
            },
            reorderable: true,
            scrollable: true,
            //pageSize: 10,
            pageable: true,
            selectable: "row",
            resizable: true,
            dataBound: onDataBound,
            pageable: { refresh: true, pageSizes: [5, 10, 20, 50, 'All'] },
            columns: columnsFinal,

        });
}


function onDataBound(e) {
    try {
        var id = ("#PmtRcprGrd");
        var grid1 = $(id).data("kendogrid1");
        var dataSource = grid1.dataSource.data();
        for (var i = 0; i < dataSource.length; i++) {
            if (dataSource[i].IsAct == 0) {
                grid1.tbody.find("tr[data-uid='" + dataSource[i].uid + "']").hide();
            }
        }

    } catch (e) {

    }

}

$("#PmtRcprGrd").on("click", ".k-grid-evenselect", function () {
    //var myVar = grid.dataItem($("#PmtRcprGrd").closest("tr"));
    //$("#PmtRcprGrd").data("kendoGrid").removeRow($(this).closest("tr"));

    var grid = $("#PmtRcprGrd").data("kendoGrid");
    var selectedItem = grid.dataItem($(this).closest("tr"));
    if (selectedItem.LiNo == 1) {
        alert("You Cannot Delete Line Number one")
    } else {
        selectedItem.set("IsAct", 0);
        //var answer = grid.dataItem($(this).closest("tr")).hide(); //grid.tbody.find(grid.select()).hide();
        //grid.tbody.find("tr[data-uid='" + selectedItem.uid + "']").hide();
        $('#PmtRcprGrd').data('kendoGrid').refresh();

        SetTotalinFirstRow();
        //  grid.tbody.find("tr[data-uid='" + selectedItem.uid + "']").hide();
        HideIsActAllRec();
    }
});

