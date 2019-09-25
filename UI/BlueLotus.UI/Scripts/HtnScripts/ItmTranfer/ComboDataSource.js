function LoadItmCombo() {

    $("#HdrSec6_CmbItm_Cd").kendoComboBox({
        dataValueField: "ItmKy",
        dataTextField: "ItmCd",
        dataSource: ItmCdDatasourceItmTransfer(0, 7000),//ItmCdDatasourceTest(),
        //dataSource: {
        //    serverFiltering: true,
        //    transport: {
        //        read: {
        //            url: urlTransaction.ItmCd_SelectWeb,
        //            data: {
        //                OurCd: 'Material',
        //                ConCd: 'ItmTyp'
        //            },
        //            dataType: "json"
        //        }
        //    }
        //},
        change: function (e) {
            //var cmb = $("#HdrSec6_CmbItm_Cd").data("kendoComboBox");
            //var cmbText = cmb.text();

            var comboboxText = $("#HdrSec6_CmbItm_Cd").data("kendoComboBox");
            var cmbText = comboboxText.text();
            var comboboxValue = $("#HdrSec6_CmbItm_Cd").data("kendoComboBox");
            var cmbValue = comboboxValue.value();

            if ((cmbText == "?") || (cmbText.slice(-1) == "?")) {
                //$("#HdrSec6_CmbItm_Cd").data("kendoComboBox").value(null);
                //$("#HdrSec6_CmbItm_Cd").data("kendoComboBox").trigger("change");
                //OpenItemFindForm(cmbText);
            } else {
                var ItmKy = cmbValue; //$("#HdrSec6_CmbItm_Cd").data("kendoComboBox").value();
                //if (ItmKy != "") {
                var validate = ComboValidations("HdrSec6_CmbItm_Cd");
                {
                    if (validate) {
                        GetItemQty();
                        $("#HdrSec6_CmbItm_Cd").data("kendoComboBox").value(ItmKy);
                        //$("#HdrSec6_CmbItm_Nm").data("kendoComboBox").value(ItmKy);
                        LoadUnitCombo(ItmKy);
                        $("#HdrSec7_InptQty_Val").data("kendoNumericTextBox").value(null);
                        $("#HdrSec7_InptRate_Val").data("kendoNumericTextBox").value(null);
                        $("#HdrSec7_InptDis_Val").data("kendoNumericTextBox").value(null);
                        $("#HdrSec7_InptDisAmt_Val").data("kendoNumericTextBox").value(null);
                        $("#HdrSec8_InptVatAmt_Val").data("kendoNumericTextBox").value(null);
                        $("#HdrSec8_InptVat_Val").data("kendoNumericTextBox").value(null);
                        $("#HdrSec8_InptVatAmt_Val").data("kendoNumericTextBox").value(null);
                        $("#HdrSec9_InptSVAT_Val").data("kendoNumericTextBox").value(null);
                        $("#HdrSec9_InptSVATAmt_Val").data("kendoNumericTextBox").value(null);
                        $("#HdrSec8_InptNBT_Val").data("kendoNumericTextBox").value(null);
                        $("#HdrSec8_InptNBTAmt_Val").data("kendoNumericTextBox").value(null);
                        $("#HdrSec9_InptWHT_Val").data("kendoNumericTextBox").value(null);
                        $("#HdrSec9_InptWHTAmt_Val").data("kendoNumericTextBox").value(null);
                        $("#HdrSec10_InptLiNo_Val").data("kendoNumericTextBox").value(null);
                        $("#HdrSec10_CmbTskId_Cd").data('kendoComboBox').value(null);
                        $("#HdrSec6_CmbUnit_Cd").data('kendoComboBox').value(null);
                        $("#HdrSec6_InptDesc_Val").val(null);
                        $("#HdrSec10_InptRem_Val").val(null);
                    } else {
                        $("#HdrSec6_CmbItm_Cd").data("kendoComboBox").value('');
                       // $("#HdrSec6_CmbItm_Nm").data("kendoComboBox").value('');
                    }
                }
            }
        },
        filter: "startswith",
        //autoBind: false,
        //minLength: 3,        
        suggest: true,
        placeholder: "Select a ItmCd.."
    });

    $("#HdrSec6_CmbItm_Cd").data("kendoComboBox").input.keydown(function (event) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {

            var comboboxText = $("#HdrSec6_CmbItm_Cd").data("kendoComboBox");
            var cmbText = comboboxText.text();

            if ((cmbText == "?") || (cmbText.slice(-1) == "?")) {

                try {
                    var dropdownlist = $("#HdrSec6_CmbItm_Cd").data("kendoDropDownList");
                    dropdownlist.destroy();
                    dropdownlist.wrapper.remove();
                } catch (ex) { }

                try {
                    //var dropdownlist = $("#HdrSec6_CmbItm_Nm").data("kendoDropDownList");
                    //dropdownlist.destroy();
                    //dropdownlist.wrapper.remove();
                } catch (ex) { }

                LoadItmCombo();

                OpenItemFindForm(cmbText);
            } else {
                //$("#HdrSec7_InptQty_Val").data("kendoNumericTextBox").focus();
                //GetRate();
            }
            event.preventDefault();
        }
    });

    //$("#HdrSec6_CmbItm_Nm").kendoComboBox({
    //    dataValueField: "ItmKy",
    //    dataTextField: "ItmNm",
    //    dataSource: ItmNmDatasourceItmTransfer(0, 7000), //ItmNmDatasourceTest(),
    //    change: function (e) {
    //        //var cmb = $("#HdrSec6_CmbItm_Nm").data("kendoComboBox");
    //        //var cmbText = cmb.text();

    //        var comboboxText = $("#HdrSec6_CmbItm_Nm").data("kendoComboBox");
    //        var cmbText = comboboxText.text();
    //        var comboboxValue = $("#HdrSec6_CmbItm_Nm").data("kendoComboBox");
    //        var cmbValue = comboboxValue.value();
    //        //var object = this.dataItem(this.select());

    //        if ((cmbText == "?") || (cmbText.slice(-1) == "?")) {
    //            //$("#HdrSec6_CmbItm_Nm").data("kendoComboBox").value(null);
    //            //$("#HdrSec6_CmbItm_Nm").data("kendoComboBox").trigger("change");
    //            //OpenItemFindForm(cmbText);
    //        } else {
    //            var ItmKy = cmbValue;
    //            //if (ItmKy != "") {
    //            var validate = ComboValidations("HdrSec6_CmbItm_Nm");
    //            {
    //                if (validate) {
    //                    GetItemQty();
    //                    $("#HdrSec6_CmbItm_Cd").data("kendoComboBox").value(ItmKy);
    //                    $("#HdrSec6_CmbItm_Nm").data("kendoComboBox").value(ItmKy);
    //                    LoadUnitCombo(ItmKy);
    //                    $("#HdrSec7_InptQty_Val").data("kendoNumericTextBox").value(null);
    //                    $("#HdrSec7_InptRate_Val").data("kendoNumericTextBox").value(null);
    //                    $("#HdrSec7_InptDis_Val").data("kendoNumericTextBox").value(null);
    //                    $("#HdrSec7_InptDisAmt_Val").data("kendoNumericTextBox").value(null);
    //                    $("#HdrSec8_InptVatAmt_Val").data("kendoNumericTextBox").value(null);
    //                    $("#HdrSec8_InptVat_Val").data("kendoNumericTextBox").value(null);
    //                    $("#HdrSec8_InptVatAmt_Val").data("kendoNumericTextBox").value(null);
    //                    $("#HdrSec9_InptSVAT_Val").data("kendoNumericTextBox").value(null);
    //                    $("#HdrSec9_InptSVATAmt_Val").data("kendoNumericTextBox").value(null);
    //                    $("#HdrSec8_InptNBT_Val").data("kendoNumericTextBox").value(null);
    //                    $("#HdrSec8_InptNBTAmt_Val").data("kendoNumericTextBox").value(null);
    //                    $("#HdrSec9_InptWHT_Val").data("kendoNumericTextBox").value(null);
    //                    $("#HdrSec9_InptWHTAmt_Val").data("kendoNumericTextBox").value(null);
    //                    $("#HdrSec10_InptLiNo_Val").data("kendoNumericTextBox").value(null);
    //                    $("#HdrSec10_CmbTskId_Cd").data('kendoComboBox').value(null);
    //                    $("#HdrSec6_CmbUnit_Cd").data('kendoComboBox').value(null);
    //                } else {
    //                    $("#HdrSec6_CmbItm_Cd").data("kendoComboBox").value('');
    //                    $("#HdrSec6_CmbItm_Nm").data("kendoComboBox").value('');
    //                }
    //            }
    //        }
    //    },
    //    filter: "startswith",
    //    suggest: true,
    //    placeholder: "Select a ItmNm.."
    //});    

    $("#HdrSec6_CmbItm_Cd").keypress(function (event) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {
            event.preventDefault();
        }
    });

    //$("#HdrSec6_CmbItm_Nm").data("kendoComboBox").input.keydown(function (event) {
    //    var keycode = (event.keyCode ? event.keyCode : event.which);
    //    if (keycode == '13') {

    //        var comboboxText = $("#HdrSec6_CmbItm_Nm").data("kendoComboBox");
    //        var cmbText = comboboxText.text();

    //        if ((cmbText == "?") || (cmbText.slice(-1) == "?")) {
    //            try {
    //                var dropdownlist = $("#HdrSec6_CmbItm_Cd").data("kendoDropDownList");
    //                dropdownlist.destroy();
    //                dropdownlist.wrapper.remove();
    //            } catch (ex) { }

    //            try {
    //                var dropdownlist = $("#HdrSec6_CmbItm_Nm").data("kendoDropDownList");
    //                dropdownlist.destroy();
    //                dropdownlist.wrapper.remove();
    //            } catch (ex) { }

    //            LoadItmCombo();

    //            OpenItemFindForm(cmbText);
    //        } else {
    //            $("#HdrSec7_InptQty_Val").data("kendoNumericTextBox").focus();
    //            //GetRate();
    //        }
    //        event.preventDefault();
    //    }
    //});

    //$("#HdrSec6_CmbItm_Nm").keypress(function (event) {
    //    var keycode = (event.keyCode ? event.keyCode : event.which);
    //    if (keycode == '13') {
    //        event.preventDefault();
    //    }
    //});

}



