$(function () {

    SubConCombo();

    hideDiv();

    $("#dateSubConHdr").kendoDatePicker();

    $("#divScBillRecv_SelectWebDownImg").click(function () {
        $("#divScBillRecv_SelectWebDownImg").hide();
        $("#divScBillRecv_SelectWebUpImg").show();
        $("#ScBillRecv_SelectWeb").show();
    });

    $("#divScBillRecv_SelectWebUpImg").click(function () {
        $("#divScBillRecv_SelectWebUpImg").hide();
        $("#divScBillRecv_SelectWebDownImg").show();
        $("#ScBillRecv_SelectWeb").hide();
    });

    $("#divScBillPmt_SelectWebDownImg").click(function () {
        $("#divScBillPmt_SelectWebDownImg").hide();
        $("#divScBillPmt_SelectWebUpImg").show();
        $("#ScBillPmt_SelectWeb").show();
    });

    $("#divScBillPmt_SelectWebUpImg").click(function () {
        $("#divScBillPmt_SelectWebUpImg").hide();
        $("#divScBillPmt_SelectWebDownImg").show();
        $("#ScBillPmt_SelectWeb").hide();
    });

    $("#divScBillItemsSelectWebDownImg").click(function () {
        $("#divScBillItemsSelectWebDownImg").hide();
        $("#divScBillItemsSelectWebUpImg").show();
        $("#ScBillItemsSelectWeb").show();
    });

    $("#divScBillItemsSelectWebUpImg").click(function () {
        $("#divScBillItemsSelectWebUpImg").hide();
        $("#divScBillItemsSelectWebDownImg").show();
        $("#ScBillItemsSelectWeb").hide();
    });

});

function hideDiv() {
    $("#divScBillRecv_SelectWebUpImg").hide();
    $("#ScBillRecv_SelectWeb").hide();

    $("#divScBillPmt_SelectWebUpImg").hide();
    $("#ScBillPmt_SelectWeb").hide();

    $("#divScBillItemsSelectWebUpImg").hide();
    $("#ScBillItemsSelectWeb").hide();
}


function SubConSetData(selectedDataItem) {
    $("#trnNo").val(selectedDataItem.TrnNo);
}



function LoadBillPmtGrid(TrnKy) {


    var dataSource = new kendo.data.DataSource({
        transport: {
            read: {
                url: urlScBillPmt_SelectWeb,
                data: { TrnKy: TrnKy },
                dataType: "json"
            },

        },

        batch: true,
        pageSize: 50,
        schema: {
            model: {
                id: "AccTrnKy",
                fields: {
                    AccTrnKy: { editable: true, nullable: false, type: "number" },
                    AccKy : { editable: true, nullable: false, type: "number" },
                    AccCd :{ editable: true, nullable: false, type: "string" },
                    AccNm :{ editable: true, nullable: false, type: "string" },
                    AnlTyp2Cd :{ editable: true, nullable: false, type: "string" },
                    AnlTyp2Nm: { editable: true, nullable: false, type: "string" },
                    PreviousAmt:  { editable: true, nullable: false, type: "number" },
                    PreviousNetAmt:  { editable: true, nullable: false, type: "number" },
                    Amt : { editable: true, nullable: false, type: "number" },
                    LiNo : { editable: true, nullable: false, type: "number" },
                    AccAmt : { editable: true, nullable: false, type: "number" },
                    TrnAmt : { editable: true, nullable: false, type: "number" },
                    BUKy : { editable: true, nullable: false, type: "number" },
                    AdrKy : { editable: true, nullable: false, type: "number" },
                    PrjKy : { editable: true, nullable: false, type: "number" },
                    isVirtAccTrn : { editable: true, nullable: false, type: "number" },
                    ExRateAccCrn : { editable: true, nullable: false, type: "number" },
                    SKy : { editable: true, nullable: false, type: "number" },
                    EftvDt :{ editable: true, nullable: false, type: "string" },
                    TrnKy:{ editable: true, nullable: false, type: "number" },
                    DueDate:{ editable: true, nullable: false, type: "string" },
                    AnlTyp2Ky : { editable: true, nullable: false, type: "number" },


                }
            }
        }
    });


    $("#BillPmtgrid").kendoGrid({
        dataSource: dataSource,
        navigatable: true,
        autobind: true,
        sortable: true,
        filterable: true,
        selectable: "row",
        columnMenu: true,
        resizable: true,
        pageable: true,
        height: 400,
        width: 500,

        columns: [
            { field: "AccKy", width: '120px' },
            { field: "AccCd", width: '120px' },
            { field: "AccNm", width: '170px' },
            { field: "AnlTyp2Cd", width: '120px' },
            { field: "AnlTyp2Nm", width: '170px' },
            { field: "PreviousAmt", width: '120px' },
            { field: "Amt", width: '120px' },
            { field: "DueDate", width: '120px' },
            { field: "PreviousNetAmt", width: '120px' }

        ],


        editable: true
    });

}



