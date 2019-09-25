
function DynamicKendoGrid(dataParent) {
    openWinIntegrityCheck();

    jQuery('#GridIntegrityCheck').html('');
    for (k = 0; k < dataParent.length; k++) {
        if (dataParent[k][1].length > 0) { // Column level details greater than one
            appenTheTitleAndDescription(dataParent[k], k);
            CreateGrid(dataParent[k], k);
        }
    }
}

function appenTheTitleAndDescription(dataChild, m) {

    var GridTitleDiv = $('<div/>', { id: 't' + m, 'class': 'titleIntegrityCheck' });
    var GridDecsDiv = $('<div/>', { id: 'd' + m, 'class': 'descriptionIntegrityCheck' });

    //GridTitleDiv.css('margin-top', "+=50");

    GridTitleDiv.text(dataChild[0].Title);
    GridDecsDiv.text(dataChild[0].Description);

    //var divToAdd = "<div id='box' style='height:20px'></div>";
    //$("#GridIntegrityCheck").append(divToAdd);

    $('#GridIntegrityCheck').append(GridTitleDiv);
    
    $('#GridIntegrityCheck').append(GridDecsDiv);

}

function openWinIntegrityCheck() {
    $("#WinIntegrityCheck").show().kendoWindow({
        width: "1000px",
        height: "500px",
        //position: { top: 100, left: "20%" },
        modal: true,
        title: "Integrity Check Details."
    });

    $('#WinIntegrityCheck').data('kendoWindow').center().open();
    $('.k-window-content.k-content').css('background', '#D9D9D9');
    $('.ui-tabs-panel.ui-widget-content.ui-corner-bottom').css('background', '#D9D9D9');
    $('.ui-tabs-nav.ui-helper-reset.ui-helper-clearfix.ui-widget-header.ui-corner-all').css('background', '#3F51B5');
    $('#WinIntegrityCheck').data("kendoWindow").maximize();
}

function CreateGrid(dataChild,m) {
    // $("#GridIntegrityCheck")
    //for (var i = 1; i <= 10; i++) {
    //var GridDiv = $('<gridDiv/>', { id: 'r' + i, 'class': 'gridIntegrityCheck' });
    var GridDiv = $('<div/>', { id: 'r' + m, 'class': 'gridIntegrityCheck' });
    //GridDiv.css('margin-top', 20);
    $('#GridIntegrityCheck').append(GridDiv);
    //}
    DisplayGrid(dataChild, GridDiv)
}

function DisplayGrid(dataChild, GridDiv) {
    var columns = new Array();
    var dataSrcJsonString = dataChild[2]; // Get the Row level Details

    for (i = 0; i < dataChild[1].length; i++) { // Get and Bind the Column level Details
        columns.push({ field: dataChild[1][i], title: dataChild[1][i] });
    }

    var dataSrcBind = JSON.parse(dataSrcJsonString);

    GridDiv.kendoGrid({
        dataSource: {
            data: dataSrcBind,
            pageSize: 5
        },
        autobind: true,
        navigatable: true,
        //filterable: true,
        //groupable: true,
        pageable: true,
        sortable: true,
        reorderable: true,
        //columnMenu: true,
        selectable: "row",
        pageable: { refresh: true, pageSizes: [5, 10, 20, 50, 100] },
        columns: columns,
        resizable: true,
    }).data("kendoGrid");
    
}