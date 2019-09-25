


function LoadPopupCombo() {

    $("#HdrSec1_CmbItmNm_Nm").kendoComboBox({
        dataValueField: "ItmKy",
        dataTextField: "ItmNm",
        dataSource: ItmNm_SelectMob_Datasource('HdrSec1_CmbItmNm'),
        change: function (e) {

            var cmb = $("#HdrSec1_CmbItmNm_Nm").data("kendoComboBox");
            var ItmNo = cmb.value();


            if (ItmNo != "") {
                var validate = ComboValidations("HdrSec1_CmbItmcd_cd");

                if (validate) {
                    $("#HdrSec1_CmbItmcd_cd").data("kendoComboBox").value(ItmNo);

                } else {
                    $("#HdrSec1_CmbItmcd_cd").data("kendoComboBox").value("");

                }
            }

        },
        filter: "contains",
        suggest: true,
        placeholder: "Select a Item.."
    });

    $("#HdrSec1_CmbItmcd_cd").kendoComboBox({
        dataValueField: "ItmKy",
        dataTextField: "ItmCd",
        dataSource: ItmCd_SelectMob_Datasource('HdrSec1_CmbItmcd'),
        change: function (e) {

            var cmb = $("#HdrSec1_CmbItmcd_cd").data("kendoComboBox");
            var ItmNo = cmb.value();


            if (ItmNo != "") {
                var validate = ComboValidations("HdrSec1_CmbItmNm_Nm");

                if (validate) {
                    $("#HdrSec1_CmbItmNm_Nm").data("kendoComboBox").value(ItmNo);

                } else {
                    $("#HdrSec1_CmbItmNm_Nm").data("kendoComboBox").value("");

                }
            }

        },
        filter: "contains",
        suggest: true,
        placeholder: "Select a Items.."
    });
}

function saveItmAddress()
{
    var AdrKy = $("#HdrSec1_InptAdrKy_Val").val();
    var ItmKy = $("#HdrSec1_CmbItmcd_cd").data('kendoComboBox').value();
    if (ItmKy == null || ItmKy == undefined || ItmKy == "" || ItmKy == 1) {
        alert("Select Item")
        return;
    }

    $.ajax({
        url: ItmAdr_InsertUpdateWeb,
        data: JSON.stringify({
            
            AdrKy: Number(AdrKy),
            ItmKy: Number(ItmKy),
            ItmAdrKy: FormGlblData.ItmAdrKy
        }),
        contentType: 'application/json; charset=utf-8',
        dataType: "Json",
        type: "POST",
        success: function (data) {
            if (data) {
                FormGlblData.ItmAdrKy <= data;
                alert("Successfully Saved");
            }
            else { alert("Failed Try Again"); }
        },
        error: function (e) {
            alert("Failed");
            return false;
        }
    });
}


function selectItm(adrKy) {
    //var AdrKy = $("#HdrSec1_InptAdrKy_Val").val();
    $("#HdrSec1_CmbItmcd_cd").data('kendoComboBox').value("");
    $("#HdrSec1_CmbItmNm_Nm").data('kendoComboBox').value("");
    $.ajax({
        url: urlItmAdr_SelectWeb,
        data: JSON.stringify({

            ItmKy: adrKy

        }),
        contentType: 'application/json; charset=utf-8',
        dataType: "Json",
        type: "POST",
        success: function (Item) {
            if (Item.length > 0) {
                $("#HdrSec1_CmbItmcd_cd").data('kendoComboBox').value(Item[0].ItmKy);
                $("#HdrSec1_CmbItmNm_Nm").data('kendoComboBox').value(Item[0].ItmKy);
                FormGlblData.ItmAdrKy = Item[0].ItmAdrKy;
            }

        },
        error: function (e) {
            alert("Faileddd");
            return false;
        }

    })
}

function backItm() {
    $("#AdrEntryPopup").data("kendoWindow").close();
}