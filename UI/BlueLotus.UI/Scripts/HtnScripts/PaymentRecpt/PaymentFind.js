$(document).ready(function () {
    setdefault();
    var height = $(window).height() - 70;
    var h2 = $("#filterCont").height();
    $("#body").height(height);
    $("#FindFormGridPayment").height('40vh');
    $('.k-grid-content .k-auto-scrollable').css('height', '24.5vh');
    $(".k-datepicker, .k-combobox, .k-numerictextbox").css('width', "100%");
    //LoadGridWithColumnProp();
});

function setdefault() {
    $('#HdrSec3_FF_Chkbox_IsRec_Val').prop('checked', false);
    var todayDate = new Date();
    $('#HdrSec16_Dat_FF_Todt_Val').data("kendoDatePicker").value(todayDate);
    $('#HdrSec16_Dat_FF_FromDate_Val').data("kendoDatePicker").value("");
    //document.getElementById("TrnNo").value == "";
    document.getElementById("HdrSec16_Inpt_FF_DocNo_Val").value = "";
    
}

//$("#HdrSec16_Cmb_FF_TrnNo_Cd").kendoComboBox({
//    dataValueField: "CdKy",
//    dataTextField: "Code",
//    dataSource: Code_Selectweb(),
//    change: function (e) {

//        var cmb = $("#HdrSec16_Cmb_FF_TrnNo_Cd").data("kendoComboBox");
//        var val = cmb.value();

//        if (isNaN(val)) {
//            alert("'" + val + "' is not a Valid input");
//            cmb.value("");
//        }
//    },
//    filter: "startswith",
//    suggest: true,
//    placeholder: "Prefix"
//});

//function Code_Selectweb() {
//    var dataSource = new kendo.data.DataSource(
//     {
//         transport: {
//             read: {
//                 url: urlFindInvoice.Code_SelectWeb,
//                 data: { ConCd: "PreFix" },
//                 dataType: "json",

//             }
//         }
//     });
//    return dataSource;
//}
$("#HdrSec16_Dat_FF_FromDate_Val").kendoDatePicker({
    format: "yyyy/MM/dd",
    min: new Date(31, 2, 2009),
});

$("#HdrSec16_Dat_FF_Todt_Val").kendoDatePicker({

    format: "yyyy/MM/dd",
    min: new Date(2009, 2, 31)
});



//function LoadGridFindView() {

//    var dataSource = new kendo.data.DataSource({
//        batch: true,
//        pageSize: 10,
//        schema: {
//            model: {
//                id: "TrnKy",
//                fields: //Relavent fields of the grid should be bind with following model items
//                {
//                    Lino: { editable: false, nullable: false, type: "number" },
//                    TrnKy: { editable: true, nullable: false, type: "number" },
//                    Prefix: { editable: true, nullable: false, type: "string" },
//                    TrnNo: { editable: true, nullable: false, type: "string" },
//                    TrnDt: { editable: true, nullable: false, type: "date" },
//                    DocNo: { editable: true, nullable: false, type: "string" },
//                    AdrId: { editable: true, nullable: true, type: "string" },
//                    AdrNm: { editable: true, nullable: true, type: "string" },
//                    PrjId: { editable: true, nullable: false, type: "string" },
//                    PrjNm: { editable: true, nullable: false, type: "string" },
//                }
//            }
//        }
//    });

//    $("#FindFormGridPayment").kendoGrid({
//        dataSource: dataSource,
//        autobind: true,
//        navigatable: true,
//        filterable: {
//            mode: "row"
//        },
//        pageable: true,
//        sortable: true,
//        reorderable: true,
//        columnMenu: true,
//        selectable: "column",
//        pageable: { refresh: true, pageSizes: [5, 10, 20, 50, 100] },
//        columns: [
//             {
//                 field: "Lino", title: "LiNo", width: "50px",
//             },

//                 {
//                     field: "TrnKy", title: "Ref #", width: "100px", hidden: true,
//                 },
//                  {
//                      field: "Prefix", title: "Prefix", width: "50px",

