
function LoadItemComboCmpn() {

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
                        $("#HdrSec1_NmricQty_Val").data("kendoNumericTextBox").value(0);
                        $("#HdrSec1_NmricAnlQty_Val").data("kendoNumericTextBox").value(0);
                        $("#HdrSec1_NmricReqQty_Val").data("kendoNumericTextBox").value(0);
                        $("#HdrSec1_NmricWstPer_Val").data("kendoNumericTextBox").value(0);
                        $("#HdrSec1_NmricWstQty_Val").data("kendoNumericTextBox").value(0);
                        $("#HdrSec1_NmricUsagPer_Val").data("kendoNumericTextBox").value(0);
                        $("#HdrSec1_NmricTrnQty_Val").data("kendoNumericTextBox").value(0);
                        $("#HdrSec1_NmricCompFacPer_Val").data("kendoNumericTextBox").value(0);
                        $("#HdrSec1_NmricLiNo_Val").data("kendoNumericTextBox").value(0);
                    }
                }
            }
        },
        filter: "startswith",
        suggest: true,
        placeholder: "Select a ItmCd.."
    });


    $("#HdrSec2_Loction_Cd").kendoComboBox({
        dataValueField: "CdKy",
        dataTextField: "Code",
        dataSource: Code_SelectMob_Datasource('HdrSec2_Loction'), //LocCdDatasource(),
        change: function (e) {
            var cmb = $("#HdrSec2_Loction_Cd").data("kendoComboBox");
            var val = cmb.value();
            if (val == 0 || val == null || val == undefined) {
                alert(val + " in not valid");
                $("#HdrSec2_Loction_Cd").data("kendoComboBox").value(1);
                $("#HdrSec2_Loction_Cd").data("kendoComboBox").text("");
            }
            else {
                $("#HdrSec2_Loction_Nm").data("kendoComboBox").value(val);
            }
        },
        filter: "startswith",
        suggest: true,
        placeholder: "Location Code"
    });
    $("#HdrSec2_Loction_Nm").kendoComboBox({
        dataValueField: "CdKy",
        dataTextField: "CdNm",
        dataSource: CdNm_SelectMob_Datasource('HdrSec2_Loction'), // LocNmDatasource(),
        change: function (e) {
            var cmb = $("#HdrSec2_Loction_Nm").data("kendoComboBox");
            var val = cmb.value();
            if (val == 0 || val == null || val == undefined) {
                alert(val + " in not valid");
                $("#HdrSec2_Loction_Nm").data("kendoComboBox").value(1);
                $("#HdrSec2_Loction_Nm").data("kendoComboBox").text("");
            }
            else {
                $("#HdrSec2_Loction_Cd").data("kendoComboBox").value(val);
            }
        },
        filter: "startswith",
        suggest: true,
        placeholder: "Location Nm"
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
                        $("#HdrSec1_NmricQty_Val").data("kendoNumericTextBox").value(0);
                        $("#HdrSec1_NmricAnlQty_Val").data("kendoNumericTextBox").value(0);
                        $("#HdrSec1_NmricReqQty_Val").data("kendoNumericTextBox").value(0);
                        $("#HdrSec1_NmricWstPer_Val").data("kendoNumericTextBox").value(0);
                        $("#HdrSec1_NmricWstQty_Val").data("kendoNumericTextBox").value(0);
                        $("#HdrSec1_NmricUsagPer_Val").data("kendoNumericTextBox").value(0);
                        $("#HdrSec1_NmricTrnQty_Val").data("kendoNumericTextBox").value(0);
                        $("#HdrSec1_NmricCompFacPer_Val").data("kendoNumericTextBox").value(0);
                        $("#HdrSec1_NmricLiNo_Val").data("kendoNumericTextBox").value(0);
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

    //============= Date Load ===============
    $("#HdrSec1Date_Val")
    .kendoDatePicker({
        format: "dd/MM/yyyy",

    });
    var todayDate = new Date();
    $('#HdrSec1Date_Val').data("kendoDatePicker").value(todayDate);    
}

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
        placeholder: "Select a Unit.."
    });
    $("#HdrSec1_CmbUnit_Cd").data("kendoComboBox").value(null);
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

function LocCdDatasource() {
    var ObjKy = '112145'// GetObjKy(ObjNm);
    var dataSource = new kendo.data.DataSource(
      {
          transport: {
              read: {
                  url: urlLocLoad,//urlComboLoad.Code_SelectMob,
                  data: { ObjKy: ObjKy, TrnTypKy: 1, PreKy: 1 },
                  dataType: "json"
              }
          }
      });
    return dataSource;
    //var dataSource = new kendo.data.DataSource(
    //  {
    //      transport: {
    //          read: {
    //              url: urlLocLoad,
    //              data: {
    //                  OurCd: viewBag.OurCd, //'RM',
    //                  ConCd: 'Loc'
    //              },
    //              dataType: "json"
    //          }
    //      }
    //  });
    //return dataSource;
}

function LocNmDatasource() {
    var ObjKy = '112145'// GetObjKy(ObjNm);
    var dataSource = new kendo.data.DataSource(
      {
          transport: {
              read: {
                  url: urlLocNmLoad,//urlComboLoad.Code_SelectMob,
                  data: { ObjKy: ObjKy, TrnTypKy: 1, PreKy: 1 },
                  dataType: "json"
              }
          }
      });
    return dataSource;
    //var dataSource = new kendo.data.DataSource(
    //  {
    //      transport: {
    //          read: {
    //              url: urlLocLoad,
    //              data: {
    //                  OurCd: viewBag.OurCd, //'RM',
    //                  ConCd: 'Loc'
    //              },
    //              dataType: "json"
    //          }
    //      }
    //  });
    //return dataSource;
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
                      trnTypKy:FormGlblData.ItmTypKy
                  },
                  dataType: "json"
              }
          }
      });
    return dataSource;
}

function ComboValidations(cmbNm) {
    var cmb = $("#" + cmbNm + "").data("kendoComboBox");
    var dataItemval = cmb.dataItem();
    if (!dataItemval) {
        alert("'" + cmb.value() + "' is not a Valid input");
        $("#" + cmbNm + "").data("kendoComboBox").value("");
        return false;
    } else {
        return true;
    }
}
