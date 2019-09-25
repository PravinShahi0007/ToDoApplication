
var LoadAfterOneMinuteFindInvoice_IsOpen_First = true;
$(document.body).keydown(function (e) {
    if (e.ctrlKey && e.keyCode == 70) {
        e.preventDefault();
        CallFindInvoive();
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
    }
});

function CallFindInvoive() {

    if (LoadAfterOneMinuteFindInvoice_IsOpen_First) {
        LoadAfterOneMinuteFindInvoice();
        LoadAfterOneMinuteFindInvoice_IsOpen_First = false;
    }

    $("#FindFormGRN").show().kendoWindow({
        width: "80%",
        height: "550px",
        modal: true,
        title: "Find"
    });
    $('#FindFormGRN').data('kendoWindow').center().open();
    $("#OrdNoTo").focus();

}

//var pressTimer;
//var dragging = false;
//$("body").mouseup(function (e) {
//    clearTimeout(pressTimer);
//    //return false;
//}).mousedown(function (e) {

//    $(window).mousemove(function () {
//        dragging = true;
//        $(window).unbind("mousemove");
//    });

//    pressTimer = window.setTimeout(function ()
//    {
//        //e.preventDefault();

//        if (LoadAfterOneMinuteFindInvoice_IsOpen_First) {
//            LoadAfterOneMinuteFindInvoice();
//            LoadAfterOneMinuteFindInvoice_IsOpen_First = false;
//        }
//        if (dragging == false)
//        {
//            $("#FindFormGRN").show().kendoWindow({
//                width: "1000px",
//                height: "550px",
//                modal: true,
//                title: "Find"
//            });
//            $('#FindFormGRN').data('kendoWindow').center().open();
//            $("#OrdNoTo").focus();
//        }
//    }, 1000);
//    dragging = false;
////return false; 
//});

function FindInvoiceForButton() {
    if (LoadAfterOneMinuteFindInvoice_IsOpen_First) {
        LoadAfterOneMinuteFindInvoice();
        LoadAfterOneMinuteFindInvoice_IsOpen_First = false;
    }

    $("#FindFormGRN").show().kendoWindow({
        width: "1000px",
        height: "550px",
        modal: true,
        title: "Find"
    });
    $('#FindFormGRN').data('kendoWindow').center().open();
    $("#OrdNoTo").focus();
}

//HdrSec5_CmbItm_Val
$("#HdrSec5_CmbItm_Val").keypress(function (event) {
    var keycode = (event.keyCode ? event.keyCode : event.which);

    $("#HdrSec5_CmbItm_Nm").data("kendoComboBox").value(null);
    $("#HdrSec5_CmbItm_Cd").data("kendoComboBox").value(null);

    if (keycode == '13') {

        var itmCdDD = $("#HdrSec5_CmbItm_Val").val();

        if ((itmCdDD == "?") || (itmCdDD.slice(-1) == "?")) {
            OpenItemFindForm(itmCdDD);
        } else {
            $("#HdrSec5_NmricQty_Val").data("kendoNumericTextBox").focus();
            if (FormGlblData.ItmCdWhenDblClick == itmCdDD) {

            }
            else {
                FormGlblData.Detail_Editing_LiNo = 0;

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
                $("#HdrSec5_NmricSubTotal_Val").data("kendoNumericTextBox").value(0);
                $("#HdrSec5_NmricCrossTotal_Val").data("kendoNumericTextBox").value(0);
                $("#HdrSec5_NmricNetTotal_Val").data("kendoNumericTextBox").value(0);
                $("#HdrSec5_CmbTask_Cd").data('kendoComboBox').value(null);
                $("#HdrSec5_CmbUnit_Cd").data('kendoComboBox').value(null);
                GetItmRelatedDet();
            }

            FormGlblData.isItmCdFrmCmb = 1;
            FormGlblData.itmCdFrm = 'ItmCdInpt';
        }
        event.preventDefault();
    }
});

function DetailChangeFire() {
    var LiNo = FormGlblData.Detail_Editing_LiNo;
    if (LiNo == 0 || LiNo == null || LiNo == undefined) {
        setItmDetailbyEnterky();
    } else {
        changeItemRalatedTotal();
    }
}

