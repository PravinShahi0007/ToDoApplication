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
jQuery.i18n.properties({
    name: 'RQStrings',
    path: "/Src/ResourceStrings/",
    mode: 'both'
});
(function () {
    var log = [], index = {}, first, last;
    // Accumulate seconds for the specified message.
    // Each message string has its own total seconds.
    function add(message, seconds) {
        var i = index[message];
        if (i == null) {
            i = log.length;
            index[message] = i;
            log[i] =
        {
            message: message, seconds: 0
        };
        }
        log[i].seconds += seconds;
    }
    time = function (message, since) {
        var now = +new Date;
        add(message, (now - (since || last)) / 1000);
        return last = +new Date;
    }
    time.done = function () {
        time('total', first);
        for (var i = 0; i < log.length; i++) {
            var item = log[i];
            //console.log(item.seconds.toFixed(3) + ': ' + item.message)
        }
    };
    first = last = +new Date;
})();
(function ($) {
    $.ui.editor.editors =
    {
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
                    return actview.Activity.ActivityName
                },
                ConverterBack: function (value, actview) {
                    actview.Activity.ActivityName = value;
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
    };
})(jQuery);

function GetDataSourceFromFindSp(prjky) {
    var $gantt_container = $('#gantt_container');
    $gantt_container.GanttControl({
        DataSource: null
    });

    $.holdReady(true);
    $.ajax({
        type: "GET",
        dataType: 'json',
        data: { Prjky: prjky },
        url: urlGetProjectSchedule_Find,//'/GanttChart/GetProjectSchedule_Find',//'@Url.Action("GetProjectSchedule_Find", "GanttChart")',
        converters:
    {
        "text json": function (data) {
            return $.parseJSON(data, true
            /*converts date strings to date objects*/
            , true
            /*converts ISO dates to local dates*/
            );
        }
    },
        success: function (VersrnData) {
            tempPrjKy = VersrnData[0].PrjKy;
            tempVersrnData = VersrnData;
            //if (VersrnData.length < 1) {
            //    alert("No Sch .. !");
            //}
            //else if (VersrnData.length == 1) {
            //    tempPrcsSchKy = VersrnData[0].PrcsSchKy;
            //    $("#OrderSelectWindow").hide();
            //    //GetDataSource( prjky )
            //    goDrillGrid(tempPrjKy, tempPrcsSchKy, 0);
            //    newtempVersrnData.push(VersrnData[0]);
            //}
            //else {
                $("#saveAsSelect").hide();
                $("#OrderSelectWindow").show();
                var viewModel = kendo.observable({
                    projects: VersrnData//ProjectCostSchVarienceDly_DB_Data
                    ,
                    change: function (arg) {
                        tempPrcsSchKy = arg.sender.dataItem(arg.sender.select()).PrcsSchKy;
                        for (j = 0; j < newtempVersrnData.length; j++)
                            newtempVersrnData.remove(j);
                        for (i = 0; i < VersrnData.length; i++)
                            if (VersrnData[i].PrcsSchKy == tempPrcsSchKy)
                                newtempVersrnData.push(VersrnData[i]);
                        goDrillGrid(tempPrjKy, tempPrcsSchKy, 0);
                    }
                });
                kendo.bind($("#example"), viewModel);
            //}
            $.holdReady(false);
        }
    });

}


this.jsonResrData = null;
var self = this;

function changeDateFormat(datePicker) {
    var day1 = $(datePicker).datepicker('getDate').getDate();
    var month1 = $(datePicker).datepicker('getDate').getMonth() + 1;
    var year1 = $(datePicker).datepicker('getDate').getFullYear();
    var fullDate = year1 + "-" + month1 + "-" + day1;
    return fullDate;
}

