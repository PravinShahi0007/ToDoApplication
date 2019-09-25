//Left Div Functions
function loadLeftSide(ItmCatKy) {
    $.holdReady(true);
    $.ajax({
        type: "GET",
        dataType: 'json',
        data: { ItmCatKy: ItmCatKy },
        url: '/POS/ItmPOSPCatByItmNmShort_LookUpW',//'@Url.Action("ProjectResourceDetails_Select", "GanttChart")',
        converters:
        {
            "text json": function (data) {
                return $.parseJSON(data, true
                /*converts date strings to date objects*/
                , true
                /*converts ISO dates to local dates*/
                );
            }
        },
        success: function (data) {
            var viewModelItmPOSPCatByItmNmShort_LookUpW = kendo.observable({
                srcItmPOSPCatByItmNmShort_LookUpW: data//ProjectCostSchVarienceDly_DB_Data
            });
            kendo.bind($("#idItmPOSPCatByItmNmShort_LookUpW"), viewModelItmPOSPCatByItmNmShort_LookUpW);
            $.holdReady(false);
        }
    });
}

//Right Div Functions
function loadRightSide(isSupervisor) {
    $.holdReady(true);
    $.ajax({
        type: "GET",
        dataType: 'json',
        data: { isSupervisor: isSupervisor },
        url: '/POS/ItmMas_POSTrmV2_LookUp',//'@Url.Action("ProjectResourceDetails_Select", "GanttChart")',
        converters:
        {
            "text json": function (data) {
                return $.parseJSON(data, true
                /*converts date strings to date objects*/
                , true
                /*converts ISO dates to local dates*/
                );
            }
        },
        success: function (data) {
            var viewModelItmMas_POSTrmV2_LookUp = kendo.observable({
                srcItmMas_POSTrmV2_LookUp: data//ProjectCostSchVarienceDly_DB_Data
            });
            kendo.bind($("#idItmMas_POSTrmV2_LookUp"), viewModelItmMas_POSTrmV2_LookUp);
            $.holdReady(false);
        }
    });
}

function searchItmByItmKy(itmky) {
    $.holdReady(true);
    $.ajax({
        type: "GET",
        dataType: 'json',
        data: { itmky: itmky },
        url: '/POS/GetPOSItemRateV2_Select',//'@Url.Action("ProjectResourceDetails_Select", "GanttChart")',
        converters:
        {
            "text json": function (data) {
                return $.parseJSON(data, true
                /*converts date strings to date objects*/
                , true
                /*converts ISO dates to local dates*/
                );
            }
        },
        success: function (data) {
            afterSearchItem(data);
        }
    });
}

//Center Div Functions
function searchItmByItmTxt(itmtxt) {
    $.holdReady(true);
    $.ajax({
        type: "GET",
        dataType: 'json',
        data: { itmtxt: itmtxt },
        url: '/POS/GetPOSItemRateV2_Select',//'@Url.Action("ProjectResourceDetails_Select", "GanttChart")',
        converters:
        {
            "text json": function (data) {
                return $.parseJSON(data, true
                /*converts date strings to date objects*/
                , true
                /*converts ISO dates to local dates*/
                );
            }
        },
        success: function (data) {
            afterSearchItem(data);
        }
    });
}

function afterSearchItem(data) {
    if (data.length > 1) {
        alert("Item Has More than one price ... !");
    } else if (data.length = 1) {
        try {
            var child = $("#itmGrid").data("kendoGrid");
            child.dataSource.add({
                ItmNmShort: data[0].ItmNmShort,
                Qty: data[0].Qty,
                TrnRate: data[0].TrnRate,
                Unit: data[0].Unit,
                TrnPri: data[0].TrnPri,
                ItmCd: data[0].ItmCd,
                PartNo: data[0].PartNo,
                DisPer: data[0].DisPer,
                VATAmt: data[0].VATAmt,
                EftvDt: data[0].EftvDt

            });
        } catch (exception) {
            alert("Select Item Detail Level ... 1")
        }
    } else {
        alert("No Item .. !");
    }
}

//Global Veriable
var i = 0;
tempItmTypKy = new Array();
tempItmTypKy[i] = 1;

//Document Ready Functions
$(function () {

    //Left Div Functions
    loadLeftSide(1);
    loadRightSide(0);

    $("#tGridItmPOSPCatByItmNmShort_LookUpW").delegate("tbody>tr", "click", function () {
        var gview = $("#tGridItmPOSPCatByItmNmShort_LookUpW").data("kendoGrid");
        var selectedItem = gview.dataItem(gview.select());
        if (selectedItem.Typ != "Itm") {
            i++;
            tempItmTypKy[i] = selectedItem.ItmKy;
            loadLeftSide(selectedItem.ItmKy);
        }
        else {
            searchItmByItmKy(selectedItem.ItmKy);
        }
    });

    $("#lftbwd").click(function () {
        if (tempItmTypKy[i] != 1) {
            i--;
            loadLeftSide(tempItmTypKy[i]);
        }
        else {
            alert("Cant Go Back !");
        }
    });

    //Right Div Functions
    $("#tGridItmMas_POSTrmV2_LookUp").delegate("tbody>tr", "click", function () {
        var gview = $("#tGridItmMas_POSTrmV2_LookUp").data("kendoGrid");
        var selectedItem = gview.dataItem(gview.select());
        POSFunctions(selectedItem.OurCd, selectedItem.CdNm);
    });

    // center div functions
    $("#itmSearchByCdBtn").click(function () {
        searchItmByItmTxt($("#itmCdTxtBox").val());
    });

    var grid03DataSource = new kendo.data.DataSource({
        transport: {
            read: null
            //{
            //    data: { PrjKy: 281, PrcsDetKy: 41607 },
            //    url: '/PMResource/TaskResourceDetails_Select',
            //    dataType: "json"
            //}
        },
        batch: true,
        schema: {
            model: {
                id: "LiNo",
                fields: {
                    ItmNmShort: { editable: false, nullable: false },
                    Qty: { nullable: false, validation: { required: true } },
                    TrnRate: { nullable: false, validation: { required: true } },
                    Unit: {},
                    TrnPri: {},
                    ItmCd: {},
                    PartNo: {},
                    DisPer: {},
                    VATAmt: {},
                    EftvDt: {}
                }
            }
        }
    });

    $("#itmGrid").kendoGrid({
        dataSource: grid03DataSource,
        navigatable: true,
        height: 248,
        columns: [
            { field: "LiNo", hidden: "true" },
            { field: "ItmKy", hidden: "true" },
            { field: "ItmNmShort", title: "Item Name" },
            { field: "Qty", title: "Quantity" },
            { field: "TrnRate", title: "Rate" },
            { field: "Unit", hidden: "true" },
            { field: "TrnPri", hidden: "true" },
            { field: "ItmCd", hidden: "true" },
            { field: "PartNo", hidden: "true" },
            { field: "DisPer", hidden: "true" },
            { field: "VATAmt", hidden: "true" },
            { field: "EftvDt", hidden: "true" },
            //{ field: "Discontinued", width: 120 },
            { command: "destroy", title: "Delete" }],
        editable: true
    });
});