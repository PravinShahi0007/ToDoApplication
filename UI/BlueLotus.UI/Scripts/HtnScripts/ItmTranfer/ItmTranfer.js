
function setHdrSectionPropFun() {

    // ---------- Set ObjProperties
    setHdrSectionProp('', viewBag.ObjKy, '', 'HdrSec1');
    setHdrSectionProp('', viewBag.ObjKy, '', 'HdrSec2');
    setHdrSectionProp('', viewBag.ObjKy, '', 'HdrSec3');
    setHdrSectionProp('', viewBag.ObjKy, '', 'HdrSec4');
    setHdrSectionProp('', viewBag.ObjKy, '', 'HdrSec5');
    setHdrSectionProp('', viewBag.ObjKy, '', 'HdrSec6');
    setHdrSectionProp('', viewBag.ObjKy, '', 'HdrSec7');
    setHdrSectionProp('', viewBag.ObjKy, '', 'HdrSec8');
    setHdrSectionProp('', viewBag.ObjKy, '', 'HdrSec9');
    setHdrSectionProp('', viewBag.ObjKy, '', 'HdrSec10');
    setHdrSectionProp('', viewBag.ObjKy, '', 'HdrSec16');


    SetHandlingEnterKeyEvent('', viewBag.ObjKy);
    //$("#HdrSec1_InptDocNo_Val").focus();
    //-- Set Foucs event based on ObjMas and UsrObj
    SetFirstFocusObj();
    HideSectnFrmtGrp();
}

function AdrByAccDatasource(AccKy) {
    var data = new Array();
    $.ajax({
        url: urlOrder.GetAdrByAcc,
        dataType: "json",
        type: "POST",
        data: JSON.stringify({
            AccKy: AccKy
        }),
        contentType: 'application/json; charset=utf-8',
        success: function (list) {
            if (list.length == 1) {
                $("#HdrSec2_CmbAdr_Cd").data("kendoComboBox").value(null);
                //$("#HdrSec2_CmbAdr_Nm").data("kendoComboBox").value(null);
                for (i = 0; i < list.length; i++) {
                    var AdrKy = list[0].AdrKy;
                    var AdrNm = list[0].AdrNm;
                    var AdrID = list[0].AdrID;
                    $("#HdrSec2_CmbAdr_Cd").data("kendoComboBox").value(AdrKy);
                    $("#HdrSec2_CmbAdr_Cd").data("kendoComboBox").text(AdrID);
                  //  $("#HdrSec2_CmbAdr_Nm").data("kendoComboBox").value(AdrKy);
                    //$("#HdrSec2_CmbAdr_Nm").data("kendoComboBox").text(AdrNm);

                }
                //  alert("Cannot find the item !");
            } else if (list.length == 2) {
                $("#HdrSec2_CmbAdr_Cd").data("kendoComboBox").setDataSource(list);
                $("#HdrSec2_CmbAdr_Cd").data("kendoComboBox").value(null);
                //$("#HdrSec2_CmbAdr_Nm").data("kendoComboBox").setDataSource(list);
                //$("#HdrSec2_CmbAdr_Nm").data("kendoComboBox").value(null);
                for (i = 0; i < list.length; i++) {
                    var AdrKy = list[1].AdrKy;
                    var AdrNm = list[1].AdrNm;
                    var AdrID = list[1].AdrID;
                    $("#HdrSec2_CmbAdr_Cd").data("kendoComboBox").value(AdrKy);
                    $("#HdrSec2_CmbAdr_Cd").data("kendoComboBox").text(AdrID);
                   // $("#HdrSec2_CmbAdr_Nm").data("kendoComboBox").value(AdrKy);
                    //$("#HdrSec2_CmbAdr_Nm").data("kendoComboBox").text(AdrNm);
                }
            }
            else {
                $("#HdrSec2_CmbAdr_Cd").data("kendoComboBox").value(null);
               // $("#HdrSec2_CmbAdr_Nm").data("kendoComboBox").value(null);
                for (i = 0; i < list.length; i++) {
                    $("#HdrSec2_CmbAdr_Cd").data("kendoComboBox").setDataSource(list);
                   // $("#HdrSec2_CmbAdr_Nm").data("kendoComboBox").setDataSource(list);
                }
            }

        },
        error: function (e) {

        }

    });
}

