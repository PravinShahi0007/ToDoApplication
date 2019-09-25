var FormGlblData = {
    FormObjData: null,
    TrnTypKy: 1,
    AccessLvlKy: 1,
    ConfiLvlKy: 1,
    TrnKy: 1,
    AllDefalutValueObj: null,
    GotItemRate: 0
};
OPENLodingForm();
LoadGloabData();

function LoadComboAndDateTime() {
    LoadDateAndtimeNumber();
    LoadCombo();
}

function LoadDateAndtimeNumber() {
    $("#HdrSec1_DatEnqDate_Val")
        .kendoDatePicker({
            format: "dd/MM/yyyy",
            parseFormats: "yyyy/MM/dd",
            value: viewBag.DateNow, //new Date(),
            min: new Date(31, 2, 2009),
            change: function() {

            }
        });
    $("#HdrSec1_DatEnqTim_Val")
        .kendoTimePicker({
            format: "HH:mm",
            animation: false,
            value: viewBag.TimeNow //new Date()
        });
    $("#HdrSec1_InptTpNu_Val")
        .kendoMaskedTextBox({
            mask: "(999) 000-0000",
            change: function() {
            }
        });
    $("#HdrSec1_InptOTpNu_Val")
        .kendoMaskedTextBox({
            mask: "(999) 000-0000",
            change: function() {
            }
        });

    $("#HdrSec1_DatNextShdDate_Val")
        .kendoDatePicker({
            format: "dd/MM/yyyy",
            parseFormats: ["yyyy/MM/dd"],
            value: new Date(),
            min: new Date(31, 2, 2009),
            change: function() {
                var value = this.value();

            }
        });
}

