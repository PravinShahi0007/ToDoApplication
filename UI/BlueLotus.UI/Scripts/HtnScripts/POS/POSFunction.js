function POSFunctions(OurCd, CdNm) {
    $("#posFunctionLabel").empty();

    if (OurCd == "TillChk") {
        tillChkDialog.dialog("open");
    } else {
        $("#posFunctionLabel").append(CdNm + " :    \t");
    }
}


$(function () {

    tillChkDialog = $("#tillChkDialog").dialog({
        autoOpen: false,
        height: 300,
        width: 350,
        modal: true,
        buttons: {
            "Add": add,
            Cancel: function () {
                dialog.dialog("close");
            }
        },
        close: function () {
            //form[0].reset();
            //allFields.removeClass("ui-state-error");
        }
    });

    function add() {
        alert("Hi");
    }

});