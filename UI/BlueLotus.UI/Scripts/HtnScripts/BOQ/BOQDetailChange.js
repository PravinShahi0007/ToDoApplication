

function ArrangeLiNo() {
    var id = ("#" + viewBag.OurCd);
    var DisLino = 1;
    //var count = $(id).data().kendoGrid.dataSource.total();
    var dataSourceforLino = $(id).data("kendoGrid").dataSource.data();
    for (var a = 0; a < dataSourceforLino.length; a++) {
        if (dataSourceforLino[a].isAct == 1) {
            dataSourceforLino[a].set("DisplayLiNo", DisLino);
            DisLino++;
        }
    }
}

function setItmDetailbyEnterky() {
    setItmDetailbyEnterky("None");
}
function changeItemRalatedTotal() {
    changeItemRalatedTotal("None");
}

function changeItemRalatedTotal(fromControl) {

    FormGlblData.IsDetailDirty = true;

    // fromControl : "FrmTrnRate"

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

        // START GOH, DOH, Profit

        var HdrGOHPertextbox = $("#HdrSec5_NmricGOHPer_Val").kendoNumericTextBox({
            spinners: false,
            change: function () {
                var value = this.value();
            }
        });
        var GOHPer = HdrGOHPertextbox.val();

        var HdrDOHPertextbox = $("#HdrSec5_NmricDOHPer_Val").kendoNumericTextBox({
            spinners: false,
            change: function () {
                var value = this.value();
            }
        });
        var DOHPer = HdrDOHPertextbox.val();

        var HdrProfitPertextbox = $("#HdrSec5_NmricProfitPer_Val").kendoNumericTextBox({
            spinners: false,
            change: function () {
                var value = this.value();
            }
        });
        var ProfitPer = HdrProfitPertextbox.val();

        // END : GOH, DOH, Profit


        var HdrDisPertextbox = $("#HdrSec5_NmricDisPer_Val").kendoNumericTextBox({
            spinners: false,
            change: function () {
                var value = this.value();
            }
        });
        var DisPer = HdrDisPertextbox.val();

        var Ratetextbox = $("#HdrSec5_NmricRate_Val").kendoNumericTextBox({
            spinners: false,
            change: function () {
                var value = this.value();
            }
        });
        var Rate = Ratetextbox.val();

        var TrnRatetextbox = $("#HdrSec5_NmricTrnRate_Val").kendoNumericTextBox({
            spinners: false,
            change: function () {
                var value = this.value();
            }
        });
        var TrnRate = TrnRatetextbox.val();

        if (fromControl == "FrmTrnRate") {
            ProfitPer = ((TrnRate * 100) / ((1 * Rate) * (1 + ((DOHPer + GOHPer) / 100)) * (1 - (DisPer / 100)))) - 100;
            $("#HdrSec5_NmricProfitPer_Val").data("kendoNumericTextBox").value(ProfitPer);
        } else {
            //TrnRate = ((1 * Rate) * (1 + ((DOHPer + GOHPer) / 100)) * (1 + (ProfitPer / 100)) * (1 - (DisPer / 100)));
            TrnRate = Rate * (1 + ((Number(DOHPer) + Number(GOHPer) + Number(ProfitPer)) / 100)); //dont touch ***Narmada***

            //TrnRate = (Number(Rate) * Number(Qty)) * (1 + (Number(DOHPer) + Number(GOHPer) + Number(ProfitPer)) * 0.01);
            $("#HdrSec5_NmricTrnRate_Val").data("kendoNumericTextBox").value(TrnRate);
        }

        //var SubTotal = (Qty * Rate);
        var SubTotal = (Qty * TrnRate);
        $("#HdrSec5_NmricSubTotal_Val").data("kendoNumericTextBox").value(SubTotal);

        var DisAmt = (DisPer / 100) * SubTotal; 
        $("#HdrSec5_NmricDisAmt_Val").data("kendoNumericTextBox").value(DisAmt);

        var HdrVatPertextbox = $("#HdrSec5_NmricVatPer_Val").kendoNumericTextBox({
            spinners: false,
            change: function () {
                var value = this.value();
            }
        });

        var HdrNBTPertextbox = $("#HdrSec5_NmricNbtPer_Val").kendoNumericTextBox({
            spinners: false,
            change: function () {
                var value = this.value();
            }
        });
        var NBTPer = HdrNBTPertextbox.val();
       

        var NBTAmt = (NBTPer / 100) * (SubTotal - DisAmt);

        $("#HdrSec5_NmricNbtAmt_Val").data("kendoNumericTextBox").value(NBTAmt);
        var HdrWHTPertextbox = $("#HdrSec5_NmricWhtPer_Val").kendoNumericTextBox({
            spinners: false,
            change: function () {
                var value = this.value();
            }
        });


        var VatPer = HdrVatPertextbox.val();

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

        //var VatAmt = vatamttemp * (SubTotal - DisAmt);
        var VatAmt = (SubTotal - DisAmt + NBTAmt) * vatamttemp;

        $("#HdrSec5_NmricVatAmt_Val").data("kendoNumericTextBox").value(VatAmt);
        var HdrSVatPertextbox = $("#HdrSec5_NmricSVatPer_Val").kendoNumericTextBox({
            spinners: false,
            change: function () {
                var value = this.value();
            }
        });

        var SVatPer = HdrSVatPertextbox.val();

        var SVatAmt = (SVatPer / 100) * (SubTotal - DisAmt + NBTAmt);

        $("#HdrSec5_NmricSVatAmt_Val").data("kendoNumericTextBox").value(SVatAmt);
        

      
        var WHTPer = HdrWHTPertextbox.val();
        var WHTAmt = (WHTPer / 100) * (SubTotal - DisAmt);

        $("#HdrSec5_NmricWhtAmt_Val").data("kendoNumericTextBox").value(WHTAmt);

        SetChangedItemDetails();

        ClearDetFilelds();
    }
}

