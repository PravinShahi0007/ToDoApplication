
function ArrangeLiNo() {
    var id = ("#" + viewBag.OurCd);
    var DisLino = 1;
    //var count = $(id).data().kendoGrid.dataSource.total();
    var dataSourceforLino = $(id).data("kendoGrid").dataSource.data();
    for (var a = 0; a < dataSourceforLino.length; a++) {
        if (dataSourceforLino[a].IsAct == 1) {
            dataSourceforLino[a].set("DisplayLiNo", (DisLino));
            DisLino++;
        }
    }
}

// $("span.k-numerictextbox").css('width', "100%");
function changeItemRalatedTotal() {
    SendToSerialNumber_Array(FormGlblData.Detail_Editing_LiNo);
    changeItemRalatedTotalCommon("Default");
}

function changeItemRalatedTotalCommon(calledFrom) {

    var Qtytextbox = $("#HdrSec5_NmricQty_Val").kendoNumericTextBox({
        spinners: false,
        change: function () { var value = this.value(); }
    });

    var Qty = Qtytextbox.val();
    if ((Qty == 0 || Qty == "" || Qty == null || Qty == undefined) && (viewBag.OurCd != "StkCount")) {
        alert("Qty Cannot be null");
    } else {

        var HdrDisPertextbox = $("#HdrSec5_NmricDisPer_Val").kendoNumericTextBox({
            spinners: false,
            change: function () { var value = this.value(); }
        });
        var DisPer = HdrDisPertextbox.val();

        var HdrVatPertextbox = $("#HdrSec5_NmricVatPer_Val").kendoNumericTextBox({
            spinners: false,
            change: function () { var value = this.value(); }
        });
        var VatPer = HdrVatPertextbox.val();

        // Its handling different IsTrnRateInclusiveTaxTyp1_VAT vat calculation
        var vatamttemp = (Number(VatPer) / 100);
        //if (CdMasModel.IsTrnRateInclusiveTaxTyp1_VAT == 1) {
        //    vatamttemp = (Number(VatPer) / (100 + Number(VatPer)));
        //}

        var HdrNBTPertextbox = $("#HdrSec5_NmricNbtPer_Val").kendoNumericTextBox({
            spinners: false,
            change: function () { var value = this.value(); }
        });
        var NBTPer = HdrNBTPertextbox.val();

        var HdrSVatPertextbox = $("#HdrSec5_NmricSVatPer_Val").kendoNumericTextBox({
            change: function () {
                var value = this.value();
            }
        });
        var SVatPer = HdrSVatPertextbox.val();

        var HdrWHTPertextbox = $("#HdrSec5_NmricWhtPer_Val").kendoNumericTextBox({
            spinners: false,
            change: function () { var value = this.value(); }
        });
        var WHTPer = HdrWHTPertextbox.val();

        var Rate = 0;
        var SubTotal = 0;


        if (calledFrom == "SubTotal") {
            SubTotalbox = $("#HdrSec5_NmricSubTotal_Val").kendoNumericTextBox({
                spinners: false,
                change: function () { var value = this.value(); }
            });
            SubTotal = SubTotalbox.val();
            Rate = (SubTotal / Qty);
            $("#HdrSec5_NmricRate_Val").data("kendoNumericTextBox").value(Rate);
        }
        else if (calledFrom == "CrossTotal") {

            var CrosTTlbox = $("#HdrSec5_NmricCrossTotal_Val").kendoNumericTextBox({
                spinners: false,
                change: function () { var value = this.value(); }
            });
            var crosTTl = CrosTTlbox.val();
            var lnAmt = (crosTTl * 100) / (100 - DisPer);
            Rate = (lnAmt / Qty);
            $("#HdrSec5_NmricRate_Val").data("kendoNumericTextBox").value(Rate);
            SubTotal = (Qty * Rate);
            $("#HdrSec5_NmricSubTotal_Val").data("kendoNumericTextBox").value(SubTotal);
        }
        else if (calledFrom == "NetTotal") {
            var NetTotalbox = $("#HdrSec5_NmricNetTotal_Val").kendoNumericTextBox({
                spinners: false,
                change: function () { var value = this.value(); }
            });
            var NetTotal = NetTotalbox.val();

            var topEqu = (100 * NetTotal * (100 - NBTPer));
            var part3 = (Number(NBTPer) + Number(VatPer));
            var part1 = (100 * part3);
            var part2 = ((100 - Number(NBTPer)) * (100 + Number(WHTPer))); // Removed :  + Number(SVatPer) : VgSan
            var botmEqu = (part2 + part1);

            if (botmEqu > 0) {
                var crosTTl = topEqu / botmEqu;
                var lnAmt = (crosTTl * 100) / (100 - DisPer);
                Rate = (lnAmt / Qty);
            }
            $("#HdrSec5_NmricRate_Val").data("kendoNumericTextBox").value(Rate);
            SubTotal = (Qty * Rate);
            $("#HdrSec5_NmricSubTotal_Val").data("kendoNumericTextBox").value(SubTotal);
        }
        else {
            Ratetextbox = $("#HdrSec5_NmricRate_Val").kendoNumericTextBox({
                spinners: false,
                change: function () { var value = this.value(); }
            });
            Rate = Ratetextbox.val();
            SubTotal = (Qty * Rate);
            $("#HdrSec5_NmricSubTotal_Val").data("kendoNumericTextBox").value(SubTotal);
        }


        var DisAmt = (DisPer / 100) * SubTotal;
        $("#HdrSec5_NmricDisAmt_Val").data("kendoNumericTextBox").value(DisAmt);
        $("#HdrSec5_NmricCrossTotal_Val").data("kendoNumericTextBox").value((SubTotal - DisAmt));

        var NBTAmt = (NBTPer / 100) * (SubTotal - DisAmt);  //  (NBTPer / (100 - NBTPer)) * (SubTotal - DisAmt); // 2018/06/20 According to (BA) Calculatio Changed
        $("#HdrSec5_NmricNbtAmt_Val").data("kendoNumericTextBox").value(NBTAmt);

        var VatAmt = vatamttemp * (SubTotal - DisAmt + NBTAmt);
        $("#HdrSec5_NmricVatAmt_Val").data("kendoNumericTextBox").value(VatAmt);

        var SVatAmt = (SVatPer / 100) * SubTotal;
        $("#HdrSec5_NmricSVatAmt_Val").data("kendoNumericTextBox").value(SVatAmt);

        var WHTAmt = (WHTPer / 100) * SubTotal;
        $("#HdrSec5_NmricWhtAmt_Val").data("kendoNumericTextBox").value(WHTAmt);

        $("#HdrSec5_NmricNetTotal_Val").data("kendoNumericTextBox").value((SubTotal - DisAmt + WHTAmt + VatAmt + NBTAmt)); // Removed : + SVatAmt : VgSan

        SetChangedItemDetails();
    }
}

