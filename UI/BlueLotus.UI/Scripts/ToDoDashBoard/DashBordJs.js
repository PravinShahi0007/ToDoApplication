
var todayDate = new Date();
var dd = todayDate.getDate();
var mm = todayDate.getMonth() + 1; //January is 0!

var yyyy = todayDate.getFullYear();
if (dd < 10) {
    dd = "0" + dd;
}
if (mm < 10) {
    mm = "0" + mm;
}
var todayDate = dd + "/" + mm + "/" + yyyy;

var FormGlblData = {
    FormObjData: null,
    TrnTypKy: 1,
    AccessLvlKy: 1,
    ConfiLvlKy: 1,
    TrnKy: 1,
    AllDefalutValueObj: null,
    GotItemRate: 0,
    TimeStamp: "",
    PrjTypKy: 1,
    TempLiNumber: -1,
    TempBU: -1,
    TempPrj: -1,
    ISNeworUpdateTranction: 1,
    isAllowSaveByBackDate: 1,
    FromFindDate: todayDate,
    FromTrnKy: 1,
    OurCode2: null,
    AprStsLock: null,
    AprStsLockMsg: "",
    isAlwAcs: null,
    isAlwAdd: null,
    isAlwUpdate: null,
    isAlwDel: null,
    isAlwApr: null,
    selectedIndex: 0,
    AdrDuplicateFill: 0,
    FormGridArray: [],
    FindFormGridArray: []

};

$(document).ready(function () {
    GetFormObjData();
    // loadPriorityChrt();
    //LoadStatusChart();
   // LoadSampleReport()

});



function GetFormObjData() {
    $.ajax({
        url: urlUsrObjPrp_SelectAllLastChildWeb,
        dataType: "json",
        type: "POST",
        data: JSON.stringify({
            PrntKy: viewBag.ObjKy
        }),
        contentType: "application/json; charset=utf-8",
        success: function (HdrSectionFromDb) {
            FormGlblData.FormObjData = HdrSectionFromDb;
            DocReadyCus();
        }
    });
}


function LoadStatusChart(PrjKy, LeadAdrKy, CurAdrKy, PrcsStpKy, PrtyKy, PrcsObjKy, AprStsKy, PrcsDetCat1Ky) {
    $.ajax({
        url: DashBoard.DashBoard_StatusDashBoard,
        data: JSON.stringify({
            PrjKy: PrjKy,// 103734,
            LeadAdrKy: LeadAdrKy,//, 1,
            CurAdrKy: CurAdrKy,// 1,
            ObjKy: 123105,
            PrcsStpKy: PrcsStpKy,//1,
            PrtyKy: PrtyKy,//1,
            PrcsObjKy: PrcsObjKy,//1,
            AprStsKy: AprStsKy,//1,
            PrcsDetCat1Ky: PrcsDetCat1Ky//1,
        }),
        contentType: 'application/json; charset=utf-8',
        dataType: "Json",
        type: "POST",
        success: function (data) {

            CreateStatus(data)
        },
        error: function (e) {
            alert("Record Not Saved");
            LoadPrcsDetCmpnGrid();
            return false;
        }
    });

}

function LoadPieCharts() {
    var prjKy = $("#HdrSec1_CmbPrj_Cd").data('kendoComboBox').value();
    if (!prjKy) {
        alert("Priject is a must")
        return
    }
    var leadKy = $("#HdrSec1_CmbLeadAdr_Cd").data('kendoComboBox').value();
    if (!leadKy) {
        leadKy = 1
    }
    var curActKy = $("#HdrSec1_CmbCurActByAdr_Cd").data('kendoComboBox').value();
    if (!curActKy) {
        curActKy = 1
    }
    var prtyKy = $("#HdrSec2_CmbPrty_Cd").data('kendoComboBox').value();
    if (!prtyKy) {
        prtyKy = 1
    }
    var aprStatKy = $("#HdrSec2_Cmb_AprStates_Val").data('kendoComboBox').value();
    if (!aprStatKy) {
        aprStatKy = 1
    }
    var prcsDtKy = $("#HdrSec2_CmbPrcsDetCat1_Cd").data('kendoComboBox').value();
    if (!prcsDtKy) {
        prcsDtKy = 1
    }
    loadPriorityChrt(prjKy, leadKy, curActKy, 1, prtyKy, 1, aprStatKy, prcsDtKy)
    LoadStatusChart(prjKy, leadKy, curActKy, 1, prtyKy, 1, aprStatKy, prcsDtKy);
    LoadPendingChrt(prjKy, leadKy, curActKy, 1, prtyKy, 1, aprStatKy, prcsDtKy)
}

