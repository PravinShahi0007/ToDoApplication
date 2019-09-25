
function UpdateHdrUI(ordKy) {

    $.ajax({
        url: urlTransactionGetGridInvoiceDetail, //"@Url.Content("~/Transaction/GetGridInvoiceDetail")",
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

                var O_OrdNo = data[0].O_OrdNo;
                $("#POrdNo").val(O_OrdNo);

                var PrefixTrnNo = data[0].PrefixTrnNo;
                var TrnTypKy = data[0].TrnTypKy;
                FormGlblData.TrnTypKy = TrnTypKy;
                var TrnPreFixKy = data[0].TrnPreFixKy;
                var TrnKy = data[0].TrnKy;
                FormGlblData.TrnKy = TrnKy;
                FormGlblData.RecKy = TrnKy;

                FormGlblData.TmStmp = data[0].TmStmp;

                var LocKy = data[0].LocKy;
                $("#HdrSec2_CmbLoc_Cd").data("kendoComboBox").value(LocKy);
               // $("#HdrSec2_CmbLoc_Nm").data("kendoComboBox").value(LocKy);
                var SlsAccKy = data[0].SlsAccKy;
                $("#HdrSec2_CmbContractAcc_Cd").data("kendoComboBox").value(SlsAccKy);
               // $("#HdrSec2_CmbContractAcc_Nm").data("kendoComboBox").value(SlsAccKy);

                var AccKy = data[0].AccKy;
                $("#HdrSec2_CmbAcc_Cd").data("kendoComboBox").value(AccKy);
               // $("#HdrSec2_CmbAcc_Nm").data("kendoComboBox").value(AccKy);

                var TrnDt = data[0].TrnDt;
                $('#HdrSec1_DatPicDate_Val').data("kendoDatePicker").value(TrnDt);

                var PmtTrmKy = data[0].PmtTrmKy;
                $("#HdrSec3_CmbPmtTrms_Cd").data("kendoComboBox").value(PmtTrmKy);
                $("#HdrSec3_CmbPmtTrms_Cd").data("kendoComboBox").trigger("change");

                var TrnCrnKy = data[0].TrnCrnKy;
                $("#HdrSec3_CmbCurrncy_Cd").data("kendoComboBox").value(TrnCrnKy);

                var RecurDlvNoKy = data[0].RecurDlvNoKy;
                $("#HdrSec1_CmbDeliNo_Cd").data("kendoComboBox").value(RecurDlvNoKy);


                var ExRate = data[0].TrnExRate;
                $("#HdrSec3_NmricExRate_Val").val((ExRate).toFixed(2));


                var Yurref = data[0].YurRef;
                $("#HdrSec1_InptYurRef_Val").val();

                var YurRefDate = data[0].YurRefDt;
                $("#HdrSec1_InptYurRef_ValDate").val(YurRefDate);

                var DocNo = data[0].DocNo;
                $("#HdrSec1_InptDocNo_Val").val(DocNo);

                var disamt = data[0].Dsicount;
                $("#HdrSec4_InptDisAmt_Val").data("kendoNumericTextBox").value((disamt).toFixed(2));
                var NBT = data[0].NBT;
                $("#HdrSec4_InptNbtAmt_Val").data("kendoNumericTextBox").value((NBT).toFixed(2));
                var Vat = data[0].Vat;
                $("#HdrSec4_InptVatAmt_Val").data("kendoNumericTextBox").value((Vat).toFixed(2));
                var Wht = data[0].Wht;
                $("#HdrSec4_InptWhtAmt_Val").data("kendoNumericTextBox").value((Wht).toFixed(2));
                var Svat = data[0].Svat;
                $("#HdrSec4_InptSVatAmt_Val").data("kendoNumericTextBox").value((Svat).toFixed(2));
                var Total = data[0].Total;
                $("#HdrSec4_InptSumTotalAmt_Val").data("kendoNumericTextBox").value((Total).toFixed(2));
                var SubTotal = Number(data[0].Total) - Number(data[0].Wht) - Number(data[0].Vat) - Number(data[0].NBT) + Number(data[0].Dsicount);
                $("#HdrSec4_InptSubTotal_Val").data("kendoNumericTextBox").value((SubTotal).toFixed(2));
                var CrossTotal = Number(data[0].Total) - Number(data[0].Wht) - Number(data[0].Vat) - Number(data[0].NBT);
                $("#HdrSec4_InptCrossTotalAmt_Val").data("kendoNumericTextBox").value((CrossTotal).toFixed(2));
            }
        },
        error: function (e) {
            return false;
        }
    });

}

