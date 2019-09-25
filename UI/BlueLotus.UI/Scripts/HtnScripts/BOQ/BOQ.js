
var todayDate = new Date();
var dd = todayDate.getDate();
var mm = todayDate.getMonth() + 1; //January is 0!

var yyyy = todayDate.getFullYear();
if (dd < 10) {
    dd = '0' + dd
}
if (mm < 10) {
    mm = '0' + mm
}
var todayDate = dd + '/' + mm + '/' + yyyy;


var FormGlblData = {
    FormObjData: null,
    OrdTypKy: 1,
    AccessLvlKy: 1,
    ConfiLvlKy: 1,
    TrnKy: 1,
    RecKy: 1,
    TblNm:'OrdHdr',
    TodayDate: todayDate,
    IsDetailRelatedHdrSectionChanged: false,
    AllDefalutValueObj: null,
    ISNeworUpdateTranction: 1,
    IsDetailDirty: false,
    AprStsLock: null,
    AprStsLockMsg: "",
    DblClickedUID: null,
    isAlwAcs: null,
    isAlwAdd: null,
    isAlwUpdate: null,
    isAlwDel: null,
    isAlwApr: null,
    OrdKy: 1,
    PrjKy: 1,
    //New ObjMas Array 
    FormGridArray: [],
    FindFormGridArray: [],

    //Double Click OrdDetKy
    DblClickOdrDetKy:1
}

var globalVariable = {
    OrdDetKy: 1,
    FinItmKy: 1
}

var CdMasModel = {
    IsTrnRateInclusiveTaxTyp1_VAT: 0,    // IsTrnRateInclusiveTaxTyp1_VAT : isCd27
    TrnMinDate: "", // Back date Transaction Purpose
    TrnMaxDate: ""  // Future Date Transaction Purpose
}

$(document).ready(function () {
    GetUserPermission(); // Get UserPermission Properties from DB.
    $.ajax({
        url: urlCodes.GetCdKyByConCdAndOurCd,
        dataType: "json",
        type: "POST",
        data: JSON.stringify({
            ObjKy: viewBag.ObjKy,
            ConCd: 'OrdTyp',
            OurCd: viewBag.OurCd
        }),
        contentType: 'application/json; charset=utf-8',
        success: function (OrdTypKy) {

            FormGlblData.OrdTypKy = OrdTypKy;
            GetCdMasBy_CdKy(OrdTypKy);
            //GetFormObjData();
        }
    });
});

function GetCdMasBy_CdKy(CdKy) {
    $.ajax({
        url: urlCodes.GetCdMasBy_CdKy,
        dataType: "json",
        type: "POST",
        data: JSON.stringify({
            ObjKy: viewBag.ObjKy,
            CdKy: CdKy
        }),
        contentType: 'application/json; charset=utf-8',
        success: function (CdMasModeldata) {
            CdMasModel.IsTrnRateInclusiveTaxTyp1_VAT = CdMasModeldata.isCd27;
            CdMasModel.TrnMinDate = CdMasModeldata.TrnMinDate;
            CdMasModel.TrnMaxDate = CdMasModeldata.TrnMaxDate;
            GetFormObjData();
            //old objmas
            //Button_From_Dynamic('ButtonSec1');
        }
    });
}

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
            HideTheProperty(FormGlblData.FormObjData);
           // FormGlblData.AllDefalutValueObj = Get_AllDefalutValue_Obj();
            DocReadyCus();
        }
    });
}

