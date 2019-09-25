function closeNiceClassDetails() {
    $("#PopUpNiceClassDetails").data("kendoWindow").close();
}

function LoadadresGrid() {
    var PrjKy = $("#InputNicePrjKy").val();
    var AddressdataSource = new kendo.data.DataSource({
        transport: {
            read: {
                url: UrlProjectNiceClass,

                dataType: "json"
            },
            parameterMap: function (options, operation) {                
                if (operation == "read") {
                    return ({
                        'PrjKy': PrjKy,
                        'ObjKy': viewBag.ObjKy,
                        'Concode': "NiceClass",

                    });
                }
            }

        },
        batch: true,
        pageSize: 10,
        schema: {
            model: {
                id: "PrjCdKy",
                fields: {
                    PrjCdKy: { editable: true, nullable: true, type: "number" },
                    CdKy: { editable: true, nullable: false, type: "number" },
                    Code: { editable: true, nullable: false, type: "string" },
                    Name: { editable: true, nullable: false, type: "string" },
                    StatusSelected: { editable: true, nullable: false, type: "boolean" },

                }
            }
        }
    });
    $("#PopUpNiceClass").kendoGrid({
            dataSource: AddressdataSource,
            navigatable: true,
            sortable: true,
            autobind: true,
            filterable: {
                mode: "row"
            },
            resizable: true,
            pageable: true,
            height: 400,
            columns: [
                { field: "PrjCdKy", title: "ProjectCd Key", width: "70px", hidden: true },
                { field: "CdKy", title: "Cd Key", width: "70px", hidden: true },
                { field: "Code", title: "Class No", width: "70px" },
                { field: "Name", title: "Goods Or Service", width: "70px" },               
                { template: '<input type="checkbox" #= StatusSelected ? "checked=checked" : "" # class="StatusSelected"/ >', title: "Selected", width: "70px" }
            ],

            editable: true
        });


    $("#PopUpNiceClass .k-grid-content")
        .on("change",
            "input.StatusSelected",
            function (e) {
                var Maingrid = $("#PopUpNiceClass").data("kendoGrid");
                dataItem = Maingrid.dataItem($(e.target).closest("tr"));
                dataItem.set("StatusSelected", this.checked);
                if (dataItem.StatusSelected) {
                    dataItem.set("StatusSelected", true);
                    dataItem.dirty = true;
                } else {
                    dataItem.set("StatusSelected", false);
                    dataItem.dirty = true;
                }
            });


}

function NiceClassInsertUpdate() {   
    var currentData = $("#PopUpNiceClass").data("kendoGrid").dataSource.data();
    var updatNIceClass = [];
    var newNiceClass = [];
    for (var i = 0; i < currentData.length; i++) {
        if (currentData[i].isNew()) {
            newNiceClass.push(currentData[i].toJSON());
        } else if (currentData[i].dirty) {
            updatNIceClass.push(currentData[i].toJSON());
        }
    }
    var PrjKy = document.getElementById("InputNicePrjKy").value;
    //ajax for unsert update and delete
    $.ajax({
        url: UrlNiceClassInsertUpdate,
        data: JSON.stringify({
            NiceClassesInsert: kendo.stringify(updatNIceClass),
            NiceClassesUpdate: kendo.stringify(newNiceClass),
            PrjKy: PrjKy,
            ObjKy: viewBag.ObjKy
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "Json",
        type: "POST",
        success: function (data) {

            if (data == true) {               
                alert("Successfully Saved..!");
                $('#PopUpNiceClass').kendoGrid('destroy').empty();
                LoadadresGrid()
                //LoadGridViewColumn(); // update grid

            } else {
                alert("Record Not Saved");                
                $('#PopUpNiceClass').kendoGrid('destroy').empty();
                LoadadresGrid()                

            }
        },
        error: function (e) {
            return false;
        }
    });
}