function GetItemQty() {
    //if (viewBag.OurCd != "MatReq") {
    //    return;
    //}
    var ItmKy = $("#HdrSec6_CmbItm_Cd").data("kendoComboBox").value();
    if (!ItmKy || ItmKy == "") {
        return;
    }
    var FrmPrjKy = $("#HdrSec2_CmbFrmPrj_Cd").data("kendoComboBox").value();
    if (!FrmPrjKy || FrmPrjKy == "") {
        FrmPrjKy = 1;
    }
    var FrmLcKy = $("#HdrSec2_CmbFrmLoc_Cd").data("kendoComboBox").value();
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
                document.getElementById('HdrSec6_CmbItmLdd_Lbl').innerHTML = 'Brand :- ' + data.ItmBrnd + 'Avl.Qty ' + data.Qty + 'Bud.Qty :- ' + data.AvlBudgetQty;

            }

        },
        error: function (e) {
            alert("Sorry, We Couldn't retrive the data !\nPlease Try Again!");
            return false;
        }
    });

}

//

function ValidateItemQty() {
    var trn = false;
    //if (viewBag.OurCd != "MatReq") {
    //    return;
    //}
    var ItmKy = $("#HdrSec6_CmbItm_Cd").data("kendoComboBox").value();
    if (!ItmKy || ItmKy == "") {
        return;
    }
    var FrmPrjKy = $("#HdrSec2_CmbFrmPrj_Cd").data("kendoComboBox").value();
    if (!FrmPrjKy || FrmPrjKy == "") {
        FrmPrjKy = 1;
    }
    var FrmLcKy = $("#HdrSec2_CmbFrmLoc_Cd").data("kendoComboBox").value();
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
                // document.getElementById('HdrSec6_CmbItmLdd_Lbl').innerHTML = 'Brand :- ' + data.ItmBrnd + 'Avl.Qty ' + data.Qty + 'Bud.Qty :- ' + data.AvlBudgetQty;
                var EntQty = $("#HdrSec7_InptQty_Val").data("kendoNumericTextBox").value();
                if (data.Qty < EntQty) {
                    alert("Available Qty is " + data.Qty + "you cannot have more than avalable Qty");
                    trn =false;
                } else {
                    trn = true;
                }

            }
            return trn;

        },
        error: function (e) {
            alert("Sorry, We Couldn't retrive the data !\nPlease Try Again!");
            return false;
        }
    });
    return trn;
}


//____Address data source
function AddressCode(ObjNm) {
    var ObjVisible = GetObjVisible(ObjNm);
    if (ObjVisible == 0) {
        return [];
    }
    var ObjKy = GetObjKy(ObjNm);
    var dataSource = new kendo.data.DataSource(
    {
        transport: {
            read: {
                url: urlComboLoad.AdrID_SelectMob,
                data: {
                    ObjKy: ObjKy,
                    'PreKy': "1",                    
                    TrnTypKy: FormGlblData.TrnTypKy,                   
                },
                dataType: "json",
                cache: false
            }
        }

    });
    return dataSource;
}
function AddressName(ObjNm) {
    var ObjVisible = GetObjVisible(ObjNm);
    if (ObjVisible == 0) {
        return [];
    }
    var ObjKy = GetObjKy(ObjNm);
    var dataSource = new kendo.data.DataSource(
    {
        transport: {
            read: {
                url: urlGetAddressNm,
                data: {
                    'ObjKy': ObjKy,
                    'PreKy': "1"
                },

                dataType: "json"
            }
        }

    });
    return dataSource;
}


//____BU data source
function BUCode(ObjNm) {
    var ObjVisible = GetObjVisible(ObjNm);
    if (ObjVisible == 0) {
        return [];
    }
    var ObjKy = GetObjKy(ObjNm);
    var PreKy = 1;
    var dataSource = new kendo.data.DataSource(
    {
        transport: {
            read: {
                url: urlGetBUCode,
                data: {
                    'ObjKy': ObjKy,
                    'PreKy': PreKy,
                },
                dataType: "json"
            }
        }

    });
    return dataSource;
}

function BUDatasource() {
    var dataSource = new kendo.data.DataSource(
      {
          transport: {
              read: {
                  url: urlTransaction.GetBUlist,
                  dataType: "json"
              }
          }
      });
    return dataSource;
}


function dataSrcCreateCodeCdMasLookUp(ObjNm) {

    var ObjKy = GetObjKy(ObjNm);
    var dataSource = new kendo.data.DataSource(
      {
          transport: {
              read: {
                  url: urlComboLoad.Code_SelectMob,
                  data: { ObjKy: ObjKy, TrnTypKy: FormGlblData.TrnTypKy, PreKy: 1 },
                  dataType: "json"
              }
          }
      });
    return dataSource;
}

function dataSrcCreateCdNmCdMasLookUp(ObjNm) {

    var ObjKy = GetObjKy(ObjNm);
    var dataSource = new kendo.data.DataSource(
      {
          transport: {
              read: {
                  url: urlComboLoad.CdNm_SelectMob,
                  data: { ObjKy: ObjKy, TrnTypKy: FormGlblData.TrnTypKy, PreKy: 1 },
                  dataType: "json"
              }
          }
      });
    return dataSource;
}

function DlvToDatasource() {
    var dataSource = new kendo.data.DataSource(
      {
          transport: {
              read: {
                  url: urlTransaction.GetAddress,
                  dataType: "json"
              }
          }
      });
    return dataSource;
}

