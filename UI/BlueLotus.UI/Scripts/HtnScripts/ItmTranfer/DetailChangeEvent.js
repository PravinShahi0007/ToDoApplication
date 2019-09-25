
// $("span.k-numerictextbox").css('width', "100%");

// change Existing Line
function changeItemRalatedTotal() {

    var Qtytextbox = $("#HdrSec7_InptQty_Val").kendoNumericTextBox({
        spinners: false,
        change: function () {
            var value = this.value();
        }
    });
    var Qty = Qtytextbox.val();
    if (Qty == 0 || Qty == "" || Qty == null || Qty == undefined) {
        alert("Qty Cannot be null");
    } else {
        var Ratetextbox = $("#HdrSec7_InptRate_Val").kendoNumericTextBox({
            spinners: false,
            change: function () {
                var value = this.value();
            }
        });
        var Rate = Ratetextbox.val();
        var SubTotal = (Qty * Rate);
        $("#HdrSec4_InptSubTot_Val").data("kendoNumericTextBox").value(SubTotal);
        var HdrDisPertextbox = $("#HdrSec7_InptDis_Val").kendoNumericTextBox({
            spinners: false,
            change: function () {
                var value = this.value();
            }
        });
        var DisPer = HdrDisPertextbox.val();
        var DisAmt = (DisPer / 100) * SubTotal;
        $("#HdrSec7_InptDisAmt_Val").data("kendoNumericTextBox").value(DisAmt);
        var HdrVatPertextbox = $("#HdrSec8_InptVat_Val").kendoNumericTextBox({
            spinners: false,
            change: function () {
                var value = this.value();
            }
        });
        var VatPer = HdrVatPertextbox.val();
        var VatAmt = (VatPer / 100) * SubTotal;
        $("#HdrSec8_InptVatAmt_Val").data("kendoNumericTextBox").value(VatAmt);
        var HdrSVatPertextbox = $("#HdrSec9_InptSVAT_Val").kendoNumericTextBox({
            spinners: false,
            change: function () {
                var value = this.value();
            }
        });

        var VatPer = HdrVatPertextbox.val();

        //// Its temp solution handling different company vat calculation
        //var vatamttemp = (Number(VatPer) / (100 + Number(VatPer)));
        //if (tempCKy == 77) {
        //    vatamttemp = (Number(VatPer) / 100);
        //}

        // Its handling different IsTrnRateInclusiveTaxTyp1_VAT vat calculation
        var vatamttemp = (Number(VatPer) / (100 + Number(VatPer)));
        if (CdMasModel.IsTrnRateInclusiveTaxTyp1_VAT == 0) {
            vatamttemp = (Number(VatPer) / 100);
        }

        var VatAmt = vatamttemp * (SubTotal - DisAmt);
        $("#HdrSec8_InptVatAmt_Val").data("kendoNumericTextBox").value(VatAmt);
        var HdrSVatPertextbox = $("#HdrSec9_InptSVAT_Val").kendoNumericTextBox({
            spinners: false,
            change: function () {
                var value = this.value();
            }
        });

        var SVatPer = HdrSVatPertextbox.val();
        var SVatAmt = (SVatPer / 100) * SubTotal;
        $("#HdrSec9_InptSVATAmt_Val").data("kendoNumericTextBox").value(SVatAmt);
        var HdrNBTPertextbox = $("#HdrSec8_InptNBT_Val").kendoNumericTextBox({
            spinners: false,
            change: function () {
                var value = this.value();
            }
        });

        var NBTPer = HdrNBTPertextbox.val();
        var NBTAmt = (NBTPer / 100) * SubTotal;
        $("#HdrSec8_InptNBTAmt_Val").data("kendoNumericTextBox").value(NBTAmt);
        var HdrWHTPertextbox = $("#HdrSec9_InptWHT_Val").kendoNumericTextBox({
            spinners: false,
            change: function () {
                var value = this.value();
            }
        });

        var WHTPer = HdrWHTPertextbox.val();
        var WHTAmt = (WHTPer / 100) * SubTotal;
        $("#HdrSec9_InptWHTAmt_Val").data("kendoNumericTextBox").value(WHTAmt);

        SetChangedItemDetails();
    }
}