function LoadRecvGrid(TrnKy) {

    
    var dataSource = new kendo.data.DataSource({
        transport: {
            read: {
                url: urlScBillRecv_SelectWeb,
                data: { TrnKy: TrnKy },
                dataType: "json"
            },

        },

        batch: true,
        pageSize: 50,
        schema: {
            model: {
                id: "AccKy",
                fields: {
                    AccKy: { editable: true, nullable: false, type: "number" },
                    AccCd: { editable: true, nullable: false, type: "string" },
                    AccNm: { editable: true, nullable: true, type: "string" },
                    AnlTyp2Cd: { editable: true, nullable: true, type: "string" },
                    AnlTyp2Nm: { editable: true, nullable: true, type: "string" },
                    PreviousAmt: { editable: true, nullable: true, type: "number" },
                    Amt: { editable: true, nullable: true, type: "number" },
                    LiNo: { editable: true, nullable: true, type: "number" },
                    AccTynKy: { editable: true, nullable: true, type: "number" },
                    AccAmt: { editable: true, nullable: true, type: "number" },
                    TrnAmt: { editable: true, nullable: true, type: "number" },
                    BUKy: { editable: true, nullable: true, type: "number" },
                    AdrKy: { editable: true, nullable: true, type: "number" },
                    PrjKy: { editable: true, nullable: true, type: "number" },
                    Des: { editable: true, nullable: true, type: "string" },
                    isVirtAccTrn: { editable: true, nullable: true, type: "number" },
                    ExRateAccCrn: { editable: true, nullable: true, type: "number" },
                    TrnKy: { editable: true, nullable: true, type: "number" },
                    SKy: { editable: true, nullable: true, type: "number" },
                    AnlTyp2Ky: { editable: true, nullable: true, type: "number" },
                    EftvDt: { editable: true, nullable: true, type: "string" },
                    DueDate: { editable: true, nullable: true, type: "string" },
                    RetnPer: { editable: true, nullable: true, type: "number" },
                    AmtForRetn: { editable: true, nullable: true, type: "number" },
                    OurCd: { editable: true, nullable: true, type: "string" },
                    WHTPer: { editable: true, nullable: true, type: "number" },

                }
            }
        }
    });


    $("#Recvgrid").kendoGrid({
        dataSource: dataSource,
        navigatable: true,
        autobind: true,
        sortable: true,
        filterable: true,
        selectable: "row",
        columnMenu: true,
        resizable: true,
        pageable: true,
        height: 400,
        width: 500,
        
        columns: [
           // { field: "ItmTrnKy", width: '120px', hidden: true },
            { field:"AccKy", width: '120px' },
            { field: "AccCd", width: '120px' },
            { field: "AccNm", width: '170px' },
            { field: "AnlTyp2Cd", width: '120px' },
            { field: "AnlTyp2Nm", width: '170px' },
            { field: "PreviousAmt", width: '120px' },
            { field: "Amt", width: '120px' },
            { field: "DueDate", width: '120px' },
            { field: "RetnPer", width: '120px' },
            { field: "AmtForRetn", width: '120px' },
            { field: "WHTPer", width: '120px' }

        ],


        editable: true
    });

}

