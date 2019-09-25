$(function () {

    $("#tGridBOQDetails_SelectWeb").delegate("tbody>tr>td:not(.k-edit-cell)", "dblclick", function () { // tbody>tr
        $("#gridForAloc").delegate("tbody>tr>td:not(.k-edit-cell)", "dblclick", function () { // Selecting Adr tab when double click on a resource in resource allocation window
            var gview = $("#gridForAloc").data("kendoGrid");
            $("#tabstrip").data("kendoTabStrip").select(1);
        })
    });

});

function openResTab()
{
    $(function () {
                var gview = $("#gridForAloc").data("kendoGrid");
                $("#tabstrip").data("kendoTabStrip").select(0);
            })

}