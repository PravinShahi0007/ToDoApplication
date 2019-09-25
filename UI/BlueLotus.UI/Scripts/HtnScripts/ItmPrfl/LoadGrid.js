var info = "";
var dtSource = null;
var ItmKey = "";
var selectedRow;
function CatDataSrcLoad(ItmCat7Ky) {
    var dataSource = new kendo.data.DataSource(
      {
          transport: {
              read: {
                  url: urlGetCat8ByCat7_SelectWeb,
                  data: { Cat7Ky: ItmCat7Ky },
                  dataType: "json"
              }
          }
      });
    return dataSource;
}

function LoadTabItems() {
    var tabstrip = $("#tabstrip").kendoTabStrip().data("kendoTabStrip");
    var tabIndx = -1;
    var tab = tabstrip.select();
    var Dept = $("#HdrSec1_CmbDept_Cd").data('kendoComboBox').value();

    tabIndx = tab.index();

    if (tabIndx == 0) {
        LoadItemGridView(ItmTypKy);
    }
    else if (tabIndx == 2) {
        LoadItmSettingsGrid();
    }
    else if (tabIndx == 3) {
        LoadPriceGrid();
    }

}

function HTNPaginationCtrlLoadWithDataGrid() {
    //  LoadItemGridView(ItmTypKy);
    //LoadItmSettingsGrid();
    //LoadPriceGrid();
    //LoadItmStockGrid();
}


//$("#tabstrip").on("click", "li.k-state-default", function (e) {
//    ItmSettingsTab();
//});

function ItmSettingsTab() {
    var tabStrip = $("#tabstrip").kendoTabStrip().data("kendoTabStrip");

    //tabstrip.select(0);
    ItmKy = $("#ItmKy").val();

    var ind1 = 1;
    var ind2 = 2;
    var ind3 = 3;
    var ind4 = 4;
    var ind5 = 5;

    tabStrip.enable(tabStrip.tabGroup.children().eq(ind1));
    tabStrip.enable(tabStrip.tabGroup.children().eq(ind2));
    tabStrip.enable(tabStrip.tabGroup.children().eq(ind3));
    tabStrip.enable(tabStrip.tabGroup.children().eq(ind4));
    tabStrip.enable(tabStrip.tabGroup.children().eq(ind5));
    if (ItmKy <= 1) {
        //alert("Select an Item");

        //var tabIndex = tabstrip.select(1);
        //var tabIndex1 = tabstrip.select(2);
        //var tabIndex2 = tabstrip.select(3);
        //var tabIndex3 = tabstrip.select(4);
        //var tabIndex4 = tabstrip.select(5);

        tabStrip.disable(tabStrip.tabGroup.children().eq(ind1));
        tabStrip.disable(tabStrip.tabGroup.children().eq(ind2));
        tabStrip.disable(tabStrip.tabGroup.children().eq(ind3));
        tabStrip.disable(tabStrip.tabGroup.children().eq(ind4));
        tabStrip.disable(tabStrip.tabGroup.children().eq(ind5));

    }
}

//function GetAllAdrdata(ItmTypKy, Dept, Cat, ObjKy, PageNo, size, OnlyisAct) {

//    $.ajax({
//        url: urlGetAllItemsWithDept,
//        data: JSON.stringify({
//            ItmTypKy: ItmTypKy,
//            Dept: Dept,
//            Cat: Cat,
//            ObjKy: ObjKy,
//            PageNo: PageNo,
//            Size: size,
//            OnlyisAct: OnlyisAct


//        }),
//        contentType: "application/json; charset=utf-8",
//        dataType: "Json",
//        type: "POST",
//        success: function (DataSet) {


//            try {
//                var gridWidget = $('#Itemgrid').data("kendoGrid");
//                dtSource.data().push.apply(gridWidget.dataSource.data(), DataSet);
//                var TotalRec = DataSet[0].Lino;
//                // gridWidget.dataSource.data(DataSet);
//                if (TotalRec - 1 > size) {
//                    startSize += size;

//                    if (TotalRec < (startSize + size)) {
//                        size = TotalRec - (startSize + 1);
//                    }
//                    if (size <= 0) {

//                        return dtSource;
//                    }
//                    GetAllAdrdata(ItmTypKy, Dept, Cat, ObjKy, startSize, size, OnlyisAct);
//                }
//            } catch (e) {
//                alert("Please try Again");
//            }
//        },
//        error: function (e) {
//            alert("Network Related Issue");
//            return false;
//        }
//    });

//}


