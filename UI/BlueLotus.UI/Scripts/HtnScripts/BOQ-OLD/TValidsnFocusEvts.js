
    function isNumberOnlyTextField(evt) {
        var charCode = (evt.which) ? evt.which : evt.keyCode;
        if (charCode != 46 && charCode > 31
          && (charCode < 48 || charCode > 57))
            return false;
        return true;
    }

    $(document).ready(function () {
        $("#clientCmb").data("kendoComboBox").input.keydown(function (e) {
            var keycode = (e.keyCode ? e.keyCode : e.which);
            if (keycode == '13') {
                
                $("#locationCmb").data("kendoComboBox").input.focus();
            }
            e.stopPropagation();
        });

        $("#locationCmb").data("kendoComboBox").input.keydown(function (e) {
            var keycode = (e.keyCode ? e.keyCode : e.which);
            if (keycode == '13') {
                $("#clientCmb").data("kendoComboBox").input.focus();
            }
            e.stopPropagation();
        });
    });