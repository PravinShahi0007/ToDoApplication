// EffortConverter Inherits From ValueConverter 
function EffortConverter() {
    RadiantQ.ValueConverter.call(this);
}
EffortConverter.prototype = new RadiantQ.ValueConverter();

// Overriding default Convert and ConvertBack methods
EffortConverter.prototype.Convert = function (value, parameter) {
    var task = parameter;
    return EffortConverter.GetTaskEffort(task);
}

EffortConverter.prototype.ConvertBack = function (value, parameter) {
    // Compute EndTime based on StartTime and Effort.
    var dur = value;
    var task = parameter;
    // Note that "WorkTimeSchedule.Schedule8X5" is the same schdule used by the GanttControl
    // in this app. If you use a different schedule in the GanttControl, use that same schedule here as well:
    //return RadiantQ.Gantt.WorkTimeSchedule.Schedule8X5.GetEnd(task.StartTime, dur);
    return getSelectedSchedule($schedule.val()).GetEnd(task.StartTime, dur);
}

EffortConverter.GetTaskEffort = function (task) {
    //Note that "WorkTimeSchedule.Schedule8X5" is the same schdule used by the GanttControl
    // in this app. If you use a different schedule in the GanttControl, use that same scheduleGetDataSourceFromFindSp() here as well:
    if (task.StartTime && task.EndTime) {
        //return RadiantQ.Gantt.WorkTimeSchedule.Schedule8X5.GetEffort(task.StartTime, task.EndTime);
        return getSelectedSchedule($schedule.val()).GetEffort(task.StartTime, task.EndTime);
    }

    return RQTimeSpan.Zero;
}



// This is the Function Calling the Project Version for selected project
// Get Version Data pass the PrjKy
function GetDataSourceFromFindSp() {
    var prjky = $("#PMFilter_CmbPrj_Nm").data('kendoComboBox').value();

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
            //if (VersrnData.length < 1) {
            //    alert("No Sch .. !");
            //}
            //else if (VersrnData.length >= 1) {
            //tempPrjKy = VersrnData[0].PrjKy;
            tempVersrnData = VersrnData;

            for (j = 0; j < newtempVersrnData.length; j++)
                newtempVersrnData.remove(j);

            // Comment this lines bcz its not loading the "New Schdule Button" : VgSan | 
            //if (VersrnData.length == 1) {
            //    tempPrcsSchKy = VersrnData[0].PrcsSchKy;
            //    newtempVersrnData.push(VersrnData[0]);
            //    saveAsComponentsUIUpdate(tempPrjKy, tempPrcsSchKy, tempwithBaseLine);
            //}
            //else
            //{
            var viewModel = kendo.observable({
                projects: VersrnData
                ,
                change: function (arg) {
                    newtempVersrnData = [];
                    tempPrcsSchKy = arg.sender.dataItem(arg.sender.select()).PrcsSchKy;
                    for (i = 0; i < VersrnData.length; i++)
                        if (VersrnData[i].PrcsSchKy == tempPrcsSchKy)
                            newtempVersrnData.push(VersrnData[i]);
                    //saveAsComponentsUIUpdate(tempPrjKy, tempPrcsSchKy, tempwithBaseLine);
                }
            });
            kendo.bind($("#example"), viewModel);
            openProjectVersionselect();
            //}
            //}
            $.holdReady(false);
        }
    });
}

