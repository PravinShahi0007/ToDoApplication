//Load Dropdowns
function LoadDropDown() {
    //Project Code Drop Bottom
    $("#HdrSec2_CmbPrj_Cd")
        .kendoComboBox({
            dataValueField: "PrjKy",
            dataTextField: "PrjId",
            dataSource: [],// ProjectCd('HdrSec2_CmbPrj'),
            change: function (e) {
                var cmb = $("#HdrSec2_CmbPrj_Cd").data("kendoComboBox");
                var PrjKy = cmb.value();
                if (PrjKy != "") {
                    $("#HdrSec4_CmbDtlPrj_Cd").data("kendoComboBox").value(PrjKy);
                    //$("#HdrSec4_CmbDtlPrj_Nm").data("kendoComboBox").value(PrjKy);
                    var validate = ComboValidations("HdrSec2_CmbPrj_Cd");
                    if (validate) {
                        //$("#HdrSec2_CmbPrj_Nm").data("kendoComboBox").value(PrjKy);    
                        //Change Task List According to selected Project
                        projectChange(PrjKy);
                        $("#HdrSec6_CmbOrder_Cd").data("kendoComboBox").setDataSource(GetOrderCode('HdrSec6_CmbOrder'));
                        // OdrNoLoad()
                        var trnky = FormGlblData.TrnKy;
                        var trnDt = DateFormatter(document.getElementById("HdrSec1_DatVouDate_Val").value);// document.getElementById("HdrSec1_DatVouDate_Val").value;
                        if (trnky > 1) {
                            IsValidatePrefixPrj(trnky, FormGlblData.TrnTypKy, trnDt, '1', PrjKy, '1', '1');
                        }
                        UpdateFirstRow();
                    } else {
                        $("#HdrSec2_CmbPrj_Cd").data("kendoComboBox").value("");
                    }
                }

            },
            filter: "contains",
            suggest: true,
            placeholder: "Select a Project"
        });
    //Project Name Drop Bottom
    //$("#HdrSec2_CmbPrj_Nm")
    //    .kendoComboBox({
    //        dataValueField: "PrjKy",
    //        dataTextField: "PrjNm",
    //        dataSource: ProjectNm('HdrSec2_CmbPrj'),
    //        change: function (e) {
    //            var cmb = $("#HdrSec2_CmbPrj_Nm").data("kendoComboBox");
    //            var PrjKy = cmb.value();
    //            if (PrjKy != "") {
    //                $("#HdrSec4_CmbDtlPrj_Cd").data("kendoComboBox").value(PrjKy);
    //                //$("#HdrSec4_CmbDtlPrj_Nm").data("kendoComboBox").value(PrjKy);
    //                var validate = ComboValidations("HdrSec2_CmbPrj_Nm");
    //                if (validate) {
    //                    $("#HdrSec6_CmbOrder_Cd").data("kendoComboBox").setDataSource(GetOrderCode('HdrSec6_CmbOrder'));
    //                    var trnky = FormGlblData.TrnKy;
    //                    var trnDt = DateFormatter(document.getElementById("HdrSec1_DatVouDate_Val").value);// document.getElementById("HdrSec1_DatVouDate_Val").value;
    //                    if (trnky > 1) {
    //                        IsValidatePrefixPrj(trnky, FormGlblData.TrnTypKy, trnDt, '1', PrjKy, '1', '1');
    //                        //ChangeProject(PrjKy)
    //                    }

    //                    $("#HdrSec2_CmbPrj_Cd").data("kendoComboBox").value(PrjKy);

    //                   // OdrNoLoad()
    //                    //    projectChange(PrjKy);

    //                    UpdateFirstRow();
    //                } else {
    //                    $("#HdrSec2_CmbPrj_Nm").data("kendoComboBox").value("");
    //                }
    //            }
    //        },
    //        filter: "startswith",
    //        suggest: true,
    //        placeholder: "Select a Project"
    //    });

    //BU Code Drop Bottom
    $("#HdrSec2_CmbBU_Cd")
        .kendoComboBox({
            dataValueField: "CdKy",
            dataTextField: "Code",
            dataSource: BUCode('HdrSec2_CmbBU'),
            change: function (e) {
                var cmb = $("#HdrSec2_CmbBU_Cd").data("kendoComboBox");
                var BUKy = cmb.value();
                if (BUKy != "") {
                    var validate = ComboValidations("HdrSec2_CmbBU_Cd");
                    if (validate) {
                        $("#HdrSec6_CmbOrder_Cd").data("kendoComboBox").setDataSource(GetOrderCode('HdrSec6_CmbOrder'));
                        //$("#HdrSec2_CmbBU_Nm").data("kendoComboBox").value(BUKy);
                        detailBULoad();
                        $("#HdrSec4_CmbDtlBU_Cd").data("kendoComboBox").value(BUKy);
                        //$("#HdrSec4_CmbDtlBU_Nm").data("kendoComboBox").value(BUKy);
                        var trnky = FormGlblData.TrnKy;
                        var trnDt = DateFormatter(document.getElementById("HdrSec1_DatVouDate_Val").value);// document.getElementById("HdrSec1_DatVouDate_Val").value;
                        if (trnky > 1) {
                            IsValidatePrefixBU(trnky, FormGlblData.TrnTypKy, trnDt, '1', '1', BUKy, '1')
                            //IsValidatePrefix(trnky, FormGlblData.TrnTypKy, trnDt, '1', PrjKy, '1', '1');

                            // ChangeBU(BUKy)
                        } else {
                            var grid = $("#PmtRcprGrd").data("kendoGrid");

                            if (grid == undefined)
                                return;

                            var dataSource = grid.dataSource;
                            //records on current data / page   
                            var recordsOnCurrentView = dataSource.data().length;
                            if (recordsOnCurrentView >= 2) {
                                ChangeBU(BUKy);
                            }
                        }
                        UpdateFirstRow();
                    } else {

                        $("#HdrSec2_CmbBU_Cd").data("kendoComboBox").value("");
                    }
                }

            },
            filter: "contains",
            suggest: true,
            placeholder: "Select a BU"
        });
    //BU Name Drop Bottom
    //$("#HdrSec2_CmbBU_Nm")
    //    .kendoComboBox({
    //        dataValueField: "CdKy",
    //        dataTextField: "Name",
    //        dataSource: BUName('HdrSec2_CmbBU'),
    //        change: function (e) {
    //            var cmb = $("#HdrSec2_CmbBU_Nm").data("kendoComboBox");
    //            var BUKy = cmb.value();
    //            if (BUKy != "") {
    //                var validate = ComboValidations("HdrSec2_CmbBU_Nm");
    //                if (validate) {
    //                    $("#HdrSec6_CmbOrder_Cd").data("kendoComboBox").setDataSource(GetOrderCode('HdrSec6_CmbOrder'));

    //                    $("#HdrSec2_CmbBU_Cd").data("kendoComboBox").value(BUKy);
    //                    detailBULoad();
    //                    $("#HdrSec4_CmbDtlBU_Cd").data("kendoComboBox").value(BUKy);
    //                    $("#HdrSec4_CmbDtlBU_Nm").data("kendoComboBox").value(BUKy);
    //                    var trnky = FormGlblData.TrnKy;
    //                    var trnDt = DateFormatter(document.getElementById("HdrSec1_DatVouDate_Val").value);
    //                    if (trnky > 1) {
    //                        IsValidatePrefixBU(trnky, FormGlblData.TrnTypKy, trnDt, '1', '1', BUKy, '1')
    //                        //IsValidatePrefix(trnky, FormGlblData.TrnTypKy, trnDt, '1', PrjKy, '1', '1');
    //                        //    
    //                    } else {
    //                        var grid = $("#PmtRcprGrd").data("kendoGrid");

    //                        if (grid == undefined)
    //                            return;

    //                        var dataSource = grid.dataSource;
    //                        //records on current data / page   
    //                        var recordsOnCurrentView = dataSource.data().length;
    //                        if (recordsOnCurrentView >= 2) {
    //                            ChangeBU(BUKy);
    //                        }
    //                    }
    //                    UpdateFirstRow();
    //                } else {
    //                    $("#HdrSec2_CmbBU_Nm").data("kendoComboBox").value("");
    //                }
    //            }

    //        },
    //        filter: "startswith",
    //        suggest: true,
    //        placeholder: "Select a BU"
    //    });


    //Address Name Drop Bottom
    $("#HdrSec2_CmbHdrAdr_Cd")
        .kendoComboBox({
            dataValueField: "AdrKy",
            dataTextField: "AdrID",
            dataSource: AddressCode('HdrSec2_CmbHdrAdr'),
            change: function (e) {
                var cmb = $("#HdrSec2_CmbHdrAdr_Cd").data("kendoComboBox");
                var AdrKy = cmb.value();
                if (AdrKy != "") {
                    var validate = ComboValidations("HdrSec2_CmbHdrAdr_Cd");
                    if (validate) {

                        //$("#HdrSec2_CmbHdrAdr_Nm").data("kendoComboBox").value(AdrKy);
                        var grid = $("#PmtRcprGrd").data("kendoGrid");

                        if (grid == undefined)
                            return;

                        var dataSource = grid.dataSource;
                        //records on current data / page   
                        var recordsOnCurrentView = dataSource.data().length;
                        if (recordsOnCurrentView >= 2) {
                            var AdrCd = $("#HdrSec2_CmbHdrAdr_Cd").data("kendoComboBox").text();
                            //var AdrNm = $("#HdrSec2_CmbHdrAdr_Nm").data("kendoComboBox").text();
                            var FirstRow = $("#PmtRcprGrd").data().kendoGrid.dataSource.data()[0];
                            FirstRow.set("AdrKy", AdrKy);
                            FirstRow.set("AdrCd", AdrCd);
                            //FirstRow.set("AdrNm", AdrNm);
                        }
                        UpdateFirstRow();
                    } else {
                        $("#HdrSec2_CmbHdrAdr_Cd").data("kendoComboBox").value("");
                    }
                }

            },
            filter: "contains",
            suggest: true,
            placeholder: "Select an Address"
        });


    //Address Name Drop Bottom
    //$("#HdrSec2_CmbHdrAdr_Nm")
    //    .kendoComboBox({
    //        dataValueField: "AdrKy",
    //        dataTextField: "AdrNm",
    //        dataSource: AddressName('HdrSec2_CmbHdrAdr'),
    //        change: function (e) {
    //            var cmb = $("#HdrSec2_CmbHdrAdr_Nm").data("kendoComboBox");
    //            var AdrKy = cmb.value();
    //            if (AdrKy != "") {
    //                var validate = ComboValidations("HdrSec2_CmbHdrAdr_Nm");
    //                if (validate) {
    //                    $("#HdrSec2_CmbHdrAdr_Cd").data("kendoComboBox").value(AdrKy);
    //                    var grid = $("#PmtRcprGrd").data("kendoGrid");

    //                    if (grid == undefined)
    //                        return;

    //                    var dataSource = grid.dataSource;
    //                    //records on current data / page   
    //                    var recordsOnCurrentView = dataSource.data().length;
    //                    if (recordsOnCurrentView >= 2) {
    //                        var AdrCd = $("#HdrSec2_CmbHdrAdr_Cd").data("kendoComboBox").text();
    //                        var AdrNm = $("#HdrSec2_CmbHdrAdr_Nm").data("kendoComboBox").text();
    //                        var FirstRow = $("#PmtRcprGrd").data().kendoGrid.dataSource.data()[0];
    //                        FirstRow.set("AdrKy", AdrKy);
    //                        FirstRow.set("AdrCd", AdrCd);
    //                        FirstRow.set("AdrNm", AdrNm);
    //                    }
    //                    UpdateFirstRow();
    //                } else {
    //                    $("#HdrSec2_CmbHdrAdr_Nm").data("kendoComboBox").value("");
    //                }
    //            }

    //        },
    //        filter: "startswith",
    //        suggest: true,
    //        placeholder: "Select an Address"
    //    });
    //

    //HdrSec13_CmbResAdr_Cd Name Drop Bottom
    $("#HdrSec13_CmbResAdr_Cd")
        .kendoComboBox({
            dataValueField: "AdrKy",
            dataTextField: "AdrCode",
            dataSource: ResiAdressCd('HdrSec13_CmbResAdr'),
            change: function (e) {
                var cmb = $("#HdrSec13_CmbResAdr_Cd").data("kendoComboBox");
                var AdrKy = cmb.value();
                if (AdrKy != "") {
                    var validate = ComboValidations("HdrSec13_CmbResAdr_Cd");
                    if (!validate) {
                        $("#HdrSec13_CmbResAdr_Cd").data("kendoComboBox").value("");
                    }
                }

            },
            filter: "startswith",
            suggest: true,
            placeholder: "Select an Address"
        });

    //Transaction Curency Dropdown
    $("#HdrSec3_CmbTrnCurrncy_Cd")
        .kendoComboBox({
            dataValueField: "CdKy",
            dataTextField: "Code",
            dataSource: CurrencyCode('HdrSec3_CmbTrnCurrncy'),
            change: function (e) {
                var cmb = $("#HdrSec3_CmbTrnCurrncy_Cd").data("kendoComboBox");
                var Crnky = cmb.value();
                if (Crnky != "") {
                    var validate = ComboValidations("HdrSec3_CmbTrnCurrncy_Cd");
                    if (validate) {
                        GetHdrExRate(Crnky);
                    } else {

                        $("#HdrSec3_CmbTrnCurrncy_Cd").data("kendoComboBox").value("");
                    }
                }

            },
            filter: "startswith",
            suggest: true,
            placeholder: "Select a Curency"
        });

    //Transaction Curency Dropdown
    $("#HdrSec3_CmbAccCurrncy_Cd")
        .kendoComboBox({
            dataValueField: "CdKy",
            dataTextField: "Code",
            dataSource: AccCurency('HdrSec3_CmbAccCurrncy'),
            change: function (e) {
                var cmb = $("#HdrSec3_CmbAccCurrncy_Cd").data("kendoComboBox");
                var Crnky = cmb.value();
                if (Crnky != "") {
                    var validate = ComboValidations("HdrSec3_CmbAccCurrncy_Cd");
                    if (validate) {
                        GetHdrAccCurExRate(Crnky);
                        // UpdateFirstRow();
                    } else {
                        $("#HdrSec3_CmbAccCurrncy_Cd").data("kendoComboBox").value("");
                    }
                }

            },
            filter: "startswith",
            suggest: true,
            placeholder: "Select a Curency"
        });
    //This DropDowns Were Added As U.T Told
    //HdrSec6_CmbBank_Cd Code Drop Bottom
    $("#HdrSec6_CmbBank_Cd")
        .kendoComboBox({
            dataValueField: "BankKy",
            dataTextField: "BankCode",
            dataSource: BanckCodeMob('HdrSec6_CmbBank'),
            change: function (e) {
                var cmb = $("#HdrSec6_CmbBank_Cd").data("kendoComboBox");
                var BnkKy = cmb.value();
                if (BnkKy != "") {
                    var validate = ComboValidations("HdrSec6_CmbBank_Cd");
                    if (validate) {
                        ChangeBank();
                    } else {
                        $("#HdrSec6_CmbBank_Cd").data("kendoComboBox").value("");
                    }
                }
            },
            filter: "startswith",
            suggest: true,
            placeholder: "Select a Bank"
        });

    //HdrSec6_CmbBranch_Cd Code Drop Bottom
    $("#HdrSec6_CmbBranch_Cd")
        .kendoComboBox({
            dataValueField: "BrachKy",
            dataTextField: "BrachCode",
            dataSource: BranchCodeMob('HdrSec6_CmbBranch'),
            change: function (e) {
                var cmb = $("#HdrSec6_CmbBranch_Cd").data("kendoComboBox");
                var BranchKy = cmb.value();
                if (BranchKy != "") {
                    var validate = ComboValidations("HdrSec6_CmbBank_Cd");
                    if (!validate) {
                        $("#HdrSec6_CmbBranch_Cd").data("kendoComboBox").value("");
                    }
                }
            },
            filter: "startswith",
            suggest: true,
            placeholder: "Select a Branch"
        });

    //HdrSec4_CmbLC_Cd Drop Bottom
    $("#HdrSec4_CmbLC_Cd")
        .kendoComboBox({
            dataValueField: "CdKy",
            dataTextField: "Code",
            dataSource: HdrSec4_CmbLC_Cd('HdrSec4_CmbLC'),
            change: function (e) {
                var cmb = $("#HdrSec4_CmbLC_Cd").data("kendoComboBox");
                var BranchKy = cmb.value();
                if (BranchKy != "") {
                    var validate = ComboValidations("HdrSec4_CmbLC_Cd");
                    if (!validate) {
                        $("#HdrSec4_CmbLC_Cd").data("kendoComboBox").value("");
                    }
                }
            },
            filter: "startswith",
            suggest: true,
            placeholder: "Select a LC"
        });

    //HdrSec5_CmbLoan_Cd Code Drop Bottom
    $("#HdrSec5_CmbLoan_Cd")
        .kendoComboBox({
            dataValueField: "CdKy",
            dataTextField: "Code",
            dataSource: HdrSec5_CmbLoan_Cd('HdrSec5_CmbLoan'),
            change: function (e) {
                var cmb = $("#HdrSec5_CmbLoan_Cd").data("kendoComboBox");
                var LoanKy = cmb.value();
                if (LoanKy != "") {
                    var validate = ComboValidations("HdrSec5_CmbLoan_Cd");
                    if (!validate) {
                        $("#HdrSec5_CmbLoan_Cd").data("kendoComboBox").value("");
                    }
                }
            },
            filter: "startswith",
            suggest: true,
            placeholder: "Select a Loan"
        });


    //HdrSec7_CmbOrderDet_Cd Code Drop Bottom
    $("#HdrSec7_CmbOrderDet_Cd")
        .kendoComboBox({
            dataValueField: "OrdrKy",
            dataTextField: "OrdrCode",
            dataSource: GetOrderDetCode('HdrSec7_CmbOrderDet'),
            change: function (e) {
                var cmb = $("#HdrSec7_CmbOrderDet_Cd").data("kendoComboBox");
                var HdrSec7_CmbOrderDet_Cd = cmb.value();
                if (HdrSec7_CmbOrderDet_Cd != "") {
                    var validate = ComboValidations("HdrSec7_CmbOrderDet_Cd");
                    if (!validate) {
                        $("#HdrSec7_CmbOrderDet_Cd").data("kendoComboBox").value("");
                    }
                }
            },
            filter: "startswith",
            suggest: true,
            placeholder: "Select an OrdrDet"
        });
    //details
    $("#HdrSec4_CmbDtlPrj_Cd")
      .kendoComboBox({
          dataValueField: "PrjKy",
          dataTextField: "PrjId",
          dataSource: [], //ProjectCd('HdrSec2_CmbPrj'),
          change: function (e) {
              var cmb = $("#HdrSec4_CmbDtlPrj_Cd").data("kendoComboBox");
              var PrjKy = cmb.value();
              if (PrjKy != "") {
                  var validate = ComboValidations("HdrSec4_CmbDtlPrj_Cd");
                  if (validate) {
                      //$("#HdrSec4_CmbDtlPrj_Nm").data("kendoComboBox").value(PrjKy);
                      projectChange(PrjKy);
                      $("#HdrSec6_CmbOrder_Cd").data("kendoComboBox").setDataSource(GetOrderCode('HdrSec6_CmbOrder'));
                      // OdrNoLoad()

                  } else {
                      $("#HdrSec4_CmbDtlPrj_Cd").data("kendoComboBox").value("");
                  }
              }
          },
          filter: "contains",
          suggest: true,
          placeholder: "Select a Project"
      });


    var ProjectDataSurce = ProjectCd('HdrSec2_CmbPrj');
    $("#HdrSec4_CmbDtlPrj_Cd").data("kendoComboBox").setDataSource(ProjectDataSurce);
    $("#HdrSec2_CmbPrj_Cd").data("kendoComboBox").setDataSource(ProjectDataSurce);

    //Project Name Drop Bottom
    //$("#HdrSec4_CmbDtlPrj_Nm")
    //    .kendoComboBox({
    //        dataValueField: "PrjKy",
    //        dataTextField: "PrjNm",
    //        dataSource: ProjectNm('HdrSec2_CmbPrj'),
    //        change: function (e) {
    //            var cmb = $("#HdrSec4_CmbDtlPrj_Nm").data("kendoComboBox");
    //            var PrjKy = cmb.value();
    //            if (PrjKy != "") {
    //                var validate = ComboValidations("HdrSec4_CmbDtlPrj_Nm");
    //                if (validate) {
    //                    $("#HdrSec4_CmbDtlPrj_Cd").data("kendoComboBox").value(PrjKy);
    //                    projectChange(PrjKy);
    //                    $("#HdrSec6_CmbOrder_Cd").data("kendoComboBox").setDataSource(GetOrderCode('HdrSec6_CmbOrder'));
    //                   // OdrNoLoad()
    //                } else {
    //                    $("#HdrSec4_CmbDtlPrj_Nm").data("kendoComboBox").value("");
    //                }
    //            }
    //        },
    //        filter: "startswith",
    //        suggest: true,
    //        placeholder: "Select a Project"
    //    });
    //HdrSec6_CmbOrder_Cd Code Drop Bottom
    $("#HdrSec6_CmbOrder_Cd")
        .kendoComboBox({
            dataValueField: "OrdrKy",
            dataTextField: "OrdrCode",
            dataSource: GetOrderCode('HdrSec6_CmbOrder'),
            change: function (e) {
                var cmb = $("#HdrSec6_CmbOrder_Cd").data("kendoComboBox");
                var OrdrKy = cmb.value();
                if (OrdrKy != "") {
                    var validate = ComboValidations("HdrSec6_CmbOrder_Cd");
                    if (!validate) {
                        $("#HdrSec6_CmbOrder_Cd").data("kendoComboBox").value("");
                    }
                }
            },
            filter: "startswith",
            suggest: true,
            placeholder: "Select an Order"
        });


    $(".k-datepicker, .k-combobox, .k-numerictextbox,.k-input").css("width", "100%");
    $("#HdrSec2_CmbPrj_Cd").parent().css("width", "40%");
    $("#HdrSec4_CmbDtlPrj_Cd").parent().css("width", "40%");
    //$("#HdrSec4_CmbDtlPrj_Nm").parent().css("width", "50%");
    //$("#HdrSec2_CmbPrj_Nm").parent().css("width", "50%");
    $("#HdrSec2_CmbBU_Cd").parent().css("width", "40%");
    //$("#HdrSec2_CmbBU_Nm").parent().css("width", "50%");
    $("#HdrSec2_CmbHdrAdr_Cd").parent().css("width", "40%");
    //$("#HdrSec2_CmbHdrAdr_Nm").parent().css("width", "50%");
    $("#HdrSec4_CmbLC_Cd").parent().css("width", "40%");
    $("#HdrSec7_CmbOrderDet_Cd").parent().css("width", "173%");


    //------------------ Find_Form_Combo_Load start -----------
    $("#HdrSec16_Cmb_FF_BU_Cd")
    .kendoComboBox({
        dataValueField: "CdKy",
        dataTextField: "Code",
        dataSource: BUCode('HdrSec16_Cmb_FF_BU'),
        change: function (e) {
            var cmb = $("#HdrSec16_Cmb_FF_Prj_Cd").data("kendoComboBox");
            var PrjKy = cmb.value();
            if (PrjKy != "") {
                var validate = ComboValidations("HdrSec16_Cmb_FF_BU_Cd");
                if (validate) {
                    $("#HdrSec16_Cmb_FF_BU_Cd").data("kendoComboBox").value(PrjKy);
                    //$("#HdrSec16_Cmb_FF_BU_Nm").data("kendoComboBox").value(PrjKy);
                } else {

                    $("#HdrSec16_Cmb_FF_BU_Cd").data("kendoComboBox").value("");
                    //$("#HdrSec16_Cmb_FF_BU_Nm").data("kendoComboBox").value("");
                }
            }
        },
        filter: "contains",
        suggest: true,
        placeholder: "Business Unit"
    })

   // $("#HdrSec16_Cmb_FF_BU_Nm")
   //.kendoComboBox({
   //    dataValueField: "CdKy",
   //    dataTextField: "Name",
   //    dataSource: BUName('HdrSec16_Cmb_FF_BU'),
   //    change: function (e) {
   //        var cmb = $("#HdrSec16_Cmb_FF_Prj_Cd").data("kendoComboBox");
   //        var PrjKy = cmb.value();
   //        if (PrjKy != "") {
   //            var validate = ComboValidations("HdrSec16_Cmb_FF_BU_Nm");
   //            if (validate) {
   //                $("#HdrSec16_Cmb_FF_BU_Cd").data("kendoComboBox").value(PrjKy);
   //                $("#HdrSec16_Cmb_FF_BU_Nm").data("kendoComboBox").value(PrjKy);
   //            } else {

   //                $("#HdrSec16_Cmb_FF_BU_Cd").data("kendoComboBox").value("");
   //                $("#HdrSec16_Cmb_FF_BU_Nm").data("kendoComboBox").value("");
   //            }
   //        }
   //    },
   //    filter: "contains",
   //    suggest: true,
   //    placeholder: "Business Unit"
   //})

    $("#HdrSec16_Cmb_FF_Prj_Cd")
          .kendoComboBox({
              dataValueField: "PrjKy",
              dataTextField: "PrjId",
              dataSource: ProjectCd('HdrSec16_Cmb_FF_Prj'),
              change: function (e) {
                  var cmb = $("#HdrSec16_Cmb_FF_Prj_Cd").data("kendoComboBox");
                  var PrjKy = cmb.value();
                  if (PrjKy != "") {
                      var validate = ComboValidations("HdrSec16_Cmb_FF_Prj_Cd");
                      if (validate) {
                          $("#HdrSec16_Cmb_FF_Prj_Cd").data("kendoComboBox").value(PrjKy);
                          //$("#HdrSec16_Cmb_FF_Prj_Nm").data("kendoComboBox").value(PrjKy);
                      } else {

                          $("#HdrSec16_Cmb_FF_Prj_Cd").data("kendoComboBox").value("");
                          //$("#HdrSec16_Cmb_FF_Prj_Nm").data("kendoComboBox").value("");
                      }
                  }
              },
              filter: "contains",
              suggest: true,
              placeholder: "Project"
          })

    //$("#HdrSec16_Cmb_FF_Prj_Nm")
    //     .kendoComboBox({
    //         dataValueField: "PrjKy",
    //         dataTextField: "PrjNm",
    //         dataSource: ProjectNm('HdrSec16_Cmb_FF_Prj'),
    //         change: function (e) {
    //             var cmb = $("#HdrSec16_Cmb_FF_Prj_Nm").data("kendoComboBox");
    //             var PrjKy = cmb.value();
    //             if (PrjKy != "") {
    //                 var validate = ComboValidations("HdrSec16_Cmb_FF_Prj_Nm");
    //                 if (validate) {
    //                     $("#HdrSec16_Cmb_FF_Prj_Cd").data("kendoComboBox").value(PrjKy);
    //                     //$("#HdrSec16_Cmb_FF_Prj_Nm").data("kendoComboBox").value(PrjKy);
    //                 } else {
    //                     $("#HdrSec16_Cmb_FF_Prj_Cd").data("kendoComboBox").value("");
    //                     //$("#HdrSec16_Cmb_FF_Prj_Nm").data("kendoComboBox").value("");
    //                 }
    //             }


    //         },
    //         filter: "contains",
    //         suggest: true,
    //         placeholder: "Project"
    //     })

    $("#HdrSec16_Cmb_FF_HdrAdr_Cd")
        .kendoComboBox({
            dataValueField: "AdrKy",
            dataTextField: "AdrID",
            dataSource: AddressCode('HdrSec16_Cmb_FF_HdrAdr'),
            change: function (e) {
                var cmb = $("#HdrSec16_Cmb_FF_HdrAdr_Cd").data("kendoComboBox");
                var AkkKy = cmb.value();
                if (AkkKy != "") {
                    var validate = ComboValidations("HdrSec16_Cmb_FF_HdrAdr_Cd");
                    if (validate) {

                        $("#HdrSec16_Cmb_FF_HdrAdr_Cd").data("kendoComboBox").value(AkkKy);
                        //$("#HdrSec16_Cmb_FF_HdrAdr_Nm").data("kendoComboBox").value(AkkKy);

                    } else {

                        $("#HdrSec16_Cmb_FF_HdrAdr_Cd").data("kendoComboBox").value("");
                        //$("#HdrSec16_Cmb_FF_HdrAdr_Nm").data("kendoComboBox").value("");
                    }
                }
            },
            filter: "contains",
            suggest: true,
            placeholder: "Address"
        })
    $("#HdrSec16_Cmb_FF_HdrAdr_Nm")
        .kendoComboBox({
            dataValueField: "AdrKy",
            dataTextField: "AdrNm",
            dataSource: AddressName('HdrSec16_Cmb_FF_HdrAdr'),
            change: function (e) {
                var cmb = $("#HdrSec16_Cmb_FF_HdrAdr_Cd").data("kendoComboBox");
                var AkkKy = cmb.value();
                if (AkkKy != "") {
                    var validate = ComboValidations("HdrSec16_Cmb_FF_HdrAdr_Nm");
                    if (validate) {
                        $("#HdrSec16_Cmb_FF_HdrAdr_Cd").data("kendoComboBox").value(AkkKy);
                        //$("#HdrSec16_Cmb_FF_HdrAdr_Nm").data("kendoComboBox").value(AkkKy);

                    } else {

                        $("#HdrSec16_Cmb_FF_HdrAdr_Cd").data("kendoComboBox").value("");
                        //$("#HdrSec16_Cmb_FF_HdrAdr_Nm").data("kendoComboBox").value("");
                    }
                }
            },
            filter: "contains",
            suggest: true,
            placeholder: "Address"
        })

    $("#HdrSec16_Cmb_FF_Acc_Cd")
         .kendoComboBox({
             dataValueField: "AccKy",
             dataTextField: "AccCd",
             dataSource: DetailAccountCdload('HdrSec16_Cmb_FF_Acc'),
             change: function (e) {
                 var cmb = $("#HdrSec16_Cmb_FF_Acc_Cd").data("kendoComboBox");
                 var AkkKy = cmb.value();
                 if (AkkKy != "") {
                     var validate = ComboValidations("HdrSec16_Cmb_FF_Acc_Cd");
                     if (validate) {

                         $("#HdrSec16_Cmb_FF_Acc_Cd").data("kendoComboBox").value(AkkKy);
                         //$("#HdrSec16_Cmb_FF_Acc_Nm").data("kendoComboBox").value(AkkKy);

                     } else {

                         $("#HdrSec16_Cmb_FF_Acc_Cd").data("kendoComboBox").value("");
                         //$("#HdrSec16_Cmb_FF_Acc_Nm").data("kendoComboBox").value("");
                     }
                 }
             },
             filter: "contains",
             suggest: true,
             placeholder: "Account"
         })

    //$("#HdrSec16_Cmb_FF_Acc_Nm")
    //    .kendoComboBox({
    //        dataValueField: "AccKy",
    //        dataTextField: "AccNm",
    //        dataSource: DetailAccountNmload('HdrSec16_Cmb_FF_Acc_Nm'),
    //        change: function (e) {
    //            var cmb = $("#HdrSec16_Cmb_FF_Acc_Nm").data("kendoComboBox");
    //            var AkkKy = cmb.value();
    //            if (AkkKy != "") {
    //                var validate = ComboValidations("AccName");
    //                if (validate) {

    //                    $("#HdrSec16_Cmb_FF_Acc_Nm").data("kendoComboBox").value(AkkKy);
    //                    $("#HdrSec16_Cmb_FF_Acc_Cd").data("kendoComboBox").value(AkkKy);



    //                } else {

    //                    $("#HdrSec16_Cmb_FF_Acc_Cd").data("kendoComboBox").value("");
    //                    $("#HdrSec16_Cmb_FF_Acc_Nm").data("kendoComboBox").value("");
    //                }
    //            }



    //        },
    //        filter: "contains",
    //        suggest: true,
    //        placeholder: "Account"
    //    })

    $("#HdrSec16_Cmb_FF_TrnNo_Cd")
    .kendoComboBox({
        dataValueField: "CdKy",
        dataTextField: "Code",
        dataSource: BUCode('HdrSec16_Cmb_FF_TrnNo'),
        change: function (e) {
            var cmb = $("#HdrSec16_Cmb_FF_TrnNo_Cd").data("kendoComboBox");
            var val = cmb.value();

            if (isNaN(val)) {
                alert("'" + val + "' is not a Valid input");
                cmb.value("");
            }
        },
        filter: "startswith",
        suggest: true,
        placeholder: "Prefix"
    })

    $("#HdrSec16_Cmb_FF_AprStatesAction_Val")
       .kendoComboBox({
           dataValueField: "CdKy",
           dataTextField: "Name",
           // dataSource: DetailAccountNmload('HdrSec16_Cmb_FF_AprStatesAction'),// need some modifications
           dataSource: BUName("HdrSec16_Cmb_FF_AprStatesAction"),//AprStsNm_SelectWeb(),
           filter: "contains",
           suggest: true,
           placeholder: "Status"
       })
    //------------------ Find_Form_Combo_Load end -----------

}