$("#HdrSec5_NmricQty_Val").keydown(function (event) {
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode == '13') {
        var LiNo = FormGlblData.Detail_Editing_LiNo;
        if (LiNo == 0 || LiNo == null || LiNo == undefined) {
            setItmDetailbyEnterky();
        } else {
            var Qty = $("#HdrSec5_NmricQty_Val").data("kendoNumericTextBox").value();
            changeItemRalatedTotal();
        }
        event.preventDefault();
    }
});

$("#HdrSec5_NmricRate_Val").keydown(function (event) {
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode == '13') {
        var LiNo = FormGlblData.Detail_Editing_LiNo;
        if (LiNo == 0 || LiNo == null || LiNo == undefined) {
            setItmDetailbyEnterky();
        } else {
            changeItemRalatedTotal();
        }
        event.preventDefault();
    }
});

$("#HdrSec7_InptDesc_Val").keydown(function (event) {
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode == '13') {
        var LiNo = FormGlblData.Detail_Editing_LiNo;
        if (LiNo == 0 || LiNo == null || LiNo == undefined) {
            setItmDetailbyEnterky();
        } else {
            changeItemRalatedTotal();
        }
        event.preventDefault();
    }
});

$("#HdrSec7_InptRemark_Val").keydown(function (event) {
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode == '13') {
        var LiNo = FormGlblData.Detail_Editing_LiNo;
        if (LiNo == 0 || LiNo == null || LiNo == undefined) {
            setItmDetailbyEnterky();
        } else {
            changeItemRalatedTotal();
        }
        event.preventDefault();
    }
});


$("#HdrSec8_TaskQty_Val").keydown(function (event) {
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode == '13') {
        var id = ("#" + viewBag.OurCd);
        var LiNo = FormGlblData.Detail_Editing_LiNo;
        if (LiNo == 0 || LiNo == null || LiNo == undefined) {
            setItmDetailbyEnterky();
        } else {
            changeItemRalatedTotal();
        }
        event.preventDefault();
    }
});

$("#HdrSec8_Amt1_Val").keydown(function (event) {
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode == '13') {
        var id = ("#" + viewBag.OurCd);
        var LiNo = FormGlblData.Detail_Editing_LiNo;
        if (LiNo == 0 || LiNo == null || LiNo == undefined) {
            setItmDetailbyEnterky();
        } else {
            changeItemRalatedTotal();
        }
        event.preventDefault();
    }
});

$("#HdrSec8_Amt2_Val").keydown(function (event) {
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode == '13') {
        var id = ("#" + viewBag.OurCd);
        var LiNo = FormGlblData.Detail_Editing_LiNo;
        if (LiNo == 0 || LiNo == null || LiNo == undefined) {
            setItmDetailbyEnterky();
        } else {
            changeItemRalatedTotal();
        }
        event.preventDefault();
    }
});

$("#HdrSec8_Amt3_Val").keydown(function (event) {
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode == '13') {
        var id = ("#" + viewBag.OurCd);
        var LiNo = FormGlblData.Detail_Editing_LiNo;
        if (LiNo == 0 || LiNo == null || LiNo == undefined) {
            setItmDetailbyEnterky();
        } else {
            changeItemRalatedTotal();
        }
        event.preventDefault();
    }
});

$("#HdrSec8_Amt4_Val").keydown(function (event) {
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode == '13') {
        var id = ("#" + viewBag.OurCd);
        var LiNo = FormGlblData.Detail_Editing_LiNo;
        if (LiNo == 0 || LiNo == null || LiNo == undefined) {
            setItmDetailbyEnterky();
        } else {
            changeItemRalatedTotal();
        }
        event.preventDefault();
    }
});

$("#HdrSec8_Amt5_Val").keydown(function (event) {
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode == '13') {
        var id = ("#" + viewBag.OurCd);
        var LiNo = FormGlblData.Detail_Editing_LiNo;
        if (LiNo == 0 || LiNo == null || LiNo == undefined) {
            setItmDetailbyEnterky();
        } else {
            changeItemRalatedTotal();
        }
        event.preventDefault();
    }
});

