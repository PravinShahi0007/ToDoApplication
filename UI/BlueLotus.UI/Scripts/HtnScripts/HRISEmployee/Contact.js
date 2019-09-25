$(document).ready(function () {//alert(0);
    var OurCode = "@(ViewBag.ObjCaptn)";
    LoadDropDown();
    //Load the tooltip //COmmo srcipt
    Tooltip();
    //Selecting the text//COmmo srcipt
    SelectText(); 
    LoadContactDetailGrid();
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


function clearfunction() {
    document.getElementById("Address").value = "";
    document.getElementById("CurrentAddress").value = "";
    document.getElementById("mobile").value = "";
    document.getElementById("telephone").value = "";
    document.getElementById("email").value = "";
    document.getElementById("EmrContactName").value = "";
    document.getElementById("emrConAddress").value = "";
    document.getElementById("emrConTelephone").value = "";


    document.getElementById("OfficeTelephone").value = "";
    document.getElementById("OfficeEmail").value = "";

    $("#cmbDistrict").data("kendoComboBox").value("");
    $("#cmbElectorate").data("kendoComboBox").value("");
    $("#cmbProvince").data("kendoComboBox").value("");
    $("#cmbRelationship").data("kendoComboBox").value("");
}

//Load The Drop DownList
function LoadDropDown() {
    $("#cmbDistrict").kendoComboBox({
        dataValueField: "CdKy",
        dataTextField: "CdNm",
        dataSource: GetCdMas_LookupWeb('District'),
        filter: "contains",
        suggest: true,
        placeholder: "Select a District"
    });
    $("#cmbAdrDetTyp").kendoComboBox({
        dataValueField: "CdKy",
        dataTextField: "CdNm",
        dataSource: GetCdMas_LookupWeb('AdrTyp'),
        filter: "contains",
        suggest: true,
        placeholder: "Select a Adr Det Typ"
    });
    $("#cmbElectorate").kendoComboBox({
        dataValueField: "CdKy",
        dataTextField: "CdNm",
        dataSource: GetCdMas_LookupWeb('Electorate'),
        filter: "contains",
        suggest: true,
        placeholder: "Select a Electorate"
    });
    $("#cmbProvince").kendoComboBox({
        dataValueField: "CdKy",
        dataTextField: "CdNm",
        dataSource: GetCdMas_LookupWeb('Province'),
        filter: "contains",
        suggest: true,
        placeholder: "Select a Province"
    });
    $("#cmbRelationship").kendoComboBox({
        dataValueField: "CdKy",
        dataTextField: "CdNm",
        dataSource: GetCdMas_LookupWeb('Relationship'),
        filter: "contains",
        suggest: true,
        placeholder: "Select a Relationship"
    });
}
function AfterFindEmp(EmpKy) {
    clearfunction();
    $.ajax({
        url: UrlGetEmpContactDet,
        data: {
            EmpKy : EmpKy
        },
        dataType: "Json",
        type: "POST",
        success: function (data) {
            $('#Address').val(data[0].perAdd);
            $('#HiddenAddress').val(data[0].perAdd);
            $('#CurrentAddress').val(data[0].TemAdd);
            $('#mobile').val(data[0].Mobile);
            $('#telephone').val(data[0].Telephone);
            $('#email').val(data[0].Email);
            $('#EmrContactName').val(data[0].EmrContactName);
            $('#emrConAddress').val(data[0].ConAddress);
            $('#emrConTelephone').val(data[0].ConTelephone);

            $("#cmbDistrict").data("kendoComboBox").value(data[0].DistrictKy);
            $("#cmbDistrict").data("kendoComboBox").text(data[0].District);

            $("#cmbElectorate").data("kendoComboBox").value(data[0].ElectorateKy);
            $("#cmbElectorate").data("kendoComboBox").text(data[0].Electorate);

            $("#cmbProvince").data("kendoComboBox").value(data[0].ProvinceKy);
            $("#cmbProvince").data("kendoComboBox").text(data[0].Province);

            $("#cmbRelationship").data("kendoComboBox").value(data[0].RelationshipKy);
            $("#cmbRelationship").data("kendoComboBox").text(data[0].Relationship);

            $('#OfficeTelephone').val(data[0].OfficeTelephone);
            $('#OfficeEmail').val(data[0].OfficeEmail);
        },
        error: function (e) {
            return false;
        }
    });
}

function LoadContactDetailGrid() {
    var dataSource = new kendo.data.DataSource({
        batch: true,
        pageSize: 10,
        schema: {
            model: {
                id: "AccTrnKy",
                fields: //Relavent fields of the grid should be bind with following model items
                {
                    LiNo: { editable: false, nullable: false, type: "number" },
                    PerAdd: { editable: true, nullable: false, type: "string" },
                    HiddenAddress: { editable: true, nullable: false, type: "string" },
                    TemAdd: { editable: true, nullable: false, type: "string" },
                    District: { editable: true, nullable: false, type: "string" },
                    DistrictKy: { editable: true, nullable: false, type: "number" },
                    Electorate: { editable: true, nullable: false, type: "string" },
                    ElectorateKy: { editable: true, nullable: false, type: "number" },
                    Province: { editable: true, nullable: false, type: "string" },
                    ProvinceKy: { editable: true, nullable: false, type: "number" },
                    Mobile: { editable: true, nullable: false, type: "string" },
                    Telephone: { editable: true, nullable: false, type: "string" },
                    Email: { editable: true, nullable: false, type: "string" },
                    EmrContactName: { editable: true, nullable: false, type: "string" },
                    Relationship: { editable: true, nullable: false, type: "string" },
                    RelationshipKy: { editable: true, nullable: false, type: "number" },
                    ConAddress: { editable: true, nullable: false, type: "string" },
                    ConTelephone: { editable: true, nullable: false, type: "string" },
                    AdrDetTypKy: { editable: true, nullable: false, type: "number" },
                    AdrDetTyp: { editable: true, nullable: false, type: "string" }
                }
            }
        },
    });

    $("#ContactDetailGrid").kendoGrid({
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
                field: "PerAdd",
                title: "Permanent Address",
                width: "100px",
            },
            {
                field: "HiddenAddress",
                title: "HiddenAddress",
                //width: "100px",
                hidden :true,
            },
            {
                field: "TemAdd",
                title: "Current Address",
                width: "100px",
            },
            {
                field: "District",
                title: "District",
                width: "120px",
            },
            {
                field: "DistrictKy",
                title: "District",
                //width: "120px",
                hidden: true,
            },
            {
                field: "Electorate",
                title: "Electorate",
                width: "100px",

            },
            {
                field: "ElectorateKy",
                title: "Electorate",
                // width: "120px",
                hidden:true,
            },
            {
                field: "Province",
                title: "Province",
                width: "80px",
            },
            {
                field: "ProvinceKy",
                title: "Province",
                //width: "120px",
                hidden:true,
            },
            {
                field: "Mobile",
                title: "Mobile",
                width: "100px",
            },
            {
                field: "Telephone",
                title: "Telephone",
                width: "70px",
            },
             {
                 field: "Email",
                 title: "Email",
                 width: "100px",
             },
            {
                field: "OfficeEmail",
                title: "Office Email",
                width: "100px",
            },
             {
                 field: "OfficeTelephone",
                 title: "Office Tel",
                 width: "70px",
             },
            {
                field: "EmrContactName",
                title: "Emr Con Name",
                width: "100px",
            },
            {
                field: "Relationship",
                title: "Emr Con Relationship",
                width: "100px",
            },
            {
                field: "RelationshipKy",
                title: "Emr Con Relationship",
                // width: "70px",
                hidden : true,
            },
            {
                field: "ConAddress",
                title: "Emr Con Address",
                width: "100px",
            },
            {
                field: "ConTelephone",
                title: "Emr Con Telephone",
                width: "80px",
            },
        ]
    });
}