function SetChangedItemDetails() {

    var ItmCd = $("#HdrSec6_CmbItm_Cd").data("kendoComboBox").text();
    var ItmNm = $("#HdrSec6_CmbItm_Cd").data("kendoComboBox").text();
    var ItmKy = $("#HdrSec6_CmbItm_Cd").data("kendoComboBox").value();
    var UnitKy = $("#HdrSec6_CmbUnit_Cd").data("kendoComboBox").value();
    var Unit = $("#HdrSec6_CmbUnit_Cd").data("kendoComboBox").text();
    var TaskId = $("#HdrSec10_CmbTskId_Cd").data("kendoComboBox").text();
    var TaskKy = $("#HdrSec10_CmbTskId_Cd").data("kendoComboBox").value();
    if (TaskKy == "" || TaskKy == null || TaskKy == 0 || TaskKy == undefined) {
        TaskKy = 1;
    }
    var Anly3Cd = $("#HdrSec6_CmbAnal_Cd").data("kendoComboBox").text();
    var Anly3Ky = $("#HdrSec6_CmbAnal_Cd").data("kendoComboBox").value();
    if (Anly3Ky == "" || Anly3Ky == null || Anly3Ky == 0 || Anly3Ky == undefined) {
        Anly3Ky = 1;
    }
    var DesforItmTransfer = $("#HdrSec6_InptDesc_Val").val();
    var RemforItmTransfer = $("#HdrSec10_InptRem_Val").val();
    var Qtytextbox = $("#HdrSec7_InptQty_Val").kendoNumericTextBox({
        spinners: false,
        change: function () {
            var value = this.value();
        }
    });
    var Qty = Qtytextbox.val();
    var Ratetextbox = $("#HdrSec7_InptRate_Val").kendoNumericTextBox({
        spinners: false,
        change: function () {
            var value = this.value();
        }
    });
    var Rate = Ratetextbox.val();
    var HdrDisPertextbox = $("#HdrSec7_InptDis_Val").kendoNumericTextBox({
        spinners: false,
        change: function () {
            var value = this.value();
        }
    });
    var DisPer = HdrDisPertextbox.val();
    if (isNaN(DisPer)) {
        DisPer = 0;
    }
    var HdrDisAmttextbox = $("#HdrSec7_InptDisAmt_Val").kendoNumericTextBox({
        spinners: false,
        change: function () {
            var value = this.value();
        }
    });
    var DisAmt = HdrDisAmttextbox.val();
    if (isNaN(DisAmt)) {
        DisAmt = 0;
    }
    var HdrVatAmttextbox = $("#HdrSec8_InptVatAmt_Val").kendoNumericTextBox({
        spinners: false,
        change: function () {
            var value = this.value();
        }
    });
    var VatAmt = HdrVatAmttextbox.val();
    if (isNaN(VatAmt)) {
        VatAmt = 0;
    }
    var HdrVatPertextbox = $("#HdrSec8_InptVat_Val").kendoNumericTextBox({
        spinners: false,
        change: function () {
            var value = this.value();
        }
    });
    var VatPer = HdrVatPertextbox.val();
    if (isNaN(VatPer)) {
        VatPer = 0;
    }
    var HdrVatAmttextbox = $("#HdrSec8_InptVatAmt_Val").kendoNumericTextBox({
        spinners: false,
        change: function () {
            var value = this.value();
        }
    });
    var VatAmt = HdrVatAmttextbox.val();
    if (isNaN(VatAmt)) {
        VatAmt = 0;
    }
    var HdrSVatPertextbox = $("#HdrSec9_InptSVAT_Val").kendoNumericTextBox({
        spinners: false,
        change: function () {
            var value = this.value();
        }
    });
    var SVatPer = HdrSVatPertextbox.val();
    if (isNaN(SVatPer)) {
        SVatPer = 0;
    }
    var HdrSVatAmttextbox = $("#HdrSec9_InptSVATAmt_Val").kendoNumericTextBox({
        spinners: false,
        change: function () {
            var value = this.value();
        }
    });
    var SVatAmt = HdrSVatAmttextbox.val();
    if (isNaN(SVatAmt)) {
        SVatAmt = 0;
    }
    var HdrNBTPertextbox = $("#HdrSec8_InptNBT_Val").kendoNumericTextBox({
        spinners: false,
        change: function () {
            var value = this.value();
        }
    });
    var NBTPer = HdrNBTPertextbox.val();
    if (isNaN(NBTPer)) {
        NBTPer = 0;
    }
    var HdrNBTAmttextbox = $("#HdrSec8_InptNBTAmt_Val").kendoNumericTextBox({
        spinners: false,
        change: function () {
            var value = this.value();
        }
    });
    var NBTAmt = HdrNBTAmttextbox.val();
    if (isNaN(NBTAmt)) {
        NBTAmt = 0;
    }
    var HdrWHTPertextbox = $("#HdrSec9_InptWHT_Val").kendoNumericTextBox({
        spinners: false,
        change: function () {
            var value = this.value();
        }
    });
    var WHTPer = HdrWHTPertextbox.val();
    if (isNaN(WHTPer)) {
        WHTPer = 0;
    }
    var HdrWHTAmttextbox = $("#HdrSec9_InptWHTAmt_Val").kendoNumericTextBox({
        spinners: false,
        change: function () {
            var value = this.value();
        }
    });
    var WHTAmt = HdrWHTAmttextbox.val();
    if (isNaN(WHTAmt)) {
        WHTAmt = 0;
    }

    var Subtotaltextbox = $("#HdrSec4_InptSubTot_Val").kendoNumericTextBox({
        spinners: false,
        change: function () {
            var value = this.value();
        }
    });
    var subtotal = Subtotaltextbox.val();
    var HdrLiNotextbox = $("#HdrSec10_InptLiNo_Val").kendoNumericTextBox({
        spinners: false,
        change: function () {
            var value = this.value();
        }
    });

    var id = ("#" + viewBag.OurCd);

    var count = $(id).data().kendoGrid.dataSource.total();
    var LiNo = HdrLiNotextbox.val();

    var LiNoForChange = LiNo;

    var firstItemData = $(id).data().kendoGrid.dataSource.data();
    for (var i = 0; i < firstItemData.length; i++) {
        if (firstItemData[i].LiNo == LiNo) {
            LiNoForChange = i
        }

    }
    var firstItem = firstItemData[LiNoForChange];//[count - LiNoForChange];

    firstItem.set("TrnRate", Rate);
    firstItem.set("DisPer", DisPer);
    firstItem.set("VAT", VatPer);
    firstItem.set("NBT", NBTPer);
    firstItem.set("SVAT", SVatPer);
    firstItem.set("WHT", WHTPer);
    firstItem.set("TrnQty", Qty)
    firstItem.set("SubTotal", subtotal);
    firstItem.set("Des", DesforItmTransfer);
    firstItem.set("Rem", RemforItmTransfer);
    firstItem.set("DisAmt", DisAmt);
    firstItem.set("VatAmt", VatAmt);
    firstItem.set("WHTAmt", WHTAmt);
    firstItem.set("NBTAmt", NBTAmt);
    firstItem.set("PrcsDetKy", TaskKy);
    firstItem.set("SVatAmt", SVatAmt);
    firstItem.set("LiNo", LiNo);
    firstItem.set("Unit", Unit);
    firstItem.set("UnitKy", UnitKy);
    firstItem.set("ItmCd", ItmCd);
    //firstItem.set("ItmNm", ItmNm);
    firstItem.set("ItmKy", ItmKy);
    firstItem.set("Anl3Ky", Anly3Ky);
    firstItem.set("Anl3Cd", Anly3Cd);
  //  firstItem.set("AvlStk", Qty);
    Calculatetotal();

}

