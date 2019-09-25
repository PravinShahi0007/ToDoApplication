function FindRecord() {
    $("#FindFormShowroomLog").show().kendoWindow({
        width: "1000px",
        height: "600px",
        modal: true,
        title: "Find Form"
    });
    $("#FindFormShowroomLog").data("kendoWindow").center().open();
    LoadFindLogDatePicker();

}

function LoadFindLogDatePicker() {
    $("#HdrSec2_DatFindFromDate_Val").kendoDatePicker({
        format: "dd/MM/yyyy",
        parseFormats: ["/yyyy/MM/dd"],
        min: new Date(31, 2, 2009),
        change: function () {
            var value = this.value();

        }
    });
    $("#HdrSec2_DatFindToDate_Val")
    .kendoDatePicker({
        format: "dd/MM/yyyy",
        parseFormats: ["/yyyy/MM/dd"],
        min: new Date(31, 2, 2009),
        change: function () {
            var value = this.value();

        }
    });


    $.ajax({
        url: urlGetDateTime,
        contentType: "application/json; charset=utf-8",
        dataType: "Json",
        type: "POST",
        success: function (data) {
            $("#HdrSec2_DatFindToDate_Val").data("kendoDatePicker").value(data[1]);
        },
        error: function (e) {
            return false;
        }
    });
}

function FindLoadGrid() {
    var dataSource = new kendo.data.DataSource({
        batch: true,
        pageSize: 10,
        schema: {
            model: {
                id: "LogDetKy",
                fields: //Relavent fields of the grid should be bind with following model items
                {
                    Lino: { editable: false, nullable: false, type: "number" },
                    LogDetKy: { editable: true, nullable: false, type: "number" },
                    LogNo: { editable: true, nullable: false, type: "string" },
                    FstNm: { editable: true, nullable: false, type: "string" },
                    LstNm: { editable: true, nullable: false, type: "string" },
                    Initial: { editable: true, nullable: false, type: "string" },

                }
            }
        }
    });

    $("#FindFormGrid").kendoGrid({
        dataSource: dataSource,
        // autobind: true,
        navigatable: true,
        // filterable: true,
        filterable: {
            mode: "row"
        },
        pageable: true,
        sortable: true,
        reorderable: true,
        // columnMenu: true,
        selectable: "column",
        pageable: { refresh: true, pageSizes: [5, 10, 20, 50, 100] },
        columns: [
             {
                 field: "Lino", title: "LiNo", width: "50px",
                 filterable: {
                     cell: {
                         showOperators: false,
                         operator: "startswith"
                     }
                 }
             },

                 {
                     field: "LogDetKy", title: "LogDetKy", width: "100px", hidden: true,
                 },
                  {
                      field: "LogNo", title: "LogNo", width: "50px",
                      filterable: {
                          cell: {
                              showOperators: false,
                              operator: "startswith"
                          }
                      }

                  },
               {
                   field: "FstNm",
                   title: "FstNm",
                   width: "100px",
                   filterable: {
                       cell: {
                           showOperators: false,
                           operator: "startswith"
                       }
                   }
               },


           {
               field: "LstNm", title: "LstNm", width: "100px",
               filterable: {
                   cell: {
                       showOperators: false,
                       operator: "startswith"
                   }
               }
           },
            {
                field: "Initial", title: "Initial", width: "100px",
                filterable: {
                    cell: {
                        showOperators: false,
                        operator: "startswith"
                    }
                }

            },
        ],
        resizable: true,
        dataBinding: function () {
            record = (this.dataSource.page() - 1) * this.dataSource.pageSize();
        },
        editable: false
    });
}


function Search() {
    // var FrmDt = $("#HdrSec2_DatFindFromDate_Val").val();
    var FrmDt = kendo.toString($("#HdrSec2_DatFindFromDate_Val").data("kendoDatePicker").value(), "yyyy/MM/dd");
    if (FrmDt == undefined || FrmDt == "" || FrmDt == null) {
        var FrmDt = "1900/01/01";
    }
    var ToDt = kendo.toString($("#HdrSec2_DatFindToDate_Val").data("kendoDatePicker").value(), "yyyy/MM/dd");

    //  var ToDt = $("#HdrSec2_DatFindToDate_Val").val();
    if (ToDt == undefined || ToDt == "" || ToDt == null) {
        var ToDt = "2078/01/01";//"1/1/2078";
    }
    $.ajax({
        url: urlFindAction,
        data: JSON.stringify({
            LogTypKy: FormGlblData.TrnTypKy,
            TrnNo: '1',
            FrmDt: FrmDt,
            ToDt: ToDt,


        }),
        contentType: 'application/json; charset=utf-8',
        dataType: "Json",
        type: "POST",
        success: function (data) {
            FindLoadGrid();
            $('#FindFormGrid').data("kendoGrid").dataSource.filter(null);
            var grid = $("#FindFormGrid").data("kendoGrid");
            grid.dataSource.data([]);
            var j = 1;
            for (i = 0; i < data.length; i++) {

                $("#FindFormGrid").data("kendoGrid").dataSource.add({
                    Lino: j,
                    LogDetKy: data[i].LogDetKy,
                    LogNo: data[i].LogNo,
                    FstNm: data[i].Fname,
                    LstNm: data[i].Lname,
                    Initial: data[i].Initials,
                });
                j++
            }

        },
        error: function (e) {
            return false;
        }
    });

}