function GetAdrKyByAccKy(AccKy) {
    $.ajax({
        url: urlTransaction.GetAdrKy,
        data: JSON.stringify({
            AccKy: AccKy
        }),
        contentType: 'application/json; charset=utf-8',
        dataType: "Json",
        type: "POST",
        success: function (data) {
            for (i = 0; i < data.length; i++) {
                var AdrKy = data[0].AdrKy;
                $("#HdrSec2_CmbAdr_Cd").data("kendoComboBox").value(AdrKy);
                //$("#HdrSec2_CmbAdr_Nm").data("kendoComboBox").value(AdrKy);
            }
        },
        error: function (e) {
            return false;
        }
    });
}

function GetAccKyByAdrKy(AdrKy) {
    $.ajax({
        url: urlTransaction.GetAccKy,
        data: JSON.stringify({
            AdrKy: AdrKy
        }),
        contentType: 'application/json; charset=utf-8',
        dataType: "Json",
        type: "POST",
        success: function (data) {
            for (i = 0; i < data.length; i++) {
                var AccKy = data[0].AccKy;
              //  $("#HdrSec2_CmbAcc_Nm").data("kendoComboBox").value(AccKy);
                $("#HdrSec2_CmbAcc_Cd").data("kendoComboBox").value(AccKy);
            }
        },
        error: function (e) {
            return false;
        }
    });
}

function Load_ItmTransferGrid() {
    var ItmTransferColumn = [

            { field: "ItmTrnKy", title: "Ref ##", width: "100px", hidden: true },
            { field: "ToItmTrnKy", title: "Ref #", width: "100px", hidden: true },
            { field: "FrmItmTrnKy", title: "Ref #", width: "100px", hidden: true },
            { field: "OrdDetKy", title: "OrdDetKy", width: "100px", hidden: true },
            { field: "LiNo", title: "Ref #", width: "100px" },
            { field: "ItmKy", title: "Ref #", width: "100px", hidden: true },
            { field: "ItmCd", title: "Item Cd", width: "150px" },
            { field: "ItmNm", title: "Item Name", width: "150px" },
            { field: "Unit", title: "Unit", width: "100px" },
            {
                field: "UnitKy", title: "Unit", width: "100px", hidden: true,
                editor: function (container, options) { var model = options.model; }
            },
            {
                field: "POQty", title: "POQty", width: "150px",
                editor: function (container, options) {
                    var model = options.model;
                }
            },
            {
                field: "ReMnQty", title: "ReMnQty", width: "150px",
                editor: function (container, options) {
                    var model = options.model;
                }
            },
            {
                field: "TrnQty", title: "Qty", width: "150px",
                editor: function (container, options) { var model = options.model; }
            },
             { field: "AvlStk", title: "AvlStk", width: "100px" },
            {
                field: "TrnRate", title: "Rate", width: "150px", format: "{0:N2}",
                editor: function (container, options) { var model = options.model; }
            },
            {
                field: "SubTotal", title: "SubTotal", width: "150px", format: "{0:N2}",
                editor: function (container, options) { var model = options.model; }
            },
            {
                field: "DisPer", title: "Discount %", width: "150px", format: "{0:N2}",
                editor: function (container, options) { var model = options.model; }
            },
            {
                field: "DisAmt", title: "Discount", width: "150px", format: "{0:N2}",
                editor: function (container, options) { var model = options.model; }
            },
            {
                field: "VAT", title: "VAT %", width: "150px", hidden: false, format: "{0:N2}",
                editor: function (container, options) { var model = options.model; }
            },
            {
                field: "VatAmt", title: "VAT Amount", width: "150px", format: "{0:N2}",
                editor: function (container, options) { var model = options.model; }
            },
            {
                field: "WHT", title: "WHT %", width: "150px", hidden: false, format: "{0:N2}",
                editor: function (container, options) { var model = options.model; }
            },
            {
                field: "WHTAmt", title: "WHT Amount", width: "150px", format: "{0:N2}",
                editor: function (container, options) { var model = options.model; }
            },
            {
                field: "NBT", title: "NBT %", width: "150px", hidden: false, format: "{0:N2}",
                editor: function (container, options) { var model = options.model; }
            },
            {
                field: "NBTAmt", title: "NBT Amount", width: "150px", hidden: false, format: "{0:N2}",
                editor: function (container, options) { var model = options.model; }
            },
            {
                field: "SVAT", title: "SVAT %", width: "150px", format: "{0:N2}",
                editor: function (container, options) { var model = options.model; }
            },
            {
                field: "SVatAmt", title: "SVAT Amount", width: "150px", format: "{0:N2}",
                editor: function (container, options) { var model = options.model; }
            },
            { field: "Des", title: "Description", width: "150px" },
            { field: "Rem", title: "Remarks", width: "150px" },
            {
                field: "Anl3Ky", title: "IssuTo", width: "150px", hidden: true,
                editor: function (container, options) { }
            },
            {
                field: "Anl3Cd", title: "Analysis3", width: "150px",
                editor: function (container, options) { }
            },
            {
                field: "isApr", title: "isApr", width: "50px", hidden: true,
                editor: function (container, options) { }
            },
            {
                field: "PrcsDetKy", title: "TaskID", width: "50px", hidden:true,
            },
            {
                field: "isAct", title: "IsAct", width: "50px", hidden: true,
                editor: function (container, options) { }
            },
            { field: "PreItmTrnKy", title: "Ref #", width: "100px", hidden: true },
             { field: "IsAlwMinusStk", title: "IsAlwMinusStk", width: "100px" },        
            { width: "60px", template: kendo.template($("#command-template").html()) },

    ];

    var gridNo = 1;
    var FinalItmTransferColumn = setColumnProp(ItmTransferColumn, viewBag.ObjKy, '', 'FormGrd', gridNo);
}

