
function Save_FinalValidation() {

    //  HdrSec2_CmbAcc_Cd
    //  HdrSec2_CmbContractAcc_Cd

    //if (!Save_ComboValidation('HdrSec2_CmbPrj_Cd'))
    //    return "Select the Project ..!";

    if (!Save_ComboValidation('HdrSec2_CmbLoc_Cd'))
        return "Select the Location ..!";

    var id = ("#" + viewBag.OurCd);
    var grid = $(id).data("kendoGrid");
    var dataSource = grid.dataSource;
    var total = dataSource.data().length;
    if (total < 1) {
        return "Add atleast one item ..!";
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