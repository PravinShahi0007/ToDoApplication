
$(document.body).keydown(function (e) {
    if (e.ctrlKey && e.keyCode == 70) {
        e.preventDefault();
        $("#FindFormSalary").show().kendoWindow({
            width: "1000px",
            height: "550px",
            modal: true,
            title: "Find"
        });
        $('#FindFormSalary').data('kendoWindow').center().open();
    }

});

//$("#HdrSec5_NmricQty_Val").keydown(function (event) {
//    var keycode = (event.keyCode ? event.keyCode : event.which);
//    if (keycode == '13') {
//        //$("#HdrSec5_CmbItm_Cd").data("kendoComboBox").input.focus();
//        var LiNo = $("#HdrSec5_NmricLiNo_Val").data("kendoNumericTextBox").value();
//        if (LiNo == 0 || LiNo == null || LiNo == undefined) {
//            setItmDetailbyEnterky();
//        } else {
//            var Qty = $("#HdrSec5_NmricQty_Val").data("kendoNumericTextBox").value();
//            //' alert(Qty);
//         //   console.log("I was Here")
//            changeItemRalatedTotal();
//        }
//    }
//});




//$("#HdrSec1_DatPicDate_Val").keydown(function (event) {
//    var keycode = (event.keyCode ? event.keyCode : event.which);
//    if (keycode == '13') {
//        var Current_Val = $('#HdrSec1_DatPicDate_Val').val();
//        $('#HdrSec1_DatPicDate_Val').val(CheckDateforAutoMonthYear(Current_Val));
//    }
//});