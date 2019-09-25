var FormGlblData = {
    FormObjData: null,
    TrnTypKy: 1,
    AccessLvlKy: 1,
    ConfiLvlKy: 1,
    TrnKy: 1,
    AllDefalutValueObj: null,      
};

LoadGloabData();

function LoadGloabData() {
    $.ajax({
        url: urlCodes.GetCdKyByConCdAndOurCd,
        dataType: "json",
        type: "POST",
        data: JSON.stringify({
            ObjKy: viewBag.ObjKy,
            ConCd: "LogTyp",
            OurCd: viewBag.OurCd
        }),
        contentType: "application/json; charset=utf-8",
        success: function (TrnTypKy) {
            FormGlblData.TrnTypKy = TrnTypKy;
            GetFormObjData();
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
        contentType: "application/json; charset=utf-8",
        success: function (HdrSectionFromDb) {
            FormGlblData.FormObjData = HdrSectionFromDb;
            //FormGlblData.AllDefalutValueObj = Get_AllDefalutValue_Obj();
            //FormGlblData.AllValidationObj = Get_All_Validation_Obj();
            FormGlblData.AllValidationObj = sortByKey(FormGlblData.AllValidationObj, "ValidationOrder");
            LoadCombo()
           // LoadComboAndDateTime();
            //Clear();
            setHdrSectionPropFun();
           // CLOSELoadingForm();
        }
    });
}

function setHdrSectionPropFun() {

    // ---------- Set ObjProperties
    setHdrSectionProp("", viewBag.ObjKy, "", "HdrSec1");
    SetHandlingEnterKeyEvent("", viewBag.ObjKy);
    SetFirstFocusObj();

    // $("#HdrSec1_InptDocNo_Val").focus();
}

$(document)
.ready(function () {
    Button_From_Dynamic("ButtonSec1");
});

function LoadCombo() {
    $("#HdrSec1_CmbVehicalInt_Cd")
      .kendoComboBox({
          dataValueField: "CdKy",
          dataTextField: "CdNm",
          dataSource: CdmasName("HdrSec1_CmbVehicalInt"),
          change: function (e) {
              var cmb = $("#HdrSec1_CmbVehicalInt_Cd").data("kendoComboBox");
              var cmbVal = cmb.value();
              if (cmbVal != "") {
                  var validate = ComboValidations("HdrSec1_CmbVehicalInt_Cd");
                  if (validate) {
                      $("#HdrSec1_CmbVehicalInt_Cd").data("kendoComboBox").value(cmbVal);
                  } else {
                      $("#HdrSec1_CmbVehicalInt_Cd").data("kendoComboBox").value("");
                  }
              }
          },
          filter: "startswith",
          suggest: true,
          placeholder: "Select a Model"
      });
}

//________________________________________DataSource
//DateSources
function CdmasName(ObjNm) {
    var ObjKy = GetObjKy(ObjNm);
    var PreKy = 1;
    var dataSource = new kendo.data.DataSource(
    {
        transport: {
            read: {
                url: urlGetCdMasName,
                data: {
                    'ObjKy': ObjKy,
                    'TrnTypKy': "1",
                    'PreKy': PreKy,
                },
                dataType: "json"
            }
        }

    });
    return dataSource;
}