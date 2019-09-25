
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
                var validate = ComboValidations("HdrSec1_CmbItm_Cd");
                {
                    if (validate) {
                        $("#HdrSec1_CmbItm_Nm").data("kendoComboBox").value(ItmKy);
                        LoadUnitCombo(ItmKy);

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
                    var dropdownlist = $("#HdrSec1_CmbItm_Nm").data("kendoDropDownList");
                    dropdownlist.destroy();
                    dropdownlist.wrapper.remove();
                } catch (ex) { }

                LoadItemCombo();

                OpenItemFindForm(cmbText);
            } else {
                $("#HdrSec1_NmricQty_Val").data("kendoNumericTextBox").focus();
                //GetRate();
            }
        }
    });

    $("#HdrSec1_CmbItm_Nm").kendoComboBox({
        dataValueField: "ItmKy",
        dataTextField: "ItmNm",
        dataSource: ItmNmDatasourceTest(),
        change: function (e) {
            var comboboxText = $("#HdrSec1_CmbItm_Nm").data("kendoComboBox");
            var cmbText = comboboxText.text();
            var comboboxValue = $("#HdrSec1_CmbItm_Nm").data("kendoComboBox");
            var cmbValue = comboboxValue.value();

            if ((cmbText == "?") || (cmbText.slice(-1) == "?")) {

            } else {
                var ItmKy = cmbValue;
                var validate = ComboValidations("HdrSec1_CmbItm_Nm");
                {
                    if (validate) {
                        $("#HdrSec1_CmbItm_Cd").data("kendoComboBox").value(ItmKy);
                        LoadUnitCombo(ItmKy);

                        DeepClearDetailsFunction();
                    }
                }
            }
        },
        filter: "startswith",
        suggest: true,
        placeholder: "Select a ItmNm.."
    });

    $("#HdrSec1_CmbItm_Nm").data("kendoComboBox").input.keydown(function (e) {
        var keycode = (e.keyCode ? e.keyCode : e.which);
        if (keycode == '13') {

            var comboboxText = $("#HdrSec1_CmbItm_Nm").data("kendoComboBox");
            var cmbText = comboboxText.text();

            if ((cmbText == "?") || (cmbText.slice(-1) == "?")) {
                try {
                    var dropdownlist = $("#HdrSec1_CmbItm_Cd").data("kendoDropDownList");
                    dropdownlist.destroy();
                    dropdownlist.wrapper.remove();
                } catch (ex) { }

                try {
                    var dropdownlist = $("#HdrSec1_CmbItm_Nm").data("kendoDropDownList");
                    dropdownlist.destroy();
                    dropdownlist.wrapper.remove();
                } catch (ex) { }

                LoadItemCombo();

                OpenItemFindForm(cmbText);
            } else {
                $("#HdrSec1_NmricQty_Val").data("kendoNumericTextBox").focus();
                //GetRate();
            }
        }
    });


    $("#HdrSec1_CmbItm_Cd").parent().css('width', "31%");
    $("#HdrSec1_CmbItm_Nm").parent().css('width', "58%");
    $("#HdrSec1_CmbUnit_Cd").css('width', "100%");
}

var selectedAnalyUnitCmbVal = 1;
var analyUnitComboChangeEventBind = 0;
function LoadUnitCombo(ItmKy) {

    $("#HdrSec1_CmbUnit_Cd").kendoComboBox({
        dataValueField: "UnitKy",
        dataTextField: "Unit",
        dataSource: UnitDatasource(ItmKy),
        change: function (e) {
            //var cmb = $("#HdrSec1_CmbItm_Cd").data("kendoComboBox");
            //var ItmKy = cmb.value();
            //if (ItmKy != "") {
            //}
        },
        filter: "startswith",
        suggest: true,
        placeholder: "Select a ItmCd..",
        dataBound: function () {
            if (selectedAnalyUnitCmbVal < 10) {
                this.select(0);
            }
            else {
                this.value(selectedAnalyUnitCmbVal);
                selectedAnalyUnitCmbVal = 1;
            }
        }
    });

    if (analyUnitComboChangeEventBind == 0) {
        analyUnitComboChangeEventBind = 1;
        $("#HdrSec1_CmbUnit_Cd").data("kendoComboBox").input.keypress(function (e) {
            var keycode = (e.keyCode ? e.keyCode : e.which);
            if (keycode == '13') {
                var LiNo = $("#HdrSec1_NmricLiNo_Val").data("kendoNumericTextBox").value();
                if (LiNo == 0 || LiNo == null || LiNo == undefined) {
                    setItmDetailbyEnterky();
                } else {
                    changeItemRalatedTotal();
                }
            }
        });
    }
}

function ItmCdDatasourceTest() {
    var dataSource = new kendo.data.DataSource(
      {
          transport: {
              read: {
                  url: urlTransactionItmCd_SelectWeb,
                  data: {
                      OurCd: viewBag.OurCd, //'RM',
                      ConCd: 'ItmTyp'
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
                  url: urlTransactionItmNm_SelectWeb,
                  data: {
                      OurCd: viewBag.OurCd, //'RM',
                      ConCd: 'ItmTyp'
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