//Hdr Accounts
function LoadHdrAccount() {
    //Account Dropdown id
    $("#HdrSec2_CmbHdrAcc_Cd")
        .kendoComboBox({
            dataValueField: "AccKy",
            dataTextField: "AccCd",
            dataSource: AccountCodeDatasource('HdrSec2_CmbHdrAcc'),
            change: function (e) {
                var cmb = $("#HdrSec2_CmbHdrAcc_Cd").data("kendoComboBox");
                var AccKy = cmb.value();
                if (AccKy == 1 || AccKy == "") {
                    // $("#HdrSec2_CmbHdrAcc_Nm").data("kendoComboBox").value("");
                    //$("#HdrSec2_CmbHdrAcc_Cd").data("kendoComboBox").value("");
                    //$("#HdrSec2_CmbHdrAdr_Nm").data("kendoComboBox").value("");
                    $("#HdrSec2_CmbHdrAdr_Cd").data("kendoComboBox").value("");

                }
                if (AccKy != "" && AccKy != 1) {
                    var validate = ComboValidations("HdrSec2_CmbHdrAcc_Cd");
                    if (validate) {
                        //$("#HdrSec2_CmbHdrAcc_Nm").data("kendoComboBox").value(AccKy);
                        //$("#HdrSec2_CmbHdrAcc_Cd").data("kendoComboBox").value(AccKy);
                        GetAccountDetailByAccKy(AccKy);
                        //AdrDuplicateFill = GetTheDuplicateFillOnOROff('HdrSec4_CmbDtlAdr_Cd');
                    } else {
                        //$("#HdrSec2_CmbHdrAcc_Nm").data("kendoComboBox").value("");
                        $("#HdrSec2_CmbHdrAcc_Cd").data("kendoComboBox").value("");
                        //$("#HdrSec2_CmbHdrAdr_Nm").data("kendoComboBox").value("");
                        $("#HdrSec2_CmbHdrAdr_Cd").data("kendoComboBox").value("");
                    }
                }

            },
            filter: "contains",
            suggest: true,
            placeholder: "Select an Accounts.."
        });
    //Account Dropdown Name
    //$("#HdrSec2_CmbHdrAcc_Nm")
    //    .kendoComboBox({
    //        dataValueField: "AccKy",
    //        dataTextField: "AccNm",
    //        dataSource: AccountDatasource('HdrSec2_CmbHdrAcc'),
    //        change: function (e) {
    //            var cmb = $("#HdrSec2_CmbHdrAcc_Nm").data("kendoComboBox");
    //            var AccKy = cmb.value();
    //            if (AccKy == 1 || AccKy == "") {
    //                //$("#HdrSec2_CmbHdrAcc_Nm").data("kendoComboBox").value("");
    //                $("#HdrSec2_CmbHdrAcc_Cd").data("kendoComboBox").value("");
    //                $("#HdrSec2_CmbHdrAdr_Nm").data("kendoComboBox").value("");
    //                $("#HdrSec2_CmbHdrAdr_Cd").data("kendoComboBox").value("");
    //            }
    //            if (AccKy != "" && AccKy != 1) {
    //                var validate = ComboValidations("HdrSec2_CmbHdrAcc_Nm");
    //                if (validate) {
    //                    //$("#HdrSec2_CmbHdrAcc_Nm").data("kendoComboBox").value(AccKy);
    //                    $("#HdrSec2_CmbHdrAcc_Cd").data("kendoComboBox").value(AccKy);
    //                    GetAccountDetailByAccKy(AccKy);
    //                    //      UpdateFirstRow();
    //                    //    detailBULoad();
    //                } else {
    //                    $("#HdrSec2_CmbHdrAcc_Nm").data("kendoComboBox").value("");
    //                    $("#HdrSec2_CmbHdrAcc_Cd").data("kendoComboBox").value("");
    //                    $("#HdrSec2_CmbHdrAdr_Nm").data("kendoComboBox").value("");
    //                    $("#HdrSec2_CmbHdrAdr_Cd").data("kendoComboBox").value("");
    //                }
    //            }

    //        },
    //        filter: "startswith",
    //        suggest: true,
    //        placeholder: "Select an Accounts.."
    //    });

    $("#HdrSec2_CmbHdrAcc_Cd").parent().css("width", "40%");
    //$("#HdrSec2_CmbHdrAcc_Nm").parent().css("width", "50%");

}

