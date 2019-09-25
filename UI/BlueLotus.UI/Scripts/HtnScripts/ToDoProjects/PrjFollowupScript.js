
var FormGlblData = {
    FormObjData: null,
    PrjTypKy: 1,
    PrjKy:1,
    AccessLvlKy: 1,
    ConfiLvlKy: 1,
    TrnKy: 1,
    RecKy: 1,
    TblNm: 'PrjHdrCd',
    AdrKy: 1,
    ItmKy: 1,
}


$(document).ready(function () {

    var todayDate = new Date();
    $("#GridWin").hide();
    var height = $(window).height() - 70;
    var h2 = $("#filterCont").height();
    $("#body").height(height);
    $("#grid").height(height - (35 + h2 + 40));

    GetFormObjData();

});

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
}

function setHdrSectionPropFun() {
    // ---------- Set ObjProperties
    setHdrSectionProp('', viewBag.ObjKy, '', 'HdrSec1');
}

function insertItem() {   //---------- Insert a row inside Grid view----
    var grid = $("#grid").data("kendoGrid");
    grid.addRow();
}

function CancelGridItem() {
    var grid = $("#grid").data("kendoGrid");
    grid.cancelChanges();

    //$("#HdrSec1_CmbPrj_Nm").data("kendoComboBox").value(1);
    //$("#HdrSec1_CmbPrj_Nm").data("kendoComboBox").text("");
    //$("#HdrSec1_CmbPrj_Cd").data("kendoComboBox").value(1);
    //$("#HdrSec1_CmbPrj_Cd").data("kendoComboBox").text("");
    //FormGlblData.PrjKy = 1;
    //$("#grid").data("kendoGrid").cancelChanges();
}

//------------- Insert and Update Grid--------------
function Save() {
    var grid = $("#grid").data("kendoGrid");
    var currentData = grid.dataSource.data();
    var updatedRecords = [];
    var newRecords = [];

    for (var i = 0; i < currentData.length; i++) {

        if (currentData[i].isNew()) {
            newRecords.push(currentData[i].toJSON());
        } else if (currentData[i].dirty) {
            updatedRecords.push(currentData[i].toJSON());
        }
    }


    if (newRecords.length != 0 || updatedRecords.length != 0) {

            //ajax for unsert update and delete
            $.ajax({
                url: URLInsertUpdatePrjFollowup,
                data: JSON.stringify({
                    ObjKy: viewBag.ObjKy,
                    updatePrjFollowup: kendo.stringify(updatedRecords),
                    newPrjFollowup: kendo.stringify(newRecords),
                    OurCd: viewBag.OurCd
                }),
                contentType: "application/json; charset=utf-8",
                dataType: "Json",
                type: "POST",
                success: function (data) {

                    if (data == true) {
                        alert("Successfully Saved..!");
                        //AlertMsg();
                        //Alert();
                        LoadGridViewColumn(); // update grid
                    } else {
                        alert("Record Not Saved");
                        LoadGridViewColumn(); // update grid
                    }
                },
                error: function (e) {
                    return false;
                }
            });
    }
}

function ProjectDatasource() {
    var dataSource = new kendo.data.DataSource(
      {
          transport: {
              read: {
                  url: URLProjectDatasource,
                  dataType: "json"
              }
          }

      });
    return dataSource;
}

