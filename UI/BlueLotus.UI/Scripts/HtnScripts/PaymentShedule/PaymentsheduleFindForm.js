//$(document).ready(function () {
//    setdefault();
//    var height = $(window).height() - 70;
//    var h2 = $("#filterCont").height();
//    $("#body").height(height);
//    $("#FindFormGridPayment").height('40vh');
//    $('.k-grid-content .k-auto-scrollable').css('height', '24.5vh');
//    $(".k-datepicker, .k-combobox, .k-numerictextbox").css('width', "100%");
//    loadCombo();
//    //FindGridDefaultColumns();
//});

function setdefault() {
    var todayDate = new Date();
    $('#HdrSec16_Dat_FF_Todt_Val').data("kendoDatePicker").value(todayDate);
    $('#HdrSec16_Dat_FF_FromDate_Val').data("kendoDatePicker").value("");
    document.getElementById("HdrSec16_Cmb_FF_TrnNo_Val").value == "";
}

$("#HdrSec16_Dat_FF_FromDate_Val").kendoDatePicker({
    format: "yyyy/MM/dd",
    min: new Date(31, 2, 2009),
});

$("#HdrSec16_Dat_FF_Todt_Val").kendoDatePicker({
    format: "yyyy/MM/dd",
    min: new Date(2009, 2, 31)
});

function loadCombo() {
    $("#HdrSec16_Cmb_FF_Acc_Cd").kendoComboBox({
        dataTextField: "AccKy",
        dataTextField: "AccNM",
        //dataSource: AccDoropName("HdrSec16_Cmb_FF_Acc"),
        change: function (e) {
        },
        filter: "contains",
        suggest: true,
        placeholder: "Select an Account"
    });

    $("#HdrSec16_Cmb_FF_Prj_Cd")
       .kendoComboBox({
           dataValueField: "PrjKy",
           dataTextField: "PrjId",
           //dataSource: ProjectCd('HdrSec16_Cmb_FF_Prj'),
           change: function (e) {

           },
           filter: "contains",
           suggest: true,
           placeholder: "Select a Project"
       });

    $("#HdrSec16_Cmb_FF_BU_Cd")
       .kendoComboBox({
           dataValueField: "CdKy",
           dataTextField: "Code",
           //dataSource: BUCode('HdrSec16_Cmb_FF_BU'),
           change: function (e) {
           },
           filter: "contains",
           suggest: true,
           placeholder: "Select a BU"
       });
}



function LoadGridWithColumnPropTwo(columnsFinal, gridNo) {

    var dataSource = new kendo.data.DataSource({
        batch: true,
        sort: ({ field: "LiNo", dir: "desc" }),
        pageSize: 10,
        schema: {
            model: {
                id: "LiNo",
                fields: 
                {
                    LiNo: { editable: false, nullable: false, type: "number" },
                    AccTrnKy: { editable: true, nullable: false, type: "number" },
                    Prefix: { editable: true, nullable: false, type: "string" },
                    TrnNo: { editable: true, nullable: false, type: "string" },
                    TrnDt: { editable: true, nullable: false, type: "date", format: "{0:dd/MM/yyyy}" },
                    DocNo: { editable: true, nullable: false, type: "string" },
                    AdrId: { editable: true, nullable: true, type: "string" },
                    AdrNm: { editable: true, nullable: true, type: "string" },
                    PrjKy: { editable: true, nullable: false, type: "string" },
                    PrjId: { editable: true, nullable: false, type: "string" },
                    PrjNm: { editable: true, nullable: false, type: "string" },
                }
            }
        }
    });

    $("#FindFormGridPayment")
        .kendoGrid({
            dataSource: dataSource,
            sortable: true,
            autobind: true,
            navigatable: true,
            columnMenu: true,
            editable: false,
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
}

//function onDataBound(e) {
//    var id = ("#FindFormGridPayment");
//    var grid = $(id).data("kendoGrid");
//    var dataSource = grid.dataSource.data();
//    for (var i = 0; i < dataSource.length; i++) {
//        if (dataSource[i].IsAct == 0) {
//            grid.tbody.find("tr[data-uid='" + dataSource[i].uid + "']").hide();
//        }
//    }
//}

function FindGridDefaultColumns() {
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
             field: "Prefix",
             title: "Prefix",
             width: "100px",
             hidden: "true",
             editor: function (container, options) {
                 var model = options.model;
             }

         },
        {
            field: "TrnNo",
            title: "TrnNo",
            width: "100px",
            editor: function (container, options) {
                var model = options.model;
            }

        },
        {
            field: "TrnDt",
            title: "TrnDt",
            format: "{0:MM/dd/yyyy}",
            width: "120px",
            editor: function (container, options) {
                var model = options.model;
            }
        },
         {
             field: "DocNo",
             title: "DocNo",
             width: "70px",
             editor: function (container, options) {
                 var model = options.model;
             }
         },
          {
              field: "AdrId",
              title: "AdrId",
              width: "70px",
              editor: function (container, options) {
                  var model = options.model;
              }
          },
          {
              field: "AdrNm",
              title: "AdrNm",
              width: "70px",
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
            field: "PrjId",
            title: "PrjId",
            width: "70px",
            editor: function (container, options) {
                var model = options.model;
            }
        },
        {
            field: "PrjNm",
            title: "PrjNm",
            width: "70px",
            editor: function (container, options) {
                var model = options.model;
            }
        },

        //{
        //    width: "60px",
        //    template: kendo.template($("#command-template-payment").html())
        //}
    ];


    var gridNo = 2;
    //Old ObjMas Function
    var columnsFinal = setColumnProp(columnsDefine, viewBag.ObjKy, '', 'FindFormGridPayment', gridNo);

    //New ObjMas Function
    //var columnsFinal = setGridColumnProp(columnsDefine, 'FindFormGridPayment', gridNo);
}