function LoadItemGridView(ItmTypKy) {

    //var uploadInput = '<form method="post" action="#"><div><input name="upload" type="file" /></div></form>';

    var Itmcolumns = [
            { command: ["edit"], title: "&nbsp;", width: "100px", },
            //{
            //    field: "ItmKy", title: "Ref #", width: "10px", hidden: true, 
            //},
            //{
            //    field: "ItmCat7Ky", title: "Ref #", width: "10px", hidden: true, 
            //},
            //{
            //    field: "ItmCat8Ky", title: "Ref #", width: "10px", hidden: true, 
            //},
            //{
            //    field: "ItmTypKy", title: "ItmTypKy", width: "10px", hidden: true,
            //},
            {
                field: "ItmTyp", title: "Item Type", width: "100px", attributes: { style: "text-align:center;" },
                editor: function (container, options) {
                    var model = options.model;
                    $('<input id="ItmTypKy" name="' + options.field + '" />').appendTo(container).kendoComboBox({
                        dataSource: CdNm_SelectMob_Datasource('HdrSec1_CmbTyp'),
                        change: function (e) {
                            combo = e.sender;
                            selectedItm = combo.select();
                            dataItem = combo.dataItem(selectedItm);

                            var cmb = $("#ItmTypKy").data("kendoComboBox");
                            var val = cmb.value();

                            if (isNaN(val)) {
                                alert("'" + val + "' is not a Valid input");
                                cmb.value("");
                                model.set("ItmTypKy", 1);
                                model.set("ItmTyp", "");
                            }
                            else {

                                model.set("ItmTyp", dataItem.CdNm);
                                model.set("ItmTypKy", dataItem.CdKy);
                            }
                        },
                        dataValueField: "CdKy",
                        dataTextField: "CdNm",
                        dataBound: function (e) {
                        }
                    });
                }
            },
            {
                field: "ItmCd", title: "ItemCode", width: "100px", attributes: { style: "text-align:center;" },
            },
        {
            field: "ItmNm", title: "Item Name", width: "100px", attributes: { style: "text-align:center;" },
            filterable: {
                // mode: "row",
                operators: {
                    string: {
                        contains: "Contains",
                        startswith: "Starts with",
                        eq: "Is equal to",
                        neq: "Is not equal to"
                    }
                }
            },

        },
        {
            field: "ItmDisplayNm", title: "Display Name", width: "100px", attributes: { style: "text-align:center;" },
            filterable: {
                // mode: "row",
                operators: {
                    string: {
                        contains: "Contains",
                        startswith: "Starts with",
                        eq: "Is equal to",
                        neq: "Is not equal to"
                    }
                }
            },

        },
        {
            field: "EAN", title: "Barcode EAN", width: "100px", attributes: { style: "text-align:center;" },
        },
            {
                field: "Cat7Cd", title: "Department", width: "100px", attributes: { style: "text-align:center;" },
                editor: function (container, options) {
                    var model = options.model;
                    $('<input id="Dept" name="' + options.field + '" />').appendTo(container).kendoComboBox({
                        dataSource: CdNm_SelectMob_Datasource('HdrSec1_CmbDept'),
                        change: function (e) {
                            combo = e.sender;
                            selectedItm = combo.select();
                            dataItem = combo.dataItem(selectedItm);

                            var cmb = $("#Dept").data("kendoComboBox");
                            var val = cmb.value();

                            if (isNaN(val)) {
                                alert("'" + val + "' is not a Valid input");
                                cmb.value("");
                                model.set("ItmCat7Ky", 1);
                                model.set("Cat7Cd", "");
                            }
                            else {

                                model.set("Cat7Cd", dataItem.CdNm);
                                model.set("ItmCat7Ky", dataItem.CdKy);
                            }
                        },
                        dataValueField: "CdKy",
                        dataTextField: "CdNm",
                        dataBound: function (e) {
                        }
                    });
                }
            },
            {
                field: "Cat8Cd",
                title: "Category",
                width: "100px", attributes: { style: "text-align:center;" },
                editor: function (container, options) {
                    var model = options.model;
                    var cat7Ky = model.ItmCat7Ky;
                    if (!cat7Ky) {
                        cat7Ky = 1;
                    }

                    $('<input id="Cat8Cd" name="' + options.field + '" />').appendTo(container).kendoComboBox({
                        dataSource: CdNm_SelectMob_Datasource('HdrSec1_CmbCat'),//CatDataSrcLoad(cat7Ky),
                        change: function (e) {
                            combo = e.sender;
                            selectedItm = combo.select();
                            dataItem = combo.dataItem(selectedItm);

                            var cmb = $("#Cat8Cd").data("kendoComboBox");
                            var val = cmb.value();

                            if (isNaN(val)) {
                                alert("'" + val + "' is not a Valid input");
                                cmb.value("");
                                model.set("ItmCat8Ky", 1);
                                model.set("Cat8Cd", "");
                            }
                            else {

                                model.set("Cat8Cd", dataItem.CdNm);
                                model.set("ItmCat8Ky", dataItem.CdKy);
                            }
                        },
                        dataValueField: "CdKy",
                        dataTextField: "CdNm",
                        dataBound: function (e) {
                        }
                    });
                }

            },
                {
                    field: "Brand", title: "Brand", width: "100px", attributes: { style: "text-align:center;" },
                    editor: function (container, options) {
                        var model = options.model;
                        $('<input id="Brand" name="' + options.field + '" />').appendTo(container).kendoComboBox({
                            dataSource: CdNm_SelectMob_Datasource('HdrSec1_CmbBrand'),
                            change: function (e) {
                                combo = e.sender;
                                selectedItm = combo.select();
                                dataItem = combo.dataItem(selectedItm);

                                var cmb = $("#Brand").data("kendoComboBox");
                                var val = cmb.value();

                                if (isNaN(val)) {
                                    alert("'" + val + "' is not a Valid input");
                                    cmb.value("");
                                    model.set("BrandKy", 1);
                                    model.set("Brand", "");
                                }
                                else {

                                    model.set("Brand", dataItem.CdNm);
                                    model.set("BrandKy", dataItem.CdKy);
                                }
                            },
                            dataValueField: "CdKy",
                            dataTextField: "CdNm",
                            dataBound: function (e) {
                            }
                        });
                    }
                },
                //{
                //    field: "BrandKy", title: "BrandKy", width: "60px", hidden: true, attributes: { style: "text-align:center;" },
                //},
                {
                    field: "Vat", title: "Vat%", width: "100px", attributes: { style: "text-align:center;" },
                    editor: function (container, options) {
                        var model = options.model;
                        $('<input id="Vat" name="' + options.field + '" />').appendTo(container).kendoComboBox({
                            dataSource: CdNm_SelectMob_Datasource('HdrSec1_CmbVat'),
                            change: function (e) {
                                combo = e.sender;
                                selectedItm = combo.select();
                                dataItem = combo.dataItem(selectedItm);

                                var cmb = $("#Vat").data("kendoComboBox");
                                var val = cmb.value();

                                if (isNaN(val)) {
                                    alert("'" + val + "' is not a Valid input");
                                    cmb.value("");
                                    model.set("ItmTaxCatKy", 1);
                                    model.set("Vat", "");
                                }
                                else {
                                    model.set("Vat", dataItem.CdNm);
                                    model.set("ItmTaxCatKy", dataItem.CdKy);
                                }

                            },
                            dataValueField: "CdKy",
                            dataTextField: "CdNm",
                            dataBound: function (e) {
                            }
                        });
                    }
                },
                //{
                //    field: "ItmTaxCatKy", title: "ItmTaxCatKy", width: "60px", hidden: true, attributes: { style: "text-align:center;" },
                //},

                {
                    field: "Unit", title: "Unit", width: "100px", attributes: { style: "text-align:center;" },
                    editor: function (container, options) {
                        var model = options.model;
                        $('<input id="cmbUnitKy" name="' + options.field + '" />').appendTo(container).kendoComboBox({ //data-bind="value:' + options.field + '" required="required" 
                            dataSource: {
                                type: "POST",
                                transport: {
                                    read: {
                                        url: URLUnitCmbLoad,
                                    }
                                }
                            },
                            change: function (e) {
                                combo = e.sender;
                                selectedItm = combo.select();
                                dataItem = combo.dataItem(selectedItm);

                                var cmb = $("#cmbUnitKy").data("kendoComboBox");
                                var val = cmb.value();

                                if (isNaN(val)) {
                                    alert("'" + val + "' is not a Valid input");
                                    cmb.value("");
                                    model.set("UnitKy", 1);
                                    model.set("Unit", "");
                                }
                                else {
                                    model.set("UnitKy", dataItem.UnitKy);
                                    model.set("Unit", dataItem.Unit);
                                }

                            },
                            dataValueField: "UnitKy",
                            dataTextField: "Unit",
                            dataBound: function (e) {
                            }
                        });
                    }
                },
                //{
                //    field: "UnitKy", title: "UnitKy", width: "60px", hidden: true, attributes: { style: "text-align:center;" },
                //},
                //{
                //    field: "ItmTaxKy", title: "ItmTaxKy", width: "60px", hidden: true, attributes: { style: "text-align:center;" },
                //},
                {
                    field: "Image", title: "ImageUpload", width: "0px", filterable: false,
                    template: '<input name="Image" id="Image" type="file" />',                   
                    editor: function (container, options) {
                        var guid = kendo.guid();
                        $("input[id='Image']").kendoUpload({
                            //multiple: true,
                            //async: {
                            //    saveUrl: "InsertFileswithpath/ItmPrfl",
                            //    autoUpload: false
                            //},
                            //success: onSuccess,
                            //showFileList: false,
                            //localization: {
                            //    select: "file...",
                            //},
                            //template: $('<input type="file" id="' + guid + '" data-role="upload" name="Image" />').appendTo(container)

                            template: $('<input type="file" id="' + guid + '" data-role="upload" data-async=\'{  saveUrl: "InsertFileswithpath/ItmPrfl","autoUpload":"false"}\' multiple="true" data-success="onSuccess"  name="Image" localization=\'{ select: "file..."}\' />').appendTo(container)
                        });
                    }
                },
                 
                {
                    field: "FileName", title: "FileName", width: "100px", hidden: true, attributes: { style: "text-align:center;" },                 
                    //filterable: false,
                    //sortable: false,
                    //template: '<input name="FileName" id="FileName" type="file" />' //"#= uploadInput #"
                },
                {
                    field: "DeleteImage", title: "Clear Image", width: "120px",
                    editor: function (container, options) {
                        var guid1 = kendo.guid();
                        $('<label class="lbl-switch"> <input id="' + guid1 + '" type="checkbox" name="DeleteImage"  data-type="boolean"  data-bind="checked:DeleteImage" /> <div> <span class="on">Yes</span> <span class="off">No</span> </div> <i></i> </label>').appendTo(container);
                    }
                    //template: '<label class="lbl-switch"> <input type="checkbox" #= DeleteImage? "checked=checked" : "" # class="DeleteImagePinChecked"/> <div> <span class="on">Yes</span> <span class="off">No</span> </div> <i></i> </label>',                   
                },
                {
                    field: "isAct", title: "isActive", width: "80px",
                    editor: function (container, options) {
                        var guid2 = kendo.guid();
                        $('<label class="lbl-switch"> <input id="' + guid2 + '" type="checkbox"  name="isAct"  data-type="boolean"  data-bind="checked:isAct"/> <div> <span class="on">Yes</span> <span class="off">No</span> </div> <i></i> </label>').appendTo(container);
                    },
                    //template: '<input type="checkbox"  #= isAct? "checked=checked" : "" # class="isActPinChecked"></input>',                                
                },
                {
                    field: "isAgeVarification", title: "Age Verification", width: "120px",
                    editor: function (container, options) {
                        var guid3 = kendo.guid();
                        $('<label class="lbl-switch"> <input id="' + guid3 + '" type="checkbox" name="isAgeVarification"  data-type="boolean"  data-bind="checked:isAgeVarification" /> <div> <span class="on">Yes</span> <span class="off">No</span> </div> <i></i> </label>').appendTo(container);
                    },
                    //template: '<input type="checkbox"  #= isAgeVarification? "checked=checked" : "" # class="isAgeVarificationPinChecked"></input>',                 
                },
                {
                    field: "isAlwTrnRateChange", title: "Prompt Price", width: "110px",
                    editor: function (container, options) {
                        var guid4 = kendo.guid();
                        $('<label class="lbl-switch"> <input id="' + guid4 + '" type="checkbox" name="isAlwTrnRateChange"  data-type="boolean" data-bind="checked:isAlwTrnRateChange"/> <div> <span class="on">Yes</span> <span class="off">No</span> </div> <i></i> </label>').appendTo(container);
                    },
                    //template: '<input type="checkbox"  #= isAlwTrnRateChange? "checked=checked" : "" # class="isAlwTrnRateChangePinChecked"></input>',                   
                },

    ];
    var gridNo = 1;
    var FinalItmColumn = setColumnProp(Itmcolumns, viewBag.ObjKy, '', 'HdrSec2_Tab1_FrmGrd', gridNo)
    // LoadGridWithColumnProp(Itmcolumns, gridNo);
}


