var FormGlblData = {
    FormObjData: null,
    TrnTypKy: 1,
    PrjTypKy: 1,
    AccessLvlKy: 1,
    ConfiLvlKy: 1,
}

$(document).ready(function () {
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
    LoadPrjcombo();
    LoadAdrCombo();
    $("#PrjGrid").show();
    LoadGrid();
}

var updateSelectArray = [];

function LoadPrjcombo() {
    $("#HdrSec1_CmbPrjId").kendoComboBox({
        dataValueField: "PrjKy",
        dataTextField: "PrjId",
        dataSource: PrjId_SelectMob_DataSource("HdrSec1_CmbPrjId"),
        change: function (e) {
            var cmb = $("#HdrSec1_CmbPrjId").data("kendoComboBox").value();
            $("#HdrSec1_CmbPrjNm").data("kendoComboBox").value(cmb);

        },
        filter: "contains",
        suggest: true,
        placeholder: "Select a Project..."
    });

    $("#HdrSec1_CmbPrjNm").kendoComboBox({
        dataValueField: "PrjKy",
        dataTextField: "PrjNm",
        dataSource: PrjNm_SelectMob_DataSource('HdrSec1_CmbPrjNm'),
        change: function (e) {
            var cmb = $("#HdrSec1_CmbPrjNm").data("kendoComboBox").value();
            $("#HdrSec1_CmbPrjId").data("kendoComboBox").value(cmb);

        },
        filter: "contains",
        suggest: true,
        placeholder: "Select a Project..."
    });
}

function LoadAdrCombo() {
    $("#HdrSec1_CmbAdrId").kendoComboBox({
        dataValueField: "AdrKy",
        dataTextField: "AdrID",
        dataSource: AdrID_SelectMob_DataSource("HdrSec1_CmbAdrId"),
        change: function (e) {
            var cmb = $("#HdrSec1_CmbAdrId").data("kendoComboBox").value();
            $("#HdrSec1_CmbAdrNm").data("kendoComboBox").value(cmb);
        },
        filter: "contains",
        suggest: true,
        placeholder: "Select an Address..."

    });

    $("#HdrSec1_CmbAdrNm").kendoComboBox({
        dataValueField: "AdrKy",
        dataTextField: "AdrNm",
        dataSource: AdrNm_SelectMob_DataSource("HdrSec1_CmbAdrNm"),
        change: function (e) {
            var cmb = $("#HdrSec1_CmbAdrNm").data("kendoComboBox").value();
            $("#HdrSec1_CmbAdrId").data("kendoComboBox").value(cmb);
        },
        filter: "contains",
        suggest: true,
        placeholder: "Select an Address..."

    });
}

function Load() {
    var prjKy = $("#HdrSec1_CmbPrjNm").data("kendoComboBox").value();
    var adrKy = $("#HdrSec1_CmbAdrNm").data("kendoComboBox").value();
    if (prjKy == null || prjKy.length === 0)
    {
        prjKy = 1;
    }
    if (adrKy == null || adrKy.length === 0) {
        adrKy = 1;
    }


    $.ajax({
        url: PrjAdr_SelectWeb ,
        data: JSON.stringify({
            PrjKy: prjKy,
            AdrKy: adrKy,
        }),
        contentType: 'application/json; charset=utf-8',
        dataType: "Json",
        type: "POST",
        success: function (data) {
            LoadGrid(data);
            }
    });

}

function LoadGrid() {

    var PrjColumns = [
            {
                field: "PrjAdrKy", title: "PrjAdrKy", width: "10px", hidden: true, attributes: { style: "text-align:center;" },
            },
             {
                 field: "PrjKy", title: "PrjKy", width: "10px", hidden: true, attributes: { style: "text-align:center;" },
             },
             {
                 field: "AdrKy", title: "AdrKy", width: "10px", hidden: true, attributes: { style: "text-align:center;" },
             },

            {
                field: "PrjID", title: "Project ID", width: "100px", attributes: { style: "text-align:center;" },
            },
            {
                field: "PrjNm", title: "Project Name", width: "100px", attributes: { style: "text-align:center;" },

            },

                {
                    field: "AdrID", title: "Address ID", width: "100px", attributes: { style: "text-align:center;" },
                },

                {
                    field: "AdrNm", title: "Address Name", width: "100px", attributes: { style: "text-align:center;" },

                },




    ];
    var gridNo = 1;
    var FinalItmColumn = setColumnProp(PrjColumns, viewBag.ObjKy, '', 'FrmGrd', gridNo)
}

function LoadGridWithColumnProp(columnsFinal, gridNo) {
    var PrjKy = $("#HdrSec1_CmbPrjNm").data("kendoComboBox").value();
    var AdrKy = $("#HdrSec1_CmbAdrNm").data("kendoComboBox").value();

    if (gridNo == 1) {
        try {
            $('#PrjGrid').data().kendoGrid.destroy();
            $('#PrjGrid').empty();
        } catch (e) { }

        var griddataSource = new kendo.data.DataSource({
            transport: {
                read: {
                    url: urlPrjAdr.PrjAdr_SelectWeb, 
                    dataType: "json",
                    type: "POST",
                },

                parameterMap: function (options, operation) {

                    if (operation == "read") {
                        return ({
                            'PrjKy': PrjKy,
                            'AdrKy': AdrKy,
                        })

                    }
                }

            },
            pageSize: 15,

            schema: {
                model: {
                    id: "PrjAdrKy",
                    fields: //Relavent fields of the grid should be bind with following model items
                    {
                        PrjAdrKy: { editable: false, nullable: false, type: "number"},
                        PrjKy: { editable: false, nullable: false, type: "number" },
                        AdrKy: { editable: false, nullable: false, type: "number" },
                        PrjID: { editable: false, nullable: true, type: "string" },
                        PrjNm: { editable: false, nullable: true, type: "string" },
                        AdrKy: { editable: false, nullable: false, type: "string" },
                        AdrNm: { editable: false, nullable: false, type: "string" },
                    }
                }
            }
        });


        $("#PrjGrid").kendoGrid({
            dataSource: griddataSource,
            height: 400,
            autobind: true,
            resizable: true,
            navigatable: true,
            sortable: true,
            reorderable: true,
            Scrollable: true,
            selectable: "row",
            pageable: {
                refresh: true, pageSizes: [5, 10, 20, 50, 100, 150]
            },
            columnMenu: true,
           
            columns: columnsFinal,
            dataBinding: function () {
                record = (this.dataSource.page() - 1) * this.dataSource.pageSize();
            },

            editable: false
        });

    }
}



function LoadGrid(data) {
    var datasourceLoadGridView = new kendo.data.DataSource({
        data: data,
        batch: true,
        pageSize: 20,
        schema: {
            model: {
                fields:
				{
				    PrjAdrKy: { editable: false, nullable: false, },
				    PrjNm: { editable: false, nullable: false, },
				    PrjID: { editable: false, nullable: false, },
				    AdrID: { editable: false, nullable: false, },
				    AdrNm: { editable: false, nullable: false, }
				}
            }
        }
    });

    $("#PrjGrid").kendoGrid({
        dataSource: datasourceLoadGridView,
        height: 400,
        navigatable: true,
        filterable: true,
        pageable: true,
        sortable: true,
        reorderable: true,
        columnMenu: false,
        selectable: "row",
        resizable: true,
        pageable: { refresh: true, pageSizes: [5, 10, 20, 50, 100] },
        columns: [
        { field: "PrjAdrKy", title: "PrjAdrKy", width: "100px", hidden: true },
        { field: "PrjID", title: "Project ID", width: "100px" },
        { field: "PrjNm", title: "Project Name", width: "100px" },
        { field: "AdrID", title: "Address ID", width: "100px" },
        { field: "AdrNm", title: "Address Name", width: "100px" },
        ],

        editable: false
    });
}

function Save() {
    var PrjKy = $("#HdrSec1_CmbPrjNm").data("kendoComboBox").value();
    var AdrKy = $("#HdrSec1_CmbAdrNm").data("kendoComboBox").value();

    if (PrjKy == 1 || PrjKy == null || PrjKy == undefined || PrjKy == "") {
        alert("Select Project ID");
        return;
    }

    if (AdrKy == 1 || AdrKy == null || AdrKy == undefined || AdrKy == "") {
        alert("Select Address ID");
        return;
    }

    if (updateSelectArray.length != 0)
    {
        prjAdrKy = updateSelectArray.PrjAdrKy;
        alert("Update Function" + prjAdrKy);
        $.ajax({
            url: PrjAdr_UpdateWeb,
            dataType: "json",
            type: "POST",
            data: JSON.stringify({
                PrjAdrKy: prjAdrKy,
                PrjKy: PrjKy,
                AdrKy: AdrKy
            }),
            contentType: 'application/json; charset=utf-8',
            success: function (Data) {
                if (Data == true) {
                    alert("Save Successfully!");
                    
                    updateSelectArray = [];
                    ClearCombo();
                    Load();
                }
                else {
                    alert("Record Not Saved!")
                }
            }
        });


    }
    else {
        $.ajax({
            url: urlPrjAdr.PrjAdr_InsertWeb,
            dataType: "json",
            type: "POST",
            data: JSON.stringify({
                PrjKy: PrjKy,
                AdrKy: AdrKy
            }),
            contentType: 'application/json; charset=utf-8',
            success: function (Data) {
                if (Data == true) {
                    alert("Save Successfully!");
                    ClearCombo();
                    Load();
                    
                }
                else {
                    alert("Record Not Saved!")
                }
            }
        });
    }
    

}
function CancelGridItem() {
    ClearCombo();
    $("#PrjGrid").data('kendoGrid').dataSource.data([]);
}

function ClearCombo() {
    $("#HdrSec1_CmbPrjNm").data("kendoComboBox").value("");
    $("#HdrSec1_CmbPrjId").data("kendoComboBox").value("");
    $("#HdrSec1_CmbAdrNm").data("kendoComboBox").value("");
    $("#HdrSec1_CmbAdrId").data("kendoComboBox").value("");
}

//Grid Duble Click get the data from row
$("#PrjGrid").dblclick(function () {
    var gritrow = $("#PrjGrid").data("kendoGrid");
    var selectedItem = gritrow.dataItem(gritrow.select());
    updateSelectArray = selectedItem;
    $('#HdrSec1_CmbPrjId').data("kendoComboBox").value(selectedItem.PrjKy);
    $("#HdrSec1_CmbPrjNm").data("kendoComboBox").value(selectedItem.PrjKy);
    $('#HdrSec1_CmbAdrId').data("kendoComboBox").value(selectedItem.AdrKy);
    $('#HdrSec1_CmbAdrNm').data("kendoComboBox").value(selectedItem.AdrKy);

});