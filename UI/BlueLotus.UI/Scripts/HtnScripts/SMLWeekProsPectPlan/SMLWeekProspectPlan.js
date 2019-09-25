var FormGlblData = {
    FormObjData: null,
    TrnTypKy: 1,
    AccessLvlKy: 1,
    ConfiLvlKy: 1,
    TrnKy: 1,
    AllDefalutValueObj: null,
    GotItemRate: 0
};
LoadGloabData();
$(document)
    .ready(function () {
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
}

function LoadComboAndDateTime() {
    LoadDateAndnumeric();
    LoadKendoCombo();
}

function LoadDateAndnumeric() {
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
    $("#HdrSec1_DatPlanDate_Val")
.kendoDatePicker({
    format: "dd/MM/yyyy",
    parseFormats: ["yyyy/MM/dd"],
    value: new Date(),
    min: new Date(31, 2, 2009),
    change: function () {
        var value = this.value();

    }
});
}

function LoadKendoCombo() {
    $("#HdrSec1_CmbActionLst_Cd")
    .kendoComboBox({
        dataValueField: "CdKy",
        dataTextField: "CdNm",
        dataSource: CdmasName("HdrSec1_CmbActionLst"),
        change: function (e) {
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

    $("#HdrSec1_CmbActionLst_Cd").parent().css("width", "100%");
    $("#HdrSec1_CmbFlwUpAction_Cd").parent().css("width", "100%");

}

//data Source
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

function Clear() {
    document.getElementById("HdrSec1_InptName_Val").value = "";
    document.getElementById("HdrSec1_InptSName_Val").value = "";
    document.getElementById("HdrSec1_InptIName_Val").value = "";
    $("#HdrSec1_InptTpNu_Val").data("kendoNumericTextBox").value("");
    $("#HdrSec1_InptOTpNu_Val").data("kendoNumericTextBox").value("");
    document.getElementById("HdrSec1_InptEmail_Val").value = "";
    document.getElementById("HdrSec1_InptOEmail_Val").value = "";
    document.getElementById("HdrSec1_InptAdress_Val").value = "";
    document.getElementById("No").checked = true;
    document.getElementById("HdrSec1_InptCrntVhicle_Val").value = "";
    $("#HdrSec1_CmbActionLst_Cd").data("kendoComboBox").value("");
    document.getElementById("HdrSec1_Callsumry_Val").value = "";
    $("#HdrSec1_CmbFlwUpAction_Cd").data("kendoComboBox").value("");
    document.getElementById("HdrSec1_Descption_Val").value = "";

    $.ajax({
        url: urlGetDateTime,
        contentType: "application/json; charset=utf-8",
        dataType: "Json",
        type: "POST",
        success: function (data) {
            $("#HdrSec1_DatPlanDate_Val").data("kendoDatePicker").value(data[1]);
            $("#HdrSec1_DatNextShdDate_Val").data("kendoDatePicker").value(data[1]);

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

function Save() {
    var validationMsg = Save_FinalValidation();
    if (validationMsg.length > 1) {
        alert(validationMsg);
        return;
    }
    var Fname=  document.getElementById("HdrSec1_InptName_Val").value ;
    var Sname = document.getElementById("HdrSec1_InptSName_Val").value;
    var Intials = document.getElementById("HdrSec1_InptIName_Val").value;
    var PerNu=$("#HdrSec1_InptTpNu_Val").data("kendoNumericTextBox").value();
    var OficeNu=$("#HdrSec1_InptOTpNu_Val").data("kendoNumericTextBox").value();
    var PerEmail=document.getElementById("HdrSec1_InptEmail_Val").value ;
    var OficeMail=document.getElementById("HdrSec1_InptOEmail_Val").value ;
    var Address = document.getElementById("HdrSec1_InptAdress_Val").value;
    var CurrentCust = ($('#No').is(':checked')) ? "1" : "0";
    var CrntVehi=document.getElementById("HdrSec1_InptCrntVhicle_Val").value ;
    var ActionKy=$("#HdrSec1_CmbActionLst_Cd").data("kendoComboBox").value();
    var CallSum=document.getElementById("HdrSec1_Callsumry_Val").value ;
    var FlwActKy=$("#HdrSec1_CmbFlwUpAction_Cd").data("kendoComboBox").value();
    var Descriptin=document.getElementById("HdrSec1_Descption_Val").value ;
    var PlnDate=$("#HdrSec1_DatPlanDate_Val").data("kendoDatePicker").value();
    var NextDate = $("#HdrSec1_DatNextShdDate_Val").data("kendoDatePicker").value();
    var LogDetKy = document.getElementById("LogDetKy").value;
    var AdrKy = document.getElementById("AdrKy").value;

    if (LogDetKy > 0) {
        var result = confirm("Do you want to Update the record?");
        if (result) {
            $.ajax({
                url: urlUpdate,
                dataType: "json",
                type: "POST",
                data: JSON.stringify({
                    LogDetKy: LogDetKy,
                    ObjKy: viewBag.ObjKy,
                    ConCd: "LogTyp",
                    OurCd: viewBag.OurCd,
                    adrKy: AdrKy,
                    Fname: Fname,
                    Sname: Sname,
                    Intials: Intials,
                    PerNu: PerNu,
                    OficeNu: OficeNu,
                    PerEmail: PerEmail,
                    OficeMail: OficeMail,
                    Address: Address,
                    CurrentCust: CurrentCust,
                    CrntVehi:CrntVehi,
                    ActionKy: ActionKy,
                    CallSum: CallSum,
                    FlwActKy: FlwActKy,
                    Descriptin: Descriptin,
                    PlnDate: PlnDate,
                    NextDate: NextDate,
                    LogTypKy: FormGlblData.TrnTypKy
                }),
                contentType: "application/json; charset=utf-8",
                success: function (data) {
                    if (data[0].Result) {
                        iziToast.success({
                            title: 'Updated',
                            message: 'Update Successfully!',
                            // position: 'center',
                        });
                       // alert("Update Successfully");
                        Clear();
                        // alert(data[0].LogDetKy)
                    } else {
                        iziToast.error({
                            title: 'Error',
                            message: 'Please TryAgain',
                            //  position: 'center',
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
            url: urlSave,
            dataType: "json",
            type: "POST",
            data: JSON.stringify({
                ObjKy: viewBag.ObjKy,
                ConCd: "LogTyp",
                OurCd: viewBag.OurCd,
                adrKy: AdrKy,
                Fname: Fname,
                Sname: Sname,
                Intials: Intials,
                PerNu: PerNu,
                OficeNu: OficeNu,
                PerEmail: PerEmail,
                OficeMail: OficeMail,
                Address: Address,
                CurrentCust: CurrentCust,
                CrntVehi: CrntVehi,
                ActionKy: ActionKy,
                CallSum: CallSum,
                FlwActKy: FlwActKy,
                Descriptin: Descriptin,
                PlnDate: PlnDate,
                NextDate: NextDate,
                LogTypKy: FormGlblData.TrnTypKy

            }),
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                if (data[0].Result) {
                    iziToast.success({
                        title: 'Saved',
                        message: 'Save Successfully!',
                        // position: 'center',
                    });
                    //alert("Save Successfully");
                    Clear();
                    // alert(data[0].LogDetKy)
                } else {
                    iziToast.error({
                        title: 'Error',
                        message: 'Please TryAgain',
                        //  position: 'center',
                    });
                  //  alert("Please TryAgain");
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
                document.getElementById("HdrSec1_InptCrntVhicle_Val").value = data[0].CrnttVhl;
                $("#Yes").prop("checked", true);
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
