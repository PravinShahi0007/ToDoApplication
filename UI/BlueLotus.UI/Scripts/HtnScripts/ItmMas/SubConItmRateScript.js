

var FormGlblData = {
    FormObjData: null,
    AccessLvlKy: 1,
    ConfiLvlKy: 1,
    TrnKy: 1,
    ItmTypKy: 1,
    PrjTypKy: 1
}


$(document).ready(function () {

    var todayDate = new Date();
    $('#RevsnDt').data("kendoDatePicker").value(todayDate);
    $("#GridWin").hide();
    $("#HdrSec2").hide();
    $("#HdrSec3").hide();
    $("#HdrSec4").hide();

    var height = $(window).height() - 70;
    var h2 = $("#filterCont").height();
    $("#body").height(height);
    //$("#grid").height(height - (35 + h2 + 40));

    $.ajax({
        url: urlCodes.GetCdKyByConCdAndOurCd,
        dataType: "json",
        type: "POST",
        data: JSON.stringify({
            ObjKy: viewBag.ObjKy,
            ConCd: 'ItmTyp',
            OurCd: viewBag.OurCd
        }),
        contentType: 'application/json; charset=utf-8',
        success: function (ItmTypKy) {

            FormGlblData.ItmTypKy = (ItmTypKy == 0 ? 1 : ItmTypKy);
            GetFormObjData();
        }
    });

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
        }
    });
}


function DocReadyCus() {
    setHdrSectionPropFun();
    LoadCombo();
    LoadUnitCombo(1);
    $("#HdrSec4_NmricRate_Val").kendoNumericTextBox({ min: 0, spinners: false });
    $("#HdrSec4_NmricLiNo_Val").kendoNumericTextBox({ min: 0, spinners: false });
    $("#HdrSec4_NmricLiNo_Val").data('kendoNumericTextBox').value(0.00);
    $("#HdrSec2_CmbItem_Nm").width(400);
}

function setHdrSectionPropFun() {
    // ---------- Set ObjProperties
    setHdrSectionProp('', viewBag.ObjKy, '', 'HdrSec1');
    setHdrSectionProp('', viewBag.ObjKy, '', 'HdrSec2');
    setHdrSectionProp('', viewBag.ObjKy, '', 'HdrSec3');
    setHdrSectionProp('', viewBag.ObjKy, '', 'HdrSec4');

    SetHandlingEnterKeyEvent('', viewBag.ObjKy);
}


jQuery.fn.center = function (parent) {
    if (parent) {
        parent = this.parent();
    } else {
        parent = window;
    }
    this.css({
        "position": "absolute",
        "top": ((($(parent).height() - this.outerHeight()) / 2) + $(parent).scrollTop() + "px"),
        "left": ((($(parent).width() - this.outerWidth()) / 2) + $(parent).scrollLeft() + "px")
    });
    return this;
}

var ConrlConKy = 0;


$("#RevsnDt").width(200).kendoDatePicker({
    format: "dd/MM/yyyy",
    min: new Date(2009, 2, 31)
});
$("#RevsnDt").closest("span.k-datepicker").width(200);

$("#PresDt").width(200).kendoDatePicker({

    format: "dd/MM/yyyy",
    min: new Date(2009, 2, 31)
});
$("#PresDt").closest("span.k-datepicker").width(250);


function insertItem() {   //---------- Insert a row inside Grid view----
    var grid = $("#grid").data("kendoGrid");
    grid.addRow();
}

function CancelGridItem() {
    var grid = $("#grid").data("kendoGrid");
    grid.cancelChanges();
    Clear();
    //$("#grid").data("kendoGrid").cancelChanges();
}

//------------- Insert and Update Grid--------------
function Save() {
    var grid = $("#grid").data("kendoGrid");
    var LocKy = $("#HdrSec1_CmbLoc_Cd").val();
    if (LocKy == null || LocKy == undefined || LocKy == 0) {
        LocKy = 1;
    }
    var PrjKy = $("#HdrSec1_CmbPrj_Cd").val();
    if (PrjKy == null || PrjKy == undefined || PrjKy == 0) {
        PrjKy = 1;
    }
    var RevsnDt = $("#RevsnDt").val();
    var currentData = grid.dataSource.data();
    var updatedRecords = [];
    var newRecords = [];

    for (var i = 0; i < currentData.length; i++) {

        if (currentData[i].isNew()) {
            newRecords.push(currentData[i].toJSON());
        } else if (currentData[i].dirty) {
            updatedRecords.push(currentData[i].toJSON());
        }
    }

    var tempSAveChech = true;

    if (newRecords.length != 0 || updatedRecords.length != 0) {

        if (tempSAveChech) {
            //ajax for unsert update and delete
            $.ajax({
                url: URLUpdateSubconRate,
                data: JSON.stringify({
                    ObjKy: viewBag.ObjKy,
                    updateAccmacc: kendo.stringify(updatedRecords),
                    newAccmacc: kendo.stringify(newRecords),
                    OurCd: viewBag.OurCd
                }),
                contentType: "application/json; charset=utf-8",
                dataType: "Json",
                type: "POST",
                success: function (data) {

                    if (data == true) {
                        alert("Successfully Saved..!");
                        LoadGridViewColumn(); // update grid
                    } else {
                        alert("Record Not Saved");
                        LoadGridViewColumn(); // update grid
                    }
                },
                error: function (e) {
                    return false;
                }
            });
        }
    }
}

