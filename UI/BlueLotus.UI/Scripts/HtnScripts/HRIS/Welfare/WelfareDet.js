function DocReadyCus() {
    //setHdrSectionPropFun();
    LoadDropDown();
    Tooltip();
    SelectText();
    LoadDatePicker();
    LoadFuneralDetailGrid();
    //LoadWelfareMedicalGrid();
    LoadWelfareLoanDetailGrid();
    var todayDate = new Date();
    $("#HdrSec1_DatPicWelfareLoanFromDate_Val").data("kendoDatePicker").value(todayDate);
    $("#HdrSec1_DatPicWelfareLoanBorrowedDate_Val").data("kendoDatePicker").value(todayDate);
    $("#HdrSec1_DatPicWelfareLoanToDate_Val").data("kendoDatePicker").value(todayDate);

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

    if (tabIndx == -1) {
        Alert("Not Saved");
    }
    else if (tabId == 'HdrSec_TabFuneralDet') {
        InsertToFuneralGrid();
    }
    else if (tabId == 'HdrSec_TabwelfareLoanDet') {
        InsertToWelfareLoanGrid();
    }
}

function InsertToFuneralGrid() {
    var grid = $("#WelfareFuneralGrd").data("kendoGrid");
    var dataSource1 = grid.dataSource;
    var total = dataSource1.data().length;

    var FuneralDateofDesmise = $('#FuneralDateofDesmise').val();
    var FuneralDescription = $('#FuneralDescription').val();
    var FuneralDateofBirth = $('#FuneralDateofBirth').val();
    var FuneralNIC = $('#FuneralNIC').val();

    var FuneralRelationship = $("#cmbFuneralRelationship").data("kendoComboBox").text();
    var FuneralRelationshipKy = $("#cmbFuneralRelationship").data("kendoComboBox").value();

    grid.dataSource.insert(
        total,
        {
            FuneralDateofDesmise: FuneralDateofDesmise,
            FuneralDescription: FuneralDescription,
            FuneralDateofBirth: FuneralDateofBirth,
            FuneralNIC: FuneralNIC,
            FuneralRelationship: FuneralRelationship,
            FuneralRelationshipKy: FuneralRelationshipKy
        });
    clearFuneralFields();
}
function clearFuneralFields() {
    $('#FuneralDateofDesmise').val('');
    $('#FuneralDescription').val('');
    $('#FuneralDateofBirth').val('');
    $('#FuneralNIC').val('');
    $("#cmbFuneralRelationship").data('kendoComboBox').value("");
}
function InsertToMedicalGrid() {

}
function InsertToWelfareLoanGrid() {
    var grid = $("#WelfareLoanGrid").data("kendoGrid");
    var dataSource1 = grid.dataSource;
    var total = dataSource1.data().length;

    var fromDate = $('#HdrSec1_DatPicWelfareLoanFromDate_Val').val();
    var toDate = $('#HdrSec1_DatPicWelfareLoanToDate_Val').val();
    var borrowedDate = $('#HdrSec1_DatPicWelfareLoanBorrowedDate_Val').val();
    var cmbLoanType = $("#cmbLoanType").data("kendoComboBox").text();
    var cmbLoanTypeKy = $("#cmbLoanType").data("kendoComboBox").value();
    var loanAmount = $('#loanAmount').val();
    var installAmount = $('#installAmount').val();
    var noofInstall = $('#noofInstall').val();
    var inerestRate = $('#inerestRate').val();
    var interestAmount = $('#interestAmount').val();
    var totalPayable = $('#totalPayable').val();
    var payBackPeriod = $('#payBackPeriod').val();
    var SalBrnNameKy = (!$("#cmbBrnName").data("kendoComboBox").value()) ? 1 : $("#cmbBrnName").data("kendoComboBox").value();
    var SalAccountCode = document.getElementById("accountCode").value;

    grid.dataSource.insert(
         total,
        {
            WelfareLoanFromDate: fromDate,
            WelfareLoanToDate: toDate,
            WelfareLoanBorrowedDate: borrowedDate,
            WelfareLoanLoanType: cmbLoanType,
            WelfareLoanLoanTypeKy: cmbLoanTypeKy,
            WelfareLoanLoanAmount: loanAmount,
            WelfareLoanInstallAmount: installAmount,
            WelfareLoanNoOfInstall: noofInstall,
            WelfareLoanInerestRate: inerestRate,
            WelfareLoanInterestAmount: interestAmount,
            WelfareLoanTotalPayable: totalPayable,
            WelfareLoanPayBackPeriod: payBackPeriod,
            WelfareLoanBrnNameKy: SalBrnNameKy,
            WelfareLoanAccountCode: SalAccountCode
        });
    clearWelfareMedicalLoan();
}