function detailBULoad() {
    //BU Code Drop Bottom
    $("#HdrSec4_CmbDtlBU_Cd")
        .kendoComboBox({
            dataValueField: "CdKy",
            dataTextField: "Code",
            dataSource: DetailBUCode('HdrSec4_CmbDtlBU'),// BUCode('HdrSec2_CmbBU'),
            change: function (e) {
                var cmb = $("#HdrSec4_CmbDtlBU_Cd").data("kendoComboBox");
                var BUKy = cmb.value();
                if (BUKy != "") {
                    var validate = ComboValidations("HdrSec4_CmbDtlBU_Cd");
                    if (validate) {

                        //$("#HdrSec4_CmbDtlBU_Cd").data("kendoComboBox").value(BUKy);
                        //$("#HdrSec4_CmbDtlBU_Nm").data("kendoComboBox").value(BUKy);
                        //    OdrNoLoad()
                        $("#HdrSec6_CmbOrder_Cd").data("kendoComboBox").setDataSource(GetOrderCode('HdrSec6_CmbOrder'));
                    } else {

                        $("#HdrSec4_CmbDtlBU_Cd").data("kendoComboBox").value("");
                        //$("#HdrSec4_CmbDtlBU_Nm").data("kendoComboBox").value("");

                    }
                }

            },
            filter: "contains",
            suggest: true,
            placeholder: "Select a BU"
        });
    //BU Name Drop Bottom
    //$("#HdrSec4_CmbDtlBU_Nm")
    //    .kendoComboBox({
    //        dataValueField: "CdKy",
    //        dataTextField: "Name",
    //        dataSource: DetailBUName('HdrSec4_CmbDtlBU'),// BUName('HdrSec2_CmbBU'),
    //        change: function (e) {
    //            var cmb = $("#HdrSec4_CmbDtlBU_Nm").data("kendoComboBox");
    //            var BUKy = cmb.value();
    //            if (BUKy != "") {
    //                var validate = ComboValidations("HdrSec4_CmbDtlBU_Nm");
    //                if (validate) {

    //                    $("#HdrSec4_CmbDtlBU_Cd").data("kendoComboBox").value(BUKy);
    //                   // OdrNoLoad()
    //                    //$("#HdrSec4_CmbDtlBU_Nm").data("kendoComboBox").value(BUKy);
    //                    $("#HdrSec6_CmbOrder_Cd").data("kendoComboBox").setDataSource(GetOrderCode('HdrSec6_CmbOrder'));

    //                } else {

    //                    //$("#HdrSec4_CmbDtlBU_Cd").data("kendoComboBox").value("");
    //                    $("#HdrSec4_CmbDtlBU_Nm").data("kendoComboBox").value("");

    //                }
    //            }

    //        },
    //        filter: "startswith",
    //        suggest: true,
    //        placeholder: "Select a BU"
    //    });
    $("#HdrSec4_CmbDtlBU_Cd").parent().css("width", "40%");
    //$("#HdrSec4_CmbDtlBU_Nm").parent().css("width", "50%");


}

