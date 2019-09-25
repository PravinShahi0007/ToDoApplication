
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

    //  HdrSec2_CmbAcc_Cd
    //  HdrSec2_CmbContractAcc_Cd

    //if (!Save_ComboValidation('HdrSec2_CmbAcc_Cd'))
    //    return "Select the Account ..!";

    //if (!Save_ComboValidation('HdrSec2_CmbContractAcc_Cd'))
    //    return "Select the Contract Account ..!";

    //if (FormGlblData.AllValidationObj.length > 0)

    for (var i = 0; i < FormGlblData.AllValidationObj.length; i++) {
        if (FormGlblData.AllValidationObj[i].ValidationMesg.length > 0) {
            if (FormGlblData.AllValidationObj[i].ObjTyp = 'Cmb') {
                if (!Save_ComboValidation(FormGlblData.AllValidationObj[i].ObjNm + '_Cd'))
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