function ChangeItmDetail() {

    var id = ("#" + viewBag.OurCd);
    var grid = $(id).data("kendoGrid");
    var dataSource = grid.dataSource;
    var total = dataSource.data().length;

    if (total > 1) {
        var answer = confirm("Are you want to update rate !");
        if (answer) {
            var id = ("#" + viewBag.OurCd);
            var dataSource = $(id).data("kendoGrid").dataSource.data();
            for (var i = 0; i < dataSource.length; i++) {

                var ItmCdForChange = dataSource[i].ItmCd;
                var lino = dataSource[i].LiNo;
                var AdrKy = $("#HdrSec2_CmbAdr_Cd").data('kendoComboBox').value();
                if (AdrKy == 0 || AdrKy == null) {
                    var AdrKy = 1;
                }
                var FrmLocKy = $("#cmbFmLocId").data('kendoComboBox').value();
                if (FrmLocKy == 0 || FrmLocKy == null) {
                    var FrmLocKy = 1;
                }

                var PrjKy = 1;
                var Dt = $("#HdrSec1_DatPicDate_Val").val();
                if (ItmCdForChange == null || ItmCdForChange == "" || ItmCdForChange == undefined || lino == 0 || lino == undefined) {

                } else {
                    $.ajax({
                        url: urlTransaction.PnsItemsLookUpByItmCd,
                        dataType: "json",
                        type: "POST",
                        data: JSON.stringify({
                            ConCd: "TrnTyp", OurCd: viewBag.OurCd, ItmCd: ItmCdForChange,
                            AdrKy: AdrKy,
                            LocKy: FrmLocKy,
                            PrjKy: PrjKy,
                            Dat: Dt,
                            Lino: lino
                        }),
                        contentType: 'application/json; charset=utf-8',
                        success: function (list) {
                            if (list.length == 0 || list.length == null) {
                                alert("Cannot find the item !");
                            } else {

                                for (j = 0; j < list.length; j++) {

                                    var Rate = list[0].Rate;
                                    var LiNoForChange = list[0].LiNo;
                                    var DisPer = list[0].Disper;
                                    var VAT = list[0].VAT;
                                    var NBT = list[0].NBT;
                                    var SVAT = list[0].SVAT;
                                    var WHT = list[0].WHT;
                                    var id = ("#" + viewBag.OurCd);
                                    var firstItem = $(id).data().kendoGrid.dataSource.data()[LiNoForChange - 1];

                                    firstItem.set("TrnRate", Rate);
                                    firstItem.set("DisPer", DisPer);
                                    firstItem.set("VAT", VAT);
                                    firstItem.set("NBT", NBT);
                                    firstItem.set("SVAT", SVAT);
                                    firstItem.set("WHT", WHT);

                                    var TrnQty = firstItem.get("TrnQty")
                                    var TSubTotal = firstItem.set("SubTotal", (TrnQty * Rate));
                                    var SubTotal = (TrnQty * Rate);

                                    var Disamt = (DisPer / 100) * SubTotal;
                                    firstItem.set("DisAmt", Disamt);

                                    var VATamt = (VAT / 100) * SubTotal;
                                    firstItem.set("VatAmt", VATamt);

                                    var WHTamt = (WHT / 100) * SubTotal;
                                    firstItem.set("WHTAmt", WHTamt);

                                    var NBTamt = (NBT / 100) * SubTotal;
                                    firstItem.set("NBTAmt", NBTamt);

                                    var SVATamt = (SVAT / 100) * SubTotal;
                                    firstItem.set("SVatAmt", SVATamt);
                                }
                            }
                        },
                        error: function (e) { }
                    })
                }
            }
        }
    }
}

