var PopUpFormGlblData = {
    ItmTrnKy: 1,
    UnitKy: 1,
    ChlidItmTrnKy: 1,
    LiNo: 1,
    Taskky:1,
    //AccessLvlKy: 1,
    //ConfiLvlKy: 1,
    //TrnKy: 1,
    //TodayDate: todayDate
}


function DetaillDefaultColumns() {
    var columnsDefine = [

    {
        field: "LiNo",
        title: "LiNo",
        width: "100px",
        hidden: "true",
        editor: function (container, options) {
            var model = options.model;
        }

    },
        {
            field: "ItmTrnKy",
            title: "ItmTrnKy",
            width: "100px",
            hidden: "true",
            editor: function (container, options) {
                var model = options.model;
            }

        },
        {
            field: "PrjKy",
            title: "PrjKy",
            width: "100px",
            hidden: "true",
            editor: function (container, options) {
                var model = options.model;
            }

        },
        {
            field: "ResrAdrKy",
            title: "ResrAdrKy",
            width: "150px",
            hidden: "true",
            editor: function (container, options) {
                var model = options.model;
            }
        },
        {
            field: "AdrId",
            title: "AdrId",
            width: "70px",
            editor: function (container, options) {
                var model = options.model;
            }
        },
        {
            field: "AdrNm",
            title: "AdrNm",
            width: "70px",
            editor: function (container, options) {
                var model = options.model;
            }
        },
        {
            field: "Qty",
            title: "Qty",
            width: "70px",
            editor: function (container, options) {
                var model = options.model;
            }

        },
        {
            field: "UnitKy",
            title: "UnitKy",
            width: "100px",
            hidden: "true",
            editor: function (container, options) {
                var model = options.model;
            }
        },
         {
             field: "ResUnit",
             title: "ResUnit",
             width: "100px",
             editor: function (container, options) {
                 var model = options.model;
             }
         },
    ];

    function showDetails(e) {
        e.preventDefault();
    }
    var gridNo = 3;
    var columnsFinal = setColumnProp(columnsDefine, 113540, '', 'FormGrd', gridNo);
}
function LoadGridWithColumnPropThree(columnsFinal, gridNo) {

    var dataSource = new kendo.data.DataSource({
        batch: true,
        transport: {
            read: {
                url: UrlDetailPopUp,
                dataType: "json"
            },
            parameterMap: function (options, operation) {

                if (operation == "read") {
                    return ({
                        'refItmTrnKy': PopUpFormGlblData.ItmTrnKy,
                    });
                }
            }

        },

        pageSize: 10,
        schema: {
            model: {
                id: "ResLeadKy",
                fields: //Relavent fields of the grid should be bind with following model items
                {
                    LiNo: { editable: true, nullable: false, type: "number" },
                    ItmTrnKy: { editable: true, nullable: false, type: "number" },
                    ResrAdrKy: { editable: true, nullable: false, type: "number" },
                    AdrId: { editable: true, nullable: false, type: "string" },
                    AdrNm: { editable: true, nullable: false, type: "string" },
                    Qty: { editable: true, nullable: false, type: "number" },
                    UnitKy: { editable: true, nullable: false, type: "number" },
                    ResUnit: { editable: true, nullable: false, type: "string" },

                }
            }
        }
    });

    $("#ResorcePopUp")
        .kendoGrid({
            dataSource: dataSource,
            sortable: true,
            autobind: true,
            navigatable: true,
            filterable: {
                mode: "row"
            },
            reorderable: true,
            scrollable: true,
            pageSize: 10,
            pageable: true,
            selectable: "row",
            resizable: true,
            dataBound: onDataBound,
            pageable: { refresh: true, pageSizes: [5, 10, 20, 50, 100] },
            columns: columnsFinal,

        });
}

$("#HdrSec1_NumResQty_Val").keypress(function (event) {

    var keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode == "13") {
        //  addNewRowToGrid();
        DetailSave();

    }

})

