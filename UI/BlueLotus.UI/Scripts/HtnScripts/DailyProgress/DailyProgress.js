var todayDate = new Date();
var dd = todayDate.getDate();
var mm = todayDate.getMonth() + 1; //January is 0!

var yyyy = todayDate.getFullYear();
if (dd < 10) {
    dd = '0' + dd
}
if (mm < 10) {
    mm = '0' + mm
}
var todayDate = dd + '/' + mm + '/' + yyyy;

var FormGlblData = {
    PreKy: 1,
    FormObjData: null,
    TrnTypKy: 1,
    AccessLvlKy: 1,
    ConfiLvlKy: 1,
    TrnKy: 1,
    TodayDate: todayDate
}


$(document).ready(function () {

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
            GetFormObjData();
        }
    });
  
    $("#HdrSec1_Qty").kendoNumericTextBox({ min: 0 });
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


function  () {
    LoadDatePicker();
    LoadPrjCombo();
    LoadSubCon(1);
    LoadTaskCombo(1, 1);
    LoadGridView();

}

function createChart(data) {
    $("#chart").kendoChart({
        title: {
            text: "Sales for a day by department/Category by default show for the current date"
        },
        legend: {
            position: "bottom"
        },
        dataSource: {
            data: data
        },
        series: [{
            type: "pie",
            field: "SaleAmt",
            categoryField: "CatNm",
            explodeField: "explode"
        }],
        seriesColors: ["#03a9f4", "#ff9800", "#fad84a", "#4caf50"],
        tooltip: {
            visible: true,
            template: "${ category } - ${ value }%"
        }
    });
}

function LoadDatePicker() {
    $("#date").kendoDatePicker({
        format: "dd/MM/yyyy",
        min: new Date(31, 2, 1920)
    });

}

function LoadPrjCombo() {

    $("#HdrSec1_CmbPrjNm").kendoComboBox({
        dataValueField: "PrjKy",
        dataTextField: "PrjNm",
        dataSource: PrjID_SelectMobDatasource(),
        change: function (e) {
            var PrjKy = $("#HdrSec1_CmbPrjNm").data('kendoComboBox').value();
            if (PrjKy == 0 || PrjKy == null) {
                PrjKy = 1;
            }
            LoadSubCon(PrjKy);
        },
        filter: "contains",
        suggest: true,
        placeholder: "Select a Project..."
    });

}

function LoadSubCon(PrjKy) {

    $("#HdrSec1_CmbSubConNm").kendoComboBox({
        dataValueField: "AdrKy",
        dataTextField: "AdrNm",
        dataSource: PPrjKySubConAdrNm_SelectMobDatasource(PrjKy),
        change: function (e) {

            var PrjKy = $("#HdrSec1_CmbPrjNm").data('kendoComboBox').value();
            if (PrjKy == 0 || PrjKy == null) {
                PrjKy = 1;
            }
            var AdrKy = $("#HdrSec1_CmbSubConNm").data('kendoComboBox').value();
            if (AdrKy == 0 || AdrKy == null) {
                AdrKy = 1;
            }

            LoadTaskCombo(AdrKy, PrjKy);
        },
        filter: "contains",
        suggest: true,
        placeholder: "Select a Task / SubTask.."
    });
}

function LoadTaskCombo(AdrKy, PrjKy) {

    $("#HdrSec1_CmbTask").kendoComboBox({
        dataValueField: "ItmKy",
        dataTextField: "ItmNm",
        dataSource: ItmRateSubCunItmNm_SelectWebDatasource(AdrKy, PrjKy),
        change: function (e) {


            var cmb = $("#HdrSec1_CmbTask").data("kendoComboBox");
            var FinItmKy = cmb.value();
            if (FinItmKy != "") {
                var validate = ComboValidations("HdrSec1_CmbTask");
                if (validate) {

                   // $("#HdrSec1_CmbTask").data("kendoComboBox").value(FinItmKy);
                    //var Concord = $("#cmbCdMasCdTyp").data("kendoComboBox").text();// $("#cmbCdMasCdTyp").data("kendoComboBox").text;
                    var selectedObject = $("#HdrSec1_CmbTask").data("kendoComboBox").dataItem($("#HdrSec1_CmbTask").data("kendoComboBox").select());

                    // LoadCdMas_LookupWebByConCdCombo(selectedObject.Unit)
                    $("#HdrSec1_Unit").val(selectedObject.Unit);
                } else {

                    $("#HdrSec1_CmbTask").data("kendoComboBox").value("");
                }
            }
        

     
        },
        filter: "contains",
        suggest: true,
        placeholder: "Select a Subcontractor Name.."
    });
}


