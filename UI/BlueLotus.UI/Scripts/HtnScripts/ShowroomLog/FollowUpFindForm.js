function FollowUpFindRecord() {
    $("#FollowUpLogFind").show().kendoWindow({
        width: "1000px",
        height: "600px",
        modal: true,
        title: "Find Form"
    });
    LoadFlwUpDatePicker();
    $("#FollowUpLogFind").data("kendoWindow").center().open();
}

function FlwUpSearch() {

    var FrmDt = kendo.toString($("#HdrSec3_DatFindFromDate_Val").data("kendoDatePicker").value(), "yyyy/MM/dd");
 
    if (FrmDt == undefined || FrmDt == "" || FrmDt == null) {
        var FrmDt = "1900/01/01";
    }
    var ToDt = kendo.toString($("#HdrSec3_DatFindToDate_Val").data("kendoDatePicker").value(), "yyyy/MM/dd");

 //   var ToDt = $("#HdrSec3_DatFindToDate_Val").val();
    if (ToDt == undefined || ToDt == "" || ToDt == null) {
        var ToDt = "2078/01/01";//"1/1/2078";
    }
    $.ajax({
        url: urlFindFallowUpRecord,
        data: JSON.stringify({
            LogTypKy: FormGlblData.TrnTypKy,
            TrnNo: '1',
            FrmDt: FrmDt,//'1900/01/01',
            ToDt:ToDt,// '2078/01/01',
        }),
        contentType: 'application/json; charset=utf-8',
        dataType: "Json",
        type: "POST",
        success: function (data) {
            FindLoadFallowUpGrid()
            try {
                $('#FallowUpFindFormGrid').data("kendoGrid").dataSource.filter(null);
                var grid = $("#FallowUpFindFormGrid").data("kendoGrid");
                grid.dataSource.data([]);
            } catch (e) {

            } 
           
            var j = 1;
            for (i = 0; i < data.length; i++) {

                $("#FallowUpFindFormGrid").data("kendoGrid").dataSource.add({
                    Lino: j,
                    LogDetKy: data[i].LogDetKy,
                    LogNo: data[i].LogNo,
                    FstNm: data[i].Fname,
                    LstNm: data[i].Lname,
                    Initial: data[i].Initials,
                    OffcialNumber: data[i].OffcialNumber,
                    PersnalNumber: data[i].PersnalNumber,
                    Reson: data[i].Reson,
                    FormName: data[i].FormName,
                });
                j++
            }
        },
        error: function (e) {
            return false;
        }
    });

}

