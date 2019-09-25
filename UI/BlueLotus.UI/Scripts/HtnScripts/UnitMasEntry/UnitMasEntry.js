
var todayDate = new Date();
var dd = todayDate.getDate();
var mm = todayDate.getMonth() + 1; //January is 0!

var yyyy = todayDate.getFullYear();
if (dd < 10) {
    dd = '0' + dd
}
if (mm < 10) {
    mm = '0' + mm
}
var todayDate = dd + '/' + mm + '/' + yyyy;

var FormGlblData = {
    FormObjData: null,
    TrnTypKy: 1,
    AccessLvlKy: 1,
    ConfiLvlKy: 1,
    TrnKy: 1,
    TodayDate: todayDate,
    UnitKy: 1
}

$(document).ready(function () {
    LoadCombo();
    // LoadUnitMasEntry();
});

function LoadCombo() {
    $("#HdrSec1_CmbUnit").kendoComboBox({
        dataValueField: "UnitKy",
        dataTextField: "Unit",
        dataSource: UnitMasDatasource(),
        change: function (e) {
            var cmb = $("#HdrSec1_CmbUnit").data("kendoComboBox");
            var UnitKy = cmb.value();
            if (UnitKy != "") {
                var validate = ComboValidations("HdrSec1_CmbUnit");
                if (validate) {
                    FormGlblData.UnitKy = UnitKy;
                    LoadUnitMasEntry();
                } else {
                    $("#cmbCrnId").data("kendoComboBox").value("");
                }
            }
        },
        filter: "contains",
        suggest: true,
        placeholder: "Select a Unit."
    });
}

function UnitMasDatasource() {

    var dataSource = new kendo.data.DataSource(
      {
          transport: {
              read: {
                  url: urlUnitMasEntry.LoadCombo,
                  dataType: "json",
                  data: { ObjKy: viewBag.ObjKy }
              }
          }
      });
    return dataSource;
}

$("#LoadGridView").click(function () {

    LoadGridViewColumn();
    $("#GridWin").show();

});

function DistroyGrid() {
    $("#UnitMasGrid").kendoGrid({
        dataSource: null
    });
}

function LoadUnitMasEntry() {

    var columnsDefine = [


         { field: "ConvRate", title: "Unit ConvRate", width: "20px", hidden: false },
            { field: "Unit", title: "Unit", width: "20px", hidden: false },
            
            {
                field: "Equal", title: "Equal ", template: '<label>=</label>', width: "10px"
            },
            { field: "BaseUnitConvRate", title: "BaseUnit ConvRate", width: "20px", hidden: false },
            { field: "BaseUnit", title: "Base Unit", width: "20px", hidden: false },
           
           
          
       
            //{ field: "ConvRate ", title: "Convert Rate ", width: "100px", hidden: true },
            { field: "Des ", title: "Description ", width: "60px", hidden: false },


            { field: "UnitTyp ", title: "UnitTyp ", width: "100px", hidden: true },
            { field: "SKy ", title: "SKy ", width: "100px", hidden: true },
            { field: "UnitKy", title: "UnitKy", width: "50px", hidden: true },
           
              {

                  field: "isAct", title: "Active",
                  template: '<input type="checkbox"#= isAct? "checked=checked" : "" # disabled="disabled" ></input>',
                  width: "20px",

              },
            { field: "BaseUnitKy ", title: "BaseUnitKy ", width: "100px", hidden: true },

            {
                field: "isDefault ", title: "isDefault ",
                template: '<input type="checkbox"#= isDepth? "checked=checked" : "" # disabled="disabled" ></input>',
                width: "40px", hidden: true
            },
            {
                field: "isSI ", title: "isSI ",
                template: '<input type="checkbox"#= isDepth? "checked=checked" : "" # disabled="disabled" ></input>',
                width: "40px", hidden: true
            },
            {
                field: "isImp ", title: "isImp ",
                template: '<input type="checkbox"#= isDepth? "checked=checked" : "" # disabled="disabled" ></input>',
                width: "40px", hidden: true
            },
            {
                field: "isDefaultSI ", title: "isDefaultSI ",
                template: '<input type="checkbox"#= isDepth? "checked=checked" : "" # disabled="disabled" ></input>',
                width: "40px", hidden: true
            },
            {
                field: "isDefaultImp ", title: "isDefaultImp ",
                template: '<input type="checkbox"#= isDepth? "checked=checked" : "" # disabled="disabled" ></input>',
                width: "40px", hidden: true
            },
            {
                field: "isQty ", title: "isQty ",
                template: '<input type="checkbox"#= isDepth? "checked=checked" : "" # disabled="disabled" ></input>',
                width: "40px", hidden: true
            },
            {
                field: "isLength ", title: "isLength ",
                template: '<input type="checkbox"#= isDepth? "checked=checked" : "" # disabled="disabled" ></input>',
                width: "40px", hidden: true
            },
            {
                field: "isBreadth ", title: "isBreadth ",
                template: '<input type="checkbox"#= isDepth? "checked=checked" : "" # disabled="disabled" ></input>',
                width: "40px", hidden: true
            },
            {
                field: "isDepth ", title: "isDepth ",
                template: '<input type="checkbox"#= isDepth? "checked=checked" : "" # disabled="disabled" ></input>',
                width: "40px", hidden: true
            },

            {
                field: "isApr ", title: "isApr ",
                template: '<input type="checkbox"#= isApr? "checked=checked" : "" # disabled="disabled" ></input>',
                width: "40px", hidden: true
            },

          
    ];
    var gridNo = 1;
    var columnsFinal = setColumnProp(columnsDefine, viewBag.ObjKy, '', 'FormGrd', gridNo);
}

