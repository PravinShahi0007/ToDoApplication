$(document).ready(function () {
    var OurCode = "@(ViewBag.ObjCaptn)";
    LoadDropDown();
    //Load the tooltip //COmmo srcipt
    Tooltip();
    //Selecting the text//COmmo srcipt
    SelectText();
    //add savebutton
    LoadDatePicker();
    var todayDate = new Date();
    $("#dateOfBirth").data("kendoDatePicker").value(todayDate);
    $("#passportExpDate").data("kendoDatePicker").value(todayDate);
    $("#joinDate").data("kendoDatePicker").value(todayDate);
    $("#resignDate").data("kendoDatePicker").value(todayDate);
    LoadBasicDetailGrid();

    $("#IsActive").change(function () {
        if ($('#IsActive').is(":checked")) {
            $("#resign").hide();
        } else {
            $("#resign").show();
        }
    });
     
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
});


function clearfunction() {
    document.getElementById("empName").value = "";
    document.getElementById("empNo").value = "";
    document.getElementById("nameInInitial").value = "";
    document.getElementById("nicNo").value = "";
    document.getElementById("passportNo").value = "";
    document.getElementById("drivingLicence").value = "";
    document.getElementById("epfNo").value = "";

    $("#cmbTitle").data("kendoComboBox").value("");
    $("#cmbNationality").data("kendoComboBox").value("");
    $("#cmbReligion").data("kendoComboBox").value("");
    $("#cmbGender").data("kendoComboBox").value("");
    $("#cmbBloodGrp").data("kendoComboBox").value("");
    $("#cmbCountry").data("kendoComboBox").value("");
    $("#cmbCivilStatus").data("kendoComboBox").value("");

    var todayDate = new Date();
    $("#dateOfBirth").data("kendoDatePicker").value(todayDate);
    $("#passportExpDate").data("kendoDatePicker").value(todayDate);
    $("#joinDate").data("kendoDatePicker").value(todayDate);
    $("#resignDate").data("kendoDatePicker").value(todayDate);
}

