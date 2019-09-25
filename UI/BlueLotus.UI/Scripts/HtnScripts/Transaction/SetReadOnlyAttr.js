function SetReadOnly(TrnKy) {
    //var matches = [];
    //var searchEles = document.getElementById("myDiv").children;
    //for (var i = 0; i < searchEles.length; i++) {
    //    if (searchEles[i].tagName == 'SELECT' || searchEles.tagName == 'INPUT') {
    //        if (searchEles[i].id.indexOf('q1_') >= 0) {
    //            matches.push(searchEles[i]);
    //        }
    //    }
    //}

    //var matches = [];
    //var searchEles = document.getElementById("HdrPart").getElementsByTagName("*");
    //for (var i = 0; i < searchEles.length; i++) {
    //    if (searchEles[i].id.toLowerCase().indexOf("cmb") >= 0) {
    //        matches.push(searchEles[i]);
    //        var cmbDynmDisable = $("#" + searchEles[i].id).data("kendoComboBox");
    //        cmbDynmDisable.enable(false);
    //    }
    //    else if (searchEles[i].tagName == 'input') {
    //        matches.push(searchEles[i]);
    //        searchEles[i].readOnly = true;
    //    }
    //}

    $.ajax({
        url: urlTransactionAccCheckLockByTrnKy,
        dataType: "json",
        type: "POST",
        data: JSON.stringify({
            TrnKy: TrnKy
        }),
        contentType: 'application/json; charset=utf-8',
        success: function (list) {

            // This function in "SetReadOnlyAttr.js" file
            SetReadOnlyAttr(list);
        },
        error: function (e) {

        }
    });
}


