var FormGlblData = {
    FormObjData: null,
    TrnTypKy: 1,
    PrjTypKy: 1,
    AccessLvlKy: 1,
    ConfiLvlKy: 1,
    TrnKy: 1
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
function Save() {
    SaveMultiUnitDet();
}
function DocReadyCus() {
    setTimeout(setHdrSectionPropFun, 2000);
    var h = $("#option").height();
    var height = ($(window).height()) - 205;
    $("#MultiUnitGrid").height(height);
    var width = ($(window).width());
    $("#HdrSec1_Item_Nm").width(700);

    var d = document.getElementById('AlertBox');
    d.style.position = "absolute";
    d.style.left = width + 'px';
    d.style.visibility = "visible";


    $('.PinChecked').change(function () {
        alert()
    });
    LoadDropDown();
    var GrpInv = $("#HdrSec1_CmbUnit_Cd").data("kendoComboBox");
    GrpInv.enable(false);
    

    Tooltip();
    SelectText();
    LoadMultiUnitGrid();
    

}

function GetUnits() {
    var ItemCode = $("#HdrSec1_Item_Cd").data("kendoComboBox").text();
    $.ajax({
        url: urlMultiUnit.GetItemByCodeEAN,
        data: {
            ItemCode: ItemCode,
            EAN: ''
        },
        dataType: "Json",
        type: "POST",
        success: function (DBData) {
            if (DBData.length > 0) {
                $("#HdrSec1_InptItmNm_Val").val(DBData[0].ItemName);
                $("#HdrSec1_InptItmKy_Val").val(DBData[0].ItmKy);
                $("#HdrSec1_InptItmCd_Val").val(DBData[0].ItemCode); //GetItemUnitMasDet
                $("#HdrSec1_CmbUnit_Cd").data("kendoComboBox").value(DBData[0].UnitKy);
                $("#HdrSec1_CmbUnit_Cd").data("kendoComboBox").text(DBData[0].Unit);
                GetItemUnitMasDet(DBData[0].ItmKy);
            } else {
                $("#HdrSec1_InptItmNm_Val").val('');
                $("#HdrSec1_InptItmKy_Val").val(1);
                // $("#HdrSec1_InptItmCd_Val").val(DBData[0].ItemCode);
                $("#MultiUnitGrid").data("kendoGrid").dataSource.data(DBData);
                alert('Please Check Item Code!!!');
            }
        },
        error: function (e) {
            return false;
        }
    });
}

function AddNewRow() {
    var grid = $("#MultiUnitGrid").data("kendoGrid").addRow();
    var unitKy = $("#HdrSec1_CmbUnit_Cd").data("kendoComboBox").value();
    var unit = $("#HdrSec1_CmbUnit_Cd").data("kendoComboBox").text();
    $("#BaseUnit").data("kendoComboBox").value(unitKy);
    var Grid = $("#MultiUnitGrid").data("kendoGrid").dataSource.data();
    Grid[0].set("BaseUnitKy", unitKy);
    Grid[0].set("BaseUnit", unit);
    var Baseunit = $("#BaseUnit").data("kendoComboBox");
    Baseunit.enable(false);

}

function CancelGridItemforItmMas() {
    $("#MultiUnitGrid").data("kendoGrid").cancelChanges();
}

function GetItemUnitMasDet(ItmKy) {
    $.ajax({
        url: urlMultiUnit.GetItemUnitMasDet,
        data: {
            ItmKy: ItmKy
        },
        dataType: "Json",
        type: "POST",
        success: function (DBData) {
            $("#MultiUnitGrid").data("kendoGrid").dataSource.data(DBData);
        },
        error: function (e) {
            return false;
        }
    });
}
function setHdrSectionPropFun() {
    setHdrSectionProp('', viewBag.ObjKy, '', 'HdrSec1');
}

function LoadDropDown() {

    $("#HdrSec1_Item_Cd").kendoComboBox({
        dataValueField: "ItmKy",
        dataTextField: "ItmCd",
        dataSource: ItmCdDatasource('HdrSec1_Item_Cd'),// ItmCdDatasourceTest('HdrSec1_CmbItm'),
        change: function (e) {
            var cmb = $("#HdrSec1_Item_Cd").data("kendoComboBox");
            var val = cmb.value();
            if (isNaN(val)) {
                alert("'" + val + "' is not a Valid input");
                cmb.value("");
            }
            else {
                $("#HdrSec1_Item_Nm").data("kendoComboBox").value(val);
                GetUnits();
            }

        },
        filter: "startswith",
        suggest: true,
        placeholder: "Item Code"
    });

    $("#HdrSec1_Item_Nm").kendoComboBox({
        dataValueField: "ItmKy",
        dataTextField: "ItmNm",
        dataSource: ItmNmDatasource('HdrSec1_Item_Nm'),// ItmCdDatasourceTest('HdrSec1_CmbItm'),
        change: function (e) {
            var cmb = $("#HdrSec1_Item_Nm").data("kendoComboBox");
            var val = cmb.value();
            if (isNaN(val)) {
                alert("'" + val + "' is not a Valid input");
                cmb.value("");
            }
            else {
                $("#HdrSec1_Item_Cd").data("kendoComboBox").value(val);
                GetUnits();
            }

        },
        filter: "contains",
        suggest: true,
        placeholder: "Item Name"
    });

    $("#HdrSec1_CmbUnit_Cd").kendoComboBox({
        dataValueField: "UnitKy",
        dataTextField: "Unit",
        dataSource: UnitMas_SelectMob_Datasource(),// ItmCdDatasourceTest('HdrSec1_CmbItm'),
        change: function (e) { },
        filter: "contains",
        suggest: true,
        placeholder: "Unit"
    });
}

function LoadDatePicker() {

    $("#dateOfBirth").kendoDatePicker({

        format: "dd/MM/yyyy",
        min: new Date(31, 2, 1920)
    });

    $(".k-datepicker, .k-combobox, .k-numerictextbox,.k-input").css('width', "100%");

}

function ItmCdDatasource(ObjNm) {
    var ObjKy = GetObjKy(ObjNm);
    var dataSource = new kendo.data.DataSource(
      {
          transport: {
              read: {
                  url: urlComboLoad.ItmCd_SelectMob,
                  data: {
                      ObjKy: ObjKy,
                      TrnTypKy: FormGlblData.TrnTypKy,
                      PreKy: 1
                  },
                  dataType: "json"
              }
          }
      });
    return dataSource;
}

function ItmNmDatasource(ObjNm) {
    var ObjKy = GetObjKy(ObjNm);
    var dataSource = new kendo.data.DataSource(
      {
          transport: {
              read: {
                  url: urlComboLoad.ItmNm_SelectMob,
                  data: {
                      ObjKy: ObjKy,
                      TrnTypKy: FormGlblData.TrnTypKy,
                      PreKy: 1
                  },
                  dataType: "json"
              }
          }
      });
    return dataSource;
}

function GetCdMas_LookupWeb(ConCd) {
    var dataSource = new kendo.data.DataSource(
      {
          transport: {
              read: {
                  url: UrlGetCdMas_LookupWeb,
                  data: { ConCd: ConCd },
                  dataType: "json"
              }
          }
      });
    return dataSource;
}
