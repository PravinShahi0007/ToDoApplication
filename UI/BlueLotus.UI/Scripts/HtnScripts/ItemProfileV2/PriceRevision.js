
function LoadGridWithColumnPropThree(PriceColumn, gridNo) {
    var todate = new Date();
    if (gridNo == 3) {
        try {
            $('#Pricegrid').data().kendoGrid.destroy();
            $('#Pricegrid').empty();
        } catch (e) { }

        var ItmKy = $("#ItmKy").val();
        var dataSourceGrid = new kendo.data.DataSource({

            transport: {
                read: {
                    url: urlLoadPriceRevision, //'@Url.Action("LoadPriceRevision", "ItmPrfl")'
                    dataType: "json"
                },

                parameterMap: function (options, operation) {
                    //if (operation == "update" && options.models) {
                    //    return JSON.stringify({ 'listMe': options.models });
                    //}
                    //if (operation == "create" && options.models) {
                    //    return JSON.stringify({ 'listMe': options.models });
                    //}
                    if (operation == "read") {
                        return ({
                            'ItmKy': ItmKy,
                            'ObjKy': viewBag.ObjKy,
                        });
                    }
                }
            },
            batch: true,
            pageSize: 12,
            schema: {
                model: {
                    id: "ItmRateKy ",
                    fields: //Relavent fields of the grid should be bind with following model items
                    {
                        ItmKy: { editable: false, nullable: false, type: "number" },
                        ItmRateKy: { editable: false, nullable: false, type: "number" },
                        CosItmRateKy: { editable: false, nullable: false, type: "number" },
                        LocNm: { editable: false, nullable: false, type: "string" },
                        PreviousDate: { editable: false, nullable: true, type: "date" },
                        PreviousCosPri: { editable: false, nullable: false, type: "number" },
                        PreviousSlsPri: { editable: false, nullable: false, type: "number" },
                        ControlConKy: { editable: false, nullable: false, type: "number", },
                        isFixedSlsPri: { editable: false, nullable: false, type: "boolean" },
                        LocKy: { editable: false, nullable: false, type: "number" },
                        EftvDate: { editable: true, nullable: true, type: "date", defaultvalue: todate },
                        CosPri: { editable: true, nullable: false, type: "number" },
                        Markup: { editable: true, nullable: false, type: "number", },
                        SlsPri: { editable: true, nullable: true, type: "number" },

                    }
                }
            }
        });



        $(".Pricegrid").kendoGrid({
            dataSource: dataSourceGrid,
            autobind: true,
            resizable: true,
            navigatable: true,
            sortable: true,
            reorderable: true,
            //Scrollable: true,
            save: function (data) {
                if (data.values.EftvDate == null) {
                    var test = data.model.set("SlsPri", data.model.CosPri + ((data.values.Markup / 100) * data.model.CosPri));

                }
                //else if (data.values.EftvDate == null) {
                //    var test = data.model.set("SlsPri", data.values.CosPri + ((data.model.Markup / 100) * data.values.CosPri));
                //}

            },
            columns: PriceColumn,
            selectable: "row",
            pageable: {
                refresh: true, pageSizes: [5, 10, 20, 50, 100, 150]
            },
            //columnMenu: true,
            filterable: true,
            //filterable: {
            //    mode: "row"
            //},


            dataBinding: function () {
                record = (this.dataSource.page() - 1) * this.dataSource.pageSize();
            },
            dataBound: GridOnDataBound,

            editable: true
        });
    }

}