function SetReadOnlyAttr(IsLocked) {

    //alert(IsLocked);      

    if (IsLocked == 0) {

        $("#HdrPart *").attr("disabled", "");
        $("#GridWin *").attr("disabled", "");
        $("#ButtonSet *").attr("disabled", "");

        $("#HdrPart *").attr("readonly", "");
        $("#GridWin *").attr("readonly", "");
        $("#ButtonSet *").attr("readonly", "");


        //element.removeAttribute("disabled");
        //$("#HdrPart *").removeAttribute("disabled");
        //$("#GridWin *").removeAttribute("disabled");
        //$("#ButtonSet *").removeAttribute("disabled");

        var searchEles = document.getElementById("ButtonSet").getElementsByTagName("*");
        for (var i = 0; i < searchEles.length; i++) {
            if (searchEles[i].id.toLowerCase().indexOf("cmb") >= 0) {
                var cmbDynmDisable = $("#" + searchEles[i].id).data("kendoComboBox");
                if (cmbDynmDisable != null) {
                    cmbDynmDisable.enable(true);
                }
            }
            else if ((searchEles[i].className.indexOf('k-numerictextbox') == 0) ||
                (searchEles[i].className.indexOf('k-input') == 0) ||
                (searchEles[i].className.indexOf('k-textbox') == 0)) {
                var cmbDynmDisable = $("#" + searchEles[i].id).data("kendoNumericTextBox");
                if (cmbDynmDisable != null) {
                    cmbDynmDisable.enable(true);
                }
            }
            searchEles[i].removeAttribute("disabled");
            searchEles[i].removeAttribute("readonly");
        }

        var searchEles = document.getElementById("HdrPart").getElementsByTagName("*");
        for (var i = 0; i < searchEles.length; i++) {
            if (searchEles[i].id.toLowerCase().indexOf("cmb") >= 0) {
                var cmbDynmDisable = $("#" + searchEles[i].id).data("kendoComboBox");
                if (cmbDynmDisable != null) {
                    cmbDynmDisable.enable(true);
                }
            }
            else if ((searchEles[i].className.indexOf('k-numerictextbox') == 0) ||
                (searchEles[i].className.indexOf('k-input') == 0) ||
                (searchEles[i].className.indexOf('k-textbox') == 0)) {
                var cmbDynmDisable = $("#" + searchEles[i].id).data("kendoNumericTextBox");
                if (cmbDynmDisable != null) {
                    cmbDynmDisable.enable(true);
                }
            }
            searchEles[i].removeAttribute("disabled");
            searchEles[i].removeAttribute("readonly");
        }

        var searchEles = document.getElementById("GridWin").getElementsByTagName("*");
        for (var i = 0; i < searchEles.length; i++) {
            if (searchEles[i].id.toLowerCase().indexOf("cmb") >= 0) {
                var cmbDynmDisable = $("#" + searchEles[i].id).data("kendoComboBox");
                if (cmbDynmDisable != null) {
                    cmbDynmDisable.enable(true);
                }
            }
            else if ((searchEles[i].className.indexOf('k-numerictextbox') == 0) ||
                (searchEles[i].className.indexOf('k-input') == 0) ||
                (searchEles[i].className.indexOf('k-textbox') == 0)) {
                var cmbDynmDisable = $("#" + searchEles[i].id).data("kendoNumericTextBox");
                if (cmbDynmDisable != null) {
                    cmbDynmDisable.enable(true);
                }
            }

            searchEles[i].removeAttribute("disabled");
            searchEles[i].removeAttribute("readonly");

            try {
                $("#OrdNoFrm").attr("disabled", "");
                $("#docNo").attr("disabled", "");
                $("#OrdNoFrm").removeAttr("readonly");
                $("#docNo").removeAttr("readonly");
                $("#OrdNoFrm").removeAttr("disabled")
                $("#docNo").removeAttr("disabled")

            } catch (e) {

            }
        }


        try { $("#" + viewBag.OurCd).bind("dblclick", dblclickCreation); } catch (ex) { console.log("exception occured " + ex); }
        try {
            $("#OrdNo1").attr("disabled", "disabled"); // Transaction Form TrnNo should be disabled.
            document.getElementById("ButtonSec2_preview").disabled = false;
            document.getElementById("btnNxtStatesAction").disabled = false;
            $("#cmbNxtStatesActions").data("kendoComboBox").enable(true);
        }
        catch (ex) { }
        //order


        UnLock_All_FindForm();
    }

    else if (IsLocked == 1) {

        $("#HdrPart *").attr("disabled", "disabled");
        $("#GridWin *").attr("disabled", "disabled");
        $("#ButtonSet *").attr("disabled", "disabled");

        $("#HdrPart *").attr("readonly", "readonly");
        $("#GridWin *").attr("readonly", "readonly");
        $("#ButtonSet *").attr("readonly", "readonly");

        var searchEles = document.getElementById("ButtonSet").getElementsByTagName("*");
        for (var i = 0; i < searchEles.length; i++) {
            if (searchEles[i].id.toLowerCase().indexOf("cmb") >= 0) {
                var cmbDynmDisable = $("#" + searchEles[i].id).data("kendoComboBox");
                if (cmbDynmDisable != null) {
                    cmbDynmDisable.enable(false);
                }
            }
            else if ((searchEles[i].className.indexOf('k-numerictextbox') == 0) ||
                (searchEles[i].className.indexOf('k-input') == 0) ||
                (searchEles[i].className.indexOf('k-textbox') == 0)) {
                var cmbDynmDisable = $("#" + searchEles[i].id).data("kendoNumericTextBox");
                if (cmbDynmDisable != null) {
                    cmbDynmDisable.enable(false);
                }
            }
        }

        var searchEles = document.getElementById("HdrPart").getElementsByTagName("*");
        for (var i = 0; i < searchEles.length; i++) {
            if (searchEles[i].id.toLowerCase().indexOf("cmb") >= 0) {
                var cmbDynmDisable = $("#" + searchEles[i].id).data("kendoComboBox");
                if (cmbDynmDisable != null) {
                    cmbDynmDisable.enable(false);
                }
            }
            else if ((searchEles[i].className.indexOf('k-numerictextbox') == 0) ||
                (searchEles[i].className.indexOf('k-input') == 0) ||
                (searchEles[i].className.indexOf('k-textbox') == 0)) {
                var cmbDynmDisable = $("#" + searchEles[i].id).data("kendoNumericTextBox");
                if (cmbDynmDisable != null) {
                    cmbDynmDisable.enable(false);
                }
            }
        }

        var searchEles = document.getElementById("GridWin").getElementsByTagName("*");
        for (var i = 0; i < searchEles.length; i++) {
            if (searchEles[i].id.toLowerCase().indexOf("cmb") >= 0) {
                var cmbDynmDisable = $("#" + searchEles[i].id).data("kendoComboBox");
                if (cmbDynmDisable != null) {
                    cmbDynmDisable.enable(false);
                }
            }
            else if ((searchEles[i].className.indexOf('k-numerictextbox') == 0) ||
                (searchEles[i].className.indexOf('k-input') == 0) ||
                (searchEles[i].className.indexOf('k-textbox') == 0)) {
                var cmbDynmDisable = $("#" + searchEles[i].id).data("kendoNumericTextBox");
                if (cmbDynmDisable != null) {
                    cmbDynmDisable.enable(false);
                }
            }
        }
        try {
            $("#cmbNxtStatesActions").data("kendoComboBox").enable(true);
            document.getElementById("btnNxtStatesAction").disabled = false;
        } catch (e) { }
        UnLock_All_FindForm();        
    }
}


