function LoadDataSource(testData) {
    // -------Temp Fixed for data load.
    //var isaddrow = addrow();

    //if (isaddrow) {
    //    $gantt_container.GanttControl({
    //        DataSource: null
    //    });
        LoadDataSourceFinal(testData);
    //}

}

function LoadDataSourceFinal(testData) {

    mstPlnTaskSelection();
    addClickCount = 0;
    TotalRow();

    //var tTemplate = "<div class='rq-gc-taskbar' style=\"background-image:{{html UpdateBackgroundColorBinding()}} !important; border-color:{{html UpdateBorderColorBinding()}} !important\"></div>";
    var $gantt_container = $('#gantt_container');
    var that = this;
    try {
        for (var i = 0; i < testData.length; i++) {
            InjectGetAndSet.call(testData[i], "Lino", testData[i]["Lino"]);
            InjectGetAndSet.call(testData[i], "TrnUnit", testData[i]["TrnUnit"]);
            InjectGetAndSet.call(testData[i], "TrnUnitKy", testData[i]["TrnUnitKy"]);
            InjectGetAndSet.call(testData[i], "Rate", testData[i]["Rate"]);
            InjectGetAndSet.call(testData[i], "RateWMrkUp", testData[i]["RateWMrkUp"]);
            InjectGetAndSet.call(testData[i], "PrcsID", testData[i]["PrcsID"]);
            InjectGetAndSet.call(testData[i], "Qty", testData[i]["Qty"]);
            InjectGetAndSet.call(testData[i], "DlyPrgrsQtyThisSch", testData[i]["DlyPrgrsQtyThisSch"]);
            InjectGetAndSet.call(testData[i], "TTLDlyPrgrsQty", testData[i]["TTLDlyPrgrsQty"]);
        }
        //Assign the anchorTime to first task startdate
        if (testData.length > 0) {
            anchorTime = testData[0]["StartTime"].clone();
        }
        else {
            anchorTime = new Date().Date();
        }
    }
    catch (e) {
        anchorTime = new Date().Date();
    }

    $gantt_container.GanttControl({
        DataSource: testData
    });

    //Update the anchorTime to first task startdate
    var $GanttChart = ($gantt_container.data("GanttControl") || $gantt_container.data("radiantqGanttControl")).GetGanttChart();
    $GanttChart.GanttChart({ AnchorTime: anchorTime, ViewWidth: 2000, ResizeToFit: false, });

    // 2014 10 11
    if (window.parent && window.parent.FitToWindow)
        window.parent.FitToWindow();

    ganttControl = $gantt_container.data("GanttControl") || $gantt_container.data("radiantqGanttControl");
    var $table = ganttControl.options.GanttTable;
    //---------------

    /// Comment by vageesan : When update with RadintQ gantt with 5.0.1 version 
    /// (Actually i can't remember what i did with this code line with previes version.
    /// Need deep clerification if any issus comming inside this method.
    //var $gantt_container, gantt;
    //var project;
    //$.holdReady(true);
    //$.ajax({
    //    type: "GET",
    //    url: urlEmptyProject,//"EmptyProject.xml",    // this should be your XML url
    //    dataType: "xml text",
    //    converters:
    //    {
    //        "xml text": function (data) {
    //            // We use te xml2json jquery plugin to convert xml to json.
    //            var json = XML2jsobj(data);
    //            return json.Project;
    //        }
    //    },
    //    success: function (data) {
    //        
    //        self.jsonData = data;
    //        project = new RadiantQ.ProjectModel.Project(self.jsonData);
    //        project = Object.create(project);
    //        $.holdReady(false);
    //    }
    //});

    // 2104 10 11
    var $ganttChart = $('#gantt_container').GanttControl('GetGanttChart');
    var computerStartTime = $ganttChart.GanttChart('option', 'ComputedStartTime');
    var computerEndTime = $ganttChart.GanttChart('option', 'ComputedEndTime');
    var anchorTime = $ganttChart.GanttChart('option', 'AnchorTime');
    $('#startTime').datepicker(
     {
         onSelect: function (data) {
             // to set the chart start time.
             $ganttChart.GanttChart('SetStartTime', Date.parse(data));
             that.updatepickerValues();
         }
     });
    $('#endTime').datepicker({
        onSelect: function (data) {
            // to set the chart end time.
            $ganttChart.GanttChart('TrySetEndTime', Date.parse(data));
            that.updatepickerValues();
        }
    });
    $('#anchorTime').datepicker({
        onSelect: function (data) {
            // to set the anchor Time time.
            $ganttChart.GanttChart('option', 'AnchorTime', Date.parse(data));
            that.updatepickerValues();
        }
    });

    //$( '#updatepicker' ).click( that.updatepickerValues );
    var $viewWidth = $("#viewWidth");
    $('#resizeTofit').change(function () {
        //to set resize to fit.
        var resizeToFit = $(this).is(':checked');
        //To enable/disable the viewWidth spinner.
        if (resizeToFit == true)
            $viewWidth.spinner("disable");
        else
            $viewWidth.spinner("enable");

        $ganttChart.GanttChart('option', 'ResizeToFit', $(this).is(':checked'));
    });

    $viewWidth.spinner({
        min: 2000,
        max: 10000,
        step: 100,
        incremental: false,
        stop: function () {
            var newViewWidth = $viewWidth.spinner("value");
            //to set the  ViewWidth.
            $ganttChart.GanttChart('option', 'ViewWidth', newViewWidth);
        }
    });
    // to update the datePicker value.
    that.updatepickerValues = function () {
        $('#startTime').datepicker('setDate', $ganttChart.GanttChart('option', 'ComputedStartTime'));
        $('#endTime').datepicker('setDate', $ganttChart.GanttChart('option', 'ComputedEndTime'));
        $('#anchorTime').datepicker('setDate', $ganttChart.GanttChart('option', 'AnchorTime'));
    };
    //that.updatepickerValues();
    //--------------------------------------

    var activityViews = ganttControl.ActivityViews;
    for (var i = 0; i < activityViews.length; i++) {
        var view = activityViews[i];
        var activity = ganttControl.ActivityViews[i].activity;
        //To listen the task property changes.
        var task = activity.DataSource;
        task.PropertyChanged.subscribe(PropertychangeNotifier);
    }

    //To listen the task collection changes. 
    activityViews.CollectionChanged.subscribe(function (event, ui) {
        if (event.type === "insert") {
            var task = ui.items[0].Activity.DataSource;
            task.PropertyChanged.subscribe(PropertychangeNotifier);

        }
        else {
            var task = ui.items[0].Activity.DataSource;
            task.PropertyChanged.unsubscribe(PropertychangeNotifier);
        }
    });

    function PropertychangeNotifier(sender, args) {
        // Caching updated tasks, unless it's aready in the added tasks list.
        if (!addedTasks.Contains(sender.ID))
            updatedTasks.Add(sender.ID, sender);
    }

    var gcOptions = ganttControl.options;
    // timescale header types.
    var TimeScaleType = RadiantQ.Gantt.TimeScaleType
    var types = []
    types.push(TimeScaleType.Days);
    types.push(TimeScaleType.Weeks);
    types.push(TimeScaleType.Months);
    types.push(TimeScaleType.Years);
    // dom elements.
    var $topAddCombo = $("#topAddCombo");
    var $bottomAddCombo = $("#bottomAddCombo");
    var $currentHeadersList = $("#currentHeadersList");
    var $deleteSel = $("#deleteSel");
    $deleteSel.attr("disabled", "disabled");
    //$txtFormat.attr("disabled", "disabled");
    // Utility function to add some options to the combobox.
    addOptionToSelect = function (selectElem, item, canAddKey) {
        var val = canAddKey ? GetKey(RadiantQ.Gantt.TimeScaleType, item) : item;
        var option = document.createElement("option");
        option.text = val;
        selectElem[0].add(option);
    };
    GetKey = function (source, val) {
        for (var key in source) {
            if (source[key] == val)
                return key;
        }
    }
    //to update the selection based on the previous selection.
    UpdateControls = function () {
        var headers = gcOptions.TimeScaleHeaders;
        var top = headers[0];
        var bottom = headers[headers.length - 1];
        $currentHeadersList.empty();
        for (var i = 0; i < headers.length; i++) {
            addOptionToSelect($currentHeadersList, headers[i].Type, true);
        }
        $topAddCombo.empty();
        addOptionToSelect($topAddCombo, "Add on top...", false);
        for (var i = types.length - 1; i >= 0; i--) {
            if (top != undefined && top != null) {
                if (types[i] != top.Type)
                    addOptionToSelect($topAddCombo, types[i], true);
                else
                    break;
            }
            else
                addOptionToSelect($topAddCombo, types[i], true);
        }
        $($topAddCombo.children()[0]).select();
        $bottomAddCombo.empty();

        addOptionToSelect($bottomAddCombo, "Add on bottom...", false);
        for (var i = 0; i < types.length; i++) {
            if (top != undefined && top != null) {
                if (types[i] != bottom.Type)
                    addOptionToSelect($bottomAddCombo, types[i], true);
                else
                    break;
            }
            else
                addOptionToSelect($bottomAddCombo, types[i], true);
        }
        updateTextFormatAndVisibility();
        //$('#roundUpCombo option[value="' + gcOptions.RoundTimeEditsTo + '"]').prop('selected', true);
    }
    $currentHeadersList.change(function (event) {
        updateTextFormatAndVisibility();
    });
    // to update the timeline header format to the textbox.
    updateTextFormatAndVisibility = function () {
        var index = $currentHeadersList[0].selectedIndex;
        // if the header type is not selected in list box, we no need to enable the other element(header poperty changer)
        if (index != -1 && gcOptions.TimeScaleHeaders.length > 1) {
            $deleteSel.removeAttr("disabled");
            //$txtFormat.removeAttr("disabled");
            var selected = gcOptions.TimeScaleHeaders;
            //$txtFormat.val(selected.TextFormat);
        }
        else {
            $deleteSel.attr("disabled", "disabled");
            //$txtFormat.attr("disabled", "disabled");
        }
    }
    // to add/insert the selected time line header at the top.
    $topAddCombo.change(function () {
        var selectedIndex = $(this).attr("selectedIndex");
        if (selectedIndex <= 0)
            return;
        var header = createHeaderDefinition($(this).val());
        // inserting the new header.
        gcOptions.TimeScaleHeaders.insert(0, header);
        UpdateControls();
    });
    // to add the selected time line header at the bottom.
    $bottomAddCombo.change(function () {
        var selectedIndex = $(this).attr("selectedIndex");
        if (selectedIndex <= 0)
            return;
        var header = createHeaderDefinition($(this).val());
        gcOptions.TimeScaleHeaders.add(header);
        UpdateControls();
    });
    // create new header definition.
    createHeaderDefinition = function (type) {
        var header = new RadiantQ.Gantt.TimeScaleHeaderDefinition();
        header.Type = TimeScaleType[type];
        return header;
    }
    // to remove the selected timeline header form TimeScaleHeaders.

    $deleteSel.click(function () {
        var index = $currentHeadersList[0].selectedIndex;
        gcOptions.TimeScaleHeaders.remove(index);
        UpdateControls();
        updateTextFormatAndVisibility();
    });

    UpdateControls();
}