function TrncDatasource() {
    var dataSource = new kendo.data.DataSource(
      {
          transport: {
              read: {
                  url: URLTrncDataSource,
                  dataType: "json"
              }
          }
      });
    return dataSource;
}

function PusFmDatasource() {
    var dataSource = new kendo.data.DataSource(
      {
          transport: {
              read: {
                  url: URLPusFmDatasource,
                  dataType: "json"
              }
          }
      });
    return dataSource;
}

function LocDatasource() {
    var dataSource = new kendo.data.DataSource(
      {
          transport: {
              read: {
                  url: URLLocDatasource,
                  dataType: "json"
              }
          }

      });
    return dataSource;
}

function ProjectDatasource() {
    var dataSource = new kendo.data.DataSource(
      {
          transport: {
              read: {
                  url: URLProjectDatasource,
                  dataType: "json"
              }
          }

      });
    return dataSource;
}

function ItmTypDatasource() {
    var dataSource = new kendo.data.DataSource(
      {
          transport: {
              read: {
                  url: URLItmTypDatasource,
                  dataType: "json"
              }
          }

      });
    return dataSource;
}

function TaskDatasource(PrjKy) {
    //var PrjKy = $("#HdrSec1_CmbPrj_Cd").data("kendoComboBox").value();
    if (PrjKy == undefined || PrjKy == null || PrjKy == "") PrjKy = 1;
    var dataSource = new kendo.data.DataSource(
      {
          transport: {
              read: {
                  url: urlComboLoad.Task_SelectWeb,
                  data: {
                      PrjKy: PrjKy
                  },
                  dataType: "json"
              }
          }
      });
    return dataSource;
}

function LoadCombo() {
    $("#HdrSec1_CmbItmTyp_Cd").kendoComboBox({
        dataTextField: "Code",
        dataValueField: "CdKy",
        dataSource: Code_SelectMob_Datasource('HdrSec1_CmbItmTyp'),
        filter: "startswith",
        suggest: true,
        placeholder: "Select a ItemTyp",
        change: function (e) {
            LoadItemWith_ItmTypCombo($("#HdrSec1_CmbItmTyp_Cd").data("kendoComboBox").value())
        }
    });

    $("#HdrSec1_CmbPrj_Cd").kendoComboBox({
        dataValueField: "PrjKy",
        dataTextField: "PrjId",
        dataSource: PrjId_SelectMob_DataSource('HdrSec1_CmbPrj'),
        change: function (e) {
            var cmb = $("#HdrSec1_CmbPrj_Cd").data("kendoComboBox");
            var PrjKyval = cmb.value();
            if (PrjKyval == "" || PrjKyval == undefined || PrjKyval == null) {
                alert(PrjKyval + " is not valid Project");
                $("#HdrSec1_CmbPrj_Cd").data("kendoComboBox").value(1);
                $("#HdrSec1_CmbPrj_Cd").data("kendoComboBox").text("");
            }
            else {
                //$("#HdrSec1_CmbPrj_Cd").data("kendoComboBox").value(prjky);
                TaskComboLoad(PrjKyval);
            }
        },
        filter: "startswith",
        suggest: true,
        hidden: true,
        placeholder: "Select a Project"
    });

    $("#HdrSec1_CmbLoc_Cd").kendoComboBox({
        dataValueField: "CdKy",
        dataTextField: "Code",
        dataSource: Code_SelectMob_Datasource('HdrSec1_CmbLoc'),
        filter: "startswith",
        suggest: true,
        placeholder: "Select a Location"
    });

    $("#HdrSec1_CmbSubConAcc_Cd").kendoComboBox({
        dataValueField: "AccKy",
        dataTextField: "AccCd",
        dataSource: AccCd_SelectMob_Datasource('HdrSec1_CmbSubConAcc'),
        filter: "startswith",
        suggest: true,
        placeholder: "Select a Account"
    });    

    $("#hdrsec3_CmbAdr_Cd").kendoComboBox({
        dataValueField: "AdrKy",
        dataTextField: "AdrID",
        dataSource: AdrID_SelectMob_DataSource('hdrsec3_CmbAdr'),
        change: function (e) {
            var cmbVal = $("#hdrsec3_CmbAdr_Cd").data("kendoComboBox").value();
            $("#hdrsec3_CmbAdr_Nm").data("kendoComboBox").value(cmbVal);
        },
        filter: "startswith",
        suggest: true,
        placeholder: "Select Address ID"
    });

    $("#hdrsec3_CmbAdr_Nm").kendoComboBox({
        dataValueField: "AdrKy",
        dataTextField: "AdrNm",
        dataSource: AdrNm_SelectMob_DataSource('hdrsec3_CmbAdr'),
        change: function (e) {
            var cmbVal = $("#hdrsec3_CmbAdr_Nm").data("kendoComboBox").value();
            $("#hdrsec3_CmbAdr_Cd").data("kendoComboBox").value(cmbVal);
        },
        filter: "startswith",
        suggest: true,
        placeholder: "Select Address"
    });

    $("#hdrsec3_CmbLoc_Cd").kendoComboBox({
        dataValueField: "CdKy",
        dataTextField: "Code",
        dataSource: Code_SelectMob_Datasource('hdrsec3_CmbLoc'),
        change: function (e) {
            var cmbVal = $("#hdrsec3_CmbLoc_Cd").data("kendoComboBox").value();
            $("#hdrsec3_CmbLoc_Nm").data("kendoComboBox").value(cmbVal);
        },
        filter: "startswith",
        suggest: true,
        placeholder: "Select Address"
    });

    $("#hdrsec3_CmbLoc_Nm").kendoComboBox({
        dataValueField: "CdKy",
        dataTextField: "CdNm",
        dataSource: CdNm_SelectMob_Datasource('hdrsec3_CmbLoc'),
        change: function (e) {
            var cmbVal = $("#hdrsec3_CmbLoc_Nm").data("kendoComboBox").value();
            $("#hdrsec3_CmbLoc_Cd").data("kendoComboBox").value(cmbVal);
        },
        filter: "startswith",
        suggest: true,
        placeholder: "Select Address"
    });

    $("#cmbPusFm").kendoComboBox({
        dataValueField: "CKy",
        dataTextField: "Code",
        dataSource: PusFmDatasource(),
        filter: "startswith",
        suggest: true,
        placeholder: "Select a Purches Form"
    });


    $("#cmbTrnTyp").kendoComboBox({
        dataValueField: "CdKy",
        dataTextField: "Code",
        dataSource: TrncDatasource(),
        filter: "startswith",
        suggest: true,
        placeholder: "Select a Trancstion Type"
    });

    LoadItemWith_ItmTypCombo(1);

    $("#HdrSec1_CmbItmTyp_Cd").parent().css('width', "200px");
    $("#HdrSec1_CmbPrj_Cd").parent().css('width', "200px");
    $("#HdrSec1_CmbLoc_Cd").parent().css('width', "200px");
    $("#cmbPusFm").parent().css('width', "200px");
    $("#cmbTrnTyp").parent().css('width', "200px");
}