function SetChangedItemDetails() {

    var Des = $("#HdrSec7_InptDesc_Val").val();
    var Rem = $("#HdrSec7_InptRemark_Val").val();

    //var ItmCd = $("#HdrSec5_CmbItm_Val").val();
    var ItmNm = '';
    //if (ItmCd.length <= 0) {
      var  ItmCd = $("#HdrSec5_CmbItm_Cd").data("kendoComboBox").text();
        //ItmNm = $("#HdrSec5_CmbItm_Cd").data("kendoComboBox").text();
    //}
    var ItmKy = $("#HdrSec5_CmbItm_Cd").data("kendoComboBox").value();
    var UnitKy = $("#HdrSec5_CmbUnit_Cd").data("kendoComboBox").value();
    var Unit = $("#HdrSec5_CmbUnit_Cd").data("kendoComboBox").text();
    var TaskId = $("#HdrSec5_CmbTask_Cd").data("kendoComboBox").text();
    var TaskKy = $("#HdrSec5_CmbTask_Cd").data("kendoComboBox").value();
    if (TaskKy == "" || TaskKy == null || TaskKy == 0 || TaskKy == undefined) {
        TaskKy = 1;
    }
    var Anly3Cd = $("#HdrSec5_CmbAnaly_Cd").data("kendoComboBox").text();
    var Anly3Ky = $("#HdrSec5_CmbAnaly_Cd").data("kendoComboBox").value();
    if (Anly3Ky == "" || Anly3Ky == null || Anly3Ky == 0 || Anly3Ky == undefined) {
        Anly3Ky = 1;
    }

    var Qtytextbox = $("#HdrSec5_NmricQty_Val").kendoNumericTextBox({
        spinners: false,
        change: function () {
            var value = this.value();
        }
    });
    var Qty = Qtytextbox.val();
    var Ratetextbox = $("#HdrSec5_NmricRate_Val").kendoNumericTextBox({
        spinners: false,
        change: function () {
            var value = this.value();
        }
    });
    var Rate = Ratetextbox.val();
    var HdrDisPertextbox = $("#HdrSec5_NmricDisPer_Val").kendoNumericTextBox({
        spinners: false,
        change: function () {
            var value = this.value();
        }
    });
    var DisPer = HdrDisPertextbox.val();
    if (isNaN(DisPer)) {
        DisPer = 0;
    }
    var HdrDisAmttextbox = $("#HdrSec5_NmricDisAmt_Val").kendoNumericTextBox({
        spinners: false,
        change: function () {
            var value = this.value();
        }
    });
    var DisAmt = HdrDisAmttextbox.val();
    if (isNaN(DisAmt)) {
        DisAmt = 0;
    }
    var HdrVatAmttextbox = $("#HdrSec5_NmricVatAmt_Val").kendoNumericTextBox({
        spinners: false,
        change: function () {
            var value = this.value();
        }
    });
    var VatAmt = HdrVatAmttextbox.val();
    if (isNaN(VatAmt)) {
        VatAmt = 0;
    }
    var HdrVatPertextbox = $("#HdrSec5_NmricVatPer_Val").kendoNumericTextBox({
        spinners: false,
        change: function () {
            var value = this.value();
        }
    });
    var VatPer = HdrVatPertextbox.val();
    if (isNaN(VatPer)) {
        VatPer = 0;
    }
    var HdrVatAmttextbox = $("#HdrSec5_NmricVatAmt_Val").kendoNumericTextBox({
        spinners: false,
        change: function () {
            var value = this.value();
        }
    });
    var VatAmt = HdrVatAmttextbox.val();
    if (isNaN(VatAmt)) {
        VatAmt = 0;
    }
    var HdrSVatPertextbox = $("#HdrSec5_NmricSVatPer_Val").kendoNumericTextBox({
        spinners: false,
        change: function () {
            var value = this.value();
        }
    });
    var SVatPer = HdrSVatPertextbox.val();
    if (isNaN(SVatPer)) {
        SVatPer = 0;
    }
    var HdrSVatAmttextbox = $("#HdrSec5_NmricSVatAmt_Val").kendoNumericTextBox({
        spinners: false,
        change: function () {
            var value = this.value();
        }
    });
    var SVatAmt = HdrSVatAmttextbox.val();
    if (isNaN(SVatAmt)) {
        SVatAmt = 0;
    }
    var HdrNBTPertextbox = $("#HdrSec5_NmricNbtPer_Val").kendoNumericTextBox({
        spinners: false,
        change: function () {
            var value = this.value();
        }
    });
    var NBTPer = HdrNBTPertextbox.val();
    if (isNaN(NBTPer)) {
        NBTPer = 0;
    }
    var HdrNBTAmttextbox = $("#HdrSec5_NmricNbtAmt_Val").kendoNumericTextBox({
        spinners: false,
        change: function () {
            var value = this.value();
        }
    });
    var NBTAmt = HdrNBTAmttextbox.val();
    if (isNaN(NBTAmt)) {
        NBTAmt = 0;
    }
    var HdrWHTPertextbox = $("#HdrSec5_NmricWhtPer_Val").kendoNumericTextBox({
        spinners: false,
        change: function () {
            var value = this.value();
        }
    });
    var WHTPer = HdrWHTPertextbox.val();
    if (isNaN(WHTPer)) {
        WHTPer = 0;
    }
    var HdrWHTAmttextbox = $("#HdrSec5_NmricWhtAmt_Val").kendoNumericTextBox({
        spinners: false,
        change: function () {
            var value = this.value();
        }
    });
    var WHTAmt = HdrWHTAmttextbox.val();
    if (isNaN(WHTAmt)) {
        WHTAmt = 0;
    }

    var Subtotaltextbox = $("#HdrSec5_NmricSubTotal_Val").kendoNumericTextBox({
        spinners: false,
        change: function () {
            var value = this.value();
        }
    });
    var subtotal = Subtotaltextbox.val();

    var id = ("#" + viewBag.OurCd);

    //var count = $(id).data().kendoGrid.dataSource.total();
    var LiNo = FormGlblData.Detail_Editing_LiNo;

    var LiNoForChange = LiNo;

    //var firstItemData = $(id).data().kendoGrid.dataSource.data();
    //var firstItem = firstItemData[LiNo - 1];//[count - LiNoForChange];
    var firstItem = $(id).data("kendoGrid").dataSource.getByUid(FormGlblData.DblClickedUID);

    firstItem.set("TrnRate", Rate);
    firstItem.set("DisPer", DisPer);
    firstItem.set("VAT", VatPer);
    firstItem.set("NBT", NBTPer);
    firstItem.set("SVAT", SVatPer);
    firstItem.set("WHT", WHTPer);
    firstItem.set("TrnQty", Qty)
    firstItem.set("SubTotal", subtotal);
    firstItem.set("GrossTotal", (Number(subtotal) - Number(DisAmt)));
    firstItem.set("NetTotal", (Number(subtotal) - Number(DisAmt) + Number(VatAmt) + Number(WHTAmt) + Number(NBTAmt)));

    firstItem.set("DisAmt", DisAmt);
    firstItem.set("VatAmt", VatAmt);
    firstItem.set("WHTAmt", WHTAmt);
    firstItem.set("NBTAmt", NBTAmt);
    firstItem.set("SVatAmt", SVatAmt);
    firstItem.set("LiNo", LiNo);
    firstItem.set("Unit", Unit);
    firstItem.set("UnitKy", UnitKy);
    firstItem.set("ItmCd", ItmCd);
    firstItem.set("ItmNm", ItmNm);
    firstItem.set("ItmKy", ItmKy);
    firstItem.set("Anl3Ky", Anly3Ky);
    firstItem.set("Anl3Cd", Anly3Cd);
    firstItem.set("Des", Des);
    firstItem.set("Rem", Rem);
    Calculatetotal();
    FormGlblData.isFirstTimeComboChange = 0;
}

