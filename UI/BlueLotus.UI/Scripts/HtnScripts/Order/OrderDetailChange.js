var PrcsDetKy;


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

function changeItemRalatedTotal() {

    var Qtytextbox = $("#HdrSec5_NmricQty_Val").kendoNumericTextBox({
        spinners: false,
        change: function () {
            var value = this.value();
        }
    });

    var Qty = Qtytextbox.val();

    if (Qty == 0 || Qty == undefined || Qty == null || Qty == "") {
        alert("Qty cannot be null");
    }
    else {
        var Ratetextbox = $("#HdrSec5_NmricRate_Val").kendoNumericTextBox({
            spinners: false,
            change: function () {
                var value = this.value();
            }
        });

        var Rate = Ratetextbox.val();

        var SubTotal = (Qty * Rate);

        $("#HdrSec5_NmricSubTotal_Val").data("kendoNumericTextBox").value(SubTotal);
        var HdrDisPertextbox = $("#HdrSec5_NmricDisPer_Val").kendoNumericTextBox({
            spinners: false,
            change: function () {
                var value = this.value();
            }
        });

        var DisPer = HdrDisPertextbox.val();
        if (DisPer == null || DisPer == undefined || DisPer == "") DisPer = 0;

        var DisAmt = (DisPer / 100) * SubTotal;

        var HdrNBTPertextbox = $("#HdrSec5_NmricNbtPer_Val").kendoNumericTextBox({
            spinners: false,
            change: function () {
                var value = this.value();
            }
        });

        var NBTPer = HdrNBTPertextbox.val();



        if (NBTPer == null || NBTPer == undefined || NBTPer == "") NBTPer = 0;


        // need to discuss with Sachithra / Sir, all BAs regarding the NBT calculation issue. 
        //for tempary sollution i copy GRN NBT calculation and paste it to PO NBT calculation

        var NBTAmt = (NBTPer / 100) * (SubTotal - DisAmt);


        //var NBTAmt = (NBTPer / (100 - NBTPer)) * (SubTotal - DisAmt); //this calculation from GRN 14/06/2018
        $("#HdrSec5_NmricNbtAmt_Val").data("kendoNumericTextBox").value(NBTAmt);


        $("#HdrSec5_NmricDisAmt_Val").data("kendoNumericTextBox").value(DisAmt);

        var HdrVatPertextbox = $("#HdrSec5_NmricVatPer_Val").kendoNumericTextBox({
            spinners: false,
            change: function () {
                var value = this.value();
            }
        });

        var VatPer = HdrVatPertextbox.val();
        if (VatPer == null || VatPer == undefined || VatPer == "") VatPer = 0;

        // Its temp solution handling different company vat calculation
        //var vatamttemp = (Number(VatPer) / (100 + Number(VatPer)));
        //if (tempCKy == 77) {
        //    vatamttemp = (Number(VatPer) / 100);
        //}

        // Its handling different IsTrnRateInclusiveTaxTyp1_VAT vat calculation
        var vatamttemp = (Number(VatPer) / (100 + Number(VatPer)));
        if (CdMasModel.IsTrnRateInclusiveTaxTyp1_VAT == 0) {
            vatamttemp = (Number(VatPer) / 100);
        }

        var VatAmt = vatamttemp * (NBTAmt + SubTotal - DisAmt);

        //$("#HdrSec5_NmricVatAmt_Val").data("kendoNumericTextBox").value(VatAmt);//sajjan request to remove it on PO form
        $("#HdrSec5_NmricVatAmt_Val").data("kendoNumericTextBox").value(VatAmt);
        var HdrSVatPertextbox = $("#HdrSec5_NmricSVatPer_Val").kendoNumericTextBox({
            spinners: false,
            change: function () {
                var value = this.value();
            }
        });

        var SVatPer = HdrSVatPertextbox.val();
        if (SVatPer == null || SVatPer == undefined || SVatPer == "") SVatPer = 0;

        //Add The NBT Amt into SvatAmt(kirsh)
        var SVatAmt = (SVatPer / 100) * ((SubTotal - DisAmt) + NBTAmt);

        $("#HdrSec5_NmricSVatAmt_Val").data("kendoNumericTextBox").value(SVatAmt);


        var HdrWHTPertextbox = $("#HdrSec5_NmricWhtPer_Val").kendoNumericTextBox({
            spinners: false,
            change: function () {
                var value = this.value();
            }
        });

        var WHTPer = HdrWHTPertextbox.val();
        if (WHTPer == null || WHTPer == undefined || WHTPer == "") WHTPer = 0;

        var WHTAmt = (WHTPer / 100) * (SubTotal - DisAmt);

        $("#HdrSec5_NmricWhtAmt_Val").data("kendoNumericTextBox").value(WHTAmt);

        SetChangedItemDetails();
    }
}

