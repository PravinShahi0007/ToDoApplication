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
 
        var TextBoxVal = $("#" + ObjNm).val();

        if (TextBoxVal == "" || TextBoxVal.length == 0)
            return false;
        else
            return true;

    


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