function LoadItemWith_ItmTypCombo(PreKy)
{
    if (PreKy == "" || PreKy == undefined || PreKy == null) PreKy = 1;
    $("#HdrSec2_CmbItem_Cd").kendoComboBox({
        dataValueField: "ItmKy",
        dataTextField: "ItmCd",
        dataSource: ItmCd_SelectMob_DatasourceWithPreKy('HdrSec2_CmbItem', PreKy),
        change: function (e) {
            var cmbVal = $("#HdrSec2_CmbItem_Cd").data("kendoComboBox").value();
            $("#HdrSec2_CmbItem_Nm").data("kendoComboBox").value(cmbVal);
            LoadUnitCombo(cmbVal);
        },
        filter: "startswith",
        suggest: true,
        placeholder: "Select Item Code"
    });

    $("#HdrSec2_CmbItem_Nm").kendoComboBox({
        dataValueField: "ItmKy",
        dataTextField: "ItmNm",
        dataSource: ItmNm_SelectMob_DatasourceWithPreKy('HdrSec2_CmbItem', PreKy),
        change: function (e) {
            var cmbVal = $("#HdrSec2_CmbItem_Nm").data("kendoComboBox").value();
            $("#HdrSec2_CmbItem_Cd").data("kendoComboBox").value(cmbVal);
        },
        filter: "startswith",
        suggest: true,
        placeholder: "Select Item Name"
    });
}
function UnitDatasource(ItmKy) {
    if (ItmKy == "?")
        ItmKy = 1;
    var dataSource = new kendo.data.DataSource(
      {
          transport: {
              read: {
                  url: urlTransactionGetItemMultiUnits,
                  data: {
                      ItmKy: ItmKy,
                      trnTypKy: '1'
                  },
                  dataType: "json"
              }
          }
      });
    return dataSource;
}
function LoadUnitCombo(ItmKy)
{
    $("#hdrsec2_CmbUnit_Cd").kendoComboBox({
        dataValueField: "UnitKy",
        dataTextField: "Unit",
        dataSource: UnitDatasource(ItmKy),
        change: function (e) {

        },
        filter: "startswith",
        suggest: true,
        placeholder: "Select a Unit.."
    });
}

function TaskComboLoad(PrjKy) {
    $("#HdrSec2_CmbTask_Cd").kendoComboBox({
        dataValueField: "TaskKy",
        dataTextField: "TaskId",
        dataSource: TaskDatasource(PrjKy),
        change: function (e) {
            var cmbVal = $("#HdrSec2_CmbTask_Cd").data("kendoComboBox").value();
            $("#HdrSec2_CmbTask_Nm").data("kendoComboBox").value(cmbVal);
        },
        filter: "startswith",
        suggest: true,
        placeholder: "Select a Task"
    });
    $("#HdrSec2_CmbTask_Nm").kendoComboBox({
        dataValueField: "TaskKy",
        dataTextField: "TaskNm",
        dataSource: TaskDatasource(PrjKy),
        change: function (e) {
            var cmbVal = $("#HdrSec2_CmbTask_Nm").data("kendoComboBox").value();
            $("#HdrSec2_CmbTask_Cd").data("kendoComboBox").value(cmbVal);
        },
        filter: "startswith",
        suggest: true,
        placeholder: "Select a Task"
    });
}

