var shortDateFormat = Date.CultureInfo.formatPatterns.shortDate;

function EffortToString(data) {
    return data.Activity_M().CumulativeEffort_M().getTotalDays().toFixed(0) + " days"; //.toFixed(2)
}

// to adjust the end date based on its time.
function AdjustedEndTimeConverter(data) {
    value = AdjustEndTime(data.activity);
    return value.toString("MM/dd/yy"); // toString(shortDateFormat);
}

RadiantQ.Binder.StartDateBinder = function ($elem, role, value, data) {
    $elem.datepicker({
        onClose: function (e) {
            var newDate = $elem.datepicker('getDate');
            data.Activity.PreferredStartTime = newDate;
            data.Activity.StartTime = newDate;
        }
    });
    $elem.datepicker("setDate", value.getter(data));
}

RadiantQ.Binder.EffortBinder = function ($elem, role, value, data) {
    $elem.spinner({
        min: 0,
        change: function (e) {
            var value = $(this).val();
            data.Activity_M().Effort_M(new RQTimeSpan(parseInt(value), 0, 0, 0));
        }
    }).val(data.Activity_M().Effort_M().getTotalDays());
}

RadiantQ.Binder.EndDateBinder = function ($elem, role, value, data) {
    $elem.datepicker({
        onClose: function (e) {
            var newDate = $elem.datepicker('getDate');
            if (data.activity.Effort_M() != RQTimeSpan.Zero_M() || newDate != data.activity.StartTime_M()) {
                data.activity.EndTime_M(newDate.addDays(1));
            }
        }
    });

    $elem.datepicker("setDate", AdjustedEndTimeAsString(data.activity));
}




/// Additional functions
function AdjustEndTime(activity) {
    var endTime = activity.EndTime_M();
    if (activity.Effort_M() != RQTimeSpan.Zero_M()) {
        if (endTime.Date().equals(endTime))
            endTime = endTime.clone().addDays(-1);
    }
    return endTime;
}

function AdjustedEndTimeAsString(activity) {

    if (!activity || activity instanceof RadiantQ.Gantt.Model.IActivity == false)
        return "";

    var shortDateFormat = Date.CultureInfo.formatPatterns.shortDate;
    var endTime = AdjustEndTime(activity);
    return endTime.toString(shortDateFormat);
}