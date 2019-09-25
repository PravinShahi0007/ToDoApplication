
//Bank Grid Functions

function LoadBankEntry() {

    var columnsDefine = [
            { field: "BnkKy", title: "#Ref", width: "50px", hidden: false },
            { field: "BnkCd", title: "Bank Code", width: "100px", hidden: false },
            { field: "BnkNm", title: "Bank Name", width: "100px", hidden: false },
            { field: "Original_TmStmp ", title: "Original_TmStmp ", width: "100px", hidden: true },

            {

                field: "isAct", title: "Is Act",
                template: '<input type="checkbox"#= isAct? "checked=checked" : "" # disabled="disabled" ></input>',
                width: "40px",

            },
    ];
    var gridNo = 1;
    var columnsFinal = setColumnProp(columnsDefine, viewBag.ObjKy, '', 'FormGrd', gridNo);
}

function LoadGridWithColumnProp(columnsFinal, gridNo) {

    var dataSourceLoadBankEntry = new kendo.data.DataSource({
        transport: {
            read:
            {
                //data: { BnkCd: BnkCd, BnkNm: BnkNm },
                url: urlBank_BranchEntry.LoadBankEntry,
                dataType: "json",
                data: JSON.stringify({
                    ObjKy: viewBag.ObjKy,                    
                }),
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
                    return ({})

                }

            }

        },
        batch: true,
        pageSize: 20,
        schema: {
            model: {
                id: "BnkKy",
                fields:
                {
                    BnkKy: { editable: false, nullable: false, },
                    BnkCd: { editable: true, nullable: false, },
                    BnkNm: { editable: true, nullable: false, },
                    isAct: { editable: true, nullable: false, type: "boolean", }
                }
            }
        }
    });

    $("#BankGrid").kendoGrid({
        dataSource: dataSourceLoadBankEntry,
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

function SaveFunction() {

    // var id = ("#BankGrid");
    var grid = $("#BankGrid").data("kendoGrid");
    var currentData = grid.dataSource.data();
    var updateBank = [];
    var insertBank = [];

    for (var i = 0; i < currentData.length; i++) {
        if (currentData[i].isNew()) {

            insertBank.push(currentData[i].toJSON());
        } else if (currentData[i].dirty) {
            updateBank.push(currentData[i].toJSON());
        }
    }

    var deletedBank = [];
    for (var i = 0; i < grid.dataSource._destroyed.length; i++) {
        deletedBank.push(grid.dataSource._destroyed[i].toJSON());
    }

    $.ajax({
        url: urlBank_BranchEntry.SaveBankEntry,
        data: JSON.stringify({
            ObjKy: viewBag.ObjKy,
            updatedBank: kendo.stringify(updateBank),
            deletedBank: kendo.stringify(deletedBank),
            insertBank: kendo.stringify(insertBank),
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

function AddFunction() {
    var grid = $("#BankGrid").data("kendoGrid").addRow();
}

function CancelFunction() {
    var grid = $("#BankGrid").data("kendoGrid").cancelChanges();
}

function BankRowDblClick() {

    var grid = $('#BankGrid').data().kendoGrid;
    var selectedItem = grid.dataItem(grid.select());
    var BnkKy = selectedItem.BnkKy;
    if (BnkKy != "" || BnkKy != undefined || BnkKy != null) {
        FormGlblData.BnkKy = BnkKy;
        LoadBranchEntry();
    } else {
        alert("please Select Any Trancsaction");
    }
}