//                  },
//               {
//                   field: "TrnNo",
//                   title: "TrnNo",
//                   width: "100px",
//               },


//           {
//               field: "TrnDt", title: "TrnDt", width: "100px", format: "{0: MM-dd-yyyy}",
//               template: "#= kendo.toString(kendo.parseDate(TrnDt, 'yyyy-MM-dd'), 'MM/dd/yyyy') #",
//           },
//            {
//                field: "DocNo", title: "DocNo", width: "100px",

//            },
//            {
//                field: "AdrId", title: "AdrId", width: "100px",
//            },

//           {
//               field: "AdrNm", title: "AdrNm", width: "100px",
//           },
//          {
//              field: "PrjId", title: "PrjId", width: "100px",
//          },
//           {
//               field: "PrjNm", title: "PrjNm", width: "100px",
//           },
//        ],

//        resizable: true,

//        dataBinding: function () {
//            record = (this.dataSource.page() - 1) * this.dataSource.pageSize();
//        },


//        editable: false,
//    });
//}


function LoadGridWithColumnPropTwo(columnsFinal, gridNo) {

    var dataSource = new kendo.data.DataSource({
        batch: true,
        //sort: { field: "LiNo", dir: "desc" },
        pageSize: 10,
        schema: {
            model: {
                id: "AccTrnKy",
                fields: //Relavent fields of the grid should be bind with following model items
                {
                    LiNo: { editable: false, nullable: false, type: "number" },
                    AccTrnKy: { editable: true, nullable: false, type: "number" },
                    Prefix: { editable: true, nullable: false, type: "string" },
                    TrnNo: { editable: true, nullable: false, type: "number" },
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
            //pageSize: 10,
            pageable: true,
            selectable: "row",
            resizable: true,
            dataBound: onDataBound,
            pageable: { refresh: true, pageSizes: [5, 10, 20, 50, 'All'] },
            columns: columnsFinal,

        });
}

function onDataBound(e) {
    var id = ("#FindFormGridPayment");
    var grid = $(id).data("kendoGrid");
    var dataSource = grid.dataSource.data();
    for (var i = 0; i < dataSource.length; i++) {
        if (dataSource[i].IsAct == 0) {
            grid.tbody.find("tr[data-uid='" + dataSource[i].uid + "']").hide();
        }
    }
}

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
            hidden: "true",
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
    //var columnsFinal = setColumnProp(columnsDefine, ObjKy, '', 'FindFormGridPayment', gridNo);

    //New ObjMas Function
    var columnsFinal = setGridColumnProp(columnsDefine, 'FindFormGridPayment', gridNo);
}


function PrjChkChange() {

    if (document.getElementById('PrjChk').checked) {
        ProjectLoad();
        document.getElementById("PrjChk").disabled = true;
    }

}



function AccChkChange() {

    if (document.getElementById('AccChk').checked) {
        loadAcc();
        document.getElementById("AccChk").disabled = true;
    }

}

//function ProjectLoad() {
//    //Project Code Drop Bottom
//    $("#HdrSec16_Cmb_FF_Prj_Cd").kendoComboBox({
//        dataValueField: "PrjKy",
//        dataTextField: "PrjCd",
//        dataSource: {
//            type: "POST",
//            transport: {

//                read: urlGetPrjCd//readcontroler and action
//            }
//        },
//        change: function (e) {
//            var cmb = $("#HdrSec16_Cmb_FF_Prj_Cd").data("kendoComboBox");
//            var PrjKy = cmb.value();
//            if (PrjKy != "") {
//                var validate = ComboValidations("PrjCd");
//                if (validate) {
//                    $("#HdrSec16_Cmb_FF_Prj_Cd").data("kendoComboBox").value(PrjKy);
//                    $("#HdrSec16_Cmb_FF_Prj_Nm").data("kendoComboBox").value(PrjKy);
//                } else {

//                    $("#HdrSec16_Cmb_FF_Prj_Cd").data("kendoComboBox").value("");
//                    $("#HdrSec16_Cmb_FF_Prj_Nm").data("kendoComboBox").value("");

//                }
//            }


//        },
//        filter: "contains",
//        suggest: true,
//        placeholder: "Select a Project"
//    });
//    //Project Name Drop Bottom
//    $("#HdrSec16_Cmb_FF_Prj_Nm").kendoComboBox({
//        dataValueField: "PrjKy",
//        dataTextField: "PrjNm",
//        dataSource: {
//            type: "POST",
//            transport: {

//                read: urlGetPrjNm//readcontroler and action
//            }
//        },
//        change: function (e) {
//            var cmb = $("#HdrSec16_Cmb_FF_Prj_Nm").data("kendoComboBox");
//            var PrjKy = cmb.value();
//            if (PrjKy != "") {
//                var validate = ComboValidations("PrjNm");
//                if (validate) {

//                    $("#HdrSec16_Cmb_FF_Prj_Cd").data("kendoComboBox").value(PrjKy);
//                    $("#HdrSec16_Cmb_FF_Prj_Nm").data("kendoComboBox").value(PrjKy);


//                } else {

//                    $("#HdrSec16_Cmb_FF_Prj_Cd").data("kendoComboBox").value("");
//                    $("#HdrSec16_Cmb_FF_Prj_Nm").data("kendoComboBox").value("");

//                }
//            }


//        },
//        filter: "contains",
//        suggest: true,
//        placeholder: "Select an Project"
//    });



//}

//function loadAcc() {

//    //Accounts Code Drop Bottom
//    $("#AccCode").kendoComboBox({
//        dataValueField: "AccKy",
//        dataTextField: "AccCode",
//        dataSource: {
//            type: "POST",
//            transport: {

//                read: urlGetAccDoropCode//readcontroler and action
//            }
//        },
//        change: function (e) {
//            var cmb = $("#AccCode").data("kendoComboBox");
//            var AkkKy = cmb.value();
//            if (AkkKy != "") {
//                var validate = ComboValidations("AccCode");
//                if (validate) {

//                    $("#AccCode").data("kendoComboBox").value(AkkKy);
//                    $("#AccName").data("kendoComboBox").value(AkkKy);

//                } else {

//                    $("#AccCode").data("kendoComboBox").value("");
//                    $("#AccName").data("kendoComboBox").value("");

//                }
//            }


//        },
//        filter: "contains",
//        suggest: true,
//        placeholder: "Select an Account"
//    });
//    //Accounts Name Drop Bottom
//    $("#AccName").kendoComboBox({
//        dataValueField: "AccKy",
//        dataTextField: "AccNM",
//        dataSource: {
//            type: "POST",
//            transport: {

//                read: urlGetAccDoropNm//readcontroler and action
//            }
//        },
//        change: function (e) {
//            var cmb = $("#AccName").data("kendoComboBox");
//            var AkkKy = cmb.value();
//            if (AkkKy != "") {
//                var validate = ComboValidations("AccName");
//                if (validate) {

//                    $("#AccName").data("kendoComboBox").value(AkkKy);
//                    $("#AccCode").data("kendoComboBox").value(AkkKy);



//                } else {

//                    $("#AccCode").data("kendoComboBox").value("");
//                    $("#AccName").data("kendoComboBox").value("");
//                }
//            }



//        },
//        filter: "contains",
//        suggest: true,
//        placeholder: "Select an Account"
//    });

//}

function Search() {


    var Prefix = $("#HdrSec16_Cmb_FF_TrnNo_Cd").val();
    if (Prefix == null || Prefix == "" || Prefix == undefined) {
        Prefix = 1;
    }


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

    var IsRec = ($("#HdrSec16_Chkbox_FF_IsRec_Val").is(":checked")) ? 1 : 0;// ($("#HdrSec3_FF_Chkbox_IsRec_Val").is(":checked")) ? 1 : 0;
    
    var DocNo = $("#HdrSec16_Inpt_FF_DocNo_Val").val();
    if (DocNo == undefined || DocNo == "" || DocNo == null) {
        var DocNo = '';
    }
    var IsPrnt = ($("#HdrSec3_FF_Chkbox_IsPrnt_Val").is(":checked")) ? 1 : 0;
    var ourcd = null;
    if (FormGlblData.OurCode2 == "RecpTmp") {
        ourcd = FormGlblData.OurCode2;
    } else {
        ourcd = OurCode;
    }
    var Adrky = $("#HdrSec16_Cmb_FF_HdrAdr_Cd").data("kendoComboBox").value();
    if (!Adrky || Adrky == "") {
        Adrky = 1;
    }
    var ApprKy = $("#HdrSec16_Cmb_FF_AprStatesAction_Val").data("kendoComboBox").value();
    if (!ApprKy || ApprKy == "") {
        ApprKy = 1;
    }
    var BU = $("#HdrSec16_Cmb_FF_BU_Cd").data("kendoComboBox").value();
    if (!BU || BU == "") {
        BU = 1;
    }
    var UrRef = $("#HdrSec16_Inpt_FF_YurRef_Val").val();
    if (UrRef == undefined || UrRef == "" || UrRef == null) {
        UrRef = null;
    }


    $.ajax({
        url: urlGetJournalFind,
        data: JSON.stringify({
            FrmDt: FrmDt,
            ToDt: ToDt,
            TrnNo: TrnNo,
            AccKy: AccKy,
            PrjKy: PrjKy,
            IsRec: IsRec,
            DocNo: DocNo,
            IsPrnt: IsPrnt,
            OurCode: ourcd,
            Prefix: Prefix,
            Adrky: Adrky,
            UrRef: UrRef,
            ApprKy: ApprKy,
            BU: BU

        }),
        contentType: 'application/json; charset=utf-8',
        dataType: "Json",
        type: "POST",
        success: function (data) {
            //FindGridDefaultColumns();
            //LoadGridFindView();
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
  //  alert("Index " + FormGlblData.selectedIndex)


    var DataSource = $('#FindFormGridPayment').data('kendoGrid').dataSource.data();
    $("#pager").data("kendoPager").dataSource.data([]);
    $('#FindFormGridPayment').data('kendoGrid').dataSource.data([]);
    var destinationgrid = $('#pager').data('kendoPager'); // DESTINATION Pager
    for (var i = 0; i < DataSource.length; i++) {
        destinationgrid.dataSource.add(DataSource[i]);
    }
    destinationgrid.dataSource.page(FormGlblData.selectedIndex + 1);
    destinationgrid.refresh();



    // alert("The Row Is SELECTED at index: " + grid.select().index());
    var TrnKy = selectedItem.TrnKy;

    if (TrnKy != "" || TrnKy != undefined || TrnKy != null) {
        FormGlblData.ISNeworUpdateTranction = 0;
        SetTrnDate();
        //2018/06/22 Hovael Company request 
        //checking the OurCode is "RecpTmp" form state to open (Approved by UT)
        //Sajen request 
        var ourcode = FormGlblData.OurCode2;
        if (ourcode != null) {
            if (ourcode != "RecpTmp") {
                SetTrnHdrApr_LatestState(TrnKy, FormGlblData.TrnTypKy, 'TrnHdr');
            }
        }
        else {
            SetTrnHdrApr_LatestState(TrnKy, FormGlblData.TrnTypKy, 'TrnHdr');
        }
        
        GetpaymentHdrDetail(TrnKy);

    } else {
        alert("please Select Any Trancsaction");
    }
});

function Ok1() {

    var grid = $('#FindFormGridPayment').data().kendoGrid;
    var selectedItem = grid.dataItem(grid.select());
    FormGlblData.selectedIndex = grid.select().index();
   
    var DataSource = $('#FindFormGridPayment').data('kendoGrid').dataSource.data();
    $("#pager").data("kendoPager").dataSource.data([]);
    var destinationgrid = $('#pager').data('kendoPager'); // DESTINATION Pager
    for (var i = 0; i < DataSource.length; i++) {
        destinationgrid.dataSource.add(DataSource[i]);
    }
    destinationgrid.dataSource.page(FormGlblData.selectedIndex + 1);
    destinationgrid.refresh();

    var TrnKy = selectedItem.TrnKy;
    if (TrnKy != "" || TrnKy != undefined || TrnKy != null) {

        GetpaymentHdrDetail(TrnKy);

    } else {
        alert("please Select Any Trancsaction");
    }
}

function Clear() {
    var grid = $("#FindFormGridPayment").data("kendoGrid");
    grid.dataSource.data([]);
    $("#HdrSec16_Dat_FF_FromDate_Val").val(null);
    $("#HdrSec16_Inpt_FF_DocNo_Val").val(null);
    $("#HdrSec16_Inpt_FF_YurRef_Val").val(null);
    $("#HdrSec16_Cmb_FF_AprStatesAction_Val").data('kendoComboBox').value(null);
    $("#HdrSec16_Cmb_FF_TrnNo_Cd").data('kendoComboBox').value(null);
    $("#HdrSec16_Cmb_FF_TrnNo_Val").val(null);
    $("#HdrSec16_Cmb_FF_Acc_Cd").data('kendoComboBox').value(null);
    //$("#HdrSec16_Cmb_FF_Acc_Nm").data('kendoComboBox').value(null);
    $("#HdrSec16_Cmb_FF_HdrAdr_Cd").data('kendoComboBox').value(null);
    //$("#HdrSec16_Cmb_FF_HdrAdr_Nm").data('kendoComboBox').value(null);
    $("#HdrSec16_Cmb_FF_Prj_Cd").data('kendoComboBox').value(null);
    //$("#HdrSec16_Cmb_FF_Prj_Nm").data('kendoComboBox').value(null);
    $("#HdrSec16_Cmb_FF_BU_Cd").data('kendoComboBox').value(null);
    //$("#HdrSec16_Cmb_FF_BU_Nm").data('kendoComboBox').value(null);
    $('#HdrSec16_Chkbox_FF_IsRec_Val').attr('checked', false);
    $('#HdrSec16_Chkbox_FF_IsPrnt_Val').attr('checked', false);
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
                FormGlblData.TrnKy = TrnsKy;
                var TrnNo = data[0].TrnNo;
                var ourcode = FormGlblData.OurCode2;
                if (ourcode == "RecpTmp")
                {
                    $("#HdrSec1_InptVouNo_Val").val();
                }
                else {
                    $("#HdrSec1_InptVouNo_Val").val(TrnNo);
                }
                

                var TimStmp = data[0].TimeStamp;
                FormGlblData.TimeStamp = TimStmp;




                var DocNo = data[0].DocNo;
                $("#HdrSec1_InptDocNo_Val").val(DocNo);

                var YurRef = data[0].YurRef;
                $("#HdrSec1_InptYurRef_Val").val(YurRef);

                var TrnDt = data[0].TrnDt;
                $('#HdrSec1_DatVouDate_Val').data("kendoDatePicker").value(TrnDt);
                FormGlblData.FromFindDate = TrnDt;

                var UrRefDt = data[0].UrRefDt;
                $('#HdrSec1_DatVouRefDate_Val').data("kendoDatePicker").value(UrRefDt);

                var TrnCrnKy = data[0].TrnCrnKy;
                $("#HdrSec3_CmbTrnCurrncy_Cd").data("kendoComboBox").value(TrnCrnKy);



                var TrnExRate = data[0].TrnExRate;
                $("#HdrSec3_InptTrnExRate_Val").val(TrnExRate);

                var isRec = data[0].isRec;

                $('#HdrSec2_Chkbox_IsRec_Val').prop('checked', isRec);
                if (isRec) {
                    FormGlblData.IsRecState = 1;
                } else {
                    FormGlblData.IsRecState = 0;

                }
                if (FormGlblData.OurCode2 == "RecpTmp") {
                    FormGlblData.FromTrnKy = TrnsKy;
                    FormGlblData.IsRecState = 1;
                }
                $('#HdrSec2_Chkbox_multi_Val').prop('checked', data[0].isMulti);
                BackDateFutureDateLock("HdrSec1_DatVouDate_Val");
                document.getElementById("HdrSec7_InptRemark_Val").value = data[0].Rem;
                document.getElementById("HdrSec7_InptDesc_Val").value = data[0].Des;
                GetGridDetailGrn(TrnKy);


            }

        },
        error: function (e) {
            return false;
        }
    });

}