function ComboValidations(cmbNm) {

    var cmb = $("#" + cmbNm + "").data("kendoComboBox");
    var val = cmb.value();

    if (isNaN(val)) {
        alert("'" + val + "' is not a Valid input");
        $("#" + cmbNm + "").data('kendoComboBox').value("");
        return false;
    } else {
        return true;
    }
}

$("#btnLoadItem").click(function () {
    var PrjKy = $("#HdrSec1_CmbPrj_Cd").data('kendoComboBox').value();
    PrjKy == undefined || PrjKy == null || PrjKy == "" ? 1 : PrjKy;
    TaskComboLoad(PrjKy);
    LoadGridViewColumn();    
    $("#GridWin").show();
    $("#HdrSec2").show();
    $("#HdrSec3").show();
    $("#HdrSec4").show();

});

function DistroyGrid() {
    $("#grid").kendoGrid({
        dataSource: null
    });
}



$("#btnMsgs").click(function () {
    $("#menu").hide();
    $("#filterCont").hide();
    $("#messageBox").show();
    var height = $(window).height() - 70;//80 => 40px for header, 40px for footer
    var h1 = $("#messageBox").height() + 20;//20 for padding
    $("#grid").height(height - (h1 + 35));//buttons
    $(".k-grid-content").height((height - (h1)) - (26 + 65 + 34)); //26,65,34 grid colum header, grid tool bar, grid footer

});
$("#btnMenu").click(function () {
    $("#menu").show();
    $("#filterCont").hide();
    $("#messageBox").hide();
});

$("#btnMsgsExit").click(function () {
    $("#messageBox").toggle();
});
$("#btnMsgsExit2").click(function () {
    $("#messageBox").toggle();
});

$("#exit").click(function () {
    $("#menu").toggle();
});
$("#btnExitFilter").click(function () {
    $("#filterCont").toggle();
    var h2 = $("#filterCont").height();
    var height = $(window).height() - 70;
    $("#grid").height(height - 35);
    $(".k-grid-content").height((height) - (26 + 65 + 34));
    //alert((height + h2 + 20) - (26 + 65+35+80));
});

$("#btnFlt").click(function () {
    $("#menu").hide();
    $("#messageBox").hide();

    var height = $(window).height() - 70;
    var h2 = $("#filterCont").height();
    $("#body").height(height);
    var h1 = $("#body").height();
    //alert("body:"+h1+" filter:"+h2);
    var h = h1 - (35 + h2 + 20);
    $("#grid").height(h);
    $(".k-grid-content").height(h - (26 + 65));
});
$("#btnClearFilter").click(function () {
    $("#cmbPrjNm").data('kendoComboBox').value("");
    $("#cmbPrjId").data('kendoComboBox').value("");
    $("#cmbEmployee").data('kendoComboBox').value("");
    $("#cmbEmployeeAL").data('kendoComboBox').value("");
    $("#status").data('kendoComboBox').value("");
    $("#cmbPiority").data('kendoComboBox').value("");
    $("#toDotype").data('kendoComboBox').value("");
    $("#rcdDt").val("");
    $("#toDt").val("");
    $("#insrtDt").val("");
    $("#InsrtToDt").val("");
    $("#FrmNextActEnt").val("");
    $("#ToNextActEnt").val("");
    $('#grid').data().kendoGrid.destroy();
    $("#grid").empty();
});

function HideColumn(index) {
    var grid = $("#grid").data("kendoGrid");
    grid.hideColumn(index);
    $("#cbs" + index + "").attr('checked', false);
}

function ShowColumn(index) {
    var grid = $("#grid").data("kendoGrid");
    grid.showColumn(index);
    $("#cbh" + index + "").attr('checked', false);
}


function ItmNm_SelectforItmRateDatasource() {
    var ItmTypKytemp = $("#HdrSec1_CmbItmTyp_Cd").val();

    var dataSource = new kendo.data.DataSource(
      {
          transport: {
              read: {
                  url: URLItmNm_SelectforItmRateDatasource,
                  data: {
                      ItmTypKy: ItmTypKytemp
                  },
                  dataType: "json"
              }
          }
      });
    return dataSource;
}

function deleteme(key) {
    var projKy = key;
    var answer = confirm("Confirm to delete this record");
    if (answer) {
        $.ajax({
            url: URLDeleteRate,
            dataType: "json",
            type: "POST",
            data: {
                'key': projKy,
            },
            success: function (data) {
                var grid = $("#grid").data("kendoGrid");
                grid.dataSource.read();
            },
            error: function (e) {

            }
        });
    }
}



$("#grid").on("keydown", function (event) {

    //alert(">>>e.which is :" + event.which + " and e.keyCode is:" + event.keyCode);
    if ((event.keyCode == 46) || (event.which == 46)) {
        var entityGrid = $("#grid").data("kendoGrid");
        var selectedItem = entityGrid.dataItem(entityGrid.select());
        deleteme(selectedItem.PrcsDetKy);
    }

});

$("#grid .k-grid-toolbar .k-grid-destroy").on("click", function (e) {
    alert("hi");
    e.preventDefault();
    //your logic
});


