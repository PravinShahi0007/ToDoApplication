$(document).ready(function () {

    function loadGrid(dataBoq) {
        var container = document.getElementById("boqdetails"),
          //exapmleConsole = document.getElementById("example1console"),
          //autosave = document.getElementById('autosave'),
          load = document.getElementById('load'),
          save = document.getElementById('save'),
          //autosaveNotification,

          hot1 = new Handsontable(container, {
              data: dataBoq,
              startRows: 10,
              startCols: 10,
              rowHeaders: true,
              //colHeaders: true,
              colHeaders: ["BOQ Key", "BOQDet Key", "Line No", "Item Key", "Item No", "Item Nm", "Qty", "Rate", "Total", "Basic Rate"],
              columns: [
                            {},
                            {},
                            {},
                            {},
                            {
                                type: 'dropdown',
                                source: ["VH/P/1", "VH/P/2", "VH/P/3", "VH/P/4", "VH/P/5"]
                            },
                            {},
                            {},
                            {},
                            {},
                            {}
              ],
              minSpareRows: 1,
              contextMenu: true,
              afterChange: function (change, source) {
                  if (source === 'loadData') {
                      return; //don't save this change
                  }
                  //if (autosave.checked) {
                  //    clearTimeout(autosaveNotification);
                  //    ajax(
                  //      "json/save.json",
                  //      "POST",
                  //      function (data) {
                  //          exapmleConsole.innerText = 'Autosaved (' + change.length + ' ' + 'cell' + (change.length > 1 ? 's' : '') + ')';
                  //          autosaveNotification = setTimeout(function () {
                  //              exapmleConsole.innerText = 'Changes will be autosaved';
                  //          }, 1000);
                  //      },
                  //      JSON.stringify({ data: change })
                  //    );
                  //}


              }
          });
    }

    Handsontable.Dom.addEvent(load, 'click', function () {
        $.holdReady(true);
        $.ajax({
            type: "GET",
            dataType: 'json',
            async: false,
            timeout: 20000,
            data: { },
            url: urlBOQDetails_SelectWeb,//'/PMResource/TaskResourceDetails_Select',//'@Url.Action("ProjectResourceDetails_Select", "GanttChart")',
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
                //hot1.loadData(data);
                loadGrid(data);
                $.holdReady(false);
            }
        });
    });

    //Handsontable.Dom.addEvent(save, 'click', function () {
    //    ajax(
    //      "json/save.json",
    //      'POST',
    //      function (res) {

    //          var response = JSON.parse(res.response);
    //          if (response.result === 'ok') {
    //              exapmleConsole.innerText = 'Data saved';
    //          }
    //          else {
    //              exapmleConsole.innerText = 'Save error';
    //          }
    //      },
    //      JSON.stringify({ "data": hot1.getData() }) //returns all cells' data
    //    );
    //});

    //Handsontable.Dom.addEvent(autosave, 'click', function () {
    //    if (autosave.checked) {
    //        exapmleConsole.innerText = 'Changes will be autosaved';
    //    }
    //    else {
    //        exapmleConsole.innerText = 'Changes will not be autosaved';
    //    }
    //});

    //function bindDumpButton() {

    //    Handsontable.Dom.addEvent(document.body, 'click', function (e) {

    //        var element = e.target || e.srcElement;

    //        if (element.nodeName == "BUTTON" && element.name == 'dump') {
    //            var name = element.getAttribute('data-dump');
    //            var instance = element.getAttribute('data-instance');
    //            var hot = window[instance];
    //            console.log('data of ' + name, hot.getData());
    //        }
    //    });
    //}
    //bindDumpButton();

});