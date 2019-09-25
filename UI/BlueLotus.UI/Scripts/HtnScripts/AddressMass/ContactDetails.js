function onContactClose() {
    $("#AdrContactInsert").data("kendoWindow").close();
}

function addContact() {
   
    //var ObjKy = GetObjKy('AdrContactNoTyp');
    var AdrKy = document.getElementById("ConDetailPopAdrKy").value;
    var AdrContactInsertAry = $("#ContactDetail").data("kendoGrid");
    var currentData = AdrContactInsertAry.dataSource.data();
    var  newRecords = [];
    var updatedRecords = [];

    for (var i = 0; i < currentData.length; i++) {
        if (currentData[i].dirty && currentData[i].AdrCdKy == 0) {
            newRecords.push(currentData[i].toJSON());
        } else if (currentData[i].dirty && currentData[i].AdrCdKy != 0)
        {
            updatedRecords.push(currentData[i].toJSON());

        }
    }

    if (newRecords.length == 0 && updatedRecords.length == 0) {
        alert("Please Select Optional Address types");
        return;
    }

    $.ajax({
        url: urlInsertOnDetail, //'@Url.Content("~/AddressEntry/InsertOptAdrTyp")',
        dataType: "json",
        type: "POST",
        data: {
            AdrKy: AdrKy,
            DetailsArray: kendo.stringify(newRecords),
            ObjKy: GetObjKy("AdrContactNoTyp"),
            DetailsUpdateArray: kendo.stringify(updatedRecords),
        },

        success: function(data) {
            if (data) {
                alert("Save Successfully");
                $("#ContactDetail").data("kendoGrid").dataSource.data([]);
                LoadContactDetailGrid(AdrKy);
            } else {
                alert("Please try again");
            }
          
        },
        error: function(e) {

        }
    });

}

function LoadContactDetailGrid(AdrKy) {
    var ObjKy = GetObjKy("AdrContactNoTyp");
    document.getElementById("ConDetailPopAdrKy").value = AdrKy;
    var dataSource = new kendo.data.DataSource({
        transport: {
            read: {
                url: urlGetOptAdres,
                data: {
                    AdrKy: AdrKy,
                    ObjKy: ObjKy
                },
                dataType: "json",
                cache: false
            },
        },
        batch: true,
        pageSize: 12,
        schema: {
            model: {
                id: "AdrTypKy",
                fields: {
                    AdrCdKy: { editable: false, nullable: false, type: "number" },
                    AdrTypKy: { editable: false, nullable: false, type: "number" },
                    AddressType: { editable: true, type: "String", nullable: true },
                    Char: { editable: true, type: "String", nullable: true },
                    Char2: { editable: true, type: "String", nullable: true },
                    IsShared: { editable: true, nullable: false, type: "boolean" },
                }
            }
        }
    });
    $("#ContactDetail")
        .kendoGrid({
            dataSource: dataSource,
            navigatable: true,
            autobind: true,
            sortable: true,
            reorderable: true,
            filterable: true,
            selectable: "row",
            columnMenu: true,
            resizable: true,
            pageable: true,
            editable: true,
            columns: [
                  { field: "AdrCdKy", title: "Address Cd Key",width: 150, hidden: true },//
                { field: "AdrTypKy", title: "AdrTypKy", hidden: "true", },
                { field: "AddressType", title: "Contact Type", width: 150 },
                { field: "Char", title: "Contact Details", width: 150 },
                { field: "Char2", title: "Extension number", width: 150 },
                {
                    template:
                        '<input type="checkbox" #= IsShared ? "checked=checked" : "" # class="IsShared" ></input>',
                    title: "IsShared",
                    width: "70px",
                    attributes: { style: "text-align:Center;" }
                },
                //  { field: "IsShared", title: "Is Shared", width: 150 },
            ]
        });
}