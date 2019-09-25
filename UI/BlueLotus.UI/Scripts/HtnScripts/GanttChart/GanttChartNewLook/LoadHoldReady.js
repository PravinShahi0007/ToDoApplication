this.jsonData = null;
var self = this, $gantt_container, ganttControl, sliderValue = 25;


///Code for handling the Initial funtions
//Begin InitialFunction();
function addrow() {

    tempPrjKy = $("#PMFilter_CmbPrj_Nm").data('kendoComboBox').value();
    if (tempPrjKy == null || tempPrjKy == undefined) {
        alert("Select the Project ... !");
        return false;
    }

    var newTask = getNewTask();
    $gantt_container = $('#gantt_container');
    var gantt = ($gantt_container.data("GanttControl") || $gantt_container.data("radiantqGanttControl"));

    ganttControl = $gantt_container.data("GanttControl") || $gantt_container.data("radiantqGanttControl");

    //if (ganttControl == null || ganttControl.options.DataSource == null || ganttControl.options.DataSource.length < 1 || ganttControl == undefined) {

    //    var $gantt_container = $('#gantt_container');

    //    $gantt_container.GanttControl({
    //        DataSource: null
    //    });
    //    $gantt_container.GanttControl({
    //        DataSource: [newTask]
    //    });

    //    ganttControl = $gantt_container.data("GanttControl") || $gantt_container.data("radiantqGanttControl");
    //    //return true;
    //}

    if (ganttControl == null || ganttControl.options.DataSource == null || ganttControl.options.DataSource.length < 1 || ganttControl == undefined) {//if (this.Model == null) {
        $gantt_container.GanttControl({
            DataSource: [newTask]
        });
    }
    else {
        ganttControl.AddNewItem(newTask);
    }
    addedTasks.Add(newTask.ID, newTask);

    // -------------------------------- // This for handling Lino
    var newActivity = ganttControl.Model.GetActivityById(newTask.ID);
    var newTaskSource = newActivity.DataSource;

    for (var i = 0; i < ganttControl.ActivityViews.length; i++) {
        if (ganttControl.ActivityViews[i].Activity.DataSource.ID == newTask.ID) {
            ganttControl.ActivityViews[i].Activity.DataSource.Lino = (ganttControl.ActivityViews[i - 1].Activity.DataSource.Lino + Math.floor(ganttControl.ActivityViews[i - 1].Activity.DataSource.Lino) + 1) / 2;
        }
    }
    // -------------------------------------

    return true;
}


var FormGlblData = {
    FormObjData: null,
    TrnTypKy: 1,
    AccessLvlKy: 1,
    ConfiLvlKy: 1,
    TrnKy: 1,
    TodayDate: todayDate,
    TmStmp: 1,
    IsDetailRelatedHdrSectionChanged: false,
    AllDefalutValueObj: null,
    GotItemRate: 0,
    ISNeworUpdateTranction: 1,
    isSaveandNew: 0,
}

var CdMasModel = {
    IsTrnRateInclusiveTaxTyp1_VAT: 0,    // IsTrnRateInclusiveTaxTyp1_VAT : isCd27
    TrnMinDate: "", // Back date Transaction Purpose
    TrnMaxDate: ""  // Future Date Transaction Purpose
}


$(document).ready(function () {
    $("#idSliderPercentage").val(sliderValue + " %");
    //$.ajax({
    //    url: urlCodes.GetCdKyByConCdAndOurCd,
    //    dataType: "json",
    //    type: "POST",
    //    data: JSON.stringify({
    //        ObjKy: viewBag.ObjKy,
    //        ConCd: 'TrnTyp',
    //        OurCd: viewBag.OurCd
    //    }),
    //    contentType: 'application/json; charset=utf-8',
    //    success: function (TrnTypKy) {

    //        FormGlblData.TrnTypKy = TrnTypKy;
    GetFormObjData();
    //    }
    //});
});

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
            PMFilterOprtionDocReadyCus();
        }
    });
}

