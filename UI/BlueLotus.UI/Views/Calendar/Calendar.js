$(document).ready(function () {
    function ShowCalendar(holiType) {
        var today = new Date();
        var events = events;
        $("#calendar").kendoCalendar({
            change: onChange,
            navigate: onNavigate,
            value: today,
            dates: events,
            month: {
                content: '# if ($.inArray(+data.date, data.dates,data.type) != -1) { #' +
                            '<div class="' +
                               '# if (data.value> ' + 0 + ' && dicDates[new Date(data.date).getTime()] == 10) { #' +
                                   "exhibition" +
                               '# } else if (data.value> ' + 0 + ' && dicDates[new Date(data.date).getTime()] == 20) { #' +
                                   "party" +
                               '# } else { #' +
                                   "cocktail" +
                               '# } #' +
                            '">#= data.value #</div>' +
                         '# } else { #' +
                         '#= data.value #' +
                         '# } #'
            },
            footer: false
        });
    }
    function onChange() {
        document.getElementById('lblClickedDate').innerHTML = kendo.toString(this.value(), 'd');
    }
});