function LoadWrkDneGrid(TrnKy) {


    var dataSource = new kendo.data.DataSource({
        transport: {
            read: {
                url: urlScBillItemsSelectWeb,
                data: { TrnKy: TrnKy },
                dataType: "json"
            },

        },

        batch: true,
        pageSize: 50,
        schema: {
            model: {
                id: "ItmTrnKy",
                fields: {
                    ItmTrnKy: { editable: true, nullable: false, type: "number" },
                    ItmKy: { editable: true, nullable: false, type: "number" },
                    ItmCd: { editable: true, nullable: true, type: "string" },
                    ItmNm: { editable: true, nullable: true, type: "string" },
                    Qty: { editable: true, nullable: true, type: "number" },
                    TrnUnitKy: { editable: true, nullable: true, type: "number" },
                    Unit: { editable: true, nullable: true, type: "string" },
                    Rate: { editable: true, nullable: true, type: "number" },
                    Des: { editable: true, nullable: true, type: "string" },
                    PrcsDetKy: { editable: true, nullable: true, type: "number" },
                    TaskId: { editable: true, nullable: true, type: "string" },
                    TaskNm: { editable: true, nullable: true, type: "string" },
                    Total: { editable: true, nullable: true, type: "number" },
                    BillQty: { editable: true, nullable: true, type: "number" },
                    TTLQty: { editable: true, nullable: true, type: "number" },
                    PreQty: { editable: true, nullable: true, type: "number" },

                }
            }
        }
    });


    $("#Maingrid").kendoGrid({
        dataSource: dataSource,
        navigatable: true,
        autobind: true,
        sortable: true,
        filterable: true,
        selectable: "row",
        columnMenu: true,
        resizable: true,
        pageable: true,
        height: 500,
        width: 500,

        columns: [
            { field: "ItmTrnKy", width: '120px', hidden: true },
            {
                field: "ItmKy", width: '12px', hidden: true,
                editor: function (container, options) {
                    var model = options.model;
                    $('<input id="cmbItmKy" name="' + options.field + '"/>').appendTo(container).kendoComboBox({
                        dataSource: {
                            type: "POST",

                            transport: {
                                read: {
                                    url: urlSubContracts_GetItem,
                                    data: {
                                        ConCd: 'ItmTyp',
                                        OurCd: 'SubCon',
                                    },
                                    //dataType: "json"
                                }
                            }
                        },
                        change: function (e) {

                            combo = e.sender;
                            selectedItm = combo.select();
                            dataItem = combo.dataItem(selectedItm);
                            var grid = $("#Maingrid").data("kendoGrid"),
                            model = grid.dataItem(this.element.closest("tr"));
                            var itmcd = dataItem.ItmCd;
                            var validate = ComboValidations("cmbItmKy");
                            if (validate) {
                                //
                                ChangeGridProperty(itmcd, model);
                                
                                model.set("ItmNm", dataItem.ItmNm);
                                model.set("ItmCd", dataItem.ItmCd);
                                model.set("ItmKy", dataItem.ItmKy);
                                model.set("Unit", dataItem.Unit);

                            } else {

                            }


                        },

                        filter: "contains",
                        dataBound: function (e) {

                        },
                        dataValueField: "ItmKy",
                        dataTextField: "ItmKy",
                        filter: "contains"
                    });
                }

            },
            {
                field: "ItmCd",
                title: "ItmCd",
                width: "120px",
                hidden: false,
                editor: function (container, options) {
                    var model = options.model;
                    $('<input id="cmbItmCd" name="' + options.field + '"/>').appendTo(container).kendoComboBox({
                        dataSource: {
                            type: "POST",

                            transport: {
                                read: {
                                    url: urlSubContracts_GetItem,
                                    data: {
                                        ConCd: 'ItmTyp',
                                        OurCd: 'SubCon',
                                    },
                                    //dataType: "json"
                                }
                            }
                        },
                        change: function (e) {

                            combo = e.sender;
                            selectedItm = combo.select();
                            dataItem = combo.dataItem(selectedItm);
                            var grid = $("#Maingrid").data("kendoGrid"),
                            model = grid.dataItem(this.element.closest("tr"));
                            var itmcd = dataItem.ItmCd;
                            var validate = ComboValidations("cmbItmCd");
                            if (validate) {
                                ChangeGridProperty(itmcd, model);

                                model.set("ItmNm", dataItem.ItmNm);
                                model.set("ItmCd", dataItem.ItmCd);
                                model.set("ItmKy", dataItem.ItmKy);
                                model.set("Unit", dataItem.Unit);

                            } else {
                            }


                        },

                        filter: "contains",
                        dataBound: function (e) {

                        },
                        dataValueField: "ItmKy",
                        dataTextField: "ItmCd",
                        filter: "contains"
                    });
                }

            },

            {
                field: "ItmNm",
                title: "ItmNm",
                width: "120px",
                hidden: false,
                editor: function (container, options) {
                    var model = options.model;
                    $('<input id="cmbItmNm" name="' + options.field + '"/>').appendTo(container).kendoComboBox({
                        dataSource: {
                            type: "POST",

                            transport: {
                                read: {
                                    url: urlSubContracts_GetItem,
                                    data: {
                                        ConCd: 'ItmTyp',
                                        OurCd: 'SubCon',
                                    },
                                    //dataType: "json"
                                }
                            }
                        },
                        change: function (e) {

                            combo = e.sender;
                            selectedItm = combo.select();
                            dataItem = combo.dataItem(selectedItm);
                            var grid = $("#Maingrid").data("kendoGrid"),
                            model = grid.dataItem(this.element.closest("tr"));
                            var itmcd = dataItem.ItmCd;

                            var validate = ComboValidations("cmbItmNm");
                            if (validate) {
                                ChangeGridProperty(itmcd, model);

                                model.set("ItmNm", dataItem.ItmNm);
                                model.set("ItmCd", dataItem.ItmCd);
                                model.set("ItmKy", dataItem.ItmKy);
                                model.set("Unit", dataItem.Unit);
                            } else {

                            }


                        },

                        filter: "contains",
                        dataBound: function (e) {
                            var PrjKy = $("#cmbItmNm").val();

                        },
                        dataValueField: "ItmKy",
                        dataTextField: "ItmNm",
                        filter: "contains"
                    });
                }

            },
            {
                field: "Qty", 'width': '90px', format: "{0:N2}",
                editor: function (container, options) {
                    var model = options.model;
                    $('<input id="cmbQty" name="' + options.field + '" data-value-field="' + options.field + '" data-bind="value:' + options.field + '" data-format="' + options.format + '"/>').appendTo(container).kendoNumericTextBox({
                        change: function (e) {

                            var Total = model.set("Total", (model.Qty * model.Rate));

                        }
                    });


                }

            },
            {
                field: "TrnUnitKy",
                title: "Unit",
                width: "90px",
                hidden: true,
                editor: function (container, options) {
                    var model = options.model;
                    $('<input id="cmbUnitKy" name="' + options.field + '"/>').appendTo(container).kendoComboBox({
                        dataSource: {
                            type: "POST",

                            transport: {
                                read: {
                                    url: urlUnit_lookupWeb,
                                    data: {},
                                    dataType: "json"
                                }
                            }
                        },
                        change: function (e) {

                            combo = e.sender;
                            selectedItm = combo.select();
                            dataItem = combo.dataItem(selectedItm);

                            var validate = ComboValidations("cmbUnitKy");
                            if (validate) {
                                //model.set("PrjKy", dataItem.PrjKy);
                                //model.set("PrjNm", dataItem.PrjNm);
                            } else {
                                //model.set("PrjKy", 1);
                                //model.set("PrjNm", "");
                            }


                        },

                        filter: "contains",
                        dataBound: function (e) {
                            var PrjKy = $("#cmbUnit").val();

                        },
                        dataValueField: "UnitKy",
                        dataTextField: "UnitKy",
                        filter: "contains"
                    });
                }

            },
               {
                   field: "Unit",
                   title: "Unit",
                   width: "90px",
                   hidden: false,
                   editor: function (container, options) {
                       var model = options.model;
                       $('<input id="cmbUnit" name="' + options.field + '"/>').appendTo(container).kendoComboBox({
                           dataSource: {
                               type: "POST",

                               transport: {
                                   read: {
                                       url: urlUnit_lookupWeb,
                                       data: {},
                                       dataType: "json"
                                   }
                               }
                           },
                           change: function (e) {

                               combo = e.sender;
                               selectedItm = combo.select();
                               dataItem = combo.dataItem(selectedItm);

                               var validate = ComboValidations("cmbUnit");
                               if (validate) {
                                   var unitky = $("#cmbUnit").data("kendoComboBox").value();
                                   model.set("TrnUnitKy", dataItem.unitky);
                               } else {

                               }


                           },

                           filter: "contains",
                           dataBound: function (e) {
                               var PrjKy = $("#cmbUnit").val();

                           },
                           dataValueField: "UnitKy",
                           dataTextField: "Unit",
                           filter: "contains"
                       });
                   }

               },
            {
                field: "Rate", 'width': '120px', format: "{0:N2}",
                editor: function (container, options) {
                    var model = options.model;
                    $('<input id="cmbRate" name="' + options.field + '" data-value-field="' + options.field + '" data-bind="value:' + options.field + '" data-format="' + options.format + '"/>').appendTo(container).kendoNumericTextBox({
                        change: function (e) {

                            if (model.Rate >= 0) {
                                var Total = model.set("Total", (model.Qty * model.Rate));
                            } else {
                                alert("The Rate Should Be In Positive...");
                                model.set("Rate", 0);

                            }



                        }
                    });


                }
            },
            { field: "Des", 'width': '120px' },
            {
                field: "PrcsDetKy",
                title: "PrcsDetKy",
                width: '12px',
                hidden: true,
                editor: function (container, options) {
                    var cmb = $("#projectIdCmb").data("kendoComboBox");
                    var pky = cmb.value();

                    if (pky == "" || pky == null) { pky = 1; }

                    var model = options.model;
                    $('<input id="cmbprcsdetky" name="' + options.field + '"/>').appendTo(container).kendoComboBox({
                        dataSource: {
                            type: "POST",

                            transport: {
                                read: {
                                    url: urlSubContracts_GetTask,
                                    data: {
                                        PrjKy: pky
                                    },
                                    dataType: "json"
                                }
                            }
                        },
                        change: function (e) {

                            combo = e.sender;
                            selectedItm = combo.select();
                            dataItem = combo.dataItem(selectedItm);

                            var validate = ComboValidations("cmbprcsdetky");
                            if (validate) {
                                //var pdetky = $("#cmbprcsdetky").data("kendoComboBox").value();
                                //model.set("TaskID", dataItem.pdetky);


                            } else {

                            }


                        },

                        filter: "contains",
                        dataBound: function (e) {

                        },
                        dataValueField: "PrcsDetKy",
                        dataTextField: "PrcsDetKy",
                        filter: "contains"
                    });
                }
            },

             {
                 field: "TaskId",
                 title: "Task ID",
                 width: "120px",
                 hidden: false,
                 editor: function (container, options) {

                     var cmb = $("#projectIdCmb").data("kendoComboBox");
                     var pky = cmb.value();

                     if (pky == "" || pky == null) { pky = 1; }

                     var model = options.model;
                     $('<input id="cmbTaskId" name="' + options.field + '"/>').appendTo(container).kendoComboBox({
                         dataSource: {
                             type: "POST",

                             transport: {
                                 read: {
                                     url: urlSubContracts_GetTask,
                                     data: {
                                         PrjKy: pky
                                     },
                                     dataType: "json"
                                 }
                             }
                         },
                         change: function (e) {

                             combo = e.sender;
                             selectedItm = combo.select();
                             dataItem = combo.dataItem(selectedItm);


                             var validate = ComboValidations("cmbTaskId");
                             if (validate) {
                                 
                                 var grid = $("#Maingrid").data("kendoGrid"),
                                 model = grid.dataItem(this.element.closest("tr"));
                                 model.set("PrcsDetKy", dataItem.PrcsDetKy);
                                 model.set("TaskId", dataItem.TaskId);
                                 model.set("TaskNm", dataItem.TaskNm);


                                 var itmky = model.get("ItmKy");
                                 var prcsdetky = model.get("PrcsDetKy");
                                 GetGridSCQty(prcsdetky, itmky, model);
                                 //var prcsdetky = e.model.get("PrcsDetKy");
                                 //var itmky = model.get("ItmKy");
                                 //model.set("PrcsDetKy", dataItem.PrcsDetKy);
                                 //model.set("TaskID", dataItem.TaskNm);
                                 //var grid = $("#Maingrid").data("kendoGrid"),
                                 //model = grid.dataItem(this.element.closest("tr"));

                                 //var prcsdetky = dataItem.PrcsDetKy;
                                 //var itmky = dataItem.ItmKy;
                                 //alert(itmky);
                                 //GetGridSCQty(prcsdetky,itmky, model);

                             } else {

                             }


                         },

                         filter: "contains",
                         dataBound: function (e) {

                         },
                         dataValueField: "PrcsDetKy",
                         dataTextField: "TaskId",
                         filter: "contains"
                     });
                 }

             },
             {
                 field: "TaskNm",
                 title: "TaskNm",
                 width: "120px",
                 hidden: false,
                 editor: function (container, options) {

                     var cmb = $("#projectIdCmb").data("kendoComboBox");
                     var pky = cmb.value();

                     if (pky == "" || pky == null) { pky = 1; }

                     var model = options.model;
                     $('<input id="cmbTaskNm" name="' + options.field + '"/>').appendTo(container).kendoComboBox({
                         dataSource: {
                             type: "POST",

                             transport: {
                                 read: {
                                     url: urlSubContracts_GetTask,
                                     data: {
                                         PrjKy: pky
                                     },
                                     dataType: "json"
                                 }
                             }
                         },
                         change: function (e) {

                             combo = e.sender;
                             selectedItm = combo.select();
                             dataItem = combo.dataItem(selectedItm);


                             var validate = ComboValidations("cmbTaskNm");
                             if (validate) {
                                 
                                 var grid = $("#Maingrid").data("kendoGrid"),
                                 smodel = grid.dataItem(this.element.closest("tr"));
                                 model.set("PrcsDetKy", dataItem.PrcsDetKy);
                                 model.set("TaskId", dataItem.TaskId);
                                 model.set("TaskNm", dataItem.TaskNm);

                                 //var prcsdetky = e.model.get("PrcsDetKy");
                                 var itmky = model.get("ItmKy");
                                 var prcsdetky = model.get("PrcsDetKy");
                                 //model.set("PrcsDetKy", dataItem.PrcsDetKy);
                                 //model.set("TaskID", dataItem.TaskNm);
                                 //var grid = $("#Maingrid").data("kendoGrid"),
                                 //model = grid.dataItem(this.element.closest("tr"));

                                 //var prcsdetky = dataItem.PrcsDetKy;
                                 //var itmky = dataItem.ItmKy;
                                 //alert(prcsdetky);
                                 GetGridSCQty(prcsdetky, itmky, model);

                             } else {

                             }


                         },

                         filter: "contains",
                         dataBound: function (e) {

                         },
                         dataValueField: "PrcsDetKy",
                         dataTextField: "TaskNm",
                         filter: "contains"
                     });
                 }

             },

             { field: "Total", 'width': '120px' },
             { field: "BillQty", 'width': '120px' },
             { field: "TTLQty", 'width': '120px' },
             { field: "PreQty", 'width': '120px' },


        ],


        editable: true
    });

}

