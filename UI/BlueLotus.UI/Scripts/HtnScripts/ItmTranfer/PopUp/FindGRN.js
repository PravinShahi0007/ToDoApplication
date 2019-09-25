$('#FindFormGridGRN .k-grid-content').height('14.8vh');
$("#HdrSec16_Dat_FF_FromDate_Val").width(140).kendoDatePicker({
    format: "dd/MM/yyyy",
    min: new Date(2009, 2, 31)
});

$("#HdrSec16_Dat_FF_Todt_Val").width(140).kendoDatePicker({
    format: "dd/MM/yyyy",
    min: new Date(2009, 2, 31)
});


function ProjectDataSourceForGRN() {
    var dataSource = new kendo.data.DataSource(
    {
        transport: {
            read: {
                url: urlFindGRN.GetProjectList,
                dataType: "json"
            }
        }

    });
    return dataSource;
}

function SupDatasource() {
    var dataSource = new kendo.data.DataSource(
    {
        transport: {
            read: {
                url: urlFindGRN.GetSuplist,
                dataType: "json"
            }
        }

    });
    return dataSource;
}

//function LoadComboFindForm1() {
//    $("#cmbSupGRN").kendoComboBox({
//        dataValueField: "AccKy",
//        dataTextField: "AccCd",
//        dataSource: SupDatasource(),
//        filter: "contains",
//        suggest: true,
//        placeholder: "Select a suplier.."
//    });

//    $("#cmbPrjectIdGRN").kendoComboBox({
//        dataValueField: "PrjKy",
//        dataTextField: "PrjID",
//        dataSource: ProjectDataSourceForGRN(),
//        filter: "contains",
//        suggest: true,
//        placeholder: "Select a From suplier.."
//    });

//}

//function LoadGridFindView1() {

//    var dataSource = new kendo.data.DataSource({
//        transport: {
//            read: {
//                dataType: "json"
//            },
//            //update: {
//            //    url: urlHome.UpdateToDo,
//            //    contentType: 'application/json; charset=utf-8',
//            //    dataType: "json",
//            //    type: "POST",
//            //    complete: function (e) {
//            //        alert("Updated successfully..!");
//            //        var grid = $("#grid").data("kendoGrid");
//            //        grid.dataSource.read();
//            //    }
//            //},
//            //destroy: {
//            //    url: urlHome.UpdateToDo,
//            //    contentType: 'application/json; charset=utf-8',
//            //    dataType: "json",
//            //    type: "POST",
//            //    data: { isAct: 0 },
//            //    complete: function (e) {
//            //        var grid = $("#grid").data("kendoGrid");
//            //        grid.dataSource.read();
//            //    }
//            //},
//            //create: {
//            //    url: urlHome.InsertToDo,
//            //    contentType: 'application/json; charset=utf-8',
//            //    dataType: "json",
//            //    type: "POST",
//            //    complete: function (e) {
//            //        alert("Saved successfully..!");
//            //        var grid = $("#grid").data("kendoGrid");
//            //        grid.dataSource.read();
//            //    }
//            //},
//            //parameterMap: function (options, operation) {
//            //    if (operation == "create" && options.models) {
//            //        return JSON.stringify({ 'todos': options.models }); // Parrameter name of the Controller Action method==> List<ToDoModel>todos
//            //    }
//            //    if (operation == "update" && options.models) {
//            //        return JSON.stringify({ 'todos': options.models }); // Parrameter name of the Controller Action method==> List<ToDoModel>todos

//            //    }
//            //    if (operation == "destroy" && options.models) {
//            //        return JSON.stringify({ 'todos': options.models }); // Parrameter name of the Controller Action method==> List<ToDoModel>todos

//            //    }
//            //    if (operation == "read") {
//            //        return ({

//            //        });
//            //    }
//            //}
//        },
//        batch: true,
//        pageSize: 10,
//        schema: {
//            model: {
//                id: "ItmKy",
//                fields: //Relavent fields of the grid should be bind with following model items
//                {
//                    Lino: { editable: false, nullable: false, type: "number" },
//                    TrnKy: { editable: false, nullable: false, type: "number" },
//                    Prefix: { editable: false, nullable: false, type: "number" },
//                    TrnNo: { editable: false, nullable: false, type: "number" },
//                    TrnDt: { editable: false, nullable: false, type: "date" },
//                    DocNo: { editable: false, nullable: false, type: "string" },
//                    AdrId: { editable: false, nullable: true, type: "string" },
//                    AdrNm: { editable: false, nullable: true, type: "number" },
//                    PrjId: { editable: false, nullable: false, type: "string" },
//                    PrjNm: { editable: false, nullable: false, type: "string" },
//                }
//            }
//        }
//    });

