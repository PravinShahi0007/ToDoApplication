var ItmOfrKy = 0;
var ItmOfrKyPass = 0;
var ItmTypKy = 0;
var ControlConKy = 0;
var ItmTaxTypKy = 1;
var OldItmCd = '';
var FormGlblData = {
    FormObjData: null,
    AllDefalutValueObj: null,
    ItmKy: 1,
    ItmTypKy: 1,
    ItmTaxTypKy: 1,
    AccessLvlKy: 1,
    ConfiLvlKy: 1,
}

$(document).ready(function () {

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
            FormGlblData.AllDefalutValueObj = Get_AllDefalutValue_Obj();
            DocReadyCus();
        }
    });
}

function DocReadyCus() {

    $("#GridWin").show();
    LoadGridView();

    setTimeout(setHdrSectionPropFun, 2000);

    LoadCombo();

    LoadDatePickers();

    $('#HdrSec1_ChkboxAct_Val').attr('checked', true);

    
    //insertItem();

}

function setHdrSectionPropFun() {

    // ---------- Set ObjProperties
    setHdrSectionProp('', viewBag.ObjKy, '', 'HdrSec1');

    SetHandlingEnterKeyEvent('', viewBag.ObjKy);
    SetFirstFocusObj();
    $("#HdrSec1_CmbPromoTyp_Cd").focus();
}

function CancelGridItem() {
    var grid = $("#OfrGrid").data("kendoGrid");
    grid.cancelChanges();
    $('#HdrSec1_ChkboxAct_Val').attr('checked', true);
}


function LoadDatePickers()
{
    $("#HdrSec1_DatPicToDt_Val")
        .kendoDatePicker({
            format: "dd/MM/yyyy",
            min: new Date(31, 2, 2009)
        });
    $("#HdrSec1_DatPicFrmDt_Val")
        .kendoDatePicker({
            format: "dd/MM/yyyy",
            min: new Date(31, 2, 2009)
        });

    var todayDate = new Date();
    $("#HdrSec1_DatPicToDt_Val").data("kendoDatePicker").value(todayDate);
    $("#HdrSec1_DatPicFrmDt_Val").data("kendoDatePicker").value(todayDate);
}

function LoadCombo() {

    $("#HdrSec1_CmbPromoTyp_Cd").kendoComboBox({
        dataValueField: "CdKy",
        dataTextField: "CdNm",
        dataSource: CdNm_SelectMob_Datasource('HdrSec1_CmbPromoTyp'),
        //change: function (e) { },
        filter: "contains",
        suggest: true,
        placeholder: "Select Offer Type.."
    });

}

$("#btnLoadItem").click(function () {

    LoadGridView();
    //$("#GridWin").show();
});


function insertItem() {
    var childGridName = "Child" + ItmOfrKyPass;
    var grid = $("#" + childGridName).data("kendoGrid").addRow();
}



var childGridName = "Child" + ItmOfrKyPass;
$('#' + childGridName).change(function () {
    var grid = $("#" + childGridName).data("kendoGrid").dataSource.data()[0];
    var ItemCode = grid.ItmCd;
    //var EAN = grid.EAN;

    if (ItemCode != '') {
        insertItem();
    }
    else {
        $.ajax({
            url: urlItemTransfer.GetItemByCodeEAN,
            data: {
                ItemCode: ItemCode,
                //EAN: EAN
            },
            dataType: "Json",
            type: "POST",
            success: function (DBData) {
                var FinalData = [];
                var childGridName = "Child" + ItmOfrKyPass;
                var grid = $("#" + childGridName).data("kendoGrid");
                var CurrentData = grid.dataSource.data();
                var firstItem = CurrentData[0];

                firstItem.set("ItmNm", DBData[0].ItemName);
                firstItem.set("ItmCd", DBData[0].ItmCd);
                //firstItem.set("EAN", DBData[0].EAN);
                firstItem.set("ItmKy", DBData[0].ItmKy);
                //firstItem.set("GrpNo", DBData[0].GrpNo);
                //firstItem.set("IsDefualt", DBData[0].IsDefualt);

                $("#" + childGridName).data("kendoGrid").dataSource.data(CurrentData);
            },
            error: function (e) {
                return false;
            }
        });
    }
});



