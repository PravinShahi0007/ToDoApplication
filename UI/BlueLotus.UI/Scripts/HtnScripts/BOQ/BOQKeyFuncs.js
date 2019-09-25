var isloadFindBOQDocumentReadyOpen = true;

$(document.body).keydown(function (e) {

    if (e.ctrlKey && e.keyCode == 70) {
        e.preventDefault();
        $("#FindFormOrder").show().kendoWindow({
            width: "1000px",
            height: "500px",
            modal: true,
            title: "Find"
        });
        $('#FindFormOrder').data('kendoWindow').center().open();

        if (isloadFindBOQDocumentReadyOpen) {
            isloadFindBOQDocumentReadyOpen = false
            loadFindBOQDocumentReady();
        }
    }

    if (e.ctrlKey && e.keyCode == 83) {
        e.preventDefault();
        ComSaveFunction();
    }
    //ALT + ENTER 
    if (e.altKey && e.keyCode == 13) {
        var FocusedElement = document.activeElement.id;
        if (FocusedElement == "HdrSec5_TxtDes_Val" || FocusedElement == "HdrSec5_TxtRem_Val" || FocusedElement == "HdrSec7_InptDesc_Val" || FocusedElement == "HdrSec7_InptRemark_Val") {
            var textarea = document.getElementById(FocusedElement);
            textarea.value += "\n";
        }
            e.preventDefault();
    }
       
    
});

function setFocus() {
    $("#HdrSec5_TxtDes_Val").keypress(function (event) {
        var keycode = (event.keyCode ? event.keyCode : event.which);       
        if (keycode == '13') {
            //event.preventDefault();
            //changeItemRalatedTotal();
            //setItmDetailbyEnterky();
            var LiNo = $("#HdrSec5_NmricLiNo_Val").data("kendoNumericTextBox").value();
            if (LiNo == 0 || LiNo == null || LiNo == undefined) {
                setItmDetailbyEnterky();

            } else {
                
                changeItemRalatedTotal();
            }
            event.preventDefault();
        }
    });
    $("#HdrSec5_TxtRem_Val").keypress(function (event) {

        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {
            //event.preventDefault();
            //changeItemRalatedTotal();
            //setItmDetailbyEnterky();
            var LiNo = $("#HdrSec5_NmricLiNo_Val").data("kendoNumericTextBox").value();
            if (LiNo == 0 || LiNo == null || LiNo == undefined) {
                setItmDetailbyEnterky();

            } else {
               
                changeItemRalatedTotal();
            }
            event.preventDefault();
        }
    });

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

    $("#HdrSec5_NmricTrnRate_Val").keydown(function (event) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {
            var LiNo = $("#HdrSec5_NmricLiNo_Val").data("kendoNumericTextBox").value();
            if (LiNo == 0 || LiNo == null || LiNo == undefined) {
                setItmDetailbyEnterky("FrmTrnRate");
            } else {
                changeItemRalatedTotal("FrmTrnRate");
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

    $("#HdrSec5_NmricGOHPer_Val").keydown(function (event) {


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

    $("#HdrSec5_NmricDOHPer_Val").keydown(function (event) {


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

    $("#HdrSec5_NmricProfitPer_Val").keydown(function (event) {


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
    $("#HdrSec5_NmricVatPer_Val").keypress(function (event) {
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
                alert();
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

}
