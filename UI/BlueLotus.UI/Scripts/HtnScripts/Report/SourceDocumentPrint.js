function PrintCommon(formOrdKy, formObjCaption, formObjKy) {
    var ReptNo = 1;
    var url = "http://" + document.location.host + "/DevBL10/Reports/Shared_Report/ReportFormForSrcDocument.aspx?formObjCaption=" + formObjCaption + "&formObjKy=" + formObjKy + "&ReptNo=" + ReptNo + "&formOrdKy=" + formOrdKy + "";
    window.open(url, '_blank');
}

//ReptNo
function PrintCommonWithReportNo(formOrdKy, formObjCaption, formObjKy, ReptNo) {
    var url = "http://" + document.location.host + "/DevBL10/Reports/Shared_Report/ReportFormForSrcDocument.aspx?formObjCaption=" + formObjCaption + "&formObjKy=" + formObjKy + "&ReptNo=" + ReptNo + "&formOrdKy=" + formOrdKy + "";
    window.open(url, '_blank');
}

function EmailCommon(formOrdKy, formObjCaption, formObjKy, ReptNo) {
    //$.ajax({
    //    url: urlmailsend,
    //    data: JSON.stringify({
    //        formOrdKy: formOrdKy,
    //        formObjCaption: formObjCaption,
    //        formObjKy: formObjKy,
    //        ReptNo: ReptNo
    //    })
    //});
    OPENLodingCommon('Please Wait While We are Sending Email... !');
    $.ajax({
        url: urlmailsend,
        dataType: "json",
        type: "POST",
        data: JSON.stringify({
            formOrdKy: formOrdKy,
            formObjCaption: formObjCaption,
            formObjKy: formObjKy,
            ReptNo: ReptNo
        }),
        contentType: 'application/json; charset=utf-8',
        success: function (data) {
            CLOSELoadingCommon();
            if (data = "success") {
                alert("Report Sent!");
            }
            else {
                alert("EmailReport Fail");
            }
        },
        error: function (e) {
            alert("EmailReport Fail");
            return false;
        }
    });
}

function DirectPrintSourceCommon(formOrdKy, formObjCaption, formObjKy, ReptNo) {
    var url = "http://" + document.location.host + "/DevBL10/EmailReport/PrintReportCommon?formOrdKy=" + formOrdKy + "&formObjCaption=" + formObjCaption + "&formObjKy=" + formObjKy + "&ReptNo=" + ReptNo;
    window.open(url, '_blank');
}


//ReptNo
function TestTeleric() {
    var url = "http://" + document.location.host + "/DevBL10/Reports/TelericReport/TelericReport.aspx";
    window.open(url, '_blank');
}

function PrintTelericCommon(formOrdKy, formObjCaption, formObjKy) {
    var ReptNo = 1;
    var url = "http://" + document.location.host + "/DevBL10/Reports/TelericReport/TelerikSourceDocPtrint.aspx?formObjCaption=" + formObjCaption + "&formObjKy=" + formObjKy + "&ReptNo=" + ReptNo + "&formOrdKy=" + formOrdKy + "";
    window.open(url, '_blank');
}