function LoadGridViewColumn() {
    var ItmRateColumns = [

        { field: "ItmRateKy", title: "ItmRateKy", width: "70px", hidden: true },
        {
            field: "LiNo", title: "LiNo", width: "20px", hidden: true,
        },
        {
            field: "PrjId", title: "PrjId", width: "100px", locked: true, hidden: false, editor: function (container, options) {
                var model = options.model;
            }
        },
        {
            field: "PrjKy", title: "PrjKy", width: "70px", hidden: true,
            editor: function (container, options) {
                var model = options.model;
            }
        },
        {
            field: "ItmKy", title: "ItmKy", width: "70px", hidden: true,
            editor: function (container, options) {
                var model = options.model;
            }
        }, // hidden: true },
        {
            field: "ItemCode", title: "Item Code", width: "200px",
            editor: function (container, options) {
                var model = options.model;
            }
        },
        {
            field: "ItemNm", title: "Item Name", width: "200px", editor: function (container, options) {
                var model = options.model;
            }
        },
        {
            field: "UnitKy", title: "UnitKy", width: "70px", hidden: true,
            editor: function (container, options) {
                var model = options.model;
            }
        },
        {
            field: "Unit", title: "Unit", width: "100px", editor: function (container, options) {
                var model = options.model;
            }
        },
        {
            field: "TaskKy", title: "Task Key", width: "200px", hidden: true,
            editor: function (container, options) {
                var model = options.model;
            }
        },
        {
            field: "TaskId", title: "Task ID", width: "200px", hidden: true,
            editor: function (container, options) {
                var model = options.model;
            }
        },
        {
            field: "TaskNm", title: "Task Name", width: "200px", hidden: false,
            editor: function (container, options) {
                var model = options.model;
            }
        },
        //{ field: "Unit", title: "Unit", width: "80px" },
        {
            field: "LocationCode", title: "LocationCode", width: "80px", editor: function (container, options) {
                var model = options.model;
            }
        },
        {
            field: "LocKy", title: "LocKy", width: "80px", hidden: true, editor: function (container, options) {
                var model = options.model;
            }
        },
        {
            field: "Rate", title: "Rate", width: "80px", format: "{0:N2}", editor: function (container, options) {
                var model = options.model;
            }
        },
        {
            field: "EftvDate", title: "Effective Date", width: "150px", format: "{0:dd/MM/yyyy}",
            editor: function (container, options) {
                var model = options.model;
            }
        },
        {
            field: "PreviousDate", title: "Previous Date", width: "150px", format: "{0:dd/MM/yyyy}", hidden: true,
            editor: function (container, options) {
                var model = options.model;
            }
        },
        {
            field: "PreviousRate", title: "Previous Rate", width: "150px", format: "{0:N2}", hidden: true,
            editor: function (container, options) {
                var model = options.model;
            }
        },

        {
            field: "EAN", title: "EAN", width: "100px", hidden: true,
            editor: function (container, options) {
                var model = options.model;
            }
        },
        {
            field: "ControlConKy", title: "ControlConKy", width: "110px", hidden: true, editor: function (container, options) {
                var model = options.model;
            }
        },
        {
            field: "OthTrnTypKy", title: "OthTrnTypKy", width: "100px", hidden: true, editor: function (container, options) {
                var model = options.model;
            }
        },
        {
            field: "BU", title: "BU", width: "100px", hidden: true, editor: function (container, options) {
                var model = options.model;
            }
        },
        {
            field: "BUky", title: "BUky", width: "100px", hidden: true, editor: function (container, options) {
                var model = options.model;
            }
        },
        {
            field: "AdrId", title: "AdrId", width: "100px", hidden: true, editor: function (container, options) {
                var model = options.model;
            }
        },
        {
            field: "AdrKy", title: "AdrKy", width: "100px", hidden: true, editor: function (container, options) {
                var model = options.model;
            }
        },
        {
            field: "AccCd", title: "AccCd", width: "100px", hidden: false, editor: function (container, options) {
                var model = options.model;
            }
        },
        {
            field: "AdrNm", title: "Address Name", width: "100px", hidden: true, editor: function (container, options) {
                var model = options.model;
            }
        },

        {
            field: "AccKy", title: "AccKy", width: "100px", hidden: true, editor: function (container, options) {
                var model = options.model;
            }
        },
        {
            field: "ItemType", title: "Item Type", width: "100px", hidden: true, editor: function (container, options) {
                var model = options.model;
            }
        },
        {
            field: "CKy", title: "CKy", width: "100px", hidden: true, editor: function (container, options) {
                var model = options.model;
            }
        },
        {
            field: "IsAct", title: "IsAct", width: "40px", hidden: true,
            editor: function (container, options) {
            }
        },
        //{
        //    width: "60px",
        //    template: kendo.template($("#command-template").html())
        //}

    ];

    var gridNo = 1;
    var FinalItmRateColumn = setColumnProp(ItmRateColumns, viewBag.ObjKy, '', 'FormGrd', gridNo);
}


