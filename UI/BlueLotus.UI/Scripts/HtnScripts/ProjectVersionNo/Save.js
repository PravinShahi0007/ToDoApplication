function SaveUpdate(action) {
    var datepicker = $("#HdrSec2_DatVouDate_Val").data("kendoDatePicker").value();
    var verNotoSave = document.getElementById("HdrSec2_InptDocNo_Val").value;
    var prjToSave = $("#HdrSec2_CmbPrj_Cd").data("kendoComboBox").value();
    //var TrnTypToSave = $("#HdrSec2_CmbTrnTyp_Cd").data("kendoComboBox").value();

    var IsAct;
    if ($("#HdrSec2_Chkbox_isAct_Val").is(":checked")) {
        IsAct = true;
    } else {
        IsAct = false;
    }
    var IsApr;
    if ($("#HdrSec2_Chkbox_isApr_Val").is(":checked")) {
        IsApr = true;
    } else {
        IsApr = false;
    }

    if (datepicker != null && verNotoSave.length > 0 && prjToSave > 1) {
        OPENLodingCommonDynamic("Saving ... !",30,200);
        $.ajax({
            url: urlInsertDetail,
            data: JSON.stringify({
                trnDate: datepicker,
                prjky: prjToSave,
                trnTypKy: FormGlblData.TrnTypKy,
                isAct: IsAct,
                isApr: IsApr,
                verNo: verNotoSave,
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "Json",
            type: "POST",
            success: function (data) {  
                OPENLodingCommonDynamic("Saved !", 30, 200);
                ClearFields();
                CLOSELoadingCommon();    
            },
            error: function (e)
            {
                CLOSELoadingCommon();
                alert("Saving Error");
                
            }
        });    
        
    }
    else
    {
        alert("Fill All Fields");
    }
    
}

function ClearFields()
{
    LoadDatePickers();
    document.getElementById("HdrSec2_InptDocNo_Val").value = "";
    $("#HdrSec2_CmbPrj_Cd").data("kendoComboBox").value("");
   // $("#HdrSec2_CmbTrnTyp_Cd").data("kendoComboBox").value("")
}