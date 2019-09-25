
function AccCdDatasource(AccTyps) {
    var dataSource = new kendo.data.DataSource(
      {
          transport: {
              read: {
                  url: urlTransactionAccAccCd_SelectMob,
                  data: { AccTyps: AccTyps },
                  dataType: "json"
              }
          }
      });
    return dataSource;
}

function AccNmDatasource(AccTyps) {
    var dataSource = new kendo.data.DataSource(
      {
          transport: {
              read: {
                  url: urlTransactionAccAccNm_SelectMob,
                  data: { AccTyps: AccTyps },
                  dataType: "json"
              }
          }
      });
    return dataSource;
}

function ContractAccCdDatasource(AccTyps) {
    var dataSource = new kendo.data.DataSource(
      {
          transport: {
              read: {
                  url: urlTransactionAccContractAccCd_SelectMob,
                  data: { AccTyps: AccTyps },
                  dataType: "json"
              }
          }
      });
    return dataSource;
}

function ContractAccNmDatasource(AccTyps) {
    var dataSource = new kendo.data.DataSource(
      {
          transport: {
              read: {
                  url: urlTransactionAccContractAccNm_SelectMob,
                  data: { AccTyps: AccTyps },
                  dataType: "json"
              }
          }
      });
    return dataSource;
}

function CreateDynamicCombo(PrntKy, ObjTyp, ObjNm) {
    $.ajax({
        url: urlObjMasUsrObjSec_SelectWeb,
        dataType: "json",
        type: "POST",
        data: JSON.stringify({
            PrntKy: PrntKy,
            ObjTyp: ObjTyp,
            ObjNm: ObjNm
        }),
        contentType: 'application/json; charset=utf-8',
        success: function (list) {

            for (j = 0; j < list.length; j++) {
                var ObjNm = list[j].ObjNm;
                if (ObjNm == 'cmbContractAccCd') {

                    //lblAccCd
                    document.getElementById('HdrSec2_CmbContractAcc_Lbl').innerHTML = list[j].ObjCaptn;

                    $("#HdrSec2_CmbContractAcc_Cd").kendoComboBox({
                        dataValueField: "AccKy",
                        dataTextField: "AccCd",
                        dataSource: ContractAccCdDatasource(list[j].OurCd),
                        change: function (e) {
                            var cmb = $("#HdrSec2_CmbContractAcc_Cd").data("kendoComboBox");
                            var AccKy = cmb.value();
                            if (AccKy != "") {
                                var validate = ComboValidations("HdrSec2_CmbContractAcc_Cd");
                                if (validate) {
                                    $("#HdrSec2_CmbContractAcc_Cd").data("kendoComboBox").value(AccKy);
                                    $("#HdrSec2_CmbContractAcc_Nm").data("kendoComboBox").value(AccKy);

                                } else {
                                    $("#HdrSec2_CmbContractAcc_Cd").data("kendoComboBox").value(null);
                                    $("#HdrSec2_CmbContractAcc_Nm").data("kendoComboBox").value(null);
                                }
                            }
                        },
                        filter: "contains",
                        suggest: true,
                        placeholder: "Select a contract A/C ..."
                    });

                    $("#HdrSec2_CmbContractAcc_Cd").parent().css('width', "40%");
                }
                else if (ObjNm == 'cmbContractAccNm') {
                    $("#HdrSec2_CmbContractAcc_Nm").kendoComboBox({
                        dataValueField: "AccKy",
                        dataTextField: "AccNm",
                        dataSource: ContractAccNmDatasource(list[j].OurCd),
                        change: function (e) {
                            var cmb = $("#HdrSec2_CmbContractAcc_Nm").data("kendoComboBox");
                            var AccKy = cmb.value();
                            if (AccKy != "") {
                                var validate = ComboValidations("HdrSec2_CmbContractAcc_Nm");
                                if (validate) {
                                    $("#HdrSec2_CmbContractAcc_Nm").data("kendoComboBox").value(AccKy);
                                    $("#HdrSec2_CmbContractAcc_Cd").data("kendoComboBox").value(AccKy);

                                } else {
                                    $("#HdrSec2_CmbContractAcc_Nm").data("kendoComboBox").value(null);
                                    $("#HdrSec2_CmbContractAcc_Cd").data("kendoComboBox").value(null);
                                }
                            }
                        },
                        filter: "contains",
                        suggest: true,
                        placeholder: "Select a contract A/C ..."
                    });

                    $("#HdrSec2_CmbContractAcc_Nm").parent().css('width', "58%");
                }
                else if (ObjNm == 'cmbAccCd') {

                    //lblAccCd
                    document.getElementById('HdrSec2_CmbAcc_Lbl').innerHTML = list[j].ObjCaptn;

                    $("#HdrSec2_CmbAcc_Cd").kendoComboBox({
                        dataValueField: "AccKy",
                        dataTextField: "AccCd",
                        dataSource: AccCdDatasource(list[j].OurCd),
                        change: function (e) {
                            var cmb = $("#HdrSec2_CmbAcc_Cd").data("kendoComboBox");
                            var AccKy = cmb.value();
                            if (AccKy != "") {
                                var validate = ComboValidations("HdrSec2_CmbAcc_Cd");
                                if (validate) {
                                    $("#HdrSec2_CmbAcc_Cd").data("kendoComboBox").value(AccKy);
                                    $("#HdrSec2_CmbAcc_Nm").data("kendoComboBox").value(AccKy);
                                    LoadAdrComboByAcc(AccKy);
                                } else {
                                    $("#HdrSec2_CmbAcc_Cd").data("kendoComboBox").value(null);
                                    $("#HdrSec2_CmbAcc_Nm").data("kendoComboBox").value(null);
                                }
                            }
                        },
                        filter: "startswith",
                        suggest: true,
                        placeholder: "Select a A/C ..."
                    });

                    $("#HdrSec2_CmbAcc_Cd").parent().css('width', "40%");
                }
                else if (ObjNm == 'cmbAccNm') {
                    $("#HdrSec2_CmbAcc_Nm").kendoComboBox({
                        dataValueField: "AccKy",
                        dataTextField: "AccNm",
                        dataSource: AccNmDatasource(list[j].OurCd),
                        change: function (e) {
                            var cmb = $("#HdrSec2_CmbAcc_Nm").data("kendoComboBox");
                            var AccKy = cmb.value();
                            if (AccKy != "") {
                                var validate = ComboValidations("HdrSec2_CmbAcc_Nm");
                                if (validate) {
                                    $("#HdrSec2_CmbAcc_Nm").data("kendoComboBox").value(AccKy);
                                    $("#HdrSec2_CmbAcc_Cd").data("kendoComboBox").value(AccKy);
                                    LoadAdrComboByAcc(AccKy);
                                } else {
                                    $("#HdrSec2_CmbAcc_Nm").data("kendoComboBox").value(null);
                                    $("#HdrSec2_CmbAcc_Cd").data("kendoComboBox").value(null);
                                }
                            }
                        },
                        filter: "startswith",
                        suggest: true,
                        placeholder: "Select a A/C ..."
                    });
                    $("#HdrSec2_CmbAcc_Nm").parent().css('width', "58%");
                }
            }
        },
        error: function (e) { }
    })
}
