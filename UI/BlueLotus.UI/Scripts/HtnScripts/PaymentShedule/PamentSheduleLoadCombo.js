function LoadCombo() {

    //Accounts Code Drop Bottom
    $("#HdrSec1_CmbAcc_Cd")
        .kendoComboBox({
            dataValueField: "AccKy",
            dataTextField: "AccCd",
            dataSource: AccDoropCode("HdrSec1_CmbAcc"),
            change: function (e) {
                var cmb = $("#HdrSec1_CmbAcc_Cd").data("kendoComboBox");
                var AkkKy = cmb.value();
                if (AkkKy != "") {
                    var validate = ComboValidations("HdrSec1_CmbAcc_Cd");
                    if (validate) {
                        $("#HdrSec1_CmbAcc_Cd").data("kendoComboBox").value(AkkKy);
                        //$("#HdrSec1_CmbAcc_Nm").data("kendoComboBox").value(AkkKy);
                        //GridDefaultColumns();
                        GetTheMainGridParameters();
                    } else {
                        $("#HdrSec1_CmbAcc_Cd").data("kendoComboBox").value("");
                        //$("#HdrSec1_CmbAcc_Nm").data("kendoComboBox").value("");
                    }
                }
            },
            filter: "contains",
            suggest: true,
            placeholder: "Select an Account"
        });
    //Accounts Name Drop Bottom
    $("#HdrSec1_CmbAcc_Nm")
        .kendoComboBox({
            dataValueField: "AccKy",
            dataTextField: "AccNM",
            dataSource: AccDoropName("HdrSec1_CmbAcc"),
            change: function (e) {
                var cmb = $("#HdrSec1_CmbAcc_Nm").data("kendoComboBox");
                var AkkKy = cmb.value();
                if (AkkKy != "") {
                    var validate = ComboValidations("HdrSec1_CmbAcc_Nm");
                    if (validate) {

                        //$("#HdrSec1_CmbAcc_Nm").data("kendoComboBox").value(AkkKy);
                        $("#HdrSec1_CmbAcc_Cd").data("kendoComboBox").value(AkkKy);
                      //  GridDefaultColumns();
                    } else {

                        $("#HdrSec1_CmbAcc_Cd").data("kendoComboBox").value("");
                        //$("#HdrSec1_CmbAcc_Nm").data("kendoComboBox").value("");
                    }
                }

            },
            filter: "contains",
            suggest: true,
            placeholder: "Select an Account"
        });

    //Payment Mode
    $("#HdrSec2_CmbPayMode_Cd")
        .kendoComboBox({
            dataValueField: "CdKy",
            dataTextField: "CdNm",
            dataSource: urlGetPaymentCode("HdrSec2_CmbPayMode"),
            change: function (e) {
                var cmb = $("#HdrSec2_CmbPayMode_Cd").data("kendoComboBox");
                var Anlky = cmb.value();
                if (Anlky != "") {
                    var validate = ComboValidations("HdrSec2_CmbPayMode_Cd");
                    if (validate) { 
                        $("#HdrSec2_CmbPayMode_Cd").data("kendoComboBox").value(Anlky);

                    } else {

                        $("#HdrSec2_CmbPayMode_Cd").data("kendoComboBox").value("");
                    }
                }

            },
            filter: "contains",
            suggest: true,
            placeholder: "Select a Payment Mode"
        });

    //Detail Account
    $("#HdrSec2_CmbCreditAcc_Cd")
      .kendoComboBox({
          dataValueField: "AccKy",
          dataTextField: "AccCd",
          dataSource: AccDoropCode("HdrSec2_CmbCreditAcc"),
          change: function (e) {
              var cmb = $("#HdrSec2_CmbCreditAcc_Cd").data("kendoComboBox");
              var AkkKy = cmb.value();
              if (AkkKy != "") {
                  var validate = ComboValidations("HdrSec2_CmbCreditAcc_Cd");
                  if (validate) {
                      GetAccKyByCrnKy(AkkKy);
                      $("#HdrSec2_CmbCreditAcc_Cd").data("kendoComboBox").value(AkkKy);
                      //$("#HdrSec2_CmbCreditAcc_Nm").data("kendoComboBox").value(AkkKy);
                  } else {
                      $("#HdrSec2_CmbCreditAcc_Cd").data("kendoComboBox").value("");
                      //$("#HdrSec2_CmbCreditAcc_Nm").data("kendoComboBox").value("");
                  }
              }
          },
          filter: "contains",
          suggest: true,
          placeholder: "Select an Account"
      });
    //Accounts Name Drop Bottom
    //$("#HdrSec2_CmbCreditAcc_Nm")
    //    .kendoComboBox({
    //        dataValueField: "AccKy",
    //        dataTextField: "AccNM",
    //        dataSource: AccDoropName("HdrSec1_CmbAcc"),
    //        change: function (e) {
    //            var cmb = $("#HdrSec2_CmbCreditAcc_Nm").data("kendoComboBox");
    //            var AkkKy = cmb.value();
    //            if (AkkKy != "") {
    //                var validate = ComboValidations("HdrSec2_CmbCreditAcc_Nm");
    //                if (validate) {

    //                    $("#HdrSec2_CmbCreditAcc_Nm").data("kendoComboBox").value(AkkKy);
    //                    $("#HdrSec2_CmbCreditAcc_Cd").data("kendoComboBox").value(AkkKy);

    //                } else {

    //                    $("#HdrSec2_CmbCreditAcc_Cd").data("kendoComboBox").value("");
    //                    $("#HdrSec2_CmbCreditAcc_Nm").data("kendoComboBox").value("");
    //                }
    //            }

    //        },
    //        filter: "contains",
    //        suggest: true,
    //        placeholder: "Select an Account"
    //    });

    //
    $("#HdrSec1_CmbPrj_Cd")
        .kendoComboBox({
            dataValueField: "PrjKy",
            dataTextField: "PrjId",
            dataSource: ProjectCd('HdrSec1_CmbPrj'),
            change: function (e) {
                var cmb = $("#HdrSec1_CmbPrj_Cd").data("kendoComboBox");
                var PrjKy = cmb.value();
                if (PrjKy != "") {
                    var validate = ComboValidations("HdrSec1_CmbPrj_Cd");
                    if (validate) {
                        $("#HdrSec1_CmbPrj_Cd").data("kendoComboBox").value(PrjKy);
                        GetTheMainGridParameters();
                    } else {
                        $("#HdrSec1_CmbPrj_Cd").data("kendoComboBox").value("");
                    }
                }

            },
            filter: "contains",
            suggest: true,
            placeholder: "Select a Project"
        });
    //Project Name Drop Bottom
    $("#HdrSec1_CmbPrj_Nm")
        .kendoComboBox({
            dataValueField: "PrjKy",
            dataTextField: "PrjNm",
            dataSource: ProjectNm('HdrSec1_CmbPrj'),
            change: function (e) {
                var cmb = $("#HdrSec1_CmbPrj_Nm").data("kendoComboBox");
                var PrjKy = cmb.value();
                if (PrjKy != "") {
                    var validate = ComboValidations("HdrSec1_CmbPrj_Nm");
                    if (validate) {
                        $("#HdrSec1_CmbPrj_Cd").data("kendoComboBox").value(PrjKy);
                        //$("#HdrSec1_CmbPrj_Nm").data("kendoComboBox").value(PrjKy);
                    } else {
                        $("#HdrSec1_CmbPrj_Cd").data("kendoComboBox").value("");
                        //$("#HdrSec1_CmbPrj_Nm").data("kendoComboBox").value("");
                    }
                }

            },
            filter: "contains",
            suggest: true,
            placeholder: "Select an Project"
        });

    //Bu
    //BU Code Drop Bottom
    $("#HdrSec1_CmbBU_Cd")
        .kendoComboBox({
            dataValueField: "CdKy",
            dataTextField: "Code",
            dataSource: BUCode('HdrSec1_CmbBU'),
            change: function (e) {
                var cmb = $("#HdrSec1_CmbBU_Cd").data("kendoComboBox");
                var BUKy = cmb.value();
                if (BUKy != "") {
                    var validate = ComboValidations("HdrSec1_CmbBU_Cd");
                    if (validate) {
                        $("#HdrSec1_CmbBU_Cd").data("kendoComboBox").value(BUKy);
                        //$("#HdrSec1_CmbBU_Nm").data("kendoComboBox").value(BUKy);
                    } else {
                        $("#HdrSec1_CmbBU_Cd").data("kendoComboBox").value("");
                        //$("#HdrSec1_CmbBU_Nm").data("kendoComboBox").value("");
                    }
                }
            },
            filter: "contains",
            suggest: true,
            placeholder: "Select a BU"
        });
    //BU Name Drop Bottom
    $("#HdrSec1_CmbBU_Nm")
        .kendoComboBox({
            dataValueField: "CdKy",
            dataTextField: "Name",
            dataSource: BUName('HdrSec1_CmbBU'),
            change: function (e) {
                var cmb = $("#HdrSec1_CmbBU_Nm").data("kendoComboBox");
                var BUKy = cmb.value();
                if (BUKy != "") {
                    var validate = ComboValidations("HdrSec1_CmbBU_Nm");
                    if (validate) {
                        $("#HdrSec1_CmbBU_Cd").data("kendoComboBox").value(BUKy);
                        $("#HdrSec1_CmbBU_Nm").data("kendoComboBox").value(BUKy);
                    } else {
                        $("#HdrSec1_CmbBU_Cd").data("kendoComboBox").value("");
                        $("#HdrSec1_CmbBU_Nm").data("kendoComboBox").value("");
                    }
                }
            },
            filter: "contains",
            suggest: true,
            placeholder: "Select an BU"
        });

    $("#HdrSec1_CmbAcc_Cd").parent().css("width", "35%");
    $("#HdrSec1_CmbAcc_Nm").parent().css("width", "60%");
    $("#HdrSec2_CmbCreditAcc_Cd").parent().css("width", "35%");
    //$("#HdrSec2_CmbCreditAcc_Nm").parent().css("width", "60%");

    $("#HdrSec1_CmbPrj_Cd").parent().css("width", "35%");
    //$("#HdrSec1_CmbPrj_Nm").parent().css("width", "60%");
    $("#HdrSec1_CmbBU_Cd").parent().css("width", "35%");
    //$("#HdrSec1_CmbBU_Nm").parent().css("width", "60%");
    //$("#HdrSec2_CmbPayMode_Cd").parent().css("width", "60%");


    $("#HdrSec2_InpOpnBalText_Val").kendoNumericTextBox({
        min: 0,
        decimals: 3,
      //  format: "n3",
        spinners: false,
        change: function () {
            var value = this.value();
            this.value(value);
        }
    })
    //    .focus(function () {
    //    var input = $(this);
    //    setTimeout(function () {
    //        input.select();
    //    });
    //});
    //$("#HdrSec2_InpOpnBalText_Val")
    //.kendoNumericTextBox({
    //    decimals: 3,
    //    spinners: false,
    //    min: 0,
    //    change: function () {
    //    }
    //});
    $("#HdrSec2_InpCurTotTxt_Val")
   .kendoNumericTextBox({
       decimals: 3,
       spinners: false,
       min: 0,
       change: function () {
       }
   });
    $("#HdrSec2_InpClosBalTot_Val")
   .kendoNumericTextBox({
       decimals: 3,
       spinners: false,
       min: 0,
       change: function () {
       }
   });
    
}
//DataSourse
function AccDoropCode(ObjNm) {
    var ObjKy = GetObjKy(ObjNm);
    var dataSource = new kendo.data.DataSource(
    {
        transport: {
            read: {
                url: urlGetAccDoropCode,
                data: {
                    'ObjKy': ObjKy,
                    'TrnTypKy':1,
                    'PreKy':1
                },
                dataType: "json"
            }
        }

    });
    return dataSource;
}