function loadPriorityChrt(PrjKy, LeadAdrKy, CurAdrKy, PrcsStpKy, PrtyKy, PrcsObjKy, AprStsKy, PrcsDetCat1Ky) {
    $.ajax({
        url: DashBoard.DashBoard_Priority,
        data: JSON.stringify({
            PrjKy: PrjKy,// 103734,
            LeadAdrKy: LeadAdrKy, //1,
            CurAdrKy: CurAdrKy,// 1,
            ObjKy: 123105,
            PrcsStpKy: PrcsStpKy,//1,
            PrtyKy: PrtyKy,//1,
            PrcsObjKy: PrcsObjKy,//1,
            AprStsKy: AprStsKy,//1,
            PrcsDetCat1Ky: PrcsDetCat1Ky//1,
        }),
        contentType: 'application/json; charset=utf-8',
        dataType: "Json",
        type: "POST",
        success: function (data) {
            createChart(data)
        },
        error: function (e) {
            alert("something went wrong ");
            //     LoadPrcsDetCmpnGrid();
            return false;
        }
    });
}


function LoadPendingChrt(PrjKy, LeadAdrKy, CurAdrKy, PrcsStpKy, PrtyKy, PrcsObjKy, AprStsKy, PrcsDetCat1Ky) {
    $.ajax({
        url: DashBoard.DashBoard_Pending,
        data: JSON.stringify({
            PrjKy: PrjKy,// 103734,
            LeadAdrKy: LeadAdrKy, //1,
            CurAdrKy: CurAdrKy,// 1,
            ObjKy: 123105,
            PrcsStpKy: PrcsStpKy,//1,
            PrtyKy: PrtyKy,//1,
            PrcsObjKy: PrcsObjKy,//1,
            AprStsKy: AprStsKy,//1,
            PrcsDetCat1Ky: PrcsDetCat1Ky//1,
        }),
        contentType: 'application/json; charset=utf-8',
        dataType: "Json",
        type: "POST",
        success: function (data) {
            createPendingChart(data)
        },
        error: function (e) {
            alert("something went wrong ");
            //     LoadPrcsDetCmpnGrid();
            return false;
        }
    });
}


function CreateStatus(data) {
    $("#chart2").kendoChart({
        title: {
            text: "Task According to status"
        },
        legend: {
            position: "bottom"
        },
        dataSource: {
            data: data
        },
        series: [{
            type: "pie",
            field: "count",
            categoryField: "Status"
        }], seriesDefaults: {
            labels: {
                template: "#= category # - #= kendo.format('{0:P}', percentage)#",
                position: "outsideEnd",
                visible: true,
                background: "transparent"
            }
        },
        seriesColors: ["#03a9f4", "#ff9800", "#fad84a", "#4caf50"],
        tooltip: {
            visible: true,
            template: "${ category } - ${ value }"
        }
    });

}


function createChart(data) {
    $("#chart").kendoChart({
        title: {
            text: "Task According to Priority"
        },
        legend: {
            position: "bottom"
        },
        dataSource: {
            data: data
        },
        series: [{
            type: "pie",
            field: "count",
            categoryField: "Status"
        }], seriesDefaults: {
            labels: {
                template: "#= category # - #= kendo.format('{0:P}', percentage)#",
                position: "outsideEnd",
                visible: true,
                background: "transparent"
            }
        },
        seriesClick: function (e) {
            // alert(e.category)
            LoadPriorityTaskListGrid(e.category)


            //alert(e.series.type)
            //if (e.originalEvent.type === "contextmenu") {
            //    // Disable browser context menu
            //    e.originalEvent.preventDefault();
            //}
        },
        seriesColors: ["#03a9f4", "#ff9800", "#fad84a", "#4caf50"],
        tooltip: {
            visible: true,
            template: "${ category } - ${ value }"
        }
    });
}



