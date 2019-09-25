var todayDate = new Date();
var dd = todayDate.getDate();
var mm = todayDate.getMonth() + 1;

var yyyy = todayDate.getFullYear();
if (dd < 10) {
    dd = '0' + dd
}
if (mm < 10) {
    mm = '0' + mm
}
var todayDate = dd + '/' + mm + '/' + yyyy;

var FormGlblData = {
    FormObjData: null,
    TrnTypKy: 1,
    AccessLvlKy: 1,
    ConfiLvlKy: 1,
    TrnKy: 1,
    RecKy: 1, //Used for image key
    ImagePath: '',
    ImageNm: '',
    TblNm: 'TrnHdr',
    TodayDate: todayDate,
    TmStmp: 1,
    IsDetailRelatedHdrSectionChanged: false,
    AllDefalutValueObj: null,
    GotItemRate: 0,
    ISNeworUpdateTranction: 1,
    isSaveandNew: 0,
    isItmCdFrmCmb: 0,
    itmCdFrm: '',
    ItmCdWhenDblClick: '',
    Detail_Editing_LiNo: -1,
    CurrentAprStsKy: 1,
    SerialNumber_Array: [],
    AprStsLock: null,
    AprStsLockMsg: "",
    DblClickedUID: null,
    isAlwAcs: null,
    isAlwAdd: null,
    isAlwUpdate: null,
    isAlwDel: null,
    isAlwApr: null,
    GridEditableRecordCount: 0,
    selectedIndex: 0,
    FormTyp: "TrnTyp"
}

var CdMasModel = {
    IsTrnRateInclusiveTaxTyp1_VAT: 0,
    TrnMinDate: "",
    TrnMaxDate: ""
}


$(document).ready(function () {

  //  OPENLodingForm();
    GetUserPermission(); // Get UserPermission Properties from DB.

    $.ajax({
        url: urlCodes.GetCdKyByConCdAndOurCd,
        dataType: "json",
        type: "POST",
        data: JSON.stringify({
            ObjKy: viewBag.ObjKy,
            ConCd: 'TrnTyp',
            OurCd: viewBag.OurCd
        }),
        contentType: 'application/json; charset=utf-8',
        success: function (TrnTypKy) {

            FormGlblData.TrnTypKy = TrnTypKy;
            GetCdMasBy_CdKy(TrnTypKy);
        }
    });
});

function GetCdMasBy_CdKy(CdKy) {
    $.ajax({
        url: urlCodes.GetCdMasBy_CdKy,
        dataType: "json",
        type: "POST",
        data: JSON.stringify({
            ObjKy: viewBag.ObjKy,
            CdKy: CdKy
        }),
        contentType: 'application/json; charset=utf-8',
        success: function (CdMasModelData) {
            CdMasModel.IsTrnRateInclusiveTaxTyp1_VAT = CdMasModelData.isCd27;
            CdMasModel.TrnMinDate = CdMasModelData.TrnMinDate;
            CdMasModel.TrnMaxDate = CdMasModelData.TrnMaxDate;

            GetFormObjData();
            Button_From_Dynamic('ButtonSec1');
            Button_From_Dynamic('ButtonSec2');
            Button_From_Dynamic('ButtonSec3');
        }
    });
}

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
            FormGlblData.AllDefalutValueObj = Get_AllDefalutValue_Obj();
            FormGlblData.AllValidationObj = Get_All_Validation_Obj();
            FormGlblData.AllValidationObj = sortByKey(FormGlblData.AllValidationObj, 'ValidationOrder');
            DocReadyCus();
        }
    });
}

function DocReadyCus() {
    if (FormGlblData.isAlwAcs == 0) {
        alert("You Don't Have Access Permission. We Are Redirecting To Home...");
        var url = "http://" + document.location.host + RootDir + "Home" + "/" + "Home";
        window.location.href = url;
        return;
    }
    var PrjKy = 1
    //this File
    setHdrSectionPropFun();
    LoadCombo();
}

function setHdrSectionPropFun() {
    setHdrSectionProp('', viewBag.ObjKy, '', 'HdrSec1');
    setHdrSectionProp('', viewBag.ObjKy, '', 'HdrSec2');
    setHdrSectionProp('', viewBag.ObjKy, '', 'HdrSec3');
    setHdrSectionProp('', viewBag.ObjKy, '', 'HdrSec4');
    setHdrSectionProp('', viewBag.ObjKy, '', 'HdrSec6');
    setHdrSectionProp('ChildHdrpart', viewBag.ObjKy, '', 'HdrSec7');
    setHdrSectionProp('ChildHdrpart', viewBag.ObjKy, '', 'HdrSec5');
    SetHandlingEnterKeyEvent('', viewBag.ObjKy);
    HideSectnFrmtGrp();
}