function SetChangedItemDetails() {

    var ItemNo = $("#HdrSec5_TxtItmNo_Val").val();
    try {
        var ItmCd = $("#HdrSec5_CmbItm_Cd").data("kendoComboBox").text();
        //var ItmNm = $("#HdrSec5_CmbItm_Nm").data("kendoComboBox").text();
        var ItmKy = $("#HdrSec5_CmbItm_Cd").data("kendoComboBox").value();
    }
    catch (e) { }

    var UnitKy = $("#HdrSec5_CmbUnit_Cd").data("kendoComboBox").value();
    var Unit = $("#HdrSec5_CmbUnit_Cd").data("kendoComboBox").text();
    var TaskId = $("#HdrSec5_CmbTask_Cd").data("kendoComboBox").text();
    var TaskKy = $("#HdrSec5_CmbTask_Cd").data("kendoComboBox").value();
    var Anl3Ky = $("#HdrSec5_CmbAnaly_Cd").data("kendoComboBox").value();
    var Anl3Cd = $("#HdrSec5_CmbAnaly_Cd").data("kendoComboBox").text();
    var Des = document.getElementById('HdrSec5_TxtDes_Val').value;
    var Rem = $("#HdrSec5_TxtRem_Val").val();
    var ReqDt = $("#HdrSec5_DatPicReqDt_Val").val();

    if (TaskKy == "" || TaskKy == null || TaskKy == 0 || TaskKy == undefined) {
        TaskKy = 1;
    }

    PrcsDetKy = TaskKy;

    if (Anl3Ky == "" || Anl3Ky == null || Anl3Ky == 0 || Anl3Ky == undefined) {
        Anl3Ky = 1;
    }


   

    if (ReqDt == "" || ReqDt == null || ReqDt == 0 || ReqDt == undefined) {
        ReqDt = "";
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
    if (isNaN(VatPer) || VatPer == undefined || VatPer == "") {
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
    if (isNaN(SVatPer) || SVatPer == undefined || SVatPer == "") {
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

    var HdrPRQtytextbox = $("#HdrSec5_NmricPRQty_Val").kendoNumericTextBox({
        spinners: false,
        change: function () {
            var value = this.value();
        }
    });
    var PRQty = HdrPRQtytextbox.val();
    if (isNaN(PRQty)) {
        PRQty = 0;
    }

    var Subtotaltextbox = $("#HdrSec5_NmricSubTotal_Val").kendoNumericTextBox({
        spinners: false,
        change: function () {
            var value = this.value();
        }
    });
    var subtotal = Subtotaltextbox.val();

    var HdrLiNotextbox = $("#HdrSec5_NmricLiNo_Val").kendoNumericTextBox({
        spinners: false,
        change: function () {
            var value = this.value();
        }
    });

    var id = ("#" + viewBag.OurCd);

    var count = $(id).data().kendoGrid.dataSource.total();
    var LiNo = HdrLiNotextbox.val();

    var LiNoForChange = LiNo;

    //var firstItemData = $(id).data().kendoGrid.dataSource.data();
    //var firstItem = firstItemData[FormGlblData.DblClickedIndex]; //[LiNo - 1];//[count - LiNoForChange];
    var firstItem = $(id).data("kendoGrid").dataSource.getByUid(FormGlblData.DblClickedUID);
    firstItem.set("TrnRate", Rate);
    firstItem.set("DisPer", DisPer);
    firstItem.set("VAT", VatPer);
    firstItem.set("NBT", NBTPer);
    firstItem.set("SVAT", SVatPer);
    firstItem.set("WHT", WHTPer);
    firstItem.set("TrnQty", Qty);
    firstItem.set("ReqDt", ReqDt);
    firstItem.set("SubTotal", subtotal);
    firstItem.set("Des", Des);
    firstItem.set("Rem", Rem);
    firstItem.set("DisAmt", DisAmt);
    firstItem.set("VatAmt", VatAmt);
    firstItem.set("WHTAmt", WHTAmt);
    firstItem.set("NBTAmt", NBTAmt);
    firstItem.set("SVatAmt", SVatAmt);
    firstItem.set("LiNo", LiNo);
    firstItem.set("Unit", Unit);
    firstItem.set("UnitKy", UnitKy);
    firstItem.set("ItmCd", ItmCd);
    firstItem.set("ItmNo", ItemNo);
    //firstItem.set("ItmNm", ItmNm);
    firstItem.set("ItmKy", ItmKy);
    firstItem.set("Anl3Ky", Anl3Ky);
    firstItem.set("Anl3Cd", Anl3Cd);
    firstItem.set("PrcsDetKy", PrcsDetKy);
    firstItem.set("PrcsID", TaskId);
    Calculatetotal();
    ClearAllField();

}

var dblClickCreation = function (e) {
    if (FormGlblData.AprStsLock == 0) {
        return;
    }

    var id = ("#" + viewBag.OurCd);
    var grid = $(id).data().kendoGrid;
    var selectedItem = grid.dataItem(grid.select());

    var grid = $(id).data("kendoGrid");
    currentSelection = grid.select();
    currentSelection.each(function () {
        FormGlblData.DblClickedIndex = $(this).closest("tr").index();
        FormGlblData.DblClickedUID = $(this).closest('tr').data('uid');

    })

    var ItmKy = selectedItem.ItmKy;
    if (ItmKy != "" || ItmKy != undefined || ItmKy != null) {
        LoadUnitCombo(ItmKy);
        var LiNo = selectedItem.LiNo;
        var ItmCd = selectedItem.ItmCd;
        //var ItmNm = selectedItem.ItmNm;
        var Qty = selectedItem.TrnQty;
        var PRQty = selectedItem.PRQty;
        var Unit = selectedItem.Unit;
        var UnitKy = selectedItem.UnitKy;
        var Rate = selectedItem.TrnRate;
        var LiNo = selectedItem.LiNo;
        var DisPer = selectedItem.DisPer;
        var DisAmt = selectedItem.DisAmt;
        var VatAmt = selectedItem.VatAmt;
        var VatPer = selectedItem.VAT;
        var TaskKy = selectedItem.PrcsDetKy;
        PrcsDetKy = selectedItem.PrcsDetKy;
        var PrcsId = selectedItem.PrcsID;
        var Des = selectedItem.Des;
        var Rem = selectedItem.Rem;
        var ReqDt = selectedItem.ReqDt;

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
        if (PRQty == undefined || PRQty == "NaN" || PRQty == null || PRQty == NaN) {
            PRQty == 0.00;
        }

        var Subtotal = selectedItem.SubTotal;
        if (Subtotal == undefined || Subtotal == "NaN" || Subtotal == null || Subtotal == NaN) {
            Subtotal == 0.00;
        }
        var ItemNo = selectedItem.ItmNo;

        //$("#HdrSec5_CmbItm_Cd").data("kendoComboBox").value(ItmKy);
        //$("#HdrSec5_CmbItm_Nm").data("kendoComboBox").value(ItmKy);

        //$("#HdrSec5_CmbItm_Val").val(ItmCd);
        FormGlblData.ItmCdWhenDblClick = ItmCd;
        //document.getElementById('HdrSec5_CmbItmLdd_Lbl').innerHTML = ItmCd + " : " + ItmNm;
        document.getElementById('HdrSec5_CmbItmLdd_Lbl').innerHTML = ItmCd;

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
        } else {
            $("#HdrSec5_NmricSubTotal_Val").data("kendoNumericTextBox").value(Subtotal);
        }
        //if (PrcsDetKy == undefined || PrcsDetKy == "NaN" || PrcsDetKy == null || PrcsDetKy == NaN || PrcsDetKy == undefined) {
        //    PrcsDetKy == 1;
        //}
        //$("#HdrSec5_CmbTask_Cd").data("kendoComboBox").value(PrcsId);
        $("#HdrSec5_CmbTask_Cd").data("kendoComboBox").value(PrcsDetKy);

        $("#HdrSec5_NmricDisAmt_Val").data("kendoNumericTextBox").value(DisAmt);//sajjan requested make value 0.00 13/06/2018




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
        $("#HdrSec5_NmricPRQty_Val").data("kendoNumericTextBox").value(PRQty);
        $("#HdrSec5_NmricLiNo_Val").data("kendoNumericTextBox").value(LiNo);
        $("#HdrSec5_TxtDes_Val").val(Des);
        $("#HdrSec5_TxtRem_Val").val(Rem);
        $("#HdrSec5_DatPicReqDt_Val").val(ReqDt);
        $("#HdrSec5_TxtItmNo_Val").val(ItemNo);

    }
}

function F0x1f4G1G0x3e7() { var a = 2; return a; }


$("#" + viewBag.OurCd).bind("dblclick", dblClickCreation);

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
                        url: urlPnsItemsLookUpByItmCd,
                        dataType: "json",
                        type: "POST",
                        data: JSON.stringify({
                            itemForChange: JSON.stringify({
                                ConCd: "OrdTyp",
                                OurCd: viewBag.OurCd,
                                ItmCd: ItmCdForChange,
                                AdrKy: AdrKy,
                                LocKy: FrmLocKy,
                                PrjKy: PrjKy,
                                Date: Dt,
                                Lino: lino
                            })

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
                                    var ReqDt = list[0].ReqDt;
                                    var id = ("#" + viewBag.OurCd);
                                    var firstItem = $(id).data().kendoGrid.dataSource.data()[LiNoForChange - 1];

                                    firstItem.set("TrnRate", Rate);
                                    firstItem.set("DisPer", DisPer);
                                    firstItem.set("VAT", VAT);
                                    firstItem.set("NBT", NBT);
                                    firstItem.set("SVAT", SVAT);
                                    firstItem.set("WHT", WHT);
                                    firstItem.set("ReqDt", ReqDt);

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
                        error: function (e) {

                        }

                    })

                }
            }
        }
    }

}

