
$(document).ready(function () {
    LoadEmailAlertLog();
    LoadPndEmailAlertLog();
});

function LoadEmailAlertLog() {
    dataSource = new kendo.data.DataSource({
        transport: {
            read: {
                url: urlgetEmailAlertLog,

                dataType: "json"
            },
            parameterMap: function (options, operation) {
                if (operation !== "read") {

                    return ({});
                }

            }
        },
        batch: true,
        pageSize: 50,
        schema: {
            model: {
                fields: {
                    Time: { editable: false, nullable: false, type: "string" },
                    Msg: { editable: false, nullable: false, type: "string" },
                    To: { editable: false, nullable: false, type: "string" }
                }
            }
        }
    });
    $("#GridEmailAltLog").kendoGrid({
        dataSource: dataSource,
        navigatable: true,
        selectable: "row",
        sortable: true,
        pageable: {
            refresh: true,
            pageSizes: true,
            buttonCount: 5
        },
        resizable: true,
        locked: true,
        pageable: true,
        height: 300,
        columns: [
            { field: "Time", title: "Date/Time", width: "20%" },
                     { field: "Msg", title: "Message", width: "50%" },
                     { field: "To", title: "Email Address", width: "30%" }
        ],
        editable: false
    });
}

function LoadPndEmailAlertLog() {
    dataSource = new kendo.data.DataSource({
        transport: {
            read: {
                url: urlgetPndEmailAlertLog,

                dataType: "json"
            },
            parameterMap: function (options, operation) {
                if (operation !== "read") {

                    return ({});
                }

            }
        },
        batch: true,
        pageSize: 50,
        schema: {
            model: {
                fields: {
                    Time: { editable: false, nullable: false, type: "string" },
                    Msg: { editable: false, nullable: false, type: "string" },
                    To: { editable: false, nullable: false, type: "string" }
                }
            }
        }
    });
    $("#GridEmailAltPndLog").kendoGrid({
        dataSource: dataSource,
        navigatable: true,
        selectable: "row",
        sortable: true,
        resizable: true,
        locked: true,
        pageable: true,
        height: 300,
        columns: [
            { field: "Time", title: "Date/Time", width: "20%" },
                     { field: "Msg", title: "Message", width: "50%" },
                     { field: "To", title: "Email Address", width: "30%" }
        ],
        editable: false
    });
}