function GetPrjID_SelectMobDataSource(ObjNm) {
    var ObjKy = GetObjKy(ObjNm);
    //alert(ObjKy);
    var dataSource = new kendo.data.DataSource(
    {
        transport: {
            read: {
                url: urlComboLoad.PrjID_SelectMob,
                data: {
                    ObjKy: ObjKy,
                    TrnTypKy: FormGlblData.TrnTypKy,
                    PreKy: 1
                },
                dataType: "json"
            }
        }
    });
    return dataSource;
}

function GetPrjNm_SelectMobDataSource(ObjNm) {
    var ObjKy = GetObjKy(ObjNm);
    var dataSource = new kendo.data.DataSource(
    {
        transport: {
            read: {
                url: urlComboLoad.PrjNm_SelectMob,
                data: {
                    ObjKy: ObjKy,
                    TrnTypKy: FormGlblData.TrnTypKy,
                    PreKy: 1
                },
                dataType: "json"
            }
        }
    });
    return dataSource;
}

function AccountDatasource() {
    var dataSource = new kendo.data.DataSource(
      {
          transport: {
              read: {
                  url: urlInvoice.GetCusAccountList,
                  dataType: "json"
              }
          }
      });
    return dataSource;
}

function AddressDatasource() {
    var dataSource = new kendo.data.DataSource(
      {
          transport: {
              read: {
                  url: urlTransaction.GetAddressList,
                  dataType: "json"
              }
          }
      });
    return dataSource;
}

function PurAcDatasource() {
    var ConCd = "TrnTyp";
    var OurCd = viewBag.OurCd;
    var dataSource = new kendo.data.DataSource(
      {
          transport: {
              read: {
                  url: urlTransaction.GetPurAcList,
                  data: {
                      ConCd: "TrnTyp",
                      OurCd: viewBag.OurCd
                  },
                  dataType: "json"
              }
          }
      });
    return dataSource;
}

function PmtDatasource() {
    var ConCd = "PmtTrm";

    var dataSource = new kendo.data.DataSource(
      {
          transport: {
              read: {
                  url: urlInvoice.GetPmtList,
                  data: {
                      ConCd: "PmtTrm",
                  },
                  dataType: "json"
              }
          }
      });
    return dataSource;
}

function CurrencyDatasource() {
    var dataSource = new kendo.data.DataSource(
      {
          transport: {
              read: {
                  url: urlInvoice.GetCurrencyList,

                  dataType: "json"
              }
          }
      });
    return dataSource;
}


function ItmCdDatasourceTest() {
    var dataSource = new kendo.data.DataSource(
      {
          transport: {
              read: {
                  url: urlTransaction.ItmCd_SelectWeb,
                  data: {
                      OurCd: 'Material',
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
                  url: urlTransaction.ItmNm_SelectWeb,
                  data: {
                      OurCd: 'Material',
                      ConCd: 'ItmTyp'
                  },
                  dataType: "json"
              }
          }
      });
    return dataSource;
}

function UnitDatasource(ItmKy) {
    var dataSource = new kendo.data.DataSource(
      {
          transport: {
              read: {
                  url: urlTransaction.GetItemMultiUnits,
                  data: {
                      ItmKy: ItmKy,
                      trnTypKy: FormGlblData.TrnTypKy
                  },
                  dataType: "json"
              }
          }
      });
    return dataSource;
}

function TaskDatasource(PrjKy) {
    var dataSource = new kendo.data.DataSource(
      {
          transport: {
              read: {
                  url: urlTransaction.GetTaskList,
                  data: {
                      PrjKy: PrjKy
                  },
                  dataType: "json"
              }
          }
      });
    return dataSource;
}

function AdrID_SelectMob_DataSourceWithTrnTyp(ObjNm, PreKy) {

    var ObjVisible = GetObjVisible(ObjNm);
    if (ObjVisible == 0) {
        return [];
    }

    if (isNaN(PreKy))
        return [];

    var ObjKy = GetObjKy(ObjNm);
    //alert(ObjKy);
    var dataSource = new kendo.data.DataSource(
    {
        transport: {
            read: {
                url: urlComboLoad.AdrID_SelectMob,//'/Home/GetProjectListByPrntKy',//'@Url.Content("~/Home/GetProjectListByPrntKy")',
                data: {
                    ObjKy: ObjKy,
                    TrnTypKy: FormGlblData.TrnTypKy,
                    PreKy: PreKy
                },
                dataType: "json"
            }
        }
    });
    return dataSource;
}

function AdrNm_SelectMob_DataSourceWithTrnTyp(ObjNm, PreKy) {

    var ObjVisible = GetObjVisible(ObjNm);
    if (ObjVisible == 0) {
        return [];
    }

    if (isNaN(PreKy))
        return [];

    var ObjKy = GetObjKy(ObjNm);
    var dataSource = new kendo.data.DataSource(
    {
        transport: {
            read: {
                url: urlComboLoad.AdrNm_SelectMob,//'/Home/GetProjectListByPrntKy',//'@Url.Content("~/Home/GetProjectListByPrntKy")',
                data: {
                    ObjKy: ObjKy,
                    TrnTypKy: FormGlblData.TrnTypKy,
                    PreKy: PreKy
                },
                dataType: "json"
            }
        }
    });
    return dataSource;
}

function LoadAdrComboByAcc(AccKy) {

    $("#HdrSec2_CmbAdr_Cd").kendoComboBox({
        dataValueField: "AdrKy",
        dataTextField: "AdrID",
        dataSource: AdrByAccDatasource(AccKy),
        change: function (e) {
            var cmb = $("#HdrSec2_CmbAdr_Cd").data("kendoComboBox");
            var AdrKy = cmb.value();
            if (AdrKy != "") {
                var validate = ComboValidations("HdrSec2_CmbAdr_Cd");
                if (validate) {
                    $("#HdrSec2_CmbAdr_Cd").data("kendoComboBox").value(AdrKy);
                    FormGlblData.IsDetailRelatedHdrSectionChanged = true;
                    setDefault();
                } else {
                   // $("#HdrSec2_CmbAdr_Nm").data("kendoComboBox").value('');
                }
            }
        },
        filter: "contains",
        suggest: true,
        placeholder: "Select a Address.."
    });

    //$("#HdrSec2_CmbAdr_Nm").kendoComboBox({
    //    dataValueField: "AdrKy",
    //    dataTextField: "AdrNm",
    //    dataSource: AdrByAccDatasource(AccKy),
    //    change: function (e) {
    //        var cmb = $("#HdrSec2_CmbAdr_Nm").data("kendoComboBox");
    //        var AdrKy = cmb.value();
    //        if (AdrKy != "") {
    //            var validate = ComboValidations("HdrSec2_CmbAdr_Nm");
    //            if (validate) {
    //                $("#HdrSec2_CmbAdr_Cd").data("kendoComboBox").value(AdrKy);
    //                FormGlblData.IsDetailRelatedHdrSectionChanged = true;
    //                setDefault();
    //            } else {
    //                $("#HdrSec2_CmbAdr_Cd").data("kendoComboBox").value('');
    //            }
    //        }
    //    },
    //    filter: "contains",
    //    suggest: true,
    //    placeholder: "Select a Address.."
    //});

    $("#HdrSec2_CmbAdr_Cd").parent().css('width', "40%");
   // $("#HdrSec2_CmbAdr_Nm").parent().css('width', "58%");
}

function SetAdrKyByLocky(LocKy, Where) {

    $.ajax({
        url: urlTransaction.GetAdrKyByLocKy,
        dataType: "json",
        type: "POST",
        data: JSON.stringify({
            FrmLocKy: LocKy
        }),
        contentType: 'application/json; charset=utf-8',
        success: function (AdrKy) {
            if (Where == "From") {
                $("#HdrSec2_CmbFrmAdr_Cd").data("kendoComboBox").value(AdrKy);
               // $("#HdrSec2_CmbFrmAdr_Nm").data("kendoComboBox").value(AdrKy);
            } else if (Where == "To") {
                $("#HdrSec2_CmbToAdr_Cd").data("kendoComboBox").value(AdrKy);
               // $("#HdrSec2_CmbToAdr_Nm").data("kendoComboBox").value(AdrKy);
            }
        },
        error: function (e) { }
    });
}

function LoadAdrCombo() {

    var PreKy = 1;

    $("#HdrSec2_CmbFrmAdr_Cd").kendoComboBox({
        dataValueField: "AdrKy",
        dataTextField: "AdrID",
        dataSource: AdrID_SelectMob_DataSourceWithTrnTyp('HdrSec2_CmbFrmAdr', PreKy),
        change: function (e) {
            var cmb = $("#HdrSec2_CmbFrmAdr_Cd").data("kendoComboBox");
            var CdKy = cmb.value();
            if (CdKy != "") {
                var validate = ComboValidations("HdrSec2_CmbFrmAdr_Cd");
                if (validate) {
                   // $("#HdrSec2_CmbFrmAdr_Nm").data("kendoComboBox").value(CdKy);
                    FormGlblData.IsDetailRelatedHdrSectionChanged = true;
                } else {
                   // $("#HdrSec2_CmbFrmAdr_Cd").data("kendoComboBox").value('');
                }
            }
        },
        filter: "contains",
        suggest: true,
        placeholder: "Select a From Address.."
    });

    //$("#HdrSec2_CmbFrmAdr_Nm").kendoComboBox({
    //    dataValueField: "AdrKy",
    //    dataTextField: "AdrNm",
    //    dataSource: AdrNm_SelectMob_DataSourceWithTrnTyp('HdrSec2_CmbFrmAdr', PreKy),
    //    change: function (e) {
    //        var cmb = $("#HdrSec2_CmbFrmAdr_Nm").data("kendoComboBox");
    //        var CdKy = cmb.value();
    //        if (CdKy != "") {
    //            var validate = ComboValidations("HdrSec2_CmbFrmAdr_Nm");
    //            if (validate) {
    //                $("#HdrSec2_CmbFrmAdr_Cd").data("kendoComboBox").value(CdKy);
    //                FormGlblData.IsDetailRelatedHdrSectionChanged = true;
    //            } else {
    //                $("#HdrSec2_CmbFrmAdr_Nm").data("kendoComboBox").value('');
    //            }
    //        }
    //    },
    //    filter: "contains",
    //    suggest: true,
    //    placeholder: "Select a From Address.."
    //});

    $("#HdrSec2_CmbToAdr_Cd").kendoComboBox({
        dataValueField: "AdrKy",
        dataTextField: "AdrID",
        dataSource: AdrID_SelectMob_DataSourceWithTrnTyp('HdrSec2_CmbToAdr', PreKy),
        change: function (e) {
            var cmb = $("#HdrSec2_CmbToAdr_Cd").data("kendoComboBox");
            var CdKy = cmb.value();
            if (CdKy != "") {
                var validate = ComboValidations("HdrSec2_CmbToAdr_Cd");
                if (validate) {
                   // $("#HdrSec2_CmbToAdr_Nm").data("kendoComboBox").value(CdKy);
                    FormGlblData.IsDetailRelatedHdrSectionChanged = true;
                } else {
                    $("#HdrSec2_CmbToAdr_Cd").data("kendoComboBox").value('');
                }
            }
        },
        filter: "contains",
        suggest: true,
        placeholder: "Select a To Address.."
    });

    //$("#HdrSec2_CmbToAdr_Nm").kendoComboBox({
    //    dataValueField: "AdrKy",
    //    dataTextField: "AdrNm",
    //    dataSource: AdrNm_SelectMob_DataSourceWithTrnTyp('HdrSec2_CmbToAdr', PreKy),
    //    change: function (e) {
    //        var cmb = $("#HdrSec2_CmbToAdr_Nm").data("kendoComboBox");
    //        var CdKy = cmb.value();
    //        if (CdKy != "") {
    //            var validate = ComboValidations("HdrSec2_CmbToAdr_Nm");
    //            if (validate) {
    //                $("#HdrSec2_CmbToAdr_Cd").data("kendoComboBox").value(CdKy);
    //                FormGlblData.IsDetailRelatedHdrSectionChanged = true;
    //            } else {
    //                $("#HdrSec2_CmbToAdr_Nm").data("kendoComboBox").value('');
    //            }
    //        }
    //    },
    //    filter: "contains",
    //    suggest: true,
    //    placeholder: "Select a To Address.."
    //});
}


function LoadTaskCombo(PrjKy) {
    $("#HdrSec10_CmbTskId_Cd").kendoComboBox({
        dataValueField: "TaskKy",
        dataTextField: "TaskId",
        dataSource: TaskDatasource(PrjKy),
        change: function (e) {
            var validate = ComboValidations("HdrSec10_CmbTskId_Cd");
        },
        filter: "startswith",
        suggest: true,
        placeholder: "Select a ItmCd.."
    });

    $("#HdrSec10_CmbTskId_Cd").data("kendoComboBox").input.keypress(function (event) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {
            var LiNo = $("#HdrSec10_InptLiNo_Val").data("kendoNumericTextBox").value();
            if (LiNo == 0 || LiNo == null || LiNo == undefined) {
                setItmDetailbyEnterky();
            } else {
                changeItemRalatedTotal();
            }
            event.preventDefault();
        }
    });

    $("#HdrSec10_CmbTskId_Cd").keypress(function (event) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {
            event.preventDefault();
        }
    });
}