function DocReadyCus() {
    if (FormGlblData.isAlwAcs == 0) {
        alert("You Don't Have Access Permission. We Are Redirecting To Home...");
        var url = "http://" + document.location.host + "/BL10-PNS/" + "Home" + "/" + "Home";
        window.location.href = url;
        return;
    }
    //old objmas
    //setHdrSectionPropFun();
    var PrjKy = 1
    //OrdDetCmpnDocLoad();
    LoadCombo();
    //CreateDynamicCombo(viewBag.ObjKy, 'Cmb', 'HdrSec');
    LoadGridView1(1);

    var todayDate = new Date();
    $('#HdrSec1_DatPicDate_Val').data("kendoDatePicker").value(todayDate);
    setDates();
    $('#HdrSec1_DatPicProdDeliveryDate_Val').data("kendoDatePicker").value(todayDate);
    //$('#HdrSec5_DatPicReqDt_Val').data("kendoDatePicker").value(todayDate);

    // Disable all minimum date's
    //$('#HdrSec5_DatPicReqDt_Val').data("kendoDatePicker").min(todayDate);
    $("#OrdKy").hide();
    $("#OrdTypKy").hide();
    $("#OrdPrefixKy").hide();
    $("#OrdDetKy").hide();
    $("#OrdDetKy").val(null);
    $("#OrdKy1").hide();
    $("#OrdTypKy1").hide();
    $("#OrdPrefixKy1").hide();
    $("#PrefixOrdNo1").hide();
    $("#AccTrnKy").hide();

    setHeight();

    DisableFeature();
    setNumericFields();
   
    setFocus();
    //New ObjMas Function For EnterEvent And Set DefaultValue 
    NextEnterKyEvent(FormGlblData.FormObjData);
    FormGlblData.AllDefalutValueObj = Get_AllDefalutValue_Obj();
    Set_AllDefalutValue_Obj();

    
}


function setHdrSectionPropFun() {

    // ---------- Set ObjProperties
    setHdrSectionProp('', viewBag.ObjKy, '', 'HdrSec1');
    setHdrSectionProp('', viewBag.ObjKy, '', 'HdrSec2');
    setHdrSectionProp('', viewBag.ObjKy, '', 'HdrSec3');
    setHdrSectionProp('', viewBag.ObjKy, '', 'HdrSec4');
    setHdrSectionProp('ChildHdrpart', viewBag.ObjKy, '', 'HdrSec5');
    setHdrSectionProp('', viewBag.ObjKy, '', 'HdrSec6');
    setHdrSectionProp('', viewBag.ObjKy, '', 'HdrSec7');

    SetHandlingEnterKeyEvent('', viewBag.ObjKy);
    // ------------

    //$("#HdrSec1_CmbDay_Cd").focus();
    //$("#HdrSec1_InptDocNo_Val").focus();
    //-- Set Foucs event based on ObjMas and UsrObj
    SetFirstFocusObj();
    CheckUserPermission();
    HideSectnFrmtGrp();
}



