function GridDefaultColumns() {
    var columnsDefine = [
        {
            field: "Lino",
            title: "Lino",
            width: "50px"
        },
        {
            field: "AccountKy",
            title: "AccountKy",
            width: "100px",
            hidden: "true"
        },
        {
            field: "AccCd",
            title: "Account Code",
            width: "100px"
        },
        {
            field: "AccNm",
            title: "Account Name",
            width: "100px"
        },
        {
            field: "AdrKy",
            title: "AdrKy",
            width: "100px",
            hidden: "true"
        },
        {
            field: "AdrCd",
            title: "Address Code",
            width: "100px"
        },
        {
            field: "AdrNm",
            title: "Address Name",
            width: "100px"
        },
        {
            field: "Amount",
            title: "Amount",
            width: "100px"
        },
        {
            field: "Discrption",
            title: "Discrption",
            width: "100px"
        }
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
                    Lino: { editable: true, nullable: false, type: "number" },
                    AccountKy: { editable: true, nullable: false, type: "string" },
                    AccCd: { editable: true, nullable: false, type: "string" },
                    AccNm: { editable: true, nullable: false, type: "string" },
                    AdrKy: { editable: true, nullable: false, type: "string" },
                    AdrCd: { editable: true, nullable: false, type: "string" },
                    AdrNm: { editable: true, nullable: false, type: "string" },
                    Discrption: { editable: true, nullable: false, type: "string" },
                    Amount: { editable: true, nullable: false, type: "number" }
                }
            }
        }
    });
    $("#FormGrd")
        .kendoGrid({
            dataSource: dataSource,
            sortable: true,
            autobind: true,
            navigatable: true,
            reorderable: true,
            scrollable: true,
            pageSize: 10,
            pageable: true,
            selectable: "row",
            resizable: true,
            pageable: { refresh: true, pageSizes: [5, 10, 20, 50, 100] },
            columns: columnsFinal
        });
}

function setValuesToGrid() {
    //  var PrjKy = $("#HdrSec1_CmbPrj_Cd").data("kendoComboBox").value();
    //  var BujKy = $("#HdrSec1_CmbBU_Cd").data("kendoComboBox").value();
    var Accky = $("#HdrSec2_CmbAcc_Cd").data("kendoComboBox").value();
    var AccCd = $("#HdrSec2_CmbAcc_Cd").data("kendoComboBox").text();
    var AccNm = $("#HdrSec2_CmbAcc_Nm").data("kendoComboBox").text();
    var Adrky = $("#HdrSec2_CmbAdr_Cd").data("kendoComboBox").value();
    var AdrCd = $("#HdrSec2_CmbAdr_Cd").data("kendoComboBox").text();
    var AdrNm = $("#HdrSec2_CmbAdr_Nm").data("kendoComboBox").text();
    var Amount = $("#HdrSec2_NmricAmt_Val").data("kendoNumericTextBox").value();
    var Discrption = $("#HdrSec2_TxtArea_Des_Val").val();
    var grid = $("#FormGrd").data("kendoGrid");
    var Lino = document.getElementById("TempLiNumber").value;
    var total = 0;
    if (Lino == "") {
        total = $("#FormGrd").data("kendoGrid").dataSource.total();
        grid.dataSource.insert(
            total,
            {
                Lino: total + 1,
                AccountKy: Accky,
                AccCd: AccCd,
                AccNm: AccNm,
                AdrKy: Adrky,
                AdrCd: AdrCd,
                AdrNm: AdrNm,
                Amount: Amount,
                Discrption: Discrption
            }
        );

    } else {
        UpdateSelectedRow(Lino);

    }

}

$("#FormGrd").on("dblclick", "tr.k-state-selected", function () {
            var grid = $("#FormGrd").data().kendoGrid;
            var selectedItem = grid.dataItem(grid.select());
            var Lino = selectedItem.Lino;
            var AccountKy = selectedItem.AccountKy;
            var Adrky = selectedItem.AdrKy;
            var Amount = selectedItem.Amount;
            var Discrption = selectedItem.Discrption;

            
            document.getElementById("TempLiNumber").value = Lino;
            $("#HdrSec2_CmbAcc_Cd").data("kendoComboBox").value(AccountKy);
            $("#HdrSec2_CmbAcc_Nm").data("kendoComboBox").value(AccountKy);
            $("#HdrSec2_CmbAdr_Cd").data("kendoComboBox").value(Adrky);
            $("#HdrSec2_CmbAdr_Nm").data("kendoComboBox").value(Adrky);
            $("#HdrSec2_NmricAmt_Val").data("kendoNumericTextBox").value(Amount);
            $('#HdrSec2_TxtArea_Des_Val').val(Discrption);
        });

function UpdateSelectedRow(Lino) {

    var Accky = $("#HdrSec2_CmbAcc_Cd").data("kendoComboBox").value();
    var AccCd = $("#HdrSec2_CmbAcc_Cd").data("kendoComboBox").text();
    var AccNm = $("#HdrSec2_CmbAcc_Nm").data("kendoComboBox").text();
    var Adrky = $("#HdrSec2_CmbAdr_Cd").data("kendoComboBox").value();
    var AdrCd = $("#HdrSec2_CmbAdr_Cd").data("kendoComboBox").text();
    var AdrNm = $("#HdrSec2_CmbAdr_Nm").data("kendoComboBox").text();
    var Amount = $("#HdrSec2_NmricAmt_Val").data("kendoNumericTextBox").value();
    var Discrption = $("#HdrSec2_TxtArea_Des_Val").val();

    var RowUpdate = $("#FormGrd").data().kendoGrid.dataSource.data()[Lino - 1];
    RowUpdate.set("Lino", Lino);
    RowUpdate.set("AccountKy", Accky);
    RowUpdate.set("AccCd", AccCd);
    RowUpdate.set("AccNm", AccNm);
    RowUpdate.set("AdrKy", Adrky);
    RowUpdate.set("AdrCd", AdrCd);
    RowUpdate.set("AdrNm", AdrNm);
    RowUpdate.set("Amount", Amount);
    RowUpdate.set("Discrption", Discrption);
}