function LoadGridWithColumnProp(columnsFinal, gridNo) {
    if (gridNo == 1) {

        var dataSource = new kendo.data.DataSource({
            transport: {
                read: {
                    dataType: "json"
                }
            },
            batch: true,
            sort: ({ field: "LiNo", dir: "desc" }),// "asc"
            pageSize: 10,
            schema: {
                model: {
                    id: "ItmTrnKy",
                    fields: //Relavent fields of the grid should be bind with following model items
                    {
                        FrmItmTrnKy: { editable: true, nullable: false, type: "number" },
                        ToItmTrnKy: { editable: true, nullable: false, type: "number" },
                        LiNo: { editable: false, nullable: false, type: "number" },
                        ItmKy: { editable: false, nullable: false, type: "number" },
                        OrdDetKy: { editable: false, nullable: false, type: "number" },

                        ItmCd: { editable: false, nullable: false, type: "string" },
                        ItmNm: { editable: false, nullable: false, type: "string" },
                        Unit: { editable: false, nullable: false },
                        UnitKy: { editable: true, nullable: false },
                        Des: { editable: true },
                        PrcsDetKy: { editable: true, type: "number"},
                        POQty: { editable: true, nullable: false, type: "number" },
                        ReMnQty: { editable: true, nullable: false, type: "number" },
                        TrnQty: { editable: true, nullable: false },
                        AvlStk: { editable: true, nullable: false },
                        TrnRate: { editable: true, nullable: false, type: "number" },
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
                        Rem: { editable: true },
                        Anl3Ky: { editable: true, nullable: false, type: "number" },
                        Anl3Cd: { editable: true, nullable: false, type: "string" },
                        isApr: { editable: true, nullable: false, type: "number" },
                        isAct: { editable: true, nullable: false, type: "number" },
                        PreItmTrnKy: { editable: true, nullable: false, type: "number" },
                        IsAlwMinusStk: { editable: true, nullable: false, type: "number" },
                    }
                }
            }
        });
        var id = ("#" + viewBag.OurCd);
        $(id).kendoGrid({
            dataSource: dataSource,
            autobind: true,
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
            dataBound: onDataBound,
            dataBinding: function () {
                record = (this.dataSource.page() - 1) * this.dataSource.pageSize();
            },
            editable: true,

        });

        function CaluculateSubTotal() {
            var newSubTValue = 0;
            $.each(dataSource.data(), function (index, model) {
                newSubTValue += model.get("SubTotal");
            });
            SetTotalSubTotalVal(newSubTValue);
        }

        function SetTotalSubTotalVal(newSubTValue) {
            var newSubTValueDoble = (newSubTValue).toFixed(2);

            $("#HdrSec4_InptSubTot_Val").data("kendoNumericTextBox").value(newSubTValueDoble);
        }
        function CaluculateDisAmt() {
            var newDisTValue = 0;
            $.each(dataSource.data(), function (index, model) {
                newDisTValue += model.get("DisAmt");
            });
            SetTotalDisAmtVal(newDisTValue);
        }
        function SetTotalDisAmtVal(newDisTValue) {
            var newDisTValueDoble = (newDisTValue).toFixed(2);

            $("#HdrSec4_InptDisc_Val").data("kendoNumericTextBox").value(newDisTValueDoble);
        }
        function CaluculateVatAmt() {

            var newVatTValue = 0;
            $.each(dataSource.data(), function (index, model) {
                newVatTValue += model.get("VatAmt");
            });
            SetTotalVatAmtVal(newVatTValue);
        }
        function SetTotalVatAmtVal(newVatTValue) {
            var newVatTValueDoble = (newVatTValue).toFixed(2);

            $("#HdrSec4_InptVat_Val").data("kendoNumericTextBox").value(newVatTValueDoble);
        }
        function CaluculateWHTAmt() {

            var newWhtTValue = 0;
            $.each(dataSource.data(), function (index, model) {
                newWhtTValue += model.get("WHTAmt");
            });
            SetTotalWHTAmtVal(newWhtTValue);
        }
        function SetTotalWHTAmtVal(newWhtTValue) {
            var newWhtTValueDoble = (newWhtTValue).toFixed(2);

            $("#HdrSec4_InptWHT_Val").data("kendoNumericTextBox").value(newWhtTValueDoble);
        }
        function CaluculateNBTAmt() {

            var newNbtTValue = 0;
            $.each(dataSource.data(), function (index, model) {
                newNbtTValue += model.get("NBTAmt");
            });
            SetTotalNBTAmtVal(newNbtTValue);
        }
        function SetTotalNBTAmtVal(newNbtTValue) {
            var newNbtTValueDoble = (newNbtTValue).toFixed(2);

            $("#HdrSec4_InptNBT_Val").data("kendoNumericTextBox").value(newNbtTValueDoble);
        }
        function CaluculateSVATAmt() {

            var newSvatTValue = 0;
            $.each(dataSource.data(), function (index, model) {
                newSvatTValue += model.get("SVatAmt");
            });
            SetTotalSVatAmtVal(newSvatTValue);
        }
        function SetTotalSVatAmtVal(newSvatTValue) {
            var newSvatTValueDoble = (newSvatTValue).toFixed(2);

            $("#HdrSec4_InptSVAT_Val").data("kendoNumericTextBox").value(newSvatTValueDoble);
        }



        function CaluculateTotal() {

            var subtotal = $("#HdrSec4_InptSubTot_Val").data("kendoNumericTextBox").value();
            var Discount = $("#HdrSec4_InptDisc_Val").data("kendoNumericTextBox").value();
            var NBT = $("#HdrSec4_InptNBT_Val").data("kendoNumericTextBox").value();
            var Vat = $("#HdrSec4_InptVat_Val").data("kendoNumericTextBox").value();
            var WHT = $("#HdrSec4_InptWHT_Val").data("kendoNumericTextBox").value();
            var Svat = $("#HdrSec4_InptSVAT_Val").data("kendoNumericTextBox").value();

            if (subtotal == null) {
                subtotal = 0;
            }
            if (Discount == null) {
                Discount = 0;
            }
            if (NBT == null) {
                NBT = 0;
            }
            if (Vat == null) {
                Vat = 0;
            }

            if (WHT == null) {
                WHT = 0;
            }
            if (Svat == null) {
                Svat = 0;
            }


            var TotalVal = Number(subtotal) + Number(NBT) + Number(Vat) + Number(WHT) + Number(Svat);
            var FinalTotal = TotalVal - Number(Discount);
            var FinalTotalDoble = (FinalTotal).toFixed(2);
            var FinalTotalDoubleSeperate = FinalTotalDoble.toLocaleString();

            $("#HdrSec4_InptTotal_Val").data("kendoNumericTextBox").value(FinalTotalDoubleSeperate);
        }


    }
}


