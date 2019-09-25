var avlStock;
function LoadItemCombo() {

    $("#HdrSec1_CmbItm_Cd").kendoComboBox({
        dataTextField: "ItmCd",
        dataValueField: "ItmKy",
        dataSource: ItmCdDatasourceTest(),
        change: function (e) {
            var comboboxText = $("#HdrSec1_CmbItm_Cd").data("kendoComboBox");
            var cmbText = comboboxText.text();
            var comboboxValue = $("#HdrSec1_CmbItm_Cd").data("kendoComboBox");
            var cmbValue = comboboxValue.value();
            
            if ((cmbText == "?") || (cmbText.slice(-1) == "?")) {

            } else {
                var ItmKy = cmbValue;
                //GetItemQtyComponent();
                var validate = ComboValidations("HdrSec1_CmbItm_Cd");
                {
                    if (validate) {
                        //$("#HdrSec1_CmbItm_Nm").data("kendoComboBox").value(ItmKy);
                        LoadUnitComboOrdDetCmpn(ItmKy);
                        GetItemQtyComponent();
                        
                        DeepClearDetailsFunction();
                    }
                }
            }
        },
        filter: "startswith",
        suggest: true,
        placeholder: "Select a ItmCd.."
    });

    $("#HdrSec1_CmbItm_Cd").data("kendoComboBox").input.keydown(function (e) {
        var keycode = (e.keyCode ? e.keyCode : e.which);
        if (keycode == '13') {

            var comboboxText = $("#HdrSec1_CmbItm_Cd").data("kendoComboBox");
            var cmbText = comboboxText.text();

            if ((cmbText == "?") || (cmbText.slice(-1) == "?")) {

                try {
                    var dropdownlist = $("#HdrSec1_CmbItm_Cd").data("kendoDropDownList");
                    dropdownlist.destroy();
                    dropdownlist.wrapper.remove();
                } catch (ex) { }

                try {
                    //var dropdownlist = $("#HdrSec1_CmbItm_Nm").data("kendoDropDownList");
                    //dropdownlist.destroy();
                    //dropdownlist.wrapper.remove();
                } catch (ex) { }

                LoadItemCombo();
                
                OpenItemFindForm(cmbText);
            } else {
                $("#HdrSec1_NmricQty_Val").data("kendoNumericTextBox").focus();
                //GetRate();
            }
        }
    });

    //$("#HdrSec1_CmbItm_Nm").kendoComboBox({
    //    dataValueField: "ItmKy",
    //    dataTextField: "ItmNm",
    //    dataSource: ItmNmDatasourceTest(),
    //    change: function (e) {
    //        var comboboxText = $("#HdrSec1_CmbItm_Nm").data("kendoComboBox");
    //        var cmbText = comboboxText.text();
    //        var comboboxValue = $("#HdrSec1_CmbItm_Nm").data("kendoComboBox");
    //        var cmbValue = comboboxValue.value();

    //        if ((cmbText == "?") || (cmbText.slice(-1) == "?")) {

    //        } else {
    //            var ItmKy = cmbValue;
    //            var validate = ComboValidations("HdrSec1_CmbItm_Nm");
    //            {
    //                if (validate) {
    //                    $("#HdrSec1_CmbItm_Cd").data("kendoComboBox").value(ItmKy);
    //                    LoadUnitComboOrdDetCmpn(ItmKy);
    //                    GetItemQty();
                        
    //                    DeepClearDetailsFunction();
    //                }
    //            }
    //        }
    //    },
    //    filter: "startswith",
    //    suggest: true,
    //    placeholder: "Select a ItmNm.."
    //});

    //$("#HdrSec1_CmbItm_Nm").data("kendoComboBox").input.keydown(function (e) {
    //    var keycode = (e.keyCode ? e.keyCode : e.which);
    //    if (keycode == '13') {

    //        var comboboxText = $("#HdrSec1_CmbItm_Nm").data("kendoComboBox");
    //        var cmbText = comboboxText.text();

    //        if ((cmbText == "?") || (cmbText.slice(-1) == "?")) {
    //            try {
    //                var dropdownlist = $("#HdrSec1_CmbItm_Cd").data("kendoDropDownList");
    //                dropdownlist.destroy();
    //                dropdownlist.wrapper.remove();
    //            } catch (ex) { }

    //            try {
    //                var dropdownlist = $("#HdrSec1_CmbItm_Nm").data("kendoDropDownList");
    //                dropdownlist.destroy();
    //                dropdownlist.wrapper.remove();
    //            } catch (ex) { }

    //            LoadItemCombo();
                
    //            OpenItemFindForm(cmbText);
    //        } else {
    //            $("#HdrSec1_NmricQty_Val").data("kendoNumericTextBox").focus();
    //            //GetRate();
    //        }
    //    }
    //});


    $("#HdrSec1_CmbItm_Cd").parent().css('width', "40%");
    //$("#HdrSec1_CmbItm_Nm").parent().css('width', "58%");
    $("#HdrSec1_CmbUnit_Cd").css('width', "40%");
}

