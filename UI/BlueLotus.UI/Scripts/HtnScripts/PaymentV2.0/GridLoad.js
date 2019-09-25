function GridDefaultColumns() {
    var columnsDefine = [
        {
            field: "AccTrnKy",
            title: "AccTrnKy",
            width: "100px",
            hidden: "true"

        },
        {
            field: "LiNo",
            title: "LiNo",
            width: "40px",
            locked: false,
            lockable: false,
            attributes: { class: "ob-Center" }
        },
        {
            field: "AccKy",
            title: "AccKy",
            width: "100px",
            hidden: "true"

        },
        {
            field: "AccCd",
            title: "Accounts Code",
            width: "100px",
            locked: false,
            lockable: false
        },
        {
            field: "AccNm",
            title: "Account Name",
            width: "150px",
            locked: false,
            lockable: false
        },
        {
            field: "AdrKy",
            title: "AccAdrKy",
            width: "100px",
            hidden: "true"

        },
        {
            field: "AdrCd",
            title: "Account Address Code",
            width: "120px"
        },
        {
            field: "AdrNm",
            title: "Account Address Name",
            width: "120px"
        },
        {
            field: "PayeeName",
            title: "Payee Name",
            width: "120px"
        },
        {
            field: "PayModeKy",
            title: "PayModeKy",
            width: "150px",
            hidden: "true"
        },
        {
            field: "PayModeCd",
            title: "PayModeCd",
            width: "70px"
        },
        {
            field: "ChqNo",
            title: "ChqNo",
            width: "70px"
        },
        {
            field: "ChqDate",
            title: "ChqDate",
            width: "70px"

        },
        {
            field: "IsCash",
            title: "IsCash",
            width: "100px"
        },
        {
            field: "IsNegotiable",
            title: "is Non Negotiable",
            width: "100px"
        },
        {
            field: "isCross",
            title: "isCross",
            width: "100px"
        },
        {
            field: "Amount",
            title: "Amount",
            width: "70px",
            hidden: "true",
            format: "{0:N2}"

        },
        {
            field: "DRAMT",
            title: "DRAMT",
            width: "70px",
            format: "{0:N2}"

        },
        {
            field: "CRAMT",
            title: "CRAMT",
            width: "70px",
            format: "{0:N2}"

        },
        {
            field: "BanckKy",
            title: "BanckKy",
            width: "100px",
            hidden: "true"

        },
        {
            field: "BanckCd",
            title: "Banck Code",
            width: "100px"
        },
        {
            field: "BranchKy",
            title: "BranchKy",
            width: "100px",
            hidden: "true"

        },
        {
            field: "BranchCD",
            title: "Branch Code",
            width: "120px"
        },
        {
            field: "CurencyKy",
            title: "CurencyKy",
            width: "100px",
            hidden: "true"
        },
        {
            field: "CurencyCd",
            title: "Accounts Currency",
            width: "70px",
            attributes: { class: "ob-Center" }
        },
        {
            field: "ExRate",
            title: "ExRate",
            width: "100px",
            attributes: { class: "ob-Center" }
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
            hidden: "true"

        },
        {
            field: "TaskId",
            title: "Task Id",
            width: "100px"
        },
        {
            field: "TaskNm",
            title: "Task Name",
            width: "100px"
        },
        {
            field: "Analysys1Ky",
            title: "Analysys1Ky",
            width: "100px",
            hidden: "true"

        },
        {
            field: "Analysys1",
            title: "Analysys1",
            width: "70px"
        },
        {
            field: "Analysys1Nm",
            title: "Analysys1Nm",
            width: "70px"
        },
        {
            field: "Analysys2Ky",
            title: "Analysys2Ky",
            width: "100px",
            hidden: "true"

        },
        {
            field: "Analysys2",
            title: "Analysys2",
            width: "70px"
        },
        {
            field: "Analysys2Nm",
            title: "Analysys2Nm",
            width: "70px"
        },
        {
            field: "Analysys3Ky",
            title: "Analysys3Ky",
            width: "100px",
            hidden: "true"

        },
        {
            field: "Analysys3",
            title: "Analysys3",
            width: "70px"
        },
        {
            field: "Analysys3Nm",
            title: "Analysys3Nm",
            width: "70px"
        },
        {
            field: "Analysys4Ky",
            title: "Analysys4Ky",
            width: "100px",
            hidden: "true"
        },
        {
            field: "Analysys4",
            title: "Analysys4",
            width: "70px"
        },
        {
            field: "Analysys4Nm",
            title: "Analysys4Nm",
            width: "70px"
        },
        {
            field: "Analysys5Ky",
            title: "Analysys5Ky",
            width: "100px",
            hidden: "true"

        },
        {
            field: "Analysys5",
            title: "Analysys5",
            width: "70px"
        },
        {
            field: "Analysys5Nm",
            title: "Analysys5Nm",
            width: "70px"
        },
        {
            field: "Analysys6Ky",
            title: "Analysys6Ky",
            width: "100px",
            hidden: "true"

        },
        {
            field: "Analysys6",
            title: "Analysys6",
            width: "70px"
        },
        {
            field: "Analysys6Nm",
            title: "Analysys6Nm",
            width: "70px"
        },
        {
            field: "IsAccPay",
            title: "IsAccPay",
            width: "100px"
        },
        {
            field: "PrjKy",
            title: "PrjKy",
            width: "70px",
            hidden: "true"
        },
        {
            field: "PrjCd",
            title: "PrjCd",
            width: "70px"
        },
        {
            field: "PrjNm",
            title: "PrjNm",
            width: "70px"
        },
        {
            field: "BuKy",
            title: "BuKy",
            width: "70px",
            hidden: "true"
        },
        {
            field: "BuCd",
            title: "BuCd",
            width: "70px"
        },
        {
            field: "BuNm",
            title: "BuNm",
            width: "70px"
        },
        {
            field: "OrgPmtDetky",
            title: "OrgPmtDetky",
            width: "70px",
            hidden: "true"
        },
        {
            field: "LCKy",
            title: "LCKy",
            width: "100px",
            hidden: "true"

        },
        {
            field: "LCNo",
            title: "LC No",
            width: "120px"
        },
        {
            field: "LoanKy",
            title: "LoanKy",
            width: "100px",
            hidden: "true"

        },
        {
            field: "LoanNo",
            title: "Loan No",
            width: "120px"
        },
        {
            field: "OrderKy",
            title: "OrderKy",
            width: "100px",
            hidden: "true"

        },
        {
            field: "OrderNo",
            title: "Order No",
            width: "120px"
        },
        {
            field: "OrdrDetKy",
            title: "OrdrDetKy",
            width: "100px",
            hidden: "true"

        },
        {
            field: "OrdrDetNo",
            title: "OrdrDet No",
            width: "120px"
        },
        {
            field: "Dt2",
            title: "MA Date",
            width: "120px"
        },
        {
            field: "ResAdrKy",
            title: "ResAdrKy",
            width: "100px",
            hidden: "true"
        },
        {
            field: "ResAdrCode",
            title: "Res Adr Code",
            width: "70px"
        },
        {
            field: "DueDate",
            title: "DueDate",
            width: "70px"

        },
        {
            field: "DetYurRef",
            title: "Detail YurRef",
            width: "70px"

        },
         {
             field: "DetDocNo",
             title: "Detail YurRef",
             width: "70px"

         },
        {
            field: "IsAct",
            title: "IsAct",
            width: "70px",
            hidden: "true"
        },
        { command: { text: "X", click: DeleteRow }, title: " ", width: "60px" }
    ];

    var gridNo = 1;
    var columnsFinal = setColumnProp(columnsDefine, viewBag.ObjKy, "", "FormGrd", gridNo);
}

