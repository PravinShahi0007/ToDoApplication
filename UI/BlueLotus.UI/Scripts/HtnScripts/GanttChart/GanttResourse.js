function InjectGetAndSet(key, value) {
    if (key == "PrcsID") {
        var catchVal = value;   //parseInt(value);
        Object.defineProperty(this, key, {
            get: function () {
                return catchVal;
            },
            set: function (newValue) {
                if (newValue != catchVal) {
                    catchVal = newValue;
                    this.PropertyChanged.raise(this,
                {
                    PropertyName: key,
                    Value: newValue
                });
                }
            },
            enumerable: true,
            configurable: true
        });
    }
    if (key == "Qty") {
        var catchVal = parseInt(value);
        Object.defineProperty(this, key, {
            get: function () {
                return catchVal;
            },
            set: function (newValue) {
                if (newValue != catchVal) {
                    catchVal = newValue;

                    this.PropertyChanged.raise(this,
                {
                    PropertyName: key,
                    Value: newValue
                });
                }
            },
            enumerable: true,
            configurable: true
        });
    }
}
this.jsonData = null;
this.jsonResrData = null;
var self = this;
// Will load localized strings to be shown inside the gantt based on the current browser locale. You can add more localized string dictionaries if the default supported dictionaries don't suffice.
jQuery.i18n.properties({
    name: 'RQStrings',
    path: "../../../Src/ResourceStrings/",
    mode: 'both'
});

$.holdReady(true);
$.ajax({
    type: "GET",
    dataType: 'json',
    url: urlGetSelectProjectScheduleDetailsFrmResGant,//'/GanttChart/GetSelectProjectScheduleDetailsFrmResGant',//'@Url.Action("GetSelectProjectScheduleDetailsFrmResGant", "GanttChart")',
    converters:
    {
        "text json": function (data) {
            //                //console.log(data);
            return $.parseJSON(data, true
            /*converts date strings to date objects*/
            , true
            /*converts ISO dates to local dates*/
            );
        }
    },
    success: function (data) {
        self.jsonData = data;
        $.holdReady(false);
    }
});

$.holdReady(true);
$.ajax({
    type: "GET",
    dataType: 'json',
    data: { PrjKy: 281, PrcsDetKy: 1 },
    url: urlResourceDetails_Select,//'/GanttChart/ResourceDetails_Select',//'@Url.Action("ResourceDetails_Select", "GanttChart")',
    converters:
    {
        "text json": function (data) {
            //                //console.log(data);
            return $.parseJSON(data, true
            /*converts date strings to date objects*/
            , true
            /*converts ISO dates to local dates*/
            );
        }
    },
    success: function (data) {
        self.jsonResrData = data;
        $.holdReady(false);
    }
});

var $gantt_container, $flexyGantt_container1;
// SetViewHeight will be called by a containing sample browser, if any.
function SetViewHeight(height) {
    if ($gantt_container && $gantt_container.data("GanttControl")) {
        $gantt_container.data("GanttControl").setHeight(height / 2);
    }
    if ($flexyGantt_container1 && $flexyGantt_container1.data("FlexyGantt")) {
        $flexyGantt_container1.data("FlexyGantt").setHeight(height / 2);
    }
}