function AccDoropName(ObjNm) {
    var ObjKy = GetObjKy(ObjNm);
    var dataSource = new kendo.data.DataSource(
    {
        transport: {
            read: {
                url: urlGetAccDoropNm,
                data: {
                    'ObjKy': ObjKy
                },
                dataType: "json"
            }
        }

    });
    return dataSource;
}

function urlGetPaymentCode(ObjNm) {
    var ObjKy = GetObjKy(ObjNm);
    var dataSource = new kendo.data.DataSource(
    {
        transport: {
            read: {
                url: GetPaymentModeCode,
                data: {
                    'ObjKy': ObjKy
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
//____Project data source
function ProjectCd(ObjNm) {
    var ObjKy = GetObjKy(ObjNm);
    var dataSource = new kendo.data.DataSource(
    {
        transport: {
            read: {
                url: urlGetProjectCode,
                data: {
                    'ObjKy': ObjKy,
                    'TrnTypKy':1,
                    'PreKy' :1
                },
                dataType: "json"
            }
        }

    });
    return dataSource;
}
function ProjectNm(ObjNm) {
    var ObjKy = GetObjKy(ObjNm);
    var dataSource = new kendo.data.DataSource(
    {
        transport: {
            read: {
                url: urlGetProjectNm,
                data: {
                    ObjKy: ObjKy
                },
                dataType: "json"
            }
        }

    });
    return dataSource;
}
function ProjectCd(ObjNm) {
    var ObjKy = GetObjKy(ObjNm);
    var dataSource = new kendo.data.DataSource(
    {
        transport: {
            read: {
                url: urlGetProjectCode,
                data: {
                    'ObjKy': ObjKy,
                    'TrnTypKy':1,
                    'PreKy' :1
                },
                dataType: "json"
            }
        }

    });
    return dataSource;
}
//____BU data source
function BUCode(ObjNm) {
    var ObjKy = GetObjKy(ObjNm);
    var dataSource = new kendo.data.DataSource(
    {
        transport: {
            read: {
                url: urlGetBUCode,
                data: {
                    'ObjKy': ObjKy,
                    'TrnTypKy': 1,
                    'PreKy': 1
                },
                dataType: "json"
            }
        }

    });
    return dataSource;
}

function BUName(ObjNm) {
    var ObjKy = GetObjKy(ObjNm);
    var dataSource = new kendo.data.DataSource(
    {
        transport: {
            read: {
                url: urlGetBUNm,
                data: {
                    'ObjKy': ObjKy,
                },
                dataType: "json"
            }
        }

    });
    return dataSource;
}