dblclickCreation = function (e) {

    if(FormGlblData.AprStsLock == 0)
    {
        return;
    }

    var id = ("#" + viewBag.OurCd);
    var gridforUID = $(id).data("kendoGrid");
    currentSelection = gridforUID.select();
    currentSelection.each(function () {
        FormGlblData.DblClickedUID = $(this).closest('tr').data('uid');
    })


    var id = ("#" + viewBag.OurCd);
    var grid = $(id).data().kendoGrid;
    var selectedItem = grid.dataItem(grid.select());
    var ItmKy = selectedItem.ItmKy;
    if ((ItmKy != "" || ItmKy != undefined || ItmKy != null) && (ItmKy != "?")) {

        var LiNo = selectedItem.LiNo;
        var ItmCd = selectedItem.ItmCd;
        var ItmNm = selectedItem.ItmNm;
        var ItmTrnKy = selectedItem.ItmTrnKy;

        serNoUpdateItm.Ky = ItmKy;
        serNoUpdateItm.Cd = ItmCd;
        serNoUpdateItm.Nm = ItmNm;
        serNoUpdateItm.ItmTrnKy = ItmTrnKy;
        FormGlblData.Detail_Editing_LiNo = LiNo;

        LoadUnitCombo(ItmKy);
        var Qty = selectedItem.TrnQty;

        var Unit = selectedItem.Unit;
        var UnitKy = selectedItem.UnitKy;
        var Rate = selectedItem.TrnRate;
        var DisPer = selectedItem.DisPer;
        var DisAmt = selectedItem.DisAmt;
        var VatAmt = selectedItem.VatAmt;
        var VatPer = selectedItem.VAT;
        var PrcsDetKy = selectedItem.PrcsDetKy;
        var PrcsId = selectedItem.PrcsId;
        var Subtotal = selectedItem.SubTotal;
        var Poqty = selectedItem.POQty;

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
        var _NetTotal = selectedItem.NetTotal;

        //$("#HdrSec5_CmbItm_Cd").data("kendoComboBox").value(ItmKy);
        $("#HdrSec5_CmbItm_Val").val(ItmCd);
        FormGlblData.ItmCdWhenDblClick = ItmCd;
        document.getElementById('HdrSec5_CmbItmLdd_Lbl').innerHTML = ItmCd + " : " + ItmNm;
        //$("#HdrSec5_CmbItm_Nm").data("kendoComboBox").value(ItmKy);
        //$("#HdrSec5_CmbItm_Cd").data("kendoComboBox").trigger("change");
        $("#HdrSec5_CmbUnit_Cd").data("kendoComboBox").value(UnitKy);
        $("#HdrSec5_NmricQty_Val").data("kendoNumericTextBox").value(Qty);
        $("#HdrSec5_NmricRate_Val").data("kendoNumericTextBox").value(Rate);
        if (isNaN(DisPer)) {
            $("#HdrSec5_NmricDisPer_Val").data("kendoNumericTextBox").value(0);
        } else {
            $("#HdrSec5_NmricDisPer_Val").data("kendoNumericTextBox").value(DisPer);
        }
        if (isNaN(Subtotal)) {
            $("#HdrSec5_NmricSubTotal_Val").data("kendoNumericTextBox").value(0);
            $("#HdrSec5_NmricCrossTotal_Val").data("kendoNumericTextBox").value(0);
            $("#HdrSec5_NmricNetTotal_Val").data("kendoNumericTextBox").value(0);
        } else {
            $("#HdrSec5_NmricSubTotal_Val").data("kendoNumericTextBox").value(Subtotal);
            $("#HdrSec5_NmricCrossTotal_Val").data("kendoNumericTextBox").value((Subtotal - DisAmt));
            //var netTotal = ((Subtotal - DisAmt) + SVatAmt + VatAmt + NBTAmt + WHTAmt);
            $("#HdrSec5_NmricNetTotal_Val").data("kendoNumericTextBox").value(_NetTotal);
        }
        if (PrcsDetKy == undefined || PrcsDetKy == "NaN" || PrcsDetKy == null || PrcsDetKy == NaN || PrcsDetKy == undefined) {
            PrcsDetKy == 1;
        }
        $("#HdrSec5_CmbTask_Cd").data("kendoComboBox").value(PrcsDetKy);
        $("#HdrSec5_NmricDisAmt_Val").data("kendoNumericTextBox").value(DisAmt);
        if (isNaN(VatPer)) {
            $("#HdrSec5_NmricVatPer_Val").data("kendoNumericTextBox").value(0);
        } else {
            $("#HdrSec5_NmricVatPer_Val").data("kendoNumericTextBox").value(VatPer);
        }

        $("#HdrSec5_NmricVatAmt_Val").data("kendoNumericTextBox").value(VatAmt);
        if (isNaN(SVatPer)) {
            $("#HdrSec5_NmricSVatPer_Val").data("kendoNumericTextBox").value(0);
        } else {
            $("#HdrSec5_NmricSVatPer_Val").data("kendoNumericTextBox").value(SVatPer);
        }

        $("#HdrSec5_NmricSVatAmt_Val").data("kendoNumericTextBox").value(SVatAmt);
        if (isNaN(NBTPer)) {
            $("#HdrSec5_NmricNbtPer_Val").data("kendoNumericTextBox").value(0);
        } else {
            $("#HdrSec5_NmricNbtPer_Val").data("kendoNumericTextBox").value(NBTPer);
        }

        $("#HdrSec5_NmricNbtAmt_Val").data("kendoNumericTextBox").value(NBTAmt);
        if (isNaN(WHTPer)) {
            $("#HdrSec5_NmricWhtPer_Val").data("kendoNumericTextBox").value(0);
        } else {
            $("#HdrSec5_NmricWhtPer_Val").data("kendoNumericTextBox").value(WHTPer);
        }

        $("#HdrSec5_NmricWhtAmt_Val").data("kendoNumericTextBox").value(WHTAmt);

        $("#HdrPOQty").data("kendoNumericTextBox").value(Poqty);

        $("#HdrSec7_InptDesc_Val").val(Des);
        $("#HdrSec7_InptRemark_Val").val(Rem);

    };
}