function LoadGridView() {

    var Promocolumns = [

            
        {
            field: "ItmOfrKy", title: "ItmOfrKy", width: "100px", hidden: true, attributes: { style: "text-align:center;" },

        },
        {
            field: "ItmOfrTypKy", title: "ItmOfrTypKy", width: "100px", hidden: true, attributes: { style: "text-align:center;" },

        },
        {
            field: "ItmOfrCd", title: "Promotion Code", width: "100px", attributes: { style: "text-align:center;" },
        },
        {
            field: "ItmOfrNm", title: "Promotion Name", width: "100px", attributes: { style: "text-align:center;" },
            filterable: {
                cell: {
                    operator: "contains",
                    suggestionOperator: "contains"
                }
            },
        },
        {
            field: "FrmDt", title: "From Date", width: "100px", attributes: { style: "text-align:center;" },
            editor: function (container, options) {
                var model = options.model;
                $('<input id="FrmDt" name="' + options.field + '" data-value-field="' + options.field + '" data-bind="value:' + options.field + '" data-format="' + options.format + '"/>').appendTo(container).kendoDatePicker({
                    change: function (e) {
                    }
                });
            },
            format: "{0: dd-MM-yyyy}"
        },
        {
            field: "ToDt", title: "To Date", width: "100px", attributes: { style: "text-align:center;" },
            editor: function (container, options) {
                var model = options.model;
                $('<input id="ToDt" name="' + options.field + '" data-value-field="' + options.field + '" data-bind="value:' + options.field + '" data-format="' + options.format + '"/>').appendTo(container).kendoDatePicker({
                    change: function (e) {
                    }
                });
            },
            format: "{0: dd-MM-yyyy}"
        },
        {
            field: "BuyQty", title: "Buying Quantity", width: "100px", attributes: { style: "text-align:center;" },
        },
        {
            field: "OfrQty", title: "Offering Quantity", width: "100px", attributes: { style: "text-align:center;" },

        },
        
        {
            field: "isAct", title: "Status", width: "100px", attributes: { style: "text-align:center;" },
            filterable: {
                cell: {
                    showOperators: false
                }
            },
            sortable: false,
            template: '<input type="checkbox"  #= isAct? checked="checked" : "" # class="isActPinChecked"></input>',
            //headerTemplate: '<label> Status(s) <input type="checkbox" id="checkAll"/></label>',
        },

    ];

    var gridNo = 1;
    var FinalItmColumn = setColumnProp(Promocolumns, viewBag.ObjKy, '', 'FormGrd', gridNo)
}


function LoadGridWithColumnProp(columnsFinal, gridNo) {

    if (gridNo == 1) {
        try {
            $('#OfrGrid').data().kendoGrid.destroy();
            $('#OfrGrid').empty();
        } catch (e) { }

        var griddataSource = new kendo.data.DataSource({
            transport: {
                read: {
                    url: urlItmMasOfrHdr_SelectWeb, // '@Url.Action("ItmMasOfrHdr_SelectWeb", "Promotion")',

                    dataType: "json",
                    type: "POST",
                },

                parameterMap: function (options, operation) {

                    if (operation == "read") {
                        return ({
                        })

                    }
                }

            },
            pageSize: 10,

            schema: {
                model: {
                    id: "ItmOfrKy",
                    fields: //Relavent fields of the grid should be bind with following model items
                    {
                        ItmOfrKy: { editable: false, nullable: false, type: "number" },
                        ItmOfrTypKy: { editable: false, nullable: false, type: "number" },
                        ItmOfrCd: { editable: false, nullable: false, type: "string" },
                        ItmOfrNm: { editable: false, nullable: false, type: "string" },
                        BuyQty: { editable: false, nullable: false, type: "number" },
                        OfrQty: { editable: false, nullable: false, type: "number" },
                        FrmDt: { editable: false, nullable: true, type: "string" },
                        ToDt: { editable: false, nullable: true, type: "string" },
                        isAct: { editable: true, nullable: false, type: "boolean" },

                    }
                }
            }
        });


        var parentGrid = $("#OfrGrid").kendoGrid({
            dataSource: griddataSource,
            autobind: true,
            resizable: true,
            navigatable: true,
            sortable: true,
            reorderable: true,
            detailInit:detailInit,
            Scrollable: true,
            selectable: "row",
            pageable: {
                refresh: true, pageSizes: [5, 10, 20, 50, 100, 150]
            },
            columnMenu: true,
            filterable: {
                mode: "row"
            },
            columns: columnsFinal,
            dataBinding: function () {
                record = (this.dataSource.page() - 1) * this.dataSource.pageSize();
            },

            editable: true
        });
    }
}
//var childGridName = "Child" + ItmOfrKyPass;
//var grid = $("#" + childGridName).data("kendoGrid");