function LoadUnitCombo(ItmKy) {
    $("#HdrSec6_CmbUnit_Cd").kendoComboBox({
        dataValueField: "UnitKy",
        dataTextField: "Unit",
        dataSource: UnitDatasource(ItmKy),
        change: function (e) {
            var validate = ComboValidations("HdrSec6_CmbUnit_Cd");
        },
        filter: "startswith",
        suggest: true,
        placeholder: "Select a ItmCd.."
    });
    $("#HdrSec6_CmbUnit_Cd").data("kendoComboBox").input.keypress(function (event) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {
            var LiNo = $("#HdrSec10_InptLiNo_Val").data("kendoNumericTextBox").value();
            if (LiNo == 0 || LiNo == null || LiNo == undefined) {
                setItmDetailbyEnterky();
            } else {
                changeItemRalatedTotal();
            }
            event.preventDefault();
        }
    });

    $("#HdrSec6_CmbUnit_Cd").keypress(function (event) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {
            event.preventDefault();
        }
    });
}

function Anly3Datasource() {
    var dataSource = new kendo.data.DataSource(
      {
          transport: {
              read: {
                  url: urlTransaction.GetAnlTyp,
                  data: {
                      ConCd: "AnlTyp3"
                  },
                  dataType: "json"
              }
          }
      });
    return dataSource;
}
function ToProjectDatasource() {
    var dataSource = new kendo.data.DataSource(
      {
          transport: {
              read: {
                  url: urlTransaction.GetToProjectList,
                  dataType: "json"
              }
          }
      });
    return dataSource;
}

