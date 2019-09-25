function ComSaveFunction() {

    var id = ("#PrcsSchDetCmpnGrid");
    var grid = $(id).data("kendoGrid");
    var currentData = grid.dataSource.data();
    var updatedRecords = [];
    var newRecords = [];

    for (var i = 0; i < currentData.length; i++) {
        if (currentData[i].isNew() && currentData[i].ItmKy > 0) {

            newRecords.push(currentData[i].toJSON());
        } else if (currentData[i].dirty && currentData[i].ItmKy > 0) {
            updatedRecords.push(currentData[i].toJSON());
        }
    }

    var deletedRecords = [];
    for (var i = 0; i < grid.dataSource._destroyed.length; i++) {
        deletedRecords.push(grid.dataSource._destroyed[i].toJSON());
    }

    $.ajax({
        url: urlCmpnBld.SaveItmCmpn,
        data: JSON.stringify({
            ObjKy: viewBag.ObjKy,
            updatedOrders: kendo.stringify(updatedRecords),
            deletedOrders: kendo.stringify(deletedRecords),
            newOrders: kendo.stringify(newRecords),
        }),
        contentType: 'application/json; charset=utf-8',
        dataType: "Json",
        type: "POST",
        success: function (data) {
            alert("Saved");
            ClearFunction();
        },
        error: function (e) {
            return false;
        }
    });
}