function GetGridDetailGrn(TrnKy) {
    var ObjctKy = ObjKy;
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
                alert("There is an error with Transaction Please Contact any Support person \n Error Code " + TrnKy);
            }

            var grid = $("#PmtRcprGrd").data("kendoGrid");
            grid.dataSource.data([]);
            var multi = 0;
            var TempAmt;
            for (i = 0; i < data.length; i++) {
                var Cramount = 0;
                var Dramount = 0;
                //if (data[0].Amount > 0) {
                //    multi = true;
                //} else {
                //    multi = false;
                //}
                TempAmt = data[i].Amount;
                if (TempAmt < 0) {
                    TempAmt = parseFloat(data[i].Amount * (-1)).toFixed(2);// ;
                }
                if (i == 0 && data[i].Amount < 0) {
                    Cramount = parseFloat(data[i].Amount * (-1)).toFixed(2);
                } else if (i == 0 && data[i].Amount > 0) {
                    Dramount = parseFloat(data[i].Amount).toFixed(2);
                } else if (data[i].Amount < 0) {
                    Cramount = parseFloat(data[i].Amount * (-1)).toFixed(2);// ;
                } else if (data[i].Amount > 0) {
                    Dramount = parseFloat(data[i].Amount).toFixed(2);// ;
                }

                $("#PmtRcprGrd").data("kendoGrid").dataSource.add({
                    AccTrnKy: data[i].AccTrnKy,
                    LiNo: data[i].LiNo,
                    AccKy: data[i].AccKy,
                    AccCd: data[i].AccCd,
                    AccNm: data[i].AccNm,
                    AdrNm: data[i].AdrNm,
                    AdrKy: data[i].AdrKy,
                    AdrCd: data[i].AdrCd,
                    PayModeKy: data[i].PayModeKy,
                    PayModeCd: data[i].PayModeCode,
                    ChqNo: data[i].ChqNo,
                    ChqDate: data[i].ChqDate,
                    IsCash: data[i].IsCash,
                    Amount: TempAmt,
                    CRAMT: Cramount,
                    DRAMT: Dramount,
                    BanckKy: data[i].BanckKy,
                    BanckCd: data[i].BanckCd,
                    BranchKy: data[i].BranchKy,
                    BranchCD: data[i].BranchCD,
                    CurencyKy: data[i].CurencyKy,
                    CurencyCd: data[i].CurencyCode,
                    ExRate: data[i].ExRate,
                    Des: data[i].Des,
                    TaskKy: data[i].TaskKy,
                    TaskId: data[i].TaskId,
                    TaskNm: data[i].TaskNm,
                    Analysys1Ky: data[i].Analysys1Ky,
                    Analysys1: data[i].Analysys1Id,
                    Analysys1Nm: data[i].Analysys1Nm,
                    Analysys2Ky: data[i].Analysys2Ky,
                    Analysys2: data[i].Analysys2Id,
                    Analysys2Nm: data[i].Analysys2Nm,
                    Analysys3Ky: data[i].Analysys3Ky,
                    Analysys3: data[i].Analysys3Id,
                    Analysys3Nm: data[i].Analysys3Nm,
                    Analysys4Ky: data[i].Analysys4Ky,
                    Analysys4: data[i].Analysys4Id,
                    Analysys4Nm: data[i].Analysys4Nm,
                    Analysys5Ky: data[i].Analysys5Ky,
                    Analysys5: data[i].Analysys5Id,
                    Analysys5Nm: data[i].Analysys5Nm,
                    Analysys6Ky: data[i].Analysys6Ky,
                    Analysys6: data[i].Analysys6Id,
                    Analysys6Nm: data[i].Analysys6Nm,
                    IsAccPay: data[i].IsAccPay,
                    PrjKy: data[i].PrjKy,
                    PrjCd: data[i].PrjId,
                    PrjNm: data[i].PrjNm,
                    BuKy: data[i].BuKy,
                    BuCd: data[i].BUCode,
                    BuNm: data[i].BUNM,
                    Dt2: data[i].Dt2,
                    OrgPmtDetky: data[i].OrgPmtDetky,
                    LCKy: data[i].LCKy,
                    LCNo: data[i].LCNo,
                    LoanKy: data[i].LoanKy,
                    LoanNo: data[i].LoanNo,
                    OrderKy: data[i].OrderKy,
                    OrderNo: data[i].OrderNo,
                    OrdrDetKy: data[i].OrdrDetKy,
                    OrdrDetNo: data[i].OrdrDetNo,
                    PayeeName: data[i].PayeeName,
                    IsNegotiable: data[i].IsNegotiable,
                    DueDate: data[i].DueDate,
                    DetYurRef: data[i].DetYurRef,
                    isCross: data[i].isCross,
                    DetDocNo: data[i].DetDocNo,
                    IsAct: data[i].IsAct

                });


            };

            $("#HdrSec2_CmbPrj_Cd").data("kendoComboBox").value(data[0].PrjKy)// 
            //$("#HdrSec2_CmbPrj_Nm").data("kendoComboBox").value(data[0].PrjKy)// 
            FormGlblData.TempPrj = data[0].PrjKy;
            $("#HdrSec2_CmbBU_Cd").data("kendoComboBox").value(data[0].BuKy)// 
            //$("#HdrSec2_CmbBU_Nm").data("kendoComboBox").value(data[0].BuKy)// 
            FormGlblData.TempBU = data[0].BuKy;

            //  $('#HdrSec2_Chkbox_multi_Val').prop('checked', data[0].isMulti);
            $("#HdrSec2_CmbHdrAcc_Cd").data("kendoComboBox").setDataSource(AccountCodeDatasource('HdrSec2_CmbHdrAcc'));
            //$("#HdrSec2_CmbHdrAcc_Nm").data("kendoComboBox").setDataSource(AccountDatasource('HdrSec2_CmbHdrAcc'));
            $("#HdrSec2_CmbHdrAcc_Cd").data("kendoComboBox").value(data[0].AccKy)// 
            //$("#HdrSec2_CmbHdrAcc_Nm").data("kendoComboBox").value(data[0].AccKy)// 
            $("#HdrSec2_CmbHdrAdr_Cd").data("kendoComboBox").value(data[0].AdrKy)// 
            //$("#HdrSec2_CmbHdrAdr_Nm").data("kendoComboBox").value(data[0].AdrKy)// 
            $("#HdrSec3_CmbAccCurrncy_Cd").data("kendoComboBox").value(data[0].CurencyKy)// 
            $("#HdrSec3_InptAccExRate_Val").val(data[0].ExRate);
            $("#HdrSec4_CmbTsk_Cd").data("kendoComboBox").setDataSource(urlGetTaskCode("HdrSec4_CmbTsk"));
            //$("#HdrSec4_CmbTsk_Nm").data("kendoComboBox").setDataSource(urlGetTaskNm("HdrSec4_CmbTsk"));

            // SetTotalAmount();
            var TempTotal = parseFloat(data[0].TotalAmount).toFixed(2);// CalTotal();
            $("#HdrSec3_InptTotAmt_Val").val(TempTotal);
            setTimeout(DecideLock(), 2000);
            try {
                $('#FindFormPayment').data('kendoWindow').close();
                FormGlblData.OurCode2 = null;
                if (FormGlblData.AprStsLockMsg != "" && FormGlblData.AprStsLockMsg != null)
                    alert(FormGlblData.AprStsLockMsg);
            } catch (ex) { }

        },
        error: function (e) {
            return false;
        }
    });


}