function LoadCombo() {

    LoadItmCombo();

    $("#HdrSec6_CmbAnal_Cd").kendoComboBox({
        dataValueField: "CdKy",
        dataTextField: "Code",
        dataSource: Anly3Datasource(),
        change: function (e) {
            var validate = ComboValidations("HdrSec6_CmbAnal_Cd");
        },
        filter: "startswith",
        suggest: true,
        placeholder: "Select a Analysis.."
    });

    $("#HdrSec6_CmbAnal_Cd").data("kendoComboBox").input.keypress(function (event) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {
            var LiNo = $("#HdrSec10_InptLiNo_Val").data("kendoNumericTextBox").value();
            if (LiNo == 0 || LiNo == null || LiNo == undefined) {
                setItmDetailbyEnterky();
            } else {
                changeItemRalatedTotal();
            }
            event.preventDefault();
        }
    });

    $("#HdrSec6_CmbAnal_Cd").keypress(function (event) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {
            event.preventDefault();
        }
    });

    $("#HdrSec3_CmbPmtTerm_Cd").kendoComboBox({
        dataValueField: "CdKy",
        dataTextField: "Code",
        dataSource: PmtDatasource(),
        filter: "contains",
        suggest: true,
        change: function (e) {
            var validate = ComboValidations("HdrSec3_CmbPmtTerm_Cd");
        },
        placeholder: "Select a Perment Terms.."
    });

    $("#HdrSec3_CmbCurrency_Cd").kendoComboBox({
        dataValueField: "CdKy",
        dataTextField: "Code",
        dataSource: CurrencyDatasource(),
        change: function (e) {
            var validate = ComboValidations("HdrSec3_CmbCurrency_Cd");
        },
        filter: "contains",
        suggest: true,
        placeholder: "Select a Currency.."
    });

    $("#HdrSec2_CmbFrmPrj_Cd").kendoComboBox({
        dataValueField: "PrjKy",
        dataTextField: "PrjId",
        dataSource: GetPrjID_SelectMobDataSource('HdrSec2_CmbFrmPrj'),
        change: function (e) {
            var cmb = $("#HdrSec2_CmbFrmPrj_Cd").data("kendoComboBox");
            var prjky = cmb.value();
            if (prjky != "") {
                var validate = ComboValidations("HdrSec2_CmbFrmPrj_Cd");
                if (validate) {
                  //  $("#HdrSec2_CmbFrmPrj_Nm").data("kendoComboBox").value(prjky);
                    FormGlblData.IsDetailRelatedHdrSectionChanged = true;
                    sendPrjKy();
                    LoadTaskCombo(prjky)
                } else {
                    //$("#HdrSec2_CmbFrmPrj_Nm").data("kendoComboBox").value('');
                }
            }
        },
        filter: "contains",
        suggest: true,
        placeholder: "Select a From Project.."
    });


    //$("#HdrSec2_CmbFrmPrj_Nm").kendoComboBox({
    //    dataValueField: "PrjKy",
    //    dataTextField: "PrjNm",
    //    dataSource: GetPrjNm_SelectMobDataSource('HdrSec2_CmbFrmPrj'),
    //    change: function (e) {
    //        var cmb = $("#HdrSec2_CmbFrmPrj_Nm").data("kendoComboBox");
    //        var prjky = cmb.value();
    //        if (prjky != "") {
    //            var validate = ComboValidations("HdrSec2_CmbFrmPrj_Nm");
    //            if (validate) {
    //                $("#HdrSec2_CmbFrmPrj_Cd").data("kendoComboBox").value(prjky);
    //                FormGlblData.IsDetailRelatedHdrSectionChanged = true;
    //                sendPrjKy();
    //                LoadTaskCombo(prjky)
    //            } else {
    //                $("#HdrSec2_CmbFrmPrj_Nm").data("kendoComboBox").value('');
    //            }
    //        }
    //    },
    //    filter: "contains",
    //    suggest: true,
    //    placeholder: "Select a From Project.."
    //});

    $("#HdrSec2_CmbToPrj_Cd").kendoComboBox({
        dataValueField: "PrjKy",
        dataTextField: "PrjId",
        dataSource: GetPrjID_SelectMobDataSource('HdrSec2_CmbToPrj'),
        change: function (e) {
            var cmb = $("#HdrSec2_CmbToPrj_Cd").data("kendoComboBox");
            var prjky = cmb.value();
            if (prjky != "") {
                var validate = ComboValidations("HdrSec2_CmbToPrj_Cd");
                if (validate) {
                   // $("#HdrSec2_CmbToPrj_Nm").data("kendoComboBox").value(prjky);
                    FormGlblData.IsDetailRelatedHdrSectionChanged = true;
                } else {
                  //  $("#HdrSec2_CmbToPrj_Nm").data("kendoComboBox").value('');
                }
            }
        },
        filter: "contains",
        suggest: true,
        placeholder: "Select a To Project.."
    });

    //$("#HdrSec2_CmbToPrj_Nm").kendoComboBox({
    //    dataValueField: "PrjKy",
    //    dataTextField: "PrjNm",
    //    dataSource: GetPrjNm_SelectMobDataSource('HdrSec2_CmbToPrj'),
    //    change: function (e) {
    //        var cmb = $("#HdrSec2_CmbToPrj_Nm").data("kendoComboBox");
    //        var prjky = cmb.value();
    //        if (prjky != "") {
    //            var validate = ComboValidations("HdrSec2_CmbToPrj_Nm");
    //            if (validate) {
    //                $("#HdrSec2_CmbToPrj_Cd").data("kendoComboBox").value(prjky);
    //                FormGlblData.IsDetailRelatedHdrSectionChanged = true;
    //            } else {
    //                $("#HdrSec2_CmbToPrj_Nm").data("kendoComboBox").value('');
    //            }
    //        }
    //    },
    //    filter: "contains",
    //    suggest: true,
    //    placeholder: "Select a To Project.."
    //});

    LoadAdrCombo();

    $("#HdrSec2_CmbFrmLoc_Cd").kendoComboBox({
        dataValueField: "CdKy",
        dataTextField: "Code",
        dataSource: dataSrcCreateCodeCdMasLookUp('HdrSec2_CmbFrmLoc'),
        change: function (e) {
            var cmb = $("#HdrSec2_CmbFrmLoc_Cd").data("kendoComboBox");
            var CdKy = cmb.value();
            if (CdKy != "") {
                var validate = ComboValidations("HdrSec2_CmbFrmLoc_Cd");
                if (validate) {
                   // $("#HdrSec2_CmbFrmLoc_Nm").data("kendoComboBox").value(CdKy);
                    SetAdrKyByLocky(CdKy, "From");
                    FormGlblData.IsDetailRelatedHdrSectionChanged = true;
                } else {
                   // $("#HdrSec2_CmbFrmLoc_Nm").data("kendoComboBox").value('');
                }
            }
        },
        filter: "contains",
        suggest: true,
        placeholder: "Select a From Location.."
    });

    //$("#HdrSec2_CmbFrmLoc_Nm").kendoComboBox({
    //    dataValueField: "CdKy",
    //    dataTextField: "CdNm",
    //    dataSource: dataSrcCreateCdNmCdMasLookUp('HdrSec2_CmbFrmLoc'),
    //    change: function (e) {
    //        var cmb = $("#HdrSec2_CmbFrmLoc_Nm").data("kendoComboBox");
    //        var CdKy = cmb.value();
    //        if (CdKy != "") {
    //            var validate = ComboValidations("HdrSec2_CmbFrmLoc_Nm");
    //            if (validate) {
    //                $("#HdrSec2_CmbFrmLoc_Cd").data("kendoComboBox").value(CdKy);
    //                SetAdrKyByLocky(CdKy, "From");
    //                FormGlblData.IsDetailRelatedHdrSectionChanged = true;
    //            } else {
    //                $("#HdrSec2_CmbFrmLoc_Nm").data("kendoComboBox").value('');
    //            }
    //        }
    //    },
    //    filter: "contains",
    //    suggest: true,
    //    placeholder: "Select a From Location.."
    //});

    $("#HdrSec2_CmbToLoc_Cd").kendoComboBox({
        dataValueField: "CdKy",
        dataTextField: "Code",
        dataSource: dataSrcCreateCodeCdMasLookUp('HdrSec2_CmbToLoc'),
        change: function (e) {
            var cmb = $("#HdrSec2_CmbToLoc_Cd").data("kendoComboBox");
            var CdKy = cmb.value();
            if (CdKy != "") {
                var validate = ComboValidations("HdrSec2_CmbToLoc_Cd");
                if (validate) {
                    //$("#HdrSec2_CmbToLoc_Nm").data("kendoComboBox").value(CdKy);
                    SetAdrKyByLocky(CdKy, "To");
                    FormGlblData.IsDetailRelatedHdrSectionChanged = true;
                } else {
                    $("#HdrSec2_CmbToLoc_Cd").data("kendoComboBox").value('');
                }
            }
        },
        filter: "contains",
        suggest: true,
        placeholder: "Select a To Location.."
    });

    //$("#HdrSec2_CmbToLoc_Nm").kendoComboBox({
    //    dataValueField: "CdKy",
    //    dataTextField: "CdNm",
    //    dataSource: dataSrcCreateCdNmCdMasLookUp('HdrSec2_CmbToLoc'),
    //    change: function (e) {
    //        var cmb = $("#HdrSec2_CmbToLoc_Nm").data("kendoComboBox");
    //        var CdKy = cmb.value();
    //        if (CdKy != "") {
    //            var validate = ComboValidations("HdrSec2_CmbToLoc_Nm");
    //            if (validate) {
    //                $("#HdrSec2_CmbToLoc_Cd").data("kendoComboBox").value(CdKy);
    //                SetAdrKyByLocky(CdKy, "To");
    //                FormGlblData.IsDetailRelatedHdrSectionChanged = true;
    //            } else {
    //                $("#HdrSec2_CmbToLoc_Nm").data("kendoComboBox").value('');
    //            }
    //        }
    //    },
    //    filter: "contains",
    //    suggest: true,
    //    placeholder: "Select a To Location.."
    //});


    $("#cmbSlsACId").kendoComboBox({
        dataValueField: "AccKy",
        dataTextField: "AccCd",
        dataSource: PurAcDatasource(),
        change: function (e) {
            var cmb = $("#cmbSlsACId").data("kendoComboBox");
            var AccKy = cmb.value();
            if (AccKy != "") {
                var validate = ComboValidations("cmbSlsACId");
                if (validate) {
                    $("#cmbSlsACId").data("kendoComboBox").value(AccKy);
                    FormGlblData.IsDetailRelatedHdrSectionChanged = true;
                } else {
                    $("#cmbSlsACId").data("kendoComboBox").value('');
                }
            }
        },
        filter: "contains",
        suggest: true,
        placeholder: "Select a Purchase A/C.."
    });

    $("#cmbSlsACCd").kendoComboBox({
        dataValueField: "AccKy",
        dataTextField: "AccNm",
        dataSource: PurAcDatasource(),
        change: function (e) {
            var cmb = $("#cmbSlsACCd").data("kendoComboBox");
            var AccKy = cmb.value();
            if (AccKy != "") {
                var validate = ComboValidations("cmbSlsACCd");
                if (validate) {
                    $("#cmbSlsACCd").data("kendoComboBox").value(AccKy);
                    FormGlblData.IsDetailRelatedHdrSectionChanged = true;
                } else {
                    $("#cmbSlsACCd").data("kendoComboBox").value('');
                }
            }
        },
        filter: "contains",
        suggest: true,
        placeholder: "Select a Purchase A/C.."
    });


    $("#HdrSec2_CmbAcc_Cd").kendoComboBox({
        dataValueField: "AccKy",
        dataTextField: "AccCd",
        dataSource: AccountDatasource(),
        change: function (e) {
            var cmb = $("#HdrSec2_CmbAcc_Cd").data("kendoComboBox");
            var AccKy = cmb.value();
            if (AccKy != "") {
                var validate = ComboValidations("HdrSec2_CmbAcc_Cd");
                if (validate) {
                   // $("#HdrSec2_CmbAcc_Nm").data("kendoComboBox").value(AccKy);
                    FormGlblData.IsDetailRelatedHdrSectionChanged = true;
                    LoadAdrComboByAcc(AccKy);
                    setDefault();
                } else {
                  //  $("#HdrSec2_CmbAcc_Nm").data("kendoComboBox").value('');
                }
            }
        },
        filter: "contains",
        suggest: true,
        placeholder: "Select a Accounts.."
    });

    //$("#HdrSec2_CmbAcc_Nm").kendoComboBox({
    //    dataValueField: "AccKy",
    //    dataTextField: "AccNm",
    //    dataSource: AccountDatasource(),
    //    change: function (e) {
    //        var cmb = $("#HdrSec2_CmbAcc_Nm").data("kendoComboBox");
    //        var AccKy = cmb.value();
    //        if (AccKy != "") {
    //            var validate = ComboValidations("HdrSec2_CmbAcc_Nm");
    //            if (validate) {
    //                $("#HdrSec2_CmbAcc_Nm").data("kendoComboBox").value(AccKy);
    //                FormGlblData.IsDetailRelatedHdrSectionChanged = true;
    //                GetAdrKyByAccKy(AccKy);
    //                setDefault();
    //            } else {
    //                $("#HdrSec2_CmbAcc_Nm").data("kendoComboBox").value('');
    //            }
    //        }
    //    },
    //    filter: "contains",
    //    suggest: true,
    //    placeholder: "Select a Accounts.."
    //});

    $("#HdrSec6_CmbItm_Cd").parent().css('width', "58%");
    //$("#HdrSec6_CmbItm_Nm").parent().css('width', "58%");
    $("#HdrSec2_CmbFrmPrj_Cd").parent().css('width', "40%");
    $("#HdrSec2_CmbToPrj_Cd").parent().css('width', "40%");
    $("#cmbDeliTo").parent().css('width', "40%");
    $("#HdrSec3_CmbPmtTerm_Cd").parent().css('width', "100%");
    $("#HdrSec3_CmbCurrency_Cd").parent().css('width', "100%");
    $("#cmbBUId").parent().css('width', "40%");
    $("#cmbBUCd").parent().css('width', "58%");
    $("#cmbSlsACId").parent().css('width', "40%");
    $("#cmbSlsACCd").parent().css('width', "58%");
    $("#HdrSec2_CmbFrmLoc_Cd").parent().css('width', "40%");
    $("#HdrSec2_CmbToLoc_Cd").parent().css('width', "40%");
    //$("#HdrSec2_CmbFrmPrj_Nm").parent().css('width', "58%");
    //$("#HdrSec2_CmbToPrj_Nm").parent().css('width', "58%");
    $("#HdrSec2_CmbAcc_Cd").parent().css('width', "40%");
    //$("#HdrSec2_CmbAcc_Nm").parent().css('width', "58%");
    //$("#HdrSec2_CmbFrmLoc_Nm").parent().css('width', "58%");
    //$("#HdrSec2_CmbToLoc_Nm").parent().css('width', "58%");
    $("#HdrSec8_InptVat_Val").css('width', "100%");
    $("#HdrSec8_InptVatAmt_Val").css('width', "100%");
    $("#HdrSec9_InptSVAT_Val").css('width', "100%");
    $("#HdrSec9_InptSVATAmt_Val").css('width', "100%");
    $("#HdrSec8_InptNBT_Val").css('width', "100%");
    $("#HdrSec8_InptNBTAmt_Val").css('width', "100%");
    $("#HdrSec9_InptWHT_Val").css('width', "100%");
    $("#HdrSec9_InptWHTAmt_Val").css('width', "100%");
    $("#HdrSec6_CmbUnit_Cd").css('width', "100%");
    $("#HdrSec6_CmbAnal_Cd").parent().css('width', "100%");
    $("#HdrSec10_CmbTskId_Cd").css('width', "100%");
    $("#HdrSec10_InptLiNo_Val").css('width', "100%");

    //------------------ Find_Form_Combo_Load start -----------
    //$("#HdrSec16_Cmb_FF_AprStatesAction_Val")
    //   .kendoComboBox({
    //       dataTextField: "CdNm",
    //       dataValueField: "CdKy",
    //       // dataSource: DetailAccountNmload('HdrSec16_Cmb_FF_AprStatesAction'),// need some modifications
    //       dataSource: AprStsNm_SelectWeb(),
    //       filter: "contains",
    //       suggest: true,
    //       placeholder: "Status"
    //   })

    $("#HdrSec16_Cmb_FF_TrnNo_Cd")
   .kendoComboBox({
       dataValueField: "CdKy",
       dataTextField: "Code",
       dataSource: BUCode('HdrSec16_Cmb_FF_TrnNo'),
       change: function (e) {
           var cmb = $("#HdrSec16_Cmb_FF_TrnNo_Cd").data("kendoComboBox");
           var val = cmb.value();
           var validate = ComboValidations("HdrSec16_Cmb_FF_TrnNo_Cd");
       },
       filter: "startswith",
       suggest: true,
       placeholder: "Prefix"
   })

    $("#HdrSec16_Cmb_FF_HdrAdr_Cd")
         .kendoComboBox({
             dataValueField: "AdrKy",
             dataTextField: "AdrID",
             dataSource: AddressCode('HdrSec16_Cmb_FF_HdrAdr'),
             change: function (e) {
                 var cmb = $("#HdrSec16_Cmb_FF_HdrAdr_Cd").data("kendoComboBox");
                 var prjky = cmb.value();
                 if (prjky != "") {
                     var validate = ComboValidations("HdrSec16_Cmb_FF_HdrAdr_Cd");
                     if (validate) {
                        // $("#HdrSec16_Cmb_FF_HdrAdr_Nm").data("kendoComboBox").value(prjky);
                     } else {
                        // $("#HdrSec16_Cmb_FF_HdrAdr_Nm").data("kendoComboBox").value('');
                         $("#HdrSec16_Cmb_FF_HdrAdr_Cd").data("kendoComboBox").value('');
                     }
                 }
             },
             filter: "contains",
             suggest: true,
             placeholder: "Address"
         })
    //$("#HdrSec16_Cmb_FF_HdrAdr_Nm")
    //    .kendoComboBox({
    //        dataValueField: "AdrKy",
    //        dataTextField: "AdrNM",
    //        dataSource: AddressName('HdrSec16_Cmb_FF_HdrAdr'),
    //        change: function (e) {
    //            var cmb = $("#HdrSec16_Cmb_FF_HdrAdr_Nm").data("kendoComboBox");
    //            var prjky = cmb.value();
    //            if (prjky != "") {
    //                var validate = ComboValidations("HdrSec16_Cmb_FF_HdrAdr_Nm");
    //                if (validate) {
    //                    $("#HdrSec16_Cmb_FF_HdrAdr_Cd").data("kendoComboBox").value(prjky);
    //                } else {
    //                    $("#HdrSec16_Cmb_FF_HdrAdr_Cd").data("kendoComboBox").value('');
    //                    $("#HdrSec16_Cmb_FF_HdrAdr_Nm").data("kendoComboBox").value('');
    //                }
    //            }
    //        },
    //        filter: "contains",
    //        suggest: true,
    //        placeholder: "Address"
    //    })
    $("#HdrSec16_Cmb_FF_ToPrj_Cd").kendoComboBox({
        dataValueField: "PrjKy",
        dataTextField: "PrjId",
        dataSource: GetPrjID_SelectMobDataSource('HdrSec16_Cmb_FF_ToPrj'),
        change: function (e) {
            var cmb = $("#HdrSec16_Cmb_FF_ToPrj_Cd").data("kendoComboBox");
            var prjky = cmb.value();
            if (prjky != "") {
                var validate = ComboValidations("HdrSec16_Cmb_FF_ToPrj_Cd");
                if (validate) {
                  //  $("#HdrSec16_Cmb_FF_ToPrj_Nm").data("kendoComboBox").value(prjky);
                } else {
                   // $("#HdrSec16_Cmb_FF_ToPrj_Nm").data("kendoComboBox").value('');
                    $("#HdrSec16_Cmb_FF_ToPrj_Cd").data("kendoComboBox").value('');
                }
            }
        },
        filter: "contains",
        suggest: true,
        placeholder: "To Project"
    });

    //$("#HdrSec16_Cmb_FF_ToPrj_Nm").kendoComboBox({
    //    dataValueField: "PrjKy",
    //    dataTextField: "PrjNm",
    //    dataSource: GetPrjNm_SelectMobDataSource('HdrSec16_Cmb_FF_ToPrj'),
    //    change: function (e) {
    //        var cmb = $("#HdrSec16_Cmb_FF_ToPrj_Nm").data("kendoComboBox");
    //        var prjky = cmb.value();
    //        if (prjky != "") {
    //            var validate = ComboValidations("HdrSec16_Cmb_FF_ToPrj_Nm");
    //            if (validate) {
    //                $("#HdrSec16_Cmb_FF_ToPrj_Cd").data("kendoComboBox").value(prjky);
    //            } else {
    //                $("#HdrSec16_Cmb_FF_ToPrj_Nm").data("kendoComboBox").value('');
    //                $("#HdrSec16_Cmb_FF_ToPrj_Cd").data("kendoComboBox").value('');
    //            }
    //        }
    //    },
    //    filter: "contains",
    //    suggest: true,
    //    placeholder: "To Project"
    //});

    $("#HdrSec16_Cmb_FF_FrmPrj_Cd").kendoComboBox({
        dataValueField: "PrjKy",
        dataTextField: "PrjId",
        dataSource: GetPrjID_SelectMobDataSource('HdrSec16_Cmb_FF_FrmPrj'),
        change: function (e) {
            var cmb = $("#HdrSec16_Cmb_FF_FrmPrj_Cd").data("kendoComboBox");
            var prjky = cmb.value();
            if (prjky != "") {
                var validate = ComboValidations("HdrSec16_Cmb_FF_FrmPrj_Cd");
                if (validate) {
                  //  $("#HdrSec16_Cmb_FF_FrmPrj_Nm").data("kendoComboBox").value(prjky);
                } else {
                   // $("#HdrSec16_Cmb_FF_FrmPrj_Nm").data("kendoComboBox").value('');
                    $("#HdrSec16_Cmb_FF_FrmPrj_Cd").data("kendoComboBox").value('');
                }
            }
        },
        filter: "contains",
        suggest: true,
        placeholder: "From Project"
    });

    //$("#HdrSec16_Cmb_FF_FrmPrj_Nm").kendoComboBox({
    //    dataValueField: "PrjKy",
    //    dataTextField: "PrjNm",
    //    dataSource: GetPrjNm_SelectMobDataSource('HdrSec16_Cmb_FF_FrmPrj'),
    //    change: function (e) {
    //        var cmb = $("#HdrSec16_Cmb_FF_FrmPrj_Nm").data("kendoComboBox");
    //        var prjky = cmb.value();
    //        if (prjky != "") {
    //            var validate = ComboValidations("HdrSec16_Cmb_FF_FrmPrj_Nm");
    //            if (validate) {
    //                $("#HdrSec16_Cmb_FF_FrmPrj_Cd").data("kendoComboBox").value(prjky);
    //            } else {
    //                $("#HdrSec16_Cmb_FF_FrmPrj_Nm").data("kendoComboBox").value('');
    //                $("#HdrSec16_Cmb_FF_FrmPrj_Cd").data("kendoComboBox").value('');
    //            }
    //        }
    //    },
    //    filter: "contains",
    //    suggest: true,
    //    placeholder: "From Project"
    //});


    $("#HdrSec16_Cmb_FF_FrmLoc_Cd").kendoComboBox({
        dataValueField: "CdKy",
        dataTextField: "Code",
        dataSource: dataSrcCreateCodeCdMasLookUp('HdrSec16_Cmb_FF_FrmLoc'),
        change: function (e) {
            var cmb = $("#HdrSec16_Cmb_FF_FrmLoc_Cd").data("kendoComboBox");
            var CdKy = cmb.value();
            if (CdKy != "") {
                var validate = ComboValidations("HdrSec16_Cmb_FF_FrmLoc_Cd");
                if (validate) {
                  //  $("#HdrSec16_Cmb_FF_FrmLoc_Nm").data("kendoComboBox").value(CdKy);
                } else {
                    //$("#HdrSec16_Cmb_FF_FrmLoc_Nm").data("kendoComboBox").value('');
                    $("#HdrSec16_Cmb_FF_FrmLoc_Cd").data("kendoComboBox").value('');
                }
            }
        },
        filter: "contains",
        suggest: true,
        placeholder: "From Location"
    });

    //$("#HdrSec16_Cmb_FF_FrmLoc_Nm").kendoComboBox({
    //    dataValueField: "CdKy",
    //    dataTextField: "CdNm",
    //    dataSource: dataSrcCreateCdNmCdMasLookUp('HdrSec16_Cmb_FF_FrmLoc'),
    //    change: function (e) {
    //        var cmb = $("#HdrSec16_Cmb_FF_FrmLoc_Nm").data("kendoComboBox");
    //        var CdKy = cmb.value();
    //        if (CdKy != "") {
    //            var validate = ComboValidations("HdrSec16_Cmb_FF_FrmLoc_Nm");
    //            if (validate) {
    //                $("#HdrSec16_Cmb_FF_FrmLoc_Cd").data("kendoComboBox").value(CdKy);
    //            } else {
    //                $("#HdrSec16_Cmb_FF_FrmLoc_Nm").data("kendoComboBox").value('');
    //                $("#HdrSec16_Cmb_FF_FrmLoc_Cd").data("kendoComboBox").value('');
    //            }
    //        }
    //    },
    //    filter: "contains",
    //    suggest: true,
    //    placeholder: "From Location"
    //});

    $("#HdrSec16_Cmb_FF_ToLoc_Cd").kendoComboBox({
        dataValueField: "CdKy",
        dataTextField: "Code",
        dataSource: dataSrcCreateCodeCdMasLookUp('HdrSec16_Cmb_FF_ToLoc'),
        change: function (e) {
            var cmb = $("#HdrSec16_Cmb_FF_ToLoc_Cd").data("kendoComboBox");
            var CdKy = cmb.value();
            if (CdKy != "") {
                var validate = ComboValidations("HdrSec16_Cmb_FF_ToLoc_Cd");
                if (validate) {
                    //$("#HdrSec16_Cmb_FF_ToLoc_Nm").data("kendoComboBox").value(CdKy);
                } else {
                    $("#HdrSec16_Cmb_FF_ToLoc_Cd").data("kendoComboBox").value('');
                 //   $("#HdrSec16_Cmb_FF_ToLoc_Nm").data("kendoComboBox").value('');
                }
            }
        },
        filter: "contains",
        suggest: true,
        placeholder: "To Location"
    });

    //$("#HdrSec16_Cmb_FF_ToLoc_Nm").kendoComboBox({
    //    dataValueField: "CdKy",
    //    dataTextField: "CdNm",
    //    dataSource: dataSrcCreateCdNmCdMasLookUp('HdrSec16_Cmb_FF_ToLoc'),
    //    change: function (e) {
    //        var cmb = $("#HdrSec16_Cmb_FF_ToLoc_Nm").data("kendoComboBox");
    //        var CdKy = cmb.value();
    //        if (CdKy != "") {
    //            var validate = ComboValidations("HdrSec16_Cmb_FF_ToLoc_Nm");
    //            if (validate) {
    //                $("#HdrSec16_Cmb_FF_ToLoc_Cd").data("kendoComboBox").value(CdKy);
    //            } else {
    //                $("#HdrSec16_Cmb_FF_ToLoc_Nm").data("kendoComboBox").value('');
    //                $("#HdrSec16_Cmb_FF_ToLoc_Cd").data("kendoComboBox").value('');
    //            }
    //        }
    //    },
    //    filter: "contains",
    //    suggest: true,
    //    placeholder: "To Location"
    //});

    $("#HdrSec16_Cmb_FF_AprStatesAction_Nm")
      .kendoComboBox({
          dataTextField: "CdNm",
          dataValueField: "CdKy",
          // dataSource: DetailAccountNmload('HdrSec10_Cmb_FF_AprStatesAction'),// need some modifications
          dataSource: dataSrcCreateCdNmCdMasLookUp('HdrSec16_Cmb_FF_AprStatesAction'),
          change: function (e) {

              var comboboxText = $("#HdrSec16_Cmb_FF_AprStatesAction_Nm").data("kendoComboBox");
              var cmbValue = comboboxText.value();
              var validate = ComboValidations("HdrSec16_Cmb_FF_AprStatesAction_Nm");
          },
          filter: "contains",
          suggest: true,
          placeholder: "Status"
      })


    //------------------ Find_Form_Combo_Load End -----------

}


