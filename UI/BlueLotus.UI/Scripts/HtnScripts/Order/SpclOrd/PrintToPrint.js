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
            if (data == "Print Done") {
                alert("Successfully Printed");
                UpdatePrintedTrue();
            } else if (data == "It's Not Valid Printer") {
                alert("Printer is Not Valid Please Check Again");
            }
            else if (data == "Exception") {
                alert("Printer Failed! ");
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
            alert("Print Finalized!");
        },
        error: function (e) {
            alert("Print Success but not Finalized!");
            return false;
        }
    });
}