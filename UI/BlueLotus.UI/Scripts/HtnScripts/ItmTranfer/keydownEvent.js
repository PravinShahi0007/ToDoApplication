
var FindFormGRN_IsOpen_IsFire_ItmTrnfer = true;
$(document.body).keydown(function (e) {

    if (e.ctrlKey && e.keyCode == 70) {
        if (FindFormGRN_IsOpen_IsFire_ItmTrnfer) {

            FindFormGRN_IsOpen_IsFire_ItmTrnfer = false;

            // LoadComboFindForm1();
            // LoadGridFindView1();
            $('#HdrSec16_Chkbox_FF_IsRec_Val').prop('checked', false);
        }
        e.preventDefault();
        $("#FindFormGRN").show().kendoWindow({
            width: "80%",
            height: "75%",
            modal: true,
            title: "Find"
        });
        $('#FindFormGRN').data('kendoWindow').center().open();
        $("#HdrSec16_Inpt_FF_OrdNo_Val").focus();
        //document.getElementById("FindFormGRN").style.overflow = "hidden";
    }

    if (e.ctrlKey && e.keyCode == 71) {
        e.preventDefault();
        $("#Form_ObjMas_Form_Prop_Setting_Grid").show().kendoWindow({
            width: "1000px",
            height: "550px",
            modal: true,
            title: "Find"
        });
        $('#Form_ObjMas_Form_Prop_Setting_Grid').data('kendoWindow').center().open().maximize();
    }

    if (e.ctrlKey && e.keyCode == 83) {
        e.preventDefault();
        ComSaveFunction();
        //document.getElementById("FindFormGRN").style.overflow = "hidden";
    }

    //ALT + ENTER
    var ActivElement = document.activeElement.id;
    if (ActivElement == 'HdrSec5_InptDesc_Val' || ActivElement == 'HdrSec5_InptRemark_Val' || ActivElement == 'HdrSec6_InptDesc_Val' || ActivElement == 'HdrSec10_InptRem_Val') {
        textareaNewLien(ActivElement);
    }    
});

