function LoadOnlyDataSourceForAdmin(smrtQuery, colNm) {
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
                    ObjNm: { editable: false, type: "string" },
                    Description: { editable: true, type: "string" },
                    Pin: { editable: true, type: "boolean" },
                    URLController: { editable: true, type: "string" },
                    URLAction: { editable: true, type: "string" },
                    ReportServerURL: { editable: false, type: "string" },
                    ReportName: { editable: false, type: "string" },
                    ReportPath: { editable: false, type: "string" }
                }
            }
        }
    });

    $("#SmartMenugrid").data("kendoGrid").setDataSource(dataSourceNew);
}

function LoadGrid(smrtQuery, colNm) {
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
                    ObjNm: { editable: false, type: "string" },
                    Description: { editable: true, type: "string" },
                    Pin: { editable: true, type: "boolean" },
                    URLController: { editable: true, type: "string" },
                    URLAction: { editable: true, type: "string" },
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
        sortable: true,
        reorderable: true,
        resizable: true,
        pageable: true,
        dataBound: function (e) {
            $('#SmartMenugrid .k-grid-content').height(400);
        },
        height: 550,
        filterable: {
            mode: "row"
        },
        editable: "incell",
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
                 field: "IcoURL",
                 title: "Icon",
                 attributes: { style: "text-align:center;" },
                 template: '<img src="#=IcoURL#" alt="" width="15" height="15"/>',
                 width: "40px"
             },
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
             {
                 field: "ObjNm",
                 title: "Menu Caption",
                 width: "160px",
                 filterable: {
                     cell: {
                         operator: "startswith"
                     }
                 }
             },
             {
                 field: "Description",
                 title: "Description",
                 width: "200px",
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
                 width: 10,
                 hidden: "false"
             },
             {
                 field: "URLAction",
                 title: "URLAction",
                 width: 10,
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

        ],
        edit: function (e) {

            //$("input[name=ItmNm]").attr("readonly", true);
            // -------------------------------- Enter Key Press Focus Nxt Cell.
            var input = e.container.find(".k-input");
            var td = input.closest("td");
            var rowIndex = td.parent().index();
            var cellIndex = td.index();

            input.on("keydown", function (event) {
                //window.onkeydown = function (event) {
                if (event.keyCode == 13) {

                    if (cellIndex == 8) {

                        var input = e.container.find(".k-input");
                        var value = input.val();
                        if (value != undefined || value != null) {

                        }

                    }

                    return false;
                }
                //}
            });
        }
    });

    $(".k-grid-Cancel", "#SmartMenugrid").bind("click", function (ev) {
        //alert("Load normal");
        $('#txtComnSmrtFiltr').val("");
        $('#lblHdrText').text("Description");
        LoadGrid(null, null);
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

            LoadGrid($('#txtComnSmrtFiltr').val(), $('#lblHdrText').text());

            return false;
        }
    })

    $("#SmartMenugrid .k-header").mousedown(function (e) {  //your custom logic 
        if (e.button == 2) {
            var fieldname = $(this).data("field");
            if (preFiled != fieldname) {
                e.preventDefault();
                $('#lblHdrText').text(fieldname);
                preFiled = fieldname;
            }
        }
    })

    $("#SmartMenugrid .k-header").contextmenu(function () {
        return false;
    });
}