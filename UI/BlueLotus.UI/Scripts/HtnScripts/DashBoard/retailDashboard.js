var FormGlblData = {
    FormObjData: null
}

$(document).ready(function () {
    var resize = function() {
        var height = $(window).height();  // Get the height of the browser window area.
        var element = $("body");          // Find the element to resize.
        element.height(height);           // Set the element's height.
    }
    resize();
    $(window).bind("resize", resize);


    $("#HdrSec1_InptItmCd_Lbl").visible = false;
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
    LoadLocationCombo1();
    LoadDatePicker_From();
    LoadDatePicker_To();
    $("#HdrSec1_InptItmCd_Val").val("");
  
}

function LoadLocationCombo1() {
    $("#HdrPart_CmbLoc_Nm").kendoComboBox({
        dataValueField: "CdKy",
        dataTextField: "CdNm",
        dataSource: CdNm_SelectMob_Datasource('HdrPart_CmbLoc'),
       
        filter: "contains",
        suggest: true,
        placeholder: "Select a From Location.."
    });
}

function LoadDatePicker_From() {

    $("#HdrPart_Date_From").kendoDateTimePicker({
        //format: "dd/MM/yyyy HH:mm:ss" ,
        //language: 'en',
        //pick12HourFormat: true
        format: "dd/MM/yyyy hh:mm tt",
        dateInput: true,
        animation: {
            close: {
                effects: "fadeOut zoom:out",
                duration: 300
            },
            open: {
                effects: "fadeIn zoom:in",
                duration: 300
            }
        }
    });
    var dt = new Date();
    var Cyear = dt.getFullYear();
    var Cmonth = dt.getMonth();
    var Cday = dt.getDate();
    var todayDate = new Date(Cyear, Cmonth, Cday);
    $('#HdrPart_Date_From').data("kendoDateTimePicker").value(todayDate);

}

function LoadDatepickerForMonth() {
    $("#HdrPart_Date_From").kendoDateTimePicker({
        format: "dd/MM/yyyy hh:mm tt",
        dateInput: true,
        animation: {
            close: {
                effects: "fadeOut zoom:out",
                duration: 300
            },
            open: {
                effects: "fadeIn zoom:in",
                duration: 300
            }
        }
    });
    var todayDate = new Date();
    var firstOfMonth = new Date(todayDate.getFullYear(), todayDate.getMonth(), 1);
    $('#HdrPart_Date_From').data("kendoDateTimePicker").value(firstOfMonth);
}

function LoadDatepickerForMonthTo() {
    $("#HdrPart_Date_To").kendoDateTimePicker({
        format: "dd/MM/yyyy hh:mm tt",
        dateInput: true,
        animation: {
            close: {
                effects: "fadeOut zoom:out",
                duration: 300
            },
            open: {
                effects: "fadeIn zoom:in",
                duration: 300
            }
        }
    });
    var todayDate = new Date();
    var lastOfMonth = new Date(todayDate.getFullYear(), todayDate.getMonth() + 1, 0);
    $('#HdrPart_Date_To').data("kendoDateTimePicker").value(lastOfMonth);
}

function LoadDatePicker_To() {
    $("#HdrPart_Date_To").kendoDateTimePicker({
        //format: "dd/MM/yyyy",
        format: "dd/MM/yyyy hh:mm tt",
        dateInput: true,
        animation: {
            close: {
                effects: "fadeOut zoom:out",
                duration: 300
            },
            open: {
                effects: "fadeIn zoom:in",
                duration: 300
            }
        }
    });
    var todayDate = new Date();
    var ToDtm = new Date(todayDate.getFullYear(), todayDate.getMonth(), (todayDate.getDate() + 1));
    $('#HdrPart_Date_To').data("kendoDateTimePicker").value(ToDtm);
}

//function LoadDatepickerforWeek() {
//    $("#HdrPart_Date_To").kendoDatePicker({
//        format: "dd/MM/yyyy",
//    });

//    var FrmDtm = $("#HdrPart_Date_From").val();
//    var ToDtm = new Date(FrmDtm.getFullYear(), FrmDtm.getMonth(), (FrmDtm.getDate() + 7));
//    $('#HdrPart_Date_To').data("kendoDatePicker").value(ToDtm);
//}
function Daywise() {
    LoadDatePicker_From();
    LoadDatePicker_To();
    createSalesline();
    createChartSource();
    createPieForTotalSales();
}

function Monthwise() {
    LoadDatepickerForMonth();
    LoadDatepickerForMonthTo();
    createSalesline();
    createChartSource();
    createPieForTotalSales();
}

function Filter() {
    createSalesline();
    createChartSource();
    createPieForTotalSales();
}
//function Weekwise() {
//}

function createChartSource() {
    var LocKy = $("#HdrPart_CmbLoc_Nm").data('kendoComboBox').value();
    var FrmDtm = $("#HdrPart_Date_From").val();
    var ToDtm = $("#HdrPart_Date_To").val();
   
    $.ajax({
        url: urlRetailDashBoard.CatergorywiseDashBoard,
        dataType: "json",
        type: "POST",
        data: JSON.stringify({
            ObjKy: viewBag.ObjKy,
            LocKy: LocKy,
            FrmDtm: FrmDtm,
            ToDtm: ToDtm,
        }),
        contentType: 'application/json; charset=utf-8',
        success: function (Data) {
            createChart(Data);
        }
    });
}
function createChart(Data) {
    $("#Cat_Chart").kendoChart({
        title: {
            position: "top",
            text: "Sales By Category",
            font: "bold 14px sans-serif",
        },
        theme: "Fiori",
        legend: {
            position: "top"
        },
        dataSource: {
            data: Data
        },
        series: [{
            type: "column",
            field: "Amt",
            categoryField: "Category",
        }],
        seriesDefaults: {
            labels: {
               // position: "outsideEnd",
                visible: false,
                background: "transparent",
               // template: " ${ value }.00",
            }
        },
        categoryAxis: [{
            baseUnit: "Category",
            majorGridLines: {
                visible: false
            },
           
            labels: {
                rotation: -90
            },
        }],
        valueAxis: [{
            majorGridLines: {
                visible: false
            },
        }],
        tooltip: {
            visible: true,
            template: "${ category } : ${ value }.00"
        }
    });
}
function createSalesline() {
    var LocKy = $("#HdrPart_CmbLoc_Nm").data('kendoComboBox').value();
   var FrmDtm = $("#HdrPart_Date_From").val();
    var ToDtm = $("#HdrPart_Date_To").val();


    $.ajax({
        url: urlRetailDashBoard.SalesRevenueDashBoard,
        dataType: "json",
        type: "POST",
        data: JSON.stringify({
            ObjKy: viewBag.ObjKy,
            LocKy: LocKy,
            FrmDtm: FrmDtm,
            ToDtm: ToDtm,
        }),
        contentType: 'application/json; charset=utf-8',
        success: function (Data) {
            var totrev = 0;
            for (i = 0; i < Data.length; i++) {
                totrev += Data[i].Amt;
            }

           //var tot= $("#HdrSec1_InptItmCd_Val").val();
           // var tot = caltot(totrev);
            createLineChart(Data);
            $("#HdrSec1_InptItmCd_Lbl").visible = true;
            $("#HdrSec1_InptItmCd_Val").val(formatNumber(totrev.toFixed(2)));
        }
    });
}

function createLineChart(Data) {
    $("#SalesLine_Chart").kendoChart({
        title: {
            position: "top",
            text: 'Revenue',
            font: "bold 14px sans-serif"
        },
        theme: "Nova",
        legend: {
            position: "top"
        },
        dataSource: {
            data: Data
        },
        series: [{
            type: "column",
            field: "Amt",
            categoryField: "HH",
        }],
        seriesDefaults: {
            labels: {
                visible: true,
                background: "transparent",
                position: "outsideEnd",
               // template: " ${ value }.00",
                template: " #= kendo.format('{0:n}',value) #",
            }
        },
        categoryAxis: [{
            baseUnit: "HH",
            majorGridLines: {
                visible: false
            },
            labels: {
                rotation: -90
            },
        }],
        valueAxis:[{
            majorGridLines: {
                visible: false
            },
        }],
        //tooltip: {
        //    visible: true,
        //    template: "${ category } : ${ value }.00"
        //}
    });
}

function createPieForTotalSales() {
    var LocKy = $("#HdrPart_CmbLoc_Nm").data('kendoComboBox').value();
    var FrmDtm = $("#HdrPart_Date_From").val();
    var ToDtm = $("#HdrPart_Date_To").val();


    $.ajax({
        url: urlRetailDashBoard.TotalSalesDashBoard,
        dataType: "json",
        type: "POST",
        data: JSON.stringify({
            ObjKy: viewBag.ObjKy,
            LocKy: LocKy,
            FrmDtm: FrmDtm,
            ToDtm: ToDtm,
        }),
        contentType: 'application/json; charset=utf-8',
        success: function (Data) {
            var totCash = 0;
            var totCard = 0;
            for (i = 0; i < Data.length; i++) {
                if (Data[i].ItmCd == "Card")
                    totCard += Data[i].Amt;
                if(Data[i].ItmCd == "Cash")
                    totCash += Data[i].Amt;
            }
            //$("#HdrSec1_Inpt_Val").kendoNumericTextBox({
            //    min: 0,
            //    spinners: false,
            //    template: " #= kendo.format('{0:n}',value) #"
            //});



            $("#HdrSec1_Inpt_Val").val(formatNumber(totCash.toFixed(2)));
            //var dropdownlist = $("#HdrSec1_Inpt_Val").data("kendoNumericTextBox");
            //dropdownlist.trigger("change");
            //this will trigger change event
            $("#HdrSec1_Inptcard_Val").val(formatNumber(totCard.toFixed(2)));
            //createPieChart(Data);
        }
    });
}

function createPieChart(Data) {
    $("#Total_Sales").kendoChart({
        title: {
            position: "top",
            text: "Total Sales",
            font: "bold 14px sans-serif"
        },
        theme: "Fiori",
        legend: {
            position: "bottom"
        },
        dataSource: {
            data: Data
        },
        series: [{
            type: "pie",
            field: "Amt",
            categoryField: "ItmCd",
        }],
        seriesDefaults: {
            labels: {
                position: "outsideEnd",
                visible: true,
                background: "transparent",
                template:"${ category } :#= kendo.format('{0:n}',value) #",
            }
        },
        
        tooltip: {
            visible: true,
            //template: "${ category } :  ${ value }.00"
            template: "${ category }"
        }
    });
}

function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
}