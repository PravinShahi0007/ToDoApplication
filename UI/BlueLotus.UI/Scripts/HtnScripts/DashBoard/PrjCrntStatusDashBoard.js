


$(document).ready(function () {
    Filter();
});

function Filter() {
    GetPrject_CurrentStatus();
    Prject_CurrentStatus();
}



function GetPrject_CurrentStatus() {
    $.ajax({
        url: urlDrillDashBoard.ProjectDashBoard,
        dataType: "json",
        type: "POST",
        data: JSON.stringify({
            Code1: "TrdMrk",
            Code2: "TrdMrk",
            Code3: "TrdMrk",
        }),
        contentType: 'application/json; charset=utf-8',
        success: function (Data) {
            
            for (i = 0; i < Data.length; i++) {
                PieChartDemo(Data, Data[i].Type)
            }
        }
    }); 
}

function PieChartDemo(Data, Type) {
    total = GetLentth(Data, Type)
    count = 0;

    for (var i = 0; i < Data.length; i++) {
        if (Data[i].currentstatus == "Pending") {
            count++;
        }
    }
    var data = [];
    data.push({ source: "Pending", Count: count });
    data.push({ source: "Registered", Count: total - count });

    $("#CrntStsChart").kendoChart({
        title: {
            text: "Trade Mark"
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
        seriesDefaults: {
            overlay: {
                gradient: null
            },
            labels: {
                visible: true,
                background: "transparent",
                template: "#= category #: \n #= value#"
            }
        },
        seriesColors: ["#ff9800", "#4caf50"],
        tooltip: {
            //visible: true,
            //template: "${ category } : ${ value }"
        },
        seriesClick: function (e) {

            var Status = e.category;
            var ChartName = this.options.title.text.split(" ");
            var Title = ChartName[0];
            var ChartDetail = [];
            for (var i = 0; i < Data.length; i++) {
                if (Data[i].currentstatus == Status) {
                    ChartDetail.push(Data[i]);
                }

            }
            $("#DetailGrid").show();
            $("#DrilDownGrid").hide();
            LoadGrid1(ChartDetail);
        }
    });

}

function LoadGrid1(ChartDetail) {
    var datasourceLoadGridView = new kendo.data.DataSource({
  
        data: ChartDetail,
        batch: true,
        pageSize: 20,
        schema: {
            model: {
                fields:
				{		    
				    Type: { editable: false, nullable: false, },
				    PRJKY: { editable: false, nullable: false, },
				    Title: { editable: false, nullable: false, },
				    Official: { editable: false, nullable: false, },
				    PrjNo: { editable: false, nullable: false },
				    Custodian: { editable: false, nullable: false },
				    AplicableLocation: { editable: false, nullable: false, },
				    currentstatus: { editable: false, nullable: false, },
				    DenseRank: { editable: false, nullable: false, },
				    FileID: { editable: false, nullable: false, },
				    Remarks: { editable: false, nullable: false, },
				    AprDtm: { editable: false, nullable: false, },
				    

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
            { field: "PRJKY", title: "PrjKy", width: "100px", hidden: true },
            { field: "Title", title: "Title", width: "100px" },
            { field: "Official", title: "Official", width: "100px" },
            { field: "PrjNo", title: "PrjNo", width: "100px" },
            { field: "Custodian", title: "Custodian", width: "100px" },
            { field: "AplicableLocation", title: "AplicableLocation", width: "100px" },
            { field: "currentstatus", title: "currentstatus", width: "100px" },
            { field: "DenseRank", title: "DenseRank", width: "100px" },
            { field: "FileID", title: "File ID", width: "100px" },
            { field: "Remarks", title: "Remarks", width: "100px" },
            { field: "Type", title: "Type", width: "100px" },
            { field: "AprDtm", title: "AprDtm", width: "100px" },
            

        ],

        editable: false
    });
}




function LoadGrid(Data) {

    var datasourceLoadGridView = new kendo.data.DataSource({
  
        data: Data,
        batch: true,
        pageSize: 20,
        schema: {
            model: {
                fields:
				{		    
				    //Type: { editable: false, nullable: false, },
				    //PRJKY: { editable: false, nullable: false, },
				    //Title: { editable: false, nullable: false, },
				    //Official: { editable: false, nullable: false, },
				    //PrjNo: { editable: false, nullable: false },
				    //Custodian: { editable: false, nullable: false },
				    //AplicableLocation: { editable: false, nullable: false, },
				    //currentstatus: { editable: false, nullable: false, },
				    //DenseRank: { editable: false, nullable: false, },
				    //FileID: { editable: false, nullable: false, },
				    //Remarks: { editable: false, nullable: false, },
				    //AprDtm: { editable: false, nullable: false, },
				    OurCd: { editable: false, nullable: false, },
				    COUNT: { editable: false, nullable: false, },

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
            //{ field: "PRJKY", title: "PrjKy", width: "100px", hidden: true },
            //{ field: "Title", title: "Title", width: "100px" },
            //{ field: "Official", title: "Official", width: "100px" },
            //{ field: "PrjNo", title: "PrjNo", width: "100px" },
            //{ field: "Custodian", title: "Custodian", width: "100px" },
            //{ field: "AplicableLocation", title: "AplicableLocation", width: "100px" },
            //{ field: "currentstatus", title: "currentstatus", width: "100px" },
            //{ field: "DenseRank", title: "DenseRank", width: "100px" },
            //{ field: "FileID", title: "File ID", width: "100px" },
            //{ field: "Remarks", title: "Remarks", width: "100px" },
            //{ field: "Type", title: "Type", width: "100px" },
            //{ field: "AprDtm", title: "AprDtm", width: "100px" },
            { field: "OurCd", title: "OurCd", width: "100px" },
            { field: "COUNT", title: "COUNT", width: "100px" },

        ],

        editable: false
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

function Prject_CurrentStatus() {
    $.ajax({
        url: urlDrillDashBoard.ProjectDashBoard,
        dataType: "json",
        type: "POST",
        data: JSON.stringify({
            Code1: "Licence",
            Code2: "Permit",
            Code3: "Certificate",
        }),
        contentType: 'application/json; charset=utf-8',
        success: function (Data) {

            for (i = 0; i < Data.length; i++) {
                PieChartDemo1(Data, Data[i].Type)
            }
        }
    });
}

function PieChartDemo1(Data, Type) {
    total = GetLentth(Data, Type)
    Pendingcount = 0;
    Validcount = 0;
    ExpiredCount = 0;

    for (var i = 0; i < Data.length; i++) {
        if (Data[i].currentstatus == "Pending") {
            Pendingcount++;
        }
        else if (Data[i].currentstatus == "Valid") {
            Validcount++;
        }
        else if (Data[i].currentstatus == "Expired") {
            ExpiredCount++;
        }
    }
    var data = [];
    data.push({ source: "Pending", Count: Pendingcount });
    data.push({ source: "Valid", Count: Validcount });
    data.push({ source: "Expired", Count: ExpiredCount });

    $("#StsChart").kendoChart({
        title: {
            text: "Licence/Permit/Certificate"
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
        seriesColors: ["#ff9800", "#4caf50", "#ba1705"],
        seriesDefaults: {
            overlay: {
                gradient: null
            },
            labels: {
                visible: true,
                background: "transparent",
                template: "#= category #: \n #= value#"
            }
        },
        tooltip: {
            //visible: true,
            //template: "${ category } : ${ value }"
        },
        seriesClick: function (e) {

            var currentstatus = e.category;
            //var ChartName = this.options.title.text.split(" ");
            //var Title = ChartName[0];
            //var ChartDetail = [];
            //for (var i = 0; i < Data.length; i++) {
            //    if (Data[i].currentstatus == Status) {
            //        ChartDetail.push(Data[i]);
            //    }

            //}
            //$("#DetailGrid").show();
            //LoadGrid(ChartDetail);

            $.ajax({
                url: urlDrillDashBoard.ProjectDashBoardwithTitle,
                dataType: "json",
                type: "POST",
                data: JSON.stringify({
                    Code1: "Licence",
                    Code2: "Permit",
                    Code3: "Certificate",
                    currentstatus: currentstatus,
                }),
                contentType: 'application/json; charset=utf-8',
                success: function (Data) {
                    $("#DetailGrid").show();
                    $("#DrilDownGrid").hide();
                    LoadGrid(Data);
                }
            });
        }
    });

}

$("#DetailGrid").on("dblclick", "tr.k-state-selected", function () {

    var id = ("#DetailGrid");
    var grid = $(id).data().kendoGrid;
    var selectedItem = grid.dataItem(grid.select());
    var OurCd = selectedItem.OurCd;
    var currentstatus = selectedItem.currentstatus

    $.ajax({
        url: urlDrillDashBoard.PrjCurrentStatusDetail,
        dataType: "json",
        type: "POST",
        data: JSON.stringify({
            PrjTyp: OurCd,
            currentstatus: currentstatus,
        }),
        contentType: 'application/json; charset=utf-8',
        success: function (Data) {
            $("#DrilDownGrid").show();
            $("#DetailGrid").hide();
            LoadDetailGrid(Data);
        }
    });
 

});

function LoadDetailGrid(Data)
{
    var datasourceLoadGridView = new kendo.data.DataSource({
  
        data: Data,
        batch: true,
        pageSize: 20,
        schema: {
            model: {
                fields:
				{		    
				    Type: { editable: false, nullable: false, },
				    PRJKY: { editable: false, nullable: false, },
				    Title: { editable: false, nullable: false, },
				    Official: { editable: false, nullable: false, },
				    PrjNo: { editable: false, nullable: false },
				    Custodian: { editable: false, nullable: false },
				    AplicableLocation: { editable: false, nullable: false, },
				    currentstatus: { editable: false, nullable: false, },
				    DenseRank: { editable: false, nullable: false, },
				    FileID: { editable: false, nullable: false, },
				    Remarks: { editable: false, nullable: false, },
				    AprDtm: { editable: false, nullable: false, },

				}
            }
        }
    });

    $("#DrilDownGrid").kendoGrid({
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
            { field: "PRJKY", title: "PrjKy", width: "100px", hidden: true },
            { field: "Title", title: "Title", width: "100px" },
            { field: "Official", title: "Official", width: "100px" },
            { field: "PrjNo", title: "PrjNo", width: "100px" },
            { field: "Custodian", title: "Custodian", width: "100px" },
            { field: "AplicableLocation", title: "AplicableLocation", width: "100px" },
            { field: "currentstatus", title: "currentstatus", width: "100px" },
            { field: "DenseRank", title: "DenseRank", width: "100px" },
            { field: "FileID", title: "File ID", width: "100px" },
            { field: "Remarks", title: "Remarks", width: "100px" },
            { field: "Type", title: "Type", width: "100px" },
            { field: "AprDtm", title: "AprDtm", width: "100px" },
            

        ],

        editable: false
    });
}

