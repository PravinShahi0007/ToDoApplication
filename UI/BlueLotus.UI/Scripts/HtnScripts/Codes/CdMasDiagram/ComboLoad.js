$(document).ready(function () {
    LoadCombo();
    
});

function LoadCombo() {
    $("#HdrSec1_CmbConCd_Cd").kendoComboBox({
        dataSource: {
            type: "POST",
            transport: {
                read:
                    {
                        url: URLGetAllConCodesCmb,
                        data: { ObjKy: viewBag.ObjKy }
                    }
            }
        },
        change: function (e) {
            var cmb = $("#HdrSec1_CmbConCd_Cd").data("kendoComboBox");
            var emp = cmb.value();
            var source = this.dataSource._data;
            var valid = false;
            for (var i = 0; i < source.length; i++) {
                if (source[i] == emp) {
                    valid = true;
                    break;
                }
            }
            if (valid == false) {
                alert("Invalid ConCd! Please select a ConCd..");
                $("#HdrSec1_CmbConCd_Cd").data('kendoComboBox').value("");
            } else {
                //$("#loadGrid").disabled = 'disabled';
                ////$("#loadGrid").attr("disabled", true);
                //FormGlblData.SelectedConCd = $("#HdrSec1_CmbConCd_Cd").data("kendoComboBox").value();
                //ConCdChangeCall(FormGlblData.SelectedConCd);
                //if (FormGlblData.SelectedConCd != "") {
                //    try {


                //    } catch (e) { }
                    
                //}
            }
        },
        filter: "startswith",
        suggest: true,
        placeholder: "Select.."
    });

}

function ConCdChangeCall(SelectedConCd) {

    $.ajax({
        url: urlObjMas.UsrObjPrp_SelectWeb,
        dataType: "json",
        type: "POST",
        data: JSON.stringify({
            PrntKy: viewBag.ObjKy,
            ObjTyp: '',
            ObjNm: SelectedConCd
        }),
        contentType: 'application/json; charset=utf-8',
        success: function (ObjData) {
            if (ObjData.length > 0) {
                GetFormObjData(ObjData[0].ObjKy);
            }         
        }
    });
}