// Bind New line
function setItmDetailbyEnterky() {
    var AdrKy = 1;
    var FrmLocKy = $("#HdrSec2_CmbFrmLoc_Cd").data('kendoComboBox').value();
    if (FrmLocKy == 0 || FrmLocKy == null) {
        var FrmLocKy = 1;
    }
    var PrjKy = $("#HdrSec2_CmbFrmPrj_Cd").data('kendoComboBox').value(); PrjKy == null || PrjKy == "" || PrjKy == undefined ? PrjKy = 1 : PrjKy
    var Dt = $("#HdrSec1_DatPicDate_Val").val();

    var value = $("#HdrSec6_CmbItm_Cd").data('kendoComboBox').text();
    var valueItmKy = $("#HdrSec6_CmbItm_Cd").data('kendoComboBox').value();

    var qty = $("#HdrSec7_InptQty_Val").val();
    if (value != 0 || value != null) {
        if (qty == 0 || qty == null || qty == undefined || qty == "") {
            alert("Qty cannot be null !");

        } else {

            $.ajax({
                url: urlTransaction.ItemsLookUpByItmCd,
                dataType: "json",
                type: "POST",
                data: JSON.stringify({
                    ObjKy: viewBag.ObjKy,
                    ConCd: "TrnTyp",
                    OurCd: viewBag.OurCd,
                    ItmCd: value,
                    AdrKy: AdrKy,
                    LocKy: FrmLocKy,
                    PrjKy: PrjKy,
                    Dt: Dt,
                    ItmKy: valueItmKy

                }),
                contentType: 'application/json; charset=utf-8',
                success: function (list) {


                    if (list.length == 0 || list.length == null) {
                        alert("Cannot find the item !");

                    } else {

                        for (i = 0; i < list.length; i++) {

                            var itmcd = list[0].ItmCd;
                            var itmky = list[0].ItmKy;
                            var itmnm = list[0].ItmNm;

                            var Rate = $("#HdrSec7_InptRate_Val").data("kendoNumericTextBox").value();

                            if (Rate <= 0)
                                Rate = list[0].Rate;

                            var UnitKy = list[0].UnitKy;
                            var Unit = list[0].Unit;

                            var DisPer = $("#HdrSec7_InptDis_Val").data("kendoNumericTextBox").value();
                            if (DisPer <= 0)
                                DisPer = list[0].Disper;

                            var VAT = list[0].VAT;
                            var NBT = list[0].NBT;
                            var SVAT = list[0].SVAT;
                            var WHT = list[0].WHT;


                            var SubTotal = (qty * Rate);
                            var Disamt = (DisPer / 100) * SubTotal;
                            var VATamt = (VAT / 100) * SubTotal;
                            var WHTamt = (WHT / 100) * SubTotal;
                            var NBTamt = (NBT / 100) * SubTotal;
                            var SVATamt = (SVAT / 100) * SubTotal;

                            AddPropToChild(itmcd, itmky, itmnm, Unit, UnitKy, Rate, DisPer, VAT, NBT, SVAT, WHT, SubTotal, Disamt, VATamt, WHTamt, NBTamt, SVATamt, qty);
                            $("#HdrSec6_CmbItm_Cd").data('kendoComboBox').value(null);
                            $("#HdrSec6_CmbItm_Nm").data('kendoComboBox').value(null);


                            $("#HdrSec7_InptQty_Val").val(null);
                            $("#HdrSec6_CmbItm_Cd").data("kendoComboBox").input.focus();

                            //var id = ("#" + viewBag.OurCd);
                            //var grid = $(id).data("kendoGrid");
                            //grid.dataSource.read();
                            //var count = grid.dataSource.total();
                            // setRow(count, e.model);
                        }
                    }
                },
                error: function (e) {
                    alert("Network Conection Error Please Reload the Page");
                }
            });
        }
    }
}