function UnLock_All_FindForm()
{

    //------------------------------------------------------------------------------------
    //***************************** Enable Main Form buttons for Transaction Form
    try {
        document.getElementById("ButtonSec1_Print").disabled = false;
        document.getElementById("ButtonSec1_New").disabled = false;
        document.getElementById("ButtonSec1_Cancel").disabled = false;
        document.getElementById("ButtonSec1_Print1").disabled = false;
    }
    catch (ex)
    { }

    // *************** Enable Main Form buttons for Order Form
    try{
        document.getElementById("ButtonSec1_Cancel").disabled = false;
        document.getElementById("ButtonSec1_New").disabled = false;
        document.getElementById("ButtonSec1_Print").disabled = false;

    }catch(e){}


    //----------- Transaction Find Enabled
    try {
        document.getElementById("ButtonSec2_Preview").disabled = false;
        document.getElementById("ButtonSec2_Select").disabled = false;
        document.getElementById("ButtonSec2_Cancel").disabled = false;
        document.getElementById("ButtonSec2_Back").disabled = false;

    } catch (e) { }











    //---------- Payment Find  Enabled
    try {
        document.getElementById("ButtonSec2_preview").disabled = false;
        $("#FrmDt").data("kendoDatePicker").enable(true);
        $("#ToDt").data("kendoDatePicker").enable(true);
        $("#Prefix").data("kendoComboBox").enable(true);
        $("#TrnNo").prop("disabled", false).removeClass("k-state-disabled");
        $("#TrnNo").attr("readonly", false);
        $("#DocumentNo").prop("disabled", false).removeClass("k-state-disabled");
        $("#DocumentNo").attr("readonly", false);
        document.getElementById("AccChk").disabled = false;
        document.getElementById("PrjChk").disabled = false;
        document.getElementById("IsRec").disabled = false;
        document.getElementById("IsPrnt").disabled = false;
    }
    catch (ex)
    { }

    try {
        $("#cmbSup").data("kendoComboBox").enable(true);
        $("#cmbPrjectId").data("kendoComboBox").enable(true);
        $("#cmbDay").data("kendoComboBox").enable(true);
        $("#cmbAdrIDPO").data("kendoComboBox").enable(true);

        $("#FrmDt").data("kendoDatePicker").enable(true);
        $("#ToDt").data("kendoDatePicker").enable(true);
        $("#DeliDt").data("kendoDatePicker").enable(true);

        $("#docNo").prop("disabled", false).removeClass("k-state-disabled");
        $("#OrdNoFrm").prop("disabled", false).removeClass("k-state-disabled");
        $("#OrdNoTo").prop("disabled", false).removeClass("k-state-disabled");
        $("#OrdNoFrm").attr("readonly", false);
        $("#OrdNoTo").attr("readonly", false);
        $("#docNo").attr("readonly", false);
        document.getElementById("remember").disabled = false;
    }
    catch (ex) { }

    //************************************* Order Find Form UnLock *************************
    try {
        $("#cmbSup").data("kendoComboBox").enable(true);
        $("#cmbPrjectId").data("kendoComboBox").enable(true);
        $("#cmbDay").data("kendoComboBox").enable(true);
        $("#cmbAdrIDPO").data("kendoComboBox").enable(true);

        $("#FrmDt").data("kendoDatePicker").enable(true);
        $("#ToDt").data("kendoDatePicker").enable(true);
        $("#DeliDt").data("kendoDatePicker").enable(true);

        $("#docNo").prop("disabled", false).removeClass("k-state-disabled");
        $("#OrdNoFrm").prop("disabled", false).removeClass("k-state-disabled");
        $("#OrdNoTo").prop("disabled", false).removeClass("k-state-disabled");
        $("#docNo").attr("readonly", false);
        $("#OrdNoFrm").attr("readonly", false);
        $("#OrdNoTo").attr("readonly", false);
        document.getElementById("remember").disabled = false;
        document.getElementById("ButtonSec2_preview").disabled = false;
        document.getElementById("ButtonSec2_clean").disabled = false;

    }
    catch (ex) {
        //Console.log("exception occoured " + ex);
    }


     
    //************************************* Get from Order Form UnLock *************************
    try {
        $("#TrnTypOrd_FrmDateFromPR").data("kendoDatePicker").enable(true);
        $("#TrnTypOrd_ToDateFromPR").data("kendoDatePicker").enable(true);
        $("#TrnTypOrd_cmbPrjectIdFrmPurReq").data("kendoComboBox").enable(true);
        $("#TrnTypOrd_OrdtypOrdcmbSupGRN").data("kendoComboBox").enable(true);
        $("#TrnTypOrd_OrdNoFrmPurReq").prop("disabled", false).removeClass("k-state-disabled");
        $("#TrnTypOrd_OrdNoFrmPurReq").attr("readonly", false);
    }
    catch (ex) {
        //Console.log("exception occoured " + ex);
    }


}