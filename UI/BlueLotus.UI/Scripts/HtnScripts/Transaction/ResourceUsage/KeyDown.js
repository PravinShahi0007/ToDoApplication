
var LoadAfterOneMinuteFindInvoice_IsOpen_First = true;
$(document.body).keydown(function (e) {
    if (e.ctrlKey && e.keyCode == 70) {
        e.preventDefault();

        if (LoadAfterOneMinuteFindInvoice_IsOpen_First) {
            LoadAfterOneMinuteFindInvoice();
            LoadAfterOneMinuteFindInvoice_IsOpen_First = false;
        }
        try {
            //      $('#FindFormGridGRN').data().kendoGrid.destroy();
            $("#FindFormGridGRN").data("kendoGrid").dataSource.data([]);
            // $('#FindFormGridGRN').empty();
        } catch (e) { }
        $("#FindFormGRN").show().kendoWindow({
            width: "1000px",
            height: "550px",
            modal: true,
            title: "Find"
        });
        $('#FindFormGRN').data('kendoWindow').center().open();
        //$("#OrdNoTo").focus();

    }
});


$("#HdrSec2_NmricQty_Val").keydown(function (event) {
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode == '13') {

        var PrjKy = $("#HdrSec1_CmbProject_Cd").data('kendoComboBox').value();
        var Resourcecmb = $("#HdrSec2_CmbResource_Cd").data('kendoComboBox').value();

        if (PrjKy == 1 || PrjKy == null || PrjKy == undefined || PrjKy == "") {
            alert("Please Select Project!");
            return;
        }
        if (Resourcecmb == 1 || Resourcecmb == null || Resourcecmb == undefined || Resourcecmb == "") {
            alert("Please select Resource!");
            return;
        }

        var LiNo = FormGlblData.Detail_Editing_LiNo;
        if (LiNo == 0 || LiNo == null || LiNo == undefined || LiNo == "") {
            setItmDetailbyEnterky();
        } else {
            changeDetails();
        }
        event.preventDefault();
    }
});

function preventPost(e) {
    if (e.keyCode === 13) {
        var LiNo = FormGlblData.Detail_Editing_LiNo;
        if (LiNo == 0 || LiNo == null || LiNo == undefined || LiNo == "") {
            //setItmDetailbyEnterky();
        } else {
            changeDetails();
        }
        e.preventDefault();
    }
}