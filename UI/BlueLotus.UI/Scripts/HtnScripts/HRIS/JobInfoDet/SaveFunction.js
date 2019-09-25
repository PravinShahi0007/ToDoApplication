function Refresh() {
    ChangePage('EmployeeJobIndex', 'HRIS');
}

function SaveJobInfoDet() {
    var empNo = $('#HdrSec1_InptEmpNo_Val').val();
    var empName = $('#HdrSec1_InptEmpNm_Val').val();
    var EmpKy = $('#EmpKy').val();
    if (EmpKy == null || EmpKy == "") {
        EmpKy = 1;
    }
    HiddenEmpKy = EmpKy;

    var Company = $("#HdrSec3_CmbCom_Nm").data("kendoComboBox").text();
    var CompanyKy = (!$("#HdrSec3_CmbCom_Nm").data("kendoComboBox").value()) ? 1 : $("#HdrSec3_CmbCom_Nm").data("kendoComboBox").value();

    var Department = $("#HdrSec2_CmbDept_Nm").data("kendoComboBox").text();
    var DepartmentKy = (!$("#HdrSec2_CmbDept_Nm").data("kendoComboBox").value()) ? 1 : $("#HdrSec2_CmbDept_Nm").data("kendoComboBox").value();

    var Location = $("#HdrSec3_CmbLoc_Nm").data("kendoComboBox").text();
    var LocationKy = (!$("#HdrSec3_CmbLoc_Nm").data("kendoComboBox").value()) ? 1 : $("#HdrSec3_CmbLoc_Nm").data("kendoComboBox").value();

    var EmpType = $("#cmbEmpType").data("kendoComboBox").text();
    var EmpTypeKy = (!$("#cmbEmpType").data("kendoComboBox").value()) ? 1 : $("#cmbEmpType").data("kendoComboBox").value();

    var EmpGrade = $("#cmbEmpGrade").data("kendoComboBox").text();
    var EmpGradeKy = (!$("#cmbEmpGrade").data("kendoComboBox").value()) ? 1 : $("#cmbEmpGrade").data("kendoComboBox").value();

    var Designation = $("#HdrSec4_CmbDesg_Nm").data("kendoComboBox").text();
    var DesignationKy = (!$("#HdrSec4_CmbDesg_Nm").data("kendoComboBox").value()) ? 1 : $("#HdrSec4_CmbDesg_Nm").data("kendoComboBox").value();

    var NatureOfEmployment = $("#HdrSec4_CmbNature_Nm").data("kendoComboBox").text();
    var NatureOfEmploymentKy = (!$("#HdrSec4_CmbNature_Nm").data("kendoComboBox").value()) ? 1 : $("#HdrSec4_CmbNature_Nm").data("kendoComboBox").value();

    var Appointment = $("#cmbAppointment").data("kendoComboBox").text();
    var AppointmentKy = (!$("#cmbAppointment").data("kendoComboBox").value()) ? 1 : $("#cmbAppointment").data("kendoComboBox").value();

    var JobInfoRemarks = $('#JobInfoRemarks').val();
    var CmpanyEPF = $('#CompanyEPF').val();

    var ToWhom = $('#ToWhom').val();
    if (ToWhom != '') {
        Appointment = Appointment + '(' + ToWhom + ')';
    }
    var Superviser = $('#Superviser').val();
    var JobFromDate = $('#JobFromDate').val();
    var JobToDate = $('#JobToDate').val();

    var HdrDataString = JSON.stringify({
        EmpNo: empNo,
        EmpKy: EmpKy,
        EmpNm: empName
    });

    var DetDataString = JSON.stringify({
        EmpNo: empNo,
        EmpKy: EmpKy,
        EmpNm: empName,

        Company: Company,
        CompanyEPF: CmpanyEPF,
        CompanyKy: CompanyKy,
        Department: Department,
        DepartmentKy: DepartmentKy,
        Location: Location,
        LocationKy: LocationKy,
        EmpType: EmpType,
        EmpTypeKy: EmpTypeKy,
        EmpGrade: EmpGrade,
        EmpGradeKy: EmpGradeKy,
        Superviser: Superviser,
        Designation: Designation,
        DesignationKy: DesignationKy,
        Appointment: Appointment,
        AppointmentKy: AppointmentKy,
        JobInfoRemarks: JobInfoRemarks,
        ToWhom: ToWhom,
        JobFromDate: JobFromDate,
        JobToDate: JobToDate,
        NatureOfEmploymentKy: NatureOfEmploymentKy,
        NatureOfEmployment: NatureOfEmployment
    });
    $.ajax({
        url: UrlInsert.InsertDet,
        data: {
            HdrDataString: HdrDataString,
            DetDataString: DetDataString,
            Form: 'SaveJobInfoDet'
        },
        contentType: 'application/json; charset=utf-8',
        dataType: "Json",
        success: function (data) {
            CLOSELoadingCommon();
            alert('Saved Succesfuly..');
            Refresh();

        },
        error: function (e) {
            return false;
        }
    });
}

function SaveMedicalClaimDet() {
    var grid = $("#MedicalClaimsGrid").data("kendoGrid");
    var currentData = grid.dataSource.data();
    var GridData = [];

    for (var i = 0; i < currentData.length; i++) {
        GridData.push(currentData[i].toJSON());
    }
    var KendoGridData = kendo.stringify(GridData);

    var empNo = $('#HdrSec1_InptEmpNo_Val').val();
    var EmpKy = $('#EmpKy').val();
    var empName = $('#HdrSec1_InptEmpNm_Val').val();
    if (EmpKy == null || EmpKy == "") {
        EmpKy = 1;
    }

    var HdrDataString = {
        EmpNo: empNo,
        EmpKy: EmpKy,
        EmpNm: empName
    };

    var DetDataString = {
        EmpNo: empNo,
        EmpKy: EmpKy,
        EmpNm: empName,

        MedicalClaimsGrid: KendoGridData
    };
    var Form = 'SaveMedicalClaimDet';
    $.ajax({
        url: UrlInsert.InsertMedicalClaimDet,
        data: {
            HdrDataString: JSON.stringify(HdrDataString),
            DetDataString: JSON.stringify(GridData),
            Form: Form
        },
        contentType: 'application/json; charset=utf-8',
        dataType: "Json",
        success: function (data) {
            CLOSELoadingCommon();
            alert('Saved Succesfuly..');
            Refresh();

        },
        error: function (e) {
            return false;
        }
    });
}



function DeleteMedicalClaimsDet(EmpCdDtKy) {
    $.ajax({
        url: UrlDelete.DeleteMedicalClaimsDet,
        data: {
            EmpCdDtKy: EmpCdDtKy
        },
        contentType: 'application/json; charset=utf-8',
        dataType: "Json",
        success: function (data) {
            alert('Deleted Succesfuly..');
            Refresh();
        },
        error: function (e) {
            return false;
        }
    });
}

function DeleteJobDet() {
    var JobFromDate = $('#JobFromDate').val();
    var EmpKy = $('#EmpKy').val();

    $.ajax({
        url: UrlDelete.DeleteJobDet,
        data: {
            EffectDt: JobFromDate,
            EmpKy :EmpKy
        },
        contentType: 'application/json; charset=utf-8',
        dataType: "Json",
        success: function (data) {
            alert('Deleted Succesfuly..');
            Refresh();
        },
        error: function (e) {
            return false;
        }
    });
}