function LoadGridData() {
    var dataaray = [];
    var flag = 0;
    var i = 1;
    while (flag == 0) {

        var dataSource = DatasourceFill(i, 1000);
        dataSource.read();
        for (var j = 0; j < dataSource.data().length; j++) {

            dataaray.push(dataSource.data()[j]);
        }

        ///////////////////////
        //for (var j = 0; j < dataSource.data().length; j++) {

        //    dataaray.push(dataSource.data()[j]);
        //}
        //for (var j = 0; j < dataSource.data().length; j++) {

        //    dataaray.push(dataSource.data()[j]);
        //}
        //for (var j = 0; j < dataSource.data().length; j++) {

        //    dataaray.push(dataSource.data()[j]);
        //}
        //for (var j = 0; j < dataSource.data().length; j++) {

        //    dataaray.push(dataSource.data()[j]);
        //}
        //for (var j = 0; j < dataSource.data().length; j++) {

        //    dataaray.push(dataSource.data()[j]);
        //}
        //for (var j = 0; j < dataSource.data().length; j++) {

        //    dataaray.push(dataSource.data()[j]);
        //}
        //for (var j = 0; j < dataSource.data().length; j++) {

        //    dataaray.push(dataSource.data()[j]);
        //}

        //for (var j = 0; j < dataSource.data().length; j++) {

        //    dataaray.push(dataSource.data()[j]);
        //} for (var j = 0; j < dataSource.data().length; j++) {

        //    dataaray.push(dataSource.data()[j]);
        //}

        //for (var j = 0; j < dataSource.data().length; j++) {

        //    dataaray.push(dataSource.data()[j]);
        //}
        //for (var j = 0; j < dataSource.data().length; j++) {

        //    dataaray.push(dataSource.data()[j]);
        //}
        //for (var j = 0; j < dataSource.data().length; j++) {

        //    dataaray.push(dataSource.data()[j]);
        //}
        //for (var j = 0; j < dataSource.data().length; j++) {

        //    dataaray.push(dataSource.data()[j]);
        //}
        //for (var j = 0; j < dataSource.data().length; j++) {

        //    dataaray.push(dataSource.data()[j]);
        //}
        //for (var j = 0; j < dataSource.data().length; j++) {

        //    dataaray.push(dataSource.data()[j]);
        //}
        //for (var j = 0; j < dataSource.data().length; j++) {

        //    dataaray.push(dataSource.data()[j]);
        //}
        //for (var j = 0; j < dataSource.data().length; j++) {

        //    dataaray.push(dataSource.data()[j]);
        //}
        //for (var j = 0; j < dataSource.data().length; j++) {

        //    dataaray.push(dataSource.data()[j]);
        //}
        //for (var j = 0; j < dataSource.data().length; j++) {

        //    dataaray.push(dataSource.data()[j]);
        //}
        //for (var j = 0; j < dataSource.data().length; j++) {

        //    dataaray.push(dataSource.data()[j]);
        //}
        //for (var j = 0; j < dataSource.data().length; j++) {

        //    dataaray.push(dataSource.data()[j]);
        //}

        //for (var j = 0; j < dataSource.data().length; j++) {

        //    dataaray.push(dataSource.data()[j]);
        //}
        //for (var j = 0; j < dataSource.data().length; j++) {

        //    dataaray.push(dataSource.data()[j]);
        //}
        //for (var j = 0; j < dataSource.data().length; j++) {

        //    dataaray.push(dataSource.data()[j]);
        //}
        //for (var j = 0; j < dataSource.data().length; j++) {

        //    dataaray.push(dataSource.data()[j]);
        //}
        /////////////////////////////////






        if (dataSource.data().length < 1000) {
            flag = 1;
        }
        i++;
    }
    return dataaray;

}