function AddPropToChild(itmcd, itmky, itmnm, Unit, UnitKy, Rate, DisPer, VAT, NBT, SVAT, WHT, SubTotal, Disamt, VATamt, WHTamt, NBTamt, SVATamt, qty) {

    if (isNaN(UnitKy)) {
        alert("Something wrong in Unit Configuration Please Check it");
        return;

    }

    var TaskId = $("#HdrSec10_CmbTskId_Cd").data("kendoComboBox").text();
    var TaskKy = $("#HdrSec10_CmbTskId_Cd").data("kendoComboBox").value();
    if (TaskKy == "" || TaskKy == null || TaskKy == 0 || TaskKy == undefined) {
        TaskKy = 1;
    }
    var ourcd = viewBag.OurCd;
    if (ourcd == "SLSRTN") {
        var Anly3Ky = $("#HdrSec6_CmbAnal_Cd").data('kendoComboBox').value();
        var Anly3Cd = $("#HdrSec6_CmbAnal_Cd").data('kendoComboBox').text();
    } else {
        var Anly3Ky = 1;
        var Anly3Cd = "";
    }
    var Des = $("#HdrSec6_InptDesc_Val").val();
    var Rem = $("#HdrSec10_InptRem_Val").val();
    var id = ("#" + viewBag.OurCd);
    var child = $(id).data("kendoGrid");
    var dataSource = child.dataSource;

    var count = $(id).data().kendoGrid.dataSource.total();

    var lineNo = count + 1;

    dataSource.insert(count, {
        LiNo: lineNo,
        ItmCd: itmcd,
        ItmKy: itmky,
        //ItmNm: itmnm,
        TrnQty: qty,
        TrnRate: Rate,
        SubTotal: SubTotal,
        DisPer: DisPer,
        DisAmt: Disamt,
        UnitKy: UnitKy,
        Unit: Unit,
        VAT: VAT,
        VatAmt: VATamt,
        NBT: NBT,
        NBTAmt: NBTamt,
        SVAT: SVAT,
        SVatAmt: SVATamt,
        WHT: WHT,
        WHTAmt: WHTamt,
        Anl3Ky: Anly3Ky,
        Anl3Cd: Anly3Cd,
        Des: Des,
        Rem: Rem,
        TaskKy:TaskKy, // narmada
      //  AvlStk: qty, // change by narmada
        IsAct: 1

    });
    Calculatetotal();
    //var id = ("#" + viewBag.OurCd);
    //var grid = $(id).data("kendoGrid");
}

