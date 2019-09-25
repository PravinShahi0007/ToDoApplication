$("#SelectTask").click(function () {
    GetDataSourceFromFindSp();
});

function GetPrjID_SelectMobDataSource(ObjNm) {
    var ObjKy = GetObjKy(ObjNm);
    //alert(ObjKy);
    var dataSource = new kendo.data.DataSource(
    {
        transport: {
            read: {
                url: urlGetPrjID_SelectMob,//'/Home/GetProjectListByPrntKy',//'@Url.Content("~/Home/GetProjectListByPrntKy")',
                data: {
                    ObjKy: ObjKy,
                    TrnTypKy: 1,
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
                url: urlGetPrjNm_SelectMob,//'/Home/GetProjectListByPrntKy',//'@Url.Content("~/Home/GetProjectListByPrntKy")',
                data: {
                    ObjKy: ObjKy,
                    TrnTypKy: 1,
                    PreKy: 1
                },
                dataType: "json"
            }
        }
    });
    return dataSource;
}

function LoadCombo() {
    $("#PMFilter_CmbPrj_Nm").kendoComboBox({
        dataValueField: "PrjKy",
        dataTextField: "PrjNm",
        dataSource: GetPrjNm_SelectMobDataSource('PMFilter_CmbPrj'),

        filter: "contains",
        suggest: true,
        placeholder: "Select a project..",
        change: function (e) {
            var cmb = $("#PMFilter_CmbPrj_Nm").data("kendoComboBox");
            var prjky = cmb.value();
            if (prjky != "") {
                var validate = ComboValidations("PMFilter_CmbPrj_Nm");
                if (validate) {
                    $("#PMFilter_CmbPrj_Nm").data("kendoComboBox").value(prjky);
                    $("#PMFilter_CmbPrj_Cd").data("kendoComboBox").value(prjky);
                } else {
                    $("#PMFilter_CmbPrj_Nm").data("kendoComboBox").value("");
                    $("#PMFilter_CmbPrj_Cd").data("kendoComboBox").value("");
                }
            }


        }
    });
    $("#PMFilter_CmbPrj_Nm").parent().css('width', "400px");

    $("#PMFilter_CmbPrj_Nm").data("kendoComboBox").input.keydown(function (e) {
        var keyCode = (e.keyCode ? e.keyCode : e.which);
        if (keyCode == '13') {
            $("#PMFilter_CmbPrj_Cd").data("kendoComboBox").input.focus();
        }
    });

    $("#PMFilter_CmbPrj_Cd").kendoComboBox({
        dataValueField: "PrjKy",
        dataTextField: "DocNo",
        dataSource: GetPrjID_SelectMobDataSource('PMFilter_CmbPrj'),

        filter: "contains",
        suggest: true,
        placeholder: "Select a project..",
        change: function (e) {
            var cmb = $("#PMFilter_CmbPrj_Cd").data("kendoComboBox");
            var prjky = cmb.value();
            if (prjky != "") {
                var validate = ComboValidations("PMFilter_CmbPrj_Cd");

                if (validate) {
                    $("#PMFilter_CmbPrj_Nm").data("kendoComboBox").value(prjky);
                    $("#PMFilter_CmbPrj_Cd").data("kendoComboBox").value(prjky);
                } else {
                    $("#PMFilter_CmbPrj_Nm").data("kendoComboBox").value("");
                    $("#PMFilter_CmbPrj_Cd").data("kendoComboBox").value("");
                }
            }

        }
    });
    $("#PMFilter_CmbPrj_Cd").parent().css('width', "200px");

    $("#PMFilter_CmbPrj_Cd").data("kendoComboBox").input.keydown(function (e) {
        var keyCode = (e.keyCode ? e.keyCode : e.which);
        if (keyCode == '13') {
            $("#PMFilter_CmbPrj_Nm").data("kendoComboBox").input.focus();
        }
    });
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