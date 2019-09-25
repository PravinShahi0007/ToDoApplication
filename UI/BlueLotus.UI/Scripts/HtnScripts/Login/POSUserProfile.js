var UsrKy = 0;

var FormGlblData = {
    FormObjData: null,
    AllDefalutValueObj: null,
    ItmKy: 1,
    CCd:"",
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
    //setTimeout(setHdrSectionPropFun, 2000);
    //LoadCombo();
    $('#HdrSec1_ChkboxisAct_Val').attr('checked', true);
    GetCCd();
    LoadGrid();
    LoadLocGrid();
    var tabstrip = $("#tabstrip").kendoTabStrip().data("kendoTabStrip");
    tabstrip.select(0);

    $("#HdrSec1_InptUsrId_Val").kendoNumericTextBox({
        min: 0,
        maxlength: 4,
        //decimals: 0,
        format: "#",
        spinners: false,
    });
    //$("input[data-role='numerictextbox']").attr('maxlength', '4');
    $("#HdrSec1_InptUsrId_Val").attr('maxlength', '4');
    //setTimeout("$('#HdrSec1_InptUsrId_Val').focus();", 500);
    setTimeout(function () {
        $('#HdrSec1_InptUsrId_Val').siblings('input:visible').focus();
    }, 200);
    //$("#HdrSec1_InptUsrId_Val").focus();

}

function setHdrSectionPropFun() {

    // ---------- Set ObjProperties
    setHdrSectionProp('', viewBag.ObjKy, '', 'HdrSec1');

    SetHandlingEnterKeyEvent('', viewBag.ObjKy);
    SetFirstFocusObj();
}

//function LoadCombo()
//{
//    $("#HdrSec1_CmbLoc_Cd").kendoComboBox({
//        dataValueField: "CdKy",
//        dataTextField: "CdNm",
//        dataSource: GetCdMas_LookupWeb('loc'), //CdNm_SelectMob_Datasource('HdrSec1_CmbLoc_Nm'),
//        filter: "startswith",
//        suggest: true,
//        placeholder: "Select Location .."
//    });
//}

//function GetCdMas_LookupWeb(ConCd) {
//    var dataSource = new kendo.data.DataSource(
//      {
//          transport: {
//              read: {
//                  url: CdMas_LookupWeb,
//                  data: { ConCd: ConCd },
//                  dataType: "json"
//              }
//          }
//      });
//    return dataSource;
//}

function GetCCd() {

    $.ajax({
        url: urlGetCompanyCode, //'@Url.Content("~/Login/GetCompanyCode")',
        dataType: "json",
        type: "POST",
        //data: JSON.stringify({
        //    ItmCd: ItmCd,
        //}),

        contentType: 'application/json; charset=utf-8',
        success: function (data) {
            FormGlblData.CCd = data;

            $("#HdrSec1_InptCCd_Val").val("." + FormGlblData.CCd);

        }

        //var keycode = (e.keyCode ? e.keyCode : e.which);
        //if (keycode == '13') {
        //    $("#UsrNm").focus();
        //}
    });
}

$('#HdrSec1_InptUsrId_Val').keypress(function (e) {
    var keycode = (e.keyCode ? e.keyCode : e.which);
    if (keycode == '13') {
        $("#HdrSec1_InptUsrNm_Val").focus();
    }
})

//$('.numbersOnly').keyup(function () {
//    if (this.value != this.value.replace(/[^0-9\.]/g, '')) {
//        this.value = this.value.replace(/[^0-9\.]/g, '');
//    }
//});

function Save()
{
    var tabStrip = $("#tabstrip").kendoTabStrip().data("kendoTabStrip");

    var tabIndx = -1;
    var tab = tabStrip.select();
    tabIndx = tab.index();

    if (tabIndx == 0) {
        SaveUser();
    }
    else { SaveAcsLvl(); }
}

