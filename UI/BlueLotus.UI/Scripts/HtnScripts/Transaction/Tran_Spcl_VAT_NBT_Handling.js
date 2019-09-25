
// -- HDR (If Header level), DET (If Detail level)
var Spcl_VatHandling_Data = {
    VATAmtChangedFrom: 'DET',     // By default its comming from DET
    NBTAmtChangedFrom: 'DET'      // By default its comming from DET
}


// -- Header VAT handling (HdrSec4_InptVatAmt_Val)
// -- Detail VAT handling (HdrSec5_NmricVatPer_Val, HdrSec5_NmricVatAmt_Val)
$("#HdrSec4_InptVatAmt_Val").keypress(function () {
    Spcl_VatHandling_Data.VATAmtChangedFrom = 'HDR';
    console.log("VATAmtChangedFrom : HDR");
    CalVatAmt();
});


$("#HdrSec5_NmricVatPer_Val").keypress(function () {
    Spcl_VatHandling_Data.VATAmtChangedFrom = 'DET';
    console.log("VATAmtChangedFrom : DET");
});
$("#HdrSec5_NmricVatAmt_Val").keypress(function () {
    Spcl_VatHandling_Data.VATAmtChangedFrom = 'DET';
    console.log("VATAmtChangedFrom : DET");
});



//
// -- Calculation VAT
function CalVatAmt() {
    if (Spcl_VatHandling_Data.VATAmtChangedFrom == 'HDR') {

        var hdtVatAmt = $("#HdrSec4_InptVatAmt_Val").data("kendoNumericTextBox").value();

        var id = ("#" + viewBag.OurCd);
        var grid = $(id).data("kendoGrid");
        var gridData = grid.dataSource.view();

        // New Handling BY : VgSan
        var vatOldAmtCal = 0;
        var vatNewAmtCal = Number(hdtVatAmt);

        // Calculate VATAMt Interme Value
        for (var i = 0; i < gridData.length; i++) {
            vatOldAmtCal = vatOldAmtCal + gridData[i].VatAmt;
        }

        // Calculate Vat and Set to grid details.
        for (var i = 0; i < gridData.length; i++) {
            var vatAmt = (gridData[i].VatAmt / vatOldAmtCal) * vatNewAmtCal;
            gridData[i].set("VatAmt", vatAmt);
        }

        // Calculate LineAmt and Set to grid details.
        for (var i = 0; i < gridData.length; i++) {

            //// Its handling different IsTrnRateInclusiveTaxTyp1_VAT vat calculation
            //var vatamttemp = 100;
            ////if (CdMasModel.IsTrnRateInclusiveTaxTyp1_VAT == 1) {
            ////    vatamttemp = (100 + Number(vatPer));
            ////}

            //var tempTop = gridData[i].VatAmt * 100 * vatamttemp;
            //var tempBotm = gridData[i].VAT * (100 - gridData[i].DisPer + gridData[i].NBT);
            //if (tempBotm > 0) {
            //    var lineAmt = tempTop / tempBotm;
            //    gridData[i].set("SubTotal", lineAmt);

            //    var disAmtNew = (gridData[i].DisPer / 100) * lineAmt;
            //    var nbtAmtNew = (gridData[i].NBT / 100) * lineAmt;
            //    var rateNew = lineAmt / gridData[i].TrnQty;
            //    gridData[i].set("DisAmt", disAmtNew);
            //    gridData[i].set("NBTAmt", nbtAmtNew);
            //    gridData[i].set("TrnRate", rateNew);
            //}

            
            var tempTop = gridData[i].VatAmt * 100 * (100 - gridData[i].NBT);
            var tempBotm = gridData[i].VAT * (100 - gridData[i].DisPer);
            if (tempBotm > 0) {
                var lineAmt = tempTop / tempBotm;
                gridData[i].set("SubTotal", lineAmt);

                var disAmtNew = (gridData[i].DisPer / 100) * lineAmt;
                var nbtAmtNew = (gridData[i].NBT / 100) * (lineAmt - disAmtNew);
                var rateNew = lineAmt / gridData[i].TrnQty;
                gridData[i].set("DisAmt", disAmtNew);
                gridData[i].set("NBTAmt", nbtAmtNew);
                gridData[i].set("TrnRate", rateNew);
            }
        }
    }
    else if (Spcl_VatHandling_Data.VATAmtChangedFrom == 'DET') {

        var id = ("#" + viewBag.OurCd);
        var grid = $(id).data("kendoGrid");
        var gridData = grid.dataSource.view();
        for (var i = 0; i < gridData.length; i++) {

            var vatPer = gridData[i].VAT;
            var lineAmt = gridData[i].SubTotal;
            // Its handling different IsTrnRateInclusiveTaxTyp1_VAT vat calculation
            var vatamttemp = (Number(vatPer) / 100);
            //if (CdMasModel.IsTrnRateInclusiveTaxTyp1_VAT == 1) {
            //    vatamttemp = (Number(vatPer) / (100 + Number(vatPer)));
            //}

            var VatAmt = vatamttemp * (lineAmt - gridData[i].DisAmt + gridData[i].NBTAmt);
            gridData[i].set("VatAmt", VatAmt);
        }

        var VatAmt = 0;
        for (var i = 0; i < gridData.length; i++) {
            if (gridData[i].IsAct == 1)
            VatAmt += gridData[i].VatAmt;
        }

        SetVatAmt(VatAmt);
    }
}