function goDrillGrid(PrjKy, PrcsSchKy, IsShowBaseLine) {
    $("#OrderSelectWindow").hide();

    $.holdReady(true);
    $.ajax({
        type: "GET",
        dataType: 'json',
        data: { PageNo: $("#idPageNo").val(), PageSize: $("#idPageSize option:selected").val(), PrjKy: PrjKy, PrcsSchKy: PrcsSchKy, IsShowBaseLine: IsShowBaseLine, ObjKy: $("#cmbRptSelect").data('kendoComboBox').value(), FrmDt: changeDateFormat("#frmDt"), ToDt: changeDateFormat("#toDt") },
        url: urlGetSelectProjectScheduleDetails,//'/GanttChart/GetSelectProjectScheduleDetails',//'@Url.Action("GetSelectProjectScheduleDetails", "GanttChart")',
        converters:
    {
        "text json": function (data) {
            return $.parseJSON(data, true
            /*converts date strings to date objects*/
            , true
            /*converts ISO dates to local dates*/
            );
        }
    },
        success: function (data) {
            LoadDataSource(data);
            //testData = data;
            $.holdReady(false);
        }
    });
}

function LoadDataSource(testData) {
    //var tTemplate = "<div class='rq-gc-taskbar' style=\"background-image:{{html UpdateBackgroundColorBinding()}} !important; border-color:{{html UpdateBorderColorBinding()}} !important\"></div>";
    var $gantt_container = $('#gantt_container');
    var that = this;
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

    //var resources = self.jsonResrData;
    $gantt_container.GanttControl({
        DataSource: testData
        //TaskBarBrowseToCueLeftTemplate: "<button></button>",
        //TaskBarBrowseToCueRightTemplate: "<button></button>"
    });


    //ganttControl = $gantt_container.data( "GanttControl" );
    //var model = ganttControl.Model;
    ////var tr = model.GetResourceActivityList( resources[0] );
    //for ( var i = 0; i < resources.length; i++ )
    //{
    //    var resource = resources[i];
    //    resource["Tasks"] = model.GetResourceActivityList( resource );
    //}


    // 2014 10 11
    if (window.parent && window.parent.FitToWindow)
        window.parent.FitToWindow();

    ganttControl = $gantt_container.data("GanttControl") || $gantt_container.data("radiantqGanttControl");
    var $table = ganttControl.options.GanttTable;
    //---------------

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
            //return false;  /*To prevent default action, default action, set the value to the textbox base on column name*/
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
        },
        IsProjectGantt: true
    });

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

// for critical path
var CriticalPathActivities = new Array();
var criSelectedGantt1 = null;

var ganttControl = null;//$
var gantt_container = null;//$
//var ActivityUpdated;
var selectedGantt1 = null;
var selectedGantt = null;   //for print by cool coder

//To cache the newly added task objects.
var addedTasks = new RadiantQ.Gantt.Dictionary();
//To cache the Id of the removed tasks
var removedTaskIds = [];
//To cache the updated task objects. 
var updatedTasks = new RadiantQ.Gantt.Dictionary();

var calData = new Array();

var tempVersrnData = new Array();
var newtempVersrnData = new Array();
var tempPrcsSchKy = 0;
var tempSchDt = null;
var tempDocNo = null;
var tempPrjKy = 1;
//var tempIsBaseline = 0;
var tempIsDefault = 0;
var testData = new Array();
var jsonData = new Array();
var anchorTime = new Date().Date();
var tTemplate = "<div class='rq-gc-taskbar' style=\"background-image:{{html UpdateBackgroundColorBinding()}} !important; border-color:{{html UpdateBorderColorBinding()}} !important\"></div>";

var self = this;

// SetViewHeight will be called by a containing sample browser, if any.
function SetViewHeight(height) {
    if ($gantt_container && $gantt_container.data("GanttControl")) {
        $gantt_container.data("GanttControl").setHeight(height);
    }
}

$(document).ready(function () {
    //var idWidth = 25;
    //document.getElementById('Id').style.width = idWidth + "px";
    $.holdReady(true);
    $.ajax({
        type: "GET",
        dataType: 'json',
        data: { ObjCd: 'GanttTable' },
        url: urlGetColumnDataSources,//'/AddColumn/GetColumnDataSources',//'@Url.Action("GetColumnDataSources", "AddColumn")',
        converters:
    {
        "text json": function (data) {
            return $.parseJSON(data, true
            /*converts date strings to date objects*/
            , true
            /*converts ISO dates to local dates*/
            );
        }
    },
        success: function (data) {
            //LoadDataSource(data);
            for (objcd = 0; objcd < data.length; objcd++) {
                document.getElementById(data[objcd].ChildObjNm).style.width = data[objcd].ColWidth + "px";
            }
            //testData = data;
            $.holdReady(false);
            LoadHoldReady();
        }
    });

});

