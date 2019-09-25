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
    LoadDateAndTime();
    LoadCombo();
}

function LoadDateAndTime() {
    $("#HdrSec1_DatDrivngDate_Val")
    .kendoDatePicker({
        format: "dd/MM/yyyy",
        parseFormats: "yyyy/MM/dd",
        value: viewBag.DateNow, //new Date(),
        min: new Date(31, 2, 2009),
        change: function () {

        }
    });
    $("#HdrSec1_DatDrvngTim_Val")
    .kendoTimePicker({
        format: "HH:mm",
        animation: false,
        value: viewBag.TimeNow //new Date()
    });
    $("#HdrSec1_DatNextShdDate_Val")
    .kendoDatePicker({
        format: "dd/MM/yyyy",
        parseFormats: ["yyyy/MM/dd"],
        value: new Date(),
        min: new Date(31, 2, 2009),
        change: function () {
            var value = this.value();

        }
    });

    $("#HdrSec1_InptTpNu_Val")
    .kendoNumericTextBox({
        spinners: false,
        min: 0,
        format: "#",
        decimals: 0,
        change: function () {
        }
    });
    $("#HdrSec1_InptOTpNu_Val")
        .kendoNumericTextBox({
            spinners: false,
            min: 0,
            format: "#",
            decimals: 0,
            change: function () {
            }
        });
}
$(document)
    .ready(function () {
        Button_From_Dynamic("ButtonSec1");
    });