function LoadCombo() {
    $("#HdrSec1_CmbSalesPerson_Cd")
        .kendoComboBox({
            dataValueField: "AdrKy",
            dataTextField: "AdrID",
            dataSource: AdrID("HdrSec1_CmbSalesPerson"),
            change: function(e) {
                var cmb = $("#HdrSec1_CmbSalesPerson_Cd").data("kendoComboBox");
                var cmbVal = cmb.value();
                if (cmbVal != "") {
                    var validate = ComboValidations("HdrSec1_CmbSalesPerson_Cd");
                    if (validate) {
                        $("#HdrSec1_CmbSalesPerson_Cd").data("kendoComboBox").value(cmbVal);
                    } else {
                        $("#HdrSec1_CmbSalesPerson_Cd").data("kendoComboBox").value("");
                    }
                }
            },
            filter: "startswith",
            suggest: true,
            placeholder: "Select a Sales Person"
        });

    $("#HdrSec1_CmbVehicalInt_Cd")
        .kendoComboBox({
            dataValueField: "CdKy",
            dataTextField: "CdNm",
            dataSource: CdmasName("HdrSec1_CmbVehicalInt"),
            change: function(e) {
                var cmb = $("#HdrSec1_CmbVehicalInt_Cd").data("kendoComboBox");
                var cmbVal = cmb.value();
                if (cmbVal != "") {
                    var validate = ComboValidations("HdrSec1_CmbVehicalInt_Cd");
                    if (validate) {
                        $("#HdrSec1_CmbVehicalInt_Cd").data("kendoComboBox").value(cmbVal);
                       // LoadVehicalSeries();

                    } else {
                        $("#HdrSec1_CmbVehicalInt_Cd").data("kendoComboBox").value("");
                    }
                }
            },
            filter: "startswith",
            suggest: true,
            placeholder: "Select a Model"
        });

    //$("#HdrSec1_CmbVehicalIntSers_Cd")
    //    .kendoComboBox({
    //        dataValueField: "ItmKy",
    //        dataTextField: "ItmNm",
    //        dataSource: ItmNmDatasource('HdrSec1_CmbVehicalIntSers'),//CdmasName("HdrSec1_CmbVehicalIntSers"),
    //        change: function(e) {
    //            var cmb = $("#HdrSec1_CmbVehicalIntSers_Cd").data("kendoComboBox");
    //            var cmbVal = cmb.value();
    //            if (cmbVal != "") {
    //                var validate = ComboValidations("HdrSec1_CmbVehicalIntSers_Cd");
    //                if (validate) {
    //                    $("#HdrSec1_CmbVehicalIntSers_Cd").data("kendoComboBox").value(cmbVal);

    //                } else {
    //                    $("#HdrSec1_CmbVehicalIntSers_Cd").data("kendoComboBox").value("");
    //                }
    //            }
    //        },
    //        filter: "startswith",
    //        suggest: true,
    //        placeholder: "Select a Series"
    //    });
    $("#HdrSec1_CmbActionLst_Cd")
        .kendoComboBox({
            dataValueField: "CdKy",
            dataTextField: "CdNm",
            dataSource: CdmasName("HdrSec1_CmbActionLst"),
            change: function(e) {
                var cmb = $("#HdrSec1_CmbActionLst_Cd").data("kendoComboBox");
                var cmbVal = cmb.value();
                if (cmbVal != "") {
                    var validate = ComboValidations("HdrSec1_CmbActionLst_Cd");
                    if (validate) {
                        $("#HdrSec1_CmbActionLst_Cd").data("kendoComboBox").value(cmbVal);
                    } else {
                        $("#HdrSec1_CmbActionLst_Cd").data("kendoComboBox").value("");
                    }
                }
            },
            filter: "startswith",
            suggest: true,
            placeholder: "Select an Action"
        });

    $("#HdrSec1_CmbTypeOfLead_Cd")
        .kendoComboBox({
            dataValueField: "CdKy",
            dataTextField: "CdNm",
            dataSource: CdmasName("HdrSec1_CmbTypeOfLead"),
            change: function(e) {
                var cmb = $("#HdrSec1_CmbTypeOfLead_Cd").data("kendoComboBox");
                var cmbVal = cmb.value();
                if (cmbVal != "") {
                    var validate = ComboValidations("HdrSec1_CmbTypeOfLead_Cd");
                    if (validate) {
                        $("#HdrSec1_CmbTypeOfLead_Cd").data("kendoComboBox").value(cmbVal);
                    } else {
                        $("#HdrSec1_CmbTypeOfLead_Cd").data("kendoComboBox").value("");
                    }
                }
            },
            filter: "startswith",
            suggest: true,
            placeholder: "Select a Type Of Lead"
        });
    $("#HdrSec1_CmbCustStatus_Cd")
        .kendoComboBox({
            dataValueField: "CdKy",
            dataTextField: "CdNm",
            dataSource: CdmasName("HdrSec1_CmbCustStatus"),
            change: function(e) {
                var cmb = $("#HdrSec1_CmbCustStatus_Cd").data("kendoComboBox");
                var cmbVal = cmb.value();
                if (cmbVal != "") {
                    var validate = ComboValidations("HdrSec1_CmbCustStatus_Cd");
                    if (validate) {
                        $("#HdrSec1_CmbCustStatus_Cd").data("kendoComboBox").value(cmbVal);
                    } else {
                        $("#HdrSec1_CmbCustStatus_Cd").data("kendoComboBox").value("");
                    }
                }
            },
            filter: "startswith",
            suggest: true,
            placeholder: "Select a Customer Status"
        });
    $("#HdrSec1_CmbFlwUpAction_Cd")
        .kendoComboBox({
            dataValueField: "CdKy",
            dataTextField: "CdNm",
            dataSource: CdmasName("HdrSec1_CmbFlwUpAction"),
            change: function(e) {
                var cmb = $("#HdrSec1_CmbFlwUpAction_Cd").data("kendoComboBox");
                var cmbVal = cmb.value();
                if (cmbVal != "") {
                    var validate = ComboValidations("HdrSec1_CmbFlwUpAction_Cd");
                    if (validate) {
                        $("#HdrSec1_CmbFlwUpAction_Cd").data("kendoComboBox").value(cmbVal);
                    } else {
                        $("#HdrSec1_CmbFlwUpAction_Cd").data("kendoComboBox").value(1);
                    }
                }
            },
            filter: "startswith",
            suggest: true,
            placeholder: "Select a Follow Up Action"
        });
    $("#HdrSec1_CmbSalesPerson_Cd").parent().css("width", "100%");
    $("#HdrSec1_CmbVehicalInt_Cd").parent().css("width", "100%");
   // $("#HdrSec1_CmbVehicalIntSers_Cd").parent().css("width", "100%");
    $("#HdrSec1_CmbActionLst_Cd").parent().css("width", "100%");
    $("#HdrSec1_CmbCustStatus_Cd").parent().css("width", "100%");
    $("#HdrSec1_CmbFlwUpAction_Cd").parent().css("width", "100%");
    $("#HdrSec1_CmbTypeOfLead_Cd").parent().css("width", "100%");

}