function LoadGridWithColumnProp(columnsFinal, gridNo) {

    var dataSourceLoadUnitMasEntry = new kendo.data.DataSource({
        transport: {
            read:
            {
                url: urlUnitMasEntry.LoadUnitMasEntry,
                dataType: "json",
                data: {
                    ObjKy: Number(viewBag.ObjKy),
                    UnitKy: FormGlblData.UnitKy
                },
            },
        },
        batch: true,
        pageSize: 20,
        schema: {
            model: {
                id: "UnitKy",
                fields:
                {
                    Unit: { editable: true, nullable: false, },
                    ConvRate: { editable: true, nullable: false, },
                    Des: { editable: true, nullable: false, },
                    isApr: { editable: true, nullable: false, type: "boolean", },
                    isAct: { editable: true, nullable: false, type: "boolean", },
                    isDefault: { editable: true, nullable: false, type: "boolean", },
                    isDepth: { editable: true, nullable: false, type: "boolean", },
                    isBreadth: { editable: true, nullable: false, type: "boolean", },
                    isLength: { editable: true, nullable: false, type: "boolean", },
                    isQty: { editable: true, nullable: false, type: "boolean", },
                    isDefaultImp: { editable: true, nullable: false, type: "boolean", },
                    isDefaultSI: { editable: true, nullable: false, type: "boolean", },
                    isImp: { editable: true, nullable: false, type: "boolean", },
                    isSI: { editable: true, nullable: false, type: "boolean", },
                    UnitKy: { editable: true, nullable: false, },
                    SKy: { editable: true, nullable: false, },
                    UnitTyp: { editable: true, nullable: false, },
                    //UnitTyp
                    BaseUnitKy: { editable: true, nullable: false },
                    Equal: { editable: false, nullable: false },
                    BaseUnitConvRate: { editable: true, nullable: false },
                    BaseUnit: { editable: false, nullable: false }
                }
            }
        }
    });

    $("#UnitMasGrid").kendoGrid({
        dataSource: dataSourceLoadUnitMasEntry,
        //autobind: true,
        height: 500,
        navigatable: true,
        filterable: true,
        pageable: true,
        sortable: true,
        reorderable: true,
        //toolbar:[{name:"Create", text:"Add new record"},"Save", "Cancel"],
        columnMenu: true,
        selectable: "row",
        resizable: true,
        pageable: { refresh: true, pageSizes: [5, 10, 20, 50, 100] },
        columns: columnsFinal,
        editable: true
    });

}

function SaveFunction() {

    var grid = $("#UnitMasGrid").data("kendoGrid");
    var currentData = grid.dataSource.data();
    var update = [];
    var insert = [];

    for (var i = 0; i < currentData.length; i++) {
        if (currentData[i].isNew()) {

            insert.push(currentData[i].toJSON());
        } else if (currentData[i].dirty) {
            update.push(currentData[i].toJSON());
        }
    }

    var deleted = [];
    for (var i = 0; i < grid.dataSource._destroyed.length; i++) {
        deleted.push(grid.dataSource._destroyed[i].toJSON());
    }

    $.ajax({
        url: urlUnitMasEntry.SaveUnitMasEntry,
        data: JSON.stringify({
            ObjKy: viewBag.ObjKy,
            updated: kendo.stringify(update),
            deleted: kendo.stringify(deleted),
            insert: kendo.stringify(insert),
        }),
        contentType: 'application/json; charset=utf-8',
        dataType: "Json",
        type: "POST",
        success: function (data) {
            alert("Saved");
            grid.dataSource.read();
        },
        error: function (e) {
            return false;
        }
    });
}

function AddFunction() {
    var grid = $("#UnitMasGrid").data("kendoGrid").addRow();
    var firstItem = $("#UnitMasGrid").data().kendoGrid.dataSource.data()[0];

    //firstItem.set("BaseUnitKy", FormGlblData.UnitKy);
    //var productsGrid = $('#UnitMasGrid').data('kendoGrid');
    //var dataSource = productsGrid.dataSource;
    //dataSource.insert(0, { BaseUnitKy: FormGlblData.UnitKy });


    firstItem.set("BaseUnitKy", FormGlblData.UnitKy);
    firstItem.set("UnitKy", 1);
    firstItem.set("SKy", 1);
    firstItem.set("isAct", 1);
    firstItem.set("isApr", 1);

    //firstItem.set("Default", 1);
    //firstItem.set("count", 1);
 
}

function CancelFunction() {
    var grid = $("#UnitMasGrid").data("kendoGrid").cancelChanges();
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