function LoadHoldReady() {

    // create DatePicker from input HTML element
    $("#datepicker").kendoDatePicker();
    $("#saveAsSelect").hide();
    $("#OrderSelectWindow").hide();
    $("#timeline").hide();
    LoadCombo();
    testData = null;
    $gantt_container = $('#gantt_container');

    var tmshs = new RadiantQ.Gantt.TimeScaleHeaderDefinitions();
    // 2014 10 11
    var weekHeader = self.weekHeaderLine()
    var yearHeader = self.yearHeaderLine()
    var monthHeader = self.monthHeaderLine()
    var daysHeader = self.dayHeaderLine();
    tmshs.add(yearHeader);
    tmshs.add(monthHeader);
    tmshs.add(daysHeader);

    var projectStart = anchorTime.clone()
    var SpecialLineInfos = new ObservableCollection();
    var deadLine = new RadiantQ.Gantt.SpecialLineInfo()
    deadLine.LineDateTime = anchorTime.clone().addDays(20);
    deadLine.ToolTipText = 'DeadLine';
    deadLine.LineColor = 'green';
    SpecialLineInfos.add(deadLine);
    //-------------


    //var tTemplate = "<div class='rq-gc-taskbar' style=\"background-image:{{html UpdateBackgroundColorBinding()}} !important; border-color:{{html UpdateBorderColorBinding()}} !important\"></div>";
    var $gantt_container = $('#gantt_container');
    //// cool code by me for convert endtime to effort
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

    var $schedule = $("#cmbCalNm").change(function (newChoice) {
        //GetCalDataSource(value);
        saveUpdateFunction();
        assDate(this.value);
    });

    var $schedule = $("#cmbPrjChartTyp").change(function (newChoice) {
        $("#btnSaveAsSave").hide();
    });

    //------------ 08/10/2014
    var backGroundBaseLineTemplate = "<div class='backgroundBaseline-style' style='width: {{html widthConverter()}}; margin:{{html leftConverter()}}' title='{{html baseLineTooltip()}}'></div>";
    var adornerBaselineBaseLineTemplate = '<div class="AdornerBaseline-style" style="width: {{html widthConverter()}}; margin:{{html leftConverter()}}" title="{{html baseLineTooltip()}}"></div>';

    var resources = self.jsonResrData;

    //////// cool code by me
    $gantt_container.GanttControl({
        ProjectStartDate: anchorTime,
        DataSource: testData,   //testData,   //self.jsonData,
        ResourceItemsSource: resources, //self.jsonResrData,
        RoundTimeEditsTo: RadiantQ.Gantt.RoundToOptions.Day,
        TimeRangeHighlightBehavior: RadiantQ.Gantt.TimeRangeHighlightBehavior.HighlightInChartOnHeaderMouseHover,
        TimeScaleHeaders: tmshs,
        TaskItemTemplate: tTemplate,    // for critical path
        GanttTableRowLoadedCallBack: templateInnerCallBack,

        // taskCue
        TaskBarBrowseToCueLeftTemplate: "<button></button>",
        TaskBarBrowseToCueRightTemplate: "<button></button>",


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
        DescriptionBinding: { Property: "Description" },

        //----------- 08/10/2014

        //TaskBarAdornerTemplate: adornerBaselineBaseLineTemplate,
        TaskBarBackgroundTemplate: backGroundBaseLineTemplate,
        TaskItemTemplate: "<div class='taskbar-style'></div>",
        ProgressBarTemplate: "<div class='rq-gc-progressbar'></div>",

        //----------
        // 2014 10 11
        SpecialLineInfos: SpecialLineInfos,
        //---------------

        WorkTimeSchedule: getSelectedSchedule($schedule.val()),
        GanttTable: $('#ganttTable'),
        CanInsertPropertyChangeTriggeringPropertiesInData: true,
        GanttChartTemplateApplied: function (sender) {
            // edit by cool coder for print
            selectedGantt = ($gantt_container.data("GanttControl") || $gantt_container.data("radiantqGanttControl")).GetGanttChart();
            //var $GanttChart = ($gantt_container.data("GanttControl") || $gantt_container.data("radiantqGanttControl")).GetGanttChart();  //selectedGantt.GetGanttChart();
            //$GanttChart.GanttChart({ AnchorTime: anchorTime });

            var ganttInstance = $gantt_container.data("GanttControl");
            //Update the selected gantt.
            selectedGantt1 = ganttInstance;

            // 2014 11 10
            //var $GanttChart = $gantt_container.data( "GanttControl" ).GetGanttChart();
            var $GanttChart = ($gantt_container.data("GanttControl") || $gantt_container.data("radiantqGanttControl")).GetGanttChart();
            $GanttChart.GanttChart({ AnchorTime: anchorTime, ViewWidth: 2000, ResizeToFit: false, });
            //---------------
        }

    });
    var gantt = ($gantt_container.data("GanttControl") || $gantt_container.data("radiantqGanttControl"));

    $("#addRow").click(function () {
        var newTask = getNewTask();
        ganttControl.AddNewItem(newTask);
        addedTasks.Add(newTask.ID, newTask);
        return false;
    });
    // Insert new item as sibling below to the selected task.
    $("#InsertNewItemAsSiblingBelow").click(function () {
        var activity = ganttControl.SelectedActivity;
        if (activity) {
            var newTask = getNewTask();
            ganttControl.InsertNewItemAsSiblingBelow(newTask, ganttControl.SelectedIndex, true);
            addedTasks.Add(newTask.ID, newTask);
            return false;
        }
        else
            alert("Please select an item in the table first.");
    });
    // Insert a child to a selected task.
    $("#InsertNewItemAsChildOf").click(function () {
        var activity = ganttControl.SelectedActivity;
        if (activity) {
            var newTask = getNewTask();
            ganttControl.InsertNewItemAsChildOf(newTask, ganttControl.SelectedIndex, true);
            addedTasks.Add(newTask.ID, newTask);
            return false;
        }
        else
            alert("Please select an item in the table first.");
    });
    // To remove the selected task.
    $("#remove").click(function () {
        var activitys = null;
        var activity = gantt.SelectedActivity;
        if (activity) {
            var ganttItemSource = gantt.options.DataSource;
            activitys = gantt.RemoveActivity(activity.ID);
            for (var i = 0; i < activitys.length; i++) {
                var boundData = activitys[i].DataSource;
                cacheRemovedTask(boundData.ID);
                ganttItemSource.splice(ganttItemSource.indexOf(boundData), 1);
            }
        }
        else
            alert("Please select an item in the table first.");
    });
    // Indent the selected task, to make it as a child.
    $("#indent").click(function () {
        var activityview = ganttControl.SelectedItem;
        if (activityview)
            ganttControl.Indent(activityview);
        else
            alert("Please select an item in the table first.");
        return false;
    });
    // Outdent the selected task.
    $("#outdent").click(function () {
        var activityview = ganttControl.SelectedItem;
        if (activityview)
            ganttControl.Outdent(activityview);
        else
            alert("Please select an item in the table first.");
        return false;
    });
    // To move the row.
    $("#moveup").click(function () {
        var table = ganttControl.GetGanttTable();
        if (ganttControl.SelectedIndex != -1)
            table.MoveRows(ganttControl.SelectedIndex, 1, ganttControl.SelectedIndex - 2);
        else
            alert("Please select an item in the table first.");
        return false;
    });
    // To move the row.
    $("#movedown").click(function () {
        var table = ganttControl.GetGanttTable();
        var selItem = ganttControl.SelectedItem;
        if (selItem != null) {
            var selIndex = ganttControl.SelectedIndex;
            if (selIndex > -1) {
                // This will adjust the selections to include children, etc.
                // This also will ensure that you don't move a parent inbetween the children which will cause MoveRows to crash.
                table.OnBeforeDragStart(selIndex, 1);
                var selCount = ganttControl.SelectedItems.length;

                table.MoveRows(selIndex, selCount, selIndex + selCount);
            }
        }
        else
            alert("Please select an item in the table first.");

        return false;
    });
    //To generate the json from the gantt's DataSource 
    $("#exportToJSON").click(function () {
        var jsonObject = ganttControl.options.DataSource;
        //Specify field, want to export.
        alert(JSON.stringify(jsonObject, ["ID", "Name", "StartTime", "Effort", "Description", "IndentLevel", "Resources", "PredecessorIndices", "ProgressPercent"]));
    });

    saveUpdateFunction = function () {
        $.ajax({
            type: "POST",
            url: urlSetTaskData,//'/GanttChart/SetTaskData',//'@Url.Action("SetTaskData", "GanttChart")',
            dataType: "json",
            data: { addedTasks: JSON.stringify(addedTasks.asArray), removedTaskIds: JSON.stringify(removedTaskIds), updatedTasks: JSON.stringify(updatedTasks.asArray) },
            async: false
        });
        alert("Data is updated!");
        addedTasks = new RadiantQ.Gantt.Dictionary();
        removedTaskIds = [];
        updatedTasks = new RadiantQ.Gantt.Dictionary();
    }

    //To save the update and removed and added tasks in server.
    $("#save").click(function () {
        saveUpdateFunction();
    });

    $("#SaveAs").click(function () {
        $("#OrderSelectWindow").hide();
        $("#saveAsSelect").show();
        $("#btnSaveAsSave").show();

        var viewModelSaveAs = kendo.observable({
            projectsSaveAs: newtempVersrnData//ProjectCostSchVarienceDly_DB_Data
        });
        kendo.bind($("#exampleSaveAs"), viewModelSaveAs);

        var viewModelDatePicker = kendo.observable({
            selectedDate: null,
            isEnabled: true,
            isVisible: true,
            onChange: function () {
                tempSchDt = kendo.toString(this.get("selectedDate"), 'd');
            }
        });
        kendo.bind($("#exampleDatePicker"), viewModelDatePicker);

        var viewModelDocNo = kendo.observable({
            phoneNumber: null,
            isEnabled: true,
            isVisible: true,
            onChange: function () {
                tempDocNo = this.get("docNo");
            }
        });

        kendo.bind($("#exampleDocNo"), viewModelDocNo);

        var viewModelIsBalseline = kendo.observable({
            isChecked: false
        });
        kendo.bind($("#IsBaseline"), viewModelIsBalseline);

        var viewModelIsDefault = kendo.observable({
            isChecked: false
        });
        kendo.bind($("#IsDefault"), viewModelIsDefault);

    });

    $('#IsDefault').change(function () {
        if (this.checked) {
            tempIsDefault = 1;
        } else {
            tempIsDefault = 0;
        }
    });

    // to print
    var $dialogDiv = $("#dialogDiv");
    $dialogDiv.ganttPrintDialog({
        autoOpen: false,
        width: 350,
        modal: true,
        buttons: {
            "Print": function () {
                var options = $(this).ganttPrintDialog("getSelectedOptions");
                selectedGantt1.Print(options);
                //selectedGantt.Print({ Title: "Gantt Printing", VisibleColumnIndices: [0, 1, 2, 3], ViewStartTime: new Date(2013, 7, 19), ViewEndTime: new Date(2013, 8, 30) });
                $(this).ganttPrintDialog("close");
            },
            "ExportToImage": function () {
                var options = $(this).ganttPrintDialog("getSelectedOptions");
                selectedGantt1.ExportToImage(options);
                //selectedGantt.Print({Title:"Gantt Printing", VisibleColumnIndices: [0, 1, 2, 3], ViewStartTime: new Date(2013, 7, 19), ViewEndTime: new Date(2013, 8, 30)});
                $(this).ganttPrintDialog("close");
            }
        }
    });

    $("#print").click(function () {
        selectedGantt1.Print();
    });
    $("#export").click(function () {
        selectedGantt1.ExportToImage();
    });
    $("#ChartPrint").click(function () {
        selectedGantt1.Print({ IsGridVisible: false });
    });
    $("#ChartExport").click(function () {
        selectedGantt1.ExportToImage({ IsGridVisible: false });
    });
    $("#printOptions").click(function () {
        $dialogDiv.ganttPrintDialog("open", selectedGantt1);
    });

    // to return a new task object.
    getNewTask = function () {
        return {
            "Name": "New Task ",
            "ID": gantt.Model.GetNewID(),
            "Qty": "1",
            "PrcsID": "1",
            "StartTime": new Date("2014-02-02T00:00:00Z"),
            "Effort": new RQTimeSpan(0, 12, 30, 0, 0),
            "ProgressPercent": 50,
            "Description": "Description of Task"
        };
    }

    $table = $("#ganttTable");
    $table.dblclick(function (event) {
        //To get hold of double clicked row.
        var $tr = $(event.target).closest("tr");
        activityView = $tr[0]["data-grid-item"];
        activityName = activityView.Activity;
        //alert( activityName.DataSource.PrcsDetKy );
        $.holdReady(true);
        $.ajax({
            type: "GET",
            dataType: 'json',
            data: { PrjKy: tempPrjKy, PrcsDetKy: activityName.DataSource.PrcsDetKy },
            url: urlProjectResourceDetails_Select,//'/GanttChart/ProjectResourceDetails_Select',//'@Url.Action("ProjectResourceDetails_Select", "GanttChart")',
            converters:
            {
                "text json": function (data) {
                    return $.parseJSON(data, true
                    /*converts date strings to date objects*/
                    , true
                    /*converts ISO dates to local dates*/
                    );
                }
            },
            success: function (data) {
                var viewModelProjectResourceDetails = kendo.observable({
                    projectsProjectResourceDetails: data//ProjectCostSchVarienceDly_DB_Data
                });
                kendo.bind($("#exampleProjectResourceDetails"), viewModelProjectResourceDetails);

                $("#ganttTableDblClick").show().kendoWindow({
                    width: "800px",
                    height: "550px",
                    modal: true,
                    title: "ProjectResourceDetails"
                });

                $('#ganttTableDblClick').data('kendoWindow').center().open();
                $.holdReady(false);
            }
        });
    });

    cacheRemovedTask = function (removedTaskID) {
        removedTaskIds.push(removedTaskID);
        //To remove the removed task from addedTasks list
        if (addedTasks.Contains(removedTaskID))
            addedTasks.Remove(removedTaskID);
        //To remove the removed task from updatedTasks list
        if (updatedTasks.Contains(removedTaskID))
            updatedTasks.Remove(removedTaskID);
    }


    //----------------------------------------------------------------------------------------------------------------------------------------------
    //----------------------------------------------------------------------------------------------------------------------------------------------
    // to reload the gantt with selected Schedule.
    function updateGantt(data, schedule) {
        // First set the source to null and then set the new source.
        $gantt_container.GanttControl("option", "DataSource", null);
        $gantt_container.GanttControl({
            WorkTimeSchedule: schedule,
            DataSource: data
        });
    }

    function assDate(CalTypKy) {
        $.holdReady(true);
        var CalTypKy = CalTypKy;//9219;
        $.ajax({
            type: "GET",
            dataType: 'json',
            data: { CalTypKy: CalTypKy },
            url: urlGetCalDate,//'/GanttChart/GetCalDate',//'@Url.Action("GetCalDate", "GanttChart")',
            converters:
            {
                "text json": function (data) {
                    return $.parseJSON(data, true
                    /*converts date strings to date objects*/
                    , true
                    /*converts ISO dates to local dates*/
                    );
                }
            },
            success: function (data) {
                calData = data;
                var schedule = getSelectedSchedule(CalTypKy);
                updateGantt(testData, schedule);
                goDrillGrid(tempPrjKy, tempPrcsSchKy, 0);
                $.holdReady(false);
            }
        });
    }

    //this will be called when the activities are created.
    function getSelectedSchedule(value) {
        //GetCalDataSource(value);
        switch (value) {
            case "24X5":
                return RadiantQ.Gantt.WorkTimeSchedule.Schedule24X5;
                break;
            case "24X7":
                return null;
                break;
            case "10X4":
                return new RadiantQ.Gantt.WorkTimeSchedule("Monday - Thursday, 10 Hours", Create4Days10HoursSchedule);
                break;
            case "8X5withholiday":
                //$.holdReady( true );
                //assDate();
                //$.holdReady(false);
                return new RadiantQ.Gantt.WorkTimeSchedule("Monday - Friday, 8 Hours, special Holidays", Create8X5ScheduleWithHolidays);
                break;
            case "8X5":
            default:
                return new RadiantQ.Gantt.WorkTimeSchedule("Monday - Friday, 8 Hours, special Holidays", Create8X5ScheduleWithHolidays);
                //return RadiantQ.Gantt.WorkTimeSchedule.Schedule8X5;
                break;
        }
    }

    // 8X5 Schedule With Special Holidays.
    function Create8X5ScheduleWithHolidays(date) {
        //LoadDateSource( calData, date );
        for (i = 0; i < calData.length; i++)
            //var d;
            //for ( d in calData )
        {
            if (date.equals(new Date(calData[i].YY, calData[i].MM, calData[i].DD))) //convertShortDateToObjDate( calData[i].CalDt )
            {
                return null;
            }
        }
        return RadiantQ.Gantt.WorkTimeSchedule.EightHoursByFiveDaysScheduleProvider(date);
    }

    function Create4Days10HoursSchedule(date) {
        switch (date.getDayName()) {
            case "Monday":
            case "Tuesday":
            case "Wednesday":
            case "Thursday":
                var intervals = new RadiantQ.Gantt.TimePeriodCollection();
                intervals.Add(new RadiantQ.Gantt.TimePeriod(date.clone().addHours(8.0), null, new RQTimeSpan(0, 10, 0, 0, 0)));
                return intervals;
                break;
            default:
                return null;
        }
    }
    //----------------------------------------------------------------------------------------------------------------------------------------------
    //----------------------------------------------------------------------------------------------------------------------------------------------



    time('Load Data');
    time('Load Gantt');
    time.done();
}

