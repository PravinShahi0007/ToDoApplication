var FormGlblData = {
    FormObjData: null,
    TrnTypKy: 1,
    AccessLvlKy: 1,
    ConfiLvlKy: 1,
    TrnKy: 1,
    TimeStamp: "",
    AcctrnKy1: 1,
    AcctrnKy2: 1,
    PmtDet1: 1,
    PmtDet2: 1,

}
$(document).ready(function () {
    GetTrnTypKy();
    // GetFormObjData();

});

function GetTrnTypKy() {
    $.ajax({
        url: urlCodes.GetCdKyByConCdAndOurCd,
        dataType: "json",
        type: "POST",
        data: JSON.stringify({
            ObjKy: viewBag.ObjKy,
            ConCd: 'TrnTyp',
            OurCd: viewBag.OurCd
        }),
        contentType: 'application/json; charset=utf-8',
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
        contentType: 'application/json; charset=utf-8',
        success: function (HdrSectionFromDb) {

            FormGlblData.FormObjData = HdrSectionFromDb;
            FormGlblData.AllDefalutValueObj = Get_AllDefalutValue_Obj();
            //   FormGlblData.AllValidationObj = Get_All_Validation_Obj();
            // FormGlblData.AllValidationObj = sortByKey(FormGlblData.AllValidationObj, 'ValidationOrder');
            Button_From_Dynamic('ButtonSec1');
            DocReadyCus();
        }
    });
}

function DocReadyCus() {

    LoadKendoCombo();
    setTimeout(setHdrSectionPropFun, 2000);
    ClearAl();
}

function LoadKendoCombo() {
    $("#HdrSec1_DatFrom_Val")
        .kendoDatePicker({
            format: "dd/MM/yyyy",
            min: new Date(31, 2, 2009),
        });

    //Accounts Code Drop Bottom
    $("#HdrSec1_CmbAcc_Cd")
        .kendoComboBox({
            dataValueField: "AccKy",
            dataTextField: "AccCode",
            dataSource: AccDoropCode("HdrSec1_CmbAcc"),
            change: function (e) {
                var cmb = $("#HdrSec1_CmbAcc_Cd").data("kendoComboBox");
                var AkkKy = cmb.value();
                if (AkkKy != "") {
                    var validate = ComboValidations("HdrSec1_CmbAcc_Cd");
                    if (validate) {
                        $("#HdrSec1_CmbAcc_Nm").data("kendoComboBox").value(AkkKy);
                        $("#HdrSec1_CmbAcc_Cd").data("kendoComboBox").value(AkkKy);

                    } else {
                        $("#HdrSec1_CmbAcc_Cd").data("kendoComboBox").value("");
                        $("#HdrSec1_CmbAcc_Nm").data("kendoComboBox").value(AkkKy);

                    }
                }
            },
            filter: "startswith",
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
                        $("#HdrSec1_CmbAcc_Nm").data("kendoComboBox").value(AkkKy);
                        $("#HdrSec1_CmbAcc_Cd").data("kendoComboBox").value(AkkKy);

                    } else {
                        $("#HdrSec1_CmbAcc_Cd").data("kendoComboBox").value("");
                        $("#HdrSec1_CmbAcc_Nm").data("kendoComboBox").value(AkkKy);

                    }
                }
            },
            filter: "startswith",
            suggest: true,
            placeholder: "Select an Account"
        });


    //Bank

    //Accounts Code Drop Bottom
    $("#HdrSec1_CmbBnk_Cd")
        .kendoComboBox({
            dataValueField: "AccKy",
            dataTextField: "AccCode",
            dataSource: AccDoropCode("HdrSec1_CmbBank"),
            change: function (e) {
                var cmb = $("#HdrSec1_CmbBnk_Cd").data("kendoComboBox");
                var AkkKy = cmb.value();
                var validate = ComboValidations("HdrSec1_CmbBnk_Cd");
                if (validate) {
                    $("#HdrSec1_CmbBnk_Nm").data("kendoComboBox").value(AkkKy);
                    $("#HdrSec1_CmbBnk_Cd").data("kendoComboBox").value(AkkKy);

                } else {
                    $("#HdrSec1_CmbBnk_Cd").data("kendoComboBox").value("");
                    $("#HdrSec1_CmbBnk_Nm").data("kendoComboBox").value("");


                }
            },
            filter: "startswith",
            suggest: true,
            placeholder: "Select an Account"
        });
    //Accounts Name Drop Bottom
    $("#HdrSec1_CmbBnk_Nm")
        .kendoComboBox({
            dataValueField: "AccKy",
            dataTextField: "AccNM",
            dataSource: AccDoropName("HdrSec1_CmbBank"),
            change: function (e) {
                var cmb = $("#HdrSec1_CmbBnk_Nm").data("kendoComboBox");
                var AkkKy = cmb.value();
                var validate = ComboValidations("HdrSec1_CmbBnk_Nm");
                if (validate) {
                    $("#HdrSec1_CmbBnk_Nm").data("kendoComboBox").value(AkkKy);
                    $("#HdrSec1_CmbBnk_Cd").data("kendoComboBox").value(AkkKy);

                } else {
                    $("#HdrSec1_CmbBnk_Cd").data("kendoComboBox").value("");
                    $("#HdrSec1_CmbBnk_Nm").data("kendoComboBox").value("");


                }
            },
            filter: "startswith",
            suggest: true,
            placeholder: "Select an Account"
        });


    $("#HdrSec1_NmricChqNu_Val").kendoNumericTextBox({
        restrictDecimals: 'restrictDecimals',
        format: "#",
        decimals: 0,
        spinners: false,
        min: 0,
        placeholder: 'Cheque Number',
        change: function () {


        }
    });

    $("#HdrSec1_NmricAmt_Val").kendoNumericTextBox({
        decimals: 3,
        spinners: false,
        min: 0,
        placeholder: 'Amount',
        change: function () {

        }
    });

    var todayDate = new Date();
    $("#HdrSec1_DatFrom_Val").data("kendoDatePicker").value(todayDate);

    $("#HdrSec1_CmbBnk_Nm").parent().css("width", "60%");
    $("#HdrSec1_CmbAcc_Nm").parent().css("width", "60%");
}
function AccDoropCode(ObjNm) {

    var ObjVisible = GetObjVisible(ObjNm);
    if (ObjVisible == 0) {
        return [];
    }

    var ObjKy = GetObjKy(ObjNm);
    var dataSource = new kendo.data.DataSource(
        {
            transport: {
                read: {
                    url: urlGetAccDoropCode,
                    data: {
                        'ObjKy': ObjKy
                    },
                    dataType: "json"
                }
            }

        });
    return dataSource;
}

