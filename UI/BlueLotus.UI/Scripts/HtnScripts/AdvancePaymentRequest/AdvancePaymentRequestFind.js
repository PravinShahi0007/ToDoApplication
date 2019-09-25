$(document).ready(function () {
    //LoadComboFindForm1();
    setdefault();
    var height = $(window).height() - 70;
    var h2 = $("#filterCont").height();
    $("#body").height(height);
    $("#grid").height(height - (35 + h2 + 40));
    $(".k-datepicker, .k-combobox, .k-numerictextbox").css('width', "100%");
});

function setdefault() {
    $('#IsRec').prop('checked', false);
    var todayDate = new Date();
    $('#ToDt').data("kendoDatePicker").value(todayDate);
    $('#FrmDt').data("kendoDatePicker").value("");
    document.getElementById("TrnNo").value == "";
    document.getElementById("DocumentNo").value = "";
}


$("#FrmDt").kendoDatePicker({
    format: "yyyy/MM/dd",
    min: new Date(31, 2, 2009)
});

$("#ToDt").kendoDatePicker({
    format: "yyyy/MM/dd",
    min: new Date(2009, 2, 31)
});



function LoadGridFindView() {
    var dataSource = new kendo.data.DataSource({
        batch: true,
        pageSize: 10,
        schema: {
            model: {
                id: "TrnKy",
                fields: //Relavent fields of the grid should be bind with following model items
                {
                    Lino: { editable: false, nullable: false, type: "number" },
                    TrnKy: { editable: true, nullable: false, type: "number" },
                    Prefix: { editable: true, nullable: false, type: "string" },
                    TrnNo: { editable: true, nullable: false, type: "string" },
                    TrnDt: { editable: true, nullable: false, type: "date" },
                    DocNo: { editable: true, nullable: false, type: "string" },
                    AdrId: { editable: true, nullable: true, type: "string" },
                    AdrNm: { editable: true, nullable: true, type: "string" },
                    PrjId: { editable: true, nullable: false, type: "string" },
                    PrjNm: { editable: true, nullable: false, type: "string" },
                }
            }
        }
    });

    $("#FindFormGrid").kendoGrid({
        dataSource: dataSource,
        autobind: true,
        navigatable: true,
        filterable: true,
        pageable: true,
        sortable: true,
        reorderable: true,
        columnMenu: true,
        selectable: "column",
        pageable: { refresh: true, pageSizes: [5, 10, 20, 50, 100] },
        columns: [
             {
                 field: "Lino", title: "LiNo", width: "50px",
             },

                 {
                     field: "TrnKy", title: "Ref #", width: "100px", hidden: true,
                 },
                  {
                      field: "Prefix", title: "Prefix", width: "50px",

                  },
               {
                   field: "TrnNo",
                   title: "TrnNo",
                   width: "100px",
               },


           {
               field: "TrnDt", title: "TrnDt", width: "100px", format: "{0: MM-dd-yyyy}",
               template: "#= kendo.toString(kendo.parseDate(TrnDt, 'yyyy-MM-dd'), 'MM/dd/yyyy') #",
           },
            {
                field: "DocNo", title: "DocNo", width: "100px",

            },
            {
                field: "AdrId", title: "AdrId", width: "100px",
            },

           {
               field: "AdrNm", title: "AdrNm", width: "100px",
           },
          {
              field: "PrjId", title: "PrjId", width: "100px",
          },
           {
               field: "PrjNm", title: "PrjNm", width: "100px",
           },
        ],

        resizable: true,

        dataBinding: function () {
            record = (this.dataSource.page() - 1) * this.dataSource.pageSize();
        },

        editable: false
    });
}

function Search() {
    var FrmDt = $("#FrmDt").val();
    if (FrmDt == undefined || FrmDt == "" || FrmDt == null) {
        var FrmDt = "1/1/1900";
    }

    var ToDt = $("#ToDt").val();
    if (ToDt == undefined || ToDt == "" || ToDt == null) {
        var ToDt = "1/1/2078";
    }

    var TrnNo = $("#TrnNo").val();

    if (TrnNo == undefined || TrnNo == "" || TrnNo == null) {
        var TrnNo = null;
    }
    var IsRec = ($("#IsRec").is(':checked')) ? 1 : 0;

    var DocNo = $("#DocumentNo").val();
    if (DocNo == undefined || DocNo == "" || DocNo == null) {
        var DocNo = '';
    }
    var IsPrnt = ($("#IsPrnt").is(':checked')) ? 1 : 0;



    $.ajax({
        url: urlGetJournalFind,
        data: JSON.stringify({
            FrmDt: FrmDt,
            ToDt: ToDt,
            TrnNo: TrnNo,
            AccKy: 1,
            PrjKy: 1,
            IsRec: IsRec,
            DocNo: DocNo,
            IsPrnt: IsPrnt,
            OurCode: viewBag.OurCd,

        }),
        contentType: 'application/json; charset=utf-8',
        dataType: "Json",
        type: "POST",
        success: function (data) {
            LoadGridFindView();
            $('#FindFormGrid').data("kendoGrid").dataSource.filter(null);
            var grid = $("#FindFormGrid").data("kendoGrid");
            grid.dataSource.data([]);
            var j = 1;
            for (i = 0; i < data.length; i++) {

                $("#FindFormGrid").data("kendoGrid").dataSource.add({
                    Lino: j,
                    TrnKy: data[i].TrnKy,
                    Prefix: data[i].Prefix,
                    TrnNo: data[i].SttrnNo,
                    TrnDt: data[i].TrnDt,
                    DocNo: data[i].docno,
                    AdrId: data[i].AdrID,
                    AdrNm: data[i].AdrNm,
                    PrjId: data[i].PrjID,
                    PrjNm: data[i].PrjNm
                });
                j++
            }

        },
        error: function (e) {
            return false;
        }
    });

}


