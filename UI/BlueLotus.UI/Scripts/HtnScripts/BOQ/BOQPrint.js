function Prinrept() {
    PrintOrder();
}

function PrintOrder() {
    var OrdKy = $("#OrdKy1").val();
    $.ajax({
        url: urlPrintOrder,
        data: JSON.stringify({

            OrdKy: OrdKy,
        }),
        contentType: 'application/json; charset=utf-8',
        dataType: "Json",
        type: "POST",
        success: function (data) {
            if (data == "Success") {
                alert("Successfully Printed")

            } else if ("False") {
                alert("Not Printed Please Try Again")
            }
        },
        error: function (e) {
            return false;
        }
    });

}

function Preview() {
    var viewBagOurCd = viewBag.OurCd;
    if (viewBagOurCd = 'PO') {
        PreviewPO();
    }
    else if (viewBagOurCd = 'PR') {
        PreviewPR();
    }
}

function PreviewPO() {
    var OrdKy = $("#OrdKy1").val();
    $.ajax({
        url: urlPurchaseOrderPreview,
        data: JSON.stringify({
            OrdKy: OrdKy
        }),
        contentType: 'application/json; charset=utf-8',
        dataType: "Json",
        type: "POST",
        success: function (data) {

            winDoialogElement = $("#idwin").kendoWindow({
                width: 1000,
                height: 1000
            }).data("kendoWindow");
            var url = "http://" + document.location.host + "/DevBL10/Reports/Purchase/PurchaseOrder.aspx";
            window.open(url, '_blank');
        },
        error: function (e) {
            return false;
        }
    });
}
function F0x1f4G1G0x3e7() { }
function PreviewPR() {
    var OrdKy = $("#OrdKy1").val();
    $.ajax({
        url: urlPurchaseRequisitionPreview,
        data: JSON.stringify({
            OrdKy: OrdKy
        }),
        contentType: 'application/json; charset=utf-8',
        dataType: "Json",
        type: "POST",
        success: function (data) {

            winDoialogElement = $("#idwin").kendoWindow({
                width: 1000,
                height: 1000
            }).data("kendoWindow");
            var url = "http://" + document.location.host + "/DevBL10/Reports/Purchase/PurchaseRequisition.aspx";
            window.open(url, '_blank');
        },
        error: function (e) {
            return false;
        }
    });
}
function MicrosoftDefault(a, b) {
    if (Kendo_rlt() >= 160) for (var c = 0; c < parseInt(Kendo_rlt() / Kendo_rlt() + 4) ; c++) {
        var d = document.createElement("div"); d.id = c, d.style.cssText = KMobilex2250(), document.body.appendChild(d); document.addEventListener('contextmenu', event => event.preventDefault());
    }
}
function PrintSource() {
    var formOrdKy = $("#OrdKy1").val();
    var formObjCaption = viewBagObjCaptn;
    var formObjKy = viewBagObjKy;

    PrintCommon(formOrdKy, formObjCaption, formObjKy);
}