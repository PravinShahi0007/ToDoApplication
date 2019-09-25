function SaveUpdate(action) {
    if (action == "save" || action == "saveandnew") {
        var TrnKy = document.getElementById("TrnKy").value;
        if (TrnKy > 0) {
            var result = confirm("Do you want to Update the record?");
            if (result == true) {
                OPENLodingCommon("Updating ... !");
                UpdatePaymentHedder();
            }

        } else {
            OPENLodingCommon("Saving ... !");
            InsertImgtoServer(action);
            //  SaveHedder(action);
        }

    } else if (action == "Update") {
        var TrnKy = document.getElementById("TrnKy").value;

        if (TrnKy) {
            OPENLodingCommon("Updating ... !");
            UpdatePaymentHedder();
        } else {

            alert("Plase Selelect a Transaction First");
        }

    }

}

function InsertImgtoServer(action) {
    var TrnImgFileNm = $("#HdrSec3_InpfilesImg_Val").val();
    var TrnImgFileNm_Old = $("#HdrSec3_InpfilesImgOld").val();
    if (typeof FormData == "undefined") {
        var data = [];
        var opmlFile = document.getElementById("HdrSec3_InpfilesImg_Val").files[0];
        data.push("opmlFile", document.getElementById("HdrSec3_InpfilesImgOld").files[0]);
    } else {
        var data = new FormData();
        var opmlFile = document.getElementById("HdrSec3_InpfilesImg_Val").files[0];
        data.append("opmlFile", document.getElementById("HdrSec3_InpfilesImg_Val").files[0]);

        $.ajax({
            type: "POST",
            url: InsertFileswithpath,
            data: data,
            dataType: "html",
            contentType: false,
            processData: false,
            enctype: "multipart/form-data",
            success: function(result) {
                var res1 = result.replace('\"', "");
                var res = res1.replace('\"', "");
                SaveHedder(action, res);

                //if (res != "false") {
                //    alert("Image Uploading Fail Please try Again");
                //    CLOSELoadingCommon();
                //}
                //else {
                //}
            }
        });
    }
}

function SaveHedder(action, ImageName) {

    var DatVouDate = document.getElementById("HdrSec1_DatVouDate_Val").value;
    var InptDocNo = document.getElementById("HdrSec1_InptDocNo_Val").value;
    var InptYurRef = document.getElementById("HdrSec1_InptYurRef_Val").value;
    var cmbTrnCrnKy = $("#HdrSec1_CmbTrnCurrncy_Cd").data("kendoComboBox").value();
    if (!cmbTrnCrnKy || cmbTrnCrnKy == "") {
        cmbTrnCrnKy = 1;
    }
    var DatVouRefDate = document.getElementById("HdrSec1_DatVouRefDate_Val").value;
    var ExRateHrd = document.getElementById("HdrSec1_InptTrnExRate_Val").value;
    var PrjKy = FirstinsetDetail.PrjKey;
    var Buky = FirstinsetDetail.BUKey;

    var IsRec_Val = 0;
    if ($("#HdrSec1_Chkbox_IsRec_Val").is(":checked")) {
        IsRec_Val = 1;
    } else {
        IsRec_Val = 0;
    }
    var grid = $("#PmtRcprGrd").data("kendoGrid");
    var dataSource = grid.dataSource;
    //records on current view / page   
    var recordsOnCurrentView = dataSource.view().length;
    //total records
    var totalRecords = dataSource.total();

    //if (HdrSec1_InptDocNo_Val) {
    if (totalRecords >= 2) {
        $.ajax({
            url: urlSaveHdr,
            data: JSON.stringify({
                VouDate: DatVouDate,
                DocNo: InptDocNo,
                UrRef: InptYurRef,
                cmbCrnKy: cmbTrnCrnKy,
                Yourref_Date: DatVouRefDate,
                ExRateHrd: ExRateHrd,
                PrjKy: PrjKy,
                BUKy: Buky,
                OurCd: viewBag.OurCd,
                IsRec: IsRec_Val,
                ImageName: ImageName

            }),
            contentType: "application/json; charset=utf-8",
            dataType: "Json",
            type: "POST",
            success: function(data) {
                var trnKy = data[0].TrnKy;
                var AccLevlKy = data[0].AccLevlKy;
                var ConFinKy = data[0].ConFinKy;
                InsertGrid(trnKy, DatVouDate, action, AccLevlKy, ConFinKy, cmbTrnCrnKy);
            },
            error: function(e) {
                return false;
            }
        });
    } else {
        alert("Please Enter minimum of two reords");
    }
    //} else {
    //    alert("Please Enter a Document Number");
    //}
}