//DateSources
function CdmasName(ObjNm) {
    var ObjKy = GetObjKy(ObjNm);
    var PreKy = 1;
    var dataSource = new kendo.data.DataSource(
    {
        transport: {
            read: {
                url: urlGetCdMasName,
                data: {
                    'ObjKy': ObjKy,
                    'TrnTypKy': "1",
                    'PreKy': PreKy,
                },
                dataType: "json"
            }
        }

    });
    return dataSource;
}

function AdrID(ObjNm) {
    var ObjKy = GetObjKy(ObjNm);
    var dataSource = new kendo.data.DataSource(
    {
        transport: {
            read: {
                url: urlGetAdrId,
                data: {
                    'ObjKy': ObjKy,
                    'TrnTypKy': "1",
                    'PreKy': "1",
                },
                dataType: "json"
            }
        }

    });
    return dataSource;
}

function ItmNmDatasource(ObjNm) {
    var ObjKy = '1'//GetObjKy(ObjNm);
    var cmb = $("#HdrSec1_CmbVehicalInt_Cd").data("kendoComboBox").value();
    if (!cmb) {
        cmb = 1;
    }
    var PreKy = cmb;
    if (PreKy == "" || PreKy == null || PreKy == undefined) PreKy = 1;
    var dataSource = new kendo.data.DataSource(
      {
          transport: {
              read: {
                  url: urlItmLoad,
                  data: {
                      ObjKy: ObjKy,
                      TrnTypKy: '1',
                      PreKy: PreKy
                  },
                  dataType: "json"
              }
          }
      });
    return dataSource;
}
function ComboValidations(cmbNm) {

    var cmb = $("#" + cmbNm + "").data("kendoComboBox");
    var val = cmb.value();

    if (isNaN(val)) {
        alert("'" + val + "' is not a Valid input");
        $("#" + cmbNm + "").data("kendoComboBox").value("");
        return false;
    } else {
        return true;
    }
}

$(document)
    .ready(function() {
        Button_From_Dynamic("ButtonSec1");
    });

function LoadGloabData() {
    $.ajax({
        url: urlCodes.GetCdKyByConCdAndOurCd,
        dataType: "json",
        type: "POST",
        data: JSON.stringify({
            ObjKy: viewBag.ObjKy,
            ConCd: "LogTyp",
            OurCd: viewBag.OurCd
        }),
        contentType: "application/json; charset=utf-8",
        success: function(TrnTypKy) {
            FormGlblData.TrnTypKy = TrnTypKy;
            GetFormObjData();
        }
    });
}

function GetFormObjData() {
    $.ajax({
        url: urlUsrObjPrp_SelectAllLastChildWeb,
        dataType: "json",
        type: "POST",
        data: JSON.stringify({
            PrntKy: viewBag.ObjKy
        }),
        contentType: "application/json; charset=utf-8",
        success: function(HdrSectionFromDb) {
            FormGlblData.FormObjData = HdrSectionFromDb;
            FormGlblData.AllDefalutValueObj = Get_AllDefalutValue_Obj();
            FormGlblData.AllValidationObj = Get_All_Validation_Obj();
            FormGlblData.AllValidationObj = sortByKey(FormGlblData.AllValidationObj, "ValidationOrder");
            LoadComboAndDateTime();
            Clear();
            setHdrSectionPropFun();
            CLOSELoadingForm();
        }
    });
}

function setHdrSectionPropFun() {

    // ---------- Set ObjProperties
    setHdrSectionProp("", viewBag.ObjKy, "", "HdrSec1");
    SetHandlingEnterKeyEvent("", viewBag.ObjKy);
    SetFirstFocusObj();

    // $("#HdrSec1_InptDocNo_Val").focus();
}