function GetGridSCQty(PrcsDetKy, ItmKy, model) {

    var scprjky = $("#subContractIdCmb").data("kendoComboBox").value();
    var SCHdrDt = $("#dateSubConHdr").val()


    $.holdReady(true);

    $.ajax({
        url: urlQty_SelectWeb,
        data: {
            ItmKy: ItmKy,
            PrcsDetKy: PrcsDetKy,
            scprjky: scprjky,
            SCHdrDt: SCHdrDt

        },
        type: "POST",
        dataType: 'json',

        success: function (data) {
            if (data) {
                //
                for (i = 0; i < data.length; i++) {

                    var billqty = data[0].BillQty;
                    var ttlqty = data[0].TTLQty;
                    var preqty = data[0].PreQty;
                    model.set("BillQty", billqty);
                    model.set("TTLQty", ttlqty);
                    model.set("PreQty", preqty);


                }
                //alert("BillQty :" + billqty + "TTLQty :" + ttlqty + "PreQty :" + preqty);

            }
            else {
                //alert("No Data ... !");
            }
            $.holdReady(false);
        }
    });
}

function ChangeGridProperty(ItmCd, model) {
    //
    var prjky = $("#projectIdCmb").data("kendoComboBox").value();
    ConCd = "ItmTyp";
    OurCd = "SubCon";

    //

    $.holdReady(true);

    $.ajax({
        url: urlUnit_SelectWeb,
        data: {
            ItmCd: ItmCd,
            PrjKy: prjky,
            ConCd: ConCd,
            OurCd: OurCd

        },
        type: "POST",
        dataType: 'json',

        success: function (data) {
            if (data) {
                //
                for (i = 0; i < data.length; i++) {

                    var unit = data[0].Unit;
                    var unitky = data[0].UnitKy;
                    var rate = data[0].Rate;
                    model.set("Rate", rate);
                    model.set("Unit", unit);
                    model.set("UnitKy", unitky);


                }
                //alert("Unit :" + unit + "Uky :" + unitky + "Rate :" + rate);

            }
            else {
                //alert("No Data ... !");
            }
            $.holdReady(false);
        }
    });
}