function SaveUser() {
    UsrKy = $("#UsrKy").val();
    var uid = $("#HdrSec1_InptUsrId_Val").val();
    var ccd = $("#HdrSec1_InptCCd_Val").val();
    var UsrId = uid + ccd;
    var UsrNm = $("#HdrSec1_InptUsrNm_Val").val();
    var GrpKy = 1;
    if (GrpKy == null || GrpKy == "") {
        GrpKy = "1";
    }

    var AdrKy = 1;
    if (AdrKy == null || AdrKy == "") {
        AdrKy = "1";
    }
    if ($('#HdrSec1_ChkboxisAct_Val').is(":checked")) {
        var IsAct = 1;
    // alert(isAct)
    //if (IsAct == true) {
    //    IsAct = 1;
    }
    else {
        IsAct = 0;
    }

    if (UsrId) {
        if (UsrNm) {
            // var IsAct = $("#chckact").val();

            if (UsrKy == "") {
                UsrKy = 0;
            }
            //var Password = "0000";
            //   alert(UsrKy);

            //UpdateDetails();
            var grid = $("#usergrid").data("kendoGrid");
            var currentData = grid.dataSource.data();
            var updatedRecords = [];
            var CKy;

            if (UsrKy == 0) {

                $.ajax({
                    url: urlCheckUser, //"@Url.Content("~/Login/CheckUser")",
                    data: JSON.stringify({
                        UsrId: UsrId,
                    }),
                    contentType: 'application/json; charset=utf-8',
                    dataType: "Json",
                    type: "POST",
                    success: function (data) {
                        if (data == true) {
                            alert("We Found The User : \" " + UsrId + " \" Which Already Exist!");
                            return false;
                        }
                        else {
                            for (var i = 0; i < currentData.length; i++) {
                                if (currentData[i].isAlwAcs == true) {
                                    updatedRecords.push(currentData[i].toJSON());
                                }
                            }
                            $.ajax({
                                url: urlSaveUsrProfile, //"@Url.Content("~/Login/SaveUsrProfile")",
                                data: JSON.stringify({
                                    UsrId: UsrId,
                                    UsrNm: UsrNm,
                                    GrpKy: GrpKy,
                                    AdrKy: AdrKy,
                                    IsAct: IsAct,
                                    UsrKy: UsrKy,
                                    GridUpdateDetail: kendo.stringify(updatedRecords),

                                }),
                                contentType: 'application/json; charset=utf-8',
                                dataType: "Json",
                                type: "POST",
                                success: function (data) {
                                    Clear();
                                    
                                        alert("You Created the User \" " + uid + " \" successfully!");
                                },
                                error: function (e) {
                                    return false;
                                }
                            });
                        }

                        return false;
                    },
                    error: function (e) {
                    }
                });
            }
            else {
                for (var i = 0; i < currentData.length; i++) {
                    if (currentData[i].isAlwAcs == true) {
                        updatedRecords.push(currentData[i].toJSON());
                    }
                }
                $.ajax({
                    url: urlSaveUsrProfile, //"@Url.Content("~/Login/SaveUsrProfile")",
                    data: JSON.stringify({
                        UsrId: UsrId,
                        UsrNm: UsrNm,
                        GrpKy: GrpKy,
                        AdrKy: AdrKy,
                        IsAct: IsAct,
                        UsrKy: UsrKy,
                        GridUpdateDetail: kendo.stringify(updatedRecords),

                    }),
                    contentType: 'application/json; charset=utf-8',
                    dataType: "Json",
                    type: "POST",
                    success: function (data) {
                        Clear();
                         alert("You Updated the User \" " + uid + " \" successfully!"); 

                    },
                    error: function (e) {
                        return false;
                    }
                });
            }


        } else {
            alert("Please Enter UserName");
        }
    } else {
        alert("Please Enter UserID");
    }
}

function SaveAcsLvl() {

    var AcsLvlUsrKy = $("#UsrKy").val();
    if (AcsLvlUsrKy != "" && AcsLvlUsrKy != 0 && AcsLvlUsrKy != null) {

        var grid = $("#LocGrid").data("kendoGrid");

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
                            LoadGrid();
                        }
                    },
                    error: function (e) {
                        return false;
                    }
                });
            }
        }
    }
    else {
        alert("Please select a User");
    }
}


function Clear() {
    setTimeout(function () {
        $('#HdrSec1_InptUsrId_Val').siblings('input:visible').focus();
    }, 200);
    $("#HdrSec1_InptUsrId_Val").val(null);
    //$("#HdrSec1_InptUsrId_Val").focus();
    $("#HdrSec1_InptCCd_Val").val(null);
    $('#HdrSec1_ChkboxisAct_Val').attr('checked', true);
    GetCCd();
    $("#HdrSec1_InptUsrNm_Val").val(null);
    $("#UsrKy").val(null);
    LoadGrid();
    //$("#HdrSec1_CmbLoc_Cd").data('kendoComboBox').value(null);
    //$('#Grid').data('kendoGrid').dataSource.read();
    //$('#Grid').data('kendoGrid').refresh();

}

