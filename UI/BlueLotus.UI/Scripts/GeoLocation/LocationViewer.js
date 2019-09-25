

function GetGeoUser() {
    var dataSource = new kendo.data.DataSource(
      {
          serverFiltering: true,
          type           : "json",
          transport      : {
              read        : {
                  url: '@Url.Action("GetGeoUsr", "GeoLoc")',
              },
              
          
          }
      });
    return dataSource;
}
$(document).ready(function () {
    $("#cmbGeoUsr").kendoComboBox({
        dataValueField: "UsrKy",
        dataTextField: "UsrNm",
        dataSource: GetGeoUser(),
        filter: "contains",
        suggest: true,
        placeholder: "Select"
    });

    $("#Button1").click(function () {
        localStorage.setItem('GeoFromDate', $('#fromdatetimepicker').val());
        localStorage.setItem('GeoToDate', $('#todatetimepicker').val());
    });

    $.datetimepicker.setLocale('en');
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();

    if (dd < 10) {
        dd = '0' + dd
    }

    if (mm < 10) {
        mm = '0' + mm
    }
    today = dd + '/' + mm + '/' + yyyy;
    $('#fromdatetimepicker').datetimepicker({
        dayOfWeekStart: 1,
        lang: 'en',
        disabledDates: ['1986/01/08', '1986/01/09', '1986/01/10'],
        startDate: today
    });
    $('#fromdatetimepicker').datetimepicker({ value: localStorage.getItem('GeoFromDate'), step: 10 });
    var logic = function (currentDateTime) {
        if (currentDateTime && currentDateTime.getDay() == 6) {
            this.setOptions({
                minTime: '11:00'
            });
        } else
            this.setOptions({
                minTime: '8:00'
            });
    };
    $('#todatetimepicker').datetimepicker({
        dayOfWeekStart: 1,
        lang: 'en',
        disabledDates: ['1986/01/08', '1986/01/09', '1986/01/10'],
        startDate: today
    });
    $('#todatetimepicker').datetimepicker({ value: localStorage.getItem('GeoToDate'), step: 10 });
    var logic = function (currentDateTime) {
        if (currentDateTime && currentDateTime.getDay() == 6) {
            this.setOptions({
                minTime: '11:00'
            });
        } else
            this.setOptions({
                minTime: '8:00'
            });
    };
    if (!isPostBack) {
        $('#fromdatetimepicker').datetimepicker({ value: today, step: 10 });
        $('#todatetimepicker').datetimepicker({ value: today, step: 10 });
    }

});