function LoadUnitComboOrdDetCmpn(ItmKy) {
    $("#HdrSec1_CmbUnit_Cd").kendoComboBox({
        dataValueField: "UnitKy",
        dataTextField: "Unit",
        dataSource: UnitDatasource(ItmKy),
        index:0,
        change: function (e) {
            //var cmb = $("#HdrSec1_CmbItm_Cd").data("kendoComboBox");
            //var ItmKy = cmb.value();
            //if (ItmKy != "") {
            //}
        },
        filter: "startswith",
        suggest: true,
        placeholder: "Select a ItmCd.."
    });

    var combobox = $("#HdrSec1_CmbUnit_Cd").data("kendoComboBox");
    var selectedIndex = combobox.select();


    $("#HdrSec1_CmbUnit_Cd").data("kendoComboBox").input.keypress(function (e) {
        var keycode = (e.keyCode ? e.keyCode : e.which);
        if (keycode == '13') {
            var LiNo = $("#HdrSec1_NmricLiNo_Val").data("kendoNumericTextBox").value();
            if (LiNo == 0 || LiNo == null || LiNo == undefined) {
                setItmDetailbyEnterkyFromOrdDet();
            } else {
                changeItemRalatedTotalFromOrdDet();
            }
        }
    });

    
}

function ItmCdDatasourceTest() {

    var dataSource = new kendo.data.DataSource(
      {
          transport: {
              read: {
                  url: urlComboLoad.ItmCd_SelectMob,
                  data: {
                      ObjKy: 1,
                      TrnTypKy: FormGlblData.OrdTypKy,
                      PreKy: 1
                  },
                  dataType: "json"
              }
          }
      });
    return dataSource;
}

function ItmNmDatasourceTest() {
    var dataSource = new kendo.data.DataSource(
      {
          transport: {
              read: {
                  url: urlComboLoad.ItmNm_SelectMob,
                  data: {
                      ObjKy: 1,
                      TrnTypKy: FormGlblData.OrdTypKy,
                      PreKy: 1
                  },
                  dataType: "json"
              }
          }
      });
    return dataSource;
}

function UnitDatasource(ItmKy) {
    if (ItmKy == "?")
        ItmKy = 1;
    var dataSource = new kendo.data.DataSource(
      {
          transport: {
              read: {
                  url: urlTransactionGetItemMultiUnits,
                  data: {
                      ItmKy: ItmKy,
                      OrdTypKy: FormGlblData.OrdTypKy

                      //FormGlblData.OrdTypKy
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
        $("#" + cmbNm + "").data("kendoComboBox").input.focus();
        return false;
    } else {
        return true;
    }
}

function GetItemQtyComponent() {
    //if (viewBag.OurCd != "MatReq") {
    //    return;
    //}
    var ItmKy = $("#HdrSec1_CmbItm_Cd").data("kendoComboBox").value();
    if (!ItmKy || ItmKy == "") {
        return;
    }
    var FrmPrjKy = $("#HdrSec2_CmbPrj_Cd").data("kendoComboBox").value();
    if (!FrmPrjKy || FrmPrjKy == "") {
        FrmPrjKy = 1;
    }
    var FrmLcKy = $("#HdrSec2_CmbLoc_Cd").data("kendoComboBox").value();
    if (!FrmLcKy || FrmLcKy == "") {
        FrmLcKy = 1;
    }

    $.ajax({
        url: urlGetAvilableQty,
        data: JSON.stringify({
            ItmKy: ItmKy,
            FrmPrjKy: FrmPrjKy,
            ToPrjKy: 1,
            FrmLockKy: FrmLcKy,
            ToLocKy: 1,
            TrnTyp: FormGlblData.OrdTypKy,
            ObjKy: viewBag.ObjKy,

        }),
        contentType: 'application/json; charset=utf-8',
        dataType: "Json",
        type: "POST",
        success: function (data) {
            if (data) {
                document.getElementById('HdrSec5_CmbItmLdd_Lbl').innerHTML = 'Brand :- ' + data.ItmBrnd + 'Avl.Qty ' + data.Qty + 'Bud.Qty :- ' + data.AvlBudgetQty;
                avlStock = data.Qty;

            }

        },
        error: function (e) {
            alert("Sorry, We Couldn't retrive the data !\nPlease Try Again!");
            return false;
        }
    });

}



