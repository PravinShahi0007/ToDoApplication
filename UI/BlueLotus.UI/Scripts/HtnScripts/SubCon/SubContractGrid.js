function GridDefaultColumns() {
    var columnsSetDefine = [
        {
            field: "OPBalAmt",
            title: "OPBalAmt",
            width: "50px",
            hidden: "true",
            editor: function (container, options) {
                var model = options.model;
            }

        },
        {
            field: "Lino",
            title: "Lino",
            width: "50px",
            hidden: "true",
            editor: function (container, options) {
                var model = options.model;
            }

        },
        {
            field: "TrnKy",
            title: "TrnKy",
            width: "100px",
            hidden: "true",
            editor: function (container, options) {
                var model = options.model;
            }

        },
        {
            field: "AccCd",
            title: "AccCd",
            width: "100px",
            hidden: "true",
            editor: function (container, options) {
                var model = options.model;
            }

        },
        {
            field: "AccTrnKy",
            title: "AccTrnKy",
            width: "40px",
            hidden: "false",
            //locked: true,
            //lockable: false,
            attributes: { class: "ob-Center" },
            editor: function (container, options) {
                var model = options.model;
            }
        },
           {
               field: "Des",
               title: "Description",
               width: "100px",
               attributes: { class: "ob-Center" },
               editor: function (container, options) {
                   var model = options.model;
               }
           },
        {
            field: "AccNm",
            title: "AccNm",
            width: "100px",
            hidden: "true",
            editor: function (container, options) {
                var model = options.model;
            }
            //locked: true,
            //lockable: false
        },
        {
            field: "AnlTyp2Nm",
            title: "Sub Con Details",
            width: "100px",
            hidden:true,
            editor: function (container, options) {
                var model = options.model;
            }

        },
        {
            field: "AccKy",
            title: "AccKy",
            width: "100px",
            hidden: "false",
            editor: function (container, options) {
                var model = options.model;
            }

        },
        {
            field: "AnlTyp2Ky",
            title: "AnlTyp2Ky",
            width: "100px",
            hidden: "true",
            editor: function (container, options) {
                var model = options.model;
            }

        },
        {
            field: "Sign",
            title: "Sign",
            width: "20px",
            //hidden: "true",
            attributes: { style: "text-align:Center;" },
            editor: function (container, options) {
                var model = options.model;
            }

        },
        {
            field: "Percentage",
            title: "Percentage",
            width:"20px",
        },
        {
            field: "PreCumAmt",
            title: "Pre Cum Amount",
            width: "50px",
            format: "{0:N2}",
            editor: function (container, options) {
                var model = options.model;
            }
            
            //locked: true,
            //lockable: false
        },
        {
            field: "isCalc",
            title: "isCalc",
            hidden: "true",
            width: "100px",
            editor: function (container, options) {
                var model = options.model;
            }

        },
        {
            field: "AsAtCumAmt",
            title: "AsAtCumAmt",
            width: "50px",
            format: "{0:N2}",
            editor: function (container, options) {
                var model = options.model;
                var id = ("#SubConGrid");
                var grid = $(id).data().kendoGrid;
                var selectedItem = grid.dataItem(grid.select());
                var index = grid.select().index();
                var iscal = selectedItem.isCalc;
                if (iscal == 1) {
                    var data = grid.dataSource.at(index);
                    console.log("data", data);
                    data.fields['AsAtCumAmt'].editable = false;
                }

                

                $('<input id="AsAtCumAmt" name="' + options.field + '" data-value-field="' + options.field + '" data-bind="value:' + options.field + '" data-format="' + options.format + '"/>').appendTo(container).kendoNumericTextBox({
                    change: function (e) {
                            var id = ("#SubConGrid");
                            var grid = $(id).data().kendoGrid;
                            var selectedItem = grid.dataItem(grid.select());
                        
                            var PreAmt = selectedItem.PreCumAmt;
                            var AsAtCumAmt = selectedItem.AsAtCumAmt;
                            var BillAmt = AsAtCumAmt - PreAmt;
                            var index = grid.dataSource.indexOf(selectedItem);
                            var RowUpdate = $("#SubConGrid").data().kendoGrid.dataSource.data()[index];
                            RowUpdate.set("ThisBillAmt", BillAmt);
                                    }
                });
                //$('<input data-bind="value:' + options.field + '"/>')
                //    .appendTo(container)
                //    .kendoNumericTextBox({
                //        spinners: false,
                //        decimals: 3,
                //        min: 0,
                //    });

              
            }
            //locked: true,
            //lockable: false
        },
        {
            field: "ThisBillAmt",
            title: "Bill Amount",
            width: "50px",
            format: "{0:N2}",
            editor: function (container, options) {
                var model = options.model;
            }
            //locked: true,
            //lockable: false
        },
        {
            field: "SO",
            title: "SO",
            width: "100px",
            hidden: "true",
            editor: function (container, options) {
                var model = options.model;
            }

        },
        {
            field: "PrjKy",
            title: "PrjKy",
            width: "100px",
            hidden: "true",
            editor: function (container, options) {
                var model = options.model;
            }

        },
        {
            field: "PrjID",
            title: "PrjID",
            width: "100px",
            hidden: "true",
            editor: function (container, options) {
                var model = options.model;
            }

        },
        {
            field: "PrjNm",
            title: "PrjNm",
            hidden: "true",
            width: "100px",
            editor: function (container, options) {
                var model = options.model;
            }

        },
        {
            field: "DrAccKy",
            title: "DrAccKy",
            hidden: "true",
            width: "100px",
            editor: function (container, options) {
                var model = options.model;
            }

        },
        {
            field: "CrAccKy",
            title: "CrAccKy",
            hidden: "true",
            width: "100px",
            editor: function (container, options) {
                var model = options.model;
            }

        },
        {
            field: "OurCode",
            title: "OurCode",
            hidden: "true",
            width: "100px",
            editor: function (container, options) {
                var model = options.model;
            }

        },
        {
            field: "IsRecBill",
            title: "IsRecBill",
            hidden: "true",
            width: "100px",
            editor: function (container, options) {
                var model = options.model;
            }

        },
        {
            field: "MaterialAmt",
            title: "MaterialAmt",
            hidden: "true",
            width: "100px",
            editor: function (container, options) {
                var model = options.model;
            }

        }
        
    ];
    var gridNo = 1;
    var columnsFinal = setColumnProp(columnsSetDefine, viewBag.ObjKy, '', 'FormGrd', gridNo);
}

