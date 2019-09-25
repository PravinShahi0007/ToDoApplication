
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
            //DocReadyCusFindForm();
        }
    });
}

function DocReadyCus() {
    LoadCombo();
    LoadDatePicker();

}
//***** Salary Process Group******
//function LoadProGrpCombo() {
//    $("#HdrPart_CmbSalPrcsGrp_Cd").kendoComboBox({
//        dataValueField: "CdKy",
//        dataTextField: "CdNm",
//        dataSource: CdNm_SelectMob_Datasource('HdrPart_CmbSalPrcsGrp'),
//        filter: "contains",
//        suggest: true,
//        placeholder: "Select a Salary Process Group.."
//    });
//}



//function dataSrcCreateCodeCdMasLookUp(ObjNm) {

//    var ObjKy = GetObjKy(ObjNm);
//    var dataSource = new kendo.data.DataSource(
//      {
//          transport: {
//              read: {
//                  url: urlComboLoad.Code_SelectMob,
//                  data: { ObjKy: ObjKy, TrnTypKy: 1, PreKy: 1 },
//                  dataType: "json"
//              }
//          }
//      });
//    return dataSource;
//}


function LoadDatePicker() {
    var todayDate = new Date();

    $("#HdrPart_FrmDate").kendoDatePicker({
        format: "dd/MM/yyyy",
    });
    $('#HdrPart_FrmDate').data("kendoDatePicker").value(todayDate);

    //$("#HdrPart_ToDate").kendoDatePicker({
    //    format: "dd/MM/yyyy",
    //});
    //$('#HdrPart_ToDate').data("kendoDatePicker").value(todayDate);
}


function Process() {
    OPENLodingCommon('Processing...');

    var EmpKy = $("#HdrSec1_CmbEmpNo_cd").data("kendoComboBox").value();
    var SalGrpKy = $("#HdrPart_CmbSalPrcsGrp_Cd").data("kendoComboBox").value();
    var SalTypKy = $("#HdrPart_CmbSalTyp_Cd").data("kendoComboBox").value();
    var Date = $("#HdrPart_FrmDate").val();

    if (EmpKy < 1)
    { EmpKy = 0; }

    if (SalGrpKy < 1)
    { SalGrpKy = 0; }

    if (EmpKy == 0 && SalGrpKy == 0) {
        alert("Please Select Salary Process Group or Employee to Process");
        return;
    }

    $.ajax({
        url: SalaryProcess,
        data: {
            SalGrpKy: SalGrpKy,
            SalTypKy:SalTypKy,
            EmpKy: EmpKy,
            Date: Date,
        },
        contentType: 'application/json; charset=utf-8',
        dataType: "Json",
        success: function (data) {
            if (data == true) {
                CLOSELoadingCommon();
                alert('Processed Succesfully..');
            }
            else {
                CLOSELoadingCommon();
                alert('Process Failed..');
            }
            
        },
        error: function (e) {
            CLOSELoadingCommon();
            return false;
            alert('Process Failed..');
        }
    });
}


function LoadCombo() {


    $("#HdrPart_CmbSalPrcsGrp_Cd").width(200).kendoComboBox({
        dataValueField: "CdKy",
        dataTextField: "CdNm",
        dataSource: CdNm_SelectMob_Datasource('HdrPart_CmbSalPrcsGrp'),
        filter: "contains",
        suggest: true,
        placeholder: "Select a Salary Process Group.."
    });

    $("#HdrPart_CmbSalTyp_Cd").width(200).kendoComboBox({
        dataValueField: "CdKy",
        dataTextField: "CdNm",
        dataSource: CdNm_SelectMob_Datasource('HdrPart_CmbSalTyp'),
        filter: "contains",
        suggest: true,
        placeholder: "Select a Salary Type.."
    });


    $("#HdrSec1_CmbEmpNo_cd").width(200).kendoComboBox({

        dataValueField: "EmpKy",
        dataTextField: "EmpNo",

        dataSource: {
            type: "POST",
            transport: {

                read: urlEmpMas.Employee_LookUp_Web

            }
        },
        change: function (e) {
            var cmb = $("#HdrSec1_CmbEmpNo_cd").data("kendoComboBox");
            var EmpNo = cmb.value();
            

            if (EmpNo != "") {
                var validate = ComboValidations("HdrSec1_CmbEmpNo_cd");

                if (validate) {
                    $("#HdrSec1_CmbEmpNm_Nm").data("kendoComboBox").value(EmpNo);


                } else {
                    $("#HdrSec1_CmbEmpNm_Nm").data("kendoComboBox").value("");

                }
            }

        },
        filter: "contains",
        suggest: true,
        placeholder: "Select Employee EmpNo"
    })
    $("#HdrSec1_CmbEmpNm_Nm").width(200).kendoComboBox({

        dataValueField: "EmpKy",
        dataTextField: "EmpNm",

        dataSource: {
            type: "POST",
            transport: {

                read: urlEmpMas.Employee_LookUp_Web

            }
        },
        change: function (e) {
            var cmb = $("#HdrSec1_CmbEmpNm_Nm").data("kendoComboBox");
            var EmpNm = cmb.value();
            

            if (EmpNm != "") {

                var validate = ComboValidations("HdrSec1_CmbEmpNm_Nm");

                if (validate) {
                    $("#HdrSec1_CmbEmpNo_cd").data("kendoComboBox").value(EmpNm);


                } else {
                    $("#HdrSec1_CmbEmpNo_cd").data("kendoComboBox").value("");

                }
            }

        },
        filter: "contains",
        suggest: true,
        placeholder: "Select Employee Name"
    })

   

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
}
