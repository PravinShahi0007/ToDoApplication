
var currentTrnKy = 1;
var nxtAprStsKy = 1;
var CurrentAprStsKy = 1;
var CurrentAprStsNm = "";

//LoadNextStateDropDown();
Start_MultiApproval();
function AprStsNm_SelectWeb() {
    var dataSource = new kendo.data.DataSource(
        {
            transport: {
                read: {
                    url: urlCommon.AprStsNm_SelectWeb,
                    data: {
                        ObjKy: viewBag.ObjKy,
                        CurAprStsKy: CurrentAprStsKy,
                        TrnKy: currentTrnKy
                    },
                    dataType: "json"
                }
            }
        });
    return dataSource;
}

function SetTrnHdrApr_LatestState(TrnKy, TrnTypKy, TblNm) {
    currentTrnKy = TrnKy;
    $.ajax({
        url: urlCommon.TrnHdrApr_LatestState,
        dataType: "json",
        type: "POST",
        data: JSON.stringify({
            ObjKy: viewBag.ObjKy,
            TrnKy: TrnKy,
            TblNm: TblNm
        }),
        contentType: 'application/json; charset=utf-8',
        success: function (data) {
            for (var i = 0; i < data.length; i++) {
                document.getElementById('mdul_Lbl_ObjCptn').innerHTML = "( " + data[i].AprNm + " )";
                document.getElementById('mdul_Lbl_ObjCptnMobile').innerHTML = "( " + data[i].AprNm + " )";
                //$("#cmbNxtStatesActions").data('kendoDropDownList').value(data[i].AprStsKy);
                $("#cmbNxtStatesActions").data('kendoDropDownList').value(null);
                CurrentAprStsKy = data[i].AprStsKy;
                LoadNextStateDropDown();
                SetTrnHdrApr_NextState(data[i].AprStsKy, TrnKy);

            }
        }
    });
}

function SetTrnHdrApr_NextState(AprStsKy, TrnKy) {
    $.ajax({
        url: urlCommon.TrnHdrApr_NextState, // old sp (TrnHdrApr_NextState) now New SP (IsAlwTrnUpdateApr_SelectWeb)
        dataType: "json",
        type: "POST",
        data: JSON.stringify({
            ObjKy: viewBag.ObjKy,
            CurntAprStsKy: AprStsKy,
            TrnTypKy: TrnKy // in old sp we used Trntyp. now using TrnKy
        }),
        contentType: 'application/json; charset=utf-8',
        success: function (data) {
            nxtAprStsKy = 1;
            for (var i = 0; i < data.length; i++) {
                if (data[i].AprNm == null || data[i].AprNm == "" || data[i].AprNm == undefined) { $("#btnNxtStatesAction").hide(); }
                else { $("#btnNxtStatesAction").show(); }

                document.getElementById('btnNxtStatesAction').innerHTML = "( " + data[i].AprNm + " )";
                nxtAprStsKy = data[i].NxtAprStsKy;
                FormGlblData.AprStsLock = data[i].isAlwUpdate;
                FormGlblData.AprStsLockMsg = data[i].Msg;
            }
        }
    });
}

function NxtStatesAction(TblNm) {

    try {
        $("#MultiAprComments").show().kendoWindow({
            width: "450px",
            height: "350px",
            modal: true,
            title: "Multi-Approval Process"
        });
        $("#MultiAprComments").data("kendoWindow").center().open();
        $("#MultiAprComment_Val").val("");
    } catch (e) {

        if (nxtAprStsKy > 10 && currentTrnKy > 10)
            SetTrnHdrApr_InsertWeb(currentTrnKy, nxtAprStsKy, 1, 1, TblNm)
        else {
            alert("Select The Transction.");
        }

    }

    //if (nxtAprStsKy > 10 && currentTrnKy > 10)
    //    SetTrnHdrApr_InsertWeb(currentTrnKy, nxtAprStsKy, 1, 1, TblNm)
    //else {
    //    alert("Select The Transction.");
    //}
}

function MultiAprInsertWithComments() {
    if (nxtAprStsKy > 10 && currentTrnKy > 10)
        SetTrnHdrApr_InsertWeb(currentTrnKy, nxtAprStsKy, 1, 1, FormGlblData.TblNm)
    else {
        alert("Select The Transction.");
    }
    $('#MultiAprComments').data('kendoWindow').close();
}

function cmbNxtStatesActionsChangedEvent(AprStsKy) {
    if (nxtAprStsKy > 10 && AprStsKy > 10)
        SetTrnHdrApr_InsertWeb(currentTrnKy, AprStsKy, 1, 1);
    else {
        alert("Select The Transction.");
        $("#cmbNxtStatesActions").data('kendoDropDownList').value(null);
    }
}


