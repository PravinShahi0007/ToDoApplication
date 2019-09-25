function Get_All_Validation_Obj() {
    var AllDefalutValueObj = [];
    var FormObjData = FormGlblData.FormObjData;
    for (var i = 0; i < FormObjData.length; i++) {
        if (FormObjData[i].isMust) {
            AllDefalutValueObj.push(FormObjData[i]);
        }
    }
    return AllDefalutValueObj;
}


function Save_FinalValidation() {
    for (var i = 0; i < FormGlblData.AllValidationObj.length; i++) {
        if (FormGlblData.AllValidationObj[i].ValidationMesg.length > 0) {
            if (FormGlblData.AllValidationObj[i].ObjTyp == 'Cmb') {
                if (!Save_ComboValidation(FormGlblData.AllValidationObj[i].ObjNm + '_Cd'))
                    return FormGlblData.AllValidationObj[i].ValidationMesg;
            }
            if (FormGlblData.AllValidationObj[i].ObjTyp == 'TextBox') {
                if (!Save_TextValidation(FormGlblData.AllValidationObj[i].ObjNm + '_Val'))
                    return FormGlblData.AllValidationObj[i].ValidationMesg;
            }
            if (FormGlblData.AllValidationObj[i].ObjTyp == 'DatePicker') {
                if (!Save_DateValidation(FormGlblData.AllValidationObj[i].ObjNm + '_Val'))
                    return FormGlblData.AllValidationObj[i].ValidationMesg;
            }
            if (FormGlblData.AllValidationObj[i].ObjTyp == 'TimePicker') {
                if (!Save_TimeValidation(FormGlblData.AllValidationObj[i].ObjNm + '_Val'))
                    return FormGlblData.AllValidationObj[i].ValidationMesg;
            }
        }
    }

    //if (!Save_ComboValidation('HdrSec2_CmbAcc_Cd'))
    //    return "Select the Account ..!";

    //if (!Save_ComboValidation('HdrSec2_CmbContractAcc_Cd'))
    //    return "Select the Contract Account ..!";

    return "";
}


function Save_ComboValidation(ObjNm) {

    var cmbVal = $("#" + ObjNm).data('kendoComboBox').value();

    if (cmbVal == 0 || cmbVal == null || cmbVal == 1)
        return false;
    else
        return true;
}

function Save_TextValidation(ObjNm) {
    //var HdrSec1_DatVouDate_Val = document.getElementById("HdrSec1_DatVouDate_Val").value;
    if (ObjNm == 'HdrSec1_InptName_Val') {
        var Fname = $("#" + ObjNm).val();
        var Lname = $("#HdrSec1_InptSName_Val").val();
        var Sname = $("#HdrSec1_InptIName_Val").val();

        if (!Fname && !Lname && !Sname)
            return false;
        else
            return true;
    }
    else if (ObjNm == 'HdrSec1_InptEmail_Val') {
        var PEmail = $("#" + ObjNm).val();
        var OEmail = $("#HdrSec1_InptOEmail_Val").val();

        if (!PEmail && !OEmail)
            return false;
        else
            return true;
    }
    else if (ObjNm == 'HdrSec1_InptTpNu_Val') {
        var PTp = $("#" + ObjNm).data("kendoMaskedTextBox").value() // $("#" + ObjNm).val();'
        try {
            PTp = PTp.replace(/[^0-9]/g, '')// PTp.match(/\d+/)[0];
        } catch (e) {

        }
        var OTP = $("#HdrSec1_InptOTpNu_Val").data("kendoMaskedTextBox").value(); // $("#HdrSec1_InptOTpNu_Val").val();
        try {
            OTP = OTP.replace(/[^0-9]/g, '')//OTP.match(/\d+/)[0];
        } catch (e) {

        }
        if (!PTp && !OTP || (PTp.length < 9 && OTP.length < 9)) {
            return false;
        } else {
                return true;
        }
    } else {
        var TextBoxVal = $("#" + ObjNm).val();

        if (TextBoxVal == "" || TextBoxVal.length == 0)
            return false;
        else
            return true;

    }


}
function Save_DateValidation(ObjNm) {

    var DateValue = $("#" + ObjNm).data("kendoDatePicker").value();

    if (!DateValue || DateValue.length == 0 || DateValue == "")
        return false;
    else
        return true;
}
function Save_TimeValidation(ObjNm) {
    var TimeValue = $("#" + ObjNm).data("kendoTimePicker").value();;

    if (!TimeValue || TimeValue == "" || TimeValue.length == 0)
        return false;
    else
        return true;
}



