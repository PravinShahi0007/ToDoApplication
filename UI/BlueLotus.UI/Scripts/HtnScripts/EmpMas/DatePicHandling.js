
    function LoadToDate() {
        $("#DateT").kendoDatePicker({

            format: "dd/MM/yyyy",
            min: new Date(31, 2, 2009)
        });

    }


    $("#ToDate").kendoDatePicker({

        format: "dd/MM/yyyy",
        min: new Date(31, 2, 2009)
    });


    $("#DateTA").width(150).kendoDatePicker({

        format: "dd/MM/yyyy",
        min: new Date(31, 2, 2009)
    });
    $("#DateTA").closest("span.k-datepicker").width(250);



    function LoadToDateDed() {

        $("#DateTDed").width(150).kendoDatePicker({

            format: "dd/MM/yyyy",
            min: new Date(31, 2, 2009)
        });
        $("#DateTDed").closest("span.k-datepicker").width(200);

    }