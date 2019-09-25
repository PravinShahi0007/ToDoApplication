// to reload the gantt with selected Schedule.
function updateGantt(data, schedule) {
    // First set the source to null and then set the new source.
    var $gantt_container = $('#gantt_container');
    $gantt_container.GanttControl("option", "DataSource", null);
    $gantt_container.GanttControl({
        WorkTimeSchedule: schedule,
        DataSource: data
    });
}

function assDate(CalTypKy) {
    $.holdReady(true);
    var CalTypKy = CalTypKy;//9219;
    $.ajax({
        type: "GET",
        dataType: 'json',
        data: { CalTypKy: CalTypKy },
        url: urlGetCalDate,//'/GanttChart/GetCalDate',//'@Url.Action("GetCalDate", "GanttChart")',
        converters:
        {
            "text json": function (data) {
                return $.parseJSON(data, true
                /*converts date strings to date objects*/
                , true
                /*converts ISO dates to local dates*/
                );
            }
        },
        success: function (data) {
            calData = data;
            var schedule = getSelectedSchedule(CalTypKy);
            updateGantt(testData, schedule);
            goDrillGrid(tempPrjKy, tempPrcsSchKy, tempwithBaseLine);
            $.holdReady(false);
        }
    });
}

//this will be called when the activities are created.
function getSelectedSchedule(value) {
    //GetCalDataSource(value);
    switch (value) {
        case "24X5":
            return RadiantQ.Gantt.WorkTimeSchedule.Schedule24X5;
            break;
        case "24X7":
            return null;
            break;
        case "10X4":
            return new RadiantQ.Gantt.WorkTimeSchedule("Monday - Thursday, 10 Hours", Create4Days10HoursSchedule);
            break;
        case "8X5withholiday":
            //$.holdReady( true );
            //assDate();
            //$.holdReady(false);
            return new RadiantQ.Gantt.WorkTimeSchedule("Monday - Friday, 8 Hours, special Holidays", Create8X5ScheduleWithHolidays);
            break;
        case "8X5":
        default:
            return new RadiantQ.Gantt.WorkTimeSchedule("Monday - Friday, 8 Hours, special Holidays", Create8X5ScheduleWithHolidays);
            //return RadiantQ.Gantt.WorkTimeSchedule.Schedule8X5;
            break;
    }
}

// 8X5 Schedule With Special Holidays.
function Create8X5ScheduleWithHolidays(date) {
    //LoadDateSource( calData, date );
    for (i = 0; i < calData.length; i++) {
        if (date.equals(new Date(calData[i].YY, calData[i].MM, calData[i].DD))) //convertShortDateToObjDate( calData[i].CalDt )
        {
            return null;
        }
    }

    var intervals = new RadiantQ.Gantt.TimePeriodCollection();
    intervals.Add(new RadiantQ.Gantt.TimePeriod(date.clone().addHours(0.0), null, new RQTimeSpan(1, 0, 0, 0, 0)));
    return intervals;

    //return getSelectedSchedule("24X7");//RadiantQ.Gantt.WorkTimeSchedule.EightHoursByFiveDaysScheduleProvider(date);
}

// 10X4 Schedule With Special Holidays.
function Create4Days10HoursSchedule(date) {
    switch (date.getDayName()) {
        case "Monday":
        case "Tuesday":
        case "Wednesday":
        case "Thursday":
            var intervals = new RadiantQ.Gantt.TimePeriodCollection();
            intervals.Add(new RadiantQ.Gantt.TimePeriod(date.clone().addHours(8.0), null, new RQTimeSpan(0, 10, 0, 0, 0)));
            return intervals;
            break;
        default:
            return null;
    }
}