

function AdrID_SelectMob_DataSourceWithTrnTyp(ObjNm, PreKy) {

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

function AccCdDatasource(ObjNm, PreKy) {

    if (isNaN(PreKy))
        return [];

    var ObjKy = GetObjKy(ObjNm);
    var TrnTypKy = FormGlblData.TrnTypKy;
    var dataSource = new kendo.data.DataSource(
      {
          transport: {
              read: {
                  url: urlComboLoad.AccCd_SelectMob,
                  data: { ObjKy: ObjKy, TrnTypKy: TrnTypKy, PreKy: PreKy },
                  dataType: "json"                
              }
          }
      });
    return dataSource;
}

function AccNmDatasource(ObjNm, PreKy) {

    if (isNaN(PreKy))
        return [];

    var ObjKy = GetObjKy(ObjNm);
    var TrnTypKy = FormGlblData.TrnTypKy;
    var dataSource = new kendo.data.DataSource(
      {
          transport: {
              read: {
                  url: urlComboLoad.AccNm_SelectMob,
                  data: { ObjKy: ObjKy, TrnTypKy: TrnTypKy, PreKy: PreKy },
                  dataType: "json"
              }
          }
      });
    return dataSource;
}


function LoadAccMasComboLoad(PreKy) {
    PreKy = Number(PreKy);

    $("#HdrSec2_CmbContractAcc_Cd").kendoComboBox({
        dataValueField: "AccKy",
        dataTextField: "AccCd",
        dataSource: AccCdDatasource('HdrSec2_CmbContractAcc', 1),
        change: function (e) {
            var cmb = $("#HdrSec2_CmbContractAcc_Cd").data("kendoComboBox");
            var AccKy = cmb.value();
            if (AccKy != "") {
                var validate = ComboValidations("HdrSec2_CmbContractAcc_Cd");
                if (validate) {
                    //$("#HdrSec2_CmbContractAcc_Cd").data("kendoComboBox").value(AccKy);
                   // $("#HdrSec2_CmbContractAcc_Nm").data("kendoComboBox").value(AccKy);
                    FormGlblData.IsDetailRelatedHdrSectionChanged = true;
                } else {
                    $("#HdrSec2_CmbContractAcc_Cd").data("kendoComboBox").value(null);
                   // $("#HdrSec2_CmbContractAcc_Nm").data("kendoComboBox").value(null);
                }
            }
        },
        filter: "contains",
        suggest: true,
        placeholder: "Select a contract A/C ..."
    });
    $("#HdrSec2_CmbContractAcc_Cd").parent().css('width', "40%");

    //$("#HdrSec2_CmbContractAcc_Nm").kendoComboBox({
    //    dataValueField: "AccKy",
    //    dataTextField: "AccNm",
    //    dataSource: AccNmDatasource('HdrSec2_CmbContractAcc', 1),
    //    change: function (e) {
    //        var cmb = $("#HdrSec2_CmbContractAcc_Nm").data("kendoComboBox");
    //        var AccKy = cmb.value();
    //        if (AccKy != "") {
    //            var validate = ComboValidations("HdrSec2_CmbContractAcc_Nm");
    //            if (validate) {
    //                //$("#HdrSec2_CmbContractAcc_Nm").data("kendoComboBox").value(AccKy);
    //                $("#HdrSec2_CmbContractAcc_Cd").data("kendoComboBox").value(AccKy);
    //                FormGlblData.IsDetailRelatedHdrSectionChanged = true;
    //            } else {
    //                $("#HdrSec2_CmbContractAcc_Nm").data("kendoComboBox").value(null);
    //                $("#HdrSec2_CmbContractAcc_Cd").data("kendoComboBox").value(null);
    //            }
    //        }
    //    },
    //    filter: "contains",
    //    suggest: true,
    //    placeholder: "Select a contract A/C ..."
    //});
    //$("#HdrSec2_CmbContractAcc_Nm").parent().css('width', "58%");

    LoadAccComboLoad(PreKy);
}

function LoadAccComboLoad(PreKy) {

    PreKy = Number(PreKy);

    $("#HdrSec2_CmbAcc_Cd").kendoComboBox({
        dataValueField: "AccKy",
        dataTextField: "AccCd",
        dataSource: AccCdDatasource('HdrSec2_CmbAcc', PreKy),
        change: function (e) {
            var cmb = $("#HdrSec2_CmbAcc_Cd").data("kendoComboBox");
            var AccKy = cmb.value();
            if (AccKy != "") {
                var validate = ComboValidations("HdrSec2_CmbAcc_Cd");
                if (validate) {
                    //$("#HdrSec2_CmbAcc_Cd").data("kendoComboBox").value(AccKy);
                  //  $("#HdrSec2_CmbAcc_Nm").data("kendoComboBox").value(AccKy);
                    FormGlblData.IsDetailRelatedHdrSectionChanged = true;
                    LoadAdrComboByAcc(AccKy);
                } else {
                    $("#HdrSec2_CmbAcc_Cd").data("kendoComboBox").value(null);
                   // $("#HdrSec2_CmbAcc_Nm").data("kendoComboBox").value(null);
                }
            }
        },
        filter: "contains",
        suggest: true,
        placeholder: "Select a A/C ..."
    });
    $("#HdrSec2_CmbAcc_Cd").parent().css('width', "40%");

    //$("#HdrSec2_CmbAcc_Nm").kendoComboBox({
    //    dataValueField: "AccKy",
    //    dataTextField: "AccNm",
    //    dataSource: AccNmDatasource('HdrSec2_CmbAcc', PreKy),
    //    change: function (e) {
    //        var cmb = $("#HdrSec2_CmbAcc_Nm").data("kendoComboBox");
    //        var AccKy = cmb.value();
    //        if (AccKy != "") {
    //            var validate = ComboValidations("HdrSec2_CmbAcc_Nm");
    //            if (validate) {
    //                //$("#HdrSec2_CmbAcc_Nm").data("kendoComboBox").value(AccKy);
    //                $("#HdrSec2_CmbAcc_Cd").data("kendoComboBox").value(AccKy);
    //                FormGlblData.IsDetailRelatedHdrSectionChanged = true;
    //                LoadAdrComboByAcc(AccKy);
    //            } else {
    //                $("#HdrSec2_CmbAcc_Nm").data("kendoComboBox").value(null);
    //                $("#HdrSec2_CmbAcc_Cd").data("kendoComboBox").value(null);
    //            }
    //        }
    //    },
    //    filter: "contains",
    //    suggest: true,
    //    placeholder: "Select a A/C ..."
    //});
    //$("#HdrSec2_CmbAcc_Nm").parent().css('width', "58%");


    $("#HdrSec2_CmbAcc_Cd").data('kendoComboBox').input.keydown(function (event) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {
            //alert('d');
            $("#HdrSec5_CmbItm_Val").focus();
            event.preventDefault();
        }
    });

    $("#HdrSec2_CmbAcc_Cd").keydown(function (event) {
        event.preventDefault();
    });

    //$("#HdrSec2_CmbAcc_Nm").data('kendoComboBox').input.keydown(function (event) {
    //    var keycode = (event.keyCode ? event.keyCode : event.which);
    //    if (keycode == '13') {
    //        //alert('d');
    //        $("#HdrSec5_CmbItm_Val").focus();
    //        event.preventDefault();
    //    }
    //});

    //$("#HdrSec2_CmbAcc_Nm").keydown(function (event) {
    //    event.preventDefault();
    //});
}

