//var TempAdrKy = 1;
//function getItem(AdrKy, item, dataItem) {
//    TempAdrKy = AdrKy;
//    LoadAdrTypGrid(AdrKy);
//}
//$(document).ready(function () {

//    $('#remember').prop('checked', false);
//    var height = $(window).height() - 70;
//    var h2 = $("#filterCont").height();
//    $("#body").height(height);
//    $("#grid").height(height - (35 + h2 + 40));
//});
function LoadAdrTypGrid(AdrKy) {
    document.getElementById("OptPopAdrKy").value = AdrKy;
   // document.getElementById("OptPopAdrKy").val = AdrKy
    var ObjKy = GetObjKy('OptAdrTyps');
    var dataSource = new kendo.data.DataSource({
        transport: {
            read: {
                url: urlGetOptAdres,//'@Url.Content("~/AddressEntry/GetAdressTyp")',
                data: {
                    AdrKy: AdrKy,
                    ObjKy: ObjKy
                },
                dataType: "json",
                cache: false
            },
        },
        batch: true,
        pageSize: 12,
        schema: {
            model: {
                id: "AdrTypKy",
                fields: {
                    AdrCdKy: { editable: false, nullable: false, type: "number" },
                    AdrTypKy: { editable: false, nullable: false, type: "number" },
                    AdrTypCd: { nullable: false, type: "String", editable: true },
                    AdrTypNm: { nullable: true, type: "String", editable: true }
                }
            }
        }
    });
    $("#AdrTypEntryGrid").kendoGrid(
    {

        dataSource: dataSource,
        navigatable: true,
        autobind: true,
        sortable: true,
        reorderable: true,
        filterable: true,
        selectable: "row",
        columnMenu: true,
        resizable: true,
        pageable: true,
        height: 400,
        width: 250,
        columns: [
            
             { field: "AdrCdKy", title: "Address Cd Key",  hidden: true },//
            { field: "AdrTypKy", title: "Address Type Key", locked: true, hidden: true },//
            { field: "AddressType", title: "Address Types", width: '400px', },
            {
                field: "Optional",
                template: '<input type="checkbox" #= Optional ? "checked=checked" : "" # class="isOptional" ></input>',
               // template: '<input type="checkbox" #= Optional? "checked=checked" : "" #class="isOptional" name="Optional" ></input>',
                title: "Optional",
                width: '100px'
            }

        ]
    });
    $("#AdrTypEntryGrid .k-grid-content").on("change", "input.isOptional", function (arg) {
        var Maingrid = $("#AdrTypEntryGrid").data("kendoGrid");
            dataItem = Maingrid.dataItem($(arg.target).closest("tr"));
            dataItem.set("Optional", this.checked);
            if (dataItem.Optional) {
                dataItem.set("Optional", true);
                dataItem.dirty = true;
            } else {
                dataItem.set("Optional", false);
                dataItem.dirty = true;
            }
        });
    //$("#AdrTypEntryGrid .k-grid-content").on("change", "input.isOptional", function (arg) {
    //alert("")
    //    var Maingrid = $("#AdrTypEntryGrid").data("kendoGrid");
    //            dataItem = Maingrid.dataItem($(arg.target).closest("tr"));
    //            dataItem.set("isLeaf", this.checked);
    //            if (dataItem.isLeaf) {
    //                dataItem.set("isLeaf", true);
    //                dataItem.dirty = true;
    //            } else {
    //                dataItem.set("isLeaf", false);
    //                dataItem.dirty = true;
    //            }
    //        });
    //$("#AdrTypEntryGrid .k-grid-content").on("change", "input.rdio", function (e) {
    //    var grid = $("#AdrTypEntryGrid").data("kendoGrid"),
    //        dataItem = grid.dataItem($(e.target).closest("tr"));

    //    var data = grid.dataSource.data();
    //    var totalNumber = data.length;

    //    for (var i = 0; i < totalNumber; i++) {
    //        var currentDataItem = data[i];
    //        currentDataItem.set("Default", false);
    //    }

    //    dataItem.set("Default", this.checked);
    //});
}
function onClose() {
    $('#AdrTypEntryForm').data('kendoWindow').close();
}

