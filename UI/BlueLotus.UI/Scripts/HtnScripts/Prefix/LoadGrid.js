function LoadDetailGrid() {

    //try {
    //    var grid = $("#PrefixGrid").data("kendoGrid");
    //    var currentData = grid.dataSource.data();

    //    $('#PrefixGrid').data().kendoGrid.destroy();
    //    $('#PrefixGrid').empty();
    //} catch (e) { }
    var cusColumns = [
            {
                field: "LstNoPreFixKy",
                title: "LstNoPreFixKy",
                hidden: true,
            },
            {
                field: "Prefix", title: "Prefix",

                editor: function (container, options) {
                    var model = options.model;
                    var cncod = model.ConCd;
                    $('<input id="Prefix" name="' + options.field + '"/>').appendTo(container).kendoComboBox({
                        dataSource: Code_SelectMob_Datasource('Prefix'),

                        change: function (e) {

                            combo = e.sender;
                            selectedItm = combo.select();
                            dataItem = combo.dataItem(selectedItm);

                            model.set("PrefixKy", dataItem.CdKy);
                            model.set("Prefix", dataItem.Code);
                        },
                        dataValueField: "CdKy",
                        dataTextField: "Code",
                        filter: "startswith"
                        //dataBound: function (e) {
                        //}
                    });
                }
            },
            //{
            //    field: "AccountCode",
            //    title: "Account Code",
            //    hidden: true,
            //},
            {
                field: "BU", title: "Business Unit", 

                editor: function (container, options) {
                    var model = options.model;
                    var cncod = model.ConCd;
                    $('<input id="BU" name="' + options.field + '"/>').appendTo(container).kendoComboBox({
                        dataSource: Code_SelectMob_Datasource('BU'),
                        change: function (e) {

                            combo = e.sender;
                            selectedItm = combo.select();
                            dataItem = combo.dataItem(selectedItm);

                            model.set("BUKy", dataItem.CdKy);
                            model.set("BU", dataItem.Code);
                        },
                        dataValueField: "CdKy",
                        dataTextField: "Code",
                        filter: "startswith"
                        //dataBound: function (e) {
                        //}
                    });
                }
            },
            //{
            //    field: "ConFinLvl", title: "ConFinLvl", attributes: { style: "text-align:center;" },

            //    editor: function (container, options) {
            //        var model = options.model;
            //        var cncod = model.ConCd;
            //        $('<input id="cmbConFinLvlKy" name="' + options.field + '"/>').appendTo(container).kendoComboBox({
            //            dataSource: CdNm_SelectMob_Datasource('ConFinLvlKy'),
            //            change: function (e) {

            //                combo = e.sender;
            //                selectedItm = combo.select();
            //                dataItem = combo.dataItem(selectedItm);

            //                model.set("ConFinLvlKy", dataItem.CdKy);
            //                model.set("conLvlNm", dataItem.CdNm);
            //            },
            //            dataValueField: "CdKy",
            //            dataTextField: "CdNm",
            //            dataBound: function (e) {
            //            }
            //        });
            //    },
            //    hidden: true,
            //},
            {
                field: "FYStDt", title: "FYStDt", 

                editor: function (container, options) {
                    var model = options.model;
                    var cncod = model.ConCd;
                    $('<input id="FYStDt" name="' + options.field + '"/>').appendTo(container).kendoComboBox({
                        dataSource: CdNm_SelectMob_Datasource('FyStDt'),
                        change: function (e) {

                            combo = e.sender;
                            selectedItm = combo.select();
                            dataItem = combo.dataItem(selectedItm);

                            model.set("FYStDtKy", dataItem.CdKy);
                            model.set("FYStDt", dataItem.CdNm);
                        },
                        dataValueField: "CdKy",
                        dataTextField: "CdNm",
                        filter: "startswith"
                        //dataBound: function (e) {
                        //}
                    });
                }
            },
            {
                field: "Location", title: "Location", 

                editor: function (container, options) {
                    var model = options.model;
                    var cncod = model.ConCd;
                    $('<input id="Location" name="' + options.field + '"/>').appendTo(container).kendoComboBox({
                        dataSource: Code_SelectMob_Datasource('Location'),
                        change: function (e) {

                            combo = e.sender;
                            selectedItm = combo.select();
                            dataItem = combo.dataItem(selectedItm);

                            model.set("LocationKy", dataItem.CdKy);
                            model.set("Location", dataItem.Code);
                        },
                        dataValueField: "CdKy",
                        dataTextField: "Code",
                        filter: "startswith"
                        //dataBound: function (e) {
                        //}
                    });
                }
            },
            //{
            //    field: "Order",
            //    title: "Order",
            //    hidden: true,
            //},
            {
                field: "Project", title: "Project", 

                editor: function (container, options) {
                    var model = options.model;
                    var cncod = model.ConCd;
                    $('<input id="Project" name="' + options.field + '"/>').appendTo(container).kendoComboBox({
                        dataSource: PrjNm_SelectMob_DataSource('Project'),
                        change: function (e) {

                            combo = e.sender;
                            selectedItm = combo.select();
                            dataItem = combo.dataItem(selectedItm);

                            model.set("ProjectKy", dataItem.PrjKy);
                            model.set("Project", dataItem.PrjNm);
                        },
                        dataValueField: "PrjKy",
                        dataTextField: "PrjNm",
                        filter: "startswith"                      

                    });
                }
            },
            {
                field: "AcsLvl", title: "Access Level", 

                editor: function (container, options) {
                    var model = options.model;
                    var cncod = model.ConCd;
                    $('<input id="AcsLvl" name="' + options.field + '"/>').appendTo(container).kendoComboBox({
                        dataSource: Code_SelectMob_Datasource('AcsLvl'),
                        change: function (e) {

                            combo = e.sender;
                            selectedItm = combo.select();
                            dataItem = combo.dataItem(selectedItm);

                            model.set("AcsLvlKy", dataItem.CdKy);
                            model.set("AcsLvl", dataItem.Code);
                        },
                        dataValueField: "CdKy",
                        dataTextField: "Code",
                        filter: "startswith"
                        //dataBound: function (e) {
                        //}
                    });
                }
            },
            //{
            //    field: "Date",
            //    title: "Date",hidden:true,
            //    editor: function (container, options) {
            //        var model = options.model;
            //        $('<input id="Date" name="' + options.field + '"/>').appendTo(container).kendoDatePicker({
            //            change: function (e) {
            //                model.set("Date", e.sender._oldText);
            //            }
            //        });
            //    },
            //    format: "{0:dd/MM/yyyy}",
            //},
    ];
    //for (var j = 0; j < cusColumns.length ; j++) {
    //    if (cusColumns[j].field == 'FYStDt') {
    //        if (!$('#HdrSec1_chkbxIsFy_val').is(":checked")) {
    //            cusColumns[j].hidden = true;
    //        }
    //    }
    //    if (cusColumns[j].field == 'Project') {
    //        if (!$('#HdrSec1_chkbxIsPrj_val').is(":checked")) {
    //            cusColumns[j].hidden = true;
    //        }
    //    }
    //    if (cusColumns[j].field == 'BU') {
    //        if (!$('#HdrSec1_chkbxIsBU_val').is(":checked")) {
    //            cusColumns[j].hidden = true;
    //        }
    //    }
    //    if (cusColumns[j].field == 'Location') {
    //        if (!$('#HdrSec1_chkbxIsLoc_val').is(":checked")) {
    //            cusColumns[j].hidden = true;
    //        }
    //    }
    //}

    var dataSource = new kendo.data.DataSource({
        batch: true,
        pageSize: 10,
        schema: {
            model: {
                id: "",
                fields:
                {
                    LstNoPreFixKy: { editable: true, nullable: false, hidden: true, type: "number" },
                    Prefix: { editable: true, nullable: false, type: "string" },
                    PrefixKy: { editable: true, nullable: false, hidden: true, type: "number" },
                    TrnTypKy: { editable: true, nullable: false, hidden: true, type: "number" },
                    //AccountCode: { editable: true, nullable: false, type: "string" },
                    //AccountCodeKy: { editable: true, nullable: false, type: "number" },
                    BU: { editable: true, nullable: false, type: "string" },
                    BUKy: { editable: true, nullable: false, hidden: true, type: "number" },
                    AcsLvlKy: { editable: true, nullable: false, type: 'number', hidden: true },
                    AcsLvl: { editable: true, nullable: false, type: 'string' },
                    //ConFinLvlKy: { editable: true, nullable: false, type: "number" , hidden:true },
                    // ConFinLvl: { editable: true, nullable: false, type: 'string' },
                    FYStDtKy: { editable: true, nullable: false, type: 'number', hidden: true },
                    FYStDt: { editable: true, nullable: false, type: 'string' },
                    Location: { editable: true, nullable: false, type: "string" },
                    LocationKy: { editable: true, nullable: false, hidden: true, type: "number" },
                    //Order: { editable: true, nullable: false, type: "string" },
                    //OrderKy: { editable: true, nullable: false, hidden: true, type: "number" },
                    Project: { editable: true, nullable: false, type: "string" },
                    ProjectKy: { editable: true, nullable: false, hidden: true, type: "number" },
                    // Date: { editable: true, nullable: false, type: "string" }
                }
            }
        },
    });
    $("#PrefixGrid").kendoGrid({
        dataSource: dataSource,
        filterable: {
            mode: "row"
        },
        sortable: {
            mode: "single",
            allowUnsort: true
        },
        autobind: true,
        navigatable: true,
        editable: true,
        columnMenu: true,
        scrollable: true,
        pageSize: 10,
        pageable: true,
        selectable: "row",
        resizable: true,
        pageable: { refresh: true, pageSizes: [5, 10, 20, 50, 100] },
        columns: cusColumns
    });

    //GetPrefix();

    //$("#PrefixGrid").data("kendoGrid").dataSource.data(currentData);

    createColumnDynamically();
}

function createColumnDynamically() {

    var grid = $("#PrefixGrid").data("kendoGrid");

    if (!$('#HdrSec1_chkbxIsFy_val').is(":checked")) {
        grid.hideColumn("FYStDt");
    }
    else {
        grid.showColumn("FYStDt");
    }

    if (!$('#HdrSec1_chkbxIsPrj_val').is(":checked")) {
        grid.hideColumn("Project");
    }
    else {
        grid.showColumn("Project");
    }

    if (!$('#HdrSec1_chkbxIsBU_val').is(":checked")) {
        grid.hideColumn("BU");
    }
    else {
        grid.showColumn("BU");
    }

    if (!$('#HdrSec1_chkbxIsLoc_val').is(":checked")) {
        grid.hideColumn("Location");
    }
    else {
        grid.showColumn("Location");
    }
}

