
var FormGlblData = {
    FormObjData: null,
    AllDefalutValueObj: null,
    ItmTypKy: 1,
    TrnTypKy: 1,
    AccessLvlKy: 1,
    ConfiLvlKy: 1,
}

$(document).ready(function () {

    GetFormObjData();

})

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

            DocReadyCus();
        }
    });
}

function DocReadyCus() {
   
    LoadCombo();
    BrnSelect(1);
    LoadTimePickers();
    clearDet();
    SetDatepicker();
    
}


function LoadTimePickers() {

    $("#HdrSec1_DtpEftvDt_val").width(200).kendoDatePicker({
        format: "dd/MM/yyyy",
        min: new Date(31, 2, 2009)
    });

    $("#HdrSec2_DtpGvnDt_val").width(200).kendoDatePicker({
        format: "dd/MM/yyyy",
        min: new Date(31, 2, 2009)
    });

}

function SetDatepicker() {
    var todayDate = kendo.toString(kendo.parseDate(new Date()), 'dd/MM/yyyy');
    $("#HdrSec1_DtpEftvDt_val").data("kendoDatePicker").value(todayDate);
    $("#HdrSec2_DtpGvnDt_val").data("kendoDatePicker").value(todayDate);

}
function GetBnkMas_LookupWeb(brn) {
    var dataSource = new kendo.data.DataSource(
      {
          transport: {
              read: {
                  url: urlHRISGetBnkMas_LookupWeb,
                  data: { BnkKy: brn },
                  dataType: "json"
              }
          }
      });
    return dataSource;
}
function BrnSelect(BnkKy) {
    $("#HdrSec4_CmbBrnchNm_Nm").width(200).kendoComboBox({

        dataValueField: "BrnKy",
        dataTextField: "BrnNm",
        dataSource: GetBnkMas_LookupWeb(BnkKy),
        filter: "contains",
        change: function () {
            var validation = ComboValidations("#HdrSec4_CmbBrnchNm");
        },
        suggest: true,
        placeholder: "Select Bank Branch"
    });
}

