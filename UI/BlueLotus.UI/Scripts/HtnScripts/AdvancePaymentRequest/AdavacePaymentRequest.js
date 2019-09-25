var FormGlblData = {
    FormObjData: null,
    TrnTypKy: 1,
    AccessLvlKy: 1,
    ConfiLvlKy: 1,
    TrnKy: 1
}


$(document).ready(function () {

    $.ajax({
        url: urlCodes.GetCdKyByConCdAndOurCd,
        dataType: "json",
        type: "POST",
        data: JSON.stringify({
            ObjKy: viewBag.ObjKy,
            ConCd: 'TrnTyp',
            OurCd: viewBag.OurCd
        }),
        contentType: 'application/json; charset=utf-8',
        success: function (TrnTypKy) {
            FormGlblData.TrnTypKy = TrnTypKy;
            GetFormObjData();
        }
    });
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
    LoadCombo();
    setTimeout(setHdrSectionPropFun, 2000);
    GridDefaultColumns();
    ClearHeader();
    DetailLevelClear();

}

function setHdrSectionPropFun() {
    // ---------- Set ObjProperties
    setHdrSectionProp('', viewBag.ObjKy, '', 'HdrSec1');
    setHdrSectionProp('', viewBag.ObjKy, '', 'HdrSec2');
    SetHandlingEnterKeyEvent('', viewBag.ObjKy);
  
}

$("#HdrSec2_TxtArea_Des_Val").keypress(function (event) {
          var keycode = (event.keyCode ? event.keyCode : event.which);
          if (keycode == "13") {
              var AccKy = $("#HdrSec2_CmbAcc_Cd").data("kendoComboBox").value();
              var AdrKy = $("#HdrSec2_CmbAdr_Cd").data("kendoComboBox").value();
              var Amount = $("#HdrSec2_NmricAmt_Val").data("kendoNumericTextBox").value();
              var Des = $("#HdrSec2_TxtArea_Des_Val").val();
              if (!AccKy || AccKy == 1) {
                  alert("Please select an Account");
                  return;
              }
              if (!AdrKy || AdrKy == 1) {
                  alert("Please select an Address");
                  return;
              }
              if (!Amount || Amount == 0) {
                  alert("Please Enter an Amount");
                  return;
              }
              if (!Des || Des.length <1 ) {
                  alert("Please Enter Description");
                  return;
              }
              setValuesToGrid();
              DetailLevelClear();

          }
});

function DetailLevelClear() {
   $("#HdrSec2_CmbAcc_Cd").data("kendoComboBox").value("");
   $("#HdrSec2_CmbAcc_Nm").data("kendoComboBox").value("");
   $("#HdrSec2_CmbAdr_Cd").data("kendoComboBox").value("");
   $("#HdrSec2_CmbAdr_Nm").data("kendoComboBox").value("");
   $("#HdrSec2_NmricAmt_Val").data("kendoNumericTextBox").value("");
   $("#HdrSec2_TxtArea_Des_Val").val("");
   $("#TempLiNumber").val("");
   $("#HdrSec2_CmbAcc_Cd ").data("kendoComboBox").input.focus();


   
}

function ClearHeader() {
    $("#HdrSec1_CmbPrj_Cd").data("kendoComboBox").value("");
    $("#HdrSec1_CmbPrj_Nm").data("kendoComboBox").value("");
    $("#HdrSec1_CmbBU_Cd").data("kendoComboBox").value("");
    $("#HdrSec1_CmbBU_Nm").data("kendoComboBox").value("");
    document.getElementById("HdrSec1_InptDocNo_Val").value = "";
    document.getElementById("HdrSec1_InptTrnNo_Val").value = "";
    document.getElementById("TrnKy").value = "";
    document.getElementById("TimeStamp").value = "";
    var todayDate = new Date();
    $("#HdrSec1_DatVouDate_Val").data("kendoDatePicker").value(todayDate);
}

function Save(state) {
    var docNu = document.getElementById("HdrSec1_InptDocNo_Val").value;
    var PrjKy = $("#HdrSec1_CmbPrj_Cd").data("kendoComboBox").value();
    if (!PrjKy) {
        PrjKy = 1;
    }
    var BuKy = $("#HdrSec1_CmbBU_Nm").data("kendoComboBox").value();
    if (!BuKy) {
        BuKy = 1;
    }
    var TEmpVouDate = $("#HdrSec1_DatVouDate_Val").data("kendoDatePicker").value();
    var DocNu = document.getElementById("HdrSec1_InptDocNo_Val").value;
    var month = TEmpVouDate.getUTCMonth() + 1;
    var date = TEmpVouDate.getUTCDate();
    var year = TEmpVouDate.getUTCFullYear();
    var VauDate = year + "/" + month + "/" + date;
    var grid = $("#FormGrd").data("kendoGrid");
    var currentData = grid.dataSource.data();
    var updatedRecords = [];
    var newRecords = [];
    for (var i = 0; i < currentData.length; i++) {
        if (currentData[i].isNew()) {
            newRecords.push(currentData[i].toJSON());
        } else if (currentData[i].dirty) {
            updatedRecords.push(currentData[i].toJSON());
        }
    }

    //ajax for unsert update and delete
       $.ajax({
            url: UrlInsertUpdateAdvReqest, //"@Url.Content("~/ManageAllAccount/InsertDetail")",
            data: JSON.stringify({
                PrjKy: PrjKy,
                BuKy: BuKy,
                VauDate: VauDate,
                newRecords: kendo.stringify(newRecords),
                updateRecords: kendo.stringify(updatedRecords),
                ourCode: viewBag.OurCd,
                ObjKy: viewBag.ObjKy,
                DocNu: DocNu

            }),
            contentType: "application/json; charset=utf-8",
            dataType: "Json",
            type: "POST",
            success: function (data) {
                if (data[0].succsess == true) {
                    alert("Successfully Saved..!");
                    CleareAll();
                    if (state == 1) {
                        GetpaymentHdrDetail(data[0].TrnKy);
                    }
                } else {
                    alert("Record Not Saved");
                }
            },
            error: function (arg) {
                return false;
            }
        });

}


$(document.body).keydown(function (e) {
        if (e.ctrlKey && e.keyCode == 70) {
            $("#FindFormAdvRqst").show()
                .kendoWindow({
                    width: "1000px",
                    height: "600px",
                    modal: true,
                    title: "Find Form"
                });
            $("#FindFormAdvRqst").data("kendoWindow").center().open();

        }
    });

function CleareAll() {
    ClearHeader();
    DetailLevelClear();
    var grid = $("#FormGrd").data("kendoGrid");
    grid.dataSource.data([]);
}