function weekHeaderLine() {
    var weeksHeader = new RadiantQ.Gantt.TimeScaleHeaderDefinition();
    weeksHeader.Type = RadiantQ.Gantt.TimeScaleType.Weeks;
    return weeksHeader;
}

// month header definition.
function monthHeaderLine() {
    var monthHeader = new RadiantQ.Gantt.TimeScaleHeaderDefinition();
    monthHeader.TextFormat = "MMM yyyy";
    monthHeader.Type = ns_gantt.TimeScaleType.Months;
    return monthHeader;
}
// year header definition.
function yearHeaderLine() {
    var yearHeader = new RadiantQ.Gantt.TimeScaleHeaderDefinition();
    yearHeader.TextFormat = "yyyy";
    yearHeader.Type = ns_gantt.TimeScaleType.Years;
    return yearHeader;
}
// day header definition.
function dayHeaderLine() {
    var daysHeader = new RadiantQ.Gantt.TimeScaleHeaderDefinition();
    daysHeader.Type = ns_gantt.TimeScaleType.Days;
    return daysHeader;
}

function updateCriticalPaths(sender, e) {
    // The first argument to GetCriticalPathActivities is a time-buffer which speifies the "safe distance" 
    // that an activity's end time should be away from affecting the project deadline.
    CriticalPathActivities = selectedGantt1.GetCriticalPathActivities(RQTimeSpan.Zero);//$
    var $gantt_container = $('#gantt_container');
    $gantt_container.GanttControl({
        //ProjectStartDate: anchorTime,
        //DataSource: testData,   //testData,   //self.jsonData,
        TaskItemTemplate: tTemplate
    });
    selectedGantt1.RedrawChartRows();//$
}

