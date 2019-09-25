var FindFormOrder_IsOpen_IsFire = true;

$(document.body).keydown(function (e) {

    if (e.ctrlKey && e.keyCode == 70) {

        if (FindFormOrder_IsOpen_IsFire) {

            FindFormOrder_IsOpen_IsFire = false;

            var Now = new Date();
            var dd = Now.getDate();
            if (dd == 0) dd = 01;
            var mm = Now.getMonth() + 1;
            var yy = Now.getFullYear();
            //$("#HdrSec16_Dat_FF_FromDate_Val").val(dd + "/" + mm + "/" + yy);
            LoadOrderCombo_Form_FinPO();
            //LoadGridFindView_Form_FinPO();
            $('#HdrSec16_Chkbox_FF_IsRec_Val').prop('checked', false);

            var height = $(window).height() - 70;
            var h2 = $("#filterCont").height();
            $("#body").height(height);
            $("#grid").height(height - (35 + h2 + 40));
        }

        e.preventDefault();
        $("#FindFormOrder").show().kendoWindow({
            width: "80%",
            height: "500px",
            modal: true,
            title: "Find"
        });
        $('#FindFormOrder').data('kendoWindow').center().open();
    }

    if (e.ctrlKey && e.keyCode == 83) {
        e.preventDefault();
        ComSaveFunction();
    }

    //---------- Shift + Enter Key Event
    //if (e.shiftKey && e.keyCode == 13) {
    //    var FocusedElement = document.activeElement.id;
    //    if (FocusedElement == "HdrSec7_InptDesc_Val") {
    //        var value = $("#HdrSec7_InptDesc_Val").val();
    //        $("#HdrSec7_InptDesc_Val").val(value + "\n");
    //    }
    //    e.preventDefault();
    //}

    //ALT + ENTER
    var ActivElement = document.activeElement.id;
    if (ActivElement == 'HdrSec7_InptDesc_Val' || ActivElement == 'HdrSec7_InptRemark_Val' || ActivElement == 'HdrSec5_TxtDes_Val' || ActivElement == 'HdrSec5_TxtRem_Val') {
        textareaNewLien(ActivElement);
    }   
});

