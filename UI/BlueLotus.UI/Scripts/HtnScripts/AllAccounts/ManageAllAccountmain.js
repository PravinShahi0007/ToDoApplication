var FormGlblData = {
    FormObjData: null,
    ItmTypKy: 1,
    AccessLvlKy: 1,
    ConfiLvlKy: 1,
    TrnKy: 1,
    AllDefalutValueObj: null
}

$(document).ready(function () {
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
            Button_From_Dynamic('ButtonSec1');
            DocReadyCus();
        }
    });
});



function DocReadyCus() {

    var h = $("#option").height();
    var i = $("#ButtonSet").height();
    var height = ($(window).height()) - (80 + h + i + 46);
    $("#Maingrid").height(height);
    PageSize = Math.round((height - 70) / 30);
    HTNPaginationCtrlLoadWithDataGrid();
    // GridDefaultColumns();

}
//


var FormGlblData = {
    FormObjData: null,
    TrnTypKy: 1,
    AccessLvlKy: 1,
    ConfiLvlKy: 1,
    TrnKy: 1
}

//$(document)
//    .ready(function () {
//        //  LoadGrid();

//        //GridDefaultColumns();
//        HTNPaginationCtrlLoadWithDataGrid();
//        //$('#Maingrid').data('kendoGrid').refresh();

//      //  document.addEventListener("keydown", keyDownTextField, false);
//    });

function isnewRec() {
    var FirstRow = $("#Maingrid").data().kendoGrid.dataSource.data()[0];
    FirstRow.set("isLeaf", false);
    FirstRow.set("isAct", true);
    FirstRow.set("isAlwTrn", true);
    $('#Maingrid').data('kendoGrid').refresh();
    //  var focusedCell = $("#Maingrid tr[data-uid='" + dataItem.uid + "'] td:nth-child(" + (focusedCellIndex + 1) + ")");


    // var focusedCell = $("#Maingrid tr[0] td:nth-child(" + (0) + ")");
    // $('#grid').data('kendoGrid').editCell(focusedCell);
    var grid = $("#Maingrid").data("kendoGrid");
    var cell = $('#Maingrid').find('tbody tr:eq(0) td:eq(2)');
    grid.editCell(cell);

}

function insertItem() {
    var grid = $("#Maingrid").data("kendoGrid");
    var FirstRow = $("#Maingrid").data().kendoGrid.dataSource.data()[0];

    if (FirstRow.AccCd) {
        if (FirstRow.AccNm) {
            if (FirstRow.AccTypKy && FirstRow.AccTypKy != 1) {
                if (FirstRow.CrnKy && FirstRow.CrnKy != 1) {
                    if (CheckAccNameExist() && CheckAccountExist()) {
                        grid.addRow({});
                        isnewRec();
                    }
                } else {
                    alert("Please insert a currency");
                }
            } else {
                alert("Please insert An Account Type");

            }
        } else {
            alert("Please insert An Account Name");
        }
    } else {
        alert("Please insert An Account Code");
    }

}

function ComboValidations(cmbNm) {
    var cmb = $("#" + cmbNm + "").data("kendoComboBox");
    var val = cmb.value();
    if (isNaN(val)) {
        alert("'" + val + "' is not a Valid input");
        $("#" + cmbNm + "").data("kendoComboBox").value("");
        return false;
    } else {
        return true;
    }
}