function LoadAdrCombo(PreKy) {

    PreKy = Number(PreKy);

    $("#HdrSec2_CmbAdr_Cd").kendoComboBox({
        dataValueField: "AdrKy",
        dataTextField: "AdrID",
        dataSource: AdrID_SelectMob_DataSourceWithTrnTyp('HdrSec2_CmbAdr', PreKy),//AdrByAccDatasource(AccKy),
        change: function (e) {
            var cmb = $("#HdrSec2_CmbAdr_Cd").data("kendoComboBox");
            var lbl = $("#HdrSec2_CmbAdr_Lbl").text();
            if (FormGlblData.isFirstTimeComboChange == 0) {
                var ReturnVal = ChangeItmRatesByHeaderChange(cmb.text(), lbl);
                if (ReturnVal == false) {
                    //
                }
            }
            var AdrKy = cmb.value();
            if (AdrKy != "") {
                var validate = ComboValidations("HdrSec2_CmbAdr_Cd");
                if (validate) {
                    //$("#HdrSec2_CmbAdr_Cd").data("kendoComboBox").value(AdrKy);
                  //  $("#HdrSec2_CmbAdr_Nm").data("kendoComboBox").value(AdrKy);
                    FormGlblData.IsDetailRelatedHdrSectionChanged = true;
                    setDefault();
                } else {
                    $("#HdrSec2_CmbAdr_Cd").data("kendoComboBox").value(null);
                    //$("#HdrSec2_CmbAdr_Nm").data("kendoComboBox").value(null);
                }
            }
            if (FormGlblData.isFromFind == 1) FormGlblData.isFirstTimeComboChange = 0;
        },
        filter: "contains",
        suggest: true,
        placeholder: "Select a Address.."
    });

    //$("#HdrSec2_CmbAdr_Nm").kendoComboBox({
    //    dataValueField: "AdrKy",
    //    dataTextField: "AdrNm",
    //    dataSource: AdrNm_SelectMob_DataSourceWithTrnTyp('HdrSec2_CmbAdr', PreKy),//AdrByAccDatasource(AccKy),
    //    change: function (e) {
    //        var cmb = $("#HdrSec2_CmbAdr_Nm").data("kendoComboBox");
    //        var lbl = $("#HdrSec2_CmbAdr_Lbl").text();
    //        if (FormGlblData.isFirstTimeComboChange == 0) {
    //            var ReturnVal = ChangeItmRatesByHeaderChange(cmb.text(), lbl);
    //            if (ReturnVal == false) {
    //                //
    //            }
    //        }
    //        var AdrKy = cmb.value();
    //        if (AdrKy != "") {
    //            var validate = ComboValidations("HdrSec2_CmbAdr_Nm");
    //            if (validate) {
    //                $("#HdrSec2_CmbAdr_Cd").data("kendoComboBox").value(AdrKy);
    //                //$("#HdrSec2_CmbAdr_Nm").data("kendoComboBox").value(AdrKy);
    //                FormGlblData.IsDetailRelatedHdrSectionChanged = true;
    //                setDefault();
    //            } else {
    //                $("#HdrSec2_CmbAdr_Nm").data("kendoComboBox").value(null);
    //                $("#HdrSec2_CmbAdr_Cd").data("kendoComboBox").value(null);
    //            }
    //        }
    //        if (FormGlblData.isFromFind == 1) FormGlblData.isFirstTimeComboChange = 0;
    //    },
    //    filter: "contains",
    //    suggest: true,
    //    placeholder: "Select a Address.."
    //});

    $("#HdrSec2_CmbRepAdr_Cd").kendoComboBox({
        dataValueField: "AdrKy",
        dataTextField: "AdrID",
        dataSource: AdrID_SelectMob_DataSourceWithTrnTyp('HdrSec2_CmbRepAdr', PreKy),//AdrByAccDatasource(AccKy),
        change: function (e) {
            var cmb = $("#HdrSec2_CmbRepAdr_Cd").data("kendoComboBox");
            var AdrKy = cmb.value();
            if (AdrKy != "") {
                var validate = ComboValidations("HdrSec2_CmbRepAdr_Cd");
                if (validate) {
                    //$("#HdrSec2_CmbRepAdr_Cd").data("kendoComboBox").value(AdrKy);
                    //$("#HdrSec2_CmbRepAdr_Nm").data("kendoComboBox").value(AdrKy);
                    FormGlblData.IsDetailRelatedHdrSectionChanged = true;
                    setDefault();
                } else {
                    $("#HdrSec2_CmbRepAdr_Cd").data("kendoComboBox").value(null);
                  //  $("#HdrSec2_CmbRepAdr_Nm").data("kendoComboBox").value(null);
                }
            }
        },
        filter: "contains",
        suggest: true,
        placeholder: "Select Rep Address.."
    });

    //$("#HdrSec2_CmbRepAdr_Nm").kendoComboBox({
    //    dataValueField: "AdrKy",
    //    dataTextField: "AdrNm",
    //    dataSource: AdrNm_SelectMob_DataSourceWithTrnTyp('HdrSec2_CmbRepAdr', PreKy),//AdrByAccDatasource(AccKy),
    //    change: function (e) {
    //        var cmb = $("#HdrSec2_CmbRepAdr_Nm").data("kendoComboBox");
    //        var AdrKy = cmb.value();
    //        if (AdrKy != "") {
    //            var validate = ComboValidations("HdrSec2_CmbRepAdr_Nm");
    //            if (validate) {
    //                $("#HdrSec2_CmbRepAdr_Cd").data("kendoComboBox").value(AdrKy);
    //                //$("#HdrSec2_CmbRepAdr_Nm").data("kendoComboBox").value(AdrKy);
    //                FormGlblData.IsDetailRelatedHdrSectionChanged = true;
    //                setDefault();
    //            } else {
    //                $("#HdrSec2_CmbRepAdr_Nm").data("kendoComboBox").value(null);
    //                $("#HdrSec2_CmbRepAdr_Cd").data("kendoComboBox").value(null);
    //            }
    //        }
    //    },
    //    filter: "contains",
    //    suggest: true,
    //    placeholder: "Select Rep Address.."
    //});

    $("#HdrSec2_CmbAdr_Cd").parent().css('width', "40%");
   // $("#HdrSec2_CmbAdr_Nm").parent().css('width', "58%");
    $("#HdrSec2_CmbRepAdr_Cd").parent().css('width', "40%");
   // $("#HdrSec2_CmbRepAdr_Nm").parent().css('width', "58%");
}