function ComboValidations(cmbNm) {
    var cmb = $("#" + cmbNm + "").data("kendoComboBox");
    var dataItem = cmb.dataItem();
    if (!dataItem) {
        alert("'" + cmb.value() + "' is not a Valid input");
        $("#" + cmbNm + "").data("kendoComboBox").value("");
        $("#" + cmbNm + "").data("kendoComboBox").input.focus();
        return false;
    } else {
        return true;
    }
}



function OpenItemFindForm(textForSSSerach) {

    //alert("OpenItemFindForm");

    var LocKy = $("#HdrSec2_CmbFrmLoc_Cd").data('kendoComboBox').value();
    if (LocKy == 0 || LocKy == null) {
        var LocKy = 1;
    }
    var PrjKy = $("#HdrSec2_CmbFrmPrj_Cd").data('kendoComboBox').value();
    if (PrjKy == 0 || PrjKy == null) {
        var PrjKy = 1;
    }

    var OrdTypKySelect = $("#HdrSec1_InptTrnNo_FrmTrnTypKy_Val").val();

    ItemSelectionPopUpOpen(textForSSSerach, "", viewBag.ObjKy,
    1, OrdTypKySelect, PrjKy, LocKy, 'ItmTyp', 'RM');
}

function SetSelectedItemToItemCombo(ItmKy) {

    ItmKy = Number(ItmKy);

    if (ItmKy > 0) {
       // $("#HdrSec6_CmbItm_Nm").data("kendoComboBox").value(null);
        $("#HdrSec6_CmbItm_Cd").data("kendoComboBox").value(null);
       // $("#HdrSec6_CmbItm_Nm").data("kendoComboBox").value(ItmKy);
        $("#HdrSec6_CmbItm_Cd").data("kendoComboBox").value(ItmKy);
        //GetRate();
        $("#HdrSec7_InptQty_Val").data("kendoNumericTextBox").focus();
    }
}