function LoadGridWithColumnProp(columnsFinal, gridNo) {
    var ObjKy = ObjKy;
    var SearchedAccCd = $("#HdrSec1_InptAccCd_Val").val();
    var SearchedAccNm = $("#HdrSec1_InptAccNm_Val").val();

    dataSource = new kendo.data.DataSource({
        transport: {
            read: {
                url: UrlLoadGrid, // '@Url.Content("~/ManageAllAccount/GetAccGrid")',
                data: {
                    'ObjKy': ObjKy,
                    'PageNo': HTNPaginationCtrlData.PageNo,
                    'PageSize': HTNPaginationCtrlData.PageSize,
                    'AccCd': SearchedAccCd,
                    'AccNm': SearchedAccNm,
                    'ourCode': viewBag.OurCd

                },
                dataType: "json",
                cache: false
            },

        },
        batch: true,
        pageSize: PageSize,
        schema: {
            model: {
                id: "AccKy",
                fields: {
                    Lino: { editable: false, nullable: false, type: "number" },
                    CKy1: { editable: true, nullable: false, type: "number" },
                    AccCd: { editable: true, nullable: true, type: "string" },
                    AccKy: { editable: false, nullable: false, type: "number" },
                    AccNm: { editable: true, nullable: true, type: "string" },
                    AccTypNm: { editable: true, nullable: true, type: "string" },
                    AccTypKy: { editable: true, nullable: false, type: "number" },
                    CrnKy: { editable: true, nullable: false, type: "string" },
                    CrnNm: { editable: true, nullable: true, type: "string" },
                    BUKy: { editable: true, nullable: false, type: "number" },
                    BuNm: { editable: true, nullable: true, type: "string" },
                    isDefault: { editable: true, nullable: false, type: "boolean" },
                    ParentKey: { editable: true, nullable: true, type: "string" },
                    ParentNm: { editable: true, nullable: false, type: "string" },
                    SO: { editable: true, nullable: false, type: "string" },
                    isLeaf: { editable: true, nullable: false, type: "boolean" },
                    MultiAdrTypKy: { editable: true, nullable: false, type: "number" },
                    MultyadrTypNm: { editable: true, nullable: true, type: "string" },
                    Address: { editable: true, nullable: false, type: "string" },
                    Credit: { editable: true, nullable: false, type: "string" },
                    isCredit: { editable: true, nullable: false, type: "boolean" },
                    isAct: { editable: true, nullable: false, type: "boolean" },
                    isCusSup: { editable: true, nullable: false, type: "boolean" },
                    isAlwTrn: { editable: true, nullable: false, type: "boolean" },
                    Note: { editable: true, nullable: false, type: "number" },
                    IsSysRec: { editable: true, nullable: false, type: "boolean" },
                    isBgt: { editable: true, nullable: false, type: "boolean" },
                    AccCat1Ky: { editable: true, nullable: false, type: "number" },
                    AccCat1Code: { editable: true, nullable: true, type: "string" },
                    AccCat1Name: { editable: true, nullable: true, type: "string" },
                    AccCat2Ky: { editable: true, nullable: false, type: "number" },
                    AccCat2Code: { editable: true, nullable: true, type: "string" },
                    AccCat2Name: { editable: true, nullable: true, type: "string" },
                    AccCat3Ky: { editable: true, nullable: false, type: "number" },
                    AccCat3Code: { editable: true, nullable: true, type: "string" },
                    AccCat3Name: { editable: true, nullable: true, type: "string" },
                    AccCat4Ky: { editable: true, nullable: false, type: "number" },
                    AccCat4Code: { editable: true, nullable: true, type: "string" },
                    AccCat4Name: { editable: true, nullable: true, type: "string" },
                    AccCat5Ky: { editable: true, nullable: false, type: "number" },
                    AccCat5Code: { editable: true, nullable: true, type: "string" },
                    AccCat5Name: { editable: true, nullable: true, type: "string" },
                    AccCat6Ky: { editable: true, nullable: false, type: "number" },
                    AccCat6Code: { editable: true, nullable: true, type: "string" },
                    AccCat6Name: { editable: true, nullable: true, type: "string" },
                    ItmCat2Ky: { editable: true, nullable: false, type: "number" },
                    ItmCat2Code: { editable: true, nullable: true, type: "string" },
                    ItmCat2Name: { editable: true, nullable: true, type: "string" },
                    AccessLvlKy: { editable: true, nullable: false, type: "number" },
                    AccessLvlCode: { editable: true, nullable: true, type: "string" },
                    Alias: { editable: true, nullable: false, type: "string" },
                    //BankDetails: { editable: true, nullable: true, type: "string" }
                }
            }
        }
    });


    $("#Maingrid")
        .kendoGrid(
            {
                dataSource: dataSource,
                navigatable: true,
                selectable: "row",
                resizable: true,
                sortable: true,
                pageable: true,
                reorderable: true,
                filterable: {
                    mode: "row"
                },
                pageable: { refresh: true, pageSizes: [5, 10, 20, 50, 100] },
                columns: columnsFinal,
                dataBound: GridOnDataBound,

                edit: function (arg) {
                    $("[name='AccCd']", arg.container).blur(function () {
                        var id = ("#Maingrid");
                        var grid = $(id).data().kendoGrid;
                        var selectedItem = grid.dataItem(grid.select());
                        var AccCd = selectedItem.AccCd;

                        CheckAccountExist(AccCd);
                    });
                    $("[name='AccNm']", arg.container).blur(function () {
                        var id = ("#Maingrid");
                        var grid = $(id).data().kendoGrid;
                        var selectedItem = grid.dataItem(grid.select());
                        var AccNm = selectedItem.AccNm;
                        CheckAccNameExist(AccNm);
                    });
                    var input = arg.container.find("input");
                    input.select();
                },
                editable: true
            });
    //createFilterRow();

    $("#Maingrid .k-grid-content")
        .on("change",
            "input.isDefault",
            function (arg) {
                var Maingrid = $("#Maingrid").data("kendoGrid");
                dataItem = Maingrid.dataItem($(arg.target).closest("tr"));
                dataItem.set("isDefault", this.checked);
                if (dataItem.isDefault) {
                    dataItem.set("isDefault", true);
                    dataItem.dirty = true;
                } else {
                    dataItem.set("isDefault", false);
                    dataItem.dirty = true;
                }
            });
    $("#Maingrid .k-grid-content")
        .on("change",
            "input.isLeaf",
            function (arg) {
                var Maingrid = $("#Maingrid").data("kendoGrid");
                dataItem = Maingrid.dataItem($(arg.target).closest("tr"));
                dataItem.set("isLeaf", this.checked);
                if (dataItem.isLeaf) {
                    dataItem.set("isLeaf", true);
                    dataItem.dirty = true;
                } else {
                    dataItem.set("isLeaf", false);
                    dataItem.dirty = true;
                }
            });
    $("#Maingrid .k-grid-content")
        .on("change",
            "input.isCredit",
            function (arg) {
                var Maingrid = $("#Maingrid").data("kendoGrid");
                dataItem = Maingrid.dataItem($(arg.target).closest("tr"));
                dataItem.set("isCredit", this.checked);
                if (dataItem.isCredit) {
                    dataItem.set("isCredit", true);
                    dataItem.dirty = true;
                } else {
                    dataItem.set("isCredit", false);
                    dataItem.dirty = true;
                }
            });
    $("#Maingrid .k-grid-content")
        .on("change",
            "input.isAct",
            function (arg) {
                var Maingrid = $("#Maingrid").data("kendoGrid");
                dataItem = Maingrid.dataItem($(arg.target).closest("tr"));
                dataItem.set("isAct", this.checked);
                if (dataItem.isAct) {
                    dataItem.set("isAct", true);
                    dataItem.dirty = true;
                } else {
                    dataItem.set("isAct", false);
                    dataItem.dirty = true;
                }
            });
    $("#Maingrid .k-grid-content")
        .on("change",
            "input.isCusSup",
            function (arg) {
                var Maingrid = $("#Maingrid").data("kendoGrid");
                dataItem = Maingrid.dataItem($(arg.target).closest("tr"));
                dataItem.set("isCusSup", this.checked);
                if (dataItem.isCusSup) {
                    dataItem.set("isCusSup", true);
                    dataItem.dirty = true;
                } else {
                    dataItem.set("isCusSup", false);
                    dataItem.dirty = true;
                }
            });
    $("#Maingrid .k-grid-content")
        .on("change",
            "input.isAlwTrn",
            function (arg) {
                var Maingrid = $("#Maingrid").data("kendoGrid");
                dataItem = Maingrid.dataItem($(arg.target).closest("tr"));
                dataItem.set("isAlwTrn", this.checked);
                if (dataItem.isAlwTrn) {
                    dataItem.set("isAlwTrn", true);
                    dataItem.dirty = true;
                } else {
                    dataItem.set("isAlwTrn", false);
                    dataItem.dirty = true;
                }
            });


}

function GridOnDataBound(arg) {

    var grid = $("#Maingrid").data("kendoGrid");
    $(grid.tbody)
        .on("click",
            "td",
            function (arg) {

                var row = $(this).closest("tr");
                grid.select(row);
                var rowIdx = $("tr", grid.tbody).index(row);
                var colIdx = $("td", row).index(this);
                var columnName = $("#Maingrid").data("kendoGrid").columns[colIdx].field;
                if (colIdx == 18 || columnName == "Address") {
                    var selectedItem = grid.dataItem(grid.select());
                    ////   var Cky = selectedItem.CKy1;
                    var Accd = selectedItem.AccCd;
                    var AccNm = selectedItem.AccNm;
                    var MultiAdd = selectedItem.MultyadrTypNm;
                    var code = selectedItem.code;
                    var AccKy = selectedItem.AccKy;
                    var MultiAddKy = selectedItem.MultiAdrTypKy;
                    var AccTypname = selectedItem.AccTypNm

                    if (AccTypname == "Bank") {
                        BankDetailsWindow(AccKy, Accd, AccNm);
                    } else {
                        GetAddressWindow(Accd, AccNm, MultiAdd, code, AccKy, MultiAddKy);

                    }


                }

                if (colIdx == 19 || columnName == "Credit") {
                    //   alert();

                    var selectedItem = grid.dataItem(grid.select());
                    ////   var Cky = selectedItem.CKy1;
                    var AccdCr = selectedItem.AccCd;
                    var AccNmCr = selectedItem.AccNm;
                    var AccKyCr = selectedItem.AccKy;
                    var AccKy = selectedItem.AccKy;

                    GetCreditWindow(AccdCr, AccNmCr, AccKyCr, AccKy);

                }
                //if (columnName == "BankDetails") {
                //    var selectedItem = grid.dataItem(grid.select());                   
                //    var AccKy = selectedItem.AccKy;
                //    var AccCode= selectedItem.AccCd;
                //    var AccName = selectedItem.AccNm;

                //    BankDetailsWindow(AccKy, AccCode, AccName);

                //}

            });

}

