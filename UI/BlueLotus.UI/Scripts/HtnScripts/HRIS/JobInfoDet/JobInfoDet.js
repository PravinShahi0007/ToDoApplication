function DocReadyCus() {
    //setHdrSectionPropFun();
    LoadDropDown();
    LoadDatePicker();
    var todayDate = new Date();
    $("#JobFromDate").data("kendoDatePicker").value(todayDate);
    //LoadJobInformationGrid();
    Tooltip();
    SelectText();
    $("#ToWhomhdr").hide();
    LoadMedicalClaimsGrid();
    $("#cmbAppointment").change(function () {
        //alert();
        var Appointment = $("#cmbAppointment").data("kendoComboBox").text();
        if (Appointment == 'Replacement') {
            $("#ToWhomhdr").show();
        }
        else {
            $("#ToWhomhdr").hide();
        }
    });
    $("#annualLimit, #amount").change(function () {
        var annual = $("#annualLimit").val();
        var amount = $("#amount").val();
        var balance = annual - amount;
        $("#balance").val(balance);
    });
    $(document).keydown(function (e) {
        if (e.which === 32 && e.ctrlKey) {
            InsertToGrid();
        }
        else if (e.which === 90 && e.ctrlKey) {
            InsertToGrid();
        }
    });

    $("#tabstrip").data("kendoTabStrip").select(0);
}
function InsertToGrid() {
    var tabstrip = $("#tabstrip").kendoTabStrip().data("kendoTabStrip");
    var tabIndx = -1;
    var tabId = '';
    var tab = tabstrip.select();
    tabIndx = tab.index();
    tabId = tab.attr("id");

    tabIndx = tab.index();

    if (tabIndx == -1) {
        Alert("Not Saved");
    }
    else if (tabId == 'HdrSec_TabJobInfoDet') {
        alert('Something wrong')
    }
    else if (tabId == 'HdrSec_TabMedicalClaimDet') {
        InsertToMedicalGrid();
    }
}

function InsertToMedicalGrid() {
    var grid = $("#MedicalClaimsGrid").data("kendoGrid");
    var dataSource1 = grid.dataSource;
    var total = dataSource1.data().length;

    var MedicalClaimsFromDate = $('#MedicalClaimFromDate').val();
    var MedicalClaimsToDate = $('#MedicalClaimToDate').val();
    var ClaimDate = $('#MedicalClaimDate').val();
    var MedicalType = $("#cmbMedicalType").data("kendoComboBox").text();
    var MedicalTypeKy = (!$("#cmbMedicalType").data("kendoComboBox").value()) ? 1 : $("#cmbMedicalType").data("kendoComboBox").value();
    var MedicalClaimsAnnualLimit = $('#annualLimit').val();
    var MedicalClaimsAmount = $('#amount').val();
    var MedicalClaimsBalance = $('#balance').val();

    grid.dataSource.insert(
        total,
        {
            MedicalClaimsFromDate: MedicalClaimsFromDate,
            MedicalClaimsToDate: MedicalClaimsToDate,
            ClaimDate: ClaimDate,
            MedicalType: MedicalType,
            MedicalTypeKy: MedicalTypeKy,
            MedicalClaimsAnnualLimit: MedicalClaimsAnnualLimit,
            MedicalClaimsAmount: MedicalClaimsAmount,
            MedicalClaimsBalance: MedicalClaimsBalance
        });
    $('#MedicalClaimFromDate').val('');
    $('#MedicalClaimToDate').val('');
    $('#MedicalClaimDate').val('');
    $('#annualLimit').val('');
    $('#amount').val('');
    $('#balance').val('');
    $("#cmbMedicalType").data("kendoComboBox").value(1);
    $("#cmbMedicalType").data("kendoComboBox").text('');

}


