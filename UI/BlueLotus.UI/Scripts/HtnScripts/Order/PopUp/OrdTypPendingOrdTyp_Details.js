
var chkedDetails_Transaction = [];

$(document).ready(function () {
    Details_LoadGridFindView_Form_FindFromPurReq();
});

function Details_LoadGridFindView_Form_FindFromPurReq() {

    var dataSource = new kendo.data.DataSource({

        batch: true,
        pageSize: 10,
        schema: {
            model: {
                id: "ItmTrnKy",
                fields: //Relavent fields of the grid should be bind with following model items
                {
                    ItmTrnKy: { editable: true, nullable: false, type: "number" },
                    FrmOrdDetKy: { editable: true, nullable: false, type: "number" },
                    LiNo: { editable: false, nullable: false, type: "number" },
                    isChk: { editable: true, nullable: false, type: "boolean", defaultValue: false },
                    ItmKy: { editable: false, nullable: false, type: "number" },
                    ItmNo: { editable: true, nullable: false, type: "string" },
                    ItmCd: { editable: false, nullable: false, type: "string" },
                    ItmNm: { editable: false, nullable: false, type: "string" },
                    Unit: { editable: false, nullable: false },
                    UnitKy: { editable: true, nullable: false, defaultValue: 1 },
                    Des: { editable: true, nullable: false, type: "string" },
                    POQty: { editable: true, nullable: false, type: "number" },
                    ReMnQty: { editable: true, nullable: false, type: "number" },
                    TrnQty: { editable: true, nullable: false },
                    TrnRate: { editable: true, nullable: false, type: "number" },
                    ReqDt: { editable: true, nullable: false, type: "string" },
                    SubTotal: { editable: true, nullable: false, type: "number" },
                    DisAmt: { editable: true, nullable: false, type: "number" },
                    DisPer: { editable: true, nullable: false, type: "number" },
                    VatAmt: { editable: true, nullable: false, type: "number" },
                    VAT: { editable: true, nullable: false, type: "number" },
                    WHT: { editable: true, nullable: false, type: "number" },
                    WHTAmt: { editable: true, nullable: false, type: "number" },
                    NBTAmt: { editable: true, nullable: false, type: "number" },
                    NBT: { editable: true, nullable: false, type: "number" },
                    SVatAmt: { editable: true, nullable: false, type: "number" },
                    SVAT: { editable: true, nullable: false, type: "number" },
                    Rem: { editable: true, nullable: false, type: "string" },
                    Anl3Ky: { editable: true, nullable: false, type: "number" },
                    Anl3Cd: { editable: true, nullable: false, type: "string" },
                    IsAct: { editable: true, nullable: false, type: "number", defaultValue: 1 },
                }
            }
        }
    });

    $("#Details_FindFromPOGrid").kendoGrid({
        dataSource: dataSource,
        autobind: true,

        navigatable: true,
        filterable: true,

        pageable: true,
        sortable: true,
        reorderable: true,
        columnMenu: true,

        selectable: "row",
        pageable: { refresh: true, pageSizes: [5, 10, 20, 50, 100] },

        columns: [
            { field: "ItmTrnKy", title: "ItmTrnKy", width: "100px", hidden: true },
            { field: "FrmOrdDetKy", title: "FrmOrdDetKy", width: "100px", hidden: true },
            { field: "LiNo", title: "Li No", width: "100px" },
            {
                field: "isChk", title: "isChk", width: "100px", attributes: { style: "text-align:center;" },
                template: '<input type="checkbox"  #= isChk? "checked=checked" : "" # class="isChk_Details_FindFromPOGrid_PinChecked"></input>',
            },
            { field: "ItmKy", title: "ItmKy", width: "100px", hidden: true },
            { field: "ItmNo", title: "Item No", width: "80px" },
            { field: "ItmCd", title: "Item Code", width: "150px" },
            { field: "ItmNm", title: "Item Name", width: "350px" },
            { field: "Unit", title: "Unit", width: "100px" },
            {
                field: "UnitKy", title: "Unit", width: "100px", hidden: true,
                editor: function (container, options) {
                    var model = options.model;
                }
            },
            {
                field: "POQty", title: "POQty", width: "150px",
                editor: function (container, options) {
                    var model = options.model;
                }
            },
            //ReMnQty
            {
                field: "ReMnQty", title: "ReMnQty", width: "150px",
                editor: function (container, options) {
                    var model = options.model;
                }
            },
            {
                field: "TrnQty", title: "Qty", width: "150px",
                //editor: function (container, options) {
                //    var model = options.model;
                //}
            },
            {
                field: "TrnRate", title: "Trn Rate", width: "150px", format: "{0:N2}",
                editor: function (container, options) {
                    var model = options.model;
                }
            },
            {
                field: "ReqDt", title: "Req Date", width: "150px",
                editor: function (container, options) {
                    var model = options.model;
                }
            },
            {
                field: "SubTotal", title: "SubTotal", width: "150px", format: "{0:N2}",
                editor: function (container, options) {
                    var model = options.model;
                }
            },
            {
                field: "DisPer", title: "Discount %", width: "150px", format: "{0:N2}",
                editor: function (container, options) {
                    var model = options.model;
                }
            },
            {
                field: "DisAmt", title: "Discount", width: "150px", format: "{0:N2}",
                editor: function (container, options) {
                    var model = options.model;
                }
            },
            {
                field: "VAT", title: "VAT %", width: "150px", hidden: false, format: "{0:N2}",
                editor: function (container, options) {
                    var model = options.model;
                }
            },
            {
                field: "VatAmt", title: "VAT Amount", width: "150px", format: "{0:N2}",
                editor: function (container, options) {
                    var model = options.model;
                }
            },
            {
                field: "WHT", title: "WHT %", width: "150px", hidden: false, format: "{0:N2}",
                editor: function (container, options) {
                    var model = options.model;
                }
            },
            {
                field: "WHTAmt", title: "WHT Amount", width: "150px", format: "{0:N2}",
                editor: function (container, options) {
                    var model = options.model;
                }
            },
            {
                field: "NBT", title: "NBT %", width: "150px", hidden: false, format: "{0:N2}",
                editor: function (container, options) {
                    var model = options.model;
                }
            },
            {
                field: "NBTAmt", title: "NBT Amount", width: "150px", hidden: false, format: "{0:N2}",
                editor: function (container, options) {
                    var model = options.model;
                }
            },
            {
                field: "SVAT", title: "SVAT %", width: "150px", format: "{0:N2}",
                editor: function (container, options) {
                    var model = options.model;
                }
            },
            {
                field: "SVatAmt", title: "SVAT Amount", width: "150px", format: "{0:N2}",
                editor: function (container, options) {
                    var model = options.model;
                }
            },
            {
                field: "Des", title: "Description", width: "350px",
                editor: function (container, options) {
                    var model = options.model;
                }
            },
            {
                field: "Rem", title: "Remarks", width: "250px",
                editor: function (container, options) {
                    var model = options.model;
                }
            },
            {
                field: "Anl3Ky", title: "IssuTo", width: "150px", hidden: true,
                editor: function (container, options) {
                }
            },
            {
                field: "Anl3Cd", title: "Analysis3", width: "150px",
                editor: function (container, options) {
                }
            },
            {
                field: "IsAct", title: "IsAct", width: "50px", hidden: true,
                editor: function (container, options) {
                    var model = options.model
                }
            },
            {
                width: "60px",
                template: kendo.template($("#command-template").html())
            }
        ],
        resizable: true,
        dataBinding: function () {
            record = (this.dataSource.page() - 1) * this.dataSource.pageSize();
        },
        editable: true
    });

}