function setNumericFields() {

    //$("#HdrSec4_InptNbtAmt_Val").val(
    //$("#HdrSec4_InptNbtAmt_Val").data("kendoNumericTextBox").value(

    $("#HdrSec2_NmricQty_Val").kendoNumericTextBox({
        min: 0.0000,
        decimals: 3,
        format: "n3",
        spinners: false
    }).focus(function () {
        var input = $(this);
        setTimeout(function () {
            input.select();
        });
    });

    $("#HdrSec4_NmricSubTotal_Val").kendoNumericTextBox({ min: 0, spinners: false }).focus(function () {
        var input = $(this);
        setTimeout(function () {
            input.select();
        });
    });
    $("#HdrSec4_InptDisAmt_Val").kendoNumericTextBox({ min: 0, spinners: false }).focus(function () {
        var input = $(this);
        setTimeout(function () {
            input.select();
        });
    });
    $("#HdrSec4_InptVatAmt_Val").kendoNumericTextBox({ min: 0, spinners: false }).focus(function () {
        var input = $(this);
        setTimeout(function () {
            input.select();
        });
    });
    $("#HdrSec4_InptWhtAmt_Val").kendoNumericTextBox({ min: 0, spinners: false }).focus(function () {
        var input = $(this);
        setTimeout(function () {
            input.select();
        });
    });
    $("#HdrSec4_InptNbtAmt_Val").kendoNumericTextBox({ min: 0, spinners: false }).focus(function () {
        var input = $(this);
        setTimeout(function () {
            input.select();
        });
    });
    $("#HdrSec4_InptSVatAmt_Val").kendoNumericTextBox({ min: 0, spinners: false }).focus(function () {
        var input = $(this);
        setTimeout(function () {
            input.select();
        });
    });
    $("#HdrSec4_InptSumTotalAmt_Val").kendoNumericTextBox({ min: 0, spinners: false }).focus(function () {
        var input = $(this);
        setTimeout(function () {
            input.select();
        });
    });

    $("#HdrSec5_NmricQty_Val").kendoNumericTextBox({
        min: 0.000, decimals: 3,
        format: "n3", spinners: false
    }).focus(function () {
        var input = $(this);
        setTimeout(function () {
            input.select();
        });
    });
    $("#HdrSec5_NmricRate_Val").kendoNumericTextBox({ min: 0, spinners: false }).focus(function () {
        var input = $(this);
        setTimeout(function () {
            input.select();
        });
    });
    $("#HdrSec5_NmricTrnRate_Val").kendoNumericTextBox({ min: 0, spinners: false }).focus(function () {
        var input = $(this);
        setTimeout(function () {
            input.select();
        });
    });
    $("#HdrSec5_NmricDisPer_Val").kendoNumericTextBox({ min: 0, spinners: false }).focus(function () {
        var input = $(this);
        setTimeout(function () {
            input.select();
        });
    });

    $("#HdrSec5_NmricGOHPer_Val").kendoNumericTextBox({ min: 0, spinners: false }).focus(function () {
        var input = $(this);
        setTimeout(function () {
            input.select();
        });
    });
    $("#HdrSec5_NmricDOHPer_Val").kendoNumericTextBox({ min: 0, spinners: false }).focus(function () {
        var input = $(this);
        setTimeout(function () {
            input.select();
        });
    });
    $("#HdrSec5_NmricProfitPer_Val").kendoNumericTextBox({ min: 0, spinners: false }).focus(function () {
        var input = $(this);
        setTimeout(function () {
            input.select();
        });
    });

    $("#HdrSec5_NmricDisAmt_Val").kendoNumericTextBox({ min: 0, spinners: false }).focus(function () {
        var input = $(this);
        setTimeout(function () {
            input.select();
        });
    });
    $("#HdrSec5_NmricVatPer_Val").kendoNumericTextBox({ min: 0, spinners: false }).focus(function () {
        var input = $(this);
        setTimeout(function () {
            input.select();
        });
    });
    $("#HdrSec5_NmricVatAmt_Val").kendoNumericTextBox({ min: 0, spinners: false }).focus(function () {
        var input = $(this);
        setTimeout(function () {
            input.select();
        });
    });
    $("#HdrSec5_NmricSVatPer_Val").kendoNumericTextBox({ min: 0, spinners: false }).focus(function () {
        var input = $(this);
        setTimeout(function () {
            input.select();
        });
    });
    $("#HdrSec5_NmricSVatAmt_Val").kendoNumericTextBox({ min: 0, spinners: false }).focus(function () {
        var input = $(this);
        setTimeout(function () {
            input.select();
        });
    });
    $("#HdrSec5_NmricNbtPer_Val").kendoNumericTextBox({ min: 0, spinners: false }).focus(function () {
        var input = $(this);
        setTimeout(function () {
            input.select();
        });
    });
    $("#HdrSec5_NmricNbtAmt_Val").kendoNumericTextBox({ min: 0, spinners: false }).focus(function () {
        var input = $(this);
        setTimeout(function () {
            input.select();
        });
    });
    $("#HdrSec5_NmricWhtPer_Val").kendoNumericTextBox({ min: 0, spinners: false }).focus(function () {
        var input = $(this);
        setTimeout(function () {
            input.select();
        });
    });
    $("#HdrSec5_NmricWhtAmt_Val").kendoNumericTextBox({ min: 0, spinners: false }).focus(function () {
        var input = $(this);
        setTimeout(function () {
            input.select();
        });
    });
    $("#HdrSec5_NmricLiNo_Val").kendoNumericTextBox({ min: 0, spinners: false }).focus(function () {
        var input = $(this);
        setTimeout(function () {
            input.select();
        });
    });
    $("#HdrSec5_NmricPRQty_Val").kendoNumericTextBox({ min: 0, spinners: false }).focus(function () {
        var input = $(this);
        setTimeout(function () {
            input.select();
        });
    });

    $("#HdrSec5_NmricSubTotal_Val").kendoNumericTextBox({ min: 0, spinners: false });

    $("#HdrSec3_NmricExRate_Val").kendoNumericTextBox({ min: 0.0000, decimals: 0, format: "n4", spinners: false }).focus(function () {
        var input = $(this);
        setTimeout(function () {
            input.select();
        });
    });

    $("#HdrSec3_NmricExRate_Val").data('kendoNumericTextBox').value(0);
    $("#HdrSec5_NmricDisPer_Val").data('kendoNumericTextBox').value(0);

    $("#HdrSec5_NmricGOHPer_Val").data('kendoNumericTextBox').value(0);
    $("#HdrSec5_NmricDOHPer_Val").data('kendoNumericTextBox').value(0);
    $("#HdrSec5_NmricProfitPer_Val").data('kendoNumericTextBox').value(0);

    $("#HdrSec5_NmricVatPer_Val").data('kendoNumericTextBox').value(0);
    $("#HdrSec5_NmricNbtPer_Val").data('kendoNumericTextBox').value(0);
    $("#HdrSec5_NmricSVatPer_Val").data('kendoNumericTextBox').value(0);
    $("#HdrSec5_NmricWhtPer_Val").data('kendoNumericTextBox').value(0);

    //// Spcl Order
    //$("#HdrSec5_NmricDisPer_Val").kendoNumericTextBox({ min: 0, spinners: false });
    //$("#HdrSec5_NmricDisPer_Val").data('kendoNumericTextBox').value(0);
    //$("#HdrSec5_NmricDisPer_Val").kendoNumericTextBox({ min: 0, spinners: false });
    //$("#HdrSec5_NmricDisPer_Val").data('kendoNumericTextBox').value(0);
}