function LoadGridView1(PrjKy) {
}

function sendPrjKy() {
    $.ajax({
        type: "POST",
        dataType: "json",
        url: urlTransaction.sendPrjKy,
        data: {
            strPrjKy: $("#HdrSec2_CmbFrmPrj_Cd").val(),

        },
        success: function (data) {

        }
    })
}

function Remember() {
    //alert("here..");
    var grid = $("#grid").data("kendoGrid");
    dataView = grid.dataSource.view();

    var rowObjs = grid.tbody[0].rows;
    var today = new Date();

    var d = new Date();

    var month = d.getMonth() + 1;
    var day = d.getDate();

    var output = (day < 10 ? '0' : '') + day + '/' + (month < 10 ? '0' : '') + month + '/' + d.getFullYear();

    for (var i = 0; i < dataView.length; i++) {
        var row = rowObjs[i];
        if (dataView[i].NxtActDt === dt) {


        }
    }
}

function GridOnDataBinding(arg) {
    record = (this.dataSource.page() - 1) * this.dataSource.pageSize();
}

function CallItmNmWindow() {
    $("#ResourceAnalysisWinForChild").show().kendoWindow({
        width: "1000px",
        height: "500px",
        modal: true,
        title: "Find"
    });
    $('#ResourceAnalysisWinForChild').data('kendoWindow').center().open();
}