// Once we select the Version of Project
// Get GanttChart Data and call : LoadDataSource(data);
function goDrillGrid(PrjKy, PrcsSchKy, IsShowBaseLine) {

    tempPrjKy = $("#PMFilter_CmbPrj_Nm").data('kendoComboBox').value();
    if (tempPrjKy == null || tempPrjKy == undefined || tempPrjKy == 1) {
        alert("Select the Project ... !");
        return false;
    }

    varTaskIdFilterOnFilterOptinMenu = $("#taskIdFilterOnFilterOptinMenu").val();
    varTaskIdFilterOnFilterOptinMenuOption = $("#taskIdFilterOnFilterOptinMenuOption").data("kendoComboBox").value();

    closeProjectVersionselect();

    var filterOptionFrmDt = null;
    var filterOptionToDt = null;

    filterOptionFrmDt = $("#filteroptiondateFrom").val();
    filterOptionToDt = $("#filteroptiondateTo").val();

    var pageNo = $("#idPageNo").val();
    var pageSize = $("#idPageSize option:selected").val();

    $.holdReady(true);
    $.ajax({
        type: "GET",
        dataType: 'json',
        data: { PageNo: pageNo, PageSize: pageSize, PrjKy: tempPrjKy, PrcsSchKy: PrcsSchKy, IsShowBaseLine: IsShowBaseLine, ObjKy: 1, FrmDt: filterOptionFrmDt, ToDt: filterOptionToDt, TaskId: varTaskIdFilterOnFilterOptinMenu, TaskFilter: varTaskIdFilterOnFilterOptinMenuOption, isCrtclTask: temponlyCriticalTask, IsShowPreviousNonComplted: tempwithNotCompletedTask },
        url: urlGetSelectProjectScheduleDetails,//'/GanttChart/GetSelectProjectScheduleDetails',//'@Url.Action("GetSelectProjectScheduleDetails", "GanttChart")',
        converters:
    {
        "text json": function (data) {
            return $.parseJSON(data, true, true);
        }
    },
        success: function (data) {
            LoadDataSource(data);
            $.holdReady(false);
        }
    });
}

// Get Total Row Count From Server
function TotalRow() {   // Function for get totalRows from server side.        
    $.holdReady(true);
    $.ajax({
        type: "GET",
        dataType: 'json',
        url: urlGetGanttChartTotalRowNo,
        converters:
    {
        "text json": function (data) {
            return $.parseJSON(data, true, true);
        }
    },
        success: function (data) {
            totalRowCountFromServer = parseInt(data) - $("#idPageSize option:selected").val();
            $.holdReady(false);
        }
    });
}

// Update Project
function updateProject(sender, e) {
    tempPrjKy = $("#PMFilter_CmbPrj_Nm").data('kendoComboBox').value();
    if (tempPrjKy == null || tempPrjKy == undefined)
        tempPrjKy = 1;
    if (tempPrjKy > 1) {
        $.ajax({
            type: "POST",
            url: urlUpdateProject,//'/GanttChart/UpdateProject',//'@Url.Action("UpdateProject", "GanttChart")',
            dataType: "json",
            data: { PrjKy: tempPrjKy, PrcsSchKy: tempPrcsSchKy },
            async: false
        });
        alert("Project is updated!");
    } else {
        alert("Select the project ... !");
    }
}

function dialogNewProjectOpen() {
    $("#NewProjectDiv").show().kendoWindow({
        width: "250px",
        height: "150px",
        //position: { top: 100, left: "20%" },
        modal: true,
        title: "Create New Project"
    });

    $('#NewProjectDiv').data('kendoWindow').center().open();
    $('.k-window-content.k-content').css('background', '#D9D9D9');
    $('.ui-tabs-panel.ui-widget-content.ui-corner-bottom').css('background', '#D9D9D9');
    $('.ui-tabs-nav.ui-helper-reset.ui-helper-clearfix.ui-widget-header.ui-corner-all').css('background', '#3F51B5');
}