//$grid.on("click", ".k-grid-Custom", function (e) {
//    alert('sdf');
//    saveChanges();
//});

function saveChanges() {
    var childGridName = "Child" + ItmOfrKyPass;
    var grid = $("#" + childGridName).data("kendoGrid");

  //var  dataItem = grid.dataItem($(e.target).closest("tr"));

  //  dataItem.set("IsDefualt", this.checked);



    if (grid.dataSource.data != null) {
        var currentData = grid.dataSource.data();
        var newRecords = [];

        for (var i = 0; i < currentData.length; i++) {
            newRecords.push(currentData[i].toJSON());
        }

        $.ajax({
            url: urlItmMasOfrDet_InsertUpdate, //"@Url.Content("~/Promotion/ItmMasOfrDet_InsertUpdate")",
            dataType: "json",
            type: "POST",
            data: JSON.stringify({

                NewGridDetail: kendo.stringify(newRecords),

            }),

            contentType: 'application/json; charset=utf-8',
            success: function (data) {
                if (data == true) {
                    LoadGridView();
                    alert("Saved Successfully");
                   

                } else {
                    alert("Record Not Updated");
                    //LoadGridView(); // update grid
                }
            },
            error: function (e) {
                return false;
            }

        });
    }
}

function detailInit(e) {
    ItmOfrKyPass = e.data.ItmOfrKy;

    //var childGridName = "Child" + ItmOfrKyPass;
    //var grid = $("#" + childGridName).data("kendoGrid");
    //var currentData = grid.dataSource.data();
    //var newRecords = [];

    //for (var i = 0; i < currentData.length; i++) {
    //    newRecords.push(currentData[i].toJSON());
    //}

    var dataSourceforDrilled = new kendo.data.DataSource({
        transport: {
            read: {
                url: urlItmMasOfrDet_SelectWeb, //"@Url.Content("~/Promotion/ItmMasOfrDet_SelectWeb")",
                data: {
                    ItmOfrKyPass: ItmOfrKyPass
                },
                dataType: "json"
            },
            update: {
                url: urlItmMasOfrDet_InsertUpdate, //"@Url.Content("~/Promotion/ItmMasOfrDet_InsertUpdate")",
                contentType: 'application/json; charset=utf-8',
                dataType: "json",
                //type: "POST",
                complete: function (e) {
                    alert("Updated successfully..!");
                    var childGridName = "Child" + ItmOfrKyPass;
                    var grid = $("#" + childGridName).data("kendoGrid");
                    grid.dataSource.read();
                }
            },

            remove:function(e){ 
                alert("Updated successfully..!");
                //complete: function (e) {
                //    alert("Updated successfully..!");
                   
                
            },
            destroy: {
                url: urlItmMasOfrDet_InsertUpdate,
                contentType: 'application/json; charset=utf-8',
                dataType: "jsonp"
               
            },
            create: {                
                url: urlItmMasOfrDet_InsertUpdate, //"@Url.Content("~/Promotion/ItmMasOfrDet_InsertUpdate")",
                contentType: 'application/json; charset=utf-8',
                dataType: "json",
                //type: "POST",
                complete: function (e) {
                    alert("Saved successfully..!");
                    var childGridName = "Child" + ItmOfrKyPass;
                    var grid = $("#" + childGridName).data("kendoGrid");
                    grid.dataSource.read();
                }
            },
            //parameterMap: function (options, operation) {
            //    if (operation == "create" && options.models) {
            //        return JSON.stringify({ 'ItmMasOfrDet_InsertUpdate': kendo.stringify(options.models) }); // Parrameter name of the Controller Action method==> List<ToDoModel>todos
            //    }
            //    if (operation == "update" && options.models) {
            //        return JSON.stringify({ 'ItmMasOfrDet_InsertUpdate': kendo.stringify(options.models)}); // Parrameter name of the Controller Action method==> List<ToDoModel>todos

            //    }
            //},
        },
        batch: true,
        pageSize: 10,
        schema: {
            model: {
                id: "ItmOfrDetKy",
                fields: //Relavent fields of the grid should be bind with following model items
                {
                    ItmOfrDetKy: { editable: false, nullable: false, type: "number" },
                    ItmOfrKy: { editable: false, nullable: false, defaultValue: e.data.ItmOfrKy, type: "number" },
                    ItmKy: { editable: false, nullable: false, type: "number" },
                    ItmCd: { editable: true, nullable: false, type: "string" },
                    ItmNm: { editable: false, nullable: false, type: "string" },
                    TrnQty: { editable: true, nullable: false, type: "number" },
                    Rate: { editable: true, nullable: false, type: "number" },
                    Value: { editable: false, nullable: false, type: "number" },
                    GrpNo: { editable: true, nullable: false, type: "number" },
                    GrpNm: { editable: true, nullable: false, type: "string" } ,
                    IsDefualt: { editable: true, nullable: false, type: "boolean" }

                }
            }
        }
    });
    //================ Child grid Initialization ============================
    $('<div id="Child' + ItmOfrKyPass + '"/>').appendTo(e.detailCell).kendoGrid({
    //$("#OfrDetGrid").kendoGrid({  
        dataSource: dataSourceforDrilled,
        serverPaging: true,
        serverSorting: true,
        serverFiltering: true,
        resizable: true,
        navigatable: true,
        autobind: true,
        columnMenu: true,
        sortable: true,
        selectable: "row",
        filterable: {
            mode: "row"
        },
       pageable:true,
        pageSize: 5,
        toolbar: ["create", {template: '<a class="k-button" href="\\#" onclick="saveChanges()">Save</a>' }, "cancel"],
        editable: "incell", //true ,//"inline", 
        scrollable: false,
        sortable: true,
        
        change: function (e) {
            var childGridName = "Child" + ItmOfrKyPass;
            var grid = $("#" + childGridName).data("kendoGrid").dataSource.data()[0];
            var ItemCode = grid.ItmCd;
            var EAN = "";

            if (ItemCode != '' & ItemCode != OldItmCd) {
                OldItmCd = ItemCode;

                $.ajax({
                    url: urlItemTransfer.GetItemByCodeEAN,
                    data: {
                        ItemCode: ItemCode,
                        EAN: EAN
                    },
                    dataType: "Json",
                    type: "POST",
                    success: function (DBData) {
                        var FinalData = [];
                        var childGridName = "Child" + ItmOfrKyPass;
                        var grid = $("#" + childGridName).data("kendoGrid");
                        var CurrentData = grid.dataSource.data();
                        var firstItem = CurrentData[0];
                        var ItmKy = DBData[0].ItmKy;
                        var ItmCd = DBData[0].ItemCode;
                        var ItmNm = DBData[0].ItemName;
                        var Rate = DBData[0].Rate;
                        var GrpNo = DBData[0].GrpNo;
                        var  GrpNm = DBData[0].GrpNm;
                        var IsDefualt = DBData[0].IsDefualt;

                        firstItem.ItmNm = ItmNm;//set('ItmNm', 'dfgdg');
                        firstItem.ItmCd = ItmCd; //set('ItmCd', ItmCd);
                       

                        //firstItem.set("EAN", DBData[0].EAN);
                        firstItem.ItmKy = ItmKy; //.set('ItmKy', ItmKy);
                        firstItem.Rate = Rate;
                        firstItem.TrnQty = $("#HdrSec1_InptBuy_Val").val();
                        firstItem.OfrQty = $("#HdrSec1_InptGet_Val").val();
                        firstItem.GrpNo = GrpNo;
                        firstItem.GrpNm = GrpNm;
                        firstItem.IsDefualt = IsDefualt;
                        $("#" + childGridName).data("kendoGrid").dataSource.data(CurrentData);

                        //var parentGrid = $("#OfrGrid").data("kendoGrid");
                        ////var parentItem = parentGrid.dataSource.get(e.model.ItmOfrKy);
                        //e.model.set("ItmOfrKy", ItmOfrKyPass); //parentItem.ItmOfrKy

                    },
                    error: function (e) {
                        return false;
                    }
                });
            }
        },


        //pageable: true,
        //dataBound: function(){
        //    setTimeout(function() {
        //        var grid = $('#ChildGrid').data("kendoGrid");
        //        grid.addRow();
        //    });
        //},
        //dataBinding: function () {
        //    record = (this.dataSource.page() - 1) * this.dataSource.pageSize();
        //},
        columns: [
            { field: "ItmKy", title: "ItmKy", width: "50px", hidden: true },
            { field: "ItmOfrKy", title: "ItmOfrKy", width: "50px", hidden: true },
            { field: "ItmOfrDetKy", title: "ItmOfrDetKy", width: "50px", hidden: true },
            { field: "ItmCd", title: "Item Code", width: "90px" },           
            { field: "ItmNm", title: "Item Name", width: "120px" },
            { field: "TrnQty", title: "Quantity", width: "90px", hidden: true },
            { field: "Rate", title: "Price", width: "90px" },
            { field: "GrpNo", title: "GrpNo", width: "90px" },
            { field: "GrpNm", title: "GrpNm", width: "90px" } ,           
            {
                field: "IsDefualt", title: "IsDefault", width: "90px"
            }
                //template: "<input type='checkbox' value='1' " +
                //            "\\#if(IsDefault==1){\\#checked='checked'\\#}\\# />",

              //  template: '<input type="checkbox" #= IsDefualt ? \'checked="checked"\' : "" # class="chkbx" />', width: 110,
            
             //template: '<label class="lbl-switch"> <input type="checkbox"  #=IsDefualt? "checked=checked" : "" # class="chkbx"/> <div> <span class="on">Yes</span> <span class="off">No</span> </div> <i></i> </label>'
                //,{ template: '<input type="checkbox" #= IsDefault ? \'checked="checked"\' : "" # class="chkbx" />', width: 110
          //  }
            ,
            { command: { text: "X", click: GridDeleteButtonIsClicked }, title: " ", width: "40px" }
            //{ field: "QtyReceive", title: "Quantity Received", width: "100px" },
            //{ field: "Value", title: "Value", width: "140px" }
        ]
    });
    //insertItem();
}

