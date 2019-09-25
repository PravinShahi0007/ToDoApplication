function ClearDetailLevel() {
    $("#HdrSec3_CmbAcc_Cd").data("kendoComboBox").value("");
    $("#HdrSec3_CmbAcc_Nm").data("kendoComboBox").value("");
    $("#HdrSec3_CmbAdr_Cd").data("kendoComboBox").value("");
    $("#HdrSec3_CmbAdr_Nm").data("kendoComboBox").value("");
    $("#HdrSec3_CmbBU_Cd").data("kendoComboBox").value("");
    $("#HdrSec3_CmbBU_Nm").data("kendoComboBox").value("");
    $("#HdrSec3_CmbPrj_Cd").data("kendoComboBox").value("");
    $("#HdrSec3_CmbPrj_Nm").data("kendoComboBox").value("");
    $("#HdrSec3_CmbTsk_Cd").data("kendoComboBox").value("");
    $("#HdrSec3_CmbTsk_Nm").data("kendoComboBox").value("");
    $("#HdrSec4_CmbPayMode_Cd").data("kendoComboBox").value("");
    $("#HdrSec4_InptChqNO_Val").data("kendoNumericTextBox").value("");
    $("#HdrSec4_DatChqDate_Val").data("kendoDatePicker").value("");
    $("#HdrSec4_CmbLoan_Cd").data("kendoComboBox").value("");
    $("#HdrSec5_NmricAmt_Val").data("kendoNumericTextBox").value("");
    $("#HdrSec4_CmbLoan_Cd").data("kendoComboBox").value("");
    $("#HdrSec4_CmbLC_Cd").data("kendoComboBox").value("");
    $("#HdrSec5_NmricAmt_Val").data("kendoNumericTextBox").value("");
    $("#HdrSec5_CmbBank_Cd").data("kendoComboBox").value("");
    $("#HdrSec5_CmbBranch_Cd").data("kendoComboBox").value("");
    $("#HdrSec5_CmbOrder_Cd").data("kendoComboBox").value("");
    $("#HdrSec5_CmbResAdr_Cd").data("kendoComboBox").value("");
    $("#HdrSec6_CmbCurCode_cd").data("kendoComboBox").value("");
    document.getElementById("HdrSec6_InptCurExRate_Val").value = "1.0000";
    $("#HdrSec6_DatMADate_Val").data("kendoDatePicker").value("");
    $("#HdrSec6_CmbOrderDet_Cd").data("kendoComboBox").value("");
    $("#HdrSec8_TxtArea_Des_Val").val("");
    document.getElementById("TempLinumbr").value = "";
    $("#HdrSec7_CmbAnl1_Cd").data("kendoComboBox").value("");
    $("#HdrSec7_CmbAnl1_Nm").data("kendoComboBox").value("");
    $("#HdrSec7_CmbAnl2_Cd").data("kendoComboBox").value("");
    $("#HdrSec7_CmbAnl2_Nm").data("kendoComboBox").value("");
    $("#HdrSec7_CmbAnl3_Cd").data("kendoComboBox").value("");
    $("#HdrSec7_CmbAnl3_Nm").data("kendoComboBox").value("");
    $("#HdrSec7_CmbAnl4_Cd").data("kendoComboBox").value("");
    $("#HdrSec7_CmbAnl4_Nm").data("kendoComboBox").value("");
    $("#HdrSec7_CmbAnl5_Cd").data("kendoComboBox").value("");
    $("#HdrSec7_CmbAnl5_Nm").data("kendoComboBox").value("");
    $("#HdrSec7_CmbAnl6_Cd").data("kendoComboBox").value("");
    $("#HdrSec7_CmbAnl6_Nm").data("kendoComboBox").value("");
    $("#HdrSec9_Chkbox_Nagotiable_Val").prop("checked", false);
    $("#HdrSec9_Chkbox_isAccPaye_Val").prop("checked", false);
    $("#HdrSec9_ChkboxisCash_Val").prop("checked", false);
    $("#HdrSec9_Chkbox_isCross_Val").prop("checked", false);
    $("#HdrSec9_Chkbox_isStamp_Val").prop("checked", false);
    $("#HdrSec3_InptPayee_Val").val("");
    $("#HdrSec4_InptDtlUrRef_Val").val("");
    $("#HdrSec6_InptDtlDocNo_Val").val("");
    document.getElementById("HdrSec4_InptChqNO_Val").readOnly = false;

    try {
        LockValidation();

    } catch (e) {
        console.log("Error ")

    }
}