function setFocus() {

    //HdrSec5_CmbItm_Val
    $("#HdrSec5_CmbItm_Val").keypress(function (event) {
        var keycode = (event.keyCode ? event.keyCode : event.which);

        $("#HdrSec5_CmbItm_Nm").data("kendoComboBox").value(null);
        $("#HdrSec5_CmbItm_Cd").data("kendoComboBox").value(null);

        if (keycode == '13') {
            $("#HdrSec5_NmricQty_Val").data("kendoNumericTextBox").focus();
            var itmCdDD = $("#HdrSec5_CmbItm_Val").val();
            if (FormGlblData.ItmCdWhenDblClick == itmCdDD) {

            }
            else {

                //$("#HdrSec5_CmbItm_Nm").data("kendoComboBox").value(null);
                //$("#HdrSec5_CmbItm_Cd").data("kendoComboBox").value(null);

                //var cmbDataFull = $('#HdrSec5_CmbItm_Cd').data().kendoComboBox;
                //var selectedItem = cmbDataFull.dataItem(itmCdDD);

                //$("#HdrSec5_CmbItm_Cd").data("kendoComboBox").value(selectedItem.ItmKy);
                //LoadUnitCombo(selectedItem.ItmKy);

                $("#HdrSec5_NmricQty_Val").data("kendoNumericTextBox").value('');
                $("#HdrSec5_NmricRate_Val").data("kendoNumericTextBox").value(0);
                $("#HdrSec5_NmricDisPer_Val").data("kendoNumericTextBox").value(0);
                $("#HdrSec5_NmricDisAmt_Val").data("kendoNumericTextBox").value(0);
                $("#HdrSec5_NmricVatAmt_Val").data("kendoNumericTextBox").value(0);
                $("#HdrSec5_NmricVatPer_Val").data("kendoNumericTextBox").value(0);
                $("#HdrSec5_NmricVatAmt_Val").data("kendoNumericTextBox").value(0);
                $("#HdrSec5_NmricSVatPer_Val").data("kendoNumericTextBox").value(0);
                $("#HdrSec5_NmricSVatAmt_Val").data("kendoNumericTextBox").value(0);
                $("#HdrSec5_NmricNbtPer_Val").data("kendoNumericTextBox").value(0);
                $("#HdrSec5_NmricNbtAmt_Val").data("kendoNumericTextBox").value(0);
                $("#HdrSec5_NmricWhtPer_Val").data("kendoNumericTextBox").value(0);
                $("#HdrSec5_NmricWhtAmt_Val").data("kendoNumericTextBox").value(0);
                $("#HdrSec5_NmricLiNo_Val").data("kendoNumericTextBox").value(0);
                $("#HdrSec5_NmricSubTotal_Val").data("kendoNumericTextBox").value(0);
                $("#HdrSec5_CmbTask_Cd").data('kendoComboBox').value(null);
                $("#HdrSec5_CmbUnit_Cd").data('kendoComboBox').value(null);
                GetItmRelatedDet();
            }

            FormGlblData.isItmCdFrmCmb = 1;
            FormGlblData.itmCdFrm = 'ItmCdInpt';
            event.preventDefault();
        }
    });


    $("#HdrSec5_TxtDes_Val").keydown(function (event) {

        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (event.keyCode === 13 && event.altKey) {
            return
        }
        if (keycode == '13') {
            var LiNo = $("#HdrSec5_NmricLiNo_Val").data("kendoNumericTextBox").value();
            if (LiNo == 0 || LiNo == null || LiNo == undefined) {
                setItmDetailbyEnterky();
            } else {
                var Qty = $("#HdrSec5_NmricQty_Val").data("kendoNumericTextBox").value();
                changeItemRalatedTotal();
            }
            event.preventDefault();
        }

        //var keycode = (event.keyCode ? event.keyCode : event.which);
        //if (keycode == '13') {
        //    event.preventDefault();
        //    changeItemRalatedTotal();
        //}
    });
    $("#HdrSec5_TxtRem_Val").keydown(function (event) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (event.keyCode === 13 && event.altKey) {          
            return
        }       
        if (keycode == '13') {
            var LiNo = $("#HdrSec5_NmricLiNo_Val").data("kendoNumericTextBox").value();
            if (LiNo == 0 || LiNo == null || LiNo == undefined) {
                setItmDetailbyEnterky();
            } else {
                var Qty = $("#HdrSec5_NmricQty_Val").data("kendoNumericTextBox").value();
                changeItemRalatedTotal();
            }
            event.preventDefault();
        }
        //var keycode = (event.keyCode ? event.keyCode : event.which);
        //if (keycode == '13') {
        //    event.preventDefault();
        //    changeItemRalatedTotal();
        //}
    });
    //$("#HdrSec1_InptDocNo_Val").keydown(function (event) {

    //    var keycode = (event.keyCode ? event.keyCode : event.which);
    //    if (keycode == '13') {
    //        $("#HdrSec1_CmbDeliNo_Cd").focus();
    //    }
    //});
    //$("#HdrSec1_InptYurRef_Val").keydown(function (event) {

    //    var keycode = (event.keyCode ? event.keyCode : event.which);
    //    if (keycode == '13') {
    //        $("#HdrSec2_CmbPrj_Cd").data("kendoComboBox").input.focus();
    //    }
    //});
    $("#HdrSec5_NmricQty_Val").keydown(function (event) {

        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {
            var LiNo = $("#HdrSec5_NmricLiNo_Val").data("kendoNumericTextBox").value();
            if (LiNo == 0 || LiNo == null || LiNo == undefined) {
                setItmDetailbyEnterky();

            } else {
                var Qty = $("#HdrSec5_NmricQty_Val").data("kendoNumericTextBox").value();
                //' alert(Qty);
                changeItemRalatedTotal();

            }

            event.preventDefault();

        }
    });

    //HdrSec5_DatPicReqDt_Val
    $("#HdrSec5_DatPicReqDt_Val").keydown(function (event) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {
            var LiNo = $("#HdrSec5_NmricLiNo_Val").data("kendoNumericTextBox").value();
            if (LiNo == 0 || LiNo == null || LiNo == undefined) {
                setItmDetailbyEnterky();
            } else {
                changeItemRalatedTotal();
            }
            event.preventDefault();
        }
    });

    $("#HdrSec5_NmricRate_Val").keydown(function (event) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {
            var LiNo = $("#HdrSec5_NmricLiNo_Val").data("kendoNumericTextBox").value();
            if (LiNo == 0 || LiNo == null || LiNo == undefined) {
                setItmDetailbyEnterky();
            } else {
                changeItemRalatedTotal();
            }
            event.preventDefault();
        }
    });

    $("#HdrSec5_NmricDisPer_Val").keydown(function (event) {


        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {
            var id = ("#" + viewBag.OurCd);

            var LiNo = $("#HdrSec5_NmricLiNo_Val").data("kendoNumericTextBox").value();
            if (LiNo == 0 || LiNo == null || LiNo == undefined) {
                setItmDetailbyEnterky();

            } else {
                changeItemRalatedTotal();

            }
            event.preventDefault();
        }
    });
    $("#HdrSec5_NmricDisAmt_Val").keydown(function (event) {


        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {

            var LiNo = $("#HdrSec5_NmricLiNo_Val").data("kendoNumericTextBox").value();
            if (LiNo == 0 || LiNo == null || LiNo == undefined) {
                setItmDetailbyEnterky();

            } else {
                // changeItemRalatedTotal();
                setDisPerByDisAmt();
            }

            event.preventDefault();
        }
    });
    $("#HdrSec5_NmricVatPer_Val").keydown(function (event) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {

            var LiNo = $("#HdrSec5_NmricLiNo_Val").data("kendoNumericTextBox").value();
            if (LiNo == 0 || LiNo == null || LiNo == undefined) {
                setItmDetailbyEnterky();

            } else {
                changeItemRalatedTotal();

            }

            event.preventDefault();
        }
    });
    $("#HdrSec5_NmricVatAmt_Val").keydown(function (event) {


        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {

            var LiNo = $("#HdrSec5_NmricLiNo_Val").data("kendoNumericTextBox").value();
            if (LiNo == 0 || LiNo == null || LiNo == undefined) {
                setItmDetailbyEnterky();

            } else {
                setVatPerByVatAmt();
                // changeItemRalatedTotal();

            }

            event.preventDefault();
        }
    });   

    $("#HdrSec5_NmricNbtAmt_Val").keydown(function (event) {


        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {

            var LiNo = $("#HdrSec5_NmricLiNo_Val").data("kendoNumericTextBox").value();
            if (LiNo == 0 || LiNo == null || LiNo == undefined) {
                setItmDetailbyEnterky();

            } else {
                setNBTPerByNBTAmt();
                //changeItemRalatedTotal();
            }
            event.preventDefault();
        }
    });
    $("#HdrSec5_NmricNbtPer_Val").keydown(function (event) {


        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {

            var LiNo = $("#HdrSec5_NmricLiNo_Val").data("kendoNumericTextBox").value();
            if (LiNo == 0 || LiNo == null || LiNo == undefined) {
                setItmDetailbyEnterky();

            } else {
                changeItemRalatedTotal();

            }
            event.preventDefault();
        }
    });
    $("#HdrSec5_NmricSVatPer_Val").keydown(function (event) {


        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {

            var LiNo = $("#HdrSec5_NmricLiNo_Val").data("kendoNumericTextBox").value();
            if (LiNo == 0 || LiNo == null || LiNo == undefined) {
                setItmDetailbyEnterky();

            } else {
                changeItemRalatedTotal();

            }
            event.preventDefault();
        }
    });
    $("#HdrSec5_NmricSVatAmt_Val").keydown(function (event) {


        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {

            var LiNo = $("#HdrSec5_NmricLiNo_Val").data("kendoNumericTextBox").value();
            if (LiNo == 0 || LiNo == null || LiNo == undefined) {
                setItmDetailbyEnterky();

            } else {
                setSVatPerBySVatAmt();

            }
            event.preventDefault();
        }
    });
    $("#HdrSec5_NmricWhtAmt_Val").keydown(function (event) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {
            var LiNo = $("#HdrSec5_NmricLiNo_Val").data("kendoNumericTextBox").value();
            if (LiNo == 0 || LiNo == null || LiNo == undefined) {
                setItmDetailbyEnterky();
            } else {
                //alert();
                setWHTPerByWHTAmt();
            }
            event.preventDefault();
        }
    });
    $("#HdrSec5_NmricWhtPer_Val").keydown(function (event) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {
            var LiNo = $("#HdrSec5_NmricLiNo_Val").data("kendoNumericTextBox").value();
            if (LiNo == 0 || LiNo == null || LiNo == undefined) {
                setItmDetailbyEnterky();
            } else {
                changeItemRalatedTotal();
            }
            event.preventDefault();
        }
    });

    $("#HdrSec5_TxtItmNo_Val").keydown(function (event) {


        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {

            var LiNo = $("#HdrSec5_NmricLiNo_Val").data("kendoNumericTextBox").value();
            if (LiNo == 0 || LiNo == null || LiNo == undefined) {
                setItmDetailbyEnterky();

            } else {
                changeItemRalatedTotal();

            }
            event.preventDefault();
        }
    });


    $("#HdrSec1_DatPicProdDeliveryDate_Val").keydown(function (event) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {
            var Current_DateVal = $('#HdrSec1_DatPicProdDeliveryDate_Val').val();
            var RealDate = CheckDateforAutoMonthYear(Current_DateVal);
            $('#HdrSec1_DatPicProdDeliveryDate_Val').val(RealDate);
            event.preventDefault();
        }
    });
    $("#HdrSec1_DatPicDate_Val").keydown(function (event) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {
            var Current_DateVal = $('#HdrSec1_DatPicDate_Val').val();
            var RealDate = CheckDateforAutoMonthYear(Current_DateVal);
            $('#HdrSec1_DatPicDate_Val').val(RealDate);
            event.preventDefault();
        }
    });
}