function ExitFindForm() {
    try {
        $("#FindFormGrid").data("kendoGrid").dataSource.data([]);

    } catch (e) {
    }

    $('#FindFormShowroomLog').data('kendoWindow').close();
}

function SelectPreRecord(LogDetKy) {
    $.ajax({
        url: urlSelectAction,
        data: JSON.stringify({
            logDetKy: LogDetKy,
            objKy: viewBag.ObjKy,
        }),
        contentType: 'application/json; charset=utf-8',
        dataType: "Json",
        type: "POST",
        success: function (data) {
            if (data.length >= 1) {
    
                document.getElementById("HdrSec1_InptName_Val").value = data[0].Fname;
                document.getElementById("HdrSec1_InptSName_Val").value = data[0].Lname;
                document.getElementById("HdrSec1_InptIName_Val").value = data[0].Initials;
                $("#HdrSec1_InptTpNu_Val").data("kendoNumericTextBox").value(data[0].PerTP);
                $("#HdrSec1_InptOTpNu_Val").data("kendoNumericTextBox").value(data[0].BusTP);
                $("#HdrSec1_DatDrivngDate_Val").data("kendoDatePicker").value(data[0].LogDate)
                $("#HdrSec1_DatDrvngTim_Val").data("kendoTimePicker").value(data[0].LogTime)
                $("#HdrSec1_CmbVehicalInt_Cd").data("kendoComboBox").value(data[0].VhlIntMdlKy);
                $("#HdrSec1_CmbSalesPerson_Cd").data("kendoComboBox").value(data[0].SalesPersonKy);
                if (data[0].IsDemoDriveLog == 1 || data[0].IsDemoDriveLog) {
                    $("#DmLogYes").prop("checked", true);
                } else {
                    $("#DmLogNo").prop("checked", true);

                }
                if (data[0].IsFeedBack == 1 || data[0].IsFeedBack) {
                    $("#FeedBackYes").prop("checked", true);
                } else {
                    $("#FeedBackNo").prop("checked", true);

                }
                if (data[0].IsGatePass == 1 || data[0].IsGatePass) {
                    $("#GatePassYes").prop("checked", true);
                } else {
                    $("#GatePassNo").prop("checked", true);

                }
                document.getElementById("HdrSec1_TxtArea_NextStp_Val").value = data[0].Comment;
                $("#HdrSec1_DatNextShdDate_Val").data("kendoDatePicker").value(data[0].NxtShdDate);
                $("#HdrSec1_CmbFlwUpAction_Cd").data("kendoComboBox").value(data[0].FlwUPActionKy);
                document.getElementById("AdrKy").value = data[0].AdrKy;
                document.getElementById("LogDetKy").value = data[0].LogDetKy;
                document.getElementById("HdrSec1_InptEmail_Val").value = data[0].PerEmail;
                document.getElementById("HdrSec1_InptOEmail_Val").value = data[0].BusEmail;
            }
            $('#FindFormShowroomLog').data('kendoWindow').close();


        },
        error: function (e) {
            return false;
        }
    });

}

$("#FindFormGrid").on("dblclick", "tr.k-state-selected", function () {
    var grid = $('#FindFormGrid').data().kendoGrid;
    var selectedItem = grid.dataItem(grid.select());
    var LogDetKy = selectedItem.LogDetKy;
    if (LogDetKy != "" || LogDetKy != undefined || LogDetKy != null) {
        SelectPreRecord(LogDetKy);
    } else {
        alert("please Select Any Trancsaction");
    }
});

function selected() {
    var grid = $('#FindFormGrid').data().kendoGrid;
    var selectedItem = grid.dataItem(grid.select());
    var LogDetKy = selectedItem.LogDetKy;
    if (LogDetKy != "" || LogDetKy != undefined || LogDetKy != null) {
    } else {
        alert("please Select Any Record");
    }
}