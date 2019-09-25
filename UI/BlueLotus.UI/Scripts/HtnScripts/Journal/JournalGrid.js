function GridDefaultColumns() {
    var columnsDefine = [
        {
            field: "AccTrnKy",
            title: "AccTrnKy",
            width: "70px",
            hidden: true,

        },
        {
            field: "LiNo",
            title: "LiNo",
            width: "40px",
            attributes: { class: "ob-Center" }
        },
        {
            field: "AccKy",
            title: "AccKy",
            width: "70px",
            hidden: true,
            editor: function (container, options) {
                var model = options.model;
            }

        },
        {
            field: "AccCode",
            title: "Accounts Code",
            width: "100px",
            editor: function (container, options) {
                var model = options.model;
            }
        },
        //{
        //    field: "AccName",
        //    title: "Account Name",
        //    width: "120px",
        //    editor: function (container, options) {
        //        var model = options.model;
        //    }
        //},
        {
            field: "AccAdrKy",
            title: "AccAdrKy",
            width: "70px",
            hidden: true,
            editor: function (container, options) {
                var model = options.model;
            }

        },
        {
            field: "AccAdrName",
            title: "Account Address Name",
            width: "120px",
            editor: function (container, options) {
                var model = options.model;
            }
        },
        {
            field: "Description",
            title: "Description",
            width: "150px",

        },
        {
            field: "DrAmtGrd",
            title: "HdrSec5_NmricDrAmt_Val",
            width: "70px",
            format: "{0:N2}",
            decimals: 3,
            editor: function (container, options) {
                var model = options.model;
                $('<input id="DrAmtGrd" name="' + options.field + '" data-value-field="' + options.field + '" data-bind="value:' + options.field + '" data-format="' + options.format + '"/>').appendTo(container).kendoNumericTextBox({
                    change: function (e) {
                        CalDrTot();
                        CalCrTot();
                        calDifference();
                    }
                });
            }
        },
        {
            field: "CrAmtGrd",
            title: "HdrSec5_NmricCrAmt_Val",
            width: "70px",
            format: "{0:N2}",
            decimals: 3,
            editor: function (container, options) {
                var model = options.model;
                $('<input id="CrAmtGrd" name="' + options.field + '" data-value-field="' + options.field + '" data-bind="value:' + options.field + '" data-format="' + options.format + '"/>').appendTo(container).kendoNumericTextBox({
                    change: function (e) {
                        CalDrTot();
                        CalCrTot();
                        calDifference();
                    }
                });
            }
        },
        {
            field: "BuKy",
            title: "BuKy",
            width: "70px",
            hidden: true,
            editor: function (container, options) {
                var model = options.model;
         
            }
        },
        {
            field: "BU",
            title: "BU",
            width: "100px",
            editor: function (container, options) {
                var model = options.model;
                $('<input id="cmbbuType" name="' + options.field + '"/>')
             .appendTo(container)
             .kendoComboBox({
                 dataSource: BUCode("HdrSec4_CmbBU"),
                 //    {
                 //    type: "POST",
                 //    transport: {
                 //        read: UrlBuList // '@Url.Content("~/ManageAllAccount/Buxdrop")'
                 //    }
                 //},
                 change: function (arg) {

                     combo = arg.sender;
                     selectedItm = combo.select();
                     dataItem = combo.dataItem(selectedItm);
                     var validate = ComboValidations("cmbbuType");

                     if (validate) {
                         model.set("BuKy", dataItem.CdKy);
                         model.set("BU", dataItem.Code);
                     } else {
                         model.set("BuKy", 1);
                         model.set("BU", "");
                     }


                 },
                 //when the user gonna add a new record, combo should automatically bind the values from the Filter
                 filter: "startswith",
                 dataValueField: "CdKy",
                 dataTextField: "Code",
             });
            }
        },
        {
            field: "ProjectKy",
            title: "ProjectKy",
            width: "70px",
            hidden: true,
            editor: function (container, options) {
                var model = options.model;
            }
        },
        {
            field: "Project",
            title: "Project Code",
            width: "100px",
            editor: function (container, options) {
                var model = options.model;
            }
        },
        //{
        //    field: "ProjectNm",
        //    title: "Project Name",
        //    width: "120px",
        //    editor: function (container, options) {
        //        var model = options.model;
        //    }
        //},
        {
            field: "AccCurKy",
            title: "AccountCurKy",
            width: "70px",
            hidden: true,
            editor: function (container, options) {
                var model = options.model;
            }
        },
        {
            field: "AccCur",
            title: "Accounts Currency",
            width: "70px",
            attributes: { class: "ob-Center" },
            editor: function (container, options) {
                var model = options.model;
            }
        },
        {
            field: "ExRate",
            title: "ExRate",
            width: "40px",
            attributes: { class: "ob-Center" },
            editor: function (container, options) {
                var model = options.model;
            }
        },
        {
            field: "TaskKy",
            title: "TaskKy",
            width: "70px",
            hidden: true,
            editor: function (container, options) {
                var model = options.model;
            }
        },
        {
            field: "TaskId",
            title: "Task Id",
            width: "100px",
            editor: function (container, options) {
                var model = options.model;
            }
        },
        //{
        //    field: "TaskNm",
        //    title: "Task Name",
        //    width: "100px",
        //    editor: function (container, options) {
        //        var model = options.model;
        //    }
        //},
        {
            field: "HdrSec6_MADate_Cd",
            title: "Ma Date",
            width: "70px",
            editor: function (container, options) {
                var model = options.model;
            }
        },
        {
            field: "Dirty",
            title: "Dirty",
            width: "70px",
            hidden: true,
            editor: function (container, options) {
                var model = options.model;
            }
        },
        {
            field: "LCKy",
            title: "LCKy",
            width: "70px",
            hidden: true,
            editor: function (container, options) {
                var model = options.model;
            }

        },
        {
            field: "LC",
            title: "LC",
            width: "70px",
            editor: function (container, options) {
                var model = options.model;
            }
        },
        {
            field: "LoanKy",
            title: "LoanKy",
            width: "70px",
            hidden: true,
            editor: function (container, options) {
                var model = options.model;
            }
        },
        {
            field: "Loan",
            title: "Loan",
            width: "70px",
            editor: function (container, options) {
                var model = options.model;
            }
        },
        {
            field: "OrderNoKy",
            title: "OrderNoKy",
            width: "70px",
            hidden: true,
            editor: function (container, options) {
                var model = options.model;
            }
        },
        {
            field: "OrderNo",
            title: "OrderNo",
            width: "70px",
            editor: function (container, options) {
                var model = options.model;
            }
        },
        {
            field: "OrderDetKy",
            title: "OrderDetKy",
            width: "70px",
            hidden: true,
            editor: function (container, options) {
                var model = options.model;
            }
        },
        {
            field: "OrderDet",
            title: "OrderDet",
            width: "70px",
            editor: function (container, options) {
                var model = options.model;
            }
        },
        {
            field: "ResAdrKy",
            title: "ResAdrKy",
            width: "70px",
            hidden: true,
            editor: function (container, options) {
                var model = options.model;
            }
        },
        {
            field: "ResAdr",
            title: "ResAdr",
            width: "70px",
            editor: function (container, options) {
                var model = options.model;
            }
        },
        {
            field: "Analysys1Ky",
            title: "Analysys1Ky",
            width: "70px",
            hidden: true,
            editor: function (container, options) {
                var model = options.model;
            }
        },
        {
            field: "Analysys1",
            title: "Analysys1",
            width: "70px",
            editor: function (container, options) {
                var model = options.model;
            }
        },
        //{
        //    field: "Analysys1Nm",
        //    title: "Analysys1Nm",
        //    width: "70px",
        //    editor: function (container, options) {
        //        var model = options.model;
        //    }
        //},
        {
            field: "Analysys2Ky",
            title: "Analysys2Ky",
            width: "70px",
            hidden: true,
            editor: function (container, options) {
                var model = options.model;
            }
        },
        {
            field: "Analysys2",
            title: "Analysys2",
            width: "70px",
            editor: function (container, options) {
                var model = options.model;
            }
        },
        //{
        //    field: "Analysys2Nm",
        //    title: "Analysys2Nm",
        //    width: "70px",
        //    editor: function (container, options) {
        //        var model = options.model;
        //    }
        //},
        {
            field: "Analysys3Ky",
            title: "Analysys3Ky",
            width: "70px",
            hidden: true,
            editor: function (container, options) {
                var model = options.model;
            }
        },
        {
            field: "Analysys3",
            title: "Analysys3",
            hidden: true,
            editor: function (container, options) {
                var model = options.model;
            }
        },
        //{
        //    field: "Analysys3Nm",
        //    title: "Analysys3Nm",
        //    width: "70px",
        //    editor: function (container, options) {
        //        var model = options.model;
        //    }
        //},
        {
            field: "Analysys4Ky",
            title: "Analysys4Ky",
            width: "70px",
            hidden: true,
            editor: function (container, options) {
                var model = options.model;
            }
        },
        {
            field: "Analysys4",
            title: "Analysys4",
            width: "70px",
            editor: function (container, options) {
                var model = options.model;
            }
        },
        //{
        //    field: "Analysys4Nm",
        //    title: "Analysys4Nm",
        //    width: "70px",
        //    editor: function (container, options) {
        //        var model = options.model;
        //    }
        //},
        {
            field: "Analysys5Ky",
            title: "Analysys5Ky",
            width: "70px",
            hidden: true,
            editor: function (container, options) {
                var model = options.model;
            }
        },
        {
            field: "Analysys5",
            title: "Analysys5",
            width: "70px",
            editor: function (container, options) {
                var model = options.model;
            }
        },
        //{
        //    field: "Analysys5Nm",
        //    title: "Analysys5Nm",
        //    width: "70px",
        //    editor: function (container, options) {
        //        var model = options.model;
        //    }
        //},
        {
            field: "Analysys6Ky",
            title: "Analysys6Ky",
            width: "70px",
            hidden: true,
            editor: function (container, options) {
                var model = options.model;
            }
        },
        {
            field: "Analysys6",
            title: "Analysys6",
            width: "70px",
            editor: function (container, options) {
                var model = options.model;
            }
        },
        //{
        //    field: "Analysys6Nm",
        //    title: "Analysys6Nm",
        //    width: "70px",
        //    editor: function (container, options) {
        //        var model = options.model;
        //    }
        //},
        {
            field: "IsAct",
            title: "IsAct",
            width: "50px",
            hidden: true,
            editor: function (container, options) {
                var model = options.model;
            }
        },
        {
            width: "60px",
            template: kendo.template($("#command-template").html())
        }

    ];

    var gridNo = 1;
    //var columnsFinal = setColumnProp(columnsDefine, ObjKy, "", "FormGrd", gridNo);
    var columnsFinal = setGridColumnProp(columnsDefine, 'FormGrd', gridNo);
}