function SubConSave(TrnKy) {

    if (TrnKy == null) {
        TrnKy = 1;
    }


    //$.holdReady(true);
    //$.ajax({
    //    type: "GET",
    //    dataType: 'json',
    //    async: false,
    //    timeout: 20000,
    //    data: {
    //        TrnKy: TrnKy
    //    },
    //    url: urlScBillRecv_SelectWeb,
    //    converters: { "text json": function (data) { return $.parseJSON(data, true, true); } },
    //    success: function (data) {
    //        var viewModelScBillRecv_SelectWeb = kendo.observable({
    //            srcScBillRecv_SelectWeb: data
    //        });
    //        kendo.bind($("#tGridScBillRecv_SelectWeb"), viewModelScBillRecv_SelectWeb);
    //        $.holdReady(false);
    //    }
    //});




    //$.holdReady(true);
    //$.ajax({
    //    type: "GET",
    //    dataType: 'json',
    //    async: false,
    //    timeout: 20000,
    //    data: {
    //        TrnKy: TrnKy
    //    },
    //    url: urlScBillPmt_SelectWeb,
    //    converters: { "text json": function (data) { return $.parseJSON(data, true, true); } },
    //    success: function (data) {
    //        var viewModelScBillPmt_SelectWeb = kendo.observable({
    //            srcScBillPmt_SelectWeb: data
    //        });
    //        kendo.bind($("#tGridScBillPmt_SelectWeb"), viewModelScBillPmt_SelectWeb);
    //        $.holdReady(false);
    //    }
    //});
    LoadBillPmtGrid(TrnKy);
    LoadRecvGrid(TrnKy);
    LoadWrkDneGrid(TrnKy);
    $("#btnAdd").show();
    $("#btnSave").show();
    $("#btnCancel").show();

}