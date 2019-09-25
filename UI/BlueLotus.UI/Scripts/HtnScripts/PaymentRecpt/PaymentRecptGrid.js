//Donot remove the Ammount Column We develop First with Amount Column And the the Calculation done 
//by a funtion Then After Interfacce Modified and asked to add Credit and debit Column to interface
//Credit and debit balance is calculated based on Amount Columns so donot delete it
//2016.07.06
function setHdrSectionPropFun() {

    // ---------- Set ObjProperties
    setHdrSectionProp('', ObjKy, '', 'HdrSec1');
    setHdrSectionProp('', ObjKy, '', 'HdrSec2');
    setHdrSectionProp('', ObjKy, '', 'HdrSec3');
    setHdrSectionProp('', ObjKy, '', 'HdrSec4');
    setHdrSectionProp('', ObjKy, '', 'HdrSec5');
    setHdrSectionProp('', ObjKy, '', 'HdrSec6');
    setHdrSectionProp('', ObjKy, '', 'HdrSec7');
    setHdrSectionProp('', ObjKy, '', 'HdrSec8');
    setHdrSectionProp('', ObjKy, '', 'HdrSec9');
    setHdrSectionProp('', ObjKy, '', 'HdrSec10');
    setHdrSectionProp('', ObjKy, '', 'HdrSec11');
    setHdrSectionProp('', ObjKy, '', 'HdrSec12');
    setHdrSectionProp('', ObjKy, '', 'HdrSec13');
    setHdrSectionProp('', ObjKy, '', 'HdrSec14');
    setHdrSectionProp('', ObjKy, '', 'HdrSec15');
    setHdrSectionProp('', ObjKy, '', 'HdrSec16');

    SetHandlingEnterKeyEvent('', ObjKy);
    SetFirstFocusObj();
    // $("#HdrSec1_InptDocNo_Val").focus();
}


