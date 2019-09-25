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
    setTimeout(setHdrSectionPropFun, 2000);
    LoadCombo();

    $("#GridWin").show();
    LoadGridView();

}

function setHdrSectionPropFun() {

    // ---------- Set ObjProperties
    setHdrSectionProp('', viewBag.ObjKy, '', 'HdrSec1');

    SetHandlingEnterKeyEvent('', viewBag.ObjKy);
    SetFirstFocusObj();
}

function CancelGridItem() {
    var grid = $("#Grid").data("kendoGrid");
    grid.cancelChanges();
}


$("#btnLoadItem").click(function () {

    LoadGridView();
    //$("#GridWin").show();
});


function LoadCombo() {

    $("#HdrSec1_CmbCompany_Cd").kendoComboBox({
        dataValueField: "CKy",
        dataTextField: "CNm",
        dataSource: GetCompany_LookUpWebs(),
        filter: "contains",
        suggest: true,
        placeholder: "Select Company.."
    });

}

function GetCompany_LookUpWebs() {
    //alert(1);
    var dataSource = new kendo.data.DataSource(
      {
          transport: {
              read: {
                  url: urlGetCompany_LookUpWeb, //'@Url.Content("~/Login/GetComNm")',
                  dataType: "json"
              }
          }
      });
    // alert(2);
    return dataSource;
}


//$('#HdrSec1_ChkboxApplyAll_Val').click(function () {
//    //if ($('#HdrSec1_ChkboxApplyAll_Val').attr('checked', true)) {
//        //var Vat = $("#HdrSec1_CmbVat_Cd").data('kendoComboBox').value();
//    // var txtVat = $('#HdrSec1_CmbVat_Cd ').data('kendoComboBox').text();
//    var $cb = $(this);
//    var checked = $cb.is(':checked');
//    //var checked = $('#HdrSec1_ChkboxApplyAll_Val').attr('checked', true);
//    var grid = $("#Grid").data("kendoGrid");
//    var page = grid.dataSource.page();
//    var length = $('#Grid table tr[role=row]').length;
//        for (var i = 1; i < length; i++) {
//            $("#Grid").data("kendoGrid").dataSource.data()[i - 1].isAlwAcs = checked;
//            $("#Grid tbody input:checkbox").attr("checked", this.checked);
//            //$($($('#Grid table tr[role=row]')[i]).find("td")[1]).checked = checked;
//            $("#Grid").data("kendoGrid").dataSource.data()[i - 1].dirty = true;
//        }
//        alert(1);
//        //$("#ItmTaxGrid").data("kendoGrid").dataSource.sync();
//    //}
//    //else {
//    //}
//})


function LoadGridView() {

    var Menucolumns = [
            {
                field: "ObjKy", title: "ObjKy", width: "10px", hidden: true, attributes: { style: "text-align:center;" },
                filterable: {
                    cell: {
                        showOperators: false
                    }
                },
            },

            {
                field: "UsrObjKy", title: "UsrObjKy", width: "100px", hidden: true, attributes: { style: "text-align:center;" },
                filterable: {
                    cell: {
                        showOperators: false
                    }
                },
            },
        {
            field: "ObjCaptn", title: "Menu Items", width: "200px", attributes: { style: "text-align:center;" },
            filterable: {
                cell: {
                    operator: "contains",
                    suggestionOperator: "contains"
                }
            },

        },
                {
                    field: "isAlwAcs",
                    title: "Allow Permission(s)", filterable: false, sortable: false,
                    //template: '<input type="checkbox"  #= isAlwAcs? checked="checked" : "" # class="inpchk" id="aa"></input>',
                    //headerTemplate: '<label>Allow Permission(s) <input type="checkbox" id="chkSelectAll" /></label>',
                    //template: "<input class='inpchk' type='checkbox'/>",
                    //title: "<input type='checkbox' id='chkSelectAll' />", //onchange='SelectAll();'
                    template: "<input type=\"checkbox\"   #= isAlwAcs ? checked='checked' : '' #  class=\"check_row\"/>" ,
                    headerTemplate: '<label>  <input type="checkbox" id="checkAll"/> Allow Permission for ALL</label>',                  
                
                    width: "100px",
                    attributes: { style: "text-align:center;" },
                    filterable:true,
                },

    ];
    var gridNo = 1;
    var FinalItmColumn = setColumnProp(Menucolumns, viewBag.ObjKy, '', 'FrmGrd', gridNo)


    //$('.check_row').on('click', function (e) {

    //    var $cb = $(this);
    //    var checked = $cb.is(':checked');
    //    setValueToGridData(checked);
    //});

    //$("#checkAll").on('click', function (e) {

    //    var $cb = $(this);
    //    var checked = $cb.is(':checked');
    //    setValueToGridData(checked);
    //    var grid = $('#Grid').data('kendoGrid');
    //    grid.table.find("tr").find("td:last input").attr("checked", checked);

    //    //now making all the rows value to 1 or 0
    //    var items = $("#Grid").data("kendoGrid").dataSource.data();
    //    for (i = 0; i < items.length; i++) {
    //        var item = items[i];
    //        item.set('isAlwAcs', checked);

    //        // var row = grid.tbody.find(">tr:not(.k-grouping-row)").eq(0);
    //        // grid.select(row);
    //        //alert(2);
    //    }

    //    if (!checked) {
    //        $("#Grid").data("kendoGrid").clearSelection();
    //    }

    //});

    //$("#chkSelectAll").on('click', function (e) {
    //    e.stopPropagation();
    //    var $cb = $(this);
    //    var checked = $cb.is(':checked');

    //    var grid1 = $('#Grid').data('kendoGrid');
    //    grid1.table.find("tr").find("td:last input").attr("checked", checked);

    //    //now making all the rows value to 1 or 0
    //    var items = $("#Grid").data("kendoGrid").dataSource.data();
    //    for (i = 0; i < items.length; i++) {
    //        var item = items[i];
    //        item.set('isAlwAcs', checked);
    //    }

    //});

}

