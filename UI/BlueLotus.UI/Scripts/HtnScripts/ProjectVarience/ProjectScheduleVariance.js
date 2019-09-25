var FormGlblData = {
    FormObjData: null,
    PrjKy: 1,
    TrnTypKy: 1
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
    //LoadPrjCombo();
    LoadPrjCombo();
    LoadDatePicker_From();
    LoadDatePicker_To();
    //Load();
}

function LoadPrjCombo() {
    $("#HdrSec1_CmbPrj_Cd").kendoComboBox({
        dataValueField: "PrjKy",
        dataTextField: "PrjId",
        dataSource: PrjId_SelectMob_DataSource("HdrSec1_ComProPj_Cd"),
        change: function (e) {
        },
        filter: "contains",
        suggest: true,
        placeholder: "Select a Project."
    });
}


function PrjId_SelectMob_DataSource(ObjNm) {
    var ObjVisible = GetObjVisible(ObjNm);
    if (ObjVisible == 0) {
        return [];
    }
    var ObjKy = GetObjKy(ObjNm);
    var dataSource = new kendo.data.DataSource(
    {
        transport: {
            read: {
                url: urlComboLoad.PrjID_SelectMob,
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

function LoadDatePicker_From() {

    $("#HdrPart_Date_From").kendoDatePicker({
        format: "dd/MM/yyyy",
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
    $('#HdrPart_Date_From').data("kendoDatePicker").value(todayDate);

}

function LoadDatePicker_To() {
    $("#HdrPart_Date_To").kendoDatePicker({
        format: "dd/MM/yyyy",
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
    $('#HdrPart_Date_To').data("kendoDatePicker").value(ToDtm);
}

function Load() {
    LoadGrid();
    //newgrid();
    //newnew();
}


function LoadGrid(){
    var prjKy = $("#HdrSec1_CmbPrj_Cd").data("kendoComboBox").value();
    var element = $("#ProjectScheduleVarianceGrid").kendoGrid({
        dataSource: [{ PrjKy: prjKy }],
        height: 400,
        sortable: true,
        pageable: true,
        detailInit: detailInit,
        dataBound: function() {
            this.expandRow(this.tbody.find("tr.k-master-row").first());
        },
        columns: [
            {
                field: "PrjKy",
                title: "PrjKy",
                width: "50px",
                hidden: "true",
            },
            //{
            //    field: "TaskID",
            //    title: "Task ID",
            //    width: "110px"
            //},
            //{
            //    field: "TaskNm",
            //    title:"Task Name",
            //    width: "110px"
            //},
            //{
            //    field: "BCWorkScheduled",
            //    title: "Work Scheduled",
            //    width: "110px"
            //},
            //{
            //    field: "BCWorkPerformed",
            //    title: "WorkPerformed",
            //    width: "110px"
            //},
            //{
            //    field: "",
            //    title: "Variance",
            //    width: "110px"
            //}
        ],
        //measures: {
        //    "Sum": { field: "BCWorkScheduled", format: "{0:c}", aggregate: "sum" },
        //}
    });
}


function detailInit(e) {
    var prjKy = $("#HdrSec1_CmbPrj_Cd").data("kendoComboBox").value();
    var FromDate = $("#HdrPart_Date_From").data("kendoDatePicker").value();
    var Todate = $("#HdrPart_Date_To").data("kendoDatePicker").value();
    $("<div/>").appendTo(e.detailCell).kendoGrid({
        dataSource:{
    transport: {
        read: {
            url: urlLoadGrid,
            data: {
                PrjKy: prjKy,
                frmdate: FromDate,
                todate: Todate,
                ObjKy: viewBag.ObjKy,
            },
            dataType: "json"
        }
    },
    serverPaging: true,
    serverSorting: true,
    serverFiltering: true,
    pageSize: 10,
    filter: { field: "PrjKy", operator: "eq", value: e.data.PrjKy }
},
        scrollable: false,
        sortable: true,
        pageable: true,
        columns: [
            { field: "TaskID", title: "Task ID", width: "50px" },
            { field: "TaskNm", title: "Task Name", width: "110px" },
            { field: "BCWorkScheduled", title: "Work Scheduled", width: "100px", type: "number", format: '{0:n2}' },
            { field: "BCWorkPerformed", title: "Work Performed", width: "100px", type: "number", format: '{0:n2}', aggregates: ["sum"], footerTemplate: "Total: #=sum#" },
            { field: "Variance", title: "Variance", width: "100px", format: '{0:n2}' }
        ]
    });
}




function Grid_DataSource() {
    var prjKy = $("#HdrSec1_CmbPrj_Cd").data("kendoComboBox").value();
    var FromDate = $("#HdrPart_Date_From").data("kendoDatePicker").value();
    var Todate = $("#HdrPart_Date_To").data("kendoDatePicker").value();

    var dataSource = new kendo.data.DataSource(
    {
        transport: {
            read: {
                url: urlLoadGrid,
                data: {
                    PrjKy: prjKy,
                    frmdate: FromDate,
                    todate:Todate ,
                    ObjKy: viewBag.ObjKy,
                },
                dataType: "json"
            }
        }
    });
    return dataSource;
}

function newgrid() {


    var products = Grid_DataSource();
    var pivotgrid = $("#ProjectScheduleVarianceGrid").kendoPivotGrid({
            columnWidth: 120,
            height: 570,
            rowHeaderTemplate: $("#rowTemplate").html(),
            dataSource: {
                //data: products,
                data: products,
                schema: {
                    model: {
                        fields: {
                            PrjKy:{type:"number"},
                            TaskID: { type: "string" },
                            TaskNm: { type: "string" },
                            BCWorkScheduled: { type: "number" },
                            BCWorkPerformed: { type: "number" },
                            Variance: { type: "number" },
                        }
                    },
                    cube: {
                        dimensions: {
                            Discontinued: { caption: "View All" }
                        },
                        measures: {
                            "Sum": { field: "BCWorkScheduled", format: "{0:c}", aggregate: "sum" },
                            "Average": { field: "BCWorkPerformed", format: "{0:c}", aggregate: "average" }
                        }
                    }
                },
                columns: [{ name: "PrjKy", expand: true }, { name: "TaskID" }],
                rows: [{ name: "Discontinued", expand: true }],
                measures: ["Sum"]
            }
        }).data("kendoPivotGrid");
}


function newnew() {

    var prjKy = $("#HdrSec1_CmbPrj_Cd").data("kendoComboBox").value();
    var FromDate = $("#HdrPart_Date_From").data("kendoDatePicker").value();
    var Todate = $("#HdrPart_Date_To").data("kendoDatePicker").value();
    $("#ProjectScheduleVarianceGrid").kendoGrid({
        dataSource: {
            transport: {
                read: {
                    data: {
                        PrjKy: prjKy,
                        frmdate: FromDate,
                        todate: Todate,
                        ObjKy: viewBag.ObjKy,
                    },
                    url: urlLoadGrid,
                    dataType: "json"
                }
            },
            schema: {
                model: {
                    fields: {
                        PrjKy: { type: "number" },
                        TaskID: { type: "string" },
                        TaskNm: { type: "string" },
                        BCWorkScheduled: { type: "number" },
                        BCWorkPerformed: { type: "number" },
                        Variance: { type: "number" },
                    }
                }
            },
            pageSize: 7,
            group: {
                field: "View All", aggregates: [
                   { field: "BCWorkScheduled", aggregate: "sum" },
                   { field: "BCWorkPerformed", aggregate: "sum" },
                ]
            },

            aggregate: [{ field: "PrjKy", aggregate: "count" },
                          { field: "BCWorkScheduled", aggregate: "sum" },
                          { field: "BCWorkPerformed", aggregate: "average" },
                          { field: "TaskNm", aggregate: "min" },
                          { field: "TaskID", aggregate: "max" }]
        },
        sortable: true,
        scrollable: false,
        pageable: true,
        columns: [
            { field: "PrjKy", title: "PrjKy", aggregates: ["count"], footerTemplate: "Total Count: #=count#", groupFooterTemplate: "Count: #=count#" },
            { field: "TaskID", title: "TaskID", aggregates: ["sum"] },
            {
                field: "TaskNm", title: "TaskNm", aggregates: ["average"], footerTemplate: "Average: #=average#",
                groupFooterTemplate: "Average: #=average#"
            },
            {
                field: "BCWorkScheduled", title: "BCWorkScheduled", aggregates: ["min", "max", "count"], footerTemplate: "<div>Min: #= min #</div><div>Max: #= max #</div>",
                groupHeaderTemplate: "Units In Stock: #= value # (Count: #= count#)"
            }
        ]
    });
}
