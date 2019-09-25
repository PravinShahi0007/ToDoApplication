$(function () {

    $("#boqDetidPageSize").kendoComboBox();
    $("#boqDetidPageNo").val(1);
    $("#boqDetidPageSize").val(100);

    $("#boqDetPagingFirst").click(function () {
        $("#boqDetidPageNo").val(1);
        boqDetPagingValidation($("#boqDetidPageNo").val());
    });

    $("#boqDetPagingLast").click(function () {
        var totalPage = 1;
        $.holdReady(true);
        $.ajax({
            type: "GET",
            dataType: 'json',
            url: urlGetBOQDetTotalRowNo,
            converters:
        {
            "text json": function (data) {
                return $.parseJSON(data, true, true);
            }
        },
            success: function (data) {
                totalPage = (data / $("#boqDetidPageSize option:selected").val());
                var maxPage = Math.ceil(totalPage);
                $("#boqDetidPageNo").val(maxPage);
                boqDetPagingValidation($("#boqDetidPageNo").val());
                $.holdReady(false);
            }
        });
    });

    $("#boqDetPagingPre").click(function () {
        var pageNoTemp = parseInt($("#boqDetidPageNo").val()) - 1;
        $("#boqDetidPageNo").val(pageNoTemp);
        boqDetPagingValidation($("#boqDetidPageNo").val());
    });

    $("#boqDetPagingNxt").click(function () {
        var pageNoTemp = parseInt($("#boqDetidPageNo").val()) + 1;
        $("#boqDetidPageNo").val(pageNoTemp);
        boqDetPagingValidation($("#boqDetidPageNo").val());
    });

    $("#boqDetidPageNo").change(function () {
        boqDetPagingValidation($("#boqDetidPageNo").val());
    });

    $("#boqDetidPageSize").change(function () {
        boqDetPagingValidation($("#boqDetidPageNo").val());
    });

    function boqDetPagingValidation(PageNo) {
        var totalPage = 1;
        $.holdReady(true);
        $.ajax({
            type: "GET",
            dataType: 'json',
            url: urlGetBOQDetTotalRowNo,
            converters:
        {
            "text json": function (data) {
                return $.parseJSON(data, true, true);
            }
        },
            success: function (data) {
                totalPage = (data / $("#boqDetidPageSize option:selected").val());
                var maxPage = Math.ceil(totalPage);
                if (PageNo < 1 || PageNo > maxPage) {
                    alert("Page Number Not Valid");
                    $("#boqDetidPageNo").val(1);
                }
                boqDetPagingButnHandling($("#boqDetidPageNo").val(), $("#boqDetidPageSize option:selected").val());
                $.holdReady(false);
            }
        });
    }

    function boqDetPagingButnHandling(pageNo, pageSize) {
        SaveBOQ(false);
        $('#tGridBOQDetails_SelectWeb').data().kendoGrid.destroy();
        $('#tGridBOQDetails_SelectWeb').empty();
        // TODO Need to add all columns in model
        var BOQDetails_SelectWebDataSource = new kendo.data.DataSource({
            transport: {
                read:
                {
                    data: { PageNo: pageNo, PageSize: pageSize },
                    url: urlBOQDetails_SelectWebWithPaging,
                    dataType: "json"
                }
            },
            batch: true,
            schema: {
                model: {
                    id: "BOQky",
                    fields: {
                        BOQDetKy: {},
                        LiNo: { editable: false },
                        ItmKy: {},
                        ItmNo: {},
                        ItmNm: {},
                        Qty: {},
                        Rate: {},
                        Total: {},
                        RateBasic: {}
                    }
                }
            }
            //, pageSize: 20
        });

        defineBOQDetails_SelectWebGrid(BOQDetails_SelectWebDataSource);
    }


});