function LoadCombo() {
    $("#HdrSec1_CmbPrj_Cd").kendoComboBox({
        dataTextField: "PrjId",
        dataValueField: "PrjKy",
        dataSource: PrjId_SelectMob_DataSource('HdrSec1_CmbPrj'),
        change: function (e) {
            var cmb1 = $("#HdrSec1_CmbPrj_Cd").data("kendoComboBox");
            var val1 = cmb1.value();
            FormGlblData.PrjKy = val1;

            if (isNaN(val1)) {
                alert("'" + val1 + "' is not a Valid input");
                cmb1.value("");
            }
            else {
                $("#HdrSec1_CmbPrj_Nm").data("kendoComboBox").value(val1);
                $("#GridWin").show();
                LoadGridViewColumn();
            }

        },
        filter: "startswith",
        suggest: true,
        placeholder: "Project ID"
    });

    $("#HdrSec1_CmbPrj_Nm").kendoComboBox({
        dataValueField: "PrjKy",
        dataTextField: "PrjNm",
        dataSource: PrjNm_SelectMob_DataSource('HdrSec1_CmbPrj'),
        change: function (e) {
            var cmb = $("#HdrSec1_CmbPrj_Nm").data("kendoComboBox");
            var val = cmb.value();
            FormGlblData.PrjKy = val;

            if (isNaN(val)) {
                alert("'" + val + "' is not a Valid input");
                cmb.value("");
            }
            else {
                $("#HdrSec1_CmbPrj_Cd").data("kendoComboBox").value(val);
                $("#GridWin").show();
                LoadGridViewColumn();
            }

        },
        filter: "startswith",
        suggest: true,
        hidden: true,
        placeholder: "Project Name"
    });

    $("#HdrSec1_CmbPrj_Cd").parent().css('width', "200px");
    $("#HdrSec1_CmbPrj_Nm").parent().css('width', "200px");

    $("#HdrSec1_CmbAdrId_Cd").kendoComboBox({
        dataTextField: "AdrID",
        dataValueField: "AdrKy",
        dataSource: AdrID_SelectMob_DataSource('HdrSec1_CmbAdrId'),
        change: function (e) {

            var cmb = $("#HdrSec1_CmbAdrId_Cd").data("kendoComboBox");
            var No = cmb.value();
            FormGlblData.AdrKy = No;

            if (isNaN(No)) {
                alert("'" + No + "' is not a Valid input");
                cmb.value("");
            }
            else {
                $("#HdrSec1_CmbAdrNm_Nm").data("kendoComboBox").value(No);
                $("#GridWin").show();
                //LoadGridViewColumn();
            }

        },
        filter: "startswith",
        suggest: true,
        placeholder: "Address ID"
    });

    $("#HdrSec1_CmbAdrNm_Nm").kendoComboBox({
        dataTextField: "AdrNm",
        dataValueField: "AdrKy",
        dataSource: AdrNm_SelectMob_DataSource('HdrSec1_CmbAdrNm'),
        change: function (e) {

            var cmb = $("#HdrSec1_CmbAdrNm_Nm").data("kendoComboBox");
            var No1 = cmb.value();
            FormGlblData.AdrKy = No1;


            if (isNaN(No1)) {
                alert("'" + No1 + "' is not a Valid input");
                cmb.value("");
            }
            else {
                $("#HdrSec1_CmbAdrId_Cd").data("kendoComboBox").value(No1);
                $("#GridWin").show();
                //LoadGridViewColumn();
            }

        },
        filter: "startswith",
        suggest: true,
        placeholder: "Address Name"
    });
    $("#HdrSec1_CmbAdrId_Cd").parent().css('width', "200px");
    $("#HdrSec1_CmbAdrNm_Nm").parent().css('width', "200px");

    $("#HdrSec1_CmbItmId_Cd").kendoComboBox({
        dataTextField: "ItmCd",
        dataValueField: "ItmKy",
        dataSource: ItmCd_SelectMob_Datasource('HdrSec1_CmbItmId'),
        change: function (e) {

            var cmb = $("#HdrSec1_CmbItmId_Cd").data("kendoComboBox");
            var No2 = cmb.value();
            FormGlblData.ItmKy = No2;

            if (isNaN(No2)) {
                alert("'" + No2 + "' is not a Valid input");
                cmb.value("");
            }
            else {
                $("#HdrSec1_CmbItmNm_Nm").data("kendoComboBox").value(No2);
                $("#GridWin").show();
                //LoadGridViewColumn();
            }
        },
        filter: "startswith",
        suggest: true,
        placeholder: "Item ID"
    });

    $("#HdrSec1_CmbItmNm_Nm").kendoComboBox({
        dataTextField: "ItmNm",
        dataValueField: "ItmKy",
        dataSource: ItmNm_SelectMob_Datasource('HdrSec1_CmbItmNm'),
        change: function (e) {

            var cmb = $("#HdrSec1_CmbItmNm_Nm").data("kendoComboBox");
            var No3= cmb.value();
            FormGlblData.ItmKy = No3;

            if (isNaN(No3)) {
                alert("'" + No3 + "' is not a Valid input");
                cmb.value("");
            }
            else {
                $("#HdrSec1_CmbItmId_Cd").data("kendoComboBox").value(No3);
                $("#GridWin").show();
                //LoadGridViewColumn();
            }

        },
        filter: "startswith",
        suggest: true,
        placeholder: "Item Name"
    });
    $("#HdrSec1_CmbItmId_Cd").parent().css('width', "200px");
    $("#HdrSec1_CmbItmNm_Nm").parent().css('width', "200px");
}

