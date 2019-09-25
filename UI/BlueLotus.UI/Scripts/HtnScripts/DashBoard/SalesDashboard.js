var selectedReportParamList = {};
var globlObjKy = 1;

var FormGlblData = {
    FormObjData: null,
    TrnTypKy: 1
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



function loadChart() {
    createChartAjax();
    createDep_ChartAjax();
    createBar_ChartAjax();
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
            createBar_Chart(Data);
        }
    });
}

function createChart(Data) {
    $("#chart").kendoChart({
        title: {
            position: "top",
            text: "Sales By Category",
            font: "12px sans-serif",
        },
        legend: {
            position: "top"
        },
        dataSource: {
            data: Data
        },
        series: [{
            type: "pie",
            field: "SaleAmt",
            categoryField: "CatNm",
        }],
        seriesDefaults: {
            labels: {
                position: "outsideEnd",
                visible: true,
                background: "transparent",
                template: "#= category # - #= kendo.format('{0:P}', percentage)#",
            }
        },
        //seriesColors: ["#03a9f4", "#ff9800", "#fad84a", "#4caf50"],
        tooltip: {
            visible: true,
            template: "${ category } - ${ value }%"
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


function createDep_Chart(Data) {
    $("#Dep_chart").kendoChart({
        title: {
            position: "top",
            text: "sales by Department",
            font: "12px sans-serif",
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
            font: "11px sans-serif",
            template: "${ category } - ${ value }%"
        }
    });
}


function createBar_ChartAjax() {

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
            createBar_Chart(Data);
        }
    });
}


function createBar_Chart(Data) {
    $("#Bar_Chart").kendoChart({
        dataSource: {
            data: Data
        },
            
        title: {
           position: "top",
           text: "Sales By Category",
           font: "12px sans-serif",
        },
        legend: {
            position: "top"
        },
        seriesDefaults: {
            type: "column"
        },
        //series: [{
        //    type: "column",
        //    field: "SaleAmt",
        //    //categoryField: "CatNm",
        //}],
        categoryAxis: {
            field: "CatNm",
            labels: {
                rotation: -90
            },
            majorGridLines: {
                visible: false
            }
        },
        valueAxis: {
            field: "SaleAmt",
            labels: {
                format: "N0"
            },
            majorUnit: 10000,
            line: {
                visible: false
            }
        },
        tooltip: {
            visible: true,
            format: "N0"
        }
    });
}
