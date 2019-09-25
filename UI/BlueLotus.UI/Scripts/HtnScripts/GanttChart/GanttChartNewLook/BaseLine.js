
// Is BaseLineClick-------------- 08/10/2014
function IsBaseLineClick(sender, e) {
    var elem = document.getElementById("IDBaseLineClick");
    if (elem.value == "BaseLine") {
        var $gantt_container = $('#gantt_container');
        $gantt_container.GanttControl({
            DataSource: null
        });

        goDrillGrid(tempPrjKy, tempPrcsSchKy, 1);
        elem.value = "RemoveBaseLine";
    }
    else {
        var $gantt_container = $('#gantt_container');
        $gantt_container.GanttControl({
            DataSource: null
        });

        goDrillGrid(tempPrjKy, tempPrcsSchKy, 0);
        elem.value = "BaseLine";
    }
}


function baseLineTooltip() {
    this.rendered = function () {
        $(this.nodes).tooltip({
            content: function () {
                var toolTipDateformat = 'dd-MMM-yyyy';
                var ds = $(this).data("tmplItem").data.ActivityView.Activity.DataSource;
                var PStartTime = ds.PlannedStartTime.toString(toolTipDateformat);
                var PEndTime = ds.PlannedEndTime.toString(toolTipDateformat);
                return "<div align='center'><span style='font-weight:bold'>BaseLine</span></div><div><span style='font-weight:bold'>Start:</span> " + PStartTime + "</div><div><span style='font-weight:bold'>End:</span> " + PEndTime + "</div>";
            }
        });
    }
    return "";
}
