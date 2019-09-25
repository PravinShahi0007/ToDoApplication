
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

function ItemGridDefaultColumns() {
    var Itmcolumns = [
           { command: ["edit"], title: "&nbsp;", width: "75px", },
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
           field: "ItmNm", title: "Item Name", width: "200px",
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
           field: "ItmDisplayNm", title: "Display Name", width: "150px",
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
               {
                   field: "Unit", title: "Unit", width: "100px", attributes: { style: "text-align:center;" },
                   editor: function (container, options) {
                       var model = options.model;
                       $('<input id="cmbUnitKy" name="' + options.field + '" />').appendTo(container).kendoComboBox({
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
               {
                   field: "Image", title: "ImageUpload", width: "0px", filterable: false,
                   template: '<input name="Image" id="Image" type="file" />',
                   editor: function (container, options) {
                       var guid = kendo.guid();
                       $("input[id='Image']").kendoUpload({
                           template: $('<input type="file" id="' + guid + '" data-role="upload" data-async=\'{  saveUrl: "InsertFileswithpath/ItmPrfl","autoUpload":"false"}\' multiple="true" data-success="onSuccess"  name="Image" localization=\'{ select: "file..."}\' />').appendTo(container)
                       });
                   }
               },

               {
                   field: "FileName", title: "FileName", width: "100px", hidden: true, attributes: { style: "text-align:center;" },
               },
               {
                   field: "DeleteImage", title: "Clear Image", width: "120px",
                   editor: function (container, options) {
                       var guid1 = kendo.guid();
                       $('<label class="lbl-switch"> <input id="' + guid1 + '" type="checkbox" name="DeleteImage"  data-type="boolean"  data-bind="checked:DeleteImage" /> <div> <span class="on">Yes</span> <span class="off">No</span> </div> <i></i> </label>').appendTo(container);
                   }
               },
               {
                   field: "isAct", title: "isActive", width: "80px",
                   editor: function (container, options) {
                       var guid2 = kendo.guid();
                       $('<label class="lbl-switch"> <input id="' + guid2 + '" type="checkbox"  name="isAct"  data-type="boolean"  data-bind="checked:isAct"/> <div> <span class="on">Yes</span> <span class="off">No</span> </div> <i></i> </label>').appendTo(container);
                   },
               },
               {
                   field: "isAgeVarification", title: "Age Verification", width: "120px",
                   editor: function (container, options) {
                       var guid3 = kendo.guid();
                       $('<label class="lbl-switch"> <input id="' + guid3 + '" type="checkbox" name="isAgeVarification"  data-type="boolean"  data-bind="checked:isAgeVarification" /> <div> <span class="on">Yes</span> <span class="off">No</span> </div> <i></i> </label>').appendTo(container);
                   },
               },
               {
                   field: "isAlwTrnRateChange", title: "Prompt Price", width: "110px",
                   editor: function (container, options) {
                       var guid4 = kendo.guid();
                       $('<label class="lbl-switch"> <input id="' + guid4 + '" type="checkbox" name="isAlwTrnRateChange"  data-type="boolean" data-bind="checked:isAlwTrnRateChange"/> <div> <span class="on">Yes</span> <span class="off">No</span> </div> <i></i> </label>').appendTo(container);
                   },
               },

    ];
    var gridNo = 1;
    var FinalItmColumn = setColumnProp(Itmcolumns, viewBag.ObjKy, '', 'HdrSec2_Tab1_FrmGrd', gridNo)
    // LoadGridWithColumnProp(Itmcolumns, gridNo);
}

function LoadItemGridView(ItmTypKy) {
    var Itmcolumns = [
            { command: ["edit"], title: "&nbsp;", width: "75px", },
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
            field: "ItmNm", title: "Item Name", width: "200px",
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
            field: "ItmDisplayNm", title: "Display Name", width: "150px",
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
                {
                    field: "Unit", title: "Unit", width: "100px", attributes: { style: "text-align:center;" },
                    editor: function (container, options) {
                        var model = options.model;
                        $('<input id="cmbUnitKy" name="' + options.field + '" />').appendTo(container).kendoComboBox({
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
                {
                    field: "Image", title: "ImageUpload", width: "0px", filterable: false,
                    template: '<input name="Image" id="Image" type="file" />',
                    editor: function (container, options) {
                        var guid = kendo.guid();
                        $("input[id='Image']").kendoUpload({
                            template: $('<input type="file" id="' + guid + '" data-role="upload" data-async=\'{  saveUrl: "InsertFileswithpath/ItmPrfl","autoUpload":"false"}\' multiple="true" data-success="onSuccess"  name="Image" localization=\'{ select: "file..."}\' />').appendTo(container)
                        });
                    }
                },

                {
                    field: "FileName", title: "FileName", width: "100px", hidden: true, attributes: { style: "text-align:center;" },
                },
                {
                    field: "DeleteImage", title: "Clear Image", width: "120px",
                    editor: function (container, options) {
                        var guid1 = kendo.guid();
                        $('<label class="lbl-switch"> <input id="' + guid1 + '" type="checkbox" name="DeleteImage"  data-type="boolean"  data-bind="checked:DeleteImage" /> <div> <span class="on">Yes</span> <span class="off">No</span> </div> <i></i> </label>').appendTo(container);
                    }
                },
                {
                    field: "isAct", title: "isActive", width: "80px",
                    editor: function (container, options) {
                        var guid2 = kendo.guid();
                        $('<label class="lbl-switch"> <input id="' + guid2 + '" type="checkbox"  name="isAct"  data-type="boolean"  data-bind="checked:isAct"/> <div> <span class="on">Yes</span> <span class="off">No</span> </div> <i></i> </label>').appendTo(container);
                    },
                },
                {
                    field: "isAgeVarification", title: "Age Verification", width: "120px",
                    editor: function (container, options) {
                        var guid3 = kendo.guid();
                        $('<label class="lbl-switch"> <input id="' + guid3 + '" type="checkbox" name="isAgeVarification"  data-type="boolean"  data-bind="checked:isAgeVarification" /> <div> <span class="on">Yes</span> <span class="off">No</span> </div> <i></i> </label>').appendTo(container);
                    },
                },
                {
                    field: "isAlwTrnRateChange", title: "Prompt Price", width: "110px",
                    editor: function (container, options) {
                        var guid4 = kendo.guid();
                        $('<label class="lbl-switch"> <input id="' + guid4 + '" type="checkbox" name="isAlwTrnRateChange"  data-type="boolean" data-bind="checked:isAlwTrnRateChange"/> <div> <span class="on">Yes</span> <span class="off">No</span> </div> <i></i> </label>').appendTo(container);
                    },
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
        if (dataSource.data().length < 1000) {
            flag = 1;
        }
        i++;
    }
    return dataaray;

}


function DatasourceFill(PageNo, PageSize) {
    var ItmTypKy = $("#HdrSec1_CmbTyp_Cd").data('kendoComboBox').value();
    if (ItmTypKy == "" || ItmTypKy == undefined || ItmTypKy == null) ItmTypKy = 1;

    var Dept = $("#HdrSec1_CmbDept_Cd").data('kendoComboBox').value();
    if (Dept == "" || Dept == undefined || Dept == null) Dept = 1;

    var ItmTyp = $("#HdrSec1_CmbTyp_Cd").data('kendoComboBox').text();
    // if (ItmTyp == "" || ItmTyp == undefined || ItmTyp == null) Dept = "";

    var ItmCd = $("#HdrSec1_InptItmCd_Val").val();
    //if (ItmCd == "" || ItmCd == undefined || ItmCd == null) ItmCd = 1;

    var ItmNm = $("#HdrSec1_InptItmNm_Val").val();

    //var Dept = $("#HdrSec1_CmbDept_Cd").data('kendoComboBox').value();
    //if (Dept == "" || Dept == null) { Dept = 1; }

    var Cat = $("#HdrSec1_CmbCat_Cd").data('kendoComboBox').value();
    if (Cat == "" || Cat == null) { Cat = 1; }
    var AllItem = 0;
    if ($('#HdrSec1_AllItm_Val').is(":checked")) {
        AllItem = 1;
    }
    var griddataSource = new kendo.data.DataSource({
        transport: {
            read: {
                url: urlGetAllItemsWithDept,
                dataType: "json",
                type: "POST",
                async: false,

            },
            update: {
                url: urlUpdate,
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

        batch: true,
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
    ////ItmSettingsTab();

    var Dept = $("#HdrSec1_CmbDept_Cd").data('kendoComboBox').value();
    if (Dept == "" || Dept == null) { Dept = 1; }

    var Cat = $("#HdrSec1_CmbCat_Cd").data('kendoComboBox').value();
    if (Cat == "" || Cat == null) { Cat = 1; }

    if (gridNo == 1) {
        try {
            $('#Itemgrid').data().kendoGrid.destroy();
            $('#Itemgrid').empty();
        } catch (e) { }


        //var pageSize = 1300;
        //var PageNo = HTNPaginationCtrlData.PageNo;
        var dtsource = LoadGridData();


        //  gridWidget.dataSource.data().push.apply(gridWidget.dataSource.data(), griddataSource);
        $("#Itemgrid").kendoGrid({            
            dataSource: dtsource,          
            autobind: true,
            resizable: true,
            navigatable: true,
            sortable: true,
            reorderable: true,
            scrollable: {
                virtual: true
            },
            selectable: "row",
            pageable: {
                pageSize: 10,
                refresh: true, pageSizes: [5, 10, 20, 50, 100, 150]
            },
            columnMenu: true,
            filterable: true,
            //filterable: {
            //    mode: "row"
            //},
            columns: columnsFinal,
            dataBound: function () {
                
            },
            dataBinding: function () {
                record = (this.dataSource.page() - 1) * this.dataSource.pageSize();
            },
            // detailTemplate: kendo.template($("#template").html()),
            //detailInit: detailInit,

            edit: function (e) {
                $("[name='ItmCd']", e.container).blur(function () {
                    checkItmCdExist();
                });

                $("[name='Image']", e.container).click(function () {
                });

            },
            dataBound: function (e) {
                $("input[id='Image']").kendoUpload({
                    async: {
                        saveUrl: "InsertFileswithpath/ItmPrfl",
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
                        currentData[i].dirty = false;
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
                            var grid = $("#Itemgrid").data("kendoGrid");
                            //var select = grid.select();
                            //var selectedItem = grid.dataItem($(this).closest("tr"));
                            //select.set("dirty", false);
                            grid.refresh();
                            // LoadItemGridView(ItmTypKy);
                        } else {
                            alert("Record Not Saved");
                            // LoadItemGridView(ItmTypKy); // update grid
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

        });
        //var grid = $("#Itemgrid").data("kendoGrid");
        //grid.expandRow(".k-master-row:first");
        $("#Itemgrid").find(".k-hierarchy-cell, .k-hierarchy-col").hide();
    }
}

function onSuccess(e) {

    if (e.operation == "upload") {
        var UploadedFile = e.response.fileName;
        var RowUpdate = $("#Itemgrid").data().kendoGrid.dataSource.data()[FormGlblData.gridIndex];
        RowUpdate.set("FileName", UploadedFile);
    }
}

function getFileInfo(e) {
    return $.map(e.files, function (file) {
        info = file.name;
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

// ------------------------------------------

function ItmSettingsTab() {
    var tabStrip = $(".tabstrip").kendoTabStrip().data("kendoTabStrip");

    //tabstrip.select(0);
    ItmKy = $("#ItmKy").val();

    var ind1 = 1;
    var ind2 = 2;
    var ind3 = 3;
    var ind4 = 4;
    var ind5 = 5;
    if (ItmKy <= 1) {
        //alert("Select an Item");
        tabStrip.disable(tabStrip.tabGroup.children().eq(ind1));
        tabStrip.disable(tabStrip.tabGroup.children().eq(ind2));
        tabStrip.disable(tabStrip.tabGroup.children().eq(ind3));
        tabStrip.disable(tabStrip.tabGroup.children().eq(ind4));
        tabStrip.disable(tabStrip.tabGroup.children().eq(ind5));

    }
}

