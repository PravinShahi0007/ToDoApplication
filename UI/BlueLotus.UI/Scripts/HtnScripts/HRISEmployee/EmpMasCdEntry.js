$(document).ready(function () {//alert(0);
    var OurCode = "@(ViewBag.ObjCaptn)";
    LoadDropDown();
    //Load the tooltip //COmmo srcipt
    Tooltip();
    //Selecting the text//COmmo srcipt
    SelectText();
    $(window).keypress(function (event) {
        if (!(event.which == 115 && event.ctrlKey) && !(event.which == 19)) return true;
        //alert("Ctrl-S pressed");
        InsertToGrid();
        event.preventDefault();
        return false;
    });
    LoadDatePicker();
    var todayDate = new Date();
    $("#fromDate").data("kendoDatePicker").value(todayDate);
    $("#toDate").data("kendoDatePicker").value(todayDate);
    $("#effectDate").data("kendoDatePicker").value(todayDate);

    LoadEmpMasCdGrid();
});


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
    $("#cmbSubject").kendoComboBox({
        dataValueField: "CdKy",
        dataTextField: "Code",
        dataSource: GetCdMas_LookupWeb('A/LSub'),
        filter: "contains",
        suggest: true,
        placeholder: "Select a Subject"
    });
    $("#cmbMembershipType").kendoComboBox({
        dataValueField: "CdKy",
        dataTextField: "Code",
        dataSource: GetCdMas_LookupWeb('MembershipType'),
        filter: "contains",
        suggest: true,
        placeholder: "Select a District"
    });
    $("#cmbCompany").kendoComboBox({
        dataValueField: "CdKy",
        dataTextField: "Code",
        dataSource: GetCdMas_LookupWeb('company'),
        filter: "contains",
        suggest: true,
        placeholder: "Select a Company"
    });
    $("#cmbDepartment").kendoComboBox({
        dataValueField: "CdKy",
        dataTextField: "Code",
        dataSource: GetCdMas_LookupWeb('department'),
        filter: "contains",
        suggest: true,
        placeholder: "Select a Department"
    });
    $("#cmbLocation").kendoComboBox({
        dataValueField: "CdKy",
        dataTextField: "Code",
        dataSource: GetCdMas_LookupWeb('Loc'),
        filter: "contains",
        suggest: true,
        placeholder: "Select a Location"
    });
    $("#cmbEmpType").kendoComboBox({
        dataValueField: "CdKy",
        dataTextField: "Code",
        dataSource: GetCdMas_LookupWeb('EmpTyp'),
        filter: "contains",
        suggest: true,
        placeholder: "Select a EmpType"
    });
    $("#cmbProgrammeType").kendoComboBox({
        dataValueField: "CdKy",
        dataTextField: "Code",
        dataSource: GetCdMas_LookupWeb('ProgrammeType'),
        filter: "contains",
        suggest: true,
        placeholder: "Select a Programme"
    });
    $("#cmbEvaluation").kendoComboBox({
        dataValueField: "CdKy",
        dataTextField: "Code",
        dataSource: GetCdMas_LookupWeb('Evaluation'),
        filter: "contains",
        suggest: true,
        placeholder: "Select a Evaluation"
    });
    //$("#cmbEmpGrade").kendoComboBox({
    //    dataValueField: "CdKy",
    //    dataTextField: "Code",
    //    dataSource: GetCdMas_LookupWeb('grade'),
    //    filter: "contains",
    //    suggest: true,
    //    placeholder: "Select a Grade"
    //});
    $("#cmbSuperviser").kendoComboBox({
        dataValueField: "CdKy",
        dataTextField: "Code",
        dataSource: GetCdMas_LookupWeb('Superviser'),
        filter: "contains",
        suggest: true,
        placeholder: "Select a Superviser"
    });
    $("#cmbGrade").kendoComboBox({
        dataValueField: "CdKy",
        dataTextField: "Code",
        dataSource: GetCdMas_LookupWeb('grade'),
        filter: "contains",
        suggest: true,
        placeholder: "Select a Grade"
    });
}

function LoadDatePicker() {
    $("#fromDate").kendoDatePicker({

        format: "dd/MM/yyyy",
        min: new Date(31, 2, 2010)
    });
    $("#toDate").kendoDatePicker({

        format: "dd/MM/yyyy",
        min: new Date(31, 2, 1990)
    });
    $("#effectDate").kendoDatePicker({

        format: "dd/MM/yyyy",
        min: new Date(31, 2, 1920)
    });
    $(".k-datepicker, .k-combobox, .k-numerictextbox,.k-input").css('width', "100%");

}