function createPendingChart(data) {
    $("#PendingTask").kendoChart({
        title: {
            text: "Task According to Priority"
        },
        legend: {
            position: "bottom"
        },
        dataSource: {
            data: data
        },
        series: [{
            type: "pie",
            field: "count",
            categoryField: "Status"
        }], seriesDefaults: {
            labels: {
                template: "#= category # - #= kendo.format('{0:P}', percentage)#",
                position: "outsideEnd",
                visible: true,
                background: "transparent"
            }
        },
        seriesClick: function (e) {
            // alert(e.category)
            LoadPriorityTaskListGrid(e.category)


            //alert(e.series.type)
            //if (e.originalEvent.type === "contextmenu") {
            //    // Disable browser context menu
            //    e.originalEvent.preventDefault();
            //}
        },
        seriesColors: ["#03a9f4", "#ff9800", "#fad84a", "#4caf50"],
        tooltip: {
            visible: true,
            template: "${ category } - ${ value }"
        }
    });
}
function LoadPriorityTaskListGrid(category) {
    try {
        $("#PrirityTaskGrid").data("kendoGrid").dataSource.filter(null);
        $("#PrirityTaskGrid").data("kendoGrid").dataSource.data([]);
    } catch (e) {
        GetPriorityTaskList();
    }
    LoadDatasource(category);
    $("#PriorityList")
        .show()
        .kendoWindow({
            width: "80%",
            height: "75%",
            modal: true,
            title: "Task History"
        });

    $("#PriorityList").data("kendoWindow").center().open();
}

function LoadDatasource(categoryName) {
    var prjKy = $("#HdrSec1_CmbPrj_Cd").data('kendoComboBox').value();
    if (!prjKy) {
        alert("Priject is a must")
        return
    }
    var leadKy = $("#HdrSec1_CmbLeadAdr_Cd").data('kendoComboBox').value();
    if (!leadKy) {
        leadKy = 1
    }
    var curActKy = $("#HdrSec1_CmbCurActByAdr_Cd").data('kendoComboBox').value();
    if (!curActKy) {
        curActKy = 1
    }
    var prtyKy = $("#HdrSec2_CmbPrty_Cd").data('kendoComboBox').value();
    if (!prtyKy) {
        prtyKy = 1
    }
    var aprStatKy = $("#HdrSec2_Cmb_AprStates_Val").data('kendoComboBox').value();
    if (!aprStatKy) {
        aprStatKy = 1
    }
    var prcsDtKy = $("#HdrSec2_CmbPrcsDetCat1_Cd").data('kendoComboBox').value();
    if (!prcsDtKy) {
        prcsDtKy = 1
    }
    //prjKy, leadKy, curActKy, 1, prtyKy, 1, aprStatKy, prcsDtKy)
    //loadPriorityChrt(PrjKy, LeadAdrKy, CurAdrKy, PrcsStpKy, PrtyKy, PrcsObjKy, AprStsKy, PrcsDetCat1Ky)
    $.ajax({
        url: urlPriorityList,
        data: JSON.stringify({
            PrjKy: prjKy,// 103734,
            LeadAdrKy: leadKy, //1,
            CurAdrKy: curActKy,// 1,
            ObjKy: 123105,
            PrcsStpKy: 1,//1,
            PrtyKy: prtyKy,//1,
            PrcsObjKy: 1,//1,
            AprStsKy: aprStatKy,//1,
            PrcsDetCat1Ky: prcsDtKy,//1,
            categoryName: categoryName
        }),
        contentType: 'application/json; charset=utf-8',
        dataType: "Json",
        type: "POST",
        success: function (data) {
            var ds = new kendo.data.DataSource({
                data: data
            });

            $("#PrirityTaskGrid").data("kendoGrid").setDataSource(ds);
        },
        error: function (e) {
            return false;
        }
    });
}


var CdMasModel = {
    IsTrnRateInclusiveTaxTyp1_VAT: 0, // IsTrnRateInclusiveTaxTyp1_VAT : isCd27
    TrnMinDate: "", // Back date Transaction Purpose
    TrnMaxDate: "" // Future Date Transaction Purpose
};

function GetFormObjData() {

    $.ajax({
        url: urlUsrObjPrp_SelectAllLastChildWeb,
        dataType: "json",
        type: "POST",
        data: JSON.stringify({
            PrntKy: viewBag.ObjKy
        }),
        contentType: "application/json; charset=utf-8",
        success: function (HdrSectionFromDb) {
            console.log("GetFormObjData")
            FormGlblData.FormObjData = HdrSectionFromDb;
            //New ObjMas Function 
            HideTheProperty(FormGlblData.FormObjData);

            //Old ObjMas Function
            //FormGlblData.AllDefalutValueObj = Get_AllDefalutValue_Obj();
            //FormGlblData.AllValidationObj = Get_All_Validation_Obj();
            //FormGlblData.AllValidationObj = sortByKey(FormGlblData.AllValidationObj, "ValidationOrder");
            DocReadyCus();
        }
    });
}