//    $("#FindFormGridGRN").kendoGrid({
//        dataSource: dataSource,
//        autobind: true,
//        height: "30vh",
//        navigatable: true,
//        filterable: {
//            mode: "row"
//        },

//        pageable: true,
//        sortable: true,
//        reorderable: true,
//        columnMenu: true,

//        selectable: "row",
//        pageable: { refresh: true, pageSizes: [5, 10, 20, 50, 100] },

//        columns: [
//             {
//                 field: "Lino", title: "LiNo", width: "50px",
//             },
//             {
//                 field: "TrnKy", title: "Ref #", width: "100px", hidden: true,
//             },
//             {
//                 field: "Prefix", title: "Prefix", width: "50px",

//             },
//             {
//                 field: "TrnNo", title: "TrnNo", width: "100px",
//             },
//             {
//               field: "TrnDt", title: "TrnDt", width: "100px"//, format: "{0: MM-dd-yyyy}",
//               //template: "#= kendo.toString(kendo.parseDate(TrnDt, 'yyyy-MM-dd'), 'MM/dd/yyyy') #",
//             },
//             {
//                field: "DocNo", title: "DocNo", width: "100px",
//             },
//             {
//                field: "AdrId", title: "AdrId", width: "100px",
//             },
//             {
//               field: "AdrNm", title: "AdrNm", width: "100px",
//             },
//             {
//               field: "PrjId", title: "PrjId", width: "100px",
//             },
//             {
//               field: "PrjNm", title: "PrjNm", width: "100px",
//             },
//        ],

//        resizable: true,

//        dataBinding: function () {
//            record = (this.dataSource.page() - 1) * this.dataSource.pageSize();
//        },

//        editable: true
//    });

//    $('#FindFormGridGRN .k-grid-content').height('14.8vh');
//}


//=============================================================

//Grid
function FindGridDefaultColumns() {
    var columnsDefine = [
        {
            field: "Lino", title: "LiNo", width: "50px",
            editor: function (container, options) {
                var model = options.model;
            }
        },
        {
            field: "TrnKy", title: "Ref #", width: "100px", hidden: true,
            editor: function (container, options) {
                var model = options.model;
            }
        },
        {
            field: "Prefix", title: "Prefix", width: "50px",
            editor: function (container, options) {
                var model = options.model;
            }
        },
        {
            field: "TrnNo", title: "TrnNo", width: "100px",
            editor: function (container, options) {
                var model = options.model;
            }
        },
        {
            field: "TrnDt", title: "TrnDt", width: "100px",
            editor: function (container, options) {
                var model = options.model;
            }
            //, format: "{0: MM-dd-yyyy}",
            //template: "#= kendo.toString(kendo.parseDate(TrnDt, 'yyyy-MM-dd'), 'MM/dd/yyyy') #",
        },
        {
            field: "DocNo", title: "DocNo", width: "100px",
            editor: function (container, options) {
                var model = options.model;
            }
        },
        {
            field: "AdrId", title: "AdrId", width: "100px",
            editor: function (container, options) {
                var model = options.model;
            }
        },
        {
            field: "AdrNm", title: "AdrNm", width: "100px",
            editor: function (container, options) {
                var model = options.model;
            }
        },
        {
            field: "PrjId", title: "PrjId", width: "100px",
            editor: function (container, options) {
                var model = options.model;
            }
        },
        {
            field: "PrjNm", title: "PrjNm", width: "100px",
            editor: function (container, options) {
                var model = options.model;
            }
        },

    ];
    var gridNo = 2;
    var columnsFinal = setColumnProp(columnsDefine, viewBag.ObjKy, '', 'FindFormGridGRN', gridNo);
}

function LoadGridWithColumnPropTwo(columnsFinal, gridNo) {
    var dataSource = new kendo.data.DataSource({
        batch: true,
        sort: ({ field: "LiNo", dir: "desc" }),
        pageSize: 10,
        schema: {
            model: {
                id: "ItmKy",
                fields: //Relavent fields of the grid should be bind with following model items
                {
                    Lino: { editable: false, nullable: false, type: "number" },
                    TrnKy: { editable: false, nullable: false, type: "number" },
                    Prefix: { editable: false, nullable: false, type: "number" },
                    TrnNo: { editable: false, nullable: false, type: "number" },
                    TrnDt: { editable: false, nullable: false, type: "date" },
                    DocNo: { editable: false, nullable: false, type: "string" },
                    AdrId: { editable: false, nullable: true, type: "string" },
                    AdrNm: { editable: false, nullable: true, type: "number" },
                    PrjId: { editable: false, nullable: false, type: "string" },
                    PrjNm: { editable: false, nullable: false, type: "string" },
                }
            }
        }
    });

    $("#FindFormGridGRN")
        .kendoGrid({
            dataSource: dataSource,
            columnMenu: true,
            sortable: true,
            autobind: true,
            navigatable: true,
            editable: true,
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
            height: "35vh"
        });
}