function LoadGridWithColumnProp(columnsFinal, gridNo) {

    var dataSource = new kendo.data.DataSource({
        batch: true,
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
                    AccNm: { editable: true, nullable: false, type: "string" },
                    AdrKy: { editable: true, nullable: true, type: "string" },
                    AdrCd: { editable: true, nullable: true, type: "string" },
                    AdrNm: { editable: true, nullable: false, type: "string" },
                    PayModeKy: { editable: true, nullable: false, type: "string" },
                    PayModeCd: { editable: true, nullable: false, type: "string" },
                    ChqNo: { editable: true, nullable: false, type: "string" },
                    ChqDate: { editable: true, nullable: false, type: "string" },
                    IsCash: { editable: true, nullable: false, type: "boolean" },
                    Amount: { editable: true, nullable: false, type: "number" },
                    CRAMT: { editable: true, nullable: false, type: "number" },
                    DRAMT: { editable: true, nullable: false, type: "number" },
                    BanckKy: { editable: false, nullable: false, type: "string" },
                    BanckCd: { editable: false, nullable: false, type: "string" },
                    BranchKy: { editable: false, nullable: false, type: "string" },
                    BranchCD: { editable: false, nullable: false, type: "string" },
                    CurencyKy: { editable: true, nullable: false, type: "string" },
                    CurencyCd: { editable: true, nullable: false, type: "string" },
                    ExRate: { editable: true, nullable: false, type: "string" },
                    Des: { editable: true, nullable: false, type: "string" },
                    TaskKy: { editable: true, nullable: false, type: "string" },
                    TaskId: { editable: true, nullable: false, type: "string" },
                    TaskNm: { editable: true, nullable: false, type: "string" },
                    Analysys2Ky: { editable: true, nullable: false, type: "string" },
                    Analysys2: { editable: true, nullable: false, type: "string" },
                    Analysys2Nm: { editable: true, nullable: false, type: "string" },
                    Analysys1Ky: { editable: true, nullable: false, type: "string" },
                    Analysys1: { editable: true, nullable: false, type: "string" },
                    Analysys1Nm: { editable: true, nullable: false, type: "string" },
                    Analysys3Ky: { editable: true, nullable: false, type: "string" },
                    Analysys3: { editable: true, nullable: false, type: "string" },
                    Analysys3Nm: { editable: true, nullable: false, type: "string" },
                    Analysys4Ky: { editable: true, nullable: false, type: "string" },
                    Analysys4: { editable: true, nullable: false, type: "string" },
                    Analysys4Nm: { editable: true, nullable: false, type: "string" },
                    Analysys5Ky: { editable: true, nullable: false, type: "string" },
                    Analysys5: { editable: true, nullable: false, type: "string" },
                    Analysys5Nm: { editable: true, nullable: false, type: "string" },
                    Analysys6Ky: { editable: true, nullable: false, type: "string" },
                    Analysys6: { editable: true, nullable: false, type: "string" },
                    Analysys6Nm: { editable: true, nullable: false, type: "string" },
                    IsAccPay: { editable: true, nullable: false, type: "boolean" },
                    PrjKy: { editable: true, nullable: false, type: "string" },
                    PrjCd: { editable: true, nullable: false, type: "string" },
                    PrjNm: { editable: true, nullable: false, type: "string" },
                    BuKy: { editable: true, nullable: false, type: "string" },
                    BuCd: { editable: true, nullable: false, type: "string" },
                    BuNm: { editable: true, nullable: false, type: "string" },
                    Dt2: { editable: true, nullable: true, type: "string" },
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
                    IsNegotiable: { editable: true, nullable: false, type: "boolean" },
                    isCross: { editable: true, nullable: false, type: "boolean" },
                    DetDocNo: { editable: true, nullable: false, type: "string" },
                    PayeeName: { editable: true, nullable: false, type: "string" },
                    DetYurRef: { editable: true, nullable: false, type: "string" },
                    DueDate: { editable: true, nullable: false, type: "string" },
                    IsAct: { editable: true, nullable: false, type: "string" },

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
            reorderable: true,
            scrollable: true,
            filterable: {
                mode: "row"
            },
            pageSize: 10,
            pageable: true,
            selectable: "row",
            resizable: true,
            pageable: { refresh: true, pageSizes: [5, 10, 20, 50, 100] },
            columns: columnsFinal,

        });
}