function LoadGridWithColumnProp(columnsFinal, gridNo) {
    if (gridNo == 1) {
        try {
            $('#grid').data().kendoGrid.destroy();
            $('#grid').empty();
        } catch (e) { }

        //var controlconky = GridData.ConrlConKy;
        var ItmtypKy = $("#HdrSec1_CmbItmTyp_Cd").val();
        if (ItmtypKy == "") { ItmtypKy = 1; }

        var PrjKy = $("#HdrSec1_CmbPrj_Cd").val();
        if (PrjKy == "") { PrjKy = 1; }

        var LocKy = $("#HdrSec1_CmbLoc_Cd").val();
        if (LocKy == "") { LocKy = 1; }

        var PursKy = $("#cmbPusFm").val();
        if (PursKy == "") { PursKy = 1; }

        var AccKy = $("#HdrSec1_CmbSubConAcc_Cd").val();
        if (AccKy == "" || AccKy == null || AccKy == undefined) { AccKy = 1; }

        var PresDt = $("#PresDt").val();
        var RevsnDt = $("#RevsnDt").val();

        var dataSourceGrid = new kendo.data.DataSource({

            transport: {
                read: {
                    url: URLLoadSubConGrid,
                    dataType: "json"
                },

                parameterMap: function (options, operation) {

                    if (operation == "read") {
                        return ({
                            'PrjKy': PrjKy,
                            'AccKy': AccKy,
                            'RevsnDt': RevsnDt,
                            'OurCd': viewBag.OurCd //GridData.ConrlConKy

                        });
                    }
                }
            },
            batch: true,
            sort: ({ field: "LiNo", dir: "desc" }),
            pageSize: 15,
            schema: {
                model: {
                    id: "ItmRateKy",
                    fields: //Relavent fields of the grid should be bind with following model items
                    {
                        ItmRateKy: { editable: true, nullable: false, type: "number" },
                        ItmKy: { editable: true, nullable: false, },
                        LiNo: { editable: true, nullable: false, type: "number" },
                        ItemCode: { editable: true, nullable: false, },
                        ItemNm: { editable: true, nullable: false, validation: { required: true }, type: "string" },
                        LocKy: { editable: true, nullable: false, type: "number", defaultValue: "1" },
                        LocationCode: { editable: true, nullable: false, type: "string" },
                        //PreviousDate: { editable: true, nullable: true, type: "date" },
                        //PreviousRate: { editable: true, nullable: false, type: "number" },
                        Rate: { editable: true, nullable: false, type: "number" },
                        ControlConKy: { editable: true, nullable: false, type: "number", },
                        EAN: { editable: true, nullable: false, type: "string" },
                        //ItmRateKy: { editable: true, nullable: false, type: "number" },
                        OthTrnTypKy: { editable: true, nullable: false, type: "number" },
                        EftvDate: { editable: true, nullable: false, type: "date" },
                        //TmStmp: { editable: true, nullable: false, type: "number" },
                        BUky: { editable: true, nullable: false, type: "number" },
                        ItemType: { editable: true, nullable: false, },
                        PrjKy: { editable: true, nullable: false, type: "number" },
                        PrjId: { editable: true, nullable: false, },
                        BU: { editable: true, nullable: false, },
                        AdrKy: { editable: true, nullable: false, type: "number" },
                        AdrId: { editable: true, nullable: false, },
                        AdrNm: { editable: true, nullable: false, },
                        AccKy: { editable: true, nullable: false, type: "number" },
                        AccCd: { editable: true, nullable: false, },
                        CKy: { editable: true, nullable: false, type: "number" },
                        TaskKy: { editable: true, nullable: false, type: "number" },
                        TaskId: { editable: true, nullable: false, },
                        TaskNm: { editable: true, nullable: false, },
                        IsAct: { editable: true, nullable: false, type: "number" },
                        UnitKy: { editable: true, nullable: false, type: "number" },
                        Unit: { editable: true, nullable: false, },

                        
                    }
                }
            }
        });

        $("#grid").kendoGrid({
            dataSource: dataSourceGrid,
            autobind: true,
            navigatable: true,
            filterable: {
                mode: "row"
            },
            dataBound: onDataBound,
            //groupable: true,
            pageable: true,
            sortable: true,
            reorderable: true,
            columnMenu: true,
            height: "300px",
            selectable: "row",
            pageable: { refresh: true, pageSizes: [5, 10, 20, 50, 100] },
            //toolbar: [{ name: "create", text: "Add new record" }, "save", "cancel"], 
            columns: columnsFinal,
            resizable: true,
            editable: true
        });
    }
}


$("#HdrSec4_NmricRate_Val").keydown(function (event) {
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode == '13') {
        var LiNo = $("#HdrSec4_NmricLiNo_Val").data("kendoNumericTextBox").value();
        if (LiNo == 0 || LiNo == null || LiNo == undefined) {
            SetItmRatebyEnterky();
        }
        else {
            //   console.log("I was Here")
            ChangeItemRate();
        }
        event.preventDefault();
    }
});
$("#HdrSec2_CmbItem_Cd").keydown(function (event) {
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode == '13') {
        $("#HdrSec2_CmbTask_Cd").data("kendoComboBox").input.focus();
        event.preventDefault();
    }
});
$("#HdrSec2_CmbTask_Cd").keydown(function (event) {
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode == '13') {
        $("#HdrSec4_NmricRate_Val").siblings("input:visible").focus();
        event.preventDefault();
    }
});

