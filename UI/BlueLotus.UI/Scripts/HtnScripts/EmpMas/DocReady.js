
$(document).ready(function () {
   
        $(".combo,.k-numerictextbox,.kendoDatePicker").css('width', "100%");

        document.getElementById("code").value = "";
        document.getElementById("codeA").value = "";
        document.getElementById("codeD").value = "";

        LoadCombo();
        $(".k-datepicker, .k-combobox").css('width', "100%");

        $('#ToDate').data('kendoDatePicker').enable(false);
        $('#DateTA').data('kendoDatePicker').enable(false);
        $('#DateTD').data('kendoDatePicker').enable(false);
        $("#AmtAdd").data("kendoNumericTextBox").value(0);
        $("#AmtDed").data("kendoNumericTextBox").value(0);
        $("#Type").data("kendoComboBox").value("");
        $("#TypeA").data("kendoComboBox").value("");
        $("#TypeD").data("kendoComboBox").value("");
        $("#Country").data("kendoComboBox").value("");
        var todayDate = new Date();
        $("#Date").data("kendoDatePicker").value(todayDate);

        document.getElementById("EmpNo").value = "";
        document.getElementById("EmployeeNm").value = "";
        document.getElementById("NIC").value = "";
        document.getElementById("EPFNO").value = "";
        $("#GenderFM").data("kendoComboBox").value("");

        $("#Ethnic").data("kendoComboBox").value("");
        $("#Religion").data("kendoComboBox").value("");
        document.getElementById("IsActive1").checked = false;


        LoadBAndi();
        LoadAlwGrid();
        LoadDedGrid();
        document.getElementById("checkbox1").checked = false;
        document.getElementById("checkbox2").checked = false;
        document.getElementById("checkbox3").checked = false;
        EmpDetailClear();

    

    });