$(document).ready(function () {
    //var anchorTime = self.jsonData[0].StartTime.clone();
    var anchorTime = new Date().Date();
    var dt = Date.today();

    $.ui.editor.editors =
   {
       FGExpandableTextBox: function (input, options) {
           input.width(50);
           input.ExpandableTextBox({
               Converter: nameConverter,
               ConverterBack: function (value, flexyNodeData) {

                   // The grid calls this converter with flexyNodeData as a arg.
                   if (flexyNodeData)
                       data = flexyNodeData.Data();
                       // The grid calls this converter with flexyNodeData as a datacontext.
                   else
                       data = this.data;

                   if (data["ResourceName"])
                       data["ResourceName"] = value;
                   else
                       data["ActivityName"] = value;
               }
           })

           return input.data().ExpandableTextBox.widget()
       },
       taskidTextBox: function (input, options) {
           input.ExpandableTextBox({
               Converter: function (actview) {
                   return actview.Activity.DataSource.PrcsID
               },
               ConverterBack: function (value, actview) {
                   actview.Activity.DataSource.PrcsID = value;
               }
           });
           return input.data().ExpandableTextBox.widget();
       },
       expandableTextBox: function (input, options) {
           input.ExpandableTextBox({
               Converter: function (actview) {
                   return actview.Activity_M().ActivityName_M()
               },
               ConverterBack: function (value, actview) {
                   actview.Activity_M().ActivityName_M(value);
               }
           });
           return input.data().ExpandableTextBox.widget();
       },
       spinner: function (input, options) {
           input.width(50);
           return input.spinner(options).spinner("widget");
       },
       DateTimePicker: function (input, options) {
           input.width(150);
           return input.DateTimePicker(options).DateTimePicker("widget");
       },
       DatePicker: function (input, options) {
           input.width(150);
           return input.datepicker(options);
       },
       durationPicker: function (input, options) {
           input.width(80);
           return input.DurationPicker(options).DurationPicker("widget");
       },
       resourcePicker: function (input, options) {
           input.width(78);
           return input.ResourcePicker(options).ResourcePicker("widget");
       }
   }

    try {
        for (var i = 0; i < testData.length; i++) {
            InjectGetAndSet.call(testData[i], "PrcsID", testData[i]["PrcsID"]);
            InjectGetAndSet.call(testData[i], "Qty", testData[i]["Qty"]);
        }
        anchorTime = testData[0].StartTime.clone();
    }
    catch (e)
    {
        anchorTime = new Date().Date();
    }

    setupScrollSync = function (elements) {
        elements.scroll(function () {
            var left = $(this).scrollLeft();
            var top = $(this).scrollTop();
            elements.each(function () {
                if ($(this).scrollLeft() != left)
                    $(this).scrollLeft(left);
            });
        });
    }

    setupResizeSync = function (elements) {
        elements.bind("layout.onresize", function () {
            var size = $(this).data("layout").state.west.size;
            elements.each(function () {
                if ($(this).data("layout").state.west.size != size)
                    $(this).data("layout").sizePane("west", size)
            });
        });
    }

    function templateInnerCallBack(tr, boundedObject) {
        var shortDateFormat = 'dd/MM/yyyy';//Date.CultureInfo.formatPatterns.rfc1123;
        //var shortDateFormat = Date.CultureInfo.formatPatterns.shortDate + ' hh:mm:ss';
        var data = boundedObject;

        var $endTimeCol = tr.find("div.rq-grid-endTimeCol"), $startTimeCol = tr.find("div.rq-grid-startTimeCol");
        $endTimeCol[0]["alreadyBound"] = true;
        $startTimeCol[0]["alreadyBound"] = true;
        var $startTimeCol = $("div.rq-grid-startTimeCol", tr);
        ToDateString = {
            Convert: function (value, src, tar) {
                return value.toString(shortDateFormat);
            }
        }
        if ($startTimeCol.length == 1 && $startTimeCol[0].Dispose == null) {
            $startTimeCol.BindCellToData({
                PropName: "StartTime",
                Source: data.Activity,
                Converter: ToDateString
            });
        }
        var $endTimeCol = $("div.rq-grid-endTimeCol", tr);
        if ($endTimeCol.length == 1 && $endTimeCol[0].Dispose == null) {
            $endTimeCol.BindCellToData({
                PropName: "EndTime",
                Source: data.Activity,
                Converter: ToDateString
            });
        }

        var $prioritycolumn = $("div.rq-grid-prcsidCol", tr);
        if ($prioritycolumn.length == 1) {
            $prioritycolumn.BindCellToData({
                PropName: "PrcsID",
                Source: data.Activity.DataSource,
                //Converter: PriorityToTxttConverter,

            });
        }

        var $qtycolumn = $("div.rq-grid-qtyCol", tr);
        if ($qtycolumn.length == 1) {
            $qtycolumn.BindCellToData({
                PropName: "Qty",
                Source: data.Activity.DataSource,
                //Converter: PriorityToTxttConverter,

            });
        }

        var $prcsdetkycolumn = $("div.rq-grid-prcsdetkyCol", tr);
        if ($prcsdetkycolumn.length == 1) {
            $prcsdetkycolumn.BindCellToData({
                PropName: "PrcsDetKy",
                Source: data.Activity.DataSource,
                //Converter: PriorityToTxttConverter,

            });
        }

        templateCallBack(tr, data);
    }


    var resources = self.jsonResrData;

    var effortConverter = {
        Convert: function (value, parameter) {
            var task = parameter;
            return effortConverter.GetTaskEffort(task);
        },
        ConvertBack: function (value, parameter) {
            // Compute EndTime based on StartTime and Effort.
            var duration = value;
            var task = parameter;
            // Note that "WorkTimeSchedule.Schedule8X5" is the same schdule used by the GanttControl
            // in this app. If you use a different schedule in the GanttControl, use that same schedule here as well:
            return RadiantQ.Gantt.WorkTimeSchedule.Schedule8X5.GetEnd(task.StartTime, duration);
        },
        GetTaskEffort: function (task) {
            // Note that "WorkTimeSchedule.Schedule8X5" is the same schdule used by the GanttControl
            // in this app. If you use a different schedule in the GanttControl, use that same schedule here as well:
            if (task.StartTime && task.EndTime) {
                if (task.StartTime && task.EndTime)
                    return RadiantQ.Gantt.WorkTimeSchedule.Schedule8X5.GetEffort(task.StartTime, task.EndTime);
            }
            return RQTimeSpan.Zero;
        }
    };

    // Always sort by SortOrder before binding it to the gantt.
    self.jsonData.sort(function (a, b) { return a.SortOrder - b.SortOrder });

    var ganttControl, $ganttChart,
    flexyGantt;
    //<--- First gantt start->
    $gantt_container = null, $ganttChart1;
    $gantt_container = $('#gantt_container');
    $gantt_container.GanttControl({
        ProjectStartDate: anchorTime,
        DataSource: self.jsonData,
        ResourceItemsSource: resources,
        GanttTableRowLoadedCallBack: templateInnerCallBack,
        IDBinding: { Property: "ID" },
        //PrcsIDBinding: { Property: "PrcsID" },
        NameBinding: { Property: "Name" },
        IndentLevelBinding: { Property: "IndentLevel" },
        StartTimeBinding: { Property: "StartTime" },
        //EffortBinding: { Property: "Effort" },    /// cool code by me
        EffortBinding: { Property: "EndTime", Converter: effortConverter },     /// cool code by me , Converter: effortConverter
        PredecessorIndicesBinding: { Property: "PredecessorIndices" },
        ProgressPercentBinding: { Property: "ProgressPercent" },
        ResourceIDBinding:
        {
            Property: "ResourceID"
        },
        ResourceNameBinding:
        {
            Property: "ResourceName"
        },
        TablePanelWidth: 500,
        GanttTable: $('#ganttTable'),
        GanttChartTemplateApplied: function (sender) {
            $ganttChart = $gantt_container.data("GanttControl").GetGanttChart();
            $ganttChart.GanttChart({ AnchorTime: anchorTime });
        }
    });
    //To call open dialog function from BaseLineAndTaskEditingPopup.js
    //CreateTaskEditingDiaglog();

    // To update the Gantt Width & Height based on SampleBrowser, if any.
    if (window.parent && window.parent.FitToWindow)
        window.parent.FitToWindow();

    ganttControl = $gantt_container.data("GanttControl");
    //<--- First gantt end->

    var model = ganttControl.Model;
    var tr = model.GetResourceActivityList(resources[0]);
    for (var i = 0; i < resources.length; i++) {

        var resource = resources[i];
        resource["Tasks"] = model.GetResourceActivityList(resource);

    }
    //<--- second gantt start->
    var $ganttChart1
    // The template that defines the look for the task bars. "rq-gc-taskbar" is a built-in style that defines a default look for the task bars.
    var tTemplate = "<div class='rq-gc-taskbar'></div>";
    $flexyGantt_container1 = $('#flexyGantt_container1');
    $flexyGantt_container1.FlexyGantt({
        GanttTable: $("#flexyTable"),
        //the FlexyGantt is bound to  resolve the hierarchy of Team/Resources/Tasks.
        resolverFunction: function (data) {
            return null;
        },
        GanttChartTemplateApplied: function (sender) {
            $ganttChart1 = ($flexyGantt_container1.data("FlexyGantt") || $flexyGantt_container1.data("radiantqFlexyGantt")).GetGanttChart();
            $ganttChart1.GanttChart({ AnchorTime: anchorTime });
        },
        TaskStartTimeProperty: "StartTime",
        GanttTableRowLoadedCallBack: FGtemplateCallBack,
        TaskItemTemplate: tTemplate,
        TablePanelWidth: 500,
        TaskEndTimeProperty: "EndTime",
        TasksListProperty: "Tasks",
        TaskTooltipTemplate: $("#TaskTooltipTemplate")
    });

    // To update the Gantt Width & Height based on SampleBrowser, if any.
    if (window.parent && window.parent.FitToWindow)
        window.parent.FitToWindow();

    $flexyGantt_container1.FlexyGantt({ DataSource: resources });
    flexyGantt = ($flexyGantt_container1.data("FlexyGantt") || $flexyGantt_container1.data("radiantqFlexyGantt"));

    var ganttChart = $ganttChart.data("GanttChart");
    var ganttChart1 = $ganttChart1.data("GanttChart") || $ganttChart1.data("radiantqGanttChart");
    $ganttChart1.bind("ganttchartanchortimechanged", function () {
        if (!ganttChart1.options.AnchorTime.equals(ganttChart.options.AnchorTime)) {
            $ganttChart.GanttChart({
                AnchorTime: ganttChart1.options.AnchorTime
            });
        }
    });

    var $table = flexyGantt.options.GanttTable;
    $table.gridEditor({
        //Triggers when editing start.
        start: function (event, ui) {
            if (ui.property == "Effort") {
                ui.input.val(ui.data.Activity.Effort.getTotalHours() / 8);
                return false;
            }

            if (ui.property == "DataSource.PrcsID") {
                var prcsid = ui.data.Activity.DataSource["PrcsID"];
                ui.input.val(prcsid);
                //return false;
            }
            if (ui.property == "DataSource.Qty") {
                var qty = ui.data.Activity.DataSource["Qty"];
                //var prioritytxt = PriorityToTxttConverter.Convert(priority, null, null);
                ui.input.val(qty);
                //return false;
            }
            //return false;
            /*To prevent default action, default action, set the value to the textbox base on column name*/

        },
        submit: function (event, ui) {
            var activity = ui.data.Activity;
            //By default effort will update automatically,here we need to customize the effort string, so we are updating the effort manually, this will trigger the binding(line:182).
            //and update update the table with customized effort string.
            if (ui.property == "Effort") {
                ui.data.Activity["Effort"] = new RQTimeSpan(0, ui.value * 8, 0, 0, 0);
                return false;
            }

            if (ui.property == "EndTime") {
                // This edited date has 12AM in the time which would get pushed back to the previous day's 4PM,
                // to prevent this we add 1 day, then the gantt will adjust it back to 4PM of the day the user selected.
                // This above happens for the 8X5 schedule.
                if (activity.Effort != RQTimeSpan.Zero || new Date(ui.value) != activity.StartTime) {
                    activity.EndTime = new Date(ui.value).addDays(1);
                }
                return false;
            }

            if (ui.property == "DataSource.PrcsID") {
                ui.data.Activity.DataSource["PrcsID"] = ui.value;   //PriorityToTxttConverter.ConvertBack(ui.value, null, null);
                //return false;
            }
            if (ui.property == "DataSource.Qty") {
                ui.data.Activity.DataSource["Qty"] = ui.value;   //PriorityToTxttConverter.ConvertBack(ui.value, null, null);
                //return false;
            }
            // return false; to discard changes.
        }
    });

    var $levelStartTime = $("#levelStartTime");
    var $chxIncludeCompleteingTasks = $("#chxIncludeCompleteingTasks");
    $levelStartTime.datepicker().datepicker('setDate', dt);
    var ganttControl = $gantt_container.data("GanttControl") || $gantt_container.data("radiantqGanttControl");


    var $table = ganttControl.options.GanttTable;
    $table.gridEditor({
        //Triggers when editing start.
        start: function (event, ui) {
            //return false;  /*To prevent default action, default action, set the value to the textbox base on column name*/
        },
        submit: function (event, ui) {
            // return false; to discard changes.
        }
    });

    //2014/11/09
    // to level the resource.
    $("#levelResources").click(function () {
        ganttControl.LevelResources($chxIncludeCompleteingTasks.prop("checked") == true, $levelStartTime.datepicker("getDate"));
    });
    // to change the start time in datasource's tasks , it will reflect in gantt
    resetStartDate = function () {
        var activityViews = ganttControl.ActivityViews;
        for (var i = 0; i < activityViews.length; i++) {
            var activity = activityViews[i].Activity_M();
            activity.StartTime_M(dt);
        }
    }
    $("#reset").click(function () {
        resetStartDate();
    });
    //////////////////////////////////////////////////

    //To listen the  gantt_container AnchorTime changes,to update the flexyGantt_container1
    $ganttChart.bind("ganttchartanchortimechanged", function () {
        if (!ganttChart1.options.AnchorTime.equals(ganttChart.options.AnchorTime)) {
            $ganttChart1.GanttChart({
                AnchorTime: ganttChart.options.AnchorTime
            });
        }
    });
    //To listen the  flexyGantt_container1 BaseTimeUnitWidth changes,to update the gantt_container 
    $flexyGantt_container1.bind("flexyganttzoomed", function () {
        if (flexyGantt.options.BaseTimeUnitWidth != ganttControl.options.BaseTimeUnitWidth) {
            $gantt_container.GanttControl({
                BaseTimeUnitWidth: flexyGantt.options.BaseTimeUnitWidth
            });
        }
    });
    //To listen the  gantt_container BaseTimeUnitWidth changes,to update the flexyGantt_container1 
    $gantt_container.bind("ganttcontrolzoomed", function () {
        if (flexyGantt.options.BaseTimeUnitWidth != ganttControl.options.BaseTimeUnitWidth) {
            $flexyGantt_container1.FlexyGantt({
                BaseTimeUnitWidth: ganttControl.options.BaseTimeUnitWidth
            });
        }
    });
    var ganttChart_Scrollviewer = ganttChart.GetScrollableElement();
    var ganttChart1_Scrollviewer = ganttChart1.GetScrollableElement();
    // to sync the two ganttcharts horizontal scroll
    setupScrollSync(ganttChart_Scrollviewer.add(ganttChart1_Scrollviewer));
    var layout = ganttControl.GetLayoutElement();
    var layout1 = flexyGantt.GetLayoutElement();
    // to sync the splitter.
    setupResizeSync(layout.add(layout1));
});
// to get the name from the bounded list
function nameConverter(flexyNodeData) {
    var data;
    // The grid calls this converter with flexyNodeData as a arg.
    if (flexyNodeData)
        data = flexyNodeData.Data();
        // The grid calls this converter with flexyNodeData as a datacontext.
    else
        data = this.data;

    if (data["ResourceName"])
        return data["ResourceName"];
    else
        return data["ActivityName"];
};
// to get the short time format.
var toolTipDateformat = Date.CultureInfo.formatPatterns.shortDate + '  ' + "HH:mm:ss";
function startTimeTooltipConverter() {
    if (this.data["StartTime"])
        return this.data["StartTime"].toString(toolTipDateformat);

    return null;
}

function endTimeTooltipConverter() {
    if (this.data["EndTime"])
        return this.data["EndTime"].toString(toolTipDateformat);

    return null;
}
// called while creating the FlexyTable row.
function FGtemplateCallBack(tr) {
    $("div.rq-grid-nameCol", tr).ExpandableTextBlock({
        Converter: nameConverter
    });
}