function clearWelfareMedicalLoan() {
    $('#HdrSec1_DatPicWelfareLoanFromDate_Val').val('');
    $('#HdrSec1_DatPicWelfareLoanToDate_Val').val('');
    $('#HdrSec1_DatPicWelfareLoanBorrowedDate_Val').val('');
    $("#cmbLoanType").data("kendoComboBox").text('');
    $('#loanAmount').val('');
    $('#installAmount').val('');
    $('#noofInstall').val('');
    $('#inerestRate').val('');
    $('#interestAmount').val('');
    $('#totalPayable').val('');
    $('#payBackPeriod').val('');
    //$("#cmbBrnName").data("kendoComboBox").text('');
    $("#cmbBrnName").data("kendoComboBox").text('');
    $("#cmbBankName").data("kendoComboBox").text('');
    $('#accountCode').val('');
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

        if (tabIndx == -1) {
            Alert("Not Saved");
        }
        else if (tabId == 'HdrSec_TabFuneralDet') {
            SaveFuneralDet();
        }
        else if (tabId == 'HdrSec_TabwelfareLoanDet') {
            SaveWelfareLoanDet();
        }
    }
    else {
        alert("Please Select An Employee!")
    }
}
function DeleteFunction() {
    var tabstrip = $("#tabstrip").kendoTabStrip().data("kendoTabStrip");
    var tabIndx = -1;
    var tabId = '';
    var tab = tabstrip.select();
    tabIndx = tab.index();
    tabId = tab.attr("id");

    if (tabIndx == -1) {
        //Alert("Not Saved");
    }
    else if (tabId == 'HdrSec_TabFuneralDet') {
        var grid = $("#WelfareFuneralGrd").data().kendoGrid;
        var selectedItem = grid.dataItem(grid.select());

        if (selectedItem == null) {
            alert('Please Select Something');
        } else {
            var EmpCdDtKy = selectedItem.EmpCdDtKy;
            if (confirm("Do you want to Delete " + "it" + "?") == true) {
                DeleteFuneralDet(EmpCdDtKy);
            }
        }
    }
    else if (tabId == 'HdrSec_TabwelfareLoanDet') {
        var grid = $("#WelfareLoanGrid").data().kendoGrid;
        var selectedItem = grid.dataItem(grid.select());

        if (selectedItem == null) {
            alert('Please Select Something');
        } else {
            var EmpCdDtKy = selectedItem.EmpCdDtKy;
            if (confirm("Do you want to Delete " + "it" + "?") == true) {
                DeleteFuneralDet(EmpCdDtKy);
            }
        }
    }
}

function LoadDropDown() {
    //funeral
    $("#cmbFuneralRelationship").kendoComboBox({
        dataValueField: "CdKy",
        dataTextField: "CdNm",
        dataSource: GetCdMas_LookupWeb('Relationship'),
        filter: "contains",
        change: function () {
            var validation = ComboValidations("cmbFuneralRelationship");
        },
        suggest: true,
        placeholder: "Select a Relationship"
    });
    //medical
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
    //welfare loan
    $("#cmbLoanType").kendoComboBox({
        dataValueField: "CdKy",
        dataTextField: "CdNm",
        dataSource: GetCdMas_LookupWeb('LoanTyp'),
        filter: "contains",
        change: function () {
            var validation = ComboValidations("cmbLoanType");
        },
        suggest: true,
        placeholder: "Select a Loan Type"
    });
}

function LoadDatePicker() {
    //funeral
    $("#FuneralDateofDesmise").kendoDatePicker({

        format: "dd/MM/yyyy",
        min: new Date(31, 2, 1920)
    });
    $("#FuneralDateofBirth").kendoDatePicker({

        format: "dd/MM/yyyy",
        min: new Date(31, 2, 1920)
    });
    //medical
    $("#toDate").kendoDatePicker({

        format: "dd/MM/yyyy",
        min: new Date(31, 2, 1920)
    });
    $("#fromDate").kendoDatePicker({

        format: "dd/MM/yyyy",
        min: new Date(31, 2, 1920)
    });
    // welfare loan

    $("#HdrSec1_DatPicWelfareLoanFromDate_Val").kendoDatePicker({

        format: "dd/MM/yyyy",
        min: new Date(31, 2, 1920)
    });
    $("#HdrSec1_DatPicWelfareLoanToDate_Val").kendoDatePicker({

        format: "dd/MM/yyyy",
        min: new Date(31, 2, 1920)
    });
    $("#HdrSec1_DatPicWelfareLoanBorrowedDate_Val").kendoDatePicker({

        format: "dd/MM/yyyy",
        min: new Date(31, 2, 1920)
    });
    $(".k-datepicker, .k-combobox, .k-numerictextbox,.k-input").css('width', "100%");

}

function AfterFindEmp(EmpKy) {
    clearFuneralFields();
    clearWelfareMedicalLoan();
    $.ajax({
        url: UrlGet.BasicDet,
        data: {
            EmpKy: EmpKy
        },
        dataType: "Json",
        type: "POST",
        success: function (data) {
            if (data[0] != undefined) {
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

                // FuneralDet 
                if (data[0].FuneralDet != null) {
                    $("#WelfareFuneralGrd").data("kendoGrid").dataSource.data(data[0].FuneralDet);
                }

                //WelfareMedicalDet
                //$("#WelfareMedicalGrid").data("kendoGrid").dataSource.data(data[0].WelfareMedicalDet);
                $.ajax({
                    url: UrlGet.GetWelfareDet,
                    data: {
                        EmpKy: EmpKy
                    },
                    dataType: "Json",
                    type: "POST",
                    success: function (Dbdata) {
                        if (Dbdata[0] != undefined) {
                            try {
                                $('#WelfareLoanGrid').data().kendoGrid.destroy();
                                $('#WelfareLoanGrid').empty();
                            } catch (e) { }
                            //alert()
                            LoadWelfareLoanDetailGrid();
                            //alert()
                            $("#WelfareLoanGrid").data("kendoGrid").dataSource.data(Dbdata[0].WelfareLoanDet);
                        }
                    },
                    error: function (e) {
                        return false;
                    }
                });
            }
        },
        error: function (e) {
            return false;
        }
    });
}
