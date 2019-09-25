
var selectedActivityName_DataSource;

$(document).ready(function () {
    DialogFor_TaskEditDialog_LoadUnitCombo();
});

function OpenTaskEditDialog(ActivityName_DataSource) {

    selectedActivityName_DataSource = ActivityName_DataSource;

    $("#DialogFor_TaskEditDialog").show().kendoWindow({
        width: "280px",
        height: "180px",
        modal: true,
        title: "Task Edit"
    });

    if (selectedActivityName_DataSource.TrnUnitKy < 1)
        selectedActivityName_DataSource.TrnUnitKy = 1;

    $("#TaskEditDialog_UnitCmb_Cd").data("kendoComboBox").value(selectedActivityName_DataSource.TrnUnitKy);
    $('#DialogFor_TaskEditDialog').data('kendoWindow').center().open();
}

$("#TaskEditDialog_OkBtn").click(function () {

    var cmb = $("#TaskEditDialog_UnitCmb_Cd").data("kendoComboBox");
    var TrnUnitKy = cmb.value();
    var TrnUnit = cmb.text();

    selectedActivityName_DataSource.TrnUnitKy = TrnUnitKy;
    selectedActivityName_DataSource.TrnUnit = TrnUnit;

    $('#DialogFor_TaskEditDialog').data('kendoWindow').close();
});

function DialogFor_TaskEditDialog_LoadUnitCombo() {

    $("#TaskEditDialog_UnitCmb_Cd").kendoComboBox({
        dataValueField: "UnitKy",
        dataTextField: "Unit",
        dataSource: UnitMas_SelectMobDatasource('TaskEditDialog_UnitCmb'),
        change: function (e) {
           
        },
        filter: "startswith",
        suggest: true,
        placeholder: "Select a Unit.."
    });
}


function UnitMas_SelectMobDatasource(ObjNm) {
    
    //var ObjKy = GetObjKy(ObjNm);
    var dataSource = new kendo.data.DataSource(
    {
        transport: {
            read: {
                url: urlComboLoad.UnitMas_SelectMob,
                data: {
                    'ObjKy': 1,
                    'TrnTypKy': 1,
                    'PreKy': 1
                },
                dataType: "json"
            }
        }

    });
    return dataSource;
}

//function ComboValidations(cmbNm) {
//    var cmb = $("#" + cmbNm + "").data("kendoComboBox");
//    var val = cmb.value();
//    if (isNaN(val)) {
//        alert("'" + val + "' is not a Valid input");
//        $("#" + cmbNm + "").data("kendoComboBox").input.focus();
//        return false;
//    } else {
//        return true;
//    }
//}