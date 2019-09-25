
function Calculatetotal() {
    CalSubTotal();
    CalDisAmt();
    CalVatAmt();
    CalWHTAmt();
    CalNBTAmt();
    CalSVatAmt();
    CalTotal();
}

function CalSubTotal() {
    var Subtotal = 0;
    var id = ("#" + viewBag.OurCd);
    var grid = $(id).data("kendoGrid");
    var gridData = grid.dataSource.view();
    for (var i = 0; i < gridData.length; i++) {
        if (gridData[i].IsAct == 1)
        Subtotal += gridData[i].SubTotal;
        SetSubtotal(Subtotal);
    }
}


function setDisPerByDisAmt() {

    var Qtytextbox = $("#HdrSec7_InptQty_Val").kendoNumericTextBox({
        change: function () {
            var value = this.value();
        }
    });
    var Qty = Qtytextbox.val();
    if (Qty == 0 || Qty == "" || Qty == null || Qty == undefined) {
        alert("Qty Cannot be null");
    } else {
        var Ratetextbox = $("#HdrSec7_InptRate_Val").kendoNumericTextBox({
            change: function () {
                var value = this.value();
            }
        });
        var Rate = Ratetextbox.val();
        var SubTotal = (Qty * Rate);
    }
    var HdrDisAmttextbox = $("#HdrSec7_InptDisAmt_Val").kendoNumericTextBox({
        change: function () {
            var value = this.value();
        }
    });
    var DisAmt = HdrDisAmttextbox.val();
    if (SubTotal == 0) {
        var DisPer = 0.00;
    } else {
        var DisPer = (DisAmt * 100) / SubTotal;
    }
    $("#HdrSec7_InptDis_Val").data("kendoNumericTextBox").value(DisPer);

    var HdrLiNotextbox = $("#HdrSec10_InptLiNo_Val").kendoNumericTextBox({
        change: function () {
            var value = this.value();
        }
    });
    var LiNo = HdrLiNotextbox.val();
    var LiNoForChange = (LiNo - 1);

    var id = ("#" + viewBag.OurCd);
    var firstItem = $(id).data().kendoGrid.dataSource.data()[LiNoForChange];

    firstItem.set("DisPer", DisPer);
    firstItem.set("DisAmt", DisAmt);
    Calculatetotal();
}

function setVatPerByVatAmt() {

    var Qtytextbox = $("#HdrSec7_InptQty_Val").kendoNumericTextBox({
        change: function () {
            var value = this.value();
        }
    });
    var Qty = Qtytextbox.val();
    if (Qty == 0 || Qty == "" || Qty == null || Qty == undefined) {
        alert("Qty Cannot be null");
    } else {
        var Ratetextbox = $("#HdrSec7_InptRate_Val").kendoNumericTextBox({
            change: function () {
                var value = this.value();
            }
        });
        var Rate = Ratetextbox.val();
        var SubTotal = (Qty * Rate);
    }
    var HdrDisAmttextbox = $("#HdrSec7_InptDisAmt_Val").kendoNumericTextBox({
        change: function () {
            var value = this.value();
        }
    });
    var DisAmt = HdrDisAmttextbox.val();

    var HdrVatAmttextbox = $("#HdrSec8_InptVatAmt_Val").kendoNumericTextBox({
        change: function () {
            var value = this.value();
        }
    });
    var VatAmt = HdrVatAmttextbox.val();
    if (SubTotal == 0) {
        var VatPer = 0.00;
    } else {
        var VatPer = (VatAmt * 100) / (SubTotal - DisAmt - VatAmt);
    }
    $("#HdrSec8_InptVat_Val").data("kendoNumericTextBox").value(VatPer);
    var HdrLiNotextbox = $("#HdrSec10_InptLiNo_Val").kendoNumericTextBox({
        change: function () {
            var value = this.value();
        }
    });
    var LiNo = HdrLiNotextbox.val();
    var LiNoForChange = (LiNo - 1);

    var id = ("#" + viewBag.OurCd);
    var firstItem = $(id).data().kendoGrid.dataSource.data()[LiNoForChange];

    firstItem.set("VAT", VatPer);
    firstItem.set("VatAmt", VatAmt);
    Calculatetotal();
}