$("#HdrSec1_DatPicDate_Val").width(150).kendoDatePicker({
    format: "dd/MM/yyyy",
    min: new Date(31, 2, 2009),
    change: function () {
        FormGlblData.IsDetailRelatedHdrSectionChanged = true;
    }
});
$("#HdrSec1_DatPicDate_Val").closest("span.k-datepicker").width('100%');

function setDates() {
    if (FormGlblData.ISNeworUpdateTranction == 1) {
        $("#HdrSec1_DatPicDate_Val").width(150).kendoDatePicker({
            format: "dd/MM/yyyy",
            min: new Date(CdMasModel.TrnMinDate),
            max: new Date(CdMasModel.TrnMaxDate),
            change: onDateChange
        });
        $("#HdrSec1_DatPicDate_Val").closest("span.k-datepicker").width('100%');
    }
    else {
        $("#HdrSec1_DatPicDate_Val").width(150).kendoDatePicker({
            format: "dd/MM/yyyy",
            parseFormats: ["dd/MM/yyyy"],
            change: function () {
                FormGlblData.IsDetailRelatedHdrSectionChanged = true;
            }
        });
        $("#HdrSec1_DatPicDate_Val").closest("span.k-datepicker").width('100%');
    }



    $("#HdrSec1_DatPicProdDeliveryDate_Val").width(150).kendoDatePicker({
        format: "dd/MM/yyyy",
        min: new Date(31, 2, 2009),
        change: function () {
            FormGlblData.IsDetailRelatedHdrSectionChanged = true;
        }
    });
    $("#HdrSec1_DatPicProdDeliveryDate_Val").closest("span.k-datepicker").width('100%');

    $("#HdrSec5_DatPicReqDt_Val").width(150).kendoDatePicker({
        format: "dd/MM/yyyy",
        min: new Date(31, 2, 2009),
        change: function () {
            FormGlblData.IsDetailRelatedHdrSectionChanged = true;
        }
    });
    $("#HdrSec5_DatPicReqDt_Val").closest("span.k-datepicker").width('100%');

    $("#YurRefDate").width(150).kendoDatePicker({
        format: "yyyy/MM/dd",
        min: new Date(2009, 2, 31),
        change: function () {
            FormGlblData.IsDetailRelatedHdrSectionChanged = true;
        }
    });
    $("#YurRefDate").closest("span.k-datepicker").width(150);
}

var id = ("#" + viewBag.OurCd);

function setHeight() {
    var height = $(window).height();
    var hButtonSet = $("#ButtonSet").height();
    var hHdrPart = $("#HdrPart").height();
    var hChildHdrpart = $("#ChildHdrpart").height();
    var id = ("#" + viewBag.OurCd);
    var gridElement = $(id);
    var dataArea = gridElement.find(".k-grid-content");
    dataArea.height(height - (405 + hButtonSet + hHdrPart + hChildHdrpart));
}