function back() {
    $('#FindFormPayment').data('kendoWindow').close();
    FormGlblData.OurCode2 = null;
}

function SetTotalAmount() {
    var TempTotal = parseFloat(CalTotal()).toFixed(2);// CalTotal();
    $("#HdrSec3_InptTotAmt_Val").val(TempTotal);

    var FirstRow = $("#PmtRcprGrd").data().kendoGrid.dataSource.data()[0];
    FirstRow.set("Amount", TempTotal);
}

function TempRcptSerch(tempOurCd) {
    FormGlblData.OurCode2 = tempOurCd;
    $("#FindFormPayment")
        .show()
        .kendoWindow({
            width: "1000px",
            height: "600px",
            modal: true,
            title: "Find Form"
        });

    $("#FindFormPayment").data("kendoWindow").center().open();

    try {
        $('#FindFormGridPayment').data("kendoGrid").dataSource.filter(null);
        $("#FindFormGridPayment").data("kendoGrid").dataSource.data([]);

    } catch (e) {

    }
    // e.preventDefault();


}

function DecideLock() {
    if (FormGlblData.AprStsLock == 0) {
        SetReadOnlyAttr(1);
    }
    else {
        SetReadOnlyAttr(0);
    }
}


//<!-- navigation script end -->

var dataSource = new kendo.data.DataSource({
    data: [],
    pageSize: 1,
    schema: {
        model: {
            id: "TrnKy",
            fields: //Relavent fields of the grid should be bind with following model items
            {
                TrnKy: { editable: true, nullable: false, type: "number" },
            }
        }
    }
});