function AddPropToChild(itmcd, itmky, itmnm, Unit, UnitKy, Rate, SubTotal, qty) {

    var UserUnitKy = $("#HdrSec5_CmbUnit_Cd").data("kendoComboBox").value();
    if (UserUnitKy == "" || UserUnitKy == null || UserUnitKy == undefined) UserUnitKy = 1;
    var UserUnit = $("#HdrSec5_CmbUnit_Cd").data("kendoComboBox").text();

    var TaskId = $("#HdrSec5_CmbTask_Cd").data("kendoComboBox").text();
    var TaskKy = $("#HdrSec5_CmbTask_Cd").data("kendoComboBox").value();
    if (TaskKy == "" || TaskKy == null || TaskKy == 0 || TaskKy == undefined) {
        TaskKy = 1;
    }

    PrcsDetKy = TaskKy;

    var ReqDt = $("#HdrSec5_DatPicReqDt_Val").val();
    if (ReqDt == "" || ReqDt == null || ReqDt == 0 || ReqDt == undefined) {
        ReqDt = "";
    }
    var Des = $("#HdrSec5_TxtDes_Val").val();
    var Rem = $("#HdrSec5_TxtRem_Val").val();
    var Anly3Cd = $("#HdrSec5_CmbAnaly_Cd").data("kendoComboBox").text();
    var Anly3Ky = $("#HdrSec5_CmbAnaly_Cd").data("kendoComboBox").value();
    if (Anly3Ky == "" || Anly3Ky == null || Anly3Ky == 0 || Anly3Ky == undefined) {
        Anly3Ky = 1;
    }

    var DisPer = $("#HdrSec5_NmricDisPer_Val").val();
    var VAT = $("#HdrSec5_NmricVatPer_Val").val();
    var NBT = $("#HdrSec5_NmricNbtPer_Val").val();
    var SVAT = $("#HdrSec5_NmricSVatPer_Val").val();
    var WHT = $("#HdrSec5_NmricWhtPer_Val").val();

    var ItemNo = $("#HdrSec5_TxtItmNo_Val").val();

    var Disamt = (DisPer / 100) * SubTotal;
    var NBTamt = (NBT / 100) * (SubTotal - Disamt);      //14/06/2018 //updated 16/06/2018
    //var NBTamt = (NBT / (100 - NBT)) * (SubTotal - Disamt);//Narmada 14/06/2018 Sachithra Rajitha
    var VATamt = (VAT / 100) * (NBTamt + SubTotal - Disamt);
    var WHTamt = (WHT / 100) * (SubTotal - Disamt);
    // Add NBT Amt into svat amount(kirsh)
    var SVATamt = (SVAT / 100) * ((SubTotal - Disamt)+NBTamt);

    var ourcd = viewBag.OurCd;

    var id = ("#" + viewBag.OurCd);
    var child = $(id).data("kendoGrid");
    var dataSource = child.dataSource;
    var total = dataSource.data().length;

    child.dataSource.read();
    var count = child.dataSource.total();
    var lineNo = count + 1;

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
        UnitKy: UserUnitKy,
        Unit: UserUnit,
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
        ReqDt: ReqDt,
        Des: Des,
        Rem: Rem,
        IsAct: 1,
        ItmNo: ItemNo,
        PrcsDetKy: PrcsDetKy,
        PrcsID: TaskId

    });
    ArrangeLiNo();
    Calculatetotal();
    var id = ("#" + viewBag.OurCd);
    var grid = $(id).data("kendoGrid");

}

