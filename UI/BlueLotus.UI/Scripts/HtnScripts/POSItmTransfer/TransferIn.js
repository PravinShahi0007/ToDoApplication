var FormGlblData = {
    FormObjData: null,
    PrjTypKy: 1,
    AccessLvlKy: 1,
    ConfiLvlKy: 1,
    TrnKy: 1,
    varSecondGrid: null
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
            GetFormObjData();
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
            DocReadyCus();
        }
    });
}
function DatePicker() {
    $("#HdrSec1_TransferFromDt").width(200).kendoDatePicker({
        format: "dd/MM/yyyy",
        min: new Date(2009, 2, 31)
    });
    $("#HdrSec1_TransferToDt").width(200).kendoDatePicker({
        format: "dd/MM/yyyy",
        min: new Date(2009, 2, 31)
    });
}
function DocReadyCus() {
    LoadCombo();
    DatePicker();
    var todayDate = new Date();
    $('#HdrSec1_TransferFromDt').data("kendoDatePicker").value(todayDate);//'21/08/2016');
    $('#HdrSec1_TransferToDt').data("kendoDatePicker").value(todayDate);
    LoadGrid();

    $('#HdrSec1_TransferFromDt,#HdrSec1_CmbToLoc_Nm').change(function () {
        LoadGrid();
    });

    //$('#HdrSec1_CmbToLoc_Nm').change(function () {
    //    LoadGrid();
    //});

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



function LoadCombo() {
    //$("#HdrSec1_CmbFromLoc_Nm").kendoComboBox({
    //    dataValueField: "CdKy",
    //    dataTextField: "CdNm",
    //    dataSource: GetCdMas_LookupWeb('loc'), //CdNm_SelectMob_Datasource('HdrSec1_CmbLoc_Nm'),
    //    filter: "startswith",
    //    suggest: true,
    //    placeholder: "Select a Location .."
    //});
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



function LoadGrid() {
    try {
        $('#SecondGrid').data().kendoGrid.destroy();
        $('#SecondGrid').empty();
    } catch (e) { }

    var FromDate = $("#HdrSec1_TransferFromDt").val();
    var FromLocKy = 1;//(!$("#HdrSec1_CmbFromLoc_Nm").data("kendoComboBox").value()) ? 1 : $("#HdrSec1_CmbFromLoc_Nm").data("kendoComboBox").value();
    var ToLocKy = (!$("#HdrSec1_CmbToLoc_Nm").data("kendoComboBox").value()) ? 1 : $("#HdrSec1_CmbToLoc_Nm").data("kendoComboBox").value();

    var dataSource = new kendo.data.DataSource({
        transport: {
            read: {
                url: urlItemTransfer.GetItemTrnsferDetails, //"@Url.Content("~/PNS_Dispatch/LoadGridViewforPNSDispatch")",
                data: {
                    Date: FromDate,
                    OurCd: 'TRFIN',
                    FromLocKy: FromLocKy,
                    ToLocKy: ToLocKy,
                    //FromDate: FromDate,
                    //ToDate: ToDate
                },
                dataType: "json"
            },
        },
        batch: true,
        pageSize: 5,
        schema: {
            model: {
                id: "TrnKy",
                fields:
                {
                    LiNo: { editable: false, nullable: false, type: "number" },
                    TrnKy: { editable: false, nullable: false, type: "number" },
                    ContraTrnKy: { editable: false, nullable: false, type: "number" },
                    TrnNo: { editable: false, nullable: false, type: "number" },
                    ToStore: { editable: false, nullable: false, type: "string" },
                    ToStoreKy: { editable: false, nullable: false, type: "number" },
                    FromStore: { editable: false, nullable: false, type: "string" },
                    FromStoreKy: { editable: false, nullable: false, type: "number" },
                    TrnDt: { editable: false, nullable: false, type: "string" },
                    NoofItems: { editable: false, nullable: false, type: "string" },
                    YesNo: { editable: true, nullable: false, type: "string" },
                    OurCd: { editable: true, nullable: false, type: "string" },
                    TotalValue: { editable: false, nullable: false, type: "string", attributes: { style: "text-align:right;" } },
                    Status: { editable: true, nullable: false, type: "string" },
                    StatusKy: { editable: true, nullable: false, type: "number" }
                }
            }
        },
    });
    $("#SecondGrid").kendoGrid({
        dataSource: dataSource,
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
                width: "40px",
                hidden: true,
            },
              {
                  field: "ContraTrnKy",
                  title: "ContraTrnKy",
                  width: "40px",
                  hidden: true,
              },
            {
                field: "TrnNo",
                title: "Transfer No",
                width: "80px",
            },
            {
                field: "ToStore",
                title: "To Store",
                width: "100px",
                hidden: true,
            },
            {
                field: "ToStoreKy",
                title: "To Store",
                width: "40px",
                hidden: true,
            },
            {
                field: "ToStore",
                title: "From Store",
                width: "100px",
            },
            {
                field: "ToStoreKy",
                title: "From Store",
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
            //{
            //    field: "YesNo",
            //    title: "Y/N",
            //    //template: '<input type="checkbox"  #= YesNo? "checked=checked" : "" # class="PinChecked" ></input>',
            //    width: "50px",
            //},
            {
                field: "YesNo", title: "Y/N", width: "80px", attributes: { style: "text-align:center;" },
                editor: function (container, options) {
                    var model = options.model;
                    $('<input id="YesNo" name="' + options.field + '"/>').appendTo(container).kendoComboBox({
                        dataSource: [
                            { CdNm: "No", CdKy: "1" },
                            { CdNm: "Yes", CdKy: "2" },
                            { CdNm: "Cancel", CdKy: "3" }
                        ],
                        change: function (e) {
                            var combo = e.sender;
                            var selectedItm = combo.select();
                            var dataItem = combo.dataItem(selectedItm);

                            var grid = $("#SecondGrid").data().kendoGrid;
                            var selectedItem = grid.dataItem(grid.select());
                            var TrnKy = selectedItem.TrnKy;
                            var cmb = $("#YesNo").data("kendoComboBox");
                            var val = cmb.value();

                            if (isNaN(val)) {
                                alert("'" + val + "' is not a Valid input");
                                cmb.value("");
                                model.set("YesNo", "No");
                            }
                            else {
                                model.set("YesNo", dataItem.CdNm);
                                var selected = dataItem.CdNm;
                                var OurCd = '';
                                var ConCd = '';
                                var Sts = '';

                                if (selected == 'No') {
                                    ConCd = 'AprSts';
                                    OurCd = 'Pndng';
                                    Sts = 'Pending';
                                }
                                else if (selected == 'Yes') {
                                    var Childid = ("#Child" + TrnKy + "");
                                    if (Childid != null) {
                                        var Childgrid = $(Childid).data("kendoGrid");
                                        var ChildcurrentData = Childgrid.dataSource.data();
                                        var TotalQtySend = 0;
                                        var TotalQtyReceive = 0;
                                        for (var j = 0 ; j < ChildcurrentData.length ; j++) {
                                            TotalQtySend = TotalQtySend + ChildcurrentData[j].TrnQty;
                                            TotalQtyReceive = TotalQtyReceive + ChildcurrentData[j].QtyReceive;
                                        }
                                        if (TotalQtySend == TotalQtyReceive) {
                                            ConCd = 'AprSts';
                                            OurCd = 'Confm';
                                            Sts = 'Confirm';
                                        }
                                        else {
                                            ConCd = 'AprSts';
                                            OurCd = 'Amnd';
                                            Sts = 'Amended';
                                        }
                                    }
                                }
                                else if (selected == 'Cancel') {
                                    ConCd = 'AprSts';
                                    OurCd = 'Cancel';
                                    Sts = 'Canceled';
                                }
                                model.set("OurCd", OurCd);
                                model.set("Status", Sts);
                            }
                        },
                        dataValueField: "CdKy",
                        dataTextField: "CdNm"
                    });
                }
            },
            {
                field: "OurCd",
                title: "OurCd",
                width: "80px",
                hidden: true
            },
            {
                field: "Status",
                title: "Status",
                width: "80px",
            },
            {
                field: "StatusKy",
                title: "StatusKy",
                width: "80px",
                hidden:true
            }
        ]
    });
    FormGlblData.varSecondGrid = $('#SecondGrid').data("kendoGrid");
}

function detailInit(e) {
    var TrnKy = e.data.TrnKy;
    var dataSourceforDrilled = new kendo.data.DataSource({
        transport: {
            read: {
                url: urlItemTransfer.GetItemTrnsferItmDetails,
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
                fields:
                {
                    ItmKy: { editable: false, nullable: false },
                    ItmTrnKy: { editable: false, nullable: false },
                    ContraItmTrnKy: { editable: false, nullable: false },
                    ItemCode: { editable: false, nullable: false },
                    ItemName: { editable: false, nullable: false },
                    TrnQty: { editable: false, nullable: false, type: "number" },
                    QtyReceive: { editable: true, nullable: false, type: "number" },
                    Rate: { editable: false, nullable: false, attributes: { style: "text-align:right;" } }
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
        pageSize: 10,
        selectable: "row",
        editable: true,
        scrollable: false,
        sortable: true,
        pageable: true,
        columns: [
            { field: "ItmKy", title: "ItmKy", width: "50px", hidden: true },
            { field: "ItmTrnKy", title: "ItmTrnKy", width: "50px", hidden: true },
             { field: "ContraItmTrnKy", title: "ContraItmTrnKy", width: "50px", hidden: true },
            { field: "ItemCode", title: "Item Code", width: "90px" },
            { field: "ItemName", title: "Item Name", width: "90px" },
            { field: "TrnQty", title: "Quantity Send", width: "90px" },
            { field: "QtyReceive", title: "Quantity Received", width: "100px" },
            { field: "Rate", title: "Value", width: "140px" }
        ]
    });
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

function Save() {
    var FromDate = $("#HdrSec1_TransferFromDt").val();
    var OurCdFrm = 'TRFOUT';//"TRFOUT"; '
    var OurCdTo = 'TRFIN';//"TRFIN"; '
    var ConCd = "TrnTyp";

    var id1 = ("#SecondGrid");
    var grid1 = $(id1).data("kendoGrid");

    var currentData1 = grid1.dataSource.data();

    for (var j = 0; j < currentData1.length; j++) {
        var id = ("#Child" + currentData1[j].TrnKy + "");
        var grid = $(id).data("kendoGrid");
        var FrmLocKy = currentData1[j].ToStoreKy;
        var ToLocKy = currentData1[j].FromStoreKy;
        if (grid != null) {

            var OurCd = currentData1[j].OurCd;
            var TrnKy = currentData1[j].TrnKy;
            var ContraTrnKy = currentData1[j].ContraTrnKy;

            var ConCd1 = 'AprSts';
            $.ajax({
                url: urlItemTransfer.UpdateTransferStatus,
                data: {
                    TrnKy: TrnKy,
                    ConCd: ConCd1,
                    OurCd: OurCd,
                    ObjKy: viewBag.ObjKy,
                    ContraTrnKy: ContraTrnKy
                },
                dataType: "Json",
                type: "POST",
                success: function (DBData) {

                },
                error: function (e) {
                    return false;
                }
            });

            var currentData = grid.dataSource.data();
            var updatedRecords = [];
            var newRecords = [];

            for (var i = 0; i < currentData.length; i++) {
                currentData[i].LiNo = i + 1;

                if (currentData[i].TrnNo == null || currentData[i].TrnNo == '')
                    currentData[i].TrnNo = 1;
                if (currentData[i].TrnDt == null || currentData[i].TrnDt == '')
                    currentData[i].TrnDt = "";
                if (currentData[i].NoofItems == null || currentData[i].NoofItems == '')
                    currentData[i].NoofItems = 1;
                if (currentData[i].EAN == null || currentData[i].EAN == '')
                    currentData[i].EAN = "";
                if (currentData[i].UnitSize == null || currentData[i].UnitSize == '')
                    currentData[i].UnitSize = "";
                if (currentData[i].ToStore == null || currentData[i].ToStore == '')
                    currentData[i].ToStore = "";
                if (currentData[i].Status == null || currentData[i].Status == '')
                    currentData[i].Status = "";

                if (currentData[i].ItmKy > 0) {
                    currentData[i].TrnQty =  currentData[i].QtyReceive;
                    //newRecords.push(currentData[i].toJSON());                 

                    updatedRecords.push(currentData[i].toJSON());
                }
            }

            //this records are deleted
            var deletedRecords = [];
            $.ajax({
                url: urlItemTransfer.InsertTrnOutDetail,
                data: JSON.stringify({
                    updatedOrders: kendo.stringify(updatedRecords),
                    newOrders: kendo.stringify(newRecords),
                    deletedOrders: kendo.stringify(deletedRecords),
                    FrmLocKy: FrmLocKy,
                    ToLocKy: ToLocKy,
                    Date: FromDate,
                    OurCdFrm: OurCdFrm,
                    OurCdTo: OurCdTo,
                    ConCd: ConCd,
                    ObjKy: viewBag.ObjKy,
                }),
                contentType: 'application/json; charset=utf-8',
                dataType: "Json",
                type: "POST",
                success: function (data) {
                    LoadGrid();
                    alert("Successfully Saved..!");
                },
                error: function (e) {
                    return false;
                }
            });
        }
    }
}
