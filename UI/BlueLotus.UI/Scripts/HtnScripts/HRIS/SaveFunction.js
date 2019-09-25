function SaveBasicDet() {
    //InsertImgtoServer();
    SaveBasicDet_afterUpload("");
}
function SaveBasicDet_afterUpload(EmpImgPath) {
    //InsertImgtoServer();
    var nicNo = $('#nicNo').val();
    var empName = $('#HdrSec1_InptEmpNm_Val').val();
    var empNo = $('#HdrSec1_InptEmpNo_Val').val();

    if (empNo == "" || empName == "") {
        CLOSELoadingCommon();
        alert('Employee Name OR Number Can not be blank');
        return;
    }
    if (nicNo == "") {
        CLOSELoadingCommon();
        alert('NIC Number Can not be blank');
        return;
    }
    var joinDate = $('#joinDate').val();
    if (joinDate == "" || joinDate == null || joinDate == undefined || joinDate == '') {
        CLOSELoadingCommon();
        alert('Join Date Can not be blank');
        return;
    }
    //else {

    var EmpKy = $('#EmpKy').val();
    if (EmpKy == null || EmpKy == "") {
        EmpKy = 1;
    }
    HiddenEmpKy = EmpKy;
    var epfNo = $('#HdrSec2_InptEpfNo_Val').val();

    var nameInInitial = $('#nameInInitial').val();
    var cmbTitle = $("#cmbTitle").data("kendoComboBox").text();
    var cmbTitleKy = (!$("#cmbTitle").data("kendoComboBox").value()) ? 1 : $("#cmbTitle").data("kendoComboBox").value();
    var dateOfBirth = $('#dateOfBirth').val();
    var nicNo = $('#nicNo').val();
    var passportNo = $('#passportNo').val();
    var CardNo = $('#CardNo').val();
    var passportExpDate = $('#passportExpDate').val();
    var drivingLicence = $('#drivingLicence').val();
    var nationality = $("#cmbNationality").data("kendoComboBox").text();
    var nationalityKy = (!$("#cmbNationality").data("kendoComboBox").value()) ? 1 : $("#cmbNationality").data("kendoComboBox").value();
    var religion = $("#cmbReligion").data("kendoComboBox").text();
    var religionKy = (!$("#cmbReligion").data("kendoComboBox").value()) ? 1 : $("#cmbReligion").data("kendoComboBox").value();
    var gender = $("#cmbGender").data("kendoComboBox").text();
    var genderKy = (!$("#cmbGender").data("kendoComboBox").value()) ? 1 : $("#cmbGender").data("kendoComboBox").value();
    var bloodGroup = $("#cmbBloodGrp").data("kendoComboBox").text();
    var bloodGroupKy = (!$("#cmbBloodGrp").data("kendoComboBox").value()) ? 1 : $("#cmbBloodGrp").data("kendoComboBox").value();
    var country = $("#cmbCountry").data("kendoComboBox").text();
    var countryKy = (!$("#cmbCountry").data("kendoComboBox").value()) ? 1 : $("#cmbCountry").data("kendoComboBox").value();
    var civilStatus = $("#cmbCivilStatus").data("kendoComboBox").text();
    var civilStatusKy = (!$("#cmbCivilStatus").data("kendoComboBox").value()) ? 1 : $("#cmbCivilStatus").data("kendoComboBox").value();
    //var joinDate = $('#joinDate').val();
    
    var EmpImg = "";//$('#HdrSec7_filesImg').val(); // $('input[type=file]').val();

    var IsActive = 0;
    if ($('#IsActive').is(":checked")) {
        IsActive = 1;
    } else {
        IsActive = 0;
    }

    var IsAprove = 0;
    if ($('#IsAprove').is(":checked")) {
        IsAprove = 1;
    } else {
        IsAprove = 0;
    }

    var resignDate = $('#resignDate').val();

    var HdrDataString = JSON.stringify({
        EmpNo: empNo,
        EmpKy: EmpKy,
        EmpNm: empName
    });

    var DetDataString = JSON.stringify({
        EmpNo: empNo,
        EmpKy: EmpKy,
        EmpNm: empName,
        NameInInitial: nameInInitial,
        Title: cmbTitle,
        TitleKy: cmbTitleKy,
        DateOfBirth: dateOfBirth,
        NicNo: nicNo,
        PassportNo: passportNo,
        PassportExpDate: passportExpDate,
        DrivingLicence: drivingLicence,
        Nationality: nationality,
        NationalityKy: nationalityKy,
        Religion: religion,
        ReligionKy: religionKy,
        Gender: gender,
        GenderKy: genderKy,
        BloodGroup: bloodGroup,
        BloodGroupKy: bloodGroupKy,
        Country: country,
        CountryKy: countryKy,
        CivilStatus: civilStatus,
        CivilStatusKy: civilStatusKy,
        EpfNo: epfNo,
        JoinDate: joinDate,
        IsActive: IsActive,
        IsAprove: IsAprove,
        ResignDate: resignDate,
        EmpImg: EmpImgPath,
        CardNo: CardNo
    });
    $.ajax({
        url: UrlInsert.BasicDet,
        data: {
            HdrDataString: HdrDataString,
            DetDataString: DetDataString
        },
        contentType: 'application/json; charset=utf-8',
        dataType: "Json",
        success: function (data) {
            //alert('EmpKy' + data[0].EmpKy)
            CLOSELoadingCommon();
            alert('Saved Succesfuly..');
            Refresh();

        },
        error: function (e) {
            return false;
        }
    });
    //}
}