$(document.body).keydown(function (e) {
    if (e.ctrlKey && e.keyCode == 70) {

        $("#FindForm").show().kendoWindow({
            width: "1000px",
            height: "550px",
            modal: true,
            title: "Find"
        });

        $('#FindForm').data('kendoWindow').center().open();
        LoadFindGrid();
    }
});

function ResetPwd() {

    var UsrKy = $("#UsrKy").val();
    var uid = $("#HdrSec1_InptUsrId_Val").val();
    var ccd = $("#HdrSec1_InptCCd_Val").val();
    var UsrId = uid + ccd;
    if (UsrKy == "" || UsrKy == undefined || UsrKy == null) {
        alert("Select any User");
    }
    else {
        $.ajax({
            url: urlResetPwd, //"@Url.Content("~/Login/ResetPwd")",
            data: JSON.stringify({
                UsrKy: UsrKy,
                UsrId: UsrId
            }),
            contentType: 'application/json; charset=utf-8',
            dataType: "Json",
            type: "POST",
            success: function (data) {
                Clear();
                alert(" Reset successfully ")
            },
            error: function (e) {
                return false;
            }
        });
    }
}

function LoadGrid()
{
    var Usrcolumns = [
            
            {
                field: "ObjNm", title: "Feature(s)", width: "100px", attributes: { style: "text-align:center;" },
                filterable: {
                    cell: {
                        operator: "contains",
                        suggestionOperator: "contains"
                    }
                },
            },
        {
            field: "ObjKy", title: "ObjKy(s)", width: "100px", hidden: true, attributes: { style: "text-align:center;" },

        },
        {
            field: "isAlwAcs", title: "Allow Permission(s)", width: "100px", attributes: { style: "text-align:center;" },
            filterable: true, sortable: false,
            template: '<input type="checkbox"  #= isAlwAcs? checked="checked" : "" # class="isAlwAcsPinChecked"></input>',
            headerTemplate: '<label> Allow Permission(s) <input type="checkbox" id="checkAll"/></label>',
        },

    ];
    var gridNo = 1;
    var FinalItmColumn = setColumnProp(Usrcolumns, viewBag.ObjKy, '', 'HdrSec2_Tab1_FormGrd', gridNo)
}


$('#usergrid').on('click', '.isAlwAcsPinChecked', function () {
    var checked = $(this).is(':checked');
    var grid = $('#usergrid').data().kendoGrid;
    var dataItem = grid.dataItem($(this).closest('tr'));
    if (dataItem != undefined) {
        dataItem.set('isAlwAcs ', checked);
    }

});

$('#usergrid').on('click', '.isAlwAcsPinChecked', function () {
    var $cb = $(this);
    var checked = $cb.is(':checked');
    setValueToGridData(checked);
});

$('#usergrid').on('click', '#checkAll', function () {

    var $cb = $(this);
    var checked = $cb.is(':checked');
    var grid = $('#usergrid').data('kendoGrid');
    grid.table.find("tr").find("td:last input").attr("checked", checked);

    //now making all the rows value to 1 or 0
    var items = $("#usergrid").data("kendoGrid").dataSource.data();
    for (i = 0; i < items.length; i++) {
        var item = items[i];
        item.set('isAlwAcs', checked);

        // var row = grid.tbody.find(">tr:not(.k-grouping-row)").eq(0);
        // grid.select(row);

    }

    if (!checked) {
        $("#usergrid").data("kendoGrid").clearSelection();
    }

});