function Details_GetHdrDetailFromPR(ordKy) {

    var ConCd = "OrdTyp"
    var OurCd = FormGlblData.OurCdFromFind;
    $.ajax({
        url: urlOrderOrdTypPendingOrdTypDetails_SelectWeb,
        data: JSON.stringify({

            ordKy: ordKy,
            ConCd: ConCd,
            OurCd: OurCd,
            ObjKy: viewBag.ObjKy
        }),
        contentType: 'application/json; charset=utf-8',
        dataType: "Json",
        type: "POST",
        success: function (data) {

            if (data.length > 0) {

                var i = 0;

                //========================================================= Grid Binding
                var id = ("#Details_FindFromPOGrid");
                $(id).data("kendoGrid").dataSource.filter(null);
                var grid = $(id).data("kendoGrid");
                grid.dataSource.data([]);

                for (i = 0; i < data.length; i++) {
                    $(id).data("kendoGrid").dataSource.add({
                        ItmTrnKy: data[i].OrdDetKy,
                        LiNo: data[i].LiNo,
                        ItmKy: data[i].ItmKy,
                        LiNo: data[i].LiNo,
                        ItmNo: data[i].ItmNo,
                        ItmCd: data[i].ItmCd,
                        ItmNm: data[i].ItmNm,
                        Unit: data[i].Unit,
                        UnitKy: data[i].UnitKy,
                        Des: data[i].Des,
                        DisAmt: data[i].DisAmt,
                        DisPer: data[i].DisPer,
                        Rem: data[i].Rem,
                        POQty: data[i].BaseQty,
                        ReMnQty: Number(data[i].BaseQty - data[i].OrdrdQty),
                        TrnQty: data[i].TrnQty,
                        TrnRate: data[i].TrnRate,
                        SubTotal: data[i].TrnRate * data[i].TrnQty,
                        VatAmt: data[i].VatAmt,
                        WHTAmt: data[i].WHTAmt,
                        NBTAmt: data[i].NBTAmt,
                        SVatAmt: data[i].SVatAmt,
                        VAT: data[i].VAT,
                        WHT: data[i].WHT,
                        NBT: data[i].NBT,
                        SVAT: data[i].SVAT,
                        Anl3Ky: data[i].Anl3Ky,
                        Anl3Cd: data[i].Anl3Cd,
                        ReqDt: data[i].ReqDt,
                        IsAct: data[i].isAct,
                        isChk: 0
                    });
                }
                $('#GetFromPO').data('kendoWindow').close();
            }
        },
        error: function (e) {
            return false;
        }
    });

    $("#GetFromPO_Details").show().kendoWindow({
        width: "900px",
        height: "550px",
        modal: true,
        title: "Tick Needed " + FormGlblData.OurCdFromFind + " Details Row Data"
    });
    $('#GetFromPO_Details').data('kendoWindow').center().open();
}