function Save() {
    //insave button

    var validationMsg = Save_FinalValidation();
    if (validationMsg.length > 1) {
        alert(validationMsg);
        return;
    }

    var LogDate = kendo.toString($("#HdrSec1_DatEnqDate_Val").data("kendoDatePicker").value(), "yyyy/MM/dd");
    //document.getElementById("HdrSec1_DatEnqDate_Val").value; //$("#HdrSec1_DatEnqDate_Val").data("kendoDatePicker").value();
    var LogTime = document
        .getElementById("HdrSec1_DatEnqTim_Val")
        .value; // $("#HdrSec1_DatEnqTim_Val").data("kendoTimePicker").value();
    var Fname = document.getElementById("HdrSec1_InptName_Val").value;
    var Lname = document.getElementById("HdrSec1_InptSName_Val").value;
    var Initials = document.getElementById("HdrSec1_InptIName_Val").value;
    var PerEmail = document.getElementById("HdrSec1_InptEmail_Val").value;
    var BusEmail = document.getElementById("HdrSec1_InptOEmail_Val").value;
    var AdrKy = document.getElementById("AdrKy").value;

    var PerTP = document.getElementById("HdrSec1_InptTpNu_Val").value;
    PerTP = PerTP.replace(/[^0-9]/g, "");
    var BusTP = document.getElementById("HdrSec1_InptOTpNu_Val").value;
    BusTP = BusTP.replace(/[^0-9]/g, "");
    var LeadTypKy = $("#HdrSec1_CmbTypeOfLead_Cd").data("kendoComboBox").value();
    if (!LeadTypKy || LeadTypKy == "") {
        LeadTypKy = 1;
    }

    var CrnttVhl = document.getElementById("HdrSec1_InptCrntVhicle_Val").value;
    var CrnttVhlClr = document.getElementById("HdrSec1_InptCrntVhicleClr_Val").value;
    var CrnttVhlReg = document.getElementById("HdrSec1_InptVhicleReg_Val").value;
    var cusStatus = 0;
    if ($("#Yes").is(":checked")) {
        cusStatus = 1;
    }

    var SalesPersonKy = $("#HdrSec1_CmbSalesPerson_Cd").data("kendoComboBox").value();
    if (!SalesPersonKy || SalesPersonKy == "") {
        SalesPersonKy = 1;
    }
    var Reson = document.getElementById("HdrSec1_TxtArea_Reson_Val").value;
    var VhlIntMdlKy = $("#HdrSec1_CmbVehicalInt_Cd").data("kendoComboBox").value();
    if (!VhlIntMdlKy || VhlIntMdlKy == "") {
        VhlIntMdlKy = 1;
    }
    var VhlIntSeriesKy = 1;// VhlIntSeriesKy = $("#HdrSec1_CmbVehicalIntSers_Cd").data("kendoComboBox").value();
    //if (!VhlIntSeriesKy || VhlIntSeriesKy == "") {
    //    VhlIntSeriesKy = 1;
    //}
    var ActionKy = $("#HdrSec1_CmbActionLst_Cd").data("kendoComboBox").value();
    if (!ActionKy || ActionKy == "") {
        ActionKy = 1;
    }
    var CustStatusKy = $("#HdrSec1_CmbCustStatus_Cd").data("kendoComboBox").value();
    if (!CustStatusKy || CustStatusKy == "") {
        CustStatusKy = 1;
    }
    var Comment = document.getElementById("HdrSec1_TxtArea_NextStp_Val").value;
   
    var NxtShdDate = kendo.toString($("#HdrSec1_DatNextShdDate_Val").data("kendoDatePicker").value(), "yyyy/MM/dd");//$("#HdrSec1_DatNextShdDate_Val").data("kendoDatePicker").value();

    var FlwUPActionKy = $("#HdrSec1_CmbFlwUpAction_Cd").data("kendoComboBox").value();
    if (!FlwUPActionKy || FlwUPActionKy == "") {
        FlwUPActionKy = 1;
    }
    var LogDetKy = document.getElementById("LogDetKy").value;

    if (!LogDetKy) {
        $.ajax({
            url: urlPostSave,
            data: JSON.stringify({
                LogDate: LogDate,
                LogTime: LogTime,
                Fname: Fname,
                Lname: Lname,
                Initials: Initials,
                PerEmail: PerEmail,
                BusEmail: BusEmail,
                PerTP: PerTP,
                BusTP: BusTP,
                LeadTypKy: LeadTypKy,
                CrnttVhl: CrnttVhl,
                CrnttVhlClr: CrnttVhlClr,
                CrnttVhlReg: CrnttVhlReg,
                cusStatus: cusStatus,
                SalesPersonKy: SalesPersonKy,
                Reson: Reson,
                VhlIntMdlKy: VhlIntMdlKy,
                VhlIntSeriesKy: VhlIntSeriesKy,
                ActionKy: ActionKy,
                CustStatusKy: CustStatusKy,
                Comment: Comment,
                NxtShdDate: NxtShdDate,
                FlwUPActionKy: FlwUPActionKy,
                logtypKy: FormGlblData.TrnTypKy,
                AdrKy: AdrKy,
                objKy: viewBag.ObjKy

            }),
            contentType: "application/json; charset=utf-8",
            dataType: "Json",
            type: "POST",
            success: function(data) {
                if (data[0].Result) {
                    iziToast.success({
                        title: 'Saved',
                        message: 'Save Successfully!',
                       // position: 'center',
                    });
                  //  alert("Save Successfully");
                    Clear();
                    // alert(data[0].LogDetKy)
                } else {
                    iziToast.error({
                        title: 'Error',
                        message: 'Please TryAgain',
                      //  position: 'center',
                    });
                   // alert("Please TryAgain");
                }
            },
            error: function (e) {
                iziToast.error({
                    title: 'Network Error',
                    message: 'Network Related Error Please Try Again',
                    position: 'center',
                });
               // return false;
            }
        });
    } else {
        var result = confirm("Do you want to Update the record?");
        if (result == true) {
            $.ajax({
                url: urlPostUpdate,
                data: JSON.stringify({
                    LogDate: LogDate,
                    LogTime: LogTime,
                    Fname: Fname,
                    Lname: Lname,
                    Initials: Initials,
                    PerEmail: PerEmail,
                    BusEmail: BusEmail,
                    PerTP: PerTP,
                    BusTP: BusTP,
                    LeadTypKy: LeadTypKy,
                    CrnttVhl: CrnttVhl,
                    CrnttVhlClr: CrnttVhlClr,
                    CrnttVhlReg: CrnttVhlReg,
                    cusStatus: cusStatus,
                    SalesPersonKy: SalesPersonKy,
                    Reson: Reson,
                    VhlIntMdlKy: VhlIntMdlKy,
                    VhlIntSeriesKy: VhlIntSeriesKy,
                    ActionKy: ActionKy,
                    CustStatusKy: CustStatusKy,
                    Comment: Comment,
                    NxtShdDate: NxtShdDate,
                    FlwUPActionKy: FlwUPActionKy,
                    logtypKy: FormGlblData.TrnTypKy,
                    AdrKy: AdrKy,
                    objKy: viewBag.ObjKy,
                    LogDetKy: LogDetKy
                }),
                contentType: "application/json; charset=utf-8",
                dataType: "Json",
                type: "POST",
                success: function(data) {
                    if (data[0].Result) {
                        iziToast.success({
                            title: 'Saved',
                            message: 'Save Successfully!',
                            // position: 'center',
                        });
                        //alert("Save Successfully");
                        alert(data[0].LogDetKy);
                    } else {
                        iziToast.error({
                            title: 'Error',
                            message: 'Error Please Try Again',
                            //position: 'center',
                        });
                       // alert("Please TryAgain");
                    }
                },
                error: function (e) {
                    iziToast.error({
                        title: 'Network Error',
                        message: 'Network Related Error Please Try Again',
                      //  position: 'center',
                    });
                   // return false;
                }
            });
        }

    }

}