function LoadCombo() {

    $("#HdrSec4_CmbBnkNm_Nm").width(200).kendoComboBox({
        dataValueField: "BnkKy",
        dataTextField: "BnkNm",
        dataSource: GetBnkMas_LookupWeb(1),
        filter: "contains",

        change: function () {
            var cmb = $("#HdrSec4_CmbBnkNm_Nm").data("kendoComboBox");
            var val = cmb.value();
            if (isNaN(val)) {
                alert("'" + val + "' is not a Valid input");
                cmb.value("");
            }
            else {
                var BnkKy = $("#HdrSec4_CmbBnkNm_Nm").data("kendoComboBox").value();
                BrnSelect(BnkKy);
            }


        },
        suggest: true,
        placeholder: "Select Bank"
    });
   
    $("#HdrSec1_CmbEmpno_cd").width(200).kendoComboBox({

        dataValueField: "EmpKy",
        dataTextField: "EmpNo",

        dataSource: {
            type: "POST",
            transport: {

                read: urlEmpMas.Employee_LookUp_Web

            }
        },
        change: function (e) {
            var cmb = $("#HdrSec1_CmbEmpno_cd").data("kendoComboBox");
            var EmpNo = cmb.value();

            if (EmpNo != "") {
                var validate = ComboValidations("HdrSec1_CmbEmpno_cd");

                if (validate) {
                    $("#HdrSec1_CmbEmpNm_Nm").data("kendoComboBox").value(EmpNo);
                    
                } else {
                    $("#HdrSec1_CmbEmpNm_Nm").data("kendoComboBox").value("");

                }
            }


        },
        filter: "contains",
        suggest: true,
        placeholder: "Select a EmpNo"

    })

    $("#HdrSec1_CmbEmpNm_Nm").width(200).kendoComboBox({

        dataValueField: "EmpKy",
        dataTextField: "EmpNm",

        dataSource: {
            type: "POST",
            transport: {

                read: urlEmpMas.Employee_LookUp_Web

            }
        },
        change: function (e) {
            var cmb = $("#HdrSec1_CmbEmpNm_Nm").data("kendoComboBox");
            var EmpNm = cmb.value();

            if (EmpNm != "") {
                var validate = ComboValidations("HdrSec1_CmbEmpNm_Nm");

                if (validate) {
                    $("#HdrSec1_CmbEmpno_cd").data("kendoComboBox").value(EmpNm);
                   

                } else {
                    $("#HdrSec1_CmbEmpno_cd").data("kendoComboBox").value("");

                }
            }

        },
        filter: "contains",
        suggest: true,
        placeholder: "Select a Emp Name"
    })

    $("#HdrSec1_CmbLnTyp_Nm").width(200).kendoComboBox({

        dataValueField: "CdKy",
        dataTextField: "CdNm",
        dataSource: CdNm_SelectMob_Datasource('HdrSec1_CmbLnTyp'),

        change: function (e) {
            var type = $("#HdrSec1_CmbLnTyp_Nm").data("kendoComboBox").text();

        },

        filter: "contains",
        suggest: true,
        placeholder: "Select LoanType"
    });

    $("#HdrSec3_CmbInrstTpe_Nm").width(200).kendoComboBox({

        dataValueField: "CdKy",
        dataTextField: "CdNm",
        dataSource: CdNm_SelectMob_Datasource('HdrSec3_CmbInrstTpe'),

        change: function (e) {
            var type = $("#HdrSec3_CmbInrstTpe_Nm").data("kendoComboBox").text();
            
        },

        filter: "contains",
        suggest: true,
        placeholder: "Select Interest Type"
    });

    $("#HdrSec2_InptLnAmt_val").width(200).kendoNumericTextBox({

        format: "#",
        decimals: 0,
        spinners: false
    }).value = 0;

    $("#HdrSec2_InptInstAmt_val").width(200).kendoNumericTextBox({

        format: "#",
        decimals: 0,
        spinners: false
    }).value = 0;

    $("#HdrSec2_InptNofInst_val").width(200).kendoNumericTextBox({

        format: "#",
        decimals: 0,
        spinners: false
    }).value = 0;

    $("#HdrSec3_InptInrstRt_val").width(200).kendoNumericTextBox({

        format: "#",
        decimals: 0,
        spinners: false
    }).value = 0;

    $("#HdrSec4_InptAcNo_val").width(200).val("");

    $("#HdrSec3_InptInrstAmt_val").width(200).kendoNumericTextBox({

        format: "#",
        decimals: 0,
        spinners: false
    }).value = 0;

    $("#HdrSec3_InptTotlPay_val").width(200).kendoNumericTextBox({

        format: "#",
        decimals: 0,
        spinners: false
    }).value = 0;
}

function ComboValidations(cmbNm) {
    try {

        var cmb = $("#" + cmbNm + "").data("kendoComboBox");
        var val = cmb.value();

        if (isNaN(val)) {
            alert("'" + val + "' is not a Valid input");
            $("#" + cmbNm + "").data('kendoComboBox').value(null);
            return false;
        } else {
            return true;
        }
    }
    catch (e) { }

}


$("#HdrSec2_InptInstAmt_val").keydown(function (event) {
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode == '13') {
        var loanAmt = $('#HdrSec2_InptLnAmt_val').data("kendoNumericTextBox").value();
        var InstAmt = $('#HdrSec2_InptInstAmt_val').data("kendoNumericTextBox").value();
        if (!InstAmt) {
            InstAmt = document.getElementById("HdrSec2_InptInstAmt_val").value
        }
        var Amt = (loanAmt / InstAmt);
        $("#HdrSec2_InptNofInst_val").data("kendoNumericTextBox").value(Amt);
        event.preventDefault();

    }

});

function clearDet() {

    $("#HdrSec1_CmbEmpno_cd").data("kendoComboBox").value("");
    $("#HdrSec1_CmbEmpNm_Nm").data("kendoComboBox").value("");
    $("#HdrSec1_CmbLnTyp_Nm").data("kendoComboBox").value("");
    $("#HdrSec3_CmbInrstTpe_Nm").data("kendoComboBox").value("");
    $("#HdrSec4_CmbBnkNm_Nm").data("kendoComboBox").value("");
    $("#HdrSec4_CmbBrnchNm_Nm").data("kendoComboBox").value("");
    $("#HdrSec1_DtpEftvDt_val").data("kendoDatePicker").value("");
    $("#HdrSec2_DtpGvnDt_val").data("kendoDatePicker").value("");
    $("#HdrSec2_InptLnAmt_val").data("kendoNumericTextBox").value("");
    $("#HdrSec2_InptInstAmt_val").data("kendoNumericTextBox").value("");
    $("#HdrSec2_InptNofInst_val").data("kendoNumericTextBox").value("");
    $("#HdrSec3_InptInrstRt_val").data("kendoNumericTextBox").value("");
    $("#HdrSec4_InptAcNo_val").val("");
    $("#HdrSec3_InptInrstAmt_val").data("kendoNumericTextBox").value("");
    $("#HdrSec3_InptTotlPay_val").data("kendoNumericTextBox").value("");

}