function DocReadyCus() {
    console.log("DocReadyCus")
    LoadPrjCombo();
    LoadLeadAdrCombo();
    LoadCuractAdr();
    LoadPrtyCombo();
    LoadApproveCombo();
    PrcsDetCat1();
    GetPriorityTaskList();
}



function LoadPrjCombo() {
    console.log("LoadProject")
    $("#HdrSec1_CmbPrj_Cd").kendoComboBox({
        dataValueField: "PrjKy",
        dataTextField: "PrjId",
        dataSource: PrjId_SelectMob_DataSource('HdrSec1_CmbPrj'),
        change: function (e) {

            var cmb = $("#HdrSec1_CmbPrj_Cd").data("kendoComboBox");
            var prjKy = cmb.value();
            PrjKy = prjKy;
            if (prjKy != "") {
                $("#HdrSec1_CmbPrj_Nm").data("kendoComboBox").value(prjKy);
                LoadPieCharts()
            } else {
                $("#HdrSec1_CmbPrj_Nm").data("kendoComboBox").value("");
            }
        },
        filter: "contains",
        suggest: true,
        placeholder: "Select a Project..."
    });

    $("#HdrSec1_CmbPrj_Nm").kendoComboBox({
        dataValueField: "PrjKy",
        dataTextField: "PrjNm",
        dataSource: PrjNm_SelectMob_DataSource('HdrSec1_CmbPrj'),
        change: function (e) {
            var cmb = $("#HdrSec1_CmbPrj_Nm").data("kendoComboBox");
            var PrjKy = cmb.value();
            if (!ComboValidations("HdrSec1_CmbPrj_Nm")) {
                alert("'" + prjKy + "' is not a Valid input");
                cmb.value("");
            }

            else {
                if (PrjKy != "") {
                    $("#HdrSec1_CmbPrj_Cd").data("kendoComboBox").value(PrjKy);
                    LoadGrid();
                } else {
                    $("#HdrSec1_CmbPrj_Cd").data("kendoComboBox").value("");
                }
            }

        },
        filter: "contains",
        suggest: true,
        placeholder: "Select a Project..."
    });
}


function LoadLeadAdrCombo() {
    $("#HdrSec1_CmbLeadAdr_Cd").kendoComboBox({
        dataValueField: "AdrKy",
        dataTextField: "AdrID",
        dataSource: AdrID_SelectMob_DataSource('HdrSec1_CmbLeadAdr'),
        change: function (e) {
            var cmb = $("#HdrSec1_CmbLeadAdr_Cd").data("kendoComboBox");
            var LeadAdrKy = cmb.value();
            if (!ComboValidations("HdrSec1_CmbLeadAdr_Cd")) {
                alert("'" + LeadAdrKy + "' is not a Valid input");
                cmb.value("");
            }

            else {
                if (LeadAdrKy != "") {
                    $("#HdrSec1_CmbLeadAdr_Nm").data("kendoComboBox").value(LeadAdrKy);
                    LoadPieCharts();

                } else {
                    $("#HdrSec1_CmbLeadAdr_Nm").data("kendoComboBox").value("");

                }
            }

        },
        filter: "contains",
        suggest: true,
        placeholder: "Select a Lead Address..."
    });

    $("#HdrSec1_CmbLeadAdr_Nm").kendoComboBox({
        dataValueField: "AdrKy",
        dataTextField: "AdrNm",
        dataSource: AdrNm_SelectMob_DataSource('HdrSec1_CmbCurActByAdr'),
        change: function (e) {
            var cmb = $("#HdrSec1_CmbLeadAdr_Nm").data("kendoComboBox");
            var LeadAdrKy = cmb.value();
            if (!ComboValidations("HdrSec1_CmbLeadAdr_Nm")) {
                alert("'" + LeadAdrKy + "' is not a Valid input");
                cmb.value("");
            }

            else {
                if (LeadAdrKy != "") {
                    $("#HdrSec1_CmbLeadAdr_Cd").data("kendoComboBox").value(LeadAdrKy);
                    LoadPieCharts()

                } else {
                    $("#HdrSec1_CmbLeadAdr_Cd").data("kendoComboBox").value("");
                }
            }

        },
        filter: "contains",
        suggest: true,
        placeholder: "Select a Lead Address..."
    });
}

