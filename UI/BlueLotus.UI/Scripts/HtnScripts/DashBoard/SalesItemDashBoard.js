var FormGlblData = {
    FormObjData: null,
    ItmNm: '',
    ItmKy: 0
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
   // LoadLocationCombo1();

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
    Filter();
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
        min: new Date(2018, 03, 01),
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
    $("#HdrPart_Date_To").kendoDateTimePicker({
        //format: "dd/MM/yyyy HH:mm:ss" ,
        //language: 'en',
        //pick12HourFormat: true
        format: "dd/MM/yyyy hh:mm tt",
        min: new Date(2018, 03, 01),
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
    $('#HdrPart_Date_To').data("kendoDateTimePicker").value(todayDate);

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


function Filter() {
    createSales();
}


function createSales() {
    var DtF = $("#HdrPart_Date_From").val();
    var DtT = $("#HdrPart_Date_To").val();
    var LockKy = $("#HdrPart_CmbLoc_Nm").val();
   
    $.ajax({
        url: urlDrillDashBoard.ProjectDashBoard,
        dataType: "json",
        type: "POST",
        data: JSON.stringify({           
            Fromdt: DtF,
            Todt: DtT,
            Locky: LockKy
        }),
        contentType: 'application/json; charset=utf-8',
        success: function (Data) {
            LoadGrid(Data);

          //  $("#DetailGrid").hide();
            //for (i = 0; i < Data.length; i++) {
            //    PieChartDemo(Data, Data[i].Type)
            //}
        }
    });
}

function PieChartDemo(Data, Type) {
    total = GetLentth(Data, Type)
    count = 0;

    for (var i = 0; i < Data.length; i++) {
        if (Data[i].Type == Type && Data[i].CurrentStatus == "OK") {
            count++;
        }
    }
    var data = [];
    data.push({ source: "OK", Count: count });
    data.push({ source: "Expired", Count: total - count });

    $("#" + Type).kendoChart({
        title: {
            text: Type + " Chart"
        },
        legend: {
            position: "bottom"
        },
        dataSource: {
            data: data
        },
        series: [{
            type: "pie",
            field: "Count",
            categoryField: "source",
        }],
        seriesColors: ["#03a9f4", "#ff9800", "#fad84a", "#4caf50"],
        tooltip: {
            visible: true,
            template: "${ category } : ${ value }"
        },
        seriesClick: function (e) {

            var Status = e.category;
            var ChartName = this.options.title.text.split(" ");
            var Title = ChartName[0];
            var ChartDetail = [];
            for (var i = 0; i < Data.length; i++) {
                if (Data[i].Type == Title && Data[i].CurrentStatus == Status) {
                    ChartDetail.push(Data[i]);
                }

            }
            $("#DetailGrid").show();
            LoadGrid(ChartDetail);
        }
    });

}


function GetLentth(Data, type) {
    count = 0;
    for (var i = 0; i < Data.length; i++) {
        if (Data[i].Type == type) {
            count++;
        }

    }
    return count;
}

function LoadGrid(ChartDetail) {
    var datasourceLoadGridView = new kendo.data.DataSource({
        data: ChartDetail,
        batch: true,
        pageSize: 20,
        schema: {
            model: {
                fields:
				{
				    ItmKy: { editable: false, nullable: false, },
				    ItemName: { editable: false, nullable: false, }

				}
            }
        }
    });

    $("#DetailGrid").kendoGrid({
        dataSource: datasourceLoadGridView,
        height: 200,
        navigatable: true,
        filterable: {
            mode: "row"
        },
        pageable: true,
        sortable: true,
        reorderable: true,
        columnMenu: false,
        selectable: "row",
        resizable: true,
        animation: {
            open: {
                effects: "fadeIn zoom:in",
                duration: 300
            }
        },
        pageable: { refresh: true, pageSizes: [5, 10, 20, 50, 100] },
        columns: [
        { field: "ItmKy", title: "ItmKy", width: "100px", hidden: true },
        { field: "ItemName", title: "Item Name", width: "100px" }
        ],

        editable: false
    });
}




$("#DetailGrid").on("dblclick", "tr.k-state-selected", function () {
    var id = ("#DetailGrid");
    var grid = $(id).data().kendoGrid;
    var selectedItem = grid.dataItem(grid.select());   
    var ItmKy = selectedItem.ItmKy;
    createSalesSecond(ItmKy);
    createSalesHourly(ItmKy);

    //LoadGridWithColumnPropThree(ItmKy);


});

function LoadGridWithColumnPropThree(ChartDetail, ItmKy) {
   
    var datasourceLoadGridView = new kendo.data.DataSource({
        data: ChartDetail,
        batch: true,
        pageSize: 20,
        schema: {
            model: {
                fields:
				{
				    ItmKy: { editable: false, nullable: false, },
				    ItemName: { editable: false, nullable: false, },
				    Qty: { editable: false, nullable: false, },
				    Cost: { editable: false, nullable: false, }
				   

				}
            }
        }
    });

    $("#DetailGrid2").kendoGrid({
        dataSource: datasourceLoadGridView,
        height: 200,
        navigatable: true,
        filterable: true,
        pageable: true,
        sortable: true,
        reorderable: true,
        columnMenu: false,
        selectable: "row",
        resizable: true,
        animation: {
            open: {
                effects: "fadeIn zoom:in",
                duration: 300
            }
        },
        pageable: { refresh: true, pageSizes: [5, 10, 20, 50, 100] },
        columns: [
        { field: "ItmKy", title: "ItmKy", width: "100px", hidden: true },
        { field: "ItemName", title: "Item Name", width: "100px" },
        { field: "Qty", title: "Qty", width: "100px" },
        { field: "Cost", title: "Total Sales", width: "100px" }
        ],

        editable: false
    });
   
  
}


function createSalesSecond(ItmKy) {
    var DtF = $("#HdrPart_Date_From").val();
    var DtT = $("#HdrPart_Date_To").val();
    var LockKy = $("#HdrPart_CmbLoc_Nm").val();

    $.ajax({
        url: urlDrillDashBoard.GetChildGrid,
        dataType: "json",
        type: "POST",
        data: JSON.stringify({
            Fromdt: DtF,
            Todt: DtT,
            itmKy: ItmKy,
            Locky: LockKy
        }),
        contentType: 'application/json; charset=utf-8',
        success: function (Data) {
            LoadGridWithColumnPropThree(Data);
           var  topItm= Data.slice(0, 10);
           ChartDemo(topItm);

           
        }
    });
}


function createSalesHourly(ItmKy) {
    var DtF = $("#HdrPart_Date_From").val();
    var DtT = $("#HdrPart_Date_To").val();
    var LockKy = $("#HdrPart_CmbLoc_Nm").val();

    $.ajax({
        url: urlDrillDashBoard.GetRelatedHourSalesItem,
        dataType: "json",
        type: "POST",
        data: JSON.stringify({
            Fromdt: DtF,
            Todt: DtT,
            itmKy: ItmKy,
            Locky: LockKy
        }),
        contentType: 'application/json; charset=utf-8',
        success: function (Data) {
            //LoadGridWithColumnPropThree(Data);
           var topItm = Data.slice(0, 15);
           HourlyChart(topItm);


        }
    });
}


function ChartDemo(Data) {
    $("#Chart").kendoChart({
        dataSource: {
            data: Data
        },
        theme: "Fiori",
        legend: {
            visible: true,
            position: "top"
        },
        title: {
            text: "Fast Moving Items",
        },
        seriesDefaults: {
            type: "column",
            labels: {
                visible: true,
                template: " ${ value }",
                background: "transparent"
            }
        },
        series: [{
            field: "Qty",
            categoryField: "ItemName",
          //  name: "PlnVal"
        },
   
        ],
        valueAxis: {
            labels: {
                template: " ${ value }",
                Name: "VALUE"
            },
            line: {
                visible: false
            },
            majorGridLines: {
                visible: false
            },
        },
        categoryAxis: [{
            baseUnit: "ItemName",
            majorGridLines: {
                visible: false
            },
            labels: {
                template: "#= shortLabels(value)#",
                rotation: 45
            },
        }],
        tooltip: {
            visible: true,
            template: "${ category } : ${ value }.000"
        }
    });
}

function shortLabels(value) {
    if (value.length > 5) {
        value = value.substring(0, 10);
        return value + "...";
    }
}

function HourlyChart(Data) {
    $("#HourlyChart").kendoChart({
        dataSource: {
            data: Data
        },
        title:{
            text: "Hourly Sales",
        },
        theme: "Fiori",
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
            field: "Qty",
            categoryField: "Period",
            //  name: "PlnVal"
        },

        ],
        valueAxis: {
            labels: {
                template: " ${ value }",
                Name: "VALUE"
            },
            line: {
                visible: false
            },
            majorGridLines: {
                visible: false
            },
        },
        categoryAxis: [{
           // baseUnit: "Hour",
            majorGridLines: {
                visible: false
            },
            labels: {
                rotation: 45
            },
        }],
        tooltip: {
            visible: true,
            template: "${ category } : ${ value }.000"
        }
    });
}
//function LoadLocationCombo1() {
//    $("#HdrPart_CmbLoc_Nm").kendoComboBox({
//        dataValueField: "CdKy",
//        dataTextField: "CdNm",
//        dataSource: CdNm_SelectMob_Datasource('HdrPart_CmbLoc'),

//        filter: "contains",
//        suggest: true,
//        placeholder: "Select a From Location.."
//    });
//}



