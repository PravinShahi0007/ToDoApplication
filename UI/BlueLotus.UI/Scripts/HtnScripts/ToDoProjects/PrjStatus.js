function closeStatusDetails() {
    FormGlblData.PrjHdrAprKy = 1;
    $("#PopUpStatusDetails").data("kendoWindow").close();
}

//int ObjKy, int TrnTypKy, int PreKy
//CdMas 
function CdMasCd(ObjNm) {
    var ObjKy = GetObjKy(ObjNm);
    var PreKy = 1;

    var dataSource = new kendo.data.DataSource(
        {
            transport: {
                read: {
                    url: urlComboLoad.Code_SelectMob,
                    data: {
                        'ObjKy': ObjKy,
                        'PreKy': PreKy,
                        'TrnTypKy': '1'
                    },
                    dataType: "json"
                }
            }

        });
    return dataSource;
}

function CdMasNm(ObjNm) {
    var ObjKy =  GetObjKy(ObjNm);
    var PreKy = 1;

    var dataSource = new kendo.data.DataSource(
        {
            transport: {
                read: {
                    url: urlComboLoad.CdNm_SelectMob,
                    data: {
                        'ObjKy': ObjKy,
                        'PreKy': PreKy,
                        'TrnTypKy': '1'
                    },
                    dataType: "json"
                }
            }

        });
    return dataSource;
}
function LoadStatusCombo() {

    $("#HdrSec2_CmbSts_Cd")
          .kendoComboBox({
              dataValueField: "CdKy",
              dataTextField: "Code",
              dataSource: CdMasCd("HdrSec2_CmbSts"), //AnalysisCd(1, "HdrSec8_CmbAnl1"),
              change: function (e) {
                  var cmb = $("#HdrSec2_CmbSts_Cd").data("kendoComboBox");
                  var Anlky = cmb.value();
                  if (Anlky != "") {
                      var validate = ComboValidations("HdrSec2_CmbSts_Cd");
                      if (validate) {
                          $("#HdrSec2_CmbSts_Cd").data("kendoComboBox").value(Anlky);
                          $("#HdrSec2_CmbSts_Nm").data("kendoComboBox").value(Anlky);
                          GetAprData();
                      } else {

                          $("#HdrSec2_CmbSts_Cd").data("kendoComboBox").value("");
                          $("#HdrSec2_CmbSts_Nm").data("kendoComboBox").value("");
                      }
                  }

              },
              filter: "startswith",
              suggest: true,
              placeholder: "Select a Status",
          });

    
    $("#HdrSec2_CmbSts_Nm")
        .kendoComboBox({
            dataValueField: "CdKy",
            dataTextField: "CdNm",
            dataSource: CdMasNm("HdrSec2_CmbSts"),
            change: function (e) {
                var cmb = $("#HdrSec2_CmbSts_Nm").data("kendoComboBox");
                var Anlky = cmb.value();
                if (Anlky != "") {
                    var validate = ComboValidations("HdrSec2_CmbSts_Nm");
                    if (validate) {
                        $("#HdrSec2_CmbSts_Cd").data("kendoComboBox").value(Anlky);
                        $("#HdrSec2_CmbSts_Nm").data("kendoComboBox").value(Anlky);
                        GetAprData();
                    } else {
                        $("#HdrSec2_CmbSts_Cd").data("kendoComboBox").value("");
                        $("#HdrSec2_CmbSts_Nm").data("kendoComboBox").value("");
                    }
                }

            },
            filter: "startswith",
            suggest: true,
            placeholder: "Select a Status",
        });
}

function DatePickerLoad() {
    $("#HdrSec2_DatIssueDate_Val").kendoDatePicker({
        format: "yyyy/MM/dd",
        min: new Date(31, 2, 2009)
    });

    $("#HdrSec2_DatNexeDate_Val").kendoDatePicker({
        format: "yyyy/MM/dd",
        min: new Date(2009, 2, 31)
    });
}