function LoadFinfEmpGrid() {
    // alert(0);
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
                    empName: { editable: true, nullable: false, type: "string" }
                }
            }
        },
    });
    //alert(1);
    $("#FindEmp").kendoGrid({
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
                title: "Emp No",
                width: "50px",
            },
            {
                field: "institute",
                title: "Emp Name",
                width: "100px",
            },
        ]
    });
}


function LoadEmpMasCdGrid() {
    // alert(0);
    var dataSource = new kendo.data.DataSource({
        batch: true,
        pageSize: 10,
        schema: {
            model: {
                id: "AccTrnKy",
                fields: //Relavent fields of the grid should be bind with following model items
                {
                    LiNo: { editable: false, nullable: false, type: "number" },
                    year: { editable: true, nullable: false, type: "string" },
                    institute: { editable: true, nullable: false, type: "string" },
                    cmbSubject: { editable: true, nullable: false, type: "string" },
                    cmbSubjectKy: { editable: true, nullable: false, type: "number" },
                    cmbGrade: { editable: true, nullable: false, type: "string" },
                    cmbGradeKy: { editable: true, nullable: false, type: "number" },
                    cmbCompany: { editable: true, nullable: false, type: "string" },
                    cmbCompanyKy: { editable: true, nullable: false, type: "number" },
                    cmbDepartment: { editable: true, nullable: false, type: "string" },
                    cmbDepartmentKy: { editable: true, nullable: false, type: "number" },
                    cmbLocation: { editable: true, nullable: false, type: "string" },
                    cmbLocationKy: { editable: true, nullable: false, type: "number" },
                    cmbEmpType: { editable: true, nullable: false, type: "string" },
                    cmbEmpTypeKy: { editable: true, nullable: false, type: "number" },
                    designation: { editable: true, nullable: false, type: "string" },
                    cmbSuperviser: { editable: true, nullable: false, type: "string" },
                    cmbSuperviserKy: { editable: true, nullable: false, type: "number" },
                    remarks: { editable: true, nullable: false, type: "string" },
                    fromDate: { editable: true, nullable: false, type: "string" },
                    toDate: { editable: true, nullable: false, type: "string" },
                    programme: { editable: true, nullable: false, type: "string" },
                    intructor: { editable: true, nullable: false, type: "string" },
                    duration: { editable: true, nullable: false, type: "string" },
                    cmbProgrammeType: { editable: true, nullable: false, type: "string" },
                    cmbProgrammeTypeKy: { editable: true, nullable: false, type: "number" },
                    cmbEvaluation: { editable: true, nullable: false, type: "string" },
                    cmbEvaluationKy: { editable: true, nullable: false, type: "number" },
                    trainingFree: { editable: true, nullable: false, type: "string" },
                    membershipNo: { editable: true, nullable: false, type: "string" },
                    organization: { editable: true, nullable: false, type: "string" },
                    cmbMembershipType: { editable: true, nullable: false, type: "string" },
                    cmbMembershipTypeKy: { editable: true, nullable: false, type: "number" },
                    reasonToLeave: { editable: true, nullable: false, type: "string" },
                    effectDate: { editable: true, nullable: false, type: "string" }
                }
            }
        },
    });
    //alert(1);
    $("#EmpMasCdGrid").kendoGrid({
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
                field: "year",
                title: "Year",
                width: "100px",
            },
            {
                field: "institute",
                title: "Institute",
                width: "50px",
            },
            {
                field: "cmbSubject",
                title: "Subject",
                width: "120px",
            },
            {
                field: "cmbSubjectKy",
                title: "Subject Ky",
                //width: "120px",
                hidden: true,
            },
            {
                field: "cmbGrade",
                title: "Grade",
                width: "100px",

            },
            {
                field: "cmbGradeKy",
                title: "Grade Ky",
                // width: "120px",
                hidden: true,
            },
            {
                field: "cmbCompany",
                title: "Company",
                width: "100px",

            },
            {
                field: "cmbCompanyKy",
                title: "Company",
                // width: "120px",
                hidden: true,
            },
            {
                field: "cmbDepartment",
                title: "Department",
                width: "100px",

            },
            {
                field: "cmbDepartmentKy",
                title: "Department",
                // width: "120px",
                hidden: true,
            },
            {
                field: "cmbLocation",
                title: "Location",
                width: "100px",

            },
            {
                field: "cmbLocationKy",
                title: "Location",
                // width: "120px",
                hidden: true,
            },
            {
                field: "cmbEmpType",
                title: "Emp Type",
                width: "100px",

            },
            {
                field: "cmbEmpTypeKy",
                title: "Grade",
                // width: "120px",
                hidden: true,
            },
            {
                field: "designation",
                title: "Designation",
                width: "100px",

            },
            {
                field: "cmbSuperviser",
                title: "Superviser",
                width: "100px",

            },
            {
                field: "cmbSuperviserKy",
                title: "Superviser",
                // width: "120px",
                hidden: true,
            },
            {
                field: "remarks",
                title: "Remarks",
                width: "100px",

            },
            {
                field: "fromDate",
                title: "From Date",
                width: "100px",

            },
            {
                field: "toDate",
                title: "To Date",
                width: "100px",

            },
            {
                field: "programme",
                title: "Programme",
                width: "100px",

            },
            {
                field: "intructor",
                title: "Intructor",
                width: "100px",

            },
            {
                field: "duration",
                title: "Duration",
                width: "100px",

            },
            {
                field: "cmbProgrammeType",
                title: "Programme Type",
                width: "100px",

            },
            {
                field: "cmbProgrammeTypeKy",
                title: "Programme Type",
                // width: "120px",
                hidden: true,
            },
            {
                field: "cmbEvaluation",
                title: "Evaluation",
                width: "100px",

            },
            {
                field: "cmbEvaluationKy",
                title: "Evaluation",
                // width: "120px",
                hidden: true,
            },
            {
                field: "trainingFree",
                title: "Training Fee",
                width: "100px",

            },
            {
                field: "membershipNo",
                title: "Membership No",
                width: "100px",

            },
            {
                field: "organization",
                title: "Organization",
                width: "100px",

            },
            {
                field: "cmbMembershipType",
                title: "Membership Type",
                width: "100px",

            },
            {
                field: "cmbMembershipTypeKy",
                title: "Membership Type",
                // width: "120px",
                hidden: true,
            },
            {
                field: "reasonToLeave",
                title: "Reason To Leave",
                width: "100px",

            },
            {
                field: "effectDate",
                title: "Effect Date",
                width: "100px",

            },
        ]
    });
}



