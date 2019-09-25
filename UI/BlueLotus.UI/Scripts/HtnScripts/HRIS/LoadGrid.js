function LoadfamilyDetailGrid() {
    var dataSource = new kendo.data.DataSource({
        batch: true,
        pageSize: 10,
        schema: {
            model: {
                id: "EmpKy",
                fields:
                {
                    AdrKy: { editable: false, nullable: true, type: "number" , hidden : true},
                    FamilyFirstName: { editable: true, nullable: false, type: "string" },
                    FamilyNicNo: { editable: true, nullable: false, type: "string" },
                    FamilyDateOfBirth: { editable: true, nullable: false, type: "string" },
                    FamilyRelationship: { editable: true, nullable: false, type: "string" },
                    FamilyRelationshipKy: { editable: true, nullable: false, type: "number" }
                }
            }
        },
    });
    $("#familyDetailGrid").kendoGrid({
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
                field: "AdrKy",
                title: "AdrKy",
                hidden:true
            },
            {
                field: "FamilyFirstName",
                title: "FirstName",
                width: "100px",
            },
            {
                field: "FamilyNicNo",
                title: "NIC",
                width: "50px",
            },
            {
                field: "FamilyDateOfBirth",
                title: "Date of Birth",
                width: "120px",
            },
            {
                field: "FamilyRelationship",
                title: "Relationship",
                width: "100px",
            },
            {
                field: "FamilyRelationshipKy",
                title: "Relationship",
                hidden: true,
            },
        ]
    });
}


function LoadProfQualiDetailGrid() {
    var dataSource = new kendo.data.DataSource({
        batch: true,
        pageSize: 10,
        schema: {
            model: {
                id: "EmpKy",
                fields:
                {
                    ProfQualiEmpCdKy: { editable: false, nullable: true, type: "number", hidden: true },
                    ProfQualiYear: { editable: true, nullable: false, type: "string" },
                    ProfQualiInstitute: { editable: true, nullable: false, type: "string" },
                    ProfQualiResult: { editable: true, nullable: false, type: "string" },
                    ProfQualiCertificates: { editable: true, nullable: false, type: "string" },
                    ProfQualiRemark: { editable: true, nullable: false, type: "number" }
                }
            }
        },
    });
    $("#ProfQualiDetGrid").kendoGrid({
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
                field: "AdrKy",
                title: "AdrKy",
                hidden: true
            },
            {
                field: "FamilyFirstName",
                title: "FirstName",
                width: "100px",
            },
            {
                field: "FamilyNicNo",
                title: "NIC",
                width: "50px",
            },
            {
                field: "FamilyDateOfBirth",
                title: "Date of Birth",
                width: "120px",
            },
            {
                field: "FamilyRelationship",
                title: "Relationship",
                width: "100px",
            },
            {
                field: "FamilyRelationshipKy",
                title: "Relationship",
                hidden: true,
            },
        ]
    });
}