var SalDetKy = "";
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
            DocReadyCusFindForm();
        }
    });
}

function DocReadyCus() {
    LoadProGrpCombo();
    LoadSalTypCombo();
    LoadDatePicker();
   
}
//***** Salary Process Group******
function LoadProGrpCombo() {
    $("#HdrPart_CmbSalPrcsGrp_Cd").kendoComboBox({
        dataValueField: "CdKy",
        dataTextField: "CdNm",
        dataSource: CdNm_SelectMob_Datasource('HdrPart_CmbSalPrcsGrp'),
        filter: "contains",
        suggest: true,
        placeholder: "Select a Salary Process Group.."
    });
}

//**************Salary Type***********
function LoadSalTypCombo() {
    $("#HdrPart_CmbSalTyp_Cd").kendoComboBox({
        dataValueField: "CdKy",
        dataTextField: "CdNm",
        dataSource: CdNm_SelectMob_Datasource('HdrPart_CmbSalTyp'),

        filter: "contains",
        suggest: true,
        placeholder: "Select a Salary Type.."
    });
}

function dataSrcCreateCodeCdMasLookUp(ObjNm) {

    var ObjKy = GetObjKy(ObjNm);
    var dataSource = new kendo.data.DataSource(
      {
          transport: {
              read: {
                  url: urlComboLoad.Code_SelectMob,
                  data: { ObjKy: ObjKy, TrnTypKy: 1, PreKy: 1 },
                  dataType: "json"
              }
          }
      });
    return dataSource;
}

//*********Date************
function LoadDatePicker() {
    var todayDate = new Date();

    $("#HdrPart_PayDate").kendoDatePicker({
        format: "dd/MM/yyyy",
    });
    $('#HdrPart_PayDate').data("kendoDatePicker").value(todayDate);

    $("#HdrPart_ProDate").kendoDatePicker({
        format: "dd/MM/yyyy",
    });
    $('#HdrPart_ProDate').data("kendoDatePicker").value(todayDate);

    $("#HdrPart_FrmDate").kendoDatePicker({
        format: "dd/MM/yyyy",
    });
    $('#HdrPart_FrmDate').data("kendoDatePicker").value(todayDate);

    $("#HdrPart_ToDate").kendoDatePicker({
        format: "dd/MM/yyyy",
    });
    $('#HdrPart_ToDate').data("kendoDatePicker").value(todayDate);
}

$('#SalProApr').change(function () {
    // this will contain a reference to the checkbox   
    if (this.checked) {
        this.checked = confirm("After Finalize the Salary Process, You can't Process again. Do you want to continue?");
        //alert('checked');
    } else {
        // the checkbox is now no longer checked
    }

});


function Insert() {

    var PrcsGrp = $("#HdrPart_CmbSalPrcsGrp_Cd").data('kendoComboBox').value();
    var SalTyp = $("#HdrPart_CmbSalTyp_Cd").data('kendoComboBox').value();
    
    var PayDate = $("#HdrPart_PayDate").val();
    var ProDate = $("#HdrPart_ProDate").val();
    var FromDate = $("#HdrPart_FrmDate").val();
    var ToDate = $("#HdrPart_ToDate").val();

    var fAprSal = 0;

    if ($('#SalProApr').is(":checked")) {
        fAprSal = 1;
    }
    else {
        fAprSal = 0;
    }

    $.ajax({
        url: urlSalDtRng_Insert.SalDtRng_Insert,
        dataType: "json",
        type: "POST",
        data: JSON.stringify({
            ObjKy: viewBag.ObjKy,
            SalPrcsGrpKy: PrcsGrp,
            SalTypKy: SalTyp,
            SalDt: PayDate,
            ActuSalDt: ProDate,
            FmDt: FromDate,
            ToDt: ToDate,
            fAprSal: fAprSal,
            SalDtKy: SalDetKy,

        }),
        contentType: 'application/json; charset=utf-8',
        success: function (Data) {
            alert('Successfully Save');
        }
    });
}

function Clear() {
    var grid = $("#FindFormGridSalary").data("kendoGrid");
    grid.dataSource.data([]);

    $("#HdrPart_CmbSalPrcsGrp_Cd").data('kendoComboBox').value(null);
    $("#HdrPart_CmbSalTyp_Cd").data('kendoComboBox').value(null);
  //  $("#SalaryDt").val(null);
   // $("#HdrPart_PayDate").val(null);
   // $("#HdrPart_ProDate").val(null);
   // $("#HdrPart_FrmDate").val(null);
  //  $("#HdrPart_ToDate").val(null);
    $("#SalProApr").prop("checked", false);
}


function LaodSelectedRecordFrmFindFrm() {
    var grid = $('#FindFormGridSalary').data().kendoGrid;
        var selectedItem = grid.dataItem(grid.select());
        var salDtKy = selectedItem.SalDtKy;
        if (salDtKy != "" || salDtKy != undefined || salDtKy != null) {
            GetHdrDetailFromGrid(salDtKy);
        } else {
            alert("please Select...");
        }
}

function GetHdrDetailFromGrid(SalDtKy) {

    $.ajax({
        url: urlFindFromSalaryGrid.GetHdrDetailFromGrid,
        data: JSON.stringify({
            ObjKy: viewBag.ObjKy,
            SalDtKy: SalDtKy,
         
        }),
        contentType: 'application/json; charset=utf-8',
        dataType: "Json",
        type: "POST",
        success: function (data) {

            for (i = 0; i < data.length; i++) {

                SalDetKy = data[0].SalDtKy;
                $("#SalDtKy").val(SalDetKy);

                var SalDt = data[0].SalDt;
                $('#HdrPart_PayDate').data("kendoDatePicker").value(SalDt);

                var ActuSalDt = data[0].ActuSalDt;
                $('#HdrPart_ProDate').data("kendoDatePicker").value(ActuSalDt);

                var FmDt = data[0].FmDt;
                $('#HdrPart_FrmDate').data("kendoDatePicker").value(FmDt);

                var ToDt = data[0].ToDt;
                $('#HdrPart_ToDate').data("kendoDatePicker").value(ToDt);

                var SalDt = data[0].SalDt;
                $('#SalaryDt').data("kendoDatePicker").value(SalDt);

                var SalPrcsGrpKy = data[0].SalPrcsGrpKy;
                $("#HdrPart_CmbSalPrcsGrp_Cd").data("kendoComboBox").value(SalPrcsGrpKy);
              
                var SalTypKy = data[0].SalTypKy;
                $("#HdrPart_CmbSalTyp_Cd").data("kendoComboBox").value(SalTypKy);

                var chkbox = data[0].fAprSal;
                if (chkbox == 1) {
                    $("#SalProApr").prop("checked", true);
                    } else {
                    $("#SalProApr").prop("checked", false);
                    }

                $('#FindFormSalary').data('kendoWindow').close();
            }

            //GetSalaryGridDetail(SalDtKy);
        },
        error: function (e) {
            return false;
        }
    });
}