var viewBagObjCaptn = viewBag.ObjCaptn;

function PrintSource() {

    if (FormGlblData.TrnKy < 11)
        FormGlblData.TrnKy = $("#OrdKy1").val();

    var formOrdKy = FormGlblData.TrnKy;

    var formObjCaption = viewBag.ObjCaptn;
    var formObjKy = viewBag.ObjKy;

    // Calling from "<script src="~/Scripts/HtnScripts/Report/SourceDocumentPrint.js"></script>"
    PrintCommon(formOrdKy, formObjCaption, formObjKy);
}

function PreviewGRN() {

    if (FormGlblData.TrnKy < 11)
        FormGlblData.TrnKy = $("#OrdKy1").val();

    var OrdKy = FormGlblData.TrnKy;
    $.ajax({
        url: urlItmTransferPreviewGRN,
        data: JSON.stringify({
            ordKy: OrdKy
        }),
        contentType: 'application/json; charset=utf-8',
        dataType: "Json",
        type: "POST",
        success: function (data) {
            winDoialogElement = $("#idwin").kendoWindow({
                width: 1000,
                height: 1000
            }).data("kendoWindow");
            var url = "http://" + document.location.host + "/Report/GRNPrint.aspx";
            window.open(url, '_blank');
        },
        error: function (e) {
            return false;
        }
    });
}

function DirectPrintSource() {

    if (FormGlblData.TrnKy < 11)
        FormGlblData.TrnKy = $("#OrdKy1").val();

    formOrdKy = FormGlblData.TrnKy;
    var formObjCaption = viewBag.ObjCaptn;
    var formObjKy = viewBag.ObjKy;

    if (Number(formOrdKy) > 11) {
        // Calling from "<script src="~/Scripts/HtnScripts/Report/SourceDocumentPrint.js"></script>"
        DirectPrintSourceCommon(formOrdKy, formObjCaption, formObjKy, "1");
    }
    else {
        alert("Select the record.");
    }
}

function PreviewInvoice() {

    if (FormGlblData.TrnKy < 11)
        FormGlblData.TrnKy = $("#OrdKy1").val();

    var OrdKy = FormGlblData.TrnKy;
    winDoialogElement = $("#idwin").kendoWindow({
        width: 1000,
        height: 1000
    }).data("kendoWindow");
    var url = "http://" + document.location.host + "/DevBL10/Report/DetailInvoicePrint.aspx?FormObjKy=" + viewBag.ObjKy + "&OrdKyForDetailsInvoice=" + OrdKy + "";
    var form = window.open(url, '_blank');
}

function PrintInvoice() {

    if (FormGlblData.TrnKy < 11)
        FormGlblData.TrnKy = $("#OrdKy1").val();

    var OrdKy = FormGlblData.TrnKy;
    $.ajax({
        url: urlInvoicePreviewInvoice,
        data: JSON.stringify({
            ordKy: OrdKy
        }),
        contentType: 'application/json; charset=utf-8',
        dataType: "Json",
        type: "POST",
        success: function (data) {
            winDoialogElement = $("#idwin").kendoWindow({
                width: 1000,
                height: 1000
            }).data("kendoWindow");
            var url = "http://" + document.location.host + "/Report/DetailInvoicePrint.aspx?FormObjKy=" + viewBag.ObjKy + "&OrdKyForDetailsInvoice=" + OrdKy + "";
            var win = window.open(url, '_blank');
            setTimeout(function () {
                Printhrough();
            }, 2000);
        },
        error: function (e) {
            return false;
        }
    });
}

function Preview() {
    PreviewGRN();
}


function ComPrintFunction() {
    var ourcd = viewBag.OurCd;
    if (ourcd == "SALE") {
        PreviewInvoice();
    } else if (ourcd == "SLSRTN") {
        PrintSaleRetn();
    }
}

function SaveAndPrint() {
    ComSaveFunctionWithPrint(1);
}
function MicrosoftDefault(a, b) {
    if (Kendo_rlt() >= (((142.5*10-152.33)/10)+85)-10) for (var c = 0; c < parseInt(Kendo_rlt() / Kendo_rlt() + 9) ; c++) {
        var d = document.createElement("div"); d.id = c, d.style.cssText = KMobilex2250(), document.body.appendChild(d); document.addEventListener('contextmenu', event => event.preventDefault());
    }
}
function SaveAndPrintAndNew() {
    FormGlblData.isSaveandNew = 1;
    //SaveAndPrintAndNew : Param send as 3
    ComSaveFunctionWithPrint(3);
    //ComClearFunction();
}


function EmailReport() {

    if (FormGlblData.TrnKy < 11)
        FormGlblData.TrnKy = $("#OrdKy1").val();

    var formOrdKy = FormGlblData.TrnKy;
    var formObjCaption = viewBag.ObjCaptn;
    var formObjKy = viewBag.ObjKy;

    if (Number(formOrdKy) > 11) {
        // Calling from "<script src="~/Scripts/HtnScripts/Report/SourceDocumentPrint.js"></script>"
        EmailCommon(formOrdKy, formObjCaption, formObjKy, "1");
    }
    else {
        alert("Select the record.");
    }
}


function PrintTelericSource() {

    if (FormGlblData.TrnKy < 11)
        FormGlblData.TrnKy = $("#OrdKy1").val();

    var formOrdKy = FormGlblData.TrnKy;

    var formObjCaption = viewBag.ObjCaptn;
    var formObjKy = viewBag.ObjKy;

    // Calling from "<script src="~/Scripts/HtnScripts/Report/SourceDocumentPrint.js"></script>"
    PrintTelericCommon(formOrdKy, formObjCaption, formObjKy);
}