function FindLoadFallowUpGrid() {
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
                    OffcialNumber: { editable: true, nullable: false, type: "string" },
                    PersnalNumber: { editable: true, nullable: false, type: "string" },
                    Reson: { editable: true, nullable: false, type: "string" }, 
                    FormName: { editable: true, nullable: false, type: "string" },

                }
            }
        }
    });

    $("#FallowUpFindFormGrid").kendoGrid({
        dataSource: dataSource,
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
                 field: "Lino", title: "LiNo", width: "30px", filterable: {
                     cell: {
                         showOperators: false
                     }
                 }
             },

                 {
                     field: "LogDetKy", title: "LogDetKy", width: "100px", hidden: true,
                 },
                  {
                      field: "LogNo", title: "LogNo", width: "30px", filterable: {
                          cell: {
                              showOperators: false
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
            {
                field: "OffcialNumber", title: "OffcialNumber", width: "100px",
                filterable: {
                    cell: {
                        showOperators: false,
                        operator: "startswith"
                    }
                }
            },
            {
                field: "PersnalNumber", title: "PersnalNumber", width: "100px",
                filterable: {
                    cell: {
                        showOperators: false,
                        operator: "startswith"
                    }
                }

            },
            {
                field: "Reson", title: "Reson", width: "100px",
                filterable: {
                    cell: {
                        showOperators: false,
                        operator: "startswith"
                    }
                }

            },
            {
                field: "FormName", title: "Form Name", width: "100px",
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


function LoadFlwUpDatePicker() {

    $("#HdrSec3_DatFindFromDate_Val")
.kendoDatePicker({
    format: "dd/MM/yyyy",
    parseFormats: ["yyyy/MM/dd"],
    min: new Date(31, 2, 2009),
    change: function () {
        var value = this.value();

    }
});
    $("#HdrSec3_DatFindToDate_Val")
    .kendoDatePicker({
        format: "dd/MM/yyyy",
        parseFormats: ["yyyy/MM/dd"],
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
            $("#HdrSec3_DatFindToDate_Val").data("kendoDatePicker").value(data[1]);
        },
        error: function (e) {
            return false;
        }
    });
}
function ExitFlwUpFindForm() {
    try {
        $("#FallowUpFindFormGrid").data("kendoGrid").dataSource.data([]);
    } catch (e) {

    }
    $('#FollowUpLogFind').data('kendoWindow').close();
}

$("#FallowUpFindFormGrid").on("dblclick", "tr.k-state-selected", function () {
    var grid = $('#FallowUpFindFormGrid').data().kendoGrid;
    var selectedItem = grid.dataItem(grid.select());
    var LogDetKy = selectedItem.LogDetKy;
    if (LogDetKy != "" || LogDetKy != undefined || LogDetKy != null) {
        SelectCusFlwUpRecord(LogDetKy);
    } else {
        alert("please Select Any Trancsaction");
    }
});

function SelectCusFlwUpRecord(LogDetKy) {
    $.ajax({
        url: UrlGetLogDetail,
        data: JSON.stringify({
            logDetKy: LogDetKy,
            objKy: viewBag.ObjKy,
        }),
        contentType: 'application/json; charset=utf-8',
        dataType: "Json",
        type: "POST",
        success: function (data) {
            if (data.length >= 1) {
                $("#HdrSec1_DatEnqDate_Val").data("kendoDatePicker").value(data[0].LogDate);
                $("#HdrSec1_DatEnqTim_Val").data("kendoTimePicker").value(data[0].LogTime);
                document.getElementById("HdrSec1_InptName_Val").value = data[0].Fname;
                document.getElementById("HdrSec1_InptSName_Val").value = data[0].Lname;
                document.getElementById("HdrSec1_InptIName_Val").value = data[0].Initials;
                document.getElementById("HdrSec1_InptEmail_Val").value = data[0].PerEmail;
                document.getElementById("HdrSec1_InptOEmail_Val").value = data[0].BusEmail;
                $("#HdrSec1_InptTpNu_Val").data("kendoMaskedTextBox").value(data[0].PerTP);
                $("#HdrSec1_InptOTpNu_Val").data("kendoMaskedTextBox").value(data[0].BusTP);
                $("#HdrSec1_CmbTypeOfLead_Cd").data("kendoComboBox").value(data[0].LeadTypKy);
                document.getElementById("HdrSec1_InptCrntVhicle_Val").value = data[0].CrnttVhl;
                document.getElementById("HdrSec1_InptCrntVhicleClr_Val").value = data[0].CrnttVhlClr;
                document.getElementById("HdrSec1_InptVhicleReg_Val").value = data[0].CrnttVhlReg;
                $("#HdrSec1_CmbSalesPerson_Cd").data("kendoComboBox").value(data[0].SalesPersonKy);
                document.getElementById("HdrSec1_TxtArea_Reson_Val").value = data[0].Reson;
                $("#HdrSec1_CmbVehicalInt_Cd").data("kendoComboBox").value(data[0].VhlIntMdlKy);
             //   $("#HdrSec1_CmbVehicalIntSers_Cd").data("kendoComboBox").value(data[0].VhlIntSeriesKy);
                $("#HdrSec1_CmbActionLst_Cd").data("kendoComboBox").value(data[0].ActionKy);
                $("#HdrSec1_CmbCustStatus_Cd").data("kendoComboBox").value(data[0].CustStatusKy);
                document.getElementById("HdrSec1_TxtArea_NextStp_Val").value = data[0].Comment;
                $("#HdrSec1_DatNextShdDate_Val").data("kendoDatePicker").value(data[0].NxtShdDate);
                $("#HdrSec1_CmbFlwUpAction_Cd").data("kendoComboBox").value(data[0].FlwUPActionKy);
                document.getElementById("AdrKy").value = data[0].AdrKy;
                document.getElementById("LogDetKy").value = data[0].LogDetKy;
                if (data[0].cusStatus == 1 || data[0].cusStatus) {
                    $("#Yes").prop("checked", true);
                } else {
                    $("#No").prop("checked", true);

                }

            }
            $('#FollowUpLogFind').data('kendoWindow').close();
            },
        error: function (e) {
            return false;
        }
    });

}