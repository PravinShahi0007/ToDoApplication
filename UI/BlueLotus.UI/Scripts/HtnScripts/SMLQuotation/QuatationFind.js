function FindRecord() {
    $("#FindFormQuote").show().kendoWindow({
        width: "1000px",
        height: "600px",
        modal: true,
        title: "Find Form"
    });
    $("#FindFormQuote").data("kendoWindow").center().open();
    LoadFindLogDatePicker();

}

function LoadFindLogDatePicker() {
    $("#HdrSec2_DatFindFromDate_Val").kendoDatePicker({
        format: "dd/MM/yyyy",
        parseFormats: ["/yyyy/MM/dd"],
        min: new Date(31, 2, 2009),
        change: function() {
            var value = this.value();

        }
    });
    $("#HdrSec2_DatFindToDate_Val")
        .kendoDatePicker({
            format: "dd/MM/yyyy",
            parseFormats: ["/yyyy/MM/dd"],
            min: new Date(31, 2, 2009),
            change: function() {
                var value = this.value();

            }
        });


    $.ajax({
        url: urlGetDateTime,
        contentType: "application/json; charset=utf-8",
        dataType: "Json",
        type: "POST",
        success: function(data) {
            $("#HdrSec2_DatFindToDate_Val").data("kendoDatePicker").value(data[1]);
        },
        error: function(e) {
            return false;
        }
    });


    $("#HdrSec2_InptQuteNumber_Val").kendoNumericTextBox({
        spinners: false,
        format: "#",
        decimals: 0
    });
}

function FindLoadGrid() {
    var dataSource = new kendo.data.DataSource({
        batch: true,
        pageSize: 10,
        schema: {
            model: {
                id: "OrdHdrKy",
                fields: //Relavent fields of the grid should be bind with following model items
                {
                    Lino: { editable: false, nullable: false, type: "number" },
                    OrdHdrKy: { editable: true, nullable: false, type: "number" },
                    OrdNo: { editable: true, nullable: false, type: "number" },
                    DocNo: { editable: true, nullable: false, type: "string" },
                    QutDate: { editable: true, nullable: false, type: "string" },
                    Amount: { editable: true, nullable: false, type: "string" }

                }
            }
        }
    });

    $("#FindFormGrid").kendoGrid({
        dataSource: dataSource,
        // autobind: true,
        navigatable: true,
        // filterable: true,
        filterable: {
            mode: "row"
        },
        pageable: true,
        sortable: true,
        reorderable: true,
        // columnMenu: true,
        selectable: "column",
        pageable: { refresh: true, pageSizes: [5, 10, 20, 50, 100] },
        columns: [
            {
                field: "Lino",
                title: "LiNo",
                width: "50px",
                filterable: {
                    cell: {
                        showOperators: false,
                        operator: "startswith"
                    }
                },
                attributes: { style: "text-align:center;" }
            },
            {
                field: "OrdHdrKy",
                title: "OrdHdrKy",
                width: "100px",
                hidden: true,
            },
            {
                field: "OrdNo",
                title: "OrdNo",
                width: "50px",
                filterable: {
                    cell: {
                        showOperators: false,
                        operator: "startswith"
                    }
                },
                attributes: { style: "text-align:center;" }

            },
            {
                field: "DocNo",
                title: "DocNo",
                width: "100px",
                filterable: {
                    cell: {
                        showOperators: false,
                        operator: "startswith"
                    }
                },
                attributes: { style: "text-align:center;" }
            },
            {
                field: "QutDate",
                title: "QutDate",
                width: "100px",
                filterable: {
                    cell: {
                        showOperators: false,
                        operator: "startswith"
                    }
                },
                attributes: { style: "text-align:center;" }
            },
            {
                field: "Amount",
                title: "Amount",
                width: "100px",
                filterable: {
                    cell: {
                        showOperators: false,
                        operator: "startswith"
                    }
                },
                attributes: { style: "text-align:center;" }

            }
        ],
        resizable: true,
        dataBinding: function() {
            record = (this.dataSource.page() - 1) * this.dataSource.pageSize();
        },
        editable: false
    });
}