function SetVatAmt(VatAmt) {
    var newVatAmtValueDoble = (VatAmt).toFixed(2);
    $("#HdrSec4_InptVatAmt_Val").data("kendoNumericTextBox").value(newVatAmtValueDoble);
}




// -- Header NBT handling (HdrSec4_InptNbtAmt_Val)
// -- Detail NBT handling (HdrSec5_NmricNbtPer_Val, HdrSec5_NmricNbtAmt_Val)
$("#HdrSec4_InptNbtAmt_Val").keypress(function () {
    Spcl_VatHandling_Data.NBTAmtChangedFrom = 'HDR';
    console.log("NBTAmtChangedFrom : HDR");
    CalNBTAmt();
});


$("#HdrSec5_NmricNbtPer_Val").keypress(function () {
    Spcl_VatHandling_Data.NBTAmtChangedFrom = 'DET';
    console.log("NBTAmtChangedFrom : DET");
});
$("#HdrSec5_NmricNbtAmt_Val").keypress(function () {
    Spcl_VatHandling_Data.NBTAmtChangedFrom = 'DET';
    console.log("NBTAmtChangedFrom : DET");
});


//
// -- Calculation NBT
function CalNBTAmt() {
    if (Spcl_VatHandling_Data.NBTAmtChangedFrom == 'HDR') {
        var hdtNbtAmt = $("#HdrSec4_InptNbtAmt_Val").data("kendoNumericTextBox").value();

        var id = ("#" + viewBag.OurCd);
        var grid = $(id).data("kendoGrid");
        var gridData = grid.dataSource.view();

        var nbtNewAmtCal = Number(hdtNbtAmt);

        var nbtOldAmtCal = 0;
        // Calculate NBTAmt Interme Value
        for (var i = 0; i < gridData.length; i++) {
            nbtOldAmtCal = nbtOldAmtCal + gridData[i].NBTAmt;
        }

        for (var i = 0; i < gridData.length; i++) {
            if (nbtOldAmtCal > 0) {
                var newDetNbtAmt = (gridData[i].NBTAmt / nbtOldAmtCal) * nbtNewAmtCal
                gridData[i].set("NBTAmt", newDetNbtAmt);

                if (gridData[i].SubTotal > 0) {
                    var newDetNbtPer = (newDetNbtAmt * 100) / (gridData[i].SubTotal - gridData[i].DisAmt + newDetNbtAmt);
                    gridData[i].set("NBT", newDetNbtPer);
                }
            }
        }
    }
    else if (Spcl_VatHandling_Data.NBTAmtChangedFrom == 'DET') {
        var NBTAmt = 0;
        var id = ("#" + viewBag.OurCd);
        var grid = $(id).data("kendoGrid");
        var gridData = grid.dataSource.view();
        for (var i = 0; i < gridData.length; i++) {
            if (gridData[i].IsAct == 1) {
                NBTAmt += gridData[i].NBTAmt;
                SetNBTAmt(NBTAmt);
            }
            
        }
    }
}

function SetNBTAmt(NBTAmt) {
    var newNBTAmtValueDoble = (NBTAmt).toFixed(2);
    $("#HdrSec4_InptNbtAmt_Val").data("kendoNumericTextBox").value(newNBTAmtValueDoble);
}