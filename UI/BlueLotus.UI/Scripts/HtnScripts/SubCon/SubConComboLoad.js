function SubConCombo() {


    var dsSubContracts_LookupWeb = new kendo.data.DataSource(
    {


        transport: {

            read: {
                url: urlSubContracts_LookupWeb,
                data: {},
                dataType: "json"
            }
        }
    });

    var dsPaymentsTerms = new kendo.data.DataSource(
    {
        transport: {
            read: {
                url: urlCdMas_OurCdLookup,
                data: { ConCd: 'PmtTrm' },
                dataType: "json"
            }
        }
    });

    var dsCurrency = new kendo.data.DataSource(
    {
        transport: {
            read: {
                url: urlCdMas_OurCdLookup,
                data: { ConCd: 'CRN' },
                dataType: "json"
            }
        }
    });

    $("#subContractIdCmb").kendoComboBox({
        dataValueField: "SCPrjKy",
        dataTextField: "SubConId",
        dataSource: dsSubContracts_LookupWeb,

        filter: "contains",
        suggest: true,
        placeholder: "Sub Contract Id ...",
        change: function (e) {
            // 
            var cmb = $("#subContractIdCmb").data("kendoComboBox");
            var SCPrjKy = cmb.value();
            if (SCPrjKy != "") {
                var validate = ComboValidations("subContractIdCmb");
                if (validate) {
                    $("#subContractIdCmb").data("kendoComboBox").value(SCPrjKy);
                    $("#subContractNmCmb").data("kendoComboBox").value(SCPrjKy);
                    $("#projectIdCmb").data("kendoComboBox").value(SCPrjKy);
                    $("#projectNmCmb").data("kendoComboBox").value(SCPrjKy);
                    $("#contractIdCmb").data("kendoComboBox").value(SCPrjKy);
                    $("#contractNmCmb").data("kendoComboBox").value(SCPrjKy);
                } else {
                    $("#subContractIdCmb").data("kendoComboBox").value("");
                    $("#subContractNmCmb").data("kendoComboBox").value("");
                    $("#projectIdCmb").data("kendoComboBox").value("");
                    $("#projectNmCmb").data("kendoComboBox").value("");
                    $("#contractIdCmb").data("kendoComboBox").value("");
                    $("#contractNmCmb").data("kendoComboBox").value("");
                }
            }
        }
    });
    $("#subContractIdCmb").parent().css('width', "130px");

    $("#subContractNmCmb").kendoComboBox({
        dataValueField: "SCPrjKy",
        dataTextField: "SubConNm",
        dataSource: dsSubContracts_LookupWeb,
        filter: "contains",
        suggest: true,
        placeholder: "Sub Contract Name ...",
        change: function (e) {
            var cmb = $("#subContractNmCmb").data("kendoComboBox");
            var SCPrjKy = cmb.value();
            if (SCPrjKy != "") {
                var validate = ComboValidations("subContractNmCmb");
                if (validate) {
                    $("#subContractNmCmb").data("kendoComboBox").value(SCPrjKy);
                    $("#subContractIdCmb").data("kendoComboBox").value(SCPrjKy);
                    $("#projectIdCmb").data("kendoComboBox").value(SCPrjKy);
                    $("#projectNmCmb").data("kendoComboBox").value(SCPrjKy);
                    $("#contractIdCmb").data("kendoComboBox").value(SCPrjKy);
                    $("#contractNmCmb").data("kendoComboBox").value(SCPrjKy);
                } else {
                    $("#subContractNmCmb").data("kendoComboBox").value("");
                    $("#subContractIdCmb").data("kendoComboBox").value("");
                    $("#projectIdCmb").data("kendoComboBox").value("");
                    $("#projectNmCmb").data("kendoComboBox").value("");
                    $("#contractIdCmb").data("kendoComboBox").value("");
                    $("#contractNmCmb").data("kendoComboBox").value("");
                }
            }
        }
    });
    $("#subContractNmCmb").parent().css('width', "200px");

    $("#projectIdCmb").kendoComboBox({

        dataValueField: "PrntKy",
        dataTextField: "PrjId",
        dataSource: dsSubContracts_LookupWeb,
        filter: "contains",
        suggest: true,
        placeholder: "Project Id ...",
        enabled: true
        //change: function (e) {
        //    var cmb = $("#projectIdCmb").data("kendoComboBox");
        //    var PrntKy = cmb.value();
        //    if (PrntKy != "") {
        //        var validate = ComboValidations("projectIdCmb");
        //        if (validate) {
        //            $("#projectIdCmb").data("kendoComboBox").value(PrntKy);
        //            $("#projectNmCmb").data("kendoComboBox").value(PrntKy);
        //        } else {
        //            $("#projectIdCmb").data("kendoComboBox").value("");
        //            $("#projectNmCmb").data("kendoComboBox").value("");
        //        }
        //    }
        //}
    });
    $("#projectIdCmb").parent().css('width', "130px");

    $("#projectNmCmb").kendoComboBox({
        dataValueField: "SCPrjKy",
        dataTextField: "PrjNm",
        dataSource: dsSubContracts_LookupWeb,
        filter: "contains",
        suggest: true,
        placeholder: "Project Name ...",
        //change: function (e) {
        //    var cmb = $("#projectNmCmb").data("kendoComboBox");
        //    var PrntKy = cmb.value();
        //    if (PrntKy != "") {
        //        var validate = ComboValidations("projectNmCmb");
        //        if (validate) {
        //            $("#projectNmCmb").data("kendoComboBox").value(PrntKy);
        //            $("#projectIdCmb").data("kendoComboBox").value(PrntKy);
        //        } else {
        //            $("#projectNmCmb").data("kendoComboBox").value("");
        //            $("#projectIdCmb").data("kendoComboBox").value("");
        //        }
        //    }
        //}
    });
    $("#projectNmCmb").parent().css('width', "200px");

    $("#contractIdCmb").kendoComboBox({
        dataValueField: "SCPrjKy",
        dataTextField: "SubConAccCd",
        dataSource: dsSubContracts_LookupWeb,
        filter: "contains",
        suggest: true,
        placeholder: "Contract Id ...",
        //change: function (e) {
        //    var cmb = $("#contractIdCmb").data("kendoComboBox");
        //    var SubConAccKy = cmb.value();
        //    if (SubConAccKy != "") {
        //        var validate = ComboValidations("contractIdCmb");
        //        if (validate) {
        //            $("#contractIdCmb").data("kendoComboBox").value(SubConAccKy);
        //            $("#contractNmCmb").data("kendoComboBox").value(SubConAccKy);
        //        } else {
        //            $("#contractIdCmb").data("kendoComboBox").value("");
        //            $("#contractNmCmb").data("kendoComboBox").value("");
        //        }
        //    }
        //}
    });
    $("#contractIdCmb").parent().css('width', "130px");

    $("#contractNmCmb").kendoComboBox({
        dataValueField: "SCPrjKy",
        dataTextField: "SubConAccNm",
        dataSource: dsSubContracts_LookupWeb,
        filter: "contains",
        suggest: true,
        placeholder: "Contract Name ...",
        //change: function (e) {
        //    var cmb = $("#contractNmCmb").data("kendoComboBox");
        //    var SubConAccKy = cmb.value();
        //    if (SubConAccKy != "") {
        //        var validate = ComboValidations("contractNmCmb");
        //        if (validate) {
        //            $("#contractNmCmb").data("kendoComboBox").value(SubConAccKy);
        //            $("#contractIdCmb").data("kendoComboBox").value(SubConAccKy);
        //        } else {
        //            $("#contractNmCmb").data("kendoComboBox").value("");
        //            $("#contractIdCmb").data("kendoComboBox").value("");
        //        }
        //    }
        //}
    });
    $("#contractNmCmb").parent().css('width', "200px");

    $("#pmtTrmsCmb").kendoComboBox({
        dataValueField: "CdKy",
        dataTextField: "Code",
        dataSource: dsPaymentsTerms,
        filter: "contains",
        suggest: true,
        placeholder: "Payments Terms ..."
    });
    $("#pmtTrmsCmb").parent().css('width', "150px");

    $("#curncyCmb").kendoComboBox({
        dataValueField: "CdKy",
        dataTextField: "Code",
        dataSource: dsCurrency,
        filter: "contains",
        suggest: true,
        placeholder: "Currency ..."
    });
    $("#curncyCmb").parent().css('width', "150px");
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

