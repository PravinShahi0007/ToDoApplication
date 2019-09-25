var ShiftKy = 0;


var FormGlblData = {
    FormObjData: null,
    AllDefalutValueObj: null,
    ItmTypKy: 1,
    TrnTypKy: 1,
    AccessLvlKy: 1,
    ConfiLvlKy: 1,
}
$(document).ready(function () {

    GetFormObjData();

})

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
    setTimeout(setHdrSectionPropFun, 2000);
    LoadCombo();
    LoadTimePickers();
    //  LoadTaskCombo();
    Button_From_Dynamic('ButtonSec1');
    function setHdrSectionPropFun() {

        // ---------- Set ObjProperties
        setHdrSectionProp('', viewBag.ObjKy, '', 'HdrSec1');

        SetHandlingEnterKeyEvent('', viewBag.ObjKy);

    }
}

function LoadTimePickers() {

    $("#HdrSec1_StTm_val").kendoTimePicker({
        format: "HH:mm"
    });

    $("#HdrSec1_EdTm_val").kendoTimePicker({
        format: "HH:mm"
    });

    $("#HdrSec1_GrcePdIn_val").kendoTimePicker({
        format: "HH:mm"
    });

    $("#HdrSec1_GrcePdOut_val").kendoTimePicker({
        format: "HH:mm"
    });

    $("#HdrSec1_FstHfEdTm_val").kendoTimePicker({
        format: "HH:mm"
    });


    $("#HdrSec1_ScndHfStaTm_val").kendoTimePicker({
        format: "HH:mm"
    });

    $("#HdrSec1_ElyOTedTm_val").kendoTimePicker({
        format: "HH:mm"
    });

    $("#HdrSec1_LtOTSrtTm_val").kendoTimePicker({
        format: "HH:mm"
    });

    $("#HdrSec1_MinHrFrHfDy_val").kendoTimePicker({
        format: "HH:mm"
    });

    $("#HdrSec1_MinHrFrDy_val").kendoTimePicker({
        format: "HH:mm"
    });

}


