
//-----------------------------------

var sSData = {};

$("#HdrSec1_InptItmNm").keypress(function (event) {
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode == '13') {
        loadHdrSec1_ItmMasGrd($("#HdrSec1_InptItmNm").val(), '', viewBag.ObjKy,
    1, 1, 1, 1, 'ItmTyp', viewBag.OurCd);
    }
});

//-----------------------------------





function loadHdrSec1_ItmMasGrd(ItemName_SS, dataDt, dataFormObjKy,
    dataItmTypKy, dataTrnTypKy, dataPrjKy, dataLocKy, dataConCd, dataOurCd) {

    var columns = new Array();
    columns[0] = [
               //{ field: "PrcsNm", width: "250px", attributes: { style: "text-align:center;" }, aggregates: ["count"], footerTemplate: "Total Count: #=count#" },// groupFooterTemplate: "Count: #=count#" },
               //{ field: "QtyO", width: "200px", attributes: { style: "text-align:left;" }, format: "{0:N2}", aggregates: ["sum", "average", "min"], footerTemplate: "<div>Total: #= sum#</div><div>Count: #= min#</div>", groupFooterTemplate: "<div>Total: #= sum#</div><div>Average: #= average#</div>" },
    ];

    columns[1] = [
               //{ field: "PrcsNm", width: "250px", attributes: { style: "text-align:center;" }, aggregates: ["count"], footerTemplate: "Total Count: #=count#" },// groupFooterTemplate: "Count: #=count#" },
               //{ field: "QtyO", width: "200px", attributes: { style: "text-align:left;" }, format: "{0:N2}", aggregates: ["sum", "average", "min"], footerTemplate: "<div>Total: #= sum#</div><div>Count: #= min#</div>", groupFooterTemplate: "<div>Total: #= sum#</div><div>Average: #= average#</div>" },
    ];

    $.holdReady(true);
    $.ajax({
        type: "GET",
        dataType: 'json',

        //ItmNm ,CKy, Dt, FormObjKy, ItmTypKy, TrnTypKy, PrjKy, LocKy, UsrKy
        data: {
            ItmNm: ItemName_SS,
            Dt: dataDt,
            FormObjKy: dataFormObjKy,
            ItmTypKy: dataItmTypKy,
            TrnTypKy: dataTrnTypKy,
            PrjKy: dataPrjKy,
            LocKy: dataLocKy,
            ConCd: dataConCd,
            OurCd: dataOurCd
        },

        url: urlItmMasSelect.ItmMas_ItmNm_SS_WebColDetMulti,
        converters:
        {
            "text json": function (data) {
                return $.parseJSON(data, true, true);
            }
        },
        success: function (data) {

            for (var t = 0; t < data.length; t++) {

                if (columns[t] == undefined)
                    columns[t] = [];

                for (var i = 0; i < columns[t].length; i++) { // Get and Bind the Column level Details
                    for (var k = data[t].length - 1; k >= 0 ; k--) {
                        if (columns[t][i]["field"] == data[t][k]) {
                            data[t].splice(k, 1); // Remove if column already defined
                        }
                    }
                }

                for (i = 0; i < data[t].length; i++) { // Get and Bind the Column level Details
                    columns[t].push({ field: data[t][i], title: data[t][i], locked: false, hidden: false, width: "200px" });
                    if (i + 1 == data[t].length) {
                        objMasLoadData(columns[t], t);
                    }
                }
            }

            $.holdReady(false);
        }
    });

    function objMasLoadData(columnsT, spRestCount) {
        // UsrObjPrp_SelectWeb(string PrntKy, string ObjTyp, string ObjNm)
        // UsrObjPrp_SelectWeb( 16640, 'FindForm', 'ItemFind'

        $.ajax({
            type: "GET",
            dataType: 'json',
            //ItmNm ,CKy, Dt, FormObjKy, ItmTypKy, TrnTypKy, PrjKy, LocKy, UsrKy
            data: {
                PrntKy: viewBag.ObjKy,
                ObjTyp: "FindForm",
                ObjNm: "ItemFind"
            },
            url: urlObjMas.UsrObjPrp_SelectWeb,
            converters:
            {
                "text json": function (data) {
                    return $.parseJSON(data, true, true);
                }
            },
            success: function (data) {
                var ObjKyChild = data[0].ObjKy;
                firstLoadData(columnsT, spRestCount, ObjKyChild);
                $.holdReady(false);
            }
        });
    }

    function firstLoadData(columnsT, spRestCount, ObjKyChild) {
        $.holdReady(true);
        $.ajax({
            type: "GET",
            dataType: 'json',
            data: { ObjKy: ObjKyChild },
            url: urlObjMas.UsrObjPrp_SelectMulti,
            converters:
        {
            "text json": function (data) {
                return $.parseJSON(data, true, true);
            }
        },
            success: function (data) {
                if (data.length > 0 && data[spRestCount] != undefined && data[spRestCount].length > 0) {// && data[spRestCount][0]["PrntKy"] == (spRestCount + 1)) {
                    for (var i = 0; i < data[spRestCount].length; i++) { // Get and Bind the Column level Details
                        for (var k = columnsT.length - 1; k >= 0 ; k--) {
                            if (columnsT[k]["field"] == data[spRestCount][i]["ObjNm"]) {
                                columnsT.splice(k, 1); // Remove if column already defined
                            }
                        }
                    }

                    for (var j = 0; j < data[spRestCount].length; j++) {
                        var alginment = "left";
                        if (data[spRestCount][j]["Alignment"].length > 0) {
                            alginment = data[spRestCount][j]["Alignment"];
                        }

                        //if (data[spRestCount][j]["Aggregates"].length > 0 && data[spRestCount][j]["FooterTemplate"].length > 0 && data[spRestCount][j]["GrpFooterTemplate"].length > 0) {
                        //    var tempAggregates = new Array();
                        //    // this will return an array with strings "1", "2", etc.
                        //    tempAggregates = data[spRestCount][j]["Aggregates"].substring(1, data[spRestCount][j]["Aggregates"].length - 1).split("\",\"");
                        //    columnsT.push({ field: data[spRestCount][j]["ObjNm"], hidden: (data[spRestCount][j]["isVisible"] == 1) ? false : true, locked: (data[spRestCount][j]["isFreeze"] == 1) ? true : false, title: data[spRestCount][j]["ObjCaptn"], width: data[spRestCount][j]["Width"], format: data[spRestCount][j]["Format"], aggregates: tempAggregates, footerTemplate: data[spRestCount][j]["FooterTemplate"], groupFooterTemplate: data[spRestCount][j]["GrpFooterTemplate"], attributes: { style: "text-align:" + alginment + ";" } });

                        //} else if (data[spRestCount][j]["Aggregates"].length > 0 && data[spRestCount][j]["FooterTemplate"].length > 0) {
                        //    var tempAggregates = new Array();
                        //    // this will return an array with strings "1", "2", etc.
                        //    tempAggregates = data[spRestCount][j]["Aggregates"].substring(1, data[spRestCount][j]["Aggregates"].length - 1).split("\",\"");
                        //    columnsT.push({ field: data[spRestCount][j]["ObjNm"], hidden: (data[spRestCount][j]["isVisible"] == 1) ? false : true, locked: (data[spRestCount][j]["isFreeze"] == 1) ? true : false, title: data[spRestCount][j]["ObjCaptn"], width: data[spRestCount][j]["Width"], format: data[spRestCount][j]["Format"], aggregates: tempAggregates, footerTemplate: data[spRestCount][j]["FooterTemplate"], attributes: { style: "text-align:" + alginment + ";" } });

                        //} else

                        {
                            columnsT.push({ field: data[spRestCount][j]["ObjNm"], hidden: (data[spRestCount][j]["isVisible"] == 1) ? false : true, locked: (data[spRestCount][j]["isFreeze"] == 1) ? true : false, title: data[spRestCount][j]["ObjCaptn"], width: data[spRestCount][j]["Width"], format: data[spRestCount][j]["Format"], attributes: { style: "text-align:" + alginment + ";" } });
                        }

                        if (j + 1 == data[spRestCount].length) {
                            loadWithDetLevelData(columnsT, data[spRestCount], spRestCount);
                        }
                    }
                }
                else {
                    loadWithDetLevelData(columnsT, [], spRestCount);
                }
                $.holdReady(false);
            }
        });
    }

    function loadWithDetLevelData(columnsT, colData, spRestCount) {
        $.holdReady(true);
        $.ajax({
            type: "GET",
            dataType: 'json',

            data: {
                ItmNm: ItemName_SS,
                Dt: dataDt,
                FormObjKy: dataFormObjKy,
                ItmTypKy: dataItmTypKy,
                TrnTypKy: dataTrnTypKy,
                PrjKy: dataPrjKy,
                LocKy: dataLocKy,
                ConCd: dataConCd,
                OurCd: dataOurCd
            },

            url: urlItmMasSelect.ItmMas_ItmNm_SS_WebMulti,
            converters:
        {
            "text json": function (data) {
                return $.parseJSON(data, true, true);
            }
        },
            success: function (data) {
                loadGrid(columnsT, colData, data[spRestCount], spRestCount)
                $.holdReady(false);
            }
        });
    }

    function loadGrid(col, colData, dataSrcJsonString, spRestCount) {

        var iDiv = document.createElement('div');
        iDiv.id = 'example' + spRestCount + '';
        iDiv.style.marginTop = "7px";

        // Create the inner div before appending to the body
        var innerDiv = document.createElement('div');
        innerDiv.id = 'gridDivHdrSec1_ItmMasGrd' + spRestCount + '';

        // The variable iDiv is still good... Just append to it.
        iDiv.appendChild(innerDiv);

        // Then append the whole thing onto the body
        //document.getElementById("HdrSec1_ItmMasGrd").appendChild(iDiv);
        $("#HdrSec1_ItmMasGrd").append(iDiv);

        var agrt = new Array();
        for (var i = 0; i < col.length; i++) { // Get aggregates
            if (col[i].aggregates != undefined) {
                for (var hh = 0; hh < col[i].aggregates.length; hh++) {
                    agrt.push({ field: col[i].field, aggregate: col[i].aggregates[hh] });
                }
            }
        }

        var gridDivHdrSec1_ItmMasGrd = new kendo.data.DataSource({
            data: JSON.parse(dataSrcJsonString)
            //,
            //pageSize: 100,
            //aggregate: agrt
        });

        $("#gridDivHdrSec1_ItmMasGrd" + spRestCount + "").kendoGrid({
            //toolbar: ["excel"],
            //excel: {
            //    fileName: "Kendo UI Grid Export.xlsx",
            //    filterable: true
            //},
            dataSource: gridDivHdrSec1_ItmMasGrd,
            sortable: true,
            pageable: false,
            //pageable: {
            //    refresh: false,
            //    pageSizes: false,
            //    buttonCount: 1
            //},
            //groupable: true,
            //filterable: "row",
            filterable: {
                mode: "row"
            },
            columnMenu: true,
            reorderable: true,
            resizable: true,
            selectable: "row",
            editable: false,
            columns: col,
            height: "590px"
        });

        $("#gridDivHdrSec1_ItmMasGrd" + spRestCount + "").kendoTooltip({
            filter: "th", //this filter selects the first column title
            position: "top",
            width: "200px",
            content: function (e) {
                for (i = 0; i < colData.length; i++) {
                    var target = e.target.closest("th"); // element for which the tooltip is shown
                    var rtrn = $(target).text();

                    if ($(target).text() == colData[i].ObjCaptn) {
                        rtrn = colData[i].ToolTip;
                    }
                    return rtrn;
                }
            }
        }).data("kendoTooltip");

        $("#gridDivHdrSec1_ItmMasGrd" + spRestCount + "").dblclick(function () {

            var grid = $("#gridDivHdrSec1_ItmMasGrd" + spRestCount + "").data().kendoGrid;
            var selectedItem = grid.dataItem(grid.select());
            var ItmKy = selectedItem.ItmKy;
            if (ItmKy != "" || ItmKy != undefined || ItmKy != null) {
                SetSelectedItemToItemCombo(ItmKy, selectedItem.ItmNm);
            } else {
                alert("Please Select Item");
            }

        });

        $("#HdrSec1_InptItmNm").focus();
    }
}