function LockValidation() {
    var GridRecord = $("#PmtRcprGrd").data("kendoGrid").dataSource.data();
    if (GridRecord.length > 0) {
        var ChqNo = GridRecord[0].ChqNo;
        if (ChqNo && ChqNo.length > 0) {
            LockColumn(true);
        } else {
            LockColumn(false);

        }

    }

}

function LockColumn(IsLock) {
    if (IsLock) {
        document.getElementById("HdrSec4_InptChqNO_Val").readOnly = true;
        $('#HdrSec4_DatChqDate_Val').data('kendoDatePicker').enable(false);
        $("#HdrSec9_ChkboxisCash_Val").attr("disabled", true);
        $("#HdrSec9_Chkbox_isStamp_Val").attr("disabled", true);
        $("#HdrSec9_Chkbox_isAccPaye_Val").attr("disabled", true);
        $("#HdrSec9_Chkbox_isCross_Val").attr("disabled", true);
        $("#HdrSec9_Chkbox_Nagotiable_Val").attr("disabled", true);
        document.getElementById("HdrSec3_InptPayee_Val").readOnly = true;

        
    } else {
        document.getElementById("HdrSec4_InptChqNO_Val").readOnly = false;
        $('#HdrSec4_DatChqDate_Val').data('kendoDatePicker').enable(true);
        $("#HdrSec9_ChkboxisCash_Val").attr("disabled", false);
        $("#HdrSec9_Chkbox_isStamp_Val").attr("disabled", false);
        $("#HdrSec9_Chkbox_isAccPaye_Val").attr("disabled", false);
        $("#HdrSec9_Chkbox_isCross_Val").attr("disabled", false);
        $("#HdrSec9_Chkbox_Nagotiable_Val").attr("disabled", false);
        document.getElementById("HdrSec3_InptPayee_Val").readOnly = false;

    }
}
function ClearHiddenDetail() {
    FirstinsetDetail.PrjKey = 1;
    FirstinsetDetail.BUKey = 1;
    FirstinsetDetail.AccountKey = 1;
    FirstinsetDetail.LineNo = 1;
}


$("#HdrSec1_Chkbox_multi_Val").change(function() {
    var result = confirm("You may lose unsaved records.DO you want to continue");
    if (result) {
        $("#PmtRcprGrd").data("kendoGrid").dataSource.data([]);
        ClearHiddenDetail();
        ClearDetailLevel();
        ChangeSpan();
        LoadAccounts();
    }


});

function clearHeader() {
    document.getElementById("HdrSec1_InptVouNo_Val").value = "";
    document.getElementById("HdrSec1_InptDocNo_Val").value = "";
    $("#HdrSec1_CmbTrnCurrncy_Cd").data("kendoComboBox").value("");
    var todayDate = new Date();
    $("#HdrSec1_DatVouDate_Val").data("kendoDatePicker").value(todayDate);
    $("#HdrSec1_DatVouRefDate_Val").data("kendoDatePicker").value(todayDate);
    document.getElementById("HdrSec1_Chkbox_IsRec_Val").checked = false;
    document.getElementById("HdrSec1_Chkbox_multi_Val").checked = false;
    document.getElementById("HdrSec1_InptYurRef_Val").value = "";
    document.getElementById("HdrSec1_InptTrnExRate_Val").value = "1.000";
    document.getElementById("TempLinumbr").value = "";
    document.getElementById("TrnKy").value = "";
    document.getElementById("TimeStamp").value = "";
    $("#HdrSec2_InptTotAmt_Val").data("kendoNumericTextBox").value("");
    $("#HdrSec2_InptEmpImagePreview_Val").empty();
    $("#ButtonSec1_Print").prop("disabled", false);
    document.getElementById("mdul_Lbl_ObjCptn").innerHTML = "( Open )";
}