function DatasourceFill(PageNo, PageSize) {
    //var tabstrip = $("#tabstrip").kendoTabStrip().data("kendoTabStrip");
    //var tabIndx = -1;
    //var tab = tabstrip.select();
    var ItmTypKy = $("#HdrSec1_CmbTyp_Cd").data('kendoComboBox').value();
    var Dept = $("#HdrSec1_CmbDept_Cd").data('kendoComboBox').value();
    var ItmTyp = $("#HdrSec1_CmbTyp_Cd").data('kendoComboBox').text();
    var ItmCd = $("#HdrSec1_InptItmCd_Val").val();
    var ItmNm = $("#HdrSec1_InptItmNm_Val").val();
    var Dept = $("#HdrSec1_CmbDept_Cd").data('kendoComboBox').value();
    if (Dept == "" || Dept == null) { Dept = 1; }

    var Cat = $("#HdrSec1_CmbCat_Cd").data('kendoComboBox').value();
    if (Cat == "" || Cat == null) { Cat = 1; }
    var AllItem = 0;
    if ($('#HdrSec1_AllItm_Val').is(":checked")) {
        AllItem = 1;
    }
    //  tabIndx = tab.index();

    //if (tabIndx == 0) {
    //    LoadItemGridView(ItmTypKy);
    //}
    //else if (tabIndx == 2) {
    //    LoadItmSettingsGrid();
    //}
    //else if (tabIndx == 3) {
    //    LoadPriceGrid();
    //}


    var griddataSource = new kendo.data.DataSource({
        transport: {
            read: {
                url: urlGetAllItemsWithDept, // '@Url.Action("GetAllItemsWithDept", "ItmPrfl")',
                //contentType: 'application/json; charset=utf-8',
                //data: {
                //    ConCd: 'TRADING',
                //    TypConCd: 'ItmTyp',
                //    TypKy: ItmTypKy
                //},
                //  data:parameterMap,
                dataType: "json",
                type: "POST",
                async: false,

            },
            update: {
                url: urlUpdate, //urlInsert,
                type: "PUT",

            },
            create: {
                url: urlInsert,
                dataType: "json",
                // type: "POST",              
            },

            parameterMap: function (options, operation) {

                if (operation == "read") {
                    return ({
                        'ItmTypKy': ItmTypKy,
                        'Dept': Dept,
                        'Cat': Cat,
                        'ObjKy': viewBag.ObjKy,
                        'PageNo': PageNo,
                        'PageSize': PageSize,
                        'OnlyisAct': AllItem,
                        'ItmCd': ItmCd,
                        'ItmNm': ItmNm

                    })
                }
                if (operation !== "read" && options.models) {
                    return { models: kendo.stringify(options.models) };
                }
            }

        },
        requestStart: function (e) {
            // alert('sdsdsad');

            if (e.type == "update") {

                alert('sdsdsad');

            }
        },

        batch: true,
        pageSize: 10,

        schema: {
            model: {
                id: "ItmKy",
                fields: //Relavent fields of the grid should be bind with following model items
                {
                    ItmKy: { editable: false, nullable: false, type: "number" },
                    ItmCd: { editable: true, nullable: false, type: "string", validation: { required: true, } },
                    ItmTypKy: { editable: true, nullable: false, type: "number", defaultValue: ItmTypKy },
                    ItmNm: { editable: true, nullable: false, type: "string", validation: { required: true, } },
                    ItmDisplayNm: { editable: true, nullable: true, type: "string" },
                    PartNo: { editable: false, nullable: true },
                    Unit: { editable: true, nullable: false, type: "string", },
                    UnitKy: { editable: true, nullable: false, type: "number", },
                    UsageUnit: { editable: false, nullable: true },
                    UsageUnitKy: { editable: false, nullable: true },
                    Units: { editable: true, nullable: true },
                    ItmCat1Ky: { editable: false, nullable: true, type: "number" },
                    ItmCat2Ky: { editable: false, nullable: true, type: "number" },
                    ItmCat3Ky: { editable: false, nullable: true, type: "number" },
                    ItmCat4Ky: { editable: false, nullable: true, type: "number" },
                    ItmCat5Ky: { editable: false, nullable: true, type: "number" },
                    ItmCat6Ky: { editable: false, nullable: true, type: "number" },
                    ItmCat7Ky: { editable: true, nullable: false, type: "number", },
                    ItmCat8Ky: { editable: true, nullable: false, type: "number", },
                    ItmCat9Ky: { editable: false, nullable: true, type: "number" },
                    ItmCat10Ky: { editable: false, nullable: true, type: "number" },
                    ItmCat11Ky: { editable: false, nullable: true, type: "number" },
                    ItmCat12Ky: { editable: false, nullable: true, type: "number" },
                    Cat1Cd: { editable: true, nullable: true, type: "string" },
                    Cat2Cd: { editable: true, nullable: true, type: "string" },
                    Cat3Cd: { editable: true, nullable: true, type: "string" },
                    Cat4Cd: { editable: true, nullable: true, type: "string" },
                    Cat5Cd: { editable: true, nullable: true, type: "string" },
                    Cat6Cd: { editable: true, nullable: true, type: "string" },
                    Cat7Cd: { editable: true, nullable: true, type: "string", },
                    Cat8Cd: { editable: true, nullable: true, type: "string", },
                    Cat9Cd: { editable: true, nullable: true, type: "string" },
                    Cat10Cd: { editable: true, nullable: true, type: "string" },
                    Cat11Cd: { editable: true, nullable: true, type: "string" },
                    Cat12Cd: { editable: true, nullable: true, type: "string" },
                    ReOrdLvl: { editable: false, nullable: true, type: "number" },
                    ReOrdQty: { editable: false, nullable: true, type: "number" },
                    Brand: { editable: true, nullable: false, type: "string" },
                    BrandKy: { editable: true, nullable: false, type: "number" },

                    ItmKy: { editable: false, nullable: false, type: "number" },
                    LiNo: { editable: false, nullable: false, type: "string" },
                    isDiscontinued: { editable: false, nullable: false, type: "boolean" },
                    isAlwTrnRateChange: { editable: true, nullable: false, type: "boolean" },
                    isAlwZeroPrice: { editable: false, nullable: false, type: "boolean" },
                    isAgeVarification: { editable: true, nullable: false, type: "boolean" },
                    MinQty: { editable: false, nullable: false, type: "float" },
                    MaxQty: { editable: false, nullable: false, type: "float" },
                    isAct: { editable: true, nullable: false, type: "boolean", defaultValue: true },
                    EAN: { editable: true, nullable: false, type: "string" },
                    ItmTyp: { editable: true, nullable: false, type: "string", defaultValue: ItmTyp },
                    Vat: { editable: true, nullable: false, type: "string", },
                    ItmTaxCatKy: { editable: true, nullable: false, type: "number", validation: { required: true, min: 1 }, },
                    ItmTaxKy: { editable: false, nullable: false, type: "number" },
                    Image: { editable: true, nullable: false, type: "string" },
                    FileName: { editable: true, nullable: false, type: "string" },
                    DeleteImage: { editable: true, nullable: false, type: "boolean", defaultValue: false }
                    //TranRat: { editable: true, nullable: false },
                }
            }
        }
    }
    );


    return griddataSource;
}

function LoadGridWithColumnProp(columnsFinal, gridNo) {

    var ItmTypKy = $("#HdrSec1_CmbTyp_Cd").data('kendoComboBox').value();
    var AllItem = 0;
    if ($('#HdrSec1_AllItm_Val').is(":checked")) {
        AllItem = 1;
    }
    var gridWidget = $('#Itemgrid').data().kendoGrid;
    //alert(1);
    var ItmTyp = $("#HdrSec1_CmbTyp_Cd").data('kendoComboBox').text();
    var ItmCd = $("#HdrSec1_InptItmCd_Val").val();
    // $("#HdrSec1_InptItmNm_Val").val(null);
    $("#imagePreview").css('background-image', 'none');
    $("#imagePreview").empty();
    ItmKy = $("#ItmKy").val(1);
    ItmSettingsTab();

    var Dept = $("#HdrSec1_CmbDept_Cd").data('kendoComboBox').value();
    if (Dept == "" || Dept == null) { Dept = 1; }

    var Cat = $("#HdrSec1_CmbCat_Cd").data('kendoComboBox').value();
    if (Cat == "" || Cat == null) { Cat = 1; }

    if (gridNo == 1) {
        try {
            $('#Itemgrid').data().kendoGrid.destroy();
            $('#Itemgrid').empty();
        } catch (e) { }


        var pageSize = 1300;
        var PageNo = HTNPaginationCtrlData.PageNo;
        var dtsource = LoadGridData();


        //  gridWidget.dataSource.data().push.apply(gridWidget.dataSource.data(), griddataSource);
        $("#Itemgrid").kendoGrid({
            // dataSource: griddataSource,
            dataSource: dtsource,
            toolbar: ["create"],
            autobind: true,
            resizable: true,
            navigatable: true,
            sortable: true,
            reorderable: true,
            pageSize: 50,
            scrollable: {
                virtual: true
            },
            //selectable: "row",
            selectable: true,
            pageable: {
                refresh: true, pageSizes: [5, 10, 20, 50, 100, 150]
            },
            //columnMenu: true,
            filterable: true,
            //filterable: {
            //    mode: "row"
            //},
            columns: columnsFinal,
            dataBinding: function () {
                record = (this.dataSource.page() - 1) * this.dataSource.pageSize();
            },
            edit: function (e) {
                $("[name='ItmCd']", e.container).blur(function () {
                    checkItmCdExist();
                });

                $("[name='Image']", e.container).click(function () {
                  
                 // getItmKy();
                });

            },
            dataBound: function (e) {
                $("input[id='Image']").kendoUpload({
                    //document.getElementById('Image').kendoUpload({
                    async: {
                        saveUrl: "InsertFileswithpath/ItmPrfl", //'@Url.Content("~/ItmPrfl/InsertFileswithpath")', //'@Url.Action("ItmPrfl","InsertFileswithpath")', //'@Url.Action
                        //removeUrl: "remove",
                        autoUpload: true,

                    },
                    success: onSuccess,
                    showFileList: false,
                    localization: {
                        select: "file...",
                    }

                });
            },
            editable: "popup",
            save: function (e) {
                var grid = $("#Itemgrid").data("kendoGrid");

                var currentData = grid.dataSource.data();
                var updatedRecords = [];
                var newRecords = [];

                for (var i = 0; i < currentData.length; i++) {
                    if (!currentData[i].isNew) {//!currentData[i].ItmKy && !currentData[i].dirty
                        newRecords.push(currentData[i].toJSON());
                    }
                    else if (currentData[i].dirty) {
                        updatedRecords.push(currentData[i].toJSON());
                        //newRecords.push(currentData[i].toJSON());
                    }
                }

                $.ajax({
                    url: urlInsert,
                    dataType: "json",
                    type: "POST",
                    data: JSON.stringify({
                        NewGridDetail: kendo.stringify(newRecords),
                        updateGrid: kendo.stringify(updatedRecords),
                    }),

                    contentType: 'application/json; charset=utf-8',
                    success: function (data) {

                        if (data == true) {

                            alert("Saved Successfully");
                            LoadItemGridView(ItmTypKy);
                        } else {
                            alert("Record Not Saved");
                            LoadItemGridView(ItmTypKy); // update grid
                        }
                    },
                    error: function (e) {
                        return false;
                    }
                });

            },

            //editable: true,
        }).on("click", "tbody tr", function (e) {
            var cell = $(e.currentTarget);
            var cellIndex = cell[0].cellIndex;
            var grid = $("#Itemgrid").data("kendoGrid");
            var column = grid.columns[cellIndex];
            var dataItem = grid.dataItem(cell.closest("tr"));           
            var currentData = grid.dataSource.data();
            for (var i = 0; i < currentData.length; i++) {
                if (currentData[i].ItmKy == dataItem.ItmKy) {
                    FormGlblData.gridIndex = i;
                }

               
            }


          //  alert(JSON.stringify(dataItem))
            
           // alert("Selected value " + dataItem[column.field]);
        });

        //  DatasourceFill(1300, 1);

        //for (i = 1; dtsource.total() >= pageSize; i++) {
        //    PageNo = pageSize;
        //     dtsource = DatasourceFill(pageSize, PageNo);
        //    var gridWidget = $('#Itemgrid').data("kendoGrid");
        //    gridWidget.dataSource.data().push.apply(gridWidget.dataSource.data(), dtsource);

        //}       

    }
}