function SetChangedItemDetails() {

    var ItmNo = $("#HdrSec5_TxtBoxItmNo_Val").val();
    var ItmCd = $("#HdrSec5_CmbItm_Cd").data("kendoComboBox").text();
    //var ItmNm = $("#HdrSec5_CmbItm_Nm").data("kendoComboBox").text();
    var ItmKy = $("#HdrSec5_CmbItm_Cd").data("kendoComboBox").value();
    var UnitKy = 1;

    if (SelectedItmKy != ItmKy) {

        var AdrKy = $("#HdrSec2_CmbAdr_Cd").data('kendoComboBox').value();
        if (AdrKy == 0 || AdrKy == null) {
            var AdrKy = 1;
        }

        var ItemKy = $("#HdrSec5_CmbItm_Cd").data('kendoComboBox').value();
        if (ItemKy == 0 || ItemKy == null) {
            var ItemKy = 1;
        }

        var FrmLocKy = $("#HdrSec2_CmbLoc_Cd").data('kendoComboBox').value();
        if (FrmLocKy == 0 || FrmLocKy == null) {
            var FrmLocKy = 1;
        }

        var PrjKy = 1;
        var Dt = $("#HdrSec1_DatPicDate_Val").val();

        var value = $("#HdrSec5_CmbItm_Cd").data('kendoComboBox').text();

        $.ajax({
            url: urlItemForOrder,
            dataType: "json",
            type: "POST",
            data: JSON.stringify({
                ObjKy: viewBag.ObjKy,
                OrdItemDet: JSON.stringify({
                    ConCd: "OrdTyp",
                    OurCd: viewBag.OurCd,
                    ItmCd: value,
                    AdrKy: AdrKy,
                    LocKy: FrmLocKy,
                    PrjKy: PrjKy,
                    ItmKy: ItemKy,
                    Dt: Dt,
                }),
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
                        UnitKy = list[0].UnitKy;
                        var Unit = list[0].Unit;

                       
                    }
                }
            },
            error: function (e) { }
        });
    }
    else {
        UnitKy = $("#HdrSec5_CmbUnit_Cd").data("kendoComboBox").value();
    }

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

    if (Anl3Ky == "" || Anl3Ky == null || Anl3Ky == 0 || Anl3Ky == undefined) {
        Anl3Ky = 1;
    }


    //alert(ReqDt);


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

    var TrnRatetextbox = $("#HdrSec5_NmricTrnRate_Val").kendoNumericTextBox({
        spinners: false,
        change: function () {
            var value = this.value();
        }
    });
    var TrnRate = TrnRatetextbox.val();


    // START GOH, DOH, Profit

    var HdrGOHPertextbox = $("#HdrSec5_NmricGOHPer_Val").kendoNumericTextBox({
        spinners: false,
        change: function () {
            var value = this.value();
        }
    });
    var GOHPer = HdrGOHPertextbox.val();

    var HdrDOHPertextbox = $("#HdrSec5_NmricDOHPer_Val").kendoNumericTextBox({
        spinners: false,
        change: function () {
            var value = this.value();
        }
    });
    var DOHPer = HdrDOHPertextbox.val();

    var HdrProfitPertextbox = $("#HdrSec5_NmricProfitPer_Val").kendoNumericTextBox({
        spinners: false,
        change: function () {
            var value = this.value();
        }
    });
    var ProfitPer = HdrProfitPertextbox.val();

    // END : GOH, DOH, Profit


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
    //var firstItem = firstItemData[LiNo - 1];//[count - LiNoForChange];
    var grid = $(id).data("kendoGrid");
    var dateSource = grid.dataSource;
    var selectId = dateSource.getByUid(FormGlblData.DblClickedUID);
   
    var firstItem = $(id).data("kendoGrid").dataSource.getByUid(FormGlblData.DblClickedUID);
    try {
        firstItem.set("ItmNo", ItmNo);
        firstItem.set("Rate", Rate);
        firstItem.set("TrnRate", TrnRate);
        firstItem.set("DisPer", DisPer);
        firstItem.set("GOH", GOHPer);
        firstItem.set("DOH", DOHPer);
        firstItem.set("Profit", ProfitPer);
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
        //firstItem.set("ItmNm", ItmNm);
        firstItem.set("ItmKy", ItmKy);
        firstItem.set("Anl3Ky", Anl3Ky);
        firstItem.set("Anl3Cd", Anl3Cd);

       
    } catch (e) {
        var RowUpdate = $("#BOQ").data().kendoGrid.dataSource.data()[FormGlblData.DblClickOdrDetKy];
        RowUpdate.set("ItmNo", ItmNo);
        RowUpdate.set("Rate", Rate);
        RowUpdate.set("TrnRate", TrnRate);
        RowUpdate.set("DisPer", DisPer);
        RowUpdate.set("GOH", GOHPer);
        RowUpdate.set("DOH", DOHPer);
        RowUpdate.set("Profit", ProfitPer);
        RowUpdate.set("VAT", VatPer);
        RowUpdate.set("NBT", NBTPer);
        RowUpdate.set("SVAT", SVatPer);
        RowUpdate.set("WHT", WHTPer);
        RowUpdate.set("TrnQty", Qty);
        RowUpdate.set("ReqDt", ReqDt);
        RowUpdate.set("SubTotal", subtotal);
        RowUpdate.set("Des", Des);
        RowUpdate.set("Rem", Rem);
        RowUpdate.set("DisAmt", DisAmt);
        RowUpdate.set("VatAmt", VatAmt);
        RowUpdate.set("WHTAmt", WHTAmt);
        RowUpdate.set("NBTAmt", NBTAmt);
        RowUpdate.set("SVatAmt", SVatAmt);
        RowUpdate.set("LiNo", LiNo);
        RowUpdate.set("Unit", Unit);
        RowUpdate.set("UnitKy", UnitKy);
        RowUpdate.set("ItmCd", ItmCd);
        //RowUpdate.set("ItmNm", ItmNm);
        RowUpdate.set("ItmKy", ItmKy);
        RowUpdate.set("Anl3Ky", Anl3Ky);
        RowUpdate.set("Anl3Cd", Anl3Cd);
        
    }
   

    Calculatetotal();


}