function Clear() {

    $.ajax({
        url: urlGetDateTime,
        contentType: "application/json; charset=utf-8",
        dataType: "Json",
        type: "POST",
        success: function(data) {
            $("#HdrSec1_DatEnqDate_Val").data("kendoDatePicker").value(data[1]);
            $("#HdrSec1_DatEnqTim_Val").data("kendoTimePicker").value(data[0]);
            $("#HdrSec1_DatNextShdDate_Val").data("kendoDatePicker").value(data[1]);

        },
        error: function(e) {
            return false;
        }
    });
    document.getElementById("HdrSec1_InptName_Val").value = "";
    document.getElementById("HdrSec1_InptSName_Val").value = "";
    document.getElementById("HdrSec1_InptIName_Val").value = "";
    document.getElementById("HdrSec1_InptEmail_Val").value = "";
    document.getElementById("HdrSec1_InptOEmail_Val").value = "";
    document.getElementById("HdrSec1_InptTpNu_Val").value = "";
    document.getElementById("HdrSec1_InptOTpNu_Val").value = "";
    $("#HdrSec1_CmbTypeOfLead_Cd").data("kendoComboBox").value("");
    document.getElementById("HdrSec1_InptCrntVhicle_Val").value = "";
    document.getElementById("HdrSec1_InptCrntVhicleClr_Val").value = "";
    document.getElementById("HdrSec1_InptVhicleReg_Val").value = "";
    $("#HdrSec1_CmbSalesPerson_Cd").data("kendoComboBox").value("");
    document.getElementById("HdrSec1_TxtArea_Reson_Val").value = "";
    $("#HdrSec1_CmbVehicalInt_Cd").data("kendoComboBox").value("");
   // $("#HdrSec1_CmbVehicalIntSers_Cd").data("kendoComboBox").value("");
    $("#HdrSec1_CmbActionLst_Cd").data("kendoComboBox").value("");
    $("#HdrSec1_CmbCustStatus_Cd").data("kendoComboBox").value("");
    document.getElementById("HdrSec1_TxtArea_NextStp_Val").value = "";
    $("#HdrSec1_DatNextShdDate_Val").data("kendoDatePicker").value("");
    $("#HdrSec1_CmbFlwUpAction_Cd").data("kendoComboBox").value("");
    $("#No").prop("checked", true);
    document.getElementById("AdrKy").value = "";
    document.getElementById("LogDetKy").value = "";

}

