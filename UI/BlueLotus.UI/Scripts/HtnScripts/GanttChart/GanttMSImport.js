(function ($) {
    $.ui.editor.editors =
   {
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
   };
})(jQuery);
this.jsonData = null;
var self = this;
var projectObject = null;
// Will load localized strings to be shown inside the gantt based on the current browser locale. You can add more localized string dictionaries if the default supported dictionaries don't suffice.
jQuery.i18n.properties({
    name: 'RQStrings',
    path: '/Src/ResourceStrings/',
    mode: 'both'
});

var $gantt_container, gantt;
var project;
$.holdReady(true);
$.ajax({
    //type: "GET",
    //dataType: 'xml text',
    //data: { PrjKy: 281, PrcsSchKy: 20988, IsShowBaseLine: 0 },
    //url: '@Url.Action("GetSelectProjectScheduleDetails", "GanttChart")',
    //converters:
    //{
    //    "xml text": function ( data )
    //    {
    //        // We use te xml2json jquery plugin to convert xml to json.
    //        var json = XML2jsobj( data );
    //        return json.Project;
    //    }
    //},
    //success: function ( data )
    //{
    //    self.jsonData = data;
    //    project = new RadiantQ.ProjectModel.Project( self.jsonData );
    //    project = Object.create( project );
    //    $.holdReady( false );
    //}
    type: "GET",
    url: urlEmptyProject,//"/Src/EmptyProject.xml",    // this should be your XML url
    dataType: "xml text",
    converters:
    {
        "xml text": function (data) {
            // We use te xml2json jquery plugin to convert xml to json.
            var json = XML2jsobj(data);
            return json.Project;
        }
    },
    success: function (data) {
        self.jsonData = data;
        project = new RadiantQ.ProjectModel.Project(self.jsonData);
        project = Object.create(project);
        $.holdReady(false);
    }
});

// SetViewHeight will be called by a containing sample browser, if any.
function SetViewHeight(height) {
    if ($gantt_container && $gantt_container.data("GanttControl")) {
        $gantt_container.data("GanttControl").setHeight(height);
    }
}

$(document).ready(function () {
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

        templateCallBack(tr, data);
    }

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

    var anchorTime = new Date().Date(); //project.topProjectTask.StartDate.clone();
    $gantt_container = $('#gantt_container');
    var startTime = new Date();
    $gantt_container.GanttControl({
        ProjectStartDate: anchorTime,
        GanttTableRowLoadedCallBack: templateInnerCallBack,
        IDBinding: { Property: "ID" },
        DataSource: project.Tasks,
        UseVirtualization: true,
        NameBinding: { Property: "TaskName" },
        IndentLevelBinding: { Property: "IndentLevel" },
        StartTimeBinding: { Property: "StartDate" },
        EffortBinding: { Property: "EndDate", Converter: effortConverter },     /// cool code by me , Converter: effortConverter
        //EffortBinding: { Property: "Effort" },
        PredecessorIndicesBinding: { Property: "PredecessorIndices" },
        ProgressPercentBinding: { Property: "ProgressPercent" },
        DescriptionBinding: { Property: "Description" },
        AssignedResourcesBinding: { Property: "AssignedResources" },
        GanttTable: $('#ganttTable'),
        ResourceNameBinding:
        {
            Property: "ResourceName"
        },
        GanttChartTemplateApplied: function (sender) {
            gantt = $gantt_container.data("GanttControl");
            var $GanttChart = gantt.GetGanttChart();
            $GanttChart.GanttChart({ AnchorTime: anchorTime });
        }
    });

    // To update the Gantt Width & Height based on SampleBrowser, if any.
    if (window.parent && window.parent.FitToWindow)
        window.parent.FitToWindow();

    var $table = $gantt_container.data("GanttControl").options.GanttTable;
    $table.gridEditor({
        //Triggers when editing start.
        start: function (event, ui) {
            //return false;  /*To prevent default action, default action, set the value to the textbox base on column name*/
        },
        submit: function (event, ui) {
            // return false; to discard changes.
        }
    });
    //to add a task.
    $("#addRow").click(function () {
        var newTask = project.createTask();
        gantt.AddNewItem(newTask);
    });
    // insert new item as sibling below to the selected task.
    $("#InsertNewItemAsSiblingBelow").click(function () {
        var activity = gantt.SelectedActivity;
        if (activity)
            gantt.InsertNewItemAsSiblingBelow(project.createTask(), gantt.SelectedIndex, true);
        else
            alert("Please select an item in the table first.");
    });
    // insert a child to a selected task.
    $("#InsertNewItemAsChildOf").click(function () {
        var activity = gantt.SelectedActivity;
        if (activity)
            gantt.InsertNewItemAsChildOf(project.createTask(), gantt.SelectedIndex, true);
        else
            alert("Please select an item in the table first.");
    });
    // to remove the selected task.
    $("#remove").click(function () {
        var activity = gantt.SelectedActivity;
        var removedTasks = [];
        if (activity)
            removedTasks = gantt.RemoveActivity(activity.ID);
        else
            alert("Please select an item in the table first.");

        // Then remove the activities from the bound list.
        for (var i = 0; i < removedTasks.length; i++) {
            var activity = removedTasks[i];
            project.Tasks.remove(activity.DataSource);
        }
    });
    // indent the selected task, to make it as a child.
    $("#indent").click(function () {
        var activityview = gantt.SelectedItem;
        if (activityview)
            gantt.Indent(activityview);
        else
            alert("Please select an item in the table first.");
    });
    // outdent the selected task.
    $("#outdent").click(function () {
        var activityview = gantt.SelectedItem;
        if (activityview)
            gantt.Outdent(activityview);
        else
            alert("Please select an item in the table first.");
    });
    // to move the row.
    $("#moveup").click(function () {
        var table = gantt.GetGanttTable();
        if (gantt.SelectedIndex != -1) {
            var select = gantt.SelectedIndex;
            table.MoveRows(gantt.SelectedIndex, 1, gantt.SelectedIndex - 2);
            gantt.SelectedIndex = select - 1;
        }
        else
            alert("Please select an item in the table first.");
    });

    $("#save").click(function () {
        project.calculateTasksEndTime();
        var xml = js2xmlparser("Project", project.projectElem);
        window.JSON.toXML(jsonData, "Project")
        alert(xml);
    });

    $("#open").click(function () {
        $.holdReady(true);
        $('input[type=file]').click();
        $.holdReady(false);
        self.readBlob();
    });

    // to return a task object.
    getNewTask = function () {
        return {
            "TaskName": "New Task ",
            "ID": gantt.Model.GetNewID(),
            "StartDate": new Date("2014-02-02T00:00:00Z"),
            "Effort": new RQTimeSpan(0, 12, 30, 0, 0),
            "ProgressPercent": 50,
            "Description": "Description of Task"
        };
    }
});