function setProp(itmcd, itmky, itmnm, Unit, UnitKy, Rate, Disper, VAT, NBT, SVAT, WHT, model) {

    var exchangeTestCd = model.set("ItmCd", itmcd);
    var exchangeTesKy = model.set("ItmKy", itmky);
    var exchangeTesNm = model.set("ItmNm", itmnm);
    var exchangeTesRate = model.set("TrnRate", Rate);
    var exchangeTesDisPer = model.set("DisPer", Disper);
    var exchangeTesunitky = model.set("UnitKy", UnitKy);
    var exchangeTesunit = model.set("Unit", Unit);
    var exchangeTesVAT = model.set("VAT", VAT);
    var exchangeTesNBT = model.set("NBT", NBT);
    var exchangeTesSVAT = model.set("SVAT", SVAT);
    var exchangeTesWHT = model.set("WHT", WHT);
}

// Dbl click on detail level grid
$("#" + viewBag.OurCd).on("dblclick", "tr.k-state-selected", function () {

    var id = ("#" + viewBag.OurCd);
    var grid = $(id).data().kendoGrid;
    var selectedItem = grid.dataItem(grid.select());
    var ItmKy = selectedItem.ItmKy;
    serNoUpdateItm.Ky = ItmKy;

    if (ItmKy != "" || ItmKy != undefined || ItmKy != null) {
        LoadUnitCombo(ItmKy);
        var LiNo = selectedItem.LiNo;
        var ItmCd = selectedItem.ItmCd;
        var ItmNm = selectedItem.ItmNm;
        var Qty = selectedItem.TrnQty;

        var Unit = selectedItem.Unit;
        var UnitKy = selectedItem.UnitKy;
        var Rate = selectedItem.TrnRate;
        var LiNo = selectedItem.LiNo;
        var DisPer = selectedItem.DisPer;
        var DisAmt = selectedItem.DisAmt;
        var VatAmt = selectedItem.VatAmt;
        var VatPer = selectedItem.VAT;

        var PrcsDetKy = selectedItem.PrcsDetKy;
        var TaskKy = selectedItem.PrcsDetKy; // narmada

        var PrcsId = selectedItem.PrcsId;
        var Subtotal = selectedItem.SubTotal;
        var Des = selectedItem.Des;
        var Rem = selectedItem.Rem;

        var NBTAmt = selectedItem.NBTAmt;
        var NBTPer = selectedItem.NBT;
        if (NBTPer == undefined || NBTPer == "NaN" || NBTPer == null || NBTPer == NaN) {
            NBTPer == 0.00;
        }
        var WHTAmt = selectedItem.WHTAmt;
        var WHTPer = selectedItem.WHT;
        if (WHTPer == undefined || WHTPer == "NaN" || WHTPer == null || WHTPer == NaN) {
            WHTPer == 0.00;
        }

        var SVatAmt = selectedItem.SVatAmt;
        var SVatPer = selectedItem.SVAT;
        var AvlStk = selectedItem.AvlStk;

        $("#HdrSec6_CmbItm_Cd").data("kendoComboBox").value(ItmKy);
       // $("#HdrSec6_CmbItm_Nm").data("kendoComboBox").value(ItmKy);
        GetItemQty();
        $("#HdrSec6_CmbUnit_Cd").data("kendoComboBox").value(UnitKy);
        $("#HdrSec7_InptQty_Val").data("kendoNumericTextBox").value(Qty);
        $("#HdrSec7_InptRate_Val").data("kendoNumericTextBox").value(Rate);
        if (isNaN(DisPer)) {
            $("#HdrSec7_InptDis_Val").data("kendoNumericTextBox").value(0);
        } else {
            $("#HdrSec7_InptDis_Val").data("kendoNumericTextBox").value(DisPer);
        }
        if (isNaN(Subtotal)) {
            $("#HdrSec4_InptSubTot_Val").data("kendoNumericTextBox").value(0);
        } else {
            $("#HdrSec4_InptSubTot_Val").data("kendoNumericTextBox").value(Subtotal);
            $("#HdrSec10_InptSubTot_Val").val(Subtotal);
        }
        if (PrcsDetKy == undefined || PrcsDetKy == "NaN" || PrcsDetKy == null || PrcsDetKy == NaN || PrcsDetKy == undefined) {
            PrcsDetKy == 1;
        }
        $("#HdrSec10_CmbTskId_Cd").data("kendoComboBox").value(PrcsDetKy);
        //$("#HdrSec10_CmbTskId_Cd").data






        $("#HdrSec7_InptDisAmt_Val").data("kendoNumericTextBox").value(DisAmt);
        if (isNaN(VatPer)) {
            $("#HdrSec8_InptVat_Val").data("kendoNumericTextBox").value(0);
        } else {
            $("#HdrSec8_InptVat_Val").data("kendoNumericTextBox").value(VatPer);
        }

        $("#HdrSec8_InptVatAmt_Val").data("kendoNumericTextBox").value(VatAmt);
        if (isNaN(SVatPer)) {
            $("#HdrSec9_InptSVAT_Val").data("kendoNumericTextBox").value(0);
        } else {
            $("#HdrSec9_InptSVAT_Val").data("kendoNumericTextBox").value(SVatPer);
        }

        $("#HdrSec9_InptSVATAmt_Val").data("kendoNumericTextBox").value(SVatAmt);
        if (isNaN(NBTPer)) {
            $("#HdrSec8_InptNBT_Val").data("kendoNumericTextBox").value(0);
        } else {
            $("#HdrSec8_InptNBT_Val").data("kendoNumericTextBox").value(NBTPer);
        }

        $("#HdrSec8_InptNBTAmt_Val").data("kendoNumericTextBox").value(NBTAmt);
        if (isNaN(WHTPer)) {
            $("#HdrSec9_InptWHT_Val").data("kendoNumericTextBox").value(0);
        } else {
            $("#HdrSec9_InptWHT_Val").data("kendoNumericTextBox").value(WHTPer);
        }

        $("#HdrSec9_InptWHTAmt_Val").data("kendoNumericTextBox").value(WHTAmt);

        $("#HdrSec10_InptLiNo_Val").data("kendoNumericTextBox").value(LiNo);
        $("#HdrSec6_InptDesc_Val").val(Des);
        $("#HdrSec10_InptRem_Val").val(Rem);
        
    }
})


function setRow(count, model) {
    var exchangeRow = model.set("LiNo", count);
}