// Open Report Window in NewTab
function showReports(sender, e) {
    winDoialogElement = $("#idwin").kendoWindow({
        width: 1000,
        height: 1000
    }).data("kendoWindow");
    var url = "http://" + document.location.host + "/Report/PMReport.aspx";
    window.open(url, '_blank');
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

// SetViewHeight will be called by a containing sample browser, if any.
function SetViewHeight(height) {
    if ($gantt_container && $gantt_container.data("GanttControl")) {
        $gantt_container.data("GanttControl").setHeight(height);
    }
}

function leftConverter() {
    var ganttChart = this.data.GanttChart;
    var plannedStart = this.data.ActivityView.Activity.DataSource.PlannedStartTime;
    return "1px 0px 1px " + (plannedStart ? ganttChart.ConvertTimeToX(plannedStart) : 0) + "px";
}

// TODO : Some Research : May be its depend perfrmance
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


//Popup editong controler
function nameEditor($elem, options, data, ispopupEditing) {
    if (ispopupEditing)
        return "<input data-bind='value:Activity_M().ActivityName_M'/>";
    else
        return RadiantQ.Default.Template.ProjectGanttExpandableTextboxEditor();
}

function myStringify(sender) {

    var newArray = new Array();
    for (i = 0; i < sender.length; i++) {
        var bob = {
            ID: sender[i].ID,
            Lino: sender[i].Lino,
            PrcsID: sender[i].PrcsID,
            Name: sender[i].Name,
            Qty: sender[i].Qty,
            DlyPrgrsQtyThisSch: sender[i].DlyPrgrsQtyThisSch,
            TTLDlyPrgrsQty: sender[i].TTLDlyPrgrsQty,
            TrnUnitKy: sender[i].TrnUnitKy,
            TrnUnit: sender[i].TrnUnit,
            Rate: sender[i].Rate,
            RateWMrkUp: sender[i].RateWMrkUp,
            StartTime: sender[i].StartTime,
            EndTime: sender[i].EndTime,
            ProgressPercent: sender[i].ProgressPercent,
            PredecessorIndices: sender[i].PredecessorIndices,

            PrcsDetKy: sender[i].PrcsDetKy,
            PrcsSchDetKy: sender[i].PrcsSchDetKy,
            WrkHrs: sender[i].WrkHrs,
            IndentLevel: sender[i].IndentLevel,
            PlnWrkHrs: sender[i].PlnWrkHrs,
            WrkDays: sender[i].WrkDays,
            MasPlnSchDetKy: sender[i].MasPlnSchDetKy,
        };
        newArray.push(bob);
    }

    return newArray;
}


//$table = $("#ganttTable");
//$table.dblclick(function (event) {
function dblClickEventOnGantt(id) {
    //To get hold of double clicked row.

    //var $tdIdCol = $(event.target).closest(".IdDefineCol"); //(".rq-grid-idCol");
    //if ($tdIdCol.length > 0) {  // Only allow the first Id Col DblClick

    //var $tr = $(event.target).closest("tr");
    //activityView = $tr[0]["data-grid-item"];
    //activityName = activityView.Activity;
    //alert( activityName.DataSource.PrcsDetKy );
    var ganttControl = $('#gantt_container').data("GanttControl");
    activityName = ganttControl.Model.GetActivityById(id);


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

            try {
                $('#divGrid').data().kendoGrid.destroy();
                $('#divGrid').empty();
            } catch (e) { }
            loadBOQComponents_SelectWeb(tempPrjKy, activityName.DataSource.PrcsDetKy, activityName.DataSource);

            $.holdReady(false);
        }
    });

    //*************************************************************************
    //******************* This For Analazysis Resources ***********************
    //*************************************************************************
    SetSelectedItemToItemCombo(activityName.DataSource.PrcsSchDetKy, activityName.DataSource.PrcsDetKy, activityName.DataSource.ItmKy, activityName.DataSource.PrcsID + " : " + activityName.DataSource.Name);
    //*************************************************************************
    //*************************************************************************

    //*************************************************************************
    //******************* This For Analazysis Resources ***********************
    //*************************************************************************
    loadAnalyzisResrsTab(tempPrjKy, activityName.DataSource);
    //*************************************************************************
    //*************************************************************************

    //*************************************************************************
    //******************* This For Master Plan Link Tab ***********************
    //*************************************************************************
    //alert("PrcsDetKy : " + activityName.DataSource.PrcsDetKy + " , MasPlnSchDetKy : " + activityName.DataSource.MasPlnSchDetKy);
    jQuery("label[for='taskIDLabelDblClick']").html(activityName.DataSource.PrcsID);
    jQuery("label[for='taskNmLabelDblClick']").html(activityName.DataSource.Name);

    if (activityName.DataSource.MasPlnSchDetKy > 1) {
        var dataItem = $("#GridPrjMasPln_Select").data("kendoGrid").dataSource.get(activityName.DataSource.MasPlnSchDetKy);
        if (dataItem != undefined || dataItem != null) {
            jQuery("label[for='taskIDLabelMstPln']").html(dataItem.TaskID);
            jQuery("label[for='taskNmLabelMstPln']").html(dataItem.TaskNm);
        }
    }
    else {
        jQuery("label[for='taskIDLabelMstPln']").html("None");
        jQuery("label[for='taskNmLabelMstPln']").html("None");
    }
    //*************************************************************************
    //*************************************************************************

    //*************************************************************************
    //******************* Open Double Click Window****b ***********************
    //*************************************************************************
    $("#ganttTableDblClick").show().kendoWindow({
        width: "1200px",
        height: "655px",
        modal: true,
        title: "View And Manage Task Resource Details"
    });

    $('#ganttTableDblClick').data('kendoWindow').center().open();
    $("#ganttTableDblClick").data("kendoWindow").maximize();
    //*************************************************************************
    //*************************************************************************
    //}
}