function DisableFeature() {
    var cmbPmt = $("#HdrSec3_CmbPmtTrms_Cd").data("kendoComboBox");
    //cmbPmt.enable(false);
    //var cmbCurrency = $("#HdrSec3_CmbCurrncy_Cd").data("kendoComboBox");
    //cmbCurrency.enable(false);
    var id = ("#" + viewBag.OurCd);
    var grid = $(id).data("kendoGrid");
    var OurCd = viewBag.OurCd;
    if (OurCd == "PO") {
        $("#btnItemFromPurOrd").hide();
        $("#btnItemFromSlsOrd").hide();
        $("#pnsDay").hide();
        $("#RecDivNO").hide();

    } else if (OurCd == "PR") {
        $("#btnItemFromPurReq").hide();
        $("#btnItemFromPurOrd").hide();
        $("#btnItemFromSlsOrd").hide();
        $("#divHdrPRQty").hide();
        $("#divHdrPRQtyText").hide();
        $("#DivHdrPRNO").hide();
        //grid.hideColumn("PRQty");
        $("#pnsDay").hide();
        $("#RecDivNO").hide();

    } else if (OurCd == "SplOrd") {
        $("#btnItemFromPurReq").hide();
        $("#btnItemFromPurOrd").hide();
        $("#btnItemFromSlsOrd").hide();
        $("#btnPrintThroughPrinter").show();
        $("#btnPrintPendingInvoice").show();
        $("#btnNewFromSpo").show();
    } else if (OurCd == "SlsOrd") {
        $("#btnItemFromPurReq").hide();
        $("#btnItemFromPurOrd").hide();
        $("#btnItemFromSlsOrd").hide();
        $("#divHdrPRQty").hide();
        $("#divHdrPRQtyText").hide();
        $("#DivHdrPRNO").hide();
        //grid.hideColumn("PRQty");
        $("#pnsDay").hide();
        $("#RecDivNO").hide();
    } else if (OurCd == "PRCancel") {
        $("#btnItemFromPurOrd").hide();
        $("#btnItemFromSlsOrd").hide();
        $("#pnsDay").hide();
        $("#RecDivNO").hide();

    } else if (OurCd == "POCancl") {
        $("#btnItemFromPurReq").hide();
        $("#btnItemFromSlsOrd").hide();
        $("#pnsDay").hide();
        $("#RecDivNO").hide();

    } else if (OurCd == "PRCancl") {
        $("#btnItemFromSlsOrd").hide();
        $("#btnItemFromPurOrd").hide();
        $("#pnsDay").hide();
        $("#RecDivNO").hide();

    }
    else if (OurCd == "RECORD") {
        $("#btnItemFromPurReq").hide();
        $("#btnItemFromPurOrd").hide();
        $("#btnItemFromSlsOrd").hide();
        $("#DivHdrPRNO").hide();
        $("#YrRef").hide();
        $("#dcNo").hide();
    }

}

function isNumberOnlyTextField(evt) {
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode != 46 && charCode > 31
      && (charCode < 48 || charCode > 57))
        return false;
    return true;
}

function CreateNewGridRow() {
    //var id = ("#" + viewBag.OurCd);
    //var grid = $(id).data("kendoGrid");
    //if (grid) {
    //    var dataSource = grid.dataSource;
    //    var total = dataSource.data().length;
    //    dataSource.insert(total, {});
    //}

}

