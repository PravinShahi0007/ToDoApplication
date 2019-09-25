var FormGlblData = {
    FormObjData: null,
    TrnTypKy: 1,
    AccessLvlKy: 1,
    ConfiLvlKy: 1,
    TrnKy: 1,
    AllDefalutValueObj: null,
    GotItemRate: 0
};

var FirstinsetDetail = {
    PrjKey: 1,
    BUKey: 1,
    AccountKey: 1,
    LineNo: 1
};
$(document).ready(function() {
    //OPENLodingForm();
    $.ajax({
        url: urlCodes.GetCdKyByConCdAndOurCd,
        dataType: "json",
        type: "POST",
        data: JSON.stringify({
            ObjKy: viewBag.ObjKy,
            ConCd: "TrnTyp",
            OurCd: viewBag.OurCd
        }),
        contentType: "application/json; charset=utf-8",
        success: function(TrnTypKy) {
            FormGlblData.TrnTypKy = TrnTypKy;
            GetFormObjData();
            Button_From_Dynamic("ButtonSec1");
        }
    });
});

function GetFormObjData() {
    $.ajax({
        url: urlUsrObjPrp_SelectAllLastChildWeb,
        dataType: "json",
        type: "POST",
        data: JSON.stringify({
            PrntKy: viewBag.ObjKy
        }),
        contentType: "application/json; charset=utf-8",
        success: function(HdrSectionFromDb) {

            FormGlblData.FormObjData = HdrSectionFromDb;
            FormGlblData.AllDefalutValueObj = Get_AllDefalutValue_Obj();
            DocReadyCus();
        }
    });
}

function DocReadyCus() {
    LoadComboNumericDate();
    GridDefaultColumns();
    setTimeout(setHdrSectionPropFun, 2000);
    ChangeSpan();
    clearfunction();
    LockColumn(false);
    $("#HdrSec1_DatVouDate_Val").data("kendoDatePicker").trigger("change");

}


function CheqButtonDisaple() {
    var cashky = $("#HdrSec4_CmbPayMode_Cd").data("kendoComboBox").value();
    if (!cashky || cashky == undefined) {
        $("#ButtonSec1_Print").prop("disabled", false);
    }
    else if (cashky == 225073) {
        $("#ButtonSec1_Print").prop("disabled", true);
    }
    else {
        $("#ButtonSec1_Print").prop("disabled", false);
    }
}
//