//calander vaucherDate
function LoadDatePicker() {
   
    $("#dateOfBirth").kendoDatePicker({

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

function GetCdMas_LookupWeb(ConCd){
    var dataSource = new kendo.data.DataSource(
      {
          transport: {
              read: {
                  url: urlHRISEmployeeGetCdMas_LookupWeb,
                  data: { ConCd: ConCd },
                  dataType: "json"
              }
          }
      });
    return dataSource;
}
//Load The Drop DownList
function LoadDropDown() {
    $("#cmbReligion").kendoComboBox({
        dataValueField: "CdKy",
        dataTextField: "CdNm",
        dataSource: GetCdMas_LookupWeb('religion'),  
        filter: "contains",
        suggest: true,
        placeholder: "Select a religion"
    });
    $("#cmbTitle").kendoComboBox({
        dataValueField: "CdKy",
        dataTextField: "CdNm",
        dataSource: GetCdMas_LookupWeb('title'),  
        filter: "contains",
        suggest: true,
        placeholder: "Select a Title"
    });
    $("#cmbNationality").kendoComboBox({
        dataValueField: "CdKy",
        dataTextField: "CdNm",
        dataSource: GetCdMas_LookupWeb('nationality'),  
        filter: "contains",
        suggest: true,
        placeholder: "Select a nationality"
    });
    $("#cmbGender").kendoComboBox({
        dataValueField: "CdKy",
        dataTextField: "CdNm",
        dataSource: GetCdMas_LookupWeb('gender'),  
        filter: "contains",
        suggest: true,
        placeholder: "Select a Gender"
    });
    $("#cmbCountry").kendoComboBox({
        dataValueField: "CdKy",
        dataTextField: "CdNm",
        dataSource: GetCdMas_LookupWeb('country'),  
        filter: "contains",
        suggest: true,
        placeholder: "Select a Country"
    });
    $("#cmbBloodGrp").kendoComboBox({
        dataValueField: "CdKy",
        dataTextField: "CdNm",
        dataSource: GetCdMas_LookupWeb('bloodGrp'),  
        filter: "contains",
        suggest: true,
        placeholder: "Select a Blood Group"
    });
    
    $("#cmbCivilStatus").kendoComboBox({
        dataValueField: "CdKy",
        dataTextField: "CdNm",
        dataSource: GetCdMas_LookupWeb('CvlSts'),  
        filter: "contains",
        suggest: true,
        placeholder: "Select a CivilStatus"
    });
}

function AfterFindEmp(EmpKy) {
    clearfunction();
    $.ajax({
        url: UrlGetEmpPersonalDet,
        data: {
            EmpKy: EmpKy
        },
        dataType: "Json",
        type: "POST",
        success: function (data) {
            //AjaxLoad();
            //alert(data[0].EmpName);
            $('#empName').val(data[0].EmpName);
            $('#empNo').val(data[0].EmpNo);
            $('#EmpKy').val(EmpKy);
            $('#epfNo').val(data[0].EPFNo);
            $('#dateOfBirth').val(data[0].DateOfBirth);
            $('#nameInInitial').val(data[0].NameInInitial);
            $('#nicNo').val(data[0].NICNo);
            $('#passportNo').val(data[0].PassportNo);
            $('#passportExpDate').val(data[0].PassportExpDate);
            $('#drivingLicence').val(data[0].DrivingLicenceNo);

            if (data[0].IsActive == 1) {
                $('#IsActive').attr('checked', true);
            }
            else {
                $('#IsActive').attr('checked', false);
            }
            $("#IsActive").trigger("change");

            if (data[0].IsAprove == 1) {
                $('#IsAprove').attr('checked', true);
            }
            else {
                $('#IsAprove').attr('checked', false);
            }

            $('#joinDate').val(data[0].JoinDate);
            //   $('#resignDate').val(data[0].ResignDate);

            $("#cmbTitle").data("kendoComboBox").value(data[0].TitleKy);
            $("#cmbTitle").data("kendoComboBox").text(data[0].Title);

            $("#cmbNationality").data("kendoComboBox").value(data[0].NationalityKy);
            $("#cmbNationality").data("kendoComboBox").text(data[0].Nationality);

            $("#cmbReligion").data("kendoComboBox").value(data[0].ReligionKy);
            $("#cmbReligion").data("kendoComboBox").text(data[0].Religion);

            $("#cmbGender").data("kendoComboBox").value(data[0].GenderKy);
            $("#cmbGender").data("kendoComboBox").text(data[0].Gender);

            $("#cmbBloodGrp").data("kendoComboBox").value(data[0].BloodGroupKy);
            $("#cmbBloodGrp").data("kendoComboBox").text(data[0].BloodGroup);

            $("#cmbCountry").data("kendoComboBox").value(data[0].CountryKy);
            $("#cmbCountry").data("kendoComboBox").text(data[0].Country);

            $("#cmbCivilStatus").data("kendoComboBox").value(data[0].CivilStatusKy);
            $("#cmbCivilStatus").data("kendoComboBox").text(data[0].CivilStatus);
        },
        error: function (e) {
            return false;
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

//Load Gid Details
function LoadBasicDetailGrid() {
    var dataSource = new kendo.data.DataSource({
        batch: true,
        pageSize: 10,
        schema: {
            model: {
                id: "EmpKy",
                fields: //Relavent fields of the grid should be bind with following model items
                {
                    LiNo: { editable: false, nullable: false, type: "number" },
                    empNo: { editable: true, nullable: false, type: "string" },
                    title: { editable: true, nullable: false, type: "string" },
                    titleKy: { editable: true, nullable: false, type: "number" },
                    empName: { editable: true, nullable: false, type: "string" },
                    nameInInitial: { editable: true, nullable: false, type: "string" },
                    dateOfBirth: { editable: true, nullable: false, type: "string" },
                    nicNo: { editable: true, nullable: false, type: "string" },
                    passportNo: { editable: true, nullable: false, type: "string" },
                    passportExpDate: { editable: true, nullable: false, type: "string" },
                    drivingLicence: { editable: true, nullable: false, type: "string" },
                    nationality: { editable: true, nullable: false, type: "string" },
                    nationalityKy: { editable: true, nullable: false, type: "number" },
                    religion: { editable: true, nullable: false, type: "string" },
                    religionKy: { editable: true, nullable: false, type: "number" },
                    gender: { editable: true, nullable: false, type: "string" },
                    genderKy: { editable: true, nullable: false, type: "number" },
                    bloodGroup: { editable: true, nullable: false, type: "string" },
                    bloodGroupKy: { editable: true, nullable: false, type: "number" },
                    country: { editable: true, nullable: false, type: "string" },
                    countryKy: { editable: true, nullable: false, type: "number" },
                    civilStatus: { editable: true, nullable: false, type: "string" },
                    civilStatusKy: { editable: true, nullable: false, type: "number" },
                    epfNo: { editable: true, nullable: false, type: "string" },
                    joinDate: { editable: true, nullable: false, type: "string" },
                    IsActive: { editable: true, nullable: false, type: "number" },
                    IsAprove: { editable: true, nullable: false, type: "number" },
                    resignDate: { editable: true, nullable: false, type: "string" }
                }
            }
        },
    });
    $("#BasicDetailGrid").kendoGrid({
        dataSource: dataSource,
        sortable: true,
        autobind: true,
        navigatable: true,
        scrollable: true,
        pageSize: 10,
        pageable: true,
        selectable: "row",
        resizable: true,
        pageable: { refresh: true, pageSizes: [5, 10, 20, 50, 100] },
        
        columns: [
            {
                field: "LiNo",
                title: "LiNo",
                width: "40px",
                attributes: { class: "ob-Center" }
            },
            {
                field: "empNo",
                title: "EMP No",
                width: "100px",
            },
            {
                field: "EmpKy",
                title: "EMP Ky",
                //width: "100px",
                hidden : true,
            },
            {
                field: "title",
                title: "Title",
                width: "50px",
            },
            {
                field: "titleKy",
                title: "Title",
                hidden: true,
               //width: "50px",
            },
            {
                field: "empName",
                title: "EMP Name",
                width: "120px",
            },
            {
                field: "nameInInitial",
                title: "Name in Initial",
                width: "100px",

            },
            {
                field: "dateOfBirth",
                title: "Date of Birth",
                width: "100px",
            },
            {
                field: "nicNo",
                title: "NIC",
                width: "100px",
            },
            {
                field: "passportNo",
                title: "Passport",
                width: "70px",
            },
             {
                 field: "passportExpDate",
                 title: "Passport Exp",
                 width: "100px",
             },
            {
                field: "drivingLicence",
                title: "Driving Licence",
                width: "100px",
            },
            {
                field: "nationality",
                title: "Nationality",
                width: "100px",
            },
            {
                field: "nationalityKy",
                title: "Nationality",
                hidden: true,
            },
            {
                field: "religion",
                title: "Religion",
                width: "80px",
            },
            {
                field: "religionKy",
                title: "Religion",
                hidden: true,
            },
            {
                field: "gender",
                title: "Gender",
                width: "70px",
            },
            {
                field: "genderKy",
                title: "Gender",
                hidden: true,
            },
            {
                field: "bloodGroup",
                title: "Blood group",
                width: "40px",
            },
            {
                field: "bloodGroupKy",
                title: "Blood group",
                hidden: true,
            },
            {
                field: "country",
                title: "Country",
                width: "70px",
            },
            {
                field: "countryKy",
                title: "Country",
                hidden: true,
            },
            {
                field: "civilStatus",
                title: "Civil Status",
                width: "70px",
            },
            {
                field: "civilStatusKy",
                title: "Civil Status",
                hidden: true,
            },
            {
                field: "epfNo",
                title: "EPF No",
                width: "100px",
            },
            {
                field: "joinDate",
                title: "Date of Join",
                width: "100px",
            },
            {
                field: "IsActive",
                title: "Is Active",
                width: "100px",
            },
            {
                field: "IsAprove",
                title: "IsAprove",
                width: "100px",
                hidden:true
            },
            {
                field: "resignDate",
                title: "Date of Resign",
                width: "100px",
            },
        ]
    });
}

function InsertToGrid() {
    var nicNo = $('#nicNo').val();
    var empName = $('#empName').val();
    if (nicNo == "" || empName == '') {
        alert('Employee Name OR NIC Number Can not be blank');
    }
    else {
        var EmpKy = 1;
        var grid = $("#BasicDetailGrid").data("kendoGrid");
        var dataSource1 = grid.dataSource;
        var total = dataSource1.data().length;
        var empNo = $('#empNo').val();
        var EmpKy = $('#EmpKy').val();
        var nameInInitial = $('#nameInInitial').val();
        var cmbTitle = $("#cmbTitle").data("kendoComboBox").text();
        var cmbTitleKy = (!$("#cmbTitle").data("kendoComboBox").value()) ? 1 : $("#cmbTitle").data("kendoComboBox").value();
        var dateOfBirth = $('#dateOfBirth').val();
        var nicNo = $('#nicNo').val();
        var passportNo = $('#passportNo').val();
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
        var epfNo = $('#epfNo').val();
        var joinDate = $('#joinDate').val();

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


        grid.dataSource.insert(
            total,
            {
                LiNo: total + 1,
                empNo: empNo,
                EmpKy: EmpKy,
                empName: empName,
                nameInInitial: nameInInitial,
                title: cmbTitle,
                titleKy: cmbTitleKy,
                dateOfBirth: dateOfBirth,
                nicNo: nicNo,
                passportNo: passportNo,
                passportExpDate: passportExpDate,
                drivingLicence: drivingLicence,
                nationality: nationality,
                nationalityKy: nationalityKy,
                religion: religion,
                religionKy: religionKy,
                gender: gender,
                genderKy: genderKy,
                bloodGroup: bloodGroup,
                bloodGroupKy: bloodGroupKy,
                country: country,
                countryKy: countryKy,
                civilStatus: civilStatus,
                civilStatusKy: civilStatusKy,
                epfNo: epfNo,
                joinDate: joinDate,
                IsActive: IsActive,
                IsAprove: IsAprove,
                resignDate: resignDate
            });
        clearfunction();
    }
}

function SaveDetails(action) {
    var grid = $("#BasicDetailGrid").data("kendoGrid");
    var dataSource = grid.dataSource;

    //records on current view / page   
    var recordsOnCurrentView = dataSource.view().length;
    //total records
    var totalRecords = dataSource.total();
    //alert(totalRecords);
    var grid = $("#BasicDetailGrid").data("kendoGrid");
    var currentData = grid.dataSource.data();
    var updatedRecords = [];
    var newRecords = [];

    for (var i = 0; i < currentData.length; i++) {
        if (currentData[i].isNew()) {
            newRecords.push(currentData[i].toJSON());
        } else if (currentData[i].Dirty == "Dirty" && currentData[i].AccTrnKy > 0) {
            updatedRecords.push(currentData[i].toJSON());
        }
        else if (currentData.length == 1) {
            newRecords = currentData;
        }
    }

    $.ajax({
        url: urlSaveHdr,
        data: JSON.stringify({
            empData : kendo.stringify(newRecords)
        }),
        contentType: 'application/json; charset=utf-8',
        dataType: "Json",
        type: "POST",
        success: function (data) {
            ClearGriddetails();
            alert('Saved Succesfuly..');
        },
        error: function (e) {
            return false;
        }
    });
}

function SaveUpdate(action) {
    if (action == "save" || action == "saveandnew") {
        var empNo = document.getElementById("empNo").value;
            SaveDetails(action);
    }
}
function ClearGriddetails() {
    var grid = $("#BasicDetailGrid").data("kendoGrid");
    grid.dataSource.data([]);
}