//filter

//function createFilterRow() {
//    var grid = $("#Maingrid").data("kendoGrid");

//    var oldRow = grid.thead.find("#grid-filter-row");
//    var th;

//    if (typeof oldRow === "object") {
//        th = oldRow.find("th");
//        oldRow.remove();
//    }

//    var filterRow = "<tr id='grid-filter-row'>";

//    for (var i = 0; i < grid.dataSource.group().length; i++) {
//        filterRow += '<th class="k-group-cell k-header">&nbsp;</th>';
//    }
//    for (var i = 0; i < th.length; i++) {
//        filterRow += th[i].outerHTML;
//    }
//    for (var i = 0; i < grid.columns.length; i++) {
//        if (!grid.columns[i].hidden)
//            filterRow += "<td><input type='search' id='gridId-filter-column-" +
//                grid.columns[i].field +
//                "' style='width:98%' /></td>";
//    }
//    filterRow += "</tr>";
//    grid.thead.append(filterRow);

//    var searchField;
//    for (i = 0; i < grid.columns.length; i++) {
//        if (!grid.columns[i].hidden) {
//            searchField = $("#gridId-filter-column-" + grid.columns[i].field);
//            searchField.change({ index: i },
//                function(arg) {
//                    var grid = $("#Maingrid").data("kendoGrid");
//                    updateSearchFilters(grid, grid.columns[arg.data.index].field, "contains", this.value);
//                });
//        }
//    }
//}

//function updateSearchFilters(grid, field, operator, value) {
//    var newFilter = { field: field, operator: operator, value: value };
//    var dataSource = grid.dataSource;
//    var filters = null;
//    if (dataSource.filter() != null) {
//        filters = dataSource.filter().filters;
//    }
//    if (filters == null) {
//        filters = [newFilter];
//    } else {
//        var isNew = true;
//        var index = 0;
//        for (index = 0; index < filters.length; index++) {
//            if (filters[index].field == field) {
//                isNew = false;
//                break;
//            }
//        }
//        if (isNew) {
//            filters.push(newFilter);
//        } else {

//            if (value == "")
//                filters.splice(index, 1);

//            else
//                filters[index] = newFilter;
//        }
//    }
//    dataSource.filter(filters);
//}

function SetHomeCurKy(model) {
    var Ky;

    $.ajax({
        url: UrlSethomeCurrency, //'@Url.Content("~/ManageAllAccount/Curency_Drop")',
        dataType: "json",
        type: "POST",
        success: function (data) {
            model.set("CrnKy", data[0].Cdky);
            model.set("CrnNm", data[0].code);

        },
        error: function (arg) {

        }
    });


}


//showing the popupAdress css #PopUpForAddress is id

function GetAddressWindow(Accd, AccNm, MultiAdd, code, AccKy, MultiAddKy) {

    $("#PopUpForAddress")
        .show()
        .kendoWindow({
            width: "1000px",
            height: "550px",
            modal: true,
            visible: false,
            title: "Account Address"
        });

    $("#PopUpForAddress").data("kendoWindow").center().open();

    LoadadresGrid();
    LoadAllAddress(AccKy);
    document.getElementById("AccCdAdr").value = Accd;
    document.getElementById("AccNmAdr").value = AccNm;
    document.getElementById("AdrMultiAdrsTyp").value = MultiAdd;
    //document.getElementById("MultiAdrsCde").value = code;
    document.getElementById("AccKy").value = AccKy;
    document.getElementById("MultiAdrsKy").value = MultiAddKy;

    //   $("#PopUpForAddress").parent().find(".k-window-action").css("visibility", "hidden");


}


function GetCreditWindow(AccdCr, AccNmCr, AccKyCr, AccKy) {

    $("#PopUpForCredit")
        .show()
        .kendoWindow({
            width: "1000px",
            height: "550px",
            modal: true,
            visible: false,
            title: "Account Credit "
        });

    $("#PopUpForCredit").data("kendoWindow").center().open();

    LoadCredit(AccKy);

    document.getElementById("AccKyCredit").value = AccKy;
    document.getElementById("AccCdCredit").value = AccdCr;
    document.getElementById("AccNmCredit").value = AccNmCr;

    //    $("#PopUpForCredit").parent().find(".k-window-action").css("visibility", "hidden");


}

//BankDetails
function BankDetailsWindow(AccKy, AccCode, AccName) {

    $("#PopUpBankDetails").show().kendoWindow({
        width: "1000px",
        height: "550px",
        modal: true,
        visible: false,
        title: "Bank Details",
        actions: [
            "Close"
        ],
        close: onClose
    }).data("kendoWindow").center().open();
    document.getElementById("BankAccKy").value = AccKy;
    document.getElementById("BankAccCd").value = AccCode;
    document.getElementById("BankAccNm").value = AccName;
    LoadBankDetails(AccKy);
    // $("#PopUpBankDetails").parent().find(".k-window-action").css("visibility", "hidden");
}



function deleteme(key) {
    var DelaccKy = key;
    var answer = confirm("Confirm to delete this record");
    if (answer) {
        $.ajax({
            url: UrlDeleteRecord, // '@Url.Content("~/ManageAllAccount/DeleteDetail")',
            dataType: "json",
            type: "POST",
            data: {
                'AccKy': DelaccKy,
            },
            success: function (data) {
                // alert(data);
                if (data == true) {
                    alert("Account Deleted");
                    // GridDefaultColumns();
                    HTNPaginationCtrlLoadWithDataGrid();
                    //LoadGrid();
                } else {
                    alert("Account not Deleted");
                }


            },
            error: function (arg) {

            }
        });
    }
}


//Delete Event on Del buttom
//$("#Maingrid")
//    .on("keydown",
//        function (event) {
//            if ((event.keyCode == 46) || (event.which == 46)) {
//                var entityGrid = $("#Maingrid").data("kendoGrid");
//                var selectedItem = entityGrid.dataItem(entityGrid.select());
//                var TempaccKy = selectedItem.AccKy;
//                deleteme(TempaccKy);
//            }

//        });


