var FormGlblData = {
    FormObjData: null
}


$(document).ready(function () {
    var resize = function () {
        var height = $(window).height();  // Get the height of the browser window area.
        var element = $("body");          // Find the element to resize.
        element.height(height);           // Set the element's height.
    }
    resize();
    $(window).bind("resize", resize);

    GetFormObjData();

});

function GetFormObjData() {

    $.ajax({
        url: urlUsrObjPrp_SelectAllLastChildWeb,
        dataType: "json",
        type: "POST",
        data: JSON.stringify({
            PrntKy: viewBag.ObjKy
        }),
        contentType: 'application/json; charset=utf-8',
        success: function (HdrSectionFromDb) {

            FormGlblData.FormObjData = HdrSectionFromDb;
            DocReadyCus();
        }
    });
}

function DocReadyCus() {
    GetPODetails();
}

function GetPODetails() {

    $.ajax({
        url: urlPODashBoard.PODashBoard,
        dataType: "json",
        type: "POST",
        data: JSON.stringify({
        }),
        contentType: 'application/json; charset=utf-8',
        success: function (Data) {
            LoadGrid(Data);
        }
    });
}



function LoadGrid(Data) {
    var datasourceLoadGridView = new kendo.data.DataSource({
        data: Data,
        batch: true,
        pageSize: 20,
        schema: {
            model: {
                fields:
                    {
                        ordky: { editable: false, nullable: false, },
                        ordno: { editable: false, nullable: false, },
                        ACCNM: { editable: false, nullable: false, },
                        PRJNM: { editable: false, nullable: false, },
                        PRJNO: { editable: false, nullable: false, },
                        OrdDt: { editable: false, nullable: false },
                        OrdDt: { editable: false, nullable: false },
                        Entered: { editable: false, nullable: false, },
                        Checked: { editable: false, nullable: false, },
                        Approved: { editable: false, nullable: false, },
                        Printed: { editable: false, nullable: false, },

                    }
            }
        }
    });

    $("#PODashGrid").kendoGrid({
        dataSource: datasourceLoadGridView,
        height: 500,
        navigatable: true,
        filterable: true,
        pageable: true,
        sortable: true,
        reorderable: true,
        columnMenu: false,
        selectable: "row",
        resizable: true,
        dataBound: function () {

            $('td').each(function () { if ($(this).text() == 'Pending') { $(this).addClass('orange') } });
            $('td').each(function () { if ($(this).text() == 'Entered') { $(this).addClass('green') } });
            $('td').each(function () { if ($(this).text() == 'Approved') { $(this).addClass('green') } });
            $('td').each(function () { if ($(this).text() == 'Checked') { $(this).addClass('green') } });
            $('td').each(function () { if ($(this).text() == 'Printed') { $(this).addClass('green') } });

        },
        pageable: { refresh: true, pageSizes: [5, 10, 20, 50, 100] },
        columns: [
            { field: "ordky", title: "OrdKy", width: "100px", hidden: true },
            { field: "ordno", title: "PO NO", width: "100px" },
            { field: "ACCNM", title: "Supplier", width: "100px" },
            { field: "PRJNM", title: "Project Name", width: "100px" },
            { field: "PRJNO", title: "PR NO", width: "100px" },
            { field: "OrdDt", title: "Order Date", width: "100px" },
            { field: "OrdDt", title: "Delivery Date", width: "100px" },
            { field: "Entered", title: "Prepared Status", width: "100px" },
            { field: "Checked", title: "Checked Status", width: "100px" },
            { field: "Approved", title: "Approved Status", width: "100px" },
            { field: "Printed", title: "Printed Status", width: "100px" },
            {
                field: "ActionButton", title: "Action", width: "100px",
                template: kendo.template($("#command-template-Action").html()),
                editor: function (container, options) {

                }
            },


        ],

        editable: false
    });

}



function SearchByPrjNm() {
    var searchString = $("#HdrSec1_InptDocNo_Val").val();
    $.ajax({
        url: urlPODashBoard.SearchByPrj,
        dataType: "json",
        type: "POST",
        data: JSON.stringify({
            SearchString: searchString,
        }),
        contentType: 'application/json; charset=utf-8',
        success: function (Data) {
            LoadGrid(Data);
        }
    });
}

$("#HdrSec1_InptDocNo_Val").keyup(function () {
    SearchByPrjNm();
});

function LoadPOForm(ObjNm, ordky) {
    $.ajax({
        url: urlAutoCompleteGoToMenu,
        data: JSON.stringify({
            SearchQuery: $("#AutoCompleteGoToMenu").val(),
            ColNm: "ObjNm"

        }),
        contentType: "application/json; charset=utf-8",
        dataType: "Json",
        type: "POST",
        success: function (data) {
            var count = 0;
            for (var i = 0; i < data.length; i++) {
                if (data[i].ObjCaptn == ObjNm) {
                    count++;
                    if (count == 2) {
                        var url = "http://" + document.location.host + "/" + RootDir + "/" + data[i].URLController + "/" + data[i].URLAction + "?ObjCaptn=" + data[i].ObjCaptn + "&OurCd=" + data[i].OurCd + "&OurCd2=" + data[i].OurCd2 + "&ObjKy=" + data[i].ObjKy + "&IniTrnKy=" + ordky;
                        window.open(url, '_blank');
                    }

                }
            }

        },
        error: function (e) {
            return false;
        }
    });

}

$("#PODashGrid").on("click", ".k-grid-Actionselect", function () {
    GoToPo(this);
});
function GoToPo(Clicked) {
    var grid = $("#PODashGrid").data("kendoGrid");
    var selectedItem = grid.dataItem($(Clicked).closest("tr"));
    if (selectedItem.ordky > 10) {
        LoadPOForm("Purchase Order", selectedItem.ordky)
    } else {
        alert("Something went wrong")
    }

}