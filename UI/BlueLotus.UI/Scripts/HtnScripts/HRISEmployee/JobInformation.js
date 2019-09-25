$(document).ready(function () {
    var OurCode = "@(ViewBag.ObjCaptn)";
    LoadDropDown();
    Tooltip();
    SelectText();
    LoadDatePicker();
    var todayDate = new Date();
    $("#fromDate").data("kendoDatePicker").value(todayDate);
    $("#toDate").data("kendoDatePicker").value(todayDate);

    $("#ToWhomhdr").hide();
    LoadJobInformationGrid();
    $("#cmbAppointment").change(function () {
        var Appointment = $("#cmbAppointment").data("kendoComboBox").text();
        if (Appointment == 'Replacement') {
            $("#ToWhomhdr").show();
        }
        else {
            $("#ToWhomhdr").hide();
        }
    });
    $("#cmbCompany").change(function () {
        var CompanyKy = $("#cmbCompany").data("kendoComboBox").value();
        $.ajax({
            url: UrlGetCompanyDet,
            data: {
                CompanyKy: CompanyKy
            },
            dataType: "Json",
            type: "POST",
            success: function (data) {
                $('#CmpanyEPF').val(data[0].CompanyEPF);
            },
            error: function (e) {
                return false;
            }
        });
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
   // });

});

function clearfunction() {
    document.getElementById("CmpanyEPF").value = "";
    document.getElementById("Superviser").value = "";
    document.getElementById("ToWhom").value = "";
    document.getElementById("remarks").value = "";

    $("#cmbCompany").data("kendoComboBox").value("");
    $("#cmbDepartment").data("kendoComboBox").value("");
    $("#cmbLocation").data("kendoComboBox").value("");
    $("#cmbEmpType").data("kendoComboBox").value("");
    $("#cmbNatureOfEmployment").data("kendoComboBox").value("");
    $("#cmbEmpGrade").data("kendoComboBox").value("");
    $("#cmbDesignation").data("kendoComboBox").value("");
    $("#cmbAppointment").data("kendoComboBox").value("");
}

function AfterFindEmp(EmpKy) {
    clearfunction();
    $.ajax({
        url: UrlGetEmpJobDet,
        data: {
            EmpKy: EmpKy
        },
        dataType: "Json",
        type: "POST",
        success: function (data) {
            $("#JobInformationGrid").data("kendoGrid").dataSource.data(data);
        },
        error: function (e) {
            return false;
        }
    });
}

//calander vaucherDate
function LoadDatePicker() {
    $("#fromDate").kendoDatePicker({

        format: "dd/MM/yyyy",
        min: new Date(31, 2, 2010)
    });
    $("#toDate").kendoDatePicker({

        format: "dd/MM/yyyy",
        min: new Date(31, 2, 1990)
    });

    $(".k-datepicker, .k-combobox, .k-numerictextbox,.k-input").css('width', "100%");

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
    $("#cmbNatureOfEmployment").kendoComboBox({
        dataValueField: "CdKy",
        dataTextField: "CdNm",
        dataSource: GetCdMas_LookupWeb('EmpSts'),
        filter: "contains",
        suggest: true,
        placeholder: "Select a Nature of Emp"
    });
    $("#cmbCompany").kendoComboBox({
        dataValueField: "CKy",
        dataTextField: "CdNm",
        dataSource: GetCdMas_LookupWeb('company'),
        filter: "contains",
        suggest: true,
        placeholder: "Select a Company"
    });
    $("#cmbAppointment").kendoComboBox({
        dataValueField: "CdKy",
        dataTextField: "CdNm",
        dataSource: GetCdMas_LookupWeb('EmpApoin'),
        filter: "contains",
        suggest: true,
        placeholder: "Select a Company"
    });
    $("#cmbDesignation").kendoComboBox({
        dataValueField: "CdKy",
        dataTextField: "CdNm",
        dataSource: GetCdMas_LookupWeb('desg'),
        filter: "contains",
        suggest: true,
        placeholder: "Select a Company"
    });
    $("#cmbDepartment").kendoComboBox({
        dataValueField: "CdKy",
        dataTextField: "CdNm",
        dataSource: GetCdMas_LookupWeb('Department'),
        filter: "contains",
        suggest: true,
        placeholder: "Select a Department"
    });
    $("#cmbLocation").kendoComboBox({
        dataValueField: "CdKy",
        dataTextField: "CdNm",
        dataSource: GetCdMas_LookupWeb('EmpLoc'),
        filter: "contains",
        suggest: true,
        placeholder: "Select a Location"
    });
    $("#cmbEmpType").kendoComboBox({
        dataValueField: "CdKy",
        dataTextField: "CdNm",
        dataSource: GetCdMas_LookupWeb('EmpTyp'),
        filter: "contains",
        suggest: true,
        placeholder: "Select a EmpType"
    });
    $("#cmbEmpGrade").kendoComboBox({
        dataValueField: "CdKy",
        dataTextField: "CdNm",
        dataSource: GetCdMas_LookupWeb('EmpGrade'),
        filter: "contains",
        suggest: true,
        placeholder: "Select a Grade"
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
function LoadJobInformationGrid() {
    var dataSource = new kendo.data.DataSource({
        batch: true,
        pageSize: 10,
        schema: {
            model: {
                id: "EmpKy",
                fields: //Relavent fields of the grid should be bind with following model items
                {
                    LiNo: { editable: false, nullable: false, type: "number" },
                    Company: { editable: true, nullable: false, type: "string" },
                    CompanyEPF: { editable: true, nullable: false, type: "string" },
                    CompanyKy: { editable: true, nullable: false, type: "number" },
                    Department: { editable: true, nullable: false, type: "string" },
                    DepartmentKy: { editable: true, nullable: false, type: "number" },
                    Location: { editable: true, nullable: false, type: "string" },
                    LocationKy: { editable: true, nullable: false, type: "number" },
                    EmpType: { editable: true, nullable: false, type: "string" },
                    EmpTypeKy: { editable: true, nullable: false, type: "number" },
                    EmpGrade: { editable: true, nullable: false, type: "string" },
                    EmpGradeKy: { editable: true, nullable: false, type: "number" },
                    Designation: { editable: true, nullable: false, type: "string" },
                    DesignationKy: { editable: true, nullable: false, type: "number" },
                    Superviser: { editable: true, nullable: false, type: "string" },
                    SuperviserKy: { editable: true, nullable: false, type: "number" },
                    Appointment: { editable: true, nullable: false, type: "string" },
                    AppointmentKy: { editable: true, nullable: false, type: "number" },
                    Remarks: { editable: true, nullable: false, type: "string" },
                    FromDate: { editable: true, nullable: false, type: "string" },
                    ToDate: { editable: true, nullable: false, type: "string" }
                }
            }
        },
    });
    $("#JobInformationGrid").kendoGrid({
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
                field: "Company",
                title: "Company",
                width: "100px",
            },
            {
                field: "IsOld",
                title: "IsOld",
                hidden: true,
                 //width: "50px",
            },
            {
                field: "CompanyEPF",
                title: "Company EPF",
                width: "100px",
            },
            {
                field: "CompanyKy",
                title: "CompanyKy",
                hidden: true,
                // width: "50px",
            },
            {
                field: "Department",
                title: "Department",
                width: "100px",
            },
            {
                field: "DepartmentKy",
                title: "DepartmentKy",
                hidden: true,
            },
            {
                field: "Location",
                title: "Location",
                width: "80px",
            },
            {
                field: "LocationKy",
                title: "LocationKy",
                hidden: true,
            },
            {
                field: "EmpType",
                title: "Emp Type",
                width: "70px",
            },
            {
                field: "EmpTypeKy",
                title: "EmpTypeKy",
                hidden: true,
            },

            {
                field: "NatureOfEmployment",
                title: "Nature Of Employment",
                width: "70px",
            },
            {
                field: "NatureOfEmploymentKy",
                title: "NatureOfEmployment",
                hidden: true,
            },
            {
                field: "EmpGrade",
                title: "Emp Grade",
                width: "70px",
            },
            {
                field: "EmpGradeKy",
                title: "EmpGrade",
                hidden: true,
            },
            {
                field: "Designation",
                title: "Designation",
                width: "100px",
            },
            {
                field: "DesignationKy",
                title: "Designation",
                //width: "70px",
                hidden: true,
            },
            {
                field: "Superviser",
                title: "Superviser",
                width: "70px",
                //hidden: true,
            },
            {
                field: "SuperviserKy",
                title: "SuperviserKy",
                hidden: true,
            },
            {
                field: "Appointment",
                title: "Appointment",
                width: "100px",
            },
            {
                field: "AppointmentKy",
                title: "Appointment Ky",
                hidden: true,
            },
            {
                field: "ToWhom",
                title: "To Whom",
                hidden: true,
            },
            {
                field: "Remarks",
                title: "Remarks",
                width: "100px",
            },
            {
                field: "FromDate",
                title: "FromDate",
                width: "100px",
            },
            {
                field: "ToDate",
                title: "ToDate",
                width: "100px",
            },
        ]
    });
}

function InsertToGrid() {

    var grid = $("#JobInformationGrid").data("kendoGrid");
    var dataSource1 = grid.dataSource;
    var total = dataSource1.data().length;

    var Company = $("#cmbCompany").data("kendoComboBox").text();
    var CompanyKy = (!$("#cmbCompany").data("kendoComboBox").value()) ? 1 : $("#cmbCompany").data("kendoComboBox").value();
    var Department = $("#cmbDepartment").data("kendoComboBox").text();
    var DepartmentKy = (!$("#cmbDepartment").data("kendoComboBox").value()) ? 1 : $("#cmbDepartment").data("kendoComboBox").value();
    var Location = $("#cmbLocation").data("kendoComboBox").text();
    var LocationKy = (!$("#cmbLocation").data("kendoComboBox").value()) ? 1 : $("#cmbLocation").data("kendoComboBox").value();
    var EmpType = $("#cmbEmpType").data("kendoComboBox").text();
    var EmpTypeKy = (!$("#cmbEmpType").data("kendoComboBox").value()) ? 1 : $("#cmbEmpType").data("kendoComboBox").value();
    var EmpGrade = $("#cmbEmpGrade").data("kendoComboBox").text();
    var EmpGradeKy = (!$("#cmbEmpGrade").data("kendoComboBox").value()) ? 1 : $("#cmbEmpGrade").data("kendoComboBox").value();
    //var Superviser = $("#cmbSuperviser").data("kendoComboBox").text();
    var SuperviserKy = 0; //(!$("#cmbSuperviser").data("kendoComboBox").value()) ? 1 : $("#cmbDesignation").data("kendoComboBox").value();
    var Designation = $("#cmbDesignation").data("kendoComboBox").text();
    var DesignationKy = (!$("#cmbDesignation").data("kendoComboBox").value()) ? 1 : $("#cmbDesignation").data("kendoComboBox").value();
    var NatureOfEmployment = $("#cmbNatureOfEmployment").data("kendoComboBox").text();
    var NatureOfEmploymentKy = (!$("#cmbNatureOfEmployment").data("kendoComboBox").value()) ? 1 : $("#cmbNatureOfEmployment").data("kendoComboBox").value();

    var Appointment = $("#cmbAppointment").data("kendoComboBox").text();
    var AppointmentKy = (!$("#cmbAppointment").data("kendoComboBox").value()) ? 1 : $("#cmbAppointment").data("kendoComboBox").value();
    var Remarks = $('#remarks').val();
    var CmpanyEPF = $('#CmpanyEPF').val();
    var ToWhom = $('#ToWhom').val();
    if (ToWhom != '') {
        Appointment = Appointment + '(' + ToWhom + ')';
    }
    var Superviser = $('#Superviser').val();
    var FromDate = $('#fromDate').val();
    var ToDate = $('#toDate').val();
    var IsOld = 0;

    grid.dataSource.insert(
        total,
        {
            LiNo: total + 1,
            IsOld: IsOld,
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
            SuperviserKy: SuperviserKy,
            Designation: Designation,
            DesignationKy: DesignationKy,
            Appointment: Appointment,
            AppointmentKy: AppointmentKy,
            Remarks: Remarks,
            ToWhom: ToWhom,
            FromDate: FromDate,
            ToDate: ToDate,
            NatureOfEmploymentKy: NatureOfEmploymentKy,
            NatureOfEmployment: NatureOfEmployment
        });
    clearfunction()
    $('#ToWhom').val("");
}


function SaveDetails(action) {

    var EmpNo = document.getElementById("EmpNo").value;
    var EmpNm = document.getElementById("EmpNm").value;
    var EmpKy = document.getElementById("EmpKy").value;

    var grid = $("#JobInformationGrid").data("kendoGrid");
    var dataSource = grid.dataSource;

    //records on current view / page   
    var recordsOnCurrentView = dataSource.view().length;
    //total records
    var totalRecords = dataSource.total();

    var grid = $("#JobInformationGrid").data("kendoGrid");
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

    var newRecordsHdr = {
        EmpKy: EmpKy,
        EmpNm: EmpNm,
        EmpNo: EmpNo
    }

    $.ajax({
        url: urlInsertJobDet,
        data: JSON.stringify({
            EmpJobHdr: JSON.stringify(newRecordsHdr),
            EmpJobDet: kendo.stringify(newRecords)
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
        SaveDetails(action);
    }
}
function ClearGriddetails() {
    var grid = $("#JobInformationGrid").data("kendoGrid");
    grid.dataSource.data([]);
}