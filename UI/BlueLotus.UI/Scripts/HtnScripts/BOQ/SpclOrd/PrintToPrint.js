function PrintThroughPrinter() {
    var OrdKy = $("#OrdKy1").val();
    var Date = $("#HdrSec1_DatPicProdDeliveryDate_Val").val();
    var Loc = $("#HdrSec2_CmbLoc_Cd").data("kendoComboBox").value();

    $.ajax({
        url: urlSplOrder.PrinttoPrinters, //"@Url.Content("~/SplOrder/PrinttoPrinters")",
        data: JSON.stringify({
            PrintDate: Date,
            LocKy: Number(Loc),
            OrdKy: Number(OrdKy)
        }),
        contentType: 'application/json; charset=utf-8',
        dataType: "Json",
        type: "POST",
        success: function (data) {
            if (data == "Success") {
                alert("Successfully Printed");
                UpdatePrintedTrue();
            } else if ("False") {
                alert("Not Printed Please Try Again")
            }
        },
        error: function (e) {
            return false;
        }
    });
}

function UpdatePrintedTrue() {
    var OrdKy = $("#OrdKy1").val();
    var OurCd = viewBag.OurCd;
    var ConCd = "OrdTyp";
    $.ajax({
        url: urlSplOrder.UpdatePrintedTrue, // "@Url.Content("~/SplOrder/UpdatePrintedTrue")",
        data: JSON.stringify({
            OrdKy: OrdKy,
            ConCd: ConCd,
            OurCd: OurCd
        }),
        contentType: 'application/json; charset=utf-8',
        dataType: "Json",
        type: "POST",
        success: function (data) {
        },
        error: function (e) {
            return false;
        }
    });
}