$("#PmtRcprGrd")
    .on("click",
        ".k-grid-evenselect",
        function() {
            var myVar = grid.dataItem($("#PmtRcprGrd").closest("tr"));
            $("#PmtRcprGrd").data("kendoGrid").removeRow($(this).closest("tr"));
            SetTotalinFirstRow();
        });

function DeleteRow(e) {
    e.preventDefault();
    if ($("#PmtRcprGrd").data("kendoGrid").dataSource._data.length > 2)
    {
        var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
        if (dataItem.LiNo == 1) {
            alert("You Can't Delete The First Recode");
            return;
        }
        else {
            
            dataItem.set("IsAct", 0);
            CalCreditAmountFromDelete();
           // HideIsActAllRec();
        }
       
    }
    else {
        alert("You Can't Delete");
        return;
}
    
    //var grid = $("#PmtRcprGrd").data("kendoGrid");
    //var dataSource = grid.dataSource.data();
    //for (var i = 0; i < dataSource.length; i++) {
    //    if (dataSource[i].isAct == 0) {
    //        grid.tbody.find("[data-uid='" + dataItem[i].uid + "']").hide();
    //    }
    //}
    //var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
    //$("#PmtRcprGrd").data("kendoGrid").removeRow($(this).closest("tr"));
    //    SetTotalinFirstRow();
}
function HideIsActAllRec() {
    var grid = $("#PmtRcprGrd").data("kendoGrid");
    if (grid == undefined)
        return 0;
    var currentData = grid.dataSource.data();

    for (var i = 1; i < currentData.length; i++) {
        if (currentData[i].IsAct == 0) {
            grid.tbody.find("tr[data-uid='" + currentData[i].uid + "']").hide();
        }
    }  
    
}
function CalCreditAmountFromDelete() {
    var CreditAmount = 0;
    var DebitAmount = 0;
    var currentData = $("#PmtRcprGrd").data("kendoGrid").dataSource.data();
    for (var i = 0; i < currentData.length; i++) {
        if (currentData[i].IsAct != 0) {
            CreditAmount = currentData[0].CRAMT;
            DebitAmount += currentData[i].DRAMT;
        }
        
    }
    if(CreditAmount != DebitAmount)
    {
        CreditAmount = DebitAmount;
        var RowUpdate = $("#PmtRcprGrd").data().kendoGrid.dataSource.data()[0];
        RowUpdate.set("CRAMT", parseFloat(CreditAmount).toFixed(2));
        RowUpdate.set("Amount", parseFloat(CreditAmount).toFixed(2));
        HideIsActAllRec();
        
    }
    
}