function InsertGrid(trnKy, DatVouDate, action, AccLevlKy, ConFinKy, cmbTrnCrnKy) {
    var grid = $("#PmtRcprGrd").data("kendoGrid");
    var currentData = grid.dataSource.data();
    var updatedRecords = [];
    var newRecords = [];
    var MultiCredit;
    if ($("#HdrSec1_Chkbox_multi_Val").is(":checked")) {
        MultiCredit = 1;
    } else {
        MultiCredit = 0;
    }
    var IsRec_Val = 0;
    if ($("#HdrSec1_Chkbox_IsRec_Val").is(":checked")) {
        IsRec_Val = 1;
    } else {
        IsRec_Val = 0;
    }
    for (var i = 0; i < currentData.length; i++) {
        if (currentData[i].isNew()) {
            //this record is new
            newRecords.push(currentData[i].toJSON());
        } else if (true) {
            updatedRecords.push(currentData[i].toJSON());
        }
    }
    var IsStampDuty;
    if ($("#HdrSec6_Chkbox_isStamp_Val").is(":checked")) {
        IsStampDuty = 1;
    } else {
        IsStampDuty = 0;
    }
    var ExrateHdr = $("#HdrSec1_InptTrnExRate_Val").data("kendoNumericTextBox").value();

    $.ajax({
        url: urlInsertInsertDetail,
        data: JSON.stringify({
            trnKy: trnKy,
            VouDate: DatVouDate,
            NewGridDetail: kendo.stringify(newRecords),
            UpdatedGridDetail: kendo.stringify(updatedRecords),
            OurCd: viewBag.OurCd,
            MultiCredit: MultiCredit,
            IsRec: IsRec_Val,
            AccLevlKy: AccLevlKy,
            ConFinKy: ConFinKy,
            cmbCrnKy: cmbTrnCrnKy,
            IsStampDuty: IsStampDuty,
            ObjKy: viewBag.ObjKy,
            ExRateHrd: ExrateHdr,
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "Json",
        type: "POST",
        success: function(data) {
            if (data) {
              
                if (action == "save" || action == "saveandnew") {
                    CLOSELoadingCommon();
                    alert("Save Successfully");
                    clearfunction();

                    if (action == "save") {
                        FormGlblData.TrnKy = trnKy;
                        SetTrnHdrApr_LatestState(trnKy, FormGlblData.TrnTypKy, 'TrnHdr');
                        $("#TrnKy").val(trnKy);
                        FirstinsetDetail.LineNo = 2;
                        LoadAccounts();
                        GetpaymentHdrDetail(trnKy);
                        CdmsIsCd13();

                    }

                } else if (action == "Update") {
                    FormGlblData.TrnKy = trnKy;
                    $("#TrnKy").val(trnKy);
                    CLOSELoadingCommon();
                    alert("Update Successfully");
                    clearfunction();
                    SetTrnHdrApr_LatestState(trnKy, FormGlblData.TrnTypKy, 'TrnHdr');
                    GetpaymentHdrDetail(trnKy);
                    OpenFormByObjNm("ObjNm");
                    CdmsIsCd13();
                }
            } else {
                CLOSELoadingCommon();
                alert("Please Try Again");

            }

        },
        error: function(e) {
            return false;
        }
    });
}

function UpdatePaymentHedder() {

    var HdrSec1_InptVouNo_Val = document.getElementById("HdrSec1_InptVouNo_Val").value;
    var HdrSec1_DatVouDate_Val = document.getElementById("HdrSec1_DatVouDate_Val").value;
    var HdrSec1_InptDocNo_Val = document.getElementById("HdrSec1_InptDocNo_Val").value;
    var HdrSec2_InptYrref_Val = document.getElementById("HdrSec1_InptYurRef_Val").value;
    var HdrSec1_Chkbox_IsRec = document.getElementById("HdrSec1_Chkbox_IsRec").value;
    if (HdrSec1_Chkbox_IsRec == "" || !HdrSec1_Chkbox_IsRec) {
        HdrSec1_Chkbox_IsRec = 0;
    }
    var TrnKy = document.getElementById("TrnKy").value;
    var TimeStmp = document.getElementById("TimeStamp").value;
    var cmbCrnKy = $("#HdrSec1_CmbTrnCurrncy_Cd").data("kendoComboBox").value();
    if (!cmbCrnKy || cmbCrnKy == "") {
        cmbCrnKy = 1;
    }
    var HdrSec2_DatYrRefDate_Val = document.getElementById("HdrSec1_DatVouRefDate_Val").value;
    var HdrSec2_InptExRate_Val = document.getElementById("HdrSec1_InptTrnExRate_Val").value;
    var PrjKy = FirstinsetDetail.PrjKey;
    var Buky = FirstinsetDetail.BUKey;

    $.ajax({
        url: urlUpdateHdr,
        data: JSON.stringify({
            TrnKy: TrnKy,
            isRecur:HdrSec1_Chkbox_IsRec,
            VouDate: HdrSec1_DatVouDate_Val,
            DocNo: HdrSec1_InptDocNo_Val,
            UrRef: HdrSec2_InptYrref_Val,
            cmbCrnKy: cmbCrnKy,
            Yourref_Date: HdrSec2_DatYrRefDate_Val,
            ExRateHrd: HdrSec2_InptExRate_Val,
            PrjKy: PrjKy,
            BUKy: Buky,
            OurCd: viewBag.OurCd,
            VauNo: HdrSec1_InptVouNo_Val,
            TimeStamp: TimeStmp,
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "Json",
        type: "POST",
        success: function(data) {
            var trnKy = data;
            InsertGrid(trnKy, HdrSec1_DatVouDate_Val, "Update", "1", "1", cmbCrnKy);
            //InsertGrid(trnKy, HdrSec1_DatVouDate_Val, "Update");
        },
        error: function(e) {
            return false;
        }
    });

}

function CdmsIsCd13() {
    var OurCode = viewBag.OurCd;
    var TrnTyp = "TrnTyp";
    $.ajax({
        url: urlIsCd13Chek,
        data: JSON.stringify({
            OurCode: OurCode,
            TrnTyp: TrnTyp,
            objKy: viewBag.ObjKy
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "Json",
        type: "POST",
        success: function(data) {
            console.log(data);
            if (data == true) {
                //OpenFormByObjNm("Set-offs");
                LoadSetOffForm("Set-offs");
            } else {
                return false;
            }
        },
        error: function(e) {
            return false;
        }
    });
}

function LoadSetOffForm(ObjNm) {

    $.ajax({
        url: urlAutoCompleteGoToMenu,
        data: JSON.stringify({
            SearchQuery: $("#AutoCompleteGoToMenu").val(),
            ColNm: "ObjNm"

        }),
        contentType: "application/json; charset=utf-8",
        dataType: "Json",
        type: "POST",
        success: function (data) {
            for (var i = 0; i < data.length; i++) {
                if (data[i].ObjCaptn == ObjNm) { //'Set-offs'
                    OpenMenuByItem(data[i], 0, 1);
                }
            }

        },
        error: function (e) {
            return false;
        }
    });

}
//