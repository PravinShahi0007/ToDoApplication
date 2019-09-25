
var ShiftGrpKy = 0;

var FormGlblData = {
    FormObjData: null,
    AllDefalutValueObj: null,
    ItmTypKy: 1,
    TrnTypKy: 1,
    AccessLvlKy: 1,
    ConfiLvlKy: 1,
}


$(document).ready(function () {

    GetFormObjData();

})

function GetFormObjData() {

    $.ajax({
        url: urlUsrObjPrp_SelectAllLastChildWeb,
        dataType: "json",
        type: "POST",
        data: JSON.stringify({
            PrntKy: viewBag.ObjKy
        }),
        contentType: 'application/json; charset=utf-8',
        success: function (HdrSectionFromDb) {

            FormGlblData.FormObjData = HdrSectionFromDb;

            DocReadyCus();
        }
    });
}

function DocReadyCus() {
    setTimeout(setHdrSectionPropFun, 2000);
    LoadCombo();
    // LoadGrid(1);
    // LoadTimePickers();
    //  LoadTaskCombo();
    //Button_From_Dynamic('ButtonSec1');
    function setHdrSectionPropFun() {

        // ---------- Set ObjProperties
        setHdrSectionProp('', viewBag.ObjKy, '', 'HdrSec1');

        SetHandlingEnterKeyEvent('', viewBag.ObjKy);

    }
}

function LoadCombo() {

    $("#HdrSec1_ShiftGrp_Nm").kendoComboBox({
        dataValueField: "CdKy",
        dataTextField: "CdNm",
        dataSource: CdNm_SelectMob_Datasource('HdrSec1_ShiftGrp'),
        change: function (e) {
            var shiftGrpKy = $("#HdrSec1_ShiftGrp_Nm").val();
            if (shiftGrpKy == "" || shiftGrpKy == null || shiftGrpKy == undefined) shiftGrpKy = 1
            LoadGrid(shiftGrpKy)
        },

        filter: "contains",
        suggest: true,
        placeholder: "Select a ShiftGrp.."
    });
}

function LoadGrid(shiftGrpKy) {

    if (shiftGrpKy > 1)
        ShiftGrpKy = shiftGrpKy;
    var Column = [
            {
                field: "ShiftGrpKy", title: "ShiftGrpKy", width: "10px", hidden: true,
            },
            {
                field: "DayTypKy", title: "DayTypKy", width: "10px", hidden: true,
            },
            {
                field: "ShiftKy", title: "ShiftKy", width: "10px", hidden: true,
            },
            {
                field: "CdMasCdKy", title: "CdMasCdKy", width: "10px", hidden: true,
            },
            
            {
                field: "DayType", title: "DAY TYPE", width: "100px",
            },
            {
                field: "Shift", title: "SHIFT", width: "100px",
                editor: function (container, options) {
                    var model = options.model;
                    $('<input id="ShiftKy" name="' + options.field + '" />').appendTo(container).kendoComboBox({
                        dataSource: CdNm_SelectMob_Datasource('Shift'),
                        change: function (e) {
                            combo = e.sender;
                            selectedItm = combo.select();
                            dataItem = combo.dataItem(selectedItm);

                            var cmb = $("#ShiftKy").data("kendoComboBox");
                            var val = cmb.value();

                            if (isNaN(val)) {
                                alert("'" + val + "' is not a Valid input");
                                cmb.value("");
                                model.set("ShiftKy", 1);
                                model.set("Shift", "");
                            }
                            else {

                                model.set("Shift", dataItem.CdNm);
                                model.set("ShiftKy", dataItem.CdKy);
                            }
                        },
                        dataValueField: "CdKy",
                        dataTextField: "CdNm",
                        dataBound: function (e) {
                        }
                    });
                }
            },


    ];

    var gridNo = 1;
    var FinalShiftSettingsColumn = setColumnProp(Column, viewBag.ObjKy, '', 'GridShiftGroup', gridNo);
}

function LoadGridWithColumnProp(columnsFinal, gridNo) {

    if (gridNo == 1) {
        try {
            $('#GridShiftGroup').data().kendoGrid.destroy();
            $('#GridShiftGroup').empty();
        } catch (e) { }


        var dataSourceGrid = new kendo.data.DataSource({

            transport: {
                read: {
                    url: urlShiftGroup_Selectweb,
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
                            'ShiftGrpKy': ShiftGrpKy,

                        });
                    }
                }
            },


            batch: true,
            pageSize: 20,

            schema: {
                model: {
                    id: "ShiftGrpKy",
                    fields: //Relavent fields of the grid should be bind with following model items
                    {
                        ShiftGrpKy: { editable: true, nullable: false, type: "number" },
                        DayType: { editable: false, nullable: false, type: "string" },
                        DayTypKy: { editable: true, nullable: false, type: "number" },
                        Shift: { editable: true, nullable: false, type: "string" },
                        ShiftKy: { editable: true, nullable: false, type: "number" },
                        CdMasCdKy: { editable: true, nullable: false, type: "number" },
                       
                    }
                }
            }
        })


        $("#GridShiftGroup").kendoGrid({

            dataSource: dataSourceGrid,
            autobind: true,
            resizable: true,
            navigatable: true,
            sortable: true,
            reorderable: true,
            Scrollable: true,

            columns: columnsFinal,
            selectable: "row",
            pageable: {
                refresh: true, pageSizes: [5, 10, 20, 50, 100, 150]
            },
            columnMenu: true,
            filterable: {
                mode: "row"
            },


            dataBinding: function () {
                record = (this.dataSource.page() - 1) * this.dataSource.pageSize();
            },
            //dataBound: GridOnDataBound,

            editable: true
        });


    }

}

function Save() {
   
    var GridShiftGroup = $("#GridShiftGroup").data("kendoGrid");
    var currentData = GridShiftGroup.dataSource.data();
    var updatedRecords = [];
    var newRecords = [];
   // var ShiftGrpKy = 1;
    for (var i = 0; i < currentData.length; i++) {
        if (currentData[i].isNew()) {
            newRecords.push(currentData[i].toJSON());
        } else if (currentData[i].dirty) {
            updatedRecords.push(currentData[i].toJSON());
        }
    }
    var tempSAveChech = true;

    if (newRecords.length != 0 || updatedRecords.length != 0) {

        if (tempSAveChech) {

            $.ajax({
                  url: urlShiftGroup_InsertUpdateWeb,
                data: JSON.stringify({

                    ShiftGrpKy: ShiftGrpKy,
                    GridShiftGroup: kendo.stringify(updatedRecords),
                }),
                contentType: 'application/json; charset=utf-8',
                dataType: "Json",
                type: "POST",
                success: function (data) {
                    if (data == true) {
                        alert("Successfully Saved..!");
                        LoadGrid(); // update grid
                    } else {
                        alert("Record Not Saved");
                        LoadGrid(); // update grid
                    }
                },
                error: function (e) {
                    alert("Record Not Saved");
                    LoadGrid();
                    return false;
                }
            });
        }
    }
}
function CancelGridItem() {
    var GridShiftGroup = $("#GridShiftGroup").data("kendoGrid");
    GridShiftGroup.cancelChanges();

}
