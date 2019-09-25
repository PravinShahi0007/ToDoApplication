var todayDate = new Date();
var dd = todayDate.getDate();
var mm = todayDate.getMonth() + 1; //January is 0!

var yyyy = todayDate.getFullYear();
if (dd < 10) {
    dd = '0' + dd
}
if (mm < 10) {
    mm = '0' + mm
}
var todayDate = dd + '/' + mm + '/' + yyyy;

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
var selectedReportParamList = {};
var globlObjKy = 1;

$(document).ready(function () {
    GetFormObjData();
});

$(document).ready(function () {

    $.ajax({
        url: urlCodes.GetCdKyByConCdAndOurCd,
        dataType: "json",
        type: "POST",
        data: JSON.stringify({
            ObjKy: viewBag.ObjKy,
            ConCd: 'TrnTyp',
            OurCd: viewBag.OurCd
        }),
        contentType: 'application/json; charset=utf-8',
        success: function (TrnTypKy) {

            FormGlblData.TrnTypKy = TrnTypKy;
            GetFormObjData();
        }
    });
  
    $("#HdrSec1_Qty").kendoNumericTextBox({ min: 0, spinners: false });
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
    LoadDatePicker();
    LoadPrjCombo();
    LoadTaskCombo(1);
    LoadSubConNmCombo();
    LoadGridView();
}

//*********Date**********
function LoadDatePicker() {
    $("#date").kendoDatePicker({
        format: "dd/MM/yyyy",
        min: new Date(31, 2, 1920)
    });
}

//*********Project**********
function LoadPrjCombo() {

    $("#HdrSec1_CmbPrjNm").kendoComboBox({
        dataValueField: "PrjKy",
        dataTextField: "PrjId",
        dataSource: PrjID_SelectMobDatasource("HdrSec1_CmbPrj"),
        change: function (e) {
            var PrjKy = $("#HdrSec1_CmbPrjNm").data('kendoComboBox').value();
            if (PrjKy == 0 || PrjKy == null) {
                PrjKy = 1;
            }
            LoadTaskCombo(PrjKy);
        },
        filter: "contains",
        suggest: true,
        placeholder: "Select a Project..."
    });
}

//*********Task**********
function LoadTaskCombo(PrjKy) {

    $("#HdrSec1_CmbTaskID").kendoComboBox({
        dataValueField: "PrcsDetKy",//PrcsDetKy
        dataTextField: "TaskID",//TaskID
        dataSource: TaskID_SelectMobDatasource('HdrSec1_CmbTask', PrjKy),
        change: function (e) {

            var PrjKy = $("#HdrSec1_CmbPrjNm").data('kendoComboBox').value();
            if (PrjKy == 0 || PrjKy == null) {
                PrjKy = 1;
            }
            var PrcsDetKy = $("#HdrSec1_CmbTaskID").data('kendoComboBox').value();
            if (PrcsDetKy == 0 || PrcsDetKy == null) {
                PrcsDetKy = 1;
            }

            var comboboxValue = $("#HdrSec1_CmbTaskID").data("kendoComboBox");
            var cmbValue = comboboxValue.value();
            validate = ComboValidations("HdrSec1_CmbTaskID");

            if (validate) {
                $("#HdrSec1_CmbTaskNm").data("kendoComboBox").value(cmbValue);
            }

            LoadSubConNmCombo(PrcsDetKy, PrjKy);
        },
        filter: "contains",
        suggest: true,
        placeholder: "Select a Task.."
    });

    $("#HdrSec1_CmbTaskNm").kendoComboBox({
        dataValueField: "PrcsDetKy",//PrcsDetKy
        dataTextField: "TaskNm",//TaskID
        dataSource: TaskNm_SelectMobDatasource('HdrSec1_CmbTask', PrjKy),
        change: function (e) {

            var PrjKy = $("#HdrSec1_CmbPrjNm").data('kendoComboBox').value();
            if (PrjKy == 0 || PrjKy == null) {
                PrjKy = 1;
            }
            var PrcsDetKy = $("#HdrSec1_CmbTaskNm").data('kendoComboBox').value();
            if (PrcsDetKy == 0 || PrcsDetKy == null) {
                PrcsDetKy = 1;
            }

            var comboboxValue = $("#HdrSec1_CmbTaskNm").data("kendoComboBox");
            var cmbValue = comboboxValue.value();
            validate = ComboValidations("HdrSec1_CmbTaskNm");

            if (validate) {
                $("#HdrSec1_CmbTaskID").data("kendoComboBox").value(cmbValue);
            }

            LoadSubConNmCombo(PrcsDetKy, PrjKy);
        },
        filter: "contains",
        suggest: true,
        placeholder: "Select a Task.."
    });

    $("#HdrSec1_CmbTaskID").data("kendoComboBox").value(null);
}

//*********SubConName**********
function LoadSubConNmCombo(PrcsDetKy, PrjKy) {

    Load_PrcsDet(PrcsDetKy);

    $("#HdrSec1_CmbSubConNm").kendoComboBox({
        dataValueField: "Adrky",
        dataTextField: "AdrNm",
        dataSource: PPrjKySubConAdrNm_SelectMobDatasource('HdrSec1_CmbSubCon', PrcsDetKy, PrjKy, FormGlblData.TrnTypKy),
        filter: "contains",
        suggest: true,
        placeholder: "Select a Subcontractor Name..."
    });

}

//*********Unit**********
function Load_PrcsDet(PrcsDetKy) {
    $.ajax({
        url: urlTaskProgress.PrcsDet_SelectWeb,
        data: JSON.stringify({
            ObjKy: 1,
            PrcsDetKy: PrcsDetKy,
        }),
        contentType: 'application/json; charset=utf-8',
        dataType: "Json",
        type: "POST",
        success: function (data) {
            for (i = 0; i < data.length; i++) {
                var Unit = data[0].Unit;
                $("#HdrSec1_Unit").val(Unit);
            }
        },
        error: function (e) {
            return false;
        }
    });
}

//*********Grid**********
function LoadGridView() {
    var vPrjKy = $("#HdrSec1_CmbPrjNm").data('kendoComboBox').value();
    if (vPrjKy == 0 || vPrjKy == null) {
        vPrjKy = 1;
    }
    var vFinItmKy = $("#HdrSec1_CmbTaskID").data('kendoComboBox').value();
    if (vFinItmKy == 0 || vFinItmKy == null) {
        vFinItmKy = 1;
    }
    var vFinItmKy = $("#HdrSec1_CmbTaskNm").data('kendoComboBox').value();
    if (vFinItmKy == 0 || vFinItmKy == null) {
        vFinItmKy = 1;
    }
    var vAdrKy = $("#HdrSec1_CmbSubConNm").data('kendoComboBox').value();
    if (vAdrKy == 0 || vAdrKy == null) {
        vAdrKy = 1;
    } 
    var vTrnDt = FormGlblData.TodayDate;
    var vTrnTypKy = FormGlblData.TrnTypKy;
    var vObjKy = Number(viewBag.ObjKy);
    var vTrnKy = 1;

    //SubConPrgrsItmTrn_SelectWeb(int ObjKy, int TrnKy, string TrnDt, int TrnTypKy, int PrjKy, int AdrKy, int FinItmKy)
    var datasourceLoadGridView = new kendo.data.DataSource({
        transport: {
            read:
			{
			    //int GrpCdKy, int CdKy, string ConCdGrid
			    data: { ObjKy: vObjKy, TrnKy: vTrnKy, TrnDt: vTrnDt, TrnTypKy: vTrnTypKy, PrjKy: vPrjKy, AdrKy: vAdrKy, FinItmKy: vFinItmKy },
			    url: urlSubConPrgrsItmTrn_SelectWeb,
			    dataType: "json"
			}
        },
        batch: true,
        pageSize: 20,
        schema: {
            model: {
                id: "FinItmKy",
                fields:
				{
				    FinItmKy: { editable: false, nullable: false, },
				    ItmCd: { editable: false, nullable: false, },
				    ItmNm: { editable: false, nullable: false, },
				    Unit: { editable: false, nullable: false },
				    Qty: { editable: false, nullable: false }
				}
            }
        }
    });

    $("#HdrSec1_TaskProgressGrid").kendoGrid({
        dataSource: datasourceLoadGridView,
        //autobind: true,
        height: 500,
        navigatable: true,
        filterable: true,
        pageable: true,
        sortable: true,
        reorderable: true,
        columnMenu: true,
        selectable: "row",
        resizable: true,
        pageable: { refresh: true, pageSizes: [5, 10, 20, 50, 100] },
        columns: [
        { field: "FinItmKy", title: "FinItmKy", width: "100px", hidden: true },
        { field: "ItmCd", title: "Description", width: "100px" },
         { field: "Unit", title: "Unit", width: "100px" },
          { field: "Qty", title: "Qty", width: "100px" },
        { field: "ItmNm", title: "Description", width: "100px" },
        ],

        editable: true
    });
}

function PrjID_SelectMobDatasource(ObjNm) {
    var ObjKy = GetObjKy(ObjNm);
    var dataSource = new kendo.data.DataSource(
      {
          transport: {
              read: {
                  url: urlComboLoad.PrjID_SelectMob,
                  data: {
                      ObjKy: ObjKy,
                      TrnTypKy: FormGlblData.TrnTypKy,
                      PreKy: 1
                  },
                  dataType: "json"
              }
          }
      });
    return dataSource;
}

function TaskID_SelectMobDatasource(ObjNm, PrjKy) {
    var ObjKy = GetObjKy(ObjNm);
    var dataSource = new kendo.data.DataSource(
      {
          transport: {
              read: {
                  url: urlComboLoad.TaskID_SelectMob,
                  data: {
                      ObjKy: ObjKy,
                      PrjKy: PrjKy,
                  },
                  dataType: "json"
              }
          }
      });
    return dataSource;
}

function TaskNm_SelectMobDatasource(ObjNm, PrjKy) {
    var ObjKy = GetObjKy(ObjNm, PrjKy);
    var dataSource = new kendo.data.DataSource(
      {
          transport: {
              read: {
                  url: urlComboLoad.TaskNm_SelectMob,
                  data: {
                      ObjKy: ObjKy,
                      PrjKy: PrjKy
                  },
                  dataType: "json"
              }
          }
      });
    return dataSource;
}

function PPrjKySubConAdrNm_SelectMobDatasource(ObjNm, PrcsDetKy, PrjKy, TrnTypKy) {
    var ObjKy = GetObjKy(ObjNm, PrcsDetKy, PrjKy, TrnTypKy);
    var dataSource = new kendo.data.DataSource(
      {
          transport: {
              read: {
                  url: urlTaskProgress.PPrjKySubConAdrNm_SelectMob,
                  data: {
                      ObjKy: ObjKy,
                      PrcsDetKy: PrcsDetKy,
                      PrjKy: PrjKy,
                      TrnTypKy: FormGlblData.TrnTypKy,
                  },
                  dataType: "json"
              }
          }
      });
    return dataSource;
}

function ComboValidations(cmbNm) {

    var cmb = $("#" + cmbNm + "").data("kendoComboBox");
    var val = cmb.value();

    if (isNaN(val)) {
        alert("'" + val + "' is not a Valid input");
        $("#" + cmbNm + "").data("kendoComboBox").value("");
        return false;
    } else {
        return true;
    }
}