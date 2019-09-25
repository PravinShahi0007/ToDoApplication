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
    LoadPrjCdCombo();
    LoadDatePicker_From();
    LoadDatePicker_To();
    //Load();
}

function LoadPrjCdCombo() {
    $("#HdrSec1_CmbPrj_Cd").kendoComboBox({
        dataValueField: "PrjKy",
        dataTextField: "PrjId",
        dataSource: PrjId_SelectMob_DataSource("HdrSec1_ComProPj_Cd"),
        change: function (e) {
            var cmb = $("#HdrSec1_CmbPrj_Cd").data("kendoComboBox");
            var PrjKy = cmb.value();
            //$("#HdrSec1_CmbPrj_Nm").data("kendoComboBox").value(PrjKy);
        },
        filter: "contains",
        suggest: true,
        placeholder: "Select a Project Code..."
    });
    //LoadPrjCombo();
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


function LoadPrjCombo() {
    $("#HdrSec1_CmbPrj_Nm").kendoComboBox({
        dataValueField: "PrjKy",
        dataTextField: "PrjNm",
        dataSource: PrjNm_SelectMob_DataSource("HdrSec1_ComProPj"),
        change: function (e) {
            var cmb = $("#HdrSec1_CmbPrj_Nm").data("kendoComboBox");
            var PrjKy = cmb.value();
            $("#HdrSec1_CmbPrj_Cd").data("kendoComboBox").value(PrjKy);
        },
        filter: "contains",
        suggest: true,
        placeholder: "Select a Project..."
    });
}
function PrjNm_SelectMob_DataSource(ObjNm) {
    var ObjVisible = GetObjVisible(ObjNm);
    if (ObjVisible == 0) {
        return [];
    }
    var ObjKy = GetObjKy(ObjNm);
    var dataSource = new kendo.data.DataSource(
    {
        transport: {
            read: {
                url: urlComboLoad.PrjNm_SelectMob,
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
    var PrjKy = $("#HdrSec1_CmbPrj_Cd").data('kendoComboBox').value();
    var FrmDt = $("#HdrPart_Date_From").val();
    var ToDt = $("#HdrPart_Date_To").val();
    if (PrjKy == 1 || PrjKy == null || PrjKy == undefined || PrjKy == "") {
        alert("Please Select Project!");
        return;
    }

    if (FrmDt > ToDt) {
        alert("Please Select Correct From Date and To Date");
        return;
    }
    CreateLineChart();
}

function CreateLineChart() {
    var PrjKy = $("#HdrSec1_CmbPrj_Cd").data('kendoComboBox').value();
    var FrmDt = $("#HdrPart_Date_From").val();
    var ToDt = $("#HdrPart_Date_To").val();

    $.ajax({
        url: urlPrjDashBoard.PrjDashBoard,
        dataType: "json",
        type: "POST",
        data: JSON.stringify({
            PrjKy: PrjKy,
            FrmDt: FrmDt,
            ToDt: ToDt,
        }),
        contentType: 'application/json; charset=utf-8',
        success: function (Data) {
            createChart(Data);
        }
    });
}

function createChart(Data) {
    $("#LineChartDemo").kendoChart({
        dataSource: {
            data: Data
        },
        theme: "blueopal",
        title: {
            text: "Project Variance"
        },
        legend: {
            visible: true,
            position: "top"
        },
        seriesDefaults: {
            type: "line",
            labels: {
                visible: false,
                template: " #= kendo.format('{0:n}',value) #",
                background: "transparent"
            },
        },
        series:
            [{
			
			    field: "Amt",
			    categoryField: "PERIOD",
			    name: "Amount",
               // axis: "Amt"
			},
           {
               field: "RunningTotal",
               categoryField: "PERIOD",
               name: "Running Total",
               markers: {
                  visible: true,
                 type: "triangle",
               },
               axis: "RunningTotal"
           },

           {
               field: "BUdRunningTotal",
               categoryField: "PERIOD",
               name: "Budget Running Total",
               markers: {
                   visible: true,
                   type: "cross",
               },
               axis: "RunningTotal"
           },
                
],
       valueAxis: [
   // {
        //    name: "Amt",
        //    title: {
        //        "text": "Amount"
        //    },
        //    labels:{
        //        // template: " #= kendo.format('{0:0}',value) #",
        //        format:"N0"
        //    },
            
        //    majorGridLines: {
        //        visible: false
        //    },
        //},
   {
       name: "RunningTotal",
       title: {
           text: "RunningTotal / Budget RunningTotal"
       },  //vc
       labels: {
           //template: " #= kendo.format('{0:0}',value) #",
           format: "N0"
       },
       majorGridLines: {
           visible: false
       },
      // template: " #= kendo.format('{0:n}',value) #",
   }],
        categoryAxis: [{
            baseUnit: "PERIOD",
            majorGridLines: {
                visible: false
            },
            labels: {
                rotation: 45
            },
            crosshair: {
                visible: true
            }
        }],
        tooltip: {
            visible: true,
            shared: true,
            template: " #= kendo.format('{0:n}',value) #",
            background: "white",
            color:"black"
        },
    });
}