function SetItmRatebyEnterky() {
    var ItemKey = $("#HdrSec2_CmbItem_Cd").data('kendoComboBox').value();
    if (ItemKey == undefined || ItemKey == null || ItemKey == "") ItemKey = 1;

    var Unit = $("#hdrsec2_CmbUnit_Cd").data('kendoComboBox').text();
    var UnitKy = $("#hdrsec2_CmbUnit_Cd").data('kendoComboBox').value();
    if (UnitKy == undefined || UnitKy == null || UnitKy == "") UnitKy = 1;

    var ItmCode = $("#HdrSec2_CmbItem_Cd").data('kendoComboBox').text();
    var ItmName = $("#HdrSec2_CmbItem_Nm").data('kendoComboBox').text();
    var LocKey = $("#hdrsec3_CmbLoc_Cd").data('kendoComboBox').value();
    if (LocKey == undefined || LocKey == null || LocKey == "") LocKey = 1;
    var LocCode = $("#hdrsec3_CmbLoc_Cd").data('kendoComboBox').text();
    var AdrKey = $("#hdrsec3_CmbAdr_Cd").data('kendoComboBox').value();
    if (AdrKey == undefined || AdrKey == null || AdrKey == "") AdrKey = 1;
    var AdrID = $("#hdrsec3_CmbAdr_Cd").data('kendoComboBox').text();
    var AdrNm = $("#hdrsec3_CmbAdr_Nm").data('kendoComboBox').text();
    var AccKey = $("#HdrSec1_CmbSubConAcc_Cd").data('kendoComboBox').value();
    if (AccKey == undefined || AccKey == null || AccKey == "") AccKey = 1;
    var AccCode = $("#HdrSec1_CmbSubConAcc_Cd").data('kendoComboBox').text();
    var PrjKey = $("#HdrSec1_CmbPrj_Cd").data('kendoComboBox').value();
    if (PrjKey == undefined || PrjKey == null || PrjKey == "") PrjKey = 1;
    var PrjID = $("#HdrSec1_CmbPrj_Cd").data('kendoComboBox').text();
    var TaskKey = $("#HdrSec2_CmbTask_Cd").data('kendoComboBox').value();
    if (TaskKey == undefined || TaskKey == null || TaskKey == "") TaskKey = 1;
    var TaskID = $("#HdrSec2_CmbTask_Cd").data('kendoComboBox').text();
    var TaskName = $("#HdrSec2_CmbTask_Nm").data('kendoComboBox').text();
    var eftvDate = $("#RevsnDt").data("kendoDatePicker").value();
    var Rate = $("#HdrSec4_NmricRate_Val").val();

    var dataSource = $("#grid").data("kendoGrid").dataSource;
    var count = $("#grid").data().kendoGrid.dataSource.total();
    var LineNo = count + 1;

    dataSource.insert(count, {
        ItmRateKy: 0,
        LiNo: LineNo,
        ItmKy: ItemKey,
        ItemCode: ItmCode,
        ItemNm: ItmName,
        LocKy: LocKey,
        LocationCode: LocCode,
        AdrKy: AdrKey,
        AdrId: AdrID,
        AdrNm: AdrNm,
        AccKy: AccKey,
        AccCd: AccCode,
        PrjKy: PrjKey,
        PrjId: PrjID,
        TaskKy: TaskKey,
        TaskId: TaskID,
        TaskNm: TaskName,
        EftvDate: eftvDate,
        Rate: Rate,
        PreviousRate: 0,
        IsAct: 1,
        UnitKy: UnitKy,
        Unit: Unit

    });
    Clear();
}

function ChangeItemRate() {

    var AccKy = $("#HdrSec1_CmbSubConAcc_Cd").data("kendoComboBox").value();
    if (AccKy == 0 || AccKy == null || AccKy == "" || AccKy == undefined) AccKy = 1;
    var AccCd = $("#HdrSec1_CmbSubConAcc_Cd").data('kendoComboBox').text();  

    var PrjKy = $("#HdrSec1_CmbPrj_Cd").data('kendoComboBox').value();
    if (PrjKy == 0 || PrjKy == null || PrjKy == "" || PrjKy == undefined) PrjKy = 1;
    var PrjId = $("#HdrSec1_CmbPrj_Cd").data('kendoComboBox').text();

    var TaskKy = $("#HdrSec2_CmbTask_Cd").data('kendoComboBox').value();
    if (TaskKy == 0 || TaskKy == null || TaskKy == "" || TaskKy == undefined) TaskKy = 1;
    var TaskNm = $("#HdrSec2_CmbTask_Nm").data('kendoComboBox').text();

    var ItmKy = $("#HdrSec2_CmbItem_Cd").data('kendoComboBox').value();
    if (ItmKy == 0 || ItmKy == null || ItmKy == "" || ItmKy == undefined) ItmKy = 1;
    var ItmCd = $("#HdrSec2_CmbItem_Cd").data('kendoComboBox').text();
    var ItmNm = $("#HdrSec2_CmbItem_Nm").data('kendoComboBox').text();

    var Unit = $("#hdrsec2_CmbUnit_Cd").data('kendoComboBox').text(); 
    var UnitKy = $("#hdrsec2_CmbUnit_Cd").data('kendoComboBox').value();


    var eftvDt = $("#RevsnDt").val();
    var dt = eftvDt.replace("-", "/").split('/');
    var Eftv = dt[2] + "/" + dt[1] + "/" + dt[0]

    var Rate = $("#HdrSec4_NmricRate_Val").val();
    var Lino = $("#HdrSec4_NmricLiNo_Val").val();
    if (Lino == 0 || Lino == "" || Lino == null || Lino == undefined) Lino = 1;

    var id = ("#grid");
    //var LiNo = FormGlblData.Detail_Editing_LiNo;
    var LiNoForChange = Lino;
    var firstItemData = $(id).data().kendoGrid.dataSource.data();
    var firstItem = firstItemData[Lino - 1];//[count - LiNoForChange];

    firstItem.set("LiNo", Lino);
    firstItem.set("ItemCode", ItmCd);
    firstItem.set("ItemNm", ItmNm);
    firstItem.set("TaskNm", TaskNm);
    firstItem.set("Rate", Rate);
    firstItem.set("EftvDate", Eftv);
    firstItem.set("AccKy", AccKy);
    firstItem.set("AccCd", AccCd);
    firstItem.set("PrjKy", PrjKy);
    firstItem.set("PrjId", PrjId);
    firstItem.set("TaskKy", TaskKy);
    firstItem.set("ItmKy", ItmKy);
    firstItem.set("UnitKy", UnitKy);
    firstItem.set("Unit", Unit);

    Clear();
}

