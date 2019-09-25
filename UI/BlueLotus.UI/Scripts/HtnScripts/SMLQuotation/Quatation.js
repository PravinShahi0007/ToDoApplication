var FormGlblData = {
    FormObjData: null,
    TrnTypKy: 1,
    AccessLvlKy: 1,
    ConfiLvlKy: 1,
    TrnKy: 1,
    AllDefalutValueObj: null,
};

LoadGloabData();


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
            LoadCombo();
            tabstripLoad();
            // LoadComboAndDateTime();
            //Clear();

            setHdrSectionPropFun();
            Clear();
            GetCurrencyRates();
            //GridDefaultColumns();
            // CLOSELoadingForm();
        }
    });
}

function LoadAllGrd() {
    var ModelKy = $("#HdrSec1_CmbVehicalInt_Cd").data("kendoComboBox").value();
    GridLoadTemplate('#Exterior_Grd', 'Exterior', ModelKy);
    GridLoadTemplate('#Interior_Grd', 'Interior', ModelKy);
    GridLoadTemplate('#Technology_Grd', 'Technology', ModelKy);
    GridLoadTemplate('#Accessories_Grd', 'Other', ModelKy);
    GridLoadTemplate('#Wheels_Grd', 'Wheels', ModelKy);
    // SummeryGridLoad();
}

function setHdrSectionPropFun() {

    // ---------- Set ObjProperties
    setHdrSectionProp("", viewBag.ObjKy, "", "HdrSec1");
    SetHandlingEnterKeyEvent("", viewBag.ObjKy);
    SetFirstFocusObj();

    // $("#HdrSec1_InptDocNo_Val").focus();
}

$(document)
.ready(function () {
    Button_From_Dynamic("ButtonSec1");
});

