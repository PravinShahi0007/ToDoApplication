var FormGlblData = {
    FormObjData: null,
    ItmNm: '',
    ItmKy: 0
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
    GetDetailsByPrjKy(viewBag.PrjKy, viewBag.Date);
}

function GetDetailsByPrjKy(PrjKy,Date) {
    var Dt = $("#HdrPart_Date_From").val();

    $.ajax({
        url: urlDrillDashBoard.GetDetailsOfGrid,
        dataType: "json",
        type: "POST",
        data: JSON.stringify({
            ObjKy: viewBag.ObjKy,
            PrjKy: PrjKy,
            Dt: Date,
        }),
        contentType: 'application/json; charset=utf-8',
        success: function (Data) {
            LoadGrid(Data);
            //LoadGrid(Data);
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
				    PrjKy: { editable: false, nullable: false, },
				    PrjNm: { editable: false, nullable: false, },
				    PrjID: { editable: false, nullable: false, },
				    ExpiryDt: { editable: false, nullable: false, },
				    PrjSts: { editable: false, nullable: false, },
				    Type: { editable: false, nullable: false },
				    CurrentStatus: { editable: false, nullable: false },
				    OwnerID: { editable: false, nullable: false, },
				    OwnerName: { editable: false, nullable: false, },
				    IssuerID: { editable: false, nullable: false, },
				    IsserName: { editable: false, nullable: false, },

				}
            }
        }
    });

    $("#DetailGrid2").kendoGrid({
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
        pageable: { refresh: true, pageSizes: [5, 10, 20, 50, 100] },
        columns: [
       { field: "PrjKy", title: "PrjKy", width: "100px", hidden: true },
        { field: "PrjID", title: "Project ID", width: "100px" },
        { field: "PrjNm", title: "Project Name", width: "100px" },
        { field: "ExpiryDt", title: "Expiry Date", width: "100px" },
        { field: "Type", title: "Type", width: "100px" },
        { field: "PrjSts", title: "Project Status", width: "100px" },
        { field: "CurrentStatus", title: "Current Status", width: "100px" },
         { field: "OwnerID", title: "Owner ID", width: "100px" },
         { field: "OwnerName", title: "Owner Name", width: "100px" },
          { field: "IssuerID", title: "Issuer ID", width: "100px" },
         { field: "IsserName", title: "Issuer Name", width: "100px" },

        ],

        editable: false
    });
}