function setValueToGridData(val) {
    var grid = $("#usergrid").data("kendoGrid");
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
            $('#usergrid').data().kendoGrid.destroy();
            $('#usergrid').empty();
        } catch (e) { }

        var griddataSource = new kendo.data.DataSource({
            transport: {
                read: {
                    url: urlGetPOSMenuAccessV2Web, // '@Url.Action("GetPOSMenuAccessV2Web", "Login")',

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
                    id: "ObjKy",
                    fields: //Relavent fields of the grid should be bind with following model items
                    {
                        ObjKy: { editable: false, nullable: false, type: "number" },
                        ObjNm: { editable: false, nullable: true, type: "string" },
                        isAlwAcs: { editable: true, nullable: false, type: "boolean" },

                    }
                }
            }
        });


        $("#usergrid").kendoGrid({
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



function LoadLocGrid()
{
    var Loccolumns = [

            {
                field: "CdNm", title: "Location(s)", width: "100px", attributes: { style: "text-align:center;" },
            },
        {
            field: "AcsLvlKy", title: "AcsLvlKy(s)", width: "100px", hidden: true, attributes: { style: "text-align:center;" },

        },
        {
            field: "isAlwAcs", title: "Allow Permission(s)", width: "100px", attributes: { style: "text-align:center;" },
            filterable: true, sortable: false,
            template: '<input type="checkbox"  #= isAlwAcs? checked="checked" : "" # class="isAlwAcsPinChecked"></input>',
            headerTemplate: '<label> Allow Permission(s) <input type="checkbox" id="checkAll"/></label>',
        },

    ];
    var gridNo = 2;
    var FinalItmColumn = setColumnProp(Loccolumns, viewBag.ObjKy, '', 'HdrSec2_Tab2_FormGrd', gridNo)
}

$('#LocGrid').on('click', '.isAlwAcsPinChecked', function () {
    var checked = $(this).is(':checked');
    var grid = $('#LocGrid').data().kendoGrid;
    var dataItem = grid.dataItem($(this).closest('tr'));
    if (dataItem != undefined) {
        dataItem.set('isAlwAcs ', checked);
    }

});

$('#LocGrid').on('click', '.isAlwAcsPinChecked', function () {

    var $cb = $(this);
    var checked = $cb.is(':checked');
    setValueToGridData(checked);
});

$('#LocGrid').on('click', '#checkAll', function () {

    var $cb = $(this);
    var checked = $cb.is(':checked');
    var grid = $('#LocGrid').data('kendoGrid');
    grid.table.find("tr").find("td:last input").attr("checked", checked);

    //now making all the rows value to 1 or 0
    var items = $("#LocGrid").data("kendoGrid").dataSource.data();
    for (i = 0; i < items.length; i++) {
        var item = items[i];
        item.set('isAlwAcs', checked);

        // var row = grid.tbody.find(">tr:not(.k-grouping-row)").eq(0);
        // grid.select(row);

    }

    if (!checked) {
        $("#LocGrid").data("kendoGrid").clearSelection();
    }

});

function setValueToGridData(val) {
    var grid = $("#LocGrid").data("kendoGrid");
    var selectedItems = grid.select();
    selectedItems.each(function (index, row) {
        var selectedItem = grid.dataItem(row);
        //Setting value to grid data row; so that we can read updated data
        selectedItem.set('isAlwAcs', val);
    });
}

function LoadGridWithColumnPropTwo(columnsFinal, gridNo) {

    if (gridNo == 2) {

        try {
            $('#LocGrid').data().kendoGrid.destroy();
            $('#LocGrid').empty();
        } catch (e) { }

        var AcsLvlUsrKy = $("#UsrKy").val();
        if (AcsLvlUsrKy == "")
            AcsLvlUsrKy = 1;

        var griddataSource = new kendo.data.DataSource({
            transport: {
                read: {
                    url: urlUsrMasAcsLvl_SelectWeb, // '@Url.Action("UsrMasAcsLvl_SelectWeb", "SystemUsers")', //CdNm_SelectMob_Datasource('CdNm'), // '@Url.Action("GetItmSettings", "ItmMasCd")',
                    contentType: 'application/json; charset=utf-8',
                    //data: {
                    //    ConCd: 'TRADING',
                    //    TypConCd: 'ItmTyp',
                    //    TypKy: ItmTypKy
                    //},
                    dataType: "json",
                    //type : "POST",
                    //complete: function (data) { },
                },
                parameterMap: function (options, operation) {

                    if (operation == "read") {
                        return ({
                            'AcsLvlUsrKy': AcsLvlUsrKy,
                        })
                    }
                }
            },
            pageSize: 8,

            schema: {
                model: {
                    id: "AcsLvlKy",
                    fields: //Relavent fields of the grid should be bind with following model items
                    {
                        AcsLvlKy: { editable: false, nullable: false, type: "int" },
                        CdNm: { editable: false, nullable: true, type: "string" },
                        isAlwAcs: { editable: true, nullable: false, type: "boolean" },
                    }
                }
            }
        });

        $("#LocGrid").kendoGrid({
            dataSource: griddataSource,
            autobind: true,
            resizable: true,
            navigatable: true,
            sortable: true,
            reorderable: true,
            Scrollable: true,
            columns: columnsFinal,
            selectable: "row",
            pageable: {
                refresh: true, pageSizes: [5, 10, 20, 50, 100, 150]
            },
            columnMenu: true,
            filterable: {
                mode: "row"
            },

            dataBinding: function () {
                record = (this.dataSource.page() - 1) * this.dataSource.pageSize();
            },
            editable: true
        });
    }
}