function setItmDetailbyEnterky() {

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

    
    //var value = $("#HdrSec5_CmbItm_Val").val();
    var value = 'ItmCd';
    var valueItmKy = $("#HdrSec5_CmbItm_Cd").data('kendoComboBox').value();
    //if (value.length <= 0) {
    //    if (FormGlblData.itmCdFrm == 'ItmNm') {
    //        value = 'ItmNm';//$("#HdrSec5_CmbItm_Nm").data('kendoComboBox').text();
    //        valueItmKy = $("#HdrSec5_CmbItm_Nm").data('kendoComboBox').value();
    //    } else {
    //        value = 'ItmCd';//$("#HdrSec5_CmbItm_Cd").data('kendoComboBox').text();
    //        valueItmKy = $("#HdrSec5_CmbItm_Cd").data('kendoComboBox').value();
    //    }
    //}

    var qty = $("#HdrSec5_NmricQty_Val").val();
    if (value != null && value != "" && value != undefined) {

        if (qty == 0 || qty == null || qty == undefined || qty == "") {
            alert("Qty cannot be null");
            $("#HdrSec5_NmricQty_Val").data("kendoNumericTextBox").focus();
        } else {

            

            $.ajax({
                url: urlTransactionItemsLookUpByItmCd,
                dataType: "json",
                type: "POST",
                data: JSON.stringify({
                    ObjKy: viewBag.ObjKy,
                    ConCd: "OrdTyp",
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
                        alert("This Item cannot added !");
                        $("#HdrSec5_CmbItm_Cd").data("kendoComboBox").input.focus();
                    } else {

                        //$("#HdrSec5_CmbItm_Val").val('');
                        $("#HdrSec5_CmbItm_Cd").data('kendoComboBox').value(null);
                        //$("#HdrSec5_CmbItm_Nm").data('kendoComboBox').value(null);
                        $("#HdrSec5_NmricQty_Val").data("kendoNumericTextBox").value(null);
                        document.getElementById('HdrSec5_CmbItmLdd_Lbl').innerHTML = '.....';

                        for (i = 0; i < list.length; i++) {
                            var itmcd = list[0].ItmCd;
                            var itmky = list[0].ItmKy;
                            var itmnm = list[0].ItmNm;

                            var Ratetextbox = $("#HdrSec5_NmricRate_Val").kendoNumericTextBox({
                                spinners: false,
                                change: function () {
                                    var value = this.value();
                                }
                            });
                            var Rate = $("#HdrSec5_NmricRate_Val").data("kendoNumericTextBox").value();

                            if (Rate <= 0)
                                Rate = list[0].Rate;

                            var UnitKy = list[0].UnitKy;
                            var Unit = list[0].Unit;
                            //var DisPer = list[0].Disper;
                            var DisPer = $("#HdrSec5_NmricDisPer_Val").data("kendoNumericTextBox").value();
                            if (DisPer <= 0)
                                DisPer = list[0].Disper;

                            var VAT = $("#HdrSec5_NmricVatPer_Val").data("kendoNumericTextBox").value();
                            if (VAT <= 0)
                                var VAT = list[0].VAT;
                            //$("#HdrSec5_NmricVatPer_Val").data("kendoNumericTextBox").value(VAT);
                            //HdrSec4_InptVatAmt_Val
                            //var NBT = list[0].NBT;
                            //var SVAT = list[0].SVAT;
                            //var WHT = list[0].WHT;
                            var SubTotal = (qty * Rate);
                            //var Disamt = (DisPer / 100) * SubTotal;
                            //var VATamt = (VAT / 100) * SubTotal;
                            //var WHTamt = (WHT / 100) * SubTotal;
                            //var NBTamt = (NBT / 100) * SubTotal;
                            //var SVATamt = (SVAT / 100) * SubTotal;
                            $("#HdrSec5_NmricDisPer_Val").data("kendoNumericTextBox").value(DisPer);
                            AddPropToChild(itmcd, itmky, itmnm, Unit, UnitKy, Rate, SubTotal, qty);
                            $("#HdrSec5_CmbItm_Cd").data('kendoComboBox').value(null);
                            //$("#HdrSec5_CmbItm_Nm").data('kendoComboBox').value(null);
                            $("#HdrSec5_NmricRate_Val").data("kendoNumericTextBox").value(null);
                            $("#HdrSec5_NmricQty_Val").data("kendoNumericTextBox").value(null);

                            //  $("#HdrSec5_NmricQty_Val").val(null);
                            var todayDate = new Date();
                            $('#HdrSec5_DatPicReqDt_Val').data("kendoDatePicker").value(todayDate);
                            //$("#HdrSec5_CmbItm_Cd").data("kendoComboBox").input.focus();

                            var id = ("#" + viewBag.OurCd);
                            var grid = $(id).data("kendoGrid");
                            grid.dataSource.read();
                            var count = grid.dataSource.total();
                            ClearAllField();
                        }
                    }
                },
                error: function (e) {

                }
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

function ClearAllField() {
    try {
        $("#HdrSec5_CmbItm_Cd").data("kendoComboBox").value(null);
        //$("#HdrSec5_CmbItm_Nm").data("kendoComboBox").value(null);
    } catch (e) { }

    //$("#HdrSec5_CmbItm_Val").val("");
    document.getElementById('HdrSec5_CmbItmLdd_Lbl').innerHTML = '.....';

    $("#HdrSec5_CmbUnit_Cd").data("kendoComboBox").value(null);
    $("#HdrSec5_NmricQty_Val").data("kendoNumericTextBox").value(null);
    $("#HdrSec5_NmricRate_Val").data("kendoNumericTextBox").value(null);
    $("#HdrSec5_NmricDisPer_Val").data("kendoNumericTextBox").value(null);
    $("#HdrSec5_NmricDisAmt_Val").data("kendoNumericTextBox").value(null);
    $("#HdrSec5_NmricVatAmt_Val").data("kendoNumericTextBox").value(null);
    $("#HdrSec5_NmricVatPer_Val").data("kendoNumericTextBox").value(null);
    $("#HdrSec5_NmricVatAmt_Val").data("kendoNumericTextBox").value(null);
    $("#HdrSec5_NmricSVatPer_Val").data("kendoNumericTextBox").value(null);
    $("#HdrSec5_NmricSVatAmt_Val").data("kendoNumericTextBox").value(null);
    $("#HdrSec5_NmricNbtPer_Val").data("kendoNumericTextBox").value(null);
    $("#HdrSec5_NmricNbtAmt_Val").data("kendoNumericTextBox").value(null);
    $("#HdrSec5_NmricWhtPer_Val").data("kendoNumericTextBox").value(null);
    $("#HdrSec5_NmricWhtAmt_Val").data("kendoNumericTextBox").value(null);
    $("#HdrSec5_NmricLiNo_Val").data("kendoNumericTextBox").value(null);
    $("#HdrSec5_NmricPRQty_Val").data("kendoNumericTextBox").value(null);
    $('#HdrSec5_DatPicReqDt_Val').data("kendoDatePicker").value(todayDate);


    var todayDate = new Date();
    $('#HdrSec1_DatPicDate_Val').data("kendoDatePicker").value(todayDate);
    $('#HdrSec1_DatPicProdDeliveryDate_Val').data("kendoDatePicker").value(todayDate);
}