function LoadCuractAdr() {
    $("#HdrSec1_CmbCurActByAdr_Cd").kendoComboBox({
        dataValueField: "AdrKy",
        dataTextField: "AdrID",
        dataSource: AdrID_SelectMob_DataSource('HdrSec1_CmbCurActByAdr'),
        change: function (e) {
            var cmb = $("#HdrSec1_CmbCurActByAdr_Cd").data("kendoComboBox");
            var CurAdrKy = cmb.value();
            if (!ComboValidations("HdrSec1_CmbCurActByAdr_Cd")) {
                alert("'" + CurAdrKy + "' is not a Valid input");
                cmb.value("");
            }

            else {
                if (CurAdrKy != "") {
                    $("#HdrSec1_CmbCurActByAdr_Nm").data("kendoComboBox").value(CurAdrKy);
                    LoadPieCharts()

                } else {
                    $("#HdrSec1_CmbCurActByAdr_Nm").data("kendoComboBox").value("");
                }
            }

        },
        filter: "contains",
        suggest: true,
        placeholder: "Select a Current Address..."
    });

    $("#HdrSec1_CmbCurActByAdr_Nm").kendoComboBox({
        dataValueField: "AdrKy",
        dataTextField: "AdrNm",
        dataSource: AdrNm_SelectMob_DataSource('HdrSec1_CmbCurActByAdr'),
        change: function (e) {
            var cmb = $("#HdrSec1_CmbCurActByAdr_Nm").data("kendoComboBox");
            var CurAdrKy = cmb.value();
            if (!ComboValidations("HdrSec1_CmbCurActByAdr_Nm")) {
                alert("'" + CurAdrKy + "' is not a Valid input");
                cmb.value("");
            }

            else {
                if (CurAdrKy != "") {
                    $("#HdrSec1_CmbCurActByAdr_Cd").data("kendoComboBox").value(CurAdrKy);
                    LoadPieCharts()

                } else {
                    $("#HdrSec1_CmbCurActByAdr_Cd").data("kendoComboBox").value("");
                }
            }

        },
        filter: "contains",
        suggest: true,
        placeholder: "Select a Current Address..."
    });
}

function LoadPrtyCombo() {
    $("#HdrSec2_CmbPrty_Cd").kendoComboBox({
        dataValueField: "CdKy",
        dataTextField: "Code",
        dataSource: Code_SelectMob_Datasource('HdrSec2_CmbPrty'),
        change: function (e) {
            var cmb = $("#HdrSec2_CmbPrty_Cd").data("kendoComboBox");
            var PrtyKy = cmb.value();

            if (PrtyKy != "") {
                $("#HdrSec2_CmbPrty_Nm").data("kendoComboBox").value(PrtyKy);
                LoadPieCharts()

            } else {
                $("#HdrSec2_CmbPrty_Nm").data("kendoComboBox").value("");
            }
        },
        filter: "contains",
        suggest: true,
        placeholder: "Select Priority.."
    });

    $("#HdrSec2_CmbPrty_Nm").kendoComboBox({
        dataValueField: "CdKy",
        dataTextField: "CdNm",
        dataSource: CdNm_SelectMob_Datasource('HdrSec2_CmbPrty'),
        change: function (e) {
            var cmb = $("#HdrSec2_CmbPrty_Nm").data("kendoComboBox");
            var PrtyKy = cmb.value();

            if (PrtyKy != "") {
                $("#HdrSec2_CmbPrty_Cd").data("kendoComboBox").value(PrtyKy);
                LoadPieCharts()
            }
            else {
                $("#HdrSec2_CmbPrty_Cd").data("kendoComboBox").value("");
            }
        },
        filter: "contains",
        suggest: true,
        placeholder: "Select Priority.."
    });
}
function LoadApproveCombo() {
    $("#HdrSec2_Cmb_AprStates_Val").kendoComboBox({
        dataTextField: "CdNm",
        dataValueField: "CdKy",
        dataSource: CdNm_SelectMob_Datasource('HdrSec2_Cmb_AprStates'),
        change: function (e) {
            var comboboxText = $("#HdrSec2_Cmb_AprStates_Val").data("kendoComboBox");
            var cmbValue = comboboxText.value();
            //if (isNaN('HdrSec2_Cmb_AprStates')) {
            //    alert("'" + cmbValue + "' is not a Valid input");
            //    comboboxText.value("");
            //}
            $("#HdrSec2_Cmb_AprStates_Val").data("kendoComboBox").value(cmbValue);
            LoadPieCharts()
        },
        filter: "contains",
        suggest: true,
        placeholder: "Status"
    });
}


