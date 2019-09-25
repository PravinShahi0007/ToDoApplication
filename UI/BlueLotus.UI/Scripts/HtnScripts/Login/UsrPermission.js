var AcsLvlUsrKy = 1;
var UsrKy = 1;
var FormGlblData = {
    FormObjData: null,
    AllDefalutValueObj: null,
    ItmKy: 1,
    ItmTypKy: 1,
    ItmTaxTypKy: 1,
    AccessLvlKy: 1,
    ConfiLvlKy: 1,
    UsrKy:1
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
    //LoadCombo();

    //$("#GridWin").show();
    //LoadGridView();

}

function setHdrSectionPropFun() {

    // ---------- Set ObjProperties
    setHdrSectionProp('', viewBag.ObjKy, '', 'HdrSec1');

    SetHandlingEnterKeyEvent('', viewBag.ObjKy);
    SetFirstFocusObj();
}


function LoadUsrCombo() {
    $("#HdrSec2_Tab3_CmbFrmUsr_Cd").kendoComboBox({
        dataValueField: "UsrKy",
        dataTextField: "UsrNm",
        dataSource: UsrMas_SelectWeb(),
        filter: "contains",
        suggest: true,
        placeholder: "Select From User.."
    });

    $("#HdrSec2_Tab3_CmbToUsr_Cd").kendoComboBox({
        dataValueField: "UsrKy",
        dataTextField: "UsrNm",
        dataSource: UsrMas_SelectWeb(),
        filter: "contains",
        suggest: true,
        placeholder: "Select TO User.."
    });
}

function UsrMas_SelectWeb() {
    var dataSource = new kendo.data.DataSource(
      {
          transport: {
              read: {
                  url: urlUsrMas_SelectWeb, //'@Url.Content("~/Login/FindUsrGrid")',
                  dataType: "json",
                  data: { IsActive: '1' },
              }
          }
      });
    return dataSource;
}

function SaveCloneUsr() {
    var FrmUsrKy = $("#HdrSec2_Tab3_CmbFrmUsr_Cd").data('kendoComboBox').value();
    var ToUsrKy = $("#HdrSec2_Tab3_CmbToUsr_Cd").data('kendoComboBox').value();
    UsrKy = ToUsrKy;
    $.ajax({
        url: urlCopyUserObjPermission, //'@Url.Content("~/SystemUsers/CopyUserObjPermission")',
        dataType: "json",
        type: "POST",
        data: JSON.stringify({
            FrmUsrKy: FrmUsrKy,
            ToUsrKy: ToUsrKy,
        }),

        contentType: 'application/json; charset=utf-8',
        success: function (data) {
            if (data == true) {
                alert("Clone Successfully");
                LoadGridPermission(UsrKy);
            }
            else { alert("Cloned Failed"); }
        }

        //var keycode = (e.keyCode ? e.keyCode : e.which);
        //if (keycode == '13') {
        //    $("#UsrNm").focus();
        //}
    });
}

function LoadAcsLvlGrid(UsrKy) {

    if (UsrKy != null || UsrKy != 0) {
        AcsLvlUsrKy = UsrKy;
    }

    var AcsLvlcolumns = [
            {
                field: "AcsLvlKy", title: "AcsLvlKy", width: "10px", hidden: true, attributes: { style: "text-align:center;" },
            },

            {
                field: "UsrAcsLvlKy", title: "UsrAcsLvlKy", width: "100px", hidden: true, attributes: { style: "text-align:center;" },
            },
        {
            field: "CdNm", title: "Access Levels", width: "200px", attributes: { style: "text-align:center;" },

        },

                {
                    field: "isAlwAcs", title: "Allow Permission(s)", width: "100px", attributes: { style: "text-align:center;" },
                    filterable: true, sortable: false,
                    template: '<input type="checkbox"  #= isAlwAcs? checked="checked" : "" # class="isAlwAcsPinChecked"></input>',
                    headerTemplate: '<label> Allow ALL Permissions <input type="checkbox" id="checkAll"/></label>',
                },

    ];
    var gridNo = 1;
    var FinalItmColumn = setColumnProp(AcsLvlcolumns, viewBag.ObjKy, '', 'HdrSec2_Tab2_FormGrd', gridNo)
}

//$(document).on("click", "#checkAll", function () {
//    $("#AcsLvlGrid tbody input:checkbox").attr("checked", this.checked);
//});

$('#AcsLvlGrid').on('click', '.isAlwAcsPinChecked', function () {
    var checked = $(this).is(':checked');
    var grid = $('#AcsLvlGrid').data().kendoGrid;
    var dataItem = grid.dataItem($(this).closest('tr'));
    if (dataItem != undefined) {
        dataItem.set('isAlwAcs ', checked);
    }

});

$('#AcsLvlGrid').on('click', '.isAlwAcsPinChecked', function () {

    var $cb = $(this);
    var checked = $cb.is(':checked');
    setValueToGridData(checked);
});

$('#AcsLvlGrid').on('click', '#checkAll', function () {

    var $cb = $(this);
    var checked = $cb.is(':checked');
    var grid = $('#AcsLvlGrid').data('kendoGrid');
    grid.table.find("tr").find("td:last input").attr("checked", checked);

    //now making all the rows value to 1 or 0
    var items = $("#AcsLvlGrid").data("kendoGrid").dataSource.data();
    for (i = 0; i < items.length; i++) {
        var item = items[i];
        item.set('isAlwAcs', checked);
        
        // var row = grid.tbody.find(">tr:not(.k-grouping-row)").eq(0);
        // grid.select(row);

    }

    if (!checked) {
        $("#AcsLvlGrid").data("kendoGrid").clearSelection();
    }

});

