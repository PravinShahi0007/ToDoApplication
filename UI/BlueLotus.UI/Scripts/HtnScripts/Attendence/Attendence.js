
var FormGlblData = {
    FormObjData: null,
    AllDefalutValueObj: null,
    ItmKy: 1,
    ItmTypKy: 1,
    ItmTaxTypKy: 1,
    AccessLvlKy: 1,
    ConfiLvlKy: 1,
}

$(document).ready(function () {

    GetFormObjData();
});

function GetFormObjData() {

    $.ajax({
        url: urlUsrObjPrp_SelectAllLastChildWeb,
        dataType: "json",
        type: "POST",
        data: JSON.stringify({
            PrntKy: viewBag.ObjKy
        }),
        contentType: 'application/json; charset=utf-8',
        success: function (HdrSectionFromDb) {

            FormGlblData.FormObjData = HdrSectionFromDb;
            
           DocReadyCus();
        }
    });
}

function DocReadyCus() {
    //setTimeout(setHdrSectionPropFun, 2000);
    //LoadCombo();
    LoadDatePickers();

    //$('#HdrSec1_ChkboxApplyAll_Val').attr('checked', false);

    //$("#GridWin").show();
    //LoadGridView();

}

function LoadDatePickers() {
    $("#HdrPart_FrmDate")
        .kendoDatePicker({
            format: "dd/MM/yyyy",
            min: new Date(31, 2, 2009)
        });

    $("#HdrPart_ToDate")
        .kendoDatePicker({
            format: "dd/MM/yyyy",
            min: new Date(31, 2, 2009)
        });

    var todayDate = new Date();
    $("#HdrPart_FrmDate").data("kendoDatePicker").value(todayDate);
    $("#HdrPart_ToDate").data("kendoDatePicker").value(todayDate);
}


function Transfer() {

    $.ajax({
        url: urlBL7ToBL10AtnClkDet_Insert, //'@Url.Content("~/Attendence/BL7ToBL10AtnClkDet_Insert")',
        dataType: "json",
        type: "POST",
        data: JSON.stringify({
            
        }),

        contentType: 'application/json; charset=utf-8',
        success: function (data) {

            if (data == true) {
                alert("Data transfer successful");
            }
            else {
                alert("Data transfer failed");
            }

        
        },
        error: function (e) {
            alert("Data transfer failed");
            return false;
        }

    });
}


function Process() {

    var FrmDt = $("#HdrPart_FrmDate").val();
    var ToDt = $("#HdrPart_ToDate").val();

    $.ajax({
        url: urlAtnDet_Insert, //'@Url.Content("~/Attendence/AtnDet_Insert")',
        dataType: "json",
        type: "POST",
        data: JSON.stringify({
            FrmDt: FrmDt,
            ToDt: ToDt
        }),

        contentType: 'application/json; charset=utf-8',
        success: function (data) {

            if (data == true) {
                alert("Data Process successful");
            }
            else {
                alert("Data Process failed");
            }


        },
        error: function (e) {
            alert("Data Process failed");
            return false;
        }

    });
}