function LoadAdrComboByAcc(AccKy) {
    LoadAdrCombo(AccKy);
    AdrByAccDatasource(AccKy);
}

function AdrByAccDatasource(AccKy) {
    var data = new Array();
    $.ajax({
        url: urlTransactionGetAdrByAcc,
        dataType: "json",
        type: "POST",
        data: JSON.stringify({
            AccKy: AccKy
        }),
        contentType: 'application/json; charset=utf-8',
        success: function (list) {
            if (list.length > 0) {
                //$("#HdrSec2_CmbAdr_Cd").data("kendoComboBox").value(null);
                //$("#HdrSec2_CmbAdr_Nm").data("kendoComboBox").value(null);
                for (i = 0; i < list.length; i++) {
                    var AdrKy = list[0].AdrKy;
                    //var AdrNm = list[0].AdrNm;
                    var AdrID = list[0].AdrID;
                    $("#HdrSec2_CmbAdr_Cd").data("kendoComboBox").value(AdrKy);
               //    $("#HdrSec2_CmbAdr_Cd").data("kendoComboBox").text(AdrID);
                    //$("#HdrSec2_CmbAdr_Nm").data("kendoComboBox").value(AdrKy);
                    //$("#HdrSec2_CmbAdr_Nm").data("kendoComboBox").text(AdrNm);
                    if (AdrKy == 1) {
                        //$("#HdrSec2_CmbAdr_Nm").data("kendoComboBox").text("");
                       $("#HdrSec2_CmbAdr_Cd").data("kendoComboBox").text("");
                    }
                }
            }
        },
        error: function (e) { }
    });
}