$("#FindFormGrid").on("dblclick", "tr.k-state-selected", function () {


    var grid = $('#FindFormGrid').data().kendoGrid;
    var selectedItem = grid.dataItem(grid.select());
    var TrnKy = selectedItem.TrnKy;

    if (TrnKy != "" || TrnKy != undefined || TrnKy != null) {

        GetpaymentHdrDetail(TrnKy);

    } else {
        alert("please Select Any Trancsaction");
    }
});

function Ok1() {
    var grid = $('#FindFormGrid').data().kendoGrid;
    var selectedItem = grid.dataItem(grid.select());
    var TrnKy = selectedItem.TrnKy;
    if (TrnKy != "" || TrnKy != undefined || TrnKy != null) {

        GetpaymentHdrDetail(TrnKy);

    } else {
        alert("please Select Any Trancsaction");
    }
}

function GetpaymentHdrDetail(TrnKy) {

    $.ajax({
        url: urlHrdSelected,
        data: JSON.stringify({
            TrnKy: TrnKy,
        }),
        contentType: 'application/json; charset=utf-8',
        dataType: "Json",
        type: "POST",
        success: function (data) {
            for (i = 0; i < data.length; i++) {
                var TrnsKy = data[0].TrnKy;
                $("#TrnKy").val(TrnsKy);
                var TimStmp = data[0].TimeStamp
                $("#TimeStamp").val(TimStmp);

                var TrnNo = data[0].TrnNo;
                $("#HdrSec1_InptTrnNo_Val").val(TrnNo);

                var DocNo = data[0].DocNo;
                $("#HdrSec1_InptDocNo_Val").val(DocNo);

                var TrnDt = data[0].TrnDt;
                $('#HdrSec1_DatVouDate_Val').data("kendoDatePicker").value(TrnDt);

                GetGridDetailGrn(TrnKy);


            }

        },
        error: function (e) {
            return false;
        }
    });

}

function GetGridDetailGrn(TrnKy) {
    $.ajax({
        url: urlSelectedGrid,
        data: JSON.stringify({
            TrnKy: TrnKy,
            ObjKy: viewBag.ObjKy,
        }),
        contentType: 'application/json; charset=utf-8',
        dataType: "Json",
        type: "POST",
        success: function (data) {

            var grid = $("#FormGrd").data("kendoGrid");
            grid.dataSource.data([]);
            var multi = 0;
            var TempAmt;
            for (i = 0; i < data.length; i++) {
                $("#FormGrd").data("kendoGrid").dataSource.add({
                    Lino: data[i].LiNo,
                    AccountKy: data[i].AccKy,
                    AccCd: data[i].AccCd,
                    AccNm: data[i].AccNm,
                    AdrNm: data[i].AdrNm,
                    AdrKy: data[i].AdrKy,
                    AdrCd: data[i].AdrCd,
                    Amount: data[i].Amount,
                    Discrption: data[i].Des,
                   

                });


            };
            $("#HdrSec1_CmbPrj_Cd").data("kendoComboBox").value(data[0].PrjKy);
            $("#HdrSec1_CmbPrj_Nm").data("kendoComboBox").value(data[0].PrjKy);
            $("#HdrSec1_CmbBU_Cd").data("kendoComboBox").value(data[0].BuKy);
            $("#HdrSec1_CmbBU_Nm").data("kendoComboBox").value(data[0].BuKy);

            try {
                $('#FindFormAdvRqst').data('kendoWindow').close();
            } catch (ex) { }

        },
        error: function (e) {
            return false;
        }
    });


}

function btnCal1() {
    $('#FindFormPayment').data('kendoWindow').close();
}

function SetTotalAmount() {
    var TempTotal = parseFloat(CalTotal()).toFixed(2);// CalTotal();
    $("#HdrSec3_InptTotAmt_Val").val(TempTotal);
}