$('#Details_FindFromPOGrid').on('click', '.isChk_Details_FindFromPOGrid_PinChecked', function () {
    var checked = $(this).is(':checked');
    var grid = $('#Details_FindFromPOGrid').data().kendoGrid;
    var dataItem = grid.dataItem($(this).closest('tr'));
    if (dataItem != undefined) {
        dataItem.set('isChk', checked);
    }
});

function Details_SearchPR_OK() {

    comClearWithOutGrid();

    chkedDetails_Transaction = [];
    var id = ("#Details_FindFromPOGrid");
    var grid = $(id).data("kendoGrid");
    var gridData = grid.dataSource.data();
    for (var i = 0; i < gridData.length; i++) {
        if (gridData[i].isChk == 1) {
            chkedDetails_Transaction.push(gridData[i].ItmTrnKy);
        }
    }

    //alert(chkedDetails_Transaction);
    var stringJoinchkedDetails_Transaction = chkedDetails_Transaction.join();
    $.ajax({
        url: urlOrdDetCmpnMulti_OrdDetCmpn_SelectWeb,
        data: JSON.stringify({
            ObjKy: viewBag.ObjKy,
            OrdDetKys: stringJoinchkedDetails_Transaction
        }),
        contentType: 'application/json; charset=utf-8',
        dataType: "Json",
        type: "POST",
        success: function (data) {

            var id = ("#" + viewBag.OurCd);
            $(id).data("kendoGrid").dataSource.filter(null);
            var grid = $(id).data("kendoGrid");
            grid.dataSource.data([]);

            if (data.length > 0) {

                var i = 0;

                ////========================================================= Grid Binding
                
                for (i = 0; i < data.length; i++) {
                    $(id).data("kendoGrid").dataSource.add({
                        OrdNo: data[i].LiNo,
                        FrmOrdDetKy: 0,//data[i].OrdDetKy,
                        FrmOrdDetCmpnKy: data[i].OrdDetCmpnKy,
                        ItmKy: data[i].ItmKy,
                        LiNo: data[i].LiNo,
                        ItmCd: data[i].ItmCd,
                        ItmNm: data[i].ItmNm,
                        Unit: data[i].Unit,
                        UnitKy: data[i].TrnUnitKy,
                        Des: data[i].Des,
                        //DisAmt: data[i].DisAmt,
                        DisPer: data[i].DisPer,
                        Rem: data[i].Des,
                        POQty: data[i].Qty,//BaseQty,
                        ReMnQty: data[i].Qty,
                        TrnQty: data[i].Qty,
                        TrnRate: data[i].TrnRate,
                        SubTotal: data[i].TrnRate * data[i].Qty,
                        VatAmt: 0,//data[i].VatAmt,
                        WHTAmt: 0,//data[i].WHTAmt,
                        NBTAmt: 0,//data[i].NBTAmt,
                        SVatAmt: 0,//data[i].SVatAmt,
                        VAT: 0,//data[i].VAT,
                        WHT: 0,//data[i].WHT,
                        NBT: 0,//data[i].NBT,
                        SVAT: 0,//data[i].SVAT,
                        ReqDt: FormGlblData.TodayDate,//data[i].ReqDt,
                        IsAct: 1//data[i].isAct
                    });
                }
                $('#GetFromPO_Details').data('kendoWindow').close();
            }
        },
        error: function (e) {
            return false;
        }
    });
}