function AccDoropName(ObjNm) {

    var ObjVisible = GetObjVisible(ObjNm);
    if (ObjVisible == 0) {
        return [];
    }

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

$('#HdrSec1_NmricChqNu_Val').blur(function () {

    var Date = $("#HdrSec1_DatFrom_Val").val();
    var AccKy = $("#HdrSec1_CmbBnk_Cd").data("kendoComboBox").value();
    var ChqNo = $("#HdrSec1_NmricChqNu_Val").data("kendoNumericTextBox").value();

    if (!Date || !AccKy || !ChqNo || AccKy == 1 || ChqNo.length <= 4) {
        return false;
    }
    var obj = new Object();
    obj.Date = Date;
    obj.BankAccKy = AccKy;
    obj.ChqNu = ChqNo;
    // alert(JSON.stringify(obj))
    $.ajax({
        url: urlLoadChqDetail,
        dataType: "json",
        type: "POST",
        data: JSON.stringify({
            JsonString: JSON.stringify(obj),
            ObjKy: viewBag.ObjKy
        }),
        contentType: 'application/json; charset=utf-8',
        success: function (DataObj) {
            if (DataObj) {
                //      $('textbox').removeAttr('readonly').val('Changed Value');

                document.getElementById("HdrSec1_BU_Val").value = DataObj.BuNm;
                document.getElementById("HdrSec1_BU_Val").readOnly = true;
                document.getElementById("HdrSec1_Prj_Val").value = DataObj.PrjNm;
                document.getElementById("HdrSec1_Prj_Val").readOnly = true;
                $("#HdrSec1_NmricAmt_Val").data("kendoNumericTextBox").value(DataObj.Amount);
                $("#HdrSec1_CmbAcc_Cd").data("kendoComboBox").value(DataObj.AccKy);
                $("#HdrSec1_CmbAcc_Nm").data("kendoComboBox").value(DataObj.AccKy);

            }


        },
        error: function (e) {
            iziToast.error({
                title: 'Error',
                message: 'Network Related Issue \n Please try Again',
            });
        }
    });
});

//Updated the combo validation funciton to validate user data by charith
function ComboValidations(cmbNm) {
    var cmb = $("#" + cmbNm + "").data("kendoComboBox");
    var dataItem = cmb.dataItem();
    if (!dataItem) {
        alert("'" + cmb.value() + "' is not a Valid input");
        $("#" + cmbNm + "").data("kendoComboBox").value("");
        return false;
    } else {

        return true;
    }

}
function setHdrSectionPropFun() {

    // ---------- Set ObjProperties
    setHdrSectionProp("", viewBag.ObjKy, "", "HdrSec1");
    SetHandlingEnterKeyEvent('', viewBag.ObjKy);
    SetFirstFocusObj();
    // $("#HdrSec1_InptDocNo_Val").focus();
}

function SaveUpdate() {
    var Date = $("#HdrSec1_DatFrom_Val").val();
    var BnkAccKy = $("#HdrSec1_CmbBnk_Cd").data("kendoComboBox").value();
    var ChqNo = $("#HdrSec1_NmricChqNu_Val").data("kendoNumericTextBox").value();
    var Amt = $("#HdrSec1_NmricAmt_Val").data("kendoNumericTextBox").value();
    var AccKy = $("#HdrSec1_CmbAcc_Cd").data("kendoComboBox").value();

    if (!Date) {
        alert("Please Select a date");
        return false;
    }
    if (!BnkAccKy || BnkAccKy == 1) {
        alert("Please Select a Bank Account");
        return false;
    }
    if (!ChqNo) {
        alert("Please Enter a Cheque Number");
        return false;
    }
    if (!Amt || Amt <= 0) {
        alert("Please Select a Amount");
        return false;
    }
    if (!AccKy || AccKy == 1) {
        alert("Please Select a Account");
        return false;
    }
    var Lino1 = new Object();
    Lino1.LiNo = "1";
    Lino1.Date = Date;
    Lino1.AccKy = BnkAccKy;
    Lino1.Amount = Amt;
    Lino1.ChqNu = ChqNo;
    Lino1.TimeStamp = FormGlblData.TimeStamp;
    Lino1.AccTrnKy = FormGlblData.AcctrnKy1;
    Lino1.PmtDet = FormGlblData.PmtDet1;
    Lino1.OurCode = viewBag.OurCd
    
    var Lino2 = new Object();
    Lino2.LiNo = "2";
    Lino2.Date = Date;
    Lino2.AccKy = AccKy;
    Lino2.Amount = Amt;
    Lino2.ChqNu = ChqNo;
    Lino2.AccTrnKy = FormGlblData.AcctrnKy2;
    Lino2.PmtDet = FormGlblData.PmtDet2;
    Lino2.OurCode = viewBag.OurCd

    if (FormGlblData.TrnKy <= 1) {
        $.ajax({
            url: urlInserRec,
            dataType: "json",
            type: "POST",
            data: JSON.stringify({
                Lino1: JSON.stringify(Lino1),
                Lino2: JSON.stringify(Lino2),
                ObjKy: viewBag.ObjKy,
                isUpdate: 1,
                trntypKy: FormGlblData.TrnTypKy,

            }),
            contentType: 'application/json; charset=utf-8',
            success: function(DataObj) {
                if (DataObj.isSave) {
                    alert("Sucessfully Saved");
                    ClearAllField();
                    FormGlblData.TrnKy = DataObj.TrnKy;
                    SelectHdrRecord(DataObj.TrnKy);
                } else {
                    alert("Save Fail Please Try Agin");
                }


            },
            error: function (e) {
                iziToast.error({
                    title: 'Error',
                    message: 'Network Related Issue \n Please try Again',
                });
            }
        });
    } else {

        var result = confirm("Do you want to Update the record?");
        if (result == true) {
            $.ajax({
                url: urlUpdateRec,
                dataType: "json",
                type: "POST",
                data: JSON.stringify({
                    Lino1: JSON.stringify(Lino1),
                    Lino2: JSON.stringify(Lino2),
                    ObjKy: viewBag.ObjKy,
                    isUpdate: 1,
                    TrnKy: FormGlblData.TrnKy,

                }),
                contentType: 'application/json; charset=utf-8',
                success: function (DataObj) {
                    if (DataObj.isSave) {
                        alert("Sucessfully Update");
                        ClearAllField();
                        SelectHdrRecord(DataObj.TrnKy);
                    } else {
                        alert("Save Fail Please Try Agin");
                    }


                },
                error: function (e) {
                    iziToast.error({
                        title: 'Error',
                        message: 'Network Related Issue \n Please try Again',
                    });
                }
                
            });
           
        }
        
    

    }


}


function ClearAllField() {

    $("#HdrSec1_DatFrom_Val").val("");
    $("#HdrSec1_CmbBnk_Cd").data("kendoComboBox").value("");
    $("#HdrSec1_NmricChqNu_Val").data("kendoNumericTextBox").value("");
    $("#HdrSec1_NmricAmt_Val").data("kendoNumericTextBox").value("");
    $("#HdrSec1_CmbAcc_Cd").data("kendoComboBox").value("");
    $("#HdrSec1_CmbBnk_Nm").data("kendoComboBox").value("");
    $("#HdrSec1_CmbAcc_Nm").data("kendoComboBox").value("");
    document.getElementById("HdrSec1_BU_Val").value = "";
    document.getElementById("HdrSec1_BU_Val").readOnly = true;
    document.getElementById("HdrSec1_Prj_Val").value = "";
    document.getElementById("HdrSec1_Prj_Val").readOnly = true;
    var todayDate = new Date();
    $("#HdrSec1_DatFrom_Val").data("kendoDatePicker").value(todayDate);
    $("#HdrSec1_InpTrnNo_Val").val("");
    
}

function ClearAl() {
    FormGlblData.TrnKy = 1;
    FormGlblData.TimeStamp = "";
    FormGlblData.AcctrnKy1 = 1;
    FormGlblData.AcctrnKy2 = 1;
    FormGlblData.PmtDet1 =1;
    FormGlblData.PmtDet2 = 1;
    ClearAllField();
}

function SelectHdrRecord(trnKy) {

    $.ajax({
        url: urlSelectTrnDetail,
        dataType: "json",
        type: "POST",
        data: JSON.stringify({
            trnKy: trnKy,
            ObjKy: viewBag.ObjKy,
        }),
        contentType: 'application/json; charset=utf-8',
        success: function (DataObj) {
            if (DataObj.length >= 1) {
                $("#HdrSec1_InpTrnNo_Val").val(DataObj[0].TrnNo);
                $("#HdrSec1_DatFrom_Val").val(DataObj[0].Date);
                $("#HdrSec1_CmbBnk_Cd").data("kendoComboBox").value(DataObj[1].AccKy);
                $("#HdrSec1_CmbBnk_Nm").data("kendoComboBox").value(DataObj[1].AccKy);
                $("#HdrSec1_NmricChqNu_Val").data("kendoNumericTextBox").value(DataObj[1].ChqNu);
                $("#HdrSec1_NmricAmt_Val").data("kendoNumericTextBox").value(DataObj[1].Amount);
                $("#HdrSec1_CmbAcc_Cd").data("kendoComboBox").value(DataObj[2].AccKy);
                $("#HdrSec1_CmbAcc_Nm").data("kendoComboBox").value(DataObj[2].AccKy);
                document.getElementById("HdrSec1_BU_Val").value = "";
                document.getElementById("HdrSec1_BU_Val").readOnly = true;
                document.getElementById("HdrSec1_Prj_Val").value = "";
                document.getElementById("HdrSec1_Prj_Val").readOnly = true;
                FormGlblData.TimeStamp = DataObj[0].TimeStamp;
                FormGlblData.AcctrnKy1 = DataObj[1].AccTrnKy;
                FormGlblData.AcctrnKy2 = DataObj[2].AccTrnKy;
                FormGlblData.PmtDet1 = DataObj[1].PmtDet;
                FormGlblData.PmtDet2 = DataObj[2].PmtDet;
               
            }

        }
        ,
        error: function (e) {
            iziToast.error({
                title: 'Error',
                message: 'Network Related Issue \n Please try Again',
            });
        }
    });
    try {
        $("#FindForm").data("kendoWindow").close();
    } catch (e) {

    } 
   
}

$(document.body).keydown(function (e) {

        if (e.ctrlKey && e.keyCode == 70) {

            $("#FindForm")
                .show()
                .kendoWindow({
                    width: "1000px",
                    height: "600px",
                    modal: true,
                    title: "Find Form"
                });

            $("#FindForm").data("kendoWindow").center().open();

        }
    });