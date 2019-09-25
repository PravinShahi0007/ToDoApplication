
var selectedReportParamList = {};
var globlObjKy = 1;

var FormGlblData = {
    FormObjData: null,
    TrnTypKy: 1
}


$(document).ready(function () {

    //$.ajax({
    //    url: urlCodes.GetCdKyByConCdAndOurCd,
    //    dataType: "json",
    //    type: "POST",
    //    data: JSON.stringify({
    //        ObjKy: viewBag.ObjKy,
    //        ConCd: 'TrnTyp',
    //        OurCd: viewBag.OurCd
    //    }),
    //    contentType: 'application/json; charset=utf-8',
    //    success: function (TrnTypKy) {

    //        FormGlblData.TrnTypKy = TrnTypKy;
    GetFormObjData();
    //    }
    //});
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
    LoadLocationCombo();
    LoadDatePicker();
}

function LoadLocationCombo() {
    $("#HdrPart_CmbLoc_Cd").kendoComboBox({
        dataValueField: "CdKy",
        dataTextField: "Code",
        dataSource: dataSrcCreateCodeCdMasLookUp('HdrPart_CmbLoc'),
    
        filter: "contains",
        suggest: true,
        placeholder: "Select a From Location.."
    });
}

function dataSrcCreateCodeCdMasLookUp(ObjNm) {

    var ObjKy = GetObjKy(ObjNm);
    var dataSource = new kendo.data.DataSource(
      {
          transport: {
              read: {
                  url: urlComboLoad.Code_SelectMob,
                  data: { ObjKy: ObjKy, TrnTypKy: 1, PreKy: 1 },
                  dataType: "json"
              }
          }
      });
    return dataSource;
}

function LoadDatePicker() {
    $("#HdrPart_Date").kendoDatePicker({
        format: "dd/MM/yyyy",
    });
    var todayDate = new Date();
    $('#HdrPart_Date').data("kendoDatePicker").value(todayDate);
}


function loadPieChart() {
    createChartAjax();
    createDep_ChartAjax();
}

function createChartAjax() {

    var LocKy = $("#HdrPart_CmbLoc_Cd").data('kendoComboBox').value();
    var Date = $("#HdrPart_Date").val();

    $.ajax({
        url: urlPieChart.DeptOrCatgryWiseSales_DashBrdWeb,
        dataType: "json",
        type: "POST",
        data: JSON.stringify({
            ObjKy: viewBag.ObjKy,
            LocKy: LocKy,
            Dt: Date,
        }),
        contentType: 'application/json; charset=utf-8',
        success: function (Data) {
            createChart(Data);
        }
    });
}

function createDep_ChartAjax() {

    var LocKy = $("#HdrPart_CmbLoc_Cd").data('kendoComboBox').value();
    var Date = $("#HdrPart_Date").val();

    $.ajax({
        url: urlPieChart.DeptWiseSales_DashBrdWeb,
        dataType: "json",
        type: "POST",
        data: JSON.stringify({
            ObjKy: viewBag.ObjKy,
            LocKy: LocKy,
            Dt: Date,
        }),
        contentType: 'application/json; charset=utf-8',
        success: function (Data) {
            createDep_Chart(Data);
        }
    });
}

function createChart(Data) {
    $("#chart").kendoChart({
        title: {
            text: "Category wise sales amt"
        },
        legend: {
            position: "true"
        },
        dataSource: {
            data: Data
        },
        series: [{
            type: "pie",
            field: "SaleAmt",
            categoryField: "CatNm"
        }], seriesDefaults: {
            labels: {
                template: "#= category # - #= kendo.format('{0:P}', percentage)#",
                position: "outsideEnd",
                visible: true,
                background: "transparent"
            }
        },
        //seriesColors: ["#03a9f4", "#ff9800", "#fad84a", "#4caf50"],
        tooltip: {
            visible: true,
            template: "${ category } - ${ value }%"
        }
    });
}

function createDep_Chart(Data) {
    $("#Dep_chart").kendoChart({
        title: {
            text: "Department wise sales amt"
        },
        legend: {
            position: "true"
        },
        dataSource: {
            data: Data
        },
        series: [{
            type: "pie",
            field: "SaleAmt",
            categoryField: "DepNm"
        }], seriesDefaults: {
            labels: {
                template: "#= category # - #= kendo.format('{0:P}', percentage)#",
                position: "outsideEnd",
                visible: true,
                background: "transparent"
            }
        },
        //seriesColors: ["#03a9f4", "#ff9800", "#fad84a", "#4caf50"],
        tooltip: {
            visible: true,
            template: "${ category } - ${ value }%"
        }
    });
}