function updateProject(sender, e) {
    tempPrjKy = $("#PMFilter_CmbPrj_Nm").data('kendoComboBox').value();
    if (tempPrjKy == null || tempPrjKy == undefined)
        tempPrjKy = 1;

    $.ajax({
        type: "POST",
        url: urlUpdateProject,//'/GanttChart/UpdateProject',//'@Url.Action("UpdateProject", "GanttChart")',
        dataType: "json",
        data: { PrjKy: tempPrjKy, PrcsSchKy: tempPrcsSchKy },
        async: false
    });
    alert("Project is updated!");
}

//-------------- 08/10/2014
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

function headerChange(sender, e) {
    $("#timeline").show();
}

function timelineClose(sender, e) {
    $("#timeline").hide();
}

function widthConverter() {
    var ganttChart = this.data.GanttChart;
    var DataSource = this.data.ActivityView.Activity.DataSource;
    var plannedStart = DataSource.PlannedStartTime;
    var plannedEnd = DataSource.PlannedEndTime;

    // Use this utility in GanttChart to determine the location of the past due bar.
    var rightX = plannedEnd ? ganttChart.ConvertTimeToX(plannedEnd) : 0;

    var leftX = plannedStart ? ganttChart.ConvertTimeToX(plannedStart) : 0;

    return (rightX - leftX) + "px";
}
function leftConverter() {
    var ganttChart = this.data.GanttChart;
    var plannedStart = this.data.ActivityView.Activity.DataSource.PlannedStartTime;
    return "1px 0px 1px " + (plannedStart ? ganttChart.ConvertTimeToX(plannedStart) : 0) + "px";
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
//---------------------------------

function SaveAsSaveNewClick(sender, e) {
    tempCalTypKy = $("#cmbCalNm").data('kendoComboBox').value();
    if (tempCalTypKy == null || tempCalTypKy == undefined)
        tempCalTypKy = 1;

    var tempPrjChartTypKy = $("#cmbPrjChartTyp").data('kendoComboBox').value();
    if (tempPrjChartTypKy == null || tempCalTypKy == undefined)
        tempPrjChartTypKy = 1;

    tempPrjKy = $("#PMFilter_CmbPrj_Nm").data('kendoComboBox').value();
    if (tempPrjKy == null || tempPrjKy == undefined)
        tempPrjKy = 1;

    var InsertSetPrjSch = "[{ \"PrjChartTypKy\":\"" + tempPrjChartTypKy + "\",\"isDefault\":\"" + tempIsDefault + "\",\"PrjKy\":\"" + tempPrjKy + "\",\"DocNo\":\"" + tempDocNo + "\",\"CalTypKy\":\"" + tempCalTypKy + "\",\"SchDt\":\"" + tempSchDt + "\",\"OrgPrcsSchKy\":\"" + tempPrcsSchKy + "\"}]";

    tempPrjKy = 1;
    tempSchDt = kendo.toString(new Date(), 'd');
    tempDocNo = null;

    $.ajax({
        type: "POST",
        url: urlSetPrjSch_Insert,//'/GanttChart/SetPrjSch_Insert',//'@Url.Action("SetPrjSch_Insert", "GanttChart")',
        dataType: "json",
        data: { insertSetPrjSch: InsertSetPrjSch },
        async: false,
        success: function (newPrcsSchKy) {
            goDrillGrid(newPrcsSchKy)
        }
    });
    $("#saveAsSelect").hide();

    saveUpdateFunction();

    alert("Successfully Saved As New!");
}

function SaveAsSaveClick(sender, e) {
    tempCalTypKy = $("#cmbCalNm").data('kendoComboBox').value();
    if (tempCalTypKy == null || tempCalTypKy == undefined)
        tempCalTypKy = 1;

    var UpdatedPrjSchHdr = "[{ \"PrcsSchKy\":\"" + tempPrcsSchKy + "\",\"DocNo\":\"" + tempDocNo + "\",\"SchDt\":\"" + tempSchDt + "\",\"CalTypKy\":\"" + tempCalTypKy + "\",\"isDefault\":\"" + tempIsDefault + "\"}]";

    tempSchDt = kendo.toString(new Date(), 'd');;
    tempDocNo = null;

    $.ajax({
        type: "POST",
        url: urlSetPrjSchHdr_Update,//'/GanttChart/SetPrjSchHdr_Update',//'@Url.Action("SetPrjSchHdr_Update", "GanttChart")',
        dataType: "json",
        data: { updatedPrjSchHdr: UpdatedPrjSchHdr },
        async: false
    });
    $("#saveAsSelect").hide();

    saveUpdateFunction();

    alert("Successfully Saved!");
}

function SaveAsCancelClick(sender, e) {
    $("#saveAsSelect").hide();
}

function clearCriticalPaths(sender, e) {
    CriticalPathActivities = [];
    selectedGantt1.RedrawChartRows();//$
}

function UpdateBackgroundColorBinding() {
    var isCritical = CriticalPathActivities.indexOf(this.data) != -1;
    // for background-image
    if (isCritical) {
        //var iii = '<img src="~/Src/Styles/Images/redBar.png" />';
        return 'url(../../../Src/Styles/Images/redBar.png)';
    } else {
        return 'url(../../../Src/Styles/Images/TaskBar.png)';
    }
}

function UpdateBorderColorBinding() {
    var isCritical = CriticalPathActivities.indexOf(this.data) != -1;
    // for background-color
    if (isCritical) {
        return 'red';
    } else {
        return '#050DFA';
    }
}
