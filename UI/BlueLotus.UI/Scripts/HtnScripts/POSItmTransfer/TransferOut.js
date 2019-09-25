var FormGlblData = {
    FormObjData: null,
    PrjTypKy: 1,
    AccessLvlKy: 1,
    ConfiLvlKy: 1,
    TrnKy: 1
}

$(document).ready(function () {
    $.ajax({
        url: urlCodes.GetCdKyByConCdAndOurCd,
        dataType: "json",
        type: "POST",
        data: JSON.stringify({
            ObjKy: viewBag.ObjKy,
            ConCd: 'Loc',
            OurCd: viewBag.Ourcd
        }),
        contentType: 'application/json; charset=utf-8',
        success: function (PrjTypKy) {
           // FormGlblData.ItmTypKy = ItmTypKy;
            GetFormObjData();
        }
    });

    $("#FirstGrid").keyup(function (e) {      
       
        var keyCode = e.keyCode || e.which;     
        if (keyCode == 13) {
            ValidateLocation();
            var grid = $("#FirstGrid").data("kendoGrid").dataSource.data()[0];
            var ItemCode = grid.ItemCode;
            if (ItemCode != '') {

                var theCell = $('#FirstGrid tbody td:eq(6)');
                setTimeout(function () {
                    var grid = $("#FirstGrid").data("kendoGrid");
                    grid.editCell(theCell);
                });
            }
        }
    });
    

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
    LoadCombo();
    DatePicker();
    var todayDate = new Date();
    $('#HdrSec1_TransferDt').data("kendoDatePicker").value(todayDate);
    LoadItmAddGrid();
    LoadGrid();

    $('#HdrSec1_TransferDt  , #HdrSec1_CmbFromLoc_Nm').change(function () {
        //LoadItmAddGrid();
        LoadGrid();
    });

    GetNewTrnNo();

    $('#FirstGrid').change(function () {

        var FrmLocKy = $("#HdrSec1_CmbFromLoc_Nm").data('kendoComboBox').value();
        //if (FrmLocKy == 0 || FrmLocKy == null) {
        //    alert("From Location Cannot be empty");
        //    return false ;
        //    //var FrmLocKy = 1;
        //}
        var ToLocKy = $("#HdrSec1_CmbToLoc_Nm").data('kendoComboBox').value();
        //if (ToLocKy == 0 || ToLocKy == null) {
        //    alert("To Location Cannot be empty");
        //    return false;
        //if (ValidateLocation() == false)
        //{
        //    return false;

        //}

        var grid = $("#FirstGrid").data("kendoGrid").dataSource.data()[0];
        var ItemCode = grid.ItemCode;
        var EAN = grid.EAN;
        var TrnQty = grid.TrnQty;
   
        if (TrnQty != "" && ItemCode != "" && EAN != "") {
            insertItem();
        }
        else {
            //if (TrnQty != null && TrnQty != undefined && TrnQty != "" )
            $.ajax({
                url: urlItemTransfer.GetItemByCodeEAN,
                data: {
                    ItemCode: ItemCode,
                    EAN: EAN
                },
                dataType: "Json",
                type: "POST",
                success: function (DBData) {
                    if (DBData.length == 0) {
                        alert("Invalid ItemCode :" + ItemCode);
                        CancelGridItem(); 
                        insertItem();
                    }
                    else {

                        var FinalData = [];
                        var grid = $("#FirstGrid").data("kendoGrid");
                        var CurrentData = grid.dataSource.data();
                        var firstItem = CurrentData[0];

                        firstItem.set("ItemName", DBData[0].ItemName);
                        firstItem.set("ItemCode", DBData[0].ItemCode);
                        firstItem.set("EAN", DBData[0].EAN);
                        firstItem.set("ItmKy", DBData[0].ItmKy);
                        firstItem.set("TrnQty", TrnQty);
                       

                        $("#FirstGrid").data("kendoGrid").dataSource.data(CurrentData);

                        //var theCell = $('#FirstGrid tbody td:eq(1)');
                        //setTimeout(function () {
                        //    var grid = $("#FirstGrid").data("kendoGrid");
                        //    // var curCell = $("#FirstGrid").find(".k-edit-cell");

                        //    grid.editCell(theCell);

                        //});

                   
                      
                        ///////
                        
                        //disable combo box when grid has item
                            if (DBData.length > 0)
                            {
                                if ((FrmLocKy != 0 && FrmLocKy != null) && (ToLocKy != 0 && ToLocKy != null))
                                {
                                    $("#HdrSec1_CmbFromLoc_Nm").data('kendoComboBox').enable(false);
                                    $("#HdrSec1_CmbToLoc_Nm").data('kendoComboBox').enable(false);
                                    $('#HdrSec1_TransferDt').data('kendoDatePicker').enable(false);
                                }
                            }
                    

                    }//insertItem();
                },
               
                error: function (e) {
                    return false;
                }

            });
            
        }
    });
}



function GetNewTrnNo() {
    $.ajax({
        url: urlItemTransfer.GetItemTrnsferNo,
        data: {
            OurCd: 'TRFOUT'
        },
        dataType: "Json",
        type: "POST",
        success: function (DBData) {
            $("#HdrSec1_InptTransferKy_Val").val(DBData + 1);
        },
        error: function (e) {
            return false;
        }
    });
}
function RefreshFun() {
    LoadItmAddGrid(); 
    LoadGrid();
}
function insertItem() {
    var grid = $("#FirstGrid").data("kendoGrid");
    grid.addRow();

    var theCell = $('#FirstGrid tbody td:eq(2)');
    setTimeout(function () {
        var grid = $("#FirstGrid").data("kendoGrid");
        grid.editCell(theCell);
    });

    //var productsGrid = $('#FirstGrid').data('kendoGrid');
    //var dataSource = productsGrid.dataSource;
    //dataSource.insert(0, { ItemName: 'Item Name' });
    ////dataSource.add({ ItemName: 'Item Name'  });
    //dataSource.sync();
    ////console.log('Done');
    //var grid = $("#FirstGrid").data("kendoGrid");//.addRow();
    //var dataSource = grid.dataSource.data()
    //dataSource.insert(0, { ItemName: 'Item Name' });
}

function CancelGridItem() {
    var grid = $("#FirstGrid").data("kendoGrid").cancelChanges();
}

function LoadItmAddGrid() {
    try {
        $('#FirstGrid').data().kendoGrid.destroy();
        $('#FirstGrid').empty();
    } catch (e) { }
    var dataSource = new kendo.data.DataSource({
        batch: true,
        pageSize: 10,
        schema: {
            model: {
                id: "ItmKy",
                fields:
                {
                    LiNo: { editable: false, nullable: false, type: "number" },
                    ItmKy: { editable: true, nullable: false, type: "number" },
                    ItemCode: { editable: true, nullable: false, type: "string" },
                    EAN: { editable: true, nullable: false, type: "string" },
                    ItemName: { editable: true, nullable: false, type: "string" },
                    UnitSize: { editable: true, nullable: false, type: "string" },
                    TrnQty: { editable: true, nullable: false, type: "string" }
                }
            }
        },
    });
    $("#FirstGrid").kendoGrid({
        dataSource: dataSource,
        height: 200,
        sortable: true,
        autobind: true,
        navigatable: true,
        scrollable: true,
        pageSize: 5,      
        pageable: true,
        editable: true,
        selectable: "row",
        resizable: true,
        reorderable: true,
        pageable: { refresh: true, pageSizes: [5, 10, 20, 50, 100] },
        columns: [
            {
                field: "LiNo",
                title: "LiNo",
                //width: "40px",\
                hidden :true,
                attributes: { class: "ob-Center" }
            },
            {
                field: "ItmKy",
                title: "ItmKy",
                //width: "80px",
                hidden: true,
            },
            {
                field: "ItemCode",
                title: "Item Code",
                width: "80px",
            },
            {
                field: "EAN",
                title: "EAN",
                width: "80px",
            },
            {
                field: "ItemName",
                title: "Item Name",
                width: "150px"
                
               
            },
            {
                field: "UnitSize",
                title: "Unit Size",
                //width: "50px",
                hidden : true
            },
            {
                field: "TrnQty",
                title: "No of Items",
                width: "50px",
            }
        ]
    });
    insertItem(); 
}

function LoadCombo() {
    $("#HdrSec1_CmbFromLoc_Nm").kendoComboBox({
        dataValueField: "CdKy",
        dataTextField: "CdNm",
        dataSource: GetCdMas_LookupWeb('loc'), //CdNm_SelectMob_Datasource('HdrSec1_CmbLoc_Nm'),
        filter: "startswith",
        suggest: true,
        placeholder: "Select a Location .."
    });
    $("#HdrSec1_CmbToLoc_Nm").kendoComboBox({
        dataValueField: "CdKy",
        dataTextField: "CdNm",
        dataSource: GetCdMas_LookupWeb('loc'), //CdNm_SelectMob_Datasource('HdrSec1_CmbLoc_Nm'),
        filter: "startswith",
        suggest: true,
        placeholder: "Select a Location .."
    });
    $("#HdrSec1_CmbLoc_Nm").parent().css('width', "200px");
}

function DatePicker() {
    $("#HdrSec1_TransferDt").width(100).kendoDatePicker({
        format: "dd/MM/yyyy",
        min: new Date(2009, 2, 31)
    });
}

function LoadGrid() {
    try {
        $('#SecondGrid').data().kendoGrid.destroy();
        $('#SecondGrid').empty();
    } catch (e) { }

    var Date = $("#HdrSec1_TransferDt").val();
    var FromLocKy = (!$("#HdrSec1_CmbFromLoc_Nm").data("kendoComboBox").value()) ? 1 : $("#HdrSec1_CmbFromLoc_Nm").data("kendoComboBox").value();
    var ToLocKy = (!$("#HdrSec1_CmbToLoc_Nm").data("kendoComboBox").value()) ? 1 : $("#HdrSec1_CmbToLoc_Nm").data("kendoComboBox").value();
    
    var dataSource = new kendo.data.DataSource({
        transport: {
            read: {
                url: urlItemTransfer.GetItemTrnsferDetails, //"@Url.Content("~/PNS_Dispatch/LoadGridViewforPNSDispatch")",
                data: {
                    Date: Date,
                    OurCd: 'TRFOUT',
                    FromLocKy: FromLocKy,
                    ToLocKy: ToLocKy
                    //FromDate: FromDate,
                    //ToDate: ToDate
                },
            dataType: "json"
            },
        },
        batch: true,
        pageSize: 10,
        schema: {
            model: {
                id: "TrnKy",
                fields:
                {
                    LiNo: { editable: false, nullable: false, type: "number" },
                    TrnKy: { editable: false, nullable: false, type: "number" },
                    TrnNo: { editable: false, nullable: false, type: "number" },
                    FromStore: { editable: false, nullable: false, type: "string" },
                    FromStoreKy: { editable: false, nullable: false, type: "number" },
                    ToStore: { editable: false, nullable: false, type: "string" },
                    ToStoreKy: { editable: false, nullable: false, type: "number" },                  
                    TrnDt: { editable: false, nullable: false, type: "string" },
                    NoofItems: { editable: false, nullable: false, type: "string" },
                    TotalValue: { editable: false, nullable: false, type: "string" },
                    Status: { editable: false, nullable: false, type: "string" }
                }
            }
        },
    });
    $("#SecondGrid").kendoGrid({
        dataSource: dataSource,
        height: 200,
        sortable: true,
        autobind: true,
        navigatable: true,
        scrollable: true,
        pageSize: 10,
        //height:'100%',
        pageable: true,
        detailInit: detailInit,
        editable: true,
        selectable: "row",
        resizable: true,
        reorderable: true,
        pageable: { refresh: true, pageSizes: [5, 10, 20, 50, 100] },
        columns: [
            {
                field: "LiNo",
                title: "LiNo",
                //width: "40px",
                hidden: true,
                attributes: { class: "ob-Center" }
            },
            {
                field: "TrnKy",
                title: "TrnKy",
                //width: "40px",
                hidden: true,
            },
            {
                field: "TrnNo",
                title: "Transfer No",
                width: "80px",
            },
             {
                 field: "FromStore",
                 title: "From Store",
                 width: "100px",
                 //hidden: true,
             },
            {
                field: "FromStoreKy",
                title: "From Store",
                width: "40px",
                hidden: true,
            },
            {
                field: "ToStore",
                title: "To Store",
                width: "100px",
            },
            {
                field: "ToStoreKy",
                title: "To Store",
                width: "40px",
                hidden: true,
            },
           
            {
                field: "TrnDt",
                title: "Date",
                width: "80px",
            },
            {
                field: "NoofItems",
                title: "No of Lines",
                width: "50px",
            },
            {
                field: "TotalValue",
                title: "Total Value",
                width: "50px",
                attributes: { style: "text-align:right;" }
            },
            {
                field: "Status",
                title: "Status",
                width: "80px",
            }
        ]
    });
}


function detailInit(e) {
    var TrnKy = e.data.TrnKy;
    var dataSourceforDrilled = new kendo.data.DataSource({
        transport: {
            read: {
                url: urlItemTransfer.GetItemTrnsferItmDetails, //"@Url.Content("~/PNS_Dispatch/LoadGridViewforPNSDispatchDrilled")",
            data: {
                TrnKy: TrnKy
            },
            dataType: "json"
        },
    },
        batch: true,
        pageSize: 20,
        schema: {
            model: {
                id: "ItmKy",
                fields: //Relavent fields of the grid should be bind with following model items
                {
                    ItmKy: { editable: false, nullable: false },
                    ItmTrnKy: { editable: false, nullable: false },
                    ItemCode: { editable: false, nullable: false},
                    ItemName: { editable: false, nullable: false },
                    TrnQty: { editable: false, nullable: false },
                    QtyReceive: { editable: false, nullable: false },
                    Rate: { editable: false, nullable: false }
                }
            }
        }
});
//================ Child grid Initialization ============================
    $("<div id='Child" + TrnKy + "' />").appendTo(e.detailCell).kendoGrid({
        dataSource: dataSourceforDrilled,
        serverPaging: true,
        serverSorting: true,
        serverFiltering: true,
        pageSize: 15,
        height: 100,
        selectable: "row",
        editable: true,
        scrollable: false,
        sortable: true,
        pageable: true,
        columns: [
            { field: "ItmKy", title: "ItmKy", width: "50px", hidden: true },
            { field: "ItmTrnKy", title: "ItmTrnKy", width: "50px", hidden: true },
            { field: "ItemCode", title: "Item Code", width: "90px" },
            { field: "ItemName", title: "Item Name", width: "90px" },
            { field: "TrnQty", title: "Quantity Send", width: "90px" },
            { field: "QtyReceive", title: "Quantity Received", width: "100px" },
            { field: "Rate", title: "Value", width: "140px",  attributes: { style: "text-align:right;" } }
        ]
    });

    //$("'#Child" + TrnKy + "'").children(".k-pager-wrap").css("margin-top", "33px");
    //$("'#Child'" + TrnKy + " > div").css("margin-top", "33px");
}

function LocDatasource() {
    var dataSource = new kendo.data.DataSource({
        transport: {
            read: {
                url: '@Url.Content("~/ItmMas/GetLocList")',
                dataType: "json"
            }
        }
    });
    return dataSource;
}

function GetCdMas_LookupWeb(ConCd) {
    var dataSource = new kendo.data.DataSource(
      {
          transport: {
              read: {
                  url: CdMas_LookupWeb,
                  data: { ConCd: ConCd },
                  dataType: "json"
              }
          }
      });
    return dataSource;
}

function ClearGriddetails() {
    var grid = $("#ItemGrid").data("kendoGrid");
    grid.dataSource.data([]);
}

function ValidateLocation()
{
    var FrmLocKy = $("#HdrSec1_CmbFromLoc_Nm").data('kendoComboBox').value();
    if (FrmLocKy == 0 || FrmLocKy == null) {
        alert("From Location Cannot be empty");
        return false;
        //var FrmLocKy = 1;
    }
    var ToLocKy = $("#HdrSec1_CmbToLoc_Nm").data('kendoComboBox').value();
    if (ToLocKy == 0 || ToLocKy == null) {
        alert("To Location Cannot be empty");
        return false;
        //  var ToLocKy = 1;
    }
    return true;
}

function Save() {


    var FrmLocKy = $("#HdrSec1_CmbFromLoc_Nm").data('kendoComboBox').value();
    if (FrmLocKy == 0 || FrmLocKy == null) {
        alert("From Location Cannot be empty");
        return false;
        //var FrmLocKy = 1;
    }
    var ToLocKy = $("#HdrSec1_CmbToLoc_Nm").data('kendoComboBox').value();
    if (ToLocKy == 0 || ToLocKy == null) {
        alert("To Location Cannot be empty");
        return false;
        //  var ToLocKy = 1;
    }


    var Date = $("#HdrSec1_TransferDt").val();
    var OurCdFrm = "TRFOUT"; //viewBag.OurCd;   //"TRFOUT";
    var OurCdTo = "TRFIN"; //viewBag.OurCd2;   //"TRFIN";
    var ConCd = "TrnTyp";

    var id = ("#FirstGrid");
    var grid = $(id).data("kendoGrid");

    var currentData = grid.dataSource.data();
    var updatedRecords = [];
    var newRecords = [];

    for (var i = 0; i < currentData.length; i++) {
        currentData[i].LiNo = i;
        
        if (currentData[i].isNew() && currentData[i].ItmKy > 0) {
            //this record is new
            newRecords.push(currentData[i].toJSON());
        } else if (currentData[i].dirty && currentData[i].ItmKy > 0) {
            updatedRecords.push(currentData[i].toJSON());
        }
    }

    //this records are deleted
    var deletedRecords = [];
    for (var i = 0; i < grid.dataSource._destroyed.length; i++) {
        deletedRecords.push(grid.dataSource._destroyed[i].toJSON());
    }
    $.ajax({
        url: urlItemTransfer.InsertTrnOutDetail,
        data: JSON.stringify({
            updatedOrders: kendo.stringify(updatedRecords),
            newOrders: kendo.stringify(newRecords),
            deletedOrders: kendo.stringify(deletedRecords),
            FrmLocKy: FrmLocKy,
            ToLocKy: ToLocKy,
            Date: Date,
            OurCdFrm: OurCdFrm,
            OurCdTo: OurCdTo,
            ConCd: ConCd,
            ObjKy: viewBag.ObjKy
        }),
        contentType: 'application/json; charset=utf-8',
        dataType: "Json",
        type: "POST",
        success: function (data) {
            alert("Successfully Saved..!");
            RefreshFun();
            GetNewTrnNo();
            //enable combobox
            $("#HdrSec1_CmbFromLoc_Nm").data("kendoComboBox").value("");
            $("#HdrSec1_CmbFromLoc_Nm").data("kendoComboBox").enable(true);
            $("#HdrSec1_CmbToLoc_Nm").data("kendoComboBox").value("");
            $("#HdrSec1_CmbToLoc_Nm").data("kendoComboBox").enable(true);
            $('#HdrSec1_TransferDt').data('kendoDatePicker').enable(true);

        },
        error: function (e) {
            return false;
        }
    });
}