$("#pager").kendoPager({
    dataSource: dataSource,
    buttonCount: 1,
    pageSize: 1,
    messages: {
        previous: "Go to Next Transaction",
        next: "Go to Previous Transaction",
        last: "Go to First Transaction",
        first: "Go to Last Transaction",
        display: "{0} of {2} Transaction"


    }
});

dataSource.read();


//<!-- navigation script end -->

$(".k-icon.k-i-arrow-e").parent().click(function () {
    var PagerData = $('#pager').data('kendoPager').dataSource.data();
    if (PagerData.length == 0) {
        return;
    }

    var DataSource = $('#FindFormGridPayment').data('kendoGrid').dataSource.data();
    var getnett = FormGlblData.selectedIndex + 1;
    GetRecord(getnett);
    if (FormGlblData.selectedIndex < DataSource.length) {
        FormGlblData.selectedIndex = getnett;
    }
    //right Arrow
});

$(".k-icon.k-i-seek-e").parent().click(function () {
    var PagerData = $('#pager').data('kendoPager').dataSource.data();
    if (PagerData.length == 0) {
        return;
    }
    var DataSource = $('#FindFormGridPayment').data('kendoGrid').dataSource.data();
    var getnett = DataSource.length-1;
    GetRecord(getnett);
    FormGlblData.selectedIndex = getnett;



    //Last was clicked


});