function Save() {
    var grid = $("#Maingrid").data("kendoGrid");
    var currentData = grid.dataSource.data();
    var updatedRecords = [];
    var newRecords = [];
    for (var i = 0; i < currentData.length; i++) {

        if (currentData[i].isNew() && currentData[i].CrnKy !== null) {
            newRecords.push(currentData[i].toJSON());

        } else if (currentData[i].dirty && currentData[i].CrnKy !== null) {
            updatedRecords.push(currentData[i].toJSON());
        }
    }
    //var tempSAveChech = true;
    ////this records are deleted
    //var deletedRecords = [];
    //for (var i = 0; i < grid.dataSource._destroyed.length; i++) {
    //    deletedRecords.push(grid.dataSource._destroyed[i].toJSON());
    //}

    ////When I wrote this, only God and I understood what I was doing
    ////Now, God only knows :P
    //newrec:
    //    for (var i = 0; i < newRecords.length; i++) {
    //        var tempAccCd = newRecords[i].AccCd;
    //        var tempCount = 0;
    //        all:
    //            for (var j = 0; j < currentData.length; j++) {

    //                if (currentData[j].AccCd === tempAccCd) {
    //                    tempCount++;
    //                    //  alert(tempCount);
    //                    if (tempCount >= 2) {

    //                        tempSAveChech = false;

    //                        alert("Existing Account code: please change Account Code - " + tempAccCd);

    //                        break newrec;
    //                    }

    //                }


    //            }


    //    }
    ////When I wrote this, only God and I understood what I was doing
    ////Now, God only knows :P
    //var updatestatus = true;
    //var tempupcount = 0;
    //loop:
    //    for (var i = 0; i < updatedRecords.length; i++) {
    //        var tempAccCd = updatedRecords[i].AccCd;
    //        for (var j = 1; j < currentData.length; j++) {
    //            if (currentData[j].AccCd == tempAccCd) {
    //                tempupcount = tempupcount + 1;
    //                //    alert(tempupcount);
    //                if (tempupcount >= 2) {

    //                    updatestatus = false;
    //                    alert("Existing Account code: please change Account Code -" + tempAccCd);
    //                    break loop;
    //                }


    //            }


    //        }


    //    }
    var FirstRow = $("#Maingrid").data().kendoGrid.dataSource.data()[0];

    if (FirstRow.AccCd) {
        if (FirstRow.AccNm) {
            if (FirstRow.AccTypKy && FirstRow.AccTypKy != 1) {
                if (FirstRow.CrnKy && FirstRow.CrnKy != 1) {
                    if (newRecords.length != 0 || updatedRecords.length != 0) {

                        if (CheckAccNameExist() && CheckAccountExist()) {
                            //ajax for unsert update and delete
                            $.ajax({
                                url: UrlInsertUpdateAccMass, //"@Url.Content("~/ManageAllAccount/InsertDetail")",
                                data: JSON.stringify({
                                    updateAccmacc: kendo.stringify(updatedRecords),
                                    newAccmacc: kendo.stringify(newRecords),


                                }),
                                contentType: "application/json; charset=utf-8",
                                dataType: "Json",
                                type: "POST",
                                success: function (data) {

                                    if (data == true) {
                                        alert("Successfully Saved..!");
                                        HTNPaginationCtrlLoadWithDataGrid();
                                        // GridDefaultColumns();

                                        //oadGrid();
                                    } else {
                                        alert("Record Not Saved");
                                        HTNPaginationCtrlLoadWithDataGrid();
                                        // GridDefaultColumns();

                                        //LoadGrid();
                                    }


                                },
                                error: function (arg) {
                                    return false;
                                }
                            });


                        }


                    }
                } else {
                    alert("Please insert a currency");
                }
            } else {
                alert("Please insert An Account Type");

            }
        } else {
            alert("Please insert An Account Name");
        }
    } else {
        alert("Please insert An Account Code");
    }



}