function GetInvoiceGridDetail(ordKy) {
    $.ajax({
        url: urlInvoice.GetGridInvoiceDetail,
        data: JSON.stringify({
            ordKy: ordKy
        }),
        contentType: 'application/json; charset=utf-8',
        dataType: "Json",
        type: "POST",
        success: function (data) {

            for (i = 0; i < data.length; i++) {

                var TrnNo = data[0].TrnNo;
                $("#OrdNo1").val(TrnNo);
                var PrefixTrnNo = data[0].PrefixTrnNo;
                $("#PrefixOrdNo1").val(PrefixTrnNo);
                var TrnTypKy = data[0].TrnTypKy;
                $("#OrdTypKy1").val(TrnTypKy);
                var TrnPreFixKy = data[0].TrnPreFixKy;
                $("#OrdPrefixKy1").val(TrnPreFixKy);
                var TrnKy = data[0].TrnKy;
                $("#OrdKy1").val(TrnKy);

                var LocKy = data[0].LocKy;
                $("#cmbFmLocId").data("kendoComboBox").value(LocKy);
                $("#cmbFmLocNm").data("kendoComboBox").value(LocKy);
                var SlsAccKy = data[0].SlsAccKy;
                $("#cmbSlsACId").data("kendoComboBox").value(SlsAccKy);
                $("#cmbSlsACCd").data("kendoComboBox").value(SlsAccKy);

                var AccKy = data[0].AccKy;
                $("#HdrSec2_CmbAcc_Cd").data("kendoComboBox").value(AccKy);
                //$("#HdrSec2_CmbAcc_Nm").data("kendoComboBox").value(AccKy);

                var TrnDt = data[0].TrnDt;
                $('#HdrSec1_DatPicDate_Val').data("kendoDatePicker").value(TrnDt);

                var PmtTrmKy = data[0].PmtTrmKy;
                $("#HdrSec3_CmbPmtTerm_Cd").data("kendoComboBox").value(PmtTrmKy);

                var TrnCrnKy = data[0].TrnCrnKy;
                $("#HdrSec3_CmbCurrency_Cd").data("kendoComboBox").value(TrnCrnKy);


                var ExRate = data[0].TrnExRate;

                $("#HdrSec3_InptExRate_Val").val(ExRate);


                var Yurref = data[0].YurRef;
                $("#HdrSec1_InptYurRef_Val").val();

                var YurRefDate = data[0].YurRefDt;

                $("#YurRefDate").val(YurRefDate);
                var DocNo = data[0].DocNo;
                $("#HdrSec1_InptDocNo_Val").val(DocNo);

                var disamt = data[0].Dsicount;
                $("#HdrSec4_InptDisc_Val").data("kendoNumericTextBox").value(disamt);
                var NBT = data[0].NBT;
                $("#HdrSec4_InptNBT_Val").data("kendoNumericTextBox").value(NBT);
                var Vat = data[0].Vat;
                $("#HdrSec4_InptVat_Val").data("kendoNumericTextBox").value(Vat);
                var Wht = data[0].Wht;
                $("#HdrSec4_InptWHT_Val").data("kendoNumericTextBox").value(Wht);
                var Svat = data[0].Svat;
                $("#HdrSec4_InptSVAT_Val").data("kendoNumericTextBox").value(Svat);
                var Total = data[0].Total;
                $("#HdrSec4_InptTotal_Val").data("kendoNumericTextBox").value(Total);
                var SubTotal = Number(data[0].Total) - Number(data[0].Svat) - Number(data[0].Wht) - Number(data[0].Vat) - Number(data[0].NBT) + Number(data[0].Dsicount);
                $("#HdrSec4_InptSubTot_Val").data("kendoNumericTextBox").value(SubTotal);


                GetInvoiceItemsDetail(ordKy);


            }

        },
        error: function (e) {
            return false;
        }
    });


}

