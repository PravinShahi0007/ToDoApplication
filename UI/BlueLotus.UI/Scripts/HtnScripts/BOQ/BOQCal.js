function Calculatetotal() {
    CalSubTotal();
    //CalDisAmt(); all below calculated inside CalSubTotal()
    //CalVatAmt();
    //CalWHTAmt();
    //CalNBTAmt();
    //CalSVatAmt();
    CalTotal();

}

function CalSubTotal() {
    var Subtotal = 0;
    var SVatAmt = 0;
    var NBTAmt = 0;
    var WHTAmt = 0;
    var VatAmt = 0;
    var DisAmt = 0;


    var id = ("#" + viewBag.OurCd);
    var grid = $(id).data("kendoGrid");
    //var gridData = grid.dataSource.view();
    var gridData = grid.dataSource.data();
    for (var i = 0; i < gridData.length; i++) {
        if (gridData[i].isAct == 1)
        {
            Subtotal += gridData[i].SubTotal;
            DisAmt += gridData[i].DisAmt;
            SVatAmt += gridData[i].SVatAmt;
            NBTAmt += gridData[i].NBTAmt;
            WHTAmt += gridData[i].WHTAmt;
            VatAmt += gridData[i].VatAmt;
        } 
    }
        SetSubtotal(Subtotal);

        SetSVatAmt(SVatAmt);
 
        SetNBTAmt(NBTAmt);
    
        SetWHTAmt(WHTAmt);
 
        SetVatAmt(VatAmt);

        SetDisAmt(DisAmt);
    
}

