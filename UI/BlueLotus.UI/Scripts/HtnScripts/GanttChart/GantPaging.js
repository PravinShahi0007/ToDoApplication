$(function () {

    $("#idPageSize").kendoComboBox();
    $("#idPageNo").val(1);
    $("#idPageSize").val(20);

    $("#ganttPagingFirst").click(function () {
        $("#idPageNo").val(1);
        PagingValidation($("#idPageNo").val());
    });

    $("#ganttPagingLast").click(function () {
        var totalPage = 1;
        $.holdReady(true);
        $.ajax({
            type: "GET",
            dataType: 'json',
            url: urlGetGanttChartTotalRowNo,
            converters:
        {
            "text json": function (data) {
                return $.parseJSON(data, true, true);
            }
        },
            success: function (data) {
                totalPage = (data / $("#idPageSize option:selected").val());
                var maxPage = Math.ceil(totalPage);
                $("#idPageNo").val(maxPage-1);
                PagingValidation($("#idPageNo").val());
                $.holdReady(false);
            }
        });        
    });

    $("#ganttPagingPre").click(function () {
        var pageNoTemp = parseInt($("#idPageNo").val()) - 1;
        $("#idPageNo").val(pageNoTemp);
        PagingValidation($("#idPageNo").val());
    });

    $("#ganttPagingNxt").click(function () {
        var pageNoTemp = parseInt($("#idPageNo").val()) + 1;
        $("#idPageNo").val(pageNoTemp);
        PagingValidation($("#idPageNo").val());
    });

    $("#idPageNo").change(function () {
        PagingValidation($("#idPageNo").val());
    });

    $("#idPageSize").change(function () {
        PagingValidation($("#idPageNo").val());
    });

    function PagingValidation(PageNo) {
        var totalPage = 1;
        $.holdReady(true);
        $.ajax({
            type: "GET",
            dataType: 'json',
            url: urlGetGanttChartTotalRowNo,
            converters:
        {
            "text json": function (data) {
                return $.parseJSON(data, true, true);
            }
        },
            success: function (data) {
                totalPage = (data / $("#idPageSize option:selected").val());
                var maxPage = Math.ceil(totalPage);
                if (PageNo < 1 || PageNo > maxPage) {
                    alert("Page Number Not Valid");
                    $("#idPageNo").val(1);
                }
                ganttPagingButnHandling($("#idPageNo").val(), $("#idPageSize option:selected").val());
                $.holdReady(false);
            }
        });
    }

    function ganttPagingButnHandling(pageNo, pageSize) {
        $.holdReady(true);
        $.ajax({
            type: "GET",
            dataType: 'json',
            data: { PageNo: pageNo, PageSize: pageSize },
            url: urlGetSelectProjectScheduleDetailsWithPaging,
            converters:
        {
            "text json": function (data) {
                return $.parseJSON(data, true, true);
            }
        },
            success: function (data) {
                LoadDataSource(data);
                $.holdReady(false);
            }
        });
    }

});