function onDataBound(e) {
    var id = ("#FindFormGridGRN");
    var grid = $(id).data("kendoGrid");
    var dataSource = grid.dataSource.data();
    for (var i = 0; i < dataSource.length; i++) {
        if (dataSource[i].IsAct == 0) {
            grid.tbody.find("tr[data-uid='" + dataSource[i].uid + "']").hide();
        }
    }
}



function SearchGRN() {
    $('#FindFormGridGRN').data("kendoGrid").dataSource.filter(null);
    var grid = $("#FindFormGridGRN").data("kendoGrid");
    grid.dataSource.data([]);

    var FrmDt = $("#HdrSec16_Dat_FF_FromDate_Val").val();
    if (FrmDt == undefined || FrmDt == "" || FrmDt == null) {
        var FrmDt = "1/1/1900";
    }

    var ToDt = $("#HdrSec16_Dat_FF_Todt_Val").val();
    if (ToDt == undefined || ToDt == "" || ToDt == null) {
        var ToDt = "1/1/2078";
    }

    var DocNo = $("#HdrSec16_Inpt_FF_DocNo_Val").val();
    if (DocNo == undefined || DocNo == "" || DocNo == null) {
        var DocNo = '';
    }

    var YurRefe = $("#HdrSec16_Inpt_FF_YurRef_Val").val();
    if (YurRefe == undefined || YurRefe == "" || YurRefe == null) {
        var YurRefe = '';
    }

    var AprStsKy = $("#HdrSec16_Cmb_FF_AprStatesAction_Nm").data('kendoComboBox').value();
    if (AprStsKy == "" || AprStsKy == undefined || AprStsKy == null) AprStsKy = 1;

    var Prefix = $("#HdrSec16_Cmb_FF_TrnNo_Cd").data('kendoComboBox').value();
    if (Prefix == "" || Prefix == undefined || Prefix == null) Prefix = 1;
    
    var TrnNo = $("#HdrSec16_Cmb_FF_TrnNo_Val").val();
    if (TrnNo == undefined || TrnNo == "" || TrnNo == null) {
        var TrnNo = '';
    }
    
    var AdrKy = $("#HdrSec16_Cmb_FF_HdrAdr_Cd").data('kendoComboBox').value();
    if (AdrKy == "" || AdrKy == undefined || AdrKy == null) AdrKy = 1;

    var FrmLocKy = $("#HdrSec16_Cmb_FF_FrmLoc_Cd").data('kendoComboBox').value();
    if (FrmLocKy == "" || FrmLocKy == undefined || FrmLocKy == null) FrmLocKy = 1;

    var ToLocKy = $("#HdrSec16_Cmb_FF_ToLoc_Cd").data('kendoComboBox').value();
    if (ToLocKy == "" || ToLocKy == undefined || ToLocKy == null) ToLocKy = 1;

    var FrmPrjKy = $("#HdrSec16_Cmb_FF_FrmPrj_Cd").data('kendoComboBox').value();
    if (FrmPrjKy == undefined || FrmPrjKy == "" || FrmPrjKy == null) {
        var FrmPrjKy = 1;
    }

    var ToPrjKy = $("#HdrSec16_Cmb_FF_ToPrj_Cd").data('kendoComboBox').value();
    if (ToPrjKy == undefined || ToPrjKy == "" || ToPrjKy == null) {
        var ToPrjKy = 1;
    }

    var isPrinted = ($("#HdrSec16_Chkbox_FF_IsRec_Val").is(':checked')) ? 1 : 0;
    var isRecurrence = ($("#HdrSec16_Chkbox_FF_IsPrnt_Val").is(':checked')) ? 1 : 0;
    

    var ConCd = "TrnTyp";
    var OurCd = viewBagFindGRN.OurCd;
    if (data_NewFromOrdTypAndTrnTyp.OurCd == "RMI") {
        OurCd = "RMI";
    }



    $.ajax({
        url: urlFindGRN.GetGRNList,
        data: JSON.stringify({ 
            FrmDt: FrmDt,
            ToDt: ToDt,
            DocNo: DocNo,
            YurRef: YurRefe,
            AprStsKy: AprStsKy,
            Prefix: Prefix,
            TrnNo: TrnNo,
            AdrKy: AdrKy,
            FrmLocKy: FrmLocKy,
            ToLocKy: ToLocKy,
            FrmPrjKy: FrmPrjKy,
            ToPrjKy: ToPrjKy,
            isRecur: isRecurrence,
            isPrinted: isPrinted,
            ConCd: ConCd,
            OurCd: OurCd,
            ObjKy: viewBag.ObjKy
        }),
        contentType: 'application/json; charset=utf-8',
        dataType: "Json",
        type: "POST",
        success: function (data) {

            $('#FindFormGridGRN').data("kendoGrid").dataSource.filter(null);
            var grid = $("#FindFormGridGRN").data("kendoGrid");
            grid.dataSource.data([]);
            for (i = 0; i < data.length; i++) {
                $("#FindFormGridGRN").data("kendoGrid").dataSource.add({ Lino: data[i].Lino, TrnKy: data[i].TrnKy, Prefix: data[i].Prefix, TrnNo: data[i].TrnNo, TrnDt: data[i].TrnDt, DocNo: data[i].DocNo, AdrId: data[i].AdrId, AdrNm: data[i].AdrNm, PrjId: data[i].PrjId, PrjNm: data[i].PrjNm });
            }

        },
        error: function (e) {
            return false;
        }
    });

}

