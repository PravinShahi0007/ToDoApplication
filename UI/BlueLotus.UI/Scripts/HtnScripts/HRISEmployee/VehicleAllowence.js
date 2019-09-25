$(document).ready(function () {//alert(0);
    var OurCode = "@(ViewBag.ObjCaptn)";
    LoadDropDown();
    //Load the tooltip //COmmo srcipt
    Tooltip();
    //Selecting the text//COmmo srcipt
    SelectText();
    LoadDatePicker();
    var todayDate = new Date();
    $("#fromDate").data("kendoDatePicker").value(todayDate);
    $("#toDate").data("kendoDatePicker").value(todayDate);
    //add savebutton
    //SelectHomeCurey();
    LoadBasicDetailGrid();

    //$("#resignDate").keypress(function (event) {
    //    var keycode = (event.keyCode ? event.keyCode : event.which);
    //    if (keycode == '13') {
    //        InsertToGrid();
    //    }
    //});
    //$(window).keypress(function (event) {
    //    if (!(event.which == 115 && event.ctrlKey) && !(event.which == 19)) return true;
    //    //alert("Ctrl-S pressed");
    //    InsertToGrid();
    //    event.preventDefault();
    //    return false;
    //});

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

function LoadDatePicker() {

    $("#toDate").kendoDatePicker({

        format: "dd/MM/yyyy",
        min: new Date(31, 2, 1920)
    });
    $("#fromDate").kendoDatePicker({

        format: "dd/MM/yyyy",
        min: new Date(31, 2, 1920)
    });
}

function GetCdMas_LookupWeb(ConCd) {
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
    $("#cmbAllowenceType").kendoComboBox({
        dataValueField: "CdKy",
        dataTextField: "Code",
        dataSource: GetCdMas_LookupWeb('TrnspTyp'),
        filter: "contains",
        suggest: true,
        placeholder: "Select a Allowence Type"
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
                id: "AccTrnKy",
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
                field: "title",
                title: "Title",
                width: "50px",
            },
            {
                field: "titleKy",
                title: "Title",
                //hidden: true,
                width: "50px",
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
                field: "resignDate",
                title: "Date of Resign",
                width: "100px",
            },
        ]
    });
}

function InsertToGrid() {

    var grid = $("#BasicDetailGrid").data("kendoGrid");
    var dataSource1 = grid.dataSource;
    var total = dataSource1.data().length;
    var empNo = $('#empNo').val();
    var empName = $('#empName').val();
    var nameInInitial = $('#nameInInitial').val();
    var cmbTitle = $("#cmbTitle").data("kendoComboBox").text();
    var cmbTitleKy = $("#cmbTitle").data("kendoComboBox").value();
    var dateOfBirth = $('#dateOfBirth').val();
    var nicNo = $('#nicNo').val();
    var passportNo = $('#passportNo').val();
    var passportExpDate = $('#passportExpDate').val();
    var drivingLicence = $('#drivingLicence').val();
    var nationality = $("#cmbNationality").data("kendoComboBox").text();
    var nationalityKy = $("#cmbNationality").data("kendoComboBox").value();
    var religion = $("#cmbReligion").data("kendoComboBox").text();
    var religionKy = $("#cmbReligion").data("kendoComboBox").value();
    var gender = $("#cmbGender").data("kendoComboBox").text();
    var genderKy = $("#cmbGender").data("kendoComboBox").value();
    var bloodGroup = $("#cmbBloodGrp").data("kendoComboBox").text();
    var bloodGroupKy = $("#cmbBloodGrp").data("kendoComboBox").value();
    var country = $("#cmbCountry").data("kendoComboBox").text();
    var countryKy = $("#cmbCountry").data("kendoComboBox").value();
    var civilStatus = $("#cmbCivilStatus").data("kendoComboBox").text();
    var civilStatusKy = $("#cmbCivilStatus").data("kendoComboBox").value();
    var epfNo = $('#epfNo').val();
    var joinDate = $('#joinDate').val();
    var IsActive = $('#IsActive').val();
    var resignDate = $('#resignDate').val();



    grid.dataSource.insert(
        total,
        {
            LiNo: total + 1,
            empNo: empNo,
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
            resignDate: resignDate
        });

}

function InsertGrid(trnKy) {

}



function SaveHedder(action) {
    var empNo = document.getElementById("empNo").value;
    var empName = document.getElementById("empName").value;
    var nameInInitial = document.getElementById("nameInInitial").value;
    var cmbTitleKy = $("#cmbTitle").data("kendoComboBox").value();
    var cmbTitle = $("#cmbTitle").data("kendoComboBox").text();
    var dateOfBirth = document.getElementById("dateOfBirth").value;

    var nicNo = document.getElementById("nicNo").value;
    var passportNo = document.getElementById("passportNo").value;

    var passportExpDate = document.getElementById("passportExpDate").value;
    var drivingLicence = document.getElementById("drivingLicence").value;

    var cmbNationalityKy = $("#cmbNationality").data("kendoComboBox").value();
    var cmbNationality = $("#cmbNationality").data("kendoComboBox").text();

    var cmbReligionKy = $("#cmbReligion").data("kendoComboBox").value();
    var cmbReligion = $("#cmbReligion").data("kendoComboBox").text();

    var cmbGenderKy = $("#cmbGender").data("kendoComboBox").value();
    var cmbGender = $("#cmbGender").data("kendoComboBox").text();

    var cmbBloodGrpKy = $("#cmbBloodGrp").data("kendoComboBox").value();
    var cmbBloodGrp = $("#cmbBloodGrp").data("kendoComboBox").text();
    var cmbCountryKy = $("#cmbCountry").data("kendoComboBox").value();
    var cmbCountry = $("#cmbCountry").data("kendoComboBox").text();

    var cmbCivilStatusKy = $("#cmbCivilStatus").data("kendoComboBox").value();
    var cmbCivilStatus = $("#cmbCivilStatus").data("kendoComboBox").text();

    var epfNo = document.getElementById("epfNo").value;
    var joinDate = document.getElementById("joinDate").value;
    var IsActive = document.getElementById("IsActive").value;
    var resignDate = document.getElementById("resignDate").value;


    var grid = $("#BasicDetailGrid").data("kendoGrid");
    var dataSource = grid.dataSource;

    //records on current view / page   
    var recordsOnCurrentView = dataSource.view().length;
    //total records
    var totalRecords = dataSource.total();

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
    }

    $.ajax({
        url: urlSaveHdr,
        data: JSON.stringify({
            empData: kendo.stringify(newRecords)
        }),
        contentType: 'application/json; charset=utf-8',
        dataType: "Json",
        type: "POST",
        success: function (data) {
            //var trnKy = data;
            // InsertGrid(trnKy);
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
        SaveHedder(action);
    }
}



function ClearGriddetails() {
    var grid = $("#BasicDetailGrid").data("kendoGrid");
    grid.dataSource.data([]);

}