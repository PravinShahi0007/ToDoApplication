function LoadOnlyDataSourceForAdmin(smrtQuery, colNm)
{
    dataSourceNew = new kendo.data.DataSource({
        transport: {
            read: {
                url: urlGetShortcutDetails,

                dataType: "json"
            },
            update: {
                url: urlUpdateShortcut,
                contentType: 'application/json; charset=utf-8',
                dataType: "json",
                type: "POST",
                complete: function (e) {
                    alert("Updated successfully..!");
                    var grid = $("#SmartMenugrid").data("kendoGrid");
                    grid.dataSource.read();
                }
            },
            parameterMap: function (options, operation) {
                if (operation == "Create" && options.models) {
                    return JSON.stringify({ 'todo': options.models });

                }
                if (operation == "update" && options.models) {
                    return JSON.stringify({ 'todo': options.models });

                }
                if (operation == "destroy" && options.models) {
                    return ({
                        'SearchQuery': null,
                        'ColNm': null
                    });

                }
                if (operation == "read") {

                    return ({
                        'SearchQuery': smrtQuery,
                        'ColNm': colNm
                    });
                }

            }
        },
        batch: true,
        pageSize: 20,
        schema: {
            model: {
                id: "ObjKy",
                fields: {
                    IcoURL: { editable: false, type: "string" },
                    UsrObjKy: { editable: false, type: "number" },
                    ObjKy: { editable: false, type: "number" },
                    //ShortcutKy: { editable: false, nullable: false, type: "string" },
                    ObjNm: { editable: false, type: "string" },
                    Description: { editable: true, type: "string" },
                    Pin: { editable: true, type: "boolean" },
                    URLController: { editable: false, type: "string" },
                    URLAction: { editable: false, type: "string" },
                    TecRef: { editable: true, type: "string" },
                    ReportServerURL: { editable: false, type: "string" },
                    ReportName: { editable: false, type: "string" },
                    ReportPath: { editable: false, type: "string" }
                }
            }
        }
    });

    $("#SmartMenugrid").data("kendoGrid").setDataSource(dataSourceNew);
}