function LoadCombo() {
    $("#HdrSec1_InptTotal_Val").kendoNumericTextBox({
        spinners: false,
    });
    $("#HdrSec1_InptExRate_Val").kendoNumericTextBox({
        spinners: false,
        decimals: 0
    });

    $("#HdrSec1_CmbVehicalInt_Cd")
      .kendoComboBox({
          dataValueField: "ItmKy",
          dataTextField: "ItmNm",
          dataSource: ItmmasName("HdrSec1_CmbVehicalInt"),
          change: function (e) {
              var cmb = $("#HdrSec1_CmbVehicalInt_Cd").data("kendoComboBox");
              var cmbVal = cmb.value();
              if (cmbVal != "") {
                  var validate = ComboValidations("HdrSec1_CmbVehicalInt_Cd");
                  if (validate) {
                      $("#HdrSec1_CmbVehicalInt_Cd").data("kendoComboBox").value(cmbVal);
                      LoadAllGrd();
                      // TotalCalculation();
                  } else {
                      $("#HdrSec1_CmbVehicalInt_Cd").data("kendoComboBox").value("");
                  }
              }
          },
          filter: "startswith",
          suggest: true,
          placeholder: "Select a Model"
      });

    $("#HdrSec1_CmbVehiClr_Cd")
        .kendoComboBox({
            dataValueField: "CdKy",
            dataTextField: "CdNm",
            dataSource: CdmasName("HdrSec1_CmbVehiClr"),
            change: function (e) {
                var cmb = $("#HdrSec1_CmbVehiClr_Cd").data("kendoComboBox");
                var cmbVal = cmb.value();
                if (cmbVal != "") {
                    var validate = ComboValidations("HdrSec1_CmbVehicalInt_Cd");
                    if (validate) {
                        $("#HdrSec1_CmbVehiClr_Cd").data("kendoComboBox").value(cmbVal);
                        LoadAllGrd();
                        // TotalCalculation();
                    } else {
                        $("#HdrSec1_CmbVehiClr_Cd").data("kendoComboBox").value("");
                    }
                }
            },
            filter: "startswith",
            suggest: true,
            placeholder: "Select a Model"
        });
    $("#HdrSec1_DatDate_Val").kendoDatePicker({
        format: "dd/MM/yyyy",
        parseFormats: "yyyy/MM/dd",
        //  value: viewBag.DateNow, //new Date(),
        min: new Date(31, 2, 2009),
        change: function () {

        }
    });
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
    //$("#HdrSec1_CmbAdrMas_Cd")
    //    .kendoComboBox({
    //        dataValueField: "AdrKy",
    //        dataTextField: "AdrID",
    //        dataSource: AdrID("HdrSec1_CmbAdrMas"),
    //        change: function (e) {
    //            var cmb = $("#HdrSec1_CmbAdrMas_Cd").data("kendoComboBox");
    //            var cmbVal = cmb.value();
    //            if (cmbVal != "") {
    //                var validate = ComboValidations("HdrSec1_CmbAdrMas_Cd");
    //                if (validate) {
    //                    $("#HdrSec1_CmbAdrMas_Cd").data("kendoComboBox").value(cmbVal);
    //                    $("#HdrSec1_CmbAdrMas_Nm").data("kendoComboBox").value(cmbVal);
    //                    SetCustomerName(cmbVal)
    //                } else {
    //                    $("#HdrSec1_CmbAdrMas_Cd").data("kendoComboBox").value("");
    //                    $("#HdrSec1_CmbAdrMas_Nm").data("kendoComboBox").value("");



    //                }
    //            }
    //        },
    //        filter: "startswith",
    //        suggest: true,
    //        placeholder: "Select a Customer"
    //    });
    //$("#HdrSec1_CmbAdrMas_Nm")
    //    .kendoComboBox({
    //        dataValueField: "AdrKy",
    //        dataTextField: "AdrNm",
    //        dataSource: AdrNm("HdrSec1_CmbAdrMas"),
    //        change: function (e) {
    //            var cmb = $("#HdrSec1_CmbAdrMas_Nm").data("kendoComboBox");
    //            var cmbVal = cmb.value();
    //            if (cmbVal != "") {
    //                var validate = ComboValidations("HdrSec1_CmbAdrMas_Nm");
    //                if (validate) {
    //                    $("#HdrSec1_CmbAdrMas_Cd").data("kendoComboBox").value(cmbVal);
    //                    $("#HdrSec1_CmbAdrMas_Nm").data("kendoComboBox").value(cmbVal);
    //                    SetCustomerName(cmbVal);
    //                } else {
    //                    $("#HdrSec1_CmbAdrMas_Cd").data("kendoComboBox").value("");
    //                    $("#HdrSec1_CmbAdrMas_Nm").data("kendoComboBox").value("");


    //                }
    //            }
    //        },
    //        filter: "startswith",
    //        suggest: true,
    //        placeholder: "Select a Customer"
    //    });
    $(".k-datepicker, .k-combobox, .k-numerictextbox,.k-input").css("width", "100%");
    $("#HdrSec1_CmbSalesPerson_Cd").parent().css("width", "70%");
    $("#HdrSec1_CmbVehicalInt_Cd").parent().css("width", "70%");
    $("#HdrSec1_CmbVehiClr_Cd").parent().css("width", "70%");

    //$("#HdrSec1_CmbAdrMas_Nm").parent().css("width", "40%");
    //$("#HdrSec1_CmbAdrMas_Cd").parent().css("width", "30%");
    SetDate();
}

//________________________________________DataSource
//DateSources
//This is Modidied TO ItmMas
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

