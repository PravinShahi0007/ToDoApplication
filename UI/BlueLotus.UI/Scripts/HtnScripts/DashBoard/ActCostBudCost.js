
$(document).ready(function () {
    var self = this;
    LoadCombo();
    LoadPrcsSch(1)
    createChart("line");
});

$("#FrmDate").width(150).kendoDatePicker({
    format: "dd/MM/yyyy",
    min: new Date(31, 2, 2009)
});
$("#FrmDate").closest("span.k-datepicker").width(150);

$("#ToDate").width(150).kendoDatePicker({
    format: "dd/MM/yyyy",
    min: new Date(31, 2, 2009)
});
$("#ToDate").closest("span.k-datepicker").width(150);

function ComboValidations(cmbNm) {
    var cmb = $("#" + cmbNm + "").data("kendoComboBox");
    var val = cmb.value();

    if (isNaN(val)) {
        alert("'" + val + "' is not a Valid input");
        $("#" + cmbNm + "").data('kendoComboBox').value("");
        return false;
    } else {
        return true;
    }
}

function PrjIdDatasource() {
    var dataSource = new kendo.data.DataSource(
      {
          transport: {
              read: {
                  url: urlGetPrjID_SelectMob, //'@Url.Content("~/GanttChart/GetPrjID_SelectMob")',
                  dataType: "json"
              }
          }
      });
    return dataSource;
}

function PrjNmDatasource() {
    var dataSource = new kendo.data.DataSource(
      {
          transport: {
              read: {
                  url: urlGetPrjNm_SelectMob, //'@Url.Content("~/GanttChart/GetPrjNm_SelectMob ")',
                  dataType: "json"
              }
          }
      });
    return dataSource;
}

function PrcsSchDatasource(PrjKy) {
    var dataSource = new kendo.data.DataSource(
      {
          transport: {
              read: {
                  url: urlGetSchNo, //'@Url.Content("~/DashBoardPM/GetSchNo")',
                  dataType: "json"
              },
              parameterMap: function (options, operation) {
                  if (operation == "read") {
                      return ({
                          'PrjKy': PrjKy,
                      });
                  }
              }
          }
      });
    return dataSource;
}

function LoadCombo() {
    var dataCom = [
                    { text: "Column Chart", value: "column" },
                    { text: "Line Chart", value: "line" },
                    { text: "Bar Chart", value: "bar" },
                    { text: "Area Chart", value: "area" }
    ];

    $("#combobox").kendoComboBox({
        dataTextField: "text",
        dataValueField: "value",
        dataSource: dataCom,
        change: cmbChange
    });

    $("#cmbPrjId").kendoComboBox({
        dataValueField: "PrjKy",
        dataTextField: "DocNo",
        dataSource: PrjIdDatasource(),
        change: function (e) {

            var cmb = $("#cmbPrjId").data("kendoComboBox");
            var PrjKy = cmb.value();
            var PrjNm = cmb.text();
            if (PrjKy != "") {
                var validate = ComboValidations("cmbPrjId");
                if (validate) {

                    $("#cmbPrjId").data("kendoComboBox").value(PrjKy);
                    $("#cmbPrjNm").data("kendoComboBox").value(PrjKy);

                    LoadPrcsSch(PrjKy);
                } else {
                    $("#cmbPrjId").data("kendoComboBox").value("");
                    $("#cmbPrjNm").data("kendoComboBox").value("");
                }
            }
        },
        filter: "contains",
        suggest: true,
        placeholder: "Select a PrjId.."
    });

    $("#cmbPrjNm").kendoComboBox({
        dataValueField: "PrjKy",
        dataTextField: "PrjNm",
        dataSource: PrjNmDatasource(),
        change: function (e) {

            var cmb = $("#cmbPrjNm").data("kendoComboBox");
            var PrjKy = cmb.value();
            var prjNm = cmb.text();
            if (PrjKy != "") {
                var validate = ComboValidations("cmbPrjNm");
                if (validate) {
                    $("#cmbPrjId").data("kendoComboBox").value(PrjKy);
                    $("#cmbPrjNm").data("kendoComboBox").value(PrjKy);
                    LoadPrcsSch(PrjKy);
                } else {
                    $("#cmbPrjId").data("kendoComboBox").value("");
                    $("#cmbPrjNm").data("kendoComboBox").value("");
                }
            }
        },
        filter: "contains",
        suggest: true,
        placeholder: "Select a PrjNm.."
    });

    $("#cmbPrjNm").parent().css('width', "200px");
    $("#cmbPrjId").parent().css('width', "150px");

}

function LoadPrcsSch(PrjKy) {
    $("#cmbPrcsSch").kendoComboBox({
        dataValueField: "PrcsSchKy",
        dataTextField: "SchNo",
        dataSource: PrcsSchDatasource(PrjKy),
        change: function (e) {

        },
        filter: "contains",
        suggest: true,
        placeholder: "Select a SchNo.."
    });
    $("#cmbPrcsSch").parent().css('width', "100px");
}