$table = $("#ganttTable");
$table.dblclick(function (event) {
    //To get hold of double clicked row.

    //var $tdIdCol = $(event.target).closest(".IdDefineCol"); //(".rq-grid-idCol");
    //if ($tdIdCol.length > 0) {  // Only allow the first Id Col DblClick

    //var $tr = $(event.target).closest("tr");
    //activityView = $tr[0]["data-grid-item"];
    //activityName = activityView.Activity;
    //alert( activityName.DataSource.PrcsDetKy );
});

function dblClickEventOnGanttTrnUnit(id) {

    //alert(id);

    var ganttControl = $('#gantt_container').data("GanttControl");
    var activityName = ganttControl.Model.GetActivityById(id);

    //activityName.DataSource.TrnUnitKy = '50';

    OpenTaskEditDialog(activityName.DataSource);
}

var onBlurPrcsIDfire = 0;
function onfocusoutEventOnGanttPrcsID(id) {

    onBlurPrcsIDfire = onBlurPrcsIDfire + 1;


    if (onBlurPrcsIDfire == 3) {
        onBlurPrcsIDfire = 0;
    }

    //alert(id);
    if (onBlurPrcsIDfire == 1) {

        var ganttControl = $('#gantt_container').data("GanttControl");
        var activityName = ganttControl.Model.GetActivityById(id);
        var prcsDetKy = 1;

        if (activityName.DataSource.PrcsDetKy > 11) {//if (activityName.DataSource.PrcsDetKy == undefined)
            prcsDetKy = activityName.DataSource.PrcsDetKy;
        }

        //alert(prcsDetKy + " , " + activityName.DataSource.PrcsID);

        $.ajax({
            type: "POST",
            url: urlSetTaskData_Validation_GetTask, //NewLook,//'/GanttChart/SetTaskData',//'@Url.Action("SetTaskData", "GanttChart")',
            dataType: "json",
            data: {
                PrcsDetKy: prcsDetKy,
                TaskID: activityName.DataSource.PrcsID,
                PrjKy: tempPrjKy,
                PrcsSchKy: tempPrcsSchKy
            },
            async: false,
            success: function (data) {
                if (data.length > 0) {
                    alert("Duplicate found...!");
                    activityName.DataSource.PrcsDetKy = data[0].PrcsDetKy;
                    activityName.DataSource.Name = data[0].TaskNm;
                }
            },
            failure: function (errMsg) {
                alert(errMsg);
            }
        });
    }
    ////activityName.DataSource.TrnUnitKy = '50';

    ////OpenTaskEditDialog(activityName.DataSource);
}