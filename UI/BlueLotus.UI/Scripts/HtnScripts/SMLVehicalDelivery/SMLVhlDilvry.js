var FormGlblData = {
    FormObjData: null,
    TrnTypKy: 1,
    AccessLvlKy: 1,
    ConfiLvlKy: 1,
    TrnKy: 1,
    AllDefalutValueObj: null,
    GotItemRate: 0
};
OPENLodingForm();
LoadGloabData();

function LoadComboAndDateTime() {
    LoadDateAndTimeNumrc();
    LoadCombo();
}
$(document)
    .ready(function () {
        Button_From_Dynamic("ButtonSec1");
    });
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
            FormGlblData.AllDefalutValueObj = Get_AllDefalutValue_Obj();
            //FormGlblData.AllValidationObj = Get_All_Validation_Obj();
            //FormGlblData.AllValidationObj = sortByKey(FormGlblData.AllValidationObj, "ValidationOrder");
            LoadComboAndDateTime();
            //Clear();
            setHdrSectionPropFun();
            CLOSELoadingForm();
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

    $("#HdrSec1_CmbVehicalIntSers_Cd")
        .kendoComboBox({
            dataValueField: "CdKy",
            dataTextField: "CdNm",
            dataSource: CdmasName("HdrSec1_CmbVehicalIntSers"),
            change: function (e) {
                var cmb = $("#HdrSec1_CmbVehicalIntSers_Cd").data("kendoComboBox");
                var cmbVal = cmb.value();
                if (cmbVal != "") {
                    var validate = ComboValidations("HdrSec1_CmbVehicalIntSers_Cd");
                    if (validate) {
                        $("#HdrSec1_CmbVehicalIntSers_Cd").data("kendoComboBox").value(cmbVal);
                    } else {
                        $("#HdrSec1_CmbVehicalIntSers_Cd").data("kendoComboBox").value("");
                    }
                }
            },
            filter: "startswith",
            suggest: true,
            placeholder: "Select a Series"
        });
    $("#HdrSec1_CmbSalesPerson_Cd")
   .kendoComboBox({
       dataValueField: "AdrKy",
       dataTextField: "AdrID",
       dataSource: AdrID("HdrSec1_CmbSalesPerson"),
       change: function (e) {
           var cmb = $("#HdrSec1_CmbSalesPerson_Cd").data("kendoComboBox");
           var cmbVal = cmb.value();
           if (cmbVal != "") {
               var validate = ComboValidations("HdrSec1_CmbSalesPerson_Cd");
               if (validate) {
                   $("#HdrSec1_CmbSalesPerson_Cd").data("kendoComboBox").value(cmbVal);
               } else {
                   $("#HdrSec1_CmbSalesPerson_Cd").data("kendoComboBox").value("");
               }
           }
       },
       filter: "startswith",
       suggest: true,
       placeholder: "Select a Sales Person"
   });
    $("#HdrSec1_CmbVehicalInt_Cd").parent().css("width", "100%");
    $("#HdrSec1_CmbVehicalIntSers_Cd").parent().css("width", "100%");
    $("#HdrSec1_CmbSalesPerson_Cd").parent().css("width", "100%");
}

function LoadDateAndTimeNumrc() {
    
    $("#HdrSec1_DatDlvrDate_Val")
.kendoDatePicker({
    format: "dd/MM/yyyy",
    parseFormats: "yyyy/MM/dd",
    value: viewBag.DateNow, //new Date(),
    min: new Date(31, 2, 2009),
    change: function () {

    }
});
  
    $("#HdrSec1_NmricTotalAmt_Val")
       .kendoNumericTextBox({
           decimals: 3,
           spinners: false,
           min: 0,
           change: function () {
              
           }
       });

    $("#HdrSec1_NmricRcpTtl_Val")
   .kendoNumericTextBox({
       decimals: 3,
       spinners: false,
       min: 0,
       change: function () {

       }
   });
    $("#HdrSec1_NmricBalTtl_Val")
.kendoNumericTextBox({
    decimals: 3,
    spinners: false,
    min: 0,
    change: function () {

    }
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
function AdrID(ObjNm) {
    var ObjKy = GetObjKy(ObjNm);
    var dataSource = new kendo.data.DataSource(
    {
        transport: {
            read: {
                url: urlGetAdrId,
                data: {
                    'ObjKy': ObjKy,
                    'TrnTypKy': "1",
                    'PreKy': "1",
                },
                dataType: "json"
            }
        }

    });
    return dataSource;
}

