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
        }
    };
})(jQuery);
this.jsonData = null;
this.savedJson = null;
var self = this;
var savedProject;

// Will load localized strings to be shown inside the gantt based on the current browser locale. You can add more localized string dictionaries if the default supported dictionaries don't suffice.
jQuery.i18n.properties({
    name: 'RQStrings',
    path: '../../../Src/ResourceStrings/',
    mode: 'both'
});

$.holdReady(true);
$.ajax({
    type: "GET",
    dataType: 'json',
    url: urlGanttControlExportToProjectXML,//'GanttControlExportToProjectXML.json',
    converters:
    {
        "text json": function (data) {
            //console.log(data);
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

var $gantt_container;
var ganttControl;
$(document).ready(function () {
    var anchorTime = self.jsonData[0].StartTime.clone();
    $gantt_container = $('#gantt_container');
    $gantt_container.GanttControl({
        ProjectStartDate: anchorTime,
        DataSource: self.jsonData,
        GanttTableRowLoadedCallBack: templateCallBack,
        GanttTable: $("#ganttTable"),
        IDBinding: { Property: "ID" },
        NameBinding: { Property: "Name" },
        IndentLevelBinding: { Property: "IndentLevel" },
        StartTimeBinding: { Property: "StartTime" },
        EffortBinding: { Property: "Effort" },
        ProgressPercentBinding: { Property: "ProgressPercent" },
        PredecessorIndicesBinding: { Property: "PredecessorIndices" },
        DescriptionBinding: { Property: "Description" },
        AssignedResourcesBinding: { Property: "Resources" },
        TimeRangeHighlightBehavior: RadiantQ.Gantt.TimeRangeHighlightBehavior.HighlightInChartOnHeaderMouseHover,
        GanttChartTemplateApplied: function (sender) {
            var $GanttChart = $gantt_container.data("GanttControl").GetGanttChart();
            $GanttChart.GanttChart({ AnchorTime: anchorTime });
        }
    });

    ganttControl = $gantt_container.data("GanttControl") || $gantt_container.data("radiantqGanttControl");
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

    $("#save").click(function () {

        $.ajax({
            type: "GET",
            url: urlEmptyProject,//"/EmptyProject.xml",    // this should be your XML url<a href="~/Views/GanttChart/EmptyProject.xml">~/Views/GanttChart/EmptyProject.xml</a>
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
                savedJson = data;
                savedProject = new RadiantQ.ProjectModel.Project(savedJson);
                savedProject = Object.create(savedProject);
                AddContentToProject(savedProject);
            }

        });


    });
});

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

function AddContentToProject(saveProject) {
    for (var i = 0; i < ganttControl.ActivityViews.length; i++) {
        var view = ganttControl.ActivityViews[i];
        var activity = view.Activity;
        var ti = activity.DataSource;
        var pt = saveProject.createTask();
        pt.ID = activity.ID;
        pt.StartDate = activity.StartTime;
        pt.PreferredStartTime = activity.StartTime;
        pt.ProgressPercent = activity.ProgressPercent;
        pt.Effort = activity.Effort;
        pt.Duration = activity.Duration;
        pt.UpdateFinish();
        pt.IndentLevel = view.IndentLevel;
        pt.SortOrder = activity.SortOrder;
        pt.TaskName = activity.ActivityName;
        pt.PredecessorIndices = activity.PredecessorIndexString;
        pt.AssignedResources = ti.Resources;
        saveProject.Tasks.push(pt);
    }

    saveProject.calculateTasksEndTime();
    var xmlStr = js2xmlparser("Project", saveProject.projectElem);

    try {
        var blob = new Blob([xmlStr], { type: "text/plain;charset=utf-8" });
        saveAs(blob, "msProject.xml");
    }
    catch (e) {
        alert(xmlStr);
    }
}