function onSuccess(e) {

    if (e.operation == "upload") {
        var UploadedFile = e.response.fileName;
        var RowUpdate = $("#Itemgrid").data().kendoGrid.dataSource.data()[FormGlblData.gridIndex];
        RowUpdate.set("FileName", UploadedFile);
           
       
        //var id = ("#Itemgrid");
        //var grid = $(id).data().kendoGrid;
        //var item = grid.dataItem(this.element.closest("tr"));

        //var grid = $("#Itemgrid").data("kendoGrid");
        //var selectedRow = grid.select();
       //var item = FormGlblData.gridIndex// selectedRow.index();
          
        //return
        //var item = grid.dataItem($(this).closest('tr'));

       // item.FileName = UploadedFile;
       // item.dirty = true;
    }
}

function getFileInfo(e) {
    return $.map(e.files, function (file) {
        info = file.name;

        // File size is not available in all browsers
        //if (file.size > 0) {
        //    info += " (" + Math.ceil(file.size / 1024) + " KB)";
        //}
        return info;
    }).join(", ");
}

function dataBound(e) {
    var grid = this;
    this.tbody.find("input[name=files]").kendoUpload({
        multiple: false,
        async: {
            saveUrl: 'url',
        },
        upload: function (e) {
            var item = grid.dataItem(this.element.closest("tr"));
            e.data = { id: item.id };
        },
        success: function (e) {
            var FileName = e.response.FileName;
            var item = grid.dataItem(this.element.closest("tr"));
            item.FileName = FileName;
            item.dirty = true;
        }
    });
}
function getItmKy() {
    var id = ("#Itemgrid");
    var grid = $(id).data().kendoGrid;
    var selectedItem = grid.dataItem(grid.select());
    var selectedRow = grid.select();
    var ItmKey = "";
    try {
        ItmKey = selectedItem.ItmKy;

    } catch (e) {
        //  var dataItem = $("#Itemgrid").data("kendoGrid").dataSource.get(0);
        // alert(JSON.stringify(dataItem))
        // get a reference to the grid widget
        var grid = $("#Itemgrid").data("kendoGrid");
        // returns the data item for first row
        var selectedItem = grid.dataItem(grid.tbody.find(">tr:first"));
      //  alert(JSON.stringify(selectedItem))
        ItmKey = selectedItem.ItmKy;

    }
}

function checkItmCdExist() {
    var id = ("#Itemgrid");
    var grid = $(id).data().kendoGrid;
    var selectedItem = grid.dataItem(grid.select());
    var Itmcd = "";
    var itmtypky = "";
    try {
        Itmcd = selectedItem.ItmCd;
        itmtypky = selectedItem.ItmTypKy;

    } catch (e) {
        //  var dataItem = $("#Itemgrid").data("kendoGrid").dataSource.get(0);
        // alert(JSON.stringify(dataItem))
        // get a reference to the grid widget
        var grid = $("#Itemgrid").data("kendoGrid");
        // returns the data item for first row
        var selectedItem = grid.dataItem(grid.tbody.find(">tr:first"));
        Itmcd = selectedItem.ItmCd;
        itmtypky = selectedItem.ItmTypKy;

    }


    if (itmtypky == "")
        itmtypky = ItmTypKy;
    $.ajax({
        url: URLCheckItmCdExist,
        data: { Itmcd: Itmcd, Itmtypky: itmtypky },
        dataType: "Json",
        type: "POST",
        success: function (data) {
            if (data == true)
            { alert("Item code already exist"); }
        }
    });
}