function Search() {
    // var FrmDt = $("#HdrSec2_DatFindFromDate_Val").val();
    var FrmDt = kendo.toString($("#HdrSec2_DatFindFromDate_Val").data("kendoDatePicker").value(), "yyyy/MM/dd");
    if (FrmDt == undefined || FrmDt == "" || FrmDt == null) {
        var FrmDt = "1900/01/01";
    }
    var ToDt = kendo.toString($("#HdrSec2_DatFindToDate_Val").data("kendoDatePicker").value(), "yyyy/MM/dd");

    //  var ToDt = $("#HdrSec2_DatFindToDate_Val").val();
    if (ToDt == undefined || ToDt == "" || ToDt == null) {
        var ToDt = "2078/01/01"; //"1/1/2078";
    }
    var docNo = document.getElementById("HdrSec2_InpDocNo_Val").value;
    var QuoteNU = $("#HdrSec2_InptQuteNumber_Val").data("kendoNumericTextBox").value();
    $.ajax({
        url: urlFindForm,
        data: JSON.stringify({
            ObjKy: viewBag.ObjKy,
            startDate: FrmDt,
            endDate: ToDt,
            DocNo: docNo,
            OdrNo: QuoteNU,
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "Json",
        type: "POST",
        success: function(data) {
            FindLoadGrid();
            $("#FindFormGrid").data("kendoGrid").dataSource.filter(null);
            var grid = $("#FindFormGrid").data("kendoGrid");
            grid.dataSource.data([]);
            for (i = 0; i < data.length; i++) {

                $("#FindFormGrid").data("kendoGrid").dataSource.add({
                    Lino: data[i].Lino,
                    OrdHdrKy: data[i].OrdHdrKy,
                    OrdNo: data[i].OrdNo,
                    DocNo: data[i].DocNo,
                    Amount: data[i].Amount,
                    QutDate: data[i].QutDate
                });

            }
        },
        error: function(e) {
            iziToast.error({
                title: "Network Error",
                message: "Network Related Error Please Try Again",
                position: "center",
            });
        }
    });


}

function ExitFindForm() {
    try {
        $("#FindFormGrid").data("kendoGrid").dataSource.data([]);

    } catch (e) {
    }

    $("#FindFormQuote").data("kendoWindow").close();
}

$("#FindFormGrid").on("dblclick",
    "tr.k-state-selected",
    function() {
        var grid = $("#FindFormGrid").data().kendoGrid;
        var selectedItem = grid.dataItem(grid.select());
        var ordHdrKy = selectedItem.OrdHdrKy;
        FormGlblData.TrnKy = ordHdrKy
        if (ordHdrKy != "" || ordHdrKy != undefined || ordHdrKy != null) {
            LoadOrdHdrDetails(ordHdrKy);
        } else {
            alert("please Select Any Record");
        }
    });

function selected() {
    var grid = $("#FindFormGrid").data().kendoGrid;
    var selectedItem = grid.dataItem(grid.select());
    var ordHdrKy = selectedItem.OrdHdrKy;

    if (ordHdrKy != "" || ordHdrKy != undefined || ordHdrKy != null) {
        LoadOrdHdrDetails(ordHdrKy);
    } else {
        alert("please Select Any Record");
    }
}

function LoadOrdHdrDetails(ordHdrKy) {
    $.ajax({
        url: urlFindHdr,
        data: JSON.stringify({
            ObjKy: viewBag.ObjKy,
            ordHdrKy: ordHdrKy
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "Json",
        type: "POST",
        success: function (data) {
            document.getElementById("HdrSec1_InptQuotenu_Val").value = data.OrdNo;
            document.getElementById("HdrSec1_InptDocnu_Val").value = data.DocNo;
            $("#HdrSec1_InptTotal_Val").data("kendoNumericTextBox").value(data.Amount);
            $("#HdrSec1_InptExRate_Val").data("kendoNumericTextBox").value(data.ExRata);
            $("#HdrSec1_DatDate_Val").data("kendoDatePicker").value(data.QutDate);
            //$("#HdrSec1_CmbAdrMas_Cd").data("kendoComboBox").value(data.AdrKy);
            //$("#HdrSec1_CmbAdrMas_Nm").data("kendoComboBox").value(data.AdrKy);
            $("#HdrSec1_CmbVehicalInt_Cd").data("kendoComboBox").value(data.MdlKy);
            $("#HdrSec1_CmbSalesPerson_Cd").data("kendoComboBox").value(data.RepAdrKy);
            //  $("#HdrSec1_CmbVehicalInt_Cd").data("kendoComboBox").trigger("change");
            LoadGridDetails('#Exterior_Grd', 'Exterior',  ordHdrKy);
            LoadGridDetails('#Interior_Grd', 'Interior', ordHdrKy);
            LoadGridDetails('#Technology_Grd', 'Technology', ordHdrKy);
            LoadGridDetails('#Accessories_Grd', 'Other', ordHdrKy);
            ExitFindForm();
        },
        error: function (e) {
            iziToast.error({
                title: "Network Error",
                message: "Network Related Error Please Try Again",
                position: "center",
            });
        }
    });

}

function LoadGridDetails(GrdId, OurCode, ordHdrKy) {
   
    var dataSource = new kendo.data.DataSource({
        transport: {
            read: {
                url: urlFindDetails, // '@Url.Content("~/ManageAllAccount/GetAccGrid")',
                data: {
                    'ObjKy': viewBag.ObjKy,
                    'ItmCatOurCd': OurCode,
                    'OrdKy': ordHdrKy
                },
                dataType: "json"
            },

        },
        batch: true,
        sort: ({ field: "LiNo", dir: "desc" }),
        pageSize: 20,
        schema: {
            model: {
                id: "PartKy",
                fields: //Relavent fields of the grid should be bind with following model items
                {
                    PartKy: { editable: false, nullable: false, type: "number" },
                    LiNo: { editable: true, nullable: false, type: "number" },
                    PartCode: { editable: true, nullable: false, type: "string" },
                    PartName: { editable: true, nullable: false, type: "string" },
                    SubCategory: { editable: true, nullable: false, type: "string" },
                    Price: { editable: true, nullable: true, type: "number" },
                    Select: { editable: true, nullable: true, type: "boolean" },
                    //LiNo2: { editable: true, nullable: false, type: "number"},
                }
            }
        }
    });

    $(GrdId)
        .kendoGrid({
            dataSource: dataSource,
            sortable: true,
            autobind: true,
            navigatable: true,
            editable: true,
            filterable: {
                mode: "row"
            },
            reorderable: true,
            scrollable: true,
            pageSize: 10,
            //   pageable: true,
            selectable: "row",
            resizable: true,
            //  dataBound: onDataBound,
            pageable: {
                refresh: true,
                pageSizes: [5, 10, 20, 50, 100]
            },
            columns: [
                {
                    field: "PartKy",
                    title: "PartKy",
                    width: "100px",
                    hidden: "true",
                    editor: function (container, options) {
                        var model = options.model;
                    }

                },//LiNo2
                //{
                //    field: "LiNo2",
                //    title: "LiNo2",
                //    width: "40px",
                //    attributes: { class: "ob-Center" }
                //},
                {
                    field: "LiNo",
                    title: "LiNo",
                    width: "40px",
                    attributes: { class: "ob-Center" },
                    editor: function (container, options) {
                        var model = options.model;
                    }
                },
                {
                    field: "PartCode",
                    title: "Part Code",
                    width: "200px",
                    // hidden: "true",
                    editor: function (container, options) {
                        var model = options.model;
                    }

                },
                {
                    field: "PartName",
                    title: "Part Name",
                    width: "400px",
                    editor: function (container, options) {
                        var model = options.model;
                    }
                    //locked: true,
                    //lockable: false
                },
                {
                    field: "SubCategory",
                    title: "Sub Category",
                    width: "250px",
                    editor: function (container, options) {
                        var model = options.model;
                    }
                    //locked: true,
                    //lockable: false
                },
                {
                    field: "Price",
                    title: "Price",
                    width: "200px",
                    format: "{0:c2}",
                    // format: "c0",
                    // format: "c",
                    //   format: "{0:N2}",
                    decimals: 3,
                    attributes: {
                        style: "text-align: right"
                    },
                    //hidden: "true",
                    editor: function (container, options) {
                        var model = options.model;
                    }

                },
                {
                    template: '<input type="checkbox" #= Select ? \'checked="checked"\' : "" # class="chkbx" />',
                    attributes: { style: "text-align:Center;" },
                    // field: "Select",
                    title: "Select",
                    width: "150px",
                    editor: function (container, options) {
                        var model = options.model;
                    }
                }

            ]

        });

    $("#Exterior_Grd .k-grid-content").on("change", "input", function (e) {
        var grid = $("#Exterior_Grd").data("kendoGrid");
        dataItem = grid.dataItem($(e.target).closest("tr"));
        if (dataItem == null) {
            return
        }
        dataItem.set("Select", this.checked);
        if (dataItem.Select == true) {
            dataItem.set("Select", true);
            dataItem.dirty = true;
            // TotalCalculation()
        } else {
            dataItem.set("Select", false);
            dataItem.dirty = true;
            // TotalCalculation()
        }
        grid.refresh();
    });
    $("#Interior_Grd .k-grid-content").on("change", "input", function (e) {
        var grid = $("#Interior_Grd").data("kendoGrid");
        dataItem = grid.dataItem($(e.target).closest("tr"));
        if (dataItem == null) {
            return
        }
        dataItem.set("Select", this.checked);
        if (dataItem.Select == true) {
            dataItem.set("Select", true);
            dataItem.dirty = true;
            TotalCalculation()
        } else {
            dataItem.set("isrecon", false);
            dataItem.dirty = true;
            TotalCalculation()

        }
        grid.refresh();
    });
    $("#Technology_Grd .k-grid-content").on("change", "input", function (e) {
        var grid = $("#Technology_Grd").data("kendoGrid");
        dataItem = grid.dataItem($(e.target).closest("tr"));
        if (dataItem == null) {
            return
        }
        dataItem.set("Select", this.checked);
        if (dataItem.Select == true) {
            dataItem.set("Select", true);
            dataItem.dirty = true;
            TotalCalculation();
        } else {
            dataItem.set("isrecon", false);
            dataItem.dirty = true;
            TotalCalculation()
        }
        grid.refresh();
    });
    $("#Accessories_Grd .k-grid-content").on("change", "input", function (e) {
        var grid = $("#Accessories_Grd").data("kendoGrid");
        dataItem = grid.dataItem($(e.target).closest("tr"));
        if (dataItem == null) {
            return
        }
        dataItem.set("Select", this.checked);
        if (dataItem.Select == true) {
            dataItem.set("Select", true);
            dataItem.dirty = true;
            TotalCalculation()
        } else {
            dataItem.set("isrecon", false);
            dataItem.dirty = true;
            TotalCalculation()
        }
        grid.refresh();
    });
   

}

