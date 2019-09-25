var ExportExcel = ExportExcel || {};

ExportExcel.Index = function () {
    var _grid = null;

    var init = function () {
        alert("lol");
        
        _grid =
                $("#grid").kendoGrid({
                    dataSource: {
                        pageSize: 100,
                        transport: {
                            read: {
                                url: "~/Home/PopulateGridDataByPieChart",
                                dataType: "json",
                                data: {
                                    'AsAtDt': '2012/12/12',
                                    'AdrKy': 1
                                }
                            }
                        }
                    },
                    filterable: true,
                    groupable: true,
                    pageable: true,
                    columns: [
                               // { field: "AccCd", title: "Account Code" },
                                { field: "ClientID", title: "Client Name" },
                                { field: "ContractID", title: "Contract ID" },
                                { field: "Description", title: "Description" },
                                { field: "Cost", title: "Cost" },
                                { field: "Income", title: "Income" },
                                { field: "GP", title: "GP" }
                    ]
                    ,
                    excel: {
                        cssClass: "k-grid-export-image",
                        title: "people",
                        createUrl: "~/Home/ExportToExcel",
                        downloadUrl: "~/Home/GetExcelFile"
                    }
                });
    };

    return {
        init: init
    };
}();