$(".k-icon.k-i-arrow-w").parent().click(function () {
    var PagerData = $('#pager').data('kendoPager').dataSource.data();
    if (PagerData.length == 0) {
        return;
    }
    var getnett = FormGlblData.selectedIndex - 1;
    GetRecord(getnett);
    if (getnett > 0) {
        FormGlblData.selectedIndex = getnett;

    }

    //  alert("Left was clicked.");

});

$(".k-icon.k-i-seek-w").parent().click(function () {
    var PagerData = $('#pager').data('kendoPager').dataSource.data();
    if (PagerData.length == 0) {
        return;
    }
    GetRecord(0);
    FormGlblData.selectedIndex = 0;
   // alert(FormGlblData.selectedIndex)

    // alert("First was clicked.");

});


function GetRecord(IndexNo) {
   // alert(IndexNo)
    try {
        var DataSource = $('#FindFormGridPayment').data('kendoGrid').dataSource.data();
        if (DataSource == []) {
            alert("Please Select a Filtering criteria");
        } else {
            if (IndexNo >= DataSource.length) {
                return;
            }
            TrnKy = DataSource[IndexNo].TrnKy;
            GetpaymentHdrDetail(TrnKy);
            // alert(JSON.stringify(DataSource[0]));
        }
    } catch (e) {
        alert("Network error,Please Reload the page");


    }



}