function LoadPriceGrid() {

    var PriceColumn = [
            {
                field: "ItmRateKy", title: "ItmRateKy", width: "70px", hidden: true
            },
            {
                field: "CosItmRateKy", title: "CosItmRateKy", width: "70px", hidden: true
            },
            {
                field: "ControlConKy", title: "ItmKy", width: "100px", hidden: true, attributes: { style: "text-align:center;" },
            },
            {
                field: "ItmKy", title: "ItmKy", width: "100px", hidden: true, attributes: { style: "text-align:center;" },
            },
            {
                field: "LocNm", title: "Location", width: "100px", attributes: { style: "text-align:center;", "class": "non-editable" },
                filterable: {
                    // mode: "row",
                    operators: {
                        string: {
                            contains: "Contains",
                            startswith: "Starts with",
                            eq: "Is equal to",
                            neq: "Is not equal to"
                        }
                    }
                },
                editor: function (container, options) {
                    var model = options.model;
                    $('<input id="LocNm" name="' + options.field + '"/>').appendTo(container).kendoComboBox({
                        dataSource: CdNm_SelectMob_Datasource('LocNm'),
                        change: function (e) {

                            combo = e.sender;
                            selectedItm = combo.select();
                            dataItem = combo.dataItem(selectedItm);

                            var cmb = $("#LocNm").data("kendoComboBox");
                            var val = cmb.value();

                            if (isNaN(val)) {
                                alert("'" + val + "' is not a Valid input");
                                cmb.value("");
                                model.set("CdKy", 1);
                                model.set("LocNm", "");
                            } else {
                                model.set("CdKy", dataItem.CdKy);
                                model.set("LocNm", dataItem.CdNm);
                            }
                        },
                        dataValueField: "CdKy",
                        dataTextField: "CdNm"
                    });
                }
            },

    { field: "LocKy", title: "LocKy", width: "80px", hidden: true },
    {
        field: "PreviousCosPri", title: "Previous Cost Price", width: "100px", attributes: { style: "text-align:center;", "class": "non-editable" }, template: '#= kendo.toString(PreviousCosPri, "n2")#',
    },

            {
                field: "PreviousSlsPri", title: "Previous Sales Price", width: "100px", attributes: { style: "text-align:center;", "class": "non-editable" }, template: '#= kendo.toString(PreviousSlsPri, "n2")#',
            },
            {
                field: "PreviousDate", title: "Previous Date", width: "150px", attributes: { style: "text-align:center;", "class": "non-editable" },
                editor: function (container, options) {
                    var model = options.model;
                    $('<input id="PreviousDate" name="' + options.field + '" data-value-field="' + options.field + '" data-bind="value:' + options.field + '" data-format="' + options.format + '"/>').appendTo(container).kendoDatePicker({
                        change: function (e) {
                            // model.set("RedDt", e.sender._oldText);
                        }
                    });
                },
                format: "{0: dd-MM-yyyy}"
            },

            {
                field: "CosPri", title: "Cost Price", width: "100px", attributes: { style: "text-align:center;" }, template: '#= kendo.toString(CosPri, "n2")#',
            },
            {
                field: "Markup", title: "Markup%", width: "100px", attributes: { style: "text-align:center;" }, //template: '#= kendo.toString(Markup, "n2")#', //template: "#= ((SlsPri-CosPri)/CosPri*100) #", 
            },
            {
                field: "SlsPri", title: "Sales Price", width: "100px", attributes: { style: "text-align:center;" }, template: '#= kendo.toString(SlsPri, "n2")#',

            },

            {
                field: "EftvDate", title: "Effective Date", width: "100px",
                editor: function (container, options) {
                    var model = options.model;
                    $('<input id="EftvDatetxt" name="' + options.field + '" data-value-field="' + options.field + '" data-bind="value:' + options.field + '" data-format="' + options.format + '"/>').appendTo(container).kendoDatePicker({

                    });
                },
                format: "{0: dd-MM-yyyy}"
            },

    ];

    var gridNo = 3;
    var FinalItmSettingsColumn = setColumnProp(PriceColumn, viewBag.ObjKy, '', 'HdrSec2_Tab4_FormGrd', gridNo);
}

function GridOnDataBound(arg) {

    var grid = $("#Itemgrid").data("kendoGrid");


    $(grid.tbody).on("click", "td", function (e) {

        var row = $(this).closest("tr");
        var rowIdx = $("tr", grid.tbody).index(row);
        var colIdx = $("td", row).index(this);
        if (colIdx == 6) {

            $("#MultiUnitWin").show().kendoWindow({

                width: "1000px",
                height: "500px",
                modal: true,
                title: "Find",
                //close: onClose1


            });
            var selectedItem = grid.dataItem(grid.select());
            var ItmKy = selectedItem.ItmKy;
            var UnitKy = selectedItem.UnitKy;

            $("#MultiItmKy").val(ItmKy)
            $("#MultiUnitKy").val(UnitKy)
            // $('#MultiUnitWin').data('kendoWindow').center().open();


        }

    });
}


function GridOnDataBinding(arg) {
    record = (this.dataSource.page() - 1) * this.dataSource.pageSize();
}

function deleteme(key) {
    var ItmKy = key;
    var answer = confirm("Confirm to delete this record");
    if (answer) {
        $.ajax({
            url: '@Url.Content("~/ItmMas/DeleteItmMas")',
            dataType: "json",
            type: "POST",
            data: {
                'key': ItmKy,
            },
            success: function (data) {
                var grid = $("#Itemgrid").data("kendoGrid");
                grid.dataSource.read();
            },
            error: function (e) {

            }
        });
    }
}