function Save() {

    var EmpKy = $("#HdrSec1_CmbEmpno_cd").data('kendoComboBox').value();
    if (EmpKy == null || EmpKy == undefined || EmpKy == "" || EmpKy == 1) {
        alert("Select Emp No")
        return;
    }

    var EftvDt = $("#HdrSec1_DtpEftvDt_val").val();
    if (EftvDt == null || EftvDt == undefined || EftvDt == "") {
        alert("Enter Effective Date")
        return;

    }
    var GvnDt = $("#HdrSec2_DtpGvnDt_val").val();
    if (GvnDt == null || GvnDt == undefined || GvnDt == "") {
        alert("Enter Given Date")
        return;
    }
    var LoanType = $("#HdrSec1_CmbLnTyp_Nm").val();
    if (LoanType == null || LoanType == undefined || LoanType == "") {
        alert("Enter Loan Type")
        return;
    }
    var InstAmt = $("#HdrSec2_InptInstAmt_val").val();
    if (InstAmt == null || InstAmt == undefined || InstAmt == "") {
        alert("Enter Inst Amount")
        return;
    }

    var LoanAmount = $("#HdrSec2_InptLnAmt_val").val();
    if (LoanAmount == null || LoanAmount == undefined || LoanAmount == "") {
        alert("Enter Loan Amount")
        return;
    }
    var BnkNm = $("#HdrSec4_CmbBnkNm_Nm").val();
    if (BnkNm == null || BnkNm == undefined || BnkNm == "") {
        alert("Enter Bank Name")
        return;
    }
    var BrnNm = $("#HdrSec4_CmbBrnchNm_Nm").val();
    if (BrnNm == null || BrnNm == undefined || BrnNm == "") {
        alert("Enter Branch Name")
        return;
    }
    var AccNo = $("#HdrSec4_InptAcNo_val").val();
    if (AccNo == null || AccNo == undefined || AccNo == "") {
        alert("Enter Account No")
        return;
    }
    var NoOfInst = $("#HdrSec2_InptNofInst_val").val();
    var TtlPay = $("#HdrSec3_InptTotlPay_val").val();
    var IntrTyp = $("#HdrSec3_CmbInrstTpe_Nm").val();
    if (IntrTyp == null || IntrTyp == undefined || IntrTyp == "") {
        alert("Enter Interest Type")
        return;
    }
    var IntrRate = $("#HdrSec3_InptInrstRt_val").val();
    var IntrAmt = $("#HdrSec3_InptInrstAmt_val").val();

    $.ajax({
        url: urlEmpMasCdDt_InsertWeb,
        data: JSON.stringify({

            EmpKy: EmpKy,
            EftvDt: EftvDt,
            GvnDt: GvnDt,
            LoanType: LoanType,
            InstAmt: InstAmt,
            LoanAmount: LoanAmount,
            BnkNm: BnkNm,
            BrnNm: BrnNm,
            AccNo: AccNo,
            NoOfInst: NoOfInst,
            IntrTyp: IntrTyp,
            TtlPay: TtlPay,
            IntrRate: IntrRate,
            IntrAmt: IntrAmt
        }),
        contentType: 'application/json; charset=utf-8',
        dataType: "Json",
        type: "POST",
        success: function (data) {
            if (data == true) {
                alert("Successfully Saved");
            }
            else { alert("Failed"); }
        },
        error: function (e) {
            alert("Failed");
            return false;
        }
    });
}

$(document.body).keydown(function (e) {
    if (e.ctrlKey && e.keyCode == 70) {
        $("#FindFormLnDet").show().kendoWindow({
            width: "1000px",
            height: "500px",
            modal: true,
            title: "Search Loan Details"
        });
        $('#FindFormLnDet').data('kendoWindow').center().open();
        e.preventDefault();
        FindCall();
    }
});