function LoadCombo() {
    $("#HdrSec1_CmbVehicalInt_Cd")
      .kendoComboBox({
          dataValueField: "CdKy",
          dataTextField: "CdNm",
          dataSource: CdmasName("HdrSec1_CmbVehicalInt"),
          change: function (e) {
              var cmb = $("#HdrSec1_CmbVehicalInt_Cd").data("kendoComboBox");
              var cmbVal = cmb.value();
              if (cmbVal != "") {
                  var validate = ComboValidations("HdrSec1_CmbVehicalInt_Cd");
                  if (validate) {
                      $("#HdrSec1_CmbVehicalInt_Cd").data("kendoComboBox").value(cmbVal);
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
    //        dataValueField: "CdKy",
    //        dataTextField: "CdNm",
    //        dataSource: CdmasName("HdrSec1_CmbVehicalIntSers"),
    //        change: function (e) {
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

    $("#HdrSec1_CmbSalesPerson_Cd")
       .kendoComboBox({
           dataValueField: "AdrKy",
           dataTextField: "AdrID",
           dataSource: AdrID("HdrSec1_CmbSalesPerson"),
           change: function (e) {
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
    $("#HdrSec1_CmbFlwUpAction_Cd")
    .kendoComboBox({
        dataValueField: "CdKy",
        dataTextField: "CdNm",
        dataSource: CdmasName("HdrSec1_CmbFlwUpAction"),
        change: function (e) {
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


    $("#HdrSec1_CmbVehicalInt_Cd").parent().css("width", "100%");
    //$("#HdrSec1_CmbVehicalIntSers_Cd").parent().css("width", "100%");
    $("#HdrSec1_CmbSalesPerson_Cd").parent().css("width", "100%");
    $("#HdrSec1_CmbFlwUpAction_Cd").parent().css("width", "100%");
}

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
        success: function (TrnTypKy) {
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
        success: function (HdrSectionFromDb) {
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

//________________________________________DataSource
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

function Clear() {
    

    document.getElementById("HdrSec1_InptName_Val").value = "";
    document.getElementById("HdrSec1_InptSName_Val").value = "";
    document.getElementById("HdrSec1_InptIName_Val").value = "";
    $("#HdrSec1_CmbVehicalInt_Cd").data("kendoComboBox").value("");
    $("#HdrSec1_CmbSalesPerson_Cd").data("kendoComboBox").value("");
    $("#HdrSec1_CmbFlwUpAction_Cd").data("kendoComboBox").value("");
    document.getElementById("DmLogNo").checked = true;
    document.getElementById("FeedBackNo").checked = true;
    document.getElementById("GatePassNo").checked = true;
    document.getElementById("HdrSec1_TxtArea_NextStp_Val").value = "";
    document.getElementById("AdrKy").value = "";
    document.getElementById("LogDetKy").value = "";
    $("#HdrSec1_InptTpNu_Val").data("kendoNumericTextBox").value("");
    $("#HdrSec1_InptOTpNu_Val").data("kendoNumericTextBox").value("");
    document.getElementById("HdrSec1_InptEmail_Val").value = "";
    document.getElementById("HdrSec1_InptOEmail_Val").value = "";
    $.ajax({
        url: urlGetDateTime,
        contentType: "application/json; charset=utf-8",
        dataType: "Json",
        type: "POST",
        success: function (data) {
            $("#HdrSec1_DatDrivngDate_Val").data("kendoDatePicker").value(data[1]);
            $("#HdrSec1_DatDrvngTim_Val").data("kendoTimePicker").value(data[0]);
            $("#HdrSec1_DatNextShdDate_Val").data("kendoDatePicker").value(data[1]);

        },
        error: function (e) {
            iziToast.error({
                title: 'Network Error',
                message: 'Network Related Error Please Try Again',
                position: 'center',
            });
        }
    });
}

function Save() {

    var validationMsg = Save_FinalValidation();
    if (validationMsg.length > 1) {
        alert(validationMsg);
        return;
    }
    var adrKy = document.getElementById("AdrKy").value;
    var LogDetKy = document.getElementById("LogDetKy").value;

    var drivingDate = ReturnDate($("#HdrSec1_DatDrivngDate_Val").data("kendoDatePicker").value())//$("#HdrSec1_DatDrivngDate_Val").data("kendoDatePicker").value();
    var drvngTime = ReturnTime($("#HdrSec1_DatDrvngTim_Val").data("kendoTimePicker").value())//$("#HdrSec1_DatDrvngTim_Val").data("kendoTimePicker").value();
    var intVehical = $("#HdrSec1_CmbVehicalInt_Cd").data("kendoComboBox").value();
    var slsPrsnKy = $("#HdrSec1_CmbSalesPerson_Cd").data("kendoComboBox").value();
    var comments = document.getElementById("HdrSec1_TxtArea_NextStp_Val").value;
    var nxtShdueDate = ReturnDate($("#HdrSec1_DatNextShdDate_Val").data("kendoDatePicker").value());// $("#HdrSec1_DatNextShdDate_Val").data("kendoDatePicker").value();
   var flwUpAction = $("#HdrSec1_CmbFlwUpAction_Cd").data("kendoComboBox").value();
   var demoLogYes = ($('#DmLogYes').is(':checked')) ? "1" : "0";//$('#DmLogYes').is(':checked');
   var feedbackYes = ($('#FeedBackYes').is(':checked')) ? "1" : "0";//$('#FeedBackYes').is(':checked');
   var gatePassYes = ($('#GatePassYes').is(':checked')) ? "1" : "0"; //$('#GatePassYes').is(':checked');
   var Fname = document.getElementById("HdrSec1_InptName_Val").value;
   var Lname = document.getElementById("HdrSec1_InptSName_Val").value;
   var Initials = document.getElementById("HdrSec1_InptIName_Val").value;
   var PerEmail = document.getElementById("HdrSec1_InptEmail_Val").value;
   var BusEmail = document.getElementById("HdrSec1_InptOEmail_Val").value;
   var persnalTp= $("#HdrSec1_InptTpNu_Val").data("kendoNumericTextBox").value();
   var OfceTp = $("#HdrSec1_InptOTpNu_Val").data("kendoNumericTextBox").value();
   if (LogDetKy >= 0) {
       var result = confirm("Do you want to Update the record?");
       if (result == true) {
           $.ajax({
               url: urlUpdateAction ,
               dataType: "json",
               type: "POST",
               data: JSON.stringify({
                   LogKy: LogDetKy,
                   ObjKy: viewBag.ObjKy,
                   ConCd: "LogTyp",
                   OurCd: viewBag.OurCd,
                   adrKy: adrKy,
                   drivingDate: drivingDate,
                   drvngTime: drvngTime,
                   intVehical: intVehical,
                   slsPrsnKy: slsPrsnKy,
                   comments: comments,
                   nxtShdueDate: nxtShdueDate,
                   flwUpAction: flwUpAction,
                   demoLogYes: demoLogYes,
                   feedbackYes: feedbackYes,
                   gatePassYes: gatePassYes,
                   logtypKy: FormGlblData.TrnTypKy,
                   Fname: Fname,
                   Lname: Lname,
                   Initials: Initials,
                   PerEmail: PerEmail,
                   BusEmail: BusEmail,
                   persnalTp: persnalTp,
                   OfceTp: OfceTp
               }),
               contentType: "application/json; charset=utf-8",
               success: function (data) {
                   if (data[0].Result) {
                       iziToast.success({
                           title: 'Updated',
                           message: 'Update Successfully!',
                           // position: 'center',
                       });
                     //  alert("Update Successfully");
                       Clear();
                       // alert(data[0].LogDetKy)
                   } else {
                       iziToast.error({
                           title: 'Error',
                           message: 'Please TryAgain',
                           position: 'center',
                       });
                       //alert("Please TryAgain");
                   }
               },
               error: function (e) {
               iziToast.error({
                   title: 'Network Error',
                   message: 'Network Related Error Please Try Again',
                   position: 'center',
               });
           }

           });
       }
   } else {
       
       $.ajax({
           url: urlSaveAction,
           dataType: "json",
           type: "POST",
           data: JSON.stringify({
               ObjKy: viewBag.ObjKy,
               ConCd: "LogTyp",
               OurCd: viewBag.OurCd,
               adrKy: adrKy,
               drivingDate: drivingDate,
               drvngTime: drvngTime,
               intVehical: intVehical,
               slsPrsnKy: slsPrsnKy,
               comments: comments,
               nxtShdueDate: nxtShdueDate,
               flwUpAction: flwUpAction,
               demoLogYes: demoLogYes,
               feedbackYes: feedbackYes,
               gatePassYes: gatePassYes,
               logtypKy: FormGlblData.TrnTypKy,
               Fname: Fname,
               Lname: Lname,
               Initials: Initials,
               PerEmail: PerEmail,
               BusEmail: BusEmail,
               persnalTp: persnalTp,
               OfceTp: OfceTp
           }),
           contentType: "application/json; charset=utf-8",
           success: function (data) {
               if (data[0].Result) {
                   iziToast.success({
                       title: 'Saved',
                       message: 'Save Successfully!',
                       // position: 'center',
                   });
                //   alert("Save Successfully");
                   Clear();
                   // alert(data[0].LogDetKy)
               } else {
                   iziToast.error({
                       title: 'Error',
                       message: 'Please TryAgain',
                      
                   });
                   //alert("Please TryAgain");
               }
           },
           error: function (e) {
               iziToast.error({
                   title: 'Network Error',
                   message: 'Network Related Error Please Try Again',
                   position: 'center',
               });
           }
       });
   }
  
}

function ReturnDate(Date) {
    var Year = Date.getFullYear();
    var Month = ("0" + (Date.getMonth() + 1)).slice(-2); //Date.getMonth();
    var date = ("0" + Date.getDate()).slice(-2);//Date.getDate();
    return Year + '-' + Month + '-' + date;

}

function ReturnTime(Time) {
    var Hours=("0" + Time.getHours()).slice(-2);
    var Minutes = ("0" + Time.getMinutes()).slice(-2);
    return Hours+':'+Minutes
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

$(window)
    .load(function () {

        $(document)
            .on("focusout",
                "#HdrSec1_InptTpNu_Val",
                function () {
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
                function () {
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
            .focusout(function () {
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
        success: function (data) {
            if (data.length >= 1) {
                document.getElementById("HdrSec1_InptName_Val").value = data[0].Fname;
                document.getElementById("HdrSec1_InptSName_Val").value = data[0].Lname;
                document.getElementById("HdrSec1_InptIName_Val").value = data[0].Initials;
                $("#HdrSec1_InptTpNu_Val").data("kendoNumericTextBox").value(data[0].PerTP);
                $("#HdrSec1_InptOTpNu_Val").data("kendoNumericTextBox").value(data[0].BusTP);
                document.getElementById("HdrSec1_InptEmail_Val").value = data[0].PerEmail;
                document.getElementById("HdrSec1_InptOEmail_Val").value = data[0].BusEmail;
                document.getElementById("AdrKy").value = data[0].AdrKy;
            } 
        },
        error: function (e) {
            iziToast.error({
                title: 'Network Error',
                message: 'Network Related Error Please Try Again',
                position: 'center',
            });
            return false;
        }
    });

}