function FindIsCustomer(Fname, Lname, Initials, PerTP, BusTP) {
    $.ajax({
        url: urlFindIsCustomer,
        data: JSON.stringify({
            PrsnlMobNu: PerTP,
            OfcMobNu: BusTP,
            FName: Fname,
            LName: Lname,
            Initials: Initials,
            ObjKy: viewBag.ObjKy,
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "Json",
        type: "POST",
        success: function(data) {
            if (data.length >= 1) {
                document.getElementById("HdrSec1_InptName_Val").value = data[0].Fname;
                document.getElementById("HdrSec1_InptSName_Val").value = data[0].Lname;
                document.getElementById("HdrSec1_InptIName_Val").value = data[0].Initials;
                document.getElementById("HdrSec1_InptTpNu_Val").value = data[0].PerTP;
                document.getElementById("HdrSec1_InptOTpNu_Val").value = data[0].BusTP;
                document.getElementById("HdrSec1_InptCrntVhicle_Val").value = data[0].CrnttVhl;
                document.getElementById("HdrSec1_InptCrntVhicleClr_Val").value = data[0].CrnttVhlClr;
                document.getElementById("HdrSec1_InptVhicleReg_Val").value = data[0].CrnttVhlReg;
                document.getElementById("HdrSec1_InptEmail_Val").value = data[0].PerEmail;
                document.getElementById("HdrSec1_InptOEmail_Val").value = data[0].BusEmail;
                document.getElementById("AdrKy").value = data[0].AdrKy;
                $("#Yes").prop("checked", true);
            }
        },
        error: function (e) {
            iziToast.error({
                title: 'Network Error',
                message: 'Network Related Error Please Try Again',
                //  position: 'center',
            });
            return false;
        }
    });

}

$(window)
    .load(function() {

        $(document)
            .on("focusout",
                "#HdrSec1_InptTpNu_Val",
                function() {
                    var temp = this.value;
                    temp = temp.replace(/[^0-9]/g, "");
                    var Fname;
                    var Lname;
                    var Initials;
                    var PerTP = document.getElementById("HdrSec1_InptTpNu_Val").value;
                    PerTP = PerTP.replace(/[^0-9]/g, "");
                    var BusTP;
                    if (temp.length >= 9) {
                        FindIsCustomer(Fname, Lname, Initials, PerTP, BusTP);
                    }
                });
        $(document)
            .on("focusout",
                "#HdrSec1_InptOTpNu_Val",
                function() {
                    var Fname;
                    var Lname;
                    var Initials;
                    var PerTP;
                    var BusTP = document.getElementById("HdrSec1_InptOTpNu_Val").value;
                    BusTP = BusTP.replace(/[^0-9]/g, "");
                    var temp = this.value;
                    temp = temp.replace(/[^0-9]/g, "");
                    if (temp.length >= 9) {
                        FindIsCustomer(Fname, Lname, Initials, PerTP, BusTP);
                    }
                });

        $("#HdrSec1_InptName")
            .focusout(function() {
                var fname = document.getElementById("HdrSec1_InptName_Val").value;
                var lname = document.getElementById("HdrSec1_InptSName_Val").value;
                var initials = document.getElementById("HdrSec1_InptIName_Val").value;
                var PerTP;
                var BusTP;

                if (fname.length >= 1 && lname.length >= 1 && initials.length >= 1) {
                    FindIsCustomer(fname, lname, initials, PerTP, BusTP);
                }
            });

    });

function FwlUpSave() {
    var validationMsg = Save_FinalValidation();
    if (validationMsg.length > 1) {
        alert(validationMsg);
        return;
    }

    var LogDate = kendo.toString($("#HdrSec1_DatEnqDate_Val").data("kendoDatePicker").value(), "yyyy/MM/dd");
       // document.getElementById("HdrSec1_DatEnqDate_Val").value; //$("#HdrSec1_DatEnqDate_Val").data("kendoDatePicker").value();
    var LogTime = document
        .getElementById("HdrSec1_DatEnqTim_Val")
        .value; // $("#HdrSec1_DatEnqTim_Val").data("kendoTimePicker").value();
    var Fname = document.getElementById("HdrSec1_InptName_Val").value;
    var Lname = document.getElementById("HdrSec1_InptSName_Val").value;
    var Initials = document.getElementById("HdrSec1_InptIName_Val").value;
    var PerEmail = document.getElementById("HdrSec1_InptEmail_Val").value;
    var BusEmail = document.getElementById("HdrSec1_InptOEmail_Val").value;
    var AdrKy = document.getElementById("AdrKy").value;

    var PerTP = document.getElementById("HdrSec1_InptTpNu_Val").value;
    PerTP = PerTP.replace(/[^0-9]/g, "");
    var BusTP = document.getElementById("HdrSec1_InptOTpNu_Val").value;
    BusTP = BusTP.replace(/[^0-9]/g, "");
    var LeadTypKy = $("#HdrSec1_CmbTypeOfLead_Cd").data("kendoComboBox").value();
    if (!LeadTypKy || LeadTypKy == "") {
        LeadTypKy = 1;
    }

    var CrnttVhl = document.getElementById("HdrSec1_InptCrntVhicle_Val").value;
    var CrnttVhlClr = document.getElementById("HdrSec1_InptCrntVhicleClr_Val").value;
    var CrnttVhlReg = document.getElementById("HdrSec1_InptVhicleReg_Val").value;
    var cusStatus = 0;
    if ($("#Yes").is(":checked")) {
        cusStatus = 1;
    }

    var SalesPersonKy = $("#HdrSec1_CmbSalesPerson_Cd").data("kendoComboBox").value();
    if (!SalesPersonKy || SalesPersonKy == "") {
        SalesPersonKy = 1;
    }
    var Reson = document.getElementById("HdrSec1_TxtArea_Reson_Val").value;
    var VhlIntMdlKy = $("#HdrSec1_CmbVehicalInt_Cd").data("kendoComboBox").value();
    if (!VhlIntMdlKy || VhlIntMdlKy == "") {
        VhlIntMdlKy = 1;
    }
    var VhlIntSeriesKy =1// $("#HdrSec1_CmbVehicalIntSers_Cd").data("kendoComboBox").value();
    //if (!VhlIntSeriesKy || VhlIntSeriesKy == "") {
    //    VhlIntSeriesKy = 1;
    //}
    var ActionKy = $("#HdrSec1_CmbActionLst_Cd").data("kendoComboBox").value();
    if (!ActionKy || ActionKy == "") {
        ActionKy = 1;
    }
    var CustStatusKy = $("#HdrSec1_CmbCustStatus_Cd").data("kendoComboBox").value();
    if (!CustStatusKy || CustStatusKy == "") {
        CustStatusKy = 1;
    }
    var Comment = document.getElementById("HdrSec1_TxtArea_NextStp_Val").value;
    var NxtShdDate = kendo.toString($("#HdrSec1_DatNextShdDate_Val").data("kendoDatePicker").value(), "yyyy/MM/dd");//document.getElementById("HdrSec1_DatNextShdDate_Val").value;// $("#HdrSec1_DatNextShdDate_Val").data("kendoDatePicker").value();

    var FlwUPActionKy = $("#HdrSec1_CmbFlwUpAction_Cd").data("kendoComboBox").value();
    if (!FlwUPActionKy || FlwUPActionKy == "") {
        FlwUPActionKy = 1;
    }
    var LogDetKy = document.getElementById("LogDetKy").value;

    $.ajax({
        url: urlPostSave,
        data: JSON.stringify({
            LogDate: LogDate,
            LogTime: LogTime,
            Fname: Fname,
            Lname: Lname,
            Initials: Initials,
            PerEmail: PerEmail,
            BusEmail: BusEmail,
            PerTP: PerTP,
            BusTP: BusTP,
            LeadTypKy: LeadTypKy,
            CrnttVhl: CrnttVhl,
            CrnttVhlClr: CrnttVhlClr,
            CrnttVhlReg: CrnttVhlReg,
            cusStatus: cusStatus,
            SalesPersonKy: SalesPersonKy,
            Reson: Reson,
            VhlIntMdlKy: VhlIntMdlKy,
            VhlIntSeriesKy: VhlIntSeriesKy,
            ActionKy: ActionKy,
            CustStatusKy: CustStatusKy,
            Comment: Comment,
            NxtShdDate: NxtShdDate,
            FlwUPActionKy: FlwUPActionKy,
            logtypKy: FormGlblData.TrnTypKy,
            AdrKy: AdrKy,
            objKy: viewBag.ObjKy,
            PrntKy:LogDetKy
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "Json",
        type: "POST",
        success: function (data) {
            if (data[0].Result) {
                iziToast.success({
                    title: 'Saved',
                    message: 'Save Successfully!',
                    // position: 'center',
                });

               // alert("Save Successfully");
                Clear();
            } else {

                iziToast.error({
                    title: 'Error',
                    message: 'Error Please Try Again',
                    //position: 'center',
                });
                //alert("Please TryAgain");
            }
        },
        error: function (e) {
            iziToast.error({
                title: 'Network Error',
                message: 'Network Related Error Please Try Again',
                //  position: 'center',
            });
            return false;
        }
    });

}

//function LoadVehicalSeries() {
    

//    $("#HdrSec1_CmbVehicalIntSers_Cd")
//         .kendoComboBox({
//             dataValueField: "ItmKy",
//             dataTextField: "ItmNm",
//             dataSource: ItmNmDatasource('HdrSec1_CmbVehicalIntSers'),//CdmasName("HdrSec1_CmbVehicalIntSers"),
//             change: function (e) {
//                 var cmb = $("#HdrSec1_CmbVehicalIntSers_Cd").data("kendoComboBox");
//                 var cmbVal = cmb.value();
//                 if (cmbVal != "") {
//                     var validate = ComboValidations("HdrSec1_CmbVehicalIntSers_Cd");
//                     if (validate) {
//                         $("#HdrSec1_CmbVehicalIntSers_Cd").data("kendoComboBox").value(cmbVal);

//                     } else {
//                         $("#HdrSec1_CmbVehicalIntSers_Cd").data("kendoComboBox").value("");
//                     }
//                 }
//             },
//             filter: "startswith",
//             suggest: true,
//             placeholder: "Select a Series"
//         });
//}