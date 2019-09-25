
//Branch Grid Functions
function LoadBranchEntry() {

    var columnsDefine = [
            { field: "BrnKy", title: "#Ref", width: "50px", hidden: false },
            { field: "BrnCd", title: "BrnCd", width: "100px", hidden: false },
            { field: "BrnNm", title: "BrnNm", width: "100px", hidden: false },

            {

                field: "isAct", title: "IsAct",
                template: '<input type="checkbox"#= isAct? "checked=checked" : "" # disabled="disabled" ></input>',
                width: "40px",

            },
    ];
    var gridNo = 2;
    var columnsFinal = setColumnProp(columnsDefine, viewBag.ObjKy, '', 'FormGrd', gridNo);
}

function LoadGridWithColumnPropTwo(columnsFinal, gridNo) {
    var dataSourceLoadBranchEntry = new kendo.data.DataSource({
        transport: {
            read:
            {
                //data: JSON.stringify({
                //    BnkKy: FormGlblData.BnkKy
                //}),
                url: urlBank_BranchEntry.LoadBranchEntry,
                dataType: "json",
                data: {'ObjKy': viewBag.ObjKy}
            },

            create:
                {
                    url: "",
                    contentType: 'application/json; charset=utf-8',
                    dataType: "json",
                    type: "POST",
                    complete: function (e) {
                        alert("Successfully Saved!");

                    }
                },
            parameterMap: function (options, operation) {
                if (operation == "create" && options.models) {
                    return JSON.stringify({ 'list': options.models });
                }

                if (operation == "read") {
                    return ({
                        'BnkKy': FormGlblData.BnkKy
                    });
                }

            }

        },
        batch: true,
        pageSize: 20,
        schema: {
            model: {
                id: "BrnKy",
                fields:
                {
                    BrnKy: { editable: false, nullable: false, },
                    BrnCd: { editable: true, nullable: false, },
                    BrnNm: { editable: true, nullable: false, },
                    isAct: { editable: true, nullable: false, type: "boolean", },
                    Original_TmStmp: { editable: false, nullable: false, },

                }
            }
        }
    });

    $("#BranchGrid").kendoGrid({
        dataSource: dataSourceLoadBranchEntry,
        //autobind: true,
        height: 500,
        navigatable: true,
        filterable: true,
        pageable: true,
        sortable: true,
        reorderable: true,
        //toolbar:[{name:"Create", text:"Add new record"},"Save", "Cancel"],
        columnMenu: true,
        selectable: "row",
        resizable: true,
        pageable: { refresh: true, pageSizes: [5, 10, 20, 50, 100] },
        columns: columnsFinal,

        editable: true
    });
}

function BranchAddFunction() {
    var grid = $("#BranchGrid").data("kendoGrid").addRow();
}

function BranchCancelFunction() {
    var grid = $("#BranchGrid").data("kendoGrid").cancelChanges();
}


function BranchSaveFunction() {

    if (FormGlblData.BnkKy < 11) {
        alert("Please select the Bank...!");
        return;
    } else {

        var grid = $("#BranchGrid").data("kendoGrid");
        var currentData = grid.dataSource.data();
        var updateBranch = [];
        var insertBranch = [];

        for (var i = 0; i < currentData.length; i++) {
            if (currentData[i].isNew()) {

                insertBranch.push(currentData[i].toJSON());
            } else if (currentData[i].dirty) {
                updateBranch.push(currentData[i].toJSON());
            }
        }

        var deletedBranch = [];
        for (var i = 0; i < grid.dataSource._destroyed.length; i++) {
            deletedBranch.push(grid.dataSource._destroyed[i].toJSON());
        }

        $.ajax({
            url: urlBank_BranchEntry.SaveBranchEntry,
            data: JSON.stringify({
                ObjKy: viewBag.ObjKy,
                BnkKy: FormGlblData.BnkKy,
                updatedBranch: kendo.stringify(updateBranch),
                deletedBranch: kendo.stringify(deletedBranch),
                insertBranch: kendo.stringify(insertBranch),
            }),
            contentType: 'application/json; charset=utf-8',
            dataType: "Json",
            type: "POST",
            success: function (data) {
                alert("Saved");
                grid.dataSource.read();
            },
            error: function (e) {
                return false;
            }
        });
    }
}