//Load Gid Details
function LoadGridWithColumnProp(columnsFinal, gridNo) {
    var dataSource = new kendo.data.DataSource({
        batch: true,
        pageSize: 10,
        sort: ({ field: "LiNo", dir: "desc" }),
        schema: {
            model: {
                id: "AccTrnKy",
                fields: //Relavent fields of the grid should be bind with following model items
                {
                    LiNo: { editable: true, nullable: false, type: "number" },
                    AccKy: { editable: true, nullable: false, type: "number" },
                    AccCode: { editable: true, nullable: false, type: "string" },
                    AccName: { editable: true, nullable: false, type: "string" },
                    AccAdrKy: { editable: true, nullable: false, type: "number" },
                    AccAdrName: { editable: true, nullable: false, type: "string" },
                    Description: { editable: true, nullable: false, type: "string" },
                    AccCurKy: { editable: true, nullable: false, type: "number" },
                    AccCur: { editable: true, nullable: false, type: "string" },
                    ExRate: { editable: true, nullable: false, type: "number" },
                    DrAmtGrd: { editable: true, nullable: false, type: "number" },
                    CrAmtGrd: { editable: true, nullable: false, type: "number" },
                    Bu: { editable: true, nullable: false, type: "string" },
                    BuKy: { editable: true, nullable: false, type: "number" },
                    TaskKy: { editable: true, nullable: false, type: "number" },
                    TaskId: { editable: true, nullable: false, type: "string" },
                    TaskNm: { editable: true, nullable: false, type: "string" },
                    ProjectKy: { editable: true, nullable: false, type: "number" },
                    Project: { editable: true, nullable: false, type: "string" },
                    ProjectNm: { editable: true, nullable: false, type: "string" },
                    Dt2: { editable: true, nullable: false, type: "string" },
                    AccTrnKy: { editable: true, nullable: false, type: "number" },
                    LCKy: { editable: true, nullable: false, type: "number" },
                    LC: { editable: true, nullable: false, type: "string" },
                    LoanKy: { editable: true, nullable: false, type: "number" },
                    Loan: { editable: true, nullable: false, type: "string" },
                    OrderNoKy: { editable: true, nullable: false, type: "number" },
                    OrderNo: { editable: true, nullable: false, type: "string" },
                    OrderDetKy: { editable: true, nullable: false, type: "number" },
                    OrderDet: { editable: true, nullable: false, type: "string" },
                    ResAdrKy: { editable: true, nullable: false, type: "number" },
                    ResAdr: { editable: true, nullable: false, type: "string" },
                    Analysys1Ky: { editable: true, nullable: false, type: "number" },
                    Analysys1: { editable: true, nullable: false, type: "string" },
                    Analysys1Nm: { editable: true, nullable: false, type: "string" },
                    Analysys2Ky: { editable: true, nullable: false, type: "number" },
                    Analysys2: { editable: true, nullable: false, type: "string" },
                    Analysys2Nm: { editable: true, nullable: false, type: "string" },
                    Analysys3Ky: { editable: true, nullable: false, type: "number" },
                    Analysys3: { editable: true, nullable: false, type: "string" },
                    Analysys3Nm: { editable: true, nullable: false, type: "string" },
                    Analysys4Ky: { editable: true, nullable: false, type: "number" },
                    Analysys4: { editable: true, nullable: false, type: "string" },
                    Analysys4Nm: { editable: true, nullable: false, type: "string" },
                    Analysys5Ky: { editable: true, nullable: false, type: "number" },
                    Analysys5: { editable: true, nullable: false, type: "string" },
                    Analysys5Nm: { editable: true, nullable: false, type: "string" },
                    Analysys6Ky: { editable: true, nullable: false, type: "number" },
                    Analysys6: { editable: true, nullable: false, type: "string" },
                    Analysys6Nm: { editable: true, nullable: false, type: "string" },
                    IsAct: { editable: true, nullable: false, type: "number" },
                }
            }

        },

    });
    $("#JournalGrid")
        .kendoGrid({
            dataSource: dataSource,
            sortable: true,
            autobind: true,
            navigatable: true,
            scrollable: true,
            pageSize: 10,
            pageable: true,
            selectable: "row",
            filterable: {
                mode: "row"
            },
            resizable: true,
            dataBound: onDataBound,
            pageable: { refresh: true, pageSizes: [5, 10, 20, 50, 100] },
            columns: columnsFinal,
            editable: true
        });
}