function setNBTPerByNBTAmt() {
    var Qtytextbox = $("#HdrSec7_InptQty_Val").kendoNumericTextBox({
        change: function () {
            var value = this.value();
        }
    });
    var Qty = Qtytextbox.val();
    if (Qty == 0 || Qty == "" || Qty == null || Qty == undefined) {
        alert("Qty Cannot be null");
    } else {
        var Ratetextbox = $("#HdrSec7_InptRate_Val").kendoNumericTextBox({
            change: function () {
                var value = this.value();
            }
        });
        var Rate = Ratetextbox.val();
        var SubTotal = (Qty * Rate);
    }
    var HdrNBTAmttextbox = $("#HdrSec8_InptNBTAmt_Val").kendoNumericTextBox({
        change: function () {
            var value = this.value();
        }
    });
    var NBTAmt = HdrNBTAmttextbox.val();
    if (SubTotal == 0) {
        var NBTPer = 0.00;
    } else {
        var NBTPer = (NBTAmt * 100) / SubTotal;
    }
    $("#HdrSec8_InptNBT_Val").data("kendoNumericTextBox").value(NBTPer);
    var HdrLiNotextbox = $("#HdrSec10_InptLiNo_Val").kendoNumericTextBox({
        change: function () {
            var value = this.value();
        }
    });
    var LiNo = HdrLiNotextbox.val();
    var LiNoForChange = (LiNo - 1);



    var id = ("#" + viewBag.OurCd);
    var firstItem = $(id).data().kendoGrid.dataSource.data()[LiNoForChange];

    firstItem.set("NBT", NBTPer);
    firstItem.set("NBTAmt", NBTAmt);
    Calculatetotal();
}

function setWHTPerByWHTAmt() {
    var Qtytextbox = $("#HdrSec7_InptQty_Val").kendoNumericTextBox({
        change: function () {
            var value = this.value();
        }
    });
    var Qty = Qtytextbox.val();
    if (Qty == 0 || Qty == "" || Qty == null || Qty == undefined) {
        alert("Qty Cannot be null");
    } else {
        var Ratetextbox = $("#HdrSec7_InptRate_Val").kendoNumericTextBox({
            change: function () {
                var value = this.value();
            }
        });
        var Rate = Ratetextbox.val();
        var SubTotal = (Qty * Rate);
    }
    var HdrWHTAmttextbox = $("#HdrSec9_InptWHTAmt_Val").kendoNumericTextBox({
        change: function () {
            var value = this.value();
        }
    });
    var WHTAmt = HdrWHTAmttextbox.val();
    if (SubTotal == 0) {
        var WHTPer = 0.00;
    } else {
        var WHTPer = (WHTAmt * 100) / SubTotal;
    }
    $("#HdrSec9_InptWHT_Val").data("kendoNumericTextBox").value(WHTPer);
    var HdrLiNotextbox = $("#HdrSec10_InptLiNo_Val").kendoNumericTextBox({
        change: function () {
            var value = this.value();
        }
    });
    var LiNo = HdrLiNotextbox.val();
    var LiNoForChange = (LiNo - 1);

    var id = ("#" + viewBag.OurCd);
    var firstItem = $(id).data().kendoGrid.dataSource.data()[LiNoForChange];


    firstItem.set("WHT", WHTPer);
    firstItem.set("WHTAmt", WHTAmt);
    Calculatetotal();
}

function setSVatPerBySVatAmt() {
    var Qtytextbox = $("#HdrSec7_InptQty_Val").kendoNumericTextBox({
        change: function () {
            var value = this.value();
        }
    });
    var Qty = Qtytextbox.val();
    if (Qty == 0 || Qty == "" || Qty == null || Qty == undefined) {
        alert("Qty Cannot be null");
    } else {
        var Ratetextbox = $("#HdrSec7_InptRate_Val").kendoNumericTextBox({
            change: function () {
                var value = this.value();
            }
        });
        var Rate = Ratetextbox.val();
        var SubTotal = (Qty * Rate);
    }
    var HdrSVatAmttextbox = $("#HdrSec9_InptSVATAmt_Val").kendoNumericTextBox({
        change: function () {
            var value = this.value();
        }
    });
    var SVatAmt = HdrSVatAmttextbox.val();
    if (SubTotal == 0) {
        var SVatPer = 0.00;
    } else {
        var SVatPer = (SVatAmt * 100) / SubTotal;
    }
    $("#HdrSec9_InptSVAT_Val").data("kendoNumericTextBox").value(SVatPer);
    var HdrLiNotextbox = $("#HdrSec10_InptLiNo_Val").kendoNumericTextBox({
        change: function () {
            var value = this.value();
        }
    });
    var LiNo = HdrLiNotextbox.val();
    var LiNoForChange = (LiNo - 1);

    var id = ("#" + viewBag.OurCd);
    var firstItem = $(id).data().kendoGrid.dataSource.data()[LiNoForChange];

    firstItem.set("SVAT", SVatPer);
    firstItem.set("SVatAmt", SVatAmt);
    Calculatetotal();
}


