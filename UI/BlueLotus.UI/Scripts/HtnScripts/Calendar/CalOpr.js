function GetCalTyp() {
    var dataSource = new kendo.data.DataSource(
      {
          transport: {
              read: {
                  url: urlCmbGetCalTyp,
                  dataType: "json"
              }
          }
      });
    return dataSource;
}
function GetHoliTyp() {
    var dataSource = new kendo.data.DataSource(
      {
          transport: {
              read: {
                  url: urlCmbGetHoliTyp,
                  dataType: "json"
              }
          }
      });
    return dataSource;
}

$(document).ready(function () {
    var data = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday", "EveryDay"];
    $("#cmbSingleDate").kendoComboBox({
        dataSource: data,
        placeholder: "Select"
    });

    $(function () {
        $("#fromdatepicker").kendoDatePicker();
        $("#todatepicker").kendoDatePicker();
        document.getElementById('fromdatepicker').value = "";
        document.getElementById('todatepicker').value = "";
        var dropdownlist = $("#cmbSingleDate").data("kendoDropDownList");
        // dropdownlist.val("");
    });


    $("#cmbHoliTyp").kendoComboBox({
        dataTextField: "HoliTypNm",
        dataValueField: "CdKy",
        dataSource: GetHoliTyp(),
        filter: "contains",
        suggest: true,
        change: onChangeHoliTyp,
        placeholder: "Select..."
    });
    $("#cmbCalTyp").kendoComboBox({
        dataValueField: "CdKy",
        dataTextField: "CalTypNm",
        dataSource: GetCalTyp(),
        filter: "contains",
        suggest: true,
        change: onChangeCalTyp,
        placeholder: "Select..."
    });
    function onChangeCalTyp() {

        getAllHolidays(this.value());
    }
    function onChangeHoliTyp() {
    }

});
function ShowCalendar(holiType) {

    var val = PassData();
    var today = val[0];
    var events = val[1];

    $("#calendar").kendoCalendar({
        change: onChange,
        value: today,
        dates: events,
        month: {
            content: '# if ($.inArray(+data.date, data.dates,data.type) != -1) { #' +
                        '<div class="' +
                           '# if (data.value> ' + 0 + ' && dicDates[new Date(data.date).getTime()] == 190224) { #' +
                               "public" +
                           '# } else if (data.value> ' + 0 + ' && dicDates[new Date(data.date).getTime()] == 190225) { #' +
                               "bank" +
                           '# } else if (data.value> ' + 0 + ' && dicDates[new Date(data.date).getTime()] == 190226) { #' +
                               "mercantile" +
                           '# } else if (data.value> ' + 0 + ' && dicDates[new Date(data.date).getTime()] == 190227) { #' +
                               "poya" +
                            '# } else if (data.value> ' + 0 + ' && dicDates[new Date(data.date).getTime()] == 190228) { #' +
                               "custom1" +
                             '# } else if (data.value> ' + 0 + ' && dicDates[new Date(data.date).getTime()] == 190232) { #' +
                               "custom2" +
                            '# } else if (data.value> ' + 0 + ' && dicDates[new Date(data.date).getTime()] == 190233) { #' +
                               "custom3" +
                           '# } else { #' +
                               "other" +
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
    $("#PopUp").show().kendoWindow({
        width: "500px",
        height: "500px",

        resizable: false,
        title: "Calendar Operations",
    });
    $('#PopUp').data('kendoWindow').center().open();

    var val = new Date(document.getElementById('lblClickedDate').textContent).getTime()
    getSelectedHolidayTyp(val);
}


var datearray = [];
var holityparray = [];
function getAllHolidays(CalTypKy) {

    $.ajax({
        url: urlGetAllHolidays,
        data: {
            CalTypKy: CalTypKy
        },
        type: "POST",
        error: function () {
            alert("Unable to process");
        },
        success: function (data) {
            events = [];
            var date = null;
            var holiType = null;
            if (data != null || data != undefined) {

                for (var i = 0 ; i < data.length ; i++) {
                    date = data[i].CalDt;
                    holiType = data[i].HoliTypCd;
                    holiType = parseInt(holiType);
                    dicDates[date] = holiType;
                    date = parseInt(date);
                    events.push(date);
                }
                $("#calendar").empty();
                ShowCalendar(holiType);
            }
        }
    })
}
function getSelectedHolidayTyp(ComponentDt) {

    var cmbCal = $("#cmbCalTyp").data("kendoComboBox");
    var CalTypKy = cmbCal.value();
    var ComponentDt = parseInt(ComponentDt);
    var FrmDt = document.getElementById('lblClickedDate').innerHTML;
    var ToDt = document.getElementById('lblClickedDate').innerHTML;
    $.ajax({
        url: urlgetSelectedHolidayTyp,
        data: {
            ComponentDt: ComponentDt,
            CalTypKy: CalTypKy,
            FrmDt: FrmDt,
            ToDt: ToDt
        },
        type: "POST",
        error: function () {
            alert("Unable to process");
        },
        success: function (data) {

            var selectedCalTyp = null;
            var selectedCalTypKy = 0;
            if (data.length > 0) {
                selectedCalTyp = data[0].HoliTyp;
                selectedCalTypKy = data[0].HolTypKy;

                document.getElementById('lblHoliType').innerHTML = selectedCalTyp;

                if (selectedCalTypKy > 11 ) {
                    
                    $("#cmbHoliTyp").data("kendoComboBox").value(selectedCalTypKy);
                }
                else {
                    $("#cmbHoliTyp").data("kendoComboBox").value(1);
                    $("#cmbHoliTyp").data("kendoComboBox").text("");
                }
                

            }
            else {
                document.getElementById('lblHoliType').innerHTML = "Working Day";
                $("#cmbHoliTyp").data("kendoComboBox").value(1);
                $("#cmbHoliTyp").data("kendoComboBox").text("");
            }
        }
    })
}


var dicDates = {};
function PassData() {
    var today = new Date();
    return [today, events];
}

$(document).ready(function () {
    var today = new Date();
    events = [];
    document.getElementById('lblClickedDate').innerHTML = today;
    // ShowCalendar();
    $(document).keyup(function (e) {
        if (e.keyCode == 27) { // escape key maps to keycode `27`
            $('#PopUp').data('kendoWindow').close();
        }
    });

});

function AddHoliday() {
    events.empty;

    var cmbCal = $("#cmbCalTyp").data("kendoComboBox");
    var cmbHoli = $("#cmbHoliTyp").data("kendoComboBox");
    var holiType = cmbHoli.value();
    var CalTypKy = cmbCal.value();

    if (holiType == "" || CalTypKy == "") {
        alert("Please select the calendar type or holiday type");
    }
    else {
        var cmbCal = $("#cmbCalTyp").data("kendoComboBox");
        var cmbHoli = $("#cmbHoliTyp").data("kendoComboBox");
        var holiType = cmbHoli.value();
        var CalTypKy = cmbCal.value();
        holiType = parseInt(holiType);
        CalTypKy = parseInt(CalTypKy);
        var selectedDate = $("#lblClickedDate").text();
        selectedDate = selectedDate.split("/");
        var newDate = selectedDate[1] + "/" + selectedDate[0] + "/" + selectedDate[2];
        events.push(new Date(selectedDate).getTime());
        dicDates[new Date(selectedDate).getTime()] = holiType;
        var ComponentDt = new Date(selectedDate).getTime();
        var VisibleDt = selectedDate.toString();
        var HolTypKy = holiType;

        $.ajax({
            url: urlInsertHoliday,
            data: JSON.stringify({
                CalDt: VisibleDt,
                CalTypKy: CalTypKy,
                ComponentDt: ComponentDt,
                HoliDayTypKy: HolTypKy
            }),
            contentType: 'application/json; charset=utf-8',
            dataType: "Json",
            type: "POST",
            success: function (data) {
                alert("successfully Saved!");
                $('#PopUp').data('kendoWindow').close();
            },
            error: function (e) {
                return false;
            }
        });
    }
    $("#calendar").empty();
    ShowCalendar(holiType)
}

//*********************************
function AddMultiHoli() {
    var start = document.getElementById("fromdatepicker").value;
    var end = document.getElementById("todatepicker").value;
    var cmbHoli = $("#cmbHoliTyp").data("kendoComboBox");
    var cmbCal = $("#cmbCalTyp").data("kendoComboBox");
    var cmbSinHol = $("#cmbSingleDate").data("kendoComboBox");
    var holiTypKy = cmbHoli.value();
    var CalTypKy = cmbCal.value();
    var cmbSinHolval = cmbSinHol.value();
    if (holiTypKy == "" || CalTypKy == "" || cmbSinHolval == "" || start == "" || end == "") {
        alert("Invalid Input Details");
    }
    else {
        holiType = parseInt(holiTypKy);
        CalTypKy = parseInt(CalTypKy);
        var start = document.getElementById("fromdatepicker").value;
        var end = document.getElementById("todatepicker").value;
        var initialstartdate = start.split(/\//);
        var initialenddate = end.split(/\//);
        var startdatetoprocess = [initialstartdate[0], initialstartdate[1], initialstartdate[2]].join('/');
        var enddatetoprocess = [initialenddate[0], initialenddate[1], initialenddate[2]].join('/');
        var convstartdate = new Date(startdatetoprocess);
        var convenddate = new Date(enddatetoprocess);
        var errorstatus = false;
        var between = getDates(convstartdate, convenddate);
        SplittedDates = between.toString().split(",");
        dateList = [];
        datalot = [];
        for (var val = 0; val < between.length; val++) {
            dateList.push(new Date(SplittedDates[val]).getTime());

            dicDates[new Date(SplittedDates[val]).getTime()] = holiType;
            var CalDt = new Date(SplittedDates[val]).getTime();
            var HolTypKy = holiType;
            datalot.push(CalTypKy + "*" + CalDt + "*" + HolTypKy + "*" + SplittedDates[val] + "|");
        }
        $.ajax({

            url: urlInsertMultipleHolidays,
            data: JSON.stringify({
                HoliLot: datalot.toString()
            }),
            contentType: 'application/json; charset=utf-8',
            dataType: "Json",
            type: "POST",
            success: function (data) {
            },
            error: function (e) {
                errorstatus = true;
            }
        });

        if (errorstatus == true) {
            alert("Error Occured");
        }
        else {
            alert("Saved Successfully");
        }
        RefreshCal();
    }
}
function RefreshCal() {

    var cmbCal = $("#cmbCalTyp").data("kendoComboBox");
    var CalTypKy = cmbCal.value();
    if (CalTypKy.length <= 0 || CalTypKy == undefined) {
        alert("Please select the calendar type");
    }
    else {
        getAllHolidays(CalTypKy);
    }
}



function RemoveHoli() {
    var start = document.getElementById("fromdatepicker").value;
    var end = document.getElementById("todatepicker").value;
    var cmbHoli = $("#cmbHoliTyp").data("kendoComboBox");
    var cmbCal = $("#cmbCalTyp").data("kendoComboBox");
    var cmbSinHol = $("#cmbSingleDate").data("kendoComboBox");
    var holiTypKy = cmbHoli.value();
    var CalTypKy = cmbCal.value();
    var cmbSinHolval = cmbSinHol.value();
    if (holiTypKy == "" || CalTypKy == "" || cmbSinHolval == "" || start == "" || end == "") {
        alert("Invalid Input Details");
    }
    else {
        holiType = parseInt(holiTypKy);
        CalTypKy = parseInt(CalTypKy);
        var initialstartdate = start.split(/\//);
        var initialenddate = end.split(/\//);
        var startdatetoprocess = [initialstartdate[0], initialstartdate[1], initialstartdate[2]].join('/');
        var enddatetoprocess = [initialenddate[0], initialenddate[1], initialenddate[2]].join('/');
        var convstartdate = new Date(startdatetoprocess);
        var convenddate = new Date(enddatetoprocess);
        var errorstatus = false;
        var between = getDates(convstartdate, convenddate);
        SplittedDates = between.toString().split(",");
        dateList = [];
        datalot = [];
        for (var val = 0; val < between.length; val++) {
            dateList.push(new Date(SplittedDates[val]).getTime());

            dicDates[new Date(SplittedDates[val]).getTime()] = holiType;
            var CalDt = new Date(SplittedDates[val]).getTime();
            var HolTypKy = holiType;
            datalot.push(CalTypKy + "*" + CalDt + "*" + HolTypKy + "*" + SplittedDates[val] + "|");
        }
        $.ajax({

            url: urlRemoveHolidays,
            data: JSON.stringify({
                HoliLot: datalot.toString()
            }),
            contentType: 'application/json; charset=utf-8',
            dataType: "Json",
            type: "POST",
            success: function (data) {
            },
            error: function (e) {
                errorstatus = true;
            }
        });

        if (errorstatus == true) {
            alert("Error Occured");
        }
        else {
            alert("Saved Successfully");
        }
        RefreshCal();
    }
}
function RefreshCal() {

    var cmbCal = $("#cmbCalTyp").data("kendoComboBox");
    var CalTypKy = cmbCal.value();
    if (CalTypKy.length <= 0 || CalTypKy == undefined) {
        alert("Please select the calendar type");
    }
    else {
        getAllHolidays(CalTypKy);
    }
}

// This function doing this work.
function getDates(convstartdate, convenddate) {

    var datesArray = [];
    var finalDet = [];
    var startDate = new Date(convstartdate);

    while (startDate <= convenddate) {

        var cmbSingleDate = $("#cmbSingleDate").data("kendoComboBox");
        var cmbSingleDate = cmbSingleDate.value();
        var val = new Date(startDate).toString();
        datesArray.push(new Date(startDate) + "\n");
        startDate.setDate(startDate.getDate() + 1);
    }
    var val2 = null;
    for (var i = 0; i <= datesArray.length - 1; i++) {
        val2 = datesArray[i];
        if (cmbSingleDate == "Monday") {
            val2 = datesArray[i];
            if ((val2.includes('Mon'))) {
                finalDet.push(datesArray[i]);
            }
        }
        if (cmbSingleDate == "Tuesday") {
            val2 = datesArray[i];
            if ((val2.includes('Tue'))) {
                finalDet.push(datesArray[i]);
            }
        }
        if (cmbSingleDate == "Wednesday") {
            val2 = datesArray[i];
            if ((val2.includes('Wed'))) {
                finalDet.push(datesArray[i]);
            }
        }
        if (cmbSingleDate == "Thursday") {
            val2 = datesArray[i];
            if ((val2.includes('Thu'))) {
                finalDet.push(datesArray[i]);
            }
        }
        if (cmbSingleDate == "Friday") {
            val2 = datesArray[i];
            if ((val2.includes('Fri'))) {
                finalDet.push(datesArray[i]);
            }
        }
        if (cmbSingleDate == "Saturday") {
            val2 = datesArray[i];
            if ((val2.includes('Sat'))) {
                finalDet.push(datesArray[i]);
            }
        }
        if (cmbSingleDate == "Sunday") {
            val2 = datesArray[i];
            if ((val2.includes('Sun'))) {
                finalDet.push(datesArray[i]);
            }
        }
        if (cmbSingleDate == "EveryDay") {
            finalDet.push(datesArray[i]);
        }
    }
    return finalDet;
}