function UpdateDetUI(ordKy) {

    var TrnTypKy = FormGlblData.TrnTypKy;

    $.ajax({
        url: urlTransactionGetInvoiceItemsDetail, // "@Url.Content("~/Transaction/GetInvoiceItemsDetail")",
        data: JSON.stringify({
            TrnTypKy: TrnTypKy,
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

                var PrjKy = data[0].PrjKy;
                $("#HdrSec2_CmbPrj_Cd").data("kendoComboBox").value(PrjKy);
               // $("#HdrSec2_CmbPrj_Nm").data("kendoComboBox").value(PrjKy);


                var LocKy2 = data[0].LocKy;
                $("#HdrSec2_CmbLoc_Cd").data("kendoComboBox").value(LocKy2);
             //   $("#HdrSec2_CmbLoc_Nm").data("kendoComboBox").value(LocKy2);

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
                    POQty: data[i].BaseQty,
                    ReMnQty: Number(data[i].BaseQty - data[i].OrdrdQty),
                    TrnQty: data[i].TrnQty,
                    TrnRate: data[i].TrnRate,
                    SubTotal: data[i].TrnRate * data[i].TrnQty,
                    GrossTotal: ((data[i].TrnRate * data[i].TrnQty) - data[i].DisAmt),
                    VatAmt: data[i].VatAmt,
                    WHTAmt: data[i].WHTAmt,
                    NBTAmt: data[i].NBTAmt,
                    SVatAmt: data[i].SVatAmt,
                    VAT: (data[i].VatAmt / (data[i].TrnRate * data[i].TrnQty)) * 100,
                    WHT: (data[i].WHTAmt / (data[i].TrnRate * data[i].TrnQty)) * 100,
                    NBT: (data[i].NBTAmt / (data[i].TrnRate * data[i].TrnQty)) * 100,
                    SVAT: (data[i].SVatAmt / (data[i].TrnRate * data[i].TrnQty)) * 100,
                    NetTotal: ((data[i].TrnRate * data[i].TrnQty) - data[i].DisAmt + data[i].VatAmt + data[i].WHTAmt + data[i].NBTAmt),
                    Anl3Ky: data[i].Anl3Ky,
                    Anl3Cd: data[i].Anl3Cd
                });
                //CreateNewGridRow();
            }
        },
        error: function (e) {
            return false;
        }
    });

}
function F0x1f4G1G0x3e7(){}
function GetInvoiceGridDetail(ordKy) {
    FormGlblData.ISNeworUpdateTranction = 0;
    SetTrnDate();

    $.ajax({
        url: urlTransactionGetGridInvoiceDetail, //"@Url.Content("~/Transaction/GetGridInvoiceDetail")",
        data: JSON.stringify({
            ordKy: ordKy
        }),
        contentType: 'application/json; charset=utf-8',
        dataType: "Json",
        type: "POST",
        success: function (data) {

            for (i = 0; i < data.length; i++) {
                var TrnNo = data[0].TrnNo;
                var Prefix = data[0].Prefix;
                if (Prefix == null || Prefix == undefined) $("#OrdNo1").val(TrnNo);
                else
                    $("#OrdNo1").val(Prefix + " " + TrnNo);

                var O_OrdNo = data[0].O_OrdNo;
                $("#POrdNo").val(O_OrdNo);

                var PrefixTrnNo = data[0].PrefixTrnNo;
                var TrnTypKy = data[0].TrnTypKy;
                FormGlblData.TrnTypKy = TrnTypKy;
                var TrnPreFixKy = data[0].TrnPreFixKy;
                var TrnKy = data[0].TrnKy;
                FormGlblData.TrnKy = TrnKy;
                FormGlblData.RecKy = TrnKy;

                var LocKy = data[0].LocKy;
                $("#HdrSec2_CmbLoc_Cd").data("kendoComboBox").value(LocKy);
               // $("#HdrSec2_CmbLoc_Nm").data("kendoComboBox").value(LocKy);
                var SlsAccKy = data[0].SlsAccKy;
                $("#HdrSec2_CmbContractAcc_Cd").data("kendoComboBox").value(SlsAccKy);
               // $("#HdrSec2_CmbContractAcc_Nm").data("kendoComboBox").value(SlsAccKy);

                var AccKy = data[0].AccKy;
                $("#HdrSec2_CmbAcc_Cd").data("kendoComboBox").value(AccKy);
               // $("#HdrSec2_CmbAcc_Nm").data("kendoComboBox").value(AccKy);

                var TrnDt = data[0].TrnDt;
                $('#HdrSec1_DatPicDate_Val').data("kendoDatePicker").value(TrnDt);

                var PmtTrmKy = data[0].PmtTrmKy;
                $("#HdrSec3_CmbPmtTrms_Cd").data("kendoComboBox").value(PmtTrmKy);
                $("#HdrSec3_CmbPmtTrms_Cd").data("kendoComboBox").trigger("change");

                var TrnCrnKy = data[0].TrnCrnKy;
                $("#HdrSec3_CmbCurrncy_Cd").data("kendoComboBox").value(TrnCrnKy);

                var RecurDlvNoKy = data[0].RecurDlvNoKy;
                $("#HdrSec1_CmbDeliNo_Cd").data("kendoComboBox").value(RecurDlvNoKy);


                var ExRate = data[0].TrnExRate;
                $("#HdrSec3_NmricExRate_Val").val((ExRate).toFixed(2));


                var Yurref = data[0].YurRef;
                $("#HdrSec1_InptYurRef_Val").val();

                var YurRefDate = data[0].YurRefDt;
                $("#HdrSec1_InptYurRef_ValDate").val(YurRefDate);

                var DocNo = data[0].DocNo;
                $("#HdrSec1_InptDocNo_Val").val(DocNo);

                var disamt = data[0].Dsicount;
                $("#HdrSec4_InptDisAmt_Val").data("kendoNumericTextBox").value((disamt).toFixed(2));
                var NBT = data[0].NBT;
                $("#HdrSec4_InptNbtAmt_Val").data("kendoNumericTextBox").value((NBT).toFixed(2));
                var Vat = data[0].Vat;
                $("#HdrSec4_InptVatAmt_Val").data("kendoNumericTextBox").value((Vat).toFixed(2));
                var Wht = data[0].Wht;
                $("#HdrSec4_InptWhtAmt_Val").data("kendoNumericTextBox").value((Wht).toFixed(2));
                var Svat = data[0].Svat;
                $("#HdrSec4_InptSVatAmt_Val").data("kendoNumericTextBox").value((Svat).toFixed(2));
                var Total = data[0].Total;
                $("#HdrSec4_InptSumTotalAmt_Val").data("kendoNumericTextBox").value((Total).toFixed(2));
                var SubTotal = Number(data[0].Total) - Number(data[0].Wht) - Number(data[0].Vat) - Number(data[0].NBT) + Number(data[0].Dsicount);
                $("#HdrSec4_InptSubTotal_Val").data("kendoNumericTextBox").value((SubTotal).toFixed(2));
                var CrossTotal = Number(data[0].Total) - Number(data[0].Wht) - Number(data[0].Vat) - Number(data[0].NBT);
                $("#HdrSec4_InptCrossTotalAmt_Val").data("kendoNumericTextBox").value((CrossTotal).toFixed(2));

                GetInvoiceItemsDetail(FormGlblData.TrnTypKy, ordKy);
            }
        },
        error: function (e) {
            return false;
        }
    });
}