function Remember() {
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

function GetOrderHdrDetail(ordKy) {

    $.ajax({
        url: urlGetPurchesReq,
        data: JSON.stringify({
            ordKy: ordKy,
        }),
        contentType: 'application/json; charset=utf-8',
        dataType: "Json",
        type: "POST",
        success: function (data) {
            for (i = 0; i < data.length; i++) {

                var PrefixTrnNo = data[0].OrdPrefixNo;
                $("#OrdNo1").val(PrefixTrnNo);  //(data[0].OrdNo);

                $("#PrefixOrdNo1").val(PrefixTrnNo);
                var OrdTypKy = data[0].OrdTypKy;
                $("#OrdTypKy1").val(OrdTypKy);
                var TrnPreFixKy = data[0].OrdPrefixKy;
                $("#OrdPrefixKy1").val(TrnPreFixKy);
                var TrnKy = data[0].OrdKy;
                $("#OrdKy1").val(TrnKy);

                var LocKy = data[0].LocKy2;
                $("#HdrSec2_CmbLoc_Cd").data("kendoComboBox").value(LocKy);
                $("#HdrSec2_CmbLoc_Nm").data("kendoComboBox").value(LocKy);
                var TrnDt = data[0].OrdDt;
                if (TrnDt) {
                    var DateSplit = TrnDt.split("/");
                    var month = DateSplit[0];
                    var Date = parts[1];
                    var Yr = parts[2]
                    var marge = Date + '/' + month + '/' + Yr
                    $('#HdrSec1_DatPicDate_Val').data("kendoDatePicker").value(marge);
                }

                var PmtTrmKy = data[0].PmtKy;
                $("#HdrSec3_CmbPmtTrms_Cd").data("kendoComboBox").value(PmtTrmKy);

                var TrnCrnKy = data[0].CurrencyKy;
                $("#HdrSec3_CmbCurrncy_Cd").data("kendoComboBox").value(TrnCrnKy);

                var ExRate = data[0].ExtRate;
                $("#HdrSec3_NmricExRate_Val").val(ExRate);

                var Yurref = data[0].YurRef;
                $("#HdrSec1_InptYurRef_Val").val();

                var DocNo = data[0].DocNo;
                $("#HdrSec1_InptDocNo_Val").val(DocNo);

                var disamt = data[0].DisAmt;
                $("#HdrSec4_InptDisAmt_Val").data("kendoNumericTextBox").value(disamt);
                var NBT = 0;
                $("#HdrSec4_InptNbtAmt_Val").data("kendoNumericTextBox").value(NBT);
                var Vat = 0;
                $("#HdrSec4_InptVatAmt_Val").data("kendoNumericTextBox").value(Vat);
                var Wht = 0;
                $("#HdrSec4_InptWhtAmt_Val").data("kendoNumericTextBox").value(Wht);
                var Svat = 0;
                $("#HdrSec4_InptSVatAmt_Val").data("kendoNumericTextBox").value(Svat);
                var Total = data[0].Amt;
                $("#HdrSec4_InptSumTotalAmt_Val").val(Total);
                var SubTotal = Number(data[0].Total) - Number(0) - Number(data[0].Discount);
                $("#HdrSec4_NmricSubTotal_Val").data("kendoNumericTextBox").value(SubTotal);

                GetOrderItemsDetail(ordKy);
            }

        },
        error: function (e) {
            return false;
        }
    });


}

function GetOrderItemsDetail(ordKy) {
    $.ajax({
        url: urlGetPRDetailForFind,
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
                $("#HdrSec2_CmbPrj_Cd").data("kendoComboBox").value(PrjKy);
                $("#HdrSec2_CmbPrj_Nm").data("kendoComboBox").value(PrjKy);
                var LocKy2 = data[0].LocKy;
                $("#HdrSec2_CmbLoc_Cd").data("kendoComboBox").value(LocKy2);
                $("#HdrSec2_CmbLoc_Nm").data("kendoComboBox").value(LocKy2);

                var AdrKy1 = data[0].AdrKy;
                $("#HdrSec2_CmbAdr_Cd").data("kendoComboBox").value(AdrKy1);
                $("#HdrSec2_CmbAdr_Nm").data("kendoComboBox").value(AdrKy1);
                var DlvAdrKy = data[0].DlvAdrKy;
                $("#HdrSec2_CmbDeliNoTo_Cd").data("kendoComboBox").value(DlvAdrKy);

                var AccKy = data[0].AccKy;
                $("#HdrSec2_CmbSupAcc_Cd").data("kendoComboBox").value(AccKy);
                $("#HdrSec2_CmbSupAcc_Nm").data("kendoComboBox").value(AccKy);
                //var ReqDt = data[0].ReqDt;
                //var ReqDtFinal = "";
                //if (ReqDt) {
                //    var DateSplit = ReqDt.split("/");
                //    var month = DateSplit[0];
                //    var Date = parts[1];
                //    var Yr = parts[2]
                //    var marge = Date + '/' + month + '/' + Yr
                //    ReqDtFinal = marge;
                //}

                var id = ("#" + viewBag.OurCd);
                $(id).data("kendoGrid").dataSource.add({
                    OrdDetKy: data[i].OrdDetKy,
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
                    Anl3Cd: data[i].Anl3Cd,
                    ReqDt: data[i].ReqDt

                });


            }

        },
        error: function (e) {
            return false;
        }
    });
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

