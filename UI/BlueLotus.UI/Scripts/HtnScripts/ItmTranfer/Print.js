

function PrintSource() {
    var formOrdKy = $("#HdrSec1_InptTrnNo_FrmTrnKy_Val").val();
    var formObjCaption = viewBag.ObjCaptn;
    var formObjKy = viewBag.ObjKy;

    // Calling from "<script src="~/Scripts/HtnScripts/Report/SourceDocumentPrint.js"></script>"
    PrintCommon(formOrdKy, formObjCaption, formObjKy);
}

function PreviewInvoice() {
    var OrdKy = $("#HdrSec1_InptTrnNo_FrmTrnKy_Val").val();
    winDoialogElement = $("#idwin").kendoWindow({
        width: 1000,
        height: 1000
    }).data("kendoWindow");
    var url = "http://" + document.location.host + "/DevBL10/Report/DetailInvoicePrint.aspx?FormObjKy=" + viewBag.ObjKy + "&OrdKyForDetailsInvoice=" + OrdKy + "";
    var form = window.open(url, '_blank');
}



//function Prinrept() {
//    PrintGRN();
//}

//function PrintGRN() {
//    var OrdKy = $("#HdrSec1_InptTrnNo_FrmTrnKy_Val").val();
//    $.ajax({
//        url: urlTransaction.PrintGRN,
//        data: JSON.stringify({
//            ordKy: OrdKy
//        }),
//        contentType: 'application/json; charset=utf-8',
//        dataType: "Json",
//        type: "POST",
//        success: function (data) {
//            if (data == "Success") {
//                alert("Successfully Printed");
//            } else if ("False") {
//                alert("Not Printed Please Try Again")
//                //  $('#ResourceAnalysisWinForChild').data('kendoWindow').close();
//            }
//        },
//        error: function (e) {
//            return false;
//        }
//    });

//}

//function Preview() {
//    PreviewGRN();
//}

//function PreviewGRN() {
//    var OrdKy = $("#HdrSec1_InptTrnNo_FrmTrnKy_Val").val();
//    $.ajax({
//        url: urlTransaction.PreviewGRN,
//        data: JSON.stringify({

//            ordKy: OrdKy,
//        }),
//        contentType: 'application/json; charset=utf-8',
//        dataType: "Json",
//        type: "POST",
//        success: function (data) {

//            winDoialogElement = $("#idwin").kendoWindow({
//                width: 1000,
//                height: 1000
//            }).data("kendoWindow");
//            var url = "http://" + document.location.host + "/Report/GRNPrint.aspx";
//            window.open(url, '_blank');

//        },
//        error: function (e) {
//            return false;
//        }
//    });
//}


//function ComPrintFunction() {
//    var ourcd = viewBag.OurCd;
//    if (ourcd == "SALE") {
//        // PrintInvoice();
//        PreviewInvoice();
//    } else if (ourcd == "SLSRTN") {
//        PrintSaleRetn();
//    }
//}

//function PreviewInvoice() {

//    winDoialogElement = $("#idwin").kendoWindow({
//        width: 1000,
//        height: 1000
//    }).data("kendoWindow");
//    var url = "http://" + document.location.host + "/DevBL10/Report/DetailInvoicePrint.aspx";
//    var form = window.open(url, '_blank');
//}
//function PrintInvoice() {

//    var OrdKy = $("#HdrSec1_InptTrnNo_FrmTrnKy_Val").val();
//    $.ajax({
//        url: urlInvoice.PreviewInvoice,
//        data: JSON.stringify({

//            ordKy: OrdKy,
//        }),
//        contentType: 'application/json; charset=utf-8',
//        dataType: "Json",
//        type: "POST",
//        success: function (data) {
//            winDoialogElement = $("#idwin").kendoWindow({
//                width: 1000,
//                height: 1000
//            }).data("kendoWindow");
//            var url = "http://" + document.location.host + "/Report/DetailInvoicePrint.aspx";
//            var win = window.open(url, '_blank');
//            setTimeout(function () {
//                Printhrough();
//            }, 2000);
//        },
//        error: function (e) {
//            return false;
//        }
//    });
//}