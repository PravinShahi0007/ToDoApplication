var FormGlblData = {
    FormObjData: null,
    PrjTypKy: 1,
    AccessLvlKy: 1,
    ConfiLvlKy: 1,
    TrnKy: 1
}

$(document).ready(function () {
    GetFormObjData();
});

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
    LoadDropDown();
    Tooltip();
    SelectText();
    LoadDetailGrid(); //loadgrid.js
    $(".Checkboxes").change(function () {//alert()
        //LoadDetailGrid();
        createColumnDynamically();
    });

    $('#HdrSec1_CmbTransaction_Nm').change(function () {
        GetPrefix();
    });
}

function insertItem() {
    var grid = $("#PrefixGrid").data("kendoGrid").addRow();
}
function Save() {
    SavePrefix();
}
function GetPrefix() {
    var TrnTypKy = (!$("#HdrSec1_CmbTransaction_Nm").data("kendoComboBox").value()) ? 1 : $("#HdrSec1_CmbTransaction_Nm").data("kendoComboBox").value();
    var GrpConKy = 1;
    $.ajax({
        url: Url.GetPrefix,
        dataType: "json",
        type: "POST",
        data: {
            TrnTypKy: TrnTypKy,
            GrpConKy: GrpConKy
        },
        success: function (DBData) {
            var IsPrj = true;
            var IsFy = true;
            var IsBu = true;
            var IsLoc = true;
            for (var i = 0 ; i < DBData.length; i++) {
                if (IsPrj) {
                    if (DBData[i].ProjectKy > 1) {
                        $('#HdrSec1_chkbxIsPrj_val').attr('checked', true);
                        $("#HdrSec1_chkbxIsPrj_val").trigger("change");
                        IsPrj = false;
                    }
                }

                if (IsFy) {
                    if (DBData[i].FYStDtKy > 1) {
                        $('#HdrSec1_chkbxIsFy_val').attr('checked', true);
                        $("#HdrSec1_chkbxIsFy_val").trigger("change");
                        IsFy = false;
                    }
                }

                if (IsBu) {
                    if (DBData[i].BUKy > 1) {
                        $('#HdrSec1_chkbxIsBU_val').attr('checked', true);
                        $("#HdrSec1_chkbxIsBU_val").trigger("change");
                        IsBu = false;
                    }
                }

                if (IsLoc) {
                    if (DBData[i].LocationKy > 1) {
                        $('#HdrSec1_chkbxIsLoc_val').attr('checked', true);
                        $("#HdrSec1_chkbxIsLoc_val").trigger("change");
                        IsLoc = false;
                    }
                }
            }

            $("#PrefixGrid").data("kendoGrid").dataSource.data(DBData);
        }
    });
}
function GetCdMas_LookupWeb(ConCd) {
    var dataSource = new kendo.data.DataSource(
      {
          transport: {
              read: {
                  url: urlHRISEmployeeGetCdMas_LookupWeb,
                  data: { ConCd: ConCd },
                  dataType: "json"
              }
          }
      });
    return dataSource;
}

function LoadDropDown() {
    $("#HdrSec1_CmbTransaction_Nm").kendoComboBox({
        dataValueField: "CdKy",
        dataTextField: "CdNm",
        dataSource: CdNm_SelectMob_Datasource('HdrSec1_CmbTransaction'), //GetCdMas_LookupWeb('TrnTyp'),
        filter: "contains",
        suggest: true,
        placeholder: "Select a Transaction Type"
    });
    $("#HdrSec1_CmbTransaction_Nm").parent().css('width', "200px");
}

function ComboValidations(cmbNm) {

    var cmb = $("#" + cmbNm + "").data("kendoComboBox");
    var val = cmb.value();

    if (isNaN(val)) {
        alert("'" + val + "' is not a Valid input");
        $("#" + cmbNm + "").data('kendoComboBox').value("");
        return false;
    } else {
        return true;
    }
}

