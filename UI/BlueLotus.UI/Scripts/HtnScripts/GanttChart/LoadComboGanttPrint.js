$("#SelectTask").click(function () {
    var prjky = $("#PMFilter_CmbPrj_Nm").data('kendoComboBox').value();
    GetDataSourceFromFindSp(prjky);
});

//function ProjectDataSource(prntKy) {
//    var dataSource = new kendo.data.DataSource(
//    {
//        transport: {
//            read: {
//                url: urlGetProjectListByPrntKy,//'/Home/GetProjectListByPrntKy',//'@Url.Content("~/Home/GetProjectListByPrntKy")',
//                data: { 'key': prntKy },
//                dataType: "json"
//            }
//        }
//    });
//    return dataSource;
//}

function GetPrjID_SelectMobDataSource() {
    var dataSource = new kendo.data.DataSource(
    {
        transport: {
            read: {
                url: urlGetPrjID_SelectMob,//'/Home/GetProjectListByPrntKy',//'@Url.Content("~/Home/GetProjectListByPrntKy")',
                //data: { 'key': prntKy },
                dataType: "json"
            }
        }
    });
    return dataSource;
}

function GetPrjNm_SelectMobDataSource() {
    var dataSource = new kendo.data.DataSource(
    {
        transport: {
            read: {
                url: urlGetPrjNm_SelectMob,//'/Home/GetProjectListByPrntKy',//'@Url.Content("~/Home/GetProjectListByPrntKy")',
                //data: { 'key': prntKy },
                dataType: "json"
            }
        }
    });
    return dataSource;
}

function ReportObjCd_Select(PrntObjCdRpt) {
    var dataSource = new kendo.data.DataSource(
    {
        transport: {
            read: {
                url: urlReportPPrntObjCd_Select, // '/GanttChart/ReportPPrntObjCd_Select',//'@Url.Content("~/GanttChart/ReportPPrntObjCd_Select")',
                data: { 'PrntObjCd': PrntObjCdRpt },
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
        dataSource: GetPrjNm_SelectMobDataSource(),

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
    $("#PMFilter_CmbPrj_Nm").parent().css('width', "300px");

    $("#cmbRptSelect").kendoComboBox({
        dataValueField: "ObjKy",
        dataTextField: "ObjNm",
        dataSource: ReportObjCd_Select("PMReport"),

        filter: "contains",
        suggest: true,
        placeholder: "Select a Report.."
    });
    $("#cmbRptSelect").parent().css('width', "200px");

    $("#PMFilter_CmbPrj_Cd").kendoComboBox({
        dataValueField: "PrjKy",
        dataTextField: "DocNo",
        dataSource: GetPrjID_SelectMobDataSource(),

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

$('#frmDt').datepicker();
$('#frmDt').datepicker('setDate', new Date());
$('#toDt').datepicker();
$('#toDt').datepicker('setDate', new Date());