function Search() {

    var FrmDt = $("#HdrSec16_Dat_FF_FromDate_Val").val();
    if (FrmDt == undefined || FrmDt == "" || FrmDt == null) {
        var FrmDt = "1/1/1900";
    }


    var ToDt = $("#HdrSec16_Dat_FF_Todt_Val").val();
    if (ToDt == undefined || ToDt == "" || ToDt == null) {
        var ToDt = "1/1/2078";
    }

    var TrnNo = $("#HdrSec16_Cmb_FF_TrnNo_Val").val();

    if (TrnNo == undefined || TrnNo == "" || TrnNo == null) {
        var TrnNo = null;
    }
    var AccKy = $("#HdrSec16_Cmb_FF_Acc_Cd").data("kendoComboBox").value();
    if (!AccKy || AccKy == "") {
        AccKy = 1;
    }
    var PrjKy = $("#HdrSec16_Cmb_FF_Prj_Cd").data("kendoComboBox").value();
    if (!PrjKy || PrjKy == "") {
        PrjKy = 1;
    }

    var IsPrnt = ($("#HdrSec3_FF_Chkbox_IsPrnt_Val").is(":checked")) ? 1 : 0;

    var ourcd = viewBag.OurCd;
    //var ApprKy = $("#HdrSec16_Cmb_FF_AprStatesAction_Val").data("kendoComboBox").value();
    //if (!ApprKy || ApprKy == "") {
    //    ApprKy = 1;
    //}
    var BU = $("#HdrSec16_Cmb_FF_BU_Cd").data("kendoComboBox").value();
    if (!BU || BU == "") {
        BU = 1;
    }


    $.ajax({
        url: urlGetJournalFind,
        data: JSON.stringify({
            FrmDt: FrmDt,
            ToDt: ToDt,
            TrnNo: TrnNo,
            AccKy: AccKy,
            PrjKy: PrjKy,
            IsRec: 0,
            DocNo: " ",
            IsPrnt: IsPrnt,
            OurCode: ourcd,
            Prefix:1,
            Adrky: 1,
            UrRef: " ",
            ApprKy: 1,
            BU: BU

        }),
        contentType: 'application/json; charset=utf-8',
        dataType: "Json",
        type: "POST",
        success: function (data) {
            $('#FindFormGridPayment').data("kendoGrid").dataSource.filter(null);
            var grid = $("#FindFormGridPayment").data("kendoGrid");
            grid.dataSource.data([]);
            var j = 1;
            for (i = 0; i < data.length; i++) {

                $("#FindFormGridPayment").data("kendoGrid").dataSource.add({
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

$("#FindFormGridPayment").on("dblclick", "tr.k-state-selected", function () {

    var grid = $('#FindFormGridPayment').data().kendoGrid;
    var selectedItem = grid.dataItem(grid.select());
    FormGlblData.selectedIndex = grid.select().index();
   

    var DataSource = $('#FindFormGridPayment').data('kendoGrid').dataSource.data();
    //$("#pager").data("kendoPager").dataSource.data([]);
    //$('#FindFormGridPayment').data('kendoGrid').dataSource.data([]);
    //var destinationgrid = $('#pager').data('kendoPager'); // DESTINATION Pager
    //for (var i = 0; i < DataSource.length; i++) {
    //    destinationgrid.dataSource.add(DataSource[i]);
    //}
    //destinationgrid.dataSource.page(FormGlblData.selectedIndex + 1);
    //destinationgrid.refresh();

    var TrnKy = selectedItem.TrnKy;

    if (TrnKy != "" || TrnKy != undefined || TrnKy != null) {
        FormGlblData.ISNeworUpdateTranction = 0;
        GridDefaultColumns();
        GetpaymentHdrDetail(TrnKy);

    } else {
        alert("please Select Any Trancsaction");
    }
});

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
                FormGlblData.TrnKy = TrnsKy;
                var TrnNo = data[0].TrnNo;
                var TrnTypKy = data[0].TrnTypKy;
                FormGlblData.TrnTypKy = TrnTypKy;
                var TrnDate = data[0].TrnDt;
                FormGlblData.FindFormTrnDt = TrnDate;
                var UrRefDt = data[0].UrRefDt;
                $('#HdrSec2_DatPayDetail_Val').data("kendoDatePicker").value(TrnDate);
                $("#HdrSec1_InpTrnNo_Val").val(TrnNo);

                GetGridDetailGrn(TrnKy);


            }

        },
        error: function (e) {
            return false;
        }
    });

}

function GetGridDetailGrn(TrnKy) {
    var ObjctKy = viewBag.ObjKy;
    $.ajax({
        url: urlSelectedGrid,
        data: JSON.stringify({
            TrnKy: TrnKy,
            ObjKy: ObjctKy,
        }),
        contentType: 'application/json; charset=utf-8',
        dataType: "Json",
        type: "POST",
        success: function (data) {
            if (data.length == 0) {
                alert("There is an error with Transaction Please Contact any Support personn \n Error Code " + TrnKy);
            }
            if ($("#Maingrid").data("kendoGrid").dataSource._data.length > 0) {
                $('#Maingrid').data("kendoGrid").dataSource.data([]);
            }
            var OpeningBalance = 0;
            for (i = 0; i < data.length; i++) {
                try {
                    if (data[i].LiNo != 1) {

                        var stringiscross = data[i].isCross;
                        var booliscross = (stringiscross == "true");
                        var stringisAccPayee = data[i].IsAccPay;
                        var boolisAccPayee = (stringisAccPayee == "true");
                        var stringNotNegotiable = data[i].IsNegotiable;
                        var boolNotNegotiable = (stringNotNegotiable == "true");
                        var stringisCash = data[i].IsCash;
                        var boolisCash = (stringisCash == "true");
                        OpeningBalance = OpeningBalance + parseInt(data[i].DRAMT);
                        $('#Maingrid').data('kendoGrid').dataSource.add(
                            {
                                AccCd: data[i].AccCd,
                                AccNm: data[i].AccNm,
                                TrnKy: FormGlblData.TrnKy,
                                AccAmt: data[i].Amount,
                                ThisSetOffAmt:data[i].Amount,
                                Des: data[i].Des,
                                AdrKy: data[i].AdrKy,
                                AdrID: data[i].AdrCd,
                                PrjKy: data[i].PrjKy,
                                PrjID: data[i].PrjId,
                                BUKy: data[i].BuKy,
                                iscross: booliscross,
                                isAccPayee: boolisAccPayee,
                                NotNegotiable: boolNotNegotiable,
                                isCash: boolisCash,
                                IsAct:1,
                                BUCd: data[i].BUCode,
                                AccTrnKy: data[i].AccTrnKy,
                                select: true,
                                YurRef:data[i].YurRef,
                               
                            }
                            );
                    }
                    else if (data[i].LiNo == 1) {
                        $("#HdrSec2_CmbCreditAcc_Cd").data("kendoComboBox").value(data[0].AccKy);
                        $("#HdrSec2_CmbPayMode_Cd").data("kendoComboBox").value(data[0].PayModeKy);
                        FormGlblData.CreateAccTrnKy = data[i].AccTrnKy;
                        
                    }
                } catch (e) {
                    alert(e)

                }




            }
            try { $('#FindFormPaymentShedule').data('kendoWindow').close(); }
            catch (e) { }
            // console.log(OpeningBalance);

            //$("#HdrSec2_InpOpnBalText_Val").val(OpeningBalance);
            $("#HdrSec2_InpOpnBalText_Val").data("kendoNumericTextBox").value(OpeningBalance);
        },
        error: function (e) {
            return false;
        }
    });


}
