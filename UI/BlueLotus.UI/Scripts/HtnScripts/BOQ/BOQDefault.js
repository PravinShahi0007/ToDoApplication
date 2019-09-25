function getDefault() {
    var objky = viewBag.ObjKy;
    $.ajax({
        url: urlTransactionGetDefaultVal,
        dataType: "json",
        type: "POST",
        data: JSON.stringify({
            ObjKy: objky
        }),
        contentType: 'application/json; charset=utf-8',
        success: function (list) {

            for (j = 0; j < list.length; j++) {

                var ObjCaptn = list[j].ObjCaptn;

                if (ObjCaptn == "LocationCd") {
                    var defaultval = list[j].Default;
                    var myComboBox = $('#HdrSec2_CmbLoc_Cd').data('kendoComboBox');
                    myComboBox.text(defaultval);
                }
                if (ObjCaptn == "LocationNm") {
                    var defaultval = list[j].Default;
                    var myComboBox = $('#HdrSec2_CmbLoc_Nm').data('kendoComboBox');
                    myComboBox.text(defaultval);
                }
                if (ObjCaptn == "AccountCd") {
                    var defaultval = list[j].Default;
                    var myComboBox = $('#HdrSec2_CmbContractAcc_Cd').data('kendoComboBox');
                    myComboBox.text(defaultval);
                }
                if (ObjCaptn == "AccountNm") {
                    var defaultval = list[j].Default;
                    var myComboBox = $('#HdrSec2_CmbContractAcc_Nm').data('kendoComboBox');
                    myComboBox.text(defaultval);
                }
            }
        },
        error: function (e) { }
    })
}

function setDefault() {

    $.ajax({
        url: urlGetDefaultPmtTrm,
        contentType: "application/json; charset=utf-8",
        dataType: "Json",
        type: "POST",
        success: function (data) {
            for (var i = 0; i < data.length; i++) {
                $("#HdrSec3_CmbPmtTrms_Cd").data("kendoComboBox").value(data[i].CdKy);
            }
        },
        error: function (e) {
            return false;
        }
    });

}