function GridDefaultColumns() {

    var columnsDefine = [
        { field: "Lino", title: "Lino", width: "40px" },
        { field: "CKy1", title: "Company Key", width: "70px", hidden: "true", },
        {
            field: "AccCd",
            title: "Account Code",
            width: "100px"
        },
        { field: "AccKy", title: "Acc Key", width: "70px", hidden: "true", },
        { field: "AccNm", title: "Account name", width: "150px" },
        {
            field: "AccTypNm",
            title: "Account Types",
            width: "100px",

            editor: function (container, options) {
                var model = options.model;
                $('<input id="cmbaccType" name="' + options.field + '"/>')
                    .appendTo(container)
                    .kendoComboBox({
                        dataSource: {
                            type: "POST",
                            transport: {
                                read: UrlAccTyps, //'@Url.Content("~/ManageAllAccount/Load_Drop")'
                            }
                        },
                        change: function (arg) {

                            combo = arg.sender;
                            selectedItm = combo.select();
                            dataItem = combo.dataItem(selectedItm);
                            var validate = ComboValidations("cmbaccType");

                            if (validate) {
                                if (dataItem.code == "Bank") {
                                    kendo.alert("Enter Relevent Bank Details in Adderess Column");
                                    //model.set("AccTypNm", "");
                                    //return;
                                }
                                model.set("AccTypKy", dataItem.Cdky);
                                model.set("AccTypNm", dataItem.code);
                                var grid = $("#Maingrid").data("kendoGrid");
                                // Get selected item
                                var sel = grid.select();
                                // Get the item
                                var item = grid.dataItem(sel);
                                // Get the index in the DataSource (not in current page of the grid)


                                var idx = grid.dataSource.indexOf(item);
                                if (idx == 0) {
                                    model.set("SO", 1);
                                    model.set("isAct", true);
                                    model.set("isLeaf", false);
                                    model.set("isAlwTrn", true);
                                }

                                SetHomeCurKy(model);
                                //addSo();
                            } else {
                                model.set("AccTypKy", 1);
                                model.set("AccTypNm", "");
                            }


                        },
                        //when the user gonna add a new record, combo should automatically bind the values from the Filter
                        filter: "startswith",
                        dataValueField: "Cdky",
                        dataTextField: "code"
                    });
            }
        },
        {
            field: "AccTypKy",
            title: "Account Type Code",
            width: "70px",
            hidden: "true",

            editor: function (container, options) {
                var model = options.model;
                $('<input id="cmbAccTypKy" name="' + options.field + '"/>')
                    .appendTo(container)
                    .kendoComboBox({
                        dataSource: {
                            type: "POST",
                            transport: {
                                read: UrlAccTyps //'@Url.Content("~/ManageAllAccount/Load_Drop")'
                            }
                        },
                        change: function (arg) {


                        },
                        //when the user gonna add a new record, combo should automatically bind the values from the Filter

                        dataValueField: "Cdky",
                        dataTextField: "CdNm"
                    });
            }
        },
        {
            field: "CrnNm",
            title: "Currency",
            width: "70px",
            editor: function (container, options) {
                var model = options.model;
                $('<input id="cmbcrnType" name="' + options.field + '"/>')
                    .appendTo(container)
                    .kendoComboBox({
                        dataSource: {
                            type: "POST",
                            transport: {
                                read: UrlCurrency // '@Url.Content("~/ManageAllAccount/Curency_Drop")'
                            }
                        },
                        change: function (arg) {

                            combo = arg.sender;
                            selectedItm = combo.select();
                            dataItem = combo.dataItem(selectedItm);
                            var validate = ComboValidations("cmbcrnType");

                            if (validate) {
                                model.set("CrnNm", dataItem.CdNm);
                                model.set("CrnKy", dataItem.Cdky);
                            } else {
                                model.set("CrnNm", 1);
                                model.set("CrnKy", "");
                            }


                        },
                        //when the user gonna add a new record, combo should automatically bind the values from the Filter
                        filter: "startswith",
                        dataValueField: "Cdky",
                        dataTextField: "CdNm"
                    });
            }
        },
        {
            field: "CrnKy",
            title: "Curency Key",
            width: "70px",
            hidden: "true",

            editor: function (container, options) {
                var model = options.model;
                $('<input id="cmbCrnTypKy" name="' + options.field + '"/>')
                    .appendTo(container)
                    .kendoComboBox({
                        dataSource: {
                            type: "POST",
                            transport: {
                                read: UrlCurrency // '@Url.Content("~/ManageAllAccount/Curency_Drop")'
                            }
                        },
                        change: function (arg) {


                        },
                        //when the user gonna add a new record, combo should automatically bind the values from the Filter

                        dataValueField: "Cdky",
                        dataTextField: "CdNm"
                    });
            }
        },
        //buky strt
        {
            field: "BuNm",
            title: "BU",
            width: "150px",
            editor: function (container, options) {
                var model = options.model;
                $('<input id="cmbbuType" name="' + options.field + '"/>')
                    .appendTo(container)
                    .kendoComboBox({
                        dataSource: {
                            type: "POST",
                            transport: {
                                read: UrlBuList // '@Url.Content("~/ManageAllAccount/Buxdrop")'
                            }
                        },
                        change: function (arg) {

                            combo = arg.sender;
                            selectedItm = combo.select();
                            dataItem = combo.dataItem(selectedItm);
                            var validate = ComboValidations("cmbbuType");

                            if (validate) {
                                model.set("BUKy", dataItem.Cdky);
                                model.set("BuNm", dataItem.CdNm);
                            } else {
                                model.set("BUKy", 1);
                                model.set("BuNm", "");
                            }


                        },
                        //when the user gonna add a new record, combo should automatically bind the values from the Filter
                        filter: "startswith",
                        dataValueField: "Cdky",
                        dataTextField: "CdNm"
                    });
            }
        },
        {
            field: "BUKy",
            title: "BusinessUnit Key",
            width: "70px",
            hidden: "true",

            editor: function (container, options) {
                var model = options.model;
                $('<input id="cmbbuTypeky" name="' + options.field + '"/>')
                    .appendTo(container)
                    .kendoComboBox({
                        dataSource: {
                            type: "POST",
                            transport: {
                                read: UrlBuList // '@Url.Content("~/ManageAllAccount/Buxdrop")'
                            }
                        },
                        change: function (arg) {


                        },
                        //when the user gonna add a new record, combo should automatically bind the values from the Filter

                        dataValueField: "Cdky",
                        dataTextField: "CdNm"
                    });
            }
        },
        {
            field: "isDefault",
            template: '<input type="checkbox" #= isDefault ? "checked=checked" : "" # class="isDefault"/ >',
            title: "is Default",
            width: "70px",
            attributes: { style: "text-align:Center;" }
        },
        { field: "SO", title: "Sort Order", width: "70px", hidden: "true" },
        {
            field: "ParentNm",
            title: "Parent Account",
            width: "100px",
            editor: function (container, options) {
                var model = options.model;
                $('<input id="cmbprntType" name="' + options.field + '"/>')
                    .appendTo(container)
                    .kendoComboBox({
                        dataSource: {
                            type: "POST",
                            transport: {
                                read: UrlParentAcc, // '@Url.Content("~/ManageAllAccount/Prnt")'
                            }
                        },
                        change: function (arg) {

                            combo = arg.sender;
                            selectedItm = combo.select();
                            dataItem = combo.dataItem(selectedItm);
                            var validate = ComboValidations("cmbprntType");

                            if (validate) {
                                model.set("ParentNm", dataItem.AccCd);
                                model.set("ParentKey", dataItem.AccKy);
                            } else {
                                model.set("ParentKey", 1);
                                model.set("ParentNm", "");
                            }


                        },
                        //when the user gonna add a new record, combo should automatically bind the values from the Filter
                        filter: "startswith",
                        dataValueField: "AccKy",
                        dataTextField: "AccCd"
                    });
            }
        },
        {
            field: "ParentKey",
            title: "Prnt Key",
            width: "70px",
            hidden: "true",

            editor: function (container, options) {
                var model = options.model;
                $('<input id="cmbprntKyType" name="' + options.field + '"/>')
                    .appendTo(container)
                    .kendoComboBox({
                        dataSource: {
                            type: "POST",
                            transport: {
                                read: UrlParentAcc // '@Url.Content("~/ManageAllAccount/Prnt")'
                            }
                        },
                        change: function (arg) {


                        },
                        //when the user gonna add a new record, combo should automatically bind the values from the Filter

                        dataValueField: "AccKy",
                        dataTextField: "AccCd"
                    });
            }
        },
        {
            field: "isLeaf",
            template: '<input type="checkbox" #= isLeaf ? "checked=checked" : "" # class="isLeaf" ></input>',
            title: "isParent",
            width: "70px",
            attributes: { style: "text-align:Center;" }
        },
        {
            field: "MultiAdrTypKy",
            title: "Multi Adress",
            width: "70px",
            hidden: true,


            editor: function (container, options) {
                var model = options.model;
                $('<input id="cmbMultiAdrTypKy" name="' + options.field + '"/>')
                    .appendTo(container)
                    .kendoComboBox({
                        dataSource: {
                            type: "POST",
                            transport: {
                                read: UrlAddressTyp //'@Url.Content("~/ManageAllAccount/MultiDrop")'
                            }
                        },
                        change: function (arg) {


                        },
                        //when the user gonna add a new record, combo should automatically bind the values from the Filter

                        dataValueField: "Cdky",
                        dataTextField: "code"
                    });
            }
        },

        //muliti drop
        {
            field: "MultyadrTypNm",
            title: "Multi Address",
            width: "100px",
            editor: function (container, options) {
                var model = options.model;
                $('<input id="cmbMultiDropType" name="' + options.field + '"/>')
                    .appendTo(container)
                    .kendoComboBox({
                        dataSource: {
                            type: "POST",
                            transport: {
                                read: UrlAddressTyp // '@Url.Content("~/ManageAllAccount/MultiDrop")'
                            }
                        },


                        change: function (arg) {

                            combo = arg.sender;
                            selectedItm = combo.select();
                            dataItem = combo.dataItem(selectedItm);
                            var validate = ComboValidations("cmbMultiDropType");

                            if (validate) {
                                model.set("MultyadrTypNm", dataItem.code);
                                model.set("MultiAdrTypKy", dataItem.Cdky);

                            } else {
                                model.set("MultyadrTypNm", 1);
                                model.set("MultiAdrTypKy", "");
                            }


                        },
                        //when the user gonna add a new record, combo should automatically bind the values from the Filter
                        filter: "startswith",
                        dataValueField: "Cdky",
                        dataTextField: "code"
                    });
            }
        },

        //end multi drop
        { field: "Address", title: "Address", width: "150px" },
        { field: "Credit", title: "Credit", width: "150px" },
        {
            field: "isCredit", hidden: "true",
            template: '<input type="checkbox" #= isCredit? "checked=checked" : "" # class="isCredit" ></input>',
            title: "is Credit",
            width: "50px",
            attributes: { style: "text-align:Center;" }
        },
        {
            field: "isAlwTrn",
            template:
                '<input type="checkbox" #= isAlwTrn? "checked=checked" : "" # class="isAlwTrn"  ></input>',
            title: "is Alw Transaction",
            width: "50px",
            attributes: { style: "text-align:Center;" }
        },
        {
            field: "isAct",
            template: '<input type="checkbox" #= isAct? "checked=checked" : "" # class="isAct" ></input>',
            title: "is Active",
            width: "50px",
            attributes: { style: "text-align:Center;" }
        },
        {
            field: "isCusSup",
            template: '<input type="checkbox" #= isCusSup ? "checked=checked" : "" # class="isCusSup"></input>',
            title: "is Customer/Supplier",
            width: "50px",
            attributes: { style: "text-align:Center;" }
        },
        { field: "Note", title: "Note", width: "50px" },
        { field: "IsSysRec", title: "IsSysRec", width: "50px", hidden: true },
        {
            field: "isBgt",
            template: '<input type="checkbox" #= isBgt ? "checked=checked" : "" # class="isBgt"/ >',
            title: "is Bgt",
            width: "70px",
            attributes: { style: "text-align:Center;" }
        },
        { field: "AccCat1Ky", title: "AccCat1Ky", width: "70px" },// hidden: "true",
        {
            field: "AccCat1Code", title: "AccCat1Code", width: "70px",
            editor: function (container, options) {
                var model = options.model;
                $('<input id="AccCat1Code" name="' + options.field + '"/>')
                    .appendTo(container)
                    .kendoComboBox({
                        dataValueField: "CdKy",
                        dataTextField: "Code",
                        dataSource: CdMasCd('AccCat1Code'),
                        change: function (arg) {
                            combo = arg.sender;
                            selectedItm = combo.select();
                            dataItem = combo.dataItem(selectedItm);
                            var validate = ComboValidations("AccCat1Code");
                            if (validate) {
                                model.set("AccCat1Ky", dataItem.CdKy);
                                model.set("AccCat1Code", dataItem.Code);

                                //model.set("AccCat1Code", );


                            } else {
                                model.set("AccCat1Ky", 1);
                                model.set("AccCat1Code", "");
                            }

                        },
                        filter: "startswith",
                        suggest: true,
                        placeholder: "Select a AccCat1 Code"
                    });
            }
        },
        {
            field: "AccCat1Name", title: "AccCat1Name", width: "70px",
            editor: function (container, options) {
                var model = options.model;
                $('<input id="AccCat1Name" name="' + options.field + '"/>')
                    .appendTo(container)
                    .kendoComboBox({
                        dataValueField: "CdKy",
                        dataTextField: "Name",
                        dataSource: CdMasName('AccCat1Name'),
                        change: function (arg) {
                            combo = arg.sender;
                            selectedItm = combo.select();
                            dataItem = combo.dataItem(selectedItm);
                            var validate = ComboValidations("AccCat1Name");
                            if (validate) {
                                model.set("AccCat1Ky", dataItem.CdKy);
                                model.set("AccCat1Name", dataItem.Name);

                            } else {
                                model.set("AccCat1Ky", 1);
                                model.set("AccCat1Name", "");
                            }

                        },
                        filter: "startswith",
                        suggest: true,
                        placeholder: "Select a AccCat1 Name"
                    });
            }
        },
        { field: "AccCat2Ky", title: "AccCat2Ky", width: "70px" },// hidden: "true",
        {
            field: "AccCat2Code", title: "AccCat2Code", width: "70px",
            editor: function (container, options) {
                var model = options.model;
                $('<input id="AccCat2Code" name="' + options.field + '"/>')
                    .appendTo(container)
                    .kendoComboBox({
                        dataValueField: "CdKy",
                        dataTextField: "Code",
                        dataSource: CdMasCd('AccCat2Code'),
                        change: function (arg) {
                            combo = arg.sender;
                            selectedItm = combo.select();
                            dataItem = combo.dataItem(selectedItm);
                            var validate = ComboValidations("AccCat2Code");
                            if (validate) {
                                model.set("AccCat2Ky", dataItem.CdKy);
                                model.set("AccCat2Code", dataItem.Code);

                            } else {
                                model.set("AccCat2Ky", 1);
                                model.set("AccCat2Code", "");
                            }

                        },
                        filter: "startswith",
                        suggest: true,
                        placeholder: "Select a AccCat2 Code"
                    });
            }
        },
        {
            field: "AccCat2Name", title: "AccCat2Name", width: "70px",
            editor: function (container, options) {
                var model = options.model;
                $('<input id="AccCat2Name" name="' + options.field + '"/>')
                    .appendTo(container)
                    .kendoComboBox({
                        dataValueField: "CdKy",
                        dataTextField: "Name",
                        dataSource: CdMasName('AccCat2Name'),
                        change: function (arg) {
                            combo = arg.sender;
                            selectedItm = combo.select();
                            dataItem = combo.dataItem(selectedItm);
                            var validate = ComboValidations("AccCat2Name");
                            if (validate) {
                                model.set("AccCat2Ky", dataItem.CdKy);
                                model.set("AccCat2Name", dataItem.Name);

                            } else {
                                model.set("AccCat2Ky", 1);
                                model.set("AccCat2Name", "");
                            }

                        },
                        filter: "startswith",
                        suggest: true,
                        placeholder: "Select a AccCat2 Name"
                    });
            }
        },
        { field: "AccCat3Ky", title: "AccCat3Ky", width: "70px" },// hidden: "true",
        {
            field: "AccCat3Code", title: "AccCat3Code", width: "70px",
            editor: function (container, options) {
                var model = options.model;
                $('<input id="AccCat3Code" name="' + options.field + '"/>')
                    .appendTo(container)
                    .kendoComboBox({
                        dataValueField: "CdKy",
                        dataTextField: "Code",
                        dataSource: CdMasCd('AccCat3Code'),
                        change: function (arg) {
                            combo = arg.sender;
                            selectedItm = combo.select();
                            dataItem = combo.dataItem(selectedItm);
                            var validate = ComboValidations("AccCat3Code");
                            if (validate) {
                                model.set("AccCat3Ky", dataItem.CdKy);
                                model.set("AccCat3Code", dataItem.Code);

                            } else {
                                model.set("AccCat3Ky", 1);
                                model.set("AccCat3Code", "");
                            }

                        },
                        filter: "startswith",
                        suggest: true,
                        placeholder: "Select a AccCat3 Code"
                    });
            }
        },
        {
            field: "AccCat3Name", title: "AccCat3Name", width: "70px",
            editor: function (container, options) {
                var model = options.model;
                $('<input id="AccCat3Name" name="' + options.field + '"/>')
                    .appendTo(container)
                    .kendoComboBox({
                        dataValueField: "CdKy",
                        dataTextField: "Name",
                        dataSource: CdMasName('AccCat3Name'),
                        change: function (arg) {
                            combo = arg.sender;
                            selectedItm = combo.select();
                            dataItem = combo.dataItem(selectedItm);
                            var validate = ComboValidations("AccCat3Name");
                            if (validate) {
                                model.set("AccCat3Ky", dataItem.CdKy);
                                model.set("AccCat3Name", dataItem.Name);

                            } else {
                                model.set("AccCat1Ky", 1);
                                model.set("AccCat1Name", "");
                            }

                        },
                        filter: "startswith",
                        suggest: true,
                        placeholder: "Select a AccCat1 Name"
                    });
            }
        },
        { field: "AccCat4Ky", title: "AccCat4Ky", width: "70px" },// hidden: "true",
        {
            field: "AccCat4Code", title: "AccCat4Code", width: "70px",
            editor: function (container, options) {
                var model = options.model;
                $('<input id="AccCat4Code" name="' + options.field + '"/>')
                    .appendTo(container)
                    .kendoComboBox({
                        dataValueField: "CdKy",
                        dataTextField: "Code",
                        dataSource: CdMasCd('AccCat4Code'),
                        change: function (arg) {
                            combo = arg.sender;
                            selectedItm = combo.select();
                            dataItem = combo.dataItem(selectedItm);
                            var validate = ComboValidations("AccCat4Code");
                            if (validate) {
                                model.set("AccCat4Ky", dataItem.CdKy);
                                model.set("AccCat4Code", dataItem.Code);

                            } else {
                                model.set("AccCat4Ky", 1);
                                model.set("AccCat4Code", "");
                            }

                        },
                        filter: "startswith",
                        suggest: true,
                        placeholder: "Select a AccCat1 Code"
                    });
            }
        },
        {
            field: "AccCat4Name", title: "AccCat4Name", width: "70px",
            editor: function (container, options) {
                var model = options.model;
                $('<input id="AccCat4Name" name="' + options.field + '"/>')
                    .appendTo(container)
                    .kendoComboBox({
                        dataValueField: "CdKy",
                        dataTextField: "Name",
                        dataSource: CdMasName('AccCat4Name'),
                        change: function (arg) {
                            combo = arg.sender;
                            selectedItm = combo.select();
                            dataItem = combo.dataItem(selectedItm);
                            var validate = ComboValidations("AccCat4Name");
                            if (validate) {
                                model.set("AccCat4Ky", dataItem.CdKy);
                                model.set("AccCat4Name", dataItem.Name);

                            } else {
                                model.set("AccCat4Ky", 1);
                                model.set("AccCat4Name", "");
                            }

                        },
                        filter: "startswith",
                        suggest: true,
                        placeholder: "Select a AccCat1 Name"
                    });
            }
        },
        { field: "AccCat5Ky", title: "AccCat5Ky", width: "70px" },// hidden: "true",
        {
            field: "AccCat5Code", title: "AccCat5Code", width: "70px",
            editor: function (container, options) {
                var model = options.model;
                $('<input id="AccCat5Code" name="' + options.field + '"/>')
                    .appendTo(container)
                    .kendoComboBox({
                        dataValueField: "CdKy",
                        dataTextField: "Code",
                        dataSource: CdMasCd('AccCat5Code'),
                        change: function (arg) {
                            combo = arg.sender;
                            selectedItm = combo.select();
                            dataItem = combo.dataItem(selectedItm);
                            var validate = ComboValidations("AccCat5Code");
                            if (validate) {
                                model.set("AccCat5Ky", dataItem.CdKy);
                                model.set("AccCat5Code", dataItem.Code);

                            } else {
                                model.set("AccCat5Ky", 1);
                                model.set("AccCat5Code", "");
                            }

                        },
                        filter: "startswith",
                        suggest: true,
                        placeholder: "Select a AccCat5 Code"
                    });
            }
        },
        {
            field: "AccCat5Name", title: "AccCat5Name", width: "70px",
            editor: function (container, options) {
                var model = options.model;
                $('<input id="AccCat5Name" name="' + options.field + '"/>')
                    .appendTo(container)
                    .kendoComboBox({
                        dataValueField: "CdKy",
                        dataTextField: "Name",
                        dataSource: CdMasName('AccCat5Name'),
                        change: function (arg) {
                            combo = arg.sender;
                            selectedItm = combo.select();
                            dataItem = combo.dataItem(selectedItm);
                            var validate = ComboValidations("AccCat5Name");
                            if (validate) {
                                model.set("AccCat5Ky", dataItem.CdKy);
                                model.set("AccCat5Name", dataItem.Name);

                            } else {
                                model.set("AccCat5Ky", 1);
                                model.set("AccCat5Name", "");
                            }

                        },
                        filter: "startswith",
                        suggest: true,
                        placeholder: "Select a AccCat5 Name"
                    });
            }
        },
        { field: "AccCat6Ky", title: "AccCat6Ky", width: "70px" },// hidden: "true",
        {
            field: "AccCat6Code", title: "AccCat6Code", width: "70px",
            editor: function (container, options) {
                var model = options.model;
                $('<input id="AccCat6Code" name="' + options.field + '"/>')
                    .appendTo(container)
                    .kendoComboBox({
                        dataValueField: "CdKy",
                        dataTextField: "Code",
                        dataSource: CdMasCd('AccCat6Code'),
                        change: function (arg) {
                            combo = arg.sender;
                            selectedItm = combo.select();
                            dataItem = combo.dataItem(selectedItm);
                            var validate = ComboValidations("AccCat6Code");
                            if (validate) {
                                model.set("AccCat6Ky", dataItem.CdKy);
                                model.set("AccCat6Code", dataItem.Code);

                            } else {
                                model.set("AccCat6Ky", 1);
                                model.set("AccCat6Code", "");
                            }

                        },
                        filter: "startswith",
                        suggest: true,
                        placeholder: "Select a AccCat6 Code"
                    });
            }
        },
        {
            field: "AccCat6Name", title: "AccCat6Name", width: "70px",
            editor: function (container, options) {
                var model = options.model;
                $('<input id="AccCat6Name" name="' + options.field + '"/>')
                    .appendTo(container)
                    .kendoComboBox({
                        dataValueField: "CdKy",
                        dataTextField: "Name",
                        dataSource: CdMasName('AccCat6Name'),
                        change: function (arg) {
                            combo = arg.sender;
                            selectedItm = combo.select();
                            dataItem = combo.dataItem(selectedItm);
                            var validate = ComboValidations("AccCat6Name");
                            if (validate) {
                                model.set("AccCat6Ky", dataItem.CdKy);
                                model.set("AccCat6Name", dataItem.Name);

                            } else {
                                model.set("AccCat6Ky", 1);
                                model.set("AccCat6Name", "");
                            }

                        },
                        filter: "startswith",
                        suggest: true,
                        placeholder: "Select a AccCat1 Name"
                    });
            }
        },
        { field: "ItmCat2Ky", title: "ItmCat2Ky", width: "70px" },// hidden: "true",
        {
            field: "ItmCat2Code", title: "ItmCat2Code", width: "70px",
            editor: function (container, options) {
                var model = options.model;
                $('<input id="ItmCat2Code" name="' + options.field + '"/>')
                    .appendTo(container)
                    .kendoComboBox({
                        dataValueField: "CdKy",
                        dataTextField: "Code",
                        dataSource: CdMasCd('ItmCat2Code'),
                        change: function (arg) {
                            combo = arg.sender;
                            selectedItm = combo.select();
                            dataItem = combo.dataItem(selectedItm);
                            var validate = ComboValidations("ItmCat2Code");
                            if (validate) {
                                model.set("ItmCat2Ky", dataItem.CdKy);
                                model.set("ItmCat2Code", dataItem.Code);
                                //  alert(GetName("ItmCat2Name", dataItem.CdKy))
                                console.log(GetName("ItmCat2Name", dataItem.CdKy))
                                model.set("ItmCat2Name", "Testing");

                            } else {
                                model.set("ItmCat2Ky", 1);
                                model.set("ItmCat2Code", "");
                            }

                        },
                        filter: "startswith",
                        suggest: true,
                        placeholder: "Select a AccCat1 Code"
                    });
            }
        },
        {
            field: "ItmCat2Name", title: "ItmCat2Name", width: "70px",
            editor: function (container, options) {
                var model = options.model;
                $('<input id="ItmCat2Name" name="' + options.field + '"/>')
                    .appendTo(container)
                    .kendoComboBox({
                        dataValueField: "CdKy",
                        dataTextField: "Name",
                        dataSource: CdMasName('ItmCat2Name'),
                        change: function (arg) {
                            combo = arg.sender;
                            selectedItm = combo.select();
                            dataItem = combo.dataItem(selectedItm);
                            var validate = ComboValidations("ItmCat2Name");
                            if (validate) {
                                model.set("ItmCat2Ky", dataItem.CdKy);
                                model.set("ItmCat2Name", dataItem.Name);

                            } else {
                                model.set("ItmCat2Ky", 1);
                                model.set("ItmCat2Name", "");
                            }

                        },
                        filter: "startswith",
                        suggest: true,
                        placeholder: "Select a AccCat1 Name"
                    });
            }
        },
        {
            field: "AccessLvlKy", title: "AccessLvlKy", width: "70px", width: "70px"
        },// hidden: "true",
        {
            field: "AccessLvlCode", title: "AccessLvlCode", width: "70px",
            editor: function (container, options) {
                var model = options.model;
                $('<input id="AccessLvlCode" name="' + options.field + '"/>')
                    .appendTo(container)
                    .kendoComboBox({
                        dataValueField: "CdKy",
                        dataTextField: "Code",
                        dataSource: CdMasCd('AccessLvlCode'),
                        change: function (arg) {
                            combo = arg.sender;
                            selectedItm = combo.select();
                            dataItem = combo.dataItem(selectedItm);
                            var validate = ComboValidations("AccessLvlCode");
                            if (validate) {
                                model.set("AccessLvlKy", dataItem.CdKy);
                                model.set("AccessLvlCode", dataItem.Code);

                            } else {
                                model.set("AccessLvlKy", 1);
                                model.set("AccessLvlCode", "");
                            }

                        },
                        filter: "startswith",
                        suggest: true,
                        placeholder: "Select a AccessLvl Code"
                    });
            }
        },
        { field: "Alias", title: "Alias", width: "50px" }



    ];

    var gridNo = 1;
    var columnsFinal = setColumnProp(columnsDefine, ObjKy, '', 'Maingrid', gridNo);

}