function LoadCombo() {

    $("#HdrSec1_CmbShiftNm_Nm").kendoComboBox({
        dataValueField: "CdKy",
        dataTextField: "CdNm",
        dataSource: CdNm_SelectMob_Datasource('HdrSec1_CmbShiftNm'),
        change: function (e) {

            var cmb = $("#HdrSec1_CmbShiftNm_Nm").data("kendoComboBox");
            var EmpNo = cmb.value();


            if (EmpNo != "") {
                var validate = ComboValidations("HdrSec1_CmbShiftcde_cd");

                if (validate) {
                    $("#HdrSec1_CmbShiftcde_cd").data("kendoComboBox").value(EmpNo);
                    GetShiftDetails(EmpNo);

                } else {
                    $("#HdrSec1_CmbShiftcde_cd").data("kendoComboBox").value("");

                }
            }

        },
        filter: "contains",
        suggest: true,
        placeholder: "Select a Shift.."
    });

    $("#HdrSec1_CmbShiftcde_cd").kendoComboBox({
        dataValueField: "CdKy",
        dataTextField: "Code",
        dataSource: Code_SelectMob_Datasource('HdrSec1_CmbShiftcde'),
        change: function (e) {

            var cmb = $("#HdrSec1_CmbShiftcde_cd").data("kendoComboBox");
            var EmpNo = cmb.value();


            if (EmpNo != "") {
                var validate = ComboValidations("HdrSec1_CmbShiftNm_Nm");

                if (validate) {
                    $("#HdrSec1_CmbShiftNm_Nm").data("kendoComboBox").value(EmpNo);
                    GetShiftDetails(EmpNo);

                } else {
                    $("#HdrSec1_CmbShiftNm_Nm").data("kendoComboBox").value("");

                }
            }

        },
        filter: "contains",
        suggest: true,
        placeholder: "Select a Shift.."
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


function Save() {


    var Cdky = $("#HdrSec1_CmbShiftcde_cd").data('kendoComboBox').value();
    if (Cdky == null || Cdky == undefined || Cdky == "" || Cdky == 1) {
        alert("Select Shift")
        return;
    }

    var FrmTm = $("#HdrSec1_StTm_val").val();
    if (FrmTm == null || FrmTm == undefined || FrmTm == "") {
        alert("Enter Start Time")
        return;

    }
    var ToTm = $("#HdrSec1_EdTm_val").val();
    if (ToTm == null || ToTm == undefined || ToTm == "") {
        alert("Enter End Time")
        return;

    }

    var GraceInTm = $("#HdrSec1_GrcePdIn_val").val();
    var GraceOutTm = $("#HdrSec1_GrcePdOut_val").val();
    var FstHlfDayToTm = $("#HdrSec1_FstHfEdTm_val").val();
    var SecHlfDayFrmTm = $("#HdrSec1_ScndHfStaTm_val").val();
    var EarlyOTFrmTm = $("#HdrSec1_ElyOTedTm_val").val();
    var LateOTFrmTm = $("#HdrSec1_LtOTSrtTm_val").val();
    var MinHrHfDay = $("#HdrSec1_MinHrFrHfDy_val").val();
    var MinHrDay = $("#HdrSec1_MinHrFrDy_val").val();



    var isToTmNxtDay;
    if ($('#HdrSec1_NxtDt_val').is(":checked")) {
        isToTmNxtDay = 1;
    } else {
        isToTmNxtDay = 0;
    }


    var isAtnDtInDtm;
    if ($('#HdrSec1_AtenDyInDTm_val').is(":checked")) {
        isAtnDtInDtm = 1;
    } else {
        isAtnDtInDtm = 0;
    }

    var Day = $("#HdrSec1_NofDys_val").val();
    var ShiftAmt = $("#HdrSec1_SftAmt_val").val();

    $.ajax({
        url: urlShift_InsertUpdateWeb,
        data: JSON.stringify({
            Cdky: Number(Cdky),
            FrmTm: FrmTm,
            ToTm: ToTm,
            GraceInTm: GraceInTm,
            GraceOutTm: GraceOutTm,
            FstHlfDayToTm: FstHlfDayToTm,
            SecHlfDayFrmTm: SecHlfDayFrmTm,
            EarlyOTFrmTm: EarlyOTFrmTm,
            LateOTFrmTm: LateOTFrmTm,
            MinHrHfDay: MinHrHfDay,
            MinHrDay: MinHrDay,
            isToTmNxtDay: Number(isToTmNxtDay),
            isAtnDtInDtm: Number(isAtnDtInDtm),
            Day: Number(Day),
            ShiftAmt: Number(ShiftAmt),
            ShiftKy: ShiftKy

        }),
        contentType: 'application/json; charset=utf-8',
        dataType: "Json",
        type: "POST",
        success: function (data) {
            if (data > 1) {

                ShiftKy = data;
                alert("Successfully Saved");
            }
            else { alert("Failed"); }
        },
        error: function (e) {
            alert("Failed");
            return false;
        }
    });
}
function Cancel() {
    ShiftKy = 0;
   // $("#HdrSec1_CmbShiftcde_cd").data('kendoComboBox').value("");
   // $("#HdrSec1_CmbShiftNm_Nm").data('kendoComboBox').text("");
    $("#HdrSec1_StTm_val").val("");
    $("#HdrSec1_EdTm_val").val("");
    $("#HdrSec1_GrcePdIn_val").val("");
    $("#HdrSec1_GrcePdOut_val").val("");
    $("#HdrSec1_FstHfEdTm_val").val("");
    $("#HdrSec1_ScndHfStaTm_val").val("");
    $("#HdrSec1_ElyOTedTm_val").val("");
    $("#HdrSec1_LtOTSrtTm_val").val("");
    $("#HdrSec1_MinHrFrHfDy_val").val("");
    $("#HdrSec1_MinHrFrDy_val").val("");

     
    
     $("#HdrSec1_NxtDt_val").prop("checked", false);
       

     $("#HdrSec1_AtenDyInDTm_val").prop("checked", false);

    

    $("#HdrSec1_NofDys_val").val("");
    $("#HdrSec1_SftAmt_val").val("");

}

function GetShiftDetails(shiftKy) {





    $.ajax({
        url: urlShift_SelectWeb,
        data: JSON.stringify({

            ShiftKy: shiftKy

        }),
        contentType: 'application/json; charset=utf-8',
        dataType: "Json",
        type: "POST",
        success: function (Shiftentrymodel) {

            if (Shiftentrymodel.ShiftKy > 0) {
                ShiftKy = Shiftentrymodel.ShiftKy;

                $("#HdrSec1_CmbShiftcde_cd").data('kendoComboBox').value(ShiftKy);
                //$("#HdrSec1_CmbShiftNm_Nm").data('kendoComboBox').text(ShiftKy);
                $("#HdrSec1_StTm_val").val(Shiftentrymodel.FrmTm);
                $("#HdrSec1_EdTm_val").val(Shiftentrymodel.ToTm);
                $("#HdrSec1_GrcePdIn_val").val(Shiftentrymodel.GraceInTm);
                $("#HdrSec1_GrcePdOut_val").val(Shiftentrymodel.GraceOutTm);
                $("#HdrSec1_FstHfEdTm_val").val(Shiftentrymodel.FstHlfDayToTm);
                $("#HdrSec1_ScndHfStaTm_val").val(Shiftentrymodel.SecHlfDayFrmTm);
                $("#HdrSec1_ElyOTedTm_val").val(Shiftentrymodel.EarlyOTFrmTm);
                $("#HdrSec1_LtOTSrtTm_val").val(Shiftentrymodel.LateOTFrmTm);
                $("#HdrSec1_MinHrFrHfDy_val").val(Shiftentrymodel.MinHrHfDay);
                $("#HdrSec1_MinHrFrDy_val").val(Shiftentrymodel.MinHrDay);
               // $("#HdrSec1_NxtDt_val").val(Shiftentrymodel.isToTmNxtDay);
                 
                if (Shiftentrymodel.isToTmNxtDay == 1) {
                        $("#HdrSec1_NxtDt_val").prop("checked", true);
                    } else {
                        $("#HdrSec1_NxtDt_val").prop("checked", false);
                    }

                //$("#HdrSec1_AtenDyInDTm_val").val(Shiftentrymodel.isAtnDtInDtm);
                if (Shiftentrymodel.isAtnDtInDtm == 1) {
                    $("#HdrSec1_AtenDyInDTm_val").prop("checked", true);
                } else {
                    $("#HdrSec1_AtenDyInDTm_val").prop("checked", false);
                }

                $("#HdrSec1_NofDys_val").val(Shiftentrymodel.Day);
                $("#HdrSec1_SftAmt_val").val(Shiftentrymodel.ShiftAmt);
            }
            else { Cancel();}
        },

        error: function (e) {
            alert("Failed");
            return false;
        }

    })
}
