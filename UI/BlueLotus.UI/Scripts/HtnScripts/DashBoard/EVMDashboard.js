var FormGlblData = {
    FormObjData: null,
    PrjKy:1
}



$(document).ready(function () {

    var resize = function () {
        var height = $(window).height();  // Get the height of the browser window area.
        var element = $("body");          // Find the element to resize.
        element.height(height);           // Set the element's height.
    }
    resize();
    $(window).bind("resize", resize);

    GetFormObjData();

})

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
    LoadPrjCombo();
    Load();
}

function LoadPrjCombo() {
    $("#HdrSec1_CmbPrj_Nm").kendoComboBox({
        dataValueField: "PrjKy",
        dataTextField: "PrjNm",
        dataSource: PrjNm_SelectMob_DataSource("HdrSec1_ComProPj"),
        change: function (e) {
            var cmb = $("#HdrSec1_CmbPrj_Nm").data("kendoComboBox");
            var PrjKy = cmb.value();
        },
        filter: "contains",
        suggest: true,
        placeholder: "Select a Project..."
    });
}

function Load() {
    createSales();
}

function createSales() {
    var Prj = $("#HdrSec1_CmbPrj_Nm").val();

    $.ajax({
        url: urlEVMDashBoard.EVMDashBoard,
        dataType: "json",
        type: "POST",
        data: JSON.stringify({
            ObjKy: viewBag.ObjKy,
            PrjKy:1
        }),
        contentType: 'application/json; charset=utf-8',
        success: function (Data) {
            // LineChartDemo(Data);
            ChartDemo(Data);
        }
    });
}

function ChartDemo(Data) {
    $("#Chart").kendoChart({
        dataSource: {
            data: Data
        },
        title: {
            text: "EVM"
        },
        legend: {
            visible: true,
            position: "top"
        },
        seriesDefaults: {
            type: "line",
            labels: {
                visible: true,
                template: " ${ value }",
                background: "transparent"
            }
        },
        series: [{
            field: "PlnVal",
            categoryField: "WKNo",
            name:"PlnVal"   
        },
    {
     field: "ERNVal",
     categoryField: "WKNo",
    name:"ERNVal"
    }
        ],
        valueAxis: {
            labels: {
                template: " ${ value }",
                Name:"VALUE"
            },
            line: {
                visible: false
            }
        },
        categoryAxis: [{
            baseUnit: "WKNo",
            majorGridLines: {
                visible: false
            },
            //labels: {
            //    rotation: 90
            //},
        }],
        tooltip: {
            visible: true,
            template: "${ category } : ${ value }.00"
        }
        });
}