function InsertImgtoServer() {
    var EmpImgFileNm = $('#HdrSec7_filesImg').val();
    var EmpImgFileNm_Old = $('#HdrSec7_filesImgPath').val();
    //alert(EmpImg);
    //var EmpKy = $('#EmpKy').val();
    if (typeof FormData == "undefined") {
        var data = [];
        var opmlFile = document.getElementById('HdrSec7_filesImg').files[0];
        data.push('opmlFile', document.getElementById('HdrSec7_filesImg').files[0]);
    }
    else {
        var data = new FormData();
        var opmlFile = document.getElementById('HdrSec7_filesImg').files[0];
        data.append("opmlFile", document.getElementById('HdrSec7_filesImg').files[0]);

        $.ajax({
            type: "POST",
            url: UrlInsert.InsertFileswithpath,
            data:data,
            //    {
            //    data:data,
            //    EmpKy:EmpKy
            //},
            dataType: "html",
            contentType: false,
            processData: false,
            enctype: "multipart/form-data",
            success: function (result) {
                var res1 = result.replace('\"', '');
                var res = res1.replace('\"', '');
                //alert(res);
                if (EmpImgFileNm == "") {
                    res = EmpImgFileNm_Old;
                }
                //alert(res);
                SaveBasicDet_afterUpload(res);
                if (res != "false") {
                }
                else {
                }
            }
        })
    }
}