//Get Details By sending accountkey
function GetAccountDetailByAccKy(AccKy) {
    var datepicker = document.getElementById("HdrSec1_DatVouDate_Val").value;
    $.ajax({
        url: urlGetAllDetail,
        data: JSON.stringify({
            AccKy: AccKy,
            datepicker: datepicker,
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "Json",
        type: "POST",
        success: function (data) {
            for (i = 0; i < data.length; i++) {

                var AdrKy = data[0].AdrKy;
                var AdrID = data[0].AdrID;
                var AdrNm = data[0].AdrNm;
                var CurncyCd = data[0].CurncyCd;
                var CurncyKy = data[0].CurncyKy;
                var CurncyNm = data[0].CurncyNm;
                var Rate = data[0].Rate;

                $("#HdrSec2_CmbHdrAdr_Cd").data("kendoComboBox").value(AdrKy);
                // $("#HdrSec2_CmbHdrAdr_Nm").data("kendoComboBox").value(AdrKy);
                $("#HdrSec3_CmbAccCurrncy_Cd").data("kendoComboBox").value(CurncyKy);
                $("#HdrSec3_InptAccExRate_Val").val(Rate);

                var grid = $("#PmtRcprGrd").data("kendoGrid");

                if (grid == undefined)
                    return;

                var dataSource = grid.dataSource;
                //records on current data / page   
                var recordsOnCurrentView = dataSource.data().length;
                if (recordsOnCurrentView >= 2) {
                    updateAccountDetailGrd()
                }

            }

        },
        error: function (e) {
            return false;
        }
    });

}

//DetailLevelCombo 

function LoadDetailCombo() {

    //Account Dropdown id
    $("#HdrSec4_CmbDtlAcc_Cd")
        .kendoComboBox({
            dataValueField: "AccKy",
            dataTextField: "AccCd",
            dataSource: DetailAccountCdload('HdrSec4_CmbDtlAcc'),
            change: function (e) {
                var cmb = $("#HdrSec4_CmbDtlAcc_Cd").data("kendoComboBox");
                var AccKy = cmb.value();
                if (AccKy != "") {
                    var validate = ComboValidations("HdrSec4_CmbDtlAcc_Cd");
                    if (validate) {
                        //$("#HdrSec4_CmbDtlAcc_Nm").data("kendoComboBox").value(AccKy);
                        //$("#HdrSec4_CmbDtlAcc_Cd").data("kendoComboBox").value(AccKy);
                        GetAccountDetailByDetailAccKy(AccKy);
                        GetAccountBankDetailByAccKy(AccKy);
                        //GetAccountDetailByAccKy(AccKy);
                    } else {
                        //$("#HdrSec4_CmbDtlAcc_Nm").data("kendoComboBox").value("");
                        $("#HdrSec4_CmbDtlAcc_Cd").data("kendoComboBox").value("");
                    }
                }

            },
            filter: "contains",
            suggest: true,
            placeholder: "Select an Accounts.."
        });
    //Account Dropdown Name
    //$("#HdrSec4_CmbDtlAcc_Nm")
    //    .kendoComboBox({
    //        dataValueField: "AccKy",
    //        dataTextField: "AccNm",
    //        dataSource: DetailAccountNmload('HdrSec4_CmbDtlAcc'),
    //        change: function (e) {
    //            var cmb = $("#HdrSec4_CmbDtlAcc_Nm").data("kendoComboBox");
    //            var AccKy = cmb.value();
    //            if (AccKy != "") {
    //                var validate = ComboValidations("HdrSec4_CmbDtlAcc_Nm");
    //                if (validate) {
    //                    //$("#HdrSec4_CmbDtlAcc_Nm").data("kendoComboBox").value(AccKy);
    //                    $("#HdrSec4_CmbDtlAcc_Cd").data("kendoComboBox").value(AccKy);
    //                    GetAccountDetailByDetailAccKy(AccKy);
    //                    GetAccountBankDetailByAccKy(AccKy);
    //                    //GetAccountDetailByAccKy(AccKy);

    //                } else {
    //                    //$("#HdrSec4_CmbDtlAcc_Nm").data("kendoComboBox").value("");

    //                    //$("#HdrSec4_CmbDtlAcc_Cd").data("kendoComboBox").value("");
    //                }
    //            }

    //        },
    //        filter: "startswith",
    //        suggest: true,
    //        placeholder: "Select an Accounts.."
    //    });

    //Address Name Drop Bottom
    $("#HdrSec4_CmbDtlAdr_Cd")
        .kendoComboBox({
            dataValueField: "AdrKy",
            dataTextField: "AdrID",
            dataSource: DetailAddressCode('HdrSec4_CmbDtlAdr'),// DetailAddressCode('HdrSec4_CmbDtlAdr'),
            change: function (e) {
                var cmb = $("#HdrSec4_CmbDtlAdr_Cd").data("kendoComboBox");
                var AdrKy = cmb.value();
                if (AdrKy != "") {
                    var validate = ComboValidations("HdrSec4_CmbDtlAdr_Cd");
                    if (validate) {

                        //$("#HdrSec4_CmbDtlAdr_Cd").data("kendoComboBox").value(AdrKy);
                        //$("#HdrSec4_CmbDtlAdr_Nm").data("kendoComboBox").value(AdrKy);
                        GetAccountDetailByDetailAdrKy(AdrKy);
                        //var AdrName = $("#HdrSec4_CmbDtlAdr_Nm").data("kendoComboBox").text();
                        //$("#HdrSec15_InpPayee_Val").val(AdrName);

                    } else {
                        //$("#HdrSec4_CmbDtlAdr_Nm").data("kendoComboBox").value("");
                        $("#HdrSec4_CmbDtlAdr_Cd").data("kendoComboBox").value("");
                        $("#HdrSec15_InpPayee_Val").val("");
                    }
                }

            },
            filter: "contains",
            suggest: true,
            placeholder: "Select an Address"
        });

    //Address Name Drop Bottom
    //$("#HdrSec4_CmbDtlAdr_Nm")
    //    .kendoComboBox({
    //        dataValueField: "AdrKy",
    //        dataTextField: "AdrNm",
    //        dataSource: DetailAddressName('HdrSec4_CmbDtlAdr'),//DetailAddressName('HdrSec4_CmbDtlAdr'),
    //        change: function (e) {
    //            var cmb = $("#HdrSec4_CmbDtlAdr_Nm").data("kendoComboBox");
    //            var AdrKy = cmb.value();
    //            if (AdrKy != "") {
    //                var validate = ComboValidations("HdrSec4_CmbDtlAdr_Nm");
    //                if (validate) {

    //                    //$("#HdrSec4_CmbDtlAdr_Nm").data("kendoComboBox").value(AdrKy);
    //                    $("#HdrSec4_CmbDtlAdr_Cd").data("kendoComboBox").value(AdrKy);
    //                    var AdrName = $("#HdrSec4_CmbDtlAdr_Nm").data("kendoComboBox").text();
    //                    $("#HdrSec15_InpPayee_Val").val(AdrName);
    //                } else {

    //                    $("#HdrSec4_CmbDtlAdr_Nm").data("kendoComboBox").value("");
    //                    //$("#HdrSec4_CmbDtlAdr_Cd").data("kendoComboBox").value("");
    //                    $("#HdrSec15_InpPayee_Val").val("");
    //                }
    //            }

    //        },
    //        filter: "startswith",
    //        suggest: true,
    //        placeholder: "Select an Address"
    //    });

    //Task Code Drop Bottom
    $("#HdrSec4_CmbTsk_Cd")
        .kendoComboBox({
            dataValueField: "PrsDetKy",
            dataTextField: "PrsDetCode",
            dataSource: urlGetTaskCode("HdrSec4_CmbTsk"),
            change: function (e) {
                var cmb = $("#HdrSec4_CmbTsk_Cd").data("kendoComboBox");
                var PrDetKy = cmb.value();
                if (PrDetKy != "") {
                    var validate = ComboValidations("HdrSec4_CmbTsk_Cd");
                    if (validate) {

                        //$("#HdrSec4_CmbTsk_Cd").data("kendoComboBox").value(PrDetKy);
                        //$("#HdrSec4_CmbTsk_Nm").data("kendoComboBox").value(PrDetKy);

                    } else {

                        $("#HdrSec4_CmbTsk_Cd").data("kendoComboBox").value("");
                        //$("#HdrSec4_CmbTsk_Nm").data("kendoComboBox").value("");
                    }
                }

            },
            filter: "contains",
            suggest: true,
            placeholder: "Select a Task"
        });
    //Task Name Drop Bottom
    //$("#HdrSec4_CmbTsk_Nm")
    //    .kendoComboBox({
    //        dataValueField: "PrsDetKy",
    //        dataTextField: "PrsDetNM",
    //        dataSource: urlGetTaskNm("HdrSec4_CmbTsk"),
    //        change: function (e) {
    //            var cmb = $("#HdrSec4_CmbTsk_Nm").data("kendoComboBox");
    //            var PrDetKy = cmb.value();
    //            if (PrDetKy != "") {
    //                var validate = ComboValidations("HdrSec4_CmbTsk_Nm");
    //                if (validate) {

    //                    $("#HdrSec4_CmbTsk_Cd").data("kendoComboBox").value(PrDetKy);
    //                    //$("#HdrSec4_CmbTsk_Nm").data("kendoComboBox").value(PrDetKy);

    //                } else {

    //                    //$("#HdrSec4_CmbTsk_Cd").data("kendoComboBox").value("");
    //                    $("#HdrSec4_CmbTsk_Nm").data("kendoComboBox").value("");
    //                }
    //            }

    //        },
    //        filter: "startswith",
    //        suggest: true,
    //        placeholder: "Select a Task"
    //    });
    //1
    $("#HdrSec8_CmbAnl1_Nm")
        .kendoComboBox({
            dataValueField: "CdKy",
            dataTextField: "Code",
            dataSource: BUCode('HdrSec8_CmbAnl1'),
            //dataValueField: "AnalysisKy",
            //dataTextField: "AnlNm",
            //dataSource: AnalysisNm(1, "HdrSec8_CmbAnl1"),
            change: function (e) {
                var cmb = $("#HdrSec8_CmbAnl1_Nm").data("kendoComboBox");
                var Anlky = cmb.value();
                if (Anlky != "") {
                    var validate = ComboValidations("HdrSec8_CmbAnl1_Nm");
                    if (validate) {

                        $("#HdrSec8_CmbAnl1_Cd").data("kendoComboBox").value(Anlky);
                        //$("#HdrSec8_CmbAnl1_Nm").data("kendoComboBox").value(Anlky);

                    } else {

                        //$("#HdrSec8_CmbAnl1_Cd").data("kendoComboBox").value("");
                        $("#HdrSec8_CmbAnl1_Nm").data("kendoComboBox").value("");
                    }
                }

            },
            filter: "contains",
            suggest: true,
            placeholder: "Select an Analysis 1"
        });

    $("#HdrSec8_CmbAnl1_Cd")
        .kendoComboBox({
            //dataValueField: "AnalysisKy",
            //dataTextField: "AnlNm",
            dataValueField: "CdKy",
            dataTextField: "Code",
            dataSource: BUCode('HdrSec8_CmbAnl1'), //AnalysisCd(1, "HdrSec8_CmbAnl1"),
            change: function (e) {
                var cmb = $("#HdrSec8_CmbAnl1_Cd").data("kendoComboBox");
                var Anlky = cmb.value();
                if (Anlky != "") {
                    var validate = ComboValidations("HdrSec8_CmbAnl1_Cd");
                    if (validate) {

                        //$("#HdrSec8_CmbAnl1_Cd").data("kendoComboBox").value(Anlky);
                        //$("#HdrSec8_CmbAnl1_Nm").data("kendoComboBox").value(Anlky);

                    } else {

                        $("#HdrSec8_CmbAnl1_Cd").data("kendoComboBox").value("");
                        //$("#HdrSec8_CmbAnl1_Nm").data("kendoComboBox").value("");
                    }
                }

            },
            filter: "contains",
            suggest: true,
            placeholder: "Select an Analysis 1"
        });

    //

    $("#HdrSec8_CmbAnl2_Nm")
        .kendoComboBox({
            dataValueField: "CdKy",
            dataTextField: "Code",
            dataSource: BUCode('HdrSec8_CmbAnl2'),
            //dataValueField: "AnalysisKy",
            //dataTextField: "AnlNm",
            //dataSource: AnalysisNm(2, "HdrSec8_CmbAnl2"),
            change: function (e) {
                var cmb = $("#HdrSec8_CmbAnl2_Nm").data("kendoComboBox");
                var Anlky = cmb.value();
                if (Anlky != "") {
                    var validate = ComboValidations("HdrSec8_CmbAnl2_Nm");
                    if (validate) {

                        $("#HdrSec8_CmbAnl2_Cd").data("kendoComboBox").value(Anlky);
                        //$("#HdrSec8_CmbAnl2_Nm").data("kendoComboBox").value(Anlky);

                    } else {

                        //$("#HdrSec8_CmbAnl2_Cd").data("kendoComboBox").value("");
                        $("#HdrSec8_CmbAnl2_Nm").data("kendoComboBox").value("");
                    }
                }

            },
            filter: "startswith",
            suggest: true,
            placeholder: "Select an Analysis 2"
        });

    $("#HdrSec8_CmbAnl2_Cd")
        .kendoComboBox({
            dataValueField: "CdKy",
            dataTextField: "Code",
            //dataValueField: "AnalysisKy",
            //dataTextField: "AnlNm",
            dataSource: BUCode('HdrSec8_CmbAnl2'),//AnalysisCd(2, "HdrSec8_CmbAnl2"),
            change: function (e) {
                var cmb = $("#HdrSec8_CmbAnl2_Cd").data("kendoComboBox");
                var Anlky = cmb.value();
                if (Anlky != "") {
                    var validate = ComboValidations("HdrSec8_CmbAnl2_Cd");
                    if (validate) {

                        //$("#HdrSec8_CmbAnl2_Cd").data("kendoComboBox").value(Anlky);
                        //$("#HdrSec8_CmbAnl2_Nm").data("kendoComboBox").value(Anlky);

                    } else {

                        $("#HdrSec8_CmbAnl2_Cd").data("kendoComboBox").value("");
                        //$("#HdrSec8_CmbAnl2_Nm").data("kendoComboBox").value("");
                    }
                }

            },
            filter: "contains",
            suggest: true,
            placeholder: "Select an Analysis 2"
        });
    //3
    $("#HdrSec9_CmbAnl3_Nm")
        .kendoComboBox({
            dataValueField: "CdKy",
            dataTextField: "Code",
            dataSource: BUCode('HdrSec9_CmbAnl3'),
            //dataValueField: "AnalysisKy",
            //dataTextField: "AnlNm",
            //dataSource: AnalysisNm(3, "HdrSec9_CmbAnl3"),
            change: function (e) {
                var cmb = $("#HdrSec9_CmbAnl3_Nm").data("kendoComboBox");
                var Anlky = cmb.value();
                if (Anlky != "") {
                    var validate = ComboValidations("HdrSec9_CmbAnl3_Nm");
                    if (validate) {

                        $("#HdrSec9_CmbAnl3_Cd").data("kendoComboBox").value(Anlky);
                        //$("#HdrSec9_CmbAnl3_Nm").data("kendoComboBox").value(Anlky);

                    } else {

                        //$("#HdrSec9_CmbAnl3_Cd").data("kendoComboBox").value("");
                        //$("#HdrSec9_CmbAnl3_Nm").data("kendoComboBox").value("");
                    }
                }

            },
            filter: "contains",
            suggest: true,
            placeholder: "Select an Analysis 3"
        });

    $("#HdrSec9_CmbAnl3_Cd")
        .kendoComboBox({
            dataValueField: "CdKy",
            dataTextField: "Code",
            dataSource: BUCode('HdrSec9_CmbAnl3'),
            //dataValueField: "AnalysisKy",
            //dataTextField: "AnlNm",
            //dataSource: AnalysisCd(3, "HdrSec9_CmbAnl3"),
            change: function (e) {
                var cmb = $("#HdrSec9_CmbAnl3_Cd").data("kendoComboBox");
                var Anlky = cmb.value();
                if (Anlky != "") {
                    var validate = ComboValidations("HdrSec9_CmbAnl3_Cd");
                    if (validate) {

                        //$("#HdrSec9_CmbAnl3_Cd").data("kendoComboBox").value(Anlky);
                        //$("#HdrSec9_CmbAnl3_Nm").data("kendoComboBox").value(Anlky);

                    } else {

                        $("#HdrSec9_CmbAnl3_Cd").data("kendoComboBox").value("");
                        //$("#HdrSec9_CmbAnl3_Nm").data("kendoComboBox").value("");
                    }
                }

            },
            filter: "contains",
            suggest: true,
            placeholder: "Select an Analysis 3"
        });

    //
    //4
    $("#HdrSec9_CmbAnl4_Nm")
        .kendoComboBox({
            dataValueField: "CdKy",
            dataTextField: "Code",
            dataSource: BUCode('HdrSec9_CmbAnl4'),
            //dataValueField: "AnalysisKy",
            //dataTextField: "AnlNm",
            //dataSource: AnalysisNm(4, "HdrSec9_CmbAnl4"),
            change: function (e) {
                var cmb = $("#HdrSec9_CmbAnl4_Nm").data("kendoComboBox");
                var Anlky = cmb.value();
                if (Anlky != "") {
                    var validate = ComboValidations("HdrSec9_CmbAnl4_Nm");
                    if (validate) {

                        $("#HdrSec9_CmbAnl4_Cd").data("kendoComboBox").value(Anlky);
                        //$("#HdrSec9_CmbAnl4_Nm").data("kendoComboBox").value(Anlky);

                    } else {

                        //$("#HdrSec9_CmbAnl4_Cd").data("kendoComboBox").value("");
                        //$("#HdrSec9_CmbAnl4_Nm").data("kendoComboBox").value("");
                    }
                }

            },
            filter: "contains",
            suggest: true,
            placeholder: "Select an Analysis 4"
        });

    $("#HdrSec9_CmbAnl4_Cd")
        .kendoComboBox({
            dataValueField: "CdKy",
            dataTextField: "Code",
            dataSource: BUCode('HdrSec9_CmbAnl4'),
            //dataValueField: "AnalysisKy",
            //dataTextField: "AnlNm",
            //dataSource: AnalysisCd(4, "HdrSec9_CmbAnl4"),
            change: function (e) {
                var cmb = $("#HdrSec9_CmbAnl4_Cd").data("kendoComboBox");
                var Anlky = cmb.value();
                if (Anlky != "") {
                    var validate = ComboValidations("HdrSec9_CmbAnl4_Cd");
                    if (validate) {

                        //$("#HdrSec9_CmbAnl4_Cd").data("kendoComboBox").value(Anlky);
                        //$("#HdrSec9_CmbAnl4_Nm").data("kendoComboBox").value(Anlky);

                    } else {

                        $("#HdrSec9_CmbAnl4_Cd").data("kendoComboBox").value("");
                        //$("#HdrSec9_CmbAnl4_Nm").data("kendoComboBox").value("");
                    }
                }

            },
            filter: "contains",
            suggest: true,
            placeholder: "Select an Analysis 4"
        });

    //
    //5
    $("#HdrSec10_CmbAnl5_Nm")
        .kendoComboBox({
            dataValueField: "CdKy",
            dataTextField: "Code",
            dataSource: BUCode('HdrSec10_CmbAnl5'),
            //dataValueField: "AnalysisKy",
            //dataTextField: "AnlNm",
            //dataSource: AnalysisNm(5, "HdrSec10_CmbAnl5"),
            change: function (e) {
                var cmb = $("#HdrSec10_CmbAnl5_Nm").data("kendoComboBox");
                var Anlky = cmb.value();
                if (Anlky != "") {
                    var validate = ComboValidations("HdrSec10_CmbAnl5_Nm");
                    if (validate) {

                        $("#HdrSec10_CmbAnl5_Cd").data("kendoComboBox").value(Anlky);
                        //$("#HdrSec10_CmbAnl5_Nm").data("kendoComboBox").value(Anlky);

                    } else {

                        //$("#HdrSec10_CmbAnl5_Cd").data("kendoComboBox").value("");
                        //$("#HdrSec10_CmbAnl5_Nm").data("kendoComboBox").value("");
                    }
                }

            },
            filter: "startswith",
            suggest: true,
            placeholder: "Select an Analysis 5"
        });

    $("#HdrSec10_CmbAnl5_Cd")
        .kendoComboBox({
            dataValueField: "CdKy",
            dataTextField: "Code",
            dataSource: BUCode('HdrSec10_CmbAnl5'),
            //dataValueField: "AnalysisKy",
            //dataTextField: "AnlNm",
            //dataSource: AnalysisCd(5, "HdrSec10_CmbAnl5"),
            change: function (e) {
                var cmb = $("#HdrSec10_CmbAnl5_Cd").data("kendoComboBox");
                var Anlky = cmb.value();
                if (Anlky != "") {
                    var validate = ComboValidations("HdrSec10_CmbAnl5_Cd");
                    if (validate) {

                        //$("#HdrSec10_CmbAnl5_Cd").data("kendoComboBox").value(Anlky);
                        //$("#HdrSec10_CmbAnl5_Nm").data("kendoComboBox").value(Anlky);

                    } else {

                        $("#HdrSec10_CmbAnl5_Cd").data("kendoComboBox").value("");
                        //$("#HdrSec10_CmbAnl5_Nm").data("kendoComboBox").value("");
                    }
                }

            },
            filter: "contains",
            suggest: true,
            placeholder: "Select an Analysis 5"
        });
    //
    //6
    $("#HdrSec10_CmbAnl6_Nm")
        .kendoComboBox({
            dataValueField: "CdKy",
            dataTextField: "Code",
            dataSource: BUCode('HdrSec10_CmbAnl6'),
            //dataValueField: "AnalysisKy",
            //dataTextField: "AnlNm",
            //dataSource: AnalysisNm(6, "HdrSec10_CmbAnl6"),
            change: function (e) {
                var cmb = $("#HdrSec10_CmbAnl6_Nm").data("kendoComboBox");
                var Anlky = cmb.value();
                if (Anlky != "") {
                    var validate = ComboValidations("HdrSec10_CmbAnl6_Nm");
                    if (validate) {

                        $("#HdrSec10_CmbAnl6_Cd").data("kendoComboBox").value(Anlky);
                        //$("#HdrSec10_CmbAnl6_Nm").data("kendoComboBox").value(Anlky);

                    } else {

                        //$("#HdrSec10_CmbAnl6_Cd").data("kendoComboBox").value("");
                        //$("#HdrSec10_CmbAnl6_Nm").data("kendoComboBox").value("");
                    }
                }

            },
            filter: "contains",
            suggest: true,
            placeholder: "Select an Analysis 6"
        });

    $("#HdrSec10_CmbAnl6_Cd")
        .kendoComboBox({
            dataValueField: "CdKy",
            dataTextField: "Code",
            dataSource: BUCode('HdrSec10_CmbAnl6'),
            //dataValueField: "AnalysisKy",
            //dataTextField: "AnlNm",
            //dataSource: AnalysisCd(6, "HdrSec10_CmbAnl6"),
            change: function (e) {
                var cmb = $("#HdrSec10_CmbAnl6_Cd").data("kendoComboBox");
                var Anlky = cmb.value();
                if (Anlky != "") {
                    var validate = ComboValidations("HdrSec10_CmbAnl6_Cd");
                    if (validate) {

                        //$("#HdrSec10_CmbAnl6_Cd").data("kendoComboBox").value(Anlky);
                        //$("#HdrSec10_CmbAnl6_Nm").data("kendoComboBox").value(Anlky);

                    } else {

                        $("#HdrSec10_CmbAnl6_Cd").data("kendoComboBox").value("");
                        //$("#HdrSec10_CmbAnl6_Nm").data("kendoComboBox").value("");
                    }
                }

            },
            filter: "contains",
            suggest: true,
            placeholder: "Select an Analysis 6"
        });
    //

    $("#HdrSec5_CmbPayMode_Cd")
        .kendoComboBox({
            dataValueField: "CdKy",
            dataTextField: "CdNm",
            dataSource: urlGetPaymentCode("HdrSec5_CmbPayMode"),
            change: function (e) {
                var cmb = $("#HdrSec5_CmbPayMode_Cd").data("kendoComboBox");
                var Anlky = cmb.value();
                if (Anlky != "") {
                    var validate = ComboValidations("HdrSec5_CmbPayMode_Cd");
                    if (validate) {
                        $("#HdrSec5_CmbPayMode_Cd").data("kendoComboBox").value(Anlky);
                        if (Anlky != 1) {
                            $.ajax({
                                url: urlIsCheq,
                                dataType: "json",
                                type: "POST",
                                data: JSON.stringify({
                                    CdKy: Anlky,
                                }),
                                contentType: 'application/json; charset=utf-8',
                                success: function (Ischq) {
                                    if (Ischq) {
                                        var Vaudate = $("#HdrSec1_DatVouDate_Val").data("kendoDatePicker").value()
                                        // document.getElementById("HdrSec1_DatVouDate_Val").value;
                                        $("#HdrSec5_DatChqDate_Val").data("kendoDatePicker").value(Vaudate);

                                    } else {
                                        $("#HdrSec5_DatChqDate_Val").data("kendoDatePicker").value("");

                                    }

                                }
                            });
                        }
                    } else {

                        $("#HdrSec5_CmbPayMode_Cd").data("kendoComboBox").value("");
                    }
                }

            },
            filter: "startswith",
            suggest: true,
            placeholder: "Select a Payment Mode"
        });

    $("#HdrSec7_CmbCurCode_Val")
        .kendoComboBox({
            dataValueField: "CdKy",
            dataTextField: "Code",
            dataSource: CurrencyLookup('HdrSec7_CmbCurCode'),

            change: function (e) {
                var cmb = $("#HdrSec7_CmbCurCode_Val").data("kendoComboBox");
                var CdKy = cmb.value();
                if (CdKy != "") {
                    var validate = ComboValidations("HdrSec7_CmbCurCode_Val");
                    if (validate) {

                        $("#HdrSec7_CmbCurCode_Val").data("kendoComboBox").value(CdKy);
                        GetDetailExRate(CdKy);
                    } else {

                        $("#HdrSec7_CmbCurCode_Val").data("kendoComboBox").value("");
                    }
                }

            },
            filter: "startswith",
            suggest: true,
            placeholder: "Select a Currency"
        });

    $("#HdrSec4_CmbDtlAcc_Cd").parent().css("width", "40%");
    //$("#HdrSec4_CmbDtlAcc_Nm").parent().css("width", "59%");
    $("#HdrSec4_CmbDtlAdr_Cd").parent().css("width", "40%");
    //$("#HdrSec4_CmbDtlAdr_Nm").parent().css("width", "59%");
    $("#HdrSec4_CmbTsk_Cd").parent().css("width", "40%");
    //$("#HdrSec4_CmbTsk_Nm").parent().css("width", "50%");
    $("#HdrSec8_CmbAnl2_Cd").parent().css("width", "43%");
    //$("#HdrSec8_CmbAnl2_Nm").parent().css("width", "54%");
    $("#HdrSec8_CmbAnl1_Cd").parent().css("width", "43%");
    //$("#HdrSec8_CmbAnl1_Nm").parent().css("width", "54%");
    $("#HdrSec9_CmbAnl3_Cd").parent().css("width", "43%");
    //$("#HdrSec9_CmbAnl3_Nm").parent().css("width", "54%");
    $("#HdrSec9_CmbAnl4_Cd").parent().css("width", "43%");
    //$("#HdrSec9_CmbAnl4_Nm").parent().css("width", "54%");
    $("#HdrSec10_CmbAnl5_Cd").parent().css("width", "43%");
    //$("#HdrSec10_CmbAnl5_Nm").parent().css("width", "54%");
    $("#HdrSec10_CmbAnl6_Cd").parent().css("width", "43%");
    //$("#HdrSec10_CmbAnl6_Nm").parent().css("width", "54%");


}

//Get All details by sending AccKy
function GetAccountDetailByDetailAccKy(AccKy) {
    var datepicker = document.getElementById("HdrSec1_DatVouDate_Val").value;
    $.ajax({
        url: urlGetAllDetail,
        data: JSON.stringify({
            AccKy: AccKy,
            datepicker: datepicker,
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "Json",
        type: "POST",
        success: function (data) {
            for (i = 0; i < data.length; i++) {

                var AdrKy = data[0].AdrKy;
                var AdrID = data[0].AdrID;
                var AdrNm = data[0].AdrNm;
                var CurncyCd = data[0].CurncyCd;
                var CurncyKy = data[0].CurncyKy;
                var CurncyNm = data[0].CurncyNm;
                var Rate = data[0].Rate;
                if ($("#PmtRcprGrd").data("kendoGrid").dataSource._data.length < 1) {
                    $("#HdrSec4_CmbDtlAdr_Cd").data("kendoComboBox").value(AdrKy);
                    //$("#HdrSec4_CmbDtlAdr_Nm").data("kendoComboBox").value(AdrKy);
                }
                else {
                    var AdrDuplicateFill = GetTheDuplicateFillOnOROff('HdrSec4_CmbDtlAdr');
                    if (AdrDuplicateFill != 1) {
                        $("#HdrSec4_CmbDtlAdr_Cd").data("kendoComboBox").value(AdrKy);
                        //$("#HdrSec4_CmbDtlAdr_Nm").data("kendoComboBox").value(AdrKy);
                    }
                }

                $("#HdrSec7_CmbCurCode_Val").data("kendoComboBox").value(CurncyKy);
                $("#HdrSec7_InptCurExRate_Cd").val(Rate);
                $("#HdrSec15_InpPayee_Val").val(AdrNm);


            }

        },
        error: function (e) {
            return false;
        }
    });

}

//Get details ExRate
function GetDetailExRate(CurKy) {
    var datepicker = document.getElementById("HdrSec1_DatVouDate_Val").value;
    $.ajax({
        url: urlGetExRate,
        data: JSON.stringify({
            CurKy: CurKy,
            datepicker: datepicker,
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "Json",
        type: "POST",
        success: function (data) {
            var HdrSec3_InptTrnExRate_Val = parseFloat(data).toFixed(2);
            document.getElementById("HdrSec7_InptCurExRate_Cd").value = HdrSec3_InptTrnExRate_Val;

        },
        error: function (e) {
            return false;
        }
    });
}

//Get Header Currency Ex Rate
function GetHdrAccCurExRate(CurKy) {
    var datepicker = document.getElementById("HdrSec1_DatVouDate_Val").value;
    $.ajax({
        url: urlGetExRate,
        data: JSON.stringify({
            CurKy: CurKy,
            datepicker: datepicker,
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "Json",
        type: "POST",
        success: function (data) {
            var HdrSec3_InptTrnExRate_Val = parseFloat(data).toFixed(2);
            document.getElementById("HdrSec3_InptAccExRate_Val").value = HdrSec3_InptTrnExRate_Val;

        },
        error: function (e) {
            return false;
        }
    });
}

//Select the home currency
function SelectHomeCurey() {
    $.ajax({
        url: urlGetHomeCurency,
        contentType: "application/json; charset=utf-8",
        dataType: "Json",
        type: "POST",
        success: function (data) {
            var CurKy = data;
            $("#HdrSec3_CmbTrnCurrncy_Cd").data("kendoComboBox").value(CurKy);
            GetHdrExRate(CurKy);
        },
        error: function (e) {
            return false;
        }
    });

}

//Get hdr ex rate
function GetHdrExRate(CurKy) {
    var datepicker = document.getElementById("HdrSec1_DatVouDate_Val").value;
    $.ajax({
        url: urlGetExRate,
        data: JSON.stringify({
            CurKy: CurKy,
            datepicker: datepicker,
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "Json",
        type: "POST",
        success: function (data) {
            var HdrSec3_InptTrnExRate_Val = parseFloat(data).toFixed(2);
            document.getElementById("HdrSec3_InptTrnExRate_Val").value = HdrSec3_InptTrnExRate_Val;

        },
        error: function (e) {
            return false;
        }
    });
}

//Updated the combo validation funciton to validate user data by charith
function ComboValidations(cmbNm) {
    var cmb = $("#" + cmbNm + "").data("kendoComboBox");
    var dataItem = cmb.dataItem();
    if (!dataItem) {
        alert("'" + cmb.value() + "' is not a Valid input");
        $("#" + cmbNm + "").data("kendoComboBox").value("");
        return false;
    } else {
        return true;
    }
}
////Combo validation funciton THis is a common funtion but this is not working correctly 
//function ComboValidations(cmbNm) {

//    var cmb = $("#" + cmbNm + "").data("kendoComboBox");
//    var val = cmb.value();

//    if (isNaN(val)) {
//        alert("'" + val + "' is not a Valid input");
//        $("#" + cmbNm + "").data("kendoComboBox").value("");
//        return false;
//    } else {

//        return true;
//    }
//}

//LOad the details account 
function LoadDetailAccount() {

    //Account Dropdown id
    $("#HdrSec4_CmbDtlAcc_Cd")
        .kendoComboBox({
            dataValueField: "AccKy",
            dataTextField: "AccCd",
            dataSource: DetailAccountCdload("HdrSec4_CmbDtlAcc"),
            change: function (e) {
                var cmb = $("#HdrSec4_CmbDtlAcc_Cd").data("kendoComboBox");
                var AccKy = cmb.value();
                if (AccKy != "") {
                    var validate = ComboValidations("HdrSec4_CmbDtlAcc_Cd");
                    if (validate) {
                        //$("#HdrSec4_CmbDtlAcc_Nm").data("kendoComboBox").value(AccKy);
                        //$("#HdrSec4_CmbDtlAcc_Cd").data("kendoComboBox").value(AccKy);
                        GetAccountDetailByDetailAccKy(AccKy);
                        //GetAccountDetailByAccKy(AccKy);
                    } else {
                        //$("#HdrSec4_CmbDtlAcc_Nm").data("kendoComboBox").value("");
                        $("#HdrSec4_CmbDtlAcc_Cd").data("kendoComboBox").value("");
                    }
                }

            },
            filter: "contains",
            suggest: true,
            placeholder: "Select an Accounts.."
        });
    //Account Dropdown Name
    //$("#HdrSec4_CmbDtlAcc_Nm")
    //    .kendoComboBox({
    //        dataValueField: "AccKy",
    //        dataTextField: "AccNm",
    //        dataSource: DetailAccountNmload("HdrSec4_CmbDtlAcc"),
    //        change: function (e) {
    //            var cmb = $("#HdrSec4_CmbDtlAcc_Nm").data("kendoComboBox");
    //            var AccKy = cmb.value();
    //            if (AccKy != "") {
    //                var validate = ComboValidations("HdrSec4_CmbDtlAcc_Nm");
    //                if (validate) {
    //                    //$("#HdrSec4_CmbDtlAcc_Nm").data("kendoComboBox").value(AccKy);
    //                    $("#HdrSec4_CmbDtlAcc_Cd").data("kendoComboBox").value(AccKy);
    //                    GetAccountDetailByDetailAccKy(AccKy);
    //                    //GetAccountDetailByAccKy(AccKy);

    //                } else {
    //                    $("#HdrSec4_CmbDtlAcc_Nm").data("kendoComboBox").value("");
    //                    //$("#HdrSec4_CmbDtlAcc_Cd").data("kendoComboBox").value("");
    //                }
    //            }

    //        },
    //        filter: "startswith",
    //        suggest: true,
    //        placeholder: "Select an Accounts.."
    //    });

}



//DataSourses______________________________________________________________________________________
//____Project data source
function ProjectCd(ObjNm) {
    var ObjVisible = GetObjVisible(ObjNm);
    if (ObjVisible == 0) {
        return [];
    }
    var ObjKy = GetObjKy(ObjNm);
    var dataSource = new kendo.data.DataSource(
    {
        transport: {
            read: {
                url: urlGetProjectCode,
                data: {
                    'ObjKy': ObjKy,
                    'TrnTypKy': FormGlblData.TrnTypKy,
                    'PreKy': "1"
                },
                dataType: "json"
            }
        }

    });
    return dataSource;
}
function ProjectNm(ObjNm) {
    var ObjVisible = GetObjVisible(ObjNm);
    if (ObjVisible == 0) {
        return [];
    }
    var ObjKy = GetObjKy(ObjNm);
    var dataSource = new kendo.data.DataSource(
    {
        transport: {
            read: {
                url: urlGetProjectNm,
                data: {
                    ObjKy: ObjKy,
                    'TrnTypKy': FormGlblData.TrnTypKy,
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
function BUName(ObjNm) {
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
                url: urlGetBUNm,
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
                url: urlGetAddressCd,
                data: {
                    ObjKy: ObjKy,
                    'TrnTypKy': FormGlblData.TrnTypKy,
                    'PreKy': "1"
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
                    'TrnTypKy': FormGlblData.TrnTypKy,
                    'PreKy': "1"
                },

                dataType: "json"
            }
        }

    });
    return dataSource;
}

//____ResAdrData Source
function ResiAdressCd(ObjNm) {
    var ObjVisible = GetObjVisible(ObjNm);
    if (ObjVisible == 0) {
        return [];
    }
    var ObjKy = GetObjKy(ObjNm);

    var dataSource = new kendo.data.DataSource(
    {
        transport: {
            read: {
                url: urlGetAddressCd,
                data: {
                    'ObjKy': ObjKy,
                    'TrnTypKy': FormGlblData.TrnTypKy,
                    'PreKy': "1"
                },
                dataType: "json"
            }
        }

    });
    return dataSource;
}
//____currency Code Dropdown
function CurrencyCode(ObjNm) {
    var ObjVisible = GetObjVisible(ObjNm);
    if (ObjVisible == 0) {
        return [];
    }
    var ObjKy = GetObjKy(ObjNm);
    var dataSource = new kendo.data.DataSource(
    {
        transport: {
            read: {
                url: urlGetCurrencyDrop,
                data: {
                    'ObjKy': ObjKy
                },
                dataType: "json"
            }
        }

    });
    return dataSource;
}
//____Currency Code
function AccCurency(ObjNm) {
    var ObjVisible = GetObjVisible(ObjNm);
    if (ObjVisible == 0) {
        return [];
    }
    var ObjKy = GetObjKy(ObjNm);
    var dataSource = new kendo.data.DataSource(
    {
        transport: {
            read: {
                url: urlGetCurrencyDrop,
                data: {
                    'ObjKy': ObjKy
                },
                dataType: "json"
            }
        }

    });
    return dataSource;
}
//____Bank Code 
function BanckCodeMob(ObjNm) {
    var ObjVisible = GetObjVisible(ObjNm);
    if (ObjVisible == 0) {
        return [];
    }
    var ObjKy = GetObjKy(ObjNm);
    var dataSource = new kendo.data.DataSource(
    {
        transport: {
            read: {
                url: urlGetBankCode,
                data: {
                    'ObjKy': ObjKy
                },
                dataType: "json"
            }
        }

    });
    return dataSource;
}
//____branch code 
function BranchCodeMob(ObjNm) {
    var ObjVisible = GetObjVisible(ObjNm);
    if (ObjVisible == 0) {
        return [];
    }
    var ObjKy = GetObjKy(ObjNm);
    var BankKy = document.getElementById("HdrSec6_CmbBank_Cd").value;
    if (!BankKy || BankKy == null) {
        BankKy = 1;
    }
    var dataSource = new kendo.data.DataSource(
    {
        transport: {
            read: {
                url: urlGetBranchode,
                data: {
                    'ObjKy': ObjKy,
                    'BankKy': BankKy
                },
                dataType: "json"
            }
        }

    });
    return dataSource;
}
//____LC LOad
function HdrSec4_CmbLC_Cd(ObjNm) {
    var ObjVisible = GetObjVisible(ObjNm);
    if (ObjVisible == 0) {
        return [];
    }
    var ObjKy = GetObjKy(ObjNm);
    var dataSource = new kendo.data.DataSource(
    {
        transport: {
            read: {
                url: urlGetLoan,
                data: {
                    'OurCode': 'LC',
                    'ObjKy': ObjKy,
                },
                dataType: "json"
            }
        }

    });
    return dataSource;
}
//____Loan 
function HdrSec5_CmbLoan_Cd(ObjNm) {
    var ObjVisible = GetObjVisible(ObjNm);
    if (ObjVisible == 0) {
        return [];
    }
    var ObjKy = GetObjKy(ObjNm);
    var dataSource = new kendo.data.DataSource(
    {
        transport: {
            read: {
                url: urlGetLoan,
                data: {
                    'OurCode': 'Loan',
                    'ObjKy': ObjKy,
                },
                dataType: "json"
            }
        }

    });
    return dataSource;
}
//____Get Order COde
function GetOrderCode(ObjNm) {
    var ObjVisible = GetObjVisible(ObjNm);
    if (ObjVisible == 0) {
        return [];
    }
    var PrjKy = 1;
    try {
        PrjKy = $("#HdrSec4_CmbDtlPrj_Cd").data("kendoComboBox").value();
    } catch (e) {
        PrjKy = 1;
    }
    if (!PrjKy || PrjKy == 1) {
        PrjKy = $("#HdrSec2_CmbPrj_Cd").data("kendoComboBox").value();
    }
    var BUKy = 1;
    try {
        BUKy = $("#HdrSec4_CmbDtlBU_Cd").data("kendoComboBox").value();
    } catch (e) {
        BUKy = 1;
    }

    if (!BUKy || BUKy == 1) {
        BUKy = $("#HdrSec2_CmbBU_Cd").data("kendoComboBox").value();
    }
    if (!PrjKy) {
        PrjKy = 1;
    }
    if (!BUKy) {
        BUKy = 1;
    }

    var ObjKy = GetObjKy(ObjNm);
    var dataSource = new kendo.data.DataSource(
        {
            transport: {
                read: {
                    url: urlGetOrderNo,
                    data: {
                        'ObjKy': ObjKy,
                        'BuKy': BUKy,
                        'PrjKy': PrjKy,
                    },
                    dataType: "json"
                }
            }

        });
    return dataSource;
}
//function GetOrderCode(ObjNm) {
//    var ObjVisible = GetObjVisible(ObjNm);
//    if (ObjVisible == 0) {
//        return [];
//    }
//    var ObjKy = GetObjKy(ObjNm);
//    var dataSource = new kendo.data.DataSource(
//    {
//        transport: {
//            read: {
//                url: urlGetOrderNo,
//                data: {
//                    'ObjKy': ObjKy,
//                },
//                dataType: "json"
//            }
//        }

//    });
//    return dataSource;
//}
//____Get Orderdet code
function GetOrderDetCode(ObjNm) {
    var ObjVisible = GetObjVisible(ObjNm);
    if (ObjVisible == 0) {
        return [];
    }
    var ObjKy = GetObjKy(ObjNm);
    var dataSource = new kendo.data.DataSource(
    {
        transport: {
            read: {
                url: urlGetOrderDet,
                data: {
                    'ObjKy': ObjKy,
                    'OrdrKy': "1",
                },
                dataType: "json"
            }
        }

    });
    return dataSource;
}
//____Account Data Soure
function AccountCodeDatasource(ObjNm) {
    var ObjVisible = GetObjVisible(ObjNm);
    if (ObjVisible == 0) {
        return [];
    }
    var ObjKy = GetObjKy(ObjNm);
    var MultiCredit;
    if ($("#HdrSec2_Chkbox_multi_Val").is(":checked")) {
        MultiCredit = 1;

    } else {
        MultiCredit = 0;

    }

    var dataSource = new kendo.data.DataSource(
    {
        transport: {
            read: {
                url: urlHdrAccCode,
                data: {
                    'ObjKy': ObjKy,
                    'TrnTypKy': FormGlblData.TrnTypKy,
                    'PreKy': MultiCredit,
                },
                dataType: "json"
            }
        }

    });
    return dataSource;
}
//Hdr Accounts
function AccountDatasource(ObjNm) {
    var ObjVisible = GetObjVisible(ObjNm);
    if (ObjVisible == 0) {
        return [];
    }
    var ObjKy = GetObjKy(ObjNm);
    var MultiCredit;
    if ($("#HdrSec2_Chkbox_multi_Val").is(":checked")) {
        MultiCredit = 1;

    } else {
        MultiCredit = 0;

    }

    // var OurCodePara = OurCode;
    var dataSource = new kendo.data.DataSource(
    {
        transport: {
            read: {
                url: urlHdrAccNme,
                data: {
                    'ObjKy': ObjKy,
                    'TrnTypKy': FormGlblData.TrnTypKy,
                    'PreKy': MultiCredit,

                },
                dataType: "json"
            }
        }

    });
    return dataSource;
}
//Details Account code
function DetailAccountCdload(ObjNm) {
    var ObjVisible = GetObjVisible(ObjNm);
    if (ObjVisible == 0) {
        return [];
    }
    var ObjKy = GetObjKy(ObjNm);
    var MultiCredit;
    if ($("#HdrSec2_Chkbox_multi_Val").is(":checked")) {
        MultiCredit = 1;

    } else {
        MultiCredit = 0;

    }

    var dataSource = new kendo.data.DataSource(
    {
        transport: {
            read: {
                url: urlDetailAccCode,
                data: {
                    'ObjKy': ObjKy,
                    'TrnTypKy': FormGlblData.TrnTypKy,
                    'PreKy': 1,

                },
                dataType: "json"
            }
        }

    });
    return dataSource;

}

function DetailAccountNmload(ObjNm) {
    var ObjVisible = GetObjVisible(ObjNm);
    if (ObjVisible == 0) {
        return [];
    }
    var ObjKy = GetObjKy(ObjNm);

    var MultiCredit;
    if ($("#HdrSec2_Chkbox_multi_Val").is(":checked")) {
        MultiCredit = 1;

    } else {
        MultiCredit = 0;

    }

    var dataSource = new kendo.data.DataSource(
    {
        transport: {
            read: {
                url: urlGetAccDoropNm,
                data: {
                    //'MultiCredit': MultiCredit,
                    //'OurCode': OurCode,
                    'ObjKy': ObjKy,
                    'TrnTypKy': FormGlblData.TrnTypKy,
                    'PreKy': 1,
                },
                dataType: "json"
            }
        }

    });
    return dataSource;

}

function projectChange(PrjKy) {

    $("#HdrSec4_CmbTsk_Cd")
       .kendoComboBox({
           dataValueField: "PrcsDetKy",
           dataTextField: "TaskID",
           dataSource: urlGetTaskCode("HdrSec4_CmbTsk", PrjKy),
           change: function (e) {
               var cmb = $("#HdrSec4_CmbTsk_Cd").data("kendoComboBox");
               var PrDetKy = cmb.value();
               if (PrDetKy != "") {
                   var validate = ComboValidations("HdrSec4_CmbTsk_Cd");
                   if (validate) {

                       //$("#HdrSec4_CmbTsk_Cd").data("kendoComboBox").value(PrDetKy);
                       //$("#HdrSec4_CmbTsk_Nm").data("kendoComboBox").value(PrDetKy);

                   } else {

                       $("#HdrSec4_CmbTsk_Cd").data("kendoComboBox").value("");
                       //$("#HdrSec4_CmbTsk_Nm").data("kendoComboBox").value("");
                   }
               }

           },
           filter: "contains",
           suggest: true,
           placeholder: "Select a Task"
       });
    //Task Name Drop Bottom
    //$("#HdrSec4_CmbTsk_Nm")
    //    .kendoComboBox({
    //        dataValueField: "PrcsDetKy",
    //        dataTextField: "TaskNm",
    //        dataSource: urlGetTaskNm("HdrSec4_CmbTsk", PrjKy),
    //        change: function (e) {
    //            var cmb = $("#HdrSec4_CmbTsk_Nm").data("kendoComboBox");
    //            var PrDetKy = cmb.value();
    //            if (PrDetKy != "") {
    //                var validate = ComboValidations("HdrSec4_CmbTsk_Nm");
    //                if (validate) {

    //                    $("#HdrSec4_CmbTsk_Cd").data("kendoComboBox").value(PrDetKy);
    //                    //$("#HdrSec4_CmbTsk_Nm").data("kendoComboBox").value(PrDetKy);

    //                } else {

    //                    //$("#HdrSec4_CmbTsk_Cd").data("kendoComboBox").value("");
    //                    //$("#HdrSec4_CmbTsk_Nm").data("kendoComboBox").value("");
    //                }
    //            }

    //        },
    //        filter: "startswith",
    //        suggest: true,
    //        placeholder: "Select an Task"
    //    });
}

//____Task
function urlGetTaskCode(ObjNm, PrjKy) {
    var ObjVisible = GetObjVisible(ObjNm);
    if (ObjVisible == 0) {
        return [];
    }
    var ObjKy = GetObjKy(ObjNm);
    //var cmbFmPrjId = document.getElementById("HdrSec2_CmbPrj_Cd").value;
    if (!PrjKy) {
        PrjKy = 1;
    }

    var dataSource = new kendo.data.DataSource(
    {
        transport: {
            read: {
                url: urlDetlGetTaskCode,

                data: {
                    'ObjKy': ObjKy,
                    'PrjKy': PrjKy,
                },
                dataType: "json"

            }
        }

    });
    return dataSource;
}

function urlGetTaskNm(ObjNm, PrjKy) {
    var ObjVisible = GetObjVisible(ObjNm);
    if (ObjVisible == 0) {
        return [];
    }
    var ObjKy = GetObjKy(ObjNm);
    //  var cmbFmPrjId = document.getElementById("HdrSec2_CmbPrj_Cd").value;
    if (!PrjKy) {
        PrjKy = 1;
    }

    var dataSource = new kendo.data.DataSource(
    {
        transport: {
            read: {
                url: urlDetlGetTaskNm,
                data: {
                    'ObjKy': ObjKy,
                    'PrjKy': PrjKy,
                },
                dataType: "json"
            }
        }

    });
    return dataSource;
}

//Adress Code Combo
function DetailAddressCode(ObjNm) {
    var ObjVisible = GetObjVisible(ObjNm);
    if (ObjVisible == 0) {
        return [];
    }
    var ObjKy = GetObjKy(ObjNm);
    var dataSource = new kendo.data.DataSource(
    {
        transport: {
            read: {
                url: urlGetAddressCd,
                data: {
                    'ObjKy': ObjKy,
                    'TrnTypKy': FormGlblData.TrnTypKy,
                    'PreKy': 1,
                },
                dataType: "json",
                cache: false
            }
        }

    });
    return dataSource;

}

function DetailAddressName(ObjNm) {
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
                    'TrnTypKy': FormGlblData.TrnTypKy,
                    'PreKy': 1,
                },
                dataType: "json"
            }
        }

    });
    return dataSource;

}

function urlGetPaymentCode(ObjNm) {
    var ObjVisible = GetObjVisible(ObjNm);
    if (ObjVisible == 0) {
        return [];
    }
    var ObjKy = GetObjKy(ObjNm);
    var dataSource = new kendo.data.DataSource(
    {
        transport: {
            read: {
                url: PMTGetPaymentCode,
                data: {
                    'ObjKy': ObjKy,
                },
                dataType: "json"
            }
        }

    });
    return dataSource;

}



function CurrencyLookup(ObjNm) {
    var ObjVisible = GetObjVisible(ObjNm);
    if (ObjVisible == 0) {
        return [];
    }
    var ObjKy = GetObjKy(ObjNm);
    var dataSource = new kendo.data.DataSource(
    {
        transport: {
            read: {
                url: urlGetCurrencyDrop,
                data: {
                    'ObjKy': ObjKy,
                },
                dataType: "json"
            }
        }

    });
    return dataSource;

}

function ChangeBank() {
    $("#HdrSec6_CmbBranch_Cd")
        .kendoComboBox({
            dataValueField: "BrachKy",
            dataTextField: "BrachCode",
            dataSource: BranchCodeMob('HdrSec6_CmbBranch'),
            change: function (e) {
                var cmb = $("#HdrSec6_CmbBranch_Cd").data("kendoComboBox");
                var BranchKy = cmb.value();
                if (BranchKy != "") {
                    var validate = ComboValidations("HdrSec6_CmbBranch_Cd");
                    if (validate) {
                        //$("#HdrSec6_CmbBranch_Cd").data("kendoComboBox").value(BranchKy);
                    } else {
                        $("#HdrSec6_CmbBranch_Cd").data("kendoComboBox").value("");
                    }
                }

            },
            filter: "startswith",
            suggest: true,
            placeholder: "Select a Branch"
        });


}

//SetBankDetails
//Get Details By sending accountkey
function GetAccountBankDetailByAccKy(AccKy) {
    $.ajax({
        url: UrlBankDetailSelect,
        data: JSON.stringify({
            AccKy: AccKy,
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "Json",
        type: "POST",
        success: function (data) {
            if (data.length != 0) {
                var BranchKy = data[0].BranchKy;
                var BankKy = data[0].BankKy;
                $("#HdrSec6_CmbBank_Cd").data("kendoComboBox").value(BankKy);
                LoadBranches();
                $("#HdrSec6_CmbBranch_Cd").data("kendoComboBox").value(BranchKy);
            } else {
                $("#HdrSec6_CmbBank_Cd").data("kendoComboBox").value("1");
                LoadBranches();
                $("#HdrSec6_CmbBranch_Cd").data("kendoComboBox").value("1");


            }

        },
        error: function (e) {
            return false;
        }
    });

}

function LoadBranches() {
    $("#HdrSec6_CmbBranch_Cd")
      .kendoComboBox({
          dataValueField: "BrachKy",
          dataTextField: "BrachCode",
          dataSource: BranchCodeMob('HdrSec6_CmbBranch'),
          change: function (e) {
              var cmb = $("#HdrSec6_CmbBranch_Cd").data("kendoComboBox");
              var BranchKy = cmb.value();
              if (BranchKy != "") {
                  var validate = ComboValidations("HdrSec6_CmbBank_Cd");
                  if (validate) {
                      $("#HdrSec6_CmbBranch_Cd").data("kendoComboBox").value(BranchKy);
                  } else {
                      $("#HdrSec6_CmbBranch_Cd").data("kendoComboBox").value("");
                  }
              }

          },
          filter: "startswith",
          suggest: true,
          placeholder: "Select a Branch"
      });


}

function DetailBUCode(ObjNm) {
    var ObjVisible = GetObjVisible(ObjNm);
    if (ObjVisible == 0) {
        return [];
    }
    var ObjKy = GetObjKy(ObjNm);
    var PreKy = $("#HdrSec2_CmbBU_Cd").data("kendoComboBox").value();
    if (PreKy == "") {
        PreKy = 1;
    }

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

function DetailBUName(ObjNm) {
    var ObjVisible = GetObjVisible(ObjNm);
    if (ObjVisible == 0) {
        return [];
    }
    var ObjKy = GetObjKy(ObjNm);
    var PreKy = $("#HdrSec2_CmbBU_Cd").data("kendoComboBox").value();
    if (PreKy == "") {
        PreKy = 1;
    }

    var dataSource = new kendo.data.DataSource(
    {
        transport: {
            read: {
                url: urlGetBUNm,
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

function IsValidatePrefixBU(trnKy, trnTypKy, trnDt, locKy, prjKy, buKy, cdKy) {
    var isValid = false;
    var ErrorMessage = ""
    $.ajax({
        url: urlIsPrefix,
        dataType: "json",
        type: "POST",
        data: JSON.stringify({
            trnKy: trnKy,
            trnTypKy: trnTypKy,
            trnDt: trnDt,
            locKy: locKy,
            prjKy: prjKy,
            buKy: buKy,
            cdKy: cdKy,
        }),
        contentType: 'application/json; charset=utf-8',
        success: function (IsValidate) {
            isValid = IsValidate[0].IsValidate;
            ErrorMessage = IsValidate[0].ErrorMsg;
            if (isValid) {
                $("#HdrSec2_CmbBU_Cd").data("kendoComboBox").value(buKy);
                //$("#HdrSec2_CmbBU_Nm").data("kendoComboBox").value(buKy);
                ChangeBU(buKy)
            } else {
                alert(ErrorMessage);
                var buKy = FormGlblData.TempBU;
                $("#HdrSec2_CmbBU_Cd").data("kendoComboBox").value(buKy);
                //$("#HdrSec2_CmbBU_Nm").data("kendoComboBox").value(buKy);
                ChangeBU(buKy);
            }
        }
    });

}

function IsValidatePrefixPrj(trnKy, trnTypKy, trnDt, locKy, prjKy, buKy, cdKy) {
    var isValid = false;
    var ErrorMessage = ""
    $.ajax({
        url: urlIsPrefix,
        dataType: "json",
        type: "POST",
        data: JSON.stringify({
            trnKy: trnKy,
            trnTypKy: trnTypKy,
            trnDt: trnDt,
            locKy: locKy,
            prjKy: prjKy,
            buKy: buKy,
            cdKy: cdKy,
        }),
        contentType: 'application/json; charset=utf-8',
        success: function (IsValidate) {
            isValid = IsValidate[0].IsValidate;
            ErrorMessage = IsValidate[0].ErrorMsg;
            if (isValid) {
                $("#HdrSec2_CmbPrj_Cd").data("kendoComboBox").value(prjKy);
                //$("#HdrSec2_CmbPrj_Nm").data("kendoComboBox").value(prjKy);
                ChangeProject(prjKy)
            } else {
                alert(ErrorMessage);
                var prjKy = FormGlblData.TempPrj;
                $("#HdrSec2_CmbPrj_Cd").data("kendoComboBox").value(prjKy);
               // $("#HdrSec2_CmbPrj_Nm").data("kendoComboBox").value(prjKy);
                ChangeProject(prjKy)
            }
        }
    });

}

function DateFormatter(VouDate) {

    var afdate = VouDate.split('/');
    var Date = afdate[0];
    var ddlfmonth = afdate[1];
    var ddlfyear = afdate[2];
    var VauDate = ddlfyear + '/' + ddlfmonth + '/' + Date;
    return VauDate
}

function updateAccountDetailGrd() {
    var AccountKy = $("#HdrSec2_CmbHdrAcc_Cd").data("kendoComboBox").value();
    var HdrAcc_Cd = $("#HdrSec2_CmbHdrAcc_Cd").data("kendoComboBox").text();
    //var HdrAcc_Nm = $("#HdrSec2_CmbHdrAcc_Nm").data("kendoComboBox").text();
    var AddressKy = $("#HdrSec2_CmbHdrAdr_Cd").data("kendoComboBox").value();
    var HdrAdr_Cd = $("#HdrSec2_CmbHdrAdr_Cd").data("kendoComboBox").text();
    //var HdrAdr_Nm = $("#HdrSec2_CmbHdrAdr_Nm").data("kendoComboBox").text();
    var AccCurencyKy = $("#HdrSec3_CmbAccCurrncy_Cd").data("kendoComboBox").value();
    if (!AccCurencyKy || AccCurencyKy == "") {
        AccCurencyKy = 1;
    }
    var AccCurrncy_Cd = $("#HdrSec3_CmbAccCurrncy_Cd").data("kendoComboBox").text();
    var AccExRate_Val = document.getElementById("HdrSec3_InptAccExRate_Val").value;

    var FirstRow = $("#PmtRcprGrd").data().kendoGrid.dataSource.data()[0];

    FirstRow.set("AccKy", AccountKy);
    FirstRow.set("AccCd", HdrAcc_Cd);
    //FirstRow.set("AccNm", HdrAcc_Nm);
    FirstRow.set("AdrKy", AddressKy);
    FirstRow.set("AdrCd", HdrAdr_Cd);
    FirstRow.set("AdrNm", HdrAdr_Nm);
    FirstRow.set("CurencyKy", AccCurencyKy);
    FirstRow.set("CurencyCd", AccCurrncy_Cd);
    FirstRow.set("ExRate", AccExRate_Val);
}

function OdrNoLoad() {

    //HdrSec6_CmbOrder_Cd Code Drop Bottom
    $("#HdrSec6_CmbOrder_Cd")
        .kendoComboBox({
            dataValueField: "OrdrKy",
            dataTextField: "OrdrCode",
            dataSource: GetOrderCode('HdrSec6_CmbOrder'),
            change: function (e) {
                var cmb = $("#HdrSec6_CmbOrder_Cd").data("kendoComboBox");
                var OrdrKy = cmb.value();
                if (OrdrKy != "") {
                    var validate = ComboValidations("HdrSec6_CmbOrder_Cd");
                    if (!validate) {
                        $("#HdrSec6_CmbOrder_Cd").data("kendoComboBox").value("");
                    }
                }
            },
            filter: "startswith",
            suggest: true,
            placeholder: "Select an Order"
        });
}

//Get All details by sending AccKy
function GetAccountDetailByDetailAdrKy(AdrKy) {
    var datepicker = document.getElementById("HdrSec1_DatVouDate_Val").value;
    $.ajax({
        url: urlGetPayeeNameDetail,
        data: JSON.stringify({
            AdrKy: AdrKy,
            datepicker: datepicker,
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "Json",
        type: "POST",
        success: function (data) {
            for (i = 0; i < data.length; i++) {

                var AdrKy = data[0].AdrKy;
                var AdrID = data[0].AdrID;
                var AdrNm = data[0].AdrNm;
                $("#HdrSec15_InpPayee_Val").val(AdrNm);
            }

        },
        error: function (e) {
            return false;
        }
    });

}