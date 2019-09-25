function PMFilterOprtionDocReadyCus() {
    
    var viewModelwithBaseLine = kendo.observable({
        isChecked: false
    });
    kendo.bind($("#withBaseLine"), viewModelwithBaseLine);

    var viewModelwithNotCompletedTask = kendo.observable({
        isChecked: false
    });
    kendo.bind($("#withNotCompletedTask"), viewModelwithNotCompletedTask);

    var viewModelonlyCriticalTask = kendo.observable({
        isChecked: false
    });
    kendo.bind($("#onlyCriticalTask"), viewModelonlyCriticalTask);
    
    //$("#taskIdFilterOnMainMenuOption").kendoComboBox();
    $("#taskIdFilterOnMainMenuOption").kendoComboBox({
        dataTextField: "text",
        dataValueField: "value",
        dataSource: [
            { text: "Start Width", value: "SW" },
            { text: "Contains", value: "CO" },
            { text: "Equal", value: "EQ" },
            { text: "End Width", value: "EW" }
        ],
        filter: "contains",
        suggest: true,
        change: function (e) {
            var cmb = $("#taskIdFilterOnMainMenuOption").data("kendoComboBox");
            var cmbval = cmb.value();
            if (cmbval != "") {
                $("#taskIdFilterOnFilterOptinMenuOption").data("kendoComboBox").value(cmbval);
                $("#taskIdFilterOnMainMenuOption").data("kendoComboBox").value(cmbval);
                loadTaskIdFilter();
            }
        }
    });

    //$("#taskIdFilterOnFilterOptinMenuOption").kendoComboBox();
    $("#taskIdFilterOnFilterOptinMenuOption").kendoComboBox({
        dataTextField: "text",
        dataValueField: "value",
        dataSource: [
            { text: "Start Width", value: "SW" },
            { text: "Contains", value: "CO" },
            { text: "Equal", value: "EQ" },
            { text: "End Width", value: "EW" }
        ],
        filter: "contains",
        suggest: true,
        change: function (e) {
            var cmb = $("#taskIdFilterOnFilterOptinMenuOption").data("kendoComboBox");
            var cmbval = cmb.value();
            if (cmbval != "") {
                $("#taskIdFilterOnFilterOptinMenuOption").data("kendoComboBox").value(cmbval);
                $("#taskIdFilterOnMainMenuOption").data("kendoComboBox").value(cmbval);
                //loadTaskIdFilter();
            }
        }
    });

    $("#taskIdFilterOnFilterOptinMenuOption").data("kendoComboBox").value("SW");
    $("#taskIdFilterOnMainMenuOption").data("kendoComboBox").value("SW");

    $("#filteroptiondateFrom").kendoDatePicker();
    $("#filteroptiondateTo").kendoDatePicker();
    //$("#filteroptiondateFrom").val('03/06/1990');
    //$("#filteroptiondateTo").val('01/01/2070');

    $("#idPMFilterOptionWindow").tabs();

    $("#idFilterOptions").click(function () {
        $("#idDivPMFilterOptionWindow").show().kendoWindow({
            width: "990px",
            height: "300px",
            //position: { top: 100, left: "20%" },
            modal: true,
            title: "Open Dialog"
        });

        $('#idDivPMFilterOptionWindow').data('kendoWindow').center().open();
        $('.k-window-content.k-content').css('background', '#D9D9D9');
        $('.ui-tabs-panel.ui-widget-content.ui-corner-bottom').css('background', '#D9D9D9');
        $('.ui-tabs-nav.ui-helper-reset.ui-helper-clearfix.ui-widget-header.ui-corner-all').css('background', '#3F51B5');
    });

    $("#idClearFilter").click(function () {
        clearPMFilterOption();
        GetDataSourceFromFindSp();
    });

    $('#idOkFilterOptions').click(function () {
        $('#idDivPMFilterOptionWindow').data('kendoWindow').close();
        GetDataSourceFromFindSp();
    });

    $('#idCancelFilter').click(function () {
        clearPMFilterOption();
        $('#idDivPMFilterOptionWindow').data('kendoWindow').close();
    });

    function clearPMFilterOption() {
        $("#filteroptiondateFrom").val('03/06/1990');
        $("#filteroptiondateTo").val('01/01/2070');
        $("#taskIdFilterOnMainMenu").val('');
        $("#taskIdFilterOnFilterOptinMenu").val(''); 
        var viewModelwithBaseLine = kendo.observable({
            isChecked: false
        });
        kendo.bind($("#withBaseLine"), viewModelwithBaseLine);

        var viewModelwithNotCompletedTask = kendo.observable({
            isChecked: false
        });
        kendo.bind($("#withNotCompletedTask"), viewModelwithNotCompletedTask);

        var viewModelonlyCriticalTask = kendo.observable({
            isChecked: false
        });
        kendo.bind($("#onlyCriticalTask"), viewModelonlyCriticalTask);
        $("#taskIdFilterOnFilterOptinMenuOption").data("kendoComboBox").value("SW");
        $("#taskIdFilterOnMainMenuOption").data("kendoComboBox").value("SW");
    }

    //----------------------------------------------------------------

    var taskIdFilterOnMainMenuFocusInVal = null;
    $("#taskIdFilterOnMainMenu").focusin(function () {
        taskIdFilterOnMainMenuFocusInVal = $("#taskIdFilterOnMainMenu").val();
    });

    $("#taskIdFilterOnMainMenu").focusout(function () {
        var taskIdFilterOnMainMenuFocusOutVal = $("#taskIdFilterOnMainMenu").val();
        if (taskIdFilterOnMainMenuFocusInVal != taskIdFilterOnMainMenuFocusOutVal) {
            loadTaskIdFilter();
        }
    });

    $("#taskIdFilterOnMainMenu").keyup(function (e) {
        $("#taskIdFilterOnFilterOptinMenu").val($("#taskIdFilterOnMainMenu").val());
        var code = e.which; // recommended to use e.which, it's normalized across browsers
        if (code == 13) {
            var taskIdFilterOnMainMenuEnterKeyVal = $("#taskIdFilterOnMainMenu").val();
            if (taskIdFilterOnMainMenuFocusInVal != taskIdFilterOnMainMenuEnterKeyVal) {
                loadTaskIdFilter();
            }
        }
    });

    $("#taskIdFilterOnFilterOptinMenu").keyup(function () {
        $("#taskIdFilterOnMainMenu").val($("#taskIdFilterOnFilterOptinMenu").val());
    });
    
    function loadTaskIdFilter() {
        $("#taskIdFilterOnFilterOptinMenu").val($("#taskIdFilterOnMainMenu").val());
        GetDataSourceFromFindSp();
    }
}