function DetailSave() {
    //var PopUpFormGlblData = {
    //    ItmTrnKy: 1,
    //    UnitKy: 1,
    var PrjKy = $("#HdrSec1_CmbProject_Cd").data("kendoComboBox").value();
    if (PrjKy == undefined || PrjKy == null || PrjKy == '') {
        PrjKy = 1;
    }
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!

    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    today = dd + '/' + mm + '/' + yyyy;
    var NewRecord = [];
    var updatedRecords = [];
    var deletedRecords = [];
    var ResrAdrKy = $("#HdrSec1_ResAdr_Cd").data('kendoComboBox').value();
    var Qty = $("#HdrSec1_NumResQty_Val").data("kendoNumericTextBox").value();
    if (PopUpFormGlblData.ChlidItmTrnKy < 10) {
        NewRecord = "[{\"EftvDt\" : " +
            "\"" +
            today +
            "\"" +
            ","
            + "\"RefItmTrnKy\" :  " + PopUpFormGlblData.ItmTrnKy + ","
            + "\"PrcsDetKy\" : " + PopUpFormGlblData.Taskky + ","
            //+ "\"PrcsDetKy\" : " + Tsk + ","
            +
            "\"AdrKy\"  : " + ResrAdrKy + "," +
            "\"RepAdrKy\"  : " + ResrAdrKy + "," +
            "\"PrjKy\"  : " + PrjKy + "," +
            "\"AccKy\" : " +
            "1" +
            "," +
            "\"UnitKy\" : " +
            PopUpFormGlblData.UnitKy +
            " ," +
            "\"TrnQty\" : " +
            Qty +
            "," +
            "\"Qty\" : " +
            Qty +
            "," +
            "\"LiNo\" :  1," +
            "\"isAct\" :  1" +
            "}]";
    } else {
        var updatedRecords = [];
        updatedRecords = "[{\"EftvDt\" : " +
            "\"" +
            today +
            "\"" +
            ","
            + "\"RefItmTrnKy\" :  " + PopUpFormGlblData.ItmTrnKy + ","
            + "\"ItmTrnKy\" : " + PopUpFormGlblData.ChlidItmTrnKy + "," +
             "\"PrcsDetKy\" : " + PopUpFormGlblData.Taskky + ","+
            "\"AdrKy\"  : " + ResrAdrKy + "," +
            "\"RepAdrKy\"  : " + ResrAdrKy + "," +
            "\"AccKy\" : " +
            "1" +
            "," +
            "\"UnitKy\" : " +
            PopUpFormGlblData.UnitKy +
            " ," +
            "\"TrnQty\" : " +
            Qty +
            "," +
            "\"Qty\" : " +
            Qty +
            "," +
            "\"LiNo\"  : " + PopUpFormGlblData.LiNo + "," +
            "\"PrjKy\"  : " + PrjKy + "," +
            "\"isAct\" :  1" +
            "}]";

    }

    InsertResourceDetailGrid(PrjKy, 1, Date, viewBag.OurCd, 'TrnTyp', NewRecord, updatedRecords, deletedRecords)
}

function InsertResourceDetailGrid(PrjKy, AdrKy, Date, OurCd, ConCd, NewRecord, updatedRecords, deletedRecords) {

  //  var ordKydata = PopUpFormGlblData.ItmTrnKy;




    $.ajax({
        url: urlTransactionInsertDetailGridInvoice,
        data: JSON.stringify({
            AccessLvlKy: FormGlblData.AccessLvlKy,
            updatedOrders: updatedRecords, deletedOrders: kendo.stringify(deletedRecords), newOrders: NewRecord,
            ObjKy: viewBag.ObjKy,
            PrjKy: PrjKy,
            AdrKy: AdrKy,
            FrmLocKy: 1,
            AccKy: 1,
            BUKY: 1,
            Date: Date,
            OurCd: OurCd,
            ConCd: ConCd,
            ordKydata: FormGlblData.TrnKy
        }),
        contentType: 'application/json; charset=utf-8',
        dataType: "Json",
        type: "POST",
        success: function (data) {
            //alert("Successfully saved!");
            ClearData();


        },
        error: function (e) {
            return false;
        }
    });

}

function UpDateRecord(PrjKy, AdrKy, Date, OurCd, ConCd, NewRecord, updatedRecords, deletedRecords) {

    var ordKydata = PopUpFormGlblData.ItmTrnKy;




    $.ajax({
        url: urlTransactionInsertDetailGridInvoice,
        data: JSON.stringify({
            AccessLvlKy: FormGlblData.AccessLvlKy,
            updatedOrders: updatedRecords, deletedOrders: kendo.stringify(deletedRecords), newOrders: NewRecord,
            ObjKy: viewBag.ObjKy,
            PrjKy: PrjKy,
            AdrKy: AdrKy,
            FrmLocKy: 1,
            AccKy: 1,
            BUKY: 1,
            Date: Date,
            OurCd: OurCd,
            ConCd: ConCd,
            ordKydata: FormGlblData.TrnKy
        }),
        contentType: 'application/json; charset=utf-8',
        dataType: "Json",
        type: "POST",
        success: function (data) {
            alert("Save Succsess");
            ClearData();


        },
        error: function (e) {
            return false;
        }
    });

}

function ClearData() {

    $("#HdrSec1_ResAdr_Cd").data('kendoComboBox').value("");
    $("#HdrSec1_ResAdr_Nm").data('kendoComboBox').value("");
    $("#HdrSec1_NumResQty_Val").data('kendoNumericTextBox').value("");
    try {

        $("#ResorcePopUp").data("kendoGrid").dataSource.data([]);
        $('#ResorcePopUp').data('kendoGrid').dataSource.read();
        $('#ResorcePopUp').data('kendoGrid').refresh();
        PopUpFormGlblData.ChlidItmTrnKy = 1;
        PopUpFormGlblData.LiNo = 1;
        PopUpFormGlblData.Taskky=1
    } catch (e) {

    }
}

$("#ResorcePopUp").on("dblclick", "tr.k-state-selected", function () {
    var id = ("#ResorcePopUp");
    var grid = $(id).data().kendoGrid;
    var selectedItem = grid.dataItem(grid.select());

    PopUpFormGlblData.ChlidItmTrnKy = selectedItem.ItmTrnKy;
    PopUpFormGlblData.LiNo = selectedItem.LiNo;
    var ResrAdrKy = selectedItem.ResrAdrKy;
    var Qty = selectedItem.Qty;
    $("#HdrSec1_ResAdr_Cd").data('kendoComboBox').value(ResrAdrKy);
    $("#HdrSec1_ResAdr_Nm").data('kendoComboBox').value(ResrAdrKy);
    $("#HdrSec1_ResAdr_Cd").data("kendoComboBox").trigger("change");
    $("#HdrSec1_NumResQty_Val").data('kendoNumericTextBox').value(selectedItem.Qty);

});