function InsertToGrid() {
    var grid = $("#EmpMasCdGrid").data("kendoGrid");
    var dataSource1 = grid.dataSource;
    var total = dataSource1.data().length;

    var year = $('#year').val();
    var institute = $('#institute').val();
    var cmbSubject = $("#cmbSubject").data("kendoComboBox").text();
    var cmbSubjectKy = $("#cmbSubject").data("kendoComboBox").value();
    var cmbGrade = $("#cmbGrade").data("kendoComboBox").text();
    var cmbGradeKy = $("#cmbGrade").data("kendoComboBox").value();
    var cmbCompany = $("#cmbCompany").data("kendoComboBox").text();
    var cmbCompanyKy = $("#cmbCompany").data("kendoComboBox").value();
    var cmbDepartment = $("#cmbDepartment").data("kendoComboBox").text();
    var cmbDepartmentKy = $("#cmbDepartment").data("kendoComboBox").value();
    var cmbLocation = $("#cmbLocation").data("kendoComboBox").text();
    var cmbLocationKy = $("#cmbLocation").data("kendoComboBox").value();
    var cmbEmpType = $("#cmbEmpType").data("kendoComboBox").text();
    var cmbEmpTypeKy = $("#cmbEmpType").data("kendoComboBox").value();
    var cmbSuperviser = $("#cmbSuperviser").data("kendoComboBox").text();
    var cmbSuperviserKy = $("#cmbSuperviser").data("kendoComboBox").value();
    var designation = $('#designation').val();
    var remarks = $('#remarks').val();
    var fromDate = $('#fromDate').val();
    var toDate = $('#toDate').val();
    var programme = $('#programme').val();
    var intructor = $('#intructor').val();
    var duration = $('#duration').val();
    var cmbProgrammeType = $("#cmbProgrammeType").data("kendoComboBox").text();
    var cmbProgrammeTypeKy = $("#cmbProgrammeType").data("kendoComboBox").value();
    var cmbEvaluation = $("#cmbEvaluation").data("kendoComboBox").text();
    var cmbEvaluationKy = $("#cmbEvaluation").data("kendoComboBox").value();
    var trainingFree = $('#trainingFree').val();
    var membershipNo = $('#membershipNo').val();
    var organization = $('#organization').val();
    var cmbMembershipType = $("#cmbMembershipType").data("kendoComboBox").text();
    var cmbMembershipTypeKy = $("#cmbMembershipType").data("kendoComboBox").value();
    var reasonToLeave = $('#reasonToLeave').val();
    var effectDate = $('#effectDate').val();

    grid.dataSource.insert(
        total,
        {
            LiNo: total + 1,
            year: year,
            institute: institute,
            cmbSubject: cmbSubject,
            cmbSubjectKy: cmbSubjectKy,
            cmbGrade: cmbGrade,
            cmbGradeKy: cmbGradeKy,
            cmbCompanyKy: cmbCompanyKy,
            cmbCompany: cmbCompany,
            cmbDepartment: cmbDepartment,
            cmbDepartmentKy: cmbDepartmentKy,
            cmbLocation: cmbLocation,
            cmbLocationKy: cmbLocationKy,
            cmbEmpType: cmbEmpType,
            cmbEmpTypeKy: cmbEmpTypeKy,
            designation: designation,
            cmbSuperviser: cmbSuperviser,
            cmbSuperviserKy: cmbSuperviserKy,
            remarks: remarks,
            fromDate: fromDate,
            toDate: toDate,
            programme: programme,
            intructor: intructor,
            duration: duration,
            cmbProgrammeType: cmbProgrammeType,
            cmbProgrammeTypeKy: cmbProgrammeTypeKy,
            cmbEvaluation: cmbEvaluation,
            cmbEvaluationKy: cmbEvaluationKy,
            trainingFree: trainingFree,
            membershipNo: membershipNo,
            organization: organization,
            cmbMembershipType: cmbMembershipType,
            cmbMembershipTypeKy: cmbMembershipTypeKy,
            reasonToLeave: reasonToLeave,
            effectDate: effectDate
        });
}