//grid.element.on('click', '.mybutton', function () {
//    var dataItem = grid.dataItem($(this).closest('tr'));
//    alert(dataItem.Name + ' was clicked');
//})
//var childGridName = "Child" + ItmOfrKyPass;
//var grid = $("#" + childGridName).data("kendoGrid");

//$('Child31').on("click", "input.chkbx", function (e) {
//    alert('gh');
//    var grid = $("#grid").data("kendoGrid"),
//        dataItem = grid.dataItem($(e.target).closest("tr"));

//    dataItem.set("IsDefualt", this.checked);
//});





function Save()
{
    ItmOfrKy = $("#ItmOfrKy").val();
    if (ItmOfrKy == "") { ItmOfrKy = 0; }
    var ItmOfrTypKy = $("#HdrSec1_CmbPromoTyp_Cd").data('kendoComboBox').value();
    var ItmOfrCd = $("#HdrSec1_InptPromoCd_Val").val();
    var ItmOfrNm = $("#HdrSec1_InptPromoNm_Val").val();
    var BuyQty = $("#HdrSec1_InptBuy_Val").val();
    var OfrQty = $("#HdrSec1_InptGet_Val").val();
    var FrmDt = $("#HdrSec1_DatPicFrmDt_Val").data("kendoDatePicker").value();
    var ToDt = $("#HdrSec1_DatPicToDt_Val").data("kendoDatePicker").value();

    $.ajax({
        url: urlInsertUpdateItmMasOfrHdr, // '@Url.Content("~/Promotion/InsertUpdateItmMasOfrHdr")',
        dataType: "json",
        type: "POST",
        data: JSON.stringify({

            ItmOfrKy: ItmOfrKy,
            ItmOfrTypKy: ItmOfrTypKy,
            ItmOfrCd: ItmOfrCd,
            ItmOfrNm: ItmOfrNm,
            BuyQty: BuyQty,
            OfrQty: OfrQty,
            FrmDt: FrmDt,
            ToDt: ToDt,
            
        }),

        contentType: 'application/json; charset=utf-8',
        success: function (data) {
            if (data == true) {
                alert("Saved Successfully");
                LoadGridView();

            } else {
                alert("Record Not Updated");
                LoadGridView(); // update grid
            }
        },
        error: function (e) {            
            alert("Error");
            LoadGridView();
            return false;
        }

    });
}


