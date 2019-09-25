

$('#PrcsSchDetCmpnGrid').on('click', '.isFinItmChecked', function () {
    var checked = $(this).is(':checked');
    var grid = $('#PrcsSchDetCmpnGrid').data().kendoGrid;
    var dataItem = grid.dataItem($(this).closest('tr'));
    if (dataItem != undefined) {
        dataItem.set('isFinItm', checked);
    }
});

$('#PrcsSchDetCmpnGrid').on('click', '.isResourceChecked', function () {
    var checked = $(this).is(':checked');
    var grid = $('#PrcsSchDetCmpnGrid').data().kendoGrid;
    var dataItem = grid.dataItem($(this).closest('tr'));
    if (dataItem != undefined) {
        dataItem.set('isResource', checked);
    }
});

$('#PrcsSchDetCmpnGrid').on('click', '.isSubConChecked', function () {
    var checked = $(this).is(':checked');
    var grid = $('#PrcsSchDetCmpnGrid').data().kendoGrid;
    var dataItem = grid.dataItem($(this).closest('tr'));
    if (dataItem != undefined) {
        dataItem.set('isSubCon', checked);
    }
});

$('#PrcsSchDetCmpnGrid').on('click', '.isCusSupChecked', function () {
    var checked = $(this).is(':checked');
    var grid = $('#PrcsSchDetCmpnGrid').data().kendoGrid;
    var dataItem = grid.dataItem($(this).closest('tr'));
    if (dataItem != undefined) {
        dataItem.set('isCusSup', checked);
    }
});

$('#PrcsSchDetCmpnGrid').on('click', '.isPrntChecked', function () {
    var checked = $(this).is(':checked');
    var grid = $('#PrcsSchDetCmpnGrid').data().kendoGrid;
    var dataItem = grid.dataItem($(this).closest('tr'));
    if (dataItem != undefined) {
        dataItem.set('isPrnt', checked);
    }
});

$('#PrcsSchDetCmpnGrid').on('click', '.isLeadChecked', function () {
    var checked = $(this).is(':checked');
    var grid = $('#PrcsSchDetCmpnGrid').data().kendoGrid;
    var dataItem = grid.dataItem($(this).closest('tr'));
    if (dataItem != undefined) {
        dataItem.set('isLead', checked);
    }
});