function InsertGrid(trnKy, VouDate, action) {
    //var grid = $("#Al_AcadQualGrid").data("kendoGrid");
    //var currentData = grid.dataSource.data();
    //var updatedRecords = [];
    //var newRecords = [];



    //for (var i = 0; i < currentData.length; i++) {
    //    if (currentData[i].isNew()) {
    //        //this record is new
    //        newRecords.push(currentData[i].toJSON());
    //    } else if (currentData[i].Dirty == "Dirty" && currentData[i].AccTrnKy > 0) {
    //        updatedRecords.push(currentData[i].toJSON());
    //    }
    //}


    //$.ajax({

    //    url: urlSaveDetail,
    //    data: JSON.stringify({
    //        trnKy: trnKy,
    //        VouDate: VouDate,
    //        NewGridDetail: kendo.stringify(newRecords),
    //        UpdatedGridDetail: kendo.stringify(updatedRecords),
    //    }),
    //    contentType: 'application/json; charset=utf-8',
    //    dataType: "Json",
    //    type: "POST",
    //    success: function (data) {

    //        if (data) {

    //            if (action == 'save' || action == 'saveandnew') {
    //                alert("Save Successfully");
    //                ClearHdrDetails();
    //                ClearGriddetails();
    //                if (action == 'save') {
    //                    GetHdrDetailGrnFrmFind(trnKy);
    //                }


    //            } else if (action == 'Update') {
    //                alert("Update Successfully");
    //                ClearHdrDetails();
    //                ClearGriddetails();
    //                GetHdrDetailGrnFrmFind(trnKy);
    //            }
    //        } else {
    //            alert("Please Try Again");

    //        }

    //    },
    //    error: function (e) {
    //        return false;
    //    }
    //});
}



function SaveHedder(action) {//alert('save');
    var grid = $("#EmpMasCdGrid").data("kendoGrid");
    var dataSource = grid.dataSource;

    //records on current view / page   
    var recordsOnCurrentView = dataSource.view().length;
    //total records
    var totalRecords = dataSource.total();

    var grid = $("#EmpMasCdGrid").data("kendoGrid");
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
        url: urlSaveEmpMasCdData,
        data: JSON.stringify({
            empMasCdData: kendo.stringify(newRecords)
        }),
        contentType: 'application/json; charset=utf-8',
        dataType: "Json",
        type: "POST",
        success: function (data) {
            ClearGriddetails();
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
    var grid = $("#EmpMasCdGrid").data("kendoGrid");
    grid.dataSource.data([]);
}

function clearfunction() {
    ClearGriddetails();
}