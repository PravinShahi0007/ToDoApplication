

var HTNPaginationCtrlData = {
    PageNo: 1,
    PageSize: 1100,
    LastPageNo: 1
};

$(function () {

    $("#idHTNPaginationCtrlPageSize").kendoComboBox();
    $("#idHTNPaginationCtrlPageNo").val(1);
    $("#idHTNPaginationCtrlPageSize").val(2500);

    $("#idHTNPaginationCtrlFirstPage").click(function () {
        $("#idHTNPaginationCtrlPageNo").val(1);
        HTNPaginationCtrlLoadWithData();
    });

    $("#idHTNPaginationCtrlLastPage").click(function () {
        $("#idHTNPaginationCtrlPageNo").val(HTNPaginationCtrlData.LastPageNo);
        HTNPaginationCtrlLoadWithData();
    });

    $("#idHTNPaginationCtrlPrePage").click(function () {
        var pageNoTemp = parseInt($("#idHTNPaginationCtrlPageNo").val())
        if (pageNoTemp <= 1)
        { pageNoTemp = 1 }
        else
        {
            pageNoTemp = parseInt($("#idHTNPaginationCtrlPageNo").val()) - 1;
            $("#idHTNPaginationCtrlPageNo").val(pageNoTemp);
            HTNPaginationCtrlLoadWithData();
        }
    });

    $("#idHTNPaginationCtrlNxtPage").click(function () {
        var pageNoTemp = parseInt($("#idHTNPaginationCtrlPageNo").val())
        //=============================== Last Page No Should get from SP, The Condition is commented temporarly===
        //if (pageNoTemp > HTNPaginationCtrlData.LastPageNo)
        //{
        //  //  pageNoTemp = 1
        //}
        //else
        //{
            var pageNoTemp = parseInt($("#idHTNPaginationCtrlPageNo").val()) + 1;
            $("#idHTNPaginationCtrlPageNo").val(pageNoTemp);
            HTNPaginationCtrlLoadWithData();
        //}
    });

    $("#idHTNPaginationCtrlPageNo").change(function () {
        HTNPaginationCtrlLoadWithData();
    });

    $("#idHTNPaginationCtrlPageSize").change(function () {
        HTNPaginationCtrlLoadWithData();
    });

    function HTNPaginationCtrlLoadWithData() {

        HTNPaginationCtrlData.PageNo = $("#idHTNPaginationCtrlPageNo").val();
        HTNPaginationCtrlData.PageSize = $("#idHTNPaginationCtrlPageSize").val();
        if (HTNPaginationCtrlData.PageSize == null || HTNPaginationCtrlData.PageSize == undefined || HTNPaginationCtrlData.PageSize == "") HTNPaginationCtrlData.PageSize = 1000;

        HTNPaginationCtrlLoadWithDataGrid();
    }
});