function PrcsDetCat1() {
    $("#HdrSec2_CmbPrcsDetCat1_Cd").kendoComboBox({
        dataValueField: "CdKy",
        dataTextField: "Code",
        dataSource: Code_SelectMob_Datasource('HdrSec2_PrcsDetCat1'),
        change: function (e) {
            var cmb = $("#HdrSec2_CmbPrcsDetCat1_Cd").data("kendoComboBox");
            var PrcsDetCat = cmb.value();
            if (!ComboValidations("HdrSec2_CmbPrcsDetCat1_Cd")) {
                alert("'" + PrcsDetCat + "' is not a Valid input");
                cmb.value("");
            }

            else {
                if (PrcsDetCat != "") {
                    $("#HdrSec2_CmbPrcsDetCat1_Cd").data("kendoComboBox").value(PrcsDetCat);
                    LoadPieCharts()
                }
                else {
                    $("#HdrSec2_CmbPrcsDetCat1_Cd").data("kendoComboBox").value("");
                }
            }

        },
        filter: "contains",
        suggest: true,
        placeholder: "Select Task.."
    });

}

function ComboValidations(cmbNm) {
    var cmb = $("#" + cmbNm + "").data("kendoComboBox");
    var dataItem = cmb.dataItem();
    if (!dataItem) {
        alert("'" + cmb.value() + "' is not a Valid input");
        $("#" + cmbNm + "").data("kendoComboBox").value("");
        return false;
    } else {
        return true;
    }
}




function GetPriorityTaskList() {
    var dataSource = new kendo.data.DataSource({
        batch: true,
        pageSize: 10,
        schema: {
            model: {
                id: "TrnKy",
                fields: //Relavent fields of the grid should be bind with following model items
                {
                    TaskID: { editable: false, nullable: false, type: "string" },
                    TaskNm: { editable: false, nullable: false, type: "string" },
                    LeadAdrID: { editable: false, nullable: false, type: "string" },
                    CurAdrID: { editable: false, nullable: false, type: "string" },
                    Priority: { editable: false, nullable: false, type: "string" },
                    AprSts: { editable: false, nullable: true, type: "string" },
                    //Type: { editable: false, nullable: true, type: "string" },                   
                }
            }
        }
    });

    $("#PrirityTaskGrid").kendoGrid({
        dataSource: dataSource,
        autobind: true,
        navigatable: true,
        filterable: {
            mode: "row"
        },
        pageable: true,
        sortable: true,
        reorderable: true,
        columnMenu: true,
        selectable: "column",
        pageable: { refresh: true, pageSizes: [5, 10, 20, 50, 100] },
        columns: [
            {
                field: "TaskID", title: "Task ID", width: "100px",
            },

            {
                field: "TaskNm", title: "TaskNm", width: "250px",
            },
            {
                field: "LeadAdrID", title: "Lead Adress", width: "50px",

            },
            {
                field: "CurAdrID",
                title: "Current Address",
                width: "100px",
            },
            {
                field: "Priority", title: "Priority", width: "100px",
            },

            {
                field: "AprSts", title: "Status", width: "100px",
            },
            //{
            //    field: "Type", title: "Type", width: "100px",
            //},            

        ],

        resizable: true,

        dataBinding: function () {
            record = (this.dataSource.page() - 1) * this.dataSource.pageSize();
        },


        editable: false,
    });
}

function LoadSampleReport() {
    var dataset = [{
        category: "Hydro",
        value: 500
    }, {
        category: "Solar",
        value: 350
    }, {
        category: "Nuclear",
        value: 200
    }, {
        category: "Wind",
        value: 50
    }];
    $("#SampleChart").kendoChart({
        title: {
            text: "Break-up of Spain Electricity Production for 2008"
        },
        legend: {
            position: "bottom"
        },
        seriesDefaults: {
            labels: {
                visible: true,
                format: "{0}"
            }
        },
        series: [{
            type: "pie",
            data: dataset,
            field: "value",
            categoryField: "category"
        }],
        seriesColors: ["#03a9f4", "#ff9800", "#fad84a", "#4caf50"],
        tooltip: {
            visible: true,
            template: "${ category } - ${ value }"
        },
        //seriesDefaults: {
        //    labels: {
        //        template: "#= category # - #= kendo.format('{0:P}', percentage)#",  Percentage part
        //        position: "outsideEnd",
        //        visible: true,
        //        background: "transparent"
        //    }
        //}
        });
}

