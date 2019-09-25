
function headerChange(sender, e) {
    $("#timeline").show();
}

function timelineClose(sender, e) {
    $("#timeline").hide();
}


// week header definition.
function weekHeaderLine() {
    var weeksHeader = new RadiantQ.Gantt.TimeScaleHeaderDefinition();
    weeksHeader.Type = RadiantQ.Gantt.TimeScaleType.Weeks;
    return weeksHeader;
}


// month header definition.
function monthHeaderLine() {
    var monthHeader = new RadiantQ.Gantt.TimeScaleHeaderDefinition();
    monthHeader.TextFormat = "MMM yyyy";
    monthHeader.Type = ns_gantt.TimeScaleType.Months;
    return monthHeader;
}


// year header definition.
function yearHeaderLine() {
    var yearHeader = new RadiantQ.Gantt.TimeScaleHeaderDefinition();
    yearHeader.TextFormat = "yyyy";
    yearHeader.Type = ns_gantt.TimeScaleType.Years;
    return yearHeader;
}


// day header definition.
function dayHeaderLine() {
    var daysHeader = new RadiantQ.Gantt.TimeScaleHeaderDefinition();
    daysHeader.Type = ns_gantt.TimeScaleType.Days;
    return daysHeader;
}