function Load() {
    createChart("line");
}

function Save() {

}

function ReLoad() {
    var chartType = $("#combobox").val();
    createChart(chartType);
  //  $("#tChart").data("kendoChart").refresh();
}

function cmbChange(args) {
    var chartType = $("#combobox").val();
    createChart(chartType);
}

var drgAndDrpChgVal = 1;

function createChart(chartType) {
    var self = this;

    var prjky = $("#cmbPrjId").data('kendoComboBox').value();
    if (prjky == null || prjky == undefined || prjky == "") {
        prjky = 1;
    }
    var prcsschky = $("#cmbPrcsSch").data('kendoComboBox').value();
    if (prcsschky == null || prcsschky == undefined || prcsschky == "") {
        prcsschky = 1;
    }

    var ToDt = $("#ToDate").val();
    var FrmDt = $("#FrmDate").val();

    $.holdReady(true);
    $.ajax({
        type: "GET",
        dataType: 'json',
        data: { Prjky: prjky, prcsschky: prcsschky, ToDt: ToDt, FrmDt: FrmDt },
        url: urlGetCVBudAndAct, //'@Url.Action("GetCVBudAndAct", "DashBoardPM")',//urlGetGanttChartTotalRowNo,
        converters:
    {
        "text json": function (data) {
            return $.parseJSON(data, true, true);
        }
    },
        success: function (data) {
            drillChart(data, chartType);
            $.holdReady(false);
        }
    });
}