function LoadDatePicker() {
    $("#JobFromDate").kendoDatePicker({

        format: "dd/MM/yyyy",
        min: new Date(31, 2, 2010)
    });

    $("#JobToDate").kendoDatePicker({
        format: "dd/MM/yyyy",
        min: new Date(31, 2, 1990)
    });


    $("#MedicalClaimFromDate").kendoDatePicker({
        format: "dd/MM/yyyy",
        min: new Date(31, 2, 1990)
    });
    $("#MedicalClaimToDate").kendoDatePicker({
        format: "dd/MM/yyyy",
        min: new Date(31, 2, 1990)
    });
    $("#MedicalClaimDate").kendoDatePicker({
        format: "dd/MM/yyyy",
        min: new Date(31, 2, 1990)
    });

    $(".k-datepicker, .k-combobox, .k-numerictextbox,.k-input").css('width', "100%");

}


function DeleteFunction() {
    var tabstrip = $("#tabstrip").kendoTabStrip().data("kendoTabStrip");
    var tabIndx = -1;
    var tabId = '';
    var tab = tabstrip.select();
    tabIndx = tab.index();
    tabId = tab.attr("id");

    tabIndx = tab.index();

    if (tabIndx == -1) {
        //Alert("Not Saved");
    }
    else if (tabId == 'HdrSec_TabJobInfoDet') {
        if (confirm("Do you want to Delete " + "it" + "?") == true) {
            DeleteJobDet();
        }
    }
    else if (tabId == 'HdrSec_TabMedicalClaimDet') {
        var grid = $("#MedicalClaimsGrid").data().kendoGrid;
        var selectedItem = grid.dataItem(grid.select());
        
        if (selectedItem == null) {
            alert('Please Select Something');
        } else {
            var EmpCdDtKy = selectedItem.EmpCdDtKy;
            if (confirm("Do you want to Delete " + "it" + "?") == true) {
                //alert('Delete')
                DeleteMedicalClaimsDet(EmpCdDtKy);
            } else {
                //alert('cancel')
            }
        }
        
    }
}


function SaveUpdate() {
    var EmpKy = $('#EmpKy').val();
    if (EmpKy > 10) {
        OPENLodingCommon('Saving...');
        var tabstrip = $("#tabstrip").kendoTabStrip().data("kendoTabStrip");
        var tabIndx = -1;
        var tabId = '';
        var tab = tabstrip.select();
        tabIndx = tab.index();
        tabId = tab.attr("id");

        tabIndx = tab.index();

        if (tabIndx == -1) {
            Alert("Not Saved");
        }
        else if (tabId == 'HdrSec_TabJobInfoDet') {
            SaveJobInfoDet();
        }
        else if (tabId == 'HdrSec_TabMedicalClaimDet') {
            SaveMedicalClaimDet();
        }
    }
    else {
        alert("Please Select An Employee!")
    }
}
//function ComboValidations(cmbNm) {

//    var cmb = $("#" + cmbNm + "").data("kendoComboBox");
//    var val = cmb.value();