function OkGRN() {

    var grid = $('#FindFormGridGRN').data().kendoGrid;
    var selectedItem = grid.dataItem(grid.select());
    var TrnKy = selectedItem.TrnKy;
    if (TrnKy != "" || TrnKy != undefined || TrnKy != null) {
        //GetHdrDetailGrnFrmFind(TrnKy);
        $("#HdrSec1_InptTrnNo_FrmTrnKy_Val").val(TrnKy);
        $('#FindFormGRN').data('kendoWindow').close();
        FormGlblData.ISNeworUpdateTranction = 0;
        FormGlblData.IsRecurrenceGetfromFind = 1;
        FormGlblData.isSaveButtonClicked = 0;
        ComClearFunction();
        SetTrnDate(); // recreate and assign min max value
        Set_Navigation("FindFormGridGRN", TrnKy);

        try {
            SetTrnHdrApr_LatestState(TrnKy, FormGlblData.TrnTypKy);
        } catch (ex) {

        }
        
    } else {
        alert("please Select Any Trancsaction");
    }
}

function btnCalGRN() {
    $('#FindFormGRN').data('kendoWindow').close();
}

function Clear() {
    ClearFind();
}

function ClearFind() {
    //var grid = $("#FindFormGridGRN").data("kendoGrid");
    //grid.dataSource.data([]);
    $("#HdrSec16_Dat_FF_Todt_Val").val(null);
    $("#HdrSec16_Inpt_FF_OrdNo_Val").val(null);
    $("#HdrSec16_Inpt_FF_DocNo_Val").val(null);
    $("#HdrSec16_Inpt_FF_YurRef_Val").val(null);
    $("#HdrSec16_Cmb_FF_AprStatesAction_Nm").data('kendoComboBox').value(null);
    $("#HdrSec16_Cmb_FF_TrnNo_Cd").data('kendoComboBox').value(null);
    $("#HdrSec16_Cmb_FF_TrnNo_Val").val(null);
    $("#HdrSec16_Cmb_FF_HdrAdr_Cd").data('kendoComboBox').value(null);
   // $("#HdrSec16_Cmb_FF_HdrAdr_Nm").data('kendoComboBox').value(null);
    $("#HdrSec16_Cmb_FF_FrmLoc_Cd").data('kendoComboBox').value(null);
   // $("#HdrSec16_Cmb_FF_FrmLoc_Nm").data('kendoComboBox').value(null);
    $("#HdrSec16_Cmb_FF_ToLoc_Cd").data('kendoComboBox').value(null);
    //$("#HdrSec16_Cmb_FF_ToLoc_Nm").data('kendoComboBox').value(null);
    $("#HdrSec16_Cmb_FF_FrmPrj_Cd").data('kendoComboBox').value(null);
   // $("#HdrSec16_Cmb_FF_FrmPrj_Nm").data('kendoComboBox').value(null);
    $("#HdrSec16_Cmb_FF_ToPrj_Cd").data('kendoComboBox').value(null);
    //$("#HdrSec16_Cmb_FF_ToPrj_Nm").data('kendoComboBox').value(null);
    $('#HdrSec16_Chkbox_FF_IsRec_Val').attr('checked', false);
    $('#HdrSec16_Chkbox_FF_IsPrnt_Val').attr('checked', false);

}

$('#FindFormGridGRN').dblclick(function () {
    OkGRN();
});