function LoadItmSettingsGrid() {

    var ItmSettingsColumn = [
            {
                field: "ItmCdKy", title: "ItmCdKy", width: "100px", hidden: true, attributes: { style: "text-align:center;" },
            },
            {
                field: "ControlConKy", title: "ControlConKy", width: "100px", hidden: true, attributes: { style: "text-align:center;" },
            },

            {
                field: "ItmKy", title: "ItmKy", width: "100px", hidden: true, attributes: { style: "text-align:center;" },
            },
            {
                field: "LocNm", title: "Location", width: "100px", attributes: { style: "text-align:center;" },
                filterable: {
                    // mode: "row",
                    operators: {
                        string: {
                            contains: "Contains",
                            startswith: "Starts with",
                            eq: "Is equal to",
                            neq: "Is not equal to"
                        }
                    }
                },
                editor: function (container, options) {
                    var model = options.model;
                    $('<input id="LocNm" name="' + options.field + '"/>').appendTo(container).kendoComboBox({
                        dataSource: CdNm_SelectMob_Datasource('LocNm'),
                        change: function (e) {

                            combo = e.sender;
                            selectedItm = combo.select();
                            dataItem = combo.dataItem(selectedItm);

                            var cmb = $("#LocNm").data("kendoComboBox");
                            var val = cmb.value();

                            if (isNaN(val)) {
                                alert("'" + val + "' is not a Valid input");
                                cmb.value("");
                                model.set("CdKy", 1);
                                model.set("LocNm", "");
                            } else {
                                model.set("CdKy", dataItem.CdKy);
                                model.set("LocNm", dataItem.CdNm);
                            }
                        },
                        dataValueField: "CdKy",
                        dataTextField: "CdNm"
                    });
                }
            },
            {
                field: "SupNm", title: "Supplier", width: "100px", attributes: { style: "text-align:center;" },
                filterable: {
                    // mode: "row",
                    operators: {
                        string: {
                            contains: "Contains",
                            startswith: "Starts with",
                            eq: "Is equal to",
                            neq: "Is not equal to"
                        }
                    }
                },
                editor: function (container, options) {
                    var model = options.model;
                    $('<input id="SupNm" name="' + options.field + '"/>').appendTo(container).kendoComboBox({
                        dataSource: AdrNm_SelectMob_DataSource('SupNm'),
                        change: function (e) {

                            combo = e.sender;
                            selectedItm = combo.select();
                            dataItem = combo.dataItem(selectedItm);

                            var cmb = $("#SupNm").data("kendoComboBox");
                            var val = cmb.value();

                            if (isNaN(val)) {
                                alert("'" + val + "' is not a Valid input");
                                cmb.value("");
                                model.set("DefaultSupAdrKy", 1);
                                model.set("SupNm", "");
                            } else {
                                model.set("DefaultSupAdrKy", dataItem.AdrKy);
                                model.set("SupNm", dataItem.AdrNm);
                            }
                        },
                        dataValueField: "AdrKy",
                        dataTextField: "AdrNm"
                    });
                }
            },
            {
                field: "DefaultSupAdrKy", title: "DefaultSupAdrKy", width: "100px", hidden: true, attributes: { style: "text-align:center;" },
            },
            {
                field: "OfrCode", title: "Promotion Code", width: "100px", attributes: { style: "text-align:center;" },
            },
            {
                field: "OrdUnit", title: "Order Unit", width: "100px", attributes: { style: "text-align:center;", "class": "non-editable" }
            },
            {
                field: "SalesUnit", title: "Sales Unit", width: "100px", attributes: { style: "text-align:center;", "class": "non-editable" }
            },
            {
                field: "InventoryUnit", title: "Inventory Unit", width: "100px", attributes: { style: "text-align:center;" }, hidden: true,
            },
            {
                field: "CosPri", title: "Cost Price", width: "100px", attributes: { style: "text-align:center;", "class": "non-editable" }, template: '#= kendo.toString(CosPri, "n2")#',
            },
            {
                field: "SlsPri", title: "Sales Price", width: "100px", attributes: { style: "text-align:center;", "class": "non-editable" }, template: '#= kendo.toString(SlsPri, "n2")#',
            },
            {
                field: "ReOrdLvl", title: "Reorder Level", width: "100px", attributes: { style: "text-align:center;" },
            },
            {
                field: "ReOrdQty", title: "Reorder Qty%", width: "100px", attributes: { style: "text-align:center;" }, template: '#= kendo.toString(ReOrdQty, "n3")#',
            },
              {
                  //field: "isDiscontinued", title: "Discontinue", width: "100px", attributes: { style: "text-align:center;" },
                  title: "Discontinue", width: "100px",
                  template: '<label class="lbl-switch"> <input type="checkbox"  #= isDiscontinued? "checked=checked" : "" # class="isDiscontinuedPinChecked"/> <div> <span class="on">Yes</span> <span class="off">No</span> </div> <i></i> </label>',
                  //template: '<div class=\"center-txt\"><label class=\"switch margin-auto\"> <input type=\"checkbox\" #= isDiscontinued? "checked=checked" : "" # class="isDiscontinuedPinChecked" > <span class=\"slider round\"></span></label></div>',
                  //template: '<input type="checkbox"  #= isDiscontinued? "checked=checked" : "" # class="isDiscontinuedPinChecked"></input>',
              },
              {
                  //field: "isShowInWeb", title: "Shown in Website", width: "100px", attributes: { style: "text-align:center;" },
                  title: "Shown in Website", width: "100px",
                  template: '<label class="lbl-switch"> <input type="checkbox"  #= isShowInWeb? "checked=checked" : "" # class="isShowInWebPinChecked"/> <div> <span class="on">Yes</span> <span class="off">No</span> </div> <i></i> </label>',
                  //template: '<div class=\"center-txt\"><label class=\"switch margin-auto\"> <input type=\"checkbox\" #= isShowInWeb? "checked=checked" : "" # class="isShowInWebPinChecked" > <span class=\"slider round\"></span></label></div>',
                  //template: '<input type="checkbox"  #= isShowInWeb? "checked=checked" : "" # class="isShowInWebPinChecked"></input>',
              },
              {
                  //field: "isFixedSlsPrice", title: "Fixed Sales Price", width: "100px", attributes: { style: "text-align:center;" },
                  title: "Fixed Sales Price", width: "100px",
                  template: '<label class="lbl-switch"> <input type="checkbox"  #= isFixedSlsPrice? "checked=checked" : "" # class="isFixedSlsPricePinChecked"/> <div> <span class="on">Yes</span> <span class="off">No</span> </div> <i></i> </label>',
                  //template: '<div class=\"center-txt\"><label class=\"switch margin-auto\"> <input type=\"checkbox\"#= isFixedSlsPrice? "checked=checked" : "" # class="isFixedSlsPricePinChecked" > <span class=\"slider round\"></span></label></div>',
                  //template: '<input type="checkbox"  #= isFixedSlsPrice? "checked=checked" : "" # class="isFixedSlsPricePinChecked"></input>',
              },
              {
                  field: "MinInvQty", title: "MinQty", width: "100px", attributes: { style: "text-align:center;" }, hidden: true,
              },
              {
                  field: "MaxInvQty", title: "MaxQty", width: "100px", attributes: { style: "text-align:center;" }, hidden: true,
              },
              {
                  field: "MaxDisPer", title: "Max Discount %", width: "100px", attributes: { style: "text-align:center;" },
              },
              {
                  field: "MinSlsPri", title: "Min Sales Price", width: "100px", attributes: { style: "text-align:center;" }, template: '#= kendo.toString(MinSlsPri, "n2")#',
              },
    ];

    var gridNo = 2;
    var FinalItmSettingsColumn = setColumnProp(ItmSettingsColumn, viewBag.ObjKy, '', 'HdrSec2_Tab3_FormGrd', gridNo);
}

$('#ItmSettingsgrid').on('click', '.isShowInWebPinChecked', function () {
    var checked = $(this).is(':checked');
    var grid = $('#ItmSettingsgrid').data().kendoGrid;
    var dataItem = grid.dataItem($(this).closest('tr'));
    if (dataItem != undefined) {
        dataItem.set('isShowInWeb ', checked);
    }
});
$('#ItmSettingsgrid').on('click', '.isDiscontinuedPinChecked', function () {
    var checked = $(this).is(':checked');
    var grid = $('#ItmSettingsgrid').data().kendoGrid;
    var dataItem = grid.dataItem($(this).closest('tr'));
    if (dataItem != undefined) {
        dataItem.set('isDiscontinued ', checked);
    }
});
$('#ItmSettingsgrid').on('click', '.isFixedSlsPricePinChecked', function () {
    var checked = $(this).is(':checked');
    var grid = $('#ItmSettingsgrid').data().kendoGrid;
    var dataItem = grid.dataItem($(this).closest('tr'));
    if (dataItem != undefined) {
        dataItem.set('isFixedSlsPrice ', checked);
    }
});
$('#Itemgrid').on('click', '.isActPinChecked', function () {
    var checked = $(this).is(':checked');
    var grid = $('#Itemgrid').data().kendoGrid;
    var dataItem = grid.dataItem($(this).closest('tr'));
    if (dataItem != undefined) {
        dataItem.set('isAct ', checked);
    }
});

$('#Itemgrid').on('click', '.DeleteImagePinChecked', function () {
    var checked = $(this).is(':checked');
    var grid = $('#Itemgrid').data().kendoGrid;
    var dataItem = grid.dataItem($(this).closest('tr'));
    if (dataItem != undefined) {
        dataItem.set('DeleteImage ', checked);
    }
});

$('#Itemgrid').on('click', '.isAgeVarificationPinChecked', function () {
    var checked = $(this).is(':checked');
    var grid = $('#Itemgrid').data().kendoGrid;
    var dataItem = grid.dataItem($(this).closest('tr'));
    if (dataItem != undefined) {
        dataItem.set('isAgeVarification ', checked);
    }
});

$('#Itemgrid').on('click', '.isAlwTrnRateChangePinChecked', function () {
    var checked = $(this).is(':checked');
    var grid = $('#Itemgrid').data().kendoGrid;
    var dataItem = grid.dataItem($(this).closest('tr'));
    if (dataItem != undefined) {
        dataItem.set('isAlwTrnRateChange ', checked);
    }
});