function ItemFromPurOrd() {

    $("#FindFormPo").show().kendoWindow({
        width: "800px",
        height: "550px",
        modal: true,
        title: "New From PurchesOrd(PO)"
    });

    $('#FindFormPo').data('kendoWindow').center().open();

}

function OrdTypOrdTypSelect(ConCd, OurCd) {
    //var OurCd = viewBag.OurCd;
    var Title = "";
    if (OurCd == 'PO') Title = "Get From Purches Order";
    if (OurCd == 'PR') Title = "Get From Purches Requisition";
    $("#GetFromPO").show().kendoWindow({
        width: "900px",
        height: "550px",
        modal: true,
        title: Title
    });
    OurForFind = OurCd;
    $('#GetFromPO').data('kendoWindow').center().open();
}


function ItemFromPurReq() {
    var OurCd = viewBag.OurCd;

    $("#FindFormPR").show().kendoWindow({
        width: "800px",
        height: "550px",
        modal: true,
        title: "New From PurchesReq"
    });
    if (OurCd == "PO")
        OurForFind = "PO"
    else if (OurCd == "PRCancl")
        OurForFind = "PO"
    $('#FindFormPR').data('kendoWindow').center().open();

    loadFindFromPurReqDocumentReady();
}

function ItemFromPurOrd() {

    $("#FindFormPR").show().kendoWindow({
        width: "800px",
        height: "550px",
        modal: true,
        title: "New From PurchesOrd(PR)"
    });
    OurForFind = "POCancl"
    $('#FindFormPR').data('kendoWindow').center().open();

    loadFindFromPurReqDocumentReady();
}

function ItemFromSlsOrd() {

    $("#FindFormPR").show().kendoWindow({
        width: "800px",
        height: "550px",
        modal: true,
        title: "New From SalesOrd"
    });
    OurForFind = "SlsOrd"
    $('#FindFormPR').data('kendoWindow').center().open();

    loadFindFromPurReqDocumentReady();
}

function OrdDetToPrcsDet() {

    $("#LinkPM").show().kendoWindow({
        width: "800px",
        height: "400px",
        modal: true,
        title: "Create Schedule"
    });
    
    $('#LinkPM').data('kendoWindow').center().open();

}

//var id = ("#" + viewBag.OurCd);

//$(id).on("click", ".k-grid-evenselect", function () {
//    //var answer = $(id).data("kendoGrid").removeRow($(this).closest("tr"));

//    var grid = $(id).data("kendoGrid");
//    var answer = grid.tbody.find($(this).closest("tr")).hide();
//    var selectedItem = grid.dataItem($(this).closest("tr"));
//    selectedItem.set("IsAct", 0);

//    CalSubTotal();
//    CalDisAmt();
//    CalVatAmt();
//    CalWHTAmt();
//    CalNBTAmt();
//    CalSVatAmt();
//    CalTotal();

//});

$("#" + viewBag.OurCd).on("keydown", function (event) {
    if ((event.keyCode == 46) || (event.which == 46)) {
        RemoveFromGridByDelKey();
    }

});

function RemoveFromGridByDelKey() {
    var id = ("#" + viewBag.OurCd);
    var grid = $(id).data("kendoGrid");
    var selectedItem = grid.dataItem(grid.select());
    selectedItem.set("isAct", 0);
    //selectedItem.set("LiNo", 999);
    var answer = grid.tbody.find(grid.select()).hide();
    //ArrangeLiNo();
    //CalculateSubTotal();
    //CalculateDisAmt();
    //CalculateVatAmt();
    //CalculateWHTAmt();
    //CalculateNBTAmt();
    //CalculateSVATAmt();
    Calculatetotal();
    ReIndexLino();
    
    
}




function onDateChange(e) {
    var val = $('#HdrSec1_DatPicDate_Val').val();
    var dt = e.sender;
    var value = CheckDateforAutoMonthYear(val);
    var val1 = value.split("/");
    var val2 = val1[1] + "/" + val1[0] + "/" + val1[2];

    var ActualDate = new Date(val2);
    var minVal = new Date(dt.min());
    var maxVal = new Date(dt.max());

    if (value === null) {
        value = kendo.parseDate(dt.element.val(), dt.options.parseFormats);
    }

    if (ActualDate < minVal) {
        dt.value(dt.min());
    } else if (ActualDate > maxVal) {
        dt.value(dt.max());
    }
    else {
        dt.value(value);
    }
}






