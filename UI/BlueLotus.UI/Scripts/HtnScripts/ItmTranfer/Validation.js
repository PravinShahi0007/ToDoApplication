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

    //if (!Save_ComboValidation('HdrSec2_CmbFrmPrj_Cd') && !Save_ComboValidation('HdrSec2_CmbFrmLoc_Cd'))
    //    return "Select atleast From Project or From Location ..!";

    //if (Save_ComboValidation('HdrSec2_CmbFrmPrj_Cd') && !Save_ComboValidation('HdrSec2_CmbToPrj_Cd'))
    //    return "Select To Project ..!";

    //if (Save_ComboValidation('HdrSec2_CmbFrmLoc_Cd') && !Save_ComboValidation('HdrSec2_CmbToLoc_Cd'))
    //    return "Select To Location ..!";

    //if (Save_ComboValidation('HdrSec2_CmbToPrj_Cd') && !Save_ComboValidation('HdrSec2_CmbFrmPrj_Cd'))
    //    return "Select From Project ..!";

    //if (Save_ComboValidation('HdrSec2_CmbToLoc_Cd') && !Save_ComboValidation('HdrSec2_CmbFrmLoc_Cd'))
    //    return "Select From Location ..!";

    //if (!Save_ComboValidation('HdrSec2_CmbFrmPrj_Cd'))
    //    return "Select From Project ..!";

    //if (!Save_ComboValidation('HdrSec2_CmbToPrj_Cd'))
    //    return "Select To Project ..!";

    //if (!Save_ComboValidation('HdrSec2_CmbFrmLoc_Cd'))
    //    return "Select From Location ..!";

    //if (!Save_ComboValidation('HdrSec2_CmbToLoc_Cd'))
    //    return "Select To Location ..!";

    //var id = ("#" + viewBag.OurCd);
    //var grid = $(id).data("kendoGrid");
    //var dataSource = grid.dataSource;
    //var total = dataSource.data().length;
    //if (total < 1) {
    //    return "Add atleast one item ..!";
    //}

    //return "";

    for (var i = 0; i < FormGlblData.AllValidationObj.length; i++) {
        if (FormGlblData.AllValidationObj[i].ValidationMesg.length > 0) {
            if (FormGlblData.AllValidationObj[i].ObjTyp = 'Cmb') {
                if (!Save_ComboValidation(FormGlblData.AllValidationObj[i].ObjNm + '_Cd'))
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