$("#grid").on("click", ".k-grid-evenselect", function () {
    //var answer = $(id).data("kendoGrid").removeRow($(this).closest("tr"));
    var grid = $("#grid").data("kendoGrid");
    var answer = confirm("Are You Really Want To Delete ?");
    if (answer == true) {
        answer = grid.tbody.find($(this).closest("tr")).hide();

        var selectedItem = grid.dataItem($(this).closest("tr"));
        selectedItem.set("IsAct", 0);
    }

});
function onDataBound(e) {
    var grid = $("#grid").data("kendoGrid");
    var dataSource = grid.dataSource.data();
    for (var i = 0; i < dataSource.length; i++) {
        if (dataSource[i].IsAct == 0) {
            grid.tbody.find("[data-uid='" + dataSource[i].uid + "']").hide();
        }
    }
    //ArrangeLiNo();
}


$("#grid").bind("dblclick", "tr.k-state-selected", function () {
    var grid = $("#grid").data().kendoGrid;
    var selectedItem = grid.dataItem(grid.select());
    var ItmKy = selectedItem.ItmKy;
    if ((ItmKy != "" || ItmKy != undefined || ItmKy != null) && (ItmKy != "?")) {

        var LiNo = selectedItem.LiNo;
        var ItmCd = selectedItem.ItmCd;
        var ItmNm = selectedItem.ItmNm;
        var TaskKy = selectedItem.TaskKy;
        var TaskId = selectedItem.TaskId;
        var TaskNm = selectedItem.TaskNm;
        var AdrKy = selectedItem.AdrKy;
        var AdrId = selectedItem.AdrId;
        var AdrNm = selectedItem.AdrNm;
        var LocKy = selectedItem.LocKy;
        var LocCd = selectedItem.LocationCode;
        var LocNm = selectedItem.LocNm;
        var Rate = selectedItem.Rate;
        var UnitKy = selectedItem.UnitKy;
        var Unit = selectedItem.Unit;

        $("#HdrSec2_CmbItem_Cd").data("kendoComboBox").value(ItmKy);
        $("#HdrSec2_CmbItem_Cd").data("kendoComboBox").trigger("change");

        $("#HdrSec2_CmbTask_Cd").data("kendoComboBox").value(TaskKy);
        $("#HdrSec2_CmbTask_Cd").data("kendoComboBox").trigger("change");

        $("#hdrsec3_CmbAdr_Cd").data("kendoComboBox").value(AdrKy);
        $("#hdrsec3_CmbAdr_Cd").data("kendoComboBox").trigger("change");

        $("#hdrsec3_CmbLoc_Cd").data("kendoComboBox").value(LocKy);
        $("#hdrsec3_CmbLoc_Cd").data("kendoComboBox").trigger("change");

        $("#HdrSec4_NmricRate_Val").data("kendoNumericTextBox").value(Rate);
        $("#HdrSec4_NmricLiNo_Val").data("kendoNumericTextBox").value(LiNo);
        $("#hdrsec2_CmbUnit_Cd").data('kendoComboBox').value(UnitKy);
        //if (isNaN(DisPer))
        //    $("#HdrSec5_NmricDisPer_Val").data("kendoNumericTextBox").value(0);


    };
});


function ArrangeLiNo() {

    var id = ("#grid");
    var count = $(id).data().kendoGrid.dataSource.total();
    var dataSourceforLino = $(id).data("kendoGrid").dataSource.data();
    for (var a = 0; a < count; a++) {
        var GridItem = dataSourceforLino[a];
        GridItem.set("LiNo", (a + 1));
    }

}

function Clear()
{
    $("#HdrSec2_CmbItem_Cd").data("kendoComboBox").value(null);
    $("#HdrSec2_CmbItem_Nm").data("kendoComboBox").value(null);
    $("#HdrSec2_CmbTask_Cd").data("kendoComboBox").value(null);
    $("#HdrSec4_NmricRate_Val").data("kendoNumericTextBox").value(null);
    $("#HdrSec4_NmricLiNo_Val").data("kendoNumericTextBox").value(null);
}