function drillChart(evmAllPrj, chartType) {

    var minVal = 0, maxVal = 0;
    for (i = 0; i < evmAllPrj.length; i++) {
        minVal = minVal > evmAllPrj[i].BCWP ? evmAllPrj[i].BCWP : minVal;
        maxVal = maxVal < evmAllPrj[i].BCWP ? evmAllPrj[i].BCWP : maxVal;

        minVal = minVal > evmAllPrj[i].BCWP_RTTL ? evmAllPrj[i].BCWP_RTTL : minVal;
        maxVal = maxVal < evmAllPrj[i].BCWP_RTTL ? evmAllPrj[i].BCWP_RTTL : maxVal;
        
        minVal = minVal > evmAllPrj[i].ACWP ? evmAllPrj[i].ACWP : minVal;
        maxVal = maxVal < evmAllPrj[i].ACWP ? evmAllPrj[i].ACWP : maxVal;

        minVal = minVal > evmAllPrj[i].ACWP_RTTL ? evmAllPrj[i].ACWP_RTTL : minVal;
        maxVal = maxVal < evmAllPrj[i].ACWP_RTTL ? evmAllPrj[i].ACWP_RTTL : maxVal;
    }

    maxVal = Math.ceil(maxVal + ((maxVal - minVal) / 8));

    $("#tChart").kendoChart({

        legend: {
            position: "top",
            labels: { color: 'white' }
        },
        chartArea: {
            height: 500
        },
        chartArea: { background: "black" },
        seriesDefaults: {
            type: chartType
        },
        series: [{ field: 'BCWP', name: 'BCWP', color: 'blue' },
        { field: 'BCWP_RTTL', name: 'BCWP_RTTL', color: 'green' },
        { field: 'ACWP', name: 'ACWP', color: 'orange' },
        { field: 'ACWP_RTTL', name: 'ACWP_RTTL', color: 'yellow' },
        ],
        valueAxis: {
            labels: { visible: true, format: '{0:n0}' },
            color: "white",
            line: {
                visible: false
            },
            min: minVal,
            max: maxVal,
            //minorGridLines: {
            //    visible: true
            //}
        },
        categoryAxis: {
            field: "Dt",
            labels: { rotation: -45 },
            color: "white",
            majorGridLines: { visible: true },
            line: {
                visible: false
            },
        },
        tooltip: {
            visible: true, format: '{0:n0}'
        },
        dataSource: new kendo.data.DataSource({ data: evmAllPrj }),
        seriesClick: listener,
        drag: function (e) {
            if (e.originalEvent.target[0].tagName === 'circle') {
                movePathWithPoint(e.originalEvent.target[0], e.originalEvent.event.pageY - 223); // pass move position carefully
            }
        },
        dragEnd: function (e) {
            if (e.originalEvent.target[0].tagName === 'circle') {
                circle = $('circle[data-model-id=' + $(e.originalEvent.target[0]).attr('data-model-id') + ']');
                pointIndex = circle.attr('data-bar') - 1;
                pathIndex = circle.attr('data-index') - 1;

                var evmAllPrjEdit = $("#tChart").data("kendoChart").dataSource;

                if (pathIndex == 0)
                    evmAllPrjEdit.data()[pointIndex].BCWP = drgAndDrpChgVal;
                else if (pathIndex == 1)
                    evmAllPrjEdit.data()[pointIndex].BCWP_RTTL = drgAndDrpChgVal;
                else if (pathIndex == 2)
                    evmAllPrjEdit.data()[pointIndex].ACWP = drgAndDrpChgVal;
                else if (pathIndex == 3)
                    evmAllPrjEdit.data()[pointIndex].ACWP_RTTL = drgAndDrpChgVal;

                $("#tChart").data("kendoChart").dataSource = evmAllPrjEdit;
                //$("#tChart").data("kendoChart").refresh();
            }
        },
        dragStart: function (e) {
            // Calculate the dimensions only if the target is “circle”
            if (e.originalEvent.target[0].tagName !== 'circle') {
                return;
            }

            var me = this,
            circle = $("#tChart").find('svg g g circle'), // Get all the line intersecting points
            path = $("#tChart").find('svg g g path'), // Get all the line paths
            pathLength = path.length, // Get the total paths length
            circleLength = circle.length;  // Get the total circles length

            me.index = 0;

            // Calculate the chart boundaries
            if (!self.chartLimits) {
                self.chartLimits = getChartLimits();
            }

            // Set attribute to the line path for retrieving the individual path
            path.each(function () {
                if (!$(this).attr('data-index')) {
                    $(this).attr('data-index', ++me.index);
                }
            });

            // Set attribute to the circles(points) for retrieving the individual circle
            for (var k = 0; k < circleLength; k++) {
                $(circle[k]).attr({
                    'data-index': (k % pathLength) + 1,
                    'data-bar': Math.ceil((k + 1) / pathLength)
                });
            }

        }
    });

    // Get the chart area (plot area) limits
    var getChartLimits = function () {
        var plotArea = $($('svg path')[2]).attr('d').substr(1),
        plotAreaDim = plotArea.split(" "),

        chartLimits = {
            upperHeightLimit: plotAreaDim[5], // For line/column graphs
            lowerHeightLimit: plotAreaDim[1], // For line/column graphs
            upperWidthLimit: plotAreaDim[2], // For bar graphs
            lowerWidthLimit: plotAreaDim[0] // For bar graphs
        };

        return chartLimits;
    };

    // Draggable functionality     
    function movePathWithPoint(element, pos) {

        var pointIndex, path, p_array, pathElement, circle, pathIndex,
        chartLimits = self.chartLimits;

        // Get the target circle element
        circle = $('circle[data-model-id=' + $(element).attr('data-model-id') + ']');
        pointIndex = circle.attr('data-bar') - 1;
        pathIndex = circle.attr('data-index');

        // Get the line path in which the circle lies              
        pathElement = $('svg g g path[data-index=' + pathIndex + ']');

        // Restrict dragging outside the chart limits 
        if (pos > chartLimits.lowerHeightLimit && pos < chartLimits.upperHeightLimit) {
            // In the pathElement the “d” attribute contains all the coordinates of the points and lines
            path = pathElement.attr('d').substr(1);

            // Set the line path along with the dragging circle
            p_array = path.split(" ");
            p_array[(pointIndex * 2) + 1] = pos; // Change the path coordinate with the new position of the dragged circle

            path = "M" + p_array.join(" ");

            pathElement.attr('d', path); // Reset the “d” attribute with the changed coordinates
            //element.setAttribute('cy', pos);
            circle.attr('cy', pos); // Reset the circles y-coordinate 

            //get reference to the chart widget
            var chart = $("#tChart").data("kendoChart");

            // Calculate Value : Method made by vageesan : vageesan2009@gmail.com
            var drgAndDrpChgValActual = maxVal - ((maxVal / (chartLimits.upperHeightLimit - chartLimits.lowerHeightLimit)) * (pos - chartLimits.lowerHeightLimit + 1));

            var n = Math.ceil(drgAndDrpChgValActual);
            if (String(n).length > 2) {
                var d = Math.pow(10, String(n).length - 2);
                n = Math.ceil(n / d) * d;
            }

            drgAndDrpChgVal = n >= maxVal ? maxVal : n;
            drgAndDrpChgVal = n <= minVal ? minVal : n;

            $('#valChag').val(drgAndDrpChgVal);
        }
    }
}

function listener(e) {
    var ToDt = $("#ToDate").val();
    var FrmDt = $("#FrmDate").val();
    $.ajax({
        url: urlCVDailyV2_DD1_DB_PrjKy, //'@Url.Action("CVDailyV2_DD1_DB_PrjKy", "DashBoardPM")',
        data: {
            Prjky: e.dataItem.PrjKy,
            Dt: e.dataItem.Dt,
            ToDt: ToDt,
            FrmDt: FrmDt
        },
        dataType: "Json",
        type: "POST",
        success: function (result) {
            window.open(urlGetTaskGrid_CVDailyV2, '_blank'); //'@Url.Action("GetTaskGrid_CVDailyV2", "DashBoardPM")'
        },
        error: function () {
            return false;
        }
    });
}
