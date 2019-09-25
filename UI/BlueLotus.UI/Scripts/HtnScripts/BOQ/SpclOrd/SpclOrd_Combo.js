
function LoadOrdOutLet() { }

function LoadOrdOutLetAdr(PreKy) {
    PreKy = Number(PreKy);
}

function LoadDeliNoTo(PreKy) {

    PreKy = Number(PreKy);

    $("#HdrSec2_CmbDeliNoTo_Cd").kendoComboBox({
        dataValueField: "AdrKy",
        dataTextField: "AdrID",
        dataSource: AdrID_SelectMob_DataSourceWithTrnTyp('HdrSec2_CmbDeliNoTo', PreKy),
        change: function (e) {
            var cmb = $("#HdrSec2_CmbDeliNoTo_Cd").data("kendoComboBox");
            var CdKy = cmb.value();
            if (CdKy != "") {
                var validate = ComboValidations("HdrSec2_CmbDeliNoTo_Cd");
                if (validate) {
                    $("#HdrSec2_CmbDeliNoTo_Nm").data("kendoComboBox").value(CdKy);
                    $("#HdrSec2_CmbDeliNoTo_Cd").data("kendoComboBox").value(CdKy);
                    setDefault();
                } else {
                    $("#HdrSec2_CmbDeliNoTo_Nm").data("kendoComboBox").value("");
                    $("#HdrSec2_CmbDeliNoTo_Cd").data("kendoComboBox").value("");
                }
            }
        },
        filter: "contains",
        suggest: true,
        placeholder: "Outlet Address Cd ..."
    });

    $("#HdrSec2_CmbDeliNoTo_Nm").kendoComboBox({
        dataValueField: "AdrKy",
        dataTextField: "AdrNm",
        dataSource: AdrNm_SelectMob_DataSourceWithTrnTyp('HdrSec2_CmbDeliNoTo', PreKy),
        change: function (e) {
            var cmb = $("#HdrSec2_CmbDeliNoTo_Nm").data("kendoComboBox");
            var CdKy = cmb.value();
            if (CdKy != "") {
                var validate = ComboValidations("HdrSec2_CmbDeliNoTo_Nm");
                if (validate) {
                    $("#HdrSec2_CmbDeliNoTo_Cd").data("kendoComboBox").value(CdKy);
                    $("#HdrSec2_CmbDeliNoTo_Nm").data("kendoComboBox").value(CdKy);
                    setDefault();
                } else {
                    $("#HdrSec2_CmbDeliNoTo_Nm").data("kendoComboBox").value("");
                    $("#HdrSec2_CmbDeliNoTo_Cd").data("kendoComboBox").value("");
                }
            }
        },
        filter: "contains",
        suggest: true,
        placeholder: "Outlet Deli No To ..."
    });
}

function LoadProdTime() {

    $("#HdrSec3_CmbProdTime_Cd").kendoComboBox({
        dataValueField: "CdKy",
        dataTextField: "Code",
        dataSource: dataSrcCreateCodeCdMasLookUp('HdrSec3_CmbProdTime'),
        change: function (e) {
            var cmb = $("#HdrSec3_CmbProdTime_Cd").data("kendoComboBox");
            var CdKy = cmb.value();
            if (CdKy != "") {
                var validate = ComboValidations("HdrSec3_CmbProdTime_Cd");
                if (validate) {
                    $("#HdrSec3_CmbProdTime_Cd").data("kendoComboBox").value(CdKy);
                    setDefault();
                } else {
                    $("#HdrSec3_CmbProdTime_Cd").data("kendoComboBox").value("");
                }
            }
        },
        filter: "contains",
        suggest: true,
        placeholder: "Outlet Address Cd ..."
    });
}

function LoadProdDisptTime() {

    $("#HdrSec3_CmbProdDisptTime_Cd").kendoComboBox({
        dataValueField: "CdKy",
        dataTextField: "Code",
        dataSource: dataSrcCreateCodeCdMasLookUp('HdrSec3_CmbProdDisptTime'),
        change: function (e) {
            var cmb = $("#HdrSec3_CmbProdDisptTime_Cd").data("kendoComboBox");
            var CdKy = cmb.value();
            if (CdKy != "") {
                var validate = ComboValidations("HdrSec3_CmbProdDisptTime_Cd");
                if (validate) {
                    $("#HdrSec3_CmbProdDisptTime_Cd").data("kendoComboBox").value(CdKy);
                    setDefault();
                } else {
                    $("#HdrSec3_CmbProdDisptTime_Cd").data("kendoComboBox").value("");
                }
            }
        },
        filter: "contains",
        suggest: true,
        placeholder: "Outlet Address Cd ..."
    });
}

function LoadCustTime() {

    $("#HdrSec3_CmbCustTime_Cd").kendoComboBox({
        dataValueField: "CdKy",
        dataTextField: "Code",
        dataSource: dataSrcCreateCodeCdMasLookUp('HdrSec3_CmbCustTime'),
        change: function (e) {
            var cmb = $("#HdrSec3_CmbCustTime_Cd").data("kendoComboBox");
            var CdKy = cmb.value();
            if (CdKy != "") {
                var validate = ComboValidations("HdrSec3_CmbCustTime_Cd");
                if (validate) {
                    $("#HdrSec3_CmbCustTime_Cd").data("kendoComboBox").value(CdKy);
                    setDefault();
                } else {
                    $("#HdrSec3_CmbCustTime_Cd").data("kendoComboBox").value("");
                }
            }
        },
        filter: "contains",
        suggest: true,
        placeholder: "Outlet Address Cd ..."
    });
}