function LoadGridWithColumnPropTwo(columnsFinal, gridNo) {

    if (gridNo == 2) {

        try {
            $('#ItmSettingsgrid').data().kendoGrid.destroy();
            $('#ItmSettingsgrid').empty();
        } catch (e) { }

        var ItmtypKy = $("#HdrSec1_CmbTyp_Cd").data('kendoComboBox').value();
        var ItmKy = $("#ItmKy").val();



        var griddataSource = new kendo.data.DataSource({
            transport: {
                read: {
                    url: urlGetItmSettings, // '@Url.Action("GetItmSettings", "ItmMasCd")',
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
                            'ItmTypKy': ItmtypKy,
                            'ControlConKy': ControlConKy,
                            'ItmKy': ItmKy,
                            'ObjKy': viewBag.ObjKy,
                        })
                    }
                }
            },
            pageSize: 12,

            schema: {
                model: {
                    id: "ItmCdKy",
                    fields: //Relavent fields of the grid should be bind with following model items
                    {
                        ItmKy: { editable: true, nullable: false, validation: { required: true }, type: "number" },
                        ControlConKy: { editable: false, nullable: false, type: "number" },
                        ItmCdKy: { editable: false, nullable: false, type: "number" },
                        CdKy: { editable: true, nullable: true },
                        DefaultSupAdrKy: { editable: false, nullable: false, type: "number" },
                        LocNm: { editable: true, nullable: true, type: "string" },
                        SupNm: { editable: true, nullable: true, type: "string" },
                        OfrCode: { editable: true, nullable: true, type: "string" },
                        OrdUnit: { editable: false, nullable: true },
                        SalesUnit: { editable: false, nullable: true },
                        InventoryUnit: { editable: false, nullable: true },
                        ReOrdLvl: { editable: true, nullable: true, type: "number" },
                        ReOrdQty: { editable: true, nullable: true, type: "number" },
                        isShowInWeb: { editable: true, nullable: false, type: "boolean" },
                        isDiscontinued: { editable: true, nullable: false, type: "boolean" },
                        isAlwTrnRateChange: { editable: true, nullable: false, type: "boolean" },
                        isFixedSlsPrice: { editable: true, nullable: false, type: "boolean" },
                        MinInvQty: { editable: true, nullable: false, type: "number" },
                        MaxInvQty: { editable: true, nullable: false, type: "number" },
                        CosPri: { editable: false, nullable: false, type: "number" },
                        SlsPri: { editable: false, nullable: false, type: "number" },
                        MaxDisPer: { editable: true, nullable: false },
                        MinSlsPri: { editable: true, nullable: false },
                    }
                }
            }
        });

        //ItmSettingsgrid
        $("#ItmSettingsgrid").kendoGrid({
            dataSource: griddataSource,
            autobind: true,
            resizable: true,
            navigatable: true,
            sortable: true,
            reorderable: true,
            //Scrollable: true,
            columns: columnsFinal,
            selectable: "row",
            pageable: {
                refresh: true, pageSizes: [5, 10, 20, 50, 100, 150]
            },
            //columnMenu: true,
            filterable: true,
            //filterable: {
            //    mode: "row"
            //},




            dataBinding: function () {
                record = (this.dataSource.page() - 1) * this.dataSource.pageSize();
            },
            dataBound: GridOnDataBound,

            editable: true
        });
    }
}




function GridOnDataBound(arg) {

    var grid = $("#Itemgrid").data("kendoGrid");


    $(grid.tbody).on("click", "td", function (e) {

        var row = $(this).closest("tr");
        var rowIdx = $("tr", grid.tbody).index(row);
        var colIdx = $("td", row).index(this);
        if (colIdx == 6) {

            $("#MultiUnitWin").show().kendoWindow({

                width: "1000px",
                height: "500px",
                modal: true,
                title: "Find",
                //close: onClose1


            });
            var selectedItem = grid.dataItem(grid.select());
            var ItmKy = selectedItem.ItmKy;
            var UnitKy = selectedItem.UnitKy;

            $("#MultiItmKy").val(ItmKy)
            $("#MultiUnitKy").val(UnitKy)
            // $('#MultiUnitWin').data('kendoWindow').center().open();


        }

    });
}


function GridOnDataBinding(arg) {
    record = (this.dataSource.page() - 1) * this.dataSource.pageSize();
}

function deleteme(key) {
    var ItmKy = key;
    var answer = confirm("Confirm to delete this record");
    if (answer) {
        $.ajax({
            url: '@Url.Content("~/ItmMas/DeleteItmMas")',
            dataType: "json",
            type: "POST",
            data: {
                'key': ItmKy,
            },
            success: function (data) {
                var grid = $("#Itemgrid").data("kendoGrid");
                grid.dataSource.read();
            },
            error: function (e) {

            }
        });
    }
}

function LoadPriceGrid() {

    var PriceColumn = [
            {
                field: "ItmRateKy", title: "ItmRateKy", width: "70px", hidden: true
            },
            {
                field: "CosItmRateKy", title: "CosItmRateKy", width: "70px", hidden: true
            },
            {
                field: "ControlConKy", title: "ItmKy", width: "100px", hidden: true, attributes: { style: "text-align:center;" },
            },
            {
                field: "ItmKy", title: "ItmKy", width: "100px", hidden: true, attributes: { style: "text-align:center;" },
            },
            {
                field: "LocNm", title: "Location", width: "100px", attributes: { style: "text-align:center;", "class": "non-editable" },
                filterable: {
                    // mode: "row",
                    operators: {
                        string: {
                            contains: "Contains",
                            startswith: "Starts with",
                            eq: "Is equal to",
                            neq: "Is not equal to"
                        }
                    }
                },
                editor: function (container, options) {
                    var model = options.model;
                    $('<input id="LocNm" name="' + options.field + '"/>').appendTo(container).kendoComboBox({
                        dataSource: CdNm_SelectMob_Datasource('LocNm'),
                        change: function (e) {

                            combo = e.sender;
                            selectedItm = combo.select();
                            dataItem = combo.dataItem(selectedItm);

                            var cmb = $("#LocNm").data("kendoComboBox");
                            var val = cmb.value();

                            if (isNaN(val)) {
                                alert("'" + val + "' is not a Valid input");
                                cmb.value("");
                                model.set("CdKy", 1);
                                model.set("LocNm", "");
                            } else {
                                model.set("CdKy", dataItem.CdKy);
                                model.set("LocNm", dataItem.CdNm);
                            }
                        },
                        dataValueField: "CdKy",
                        dataTextField: "CdNm"
                    });
                }
            },

    { field: "LocKy", title: "LocKy", width: "80px", hidden: true },
    {
        field: "PreviousCosPri", title: "Previous Cost Price", width: "100px", attributes: { style: "text-align:center;", "class": "non-editable" }, template: '#= kendo.toString(PreviousCosPri, "n2")#',
    },

            {
                field: "PreviousSlsPri", title: "Previous Sales Price", width: "100px", attributes: { style: "text-align:center;", "class": "non-editable" }, template: '#= kendo.toString(PreviousSlsPri, "n2")#',
            },
            {
                field: "PreviousDate", title: "Previous Date", width: "150px", attributes: { style: "text-align:center;", "class": "non-editable" },
                editor: function (container, options) {
                    var model = options.model;
                    $('<input id="PreviousDate" name="' + options.field + '" data-value-field="' + options.field + '" data-bind="value:' + options.field + '" data-format="' + options.format + '"/>').appendTo(container).kendoDatePicker({
                        change: function (e) {
                            // model.set("RedDt", e.sender._oldText);
                        }
                    });
                },
                format: "{0: dd-MM-yyyy}"
            },

            {
                field: "CosPri", title: "Cost Price", width: "100px", attributes: { style: "text-align:center;" }, template: '#= kendo.toString(CosPri, "n2")#',
            },
            {
                field: "Markup", title: "Markup%", width: "100px", attributes: { style: "text-align:center;" }, //template: '#= kendo.toString(Markup, "n2")#', //template: "#= ((SlsPri-CosPri)/CosPri*100) #", 
            },
            {
                field: "SlsPri", title: "Sales Price", width: "100px", attributes: { style: "text-align:center;" }, template: '#= kendo.toString(SlsPri, "n2")#',
                //change: function (e) {
                //    model.set("SlsPri", (e.value.CosPri + (e.model.Markup / 100) * e.value.CosPri));
                //}
                //editor: function (cont, options) {
                //    $("<span>" + options.model.SlsPri + "</span>").appendTo(cont);}
                //template: "#= (CosPri + (Markup/100)*CosPri) #",
            },

            {
                field: "EftvDate", title: "Effective Date", width: "100px",
                editor: function (container, options) {
                    var model = options.model;
                    $('<input id="EftvDatetxt" name="' + options.field + '" data-value-field="' + options.field + '" data-bind="value:' + options.field + '" data-format="' + options.format + '"/>').appendTo(container).kendoDatePicker({

                    });
                },
                format: "{0: dd-MM-yyyy}"
            },

    ];

    var gridNo = 3;
    var FinalItmSettingsColumn = setColumnProp(PriceColumn, viewBag.ObjKy, '', 'HdrSec2_Tab4_FormGrd', gridNo);
}