////
//function keyDownTextField(arg) {
//    var keyCode = arg.keyCode;
//    if (keyCode == 107 || (arg.altKey && arg.keyCode == 78)) {
//        insertItem();
//    }
//}
$(document.body).keydown(function (e) {
    if (e.keyCode == 107 || (e.altKey && e.keyCode == 78)) {
        e.preventDefault();
        insertItem();
    }
});

function CheckAccountExist(AccCd) {


    var grid = $("#Maingrid").data("kendoGrid");
    var currentData = grid.dataSource.data();
    if (!AccCd) {
        AccCd = currentData[0].AccCd;
    }
    //var FirstLine = currentData[0].AccCd;
    var count = 0;
    for (var i = 0; i < currentData.length; i++) {
        if (currentData[i].AccCd == AccCd) {
            count += 1;
        }
    }

    if (count == 1) {
        return true;
    } else {
        alert("Existing Account Code Please Change the Account Code :- " + AccCd);


    }
}

function CheckAccNameExist(AccNm) {


    var grid = $("#Maingrid").data("kendoGrid");
    var currentData = grid.dataSource.data();
    if (!AccNm) {
        AccNm = currentData[0].AccNm;
    }
    // var FirstLine = currentData[0].AccNm;

    var count = 0;
    for (var i = 0; i < currentData.length; i++) {
        if (currentData[i].AccNm == AccNm) {
            count += 1;
        }
    }


    if (count == 1) {
        return true;
    } else {
        alert("Existing Account Name Please Change the Account Name :- " + AccNm);
    }
}

