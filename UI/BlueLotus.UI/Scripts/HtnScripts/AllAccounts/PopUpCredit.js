function LoadCredit(AccKy) {
    dataSource = new kendo.data.DataSource({
        transport: {
            read: {
                url: UrlCreditList, // '@Url.Content("~/ManageAllAccount/CreditsPop")',

                dataType: "json"
            },
            parameterMap: function (options, operation) {
                if (operation == "create" && options.models) {
                    return JSON
                        .stringify({ 'todos': options.models });
                    // Parrameter name of the Controller Action method==> List<ToDoModel>todos
                }
                if (operation == "update" && options.models) {
                    return JSON
                        .stringify({ 'todos': options.models });
                    // Parrameter name of the Controller Action method==> List<ToDoModel>todos

                }
                if (operation == "destroy" && options.models) {
                    return JSON
                        .stringify({ 'todos': options.models });
                    // Parrameter name of the Controller Action method==> List<ToDoModel>todos

                }
                if (operation == "read") {
                    return ({
                        'AccKy': AccKy,

                    });
                }
            }

        },
        batch: true,
        pageSize: 50,
        schema: {
            model: {
                id: "AccDtKy",
                fields: {
                    AccDtKy: { editable: true, nullable: false, type: "number" },
                    ControlConKy: { editable: true, nullable: false, type: "number" },
                    AccKy: { editable: true, nullable: false, type: "number" },
                    BUKy: { editable: true, nullable: false, type: "number" },
                    BuNm: { editable: true, nullable: true, type: "string" },
                    Dt: { editable: true, nullable: true, },
                    CrditLmt: { editable: true, nullable: false, type: "number" },
                    CrditDys: { editable: true, nullable: false, type: "number" },

                }
            }
        }
    });


    $("#PopUpCredit")
        .kendoGrid({
            dataSource: dataSource,
            navigatable: true,
            sortable: true,
            resizable: true,
            filterable: true,
            selectable: "column",
            pageable: true,
            height: 400,

            columns: [
                { field: "AccDtKy", title: "Account Date Key", width: "70px", hidden: "true" },
                { field: "ControlConKy", title: "ControlConKy", width: "70px", hidden: "true" },
                { field: "AccKy", title: "Account Key", width: "70px", hidden: "true" },
                {
                    field: "BuNm",
                    title: "BU",
                    width: "150px",
                    editor: function (container, options) {
                        var model = options.model;
                        $('<input id="cmbbuType" name="' + options.field + '"/>')
                            .appendTo(container)
                            .kendoComboBox({
                                dataSource: {
                                    type: "POST",
                                    transport: {
                                        read: UrlBuList // '@Url.Content("~/ManageAllAccount/Buxdrop")'
                                    }
                                },
                                change: function (arg) {

                                    combo = arg.sender;
                                    selectedItm = combo.select();
                                    dataItem = combo.dataItem(selectedItm);
                                    var validate = ComboValidations("cmbbuType");

                                    if (validate) {
                                        model.set("BUKy", dataItem.Cdky);
                                        model.set("BuNm", dataItem.CdNm);
                                    } else {
                                        model.set("BUKy", 1);
                                        model.set("BuNm", "");
                                    }


                                },
                                //when the user gonna add a new record, combo should automatically bind the values from the Filter
                                filter: "startswith",
                                dataValueField: "Cdky",
                                dataTextField: "CdNm"
                            });
                    }
                },
                {
                    field: "BUKy",
                    title: "BusinessUnit Key",
                    width: "70px",
                    hidden: "true",

                    editor: function (container, options) {
                        var model = options.model;
                        $('<input id="cmbbuTypeky" name="' + options.field + '"/>')
                            .appendTo(container)
                            .kendoComboBox({
                                dataSource: {
                                    type: "POST",
                                    transport: {
                                        read: UrlBuList // '@Url.Content("~/ManageAllAccount/Buxdrop")'
                                    }
                                },
                                change: function (arg) {


                                },
                                //when the user gonna add a new record, combo should automatically bind the values from the Filter

                                dataValueField: "Cdky",
                                dataTextField: "CdNm"
                            });
                    }
                },
                {
                    field: "Dt",
                    title: "Date",
                    width: "70px",
                    editor: function (container, options) {
                        var model = options.model;
                        $('<input id="Dt" name="' + options.field + '"/>')
                            .appendTo(container)
                            .kendoDatePicker({
                                format: "dd/MM/yyyy",

                            });

                    }

                },
                { field: "CrditLmt", title: "Credit limit", width: "70px" },
                { field: "CrditDys", title: "Credit Days", width: "70px" },

            ],

            editable: true
        });


}

function insertCreditRw() {
    var grid = $("#PopUpCredit").data("kendoGrid");
    grid.addRow();

}

function closeCredit() {
    $("#PopUpForCredit").data("kendoWindow").close();
}

function saveCredit() {
    var AccKyCr = $("#AccKyCredit").val();
    var BUKy = $("#BUKyCredit").val();
    var PrjKy = $("#PRJKyCredit").val();
    var grid2 = $("#PopUpCredit").data("kendoGrid");
    var creditData = grid2.dataSource.data(); //currentData
    var updatedCreditRecords = []; //updatedRecords
    var newCreditRecords = []; //newRecords

    for (var i = 0; i < creditData.length; i++) {

        if (creditData[i].isNew()) {

            newCreditRecords.push(creditData[i].toJSON());

        } else if (creditData[i].dirty) {
            updatedCreditRecords.push(creditData[i].toJSON());

        }
    }


    //ajax for unsert update and delete
    $.ajax({
        url: UrlCreditListUpdate, //"@Url.Content("~/ManageAllAccount/InsertCreditDetail")",
        data: JSON.stringify({
            updateCredit: kendo.stringify(updatedCreditRecords),
            newCredit: kendo.stringify(newCreditRecords),
            AccKy: AccKyCr,
            BUKy: BUKy,
            PrjKy: PrjKy



        }),
        contentType: "application/json; charset=utf-8",
        dataType: "Json",
        type: "POST",
        success: function (data) {

            if (data == true) {

                alert("Successfully Saved..!");
                LoadCredit(AccKyCr);
            } else {
                alert("Record Not Successfully Saved");
                LoadCredit(AccKyCr);
            }


        },
        error: function (e) {
            return false;
        }
    });

}