$("#HdrSec8_Amt6_Val").keydown(function (event) {
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode == '13') {
        var id = ("#" + viewBag.OurCd);
        var LiNo = FormGlblData.Detail_Editing_LiNo;
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
        var LiNo = FormGlblData.Detail_Editing_LiNo;
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
        var LiNo = FormGlblData.Detail_Editing_LiNo;
        if (LiNo == 0 || LiNo == null || LiNo == undefined) {
            setItmDetailbyEnterky();
        } else {
            setDisPerByDisAmt();
        }
        event.preventDefault();
    }
});

$("#HdrSec5_NmricVatPer_Val").keydown(function (event) {
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode == '13') {
        var LiNo = FormGlblData.Detail_Editing_LiNo;
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
        var LiNo = FormGlblData.Detail_Editing_LiNo;
        if (LiNo == 0 || LiNo == null || LiNo == undefined) {
            setItmDetailbyEnterky();
        } else {
            // changeItemRalatedTotal();
            setVatPerByVatAmt();
        }
        event.preventDefault();
    }
});

$("#HdrSec5_NmricNbtAmt_Val").keydown(function (event) {
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode == '13') {
        var LiNo = FormGlblData.Detail_Editing_LiNo;
        if (LiNo == 0 || LiNo == null || LiNo == undefined) {
            setItmDetailbyEnterky();
        } else {
            setNBTPerByNBTAmt();
            //  changeItemRalatedTotal();
        }
        event.preventDefault();
    }
});

$("#HdrSec5_NmricNbtPer_Val").keydown(function (event) {
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode == '13') {
        var LiNo = FormGlblData.Detail_Editing_LiNo;
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
        var LiNo = FormGlblData.Detail_Editing_LiNo;
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
        var LiNo = FormGlblData.Detail_Editing_LiNo;
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
        var LiNo = FormGlblData.Detail_Editing_LiNo;
        if (LiNo == 0 || LiNo == null || LiNo == undefined) {
            setItmDetailbyEnterky();
        } else {
            setWHTPerByWHTAmt();
            //changeItemRalatedTotal();
        }
        event.preventDefault();
    }
});

$("#HdrSec5_NmricWhtPer_Val").keydown(function (event) {
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode == '13') {
        var LiNo = FormGlblData.Detail_Editing_LiNo;
        if (LiNo == 0 || LiNo == null || LiNo == undefined) {
            setItmDetailbyEnterky();
        } else {
            changeItemRalatedTotal();
        }
        event.preventDefault();
    }
});

$("#HdrSec5_NmricSubTotal_Val").keydown(function (event) {
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode == '13') {
        var LiNo = FormGlblData.Detail_Editing_LiNo;
        if (LiNo == 0 || LiNo == null || LiNo == undefined) {
            //setItmDetailbyEnterky();
        } else {
            changeItemRalatedTotalCommon("SubTotal");
        }
        event.preventDefault();
    }
});

$("#HdrSec5_NmricCrossTotal_Val").keydown(function (event) {
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode == '13') {
        var LiNo = FormGlblData.Detail_Editing_LiNo;
        if (LiNo == 0 || LiNo == null || LiNo == undefined) {
            //setItmDetailbyEnterky();
        } else {
            changeItemRalatedTotalCommon("CrossTotal");
        }
        event.preventDefault();
    }
});

$("#HdrSec5_NmricNetTotal_Val").keydown(function (event) {
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode == '13') {
        var LiNo = FormGlblData.Detail_Editing_LiNo;
        if (LiNo == 0 || LiNo == null || LiNo == undefined) {
            //setItmDetailbyEnterky();
        } else {
            changeItemRalatedTotalCommon("NetTotal");
        }
        event.preventDefault();
    }
});

$("#HdrSec1_DatPicDate_Val").keydown(function (event) {
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode == '13') {
        var Current_Val = $('#HdrSec1_DatPicDate_Val').val();
        $('#HdrSec1_DatPicDate_Val').val(CheckDateforAutoMonthYear(Current_Val));
        event.preventDefault();
    }
});