function LoadGridWithColumnProp(columnsFinal, gridNo) {
    var dataSource = new kendo.data.DataSource({
        batch: true,
        //   sort: ({ field: "LiNo", dir: "desc" }),
        pageSize: 10,
        schema: {
            model: {
                id: "TrnCdKy",
                fields: //Relavent fields of the grid should be bind with following model items
                {
                    Lino: { editable: false, nullable: false, type: "number" },
                    TrnKy: { editable: false, nullable: false, type: "number" },
                    AccTrnKy: { editable: false, nullable: false, type: "number" },
                    AccCd: { editable: false, nullable: false, type: "string" },
                    AccNm: { editable: false, nullable: false, type: "string" },
                    Des: { editable: false, nullable: false, type: "string" },
                    PreCumAmt: { editable: false, nullable: false, type: "number" },
                    AsAtCumAmt: { editable: true, nullable: false, type: "number" },
                    ThisBillAmt: { editable: false, nullable: false, type: "number" },
                    AnlTyp2Nm: { editable: false, nullable: false, type: "number" },
                    AccKy: { editable: false, nullable: false, type: "number" },
                    AnlTyp2Ky: { editable: false, nullable: false, type: "number" },
                    Sign: { editable: false, nullable: false, type: "string" },
                    SO: { editable: false, nullable: false, type: "string" },
                    PrjKy: { editable: false, nullable: false, type: "number" },
                    PrjID: { editable: false, nullable: false, type: "string" },
                    PrjNm: { editable: false, nullable: false, type: "string" },
                    OPBalAmt: { editable: false, nullable: false, type: "number" },
                    DrAccKy: { editable: false, nullable: false, type: "number" },
                    CrAccKy: { editable: false, nullable: false, type: "number" },
                    IsRecBill: { editable: false, nullable: false, type: "number" },
                    MaterialAmt: { editable: false, nullable: false, type: "number" },
                    OurCode: { editable: false, nullable: false, type: "string" },
                    isCalc: { editable: false, nullable: false, type: "number" }


                }
            }
        }
    });

    $("#SubConGrid")
        .kendoGrid({
            dataSource: dataSource,
            sortable: true,
            autobind: true,
            navigatable: true,
            editable: true,
            filterable: {
                mode: "row"
            },
            reorderable: true,
            scrollable: true,
            pageSize: 10,
            pageable: true,
            selectable: "row",
            resizable: true,
            pageable: { refresh: true, pageSizes: [5, 10, 20, 50, 100] },
            columns: columnsFinal,

        });
}


function setHdrSectionPropFun() {

    // ---------- Set ObjProperties
    setHdrSectionProp('', viewBag.ObjKy, '', 'HdrSec1');
    setHdrSectionProp('', viewBag.ObjKy, '', 'HdrSec2');
    setHdrSectionProp('', viewBag.ObjKy, '', 'HdrSec4');

    SetHandlingEnterKeyEvent('', viewBag.ObjKy);
    SetFirstFocusObj();
    // $("#HdrSec1_InptDocNo_Val").focus();
}