function GetInvoiceItemsDetail(ordKy) {
    $.ajax({
        url: urlInvoice.GetInvoiceItemsDetail,
        data: JSON.stringify({

            ordKy: ordKy,
        }),
        contentType: 'application/json; charset=utf-8',
        dataType: "Json",
        type: "POST",
        success: function (data) {
            var id = ("#" + viewBag.OurCd);
            $(id).data("kendoGrid").dataSource.filter(null);
            var grid = $(id).data("kendoGrid");
            grid.dataSource.data([]);
            for (i = 0; i < data.length; i++) {

                var PrjKy = data[0].PrjKy;
                $("#cmbPrjId").data("kendoComboBox").value(PrjKy);
                $("#cmbPrjNm").data("kendoComboBox").value(PrjKy);


                var LocKy2 = data[0].LocKy;
                $("#cmbFmLocId").data("kendoComboBox").value(LocKy2);
                $("#cmbFmLocNm").data("kendoComboBox").value(LocKy2);

                var AdrKy1 = data[0].AdrKy;
                $("#HdrSec2_CmbAdr_Cd").data("kendoComboBox").value(AdrKy1);
               // $("#HdrSec2_CmbAdr_Nm").data("kendoComboBox").value(AdrKy1);

                var id = ("#" + viewBag.OurCd);
                $(id).data("kendoGrid").dataSource.add({
                    ItmTrnKy: data[i].ItmTrnKy,
                    LiNo: data[i].LiNo,
                    ItmKy: data[i].ItmKy,

                    ItmCd: data[i].ItmCd,
                    ItmNm: data[i].ItmNm,
                    Unit: data[i].Unit,
                    UnitKy: data[i].UnitKy,
                    Des: data[i].Des,
                    DisAmt: data[i].DisAmt,
                    DisPer: data[i].DisPer,
                    Rem: data[i].Rem,
                    TrnQty: data[i].TrnQty,
                    TrnRate: data[i].TrnRate,
                    SubTotal: data[i].TrnRate * data[i].TrnQty,
                    VatAmt: data[i].VatAmt,
                    WHTAmt: data[i].WHTAmt,
                    NBTAmt: data[i].NBTAmt,
                    SVatAmt: data[i].SVatAmt,
                    VAT: (data[i].VatAmt / (data[i].TrnRate * data[i].TrnQty)) * 100,
                    WHT: (data[i].WHTAmt / (data[i].TrnRate * data[i].TrnQty)) * 100,
                    NBT: (data[i].NBTAmt / (data[i].TrnRate * data[i].TrnQty)) * 100,
                    SVAT: (data[i].SVatAmt / (data[i].TrnRate * data[i].TrnQty)) * 100,
                    Anl3Ky: data[i].Anl3Ky,
                    Anl3Cd: data[i].Anl3Cd


                });
                CreateNewGridRow();

            }

        },
        error: function (e) {
            return false;
        }
    });
}