function ClearGridDetail() {
    try {
        var grid = $("#PmtRcprGrd").data("kendoGrid");
        grid.dataSource.data([]);

    } catch (e) {

    }

}


function clearfunction() {
    clearHeader();
    ClearGridDetail();
    ClearDetailLevel();
    ClearHiddenDetail();
    ChangeSpan();
    LoadAccounts();
    Clear_AllDefalutValue_Obj();
    SetFirstFocusObj();
    $("#HdrSec4_CmbPayMode_Cd").data("kendoComboBox").enable();

}

$(document.body)
    .keydown(function(e) {
        if (e.ctrlKey && e.keyCode == 70) {
            $("#FindFormPayment")
                .show()
                .kendoWindow({
                    width: "1000px",
                    height: "600px",
                    modal: true,
                    title: "Find Form"
                });

            $("#FindFormPayment").data("kendoWindow").center().open();

        }
    });


function ChangeSpan() {

    var MultiCredit;
    if ($("#HdrSec1_Chkbox_multi_Val").is(":checked")) {
        MultiCredit = 1;

    } else {
        MultiCredit = 0;

    }
    if ((viewBag.OurCd == "PMT2.0" && MultiCredit == 0 && FirstinsetDetail.LineNo === 1) ||
        (viewBag.OurCd == "PMT2.0" && MultiCredit == 1 && FirstinsetDetail.LineNo >= 2)) {
        document.getElementById("HdrSec3_CmbAcc_Lbl").innerHTML = "Credit From";
    } else if ((viewBag.OurCd == "PMT2.0" && MultiCredit == 1 && FirstinsetDetail.LineNo === 1) ||
        (viewBag.OurCd == "PMT2.0" && MultiCredit == 0 && FirstinsetDetail.LineNo >= 2)) {
        document.getElementById("HdrSec3_CmbAcc_Lbl").innerHTML = "Debit To";
    }
}


$("#HdrSec9_Chkbox_isAccPaye_Val").change(function() {
    var isAccPaye;
    if ($("#HdrSec9_Chkbox_isAccPaye_Val").is(":checked")) {
        isAccPaye = 1;
    } else {
        isAccPaye = 0;
    }
    if (isAccPaye == 1) {
        $("#HdrSec9_ChkboxisCash_Val").prop("checked", false);
    }

});

$("#HdrSec9_ChkboxisCash_Val").change(function() {
    var isCash_Val;
    if ($("#HdrSec9_ChkboxisCash_Val").is(":checked")) {
        isCash_Val = 1;
    } else {
        isCash_Val = 0;
    }
    if (isCash_Val == 1) {
        $("#HdrSec9_Chkbox_isAccPaye_Val").prop("checked", false);
        $("#HdrSec9_Chkbox_isCross_Val").prop("checked", false);
        $('#HdrSec3_InptPayee_Val').val('Cash');
    } else {
        var Val = $('#HdrSec3_InptPayee_Val').val();
        if (Val == 'Cash') {
            $('#HdrSec3_InptPayee_Val').val("");
        }
    }
    var NonNegoChq = 0;
    if ($("#HdrSec9_Chkbox_Nagotiable_Val").is(":checked")) {
        NonNegoChq = 1;
    }
    if (NonNegoChq == 1) {
        $("#HdrSec9_Chkbox_Nagotiable_Val").prop("checked", false);
    }

});

$("#HdrSec9_Chkbox_Nagotiable_Val").change(function() {
    if ($(this).is(":checked")) {
        $("#HdrSec9_ChkboxisCash_Val").prop("checked", false);
    }
});
$("#HdrSec9_Chkbox_isCross_Val").change(function() {
    if ($(this).is(":checked")) {
        $("#HdrSec9_ChkboxisCash_Val").prop("checked", false);
    }
});
var img = document.getElementById("HdrSec2_InptEmpImagePreview_Val");
img.onclick = function() {

    // Get the modal
    var modal = document.getElementById("myModal");
    var ImgSrc = $("#HdrSec2_InptEmpImagePreview_Val img").attr("src");
    var modalImg = document.getElementById("img01");
    var captionText = document.getElementById("caption");
    modal.style.display = "block";
    modalImg.src = ImgSrc;
};