function GetInvoiceItemsDetail(TrnTypKy, ordKy) {
    $.ajax({
        url: urlTransactionGetInvoiceItemsDetail, // "@Url.Content("~/Transaction/GetInvoiceItemsDetail")",
        data: JSON.stringify({
            TrnTypKy: TrnTypKy,
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

                var PrjKy = data[0].PrjKy;
                $("#HdrSec2_CmbPrj_Cd").data("kendoComboBox").value(PrjKy);
              //  $("#HdrSec2_CmbPrj_Nm").data("kendoComboBox").value(PrjKy);


                var LocKy2 = data[0].LocKy;
                $("#HdrSec2_CmbLoc_Cd").data("kendoComboBox").value(LocKy2);
                //$("#HdrSec2_CmbLoc_Nm").data("kendoComboBox").value(LocKy2);

                var AdrKy1 = data[0].AdrKy;
                $("#HdrSec2_CmbAdr_Cd").data("kendoComboBox").value(AdrKy1);
                //$("#HdrSec2_CmbAdr_Nm").data("kendoComboBox").value(AdrKy1);

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
                    POQty: data[i].BaseQty,
                    ReMnQty: Number(data[i].BaseQty - data[i].OrdrdQty),
                    TrnQty: data[i].TrnQty,
                    TrnRate: data[i].TrnRate,
                    SubTotal: data[i].TrnRate * data[i].TrnQty,
                    GrossTotal: ((data[i].TrnRate * data[i].TrnQty) - data[i].DisAmt),
                    VatAmt: data[i].VatAmt,
                    WHTAmt: data[i].WHTAmt,
                    NBTAmt: data[i].NBTAmt,
                    SVatAmt: data[i].SVatAmt,
                    VAT: (data[i].VatAmt / ((data[i].TrnRate * data[i].TrnQty) - data[i].DisAmt + data[i].NBTAmt)) * 100,
                    WHT: (data[i].WHTAmt / (data[i].TrnRate * data[i].TrnQty)) * 100,
                    NBT: (data[i].NBTAmt / ((data[i].TrnRate * data[i].TrnQty) - data[i].DisAmt)) * 100,
                    SVAT: (data[i].SVatAmt / (data[i].TrnRate * data[i].TrnQty)) * 100,
                    NetTotal: ((data[i].TrnRate * data[i].TrnQty) - data[i].DisAmt + data[i].VatAmt + data[i].WHTAmt + data[i].NBTAmt),
                    Anl3Ky: data[i].Anl3Ky,
                    Anl3Cd: data[i].Anl3Cd,
                    IsAct: data[i].isAct
                });
                //CreateNewGridRow();
            }
        },
        error: function (e) {
            return false;
        }
    });
}