function StatusDetailsSave() {

    var PrjStatusKy = $("#HdrSec2_CmbSts_Cd").data("kendoComboBox").value();
    if (!PrjStatusKy) {
        PrjStatusKy = 1;
    }
    if (PrjStatusKy == 1) {
        alert("Please Select a status");
        return;
    }
    var IssuetDate = document.getElementById("HdrSec2_DatIssueDate_Val").value; //$("#HdrSec2_DatIssueDate_Val").data("kendoDatePicker").value()
    var NextDate = document.getElementById("HdrSec2_DatNexeDate_Val").value;// $("#HdrSec2_DatNexeDate_Val").data("kendoDatePicker").value()
    var PrjKy = document.getElementById("InputStsPrjKy").value;

    $.ajax({
        url: UrlAprInsertUpdate,
        data: JSON.stringify({
            AprStatusDetail: JSON.stringify({
                "AprStsKy": PrjStatusKy,
                "AprDtm": IssuetDate,
                "NxActtDt": NextDate,
                "PrjKy": PrjKy,
                "PrjHdrAprKy": FormGlblData.PrjHdrAprKy
            }),
            ObjKy: viewBag.ObjKy,
           
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "Json",
        type: "POST",
        success: function (data) {
            if (data) {
                alert("Successs fully saved data")
                closeStatusDetails();
            } else {
                alert("Please try again")
            }
          
        },
        error: function (e) {
            return false;
        }
    });
}

function GetAprData() {
    var PrjStatusKy = $("#HdrSec2_CmbSts_Cd").data("kendoComboBox").value();
    if (!PrjStatusKy) {
        PrjStatusKy = 1;
    }
    var IssuetDate = document.getElementById("HdrSec2_DatIssueDate_Val").value;// $("#HdrSec2_DatIssueDate_Val").data("kendoDatePicker").value()
    var NextDate = document.getElementById("HdrSec2_DatNexeDate_Val").value; //$("#HdrSec2_DatNexeDate_Val").data("kendoDatePicker").value()
    var PrjKy = document.getElementById("InputStsPrjKy").value; 
    $.ajax({
        url: UrlAprSelect,
        data: JSON.stringify({
            AprStatusDetail: JSON.stringify({
                "AprStsKy": PrjStatusKy,
                "AprDtm": IssuetDate,
                "NxActtDt": NextDate,
                "PrjKy": PrjKy,
                "PrjHdrAprKy": FormGlblData.PrjHdrAprKy
            }),
            ObjKy: viewBag.ObjKy,

        }),
        contentType: "application/json; charset=utf-8",
        dataType: "Json",
        type: "POST",
        success: function (data) {
            if (data) {
                $("#HdrSec2_DatIssueDate_Val").data("kendoDatePicker").value(data[0].AprDtm);
                $("#HdrSec2_DatNexeDate_Val").data("kendoDatePicker").value(data[0].NxActtDt);
                FormGlblData.PrjHdrAprKy = data[0].PrjHdrAprKy;
            } else {
                
            }

        },
        error: function (e) {
            $("#HdrSec2_DatIssueDate_Val").data("kendoDatePicker").value("");
            $("#HdrSec2_DatNexeDate_Val").data("kendoDatePicker").value("");
            return false;
        }
    });
}

function GetAllAprStatusDetails(PrjKy) {
    dataSource = new kendo.data.DataSource({
        transport: {
            read: {
                url: UrlShowAllprStatus,
                dataType: "json"
            },
            parameterMap: function (options, operation) {

                if (operation == "read") {
                    return ({
                        'AprStatusDetail': PrjKy,
                        'ObjKy': viewBag.ObjKy
                    });
                }
            }

        },
        batch: true,
        pageSize: 50,
        schema: {
            model: {
                id: "CdNm",
                fields: {
                   
                    CdNm: { editable: true, nullable: false, type: "string" },                   
                    AprDtm: { editable: true, nullable: false, type: "string" },
                    AprDtm: { editable: true, nullable: false, type: "string" },

                }
            }
        }
    });
    $("#StatusDetails")
        .kendoGrid({
            dataSource: dataSource,            
            sortable: true,
            resizable: true,
            filterable: true,           
            pageable: true,
            columns: [
                { field: "CdNm", title: "Status", width: "70px" },
                { field: "AprDtm", title: "status Date", width: "70px"},
                { field: "NxActtDt", title: "Next Action Date", width: "70px", hidden: true },
               

            ],
            editable: false
        });
   
}