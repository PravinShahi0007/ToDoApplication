
    function chk1() {
        if (document.getElementById('checkbox1').checked) {

            $('#ToDate').data('kendoDatePicker').enable(true);
        } else {
            $('#ToDate').data('kendoDatePicker').enable(false);
        }
    }

    function chk2() {
        if (document.getElementById('checkbox2').checked) {

            $('#DateTA').data('kendoDatePicker').enable(true);
        } else {
            $('#DateTA').data('kendoDatePicker').enable(false);
        }
    }

    function chk3() {
        if (document.getElementById('checkbox3').checked) {

            $('#DateTD').data('kendoDatePicker').enable(true);
        } else {
            $('#DateTD').data('kendoDatePicker').enable(false);
        }
    }
