function DocReadyCus() {
    LoadDropDown();
    //setHdrSectionPropFun();
    Tooltip();
    SelectText();
    LoadDatePicker();
    var todayDate = new Date();
    $("#joinDate").data("kendoDatePicker").value(todayDate);
    document.getElementById("IsActive").checked = true;

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

    $("#IsActive").change(function () {
        if ($('#IsActive').is(":checked")) {
            $("#resign").hide();
        } else {
            $("#resign").show();
        }
    });
    LoadfamilyDetailGrid();

    //LoadProfQualiDetailGrid();
    //$('#tabstrip').t    //.tab('select', 1);   ///.tabs('select', 1);
    $("#tabstrip").data("kendoTabStrip").select(0);
    //CLOSELoadingForm();
}

function InsertToGrid() {
    var grid = $("#familyDetailGrid").data("kendoGrid");
    var dataSource1 = grid.dataSource;
    var total = dataSource1.data().length;
    var FamilyFirstName = $('#firstName').val();
    var FamilyNicNo = $('#FamilyNicNo').val();
    var dateOfBirth = $('#ReldateOfBirth').val();
    var FamilyRelationship = $("#cmbFamilyRelationship").data("kendoComboBox").text();
    var FamilyRelationshipKy = (!$("#cmbFamilyRelationship").data("kendoComboBox").value()) ? 1 : $("#cmbFamilyRelationship").data("kendoComboBox").value();

    //alert('FamilyNicNo : ' + FamilyNicNo + ' , dateOfBirth: ' + dateOfBirth + ', FamilyRelationshipKy:' + FamilyRelationship + ' , FamilyRelationshipKy: ' + FamilyRelationshipKy);

    grid.dataSource.insert(
        total,
        {
            FamilyFirstName: FamilyFirstName,
            FamilyNicNo: FamilyNicNo,
            FamilyDateOfBirth: dateOfBirth,
            FamilyRelationship: FamilyRelationship,
            FamilyRelationshipKy: FamilyRelationshipKy
        });
    clearFamilyFeilds();
}
function clearFamilyFeilds() {
    $('#firstName').val('');
    $('#FamilyNicNo').val('');
    $('#ReldateOfBirth').val('');
    $("#cmbFamilyRelationship").data('kendoComboBox').value("");
}
function DeleteFunction() {
    var tabstrip = $("#tabstrip").kendoTabStrip().data("kendoTabStrip");
    var tabIndx = -1;
    var tabId = '';
    var tab = tabstrip.select();
    tabIndx = tab.index();
    tabId = tab.attr("id");
    
    if (tabId == 'HdrSec_TabFamilyDet') {
        var grid = $("#familyDetailGrid").data().kendoGrid;
        var selectedItem = grid.dataItem(grid.select());
        if (selectedItem == null) {
            alert('Please Select Something');
        }
        else {
            var AdrKy = selectedItem.AdrKy;
            var FamilyFirstName = selectedItem.FamilyFirstName;
            if (confirm("Do you want to Delete " + FamilyFirstName + "?") == true) {
                DeleteFamilyDet(AdrKy);
            }
        }
    }
    else if (tabIndx == -1) {
        alert("Not Saved");
    }
    else {
        alert('Can not Delete!');
    }
    
}

function SaveUpdate() {
    var EmpKy = $('#EmpKy').val();
    //if (EmpKy > 10) {
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
        else if (tabId == 'HdrSec_TabContactDet') {
            if (EmpKy > 10) {
                SaveContactDet();
            } else {
                CLOSELoadingCommon();
                alert("Please Select An Employee!")
            }
        }
        else if (tabId == 'HdrSec_TabEducationDet') {
            if (EmpKy > 10) {
                SaveEducationDet();
            } else {
                CLOSELoadingCommon();
                alert("Please Select An Employee!")
            }
            //SaveEducationDet();
        }
        else if (tabId == 'HdrSec_TabFamilyDet') {
            if (EmpKy > 10) {
                SaveFamilyDet();
            } else {
                CLOSELoadingCommon();
                alert("Please Select An Employee!")
            }
            //SaveFamilyDet();
        }
        else if (tabId == 'HdrSec_TabBasicDet') {
            SaveBasicDet();
        }
    //}
    //else {
    //    alert("Please Select An Employee!")
    //}
}
   