function Refresh() {
    ChangePage('EmployeeIndex', 'HRIS');
}
function SaveContactDet(){
    var empNo = $('#HdrSec1_InptEmpNo_Val').val();
    var EmpKy = $('#EmpKy').val();
    var empName = $('#HdrSec1_InptEmpNm_Val').val();
    if (EmpKy == null || EmpKy == "") {
        EmpKy = 1;
    }
    HiddenEmpKy = EmpKy;

    var Street = $('#Street').val();
    var City = $('#City').val();
    var State = $('#State').val();
    var HiddenAddress = $('#HiddenAddress').val();
    var temAdd = $('#CurrentAddress').val();
    var cmbDistrict = $("#cmbDistrict").data("kendoComboBox").text();
    var cmbDistrictKy = (!$("#cmbDistrict").data("kendoComboBox").value()) ? 1 : $("#cmbDistrict").data("kendoComboBox").value();
    var cmbElectorate = $("#cmbElectorate").data("kendoComboBox").text();
    var cmbElectorateKy = (!$("#cmbElectorate").data("kendoComboBox").value()) ? 1 : $("#cmbElectorate").data("kendoComboBox").value();
    var cmbProvince = $("#cmbProvince").data("kendoComboBox").text();
    var cmbProvinceKy = (!$("#cmbProvince").data("kendoComboBox").value()) ? 1 : $("#cmbProvince").data("kendoComboBox").value();
    var mobile = $('#mobile').val();
    var telephone = $('#telephone').val();
    var email = $('#email').val();
    var EmrContactName = $('#EmrContactName').val();
    var EmAdrKy = $('#EmAdrKy').val();
    var cmbRelationship = $("#cmbRelationship").data("kendoComboBox").text();
    var cmbRelationshipKy = (!$("#cmbRelationship").data("kendoComboBox").value()) ? 1 : $("#cmbRelationship").data("kendoComboBox").value();
    var emrConAddress = $('#emrConAddress').val();
    var emrConTelephone = $('#emrConTelephone').val();
    var OfficeTelephone = $('#OfficeTelephone').val();
    var OfficeEmail = $('#OfficeEmail').val();

    var HdrDataString = JSON.stringify({
        EmpNo: empNo,
        EmpKy: EmpKy,
        EmpNm: empName
    });

    var DetDataString = JSON.stringify({
        EmpNo: empNo,
        EmpKy: EmpKy,
        EmpNm: empName,

        Street: Street,
        City: City,
        State: State,
        HiddenAddress: HiddenAddress,
        CurrentAddress: temAdd,
        District: cmbDistrict,
        DistrictKy: cmbDistrictKy,
        Electorate: cmbElectorate,
        ElectorateKy: cmbElectorateKy,
        Province: cmbProvince,
        ProvinceKy: cmbProvinceKy,
        Mobile: mobile,
        Telephone: telephone,
        Email: email,
        EmrContactName: EmrContactName,
        Relationship: cmbRelationship,
        EmrRelationshipKy: cmbRelationshipKy,
        EmrConAddress: emrConAddress,
        EmrConTelephone: emrConTelephone,
        OfficeTelephone: OfficeTelephone,
        OfficeEmail: OfficeEmail,
        EmAdrKy: EmAdrKy
    });
    $.ajax({
        url: UrlInsert.ContactDet,
        data: {
            HdrDataString: HdrDataString,
            DetDataString: DetDataString
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

function SaveEducationDet() {
    var empNo = $('#HdrSec1_InptEmpNo_Val').val();
    var EmpKy = $('#EmpKy').val();
    var empName = $('#HdrSec1_InptEmpNm_Val').val();
    if (EmpKy == null || EmpKy == "") {
        EmpKy = 1;
    }
    var ALYear = $('#ALYear').val();
    var ALInstitute = $('#ALInstitute').val();
    var ALGrade = $("#cmbALGrade").data("kendoComboBox").text();
    var ALGradeKy = $("#cmbALGrade").data("kendoComboBox").value();

    if (ALGradeKy < 1) {
        ALGradeKy = 1;
    }

    var OLYear = $('#OLYear').val();
    var OLInstitute = $('#OLInstitute').val();
    var OLGrade = $("#cmbOLGrade").data("kendoComboBox").text();
    var OLGradeKy = $("#cmbOLGrade").data("kendoComboBox").value();

    if (OLGradeKy < 1) {
        OLGradeKy = 1;
    }


    HiddenEmpKy = EmpKy;
    var HdrDataString = JSON.stringify({
        EmpNo: empNo,
        EmpKy: EmpKy,
        EmpNm: empName
    });

    var DetDataString = JSON.stringify({
        EmpNo: empNo,
        EmpKy: EmpKy,
        EmpNm: empName,

        ALYear: ALYear,
        ALInstitute: ALInstitute,
        ALGradeKy: ALGradeKy,
        ALGrade: ALGrade,

        OLYear: OLYear,
        OLInstitute: OLInstitute,
        OLGradeKy: OLGradeKy,
        OLGrade: OLGrade
    });

    $.ajax({
        url: UrlInsert.InsertDet,
        data: {
            HdrDataString: HdrDataString,
            DetDataString: DetDataString,
            Form: 'SaveEducationDet'
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
function SaveFamilyDet() {
    var grid = $("#familyDetailGrid").data("kendoGrid");
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

    var HdrDataString = JSON.stringify({
        EmpNo: empNo,
        EmpKy: EmpKy,
        EmpNm: empName
    });

    var DetDataString = JSON.stringify({
        EmpNo: empNo,
        EmpKy: EmpKy,
        EmpNm: empName,

        GridData: KendoGridData
    });

    $.ajax({
        url: UrlInsert.InsertDet,
        data: {
            HdrDataString: HdrDataString,
            DetDataString: DetDataString,
            Form: 'SaveFamilyDet'
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


function DeleteFamilyDet(AdrKy) {
    $.ajax({
        url: UrlDelete.DeleteFamilyDet,
        data: {
            AdrKy :AdrKy
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