function onDataBound(e) {
    var id = ("#JournalGrid");
    var grid = $(id).data("kendoGrid");
    var dataSource = grid.dataSource.data();
    for (var i = 0; i < dataSource.length; i++) {
        if (dataSource[i].IsAct == 0) {
            grid.tbody.find("[data-uid='" + dataSource[i].uid + "']").hide();
        }
    }
}

function InsertToGrid() {
    var grid = $("#JournalGrid").data("kendoGrid");
    var dataSource1 = grid.dataSource;
    var total = dataSource1.data().length;

    var TempAccKy = $("#HdrSec4_CmbAcc_Cd").data("kendoComboBox").value();
    var TempAccCd = $("#HdrSec4_CmbAcc_Cd").data("kendoComboBox").text();
    //var TempAccNm = $("#HdrSec4_CmbAcc_Nm").data("kendoComboBox").text();
    var TempPrjKy = $("#HdrSec4_CmbPrj_Cd").data("kendoComboBox").value();
    if (!TempPrjKy) {
        TempPrjKy = 1;
    }
    var TempPrjCd = $("#HdrSec4_CmbPrj_Cd").data("kendoComboBox").text();
    //var TempPrjNm = $("#HdrSec4_CmbPrj_Nm").data("kendoComboBox").text();
    var TempBuKy = $("#HdrSec4_CmbBU_Cd").data("kendoComboBox").value();
    if (!TempBuKy) {
        TempBuKy = 1;
    }
    var TempHdrSec4_CmbBU_Cd = $("#HdrSec4_CmbBU_Cd").data("kendoComboBox").text();
    //var TempBuNm = $("#HdrSec4_CmbBU_Nm").data("kendoComboBox").text();
    var TempTaskKy = $("#HdrSec4_CmbTask_Cd").data("kendoComboBox").value();
    if (!TempTaskKy) {
        TempTaskKy = 1;
    }
    var TempTaskCd = $("#HdrSec4_CmbTask_Cd").data("kendoComboBox").text();
    //var TempTaskNm = $("#HdrSec4_CmbTask_Nm").data("kendoComboBox").text();
    var TempAdrKy = $("#HdrSec5_CmbAdress_Cd").data("kendoComboBox").value();
    if (!TempAdrKy) {
        TempAdrKy = 1;
    }
    var TempAdrNm = $("#HdrSec5_CmbAdress_Cd").data("kendoComboBox").text();

    var TempCurKy = $("#HdrSec6_CmbAccCur_Cd").data("kendoComboBox").value();
    if (!TempCurKy) {
        TempCurKy = 1;
    }
    var TempCurCd = $("#HdrSec6_CmbAccCur_Cd").data("kendoComboBox").text();
    var TempDiscrption = $("#HdrSec10_TxtArea_Des_Val").val();
    var HdrSec6_InptAccEx_Cd = document.getElementById("HdrSec6_InptAccEx_Cd").value;

    var CrAmount = $("#HdrSec5_NmricCrAmt_Val").data("kendoNumericTextBox").value();
    var DrAmount = $("#HdrSec5_NmricDrAmt_Val").data("kendoNumericTextBox").value();
    var Tempdate = document.getElementById("HdrSec6_MADate_Cd").value;

    //New Item

    var TempLC = $("#HdrSec5_CmbLC_Cd").data("kendoComboBox").text();
    var TempLCKy = $("#HdrSec5_CmbLC_Cd").data("kendoComboBox").value();
    if (!TempLCKy) {
        TempLCKy = 1;
    }

    var TempLoan = $("#HdrSec5_CmbLoan_Cd").data("kendoComboBox").text();
    var TempLoanKy = $("#HdrSec5_CmbLoan_Cd").data("kendoComboBox").value();
    if (!TempLoanKy) {
        TempLoanKy = 1;
    }

    var TempOrderDet = $("#HdrSec5_CmbOrderDet_Cd").data("kendoComboBox").text();
    var TempOrderDetKy = $("#HdrSec5_CmbOrderDet_Cd").data("kendoComboBox").value();
    if (!TempOrderDetKy) {
        TempOrderDetKy = 1;
    }

    var TempOrderNO = $("#HdrSec6_CmbOrderNO_Cd").data("kendoComboBox").text();
    var TempOrderNOKy = $("#HdrSec6_CmbOrderNO_Cd").data("kendoComboBox").value();
    if (!TempOrderNOKy) {
        TempOrderNOKy = 1;
    }

    var TempResAdr = $("#HdrSec6_CmbResAdr_Cd").data("kendoComboBox").text();
    var TempResAdrKy = $("#HdrSec6_CmbResAdr_Cd").data("kendoComboBox").value();
    if (!TempResAdrKy) {
        TempResAdrKy = 1;
    }

    //Anl1
    var TempAnl1Ky = $("#HdrSec7_CmbAnl1_Cd").data("kendoComboBox").value();
    if (!TempAnl1Ky) {
        TempAnl1Ky = 1;
    }
    var TempAnl1Cd = $("#HdrSec7_CmbAnl1_Cd").data("kendoComboBox").text();
    //var TempAnl1Nm = $("#HdrSec7_CmbAnl1_Nm").data("kendoComboBox").text();

    //Anl2
    var TempAnl2Ky = $("#HdrSec7_CmbAnl2_Cd").data("kendoComboBox").value();
    if (!TempAnl2Ky) {
        TempAnl2Ky = 1;
    }
    var TempAnl2Cd = $("#HdrSec7_CmbAnl2_Cd").data("kendoComboBox").text();
    //var TempAnl2Nm = $("#HdrSec7_CmbAnl2_Nm").data("kendoComboBox").text();

    //Anl 3
    var TempAnl3Ky = $("#HdrSec8_CmbAnl3_Cd").data("kendoComboBox").value();
    if (!TempAnl3Ky) {
        TempAnl3Ky = 1;
    }
    var TempAnl3Cd = $("#HdrSec8_CmbAnl3_Cd").data("kendoComboBox").text();
    //var TempAnl3Nm = $("#HdrSec8_CmbAnl3_Nm").data("kendoComboBox").text();

    //Anl 4
    var TempAnl4Ky = $("#HdrSec8_CmbAnl4_Cd").data("kendoComboBox").value();
    if (!TempAnl4Ky) {
        TempAnl4Ky = 1;
    }
    var TempAnl4Cd = $("#HdrSec8_CmbAnl4_Cd").data("kendoComboBox").text();
    //var TempAnl4Nm = $("#HdrSec8_CmbAnl4_Nm").data("kendoComboBox").text();

    //Anl 5
    var TempAnl5Ky = $("#HdrSec9_CmbAnl5_Cd").data("kendoComboBox").value();
    if (!TempAnl5Ky) {
        TempAnl5Ky = 1;
    }
    var TempAnl5Cd = $("#HdrSec9_CmbAnl5_Cd").data("kendoComboBox").text();
    //var TempAnl5Nm = $("#HdrSec9_CmbAnl5_Nm").data("kendoComboBox").text();

    //Anl 
    var TempAnl6Ky = $("#HdrSec9_CmbAnl6_Cd").data("kendoComboBox").value();
    if (!TempAnl6Ky) {
        TempAnl6Ky = 1;
    }
    var TempAnl6Cd = $("#HdrSec9_CmbAnl6_Cd").data("kendoComboBox").text();
   // var TempAnl6Nm = $("#HdrSec9_CmbAnl6_Nm").data("kendoComboBox").text();

    grid.dataSource.insert(
        total,
        {
            LiNo: total + 1,
            AccKy: TempAccKy,
            AccCode: TempAccCd,
            //AccName: TempAccNm,
            AccAdrKy: TempAdrKy,
            AccAdrName: TempAdrNm,
            Description: TempDiscrption,
            DrAmtGrd: DrAmount,
            CrAmtGrd: CrAmount,
            BuKy: TempBuKy,
            BU: TempHdrSec4_CmbBU_Cd,
            ProjectKy: TempPrjKy,
            Project: TempPrjCd,
            //HdrSec4_CmbPrj_Nm: TempPrjNm,
            AccCurKy: TempCurKy,
            AccCur: TempCurCd,
            ExRate: HdrSec6_InptAccEx_Cd,
            TaskKy: TempTaskKy,
            TaskId: TempTaskCd,
            //TaskNm: TempTaskNm,
            Dt2: Tempdate,
            LCKy: TempLCKy,
            LC: TempLC,
            LoanKy: TempLoanKy,
            Loan: TempLoan,
            OrderDetKy: TempOrderDetKy,
            OrderDet: TempOrderDet,
            OrderNoKy: TempOrderNOKy,
            OrderNo: TempOrderNO,
            ResAdrKy: TempResAdrKy,
            ResAdr: TempResAdr,
            Analysys1Ky: TempAnl1Ky,
            Analysys1: TempAnl1Cd,
            //Analysys1Nm: TempAnl1Nm,
            Analysys2Ky: TempAnl2Ky,
            Analysys2: TempAnl2Cd,
            //Analysys2Nm: TempAnl2Nm,
            Analysys3Ky: TempAnl3Ky,
            Analysys3: TempAnl3Cd,
            //Analysys3Nm: TempAnl3Nm,
            Analysys4Ky: TempAnl4Ky,
            Analysys4: TempAnl4Cd,
            //Analysys4Nm: TempAnl4Nm,
            Analysys5Ky: TempAnl5Ky,
            Analysys5: TempAnl5Cd,
            //Analysys5Nm: TempAnl5Nm,
            Analysys6Ky: TempAnl6Ky,
            Analysys6: TempAnl6Cd,
            //Analysys6Nm: TempAnl6Nm,
            IsAct: 1
        }
    );

}