function ItmmasName(ObjNm) {
    var ObjKy = GetObjKy(ObjNm);
    var PreKy = 1;
    var dataSource = new kendo.data.DataSource(
        {
            transport: {
                read: {
                    url: urlGetItmasName,
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


function tabstripLoad() {
    $("#HdrSec1_tabstrip").kendoTabStrip({
        navigatable: true,
        select: tabstrip_select,
        animation: {
            close: {
                duration: 20000
            },
            open: { effects: "fadeIn" }

        },

    });


}



function tabstrip_select(e) {
    var x = $(e.item).index();
    if (x == 4) {
        SummeryGridLoad();
    }
}


function LoadExtiriorGridWithAjax(DivOurCode) {
    $.ajax({
        url: urlLoadGridDetai,//'@Url.Action("NewGridView", "Test")',
        type: "Post",
        data: {
            ObjKy: viewBag.ObjKy,
            ItmCatOurCd: DivOurCode,
        },
        dataType: 'json',
        success: function (result) {
            $('#Exterior_Grd').data("kendoGrid").dataSource = new kendo.data.DataSource({ data: result });
            $('#Exterior_Grd').data("kendoGrid").dataSource.read();
            $('#Exterior_Grd').data("kendoGrid").refresh();
        },
        error: function (arg) {
            iziToast.error({
                title: "Network Error",
                message: "Network Related Error Please Try Again",

            });
            GridDefaultColumns();
            return false;
        }
    });

}
function ComboValidations(cmbNm) {
    var cmb = $("#" + cmbNm + "").data("kendoComboBox");
    var val = cmb.value();
    if (isNaN(val)) {
        alert("'" + val + "' is not a Valid input");
        $("#" + cmbNm + "").data('kendoComboBox').value("");
        return false;
    } else {
        return true;
    }
}



//function TotalCalculation() {
//    var vehPrice = 0.00;
//    var VehKy = $("#HdrSec1_CmbVehicalInt_Cd").data("kendoComboBox").value();
//        $.ajax({
//            url: urlGetVehPriceAction,//'@Url.Action("NewGridView", "Test")',
//            type: "Post",
//            data: {
//                ObjKy: viewBag.ObjKy,
//                ModelKy: VehKy,
//            },
//            dataType: 'json',
//            success: function (result) {
//                vehPrice = result;
//                console.log(vehPrice);
//                var total = parseFloat(CalculateTotalSelected('#Exterior_Grd')) + parseFloat(CalculateTotalSelected('#Interior_Grd')) + parseFloat(CalculateTotalSelected('#Technology_Grd')) + parseFloat(CalculateTotalSelected('#Accessories_Grd')) + parseFloat(vehPrice);
//                $("#HdrSec1_InptTotal_Val").data("kendoNumericTextBox").value(total);
//            },
//            error: function (arg) {
//                iziToast.error({
//                    title: "Network Error",
//                    message: "Network Related Error Please Try Again",

//                });
//                GridDefaultColumns();
//                return false;
//            }
//        });

//}


function Save() {
    var Date = document.getElementById("HdrSec1_DatDate_Val").value;
    var ExtData = $("#Exterior_Grd").data("kendoGrid").dataSource.data();
    var IntData = $("#Interior_Grd").data("kendoGrid").dataSource.data();
    var TechData = $("#Technology_Grd").data("kendoGrid").dataSource.data();
    var AccesData = $("#Accessories_Grd").data("kendoGrid").dataSource.data();
    var Wheels = $("#Wheels_Grd").data("kendoGrid").dataSource.data();


    var updatedRecords = [];
    var newRecords = [];
    var Lino = 1;
    for (var i = 0; i < ExtData.length; i++) {
        if (ExtData[i].dirty && ExtData[i].Select) {
            //ExtData[i].LiNo2 = Lino;
            //Lino++; ExtData[i].LiNo2 = Lino;
            //Lino++;
            newRecords.push(ExtData[i].toJSON());
        } else if (ExtData[i].dirty && ExtData[i].Select) {
            //  updatedRecords.push(ExtData[i].toJSON());
        }
    }
    for (var i = 0; i < IntData.length; i++) {
        if (IntData[i].isNew() && IntData[i].Select) {
            newRecords.push(IntData[i].toJSON());
        } else if (IntData[i].dirty && IntData[i].Select) {
            //  updatedRecords.push(IntData[i].toJSON());
        }
    }
    for (var i = 0; i < TechData.length; i++) {
        if (TechData[i].isNew() && TechData[i].Select) {
            newRecords.push(TechData[i].toJSON());
        } else if (TechData[i].dirty && TechData[i].Select) {
            //   updatedRecords.push(TechData[i].toJSON());
        }
    }

    for (var i = 0; i < AccesData.length; i++) {
        if (AccesData[i].isNew() && AccesData[i].Select) {
            newRecords.push(AccesData[i].toJSON());
        } else if (AccesData[i].dirty && AccesData[i].Select) {
            // updatedRecords.push(AccesData[i].toJSON());
        }
    }

    for (var i = 0; i < Wheels.length; i++) {
        if (Wheels[i].isNew() && Wheels[i].Select) {
            newRecords.push(Wheels[i].toJSON());
        } else if (Wheels[i].dirty && Wheels[i].Select) {
            // updatedRecords.push(Wheels[i].toJSON());
        }
    }
    var Amt = $("#HdrSec1_InptTotal_Val").data("kendoNumericTextBox").value();
    var DocNo = document.getElementById("HdrSec1_InptDocnu_Val").value;
    var ExRate = $("#HdrSec1_InptExRate_Val").data("kendoNumericTextBox").value();
    var repKy = document.getElementById("HdrSec1_CmbSalesPerson_Cd").value;
    var clrKy = '1';// document.getElementById("HdrSec1_CmbVehiClr_Cd").value;
    var mdlKy = document.getElementById("HdrSec1_CmbVehicalInt_Cd").value;
    $.ajax({
        url: urlQuatationSave,
        data: JSON.stringify({
            objKy: viewBag.ObjKy,
            NewRecord: kendo.stringify(newRecords),//newRecords,
            UpdateRecord: kendo.stringify(updatedRecords),//updatedRecords
            Date: Date,
            Amt: Amt,
            DocNo: DocNo,
            SalesRep: repKy,
            ExRate: ExRate,
            ClrKy: clrKy,
            MdlKy: mdlKy
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "Json",
        type: "POST",
        success: function (data) {
            if (data) {
                FormGlblData.TrnKy = data;
                iziToast.success({
                    title: 'Saved',
                    message: 'Save Successfully!,You will Direct to Print Quatation'
                });
                DirectPrintSource();
                DetailClr();
                LoadOrdHdrDetails(FormGlblData.TrnKy);
            } else {

                iziToast.success({
                    title: 'Error',
                    message: 'Please Try Agan'
                });

            }

        },
        error: function (arg) {
            iziToast.error({
                title: "Network Error",
                message: "Network Related Error Please Try Again",

            });
            GridDefaultColumns();
            return false;
        }

    });
}


function DirectPrintSource() {

    var formOrdKy = FormGlblData.TrnKy;
    var formObjCaption = viewBag.ObjCaptn;
    var formObjKy = viewBag.ObjKy;

    if (Number(formOrdKy) > 11) {
        // Calling from "<script src="~/Scripts/HtnScripts/Report/SourceDocumentPrint.js"></script>"
        DirectPrintSourceCommon(formOrdKy, formObjCaption, formObjKy, "1");
    }
    else {
        alert("Select the record.");
    }
}
//Get and set Currency rates
function GetCurrencyRates() {
    var dateObj = new Date();
    var month = dateObj.getUTCMonth() + 1; //months from 1-12
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();

    var newdate = day + "/" + month + "/" + year;
    $.ajax({
        url: urlGetExRateAction,
        data: JSON.stringify({
            objKy: viewBag.ObjKy,
            EftvDt: newdate
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "Json",
        type: "POST",
        success: function (data) {

            $("#HdrSec1_InptExRate_Val").data("kendoNumericTextBox").value(data[0].Value);
            //    $("#HdrSec1_NmriczPndAmt_Val").data("kendoNumericTextBox").value(data[1].Value);

        },
        error: function (arg) {
            iziToast.error({
                title: "Network Error",
                message: "Network Related Error Please Try Again",

            });
            GridDefaultColumns();
            return false;
        }

    });

}

function DetailClr() {
    $("#HdrSec1_InptTotal_Val").data("kendoNumericTextBox").value("");
    $("#HdrSec1_CmbVehicalInt_Cd").data("kendoComboBox").value("");
    GetCurrencyRates();
    try {
        $("#Exterior_Grd").data("kendoGrid").dataSource.data([]);
        $("#Interior_Grd").data("kendoGrid").dataSource.data([]);
        $("#Technology_Grd").data("kendoGrid").dataSource.data([]);
        $("#Accessories_Grd").data("kendoGrid").dataSource.data([]);
        $("#Wheels_Grd").data("kendoGrid").dataSource.data([]);
    } catch (e) {

    }
}


function Clear() {
    clearHdr();
    try {
        $("#Exterior_Grd").data("kendoGrid").dataSource.data([]);
        $("#Interior_Grd").data("kendoGrid").dataSource.data([]);
        $("#Technology_Grd").data("kendoGrid").dataSource.data([]);
        $("#Accessories_Grd").data("kendoGrid").dataSource.data([]);
        $("#Wheels_Grd").data("kendoGrid").dataSource.data([]);
       // $("#Wheels_Grd").data("kendoGrid").dataSource.data([]);

    } catch (e) {

    }

}

function clearHdr() {
    document.getElementById("HdrSec1_InptQuotenu_Val").value = "";
    $("#HdrSec1_InptTotal_Val").data("kendoNumericTextBox").value("");
    $("#HdrSec1_CmbVehicalInt_Cd").data("kendoComboBox").value("");
    $("#HdrSec1_InptTotal_Val").data("kendoNumericTextBox").value(0);
    document.getElementById("HdrSec1_InptDocnu_Val").value = "";
    $("#HdrSec1_CmbSalesPerson_Cd").data("kendoComboBox").value("");
    SetDate();
    FormGlblData.TrnKy = 1;
    GetCurrencyRates();
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

function AdrNm(ObjNm) {
    var ObjKy = GetObjKy(ObjNm);
    var dataSource = new kendo.data.DataSource(
        {
            transport: {
                read: {
                    url: urlGetAdrNm,
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

function SetDate() {
    $.ajax({
        url: urlGetDateTime,
        contentType: "application/json; charset=utf-8",
        dataType: "Json",
        type: "POST",
        success: function (data) {
            $("#HdrSec1_DatDate_Val").data("kendoDatePicker").value(data[1]);

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

function SetCustomerName(AdrKy) {
    $.ajax({
        url: urlGetName,
        data: JSON.stringify({
            objKy: viewBag.ObjKy,
            AdrKy: AdrKy
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "Json",
        type: "POST",
        success: function (data) {
            document.getElementById("HdrSec1_InptName_Val").value = data[0].Fname;
            document.getElementById("HdrSec1_InptSName_Val").value = data[0].Lname;
            document.getElementById("HdrSec1_InptIName_Val").value = data[0].Initials;


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
//function CallVehilePrice()
//{
//    var VehKy = $("#HdrSec1_CmbVehicalInt_Cd").data("kendoComboBox").value();
//    if (!VehKy || VehKy == 1) {
//        iziToast.warning({
//            title: "Select a Vehicle",
//            message: "Please Select a Vehicle"
//        });
//        return;
//    }
//    TotalCalculation();
//    //var Date = document.getElementById("HdrSec1_DatDate_Val").value;
//    //var totalAccPrice = parseFloat(CalculateTotalSelected('#Exterior_Grd')) +
//    //    parseFloat(CalculateTotalSelected('#Interior_Grd')) +
//    //    parseFloat(CalculateTotalSelected('#Technology_Grd')) +
//    //    parseFloat(CalculateTotalSelected('#Accessories_Grd'));
//    //$.ajax({
//    //    url: urlReturnCIFValue,
//    //    type: "Post",
//    //    data: {
//    //        ObjKy: viewBag.ObjKy,
//    //        ModelKy: VehKy,
//    //        Date: Date,
//    //        totalAccPrice: totalAccPrice
//    //    },
//    //    dataType: 'json',
//    //    success: function (result) {
//    //        var TaxPrice = prompt("CIF In Local Currency is : " + result, "0");

//    //        if (isNaN(TaxPrice) || !TaxPrice || TaxPrice == 0) {
//    //            iziToast.warning({
//    //                title: "Tax Amount Requiered",
//    //                message: "Please Enter Tax Amount Of the Vehicle"
//    //            });
//    //        } else {
//    //            TotalCalculation();
//    //        }

//    //    },
//    //    error: function (arg) {
//    //        iziToast.error({
//    //            title: "Network Error",
//    //            message: "Network Related Error Please Try Again",

//    //        });
//    //        GridDefaultColumns();
//    //        return false;
//    //    }
//    //});

//}


function TotalCalculation(IsSave) {
    var VehKy = $("#HdrSec1_CmbVehicalInt_Cd").data("kendoComboBox").value();
    if (!VehKy || VehKy == 1) {
        iziToast.warning({
            title: "Select a Vehicle",
            message: "Please Select a Vehicle"
        });
        return;
    }
    var Date = document.getElementById("HdrSec1_DatDate_Val").value;
    var totalAccPrice = parseFloat(CalculateTotalSelected('#Exterior_Grd')) +
        parseFloat(CalculateTotalSelected('#Interior_Grd')) +
        parseFloat(CalculateTotalSelected('#Technology_Grd')) +
        parseFloat(CalculateTotalSelected('#Accessories_Grd')) + parseFloat(CalculateTotalSelected('#Wheels_Grd'));
    $.ajax({
        url: urlGetVehPriceAction,//'@Url.Action("NewGridView", "Test")',
        type: "Post",
        data: {
            ObjKy: viewBag.ObjKy,
            ModelKy: VehKy,
            Date: Date,
            totalAccPrice: totalAccPrice,
        },
        dataType: 'json',
        success: function (result) {
            $("#HdrSec1_InptTotal_Val").data("kendoNumericTextBox").value(result);
            if (IsSave) {
                Save();
            }
        },
        error: function (arg) {
            iziToast.error({
                title: "Network Error",
                message: "Network Related Error Please Try Again",

            });
            GridDefaultColumns();
            return false;
        }
    });

}

//Used to calculate Total Taxes And Save Recoerds
function CalculateAndSave() {

    TotalCalculation(true);
}