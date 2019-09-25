//$(document).ready(function () {
//    LoadItmSettingsGrid();
//});

function LoadItmSettingsGrid() {

    var ItmSettingsColumn = [
            {
                field: "ItmCdKy", title: "ItmCdKy", width: "100px", hidden: true, attributes: { style: "text-align:center;" },
            },
            {
                field: "ControlConKy", title: "ControlConKy", width: "100px", hidden: true, attributes: { style: "text-align:center;" },
            },

            {
                field: "ItmKy", title: "ItmKy", width: "100px", hidden: true, attributes: { style: "text-align:center;" },
            },
            {
                field: "LocNm", title: "Location", width: "100px", attributes: { style: "text-align:center;" },
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
            {
                field: "SupNm", title: "Supplier", width: "100px", attributes: { style: "text-align:center;" },
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
                    $('<input id="SupNm" name="' + options.field + '"/>').appendTo(container).kendoComboBox({
                        dataSource: AdrNm_SelectMob_DataSource('SupNm'),
                        change: function (e) {

                            combo = e.sender;
                            selectedItm = combo.select();
                            dataItem = combo.dataItem(selectedItm);

                            var cmb = $("#SupNm").data("kendoComboBox");
                            var val = cmb.value();

                            if (isNaN(val)) {
                                alert("'" + val + "' is not a Valid input");
                                cmb.value("");
                                model.set("DefaultSupAdrKy", 1);
                                model.set("SupNm", "");
                            } else {
                                model.set("DefaultSupAdrKy", dataItem.AdrKy);
                                model.set("SupNm", dataItem.AdrNm);
                            }
                        },
                        dataValueField: "AdrKy",
                        dataTextField: "AdrNm"
                    });
                }
            },
            {
                field: "DefaultSupAdrKy", title: "DefaultSupAdrKy", width: "100px", hidden: true, attributes: { style: "text-align:center;" },
            },
            {
                field: "OfrCode", title: "Promotion Code", width: "100px", attributes: { style: "text-align:center;" },
            },
            {
                field: "OrdUnit", title: "Order Unit", width: "100px", attributes: { style: "text-align:center;", "class": "non-editable" }
            },
            {
                field: "SalesUnit", title: "Sales Unit", width: "100px", attributes: { style: "text-align:center;", "class": "non-editable" }
            },
            {
                field: "InventoryUnit", title: "Inventory Unit", width: "100px", attributes: { style: "text-align:center;" }, hidden: true,
            },
            {
                field: "CosPri", title: "Cost Price", width: "100px", attributes: { style: "text-align:center;", "class": "non-editable" }, template: '#= kendo.toString(CosPri, "n2")#',
            },
            {
                field: "SlsPri", title: "Sales Price", width: "100px", attributes: { style: "text-align:center;", "class": "non-editable" }, template: '#= kendo.toString(SlsPri, "n2")#',
            },
            {
                field: "ReOrdLvl", title: "Reorder Level", width: "100px", attributes: { style: "text-align:center;" },
            },
            {
                field: "ReOrdQty", title: "Reorder Qty%", width: "100px", attributes: { style: "text-align:center;" }, template: '#= kendo.toString(ReOrdQty, "n3")#',
            },
              {
                  title: "Discontinue", width: "100px",
                  template: '<label class="lbl-switch"> <input type="checkbox"  #= isDiscontinued? "checked=checked" : "" # class="isDiscontinuedPinChecked"/> <div> <span class="on">Yes</span> <span class="off">No</span> </div> <i></i> </label>',
              },
              {
                  title: "Shown in Website", width: "100px",
                  template: '<label class="lbl-switch"> <input type="checkbox"  #= isShowInWeb? "checked=checked" : "" # class="isShowInWebPinChecked"/> <div> <span class="on">Yes</span> <span class="off">No</span> </div> <i></i> </label>',
              },
              {
                  title: "Fixed Sales Price", width: "100px",
                  template: '<label class="lbl-switch"> <input type="checkbox"  #= isFixedSlsPrice? "checked=checked" : "" # class="isFixedSlsPricePinChecked"/> <div> <span class="on">Yes</span> <span class="off">No</span> </div> <i></i> </label>',
              },
              {
                  field: "MinInvQty", title: "MinQty", width: "100px", attributes: { style: "text-align:center;" }, hidden: true,
              },
              {
                  field: "MaxInvQty", title: "MaxQty", width: "100px", attributes: { style: "text-align:center;" }, hidden: true,
              },
              {
                  field: "MaxDisPer", title: "Max Discount %", width: "100px", attributes: { style: "text-align:center;" },
              },
              {
                  field: "MinSlsPri", title: "Min Sales Price", width: "100px", attributes: { style: "text-align:center;" }, template: '#= kendo.toString(MinSlsPri, "n2")#',
              },
    ];

    var gridNo = 2;
    var FinalItmSettingsColumn = setColumnProp(ItmSettingsColumn, viewBag.ObjKy, '', 'HdrSec2_Tab3_FormGrd', gridNo);
}