//Copy BOQ
$(function () {

    $("#boqCpyDetidPageSize").kendoComboBox();
    $("#boqCpyDetidPageNo").val(1);
    $("#boqCpyDetidPageSize").val(100);

    $("#boqCpyDetPagingFirst").click(function () {
        $("#boqCpyDetidPageNo").val(1);
        boqCpyDetPagingValidation($("#boqCpyDetidPageNo").val());
    });

    $("#boqCpyDetPagingLast").click(function () {
        var totalPage = 1;
        $.holdReady(true);
        $.ajax({
            type: "GET",
            dataType: 'json',
            url: urlGetCpyBOQDetTotalRowNo,
            converters:
        {
            "text json": function (data) {
                return $.parseJSON(data, true, true);
            }
        },
            success: function (data) {
                totalPage = (data / $("#boqCpyDetidPageSize option:selected").val());
                var maxPage = Math.ceil(totalPage);
                $("#boqCpyDetidPageNo").val(maxPage);
                boqCpyDetPagingValidation($("#boqCpyDetidPageNo").val());
                $.holdReady(false);
            }
        });
    });

    $("#boqCpyDetPagingPre").click(function () {
        var pageNoTemp = parseInt($("#boqCpyDetidPageNo").val()) - 1;
        $("#boqCpyDetidPageNo").val(pageNoTemp);
        boqCpyDetPagingValidation($("#boqCpyDetidPageNo").val());
    });

    $("#boqCpyDetPagingNxt").click(function () {
        var pageNoTemp = parseInt($("#boqCpyDetidPageNo").val()) + 1;
        $("#boqCpyDetidPageNo").val(pageNoTemp);
        boqCpyDetPagingValidation($("#boqCpyDetidPageNo").val());
    });

    $("#boqCpyDetidPageNo").change(function () {
        boqCpyDetPagingValidation($("#boqCpyDetidPageNo").val());
    });

    $("#boqCpyDetidPageSize").change(function () {
        boqCpyDetPagingValidation($("#boqCpyDetidPageNo").val());
    });

    function boqCpyDetPagingValidation(PageNo) {
        var totalPage = 1;
        $.holdReady(true);
        $.ajax({
            type: "GET",
            dataType: 'json',
            url: urlGetCpyBOQDetTotalRowNo,
            converters:
        {
            "text json": function (data) {
                return $.parseJSON(data, true, true);
            }
        },
            success: function (data) {
                totalPage = (data / $("#boqCpyDetidPageSize option:selected").val());
                var maxPage = Math.ceil(totalPage);
                if (PageNo < 1 || PageNo > maxPage) {
                    alert("Page Number Not Valid");
                    $("#boqCpyDetidPageNo").val(1);
                }
                boqCpyDetPagingButnHandling($("#boqCpyDetidPageNo").val(), $("#boqCpyDetidPageSize option:selected").val());
                $.holdReady(false);
            }
        });
    }

    function boqCpyDetPagingButnHandling(pageNo, pageSize) {
        //SaveBOQ(false);
        $('#tGridCpyBOQDetails_SelectWeb').data().kendoGrid.destroy();
        $('#tGridCpyBOQDetails_SelectWeb').empty();
        // TODO Need to add all columns in model
        var BOQCpyDetails_SelectWebDataSource = new kendo.data.DataSource({
            transport: {
                read:
                {
                    data: { PageNo: pageNo, PageSize: pageSize },
                    url: urlCpyBOQDetails_SelectWebWithPaging,
                    dataType: "json"
                }
            },
            batch: true,
            schema: {
                model: {
                    id: "BOQky",
                    fields: {
                        BOQDetKy: {},
                        LiNo: { editable: false },
                        ItmKy: {},
                        ItmNo: {},
                        ItmNm: {},
                        Qty: {},
                        Rate: {},
                        Total: {},
                        RateBasic: {}
                    }
                }
            }
            //, pageSize: 20
        });

        defineCpyBOQDetails_SelectWebGrid(BOQCpyDetails_SelectWebDataSource);
    }


});