//function CheckAprStsReadOnly(TrnKy)
//{
//    $.ajax({
//        url: urlCommon.IsAlwTrnUpdateApr_SelectWeb,
//        dataType: "json",
//        type: "POST",
//        data: JSON.stringify({
//            ObjKy: viewBag.ObjKy,
//            AprStsKy: CurrentAprStsKy,
//            TrnKy: TrnKy
//        }),
//        contentType: 'application/json; charset=utf-8',
//        success: function (data) {
//            if (data[0].isAlwUpdate == 0)
//            {
//                SetReadOnlyAttr(1);
//            } 
//        }
//    });
//}

function SetTrnHdrApr_InsertWeb(TrnKy, AprStsKy, AprResnKy, AprPrtyKy, TblNm) {
    //int ObjKy, int TrnKy, int AprStsKy, int AprResnKy, int AprPrtyKy
    $.ajax({
        url: urlCommon.TrnHdrApr_InsertWeb,
        dataType: "json",
        type: "POST",
        data: JSON.stringify({
            ObjKy: viewBag.ObjKy,
            TrnKy: TrnKy,
            AprStsKy: AprStsKy,
            AprResnKy: AprResnKy,
            AprPrtyKy: AprPrtyKy,
            TblNm: TblNm
        }),
        contentType: 'application/json; charset=utf-8',
        success: function (data) {
            for (var i = 0; i < data.length; i++) {
                if (CurrentAprStsNm != "" && CurrentAprStsNm != null && CurrentAprStsNm!=undefined)
                    alert("You Just " + CurrentAprStsNm);
                else
                    alert("Multi-Approval Done");

                document.getElementById('mdul_Lbl_ObjCptn').innerHTML = "( " + CurrentAprStsNm + " )";
                document.getElementById('mdul_Lbl_ObjCptnMobile').innerHTML = "( " + CurrentAprStsNm + " )";
                FormGlblData.AprStsLock = data[0].isAlwUpdate;
                FormGlblData.AprStsLockMsg = data[0].Msg;
                if (FormGlblData.AprStsLock == 0) {
                    SetReadOnlyAttr(1);
                    if (FormGlblData.AprStsLockMsg != "" && FormGlblData.AprStsLockMsg != null && FormGlblData.AprStsLockMsg != undefined)
                        alert(FormGlblData.AprStsLockMsg);
                }
                else {
                    SetReadOnlyAttr(0);
                }
            }
        }
    });
}

function LoadNextStateDropDown() {
    $("#cmbNxtStatesActions").kendoDropDownList({
        dataTextField: "CdNm",
        dataValueField: "CdKy",
        dataSource: AprStsNm_SelectWeb(),
        change: function (e) {
            var cmb = $("#cmbNxtStatesActions").data("kendoDropDownList");
            var AprStsKy = cmb.value();
            var AprStsNm = cmb.text();
            if (AprStsKy != "") {
                //cmbNxtStatesActionsChangedEvent(AprStsKy);
                $("#btnNxtStatesAction").show();
                document.getElementById('btnNxtStatesAction').innerHTML = "( " + AprStsNm + " )";
                CurrentAprStsNm = AprStsNm;
                nxtAprStsKy = AprStsKy
            }
        },
        height: 'auto'
    });
}


//$(".cmbNxtStatesActions").on('mouseover', function () {
//    $('#cmbNxtStatesActions').data("kendoDropDownList").open();
//})

$("#cmbNxtStatesActions").prev("span.k-state-default").on('mouseover', function () {
    $('#cmbNxtStatesActions').data("kendoDropDownList").open();
})

$("#cmbNxtStatesActions-list").on('mouseover', function () {
    $('#cmbNxtStatesActions').data("kendoDropDownList").open();
})

$("#cmbNxtStatesActions-list").on('mouseleave', function () {
    $('#cmbNxtStatesActions').data("kendoDropDownList").close();
})

//$("#cmbNxtStatesActions").prev("span.k-state-default")
//    .css("background-color", "white")
//    .css("background-image", "none");

function Start_MultiApproval() {
    document.getElementById('mdul_Lbl_ObjCptn').innerHTML = "( Open )";
    document.getElementById('mdul_Lbl_ObjCptnMobile').innerHTML = "( Open )";
    $("#btnNxtStatesAction").hide();

    $("#cmbNxtStatesActions").kendoDropDownList({});
    $("#cmbNxtStatesActions").data("kendoDropDownList").list.width(150);

}