function HTNPaginationCtrlLoadWithDataGrid() {
    GridDefaultColumns();
}

//____BU data source
function CdMasCd(ObjNm) {
    var ObjKy = GetObjKy(ObjNm);
    var PreKy = 1;
    var dataSource = new kendo.data.DataSource(
        {
            transport: {
                read: {
                    url: CdMasCode,
                    data: {
                        'ObjKy': ObjKy,
                        'PreKy': PreKy,
                    },
                    dataType: "json",
                    cache: false
                }
            }

        });
    return dataSource;
}

function CdMasName(ObjNm) {
    var ObjKy = GetObjKy(ObjNm);
    var PreKy = 1;
    var dataSource = new kendo.data.DataSource(
        {
            transport: {
                read: {
                    url: CdMasNm,
                    data: {
                        'ObjKy': ObjKy,
                        'PreKy': PreKy,
                    },
                    dataType: "json",
                    cache: false
                }
            }

        });
    return dataSource;
}

function GetName(ObjNm, CdKy) {
    var Name = ""
    var ObjKy = GetObjKy(ObjNm);
    $.ajax({
        url: CdMasNm,
        data: JSON.stringify({
            ObjKy: ObjKy,
            PreKy: '1'

        }),
        contentType: "application/json; charset=utf-8",
        dataType: "Json",
        type: "POST",
        success: function (data) {
            for (var i = 0; i < data.length; i++) {
                if (data[i].CdKy == CdKy) {
                    //   console.log("For n"+data[i].Name);
                    Name = data[i].Name;
                }
            }
        }
    });

    return Name;
}

$("#HdrSec1_InptAccCd_Val").keypress(function (event) {

    var keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode == '13') {
        HTNPaginationCtrlLoadWithDataGrid();
    }
});

$("#HdrSec1_InptAccNm_Val").keypress(function (event) {

    var keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode == '13') {
        HTNPaginationCtrlLoadWithDataGrid();
    }

});