//Global Variable
//---------------------------------------------

// Handling the Project Version Select Window
var isOpenProjectVersionselectWin = false;

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
var updatedTasksNewLook = new Array();

var calData = new Array();

var tempVersrnData = new Array();
var newtempVersrnData = new Array();
var tempPrcsSchKy = 0;
var tempSchDt = new Date().Date();
var tempSchToDt = new Date().Date();
var tempDocNo = "";
var tempPrjKy = 1;
var activityName = null;

var $schedule = null;
var $dialogDiv = null;

//var tempIsBaseline = 0;
var tempIsDefault = 0;
var temponlyCriticalTask = 0;
var tempwithNotCompletedTask = 0;
var tempwithBaseLine = 0;

var testData = new Array();
var jsonData = new Array();
var anchorTime = new Date().Date();
//var tTemplate = "<div class='rq-gc-taskbar' style=\"background-image:{{html UpdateBackgroundColorBinding()}} !important; border-color:{{html UpdateBorderColorBinding()}} !important\"></div>";
//var tTemplateSlider = "<div class='rq-gc-taskbar' data-bind='TaskColor: Activity.ProgressPercent' ><div id='GanttTaskBarLabel' class='rq-gc-taskbar-label'></div></div>";
var tTemplateSlider = "<div class='rq-gc-taskbar' style='background-image:${UpdateBackgroundColorBindingSlider(data)} !important; border-color:${ UpdateBorderColorBindingSlider(data)} !important'><div id='GanttTaskBarLabel' class='rq-gc-taskbar-label'></div></div>";
var tTemplateCritical = "<div class='rq-gc-taskbar' style='background-image:${UpdateBackgroundColorBinding(data)} !important; border-color:${ UpdateBorderColorBinding(data)} !important'><div id='GanttTaskBarLabel' class='rq-gc-taskbar-label'></div></div>";

var self = this;

this.jsonResrData = null;
var totalRowCountFromServer = 0;
var addClickCount = 0;     // Only First Time we need to add totalRowCountFromServer;
var tempIsMSImport = 0;
var tempIsNewSchDet = 0;

//---------------------------------------------