//    if (isNaN(val)) {
//        alert("'" + val + "' is not a Valid input");
//        $("#" + cmbNm + "").data('kendoComboBox').value("");
//        return false;
//    } else {
//        return true;
//    }
//}
function LoadDropDown() {
    $("#cmbMedicalType").kendoComboBox({
        dataValueField: "CdKy",
        dataTextField: "Code",
        dataSource: GetCdMas_LookupWeb('MedicalType'),
        filter: "contains",
        change: function () {
            var validation = ComboValidations("cmbMedicalType");
        },
        suggest: true,
        placeholder: "Select a Medical Type"
    });
    $("#cmbNatureOfEmployment").kendoComboBox({
        dataValueField: "CdKy",
        dataTextField: "CdNm",
        dataSource: GetCdMas_LookupWeb('EmpSts'),
        filter: "contains",
        change: function () {
            var validation = ComboValidations("cmbNatureOfEmployment");
        },
        suggest: true,
        placeholder: "Select a Nature of Emp"
    });
    $("#cmbCompany").kendoComboBox({
        dataValueField: "CKy",
        dataTextField: "CdNm",
        dataSource: GetCdMas_LookupWeb('company'),
        filter: "contains",
        change: function () {
            var validation = ComboValidations("cmbCompany");
        },
        suggest: true,
        placeholder: "Select a Company"
    });
    $("#cmbAppointment").kendoComboBox({
        dataValueField: "CdKy",
        dataTextField: "CdNm",
        dataSource: GetCdMas_LookupWeb('EmpApoin'),
        filter: "contains",
        change: function () {
            var validation = ComboValidations("cmbAppointment");
        },
        suggest: true,
        placeholder: "Select a Company"
    });
    $("#cmbDesignation").kendoComboBox({
        dataValueField: "CdKy",
        dataTextField: "CdNm",
        dataSource: GetCdMas_LookupWeb('desg'),
        filter: "contains",
        change: function () {
            var validation = ComboValidations("cmbDesignation");
        },
        suggest: true,
        placeholder: "Select a Company"
    });
    $("#cmbDepartment").kendoComboBox({
        dataValueField: "CdKy",
        dataTextField: "CdNm",
        dataSource: GetCdMas_LookupWeb('Department'),
        filter: "contains",
        change: function () {
            var validation = ComboValidations("cmbDepartment");
        },
        suggest: true,
        placeholder: "Select a Department"
    });
    $("#cmbLocation").kendoComboBox({
        dataValueField: "CdKy",
        dataTextField: "CdNm",
        dataSource: GetCdMas_LookupWeb('EmpLoc'),
        filter: "contains",
        change: function () {
            var validation = ComboValidations("cmbLocation");
        },
        suggest: true,
        placeholder: "Select a Location"
    });
    $("#cmbEmpType").kendoComboBox({
        dataValueField: "CdKy",
        dataTextField: "CdNm",
        dataSource: GetCdMas_LookupWeb('EmpTyp'),
        filter: "contains",
        change: function () {
            var validation = ComboValidations("cmbEmpType");
        },
        suggest: true,
        placeholder: "Select a EmpType"
    });
    $("#cmbEmpGrade").kendoComboBox({
        dataValueField: "CdKy",
        dataTextField: "CdNm",
        dataSource: GetCdMas_LookupWeb('EmpGrade'),
        filter: "contains",
        change: function () {
            var validation = ComboValidations("cmbEmpGrade");
        },
        suggest: true,
        placeholder: "Select a Grade"
    });

}

