function LoadadresGrid() {
   // var Val = $("#MultiAdrsTyp").val();
    var AddressdataSource = new kendo.data.DataSource({
        //transport: {
        //    read: {
        //        url: UrlAddressList,
        //        data: {
        //            'AccKy': AccKy
        //        },
        //        dataType: "json"
        //    },

        //},
        batch: true,
        pageSize: 10,
        schema: {
            model: {
                id: "AdrKy",
                fields: {
                    AccAdrKy: { editable: true, nullable: true, type: "string" },
                    AccKy: { editable: true, nullable: false, type: "number" },
                    AdrID: { editable: true, nullable: false, type: "string" },
                    AdrKy: { editable: true, nullable: false, type: "number" },
                    AdrNm: { editable: false, nullable: false, type: "string" },
                    Selected: { editable: true, nullable: false, type: "boolean" },

                }
            }
        }
    });
    $("#PopUpgrid1")
        .kendoGrid({
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
                { field: "AccAdrKy", title: "Account Address Key", width: "70px", hidden: true },
                { field: "AccKy", title: "Address Key", width: "70px", hidden: true },
                { field: "AdrID", title: "Address Id", width: "70px" },
                { field: "AdrKy", title: "Address Key", width: "70px", hidden: true },
                { field: "AdrNm", title: "Address Name", width: "70px" },              
                { template: '<input type="checkbox" #= AdrSelected ? "checked=checked" : "" # class="AdrSelected"/ >', title: "Selected", width: "70px" }
            ],

            editable: true
        });

   
    $("#PopUpgrid1 .k-grid-content")
        .on("change",
            "input.AdrSelected",
            function (e) {
                var Maingrid = $("#PopUpgrid1").data("kendoGrid");
                dataItem = Maingrid.dataItem($(e.target).closest("tr"));
                dataItem.set("AdrSelected", this.checked);
                if (dataItem.AdrSelected) {
                    dataItem.set("AdrSelected", true);
                    dataItem.dirty = true;
                } else {
                    dataItem.set("AdrSelected", false);
                    dataItem.dirty = true;
                }
            });


}

function LoadAllAddress(AccKy) {
    $("#PopUpgrid1").data("kendoGrid").dataSource.data([]);
    GetAllAdrdata(AccKy,0,1500);

}

function GetAllAdrdata(accKy, startSize, size) {
    $.ajax({
        url: UrlAddressList,
        data: JSON.stringify({
            AccKy: accKy,
            StartSize: startSize,
            Size: size

        }),
        contentType: "application/json; charset=utf-8",
        dataType: "Json",
        type: "POST",
        success: function (DataSet) {
            

            try {
                var gridWidget = $('#PopUpgrid1').data("kendoGrid");
                gridWidget.dataSource.data().push.apply(gridWidget.dataSource.data(), DataSet);
                var TotalRec = DataSet[0].Lino;
               // gridWidget.dataSource.data(DataSet);
                if (TotalRec - 1 > size) {
                    startSize += size;

                    if (TotalRec < (startSize + size)) {
                        size = TotalRec - (startSize + 1);
                    }
                    if (size <= 0) {

                        return;
                    }
                    GetAllAdrdata(accKy, startSize, size);
                }
            } catch (e) {
                alert("Please try Again");
            }
        },
        error: function (e) {
            alert("Network Related Issue");
            return false;
        }
    });

}



function createFilterRow1() {
    var grid = $("#PopUpgrid1").data("kendoGrid");

    var oldRow = grid.thead.find("#grid-filter-row");
    var th;

    if (typeof oldRow === "object") {
        th = oldRow.find("th");
        oldRow.remove();
    }

    var filterRow = "<tr id='grid-filter-row'>";

    for (var i = 0; i < grid.dataSource.group().length; i++) {
        filterRow += '<th class="k-group-cell k-header">&nbsp;</th>';
    }
    for (var i = 0; i < th.length; i++) {
        filterRow += th[i].outerHTML;
    }
    for (var i = 0; i < grid.columns.length; i++) {
        if (!grid.columns[i].hidden)
            filterRow += "<td><input type='search' id='gridId-filter-column-" +
                grid.columns[i].field +
                "' style='width:98%' /></td>";
    }
    filterRow += "</tr>";
    grid.thead.append(filterRow);

    var searchField;
    for (i = 0; i < grid.columns.length; i++) {
        if (!grid.columns[i].hidden) {
            searchField = $("#gridId-filter-column-" + grid.columns[i].field);
            searchField.change({ index: i },
                function (e) {
                    var grid = $("#PopUpgrid1").data("kendoGrid");
                    updateSearchFilters(grid, grid.columns[e.data.index].field, "contains", this.value);
                });
        }
    }
}


//popupsave


function saveAddress() {
    var a = $("#MultiAdrsKy").val();
    var AccKy = $("#AccKy").val();


    var grid = $("#PopUpgrid1").data("kendoGrid");
    var currentData1 = grid.dataSource.data();

    var updatedRecords1 = [];

    for (var i = 0; i < currentData1.length; i++) {

        if (currentData1[i].dirty) {
            updatedRecords1.push(currentData1[i].toJSON());
        }
    }

    $.ajax({
        url: UrlAddressUpdate, //"@Url.Content("~/ManageAllAccount/UpdateAdress")",
        data: JSON.stringify({
            updateAdressmass: kendo.stringify(updatedRecords1),
            AccKy: AccKy

        }),
        contentType: "application/json; charset=utf-8",
        dataType: "Json",
        type: "POST",
        success: function (data) {
            alert("Successfully Saved..!");
            LoadAllAddress(AccKy);
            //Loadadres(AccKy);
        },
        error: function (e) {
            return false;
        }
    });





}

function back() {
    $("#PopUpForAddress").data("kendoWindow").close();
    // LoadGrid();
}