function LoadGridWithColumnPropThree(PriceColumn, gridNo) {
    var todate = new Date();
    if (gridNo == 3) {
        try {
            $('#Pricegrid').data().kendoGrid.destroy();
            $('#Pricegrid').empty();
        } catch (e) { }

        var ItmKy = $("#ItmKy").val();
        var dataSourceGrid = new kendo.data.DataSource({

            transport: {
                read: {
                    url: urlLoadPriceRevision, //'@Url.Action("LoadPriceRevision", "ItmPrfl")'
                    dataType: "json"
                },

                parameterMap: function (options, operation) {
                    //if (operation == "update" && options.models) {
                    //    return JSON.stringify({ 'listMe': options.models });
                    //}
                    //if (operation == "create" && options.models) {
                    //    return JSON.stringify({ 'listMe': options.models });
                    //}
                    if (operation == "read") {
                        return ({
                            'ItmKy': ItmKy,
                            'ObjKy': viewBag.ObjKy,
                        });
                    }
                }
            },
            batch: true,
            pageSize: 12,
            schema: {
                model: {
                    id: "ItmRateKy ",
                    fields: //Relavent fields of the grid should be bind with following model items
                    {
                        ItmKy: { editable: false, nullable: false, type: "number" },
                        ItmRateKy: { editable: false, nullable: false, type: "number" },
                        CosItmRateKy: { editable: false, nullable: false, type: "number" },
                        LocNm: { editable: false, nullable: false, type: "string" },
                        PreviousDate: { editable: false, nullable: true, type: "date" },
                        PreviousCosPri: { editable: false, nullable: false, type: "number" },
                        PreviousSlsPri: { editable: false, nullable: false, type: "number" },
                        ControlConKy: { editable: false, nullable: false, type: "number", },
                        isFixedSlsPri: { editable: false, nullable: false, type: "boolean" },
                        LocKy: { editable: false, nullable: false, type: "number" },
                        EftvDate: { editable: true, nullable: true, type: "date", defaultvalue: todate },
                        CosPri: { editable: true, nullable: false, type: "number" },
                        Markup: { editable: true, nullable: false, type: "number", },
                        SlsPri: { editable: true, nullable: true, type: "number" },

                    }
                }
            }
        });



        $("#Pricegrid").kendoGrid({
            dataSource: dataSourceGrid,
            autobind: true,
            resizable: true,
            navigatable: true,
            sortable: true,
            reorderable: true,
            //Scrollable: true,
            save: function (data) {
                if (data.values.EftvDate == null) {
                    var test = data.model.set("SlsPri", data.model.CosPri + ((data.values.Markup / 100) * data.model.CosPri));

                }
                //else if (data.values.EftvDate == null) {
                //    var test = data.model.set("SlsPri", data.values.CosPri + ((data.model.Markup / 100) * data.values.CosPri));
                //}

            },
            columns: PriceColumn,
            selectable: "row",
            pageable: {
                refresh: true, pageSizes: [5, 10, 20, 50, 100, 150]
            },
            //columnMenu: true,
            filterable: true,
            //filterable: {
            //    mode: "row"
            //},


            dataBinding: function () {
                record = (this.dataSource.page() - 1) * this.dataSource.pageSize();
            },
            dataBound: GridOnDataBound,

            editable: true
        });
    }

}



function LoadItmStockGrid() {

    var ItmStockColumn = [

            {
                field: "ControlConKy", title: "ControlConKy", width: "100px", hidden: true, attributes: { style: "text-align:center;" },
            },
            {
                field: "ItmKy", title: "ItmKy", width: "100px", hidden: true, attributes: { style: "text-align:center;" },
            },
            {
                field: "LocNm", title: "Location", width: "100px", attributes: { style: "text-align:center;", "class": "non-editable" },
                filterable: {
                    // mode: "row",
                    operators: {
                        string: {
                            contains: "Contains",
                            startswith: "Starts with",
                            eq: "Is equal to",
                            neq: "Is not equal to"
                        }
                    }
                },
                editor: function (container, options) {
                    var model = options.model;
                    $('<input id="LocNm" name="' + options.field + '"/>').appendTo(container).kendoComboBox({
                        dataSource: CdNm_SelectMob_Datasource('LocNm'),
                        change: function (e) {

                            combo = e.sender;
                            selectedItm = combo.select();
                            dataItem = combo.dataItem(selectedItm);

                            var cmb = $("#LocNm").data("kendoComboBox");
                            var val = cmb.value();

                            if (isNaN(val)) {
                                alert("'" + val + "' is not a Valid input");
                                cmb.value("");
                                model.set("CdKy", 1);
                                model.set("LocNm", "");
                            } else {
                                model.set("CdKy", dataItem.CdKy);
                                model.set("LocNm", dataItem.CdNm);
                            }
                        },
                        dataValueField: "CdKy",
                        dataTextField: "CdNm"
                    });
                }
            },
    { field: "LocKy", title: "LocKy", width: "80px", hidden: true },
    {
        field: "CurrentStock", title: "Current Stock", width: "100px", attributes: { style: "text-align:center;", "class": "non-editable" }, template: '#= kendo.toString(CurrentStock, "n3")#', //template: "#= ((SlsPri-CosPri)/CosPri*100) #", 
    },
            {
                field: "GrpStock", title: "Group Stock", width: "100px", attributes: { style: "text-align:center;", "class": "non-editable" }, template: '#= kendo.toString(GrpStock, "n3")#',
            },
            {
                field: "ReOrdLvl", title: "Reorder Level", width: "100px", attributes: { style: "text-align:center;", "class": "non-editable" },
            },
            {
                field: "ReOrdQty", title: "Reorder Qty", width: "100px", attributes: { style: "text-align:center;", "class": "non-editable" }, template: '#= kendo.toString(ReOrdQty, "n3")#',
            },
            {
                field: "PendingPO", title: "Pending PO Qty", width: "100px", attributes: { style: "text-align:center;", "class": "non-editable" }, template: '#= kendo.toString(PendingPO, "n3")#',
            },

    ];

    var gridNo = 4;
    var FinalItmSettingsColumn = setColumnProp(ItmStockColumn, viewBag.ObjKy, '', 'HdrSec2_Tab5_FormGrd', gridNo);
}

function LoadGridWithColumnPropFour(ItmStockColumn, gridNo) {

    if (gridNo == 4) {

        var ItmKy = $("#ItmKy").val();

        var dataSourceGrid = new kendo.data.DataSource({

            transport: {
                read: {
                    url: urlLoadItmStock, //'@Url.Action("LoadItmStock", "ItmPrfl")'
                    dataType: "json"
                },

                parameterMap: function (options, operation) {
                    //if (operation == "update" && options.models) {
                    //    return JSON.stringify({ 'listMe': options.models });
                    //}
                    //if (operation == "create" && options.models) {
                    //    return JSON.stringify({ 'listMe': options.models });
                    //}
                    if (operation == "read") {
                        return ({
                            'ItmKy': ItmKy,
                            'ObjKy': viewBag.ObjKy,
                        });
                    }
                }
            },
            batch: true,
            pageSize: 12,
            schema: {
                model: {

                    fields: //Relavent fields of the grid should be bind with following model items
                    {
                        ItmKy: { editable: false, nullable: false, type: "number" },
                        LocNm: { editable: false, nullable: false, type: "string" },
                        CurrentStock: { editable: false, nullable: false, type: "number" },
                        GrpStock: { editable: false, nullable: false, type: "number" },
                        ReOrdLvl: { editable: false, nullable: false, type: "number", },
                        LocKy: { editable: false, nullable: false, type: "number" },
                        ReOrdQty: { editable: false, nullable: false, type: "number", },
                        PendingPO: { editable: false, nullable: false, type: "number", },
                        ControlConKy: { editable: false, nullable: false, type: "number", },

                    }
                }
            }
        });



        $("#ItmStockgrid").kendoGrid({
            dataSource: dataSourceGrid,
            autobind: true,
            resizable: true,
            navigatable: true,
            sortable: true,
            reorderable: true,
            //Scrollable: true,

            columns: ItmStockColumn,
            selectable: "row",
            pageable: {
                refresh: true, pageSizes: [5, 10, 20, 50, 100, 150]
            },
            //columnMenu: true,
            filterable: true,
            //filterable: {
            //    mode: "row"
            //},


            dataBinding: function () {
                record = (this.dataSource.page() - 1) * this.dataSource.pageSize();
            },
            dataBound: GridOnDataBound,

            editable: true
        });
    }

}