$("#JournalGrid")
    .on("dblclick",
        "tr.k-state-selected",
        function () {
            var id = ("#JournalGrid");
            var grid = $(id).data().kendoGrid;
            var selectedItem = grid.dataItem(grid.select());
            //var grid = ("#JournalGrid").data().kendoGrid();
            //var selectedItem = grid.dataItem(grid.select());
            var Lino = selectedItem.LiNo;
            var AccKy = selectedItem.AccKy;
            var AdrKy = selectedItem.AccAdrKy;
            var HdrSec5_NmricDrAmt_Val = selectedItem.DrAmtGrd;
            var HdrSec5_NmricCrAmt_Val = selectedItem.CrAmtGrd;
            var BUKy = selectedItem.BuKy;
            var ProjectKy = selectedItem.ProjectKy;
            var AccCurKy = selectedItem.AccCurKy;
            var ExRate = selectedItem.ExRate;
            var TaskKy = selectedItem.TaskKy;
            var Dt2 = selectedItem.Dt2;
            var Description = selectedItem.Description;

            var Analysys1Ky = selectedItem.Analysys1Ky;
            var Analysys2Ky = selectedItem.Analysys2Ky;
            var Analysys3Ky = selectedItem.Analysys3Ky;
            var Analysys4Ky = selectedItem.Analysys4Ky;
            var Analysys5Ky = selectedItem.Analysys5Ky;
            var Analysys6Ky = selectedItem.Analysys6Ky;
            var LCKy = selectedItem.LCKy;
            var LoanKy = selectedItem.LoanKy;
            var OrderDetKy = selectedItem.OrderDetKy;
            var OrderNoKy = selectedItem.OrderNoKy;
            var ResAdrKy = selectedItem.ResAdrKy;
            var MaDate = selectedItem.HdrSec6_MADate_Cd;

            document.getElementById("TempLiNumber").value = Lino;

            $("#HdrSec4_CmbAcc_Cd").data("kendoComboBox").value(AccKy);
            //$("#HdrSec4_CmbAcc_Nm").data("kendoComboBox").value(AccKy);
            $("#HdrSec4_CmbPrj_Cd").data("kendoComboBox").value(ProjectKy);
            //$("#HdrSec4_CmbPrj_Nm").data("kendoComboBox").value(ProjectKy);
            $("#HdrSec4_CmbBU_Cd").data("kendoComboBox").value(BUKy);
            //$("#HdrSec4_CmbBU_Nm").data("kendoComboBox").value(BUKy);
            $("#HdrSec4_CmbTask_Cd").data("kendoComboBox").value(TaskKy);
            //$("#HdrSec4_CmbTask_Nm").data("kendoComboBox").value(TaskKy);
            $("#HdrSec5_CmbAdress_Cd").data("kendoComboBox").value(AdrKy);
            $("#HdrSec6_CmbAccCur_Cd").data("kendoComboBox").value(AccCurKy);
            $("#HdrSec10_TxtArea_Des_Val").val(Description);
            //document.getElementById("HdrSec6_InptAccEx_Cd").value(ExRate);
            document.getElementById("HdrSec6_InptAccEx_Cd").value = ExRate;
            $("#HdrSec5_NmricCrAmt_Val").data("kendoNumericTextBox").value(HdrSec5_NmricCrAmt_Val);
            $("#HdrSec5_NmricDrAmt_Val").data("kendoNumericTextBox").value(HdrSec5_NmricDrAmt_Val);
            $("#HdrSec6_MADate_Cd").data("kendoDatePicker").value(MaDate);

            $("#HdrSec5_CmbLC_Cd").data("kendoComboBox").value(LCKy);
            $("#HdrSec5_CmbLoan_Cd").data("kendoComboBox").value(LoanKy);
            $("#HdrSec5_CmbOrderDet_Cd").data("kendoComboBox").value(OrderDetKy);
            $("#HdrSec6_CmbOrderNO_Cd").data("kendoComboBox").value(OrderNoKy);
            $("#HdrSec6_CmbResAdr_Cd").data("kendoComboBox").value(ResAdrKy);
            $("#HdrSec7_CmbAnl1_Cd").data("kendoComboBox").value(Analysys1Ky);
            //$("#HdrSec7_CmbAnl1_Nm").data("kendoComboBox").value(Analysys1Ky);
            $("#HdrSec7_CmbAnl2_Cd").data("kendoComboBox").value(Analysys2Ky);
           // $("#HdrSec7_CmbAnl2_Nm").data("kendoComboBox").value(Analysys2Ky);
            $("#HdrSec8_CmbAnl3_Cd").data("kendoComboBox").value(Analysys3Ky);
            //$("#HdrSec8_CmbAnl3_Nm").data("kendoComboBox").value(Analysys3Ky);
            $("#HdrSec8_CmbAnl4_Cd").data("kendoComboBox").value(Analysys4Ky);
            //$("#HdrSec8_CmbAnl4_Nm").data("kendoComboBox").value(Analysys4Ky);
            $("#HdrSec9_CmbAnl5_Cd").data("kendoComboBox").value(Analysys5Ky);
            //$("#HdrSec8_CmbAnl5_Nm").data("kendoComboBox").value(Analysys5Ky);
            $("#HdrSec9_CmbAnl6_Cd").data("kendoComboBox").value(Analysys6Ky);
            //$("#HdrSec8_CmbAnl6_Nm").data("kendoComboBox").value(Analysys6Ky);

        });