function GetInvoiceAccountsDetail(ordKy) {
    $.ajax({
        url: urlInvoice.GetInvoiceAccountsDetail,
        data: JSON.stringify({
            ordKy: ordKy
        }),
        contentType: 'application/json; charset=utf-8',
        dataType: "Json",
        type: "POST",
        success: function (data) {
            var id = ("#" + viewBag.OurCd);
            $(id).data("kendoGrid").dataSource.filter(null);
            var grid = $(id).data("kendoGrid");
            grid.dataSource.data([]);
            for (i = 0; i < data.length; i++) {

                var LocKy2 = data[0].LocKy;
                $("#cmbFmLocId").data("kendoComboBox").value(LocKy2);
                $("#cmbFmLocNm").data("kendoComboBox").value(LocKy2);

                var PrjKy = data[0].PrjKy;
                $("#HdrSec2_CmbFrmPrj_Cd").data("kendoComboBox").value(PrjKy);
                $("#cmbFmPrjNm").data("kendoComboBox").value(PrjKy);

                var AccKy = data[0].AccKy;
                $("#HdrSec2_CmbAcc_Cd").data("kendoComboBox").value(AccKy);
                //$("#HdrSec2_CmbAcc_Nm").data("kendoComboBox").value(AccKy);

                var BuKy = data[0].BuKy;
                $("#cmbBUId").data("kendoComboBox").value(BuKy);
                $("#cmbBUCd").data("kendoComboBox").value(BuKy);

                var AdrKy1 = data[0].AdrKy;
                $("#HdrSec2_CmbAdr_Cd").data("kendoComboBox").value(AdrKy1);
             //   $("#HdrSec2_CmbAdr_Nm").data("kendoComboBox").value(AdrKy1);
                // GetGridDetail(ordKy);

                var id = ("#" + viewBag.OurCd);
                $(id).data("kendoGrid").dataSource.add({
                    ItmTrnKy: data[i].ItmTrnKy,

                    ItmKy: data[i].ItmKy,

                    ItmCd: data[i].ItmCd,
                    ItmNm: data[i].ItmNm,
                    Unit: data[i].Unit,
                    UnitKy: data[i].UnitKy,
                    Des: data[i].Des,
                    DisAmt: data[i].DisAmt,
                    DisPer: data[i].DisPer,
                    Rem: data[i].Rem,
                    TrnQty: data[i].Qty,
                    TrnRate: data[i].Rate,
                    SubTotal: data[i].Rate * data[i].Qty,
                    ReqDt: data[i].ReqDt,

                });


            }

        },
        error: function (e) {
            return false;
        }
    });
}