function setValueToGridData(val) {
    var grid = $("#AcsLvlGrid").data("kendoGrid");
    var selectedItems = grid.select();
    selectedItems.each(function (index, row) {
        var selectedItem = grid.dataItem(row);
        //Setting value to grid data row; so that we can read updated data
        selectedItem.set('isAlwAcs', val);
    });

}



function LoadGridWithColumnProp(columnsFinal, gridNo) {

    if (gridNo == 1) {
        try {
            $('#AcsLvlGrid').data().kendoGrid.destroy();
            $('#AcsLvlGrid').empty();
        } catch (e) { }

        var griddataSource = new kendo.data.DataSource({
            transport: {
                read: {
                    url: urlUsrMasAcsLvl_SelectWeb, // '@Url.Action("UsrMasAcsLvl_SelectWeb", "SystemUsers")',
                    
                    dataType: "json",
                    type: "POST",
                },

                parameterMap: function (options, operation) {

                    if (operation == "read") {
                        return ({
                            'AcsLvlUsrKy': AcsLvlUsrKy,
                            
                        })

                    }
                }

            },
            pageSize: 10,

            schema: {
                model: {
                    id: "AcsLvlKy",
                    fields: //Relavent fields of the grid should be bind with following model items
                    {
                        AcsLvlKy: { editable: false, nullable: false, type: "int" },
                        UsrAcsLvlKy: { editable: false, nullable: false, type: "int" },
                        CdNm: { editable: false, nullable: true, type: "string" },
                        isAlwAcs: { editable: true, nullable: false, type: "boolean" },
                        
                    }
                }
            }
        });


        $("#AcsLvlGrid").kendoGrid({
            dataSource: griddataSource,
            autobind: true,
            resizable: true,
            navigatable: true,
            sortable: true,
            reorderable: true,
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

function SaveAcsLvl()
{

    var grid = $("#AcsLvlGrid").data("kendoGrid");

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
                    url: urlUsrMasAcsLvl_InsertUpdateWeb, // '@Url.Content("~/SystemUsers/UsrMasAcsLvl_InsertUpdateWeb")',
                    data: JSON.stringify({
                        updateGrid: kendo.stringify(updatedRecords),
                        newGrid: kendo.stringify(newRecords),
                        AcsLvlUsrKy: AcsLvlUsrKy,
                    }),
                    contentType: "application/json; charset=utf-8",
                    dataType: "Json",
                    type: "POST",
                    success: function (data) {

                        if (data == true) {
                            alert("Successfully Saved..!");
                            //LoadAcsLvlGrid(AcsLvlUsrKy); // update grid
                        } else {
                            alert("Record Not Saved");
                            LoadAcsLvlGrid(AcsLvlUsrKy); // update grid
                        }
                    },
                    error: function (e) {
                        return false;
                    }
                });
            }
        }
}


$('#object_permissions').on('click', '.check_row', function () {
    var checked = $(this).is(':checked');
    var grid = $('#object_permissions').data().kendoGrid;
    var dataItem = grid.dataItem($(this).closest('tr'));
    //removed this pars as ariram told that thee is not any reqirement like this
    if (dataItem != undefined) {
        dataItem.set('isAlwAcs ', checked);
        dataItem.set('isAlwAdd', checked);
        dataItem.set('isAlwUpdate', checked);
        dataItem.set('isAlwDel', checked);
        dataItem.set('isAlwApr', checked);
        dataItem.set('AlowAll ', checked);

    }

});



//$('#object_permissions').on('click', '.check_row', function () {

//    var $cb = $(this);
//    var checked = $cb.is(':checked');
//    setValueToGridData(checked);
//});

$('#object_permissions').on('click', '#checkAll', function () {

    var $cb = $(this);
    var checked = $cb.is(':checked');
    var grid = $('#object_permissions').data('kendoGrid');
    grid.table.find("tr").find("td:last input").attr("checked", checked);

    //now making all the rows value to 1 or 0
    var items = $("#object_permissions").data("kendoGrid").dataSource.data();
    for (i = 0; i < items.length; i++) {
        var item = items[i];
        item.set('isAlwAcs', checked);
        item.set('isAlwAdd', checked);
        item.set('isAlwUpdate', checked);
        item.set('isAlwDel', checked);
        item.set('isAlwApr', checked);
        item.set('AlowAll', checked);


        // var row = grid.tbody.find(">tr:not(.k-grouping-row)").eq(0);
        // grid.select(row);

    }

    if (!checked) {
        $("#object_permissions").data("kendoGrid").clearSelection();
    }

});

function setValueToGridData(val) {
    var grid = $("#object_permissions").data("kendoGrid");
    var selectedItems = grid.select();
    selectedItems.each(function (index, row) {
        var selectedItem = grid.dataItem(row);
        if (selectedItem.isAlwAdd) {
            selectedItem.set('isAlwAcs', val);
        }
        //Setting value to grid data row; so that we can read updated data
       
    });

}

function CheckAllTickObjPermtn(selectedItem) {
    if (selectedItem.isAlwAcs && selectedItem.isAlwAdd && selectedItem.isAlwUpdate && selectedItem.isAlwDel) {
        selectedItem.set('AlowAll', true);
    } else {
        selectedItem.set('AlowAll', false);

    }

   
}