function GridDefaultColumns() {
    var columnsDefine = [
        {
            field: "TrnKy",
            title: "TrnKy",
            hidden: "true"
        },
        {
            field: "AccTrnKy",
            title: "Acc TrnKy",
            width: "40px",
            hidden: "true"
        },
        {
            field: "TrnDt",
            title: "TrnDt",
            width: "100px",


        },
         {
             field: "AccCd",
             title: "Account Code",
             width: "120px"
         },
         {
             field: "AccNm",
             title: "AccNm",
             width: "120px"

         },
          {
              field: "DocNo",
              title: "DocNo",
              width: "100px"
          },
           {
               field: "YurRef",
               title: "YurRef",
               width: "100px"

           },
        {
            field: "AccAmt",
            title: "AccAmt",
            format: "{0:N2}",
            attributes: { style: "text-align:right;" },
            width: "120px"
        },
        {
            field: "SetOffAccAmt",
            title: "Set Off AccAmt",
            format: "{0:N2}",
            attributes: { style: "text-align:right;" },
            width: "120px"

        },
        {
            field: "ThisSetOffAmt",
            title: "This Set Off Amt",
            format: "{0:N2}",
            attributes: { style: "text-align:right;" },
            width: "120px"
        },
       {
           field:"select",
           template: '<input type="checkbox" #= select ? \'checked="checked"\' : "" # class="select" />', title: "select", width: "70px",
           attributes: { style: "text-align:Center;" }
       },
       {
           field: "iscross",
           template: '<input type="checkbox" #= iscross ? \'checked="checked"\' : "" # class="chkbx" />', title: "iscross", width: "70px",
           attributes: { style: "text-align:Center;" }
       },
       {
           field: "isAccPayee",
           template: '<input type="checkbox" #= isAccPayee ? \'checked="checked"\' : "" # class="isAccPayee" />', title: "is AccPayee", width: "70px",
           attributes: { style: "text-align:Center;" }
       },
       {
           field: "isCash",
           template: '<input type="checkbox" #= isCash ? \'checked="checked"\' : "" # class="isCash" />', title: "is Cash", width: "70px",
           attributes: { style: "text-align:Center;" }
       },
       {
           field: "NotNegotiable",
           template: '<input type="checkbox" #= NotNegotiable ? \'checked="checked"\' : "" # class="chkbx" />', title: "Not Negotiable", width: "70px",
           attributes: { style: "text-align:Center;" }
       },
         {
             field: "TrnTypCd",
             title: "TrnTypCd",
             width: "60px"
         },
        {
            field: "TrnTypNm",
            title: "TrnTypNm",
            width: "100px"
        },
        {
            field: "TrnNo",
            title: "Trn No",
            width: "100px"
        },
         {
             field: "Des",
             title: "Des",
             width: "70px"
         },
        {
            field: "AdrID",
            title: "AdrID",
            width: "70px"

        },
        {
            field: "AdrNm",
            title: "AdrNm",
            width: "70px"

        },
        {
            field: "YurRefDt",
            title: "YurRef Date",
            width: "100px"
        },
          {
              field: "BUCd",
              title: "BUCd",
              width: "70px"
          },
        {
            field: "PrjID",
            title: "PrjID",
            width: "70px"

        },
        {
            field: "TrnPreFixCd",
            title: "TrnPreFixCd",
            width: "70px"

        },
        {
            field: "TrnPreFixNm",
            title: "TrnPreFixNm",
            width: "40px"
        },
        {
            field: "PayModeKy",
            title: "PaymentMode",
            width: "40px",
            hidden: true
        },
          {
              field: "IsAct",
              title: "IsAct",
              defaultValue:1,
              width: "120px"
          },


    ];

    var gridNo = 1;
    var columnsFinal = setColumnProp(columnsDefine, viewBag.ObjKy, "", "FormGrd", gridNo);
}
////Load Gid Details
function LoadGridWithColumnProp(columnsFinal, gridNo) {
    //var RadioSelected = $("input[name=ShowDetiils]:checked").val();
    //if (RadioSelected == "Show_Selected") {
    //    var Tempdate = document.getElementById("HdrSec1_DatShowFrom_Val").value;
    //    var Temp = Tempdate.split('/');
    //    var DateRange = Temp[2] + '/' + Temp[1] + '/' + Temp[0];
    //}
    //var AccKy = $("#HdrSec1_CmbAcc_Cd").data("kendoComboBox").value();
    //if (!AccKy) {
    //    AccKy = 1;
    //}
    //var BUKy = $("#HdrSec1_CmbBU_Cd").data("kendoComboBox").value();
    //if (!BUKy) {
    //    BUKy = 1;
    //}
    //var PrjKy = $("#HdrSec1_CmbPrj_Cd").data("kendoComboBox").value();
    //if (!PrjKy) {
    //    PrjKy = 1;
    //}

    var dataSource = new kendo.data.DataSource({
        //transport: {
        //    read: {
        //        data: {
        //            AccKy: AccKy,
        //            Date: DateRange,
        //            ObjKy: viewBag.ObjKy,
        //            BUKy: BUKy,
        //            PrjKy: PrjKy
        //        },
        //        url: urlLoadPaymentRequestGrid,
        //        dataType: "json"
        //    }
        //},
        batch: true,
        pageSize: 10,
        schema: {
            model: {
                id: "AccTrnKy",
                fields: 
                {
                    TrnKy: { editable: false, nullable: false, type: "number" },
                    AccTrnKy: { editable: false, nullable: false, type: "number" },
                    TrnDt: { editable: true, nullable: false, type: "string" },
                    AccKy: { editable: true, nullable: false, type: "number" },
                    AccAmt: { editable: true, nullable: false, type: "number" },
                    SetOffAccAmt: { editable: true, nullable: false, type: "number" },
                    ThisSetOffAmt: { editable: true, nullable: false, type: "number" },
                    DocNo: { editable: true, nullable: false, type: "string" },
                    YurRef: { editable: true, nullable: false, type: "string" },
                    YurRefDt: { editable: true, nullable: false, type: "string" },
                    AccCd: { editable: true, nullable: false, type: "string" },
                    IsAct: { editable: true, nullable: false, type: "number", defaultValue:1},
                    AccNm: { editable: true, nullable: false, type: "string" },
                    AccTypKy: { editable: true, nullable: false, type: "number" },
                    TrnPreFixCd: { editable: true, nullable: false, type: "string" },
                    TrnPreFixNm: { editable: true, nullable: false, type: "string" },
                    TrnTypCd: { editable: true, nullable: false, type: "string" },
                    TrnTypNm: { editable: true, nullable: false, type: "string" },
                    TrnNo: { editable: true, nullable: false, type: "string" },
                    Des: { editable: true, nullable: false, type: "string" },
                    AdrKy: { editable: true, nullable: false, type: "number" },
                    AdrID: { editable: true, nullable: false, type: "string" },
                    AdrNm: { editable: true, nullable: false, type: "string" },
                    BUKy: { editable: true, nullable: false, type: "number" },
                    BUCd: { editable: true, nullable: false, type: "string" },
                    PrjKy: { editable: true, nullable: false, type: "number" },
                    PrjID: { editable: true, nullable: false, type: "string" },
                    PayModeKy: { editable: true, nullable: false, type: "string" },
                    iscross: { editable: true, nullable: false, type: "boolean" },
                    isAccPayee: { editable: true, nullable: false, type: "boolean" },
                    isCash: { editable: true, nullable: false, type: "boolean" },
                    select: { editable: true, nullable: false, type: "boolean" },
                    NotNegotiable: { editable: true, nullable: false, type: "boolean" },
                }
            }
        }

    });
        $("#Maingrid")
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
            //dataBound: onDataBound,
            pageable: { refresh: true, pageSizes: [5, 10, 20, 50, 100] },
            columns: columnsFinal,

        });
        $("#Maingrid .k-grid-content").on("change", "input.select", function (e) {
            var Crgrid = $("#Maingrid").data("kendoGrid");
            dataItem = Crgrid.dataItem($(e.target).closest("tr"));
            void 0 != dataItem.AccAmt &&  (Amount = dataItem.AccAmt);
            if (this.checked) {
                var Account = $("#HdrSec2_InpOpnBalText_Val").val();
                var Current = $("#HdrSec2_InpCurTotTxt_Val").val();
                var AccountBalance;
                var CurrentTotal;
                if (!Account) {
                    AccountBalance = 0;
                    alert("Please Enter The Opening Balance");
                    dataItem.set("select", false);
                    return -1;
                }
                else {
                    AccountBalance = parseInt(Account);
                    if (Current === "") {
                        Current = 0;
                    }
                    CurrentTotal = parseInt(Current);
                    CurrentTotal = parseInt(Amount) + CurrentTotal;
                    if (AccountBalance >= CurrentTotal){
                        CalClosingBalance(AccountBalance, CurrentTotal);
                        dataItem.set("ThisSetOffAmt", Amount);
                        dataItem.set("select", this.checked);
                    }
                    else {
                        alert("Closing Balance greater than  Account Balance");
                        dataItem.set("select", false);
                        dataItem.set("ThisSetOffAmt", 0);
                        return;
                    }

                }

            }
            else {
                RevisedCalculation(Amount);
                dataItem.set("ThisSetOffAmt", 0);
                dataItem.set("select", false);
            }

        });
        $("#Maingrid .k-grid-content").on("change", "input.isCash", function (e) {
            var Crgrid = $("#Maingrid").data("kendoGrid");
            dataItem = Crgrid.dataItem($(e.target).closest("tr"));
            if (this.checked) {
                console.log("hit");
                dataItem.set("isCash", this.checked);
                dataItem.set("isAccPayee", false);
                dataItem.set("NotNegotiable", false);
            }
            else {
                dataItem.set("isCash", false);
            }

        });
        $("#Maingrid .k-grid-content").on("change", "input.isAccPayee", function (e) {
            var Crgrid = $("#Maingrid").data("kendoGrid");
            dataItem = Crgrid.dataItem($(e.target).closest("tr"));
            if (this.checked) {
                dataItem.set("isAccPayee", this.checked);
                dataItem.set("isCash", false);
            }
            else {
                dataItem.set("isAccPayee", false);
            }

        });
        $("#Bottompart").show();
        $('#Maingrid').data('kendoGrid').refresh();

}

 function CalClosingBalance(AccountBalance, CurrentTotal) {
     var balanceAmunt = (AccountBalance - CurrentTotal);
     $("#HdrSec2_InpCurTotTxt_Val").data("kendoNumericTextBox").value(CurrentTotal);
     $("#HdrSec2_InpClosBalTot_Val").data("kendoNumericTextBox").value(balanceAmunt);
 }

 function RevisedCalculation(Amount) {

     var Current = $("#HdrSec2_InpCurTotTxt_Val").val();
     var Closing = $("#HdrSec2_InpClosBalTot_Val").val();
     var CurrentTotal = parseInt(Current);
     var ClosingBlance = parseInt(Closing);
     var balanceAmunt = CurrentTotal - Amount;
     var RevisedClosingBalance = ClosingBlance + Amount;
     $("#HdrSec2_InpCurTotTxt_Val").data("kendoNumericTextBox").value(balanceAmunt);
     $("#HdrSec2_InpClosBalTot_Val").data("kendoNumericTextBox").value(RevisedClosingBalance)
 }  
 


 