function LoadGridforAdmin(smrtQuery, colNm) {
    dataSource = new kendo.data.DataSource({
        transport: {
            read: {
                url: urlGetShortcutDetails,

                dataType: "json"
            },
            update: {
                url: urlUpdateShortcut,
                contentType: 'application/json; charset=utf-8',
                dataType: "json",
                type: "POST",
                complete: function (e) {
                    alert("Updated successfully..!");
                    var grid = $("#SmartMenugrid").data("kendoGrid");
                    grid.dataSource.read();
                }
            },
            parameterMap: function (options, operation) {
                if (operation == "Create" && options.models) {
                    return JSON.stringify({ 'todo': options.models });

                }
                if (operation == "update" && options.models) {
                    return JSON.stringify({ 'todo': options.models });

                }
                if (operation == "destroy" && options.models) {
                    return ({
                        'SearchQuery': null,
                        'ColNm': null
                    });

                }
                if (operation == "read") {

                    return ({
                        'SearchQuery': smrtQuery,
                        'ColNm': colNm
                    });
                }

            }
        },
        batch: true,
        pageSize: 20,
        schema: {
            model: {
                id: "ObjKy",
                fields: {
                    IcoURL: { editable: false, type: "string" },
                    UsrObjKy: { editable: false, type: "number" },
                    ObjKy: { editable: false, type: "number" },
                    //ShortcutKy: { editable: false, nullable: false, type: "string" },
                    ObjNm: { editable: false, type: "string" },
                    Description: { editable: true, type: "string" },
                    Pin: { editable: true, type: "boolean" },
                    URLController: { editable: false, type: "string" },
                    URLAction: { editable: false, type: "string" },
                    TecRef: { editable: true, type: "string" },
                    ReportServerURL: { editable: false, type: "string" },
                    ReportName: { editable: false, type: "string" },
                    ReportPath: { editable: false, type: "string" }
                }
            }
        }
    });


    $("#SmartMenugrid").kendoGrid({
        dataSource: dataSource,
        navigatable: true,
        selectable: "cell",
        reorderable: true,
        resizable: true,
        pageable: true,
        height: 550,
        columnMenu: true,
        filterable: {
            mode: "row"
        },
        editable: "incell",
        sortable: true,
        dataBound: function (e) {
            $('#SmartMenugrid .k-grid-content').height(400);
        },
        pageable: {
            refresh: true,
            pageSizes: true,
            info: true,
            numeric: true,
            previousNext: true

        },
        toolbar: [
            {
                name: "save",
                text: "",
                content: "Add new record"
            },
            {
                name: "Cancel",
                content: "Add new record",
                text: '<img src="/DevBL10/buttncss/icons/filter_clear.png" alt="" width="15" height="15"/>',
                click: function (e) { }

            },
            {
                template: "<lable style=\"margin-left:50px;\">Common Smart Filter : </lable><input style=\"width:400px;\" class=\"k-input\" type=\"text\" id=\"txtComnSmrtFiltr\" /><lable style=\"margin-left:50px;\" id=\"lblHdrText\" >Description</lable>"
            }
        ],

        columns: [
             {
                 field: "UsrObjKy",
                 title: "User Obj ID",
                 width: "120px",
                 hidden: "false"
             },
             {
                 field: "ObjKy",
                 title: "User ID",
                 width: "120px",
                 hidden: "false"
             },
             //{ field: "ShortcutKy", title: "Menu ID", width: 4 },
             {
                 field: "IcoURL",
                 title: "Icon",
                 attributes: { style: "text-align:center;" },
                 width: "40px",
                 template: '<img src="#=IcoURL#" alt="" width="15px" height="15px"/>',
                 //locked: true,
                 //lockable: false,,
                 filterable: false
             },
             {
                 field: "ObjNm",
                 title: "Menu Caption",
                 width: "160px",
                 //locked: true,
                 filterable: {
                     cell: {
                         operator: "startswith"
                     }
                 }
             },
             {
                 field: "Description",
                 title: "Description",
                 width: "160px",
                 filterable: {
                     cell: {
                         operator: "startswith"
                     }
                 }
             },
             {
                 field: "Pin",
                 attributes: { style: "text-align:center;" },
                 template: '<input type="checkbox" #= Pin ? checked="checked":"" # class="PinChecked" />',
                 title: "Pin",
                 filterable: false,
                 width: "40px"
             },
             {
                 field: "URLController",
                 title: "URLController",
                 width: "120px",
                 hidden: "false"
             },
             {
                 field: "URLAction",
                 title: "URLAction",
                 width: "120px",
                 hidden: "false"
             },
             {
                 field: "ReportServerURL",
                 title: "ReportServerURL",
                 width: "120px",
                 hidden: "false"
             },
             {
                 field: "ReportName",
                 title: "ReportName",
                 width: "120px",
                 hidden: "false"
             },
             {
                 field: "ReportPath",
                 title: "ReportPath",
                 width: "120px",
                 hidden: "false"
             },
             {
                 field: "TecRef",
                 title: "Technical Referance",
                 width: "200px",
                 editor: textEditorInitialize,
                 filterable: {
                     cell: {
                         operator: "startswith"
                     }
                 }
             }

        ],
        editable: true,
        edit: onEditSmartMenugrid,
        change: onChangeAdminGrid,
    });

    function onChangeAdminGrid(arg) {
        //var selected = $.map(this.select(), function(item) {
        //    return item;
        //});

        var $grid = arg.sender; //grid ref
        var $cell = $grid.select(); // selected td
        //var $row = $cell.closest('tr'); //selected tr
        //var row_uid = $row.attr('data-uid'); //uid of selected row
        var cell_index = $cell.index(); //cell index 0 based
        //var row_index = $row.index(); //row index 0 based
        //var row_data = $grid.dataItem($row).toJSON(); //selected row data

        var gridColumns = $("#SmartMenugrid").data("kendoGrid").columns;
        if (gridColumns[cell_index] != undefined) {
            //alert(cell_index);
            //alert(gridColumns[cell_index].field);
            $('#lblHdrText').text(gridColumns[cell_index].field);
            //kendoConsole.log("Selected: " + selected.length + " item(s), [" + selected.join(", ") + "]");
        }
    }

    function onEditSmartMenugrid(e) {

        //$("input[name=ItmNm]").attr("readonly", true);
        // -------------------------------- Enter Key Press Focus Nxt Cell.
        var input = e.container.find(".k-input");
        var td = input.closest("td");
        var rowIndex = td.parent().index();
        var cellIndex = td.index();

        input.on("keydown", function (event) {
            //window.onkeydown = function (event) {
            if (event.keyCode == 13) {

                if (cellIndex == getColIndex("#SmartMenugrid", "TecRef")) {
                    var content = $(this).val();
                    var caret = $(this).prop("selectionStart");
                    if (event.shiftKey) {
                        this.value = content.substring(0, caret) + "\n" + content.substring(caret, content.length);
                        $(this).prop("selectionStart", caret + 1).prop('selectionEnd', caret + 1);
                        event.stopPropagation();
                    }
                    else {
                        var TecRef = e.model.set("TecRef", input.val());
                        $("#SmartMenugrid").data("kendoGrid").editCell($(".k-grid-content").find("table").find("tbody").find("tr:eq(" + (rowIndex + 1) + ")").find("td:eq(" + getColIndex("#SmartMenugrid", "Description") + ")").focusin($("#SmartMenugrid").data("kendoGrid").closeCell($(".k-grid-content").find("table").find("tbody").find("tr:eq(" + rowIndex + ")").find("td:eq(" + cellIndex + ")").parent())));
                    }
                }
                else if (cellIndex == getColIndex("#SmartMenugrid", "Description")) { // colIndex : 4 , colName : Description
                    var Description = e.model.set("Description", input.val());
                    $("#SmartMenugrid").data("kendoGrid").editCell($(".k-grid-content").find("table").find("tbody").find("tr:eq(" + rowIndex + ")").find("td:eq(" + getColIndex("#SmartMenugrid", "TecRef") + ")").focusin($("#SmartMenugrid").data("kendoGrid").closeCell($(".k-grid-content").find("table").find("tbody").find("tr:eq(" + rowIndex + ")").find("td:eq(" + cellIndex + ")").parent())));
                }
                return false;
            }
            else if (event.keyCode == 40) {
                if (cellIndex == getColIndex("#SmartMenugrid", "Description")) {
                    var Description = e.model.set("Description", input.val());
                    $("#SmartMenugrid").data("kendoGrid").editCell($(".k-grid-content").find("table").find("tbody").find("tr:eq(" + (rowIndex + 1) + ")").find("td:eq(" + cellIndex + ")").focusin($("#SmartMenugrid").data("kendoGrid").closeCell($(".k-grid-content").find("table").find("tbody").find("tr:eq(" + rowIndex + ")").find("td:eq(" + cellIndex + ")").parent())));
                }
            }
            else if (event.keyCode == 38) {
                if (cellIndex == getColIndex("#SmartMenugrid", "Description")) {
                    var Description = e.model.set("Description", input.val());
                    $("#SmartMenugrid").data("kendoGrid").editCell($(".k-grid-content").find("table").find("tbody").find("tr:eq(" + (rowIndex - 1) + ")").find("td:eq(" + cellIndex + ")").focusin($("#SmartMenugrid").data("kendoGrid").closeCell($(".k-grid-content").find("table").find("tbody").find("tr:eq(" + rowIndex + ")").find("td:eq(" + cellIndex + ")").parent())));
                }
            }
        })
    }

    $(".k-grid-Cancel", "#SmartMenugrid").bind("click", function (ev) {

        //alert("load admin");
        $('#txtComnSmrtFiltr').val("");
        $('#lblHdrText').text("Description");
        LoadOnlyDataSourceForAdmin(null, null);
    });

    $('#SmartMenugrid').on('click', '.PinChecked', function () {
        var checked = $(this).is(':checked');
        var grid = $('#SmartMenugrid').data().kendoGrid;
        var dataItem = grid.dataItem($(this).closest('tr'));
        if (dataItem != undefined) {
            dataItem.set('Pin', checked);
        }
    })

    $('#txtComnSmrtFiltr').on("keydown", function (event) {
        //window.onkeydown = function (event) {
        if (event.keyCode == 13) {
            LoadOnlyDataSourceForAdmin($('#txtComnSmrtFiltr').val(), $('#lblHdrText').text());
            return false;
        }
    });

    $("#SmartMenugrid .k-header").mousedown(function (e) {  //your custom logic 
        if (e.button == 0 || e.button == 2) {        // Right click ::: if(e.button == 2)
            var fieldname = $(this).data("field");
            if (preFiled != fieldname) {
                e.preventDefault();
                $('#lblHdrText').text(fieldname);
                preFiled = fieldname;
            }
        }
    })

    // This code lines for prevent the right click context menu.
    $("#SmartMenugrid .k-header").contextmenu(function () {
        return false;
    });

}