//function SelectAll() {
//    if ($("#chkSelectAll").attr('checked')) {
//        $(".k-grid-content tbody tr").each(function () {

//            var values = [];
//            var $row = $(this);
//            //where .inpchk is the class name
//            var checked = $row.find('.inpchk').attr('checked');
//            if (($row.find(".inpchk").attr('disabled') == 'disabled')) {
//                $row.find(".inpchk").removeAttr('checked');
//            }
//            else {

//                $row.find(".inpchk").attr('checked', 'checked');
//            }

//        });

//    }


//    else {
//        $(".k-grid-content tbody tr").each(function () {

//            var $row = $(this);
//            $row.find(".inpchk").removeAttr('checked');

//        });
//    }

//}


//$(function () {


//    $gridElement = $("#Grid");
//    var kendoGrid = $gridElement.data("kendoGrid");
//    //var dataSource = kendoGrid.dataSource;

//    $("#Grid").data("kendoGrid").autobind("dataBound", function (e) {
//        configureSelectCheckBoxes($gridElement)
//    }
//    )

//    //$("#btnSearch").click(function () {
//    //    kendoGrid.dataSource.read();
//    //    kendoGrid.refresh();
//    //    kendoGrid.dataSource.page(1);
//    //})


//    function configureSelectCheckBoxes(grid) {
//        // attach click event to select all check box
//        grid.find("thead input:checkbox").click(
//            function () {
//                grid.find("td input:checkbox").prop("checked", $(this).prop("checked"));
//            }
//         );

//        // attach click event to individual check box
//        grid.find("tbody input:checkbox").click(
//               function () {
//                   var checkedCount = grid.find("td input:checkbox:checked").length;
//                   var totalCount = grid.find("td input:checkbox").length;
//                   grid.find("th input:checkbox").prop("checked", checkedCount === totalCount);
//               }
//        );
//    }
//})


//$(document).on("click", "#chkSelectAll", function () {
//    alert(1);
//    var grid1 = $('#Grid').data('kendoGrid');
//    var $cb = $(this);
//    var checked = $cb.is(':checked');
//    grid1.table.find("tr").find("input:checkbox").attr("checked", checked);
//    //$("#Grid tbody input:checkbox").attr("checked", this.checked);

//    //var length = $('#Grid').length;
//    //for (var i = 1; i < length; i++) {
//        $("#Grid").data("kendoGrid").dataSource.data().dirty = true;
//    //}
//});

//$("#chkSelectAll").on('click', function (e) {
//    e.stopPropagation();
//    var $cb = $(this);
//    var checked = $cb.is(':checked');

//    var grid1 = $('#Grid').data('kendoGrid');
//    grid1.table.find("tr").find("td:last input").attr("checked", checked);

//    //now making all the rows value to 1 or 0
//    var items = $("#Grid").data("kendoGrid").dataSource.data();
//    for (i = 0; i < items.length; i++) {
//        var item = items[i];
//        item.set('isAlwAcs', checked);
//    }

//});

$('#Grid').on('click', '.check_row', function () {
    var checked = $(this).is(':checked');
    var grid = $('#Grid').data().kendoGrid;
    var dataItem = grid.dataItem($(this).closest('tr'));
    if (dataItem != undefined) {
        dataItem.set('isAlwAcs ', checked);
    }

});

          

$('#Grid').on('click', '.check_row', function () {

    var $cb = $(this);
    var checked = $cb.is(':checked');
    setValueToGridData(checked);
});

