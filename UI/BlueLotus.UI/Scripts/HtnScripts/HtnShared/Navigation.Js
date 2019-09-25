
var FindGridID = "";
OurCdForNavigation = FormGlblData.FormTyp
Key = "";


function Set_Navigation(FindGridID_FromForm, Key) {
    FindGridID = FindGridID_FromForm
    var grid = $('#' + FindGridID).data().kendoGrid
    FormGlblData.selectedIndex = grid.select().index();
    //  alert("Index " + FormGlblData.selectedIndex)


    var DataSource = $('#' + FindGridID).data('kendoGrid').dataSource.data();
    $("#pager").data("kendoPager").dataSource.data([]);
    var destinationgrid = $('#pager').data('kendoPager'); // DESTINATION Pager
    for (var i = 0; i < DataSource.length; i++) {
        destinationgrid.dataSource.add(DataSource[i]);
    }
    destinationgrid.dataSource.page(FormGlblData.selectedIndex + 1);
    destinationgrid.refresh();
    if (FormGlblData.FormTyp == "TrnTyp") { //---------- Transaction Form
        $("#pager").show();
        $('#FindFormGRN').data('kendoWindow').close();
        GetHdrDetailGrnFrmFind(Key);
    }
    else if (FormGlblData.FormTyp == "OrdTyp")
    { //------------------------------------------- Order Form
        $("#pager").show();
        $('#FindFormOrder').data('kendoWindow').close();
        GetHdrDetailOrdFrmFind(Key);
    }
    else if (FormGlblData.FormTyp == "ItemTransfer") { //-- Item Transfer Form
        $("#pager").show();
        $('#FindFormGRN').data('kendoWindow').close();
        LoadInsertedHdr(Key);
    }
}
function Initialize_Pager(Key) {
    Key = Key
}

var dataSource = new kendo.data.DataSource({
    data: [],
    pageSize: 1,
    schema: {
        model: {
            id: Key,
            fields: //Relavent fields of the grid should be bind with following model items
            {
                Key: { editable: true, nullable: false, type: "number" },
            }
        }
    }
});

$("#pager").kendoPager({
    dataSource: dataSource,
    buttonCount: 1,
    pageSize: 1,
    messages: {
        previous: "Go to Previous Transaction",
        next: "Go to Next Transaction",
        last: "Go to Last Transaction",
        first: "Go to First Transaction",
        display: "{0} of {2} Transaction"
    }
});
dataSource.read();


$(".k-icon.k-i-arrow-e").parent().click(function () {
    var PagerData = $('#pager').data('kendoPager').dataSource.data();
    if (PagerData.length == 0) {
        return;
    }
    var DataSource = $('#' + FindGridID).data('kendoGrid').dataSource.data();//#FindFormGridGRN
    var getnett = FormGlblData.selectedIndex + 1;
    GetRecord(getnett, OurCdForNavigation);
    if (FormGlblData.selectedIndex < DataSource.length) {
        FormGlblData.selectedIndex = getnett;
    }
    //right Arrow
});

$(".k-icon.k-i-seek-e").parent().click(function () {
    var PagerData = $('#pager').data('kendoPager').dataSource.data();
    if (PagerData.length == 0) {
        return;
    }
    var DataSource = $('#' + FindGridID).data('kendoGrid').dataSource.data();
    var getnett = DataSource.length - 1;
    GetRecord(getnett, OurCdForNavigation);
    FormGlblData.selectedIndex = getnett;
    //Last was clicked
});

$(".k-icon.k-i-arrow-w").parent().click(function () {
    var PagerData = $('#pager').data('kendoPager').dataSource.data();
    if (PagerData.length == 0) {
        return;
    }
    var getnett = FormGlblData.selectedIndex - 1;
    GetRecord(getnett, OurCdForNavigation);
    if (getnett > 0) {
        FormGlblData.selectedIndex = getnett;
    }
    //  alert("Left was clicked.");
});

$(".k-icon.k-i-seek-w").parent().click(function () {
    var PagerData = $('#pager').data('kendoPager').dataSource.data();
    if (PagerData.length == 0) {
        return;
    }
    GetRecord(0, OurCdForNavigation);
    FormGlblData.selectedIndex = 0;
    // alert(FormGlblData.selectedIndex)
    // alert("First was clicked.");
});


function GetRecord(IndexNo, FormTyp) {
    // alert(IndexNo)
    try {
        var DataSource = $('#' + FindGridID).data('kendoGrid').dataSource.data();
        if (DataSource == []) {
            alert("Please Select a Filtering criteria");
        } else {
            if (IndexNo >= DataSource.length) {
                return;
            }
            TrnKy = DataSource[IndexNo].TrnKy;
            if (FormTyp == "TrnTyp") {
                GetHdrDetailGrnFrmFind(TrnKy);
            }
            else if (FormTyp == "OrdTyp")
            {
                GetHdrDetailOrdFrmFind(TrnKy);
            }
            else if (FormTyp == "ItemTransfer")
            {
                LoadInsertedHdr(TrnKy);
            }
            else
                GetpaymentHdrDetail(TrnKy);
            // alert(JSON.stringify(DataSource[0]));
        }
    } catch (e) {
        alert("Network error,Please Reload the page");
    }

}