function setDisPerByDisAmt() {
    var Qtytextbox = $("#HdrSec5_NmricQty_Val").kendoNumericTextBox({
        change: function () {
            var value = this.value();
        }
    });
    var Qty = Qtytextbox.val();
    if (Qty == 0 || Qty == "" || Qty == null || Qty == undefined) {
        alert("Qty Cannot be null");
    } else {
        var Ratetextbox = $("#HdrSec5_NmricTrnRate_Val").kendoNumericTextBox({
            change: function () {
                var value = this.value();
            }
        });
        var Rate = Ratetextbox.val();
        var SubTotal = (Qty * Rate);
    }
    var HdrDisAmttextbox = $("#HdrSec5_NmricDisAmt_Val").kendoNumericTextBox({
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
    $("#HdrSec5_NmricDisPer_Val").data("kendoNumericTextBox").value(DisPer);

    var HdrLiNotextbox = $("#HdrSec5_NmricLiNo_Val").kendoNumericTextBox({
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
    var Qtytextbox = $("#HdrSec5_NmricQty_Val").kendoNumericTextBox({
        change: function () {
            var value = this.value();
        }
    });
    var Qty = Qtytextbox.val();
    if (Qty == 0 || Qty == "" || Qty == null || Qty == undefined) {
        alert("Qty Cannot be null");
    } else {
        var Ratetextbox = $("#HdrSec5_NmricTrnRate_Val").kendoNumericTextBox({
            change: function () {
                var value = this.value();
            }
        });
        var Rate = Ratetextbox.val();
        var SubTotal = (Qty * Rate);
    }
    var HdrVatAmttextbox = $("#HdrSec5_NmricVatAmt_Val").kendoNumericTextBox({
        change: function () {
            var value = this.value();
        }
    });
    var VatAmt = HdrVatAmttextbox.val();
    if (SubTotal == 0) {
        var VatPer = 0.00;
    } else {
        var VatPer = (VatAmt * 100) / SubTotal;
    }
    $("#HdrSec5_NmricVatPer_Val").data("kendoNumericTextBox").value(VatPer);
    var HdrLiNotextbox = $("#HdrSec5_NmricLiNo_Val").kendoNumericTextBox({
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
    var Qtytextbox = $("#HdrSec5_NmricQty_Val").kendoNumericTextBox({
        change: function () {
            var value = this.value();
        }
    });
    var Qty = Qtytextbox.val();
    if (Qty == 0 || Qty == "" || Qty == null || Qty == undefined) {
        alert("Qty Cannot be null");
    } else {
        var Ratetextbox = $("#HdrSec5_NmricTrnRate_Val").kendoNumericTextBox({
            change: function () {
                var value = this.value();
            }
        });
        var Rate = Ratetextbox.val();
        var SubTotal = (Qty * Rate);
    }
    var HdrNBTAmttextbox = $("#HdrSec5_NmricNbtAmt_Val").kendoNumericTextBox({
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
    $("#HdrSec5_NmricNbtPer_Val").data("kendoNumericTextBox").value(NBTPer);
    var HdrLiNotextbox = $("#HdrSec5_NmricLiNo_Val").kendoNumericTextBox({
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
    var Qtytextbox = $("#HdrSec5_NmricQty_Val").kendoNumericTextBox({
        change: function () {
            var value = this.value();
        }
    });
    var Qty = Qtytextbox.val();
    if (Qty == 0 || Qty == "" || Qty == null || Qty == undefined) {
        alert("Qty Cannot be null");
    } else {
        var Ratetextbox = $("#HdrSec5_NmricTrnRate_Val").kendoNumericTextBox({
            change: function () {
                var value = this.value();
            }
        });
        var Rate = Ratetextbox.val();
        var SubTotal = (Qty * Rate);
    }
    var HdrWHTAmttextbox = $("#HdrSec5_NmricWhtAmt_Val").kendoNumericTextBox({
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
    $("#HdrSec5_NmricWhtPer_Val").data("kendoNumericTextBox").value(WHTPer);
    var HdrLiNotextbox = $("#HdrSec5_NmricLiNo_Val").kendoNumericTextBox({
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
    var Qtytextbox = $("#HdrSec5_NmricQty_Val").kendoNumericTextBox({
        change: function () {
            var value = this.value();
        }
    });
    var Qty = Qtytextbox.val();
    if (Qty == 0 || Qty == "" || Qty == null || Qty == undefined) {
        alert("Qty Cannot be null");
    } else {
        var Ratetextbox = $("#HdrSec5_NmricTrnRate_Val").kendoNumericTextBox({
            change: function () {
                var value = this.value();
            }
        });
        var Rate = Ratetextbox.val();
        var SubTotal = (Qty * Rate);
    }
    var HdrSVatAmttextbox = $("#HdrSec5_NmricSVatAmt_Val").kendoNumericTextBox({
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
    $("#HdrSec5_NmricSVatPer_Val").data("kendoNumericTextBox").value(SVatPer);
    var HdrLiNotextbox = $("#HdrSec5_NmricLiNo_Val").kendoNumericTextBox({
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
    $("#HdrSec4_NmricSubTotal_Val").data("kendoNumericTextBox").value(newSubTValueDoble);
}

function CalDisAmt() {
    var DisAmt = 0;
    var id = ("#" + viewBag.OurCd);
    var grid = $(id).data("kendoGrid");
  //  var gridData = grid.dataSource.view();
    var gridData = grid.dataSource.data();

    for (var i = 0; i < gridData.length; i++) {
        if (gridData[i].isAct == 1)
        {
            DisAmt += gridData[i].DisAmt;
        }
    }
    SetDisAmt(DisAmt);
}

function SetDisAmt(DisAmt) {
    var newDisAmtValueDoble = (DisAmt).toFixed(2);
    $("#HdrSec4_InptDisAmt_Val").data("kendoNumericTextBox").value(newDisAmtValueDoble);
}

function CalVatAmt() {
    var VatAmt = 0;
    var id = ("#" + viewBag.OurCd);
    var grid = $(id).data("kendoGrid");
    var gridData = grid.dataSource.data();

  //  var gridData = grid.dataSource.view();
    for (var i = 0; i < gridData.length; i++) {
        if (gridData[i].isAct == 1)
        {
           VatAmt += gridData[i].VatAmt;
        }
    }
    SetVatAmt(VatAmt);
}

function SetVatAmt(VatAmt) {
    var newVatAmtValueDoble = (VatAmt).toFixed(2);
    $("#HdrSec4_InptVatAmt_Val").data("kendoNumericTextBox").value(newVatAmtValueDoble);
}

function CalWHTAmt() {
    var WHTAmt = 0;
    var id = ("#" + viewBag.OurCd);
    var grid = $(id).data("kendoGrid");
    var gridData = grid.dataSource.data();

 //   var gridData = grid.dataSource.view();
    for (var i = 0; i < gridData.length; i++) {
        if (gridData[i].isAct == 1)
        {
           WHTAmt += gridData[i].WHTAmt;
        }
    }
    SetWHTAmt(WHTAmt);
}

function SetWHTAmt(WHTAmt) {
    var newWHTAmtValueDoble = (WHTAmt).toFixed(2);
    $("#HdrSec4_InptWhtAmt_Val").data("kendoNumericTextBox").value(newWHTAmtValueDoble);
}

function CalNBTAmt() {
    var NBTAmt = 0;
    var id = ("#" + viewBag.OurCd);
    var grid = $(id).data("kendoGrid");
    var gridData = grid.dataSource.data();

  //  var gridData = grid.dataSource.view();
    for (var i = 0; i < gridData.length; i++) {
        if (gridData[i].isAct == 1)
        {
            NBTAmt += gridData[i].NBTAmt;
        }
    }
    SetNBTAmt(NBTAmt);
}

function SetNBTAmt(NBTAmt) {
    var newNBTAmtValueDoble = (NBTAmt).toFixed(2);
    $("#HdrSec4_InptNbtAmt_Val").data("kendoNumericTextBox").value(newNBTAmtValueDoble);
}

function CalSVatAmt() {
    var SVatAmt = 0;
    var id = ("#" + viewBag.OurCd);
    var grid = $(id).data("kendoGrid");
    var gridData = grid.dataSource.data();

 //   var gridData = grid.dataSource.view();
    for (var i = 0; i < gridData.length; i++) {
        if (gridData[i].isAct == 1)
        {
           SVatAmt += gridData[i].SVatAmt;
        }
    }
    SetSVatAmt(SVatAmt);
}

function SetSVatAmt(SVatAmt) {
    var newSVatAmtValueDoble = (SVatAmt).toFixed(2);
    $("#HdrSec4_InptSVatAmt_Val").data("kendoNumericTextBox").value(newSVatAmtValueDoble);
}

function CalTotal() {

    var subtotal = $("#HdrSec4_NmricSubTotal_Val").data("kendoNumericTextBox").value();
    var Discount = $("#HdrSec4_InptDisAmt_Val").data("kendoNumericTextBox").value();
    var NBT = $("#HdrSec4_InptNbtAmt_Val").data("kendoNumericTextBox").value();
    var Vat = $("#HdrSec4_InptVatAmt_Val").data("kendoNumericTextBox").value();
    var WHT = $("#HdrSec4_InptWhtAmt_Val").data("kendoNumericTextBox").value();
    var Svat = $("#HdrSec4_InptSVatAmt_Val").data("kendoNumericTextBox").value();
    
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

    var TotalVal = Number(subtotal) + Number(NBT) + Number(Vat) + Number(WHT);
    var FinalTotal = TotalVal - Number(Discount);
    var FinalTotalDoble = (FinalTotal).toFixed(2);
    var FinalTotalDoubleSeperate = FinalTotalDoble.toLocaleString();

    $("#HdrSec4_InptSumTotalAmt_Val").data("kendoNumericTextBox").value(FinalTotalDoubleSeperate);
}

function CaluculateSubTotal() {
    var id = ("#" + viewBag.OurCd);
    var grid = $(id).data("kendoGrid");
    var newSubTValue = 0;
    $.each(grid.dataSource.data(), function (index, model) {
        newSubTValue += model.get("SubTotal");
    });
    SetTotalSubTotalVal(newSubTValue);

}

function SetTotalSubTotalVal(newSubTValue) {
    var newSubTValueDoble = (newSubTValue).toFixed(2);

    $("#HdrSec4_NmricSubTotal_Val").data("kendoNumericTextBox").value(newSubTValueDoble);
}

function CaluculateDisAmt() {
    var id = ("#" + viewBag.OurCd);
    var grid = $(id).data("kendoGrid");
    var newDisTValue = 0;
    $.each(grid.dataSource.data(), function (index, model) {
        newDisTValue += model.get("DisAmt");
    });
    SetTotalDisAmtVal(newDisTValue);
}

function SetTotalDisAmtVal(newDisTValue) {
    var newDisTValueDoble = (newDisTValue).toFixed(2);

    $("#HdrSec4_InptDisAmt_Val").data("kendoNumericTextBox").value(newDisTValueDoble);
}

function CaluculateVatAmt() {
    var id = ("#" + viewBag.OurCd);
    var grid = $(id).data("kendoGrid");
    var newVatTValue = 0;
    $.each(grid.dataSource.data(), function (index, model) {
        newVatTValue += model.get("VatAmt");
    });
    SetTotalVatAmtVal(newVatTValue);
}

function SetTotalVatAmtVal(newVatTValue) {
    var newVatTValueDoble = (newVatTValue).toFixed(2);

    $("#HdrSec4_InptVatAmt_Val").data("kendoNumericTextBox").value(newVatTValueDoble);
}

function CaluculateWHTAmt() {
    var id = ("#" + viewBag.OurCd);
    var grid = $(id).data("kendoGrid");
    var newWhtTValue = 0;
    $.each(grid.dataSource.data(), function (index, model) {
        newWhtTValue += model.get("WHTAmt");
    });
    SetTotalWHTAmtVal(newWhtTValue);
}

function SetTotalWHTAmtVal(newWhtTValue) {
    var newWhtTValueDoble = (newWhtTValue).toFixed(2);

    $("#HdrSec4_InptWhtAmt_Val").data("kendoNumericTextBox").value(newWhtTValueDoble);
}

function CaluculateNBTAmt() {
    var id = ("#" + viewBag.OurCd);
    var grid = $(id).data("kendoGrid");
    var newNbtTValue = 0;
    $.each(grid.dataSource.data(), function (index, model) {
        newNbtTValue += model.get("NBTAmt");
    });
    SetTotalNBTAmtVal(newNbtTValue);
}

function SetTotalNBTAmtVal(newNbtTValue) {
    var newNbtTValueDoble = (newNbtTValue).toFixed(2);

    $("#HdrSec4_InptNbtAmt_Val").data("kendoNumericTextBox").value(newNbtTValueDoble);
}

function CaluculateSVATAmt() {
    var id = ("#" + viewBag.OurCd);
    var grid = $(id).data("kendoGrid");
    var newSvatTValue = 0;
    $.each(grid.dataSource.data(), function (index, model) {
        newSvatTValue += model.get("SVatAmt");
    });
    SetTotalSVatAmtVal(newSvatTValue);
}

function SetTotalSVatAmtVal(newSvatTValue) {
    var newSvatTValueDoble = (newSvatTValue).toFixed(2);

    $("#HdrSec4_InptSVatAmt_Val").data("kendoNumericTextBox").value(newSvatTValueDoble);
}

function CaluculateTotal() {

    var subtotal = $("#HdrSec4_NmricSubTotal_Val").data("kendoNumericTextBox").value();
    var Discount = $("#HdrSec4_InptDisAmt_Val").data("kendoNumericTextBox").value();
    var NBT = $("#HdrSec4_InptNbtAmt_Val").data("kendoNumericTextBox").value();
    var Vat = $("#HdrSec4_InptVatAmt_Val").data("kendoNumericTextBox").value();
    var WHT = $("#HdrSec4_InptWhtAmt_Val").data("kendoNumericTextBox").value();
    var Svat = $("#HdrSec4_InptSVatAmt_Val").data("kendoNumericTextBox").value();

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


    var TotalVal = Number(subtotal) + Number(NBT) + Number(Vat) + Number(WHT);
    var FinalTotal = TotalVal - Number(Discount);
    var FinalTotalDoble = (FinalTotal).toFixed(2);
    var FinalTotalDoubleSeperate = FinalTotalDoble.toLocaleString();

    $("#HdrSec4_InptSumTotalAmt_Val").data("kendoNumericTextBox").value(FinalTotalDoubleSeperate);
}