$('#Grid').on('click', '#checkAll', function () {

    var $cb = $(this);
    var checked = $cb.is(':checked');
    var grid = $('#Grid').data('kendoGrid');
    grid.table.find("tr").find("td:last input").attr("checked", checked);

    //now making all the rows value to 1 or 0
    var items = $("#Grid").data("kendoGrid").dataSource.data();
    for (i = 0; i < items.length; i++) {
        var item = items[i];
        item.set('isAlwAcs', checked);

        // var row = grid.tbody.find(">tr:not(.k-grouping-row)").eq(0);
        // grid.select(row);

    }

    if (!checked) {
        $("#Grid").data("kendoGrid").clearSelection();
    }

});

function setValueToGridData(val) {
    var grid = $("#Grid").data("kendoGrid");
    var selectedItems = grid.select();
    selectedItems.each(function (index, row) {
        var selectedItem = grid.dataItem(row);
        //Setting value to grid data row; so that we can read updated data
        selectedItem.set('isAlwAcs', val);
        alert(3);
    });

}

function LoadGridWithColumnProp(columnsFinal, gridNo) {

    var CKy = $("#HdrSec1_CmbCompany_Cd").data('kendoComboBox').value();

    if (gridNo == 1) {
        try {
            $('#Grid').data().kendoGrid.destroy();
            $('#Grid').empty();
        } catch (e) { }

        var griddataSource = new kendo.data.DataSource({
            transport: {
                read: {
                    url: urlGetCompanyMenuUsrObj_SelectWeb, // '@Url.Action("GetCompanyMenuUsrObj_SelectWeb", "CompanyMenu")',
                    //contentType: 'application/json; charset=utf-8',
                    //data: {
                    //    ConCd: 'TRADING',
                    //    TypConCd: 'ItmTyp',
                    //    TypKy: ItmTypKy
                    //},
                    dataType: "json",
                    type: "POST",
                    //complete: function (data) { },
                },

                parameterMap: function (options, operation) {

                    if (operation == "read") {
                        return ({
                            'CKy': CKy,

                        })

                    }
                }

            },
            pageSize: 15,

            schema: {
                model: {
                    id: "UsrObjKy",
                    fields: //Relavent fields of the grid should be bind with following model items
                    {
                        ObjKy: { editable: false, nullable: false, type: "int" },
                        UsrObjKy: { editable: false, nullable: false, type: "int" },
                        ObjCaptn: { editable: false, nullable: true, type: "string" },
                        isAlwAcs: { editable: true, nullable: true, type: "boolean" },
                        UsrKy: { editable: false, nullable: false, type: "int" },
                        CKy: { editable: false, nullable: false, type: "int" },
                    }
                }
            }
        });


        $("#Grid").kendoGrid({
            dataSource: griddataSource,
            filterable: true,
            pageable: true,
            autobind: true,
            resizable: true,
            navigatable: true,
            sortable: true,
            reorderable: true,
            Scrollable: true,
            selectable: "multiple row",
            pageable: {
                refresh: true, pageSizes: [5, 10, 20, 50, 100, 150]
            },
            columnMenu: true,
            //filterable:true,
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

function Save() {
    var CKy = $("#HdrSec1_CmbCompany_Cd").data('kendoComboBox').value();

    var grid = $("#Grid").data("kendoGrid");

    //var items = $("#grid").data("kendoGrid").dataSource.data();
    //for (var i = 0; i < items.length; i++) {
    //    var item = items[i];

    var currentData = grid.dataSource.data();
    var updatedRecords = [];
    var newRecords = [];

    for (var i = 0; i < currentData.length; i++) {

        if (currentData[i].isNew()) {
            newRecords.push(currentData[i].toJSON());
        } else if (currentData[i].dirty) {
            updatedRecords.push(currentData[i].toJSON());
        }
    }

    var tempSAveChech = true;

    if (newRecords.length != 0 || updatedRecords.length != 0) {

        if (tempSAveChech) {
            //ajax for insert update and delete
            $.ajax({
                url: urlUsrObj_InsertUpdateWeb, // '@Url.Content("~/CompanyMenu/UsrObj_InsertUpdateWeb")',
                data: JSON.stringify({
                    updateGrid: kendo.stringify(updatedRecords),
                    newGrid: kendo.stringify(newRecords),
                    CKy: CKy,
                }),
                contentType: "application/json; charset=utf-8",
                dataType: "Json",
                type: "POST",
                success: function (data) {

                    if (data == true) {
                        alert("Successfully Saved..!");
                       // $('#HdrSec1_ChkboxApplyAll_Val').attr('checked', false);
                        //LoadGridView(); // update grid
                    } else {
                        alert("Record Not Saved");
                        LoadGridView(); // update grid
                    }
                },
                error: function (e) {
                    return false;
                }
            });
        }
    }
}