$("#OfrGrid").on("dblclick", "tr.k-state-selected", function () {
    var id = ("#OfrGrid");
    var grid = $(id).data().kendoGrid;
    var selectedItem = grid.dataItem(grid.select());
    var OfrQty = selectedItem.OfrQty;
    var ItmOfrTypKy = selectedItem.ItmOfrTypKy;
    var ItmOfrKy = selectedItem.ItmOfrKy;
    var ItmOfrCd = selectedItem.ItmOfrCd;
    var ItmOfrNm = selectedItem.ItmOfrNm;
    var BuyQty = selectedItem.BuyQty;
    var FrmDt = selectedItem.FrmDt;
    var ToDt = selectedItem.ToDt;
    var dateString = selectedItem.FrmDt;
    var parts = dateString.split("-");

    if(parts > 1)
        {
            var day = parseInt(parts[0], 10); // 10 for prevent it to think like octal value
            var month = parseInt(parts[1], 10);
            var year = parseInt(parts[2], 10);
             FrmDt = day + "/" + month + "/" + year;
        }
       

    var dateString = selectedItem.ToDt;
    var parts = dateString.split("-");
    if (parts > 1) {
        var day = parseInt(parts[0], 10); // 10 for prevent it to think like octal value
        var month = parseInt(parts[1], 10);
        var year = parseInt(parts[2], 10);
         ToDt = day + "/" + month + "/" + year;
    }
  
    

    //if (LiNo != 1) {
    //    $("#TempLiNumber").value = LiNo;
        
        $("#ItmOfrKy").val(ItmOfrKy);
        $("#HdrSec1_CmbPromoTyp_Cd").data('kendoComboBox').value(ItmOfrTypKy);
        $("#HdrSec1_InptPromoCd_Val").val(ItmOfrCd);
        $("#HdrSec1_InptPromoNm_Val").val(ItmOfrNm);
        $("#HdrSec1_InptBuy_Val").val(BuyQty);
        $("#HdrSec1_InptGet_Val").val(OfrQty);
        $("#HdrSec1_DatPicFrmDt_Val").data("kendoDatePicker").value(FrmDt);
        $("#HdrSec1_DatPicToDt_Val").data("kendoDatePicker").value(ToDt);

       
        //if (isAct == 1) {
        //    $("#HdrSec1_ChkboxAct_Val").prop("checked", true);
        //} else {
        //    $("#HdrSec1_ChkboxAct_Val").prop("checked", false);
        //}
        //$("#HdrSec1_CmbCat_Cd").data('kendoComboBox').value(ItmCat8Ky);


    //} else {

    //    alert("You Cannot change the Line Number one");
    //}
});