function LoadDropDown() {
    $("#cmbDistrict").kendoComboBox({
        dataValueField: "CdKy",
        dataTextField: "CdNm",
        dataSource: GetCdMas_LookupWeb('District'),
        filter: "contains",
        change: function () {
            var validation = ComboValidations("cmbDistrict");
        },
        suggest: true,
        placeholder: "Select a District"
    });
    $("#cmbAdrDetTyp").kendoComboBox({
        dataValueField: "CdKy",
        dataTextField: "CdNm",
        dataSource: GetCdMas_LookupWeb('AdrTyp'),
        filter: "contains",
        change: function () {
            var validation = ComboValidations("cmbAdrDetTyp");
        },
        suggest: true,
        placeholder: "Select a Adr Det Typ"
    });
    $("#cmbElectorate").kendoComboBox({
        dataValueField: "CdKy",
        dataTextField: "CdNm",
        dataSource: GetCdMas_LookupWeb('Electorate'),
        filter: "contains",
        change: function () {
            var validation = ComboValidations("cmbElectorate");
        },
        suggest: true,
        placeholder: "Select a Electorate"
    });
    $("#cmbProvince").kendoComboBox({
        dataValueField: "CdKy",
        dataTextField: "CdNm",
        dataSource: GetCdMas_LookupWeb('Province'),
        filter: "contains",
        change: function () {
            var validation = ComboValidations("cmbProvince");
        },
        suggest: true,
        placeholder: "Select a Province"
    });
    $("#cmbRelationship").kendoComboBox({
        dataValueField: "CdKy",
        dataTextField: "CdNm",
        dataSource: GetCdMas_LookupWeb('Relationship'),
        filter: "contains",
        change: function () {
            var validation = ComboValidations("cmbRelationship");
        },
        suggest: true,
        placeholder: "Select a Relationship"
    });
    $("#cmbReligion").kendoComboBox({
        dataValueField: "CdKy",
        dataTextField: "CdNm",
        dataSource: GetCdMas_LookupWeb('religion'),
        filter: "contains",
        change: function () {
            var validation = ComboValidations("cmbReligion");
        },
        suggest: true,
        placeholder: "Select a religion"
    });
    $("#cmbTitle").kendoComboBox({
        dataValueField: "CdKy",
        dataTextField: "CdNm",
        dataSource: GetCdMas_LookupWeb('title'),
        filter: "contains",
        change: function () {
            var validation = ComboValidations("cmbTitle");
        },
        suggest: true,
        placeholder: "Select a Title"
    });
    $("#cmbNationality").kendoComboBox({
        dataValueField: "CdKy",
        dataTextField: "CdNm",
        dataSource: GetCdMas_LookupWeb('nationality'),
        filter: "contains",
        change: function () {
            var validation = ComboValidations("cmbNationality");
        },
        suggest: true,
        placeholder: "Select a nationality"
    });
    $("#cmbGender").kendoComboBox({
        dataValueField: "CdKy",
        dataTextField: "CdNm",
        dataSource: GetCdMas_LookupWeb('gender'),
        filter: "contains",
        change: function () {
            var validation = ComboValidations("cmbGender");
        },
        suggest: true,
        placeholder: "Select a Gender"
    });
    $("#cmbCountry").kendoComboBox({
        dataValueField: "CdKy",
        dataTextField: "CdNm",
        dataSource: GetCdMas_LookupWeb('country'),
        filter: "contains",
        change: function () {
            var validation = ComboValidations("cmbCountry");
        },
        suggest: true,
        placeholder: "Select a Country"
    });
    $("#cmbBloodGrp").kendoComboBox({
        dataValueField: "CdKy",
        dataTextField: "CdNm",
        dataSource: GetCdMas_LookupWeb('bloodGrp'),
        filter: "contains",
        change: function () {
            var validation = ComboValidations("cmbBloodGrp");
        },
        suggest: true,
        placeholder: "Select a Blood Group"
    });

    $("#cmbCivilStatus").kendoComboBox({
        dataValueField: "CdKy",
        dataTextField: "CdNm",
        dataSource: GetCdMas_LookupWeb('CvlSts'),
        filter: "contains",
        change: function () {
            var validation = ComboValidations("cmbCivilStatus");
        },
        suggest: true,
        placeholder: "Select a CivilStatus"
    });
    $("#cmbALGrade").kendoComboBox({
        dataValueField: "CdKy",
        dataTextField: "CdNm",
        dataSource: GetCdMas_LookupWeb('grade'),
        filter: "contains",
        change: function () {
            var validation = ComboValidations("cmbALGrade");
        },
        suggest: true,
        placeholder: "Select a Grade"
    });
    $("#cmbOLGrade").kendoComboBox({
        dataValueField: "CdKy",
        dataTextField: "CdNm",
        dataSource: GetCdMas_LookupWeb('grade'),
        filter: "contains",
        change: function () {
            var validation = ComboValidations("cmbOLGrade");
        },
        suggest: true,
        placeholder: "Select a Grade"
    });
    //$("#HdrSec6_CmbOtherEduResult").kendoComboBox({
    //    dataValueField: "CdKy",
    //    dataTextField: "CdNm",
    //    dataSource: GetCdMas_LookupWeb('grade'),
    //    filter: "contains",
    //    change: function () {
    //        var validation = ComboValidations("cmbOLGrade");
    //    },
    //    suggest: true,
    //    placeholder: "Select a Grade"
    //});
    $("#cmbFamilyRelationship").kendoComboBox({
        dataValueField: "CdKy",
        dataTextField: "Code",
        dataSource: GetCdMas_LookupWeb('relationship'),
        filter: "contains",
        change: function () {
            var validation = ComboValidations("cmbFamilyRelationship");
        },
        suggest: true,
        placeholder: "Select a Relationship"
    });

}