function readBlob() {
    var files = document.getElementById('files').files;
    if (!files.length) {
        alert('Please select a file!');
        return;
    }
    var file = files[0];
    var reader = new FileReader();
    // If we use onloadend, we need to check the readyState.
    reader.onloadend = function (evt) {
        if (evt.target.readyState == FileReader.DONE) { // DONE == 2
            var txt = evt.target.result;
            var parser = new DOMParser();
            var xml = parser.parseFromString(txt, "text/xml");
            init(xml);
        }
    };

    var blob = file.slice(0, file.size);
    reader.readAsText(file);
}

function XML2jsobj(node) {
    var data = {};
    // append a value
    function Add(name, value) {
        if (data[name]) {
            if (data[name].constructor != Array) {
                data[name] = [data[name]];
            }
            data[name][data[name].length] = value;
        }
        else {
            data[name] = value;
        }
    };
    // element attributes
    var c, cn;
    if (node.attributes != undefined) {
        for (c = 0, cn = node.attributes; c < cn.length; c++) {
            Add(cn[c].name, cn[c].value);
        }
    }
    // child elements
    for (c = 0, cn = node.childNodes; c < cn.length; c++) {
        if (cn[c].nodeType == 1) {
            var firstChild = cn[c].firstChild;
            if (cn[c].childNodes.length == 1 && firstChild.nodeType == 3) {
                // text value
                Add(cn[c].tagName, firstChild.textContent);
            }
            else {
                // sub-object
                Add(cn[c].tagName, XML2jsobj(cn[c]));
            }
        }
    }
    return data;
}

function init(xml) {

    var json = $.xml2json(xml);
    project = new RadiantQ.ProjectModel.Project(json);

    $gantt_container.GanttControl({ "DataSource": null, "ResourceItemsSource": null });
    var delayUpdates1 = new RadiantQ.Gantt.Utils.DelayUpdates()
    {
        $gantt_container.GanttControl({
            //WorkTimeSchedule: project.BaseCalendar.Schedule,
            ResourceItemsSource: project.ResourceList,
            DataSource: project.Tasks
        });
    }
    delayUpdates1.Dispose();

    var delayUpdates2 = new RadiantQ.Gantt.Utils.DelayUpdates()
    {
        gantt = $gantt_container.data("GanttControl");
        var $GanttChart = gantt.GetGanttChart();
        $GanttChart.GanttChart({ AnchorTime: project.Tasks[0].StartDate.clone() });
    }
    delayUpdates2.Dispose();
}