function ItmCdDatasourceItmTransfer(startSize, size) {
    $.ajax({
        url: urlTransaction.ItmCd_SelectWeb,
        data: JSON.stringify({
            OurCd: 'Material',
            ConCd: 'ItmTyp',
            StartSize: startSize,
            Size: size

        }),
        contentType: "application/json; charset=utf-8",
        dataType: "Json",
        type: "POST",
        success: function (DataSet) {
            try {
                var gridWidget = $('#HdrSec6_CmbItm_Cd').data("kendoComboBox");
                gridWidget.dataSource.data().push.apply(gridWidget.dataSource.data(), DataSet);
                var TotalRec = DataSet[0].Totalrec;
                // gridWidget.dataSource.data(DataSet);
                if (TotalRec - 1 > size) {
                    startSize += size;

                    if (TotalRec < (startSize + size)) {
                        size = TotalRec - (startSize + 1);
                    }
                    if (size <= 0) {

                        return;
                    }
                    ItmCdDatasourceItmTransfer(startSize, size);
                }
            } catch (e) {
                alert("Please try Again");
            }
        },
        error: function (e) {
            alert("Network Related Issue");
            return false;
        }
    });
}

function ItmNmDatasourceItmTransfer(startSize, size) {
    $.ajax({
        url: urlTransaction.ItmNm_SelectWeb,
        data: JSON.stringify({
            OurCd: 'Material',
            ConCd: 'ItmTyp',
            StartSize: startSize,
            Size: size
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "Json",
        type: "POST",
        success: function (DataSet) {
            try {
                var gridWidget = $('#HdrSec6_CmbItm_Nm').data("kendoComboBox");
                gridWidget.dataSource.data().push.apply(gridWidget.dataSource.data(), DataSet);
                var TotalRec = DataSet[0].Totalrec;
                // gridWidget.dataSource.data(DataSet);
                if (TotalRec - 1 > size) {
                    startSize += size;

                    if (TotalRec < (startSize + size)) {
                        size = TotalRec - (startSize + 1);
                    }
                    if (size <= 0) {

                        return;
                    }
                    ItmNmDatasourceItmTransfer(startSize, size);
                }
            } catch (e) {
                alert("Please try Again");
            }
        },
        error: function (e) {
            alert("Network Related Issue");
            return false;
        }
    });
}