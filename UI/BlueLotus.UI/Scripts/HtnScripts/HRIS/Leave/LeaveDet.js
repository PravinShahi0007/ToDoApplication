function DocReadyCus() {
    //setHdrSectionPropFun();
    LoadDropDown();
    Tooltip();
    SelectText();
    LoadDatePicker();
    var todayDate = new Date();
    $("#LeaveFromDate").data("kendoDatePicker").value(todayDate);
    $("#LeaveToDate").data("kendoDatePicker").value(todayDate);

    $(document).keydown(function (e) {
        if (e.which === 32 && e.ctrlKey) {
            //alert('control + y');
            InsertToGrid();
        }
        else if (e.which === 90 && e.ctrlKey) {
            //alert('control + z');
            InsertToGrid();
        }
    });
    LoadLeaveDetailGrid();
}

function InsertToGrid() {
    var grid = $("#LeaveInfoGrid").data("kendoGrid");
    var dataSource1 = grid.dataSource;
    var total = dataSource1.data().length;

    var LeaveFromDate = $('#LeaveFromDate').val();
    var LeaveToDate = $('#LeaveToDate').val();
    var LeaveElagible = $('#LeaveElagible').val();
    var LeaveTaken = $('#LeaveTaken').val();
    var LeaveBalance = LeaveElagible - LeaveTaken;

    var LeaveType = $("#cmbLeaveType").data("kendoComboBox").text();
    var LeaveTypeKy = (!$("#cmbLeaveType").data("kendoComboBox").value()) ? 1 : $("#cmbLeaveType").data("kendoComboBox").value();

    grid.dataSource.insert(
        total,
        {
            LeaveFromDate: LeaveFromDate,
            LeaveToDate: LeaveToDate,
            LeaveElagible: LeaveElagible,
            LeaveTaken: LeaveTaken,
            LeaveType: LeaveType,
            LeaveTypeKy: LeaveTypeKy,
            LeaveBalance: LeaveBalance
        });
    clearLeaveFields();
}
function clearLeaveFields() {
    $('#LeaveFromDate').val('');
    $('#LeaveElagible').val('');
    $('#LeaveToDate').val('');
    $('#LeaveTaken').val('');
    $("#cmbLeaveType").data("kendoComboBox").value(1)
    $("#cmbLeaveType").data("kendoComboBox").text('');
}

function SaveUpdate() {
    var EmpKy = $('#EmpKy').val();
    if (EmpKy > 10) {
        OPENLodingCommon('Saving...');
        SaveLeaveDet();
    }
    else {
        alert("Please Select An Employee!")
    }
}


function DeleteFunction() {
    var grid = $("#LeaveInfoGrid").data().kendoGrid;
    var selectedItem = grid.dataItem(grid.select());

    if (selectedItem == null) {
        alert('Please Select Something');
    } else {
        var LevTrnKy = selectedItem.LevTrnKy;
        if (confirm("Do you want to Delete " + "it" + "?") == true) {
            DeleteLeaveDet(LevTrnKy);
        }
    }    
}

function LoadDropDown() {
    $("#cmbLeaveType").kendoComboBox({
        dataValueField: "CdKy",
        dataTextField: "CdNm",
        dataSource: GetCdMas_LookupWeb('LevTyp'),
        filter: "contains",
        change: function () {
            var validation = ComboValidations("cmbLeaveType");
        },
        suggest: true,
        placeholder: "Select a Type"
    });
}

function LoadDatePicker() {
    $("#LeaveFromDate").kendoDatePicker({

        format: "dd/MM/yyyy",
        min: new Date(31, 2, 2010)
    });
    $("#LeaveToDate").kendoDatePicker({

        format: "dd/MM/yyyy",
        min: new Date(31, 2, 2010)
    });
    

    $(".k-datepicker, .k-combobox, .k-numerictextbox,.k-input").css('width', "100%");

}

function AfterFindEmp(EmpKy) {
    clearLeaveFields();
    $.ajax({
        url: UrlGet.BasicDet,
        data: {
            EmpKy: EmpKy
        },
        dataType: "Json",
        type: "POST",
        success: function (data) {
            if (data.length > 0) {
                // heder
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

                
                // Familyt Det
                //$('#LeaveInfoGrid').empty();
                try {
                    $('#LeaveInfoGrid').data().kendoGrid.destroy();
                    $('#LeaveInfoGrid').empty();
                } catch (e) { }
                LoadLeaveDetailGrid();
                $("#LeaveInfoGrid").data("kendoGrid").dataSource.data(data[0].LeaveDet);

            }
        },
        error: function (e) {
            return false;
        }
    });
}