function DocReadyCus() {
    var anchorTime = new Date().Date();
    $("#headerLayOutPage").html("<h5 style=\"color:white; font-family:'Arial Unicode MS'\"> Project Management Gantt Chart</h5>");

    $("#body").css('background', '#222B5A'); //'#3F51B5');
    $('.k-window-content.k-content').css('background', '#D9D9D9');
    $('.ui-tabs-panel.ui-widget-content.i-corner-bottom').css('background', '#D9D9D9');

    // create DatePicker from input HTML element
    $("#datepicker").kendoDatePicker();
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

    var columnsDef = [
      {
          field: "Activity_M().ID_M()",
          title: "ID",
          width: 35,
          template: "<div class='IdDefineCol' ondblclick='dblClickEventOnGantt(${ data.activity.ID_M() })'>${ data.activity.ID_M() }</div>",
          iseditable: false
      },
      //{
      //    field: "Activity.DataSource.Lino",
      //    title: "Line No",
      //    width: 80,
      //    iseditable: false
      //},
      {
          field: "Activity.DataSource.PrcsID",
          title: "Task ID",
          width: 100,
          template: "<div>${ data.activity.DataSource.PrcsID }</div>",
          //template: "<div>${ //Here u need to add funtions }</div>",
          editor: "<input onblur='onfocusoutEventOnGanttPrcsID(${ data.activity.ID_M() });' data-bind='value:Activity.DataSource.PrcsID'/>",
      },
      {
          field: "Activity_M().ActivityName_M()",
          title: "Task Name",
          width: 300,
          editor: RadiantQ.Default.Template.ProjectGanttExpandableTextboxEditor(), // nameEditor, // If enabled the popup edit option reassign editor to nameEditor
          template: RadiantQ.Default.Template.ProjectGanttExpandableTextBlockTemplate()
      },
      {
          field: "Activity.DataSource.Qty",
          title: "Quantity",
          cellalign: "right",
          editor: "<input data-bind='value:Activity.DataSource.Qty' data-type=\"number\" data-options='{\"min\":0}'/>",
          //editor: "<input data-bind='value:Activity.DataSource.Qty' data-role=\"spinner\" data-options='{\"min\":0}'/>",
          //template: "<div>${ToDollarString(data)}</div>",
          width: 70
      },
      {
          field: "Activity.DataSource.DlyPrgrsQtyThisSch",
          title: "DlyPrgrsQtyThisSch",
          cellalign: "right",
          width: 150
      },
      {
          field: "Activity.DataSource.TTLDlyPrgrsQty",
          title: "TTLDlyPrgrsQty",
          cellalign: "right",
          width: 120
      },
      //{
      //    field: "Activity.DataSource.TrnUnitKy",
      //    title: "TrnUnitKy",
      //    cellalign: "center",
      //    width: 50,
      //    iseditable: false
      //},
      {
          field: "Activity.DataSource.TrnUnit",
          title: "Unit",
          cellalign: "center",
          width: 100,
          template: "<div ondblclick='dblClickEventOnGanttTrnUnit(${ data.activity.ID_M() })' >${ data.activity.DataSource.TrnUnit }</div>",
          iseditable: false
      },
      {
          field: "Activity.DataSource.Rate",
          title: "Rate",
          cellalign: "right",
          width: 100
      },
      {
          field: "Activity.DataSource.RateWMrkUp",
          title: "RateWMrkUp",
          cellalign: "right",
          width: 100
      },
      {
          field: "Activity_M().StartTime_M()",
          title: "StartTime",
          width: 100,
          format: "MM/dd/yy",
          cellalign: "center",
          editor: "<input data-bind='StartDateBinder:Activity_M().StartTime_M' />"
      },
      {
          field: "Activity_M().EndTime_M()",
          title: "EndTime",
          width: 100,
          format: "MM/dd/yy",
          cellalign: "right",
          template: "<div>${AdjustedEndTimeConverter(data)}</div>",
          editor: "<input data-bind='EndDateBinder:Activity_M().EndTime_M' />"
      },
      {
          field: "Activity_M().Effort_M()",
          title: "Effort",
          width: 100,
          cellalign: "right",
          template: "<div>${EffortToString(data)}</div>",
          editor: "<input data-bind='EffortBinder:Activity_M().Effort_M' />"
          //,
          //template: '<div> ${ data.Activity_M().CumulativeEffort_M().toString() } </div>',
          //editor: "<input data-bind='value:Activity_M().Effort_M'  data-role=\"DurationPicker\"  />"
      },
      {
          field: "Activity_M().ProgressPercent_M()",
          title: "ProgressPercent",
          width: 125,
          cellalign: "right",
          editor: "<input  data-bind='value:Activity_M().ProgressPercent_M' data-role=\"spinner\" data-options='{\"min\":0, \"max\": 100}' />"
      },
      //{
      //    field: "Activity_M().Assignments_M()",
      //    title: "Resource",
      //    template: '<div> ${ RadiantQ.Gantt.ValueConverters.ConverterUtils.GetResourcesText(data.Activity_M().Assignments_M(), false) } </div>',
      //    editor: "<input data-bind='ResourcePickerBinder:Activity_M().Assignments_M'  />",
      //    width: 100
      //},
      {
          field: "Activity_M().PredecessorIndexString_M()",
          title: "PredecessorIndex",
          isParentEditable: false,
          template: "<div>${data.PredecessorIndexString_M() || '' }</div>",
          editor: "<input data-bind='value:Activity_M().PredecessorIndexString_M'/>",
          width: 150
      }];


    //var tTemplate = "<div class='rq-gc-taskbar' data-bind='TaskColor: Activity.ProgressPercent' ><div id='GanttTaskBarLabel' class='rq-gc-taskbar-label'></div></div>";
    var $gantt_container = $('#gantt_container');

    $schedule = $("#cmbCalNm").change(function (newChoice) {
        saveUpdateFunction("isPart");
        assDate(this.value);
    });

    $("#cmbPrjChartTyp").change(function (newChoice) {
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
        //ResourceItemsSource: resources, //self.jsonResrData,
        RoundTimeEditsTo: RadiantQ.Gantt.RoundToOptions.Day,
        TimeRangeHighlightBehavior: RadiantQ.Gantt.TimeRangeHighlightBehavior.HighlightInChartOnHeaderMouseHover,
        TimeScaleHeaders: tmshs,
        //TaskItemTemplate: tTemplate,    // for critical path
        //GanttTableRowLoadedCallBack: templateInnerCallBack,

        // taskCue
        TaskBarBrowseToCueLeftTemplate: "<button></button>",
        TaskBarBrowseToCueRightTemplate: "<button></button>",

        CanUserReorderRows: true, // Reorder facilities from gantt
        UseVirtualization: true,
        //SortOrderBinding: new RadiantQ.BindingOptions("Lino"),

        IDBinding: new RadiantQ.BindingOptions("ID"),
        NameBinding: new RadiantQ.BindingOptions("Name"),
        IndentLevelBinding: new RadiantQ.BindingOptions("IndentLevel"),
        StartTimeBinding: new RadiantQ.BindingOptions("StartTime"),
        EffortBinding: new RadiantQ.BindingOptions("EndTime", RadiantQ.Gantt.BindingMode.TwoWay, new EffortConverter()),
        EndTimeBinding: new RadiantQ.BindingOptions("EndTime"),
        PredecessorIndicesBinding: new RadiantQ.BindingOptions("PredecessorIndices"),
        ProgressPercentBinding: new RadiantQ.BindingOptions("ProgressPercent"),
        //ResourceIDBinding: new RadiantQ.BindingOptions("ResourceID"),
        //ResourceNameBinding: new RadiantQ.BindingOptions("ResourceName"),
        DescriptionBinding: new RadiantQ.BindingOptions("Description"),



        //AssignedResourcesBinding: new RadiantQ.BindingOptions("Resources"),
        GanttTableOptions: {
            columns: columnsDef,
            //editmode: "popup"
        },
        GanttChartTemplateApplied: function (sender, args) {
            // edit by cool coder for print
            selectedGantt = args.element;
            //var $GanttChart = ($gantt_container.data("GanttControl") || $gantt_container.data("radiantqGanttControl")).GetGanttChart();  //selectedGantt.GetGanttChart();
            //$GanttChart.GanttChart({ AnchorTime: anchorTime });

            var ganttInstance = $gantt_container.data("GanttControl");
            //Update the selected gantt.
            selectedGantt1 = ganttInstance;

            // 2014 11 10
            var $GanttChart = args.element;
            $GanttChart.GanttChart({ AnchorTime: anchorTime, ViewWidth: 2000, ResizeToFit: false, });
            //---------------
        },
        //----------- 08/10/2014

        //TaskBarAdornerTemplate: adornerBaselineBaseLineTemplate,
        TaskBarBackgroundTemplate: backGroundBaseLineTemplate,
        //TaskItemTemplate: "<div class='taskbar-style'></div",
        TaskItemTemplate: tTemplateSlider,
        ProgressBarTemplate: "<div class='rq-gc-progressbar'></div>",

        //----------
        // 2014 10 11
        SpecialLineInfos: SpecialLineInfos,
        //---------------

        //WorkTimeSchedule: getSelectedSchedule($schedule.val()),
        //GanttTable: $('#ganttTable'),
        CanInsertPropertyChangeTriggeringPropertiesInData: true,

        //OnTaskBarLoad: OnTaskBarLoad,

    });

    ganttControl = $gantt_container.data("GanttControl");

    ganttControl = $gantt_container.data("GanttControl") || $gantt_container.data("radiantqGanttControl");
    var $table = ganttControl.options.GanttTable;
    //var columns = $table.data().radiantqGanttTable.options.columns;

    // to set readonly for gantt grid view data column.
    //columns[6].iseditable = false; // DlyPrgrsQtyThisSch Column
    //columns[7].iseditable = false; // TTLDlyPrgrsQty Column
    //columns[8].iseditable = false; // Unit Column

    //updateCriticalPaths();

    var gantt = ($gantt_container.data("GanttControl") || $gantt_container.data("radiantqGanttControl"));


    $("#slider").slider({
        orientation: "horizontal",
        range: 'min',
        value: 25,
        max: 101,
        slide: RedrawChartRows
    });

    $("#addRow").click(function () {
        addrow();
    });

    function InsertNewItemAsSiblingBelow() {
        var activity = ganttControl.SelectedActivity;
        if (activity) {
            var newTask = getNewTask();
            ganttControl.InsertNewItemAsSiblingBelow(newTask, ganttControl.SelectedIndex_M(), true);
            addedTasks.Add(newTask.ID, newTask);

            // -------------------------------- // This for handling Lino
            var newActivity = ganttControl.Model.GetActivityById(newTask.ID);
            var newTaskSource = newActivity.DataSource;

            for (var i = 0; i < ganttControl.ActivityViews.length; i++) {
                if (ganttControl.ActivityViews[i].Activity.DataSource.ID == newTask.ID) {
                    ganttControl.ActivityViews[i].Activity.DataSource.Lino = (ganttControl.ActivityViews[i - 1].Activity.DataSource.Lino + ganttControl.ActivityViews[i + 1].Activity.DataSource.Lino) / 2;
                }
            }
            // -------------------------------------

            return false;
        }
        else
            alert("Please select an item in the table first.");
    }
    // Insert new item as sibling below to the selected task.
    $("#InsertNewItemAsSiblingBelow").click(function () {
        InsertNewItemAsSiblingBelow();
    });

    function InsertNewItemAsChildOf() {
        var activity = ganttControl.SelectedActivity;
        if (activity) {
            var newTask = getNewTask();

            ganttControl.InsertNewItemAsChildOf(newTask, ganttControl.SelectedIndex_M(), true);
            addedTasks.Add(newTask.ID, newTask);

            // -------------------------------- // This for handling Lino
            var newActivity = ganttControl.Model.GetActivityById(newTask.ID);
            var newTaskSource = newActivity.DataSource;

            for (var i = 0; i < ganttControl.ActivityViews.length; i++) {
                if (ganttControl.ActivityViews[i].Activity.DataSource.ID == newTask.ID) {
                    ganttControl.ActivityViews[i].Activity.DataSource.Lino = (ganttControl.ActivityViews[i - 1].Activity.DataSource.Lino + ganttControl.ActivityViews[i + 1].Activity.DataSource.Lino) / 2;
                }
            }
            // -------------------------------------

            return false;
        }
        else
            alert("Please select an item in the table first.");
    }
    // Insert a child to a selected task.
    $("#InsertNewItemAsChildOf").click(function () {
        InsertNewItemAsChildOf();
    });

    function GanttUndo() {
        // To Undo the action on top of the stack
        ganttControl.ActionManager.Undo();
    }

    $("#undo").click(function (e) {
        GanttUndo();
    });

    function GanttRedo() {
        ganttControl.ActionManager.Redo();
    }

    $("#redo").click(function (e) {
        GanttRedo();
    });

    function remove() {
        var activitys = null;
        var activity = gantt.SelectedActivity;
        if (activity) {
            var ganttItemSource = gantt.options.DataSource;
            activitys = gantt.RemoveActivity(activity.ID_M());
            for (var i = 0; i < activitys.length; i++) {
                var boundData = activitys[i].DataSource;
                cacheRemovedTask(boundData.PrcsSchDetKy);
                ganttItemSource.splice(ganttItemSource.indexOf(boundData), 1);
            }
        }
        else
            alert("Please select an item in the table first.");
    }
    // To remove the selected task.
    $("#remove").click(function () {
        remove();
    });

    function indent() {
        var activityview = ganttControl.SelectedItem_M();
        if (activityview)
            ganttControl.Indent(activityview);
        else
            alert("Please select an item in the table first.");
        return false;
    }
    // Indent the selected task, to make it as a child.
    $("#indent").click(function () {
        indent();
    });

    function outdent() {
        var activityview = ganttControl.SelectedItem_M();
        if (activityview)
            ganttControl.Outdent(activityview);
        else
            alert("Please select an item in the table first.");
        return false;
    }
    // Outdent the selected task.
    $("#outdent").click(function () {
        outdent();
    });

    function moveup() {
        var table = ganttControl.GetGanttTable();
        if (ganttControl.SelectedIndex_M() != -1) {
            table.MoveRows(ganttControl.SelectedIndex_M(), 1, ganttControl.SelectedIndex_M() - 2);

            var tempLiNo = ganttControl.ActivityViews[ganttControl.SelectedIndex_M()].Activity.DataSource.Lino;
            ganttControl.ActivityViews[ganttControl.SelectedIndex_M()].Activity.DataSource.Lino = ganttControl.ActivityViews[ganttControl.SelectedIndex_M() + 1].Activity.DataSource.Lino;
            ganttControl.ActivityViews[ganttControl.SelectedIndex_M() + 1].Activity.DataSource.Lino = tempLiNo;
        }
        else
            alert("Please select an item in the table first.");
        return false;
    }
    // To move the row.
    $("#moveup").click(function () {
        moveup();
    });

    function movedown() {
        var table = ganttControl.GetGanttTable();
        var selItem = ganttControl.SelectedItem_M();
        if (selItem != null) {
            var selIndex = ganttControl.SelectedIndex_M();
            if (selIndex > -1) {
                // This will adjust the selections to include children, etc.
                // This also will ensure that you don't move a parent inbetween the children which will cause MoveRows to crash.
                table.OnBeforeDragStart(selIndex, 1);
                var selCount = ganttControl.SelectedItems.length;

                table.MoveRows(selIndex, selCount, selIndex + selCount);

                var tempLiNo = ganttControl.ActivityViews[ganttControl.SelectedIndex_M()].Activity.DataSource.Lino;
                ganttControl.ActivityViews[ganttControl.SelectedIndex_M()].Activity.DataSource.Lino = ganttControl.ActivityViews[ganttControl.SelectedIndex_M() - 1].Activity.DataSource.Lino;
                ganttControl.ActivityViews[ganttControl.SelectedIndex_M() - 1].Activity.DataSource.Lino = tempLiNo;
            }
        }
        else
            alert("Please select an item in the table first.");

        return false;
    }
    // To move the row.
    $("#movedown").click(function () {
        movedown();
    });

    function exportToJSON() {
        var jsonObject = ganttControl.options.DataSource;
        //Specify field, want to export.
        alert(JSON.stringify(jsonObject, ["ID", "Name", "StartTime", "Effort", "Description", "IndentLevel", "Resources", "PredecessorIndices", "ProgressPercent"]));
    }
    //To generate the json from the gantt's DataSource 
    $("#exportToJSON").click(function () {
        exportToJSON();
    });

    $("#idCollapseButton").click(function () {
        ganttControl.CollapseAll();
    });

    $("#idExpandButton").click(function () {
        ganttControl.ExpandAll();
    });

    $("#idReNumberLiNoBtn").click(function () {
        reNumberLiNoInterFaceLevel();
    });

    function reNumberLiNoInterFaceLevel() {
        var arrLiNoFrReNo = new Array();

        for (var i = 0; i < ganttControl.ActivityViews.length; i++) {
            arrLiNoFrReNo[i] = ganttControl.ActivityViews[i].Activity.DataSource.Lino;
        }

        arrLiNoFrReNo.sort(function (a, b) {
            return a - b;
        });

        for (var i = 0; i < ganttControl.ActivityViews.length; i++) {
            ganttControl.ActivityViews[i].Activity.DataSource.Lino = arrLiNoFrReNo[i];
        }
    }

    saveUpdateFunction = function (isFullOrPartGantt) {

        reNumberLiNoInterFaceLevel(); // Renumber Interface Level when saving.

        var dataAssign;
        if (isFullOrPartGantt == "isFull") {

            var $gantt_container = $('#gantt_container');
            //ganttControl = $('#gantt_container').data("GanttControl");
            //var fullGanttData = $('#gantt_container').data("GanttControl").options.GanttTable.data();
            //var columns = $table.data()

            var gantt = ($gantt_container.data("GanttControl") || $gantt_container.data("radiantqGanttControl"));
            var ganttItemSource = gantt.options.DataSource;
            var addedTasksJsonTemp = myStringify(ganttItemSource);

            dataAssign = {
                addedTasks: JSON.stringify(addedTasksJsonTemp),
                removedTaskIds: JSON.stringify([]),
                updatedTasks: JSON.stringify([]),
                PrjKy: tempPrjKy,
                PrcsSchKy: tempPrcsSchKy
            };

        } else {

            var updatedTasksJsonTemp = myStringify(updatedTasks.asArray);
            var addedTasksJsonTemp = myStringify(addedTasks.asArray);

            dataAssign = {
                addedTasks: JSON.stringify(addedTasksJsonTemp), // addedTasks.asArray, //
                removedTaskIds: JSON.stringify(removedTaskIds), //  removedTaskIds, //
                updatedTasks: JSON.stringify(updatedTasksJsonTemp), // updatedTasksJsonTemp, //JSON.stringify(updatedTasks.asArray), //updatedTasksJsonTemp, // updatedTasks.asArray, //
                PrjKy: tempPrjKy,
                PrcsSchKy: tempPrcsSchKy
            };
        }


        $.ajax({
            type: "POST",
            url: urlSetTaskData_Validation, //NewLook,//'/GanttChart/SetTaskData',//'@Url.Action("SetTaskData", "GanttChart")',
            dataType: "json",
            data: dataAssign,
            async: false,
            success: function (data) {
                if (data.length < 1) {
                    saveUpdateFunction_AfterIDValidation(dataAssign);
                }
                else {
                    alert("'" + data[0].TaskID + "' : Duplicate TaskID");
                }
            },
            failure: function (errMsg) {
                alert(errMsg);
            }
        });
    }

    saveUpdateFunction_AfterIDValidation = function (dataAssign) {
        $.ajax({
            type: "POST",
            url: urlSetTaskData, //NewLook,//'/GanttChart/SetTaskData',//'@Url.Action("SetTaskData", "GanttChart")',
            dataType: "json",
            data: dataAssign,
            async: false,
            success: function (data) {
                if (data == true) {
                    alert("Data is Saved!");

                    //alert("Data is Saved!");
                    //GetDataSourceFromFindSp();
                    addedTasks = new RadiantQ.Gantt.Dictionary();
                    removedTaskIds = [];
                    updatedTasks = new RadiantQ.Gantt.Dictionary();
                    updatedTasksNewLook = new Array();


                    // Load the data after saving done : VgSan
                    goDrillGrid(tempPrjKy, tempPrcsSchKy, tempwithBaseLine);
                }
                else
                    alert("Date not saved properly");
            },
            failure: function (errMsg) {
                alert(errMsg);
            }
        });
    }

    //To save the update and removed and added tasks in server.
    $("#save").click(function () {
        if (tempIsNewSchDet == 1 && ganttControl != null) {
            alert("This is new project, click SaveAs Btn ... !");
            //saveUpdateFunction();
        }
        else if (tempIsNewSchDet == 0 && ganttControl != null) {
            saveUpdateFunction("isPart");
        }
        else {
            alert("Gantt Control Is Empty ... !");
        }
    });

    $("#btnLoadGanttVrsn").click(function () {
        var grid = $('#tGrid').data().kendoGrid;
        var selectedItem = grid.dataItem(grid.select());
        tempPrcsSchKy = selectedItem.PrcsSchKy;

        //tempPrcsSchKy = arg.sender.dataItem(arg.sender.select()).PrcsSchKy;
        //for (i = 0; i < VersrnData.length; i++)
        //    if (VersrnData[i].PrcsSchKy == tempPrcsSchKy)
        //        newtempVersrnData.push(VersrnData[i]);
        saveAsComponentsUIUpdate(tempPrjKy, tempPrcsSchKy, tempwithBaseLine);

        //saveAsComponentsUIUpdate(tempPrjKy, tempPrcsSchKy, tempwithBaseLine);
    });

    $("#btnNewVrsn").click(function () {
        tempIsNewSchDet = 1;
        closeProjectVersionselect();
    });

    $("#btnDeleteVrsn").click(function () {
        ProjectVersionDelete();
    });

    $("#SaveAs").click(function () {
        saveAsClick();
    });

    $('#withBaseLine').change(function () {
        if (this.checked) {
            tempwithBaseLine = 1;
        } else {
            tempwithBaseLine = 0;
        }
    });

    $('#withNotCompletedTask').change(function () {
        if (this.checked) {
            tempwithNotCompletedTask = 1;
        } else {
            tempwithNotCompletedTask = 0;
        }
    });

    $('#onlyCriticalTask').change(function () {
        if (this.checked) {
            temponlyCriticalTask = 1;
        } else {
            temponlyCriticalTask = 0;
        }
    });

    // to print
    $dialogDiv = $("#dialogDiv");
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
            }
            //,
            //"ExportToImage": function () {
            //    var options = $(this).ganttPrintDialog("getSelectedOptions");
            //    selectedGantt1.ExportToImage(options);
            //    //selectedGantt.Print({Title:"Gantt Printing", VisibleColumnIndices: [0, 1, 2, 3], ViewStartTime: new Date(2013, 7, 19), ViewEndTime: new Date(2013, 8, 30)});
            //    $(this).ganttPrintDialog("close");
            //}
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

    $("#idButtonDiv").hide();
    $("#expandButtonsUp").hide();
    $("#expandButtonsDown").click(function () {
        $("#expandButtonsDown").hide();
        $("#idButtonDiv").show();
        $("#expandButtonsUp").show();
    });
    $("#expandButtonsUp").click(function () {
        $("#expandButtonsDown").show();
        $("#idButtonDiv").hide();
        $("#expandButtonsUp").hide();
    });

    function GetNewIDTemp() {

        addClickCount = addClickCount + 1;

        if (addClickCount == 1) {     // Only First Time we need to add totalRowCountFromServer;
            if (gantt.Model == null) {
                return 1;
            }
            else {
                return gantt.Model.GetNewID() + totalRowCountFromServer;
            }
        } else {
            if (gantt.Model == null) {
                return 1;
            }
            else {
                return gantt.Model.GetNewID();
            }
        }
    }

    // to return a new task object.
    getNewTask = function () {
        return {
            "Name": "New Task ",
            "ID": GetNewIDTemp(),
            "Qty": "1",
            "DlyPrgrsQtyThisSch": "1",
            "TTLDlyPrgrsQty": "1",
            "TrnUnitKy": "1",
            "Lino": "0",//linoInsertNewItemAsChildOf(), //linoInsertNewItemAsSiblingBelow(),
            "PrcsID": "1",
            "StartTime": new Date(new Date().setHours(0, 0, 0, 0)),    // Set startDate as current date and remove time //new Date("2014-02-02T00:00:00Z"),
            "EndTime": new Date(new Date().setHours(0, 0, 0, 0)),
            //"Effort": new RQTimeSpan(1, 0, 0, 0, 0),
            "ProgressPercent": 0,
            "Description": "Description of Task"
        };
    }

    cacheRemovedTask = function (removedTaskID) {
        removedTaskIds.push(removedTaskID);
        //To remove the removed task from addedTasks list
        if (addedTasks.Contains(removedTaskID))
            addedTasks.Remove(removedTaskID);
        //To remove the removed task from updatedTasks list
        if (updatedTasks.Contains(removedTaskID))
            updatedTasks.Remove(removedTaskID);
    }

    time('Load Data');
    time('Load Gantt');
    time.done();
    //End InitialFunction();





    ///Code for handling the Gantt Menu's
    //Begin GanttMenu();

    //****************************************************
    //****************** File Menu ***********************
    //****************************************************
    $("#menu-file-images").kendoMenu({
        dataSource: [
            {
                //text: "File", imageUrl: "../../../DevBL10/Images/PMIcons/file.jpg",
                text: "File", spriteCssClass: "fa fa-folder fa-2x",
                items: [
                    { text: "New", imageUrl: "../Images/PMIcons/new.png" },
                    { text: "Open", imageUrl: "../Images/PMIcons/open.png" },
                    { text: "Undo", imageUrl: "../Images/PMIcons/undo.png" },
                    //{ text: "Undo", spriteCssClass: "fa fa-reply fa-2x" },
                    { text: "Redo", imageUrl: "../Images/PMIcons/redo.png" },
                    //{ text: "Redo", spriteCssClass: "fa fa-share fa-2x" },
                    //{ text: "Save", imageUrl: "../../../DevBL10/Images/PMIcons/Save.jpg" },
                    { text: "Save", spriteCssClass: "fa fa-floppy-o fa-2x" },
                    { text: "Save As", imageUrl: "../Images/PMIcons/SaveAs.png" },
                    { text: "Link Schdules", imageUrl: "../Images/PMIcons/linqProjects.png" },
                    //{ text: "Link Schdules", spriteCssClass: "fa fa-random fa-2x" },
                    //{ text: "Update Project", imageUrl: "../../../DevBL10/Images/PMIcons/UpdateProject.png" },
                    { text: "Update Project", spriteCssClass: "fa fa-refresh fa-2x" },
                    //{ text: "Link BOQ Project", imageUrl: "../../../DevBL10/Images/PMIcons/LnkBOQPrj.png" },
                    { text: "Link BOQ Project", spriteCssClass: "fa fa-link fa-2x" },
                ]
            }
        ],
        select: onSelectFileMenu
    });

    function onSelectFileMenu(e) {
        var expr = $(e.item).children(".k-link").text();
        switch (expr) {
            case "New":
                dialogNewProjectOpen();
                break;
            case "Open":
                $("#idDivPMFilterOptionWindow").show().kendoWindow({
                    width: "1000px",
                    height: "300px",
                    //position: { top: 100, left: "20%" },
                    modal: true,
                    title: "Filter Options"
                });

                $('#idDivPMFilterOptionWindow').data('kendoWindow').center().open();
                break;
            case "Undo":
                GanttUndo();
                break;
            case "Redo":
                GanttRedo();
                break;
            case "Save":
                if (tempIsNewSchDet == 1 && ganttControl != null) {
                    alert("This is new project, click SaveAs Btn ... !");
                }
                else if (tempIsNewSchDet == 0 && ganttControl != null) {
                    saveUpdateFunction("isPart");
                }
                else {
                    alert("Gantt Control Is Empty ... !");
                }
                break;
            case "Save As":
                saveAsClick();
                break;
            case "Update Project":
                tempPrjKy = $("#PMFilter_CmbPrj_Nm").data('kendoComboBox').value();
                if (tempPrjKy == null || tempPrjKy == undefined)
                    tempPrjKy = 1;

                $.ajax({
                    type: "POST",
                    url: urlUpdateProject,
                    dataType: "json",
                    data: { PrjKy: tempPrjKy, PrcsSchKy: tempPrcsSchKy },
                    async: false,
                    success: function (data) {
                        alert("Project is updated!");
                    }
                });
                break;
            case "Link Schdules":
                tempPrjKy = $("#PMFilter_CmbPrj_Nm").data('kendoComboBox').value();
                if (tempPrjKy == null || tempPrjKy == undefined)
                    tempPrjKy = 1;
                if (tempPrjKy > 1) {
                    $.ajax({
                        type: "POST",
                        url: urlPrjSchRel_InsertUpdate,
                        dataType: "json",
                        data: { PrjKy: tempPrjKy },
                        async: false,
                        success: function (data) {
                            alert("Schdules Linked!");
                        }
                    });
                } else {
                    alert("Select the project ... !");
                }
                break;
            case "Link BOQ Project":
                openLnkBOQPrjWindow();
                break;
            default:
                break;
        }
    }


    //*****************************************************
    //************* Home Menu *****************************
    //*****************************************************
    $("#menu-home-images").kendoMenu({
        dataSource: [
            {
                //text: "Home", imageUrl: "../../../DevBL10/Images/PMIcons/home.jpg",
                text: "Home", spriteCssClass: "fa fa-home fa-2x",
                items: [
                    { text: "Excel Import", imageUrl: "../Images/PMIcons/MSImport.jpg" },
                    { text: "MS Project Import", imageUrl: "../Images/PMIcons/MSImport.jpg" },
                    { text: "MS Project Export", imageUrl: "../Images/PMIcons/MSExport.jpg" },
                    { text: "Integririty Check", imageUrl: "../Images/PMIcons/Integririty.jpg" },
                    { text: "Master And Excute Plan Link", imageUrl: "../Images/PMIcons/linqProjects.png" },
                    { text: "Kendo Grid New Version Test", imageUrl: "../Images/PMIcons/Integririty.jpg" },
                    { text: "CSS Dynamic Bind", imageUrl: "../Images/PMIcons/Integririty.jpg" }, ]
            }
        ],
        select: onSelectHomeMenu
    });

    function onSelectHomeMenu(e) {
        var expr = $(e.item).children(".k-link").text();
        switch (expr) {
            case "Excel Import":
                openMSExcelImportWindow();
                break;
            case "MS Project Import":
                openMSProjectImportWindow();
                break;
            case "MS Project Export":
                MSExport();
                break;
            case "Integririty Check":
                $.ajax({
                    type: "POST",
                    url: urlIntegrirityCheck_IC,
                    dataType: "json",
                    async: false,
                    success: function (data) {
                        DynamicKendoGrid(data);
                    }
                });
                break;
            case "Master And Excute Plan Link":
                openMasterExcutePlanWindow();
                break;
            case "Kendo Grid New Version Test":
                var url = "http://localhost:2121/DevBL10/htnshared/KendoGridTest";
                window.open(url, '_blank');
                break;
            case "CSS Dynamic Bind":
                var url = "http://localhost:2121/DevBL10/htnshared/DynamicCSSBind";
                window.open(url, '_blank');
                break;
            default:
                break;
        }
    }


    //*************************************************
    //********************** Edit Menu ****************
    //*************************************************
    $("#menu-edit-images").kendoMenu({
        dataSource: [
            {
                //text: "Edit", imageUrl: "../../../DevBL10/Images/PMIcons/edit.png",
                text: "Edit", spriteCssClass: "fa fa-pencil-square-o fa-2x",
                items: [
                    { text: "Add Task", spriteCssClass: "fa fa-plus-circle fa-2x color-green" },
                    //{ text: "Add Task", imageUrl: "../../../DevBL10/Images/PMIcons/Add.jpg" },
                    { text: "Insert NewItem As Sibling Below", imageUrl: "../Images/PMIcons/InsertItemAsSibling.jpg" },
                    { text: "Insert NewItem As ChildOf", imageUrl: "../Images/PMIcons/InsrtNewAsChild.jpg" },
                    { text: "Delete Task", spriteCssClass: "fa fa-minus-circle fa-2x color-red" },
                    //{ text: "Delete Task", imageUrl: "../../../DevBL10/Images/PMIcons/Delete.jpg" },
                    { text: "Indent Task", spriteCssClass: "fa fa-indent fa-2x" },
                    { text: "Outdent Task", spriteCssClass: "fa fa-outdent fa-2x" },
                    //{ text: "Indent Task", imageUrl: "../../../DevBL10/Images/PMIcons/Indent.jpg" },
                    //{ text: "Outdent Task", imageUrl: "../../../DevBL10/Images/PMIcons/Outdent.jpg" },
                    { text: "Move Up Task", spriteCssClass: "fa fa-arrow-circle-up fa-2x" },
                    { text: "Move Down Task", spriteCssClass: "fa fa-arrow-circle-down fa-2x" },
                    //{ text: "Move Up Task", imageUrl: "../../../DevBL10/Images/PMIcons/MoveUp.jpg" },
                    //{ text: "Move Down Task", imageUrl: "../../../DevBL10/Images/PMIcons/MoveDown.jpg" },
                    //{ text: "Export To JSON(Current Gantt data)", imageUrl: "../../../DevBL10/Images/PMIcons/ExportToJson.jpg" }
                    { text: "Export To JSON(Current Gantt data)", spriteCssClass: "fa fa-file-text fa-2x" }]
            }
        ],
        select: onSelectEditMenu
    });

    function onSelectEditMenu(e) {
        var expr = $(e.item).children(".k-link").text();
        switch (expr) {
            case "Add Task":
                addrow();
                break;
            case "Insert NewItem As Sibling Below":
                InsertNewItemAsSiblingBelow();
                break;
            case "Insert NewItem As ChildOf":
                InsertNewItemAsChildOf();
                break;
            case "Delete Task":
                remove();
                break;
            case "Indent Task":
                indent();
                break;
            case "Outdent Task":
                outdent();
                break;
            case "Move Up Task":
                moveup();
                break;
            case "Move Down Task":
                movedown();
                break;
            case "Export To JSON(Current Gantt data)":
                exportToJSON();
                break;
            default:
                break;
        }
    }


    //***********************************************************
    //****************** Critical Path Menu *********************
    //***********************************************************
    $("#menu-critical-images").kendoMenu({
        dataSource: [
            {
                text: "Critical Path", imageUrl: "../Images/PMIcons/criticalpath2.png",
                items: [
                    { text: "Update Critical Path", imageUrl: "../Images/PMIcons/UpdateCriticalPath.png" },
                    //{ text: "Update Critical Path", imageUrl: "../../../DevBL10/Images/PMIcons/UpdateCriticalPath.jpg" },
                    { text: "Clear Critical Path", imageUrl: "../Images/PMIcons/ClearCriticalPath.png" }]
                    //{ text: "Clear Critical Path", imageUrl: "../../../DevBL10/Images/PMIcons/ClearCriticalPath.jpg" }]
            }
        ],
        select: onSelectCriticalPathMenu
    });

    function onSelectCriticalPathMenu(e) {
        var expr = $(e.item).children(".k-link").text();
        switch (expr) {
            case "Update Critical Path":
                //// The first argument to GetCriticalPathActivities is a time-buffer which speifies the "safe distance" 
                //// that an activity's end time should be away from affecting the project deadline.
                //CriticalPathActivities = selectedGantt1.GetCriticalPathActivities(RQTimeSpan.Zero);//$
                //var $gantt_container = $('#gantt_container');
                //$gantt_container.GanttControl({
                //    TaskItemTemplate: tTemplate
                //});
                //selectedGantt1.RedrawChartRows();//$
                updateCriticalPaths();
                break;
            case "Clear Critical Path":
                //CriticalPathActivities = [];
                //selectedGantt1.RedrawChartRows();//$
                clearCriticalPaths();
                break;
            default:
                break;
        }
    }


    //*********************************************************
    //**************** Print Option Menu **********************
    //*********************************************************
    $("#menu-print-images").kendoMenu({
        dataSource: [
            {
                //text: "Print Option", imageUrl: "../../../DevBL10/Images/PMIcons/printing-option.jpg",
                text: "Print Option", spriteCssClass: "fa fa fa-print fa-2x",
                items: [
                    { text: "Print", imageUrl: "../Images/PMIcons/printing.png" },
                    { text: "Chart Print", imageUrl: "../Images/PMIcons/ChartPrint.png" },
                    //{ text: "Export To Image", imageUrl: "../../../DevBL10/Images/PMIcons/GanttResource.jpg" },
                    //{ text: "Chart Export To Image", imageUrl: "../../../DevBL10/Images/PMIcons/GanttResource.jpg" },
                    { text: "Custom Print & Export", imageUrl: "../Images/PMIcons/custom-print.png" }]
            }
        ],
        select: onSelectPrintMenu
    });

    function onSelectPrintMenu(e) {
        var expr = $(e.item).children(".k-link").text();
        switch (expr) {
            case "Print":
                selectedGantt1.Print();
                break;
            case "Chart Print":
                selectedGantt1.Print({ IsGridVisible: false });
                break;
            case "Export To Image":
                selectedGantt1.ExportToImage();
                break;
            case "Chart Export To Image":
                selectedGantt1.ExportToImage({ IsGridVisible: false });
                break;
            case "Custom Print & Export":
                $dialogDiv = $("#dialogDiv");
                $dialogDiv.ganttPrintDialog("open", selectedGantt1);
                break;
            default:
                break;
        }
    }

    ///End GanttMenu()
}