function SetSubtotal(Subtotal) {
    var newSubTValueDoble = (Subtotal).toFixed(2);
    $("#HdrSec4_InptSubTot_Val").data("kendoNumericTextBox").value(newSubTValueDoble);
}

function CalDisAmt() {
    var DisAmt = 0;
    var id = ("#" + viewBag.OurCd);
    var grid = $(id).data("kendoGrid");
    var gridData = grid.dataSource.view();
    for (var i = 0; i < gridData.length; i++) {
        if (gridData[i].IsAct == 1)
        DisAmt += gridData[i].DisAmt;
        SetDisAmt(DisAmt);
    }
}

function SetDisAmt(DisAmt) {
    var newDisAmtValueDoble = (DisAmt).toFixed(2);
    $("#HdrSec4_InptDisc_Val").data("kendoNumericTextBox").value(newDisAmtValueDoble);
}

function CalVatAmt() {
    var VatAmt = 0;
    var id = ("#" + viewBag.OurCd);
    var grid = $(id).data("kendoGrid");
    var gridData = grid.dataSource.view();
    for (var i = 0; i < gridData.length; i++) {
        if (gridData[i].IsAct == 1)
        VatAmt += gridData[i].VatAmt;
        SetVatAmt(VatAmt);
    }
}

function SetVatAmt(VatAmt) {
    var newVatAmtValueDoble = (VatAmt).toFixed(2);
    $("#HdrSec4_InptVat_Val").data("kendoNumericTextBox").value(newVatAmtValueDoble);
}

function CalWHTAmt() {
    var WHTAmt = 0;
    var id = ("#" + viewBag.OurCd);
    var grid = $(id).data("kendoGrid");
    var gridData = grid.dataSource.view();
    for (var i = 0; i < gridData.length; i++) {
        if (gridData[i].IsAct == 1)
        WHTAmt += gridData[i].WHTAmt;
        SetWHTAmt(WHTAmt);
    }
}

function SetWHTAmt(WHTAmt) {
    var newWHTAmtValueDoble = (WHTAmt).toFixed(2);
    $("#HdrSec4_InptWHT_Val").data("kendoNumericTextBox").value(newWHTAmtValueDoble);
}

function CalNBTAmt() {
    var NBTAmt = 0;
    var id = ("#" + viewBag.OurCd);
    var grid = $(id).data("kendoGrid");
    var gridData = grid.dataSource.view();
    for (var i = 0; i < gridData.length; i++) {
        if (gridData[i].IsAct == 1)
        NBTAmt += gridData[i].NBTAmt;
        SetNBTAmt(NBTAmt);
    }
}

function SetNBTAmt(NBTAmt) {
    var newNBTAmtValueDoble = (NBTAmt).toFixed(2);
    $("#HdrSec4_InptNBT_Val").data("kendoNumericTextBox").value(newNBTAmtValueDoble);
}

function CalSVatAmt() {
    var SVatAmt = 0;
    var id = ("#" + viewBag.OurCd);
    var grid = $(id).data("kendoGrid");
    var gridData = grid.dataSource.view();
    for (var i = 0; i < gridData.length; i++) {
        if (gridData[i].IsAct == 1)
        SVatAmt += gridData[i].SVatAmt;
        SetSVatAmt(SVatAmt);
    }
}

function SetSVatAmt(SVatAmt) {
    var newSVatAmtValueDoble = (SVatAmt).toFixed(2);
    $("#HdrSec4_InptSVAT_Val").data("kendoNumericTextBox").value(newSVatAmtValueDoble);
}

function CalTotal() {

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

    //var Tax = $("#Tax").data("kendoNumericTextBox").val();
    var TotalVal = Number(subtotal) + Number(NBT) + Number(Vat) + Number(WHT) + Number(Svat);
    var FinalTotal = TotalVal - Number(Discount);
    var FinalTotalDoble = (FinalTotal).toFixed(2);
    var FinalTotalDoubleSeperate = FinalTotalDoble.toLocaleString();

    $("#HdrSec4_InptTotal_Val").data("kendoNumericTextBox").value(FinalTotalDoubleSeperate);
}
