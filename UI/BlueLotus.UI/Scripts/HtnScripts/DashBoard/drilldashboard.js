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
    //LoadLocationCombo1();
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
    var Dt = $("#HdrPart_Date_From").val();


    $.ajax({
        url: urlDrillDashBoard.ProjectDashBoard,
        dataType: "json",
        type: "POST",
        data: JSON.stringify({
            ObjKy: viewBag.ObjKy,
            Dt: Dt,
        }),
        contentType: 'application/json; charset=utf-8',
        success: function (Data) {
            $("#DetailGrid").hide();
            for (i = 0; i < Data.length; i++) {
                PieChartDemo(Data,Data[i].Type)
            }
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
            text: Type+" Chart"
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
        data:ChartDetail,
        batch: true,
        pageSize: 20,
        schema: {
            model: {
                fields:
				{
				    PrjKy: { editable: false, nullable: false, },
				    PrjNm: { editable: false, nullable: false, },
				    PrjID: { editable: false, nullable: false, },
				    ExpiryDt: { editable: false, nullable: false, },
				    PrjSts: { editable: false, nullable: false, },
				    Type: { editable: false, nullable: false },
				    CurrentStatus: { editable: false, nullable: false },
				    OwnerID: { editable: false, nullable: false, },
				    OwnerName: { editable: false, nullable: false, },
				    IssuerID: { editable: false, nullable: false, },
				    IsserName: { editable: false, nullable: false, },

				}
            }
        }
    });

    $("#DetailGrid").kendoGrid({
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
        { field: "PrjKy", title: "PrjKy", width: "100px", hidden: true },
        { field: "PrjID", title: "Project ID", width: "100px" },
        { field: "PrjNm", title: "Project Name", width: "100px" },
        { field: "ExpiryDt", title: "Expiry Date", width: "100px" },
        { field: "Type", title: "Type", width: "100px" },
        { field: "PrjSts", title: "Project Status", width: "100px" },
        { field: "CurrentStatus", title: "Current Status", width: "100px" },
         { field: "OwnerID", title: "Owner ID", width: "100px" },
         { field: "OwnerName", title: "Owner Name", width: "100px" },
          { field: "IssuerID", title: "Issuer ID", width: "100px" },
         { field: "IsserName", title: "Issuer Name", width: "100px" },

        ],

        editable: false
    });
}

$("#DetailGrid").on("dblclick", "tr.k-state-selected", function () {

    var id = ("#DetailGrid");
    var grid = $(id).data().kendoGrid;
    var selectedItem = grid.dataItem(grid.select());
    var PrjKy = selectedItem.PrjKy;
    var Date = $("#HdrPart_Date_From").val();
    var url = "http://" + document.location.host + "/" + "Devbl10" + "/" + "DrillDashboard" + "/" + "DrillDashBoardDetails" + "?ObjCaptn=" + "Details of Drill Dashboard" + "&OurCd=" + "" + "&OurCd2=" + "" + "&ObjKy=" + "123073" + "&PrjKy=" + PrjKy + "&Date=" + Date;
    window.open(url, '_blank');
   
});