function LoadDatePicker() {

    $("#dateOfBirth").kendoDatePicker({

        format: "dd/MM/yyyy",
        min: new Date(31, 2, 1920)
    });
    $("#ReldateOfBirth").kendoDatePicker({

        format: "dd/MM/yyyy",
        min: new Date(31, 2, 1920)
    });
    $("#passportExpDate").kendoDatePicker({

        format: "dd/MM/yyyy",
        min: new Date(31, 2, 2010)
    });
    $("#joinDate").kendoDatePicker({

        format: "dd/MM/yyyy",
        min: new Date(31, 2, 1990)
    });
    $("#resignDate").kendoDatePicker({

        format: "dd/MM/yyyy",
        min: new Date(31, 2, 1990)
    });

    $(".k-datepicker, .k-combobox, .k-numerictextbox,.k-input").css('width', "100%");

}

function AfterFindEmp(EmpKy) {
    clearFamilyFeilds();
    $.ajax({
        url: UrlGet.GetPersonalDet,
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

                // basic det

                $('#dateOfBirth').val(data[0].DateOfBirth);
                //$('#nameInInitial').val(data[0].NameInInitial);
                $('#nameInInitial').val(data[0].EmpNm);
                $('#nicNo').val(data[0].NicNo);
                $('#passportNo').val(data[0].PassportNo);
                $('#CardNo').val(data[0].CardNo);
                $('#passportExpDate').val(data[0].PassportExpDate);
                $('#drivingLicence').val(data[0].DrivingLicence);
                $('#HdrSec7_filesImgPath').val(data[0].EmpImgNm);
                var imgSrc = data[0].EmpImg;
                var $img = $("<img>", {
                    "src": "data:image;base64," + imgSrc,
                    "width": "100px", "height": "100px"
                })
                $("#EmpImagePreview").empty();
                $("#EmpImagePreview").append($img);

                //alert(data[0].IsActive);

                //$('#IsActive').attr('checked', true);
                //$("#IsActive").trigger("change");
                if (data[0].IsActive == 1) {
                    //$('#IsActive').attr('checked', true);
                    document.getElementById("IsActive").checked = true;
                }
                else {
                    //$('#IsActive').attr('checked', false);
                    document.getElementById("IsActive").checked = false;
                }
                $("#IsActive").trigger("change");

                if (data[0].IsAprove == 1) {
                    //$('#IsAprove').attr('checked', true);
                    document.getElementById("IsAprove").checked = true;
                }
                else {
                    //$('#IsAprove').attr('checked', false);
                    document.getElementById("IsAprove").checked = false;
                }

                $('#joinDate').val(data[0].JoinDate); 
                $('#joinDate_Hdr').val(data[0].JoinDate);
                $('#resignDate').val(data[0].ResignDate);

                if (data[0].TitleKy > 1) {
                    $("#cmbTitle").data("kendoComboBox").value(data[0].TitleKy);
                    $("#cmbTitle").data("kendoComboBox").text(data[0].Title);
                }
                else { $("#cmbTitle").data("kendoComboBox").text(""); }

                if (data[0].NationalityKy > 1) {
                    $("#cmbNationality").data("kendoComboBox").value(data[0].NationalityKy);
                    $("#cmbNationality").data("kendoComboBox").text(data[0].Nationality);
                }
                else { $("#cmbNationality").data("kendoComboBox").text(""); }

                if (data[0].ReligionKy > 1) {
                    $("#cmbReligion").data("kendoComboBox").value(data[0].ReligionKy);
                    $("#cmbReligion").data("kendoComboBox").text(data[0].Religion);
                }
                else { $("#cmbReligion").data("kendoComboBox").text(""); }

                if (data[0].GenderKy > 1) {
                    $("#cmbGender").data("kendoComboBox").value(data[0].GenderKy);
                    $("#cmbGender").data("kendoComboBox").text(data[0].Gender);
                }
                else { $("#cmbGender").data("kendoComboBox").text(""); }

                if (data[0].BloodGroupKy > 1) {
                    $("#cmbBloodGrp").data("kendoComboBox").value(data[0].BloodGroupKy);
                    $("#cmbBloodGrp").data("kendoComboBox").text(data[0].BloodGroup);
                }
                else { $("#cmbBloodGrp").data("kendoComboBox").text(""); }

                if (data[0].CountryKy > 1) {
                    $("#cmbCountry").data("kendoComboBox").value(data[0].CountryKy);
                    $("#cmbCountry").data("kendoComboBox").text(data[0].Country);
                }
                else { $("#cmbCountry").data("kendoComboBox").text(""); }

                if (data[0].CivilStatusKy > 1) {
                    $("#cmbCivilStatus").data("kendoComboBox").value(data[0].CivilStatusKy);
                    $("#cmbCivilStatus").data("kendoComboBox").text(data[0].CivilStatus);
                }
                else { $("#cmbCivilStatus").data("kendoComboBox").text(""); }

                // contact Details

                if (data[0].DepartmentKy > 1) {
                    $("#HdrSec2_CmbDept_Nm").data("kendoComboBox").value(data[0].DepartmentKy);
                    $("#HdrSec2_CmbDept_Nm").data("kendoComboBox").text(data[0].Department);
                }
                
                if (data[0].LocationKy > 1) {
                    $("#HdrSec3_CmbLoc_Nm").data("kendoComboBox").value(data[0].LocationKy);
                    $("#HdrSec3_CmbLoc_Nm").data("kendoComboBox").text(data[0].Location);
                }
                if (data[0].CompanyKy > 1) {
                    $("#HdrSec3_CmbCom_Nm").data("kendoComboBox").value(data[0].CompanyKy);
                    $("#HdrSec3_CmbCom_Nm").data("kendoComboBox").text(data[0].Company);
                }
                if (data[0].DesignationKy > 1) {
                    $("#HdrSec4_CmbDesg_Nm").data("kendoComboBox").value(data[0].DesignationKy);
                    $("#HdrSec4_CmbDesg_Nm").data("kendoComboBox").text(data[0].Designation);
                }
                if (data[0].NatureOfEmploymentKy > 1) {
                    $("#HdrSec4_CmbNature_Nm").data("kendoComboBox").value(data[0].NatureOfEmploymentKy);
                    $("#HdrSec4_CmbNature_Nm").data("kendoComboBox").text(data[0].NatureOfEmployment);
                }

                $('#Street').val(data[0].Street);
                $('#City').val(data[0].City);
                $('#State').val(data[0].State);
                $('#HiddenAddress').val(data[0].AdrDetKy);
                $('#CurrentAddress').val(data[0].CurrentAddress);
                $('#mobile').val(data[0].Mobile);
                $('#telephone').val(data[0].Telephone);
                $('#email').val(data[0].Email);
                $('#EmrContactName').val(data[0].EmrContactName);
                $('#emrConAddress').val(data[0].EmrConAddress);
                $('#emrConTelephone').val(data[0].EmrConTelephone);//EmAdrKy
                $('#EmAdrKy').val(data[0].EmAdrKy);

                if (data[0].DistrictKy > 1) {
                    $("#cmbDistrict").data("kendoComboBox").value(data[0].DistrictKy);
                    $("#cmbDistrict").data("kendoComboBox").text(data[0].District);
                }
                else { $("#cmbDistrict").data("kendoComboBox").text(""); }

                if (data[0].ElectorateKy > 1) {
                    $("#cmbElectorate").data("kendoComboBox").value(data[0].ElectorateKy);
                    $("#cmbElectorate").data("kendoComboBox").text(data[0].Electorate);
                }
                else { $("#cmbElectorate").data("kendoComboBox").text(""); }

                if (data[0].ProvinceKy > 1) {
                    $("#cmbProvince").data("kendoComboBox").value(data[0].ProvinceKy);
                    $("#cmbProvince").data("kendoComboBox").text(data[0].Province);
                }
                else { $("#cmbProvince").data("kendoComboBox").text(""); }

                if (data[0].EmrRelationshipKy > 1) {
                    $("#cmbRelationship").data("kendoComboBox").value(data[0].EmrRelationshipKy);
                    $("#cmbRelationship").data("kendoComboBox").text(data[0].EmrRelationship);
                }
                else { $("#cmbRelationship").data("kendoComboBox").text(""); }

                $('#OfficeTelephone').val(data[0].OfficeTelephone);
                $('#OfficeEmail').val(data[0].OfficeEmail);

                //Acadamic


                $('#ALYear').val(data[0].ALYear);
                $('#ALInstitute').val(data[0].ALInstitute);

                $("#cmbALGrade").data("kendoComboBox").value(data[0].ALGradeKy);
                $("#cmbALGrade").data("kendoComboBox").text(data[0].ALGrade);

                $('#OLYear').val(data[0].OLYear);
                $('#OLInstitute').val(data[0].OLInstitute);

                $("#cmbOLGrade").data("kendoComboBox").value(data[0].OLGradeKy);
                $("#cmbOLGrade").data("kendoComboBox").text(data[0].OLGrade);

                // Familyt Det
                try {
                    $('#familyDetailGrid').data().kendoGrid.destroy();
                    $('#familyDetailGrid').empty();
                } catch (e) { }
                LoadfamilyDetailGrid();
                if (data[0].FamilyDet != null) {
                    $("#familyDetailGrid").data("kendoGrid").dataSource.data(data[0].FamilyDet);
                }

            }
        },
        error: function (e) {
            return false;
        }
    });
}