function AfterFindEmp(EmpKy) {
    $.ajax({
        url: UrlGet.BasicDet,
        data: {
            EmpKy: EmpKy
        },
        dataType: "Json",
        type: "POST",
        success: function (data) {
            
            if (data[0] != undefined) {
                // Hdr Det
                //$('#HdrSec1_InptEmpNm_Val').val(data[0].EmpNm);
                $('#HdrSec1_InptEmpNm_Val').val(data[0].NameInInitial);
                $('#HdrSec1_InptEmpNo_Val').val(data[0].EmpNo);
                $('#HdrSec2_InptEpfNo_Val').val(data[0].EpfNo);

                //$("#HdrSec2_CmbDept_Nm").data("kendoComboBox").value(data[0].DepartmentKy);
                //$("#HdrSec2_CmbDept_Nm").data("kendoComboBox").text(data[0].Department);

                //$("#HdrSec3_CmbLoc_Nm").data("kendoComboBox").value(data[0].LocationKy);
                //$("#HdrSec3_CmbLoc_Nm").data("kendoComboBox").text(data[0].Location);

                //$("#HdrSec3_CmbCom_Nm").data("kendoComboBox").value(data[0].CompanyKy);
                //$("#HdrSec3_CmbCom_Nm").data("kendoComboBox").text(data[0].Company);

                //$("#HdrSec4_CmbDesg_Nm").data("kendoComboBox").value(data[0].DesignationKy);
                //$("#HdrSec4_CmbDesg_Nm").data("kendoComboBox").text(data[0].Designation);

                //$("#HdrSec4_CmbNature_Nm").data("kendoComboBox").value(data[0].NatureOfEmploymentKy);
                //$("#HdrSec4_CmbNature_Nm").data("kendoComboBox").text(data[0].NatureOfEmployment);

                if (data[0].DepartmentKy > 10) {
                    $("#HdrSec2_CmbDept_Nm").data("kendoComboBox").value(data[0].DepartmentKy);
                    $("#HdrSec2_CmbDept_Nm").data("kendoComboBox").text(data[0].Department);
                }
                else {
                    $("#HdrSec2_CmbDept_Nm").data("kendoComboBox").text('');
                }

                if (data[0].LocationKy > 10) {
                    $("#HdrSec3_CmbLoc_Nm").data("kendoComboBox").value(data[0].LocationKy);
                    $("#HdrSec3_CmbLoc_Nm").data("kendoComboBox").text(data[0].Location);
                }
                else {
                    $("#HdrSec3_CmbLoc_Nm").data("kendoComboBox").text('');
                }

                if (data[0].CompanyKy > 10) {
                    $("#HdrSec3_CmbCom_Nm").data("kendoComboBox").value(data[0].CompanyKy);
                    $("#HdrSec3_CmbCom_Nm").data("kendoComboBox").text(data[0].Company);
                }
                else {
                    $("#HdrSec3_CmbCom_Nm").data("kendoComboBox").text('');
                }

                if (data[0].DesignationKy > 10) {
                    $("#HdrSec4_CmbDesg_Nm").data("kendoComboBox").value(data[0].DesignationKy);
                    $("#HdrSec4_CmbDesg_Nm").data("kendoComboBox").text(data[0].Designation);
                }
                else {
                    $("#HdrSec4_CmbDesg_Nm").data("kendoComboBox").text('');
                }

                if (data[0].NatureOfEmploymentKy > 10) {
                    $("#HdrSec4_CmbNature_Nm").data("kendoComboBox").value(data[0].NatureOfEmploymentKy);
                    $("#HdrSec4_CmbNature_Nm").data("kendoComboBox").text(data[0].NatureOfEmployment);
                }
                else {
                    $("#HdrSec4_CmbNature_Nm").data("kendoComboBox").text('');
                }

                $('#joinDate_Hdr').val(data[0].JoinDate);

                //job Det

                $('#CompanyEPF').val(data[0].CompanyEPF);
                $('#Superviser').val(data[0].Superviser);
                $('#ToWhom').val(data[0].ToWhom);
                $('#JobInfoRemarks').val(data[0].JobInfoRemarks);

                $('#JobFromDate').val(data[0].JobFromDate);
                $('#JobToDate').val(data[0].JobToDate);

                $("#cmbEmpType").data("kendoComboBox").value(data[0].EmpTypeKy);
                $("#cmbEmpType").data("kendoComboBox").text(data[0].EmpType);

                $("#cmbEmpGrade").data("kendoComboBox").value(data[0].EmpGradeKy);
                $("#cmbEmpGrade").data("kendoComboBox").text(data[0].EmpGrade);

                $("#cmbAppointment").data("kendoComboBox").value(data[0].AppointmentKy);
                $("#cmbAppointment").data("kendoComboBox").text(data[0].Appointment);
                //alert(data[0].Appointment == 'Replacement');
                //alert(data[0].Appointment + ' Replacement');
                //if (data[0].Appointment == 'Replacement') {
                //    $("#ToWhomhdr").show();
                //}

                $("#cmbAppointment").trigger("change");
                //cmbAppointment


                try {
                    $('#MedicalClaimsGrid').data().kendoGrid.destroy();
                    $('#MedicalClaimsGrid').empty();
                } catch (e) { }
                LoadMedicalClaimsGrid();
                if (data[0].MedicalClaimsDet != null) {
                    $("#MedicalClaimsGrid").data("kendoGrid").dataSource.data(data[0].MedicalClaimsDet);
                }
            }
        },
        error: function (e) {
            return false;
        }
    });
}