function setFocus() {
    $("#HdrSec6_InptDesc_Val").keydown(function (event) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (event.keyCode === 13 && event.altKey) {
            return
        }
        if (keycode == '13') {
            var ItmKy = $("#HdrSec6_CmbItm_Cd").data("kendoComboBox").value();
            if (!ItmKy || ItmKy == "") {
                return;
            }
            var FrmPrjKy = $("#HdrSec2_CmbFrmPrj_Cd").data("kendoComboBox").value();
            if (!FrmPrjKy || FrmPrjKy == "") {
                FrmPrjKy = 1;
            }
            var FrmLcKy = $("#HdrSec2_CmbFrmLoc_Cd").data("kendoComboBox").value();
            if (!FrmLcKy || FrmLcKy == "") {
                FrmLcKy = 1;
            }

            $.ajax({
                url: urlGetAvilableQty,
                data: JSON.stringify({
                    ItmKy: ItmKy,
                    FrmPrjKy: FrmPrjKy,
                    ToPrjKy: 1,
                    FrmLockKy: FrmLcKy,
                    ToLocKy: 1,
                    TrnTyp: FormGlblData.OrdTypKy,
                    ObjKy: viewBag.ObjKy,

                }),
                contentType: 'application/json; charset=utf-8',
                dataType: "Json",
                type: "POST",
                success: function (data) {
                    if (data) {
                        // document.getElementById('HdrSec6_CmbItmLdd_Lbl').innerHTML = 'Brand :- ' + data.ItmBrnd + 'Avl.Qty ' + data.Qty + 'Bud.Qty :- ' + data.AvlBudgetQty;
                        var EntQty = $("#HdrSec7_InptQty_Val").data("kendoNumericTextBox").value();
                        if (data.Qty < EntQty && data.isLock == true) {
                            alert("Available Qty is " + data.Qty + "you cannot have more than avalable Qty");
                            trn = false;
                        } else {
                            var LiNo = $("#HdrSec10_InptLiNo_Val").data("kendoNumericTextBox").value();
                            if (LiNo == 0 || LiNo == null || LiNo == undefined) {
                                setItmDetailbyEnterky();
                            } else {
                                var Qty = $("#HdrSec7_InptQty_Val").data("kendoNumericTextBox").value();
                                changeItemRalatedTotal();
                            }
                            event.preventDefault();

                        }

                    }
                    return trn;

                },
                error: function (e) {
                    alert("Sorry, We Couldn't retrive the data !\nPlease Try Again!");
                    return false;
                }
            });
        }
    });

    $("#HdrSec10_InptRem_Val").keydown(function (event) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (event.keyCode === 13 && event.altKey) {
        return
        }
        if (keycode == '13') {
            event.preventDefault();
            changeItemRalatedTotal();
        }
    });


    $("#HdrSec7_InptQty_Val").keydown(function (event) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {

            var ItmKy = $("#HdrSec6_CmbItm_Cd").data("kendoComboBox").value();
            if (!ItmKy || ItmKy == "") {
                return;
            }
            var FrmPrjKy = $("#HdrSec2_CmbFrmPrj_Cd").data("kendoComboBox").value();
            if (!FrmPrjKy || FrmPrjKy == "") {
                FrmPrjKy = 1;
            }
            var FrmLcKy = $("#HdrSec2_CmbFrmLoc_Cd").data("kendoComboBox").value();
            if (!FrmLcKy || FrmLcKy == "") {
                FrmLcKy = 1;
            }

            $.ajax({
                url: urlGetAvilableQty,
                data: JSON.stringify({
                    ItmKy: ItmKy,
                    FrmPrjKy: FrmPrjKy,
                    ToPrjKy: 1,
                    FrmLockKy: FrmLcKy,
                    ToLocKy: 1,
                    TrnTyp: FormGlblData.OrdTypKy,
                    ObjKy: viewBag.ObjKy,

                }),
                contentType: 'application/json; charset=utf-8',
                dataType: "Json",
                type: "POST",
                success: function (data) {
                    if (data) {
                        // document.getElementById('HdrSec6_CmbItmLdd_Lbl').innerHTML = 'Brand :- ' + data.ItmBrnd + 'Avl.Qty ' + data.Qty + 'Bud.Qty :- ' + data.AvlBudgetQty;
                        var EntQty = $("#HdrSec7_InptQty_Val").data("kendoNumericTextBox").value();
                        if (data.Qty < EntQty && data.isLock == true) {
                            alert("Available Qty is " + data.Qty + "you cannot have more than avalable Qty");
                            //trn = false;
                        } else {
                            var LiNo = $("#HdrSec10_InptLiNo_Val").data("kendoNumericTextBox").value();
                            if (LiNo == 0 || LiNo == null || LiNo == undefined) {
                                // Bind New line
                                setItmDetailbyEnterky();
                            } else {
                                var Qty = $("#HdrSec7_InptQty_Val").data("kendoNumericTextBox").value();
                                // change Existing Line
                                changeItemRalatedTotal();
                            }
                            event.preventDefault();
                        }

                    }
                    //return trn;

                },
                error: function (e) {
                    alert("Sorry, We Couldn't retrive the data !\nPlease Try Again!");
                    return false;
                }
            });



        }
    });

    $("#HdrSec7_InptRate_Val").keydown(function (event) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {
            var LiNo = $("#HdrSec10_InptLiNo_Val").data("kendoNumericTextBox").value();
            if (LiNo == 0 || LiNo == null || LiNo == undefined) {
                setItmDetailbyEnterky();
            } else {
                changeItemRalatedTotal();
            }
            event.preventDefault();
        }
    });

    $("#HdrSec7_InptDis_Val").keydown(function (event) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {
            var id = ("#" + viewBag.OurCd);
            var LiNo = $("#HdrSec10_InptLiNo_Val").data("kendoNumericTextBox").value();
            if (LiNo == 0 || LiNo == null || LiNo == undefined) {
                setItmDetailbyEnterky();
            } else {
                changeItemRalatedTotal();
            }
            event.preventDefault();
        }
    });

    $("#HdrSec7_InptDisAmt_Val").keydown(function (event) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {
            var LiNo = $("#HdrSec10_InptLiNo_Val").data("kendoNumericTextBox").value();
            if (LiNo == 0 || LiNo == null || LiNo == undefined) {
                setItmDetailbyEnterky();
            } else {
                //changeItemRalatedTotal();
                setDisPerByDisAmt();
            }
            event.preventDefault();
        }
    });

    $("#HdrSec8_InptVat_Val").keydown(function (event) {

        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {
            var LiNo = $("#HdrSec10_InptLiNo_Val").data("kendoNumericTextBox").value();
            if (LiNo == 0 || LiNo == null || LiNo == undefined) {
                setItmDetailbyEnterky();
            } else {
                changeItemRalatedTotal();
            }
            event.preventDefault();
        }
    });

    $("#HdrSec8_InptVatAmt_Val").keydown(function (event) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {
            var LiNo = $("#HdrSec10_InptLiNo_Val").data("kendoNumericTextBox").value();
            if (LiNo == 0 || LiNo == null || LiNo == undefined) {
                setItmDetailbyEnterky();
            } else {
                setVatPerByVatAmt();
                //changeItemRalatedTotal();
            }
            event.preventDefault();
        }
    });

    $("#HdrSec8_InptNBTAmt_Val").keydown(function (event) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {
            var LiNo = $("#HdrSec10_InptLiNo_Val").data("kendoNumericTextBox").value();
            if (LiNo == 0 || LiNo == null || LiNo == undefined) {
                setItmDetailbyEnterky();
            } else {
                setNBTPerByNBTAmt();
                //changeItemRalatedTotal();
            }
            event.preventDefault();
        }
    });

    $("#HdrSec8_InptNBT_Val").keydown(function (event) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {
            var LiNo = $("#HdrSec10_InptLiNo_Val").data("kendoNumericTextBox").value();
            if (LiNo == 0 || LiNo == null || LiNo == undefined) {
                setItmDetailbyEnterky();
            } else {
                changeItemRalatedTotal();
            }
            event.preventDefault();
        }
    });

    $("#HdrSec9_InptSVAT_Val").keydown(function (event) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {
            var LiNo = $("#HdrSec10_InptLiNo_Val").data("kendoNumericTextBox").value();
            if (LiNo == 0 || LiNo == null || LiNo == undefined) {
                setItmDetailbyEnterky();
            } else {
                changeItemRalatedTotal();
            }
            event.preventDefault();
        }
    });

    $("#HdrSec9_InptSVATAmt_Val").keydown(function (event) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {
            var LiNo = $("#HdrSec10_InptLiNo_Val").data("kendoNumericTextBox").value();
            if (LiNo == 0 || LiNo == null || LiNo == undefined) {
                setItmDetailbyEnterky();
            } else {
                setSVatPerBySVatAmt();
                //changeItemRalatedTotal();
            }
            event.preventDefault();
        }
    });

    $("#HdrSec9_InptWHTAmt_Val").keydown(function (event) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {
            var LiNo = $("#HdrSec10_InptLiNo_Val").data("kendoNumericTextBox").value();
            if (LiNo == 0 || LiNo == null || LiNo == undefined) {
                setItmDetailbyEnterky();
            } else {
                setWHTPerByWHTAmt();
                //changeItemRalatedTotal();
            }
            event.preventDefault();
        }
    });

    $("#HdrSec9_InptWHT_Val").keydown(function (event) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {
            var LiNo = $("#HdrSec10_InptLiNo_Val").data("kendoNumericTextBox").value();
            if (LiNo == 0 || LiNo == null || LiNo == undefined) {
                setItmDetailbyEnterky();
            } else {
                changeItemRalatedTotal();
            }
            event.preventDefault();
        }
    });

    $("#HdrSec1_DatPicDate_Val").keydown(function (event) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {
            var Current_dateVal = $('#HdrSec1_DatPicDate_Val').val();
            var Real_Date = CheckDateforAutoMonthYear(Current_dateVal);
            $('#HdrSec1_DatPicDate_Val').val(Real_Date);
            event.preventDefault();
        }
    });


}