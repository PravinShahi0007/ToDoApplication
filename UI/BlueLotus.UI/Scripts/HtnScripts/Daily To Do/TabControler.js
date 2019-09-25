
$("#BOQ_Main_TabStrip").kendoTabStrip({
    navigatable: true,
    //select: onSelect_BOQ_Main_TabStrip,
    activate: onActivate_BOQ_Main_TabStrip,
});

$(function () {
    var BOQ_Main_TabStrip = $("#BOQ_Main_TabStrip").kendoTabStrip().data("kendoTabStrip");
    BOQ_Main_TabStrip.select(0);
});




function onActivate_BOQ_Main_TabStrip(e) {

    var tabIndx = -1;
    tabIndx = $(e.item).index();

    //alert(tabIndx);

    if (tabIndx == 0) {

        //ComSaveFunction_FromOrdDetCmpn();
        clearLeaveFields();
        clearLeaveFieldsPrcsDetCmpn();

    }

    if (tabIndx == 1) {
        if (FormGlblData.IsDetailDirty == true) {
            //ComSaveFunction_With_TabIndex(0);
            var BOQ_Main_TabStrip = $("#BOQ_Main_TabStrip").kendoTabStrip().data("kendoTabStrip");
            BOQ_Main_TabStrip.select(0);

            FormGlblData.IsDetailDirty = false;

            return;
        }


        if (globalVariable.PrcsDetKy < 11) {
            alert("Select Task ID ...!");

            var BOQ_Main_TabStrip = $("#BOQ_Main_TabStrip").kendoTabStrip().data("kendoTabStrip");
            BOQ_Main_TabStrip.select(0);

            return;
        }
    }
}