function GetGrnItemsDetail(ordKy) {
    $.ajax({
        url: urlTransaction.GetGRNItemsDetail,
        data: JSON.stringify({
            ordKy: ordKy
        }),
        contentType: 'application/json; charset=utf-8',
        dataType: "Json",
        type: "POST",
        success: function (data) {
            var id = ("#" + viewBag.OurCd);
            $(id).data("kendoGrid").dataSource.filter(null);
            var grid = $(id).data("kendoGrid");
            grid.dataSource.data([]);
            for (i = 0; i < data.length; i++) {

                var LocKy2 = data[0].LocKy;
                $("#cmbFmLocId").data("kendoComboBox").value(LocKy2);
                $("#cmbFmLocNm").data("kendoComboBox").value(LocKy2);

                var PrjKy = data[0].PrjKy;
                $("#cmbPrjId").data("kendoComboBox").value(PrjKy);
                $("#cmbPrjNm").data("kendoComboBox").value(PrjKy);

                var AdrKy1 = data[0].AdrKy;
                $("#HdrSec2_CmbAdr_Cd").data("kendoComboBox").value(AdrKy1);
               // $("#HdrSec2_CmbAdr_Nm").data("kendoComboBox").value(AdrKy1);
                // GetGridDetail(ordKy);

                var id = ("#" + viewBag.OurCd);
                $(id).data("kendoGrid").dataSource.add({
                    ItmTrnKy: data[i].ItmTrnKy,
                    LiNo: data[i].LiNo,
                    ItmKy: data[i].ItmKy,

                    ItmCd: data[i].ItmCd,
                    ItmNm: data[i].ItmNm,
                    Unit: data[i].Unit,
                    UnitKy: data[i].UnitKy,
                    PrcsId: data[i].PrcsID,
                    PrcsDetKy: data[i].PrcsDetKy,
                    Des: data[i].Des,
                    DisAmt: data[i].Dsicount,
                    DisPer: data[i].DisPer,
                    Rem: data[i].Rem,
                    TrnQty: data[i].Qty,

                    TrnRate: data[i].Rate,
                    SubTotal: data[i].Rate * data[i].Qty,
                    VatAmt: data[i].Vat,
                    WHTAmt: data[i].Wht,
                    NBTAmt: data[i].NBT,
                    SVatAmt: data[i].Svat,
                    VAT: (data[i].Vat / (data[i].Rate * data[i].Qty)) * 100,
                    WHT: (data[i].Wht / (data[i].Rate * data[i].Qty)) * 100,
                    NBT: (data[i].NBT / (data[i].Rate * data[i].Qty)) * 100,
                    SVAT: (data[i].Svat / (data[i].Rate * data[i].Qty)) * 100,


                });


            }
            CreateNewGridRow();

        },
        error: function (e) {
            return false;
        }
    });
}

function ItemFromPurOrd() {
    $("#FindFormPo").show().kendoWindow({
        width: "800px",
        height: "550px",
        modal: true,
        title: "New From PurchesOrd"
    });
    $('#FindFormPo').data('kendoWindow').center().open();
}

var id = ("#" + viewBag.OurCd);
$(id).on("click", ".k-grid-evenselect", function () {
    DeleteFromItmTrfrGrid(this);
});

// Delete Button For Details Grid.
$("#" + viewBag.OurCd).on("keydown", function (event) {
    if ((event.keyCode == 46) || (event.which == 46)) {
        RemoveFromGridByDelKey();
    }

});

function DeleteFromItmTrfrGrid(clickId) {
    //var answer = $(id).data("kendoGrid").removeRow($("#" + viewBag.OurCd).data("kendoGrid").select());
    var id = ("#" + viewBag.OurCd);
    var grid = $(id).data("kendoGrid");
    var answer = grid.tbody.find($(clickId).closest("tr")).hide();

    var selectedItem = grid.dataItem($(clickId).closest("tr"));
    selectedItem.set("isAct", 0);
    grid.refresh();

    Calculatetotal();

}

function onDataBound(e) {
    var id = ("#" + viewBag.OurCd);
    var grid = $(id).data("kendoGrid");
    var dataSource = grid.dataSource.data();
    for (var i = 0; i < dataSource.length; i++) {
        if (dataSource[i].isAct == 0) {
            grid.tbody.find("[data-uid='" + dataSource[i].uid + "']").hide();
        }
    }
}

function RemoveFromGridByDelKey() {
    var id = ("#" + viewBag.OurCd);
    var grid = $(id).data("kendoGrid");
    var answer = grid.tbody.find(grid.select()).hide();
    var selectedItem = grid.dataItem(grid.select());
    selectedItem.set("isAct", 0);
    grid.refresh();

    Calculatetotal();
}