dblClickCreation = function (e) {

    isEditable = FormGlblData.AprStsLock;
    if (isEditable == 0) {
        alert("You Cannot edit this transaction");
        return;
    }
   
    var id = ("#" + viewBag.OurCd);
    var gridforUID = $(id).data("kendoGrid");
    currentSelection = gridforUID.select();
    currentSelection.each(function () {
        FormGlblData.DblClickedUID = $(this).closest('tr').data('uid');
    })
    var row = $(id).data("kendoGrid").tbody.find("tr[data-uid='" + FormGlblData.DblClickedUID + "']");
    var propId = $(id).data("kendoGrid").tbody.find("tr[data-uid='" + FormGlblData.DblClickedUID + "'] td:eq(0)").text();
  
    
    var selectedRow = $(id).data("kendoGrid").select();
    var selectedRowIndex = selectedRow.index();
    FormGlblData.DblClickOdrDetKy = selectedRowIndex;

    
    var id = ("#" + viewBag.OurCd);
    var grid = $(id).data().kendoGrid;
    var selectedItem = grid.dataItem(grid.select());
    var ItmKy = selectedItem.ItmKy;
    SelectedItmKy = selectedItem.ItmKy;
    if (ItmKy != "" || ItmKy != undefined || ItmKy != null) {

        if (selectedItem.OrdDetKy >= 11) {
            // This Calling the OdetDetCmpn
            globalVariable.OrdDetKy = selectedItem.OrdDetKy;
            SetSelectedItemToItemComboForOrdDetCmpn(selectedItem.OrdDetKy, selectedItem.ItmKy, selectedItem.ItmNm);
            SetSelectedItemToItemCombo(selectedItem.ItmKy);
        }

        LoadUnitCombo(ItmKy);
        var LiNo = selectedItem.LiNo;
        var ItmNo = selectedItem.ItmNo;
        var ItmCd = selectedItem.ItmCd;
        //var ItmNm = selectedItem.ItmNm;
        var Qty = selectedItem.TrnQty;
        var PRQty = selectedItem.PRQty;
        var Unit = selectedItem.Unit;
        var UnitKy = selectedItem.UnitKy;
        var Rate = selectedItem.Rate;
        var TrnRate = selectedItem.TrnRate;
        var LiNo = selectedItem.LiNo;
        var DisPer = selectedItem.DisPer;

        var GOHPer = selectedItem.GOH;
        var DOHPer = selectedItem.DOH;
        var ProfitPer = selectedItem.Profit;

        var DisAmt = selectedItem.DisAmt;
        var VatAmt = selectedItem.VatAmt;
        var VatPer = selectedItem.VAT;
        var PrcsDetKy = selectedItem.PrcsDetKy;
        var PrcsId = selectedItem.PrcsId;
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

        $("#HdrSec5_CmbItm_Cd").data("kendoComboBox").value(ItmKy);
        //$("#HdrSec5_CmbItm_Nm").data("kendoComboBox").value(ItmKy);
        $("#HdrSec5_CmbUnit_Cd").data("kendoComboBox").value(UnitKy);
        $("#HdrSec5_NmricQty_Val").data("kendoNumericTextBox").value(Qty);
        if (isNaN(Rate)) {
            $("#HdrSec5_NmricRate_Val").data("kendoNumericTextBox").value(0);
        }
        else {
            $("#HdrSec5_NmricRate_Val").data("kendoNumericTextBox").value(Rate);
        }

        if (isNaN(TrnRate)) {
            $("#HdrSec5_NmricTrnRate_Val").data("kendoNumericTextBox").value(0);
        }
        else {
            $("#HdrSec5_NmricTrnRate_Val").data("kendoNumericTextBox").value(TrnRate);
        }

        if (isNaN(DisPer)) {
            $("#HdrSec5_NmricDisPer_Val").data("kendoNumericTextBox").value(0);
        } else {
            $("#HdrSec5_NmricDisPer_Val").data("kendoNumericTextBox").value(DisPer);
        }

        // GOH,DOH,Profit
        if (isNaN(GOHPer)) {
            $("#HdrSec5_NmricGOHPer_Val").data("kendoNumericTextBox").value(0);
        } else {
            $("#HdrSec5_NmricGOHPer_Val").data("kendoNumericTextBox").value(GOHPer);
        }

        if (isNaN(DOHPer)) {
            $("#HdrSec5_NmricDOHPer_Val").data("kendoNumericTextBox").value(0);
        } else {
            $("#HdrSec5_NmricDOHPer_Val").data("kendoNumericTextBox").value(DOHPer);
        }

        if (isNaN(ProfitPer)) {
            $("#HdrSec5_NmricProfitPer_Val").data("kendoNumericTextBox").value(0);
        } else {
            $("#HdrSec5_NmricProfitPer_Val").data("kendoNumericTextBox").value(ProfitPer);
        }
        // GOH,DOH,Profit


        if (isNaN(Subtotal)) {
            $("#HdrSec5_NmricSubTotal_Val").data("kendoNumericTextBox").value(0);
        } else {
            $("#HdrSec5_NmricSubTotal_Val").data("kendoNumericTextBox").value(Subtotal);
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
        $("#HdrSec5_NmricPRQty_Val").data("kendoNumericTextBox").value(PRQty);
        $("#HdrSec5_NmricLiNo_Val").data("kendoNumericTextBox").value(LiNo);
        $("#HdrSec5_TxtDes_Val").val(Des);
        $("#HdrSec5_TxtRem_Val").val(Rem);
        $("#HdrSec5_DatPicReqDt_Val").val(ReqDt);
        $("#HdrSec5_TxtBoxItmNo_Val").val(ItmNo);
    }
}

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

                var NewItmKy = $("#HdrSec5_CmbItm_Cd").data('kendoComboBox').value();
                if (NewItmKy == 0 || NewItmKy == null) {
                    var NewItmKy = 1;
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

                                    firstItem.set("Rate", Rate);
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


                                    // GOH,DOH,Profit
                                    firstItem.set("GOH", 0);
                                    firstItem.set("DOH", 0);
                                    firstItem.set("Profit", 0);
                                    firstItem.set("ItmNo", '');
                                    
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

function AddPropToChild(itmcd, itmky, itmnm, Unit, UnitKy, qty, fromControl) {

    // fromControl : "FrmTrnRate"

    var Ratetextbox = $("#HdrSec5_NmricRate_Val").kendoNumericTextBox({
        spinners: false,
        change: function () {
            var value = this.value();
        }
    });
    var Rate = Ratetextbox.val();
    if (Rate == "" || Rate == null || Rate == undefined) Rate = 0;

    var TrnRatetextbox = $("#HdrSec5_NmricTrnRate_Val").kendoNumericTextBox({
        spinners: false,
        change: function () {
            var value = this.value();
        }
    });
    var TrnRate = TrnRatetextbox.val();


    var TaskId = $("#HdrSec5_CmbTask_Cd").data("kendoComboBox").text();
    var TaskKy = $("#HdrSec5_CmbTask_Cd").data("kendoComboBox").value();
    if (TaskKy == "" || TaskKy == null || TaskKy == 0 || TaskKy == undefined) {
        TaskKy = 1;
    }

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
    if (DisPer == "" || DisPer == null || DisPer == undefined) DisPer = 0;

    var VAT = $("#HdrSec5_NmricVatPer_Val").val();
    if (VAT == "" || VAT == null || VAT == undefined) VAT = 0;

    var NBT = $("#HdrSec5_NmricNbtPer_Val").val();
    if (NBT == "" || NBT == null || NBT == undefined) NBT = 0;

    var SVAT = $("#HdrSec5_NmricSVatPer_Val").val();
    if (SVAT == "" || SVAT == null || SVAT == undefined) SVAT = 0;

    var WHT = $("#HdrSec5_NmricWhtPer_Val").val();
    if (WHT == "" || WHT == null || WHT == undefined) WHT = 0;

    var ItmNo = $("#HdrSec5_TxtBoxItmNo_Val").val();
    var GOHPer = $("#HdrSec5_NmricGOHPer_Val").val();
    if (GOHPer == "" || GOHPer == null || GOHPer == undefined) GOHPer = 0;
    var DOHPer = $("#HdrSec5_NmricDOHPer_Val").val();
    if (DOHPer == "" || DOHPer == null || DOHPer == undefined) DOHPer = 0;
    var ProfitPer = $("#HdrSec5_NmricProfitPer_Val").val();
    if (ProfitPer == "" || ProfitPer == null || ProfitPer == undefined) ProfitPer = 0;

    if (fromControl == "FrmTrnRate") {
        ProfitPer = ((TrnRate * 100) / ((1 * Rate) * (1 + ((DOHPer + GOHPer) / 100)) * (1 - (DisPer / 100)))) - 100;
        $("#HdrSec5_NmricProfitPer_Val").data("kendoNumericTextBox").value(ProfitPer);
    } else {
        //TrnRate = ((1 * Rate) * (1 + ((DOHPer + GOHPer) / 100)) * (1 + (ProfitPer / 100)) * (1 - (DisPer / 100)));

        //TrnRate = Rate * (1 + ((DOHPer + GOHPer + ProfitPer) / 100));
        TrnRate = Rate * (1 + ((Number(DOHPer) + Number(GOHPer) + Number(ProfitPer)) / 100)); //dont touch ***Narmada***

        //below calculation based on sir's calculation. this changed applyed hancos requiremnt. 
        //TrnRate = (Number(Rate) * Number(qty)) * (1 + (Number(DOHPer) + Number(GOHPer) + Number(ProfitPer)) * 0.01);

        $("#HdrSec5_NmricTrnRate_Val").data("kendoNumericTextBox").value(TrnRate);
    }

    //var SubTotal = (qty * Rate);
    var SubTotal = (qty * TrnRate);

    var Disamt = (DisPer / 100) * SubTotal;
    var NBTamt = (NBT / 100) * (SubTotal - Disamt);
    var VATamt = (VAT / 100) * (SubTotal - Disamt + NBTamt);
    var WHTamt = (WHT / 100) * (SubTotal - Disamt);
   
    var SVATamt = (SVAT / 100) * (SubTotal - Disamt + NBTamt);

    var ourcd = viewBag.OurCd;

    var id = ("#" + viewBag.OurCd);
    var child = $(id).data("kendoGrid");
    var dataSource = child.dataSource;
    var total = dataSource.data().length;

    //child.dataSource.read();
    var count = child.dataSource.total();
    var lineNo = count + 1;

    dataSource.insert(count, {
        
        LiNo: lineNo,
        ItmNo: ItmNo,
        ItmCd: itmcd,
        ItmKy: itmky,
        ItmNm: itmnm,
        TrnQty: qty,
        Rate: Rate,
        TrnRate: TrnRate,
        SubTotal: SubTotal,
        DisPer: DisPer,
        GOH: GOHPer,
        DOH: DOHPer,
        Profit: ProfitPer,
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
        ReqDt: ReqDt,
        Des: Des,
        Rem: Rem,
        isAct: 1
    });
    //ArrangeLiNo();
    //Calculatetotal();
    //var id = ("#" + viewBag.OurCd);
    //var grid = $(id).data("kendoGrid");
}

function setItmDetailbyEnterky(fromControl) {

    FormGlblData.IsDetailDirty = true;

    var AdrKy = $("#HdrSec2_CmbAdr_Cd").data('kendoComboBox').value();
    if (AdrKy == 0 || AdrKy == null) {
        var AdrKy = 1;
    }

    var ItmKy = $("#HdrSec5_CmbItm_Cd").data('kendoComboBox').value();
    if (ItmKy == 0 || ItmKy == null) {
        var ItmKy = 1;
    }

    

    var UnitKy = $("#HdrSec5_CmbUnit_Cd").data('kendoComboBox').value();
    var Unit = $("#HdrSec5_CmbUnit_Cd").data('kendoComboBox').text();

    var FrmLocKy = $("#HdrSec2_CmbLoc_Cd").data('kendoComboBox').value();
    if (FrmLocKy == 0 || FrmLocKy == null) {
        var FrmLocKy = 1;
    }

    var PrjKy = 1;
    var Dt = $("#HdrSec1_DatPicDate_Val").val();

    var value = $("#HdrSec5_CmbItm_Cd").data('kendoComboBox').text();
    var qty = $("#HdrSec5_NmricQty_Val").val();
    if (value != 0 || value != null) {
        if (qty == 0 || qty == null || qty == undefined || qty == "") {
            alert("Qty cannot be null");
            $("#HdrSec5_NmricQty_Val").data("kendoNumericTextBox").focus();
        } else {
            $.ajax({
                url: urlItemForOrder,
                dataType: "json",
                type: "POST",
                data: JSON.stringify({
                    ObjKy: viewBag.ObjKy,
                    OrdItemDet: JSON.stringify({
                        ConCd: "OrdTyp",
                        OurCd: viewBag.OurCd,
                        ItmCd: value,
                        AdrKy: AdrKy,
                        LocKy: FrmLocKy,
                        PrjKy: PrjKy,
                        ItmKy:ItmKy,
                        Dt: Dt,
                    }),
                }),
                contentType: 'application/json; charset=utf-8',
                success: function (list) {
                    if (list.length == 0 || list.length == null) {
                        alert("Cannot find the item !");
                    } else {
                        for (i = 0; i < list.length; i++) {

                            var itmcd = list[0].ItmCd;
                            //var itmky = list[0].ItmKy;
                            var itmky = ItmKy;
                            var itmnm = list[0].ItmNm;
                            //var UnitKy = list[0].UnitKy;
                            //var Unit = list[0].Unit;

                            AddPropToChild(itmcd, itmky, itmnm, Unit, UnitKy, qty, fromControl);

                            ClearDetFilelds();

                            //var id = ("#" + viewBag.OurCd);
                            //var grid = $(id).data("kendoGrid");
                            //grid.dataSource.read();
                            //var count = grid.dataSource.total();
                        }
                    }
                },
                error: function (e) { }
            });
        }
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

function ClearDataEntryFileds()
{
    $("#HdrSec5_CmbItm_Cd").data('kendoComboBox').value(null);
    //$("#HdrSec5_CmbItm_Nm").data('kendoComboBox').value(null);
    $("#HdrSec5_NmricRate_Val").data("kendoNumericTextBox").value(0);
    $("#HdrSec5_NmricTrnRate_Val").data("kendoNumericTextBox").value(0);
    $("#HdrSec5_NmricLiNo_Val").data("kendoNumericTextBox").value(0);
    $("#HdrSec5_NmricQty_Val").data("kendoNumericTextBox").value(0);
    $("#HdrSec5_NmricQty_Val").val(0);
    $("#HdrSec5_NmricSubTotal_Val").data("kendoNumericTextBox").value(0);
    
    //var todayDate = new Date();
    //$('#HdrSec5_DatPicReqDt_Val').data("kendoDatePicker").value(todayDate);
    $("#HdrSec5_CmbItm_Cd").data("kendoComboBox").input.focus();
    
}

//add new record middle of the grid
function AddRowMiddle()
{
    AddRowWhenClickBtn("None");
}

function AddRowWhenClickBtn(fromControl)
{

    var ourcd = viewBag.OurCd;

    var id = ("#" + viewBag.OurCd);
    var child = $(id).data("kendoGrid");
    var sel = child.select();
    var sel_idx = sel.index();
    var item = child.dataItem(sel);   
    var idx = child.dataSource.indexOf(item);

    if (idx > 0)
    {
        FormGlblData.IsDetailDirty = true;

        var AdrKy = $("#HdrSec2_CmbAdr_Cd").data('kendoComboBox').value();
        if (AdrKy == 0 || AdrKy == null) {
            var AdrKy = 1;
        }

        var ItmKy = $("#HdrSec5_CmbItm_Cd").data('kendoComboBox').value();
        if (ItmKy == 0 || ItmKy == null) {
            var ItmKy = 1;
        }

        var FrmLocKy = $("#HdrSec2_CmbLoc_Cd").data('kendoComboBox').value();
        if (FrmLocKy == 0 || FrmLocKy == null) {
            var FrmLocKy = 1;
        }

        var PrjKy = 1;
        var Dt = $("#HdrSec1_DatPicDate_Val").val();

        var value = $("#HdrSec5_CmbItm_Cd").data('kendoComboBox').text();
        var qty = $("#HdrSec5_NmricQty_Val").val();
        if (value != 0 || value != null) {
            if (qty == 0 || qty == null || qty == undefined || qty == "") {
                alert("Qty cannot be null");
                $("#HdrSec5_NmricQty_Val").data("kendoNumericTextBox").focus();
            } else {
                $.ajax({
                    url: urlItemForOrder,
                    dataType: "json",
                    type: "POST",
                    data: JSON.stringify({
                        ObjKy: viewBag.ObjKy,
                        OrdItemDet: JSON.stringify({
                            ConCd: "OrdTyp",
                            OurCd: viewBag.OurCd,
                            ItmCd: value,
                            AdrKy: AdrKy,
                            LocKy: FrmLocKy,
                            PrjKy: PrjKy,
                            ItmKy: ItmKy,
                            Dt: Dt,
                        }),
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
                                var UnitKy = list[0].UnitKy;
                                var Unit = list[0].Unit;

                                AddPropToChildGridMiddle(itmcd, itmky, itmnm, Unit, UnitKy, qty, fromControl);

                                ClearDetFilelds();
                                ArrangeLiNo();
                            }
                        }
                    },
                    error: function (e) { }
                });
            }
        }
    }

    else
    {
        alert("Please Select Grid Row");
        ClearDetFilelds();
        return;
    }

}

function AddPropToChildGridMiddle(itmcd, itmky, itmnm, Unit, UnitKy, qty, fromControl)
{
    // fromControl : "FrmTrnRate"

    var Ratetextbox = $("#HdrSec5_NmricRate_Val").kendoNumericTextBox({
        spinners: false,
        change: function () {
            var value = this.value();
        }
    });
    var Rate = Ratetextbox.val();
    if (Rate == "" || Rate == null || Rate == undefined) Rate = 0;

    var TrnRatetextbox = $("#HdrSec5_NmricTrnRate_Val").kendoNumericTextBox({
        spinners: false,
        change: function () {
            var value = this.value();
        }
    });
    var TrnRate = TrnRatetextbox.val();


    var TaskId = $("#HdrSec5_CmbTask_Cd").data("kendoComboBox").text();
    var TaskKy = $("#HdrSec5_CmbTask_Cd").data("kendoComboBox").value();
    if (TaskKy == "" || TaskKy == null || TaskKy == 0 || TaskKy == undefined) {
        TaskKy = 1;
    }

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
    if (DisPer == "" || DisPer == null || DisPer == undefined) DisPer = 0;

    var VAT = $("#HdrSec5_NmricVatPer_Val").val();
    if (VAT == "" || VAT == null || VAT == undefined) VAT = 0;

    var NBT = $("#HdrSec5_NmricNbtPer_Val").val();
    if (NBT == "" || NBT == null || NBT == undefined) NBT = 0;

    var SVAT = $("#HdrSec5_NmricSVatPer_Val").val();
    if (SVAT == "" || SVAT == null || SVAT == undefined) SVAT = 0;

    var WHT = $("#HdrSec5_NmricWhtPer_Val").val();
    if (WHT == "" || WHT == null || WHT == undefined) WHT = 0;

    var ItmNo = $("#HdrSec5_TxtBoxItmNo_Val").val();
    var GOHPer = $("#HdrSec5_NmricGOHPer_Val").val();
    if (GOHPer == "" || GOHPer == null || GOHPer == undefined) GOHPer = 0;
    var DOHPer = $("#HdrSec5_NmricDOHPer_Val").val();
    if (DOHPer == "" || DOHPer == null || DOHPer == undefined) DOHPer = 0;
    var ProfitPer = $("#HdrSec5_NmricProfitPer_Val").val();
    if (ProfitPer == "" || ProfitPer == null || ProfitPer == undefined) ProfitPer = 0;

    if (fromControl == "FrmTrnRate") {
        ProfitPer = ((TrnRate * 100) / ((1 * Rate) * (1 + ((DOHPer + GOHPer) / 100)) * (1 - (DisPer / 100)))) - 100;
        $("#HdrSec5_NmricProfitPer_Val").data("kendoNumericTextBox").value(ProfitPer);
    } else {
        //TrnRate = ((1 * Rate) * (1 + ((DOHPer + GOHPer) / 100)) * (1 + (ProfitPer / 100)) * (1 - (DisPer / 100)));
        //TrnRate = Rate * (1 + ((DOHPer + GOHPer + ProfitPer) / 100)); 
        TrnRate = Rate * (1 + ((Number(DOHPer) + Number(GOHPer) + Number(ProfitPer)) / 100)); //dont touch ***Narmada***
        //TrnRate = (Number(Rate) * Number(qty)) * (1 + (Number(DOHPer) + Number(GOHPer) + Number(ProfitPer)) * 0.01); 
        $("#HdrSec5_NmricTrnRate_Val").data("kendoNumericTextBox").value(TrnRate);
    }

    //var SubTotal = (qty * Rate);
    var SubTotal = (qty * TrnRate);

    var Disamt = (DisPer / 100) * SubTotal;
    var NBTamt = (NBT / 100) * (SubTotal - Disamt);
    var VATamt = (VAT / 100) * (SubTotal - Disamt + NBTamt);
    var WHTamt = (WHT / 100) * (SubTotal - Disamt);

    var SVATamt = (SVAT / 100) * (SubTotal - Disamt + NBTamt);

    var ourcd = viewBag.OurCd;

    var id = ("#" + viewBag.OurCd);
    var child = $(id).data("kendoGrid");
    
    var sel = child.select();
    var sel_idx = sel.index();
    // Get the item
    var item = child.dataItem(sel);
    // Get the index in the DataSource (not in current page of the grid)
    var idx = child.dataSource.indexOf(item);

    child.dataSource.insert(idx + 1, {

        LiNo: idx + 1,
        ItmNo: ItmNo,
        ItmCd: itmcd,
        ItmKy: itmky,
        ItmNm: itmnm,
        TrnQty: qty,
        Rate: Rate,
        TrnRate: TrnRate,
        SubTotal: SubTotal,
        DisPer: DisPer,
        GOH: GOHPer,
        DOH: DOHPer,
        Profit: ProfitPer,
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
        ReqDt: ReqDt,
        Des: Des,
        Rem: Rem,
        isAct: 1
    }); 
}