function LoadGridViewColumn() {
    var ItmRateColumns = [

        { field: "PrjCdKy", title: "PrjCdKy", width: "70px"},
        { field: "PrjKy", title: "PrjKy", width: "70px" },
        { field: "AdrKy", title: "AdrKy", width: "70px", hidden: true },
        { field: "ItmKy", title: "ItmKy", width: "70px", hidden: true },
        { field: "ControlConKy", title: "ControlConKy", width: "70px"},
        { field: "CdKy", title: "CdKy", width: "70px"},
        { field: "Code", title: "Code", width: "70px"},
        { field: "CdNm", title: "CdNm", width: "70px"},
        {
            field: "ActDt", title: "Actual Date", width: "150px", format: "{0:dd/MM/yyyy}",
            //editor: function (container, options) {
            //var model = options.model;
            //$('<input id="ActDt" name="' + options.field + '" data-value-field="' + options.field + '" data-bind="value:' + options.field + '" data-format="' + options.format + '"/>').appendTo(container).kendoDatePicker({
            //    change: function (e)
            //    {
            //        // model.set("RedDt", e.sender._oldText);
            //    }
            //});
        //},
            //format: "{0: MM/dd/yyyy}"
        },
        { field: "Amt", title: "Amt", width: "70px", hidden: false, format: "{0:N2}" },
        { field: "Des", title: "Des", width: "70px", hidden: false },
        { field: "RefNo", title: "Ref No", width: "70px", hidden: false },
        { field: "IsAct", title: "IsAct", width: "110px" },
        {
            width: "50px",
            template: kendo.template($("#command-template").html())
        }


    ];

    var gridNo = 1;
    var FinalItmRateColumn = setColumnProp(ItmRateColumns, viewBag.ObjKy, '', 'FormGrd', gridNo);
}


function LoadGridWithColumnProp(columnsFinal, gridNo) {
    if (gridNo == 1) {
        try {
            $('#grid').data().kendoGrid.destroy();
            $('#grid').empty();
        } catch (e) { }

        //var controlconky = GridData.ConrlConKy;
        
        var PrjKy = FormGlblData.PrjKy;
        if (PrjKy == "" || PrjKy == null || PrjKy == undefined) { PrjKy = 1; }

        var AdrKy = FormGlblData.AdrKy;
        if (AdrKy == "" || AdrKy == null || AdrKy == undefined) { AdrKy = 1; }

        var ItmKy = FormGlblData.ItmKy;
        if (ItmKy == "" || ItmKy == null || ItmKy == undefined) { ItmKy = 1; }

        var dataSourceGrid = new kendo.data.DataSource({

            transport: {
                read: {
                    url: URLPrjFollowupLoadGrid,
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
                            'PrjKy': PrjKy,
                            'OurCd': viewBag.OurCd, //GridData.ConrlConKy
                            'AdrKy': AdrKy,
                            'ItmKy': ItmKy

                        });
                    }
                }
            },
            batch: true,
            pageSize: 15,
            schema: {
                model: {
                    id: "PrjCdKy ",
                    fields: //Relavent fields of the grid should be bind with following model items
                    {
                        PrjCdKy: { editable: false, nullable: false, type: "number" },
                        PrjKy: { editable: false, nullable: false, type: "number" },
                        AdrKy: { editable: true, nullable: true, type: "number" },
                        ItmKy: { editable: true, nullable: true, type: "number" },
                        ControlConKy: { editable: false, nullable: false, type: "number" },
                        CdKy: { editable: false, nullable: false, type: "number" },
                        Code: { editable: false, nullable: true, type: "string" },
                        CdNm: { editable: false, nullable: false, type: "string" },
                        Amt: { editable: true, nullable: false, type: "number" },
                        ActDt: { editable: true, nullable: false, type: "date", format: "{0:dd/MM/yyyy}" },
                        Des: { editable: true, nullable: false, type: "string" },
                        RefNo: { editable: true, nullable: false, type: "string" },


                    }
                }
            }
        });

        $("#grid").kendoGrid({
            dataSource: dataSourceGrid,
            //autobind: true,

            navigatable: true,
            filterable: {
                mode: "row"
            },
            pageable: true,
            sortable: true,
            reorderable: true,
            columnMenu: true,

            selectable: "row",
            pageable: { refresh: true, pageSizes: [5, 10, 20, 50, 100] },

            columns: columnsFinal,
            resizable: true,
            editable: true
        });
    }
}


var id = ("#grid");
$(id).on("click", ".k-grid-evenselect", function (e) {

    //var id = ("#" + viewBag.OurCd);
    var grid = $(id).data("kendoGrid");
    var selectedItem = grid.dataItem($(this).closest("tr"));
    FormGlblData.RecKy = selectedItem.PrjCdKy;
    //alert(FormGlblData.RecKy);
    AttachImage();

    //$("#PrjImage").show().kendoWindow({
    //    width: "1000px",
    //    height: "500px",
    //    modal: true,
    //    title: "Images"
    //});
    //$('#PrjImage').data('kendoWindow').center().open();
    //e.preventDefault();

});