$("#" + viewBag.OurCd).bind("dblclick", dblclickCreation);

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
                var FrmLocKy = $("#HdrSec2_CmbLoc_Cd").data('kendoComboBox').value();
                if (FrmLocKy == 0 || FrmLocKy == null) {
                    var FrmLocKy = 1;
                }

                var PrjKy = 1;

                var Dt = $("#HdrSec1_DatPicDate_Val").val();

                if (ItmCdForChange == null || ItmCdForChange == "" || ItmCdForChange == undefined || lino == 0 || lino == undefined) {


                } else {


                    $.ajax({
                        url: urlTransactionPnsItemsLookUpByItmCd,
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

                                    firstItem.set("GrossTotal", (Number(SubTotal) - Number(Disamt)));
                                    firstItem.set("NetTotal", (Number(SubTotal) - Number(Disamt) + Number(VATamt) + Number(WHTamt) + Number(NBTamt)));
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

function AddPropToChild(itmcd, itmky, itmnm, Unit, UnitKy, Rate, DisPer, VAT, NBT, SVAT, WHT, SubTotal, Disamt, VATamt, WHTamt, NBTamt, SVATamt, qty) {

    var TaskId = $("#HdrSec5_CmbTask_Cd").data("kendoComboBox").text();
    var TaskKy = $("#HdrSec5_CmbTask_Cd").data("kendoComboBox").value();
    if (TaskKy == "" || TaskKy == null || TaskKy == 0 || TaskKy == undefined) {
        TaskKy = 1;
    }
    var ourcd = viewBag.OurCd;
    if (ourcd == "SLSRTN") {
        var Anly3Ky = $("#HdrSec5_CmbAnaly_Cd").data('kendoComboBox').value();
        var Anly3Cd = $("#HdrSec5_CmbAnaly_Cd").data('kendoComboBox').text();
    } else {
        var Anly3Ky = 1;
        var Anly3Cd = "";
    }
    var id = ("#" + viewBag.OurCd);
    var child = $(id).data("kendoGrid");
    var dataSource = child.dataSource;

    var Des = $("#HdrSec7_InptDesc_Val").val();
    var Rem = $("#HdrSec7_InptRemark_Val").val();
    //var total = dataSource.data().length;
    var InputNBT = 0;
    if (NBT == 0 || NBT == null || NBT == undefined)
    {
        InputNBT = $("#HdrSec5_NmricNbtPer_Val").data("kendoNumericTextBox").value();
    }    
    var InputNBTamt = (InputNBT / 100) * (SubTotal - Disamt);// (InputNBT / (100 - InputNBT)) * (SubTotal - Disamt);
    //child.dataSource.read();
    //var count = child.dataSource.total();

    var count = $(id).data().kendoGrid.dataSource.total();

    var lineNo = count + 1;

    SendToSerialNumber_Array(lineNo);

    dataSource.insert(count, {
        ItmTrnKy: 0,
        LiNo: lineNo,
        ItmCd: itmcd,
        ItmKy: itmky,
        ItmNm: itmnm,
        TrnQty: qty,
        TrnRate: Rate,
        SubTotal: SubTotal,
        DisPer: DisPer,
        DisAmt: Disamt,
        GrossTotal: (Number(SubTotal) - Number(Disamt)),
        UnitKy: UnitKy,
        Unit: Unit,
        VAT: VAT,
        VatAmt: VATamt,
        NBT: InputNBT,
        NBTAmt: InputNBTamt,
        SVAT: SVAT,
        SVatAmt: SVATamt,
        WHT: WHT,
        WHTAmt: WHTamt,
        NetTotal: (Number(SubTotal) - Number(Disamt) + Number(VATamt) + Number(NBTamt) + Number(WHTamt)),
        Anl3Ky: Anly3Ky,
        Anl3Cd: Anly3Cd,
        Des: Des,
        Rem: Rem,
        IsAct: 1,

    });
    FormGlblData.isFirstTimeComboChange = 0;
    ArrangeLiNo();
    Calculatetotal();
    var id = ("#" + viewBag.OurCd);
    var grid = $(id).data("kendoGrid");
}

function setItmDetailbyEnterky() {

    var AdrKy = 1;

    if ($("#HdrSec2_CmbAdr_Cd").data('kendoComboBox') != undefined)
        AdrKy = $("#HdrSec2_CmbAdr_Cd").data('kendoComboBox').value();

    if (AdrKy == 0 || AdrKy == null)
        AdrKy = 1;

    var FrmLocKy = $("#HdrSec2_CmbLoc_Cd").data('kendoComboBox').value();

    if (FrmLocKy == 0 || FrmLocKy == null) {
        var FrmLocKy = 1;
    }

    var Des = $("#HdrSec7_InptDesc_Val").val();
    var Rem = $("#HdrSec7_InptRemark_Val").val();

    var PrjKy = 1;
    var Dt = $("#HdrSec1_DatPicDate_Val").val();

    var ItmKy = $("#HdrSec5_CmbItm_Cd").data('kendoComboBox').value();
    var ItmCd = $("#HdrSec5_CmbItm_Cd").data('kendoComboBox').value();//$("#HdrSec5_CmbItm_Cd").val();
    if (ItmCd.length <= 0) {
        if (FormGlblData.itmCdFrm == 'ItmNm') {
            ItmCd = $("#HdrSec5_CmbItm_Cd").data('kendoComboBox').value();
            ItmKy = $("#HdrSec5_CmbItm_Cd").data('kendoComboBox').value();
        } else {
            ItmCd = 'ItmCd';//$("#HdrSec5_CmbItm_Cd").data('kendoComboBox').text();
            ItmKy = $("#HdrSec5_CmbItm_Cd").data('kendoComboBox').value();
        }
    }

    var qty = $("#HdrSec5_NmricQty_Val").val();
    if (ItmCd != null && ItmCd != "" && ItmCd != undefined) {

        if ((qty == 0 || qty == null || qty == undefined || qty == "") && (viewBag.OurCd != "StkCount")) {
            alert("Qty cannot be null !");
            $("#HdrSec5_NmricQty_Val").data("kendoNumericTextBox").focus();
        } else {

            //if (FormGlblData.isItmCdFrmCmb == 1) {
            //    $("#HdrSec5_CmbItm_Val").focus();
            //}
            //else if (FormGlblData.itmCdFrm == 'ItmCd') {
            //    $("#HdrSec5_CmbItm_Cd").data("kendoComboBox").input.focus();
            //}
            //else //if (FormGlblData.itmCdFrm == 'ItmNm') 
            //{
            //    $("#HdrSec5_CmbItm_Nm").data("kendoComboBox").input.focus();
            //}

            //always set focus to CmbItm_Val
            var OurCd = viewBag.OurCd;
            if (OurCd == "StkCount") {
                $("#HdrSec5_CmbItm_Cd").data('kendoComboBox').focus();
            }
            else
                $("#HdrSec5_CmbItm_Val").focus();

            $.ajax({
                url: urlTransactionItemsLookUpByItmCd,
                dataType: "json",
                type: "POST",
                data: JSON.stringify({
                    ObjKy: viewBag.ObjKy,
                    ConCd: "TrnTyp",
                    OurCd: viewBag.OurCd,
                    ItmCd: ItmCd,
                    AdrKy: AdrKy,
                    LocKy: FrmLocKy,
                    PrjKy: PrjKy,
                    Dt: Dt,
                    ItmKy: ItmKy
                }),
                contentType: 'application/json; charset=utf-8',
                success: function (list) {

                    if (list.length == 0 || list.length == null) {
                        alert("This Item cannot added !");
                        $("#HdrSec5_CmbItm_Cd").data("kendoComboBox").input.focus();
                    } else {
                        $("#HdrSec5_CmbItm_Val").val('');
                        $("#HdrSec5_CmbItm_Cd").data('kendoComboBox').value(null);
                       // $("#HdrSec5_CmbItm_Nm").data('kendoComboBox').value(null);
                        $("#HdrSec5_NmricQty_Val").data("kendoNumericTextBox").value(null);
                        document.getElementById('HdrSec5_CmbItmLdd_Lbl').innerHTML = '.....';

                        for (i = 0; i < list.length; i++) {
                            var itmcd = list[0].ItmCd;
                            var itmky = list[0].ItmKy;
                            var itmnm = list[0].ItmNm;
                            //var Rate = list[0].Rate;
                            var UnitKy = $("#HdrSec5_CmbUnit_Cd").data('kendoComboBox').value();//list[0].UnitKy;
                            var Unit = $("#HdrSec5_CmbUnit_Cd").data('kendoComboBox').text();//list[0].Unit;

                            var DisPer = $("#HdrSec5_NmricDisPer_Val").data("kendoNumericTextBox").value();
                            if (DisPer <= 0)
                                DisPer = list[0].Disper;

                            var VAT = $("#HdrSec5_NmricVatPer_Val").data("kendoNumericTextBox").value();
                            if (VAT <= 0)
                                VAT = list[0].VAT;
                            var NBT = list[0].NBT;
                            //NBT == 0 || NBT == null || NBT == undefined ? $("#HdrSec5_NmricNbtPer_Val").data("kendoNumericTextBox").value() : NBT; 
                            var SVAT = $("#HdrSec5_NmricSVatPer_Val").data("kendoNumericTextBox").value();
                            if (SVAT <= 0)
                                SVAT = list[0].SVAT;
                            var WHT = list[0].WHT;

                            var Rate = $("#HdrSec5_NmricRate_Val").data("kendoNumericTextBox").value();

                            if (Rate <= 0)
                                Rate = list[0].Rate;
                            var SubTotal = (qty * Rate);
                            var Disamt = (DisPer / 100) * SubTotal;
                            var NBTamt = (NBT / 100) * (SubTotal - Disamt); ////(NBT / (100 - NBT)) * (SubTotal - Disamt);  2018/06/20 According to (BA) Calculatio Change
                            var VATamt = (VAT / 100) * (SubTotal - Disamt + NBTamt);
                            var WHTamt = (WHT / 100) * SubTotal;
                            var SVATamt = (SVAT / 100) * SubTotal;
                            AddPropToChild(itmcd, itmky, itmnm, Unit, UnitKy, Rate, DisPer, VAT, NBT, SVAT, WHT, SubTotal, Disamt, VATamt, WHTamt, NBTamt, SVATamt, qty);

                            $("#HdrSec5_NmricRate_Val").data("kendoNumericTextBox").value(null);
                        }
                    }
                },
                error: function (e) { }
            });
        }
    }
    else {
        alert("Item Code cannot be empty !");
        $("#HdrSec5_CmbItm_Cd").data("kendoComboBox").input.focus();
    }
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

function setRow(count, model) {
    var exchangeRow = model.set("LiNo", count);
}
