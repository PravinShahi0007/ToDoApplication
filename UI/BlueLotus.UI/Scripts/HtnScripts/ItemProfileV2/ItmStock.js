function LoadItmStockGrid() {

    var ItmStockColumn = [

            {
                field: "ControlConKy", title: "ControlConKy", width: "100px", hidden: true, attributes: { style: "text-align:center;" },
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
        field: "CurrentStock", title: "Current Stock", width: "100px", attributes: { style: "text-align:center;", "class": "non-editable" }, template: '#= kendo.toString(CurrentStock, "n3")#', //template: "#= ((SlsPri-CosPri)/CosPri*100) #", 
    },
            {
                field: "GrpStock", title: "Group Stock", width: "100px", attributes: { style: "text-align:center;", "class": "non-editable" }, template: '#= kendo.toString(GrpStock, "n3")#',
            },
            {
                field: "ReOrdLvl", title: "Reorder Level", width: "100px", attributes: { style: "text-align:center;", "class": "non-editable" },
            },
            {
                field: "ReOrdQty", title: "Reorder Qty", width: "100px", attributes: { style: "text-align:center;", "class": "non-editable" }, template: '#= kendo.toString(ReOrdQty, "n3")#',
            },
            {
                field: "PendingPO", title: "Pending PO Qty", width: "100px", attributes: { style: "text-align:center;", "class": "non-editable" }, template: '#= kendo.toString(PendingPO, "n3")#',
            },

    ];

    var gridNo = 4;
    var FinalItmSettingsColumn = setColumnProp(ItmStockColumn, viewBag.ObjKy, '', 'HdrSec2_Tab5_FormGrd', gridNo);
}

function LoadGridWithColumnPropFour(ItmStockColumn, gridNo) {

    if (gridNo == 4) {

        var ItmKy = $("#ItmKy").val();

        var dataSourceGrid = new kendo.data.DataSource({

            transport: {
                read: {
                    url: urlLoadItmStock, //'@Url.Action("LoadItmStock", "ItmPrfl")'
                    dataType: "json"
                },

                parameterMap: function (options, operation) {
                 
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

                    fields: //Relavent fields of the grid should be bind with following model items
                    {
                        ItmKy: { editable: false, nullable: false, type: "number" },
                        LocNm: { editable: false, nullable: false, type: "string" },
                        CurrentStock: { editable: false, nullable: false, type: "number" },
                        GrpStock: { editable: false, nullable: false, type: "number" },
                        ReOrdLvl: { editable: false, nullable: false, type: "number", },
                        LocKy: { editable: false, nullable: false, type: "number" },
                        ReOrdQty: { editable: false, nullable: false, type: "number", },
                        PendingPO: { editable: false, nullable: false, type: "number", },
                        ControlConKy: { editable: false, nullable: false, type: "number", },

                    }
                }
            }
        });



        $(".ItmStockgrid").kendoGrid({
            dataSource: dataSourceGrid,
            autobind: true,
            resizable: true,
            navigatable: true,
            sortable: true,
            reorderable: true,
            //Scrollable: true,

            columns: ItmStockColumn,
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