function SaveOptionalTypes() {
    var OptAdrTypAry = $('#AdrTypEntryGrid').data('kendoGrid');
    var currentData = OptAdrTypAry.dataSource.data();
    var updatedRecords = [];
    var DeleteRecords = [];
    for (var i = 0; i < currentData.length; i++) {
        if (currentData[i].dirty && currentData[i].Optional == true) {
            updatedRecords.push(currentData[i].toJSON());
        } else if (currentData[i].dirty && currentData[i].Optional == false) {
            DeleteRecords.push(currentData[i].toJSON())
        }
    }

    if (updatedRecords.length == 0 && DeleteRecords == 0) {
        alert("Please Select Optional Address types");
        return;
    }

    var AdrKy = document.getElementById("OptPopAdrKy").value;// $("#OptPopAdrKy").val();

    $.ajax({
        url: urlInsertOptAdres,//'@Url.Content("~/AddressEntry/InsertOptAdrTyp")',
        dataType: "json",
        type: "POST",
        data: {
            AdrKy: AdrKy,
            optArry: kendo.stringify(updatedRecords),
            optDelArry: kendo.stringify(DeleteRecords),
            ObjKy: GetObjKy('OptAdrTyps')
        },

        success: function (data) {
            if (data) {
                alert("Save Successfully");
                $("#AdrTypEntryGrid").data("kendoGrid").dataSource.data([]);
                //$("#AdrTypEntryGrid").data("kendoGrid").destroy(); // destroy the Grid
                LoadAdrTypGrid(AdrKy);
            } else {
                alert("Please try again");
               // LoadAdrTypGrid(AdrKy);
            }
            //alert("Address Type Added");
        },
        error: function (e) {

        }
    });



}
//Save Actiion
//function addDefTyp(AdrKy, item, dataItem) {
//    var x = SetAdrTyp();
//    if (false)
//        alert("Please select default address type");
//    else {
//        item.set('AdrPrfxKy', x.Default[0].AdrTypky);
//        item.set('AdrTyp', x.Default[0].AdrTyp);
//        //alert(JSON.stringify(x.Default[0].AdrTypky));
//        $.ajax({
//            url: '@Url.Content("~/AddressEntry/UpdateAdressType")',
//            dataType: "json",
//            type: "POST",
//            data: {
//                AdrKy: AdrKy,
//                AdrTypky: x.Default[0].AdrTypky
//            },
//            success: function (data) {
//                alert("Address Type Added");
//            },
//            error: function (e) {

//            }
//        });
//        // addOptTyp(AdrKy, item, dataItem);

//        $('#AdrTypEntryGrid').data('kendoGrid').dataSource.read();
//        var grid = $("#AdrTypEntryGrid").data("kendoGrid");
//        var data = grid.dataSource.data();
//        var totalNumber = data.length;
//        for (var i = 0; i < totalNumber; i++) {
//            var currentDataItem = data[i];
//            currentDataItem.set("Default", false);
//        }
//        addOptTyp(AdrKy, item, dataItem);
//        $('#AdrTypEntryForm').data('kendoWindow').close();
//    }

//}

//function addOptTyp(AdrKy, item, dataItem) {
//    var optTyps = SetAdrTyp();
//    var frntArry = [];
//    var backArry = [];

//    optTyps.Optional.forEach(function (entry) {
//        frntArry.push(entry.AdrTyp);
//        //var optAdrObj = {
//        //    CdKy: entry.AdrTypKy
//        //}

//        backArry.push(entry.AdrTypky);
//    });

//    //alert(JSON.stringify(AdrKy));
//    item.set("OptAdrTyps", frntArry);
//    //alert(JSON.stringify(frntArry));

//    if (backArry.length > 0) {
//        $.ajax({
//            url: '@Url.Content("~/AddressEntry/InsertOptAdrTyp")',
//            dataType: "json",
//            type: "POST",
//            data: {
//                AdrKy: AdrKy,
//                optArry: kendo.stringify(backArry),
//            },

//            success: function (data) {
//                //alert("Address Type Added");
//            },
//            error: function (e) {

//            }
//        });
//    }

//}