
function DocReadyCus() {
    //setHdrSectionPropFun();
    LoadDropDown();
    Tooltip();
    SelectText();
    LoadDatePicker();
    $(document).keydown(function (e) {
        if (e.which === 32 && e.ctrlKey) {
            InsertToGrid();
        }
        else if (e.which === 90 && e.ctrlKey) {
            InsertToGrid();
        }
    });
    //LoadAnnualPerformanceGrid();
    LoadMembershipDetailGrid();
    LoadTraininDetailGrid();
    $('#HdrSec5_files').on('change', function () {
        var filePath = $('#HdrSec5_files').val();
        console.log(filePath);
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
        alert("Not Saved");
    }
    else if (tabId == 'HdrSec_TabAnnualPerformanceDet') {
        alert("Something wrong!");
        //var grid = $("#AnnualPerformanceGrid").data("kendoGrid");
        //var dataSource1 = grid.dataSource;
        //var total = dataSource1.data().length;

        //var Year = $('#HdrSec4_InptAnnualPerYear_Val').val();
        //var Month = $("#HdrSec4_CmbAnnualPerMonth_Cd").data("kendoComboBox").text();
        //var MonthKy = (!$("#HdrSec4_CmbAnnualPerMonth_Cd").data("kendoComboBox").value()) ? 1 : $("#HdrSec4_CmbAnnualPerMonth_Cd").data("kendoComboBox").value();
        //var ReviewSent = $('#HdrSec4_InptAnnualPerReviewSent_Val').val();
        //var ReviewReceived = $('#HdrSec4_InptAnnualPerReviewReceived_Val').val();
        //var OverallGrade = $('#HdrSec5_InptAnnualPerOverallGrade_Val').val();
        //var ReviewPerson = $('#HdrSec5_InptAnnualPerReviewPerson_Val').val();
        //var FilePath = document.getElementById('HdrSec5_files').files[0];


        //grid.dataSource.insert(
        //    {
        //        AnnualPerYear: Year,
        //        AnnualPerMonth: Month,
        //        AnnualPerMonthKy: MonthKy,
        //        AnnualPerReviewSent: ReviewSent,
        //        AnnualPerReviewReceived: ReviewReceived,
        //        AnnualPerOverallGrade: OverallGrade,
        //        AnnualPerReviewPerson: ReviewPerson,
        //        AnnualPerFilePath: FilePath
        //    });

    }
    else if (tabId == 'HdrSec_TabTrainingDet') {
        //SaveContactDet();
        var grid = $("#TrainingDetailsGrid").data("kendoGrid");
        var dataSource1 = grid.dataSource;
        var total = dataSource1.data().length;

        var programme = $('#programme').val();
        var trainingInstitute = $('#trainingInstitute').val();
        var intructor = $('#intructor').val();
        var duration = $('#duration').val();
        var cmbProgrammeType = $("#cmbProgrammeType").data("kendoComboBox").text();
        var cmbProgrammeTypeKy = $("#cmbProgrammeType").data("kendoComboBox").value();
        var cmbEvaluation = $("#cmbEvaluation").data("kendoComboBox").text();
        var cmbEvaluationKy = $("#cmbEvaluation").data("kendoComboBox").value();
        var trainingFree = $('#trainingFree').val();
        var TrainingBond = 0;
        if ($('#TrainingBond').is(":checked")) {
            TrainingBond = 1;
        } else {
            TrainingBond = 0;
        }

        var Amount = $('#Amount').val();
        var FromDate = $('#FromDate').val();
        var ToDate = $('#ToDate').val();

        grid.dataSource.insert(
            total,
            {
                //LiNo: total + 1,
                Programme: programme,
                TrainingInstitute: trainingInstitute,
                Intructor: intructor,
                Duration: duration,
                ProgrammeType: cmbProgrammeType,
                ProgrammeTypeKy: cmbProgrammeTypeKy,
                Evaluation: cmbEvaluation,
                EvaluationKy: cmbEvaluationKy,
                TrainingFree: trainingFree,
                TrainingBond: TrainingBond,
                Amount: Amount,
                TrainingFromDate: FromDate,
                TrainingToDate: ToDate
            });
        clearTrainingfeilds();
    }
    else if (tabId == 'HdrSec_TabMembershipDet') {
        var grid = $("#MembershipDetailGrid").data("kendoGrid");
        var dataSource1 = grid.dataSource;
        var total = dataSource1.data().length;
        var membershipNo = $('#membershipNo').val();
        //var HiddenmembershipNo = $('#HiddenmembershipNo').val();
        var organization = $('#organization').val();
        var year = $('#year').val();
        var cmbMembershipType = $("#cmbMembershipType").data("kendoComboBox").text();
        var cmbMembershipTypeKy = $("#cmbMembershipType").data("kendoComboBox").value();
        var effectDate = $('#effectDate').val();
        grid.dataSource.insert(
            total,
            {
                LiNo: total + 1,
                MembershipNo: membershipNo,
                //HiddenMembershipNo: HiddenmembershipNo,
                Organization: organization,
                Year: year,
                MembershipType: cmbMembershipType,
                MembershipTypeKy: cmbMembershipTypeKy,
                EffectDate: effectDate
            });
        clearMembershipFeilds();
    }
}
function clearMembershipFeilds() {
    $('#membershipNo').val('');
    $('#organization').val('');
    $('#year').val('');
    $("#cmbMembershipType").data("kendoComboBox").text('');
    $('#effectDate').val('');
}
function clearTrainingfeilds() {
    $('#programme').val('');
    $('#trainingInstitute').val('');
   $('#intructor').val('');
   $('#duration').val('');
   //$("#cmbProgrammeType").data("kendoComboBox").value(1);
    $("#cmbProgrammeType").data("kendoComboBox").text('');
    //$("#cmbEvaluation").data("kendoComboBox").value(1);
    $("#cmbEvaluation").data("kendoComboBox").text('');
    $('#trainingFree').val('');
    $('#Amount').val('');
    $('#FromDate').val('');
    $('#ToDate').val('');
    document.getElementById("TrainingBond").checked = false;
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
        else if (tabId == 'HdrSec_TabAnnualPerformanceDet') {
            SaveAnnualPerformance();
        }
        else if (tabId == 'HdrSec_TabTrainingDet') {
            SaveTrainingDet();
        }
        else if (tabId == 'HdrSec_TabMembershipDet') {
            SaveMembershipDet();
        }
        else if (tabIndx == 3) {
            //SaveFamilyDet();
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
    
    else if (tabId == 'HdrSec_TabAnnualPerformanceDet') {
        alert('Cant Delete!');
    }
    else if (tabId == 'HdrSec_TabTrainingDet') {
        var grid = $("#TrainingDetailsGrid").data().kendoGrid;
        var selectedItem = grid.dataItem(grid.select());

        if (selectedItem == null) {
            alert('Please Select Something');
        } else {
            var EmpCdKy = selectedItem.EmpCdKy;
            if (confirm("Do you want to Delete " + "it" + "?") == true) {
                DeleteTrainingDet(EmpCdKy);
            }
        }
    }
    else if (tabId == 'HdrSec_TabMembershipDet') {
        var grid = $("#MembershipDetailGrid").data().kendoGrid;
        var selectedItem = grid.dataItem(grid.select());

        if (selectedItem == null) {
            alert('Please Select Something');
        } else {
            var EmpCdKy = selectedItem.EmpCdKy;
            if (confirm("Do you want to Delete " + "it" + "?") == true) {
                DeleteTrainingDet(EmpCdKy);
            }
        }
    }
}

function LoadDropDown() {
    $("#cmbGrade").kendoComboBox({
        dataValueField: "CdKy",
        dataTextField: "CdNm",
        dataSource: GetCdMas_LookupWeb('ProfeGrade'),
        filter: "contains",
        change: function () {
            var validation = ComboValidations("cmbGrade");
        },
        suggest: true,
        placeholder: "Select a Grade"
    });
    $("#cmbMedium").kendoComboBox({
        dataValueField: "CdKy",
        dataTextField: "CdNm",
        dataSource: GetCdMas_LookupWeb('Medium'),
        filter: "contains",
        change: function () {
            var validation = ComboValidations("cmbMedium");
        },
        suggest: true,
        placeholder: "Select a medium"
    });
    $("#cmbMembershipType").kendoComboBox({
        dataValueField: "CdKy",
        dataTextField: "Code",
        dataSource: GetCdMas_LookupWeb('MembershipType'),
        filter: "contains",
        change: function () {
            var validation = ComboValidations("cmbMembershipType");
        },
        suggest: true,
        placeholder: "Select a MembershipType"
    });
    $("#HdrSec4_CmbAnnualPerMonth_Cd").kendoComboBox({
        dataValueField: "CdKy",
        dataTextField: "CdNm",
        dataSource: GetCdMas_LookupWeb('months'),
        filter: "contains",
        change: function () {
            var validation = ComboValidations("HdrSec4_CmbAnnualPerMonth_Cd");
        },
        suggest: true,
        placeholder: "Select a month"
    });
    $("#cmbTypeofMisconduct").kendoComboBox({
        dataValueField: "CdKy",
        dataTextField: "CdNm",
        dataSource: GetCdMas_LookupWeb('TrnspTyp'),
        filter: "contains",
        change: function () {
            var validation = ComboValidations("cmbTypeofMisconduct");
        },
        suggest: true,
        placeholder: "Select a Misconduct"
    });
    $("#cmbProgrammeType").kendoComboBox({
        dataValueField: "CdKy",
        dataTextField: "CdNm",
        dataSource: GetCdMas_LookupWeb('ProgrammeType'),
        filter: "contains",
        change: function () {
            var validation = ComboValidations("cmbProgrammeType");
        },
        suggest: true,
        placeholder: "Select a Programme"
    });
    $("#cmbEvaluation").kendoComboBox({
        dataValueField: "CdKy",
        dataTextField: "CdNm",
        dataSource: GetCdMas_LookupWeb('Evaluation'),
        filter: "contains",
        change: function () {
            var validation = ComboValidations("cmbEvaluation");
        },
        suggest: true,
        placeholder: "Select a Evaluation"
    });
}

function LoadDatePicker() {
    $("#fromDate").kendoDatePicker({

        format: "dd/MM/yyyy",
        min: new Date(31, 2, 1920)
    });
    $("#FromDate").kendoDatePicker({
        format: "dd/MM/yyyy",
        min: new Date(31, 2, 1920)
    });
    $("#ToDate").kendoDatePicker({
        format: "dd/MM/yyyy",
        min: new Date(31, 2, 2010)
    });
    $("#date").kendoDatePicker({
        format: "dd/MM/yyyy",
        min: new Date(31, 2, 1920)
    });
    $("#effectDate").kendoDatePicker({

        format: "dd/MM/yyyy",
        min: new Date(31, 2, 1920)
    });
    $(".k-datepicker, .k-combobox, .k-numerictextbox,.k-input").css('width', "100%");

}

function AfterFindEmp(EmpKy) {
    clearTrainingfeilds();
    clearMembershipFeilds();
    $.ajax({
        url: UrlGet.OtherDet,
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

                //Annual perfomce
                //$("#AnnualPerformanceGrid").data("kendoGrid").dataSource.data(data[0].AnnualPerDet);

                $('#HdrSec4_InptAnnualPerYear_Val').val(data[0].AnnualPerYear);
                $('#HdrSec4_InptAnnualPerReviewSent_Val').val(data[0].AnnualPerReviewSent);
                $('#HdrSec4_InptAnnualPerReviewReceived_Val').val(data[0].AnnualPerReviewReceived);
                $('#HdrSec5_InptAnnualPerOverallGrade_Val').val(data[0].AnnualPerOverallGrade);
                $('#HdrSec5_InptAnnualPerReviewPerson_Val').val(data[0].AnnualPerReviewPerson);

                $("#HdrSec4_CmbAnnualPerMonth_Cd").data("kendoComboBox").value(data[0].AnnualPerMonthKy);
                $("#HdrSec4_CmbAnnualPerMonth_Cd").data("kendoComboBox").text(data[0].AnnualPerMonth);


                $('#HdrSec4_InptAnnualPerEmpCdDtKy_Val').val(data[0].EmpCdDtKy);

                
                    try {
                        $('#TrainingDetailsGrid').data().kendoGrid.destroy();
                        $('#TrainingDetailsGrid').empty();
                    } catch (e) { }
                    LoadTraininDetailGrid();
                if (data[0].TrainingDet != null) {
                    $("#TrainingDetailsGrid").data("kendoGrid").dataSource.data(data[0].TrainingDet);
                }

                
                
                    try {
                        $('#MembershipDetailGrid').data().kendoGrid.destroy();
                        $('#MembershipDetailGrid').empty();
                    } catch (e) { }
                    LoadMembershipDetailGrid();
                if (data[0].MembershipDet != null) {
                    $("#MembershipDetailGrid").data("kendoGrid").dataSource.data(data[0].MembershipDet);
                }



                var imgSrc = data[0].AnnualPerFilePath; //<-- replace with your base64 image  EmpCdDtKy
                var $img = $("<img>", {
                    "src": "data:image;base64," + imgSrc,
                    // added `width` , `height` properties to `img` attributes
                    "width": "90%", "height": "1000px"
                })
                //var $img = $("<img/>");
                //$img.attr("src", "data:image/png;base64," + imgSrc + "width: 120px", "height: 90px" );
                $("#imagePreview").empty();
                $("#imagePreview").append($img);
            }
        },
        error: function (e) {
            return false;
        }
    });
}