function GridUpdateRow(Lino) {

    var TempAccKy = $("#HdrSec4_CmbAcc_Cd").data("kendoComboBox").value();
    var TempAccCd = $("#HdrSec4_CmbAcc_Cd").data("kendoComboBox").text();
    //var TempAccNm = $("#HdrSec4_CmbAcc_Nm").data("kendoComboBox").text();
    var TempPrjKy = $("#HdrSec4_CmbPrj_Cd").data("kendoComboBox").value();
    if (!TempPrjKy) {
        TempPrjKy = 1;
    }
    var TempPrjCd = $("#HdrSec4_CmbPrj_Cd").data("kendoComboBox").text();
    //var TempPrjNm = $("#HdrSec4_CmbPrj_Nm").data("kendoComboBox").text();
    var TempBuKy = $("#HdrSec4_CmbBU_Cd").data("kendoComboBox").value();
    if (!TempBuKy) {
        TempBuKy = 1;
    }
    var TempHdrSec4_CmbBU_Cd = $("#HdrSec4_CmbBU_Cd").data("kendoComboBox").text();
    //var TempBuNm = $("#HdrSec4_CmbBU_Nm").data("kendoComboBox").text();
    var TempTaskKy = $("#HdrSec4_CmbTask_Cd").data("kendoComboBox").value();
    if (!TempTaskKy) {
        TempTaskKy = 1;
    }
    var TempTaskCd = $("#HdrSec4_CmbTask_Cd").data("kendoComboBox").text();
    //var TempTaskNm = $("#HdrSec4_CmbTask_Nm").data("kendoComboBox").text();
    var TempAdrKy = $("#HdrSec5_CmbAdress_Cd").data("kendoComboBox").value();
    if (!TempAdrKy) {
        TempAdrKy = 1;
    }
    //var TempAdrNm = $("#HdrSec5_CmbAdress_Cd").data("kendoComboBox").text();
    //var TempAnl2Ky = $("#Anl2Nm").data("kendoComboBox").value();
    //if (!TempAnl2Ky) {
    //    TempAnl2Ky = 1;
    //}
    //var TempAnlNm = $("#Anl2Nm").data("kendoComboBox").text();
    var TempCurKy = $("#HdrSec6_CmbAccCur_Cd").data("kendoComboBox").value();
    if (!TempCurKy) {
        TempCurKy = 1;
    }
    var TempCurCd = $("#HdrSec6_CmbAccCur_Cd").data("kendoComboBox").text();
    var TempDiscrption = $("#HdrSec10_TxtArea_Des_Val").val();
    var HdrSec6_InptAccEx_Cd = document.getElementById("HdrSec6_InptAccEx_Cd").value;
    //var HdrSec6_InptAccEx_Cd = $("#HdrSec6_InptAccEx_Cd").value();//0;//HdrSec5_NmricDrAmt_Val

    //var TempDiscrption = $("#HdrSec10_TxtArea_Des_Val").value();// 1;//HdrSec5_NmricCrAmt_Val

    var CrAmount = $("#HdrSec5_NmricCrAmt_Val").data("kendoNumericTextBox").value(); // 1;//HdrSec5_NmricCrAmt_Val
    var DrAmount = $("#HdrSec5_NmricDrAmt_Val").data("kendoNumericTextBox").value(); //0;//HdrSec5_NmricDrAmt_Val
    var Tempdate = document.getElementById("HdrSec6_MADate_Cd").value;

    //New Items
    //New Item

    var TempLC = $("#HdrSec5_CmbLC_Cd").data("kendoComboBox").text();
    var TempLCKy = $("#HdrSec5_CmbLC_Cd").data("kendoComboBox").value();
    if (!TempLCKy) {
        TempLCKy = 1;
    }

    var TempLoan = $("#HdrSec5_CmbLoan_Cd").data("kendoComboBox").text();
    var TempLoanKy = $("#HdrSec5_CmbLoan_Cd").data("kendoComboBox").value();
    if (!TempLoanKy) {
        TempLoanKy = 1;
    }

    var TempOrderDet = $("#HdrSec5_CmbOrderDet_Cd").data("kendoComboBox").text();
    var TempOrderDetKy = $("#HdrSec5_CmbOrderDet_Cd").data("kendoComboBox").value();
    if (!TempOrderDetKy) {
        TempOrderDetKy = 1;
    }

    var TempOrderNO = $("#HdrSec6_CmbOrderNO_Cd").data("kendoComboBox").text();
    var TempOrderNOKy = $("#HdrSec6_CmbOrderNO_Cd").data("kendoComboBox").value();
    if (!TempOrderNOKy) {
        TempOrderNOKy = 1;
    }

    var TempResAdr = $("#HdrSec6_CmbResAdr_Cd").data("kendoComboBox").text();
    var TempResAdrKy = $("#HdrSec6_CmbResAdr_Cd").data("kendoComboBox").value();
    if (!TempResAdrKy) {
        TempResAdrKy = 1;
    }

    //Anl1
    var TempAnl1Ky = $("#HdrSec7_CmbAnl1_Cd").data("kendoComboBox").value();
    if (!TempAnl1Ky) {
        TempAnl1Ky = 1;
    }
    var TempAnl1Cd = $("#HdrSec7_CmbAnl1_Cd").data("kendoComboBox").text();
    //var TempAnl1Nm = $("#HdrSec7_CmbAnl1_Nm").data("kendoComboBox").text();

    //Anl2
    var TempAnl2Ky = $("#HdrSec7_CmbAnl2_Cd").data("kendoComboBox").value();
    if (!TempAnl2Ky) {
        TempAnl2Ky = 1;
    }
    var TempAnl2Cd = $("#HdrSec7_CmbAnl2_Cd").data("kendoComboBox").text();
    //var TempAnl2Nm = $("#HdrSec7_CmbAnl2_Nm").data("kendoComboBox").text();

    //Anl 3
    var TempAnl3Ky = $("#HdrSec8_CmbAnl3_Cd").data("kendoComboBox").value();
    if (!TempAnl3Ky) {
        TempAnl3Ky = 1;
    }
    var TempAnl3Cd = $("#HdrSec8_CmbAnl3_Cd").data("kendoComboBox").text();
    //var TempAnl3Nm = $("#HdrSec8_CmbAnl3_Nm").data("kendoComboBox").text();

    //Anl 4
    var TempAnl4Ky = $("#HdrSec8_CmbAnl4_Cd").data("kendoComboBox").value();
    if (!TempAnl4Ky) {
        TempAnl4Ky = 1;
    }
    var TempAnl4Cd = $("#HdrSec8_CmbAnl4_Cd").data("kendoComboBox").text();
    //var TempAnl4Nm = $("#HdrSec8_CmbAnl4_Nm").data("kendoComboBox").text();

    //Anl 5
    var TempAnl5Ky = $("#HdrSec9_CmbAnl5_Cd").data("kendoComboBox").value();
    if (!TempAnl5Ky) {
        TempAnl5Ky = 1;
    }
    var TempAnl5Cd = $("#HdrSec9_CmbAnl5_Cd").data("kendoComboBox").text();
    //var TempAnl5Nm = $("#HdrSec9_CmbAnl5_Nm").data("kendoComboBox").text();

    //Anl 
    var TempAnl6Ky = $("#HdrSec9_CmbAnl6_Cd").data("kendoComboBox").value();
    if (!TempAnl6Ky) {
        TempAnl6Ky = 1;
    }
    var TempAnl6Cd = $("#HdrSec9_CmbAnl6_Cd").data("kendoComboBox").text();
    //var TempAnl6Nm = $("#HdrSec9_CmbAnl6_Nm").data("kendoComboBox").text();

    var EditingItem = $("#JournalGrid").data().kendoGrid.dataSource.data()[Lino - 1];
    EditingItem.set("AccKy", TempAccKy);
    EditingItem.set("AccCode", TempAccCd);
    //EditingItem.set("AccName", TempAccNm);
    EditingItem.set("AccAdrKy", TempAdrKy);
    //EditingItem.set("AccAdrName", TempAdrNm);
    EditingItem.set("Description", TempDiscrption);
    EditingItem.set("DrAmtGrd", DrAmount);
    EditingItem.set("CrAmtGrd", CrAmount);
    EditingItem.set("BuKy", TempBuKy);
    EditingItem.set("BU", TempHdrSec4_CmbBU_Cd);
    EditingItem.set("ProjectKy", TempPrjKy);
    EditingItem.set("Project", TempPrjCd);
    //EditingItem.set("HdrSec4_CmbPrj_Nm", TempPrjNm);
    EditingItem.set("AccCurKy", TempCurKy);
    EditingItem.set("AccCur", TempCurCd);
    EditingItem.set("ExRate", HdrSec6_InptAccEx_Cd);
    EditingItem.set("TaskKy", TempTaskKy);
    EditingItem.set("TaskId", TempTaskCd);
    //EditingItem.set("TaskNm", TempTaskNm);
    EditingItem.set("Analysys2Ky", TempAnl2Ky);
    //EditingItem.set("Analysys2", TempAnl2Nm);
    EditingItem.set("HdrSec6_MADate_Cd", Tempdate);
    EditingItem.set("Dirty", "Dirty");
    EditingItem.set("LCKy", TempLCKy);
    EditingItem.set("LC", TempLC);
    EditingItem.set("LoanKy", TempLoanKy);
    EditingItem.set("Loan", TempLoan);
    EditingItem.set("OrderDetKy", TempOrderDetKy);
    EditingItem.set("OrderDet", TempOrderDet);
    EditingItem.set("OrderNoKy", TempOrderNOKy);
    EditingItem.set("OrderNo", TempOrderNO);
    EditingItem.set("ResAdrKy", TempResAdrKy);
    EditingItem.set("ResAdr", TempResAdr);
    EditingItem.set("Analysys1Ky", TempAnl1Ky);
    EditingItem.set("Analysys1", TempAnl1Cd);
    //EditingItem.set("Analysys1Nm", TempAnl1Nm);
    EditingItem.set("Analysys2Ky", TempAnl2Ky);
    EditingItem.set("Analysys2", TempAnl2Cd);
    //EditingItem.set("Analysys2Nm", TempAnl2Nm);
    EditingItem.set("Analysys3Ky", TempAnl3Ky);
    EditingItem.set("Analysys3", TempAnl3Cd);
    //EditingItem.set("Analysys3Nm", TempAnl3Nm);
    EditingItem.set("Analysys4Ky", TempAnl4Ky);
    EditingItem.set("Analysys4", TempAnl4Cd);
    //EditingItem.set("Analysys4Nm", TempAnl4Nm);
    EditingItem.set("Analysys5Ky", TempAnl5Ky);
    EditingItem.set("Analysys5", TempAnl5Cd);
    //EditingItem.set("Analysys5Nm", TempAnl5Nm);
    EditingItem.set("Analysys6Ky", TempAnl6Ky);
    EditingItem.set("Analysys6", TempAnl6Cd);
    //EditingItem.set("Analysys6Nm", TempAnl6Nm);

}


$("#JournalGrid").on("click", ".k-grid-evenselect", function () {
    var grid = $("#JournalGrid").data("kendoGrid");
    var selectedItem = grid.dataItem($(this).closest("tr"));
    if (!selectedItem) {
        alert("Please select a grid Row");
        return;
    }
    selectedItem.set("IsAct", 0);
    var answer = grid.tbody.find(grid.select()).hide();
    $('#JournalGrid').data('kendoGrid').refresh();
    CalDrTot();
    CalCrTot();
    calDifference();
});


function DeleteRowByKey() {

    var grid = $("#JournalGrid").data("kendoGrid");
    var selectedItem = grid.dataItem(grid.select());
    if (!selectedItem) {
        alert("Please select a grid Row");
        return;
    }
    selectedItem.set("IsAct", 0);
    var answer = grid.tbody.find(grid.select()).hide();
    $('#JournalGrid').data('kendoGrid').refresh();
    CalDrTot();
    CalCrTot();
    calDifference();

}