$('#ItmSettingsgrid').on('click', '.isShowInWebPinChecked', function () {
    var checked = $(this).is(':checked');
    var grid = $('#ItmSettingsgrid').data().kendoGrid;
    var dataItem = grid.dataItem($(this).closest('tr'));
    if (dataItem != undefined) {
        dataItem.set('isShowInWeb ', checked);
    }
});
$('#ItmSettingsgrid').on('click', '.isDiscontinuedPinChecked', function () {
    var checked = $(this).is(':checked');
    var grid = $('#ItmSettingsgrid').data().kendoGrid;
    var dataItem = grid.dataItem($(this).closest('tr'));
    if (dataItem != undefined) {
        dataItem.set('isDiscontinued ', checked);
    }
});
$('#ItmSettingsgrid').on('click', '.isFixedSlsPricePinChecked', function () {
    var checked = $(this).is(':checked');
    var grid = $('#ItmSettingsgrid').data().kendoGrid;
    var dataItem = grid.dataItem($(this).closest('tr'));
    if (dataItem != undefined) {
        dataItem.set('isFixedSlsPrice ', checked);
    }
});

function LoadGridWithColumnPropTwo(columnsFinal, gridNo) {

    if (gridNo == 2) {

        try {
            $('#ItmSettingsgrid').data().kendoGrid.destroy();
            $('#ItmSettingsgrid').empty();
        } catch (e) { }

        var ItmtypKy = $("#HdrSec1_CmbTyp_Cd").data('kendoComboBox').value();
        var ItmKy = $("#ItmKy").val();



        var griddataSource = new kendo.data.DataSource({
            transport: {
                read: {
                    url: urlGetItmSettings, // '@Url.Action("GetItmSettings", "ItmMasCd")',
                    contentType: 'application/json; charset=utf-8',
                    //data: {
                    //    ConCd: 'TRADING',
                    //    TypConCd: 'ItmTyp',
                    //    TypKy: ItmTypKy
                    //},
                    dataType: "json",
                },
                parameterMap: function (options, operation) {

                    if (operation == "read") {
                        return ({
                            'ItmTypKy': ItmtypKy,
                            'ControlConKy': ControlConKy,
                            'ItmKy': ItmKy,
                            'ObjKy': viewBag.ObjKy,
                        })
                    }
                }
            },
            pageSize: 12,

            schema: {
                model: {
                    id: "ItmCdKy",
                    fields: //Relavent fields of the grid should be bind with following model items
                    {
                        ItmKy: { editable: true, nullable: false, validation: { required: true }, type: "number" },
                        ControlConKy: { editable: false, nullable: false, type: "number" },
                        ItmCdKy: { editable: false, nullable: false, type: "number" },
                        CdKy: { editable: true, nullable: true },
                        DefaultSupAdrKy: { editable: false, nullable: false, type: "number" },
                        LocNm: { editable: true, nullable: true, type: "string" },
                        SupNm: { editable: true, nullable: true, type: "string" },
                        OfrCode: { editable: true, nullable: true, type: "string" },
                        OrdUnit: { editable: false, nullable: true },
                        SalesUnit: { editable: false, nullable: true },
                        InventoryUnit: { editable: false, nullable: true },
                        ReOrdLvl: { editable: true, nullable: true, type: "number" },
                        ReOrdQty: { editable: true, nullable: true, type: "number" },
                        isShowInWeb: { editable: true, nullable: false, type: "boolean" },
                        isDiscontinued: { editable: true, nullable: false, type: "boolean" },
                        isAlwTrnRateChange: { editable: true, nullable: false, type: "boolean" },
                        isFixedSlsPrice: { editable: true, nullable: false, type: "boolean" },
                        MinInvQty: { editable: true, nullable: false, type: "number" },
                        MaxInvQty: { editable: true, nullable: false, type: "number" },
                        CosPri: { editable: false, nullable: false, type: "number" },
                        SlsPri: { editable: false, nullable: false, type: "number" },
                        MaxDisPer: { editable: true, nullable: false },
                        MinSlsPri: { editable: true, nullable: false },
                    }
                }
            }
        });

        //ItmSettingsgrid
      
            //detailRow.find(".ItmSettingsgrid").kendoGrid({
                $(".ItmSettingsgrid").kendoGrid({
                dataSource: griddataSource,
                autobind: true,
                resizable: true,
                navigatable: true,
                sortable: true,
                reorderable: true,
                //Scrollable: true,
                columns: columnsFinal,
                selectable: "row",
                pageable: {
                    refresh: true, pageSizes: [5, 10, 20, 50, 100, 150]
                },
                columnMenu: true,
                // filterable: true,
                filterable: {
                    mode: "row"
                },

                dataBinding: function () {
                    record = (this.dataSource.page() - 1) * this.dataSource.pageSize();
                },
                dataBound: GridOnDataBound,

                editable: true
            });
        }
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