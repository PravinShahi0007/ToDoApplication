
$(document).ready(function () {
    LoadSMSAlertLog();
    LoadPndSMSAlertLog();

});

function LoadSMSAlertLog() {
    dataSource = new kendo.data.DataSource({
        transport: {
            read: {
                url: urlgetSMSAlertLog,

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
    $("#GridSMSAltLog").kendoGrid({
        dataSource: dataSource,
        navigatable: true,
        selectable: "row",
        sortable: true,
        resizable: true,
        locked: true,
        pageable: true,
        height: 300,
        columns: [
                   { field: "Time", title: "Time", width: "20%" },
                   { field: "Msg", title: "Message", width: "50%" },
                     { field: "To", title: "Mobile Number", width: "30%" }
        ],
        editable: false
    });
}

function LoadPndSMSAlertLog() {
    dataSource = new kendo.data.DataSource({
        transport: {
            read: {
                url: urlgetPndSMSAlertLog,

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
                    Msg: { editable: false, nullable: false, type: "string" },
                    To: { editable: false, nullable: false, type: "string" }
                }
            }
        }
    });
    $("#GridSMSAltPndLog").kendoGrid({
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
                     { field: "Msg", title: "Message", width: "50%" },
                     { field: "To", title: "Mobile Number", width: "30%" }
        ],
        editable: false
    });
}