function LoadGridView() {

    var vPrjKy = $("#HdrSec1_CmbPrjNm").data('kendoComboBox').value();
    if (vPrjKy == 0 || vPrjKy == null) {
        vPrjKy = 1;
    }
    var vAdrKy = $("#HdrSec1_CmbSubConNm").data('kendoComboBox').value();
    if (vAdrKy == 0 || vAdrKy == null) {
        vAdrKy = 1;
    }
    var vFinItmKy = $("#HdrSec1_CmbTask").data('kendoComboBox').value();
    if (vFinItmKy == 0 || vFinItmKy == null) {
        vFinItmKy = 1;
    }
    var vTrnDt = FormGlblData.TodayDate;

    var vTrnTypKy = FormGlblData.TrnTypKy;

    var vObjKy = Number(viewBag.ObjKy);

    var vTrnKy = 1;

    //SubConPrgrsItmTrn_SelectWeb(int ObjKy, int TrnKy, string TrnDt, int TrnTypKy, int PrjKy, int AdrKy, int FinItmKy)

    var datasourceLoadGridView = new kendo.data.DataSource({
        transport: {
            read:
            {
                //int GrpCdKy, int CdKy, string ConCdGrid
                data: { ObjKy: vObjKy, TrnKy: vTrnKy, TrnDt: vTrnDt, TrnTypKy: vTrnTypKy, PrjKy: vPrjKy, AdrKy: vAdrKy, FinItmKy: vFinItmKy },
                url: urlSubConPrgrsItmTrn_SelectWeb,
                dataType: "json"
            }
        },
        batch: true,
        pageSize: 20,
        schema: {
            model: {
                id: "FinItmKy",
                fields:
                {

                    FinItmKy: { editable: false, nullable: false, },
                    ItmCd: { editable: false, nullable: false, },
                    ItmNm: { editable: false, nullable: false, },
                    Unit: { editable: false, nullable: false },
                    Qty: { editable: false, nullable: false }

                }
            }
        }
    });

    $("#HdrSec1_DailyProgressGrid").kendoGrid({
        dataSource: datasourceLoadGridView,
        //autobind: true,
        height: 500,
        navigatable: true,
        filterable: true,
        pageable: true,
        sortable: true,
        reorderable: true,
        columnMenu: true,
        selectable: "row",
        resizable: true,
        pageable: { refresh: true, pageSizes: [5, 10, 20, 50, 100] },
        columns: [
        { field: "FinItmKy", title: "FinItmKy", width: "100px", hidden: true },
        { field: "ItmCd", title: "ItmCd", width: "100px" },
        { field: "ItmNm", title: "ItmNm", width: "100px" },
        { field: "Unit", title: "Unit", width: "100px" },
        { field: "Qty", title: "Qty", width: "100px" },

        ],

        editable: true
    });
}


function PrjID_SelectMobDatasource() {
    var dataSource = new kendo.data.DataSource(
      {
          transport: {
              read: {
                  url: urlDailyProgress.GetPrjNm_SelectMob,
                  data: {
                      ObjKy: viewBag.ObjKy,
                      TrnTypKy: FormGlblData.TrnTypKy,
                      PreKy: FormGlblData.PreKy
                  },
                  dataType: "json"
              }
          }
      });
    return dataSource;
}

function PPrjKySubConAdrNm_SelectMobDatasource(PrjKy) {
    var dataSource = new kendo.data.DataSource(
      {
          transport: {
              read: {
                  url: urlDailyProgress.PPrjKySubConAdrNm_SelectMob,
                  data: {
                      ObjKy: viewBag.ObjKy,
                      PrjKy: PrjKy,
                      TrnTypKy: FormGlblData.TrnTypKy
                  },
                  dataType: "json"
              }
          }
      });
    return dataSource;
}

function ItmRateSubCunItmNm_SelectWebDatasource(AdrKy, PrjKy) {
    var dataSource = new kendo.data.DataSource(
      {
          transport: {
              read: {
                  url: urlDailyProgress.ItmRateSubCunItmNm_SelectWeb,
                  data: {
                      ObjKy: viewBag.ObjKy,
                      AdrKy: AdrKy,
                      PrjKy: PrjKy
                  },
                  dataType: "json"
              }
          }
      });
    return dataSource;
}

function ComboValidations(cmbNm) {

    var cmb = $("#" + cmbNm + "").data("kendoComboBox");
    var val = cmb.value();

    if (isNaN(val)) {
        alert("'" + val + "' is not a Valid input");
        $("#" + cmbNm + "").data("kendoComboBox").value("");
        return false;
    } else {
        return true;
    }
}