function GridDefaultColumns() {
    var columnsDefine = [
        {
            field: "AccTrnKy",
            title: "AccTrnKy",
            width: "100px",
            hidden: "true",
            editor: function (container, options) {
                var model = options.model;
            }

        },
        {
            field: "LiNo",
            title: "LiNo",
            width: "40px",
            //locked: true,
            //lockable: false,
            attributes: { class: "ob-Center" },
            editor: function (container, options) {
                var model = options.model;
            }
        },
        {
            field: "AccKy",
            title: "AccKy",
            width: "100px",
            hidden: "true",
            editor: function (container, options) {
                var model = options.model;
            }

        },
        {
            field: "AccCd",
            title: "Accounts Code",
            width: "100px",
            editor: function (container, options) {
                var model = options.model;
            }
            //locked: true,
            //lockable: false
        },
        //{
        //    field: "AccNm",
        //    title: "Account Name",
        //    width: "150px",
        //    editor: function (container, options) {
        //        var model = options.model;
        //    }
        //    //locked: true,
        //    //lockable: false
        //},
        {
            field: "AdrKy",
            title: "AccAdrKy",
            width: "100px",
            hidden: "true",
            editor: function (container, options) {
                var model = options.model;
            }

        },
        {
            field: "AdrCd",
            title: "Account Address Code",
            width: "120px",
            editor: function (container, options) {
                var model = options.model;
            }
        },
        //{
        //    field: "AdrNm",
        //    title: "Account Address Name",
        //    width: "120px",
        //    editor: function (container, options) {
        //        var model = options.model;
        //    }
        //},
         {
             field: "PayeeName",
             title: "Payee Name",
             width: "120px",
             editor: function (container, options) {
                 var model = options.model;
             }
         },
        {
            field: "PayModeKy",
            title: "PayModeKy",
            width: "150px",
            hidden: "true",
            editor: function (container, options) {
                var model = options.model;
            }
        },
        {
            field: "PayModeCd",
            title: "PayModeCd",
            width: "70px",
            editor: function (container, options) {
                var model = options.model;
            }
        },
        {
            field: "ChqNo",
            title: "ChqNo",
            width: "70px",
            editor: function (container, options) {
                var model = options.model;
            }
        },
        {
            field: "ChqDate",
            title: "ChqDate",
            width: "70px",
            editor: function (container, options) {
                var model = options.model;
            }

        },
        {
            field: "IsCash",
            title: "IsCash",
            width: "100px",
            editor: function (container, options) {
                var model = options.model;
            }
        },
         {
             field: "IsNegotiable",
             title: "is Non Negotiable",
             width: "100px",
             editor: function (container, options) {
                 var model = options.model;
             }
         },
        {
            field: "isCross",
            title: "isCross",
            width: "100px",
            editor: function (container, options) {
                var model = options.model;
            }
        },
        {
            field: "Amount",
            title: "Amount",
            width: "70px",
            hidden: "true",
            format: "{0:N2}",
            editor: function (container, options) {
                var model = options.model;
            }
        },
        {
            field: "DRAMT",
            title: "DRAMT",
            width: "70px",
            format: "{0:N2}",
            editor: function (container, options) {
                var model = options.model;
            }
        },
        {
            field: "CRAMT",
            title: "CRAMT",
            width: "70px",
            format: "{0:N2}",
            editor: function (container, options) {
                var model = options.model;
            }
        },
        {
            field: "BanckKy",
            title: "BanckKy",
            width: "100px",
            hidden: "true",
            editor: function (container, options) {
                var model = options.model;
            }
        },
        {
            field: "BanckCd",
            title: "Banck Code",
            width: "100px",
            editor: function (container, options) {
                var model = options.model;
            }
        },
        {
            field: "BranchKy",
            title: "BranchKy",
            width: "100px",
            hidden: "true",
            editor: function (container, options) {
                var model = options.model;
            }
        },
        {
            field: "BranchCD",
            title: "Branch Code",
            width: "120px",
            editor: function (container, options) {
                var model = options.model;
            }
        },
        {
            field: "CurencyKy",
            title: "CurencyKy",
            width: "100px",
            hidden: "true",
            editor: function (container, options) {
                var model = options.model;
            }
        },
        {
            field: "CurencyCd",
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
            width: "100px",
            attributes: { class: "ob-Center" },
            editor: function (container, options) {
                var model = options.model;
            }
        },
        {
            field: "Des",
            title: "Des",
            width: "100px",
            attributes: { class: "ob-Center" }
        },
        {
            field: "TaskKy",
            title: "TaskKy",
            width: "100px",
            hidden: "true",
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
            field: "Analysys1Ky",
            title: "Analysys1Ky",
            width: "100px",
            hidden: "true",
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
            width: "100px",
            hidden: "true",
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
            width: "100px",
            hidden: "true",
            editor: function (container, options) {
                var model = options.model;
            }
        },
        {
            field: "Analysys3",
            title: "Analysys3",
            width: "70px",
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
            width: "100px",
            hidden: "true",
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
            width: "100px",
            hidden: "true",
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
        //    width: "70px"
        //},
        {
            field: "Analysys6Ky",
            title: "Analysys6Ky",
            width: "100px",
            hidden: "true",
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
            field: "IsAccPay",
            title: "IsAccPay",
            width: "100px",
            editor: function (container, options) {
                var model = options.model;
            }
        },
        {
            field: "PrjKy",
            title: "PrjKy",
            width: "70px",
            hidden: "true",
            editor: function (container, options) {
                var model = options.model;
            }
        },
        {
            field: "PrjCd",
            title: "PrjCd",
            width: "70px",
            editor: function (container, options) {
                var model = options.model;
            }
        },
        //{
        //    field: "PrjNm",
        //    title: "PrjNm",
        //    width: "70px",
        //    editor: function (container, options) {
        //        var model = options.model;
        //    }
        //},
        {
            field: "BuKy",
            title: "BuKy",
            width: "70px",
            hidden: "true",
            editor: function (container, options) {
                var model = options.model;
            }
        },
        {
            field: "BuCd",
            title: "BuCd",
            width: "70px",
            editor: function (container, options) {
                var model = options.model;
            }
        },
        //{
        //    field: "BuNm",
        //    title: "BuNm",
        //    width: "70px",
        //    editor: function (container, options) {
        //        var model = options.model;
        //    }
        //},
        {
            field: "OrgPmtDetky",
            title: "OrgPmtDetky",
            width: "70px",
            hidden: "true",
            editor: function (container, options) {
                var model = options.model;
            }
        },
        {
            field: "LCKy",
            title: "LCKy",
            width: "100px",
            hidden: "true",
            editor: function (container, options) {
                var model = options.model;
            }
        },
        {
            field: "LCNo",
            title: "LC No",
            width: "120px",
            editor: function (container, options) {
                var model = options.model;
            }
        },
        {
            field: "LoanKy",
            title: "LoanKy",
            width: "100px",
            hidden: "true",
            editor: function (container, options) {
                var model = options.model;
            }
        },
        {
            field: "LoanNo",
            title: "Loan No",
            width: "120px",
            editor: function (container, options) {
                var model = options.model;
            }
        },
        {
            field: "OrderKy",
            title: "OrderKy",
            width: "100px",
            hidden: "true",
            editor: function (container, options) {
                var model = options.model;
            }
        },
        {
            field: "OrderNo",
            title: "Order No",
            width: "120px",
            editor: function (container, options) {
                var model = options.model;
            }
        },
        {
            field: "OrdrDetKy",
            title: "OrdrDetKy",
            width: "100px",
            hidden: "true",
            editor: function (container, options) {
                var model = options.model;
            }
        },
        {
            field: "OrdrDetNo",
            title: "OrdrDet No",
            width: "120px",
            editor: function (container, options) {
                var model = options.model;
            }
        },
        {
            field: "Dt2",
            title: "MA Date",
            width: "120px",
            format: "{0:dd/MM/yyyy}",
            editor: function (container, options) {
                var model = options.model;
            }
        },
         {
             field: "ResAdrKy",
             title: "ResAdrKy",
             width: "100px",
             hidden: "true",
             editor: function (container, options) {
                 var model = options.model;
             }
         },
        {
            field: "ResAdrCode",
            title: "Res Adr Code",
            width: "70px",
            editor: function (container, options) {
                var model = options.model;
            }
        },
        {
            field: "DueDate",
            title: "DueDate",
            width: "70px",
            editor: function (container, options) {
                var model = options.model;
            }
        },
        {
            field: "DetYurRef",
            title: "Detail YurRef",
            width: "70px",
            editor: function (container, options) {
                var model = options.model;
            }
        },
        {
            field: "DetDocNo",
            title: "Detail YurRef",
            width: "70px",
            editor: function (container, options) {
                var model = options.model;
            }
        },
        {
            field: "IsAct",
            title: "IsAct",
            width: "70px",
            editor: function (container, options) {
                var model = options.model;
            }
        }
        ,
        {
            width: "60px",
            template: kendo.template($("#command-template-payment").html())
        }
    ];


    var gridNo = 1;
    //Old ObjMas Function 
    //var columnsFinal = setColumnProp(columnsDefine, ObjKy, '', 'FormGrd', gridNo);

    //New ObjMas Function
    var columnsFinal = setGridColumnProp(columnsDefine, 'FormGrd', gridNo);
}


function LoadGridWithColumnProp(columnsFinal, gridNo) {

    var dataSource = new kendo.data.DataSource({
        batch: true,
        sort: ({ field: "LiNo", dir: "desc" }),
        pageSize: 10,
        schema: {
            model: {
                id: "AccTrnKy",
                fields: //Relavent fields of the grid should be bind with following model items
                {
                    AccTrnKy: { editable: false, nullable: false, type: "number" },
                    LiNo: { editable: true, nullable: false, type: "number" },
                    AccKy: { editable: true, nullable: false, type: "string" },
                    AccCd: { editable: true, nullable: false, type: "string" },
                    //AccNm: { editable: true, nullable: false, type: "string" },
                    AdrKy: { editable: true, nullable: true, type: "string" },
                    AdrCd: { editable: true, nullable: true, type: "string" },
                    //AdrNm: { editable: true, nullable: false, type: "string" },
                    PayModeKy: { editable: true, nullable: false, type: "string" },
                    PayModeCd: { editable: true, nullable: false, type: "string" },
                    ChqNo: { editable: true, nullable: false, type: "string" },
                    ChqDate: { editable: true, nullable: false, type: "string" },
                    IsCash: { editable: true, nullable: false, type: "boolean" },
                    Amount: { editable: true, nullable: false, type: "number" },
                    CRAMT: { editable: true, nullable: false, type: "number" },
                    DRAMT: { editable: true, nullable: false, type: "number" },
                    BanckKy: { editable: true, nullable: false, type: "string" },
                    BanckCd: { editable: true, nullable: false, type: "string" },
                    BranchKy: { editable: true, nullable: false, type: "string" },
                    BranchCD: { editable: true, nullable: false, type: "string" },
                    CurencyKy: { editable: true, nullable: false, type: "string" },
                    CurencyCd: { editable: true, nullable: false, type: "string" },
                    ExRate: { editable: true, nullable: false, type: "string" },
                    Des: { editable: true, nullable: false, type: "string" },
                    TaskKy: { editable: true, nullable: false, type: "string" },
                    TaskId: { editable: true, nullable: false, type: "string" },
                    //TaskNm: { editable: true, nullable: false, type: "string" },
                    Analysys2Ky: { editable: true, nullable: false, type: "string" },
                    Analysys2: { editable: true, nullable: false, type: "string" },
                    //Analysys2Nm: { editable: true, nullable: false, type: "string" },
                    Analysys1Ky: { editable: true, nullable: false, type: "string" },
                    Analysys1: { editable: true, nullable: false, type: "string" },
                    //Analysys1Nm: { editable: true, nullable: false, type: "string" },
                    Analysys3Ky: { editable: true, nullable: false, type: "string" },
                    Analysys3: { editable: true, nullable: false, type: "string" },
                    //Analysys3Nm: { editable: true, nullable: false, type: "string" },
                    Analysys4Ky: { editable: true, nullable: false, type: "string" },
                    Analysys4: { editable: true, nullable: false, type: "string" },
                    //Analysys4Nm: { editable: true, nullable: false, type: "string" },
                    Analysys5Ky: { editable: true, nullable: false, type: "string" },
                    Analysys5: { editable: true, nullable: false, type: "string" },
                    //Analysys5Nm: { editable: true, nullable: false, type: "string" },
                    Analysys6Ky: { editable: true, nullable: false, type: "string" },
                    Analysys6: { editable: true, nullable: false, type: "string" },
                    //Analysys6Nm: { editable: true, nullable: false, type: "string" },
                    IsAccPay: { editable: true, nullable: false, type: "boolean" },
                    PrjKy: { editable: true, nullable: false, type: "string" },
                    PrjCd: { editable: true, nullable: false, type: "string" },
                    //PrjNm: { editable: true, nullable: false, type: "string" },
                    BuKy: { editable: true, nullable: false, type: "string" },
                    BuCd: { editable: true, nullable: false, type: "string" },
                    //BuNm: { editable: true, nullable: false, type: "string" },
                    Dt2: { editable: true, nullable: true, type: "string", format: "{0:dd/MM/yyyy}" },
                    LCKy: { editable: true, nullable: false, type: "number" },
                    LCNo: { editable: true, nullable: false, type: "string" },
                    LoanKy: { editable: true, nullable: false, type: "number" },
                    LoanNo: { editable: true, nullable: false, type: "string" },
                    OrderKy: { editable: true, nullable: false, type: "number" },
                    OrderNo: { editable: true, nullable: false, type: "string" },
                    OrdrDetKy: { editable: true, nullable: false, type: "number" },
                    OrdrDetNo: { editable: true, nullable: false, type: "string" },
                    Dirty: { editable: true, nullable: false, type: "string" },
                    OrgPmtDetky: { editable: true, nullable: false, type: "number" },
                    ResAdrKy: { editable: true, nullable: false, type: "number" },
                    ResAdrCode: { editable: true, nullable: false, type: "string" },
                    DueDate: { editable: true, nullable: false, type: "string" },
                    IsNegotiable: { editable: true, nullable: false, type: "boolean" },
                    DuePayeeNameDate: { editable: true, nullable: false, type: "string" },
                    DetYurRef: { editable: true, nullable: false, type: "string" },
                    DetDocNo: { editable: true, nullable: false, type: "string" },
                    isCross: { editable: true, nullable: false, type: "boolean" },
                    IsAct: { editable: true, nullable: false, type: "number" },
                }
            }
        }
    });

    $("#PmtRcprGrd")
        .kendoGrid({
            dataSource: dataSource,
            sortable: true,
            autobind: true,
            navigatable: true,
            //editable: true,   //commented to fix cell onclick text dissaper issue               
            filterable: {
                mode: "row"
            },
            reorderable: true,
            scrollable: true,
            pageSize: 10,
            pageable: true,
            selectable: "row",
            resizable: true,
            dataBound: onDataBound,
            pageable: { refresh: true, pageSizes: [5, 10, 20, 50, 100] },
            columns: columnsFinal,

        });
}

function onDataBound(e) {
    try {
        var id = ("#PmtRcprGrd");
        var grid1 = $(id).data("kendogrid1");
        var dataSource = grid1.dataSource.data();
        for (var i = 0; i < dataSource.length; i++) {
            if (dataSource[i].IsAct == 0) {
                grid1.tbody.find("tr[data-uid='" + dataSource[i].uid + "']").hide();
            }
        }
            
    } catch (e) {

    } 

}

$("#PmtRcprGrd").on("click", ".k-grid-evenselect", function () {
    //var myVar = grid.dataItem($("#PmtRcprGrd").closest("tr"));
    //$("#PmtRcprGrd").data("kendoGrid").removeRow($(this).closest("tr"));

    var grid = $("#PmtRcprGrd").data("kendoGrid");
    var selectedItem = grid.dataItem($(this).closest("tr"));
    if (selectedItem.LiNo == 1) {
        alert("You Cannot Delete Line Number one")
    } else {
        selectedItem.set("IsAct", 0);
        //var answer = grid.dataItem($(this).closest("tr")).hide(); //grid.tbody.find(grid.select()).hide();
        //grid.tbody.find("tr[data-uid='" + selectedItem.uid + "']").hide();
        $('#PmtRcprGrd').data('kendoGrid').refresh();
       
        SetTotalinFirstRow();
      //  grid.tbody.find("tr[data-uid='" + selectedItem.uid + "']").hide();
        HideIsActAllRec();
    }
});

function HideIsActAllRec() {
    var grid = $("#PmtRcprGrd").data("kendoGrid");
    if (grid == undefined)
        return 0;
    var currentData = grid.dataSource.data();

    for (var i = 1; i < currentData.length; i++) {
        if (currentData[i].IsAct ==0) {
            grid.tbody.find("tr[data-uid='" + currentData[i].uid + "']").hide();
        }
    }



}