function InsertToGrid() {
    var grid = $("#ContactDetailGrid").data("kendoGrid");
    var dataSource1 = grid.dataSource;
    var total = dataSource1.data().length;

    var perAdd = $('#Address').val();
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
    var cmbRelationship = $("#cmbRelationship").data("kendoComboBox").text();
    var cmbRelationshipKy = (!$("#cmbRelationship").data("kendoComboBox").value()) ? 1 : $("#cmbRelationship").data("kendoComboBox").value();
    var emrConAddress = $('#emrConAddress').val();
    var emrConTelephone = $('#emrConTelephone').val();
    var OfficeTelephone = $('#OfficeTelephone').val();
    var OfficeEmail = $('#OfficeEmail').val();

    grid.dataSource.insert(
        total,
        {
            LiNo: total + 1,
            PerAdd: perAdd,
            HiddenAddress: HiddenAddress,
            TemAdd: temAdd,
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
            RelationshipKy: cmbRelationshipKy,
            ConAddress: emrConAddress,
            ConTelephone: emrConTelephone,
            OfficeTelephone: OfficeTelephone,
            OfficeEmail: OfficeEmail
        });

    clearfunction();
}

function InsertGrid() {
 
}



function SaveHedder(action) {


    var EmpNo = document.getElementById("EmpNo").value;
    var EmpNm = document.getElementById("EmpNm").value;
    var EmpKy = document.getElementById("EmpKy").value;

    var grid = $("#ContactDetailGrid").data("kendoGrid");
    var dataSource = grid.dataSource;

    //records on current view / page   
    var recordsOnCurrentView = dataSource.view().length;
    //total records
    var totalRecords = dataSource.total();

    var grid = $("#ContactDetailGrid").data("kendoGrid");
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

        url: urlSaveHdr,
        data: JSON.stringify({
            empContactData: kendo.stringify(newRecords),
            empContactHdr: JSON.stringify(newRecordsHdr)
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
        var EmpKy = document.getElementById("EmpKy").value;
        if (EmpKy == '') {
            alert('Please Select Employee');
        }
        else {
            SaveHedder(action);
        }
    } else if (action == "Update") {
        alert('update');
    }
}



function ClearGriddetails() {
    var grid = $("#ContactDetailGrid").data("kendoGrid");
    grid.dataSource.data([]);

}