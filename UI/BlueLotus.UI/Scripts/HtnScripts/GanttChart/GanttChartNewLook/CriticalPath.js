// Critical path code

// Update CriticalPath
function updateCriticalPaths(sender, e) {
    // The first argument to GetCriticalPathActivities is a time-buffer which speifies the "safe distance" 
    // that an activity's end time should be away from affecting the project deadline.
    CriticalPathActivities = ganttControl.GetCriticalPathActivities(RQTimeSpan.Zero_M());
    var $ganttChart = $('#gantt_container').GanttControl('GetGanttChart');
    var anchrTme = $ganttChart.GanttChart('option', 'AnchorTime');
    var $gantt_container = $('#gantt_container');
    var ganttChart = $ganttChart.data("GanttChart");
    ganttChart.BeginUpdate();
    $gantt_container.GanttControl({
        TaskItemTemplate: tTemplateCritical,
        AnchorTime: new Date(2010, 01, 01, 00, 00, 00)
    });
    $gantt_container.GanttControl({
        TaskItemTemplate: tTemplateCritical,
        AnchorTime: anchrTme
    });
    ganttChart.EndUpdate();
    ganttControl.RedrawChartRows();//$
}


// Clear CriticalPath
function clearCriticalPaths(sender, e) {
    CriticalPathActivities = [];
    var $gantt_container = $('#gantt_container');
    var $ganttChart = $('#gantt_container').GanttControl('GetGanttChart');
    var anchrTme = $ganttChart.GanttChart('option', 'AnchorTime');
    var ganttChart = $ganttChart.data("GanttChart");
    ganttChart.BeginUpdate();
    $gantt_container.GanttControl({
        TaskItemTemplate: tTemplateSlider,
        AnchorTime: new Date(2010, 01, 01, 00, 00, 00)
    });
    $gantt_container.GanttControl({
        TaskItemTemplate: tTemplateSlider,
        AnchorTime: anchrTme
    });
    ganttChart.EndUpdate();
    ganttControl.RedrawChartRows();//$
}


function UpdateBackgroundColorBinding(data) {
    var isCritical = CriticalPathActivities.indexOf(data) != -1;
    // for background-image
    if (isCritical) {
        //var iii = '<img src="~/Src/Styles/Images/redBar.png" />';
        return 'url(../../../DevBL10/Src/Styles/Images/redBar.png)';
    } else {
        return 'url(../../../DevBL10/Src/Styles/Images/TaskBar.png)';       //           ../../../Src/Styles/Images/TaskBar.png
    }
}


function UpdateBorderColorBinding(data) {
    var isCritical = CriticalPathActivities.indexOf(data) != -1;
    // for background-color
    if (isCritical) {
        return 'red';
    } else {
        return '#050DFA';
    }
}









//Slider color change functions
function RedrawChartRows(sender, ui) {
    sliderValue = ui.value;

    if (sliderValue > 100)
        sliderValue = 100;

    $("#idSliderPercentage").val(sliderValue + " %");
    var $gantt_container = $('#gantt_container');
    $gantt_container.GanttControl({
        TaskItemTemplate: tTemplateSlider
    });
    ganttControl.RedrawChartRows();
}
function OnTaskBarLoad(taskItemBar) {
    if (taskItemBar.Activity.DataSource_M().Priority == 1)
        taskItemBar.MileStoneBar.addClass('customMileStone-tri');
    else if (taskItemBar.Activity.DataSource_M().Priority == 2)
        taskItemBar.MileStoneBar.addClass('customMileStone-rect');
}

function UpdateBackgroundColorBindingSlider(data) {
    var ProgressPercent = data.ProgressPercent_M();
    if (ProgressPercent < sliderValue) {
        return 'url(../../../DevBL10/Images/greenBar.png)';
    } else {
        return 'url(../../../DevBL10/Src/Styles/Images/TaskBar.png)';
    }
}


function UpdateBorderColorBindingSlider(data) {
    var ProgressPercent = data.ProgressPercent_M();
    if (ProgressPercent < sliderValue){
        return 'green';
    } else {
        return '#050DFA';
    }
}


//RadiantQ.Binder.TaskColor = function ($elem, role, value, data) {
//    this.element = $elem;
//    this.value = value;
//    this.data = data.Activity_M();

//    this.init = function () {
//        var ProgressPercent = this.data.ProgressPercent_M();
//        if (ProgressPercent < sliderValue)
//            this.element.addClass("custom-taskbar");

//        else
//            this.element.removeClass("custom-taskbar");
//    }

//    this.refresh = function () {
//        this.init();
//    }
//}