function GridDeleteButtonIsClicked(e) {
    alert('sdf');
    e.preventDefault();   
  //  var grid = $('<div id="Child' + ItmOfrKyPass + '"/>').data("kendoGrid").dataSource.data()[0];

    var childGridName = "Child" + ItmOfrKyPass;
    var grid = $("#" + childGridName).data("kendoGrid");


    var selectedItem = grid.dataItem($(this).closest("tr"));
    var dataItem = grid.dataItem($(e.currentTarget).closest("tr"));
    //alert(dataItem.ItmTrnKy)
   
    var answer = confirm("Are you sure you want to delete from the database?");
    dataItem.isAct = 0;
    if (answer) {

        $.ajax({
            url: ItmMasOfrDet_DeleteWeb, // '@Url.Content("~/Promotion/InsertUpdateItmMasOfrHdr")',
            dataType: "json",
            type: "POST",
            data: JSON.stringify({
                ItmOfrKy: dataItem.ItmOfrDetKy
            }),

            contentType: 'application/json; charset=utf-8',
            success: function (data) {
                if (data == true) {
                    alert("Delete Successfully");
                    LoadGridView(); // update grid

                } else {
                    alert("Record Not delete");
                    LoadGridView(); // update grid
                }
            },
            error: function (e) {            
                alert("Error");
                LoadGridView();
                return false;
            }

        });
    }


}

//$( "Child" + ItmOfrKyPass).on('click', '.chkbx', function () {
//    alert('sdfsaf');
//    var checked = $(this).is(':checked');
//    var grid = $("Child" + ItmOfrKyPass).data().kendoGrid;
//    var dataItem = grid.dataItem($(this).closest('tr'));
//    if (dataItem != undefined) {
//        dataItem.set('IsDefault ', checked);
//        alert('sdfsaf');
//    }
   
//});

